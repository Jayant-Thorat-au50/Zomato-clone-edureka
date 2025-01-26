const restaurantsData = require("../Models/restaurantModels");
const locationModels = require("../Models/locationModels");

const restaurantController = {
  getAllRestaurants: async (req, res) => {
    let result = await restaurantsData.find();

    res.send({ result });
  },

  getRestaurantByCityName: async (req, res) => {
    let { cityName } = req.params;

    let result = await restaurantsData.find({ city_name: cityName });

    res.send({
      status: 200,
      result,
    });
  },

  getRestaurantsListByLocationId: async (req, res) => {
    let { locationId } = req.params;

    const Result = await restaurantsData.find({ location_id: locationId });

    res.send(Result);
  },

  getSingleRestaurant: async (req, res) => {
    const { id } = req.params;

    const result = await restaurantsData.find({ _id: id });
    res.send({ result });
  },

  restaurantsForTheSelectedMealType: async (req, res) => {
    const { mealType } = req.body;

    const restaurants = await restaurantsData.find();

    if (restaurants) {
      res.send({
        success: true,
        message: restaurants,
      });
    } else {
      res.send({
        success: false,
        message: " no restaurants found",
      });
    }
  },

  filter: async (req, res) => {
    const { meal_type, cuisine_id, location_id, sort_min } = req.body;

    let filterData = {};

    if (meal_type !== undefined) filterData.meal_type_id = meal_type;
    if (cuisine_id.length !==0 ) filterData.cuisine_id ={$in : cuisine_id};
    if (location_id !== undefined) filterData.location_id = location_id;

    const result = await restaurantsData.find(filterData).sort({min_price:sort_min})

    res.send({ result });
  },
};

module.exports = restaurantController;
