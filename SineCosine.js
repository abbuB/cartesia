/*  TBD

    TO DO:
        
        - page focus on mouseOver possible?????

        - tooltips?
        
      Implemented but ***** NEEDS WORK *****
        
        - dashed line for secondary trig ratios
        
        - graph large cross hair cursor 

        - update on mouseMove

    Research:

        - question list
        - Addition and subtraction trig identities
        - Law of cosines
        - Pythagorean identities        

    TO DONE:
        
        - ask question on Khan to determine trig ratios for given values.
          In other words, when is tan(theta)=2, etc.
          
        - mouseOut/mouseOver twitchyness
        
        - differentiate left/right/center mouse clicks
        
        - optimize graph display (ellipses vs curves...)
        
        - tidy up controls to accomodate arbitrary positions
        
        - add focus cursor to control params
    
        - create checkbox object for graph features, etc.
        
        - create props object that contains arbitrary number of named props

        - defocus all controls after parent has lost focus
        - cursor remains after leaving control boundary
        
        - nest controls

        - fix boundary conditions on all trig ratios above 2 and below -2        
        - create toolbar object
        - onOff control
        - fix cursor/theta correlation        
        - create a container object
        - legend button
        - disable arrows while autoRun is on

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

  var application=function(){

      this.debug=true;          //  mode that displays enhanced debugging tools

      this.frameRate=0 ;        //  refresh speed

      this.mouseX=0;            //  current mouseX location
      this.mouseY=0;            //  current mouseY location

      this.left=false;          //  Is the left mouse button pressed
      this.right=false;         //  Is the right mouse button pressed
      this.center=false;        //  Is the center mouse button pressed

      this.controls=[];         //  collection of controls in the app

      this.keys=[];             //  Array holding the value of all keycodes

      this.focus=0;             //  The ID of the control with focus
      
      /* App Specific */
      this.data=[];             //  Values of each trig function from 0 (zero) to 360
            
      this.legend=false;        //  Is the legend displayed
      this.index=true;          //  Is the Index displayed
      this.unitCircle=true;     //  Is the unit circle displayed
      this.quadrants=true;      //  Display the quadrants

      this.autoRun=false;        //  Alpha changes automatically

      this.theta=0;             //   Current angle

      this.MIN=0;
      this.MAX=360;

      this.sinOn=true;          //  Display the sine curve
      this.cosOn=true;          //  Display the cosine curve
      this.tanOn=true;          //  Display the tangent curve

      this.cscOn=true;          //  Display the cosecant curve
      this.secOn=true;          //  Display the secant curve
      this.cotOn=true;          //  Display the cotangent curve

      this.initialize=function(){

        frameRate(0);
      
        cursor(WAIT);

        angleMode="radians";

        this.loadData();

        size(600, 600); // set size of canvas

      };
      this.loadData=function(){

          var sinN, cosN, tanN, secN, cscN, cotN;

          for (var n=this.MIN; n<=this.MAX; n++){

              sinN=sin(radians(n)).toFixed(4);
              cscN=       (1/sinN).toFixed(4);
              cosN=cos(radians(n)).toFixed(4);
              secN=       (1/cosN).toFixed(4);
              tanN=tan(radians(n)).toFixed(4);
              cotN=       (1/tanN).toFixed(4);

              this.data.push({  sin:  sinN, csc:  cscN,
                                cos:  cosN, sec:  secN,
                                tan:  tanN, cot:  cotN });
          }

      };

    };

  var app=new application();

  app.initialize();

  /* Constants ======================================================= */
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
      
      TOOLBARA:     color( 41,171,202,255),
      TOOLBARI:     color( 69,174,200,255),

      GRAPHA:       color(235,235,235,255),
      GRAPHI:       color(230,230,230,255),
      
      ACTIVE:       color( 28,117,138,255),
    
      CYAN:         color( 49,204,167,255),
    
      TEAL_0:       color( 28,117,138,255), TEAL_0_LT:    color( 28,117,138,128),
      TEAL_1:       color( 41,171,202,255), TEAL_1_LT:    color( 41,171,202,128),
      TEAL_2:       color( 88,196,221,255), TEAL_2_LT:    color( 88,196,221,128),
      TEAL_3:       color(156,220,235,255), TEAL_3_LT:    color(156,220,235,128),

      TRANSPARENT:  color(-1,-1,-1),

      RED:          color(170, 29, 29),     GREEN:        color(158,182, 58),
      BLUE:         color( 29, 86,170),     YELLOW:       color(238,214, 15),
      ORANGE:       color(238,136, 15),     GRAY:         color(128,128,128),

      BROWN:        color(155,145,135),

      control:      color(128,128,128),     controlF:     color(242,242,242),

      TEXT:         color(255,255,255),

      Red:          color(255,  0,  0),     RedOrange:    color(255, 81,  0),
      Orange:       color(255,127,  0),     YellowOrange: color(255,190,  0),
      Yellow:       color(255,255,  0),

      YellowGreen:  color(192,255,  0),
      Green:        color(  0,255,  0),     BlueGreen:    color(  0,127,127),
      Blue:         color(  0,  0,255),     BlueViolet:   color( 92,  0,255),

      Violet:       color(127,  0,255),     RedViolet:    color(191,  0,127),

      GRAY1:        color(255*10/11),       GRAY2:        color(255*9/11),
      GRAY3:        color(255*8/11),        GRAY4:        color(255*7/11),
      GRAY5:        color(255*6/11),        GRAY6:        color(255*5/11),
      GRAY7:        color(255*4/11),        GRAY8:        color(255*3/11),
      GRAY9:        color(255*2/11),        GRAY10:       color(255*1/11),
      WHITE:        color(255,255,255),     BLACK:        color(0,0,0),

      BUTTONH:      color( 16, 16, 16),     BUTTON:       color( 24, 24, 24),

      GRID:         color( 33, 40, 48),

      VERTEX:       color(255,255,  0),
      VERTEXA:      color(255*6/11),
      LINE:         color(255*6/11),
      LINEA:        color(170,29,29),
      FILL:         color(255*7/11),
      FILLA:        color(255*7/11),

      RULER:        color(231,189, 33),

      SELECTED:     color(  0,  0,255),
      HIT:          color(255,  0,  0),

      ARROWS:       color( 32, 32, 32),
      AXES:         color( 64, 64, 64),
      TICKS_LT:     color(128,128,128),     TICKS_DARK:       color( 32, 32, 32),
      GRID_LINES_LT:color(192,192,192),     GRID_LINES_DARK:  color(128,128,128),
      LABELS:       color(128,128,128),
      ORIGIN:       color(128,128,128),

      BORDER:       color(128,  0,  0),

      SIN:          color(170, 29, 29,255), SIN_LT:       color(170, 29, 29,128),
      COS:          color( 29, 86,170,255), COS_LT:       color( 29, 86,170,128),
      TAN:          color(158,182, 58,255), TAN_LT:       color(158,182,58,192),

      CSC:          color(238,136, 15,255), CSC_LT:       color(238,136, 15,128),
      SEC:          color(158,182, 58,255), SEC_LT:       color(158,182, 58,128),
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
    };
    var CONSTANTS={

      DEGREES:  "°",
      PI:       "π",
      UP_ARROW: "▲",
      INFINITY: "∞",
      THETA:    "θ"

    };
    var TRIG_INDEX={
      SIN:  0,
      CSC:  1,
      COS:  2,
      SEC:  3,
      TAN:  4,
      COT:  5
    };

  }
    
  /* Helper Functions ========================================================= */
  {
    
    var getColor=function(clr, alpha){ return color(red(clr), green(clr), blue(clr), alpha/100*255); };

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

    var getAuto=function()     { return app.autoRun;  };
    var getLegend=function()   { return app.legend;   };

    var getSineOn=function()     { return app.sinOn; };
    var getCosineOn=function()   { return app.cosOn; };
    var getTangentOn=function()  { return app.tanOn; };
    var getCosecantOn=function() { return app.cscOn; };
    var getSecantOn=function()   { return app.secOn; };
    var getCotangentOn=function(){ return app.cotOn; };
    
    var toggleSin=function(){ app.sinOn=!app.sinOn; };
    var toggleCos=function(){ app.cosOn=!app.cosOn; };
    var toggleTan=function(){ app.tanOn=!app.tanOn; };
    var toggleCsc=function(){ app.cscOn=!app.cscOn; };
    var toggleSec=function(){ app.secOn=!app.secOn; };
    var toggleCot=function(){ app.cotOn=!app.cotOn; };

    var checkboxAuto=function()  { 

      app.autoRun=!app.autoRun;

      // if(app.autoRun){ loop();   }
      // else           { noLoop(); }

    };
    var checkboxLegend=function(){ app.legend=!app.legend;   };

    var drawOrigin=function(){

      fill(CLRS.RED);
      noStroke();

      ellipse(0,0,20,20);

    };

  }
    
  /* Controls ========================================================= */
  {
      
    // Control ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {
      
      var control=function(id, parent, x, y, w, h){

        // explicit properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        this.id=id;                 /* Unique identification number -- Change to GUID for production) */
        
        this.parent=parent;         /* parent control (acts as a container) */
        
        this.x=x;                   /* left */
        this.y=y;                   /* top */
        this.w=w;                   /* width */
        this.h=h;                   /* height */

        // inherent properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        this.controls=[];           /* array of child controls */

        this.on=false;              /* Is the control on or off */
        this.hit=false;             /* mouse is over the control */

      };
      control.prototype.draw=function(){};
      control.prototype.clicked=function(){

        if(this.hit){

          for(var c in this.controls){ this.controls[c].clicked(); }

        }

      };
      control.prototype.clickedR=function(){};
      control.prototype.moved=function(x,y){

        if(mouseX>(this.x+x) &&
           mouseX<(this.x+x) + this.w &&
           mouseY>(this.y+y) &&
           mouseY<(this.y+y) + this.h){

          this.hit=true;

          for(var c in this.controls){ this.controls[c].moved((this.x+x), (this.y+y)); }

        }
        else{

          this.hit=false;

        }

      };
      control.prototype.dragged=function(){};
      control.prototype.pressed=function(){};
      control.prototype.released=function(){

        // for(var c in this.controls){ this.controls[c].released(); }

      };
      control.prototype.typed=function(){};
      control.prototype.over=function(){};
      control.prototype.out=function(){
        this.hit=false;
        app.focus=-1;
        for(var c in this.controls){ this.controls[c].out(); }
      };

    }

    // root ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {
      /* Identical to a container control except is doesn't have a parent */
      var root=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.text=params.text;
        this.activecolor=params.activecolor;
        this.inactivecolor=params.inactivecolor;
        this.left=0;
        this.cursor=params.cursor;
        this.border=params.border;

      };
      root.prototype=Object.create(control.prototype);
      root.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            
            fill(this.inactivecolor);

            if(this.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(this.activecolor);

            }

            if(this.border){
              strokeWeight(5);
              stroke(this.activecolor);
            }

            rect(0, 0, this.w, this.h);

            // Draw child controls
            for(var c in this.controls){ this.controls[c].draw(); }
                    
        popMatrix();

      };
      
    }

    // Container ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var container=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.text=params.text;
        this.color=params.color;
        this.cursor=params.cursor;
        this.border=params.border;

      };
      container.prototype=Object.create(control.prototype);
      container.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();          
            fill(getColor(this.color, 5));

            if(this.hit && 
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(getColor(this.color, 10));

            }

            if(this.border){
              
              strokeWeight(1);
              stroke(getColor(this.color, 50));
              
            }

            rect(0, 0, this.w, this.h, this.execute);

            // Draw child controls
            for(var c in this.controls){ this.controls[c].draw(); }
                    
        popMatrix();

      };
      
    }

    // Index ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var index=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.radius=params.radius;
        this.color=params.color;
        this.cursor=params.cursor;
        
      };
      index.prototype=Object.create(control.prototype);
      index.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            strokeWeight(1);
            stroke(getColor(CLRS.BLACK, 20));
            fill(getColor(this.color, 50));

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              stroke(getColor(CLRS.BLACK, 40));
              fill(getColor(this.color, 75));

            }

            rect(0, 0, this.w, this.h, this.radius);

            // Draw child controls          
            for(var c in this.controls){ this.controls[c].draw(); }
      
        popMatrix();

      };
      
    }

    // Toolbar ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var toolbar=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.text=params.text;
        this.activecolor=params.activecolor;
        this.inactivecolor=params.inactivecolor;
        this.cursor=params.cursor;

      };
      toolbar.prototype=Object.create(control.prototype);
      toolbar.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            fill(this.inactivecolor);

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(this.activecolor);

            }

            rect(0, 0, this.w, this.h);
            
            // Caption
            fill(CLRS.WHITE);
            textSize(16);
            textAlign(CENTER,CENTER);

            text(this.text, this.w/2, this.h/2);

            // Draw child controls
            for(var c in this.controls){ this.controls[c].draw(); }
            
        popMatrix();

      };

    }
    
    // Legend ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {
    
      var legend=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.color=params.color;
        this.cursor=params.cursor;

        this.offset=0;      /*  Dynamic x-coordinate */

      };
      legend.prototype=Object.create(control.prototype);
      legend.prototype.draw=function(){

        var p=this;
              
        // Border
        var border=function(){
         
          strokeWeight(1);
          stroke(getColor(p.clr,100));

          if(p.hit){ fill(getColor(p.clr, 75)); }
          else     { fill(getColor(p.clr, 70)); }

          rect(p.offset, 0, p.w, p.h);

        };

        //  Properties
        var properties=function(){

          var row0=30;

          var col0=p.offset+20;
          var col1=p.offset+30;
          var col2=p.offset+130;

          if     ( app.legend && p.offset>-200){ p.offset-=10; }
          else if(!app.legend && p.offset<0   ){ p.offset+=10; }

          if(this.hit){ fill(getColor(CLRS.WHITE,80)); }
          else        { fill(getColor(CLRS.WHITE,60)); }

          /* Title ------------------------- */
          textAlign(CENTER,CENTER);
          textSize(12);
          fill(CLRS.WHITE);

            text("Debug Telemetry",     p.w/2+p.offset, 20);

          /* Mouse Coordinates ------------------------- */
          textSize(10);
          textAlign(LEFT,TOP);
          textLeading(14);

          fill(getColor(CLRS.TEAL_2,75));

            text("Mouse Coordinates \n\n\n\n" +
                 "Mouse Buttons     \n\n\n\n\n" +
                 "Controls          \n\n\n\n" +
                 "Keys              \n\n\n\n\n" +
                 "App               \n\n\n\n",
                 col1, row0+15);

          /* app.focus is required to be done after control update in main draw sub */

          fill(getColor(CLRS.WHITE,75));

            text("         \n" +
                 "x:       \n" +
                 "y:       \n\n\n" +
                 "Left:    \n" +
                 "Right:   \n" +
                 "Center:  \n\n\n" +
                 "Focus:   \n" +
                 "Focused: \n\n\n" +
                 "Alt:     \n"+
                 "Control: \n"+
                 "Shift:   \n\n\n" +
                 "Legend:  \n"+
                 "Autorun: \n"+
                 "Theta:   \n",
                 col1, row0+15);

          fill(getColor(CLRS.YELLOW,75));

            text("\n" +
                 mouseX      + "\n" +
                 mouseY      + "\n\n\n" +
                 app.left    + "\n" +
                 app.right   + "\n" +
                 app.center  + "\n\n\n\n" +
                 focused     + "\n\n\n" +
                 app.keys[KEYCODES.ALT]     + "\n" +
                 app.keys[KEYCODES.CONTROL] + "\n" +
                 app.keys[KEYCODES.SHIFT]   + "\n\n\n" +
                 app.legend  + "\n" +
                 app.autoRun + "\n" +
                 app.theta   + "\n",
                 col2, row0+15);

          var txt="Press the left and right arrow keys to increment and decrement theta.";

          textSize(11);
          textAlign(LEFT,BOTTOM);

            text(txt, p.offset+17, row0 + 480, p.w-20, 100);
          
        };
        
        pushMatrix();

          translate(this.x, this.y);

            if(this.hit &&
               this.parent.hit){
              
              app.focus=this.id;
              cursor(this.cursor);

            }

            if     ( app.legend && this.offset>-200){ this.offset-=10; }
            else if(!app.legend && this.offset<0   ){ this.offset+=10; }

            border();
            properties();

            // Draw child controls
            for(var c in this.controls){ this.controls[c].draw(); }

            /* The following is outside the properties function because
               it has to be done after the child controls are drawn to
               maintain proper control focus                              */
            fill(getColor(CLRS.YELLOW,75));
            textSize(10);
            textAlign(LEFT,CENTER);

            text(app.focus, this.offset+130, 190);
            
        popMatrix();

      };
      legend.prototype.moved=function(x,y){
      /* Overridden because of the dynamic x-coordinate offset */

        if(mouseX>this.x+x+this.offset &&
           mouseX<this.x+x+this.offset + this.w &&
           mouseY>this.y+y &&
           mouseY<this.y+y + this.h){

          this.hit=true;

          for(var c in this.controls){ this.controls[c].moved(this.x+x+this.offset, this.y+y); }

        }
        else{

          this.hit=false;

        }

      };

    }

    // OnOff * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var onOff=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.execute=params.execute;
        this.retrieve=params.retrieve;
        this.color=params.color;
        this.cursor=params.cursor;

      };
      onOff.prototype=Object.create(control.prototype);
      onOff.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            ellipseMode(CENTER);

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              stroke(getColor(this.color, 75));

            }
            else{

              stroke(getColor(this.color, 50));

            }

            if(this.on){ rotate(-PI/2); }
            else       { this.value=0;  }

            strokeWeight(2);
            noFill();

            arc(0, 0, this.w, this.h, -PI/4, 3*PI/2-PI/4);

            line(0, 1, 0, -9);

        popMatrix();

      };
      onOff.prototype.moved=function(x,y){
      /* Overridden because the control is round */
        if(dist(mouseX, mouseY,
                this.x+x, this.y+y)<this.w){
          
          this.hit=true;
          
          for(var c in this.controls){ this.controls[c].moved(this.x+x, this.y+y); }
          
        }
        else{
          
          this.hit=false;
          
        }

      };
      onOff.prototype.clicked=function(){
      /* Overridden to maintain on/off value */
      
        if(this.hit){
          this.execute();
          this.on=!this.on;
        }

      };

    }

    // Settings * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var settings=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.execute=params.execute;
        this.retrieve=params.retrieve;
        this.color=params.color;
        this.cursor=params.cursor;

      };
      settings.prototype=Object.create(control.prototype);
      settings.prototype.draw=function(){

        var offset=0;
        
        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            noFill();

            if(this.hit &&
               this.parent.hit){
              
              if(app.left){ offset=1; }

              app.focus=this.id;
              cursor(this.cursor);

              fill(getColor(this.color,10));

            }

            //  Background
            rect(offset, offset, this.w, this.h, 2);

            // Icon
            fill(getColor(this.color, 65));
            noStroke();

            ellipse(this.w/2+offset, this.h/2-6+offset, 3, 3);
            ellipse(this.w/2+offset, this.h/2,          3, 3);
            ellipse(this.w/2+offset, this.h/2+6+offset, 3, 3);

        popMatrix();

      }; 
      settings.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.hit){
          
          this.execute();
          this.on=!this.on;
          
          for(var c in this.controls){ this.controls[c].clicked(); }
          
        }

      };

    }

    // Button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var button=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.execute=params.execute;
        this.retrieve=params.retrieve;
        this.tag=params.tag;
        this.text=params.text;
        this.color=params.color;
        this.cursor=params.cursor;
        
        this.on=false;
        
      };
      button.prototype=Object.create(control.prototype);
      button.prototype.draw=function(){

          var offset=0;
          this.on=this.retrieve();

          pushMatrix();

            translate(this.x, this.y);
            scale(1,-1);

              // Border
              strokeWeight(0.75);

              fill(getColor(CLRS.ACTIVE, 5));
              noFill();
              noStroke();
                
              if(this.hit &&
                 this.parent.hit){

                if(app.left){ offset=1; }

                app.focus=this.id;
                cursor(this.cursor);

                // stroke(getColor(this.parent.color,0));
                
                noStroke();
                
                if(this.on){ fill(getColor(this.color,100)); }
                else       { fill(getColor(this.color, 50)); }

              }

              rect(offset, -this.h-offset, this.w, this.h, 3);

              // Caption
              if(this.hit &&
                 this.parent.hit){

                fill(255,255,255);

              }
              else{

                if(this.on){ fill(this.color);              }
                else       { fill(getColor(this.color,50)); }

              }

              scale(1,-1);

              textAlign(LEFT,CENTER);

              textSize(12);
              text(this.text, 10+offset, this.h/2+offset);
              
              if(this.on){

                textAlign(RIGHT,CENTER);
                
                var txt=this.tag();

                if(txt!==""){

                  if      (txt> 100){ text( "Infinity", this.w-10+offset, this.h/2+offset); }
                  else if (txt<-100){ text("-Infinity", this.w-10+offset, this.h/2+offset); }
                  else              { text( txt,        this.w-10+offset, this.h/2+offset); }

                }

              }

          popMatrix();

      };
      button.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.hit){
          
          this.execute();
          this.on=!this.on;
          
          for(var c in this.controls){ this.controls[c].clicked(); }
                  
        }

      };

    }
    
    // Checkbox ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var checkbox=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.text=params.text;
        this.execute=params.execute;
        this.retrieve=params.retrieve;
        this.color=params.color;
        this.cursor=params.cursor;

      };
      checkbox.prototype=Object.create(control.prototype);
      checkbox.prototype.draw=function(){

        pushMatrix();
          
          //  Required because of dynamic parent location
          translate(this.x + this.parent.offset, this.y);

            this.on=this.retrieve();

            stroke(CLRS.BLACK);
            strokeWeight(1);
            fill(getColor(CLRS.WHITE, 10));

            if(this.hit &&
               this.parent.hit){

              cursor(this.cursor);
              app.focus=this.id;

              fill(getColor(this.color, 15));

            }

            //  Determine how wide the text is
            textSize(11);
            textAlign(LEFT,CENTER);

            this.w=40+textWidth(this.text);  /*  Add 40 pixels to accommodate the slider */

            //  Control border
            if(app.debug){
               // rect(-3, -3, this.w+6, this.h+6);
            }
            
            //  Outer checkbox circle
            strokeWeight(0.5);
            stroke(getColor(CLRS.BLACK,100));
            
            if(this.on){ fill(getColor(CLRS.WHITE, 45)); }
            else       { fill(getColor(CLRS.WHITE, 20)); }
            
              rect(0, 0, 30, this.h, this.h/2);   

            //  Inner checkbox circle
            fill(this.color);
            stroke(CLRS.GRAY);
            strokeWeight(0.5);

              if(this.on){ ellipse(this.h/2+1,  this.h/2+0.5, this.h-5, this.h-5); }
              else       { ellipse(this.h/2+15, this.h/2+0.5, this.h-5, this.h-5); }

            //  Text
            fill(getColor(CLRS.WHITE, 65)); 

              text(this.text, 35, this.h/2);

        popMatrix();

      };       
      checkbox.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.hit){
          
          this.execute();
          
          for(var c in this.controls){ this.controls[c].clicked(); }
                  
        }

      };
    
    }

    // Unit Circle * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var unitCircle=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.color=params.color;
        this.cursor=params.cursor;

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
              
              var r2=r*1.25;
              
              line(-r2,  0, r2,  0);
              line(  0,-r2,  0, r2);

          };
          var circle=function(){

            if(p.hit){

              fill(getColor(CLRS.TEAL_2, p.value));
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
            strokeWeight(1.5);
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

            if(p.hit){ fill(CLRS.GRAPHA); }
            else     { fill(CLRS.GRAPHI); }

              rect(-tw/2, -r*1.35-7.5, tw+2, 15);

            fill(CLRS.BLACK);

            scale(1,-1);

              text(app.theta+CONSTANTS.DEGREES, 0, -r*1.45);

          };

          pushMatrix();

            translate(this.x-0.5, this.y-0.5);
            scale(1, -1);

              if(this.hit &&
                 this.parent.hit &&
                 !app.autoRun){

                app.focus=this.id;
                cursor(this.cursor);

              }

              axes();
              circle();
              intersections();
              theta();
              quadrants();

          popMatrix();

      };
      unitCircle.prototype.moved=function(x,y){
      /* Overridden because of the shape - round */
      
        if(dist(mouseX, mouseY,
                this.x+x, this.y+y)<this.w){

          this.hit=true;

          if(!app.autoRun){

            var d=round(degrees(atan2(mouseY-this.y+y, mouseX-this.x+x)));

            if(d<0){ d+=360; }

            app.theta=360-d;

          }
          
          for(var c in this.controls){ this.controls[c].moved(this.x+x, this.y+y); }

        }
        else{

          this.hit=false;

        }

      };

    }

    // Graph ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var graph=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.activecolor=params.activecolor;
        this.inactivecolor=params.inactivecolor;
        this.cursor=params.cursor;

        this.gridHit=false;

        this.gridOn=true;
        this.axesOn=true;
        this.originOn=true;
        this.arrowsOn=true;
        this.ticksOn=true;
        this.labelsOn=true;
        this.borderOn=false;

      };
      graph.prototype=Object.create(control.prototype);
      graph.prototype.draw=function(){

        //  each end of a non-contiguous curve requires 2 terminating points

        var p=this;

        var min=0;
        var max=360;

        var increment=0;

        var borderColor=CLRS.BORDER;

        var convert=function(n){
          return n/app.MAX*p.w;
        };

        var border=function(){
          
          if(p.hit){ fill(getColor(CLRS.BLUE,10)); }
          
          stroke(CLRS.BLUE);
          strokeWeight(1);

          rect(0, 0, p.w, p.h);

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

            if(n%4===0){ stroke(CLRS.GRID_LINES_DARK); }
            else       { stroke(CLRS.GRID_LINES_LT);   }

            line(-5, n*gw, h+5, n*gw);
            line(-5,-n*gw, h+5,-n*gw);

          }

          // Vertical lines
          for(n=1; n<(p.h-gw)/gw; n++){

            if(n%4===0){ stroke(CLRS.GRID_LINES_DARK); }
            else       { stroke(CLRS.GRID_LINES_LT);   }

            line( n*gw, h/2+5, n*gw, -h/2-5);

          }

        };
        var axes=function(){

          stroke(CLRS.AXES);
          strokeWeight(1);
          
          var h=p.h;
          var h2=h/2;
          
          line(-5, h2, p.w+5,  h2); // x-axis
          line( 0, -5,     0, h+5); // y-axis

        };  
        var origin=function(){

          strokeWeight(1);
          noStroke();
          fill(96);

          ellipse(0,0,3,3);

        }; 
        var arrows=function(){

          fill(CLRS.ARROWS);
          noStroke();

          quad(h+15, 0, h+5, -3, h+7, 0,  h+5, 3);    // x-right
          // quad( -15, 0,  -5, -3,  -7, 0,   -5, 3);    // x-left

          quad(0,  h/2+15, -3,  h/2+5, 0,  h/2+7, 3,  h/2+5);    // y-top
          quad(0, -h/2-15, -3, -h/2-5, 0, -h/2-7, 3, -h/2-5);    // y-bottom

          noFill();
          
        };     
        var ticks=function(){

          var n=0;

          // Y-Axis
          for(n=gw; n<h/2-10; n+=gw){

            if(n%100===0){
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
          for(n=gw; n<h; n+=gw){

            if(n%100===0){
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

              text("0", p.x+22, p.y+p.h/2);

              // y-axis
              for(n=1; n<p.h/2/gw; n++){

                if(n%4===0){
                  text( n/4, p.x+20, p.y+p.h/2-n*gw);  //  Positive y-axis
                  text(-n/4, p.x+20, p.y+p.h/2+n*gw);  //  Negative y-axis
                }

              }

          popMatrix();

        };
        var quadrants=function(){

          pushMatrix();

            scale(1,-1);

              fill(getColor(CLRS.BLACK,25));
              textAlign(CENTER,CENTER);
              textSize(48);

              text("I",    gw*2, 0);
              text("II",   gw*6, 0);
              text("III", gw*10, 0);
              text("IV",  gw*14, 0);

          popMatrix();

        };

        var thetaMap=function(t){
          return map(t, 0, 360, 0, p.w);
        };

        var sineCurve=function(){
          
          pushMatrix();
          
            translate(0.5, 0.5);
            
              strokeWeight(0.25);
              stroke(CLRS.SIN);
              noFill();

              increment=1;

              beginShape();
                
                // curveVertex(0, -p.h/2);
                // curveVertex(0, -p.h/2);

                var x=0;
                var y=app.data[0].sin;

                curveVertex(x,y);

                  for(var n=app.MIN; n<=app.MAX; n+=increment){

                    x=convert(n);
                    y=-app.data[n].sin*p.h/2+p.h/2;

                    curveVertex(x, y);

                  }

                curveVertex(x,y);

              endShape();

              // Current Value
              fill(CLRS.SIN);

              var val=-app.data[app.theta].sin*p.h/2+p.h/2;

              ellipse(convert(app.theta), val, 5, 5);
          
          popMatrix();

        };
        var cosineCurve=function(){

          strokeWeight(1);
          stroke(CLRS.COS);
          noFill();

          increment=20;
          
          var x=0;
          var y=app.data[0].cos*f;

          beginShape();

            curveVertex(x,y);

              for(var n=app.MIN; n<=app.MAX; n+=increment){

                x=convert(n);
                y=app.data[n].cos*f;

                curveVertex(x, y);

              }

            curveVertex(x,y);

          endShape();

          // Current Value
          stroke(CLRS.COS);
          fill(CLRS.COS);

          var val=app.data[app.theta].cos*f;

          ellipse(thetaMap(app.theta), val, 5, 5);

        };
        var tangentCurve=function(){

          strokeWeight(1);      
          noFill();
          stroke(CLRS.TAN);

          var x=0;
          var y=0;
          var n=0;
          
          var c90=convert(90);          
          var val0=convert(degrees(atan(2)));
          var val1=c90 + (c90 - val0);
          var val2=convert(180)+val0;
          var val3=convert(270)+(c90-val0);

          increment=6;
          
          beginShape();

            curveVertex(x, y);

            for(n=app.MIN; n<90; n+=increment){

              x=convert(n);
              y=app.data[n].tan*f;

              if(y>=-h2 && y<= h2){ curveVertex(x, y); }

            }
            
            curveVertex(val0, h2);
            curveVertex(val0, h2);

          endShape();

          beginShape();

            curveVertex(val1, -h2);
            curveVertex(val1, -h2);

            for(n=91; n<270; n+=increment){

              x=n/app.MAX*h;
              y=app.data[n].tan*f;

              if(y>=-h2 && y<= h2){ curveVertex(x, y); }

            }

            curveVertex(val2, h2);
            curveVertex(val2, h2);
            
          endShape();

          beginShape();

            curveVertex(val3, -h2);
            curveVertex(val3, -h2);
            
            for(n=271; n<app.MAX; n+=increment){

              x=n/app.MAX*h;
              y=app.data[n].tan*f;

              if(y>=-h2 && y<= h2){ curveVertex(x, y); }

            }

            curveVertex(convert(n),0);
            curveVertex(convert(n),0);

          endShape();

          // Current Value
          var val=app.data[app.theta].tan*f;

          if(val>=-h2 && val<= h2){

            stroke(CLRS.TAN);
            fill(CLRS.TAN);

              ellipse(thetaMap(app.theta), val, 5, 5);

          }

        };
        var cosecantCurve=function(){

          strokeWeight(1);
          stroke(getColor(CLRS.SIN_LT, 30));
          noFill();

          var x=0;
          var y=0;
          var n=0;
          
          var c90=convert(90);          
          var val0=convert(degrees(asin(1/2)));
          var val1=c90 + (c90 - val0);
          var val2=convert(180)+val0;
          var val3=convert(270)+(c90-val0);
          
          increment=9;
          
          beginShape();

            curveVertex(val0, h2);              //  PI/6
            curveVertex(val0, h2);
            
            for(n=1; n<180; n+=increment){

              x=n/app.MAX*h;
              y=app.data[n].csc*f;

              if(y>=-h2 && y<= h2){ curveVertex(x, y); }

            }

            curveVertex(val1, h2);              //  5*PI/6
            curveVertex(val1, h2);

          endShape();
          
          beginShape();

            curveVertex(val2, -h2);             //  7*PI/6
            curveVertex(val2, -h2);

            for(n=181; n<app.MAX; n+=increment){

              x=n/app.MAX*h;
              y=app.data[n].csc*f;

              if(y>=-h2 && y<=h2){ curveVertex(x, y); }

            }

            curveVertex(val3, -h2);             //  11*PI/6
            curveVertex(val3, -h2);
            
          endShape();

          // Current Value
          var val=app.data[app.theta].csc*f;

          if(val>=-h2 && val<=h2){

            stroke(CLRS.SIN_LT);

              ellipse(thetaMap(app.theta), val, 5, 5);

          }

        };
        var secantCurve=function(){
          
          strokeWeight(1);
          stroke(getColor(CLRS.COS_LT, 30));
          noFill();

          var x=0;
          var y=app.data[0].sec;
          var n=0;

          var c90=convert(90);          
          var val0=convert(degrees(acos(1/2)));
          var val1=c90 + (c90 - val0);
          var val2=convert(180)+val0;
          var val3=convert(270)+(c90-val0);
          
          increment=6;
          
          beginShape();

            for(n=1; n<90; n+=increment){

              x=convert(n);
              y=app.data[n].sec*f;

              if(y>=-h2 && y<= h2){ curveVertex(x, y); }

            }

            curveVertex(val0, h2);
            curveVertex(val0, h2);              //  PI/3
            
          endShape();
          
          beginShape();

            curveVertex(val1, -h2);             // 2*PI/3
            curveVertex(val1, -h2);    
            
            
            for(n=91; n<270; n+=increment){

              x=convert(n);
              y=app.data[n].sec*f;

              if(y>=-h2 && y<=h2){ curveVertex(x, y); }

            }

            curveVertex(val2, -h2);             //  4*PI/3
            curveVertex(val2, -h2);    

          endShape();

          beginShape();

            curveVertex(val3, h2);              // 5*PI/3
            curveVertex(val3, h2);    
            
            for(n=271; n<=app.MAX; n+=2){

              x=convert(n);
              y=app.data[n].sec*f;

              if(y>=-h2 && y<=h2){ curveVertex(x, y); }

            }

          endShape();

          // Current Value
          var val=app.data[app.theta].sec*f;

          if(val>=-h2 && val<=h2){
            
            noFill();
            stroke(CLRS.COS_LT);            

              ellipse(thetaMap(app.theta), val, 5, 5);

          }

        };
        var cotangentCurve=function(){

          strokeWeight(1);
          stroke(getColor(CLRS.TAN, 30));
          noFill();

          var x=0;
          var y=0;
          var n=0;
          
          var c90=convert(90);
          var val0=convert(degrees(atan(1/2)));
          var val1=c90  + (c90 - val0);
          var val2=convert(180) + val0;
          var val3=convert(270) + (c90 - val0);

          increment=6;

          beginShape();

            curveVertex(val0, h2);
            curveVertex(val0, h2);    
            
            for(n=2; n<180; n+=increment){

              x=convert(n);
              y=app.data[n].cot*f;

              if(y>=-h2 && y<=h2){ curveVertex(x, y); }

            }

            curveVertex(val1, -h2);
            curveVertex(val1, -h2);    

          endShape();

          beginShape();

            curveVertex(val2, h2);
            curveVertex(val2, h2);
            
            for(n=181; n<=app.MAX; n+=increment){

              x=convert(n);
              y=app.data[n].cot*f;

              if(y>=-h2 && y<=h2){ curveVertex(x, y); }

            }

            curveVertex(val3, -h2);
            curveVertex(val3, -h2);    
            
          endShape();
          
          // Current Value
          var val=app.data[app.theta].cot*f;

          if(val>=-h2 && val<=h2){

            strokeWeight(1);
            stroke(getColor(CLRS.TAN_LT, 50));

            ellipse(thetaMap(app.theta), val, 5, 5);

          }

        };

        var drawCursor=function(){

          stroke(CLRS.BLACK);
          strokeWeight(0.25);

          pushMatrix();

            translate(0.5,0.5);

              line(30,     mouseY,    560, mouseY); // horizontal line
              line(mouseX,     50, mouseX,    580); // vertical line

          popMatrix();

        };
        
        // Draw --------------------------------------------------------------------------------
        pushMatrix();

          translate(this.x+0.5, this.y+0.5);
          // scale(1,-1);

            noFill();
    
            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);
              
              app.theta=round(map(mouseX-this.x, 0, this.w, 0, 360));

            }

            pushMatrix();

              // scale(1,-1);
                
                // border();
                
                // if(this.gridOn    ){ grid();           }
                // if(this.axesOn    ){ axes();           }
                // if(this.originOn  ){ origin();         }
                // if(this.arrowsOn  ){ arrows();         }
                // if(this.ticksOn   ){ ticks();          }
                // if(this.labelsOn  ){ labels();         }

                // if(app.quadrantsOn){ quadrants();      }

                if(app.sinOn      ){ sineCurve();      }
                // if(app.cscOn      ){ cosecantCurve();  }

                // if(app.cosOn      ){ cosineCurve();    }
                // if(app.secOn      ){ secantCurve();    }

                // if(app.tanOn      ){ tangentCurve();   }
                // if(app.cotOn      ){ cotangentCurve(); }

            popMatrix();

            if(this.borderOn){ border(); }
              
        popMatrix();

        // if(this.gridHit &&
           // app.focus==this.id){
          
          // noCursor();
          // drawCursor();

        // }
        
      };

    }

  }
    
    /* Initialize ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    var initialize=function(){

      // Background --------------------------------------------------
        /* root control       */
        var bk=new root(100, null, 0, 0, 599, 599,                         
          {text:            "root",
           activecolor:     CLRS.GRAPHA,
           inactivecolor:   CLRS.GRAPHI,
           cursor:          ARROW,
           border:          false});

        app.controls.push(bk);

          /* unit circle        */
          bk.controls.push(new unitCircle(120, bk, 100, 150, 70, 70,
            {color:   CLRS.TEAL_2,
             cursor:  ARROW}));
             
          /* graph              */
          bk.controls.push(new graph(110, bk, 200, 80, 360, 140,
            {activecolor:     CLRS.GRAPHA,
             inactivecolor:   CLRS.GRAPHI,
             cursor:          ARROW}));


      // Toolbar --------------------------------------------------

        /* toolbar            */
        var toolb=new toolbar(200, bk, 0, 0, 600, 30,  
          {text:    "Sine Cosine",
           activecolor:     CLRS.TOOLBARA,
           inactivecolor:   CLRS.TOOLBARI,
           cursor:          ARROW});

        bk.controls.push(toolb);

          /* auto-run           */
          toolb.controls.push(new onOff(210, toolb, 17, 15, 13, 13,           
            {execute:   checkboxAuto,
             retrieve:  getAuto,
             color:     CLRS.BLACK,
             cursor:    HAND}));
             
          /* display settings   */
          toolb.controls.push(new settings(220, toolb, 575, 5, 22, 22,        
            {execute:   checkboxLegend,
             retrieve:  getLegend,
             color:     CLRS.BLACK,
             cursor:    HAND}));

      
      // Index --------------------------------------------------

        // /* index              */
        // var idx=new index(300, bk, 170, 55, 250, 70,{radius:  5,
            // color:   CLRS.WHITE,
            // cursor:  ARROW});

        // bk.controls.push(idx);
          
          // /* Sine button        */
          // idx.controls.push(new button(310, idx, 5, 5, 110, 20,              
            // {text:     "Sin "+CONSTANTS.THETA,
             // execute:  toggleSin,
             // tag:      getSine,
             // retrieve: getSineOn,
             // color:    CLRS.SIN,
             // cursor:   HAND}));
           
          // /* Cosine button      */
          // idx.controls.push(new button(320, idx, 5, 25, 110, 20,             
            // {text:     "Cos "+CONSTANTS.THETA,
             // execute:  toggleCos,
             // tag:      getCosine,
             // retrieve: getCosineOn,
             // color:    CLRS.COS,
             // cursor:   HAND}));
          
          // /* Tangent button     */
          // idx.controls.push(new button(330, idx, 5, 45, 110, 20,             
            // {text:     "Tan "+CONSTANTS.THETA,
             // execute:  toggleTan,
             // tag:      getTangent,
             // retrieve: getTangentOn,
             // color:    CLRS.TAN,
             // cursor:   HAND}));

          // /* Cosecant button    */
          // idx.controls.push(new button(340, idx, 135, 5, 110, 20,            
            // {text:     "Csc "+CONSTANTS.THETA,
             // execute:  toggleCsc,
             // tag:      getCosecant,
             // retrieve: getCosecantOn,
             // color:    CLRS.SIN_LT,
             // cursor:   HAND}));
          
          // /* Secant button      */
          // idx.controls.push(new button(350, idx, 135, 25, 110, 20,           
            // {text:     "Sec "+CONSTANTS.THETA,
             // execute:  toggleSec,
             // tag:      getSecant,
             // retrieve: getSecantOn,
             // color:    CLRS.COS_LT,
             // cursor:   HAND}));
             
          // /* Cotangent button   */
          // idx.controls.push(new button(360, idx, 135, 45, 110, 20,           
            // {text:     "Cot "+CONSTANTS.THETA,
             // execute:  toggleCot,
             // tag:      getCotangent,
             // retrieve: getCotangentOn,
             // color:    CLRS.TAN_LT,
             // cursor:   HAND}));

      
      // Telemetry --------------------------------------------------
        /* Telemetry          */
        var telem=new legend(400, bk, 600, 30, 200, 570,{color:   CLRS.BLUE, cursor:   ARROW});

        bk.controls.push(telem);
                
          /* Sine Checkbox      */
          telem.controls.push(new checkbox(420, telem, 30, 370,  50,  15,         
            {text:     "Sine Curve",
             execute:  toggleSin,
             retrieve: getSineOn,
             color:    CLRS.SIN,
             cursor:   HAND}));

          /* Cosine Checkbox    */
          telem.controls.push(new checkbox(430, telem, 30, 390,  50,  15,    
            {text:     "Cosine Curve",
             execute:  toggleCos,
             retrieve: getCosineOn,
             color:    CLRS.COS,
             cursor:   HAND}));

          /* Tangent Checkbox   */
          telem.controls.push(new checkbox(440, telem, 30, 410,  50,  15,    
            {text:     "Tangent Curve",
             execute:  toggleTan,
             retrieve: getTangentOn,
             color:    CLRS.TAN,
             cursor:   HAND}));

          /* Cosecant Checkbox  */
          telem.controls.push(new checkbox(450, telem, 30, 430,  50,  15,    
            {text:     "Cosecent Curve",
             execute:  toggleCsc,
             retrieve: getCosecantOn,
             color:    CLRS.SIN_LT,
             cursor:   HAND}));

          /* Secant Checkbox    */
          telem.controls.push(new checkbox(460, telem, 30, 450,  50,  15,    
            {text:     "Secant Curve",
             execute:  toggleSec,
             retrieve: getSecantOn,
             color:    CLRS.COS_LT,
             cursor:   HAND}));

          /* Cotangent Checkbox */
          telem.controls.push(new checkbox(470, telem, 30, 470,  50,  15,    
            {text:     "Cotangent Curve",
             execute:  toggleCot,
             retrieve: getCotangentOn,
             color:    CLRS.TAN_LT,
             cursor:   HAND}));

    };

    var incrementTheta=function(){

      app.theta+=1;
      if(app.theta>360){ app.theta=0; }

    };
    var update=function(){

      background(242);

      if(app.autoRun){ incrementTheta(); }

      for(var c in app.controls){ app.controls[c].draw(); }

    };
    
    var execute;
    
    execute=update;
    
    initialize();

    app.keys[KEYCODES.CONTROL]=false;
    app.keys[KEYCODES.ALT]=false;
    app.keys[KEYCODES.SHIFT]=false;
    
    var draw=function(){
      
      execute();

    };

  /* Keyboard Events ================================================== */
  {

      var keyPressed=function(){

        if(app.autoRun===false){

          if     (keyCode===KEYCODES.RIGHT){ increment(); }
          else if(keyCode===KEYCODES.LEFT) { decrement(); }

        }

      };
      var keyTyped=function(){/* println("typed " + (key) + " " + keyCode); */};
      var keyReleased=function(){};

  }

  /* Mouse Events ================================================== */
  {

    var mouseClicked=function(){
        
      switch(mouseButton){
        
        case LEFT:    for(var c in app.controls){ app.controls[c].clicked(); }  break;          
        // case RIGHT:   for(var c in app.controls){ app.controls[c].rClicked(); } break;          
        // case CENTER:  for(var c in app.controls){ app.controls[c].cClicked(); } break;
        
        default:      break;
        
      }

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
      
      // if(!app.autoRun){ execute(); }

      for(var c in app.controls){ app.controls[c].moved(0,0); }

    };
    var mouseOut=function(){

      for(var c in app.controls){ app.controls[c].out(); }
      app.focus=-1;

    };
    var mouseOver=function(){
      
      
      for(var c in app.controls){ app.controls[c].over(); }
      app.focus=-2;

    };

  }

}};





































































// 1729 = 10^3+9^3 = 12^3+1^3
