const config = {
    renderer: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-div'
};

const game = new Phaser.Game(config);

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('title', titleState);
game.state.add('main', mainState);

game.state.start('boot');
