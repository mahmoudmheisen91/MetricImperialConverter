/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  app.route("/api/convert/api_test/").post((req, res) => {
    let input = req.body.valueunit;
    let obj = process(input);

    res.json(obj);
    res.end();
  });

  app.route("/api/convert").get(function (req, res) {
    var input = req.query.input;
    let obj = process(input);

    res.json(obj);
    res.end();
  });
};

function process(input) {
  var convertHandler = new ConvertHandler();

  let initNum = convertHandler.getNum(input);
  let initUnit = convertHandler.getUnit(input);
  let result = "";

  if (initNum !== "invalid number")
    var returnNum = convertHandler.convert(initNum, initUnit);
  else result = "invalid number";

  if (initUnit !== "invalid unit")
    var returnUnit = convertHandler.getReturnUnit(initUnit);
  else if (result === "invalid number") result = "invalid number and unit";
  else result = "invalid unit";

  if (
    result === "invalid number" ||
    result === "invalid unit" ||
    result === "invalid number and unit"
  ) {
    return { result };
  } else {
    var toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    let obj = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: toString,
    };

    return obj;
  }
}
