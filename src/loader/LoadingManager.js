const PLANET_TO_IMG_URL_LOOKUP = { 
  'space-bg': 'resources/planets/Space.png',
  'terrestrial-1': 'resources/planets/terrestrial-1.png',
  'terrestrial-2': 'resources/planets/terrestrial-2.png',
  'terrestrial-3': 'resources/planets/terrestrial-3.png',
  'terrestrial-4': 'resources/planets/terrestrial-4.png',
  'terrestrial-5': 'resources/planets/terrestrial-5.png',
  'terrestrial-6': 'resources/planets/terrestrial-6.png',
  'terrestrial-7': 'resources/planets/terrestrial-7.png',
  'ice-1': 'resources/planets/ice-1.png',
  'ice-2': 'resources/planets/ice-2.png',
  'gas-1': 'resources/planets/gas-1.png',
  'gas-2': 'resources/planets/gas-2.png',
  'gas-3': 'resources/planets/gas-3.png',
  'helium-1': 'resources/planets/helium-1.png',
  'helium-2': 'resources/planets/helium-2.png',
  'ocean-1': 'resources/planets/ocean-1.png',
  'ocean-2': 'resources/planets/ocean-2.png',
  'galaxy': 'resources/planets/Galaxy.png',
  'star-1': 'resources/planets/Sun.png',
  'star-2': 'resources/planets/white dwarf star.png'
};

export default class LoadingManager {
  
  static loadImages(game) {
    game.load.image('space-bg', PLANET_TO_IMG_URL_LOOKUP['space-bg']);
    game.load.image('terrestrial-1', PLANET_TO_IMG_URL_LOOKUP['terrestrial-1']);
    game.load.image('terrestrial-2', PLANET_TO_IMG_URL_LOOKUP['terrestrial-2']);
    game.load.image('terrestrial-3', PLANET_TO_IMG_URL_LOOKUP['terrestrial-3']);// low water, high temp
    game.load.image('terrestrial-4', PLANET_TO_IMG_URL_LOOKUP['terrestrial-4']);// temp above 0, low yield mining
    game.load.image('terrestrial-5', PLANET_TO_IMG_URL_LOOKUP['terrestrial-5']);
    game.load.image('terrestrial-6', PLANET_TO_IMG_URL_LOOKUP['terrestrial-6']);// high temp, low yield mining
    game.load.image('terrestrial-7', PLANET_TO_IMG_URL_LOOKUP['terrestrial-7']);
    game.load.image('ice-1', PLANET_TO_IMG_URL_LOOKUP['ice-1']);
    game.load.image('ice-2', PLANET_TO_IMG_URL_LOOKUP['ice-2']);
    game.load.image('gas-1', PLANET_TO_IMG_URL_LOOKUP['gas-1']);
    game.load.image('gas-2', PLANET_TO_IMG_URL_LOOKUP['gas-2']);
    game.load.image('gas-3', PLANET_TO_IMG_URL_LOOKUP['gas-3']);
    game.load.image('helium-1', PLANET_TO_IMG_URL_LOOKUP['helium-1']);
    game.load.image('helium-2', PLANET_TO_IMG_URL_LOOKUP['helium-2']);
    game.load.image('ocean-1', PLANET_TO_IMG_URL_LOOKUP['ocean-1']);
    game.load.image('ocean-2', PLANET_TO_IMG_URL_LOOKUP['ocean-2']);
    game.load.image('galaxy', PLANET_TO_IMG_URL_LOOKUP['galaxy']);
    game.load.image('star-1', PLANET_TO_IMG_URL_LOOKUP['star-1']);
    game.load.image('star-2', PLANET_TO_IMG_URL_LOOKUP['star-2']);
  }
  
  static getPlanetImageUrl(planetDisplayType) {
    return PLANET_TO_IMG_URL_LOOKUP[planetDisplayType];
  }
  
  static loadAudio(game) {
    // game.load.audio('ambient_1', 'resources/audio/Background Loop Distant Planet.mp3');
    // game.load.audio('music_1', 'resources/audio/Epic Backing Track.mp3');

    game.load.audio('thud', 'resources/audio/push.mp3');
    game.load.audio('thud_bounce', 'resources/audio/disabled_bounce.mp3');
    game.load.audio('farm_action', 'resources/audio/farm_action.wav');
    game.load.audio('mine_action', 'resources/audio/mine_action.wav');

    game.load.audio('colonize_progress', 'resources/audio/colonize_progress.mp3');
    game.load.audio('upbeat_drums', 'resources/audio/colonize_done.mp3');
  }
  
  static loadGameAssets(game) {
    LoadingManager.loadImages(game);
    LoadingManager.loadAudio(game);
  }
  
  static deferredLoadMusic(game) {
    game.load.audio('music_upbeat_1', 'resources/audio/music/upbeat_1.m4a');
    game.load.audio('music_upbeat_2', 'resources/audio/music/upbeat_2.m4a');
  }
}

