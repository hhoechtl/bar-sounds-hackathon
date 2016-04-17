import AppConfig from './config'
import {LocationData} from './locationData'

var r = require("rethinkdb");
var sockio = require("socket.io");
var http = require("http");

var app = require("koa")();
var routerUnauthenticated = require("koa-router")();
var jwt = require('koa-jwt');
// Init gracenote API
var Gracenote = require("node-gracenote");
var gracenoteClientId = "1856440932";
var gracenoteClientTag = "D9B2C858CF333BE4C924D82209CC3FA8";
var gracenoteUserId = null;
var gracenoteApi = new Gracenote(gracenoteClientId, gracenoteClientTag, gracenoteUserId);
gracenoteApi.register(function (err, uid) {
    gracenoteUserId = uid;
});

var jwtCheck = jwt({
    secret: new Buffer('AEj8CLM548f_NfQd_ZBao6Vnl8zKHJpUU7EfT3qha6q8WGhrRnk9sdeY7XTFdUif', 'base64'),
    audience: 'p2ZqSpl4T9FKXXFwXsLJ4YeejPxtaS75'
});

app.use(require("koa-bodyparser")());
app.use(require("koa-static")(`${__dirname}/../frontend/dist/www`));

routerUnauthenticated.get("/tracks/:barId", async function () {
    var conn = await r.connect(AppConfig.dbConfig);
    this.body = await r.table("tracks")
        .filter({ location: this.params.barId })
        //.orderBy({ index: r.desc("begin") })
        .limit(50)
        .run(conn);
    conn.close();
});


routerUnauthenticated.get("/bar/:barId", async function () {
    var conn = await r.connect(AppConfig.dbConfig);
    this.body = await r.table("locations")
        .get(this.params.barId)
        .run(conn);
    conn.close();
});

routerUnauthenticated.get('/leaderBoard', async function () {
    var conn = await r.connect(AppConfig.dbConfig);
    this.body = await r.table("users")
        .orderBy({ index: r.desc("tagCounter") })
        .limit(100)
        .coerceTo('array')
        .run(conn);
    conn.close();
});

routerUnauthenticated.post("/search/bar", async function () {
    if (this.request.body.latitude && this.request.body.longitude) {
        var currentLocation = r.point(this.request.body.latitude, this.request.body.longitude);
        var conn = await r.connect(AppConfig.dbConfig);
        this.body = await r.table('locations')
        .getNearest(currentLocation, { index: 'location', maxResults: 50 })
        .coerceTo('array')
        .run(conn);
        conn.close();
    } else {
        this.body = [];
    }
});

/*
 * TODO: make this work
routerUnauthenticated.post('/search/track', async function (next){
    this.body = await gracenoteApi.searchTrack(this.request.body.artist, this.request.body.album, this.request.body.title);
});
*/

app.use(routerUnauthenticated.routes());

/**
 * Authenticated routes
 */
//app.use(jwtCheck);

var routerAuthenticated = require("koa-router")();
routerAuthenticated.post('/enter/:barId', async function () {
    if (this.request.body.title && this.request.body.artist) {
        var conn = await r.connect(AppConfig.dbConfig);
        var currentTrack = {
            artist: this.request.body.artist,
            title: this.request.body.title,
            location: this.params.barId,
            album: this.request.body.album ? this.request.body.album : '',
            begin: r.now(),
        };

        await r.table('locations').get(this.params.barId).update({ lastTrack: currentTrack }).run(conn);
        this.body = await r.table("tracks").insert(currentTrack).run(conn);
        conn.close();
    } else {
        this.body = {};
    }
});

routerAuthenticated.post('/profile', async function () {
    var conn = await r.connect(AppConfig.dbConfig);
    var profile = this.request.body;
    var actionSummary = await r.table('users').insert(profile, { conflict: 'update' }).run(conn);
    // if we see the user for the first time, we initialize his counters
    if (actionSummary.inserted > 0) {
        profile.tagCounter = 0;
        profile.firstTagCounter = 0;
        await r.table('users').update(profile).run(conn);
    } else {
        // Profile has probably been updated, so return the new version
        profile = await r.table('users').get(profile.global_client_id).run(conn);
    }
    this.body = profile;
});

app.use(routerAuthenticated.routes());

/**
 * Initialize server
 */
var server = http.createServer(app.callback());
var io = sockio(server);

(async function () {
    var conn = await r.connect(AppConfig.dbConfig);

    try {
        // Ensure database exists
        await r.dbList()
            .contains(AppConfig.dbConfig.db)
            .do(function (databaseExists) {
                return r.branch(databaseExists, { created: 0 }, r.dbCreate(AppConfig.dbConfig.db));
            })
            .run(conn);
        // Ensure locations table exists
        await r.tableList().contains('locations').do(
            function (tableExists) {
                return r.branch(tableExists, { created: 0 }, r.tableCreate('locations'));
            }
        ).run(conn);
        // Ensure tracks table exists
        await r.tableList().contains('tracks').do(
            function (tableExists) {
                return r.branch(tableExists, { created: 0 }, r.tableCreate('tracks'));
            }
        ).run(conn);
        // Ensure users table exists
        await r.tableList().contains('users').do(
            function (tableExists) {
                return r.branch(tableExists, { created: 0 }, r.tableCreate('users', { primaryKey: 'global_client_id' }));
            }
        ).run(conn);
        // Ensure geospatial index exists on locations table field location
        await r.table('locations').indexList().contains('location').do(
            function (indexExists) {
                return r.branch(indexExists, { created: 0 }, r.table('locations').indexCreate('location', { geo: true }));
            }
        ).run(conn);
        // Ensure begin index exists on table tracks
        await r.table('tracks').indexList().contains('begin').do(
            function (indexExists) {
                return r.branch(indexExists, { created: 0 }, r.table('tracks').indexCreate('begin'));
            }
        ).run(conn);
        // Ensure tagCounter index exists on table users
        await r.table('users').indexList().contains('tagCounter').do(
            function (indexExists) {
                return r.branch(indexExists, { created: 0 }, r.table('users').indexCreate('tagCounter'));
            }
        ).run(conn);
        // Propagate test data
        var formattedLocations = LocationData.locations.map(function (location) {
            location.location = r.point(location.latitude, location.longitude);
            return location;
        });
        await r.table('locations').insert(formattedLocations).run(conn);
    }
    catch (err) {
        //if (err.message.indexOf("already exists") < 0)
        console.log(err.message);
    }

    (await r.table("tracks").changes().run(conn)).each((err, item) => {
        if (item && item.new_val)
            io.sockets.emit("tracks", item.new_val);
    });
})();

server.listen(AppConfig.serverPort,
    () => console.log(`Server started on port ${AppConfig.serverPort}.`));