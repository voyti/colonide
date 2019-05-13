/* global _, angular */

/* Planet class. Should keep planet state and simple mechanics. 
 * Advanced mechanics should be calculated using stateless PlanetService 
 */
import PlanetService from './PlanetService';
import OrganicService from './OrganicService';
import MineralsService from './MineralsService';
import BuildingsService from './BuildingsService';
import VehiclesService from './VehiclesService';
import ShipsService from './ShipsService';
import IndustryToolsService from './IndustryToolsService';


const OPPOSITE_INDUSTRY_MAP = {
  mine: 'farm',
  farm: 'mine',
};

const MINER_CONTRIBUTION_VALUE = 1;
const DAILY_FOOD_DEMAND_PER_EMPLOYEE = 0.5;
const MONTHLY_FOOD_DEMAND_PER_EMPLOYEE = 30 * DAILY_FOOD_DEMAND_PER_EMPLOYEE;

const MINIMAL_EMPLOYEES_COUNT = 0;

// const EMPLOYEES_PER_BUILDING_LEVEL_COUNT = {
//   mine: { 1: 9, 2: 18, 3: 27, 4: 36, 5: 45 },
//   farm: { 1: 9, 2: 18, 3: 27, 4: 36, 5: 45 },
// };

export default class Planet {
  
  constructor(name, isHabitable, potential, resourcesLevel, x, y, isColonized = false) {
    this.name = name;
    this.isHabitable = isHabitable;
    this.potential = potential;
    this.resourcesLevel = resourcesLevel;
    this.drawingData = {};
    this.x = x;
    this.y = y;
    this.state = 'uncolonized';
    this.influenceDrawingProgress = 0;
    
    this.workers = 0;
    this.employedWorkers = 0;
    this.buildings = isHabitable ? BuildingsService.getStartBuildings() : [];
    this.inventory = isHabitable ? OrganicService.getStartFoodInventory() : [];
    this.vehicles = [];
    this.ships = [];
    
    this.industries = {
      mine: { employed: 0, tool: IndustryToolsService.getDefaultIndustryTool() },
      farm: { employed: 0, tool: IndustryToolsService.getDefaultIndustryTool() },
    };

    this._generateInfo();
    
  }
  
  static get MAX_HABIT_TEMP() {
    return 39;
  }  
  static get MIN_HABIT_TEMP() {
    return -23;
  }  
  static get MAX_TEMP() {
    return 186;
  }  
  static get MIN_TEMP() {
    return -234;
  }
  
  setDrawingData(planetTheme, planetSprite) {
    this.drawingData.theme = this.drawingData.theme || planetTheme;
    this.drawingData.theme.background = this.drawingData.theme.background || _.sample(planetTheme.backgrounds);
    this.drawingData.sprite = this.drawingData.sprite || planetSprite;
  }
  
  _generateInfo() {
    const MIN_DIST = 0.4;
    const MAX_DIST = 50;
    const tempRangle = (Planet.MAX_TEMP - Planet.MIN_TEMP);
    const distRange = (MAX_DIST - MIN_DIST);
    
    this.temperature = this.isHabitable ? _.random(Planet.MIN_HABIT_TEMP, Planet.MAX_HABIT_TEMP) : _.random(Planet.MIN_TEMP, Planet.MAX_TEMP);
    this.dist = (((this.temperature - Planet.MIN_TEMP) * distRange) / tempRangle) + MIN_DIST;
    this.dist = _.round(this.dist, 2);
    this.type = this._generateType();
    this.color = this._generateColor();
    this.size = this._generateSize();
  }
  
  setX(x){
    this.x = x;
  }  
  
  setY(y){
    this.y = y;
  }
  
  setState(state) {
    this.state = state;
  }
  
  checkState(checkedState) {
    return this.state === checkedState;
  }
  
  _generateType() {
    if (this.isHabitable) {
      return 'Terrestrial planet';
    } else {
      if (this.resourcesLevel > 7) {
        return 'Helium planet';
      } else if (this.resourcesLevel > 2) {
        return 'Gas giant';
      } else if (this.temperature < 0) {
        return 'Ice giant';
      } else {
         return 'Ocean planet';
      }
    }

  }  
  _generateColor() {
    if (this.type === 'Ice giant') {
      return '0xc3e6e5';
    } else if (this.type === 'Helium planet') {
      return '0x999999';
    } else if (this.type === 'Gas giant') {
      return '0xfbf8b6';
    } else if (this.type === 'Ocean planet') {
      return '0x00a9e7';
    } else {
      return _.sample(['0x77b7c9', '0x79b039', '0xc34141']);
    }
  }
  
