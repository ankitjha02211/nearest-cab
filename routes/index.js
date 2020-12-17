var express = require("express");
var router = express.Router();
const Driver = require("../controller/driver/Driver.controller");
const Passenger = require("../controller/driver/passenger.controller");

router.post("/v1/driver/register/", function (req, res, next) {
  Driver.registerDriver(req, res, next);
});

router.post("/v1/driver/:id/sendLocation/", function (req, res, next) {
  Driver.locationUpdate(req, res, next);
});

router.post("/v1/passenger/available_cabs/", function (req, res, next) {
  Passenger.availableCabs(req, res, next);
});


module.exports = router;
