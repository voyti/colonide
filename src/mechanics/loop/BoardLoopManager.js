/* global _, Phaser */

const planetTextElements = new Map();
const WHITE = '#fff';
const LIGHT_ORANGE = '#f8bc7e';
const DARK_ORANGE = '#dc7928';
const TEAL = '#61edff';
const DARK_TEAL_HEX = 0x658D9D;

export default class BoardLoopManager {
  
  static doLoop(game, planets, planetsRedrawer) {
    _.forEach(planets, (planet) => {
      const sprite = _.get(planet, 'drawingData.sprite');
      let text = planetTextElements.get(planet.name);
      if (sprite && sprite.input.pointerOver()) {
        text = (text && text.exists) ? text : this._addNewPlanetTooltip(game, planet);
        // this._destroyAllTooltips(planet.name);
        text.anchor.set(0.5);
        text.stroke = DARK_ORANGE;
        text.strokeThickness = 4;
        // text.alpha = 0.1;
        // game.add.tween(text).to({ alpha: 1 }, 500, Phaser.Easing.Default, true);
        planetTextElements.set(planet.name, text); 
        
        
      } else if (sprite && text) {
        const textTween = game.add.tween(text).to( { alpha: 0 }, 100, Phaser.Easing.Default, true);
        textTween.onComplete.add((text) => text.destroy());
      }
      
      if (planet.checkState('colonized')) {
        this._drawInfluenceArea(game, planet, planetsRedrawer);
      }
    })
  }
  
  static _destroyAllTooltips(exceptKey) {
    for (const element of planetTextElements.entries()) {
      if (element[0] !== exceptKey && element[1]) element[1].destroy(); 
    }
  }
  
  static _addNewPlanetTooltip(game, planet) {
    return game.add.text(planet.x, planet.y + 20, planet.name, { fill: LIGHT_ORANGE })
  }
  
  static _drawInfluenceArea(game, planet, planetsRedrawer) {
    if (planet.influenceDrawingProgress < 100) {
      const influenceGraphics = planet.drawingData.influenceGraphics || game.add.graphics(0, 0);
      influenceGraphics.clear();
      influenceGraphics.beginFill(DARK_TEAL_HEX, 0.03);
      influenceGraphics.drawCircle(planet.x, planet.y, planet.influenceDrawingProgress * 2);
      influenceGraphics.endFill();
      planet.influenceDrawingProgress++;
      planetsRedrawer();
    }
  } 
}
