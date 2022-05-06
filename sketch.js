var trex, trex_running, edges;
var groundImage;
var PLAY = 1
var END = 0
var gamestate = PLAY
var score = 0

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1image = loadImage("obstacle1.png")
  obstacle2image = loadImage("obstacle2.png")
  obstacle3image = loadImage("obstacle3.png")
  obstacle4image = loadImage("obstacle4.png")
  obstacle5image = loadImage("obstacle5.png")
  obstacle6image = loadImage("obstacle6.png")
  restartimg = loadImage("restart.png")
  gameoverimg = loadImage("gameOver.png")
}

function setup() {
  var message = "SANVI IS AWESOME"
  createCanvas(600, 200);

  // creating trex
  trex = createSprite(50, 170, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  edges = createEdgeSprites();
  
  restart = createSprite(300,100)
  restart.addImage(restartimg)
  restart.scale = 0.4
  restart.visible = false

  gameover = createSprite(300,70)
  gameover.addImage(gameoverimg)
  gameover.scale = 0.4
  gameover.visible = false

  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  //creating ground sprite
  ground = createSprite(200, 170, 800, 5)
  ground.addImage("ground", groundImage)
  ground.velocityX = -5


  invisibleground = createSprite(200, 173, 800, 5)
  invisibleground.shapeColor = "white"

  obstaclesgroup = new Group()
  cloudsgroup = new Group()

  score = score+frameCount/60
}

function draw() {
  //set background color 
  background("white");

  //logging the y position of the trex
  

text("Score = ", score,550,50)


  //stop trex from falling down
  trex.collide(invisibleground)
  trex.setCollider("circle", 0,0,39.5)
  trex.debug = true


  if(gamestate == PLAY){
    spawnclouds()
    spawnobstacles()

      //jump when space key is pressed
  if (keyDown("space") && trex.y >= 146) {
    trex.velocityY = -8.2;
  }
  //add the gravity
  trex.velocityY = trex.velocityY + 0.4;

  if (ground.x < 0) {
    ground.x = 300
  }

  if(trex.isTouching(obstaclesgroup)){
    gamestate = END
  }
  }
  else if(gamestate == END){
    ground.velocityX = 0
    cloudsgroup.setVelocityXEach(0)
    obstaclesgroup.setVelocityXEach(0)
    trex.changeAnimation("collided", trex_collided)
    restart.visible = true
    gameover.visible = true
    trex.velocityY = 0

    if(mousePressedOver(restart)){
      reset()
    }

  }
  drawSprites();
}

function spawnclouds() {
  if (frameCount % 60 === 0) {
    clouds = createSprite(600, 100, 20, 10)
    clouds.velocityX = -5
    clouds.addImage("clouds", cloudImage)
    trex.depth = clouds.depth
    clouds.scale = 0.6
    clouds.y = Math.round(random(30,100))
    cloudsgroup.add(clouds)
  }
}  

function spawnobstacles(){
  if (frameCount % 40 === 0 ){
    obstacles = createSprite(600,150,20,10)
    obstacles.velocityX = -5
    obstacles.scale = 0.5
    var rand = Math.round(random(1,6))
    console.log(rand)
    switch(rand){
      case 1:obstacles.addImage("obstacles",obstacle1image) 
      break;
      case 2:obstacles.addImage("obstacles",obstacle2image)
      break;
      case 3:obstacles.addImage("obstacles",obstacle3image)
      break;
      case 4:obstacles.addImage("obstacles",obstacle4image)
      break;
      case 5:obstacles.addImage("obstacles",obstacle5image)
      break;
      case 6:obstacles.addImage("obstacles",obstacle6image)
      break;
      
    }
    obstaclesgroup.add(obstacles)
  }
}
function reset(){
gamestate = PLAY
console.log(gamestate)
gameover.visible = false
}