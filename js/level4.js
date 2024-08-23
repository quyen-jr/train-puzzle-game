class Level4 extends Phaser.Scene{
    constructor(){
        super("level4")
        this.followerRed= { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerYellow = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerYellow2 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.level=4
    }
    preload(){
        Phaser.Cache.enabled = false;
        this.load.json('level4Data', '/levelData/level4.json');
        this.load.atlas("crossing","assets/crossing.png","assets/crossing.json")
        this.load.image("yellowTrain","assets/yellowTrain.png")
    }
    create(){
        this.canPlay=false
        this.lose=false
        this.table=false
        this.win=0
        // red 
        this.redGoToHome=false
        // yellow
        this.yellowGoToHome=false
        // 
        this.canTurnRoad1=false;
        this.canTurnRoad2=false;
        this.canTurnRoad3=false;
        this.turnInCurve1=false
        this.turnInCurve2=false
        this.turnInCurve3=false
        //
        this.allData = this.cache.json.get('level4Data');
        this.graphics = this.add.graphics();
        this.addAudio();
        this.table=false
        this.addBackGround()
        this.addRoadImage()
     //   this.addBackgroundNavigation()
        this.graphics = this.add.graphics();
        this.graphics.setDepth(0);
        this.addBackToMenuButton();
        this.createRoad()
        // this.addCrossingBaries()
        this.addTrafficLight()
        this.addButtonDirection()
        this.addButtonDirection2()
        this.addButtonDirection3()
        this.addTransport()
        this.addHouseStation()
        // this.checkCollision()
        setTimeout(() => {
            this.canPlay=true
            this.trainAudio.play()
        }, 1000);

    }
    addTrafficLight(){
        this.lightIsRed=false
        this.trafficLight = this.add.sprite(890, 335,"assets",'trafficLight').setScale(0.5).setRotation(Phaser.Math.DegToRad(0))
        this.trafficLight.setInteractive()
        this.redTrafficLight = this.add.pointlight(890, 295, 10, 20, 1)
        this.redTrafficLight.color.setTo(255, 0, 0)
        this.redTrafficLight.attenuation = 0.03
        this.redTrafficLight.alpha = 0;
        this.lightIsRed=false
        // green 
        this.greenTrafficLight = this.add.pointlight(890, 310, 10, 20, 1)
        this.greenTrafficLight.color.setTo(0, 255, 0)
        this.greenTrafficLight.attenuation = 0.03
        this.trafficLight.on('pointerover', () => {this.trafficLight.setScale(0.55) }, this)
        this.trafficLight.on('pointerout', () => {this.trafficLight.setScale(0.5) }, this)
        this.trafficLight.on('pointerdown', () => {
            this.trafficLight.setTint(0x808080) 
            this.clickButtonAudio.play()
            if(!this.lightIsRed&&this.followerRed.t<=0.53){
                this.lightIsRed=true;
                this.redTrafficLight.alpha = 1;
                this.greenTrafficLight.alpha = 0;
            }else{
                this.lightIsRed=false;
                this.redTrafficLight.alpha = 0;
                this.greenTrafficLight.alpha = 1;
            }

        }, this)
        this.trafficLight.on('pointerup', () => {this.trafficLight.clearTint() }, this)
    }
    addCrossingBaries(){
    }
    addAudio() {
        this.clickButtonAudio = this.sound.add('clickButtonAudio');
        this.winAudio = this.sound.add('winAudio');
        this.loseAudio = this.sound.add('loseAudio');
        this.crashed = this.sound.add('crashed');
        this.trainAudio = this.sound.add('trainAudio');
        this.trainAudio.play()
    }
    createRoad(){
        //follower
        this.followerYellow = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerYellow2 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerYellow3 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerYellow4 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerYellow5 = { t: 0, vec: new Phaser.Math.Vector2() };
        // red train
        this.followerRed= { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerRed2 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerRed3 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerRed4 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerRed5 = { t: 0, vec: new Phaser.Math.Vector2() };
        //
        this.road1 = new Phaser.Curves.Path(400,700)
        this.road1.lineTo(400,600);
        this.road1.ellipseTo(-50,-50,0,90,false,0);
        this.road1.lineTo(800,550);
        this.road1.ellipseTo(-50,50,0,90,false,-90);
        this.road1.lineTo(852,440);
        this.road1.lineTo(850,380);
        this.road1.ellipseTo(-50,50,0,90,false,180);
        this.road1.lineTo(530,330);
        this.road1.ellipseTo(50,50,0,90,false,90);
        this.road1.lineTo(478,150);
       // this.road1.lineTo(478,180);
        // road 2
        this.road2 = new Phaser.Curves.Path(478,150)
        this.road2.lineTo(478,130);
        this.road2.ellipseTo(-50,50,0,90,false,180);
        this.road2.lineTo(300,80);
        // 
        this.road6 = new Phaser.Curves.Path(478,150)
        this.road6.lineTo(478,0);
        // road 3
        this.road3 = new Phaser.Curves.Path(640,330)
        this.road3.lineTo(690,330);
        this.road3.ellipseTo(50,-50,0,90,false,90);
        this.road3.lineTo(740,100);
        this.road3.ellipseTo(-50,-50,0,90,false,0);
        this.road3.lineTo(850,45);
        this.road3.lineTo(915,45);
        this.road3.ellipseTo(50,50,0,90,false,280);
        this.road3.lineTo(955,200);
        // road 4 of yellow
        this.road4 = new Phaser.Curves.Path(295,500)
        this.road4.lineTo(300,380);
        this.road4.ellipseTo(-50,-50,0,90,false,0);
        this.road4.lineTo(640,330);
        // road 5 of yellow
        this.road5 = new Phaser.Curves.Path(640,330)
        this.road5.lineTo(820,330);
        /// first road of yellow train
        this.curve9= this.add.sprite(347,405,"assets","curveRoad").setScale(0.31).setRotation(Phaser.Math.DegToRad(-90))
        this.straight6= this.add.sprite(435,330,"assets","straightRoad").setScale(0.28).setRotation(Phaser.Math.DegToRad(90))
        this.straight7= this.add.sprite(484,330,"assets","straightRoad").setScale(0.28).setRotation(Phaser.Math.DegToRad(90))
        this.curve9.flipY=true
        // road 1 image
        this.curve1= this.add.sprite(445,625,"assets","curveRoad").setScale(0.3).setRotation(Phaser.Math.DegToRad(88))
        this.curve1.flipX=true
        this.straight1= this.add.sprite(675,550,"assets","straightRoad").setScale(0.23).setRotation(Phaser.Math.DegToRad(90))
        this.straight2= this.add.sprite(635,550,"assets","straightRoad").setScale(0.23).setRotation(Phaser.Math.DegToRad(90))
        this.straight3= this.add.sprite(595,550,"assets","straightRoad").setScale(0.23).setRotation(Phaser.Math.DegToRad(90))
        this.straight4= this.add.sprite(555,550,"assets","straightRoad").setScale(0.23).setRotation(Phaser.Math.DegToRad(90))
        this.straight5= this.add.sprite(515,550,"assets","straightRoad").setScale(0.23).setRotation(Phaser.Math.DegToRad(90))
        this.curve2= this.add.sprite(780,500,"assets","curveRoad").setScale(0.31).setRotation(Phaser.Math.DegToRad(0))
        // road 3 image
        this.curve6= this.add.sprite(790,115,"assets","curveRoad").setScale(0.3).setRotation(Phaser.Math.DegToRad(90))
        this.curve6.flipX=true
        this.curve7= this.add.sprite(908,115,"assets","curveRoad").setScale(0.3).setRotation(Phaser.Math.DegToRad(270))

        // curve 2
        this.curve3= this.add.sprite(780,380,"assets","curveRoad").setScale(0.31).setRotation(Phaser.Math.DegToRad(0))
        this.curve3.flipY=true
        // curve 3
        this.curve4= this.add.sprite(694,260,"assets","curveRoad").setScale(0.3).setRotation(Phaser.Math.DegToRad(90))
        this.curve4.flipY=true
        // curve 4 and road 2 image
        this.straight9= this.add.sprite(477,95,"assets","straightRoad").setScale(0.25).setRotation(Phaser.Math.DegToRad(0))
        this.straight10= this.add.sprite(477,60,"assets","straightRoad").setScale(0.25).setRotation(Phaser.Math.DegToRad(0))
        this.straight11= this.add.sprite(477,25,"assets","straightRoad").setScale(0.25).setRotation(Phaser.Math.DegToRad(0))
        this.straight12= this.add.sprite(477,-10,"assets","straightRoad").setScale(0.25).setRotation(Phaser.Math.DegToRad(0))
        this.curve5= this.add.sprite(526,260,"assets","curveRoad").setScale(0.3).setRotation(Phaser.Math.DegToRad(90))
        this.straight8= this.add.sprite(613,332,"assets","straightRoad").setScale(0.28).setRotation(Phaser.Math.DegToRad(90))
        this.curve8= this.add.sprite(413,122,"assets","curveRoad").setScale(0.27).setRotation(Phaser.Math.DegToRad(0))
        this.curve8.flipY=true

    }
    addHouseStation(){
        this.house = this.add.sprite(270, 85,"assets", "houseStation").setScale(0.5).setRotation(Phaser.Math.DegToRad(90))
        this.house.setDisplaySize(150, 200).setTint(0xFF0000)
        this.house2 = this.add.sprite(960, 205,"assets", "houseStation").setScale(0.5).setRotation(Phaser.Math.DegToRad(360))
        this.house2.setDisplaySize(150, 100).setTint(0xFFFF00)
    }
    addBackgroundNavigation(){ 
        var fillColor=0xff0000 
        var count=0
        if(this.followerYellow.t>=0.9&&this.followerYellow3.t<0.25&&this.followerYellow2.t==0
            ||this.followerYellow.t>=0.9&&this.followerYellow2.t<0.55&&this.followerYellow3.t==0){
                fillColor=0x000000
                this.canTurnRoad1=false;
                count++
            }
        if(this.followerRed.t>=0.63&&this.followerRed.t<0.79){
                fillColor=0x000000
                this.canTurnRoad1=false;
                count++
        }else
        if(count==0){
            fillColor=0xff0000
            this.canTurnRoad1=true
        }else{
            this.canTurnRoad1=false
            fillColor=0x000000
        }
        this.graphics.beginPath();
        this.graphics.lineStyle(10,fillColor, 0.8);
        this.graphics.strokeCircle(700,330,65);
        this.graphics.closePath();
        this.graphics.beginPath();
        this.graphics.fillStyle(fillColor, 0.3);
        this.graphics.fillCircle(700,330,60);
        this.graphics.closePath();            
    }
    addBackgroundNavigation2(){ 
        var fillColor=0x0000ff 
        var count=0
        if(this.followerYellow.t>=0.5&&this.followerYellow.t<=0.85){
                fillColor=0x000000
                this.canTurnRoad2=false;
                count++
        }
        if(this.followerRed.t>=0.8&&this.followerRed.t<0.92){
                fillColor=0x000000
                this.canTurnRoad2=false;
                count++
        }
        if(count==0){
            this.canTurnRoad2=true
            fillColor=0x0000ff 
        }
        // if(count==0){
        //     fillColor=0xff0000
        //     this.canTurnRoad=true
        // }else{
        //     this.canTurnRoad=false
        //     fillColor=0x000000
        // }
        this.graphics.beginPath();
        this.graphics.lineStyle(10,fillColor, 0.7);
        this.graphics.strokeCircle(505,330,55);
        this.graphics.closePath();
        this.graphics.beginPath();
        this.graphics.fillStyle(fillColor, 0.3);
        this.graphics.fillCircle(505,330,50);
        this.graphics.closePath();   
        
    }
    addBackgroundNavigation3(){ 
        var fillColor=0xff0000 
        var count=0
        // if(this.followerYellow2.t>=0.68&&this.followerYellow3.t<0.35&&this.followerYellow4.t==0||
        //     this.followerYellow2.t>=0.68&&this.followerYellow4.t<0.35&&this.followerYellow3.t==0){
        //         fillColor=0x000000
        //         this.canTurnRoad=false;
        //         count++
        //     }096  road 6 082 road 2 0.7
        if(this.followerRed.t>=0.98&&this.followerRed2.t<0.7&&this.followerRed2.t!=0||
            this.followerRed.t>=0.98&&this.followerRed3.t<0.82&&this.followerRed3.t!=0){
                fillColor=0x000000
                this.canTurnRoad3=false;
            }else{
                this.canTurnRoad3=true
            }
        // if(count==0){
        //     fillColor=0xff0000
        //     this.canTurnRoad=true
        // }else{
        //     this.canTurnRoad=false
        //     fillColor=0x000000
        // }
        this.graphics.beginPath();
        this.graphics.lineStyle(10,fillColor, 0.5);
        this.graphics.strokeCircle(470,110,55);
        this.graphics.closePath();
        this.graphics.beginPath();
        this.graphics.fillStyle(fillColor, 0.3);
        this.graphics.fillCircle(470,110,50);
        this.graphics.closePath();    
          
    }
    addBackgroundNavigationCrossing(){
    }
    hideBackToMenuButton(){
        this.backToMenu.visible=false;
        this.backToMenuText.visible=false;
    }
    addButtonDirection() {
        this.downbtn = new Button(this,"assets","forwardDirection",55,46,0.3,false,0);
        this.downbtn.body.setAlpha(0.8);
        this.downbtn.body.rotation = Phaser.Math.DegToRad(180);
        // left curve
        this.leftbtn = new Button(this,"assets","curveDirection",55,46,0.3,false,0);
        this.leftbtn.body.rotation = Phaser.Math.DegToRad(125);
        this.leftbtn.body.flipX=true
        this.leftbtn.body.setAlpha(0.8);
        this.leftbtn.body.visible=false

        //
        this.downbtn.body.on("pointerover", () => { this.downbtn.body.setScale(this.downbtn.scale+0.05) }, this);
        this.downbtn.body.on("pointerout", () => { this.downbtn.body.setScale(this.downbtn.scale) }, this);
        this.downbtn.body.on("pointerdown", () => { 
            if(!this.canTurnRoad1)
                return
            this.clickButtonAudio.play()
            this.downbtn.body.visible=false
            this.leftbtn.body.visible=true
            this.turnInCurve1=true
            // yello train
            // if(this.followerYellow3.t==0&&this.followerYellow4.t==0)
            //    this.YellowTurnCurve2=true
            //    if(this.followerRed3.t==0&&this.followerRed4.t==0)
            //    this.redTurnCurve2=true
         }, this);
    
        this.leftbtn.body.on("pointerover", () => { this.leftbtn.body.setScale(this.leftbtn.scale+0.05) }, this);
        this.leftbtn.body.on("pointerout", () => { this.leftbtn.body.setScale(this.leftbtn.scale) }, this);
        this.leftbtn.body.on("pointerdown", () => {
             if(!this.canTurnRoad1)
                return
            this.clickButtonAudio.play()
            this.downbtn.body.visible=true
            this.leftbtn.body.visible=false
            this.turnInCurve1=false
            // if(this.followerYellow3.t==0&&this.followerYellow4.t==0)
            //     this.YellowTurnCurve2=false
            // if(this.followerRed3.t==0&&this.followerRed4.t==0)
            //     this.redTurnCurve2=false
        }, this);
    
    }
    addButtonDirection2() {
        this.downbtn2 = new Button(this,"assets","forwardDirection",40,46,0.25,false,0);
        this.downbtn2.body.setAlpha(0.9);
        this.downbtn2.body.rotation = Phaser.Math.DegToRad(180);
        // left curve
        this.leftbtn2 = new Button(this,"assets","curveDirection",40,45,0.25,false,0);
        this.leftbtn2.body.rotation = Phaser.Math.DegToRad(240);
      //  this.leftbtn.body.flipX=true
        this.leftbtn2.body.setAlpha(0.9);
        this.leftbtn2.body.visible=false

        //
        this.downbtn2.body.on("pointerover", () => { this.downbtn2.body.setScale(this.downbtn2.scale+0.05) }, this);
        this.downbtn2.body.on("pointerout", () => { this.downbtn2.body.setScale(this.downbtn2.scale) }, this);
        this.downbtn2.body.on("pointerdown", () => { 
            if(!this.canTurnRoad2)
                return
            this.clickButtonAudio.play()
            this.downbtn2.body.visible=false
            this.leftbtn2.body.visible=true
            this.turnInCurve2=true
            // yello train
            // if(this.followerYellow3.t==0&&this.followerYellow4.t==0)
            //    this.YellowTurnCurve2=true
            //    if(this.followerRed3.t==0&&this.followerRed4.t==0)
            //    this.redTurnCurve2=true
         }, this);
    
        this.leftbtn2.body.on("pointerover", () => { this.leftbtn2.body.setScale(this.leftbtn2.scale+0.05) }, this);
        this.leftbtn2.body.on("pointerout", () => { this.leftbtn2.body.setScale(this.leftbtn2.scale) }, this);
        this.leftbtn2.body.on("pointerdown", () => {
             if(!this.canTurnRoad2)
                return
            this.clickButtonAudio.play()
            this.downbtn2.body.visible=true
            this.leftbtn2.body.visible=false
            this.turnInCurve2=false
            // if(this.followerYellow3.t==0&&this.followerYellow4.t==0)
            //     this.YellowTurnCurve2=false
            // if(this.followerRed3.t==0&&this.followerRed4.t==0)
            //     this.redTurnCurve2=false
        }, this);
    
    }
    addButtonDirection3() {
        this.downbtn3 = new Button(this,"assets","forwardDirection",37.2,15,0.25,false,0);
        this.downbtn3.body.setAlpha(0.9);
        this.downbtn3.body.rotation = Phaser.Math.DegToRad(90);
        // left curve
        this.leftbtn3 = new Button(this,"assets","curveDirection",37,15,0.25,false,0);
        this.leftbtn3.body.rotation = Phaser.Math.DegToRad(220);
        this.leftbtn3.body.flipY=true
        this.leftbtn3.body.setAlpha(0.9);
        this.leftbtn3.body.visible=false

        //
        this.downbtn3.body.on("pointerover", () => { this.downbtn3.body.setScale(this.downbtn3.scale+0.05) }, this);
        this.downbtn3.body.on("pointerout", () => { this.downbtn3.body.setScale(this.downbtn3.scale) }, this);
        this.downbtn3.body.on("pointerdown", () => { 
            if(!this.canTurnRoad3)
                return
            this.clickButtonAudio.play()
            this.downbtn3.body.visible=false
            this.leftbtn3.body.visible=true
            this.turnInCurve3=true
            // yello train
            // if(this.followerYellow3.t==0&&this.followerYellow4.t==0)
            //    this.YellowTurnCurve2=true
            //    if(this.followerRed3.t==0&&this.followerRed4.t==0)
            //    this.redTurnCurve2=true
         }, this);
    
        this.leftbtn3.body.on("pointerover", () => { this.leftbtn3.body.setScale(this.leftbtn3.scale+0.05) }, this);
        this.leftbtn3.body.on("pointerout", () => { this.leftbtn3.body.setScale(this.leftbtn3.scale) }, this);
        this.leftbtn3.body.on("pointerdown", () => {
             if(!this.canTurnRoad3)
                return
            this.clickButtonAudio.play()
            this.downbtn3.body.visible=true
            this.leftbtn3.body.visible=false
            this.turnInCurve3=false
            // if(this.followerYellow3.t==0&&this.followerYellow4.t==0)
            //     this.YellowTurnCurve2=false
            // if(this.followerRed3.t==0&&this.followerRed4.t==0)
            //     this.redTurnCurve2=false
        }, this);
    
    }
    //#region   button and table
    addWinTableAndRibbon() {
        this.add.sprite(650, 380, "winAssets", "winTable").setScale(1.4);
        this.add.sprite(650, 200, "winAssets", "ribbon").setScale(1.4);
        this.add.text(595, 160, 'YOU WIN', { fontFamily: 'Fantasy', fontSize: '32px', color: '#FFFF00' });
    }
    addLoseTable() {
        this.add.sprite(650, 380, "winAssets", "winTable").setScale(1.4);
        this.add.sprite(650, 200, "winAssets", "ribbon").setScale(1.4);
        this.add.text(590, 160, 'YOU LOSE', { fontFamily: 'Fantasy', fontSize: '32px', color: 'black' });
    }

    addStar() {
        this.star1 =this.add.sprite(640, -180, "star").setScale(1);// 650 280
        this.tweens.add({
            targets: this.star1,
            x: 650,
            y: 280,
            duration: 1000,
            ease: 'Power2',
            onStart:()=> {
                this.winAudio.play()
            },
            onComplete: function () {
                
            }
        });
        this.star2 =this.add.sprite(440, -180, "star").setScale(0.68);// 570 310
        this.tweens.add({
            targets: this.star2,
            x: 570,
            y: 310,
            duration: 1500,
            ease: 'Power2',
            onStart:()=> {
                this.winAudio.play()
            },
            onComplete: function () {
                
            }
        });
        this.star3 =this.add.sprite(840, -180, "star").setScale(0.68);// 730 310
        this.tweens.add({
            targets: this.star3,
            x: 730,
            y: 310,
            duration: 1500,
            ease: 'Power2',
            onStart:()=> {
                this.winAudio.play()
            },
            onComplete: function () {
                this.canMoveToNextLevel=true
            }
        });
    }

    addEmptyStar() {
        this.add.sprite(650, 280, "winAssets", "midStar");
        this.add.sprite(570, 310, "winAssets", "sideStar").setScale(1.3);
        this.add.sprite(730, 310, "winAssets", "sideStar").setScale(1.3);
    }
    //#region add button and click event
    addBackToMenuButton() {
        this.backToMenu = this.add.sprite(1200, 60, "assets", "normalButton").setInteractive().setScale(0.75);
        this.backToMenuText= this.add.text(1137, 45, 'Back To Menu', { fontFamily: 'Fantasy', fontSize: '22px' });
        this.backToMenu.on('pointerover', () => { this.setButtonEvent(this.backToMenu, "normalHover"); }, this);
        this.backToMenu.on('pointerout', () => { this.setButtonEvent(this.backToMenu, "normalButton"); }, this);
        this.backToMenu.on('pointerdown', this.clickBackToMenuButton, this);
        this.backToMenu.on('pointerup', () => { this.setButtonEvent(this.backToMenu, "normalButton"); }, this);
    }
    clickBackToMenuButton(){
        this.backToMenu.setFrame("normalClick")
        this.clickButtonAudio.play()
        setTimeout(() => {
            this.trainAudio.stop()
            this.crashed.stop()
            this.scene.start("chooseLevelMenu")
        }, 500);
    }
    addHomeButton(_x, _y) {
        this.homeButton = this.add.sprite(_x, _y, "assets","pausedNormal").setInteractive();
        this.homeButton.on('pointerover', () => { this.setButtonEvent(this.homeButton, "pausedHover"); }, this);
        this.homeButton.on('pointerout', () => { this.setButtonEvent(this.homeButton, "pausedNormal"); }, this);
        this.homeButton.on('pointerdown', this.clickHomeButton, this);
        this.homeButton.on('pointerup', () => { this.setButtonEvent(this.homeButton, "pausedNormal"); }, this);
    }
    clickHomeButton(){
        this.homeButton.setFrame("pausedClick")
        this.clickButtonAudio.play()
        setTimeout(()=>{
                this.scene.start("chooseLevelMenu")
        },1000)
    }
    addReloadButton() {
        this.reload = this.add.sprite(580, 398,"assets", "nextNormal").setInteractive().setScale(0.8);
        this.add.text(535, 310, 'RELOAD', { fontFamily: 'Fantasy', fontSize: '32px', color: '#fffff' });
        this.add.text(685, 310, 'HOME', { fontFamily: 'Fantasy', fontSize: '32px', color: '#fffff' });
        this.reload.on('pointerover', () => { this.setButtonEvent(this.reload, "nextHover"); }, this);
        this.reload.on('pointerout', () => { this.setButtonEvent(this.reload, "nextNormal"); }, this);
        this.reload.on('pointerdown', this.clickReloadButton, this);
        this.reload.on('pointerup', () => { this.setButtonEvent(this.reload, "nextNormal"); }, this);
    }
    clickReloadButton(){
        this.reload.setFrame("nextClick")
        this.clickButtonAudio.play()
        setTimeout(() => {
            this.scene.restart();
        }, 500);
    }
    addNextButton() {
        this.nextButton = this.add.sprite(700, 410, "assets", "nextNormal").setInteractive();
        this.nextButton.on('pointerover', () => { this.setButtonEvent(this.nextButton, "nextHover"); }, this);
        this.nextButton.on('pointerout', () => { this.setButtonEvent(this.nextButton, "nextNormal"); }, this);
        this.nextButton.on('pointerdown', this.clickNextButton, this);
        this.nextButton.on('pointerup', () => { this.setButtonEvent(this.nextButton, "nextNormal"); }, this);

    }
    clickNextButton(){
        this.nextButton.setFrame("nextClick")
        this.clickButtonAudio.play()
        if(this.level==totalLevel){
            setTimeout(()=>{
                this.scene.start("chooseLevelMenu")
            },700)
            return
        }
        setTimeout(()=>{
              var nextLevel="level"+(this.level+1)
              this.scene.start(nextLevel)
        },1000)
    }
  
    setButtonEvent(_button,_frame){
        _button.setFrame(_frame);
    }
    //#endregion
    //#endregion
    addTransport() {

        this.followerRed2= { t: 0, vec: new Phaser.Math.Vector2() };
        this.train= this.physics.add.sprite(100,100,"assets","train").setScale(0.2)
        this.yellowTrain= this.physics.add.sprite(1000,100,"yellowTrain").setScale(0.18)
     //   this.yellowTrain.setTint(0x00ff00)
        this.moveToRoad(this.road1,this.train,this.followerRed,0.0015)
        this.moveToRoad(this.road4,this.yellowTrain,this.followerYellow,0.002)
    }

    addRoadImage() {
        this.soidImage =this.add.sprite(430,80,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage =this.add.sprite(480,70,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        this.soidImage =this.add.sprite(480,160,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        this.soidImage =this.add.sprite(480,230,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        //
        this.soidImage =this.add.sprite(350,330,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage =this.add.sprite(430,330,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage =this.add.sprite(590,330,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage =this.add.sprite(750,330,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage =this.add.sprite(800,330,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage =this.add.sprite(300,420,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        this.soidImage =this.add.sprite(850,440,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        //
        this.soidImage =this.add.sprite(800,550,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage =this.add.sprite(650,550,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage =this.add.sprite(500,550,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage =this.add.sprite(400,600,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        this.soidImage =this.add.sprite(400,650,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        //
        this.soidImage =this.add.sprite(740,250,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        this.soidImage =this.add.sprite(740,130,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        this.soidImage =this.add.sprite(790,40,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage =this.add.sprite(900,40,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage =this.add.sprite(950,130,"assets","straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
      //  }
    }
    checkCollision() {
        this.physics.world.overlap(this.train,this.yellowTrain, () => {
            // Xử lý khi có va chạm giữa hai sprite
            console.log('Có va chạm giữa sprite1 và sprite2.');
            setTimeout(() => {        
                if(!this.lose){
                    this.crashed.play()
                    // rotate red train
                    this.train.setRotation(Phaser.Math.DegToRad(-195))
                    this.yellowTrain.setRotation(Phaser.Math.DegToRad(195))
                    // this.yellowTrain.x-=20
                    // this.yellowTrain.y-=10
                    this.lose=true
                }
            }, 40);
        });
    }

    addBackGround() {
        const backgroundData = this.allData.background;
        backgroundData.forEach(bg => {
            const bgSprite = this.add.sprite(
                bg.position.x,
                bg.position.y,
                bg.imageKey
            );
    
            if(bg.origin)
                bgSprite.setOrigin(bg.origin.x, bg.origin.y);
            bgSprite.setDisplaySize(bg.displaySize.width, bg.displaySize.height, bg.imageKey) ;
        });
        // // straight soild
        // for (let i = 0; i <4; i++) {
        //     // curve 3 soil
        //     if(i==3)
        //         this.soidImage =this.add.sprite(370,610,"assets","straightSoilRoad").setScale(1).rotation = Phaser.Math.DegToRad(38);
        //     this.soidImage =this.add.sprite(940-i*160,70+i*200,"assets","straightSoilRoad").setScale(1).rotation = Phaser.Math.DegToRad(128)
        // }
        // // curve 1 soild
        // this.soidImage =this.add.sprite(980,175,"assets","straightSoilRoad").setScale(1).rotation = Phaser.Math.DegToRad(38);
        // this.soidImage =this.add.sprite(1180,330,"assets","straightSoilRoad").setScale(1).rotation = Phaser.Math.DegToRad(38);
        // /// curve 2 soild
        // this.soidImage =this.add.sprite(530,410,"assets","straightSoilRoad").setScale(1).rotation = Phaser.Math.DegToRad(38);
        // this.soidImage =this.add.sprite(330,255,"assets","straightSoilRoad").setScale(1).rotation = Phaser.Math.DegToRad(38);
    }
    update(){
        this.graphics.clear();
        this.addBackgroundNavigation()
        this.addBackgroundNavigation2()
        this.addBackgroundNavigation3()
     //   this.drawRoad()
        if(this.canPlay){
            if(!this.lose){
                if(!this.trainAudio.isPlaying)
                    this.trainAudio.play()
                this.checkCollision()
                this.logicOfRedTrain()
                this.logicOfYellowTrain()
            }
        }

        if(this.lose){
            if(!this.table){
                setTimeout(()=>{
                    this.loseAudio.play()
                    this.displayLoseTable();
                    this.hideBackToMenuButton()
                 },400)
                 this.table=true
            }
        }
        if(this.redGoToHome&&this.yellowGoToHome){
            this.trainAudio.stop()
            if(!this.table){
                this.displayWinTable();
                this.table=true
                this.hideBackToMenuButton()
                this.table=true
           }
        }
    }
    logicOfYellowTrain(){
        if(this.followerYellow.t<1){// curve 1 0.5 curve 2
            if(this.followerYellow.t>=0.7&&this.turnInCurve2&&this.followerYellow.t<0.85){
                this.yellowTrain.x+=10
                this.yellowTrain.setRotation(Phaser.Math.DegToRad(-190))
                    this.lose=true
                return
            }
            this.moveToRoad(this.road4,this.yellowTrain,this.followerYellow,0.002)
        }
        // curve 1
        if(this.followerYellow.t>=1&&!this.turnInCurve1&&this.followerYellow3.t==0){
            this.moveToRoad(this.road5,this.yellowTrain,this.followerYellow2,0.003)
        }else if(this.followerYellow2.t!=0){
                this.moveToRoad(this.road5,this.yellowTrain,this.followerYellow2,0.003)
            }

        if(this.followerYellow2.t>=1){
            this.lose=true
            return
        }

        if(this.followerYellow.t>=1&&this.turnInCurve1&&this.followerYellow2.t==0){
            this.moveToRoad(this.road3,this.yellowTrain,this.followerYellow3,0.002)
        }else if(this.followerYellow3.t!=0){
                this.moveToRoad(this.road3,this.yellowTrain,this.followerYellow3,0.002)
              }
        if(this.followerYellow3.t>=1){
            this.yellowGoToHome=true
        }
    }
    logicOfRedTrain(){
        if(this.followerRed.t<1){// turn 1 0.63-->0.79/// turn 2 0.79-->
            if(this.followerRed.t>=0.63&&this.turnInCurve1&&this.followerRed.t<0.75){
                this.train.x-=30
                this.train.y-=5
                this.train.setRotation(Phaser.Math.DegToRad(-170))
                this.lose=true
                return
            }
            if(this.followerRed.t>=0.8&&!this.turnInCurve2&&this.followerRed.t<0.92){
                this.train.x-=70
              //  this.train.y+=5
             //   this.train.setRotation(Phaser.Math.DegToRad(-170))
                this.lose=true
                return
            }
            // if(this.followerRed.t>=0.96&&!this.turnInCurve3&&this.followerRed.t<1){
            //     setTimeout(() => {
            //         this.lose=true
            //     }, 200);
            //     return
            // }
            if(!this.lightIsRed)
                this.moveToRoad(this.road1,this.train,this.followerRed,0.0015)
            else if(this.followerRed.t<0.53){
                this.moveToRoad(this.road1,this.train,this.followerRed,0.0015)
            }
        
        }
        // road 2
        if(this.followerRed.t>=1&&this.turnInCurve3)
            this.moveToRoad(this.road2,this.train,this.followerRed2,0.004)
        else if(!this.turnInCurve3&&this.followerRed2.t!=0)
            this.moveToRoad(this.road2,this.train,this.followerRed2,0.004)
        if(this.followerRed2.t>=1&&!this.redGoToHome){
            this.redGoToHome=true
        }   
        // road 3
        // 096  road 6 082 road 2 0.7
        if(this.followerRed.t>=1&&!this.turnInCurve3&&this.followerRed2.t==0)
            this.moveToRoad(this.road6,this.train,this.followerRed3,0.004)
        if(this.followerRed3.t>=0.7){
            setTimeout(() => {
                this.lose=true
            }, 200);
        }   
    }
    displayLoseTable() {
        this.addLoseTable();
        this.addReloadButton();
        this.addHomeButton(720, 400);
    }

    displayWinTable() {
        this.addWinTableAndRibbon();
        this.addEmptyStar();
        this.addStar();
        //
        this.addNextButton();
        this.addHomeButton(600, 410);
    }

    moveObject(_follower,_road,_object,_speed,_container) {
        if (_follower.t <= 1) {
            _follower.t = this.moveToRoad(_road,_object, _follower, _speed)
        }
    }
    moveToRoad(_road,_target, _follower,_speed) {
        _road.getPoint(_follower.t, _follower.vec)
        _follower.t += _speed
        if(_follower.t>=1)
            return _follower.t
        _target.x = _follower.vec.x
        _target.y = _follower.vec.y
        const tangentVector = _road.getTangent(_follower.t);
        const angle = Phaser.Math.Angle.Between(0, 0, tangentVector.x, tangentVector.y)
        
        _target.rotation = angle
        return _follower.t
    }

    drawRoad() {
        this.graphics.lineStyle(2, 0xffffff, 1)
        this.road1.draw(this.graphics);      
         this.graphics.lineStyle(2, 0x000000, 1)
         this.road2.draw(this.graphics);
         this.graphics.lineStyle(2, 0xFF0000, 1)
         this.road3.draw(this.graphics);
         this.graphics.lineStyle(2, 0x00FF00, 1)
         this.road4.draw(this.graphics);
         this.graphics.lineStyle(2, 0xFFA500, 1)
         this.road5.draw(this.graphics);
         this.graphics.lineStyle(2, 0x00FF00, 1)
         this.road6.draw(this.graphics);
    }
}