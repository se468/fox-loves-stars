import * as Phaser from 'phaser';
import Scenes from './scenes';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'My First Name',

  type: Phaser.CANVAS,

  scale: {
    width: 1000,
    height: 750,

    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: Scenes,

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1200 },
      fps: 120,
      debug: false,
    },
  },

  parent: 'game',

  audio: {
    disableWebAudio: true
  }
};

export const game = new Phaser.Game(gameConfig);
