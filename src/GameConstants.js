const SIDE_PANEL_WIDTH = 440;
const TOTAL_WIDTH = 1920;
const TOTAL_HEIGHT = 1080;

export default class GameConstants {
  static get BOARD_WIDTH() {
    return TOTAL_WIDTH - SIDE_PANEL_WIDTH;
  }
  
  static get TOTAL_WIDTH() {
    return TOTAL_WIDTH;
  }
  
  static get HEIGHT() {
    return TOTAL_HEIGHT;
  }
}
