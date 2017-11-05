export default class LoadingManager {
  static loadGameAssets(game) {
    game.load.image('space-bg', 'resources/Space.png');

    
    game.load.image('terrestrial-1', 'Dark PLanet.png');
    game.load.image('terrestrial-2', 'Red Planet 1.png');
    game.load.image('terrestrial-3', 'Sand Planet.png'); // low water, high temp
    game.load.image('terrestrial-4', 'Water Planet wWih Small Islands.png'); // temp above 0, low yield mining
    game.load.image('terrestrial-5', 'red planet sputnik.png');
    game.load.image('terrestrial-6', 'Lava PLanet.png'); // high temp, low yield mining
    game.load.image('terrestrial-7', 'earth-like.png');
    game.load.image('ice-1', 'Ice Planet.png');
    game.load.image('ice-2', 'Red Planet With Ice.png'); // temp below 0
    game.load.image('gas-1', 'Orange Planet.png');
    game.load.image('gas-2', 'Storm Planet.png');
    game.load.image('gas-3', 'cyan planet.png');
    game.load.image('helium-1', 'grey planet.png');
    game.load.image('helium-2', 'white planet.png');
    game.load.image('ocean-1', 'blue planet.png');
    game.load.image('ocean-2', 'Water Planet wWih Small Islands.png'); // temp above 0, low yield mining
    game.load.image('galaxy', 'Galaxy.png');
    game.load.image('star-1', 'Sun.png');
    game.load.image('star-2', 'white dwarf star.png');
  }
  
  static get HEIGHT() {
    return 600;
  }
}
