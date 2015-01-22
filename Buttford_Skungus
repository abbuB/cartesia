/*
    TO DO: âˆš â—¦
      â—¦  implement areas to hide
      â—¦  collison logic
      â—¦  
*/
// implement different sorts
frameRate(30);
var DEBUG=false;
var HIT_DISTANCE=50;

var scaleFactor=4;
scale(1/scaleFactor, 1/scaleFactor);

var MAX=width*scaleFactor;

var values={score: 0,  game: 10,
            leafs:10, health: 5,
            enemies: 1, goals:5,
            obstacles: 10 };
            
var border=0;

var keys=[];

var levels=[], leaves=[], enemies=[],
    goals=[], ordinance=[], obstacles=[];

var imgSkungus = getImage("avatars/robot_female_3"),
    enemy = getImage("avatars/purple-pi"),
    heart = getImage("space/healthheart"),
    leaf = getImage("avatars/leaf-green"),
    chest = getImage("cute/ChestClosed"),
    chestOpen = getImage("cute/ChestOpen"),
    key=getImage("cute/Key"),
    imgObstacle = getImage("avatars/spunky-sam"),
    collision = getImage("space/collisioncircle");

var skungus = { x: MAX/2-imgSkungus.width/2,
                y: MAX/2-imgSkungus.height/2,
                width: imgSkungus.width,
                height: imgSkungus.height};

//  Nicknames for space constraints
var sk=skungus,  g=goals,  l=leaves, e=enemies,
    o=obstacles, v=levels;

var gameOver=false;
var victorious=false;

heart.width/=2;
heart.height/=2;

key.width*=5/8;
key.height*=5/8;

var win = function() {

};
var lose = function() {

    gameOver=true;
    victorious=false;
    var restart="For additional humiliation, click restart";
    var lose0="Buttford mocks you!";
    var lose1="Perhaps you should go have a lie down?";
    var lose2="";

    fill(255, 255, 255, 5);
    rect(0, 0, MAX, MAX);

    //var font = ;
    //textFont(createFont("fantasy", 20), 200);
    fill(46, 115, 0);

    textSize(scaleFactor*30);

    text(lose0, border*scaleFactor, MAX/4);

    textSize(scaleFactor*20);

    text(lose1,   border*scaleFactor, MAX/3);         
    text(lose2,   border*scaleFactor, MAX/3+100);    
    text(restart, border*scaleFactor, MAX-scaleFactor*20);

    //finalFrame();

};

