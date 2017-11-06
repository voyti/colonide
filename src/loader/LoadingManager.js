export default class LoadingManager {
  
  static loadGameAssets(game) {
    game.load.image('space-bg', 'resources/Space.png');
    game.load.image('terrestrial-1', 'resources/Dark PLanet.png');
    game.load.image('terrestrial-2', 'resources/Red Planet 1.png');
    game.load.image('terrestrial-3', 'resources/Sand Planet.png'); // low water, high temp
    game.load.image('terrestrial-4', 'resources/Water Planet wWih Small Islands.png'); // temp above 0, low yield mining
    game.load.image('terrestrial-5', 'resources/red planet sputnik.png');
    game.load.image('terrestrial-6', 'resources/Lava PLanet.png'); // high temp, low yield mining
    game.load.image('terrestrial-7', 'resources/earth-like.png');
    game.load.image('ice-1', 'resources/Ice Planet.png');
    game.load.image('ice-2', 'resources/Red Planet With Ice.png');
    game.load.image('gas-1', 'resources/Orange Planet.png');
    game.load.image('gas-2', 'resources/Storm Planet.png');
    game.load.image('gas-3', 'resources/cyan planet.png');
    game.load.image('helium-1', 'resources/grey planet.png');
    game.load.image('helium-2', 'resources/white planet.png');
    game.load.image('ocean-1', 'resources/blue planet.png');
    game.load.image('ocean-2', 'resources/Water Planet wWih Small Islands.png');
    game.load.image('galaxy', 'resources/Galaxy.png');
    game.load.image('star-1', 'resources/Sun.png');
    game.load.image('star-2', 'resources/white dwarf star.png');
  }
}
