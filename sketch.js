/**  Whitelist

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
+docs.oracle.com
+www.mathopenref.com
+p5js.org
+alpha.editor.p5js.org
+piratefsh.github.io/2017/06/02/recursive-hexagon-patterns.html
+forum.processing.org
+shapesmania.com/vasarely

*/

/*

  TO DO:
    
    - compete against the genetic algorithm
    - compete against the AI
    
    - run button
    - reset button
    - music button
    - menu button
    - timer/stop watch
    
    - level indicator
    - current score indicator

      - percentage complete
      - integer value of completed
      - integer value of out of place
    
    - grid complete animation (exploding triangles?)
    
    - maintain percentage complete calculation

    - rotation of each hexcell
    - rotation of each ring

    - color coded outer hexagon to indicate patterns

    - AI puzzle solving

    - puzzle completion animations

    - move object

    - Undo/Redo stack

        - ctrl+z
        - ctrl+y

  TO DONE:

    - initial color and current color
      
    - active cell rollover edge of grid (top/bottom - right/left, etc)

    - reference to the center hexcell
  
    - start drag x/y

    - determine how to pass a color as a parameter



  Research:

    print(getURLParams()); - test when this goes live

  Cursors:

    ARROW, CROSS, HAND, MOVE, TEXT, or WAIT

**/

