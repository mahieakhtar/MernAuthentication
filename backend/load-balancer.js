var https = require("https"),
  httpProxy = require("http-proxy"),
  seaport = require("seaport"),
  ports = seaport.connect("localhost", 9090);

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

var i = -1;

var options = {
  key: fs.readFileSync(path.join(__dirname, "cert", "server.key")),
  cert: fs.readFileSync(path.join(__dirname, "cert", "server.crt")),
};

var proxy = httpProxy.createProxyServer({});

var server = https.createServer(options, function (req, res) {
  var addresses = ports.query("server");

  if (!addresses.length) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Service unavailable");
    return;
  }

  i = (i + 1) % addresses.length;

  var host = addresses[i].host.split(":").reverse()[0];
  var port = addresses[i].port;

  proxy.web(req, res, {
    target: "https://" + host + ":" + port,
    secure: false,
  });
});

server.listen(3443, function () {
  console.log(`load balancer listening on port %d`, 3443);
});
