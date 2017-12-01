/**

  TO DO:
  
    - determine how to pass a color as a parameter

**/


{  // CONSTANTS ================================================================================
  
  
  new p5();
  
  var myFont;
  var RT            = [212,212,212,255]; 
  var BG            = [255,204,  0,255]; var H_SHADOW     = [209,209,209,255];

  var H_BLUE        = [ 20,156,216,255]; var H_BLUE_L     = [  5,164,235,255];
  var H_BLACK       = [ 44, 47, 49,255]; var H_BLACK_L    = [ 62, 62, 62,255];
  var H_ORANGE      = [255,159,  0,255]; var H_ORANGE_L   = [255,175, 41,255];

  var RED           = [170, 29, 29,255];
  var GREEN         = [158,182, 58,255];

  var BLUE          = [ 29, 86,170,255]; var YELLOW       = [238,214, 15,255];
  var ORANGE        = [238,136, 15,255]; var GRAY         = [128,128,128,255];

  var CYAN          = [ 49,204,167,255];
  var PINK          = [255, 20,147,255];

  var TEAL_0        = [ 28,117,138,255]; var TEAL_0_LT    = [ 28,117,138,128];
  var TEAL_1        = [ 41,171,202,255]; var TEAL_1_LT    = [ 41,171,202,128];
  var TEAL_2        = [ 88,196,221,255];
  var TEAL_2_LT     = [ 88,196,221,128];
  var TEAL_3        = [156,220,235,255]; var TEAL_3_LT    = [156,220,235,128];

  var TRANSPARENT   = [ -1, -1, -1,255];

  var WHITE         = [255,255,255,255];
  var BLACK         = [  0,  0,  0,255];

  var K_RED         = [170, 29, 29,255]; var K_GREEN      = [158,182, 58,255];
  var K_BLUE        = [ 29, 86,170,255]; var K_YELLOW     = [238,214, 15,255];
  var K_ORANGE      = [238,136, 15,255]; 

  var GRAY          = [128,128,128,255];
  
  var BROWN         = [155,145,135,255];

  var RED           = [255,  0,  0,255]; var REDORANGE    = [255, 81,  0,255];
  var ORANGE        = [255,127,  0,255]; var YELLOWORANGE = [255,190,  0,255];
  var YELLOW        = [255,255,  0,255]; var YELLOWGREEN  = [192,255,  0,255];

  var GREEN         = [  0,255,  0,255]; var BLUEGREEN    = [  0,127,127,255];
  var BLUE          = [  0,  0,255,255]; var BLUEVIOLET   = [ 92,  0,255,255];

  var VIOLET        = [127,  0,255,255]; var VIOLET       = [191,  0,127,255];

}

function preload(){
  
  // myFont = loadFont('http://fonts.googleapis.com/css?family=Walter+Turncoat&.css');
  
}