{
    
  { // Puzzles ------------------------------------------------------------------

    var PUZZLES=[

                  [ //  Layout 1-1
      //             1  2  3
                    [0, 1, 0],  //  1
                    [6, 7, 2],  //  2
                    [5, 4, 3],  //  3
                  ],
                  [ //  Layout 1-2
      //             1  2  3  4  5
                    [0, 6, 1, 1, 0],  //  1
                    [6, 6, 1, 2, 2],  //  2
                    [5, 5, 7, 3, 2],  //  3
                    [5, 4, 4, 3, 3],  //  4
                    [0, 0, 4, 0, 0]   //  5
                  ],
                  [ //  Layout 1-3
      //             1  2  3  4  5  6  7
                    [0, 0, 0, 1, 0, 0, 0],  //  1
                    [0, 6, 6, 1, 1, 1, 0],  //  2
                    [6, 6, 6, 1, 1, 2, 2],  //  3
                    [5, 5, 6, 7, 2, 2, 2],  //  4
                    [5, 5, 5, 4, 3, 3, 2],  //  5
                    [5, 4, 4, 4, 3, 3, 3],  //  6
                    [0, 0, 4, 4, 3, 0, 0]   //  7
                  ],
                  [ //  Layout 1-4
      //             1  2  3  4  5  6  7  8  9
                    [0, 0, 0, 6, 1, 1, 0, 0, 0],  //  1
                    [0, 6, 6, 6, 1, 1, 1, 1, 0],  //  2
                    [6, 6, 6, 6, 1, 1, 1, 2, 2],  //  3
                    [5, 5, 6, 6, 1, 2, 2, 2, 2],  //  4
                    [5, 5, 5, 5, 7, 3, 2, 2, 2],  //  5
                    [5, 5, 5, 4, 4, 3, 3, 3, 2],  //  6
                    [5, 4, 4, 4, 4, 3, 3, 3, 3],  //  7
                    [0, 0, 4, 4, 4, 3, 3, 0, 0],  //  8
                    [0, 0, 0, 0, 4, 0, 0, 0, 0]   //  9
                  ],
                  [ //  Layout 1-5
      //             1  2  3  4  5  6  7  8  9 10 11
                    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],  //  1
                    [0, 0, 0, 6, 6, 1, 1, 1, 0, 0, 0],  //  2
                    [0, 6, 6, 6, 6, 1, 1, 1, 1, 1, 0],  //  3
                    [6, 6, 6, 6, 6, 1, 1, 1, 1, 2, 2],  //  4
                    [5, 5, 6, 6, 6, 1, 1, 2, 2, 2, 2],  //  5
                    [5, 5, 5, 5, 6, 7, 2, 2, 2, 2, 2],  //  6
                    [5, 5, 5, 5, 5, 4, 3, 3, 2, 2, 2],  //  7
                    [5, 5, 5, 4, 4, 4, 3, 3, 3, 3, 2],  //  8
                    [5, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3],  //  9
                    [0, 0, 4, 4, 4, 4, 3, 3, 3, 0, 0],  // 10
                    [0, 0, 0, 0, 4, 4, 3, 0, 0, 0, 0]   // 11
                  ],
                  [ //  Layout 1-6
      //             1  2  3  4  5  6  7  8  9 10 11 12 13
                    [0, 0, 0, 0, 0, 6, 1, 1, 0, 0, 0, 0, 0],  //  1
                    [0, 0, 0, 6, 6, 6, 1, 1, 1, 1, 0, 0, 0],  //  2
                    [0, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 0],  //  3
                    [6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 2, 2],  //  4
                    [5, 5, 6, 6, 6, 6, 1, 1, 1, 2, 2, 2, 2],  //  5
                    [5, 5, 5, 5, 6, 6, 1, 2, 2, 2, 2, 2, 2],  //  6
                    [5, 5, 5, 5, 5, 5, 7, 3, 2, 2, 2, 2, 2],  //  7
                    [5, 5, 5, 5, 5, 4, 4, 3, 3, 3, 2, 2, 2],  //  8
                    [5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 3, 2],  //  9
                    [5, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3],  // 10
                    [0, 0, 4, 4, 4, 4, 4, 3, 3, 3, 3, 0, 0],  // 11
                    [0, 0, 0, 0, 4, 4, 4, 3, 3, 0, 0, 0, 0],  // 12
                    [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0]   // 13
                  ]

                ]

  }

  {  // CONSTANTS ================================================================================

    new p5();

    var myFont;

    // Colours ------------------------------------------------------------------
    {
      var RT            = [212,212,212,255];  var RT          = [212,212,212,255];
      var BG            = [255,204,  0,255];

      var H_SHADOW      = [209,209,209,255];

      var H_BLUE        = [ 20,156,216,255];  var H_BLUE_L    = [  5,164,235,255];
      var H_BLACK       = [ 44, 47, 49,255];  var H_BLACK_L   = [ 62, 62, 62,255];
      var H_ORANGE      = [255,159,  0,255];  var H_ORANGE_L  = [255,175, 41,255];

      var GRAY          = [128,128,128,255];

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

      var K_RED         = [170, 29, 29,255];
      var K_ORANGE      = [238,136, 15,255];
      var K_YELLOW      = [238,214, 15,255];
      var K_GREEN       = [158,182, 58,255];
      var K_BLUE        = [ 29, 86,170,255];
      var K_PURPLE      = [127,  0,255,255];

      var BROWN         = [155,145,135,255];

      var RED           = [170, 29, 29,255];  var ORANGE      = [238,136, 15,255];
      var YELLOW        = [238,214, 15,255];  var GREEN       = [158,182, 58,255];
      var BLUE          = [ 29, 86,170,255];  var PURPLE      = [127,  0,255,255];

      var BLANK   = 0;
      var RED0    = 1;
      var ORANGE0 = 2;
      var YELLOW0 = 3;
      var GREEN0  = 4;
      var BLUE0   = 5;
      var PURPLE0 = 6;
      var BLACK0  = 7;

      // const RED           = [255,  0,  0,255]; const REDORANGE    = [255, 81,  0,255];
      // const ORANGE        = [255,127,  0,255]; const YELLOWORANGE = [255,190,  0,255];
      // const YELLOW        = [255,255,  0,255]; const YELLOWGREEN  = [192,255,  0,255];
      // const GREEN         = [  0,255,  0,255]; const BLUEGREEN    = [  0,127,127,255];
      // const BLUE          = [  0,  0,255,255]; const BLUEVIOLET   = [ 92,  0,255,255];
      // var VIOLET        = [127,  0,255,255]; var REDVIOLET    = [191,  0,127,255];
    }
    
    // --------------------------------------------------------------------------

    var KeyCodes={

      //  Upper Case
      A:              65,
      B:              66,
      C:              67,
      D:              68,
      E:              69,
      L:              76,
      N:              78,
      O:              79,
      P:              80,
      Q:              81,
      R:              82,
      S:              83,
      T:              84,
      W:              87,
      X:              88,
      Z:              90,

      // Function Keys
      F1:             112,
      F2:             113,
      F3:             114,
      F4:             115,
      
      F5:             116,
      F6:             117,
      F7:             118,
      F8:             119,
      
      F9:             120,
      F10:            121,
      F11:            122,
      F12:            123,
      
      // Lower Case
      // a:              97,
      // b:              98,
      // c:              99,
      // d:             100,
      // e:             101,
      // l:             108,
      // n:             110,
      // o:             111,
      // q:             113,
      // r:             114,
      // s:             115,
      // t:             116,
      // w:             119,
      // x:             120,
      // y:             121,
      // z:             122,
      
      // Function Keys
      
      
      // Special Keys
      DELETE:        127,
      BACKSPACE:       8,
      TAB:             9,
      ENTER:          10,
      RETURN:         13,
      ESC:            27,
      CODED:      0xffff,
      SHIFT:          16,
      CONTROL:        17,
      ALT:            18,
      CAPSLK:         20,
      SPACE:          32,
      PGUP:           33,
      PGDN:           34,
      END:            35,
      HOME:           36,
      LEFT:           37,
      UP:             38,
      RIGHT:          39,
      DOWN:           40,
      PLUS:           43,
      MINUS:          45,
      PERIOD:         46,
      EQUALS:         61,

      NUMLK:         144,
      META:          157,
      INSERT:        155

    };
    
    var DRAG_DIRECTIONS={

      NONE:         0,
      UPDOWN:       1,
      BACKWARD:     2,
      FORWARD:      3

    };

    var DIRECTIONS={

      NONE:       0,
      UP:         1,
      DOWN:       2,
      UPRIGHT:    3,
      UPLEFT:     4,
      DOWNRIGHT:  5,
      DOWNLEFT:   6

    };

  }

  function preload(){

    // myFont = loadFont('http://fonts.googleapis.com/css?family=Walter+Turncoat&.css');

  }

  var cnv;

  function setup(){

    //  Set a global reference to the canvas
    cnv=createCanvas(windowWidth-10, windowHeight-10);

    //  Settings
    frameRate(70);

    noCursor();

    textFont('sans-serif',12);

    cursor(WAIT);

    randomSeed(millis());

    strokeCap(SQUARE);
    strokeJoin(MITER);

    angleMode='radians';

    //  Bind events to functions
    // cnv.mouseDragged(mDragged);
    // cnv.mouseMoved(moved);
    // cnv.mousePressed(pressed);
    // cnv.mouseClicked(clicked);
    // cnv.doubleClicked(dClicked);
    // cnv.mouseReleased(released);
    // cnv.mouseOut(out);
    // cnv.mouseOver(over);

  }

  function application(){

    /* Platform Constants  -------------------- */
    {

      this.dirty          = false;              //  Has a reset occurred

      this.debug          = true;               //  Mode that displays enhanced debugging tools

      this.frameRate      = 0;                  //  Refresh speed
      
      this.running        = false;              //  Currently solving the puzzle
      this.progress       = 0;                  //  Puzzle is this % solved
      
      this.mouseX         = 0;                  //  Current mouseX location
      this.mouseY         = 0;                  //  Current mouseY location

      this.left           = false;              //  Is the left   mouse button pressed
      this.right          = false;              //  Is the right  mouse button pressed
      this.center         = false;              //  Is the center mouse button pressed

      this.dragStartX     = 0;
      this.dragStartY     = 0;

      this.dragging       = false;              //  Is the mouse cursor moving and the left button pressed?

      this.dragDirection  = DRAG_DIRECTIONS.NONE;

      this.focus          = null;               //  The control with focus

      this.controls       = [];                 //  Collection of controls in the app
      this.controlCount   = 0;

      this.keys           = [];                 //  Array holding the value of all KeyCodes

      this.fullscreen     = false;              //  Is the display set to take up the entire screen ie. No Chrome

      this.info           = 0;                  //  Is the info frame displayed
      this.telemetry      = false;              //  Is telemetry visible

    }

    /* Hexy Specific       ------------------ */
    {

      this.mode           = APPMODES.GAME;      //

      this.score          = 0;                  //  The number of total hexes acquired

      this.levelScores    = [   3,  4,  5,  5,  5,  6,  6,
                              6,  8,  8,  9, 10, 10, 10,
                             14, 17, 44, 44, 44, 44, 44,
                            110,110,110,110,110,110,110,
                            200,200,200,200,200,200,220,
                            328,328,328,328,328,328,328
                          ];

      this.levelEntry     = {
                            0:  0,   7: 22,  14:  48,  21: 120,  28: 220,  35: 328,
                            1:  0,   8: 22,  15:  48,  22: 120,  29: 220,  36: 328,
                            2:  0,   9: 22,  16:  48,  23: 120,  30: 220,  37: 328,
                            3:  0,  10: 22,  17:  48,  24: 120,  31: 220,  38: 328,
                            4:  0,  11: 22,  18:  48,  25: 120,  32: 220,  39: 328,
                            5:  0,  12: 22,  19:  48,  26: 120,  33: 220,  40: 328,
                            6: 18,  13: 44,  20: 110,  27: 200,  34: 240,  41: 328
                          };

      this.levelText      = ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7',
                         '2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7',
                         '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7',
                         '4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7',
                         '5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7',
                         '6-1', '6-2', '6-3', '6-4', '6-5', '6-6', '6-7'
                        ];

      this.hexboard;                          //  Set in the hexboard control initialization
      this.puzzleComplete;                    //  Set in the puzzleComplete control initialization
      this.puzzleSelect;                      //  Set in the puzzleComplete control initialization
      this.transition;                        //  Set in the transition control initialization

      this.menu;
      this.clock;
      this.music;
      this.reset;
      this.scoreboard;

      this.puzzle         = 4;                  //  Index of the current puzzle layout

      this.remaining      = 0;                  //  How many blue cells need to be uncovered
      this.covered        = 0;                  //  How many black cells need to be uncovered
      this.errors         = 0;                  //  How many mistaken clicks occurred

      this.musicOn        = true;
      this.level          = 0;                  //  Levels 0 - 42 ( 7 groups of 6 = 42 total)

      this.finished       = false;

      this.animations     = [];

      this.dragCells      = [];                 // Group of hexCells currently being dragged

    }

  };

  var app=new application();

  /* Utility Functions ===================================================== */
  {

    /** Misc            ---------------------------------------------------- */
    {

      var controlCount=-1;

      function getGUID()            { controlCount++; return controlCount;                            };

      function getPuzzleNumber()    { return app.levelText[app.puzzle/2];                             };

      // function iRandom(n)           { return round(random(n));                                         };

      function getColor(clr, alpha) { return color(red(clr), green(clr), blue(clr), alpha/100*255);   };

      function getInfo()            { return app.info;                                                };
      function toggleInfo()         { app.info=!app.info;                                             };

      function getTelemetry()       { return app.telemetry;                                           };
      function toggleTelemetry()    { app.telemetry=!app.telemetry;                                   };

      function toggleCreate()       {};

      function getMusic()           { return app.musicOn;                                             };
      function setMusic(b)          { return app.musicOn=b;                                           };

      function getScore()           { return app.score;                                               };
      function setScore(b)          { return app.score=b;                                             };

      function clickTest(n)         { print('click: ' + n);                                           };

      function toggleRunning()      { app.running=!app.running;                                       };

    }

    function setDisplacedCell(){

      do{

        var row = round(random(app.hexboard.controls.length-1   ));
        var col = round(random(app.hexboard.controls[0].length-1));

        app.hexboard.activeCell=app.hexboard.controls[row][col];

      } while(app.hexboard.activeCell.layout===BLANK &&
              app.hexboard.activeCell.layout!==BLACK0);

    };    
    function setActiveCell(){

      do{

        var row = round(random(app.hexboard.controls.length-1   ));
        var col = round(random(app.hexboard.controls[0].length-1));

        app.hexboard.activeCell=app.hexboard.controls[row][col];

      } while(app.hexboard.activeCell.layout===BLANK);

    };
    function move(row, col, direction){

      this.row       = row;
      this.col       = col;

      this.direction = direction;

      var reverse = -1;

      switch(this.direction){

        case DIRECTIONS.UP:        reverse = colDown;       break;
        case DIRECTIONS.DOWN:      reverse = colUp;         break;
        case DIRECTIONS.DOWNRIGHT: reverse = colUpLeft;     break;
        case DIRECTIONS.DOWNLEFT:  reverse = colUpRight;    break;
        case DIRECTIONS.UPRIGHT:   reverse = colDownLeft;   break;
        case DIRECTIONS.UPLEFT:    reverse = colDownRight;  break;

        default:                                            break;

      }

      this.reverse = reverse;

    };
    function randomMove(){

      var rnum=round(random(0,5));

      // setActiveCell();

      switch(rnum){

        case 0:   colUp();        app.hexboard.addMove(DIRECTIONS.UP);        break;
        case 1:   colDown();      app.hexboard.addMove(DIRECTIONS.DOWN);      break;
        case 2:   colUpLeft();    app.hexboard.addMove(DIRECTIONS.UPLEFT);    break;
        case 3:   colUpRight();   app.hexboard.addMove(DIRECTIONS.UPRIGHT);   break;
        case 4:   colDownLeft();  app.hexboard.addMove(DIRECTIONS.DOWNLEFT);  break;
        case 5:   colDownRight(); app.hexboard.addMove(DIRECTIONS.DOWNRIGHT); break;

        default:  print(rnum);    break;

      }

    };
    function randomize()             {

      var total=pow(app.hexboard.layout.length,2)*2;
      
      for(var n=0; n<total; n++){        
        randomMove();
        setActiveCell();
      }

      app.hexboard.totalMoves=0;
      app.hexboard.moves=[];

    };

    function reset(){

      app.hexboard.reset();

    };

  }

    /* Navigation  =========================================================== */
    {

      function incrementPuzzle()    {

          app.puzzle++;

          if(app.puzzle>PUZZLES.length-1){  app.puzzle=0; }

          app.puzzle=constrain(app.puzzle, 0, PUZZLES.length-1);

          reset();
  // throw(23);
      };
      function decrementPuzzle()    {

        app.puzzle--;

        if(app.puzzle<0){ app.puzzle=PUZZLES.length-1; }

        app.puzzle=constrain(app.puzzle, 0, PUZZLES.length-1);

        reset();

      };

      function drawDragColumn(){
        
        fill(BLUE);
        stroke(GREEN);
        
        for(var h in app.hexboard.selected){
          
          if(app.hexboard.selected[h].dragging){
            
            ellipse(app.hexboard.selected[h].x,
                    app.hexboard.selected[h].y,
                    30,30);
                    
          }
                  
// print(app.hexboard.selected[h].y);
// print('drawDragColumn' +" | " + app.hexboard.selected.length);

        }

      };

      // Dragging ----------
      function setDragColumn()      {

        var cell=app.hexboard.activeCell;

        while(cell.top!==null &&
              cell.top.layout!==BLANK){

          cell=cell.top;

        }

        while(cell.bottom!==null &&
              cell.bottom.layout!==BLANK){

          app.hexboard.selected.push(cell);
          cell.dragging=true;
          cell=cell.bottom;

        }

        app.hexboard.selected.push(cell);
        cell.dragging=true;

      };
      function setDragBackward()    {

        var cell=app.hexboard.activeCell;

        while(cell.topRight!==null &&
              cell.topRight.layout!==BLANK){

          cell=cell.topRight;

        }

        while(cell.bottomLeft!==null &&
              cell.bottomLeft.layout!==BLANK){

          app.hexboard.selected.push(cell);
          cell.dragging=true;
          cell=cell.bottomLeft;

        }

        app.hexboard.selected.push(cell);
        cell.dragging=true;

      };
      function setDragForward()     {

        var cell=app.hexboard.activeCell;

        while(cell.topLeft!==null &&
              cell.topLeft.layout!==BLANK){

          cell=cell.topLeft;

        }

        while(cell.bottomRight!==null &&
              cell.bottomRight.layout!==BLANK){

          app.hexboard.selected.push(cell);
          cell.dragging=true;
          cell=cell.bottomRight;

        }

        app.hexboard.selected.push(cell);
        cell.dragging=true;

      };

      // Move Columns ----------
      function colUp()              {

        var cell=app.hexboard.activeCell;

        while(cell.top!==null &&
              cell.top.color!==BLANK){

          cell=cell.top;

        }

        var topColor=cell.color;

        while(cell.bottom!==null &&
              cell.bottom.color!==BLANK){

          cell.color=cell.bottom.color;
          cell=cell.bottom;

        }

        cell.color=topColor;
        
        app.hexboard.totalMoves++;
        
      };
      function colDown()            {

        var cell=app.hexboard.activeCell;

        while(cell.bottom!==null &&
              cell.bottom.color!==BLANK){

          cell=cell.bottom;

        }

        var bottomcolor=cell.color;

        while(cell.top!==null &&
              cell.top.color!==BLANK){

          cell.color=cell.top.color;
          cell=cell.top;

        }

        cell.color=bottomcolor;

        app.hexboard.totalMoves++;
        
      };

      function colUpRight()         {

        var cell=app.hexboard.activeCell;

        while(cell.topRight!==null &&
              cell.topRight.color!==BLANK){

          cell=cell.topRight;

        }

        var topcolor=cell.color;

        while(cell.bottomLeft!==null &&
              cell.bottomLeft.color!==BLANK){

          cell.color=cell.bottomLeft.color;
          cell=cell.bottomLeft;

        }

        cell.color=topcolor;

        app.hexboard.totalMoves++;
        
      };
      function colUpLeft()          {

        var cell=app.hexboard.activeCell;

        while(cell.topLeft!==null &&
              cell.topLeft.color!==BLANK){

          cell=cell.topLeft;

        }

        var topcolor=cell.color;

        while(cell.bottomRight!==null &&
              cell.bottomRight.color!==BLANK){

          cell.color=cell.bottomRight.color;
          cell=cell.bottomRight;

        }

        cell.color=topcolor;

        app.hexboard.totalMoves++;
        
      };

      function colDownRight()       {

        var cell=app.hexboard.activeCell;

        while(cell.bottomRight!==null &&
              cell.bottomRight.color!==BLANK){

          cell=cell.bottomRight;

        }

        var bottomcolor=cell.color;

        while(cell.topLeft!==null &&
              cell.topLeft.color!==BLANK){

          cell.color=cell.topLeft.color;
          cell=cell.topLeft;

        }

        cell.color=bottomcolor;

        app.hexboard.totalMoves++;
        
      };
      function colDownLeft()        {

        var cell=app.hexboard.activeCell;

        while(cell.bottomLeft!==null &&
              cell.bottomLeft.color!==BLANK){

          cell=cell.bottomLeft;

        }

        var bottomcolor=cell.color;

        while(cell.topRight!==null &&
              cell.topRight.color!==BLANK){

          cell.color=cell.topRight.color;
          cell=cell.topRight;

        }

        cell.color=bottomcolor;

        app.hexboard.totalMoves++;
        
      };


      // Move Active Cell ----------
      function up()                 {

        if(app.hexboard.activeCell.top!==null &&
           app.hexboard.activeCell.top.layout!==0){

          app.hexboard.activeCell = app.hexboard.activeCell.top;

        }
        else{

          while(app.hexboard.activeCell.bottom!==null &&
                app.hexboard.activeCell.bottom.layout!==0){
             
            app.hexboard.activeCell = app.hexboard.activeCell.bottom;
          
          }

        }

      };
      function down()               {

        if(app.hexboard.activeCell.bottom!==null &&
           app.hexboard.activeCell.bottom.layout!==0){

          app.hexboard.activeCell = app.hexboard.activeCell.bottom;

        }
        else{

          while(app.hexboard.activeCell.top!==null &&
                app.hexboard.activeCell.top.layout!==0){
             
            app.hexboard.activeCell = app.hexboard.activeCell.top;
          
          }

        }

      };

      function upRight()            {

        if(app.hexboard.activeCell.topRight!==null &&
           app.hexboard.activeCell.topRight.layout!==0){

          app.hexboard.activeCell = app.hexboard.activeCell.topRight;

        }
        else{

          while(app.hexboard.activeCell.bottomLeft!==null &&
                app.hexboard.activeCell.bottomLeft.layout!==0){
             
            app.hexboard.activeCell = app.hexboard.activeCell.bottomLeft;
          
          }

        }

      };
      function upLeft()             {

        if(app.hexboard.activeCell.topLeft!==null &&
           app.hexboard.activeCell.topLeft.layout!==0){

          app.hexboard.activeCell = app.hexboard.activeCell.topLeft;

        }
        else{

          while(app.hexboard.activeCell.bottomRight!==null &&
                app.hexboard.activeCell.bottomRight.layout!==0){
             
            app.hexboard.activeCell = app.hexboard.activeCell.bottomRight;
          
          }

        }
        
      };

      function downRight()          {

        if(app.hexboard.activeCell.bottomRight!==null &&
           app.hexboard.activeCell.bottomRight.layout!==0){

          app.hexboard.activeCell = app.hexboard.activeCell.bottomRight;

        }
        else{

          while(app.hexboard.activeCell.topLeft!==null &&
                app.hexboard.activeCell.topLeft.layout!==0){
             
            app.hexboard.activeCell = app.hexboard.activeCell.topLeft;
          
          }

        }

      };
      function downLeft()           {

        if(app.hexboard.activeCell.bottomLeft!==null &&
           app.hexboard.activeCell.bottomLeft.layout!==0){

          app.hexboard.activeCell = app.hexboard.activeCell.bottomLeft;

        }
        else{

          while(app.hexboard.activeCell.topRight!==null &&
                app.hexboard.activeCell.topRight.layout!==0){

            app.hexboard.activeCell = app.hexboard.activeCell.topRight;

          }

        }

      };

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
      control.prototype.dragged  = function(){ };
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
      root.prototype.draw        =function(){

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
      root.prototype.moved       =function(x,y){
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
      root.prototype.resized     =function(){

        this.w = windowWidth -20;
        this.h = windowHeight-20;

        forEach(this.controls,'resized');

      };
      root.prototype.dragged     = function(){

        forEach(this.controls,'dragged');

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

              rect(p.offset+10,  10, p.w-20, 385, 3);

            textAlign(LEFT,TOP);
            textSize(10);
            textLeading(12);

            fill(getColor(TEAL_2,75));

              text('\n'               + 'Cursor Coordinates' +
                   '\n\n\n\n'         + 'Mouse Buttons'      +
                   '\n\n\n\n\n\n\n\n' + 'Keys'               +
                   '\n\n\n\n\n'       + 'Environment',
                   col0, row0);

            fill(getColor(WHITE,75));

              text('\n\n'   + 'x:'              +
                   '\n'     + 'y:'              +
                   '\n\n\n' + 'Left:'           +
                   '\n'     + 'Right:'          +
                   '\n'     + 'Center:'         +
                   '\n\n'   + 'Dragging:'       +
                   '\n'     + 'Drag Direction:' +
                   '\n\n\n' + 'Control:'        +
                   '\n'     + 'Alt:'            +
                   '\n'     + 'Shift:'          +
                   '\n\n\n' + 'Canvas Width:'   +
                   '\n'     + 'Canvas Height:'  +
                   '\n\n'   + 'Window Width:'   +
                   '\n'     + 'Window Height:'  +
                   '\n\n'   + 'Display Width:'  +
                   '\n'     + 'Display Height:' +
                   '\n\n'   + 'Focused:'        +
                   '\n\n'   + 'Frame Count:'    +
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
                   '\n'     + app.dragDirection          +
                   '\n\n\n' + app.keys[KeyCodes.CONTROL] +
                   '\n'     + app.keys[KeyCodes.ALT]     +
                   '\n'     + app.keys[KeyCodes.SHIFT]   +
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

            var top=405;

            fill(getColor(p.color,50));

              rect(p.offset+10,  top, p.w-20, p.h-415, 3);

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

              // if(app.focus!==null){ id=app.focus.id; }

              if(app.hexboard.activeCell!==null){ id=app.hexboard.activeCell.id; }

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

    var completePercent = 0;

    /** hexboard        -------------------------------------------------- */
    {

    var HEX_SIZE=0;

      function hexboard(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        /* ------------------------------------------------- */
        this.color              = props.color;

        /* ------------------------------------------------- */
        // this.radius         = 0;

        this.activeCell         = null;

        this.layout             = [];     //  Array of the layout of hexcells
        this.rings              = [];     //  Array of centered hexCell rings

        this.selected           = [];     //  Array of currently selected hexcells

        this.moves              = [];     //  Array of moves completed

        this.dirty              = false;  //  Has the hexboard been clicked yet?

        app.hexboard            = this;   //  Set a global hexboard reference

        this.center             = 0;

        this.count              = 0;      //  Total hexcells in grid
        this.totalMoves         = 0;

        this.gridCount          = 0;      //  Total hexcells in pattern

        this.percentageComplete = 0;      //  Percentage in the correct position

        this.startX             = 0;      //  x-coordinate of drag start
        this.startY             = 0;      //  y-coordinate of drag start

        this.deltaX             = 0;      //  x-coordinate drag offset
        this.deltaY             = 0;      //  y-coordinate drag offset

        this.calcRadius();
        this.reset();

      };
      hexboard.prototype=Object.create(control.prototype);
      hexboard.prototype.reset        = function(){

        var p=this;                   //  Set a reference to the hexboard control

        this.controls   = [];         //  Clear the controls array
        this.moves      = [];

        this.totalMoves = 0;
        this.activeCell = null;       //  Clear the active hexCell
        this.count      = 0;
        this.gridCount  = 0;
        this.totalMoves = 0;
        
        this.layout     = PUZZLES[app.puzzle];
        // this.text       = PUZZLES[app.puzzle+1];

        // this.level      = app.levelText[app.level];

        var rowArray    = [];  // Temporary 1-D array to hold each successive row before adding
                               // to the corresponding 2-D array
        var n=0;               // Iterator

        function setCenter(){

          var row = floor(p.layout.length/2);
          var col = floor(p.layout[0].length/2);

          p.center=p.controls[row][col];

          print(row + ", " + col);

        };
        function setRings(){

          p.rings=[];

          // ring #1
          var r=0;

          var cell=p.center;

          for(var n=0; n<r; n++){

            ring[n].push(cell.top);
            ring[n].push(cell.topLeft);
            ring[n].push(cell.bottomLeft);
            ring[n].push(cell.bottom);
            ring[n].push(cell.bottomRight);
            ring[n].push(cell.topRight);

          }
          
        };

        function load(){

          var sz=p.radius/p.layout.length;

          var n = 0;

          var x = 0;
          var y = 0;

          var layout = 0;
          
          var xMargin = p.w/2-sz*(p.layout[0].length/2-0.5)*0.75;
          var yMargin = p.h/2-sz*(p.layout.length/2-0.5)*cos(PI/6);

          if(p.layout.length%2===0){
            yMargin = p.h/2-sz*(p.layout.length/2-0.5)*cos(PI/6);
          }

          var xOffset = 0;
          var yOffset = 0;

          yOffset = sz*cos(PI/6);

          for(var row in p.layout){
            for(var col in p.layout[row]){

              var curs = HAND;

              x = xMargin + col*sz*0.75;
              y = yMargin + row*yOffset;

              if(col%2===0){
                y-=yOffset/2;
              }
              
              layout=p.layout[row][col];
              
              if(layout===0){ curs=ARROW;    } // Blank hexcell 
              else          { p.gridCount++; } // Colored hexcell

              rowArray.push(new hexCell('hexcell-'+getGUID(), p, x, y, sz, sz,
                {row:       row,
                 col:       col,
                 layout:    layout,
                 text:      row + ', ' + col,
                 cursor:    curs}));

               n++;

            }

            p.controls.push(rowArray);

            rowArray=[];

          }

          p.count=n;
          app.controlCount=n+3;

        };

        load();
        setCenter();
        // setRings();
        
        this.update();
        
        app.hexboard.activeCell=app.hexboard.center;

        app.finished=false;
        this.dirty=false;

      };
      hexboard.prototype.draw         = function(){

        // if(this.x!==0){
          // this.timer=0;
          // return;
        // }

          var p=this;

          this.active=this.hit &&
                      app.focus===this;

          if(this.active){ cursor(this.cursor); }

          function drawHexagon(r, x, y){

            beginShape();

              for(var n=0; n<6; n++){

                vertex(x + r * cos(PI/3 * n),
                       y + r * sin(PI/3 * n));

              };

            endShape(CLOSE);

          };
          function border()            {

            fill(p.color);
            stroke(getColor(H_BLUE,25));
            strokeWeight(0.5);

              rect( 0, 0, p.w, p.h, 5);

            // textAlign(CENTER,CENTER);
            // textSize(height/20);

            // push();

              // translate(32,height/2);
              // rotate(PI/2);

              // noStroke();
              // fill(212);

                // text('Level ' + app.levelText[app.puzzle/2], 3,-3);

              // fill(202);

                // text('Level ' + app.levelText[app.puzzle/2], 0, 0);

            pop();

          };
          function board()             {

            var r = p.radius;

            push();

              translate(p.w/2,p.h/2);
              // rotate(PI/6);

                fill(getColor(164,20));
                noStroke();

                  // ellipse(0, 0, r, r);

                fill(getColor(BLACK,10));

                  drawHexagon(r/2,0,0);

            pop();

          };
          function controls()          {

            var ctrls=p.controls;

            for(var r in ctrls){
              for(var c in ctrls[r]){

                ctrls[r][c].draw();

              }
            }

          };

          push();

            translate(this.x, this.y);

              border();
              board();
              controls();

    this.calcComplete();

    textSize(12);
    textAlign(LEFT,CENTER);
    fill(BLACK);
    text(this.percentageComplete, 50,50);

    text(this.count,      50,  70);
    text(this.gridCount,  50,  90);
    text(this.totalMoves, 50, 110);
    
    text(this.moves.length, 50, 130);
          
          var limit=ceil(frameCount/1000);

          // if(limit<7){ limit=7; }
          
          if(this.percentageComplete==1){
            
            textSize(128);
            textAlign(CENTER,CENTER);
            fill(RED);
            text('COMPLETE', this.w/2, this.h/2);

          }
          else{
            
            if(app.running){

print(limit);
            
              app.progress=this.percentageComplete;
              
              for(var n=0; n<limit; n++){ randomMove(); }
            
              this.calcComplete();
              
              if(this.percentageComplete>app.progress){
                
                app.progress=this.percentageComplete;
                
              }
              else{
                
                for(var n=0; n<limit; n++){ this.undo(); }

                // if(this.percentageComplete>0.6){
                  // setDisplacedCell();
                // }
                // else{                
                  setActiveCell();
                // }

              }

            }
          
          }
          
          // drawDragColumn();
          
          pop();

      };
      hexboard.prototype.hitTest  = function (x,y){

        var retVal=false;

        if(dist(mouseX,mouseY,(this.x+x),(this.y+y))<this.w){
          retVal=true;
        }

        return retVal;

      };      
      hexboard.prototype.moved        = function(x,y){

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
      hexboard.prototype.clicked      = function(){

        var ctrls=this.controls;

        for(var r in ctrls){
          for(var c in ctrls[r]){

            ctrls[r][c].clicked();

          }
        }

      };
      hexboard.prototype.rclicked     = function(){

        var ctrls=this.controls;

        for(var r in ctrls){
          for(var c in ctrls[r]){

            ctrls[r][c].rclicked();

          }
        }

      };
      hexboard.prototype.out          = function(){

        this.hit=false;
        this.activeCell=null;

        var ctrls=this.controls;

        for(var r in ctrls){
          for(var c in ctrls[r]){

            ctrls[r][c].out();

          }
        }

      };
      hexboard.prototype.clearLayout  = function(){

        var ctrls=this.controls;

        for(var r in ctrls){
          for(var c in ctrls[r]){

            ctrls[r][c].layout=HEXY_TYPES.BLANK;
            ctrls[r][c].text  =HEXY_TYPES.BLANK;

          }
        }

      };
      hexboard.prototype.update       = function(){

        var p=this;           //  Set a reference to the hexboard control

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

                  }

                  // Bottom
                  if(r<ctrls.length-1){

                    ctrls[r][c].bottom = ctrls[r+1][c];
                    layout=ctrls[r][c].bottom.layout;

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

                    }
                    else if(c%2===1){

                      ctrls[r][c].topLeft = ctrls[r][c-1];
                      layout=ctrls[r][c].topLeft.layout;

                    }

                  }

                  //  Bottom Left
                  if(c>0){

                    if(c%2===0){

                      ctrls[r][c].bottomLeft = ctrls[r][c-1];
                      layout=ctrls[r][c].bottomLeft.layout;

                    }
                    else if(c%2===1 &&
                            r<ctrls.length-1){

                      ctrls[r][c].bottomLeft = ctrls[r+1][c-1];
                      layout=ctrls[r][c].bottomLeft.layout;

                    }

                  }

                  //  Top Right
                  if(c<ctrls[0].length-1){

                    if(c%2===0 &&
                       r>0){

                      ctrls[r][c].topRight = ctrls[r-1][c+1];
                      layout=ctrls[r][c].topRight.layout;

                    }
                    else if(c%2===1){

                      ctrls[r][c].topRight = ctrls[r][c+1];
                      layout=ctrls[r][c].topRight.layout;

                    }

                  }

                  //  Bottom Right
                  if(c<ctrls[0].length-1){

                    if(c%2===0){

                      ctrls[r][c].bottomRight = ctrls[r][c+1];
                      layout=ctrls[r][c].bottomRight.layout;

                    }
                    else if(c%2===1 &&
                            r<ctrls.length-1){

                      ctrls[r][c].bottomRight = ctrls[r+1][c+1];
                      layout=ctrls[r][c].bottomRight.layout;

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

                    }
                  }

                  if(ctrls[r][c].bottom!==null){
                    if(ctrls[r][c].bottom.bottom!==null){

                      layout=ctrls[r][c].bottom.bottom.layout;

                    }
                  }

                // -------------------------

                  if(ctrls[r][c].topLeft!==null){
                    if(ctrls[r][c].topLeft.topLeft!==null){

                      layout=ctrls[r][c].topLeft.topLeft.layout;

                    }
                  }

                  if(ctrls[r][c].bottomLeft!==null){
                    if(ctrls[r][c].bottomLeft.bottomLeft!==null){

                      layout=ctrls[r][c].bottomLeft.bottomLeft.layout;

                    }
                  }


                // -------------------------

                  if(ctrls[r][c].topRight!==null){
                    if(ctrls[r][c].topRight.topRight!==null){

                      layout=ctrls[r][c].topRight.topRight.layout;

                    }
                  }

                  if(ctrls[r][c].bottomRight!==null){
                    if(ctrls[r][c].bottomRight.bottomRight!==null){

                      layout=ctrls[r][c].bottomRight.bottomRight.layout;

                    }
                  }

                // -------------------------

                  if(ctrls[r][c].top!==null){
                    if(ctrls[r][c].top.topLeft!==null){

                      layout=ctrls[r][c].top.topLeft.layout;

                    }
                  }

                  if(ctrls[r][c].top!==null){
                    if(ctrls[r][c].top.topRight!==null){

                      layout=ctrls[r][c].top.topRight.layout;

                    }
                  }

                // -------------------------

                  if(ctrls[r][c].bottom!==null){
                    if(ctrls[r][c].bottom.bottomLeft!==null){

                      layout=ctrls[r][c].bottom.bottomLeft.layout;

                    }
                  }

                  if(ctrls[r][c].bottom!==null){
                    if(ctrls[r][c].bottom.bottomRight!==null){

                      layout=ctrls[r][c].bottom.bottomRight.layout;

                    }
                  }

                // -------------------------

                  if(ctrls[r][c].topRight!==null){
                    if(ctrls[r][c].topRight.bottomRight!==null){

                      layout=ctrls[r][c].topRight.bottomRight.layout;

                    }
                  }

                  if(ctrls[r][c].topLeft!==null){
                    if(ctrls[r][c].topLeft.bottomLeft!==null){

                      layout=ctrls[r][c].topLeft.bottomLeft.layout;

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

                        // if(ctrl.layout===HEXY_TYPES.BLUE ||
                           // ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                          // total++;
                        // }

                        ctrl=ctrl.bottom;

                      }

                      ctrls[r][c].count=total;

                    break;

                  case HEXY_TYPES.DOWN_LEFT:

                    ctrl=ctrls[r][c].bottomLeft;

                      while(ctrl!==null){

                        // if(ctrl.layout===HEXY_TYPES.BLUE ||
                           // ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                          // total++;
                        // }

                        ctrl=ctrl.bottomLeft;

                      }

                      ctrls[r][c].count=total;

                    break;

                  case HEXY_TYPES.DOWN_RIGHT:

                    ctrl=ctrls[r][c].bottomRight;

                      while(ctrl!==null){

                        // if(ctrl.layout===HEXY_TYPES.BLUE ||
                           // ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                          // total++;
                        // }

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
        // columnCounts();
        this.calcRadius();



      };
      hexboard.prototype.calcRadius   = function(){

        var rw = (this.h-20)/sin(PI/3);
        var rh =  this.w-20;

        if(rw > rh){ this.radius = rh; }
        else       { this.radius = rw; }

        // var ctrls=this.controls;
        // var sz=this.layout.length;

        // this.reset();

        // for(var r in ctrls){
          // for(var c in ctrls[r]){

            // ctrls[r][c].w=this.radius/sz;
            // ctrls[r][c].h=this.radius/sz;

            // ctrls[r][c].reset();

          // }
        // }

      };
      hexboard.prototype.resized      = function(){

        this.x = 5;
        this.y = 5;
        this.w = this.parent.w-205;
        this.h = this.parent.h-10;

        this.calcRadius();
        this.reset();

      };
      hexboard.prototype.dragged      = function(){

        if(this.hitTest(x,y)){
          
          if(this.startX===0){
            
            this.startX=mouseX;
            this.startY=mouseY;
            
          }
          else{
            
            switch(app.dragDirection){
              
              
              case DRAG_DIRECTIONS.UPDOWN:    this.deltaX=0;
                                              this.deltaY=this.startY-mouseY;
                                              break;

              case DRAG_DIRECTIONS.BACKWARD:  this.deltaX=cos(PI/6)*(mouseX-this.startX);
                                              this.deltaY=sin(PI/6)*(mouseX-this.startX);
                                              break;

              case DRAG_DIRECTIONS.FORWARD:   this.deltaX=cos(PI/6)*(mouseX-this.startX);
                                              this.deltaY=sin(PI/6)*(this.startX-mouseX);
                                              break;

              default:                        break;

            }

          }

          var ctrls=this.controls;

          for(var r in ctrls){
            for(var c in ctrls[r]){

              ctrls[r][c].dragged();

            }
          }

        }

      };
      hexboard.prototype.clearDragging= function(){

        var ctrls=this.controls;

        for(var r in ctrls){
          for(var c in ctrls[r]){

            ctrls[r][c].dragging=false;

          }
        }

        this.startX=0;
        this.startY=0;
        
        this.deltaX=0;
        this.deltaY=0;
        
      };
      hexboard.prototype.calcComplete = function(){

        var ctrls=this.controls;
        var count=0;

        for(var r in ctrls){
          for(var c in ctrls[r]){

            if(ctrls[r][c].color==ctrls[r][c].layout &&
               ctrls[r][c].color!==0){
              count++;
            }

          }
        }

        this.percentageComplete=count/this.gridCount;

      };
      hexboard.prototype.addMove      = function(direction){

        this.moves.push(new move(this.activeCell.row,
                                 this.activeCell.col,
                                 direction));

      };
      hexboard.prototype.undo         = function(direction){
        
        // Set Active Cell based on the last move
        this.activeCell=this.controls[this.moves[this.moves.length-1].row]
                                     [this.moves[this.moves.length-1].col];

        // Reverse the last move
        this.moves[this.moves.length-1].reverse();

        // Remove the move off the stack
        this.moves.pop();

// print(this.moves.length);

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

        this.color        = props.layout;
        this.outerColor   = round(random(1,7));
        
        this.enabled      = true;           //  Text is displayed black or grayed out

        this.dragging     = false;          // Is the HexCell being dragged?

        var p=this;

        this.reset();

      };
      hexCell.prototype=Object.create(control.prototype);
      hexCell.prototype.reset         = function(){

        this.points=[];
        this.opoints=[];
        this.ipoints=[];
        this.hpoints=[];

        var d2=this.w/2;  // Half diameter

        var pt=0;
        var ang=0;

        var w   = 5;
        var w15 = d2*0.4;
        var w5  = d2*0.10;

        for(pt=0; pt<6; pt++){

          this.points.push( new pnt( cos(radians(ang+pt*60))*(d2),
                                     sin(radians(ang+pt*60))*(d2) ));

          this.opoints.push(new pnt( cos(radians(ang+pt*60))*(d2-w5),
                                     sin(radians(ang+pt*60))*(d2-w5) ));

          this.ipoints.push(new pnt( cos(radians(ang+pt*60))*(d2-w15),
                                     sin(radians(ang+pt*60))*(d2-w15) ));

          this.hpoints.push(new pnt( cos(radians(ang+pt*60))*(d2-w),
                                     sin(radians(ang+pt*60))*(d2-w) ));

        }

      };
      hexCell.prototype.draw          = function(){

        this.active=this.hit &&
                    app.focus===this;

        this.offset=0;
        var p=this;

        if(this.active){

          cursor(this.cursor);

          if(app.left){ this.offset=1; }

        }

        function highlight(){

          var clr=p.color;
          var pctg=20;

          stroke(GRAY);
          strokeWeight(0.25);
          
          switch(clr){

            case RED0:      fill(getColor(RED,    pctg)); break;
            case ORANGE0:   fill(getColor(ORANGE, pctg)); break;
            case YELLOW0:   fill(getColor(YELLOW, pctg)); break;
            case GREEN0:    fill(getColor(GREEN,  pctg)); break;
            case BLUE0:     fill(getColor(BLUE,   pctg)); break;
            case PURPLE0:   fill(getColor(PURPLE, pctg)); break;
            case BLACK0:    fill(getColor(BLACK,  pctg)); break;

            default:        noFill();                     break;

          }

          if(p.layout!==BLANK){
            
            
            if(clr!==BLACK0){
              
              stroke(BLACK);
              strokeWeight(0.25);

              beginShape();

                for(var pt in p.hpoints){
                  vertex(p.hpoints[pt].x + p.parent.deltaX,
                         p.hpoints[pt].y + p.parent.deltaY);
                }

              endShape(CLOSE);

            }
            else{
              
              var po=p.hpoints;
              
              fill( getColor(ORANGE, pctg));   triangle(0, 0, po[0].x, po[0].y, po[1].x, po[1].y);
              fill( getColor(RED,    pctg));   triangle(0, 0, po[1].x, po[1].y, po[2].x, po[2].y);
              fill( getColor(PURPLE, pctg));   triangle(0, 0, po[2].x, po[2].y, po[3].x, po[3].y);
              fill( getColor(BLUE,   pctg));   triangle(0, 0, po[3].x, po[3].y, po[4].x, po[4].y);
              fill( getColor(GREEN,  pctg));   triangle(0, 0, po[4].x, po[4].y, po[5].x, po[5].y);
              fill( getColor(YELLOW, pctg));   triangle(0, 0, po[5].x, po[5].y, po[0].x, po[0].y);

            }

          }

        };
        function outerHexagon(){

          var clr=p.outerColor;
          var pctg=20;

          noFill();
          noStroke();

          switch(clr){

            case RED0:      fill(getColor(K_RED,    pctg)); break;
            case ORANGE0:   fill(getColor(K_ORANGE, pctg)); break;
            case YELLOW0:   fill(getColor(K_YELLOW, pctg)); break;
            case GREEN0:    fill(getColor(K_GREEN,  pctg)); break;
            case BLUE0:     fill(getColor(K_BLUE,   pctg)); break;
            case PURPLE0:   fill(getColor(K_PURPLE, pctg)); break;
            case BLACK0:    fill(getColor(BLACK,    pctg)); break;

            default:        noFill();                       break;

          }
          
          if(p.layout!==BLANK){
            
            beginShape();

              for(var pt in p.opoints){
                vertex(p.opoints[pt].x + p.parent.deltaX,
                       p.opoints[pt].y + p.parent.deltaY);
              }

            endShape(CLOSE);

          }
          
        };
        function innerHexagon(){

          var drw=true;
          var clr=p.color;
          var pctg=99;
                    
          noStroke();
          noFill();

          if(app.keys[KeyCodes.ESC]){ clr=p.layout; }

          switch(clr){

            case RED0:      fill(getColor(K_RED,    pctg)); break;
            case ORANGE0:   fill(getColor(K_ORANGE, pctg)); break;
            case YELLOW0:   fill(getColor(K_YELLOW, pctg)); break;
            case GREEN0:    fill(getColor(K_GREEN,  pctg)); break;
            case BLUE0:     fill(getColor(K_BLUE,   pctg)); break;
            case PURPLE0:   fill(getColor(K_PURPLE, pctg)); break;
            case BLACK0:    fill(getColor(BLACK,    pctg)); break;

            default:        noFill();                       break;

          }

          if(p.layout!==BLANK){
            
            var offsetX=0;
            var offsetY=0;
            
            if(p.dragging){
              
              offsetX=p.parent.deltaX;
              offsetY=p.parent.deltaY;

            }

            if(clr!==BLACK0){

              stroke(BLACK);
              strokeWeight(0.25);

              beginShape();

                for(var pt in p.ipoints){
                  vertex(p.ipoints[pt].x+offsetX,
                         p.ipoints[pt].y+offsetY);
                }

              endShape(CLOSE);

            }
            else{

              var po=p.ipoints;
              
              fill( getColor(ORANGE, pctg));   
              triangle(offsetX, offsetY, po[0].x+offsetX, po[0].y+offsetY, po[1].x+offsetX, po[1].y+offsetY);
              fill( getColor(RED,    pctg));   
              triangle(offsetX, offsetY, po[1].x+offsetX, po[1].y+offsetY, po[2].x+offsetX, po[2].y+offsetY);
              fill( getColor(PURPLE, pctg));   
              triangle(offsetX, offsetY, po[2].x+offsetX, po[2].y+offsetY, po[3].x+offsetX, po[3].y+offsetY);
              fill( getColor(BLUE,   pctg));   
              triangle(offsetX, offsetY, po[3].x+offsetX, po[3].y+offsetY, po[4].x+offsetX, po[4].y+offsetY);
              fill( getColor(GREEN,  pctg));   
              triangle(offsetX, offsetY, po[4].x+offsetX, po[4].y+offsetY, po[5].x+offsetX, po[5].y+offsetY);
              fill( getColor(YELLOW, pctg));   
              triangle(offsetX, offsetY, po[5].x+offsetX, po[5].y+offsetY, po[0].x+offsetX, po[0].y+offsetY);

            }

          }
          
        };
        function activeCell(){

          if(app.hexboard.activeCell===p){

            fill(getColor(BLACK,15));
            strokeWeight(3);
            stroke(getColor(WHITE,75));

            beginShape();

              for(var pt in p.points){
                vertex(p.points[pt].x,
                p.points[pt].y);
              }

            endShape(CLOSE);

          }

        };

        function drawLinks(){ //  Delete for release

          if(p.active){

            noStroke();
            strokeWeight(5);

            if(p.top!==null && p.top.layout!==0){
              stroke(BLACK);
              line(p.top.x, p.top.y, p.x, p.y);
            }
            if(p.bottom!==null && p.bottom.layout!==0){
              stroke(RED);
              line(p.bottom.x, p.bottom.y, p.x, p.y);
            }
            if(p.topLeft!==null && p.topLeft.layout!==0){
              stroke(ORANGE);
              line(p.topLeft.x, p.topLeft.y, p.x, p.y);
            }
            if(p.bottomLeft!==null && p.bottomLeft.layout!==0){
              stroke(YELLOW);
              line(p.bottomLeft.x, p.bottomLeft.y, p.x, p.y);
            }
            if(p.topRight!==null && p.topRight.layout!==0){
              stroke(GREEN);
              line(p.topRight.x, p.topRight.y, p.x, p.y);
            }
            if(p.bottomRight!==null && p.bottomRight.layout!==0){
              stroke(BLUE);
              line(p.bottomRight.x, p.bottomRight.y, p.x, p.y);
            }

          }

        };

        push();

          translate(this.x, this.y);

          scale(1,-1);

            // if(this.dragging){
              //highlight();
            // }
            // else{ 
            
              //outerHexagon();
                  innerHexagon();
                  activeCell();

                // }

        pop();

        // drawLinks(); //  Delete for release

      };
      hexCell.prototype.hitTest       = function(x,y){

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
      hexCell.prototype.outerHitTest  = function(x,y){

        return dist(mouseX, mouseY, this.x+x, this.y+y)<this.w/2;

      };
      hexCell.prototype.moved         = function(x,y){
      /* Overridden because of the shape */

          if(this.parent.hit){

            if(this.outerHitTest(x,y)){

              this.outerHit=true;

              if(this.hitTest(x,y)){ this.hit=true;
                                     app.focus=this;
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
      hexCell.prototype.clicked       = function(){

        if(this.hit &&
           this.layout!==BLANK){
          this.parent.activeCell=this;
          app.focus=this;
        }

        if(this.active){

        }

      };
      hexCell.prototype.rclicked      = function(){

          if(this.active){

            this.parent.dirty=true;

            if(app.mode===APPMODES.CREATE){

              // this.decrCellLayout();

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
      hexCell.prototype.incrCellLayout= function(){

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
      hexCell.prototype.decrCellLayout= function(){

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
      hexCell.prototype.recalculate   = function(){

        this.parent.update();

      };
      hexCell.prototype.dragged       = function(){

        if(this.hit &&
           this.layout!==BLANK){
             // print(this.id);
          this.parent.activeCell=this;

        }

      };

    }



  }

  /** Initialize --------------------------------------------------------- */
  function initialize(){

    /*  Initialize the app.keys array and the values of the special keys */
    app.keys[KeyCodes.CONTROL] = false;
    app.keys[KeyCodes.ALT]     = false;
    app.keys[KeyCodes.SHIFT]   = false;

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
      rt.controls.push(new hexboard('hexboard', rt, 5, 5, rt.w-205, rt.h-10,
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

  var x  = 0;
  var y  = 0;
  var cx = (windowWidth-200)/2;
  var cy = windowHeight/2;

  function handleKeys(){

    if(frameCount%5===0){

      switch(true){

        case keyIsDown(KEYCODES.F2):    randomize();    break;

        case keyIsDown(KeyCodes.Q):     upLeft();       break;
        case keyIsDown(KeyCodes.E):     upRight();      break;

        case keyIsDown(KeyCodes.A):     downLeft();     break;
        case keyIsDown(KeyCodes.D):     downRight();    break;

        case keyIsDown(KeyCodes.W):     up();           break;
        case keyIsDown(KeyCodes.S):     down();         break;

        case keyIsDown(UP_ARROW):       colUp();        break;
        case keyIsDown(DOWN_ARROW):     colDown();      break;

        case keyIsDown(LEFT_ARROW) &&
             keyIsDown(CONTROL):        colDownLeft();  break;
        case keyIsDown(RIGHT_ARROW) &&
             keyIsDown(CONTROL):        colDownRight(); break;

        case keyIsDown(LEFT_ARROW):     colUpLeft();    break;
        case keyIsDown(RIGHT_ARROW):    colUpRight();   break;

        default:                                        break;

      }

    }
    
  };

  function draw(){

    background(128);

    forEach(app.controls,'draw');

    update();
    
    fill(BLACK);
    text(app.running, 50, height-20);
  }

  /* Mouse Events ============================================================== */
  {

    function mouseClicked()       {

      switch(mouseButton){

        case LEFT:    forEach(app.controls, 'clicked' );  break;
        case RIGHT:   forEach(app.controls, 'rclicked');  break;
        // case CENTER:  forEach(app.controls,'cclicked'); break;

        default:     break;

      }

    };
    function doubleClicked() {

      app.fullscreen=!app.fullscreen;

      fullscreen(app.fullscreen);
print('dclicked');
    };
    function mouseMoved()         {
  
      app.mouseX=mouseX;
      app.mouseY=mouseY;

      for(var c in app.controls){ app.controls[c].moved(0,0); }

    };
    function mousePressed()       {

      switch(mouseButton){

        case LEFT:    app.left   = true;  break;
        case CENTER:  app.center = true;  break;
        case RIGHT:   app.right  = true;  break;

        default:                          break;

      }

    };

    function mouseReleased()      {

      switch(mouseButton){

        case LEFT:    forEach(app.controls,'released');

                      // Tidy up dragging
                      {

                        app.hexboard.clearDragging();

                        app.dragStartX=0;
                        app.dragStartY=0;

                        app.dragging = false;

                        app.dragDirection=DRAG_DIRECTIONS.NONE;

                        x=cx;
                        y=cy;

                      }

                      break;

        // case RIGHT:  for(var c in app.controls){ app.controls[c].rClicked(); } break;
        // case CENTER: for(var c in app.controls){ app.controls[c].cClicked(); } break;

        default:     break;

      }

      app.left   = false;
      app.right  = false;
      app.center = false;

    };
    function mouseDragged()       {

      function calcDragAngle(){

        // var a = atan2(mouseY-height/2, (mouseX-(width-200)/2));
        var a = atan2(mouseY-pmouseY, mouseX-pmouseX);

        a=a*180/PI;

        x=cx;
        y=cy;

        switch(true){

          case a >= 67.5 && a <= 122.5:
          case a <=-67.5 && a >=-122.5:   x = cx;
                                          y = cy + 150;

                                          app.dragDirection=DRAG_DIRECTIONS.UPDOWN;

                                          setDragColumn();

                                          break;

          case a >= 0 && a <= 67.5:
          case a >=-180 && a <=-122.5:    x = cx + 100;
                                          y = cy +  50;

                                          app.dragDirection=DRAG_DIRECTIONS.FORWARD;

                                          setDragForward();

                                          break;

          case a <= 180 && a >= 122.5:
          case a <= 0 && a >=-67.5:       x = cx - 100;
                                          y = cy +  50;

                                          app.dragDirection=DRAG_DIRECTIONS.BACKWARD;

                                          setDragBackward();

                                          break;

          default:                        break;

        }

      };

      switch(mouseButton){

        case LEFT:

                      forEach(app.controls,'dragged');  //  Necessary to put this first to set the active cell

                      if(app.dragging===false){

                        app.dragStartX=mouseX;
                        app.dragStartY=mouseY;

                        app.dragging=true;

                      }
                      else{

                        if(dist(app.dragStartX,
                                app.dragStartY,
                                mouseX,
                                mouseY)>30){

                          if(x===cx &&
                             y===cy){ calcDragAngle(); }

                        }

                      }

                      break;

        // case RIGHT:   forEach(app.controls,'rDragged');

                      // break;

        // case CENTER:  forEach(app.controls,'cDragged');

                      // break;

        default:      break;

      }

    };
    function mouseOut()           {

      // forEach(app.controls,'out');

      // app.focus=-1;

    };
    function mouseOver()          {

      forEach(app.controls,'over');

      app.focus=-2;

    };

  }

  /* Keyboard Events =========================================================== */
  {

    keyPressed=function(){

      app.keys[keyCode]=true;

  // print(keyCode + ' | ' + key + ' | ' + key.toString());

      switch(true){

        /* Navigation                                                       */
        case keyIsDown(KeyCodes.Q):     upLeft();                                   break;
        case keyIsDown(KeyCodes.E):     upRight();                                  break;
                      
        case keyIsDown(KeyCodes.A):     downLeft();                                 break;
        case keyIsDown(KeyCodes.D):     downRight();                                break;
                      
        case keyIsDown(KeyCodes.W):     up();                                       break;
        case keyIsDown(KeyCodes.S):     down();                                     break;

        case keyIsDown(KeyCodes.P):     toggleRunning();                            break;
            
        /* Translate Rows/Columns                                           */
        case keyIsDown(KeyCodes.UP):    colUp();
                                        app.hexboard.addMove(DIRECTIONS.UP);        break;
        case keyIsDown(KeyCodes.DOWN):  colDown();            
                                        app.hexboard.addMove(DIRECTIONS.DOWN);      break;

        case keyIsDown(KeyCodes.LEFT) &&
             keyIsDown(CONTROL):        colDownLeft();        
                                        app.hexboard.addMove(DIRECTIONS.DOWNLEFT);  break;
        case keyIsDown(KeyCodes.RIGHT) &&
             keyIsDown(CONTROL):        colDownRight();
                                        app.hexboard.addMove(DIRECTIONS.DOWNRIGHT); break;

        case keyIsDown(LEFT_ARROW):     colUpLeft();
                                        app.hexboard.addMove(DIRECTIONS.UPLEFT);    break;
        case keyIsDown(RIGHT_ARROW):    colUpRight();
                                        app.hexboard.addMove(DIRECTIONS.UPRIGHT);   break;

        /* Puzzles                                                          */
        case keyIsDown(KeyCodes.PGUP):  incrementPuzzle();                          break;
        case keyIsDown(KeyCodes.PGDN):  decrementPuzzle();                          break;

        /*  Function Keys                                                   */
        case keyIsDown(KEYCODES.F1):    toggleInfo();                               break;
        case keyIsDown(KEYCODES.F2):    randomize();                                break;
        // case keyIsDown(KEYCODES.F3):    toggleTelemetry();    break;
        case keyIsDown(KEYCODES.F4):    toggleTelemetry();                          break;
        // case app.keys[KEYCODES.CONTROL] &&
             // app.keys[KEYCODES.F5]:         clearLayout();         break;
        case keyIsDown(KEYCODES.F8):    reset();                                    break;       
        
        /* Edit                                                             */
        case app.keys[KEYCODES.Z] &&
             app.keys[KEYCODES.CONTROL]:  app.hexboard.undo();                      break;  // reverse latest move

        // case app.keys[KEYCODES.SPACE] &&
             // app.keys[KEYCODES.CONTROL]:    decrCellLayout();      break;  // Decrement Layout   
        // case app.keys[KEYCODES.SPACE]:      incrCellLayout();      break;  // Increment Layout   

        // /* Figure out how to use this                                                                          */
        // case app.keys[KEYCODES.CODED]:                             break;

        default:                                                                    break;

      }

    };
    keyReleased=function(){ app.keys[keyCode]=false;                          };

  }

  function windowResized(){

    resizeCanvas(windowWidth-10, windowHeight-10);

    forEach(app.controls,'resized');

print('resized');

  }

}
























  /**

  1729 = 9^3 + 10^3 = 12^3 + 1^3

  sketch.js

  */
