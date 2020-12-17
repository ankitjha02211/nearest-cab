"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var driverSchema = new Schema(
  {
    id: { type: Number, default: 0 },
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number: {
      type: Number,
      validate: {
        validator: function (v) {
          let regx = /\d{10}/;
          // console.log(regx.test(v));
          return regx.test(v);
        },
      },
      required: true,
    },
    license_number: {
      type: String,
      required: true,
      unique: true,
    },
    car_number: {
      type: String,
      required: true,
      unique: true,
    },
    latitude: { type: Number },
    longitude: { type: Number },
  },
  { collection: "driver" }
);

module.exports = mongoose.model("driver", driverSchema);
