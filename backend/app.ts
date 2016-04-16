import AppConfig from './config'

const config = new AppConfig();

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

routerUnauthenticated.get("/api/messages", async function() {
  var conn = await r.connect(config.dbConfig);
  this.body = await r.table("messages")
                     .orderBy({index: r.desc("time")})
                     .limit(100).orderBy("time")
                     .run(conn);
  conn.close();
});

app.use(routerUnauthenticated.routes());
app.use(jwt);

var routerAuthenticated = require("koa-router")();
routerAuthenticated.post('/api/track/create', async function() {
      var conn = await r.connect(config.dbConfig);
  this.body = await r.table("messages").insert({
    user: this.request.body.user,
    text: this.request.body.text,
    time: r.now(),
  }).run(conn);
  conn.close();
});


var server = http.createServer(app.callback());
var io = sockio(server);

(async function() {
  var conn = await r.connect(config.dbConfig);

  try {
    await r.dbCreate(config.dbConfig.db).run(conn);
    await r.tableCreate("messages").run(conn);
    await r.table("messages").indexCreate("time").run(conn);
  }
  catch (err) {
    if (err.message.indexOf("already exists") < 0)
      console.log(err.message);
  }

  (await r.table("messages").changes().run(conn)).each((err, item) => {
    if (item && item.new_val)
      io.sockets.emit("message", item.new_val);
  });
})();

server.listen(config.serverPort,
  () => console.log(`Server started on port ${config.serverPort}.`));