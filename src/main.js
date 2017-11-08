/* global Phaser, _ */
import 'phaser-shim';
// import PIXI from 'pixi.js';
// import 'phaser/src/pixi/utils/CanvasPool';
// import 'phaser/src/pixi/utils/EarCut';
// import 'phaser/src/pixi/utils/EventTarget';
// import 'phaser/src/pixi/utils/Utils';
// import p2 from 'p2';
// import Phaser from 'phaser';
import angularIndex from './angularIndex';
import _ from 'lodash';

import GameConstants from './GameConstants';
import LodashMixinsManager from './LodashMixinsManager';
import PlanetGenerator from './mechanics/PlanetGenerator.js';
import MapGenerator from './mechanics/MapGenerator.js';
import BoardLoopManager from './mechanics/loop/BoardLoopManager.js';
import LoadingManager from './loader/LoadingManager';


LodashMixinsManager.loadMixins();
const game = new Phaser.Game(GameConstants.WIDTH, GameConstants.HEIGHT, Phaser.AUTO, '', { preload, create, update });
const overContainer = {};

function preload() {
  LoadingManager.loadGameAssets(game);
}

function create() {
    game.add.sprite(0, 0, 'space-bg');
    const graphics = game.add.graphics(0, 0);
    
    const gen = new PlanetGenerator();
    const planets = gen.generate(12);
    overContainer.planets = planets;
    
    (new MapGenerator).generateMap(planets, game);
}

function update() {
    BoardLoopManager.doLoop(game, overContainer.planets);
}