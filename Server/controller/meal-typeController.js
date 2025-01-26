
const mealTypeModels = require('../Models/meal-typeModels');

const mealTypeController = {

    getAllmealTypes: async (req,res)=>{
        let result = await mealTypeModels.find();

        res.send(result);
}
}

module.exports = mealTypeController;