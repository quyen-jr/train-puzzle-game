class Level3 extends Phaser.Scene{
    constructor(){
        super("level3")
        this.followerYellow = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerYellow2 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.level=3
    }
    preload(){
        Phaser.Cache.enabled = false;
        this.load.json('level3Data', '/levelData/level3.json');
        this.load.atlas("crossing","assets/crossing.png","assets/crossing.json")
        this.load.image("yellowTrain","assets/yellowTrain.png")
    }
    create(){
        this.canPlay=false
        this.lose=false
        this.table=false
        this.win=0
     
        // variable of yellow train 
        this.yellowGoToHome=false
        this.stopYellowTrain=false
        this.YellowTurnCurve2=false;
        this.canTurnRoad=true
        this.hasTurn=false
        //
        this.redGoToHome=false
        this.redTurnCurve2=false;
        this.hasTurn=false

        this.allData = this.cache.json.get('level3Data');
        this.graphics = this.add.graphics();
        this.addAudio();
        this.table=false
        this.addBackGround()
     //   this.addBackgroundNavigation()
        this.graphics = this.add.graphics();
        this.graphics.setDepth(0);
        this.addRoadImage()
        this.addButtonDirection()
        this.addBackToMenuButton();
        this.createRoad()
        this.addCrossingBaries()
        this.addTransport()
        this.addHouseStation()
        this.checkCollision()
        setTimeout(() => {
            this.canPlay=true
            this.trainAudio.play()
            // setTimeout(() => {
            //     this.trainAudio2.play()
            // }, 150);
        }, 1000);

    }
    addCrossingBaries(){
        this.crossingOn = this.add.sprite(955, 95, "crossing", "crossingOn").setScale(0.5).setInteractive();
        this.crossingOn.visible=false;
        // this.trafficLight.setAlpha(0.8); 
        this.crossingOff = this.add.sprite(970, 100, "crossing", "crossingOff").setScale(0.35).setInteractive();
        this.cro
        // this.trafficLight.setAlpha(0.8); 
        this.crossingOff.on("pointerover",()=>{this.crossingOff.setTint(0x808080)},this)
        this.crossingOff.on("pointerout",()=>{this.crossingOff.clearTint()},this)
        this.crossingOff.on("pointerdown",()=>{
            this.crossingOff.visible=false;
            this.crossingOn.visible=true
            this.clickButtonAudio.play()
            if(this.followerYellow.t<0.5)
                this.stopYellowTrain=true
        },this)
        this.crossingOn.on("pointerover",()=>{
            this.crossingOn.setTint(0x808080)
        },this)
        this.crossingOn.on("pointerout",()=>{
            this.crossingOn.clearTint()
        },this)
        this.crossingOn.on("pointerdown",()=>{
            this.crossingOn.visible=false;
            this.crossingOff.visible=true
            this.clickButtonAudio.play()
            this.stopYellowTrain=false
        },this)
    }
    addAudio() {
        this.clickButtonAudio = this.sound.add('clickButtonAudio');
        this.winAudio = this.sound.add('winAudio');
        this.loseAudio = this.sound.add('loseAudio');
        this.crashed = this.sound.add('crashed');
        this.trainAudio = this.sound.add('trainAudio');
        this.trainAudio.play()
      //  this.trainAudio2 = this.sound.add('trainAudio');

    }
    createRoad(){
          // // // yellow train 
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
        // getdata
        const road1= this.allData.roads.road1;
        const road2 = this.allData.roads.road2;
        const road3= this.allData.roads.road3;
        const road4 = this.allData.roads.road4;
        const road5= this.allData.roads.road5;
        //
        this.road = new Phaser.Curves.Path(road1.points[0].x,road1.points[0].y);
        this.road.lineTo(road1.points[1].x,road1.points[1].y);
          // // // road 2
        this.road2 = new Phaser.Curves.Path(road2.points[0].x,road2.points[0].y)
        this.road2.lineTo(road2.points[1].x,road2.points[1].y);
        /// curve 1
        this.curveRoad1 = new Phaser.Curves.Path(road3.points[0].x,road3.points[0].y)
        this.curveRoad1.lineTo(road3.points[1].x,road3.points[1].y);
        this.curveRoad1.ellipseTo(road3.ellipse.x,road3.ellipse.y,0,road3.ellipse.endAngle,false,road3.ellipse.rotation);
        this.curveRoad1.lineTo(road3.points[2].x,road3.points[2].y);
        // curve road 2
        this.road4 = new Phaser.Curves.Path(road4.points[0].x,road4.points[0].y)
       // this.curveRoad1.lineTo(1000,200);
        this.road4.ellipseTo(road4.ellipse.x,road4.ellipse.y,0,road4.ellipse.endAngle,false,road4.ellipse.rotation);
        this.road4.lineTo(road4.points[1].x,road4.points[1].y);
        // road 5
        this.road5 = new Phaser.Curves.Path(road5.points[0].x,road5.points[0].y)
        this.road5.lineTo(road5.points[1].x,road5.points[1].y);
        this.road5.ellipseTo(road5.ellipse.x,road5.ellipse.y,0,road5.ellipse.endAngle,false,road5.ellipse.rotation);
        this.road5.lineTo(road5.points[2].x,road5.points[2].y);
    }
    addHouseStation(){
        this.house = this.add.sprite(270, 195,"assets", "houseStation").setScale(0.5).setRotation(Phaser.Math.DegToRad(130))
        this.house.setDisplaySize(150, 200).setTint(0xFF0000)
        this.house2 = this.add.sprite(280, 550,"assets", "houseStation").setScale(0.5).setRotation(Phaser.Math.DegToRad(130))
        this.house2.setDisplaySize(150, 200).setTint(0xFFFF00)
    }
    addBackgroundNavigation(){
        var fillColor=0xff0000 
        var count=0
        if(this.followerYellow2.t>=0.68&&this.followerYellow3.t<0.35&&this.followerYellow4.t==0||
            this.followerYellow2.t>=0.68&&this.followerYellow4.t<0.35&&this.followerYellow3.t==0){
                fillColor=0x000000
                this.canTurnRoad=false;
                count++
            }
        if(this.followerRed2.t>=0.68&&this.followerRed3.t<0.35&&this.followerRed4.t==0||
                this.followerRed2.t>=0.68&&this.followerRed4.t<0.35&&this.followerRed3.t==0){
                    fillColor=0x000000
                this.canTurnRoad=false;
                count++
            }
        if(count==0){
            fillColor=0xff0000
            this.canTurnRoad=true
        }else{
            this.canTurnRoad=false
            fillColor=0x000000
        }
        this.graphics.beginPath();
        this.graphics.lineStyle(10,fillColor, 0.8);
        this.graphics.strokeCircle(640,435,75);
        this.graphics.closePath();
        this.graphics.beginPath();
        this.graphics.fillStyle(fillColor, 0.3);
        this.graphics.fillCircle(640,435,70);
        this.graphics.closePath();        
    }
    addBackgroundNavigationCrossing(){
        var fillColor=0xff0000 
        if(this.followerYellow.t>0.5&&this.followerYellow.t<0.8){
                fillColor=0x000000
        }
        this.graphics.beginPath();
        this.graphics.lineStyle(10,fillColor, 0.8);
        this.graphics.strokeCircle(970,135,45);
        this.graphics.closePath();
        this.graphics.beginPath();
        this.graphics.fillStyle(fillColor, 0.3);
        this.graphics.fillCircle(970,135,40);
        this.graphics.closePath();        
    }
    hideBackToMenuButton(){
        this.backToMenu.visible=false;
        this.backToMenuText.visible=false;
    }
    addButtonDirection() {
        this.downbtn = new Button(this,"assets","forwardDirection",50,60,0.3,false,0);
        this.downbtn.body.setAlpha(0.8);
        this.downbtn.body.rotation = Phaser.Math.DegToRad(130);
        // left curve
        this.leftbtn = new Button(this,"assets","curveDirection",50,60,0.3,false,0);
        this.leftbtn.body.rotation = Phaser.Math.DegToRad(175);
        this.leftbtn.body.setAlpha(0.8);
        this.leftbtn.body.visible=false

        //
        this.downbtn.body.on("pointerover", () => { this.downbtn.body.setScale(this.downbtn.scale+0.05) }, this);
        this.downbtn.body.on("pointerout", () => { this.downbtn.body.setScale(this.downbtn.scale) }, this);
        this.downbtn.body.on("pointerdown", () => { 
            if(!this.canTurnRoad)
                return
            this.clickButtonAudio.play()
            this.downbtn.body.visible=false
            this.leftbtn.body.visible=true
            // yello train
            if(this.followerYellow3.t==0&&this.followerYellow4.t==0)
               this.YellowTurnCurve2=true
               if(this.followerRed3.t==0&&this.followerRed4.t==0)
               this.redTurnCurve2=true
         }, this);
    
        this.leftbtn.body.on("pointerover", () => { this.leftbtn.body.setScale(this.leftbtn.scale+0.05) }, this);
        this.leftbtn.body.on("pointerout", () => { this.leftbtn.body.setScale(this.leftbtn.scale) }, this);
        this.leftbtn.body.on("pointerdown", () => {
             if(!this.canTurnRoad)
                return
            this.clickButtonAudio.play()
            this.downbtn.body.visible=true
            this.leftbtn.body.visible=false
            if(this.followerYellow3.t==0&&this.followerYellow4.t==0)
                this.YellowTurnCurve2=false
            if(this.followerRed3.t==0&&this.followerRed4.t==0)
                this.redTurnCurve2=false
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
        this.physics.world.setBounds(0, 0, gameWidth, gameHeight);
        
        this.train= this.physics.add.sprite(100,100,"assets","train").setScale(0.25)
        this.moveToRoad(this.road,this.train,this.followerRed,0.0015)
        this.yellowTrain= this.physics.add.sprite(1200,100,"yellowTrain").setScale(0.22)
        this.moveToRoad(this.curveRoad1,this.yellowTrain,this.followerYellow,0.002)
        // this.trafficLight = this.add.sprite(930, 185,"assets",'trafficLight').setScale(0.5).setRotation(Phaser.Math.DegToRad(0)).setInteractive();
        // this.trafficLight.setAlpha(0.8)

        // Tạo sprite và thiết lập collider hình tròn cho sprite 1
     //   const sprite1 = this.physics.add.sprite(100, 100, 'texture1');
        this.physics.world.enable(this.train, Phaser.Physics.Arcade.Sprite);
        this.train.body.setCircle(150);
        this.train.body.setOffset(100, 0);
        
        // Tạo sprite và thiết lập collider hình tròn cho sprite 2
       // const sprite2 = this.physics.add.sprite(200, 200, 'texture2');
        this.physics.world.enable(this.yellowTrain, Phaser.Physics.Arcade.Sprite);
        this.yellowTrain.body.setCircle(145);
        this.yellowTrain.body.setOffset(-60*Math.cos(this.yellowTrain.x), 70*Math.sin(this.yellowTrain.y));
        
        // Xử lý va chạm giữa sprite1 và sprite2
  
    }

    addRoadImage() {
        for (let i = 0; i <4; i++) {
            this.straight= this.add.sprite(1004-i*38,5+i*45,"assets","straightRoad").setScale(0.33).setRotation(Phaser.Math.DegToRad(220))
        }
        // curve 1
        this.curve= this.add.sprite(945,225,"assets","curveRoad").setScale(0.4).setRotation(Phaser.Math.DegToRad(220))
        for (let i = 0; i <9; i++) {
            this.straight= this.add.sprite(1095+i*30,265+i*25,"assets","straightRoad").setScale(0.29).setRotation(Phaser.Math.DegToRad(130))
        }
        this.straight= this.add.sprite(1125,290,"assets","straightRoad").setScale(0.29).setRotation(Phaser.Math.DegToRad(130))
       for (let i = 0; i <9; i++) {
            if(i==4||i==5)
                continue
            this.straight= this.add.sprite(800-i*30,250+i*35,"assets","straightRoad").setScale(0.33).setRotation(Phaser.Math.DegToRad(220))
       }
       // curve 2
       this.curve2= this.add.sprite(578,365,"assets","curveRoad").setScale(0.4).setRotation(Phaser.Math.DegToRad(40))
       this.straight5= this.add.sprite(430,325,"assets","straightRoad").setScale(0.29).setRotation(Phaser.Math.DegToRad(130))
       this.straight6= this.add.sprite(393,295,"assets","straightRoad").setScale(0.29).setRotation(Phaser.Math.DegToRad(130))
       this.straight7= this.add.sprite(363,270,"assets","straightRoad").setScale(0.29).setRotation(Phaser.Math.DegToRad(130))
      // curve3
       this.curve3= this.add.sprite(405,563,"assets","curveRoad").setScale(0.4).setRotation(Phaser.Math.DegToRad(40))
       this.straight= this.add.sprite(533.5,559.5,"assets","straightRoad").setScale(0.33).setRotation(Phaser.Math.DegToRad(220))
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
                    this.yellowTrain.x-=20
                    this.yellowTrain.y-=10
                    this.lose=true
                }
            }, 60);
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
        // straight soild
        for (let i = 0; i <4; i++) {
            // curve 3 soil
            if(i==3)
                this.soidImage =this.add.sprite(370,610,"assets","straightSoilRoad").setScale(1).rotation = Phaser.Math.DegToRad(38);
            this.soidImage =this.add.sprite(940-i*160,70+i*200,"assets","straightSoilRoad").setScale(1).rotation = Phaser.Math.DegToRad(128)
        }
        // curve 1 soild
        this.soidImage =this.add.sprite(980,175,"assets","straightSoilRoad").setScale(1).rotation = Phaser.Math.DegToRad(38);
        this.soidImage =this.add.sprite(1180,330,"assets","straightSoilRoad").setScale(1).rotation = Phaser.Math.DegToRad(38);
        /// curve 2 soild
        this.soidImage =this.add.sprite(530,410,"assets","straightSoilRoad").setScale(1).rotation = Phaser.Math.DegToRad(38);
        this.soidImage =this.add.sprite(330,255,"assets","straightSoilRoad").setScale(1).rotation = Phaser.Math.DegToRad(38);
    }
    update(){
        this.graphics.clear();
        this.addBackgroundNavigation()
        this.addBackgroundNavigationCrossing()
       // this.drawRoad();
        if(!this.canPlay)
            return
        if(!this.lose){
            this.checkCollision()
            if(!this.trainAudio.isPlaying)
                this.trainAudio.play()
            // if (this.checkCollision(this.train, this.car)) {
            //     console.log(1)
            // }
            if(!this.stopYellowTrain)
                this.followerYellow.t=this.moveToRoad(this.curveRoad1,this.yellowTrain,this.followerYellow,0.002)
            else if(this.followerYellow.t<0.5){
                this.followerYellow.t=this.moveToRoad(this.curveRoad1,this.yellowTrain,this.followerYellow,0.002)
            }
            if(this.followerYellow.t>=1){
            //  if(this.followerYellow2.t<0.68)
                this.followerYellow2.t=this.moveToRoad(this.road2,this.yellowTrain,this.followerYellow2,0.0025)
            }
            if(this.followerYellow2.t>=1&&this.YellowTurnCurve2){
                //if(this.followerYellow3.t<0.35)
                this.followerYellow3.t=this.moveToRoad(this.road4,this.yellowTrain,this.followerYellow3,0.002)
            }
            if(this.followerYellow2.t>=1&&!this.YellowTurnCurve2){
            // if(this.followerYellow4.t<0.35)
                this.followerYellow4.t=this.moveToRoad(this.road5,this.yellowTrain,this.followerYellow4,0.002)
            }
        // red train
            if(this.followerRed.t<1)
                this.followerRed.t=this.moveToRoad(this.road,this.train,this.followerRed,0.0015)
            if(this.followerRed.t>=1){
                //  if(this.followerYellow2.t<0.68)
                this.followerRed2.t=this.moveToRoad(this.road2,this.train,this.followerRed2,0.002)
            }
            if(this.followerRed2.t>=1&&this.redTurnCurve2){
                //if(this.followerYellow3.t<0.35)
                this.followerRed3.t=this.moveToRoad(this.road4,this.train,this.followerRed3,0.002)
            }
            if(this.followerRed2.t>=1&&!this.redTurnCurve2){
                // if(this.followerYellow4.t<0.35)
                this.followerRed4.t=this.moveToRoad(this.road5,this.train,this.followerRed4,0.002)
            }
        }
        // check lose or win
        if(this.followerRed4.t>=1||this.followerYellow3.t>=1){
            this.lose=true
        }
        if(this.followerRed3.t>=1){
            this.redGoToHome=true
        }
        if(this.followerYellow4.t>=1){
            this.yellowGoToHome=true
        }
        if(this.lose){
            if(!this.table){
                setTimeout(()=>{
                    this.loseAudio.play()
                    this.displayLoseTable();
                    this.hideBackToMenuButton()
                 },1000)
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
        this.road.draw(this.graphics);
        this.graphics.lineStyle(2, 0x00FF00, 1)
        this.curveRoad1.draw(this.graphics);
        this.graphics.lineStyle(2, 0xFFA500, 1)
        this.road2.draw(this.graphics);
        this.graphics.lineStyle(2, 0x000000, 1)
        this.road4.draw(this.graphics);
        this.graphics.lineStyle(2, 0xFF0000, 1)
        this.road5.draw(this.graphics);
    }
}