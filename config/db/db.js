var mongoose = require("mongoose");

var dbUrl = "mongodb://localhost/Test";

module.exports = function () {
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("connected to mongoDb");
  });

  mongoose.connection.on("error", (err) => {
    console.log("error");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("disconnected");
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log("disconnected due to application termination" );
      process.exit(0);
    });
  });
};
