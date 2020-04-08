"use strict";

let cors = require("cors");
let fs = require("fs");
let runner = require("../test-runner");

module.exports = function (app) {
  app.route("/_api/server.js").get((req, res, next) => {
    console.log("server.js requested");
    fs.readFile(process.cwd() + "/server.js", (err, data) => {
      if (err) return next(err);
      res.send(data.toString());
    });
  });

  app.route("/_api/routes/api.js").get((req, res, next) => {
    console.log("api.js requested");
    fs.readFile(process.cwd() + "/routes/api.js", (err, data) => {
      if (err) return next(err);
      res.type("txt").send(data.toString());
    });
  });

  app.route("/_api/controllers/convertHandler.js").get((req, res, next) => {
    console.log("convertHandler.js requested");
    fs.readFile(
      process.cwd() + "/controllers/convertHandler.js",
      (err, data) => {
        if (err) return next(err);
        res.type("txt").send(data.toString());
      }
    );
  });

  var error;
  app.get(
    "/_api/get-tests",
    cors(),
    (req, res, next) => {
      console.log(error);
      if (!error && process.env.NODE_ENV === "test") return next();
      res.json({ status: "unavailable" });
    },
    (req, res, next) => {
      if (!runner.report) return next();
      res.json(testFilter(runner.report, req.query.type, req.query.n));
    },
    (req, res) => {
      runner.on("done", (report) => {
        process.nextTick(() =>
          res.json(testFilter(runner.report, req.query.type, req.query.n))
        );
      });
    }
  );
  app.get("/_api/app-info", (req, res) => {
    var hs = Object.keys(res._headers).filter(
      (h) => !h.match(/^access-control-\w+/)
    );
    var hObj = {};
    hs.forEach((h) => {
      hObj[h] = res._headers[h];
    });
    delete res._headers["strict-transport-security"];
    res.json({ headers: hObj });
  });
};

function testFilter(tests, type, n) {
  var out;
  switch (type) {
    case "unit":
      out = tests.filter((t) => t.context.match("Unit Tests"));
      break;
    case "functional":
      out = tests.filter(
        (t) => t.context.match("Functional Tests") && !t.title.match("#example")
      );
      break;
    default:
      out = tests;
  }
  if (n !== undefined) {
    return out[n] || out;
  }
  return out;
}
