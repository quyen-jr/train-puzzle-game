class StartMenu extends Phaser.Scene {
    constructor() {
        super("startmenu");
    }
    preload() {
        this.load.image("background","assets/backGroundImage/trainGO.jpg")
    }
    create() {
        // adudio 
        this.addMusicBackgroundAndButton();
        // add "Start Game"
        this.addBackground(); 
        this.addStartButton();
    }
    update(){
    }
    addMusicBackgroundAndButton() {
        this.musicStartMenu = this.sound.add('StartMenuAudio');
        this.musicStartMenu.play();
        this.musicStartMenu.setVolume(0.2);
        this.clickButtonAudio = this.sound.add('clickButtonAudio');
    }

    addBackground() {
        this.backgroundImage = this.add.image(gameWidth / 2, gameHeight / 2, 'background').setOrigin(0.5);
        // Set the size of the image to cover the entire screen
        this.backgroundImage.setDisplaySize(gameWidth, gameHeight);
    }

    addStartButton() {
        this.startButton = this.add.sprite(640, 445, "assets", "normalButton").setInteractive().setAlpha(0.9);
        this.add.text(575, 425, 'Play Game', { fontFamily: 'Fantasy', fontSize: '32px' });
        this.startButton.on('pointerover', () => { this.setButtonEvent(this.startButton, "normalHover"); }, this);
        this.startButton.on('pointerout', () => { this.setButtonEvent(this.startButton, "normalButton"); }, this);
        this.startButton.on('pointerdown', this.startGame, this);
        this.startButton.on('pointerup', () => { this.setButtonEvent(this.startButton, "normalButton"); }, this);
    }

    startGame() {
        this.startButton.setFrame("normalClick")
        this.clickButtonAudio.play()
        setTimeout(() => {
            this.scene.start("chooseLevelMenu")
        }, 1000);
    }
    setButtonEvent(_button,_frame){
        _button.setFrame(_frame);
    }
}