const driver = require("../../model/driver");
const formula = require("../helper/Haversinedistanceformula.");

exports.availableCabs = async (req, res, next) => {
  try {
    req.headers["content-type"] = "application/json";
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    //check if latitude and longitude is null
    if (latitude != null && longitude != null) {
      //console.log(req.body.latitude, req.body.longitude);
      let lowerlatitude = parseInt(req.body.latitude.split(".")[0]);
      let higherlatitude = parseInt(req.body.latitude.split(".")[0]) + 1;
      let lowerlongitude = parseInt(req.body.longitude.split(".")[0]);
      let higherlongitude = parseInt(req.body.longitude.split(".")[0]) + 1;

      //narrow down the range
      let data = await driver.find({
        $and: [
          { latitude: { $gte: lowerlatitude, $lt: higherlatitude } },
          { longitude: { $gte: lowerlongitude, $lt: higherlongitude } },
        ],
      });

      let availableCabs = [];
      //calculate distance from the request lat long
      await data.map((drivers) => {
        let distance = formula.versionOne(
          [latitude, longitude],
          [drivers.latitude, drivers.longitude]
        );
        //console.log(distance, "distance");
        if (distance <= 4) {
          //console.log("cabs");
          availableCabs.push(drivers);
        }
      });
      //console.log(availableCabs, "availableCabs");
      if (availableCabs.length > 0) {
        res.status(200).json({
          available_cabs: availableCabs,
        });
      } else {
        res.status(200).json({
          message: "No cabs available!",
        });
      }
    } else {
      res.status(400).json({
        status: "failure",
        reason: "Data validation failed",
      });
    }
  } catch (ex) {
    res.status(400).json({
      status: "failure",
      reason: " Bad Request",
    });
  }
};