  _generateSize() {
    const MIN_SIZE = 23600;
    const MAX_SIZE = 63000;
    if (this.isHabitable) {
      return _.random(MIN_SIZE, MAX_SIZE / 2);
    } else if (this.type === 'Gas giant' || this.type === 'Ice giant') {
       return _.random((MAX_SIZE * 0.7), MAX_SIZE);
    } else {
      return _.random(Math.min(MIN_SIZE * 2, MAX_SIZE / 2), MAX_SIZE);
    }
  }
  
  getAllEmployeesCount() {
    const quarters = _.find(this.buildings, ['id', 'livingQuarters']);
    if (quarters) {
      const quartersCapacityTool = _.find(quarters.levelTools, ['id', 'capacity']);
      return quartersCapacityTool.valueGetter(quarters.level);
    } else {
      return MINIMAL_EMPLOYEES_COUNT;
    }
  }  
  
  getIdleEmployeesCount() {
    const allEmployeesCount = this.getAllEmployeesCount();
    const allEmployed = this.industries.mine.employed + this.industries.farm.employed;
    return allEmployeesCount - allEmployed;
  } 
  
  getAllEdibleFoodCount() {
    return OrganicService.getAllEdibleFoodAsNutritionUnits(this.inventory);
  }
  
  getFoodReserves() {
    const allEmployeesCount = this.getAllEmployeesCount();
    const demand = MONTHLY_FOOD_DEMAND_PER_EMPLOYEE * allEmployeesCount;
    return (this.getAllEdibleFoodCount() / demand).toFixed(1);
  }
  
  getEmployedCountInIndustry(industry) {
    const relevantIndustry = this._getIndustry(industry);
    return relevantIndustry.employed;
  }
  
  _findIndustryBuilding(industry) {
    const indestryBuildingsMap = {
      mine: () => _.find(this.buildings, ['id', 'mine']),
      farm: () => _.find(this.buildings, ['id', 'farm']),
    };
    const building = indestryBuildingsMap[industry]();
    if (!building) {
      console.warn('No buildings for industry :', industry);
      return null;
    }
    return building;
  }
  
  getEmployableCountInIndustry(industry) {
    const building = this._findIndustryBuilding(industry);
    if (!building) return 0;
    
    const capacityTool = _.find(building.levelTools, ['id', 'capacity']);
    return capacityTool.valueGetter(building.level);
  }
  
  _getIndustry(industry) {
    const relevantIndustry = this.industries[industry];
    if (!relevantIndustry) {
      console.warn('Unknown industry :', industry);
      return null;
    } else {
      return relevantIndustry;
    }
  }
  
  addEmployeeInIndustry(industry) {
    const relevantIndustry = this._getIndustry(industry);
    const max = this.getEmployableCountInIndustry(industry);
    const available = this.getIdleEmployeesCount();
    if (relevantIndustry.employed < max) {
      if (available === 0) {
        const removalResult = this.removeEmployeeFromIndustry(OPPOSITE_INDUSTRY_MAP[industry]);
        if (removalResult) relevantIndustry.employed++;
      } else {
        relevantIndustry.employed++;
      }
    }
  }
  
  removeEmployeeFromIndustry(industry) {
    const relevantIndustry = this._getIndustry(industry);
    const available = this.getEmployedCountInIndustry(industry);
    if (available > 0) {
      relevantIndustry.employed--;
      return true;
    }
    return false;
  }
  
  getIndustryWorkProgressStepValue(industry) {
    const workers = this.getEmployedCountInIndustry(industry);
    return MINER_CONTRIBUTION_VALUE * workers;
  }
  
  getIndustryTool(industry) {
    const relevantIndustry = this._getIndustry(industry);
    return relevantIndustry.tool;
  }
  
  getTypeInventory(type) {
    return _.filter(this.inventory, ['type', type]);
  }  
  
  // application: 'building-material' | 'ship-material | 'food'
  _getInventoryByApplication(application) {
    return _.filter(this.inventory, (item) => _.includes(item.applications, application));
  }
  
  // application: 'building-material' | 'ship-material | 'food' 
  getItemsByApplication(application) {
    const allItemsByApplication = [
      ...OrganicService.getOrganicItemsByApplication(application, 0),
      ...MineralsService.getMineralsByApplication(application, 0),
    ];
    const inventoryItems = this._getInventoryByApplication(application);
    return _.map(allItemsByApplication, (item) => {
      const itemFromInventory = _.find(inventoryItems, ['id', item.id]);
      if (itemFromInventory) { return itemFromInventory; }
      else {return item;  }
    });
  }
  
  _getIdFromInventory(id) {
    return _.find(this.inventory, ['id', id]);
  }
  
  getBuildingsOfType(type) {
    const buildingsInventory = this._getBuildingsInventory();
    if (type === 'built') {
      return buildingsInventory;
    } else if (type === 'available') {
      return BuildingsService.getAvailableBuildings(buildingsInventory);
    }
  }
  
  getVehiclesOfType(type) {
  const vehiclesInventory = this._getVehiclesInventory();
    if (type === 'built') {
      return vehiclesInventory;
    } else if (type === 'available') {
      return VehiclesService.getAvailableVehicles(vehiclesInventory);
    }
  }  
  
