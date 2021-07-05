var path,mainCyclist, over, player1;
var pathImg,mainRacerImg1,mainRacerImg2, overImg,fruitsGroup, cycleRing, fruity, fruity2,fruity3,fruit4, opponentImg;

var END =0;
var PLAY =1;
var gameState = PLAY;
var pinkCG;
var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  oppPinkImg= loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png")
  opponentImg= loadAnimation("images/mainPlayer3.png");
  overImg= loadImage("gameover.png");
  cycleRing= loadSound("sound/bell.mp3");
  fruity= loadImage("fruit1.png");
  fruity2= loadImage("fruit2.png");
  fruity3= loadImage("fruit3.png");
  fruity4= loadImage("fruit4.png");
}

function setup(){
  
createCanvas(displayWidth,displayHeight);
  fruitsGroup=new Group();
// Moving background
path=createSprite(displayWidth/2,displayHeight/2);
path.addImage(pathImg);

over = createSprite(displayWidth/2-60,displayHeight/2-50,10,10);
  over.addImage(overImg);
  over.scale=2.5;
//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.addAnimation("SahilFall",mainRacerImg2);
mainCyclist.scale=0.15;
  
  
  pinkCG= new Group();
  
  
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(40);
  fill(0);
  textFont("Comic")
  text("Distance: "+ distance,350,30);
  
  
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
  distance= distance+ Math.round(getFrameRate()/60);
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  path.velocityX = -(Math.round(5+distance/100));

  camera.position.x=width/2;

  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    if(keyDown("space")){
      cycleRing.play();
    }
    
    if(pinkCG.isTouching(mainCyclist)||fruitsGroup.isTouching(mainCyclist)){
    gameState= "end";
  }
  over.visible=false;
    if(World.frameCount%150===0){
  createPink();
  }
    createObstacles();
 }
  
  if(gameState==="end"){
    
    path.velocityX=0;
    pinkCG.setVelocityXEach(0);
   mainCyclist.changeAnimation("SahilFall",mainRacerImg2);
   player1.changeAnimation("OpponentFall",opponentImg);
    distance =0;
    fruitsGroup.setVelocityXEach(0);
    over.visible=true;
    fruitsGroup.setLifetimeEach(-2);
    if(keyWentDown("UP_Arrow")){
      reset();
    }
    
  }
  mainCyclist.debug=true;
  mainCyclist.setCollider("circle",10,10,20);
  
}

function createPink(){
  player1 = createSprite(370,Math.round(random(50,displayHeight-50)),10,10);
  player1.scale=0.15;
  player1.velocityX= -(Math.round(4+distance/100));
  player1.addAnimation("opponent_1",oppPinkImg);
  player1.setLifetime=150;
  player1.addAnimation("OpponentFall",opponentImg);
  pinkCG.add(player1);
  
}
function createObstacles(){
  if(frameCount%100===0){
    var rand= Math.round(random(100,displayHeight-50));
    var fruit= createSprite(490,rand,10,10);
    fruit.velocityX=-( Math.round(5+distance/100));
    var rand2= Math.round(random(1,4))
    switch(rand2){
      case 1: fruit.addImage(fruity);
        break;
        case 2: fruit.addImage(fruity2);
        break;
        case 3: fruit.addImage(fruity3);
        break;
        case 4: fruit.addImage(fruity4);
        break;
        default: break;
    }
    
    fruit.scale=0.37;
    fruit.lifetime=98;
    fruitsGroup.add(fruit);
  }
}



function reset(){
  over.visible= false;
  fruitsGroup.destroyEach();
  pinkCG.destroyEach();
  gameState = PLAY;
}