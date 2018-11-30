import _ from 'lodash';
import angular from 'angular';
import templateUrl from './planetManager.html';
import './planetManager.scss';
import SoundManager from 'sounds/SoundManager';

import overviewUrl from './managerTabs/overview.html';
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
    constructor($timeout, $scope) {
      'ngInject';
      this.$timeout = $timeout;
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
        buildingMaterials: this.getInventoryByApplication('building-material'),
      });
      
      this.builtBuildings = this.planet.getBuildingsOfType('built');
      this.availableBuildings = this.planet.getBuildingsOfType('available');
      
      if (changes.gameTime.currentValue && this.gameTime) {
        this.onDateCheck(this.gameTime);
      }
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
    
    getInventoryByApplication(application) {
      return this.planet.getInventoryByApplication(application);
    }
    
    isTabContentChanged(tab) {
      return this.tabContentChanged[tab];
    }  
    
    setTabContentChanged(tab) {
      this.tabContentChanged[tab] = true;
      this.$timeout(() => (this.tabContentChanged[tab] = false), 2000);
    }
  }