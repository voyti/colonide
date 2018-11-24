import _ from 'lodash';
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

export default class PlanetManager {
    constructor() {
      'ngInject';
      this.controllerAs = 'manager';
      this.templateUrl = templateUrl;
      this.controller = PlanetManagerController;
      this.bindings = {
        planet: '<',
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
      
      this.openedTab = 'overview';
    }
    
    openTab(tabName) {
      this.openedTab = tabName;
      this.SoundManager.play('ui_click');
    }
  }