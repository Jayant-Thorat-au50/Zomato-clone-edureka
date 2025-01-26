const locationModels = require("../Models/locationModels");

const restaurantsData = require("../Models/restaurantModels");
const locationController = {
  getTheNamesOfAllLocations: async (req, res) => {
    let result = await locationModels.find();
    const result2 = await restaurantsData.find()

    res.send({
      result,
      result2
    });
  },
  getAllRestuarantsByCityName: async (req, res) => {
    const { cityName } = req.params;

    let result = await restaurantsData.find(
      { city_name: cityName },
      { locality: 1 }
    );
    res.send({ result });
  }
  

};

module.exports = locationController;
