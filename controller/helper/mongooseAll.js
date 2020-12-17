exports.findingData = async (collection, query, select) => {
  try {
    let collectionName = collection;
    let queryMain = query;
    let selectMain = select;
    let driver = await collectionName.find(queryMain);
    return driver;
  } catch (ex) {
    return "error while fetching data";
  }
};

exports.savingData = async (collectionData) => {
  return collectionData.save();
};
