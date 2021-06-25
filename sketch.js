var path,cyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,bell;

var pinkCG, yellowCG,redCG; 
var restart;
var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart, restartImg;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  bell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("Flat_restart_icon.svg.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
cyclist  = createSprite(70,150);
cyclist.addAnimation("SahilRunning",mainRacerImg1);
cyclist.scale=0.07;
  
//set collider for cyclist
cyclist.setCollider("circle",0,0,700);
  
gameOver = createSprite(380,130);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.9;
gameOver.visible = false;  
  
restart=createSprite(380,210);
restart.addImage(restartImg);
restart.scale=0.15;
restart.visible=false;

  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    if (mouseY === redCG.y) {
      bell.play();
    }else if (mouseY === pinkCG.y) {
      bell.play();
    }else if (mouseY === yellowCG.y) {
      bell.play();
    }
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   cyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   cyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyWentDown("space")) {
    bell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkcyclists();
    } else if (select_oppPlayer == 2) {
      yellowcyclists();
    } else {
      redcyclists();
    }
  }
  
   if(pinkCG.isTouching(cyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(cyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(cyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    restart.visible=true;
  
    path.velocityX = 0;
    cyclist.velocityY = 0;
    cyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    if (mousePressedOver(restart)) {
      reset();
    }
    
}
}

function pinkcyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        bell.play();
        pinkCG.add(player1);
}

function yellowcyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        bell.play();
        yellowCG.add(player2);
}

function redcyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        bell.play();
        redCG.add(player3);
}

function reset() {
    gameState=PLAY;
    restart.visible=false;
    gameOver.visible=false;
    cyclist.addAnimation("SahilRunning",mainRacerImg1);
    pinkCG.destroyEach();
    redCG.destroyEach();
    yellowCG.destroyEach();
    distance=0;
}






