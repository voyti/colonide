/* global Phaser, _ */
import GameConstants from './GameConstants';
import LodashMixinsManager from './LodashMixinsManager';
import PlanetGenerator from './mechanics/PlanetGenerator.js';
import MapGenerator from './mechanics/MapGenerator.js';

LodashMixinsManager.loadMixins();
const game = new Phaser.Game(GameConstants.WIDTH, GameConstants.HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('space-bg', 'resources/Space.png');
}

function create() {
    game.add.sprite(0, 0, 'space-bg');
    const graphics = game.add.graphics(0, 0);
    
    const gen = new PlanetGenerator();
    const planets = gen.generate(12);
    
    (new MapGenerator).generateMap(planets, graphics);
}

function update() {
    
}