var drawSkungus=function(){

    //image(imgSkungus, constrain(sk.x,   0, MAX),
    //                  constrain(sk.y, 100, MAX));

    image(imgSkungus, sk.x, sk.y);
                      
    var w=sk.width, h=sk.height;

    if(DEBUG){
        ellipse(sk.x,     sk.y,     10, 10);
        ellipse(sk.x + w, sk.y,     10, 10);
        ellipse(sk.x + w, sk.y + h, 10, 10);
        ellipse(sk.x,     sk.y + h, 10, 10);
    }

};
var drawHealth=function(){

    for(var n=1; n<=values.health; n++){
        image(heart, MAX-n*heart.width * 1.05-25, 25);
    }
    
};
var drawKeys=function(){
    
    for(var m=1; m<=values.goals; m++){
        image(key, MAX/2-m*key.width, 50-key.height/2);
    }
    
};
var calculateScore=function(){

    values.score=0;

    for(var n=0; n<leaves.length; n++){
        if (leaves[n].alive===false){ values.score+=10; }
    }

};
var drawHeader=function(){

    fill(0);
    rect(0,0,MAX, 100);

    fill(255, 255, 255);
    textSize(12*scaleFactor);

    text("Score: " + values.score, 25,70);

    if(DEBUG){

        fill(48);
        text(l.length + ":  " +
        round(l[l.length-1].x) + " : " +
        round(l[l.length-1].y), 100, 1275);
        text("x: " + sk.x, 100, 1350);
        text("y: " + sk.y, 100, 1425);
    }

    drawHealth();
    drawKeys();

};
var createObstacles=function(){

    var margin=imgObstacle.width*2;

    for (var n=0; n<values.obstacles; n++){
        
        var X=random(margin, MAX-margin);
        var Y=random(margin, MAX-margin);
        
        o.push({ x: X,
                 y: Y,
                 width: random(50,150),
                 height: random(50,150),
                 centerX: X+width/2,
                 centerY: Y+height/2});
    }

};
var drawObstacles=function(){

    var s=10;
    
    for (var n=0; n<values.obstacles; n++){        
        
        fill(79, 79, 79);
        rect(o[n].x, o[n].y, o[n].width, o[n].height);

        if(DEBUG){
            ellipse(o[n].x, o[n].y, s, s);
            ellipse(o[n].x + o[n].width, o[n].y, s, s);
            ellipse(o[n].x + o[n].width, o[n].y + o[n].height, s, s);
            ellipse(o[n].x, o[n].y+o[n].height, s, s);
        }
    }

};
var createGoals=function(){

    var margin=chest.width*2;

    for (var n=0; n<values.goals; n++){
        
        var X=random(margin, MAX-margin);
        var Y=random(margin, MAX-margin);
        
        g.push({ x: X,
                 y: Y,
                 width: chest.width,
                 height: chest.height,
                 centerX: X+chest.width/2,
                 centerY: Y+chest.height/2,
                 reached: false});
    }

};
var drawGoals=function(){

    var s=10;

    fill(0, 0, 255);
    
    for (var n=0; n<values.goals; n++){        

      if(g[n].reached) { image(chestOpen, g[n].x, g[n].y); }
      else             { image(chest, g[n].x, g[n].y);     }

        if(DEBUG){
            ellipse(g[n].x, g[n].y, s, s);
            ellipse(g[n].x + g[n].width, g[n].y, s, s);
            ellipse(g[n].x + g[n].width, g[n].y + g[n].height, s, s);
            ellipse(g[n].x, g[n].y+g[n].height, s, s);
        }
    }

};
var createLeaves=function(){

    var margin=skungus.width;

    for (var n=0; n<values.leafs; n++){
        
        var X = random(margin, MAX-margin);
        var Y = random(margin, MAX-margin);
        
        leaves.push({ x: X,
                      y: Y,
                      width: leaf.width,
                      height: leaf.height,
                      centerX: X+leaf.width/2,
                      centerY: Y+leaf.height/2,
                      alive: true});
    }

};
var drawLeaves=function(){

    var s=10;

    for (var n=0; n<leaves.length; n++){

        if(leaves[n].alive===true){

            //text(round(random(1,144)), leaves[n].x, leaves[n].y);
            image(leaf, leaves[n].x, leaves[n].y);

            if(DEBUG){
            
            ellipse(l[n].x, l[n].y, s, s);
            ellipse(l[n].x + l[n].width, l[n].y, s, s);
            ellipse(l[n].x + l[n].width, l[n].y + l[n].height, s, s);
            ellipse(l[n].x, l[n].y + l[n].height, s, s);
            
            }

        }
    }

};

var direction=1;
var increment=3;

var createEnemies=function(){

    var margin=skungus.width;

    for (var n=0; n<values.enemies; n++){

        var X = random(margin, MAX-margin);
        var Y = random(margin, MAX-margin);
        
        e.push({ x: X,
                 y: Y,
                 width: enemy.width,
                 height: enemy.height,
                 centerX: X+enemy.width/2,
                 centerY: Y+enemy.height/2,
                 alive: true});
    }

};
var drawEnemies=function(){

    var s=10;
    
    for (var n=0; n<enemies.length; n++){

        image(enemy, enemies[n].x, enemies[n].y);

        if(DEBUG){
            ellipse(e[n].x, e[n].y, s, s);
            ellipse(e[n].x + e[n].width, e[n].y, s, s);
            ellipse(e[n].x + e[n].width, e[n].y + e[n].height, s, s);
            ellipse(e[n].x, e[n].y + e[n].height, s, s);
        }
            
        if(dist(skungus.x, skungus.y,
                enemies[n].x, enemies[n].y)<75){

            values.health--;
            skungus.x+=100;
            skungus.y+=100;

            if (values.health===0){
                gameOver=true;
                victorious=false;
            }

        }
    }

};
var collectLeaves=function(){

    for (var n=0; n<l.length; n++){

        if(dist(sk.centerX, sk.centerY,
                l[n].centerX, l[n].centerY) < HIT_DISTANCE){
            l[n].alive=false; }

    }

};
var collectKey=function(){

    for (var n=0; n<goals.length; n++){

        if(dist(sk.centerX, sk.centerY,
                goals[n].centerX, goals[n].centerY) < HIT_DISTANCE){
            goals[n].reached=true; }

    }

};

