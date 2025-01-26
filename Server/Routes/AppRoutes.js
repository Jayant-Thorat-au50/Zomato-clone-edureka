

const AppRoutes = require('express').Router();

const locationController = require('../controller/locationController');

const restaurantControllers = require('../controller/restaurantController');

const mealTypeController = require('../controller/meal-typeController')

const menuController = require('../controller/menuController')

const paymentController = require('../controller/PaymentController')

const userController = require('../controller/userController')




AppRoutes.get('/getTheNamesOfAllLocations', locationController.getTheNamesOfAllLocations);

AppRoutes.get('/getAllRestuarantsByCityName/:cityName',locationController.getAllRestuarantsByCityName);

AppRoutes.get('/getAllRestaurants',restaurantControllers.getAllRestaurants)

AppRoutes.get('/getRestaurantByCityName/:cityName',restaurantControllers.getRestaurantByCityName)

AppRoutes.get('/getAllmealTypes',mealTypeController.getAllmealTypes)

AppRoutes.get('/getRestaurantsListByLocationId/:locationId',restaurantControllers.getRestaurantsListByLocationId)

AppRoutes.get('/getSingleRestaurant/:id',restaurantControllers.getSingleRestaurant)

AppRoutes.get('/getMenuItemsList',menuController.getMenuItemsList)

AppRoutes.post('/create-order',paymentController.createOrder)

AppRoutes.post('/verifyPayment',paymentController.verifyPayment)

AppRoutes.post('/signUp',userController.signUp)

AppRoutes.post('/login',userController.login)

AppRoutes.post('/filter',restaurantControllers.filter)

AppRoutes.get('/restaurantsForTheSelectedMealType',restaurantControllers.restaurantsForTheSelectedMealType)






module.exports = AppRoutes;