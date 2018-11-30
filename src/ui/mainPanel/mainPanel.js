import _ from 'lodash';
import templateUrl from './mainPanel.html';
// import habitableUrl from './panelPartials/habitable.html';
// import nonHabitableUrl from './panelPartials/nonHabitable.html';
// import colonizedUrl from './panelPartials/colonized.html';
import './mainPanel.scss';
import GameConstants from 'GameConstants';
import GameStateInterface from 'GameStateInterface';
import EventDispatchInterface from 'EventDispatchInterface';
import Player from 'mechanics/Player';
// import PlanetDrawer from 'drawing/PlanetDrawer';
// import SoundManager from 'sounds/SoundManager';

export default class MainPanel {
    constructor() {
      'ngInject';
      this.controllerAs = 'panel';
      this.templateUrl = templateUrl;
      this.controller = MainPanelController;
      this.bindings = {
        planet: '<',
      };
    }
}

class MainPanelController {
    constructor($timeout, $scope) {
      'ngInject';
      this.$timeout = $timeout;
      this.GameStateInterface = GameStateInterface.getInstance();
      this.Player = Player.getInstance();

      
      $scope.$on('planet-selected', () => {

      });
    }
  }