var keyPressed = function()  { keys[keyCode] = true; };
var keyReleased = function() { keys[keyCode] = false; };

var DIRECTION = {UP:87, DOWN:83, LEFT:65, RIGHT:68 };

var fire=function(dir){

    switch (dir){

    case DIRECTION.UP:   text(DIRECTION.UP,   100,300);break;
    case DIRECTION.DOWN: text(DIRECTION.DOWN, 100,300);break;
    case DIRECTION.LEFT: text(DIRECTION.LEFT, 100,300);break;
    case DIRECTION.RIGHT:text(DIRECTION.RIGHT,100,300);break;

    }

};

var xv = 0;
var yv = 0;
var speed=1.5;

var moveSkungus=function(){

    var minX=10+border;
    var maxX=MAX-sk.width-10;
    var minY=100;
    var maxY=MAX-sk.height-30;

    if (keys[32])    { speed=2.5;  }
    else             { speed=1.25; }

    //for(var n=0; n<obstacles.length; n++){
        
        //  Contact with borders
        if(sk.x>maxX){ speed=0; sk.x-=1;   }
        if(sk.x<minX){ speed=0; sk.x+=1; }
        if(sk.y<minY){ speed=0; sk.y+=1; }
        if(sk.y>maxY){ speed=0; sk.y-=1; }
    
        //  Move Buttons
        if (keys[DIRECTION.UP])    { yv-=speed; }   //  w
        if (keys[DIRECTION.DOWN])  { yv+=speed; }   //  s
        if (keys[DIRECTION.LEFT])  { xv-=speed; }   //  a
        if (keys[DIRECTION.RIGHT]) { xv+=speed; }   //  d
    
        sk.x+=round((xv*=0.9));
        sk.y+=round(yv*=0.9);
        
        sk.centerX = sk.x + sk.width/2;
        sk.centerY = sk.y + sk.height/2;
        
        //  Fire Buttons
        //if (keys[UP])   { fire(DIRECTION.UP); }
        //if (keys[DOWN]) { fire(DIRECTION.DOWN); }
        //if (keys[LEFT]) { fire(DIRECTION.LEFT); }
        //if (keys[RIGHT]){ fire(DIRECTION.RIGHT); }
    //}
        
    collectLeaves();
    collectKey();

};

var moveEnemies=function(){

    var step=25;

    for(var n=0; n<values.enemies; n++){

      step=random(1, 2);

      if (sk.x>e[n].x){ e[n].x+=step; } else { e[n].x-=step; }
      if (sk.y>e[n].y){ e[n].y+=step; } else { e[n].y-=step; }
    
      e[n].centerX = e[n].x + e[n].width/2;
      e[n].centerY = e[n].y + e[n].height/2;
      
    }

};

var drawBorders=function(){

    noStroke();
    fill(164);

    var h=height*scaleFactor;
    var w=width*scaleFactor;

    //  Left            //  Bottom
    rect(0, 0, 20, h);  rect(0, h-20, w, 20);

    // Right
    rect(w-20, 0, 20, h/2-100);
    rect(w-20, h/2+100, 20, h/2-100);

    // Top
    //rect(0, 100, w, 20);
    var LEVEL_COMPLETE=true;
    
    //  Gate
    if(LEVEL_COMPLETE) { fill(255,0,0); }
    else               { fill(164);     }
    
    rect(w-20, w/2-100, 20, 200);

};

/* ---------- Set Initial Conditions ---------- */
createLeaves();
createEnemies();
createGoals();
createObstacles();

var initialize=function(){

    background(227, 186, 61);

    drawBorders();

    drawGoals();
    drawLeaves();
    drawEnemies();

    
    drawSkungus();
    drawObstacles();
    calculateScore();

    drawHeader();

};

var levelUp=function(){

    for(var n=0; n<1000; n++){
        translate(-n,0);
    }

};

//var n=10;

var draw = function () {

    if(gameOver===false){ 

        initialize();

        moveEnemies();
        moveSkungus();

    }
    else{

        //translate(-n,0);

        strokeWeight(5);
        stroke(43, 168, 112);
        rect(1600,0,1600,1600);

        initialize();

        //if (n<width*scaleFactor+100){
            //n+=5;
        //}

    }

    println(sk.x + "," + sk.y);

};
