/*  TBD

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

/*

    TO DO:
      
      - collatz data type including
      
        - number
        - path
        - size
        - max
        - sum
        ...

      - run button
      - increment button
      - decrement button
      - detail based on mouseX position
      
      - only draw telemetry if it's visible

    Research:


    TO DONE:



        textFont(createFont("sans-serif", 14));
        textFont(createFont("monospace", 14));
        textFont(createFont("serif", 14));
        textFont(createFont("fantasy", 14));
        textFont(createFont("cursive", 14));

        println( typeof this.color );

*/

  var application=function(){

    this.debug=true;          //  mode that displays enhanced debugging tools

    this.frameRate=30;        //  refresh speed

    this.mouseX=0;            //  current mouseX location
    this.mouseY=0;            //  current mouseY location

    this.left=false;          //  Is the left mouse button pressed
    this.right=false;         //  Is the right mouse button pressed
    this.center=false;        //  Is the center mouse button pressed

    this.focus=0;             //  The ID of the control with focus
    
    this.controls=[];         //  collection of controls in the app
    this.keys=[];             //  Array holding the value of all keycodes

    /* App Specific ------------------ */
    this.data=[];             //  Array of collatz objects

    this.autoRun=false;        //  Alpha changes automatically
    this.infoOn=false;        //  Is the info frame displayed

    this.dCursor=0;           //  position of the cursor in data
    
    this.MIN=0;
    this.MAX=360;

    /* Initialize -------------------- */
    {

      frameRate(0);

      cursor(WAIT);

      angleMode="radians";

      size(600, 600); // set size of canvas

    }

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
      
      K_STEEL_0:     color( 48, 68, 82,255),
      K_STEEL_1:     color(132,177,208,255),
      K_STEEL_2:     color(106,141,166,255),
      K_STEEL_3:     color(136,164,184,255),
      
      K_TEAL_0:     color( 24, 99,117,255),
      K_TEAL_1:     color( 28,117,138,255),
      K_TEAL_2:     color( 41,171,202,255),
      K_TEAL_3:     color( 88,196,221,255),
      K_TEAL_4:     color(156,220,235,255),
      K_TEAL_5:     color( 17,172,205,255),
      
      K_GREEN_0:    color( 31,171, 84,255),
      K_GREEN_1:    color( 56,182, 92,255),
      K_GREEN_2:    color( 116,207,112,255),

      K_PINK_0:     color(202, 51,124,255),
      K_PINK_1:     color(218, 79,146,255),
      K_PINK_2:     color(255,146,198,255),

      K_ORANGE_0:   color(232, 77, 57,255),
      K_ORANGE_1:   color(255,132,130,255),
      K_ORANGE_2:   color(234,145, 22,255),

      K_BROWN_0:    color(224,125, 16,255),
      K_BROWN_1:    color(255,188, 37,255),
      K_BROWN_2:    color(255,132,130,255),

      K_PURPLE_0:   color(120, 83,171,255),
      K_PURPLE_1:   color(155,119,229,255),

      K_BLUE_0:     color( 19, 78,163,255),
      K_BLUE_1:     color( 60,145,229,255),
      
      K_GRAY_0:     color(221,221,221,255),
      
      RED0:         color(153,  0,  0,255),
      RED1:         color(204,  0,  0,255),
      RED2:         color(255, 51, 51,255),

      TOOLBARA:     color( 41,171,202,255),
      TOOLBARI:     color( 69,174,200,255),

      INACTIVE:     color(230,230,230,255),
      ACTIVE:       color(235,235,235,255),

      CYAN:         color( 49,204,167,255),

      TEAL_0:       color( 28,117,138,255), TEAL_0_LT:    color( 28,117,138,128),
      TEAL_1:       color( 41,171,202,255), TEAL_1_LT:    color( 41,171,202,128),
      TEAL_2:       color( 88,196,221,255), TEAL_2_LT:    color( 88,196,221,128),
      TEAL_3:       color(156,220,235,255), TEAL_3_LT:    color(156,220,235,128),

      TRANSPARENT:  color(-1,-1,-1),

      WHITE:        color(255,255,255,255),
      BLACK:        color(  0,  0,  0,255),

      RED:          color(170, 29, 29,255), GREEN:        color(158,182, 58,255),
      BLUE:         color( 29, 86,170,255), YELLOW:       color(238,214, 15,255),
      ORANGE:       color(238,136, 15,255), GRAY:         color(128,128,128,255),

      BROWN:        color(155,145,135,255),

      Red:          color(255,  0,  0,255),     RedOrange:    color(255, 81,  0,255),
      Orange:       color(255,127,  0,255),     YellowOrange: color(255,190,  0,255),
      Yellow:       color(255,255,  0,255),

      YellowGreen:  color(192,255,  0,255),
      Green:        color(  0,255,  0,255), BlueGreen:    color(  0,127,127,255),
      Blue:         color(  0,  0,255,255), BlueViolet:   color( 92,  0,255,255),

      Violet:       color(127,  0,255,255), RedViolet:    color(191,  0,127,255),

      SIN:          color(170, 29, 29,255), SIN_LT:       color(170, 29, 29,128),
      COS:          color( 29, 86,170,255), COS_LT:       color( 29, 86,170,128),
      TAN:          color(158,182, 58,255), TAN_LT:       color(158,182,58,192),

      CSC:          color(170, 29, 29,255), CSC_LT:       color(238,136, 15,128),
      SEC:          color( 29, 86,170,255), SEC_LT:       color(158,182, 58,128),
      COT:          color(158,182, 58,255), COT_LT:       color(128,128,128,128),
      
      VERSINE:      color(255,127,  0,255), COVERSINE:    color(255,127,  0,255),
      EXSEC:        color(255, 20,147,255), EXCSC:        color(255, 20,147,255),
      
      PINK:         color(255, 20,147,255)
      
      
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

  /* Utility Functions ========================================================= */
  {

    var getColor=function(clr, alpha){ return color(red(clr), green(clr), blue(clr), alpha/100*255); };

    var increment=function(){

      app.dCursor++;

      if(app.dCursor>app.data.length-1){ app.dCursor=0; }

    };
    var decrement=function(){

      app.dCursor--;

      if(app.dCursor<0){ app.dCursor=app.data.length-1; }

    };

    var getAuto=function()      { return app.autoRun;        };
    var getLegend=function()    { return app.legend;         };

    var checkboxAuto=function() {

      app.autoRun=!app.autoRun;

      if(app.autoRun){ app.frameRate=10; }
      else           { app.frameRate=30; }

    };
    var checkboxLegend=function(){ app.legend=!app.legend;   };

    var getInfo=function()       { return app.infoOn;        };
    var toggleInfo=function()    { app.infoOn =! app.infoOn; };

  }

  /* Data types ================================================ */
  var collatz=function(i){
    
    this.i=i;
    this.path=[];
    this.max=0;
    this.sum=0;
    this.length=0;
    this.up=0;
    this.down=0;
    
    var p=this;
    
    var load=function(n){
      
      p.sum+=n;

      p.path.push(n)
      
      if(n>p.max){ p.max=n; }
      
      if(n===1){ return; }
      else {
        
        if(n%2===0){
          
          n/=2;
          p.down++;
        
        }
        else{

          n=n*3+1;
          p.up++;

        }
      
        load(n);

      }

    };

    load(i);

    this.length=this.path.length;
// println(this.i);

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

        this.text   = params.text;

        this.acolor = params.acolor;
        this.icolor = params.icolor;

        this.cursor = params.cursor;
        this.border = params.border;

        this.left   = 0;

      };
      root.prototype=Object.create(control.prototype);
      root.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();

            fill(this.icolor);

            if(this.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(this.acolor);

            }

            if(this.border){
              strokeWeight(1);
              stroke(this.acolor);
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

        this.text   = params.text;
        this.acolor = params.acolor;
        this.icolor = params.icolor;
        this.cursor = params.cursor;

      };
      toolbar.prototype=Object.create(control.prototype);
      toolbar.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            fill(this.icolor);

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(this.acolor);

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

    // Telemetry ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var telemetry=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.color  = params.color;
        this.cursor = params.cursor;

        /*  Dynamic x-coordinate */
        this.offset = 0;

      };
      telemetry.prototype=Object.create(control.prototype);
      telemetry.prototype.draw=function(){

        textFont(createFont("sans-serif", 14));

        var p=this;

        // Border
        var border=function(){

          strokeWeight(1);
          stroke(getColor(p.clr,100));

          if(p.hit){ fill(getColor(p.color, 75)); }
          else     { fill(getColor(p.color, 70)); }

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
                 "Alt:     \n" +
                 "Control: \n" +
                 "Shift:   \n\n\n" +
                 "Legend:  \n" +
                 "Autorun: \n" +
                 "Cursor:   \n" +
                 "Frame Rate:",
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
                 app.dCursor + "\n" +
                 app.frameRate,
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
      telemetry.prototype.moved=function(x,y){
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

    // OnOff ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

    // Info ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var info=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);
        
        this.text=params.text;
        this.execute=params.execute;
        this.retrieve=params.retrieve;
        this.color=params.color;
        this.cursor=params.cursor;

      };
      info.prototype=Object.create(control.prototype);
      info.prototype.draw=function(){

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
            textSize(24);
            textAlign(CENTER,CENTER);

            fill(getColor(CLRS.BLACK,50));

            if(this.hit &&
               this.parent.hit){ fill(getColor(CLRS.BLACK,75)); }

            textFont(createFont("monospace", 20));
            // textFont(createFont("fantasy", 24));
            // textFont(createFont("cursive", 24));
            
              text(this.text, this.w/2, this.h/2);

        popMatrix();

      };
      info.prototype.clicked=function(){
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

    // Graph ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var graph=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        // this.execute=params.execute;
        // this.retrieve=params.retrieve;
        // this.tag=params.tag;
        // this.text=params.text;
        this.color=params.color;
        this.cursor=params.cursor;
        // this.data=[];
        this.max=0;

        var txt="";
        var total=0;
        var offset=0;
        
        //  Load data
        for(var n=offset; n<=offset+560; n++){

          app.data.push(new collatz(n+2));

          if(app.data[n-offset].path.length>this.max){

            this.max=app.data[n-offset].length;

          }

// println(this.data[n-2].path.length);

        }

      };
      graph.prototype=Object.create(control.prototype);
      graph.prototype.draw=function(){

        var p=this;

        var convertLength=function(n){

            return n/p.max*p.h*0.5;

        };
        var convertPath=function(n,max){
    
            var retval=n/max*p.h*0.75;

            return retval;

        };
        var convertX=function(x, length){
            
            
          return x/length*p.w;

        };

        var border=function(){
          
          if(p.hit){ fill(getColor(this.color,5)); }
          else     { fill(getColor(this.color,10)); }

          rect(0, 0, p.w, p.h, 3);
              
        };
        var axes=function(){
          
          pushMatrix();
          
            translate(10, p.h-10);
              
              fill(CLRS.GRAY);
              ellipse(0,0,5,5);

              stroke(CLRS.BLACK);

              line(0, 0,      0, -p.h+20);
              line(0, 0, p.w-20,       0);

          popMatrix();
          
        };
        var displayCollatz=function(){
          
          pushMatrix();
          
            translate(p.x, p.y);
            scale(1,-1);

              strokeWeight(1);
              fill(getColor(CLRS.GREEN,25));
              stroke(getColor(CLRS.GREEN,50));

              beginShape();
                
                vertex(0,-500);
              
                for(var n=0; n<app.data[app.dCursor].path.length; n++){
                  
                  var x=convertX(n, app.data[app.dCursor].length);
                  var y=convertPath(app.data[app.dCursor].path[n],
                                    app.data[app.dCursor].max)-500;
              
                    vertex(x,y);

                    ellipse(x,y,1,1);

                };
                
                vertex(p.w-20,-500);
                vertex(     0,-500);

              endShape(CLOSE);
              
          popMatrix();
          
        };
        
        var drawLines=function(){

          pushMatrix();
            
            var sw=1;
            
            translate(10,p.h-10);
            scale(1,-1);
            strokeWeight(sw);
            
            for(var n=1; n<app.data.length; n++){
              
              if(n%2===0){ stroke(getColor(CLRS.RED,  75)); }
              else       { stroke(getColor(CLRS.BLACK,25)); }

              line(n*sw, 2, n*sw, convertLength(app.data[n].path.length));

            };

          popMatrix();
          
          stroke(getColor(CLRS.BLUE,100));
          strokeWeight(1.5);
          
            line(app.dCursor+8, 2, app.dCursor+8, p.h-10);

        };

        pushMatrix();

          translate(this.x+0.5, this.y+0.5);
              
            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

            }
            
            border();
            axes();
            drawLines();
            displayCollatz();

            //  Data cursor
            fill(CLRS.BLACK);
            textAlign(LEFT,TOP);
            textSize(12);
            textLeading(16);

            text("Integer: \n" +                 
                 "Max:     \n" +
                 "Sum:     \n" +
                 "Length:  \n" +
                 "Up:      \n" +
                 "Down:    \n",
                 20, 10);
            
            textAlign(RIGHT,TOP);

            text(app.data[app.dCursor].i          + "\n" +
                 app.data[app.dCursor].max        + "\n" +
                 app.data[app.dCursor].sum        + "\n" +
                 (app.data[app.dCursor].length-1) + "\n" +
                 app.data[app.dCursor].up         + "\n" +
                 app.data[app.dCursor].down,
                 110, 10);

            textAlign(LEFT,TOP);
            
            text(app.data[app.dCursor].path,
                 160, 10, 400,10000);
                 
        popMatrix();

      };

    }
    
  }
  graph.prototype.moved=function(x,y){

    if(mouseX>(this.x+x) &&
       mouseX<(this.x+x) + this.w &&
       mouseY>(this.y+y) &&
       mouseY<(this.y+y) + this.h){

      this.hit=true;
      
      if(mouseX>this.x-8 &&
         mouseX<this.x+this.w){
        // println(this.data[mouseX-this.x-8].path);
        if(mouseX-this.x-8>0 &&
           mouseX-this.x-8<app.data.length-1){
          app.dCursor=mouseX-this.x-8;
        }
        
      }

      for(var c in this.controls){ this.controls[c].moved((this.x+x), (this.y+y)); }

    }
    else{

      this.hit=false;

    }

  };

  
  /* Initialize ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    var initialize=function(){

      // Background --------------------------------------------------
      {

        /* root control       */
        var bk=new root(100, null, 0, 0, width, height,
          {text:      "root",
           acolor:    CLRS.ACTIVE,
           icolor:    CLRS.INACTIVE,
           cursor:    ARROW,
           border:    false});

        app.controls.push(bk);

        /* bar graph        */
        bk.controls.push(new graph(110, bk, 10, 40, 580, 550,
          {color:     CLRS.GRAY,
           acolor:    CLRS.BLUE,
           icolor:    CLRS.RED,
           cursor:    ARROW}));

      }

      // toolbar --------------------------------------------------
      {
        /* tlbar            */
        var tlbar=new toolbar(200, bk, 0, 0, width, 30,
          {text:      "Collatz Conjecture",
           acolor:    CLRS.TOOLBARA,
           icolor:    CLRS.TOOLBARI,
           cursor:    ARROW});

        bk.controls.push(tlbar);

          /* auto-run           */
          tlbar.controls.push(new onOff(210, tlbar, 15, 15, 13, 13,
            {execute:   checkboxAuto,
             retrieve:  getAuto,
             color:     CLRS.BLACK,
             cursor:    HAND}));

          /* settings   */
          tlbar.controls.push(new settings(220, tlbar, width-25, 5, 22, 22,
            {execute:   checkboxLegend,
             retrieve:  getLegend,
             color:     CLRS.BLACK,
             cursor:    HAND}));

          /* information   */
          tlbar.controls.push(new info(230, tlbar, width-52, 5, 22, 22,              
            {text:     "i",
             execute:  toggleInfo,
             retrieve: getInfo,
             color:    CLRS.SIN,
             cursor:   HAND}));
      }
      
      // Index --------------------------------------------------
      {
        // /* index              */
        // var idx=new index(300, bk, 10, 40, 130, 225,{radius:  5,
            // color:   CLRS.WHITE,
            // cursor:  ARROW});

        // bk.controls.push(idx);
          
          // /* Sine button        */
          // bk.controls.push(new button(310, bk, 15, 45, 120, 20,              
            // {text:     "Sin "+CONSTANTS.THETA,
             // execute:  toggleSine,
             // tag:      getSine,
             // retrieve: getSineOn,
             // color:    CLRS.SIN,
             // cursor:   HAND}));
           
          // /* Cosine button      */
          // bk.controls.push(new button(320, bk, 15, 65, 120, 20,             
            // {text:     "Cos "+CONSTANTS.THETA,
             // execute:  toggleCosine,
             // tag:      getCosine,
             // retrieve: getCosineOn,
             // color:    CLRS.COS,
             // cursor:   HAND}));
          
          // /* Tangent button     */
          // bk.controls.push(new button(330, bk, 15, 85, 120, 20,             
            // {text:     "Tan "+CONSTANTS.THETA,
             // execute:  toggleTangent,
             // tag:      getTangent,
             // retrieve: getTangentOn,
             // color:    CLRS.TAN,
             // cursor:   HAND}));

          // /* Cosecant button    */
          // bk.controls.push(new button(340, bk, 15, 110, 120, 20,            
            // {text:     "Csc "+CONSTANTS.THETA,
             // execute:  toggleCosecant,
             // tag:      getCosecant,
             // retrieve: getCosecantOn,
             // color:    CLRS.K_PINK_0,
             // cursor:   HAND}));
          
          // /* Secant button      */
          // bk.controls.push(new button(350, bk, 15, 130, 120, 20,           
            // {text:     "Sec "+CONSTANTS.THETA,
             // execute:  toggleSecant,
             // tag:      getSecant,
             // retrieve: getSecantOn,
             // color:    CLRS.K_PINK_2,
             // cursor:   HAND}));
             
          // /* Cotangent button   */
          // bk.controls.push(new button(360, bk, 15, 150, 120, 20,           
            // {text:     "Cot "+CONSTANTS.THETA,
             // execute:  toggleCotangent,
             // tag:      getCotangent,
             // retrieve: getCotangentOn,
             // color:    CLRS.TAN_LT,
             // cursor:   HAND}));

          // /* Excosecant button   */
          // bk.controls.push(new button(360, bk, 15, 175, 120, 20,           
            // {text:     "Excsc "+CONSTANTS.THETA,
             // execute:  toggleExcosecant,
             // tag:      getExcosecant,
             // retrieve: getExcosecantOn,
             // color:    CLRS.K_TEAL_0,
             // cursor:   HAND}));
             
          // /* Coversine button   */
          // bk.controls.push(new button(360, bk, 15, 195, 120, 20,           
            // {text:     "Cvs "+CONSTANTS.THETA,
             // execute:  toggleCoversine,
             // tag:      getCoversine,
             // retrieve: getCoversineOn,
             // color:    CLRS.K_TEAL_2,
             // cursor:   HAND}));

          // /* Versine button   */
          // bk.controls.push(new button(360, bk, 15, 220, 120, 20,           
            // {text:     "Ver "+CONSTANTS.THETA,
             // execute:  toggleVersine,
             // tag:      getVersine,
             // retrieve: getVersineOn,
             // color:    CLRS.K_BROWN_1,
             // cursor:   HAND}));

          // /* Exsecant button   */
          // bk.controls.push(new button(360, bk, 15, 240, 120, 20,           
            // {text:     "Exsec "+CONSTANTS.THETA,
             // execute:  toggleExsecant,
             // tag:      getExsecant,
             // retrieve: getExsecantOn,
             // color:    CLRS.K_ORANGE_1,
             // cursor:   HAND}));
    }
      
      // Telemetry --------------------------------------------------
        /* Telemetry          */
        var telem=new telemetry(300, bk, width, 30, 200, 570,
          {color:     CLRS.BLACK,
           cursor:    ARROW});

        bk.controls.push(telem);


             
    };

    var incrementTheta=function(){

      app.theta+=1;
      if(app.theta>360){ app.theta=0; }

    };
    var update=function(){
      
      frameRate(app.frameRate);

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
      var keyTyped=function(){
        /* println("typed " + (key) + " " + keyCode); */
      };
      var keyReleased=function(){

        app.keys[keyCode]=false;

      };

  }

  /* Mouse Events ================================================== */
  {

    var mouseClicked=function(){

      switch(mouseButton){

        case LEFT:   for(var c in app.controls){ app.controls[c].clicked();  } break;
        // case RIGHT:  for(var c in app.controls){ app.controls[c].rClicked(); } break;
        // case CENTER: for(var c in app.controls){ app.controls[c].cClicked(); } break;

        default:     break;
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






































































// 1729 = 10^3+9^3 = 12^3+1^3
}};
