class Level5 extends Phaser.Scene {
    constructor() {
        super("level5")
        this.followerRed = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerYellow = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerYellow2 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.level = 5
    }
    preload() {
        Phaser.Cache.enabled = false;
        this.load.json('level4Data', '/levelData/level4.json');
        this.load.atlas("crossing", "assets/crossing.png", "assets/crossing.json")
        this.load.image("yellowTrain", "assets/yellowTrain.png")
    }
    create() {
        this.canPlay = false
        this.lose = false
        this.table = false
        this.win = 0
        // red 
        this.redGoToHome = false
        // yellow
        this.yellowGoToHome = false
        //  green
        this.greenGoToHome = false
        this.canTurnInCurve3 = true
        this.turnLeftInCurve1 = false
        this.canTurnInCurve1 = false;
        this.canTurnInCurve2 = false;
        this.canTurnInCurve2 = false
        this.turnInCurve3 = false
        //
        this.allData = this.cache.json.get('level4Data');
        this.graphics = this.add.graphics();
        this.addAudio();
        this.table = false
        this.addBackGround()
        this.addRoadImage()
        this.graphics = this.add.graphics();
        this.graphics.setDepth(0);
        this.createRoad()
        this.addBackToMenuButton();
        this.addButtonDirection()
        this.addTrafficLight()
        this.addButtonDirection2()
        this.addTransport()
        this.addHouseStation()
        setTimeout(() => {
            this.canPlay = true
            this.trainAudio.play()
        }, 1000);

    }
    addTrafficLight() {

        this.trafficLight = this.add.sprite(1000, 490, "assets", 'trafficLight').setScale(0.5).setRotation(Phaser.Math.DegToRad(0))
        this.trafficLight.setInteractive()
        this.lightIsRed = false

        // red
        this.redTrafficLight = this.add.pointlight(1000, 450, 10, 20, 1)
        this.redTrafficLight.color.setTo(255, 0, 0)
        this.redTrafficLight.attenuation = 0.03
        this.redTrafficLight.alpha = 0;
        this.lightIsRed = false
        // green 
        this.greenTrafficLight = this.add.pointlight(1000, 465, 10, 20, 1)
        this.greenTrafficLight.color.setTo(0, 255, 0)
        this.greenTrafficLight.attenuation = 0.03

        this.trafficLight.on('pointerover', () => { this.trafficLight.setScale(0.55) }, this)
        this.trafficLight.on('pointerout', () => { this.trafficLight.setScale(0.5) }, this)
        this.trafficLight.on('pointerdown', () => {
            this.trafficLight.setTint(0x808080)
            this.clickButtonAudio.play()
            if (!this.lightIsRed && this.followerYellow.t < 0.4) {
                this.lightIsRed = true;
                this.redTrafficLight.alpha = 1;
                this.greenTrafficLight.alpha = 0;
            } else {
                this.lightIsRed = false;
                this.redTrafficLight.alpha = 0;
                this.greenTrafficLight.alpha = 1;
            }

        }, this)
        this.trafficLight.on('pointerup', () => { this.trafficLight.clearTint() }, this)
    }
    addCrossingBaries() {
    }
    addAudio() {
        this.clickButtonAudio = this.sound.add('clickButtonAudio');
        this.winAudio = this.sound.add('winAudio');
        this.loseAudio = this.sound.add('loseAudio');
        this.crashed = this.sound.add('crashed');
        this.trainAudio = this.sound.add('trainAudio');
        this.trainAudio.play()
    }
    addNightDay(_lightIntensity) {
        this.darkness = this.add.graphics()
        this.darkness.setDepth(1)
        this.darkness.fillStyle(0x000000, _lightIntensity)
        this.darkness.fillRect(0, 0, 1280, 720)
    }
    createRoad() {
        //follower
        this.followerYellow = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerYellow2 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerYellow3 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerYellow4 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerYellow5 = { t: 0, vec: new Phaser.Math.Vector2() };
        // red train
        this.followerRed = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerRed2 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerRed3 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerRed4 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerRed5 = { t: 0, vec: new Phaser.Math.Vector2() };
        //
        this.followerGreen = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerGreen2 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerGreen3 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerGreen4 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerGreen5 = { t: 0, vec: new Phaser.Math.Vector2() };
        // road 1
        this.road1 = new Phaser.Curves.Path(400, 700)
        this.road1.lineTo(400, 605);
        this.road1.ellipseTo(-50, -50, 0, 90, false, 0);
        this.road1.lineTo(800, 555);
        this.road1.ellipseTo(-55, 55, 0, 90, false, -90);
        this.road1.lineTo(855, 410);
        // road 2
        this.road2 = new Phaser.Curves.Path(855, 710)
        this.road2.lineTo(855, 410);
        // road 3
        this.road3 = new Phaser.Curves.Path(1175, 700)
        this.road3.lineTo(1170, 605);
        this.road3.ellipseTo(-50, 50, 0, 90, false, 180);
        this.road3.lineTo(910, 555);
        this.road3.ellipseTo(55, 55, 0, 90, false, 90);
        this.road3.lineTo(855, 410);
        // 
        this.road4 = new Phaser.Curves.Path(700, 331)
        this.road4.lineTo(395, 331);
        this.road4.ellipseTo(50, 50, 0, 90, false, 90);
        this.road4.lineTo(343, 231);
        this.road4.lineTo(344, 180);
        // curve 1 
        this.curveRoad1 = new Phaser.Curves.Path(855, 410)
        this.curveRoad1.lineTo(855, 386);
        this.curveRoad1.ellipseTo(-55, 55, 0, 90, false, 180);
        this.curveRoad1.lineTo(700, 331);
        // curve 2
        this.curveRoad2 = new Phaser.Curves.Path(855, 410)
        this.curveRoad2.lineTo(855, 386);
        this.curveRoad2.ellipseTo(-55, -55, 0, 90, false, 0);
        this.curveRoad2.lineTo(1117, 331);
        this.curveRoad2.ellipseTo(-55, 55, 0, 90, false, -90);
        this.curveRoad2.lineTo(1172, 200);
        // curve 3
        this.curveRoad3 = new Phaser.Curves.Path(700, 331)
        this.curveRoad3.lineTo(650, 331);
        this.curveRoad3.ellipseTo(55, 55, 0, 90, false, 90);
        this.curveRoad3.lineTo(595, 100);
        this.curveRoad3.ellipseTo(-55, -55, 0, 90, false, 0);
        this.curveRoad3.lineTo(750, 45);
        // road 5 of yellow
        this.road5 = new Phaser.Curves.Path(640, 330)
       

    }
    addHouseStation() {
        this.house = this.add.sprite(340, 145, "assets", "houseStation").setScale(0.5).setRotation(Phaser.Math.DegToRad(180))
        this.house.setDisplaySize(150, 200).setTint(0xFF0000)
        this.house2 = this.add.sprite(770, 40, "assets", "houseStation").setScale(0.5).setRotation(Phaser.Math.DegToRad(-90))
        this.house2.setDisplaySize(80, 200).setTint(0xFFFF00)
        this.house3 = this.add.sprite(1170, 200, "assets", "houseStation").setScale(0.5).setRotation(Phaser.Math.DegToRad(180))
        this.house3.setDisplaySize(150, 100).setTint(0x00ff00)
    }
    addBackgroundNavigation() {
        var fillColor = 0x00ff00
        var count = 0
        if (this.followerYellow.t >= 0.9 && this.followerYellow2.t < 0.7 && this.followerYellow3.t == 0
            || this.followerYellow.t >= 0.9 && this.followerYellow3.t < 0.32 && this.followerYellow2.t == 0) {
            fillColor = 0x000000
            this.canTurnInCurve1 = false;
            count++
        }
        if (this.followerRed.t >= 0.9 && this.followerRed2.t < 0.7 && this.followerRed3.t == 0
            || this.followerRed.t >= 0.9 && this.followerRed3.t < 0.32 && this.followerRed2.t == 0) {
            fillColor = 0x000000
            this.canTurnInCurve1 = false;
            count++
        }
        if (count == 0) {
            fillColor = 0xff0000
            this.canTurnInCurve1 = true
        } else {
            this.canTurnInCurve1 = false
            fillColor = 0x000000
        }
        this.graphics.beginPath();
        this.graphics.lineStyle(10, fillColor, 0.7);
        this.graphics.strokeCircle(850, 350, 65);
        this.graphics.closePath();
        this.graphics.beginPath();
        this.graphics.fillStyle(fillColor, 0.3);
        this.graphics.fillCircle(850, 350, 60);
        this.graphics.closePath();
    }
    addBackgroundNavigation2() {
        var fillColor = 0x0000ff
        var count = 0
        if (this.followerYellow2.t >= 1 && this.followerYellow4.t <= 0.32 && this.followerYellow5.t == 0 ||
            this.followerYellow2.t >= 1 && this.followerYellow5.t <= 0.33 && this.followerYellow4.t == 0) {
            fillColor = 0x000000
            this.canTurnInCurve2 = false;
            count++
        }
        if (this.followerRed2.t >= 1 && this.followerRed4.t <= 0.32 && this.followerRed5.t == 0 ||
            this.followerRed2.t >= 1 && this.followerRed5.t <= 0.33 && this.followerRed4.t == 0) {
            fillColor = 0x000000
            this.canTurnInCurve2 = false;
            count++
        }
        if (count == 0) {
            fillColor = 0xff0000
            this.canTurnInCurve2 = true
        } else {
            this.canTurnInCurve2 = false
            fillColor = 0x000000
        }
        this.graphics.beginPath();
        this.graphics.lineStyle(10, fillColor, 0.5);
        this.graphics.strokeCircle(640, 330, 55);
        this.graphics.closePath();
        this.graphics.beginPath();
        this.graphics.fillStyle(fillColor, 0.3);
        this.graphics.fillCircle(640, 330, 50);
        this.graphics.closePath();

    }
    hideBackToMenuButton() {
        this.backToMenu.visible = false;
        this.backToMenuText.visible = false;
    }
    addButtonDirection() {
        this.rightbtn = new Button(this, "assets", "curveDirection", 67.5, 50, 0.3, false, 0);
        this.rightbtn.body.setAlpha(0.8);
        this.rightbtn.body.rotation = Phaser.Math.DegToRad(-30);
        // left curve
        this.leftbtn = new Button(this, "assets", "curveDirection", 66, 50, 0.3, false, 0);
        this.leftbtn.body.rotation = Phaser.Math.DegToRad(30);
        this.leftbtn.body.flipX = true
        //this.leftbtn.body.setAlpha(0.8).setTint(0x0000ff);
        this.leftbtn.body.visible = false

        //
        this.rightbtn.body.on("pointerover", () => { this.rightbtn.body.setScale(this.rightbtn.scale + 0.05) }, this);
        this.rightbtn.body.on("pointerout", () => { this.rightbtn.body.setScale(this.rightbtn.scale) }, this);
        this.rightbtn.body.on("pointerdown", () => {
            if (!this.canTurnInCurve1)
                return
            this.clickButtonAudio.play()
            this.rightbtn.body.visible = false
            this.leftbtn.body.visible = true
            this.turnLeftInCurve1 = true
            // yello train
            // if(this.followerYellow3.t==0&&this.followerYellow4.t==0)
            //    this.YellowTurnCurve2=true
            //    if(this.followerRed3.t==0&&this.followerRed4.t==0)
            //    this.redTurnCurve2=true
        }, this);

        this.leftbtn.body.on("pointerover", () => { this.leftbtn.body.setScale(this.leftbtn.scale + 0.05) }, this);
        this.leftbtn.body.on("pointerout", () => { this.leftbtn.body.setScale(this.leftbtn.scale) }, this);
        this.leftbtn.body.on("pointerdown", () => {
            if (!this.canTurnInCurve1)
                return
            this.clickButtonAudio.play()
            this.rightbtn.body.visible = true
            this.leftbtn.body.visible = false
            this.turnLeftInCurve1 = false
            // if(this.followerYellow3.t==0&&this.followerYellow4.t==0)
            //     this.YellowTurnCurve2=false
            // if(this.followerRed3.t==0&&this.followerRed4.t==0)
            //     this.redTurnCurve2=false
        }, this);

    }
    addButtonDirection2() {
        this.downbtn2 = new Button(this, "assets", "forwardDirection", 50, 46, 0.25, false, 0);
        this.downbtn2.body.setAlpha(0.9);
        // left curve
        this.leftbtn2 = new Button(this, "assets", "curveDirection", 50, 45, 0.25, false, 0);
        this.leftbtn2.body.rotation = Phaser.Math.DegToRad(220);
        //  this.leftbtn.body.flipX=true
        this.leftbtn2.body.setAlpha(0.9);
        this.downbtn2.body.visible = false

        //
        this.downbtn2.body.on("pointerover", () => { this.downbtn2.body.setScale(this.downbtn2.scale + 0.05) }, this);
        this.downbtn2.body.on("pointerout", () => { this.downbtn2.body.setScale(this.downbtn2.scale) }, this);
        this.downbtn2.body.on("pointerdown", () => {
            if (!this.canTurnInCurve2)
                return
            this.clickButtonAudio.play()
            this.downbtn2.body.visible = false
            this.leftbtn2.body.visible = true
            this.canTurnInCurve3 = true
        }, this);

        this.leftbtn2.body.on("pointerover", () => { this.leftbtn2.body.setScale(this.leftbtn2.scale + 0.05) }, this);
        this.leftbtn2.body.on("pointerout", () => { this.leftbtn2.body.setScale(this.leftbtn2.scale) }, this);
        this.leftbtn2.body.on("pointerdown", () => {
            if (!this.canTurnInCurve2)
                return
            this.clickButtonAudio.play()
            this.downbtn2.body.visible = true
            this.leftbtn2.body.visible = false
            this.canTurnInCurve3 = false
        }, this);

    }
    addButtonDirection3() {
        this.downbtn3 = new Button(this, "assets", "forwardDirection", 37.2, 15, 0.25, false, 0);
        this.downbtn3.body.setAlpha(0.9);
        this.downbtn3.body.rotation = Phaser.Math.DegToRad(90);
        // left curve
        this.leftbtn3 = new Button(this, "assets", "curveDirection", 37, 15, 0.25, false, 0);
        this.leftbtn3.body.rotation = Phaser.Math.DegToRad(220);
        this.leftbtn3.body.flipY = true
        this.leftbtn3.body.setAlpha(0.9);
        this.leftbtn3.body.visible = false

        //
        this.downbtn3.body.on("pointerover", () => { this.downbtn3.body.setScale(this.downbtn3.scale + 0.05) }, this);
        this.downbtn3.body.on("pointerout", () => { this.downbtn3.body.setScale(this.downbtn3.scale) }, this);
        this.downbtn3.body.on("pointerdown", () => {
            if (!this.canTurnRoad3)
                return
            this.clickButtonAudio.play()
            this.downbtn3.body.visible = false
            this.leftbtn3.body.visible = true
            this.turnInCurve3 = true
            // yello train
            // if(this.followerYellow3.t==0&&this.followerYellow4.t==0)
            //    this.YellowTurnCurve2=true
            //    if(this.followerRed3.t==0&&this.followerRed4.t==0)
            //    this.redTurnCurve2=true
        }, this);

        this.leftbtn3.body.on("pointerover", () => { this.leftbtn3.body.setScale(this.leftbtn3.scale + 0.05) }, this);
        this.leftbtn3.body.on("pointerout", () => { this.leftbtn3.body.setScale(this.leftbtn3.scale) }, this);
        this.leftbtn3.body.on("pointerdown", () => {
            if (!this.canTurnRoad3)
                return
            this.clickButtonAudio.play()
            this.downbtn3.body.visible = true
            this.leftbtn3.body.visible = false
            this.turnInCurve3 = false
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
        this.star1 = this.add.sprite(640, -180, "star").setScale(1);// 650 280
        this.tweens.add({
            targets: this.star1,
            x: 650,
            y: 280,
            duration: 1000,
            ease: 'Power2',
            onStart: () => {
                this.winAudio.play()
            },
            onComplete: function () {

            }
        });
        this.star2 = this.add.sprite(440, -180, "star").setScale(0.68);// 570 310
        this.tweens.add({
            targets: this.star2,
            x: 570,
            y: 310,
            duration: 1500,
            ease: 'Power2',
            onStart: () => {
                this.winAudio.play()
            },
            onComplete: function () {

            }
        });
        this.star3 = this.add.sprite(840, -180, "star").setScale(0.68);// 730 310
        this.tweens.add({
            targets: this.star3,
            x: 730,
            y: 310,
            duration: 1500,
            ease: 'Power2',
            onStart: () => {
                this.winAudio.play()
            },
            onComplete: function () {
                this.canMoveToNextLevel = true
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
        this.backToMenuText = this.add.text(1137, 45, 'Back To Menu', { fontFamily: 'Fantasy', fontSize: '22px' });
        this.backToMenu.on('pointerover', () => { this.setButtonEvent(this.backToMenu, "normalHover"); }, this);
        this.backToMenu.on('pointerout', () => { this.setButtonEvent(this.backToMenu, "normalButton"); }, this);
        this.backToMenu.on('pointerdown', this.clickBackToMenuButton, this);
        this.backToMenu.on('pointerup', () => { this.setButtonEvent(this.backToMenu, "normalButton"); }, this);
    }
    clickBackToMenuButton() {
        this.backToMenu.setFrame("normalClick")
        this.clickButtonAudio.play()
        setTimeout(() => {
            this.trainAudio.stop()
            this.crashed.stop()
            this.scene.start("chooseLevelMenu")
        }, 500);
    }
    addHomeButton(_x, _y) {
        this.homeButton = this.add.sprite(_x, _y, "assets", "pausedNormal").setInteractive();
        this.homeButton.on('pointerover', () => { this.setButtonEvent(this.homeButton, "pausedHover"); }, this);
        this.homeButton.on('pointerout', () => { this.setButtonEvent(this.homeButton, "pausedNormal"); }, this);
        this.homeButton.on('pointerdown', this.clickHomeButton, this);
        this.homeButton.on('pointerup', () => { this.setButtonEvent(this.homeButton, "pausedNormal"); }, this);
    }
    clickHomeButton() {
        this.homeButton.setFrame("pausedClick")
        this.clickButtonAudio.play()
        setTimeout(() => {
            this.scene.start("chooseLevelMenu")
        }, 1000)
    }
    addReloadButton() {
        this.reload = this.add.sprite(580, 398, "assets", "nextNormal").setInteractive().setScale(0.8);
        this.add.text(535, 310, 'RELOAD', { fontFamily: 'Fantasy', fontSize: '32px', color: '#fffff' });
        this.add.text(685, 310, 'HOME', { fontFamily: 'Fantasy', fontSize: '32px', color: '#fffff' });
        this.reload.on('pointerover', () => { this.setButtonEvent(this.reload, "nextHover"); }, this);
        this.reload.on('pointerout', () => { this.setButtonEvent(this.reload, "nextNormal"); }, this);
        this.reload.on('pointerdown', this.clickReloadButton, this);
        this.reload.on('pointerup', () => { this.setButtonEvent(this.reload, "nextNormal"); }, this);
    }
    clickReloadButton() {
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
    clickNextButton() {
        this.nextButton.setFrame("nextClick")
        this.clickButtonAudio.play()
        if (this.level == totalLevel) {
            setTimeout(() => {
                this.scene.start("chooseLevelMenu")
            }, 700)
            return
        }
        setTimeout(() => {
            var nextLevel = "level" + (this.level + 1)
            this.scene.start(nextLevel)
        }, 1000)
    }

    setButtonEvent(_button, _frame) {
        _button.setFrame(_frame);
    }
    //#endregion
    //#endregion
    addTransport() {
        this.train = this.physics.add.sprite(100, 100, "assets", "train").setScale(0.17)
   
        this.yellowTrain = this.physics.add.sprite(1000, 100, "yellowTrain").setScale(0.18)
        this.greenTrain = this.physics.add.sprite(1000, 100, "yellowTrain").setScale(0.18).setTint(0x00ff00)
        // set first position of each car in roads
        this.moveToRoad(this.road2, this.train, this.followerRed, 0.0015)
        this.moveToRoad(this.road3, this.yellowTrain, this.followerYellow, 0.0015)
        this.moveToRoad(this.road1, this.greenTrain, this.followerGreen, 0.0015)
    }

    addRoadImage() {
        this.soidImage = this.add.sprite(400, 330, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage = this.add.sprite(350, 230, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        this.soidImage = this.add.sprite(430, 330, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage = this.add.sprite(590, 330, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage = this.add.sprite(750, 330, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage = this.add.sprite(800, 330, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage = this.add.sprite(950, 330, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage = this.add.sprite(1100, 330, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage = this.add.sprite(1170, 280, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        this.soidImage = this.add.sprite(850, 440, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        this.soidImage = this.add.sprite(850, 640, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        //
        this.soidImage = this.add.sprite(800, 550, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage = this.add.sprite(650, 550, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage = this.add.sprite(500, 550, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage = this.add.sprite(960, 550, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage = this.add.sprite(1120, 550, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
        this.soidImage = this.add.sprite(400, 600, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        this.soidImage = this.add.sprite(1170, 600, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        this.soidImage = this.add.sprite(1170, 650, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        this.soidImage = this.add.sprite(400, 650, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        //
        this.soidImage = this.add.sprite(600, 250, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        this.soidImage = this.add.sprite(600, 130, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(90)
        this.soidImage = this.add.sprite(650, 40, "assets", "straightSoilRoad").setScale(0.6).rotation = Phaser.Math.DegToRad(0)
         // road 2 image 
         this.add.sprite(853, 530, "assets", "straightRoad").setScale(0.28).setRotation(Phaser.Math.DegToRad(0))
         this.add.sprite(853, 570, "assets", "straightRoad").setScale(0.28).setRotation(Phaser.Math.DegToRad(0))
         this.add.sprite(853, 610, "assets", "straightRoad").setScale(0.28).setRotation(Phaser.Math.DegToRad(0))
         this.add.sprite(853, 650, "assets", "straightRoad").setScale(0.28).setRotation(Phaser.Math.DegToRad(0))
         this.add.sprite(853, 690, "assets", "straightRoad").setScale(0.28).setRotation(Phaser.Math.DegToRad(0))
         this.add.sprite(853, 730, "assets", "straightRoad").setScale(0.28).setRotation(Phaser.Math.DegToRad(0))
         // road 1 image
         this.add.sprite(445, 630, "assets", "curveRoad").setScale(0.3).setRotation(Phaser.Math.DegToRad(88)).flipX = true
         this.add.sprite(675, 555, "assets", "straightRoad").setScale(0.23).setRotation(Phaser.Math.DegToRad(90))
         this.add.sprite(635, 555, "assets", "straightRoad").setScale(0.23).setRotation(Phaser.Math.DegToRad(90))
         this.add.sprite(595, 555, "assets", "straightRoad").setScale(0.23).setRotation(Phaser.Math.DegToRad(90))
         this.add.sprite(555, 555, "assets", "straightRoad").setScale(0.23).setRotation(Phaser.Math.DegToRad(90))
         this.add.sprite(515, 555, "assets", "straightRoad").setScale(0.23).setRotation(Phaser.Math.DegToRad(90))
         this.add.sprite(780, 505, "assets", "curveRoad").setScale(0.31).setRotation(Phaser.Math.DegToRad(0))
 
         // road 3 image
         this.add.sprite(1173, 690, "assets", "straightRoad").setScale(0.28).setRotation(Phaser.Math.DegToRad(0))
         this.add.sprite(1100, 605, "assets", "curveRoad").setScale(0.31).setRotation(Phaser.Math.DegToRad(0)).flipY = true
         this.add.sprite(928, 505, "assets", "curveRoad").setScale(0.31).setRotation(Phaser.Math.DegToRad(0)).flipX = true
         // road 4 image 
         this.add.sprite(635, 330, "assets", "straightRoad").setScale(0.23).setRotation(Phaser.Math.DegToRad(90))
         this.add.sprite(595, 330, "assets", "straightRoad").setScale(0.23).setRotation(Phaser.Math.DegToRad(90))
         this.add.sprite(555, 330, "assets", "straightRoad").setScale(0.23).setRotation(Phaser.Math.DegToRad(90))
         this.add.sprite(515, 330, "assets", "straightRoad").setScale(0.23).setRotation(Phaser.Math.DegToRad(90))
         this.add.sprite(415, 280, "assets", "curveRoad").setScale(0.31).setRotation(Phaser.Math.DegToRad(0)).flipX = true
         // curve road 3 image
         this.add.sprite(643, 115, "assets", "curveRoad").setScale(0.3).setRotation(Phaser.Math.DegToRad(90)).flipX = true
         this.add.sprite(643, 260, "assets", "curveRoad").setScale(0.3).setRotation(Phaser.Math.DegToRad(90))
         // curve  1 direction 
         this.add.sprite(780, 380, "assets", "curveRoad").setScale(0.31).setRotation(Phaser.Math.DegToRad(0)).flipY = true
         // curve  2 direction 
         this.add.sprite(927, 380, "assets", "curveRoad").setScale(0.31).setRotation(Phaser.Math.DegToRad(-180))
         this.add.sprite(1100, 280, "assets", "curveRoad").setScale(0.31).setRotation(Phaser.Math.DegToRad(0))
    }
    checkCollision() {
        this.physics.world.overlap(this.train, this.yellowTrain, () => {
            // Xử lý khi có va chạm giữa hai sprite
            console.log('Có va chạm giữa sprite1 và sprite2.');
            setTimeout(() => {
                if (!this.lose) {
                    this.crashed.play()
                    // rotate red train
                    this.train.setRotation(Phaser.Math.DegToRad(-195))
                    this.yellowTrain.setRotation(Phaser.Math.DegToRad(195))
                    // this.yellowTrain.x-=20
                    // this.yellowTrain.y-=10
                    this.lose = true
                }
            }, 140);
        });
        this.physics.world.overlap(this.train, this.greenTrain, () => {
            // Xử lý khi có va chạm giữa hai sprite
            console.log('Có va chạm giữa sprite1 và sprite2.');
            setTimeout(() => {
                if (!this.lose) {
                    this.crashed.play()
                    // rotate red train
                    this.train.setRotation(Phaser.Math.DegToRad(-195))
                    this.greenTrain.setRotation(Phaser.Math.DegToRad(195))
                    // this.yellowTrain.x-=20
                    // this.yellowTrain.y-=10
                    this.lose = true
                }
            }, 140);
        });
        this.physics.world.overlap(this.greenTrain, this.yellowTrain, () => {
            // Xử lý khi có va chạm giữa hai sprite
            console.log('Có va chạm giữa sprite1 và sprite2.');
            setTimeout(() => {
                if (!this.lose) {
                    this.crashed.play()
                    // rotate red train
                    this.greenTrain.setRotation(Phaser.Math.DegToRad(-195))
                    this.yellowTrain.setRotation(Phaser.Math.DegToRad(195))
                    // this.yellowTrain.x-=20
                    // this.yellowTrain.y-=10
                    this.lose = true
                }
            }, 140);
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

            if (bg.origin)
                bgSprite.setOrigin(bg.origin.x, bg.origin.y);
            bgSprite.setDisplaySize(bg.displaySize.width, bg.displaySize.height, bg.imageKey);
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
    update() {
        this.graphics.clear();
        this.addBackgroundNavigation()
        this.addBackgroundNavigation2()
        //this.drawRoad()
        if (this.canPlay) {
            if (!this.lose) {
                if (!this.trainAudio.isPlaying)
                    this.trainAudio.play()
                this.checkCollision()
                this.logicOfYellowTrain()
                this.logicOfGreenTrain()
                this.logicOfRedTrain()
            }
        }

        if (this.lose) {
            if (!this.table) {
                setTimeout(() => {
                    this.loseAudio.play()
                    this.displayLoseTable();
                    this.hideBackToMenuButton()
                }, 400)
                this.table = true
            }
        }
        if (this.redGoToHome && this.yellowGoToHome && this.greenGoToHome) {
            this.trainAudio.stop()
            if (!this.table) {
                this.displayWinTable();
                this.table = true
                this.hideBackToMenuButton()
                this.table = true
            }
        }
    }
    logicOfGreenTrain() {
        if (this.followerGreen.t < 1) {// road 3 0.9--> curve road 1 0.7 curve road 2 0.32
            this.moveToRoad(this.road1, this.greenTrain, this.followerGreen, 0.0015)
        }
        // curve 1 and 2
        if (this.followerGreen.t >= 1 && this.turnLeftInCurve1 && this.followerGreen3.t == 0) {
            this.moveToRoad(this.curveRoad1, this.greenTrain, this.followerGreen2, 0.0015)
        } else if (this.followerGreen2.t != 0) {
            this.moveToRoad(this.curveRoad1, this.greenTrain, this.followerGreen2, 0.0015)
        }
        if (this.followerGreen.t >= 1 && !this.turnLeftInCurve1 && this.followerGreen2.t == 0) {
            this.moveToRoad(this.curveRoad2, this.greenTrain, this.followerGreen3, 0.0015)
        } else if (this.followerGreen3.t != 0) {
            this.moveToRoad(this.curveRoad2, this.greenTrain, this.followerGreen3, 0.0015)
        }
        // curve road 3 
        if (this.followerGreen2.t >= 1 && this.canTurnInCurve3 && this.followerGreen5.t == 0) //curve road 3 0.32 road 4 0.33
            this.moveToRoad(this.curveRoad3, this.greenTrain, this.followerGreen4, 0.0015)
        else if (this.followerGreen4.t != 0) {
            this.moveToRoad(this.curveRoad3, this.greenTrain, this.followerGreen4, 0.0015)
        }
        if (this.followerGreen2.t >= 1 && !this.canTurnInCurve3 && this.followerGreen4.t == 0) //curve road 3 0.32 road 4 0.33
            this.moveToRoad(this.road4, this.greenTrain, this.followerGreen5, 0.0015)
        else if (this.followerGreen5.t != 0) {
            this.moveToRoad(this.road4, this.greenTrain, this.followerGreen5, 0.0015)
        }
        if (this.followerGreen3.t >= 1) {
            this.greenGoToHome = true
        }
        if (this.followerGreen4.t >= 1 || this.followerGreen5.t >= 1)
            this.lose = true
    }
    logicOfYellowTrain() {
        // yellow
        if (this.followerYellow.t < 1) {// road 3 0.9--> curve road 1 0.7 curve road 2 0.32
            if (!this.lightIsRed)
                this.moveToRoad(this.road3, this.yellowTrain, this.followerYellow, 0.003)
            else if (this.followerYellow.t < 0.4) {
                this.moveToRoad(this.road3, this.yellowTrain, this.followerYellow, 0.003)
            }
        }
        // curve 1 and 2
        if (this.followerYellow.t >= 1 && this.turnLeftInCurve1 && this.followerYellow3.t == 0) {
            this.moveToRoad(this.curveRoad1, this.yellowTrain, this.followerYellow2, 0.0015)
        } else if (this.followerYellow2.t != 0) {
            this.moveToRoad(this.curveRoad1, this.yellowTrain, this.followerYellow2, 0.0015)
        }
        if (this.followerYellow.t >= 1 && !this.turnLeftInCurve1 && this.followerYellow2.t == 0) {
            this.moveToRoad(this.curveRoad2, this.yellowTrain, this.followerYellow3, 0.0015)
        } else if (this.followerYellow3.t != 0) {
            this.moveToRoad(this.curveRoad2, this.yellowTrain, this.followerYellow3, 0.0015)
        }
        // curve road 3 
        if (this.followerYellow2.t >= 1 && this.canTurnInCurve3 && this.followerYellow5.t == 0) //curve road 3 0.32 road 4 0.33
            this.moveToRoad(this.curveRoad3, this.yellowTrain, this.followerYellow4, 0.002)
        else if (this.followerYellow4.t != 0) {
            this.moveToRoad(this.curveRoad3, this.yellowTrain, this.followerYellow4, 0.002)
        }
        if (this.followerYellow2.t >= 1 && !this.canTurnInCurve3 && this.followerYellow4.t == 0) //curve road 3 0.32 road 4 0.33
            this.moveToRoad(this.road4, this.yellowTrain, this.followerYellow5,  0.002)
        else if (this.followerYellow5.t != 0) {
            this.moveToRoad(this.road4, this.yellowTrain, this.followerYellow5,  0.002)
        }
        if (this.followerYellow4.t >= 1) {
            this.yellowGoToHome = true
        }
        if (this.followerYellow3.t >= 1 || this.followerYellow5.t >= 1)
            this.lose = true
    }
    logicOfRedTrain() {
        // red
        if (this.followerRed.t < 1) {// road 3 0.9--> curve road 1 0.7 curve road 2 0.32
            this.moveToRoad(this.road2, this.train, this.followerRed, 0.004)
        }
        // curve 1 and 2
        if (this.followerRed.t >= 1 && this.turnLeftInCurve1 && this.followerRed3.t == 0) {
            this.moveToRoad(this.curveRoad1, this.train, this.followerRed2, 0.003)
        } else if (this.followerRed2.t != 0) {
            this.moveToRoad(this.curveRoad1, this.train, this.followerRed2, 0.003)
        }
        if (this.followerRed.t >= 1 && !this.turnLeftInCurve1 && this.followerRed2.t == 0) {
            this.moveToRoad(this.curveRoad2, this.train, this.followerRed3, 0.003)
        } else if (this.followerRed3.t != 0) {
            this.moveToRoad(this.curveRoad2, this.train, this.followerRed3, 0.003)
        }
        // curve road 3 
        if (this.followerRed2.t >= 1 && this.canTurnInCurve3 && this.followerRed5.t == 0) //curve road 3 0.32 road 4 0.33
            this.moveToRoad(this.curveRoad3, this.train, this.followerRed4, 0.003)
        else if (this.followerRed4.t != 0) {
            this.moveToRoad(this.curveRoad3, this.train, this.followerRed4, 0.003)
        }
        if (this.followerRed2.t >= 1 && !this.canTurnInCurve3 && this.followerRed4.t == 0) //curve road 3 0.32 road 4 0.33
            this.moveToRoad(this.road4, this.train, this.followerRed5, 0.003)
        else if (this.followerRed5.t != 0) {
            this.moveToRoad(this.road4, this.train, this.followerRed5, 0.003)
        }
        if (this.followerRed5.t >= 1) {
            this.redGoToHome = true
        }
        if (this.followerRed4.t >= 1 || this.followerRed3.t >= 1)
            this.lose = true
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

    moveObject(_follower, _road, _object, _speed, _container) {
        if (_follower.t <= 1) {
            _follower.t = this.moveToRoad(_road, _object, _follower, _speed)
        }
    }
    moveToRoad(_road, _target, _follower, _speed) {
        _road.getPoint(_follower.t, _follower.vec)
        _follower.t += _speed
        if (_follower.t >= 1)
            return _follower.t
        _target.x = _follower.vec.x
        _target.y = _follower.vec.y
        const tangentVector = _road.getTangent(_follower.t);
        const angle = Phaser.Math.Angle.Between(0, 0, tangentVector.x, tangentVector.y)

        _target.rotation = angle
        return _follower.t
    }

    drawRoad() {
        //  this.graphics.setDepth(0)
        this.graphics.lineStyle(2, 0xffffff, 1)
        this.road1.draw(this.graphics);
        this.graphics.lineStyle(2, 0x000000, 1)
        this.road2.draw(this.graphics);
        this.graphics.lineStyle(2, 0xFF0000, 1)
        this.curveRoad1.draw(this.graphics);
        this.graphics.lineStyle(2, 0x00FF00, 1)
        this.curveRoad2.draw(this.graphics);
        this.graphics.lineStyle(2, 0x00FF00, 1)
        this.curveRoad3.draw(this.graphics);
        this.graphics.lineStyle(2, 0x0000ff, 1)
        this.road4.draw(this.graphics);
        this.graphics.lineStyle(2, 0xFFA500, 1)
        this.road3.draw(this.graphics);
    }
}