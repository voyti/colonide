/* global Phaser */

let instance = null;
export default class GameStateInterface {
  
  constructor() {
    this.state = (this.game ? this.state : 'uninitialized');
    
    this.MONTHS_IN_YEAR = 12;
    this.DAYS_IN_MONTH = 30;
    this.MILLIS_PER_DAY = 1000;
  }
  
  static getInstance() {
    return instance || (instance = new GameStateInterface());
  }
  
  initialize(game, state) {
    if (game) {
      this.game = game;
      this.state = 'initial';
      this.time = game.time;
      this.initializedAt = game.time.time;
    }
    return GameStateInterface.getInstance();
  }
  
  isInitialized() {
    return this.state !== 'uninitialized';
  } 
  
  getGameTimeElapsed() {
    return this.time.time - this.initializedAt;
  }  
  
  getGameTimeElapsedDetails() {
    const elapsed = this.getGameTimeElapsed();
    const gameYears = Math.ceil(elapsed / this.MILLIS_PER_DAY / this.DAYS_IN_MONTH / this.MONTHS_IN_YEAR);
    const extraFromYears = elapsed % (this.MILLIS_PER_DAY * this.DAYS_IN_MONTH * this.MONTHS_IN_YEAR);
    
    const gameMonths = Math.ceil(extraFromYears / this.MILLIS_PER_DAY / this.DAYS_IN_MONTH);
    const extraFromMonths = extraFromYears % (this.MILLIS_PER_DAY * this.DAYS_IN_MONTH);
    
    const gameDays = Math.ceil(extraFromMonths / this.MILLIS_PER_DAY);

    return { elapsed, gameYears, gameMonths, gameDays  };
  }
  
  getState() {
    return this.state;
  }
  
  checkState(state) {
    return this.state === state;
  }
  
  setState(state) {
    console.info('GAME STATE CHANGED TO ', state, ' FROM ', this.state);
    this.state = state;
  }
  
  getGameTime() {
    return this.time;
  }
}
