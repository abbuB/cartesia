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
+projecteuler.net
+www.numberempire.com
+oeis.org
+math.stackexchange.com
+jasondavies.com

*/

var diagrams = function(processingInstance){
  with (processingInstance){
/*
      https://xkcd.com/710/

      https://en.wikipedia.org/wiki/Collatz_conjecture

    TO DO:

      - size

      - reset button
      - data cursor
      
      - Navigation
        
        - increment/decrement
        - last/first
        - scroll
        - add row
        - remove row

      - slow calculation to show method
      - fix the changing fonts


      

    Research:


    TO DONE:

      - only draw telemetry if it's visible    

        textFont(createFont("sans-serif", 14));
        textFont(createFont("monospace", 14));
        textFont(createFont("serif", 14));
        textFont(createFont("fantasy", 14));
        textFont(createFont("cursive", 14));

        println( typeof this.color );

*/

  var application=function(){

    /* Initialize -------------------- */
    {
      
      frameRate(0);

      cursor(WAIT);
      strokeCap(SQUARE);

      angleMode="radians";

      size(900, 700); // set size of canvas

    }

    this.debug=true;          //  mode that displays enhanced debugging tools

    this.frameRate=0;        //  refresh speed

    this.mouseX=0;            //  current mouseX location
    this.mouseY=0;            //  current mouseY location

    this.left=false;          //  Is the left mouse button pressed
    this.right=false;         //  Is the right mouse button pressed
    this.center=false;        //  Is the center mouse button pressed

    this.focus=-1;             //  The ID of the control with focus

    this.controls=[];         //  collection of controls in the app
    this.keys=[];             //  Array holding the value of all keycodes

    this.autoRun=false;       //  Alpha changes automatically
    this.infoOn=false;        //  Is the info frame displayed
    this.legend=false;        //  Is the telemetry visible
    
    /* App Specific ------------------ */

    this.cursor=1;           //  position of the cursor in grid
    this.cells=0;             //  # of cells in the grid
    
    this.levels=10;

    this.levelsMax=20
    this.levelsMin=5;

    this.row=this.levels-2;
    this.col=0;
    
    this.path=[];             //  The final path of the pyramid

    this.complete=false;

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

      DEGREES:        "°",
      PI:             "π",
      TRIANGLE_UP:    "▲",
      TRIANGLE_DOWN:  "▼",
      INFINITY:       "∞",
      THETA:          "θ",
      RADIANS:        "ᶜ",
      IDENTICAL:      "≡",
      TRIANGLE_R:     "►",
      TRIANGLE_L:     "◄"

    };
    var NAVIGATION={
      DECREMENT:      0,
      FIRST:          1,
      INCREMENT:      2,
      LAST:           3,
      DECREMENTPAGE:  4,
      INCREMENTPAGE:  5
    };

  }

  /* Data types ================================================ */
  {
    
    var pt=function(row,col){

      this.row=row;
      this.col=col;

    };

  }

  /* Utility Functions ========================================================= */
  {

    var getColor=function(clr, alpha){ return color(red(clr), green(clr), blue(clr), alpha/100*255); };

    var reset=function(){
      
      app.autoRun=false;      
      app.path=[];
      app.complete=false;

      app.controls[1].reset();
      
      app.cursor=0;

      println(app.levels);
      
    };
    
    var incrementRows=function(){
      
      if(app.levels<app.levelsMax){

        app.levels++;

        app.levels=(constrain)(app.levels, app.levelsMin, app.levelsMax);

        reset();

      }

    };
    var decrementRows=function(){
      
      if(app.levels>app.levelsMin){
        
        app.levels--;
        
        app.levels=(constrain)(app.levels, app.levelsMin, app.levelsMax);

        reset();
      
      }

    };

    var incrementCursor=function(){

      app.cursor++;
      
      app.cursor=(constrain)(app.cursor, 0, app.cells-1);


    };
    var decrementCursor=function(){

      app.cursor--;
      
      app.cursor=(constrain)(app.cursor, 0, app.cells-1);
      
    };
    var firstRecord=function()    { app.cursor=0;                     };
    var lastRecord=function()     { app.cursor=app.cells-1;           };

    var getAuto=function()        { return app.autoRun;               };
    var getLegend=function()      { return app.legend;                };

    var checkboxAuto=function()   {

      app.autoRun=!app.autoRun;

      // if(app.autoRun){ app.frameRate=30; }
      // else           { app.frameRate=60; }

    };
    var checkboxLegend=function() { app.legend=!app.legend;           };

    var getInfo=function()        { return app.infoOn;                };
    var toggleInfo=function()     { app.infoOn =! app.infoOn;         };

    // var setDataCursor=function(n) {

      // app.cursor=(constrain)(floor(n), 0, app.cells-1);

    // };
    
    var navCursor=function()      { return app.cursor+1;              };
    var navRecordCount=function() { return app.cells;                 };
    var navSetCursor=function(n)  {

      var setValue=round(n/app.cells*app.cells);

      if(setValue>=0 &&
         setValue<app.cells){
        app.cursor=(constrain)(setValue,0,app.cells-1);
      }

    };

    var inPath=function(row,col){

      var retVal=false;
      
      for(var n=0; n<app.path.length; n++){
          
        if(app.path[n].row===row &&
           app.path[n].col===col){
// println(retVal);               
          retVal=true;
          break;

        }

      }
      
      return retVal;

    };

  }

  /* Controls ================================================ */
  {

    // Control ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
      control.prototype.dragged=function(){

        if(this.hit){

          for(var c in this.controls){ this.controls[c].dragged(); }

        }

      };
      control.prototype.pressed=function(){

        if(this.hit){

          for(var c in this.controls){ this.controls[c].pressed(); }

        }

      };
      control.prototype.released=function(){};
      control.prototype.typed=function(){};
      control.prototype.over=function(){};
      control.prototype.out=function(){

        this.hit=false;
        app.focus=-1;
        for(var c in this.controls){ this.controls[c].out(); }

      };

    }

    // root ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

    // Container ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

    // Splash Screen ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var splash=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.color=params.color;
        this.cursor=params.cursor;
        this.retrieve=params.retrieve;

      };
      splash.prototype=Object.create(control.prototype);
      splash.prototype.draw=function(){

        if(this.retrieve()){

          pushMatrix();

            translate(this.x, this.y);

              strokeWeight(1);
              stroke(getColor(this.color, 40));
              fill(getColor(this.color, 90));

              if(this.hit &&
                 this.parent.hit){

                app.focus=this.id;
                cursor(this.cursor);

                fill(getColor(this.color, 100));

              }

                rect(0, 0, this.w, this.h, 20);

              textSize(16);
              textAlign(CENTER,BOTTOM);
              fill(getColor(CLRS.YELLOW,75));

                text("The Collatz Conjecture", this.w/2, 30);

              var txt0="A conjecture in mathematics named after Lothar Collatz that is also known as the 3n + 1 conjecture or the hailstone sequence.";
              var txt1="Take any positive integer n.  If n is even, divide it by 2 to get n / 2.  If n is odd, multiply it by 3 and add 1 to obtain 3n + 1.  Repeat the process indefinitely.  The conjecture is that no matter what number you start with, you will always eventually reach 1.";
              var txt2="For instance, starting with n = 12, one gets the sequence 12, 6, 3, 10, 5, 16, 8, 4, 2, 1.";
              var txt3="If the conjecture is false, it can only be because there is some starting number which gives rise to a sequence that does not contain 1. Such a sequence might enter a repeating cycle that excludes 1, or increase without bound. No such sequence has been found.";
              var txt4="https://en.wikipedia.org/wiki/Collatz_conjecture";

              var txt5="f(n)";
              var txt6="n/2";
              var txt7="if n" + CONSTANTS.IDENTICAL + "0 (mod 2)";
              var txt8="3n+1";
              var txt9="if n" + CONSTANTS.IDENTICAL + "1 (mod 2)";
              var txt10="{";

              textSize(11);
              textAlign(LEFT,TOP);
              fill(getColor(CLRS.WHITE,75));

                text(txt0 + "\n\n" +
                     txt1 + "\n\n" +
                     txt2 + "\n\n" +
                     txt3,
                     20, 40,
                     this.w-30, this.h-40);

              textAlign(LEFT,CENTER);
              fill(getColor(CLRS.K_TEAL_2,100));

                text(txt4, this.w/2-textWidth(txt4)/2, 330);

              var txtX=65;
              var txtY=-30;

              // Formulas
              textAlign(LEFT,TOP);
              textSize(16);
              fill(getColor(CLRS.YELLOW,90));

                text(txt5,  30+txtX, 300+txtY);

                text(txt6,  85+txtX, 290+txtY);
                text(txt7, 135+txtX, 290+txtY);

                text(txt8,  85+txtX, 310+txtY);
                text(txt9, 135+txtX, 310+txtY);

              textSize(48);
              textAlign(CENTER,CENTER);

                text(txt10, 70+txtX, 305+txtY);

              // Draw child controls
              for(var c in this.controls){ this.controls[c].draw(); }

          popMatrix();

        }

      };

    }

    // Index ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

    // navScroll ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var navScroll=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.color    = params.color;
        this.cursor   = params.cursor;
        this.execute  = params.execute;

      };
      navScroll.prototype=Object.create(control.prototype);
      navScroll.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            noFill();
            // fill(getColor(this.color, 5));

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(getColor(this.color, 5));
              strokeWeight(0.25);
              stroke(getColor(CLRS.K_TEAL_0, 50));

            }

              rect(1, 1, this.w-2, this.h-2);

            var xPos=floor(app.cursor/app.cells*this.w);

            stroke(getColor(CLRS.RED,100));
            strokeWeight(0.5);

