/*  Whitelist

*
+stackoverflow.com
+khanacademy.org
+whatbadgenext.appspot.com
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
+latin-phrases.co.uk/quotes/beginning-end
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
+hex.frvr.com
+mynoise.net
+developer.mozilla.org

*/

var diagrams = function(processingInstance){
  with (processingInstance){
/*

  Names:  Hexy
          geekred
          ...

  GAMES:
          Choose Life - Sliding Triangle Game

    TO DO:

      - Shower
      - Fix Front forks
      - Laundry

      - Allow for optional orientation of hexagons
        * pointy top
        * flat top

      - Keyboard controls for navigation and all functions
      - Touchscreen controls

    Research:


    TO DONE:


    ---------------------------------------------------------------------

      println( typeof this.color );

*/



  var serifFont   = createFont('sans-serif', 16);
  var sansFont    = createFont('sans',       16);
  var monoFont    = createFont('monospace',  16);
  var cursiveFont = createFont('cursive',    16);
  var fantasyFont = createFont('fantasy',    16);

  var globalFRate=this;

  const MY_FAV = 7;
  const HEX_SIZE=60;
  // const pi=nf(PI,1,10);

  /* Constants ============================================================= */
  {

    var HEXY_STYLES={

      BLACK:    0,
      BLUE:     1,

      SPACER:   2,

      ROW:      3,
      COL:      4,

      DLEFT:    5,
      DRIGHT:   6

    }
    var ORIENTATIONS={

      POINTY:   0,
      FLAT:     1,
      CUSTOM:   2

    }

    var CLRS={

      H_BACKGROUND: color(231,231,231,255),
      H_SHADOW:     color(209,209,209,255),

      H_BLUE:       color( 20,156,216,255), H_BLUE_L:     color(  5,164,235,255),
      H_BLACK:      color( 44, 47, 49,255), H_BLACK_L:    color( 62, 62, 62,255),
      H_ORANGE:     color(255,159,  0,255), H_ORANGE_L:   color(255,175, 41,255),

      RED:          color(170, 29, 29,255), GREEN:        color(158,182, 58,255),
      BLUE:         color( 29, 86,170,255), YELLOW:       color(238,214, 15,255),
      ORANGE:       color(238,136, 15,255), GRAY:         color(128,128,128,255),

      CYAN:         color( 49,204,167,255),
      PINK:         color(255, 20,147,255),

      TEAL_0:       color( 28,117,138,255), TEAL_0_LT:    color( 28,117,138,128),
      TEAL_1:       color( 41,171,202,255), TEAL_1_LT:    color( 41,171,202,128),
      TEAL_2:       color( 88,196,221,255), TEAL_2_LT:    color( 88,196,221,128),
      TEAL_3:       color(156,220,235,255), TEAL_3_LT:    color(156,220,235,128),

      TRANSPARENT:  color(-1,-1,-1),

      WHITE:        color(255,255,255,255),
      BLACK:        color(  0,  0,  0,255),

      K_RED:        color(170, 29, 29,255), K_GREEN:      color(158,182, 58,255),
      K_BLUE:       color( 29, 86,170,255), K_YELLOW:     color(238,214, 15,255),
      K_ORANGE:     color(238,136, 15,255), GRAY:         color(128,128,128,255),

      BROWN:        color(155,145,135,255),

      RED:          color(255,  0,  0,255), REDORANGE:    color(255, 81,  0,255),
      ORANGE:       color(255,127,  0,255), YELLOWORANGE: color(255,190,  0,255),
      YELLOW:       color(255,255,  0,255), YELLOWGREEN:  color(192,255,  0,255),

      GREEN:        color(  0,255,  0,255), BLUEGREEN:    color(  0,127,127,255),
      BLUE:         color(  0,  0,255,255), BLUEVIOLET:   color( 92,  0,255,255),

      VIOLET:       color(127,  0,255,255), REDVIOLET:    color(191,  0,127,255),

    };

  }

  function application(){

    /* Initialize -------------------- */
    {

      randomSeed(millis());

      // frameRate(0);

      cursor(WAIT);
      strokeCap(SQUARE);

      angleMode='radians';

      size(800, 600); // set size of canvas

    }

    this.dirty        = false;  //  Has a reset occurred

    this.debug        = true;   //  Mode that displays enhanced debugging tools

    this.frameRate    = 100;      //  Refresh speed

    this.mouseX       = 0;      //  Current mouseX location
    this.mouseY       = 0;      //  Current mouseY location

    this.left         = false;  //  Is the left mouse button pressed
    this.right        = false;  //  Is the right mouse button pressed
    this.center       = false;  //  Is the center mouse button pressed

    this.dragging     = false;  //  Is the mouse cursor moving and the left button pressed?

    this.focus        = null;   //  The control with focus

    this.mode         = APPMODES.INTRO;

    this.controls     = [];     //  Collection of controls in the app
    this.keys         = [];     //  Array holding the value of all keycodes

    this.info         = 0;      //  Is the info frame displayed
    this.telemetry    = true;   //  Is telemetry visible

    /* Hextris Specific ------------------ */

    this.hexBoard     = this.controls[1];
    this.remaining    = 0;      //  How many blue cells need to be uncovered
    this.errors       = 0;      //  How many mistaken clicks occurred

    this.orientation  = ORIENTATIONS.FLAT;
    this.music        = true;
    this.gameOver     = true;

  };

  var app=new application();


  /* Utility Functions ===================================================== */
  {

    function iRandom(n)           { return round(random(n));    };

    function getColor(clr, alpha) {
      return color(red(clr), green(clr), blue(clr), alpha/100*255);
    };

    function reset()              {


    };

    function getInfo()            { return app.info;                      };
    function toggleInfo()         { app.info=!app.info;                   };

    function getScore()           { return app.hexBoard.score;            };
    function getHighScore()       { return app.hexBoard.highScore;        };

    function getMusic()           { return app.music;                     };
    function setMusic(b)          { return app.music=b;                   };

    function getTelemetry()       { return app.telemetry;                 };
    function toggleTelemetry()    { app.telemetry=!app.telemetry;         };

    function clickTest(n)         { println('click: ' + n);               };

  }

  /* Containers/Controls =================================================== */
  {

    /* Default              */
    {

      var control=function(id, parent, x, y, w, h){

        /* explicit properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
        this.id       = id;       /** Unique identification number --
                                      Change to GUID for production) */

        this.parent   = parent;   /** parent control (acts as a container) */

        this.x        = x;        /** left     */
        this.y        = y;        /** top      */
        this.w        = w;        /** width    */
        this.h        = h;        /** height   */

        /* inherent properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
        this.controls = [];       /** array of child controls */

        this.on       = false;    /** Is the control on or off */
        this.hit      = false;    /** mouse is over the control */

        this.active   = false;    /** active = hit and focus */
        this.offset   = 0;        /** offset distance when clicked */

        this.font     = monoFont; /** default font */

      };
      control.prototype.draw     = function(){};
      control.prototype.moved    = function(x,y){

        if(mouseX>(this.x+x) &&
           mouseX<(this.x+x) + this.w &&
           mouseY>(this.y+y) &&
           mouseY<(this.y+y) + this.h){

          if(this.parent.hit){

            this.hit=true;
            app.focus=this;

            for(var c in this.controls){ this.controls[c].moved((this.x+x), (this.y+y)); }

          }

        }
        else{

          this.hit=false;

          for(var c in this.controls){ this.controls[c].hit=false; }

        }

      };
      control.prototype.clicked  = function(){ if(this.hit){ forEach(this.controls, 'clicked'); } };
      control.prototype.rclicked = function(){ if(this.hit){ forEach(this.controls, 'rclicked'); } };
      control.prototype.pressed  = function(){ };
      control.prototype.released = function(){ };
      control.prototype.over     = function(){ };
      control.prototype.out      = function(){ this.hit=false; forEach(this.controls, 'out'); };
      // control.prototype.typed=function(){};
      // control.prototype.cClicked=function(){};
      // control.prototype.dragged = function(){ };

    }

    /* Containers ========================================================== */

    /* root                 */
    {
      /* Identical to a container control except is doesn't have a parent */
      function root(id, x, y, w, h, props){

        control.call(this, id, null, x, y, w, h);

        this.text   = props.text;

        this.acolor = props.acolor;
        this.icolor = props.icolor;

        this.border = props.border;
        this.cursor = props.cursor;

        this.left   = 0;

      };
      root.prototype=Object.create(control.prototype);
      root.prototype.draw=function(){

        this.active=this.hit && app.focus===this;

        pushMatrix();

          translate(this.x, this.y);

            // noStroke();
            fill(this.icolor);

            if(this.hit                       ){ fill(this.acolor);   }
            if(app.dragging &&
               app.hexBoard.activePiece!==null){ cursor(HAND);        }
            else                               { cursor(this.cursor); }

              rect(0, 0, this.w, this.h);

            forEach(this.controls, 'draw');

        popMatrix();

      };
      root.prototype.moved=function(x,y){
      /* Required because root control doesn't have a parent */

        if(mouseX>(this.x+x) &&
           mouseX<(this.x+x) + this.w &&
           mouseY>(this.y+y) &&
           mouseY<(this.y+y) + this.h){

          this.hit=true;
          app.focus=this;

          for(var c in this.controls){ this.controls[c].moved(this.x+x, this.y+y); }

        }
        else{

          this.hit=false;

          for(var c in this.controls){ this.controls[c].hit=false; }

        }

      };
      root.prototype.dragged = function(){

        // if(this.hit){ forEach(this.controls, 'dragged'); }

      };
      root.prototype.pressed= function(){

        app.dragging=true;

      };
      root.prototype.released= function(){

        if(this.hit){ forEach(this.controls, 'released'); }

      };

    }

    /* Container            */
    {

      function container(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.text   = props.text;
        this.color  = props.color;
        this.cursor = props.cursor;
        this.border = props.border;

        this.font   = props.font;

      };
      container.prototype=Object.create(control.prototype);
      container.prototype.draw=function(){

        this.active=this.hit && app.focus===this;

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            fill(getColor(this.color, 5));
            // textFont(createFont(this.font,16));

            if(this.hit   ){ fill(getColor(this.color, 10));   }
            if(this.active){ cursor(this.cursor);              }
            if(this.border){ strokeWeight(1);
                             stroke(getColor(this.color, 50)); }

              rect(0, 0, this.w, this.h, this.execute);

            forEach(this.controls, 'draw');

        popMatrix();

      };

    }

    /* Splash Screen        */
    {

      function splash(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.color    = props.color;
        this.cursor   = props.cursor;
        this.retrieve = props.retrieve;
        this.font     = props.font;

        this.controls.push(new hexButton(520, this, this.w/2-35, 170, 75, 75,
          {row:       3,
           col:       1,
           ordinal:   -1,
           integer:    3,
           font:      monoFont,
           color:     CLRS.K_TEAL_1,
           cursor:    HAND,
           on:        true}));

        this.controls.push(new hexButton(530, this, this.w/2+35, 170, 75, 75,
          {row:       3,
           col:       2,
           ordinal:   -1,
           integer:    3,
           font:      monoFont,
           color:     CLRS.K_TEAL_1,
           cursor:    HAND,
           on:        true}));

        this.controls.push(new hexButton(540, this, this.w/2, 230, 75, 75,
          {row:       4,
           col:       2,
           ordinal:   -1,
           integer:    6,
           font:      monoFont,
           color:     CLRS.K_TEAL_1,
           cursor:    HAND,
           on:        true}));

      };
      splash.prototype=Object.create(control.prototype);
      splash.prototype.draw=function(){

        if(this.retrieve()){

          this.active=this.hit && app.focus===this;

          pushMatrix();

            translate(this.x, this.y);

              strokeWeight(1);
              stroke(getColor(CLRS.K_TEAL_0, 40));
              fill(  getColor(this.color, 85));

              if(this.hit   ){ fill(getColor(this.color, 90)); }
              if(this.active){ cursor(this.cursor);            }

                rect(0, 0, this.w, this.h, 20);

              // textFont(this.font);
              textAlign(CENTER,BOTTOM);
              fill(getColor(CLRS.YELLOW,75));

                text("Pascal's Triangle", this.w/2, 30);

              var txt0="In mathematics, Pascal's triangle";
              var txt1="The first and last ";
              var txt2='';
              var txt3='';
              var txt4='en.wikipedia.org/wiki/Pascal%27s_triangle';
              var txt5='oeis.org/A007318';

              textSize(11);
              textAlign(LEFT,TOP);
              fill(getColor(CLRS.WHITE,75));

                text(txt0 + '\n\n' +
                     txt1 + '\n\n' +
                     txt2 + '\n\n' +
                     txt3,
                     20, 40,
                     this.w-30, this.h-40);

              textAlign(LEFT,CENTER);
              fill(getColor(CLRS.K_TEAL_3,100));

                text(txt4, this.w/2-textWidth(txt4)/2, 320);

              fill(getColor(CLRS.K_TEAL_2,100));

                text(txt5, this.w/2-textWidth(txt5)/2, 340);

              var txtX=65;
              var txtY=-30;

              var centerX=this.w/2;

              pushMatrix();

                translate(centerX, 130);

              popMatrix();

              forEach(this.controls, 'draw');

              stroke(getColor(CLRS.YELLOW,75));
              strokeWeight(2);

                line(this.w/2-30, this.h/2-15,
                     this.w/2-8,  this.h/2+15);

                line(this.w/2+30, this.h/2-15,
                     this.w/2+8,  this.h/2+15);

          popMatrix();

        }

      };
      splash.prototype.moved=function(x,y){
      /* Overridden to maintain on/off value */

        if(this.retrieve()){

          if(this.parent.hit){

            if(mouseX>this.x+x &&
               mouseX<this.x+x+this.w &&
               mouseY>this.y+y &&
               mouseY<this.y+y + this.h){

              this.hit=true;
              app.focus=this;

              for(var c in this.controls){ this.controls[c].moved(this.x+x, this.y+y); }

            }
            else{

              this.hit=false;

              for(var c in this.controls){ this.controls[c].hit=false; }

            }

          }

        }

      };
      splash.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.retrieve()){
          if(this.hit){ forEach(this.controls, 'clicked'); }
        }

      };

    }

    /* Toolbar              */
    {

      function toolbar(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.text        = props.text;
        this.acolor      = props.acolor;
        this.icolor      = props.icolor;
        this.cursor      = props.cursor;
        this.position    = props.position;
        this.recordCount = props.recordCount;
        this.font        = props.font;

      };
      toolbar.prototype=Object.create(control.prototype);
      toolbar.prototype.draw=function(){

        this.active=this.hit && app.focus===this;

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            fill(getColor(CLRS.BLACK,30));

            if(this.hit   ){ fill(this.acolor);   }
            if(this.active){ cursor(this.cursor); }

              rect(0, 0, this.w, this.h);

            // Caption
            fill(CLRS.K_TEAL_1);
            textFont(this.font);
            textAlign(CENTER,CENTER);

            if(this.hit){ fill(CLRS.WHITE); }

              text(this.text, this.w/2, this.h/2);

            forEach(this.controls, 'draw');

        popMatrix();

      };

    }

    /* Telemetry            */
    {

      function telemetry(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.color  = props.color;
        this.cursor = props.cursor;
        this.font   = props.font;

        /*  Dynamic x-coordinate */
        this.offset = 0;

      };
      telemetry.prototype=Object.create(control.prototype);
      telemetry.prototype.draw=function(){

        // if(app.telemetry===false &&
           // this.offset===0){ return; }

        // Border
        var border=function(p){

          strokeWeight(1);
          stroke(getColor(p.clr,100));

          noStroke();

          if(p.hit){

            // fill(getColor(p.color, 85));
            fill(getColor(CLRS.BLACK,100));

          }
          else{

            // fill(getColor(p.color, 80));
            fill(getColor(CLRS.BLACK,80));

          }

          rect(p.offset, 0, p.w, p.h);

        };

        //  Properties
        var properties=function(p){

          var row0=30;

          var col0=p.offset+20;
          var col1=p.offset+30;
          var col2=p.offset+170;

          if     ( app.telemetry && p.offset>-200){ p.offset-=10; }
          else if(!app.telemetry && p.offset<0   ){ p.offset+=10; }

          if(this.hit){ fill(getColor(CLRS.WHITE,80)); }
          else        { fill(getColor(CLRS.WHITE,60)); }

          /* Title ------------------------- */
          textAlign(CENTER,CENTER);
          textSize(12);
          fill(CLRS.WHITE);

            text('Debug Telemetry',     p.w/2+p.offset, 20);

          /* Mouse Coordinates ------------------------- */
          textSize(10);
          textAlign(LEFT,TOP);
          textLeading(14);

          fill(getColor(CLRS.TEAL_2,75));

            text('Mouse Coordinates \n\n\n\n' +
                 'Mouse Buttons     \n\n\n\n\n' +
                 'Keys              \n\n\n\n\n' +
                 'Controls          \n\n\n\n\n' +
                 'App               \n\n\n\n',
                 col1, row0+15);

          /* app.focus is required to be done after control update in main draw sub */

          var activePiece;
          var activeCell;

          // if(app.hexBoard.activePiece!==null){ activePiece=app.hexBoard.activePiece.id; }
          // else                               { activePiece='null';                      }

          if(app.hexBoard.activeCell!==null) { activeCell=app.hexBoard.activeCell.id;   }
          else                               { activeCell='null';                       }

          fill(getColor(CLRS.WHITE,75));

            text('              \n' +
                 'x:            \n' +
                 'y:            \n\n\n' +
                 'Left:         \n' +
                 'Right:        \n' +
                 'Center:       \n\n\n' +
                 'Alt:          \n' +
                 'Control:      \n' +
                 'Shift:        \n\n\n' +
                 'Focus:        \n' +
                 'Focused:      \n' +
                 'Telemetry:    \n\n\n' +
                 'Active Shape: \n' +
                 'Active Cell:  \n' +
                 'Dragging:     \n\n' +
                 'Info:         \n\n' +
                 'Frame Rate:   \n',
                 col1, row0+15);

          fill(getColor(CLRS.YELLOW,75));
          textAlign(RIGHT,TOP);

            text('\n' +
                 mouseX                     + '\n' +
                 mouseY                     + '\n\n\n' +
                 app.left                   + '\n' +
                 app.right                  + '\n' +
                 app.center                 + '\n\n\n' +
                 app.keys[KEYCODES.ALT]     + '\n' +
                 app.keys[KEYCODES.CONTROL] + '\n' +
                 app.keys[KEYCODES.SHIFT]   + '\n\n\n' +
                 app.focus.id               + '\n' +
                 focused                    + '\n' +
                 app.telemetry              + '\n\n\n' +
                 activePiece                + '\n' +
                 activeCell                 + '\n' +
                 app.dragging               + '\n\n' +
                 app.info                   + '\n\n' +
                 nfc(app.frameRate)         + '\n',
                 col2, row0+15);

          var txt='Press the left and right arrow keys to increment and decrement integer.';

          textSize(11);
          textAlign(LEFT,BOTTOM);

            text(txt, p.offset+17, p.h-55, p.w-20, 100);

        };

        this.active=this.hit && app.focus===this;

        pushMatrix();

          translate(this.x, this.y);

            if(this.active){ cursor(this.cursor); }

            if     ( app.telemetry && this.offset>-200){ this.offset-=10; }
            else if(!app.telemetry && this.offset<0   ){ this.offset+=10; }

            textFont(this.font);

            border(this);
            properties(this);

            forEach(this.controls, 'draw');

            // /* The following is outside the properties function because
               // it has to be done after the child controls are drawn to
               // maintain proper control focus                              */
            // fill(getColor(CLRS.YELLOW,75));

            // textSize(11);
            // textAlign(RIGHT,CENTER);

        popMatrix();

      };
      telemetry.prototype.moved=function(x,y){
      /* Overridden because of the dynamic x-coordinate offset */

        if(app.telemetry===false &&
           this.offset===0){ return; }

          if(this.parent.hit){

            if(mouseX>this.x+x+this.offset &&
               mouseX<this.x+x+this.offset + this.w &&
               mouseY>this.y+y &&
               mouseY<this.y+y + this.h){

              this.hit=true;
              app.focus=this;

              for(var c in this.controls){ this.controls[c].moved(this.x+x+this.offset, this.y+y); }

            }
            else{

              this.hit=false;

              for(var c in this.controls){ this.controls[c].hit=false; }

            }

          }

      };

    }

    /* Hex board          */
    {

      function hexBoard(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.color          = getColor(color(61),100); //  Used to store hexCell default color

        this.score          = 0;
        this.highScore      = 0;

        this.activeCell     = null;

        this.angle          = 0;

        this.layout         = [];   //  array of the layout of hexcells
        this.hints          = [];   //  array of nexCell hints
        this.lines          = [];   //  array of hexCells with highlight lines activated
        this.halos          = [];   //  array of hexCells with a halo activated

        app.hexBoard=this;

        this.reset();

      };
      hexBoard.prototype=Object.create(control.prototype);
      hexBoard.prototype.reset        =function(){

        var p=this; //  Reference to the hexBoard control

        p.controls=[];

        p.activeCell = null;

// var HEXY_STYLES={

//   BLACK:    0,
//   BLUE:     1,

//   SPACER:   2,

//   ROW:      3,
//   COL:      4,

//   DLEFT:    5,
//   DRIGHT:   6

// }

        p.layout=[[2,2,2,1,1,1,2,2,2],
                  [2,1,1,0,0,0,1,1,2],
                  [1,1,0,0,0,0,0,1,1],
                  [1,1,0,0,0,0,0,1,1],
                  [1,1,0,0,0,0,0,1,1],
                  [1,1,1,1,0,1,1,1,1],
                  [1,1,1,1,1,1,1,1,1],
                  [2,2,1,1,1,1,1,2,2],
                  [2,2,2,2,1,2,2,2,2],
                 ];

        p.style =[[4,4,6,1,0,1,5,4,4],
                  [6,1,1,0,1,0,1,1,5],
                  [1,1,0,1,0,1,0,1,1],
                  [1,0,1,0,1,0,1,0,1],
                  [1,1,0,1,0,1,0,1,1],
                  [1,1,1,0,1,0,1,1,1],
                  [1,1,1,1,0,1,1,1,1],
                  [2,2,1,1,1,1,1,2,2],
                  [2,2,2,2,1,2,2,2,2],
                 ];

        p.text  =[[4,6,7,0,0,0,1,3,5],
                  [5,0,0,0,5,0,0,0,3],
                  [0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,5,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,5,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0],
                 ];

        var rowArray=[];
        var n=0;

        function load(){

          p.controls=[];

          var w=HEX_SIZE;

          p.w=w*cos(PI/6)*9;

          var x=0;
          var y=0;

          var xOffset;
          var yOffset;

          var row;
          var col;

          if(app.orientation===ORIENTATIONS.POINTY){

            xOffset=w*cos(PI/6);
            yOffset=w/2;

            for(row in p.layout){
              for(col in p.layout[row]){

                if(row<5){ x=col*xOffset-row*xOffset/2-2*xOffset;     }
                else     { x=col*xOffset+(row-8)*xOffset/2-2*xOffset; }

                y=row*w*0.75-6*yOffset;

                rowArray.push(new hexCell('H'+n, p, x, y, w, w,
                  {execute:   clickTest,
                   baseX:     0,
                   baseY:     0,
                   row:       row,
                   col:       col,
                   layout:    p.layout[row][col],
                   style:     p.style[row][col],
                   text:      p.text[row][col],
                   color:     color(CLRS.H_ORANGE_L),
                   font:      monoFont,
                   cursor:    ARROW,
                   on:        false}));

                 n++;

              }

              p.controls.push(rowArray);

              rowArray=[];

            }

          }
          else if(app.orientation===ORIENTATIONS.FLAT){

            n=0;

            xOffset=w/2;
            yOffset=w*cos(PI/6);

            var gOffset=190;

            for(row in p.layout){
              for(col in p.layout[row]){

                x=col*w*0.75-gOffset;
                y=row*yOffset-gOffset;

                if(col%2===0){
                  y-=yOffset/2;
                }

                rowArray.push(new hexCell('H'+n, p, x, y, w, w,
                  {execute:   clickTest,
                   baseX:     0,
                   baseY:     0,
                   row:       row,
                   col:       col,
                   layout:    p.layout[row][col],
                   style:     p.style[row][col],
                   text:      p.text[row][col],
                   color:     color(CLRS.H_ORANGE_L),
                   font:      monoFont,
                   cursor:    ARROW,
                   on:        false}));

                 n++;

              }

              p.controls.push(rowArray);

              rowArray=[];

            }

          }

        };

        function link(){

          var ctrls=p.controls;

          // try{

            for(var r in ctrls){
              for(var c in ctrls[r]){

                r/=1;
                c/=1;

                //  Left/Right
                if(c<ctrls[r].length){ ctrls[r][c].right  = ctrls[r][c+1]; }
                if(c>0              ){ ctrls[r][c].left   = ctrls[r][c-1]; }

                //  Top
                if(r>0){

                  if(r<5){  ctrls[r][c].topRight    = ctrls[r-1][c  ]; }
                  else   {  ctrls[r][c].topRight    = ctrls[r-1][c+1]; }

                }

                if(r<5){

                  if(r>0 && c>0){ ctrls[r][c].topLeft = ctrls[r-1][c-1]; }

                }
                else{

                  ctrls[r][c].topLeft  = ctrls[r-1][c];

                }

                // Bottom
                if(r<4){

                  ctrls[r][c].bottomRight = ctrls[r+1][c+1];
                  ctrls[r][c].bottomLeft  = ctrls[r+1][c];

                }
                else if(r===4){

                  ctrls[r][c].bottomRight = ctrls[r+1][c  ];
                  ctrls[r][c].bottomLeft  = ctrls[r+1][c-1];

                }
                else if(r<ctrls.length-1){

                  ctrls[r][c].bottomRight = ctrls[r+1][c];
                  ctrls[r][c].bottomLeft  = ctrls[r+1][c-1];

                }

              }
            }

          // }
          // catch(e){

            // if(e instanceof TypeError){
              // Cell doesn't exist
              // println('Type Error');
            // }
            // else{ println(e); }

          // }

        };

        load();
        link();

        app.gameOver=false;

      };
      hexBoard.prototype.draw         = function(){

        var p=this;

        function drawGuideLines(){

          strokeWeight(6);
          stroke(getColor(CLRS.WHITE,25));

          for(var l in p.lines){

            switch(p.lines[l].style){

              case HEXY_STYLES.COL:

                line(p.lines[l].x, p.lines[l].y + (HEX_SIZE-2)/2,
                     p.lines[l].x, height);

                break;

              case HEXY_STYLES.DLEFT:

                var x=p.lines[l].x;
                var y=p.lines[l].y;
                var offsetX=cos(PI-PI/6)*(HEX_SIZE-2)/2;
                var offsetY=sin(PI-PI/6)*(HEX_SIZE-2)/2;

                line(x+offsetX,
                     y+offsetY,
                     x+offsetX+600*tan(PI-PI/3),
                     y+offsetY+600);


                break;

              case HEXY_STYLES.DRIGHT:

                var x=p.lines[l].x;
                var y=p.lines[l].y;
                var offsetX=cos(PI/6)*(HEX_SIZE-2)/2;
                var offsetY=sin(PI/6)*(HEX_SIZE-2)/2;

                line(x+offsetX,
                     y+offsetY,
                     x+offsetX+600*tan(PI/3),
                     y+offsetY+600);

                break;

              default:  break;

            }

          };

        };        
        function calculateRemaining(){
          
          app.remaining=0;
          
          var total=0;
          
          for(var r in p.layout){
            for(var c in p.layout[r]){

              if(p.layout[r][c]===1){
                total++;
              }

            }
          }          

          app.remaining=total;

        };
        function drawHalos(){

          stroke(CLRS.RED);
          strokeWeight(1);          
          noStroke();
          
          fill(getColor(CLRS.WHITE,40));
          
          var w=HEX_SIZE;
          
          var x=0;
          var y=0;
          
          var yOffset=0;
          var xOffset=0.25*w;
          
          for(var h in p.halos){
            
            x=p.halos[h].x;
            y=p.halos[h].y;
            
            beginShape();

              vertex(x-cos(PI/3)*w/2,     y-w*sin(PI/3)*2.5);
              vertex(x-w/2,               y-w*sin(PI/3)*2  );
              vertex(x-w,                 y-w*sin(PI/3)*2  );
              vertex(x-w*1.25,            y-w*sin(PI/3)*1.5);
              vertex(x-w*1.75,            y-w*sin(PI/3)*1.5);
              vertex(x-w*2,               y-w*sin(PI/3)*1  );
              vertex(x-w*1.75,            y-w*sin(PI/3)*0.5);
              
              vertex(x-w*2,               y);
              
              vertex(x-w*1.75,            y+w*sin(PI/3)*0.5);
              vertex(x-w*2,               y+w*sin(PI/3)*1  );
              vertex(x-w*1.75,            y+w*sin(PI/3)*1.5);
              vertex(x-w*1.25,            y+w*sin(PI/3)*1.5);
              vertex(x-w,                 y+w*sin(PI/3)*2  );
              vertex(x-w/2,               y+w*sin(PI/3)*2  );
              vertex(x-cos(PI/3)*w/2,     y+w*sin(PI/3)*2.5);
              
              vertex(x+cos(PI/3)*w/2,     y+w*sin(PI/3)*2.5);
              vertex(x+w/2,               y+w*sin(PI/3)*2  );
              vertex(x+w,                 y+w*sin(PI/3)*2  );
              vertex(x+w*1.25,            y+w*sin(PI/3)*1.5);
              vertex(x+w*1.75,            y+w*sin(PI/3)*1.5);
              vertex(x+w*2,               y+w*sin(PI/3)*1  );
              vertex(x+w*1.75,            y+w*sin(PI/3)*0.5);

              vertex(x+w*2,               y);

              vertex(x+w*1.75,            y-w*sin(PI/3)*0.5);
              vertex(x+w*2,               y-w*sin(PI/3)*1  );
              vertex(x+w*1.75,            y-w*sin(PI/3)*1.5);
              vertex(x+w*1.25,            y-w*sin(PI/3)*1.5);
              vertex(x+w,                 y-w*sin(PI/3)*2  );
              vertex(x+w/2,               y-w*sin(PI/3)*2  );
              vertex(x+cos(PI/3)*w/2,     y-w*sin(PI/3)*2.5);
              
            endShape(CLOSE);

          }

        };

        this.active=this.hit && app.focus===this;
        this.lines=[];
        this.halos=[];

        pushMatrix();

          translate(this.x, this.y);

            stroke(31);
            noFill();
            fill(200);

            rect(-295,-295,590,590);

              var ctrls=this.controls;

              for(var r in ctrls){
                for(var c in ctrls[r]){

                  if(ctrls[r][c].line){
                    this.lines.push(ctrls[r][c]);
                  }

                  if(ctrls[r][c].halo){
                    this.halos.push(ctrls[r][c]);
                  }
                  
                  ctrls[r][c].draw();

                }
              }

              if(this.lines.length>0){
                drawGuideLines();
              }
              if(this.halos.length>0){
                drawHalos();
              }
              
              calculateRemaining();          
              
        popMatrix();

      };
      hexBoard.prototype.hitTest      = function(x,y){
        return dist(mouseX,mouseY,this.x+x,this.y+y)<this.w/2;
      };
      hexBoard.prototype.moved        = function(x,y){
      /* Overridden because of the nested controls */

        if(this.parent.hit){

          if(this.hitTest(x,y)){ this.hit=true;
                                 app.focus=this; }
          else                 { this.hit=false;    }

            var ctrls=this.controls;

            for(var r in ctrls){
              for(var c in ctrls[r]){

                ctrls[r][c].moved(this.x+x, this.y+y);

              }
            }

        }

      };
      hexBoard.prototype.clicked      = function(){

        var ctrls=this.controls;

        for(var r in ctrls){
          for(var c in ctrls[r]){

            ctrls[r][c].clicked();

          }
        }

      };
      hexBoard.prototype.rclicked     = function(){

        var ctrls=this.controls;

        for(var r in ctrls){
          for(var c in ctrls[r]){

            ctrls[r][c].rclicked();

          }
        }

      };
      hexBoard.prototype.out          = function(){

        this.hit=false;
        this.activeCell=null;

      };

    }

    /* Controls ============================================================ */

    /* Button                */
    {

      function button(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.execute  = props.execute;
        this.retrieve = props.retrieve;
        this.text     = props.text;
        this.color    = props.color;
        this.cursor   = props.cursor;
        this.font     = props.font;

        this.on=false;

      };
      button.prototype=Object.create(control.prototype);
      button.prototype.draw=function(){

          this.offset=0;
          this.active=this.hit && app.focus===this;

          pushMatrix();

            translate(this.x, this.y);
            scale(1,-1);

              // Border
              strokeWeight(0.75);
              fill(getColor(CLRS.ACTIVE, 5));
              noStroke();

              // if(this.hit   ){ fill(getColor(CLRS.ACTIVE, 50)); }
              if(this.active && this.hit){
                if(app.left){ this.offset=1; }
                              cursor(this.cursor);
                              fill(getColor(CLRS.ACTIVE, 50));
              }

              rect(this.offset, -this.h-this.offset, this.w, this.h, 3);

              // Caption
              if(this.active){ fill(255,255,255); }
              else           { fill(128,128,128); }

              scale(1,-1);

              textFont(this.font);
              textAlign(CENTER,CENTER);
              this.w=textWidth(this.text)+10;

                text(this.text, this.w/2+this.offset, this.h/2+this.offset);

          popMatrix();

      };
      button.prototype.moved=function(x,y){

        if(this.parent.hit){

          if(mouseX>(this.x+x) &&
             mouseX<(this.x+x) + this.w &&
             mouseY>(this.y+y) &&
             mouseY<(this.y+y) + this.h){

              this.hit=true;
              app.focus=this;

          }
          else{

            this.hit=false;

          }

        }

      };
      button.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.active){

          this.execute();

        }

      };

    }

    /* Music                */
    {

      function music(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.execute  = props.execute;
        this.retrieve = props.retrieve;

        this.text     = props.text;

        this.color    = props.color;
        this.cursor   = props.cursor;
        this.font     = props.font;

        this.on=false;

      };
      music.prototype=Object.create(control.prototype);
      music.prototype.draw=function(){

          this.offset=0;
          this.active=this.hit && app.focus===this;

          pushMatrix();

            translate(this.x, this.y);
            scale(1,-1);

              // Border
              strokeWeight(0.75);
              fill(getColor(CLRS.ACTIVE, 5));
              noStroke();

              if(this.active && this.hit){

                if(app.left){ this.offset=1; }

                cursor(this.cursor);
                fill(getColor(CLRS.ACTIVE, 50));

              }

              scale(1,-1);

              if(this.retrieve()){

                fill(getColor(CLRS.BLACK,50));

              }
              else{

                noFill();
                stroke(color(192));
                strokeWeight(3);

                  ellipse(0, 0, this.w-5, this.w-5);

                  line(-15, 15, 15,-15);

                fill(color(192));

              }

              textFont(this.font);
              textSize(36);
              textAlign(CENTER,CENTER);

                text(CONSTANTS.NOTE, 0, 0);

          popMatrix();

      };
      music.prototype.moved=function(x,y){

        if(this.parent.hit){

          if(dist(mouseX, mouseY,
                  this.x+x,
                  this.y+y)<this.w/2){

              this.hit=true;
              app.focus=this;

          }
          else{

            this.hit=false;

          }

        }

      };
      music.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.active){

          this.execute(!this.retrieve());

        }

      };

    }

    /* High Score           */
    {

      function highScore(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.execute  = props.execute;
        this.retrieve = props.retrieve;

        this.text     = props.text;

        this.color    = props.color;
        this.cursor   = props.cursor;
        this.font     = props.font;

        this.on=false;

      };
      highScore.prototype=Object.create(control.prototype);
      highScore.prototype.draw=function(){

          this.offset=0;
          this.active=this.hit && app.focus===this;

          pushMatrix();

            translate(this.x, this.y);
            scale(1,-1);

              var score=this.execute();
              var highScore=this.retrieve();

              // Border
              strokeWeight(0.75);
              fill(getColor(CLRS.ACTIVE, 5));
              noStroke();

              // if(this.hit   ){ fill(getColor(CLRS.ACTIVE, 50)); }
              if(this.active && this.hit){
                if(app.left){ this.offset=1; }
                              cursor(this.cursor);
                              fill(getColor(CLRS.ACTIVE, 50));
              }

              stroke(CLRS.BLUE);
              fill(CLRS.YELLOW);

                // ellipse(0, 0, this.w, this.w);

              scale(1,-1);

              fill(this.color);

              textFont(this.font);
              textSize(24);
              textAlign(CENTER,BOTTOM);

                text(nfc(score), 0, 0);

              fill(192);

              textSize(16);
              textAlign(CENTER,TOP);

                text(nfc(highScore), 0, 0);

          popMatrix();

      };
      highScore.prototype.moved=function(x,y){

        if(this.parent.hit){

          if(dist(mouseX, mouseY,
                  this.x+x,
                  this.y+y)<this.w/2){

              this.hit=true;
              app.focus=this;

          }
          else{

            this.hit=false;

          }

        }

      };
      highScore.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.active){

          this.execute();

        }

      };

    }

    /* Icon Button          */
    {

      function i_Button(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.cursor   = props.cursor;

        this.execute  = props.execute;
        this.retrieve = props.retrieve;

        this.color    = props.color;

      };
      i_Button.prototype=Object.create(control.prototype);
      i_Button.prototype.draw=function(){

        var p=this;
        this.offset=0;

        function reset(){

          pushMatrix();

            translate(p.w/2,p.h/2);

              var sz=0.67;
              var clr=color(128);

              ellipseMode(CENTER);

              stroke(getColor(clr, 50));

              if(p.active){

                stroke(getColor(clr, 100));
                cursor(p.cursor);

              }

              strokeWeight(1.5);
              noFill();

              if(p.active &&
                 app.left){

                rotate(radians(45));

              }

                arc(0, 0, p.w*sz, p.h*sz, radians(60), 2*PI-radians(22.5));

              fill(getColor(clr, 50));

              if(p.active){ fill(getColor(clr, 100)); }

                pushMatrix();

                  translate(4,-5);
                  rotate(PI/6);

                    triangle( 0,   0,
                             10,   0,
                             10, -10);

                popMatrix();

          popMatrix();

        };

        this.active=this.hit && app.focus===this;
        this.offset=0;
        // this.on=this.retrieve();

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            noFill();

            if(this.active){ cursor(this.cursor);
                             if(app.left){ this.offset=1; } }
            if(this.active ||
               this.on    ){ fill(getColor(CLRS.BLACK,10)); }

              //  Background
              // rect(this.offset, this.offset, this.w, this.h, 2);

            reset();

        popMatrix();

      };
      /** Overridden for execute */
      i_Button.prototype.clicked=function(){ if(this.active){ this.execute(); } };

    }

    /* Hexagon Button       */
    {

      function hexButton(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.outerHit=false;
        this.offset=0;

        this.path=[];

        this.row      = props.row;
        this.col      = props.col;

        this.ordinal  = props.ordinal;   //  Counting #
        this.integer  = props.integer;   //  display #
        this.total    = props.integer;   //  path total to this point

        // this.execute  = props.execute;
        // this.retrieve = props.retrieve;
        this.color    = props.color;
        this.cursor   = props.cursor;

        this.font     = props.font;

        this.active   = false;
        this.on       = props.on;
        this.choose   = true;

        this.textSize = 0;

        /* Initialize */
        var w2=this.w/2;
        var xPos=cos(radians(30))*w2;
        var yPos=(w2/cos(radians(30)));

        this.p1=new pnt( xPos, sin(radians( 30))*w2);
        this.p2=new pnt(    0,                   w2);
        this.p3=new pnt(-xPos, sin(radians(150))*w2);
        this.p4=new pnt(-xPos, sin(radians(210))*w2);
        this.p5=new pnt(    0,                  -w2);
        this.p6=new pnt( xPos, sin(radians(330))*w2);

        var setTextSize=function(p){

          var sz=p.w/2.5;

          textSize(sz);

          while(textWidth(p.integer)>(p.w-10)){
            textSize(sz--);
          }

          // textSize(sz);

          p.textSize=sz*0.9;

        };

        setTextSize(this);

      };
      hexButton.prototype=Object.create(control.prototype);
      hexButton.prototype.draw=function(){

        this.active=this.hit && app.focus===this;
        this.offset=0;

        pushMatrix();

          translate(this.x, this.y);
          scale(1,-1);

            // Border
            strokeWeight(0.5);

            stroke(getColor(this.color, 50));
            fill  (getColor(this.color,  5));

            if(this.active){

              if(app.left){ this.offset=1; }

              strokeWeight(1.5);
              cursor(this.cursor);

              if(app.pyramid===this.parent){
                app.row=this.row;
                app.col=this.col;
              }

            };

            if(app.row===this.row &&
               app.col===this.col){
              strokeWeight(2);
            };

            stroke(getColor(this.color,100));

            //  Sierpinski grid
            if(app.sierpinski &&
               this.integer%2!==0){ fill(getColor(this.color, 25)); }

            if(this.on){ fill(getColor(this.color, 30)); }

              var offset=this.offset;

            /** Hexagon */
              beginShape();

                vertex(this.p1.x+offset, this.p1.y-offset);
                vertex(this.p2.x+offset, this.p2.y-offset);
                vertex(this.p3.x+offset, this.p3.y-offset);
                vertex(this.p4.x+offset, this.p4.y-offset);
                vertex(this.p5.x+offset, this.p5.y-offset);
                vertex(this.p6.x+offset, this.p6.y-offset);

              endShape(CLOSE);

            /** Circle */
            // var d=cos(PI/6)*this.w;
            // ellipse(0,0,d,d);

            // Caption
            fill(getColor(CLRS.YELLOW,40));

            if(this.on){ fill(getColor(CLRS.WHITE,100)); }

            scale(1,-1);
            textAlign(CENTER,CENTER);
            textSize(this.textSize);

            if(app.choose){ textLeading(this.textSize);
                            text(this.row + "\n" + this.col, this.offset, this.offset);   }
            else          { text(this.integer, this.offset, this.offset);                 }

        popMatrix();

      };
      hexButton.prototype.moved=function(x,y){
      /* Overridden because of the shap */

        if(this.parent.hit){

          if(dist(mouseX, mouseY,
                  this.x+x,
                  this.y+y)<this.w/2){

            this.outerHit=true;

              var rectHit=rectangleHit(new pnt(this.x+this.p1.x+x, this.y+this.p1.y+y),
                                       new pnt(this.x+this.p3.x+x, this.y+this.p3.y+y),
                                       new pnt(this.x+this.p6.x+x, this.y+this.p6.y+y),
                                       mouseX,mouseY);

              var triHit0=triangleHit(new pnt(this.x+this.p1.x+x, this.y+this.p1.y+y),
                                      new pnt(this.x+this.p2.x+x, this.y+this.p2.y+y),
                                      new pnt(this.x+this.p3.x+x, this.y+this.p3.y+y),
                                      mouseX,mouseY);

              var triHit1=triangleHit(new pnt(this.x+this.p4.x+x, this.y+this.p4.y+y),
                                      new pnt(this.x+this.p5.x+x, this.y+this.p5.y+y),
                                      new pnt(this.x+this.p6.x+x, this.y+this.p6.y+y),
                                      mouseX,mouseY);
              if(rectHit ||
                 triHit0 ||
                 triHit1){

                this.hit=true;
                app.focus=this;

              }
              else{

                this.hit=false;

              }

          }
          else{

            this.outerHit=false;
            this.hit=false;

          }

        }

      };
      hexButton.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.active){

          app.path=this.path;
          app.cursor=this.ordinal;
          app.activeCell=this;

          if(app.pyramid===this.parent){
            app.row=this.row;
            app.col=this.col;
          }

          this.on=!this.on;

        }

      };
      hexButton.prototype.calc=function(){};
      hexButton.prototype.set=function(){ this.on=true; };

    }

    /* Icon Hexagon Button  */
    {

      function i_hexButton(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.outerHit=false;
        this.offset=0;

        this.style    = props.style;
        this.execute  = props.execute;
        this.retrieve = props.retrieve;

        this.color    = props.color;
        this.cursor   = props.cursor;

        this.font     = props.font;

        this.active   = false;

        this.text     = props.text;

        this.rotation = 0;
        this.running  = false;

        /* Initialize */
        var w2=this.w/2;
        var xPos=cos(radians(30))*w2;
        var yPos=(w2/cos(radians(30)));

        this.p1=new pnt( xPos, sin(radians( 30))*w2);
        this.p2=new pnt(    0,                   w2);
        this.p3=new pnt(-xPos, sin(radians(150))*w2);
        this.p4=new pnt(-xPos, sin(radians(210))*w2);
        this.p5=new pnt(    0,                  -w2);
        this.p6=new pnt( xPos, sin(radians(330))*w2);

      };
      i_hexButton.prototype=Object.create(control.prototype);
      i_hexButton.prototype.draw=function(){

        this.active=this.hit && app.focus===this;
        this.offset=0;


        var p=this;
        var offset=0;

        function triforce(){

          fill(getColor(CLRS.K_TEAL_1,75));

          // if(p.parent.hit){ fill(getColor(CLRS.WHITE, 75)); }
          if(p.active    ){ fill(getColor(CLRS.WHITE,75)); }

            offset=p.offset;

            pushMatrix();

              scale(0.5,0.5);

              triangle( offset,        p.h/2-offset+5,
                        p.w/2+offset, -p.h/2-offset+5,
                       -p.w/2+offset, -p.h/2-offset+5);

            popMatrix();

            noStroke();

          fill(getColor(p.color,50));

          // if(p.parent.hit){ fill(getColor(CLRS.K_TEAL_0, 75)); }
          if(p.active    ){ fill(getColor(CLRS.K_TEAL_0,100)); }

            pushMatrix();

              scale(0.5,0.5);

                triangle( offset,           -p.h/2-offset+5,
                          -p.w*0.25+offset, -offset+5,
                           p.w*0.25+offset, -offset+5);

            popMatrix();

        };
        function play(){

          fill(getColor(CLRS.K_TEAL_1,50));

          if(p.parent.hit){ fill(getColor(CLRS.WHITE, 75)); }
          if(p.active    ){ fill(getColor(CLRS.WHITE,100)); }

            offset=p.offset;

            triangle( 15+offset, 10+offset,
                       5+offset,  5+offset,
                       5+offset, 15+offset);

        };
        function settings(){

          fill(getColor(CLRS.K_TEAL_1,50));

          if(p.parent.hit){ fill(getColor(CLRS.WHITE, 75)); }
          if(p.active    ){ fill(getColor(CLRS.WHITE,100)); }

          noStroke();

            ellipse(p.w/2+p.offset, p.h/2-6+p.offset, 3, 3);
            ellipse(p.w/2+p.offset, p.h/2,               3, 3);
            ellipse(p.w/2+p.offset, p.h/2+6+p.offset, 3, 3);

        };
        function reset(){

          var sz=0.5;

          ellipseMode(CENTER);

          stroke(getColor(CLRS.WHITE, 50));

          // if(p.parent.hit){ stroke(getColor(CLRS.WHITE,  75)); }
          if(p.active)    { stroke(getColor(CLRS.WHITE, 75));
                               cursor(p.cursor);               }

          strokeWeight(1.5);
          noFill();

          if(p.running){

            rotate(radians(p.rotation));

            p.rotation-=40;

            if(abs(p.rotation)>359){

              p.running=false;
              p.rotation=0;

            }

          }

            arc(0, 0, p.w*sz, p.h*sz, radians(22.5), 2*PI-radians(45));

          fill(getColor(CLRS.WHITE, 50));

          // if(p.parent.hit){ fill(getColor(CLRS.WHITE,  75)); }
          if(p.active  ){ fill(getColor(CLRS.WHITE, 75)); }

          p.offset=0;

            pushMatrix();

              translate(6,0);

                triangle(0, 0,
                         6, 0,
                         6, 6);

            popMatrix();

        };
        function txt(){

          fill(getColor(CLRS.WHITE,50));

          // if(p.parent.hit       ){ fill(getColor(p.color, 75)); }
          if(p.active || p.on){ fill(getColor(CLRS.WHITE,75)); }

          textAlign(CENTER,CENTER);
          textFont(p.font);
          textSize(20);

          switch(p.text){

            case HEXNAV.LEFT:       text(CONSTANTS.TRIANGLE_L,  -p.offset, -p.offset); break;
            case HEXNAV.RIGHT:      text(CONSTANTS.TRIANGLE_R, 2*p.offset, -p.offset); break;

            case HEXNAV.UP_LEFT:    pushMatrix();

                                      rotate(-PI/4);
                                      text(CONSTANTS.TRIANGLE_L,
                                      -p.offset, -p.offset);

                                    popMatrix();  break;

            case HEXNAV.UP_RIGHT:   pushMatrix();

                                      rotate(PI/4);
                                      text(CONSTANTS.TRIANGLE_R,
                                      p.offset, p.offset);

                                    popMatrix();  break;

            case HEXNAV.DOWN_LEFT:  pushMatrix();

                                      rotate(PI/4);
                                      text(CONSTANTS.TRIANGLE_L,
                                      -p.offset, -p.offset);

                                    popMatrix();  break;

            case HEXNAV.DOWN_RIGHT: pushMatrix();

                                      rotate(-PI/4);
                                      text(CONSTANTS.TRIANGLE_R,
                                      p.offset, -p.offset);

                                    popMatrix();  break;

            default:                text(p.text, p.offset, -p.offset); break;

          }

        };

        pushMatrix();

          translate(this.x, this.y);
          scale(1,-1);

            // Border
            strokeWeight(0.5);

            stroke(getColor(this.color, 40));
            fill  (getColor(this.color, 15));

            if(this.active){

              if(app.left &&
                 this.style!==GLYPHS.RESET){ this.offset=1; }

              strokeWeight(1.5);
              cursor(this.cursor);

            };

            stroke(getColor(this.color,75));

            var OS=this.offset;

            /** Hexagon */
              beginshap();

                vertex(this.p1.x+OS, this.p1.y-OS);
                vertex(this.p2.x+OS, this.p2.y-OS);
                vertex(this.p3.x+OS, this.p3.y-OS);
                vertex(this.p4.x+OS, this.p4.y-OS);
                vertex(this.p5.x+OS, this.p5.y-OS);
                vertex(this.p6.x+OS, this.p6.y-OS);

              endshap(CLOSE);

            /** Circle */
            // var d=cos(PI/6)*this.w;
            // ellipse(0,0,d,d);

            // Caption
          // Icon
          textFont(this.font);

          switch(this.style){

            case GLYPHS.PLAY:      play();      break;
            case GLYPHS.SETTINGS:  settings();  break;
            case GLYPHS.RESET:     reset();     break;
            case GLYPHS.TRIFORCE:  triforce();  break;
            case GLYPHS.TEXT:      txt();       break;

            default:                            break;

          };


        popMatrix();

      };
      i_hexButton.prototype.moved=function(x,y){
      /* Overridden because of the shape */

        if(this.parent.hit){

          if(dist(mouseX, mouseY,
                  this.x+x,
                  this.y+y)<this.w/2){

            this.outerHit=true;

              var rectHit=rectangleHit(new pnt(this.x+this.p1.x+x, this.y+this.p1.y+y),
                                       new pnt(this.x+this.p3.x+x, this.y+this.p3.y+y),
                                       new pnt(this.x+this.p6.x+x, this.y+this.p6.y+y),
                                       mouseX,mouseY);

              var triHit0=triangleHit(new pnt(this.x+this.p1.x+x, this.y+this.p1.y+y),
                                      new pnt(this.x+this.p2.x+x, this.y+this.p2.y+y),
                                      new pnt(this.x+this.p3.x+x, this.y+this.p3.y+y),
                                      mouseX,mouseY);

              var triHit1=triangleHit(new pnt(this.x+this.p4.x+x, this.y+this.p4.y+y),
                                      new pnt(this.x+this.p5.x+x, this.y+this.p5.y+y),
                                      new pnt(this.x+this.p6.x+x, this.y+this.p6.y+y),
                                      mouseX,mouseY);
              if(rectHit ||
                 triHit0 ||
                 triHit1){

                this.hit=true;
                app.focus=this;

              }
              else{

                this.hit=false;

              }

          }
          else{

            this.outerHit=false;
            this.hit=false;

          }

        }

      };
      /* Overridden because of shape */
      i_hexButton.prototype.clicked=function(){

        if(this.active){

          if(this.style===GLYPHS.RESET){

            if(this.running===false){

              this.running=true;

            }

          }

          this.execute();

        }

      };
      i_hexButton.prototype.set=function(){ this.on=true; };

    }

    /* Hexagonal Cell       */
    {

      function hexCell(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.execute      = props.execute;

        this.outerHit=false;

        this.row          = props.row;
        this.col          = Number(props.col);

        this.top          = null;
        this.bottom       = null;
        
        this.topRight     = null;
        this.bottomRight  = null;
        
        this.topLeft      = null;
        this.bottomLeft   = null;

        this.layout       = props.layout;
        this.style        = props.style;
        this.text         = props.text;
        
        this.halo         = false;
        this.enabled      = true;
        this.line         = false;

        // this.hover        = false;
        // this.tTime        = 0;
        this.timer        = this.tTime;

        this.points       = [];
        this.dpoints      = [];
        this.hpoints      = [];

        var p=this;

        /* Initialize */
        function reset(){

          var w2=p.w/2;

          var pt=0;
          var ang=0;

          if(app.orientation===ORIENTATIONS.POINTY){
            ang=30;
          }

          for(pt=0; pt<6; pt++){
            p.points.push(new pnt( cos(radians(ang+pt*60))*(w2-8),
                                   sin(radians(ang+pt*60))*(w2-8) ));
          }

          for(pt=0; pt<8; pt++){
            p.dpoints.push(new pnt( cos(radians(ang+pt*60))*(w2-1),
                                    sin(radians(ang+pt*60))*(w2-1) ));
          }

          for(pt=0; pt<6; pt++){
            p.hpoints.push(new pnt( cos(radians(ang+pt*60))*(w2-3),
                                    sin(radians(ang+pt*60))*(w2-3) ));
          }

        };

        reset();

      };
      hexCell.prototype=Object.create(control.prototype);
      hexCell.prototype.draw=function(){

        this.active=this.hit &&
                    app.focus===this &&
                    this.style!==HEXY_STYLES.SPACER;

        var offset=0;
        var p=this;

        if(this.active && this.hit){
          if(app.left){ this.offset=1; }
          cursor(this.cursor);
        }


// var HEXY_STYLES={

  // BLACK:    0,
  // BLUE:     1,

  // SPACER:   2,

  // ROW:      3,
  // COL:      4,

  // DLEFT:    5,
  // DRIGHT:   6

// }

        /* Highlight Background  -------------------------------------------------- */
        function highlight(){

          if(p.layout<2){

            noStroke();
            fill(CLRS.WHITE);

            beginShape();

              for(var pt in p.dpoints){
                vertex(p.dpoints[pt].x,
                       p.dpoints[pt].y);
              }

            endShape(CLOSE);

          }

        }
        function outerHexagon(){

          switch(p.layout){

            case 0:

              if     (p.style===HEXY_STYLES.BLACK){ fill(CLRS.H_BLACK); }
              else if(p.style===HEXY_STYLES.BLUE ){ fill(CLRS.H_BLUE);  }

              break;

            case 1:

              fill(CLRS.H_ORANGE);

              break;

            default:

              noFill();
              stroke(CLRS.BLACK);
              strokeWeight(0.125);

            break;

          }

          var offset=0;

          if(p.timer>0){ offset=random(0,1.25); p.timer--; }

          beginShape();

            for(var pt in p.hpoints){
              vertex(p.hpoints[pt].x+offset,
                     p.hpoints[pt].y+offset);
            }

          endShape(CLOSE);

        }
        function innerHexagon(){

            noStroke();

            switch(p.layout){

              case 0:

                if     (p.style===HEXY_STYLES.BLACK){ fill(CLRS.H_BLACK_L); }
                else if(p.style===HEXY_STYLES.BLUE ){ fill(CLRS.H_BLUE_L);  }
                
                break;
                
              case 1:
              
                fill(CLRS.H_ORANGE_L);
                
                break;

              default:

                noFill();

                break;

            }

            beginShape();

              for(var pt in p.points){
                vertex(p.points[pt].x,
                       p.points[pt].y);
              }

            endShape(CLOSE);

        }
        function caption(){

          pushMatrix();

            scale(1,-1);

              if(p.style<HEXY_STYLES.SPACER){

                fill(CLRS.WHITE);
              
                if(p.enabled===false){
                  fill(getColor(CLRS.WHITE,25));
                }

              }

              if(p.style>HEXY_STYLES.BLUE){

                fill(CLRS.BLACK);

                if(p.enabled===false){
                  fill(getColor(CLRS.BLACK,25));
                }

              }

              textSize(16);
              textAlign(CENTER,CENTER);

              if(p.text===-2){ p.text='?'; }

                if(p.style!==HEXY_STYLES.SPACER &&
                   p.text!=='0'){

                  if(p.style===HEXY_STYLES.COL){
                    textAlign(CENTER,TOP);
                    rotate(0);
                  }
                  else if(p.style===HEXY_STYLES.DLEFT){
                    textAlign(CENTER,TOP);
                    rotate(PI/3);
                  }
                  else if(p.style===HEXY_STYLES.DRIGHT){
                    textAlign(CENTER,TOP);
                    rotate(-PI/3);
                  }

                  //  ***** Temporary *****
                  // if(p.halo){ fill(CLRS.RED); }

                  if(p.text!==0){
                    text(p.text, 0,0);
                  }

                }

          popMatrix();

        }
        function activeCell(){

          if(p.hit &&
             p.layout===1){

            fill(getColor(CLRS.BLACK,15));

            /** Hexagon */
            beginShape();

              for(var pt in p.hpoints){
                vertex(p.hpoints[pt].x,
                       p.hpoints[pt].y);
              }

            endShape(CLOSE);

          }

          // fill(CLRS.RED);
          // ellipse(this.hpoints[0].x,this.hpoints[0].y,5,5);

        }

        pushMatrix();

          translate(this.x, this.y);

          scale(1,-1);

            if(this.layout<HEXY_STYLES.SPACER){
              highlight();
            }
            outerHexagon();
            if(this.style<HEXY_STYLES.SPACER){ innerHexagon(); }
            caption();
            if(this.style<HEXY_STYLES.SPACER){ activeCell();   }

        popMatrix();

      };
      hexCell.prototype.hitTest=function(x,y){

        var retVal=false;

        var rectHit=rectangleHit(new pnt(this.x+this.dpoints[1].x+x, this.y+this.dpoints[1].y+y),
                                 new pnt(this.x+this.dpoints[2].x+x, this.y+this.dpoints[2].y+y),
                                 new pnt(this.x+this.dpoints[4].x+x, this.y+this.dpoints[4].y+y),
                                 mouseX,mouseY);

        var triHit0=triangleHit(new pnt(this.x+this.dpoints[0].x+x, this.y+this.dpoints[0].y+y),
                                new pnt(this.x+this.dpoints[1].x+x, this.y+this.dpoints[1].y+y),
                                new pnt(this.x+this.dpoints[5].x+x, this.y+this.dpoints[5].y+y),
                                mouseX,mouseY);

        var triHit1=triangleHit(new pnt(this.x+this.dpoints[2].x+x, this.y+this.dpoints[2].y+y),
                                new pnt(this.x+this.dpoints[3].x+x, this.y+this.dpoints[3].y+y),
                                new pnt(this.x+this.dpoints[4].x+x, this.y+this.dpoints[4].y+y),
                                mouseX,mouseY);
        if(rectHit ||
           triHit0 ||
           triHit1){

          retVal=true;

        }

        return retVal;

      };
      hexCell.prototype.outerHitTest=function(x,y){

        return dist(mouseX, mouseY, this.x+x, this.y+y)<this.w/2;

      };
      hexCell.prototype.moved=function(x,y){
      /* Overridden because of the shape */

        // if(this.parent.hit){

          if(this.outerHitTest(x,y)){

            this.outerHit=true;

            if(this.hitTest(x,y)){ this.hit=true;
                                   app.focus=this;
                                   this.parent.activeCell=this;

                                   if(this.layout===1){
                                     // this.timer=5;
                                   }

                                 }
            else                 { this.hit=false; }

          }
          else{

            this.outerHit=false;
            this.hit=false;

          }

          this.hover=false;

        // }

      };
      hexCell.prototype.clicked=function(){

        if(this.active){
          
          if(this.layout!==HEXY_STYLES.SPACER){
                      
            if(this.layout===1){

              if(this.style===HEXY_STYLES.BLUE){

                this.layout=0;
                this.parent.layout[this.row][this.col]=0;

              }
              else if(this.style===HEXY_STYLES.BLACK){
                app.errors++;
              }

            }
            else if(this.layout===0){

              if(this.style===HEXY_STYLES.BLUE &&
                 this.text!==0){
                this.halo=!this.halo;
              }
              else if(this.style===HEXY_STYLES.BLACK){

              }

            }

          }
          
          { //  Toggle Line Display
            if(this.style>HEXY_STYLES.SPACER){
              this.line=!this.line;
            } 
          
          }
          
          this.execute(this.id);

        }

      };
      hexCell.prototype.rclicked=function(){

        if(this.active){

          if(this.layout===0 &&
             this.style===HEXY_STYLES.BLUE){
            this.enabled=!this.enabled;
          }

          if(this.style>HEXY_STYLES.BLUE){
            this.enabled=!this.enabled;
          }
          
          if(this.layout<HEXY_STYLES.SPACER){
          
            if(this.layout===1 &&
               this.style===HEXY_STYLES.BLACK){
              this.layout=0;
              this.parent.layout[this.row][this.col]=0;
            }
            else{
              
              if(this.layout===1){
                app.errors++;
              }
              else{
                
              }
              
            }
          
          }
          
          this.line=false;

        }

      };

    }

  }

  /********************************************************************************
  *
  * Initialize
  *
  ********************************************************************************/
  function initialize(){

    /*  Initialize the app.keys array and the values of the special keys */
    app.keys[KEYCODES.CONTROL] = false;
    app.keys[KEYCODES.ALT]     = false;
    app.keys[KEYCODES.SHIFT]   = false;

    /* LOAD CONTROLS */

      /* root control      */
      var rt=new root(100, 0, 0, width, height,
        {text:      'root',
         acolor:    color(239),
         icolor:    color(239),
         font:      monoFont,
         cursor:    ARROW,
         border:    true});

      app.controls.push(rt);

      /* hexBoard           */
      rt.controls.push(new hexBoard(200, rt, 300, height/2, 0, 0,
        {font:      'sans-serif',
         levels:    app.rows,
         cursor:    ARROW,
         color:     CLRS.K_TEAL_2,
         size:      0}));

      /* reset button       */
      rt.controls.push(new i_Button(300, rt, 500, 50, 40, 40,
        {font:      'sans-serif',
         cursor:    HAND,
         execute:   reset,
         color:     CLRS.BLACK}));

      // /* high score       */
      // rt.controls.push(new highScore(400, rt, 50, 50, 100, 100,
        // {font:      'sans-serif',
         // cursor:    HAND,
         // execute:   getScore,
         // retrieve:  getHighScore,
         // color:     CLRS.BLACK}));

      /* music            */
      rt.controls.push(new music(400, rt, 35, 550, 50, 50,
        {font:      'sans-serif',
         cursor:    HAND,
         execute:   setMusic,
         retrieve:  getMusic,
         color:     color(192)}));

      /* SplashScreen ------------------------------------------------- */
      {

        // /* Splash Screen   */
        // var splashScreen=new splash(500, rt, width/2-200, height/2-200, 400, 400,
          // {color:     CLRS.BLACK,
           // font:      monoFont,
           // retrieve:  getInfo,
           // cursor:    CROSS});

          // /* Close         */
          // splashScreen.controls.push(new button(510, splashScreen, 180, 360, 120, 20,
            // {text:      'Close',
             // font:      monoFont,
             // execute:   toggleInfo,
             // color:     CLRS.WHITE,
             // cursor:    HAND}));

        // rt.controls.push(splashScreen);

      }

      /* Telemetry ---------------------------------------------------- */
      var telem=new telemetry(500, rt, width, 31, 200, height-30,
        {color:     color(36),
         font:      serifFont,
         cursor:    ARROW});

      rt.controls.push(telem);

  };

  // var n=220;

  function intro(){ };
  function extro(){ };
  function instructions(){ };
  function play(){

    // frameRate(0);

    // background(255);

    forEach(app.controls,'draw');

    if(app.gameOver){

      // fill(getColor(CLRS.GREEN, frameCount%255));
      fill(getColor(CLRS.GREEN, 50));
      textAlign(CENTER,CENTER);
      textFont(sansFont,100);
      text('Game Over', 300, 300);

    }
    
    textSize(24);
    textAlign(RIGHT,CENTER);    
    fill(CLRS.BLACK);
    
      text('Remaining: ' + app.remaining, 590,550);
      text('Errors:   '  + app.errors,    590,575);

  };

  var execute;

  initialize();

  execute=play;

  app.focus=app.hexBoard;

  globalFRate=this.__frameRate;

  strokeJoin(MITER);
  strokeCap(SQUARE);

  frameRate(0);

  draw=function(){

    app.frameRate=this.__frameRate;

    execute();

  };

  /* Keyboard Events =========================================================== */
  {

    keyPressed=function(){

      app.keys[keyCode]=true;

        switch(true){

          case app.keys[KEYCODES.F1]:         toggleInfo();             break;    /* F1 - Info        */
          case app.keys[KEYCODES.F2]:         toggleTelemetry();        break;    /* F2 - Telemetry   */
          // case app.keys[KEYCODES.F3]:         toggleChoose();           break;    /* F3 - Choose      */
          // case app.keys[KEYCODES.F4]:         toggleSierpinski();       break;    /* F4 - Sierpinski  */
          case app.keys[KEYCODES.F5]:         reset();                  break;    /* F5 - Reset       */
          // case app.keys[KEYCODES.F6]:         toggleSigma();            break;    /* F6 - Sigma       */

          // case app.keys[KEYCODES.PGUP]:       incrementRows();          break;    /* PGUP - Rows++    */
          // case app.keys[KEYCODES.PGDN]:       decrementRows();          break;    /* PGDN - Rows--    */

          // case app.keys[KEYCODES.a] &&
               // app.keys[KEYCODES.CONTROL]:    app.hexBoard.selectAll();    break;  /* CTRL+A Select All */

          case app.keys[KEYCODES.R] ||
               app.keys[KEYCODES.r]:          app.hexBoard.reset();     break;  /* R or r - Reset */

          // case app.keys[KEYCODES.LEFT] ||
               // app.keys[KEYCODES.A]:          left();                   break;    /* LEFT or A        */
          // case app.keys[KEYCODES.RIGHT] ||
               // app.keys[KEYCODES.D]:          right();                  break;    /* RIGHT or D       */

          // case app.keys[KEYCODES.UP] &&
               // app.keys[KEYCODES.CONTROL] ||
               // app.keys[KEYCODES.W]:          upLeft();                 break;    /* Up or CTRL + W   */

          // case app.keys[KEYCODES.UP] ||
               // app.keys[KEYCODES.E]:          up();                     break;    /* UP or E          */

          // case app.keys[KEYCODES.DOWN] &&
               // app.keys[KEYCODES.CONTROL] ||
               // app.keys[KEYCODES.Z]:          downLeft();               break;    /* CTRL + DOWN or Z */

          // case app.keys[KEYCODES.DOWN] ||
               // app.keys[KEYCODES.X]:          down();                   break;    /* DOWN or X        */

          // case app.keys[KEYCODES.SPACE]:                                break;    /* SPACE            */

          default:                                                      break;

        }

    };
    keyTyped=function()   { /* println('typed ' + (key) + ' ' + keyCode); */  };
    keyReleased=function(){ app.keys[keyCode]=false;                          };

  }

  /* Mouse Events ============================================================== */
  {

    mouseClicked=function(){

      // if(app.orientation===ORIENTATIONS.FLAT){
        // app.orientation=ORIENTATIONS.POINTY;
        // app.hexBoard.reset();
        // println('pointy');
      // }
      // else{
        // app.orientation=ORIENTATIONS.FLAT;
        // app.hexBoard.reset();
        // println('flat');
      // }

      if(mouseButton===RIGHT){ execute=play; }

      // forEach(app.controls,'clicked');

      app.mode=APPMODES.GAME;

      switch(mouseButton){

        case LEFT:    forEach(app.controls,'clicked');  break;
        case RIGHT:   forEach(app.controls,'rclicked'); break;
        // case CENTER:  forEach(app.controls,'cclicked'); break;

        default:     break;
      }

    };
    mousePressed=function(){

      switch(mouseButton){

        case LEFT:    app.left   = true;  break;
        case CENTER:  app.center = true;  break;
        case RIGHT:   app.right  = true;  break;

        default:                          break;

      }

      // forEach(app.controls,'pressed');

    };
    mouseReleased=function(){

      switch(mouseButton){

        case LEFT:   forEach(app.controls,'released'); break;
        // case RIGHT:  for(var c in app.controls){ app.controls[c].rClicked(); } break;
        // case CENTER: for(var c in app.controls){ app.controls[c].cClicked(); } break;

        default:     break;

      }

      app.left   = false;
      app.right  = false;
      app.center = false;

      app.dragging=false;

    };
    mouseMoved=function(){

      app.mouseX=mouseX;
      app.mouseX=mouseY;

      for(var c in app.controls){ app.controls[c].moved(0,0); }

    };
    mouseDragged=function(){

      // if(app.left){ app.dragging=true; }

      // switch(mouseButton){

        // case LEFT:   forEach(app.controls,'dragged'); break;
        // case RIGHT:  for(var c in app.controls){ app.controls[c].rClicked(); } break;
        // case CENTER: for(var c in app.controls){ app.controls[c].cClicked(); } break;

        // default:     break;

      // }

    };
    mouseOut=function(){

      app.dragging=false;

      forEach(app.controls,'out');

      app.focus=-1;

    };
    mouseOver=function(){

      // forEach(app.controls,'over');
      // app.focus=-2;

    };

  }






































































/**

1729 = 10^3+9^3 = 12^3+1^3
hexy.js

*/

}};
