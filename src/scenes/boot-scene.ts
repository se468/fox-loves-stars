import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Boot',
};

/**
 * The initial scene that loads all necessary assets to the game and displays a loading bar.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public preload() {
    const halfWidth = getGameWidth(this) * 0.5;
    const halfHeight = getGameHeight(this) * 0.5;

    const progressBarHeight = 100;
    const progressBarWidth = 400;

    const progressBarContainer = this.add.rectangle(halfWidth, halfHeight, progressBarWidth, progressBarHeight, 0x000000);
    const progressBar = this.add.rectangle(halfWidth + 20 - progressBarContainer.width * 0.5, halfHeight, 10, progressBarHeight - 20, 0x888888);

    const loadingText = this.add.text(halfWidth - 75, halfHeight - 100, 'Loading...').setFontSize(24);
    const percentText = this.add.text(halfWidth - 25, halfHeight, '0%').setFontSize(24);
    const assetText = this.add.text(halfWidth - 25, halfHeight + 100, '').setFontSize(24);

    this.load.on('progress', (value) => {
      progressBar.width = (progressBarWidth - 30) * value;

      const percent = Math.round(value * 100);
      percentText.setText(`${percent}%`);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(file.key);
    });

    this.load.on('complete', () => {
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      progressBar.destroy();
      progressBarContainer.destroy();
      this.scene.start('MainMenu');
    });

    this.loadAssets();

    this.physics.world.setFPS(120);
  }

  /**
   * All assets that need to be loaded by the game (sprites, images, animations, tiles, music, etc)
   * should be added to this method. Once loaded in, the loader will keep track of them, indepedent of which scene
   * is currently active, so they can be accessed anywhere.
   */
  private loadAssets() {

    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('pause', 'assets/pause.png');
    this.load.image('sound', 'assets/sound.png');
    this.load.image('mute', 'assets/mute.png');
    this.load.image('left', 'assets/left.png');
    this.load.image('right', 'assets/right.png');
    this.load.image('up', 'assets/up.png');

    // new
    this.load.image('background', 'assets/BG.png');
    this.load.spritesheet('character-walk', 'assets/walk.png',
        { frameWidth: 547, frameHeight: 481 },
    );

    this.load.image('tiles', 'assets/maps/Spritesheet/sheet.png');
    this.load.tilemapTiledJSON('map', 'assets/maps/level1.json');

    this.load.audio('background-music', 'assets/sound/476547__mrthenoronha__platform-game-theme-loop-3.wav');
    this.load.audio('jump-sound', 'assets/sound/331381__qubodup__public-domain-jump-sound.wav');
    this.load.audio('coin-sound', 'assets/sound/173323__soundnimja__coin-4.wav');
  }
}
