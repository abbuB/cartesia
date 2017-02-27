/*  TBD

    TO DO:

        - ***** Find out how to handle Infinity and -Infinity *****
                  Asymtotes
                    - Tangent
                    - Cotangent
                    - Cosecant
                    - Secant

        - question list
        - Addition and subtraction trig identities
        - Law of cosines
        - Pythagorean identities

        - keyboard controls

      TO DONE:

        - convert to new menus
        - control theta from within the unit circle
        - convert menu hit to dist()
        - Unit circle on/off (glide)
        - right/left arrows to increment/decrement theta +-=1
        - index on/off (glide)

      Decided Against:

        - set theta by clicking the scale

*
+stackoverflow.com
+khanacademy.org
+whatbadgenext.appspot.com/
+codecogs.com/latex/eqneditor.php
+youtube.com
+mail.google.com
+tube.geogebra.org/student/m762
+bradsiemens.com
+processingjs.org
+processing.org
+wikipedia.org
+google.com
+brm.io/matter-js-demo
+w3schools.com
+touchmathematics.org
+desmos.com
+github.com
+emptyblack.com
+redblobgames.com
+dailymotion.com
+pistolslut.com
+latin-phrases.co.uk/quotes/beginning-end/
+code.org
+natureofcode.com
+alssndro.github.io/trianglify-background-generator
+p5js.org
+google.ca

*/

