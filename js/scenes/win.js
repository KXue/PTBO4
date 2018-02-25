const winState = {
        create: function(){
        console.log('win');
        const winText = this.add.text(game.width * 0.5, game.height * 0.5, 'You Win', CONSTANTS.titleStyle);
        const backButton = this.add.image(game.width * 0.5, game.height * 0.75, 'back');
        backButton.anchor.set(0.5, 0.5);
        backButton.inputEnabled = true;
        backButton.events.onInputDown.add(this.onBackButtonPressed, this);
    },
    onBackButtonPressed: function(){
        this.state.start('title');
    }
}