/*  TBD

    TO DO:
        
        - fix cursor/theta correlation
        - create a container object

        - question list
        - Addition and subtraction trig identities
        - Law of cosines
        - Pythagorean identities

    TO DONE:
        
        - legend button
        - disable arrows while autoPilot is on
        
        - ***** Find out how to handle Infinity and -Infinity *****
                  Asymtotes
                    - Tangent
                    - Cotangent
                    - Cosecant
                    - Secant
                    
        - convert to new menus
        - control theta from within the unit circle
        - convert menu hit to dist()
        - Unit circle on/off (glide)
        - right/left arrows to increment/decrement theta +-=1
        - index on/off (glide)
        - handle single control clicks
        - Z-Order for controls
        - keyboard controls

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

  cursor(WAIT);
    
  size(600, 600); // set size of canvas

  angleMode="radians";

  var application=function(){

      this.DEBUG=true;          //  mode that displays enhanced debugging tools

      this.frameRate=0;         //  refresh speed

      this.mouseX=0;            //  current mouseX location
      this.mouseY=0;            //  current mouseY location

      this.left=false;          //  Is the left mouse button pressed
      this.right=false;         //  Is the right mouse button pressed
      this.center=false;        //  Is the center mouse button pressed

      this.legend=false;        //  Is the legend displayed
      
      this.unitHit=false;       //  Cursor is within the bounds of the unit circle
      this.graphHit=false;      //  Cursor is within the bounds of the graph

      this.autoPilot=false;     //  Alpha changes automatically

      this.theta=145;           //   Current angle

      this.data=[];             //  Values of each trig function from 0 (zero) to 360

      this.MIN=0;
      this.MAX=360;

      this.sinOn=true;          //  Display the sine curve
      this.cosOn=true;          //  Display the cosine curve
      this.tanOn=true;          //  Display the tangent curve

      this.cscOn=true;          //  Display the cosecant curve
      this.secOn=true;          //  Display the secant curve
      this.cotOn=true;          //  Display the cotangent curve

      this.quadrantsOn=true;    //  Display the quadrants

      this.unitCircleOn=true;   //  Display the unit circle

      this.controls=[];         //  collection of controls in the app
      
      this.clicking=-1;
      
      this.focus=0;             //  The ID of the control with focus
      
      this.initialize=function(){

        this.loadData();

        // if (this.DEBUG) { frameRate(0);              }
        // else            { frameRate(this.frameRate);  }

      };
      var rationalize=function(txt){

        return txt.toFixed(4);

      };
      this.loadData=function(){

          var sinN, cosN, tanN, secN, cscN, cotN;

          for (var n=this.MIN; n<=this.MAX; n++){

              sinN=rationalize(sin(radians(n)));
              cscN=rationalize(1/sinN);
              cosN=rationalize(cos(radians(n)));
              secN=rationalize(1/cosN);
              tanN=rationalize(tan(radians(n)));
              cotN=rationalize(1/tanN);

              this.data.push({  sin:  sinN, csc:  cscN,
                                cos:  cosN, sec:  secN,
                                tan:  tanN, cot:  cotN });
          }

      };

  };

  frameRate(60);
  
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

      TEAL_0:       color(28,117,138, 255), TEAL_0_LT:    color(28,117,138,128),
      TEAL_1:       color(41,171,202,255),  TEAL_1_LT:    color(41,171,202,128),
      TEAL_2:       color(88,196,221,255),  TEAL_2_LT:    color(88,196,221,128),
      TEAL_2:       color(156,220,235,255), TEAL_2_LT:    color(156,220,235,128),

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

  // var initialize=function(){

      // if(app.lightsOn){   background(255); }
      // else            {   background(0);   }

      // draw_Lights();

      // fill(248);
      // rect(20, 20, 360, 360);
      // unit();
      // Ortho();

      // resetMatrix();
      // menu.refresh(mouseX, mouseY);

      // if(app.lightsOn){  fill(0);   }
      // else            {  fill(192); }

      // textSize(10);
      // textAlign(CENTER, CENTER);
      // text(app.theta + "º", 90,350);

      // draw_Index();

      if (app.autoPilot)  { app.theta+=1; app.theta%=360;}

  // };

  var increment=function(){

    app.theta++;

    if(app.theta>360){ app.theta=0; }

  };
  var decrement=function(){

    app.theta--;

    if(app.theta<0){ app.theta=360; }

  };

  var getSine=function()     { return app.data[app.theta].sin; };
  var getCosine=function()   { return app.data[app.theta].cos; };
  var getTangent=function()  { return app.data[app.theta].tan; };
  var getCosecant=function() { return app.data[app.theta].csc; };
  var getSecant=function()   { return app.data[app.theta].sec; };
  var getCotangent=function(){ return app.data[app.theta].cot; };
  
  var getAuto=function()     { return app.autoPilot;           };
  var getLegend=function()   { return app.legend;              };

  // Controls =========================================================

  // Control ===========================================================
  var control=function(id, x_coord, y_coord, width, height, execute, tag){

    // controls properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // this.i=c.i;                 // guid
    // this.parent=c.p;            // parent
    
    this.id=id;                 // Unique identification number

    this.x=x_coord;             // left
    this.y=y_coord;             // top
    this.w=width;               // width
    this.h=height;              // height

    this.execute=execute;       //  function to execute upon action
    
    this.on=false;              // Is the control on or off

    this.tag=tag;               //  generic property

    this.value=0;               // generic property    
    this.zOrder=0;              // z-order - in front or behind value
    this.hit=false;             // mouse is over the control
    this.visible=true;          // is the control currently being displayed
    // this.ctrls=ctrls;           // array of child controls

  };
  control.prototype.draw=function(){

    // for(var c in this.ctrls){ this.ctrls[c].draw(); }

  };
  control.prototype.clicked=function(){

    // if(this.hit && app.left){
      // commands(this.c, this.g);
      // for(var c in this.ctrls){ this.ctrls[c].clicked(); }
    // }

  };
  control.prototype.clickedR=function(){
    if(this.hit){
      // for(var c in this.ctrls){ this.ctrls[c].clickedR(); }
    }
  };
  control.prototype.moved=function(x,y){

    if(mouseX>this.x &&
       mouseX<this.x + this.w &&
       mouseY>this.y &&
       mouseY<this.y + this.h){
         
         this.hit=true;
         app.focus=this.id;
         
      }
      else{

        this.hit=false;

      }

  };
  control.prototype.dragged=function(){

    // for(var c in this.ctrls){ this.ctrls[c].dragged(); }

  };
  control.prototype.pressed=function(){

    // for(var c in this.ctrls){ this.ctrls[c].pressed(); }

  };
  control.prototype.released=function(){
    // this.hit=false;

    // for(var c in this.ctrls){ this.ctrls[c].released(); }

  };
  control.prototype.typed=function(){

    // for(var c in this.ctrls){ this.ctrls[c].typed(); }

  };
  control.prototype.over=function(){

    // for(var c in this.ctrls){ this.ctrls[c].over(); }

  };
  control.prototype.out=function(){

    this.hit=false;
    // for(var c in this.ctrls){ this.ctrls[c].out(); }

  };

  // Legend ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var legend=function(id, x_coord, y_coord, width, height, txt, execute, tag, clr){

      control.call(this, id, x_coord, y_coord, width, height, execute, tag);

      this.txt=txt;
      this.clr=clr;

      this.left=0;      //  Dynamic x-coordinate

    };
    legend.prototype=Object.create(control.prototype);
    legend.prototype.draw=function(){
      
      var p=this;

      // Border
      var border=function(){

        if(p.hit){ fill(getColor(CLRS.TEAL_0,85)); }
        else     { fill(getColor(CLRS.TEAL_0,75)); }

        stroke(getColor(CLRS.TEAL_0,100));

        rect(p.left, 0, p.w, p.h);

      }
      //  Properties
      var properties=function(){

        var h=15;

        var row0=30;

        var col0=p.left+20;
        var col1=p.left+30;
        var col2=p.left+130;
        
        if     ( app.legend && p.left>-200){ p.left-=10; }
        else if(!app.legend && p.left<0   ){ p.left+=10; }

        if(p.hit){

          app.current=this.id;
          fill(getColor(CLRS.WHITE,80));

        }
        else{

          fill(getColor(CLRS.WHITE,60));

        }

        textAlign(LEFT,CENTER);
        textSize(12);

        text("Telemetry",     col0, 20);

        textAlign(LEFT,CENTER);
        textSize(10);

        text("x: ",           col1, row0+h);
        text("y: ",           col1, row0+2*h);

        text("Left:",         col1, row0+4*h);
        text("Right:",        col1, row0+5*h);
        text("Center:",       col1, row0+6*h);
        
        text("Sine On:",      col1, row0+8*h);
        text("Cosine On:",    col1, row0+9*h);
        text("Tangent On:",   col1, row0+10*h);
        text("Cosecant On:",  col1, row0+11*h);
        text("Secant On:",    col1, row0+12*h);
        text("Cotangent On:", col1, row0+13*h);

        text("Theta ("+CONSTANTS.THETA+"):",      col1, row0+15*h);

        text("AutoPilot:",    col1, row0+17*h);

        text("Focus:",        col1, row0+19*h);
        
        text("Legend:",       col1, row0+21*h);
        
        fill(getColor(CLRS.YELLOW,75));
        textSize(11);
        textAlign(RIGHT,CENTER);
        
        text(mouseX,          col2, row0+h);
        text(mouseY,          col2, row0+2*h);

        text(app.left,        col2, row0+4*h);
        text(app.right,       col2, row0+5*h);
        text(app.center,      col2, row0+6*h);
        
        text(app.sinOn,       col2, row0+8*h);  //  Sine display
        text(app.cosOn,       col2, row0+9*h);  //  Cosine Display
        text(app.tanOn,       col2, row0+10*h); //  Tangent Display
        text(app.cscOn,       col2, row0+11*h); //  Cosecant Display
        text(app.secOn,       col2, row0+12*h); //  Secant Display
        text(app.cotOn,       col2, row0+13*h); //  Cotangent Display

        // text(app.data[app.theta].sin, col2, row0+11*h);
        // text(app.data[app.theta].cos, col2, row0+12*h);
        
        // if     (app.data[app.theta].tan> 100){ text( "Infinity", col2, row0+13*h);             }
        // else if(app.data[app.theta].tan<-100){ text("-Infinity", col2, row0+13*h);             }
        // else                                 { text(app.data[app.theta].tan, col2, row0+13*h); }

        // text(app.data[app.theta].csc, col2, row0+14*h);
        // text(app.data[app.theta].sec, col2, row0+15*h);
        // text(app.data[app.theta].cot, col2, row0+16*h);

        text(app.theta,       col2, row0+15*h);

        text(app.autoPilot,   col2, row0+17*h);
        
        text(app.focus,       col2, row0+19*h);

        text(app.legend,      col2, row0+21*h);
        
        var txt="Type or press the left and right arrow keys to increment and decrement theta.";
        
        textAlign(LEFT, TOP);
        
        text(txt, col0, row0 + 23*h, 170, 1000);

      }
      
      pushMatrix();

        translate(this.x, this.y);

          if(p.hit){            
            app.focus=this.id;
            cursor(WAIT);
          }
          
          border();
          properties();
          
      popMatrix();

    };
    legend.prototype.moved=function(){
      
      if(mouseX>this.x + this.left &&
        mouseX<this.x + this.w &&
        mouseY>this.y &&
        mouseY<this.y + this.h){
         
        this.hit=true;
        app.focus=this.id;
         
      }
      else{

        this.hit=false;

      }
      
    };
  }

  // Radio * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var radio=function(id, x_coord, y_coord, width, height, txt, execute, tag, clr){

      control.call(this, id, x_coord, y_coord, width, height, execute, tag);

      this.txt=txt;
      this.clr=clr;
      this.on=true;

    };
    radio.prototype=Object.create(control.prototype);
    radio.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

          ellipseMode(CENTER);

            if(this.hit){
              
              app.focus=this.id;
              cursor(HAND);
              
              stroke(getColor(this.clr, 75));
              
            }
            else{
              
              stroke(getColor(this.clr, 50));
              
            }

            if(this.on){ rotate(-PI/2); }
            else       { this.value=0;  }

            strokeWeight(2);
            noFill();

            arc(0, 0, this.w, this.h, -PI/4, 3*PI/2-PI/4);
            
            line(0, 1, 0, -9);

        popMatrix();

    };
    radio.prototype.clicked=function(){

      if(this.hit){
        this.execute();
        this.on=!this.on;      
      }

    };
    radio.prototype.moved=function(x,y){

      if(dist(mouseX, mouseY, 
              this.x, this.y)<this.w){ this.hit=true;  }
      else                           { this.hit=false; }

    };

  }
  
  // Settings * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var settings=function(id, x_coord, y_coord, width, height, txt, execute, tag, clr){

      control.call(this, id, x_coord, y_coord, width, height, execute, tag);

      this.txt=txt;
      this.clr=clr;
      this.on=true;

    };
    settings.prototype=Object.create(control.prototype);
    settings.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            noFill();
              
            if(this.hit){

              app.focus=this.id;
              cursor(HAND);
              
              fill(getColor(CLRS.BLACK,10));

            }

            rect(0, 0, this.w, this.h, 2, 2);

            fill(getColor(CLRS.BLACK, 65));
            noStroke();

            ellipse(this.w/2, this.h/2-6, 3, 3);
            ellipse(this.w/2, this.h/2,   3, 3);
            ellipse(this.w/2, this.h/2+6, 3, 3);

        popMatrix();

    };
    settings.prototype.clicked=function(){

      if(this.hit){
        this.execute();
        this.on=!this.on;
      }

    };

  }
  
  // Button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var button=function(id, x_coord, y_coord, width, height, txt, execute, tag, clr){

      control.call(this, id, x_coord, y_coord, width, height, execute, tag);

      this.txt=txt;
      this.clr=clr;
      this.on=true;

    };
    button.prototype=Object.create(control.prototype);
    button.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);
          scale(1,-1);
            
            // Border
            strokeWeight(1);

            if(this.hit){
              
              app.focus=this.id;
              cursor(HAND);

              fill(getColor(CLRS.WHITE,50));
              
              if(this.on){ stroke(this.clr);              }
              else       { stroke(getColor(this.clr,50)); }

            }
            else{

              fill(getColor(CLRS.WHITE,30));
              noStroke();

            }

            rect(0, -this.h, this.w, this.h, 2, 2);

            // Caption
            if(this.on){ fill(this.clr);              }
            else       { fill(getColor(this.clr,50)); }

            scale(1,-1);

            textAlign(LEFT,CENTER);
            
            textSize(12);
            text(this.txt, 10, this.h/2);

            textAlign(RIGHT,CENTER);

            var txt=this.tag();

            if(!(txt==null)){

              if      (txt> 100){ text( "Infinity", this.w-10, this.h/2); }
              else if (txt<-100){ text("-Infinity", this.w-10, this.h/2); }
              else              { text( txt,        this.w-10, this.h/2); }
              
            }

        popMatrix();

    };
    button.prototype.clicked=function(){

      if(this.hit){
        this.execute();
        this.on=!this.on;
      }

    };

  }

  // Unit Circle * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {  
    var unitCircle=function(id, x_coord, y_coord, width, height, execute, tag){

      control.call(this, id, x_coord, y_coord, width, height, execute, tag);

    };
    unitCircle.prototype=Object.create(control.prototype);
    unitCircle.prototype.draw=function(){

        var rTheta=0;       //  angle in radians
        var r=this.w;       //  radius
        var cs=3.5;         //  crossing size
        
        var p=this;         //  object reference

        var axes=function(){

            strokeWeight(1);
            stroke(CLRS.BLACK);

            line(-75,  0, 75,  0);
            line(  0,-75,  0, 75);

        };
        var circle=function(){

          if(p.hit){
            
            fill(getColor(CLRS.GRAY, p.value));
            stroke(getColor(CLRS.BLACK, 75));
            strokeWeight(1.25);
            
            if(p.value<25){ p.value+=2; }
            
          }
          else{

            noFill();
            stroke(getColor(CLRS.BLACK, 50));
            strokeWeight(1);

            p.value=5;

          }

          rTheta=radians(app.theta);

          ellipse(0, 0, 2*r, 2*r);

        };
        var intersections=function(){

          noStroke();
          fill(getColor(CLRS.BLACK, 40));

          ellipse( 0, r, cs, cs);
          ellipse( 0,-r, cs, cs);
          ellipse( r, 0, cs, cs);
          ellipse(-r, 0, cs, cs);

        };
        var quadrants=function(){

          textAlign(CENTER, CENTER);
          textSize(14);
          noStroke();
          fill(getColor(CLRS.BLACK, 25));

          var w=r*0.55;  // Distance along radius

          text("I",   w*cos(radians( -45)),  w*sin(radians( -45)));
          text("II",  w*cos(radians(-135)),  w*sin(radians(-135)));
          text("III", w*cos(radians( 135 )), w*sin(radians( 135)));
          text("IV",  w*cos(radians(  45)),  w*sin(radians(  45)));

        };
        var theta=function(){

          // Hypotenuse
          strokeWeight(1);
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
          fill(getColor(CLRS.GRAY, 20));
          
          triangle(            0,             0,
                   cos(rTheta)*r, sin(rTheta)*r,
                   cos(rTheta)*r, 0);

          noStroke();
          fill(getColor(CLRS.BLACK, 100));

          ellipse(cos(rTheta)*r, sin(rTheta)*r, cs, cs);
          ellipse(cos(rTheta)*r, 0,             cs, cs);
          ellipse(0,             0,             cs, cs);

          // Theta Text  ----------
          textSize(11);
          textAlign(CENTER,CENTER);

          var tw=textWidth(app.theta+CONSTANTS.DEGREES);

          noStroke();
          
          fill(CLRS.WHITE);

          rect(-tw/2, -r*1.35-7.5, tw+2, 15);

          fill(CLRS.BLACK);

          scale(1,-1);

          text(app.theta+CONSTANTS.DEGREES, 0, r*1.35);

        };

        pushMatrix();

          translate(this.x, this.y);
          scale(1, -1);

            if(this.hit){

              app.focus=this.id;
              cursor(ARROW);

              var d=round(degrees(atan2(mouseY-this.y, mouseX-this.x)));

              if(d<0){ d+=360; }

              app.theta=360-d;

            }

            axes();
            circle();
            intersections();
            theta();
            quadrants();

        popMatrix();

    };
    unitCircle.prototype.moved=function(x,y){

      if(!app.autoPilot){

        if(dist(mouseX, mouseY,
                this.x, this.y)<this.w){

          this.hit=true;

        }
        else {

          this.hit=false;

        }

      }

    };

  }

  // Graph ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var graph=function(id, x_coord, y_coord, width, height, execute, tag){

      control.call(this, id, x_coord, y_coord, width, height, execute, tag);

      this.innerHit=false;

    };
    graph.prototype=Object.create(control.prototype);
    graph.prototype.draw=function(){

      //  each end of a non-contiguous curve requires 2 terminating points

      var p=this;

      var min=0;
      var max=360;

      var h=540;      //  height
      var h2=h/2;     //  height / 2
      var gw=h/16;    //  grid width
      var f=4*gw;     //  coefficient to account for grid size

      var borderColor=CLRS.BORDER;

      var innerHit=this.innerHit;
      
      var container=function(){
        
        fill(CLRS.WHITE);
        stroke(getColor(CLRS.BLACk,30));
        
        // rect(-20, p.h/2, p.w, p.h);
        
      };
      var border=function(){
        
        noFill();
        stroke(CLRS.GREEN);
        strokeWeight(0.5);

        // rect(0, -270, p.w, p.h);
          
        stroke(CLRS.BLUE);
        strokeWeight(2);

        // rect(0,-270,540,540);

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

        line(-5,       0, p.w-30,       0); // x-axis
        line(0, -p.h/2+10,      0, p.h/2-10); // y-axis

      };
      var arrows=function(){

        fill(CLRS.ARROWS);
        noStroke();

        quad(555, 0, 545, -3, 547, 0, 545, 3);    // x-right
        // quad(-20, 0, -10, -3, -12, 0, -10, 3);    // x-left

        quad(0,  283, -3,  273, 0,  275, 3,  273);    // y-top
        quad(0, -283, -3, -273, 0, -275, 3, -273);    // y-bottom

      };
      var grid=function(){

        //  Background
        fill(getColor(CLRS.WHITE,95));
        noStroke();
        
        // rect(0,0,540,540);

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

            text( "π/2",  gw*4+29, 587);
            text(   "π",  gw*8+29, 587);
            text("3π/2", gw*12+29, 587);
            text(  "2π", gw*16+29, 587);

            textAlign(RIGHT,CENTER);

            text("0",18,315);

            // y-axis
            for(n=1; n<p.h/2/gw; n++){

              if(n%4==0){
                text( n/4, 18, 315-n*gw);  //  Positive y-axis
                text(-n/4, 18, 315+n*gw);  //  Negative y-axis
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

      var thetaMap=function(t){
        return map(t, 0, 360, 0, 540);
      };
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
              y=app.data[n].sin*f;

              curveVertex(x, y);

            }

          curveVertex(x,y);

        endShape();

        // Current Value
        // if(p.innerHit){

          stroke(CLRS.SIN);
          fill(CLRS.SIN);

          var val=app.data[app.theta].sin*f;

          ellipse(thetaMap(app.theta), val, 5, 5);

        // }

      };
      var cosineCurve=function(){

        stroke(CLRS.COS);
        noFill();

        var x=0;
        var y=app.data[0].cos*f;

        beginShape();

          curveVertex(x,y);

            for(var n=app.MIN; n<=app.MAX; n++){

              x=n/app.MAX*h;
              y=app.data[n].cos*f;

              curveVertex(x, y);

            }

          curveVertex(x,y);

        endShape();

        // Current Value
        // if(p.innerHit){

          stroke(CLRS.COS);
          fill(CLRS.COS);

          var val=app.data[app.theta].cos*f;

          ellipse(thetaMap(app.theta), val, 5, 5);

        // }

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

        // if(p.innerHit){

          var val=app.data[app.theta].tan*f;

          if(val>=-h2 && val<=h2){

            stroke(CLRS.TAN);
            fill(CLRS.TAN);

            ellipse(thetaMap(app.theta), val, 5, 5);

          }

        // }

      };
      var cosecantCurve=function(){

        fill(CLRS.SIN_LT);
        noStroke();

        var x=0;
        var y=0;
        var n=0;

        for(n=1; n<180; n+=2){

          x=n/app.MAX*h;
          y=app.data[n].csc*f;

          if(y>=-h2 && y<=h2){ ellipse(x, y, 2, 2); }

        }

        for(n=181; n<app.MAX; n+=2){

          x=n/app.MAX*h;
          y=app.data[n].csc*f;

          if(y>=-h2 && y<=h2){ ellipse(x, y, 2, 2); }

        }

        // Current Value
        // if(p.innerHit){

          var val=app.data[app.theta].csc*f;

          if(val>=-h2 && val<=h2){

            stroke(CLRS.SIN_LT);

            ellipse(thetaMap(app.theta), val, 5, 5);

          };

        // }

      };
      var secantCurve=function(){

        fill(CLRS.COS_LT);
        noStroke();

        var x=0;
        var y=app.data[0].sec;
        var n=0;

        for(n=1; n<90; n+=2){

          x=n/app.MAX*h;
          y=app.data[n].sec*f;

          if(y>=-h2 && y<=h2){ ellipse(x, y, 2, 2); }

        }

        for(n=91; n<270; n+=2){

          x=n/app.MAX*h;
          y=app.data[n].sec*f;

          if(y>=-h2 && y<=h2){ ellipse(x, y, 2, 2); }

        }

        for(n=271; n<=app.MAX; n+=2){

          x=n/app.MAX*h;
          y=app.data[n].sec*f;

          if(y>=-h2 && y<=h2){ ellipse(x, y, 2, 2); }

        }

        // Current Value
        // if(p.innerHit){

          var val=app.data[app.theta].sec*f;

          if(val>=-h2 && val<=h2){

            stroke(CLRS.COS_LT);
            fill(CLRS.COS_LT);

            ellipse(thetaMap(app.theta), val, 5, 5);

          };

        // }

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
          y=app.data[n].cot*f;

          if(y>=-h2 && y<=h2){ ellipse(x, y, 2, 2); }

        }

        for(n=181; n<=app.MAX; n+=incr){

          x=n/app.MAX*h;
          y=app.data[n].cot*f;

          if(y>=-h2 && y<=h2){ ellipse(x, y, 2, 2); }

        }

        // Current Value
        // if(p.innerHit){

          var val=app.data[app.theta].cot*f;

          if(val>=-h2 && val<=h2){

            stroke(CLRS.TAN_LT);

            ellipse(thetaMap(app.theta), val, 5, 5);

          };

        // }

      };

      var quadrants=function(){

        pushMatrix();

          scale(1,-1);

            fill(getColor(CLRS.BLACK,25));
            textAlign(CENTER,CENTER);
            textSize(48);

            text("I",   67.25    , 0);
            text("II",  67.25+135, 0);
            text("III", 67.25+270, 0);
            text("IV",  67.25+405, 0);

        popMatrix();

      }

      // Draw --------------------------------------------------------------------------------
      pushMatrix();

        translate(this.x, this.y);
        scale(1,-1);

          // noFill();

          if(mouseX>=30 &&
             mouseX<=570 &&
             mouseY>=40 &&
             mouseY<=580){

            this.innerHit=true;  

            app.focus=this.id;
            cursor(MOVE);

            if(!app.autoPilot){
              app.theta=round(map(mouseX-this.x,0,540,0,360));
            }

            border();
                      
          }
          else{

            this.innerHit=false;

          }
          
          container();
          axes();
          grid();
          arrows();
          origin();
          ticks();
          labels();

          if(app.quadrantsOn){ quadrants();      }

          if(app.sinOn      ){ sineCurve();      }
          if(app.cscOn      ){ cosecantCurve();  }

          if(app.cosOn      ){ cosineCurve();    }
          if(app.secOn      ){ secantCurve();    }

          if(app.tanOn      ){ tangentCurve();   }
          if(app.cotOn      ){ cotangentCurve(); }

          // if(this.innerHit  ){ cursor(ARROW);    }

      popMatrix();

    };

  }

  var toggleSin=function(){ app.sinOn=!app.sinOn; };
  var toggleCos=function(){ app.cosOn=!app.cosOn; };
  var toggleTan=function(){ app.tanOn=!app.tanOn; };
  var toggleCsc=function(){ app.cscOn=!app.cscOn; };
  var toggleSec=function(){ app.secOn=!app.secOn; };
  var toggleCot=function(){ app.cotOn=!app.cotOn; };

  var toggleAuto=function(){ app.autoPilot=!app.autoPilot; };
  
  var toggleLegend=function(){ app.legend=!app.legend; };

  app.controls.push(new graph(0, 30, 315, 580, 580));
  
  app.controls.push(new unitCircle(1, 131, 450, 61.5, 61.5));

  app.controls.push(new radio(2, 17, 15, 13, 13, "NO TEXT", toggleAuto, getAuto, CLRS.BLACK));
    
  app.controls.push(new button(3, 175, 45, 110, 20, "Sin "+CONSTANTS.THETA, toggleSin, getSine,      CLRS.SIN));
  app.controls.push(new button(4, 175, 65, 110, 20, "Cos "+CONSTANTS.THETA, toggleCos, getCosine,    CLRS.COS));
  app.controls.push(new button(5, 175, 85, 110, 20, "Tan "+CONSTANTS.THETA, toggleTan, getTangent,   CLRS.TAN));

  app.controls.push(new button(6, 305, 45, 110, 20, "Csc "+CONSTANTS.THETA, toggleCsc, getCosecant,  CLRS.SIN));
  app.controls.push(new button(7, 305, 65, 110, 20, "Sec "+CONSTANTS.THETA, toggleSec, getSecant,    CLRS.COS));
  app.controls.push(new button(8, 305, 85, 110, 20, "Cot "+CONSTANTS.THETA, toggleCot, getCotangent, CLRS.TAN));
  
  app.controls.push(new legend(9, 600, 30, 200, 570, "Legend", "", "", CLRS.TEAL_0));
  
  app.controls.push(new settings(10, 575, 5, 22, 22, "Settings", toggleLegend, getLegend, CLRS.TEAL_2));

  var toolbar=function(){

    noStroke();
    fill(CLRS.TEAL_1);

    rect(0,0,600,30);
    
    fill(getColor(CLRS.WHITE,75));
    
    textAlign(CENTER,CENTER);
    textSize(16);
    
    text("Trig Curves", 300,15);
    
  };
  
  var draw= function() {
    
    pushMatrix();
    
      translate(0.5, 0.5);
      
        background(242);

        toolbar();

        // initialize();
        for(var c in app.controls){ app.controls[c].draw(); }

        if(app.autoPilot){

          app.theta+=1;
          if(app.theta>360){ app.theta=0; }

        }

        if(app.DEBUG){
          // telemetry();
        }
        
    popMatrix();
    
  };

  // Keyboard Events ==================================================
  {

    var keyPressed = function() {


      if(keyCode==KEYCODES.RIGHT){ if(!app.autoPilot){ increment(); } }
      if(keyCode==KEYCODES.LEFT) { if(!app.autoPilot){ decrement(); } }

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
    var mousePressed=function(){

    switch(mouseButton){

        case LEFT:    app.left=true;    break;
        case CENTER:  app.center=true;  break;
        case RIGHT:   app.right=true;   break;

        default:                        break;

      }
      
    };
    var mouseReleased=function(){
      
      app.left=false;
      app.right=false;
      app.center=false;

    };
    var mouseMoved=function(){

      app.mouseX=mouseX;
      app.mouseX=mouseY;

      for(var c in app.controls){ app.controls[c].moved(0,0); }

    };
    var mouseOut=function(){

      for(var c in app.controls){ app.controls[c].out(); }
      app.focus=-1;
      // menu.refresh(100,100);

    };
    var mouseOver=function(){

      for(var c in app.controls){ app.controls[c].over(); }
      // app.autoPilot=false;

    };

  }

}};


















































































// 1729 = 10^3+9^3 = 12^3+1^3
