import fs from "fs";
import http from "http";

export default async () =>
  http
    .createServer(function (req, res) {
      fs.readFile(__dirname + "/primus.js", function (err, data) {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200);
        res.end(data);
      });
    })
    .listen(3031)
    .on("listening", () => console.log('client hosted on port 3031'));
