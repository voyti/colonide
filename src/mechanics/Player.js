let instance = null;
export default class Player {
  
  constructor(inventory) {
    this.inventory = inventory;
  }
  
  static getInstance() {
    return instance || (instance = new Player());
  }
 
}