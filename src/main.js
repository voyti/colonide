/* global Phaser */
import 'phaser-shim';
import 'angular-tooltips';
import angularIndex from './ui/angularIndex';
import 'ui/_ui.module.js';
import 'lodash';

import GameConstants from 'GameConstants';
import LodashMixinsManager from 'LodashMixinsManager';
import GameStateInterface from 'GameStateInterface';
import PlanetGenerator from 'mechanics/PlanetGenerator.js';
import MapGenerator from 'mechanics/MapGenerator.js';
import BoardLoopManager from 'mechanics/loop/BoardLoopManager.js';
import LoadingManager from 'loader/LoadingManager';
import Player from 'mechanics/Player';
import SoundManager from 'sounds/SoundManager';

LodashMixinsManager.loadMixins();
const game = new Phaser.Game(GameConstants.WIDTH, GameConstants.HEIGHT, Phaser.AUTO, '', { preload, create, update });
const overContainer = {};

function preload() {
  LoadingManager.loadGameAssets(game);
}

function create() {
    const soundManager = SoundManager.getInstance().initialize(game);
    const gameStateInterface = GameStateInterface.getInstance().initialize(game);
    const player = Player.getInstance();
    
    const gen = new PlanetGenerator();
    const planets = gen.generate(12);

    game.add.sprite(0, 0, 'space-bg');

    overContainer.planets = planets;
    
    (new MapGenerator).generateMap(planets, game);
    // soundManager.play('game_start');
    LoadingManager.deferredLoadMusic(game);
    setTimeout(() => soundManager.play('music_upbeat_1'), 10000);
}

function update() {
  BoardLoopManager.doLoop(game, overContainer.planets);
}