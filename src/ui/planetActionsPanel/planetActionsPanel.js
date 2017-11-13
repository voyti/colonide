import templateUrl from './planetActionsPanel.html';
import './planetActionsPanel.scss';
// import GameConstants from 'GameConstants';
// import GameStateInterface from 'GameStateInterface';
// import EventDispatchInterface from 'EventDispatchInterface';
// import Player from 'mechanics/Player';

export default class PlanetActionsPanel {
  constructor() {
    'ngInject';
    this.controllerAs = 'actionsPanel';
    this.templateUrl = templateUrl;
    this.controller = PlanetActionsPanelController;
    this.bindings = {
      planet: '<',
    };
  }
}

class PlanetActionsPanelController {
  constructor($timeout) {
    'ngInject';
    // this.$timeout = $timeout;
    // this.GameStateInterface = GameStateInterface.getInstance();
    // this.Player = Player.getInstance();
    // this.colonizationStarted = false;
    // this.debugMode = false;
  }
}