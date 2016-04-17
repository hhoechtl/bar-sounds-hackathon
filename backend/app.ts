import AppConfig from './config'
import {LocationData} from './locationData'

var r = require("rethinkdb");
var sockio = require("socket.io");
var http = require("http");

var app = require("koa")();
var routerUnauthenticated = require("koa-router")();
var jwt = require('koa-jwt');

var jwtCheck = jwt({
    secret: new Buffer('AEj8CLM548f_NfQd_ZBao6Vnl8zKHJpUU7EfT3qha6q8WGhrRnk9sdeY7XTFdUif', 'base64'),
    audience: 'p2ZqSpl4T9FKXXFwXsLJ4YeejPxtaS75'
});

app.use(require("koa-bodyparser")());
app.use(require("koa-static")(`${__dirname}/public`));

routerUnauthenticated.get("/tracks/:barId", async function () {
    var conn = await r.connect(AppConfig.dbConfig);
    this.body = await r.table("tracks")
        .filter({ location: this.params.barId })
        .orderBy({ index: r.desc("begin") })
        .limit(50)
        .run(conn);
    conn.close();
});

routerUnauthenticated.post("/search/bar", async function () {
    if (this.request.body.latitude && this.request.body.longitude) {
        var currentLocation = r.point(this.request.body.latitude, this.request.body.longitude);
        var conn = await r.connect(AppConfig.dbConfig);
        this.body = await r.table('locations').getNearest(currentLocation, { index: 'location', maxResults: 50 }).run(conn);
        conn.close();
    } else {
        this.body = [];
    }
});
app.use(routerUnauthenticated.routes());

/**
 * Authenticated routes
 */
//app.use(jwtCheck);

var routerAuthenticated = require("koa-router")();
routerAuthenticated.post('/api/track/create', async function () {
    var conn = await r.connect(AppConfig.dbConfig);
    this.body = await r.table("messages").insert({
        user: this.request.body.user,
        text: this.request.body.text,
        time: r.now(),
    }).run(conn);
    conn.close();
});

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
                return r.branch(tableExists, {created: 0}, r.tableCreate('locations'));
            }
        ).run(conn);
        // Ensure tracks table exists
        await r.tableList().contains('tracks').do(
            function (tableExists) {
                return r.branch(tableExists, {created: 0}, r.tableCreate('tracks'));
            }
        ).run(conn);
        // Ensure geospatial index exists on locations table field location
        await r.table('locations').indexList().contains('location').do(
            function (indexExists) {
                return r.branch(indexExists, {created: 0}, r.table('locations').indexCreate('location', {geo: true}));
            }
        ).run(conn);
        // Ensure begin index exists on table tracks
        await r.table('tracks').indexList().contains('begin').do(
            function (indexExists) {
                return r.branch(indexExists, {created: 0}, r.table('tracks').indexCreate('begin'));
            }
        ).run(conn);
        // Propagate test data
        var formattedLocations = LocationData.locations.map(function(location){
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