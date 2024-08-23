class Level6 extends Phaser.Scene {
    constructor() {
        super("level6")
    }
    preload() {
        Phaser.Cache.enabled = false;
        this.load.json('level4Data', '/levelData/level4.json');
        this.load.atlas("crossing", "assets/crossing.png", "assets/crossing.json")
        this.load.image("yellowTrain", "assets/yellowTrain.png")
        this.load.image("curveCarRoad", "assets/curveCarRoad.PNG")
        this.load.image("straightCarRoad", "assets/straightCarRoad.PNG")
        this.load.image("pipe", "assets/pipe.png")
        this.load.image("crossingRed", "assets/crossingRed.png")
    }
    create() {
        // variable 
        this.level=6
        this.stopCars = false
        this.table = false
        this.lose = false
        this.canTurnInCurve1 = false;
        this.turnLeftInCurve1 = true
        this.canTurnInCurve2 = false;
        this.turnLeftInCurve2 = false
        this.yellowGoToHome = false
        this.redGoToHome = false
        this.allData = this.cache.json.get('level4Data');
        this.graphics = this.add.graphics();
        this.addAudio()
        this.addBackGround()
        this.addRoadImage()
        this.graphics = this.add.graphics();
        this.graphics.setDepth(0);
        this.createRoad()
        this.addButtonDirection()
        this.addButtonDirection2()
        this.addTransport()
        this.addHouseStation()
        this.add.sprite(80, 80, "curveCarRoad")
        this.addCrossingBaries();
        this.addBackToMenuButton()
        this.canPlay=false
        setTimeout(() => {
            this.canPlay = true
            this.trainAudio.play()
        }, 1000);
    }
    addAudio() {
        this.clickButtonAudio = this.sound.add('clickButtonAudio');
        this.winAudio = this.sound.add('winAudio');
        this.loseAudio = this.sound.add('loseAudio');
        this.crashed = this.sound.add('crashed');
        this.trainAudio = this.sound.add('trainAudio');
        this.trainAudio.play()
    }
    addCrossingBaries() {
        this.pipe = this.add.sprite(870, 250, "pipe").setScale(0.5).setRotation(Phaser.Math.DegToRad(0)).setInteractive()
        this.crossingRed1 = this.add.sprite(860, 230, "crossingRed").setScale(0.3).setRotation(Phaser.Math.DegToRad(-46))
        this.crossingRed2 = this.add.sprite(840, 240, "crossingRed").setScale(0.3).setRotation(Phaser.Math.DegToRad(-200))
        this.crossingRed2.flipY = true
        this.crossingRed2.visible = false

        this.pipe2 = this.add.sprite(600, 380, "pipe").setScale(0.5).setRotation(Phaser.Math.DegToRad(0)).setInteractive()
        this.crossingRed3 = this.add.sprite(602, 360, "crossingRed").setScale(0.3).setRotation(Phaser.Math.DegToRad(-42))
        this.crossingRed4 = this.add.sprite(630, 400, "crossingRed").setScale(0.3).setRotation(Phaser.Math.DegToRad(75))
        this.crossingRed4.visible = false
        //
        this.pipe2.on("pointerover", () => {
            this.pipe2.setTint(0x808080)
            this.pipe.setTint(0x808080)
            this.crossingRed1.setTint(0x808080)
            this.crossingRed2.setTint(0x808080)
            this.crossingRed3.setTint(0x808080)
            this.crossingRed4.setTint(0x808080)
        }, this)
        this.pipe2.on("pointerout", () => {
            this.pipe2.clearTint()
            this.pipe.clearTint()
            this.crossingRed1.clearTint()
            this.crossingRed2.clearTint()
            this.crossingRed3.clearTint()
            this.crossingRed4.clearTint()
        }, this)
        this.pipe2.on("pointerup", () => {
            this.pipe2.clearTint()
            this.pipe.clearTint()
            this.crossingRed1.clearTint()
            this.crossingRed2.clearTint()
            this.crossingRed3.clearTint()
            this.crossingRed4.clearTint()
        }, this)
        this.pipe2.on("pointerdown", () => {
            if (this.followerCar1.t > 0.4 && this.followerCar1.t < 0.65 || this.followerCar2.t > 0.3 && this.followerCar2.t < 0.65)
                return
            this.pipe2.setTint("black")
            this.pipe.setTint("black")
            this.crossingRed1.setTint("black")
            this.crossingRed2.setTint("black")
            this.crossingRed3.setTint("black")
            this.crossingRed4.setTint("black")
            if (this.crossingRed4.visible == false) {
                //  console.log(1)
                this.crossingRed1.visible = false
                this.crossingRed2.visible = true
                this.crossingRed3.visible = false
                this.crossingRed4.visible = true
                this.stopCars = true
            } else {
                this.crossingRed1.visible = true
                this.crossingRed2.visible = false
                this.crossingRed3.visible = true
                this.crossingRed4.visible = false
                this.stopCars = false
            }

        }, this)
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
    }
    addTransport() {
        this.train = this.physics.add.sprite(100, 100, "assets", "train").setScale(0.25)
        this.yellowTrain = this.physics.add.sprite(1000, 100, "yellowTrain").setScale(0.2)
        // set first position of each car in roads
        this.moveToRoad(this.trainRoad1, this.train, this.followerRed, 0.0015)
        this.moveToRoad(this.curveRoad1, this.yellowTrain, this.followerYellow, 0.0015)
        // car
        this.followerCar1 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerCar2 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.car = this.physics.add.sprite(1000, 100, "assets", "car").setScale(0.5)
        this.car2 = this.physics.add.sprite(1000, 100, "assets", "car").setScale(0.5)
        this.car2.setTint(0xff0000)
        this.currentTintOfCar2 = 0xff0000
        this.currentTintOfCar1 = 0x3498db
        this.moveToRoad(this.road1, this.car, this.followerYellow, 0.0015)
    }
    addHouseStation() {
        this.house = this.add.sprite(150, 395, "assets", "houseStation").setScale(0.5).setRotation(Phaser.Math.DegToRad(120))
        this.house.setDisplaySize(150, 200).setTint(0xFF0000)
        this.house2 = this.add.sprite(370, 100, "assets", "houseStation").setScale(0.5).setRotation(Phaser.Math.DegToRad(123))
        this.house2.setDisplaySize(150, 180).setTint(0xFFFF00)
        // this.house3 = this.add.sprite(1170, 200, "assets", "houseStation").setScale(0.5).setRotation(Phaser.Math.DegToRad(180))
        // this.house3.setDisplaySize(150, 100).setTint(0x00ff00)
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
        //
        this.road1 = new Phaser.Curves.Path(460, 800)
        this.road1.lineTo(920, -40);
        this.road2 = new Phaser.Curves.Path(990, -40)
        this.road2.lineTo(520, 800);
        // this.road1.ellipseTo(-50,-50,0,90,false,0);
        // road 1 train
        this.trainRoad1 = new Phaser.Curves.Path(1200, 615)
        this.trainRoad1.lineTo(860, 405);
        // this.trainRoad1.lineTo(600,250);

        //this.trainRoad1.lineTo(440,150);
        // curve first 
        this.curveRoad1 = new Phaser.Curves.Path(1175, 100)
        this.curveRoad1.lineTo(1000, 387);
        this.curveRoad1.ellipseTo(100, 100, 0, 90, false, 38);
        // road 2
        this.trainRoad2 = new Phaser.Curves.Path(860, 405)
        this.trainRoad2.lineTo(620, 255);
        // road 3
        this.trainRoad3 = new Phaser.Curves.Path(620, 255)
        this.trainRoad3.lineTo(370, 95);
        // curve second
        this.curveRoad2 = new Phaser.Curves.Path(620, 255)
        this.curveRoad2.ellipseTo(-100, 100, 0, 90, false, 120);
        this.curveRoad2.lineTo(390, 436);
        this.curveRoad2.ellipseTo(90, 90, 0, 90, false, 35);
        this.curveRoad2.lineTo(140, 380);

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
    hideBackToMenuButton() {
        this.backToMenu.visible = false;
        this.backToMenuText.visible = false;
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
    addRoadImage() {// 78 // 142
        //  this.add.sprite(802,242,"straightCarRoad").setRotation(Phaser.Math.DegToRad(29))
        this.add.sprite(832, 185, "straightCarRoad").setRotation(Phaser.Math.DegToRad(29)).setScale(1.6)
        for (let i = 3; i >= 0; i--) {
            //  this.add.sprite(958-i*78,-42+i*142,"straightCarRoad").setRotation(Phaser.Math.DegToRad(29)).setScale
            this.add.sprite(958 - i * 126, -42 + i * 227, "straightCarRoad").setRotation(Phaser.Math.DegToRad(29)).setScale(1.6)
        }
        // road 1
        for (let i = 0; i < 10; i++) {

            this.add.sprite(920 + i * 55, 440 + i * 35, "assets", "straightRoad").setRotation(Phaser.Math.DegToRad(123)).setScale(0.38)

        }
        for (let i = -9; i <= - 6; i++) {

            this.add.sprite(920 + i * 55, 445 + i * 35, "assets", "straightRoad").setRotation(Phaser.Math.DegToRad(123)).setScale(0.38)
        }
        //this.add.sprite(920+-6*55,445+-6*35,"assets","straightRoad").setRotation(Phaser.Math.DegToRad(123)).setScale(0.38)
        this.add.sprite(975, 475, "assets", "straightRoad").setRotation(Phaser.Math.DegToRad(123)).setScale(0.38)
        // curve 1
        this.add.sprite(890, 330, "assets", "curveRoad").setRotation(Phaser.Math.DegToRad(32)).setScale(0.5)
        for (let i = 0; i < 6; i++) {
            this.add.sprite(1064 + i * 38, 275 - i * 60, "assets", "straightRoad").setRotation(Phaser.Math.DegToRad(32)).setScale(0.42)

        }
        //this.add.sprite(1102,215,"assets","straightRoad").setRotation(Phaser.Math.DegToRad(32)).setScale(0.42)
        // curve 2
        this.add.sprite(600, 335, "assets", "curveRoad").setRotation(Phaser.Math.DegToRad(213)).setScale(0.5)
        this.add.sprite(290, 380, "assets", "curveRoad").setRotation(Phaser.Math.DegToRad(32)).setScale(0.5)
    }
    addButtonDirection() {
        this.rightbtn = new Button(this, "assets", "curveDirection", 72, 58, 0.3, false, 0);
        this.rightbtn.body.setAlpha(0.8);
        this.rightbtn.body.rotation = Phaser.Math.DegToRad(-160);
        // left curve
        this.fowardbtn = new Button(this, "assets", "forwardDirection", 71, 60, 0.3, false, 0);
        this.fowardbtn.body.rotation = Phaser.Math.DegToRad(30);
        this.fowardbtn.body.flipX = true
        //this.fowardbtn.body.setAlpha(0.8).setTint(0x0000ff);
        this.fowardbtn.body.visible = false

        //
        this.rightbtn.body.on("pointerover", () => { this.rightbtn.body.setScale(this.rightbtn.scale + 0.05) }, this);
        this.rightbtn.body.on("pointerout", () => { this.rightbtn.body.setScale(this.rightbtn.scale) }, this);
        this.rightbtn.body.on("pointerdown", () => {
            if (!this.canTurnInCurve1)
                return
            this.clickButtonAudio.play()
            this.rightbtn.body.visible = false
            this.fowardbtn.body.visible = true
            this.turnLeftInCurve1 = false
            // yello train
            // if(this.followerYellow3.t==0&&this.followerYellow4.t==0)
            //    this.YellowTurnCurve2=true
            //    if(this.followerRed3.t==0&&this.followerRed4.t==0)
            //    this.redTurnCurve2=true
        }, this);

        this.fowardbtn.body.on("pointerover", () => { this.fowardbtn.body.setScale(this.fowardbtn.scale + 0.05) }, this);
        this.fowardbtn.body.on("pointerout", () => { this.fowardbtn.body.setScale(this.fowardbtn.scale) }, this);
        this.fowardbtn.body.on("pointerdown", () => {
            if (!this.canTurnInCurve1)
                return
            this.clickButtonAudio.play()
            this.rightbtn.body.visible = true
            this.fowardbtn.body.visible = false
            this.turnLeftInCurve1 = true
            // if(this.followerYellow3.t==0&&this.followerYellow4.t==0)
            //     this.YellowTurnCurve2=false
            // if(this.followerRed3.t==0&&this.followerRed4.t==0)
            //     this.redTurnCurve2=false
        }, this);

    }
    addButtonDirection2() {
        this.rightbtn2 = new Button(this, "assets", "curveDirection", 45, 33, 0.3, false, 0);
        this.rightbtn2.body.setAlpha(0.8);
        this.rightbtn2.body.rotation = Phaser.Math.DegToRad(-190);
        this.rightbtn2.body.flipY = true
        this.rightbtn2.body.visible = false
        // left curve
        this.fowardbtn2 = new Button(this, "assets", "forwardDirection", 45, 32, 0.3, false, 0);
        this.fowardbtn2.body.rotation = Phaser.Math.DegToRad(30);
        this.fowardbtn2.body.flipX = true
        //this.fowardbtn.body.setAlpha(0.8).setTint(0x0000ff);

        //
        this.rightbtn2.body.on("pointerover", () => { this.rightbtn2.body.setScale(this.rightbtn2.scale + 0.05) }, this);
        this.rightbtn2.body.on("pointerout", () => { this.rightbtn2.body.setScale(this.rightbtn2.scale) }, this);
        this.rightbtn2.body.on("pointerdown", () => {
            if (!this.canTurnInCurve2)
                return
            this.clickButtonAudio.play()
            this.rightbtn2.body.visible = false
            this.fowardbtn2.body.visible = true
            this.turnLeftInCurve2 = false
            // yello train
            // if(this.followerYellow3.t==0&&this.followerYellow4.t==0)
            //    this.YellowTurnCurve2=true
            //    if(this.followerRed3.t==0&&this.followerRed4.t==0)
            //    this.redTurnCurve2=true
        }, this);

        this.fowardbtn2.body.on("pointerover", () => { this.fowardbtn2.body.setScale(this.fowardbtn2.scale + 0.05) }, this);
        this.fowardbtn2.body.on("pointerout", () => { this.fowardbtn2.body.setScale(this.fowardbtn2.scale) }, this);
        this.fowardbtn2.body.on("pointerdown", () => {
            if (!this.canTurnInCurve2)
                return
            this.clickButtonAudio.play()
            this.rightbtn2.body.visible = true
            this.fowardbtn2.body.visible = false
            this.turnLeftInCurve2 = true
            // if(this.followerYellow3.t==0&&this.followerYellow4.t==0)
            //     this.YellowTurnCurve2=false
            // if(this.followerRed3.t==0&&this.followerRed4.t==0)
            //     this.redTurnCurve2=false
        }, this);

    }
    checkCollision() {
        this.physics.world.overlap(this.train, this.car, () => {
            // Xử lý khi có va chạm giữa hai sprite
            console.log('Có va chạm giữa sprite1 và sprite2.');
            setTimeout(() => {
                if (!this.lose) {
                    this.crashed.play()
                    // rotate red train
                    this.train.setRotation(Phaser.Math.DegToRad(-195))
                    this.car.setRotation(Phaser.Math.DegToRad(195))
                    // this.yellowTrain.x-=20
                    // this.yellowTrain.y-=10
                    this.lose = true
                }
            }, 340);
        });
        this.physics.world.overlap(this.train, this.car2, () => {
            // Xử lý khi có va chạm giữa hai sprite
            console.log('Có va chạm giữa sprite1 và sprite2.');
            setTimeout(() => {
                if (!this.lose) {
                    this.crashed.play()
                    // rotate red train
                    this.train.setRotation(Phaser.Math.DegToRad(245))
                    this.car2.setRotation(Phaser.Math.DegToRad(195))
                    this.car2.y += 60
                    this.car2.x -= 40
                    // this.yellowTrain.x-=20
                    // this.yellowTrain.y-=10
                    this.lose = true
                }
            }, 140);
        });
        // yellow
        this.physics.world.overlap(this.yellowTrain, this.car, () => {
            // Xử lý khi có va chạm giữa hai sprite
            console.log('Có va chạm giữa sprite1 và sprite2.');
            setTimeout(() => {
                if (!this.lose) {
                    this.crashed.play()
                    // rotate red train
                    this.yellowTrain.setRotation(Phaser.Math.DegToRad(-195))
                    this.car.setRotation(Phaser.Math.DegToRad(195))
                    // this.yellowTrain.x-=20
                    // this.yellowTrain.y-=10
                    this.lose = true
                }
            }, 340);
        });
        this.physics.world.overlap(this.yellowTrain, this.car2, () => {
            // Xử lý khi có va chạm giữa hai sprite
            console.log('Có va chạm giữa sprite1 và sprite2.');
            setTimeout(() => {
                if (!this.lose) {
                    this.crashed.play()
                    // rotate red train
                    this.yellowTrain.setRotation(Phaser.Math.DegToRad(245))
                    this.car2.setRotation(Phaser.Math.DegToRad(195))
                    this.car2.y += 60
                    this.car2.x -= 40
                    // this.yellowTrain.x-=20
                    // this.yellowTrain.y-=10
                    this.lose = true
                }
            }, 140);
        });
    }
    update() {
        //   console.log(1)
        this.graphics.clear();
      //  this.drawRoad()
        this.addBackgroundNavigation()
        this.addBackgroundNavigation2()
        this.addBackgroundNavigation3()
        if(this.canPlay){
            if (!this.lose) {
                if (!this.trainAudio.isPlaying)
                    this.trainAudio.play()
                this.checkCollision()
                this.logicOfYellowTrain()
                this.logicOfRedTrain()
                this.logicOfCars()
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
            if (this.redGoToHome && this.yellowGoToHome) {
                this.trainAudio.stop()
                if (!this.table) {
                    this.displayWinTable();
                    this.table = true
                    this.hideBackToMenuButton()
                    this.table = true
                }
            }
        }


    }
    logicOfRedTrain() {
        if (this.followerRed.t < 1) {
            if (this.followerRed.t > 0.7 && this.turnLeftInCurve1) {
                this.lose = true
                return
            }
            this.moveToRoad(this.trainRoad1, this.train, this.followerRed, 0.0025)
        }// curve road 1 0.65==> road 2 0.24

        if (this.followerRed.t >= 1)
            // road 2 0.8 curve road 2 0.24 road 3 0.55
            this.moveToRoad(this.trainRoad2, this.train, this.followerRed2, 0.002)

        if (this.followerRed2.t >= 1 && this.turnLeftInCurve2 && this.followerRed3.t == 0)
            this.moveToRoad(this.curveRoad2, this.train, this.followerRed4, 0.002)
        else if (this.followerRed4.t != 0) {
            this.moveToRoad(this.curveRoad2, this.train, this.followerRed4, 0.002)
        }
        if (this.followerRed2.t >= 1 && !this.turnLeftInCurve2 && this.followerRed4.t == 0)
            this.moveToRoad(this.trainRoad3, this.train, this.followerRed3, 0.002)
        else if (this.followerRed3.t != 0) {
            this.moveToRoad(this.trainRoad3, this.train, this.followerRed3, 0.002)
        }
        if (this.followerRed4.t >= 1)
            this.redGoToHome = true
        if (this.followerRed3.t >= 1)
            this.lose = true
    }
    logicOfYellowTrain() {
        if (this.followerYellow.t < 1) {
            if (this.followerYellow.t > 0.7 && !this.turnLeftInCurve1) {
                this.lose = true
                return
            }
            this.moveToRoad(this.curveRoad1, this.yellowTrain, this.followerYellow, 0.001)
        }// curve road 1 0.65==> road 2 0.24

        if (this.followerYellow.t >= 1)
            // road 2 0.8 curve road 2 0.24 road 3 0.55
            this.moveToRoad(this.trainRoad2, this.yellowTrain, this.followerYellow2, 0.0025)

        if (this.followerYellow2.t >= 1 && this.turnLeftInCurve2 && this.followerYellow3.t == 0)
            this.moveToRoad(this.curveRoad2, this.yellowTrain, this.followerYellow4, 0.0025)
        else if (this.followerYellow4.t != 0) {
            this.moveToRoad(this.curveRoad2, this.yellowTrain, this.followerYellow4, 0.0025)
        }
        if (this.followerYellow2.t >= 1 && !this.turnLeftInCurve2 && this.followerYellow4.t == 0)
            this.moveToRoad(this.trainRoad3, this.yellowTrain, this.followerYellow3, 0.0025)
        else if (this.followerYellow3.t != 0) {
            this.moveToRoad(this.trainRoad3, this.yellowTrain, this.followerYellow3, 0.0025)
        }
        if (this.followerYellow3.t >= 1)
            this.yellowGoToHome = true
        if (this.followerYellow4.t >= 1)
            this.lose = true
    }
    logicOfCars() {
        if (this.followerCar1.t < 1) { // road 3 0.3 --0.7  
            if (this.followerCar1.t < 0.39) {
                this.moveToRoad(this.road1, this.car, this.followerCar1, 0.002)
            }
            if (this.followerCar1.t > 0.65)
                this.moveToRoad(this.road1, this.car, this.followerCar1, 0.002)
            if (this.followerCar1.t > 0.39 && this.followerCar1.t < 0.65 && !this.stopCars)
                this.moveToRoad(this.road1, this.car, this.followerCar1, 0.002)

        } else {
            this.followerCar1.t = 0
            if (this.currentTintOfCar1 == 0x3498db) {
                this.car.clearTint()
                this.currentTintOfCar1 = null
            } else {
                this.currentTintOfCar1 = 0x3498db
                this.car.setTint(this.currentTintOfCar1)
            }
        }

        if (this.followerCar2.t < 1) {
            if (this.followerCar2.t < 0.29) {
                this.moveToRoad(this.road2, this.car2, this.followerCar2, 0.002)
            }
            if (this.followerCar2.t > 0.65)
                this.moveToRoad(this.road2, this.car2, this.followerCar2, 0.002)
            if (this.followerCar2.t > 0.29 && this.followerCar2.t < 0.65 && !this.stopCars)
                this.moveToRoad(this.road2, this.car2, this.followerCar2, 0.002)
        }   //  road 1 0.34--0.65
        //    this.moveToRoad(this.road2, this.car2, this.followerCar2, 0.002)
        else {
            this.followerCar2.t = 0
            if (Math.random() * 100 > 40)
                if (this.currentTintOfCar2 == 0xff0000) {
                    this.car2.clearTint()
                    this.currentTintOfCar2 = null
                } else {
                    this.currentTintOfCar2 = 0xff0000
                    this.car2.setTint(this.currentTintOfCar2)
                }
        }
    }
    addBackgroundNavigation2() {
        var fillColor = 0x0000ff
        var count = 0
        if (this.followerYellow2.t >= 0.8 && this.followerYellow3.t < 0.55 && this.followerYellow4.t == 0 ||
            this.followerYellow2.t >= 0.8 && this.followerYellow4.t < 0.24 && this.followerYellow3.t == 0) {
            fillColor = 0x000000
            this.canTurnInCurve2 = false;
            count++
        }
        if (this.followerRed2.t >= 0.8 && this.followerRed3.t < 0.55 && this.followerRed4.t == 0 ||
            this.followerRed2.t >= 0.8 && this.followerRed4.t < 0.24 && this.followerRed3.t == 0) {
            fillColor = 0x000000
            this.canTurnInCurve2 = false;
            count++
        }
        if (count == 0) {
            fillColor = 0x0000ff
            this.canTurnInCurve2 = true
        } else {
            this.canTurnInCurve2 = false
            fillColor = 0x000000
        }
        this.graphics.beginPath();
        this.graphics.lineStyle(10, fillColor, 0.8);
        this.graphics.strokeCircle(580, 235, 65);
        this.graphics.closePath();
        this.graphics.beginPath();
        this.graphics.fillStyle(fillColor, 0.3); // Adjust alpha value here
        this.graphics.fillCircle(580, 235, 60);
        this.graphics.closePath();
    }
    addBackgroundNavigation() {
        var fillColor = 0x0000ff
        var count = 0
        if (this.followerYellow.t >= 0.65 && this.followerYellow2.t < 0.24) {
            fillColor = 0x000000
            this.canTurnInCurve1 = false;
            count++
        }
        if (this.followerRed.t >= 0.57 && this.followerRed2.t < 0.24) {
            fillColor = 0x000000
            this.canTurnInCurve1 = false;
            count++
        }
        if (count == 0) {
            fillColor = 0x0000ff
            this.canTurnInCurve1 = true
        } else {
            this.canTurnInCurve1 = false
            fillColor = 0x000000
        }
        this.graphics.beginPath();
        this.graphics.lineStyle(10, fillColor, 0.8);
        this.graphics.strokeCircle(910, 430, 65);
        this.graphics.closePath();
        this.graphics.beginPath();
        this.graphics.fillStyle(fillColor, 0.3); // Adjust alpha value here
        this.graphics.fillCircle(910, 430, 60);
        this.graphics.closePath();
    }
    addBackgroundNavigation3() {
        var fillColor = 0xff0000
        var count = 0
        if (this.followerCar1.t > 0.4 && this.followerCar1.t < 0.65 || this.followerCar2.t > 0.3 && this.followerCar2.t < 0.65) {
            fillColor = 0x000000
        }
        this.graphics.beginPath();
        this.graphics.lineStyle(10, fillColor, 0.8);
        this.graphics.strokeCircle(600, 420, 45);
        this.graphics.closePath();
        this.graphics.beginPath();
        this.graphics.fillStyle(fillColor, 0.5);
        this.graphics.fillCircle(600, 420, 40);
        this.graphics.closePath();

    }
    drawRoad() {
        //  this.graphics.setDepth(0)
        this.graphics.lineStyle(2, 0xffffff, 1)
        this.road1.draw(this.graphics);
        this.graphics.lineStyle(2, 0x000000, 1)
        this.road2.draw(this.graphics);
        this.graphics.lineStyle(2, 0xFF0000, 1)
        this.trainRoad1.draw(this.graphics);
        this.graphics.lineStyle(2, 0x00FF00, 1)
        this.curveRoad1.draw(this.graphics);
        this.graphics.lineStyle(2, 0x0000ff, 1)
        this.trainRoad2.draw(this.graphics);
        this.graphics.lineStyle(2, 0xFFA500, 1)
        this.trainRoad3.draw(this.graphics);
        this.graphics.lineStyle(2, 0x000000, 1)
        this.curveRoad2.draw(this.graphics);
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
}