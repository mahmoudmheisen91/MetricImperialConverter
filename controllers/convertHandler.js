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

    if (["km", "mi", "kg", "lbs", "gal", "L"].includes(sum)) result = sum;
    else result = "invalid unit";
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let unitsLookup = {
      kg: "lbs",
      lbs: "kg",
      km: "mi",
      mi: "km",
      L: "gal",
      gal: "L",
    };

    return unitsLookup[initUnit];
  };

  this.spellOutUnit = function (unit) {
    var result;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    let convertLookup = {
      kg: 1.0 / 0.453592,
      lbs: 0.453592,
      km: 1.0 / 1.60934,
      mi: 1.60934,
      L: 1.0 / 3.78541,
      gal: 3.78541,
    };

    return convertLookup[initUnit] * initNum;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
}

module.exports = ConvertHandler;
