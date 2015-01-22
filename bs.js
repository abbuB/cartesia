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
// +www.khanacademy.org
// +whatbadgenext.appspot.com/
// +www.codecogs.com/latex/eqneditor.php
// +www.youtube.com
// +mail.google.com
// +tube.geogebra.org/student/m762
// +bradsiemens.com
// +processingjs.org/reference
// +wikipedia.org
// +google.com
// +brm.io/matter-js-demo
// +www.w3schools.com
// +www.touchmathematics.org
// +www.desmos.com
// +github.com

  angleMode="radians";

  // Constants =======================================================
  var CONSTANTS={

    DEGREES:  "°",
    PI:       "π",
    UP_ARROW: "▲",
    INFINITY: "∞",
    THETA:    "θ"

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
  var COMMANDS={

    SHIFT:     16,
    CONTROL:   17,
    ALT:       18,
    CAPSLK:    20,
    PGUP:      33,
    PGDN:      34,
    END:       35,
    HOME:      36,
    
    LEFT:       37,
    UP:         38,
    RIGHT:      39,
    DOWN:       40,

    UPLEFT:     3837,
    UPRIGHT:    3839,
    DOWNLEFT:   4037,
    DOWNRIGHT:  4039,

    F1:        112,
    F2:        113,
    F3:        114,
    F4:        115,
    F5:        116,
    F6:        117,
    F7:        118,
    F8:        119,
    F9:        120,
    F10:       121,
    F11:       122,
    F12:       123,
    NUMLK:     144,
    META:      157,
    INSERT:    155,
    
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

  }
  var hexToRGBA=function(hexStr,a){

    // note: hexStr should be #rrggbb
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b =  hex & 0x0000ff;
    
    return color(r,g,b,a);

  }

  var app={

    background:   0,

    height:       window.innerHeight-10,
    width:        window.innerWidth-10,

    mouseX:       0,
    mouseY:       0,

    originX:      0,
    originY:      0,
    
    ctrl:         false,
    alt:          false,
    shift:        false,
    
    x:            200,
    y:            200,

    left:         false,
    right:        false,
    center:       false,

    border:       0,

    debug:        true,
    running:      true,

    pressed:      false,

    speed:        5,
    accel:        1,

    scaleX:       90,       scaleY:   2,

    ctrls:        [],
    keys:         [],

    data:         []

  };

  var grid=[[0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0]];
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
    this.i=c.i;                // guid
    this.parent=c.p;           // parent

    this.x=c.x;                // left
    this.y=c.y;                // top
    this.w=c.w;                // width
    this.h=c.h;                // height

    this.k=c.k;                // hit cursor

    this.v=c.v;                // value
    this.c=c.c;                // command
    this.g=c.g;                // tag


    // appearance properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.fill=l.fill;          // fill color
    this.fillH=l.fillH;        // fill color highlight
    this.stroke=l.stroke;      // stroke color
    this.strokeH=l.strokeH;    // stroke color highlight

    this.weight=l.weight;      // strokeWeight
    this.weightH=l.weightH;    // strokeWeight highlight


    // text properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.text=a.text;          // text caption

    this.tfill=a.fill;         // text color
    this.tfillH=a.fillH;       // text color highlight
    this.alignX=a.alignX;      // horizontal alignment
    this.alignY=a.alignY;      // vertical alignment
    this.size=a.size;          // text size
    this.sizeH=a.sizeH;        // text size highlight

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
      commands(this.c, this.g);
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

  // Pane ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var graph=function(c,l,a,ctrls){

    control.call(this,c,l,a,ctrls);

    // app.factor=     this.h/22;   // required for initial grid height

    // this.shapes=    [];
    // this.Temp=      0;

    // this.cX=        0;
    // this.cY=        0;

    // this.originX=   0;
    // this.originY=   0;

    // this.offsetX=   0;
    // this.offsetY=   0;

    // this.hitProp=   false;

  };
  graph.prototype=Object.create(control.prototype);
  graph.prototype.draw=function(){

    //  each end of a discontiguous curve requires 2 terminating points
    
    noFill();
    strokeWeight(0.75);

    var w=this.w;
    var h=this.h;

    var incr=18;
    
    var min=0;
    var max=360;

println(this.w);

    // Shape Options
    // POINTS, LINES, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, QUADS, QUAD_STRIP
    // Example: shape(TRIANGLE_FAN);

    var border=function(){

      strokeWeight(1);
      stroke(CLRS.PURPLE);
      fill(getColor(CLRS.PURPLE,5));

      if(this.hit===true){ strokeWeight(5); }

      rect(0, 0, this.w, this.h);

    };
    
    var sineCurve=function(){

      var m=55;

      stroke(CLRS.SIN);

      // beginShape(m);
      beginShape();

        var x=0;
        var y=0;

        curveVertex(x,y);
        
        for(var n=min; n<=max; n+=incr){

          x=n/app.max*w;
          y=app.data[n].sin;

          curveVertex(x, y);

        }

        curveVertex(x,y);

      endShape();



    };
    var cosineCurve=function(){
      
      stroke(CLRS.COS);

      beginShape();
      
        var x=0;
        var y=app.data[0].cos;
        
        curveVertex(x,y);
        
        for(var n=min; n<=max; n+=incr){

          x=n/app.max*w;
          y=app.data[n].cos;

          curveVertex(x, y);

        }

        curveVertex(x,y);

      endShape();
      
    };
    var tangentCurve=function(){
      
      stroke(CLRS.TAN);

      var x=0;
      var y=0;
      var n=0;
      
      beginShape();

        curveVertex(x, y);

        for(n=min; n<90; n++){

          x=n/app.max*w;
          y=app.data[n].tan;

          if(y>-height || y<height){ curveVertex(x, y); }

        }

      endShape();

      beginShape();

        for(n=91; n<270; n++){

          x=n/app.max*w;
          y=app.data[n].tan;

          if(y>-height || y<height){ curveVertex(x, y); }

        }

      endShape();
      
      beginShape();

        for(n=271; n<=max; n++){

          x=n/app.max*w;
          y=app.data[n].tan;

          if(y>-height || y<height){ curveVertex(x, y); }

        }

        curveVertex(x,y);

      endShape();
      
    };
    var cosecantCurve=function(){
      
      stroke(CLRS.ORANGE);

      var x=0;
      var y=0;
      var n=0;

      beginShape();

        for(n=min; n<180; n++){

          x=n/app.max*w;
          y=app.data[n].csc;

          if(y>-height && y<height){ curveVertex(x, y); }

        }

      endShape();

      beginShape();

        for(n=181; n<360; n++){

          x=n/app.max*w;
          y=app.data[n].csc;

          if(y>-height && y<height){ curveVertex(x, y); }

        }

      endShape();

    };
    var secantCurve=function(){
      
      stroke(CLRS.GREEN);

      var x=0;
      var y=app.data[0].sec;
      var n=0;
              
      beginShape();

        curveVertex(x, y);

        for(n=min; n<90; n++){

          x=n/app.max*w;
          y=app.data[n].sec;

          if(y>-height && y<height){ curveVertex(x, y); }

        }

      endShape();

      beginShape();

        for(n=91; n<270; n++){

          x=n/app.max*w;
          y=app.data[n].sec;

          if(y>-height && y<height){ curveVertex(x, y); }

        }

      endShape();
      
      beginShape();

        for(n=271; n<=max; n++){

          x=n/app.max*w;
          y=app.data[n].sec;

          if(y>-height && y<height){ curveVertex(x, y); }

        }

        curveVertex(x, y);

      endShape();

    };
    var cotangentCurve=function(){
      
      stroke(CLRS.GRAY);

      var x=0;
      var y=0;
      var n=0;

      beginShape();

        for(n=min; n<180; n++){

          x=n/app.max*w;
          y=app.data[n].cot;

          if(y>-height && y<height){ curveVertex(x, y); }

        }

      endShape();

      beginShape();

        for(n=181; n<=max; n++){

          x=n/app.max*w;
          y=app.data[n].cot;

          if(y>-height && y<height){ curveVertex(x, y); }

        }

      endShape();
      
    };
    
    var values=function(){
      
      var x, y, sz=10;

      // Current location
      x=mouseX-app.border-20*app.unit;

      var index=round(x/w*720);

      if(x>=0 && x<=w){
        
        noStroke();
        
        // Cursor ---------------------
        fill(CLRS.GRAY10);
        
        ellipse(x,0,sz,sz);

        // Sine -----------------------
        fill(CLRS.SIN);

        y=-app.data[index].sin;
        ellipse(x,y,sz,sz);
        
        // Cosecant -------------------
        fill(CLRS.CSC);
        
        y=-app.data[index].csc;
        ellipse(x,y,sz,sz);
        
        // Cosine ---------------------
        fill(CLRS.COS);
        
        y=-app.data[index].cos;
        ellipse(x,y,sz,sz);

        // Secent ---------------------
        fill(CLRS.SEC);
        
        y=-app.data[index].sec;
        ellipse(x,y,sz,sz);
        
        // Tangent --------------------
        fill(CLRS.TAN);

        y=-app.data[index].tan;
        ellipse(x,y,sz,sz);

        // Cotangent ------------------
        fill(CLRS.COT);

        y=-app.data[index].cot;
        ellipse(x,y,sz,sz);
        
      }

      noFill();

    };

    var quadrants=function(){
    
      // var left=app.border+20*app.unit;
      
      fill(CLRS.GRAY);
      textSize(80);
      textAlign(CENTER,BOTTOM);

      text("I",    4*app.unit, 0);
      text("II",  12*app.unit, 0);
      text("III", 20*app.unit, 0);
      text("IV",  28*app.unit, 0);
      
    };
    
    var grid=function(){
      
      // noFill();
      // stroke(16);
  
      // pushMatrix();
  
      //   translate(this.x, this.h/2);
      //   scale(1,-1);
        
      //   fill(CLRS.BLACK);
        
      //   // rect(0, h/2-2, w, -h);
  
      //   // line(0,0,w,h)
  
      //   stroke(16);
      //   // stroke(CLRS.RED);
      //   strokeWeight(1);
        
      //   // y-axis
      //   var s=app.unit*2;
        
      //   for(var x=0; x<w/s; x++){
  
      //     if(x%4===0) { strokeWeight(1);  }
      //     else        { strokeWeight(0.5);  }
  
      //     line(x*s, -h/2, x*s, h/2);
  
      //   }
  
      //   // x-axis
      //   for(var y=0; y<h/s; y++){
          
      //     if(y%4===0) { strokeWeight(1);  }
      //     else        { strokeWeight(0.5);  }
  
      //     line(0, -y*s, w, -y*s);
      //     line(0,  y*s, w,  y*s);
  
      //   }
  
      //   stroke(64);
      //   strokeWeight(1);
  
      //   line(0, h/2, 0, -h/2);    // x-axis
      //   line(0, 0, w, 0);     // y-axis
  
      //   // arrows
      //   noStroke();
      //   fill(96);
        
      //   var w2=w/2;
      //   var sp=app.unit;
      //   var base=w+sp;
        
      //   // quad(base,     0,
      //   //     base+10,  4,
      //   //     base+7,   0,
      //   //     base+10, -4);
        
      //   base=w;
        
      //   quad(base,     0,
      //       base-10,  4,
      //       base-7,   0,
      //       base-10, -4);
  
      //   noStroke();
      //   fill(96);
  
      //   base=h/2;
        
      //   quad( 0, base,
      //         4, base-10,
      //         0, base-7,
      //       -4, base-10);
        
      //   base=-h/2;
        
      //   quad( 0, base,
      //         4, base+10,
      //         0, base+7,
      //       -4, base+10);
  
      // popMatrix();
    
    }

    pushMatrix();

      // translate(app.border+20*app.unit, height/2);
      translate(this.x, this.y);
      scale(1,-1);

stroke(CLRS.ORANGE);
ellipse(0,0,100,100);

        border();

      // rect(0, 0, this.w, this.h);
      
        // grid();
        
        // if(app.sineOn)      { sineCurve();      }
        // if(app.cosecantOn)  { cosecantCurve();  }
        
        // if(app.cosineOn)    { cosineCurve();    }
        // if(app.secantOn)    { secantCurve();    }
        // //
        // if(app.tangentOn)   { tangentCurve();   }
        // if(app.cotangentOn) { cotangentCurve(); }

        // if(app.quadrantsOn) { quadrants();      }

        // values();


    popMatrix();


  };

  graph.prototype.clicked=function(){
    for(var c in this.ctrls){ this.ctrls[c].clicked(0,0); }
  };
  graph.prototype.moved=function(x,y){

    if(mouseX>x+this.x &&
       mouseX<x+this.x+this.w &&
       mouseY>y+this.y &&
       mouseY<y+this.y+this.h){

      this.hit=true;

// println("hit");

      // for(var c in this.ctrls){ this.ctrls[c].moved(x,y); }
      
      // document.getElementById("coordinates").innerText=app.coordinates;
      
    }
    else{
      this.hit=false;
// println("miss");
    }

    // for(var c in this.ctrls){ this.ctrls[c].moved(x,y); }

  };
  graph.prototype.dragged=function(x,y){

    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].dragged(); }
    }

  };
  graph.prototype.pressed=function(){

    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].pressed(); }
    }

  };
  graph.prototype.released=function(){

    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].released(); }
    };

  };
  graph.prototype.typed=function(){

    if(app.keys[KEYCODES.SPACE]){
      this.vertices=[];
      this.temp=0;
    }

    if(app.keys[KEYCODES.CONTROL] &&
       app.keys[KEYCODES.Z]){
      this.shapes.splice(this.shapes.length-1,1);
      process();
    }

  };

  var command=function(c){

    if(app.ctrl){ app.accel=2;  }
    else        { app.accel=1;  }

    switch(c){

      case COMMANDS.RIGHT:      app.x+=app.speed*app.accel;   app.originX-=app.speed*app.accel;   break;
      case COMMANDS.LEFT:       app.x-=app.speed*app.accel;   app.originX+=app.speed*app.accel;   break;
      
      case COMMANDS.UP:         app.y-=app.speed*app.accel;   app.originY+=app.speed*app.accel;   break;
      case COMMANDS.DOWN:       app.y+=app.speed*app.accel;   app.originY-=app.speed*app.accel;   break;

      case COMMANDS.UPLEFT:     app.x-=app.speed;
                                app.y-=app.speed;   break;
                                
      case COMMANDS.UPRIGHT:    app.x+=app.speed;
                                app.y-=app.speed;   break;
                                
      case COMMANDS.DOWNLEFT:   app.x-=app.speed;
                                app.y+=app.speed;   break;
                                
      case COMMANDS.DOWNRIGHT:  app.x+=app.speed;
                                app.y+=app.speed;   break;

      default:                                      break;

    }
    
  };
  
  var telemetry=function(){
    
    if(app.telemetry){

      fill(CLRS.YELLOW);
      textSize(14);
  
      textAlign(LEFT);
  
      text("mouseX:",    50,   50);
      text("mouseY:",    50,   75);
  
      text(mouseX,      150,   50);
      text(mouseY,      150,   75);
  
      text("Left:",      50,  125);
      text("Right:",     50,  150);
      text("Center:",    50,  175);
  
      text(app.left,    150,  125);
      text(app.right,   150,  150);
      text(app.center,  150,  175);
    
      text("CTRL:",      50,  225);
      text("ALT:",       50,  250);
      text("SHIFT:",     50,  275);
  
      text(app.ctrl,    150,  225);
      text(app.alt,     150,  250);
      text(app.shift,   150,  275);
      
    }

  };

  var loadGrid=function(){

    var sz=width/100;
    
    noStroke();

    for(var x=0; x<grid.length; x++){
      for(var y=0; y<grid[0].length; y++){

        if(grid[x][y]!==0){ fill(128,0,0,32); }
        else              { fill(32,0,0,32);   }
        
        fill(x*10,y*10,0);
        
        rect(x*sz,y*sz,sz,sz);

      }
    }

  };
  
  var main=function(){

    noFill();

    if(app.running){ background(CLRS.BLACK);  }
    else           { background(8);          }
    
    pushMatrix();

      translate(app.originX, app.originY);

      loadGrid();

      telemetry();

      fill(128,0,0,128);

      ellipse(app.x,app.y,20,20);

    popMatrix();

  };

  var process;
  var draw=function(){ process(); };

  // Events ===============================================================

  var mousePressed=   function(){
    
    if(mouseButton===LEFT)  { app.left=true;    }
    if(mouseButton===RIGHT) { app.right=true;   }
    if(mouseButton===CENTER){ app.center=true;  }

  };
  var mouseReleased=  function(){

    if(mouseButton===LEFT)  { app.left=false;   }
    if(mouseButton===RIGHT) { app.right=false;  }
    if(mouseButton===CENTER){ app.center=false; }
    
  };
  var mouseMoved=     function(){
    for(var c in app.ctrls){ app.ctrls[c].moved(0,0); };
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

    app.keys[keyCode]=true;

    switch(true){

      case app.keys[COMMANDS.UP] &&
           app.keys[COMMANDS.LEFT]:     command(COMMANDS.UPLEFT);     break;
      case app.keys[COMMANDS.UP] &&
           app.keys[COMMANDS.RIGHT]:    command(COMMANDS.UPRIGHT);    break;
      case app.keys[COMMANDS.DOWN] &&
           app.keys[COMMANDS.LEFT]:     command(COMMANDS.DOWNLEFT);   break;
      case app.keys[COMMANDS.DOWN] &&
           app.keys[COMMANDS.RIGHT]:    command(COMMANDS.DOWNRIGHT);  break;

      default:                          command(keyCode);             break;

    }
    
    app.ctrl  =app.keys[COMMANDS.CTRL];
    app.alt   =app.keys[COMMANDS.ALT];
    app.shift =app.keys[COMMANDS.SHIFT];

  };
  var keyReleased=function(){

    app.keys[keyCode]=false;

    app.ctrl  =app.keys[COMMANDS.CTRL];
    app.alt   =app.keys[COMMANDS.ALT];
    app.shift =app.keys[COMMANDS.SHIFT];
    
  };

  // Initialize ===============================================================

  var addControls=function(){

    var ctrls=[];

    var cn=new graph(
            new propC("grid", 0, 20*app.unit, app.height/2, 34*app.unit, app.height, 0, 1, false, 0, 0),
            new propL(CLRS.GRID, getColor(CLRS.GRID,65), CLRS.WHITE, CLRS.YELLOW, 0, 0),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    cn.ctrls=ctrls;
    
    app.ctrls.push(cn);

// println(app.ctrls.length);

  };
  
  var loadData=function(){

    var sinN, cosN, tanN, cscN, secN, cotN;

    for (var n=app.min; n<=app.max; n++){

      sinN=  sin(n*PI/180)*app.unit*8;
      cscN=1/sin(n*PI/180)*app.unit*8;
      
      cosN=cos(n*PI/180)*app.unit*8;
      secN=1/cos(n*PI/180)*app.unit*8;
      
      tanN=tan(n*PI/180)*app.unit*8;
      cotN=1/tan(n*PI/180)*app.unit*8;
      
      app.data.push({ sin:  sinN,
                      csc:  cscN,
                      cos:  cosN,
                      sec:  secN,
                      tan:  tanN,
                      cot:  cotN });

    }

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

    frameRate(30);

    app.width=window.innerWidth-20;
    app.height=window.innerHeight-20;
    
    // println(app.data[350][INDEX.COT]);

    size(app.width, app.height);

    setDisplay();

    loadData();

    addControls();

  };

  initialize();

  process=main;

// var noiseScale=0.09;

// noStroke();
// noiseSeed(pow(PI,2.718281828459045));

// var t = pow(10,random(0,10));

// var drawRange=function(yS){

//   var n = noise(t);

//     beginShape();

//         vertex(0, height);
            
//         for(var x=0; x<width; x++) {
            
//             n = noise(t);

//             var y = map(n, 0, 1, 0, yS);

//             // println(y);

//             t += 0.01;

//             vertex(x, 150+y);

//         }

//         vertex(width,height);
//         vertex(0,height);

//     endShape(CLOSE);
    
// };

// var drawClouds=function(){

//     for(var x=0; x<width; x+=10){
//         for(var y=0; y<height; y+=10){

//             var n=map(noise(x,y),0,1,0,255);
            
//             fill(10,10,10,n);

//             ellipse(x,y,10,10);
// fill(255);
// text(n,20,20);

//         }
//     }
    
// };

// background(0,0,20);

// var c=0;

// // Mountains
// for(var n=0; n<10; n++){
    
//     t+=10*random(6);
    
//     c=50-n*5;

//     fill(c,c,c,255-n+1);

//     drawRange(n*20+200);

// }

// // Cloads
// drawClouds();

// var mouseMoved=function(){
//     // println(noise(mouseX/400,mouseY/400));
// };

}};
