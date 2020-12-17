const mongoose = require("mongoose");
let MongodbMemoryServer = require("mongodb-memory-server").default;
const mongod = new MongodbMemoryServer({
  binary: { version: "4.2.6" },
  debug: true,
});

// Connect to the in-memory database.
module.exports.connect = async () => {
  const uri = await mongod.getUri();
  //console.log(uri,"uri");
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };
  console.log("connected to mongoDB");
  await mongoose.connect(uri, mongooseOpts);
};


// Drop database, close the connection and stop mongod.
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};


// Remove all the data for all db collections.
module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
