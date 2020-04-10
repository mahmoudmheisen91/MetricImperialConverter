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
  var convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    var input = req.query.input;
    var initNum = convertHandler.getNum(input);
    var initUnit = convertHandler.getUnit(input);
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
      res.json({ result });
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

      res.json(obj);
    }
  });
};
