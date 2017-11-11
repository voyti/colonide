import templateUrl from './topBar.html';
import './topBar.scss';
import GameStateInterface from 'GameStateInterface';
import GameConstants from 'GameConstants';

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
    this.width = `${GameConstants.WIDTH}px`;
    this.GameStateInterface = GameStateInterface.getInstance();

    this.$interval(() => {
      if (this.GameStateInterface.isInitialized()) {
        this.setDisplayGameTime(this.GameStateInterface.getGameTimeElapsedDetails());
      }
    }, 500);
  }
  
  setDisplayGameTime(gameTimeElapsedDetails) {
    const timeDetails = gameTimeElapsedDetails;
    this.elapsedDays = timeDetails.gameDays;
    this.elapsedMonths = timeDetails.gameMonths;
    this.elapsedYears = timeDetails.gameYears;
  }
}