var diagrams = function(processingInstance){
  with (processingInstance){

  size(800, 700); // set size of canvas

  // angleMode="radians";

  var application=function(){

      this.DEBUG=true;          //  mode that displays enhanced debugging tools

      this.mouseX=0;            //  current mouseX location
      this.mouseY=0;            //  current mouseY location

      this.locked=false;        //  When locked the mouse cursor doesn't change theta
      this.unitHit=false;
      this.graphHit=false;

      this.lightsOn=true;
      this.autoPilot=true;

      this.frameRate=60;

      this.theta=45;

      this.data=[];

      this.MIN=0;
      this.MAX=360;

      this.scaleX=90;
      this.scaleY=90;

      this.incr=10;

      //  Display Curves
      this.sinOn=true;
      this.cosOn=true;
      this.tanOn=true;

      this.cscOn=true;
      this.secOn=true;
      this.cotOn=true;
      
      this.quadrantsOn=true;
      
      this.controls=[];
      
      this.initialize=function(){

        this.loadData();

        if (this.DEBUG) { frameRate(30);              }
        else            { frameRate(this.frameRate);  }

      };

      this.loadData=function(){

          var sinN, cosN, tanN, secN, cscN, cotN;

          for (var n=this.MIN; n<=this.MAX; n++){

              sinN=sin(radians(n));
              cscN=1/sinN;
              cosN=cos(radians(n));
              secN=1/cosN;
              tanN=tan(radians(n));
              cotN=1/tanN;

              this.data.push({  sin:  sinN,
                                csc:  cscN,
                                cos:  cosN,
                                sec:  secN,
                                tan:  tanN,
                                cot:  cotN });
          }

      };


  };

  var app=new application();

  app.initialize();

  // Constants =======================================================
  {
    
    var KEYCODES={
      BACKSPACE:  8,
      TAB:        9,
      ENTER:      10,
      RETURN:     13,
      ESC:        27,
      DELETE:     127,
      CODED:      0xffff,
      SHIFT:      16,
      CONTROL:    17,
      ALT:        18,
      CAPSLK:     20,
      SPACE:      32,
      PGUP:       33,
      PGDN:       34,
      END:        35,
      HOME:       36,
      LEFT:       37,
      UP:         38,
      RIGHT:      39,
      DOWN:       40,
      F1:         112,
      F2:         113,  //  Rename
      F3:         114,
      F4:         115,
      F5:         116,
      F6:         117,
      stg:        118,  // F7: snap to grid
      ORTHO:      119,  // F8:
      F9:         120,
      F10:        121,
      F11:        122,
      F12:        123,
      NUMLK:      144,
      META:       157,
      INSERT:     155,
      Z:          90
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

      ARROWS:       color(32,32,32),
      AXES:         color(64,64,64),
      TICKS_LT:     color(128,128,128),     TICKS_DARK:       color(32,32,32),
      GRID_LINES_LT:color(192,192,192),     GRID_LINES_DARK:  color(128,128,128),
      LABELS:       color(128,128,128),
      ORIGIN:       color(128,128,128),

      BORDER:       color(128,0,0),

      SIN:          color(170,29,29,255),   SIN_LT:       color(170,29,29,128),
      COS:          color(29,86,170,255),   COS_LT:       color(29,86,170,128),
      TAN:          color(158,182,58,255),  TAN_LT:       color(158,182,58,192),

      CSC:          color(238,136,15,255),  CSC_LT:       color(238,136,15,128),
      SEC:          color(158,182,58,255),  SEC_LT:       color(158,182,58,128),
      COT:          color(128,128,128,255), COT_LT:       color(128,128,128,128)

    };
    var COMMANDS={

      right:  80,
      left:   72,
      sin:    84,
      cos:    70,
      tan:    83,
      csc:    38,
      sec:    40,
      cot:    39,
      ctrl:   17

    };
    var QUADRANTS={
      NONE:   0,
      ONE:    1,
      TWO:    2,
      THREE:  3,
      FOUR:   4
    }
    var CONSTANTS={

      DEGREES:  "°",
      PI:       "π",
      UP_ARROW: "▲",
      INFINITY: "∞",
      THETA:    "θ"

    }
    var TRIG_INDEX={
      SIN:  0,
      CSC:  1,
      COS:  2,
      SEC:  3,
      TAN:  4,
      COT:  5
    };
    
  }
  
  var getColor=function(clr, alpha){

    return color(red(clr), green(clr), blue(clr), alpha/100*255);

  };

  var initialize=function(){

      if(app.lightsOn){   background(255); }
      else            {   background(0);   }

      draw_Lights();

      fill(248);
      rect(20, 20, 360, 360);
      unit();
      Ortho();

      resetMatrix();
      menu.refresh(mouseX, mouseY);

      if(app.lightsOn){  fill(0);   }
      else            {  fill(192); }

      textSize(10);
      textAlign(CENTER, CENTER);
      text(app.theta + "º", 90,350);

      draw_Index();

      // if (app.autoPilot)  { app.theta+=1; app.theta%=360;}

  };

  var increment=function(){

    app.theta++;    

    if(app.theta>360){ app.theta=0; }

  };
  var decrement=function(){
    
    app.theta--;
    
    if(app.theta<0){ app.theta=360; }
    
  };

  var getSine=function()   { return app.data[app.theta].sin; };
  var getCosine=function() { return app.data[app.theta].cos; };
  var getTangent=function(){

    var retTan=app.data[app.theta].tan;

    if(retTan<-60){ retTan="-INF"; }
    if(retTan>60) { retTan="INF";  }

    return retTan;

  };    
  var getCosecant=function(){

    var retCsc=app.data[app.theta].csc;

    if(retCsc<-60){ retCsc="-INF"; }
    if(retCsc>60) { retCsc="INF";  }

    return retCsc;

  };
  var getSecant=function(){

    var retSec=app.data[app.theta].sec;

    if(retSec<-60){ retSec="-INF"; }
    if(retSec>60) { retSec="INF";  }

    return retSec;

  };
  var getCotangent=function(){

    var retCot=app.data[app.theta].cot;;

    if(retCot<-60){ retCot="-INF"; }
    if(retCot>60) { retCot="INF";  }

    return retCot;

  };  
  // Controls =========================================================

  // Control ===========================================================
  var control=function(x_coord, y_coord, width, height){
  // var control=function(c,l,a,ctrls){

    // controls properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // this.i=c.i;                 // guid
    // this.parent=c.p;            // parent

    this.x=x_coord;             // left
    this.y=y_coord;             // top
    this.w=width;               // width
    this.h=height;              // height

    // this.k=c.k;                // hit cursor

    // this.v=c.v;                // value
    // this.c=c.c;                // command
    // this.g=c.g;                // tag


    // appearance properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // this.fill=l.fill;          // fill color
    // this.fillH=l.fillH;        // fill color highlight
    // this.stroke=l.stroke;      // stroke color
    // this.strokeH=l.strokeH;    // stroke color highlight

    // this.weight=l.weight;      // strokeWeight
    // this.weightH=l.weightH;    // strokeWeight highlight


    // text properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // this.text=a.text;          // text caption

    // this.tfill=a.fill;         // text color
    // this.tfillH=a.fillH;       // text color highlight
    // this.alignX=a.alignX;      // horizontal alignment
    // this.alignY=a.alignY;      // vertical alignment
    // this.size=a.size;          // text size
    // this.sizeH=a.sizeH;        // text size highlight

    // misc properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.hit=false;             // mouse is over the control

    this.visible=true;          // is the control currently being displayed
    // this.ctrls=ctrls;           // array of child controls

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

  // Button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var button=function(x_coord, y_coord, width, height, txt, execute, tag, clr){

      control.call(this, x_coord, y_coord, width, height);
      
      this.txt=txt;
      this.execute=execute;
      this.clr=clr;
      this.on=true;
      this.tag=tag;
      
    };
    button.prototype=Object.create(control.prototype);
    button.prototype.draw=function(){
        
        pushMatrix();
          
          translate(this.x, this.y);
          scale(1,-1);

            fill(getColor(CLRS.WHITE,50));
            strokeWeight(1);

            if(this.hit){

              if(this.on){ stroke(this.clr);              }
              else       { stroke(getColor(this.clr,50)); }

            }
            else{
              noStroke();
            }

            rect(0, -this.h, this.w, this.h);

            if(this.on){ fill(this.clr);              }
            else       { fill(getColor(this.clr,50)); }

            scale(1,-1);
            
            textAlign(LEFT,CENTER);
            
            text(this.txt, 10, this.h/2);
            
            textAlign(RIGHT,CENTER);
            
            var txt=this.tag();
            
            if(!(txt==null)){

              if     (txt== "INF"){ text( "Infinity",  this.w-10, this.h/2); }
              else if(txt=="-INF"){ text("-Infinity",  this.w-10, this.h/2); }
              else                { text(nf(txt,1,4),  this.w-10, this.h/2); }

            }

        popMatrix();

    };

    button.prototype.clicked=function(){

      if(this.hit){
        this.execute();
        this.on=!this.on;
      }

    };
    button.prototype.clickedR=function(){

    };
    button.prototype.moved=function(x,y){
      
      if(mouseX>this.x &&
         mouseX<this.x+this.w &&
         mouseY>this.y &&
         mouseY<this.y+this.h){

        this.hit=true;

      }
      else{

        this.hit=false;

      }

    };
    button.prototype.dragged=function(){



    };
    button.prototype.pressed=function(){



    };
    button.prototype.released=function(){


    };
    button.prototype.typed=function(){



    };
    button.prototype.over=function(){



    };
    button.prototype.out=function(){


    };

  }

  // Unit Circle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{
    var unitCircle=function(x_coord, y_coord, width, height){

      control.call(this, x_coord, y_coord, width, height);

      this.r=61.5;
      this.theta=0;
      this.rTheta=0;
      // control.call(this,c,l,a,ctrls);

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
    unitCircle.prototype=Object.create(control.prototype);
    unitCircle.prototype.draw=function(){
        
        var rTheta=0;
        var r=this.r;
        var cs=3.5;
        var hit=this.hit;
        
        var axes=function(){

            strokeWeight(1);
            stroke(CLRS.BLACK);

            line(-75,  0, 75,  0);
            line(  0,-75,  0, 75);
            
        };
        var circle=function(){

          if(hit){
            fill(getColor(CLRS.GRAY,20));
            stroke(getColor(CLRS.BLACK,75));
            strokeWeight(1.25);              
          }
          else{
            noFill();
            stroke(getColor(CLRS.BLACK,50));
            strokeWeight(1);             
          }
          
          rTheta=radians(app.theta);

          ellipse(0, 0, 2*r, 2*r);
            
        };
        var intersections=function(){

          noStroke();
          fill(getColor(CLRS.BLACK,40));



          ellipse( 0, r, cs, cs);
          ellipse( 0,-r, cs, cs);
          ellipse( r, 0, cs, cs);
          ellipse(-r, 0, cs, cs);
            
        };
        var quadrants=function(){

          textAlign(CENTER,CENTER);
          textSize(14);
          fill(getColor(CLRS.BLACK,25));

          var w=r*0.55;

          text("I",   w*cos(radians( -45)),  w*sin(radians( -45)));
          text("II",  w*cos(radians(-135)),  w*sin(radians(-135)));
          text("III", w*cos(radians( 135 )), w*sin(radians( 135)));
          text("IV",  w*cos(radians(  45)),  w*sin(radians(  45)));
            
        };
        var theta=function(){

          fill(getColor(CLRS.GRAY,20));
          
          // Hypotenuse
          strokeWeight(1.75);          
          stroke(CLRS.GRAY);
          
          line(0, 0, cos(rTheta)*r, sin(rTheta)*r);
          
          // Cos: Vertical
          stroke(CLRS.SIN);
          
          line(cos(rTheta)*r, 0, cos(rTheta)*r, sin(rTheta)*r);
          
          // Sin: Horizontal
          stroke(CLRS.COS);
          
          line(0, 0, cos(rTheta)*r, 0);
          
          // Triangle
          noStroke();
          
          triangle(0,0,
                   cos(rTheta)*r, sin(rTheta)*r,
                   cos(rTheta)*r, 0);

          noStroke();
          fill(getColor(CLRS.BLACK,100));

          ellipse(cos(rTheta)*r, sin(rTheta)*r, cs, cs);
          ellipse(cos(rTheta)*r, 0,             cs, cs);
          ellipse(0,             0,             cs, cs);

          // Theta Text  ----------
          textSize(11);
          textAlign(CENTER,CENTER);
          
          var tw=textWidth(app.theta+CONSTANTS.DEGREES);

          noStroke();
          fill(CLRS.WHITE);

          rect(-tw/2,-r*1.35-7.5,tw+2,15);
          
          fill(CLRS.BLACK);
          noStroke();

          scale(1,-1);

          text(app.theta+CONSTANTS.DEGREES, 0, r*1.35);
            
        };
        
        pushMatrix();

          translate(122.5,444.5);
          scale(1,-1);

            axes();
            circle();
            intersections();
            theta();
            quadrants();

        popMatrix();

    };

    unitCircle.prototype.clicked=function(){


    };
    unitCircle.prototype.clickedR=function(){

    };
    unitCircle.prototype.moved=function(x,y){
      
      if(!app.locked){
        
        if(dist(mouseX,mouseY,122.5,444.5)<this.r){

          this.hit=true;

          var d=round(degrees(atan2(mouseY-444.5, mouseX-122.5)));
          
          if(d<0){ d+=360; }
          
          app.theta=360-d;
          
  // println(app.theta+", "+d);

        }
        else{

          this.hit=false;

        }
        app.unitHit=this.hit;
        app.graphHit=!this.hit;

      }

    };
    unitCircle.prototype.dragged=function(){



    };
    unitCircle.prototype.pressed=function(){



    };
    unitCircle.prototype.released=function(){


    };
    unitCircle.prototype.typed=function(){



    };
    unitCircle.prototype.over=function(){



    };
    unitCircle.prototype.out=function(){


    };

  }

  // Graph ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var graph=function(x_coord, y_coord, width, height){

      control.call(this, x_coord, y_coord, width, height);

      this.innerHit=false;

      // control.call(this,c,l,a,ctrls);

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

      //  each end of a non-contiguous curve requires 2 terminating points

      var p=this;

      noFill();
      strokeWeight(0.75);

      var min=0;
      var max=360;

      // var n=0;        //  number iterator
      var h=540;      //  height
      var h2=h/2;     //  height / 2
      var gw=h/16;    //  grid width
      var f=4*gw;     //  multiplier to account for grid size

      var borderColor=color(CLRS.BORDER);

      var innerHit=false;

      // Shape Options
      // POINTS, LINES, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, QUADS, QUAD_STRIP
      // Example: shape(TRIANGLE_FAN);

      var border=function(){

        if(p.hit){

          noFill();
          stroke(borderColor);
          strokeWeight(0.5);

          rect(-20, -p.h/2, p.w, p.h);

          if(p.innerHit){

            stroke(CLRS.BLUE);
            strokeWeight(2);

            rect(0,-270,540,540);

          }

        }

      };
      var origin=function(){

        strokeWeight(1);
        noStroke();
        fill(96);

        ellipse(0,0,3,3);

      }

      var axes=function(){

        noFill();
        stroke(CLRS.AXES);
        strokeWeight(1);

        line(-5,        0, p.w-30,       0); // x-axis
        line(0, -p.h/2+5,      0, p.h/2-5); // y-axis

      };
      var arrows=function(){

        fill(CLRS.ARROWS);
        noStroke();

        quad(555, 0, 545, -3, 547, 0, 545, 3);    // x-right
        // quad(-20, 0, -10, -3, -12, 0, -10, 3);    // x-left

        quad(0,  285, -3,  275, 0,  277, 3,  275);    // y-top
        quad(0, -285, -3, -275, 0, -277, 3, -275);    // y-bottom

      };
      var grid=function(){

        var n=0;

        noFill();
        strokeWeight(1);
        stroke(CLRS.GRID_LINES);

        // Horizontal lines
        for(n=1; n<p.h/gw/2; n++){

          if(n%4==0){ stroke(CLRS.GRID_LINES_DARK); }
          else      { stroke(CLRS.GRID_LINES_LT);   }

          line(-5, n*gw, 545, n*gw);
          line(-5,-n*gw, 545,-n*gw);

        }

        // Vertical lines
        for(n=1; n<(p.w-20)/gw; n++){

          if(n%4==0){ stroke(CLRS.GRID_LINES_DARK); }
          else      { stroke(CLRS.GRID_LINES_LT);   }

          line( n*gw, 275, n*gw, -275);

        }

      };
      var ticks=function(){

        var n=0;

        // Y-Axis
        for(n=gw; n<p.h/2-10; n+=gw){

          if(n%100==0){
            stroke(CLRS.TICKS_DARK);
            line(-3, n, 3, n);
            line(-3,-n, 3,-n);
          }
          else{
            stroke(CLRS.TICKS_LT);
            line(-2, n, 2, n);
            line(-2,-n, 2,-n);
          }

        }

        // X-Axis
        for(n=gw; n<p.w-20; n+=gw){

          if(n%100==0){
            stroke(CLRS.TICKS_DARK);
            line( n, -3, n, 3);
          }
          else{
            stroke(CLRS.TICKS_LT);
            line( n, -2, n, 2);
          }

        }

      };
      var labels=function(){

        var n=0;

        fill(CLRS.LABELS);
        textSize(10);

        pushMatrix();

          resetMatrix();

            textAlign(CENTER,TOP);

            // x-axis
            // for(n=1; n<w/gw-1; n++){

              // if(n%4==0){
                // text(n, n*gw+30, h);
              // }

            // }

            text( "π/2",  gw*4+20, 585);
            text(   "π",  gw*8+20, 585);
            text("3π/2", gw*12+20, 585);
            text(  "2π", gw*16+20, 585);

            textAlign(RIGHT,CENTER);

            text("0",13,310);

            // y-axis
            for(n=1; n<p.h/2/gw; n++){

              if(n%4==0){
                text( n/4, 13, 310-n*gw);  //  Positive y-axis
                text(-n/4, 13, 310+n*gw);  //  Negative y-axis
                // println(n/4);
              }

            }

        popMatrix();

      };
      var quadrants=function(){

        var unit=10;
        var left=10+20*unit;

        fill(CLRS.GRAY);
        textSize(80);
        textAlign(CENTER,BOTTOM);

        text("I",    4*unit, 0);
        text("II",  12*unit, 0);
        text("III", 20*unit, 0);
        text("IV",  28*unit, 0);

      };
      var grid2=function(){

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

      var sineCurve=function(){

        stroke(CLRS.SIN);
        noFill();

        // beginShape(m);
        beginShape();

          var x=0;
          var y=app.data[0].sin;

          curveVertex(x,y);

            for(var n=app.MIN; n<=app.MAX; n++){

              x=n/app.MAX*h;
              y=app.data[n].sin*4*gw;

              curveVertex(x, y);

            }

          curveVertex(x,y);

        endShape();

        // Current Value
        if(p.innerHit){

          stroke(CLRS.SIN);
          fill(CLRS.SIN);

          ellipse(map(app.theta,0,360,0,540), app.data[app.theta].sin*4*gw, 5, 5);

        }

      };
      var cosineCurve=function(){

        stroke(CLRS.COS);
        noFill();

        var x=0;
        var y=app.data[0].cos*4*gw;

        beginShape();

          curveVertex(x,y);

            for(var n=app.MIN; n<=app.MAX; n++){

              x=n/app.MAX*h;
              y=app.data[n].cos*4*gw;

              curveVertex(x, y);

            }

          curveVertex(x,y);

        endShape();

        // Current Value
        if(p.innerHit){

          stroke(CLRS.COS);
          fill(CLRS.COS);

          ellipse(map(app.theta,0,360,0,540), app.data[app.theta].cos*4*gw, 5, 5);

        }

      };
      var tangentCurve=function(){

        noFill();
        stroke(CLRS.TAN);

        var x=0;
        var y=0;
        var n=0;

        beginShape();

          curveVertex(x, y);

          for(n=1; n<90; n++){

            x=n/app.MAX*h;
            y=app.data[n].tan*f;

            if(y>=-h2 && y<=h2){ curveVertex(x, y); }

          }

        endShape();

        beginShape();

          for(n=91; n<270; n++){

            x=n/app.MAX*h;
            y=app.data[n].tan*f;

            if(y>=-h2 && y<=h2){ curveVertex(x, y); }

          }

        endShape();

        beginShape();

          for(n=271; n<app.MAX; n++){

            x=n/app.MAX*h;
            y=app.data[n].tan*f;

            if(y>=-h2 && y<=h2){ curveVertex(x, y); }

          }

          curveVertex(x,y);

        endShape();

        if(p.innerHit){

          var val=app.data[app.theta].tan*f;

          if(val>=-h2 && val<=h2){

            stroke(CLRS.TAN);
            fill(CLRS.TAN);

            ellipse(map(app.theta,0,360,0,540), val, 5, 5);

          }

        }

      };
      var cosecantCurve=function(){

        fill(CLRS.SIN_LT);
        noStroke();

        var x=0;
        var y=0;
        var n=0;

        for(n=1; n<180; n+=2){

          x=n/app.MAX*h;
          y=app.data[n].csc*4*gw;

          if(y>=-h2 && y<=h2){ ellipse(x, y, 2, 2); }

        }

        for(n=181; n<app.MAX; n+=2){

          x=n/app.MAX*h;
          y=app.data[n].csc*4*gw;

          if(y>=-h2 && y<=h2){ ellipse(x, y, 2, 2); }

        }

        // Current Value
        if(p.innerHit){

          var val=app.data[app.theta].csc*4*gw;

          if(val>=-h2 && val<=h2){

            stroke(CLRS.SIN_LT);

            ellipse(map(app.theta,0,360,0,540), val, 5, 5);

          };

        }

      };
      var secantCurve=function(){

        fill(CLRS.COS_LT);
        noStroke();

        var x=0;
        var y=app.data[0].sec;
        var n=0;

        for(n=1; n<90; n+=2){

          x=n/app.MAX*h;
          y=app.data[n].sec*4*gw;

          if(y>=-h2 && y<=h2){ ellipse(x, y, 2, 2); }

        }

        for(n=91; n<270; n+=2){

          x=n/app.MAX*h;
          y=app.data[n].sec*4*gw;

          if(y>=-h2 && y<=h2){ ellipse(x, y, 2, 2); }

        }

        for(n=271; n<=app.MAX; n+=2){

          x=n/app.MAX*h;
          y=app.data[n].sec*4*gw;

          if(y>=-h2 && y<=h2){ ellipse(x, y, 2, 2); }

        }

        // Current Value
        if(p.innerHit){

          var val=app.data[app.theta].sec*4*gw;

          if(val>=-h2 && val<=h2){

            stroke(CLRS.COS_LT);
            fill(CLRS.COS_LT);

            ellipse(map(app.theta,0,360,0,540), val, 5, 5);

          };

        }

      };
      var cotangentCurve=function(){

        noStroke();
        fill(CLRS.TAN_LT);

        var x=0;
        var y=0;
        var n=0;
        var incr=2;

        for(n=2; n<180; n+=incr){

          x=n/app.MAX*h;
          y=app.data[n].cot*4*gw;

          if(y>=-h2 && y<=h2){ ellipse(x, y, 2, 2); }

        }

        for(n=181; n<=app.MAX; n+=incr){

          x=n/app.MAX*h;
          y=app.data[n].cot*4*gw;

          if(y>=-h2 && y<=h2){ ellipse(x, y, 2, 2); }

        }

        // Current Value
        if(p.innerHit){

          var val=app.data[app.theta].cot*4*gw;

          if(val>=-h2 && val<=h2){

            stroke(CLRS.TAN_LT);

            ellipse(map(app.theta,0,360,0,540), val, 5, 5);

          };

        }

      };

      var values=function(){

        var x, y, sz=10;

        // Current location
        x=mouseX-app.border-20*app.unit;

        var index=round(x/p.w*720);

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

        pushMatrix();

          scale(1,-1);
            
            fill(getColor(CLRS.BLACK,25));
            textAlign(CENTER,CENTER);
            textSize(48);

            text("I",   67.25, 0);
            text("II",  67.25+135, 0);
            text("III", 67.25+270, 0);
            text("IV",  67.25+405, 0);

        popMatrix();

      }
      
      // var legend=function(){

        // pushMatrix();

          // translate(160,150);

          // fill(getColor(CLRS.WHITE,50));
          // stroke(CLRS.BLACK);
          // strokeWeight(0.25);

          // rect(0,40,220,70,10);

          // scale(1,-1);

          // fill(getColor(CLRS.WHITE,80));
          // textSize(11);

          // textAlign(LEFT,BOTTOM);

          // fill(CLRS.SIN);   text("Sin "+CONSTANTS.THETA+"",10,-90);
          // fill(CLRS.COS);   text("Cos "+CONSTANTS.THETA+"",10,-70);
          // fill(CLRS.TAN);   text("Tan "+CONSTANTS.THETA+"",10,-50);

          // fill(CLRS.SIN);   text("Csc "+CONSTANTS.THETA+"",120,-90);
          // fill(CLRS.COS);   text("Sec "+CONSTANTS.THETA+"",120,-70);
          // fill(CLRS.TAN);   text("Cot "+CONSTANTS.THETA+"",120,-50);

          // textAlign(RIGHT,BOTTOM);

          // fill(CLRS.SIN);   text(nf(sin(radians(app.theta)),1,4),95,-90);
          // fill(CLRS.COS);   text(nf(cos(radians(app.theta)),1,4),95,-70);
          // fill(CLRS.TAN);   text(nf(tan(radians(app.theta)),1,4),95,-50);

          // fill(CLRS.SIN);   text(nf(sin(1/radians(app.theta)),1,4),210,-90);
          // fill(CLRS.COS);   text(nf(cos(1/radians(app.theta)),1,4),210,-70);
          // fill(CLRS.TAN);   text(nf(tan(1/radians(app.theta)),1,4),210,-50);

        // popMatrix();

      // };

      // Draw --------------------------------------------------------------------------------
      pushMatrix();

        // translate(app.border+20*app.unit, height/2);
        translate(this.x+0.5, this.y+0.5);
        scale(1,-1);

          noFill();

          border();
          axes();
          grid();
          arrows();
          origin();
          ticks();
          labels();

          // legend();

          if(app.quadrantsOn) { quadrants();     }

          if(app.sinOn){ sineCurve();       }
          if(app.cscOn){ cosecantCurve();   }

          if(app.cosOn){ cosineCurve();     }
          if(app.secOn){ secantCurve();     }

          if(app.tanOn){ tangentCurve();    }
          if(app.cotOn){ cotangentCurve();  }

          // values();

      popMatrix();

    };

    graph.prototype.clicked=function(){
      for(var c in this.ctrls){ this.ctrls[c].clicked(0,0); }
    };
    graph.prototype.moved=function(x,y){
      
      if(!app.locked){
        
        if(mouseX>x+0 &&
           mouseX<x+580 &&
           mouseY>y+20 &&
           mouseY<y+600){

          app.graphHit=true;

          if(mouseX>=20 &&
             mouseX<=560 &&
             mouseY>=30 &&
             mouseY<=580){
            
            this.innerHit=true;

            if(app.unitHit==false){            
              app.theta=round(map(mouseX-20,0,540,0,360));
            }
            else{
              
            }
            
          }
          else{

            this.innerHit=false;

          }

        }
        else{

          app.graphHit=false;

        }

      }

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
    graph.prototype.mouseOut=function(){
      this.hit=false;
    };
    graph.prototype.mouseOver=function(){

    };

  }
  var toggleSin=function(){ app.sinOn=!app.sinOn; };
  var toggleCos=function(){ app.cosOn=!app.cosOn; };
  var toggleTan=function(){ app.tanOn=!app.tanOn; };
  var toggleCsc=function(){ app.cscOn=!app.cscOn; };
  var toggleSec=function(){ app.secOn=!app.secOn; };
  var toggleCot=function(){ app.cotOn=!app.cotOn; };

  app.controls.push(new graph(21, 309, 580, 580));
  app.controls.push(new unitCircle(450, 309, 580, 580));
  
  app.controls.push(new button(175, 45, 110, 20, "Sin "+CONSTANTS.THETA, toggleSin, getSine,      CLRS.SIN));
  app.controls.push(new button(175, 65, 110, 20, "Cos "+CONSTANTS.THETA, toggleCos, getCosine,    CLRS.COS));
  app.controls.push(new button(175, 85, 110, 20, "Tan "+CONSTANTS.THETA, toggleTan, getTangent,   CLRS.TAN));
  
  app.controls.push(new button(305, 45, 110, 20, "Csc "+CONSTANTS.THETA, toggleCsc, getCosecant,  CLRS.SIN));
  app.controls.push(new button(305, 65, 110, 20, "Sec "+CONSTANTS.THETA, toggleSec, getSecant,    CLRS.COS));
  app.controls.push(new button(305, 85, 110, 20, "Cot "+CONSTANTS.THETA, toggleCot, getCotangent, CLRS.TAN));
  
  var telemetry=function(){

    // Border
    fill(getColor(CLRS.BLACK,90));
    stroke(1);

    rect(600,0,199,599);

    var h=15;

    var row0=20;
    var row1=row0 +h;
    var row2=row0 +2*h;
    var row3=row0 +3*h;
    var row4=row0 +4*h;
    var row5=row0 +5*h;
    var row6=row0 +6*h;
    var row7=row0 +7*h;
    var row8=row0 +8*h;
    var row9=row0 +9*h;
    var row10=row0+10*h;
    var row11=row0+11*h;
    var row12=row0+12*h;
    var row13=row0+13*h;

    var row14=row0+14*h;
    var row15=row0+15*h;
    var row16=row0+16*h;
    var row17=row0+17*h;
    var row18=row0+18*h;
    var row19=row0+19*h;
    var row20=row0+20*h;
    var row21=row0+21*h;
    var row22=row0+22*h;
    var row23=row0+23*h;

    var col0=620;
    var col1=630;
    var col2=720;

    fill(200);

    textAlign(LEFT,CENTER);
    textSize(12);

    // text("Cursor:",     col0, row0);

    text("x: ",           col1, row1);
    text("y: ",           col1, row2);

    text(mouseX,          col2, row1);
    text(mouseY,          col2, row2);

    text("Sine On:",      col1, row4);
    text("Cosine On:",    col1, row5);
    text("Tangent On:",   col1, row6);
    text("Cosecant On:",  col1, row7);
    text("Secant On:",    col1, row8);
    text("Cotangent On:", col1, row9);

    text(app.sinOn,       col2, row4);
    text(app.cosOn,       col2, row5);
    text(app.tanOn,       col2, row6);
    text(app.cscOn,       col2, row7);
    text(app.secOn,       col2, row8);
    text(app.cotOn,       col2, row9);

    text("Sine:",         col1, row11);
    text("Cosine:",       col1, row12);
    text("Tangent:",      col1, row13);
    text("Cosecant:",     col1, row14);
    text("Secant:",       col1, row15);
    text("Cotangent:",    col1, row16);

    text(nf(sin(radians(app.theta)),1,3),   col2, row11);
    text(nf(cos(radians(app.theta)),1,3),   col2, row12);
    // text(nf(tan(radians(app.theta)),1,3),   col2, row13);
    // text(nf(1/sin(radians(app.theta)),1,3), col2, row14);
    // text(nf(1/cos(radians(app.theta)),1,3), col2, row15);
    // text(nf(1/tan(radians(app.theta)),1,3), col2, row16);

    text("Theta ("+CONSTANTS.THETA+"):",      col1, row18);
    text("Locked:",      col1, row20);
    
    
    text(app.theta,     col2, row18);

    text(app.locked,     col2, row20);
    
  };

  var draw= function() {

    background(255);

    // initialize();
    //println(mouseX-20 + "," + mouseY);
    for(var c in app.controls){ app.controls[c].draw(); }
    // app.theta+=1;
    // app.theta%360;

    if(app.DEBUG){
      telemetry();
    }
// println(app.data[app.theta].tan);
  };

  // Keyboard Events ==================================================
  {
    
    var keyPressed = function() {
      

      if(keyCode==KEYCODES.RIGHT){ increment(); }
      if(keyCode==KEYCODES.LEFT) { decrement(); }     

    };
    var keyTyped = function() {
    
      /* println("typed " + (key) + " " + keyCode); */

    };
    var keyReleased = function() {

    };
    
  }
  
  // Mouse Events ==================================================
  {

    var mouseClicked=function(){

      app.locked=!app.locked;

      for(var c in app.controls){ app.controls[c].clicked(); }

    };

    var mouseMoved=function(){

      app.mouseX=mouseX;
      app.mouseX=mouseY;

      for(var c in app.controls){ app.controls[c].moved(0,0); }

    };
    var mouseOut=function(){

      for(var c in app.controls){ app.controls[c].out(); }
      // menu.refresh(100,100);

    };
    var mouseOver=function(){

      for(var c in app.controls){ app.controls[c].over(); }
      // app.autoPilot=false;

    };

  }

}};






























































