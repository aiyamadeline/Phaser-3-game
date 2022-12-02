import Phaser, { Game } from "phaser";
import CountdownController from './CountdownController'

let player;
let cursors;
let text;
let timedEvent;
let bullSprite;
let timer;
let image;
let scaleX;
let scaleY;
let scale;
let platforms;
let map;
let tileset
let boxes;
let camera2;
let speed1;


const myGame = new Game({
    type: Phaser.AUTO,
    width: 850,
    height: 695,
    physics: {
      default: 'arcade',
      arcade: { 
        gravity: { y: 300 },
        debug: true, 
      },
    },

    scene: {
      preload() {
        // Code that needs to run before the game is on the screen
        this.load.spritesheet("bull", "./assets/bull-image.png", {frameWidth: 290, frameHeight: 290});
        this.load.spritesheet("bull-left", "./assets/bull-left.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("player", "./assets/sprite-sheet.png", {frameWidth: 55, frameHeight: 55});
        this.load.image("background", "./assets/background.png");
        // this.load.image("floor", "./assets/floor1.png")
        // this.load.tilemapTiledJSON("tilemap", "./assets/floor1.tsj")
        this.load.image("box", "./assets/box.png");

        cursors = this.input.keyboard.createCursorKeys();

        
        
        
      },
      create(){
        // Code that runs as soon as the game is on the screen
        
        // make image fit entire screen
        image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "background");
        scaleX = this.cameras.main.width / image.width
        scaleY = this.cameras.main.height / image.height
        scale = Math.max(scaleX, scaleY);
        image.setScale(scale); 
        
        bullSprite = this.add.sprite(-150, 300, "bull");
        this.physics.add.existing(bullSprite);
        bullSprite.setOrigin(0,0);
        bullSprite.setX(this.sys.game.width);
        bullSprite.setX(this.sys.game.height);
         
        player = this.add.sprite(-150 ,300, "player");
        this.physics.add.existing(player);
        player.setOrigin(0,0);
        
        
        
        
        
        bullSprite.body.setBounce(0);
        bullSprite.body.setCollideWorldBounds(true);
        bullSprite.playAfterDelay("bull", 4000)

        player.body.setBounce(0.5);
        player.body.setCollideWorldBounds(true);

        // for ( let i = 0; i < 150; i++){
        //   boxes = this.add.sprite(this.world.randomX, this.world.randomY,
        //   'box');
        // }
        
        
      
        boxes = this.physics.add.image(-150, 300, "box");
        boxes.setImmovable(true);
        boxes.setOrigin(1,1);
        this.physics.add.collider(boxes, player)

        // this.camera2 = this.cameras.add(20, 20, 20, 260)
        //     .setOrigin(0)
        //     .setScroll(20, 20)
        //     .setBounds(150 - image.width / 2, 150 - image.height / 2, image.width, image.height);

        // //main camera ignores image to get the frame effect
        // this.cameras.main.ignore(image);
        
        // //bring main camera to the top
        // this.cameras.cameras.push(this.cameras.cameras.shift());

        // const width = this.scale.width
        // const height = this.scale.heoght

        // this.add.image(width * 0.5, height * 0.5, 'background')
        //     .setScrollFactor(0.25)
  
        this.anims.create({
          key: "right",
          frameRate: 10,
          repeat: -1,
          frames: this.anims.generateFrameNames("player",{ start: 1, end: 8})
        });
        this.anims.create({
          key: "left",
          frameRate: 10,
          frames: this.anims.generateFrameNames("player", { start: 41, end: 48})
        });
        this.anims.create({
          key: "up",
          frameRate: 10,
          repeat: -1,
          frames: this.anims.generateFrameNames("player", { start: 9, end: 16})
        })


        
        // this.physics.add.collider(player, platforms);
        // this.physics.add.collider(bullSprite, platforms);

        // this.physics.add.overlap(player, bullSprite, null, this);

        



        // text = this.add.text(32, 32);


        // timedEvent = this.time.addEvent({ delay: 2000, callback: onEvent, callbackScope: this });
        //timedEvent = this.time.delayedCall( 3000, onEvent, [], this);

      },
      update(){
       // Code that runs for every frame rendered in the browser
        
       bullSprite.body.setVelocityX(160)

        if(cursors.right.isDown) {
          player.body.setVelocityX(160);
          player.anims.play("right", true);
          
          

        } else if (cursors.left.isDown){
          player.body.setVelocityX(-160);
          player.anims.play("left", true);
          

        } else if (cursors.up.isDown){
          
          player.body.setVelocityY(-300);
          player.anims.play("up", true);
        
        
        }  else {
            player.body.setVelocityX(0);
            player.body.setVelocityY(0);
            player.anims.play("right", false);
            player.anims.play("left", false);
            player.anims.play("up", false);
        }
        
        
        bullSprite.body.setVelocityX(160)

      //  const didpressJump = Phaser.Input.Keyboard.JustDown(cursors.up.isDown);

       // player can ony double jump if the player just jumped
      //  if (didpressJump) {
      //   if(player.body.onFloor()) {
      //     // player can only double jump if it is on the floor
      //     this.canDouble = true;
      //     player.body.setVelocityY(-100);
      //   } else if (this.canDoubleJump) {
      //     // player can only jump x2 (double jump)
      //     this.canDoubleJump = false;
      //     player.body.setVelocityY(-100);

      //   }
      //  }
        
      }
  },
});