function setup(){

  createCanvas(windowWidth-5, windowHeight-5);
  
  setFrameRate(80);

  noCursor();

  textFont('sans-serif',12);

  cursor(WAIT);
  
  randomSeed(millis());

  strokeCap(SQUARE);
  strokeJoin(MITER);

  angleMode='radians';

}

  function application(){

    /* Platform Constants  -------------------- */
    {

      this.dirty        = false;              //  Has a reset occurred

      this.debug        = true;               //  Mode that displays enhanced debugging tools

      this.frameRate    = 0;                  //  Refresh speed

      this.mouseX       = 0;                  //  Current mouseX location
      this.mouseY       = 0;                  //  Current mouseY location

      this.left         = false;              //  Is the left   mouse button pressed
      this.right        = false;              //  Is the right  mouse button pressed
      this.center       = false;              //  Is the center mouse button pressed

      this.dragging     = false;              //  Is the mouse cursor moving and the left button pressed?

      this.focus        = null;               //  The control with focus

      this.controls     = [];                 //  Collection of controls in the app
      this.controlCount = 0;

      this.keys         = [];                 //  Array holding the value of all keycodes

      this.fullscreen   = false;              //  Is the display set to take up the entire screen ie. No Chrome
      
      this.info         = 0;                  //  Is the info frame displayed
      this.telemetry    = false;              //  Is telemetry visible

    }

    /* Hexy Specific       ------------------ */
    {

      this.mode         = APPMODES.GAME;      //

      this.score        = 100;                  //  The number of total hexes acquired

      this.levelScores  = [   3,  4,  5,  5,  5,  6,  6,
                              6,  8,  8,  9, 10, 10, 10,
                             14, 17, 44, 44, 44, 44, 44,
                            110,110,110,110,110,110,110,
                            200,200,200,200,200,200,220,
                            328,328,328,328,328,328,328
                          ];

      this.levelEntry  = {
                            0:  0,   7: 22,  14:  48,  21: 120,  28: 220,  35: 328,
                            1:  0,   8: 22,  15:  48,  22: 120,  29: 220,  36: 328,
                            2:  0,   9: 22,  16:  48,  23: 120,  30: 220,  37: 328,
                            3:  0,  10: 22,  17:  48,  24: 120,  31: 220,  38: 328,
                            4:  0,  11: 22,  18:  48,  25: 120,  32: 220,  39: 328,
                            5:  0,  12: 22,  19:  48,  26: 120,  33: 220,  40: 328,
                            6: 18,  13: 44,  20: 110,  27: 200,  34: 240,  41: 328
                          };

      this.levelText   =['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7',
                         '2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7',
                         '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7',
                         '4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7',
                         '5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7',
                         '6-1', '6-2', '6-3', '6-4', '6-5', '6-6', '6-7'
                        ];

      this.hexBoard;                          //  Set in the hexBoard control initialization
      this.puzzleComplete;                    //  Set in the puzzleComplete control initialization
      this.puzzleSelect;                      //  Set in the puzzleComplete control initialization
      this.transition;                        //  Set in the transition control initialization

      this.menu;
      this.clock;
      this.music;
      this.reset;
      this.scoreboard;

      this.puzzle       = 12;                  //  Index of the current puzzle layout

      this.remaining    = 0;                  //  How many blue cells need to be uncovered
      this.covered      = 0;                  //  How many black cells need to be uncovered
      this.errors       = 0;                  //  How many mistaken clicks occurred

      this.musicOn      = true;
      this.level        = 0;                  //  Levels 0 - 42 ( 7 groups of 6 = 42 total)
      

      
      this.finished     = false;

      this.animations   = [];

    }

  };

  var app=new application();

  /* Utility Functions =================================================== */
  {

    /** Misc            -------------------------------------------------- */
    {

      var controlCount=-1;

      function getGUID()            { controlCount++; return ('C'+controlCount);                      };

      function getPuzzleNumber()    { return app.levelText[app.puzzle/2];                             };

      // function iRandom(n)           { return round(random(n));                                         };

      function getColor(clr, alpha) { return color(red(clr), green(clr), blue(clr), alpha/100*255);   };

      function getInfo()            { return app.info;                                                };
      function toggleInfo()         { app.info=!app.info;                                             };

      function getMusic()           { return app.musicOn;                                             };
      function setMusic(b)          { return app.musicOn=b;                                           };

      function getScore()           { return app.score;                                               };
      function setScore(b)          { return app.score=b;                                             };

      function getTelemetry()       { return app.telemetry;                                           };
      function toggleTelemetry()    { app.telemetry=!app.telemetry;                                   };

      function clickTest(n)         { print('click: ' + n);                                           };

    }

  }

    /** Control - default ------------------------------------------------ */
    {

      var control=function(id, parent, x, y, w, h){

        app.controlCount++;

        /* explicit properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
        this.id       = id;         /** Unique identification number --
                                        Change to GUID for production)        */
        this.parent   = parent;     /** parent control (acts as a container)  */

        this.x        = x;          /** left                                  */
        this.y        = y;          /** top                                   */
        this.w        = w;          /** width                                 */
        this.h        = h;          /** height                                */

        /* inherent properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
        this.controls = [];         /** array of child controls               */

        this.on       = false;      /** is the control on or off              */
        this.hit      = false;      /** mouse is over the control             */
        this.cursor   = p5.ARROW,      /** cursor when mouse is over the control */
        this.visible  = true;       /** is the control currently displayed    */

        this.active   = false;      /** active = hit and focus and visible    */
        this.offset   = 0;          /** offset distance when clicked          */

        this.font     = 'sans-serif';  /** default font                          */
        this.timer    = 0;          /** Used to count things - frames etc.    */

      };
      control.prototype.draw     = function(){};
      control.prototype.hitTest  = function (x,y){

        var retVal=false;

        if(mouseX>(this.x+x) &&
             mouseX<(this.x+x) + this.w &&
             mouseY>(this.y+y) &&
             mouseY<(this.y+y) + this.h){
          retVal=true;
        }

        return retVal;

      };
      control.prototype.moved    = function(x,y){

        if(this.hitTest(x,y)){

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
      control.prototype.clicked  = function(){ if(this.hit){ forEach(this.controls, 'clicked');  } };
      control.prototype.rclicked = function(){ if(this.hit){ forEach(this.controls, 'rclicked'); } };
      control.prototype.pressed  = function(){ };
      control.prototype.released = function(){ };
      control.prototype.over     = function(){ };
      control.prototype.out      = function(){ this.hit=false; forEach(this.controls, 'out');      };
      control.prototype.resized  = function(){ print(this.id + ":  resized");                      };
      // control.prototype.typed=function(){};
      // control.prototype.cClicked=function(){};

    }

    /* Containers ======================================================== */

    /** root            -------------------------------------------------- */
    {
      /* Identical to a container control except is doesn't have a parent */
      function root(id, x, y, w, h, props){

      print(props.clr)
        control.call(this, id, null, x, y, w, h);

        this.clr   = props.clr;
        this.border  = props.border;

      };
      root.prototype=Object.create(control.prototype);
      root.prototype.draw=function(){

          this.active=this.hit &&
                      app.focus===this;

          push();

            translate(this.x, this.y);

              if(this.active){
                cursor(this.cursor);
              }

              noStroke();
              fill(this.clr);

              if(this.border &&
                 this.active){

                strokeWeight(1);
                stroke(0);

              }

                rect(0, 0, this.w, this.h);

              forEach(this.controls, 'draw');

          pop();

      };
      root.prototype.moved=function(x,y){
      /* Required because root control doesn't have a parent */

          if(this.hitTest(x,y)){

            this.hit=true;
            app.focus=this;

            for(var c in this.controls){ this.controls[c].moved(this.x+x, this.y+y); }

          }
          else{

            this.hit=false;

            for(var c in this.controls){ this.controls[c].hit=false; }

          }

      };
      root.prototype.resized=function(){

        this.w = windowWidth -15;
        this.h = windowHeight-15;

      };

    }
    
    /** Telemetry       -------------------------------------------------- */
    {

      function telemetry(id, parent, x, y, w, h, props){

        control.call(this, id, parent, parent.w-w, y, w, h);

        this.color   = props.color;
        this.cursor  = props.cursor;

      };
      telemetry.prototype=Object.create(control.prototype);
      telemetry.prototype.draw=function(){

        if(app.debug===false){ return; }

          var p=this;

          this.active=this.hit &&
                      app.focus===this;

          if(this.active){ cursor(this.cursor); }

          function border(){

            noStroke();

            fill(getColor(BLACK,50));

              if(p.hit){
                fill(getColor(BLACK,70));
              }

              rect(p.offset, 0, p.w, p.h, 5);

          };
          function title(){

            textAlign(CENTER,CENTER);
            textSize(14);

            fill(WHITE);

              text('Telemetry', p.w/2+p.offset, 20);

          };
          function environment(){

            fill(getColor(BLACK,50));

              rect(p.offset+10,  35, p.w-20, 365, 3);

            textAlign(LEFT,TOP);
            textSize(10);
            textLeading(12);

            fill(getColor(TEAL_2,75));

              text('\n'             + 'Cursor Coordinates' +
                   '\n\n\n\n'       + 'Mouse Buttons'      +
                   '\n\n\n\n\n\n\n' + 'Keys'               +
                   '\n\n\n\n\n'     + 'Environment',
                   col0, row0);

            fill(getColor(WHITE,75));

              text('\n\n'   + 'x:'             +
                   '\n'     + 'y:'             +
                   '\n\n\n' + 'Left:'          +
                   '\n'     + 'Right:'         +
                   '\n'     + 'Center:'        +
                   '\n\n'   + 'Dragging:'      +
                   '\n\n\n' + 'Alt:'           +
                   '\n'     + 'Control:'       +
                   '\n'     + 'Shift:'         +
                   '\n\n\n' + 'Width:'         +
                   '\n'     + 'Height:'        +
                   '\n\n'   + 'Screen Width:'  +
                   '\n'     + 'Screen Height:' +
                   '\n\n'   + 'Focused:'       +
                   '\n\n'   + 'Frame Count:'   +
                   '\n'     + 'FrameRate:',
                   col1, row0);

            fill(getColor(YELLOW,75));
            textAlign(RIGHT,TOP);

              text('\n\n'   + mouseX                     +
                   '\n'     + mouseY                     +
                   '\n\n\n' + app.left                   +
                   '\n'     + app.right                  +
                   '\n'     + app.center                 +
                   '\n\n'   + app.dragging               +
                   '\n\n\n' + app.keys[KEYCODES.ALT]     +
                   '\n'     + app.keys[KEYCODES.CONTROL] +
                   '\n'     + app.keys[KEYCODES.SHIFT]   +
                   '\n\n\n' + width                      +
                   '\n'     + height                     +
                   '\n\n'   + screen.width               +
                   '\n'     + screen.height              +
                   '\n\n'   + focused                    +
                   '\n\n'   + frameCount                 +
                   '\n'     + nf(app.frameRate,1,1),
                   col2, row0);

          };
          function appSpecific(){

            var top=410;

            fill(getColor(BLACK,50));

              rect(p.offset+10,  top, p.w-20, 170, 3);

            textAlign(LEFT,TOP);
            textSize(10);
            textLeading(12);

            fill(getColor(TEAL_2,75));

              text('\n'       + 'Controls' +
                   '\n\n\n\n' + 'Score'    +
                   '\n\n\n\n' + 'Misc',
                   col0, top);

            fill(getColor(WHITE,75));

              text('\n\n'   + 'Count:'     +
                   '\n'     + 'Active:'    +
                   '\n\n\n' + 'Remaining:' +
                   '\n'     + 'Mistakes:'  +
                   '\n\n\n' + 'Music:'     +
                   '\n'     + 'Level:',
                   col1, top);

            fill(getColor(YELLOW,75));
            textAlign(RIGHT,TOP);

              var id=-1;

              // if(app.focus!==undefined){ id=app.focus.id; }
              // else                     { id= -1;          }

              text('\n\n'   + app.controlCount +
                   '\n'     + id               +
                   '\n\n\n' + app.remaining    +
                   '\n'     + app.errors       +
                   '\n\n\n' + app.musicOn      +
                   '\n'     + app.level,
                   col2, top);

          };

          if     ( app.telemetry && this.offset>-200){ this.offset-=10; }
          else if(!app.telemetry && this.offset<0   ){ this.offset+=10; }

          var row0 = 30;
          var row1 = 90;

          var col0 = this.offset+20;
          var col1 = this.offset+25;
          var col2 = this.offset+170;

          push();

            translate(this.x, this.y);

              border();
              title();
              environment();
              appSpecific();

          pop();

      };
      telemetry.prototype.moved=function(x,y){
      /* Overridden because of the dynamic x-coordinate offset */

        // if(app.telemetry===false &&
           // this.offset===0){ return; }

          if(this.parent.hit){

            if(this.hitTest(x+this.offset,y)){

              this.hit=true;
              app.focus=this;

              // for(var c in this.controls){ this.controls[c].moved(this.x+x+this.offset, this.y+y); }

            }
            else{

              this.hit=false;

              // for(var c in this.controls){ this.controls[c].hit=false; }

            }

          }

      };
      telemetry.prototype.resized=function(){
        
        this.x=this.parent.w-this.w;
        
      };
      
    }

    /* Controls   ======================================================== */




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
print(RED);
      /* root control     */
      var rt=new root(getGUID(), 5, 5, windowWidth-15, windowHeight-15,
        {border:    true,
         clr:       RED});

      app.controls.push(rt);

      /* Zen Animation    */
      // rt.controls.push(new zen(getGUID(), rt, 100, 100, 400, 400, null));

      /* Hex Board         */
      // rt.controls.push(new hexBoard(getGUID(), rt, 0, 0, width-200, height,
        // {cursor:    ARROW}));

      /* Accessories ---------------------------------------------------- */

      /** Reset Button     */
      // rt.controls.push(new resetButton(getGUID(), rt, width-235, height-35, 28, 28,
        // {cursor:    HAND,
         // color:     BLACK,
         // execute:   reset}));

      /** Music            */
      // rt.controls.push(new music(getGUID(), rt, 35, height-35, 50, 50,
        // {cursor:    HAND,
         // execute:   setMusic,
         // retrieve:  getMusic}));

      /** Score Board      */
      // rt.controls.push(new scoreBoard(getGUID(), rt, width-325, 10, 50, 50,
        // {color:     H_BLUE,
         // cursor:    HAND,
         // execute:   getRemaining,
         // retrieve:  getMistakes}));

      /** Clock            */
      // rt.controls.push(new clock(getGUID(), rt, (width-200)/2, 30, 50, 50,
        // {cursor:    HAND}));

      /** Menu Button      */
      // rt.controls.push(new menuButton(getGUID(), rt, 15, 15, 57, 60,
        // {text:      'Yippee',
         // cursor:    HAND,
         // execute:   menu}));

      /* Puzzle Complete   */
      // var pc=new puzzleComplete(getGUID(), rt, 1000, 1, width-201, height-2,
        // {text:      'Puzzle Complete',
         // color:     H_BLUE});

      // app.controls.push(pc);

      /* Puzzle Select     */
      // var ps=new puzzleSelect(getGUID(), rt, 1000, 0, width-200, height,
        // {retrieve:  getScore,
         // color:     getColor(H_BLUE,2)});

      // app.controls.push(ps);


      /* Telemetry ---------------------------------------------------- */
      var telem=new telemetry(getGUID(), rt, rt.w-195, 10, 190, rt.h-10,
        {color:     GRAY,
         cursor:    0});

      app.controls.push(telem);

      /* Transition ---------------------------------------------------- */
      // var trans=new transition(getGUID(), rt, 1000, 0, width-200, height,
        // {color:     WHITE,
         // visible:   true,
         // type:      round(random(0,4))});

      // app.controls.push(trans);

      /* SplashScreen ------------------------------------------------- */
      {

        // /* Splash Screen   */
        // var splashScreen=new splash(getGUID(), rt, width/2-200, height/2-200, 400, 400,
          // {color:     BLACK,
           // font:      monoFont,
           // retrieve:  getInfo,
           // cursor:    CROSS});

          // /* Close         */
          // splashScreen.controls.push(new button(getGUID(), splashScreen, 180, 360, 120, 20,
            // {text:      'Close',
             // font:      monoFont,
             // execute:   toggleInfo,
             // color:     WHITE,
             // cursor:    HAND}));

        // rt.controls.push(splashScreen);

      }

  };

  initialize();

  function draw(){

    background(128);

    forEach(app.controls,'draw');

    fill(BLACK);
    text(RED,100,100);

  }
  function mousePressed() {

      // app.fullscreen=!app.fullscreen;

      // fullscreen(app.fullscreen);

  }
  function windowResized(){

    resizeCanvas(windowWidth-5, windowHeight-5);

    forEach(app.controls,'resized');
    
  }
