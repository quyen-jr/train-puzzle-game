class Level1 extends Phaser.Scene {
    constructor() {
        super("level1")
    }
    preload(){
        Phaser.Cache.enabled = false;
        this.load.json('level1Data', '/levelData/level1.json');
    }
    create() {    
        this.allData = this.cache.json.get('level1Data');
        this.addAudio();
        this.addBackGround()
        this.createRoad()
        this.addBackgroundNavigation()
        this.graphics = this.add.graphics();
        this.graphics.setDepth(0);
        this.addRoadImage()
        this.addButtonDirection()
        this.addBackToMenuButton()
        this.addTrain()
        this.addHouseStationImage()
        // variable
        this.follower.t=0.3;
        this.followerContainer.t=0;
        this.win =false
        this.lose=false
        this.table=false;
        this.level=1
        this.straightroad2 = true;
        this.curveRoad = false;
    }
    addAudio() {
        this.graphics = this.add.graphics();
        this.clickButtonAudio = this.sound.add('clickButtonAudio');
        this.winAudio = this.sound.add('winAudio');
        this.loseAudio = this.sound.add('loseAudio');
        this.trainAudio = this.sound.add('trainAudio');
    }

    addBackgroundNavigation(){
        var fillColor=0xff0000 
        if(this.follower.t>=0.8&&this.follower2.t<0.3&&this.follower3.t==0)
            fillColor=0x000000
        if(this.follower.t>=0.8&&this.follower3.t<0.3&&this.follower2.t==0)
            fillColor=0x000000
        this.graphics.beginPath();
        this.graphics.lineStyle(10,fillColor, 0.8);
        this.graphics.strokeCircle(600,350,100);
        this.graphics.closePath();
        this.graphics.beginPath();
        this.graphics.fillStyle(fillColor, 0.3);
        this.graphics.fillCircle(600,350,95);
        this.graphics.closePath();        
    }
    addHouseStationImage() {
        this.house = this.add.sprite(245, 145,"assets", "houseStation").setScale(0.5).setRotation(Phaser.Math.DegToRad(131));
        this.house.setDisplaySize(200, 300);      
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
        this.soidImage =this.add.sprite(845,70,"assets","straightSoilRoad").setScale(1.5).rotation = Phaser.Math.DegToRad(130);
        this.soidImage =this.add.sprite(649,300,"assets","straightSoilRoad").setScale(1.5).rotation = Phaser.Math.DegToRad(130);
        this.soidImage =this.add.sprite(415,600,"assets","straightSoilRoad").setScale(1.5).rotation = Phaser.Math.DegToRad(126);
        this.curveSoidImage2 =this.add.sprite(425,64,"assets","curveSoilRoad").setScale(1.5).rotation=Phaser.Math.DegToRad(40.5);
    }
    addTrain() {
        this.container=this.add.image(100, 600,"assets", "container").setScale(0.37);
        this.train = this.add.image(0, 0,"assets", "train").setScale(0.37)
        this.speed = 0.0015;
        this.angle;
    }
    addButtonDirection() {
        const straightbtnInfo = this.allData.buttons.straightbtnInfo;
        const curvebtnInfo = this.allData.buttons.curvebtnInfo;
        this.downbtn = new Button(this, straightbtnInfo.texture, straightbtnInfo.frame, straightbtnInfo.position.x, straightbtnInfo.position.y, straightbtnInfo.scale, straightbtnInfo.rotation);
        this.downbtn.body.on("pointerdown", () => { this.clickButtonAudio.play() }, this);
        this.downbtn.body.on("pointerover", () => { this.downbtn.body.setScale(straightbtnInfo.scale+0.05) }, this);
        this.downbtn.body.on("pointerout", () => { this.downbtn.body.setScale(straightbtnInfo.scale) }, this);
        this.downbtn.body.setAlpha(straightbtnInfo.alpha);
        // this.downbtn.body.play("greenArrowAnimation");
        this.downbtn.body.rotation = Phaser.Math.DegToRad(125);
    
        this.leftbtn = new Button(this, curvebtnInfo.texture, curvebtnInfo.frame, curvebtnInfo.position.x, curvebtnInfo.position.y, curvebtnInfo.scale, curvebtnInfo.rotation);
        this.leftbtn.body.on("pointerdown", () => { this.clickButtonAudio.play() }, this);
        this.leftbtn.body.on("pointerover", () => { this.leftbtn.body.setScale(curvebtnInfo.scale+0.05) }, this);
        this.leftbtn.body.on("pointerout", () => { this.leftbtn.body.setScale(curvebtnInfo.scale) }, this);
        // this.leftbtn.body.play("blueArrowAnimation");
        this.leftbtn.body.visible = curvebtnInfo.visible;
        this.leftbtn.body.rotation = Phaser.Math.DegToRad(175);
        this.leftbtn.body.setAlpha(curvebtnInfo.alpha);
    }

    createRoad() {
        // flow of row this can move transport  smothly
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.follower2 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.follower3 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerContainer = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerContainer2 = { t: 0, vec: new Phaser.Math.Vector2() };
        this.followerContainer3 = { t: 0, vec: new Phaser.Math.Vector2() };
        //  getdataroad
        const road1 = this.allData.roads.road1;
        const road2 = this.allData.roads.road2;
        const road3 = this.allData.roads.road3;
        // // // road 1
        this.road = new Phaser.Curves.Path(road1.points[0].x, road1.points[0].y);
        this.road.lineTo(road1.points[1].x, road1.points[1].y);
        // // // road 2
        this.road2 = new Phaser.Curves.Path(road2.points[0].x, road2.points[0].y)
        this.road2.lineTo(road2.points[1].x, road2.points[1].y);
        // // //curve road 3
        this.road3 = new Phaser.Curves.Path(road3.points[0].x, road3.points[0].y)
        this.road3.ellipseTo(road3.ellipse.x, road3.ellipse.x, road3.ellipse.startAngle, road3.ellipse.endAngle, 
            false, road3.ellipse.rotation);
        this.road3.lineTo(road3.points[1].x, road3.points[1].y);
    }

    addRoadImage() {
        const roadsData = this.allData.roadImages;
        roadsData.forEach(road => {
            if (road.type === "straight") {
                const straightRoadSprite = this.add.sprite(
                    road.x,
                    road.y,
                    "assets",
                    "straightRoad"
                );
                straightRoadSprite.setScale(road.scale);
                straightRoadSprite.rotation = Phaser.Math.DegToRad(road.rotation);
            } else if (road.type === "curve") {
                const curveRoadSprite = this.add.sprite(
                    road.x,
                    road.y,
                    "assets",
                    "curveRoad"
                );
                curveRoadSprite.setScale(road.scale);
                curveRoadSprite.flipY = road.flipY || false;
                curveRoadSprite.rotation = Phaser.Math.DegToRad(road.rotation);
            }
        });
    }
    addWinTable() {
        this.add.sprite(650, 380, "winAssets", "winTable").setScale(1.4);
        this.add.sprite(650, 200, "winAssets", "ribbon").setScale(1.4);
        this.add.text(595, 160, 'YOU WIN', { fontFamily: 'Fantasy', fontSize: '32px', color: '#FFFF00' });
        // setting
        this.trainAudio.stop()
        this.addEmptyStar();
        this.addStar();
        //
        this.addNextButton();
        this.addHomeButton(600,410);
        this.hideBackToMenuButton()
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
    addReloadButton() {
        this.reload = this.add.sprite(580, 398, "assets", "nextNormal").setInteractive().setScale(0.8);
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
    addHomeButton(_x,_y) {
        this.homeButton = this.add.sprite(_x,_y, "assets", "pausedNormal").setInteractive();
        this.homeButton.on('pointerover', () => { this.setButtonEvent(this.homeButton, "pausedHover"); }, this);
        this.homeButton.on('pointerout', () => { this.setButtonEvent(this.homeButton, "pausedNormal"); }, this);
        this.homeButton.on('pointerdown', this.clickHomeButton, this);
        this.homeButton.on('pointerup', () => { this.setButtonEvent(this.homeButton, "pausedNormal"); }, this);
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
            this.table=false
            return
        }
        setTimeout(()=>{
              var nextLevel="level"+(this.level+1)
              this.scene.start(nextLevel)
              this.table=false
        },1000)
    }
    clickHomeButton(){
        this.clickButtonAudio.play()
        this.homeButton.setFrame("pausedClick")
            setTimeout(()=>{
                this.scene.start("chooseLevelMenu")
                this.table=false
        },1000)
    }
    addBackToMenuButton() {
        this.backToMenu = this.add.sprite(1200, 60, "assets", "normalButton").setInteractive().setScale(0.75);
        this.backToMenuText= this.add.text(1137, 45, 'Back To Menu', { fontFamily: 'Fantasy', fontSize: '22px' });
        this.backToMenu.on('pointerover', () => { this.setButtonEvent(this.backToMenu, "normalHover"); }, this);
        this.backToMenu.on('pointerout', () => { this.setButtonEvent(this.backToMenu, "normalButton"); }, this);
        this.backToMenu.on('pointerdown', this.clickBackToMenuButton, this);
        this.backToMenu.on('pointerup', () => { this.setButtonEvent(this.backToMenu, "normalButton"); }, this);
    }
    hideBackToMenuButton(){
        this.backToMenu.visible=false;
        this.backToMenuText.visible=false;
    }

    clickBackToMenuButton(){
        this.clickButtonAudio.play()
        this.backToMenu.setFrame("normalClick")
        setTimeout(() => {
            this.scene.start("chooseLevelMenu")
        }, 500);
    }
    addLoseTable() {
        this.add.sprite(650, 380, "winAssets", "winTable").setScale(1.4);
        this.add.sprite(650, 200, "winAssets", "ribbon").setScale(1.4);
        this.add.text(595, 160, 'YOU LOSE', { fontFamily: 'Fantasy', fontSize: '32px', color: '#FFFF00' });
        this.addReloadButton()
        this.addHomeButton(720,400)
        this.hideBackToMenuButton()
    }
    setButtonEvent(_button,_frame){
        _button.setFrame(_frame);
    }
    update() {
        this.graphics.clear();
        this.addBackgroundNavigation()
        this.graphics.lineStyle(2, 0xffffff, 1)
      //  this.drawRoad()       
        this.updateRoadToMove()
        this.logicOfGame()
       
    }
    logicOfGame(){
        if(!this.lose&&!this.win){
            if (!this.trainAudio.isPlaying) {
                this.trainAudio.play()
            }

            this.moveObject(this.follower,this.follower2,this.follower3,this.road,this.road2,this.road3,this.train,this.speed,false)
            this.updateRoadToMove()
            this.moveObject(this.followerContainer,this.followerContainer2,this.followerContainer3,this.road,this.road2,this.road3,this.container,this.speed,true)
        }
        if(this.follower3.t >=1){
            this.win=true
        }
        if(this.follower2.t >=0.5){
            this.lose=true
        }
        if(this.win){
            if(!this.table){
                this.addWinTable();
                this.table=true
            }
            return
        }
        if(this.lose){
            if(!this.table){
                this.loseAudio.play()
                this.trainAudio.stop()
                setTimeout(()=>{
                    this.addLoseTable()
                    this.table=true
                 },100)
            }
        }
    }
    moveObject(_follower,_follower2,_follower3, _road,_road2,_road3,_object,_speed,_container) {
        if (_follower.t <= 1) {
            _follower.t = this.moveToRoad(_road,_object, _follower, _speed)
        }
        if (this.curveRoad && _follower.t >= 1) {
            var delta=0.9 
            if(_container)
                delta=0.85
            this.moveToRoad(_road3, _object, _follower3, _speed * delta)
        }
        if (this.straightroad2 && _follower.t >= 1) {
            this.moveToRoad(_road2, _object, _follower2, _speed* 0.7)
        }
    }

    updateRoadToMove(){
        if(this.follower.t>=0.8&&this.follower2.t<0.3&&this.follower3.t==0)//||this.follower2.t<=0.3)
            return
        if(this.follower.t>=0.8&&this.follower3.t<0.3&&this.follower2.t==0)//||this.follower2.t<=0.3)
            return
        if( this.downbtn.isDown()){
            if (this.follower.t < 1) {
                this.straightroad2=false;
                this.curveRoad=true;
                this.containerRiding=true;
            }
            this.downbtn.body.visible=false;
            this.leftbtn.body.visible=true;         
        }
        if(this.leftbtn.isDown()){
            if (this.follower.t < 1) {
                this.straightroad2=true;
                this.curveRoad=false;
              //  this.containerRiding=true;
            }
            this.downbtn.body.visible=true;
            this.leftbtn.body.visible=false; 
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
        this.road.draw(this.graphics)
        this.road2.draw(this.graphics)
        this.road3.draw(this.graphics)
    }
}
