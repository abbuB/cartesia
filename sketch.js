/**

  TO DO:
  
    
    

  To Done:
  
    - determine how to pass a color as a parameter

  Research:
  
    print(getURLParams()); - test when this goes live
    
  Cursors:
  
    ARROW, CROSS, HAND, MOVE, TEXT, or WAIT
  
**/


{  // CONSTANTS ================================================================================

  new p5();

  var myFont;

  // Colours ------------------------------------------------------------------
  var RT            = [212,212,212,255];  var RT          = [212,212,212,255];
  var BG            = [255,204,  0,255];

  var H_SHADOW      = [209,209,209,255];

  var H_BLUE        = [ 20,156,216,255];  var H_BLUE_L    = [  5,164,235,255];
  var H_BLACK       = [ 44, 47, 49,255];  var H_BLACK_L   = [ 62, 62, 62,255];
  var H_ORANGE      = [255,159,  0,255];  var H_ORANGE_L  = [255,175, 41,255];

  var RED           = [170, 29, 29,255];
  var GREEN         = [158,182, 58,255];

  var BLUE          = [ 29, 86,170,255];  var YELLOW      = [238,214, 15,255];
  var ORANGE        = [238,136, 15,255];  var GRAY        = [128,128,128,255];

  var CYAN          = [ 49,204,167,255];
  var PINK          = [255, 20,147,255];

  var TEAL_0        = [ 28,117,138,255];  var TEAL_0_LT   = [ 28,117,138,128];
  var TEAL_1        = [ 41,171,202,255];  var TEAL_1_LT   = [ 41,171,202,128];
  var TEAL_2        = [ 88,196,221,255];
  var TEAL_2_LT     = [ 88,196,221,128];
  var TEAL_3        = [156,220,235,255];  var TEAL_3_LT   = [156,220,235,128];

  var TRANSPARENT   = [ -1, -1, -1,255];

  var WHITE         = [255,255,255,255];
  var BLACK         = [  0,  0,  0,255];

  var K_RED         = [170, 29, 29,255];  var K_GREEN     = [158,182, 58,255];
  var K_BLUE        = [ 29, 86,170,255];  var K_YELLOW    = [238,214, 15,255];
  var K_ORANGE      = [238,136, 15,255]; 

  var BROWN         = [155,145,135,255];

  // const RED           = [255,  0,  0,255]; const REDORANGE    = [255, 81,  0,255];
  // const ORANGE        = [255,127,  0,255]; const YELLOWORANGE = [255,190,  0,255];
  // const YELLOW        = [255,255,  0,255]; const YELLOWGREEN  = [192,255,  0,255];
  // const GREEN         = [  0,255,  0,255]; const BLUEGREEN    = [  0,127,127,255];
  // const BLUE          = [  0,  0,255,255]; const BLUEVIOLET   = [ 92,  0,255,255];
  // const VIOLET        = [127,  0,255,255]; const REDVIOLET    = [191,  0,127,255];

  // --------------------------------------------------------------------------

}

  function preload(){

    // myFont = loadFont('http://fonts.googleapis.com/css?family=Walter+Turncoat&.css');

  }

  var cnv;

  function setup(){

    //  Set a global reference to the canvas
    cnv=createCanvas(windowWidth-10, windowHeight-10);

    //  Settings
    frameRate(100);

    noCursor();

    textFont('sans-serif',12);

    cursor(WAIT);
    
    randomSeed(millis());

    strokeCap(SQUARE);
    strokeJoin(MITER);

    angleMode='radians';

    //  Bind events to functions
    cnv.mouseOut(out);
    cnv.mouseOver(over);
    cnv.doubleClicked(dClicked);

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

      function getGUID()            { controlCount++; return controlCount;                            };

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
        this.id       = id;           /** Unique identification number --
                                        Change to GUID for production)          */
        this.parent   = parent;       /** parent control (acts as a container)  */

        this.x        = x;            /** left                                  */
        this.y        = y;            /** top                                   */
        this.w        = w;            /** width                                 */
        this.h        = h;            /** height                                */

        /* inherent properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
        this.controls = [];           /** array of child controls               */

        this.on       = false;        /** is the control on or off              */
        this.hit      = false;        /** mouse is over the control             */
        this.cursor   = ARROW         /** cursor when mouse is over the control */
        this.visible  = true;         /** is the control currently displayed    */

        this.active   = false;        /** active = hit and focus and visible    */
        this.offset   = 0;            /** offset distance when clicked          */

        this.font     = 'sans-serif'; /** default font                          */
        this.timer    = 0;            /** Used to count things - frames etc.    */

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
  {

    /** root            -------------------------------------------------- */
    {
      /* Identical to a container control except is doesn't have a parent */
      function root(id, x, y, w, h, props){

        control.call(this, id, null, x, y, w, h);

        this.color  = props.color;
        this.border = props.border;
        this.cursor = props.cursor;

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
              fill(this.color);

              if(this.border &&
                 this.active){

                strokeWeight(0.25);
                stroke(0);

              }

                rect(0, 0, this.w, this.h, 5);

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

        this.w = windowWidth -20;
        this.h = windowHeight-20;

        forEach(this.controls,'resized');

      };
      
    }
    
    /** Telemetry       -------------------------------------------------- */
    {

      function telemetry(id, parent, x, y, w, h, props){

        control.call(this, id, parent, parent.w-w, y, w, h);

        this.color  = props.color;

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

            fill(getColor(p.color,50));

              if(p.hit){
                fill(getColor(p.color,70));
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

            fill(getColor(p.color,50));

              rect(p.offset+10,  10, p.w-20, 375, 3);

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
                   '\n\n\n' + 'Canvas Width:'  +
                   '\n'     + 'Canvas Height:' +
                   '\n\n'   + 'Window Width:'  +
                   '\n'     + 'Window Height:' +
                   '\n\n'   + 'Display Width:'  +
                   '\n'     + 'Display Height:' +                   
                   '\n\n'   + 'Focused:'       +
                   '\n\n'   + 'Frame Count:'   +
                   '\n'     + 'Frame Rate:',
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
                   '\n\n'   + windowWidth                +
                   '\n'     + windowHeight               +                   
                   '\n\n'   + displayWidth               +
                   '\n'     + displayHeight              +
                   '\n\n'   + focused                    +
                   '\n\n'   + frameCount                 +
                   '\n'     + nf(app.frameRate,1,1),
                   col2, row0);

          };
          function appSpecific(){

            var top=395;

            fill(getColor(p.color,50));

              rect(p.offset+10,  top, p.w-20, p.h-405, 3);

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

              if(app.focus!==null){ id=app.focus.id; }

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

          var row0 = 5;
          var row1 = 90;

          var col0 = this.offset+20;
          var col1 = this.offset+25;
          var col2 = this.offset+170;

          push();

            translate(this.x, this.y);

              border();
              // title();
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
        this.h=this.parent.h-10;

      };

    }
    
    /** Hexboard        -------------------------------------------------- */
    {

      function hexBoard(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        /* ------------------------------------------------- */
        this.color          = props.color;

        /* ------------------------------------------------- */
        this.activeCell     = null;

        this.layout         = [];   //  Array of the layout of hexcells
        this.text           = [];   //  Array of nexCell hints

        this.lines          = [];   //  Array of hexCells with highlight lines activated
        this.halos          = [];   //  Array of hexCells with a halo activated

        this.clrOffset      = 0;    //  Used to pulsate the halo
        this.clrIncr        = 0.5;  //  Something, something halo

        this.dirty          = false;  //  Has the hexBoard been clicked yet?

        app.hexBoard        = this; //  Set a global hexBoard reference

        // this.reset();

      };
      hexBoard.prototype=Object.create(control.prototype);
      hexBoard.prototype.reset        = function(){

        var p=this;             //  Set a reference to the hexBoard control

        this.controls   = [];   //  Clear the controls array
        this.activeCell = null; //  Clear the active hexCell

        // this.layout     = PUZZLES[app.puzzle];
        // this.text       = PUZZLES[app.puzzle+1];

        // this.level      = app.levelText[app.level];

        var rowArray    = [];  // Temporary 1-D array to hold each successive row before adding
                               // to the corresponding 2-D array
        var n=0;          // Iterator

        function load(){

          var WIDTH =width-200;
          var HEIGHT=height;

          if     (WIDTH  >= HEIGHT){ HEX_SIZE = HEIGHT / (p.layout.length);    }
          else if(HEIGHT >  WIDTH ){ HEX_SIZE = WIDTH  / (p.layout[0].length); }

          var w=HEX_SIZE;

          var x=0;
          var y=0;

          var xMargin;
          var yMargin;

          var xOffset;
          var yOffset;

          var row;
          var col;

          n=0;

          yOffset = w*cos(PI/6);

          xMargin = w/2     + (p.w-(w+w*(p.layout[0].length-1)*0.75))/2;
          yMargin = yOffset +  p.h/2 - (p.layout.length-1)*yOffset/2-w/2-10;

          var curs=HAND;

          for(row in p.layout){
            for(col in p.layout[row]){

              x = xMargin + col*w*0.75;
              y = yMargin + row*yOffset;

              if(col%2===0){
                y-=yOffset/2;
              }

              if(p.layout[row][col]===HEXY_TYPES.BLANK){
                curs=ARROW;
              }
              else{
                curs=HAND;
              }

              rowArray.push(new hexCell('hexcell'+getGUID(), p, x, y, w, w,
                {row:       row,
                 col:       col,
                 layout:    p.layout[row][col],
                 text:      p.text[row][col],
                 cursor:    curs}));

               n++;

            }

            p.controls.push(rowArray);

            rowArray=[];

          }

        };

        load();

        this.update();

        app.finished=false;
        this.dirty=false;
print(this.controls.length);
      };
      hexBoard.prototype.draw         = function(){

        // if(this.x!==0){
          // this.timer=0;
          // return;
        // }

          var p=this;

          this.active=this.hit &&
                      app.focus===this;

          if(this.active){ cursor(this.cursor); }

          function background(){

            fill(p.color);
            stroke(getColor(H_BLUE,25));

              rect( 0, 0, p.w, p.h, 5);

            textAlign(CENTER,CENTER);
            textSize(height/20);

            push();

              translate(32,height/2);
              rotate(PI/2);

              noStroke();
              fill(212);

                text('Level ' + app.levelText[app.puzzle/2], 3,-3);

              fill(202);

                text('Level ' + app.levelText[app.puzzle/2], 0, 0);

            pop();

          };
          function controls(){

            var ctrls=p.controls;

            for(var r in ctrls){
              for(var c in ctrls[r]){

                ctrls[r][c].draw();

              }
            }

          };

          push();

            translate(this.x, this.y);

              background();
              controls();

          pop();

      };
      hexBoard.prototype.moved        = function(x,y){

        if(this.hitTest(x,y)){

          if(this.parent.hit){

            this.hit=true;
            app.focus=this;

            var ctrls=this.controls;

            for(var r in ctrls){
              for(var c in ctrls[r]){

                ctrls[r][c].moved(this.x+x, this.y+y);

              }
            }

          }

        }
        else{

          this.hit=false;

          var ctrls=this.controls;

          for(var r in ctrls){
            for(var c in ctrls[r]){

              ctrls[r][c].hit=false;

            }
          }

        }

      };
      hexBoard.prototype.clicked      = function(){
// print(app.focus.id);
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

        var ctrls=this.controls;

        for(var r in ctrls){
          for(var c in ctrls[r]){

            ctrls[r][c].out();

          }
        }

      };
      hexBoard.prototype.clearLayout  = function(){

        var ctrls=this.controls;

        for(var r in ctrls){
          for(var c in ctrls[r]){

            ctrls[r][c].layout=HEXY_TYPES.BLANK;
            ctrls[r][c].text  =HEXY_TYPES.BLANK;

          }
        }

      };
      hexBoard.prototype.update       = function(){

        var p=this;           //  Set a reference to the hexBoard control

        function link(){

          var ctrls=p.controls;
          var layout=null;
          var total=0;

            for(var r in ctrls){
              for(var c in ctrls[r]){

                total=0;

                r/=1;
                c/=1;

                //  Top / Bottom
                {

                  // Top
                  if(r>0){

                    ctrls[r][c].top= ctrls[r-1][c];
                    layout=ctrls[r][c].top.layout;

                    if(layout===HEXY_TYPES.BLUE ||
                       layout===HEXY_TYPES.BLUE_REVEALED){
                      total++;
                    }

                  }

                  // Bottom
                  if(r<ctrls.length-1){

                    ctrls[r][c].bottom = ctrls[r+1][c];
                    layout=ctrls[r][c].bottom.layout;

                    if(layout===HEXY_TYPES.BLUE ||
                       layout===HEXY_TYPES.BLUE_REVEALED){
                      total++;
                    }

                  }

                }

                // Left / Right
                {

                  //  Top Left
                  if(c>0){

                    if(c%2===0 &&
                       r>0){

                      ctrls[r][c].topLeft = ctrls[r-1][c-1];
                      layout=ctrls[r][c].topLeft.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                        total++;
                      }

                    }
                    else if(c%2===1){

                      ctrls[r][c].topLeft = ctrls[r][c-1];
                      layout=ctrls[r][c].topLeft.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                        total++;
                      }

                    }

                  }

                  //  Bottom Left
                  if(c>0){

                    if(c%2===0){

                      ctrls[r][c].bottomLeft = ctrls[r][c-1];
                      layout=ctrls[r][c].bottomLeft.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                        total++;
                      }

                    }
                    else if(c%2===1 &&
                            r<ctrls.length-1){

                      ctrls[r][c].bottomLeft = ctrls[r+1][c-1];
                      layout=ctrls[r][c].bottomLeft.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                        total++;
                      }

                    }

                  }

                  //  Top Right
                  if(c<ctrls[0].length-1){

                    if(c%2===0 &&
                       r>0){

                      ctrls[r][c].topRight = ctrls[r-1][c+1];
                      layout=ctrls[r][c].topRight.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                        total++;
                      }

                    }
                    else if(c%2===1){

                      ctrls[r][c].topRight = ctrls[r][c+1];
                      layout=ctrls[r][c].topRight.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                        total++;
                      }

                    }

                  }

                  //  Bottom Right
                  if(c<ctrls[0].length-1){

                    if(c%2===0){

                      ctrls[r][c].bottomRight = ctrls[r][c+1];
                      layout=ctrls[r][c].bottomRight.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                        total++;
                      }

                    }
                    else if(c%2===1 &&
                            r<ctrls.length-1){

                      ctrls[r][c].bottomRight = ctrls[r+1][c+1];
                      layout=ctrls[r][c].bottomRight.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                        total++;
                      }

                    }

                  }

                  ctrls[r][c].count=total;

                }

              }

            }

        };
        function doubleLink(){
          // Double Ring Count (dCount) -------------------------

          var ctrls=p.controls;
          var layout=-1;
          var total=0;

            for(var r in ctrls){
              for(var c in ctrls[r]){

                total=0;

                r/=1;
                c/=1;

                dCount=ctrls[r][c].count;

                if(ctrls[r][c]!==null){

                  if(ctrls[r][c].top!==null){
                    if(ctrls[r][c].top.top!==null){

                      layout=ctrls[r][c].top.top.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].bottom!==null){
                    if(ctrls[r][c].bottom.bottom!==null){

                      layout=ctrls[r][c].bottom.bottom.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                // -------------------------

                  if(ctrls[r][c].topLeft!==null){
                    if(ctrls[r][c].topLeft.topLeft!==null){

                      layout=ctrls[r][c].topLeft.topLeft.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].bottomLeft!==null){
                    if(ctrls[r][c].bottomLeft.bottomLeft!==null){

                      layout=ctrls[r][c].bottomLeft.bottomLeft.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }


                // -------------------------

                  if(ctrls[r][c].topRight!==null){
                    if(ctrls[r][c].topRight.topRight!==null){

                      layout=ctrls[r][c].topRight.topRight.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].bottomRight!==null){
                    if(ctrls[r][c].bottomRight.bottomRight!==null){

                      layout=ctrls[r][c].bottomRight.bottomRight.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                // -------------------------

                  if(ctrls[r][c].top!==null){
                    if(ctrls[r][c].top.topLeft!==null){

                      layout=ctrls[r][c].top.topLeft.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].top!==null){
                    if(ctrls[r][c].top.topRight!==null){

                      layout=ctrls[r][c].top.topRight.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                // -------------------------

                  if(ctrls[r][c].bottom!==null){
                    if(ctrls[r][c].bottom.bottomLeft!==null){

                      layout=ctrls[r][c].bottom.bottomLeft.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].bottom!==null){
                    if(ctrls[r][c].bottom.bottomRight!==null){

                      layout=ctrls[r][c].bottom.bottomRight.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                // -------------------------

                  if(ctrls[r][c].topRight!==null){
                    if(ctrls[r][c].topRight.bottomRight!==null){

                      layout=ctrls[r][c].topRight.bottomRight.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].topLeft!==null){
                    if(ctrls[r][c].topLeft.bottomLeft!==null){

                      layout=ctrls[r][c].topLeft.bottomLeft.layout;

                      if(layout===HEXY_TYPES.BLUE ||
                         layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                }

                ctrls[r][c].dCount=dCount;

              }
            }

        };
        function columnCounts(){

          var ctrls=p.controls;
          var ctrl=null;
          var total=0;

            for(var r in ctrls){
              for(var c in ctrls[r]){

                switch(ctrls[r][c].layout){

                  case HEXY_TYPES.DOWN_CENTER:

                    ctrl=ctrls[r][c].bottom;

                      while(ctrl!==null){

                        if(ctrl.layout===HEXY_TYPES.BLUE ||
                           ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                          total++;
                        }

                        ctrl=ctrl.bottom;

                      }

                      ctrls[r][c].count=total;

                    break;

                  case HEXY_TYPES.DOWN_LEFT:

                    ctrl=ctrls[r][c].bottomLeft;

                      while(ctrl!==null){

                        if(ctrl.layout===HEXY_TYPES.BLUE ||
                           ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                          total++;
                        }

                        ctrl=ctrl.bottomLeft;

                      }

                      ctrls[r][c].count=total;

                    break;

                  case HEXY_TYPES.DOWN_RIGHT:

                    ctrl=ctrls[r][c].bottomRight;

                      while(ctrl!==null){

                        if(ctrl.layout===HEXY_TYPES.BLUE ||
                           ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                          total++;
                        }

                        ctrl=ctrl.bottomRight;

                      }

                      ctrls[r][c].count=total;

                    break;

                  default:

                    break;

                }

                total=0;

              }
            }

        };

        link();
        doubleLink();
        columnCounts();

      };
      hexBoard.prototype.resized=function(){
        
        this.x=10;
        this.y=10;
        this.w=this.parent.w-215;
        this.h=this.parent.h-20;

      };

    }
    
  }
  
  /* Controls   ======================================================== */
  {
  
    /** Hexagonal Cell  -------------------------------------------------- */
    {

      function hexCell(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.cursor       = props.cursor;

        this.execute      = props.execute;

        this.outerHit     = false;

        this.row          = props.row;
        this.col          = Number(props.col);

        this.points       = [];             //  Full extent of hexagon
        this.opoints      = [];             //  Outer hexagon
        this.ipoints      = [];             //  Inner hexagon
        this.hpoints      = [];             //  Highlight

        this.dirty        = false;

        //  Adjacent cells ---------------
        this.top          = null;
        this.bottom       = null;

        this.topRight     = null;
        this.bottomRight  = null;

        this.topLeft      = null;
        this.bottomLeft   = null;

        // ------------------------------

        this.layout       = props.layout;   //  Type of cell
        this.text         = props.text;     //  Hint

        this.count        = 0;              //  # of blue cells in surrounding ring
        this.dCount       = 0;              //  # of blue cells in surrounding 2 rings

        this.enabled      = true;           //  Text is displayed black or grayed out

        this.halo         = false;
        this.line         = false;

        this.clickRadius  = 0;

        var p=this;

        /* Initialize */
        function reset(){

          var d2=p.w/2;  // Half diameter

          var pt=0;
          var ang=0;

          for(pt=0; pt<6; pt++){

            p.points.push( new pnt( cos(radians(ang+pt*60))*(d2),
                                    sin(radians(ang+pt*60))*(d2) ));

            p.opoints.push(new pnt( cos(radians(ang+pt*60))*(d2-3),
                                    sin(radians(ang+pt*60))*(d2-3) ));

            p.ipoints.push(new pnt( cos(radians(ang+pt*60))*(d2-8),
                                    sin(radians(ang+pt*60))*(d2-8) ));

            p.hpoints.push(new pnt( cos(radians(ang+pt*60))*(d2-3)+4,
                                    sin(radians(ang+pt*60))*(d2-3)-3 ));

          }

        };

        reset();

      };
      hexCell.prototype=Object.create(control.prototype);
      hexCell.prototype.draw=function(){

        this.active=this.hit &&
                    app.focus===this;

        this.offset=0;
        var p=this;

        if(this.active){

          if(this.layout===HEXY_TYPES.BLACK ||
             this.layout===HEXY_TYPES.BLUE ||
             app.mode===APPMODES.CREATE){
            cursor(this.cursor);
          }
          else{
            cursor(ARROW);
          }

          if(app.left){ this.offset=1; }

        }

        function getOffset(){

          var rand=random(-1,1);

          if(rand>0){ rand= 1.5; }
          else      { rand=-1.5; }

          return rand;

        };

        function highlight(){

          if(app.mode!==APPMODES.GAME){ return; }

            if(p.layout===HEXY_TYPES.BLACK ||
               p.layout===HEXY_TYPES.BLACK_REVEALED ||
               p.layout===HEXY_TYPES.BLUE ||
               p.layout===HEXY_TYPES.BLUE_REVEALED){

              noStroke();
              fill(212);

              beginShape();

                for(var pt in p.hpoints){
                  vertex(p.hpoints[pt].x,
                         p.hpoints[pt].y);
                }

              endShape(CLOSE);

            }

        };
        function outerHexagon(){

          var drw=true;
          var offset=0;

          noStroke();

          if(app.mode===APPMODES.CREATE){

            switch(p.layout){

              case HEXY_TYPES.BLACK:          stroke(CLRS.H_ORANGE);
                                              strokeWeight(2.5);
                                              fill(CLRS.H_BLACK);     break;

              case HEXY_TYPES.BLUE:           stroke(CLRS.H_ORANGE);
                                              strokeWeight(2.5);
                                              fill(CLRS.H_BLUE);      break;

              case HEXY_TYPES.BLACK_REVEALED: fill(CLRS.H_BLACK);     break;
              case HEXY_TYPES.BLUE_REVEALED:  fill(CLRS.H_BLUE);      break;

              default:                        drw=false;              break;

            }

          }
          else{

            switch(p.layout){

              case HEXY_TYPES.BLACK:          fill(CLRS.H_ORANGE);  break;
              case HEXY_TYPES.BLUE:           fill(CLRS.H_ORANGE);  break;
              case HEXY_TYPES.BLACK_REVEALED: fill(CLRS.H_BLACK);   break;
              case HEXY_TYPES.BLUE_REVEALED:  fill(CLRS.H_BLUE);    break;

              default:                        drw=false;            break;
            }

          }

          if(drw){

            if(p.timer>0 &&
               p.dirty===false &&
               app.mode!==APPMODES.CREATE &&
               app.focus===p){
              offset=getOffset();
              p.timer--;
              if(p.timer<=0){ p.dirty=true; }

            }

            beginShape();

              for(var pt in p.opoints){
                vertex(p.opoints[pt].x+offset,
                       p.opoints[pt].y+offset);
              }

            endShape(CLOSE);

          }
          // else{

            // fill(getColor(CLRS.GRAY,10));
            // noStroke();

              // ellipse(offset,offset,
                      // p.w*0.87,
                      // p.w*0.87);

          // }

        };
        function innerHexagon(){

          var drw=true;

          if(app.mode===APPMODES.CREATE){

            switch(p.layout){

              case HEXY_TYPES.BLACK:          fill(CLRS.H_BLACK_L); break;
              case HEXY_TYPES.BLUE:           fill(CLRS.H_BLUE_L);  break;
              case HEXY_TYPES.BLACK_REVEALED: fill(CLRS.H_BLACK_L); break;
              case HEXY_TYPES.BLUE_REVEALED:  fill(CLRS.H_BLUE_L);  break;

              default:                        drw=false;            break;

            }

          }
          else{

            switch(p.layout){

              case HEXY_TYPES.BLACK:          fill(CLRS.H_ORANGE_L);  break;
              case HEXY_TYPES.BLUE:           fill(CLRS.H_ORANGE_L);  break;
              case HEXY_TYPES.BLACK_REVEALED: fill(CLRS.H_BLACK_L);   break;
              case HEXY_TYPES.BLUE_REVEALED:  fill(CLRS.H_BLUE_L);    break;

              default:                        drw=false;              break;

            }

          }

          if(drw){

            noStroke();

            beginShape();

              for(var pt in p.ipoints){
                vertex(p.ipoints[pt].x,
                p.ipoints[pt].y);
              }

            endShape(CLOSE);

          }

        };
        function caption(){

          if(p.layout===HEXY_TYPES.BLANK ||
             p.layout===HEXY_TYPES.BLUE){ return; }

            function wrapText(n){

              var retVal=n;

              if      (p.text===HEXY_TYPES.CONSECUTIVE    ){ retVal="{" + retVal + "}"; }
              else if (p.text===HEXY_TYPES.NOT_CONSECUTIVE){ retVal="-" + retVal + "-"; }
              // else if (p.text===HEXY_TYPES.NUMBER         ){ retVal="|" + retVal + "|"; }cntntnn

              return retVal;

            };

            push();

              scale(1,-1);

                // textFont(p.font,16);
                textSize(p.w/3);
                textAlign(CENTER,CENTER);
                fill(CLRS.WHITE);

                switch(p.layout){

                  case HEXY_TYPES.BLACK:            /*  Black only has text when editing        */
                                                      if(app.mode===APPMODES.CREATE){

                                                        if(p.text===HEXY_TYPES.BLANK){ text('?',0,0);               }
                                                        else                         { text(wrapText(p.count),0,0); }

                                                      }

                                                      break;

                  case HEXY_TYPES.BLACK_REVEALED:   /*  Black revealed always has text  */
                                                      if(!p.enabled){ fill(getColor(CLRS.WHITE,25)); }

                                                      if(p.text===HEXY_TYPES.BLANK){ text('?',0,0);               }
                                                      else                         { text(wrapText(p.count),0,0); }

                                                      break;

                  case HEXY_TYPES.BLUE_REVEALED:    /* Blue revealed has text with number symbol */
                                                      if(p.text===HEXY_TYPES.NUMBER){

                                                        if(!p.enabled){ fill(getColor(CLRS.WHITE,25)); }

                                                        text(wrapText(p.count),0,0);

                                                      }

                                                      break;

                  case HEXY_TYPES.DOWN_CENTER:      /* Always has text */

                                                      textAlign(CENTER,TOP);
                                                      rotate(0);

                                                      fill(CLRS.BLACK);
                                                      if(!p.enabled){ fill(getColor(CLRS.BLACK,25)); }

                                                      text(wrapText(p.count),0,0);

                                                      break;

                  case HEXY_TYPES.DOWN_LEFT:        /* Always has text */

                                                      textAlign(CENTER,TOP);
                                                      rotate(PI/3);

                                                      fill(CLRS.BLACK);
                                                      if(!p.enabled){ fill(getColor(CLRS.BLACK,25)); }

                                                      text(wrapText(p.count),0,0);

                                                      break;

                  case HEXY_TYPES.DOWN_RIGHT:       /* Always has text */

                                                      textAlign(CENTER,TOP);
                                                      rotate(-PI/3);

                                                      fill(CLRS.BLACK);
                                                      if(!p.enabled){ fill(getColor(CLRS.BLACK,25)); }

                                                      text(wrapText(p.count),0,0);

                                                      break;
                  case HEXY_TYPES.BLANK:
                  case HEXY_TYPES.BLUE:
                  default:                            break;/*  Blank and Blue never has text   */

                }

            pop();

        };
        function activeCell(){

          if(p.active){
            if(app.mode!==APPMODES.CREATE &&
             (p.layout===HEXY_TYPES.BLUE ||
              p.layout===HEXY_TYPES.BLACK)){

              fill(getColor(CLRS.BLACK,15));

              beginShape();

                for(var pt in p.opoints){
                  vertex(p.opoints[pt].x,
                         p.opoints[pt].y);
                }

              endShape(CLOSE);

            }
          }

        };

        function highlightActive(){

          //  Highlight Active cell when editing
          if(app.hexBoard.activeCell===p &&
             app.mode===APPMODES.CREATE){

            noFill();
            strokeWeight(1.5);
            stroke(CLRS.GRAY);

            beginShape();

              for(var pt in p.points){
                vertex(p.points[pt].x,
                p.points[pt].y);
              }

            endShape(CLOSE);

          }

        }
        function revealAnimation(){

          if(p.layout===HEXY_TYPES.BLACK_REVEALED){

            // This must done outside the hexCell object because it has
            // to be drawn over hexCells that are drawn after this one

          }
          else{

            if(p.clickRadius>0){

              noStroke();

              fill(CLRS.H_ORANGE_L);

              var w=p.clickRadius/2;

              rotate(radians(p.clickRadius)*3);

              beginShape();

                for(var pt=0; pt<6; pt++){
                  vertex(cos(radians(pt*60))*w,
                         sin(radians(pt*60))*w );
                }

              endShape();

              p.clickRadius-=5;

            }

          }

        };

        function drawLinks(){ //  Delete for release

          if(p.active){

            noStroke();
            strokeWeight(5);

            if(p.top!==null){
              stroke(CLRS.BLACK);
              line(p.top.x, p.top.y, p.x, p.y);
            }
            if(p.bottom!==null){
              stroke(CLRS.RED);
              line(p.bottom.x, p.bottom.y, p.x, p.y);
            }
            if(p.topLeft!==null){
              stroke(CLRS.ORANGE);
              line(p.topLeft.x, p.topLeft.y, p.x, p.y);
            }
            if(p.bottomLeft!==null){
              stroke(CLRS.YELLOW);
              line(p.bottomLeft.x, p.bottomLeft.y, p.x, p.y);
            }
            if(p.topRight!==null){
              stroke(CLRS.GREEN);
              line(p.topRight.x, p.topRight.y, p.x, p.y);
            }
            if(p.bottomRight!==null){
              stroke(CLRS.BLUE);
              line(p.bottomRight.x, p.bottomRight.y, p.x, p.y);
            }

          }

        };

        push();

          translate(this.x, this.y);

          scale(1,-1);

            highlight();  // Commented for Speed
            outerHexagon();
            innerHexagon();
            caption();
            activeCell();

            highlightActive();
            revealAnimation();

        pop();

        // drawLinks(); //  Delete for release

      };
      hexCell.prototype.hitTest=function(x,y){

        var rectHit=rectangleHit(new pnt(this.x+this.points[1].x+x, this.y+this.points[1].y+y),
                                 new pnt(this.x+this.points[2].x+x, this.y+this.points[2].y+y),
                                 new pnt(this.x+this.points[4].x+x, this.y+this.points[4].y+y),
                                 mouseX, mouseY);

        var triHit0=triangleHit( new pnt(this.x+this.points[0].x+x, this.y+this.points[0].y+y),
                                 new pnt(this.x+this.points[1].x+x, this.y+this.points[1].y+y),
                                 new pnt(this.x+this.points[5].x+x, this.y+this.points[5].y+y),
                                 mouseX, mouseY);

        var triHit1=triangleHit( new pnt(this.x+this.points[2].x+x, this.y+this.points[2].y+y),
                                 new pnt(this.x+this.points[3].x+x, this.y+this.points[3].y+y),
                                 new pnt(this.x+this.points[4].x+x, this.y+this.points[4].y+y),
                                 mouseX, mouseY);
        return (rectHit ||
                triHit0 ||
                triHit1);

      };
      hexCell.prototype.outerHitTest=function(x,y){

        return dist(mouseX, mouseY, this.x+x, this.y+y)<this.w/2;

      };
      hexCell.prototype.moved=function(x,y){
      /* Overridden because of the shape */

          if(this.parent.hit){

            if(this.outerHitTest(x,y)){

              this.outerHit=true;

              if(this.hitTest(x,y)){ this.hit=true;
                                     app.focus=this;
                                     this.parent.activeCell=this;
                                     if((this.layout===HEXY_TYPES.BLUE ||
                                         this.layout===HEXY_TYPES.BLACK) &&
                                        this.timer===0){
                                       this.timer=5;
                                     }
                                   }
              else                 { this.hit=false; }

            }
            else{

              this.dirty=false;
              this.timer=0;
              this.outerHit=false;
              this.hit=false;

            }

          }

      };
      hexCell.prototype.clicked=function(){

          if(this.active){

            this.parent.dirty=true;

            if(app.mode===APPMODES.CREATE){

              this.incrementCellLayout();

            }
            else if(app.mode===APPMODES.GAME){

              { // Toggle Halo display

                if(this.layout===HEXY_TYPES.BLUE_REVEALED &&
                   this.text  ===HEXY_TYPES.NUMBER){
                  this.halo=!this.halo;
                }

              }

              { //  Toggle Line Display

                if(this.layout===HEXY_TYPES.DOWN_CENTER ||
                   this.layout===HEXY_TYPES.DOWN_LEFT ||
                   this.layout===HEXY_TYPES.DOWN_RIGHT){
                  this.line=!this.line;
                }

              }

              //  Blue Hexagon
              if(this.layout===HEXY_TYPES.BLUE){

                this.layout=HEXY_TYPES.BLUE_REVEALED;
                this.clickRadius=HEX_SIZE-10;

              } // Black Hexagon
              else if(this.layout===HEXY_TYPES.BLACK){
                app.errors++;
                this.timer=5;
                this.dirty=false;
              }

              if(app.debug){
                // this.execute(this.id);
              }

            }

          }

      };
      hexCell.prototype.rclicked=function(){

          if(this.active){

            this.parent.dirty=true;

            if(app.mode===APPMODES.CREATE){

              this.decrementCellLayout();

            }
            else if(app.mode===APPMODES.GAME){

              if(this.layout!==HEXY_TYPES.BLUE &&
                 this.layout!==HEXY_TYPES.BLACK){
                this.enabled=!this.enabled;
              }

              //  Black Hexagon
              if(this.layout===HEXY_TYPES.BLACK){

                this.layout=HEXY_TYPES.BLACK_REVEALED;
                this.clickRadius=HEX_SIZE-10;

                addAnimation(this.x, this.y, this.w/2, this.h/2, CLRS.H_ORANGE_L);

// print(app.animations.length);

              } // Blue Hexagon
              else if(this.layout===HEXY_TYPES.BLUE){
                app.errors++;
                this.timer=5;
                this.dirty=false;
              }

            }
            /* Should the line automatically be dismissed when the cell is disabled? */
            // this.line=false;

          }

      };
      hexCell.prototype.incrementCellLayout=function(){

        switch(this.layout){

          case HEXY_TYPES.BLANK:          this.layout = HEXY_TYPES.BLACK;
                                          this.text   = HEXY_TYPES.NUMBER;          break;
          case HEXY_TYPES.BLACK:          this.layout = HEXY_TYPES.BLACK_REVEALED;
                                          this.text   = HEXY_TYPES.NUMBER;          break;
          case HEXY_TYPES.BLACK_REVEALED: this.layout = HEXY_TYPES.BLUE;
                                          this.text   = HEXY_TYPES.BLANK;           break;
          case HEXY_TYPES.BLUE:           this.layout = HEXY_TYPES.BLUE_REVEALED;
                                          this.text   = HEXY_TYPES.BLANK;           break;
          case HEXY_TYPES.BLUE_REVEALED:  this.layout = HEXY_TYPES.DOWN_RIGHT;
                                          this.text   = HEXY_TYPES.NUMBER;          break;
          case HEXY_TYPES.DOWN_RIGHT:     this.layout = HEXY_TYPES.DOWN_CENTER;
                                          this.text   = HEXY_TYPES.NUMBER;          break;
          case HEXY_TYPES.DOWN_CENTER:    this.layout = HEXY_TYPES.DOWN_LEFT;
                                          this.text   = HEXY_TYPES.NUMBER;          break;
          case HEXY_TYPES.DOWN_LEFT:      this.layout = HEXY_TYPES.BLANK;
                                          this.text   = HEXY_TYPES.BLANK;           break;

          default:                                                                  break;

        }

        this.recalculate();

      };
      hexCell.prototype.decrementCellLayout=function(){

        switch(this.layout){

          case HEXY_TYPES.BLANK:          this.layout = HEXY_TYPES.DOWN_LEFT;
                                          this.text   = HEXY_TYPES.NUMBER;          break;
          case HEXY_TYPES.BLACK:          this.layout = HEXY_TYPES.BLANK;
                                          this.text   = HEXY_TYPES.BLANK;           break;
          case HEXY_TYPES.BLACK_REVEALED: this.layout = HEXY_TYPES.BLACK;
                                          this.text   = HEXY_TYPES.NUMBER;          break;
          case HEXY_TYPES.BLUE:           this.layout = HEXY_TYPES.BLACK_REVEALED;
                                          this.text   = HEXY_TYPES.NUMBER;          break;
          case HEXY_TYPES.BLUE_REVEALED:  this.layout = HEXY_TYPES.BLUE;
                                          this.text   = HEXY_TYPES.BLANK;           break;
          case HEXY_TYPES.DOWN_RIGHT:     this.layout = HEXY_TYPES.BLUE_REVEALED;
                                          this.text   = HEXY_TYPES.BLANK;           break;
          case HEXY_TYPES.DOWN_CENTER:    this.layout = HEXY_TYPES.DOWN_RIGHT;
                                          this.text   = HEXY_TYPES.NUMBER;          break;
          case HEXY_TYPES.DOWN_LEFT:      this.layout = HEXY_TYPES.DOWN_CENTER;
                                          this.text   = HEXY_TYPES.NUMBER;          break;

          default:                                                                  break;

        }

        this.recalculate();

      };
      hexCell.prototype.recalculate=function(){

        this.parent.update();

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

      /* root control     */
      var rt=new root('root', 5, 5, windowWidth-20, windowHeight-20,
        {border:    true,
         cursor:    CROSS,
         color:     RT});

      app.controls.push(rt);

      /* Zen Animation    */
      // rt.controls.push(new zen(getGUID(), rt, 100, 100, 400, 400, null));

      /* Hex Board         */
      rt.controls.push(new hexBoard('hexBoard'+getGUID(), rt, 5, 5, rt.w-205, rt.h-10,
        {color:    220}));

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
      var telem=new telemetry('telemetry', rt, rt.w-195, 10, 190, rt.h-10,
        {color:     BLACK});

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

  

  function update(){
    
    //  Frame Rate
    if(frameCount%30===0){ app.frameRate=getFrameRate(); }

  };
  
  function draw(){

    background(128);

    forEach(app.controls,'draw');

    update();

  }
  
  /* Mouse Events ============================================================== */
  {

    function mouseClicked(){

      switch(mouseButton){

        case LEFT:    forEach(app.controls, 'clicked' ); break;
        case RIGHT:   forEach(app.controls, 'rclicked'); break;
        // case CENTER:  forEach(app.controls,'cclicked'); break;

        default:     break;

      }

    };
    function dClicked(){

      app.fullscreen=!app.fullscreen;

      fullscreen(app.fullscreen);

    };    
    function mouseMoved() {
    
      app.mouseX=mouseX;
      app.mouseY=mouseY;

      for(var c in app.controls){ app.controls[c].moved(0,0); }
    
    };
    mousePressed=function(){

      switch(mouseButton){

        case LEFT:    app.left   = true;  break;
        case CENTER:  app.center = true;  break;
        case RIGHT:   app.right  = true;  break;

        default:                          break;

      }

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

    };
    function out(){

      forEach(app.controls,'out');

      app.focus=-1;

    };
    function over(){

      forEach(app.controls,'over');

      app.focus=-2;

    };

  }
  
  /* Keyboard Events =========================================================== */
  {

    keyPressed=function(){

      app.keys[keyCode]=true;

        switch(true){

          /*  Function Keys                                                                                           */
          case app.keys[KEYCODES.F1]:         toggleInfo();                             break;  /* F1 - Info          */
          case app.keys[KEYCODES.F2]:         toggleCreate();                           break;  /* F2 - Toggle Create */
          // case app.keys[KEYCODES.F3]:         toggleTelemetry();                        break;  /* F3 - Telemetry     */
          case app.keys[KEYCODES.F4]:         toggleTelemetry();                            break;  /* F4 - Print Layout  */

          // case app.keys[KEYCODES.CONTROL] &&
               // app.keys[KEYCODES.F5]:         clearLayout();                            break;  /* CTRL + F5          */
          // case app.keys[KEYCODES.F6]:         reset();                                  break;  /* F6 - reset layout  */

          // /* Edit                                                                                                     */
          // case app.keys[KEYCODES.SPACE] &&
               // app.keys[KEYCODES.CONTROL]:    decrementCellLayout();                    break;  /* Decrement Layout   */
          // case app.keys[KEYCODES.SPACE]:      incrementCellLayout();                    break;  /* Increment Layout   */

          // case app.keys[KEYCODES.O] &&
               // app.keys[KEYCODES.SHIFT]:      setCellType(HEXY_TYPES.BLACK_REVEALED);   break;  /* Black Revealed   */

          // case app.keys[KEYCODES.O]:          setCellType(HEXY_TYPES.BLACK);            break;  /* Black            */

          // case app.keys[KEYCODES.X] &&
               // app.keys[KEYCODES.SHIFT]:      setCellType(HEXY_TYPES.BLUE_REVEALED);    break;  /* Blue Revealed    */

          // case app.keys[KEYCODES.X]:          setCellType(HEXY_TYPES.BLUE);             break;  /* Blue             */

          // case app.keys[KEYCODES.S] ||
               // app.keys[KEYCODES.s]:          setCellType(HEXY_TYPES.DOWN_CENTER);      break;  /* Down Center      */
          // case app.keys[KEYCODES.L] ||
               // app.keys[KEYCODES.l]:          setCellType(HEXY_TYPES.DOWN_LEFT);        break;  /* Down Left        */
          // case app.keys[KEYCODES.R] ||
               // app.keys[KEYCODES.r]:          setCellType(HEXY_TYPES.DOWN_RIGHT);       break;  /* Down Right       */

          // case app.keys[KEYCODES.B]:          setCellType(HEXY_TYPES.BLANK);            break;  /* Blank            */

          // case app.keys[KEYCODES.T] ||
               // app.keys[KEYCODES.t]:          setCellType(HEXY_TYPES.NUMBER);           break;  /* Number           */

          // case app.keys[KEYCODES.C]:          setCellType(HEXY_TYPES.CONSECUTIVE);      break;  /* Consecutive      */
          // case app.keys[KEYCODES.N]:          setCellType(HEXY_TYPES.NOT_CONSECUTIVE);  break;  /* Non-Consecutive  */

          // /*  Navigation                                                                                            */
          // case app.keys[KEYCODES.A]:          decrementPuzzle();                        break;  /* A                */
          // case app.keys[KEYCODES.D]:          incrementPuzzle();                        break;  /* D                */

          // case app.keys[KEYCODES.UP]:         up();                                     break;  /* Up               */
          // case app.keys[KEYCODES.DOWN]:       down();                                   break;  /* Down             */

          // case app.keys[KEYCODES.RIGHT] &&
               // app.keys[KEYCODES.CONTROL]:    downRight();                              break;  /* Down Right       */
          // case app.keys[KEYCODES.RIGHT]:      upRight();                                break;  /* Up Right         */
          // case app.keys[KEYCODES.LEFT] &&
               // app.keys[KEYCODES.CONTROL]:    downLeft();                               break;  /* Down Left        */
          // case app.keys[KEYCODES.LEFT]:       upLeft();                                 break;  /* Up Left          */

          // /* Figure out how to use this                                                                             */
          // case app.keys[KEYCODES.CODED]:                                                break;
          
          default:                                                                      break;
        }

// print("pressed " + key + " " + keyCode);

    };
    keyReleased=function(){ app.keys[keyCode]=false;                          };

  }
  
  function windowResized(){

    resizeCanvas(windowWidth-10, windowHeight-10);

    forEach(app.controls,'resized');
print('resized');
  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /**
  
  1729 = 9^3 + 10^3 = 12^3 + 1^3
  
  sketch.js
  
  */
