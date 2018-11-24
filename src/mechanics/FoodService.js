/* global _ */

import GameConstants from 'GameConstants';

const COLONIZED_PLANET_START_FOOD_INVENTORY = [{
    id: 'corn',
    name: 'Corn',
    amount: 120,
  }, {
    id: 'potato',
    name: 'Potato',
    amount: 100,
}];

const FOOD_TO_NUTRITION_UNITS = {
  corn: 1,
  potato: 1.5,
};

export default class FoodService {
  
  static getStartFoodInventory() {
    return COLONIZED_PLANET_START_FOOD_INVENTORY;
  }
  
  static getAllEdibleFood(planetInventory) {
    return _.filter(planetInventory, (item) => _.includes(['corn', 'potato'], item.id));
  }
  
  static getAllEdibleFoodAsNutritionUnits(planetInventory) {
    return _.sum(_.map(this.getAllEdibleFood(planetInventory), (food) => FOOD_TO_NUTRITION_UNITS[food.id] * food.amount));
  }
}
