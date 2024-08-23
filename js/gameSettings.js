const gameWidth=1280
const gameHeight=720
const totalLevel=6
const config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    backgroundColor: "#87CEEB", // red
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false, // Set to true for debugging physics
        },
    },
    scene: [LoadAsset,ChooseLevelMenu,StartMenu,Level1,Level2,Level3,Level4,Level5,Level6]
};

 var game = new Phaser.Game(config);
// this.path = new Phaser.Curves.Path(200, 300);

// //this.path.splineTo([ 164, 446, 274, 542, 412, 457, 522, 541, 664, 464 ]);

// this.path.lineTo(200, 500);

// this.path.ellipseTo(-50, 50, 0, 90, false, 0);
// this.path.lineTo(450, 550);
// this.path.ellipseTo(-50, 50, 90, 180, false,0);
// this.path.lineTo(500,300);
// this.path.ellipseTo(50, -50, 0, 90, false,0);
// this.path.lineTo(250,250);
// this.path.ellipseTo(50, -50, 90, 180, false,0);
// this.path.lineTo(200,750);