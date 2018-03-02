const config = {
    renderer: Phaser.AUTO,
    width: CONSTANTS.width,
    height: CONSTANTS.height,
    parent: 'game-div'
};

const game = new Phaser.Game(config);

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('title', titleState);
game.state.add('select', levelSelectState);
game.state.add('main', mainState);
game.state.add('win', winState);
game.state.add('loss', lossState);
game.state.start('boot');
