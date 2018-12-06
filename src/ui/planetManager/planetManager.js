import _ from 'lodash';
import angular from 'angular';
import templateUrl from './planetManager.html';
import './planetManager.scss';
import SoundManager from 'sounds/SoundManager';

import overviewUrl from './managerTabs/_overview.html';
import storageUrl from './managerTabs/storage.html';
import buildingsUrl from './managerTabs/buildings.html';
import fleetUrl from './managerTabs/fleet.html';

// import GameConstants from 'GameConstants';
// import GameStateInterface from 'GameStateInterface';
// import EventDispatchInterface from 'EventDispatchInterface';
// import Player from 'mechanics/Player';
// import PlanetDrawer from 'drawing/PlanetDrawer';

const INVENTORY_SIZE = 18;

export default class PlanetManager {
    constructor() {
      'ngInject';
      this.controllerAs = 'manager';
      this.templateUrl = templateUrl;
      this.controller = PlanetManagerController;
      this.bindings = {
        planet: '<',
        gameTime: '<',
      };
    }
}

class PlanetManagerController {
    constructor($timeout, $rootScope) {
      'ngInject';
      this.$timeout = $timeout;
      this.$rootScope = $rootScope;
      // this.GameStateInterface = GameStateInterface.getInstance();
      // this.Player = Player.getInstance();
      this.SoundManager = SoundManager.getInstance();

      this.overviewUrl = overviewUrl;
      this.storageUrl = storageUrl;
      this.buildingsUrl = buildingsUrl;
      this.fleetUrl = fleetUrl;
      this.tabContentChanged = {
        overview: false,
        storage: false,
        buildings: false,
        fleet: false,
      };
      
      this.openedTab = 'overview';
      this.lastTotalDays = 0;
    }
    
    $onChanges(changes) {
      this.inventories = angular.copy({
        organic: this.getTypeInventory('organic'),
        minerals: this.getTypeInventory('mineral'),
        other: this.getTypeInventory('other'),
        buildingMaterials: this.planet.getItemsByApplication('building-material'),
        shipMaterials: this.planet.getItemsByApplication('ship-material'),
      });
      
      this.resetBuildingsAndVehicles();
      
      if (changes.gameTime.currentValue && this.gameTime) {
        this.onDateCheck(this.gameTime);
      }
    }
    
    resetBuildingsAndVehicles() {
      this.builtBuildings = angular.copy(this.planet.getBuildingsOfType('built'));
      this.builtVehicles = angular.copy(this.planet.getVehiclesOfType('built'));
      this.orbitingShips = this.planet.getShipsOfType('on-orbit');

      this.availableBuildings = this.planet.getBuildingsOfType('available');
      this.availableVehicles = this.planet.getVehiclesOfType('available');
      this.availableShips = this.planet.getShipsOfType('available');
    }
    
    onDateCheck(gameTimeElapsedDetails) {
      if (gameTimeElapsedDetails.totalDaysElapsed > this.lastTotalDays) {
        this.lastTotalDays = gameTimeElapsedDetails.totalDaysElapsed;
        this.planet.applyDailyFoodConsumption();
      }
    }
    
    openTab(tabName) {
      this.openedTab = tabName;
      this.SoundManager.play('ui_click');
    }
        
    getTypeInventory(type) {
      const typeItems = this.planet.getTypeInventory(type);

      return _.times(INVENTORY_SIZE, (index) => typeItems[index] || {});
    }
    
    isTabContentChanged(tab) {
      return this.tabContentChanged[tab];
    }  
    
    setTabContentChanged(tab) {
      this.tabContentChanged[tab] = true;
      this.$timeout(() => (this.tabContentChanged[tab] = false), 2000);
    }
    
    startBuildingOrUpgrade(item) {
      const success = item.type === 'building' ?
        this.planet.startBuildingOrUpgrade(item) : this.planet.startBuildingVehicle(item);
        
      if (success) {
        this.SoundManager.play('ui_click');
        this.resetBuildingsAndVehicles();
      } else {
        this.SoundManager.play('ui_click_disabled');
        this.notEnoughMaterials = true;
        this.$timeout(() => (this.notEnoughMaterials = false), 1000);
      }
    }
    
    isActionAvailable(action) {
      if (action === 'launch_expedition') {
        return _.find(this.builtVehicles, ['id', 'scoutRover']);
      }
    }
  }