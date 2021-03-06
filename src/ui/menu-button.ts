import * as Phaser from 'phaser';

const padding = 15;

export class MenuButton extends Phaser.GameObjects.Rectangle {
  private label: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number, text: string, onClick?: () => void) {
    super(scene, x, y);
    scene.add.existing(this);
    this.setOrigin(0, 0);

    this.label = scene.add.text(x + padding, y + padding, text, {
      fontFamily: 'Fredoka One',
      fill: '#3386FF',
    }).setFontSize(50).setStroke('#FFFFFF', 5);

    const labelWidth = this.label.width + padding;
    const labelHeight = this.label.height + padding;

    this.width = labelWidth;
    this.height = labelHeight;

    this.setInteractive({ useHandCursor: true })
      .on('pointerover', this.enterMenuButtonHoverState)
      .on('pointerout', this.enterMenuButtonRestState)
      .on('pointerdown', this.enterMenuButtonActiveState)
      .on('pointerup', this.enterMenuButtonHoverState);

    if (onClick) {
      this.on('pointerup', onClick);
    }

    this.enterMenuButtonRestState();
  }

  public show() {
    this.label.visible = true;
  }
  public hide() {
    this.label.visible = false;
  }

  private enterMenuButtonHoverState() {
    this.label.setColor('#FFFF00');
  }

  private enterMenuButtonRestState() {
    this.label.setColor('#3386FF');
  }

  private enterMenuButtonActiveState() {
    this.label.setColor('#FFFF00');
  }
}