  getShipsOfType(type) {
  const shipsInventory = this._getShipsOnOrbit();
    if (type === 'on-orbit') {
      return shipsInventory;
    } else if (type === 'available') {
      return ShipsService.getAvailableShips(shipsInventory);
    }
  }
  
  _getBuildingsInventory() {
    return this.buildings;
  }
  
  _getVehiclesInventory() {
    return this.vehicles;
  }  
  
  _getShipsOnOrbit() {
    return this.ships;
  }
  
  _addBuildingToInventory(building) {
    this.buildings.push(building);
  }
  
  _addVehicleToInventory(vehicle) {
    this.vehicles.push(vehicle);
  }
  
  _getAllBuiltAndAvailableBuildings() {
    return [...this.getBuildingsOfType('built'), ...this.getBuildingsOfType('available')];
  }  
  
  _getAllBuiltAndAvailableVehicles() {
    return [...this.getVehiclesOfType('built'), ...this.getVehiclesOfType('available')];
  }
  
  onIndustryProgressFinished(industry) {
    const building = this._findIndustryBuilding(industry);
    const tool = this.getIndustryTool(industry);
    let industryYield;
    if (industry === 'mine') industryYield = MineralsService.getYieldForLevelAndTool(building.level, tool);
    if (industry === 'farm') industryYield = OrganicService.getYieldForLevelAndTool(building.level, tool);
    this._addToInventory(industryYield);
    return industryYield;
  }
  
  _addToInventory(items) {
    console.info('Adding ', _.map(items, (item) => `${item.amount} ${item.name}`),  ' to inventory on ', this.name);
    _.forEach(items, (item) => {
      if (item.amount === 0) return;
      
      const existing = this._getIdFromInventory(item.id);
      if (existing) {
        existing.amount += item.amount; 
      } else {
        this.inventory.push(item);
      }
    });
  }
  
  _checkIfItemsAvailableInInventory(items) {
    let isAvailable = true;
    
    _.forEach(items, (item) => {
      const existing = this._getIdFromInventory(item.id);
      if (existing) {
        if (item.amount > existing.amount) isAvailable = false;
      } else {
        isAvailable = false;
      }
    });
    return isAvailable;
  }
  
  removeFromInventory(items) {
    _.forEach(items, (item) => {
      if (item.amount === 0) return;
      
      const existing = this._getIdFromInventory(item.id);
      if (existing) {
        if (item.amount > existing.amount) console.warn('Cannot remove ', item.amount, item.id, ', not enough in inventory');
        existing.amount -= item.amount; 
      } else { console.warn('Cannot remove ', item, ', not present in inventory'); }
    });
  }
  
  applyDailyFoodConsumption() {
    const employeesCount = this.getAllEmployeesCount();
    const requiredNutrition = DAILY_FOOD_DEMAND_PER_EMPLOYEE * employeesCount;
    const consumedFood = OrganicService.getFoodEquivalentOfNutritionUnitsFromInventory(this.inventory, requiredNutrition);
    if (consumedFood) this.removeFromInventory(consumedFood);
  }
  
  // @debug
  addCompleteInventory() {
    this._addToInventory([...MineralsService.getAllItems(), ...OrganicService.getAllItems()]);
  }
  
  startBuildingOrUpgrade(building) {
    const buildCostTool = _.find(building.levelTools, ['id', 'buildCost']);
    const cost = _.map(buildCostTool.valueGetter(building.level + 1), (costTuple) => MineralsService.getMineralItemById(costTuple[1], costTuple[0]));
    const buildPossible = this._checkIfItemsAvailableInInventory(cost);
    
    if (buildPossible) {
      const allBuildings = this._getAllBuiltAndAvailableBuildings();
      const buildingInstance = _.find(allBuildings, ['id', building.id]);
      this.removeFromInventory(cost);
      
      if (buildingInstance.level) {
        buildingInstance.level++;
      } else {
        buildingInstance.level = 1;
        this._addBuildingToInventory(buildingInstance);
      }
      return true;
    } else {
      return false;
    }
  }
  
  startBuildingVehicle(vehicle) {
    const buildCostTool = _.find(vehicle.levelTools, ['id', 'buildCost']);
    const cost = _.map(buildCostTool.valueGetter(vehicle.level + 1), (costTuple) => MineralsService.getMineralItemById(costTuple[1], costTuple[0]));
    const buildPossible = this._checkIfItemsAvailableInInventory(cost);

    if (buildPossible) {
      const allVehicles = this._getAllBuiltAndAvailableVehicles();
      const vehicleInstance = _.find(allVehicles, ['id', vehicle.id]);

      vehicleInstance.level = 1;
      this._addVehicleToInventory(vehicleInstance);
      return true;
    } else {
      return false;
    }
  }
}