// println(xPos);
              line(xPos,0,xPos,30);

            // Draw child controls
            for(var c in this.controls){ this.controls[c].draw(); }

        popMatrix();

      };
      navScroll.prototype.dragged=function(x,y){

        if(this.hit &&
           app.focus===this.id){

          var X=round((mouseX-this.x)/this.w*app.cells);

          if(X>=0 && X<=app.cells){
            this.execute(X);
          }

          for(var c in this.controls){ this.controls[c].dragged(); }

        }

      };
      navScroll.prototype.clicked=function(x,y){

        if(this.hit &&
           app.focus===this.id){

          var X=round((mouseX-this.x)/this.w*app.cells);

          if(X>=0 && X<=app.cells){
            this.execute(X);
          }

          for(var c in this.controls){ this.controls[c].clicked(); }

        }

      };
    }

    // NavBar ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var navbar=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.text        = params.text;
        this.acolor      = params.acolor;
        this.icolor      = params.icolor;
        this.cursor      = params.cursor;
        this.position    = params.position;
        this.recordCount = params.recordCount;
        this.execute     = params.execute;

      };
      navbar.prototype=Object.create(control.prototype);
      navbar.prototype.draw=function(){

        pushMatrix();

          translate(this.x+0.5, this.y+0.5);

            noStroke();
            fill(this.icolor);

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(this.acolor);

            }

              rect(0, 0, this.w, this.h);

            stroke(getColor(CLRS.K_TEAL_0,25));
            strokeWeight(0.25);

              line(0, 0, this.w,      0); // Top Border

            // Caption
            fill(getColor(CLRS.BLACK, 50));

            if(this.hit){ fill(getColor(CLRS.K_TEAL_0,100)); }

            textSize(16);
            textAlign(CENTER,CENTER);
            var txt=this.position() + " of " + this.recordCount();

              text(txt, this.w/2, this.h/2);

            // Draw child controls
            for(var c in this.controls){ this.controls[c].draw(); }

        popMatrix();

      };


    }

    // Navigation Buttons * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var navButton=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.execute=params.execute;
        this.type=params.type;
        this.retrieve=params.retrieve;
        this.color=params.color;
        this.cursor=params.cursor;

      };
      navButton.prototype=Object.create(control.prototype);
      navButton.prototype.draw=function(){

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
            fill(getColor(this.color, 50));

            if(this.hit){ fill(getColor(this.color, 100)); }

            noStroke();
            textAlign(CENTER,CENTER);
            textSize(16);

              switch(this.type){

                case NAVIGATION.FIRST:          text("|"+CONSTANTS.TRIANGLE_L, this.w/2+offset, this.h/2+offset); break;
                case NAVIGATION.DECREMENT:      text(CONSTANTS.TRIANGLE_L,  this.w/2+offset, this.h/2+offset); break;
                case NAVIGATION.INCREMENT:      text(CONSTANTS.TRIANGLE_R,  this.w/2+offset, this.h/2+offset); break;
                case NAVIGATION.LAST:           text(CONSTANTS.TRIANGLE_R+"|", this.w/2+offset, this.h/2+offset); break;
                case NAVIGATION.INCREMENTPAGE:  text(CONSTANTS.TRIANGLE_R+CONSTANTS.TRIANGLE_R, this.w/2+offset, this.h/2+offset); break;
                case NAVIGATION.DECREMENTPAGE:  text(CONSTANTS.TRIANGLE_L+CONSTANTS.TRIANGLE_L, this.w/2+offset, this.h/2+offset); break;

                default:  break;

              }
              // switch(this.type){

                // case NAVIGATION.FIRST:          text("|<", this.w/2+offset, this.h/2+offset); break;
                // case NAVIGATION.DECREMENT:      text("<",  this.w/2+offset, this.h/2+offset); break;
                // case NAVIGATION.INCREMENT:      text(">",  this.w/2+offset, this.h/2+offset); break;
                // case NAVIGATION.LAST:           text(">|", this.w/2+offset, this.h/2+offset); break;
                // case NAVIGATION.INCREMENTPAGE:  text(">>", this.w/2+offset, this.h/2+offset); break;
                // case NAVIGATION.DECREMENTPAGE:  text("<<", this.w/2+offset, this.h/2+offset); break;

                // default:  break;

              // }
        popMatrix();

      };
      navButton.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.hit &&
           app.focus===this.id){

          this.execute();
          // this.on=!this.on;

          for(var c in this.controls){ this.controls[c].clicked(); }

        }

      };

    }

    // toolbar ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var toolbar=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.text        = params.text;
        this.acolor      = params.acolor;
        this.icolor      = params.icolor;
        this.cursor      = params.cursor;
        this.position    = params.position;
        this.recordCount = params.recordCount;

      };
      toolbar.prototype=Object.create(control.prototype);
      toolbar.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            fill(getColor(CLRS.BLACK,5));

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(this.acolor);

            }

              rect(0, 0, this.w, this.h);

            // Caption
            fill(CLRS.K_TEAL_0);
            textSize(16);
            textAlign(CENTER,CENTER);

            if(this.hit &&
               this.parent.hit){ fill(CLRS.WHITE); }
                 
              text(this.text, this.w/2, this.h/2);

            // Draw child controls
            for(var c in this.controls){ this.controls[c].draw(); }

        popMatrix();

      };

    }

    // Telemetry ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

        if(app.legend===false &&
           this.offset===0){ return; }

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

            text("            \n" +
                 "x:          \n" +
                 "y:          \n\n\n" +
                 "Left:       \n" +
                 "Right:      \n" +
                 "Center:     \n\n\n" +
                 "Focus:      \n" +
                 "Focused:    \n\n\n" +
                 "Alt:        \n" +
                 "Control:    \n" +
                 "Shift:      \n\n\n" +
                 "Legend:     \n" +
                 "Autorun:    \n" +
                 "Cursor:     \n" +
                 "Frame Rate: \n" +
                 "Info:",
                 col1, row0+15);

          fill(getColor(CLRS.YELLOW,75));

            text("\n" +
                 mouseX                     + "\n" +
                 mouseY                     + "\n\n\n" +
                 app.left                   + "\n" +
                 app.right                  + "\n" +
                 app.center                 + "\n\n\n" +
                 app.focus                  + "\n" +
                 focused                    + "\n\n\n" +
                 app.keys[KEYCODES.ALT]     + "\n" +
                 app.keys[KEYCODES.CONTROL] + "\n" +
                 app.keys[KEYCODES.SHIFT]   + "\n\n\n" +
                 app.legend                 + "\n" +
                 app.autoRun                + "\n" +
                 app.cursor                + "\n" +
                 app.frameRate              + "\n" +
                 app.infoOn,
                 col2, row0+15);

          var txt="Press the left and right arrow keys to increment and decrement integer.";

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

    // OnOff ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
            fill(getColor(this.color,50));

            if(this.hit &&
               this.parent.hit){ fill(getColor(CLRS.BLACK,75)); }
               
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

    // Info ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

            fill(getColor(this.color,50));

            if(this.hit &&
               this.parent.hit){ fill(getColor(CLRS.BLACK,75)); }

            textFont(createFont("monospace", 20));
            // textFont(createFont("fantasy", 24));
            // textFont(createFont("cursive", 24));

              text(this.text, this.w/2+offset, this.h/2+offset);

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

    // Button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var button=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.execute=params.execute;
        this.retrieve=params.retrieve;
        this.text=params.text;
        this.color=params.color;
        this.cursor=params.cursor;

        this.on=false;

      };
      button.prototype=Object.create(control.prototype);
      button.prototype.draw=function(){

          var offset=0;

          pushMatrix();

            translate(this.x, this.y);
            scale(1,-1);

              // Border
              strokeWeight(0.75);

              fill(getColor(CLRS.ACTIVE, 5));
              noStroke();

              if(this.hit &&
                 this.parent.hit){

                if(app.left){ offset=1; }

                app.focus=this.id;
                cursor(this.cursor);

                fill(getColor(CLRS.ACTIVE, 50));

              }

              rect(offset, -this.h-offset, this.w, this.h, 3);

              // Caption
              if(this.hit &&
                 this.parent.hit){  fill(255,255,255); }
              else               {  fill(128,128,128); }

              scale(1,-1);

              textAlign(CENTER,CENTER);
              textSize(12);
              this.w=textWidth(this.text)+10;

                text(this.text, this.w/2+offset, this.h/2+offset);

          popMatrix();

      };
      button.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.hit &&
           app.focus===this.id){

          this.execute();

          for(var c in this.controls){ this.controls[c].clicked(); }

        }

      };

    }

    // Hexagon Button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var hexButton=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.path=[];

        this.row      = params.row;
        this.col      = params.col;
      
        this.integer  = params.integer;

        this.execute  = params.execute;
        this.retrieve = params.retrieve;
        this.text     = params.text;
        this.color    = params.color;
        this.cursor   = params.cursor;

        this.active   = false;
        this.on       = false;

      };
      hexButton.prototype=Object.create(control.prototype);
      hexButton.prototype.draw=function(){

          var offset=0;

          pushMatrix();

            translate(this.x, this.y);
            scale(1,-1);

              // Border
              strokeWeight(0.5);

              stroke(getColor(this.color, 25));
              fill(  getColor(this.color,  5));

              if(this.hit &&
                 this.parent.hit){

                if(app.left){ offset=1; }

                app.focus=this.id;
                cursor(this.cursor);

                fill(getColor(this.color, 25));

              }
// Origin
// ellipse(offset,-offset,this.w,this.w);

              if(this.on    ){ fill(getColor(CLRS.GREEN,25));     }
              if(app.complete===true &&
                 inPath(this.row,this.col)===true){
                fill(getColor(CLRS.BLUE,25));
                stroke(getColor(CLRS.BLUE, 50));
              }
              
              if(app.cursor===this.integer){ fill(getColor(CLRS.RED,25)); }

              var factor=this.w/2;
              var xPos=factor;
              var yPos=(factor/cos(radians(30)));

                beginShape();

                  vertex(  xPos+offset,  sin( radians(30))*factor-offset);
                  vertex(       offset,  yPos-offset                    );
                  vertex( -xPos+offset,  sin(radians(150))*factor-offset);
                  vertex( -xPos+offset,  sin(radians(210))*factor-offset);
                  vertex(       offset, -yPos-offset                    );
                  vertex(  xPos+offset,  sin(radians(330))*factor-offset);

                endShape(CLOSE);

                // line(0,0, -xPos, sin(radians(210))*factor-offset);
                // line(0,0,  xPos, sin(radians(330))*factor-offset);
                // line(0,0,     0, yPos-offset                    );

              // Caption
              if(this.hit &&
                 this.parent.hit){  fill(255,255,255);             }
              else               {  fill(getColor(this.color,75)); }

              scale(1,-1);

              textAlign(CENTER,CENTER);
              textSize(12);
              // this.w=textWidth(this.text)+10;

                text(this.text, offset, offset);

          popMatrix();

      };
      hexButton.prototype.moved=function(x,y){
      /* Overridden because of the shape */

        if(dist(mouseX, mouseY,
                this.x+x, 
                this.y+y)<this.w/2){

          this.hit=true;

          // for(var c in this.controls){ this.controls[c].moved(); }
// println(this.integer);

        }
        else{
          
          this.hit=false;
          
        }

      };
      hexButton.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.hit){
          
          for(var n=0; n<this.path.length; n++){
            println(this.path[n].row + ", " + this.path[n].col);
          }
          
          // this.execute(this.row + "," + this.col + "  :  " + this.text);
          
          // var left=this.parent.controls[this.row+1][this.col].text;
          // var right=this.parent.controls[this.row+1][this.col+1].text;
          
          // if(left<right){ this.text+=left;  }
          // else          { this.text+=right; }

          // this.on=true;
          
          app.cursor=this.integer;
println(app.cursor);
        }

      };
      hexButton.prototype.calc=function(){
        
        this.active=true;
          
          var x=this.parent.x;
          var y=this.parent.y;

          var left =this.parent.controls[this.row+1][this.col  ].text;
          var right=this.parent.controls[this.row+1][this.col+1].text;

          // strokeWeight(2);        
          // stroke(CLRS.BLUE);

          // line(this.x+x,this.y+y,
               // this.parent.controls[this.row+1][this.col].x+x,
               // this.parent.controls[this.row+1][this.col].y+y);

          // stroke(CLRS.GREEN);
          // line(this.x+x,this.y+y,
               // this.parent.controls[this.row+1][this.col+1].x+x,
               // this.parent.controls[this.row+1][this.col+1].y+y);
            

            
          if(left<=right){

            this.text+=left;

            var arr=this.parent.controls[this.row+1][this.col].path;

            for(var n=0; n<arr.length; n++){
              this.path.push(new pt(arr[n].row,
                                    arr[n].col));
            }

            this.path.push(new pt(this.row+1,
                                  this.col));

          }
          else{

            this.text+=right;

            var arr=this.parent.controls[this.row+1][this.col+1].path;

            for(var n=0; n<arr.length; n++){
              this.path.push(new pt(arr[n].row,
                                    arr[n].col));
            }

            this.path.push(new pt(this.row+1,
                                  this.col+1));

          }

          this.set

        // this.active=false;

      };
      hexButton.prototype.set=function(){

        this.on=true;

      };
      
    }

    var printPath=function(){
    
      for(var n=0; n<app.path.length; n++){
        println(app.path[n].row + ", " + app.path[n].col);
      }
          
    };
    
    // Pyramid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var pyramid=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);
        
        this.levels=params.levels;
        this.size=params.size;
        
        this.row=0;
        this.col=0;

        // Initialize
        this.load=function(){
          
          var xPos=0;
          var yPos=0;
          var ID=0;
          var row=[];
          var total=0;
          
          var rowOffset=(this.size/2/cos(radians(30))) + sin(radians(30))*this.size/2;

          /* Pascal buttons        */
          for(var y=0; y<this.levels; y++){

            for(var x=0; x<=y; x++){
              
              ID=x + "," + y;
              
              xPos = this.x + x*this.size - y*this.size/2;
              yPos = this.y + y*rowOffset+30;
              
              row.push(new hexButton(ID, this, xPos+width/2, yPos, this.size, this.size,
                {row:       y,
                 col:       x,
                 integer:   total,
                 color:     CLRS.K_TEAL_0,
                 cursor:    HAND,
                 text:      round(random(10,99)),
                 execute:   executePascal,
                 retrieve:  retrievePascal}));

              total++;

            }

            this.controls.push(row);
            row=[];

          }

          println(total);
          
          app.cells=total;

        };

        this.load();
        
      };
      pyramid.prototype=Object.create(control.prototype);
      pyramid.prototype.draw=function(){

        pushMatrix();

          translate(this.x+0.5,this.y+0.5);

            noFill();            
            noStroke();
            
            if(this.hit){

              // fill(getColor(CLRS.YELLOW,5));
              // stroke(CLRS.GREEN);  
              // strokeWeight(0.5);
              app.focus=this.id;

            }
            
            rect(0,0,this.w-1,this.h-1);

            for(var c=0; c<this.controls.length; c++){

              for(var r in this.controls[c]){

                this.controls[c][r].draw(this.x,this.y);

              }

            }

        popMatrix();
        
      };
      pyramid.prototype.reset=function(){

        this.levels=app.levels;
        this.size=height/app.levels;
      
        this.controls=[];
        this.load();

        for(var r=0; r<this.controls.length; r++){

          for(var c in this.controls[r]){

            this.controls[r][c].on=false;;
            this.controls[r][c].text=round(random(99));

          }

        }

        app.row=app.levels-2;
        app.col=0;
        
        this.on=false;
        
      };    
      pyramid.prototype.moved=function(){
      /* Overridden because of the shape */
      
        if(mouseX>this.x &&
           mouseX<this.x+this.w &&
           mouseY>this.y &&
           mouseY<this.y+this.h){
             
          this.hit=true;
          
          for(var r=0; r<this.controls.length; r++){

            for(var c in this.controls[r]){

              this.controls[r][c].moved(this.x,this.y);
            
            }

          }
          
        }
        else{
          
          this.hit=false;
          
        }
             
      };
      pyramid.prototype.calc=function(){
        
        // if(this.on===false){

          // for(var r=this.controls.length-2; r>-1; r--){

            // for(var c=this.controls[r].length-1; c>-1; c--){

              // this.controls[r][c].set();
            
            // }

          // }
        
        // }
        
        // this.on=true;

      }
      pyramid.prototype.step=function(row,col){

        this.controls[row][col].calc();
        
        this.controls[row+1][col  ].set();
        this.controls[row+1][col+1].set();

      }      
      pyramid.prototype.out=function(){ this.hit=false; }
      pyramid.prototype.pressed=function(){}
      pyramid.prototype.dragged=function(){}
      pyramid.prototype.clicked=function(){
        
        if(this.hit){

          for(var r=this.controls.length-1; r>-1; r--){

            for(var c=this.controls[r].length-1; c>-1; c--){

              this.controls[r][c].clicked();
            
            }

          }
        
        }
        
      }

    }

  }

  var executePascal=function(n){
    println(n);
  };
  var retrievePascal=function(){
    println("retrieve pascal");
  };
  var updatePascal=function(){
    
    app.controls[1].reset();

  };
  var calcPascal=function(){

    // app.controls[1].calc();

    app.controls[1].step(13,0);

  };
  var pyramidReset=function(){
    
    app.controls[1].reset();
    
  };
  
  var stepPascal=function(){

    if(app.col===0 &&
       app.row===-1){ return; }

    var pyramid=app.controls[1];

    pyramid.step(app.row, app.col);

    if(app.col>=(pyramid.controls[app.row].length-1)){ app.col=0; app.row--; }
    else                                             { app.col++;            }

    if(app.row===-1 &&
       app.col===0){

      app.path=(splice)(app.path, pyramid.controls[0][0].path);

      app.complete=true;

    }

  };

  

  /* Initialize ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    var initialize=function(){

      // Background --------------------------------------------------

        /* root control       */
        var bk=new root(100, null, 0, 0, width, height,
          {text:      "root",
           acolor:    CLRS.ACTIVE,
           icolor:    CLRS.INACTIVE,
           cursor:    ARROW,
           border:    false});

        app.controls.push(bk);
            
          app.controls.push(new pyramid(1111, bk, 0, 30, width, height-55,
            {levels:  app.levels,
             size:    height/app.levels}));

        
      // toolbar --------------------------------------------------
      {
        /* tlbar            */
        var tlbar=new toolbar(200, bk, 0, 0, width, 30,
          {execute:   pyramidReset,
           text:      "Minimum Sum Triangle",
           acolor:    CLRS.K_TEAL_3,
           icolor:    CLRS.ACTIVE,
           cursor:    ARROW});

        bk.controls.push(tlbar);

          /* auto-run           */
          tlbar.controls.push(new onOff(210, tlbar, 15, 15, 13, 13,
            {execute:   checkboxAuto,
             retrieve:  getAuto,
             color:     CLRS.K_TEAL_0,
             cursor:    HAND}));

          /* settings   */
          tlbar.controls.push(new settings(220, tlbar, width-25, 5, 22, 22,
            {execute:   checkboxLegend,
             retrieve:  getLegend,
             color:     CLRS.K_TEAL_0,
             cursor:    HAND}));

          /* information   */
          tlbar.controls.push(new info(230, tlbar, width-52, 5, 22, 22,
            {text:     "i",
             execute:  stepPascal,
             retrieve: getInfo,
             color:    CLRS.K_TEAL_0,
             cursor:   HAND}));
      }

      // Navigation --------------------------------------------------
      {
        var h=25;

        /* Navbar            */
        var nvbar=new navbar(300, bk, 0, height-25, width, h,
          {text:        "Navigation",
           icolor:      CLRS.INACTIVE,
           acolor:      CLRS.K_TEAL_4,
           cursor:      ARROW,
           position:    navCursor,
           recordCount: navRecordCount,
           execute:     navSetCursor});

        bk.controls.push(nvbar);

          /* Decrement Page        */
          nvbar.controls.push(new navButton(310, nvbar, 0, 0, 50, h,
            {execute:   decrementRows,
             type:      NAVIGATION.DECREMENTPAGE,
             retrieve:  navCursor,
             color:     CLRS.BLACK,
             cursor:    HAND}));

          /* Increment Page       */
          nvbar.controls.push(new navButton(320, nvbar, width-50, 0, 50, h,
            {execute:  incrementRows,
             type:     NAVIGATION.INCREMENTPAGE,
             retrieve: navCursor,
             color:    CLRS.BLACK,
             cursor:   HAND}));

          /* First Record         */
          nvbar.controls.push(new navButton(330, nvbar, 50, 0, 25, h,
            {execute:   firstRecord,
             type:      NAVIGATION.FIRST,
             retrieve:  navCursor,
             color:     CLRS.BLACK,
             cursor:    HAND}));

          /* Decrement Record     */
          nvbar.controls.push(new navButton(340, nvbar, 75, 0, 25, h,
            {execute:   decrementCursor,
             type:      NAVIGATION.DECREMENT,
             retrieve:  navCursor,
             color:     CLRS.BLACK,
             cursor:    HAND}));

          /* Increment Record     */
          nvbar.controls.push(new navButton(350, nvbar, width-100, 0, 25, h,
            {execute:  incrementCursor,
             type:     NAVIGATION.INCREMENT,
             retrieve: navCursor,
             color:    CLRS.BLACK,
             cursor:   HAND}));

          /* Last Record          */
          nvbar.controls.push(new navButton(360, nvbar, width-75, 0, 25, h,
            {execute:  lastRecord,
             type:     NAVIGATION.LAST,
             retrieve: navCursor,
             color:    CLRS.BLACK,
             cursor:   HAND}));

          /* Scroll               */
          nvbar.controls.push(new navScroll(370, nvbar, 100, 0, width-200, h,
            {execute:   navSetCursor,
             color:     CLRS.BLACK,
             cursor:    MOVE}));

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
        var telem=new telemetry(400, bk, width, 30, 200, 570,
          {color:     CLRS.BLACK,
           cursor:    ARROW});

        bk.controls.push(telem);

      // Loading --------------------------------------------------

        /* Splash Screen      */
        // var splashScreen=new splash(500, bk, 100, 100, 400, 400,
          // {color:     CLRS.BLACK,
           // retrieve:  getInfo,
           // cursor:    CROSS});

        // bk.controls.push(splashScreen);

          // /* Close              */
          // splashScreen.controls.push(new button(510, splashScreen, 180, 360, 120, 20,
            // {text:      "Close",
             // execute:   toggleInfo,
             // color:     CLRS.WHITE,
             // cursor:    HAND}));

    };
    
    var currentData=function(){

      //  Data cursor
      fill(getColor(CLRS.K_TEAL_0,100));
      textAlign(LEFT,TOP);
      textSize(20);

        text((nfc)(app.data[app.cursor].i), 20, 40);

      fill(getColor(CLRS.BLACK,100));
      textAlign(LEFT,TOP);
      textSize(12);
      textLeading(16);

        text("Max:     \n" +
             "Sum:     \n" +
             "Length:",
             20, 70);

        text(CONSTANTS.TRIANGLE_UP +"\n" +
             CONSTANTS.TRIANGLE_DOWN + "",
             170, 70);

      textAlign(RIGHT,TOP);

      fill(getColor(CLRS.K_TEAL_2,100));

        text((nfc)(app.data[app.cursor].max)        + "\n" +
             (nfc)(app.data[app.cursor].sum)        + "\n" +
             (nfc)((app.data[app.cursor].length-1)),
             140, 70);

         text((nfc)(app.data[app.cursor].up)         + "\n" +
              (nfc)(app.data[app.cursor].down),
              210, 70);


    };
    var dataSummary=function(){

      fill(getColor(CLRS.K_TEAL_0,100));
      textSize(16);
      textAlign(LEFT,TOP);

        text("Range:", 290, 45);

      textSize(12);
      textLeading(16);
      fill(getColor(CLRS.BLACK,75));

        text("Max Peak: \n" +
             "Max Sum:  \n" +
             "Longest Path:",
             300, 70);

      fill(getColor(CLRS.ORANGE,75));
      noStroke();

        rect(291,70,6,12);

      fill(getColor(CLRS.GREEN,75));

        rect(291,86,6,12);

      fill(getColor(CLRS.BLUE,75));

        rect(291,102,6,12);

      fill(getColor(CLRS.K_TEAL_2,100));
      textAlign(LEFT,TOP);
      textSize(16);

        text((nfc)(app.data[0].i) + " - " +
             (nfc)(app.data[app.cells-1].i) + "\n\n",
             400, 45);

      fill(getColor(CLRS.K_TEAL_0,50));
      textAlign(LEFT,TOP);
      textSize(12);

        text((nfc)(app.data[app.dHighest].i) +"\n" +
             (nfc)(app.data[app.dSum].i) + "\n" +
             (nfc)(app.data[app.dLongest].i),
             400, 70);

      fill(getColor(CLRS.K_TEAL_2,75));
      textAlign(RIGHT,TOP);

        text((nfc)(app.data[app.dHighest].max) + "\n" +
             (nfc)(app.data[app.dSum].sum) + "\n" +
             (nfc)(app.data[app.dLongest].length-1),
             540, 70);

    };
    var drawPath=function(){

      var path="";

      for(var n=0; n<app.data[app.cursor].path.length; n++){

        path+=app.data[app.cursor].path[n];

        if(n!==app.data[app.cursor].path.length-1){
          path+= ", ";
        }

      }

      textAlign(LEFT,TOP);
      fill(getColor(CLRS.GRAY,50));

        text(path, 30, 140, width-50, 10000);

    };


    var pascalsTriangle=function(){

      
      
    };
    var update=function(){

      pushMatrix();
        
        translate(0,0);
        
          frameRate(app.frameRate);

          background(242);

          if(app.autoRun){
               
            // if(frameCount%app.frameRate===0){
              
              for(var n=0; n<app.levels/2; n++){
               stepPascal();
              }
            // }

          }

          for(var c in app.controls){ app.controls[c].draw(); }

      popMatrix();

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

        app.keys[keyCode]=true;

        // if(app.autoRun===false){

          switch(true){

            case app.keys[KEYCODES.PGUP]:     incrementRows();    break;
            case app.keys[KEYCODES.PGDN]:     decrementRows();    break;

            // case app.keys[KEYCODES.LEFT] &&
                 // app.keys[KEYCODES.SHIFT]:    decrementCursor();    break;
            // case app.keys[KEYCODES.RIGHT] &&
                 // app.keys[KEYCODES.SHIFT]:    incrementCursor();    break;

            case app.keys[KEYCODES.LEFT] &&
                 app.keys[KEYCODES.CONTROL]:  firstRecord();      break;
            case app.keys[KEYCODES.RIGHT] &&
                 app.keys[KEYCODES.CONTROL]:  lastRecord();       break;

            case app.keys[KEYCODES.LEFT]:     decrementCursor();  break;
            case app.keys[KEYCODES.RIGHT]:    incrementCursor();  break;

            case app.keys[KEYCODES.UP]:       incrementRows();    break;
            case app.keys[KEYCODES.DOWN]:     decrementRows();    break;

            default:                                              break;

          }

        // }

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

      for(var c in app.controls){ app.controls[c].pressed();  }

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
    var mouseDragged=function(){

      // for(var c in app.controls){ app.controls[c].dragged();  }

      switch(mouseButton){

        case LEFT:   for(var c in app.controls){ app.controls[c].dragged();  } break;
        // case RIGHT:  for(var c in app.controls){ app.controls[c].rClicked(); } break;
        // case CENTER: for(var c in app.controls){ app.controls[c].cClicked(); } break;

        default:     break;
      }

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
