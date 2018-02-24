const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'game-div',
    scene: [Boot, Load, Title, Main]
};

const game = new Phaser.Game(config);