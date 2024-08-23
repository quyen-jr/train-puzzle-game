class Button{
  constructor(scene,assets,img,x,y,scale,scrollFactor,isCircle){
  //  console.log(this.audio)
    this.scene = scene
    this.img=img 
    this.x=x/100*config.width
    this.y=y/100*config.height
    this.xp=x
    this.yp=y
    this.scale=scale
    this.scrollFactor=scrollFactor
    this.isCircle=isCircle
    this.touchUp=false
    this.touchDown=false
    this.assets=assets
    this.body=this.scene.add.sprite(this.x,this.y,this.assets,this.img) .setScale(this.scale).setScrollFactor(this.scrollFactor) 
  //  this.body.x=this.y
  //  this.body.x=this.x
//    this.body.setPosition(128, 256);
    
  //  console.log(this.body)
    if(this.isCircle){
      this.shape = new Phaser.Geom.Circle(46, 45, 45)
      this.body.setInteractive(this.shape,Phaser.Geom.Circle.Contains);
    }else this.body.setInteractive()
    this.body.on('pointerover',()=>{
      this.body.setTint(0x7878ff);
    },this.scene);
    this.body.on('pointerout',()=>{

      this.body.clearTint();
    }
    ,this.scene);  
    this.body.on('pointerdown',()=>{
     // this.audio.play()
      this.touchDown=true 
      this.touchUp=false
      this.body.setTint("0xff00ff");
    },this.scene);
    this.body.on('pointerup',()=>{
      this.touchUp=true 
      this.touchDown=false
      this.body.clearTint();
    },this.scene);
  }
  isUp(){
   if(this.touchUp){
      this.touchUp=false
      return true 
    }else return false  
  }
  isDown(){
    if(this.touchDown){
      this.touchDown=false
      return true 
    }else return false 
  }
  update(){
  
  }
  
}