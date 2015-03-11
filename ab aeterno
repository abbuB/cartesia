/*
    ============================================================================
        double_slit.js
    ===========================================================================
*/
/* @pjs globalKeyEvents="true"; */
var diagrams = function(processingInstance){
  with (processingInstance){

  // size(window.innerWidth-10, window.innerHeight-10); // set size of canvas

  // √ ∛ ∜ ∝ ∞ ∟
  
  //  textFont(createFont("san-serif", 20), 32);
  //  textFont(createFont("serif", 20), 32);
  //  textFont(createFont("fantasy", 20), 32);
  //  textFont(createFont("monospace", 20), 32);
  //  textFont(createFont("cursive", 20), 32);

// *
// +stackoverflow.com
// +khanacademy.org
// +whatbadgenext.appspot.com/
// +codecogs.com/latex/eqneditor.php
// +youtube.com
// +mail.google.com
// +tube.geogebra.org/student/m762
// +bradsiemens.com
// +processingjs.org
// +processing.org
// +wikipedia.org
// +google.com
// +brm.io/matter-js-demo
// +w3schools.com
// +touchmathematics.org
// +desmos.com
// +github.com
// +emptyblack.com
// +redblobgames.com
// +dailymotion.com
// +pistolslut.com
// +latin-phrases.co.uk/quotes/beginning-end/

  angleMode="radians";

  // Constants =======================================================
  var CONSTANTS={

    DEGREES:  "°",
    PI:       "π",
    UP_ARROW: "▲",
    INFINITY: "∞",
    THETA:    "θ"

  };

  var QUADRANTS={

    ZERO:   0,
    ONE:    1,
    TWO:    2,
    THREE:  3,
    FOUR:   4,
    FIVE:   6
  };

  var CLRS={

    TRANSPARENT:  color(-1,-1,-1),

    RED:          color(170,29,29),       GREEN:        color(158,182,58),
    BLUE:         color(29,86,170),       YELLOW:       color(238,214,15),
    ORANGE:       color(238,136,15),      GRAY:         color(128,128,128),

    BROWN:        color(155,145,135),

    control:      color(128,128,128),     controlF:     color(242,242,242),

    TEXT:         color(255,255,255),

    Red:          color(255,0,0),         RedOrange:    color(255,81,0),
    Orange:       color(255,127,0),       YellowOrange: color(255,190,0),
    Yellow:       color(255,255,0),

    YellowGreen:  color(192,255,0),
    Green:        color(0,255,0),         BlueGreen:    color(0,127,127),
    Blue:         color(0,0,255),         BlueViolet:   color(92,0,255),

    Violet:       color(127,0,255),       RedViolet:    color(191,0,127),

    GRAY1:        color(255*10/11),       GRAY2:        color(255*9/11),
    GRAY3:        color(255*8/11),        GRAY4:        color(255*7/11),
    GRAY5:        color(255*6/11),        GRAY6:        color(255*5/11),
    GRAY7:        color(255*4/11),        GRAY8:        color(255*3/11),
    GRAY9:        color(255*2/11),        GRAY10:       color(255*1/11),
    WHITE:        color(255,255,255),     BLACK:        color(0,0,0),

    BUTTONH:      color(16,16,16),        BUTTON:       color(24,24,24),

    GRID:         color(33,40,48),

    VERTEX:       color(255,255,0),
    VERTEXA:      color(255*6/11),
    LINE:         color(255*6/11),
    LINEA:        color(170,29,29),
    FILL:         color(255*7/11),
    FILLA:        color(255*7/11),

    RULER:        color(231,189,33),

    SELECTED:     color(0,0,255),
    HIT:          color(255,0,0),

    SIN:          color(170,29,29,255),   SIN_LT:       color(170,29,29,128),
    COS:          color(29,86,170,255),   COS_LT:       color(29,86,170,128),
    TAN:          color(238,214,15,255),  TAN_LT:       color(238,214,15,128),

    CSC:          color(238,136,15,255),  CSC_LT:       color(238,136,15,128),
    SEC:          color(158,182,58,255),  SEC_LT:       color(158,182,58,128),
    COT:          color(128,128,128,255), COT_LT:       color(128,128,128,128)

  };
  var DIRECTIONS={
    UP:         38,
    DOWN:       40,
    LEFT:       37,
    RIGHT:      39
  }
  var COMMANDS={

    SHIFT:      16,
    CONTROL:    17,
    ALT:        18,
    
    CAPSLK:     20,

    PGUP:       33,
    PGDN:       34,
    END:        35,
    HOME:       36,
    
    LEFT:       37,
    UP:         38,
    RIGHT:      39,
    DOWN:       40,

    // UPLEFT:     3837,
    // UPRIGHT:    3839,
    // DOWNLEFT:   4037,
    // DOWNRIGHT:  4039,

    F1:         112,
    F2:         113,
    F3:         114,
    F4:         115,
    F5:         116,
    F6:         117,
    F7:         118,
    F8:         119,
    F9:         120,
    F10:        121,
    F11:        122,
    F12:        123,
    NUMLK:      144,
    META:       157,
    INSERT:     155,
    
    PLAY:       4,
    INCREMENT:  5,
    DECREMENT:  6,
    RESET:      7,
    MENU:       8,

    CTRL:       17

  };
  
  // Utility =======================================================
  var getGUID=function(){

    // return year()   + ''  +
           // month()  + ''  +
           // day()    + ''  +
           // hour()   + ''  +
           // minute() + ''  +
           // second() + ''  +
           // millis() + ''  +
           // round(random(10e15));

    return random(10e15);

  };

  var getColor=function(clr, alpha){

    return color(red(clr), green(clr), blue(clr), alpha/100*255);

  };
  var hexToRGB=function(hexStr){
    
    // note: hexStr should be #rrggbb
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b =  hex & 0x0000ff;
    
    return color(r,g,b);

  };
  var hexToRGBA=function(hexStr,a){

    // note: hexStr should be #rrggbb
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b =  hex & 0x0000ff;
    
    return color(r,g,b,a);

  };

  var getFill=function(){
    
    var retval=round(random(1,6));

// println(retval);

    switch (retval){
      
      case 1:   return CLRS.Red;
      case 2:   return CLRS.Orange;
      case 3:   return CLRS.Yellow;
      case 4:   return CLRS.Green;
      case 5:   return CLRS.Blue;
      case 6:   return CLRS.Violet;

      // default:  return CLRS.BLUEGREEN;

    }
    
  };
  
  var app={
    
    debug:        true,

    background:   0,

    height:       window.innerHeight-20,
    width:        window.innerWidth-20,

    mouseX:       0,        mouseY:       0,
    originX:      0,        originY:      0,
    x:            200,      y:            200,

    ctrl:         false,    alt:          false,    shift:        false,
    left:         false,    right:        false,    center:       false,
    
    cellSize:     0,
    
    cellH:        0,        cellW:        0,
    
    rows:         0,
    COLS:         0,

    jumping:      0,

    border:       0,

    running:      true,

    // pressed:      false,

    speed:        5,
    accel:        1,

    scaleX:       90,       scaleY:   2,

    size:         40,
    offset:        0,
    
    active:       0,

    players:      [],
    obstacles:    [],
    enemies:      [],
    
    ctrls:        [],
    keys:         [],

    data:         [],
    
    grid:         []

  };

  var levels=[
              [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              ],
              [
                [1,0,0,0,0,0,0,0,0,1],
                [0,1,0,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,1,0,0],
                [0,0,0,1,0,0,1,0,0,0],
                [0,0,0,0,1,1,0,0,0,0],
                [0,0,0,0,1,1,0,0,0,0],
                [0,0,0,1,0,0,1,0,0,0],
                [0,0,1,0,0,0,0,1,0,0],
                [0,1,0,1,0,1,0,1,1,1],
                [1,0,1,0,1,0,1,0,1,1]
              ]
             ];

  var pt=function(x,y){
    this.x=x;
    this.y=y;
  };

  // Properties =======================================================
  var propC=function(i,p,x,y,w,h,r,k,v,c,g){

    this.i=i;     // guid
    this.p=p;     // parent

    this.x=x;     // left
    this.y=y;     // top
    this.w=w;     // width
    this.h=h;     // height
    this.r=r;     // radius

    this.k=k;     // hit cursor
    this.v=v;     // value
    this.c=c;     // command
    this.g=g;     // tag

  };
  var propL=function(fill, fillH, stroke, strokeH, weight, weightH){

    this.fill=fill;         // fill color
    this.fillH=fillH;       // fill color highlight

    this.stroke=stroke;     // stroke color
    this.strokeH=strokeH;   // stroke color highlight

    this.weight=weight;     // strokeWeight
    this.weightH=weightH;   // strokeWeight highlight

  };
  var propA=function(fill, fillH, alignX, alignY,  size,   sizeH){

    this.fill=    fill;     // text color
    this.fillH=   fillH;    // text color highlight
    this.alignX=  alignX;   // horizontal alignment
    this.alignY=  alignY;   // vertical alignment
    this.size=    size;     // text size
    this.sizeH=   sizeH;    // text size highlight

  };

  // Control ===========================================================
  // Controls =========================================================
  var control=function(c,l,a,ctrls){

    // controls properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.i=c.i;                 // guid
    this.parent=c.p;            // parent

    this.x=c.x;                 // left
    this.y=c.y;                 // top
    this.w=c.w;                 // width
    this.h=c.h;                 // height

    this.k=c.k;                 // hit cursor

    this.v=c.v;                 // value
    this.c=c.c;                 // command
    this.g=c.g;                 // tag


    // appearance properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.fill=l.fill;           // fill color
    this.fillH=l.fillH;         // fill color highlight
    this.stroke=l.stroke;       // stroke color
    this.strokeH=l.strokeH;     // stroke color highlight

    this.weight=l.weight;       // strokeWeight
    this.weightH=l.weightH;     // strokeWeight highlight


    // text properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.text=a.text;           // text caption

    this.tfill=a.fill;          // text color
    this.tfillH=a.fillH;        // text color highlight
    this.alignX=a.alignX;       // horizontal alignment
    this.alignY=a.alignY;       // vertical alignment
    this.size=a.size;           // text size
    this.sizeH=a.sizeH;         // text size highlight

    // misc properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.hit=false;             // mouse is over the control

    this.visible=true;          // is the control currently being displayed
    this.ctrls=ctrls;           // array of child controls

  };
  control.prototype.draw=function(){

    for(var c in this.ctrls){ this.ctrls[c].draw(); }

  };
  control.prototype.clicked=function(){

    if(this.hit && app.left){
    //   commands(this.c, this.g);
      for(var c in this.ctrls){ this.ctrls[c].clicked(); }
    }

  };
  control.prototype.clickedR=function(){
    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].clickedR(); }
    }
  };
  control.prototype.moved=function(x,y){

    // if(this.alignX===LEFT){

    //   if(app.mouseX>x+this.x && app.mouseX<x+this.x+this.w &&
    //     app.mouseY>y+this.y && app.mouseY<y+this.y+this.h){

    //     this.hit=true;
    //     app.focus=this.i;

    //   }
    //   else{
    //     this.hit=false;
    //   }

    // }
    // else if(this.alignX===CENTER){

    //   if(app.mouseX>=x+this.x-this.w/2 && app.mouseX<=x+this.x+this.w/2 &&
    //     app.mouseY>=y+this.y-this.h/2 && app.mouseY<=y+this.y+this.h/2){

    //     this.hit=true;
    //     app.focus=this.i;

    //   }
    //   else{
    //     this.hit=false;
    //   }

    // }
    // else if(this.alignX===RIGHT){

    //   if(app.mouseX>x+this.x && app.mouseX<x+this.x+this.w &&
    //     app.mouseY>y+this.y && app.mouseY<y+this.y+this.h){

    //     this.hit=true;
    //     app.focus=this.i;

    //   }
    //   else{
    //     this.hit=false;
    //   }

    // }
    // else{}

    for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x, y+this.y); }

  };
  control.prototype.dragged=function(){

    for(var c in this.ctrls){ this.ctrls[c].dragged(); }

  };
  control.prototype.pressed=function(){

    for(var c in this.ctrls){ this.ctrls[c].pressed(); }

  };
  control.prototype.released=function(){
    // this.hit=false;

    for(var c in this.ctrls){ this.ctrls[c].released(); }

  };
  control.prototype.typed=function(){

    for(var c in this.ctrls){ this.ctrls[c].typed(); }

  };
  control.prototype.over=function(){

    for(var c in this.ctrls){ this.ctrls[c].over(); }

  };
  control.prototype.out=function(){

    this.hit=false;
    for(var c in this.ctrls){ this.ctrls[c].out(); }

  };

  var button=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
  };
  button.prototype=Object.create(control.prototype);
  button.prototype.draw=function(){

    noFill();
    strokeWeight(0.75);

    var w=this.w;
    var h=this.h;

    var incr=18;

    var min=0;
    var max=360;

    fill(this.fill);
    stroke(this.stroke);
    
    if(this.hit){
      fill(this.fillH);
      stroke(this.strokeH);
    }

    rect(this.x, this.y, this.w, this.h);

  };

  button.prototype.clicked=function(){
    for(var c in this.ctrls){ this.ctrls[c].clicked(0,0); }
  };
  button.prototype.moved=function(x,y){

    if(mouseX>x+this.x &&
       mouseX<x+this.x+this.w &&
       mouseY>y+this.y &&
       mouseY<y+this.y+this.h){

      this.hit=true;

// println("hit");

      // for(var c in this.ctrls){ this.ctrls[c].moved(x,y); }

    }
    else{
      this.hit=false;
// println("miss");
    }

    // for(var c in this.ctrls){ this.ctrls[c].moved(x,y); }

  };
  button.prototype.dragged=function(x,y){

    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].dragged(); }
    }

  };
  button.prototype.pressed=function(){

    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].pressed(); }
    }

  };
  button.prototype.released=function(){

    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].released(); }
    }

  };
  button.prototype.typed=function(){

    // if(app.keys[KEYCODES.SPACE]){
    //   this.vertices=[];
    //   this.temp=0;
    // }

    // if(app.keys[KEYCODES.CONTROL] &&
    //   app.keys[KEYCODES.Z]){
    //   this.shapes.splice(this.shapes.length-1,1);
    //   process();
    // }

  };

  var obstacle=function(x,y,w,h){
    
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;

    this.points=[];

    this.left=0;
    this.right=0;
    this.top=0;
    this.bottom=0;

    this.fill=color(0,0,random(255),random(255));
    this.stroke=CLRS.GRAY;
    
    this.hit=false;

    //  Load points ----------
    
    // center
    this.points.push(new pt(this.x+this.w/2, this.y+this.h/2));
    
    // points
    this.points.push(new pt(x, y));
    this.points.push(new pt(x+w, y));
    this.points.push(new pt(x + w, y+h));
    this.points.push(new pt(x, y + w));
      
    // radius
    this.radius=round(dist(this.points[0].x, this.points[0].y,
                           this.points[1].x, this.points[1].y));
                           
  };
  obstacle.prototype=Object.create(control.prototype);
  obstacle.prototype.draw=function(){

    noFill();
    strokeWeight(0.75);

    var w=this.w;
    var h=this.h;

    var incr=18;

    var min=0;
    var max=360;

    fill(this.fill);
    stroke(this.stroke);
    
    if(this.hit){
      
      fill(192);
      stroke(192);

      pushMatrix();

        resetMatrix();

        textFont(createFont("monospace"));
          
        var offset=app.height;
        textAlign(LEFT,TOP);
        
        text("x:      " + this.x, this.x+this.w+5, offset-this.y-this.h);
        text("y:      " + this.y, this.x+this.w+5, offset-this.y-this.h+15);
        text("width:  " + this.w, this.x+this.w+5, offset-this.y-this.h+30);
        text("height: " + this.h, this.x+this.w+5, offset-this.y-this.h+45);

      popMatrix();

      fill(64,0,0);
      stroke(64,0,0);

    }

    // rect(this.x, this.y, this.w, this.h);
    
    strokeWeight(2);
    stroke(CLRS.BLUE);
    fill(CLRS.WHITE);
    
    beginShape();
    
      for(var n=1; n<this.points.length; n++){
        vertex(this.points[n].x, this.points[n].y);
      }
    
    endShape(CLOSE);
    
    fill(CLRS.RED);
    textAlign(CENTER,CENTER);
    textSize(24);

    // radius
    text(this.radius, this.points[0].x, this.points[0].y);
    stroke(CLRS.ORANGE);
    strokeWeight(1);
    noFill();
    ellipse(this.points[0].x, this.points[0].y, this.radius*2, this.radius*2);
    
  };
  obstacle.prototype.moved=function(x,y){

    if(x>this.x &&
       x<this.x+this.w &&
       y>this.y &&
       y<this.y+this.h){

      this.hit=true;

    }
    else{

      this.hit=false;

    }

  };
  obstacle.prototype.shit=function(x,y){
    
    if(x>this.x &&
       x<this.x+this.w &&
       y>this.y &&
       y<this.y+this.h){
         return true;
    }
    
    return false;

  };
  
  var displacement=5;
  

  var cell=function(index, row, col, points){

    // this.x=x;                 //  left
    // this.y=y;                 //  top

    // this.r=radius;            //  distance from center to a vertex
    
    this.index=index;
    
    this.row=row;             //  vertical coordinate
    this.col=col;             //  horizontal coordinate
    
    this.fill=getFill();
    
    // this.quadrant=0;

    this.vertices=points;

println(this.col + ", " + this.row);
    
    // var theta;
    
    // for(theta=0; theta<360; theta+=120){
      
    //   this.vertices.push(new pt(x + (radius-10) * cos(radians(theta)),
    //                             y + (radius-10) * sin(radians(theta))));
      
    // }

    // for(theta=0; theta<360; theta+=120){

    //   this.vertices.push(new pt(x + radius * cos(radians(theta)),
    //                             y + radius * sin(radians(theta))));

    // }
    
  };
  cell.prototype=Object.create(control.prototype);

  cell.prototype.draw=function(){
    
    var t=this;

    var Outline=function(){

      fill(255,0,0,5);
      stroke(128,0,0);
      strokeWeight(0.5);
      
      var v=0;
      
      if(t.hit){
        fill(128,0,0,20);
        stroke(255,0,0);
        strokeWeight(1);
      }
      
      //  Border --------------------------------------------------
      fill(t.fill);
      noStroke();

      beginShape();
      
        for(v=0; v<t.vertices.length; v++){
          
          
          vertex(t.vertices[v].x,
                 t.vertices[v].y);
  
        }
  
      endShape(CLOSE);

      // beginShape();
      
      //   for(v=t.vertices.length/2; v<t.vertices.length; v++){
          
          
      //     vertex(t.vertices[v].x,
      //           t.vertices[v].y);
  
      //   }
  
      // endShape(CLOSE);

    };
    
    var Vertices=function(){

      for(var v=0; v<t.vertices.length; v++){
  
        ellipse(t.vertices[v].x,
                t.vertices[v].y,
                3, 3);
  
        if(t.hit){
          line(t.x,             t.y,
               t.vertices[v].x, t.vertices[v].y);
        }
  
      }
      
    };
    
    var Origin=function(){
      
      fill(128);
      
      // Center --------------------------------------------------
      if(t.hit){
  
        ellipse(t.x, t.y, 3, 3);

      }

    };

    Outline();
    Vertices();
    // Quadrants();
    // Origin();
    
    fill(255);
    textAlign(CENTER,CENTER);
    textSize(app.size/4);
    // text(this.col + ", " + this.row, this.x, this.y);

  };

  cell.prototype.clicked  =function()   {
    for(var c in this.ctrls){ this.ctrls[c].clicked(0,0); }
  };
  cell.prototype.moved    =function(x,y){

    if(dist(mouseX,mouseY,this.x,this.y)<0.875*app.size){
      this.hit=true;
    }
    else if(dist(mouseX,mouseY,this.x,this.y)<app.size){
      this.hit=false;
    }
    else{
      this.hit=false;
    }

    // for(var c in this.ctrls){ this.ctrls[c].moved(x,y); }

  };
  cell.prototype.dragged  =function(x,y){

    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].dragged(); }
    }

  };
  cell.prototype.pressed  =function()   {

    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].pressed(); }
    }

  };
  cell.prototype.released =function()   {

    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].released(); }
    }

  };
  cell.prototype.typed    =function()   {

    // if(app.keys[KEYCODES.SPACE]){
    //   this.vertices=[];
    //   this.temp=0;
    // }

    // if(app.keys[KEYCODES.CONTROL] &&
    //   app.keys[KEYCODES.Z]){
    //   this.shapes.splice(this.shapes.length-1,1);
    //   process();
    // }

  };


  var telemetry=function(){

    app.ctrl  =app.keys[COMMANDS.CTRL];
    app.alt   =app.keys[COMMANDS.ALT];
    app.shift =app.keys[COMMANDS.SHIFT];

    if(app.telemetry){

      var offset=width-200;  // mouseX;

      fill(0,0,0,128);
      stroke(32);

      rect(offset+40, 10, 150, 380, 10);

      fill(192);
      textSize(12);

      textAlign(LEFT);

      // Labels
      text("mouseX:",    50+offset,   50);
      text("mouseY:",    50+offset,   70);

      text("Left:",      50+offset,  110);
      text("Right:",     50+offset,  130);
      text("Center:",    50+offset,  150);

      text("CTRL:",      50+offset,  190);
      text("ALT:",       50+offset,  210);
      text("SHIFT:",     50+offset,  230);

      text("Skungus",    50+offset,  270);
      text("x:",         50+offset,  290);
      text("y:",         50+offset,  310);

      text("jump:",      50+offset,  350);

      text("row Height:",50+offset,  370);
      text("col Widht:", 50+offset,  390);
      
      // Values
      fill(CLRS.YELLOW);

      text(mouseX,      150+offset,   50);
      text(mouseY,      150+offset,   70);
      
      text(app.left,    150+offset,  110);
      text(app.right,   150+offset,  130);
      text(app.center,  150+offset,  150);
      
      text(app.ctrl,    150+offset,  190);
      text(app.alt,     150+offset,  210);
      text(app.shift,   150+offset,  230);
      
      // text(app.players[app.active].x,        150+offset,  290);
      // text(app.players[app.active].y,        150+offset,  310);

      text(app.jumping, 150+offset,  350);
      
      text(app.cellH,    150+offset,  370);
      text(app.cellW,    150+offset,  390);

    }

  };
  
  var r=0;
  var ang=0;
  
  var drawCursor=function(){

    var p1=new pt(mouseX-10, mouseY);
    var p2=new pt(mouseX+10, mouseY);

    noStroke();
    fill(32,32,32,100);
      
    // if(frameCount%3===0){
      
      r=frameCount%30;  //  radius
      r*=2;
      
      if(frameCount%30===0){ ang=random(0,TWO_PI); }
      
    // }
    
    pushMatrix();
    
      // rotate(ang);
      
println(ang + " : " + degrees(ang));
      
      for(var n=1; n<20; n++){
        fill(32,32,32,21-n);
        ellipse(p1.x+r*cos(ang), p1.y+r*sin(ang), r+n, r+n);
        ellipse(p2.x+r*cos(ang), p2.y+r*sin(ang), r+n, r+n);
      }
    
    popMatrix();
    
  };
  
  app.cellSize=floor(app.height/24);

  var loadGrid=function(){

    var w=app.cellW;
    var h=app.cellH;
    var offset=5;

    var p1, p2,p3;
    var rowCells=[];
    var points=[];
    
    var index=0;
    
    for(var row=offset; row<app.rows; row++){

      for(var col=offset; col<app.cols; col++){

        if(row%2===0){

          if(col%2===0) {   p1=new pt(col*w/2,     row*h);
                            p2=new pt(col*w/2+w/2, row*h+h);
                            p3=new pt(col*w/2-w/2, row*h+h);
          }
          else          {   p1=new pt(col*w/2+w/2, row*h);
                            p2=new pt(col*w/2-w/2, row*h);
                            p3=new pt(col*w/2,     row*h+h);
          }
        }
        else{

          if(col%2===0) {   p1=new pt(col*w/2+w/2, row*h);
                            p2=new pt(col*w/2-w/2, row*h);
                            p3=new pt(col*w/2,     row*h+h);
            
          }
          else          {   p1=new pt(col*w/2,     row*h);
                            p2=new pt(col*w/2+w/2, row*h+h);
                            p3=new pt(col*w/2-w/2, row*h+h);  }
        }

        points.push(p1);
        points.push(p2);
        points.push(p3);

        rowCells.push(new cell(index, col, row, points));
        
        points=[];
        
        index++;

      }

      app.grid.push(rowCells);

      rowCells=[];

    }

  };
  
  var main=function(){

    // noFill();

// background(color(127,0,255));

    if(app.running){ background(CLRS.BLACK);  }
    else           { background(16);          }

    for(var row in app.grid){
      for(var col in app.grid){
        app.grid[col][row].draw(mouseX,mouseY);
      }
    }

    telemetry();

  };

  
  
  var process;
  var draw=function(){ process(); };

  // Events ===============================================================

  var mousePressed=   function(){

    if     (mouseButton===LEFT)   { app.left=true;   }
    else if(mouseButton===RIGHT)  { app.right=true;  }
    else if(mouseButton===CENTER) { app.center=true; }

  };
  var mouseReleased=  function(){

    if     (mouseButton===LEFT)   { app.left=false;   }
    else if(mouseButton===RIGHT)  { app.right=false;  }
    else if(mouseButton===CENTER) { app.center=false; }

  };
  var mouseMoved=     function(){

    for(var row in app.grid){
      for(var col in app.grid){
        app.grid[col][row].moved(mouseX,mouseY);
      }
    }


  };
  var mouseClicked=   function(){
    // for(var c in app.ctrls){ app.ctrls[c].clicked(mouseX,mouseY); };
    // app.running=!app.running;
  };
  var mouseOver=      function(){
    app.running=true;
    app.telemetry=true;
  };
  var mouseOut=       function(){
    app.running=false;
    app.telemetry=false;
  };

  var keyPressed=function(){

    for(var p in app.players){ app.players[p].keyPressed(keyCode); }

    app.keys[keyCode]=true;

// println(keyCode);

  };
  var keyReleased=function(){

    app.keys[keyCode]=false;

  };

  // Initialize ===============================================================

  var addControls=function(){

    var ctrls=[];

    var cn=new button(
            new propC("b1", 0, 0, 0, 50, app.height, 0, 1, false, 0, 0),
            new propL(CLRS.GRID, getColor(CLRS.GRID,65), CLRS.WHITE, CLRS.YELLOW, 0, 0),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    cn.ctrls=ctrls;
    
    app.ctrls.push(cn);

// println(app.ctrls.length);

  };
  
  var setDisplay=function(){
    
    // Set grid width
    app.unit=app.width/54;

    // Left pane
    app.paneLeftX=0;
    app.paneLeftY=0;

    app.paneLeftW=app.unit*20;
    app.paneLeftH=app.height;

    // Right pane
    app.paneRightX=app.unit*20;
    app.paneRightY=0;

    app.paneRightW=app.unit*34;
    app.paneRightH=app.height;

  };

  var initialize=function(){

    frameRate(60);

    // app.width=window.innerWidth-20;
    // app.height=window.innerHeight-20;
    
    app.originX=app.width/2;
    app.originY=app.height/2;

    // app.width=width;
    // app.height=height;
    
    
    // println(app.data[350][INDEX.COT]);

    size(app.width, app.height);

    setDisplay();

    // loadData();

    // addControls();

    app.ctrl  =app.keys[COMMANDS.CTRL]  =false;
    app.alt   =app.keys[COMMANDS.ALT]   =false;
    app.shift =app.keys[COMMANDS.SHIFT] =false;

    app.cellH=floor(height/24);
    app.cellW=floor((2*app.cellH)/tan(radians(60)));

    app.offset=pow( pow(app.size,2)-pow(app.size/2,2), 0.5);

    app.rows=floor(app.height/app.cellH);
    app.cols=floor(app.width/app.cellW);
  
    // var obs,x,y,w,h;

    // for(var n=0; n<20; n++){

    //   x=round(random(app.width));
    //   y=round(random(app.height));
    //   w=round(random(100));
    //   h=round(random(200));

    //   obs=new obstacle(x,y,w,h);

    //   // app.obstacles.push(obs);

    // }

    //   obs=new obstacle(100,300,200,300);

      // app.obstacles.push(obs);

    loadGrid();

  };

  initialize();

  process=main;

  // noCursor();
// println("Hello")

}};

//

/** Now is

*/
