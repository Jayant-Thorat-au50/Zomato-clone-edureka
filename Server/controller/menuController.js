const locationModels = require("../Models/locationModels");
const menuModel = require('../Models/menuModel')

const restaurantsData = require("../Models/restaurantModels");

const menuController = {
 
getMenuItemsList:async (req,res)=>{

  const result = await menuModel.find()

  res.send({result})

}
  

};

module.exports = menuController;
