/* global _ angular */

import GameConstants from 'GameConstants';

const YIELD_INCREASE_PER_FARM_LEVEL = 0.1;
const POSSIBLE_YIELD_PER_FARM_LEVEL = {
  1: ['corn', 'potato'],
  2: ['corn', 'potato', 'zutato'],
  3: ['corn', 'potato', 'zutato', 'soybeans', 'taro'],
  4: ['corn', 'potato', 'zutato', 'soybeans', 'taro', 'cotton'],
  5: ['corn', 'potato', 'zutato', 'soybeans', 'taro', 'cotton', 'ginseng', 'shiitake'],
};

const ITEMS = [
  {
    id: 'corn',
    name: 'Corn',
    type: 'organic',
    iconSrc: '/resources/organic/corn.png',
    applications: ['food'],
    quality: 'common',
    nutrition: 1,
    maxYield: 46,
    valueRange: [1, 1],
    description: 'An average ear of corn has 800 kernels. One large ear is about 120 kcal, and a single plant will often produce four of those. With good environment control, we are able to yield about 32 tons per acre. Also, we get continous and fast yields, thanks to interplanting.',
  }, {
    id: 'potato',
    name: 'Potato',
    type: 'organic',
    iconSrc: '/resources/organic/potato.png',
    applications: ['food'],
    quality: 'common',
    nutrition: 1.5,
    maxYield: 46,
    valueRange: [1.8, 2.2],
    description: 'Potatoes require less water to grow than other staple foods such as wheat, rice and corn. There are about 80 kcal per 100g of potato, and we can get about 3 kilograms of tubers per plant. For some mysterious reason, Mars colony refuses to look at them, let alone eat them.',
  }, {
    id: 'zutato',
    name: 'Zutato',
    type: 'organic',
    iconSrc: '/resources/organic/zutato.png',
    quality: 'rare',
    nutrition: 2,
    maxYield: 32,
    valueRange: [2.7, 3.3],
    description: 'Genetically modified plants turned out to be of great use for space colonies - the ones that didn\'t manage to escape, that is. This here is an example of mixing potato with a zucchini. Tastes... funky.',
  }, {
    id: 'soybeans',
    name: 'Green Soybeans',
    type: 'organic',
    iconSrc: '/resources/organic/soybeans.png',
    quality: 'rare',
    nutrition: 3,
    maxYield: 68,
    valueRange: [1.8, 2.2],
    description: 'These very nutritious beans offer over 120 kcal and about 10 grams of protein per 100g serving. Additionaly, soybean oil is among the most popular vegetable oils. Last but not least, you can make crayons with those.',
}, {
    id: 'taro',
    name: 'Taro',
    type: 'organic',
    iconSrc: '/resources/organic/taro.png',
    quality: 'valuable',
    maxYield: 36,
    valueRange: [7.2, 8.8],
    description: 'A swiss army knife of a plant. The tuber, which can grow to 6 kilograms, is used as potato, leaves are used as greens, and young shoots can be used as vegetable. Often used to make flour as well.',
}, {
    id: 'cotton',
    name: 'Cotton',
    type: 'organic',
    iconSrc: '/resources/organic/cotton.png',
    quality: 'valuable',
    maxYield: 18,
    valueRange: [16.8, 31.2],
    description: 'You can list the benefits of a space suit as long as you want, but nothing beats putting on a nice, cotton shirt after a long EVA. Also used for medical items like bandages.',
}, {
    id: 'ginseng',
    name: 'Ginseng Root',
    type: 'organic',
    iconSrc: '/resources/organic/ginseng.png',
    quality: 'unique',
    maxYield: 34,
    valueRange: [11.2, 20.8],
    description: 'Used in medicine for thousands of years, today ginseng is still relevant in treatment and prevention of diseases. On top of that, it\'s popular among colonists for improving recovery and increasing oxidation in muscles.',
}, {
    id: 'shiitake',
    name: 'Shiitake Mushroom',
    type: 'organic',
    iconSrc: '/resources/organic/shiitake.png',
    quality: 'unique',
    maxYield: 12,
    valueRange: [30, 70],
    description: 'These mushrooms are considered a delicacy, an important enrichment of the colonist dangerously monotonous life. Tricky to grow, they require patience and specific environment which only the most developed colonies can ensure, making them a valuable commodity.',
}];

export default class OrganicService {
  
  // NOTE: Should be used for getting actual food items at all times
  // to copy and break reference
  static _getOrganicItemById(id, amount) {
    const item = _.find(ITEMS, ['id', id]);
    if (!item) console.warn('No food found with id ', id);
    const resultItem = _.isNil(amount) ? item : _.assign(item, { amount });
    return angular.copy(resultItem);
  }
  
  static getStartFoodInventory() {
    return [
        this._getOrganicItemById('corn', 120), 
        this._getOrganicItemById('potato', 100),
    ];
  }
  
  static _getOrganicItemsByApplication(application) {
    const prototypes = _.filter(ITEMS, (item) => _.includes(item.applications, application));
    return _.map(_.map(prototypes, 'id'), (id) => this._getOrganicItemById(id));
  }
  
  static getAllEdibleFood(planetInventory) {
    const foodIds = _.map(this._getOrganicItemsByApplication('food'), 'id');
    return _.filter(planetInventory, (item) => _.includes(foodIds, item.id));
  }
  
  static getAllEdibleFoodAsNutritionUnits(planetInventory) {
    return _.sum(_.map(this.getAllEdibleFood(planetInventory), (food) => food.nutrition * food.amount));
  }
  
  static getFoodEquivalentOfNutritionUnitsFromInventory(planetInventory, targetNutrition) {
    const result = [];
    let remainingNutrition = targetNutrition;
    const foodIds = _.map(this._getOrganicItemsByApplication('food'), 'id');
    
    _.forEach(_.reverse(foodIds), (foodId) => {
      const inventoryFood = angular.copy(_.find(planetInventory, ['id', foodId]));
      const totalFoodNutrition = inventoryFood.amount * inventoryFood.nutrition;
      
      if (inventoryFood && remainingNutrition > 0) {
        if (remainingNutrition >= totalFoodNutrition) {
          remainingNutrition -= totalFoodNutrition;
        } else if (remainingNutrition < totalFoodNutrition) {
          inventoryFood.amount = Math.ceil(remainingNutrition / inventoryFood.nutrition);
          remainingNutrition = 0;
        }
        result.push(inventoryFood);
      }
    });
    console.info('Food to consume: ', _.map(result, (item) => `${item.amount} ${item.name}`));
    if (remainingNutrition > 0) return false;
    return result;
  }
  
  static getYieldForLevelAndTool(level, tool) {
    return _.map(POSSIBLE_YIELD_PER_FARM_LEVEL[level], (id) => {
      const item = this._getOrganicItemById(id);
      const minYield = item.maxYield * (YIELD_INCREASE_PER_FARM_LEVEL * level) +
        (tool ? item.maxYield * (tool.additionalChance) : 0);
      
      return this._getOrganicItemById(id, _.random(minYield, item.maxYield));
    });
  }
  
  // @debug
  static getAllItems() {
   return _.map(ITEMS, (item) => (item.amount = 4, item)); 
  }
}
