class Level2 extends Phaser.Scene{
    constructor(){
        super("level2")
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.follower2 = { t: 0, vec: new Phaser.Math.Vector2() };
    }
    preload(){
        Phaser.Cache.enabled = false;
        this.load.json('level2Data', '/levelData/level2.json');
        this.load.atlas("crossing","assets/crossing.png","assets/crossing.json")
    }
    create(){
        this.allData = this.cache.json.get('level2Data');
        this.addAudio();
        this.trainAudio.stop()
        this.isCrashedAudioPlay=false;
        this.level=2
        this.win=false;
        this.canMoveToNextLevel=false;
        this.table=false
        this.canPlay=false
        this.graphics = this.add.graphics()
        this.addBackGround()//

        this.createRoad()

        this.addRoadImage()
        this.addTransport();
        //
        this.addCollisionBetweenCarAndTrain();
        this.addHouseStation()
        this.addCrossingBarries();
        this.addNightDay(0.7)
        this.addLightOfCar()
        this.addLightOfTrain()
        // traffic light
        this.addLightOfTrafficLight()
        this.addBackToMenuButton();
        setTimeout(()=>{
            this.canPlay=true
        },2500)

    }

    addCrossingBarries() {
        this.crossingOn = this.add.sprite(710, 320, "crossing", "crossingOn").setScale(0.7); //.setOrigin(0,0)
        this.crossingOn.visible = false;
        this.crossingOff = this.add.sprite(730, 327, "crossing", "crossingOff").setScale(0.5);

    }

    addAudio() {
        this.clickButtonAudio = this.sound.add('clickButtonAudio');
        this.winAudio = this.sound.add('winAudio');
        this.loseAudio = this.sound.add('loseAudio');
        this.crashed = this.sound.add('crashed');
        this.trainAudio = this.sound.add('trainAudio');
    }

