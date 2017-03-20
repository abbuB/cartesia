/*  TBD

    TO DO:

        - convert to mouseMove for execute (accomodate the Debug Trigonometry menu)
        

    Research:
      
      ***** Completed and no discernible difference *****
      - test a version of without the subs in the draw function (use ifs instead) 

    TO DONE:
        
        - use concantanation and /n to build left
          and right text columns for debug telemetry
          
        - find available fonts (Khan Academy)    
        - curved text for RADIANS and DEGREES
        - alternate light/heavy for radian values
        - add control/alt/shift to telemetry
        - background focus and unfocussed colors

        - conversion ellipse
        - theta degrees
        - theta radians
        - autoRun


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

/*  TBD

    TO DO:

        - convert to mouseMove for execute (accomodate the Debug Trigonometry menu)
        

    Research:
      
      ***** Completed and no discernible difference *****
      - test a version of without the subs in the draw function (use ifs instead) 

    TO DONE:
        
        - use concantanation and /n to build left
          and right text columns for debug telemetry
          
        - find available fonts (Khan Academy)    
        - curved text for RADIANS and DEGREES
        - alternate light/heavy for radian values
        - add control/alt/shift to telemetry
        - background focus and unfocussed colors

        - conversion ellipse
        - theta degrees
        - theta radians
        - autoRun



*/

  var application=function(){

      this.debug=true;          //  mode that displays enhanced debugging tools

      this.frameRate=0 ;        //  refresh speed

      this.mouseX=0;            //  current mouseX location
      this.mouseY=0;            //  current mouseY location

      this.left=false;          //  Is the left mouse button pressed
      this.right=false;         //  Is the right mouse button pressed
      this.center=false;        //  Is the center mouse button pressed

      this.controls=[];         //  collection of controls in the app

      this.focus=0;             //  The ID of the control with focus

      this.keys=[];             //  Array holding the value of all keycodes

      /* App Specific */
      this.data=[];             //  Values of each trig function from 0 (zero) to 360

      this.autoRun=true;        //  Alpha changes automatically

      this.theta=0;             //   Current angle

      // Initialize
      frameRate(0);
      cursor(WAIT);
      angleMode="radians";

      size(600, 600);           // set size of canvas

    };

  var app=new application();

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

      ACTIVE1:      color(220,226,240,255),

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
      THETA:    "θ",
      RADIANS:  "ᶜ"

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

    var getAuto=function()     { return app.autoRun;  };
    var getLegend=function()   { return app.legend;   };

    var checkboxAuto=function()  { app.autoRun=!app.autoRun; };
    var checkboxLegend=function(){ app.legend=!app.legend;   };

  }

  /* Controls ================================================ */
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
      control.prototype.rClicked=function(){};
      control.prototype.cClicked=function(){};
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
      control.prototype.released=function(){};
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

        this.color=params.color;
        this.activeColor=params.activeColor;

        this.cursor=params.cursor;
        this.border=params.border;

        this.left=0;

      };
      root.prototype=Object.create(control.prototype);
      root.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();

            // fill(getColor(this.color, 5));
            
            fill(this.activeColor);

            if(this.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(this.activeColor);

            }

            if(this.border){
              strokeWeight(1);
              stroke(this.color);
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

    // toolbar ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var toolbar=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.text=params.text;
        this.color=params.color;
        this.cursor=params.cursor;

      };
      toolbar.prototype=Object.create(control.prototype);
      toolbar.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            fill(getColor(this.color, 75));

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(getColor(this.color, 100));

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
        
        // "sans-serif", "serif", "monospace", "fantasy", or "cursive"
        // textFont(createFont("monospace", 14));
        textFont(createFont("sans-serif", 14));
        // textFont(createFont("serif", 14));
        // textFont(createFont("fantasy", 14));
        // textFont(createFont("cursive", 14));

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
                 app.center  + "\n\n\n" +
                 app.focus   + "\n" +
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
            textSize(11);
            textAlign(RIGHT,CENTER);

            // text(app.focus, this.offset+130, 495);

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

    // Unit Circle * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var unitCircle=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.color=params.color;
        this.activeColor=params.activeColor;
        this.cursor=params.cursor;

      };
      unitCircle.prototype=Object.create(control.prototype);
      unitCircle.prototype.draw=function(){

          var rTheta=0;       //  angle in radians
          var r=this.w;       //  radius
          var cs=3.5;         //  crossing size

          var p=this;         //  object reference

        textFont(createFont("sans-serif", 14));
        // textFont(createFont("serif", 14));
        // textFont(createFont("fantasy", 14));
        // textFont(createFont("cursive", 14));
        
          var axes=function(){
            
            // axes();
            strokeWeight(1);
            stroke(p.color);

            var w=p.w*0.55;

            line(-w, 0, w, 0);
            line( 0,-w, 0, w); 

          };
          var circle=function(){

            noFill();

            if(p.hit){

              // fill(getColor(CLRS.WHITE, p.value));
              stroke(getColor(p.color, 50));
              strokeWeight(1.5);

              // if(p.value<100){ p.value+=2; }

            }
            else{

              noFill();
              stroke(getColor(p.color, 75));
              strokeWeight(1);

              p.value=5;

            }

            rTheta=radians(app.theta);

            ellipse(0, 0, 2*r, 2*r);

          };
          var drawDegrees=function(){

            fill(p.color);
            stroke(getColor(p.color, 90));
            strokeWeight(0.5);

            pushMatrix();

              for(var n=0; n<360; n++){

                stroke(getColor(p.color, 75));

                if(n%10===0){

                  line(p.w-35, 0, p.w, 0);

                }
                else if(n%5===0){

                  stroke(getColor(p.color, 50));

                  line(p.w-25, 0, p.w, 0);

                }
                else{

                  if(n%10<5){ stroke(getColor(p.color, 50)); }
                  else      { stroke(getColor(p.color, 25)); }

                  line(p.w-15, 0, p.w, 0);

                }

                rotate(radians(1));

              }

            popMatrix();

            // Labels
            textSize(10);

            pushMatrix();

              resetMatrix();
              translate(p.x, p.y);
              textAlign(CENTER,CENTER);
              var offset=p.w-45;

                for(var n=10; n<360; n+=10){

                  text(n,
                       cos(-radians(n))*offset,
                       sin(-radians(n))*offset);
                }

              textAlign(RIGHT,CENTER);

              offset=p.w-44;

              text("0 & 360",
                   cos(radians(0))*offset,
                   sin(radians(0))*offset);

            popMatrix();

          };
          var drawRadians=function(){

            noFill();
            stroke(getColor(p.color, 90));
            strokeWeight(0.5);

            pushMatrix();

              for(var n=0; n<TWO_PI*100; n++){

                if(n%10===0){

                  stroke(getColor(p.color, 90));
                  line(p.w+25, 0, p.w, 0);

                }
                else if ( n%5===0){

                  stroke(getColor(p.color, 90));
                  line(p.w+15, 0, p.w, 0);

                }
                else{

                  if(n%10<5){ stroke(getColor(p.color, 70)); }
                  else      { stroke(getColor(p.color, 40)); }

                  line(p.w+10, 0, p.w, 0);

                }

                rotate(0.01);

              }

            popMatrix();

            // Labels
            textSize(9);

            pushMatrix();

              resetMatrix();
              translate(p.x, p.y);
              textAlign(CENTER,CENTER);

              fill(getColor(p.color, 90));

              var offset=p.w+37;

              for(var n=0.1; n<TWO_PI; n+=0.1){

                text(n.toFixed(1),
                     cos(-radians(180*n/PI))*offset,
                     sin(-radians(180*n/PI))*offset);

              }

              offset=p.w+30;
              textAlign(LEFT,CENTER);

              text("0 & 6.28",
                   cos(radians(0))*offset,
                   sin(radians(0))*offset);

            popMatrix();

          };
          var theta=function(){

            // Hypotenuse
            strokeWeight(0.5);
            stroke(p.color);

              line(0, 0, cos(rTheta)*r, sin(rTheta)*r);

            // Cos: Vertical
            stroke(CLRS.SIN);

              line(cos(rTheta)*r, 0, cos(rTheta)*r, sin(rTheta)*r);

            // Sin: Horizontal
            stroke(CLRS.COS);

              line(0, 0, cos(rTheta)*r, 0);

            // Triangle
            noStroke();
            fill(getColor(p.color, 10));

              triangle(            0,             0,
                       cos(rTheta)*r, sin(rTheta)*r,
                       cos(rTheta)*r, 0);

            noStroke();
            fill(getColor(p.color, 100));

              ellipse(cos(rTheta)*r, sin(rTheta)*r, cs, cs);
              ellipse(cos(rTheta)*r, 0,             cs, cs);
              ellipse(0,             0,             cs, cs);

            // Theta Text  ----------
            textSize(20);
            textAlign(CENTER,CENTER);

            var tw=textWidth(app.theta+CONSTANTS.DEGREES);

            noStroke();

            fill(p.parent.color);

              // rect(-tw/2, -r*1.35-7.5, tw+2, 15);

            fill(CLRS.BLACK);
            textSize(36);
            scale(1,-1);

              text((app.theta*PI/180).toFixed(2) + CONSTANTS.RADIANS, 260, r*1);
              text(app.theta + CONSTANTS.DEGREES,                     260, r*1.2);

          };
          var quadrants=function(){

            textAlign(LEFT, CENTER);
            textSize(16);
            noStroke();
            fill(getColor(p.color, 25));

            var w=r*0.03;  // Distance along radius

            textAlign(LEFT, BOTTOM);
            text("I",   w*cos(radians( -45)),  w*sin(radians( -45)));

            textAlign(RIGHT, BOTTOM);
            text("II",  w*cos(radians(-135)),  w*sin(radians(-135)));

            textAlign(RIGHT, TOP);
            text("III", w*cos(radians( 135 )), w*sin(radians( 135)));

            textAlign(LEFT, TOP);
            text("IV",  w*cos(radians(  45)),  w*sin(radians(  45)));

          };
          var quadrantValues=function(){

            textFont(createFont("monospace", 14));

            noStroke();
            fill(getColor(p.color, 50));

            var x_offset=30;

            // Quadrant I
            textAlign(LEFT, TOP);
            
            var txt="sin + \n" +
                    "cos + \n" +
                    "tan + \n" +
                    "csc + \n" +
                    "sec + \n" +
                    "cot + \n";
            
              text(txt, x_offset, -110);

            // Quadrant II
            textAlign(RIGHT, TOP);

            txt="sin + \n" +
                "cos - \n" +
                "tan - \n" +
                "csc - \n" +
                "sec - \n" +
                "cot + \n";

              text(txt, -x_offset+5, -110);

            // Quadrant III
            textAlign(RIGHT, TOP);

            txt="sin - \n" +
                "cos - \n" +
                "tan + \n" +
                "csc + \n" +
                "sec - \n" +
                "cot - \n";

              text(txt, -x_offset+5, 15);

            // Quadrant IV
            textAlign(LEFT, TOP);

            txt="sin - \n" +
                "cos + \n" +
                "tan - \n" +
                "csc - \n" +
                "sec + \n" +
                "cot - \n";

              text(txt, x_offset, 15);
                    
          };
          var labels=function(){

            fill(getColor(p.color, 90));
            textAlign(CENTER,CENTER);
            textFont(createFont("sans-serif", 16));
              
            pushMatrix();
              
              var y=-133;
              
              rotate(radians(-15));
                text("D", 0, y);
              rotate(radians(5));
                text("E", 0, y);
              rotate(radians(5));
                text("G", 0, y);
              rotate(radians(5));
                text("R", 0, y);
              rotate(radians(5));
                text("E", 0, y);
              rotate(radians(5));
                text("E", 0, y);
              rotate(radians(5));
                text("S", 0, y);
                
            popMatrix();
            
            pushMatrix();
            
              y=-260;
              
              rotate(radians(66));
                text("R", 0, y);
              rotate(radians(2.75));
                text("A", 0, y);
              rotate(radians(2.75));
                text("D", 0, y);
              rotate(radians(2.25));
                text("I", 0, y);
              rotate(radians(2.25));
                text("A", 0, y);
              rotate(radians(2.75));
                text("N", 0, y);
              rotate(radians(2.75));
                text("S", 0, y);

            popMatrix();

          };
          var specialValues=function(){

            textFont(createFont("cursive", 14));
            textAlign(CENTER,CENTER);
            textSize(11);

            var coef=1.35;
            var lcoef=1.28;
            var scoef=1.22;

            // π/2
            text("π/2", 0, -r*coef);

            stroke(p.color);
            strokeWeight(0.5);

              line(cos(PI/2)*r*scoef, -sin(PI/2)*r*scoef,
                   cos(PI/2)*r*lcoef, -sin(PI/2)*r*lcoef);

            // π
            text("π", -r*coef, 0);

              line(cos(PI)*r*scoef, -sin(PI)*r*scoef,
                   cos(PI)*r*lcoef, -sin(PI)*r*lcoef);

            // 3π/2
            text("3π/2", 0, r*coef);

              line(cos(3*PI/2)*r*scoef, -sin(3*PI/2)*r*scoef,
                   cos(3*PI/2)*r*lcoef, -sin(3*PI/2)*r*lcoef);

            // 2π
            text("2π", r*1.38, 0);

            // line(cos(2*PI)*r*scoef, -sin(2*PI)*r*scoef,
                 // cos(2*PI)*r*lcoef, -sin(2*PI)*r*lcoef);

            /* Quadrant I */
            // π/6
            text("π/6", cos(PI/6)*r*coef,
                       -sin(PI/6)*r*coef);

              line(cos(PI/6)*r*scoef, -sin(PI/6)*r*scoef,
                   cos(PI/6)*r*lcoef, -sin(PI/6)*r*lcoef);

            // π/4
            text("π/4", cos(PI/4)*r*coef,
                       -sin(PI/4)*r*coef);

              line(cos(PI/4)*r*scoef, -sin(PI/4)*r*scoef,
                   cos(PI/4)*r*lcoef, -sin(PI/4)*r*lcoef);

            // π/3
            text("π/3", cos(PI/3)*r*coef,
                       -sin(PI/3)*r*coef);

              line(cos(PI/3)*r*scoef, -sin(PI/3)*r*scoef,
                   cos(PI/3)*r*lcoef, -sin(PI/3)*r*lcoef);

            /* Quadrant II */
            // 2π/3
            text("2π/3", cos(2*PI/3)*r*coef,
                        -sin(2*PI/3)*r*coef);

              line(cos(2*PI/3)*r*scoef, -sin(2*PI/3)*r*scoef,
                   cos(2*PI/3)*r*lcoef, -sin(2*PI/3)*r*lcoef);

            // 3π/4
            text("3π/4", cos(3*PI/4)*r*coef,
                        -sin(3*PI/4)*r*coef);

              line(cos(3*PI/4)*r*scoef, -sin(3*PI/4)*r*scoef,
                   cos(3*PI/4)*r*lcoef, -sin(3*PI/4)*r*lcoef);

            // 5π/6
            text("5π/6", cos(5*PI/6)*r*coef,
                        -sin(5*PI/6)*r*coef);

              line(cos(5*PI/6)*r*scoef, -sin(5*PI/6)*r*scoef,
                   cos(5*PI/6)*r*lcoef, -sin(5*PI/6)*r*lcoef);

            /* Quadrant III */
            // 7π/6
            text("7π/6", cos(7*PI/6)*r*coef,
                        -sin(7*PI/6)*r*coef);

              line(cos(7*PI/6)*r*scoef, -sin(7*PI/6)*r*scoef,
                   cos(7*PI/6)*r*lcoef, -sin(7*PI/6)*r*lcoef);

            // 5π/4
            text("5π/4", cos(5*PI/4)*r*coef,
                        -sin(5*PI/4)*r*coef);

              line(cos(5*PI/4)*r*scoef, -sin(5*PI/4)*r*scoef,
                   cos(5*PI/4)*r*lcoef, -sin(5*PI/4)*r*lcoef);

            // 4π/3
            text("4π/3", cos(4*PI/3)*r*coef,
                        -sin(4*PI/3)*r*coef);

              line(cos(4*PI/3)*r*scoef, -sin(4*PI/3)*r*scoef,
                   cos(4*PI/3)*r*lcoef, -sin(4*PI/3)*r*lcoef);

            /* Quadrant IV */
            // 5π/3
            text("5π/3", cos(5*PI/3)*r*coef,
                        -sin(5*PI/3)*r*coef);

              line(cos(5*PI/3)*r*scoef, -sin(5*PI/3)*r*scoef,
                   cos(5*PI/3)*r*lcoef, -sin(5*PI/3)*r*lcoef);

            // 7π/4
            text("7π/4", cos(7*PI/4)*r*coef,
                        -sin(7*PI/4)*r*coef);

              line(cos(7*PI/4)*r*scoef, -sin(7*PI/4)*r*scoef,
                   cos(7*PI/4)*r*lcoef, -sin(7*PI/4)*r*lcoef);

            // 11π/6
            text("11π/6", cos(11*PI/6)*r*coef,
                         -sin(11*PI/6)*r*coef);

              line(cos(11*PI/6)*r*scoef, -sin(11*PI/6)*r*scoef,
                   cos(11*PI/6)*r*lcoef, -sin(11*PI/6)*r*lcoef);

          };
          var conversion=function(){

            textFont(createFont("sans-serif", 14));
            // textFont(createFont("serif", 14));
            // textFont(createFont("fantasy", 14));
            textFont(createFont("cursive", 12));
            
            fill(p.activeColor);
            
            // if(!p.hit){ fill(p.color); }
            
            noStroke();

            pushMatrix();

              translate(230,-240);

                strokeWeight(0.5);

                  rect(-80,-40,160,80);

                noFill();
                stroke(CLRS.BLUE);
                strokeWeight(0.5);

                  ellipse(0, 0, 100, 50);

                //  Background rectangles
                fill(p.activeColor);
                noStroke();

                var w=textWidth("Degrees")+10;

                  rect(-w/2-50, -7.5, w, 15);

                w=textWidth("Radians")+10;

                  rect(50-w/2, -7.5, w, 15);

                w=textWidth("x "+CONSTANTS.PI+"/180")+10;

                  rect(-w/2, -32.5, w, 15);

                w=textWidth("x "+"180/"+CONSTANTS.PI)+10;

                  rect(-w/2,  18.5, w, 15);

                // Labels
                fill(getColor(CLRS.BLACK, 75));

                textAlign(CENTER,CENTER);

                  text("Degrees", -50, 0);
                  text("Radians",  50, 0);

                  text("x "+CONSTANTS.PI+"/180", 0, -25);
                  text("x "+"180/"+CONSTANTS.PI, 0,  25);

                // Arrows
                pushMatrix();

                  fill(CLRS.BLUE);
                  noStroke();

                  translate(-24,-22);
                  rotate(radians(-10));

                    triangle( -7, -4,
                              -7,  4,
                               0,  0);

                  translate(22,22);         //  Reset to center of the ellipse
                  rotate(radians(10));

                  // ------------------------------

                  translate(-48,14);
                  rotate(radians(-140));

                    triangle( -7, -4,
                              -7,  4,
                               0,  0);

                  rotate(radians(140));     //  Reset to center of the ellipse
                  translate(50,-14);

                  // ------------------------------
                  translate(22,26);
                  rotate(radians(155));

                    triangle( -7, -4,
                              -7,  4,
                               0,  0);

                  rotate(radians(-155));    //  Reset to center of the ellipse
                  translate(-22,-26);

                  // ------------------------------
                  translate(46,-3);
                  rotate(radians(45));

                    triangle( -7, -4,
                              -7,  4,
                               0,  0);

                  // ellipse(0,0,3,3);

                popMatrix();

            popMatrix();

          };

          pushMatrix();

            translate(this.x+0.5, this.y+0.5);
            scale(1, -1);

              if(this.hit &&
                 this.parent.hit &&
                 !app.autoRun){

                app.focus=this.id;
                cursor(this.cursor);

              }

              // textFont(createFont("serif", 20));

              axes();
              circle();
              drawDegrees();
              drawRadians();
              theta();
              quadrants();
              quadrantValues();
              labels();
              specialValues();
              conversion();

          popMatrix();

           // println( typeof this.color );

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

  }

  /* Initialize ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    var initialize=function(){

      // Background --------------------------------------------------

        /* root control       */
        var bk=new root(100, null, 0, 0, 599, 599,
          {text:          "root",
           color:         CLRS.ACTIVE1,
           activeColor:   CLRS.ACTIVE1,
           cursor:        ARROW,
           border:        false});

        app.controls.push(bk);

        /* unit circle        */
        bk.controls.push(new unitCircle(110, bk, 280, 310, 200, 1501,
          {color:       CLRS.BLACK,
           activeColor: CLRS.ACTIVE1,
           cursor:      ARROW}));

      // tlbarar --------------------------------------------------

        /* tlbarar            */
        var tlbar=new toolbar(200, bk, 0, 0, 600, 30,
          {text:    "Degrees and Radians",
           color:   CLRS.TEAL_1,
           cursor:  ARROW});

        bk.controls.push(tlbar);

          /* auto-run           */
          tlbar.controls.push(new onOff(210, tlbar, 15, 15, 13, 13,
            {execute:   checkboxAuto,
             retrieve:  getAuto,
             color:     CLRS.BLACK,
             cursor:    HAND}));

          /* display settings   */
          tlbar.controls.push(new settings(220, tlbar, 575, 5, 22, 22,
            {execute:   checkboxLegend,
             retrieve:  getLegend,
             color:     CLRS.BLACK,
             cursor:    HAND}));


      // Telemetry --------------------------------------------------
        /* Telemetry          */
        var telem=new legend(300, bk, 600, 30, 200, 570,
          {color:   CLRS.BLUE, cursor:   ARROW});

        bk.controls.push(telem);

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

        app.keys[keyCode]=true;

      };
      var keyTyped=function(){/* println("typed " + (key) + " " + keyCode); */};
      var keyReleased=function(){

        app.keys[keyCode]=false;

      };

  }

  /* Mouse Events ================================================== */
  {

    var mouseClicked=function(){

      switch(mouseButton){

        case LEFT:   for(var c in app.controls){ app.controls[c].clicked();  } break;
        case RIGHT:  for(var c in app.controls){ app.controls[c].rClicked(); } break;
        case CENTER: for(var c in app.controls){ app.controls[c].cClicked(); } break;

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

      for(var c in app.controls){ app.controls[c].out(0,0); }
      app.focus=-1;

    };
    var mouseOver=function(){

      for(var c in app.controls){ app.controls[c].over(); }
      app.focus=-2;

    };

  }






































































// 1729 = 10^3+9^3 = 12^3+1^3
}};
