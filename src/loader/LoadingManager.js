export default class LoadingManager {
  
  static loadGameAssets(game) {
    game.load.image('space-bg', 'resources/planets/Space.png');
    game.load.image('terrestrial-1', 'resources/planets/terrestrial-1.png');
    game.load.image('terrestrial-2', 'resources/planets/terrestrial-2.png');
    game.load.image('terrestrial-3', 'resources/planets/terrestrial-3.png');// low water, high temp
    game.load.image('terrestrial-4', 'resources/planets/terrestrial-4.png');// temp above 0, low yield mining
    game.load.image('terrestrial-5', 'resources/planets/terrestrial-5.png');
    game.load.image('terrestrial-6', 'resources/planets/terrestrial-6.png');// high temp, low yield mining
    game.load.image('terrestrial-7', 'resources/planets/terrestrial-7.png');
    game.load.image('ice-1', 'resources/planets/ice-1.png');
    game.load.image('ice-2', 'resources/planets/ice-2.png');
    game.load.image('gas-1', 'resources/planets/gas-1.png');
    game.load.image('gas-2', 'resources/planets/gas-2.png');
    game.load.image('gas-3', 'resources/planets/gas-3.png');
    game.load.image('helium-1', 'resources/planets/helium-1.png');
    game.load.image('helium-2', 'resources/planets/helium-2.png');
    game.load.image('ocean-1', 'resources/planets/ocean-1.png');
    game.load.image('ocean-2', 'resources/planets/ocean-2.png');
    game.load.image('galaxy', 'resources/planets/Galaxy.png');
    game.load.image('star-1', 'resources/planets/Sun.png');
    game.load.image('star-2', 'resources/planets/white dwarf star.png');
  }
}
