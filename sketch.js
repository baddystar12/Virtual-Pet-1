var dog, happyDog, database, foodS, foodStock, dogImage, happyDogImage;

function preload(){
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(200, 200, 20, 20);
  dog.addImage(dogImage);
  dog.scale = 0.1;
  happyDog = createSprite(300, 300, 20, 20);
  happyDog.addImage(happyDogImage);
  happyDog.scale = 0.1;
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  fill("#ff177c");
  stroke("#50d4e6");
  textSize(15);
  text("Food stock:" +foodStock, 20, 400);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  } else{
    x = x-1
  }
  database.ref("/").update({
    Food:x
  })
}



