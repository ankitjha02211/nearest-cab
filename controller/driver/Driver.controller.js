const driver = require("../../model/driver");
const mongooseHelper = require("../helper/mongooseAll");

exports.registerDriver = async (req, res, next) => {
  try {
    req.headers["content-type"] = "application/json";
    if (
      req.body.name != null &&
      req.body.email != null &&
      req.body.phone_number != null &&
      req.body.license_number != null &&
      req.body.car_number != null
    ) {
      //console.log(req.body, "body");
      let data = await driver
        .find({
          $or: [
            { email: req.body.email },
            { phone_number: req.body.phone_number },
            { license_number: req.body.license_number },
            { car_number: req.body.car_number },
          ],
        })
        .select({ _id: 1 });
      //console.log(data);
      let count = (await driver.count({})) + 1;
      if (data.length == 0) {
        let Register = new driver({
          id: count,
          name: req.body.name,
          email: req.body.email,
          phone_number: req.body.phone_number,
          license_number: req.body.license_number,
          car_number: req.body.car_number,
        });
        mongooseHelper
          .savingData(Register)
          .then((result) => {
            res.status(201).json(Register);
          })
          .catch((e) => {
            res.status(400).json({
              status: "failure",
              reason: "Error While Saving",
            });
          });
      } else {
        res.status(400).json({
          status: "failure",
          reason: "Data Entered already exists",
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
      reason: "Error While Saving",
    });
  }
};

exports.locationUpdate = async (req, res, next) => {
  try {
    //console.log(req.body);
    req.headers["content-type"] = "application/json";
    let id = req.params.id;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    const filter = { id: id };
    const update = { latitude: latitude, longitude: longitude };
    if (id != null && latitude != null && longitude != null) {
      let data = await driver.findOneAndUpdate(filter, update);
      //console.log(data);
      if (data) {
        res.status(202).json({
          status: "success",
        });
      } else {
        res.status(400).json({
          status: "failure",
          reason: "Driver Id does not exist",
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
      reason: "Error While Saving",
    });
  }
};
