class ChooseLevelMenu extends Phaser.Scene{
    constructor(){
        super("chooseLevelMenu")
    }
    preload(){
        this.load.image("table","assets/table.png")
    }
    create(){
        this.canClick=false;
        this.clickButtonAudio=this.sound.add('clickButtonAudio');
        this.addTableLevel();
        this.addButtonLevel1();
        this.addHomeButton(1200,70)
    }
    addButtonLevel1() {
        this.addLevel1();

        this.addLevel2();
        this.addLevel3()
        this.addLevel4()
        this.addLevel5()
        this.addLevel6()
    }
    addLevel5() {
        this.level5Button = this.add.sprite(930, 240, "assets", "levelNormal").setInteractive();
        this.add.text(923, 220, '5', { fontFamily: 'Fantasy', fontSize: '32px' });
        this.level5Button.on('pointerdown', this.playLevel5, this);
        this.level5Button.on('pointerup', () => { this.setButtonEvent(this.level5Button, "levelNormal"); }, this);
        this.level5Button.on('pointerover', () => { this.setButtonEvent(this.level5Button, "levelHover"); }, this);
        this.level5Button.on('pointerout', () => { this.setButtonEvent(this.level5Button, "levelNormal"); }, this);
    }
    addLevel4() {
        this.level4Button = this.add.sprite(785, 240, "assets", "levelNormal").setInteractive();
        this.add.text(777, 220, '4', { fontFamily: 'Fantasy', fontSize: '32px' });
        this.level4Button.on('pointerdown', this.playLevel4, this);
        this.level4Button.on('pointerup', () => { this.setButtonEvent(this.level4Button, "levelNormal"); }, this);
        this.level4Button.on('pointerover', () => { this.setButtonEvent(this.level4Button, "levelHover"); }, this);
        this.level4Button.on('pointerout', () => { this.setButtonEvent(this.level4Button, "levelNormal"); }, this);
    }
    addLevel3() {
        this.level3Button = this.add.sprite(635, 240, "assets", "levelNormal").setInteractive();
        this.add.text(627, 220, '3', { fontFamily: 'Fantasy', fontSize: '32px' });
        this.level3Button.on('pointerdown', this.playLevel3, this);
        this.level3Button.on('pointerup', () => { this.setButtonEvent(this.level3Button, "levelNormal"); }, this);
        this.level3Button.on('pointerover', () => { this.setButtonEvent(this.level3Button, "levelHover"); }, this);
        this.level3Button.on('pointerout', () => { this.setButtonEvent(this.level3Button, "levelNormal"); }, this);
    }
    addLevel2() {
        this.level2Button = this.add.sprite(480, 240, "assets", "levelNormal").setInteractive();
        this.add.text(473, 220, '2', { fontFamily: 'Fantasy', fontSize: '32px' });
        this.level2Button.on('pointerdown', this.playLevel2, this);
        this.level2Button.on('pointerup', () => { this.setButtonEvent(this.level2Button, "levelNormal"); }, this);
        this.level2Button.on('pointerover', () => { this.setButtonEvent(this.level2Button, "levelHover"); }, this);
        this.level2Button.on('pointerout', () => { this.setButtonEvent(this.level2Button, "levelNormal"); }, this);
    }

    addLevel1() {
        this.level1Button = this.add.sprite(325, 240, "assets", "levelNormal").setInteractive();
        this.add.text(317, 220, '1', { fontFamily: 'Fantasy', fontSize: '32px' });
        this.level1Button.on('pointerdown', this.playLevel1, this);
        this.level1Button.on('pointerup', () => { this.setButtonEvent(this.level1Button, "levelNormal"); }, this);
        this.level1Button.on('pointerover', () => { this.setButtonEvent(this.level1Button, "levelHover"); }, this);
        this.level1Button.on('pointerout', () => { this.setButtonEvent(this.level1Button, "levelNormal"); }, this);
    }
    addLevel6() {
        this.level6Button = this.add.sprite(325, 360, "assets", "levelNormal").setInteractive();
        this.add.text(317, 340, '6', { fontFamily: 'Fantasy', fontSize: '32px' });
        this.level6Button.on('pointerdown', this.playLevel6, this);
        this.level6Button.on('pointerup', () => { this.setButtonEvent(this.level6Button, "levelNormal"); }, this);
        this.level6Button.on('pointerover', () => { this.setButtonEvent(this.level6Button, "levelHover"); }, this);
        this.level6Button.on('pointerout', () => { this.setButtonEvent(this.level6Button, "levelNormal"); }, this);
    }

    addTableLevel() {
        this.table = this.add.sprite(100, 100, "table").setOrigin(0, 0).setScale(2.3);
        this.table.y -= 100;
        this.table.x += 110;
        this.add.text(535, 40, 'Level Select', { fontFamily: 'Fantasy' ,fontSize: '40px'});
    }
    addHomeButton(_x,_y) {
        this.homeButton = this.add.sprite(_x,_y, "assets", "pausedNormal").setInteractive();
        this.homeButton.on('pointerover', () => { this.setButtonEvent(this.homeButton, "pausedHover"); }, this);
        this.homeButton.on('pointerout', () => { this.setButtonEvent(this.homeButton, "pausedNormal"); }, this);
        this.homeButton.on('pointerdown', this.clickHomeButton, this);
        this.homeButton.on('pointerup', () => { this.setButtonEvent(this.homeButton, "pausedNormal"); }, this);
    }
    clickHomeButton(){
        this.homeButton.setFrame("pausedClick")
       // this.clickButtonAudio.setSeek(0);
        this.clickButtonAudio.play()
        setTimeout(()=>{
                this.scene.start("startmenu")
                this.table=false
        },1000)
    }
    update(){

    }
    playLevel1(){
        if(this.canClick) return
        this.canClick=true
        this.level1Button.setFrame("levelClick")
      //  this.clickButtonAudio.setSeek(0);
        this.clickButtonAudio.play()
        setTimeout(()=>{
            this.scene.start("level1")
        },700)
    }
    playLevel2(){
        if(this.canClick) return
        this.canClick=true
        this.level2Button.setFrame("levelClick")
      //  this.clickButtonAudio.setSeek(0);
        this.clickButtonAudio.play()
        setTimeout(()=>{
            this.scene.start("level2")
        },700)
    }
    playLevel3(){
        if(this.canClick) return
        this.canClick=true
        this.level3Button.setFrame("levelClick")
      //  this.clickButtonAudio.setSeek(0);
        this.clickButtonAudio.play()
        setTimeout(()=>{
            this.scene.start("level3")
        },700)
    }
    playLevel4(){
        if(this.canClick) return
        this.canClick=true
        this.level4Button.setFrame("levelClick")
      //  this.clickButtonAudio.setSeek(0);
        this.clickButtonAudio.play()
        setTimeout(()=>{
            this.scene.start("level4")
        },700)
    }
    playLevel5(){
        if(this.canClick) return
        this.canClick=true
        this.level5Button.setFrame("levelClick")
      //  this.clickButtonAudio.setSeek(0);
        this.clickButtonAudio.play()
        setTimeout(()=>{
            this.scene.start("level5")
        },700)
    }
    playLevel6(){
        if(this.canClick) return
        this.canClick=true
        this.level6Button.setFrame("levelClick")
      //  this.clickButtonAudio.setSeek(0);
        this.clickButtonAudio.play()
        setTimeout(()=>{
            this.scene.start("level6")
        },700)
    }
    setButtonEvent(_button,_frame){
        _button.setFrame(_frame);
    }
}