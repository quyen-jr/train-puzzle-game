class LoadAsset extends Phaser.Scene{
    constructor(){
        super("Load Assets")
    }
    preload(){
        // assets 
        this.load.atlas("assets","assets/assets.png","assets/assets.json")
        // background
        this.load.image("houseStation","assets/houseStation.png")
        this.load.image("ball","assets/ddddddddddd.png")
        this.load.image("grass","assets/backGroundImage/grass.png")
        // road
        // win table 
        this.load.atlas("winAssets","assets/winTableAsset/winAssets.png","assets/winTableAsset/winAssets.json")
        this.load.image("star","assets/winTableAsset/star.png")

        // audio 
        this.load.audio('StartMenuAudio', 'assets/music/musicStartMenu.mp3')
        this.load.audio('clickButtonAudio', 'assets/music/clickButtonAudio.mp3')
        this.load.audio('winAudio', 'assets/music/winAudio.mp3')
        this.load.audio('loseAudio', 'assets/music/loseGameAudio.wav')
        this.load.audio('crashed', 'assets/music/crashed.mp3')
        this.load.audio('trainAudio', 'assets/music/trainAudio.mp3')
    }
    create(){
        // play game
        this.scene.start("startmenu")
    }
}