    hideBackToMenuButton(){
        this.backToMenu.visible=false;
        this.backToMenuText.visible=false;
    }

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
        this.backToMenu.on('pointerover', () => { this.setButtonEvent(this.backToMenu, "hoverButton"); }, this);
        this.backToMenu.on('pointerout', () => { this.setButtonEvent(this.backToMenu, "normalButton"); }, this);
        this.backToMenu.on('pointerdown', this.clickBackToMenuButton, this);
        this.backToMenu.on('pointerup', () => { this.setButtonEvent(this.backToMenu, "normalButton"); }, this);
    }
    clickBackToMenuButton(){
        this.backToMenu.setFrame("clickButton")
        this.clickButtonAudio.play()
        setTimeout(() => {
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
        this.car.x=1300
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
    addTransport() {
        this.trafficLight = this.add.sprite(575, 225,"assets",'trafficLight').setScale(0.5).setRotation(Phaser.Math.DegToRad(-5)).setInteractive();
        this.train = this.add.sprite(0,-200,"assets", "train").setScale(0.37);
        this.car = this.add.sprite(400, 911,"assets", "car").setScale(0.85);
        this.car.setRotation(Phaser.Math.DegToRad(267));
    }

    addCollisionBetweenCarAndTrain() {
        this.physics.world.enable([this.train, this.car]);
        this.lose = false;
        this.physics.add.collider(this.train, this.car, () => {
            if(!this.isCrashedAudioPlay){
                this.crashed.play()
                this.isCrashedAudioPlay=true
            }
            setTimeout(() => {
                this.lose = true;
            }, 330);
        }, null, this);
        this.train.setSize(50, 60);
        this.car.body.setSize(this.train.displayWidth/1.5, this.train.displayHeight/1.5, true);
        this.train.body.setSize(this.train.displayWidth*2, this.train.displayHeight*2, true);
        this.train.body.setOffset(20, 18);
        this.car.body.setOffset(70, 10);
    }

    addLightOfTrafficLight() {
        this.redTrafficLight = this.add.pointlight(571.5, 187, 0, 20, 1)
        this.redTrafficLight.color.setTo(255, 0, 0)
        this.redTrafficLight.attenuation = 0.03
        this.redTrafficLight.alpha = 0;
        this.lightIsRed=false
        // green 
        this.greenTrafficLight = this.add.pointlight(573, 200, 0, 20, 1)
        this.greenTrafficLight.color.setTo(0, 255, 0)
        this.greenTrafficLight.attenuation = 0.03
        //
        this.trafficLight.on('pointerover', () => {this.trafficLight.setScale(0.55) }, this)
        this.trafficLight.on('pointerout', () => {this.trafficLight.setScale(0.5) }, this)
        this.trafficLight.on('pointerdown', () => {
            this.trafficLight.setTint("#ccffcc") 
            this.clickButtonAudio.play()
            if(!this.lightIsRed&&this.follower.t<=0.44){
                this.lightIsRed=true;
                this.redTrafficLight.alpha = 1;
                this.greenTrafficLight.alpha = 0;
                this.crossingOn.visible=true
                this.crossingOff.visible=false
            }else{
                this.lightIsRed=false;
                this.redTrafficLight.alpha = 0;
                this.greenTrafficLight.alpha = 1;
                this.crossingOn.visible=false
                this.crossingOff.visible=true
            }
        }, this)
        this.trafficLight.on('pointerup', () => {this.trafficLight.clearTint() }, this)
    }

    addLightOfCar() {
        const spectrum = Phaser.Display.Color.ColorSpectrum(128)

        this.spotlight = this.add.pointlight(400, 300, 0, 128, 1)
        this.spotlight.color.setTo(255, 255, 255)

        this.spotlight.attenuation = 0.025
    }
    addLightOfTrain() {
        const spectrum = Phaser.Display.Color.ColorSpectrum(128)

        this.spotlight2 = this.add.pointlight(400, 300, 0, 128, 1)
        this.spotlight2.color.setTo(255, 255, 255)

        this.spotlight2.attenuation = 0.015
    }

    addNightDay(_lightIntensity) {
        this.darkness = this.add.graphics()
        this.darkness.fillStyle(0x000000,_lightIntensity)
        this.darkness.fillRect(0, 0, 1280, 720)
    }

    addHouseStation() {
        this.house = this.add.sprite(245, 125,"assets", "houseStation").setScale(0.5).setRotation(Phaser.Math.DegToRad(132))
        this.house.setDisplaySize(200, 300)
    }

    addRoadImage() {
        const roadsData = this.allData.roadImages;
        roadsData.forEach(road => {
            const straightRoadSprite = this.add.sprite(
                        road.x,
                        road.y,
                        "assets",
                        "straightRoad"
            );
            straightRoadSprite.setScale(road.scale);
            straightRoadSprite.rotation = Phaser.Math.DegToRad(road.rotation);
            for (let i = -1; i < 16; i++) {
                var images =this.add.sprite(road.x - i * road.offsetX, road.y + i *  road.offsetY, "assets","straightRoad")
                images.setScale(road.scale).rotation = Phaser.Math.DegToRad(road.rotation)
            }
        })
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
        this.soidImage =this.add.sprite(850,70,"assets","straightSoilRoad").setScale(1.5).rotation = Phaser.Math.DegToRad(128);
       // this.soidImage =this.add.sprite(649,300,"straightSoilRoad").setScale(1.5).rotation = Phaser.Math.DegToRad(130);
        this.soidImage =this.add.sprite(425,600,"assets","straightSoilRoad").setScale(1.5).rotation = Phaser.Math.DegToRad(127);
        this.soidImage =this.add.sprite(749,505,"assets","straightSoilRoad").setScale(1.5).rotation = Phaser.Math.DegToRad(38);
        this.soidImage =this.add.sprite(950,665,"assets","straightSoilRoad").setScale(1.5).rotation = Phaser.Math.DegToRad(39);
        this.curveSoidImage2 =this.add.sprite(449,64,"assets","curveSoilRoad").setScale(1.5).rotation=Phaser.Math.DegToRad(38);
        
    }
    createRoad() {
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.follower2 = { t: 0, vec: new Phaser.Math.Vector2() }
        // forr container
        this.followerContainer = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerContainer2 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerContainer3 = { t: 0, vec: new Phaser.Math.Vector2() };
        const road1 = this.allData.roads.road1;
        const road2 = this.allData.roads.road2;
        // // // road 1
        this.road = new Phaser.Curves.Path(road1.points[0].x, road1.points[0].y);
        this.road.lineTo(road1.points[1].x, road1.points[1].y);
        // // // road 2
        this.road2 = new Phaser.Curves.Path(road2.points[0].x, road2.points[0].y)
        this.road2.lineTo(road2.points[1].x, road2.points[1].y);
    }
    update(){
        this.graphics.clear();
        this.drawRoad();
        if(!this.canPlay)
            return
         if(this.win){
             this.trainAudio.stop()
             if(!this.table){
                 this.displayWinTable();
                 this.table=true
                 this.hideBackToMenuButton()
            }
             return
             this.win=false;
         }
        if(!this.lose){
            if (!this.trainAudio.isPlaying&&this.canPlay) {
                this.trainAudio.play()
            }
             this.logicOfRedTrafficLight();
             this.moveObject(this.follower2,this.road,this.train,0.001,false)
             this.updateLightFollowCar();
             this.updateLightFollowTrain();
         }else{
            if(!this.table){
                this.loseAudio.play()
                setTimeout(()=>{
                    this.displayLoseTable();
                    this.hideBackToMenuButton()
                 },1000)
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

    logicOfRedTrafficLight() {
        if (!this.lightIsRed) {
            this.moveObject(this.follower, this.road2, this.car, 0.001, false);
            if(this.follower.t>=1)
                this.win=true;
        } else if (this.follower.t <= 0.44) {
            this.moveObject(this.follower, this.road2, this.car, 0.001, false);
        }
    }

    updateLightFollowTrain() {
        this.spotlight2.x = this.train.x + 50 * Math.cos(this.train.rotation);
        this.spotlight2.y = this.train.y + 50 * Math.sin(this.train.rotation);
    }

    updateLightFollowCar() {
        this.spotlight.x = this.car.x + 30 * Math.cos(this.car.rotation);
        this.spotlight.y = this.car.y + 30 * Math.sin(this.car.rotation);
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
        this.road2.draw(this.graphics);
    }
}