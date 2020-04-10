function ConvertHandler() {
  this.getNum = function (input) {
    let result = undefined;
    input = input.trim();
    if (!input.length) return "invalid number";

    let arr = input.split("");

    let sum = "";
    let end = false;
    arr.map((item) => {
      if (/[\d.\/]/.test(item) && !end) {
        sum += item;
      } else {
        end = true;
      }
    });

    sum = +sum[0] ? sum : 1; //.6/.2 => 1
    try {
      result = eval(sum);
    } catch (err) {
      result = "invalid number";
    }
    return result;
  };

  this.getUnit = function (input) {
    let result = undefined;
    input = input.trim();
    if (!input.length) return "invalid unit";

    let arr = input.split("");

    let sum = "";
    let end = false;
    arr.map((item) => {
      if (/[^\d\W_]/gi.test(item)) {
        sum += item;
      }
    });
    sum = sum.toLowerCase();

    if (["km", "mi", "kg", "lbs", "gal", "l"].includes(sum)) result = sum;
    else result = "invalid unit";
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let unitsLookup = {
      kg: "lbs",
      lbs: "kg",
      km: "mi",
      mi: "km",
      l: "gal",
      gal: "l",
    };

    return unitsLookup[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function (unit) {
    let unitsLookup = {
      kg: "Kilograms",
      lbs: "Pound",
      km: "Kilometers",
      mi: "Miles",
      l: "Liters",
      gal: "Galon",
    };

    return unitsLookup[unit.toLowerCase()];
  };

  this.convert = function (initNum, initUnit) {
    let convertLookup = {
      kg: 1.0 / 0.453592,
      lbs: 0.453592,
      km: 1.0 / 1.60934,
      mi: 1.60934,
      l: 1.0 / 3.78541,
      gal: 3.78541,
    };

    let result = convertLookup[initUnit.toLowerCase()] * initNum;
    return Math.round(result * 100000) / 100000;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
