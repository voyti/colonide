import templateUrl from './topBar.html';
import './topBar.scss';
import GameStateInterface from 'GameStateInterface';
import GameConstants from 'GameConstants';
import EventDispatchInterface from 'EventDispatchInterface';
import Player from 'mechanics/Player';

export default class TopBar {
    constructor() {
      'ngInject';
      this.controllerAs = 'bar';
      this.templateUrl = templateUrl;
      this.controller = TopBarController;
      this.bindings = {

      };
    }
}

class TopBarController {
  
  constructor($interval) {
    this.$interval = $interval;
    this.width = `${GameConstants.TOTAL_WIDTH}px`;
    this.GameStateInterface = GameStateInterface.getInstance();
    this.Player = Player.getInstance();

    EventDispatchInterface.on('day-passed', ({ time }) => {
      if (this.GameStateInterface.isInitialized()) {
        this.setDisplayGameTime(time);
      }
    });
  }

  setDisplayGameTime(gameTimeElapsedDetails) {
    const timeDetails = gameTimeElapsedDetails;
    this.elapsedDays = timeDetails.gameDays;
    this.elapsedMonths = timeDetails.gameMonths;
    this.elapsedYears = timeDetails.gameYears;
  }
  
  addCompleteInventory() {
    this.Player.addCompleteInventory();
  }  
  
  timeScale2() {
    this.Player.addCompleteInventory();
  }
}