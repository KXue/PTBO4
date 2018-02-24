const titleState = {
    create: function(){
        console.log('title');
        let startButton = this.add.image(400, 300, 'hand');
        startButton.anchor.set(0.5, 0.5);
        startButton.inputEnabled = true;
        startButton.events.onInputDown.add(this.onStartButtonPressed, this);
    },
    onStartButtonPressed: function(){
        this.state.start('main');
    }
}

// class Title extends Phaser.Scene{
//     constructor(){
//         super({key: 'title'});
//     }
//     create(){
//         console.log('title');
//         this.startButton = this.add.image(400, 300, 'hand').setInteractive();
//         this.input.on('gameobjectdown', this.onStartButtonPressed, this);
//     }
//     onStartButtonPressed(pointer, gameObject){
//         console.log("down");

//         if(gameObject === this.startButton){
//             this.scene.start('main');
//         }
//     }
// }