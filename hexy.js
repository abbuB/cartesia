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
      
      - determine how consecutive and non-consecutive are specified
      
      - refresh screen on mouse movement
      - click sounds for blue and black hexCells
      - uncover animations triangles
      - dynamically add text to cells with linking
      - Level indicator
      - Menu navigation
      - Score display controls
      - Restart control
      - Expanding halos

      - ***** Remove Dragging from all controls *****

      - Allow for optional orientation of hexagons
        * pointy top
        * flat top

      - Keyboard controls for navigation and all functions
      - Touchscreen controls

    Research:


    TO DONE:


    ---------------------------------------------------------------------

      print( typeof this.color );

*/

  function print(s){

    console.log(s);

  };

  var serifFont   = createFont('sans-serif', 16);
  var sansFont    = createFont('sans',       16);
  var monoFont    = createFont('monospace',  16);
  var cursiveFont = createFont('cursive',    16);
  var fantasyFont = createFont('fantasy',    16);

  var globalFRate=this;

  const MY_FAV = 7;
  // const HEX_SIZE=60;
  var HEX_SIZE=60;
  // const pi=nf(PI,1,10);

  /* Constants ============================================================= */
  {

    // var HEXY_SYMBOLS={

      // BLACK:    0,
      // BLUE:     1,

      // SPACER:   2,

      // ROW:      3,
      // COL:      4,

      // DLEFT:    5,
      // DRIGHT:   6

    // }
    var HEXY_SYMBOLS={

      // Double up the \ character because it is an escape character and the first one won't be recognised

      BLANK:            '.',

      BLACK:            'o',
      BLACK_REVEALED:   'O',
      BLUE:             'x',
      BLUE_REVEALED:    'X',
      DOWN_RIGHT:       '\\',
      DOWN_CENTER:      '|',
      DOWN_LEFT:        '/',

      NUMBER:           '+',
      CONSECUTIVE:      'c',
      NOT_CONSECUTIVE:  'n'

    };
    var puzzles=[".|..............................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "..|.............................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "...|............................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "....|...........................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 ".....|..........................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "......|.........................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 ".......|........................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "........|.......................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 ".........|......................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "..........|.....................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "...........|....................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "............|...................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 ".............|..................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "..............|.................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "...............|................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "................|...............................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 ".................|..............................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "..................|.............................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "...................|............................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "....................|...........................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 ".....................|..........................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "......................|.........................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 ".......................|........................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "........................|.......................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 ".........................|......................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "..........................|.....................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "...........................|....................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "............................|...................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 ".............................|..................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "..............................|.................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "...............................|................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "................................|...............|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 ".................................|..............|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "..................................|.............|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "...................................|............|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "....................................|...........|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 ".....................................|..........|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "......................................|.........|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 ".......................................|........|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "........................................|.......|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 ".........................................|......|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.",
                 "..........................................|.....|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+."
                ];

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

      frameRate(0);

      cursor(WAIT);
      strokeCap(SQUARE);

      angleMode='radians';

      size(800, 600); // set size of canvas

    }

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

    this.mode         = APPMODES.INTRO;

    this.controls     = [];                 //  Collection of controls in the app
    this.controlCount = 0;

    this.keys         = [];                 //  Array holding the value of all keycodes

    this.info         = 0;                  //  Is the info frame displayed
    this.telemetry    = false;              //  Is telemetry visible

    /* Hextris Specific ------------------ */

    this.hexBoard     = this.controls[1];

    this.puzzle       = 0;                  //  Index of the current puzzle layout

    this.remaining    = 0;                  //  How many blue cells need to be uncovered
    this.covered      = 0;                  //  How many black cells need to be uncovered
    this.errors       = 0;                  //  How many mistaken clicks occurred

    this.orientation  = ORIENTATIONS.FLAT;

    this.music        = true;
    this.level        = 0;                  //  Levels 0 - 42 ( 7 groups of 6 = 42 total)

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

    function clickTest(n)         { print('click: ' + n);               };

    function incrementPuzzle()    {

      app.puzzle++;

      if(app.puzzle>puzzles.length-1){  app.puzzle=0; }

      app.puzzle=constrain(app.puzzle, 0, puzzles.length-1);

    };
    function decrementPuzzle()    {

      app.puzzle--;

      if(app.puzzle<0){  app.puzzle=puzzles.length-1; }

      app.puzzle=constrain(app.puzzle, 0, puzzles.length-1);

    };
    function selectPuzzle(n)      {

      app.puzzle=constrain(n, 0, puzzles.length-1);

    };

  }

  /* Containers/Controls =================================================== */
  {

    /* Default              */
    {

      var control=function(id, parent, x, y, w, h){

        app.controlCount++;

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

        this.font     = serifFont; /** default font */

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

            fill(192);
            noStroke();

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

        if(app.telemetry===false &&
           this.offset===0 &&
           app.debug===false){ return; }

        // Border
        function border(){

          strokeWeight(1);
          stroke(getColor(p.clr,100));

          noStroke();

          if(p.hit){ fill(getColor(CLRS.BLACK,100)); }
          else     { fill(getColor(CLRS.BLACK,80));  }

          fill(getColor(CLRS.BLACK,50));

            if(p.hit){
              fill(getColor(CLRS.BLACK,70));
            }

            rect(p.offset, 0, p.w, p.h, 5);

        };

        function title(){

          textAlign(CENTER,CENTER);
          textSize(14);

          fill(CLRS.WHITE);

            text('Telemetry', p.w/2+p.offset, 20);

        };
        function environment(){

          fill(getColor(CLRS.BLACK,50));

            rect(p.offset+10,  35, p.w-20, 365, 3);

          textAlign(LEFT,TOP);
          textSize(10);
          textLeading(12);

          fill(getColor(CLRS.TEAL_2,75));

            text('\n'             + 'Cursor Coordinates' +
                 '\n\n\n\n'       + 'Mouse Buttons'      +
                 '\n\n\n\n\n\n\n' + 'Keys'               +
                 '\n\n\n\n\n'     + 'Environment',
                 col0, row0);

          fill(getColor(CLRS.WHITE,75));

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

          fill(getColor(CLRS.YELLOW,75));
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

          fill(getColor(CLRS.BLACK,50));

            rect(p.offset+10,  top, p.w-20, 170, 3);

          textAlign(LEFT,TOP);
          textSize(10);
          textLeading(12);

          fill(getColor(CLRS.TEAL_2,75));

            text('\n'       + 'Controls' +
                 '\n\n\n\n' + 'Score'    +
                 '\n\n\n\n' + 'Misc',
                 col0, top);

          fill(getColor(CLRS.WHITE,75));

            text('\n\n'   + 'Count:'     +
                 '\n'     + 'Active:'    +
                 '\n\n\n' + 'Remaining:' +
                 '\n'     + 'Mistakes:'  +
                 '\n\n\n' + 'Music:'     +
                 '\n'     + 'Level:',
                 col1, top);

          fill(getColor(CLRS.YELLOW,75));
          textAlign(RIGHT,TOP);

            text('\n\n'   + app.controlCount +
                 '\n'     + app.focus.id     +
                 '\n\n\n' + app.remaining    +
                 '\n'     + app.errors       +
                 '\n\n\n' + app.music        +
                 '\n'     + app.level,
                 col2, top);

        };

        this.active=this.hit && app.focus===this;

        if     ( app.telemetry && this.offset>-200){ this.offset-=10; }
        else if(!app.telemetry && this.offset<0   ){ this.offset+=10; }

        var p=this;

        var row0 = 30;
        var row1 = 90;

        var col0 = this.offset+20;
        var col1 = this.offset+25;
        var col2 = this.offset+170;

        pushMatrix();

          translate(this.x, this.y);

            if(this.active){ cursor(this.cursor); }

            textFont(this.font);

            border();

            title();
            environment();
            appSpecific();

            // forEach(this.controls, 'draw');

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

        // this.score          = 0;
        // this.highScore      = 0;

        this.activeCell     = null;

        // this.angle          = 0;

        this.layout         = [];   //  Array of the layout of hexcells
        this.text           = [];   //  Array of nexCell hints

        this.lines          = [];   //  Array of hexCells with highlight lines activated
        this.halos          = [];   //  Array of hexCells with a halo activated

        this.clrOffset      = 0;
        this.clrIncr        = 0.5;

        app.hexBoard=this;

        this.reset();

      };
      hexBoard.prototype=Object.create(control.prototype);
      hexBoard.prototype.reset        =function(){

        var p=this;           //  Set a reference to the hexBoard control

        this.controls=[];        //  Clear the controls array
        this.activeCell = null;  //  Clear the active hexCell

    // var HEXY_SYMBOLS={

      // Double up the \ character because it is an escape character and the first one won't be recognised

      // BLANK:            '.',
      // BLACK:            'o',
      // BLACK_REVEALED:   'O',
      // BLUE:             'x',
      // BLUE_REVEALED:    'X',
      // DOWN_RIGHT:       '\\',
      // DOWN_CENTER:      '|',
      // DOWN_LEFT:        '/',

      // BLANK:            '.',
      // NUMBER:           '+',
      // CONSECUTIVE:      'c',
      // NOT_CONSECUTIVE:  'n'

    // };

        this.layout=[
                     ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     ['.', '.', '|', '|', '|', 'o', 'X', 'o', '|', '|', '|', '.', '.'],
                     ['.', '.', '\\', 'x', 'o', 'x', 'O', 'x', 'o', 'x', '/', '.', '.'],
                     ['.', '.', 'x', 'o', 'x', 'o', 'X', 'o', 'x', 'o', 'x', '.', '.'],
                     ['.', '.', 'o', 'x', 'o', 'x', 'O', 'x', 'o', 'x', 'o', '.', '.'],
                     ['.', '.', 'x', 'o', '|', '/', 'X', 'o', 'x', 'o', 'x', '.', '.'],
                     ['.', '.', 'o', 'x', 'o', 'x', '\\', 'x', 'o', 'x', 'o', '.', '.'],
                     ['.', '.', 'x', 'o', 'x', 'o', 'X', 'o', 'x', 'o', 'x', '.', '.'],
                     ['.', '.', '.', '.', 'o', 'x', 'O', 'x', 'o', '.', '.', '.', '.'],
                     ['.', '.', '.', '.', '.', '.', 'X', '.', '.', '.', '.', '.', '.'],
                     ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.']
                    ];

        this.text  =[
                     ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     ['.', '.', 'c', 'n', '+', '+', '+', '+', '.', '.', 'c', '.', '.'],
                     ['.', '.', 'n', 'n', '.', '+', 'n', '+', '.', '.', 'n', '.', '.'],
                     ['.', '.', '.', '.', '.', '+', '+', '+', '.', '.', '.', '.', '.'],
                     ['.', '.', '.', '.', '.', '+', 'n', '+', '.', '.', '.', '.', '.'],
                     ['.', '.', '.', '.', 'c', 'c', 'n', 'n', '.', '.', '.', '.', '.'],
                     ['.', '.', '.', '.', '.', '+', '.', '+', '.', '.', '.', '.', '.'],
                     ['.', '.', '.', '.', '.', '+', 'n', '+', '.', '.', '.', '.', '.'],
                     ['.', '.', '.', '.', '.', '+', '.', '+', '.', '.', '.', '.', '.'],
                     ['.', '.', '.', '.', '.', '.', 'n', '.', '.', '.', '.', '.', '.'],
                     ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.']
                    ];

        var rowArray=[];  // Temporary 1-D array to hold each successive row before adding to the corresponding 2-D array
        var n=0;          // Iterator

        function load(){

          p.controls=[];

          HEX_SIZE=width/(p.layout.length+2);

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
          yMargin = yOffset +  p.h/2 - (p.layout.length-1)*yOffset/2-w/2;

          for(row in p.layout){
            for(col in p.layout[row]){

              x = xMargin + col*w*0.75;
              y = yMargin + row*w*cos(PI/6);

              if(col%2===0){
                y-=yOffset/2;
              }

              rowArray.push(new hexCell('H'+n, p, x, y, w, w,
                {execute:   clickTest,
                 row:       row,
                 col:       col,
                 layout:    p.layout[row][col],
                 text:      p.text[row][col],
                 font:      sansFont,
                 cursor:    HAND}));

               n++;

            }

            p.controls.push(rowArray);

            rowArray=[];

          }

        };

        function link(){

          var ctrls=p.controls;
          var ctrl=null;
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
                    ctrl=ctrls[r][c].top;

                    if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                       ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                      total++;
                    }

                  }

                  // Bottom
                  if(r<ctrls[r].length-1){

                    ctrls[r][c].bottom = ctrls[r+1][c];

                    ctrl=ctrls[r][c].bottom;

                    if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                       ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
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

                      ctrl=ctrls[r][c].topLeft;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                        total++;
                      }

                    }
                    else if(c%2===1){

                      ctrls[r][c].topLeft = ctrls[r][c-1];

                      ctrl=ctrls[r][c].topLeft;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                        total++;
                      }

                    }

                  }

                  //  Bottom Left
                  if(c>0){

                    if(c%2===0){

                      ctrls[r][c].bottomLeft = ctrls[r][c-1];

                      ctrl=ctrls[r][c].bottomLeft;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                        total++;
                      }

                    }
                    else if(c%2===1 &&
                            r<ctrls[0].length-1){

                      ctrls[r][c].bottomLeft = ctrls[r+1][c-1];

                      ctrl=ctrls[r][c].bottomLeft;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                        total++;
                      }

                    }

                  }

                  //  Top Right
                  if(c<ctrls[0].length-1){

                    if(c%2===0 &&
                       r>0){

                      ctrls[r][c].topRight = ctrls[r-1][c+1];

                      ctrl=ctrls[r][c].topRight;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                        total++;
                      }

                    }
                    else if(c%2===1){

                      ctrls[r][c].topRight = ctrls[r][c+1];

                      ctrl=ctrls[r][c].topRight;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                        total++;
                      }

                    }

                  }

                  //  Bottom Right
                  if(c<ctrls[0].length-1){

                    if(c%2===0){

                      ctrls[r][c].bottomRight = ctrls[r][c+1];

                      ctrl=ctrls[r][c].bottomRight;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                        total++;
                      }

                    }
                    else if(c%2===1 &&
                            r<ctrls[0].length-1){

                      ctrls[r][c].bottomRight = ctrls[r+1][c+1];

                      ctrl=ctrls[r][c].bottomRight;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
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
          var ctrl=null;
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

                      ctrl=ctrls[r][c].top.top;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].bottom!==null){
                    if(ctrls[r][c].bottom.bottom!==null){

                      ctrl=ctrls[r][c].bottom.bottom;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                // -------------------------

                  if(ctrls[r][c].topLeft!==null){
                    if(ctrls[r][c].topLeft.topLeft!==null){

                      ctrl=ctrls[r][c].topLeft.topLeft;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].bottomLeft!==null){
                    if(ctrls[r][c].bottomLeft.bottomLeft!==null){

                      ctrl=ctrls[r][c].bottomLeft.bottomLeft;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }


                // -------------------------

                  if(ctrls[r][c].topRight!==null){
                    if(ctrls[r][c].topRight.topRight!==null){

                      ctrl=ctrls[r][c].topRight.topRight;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].bottomRight!==null){
                    if(ctrls[r][c].bottomRight.bottomRight!==null){

                      ctrl=ctrls[r][c].bottomRight.bottomRight;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                // -------------------------

                  if(ctrls[r][c].top!==null){
                    if(ctrls[r][c].top.topLeft!==null){

                      ctrl=ctrls[r][c].top.topLeft;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].top!==null){
                    if(ctrls[r][c].top.topRight!==null){

                      ctrl=ctrls[r][c].top.topRight;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                // -------------------------

                  if(ctrls[r][c].bottom!==null){
                    if(ctrls[r][c].bottom.bottomLeft!==null){

                      ctrl=ctrls[r][c].bottom.bottomLeft;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].bottom!==null){
                    if(ctrls[r][c].bottom.bottomRight!==null){

                      ctrl=ctrls[r][c].bottom.bottomRight;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                // -------------------------

                  if(ctrls[r][c].topRight!==null){
                    if(ctrls[r][c].topRight.bottomRight!==null){

                      ctrl=ctrls[r][c].topRight.bottomRight;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].topLeft!==null){
                    if(ctrls[r][c].topLeft.bottomLeft!==null){

                      ctrl=ctrls[r][c].topLeft.bottomLeft;

                      if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                         ctrl.layout===HEXY_SYMBOLS.BLUE_REVEALED){
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
          var layout=null;
          var total=0;

            for(var r in ctrls){
              for(var c in ctrls[r]){

                switch(ctrls[r][c].layout){

                  case HEXY_SYMBOLS.DOWN_CENTER:

                    ctrl=ctrls[r][c].bottom;

                      while(ctrl!==null){

                        if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                           ctrl.layout===HEXY_SYMBOLS.BLUE){
                          total++;
                        }

                        ctrl=ctrl.bottom;

                      }

                      ctrls[r][c].count=total;

                    break;

                  case HEXY_SYMBOLS.DOWN_LEFT:

                    ctrl=ctrls[r][c].bottomLeft;

                      while(ctrl!==null){

                        if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                           ctrl.layout===HEXY_SYMBOLS.BLUE){
                          total++;
                        }

                        ctrl=ctrl.bottomLeft;

                      }

                      ctrls[r][c].count=total;

                    break;

                  case HEXY_SYMBOLS.DOWN_RIGHT:

                    ctrl=ctrls[r][c].bottomRight;

                      while(ctrl!==null){

                        if(ctrl.layout===HEXY_SYMBOLS.BLUE ||
                           ctrl.layout===HEXY_SYMBOLS.BLUE){
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
        function randomizeStyle(){

          var layout=p.layout;

          for(var r in layout){
            for(var c in layout[r]){

              if(layout[r][c]===0 ||
                 layout[r][c]===1){
                layout[r][c]=round(random(0,1));
              }

            }
          }

        };

        // randomizeStyle();
        load();
        link();
        doubleLink();
        columnCounts();

        app.gameOver=false;

      };
      hexBoard.prototype.draw         = function(){

        var p=this;

        function drawGuideLines(){

          var offset=(HEX_SIZE-2)/2;
          
          strokeWeight(6);
          stroke(getColor(CLRS.WHITE,25));

          for(var l in p.lines){
            
            switch(p.lines[l].layout){

              case HEXY_SYMBOLS.DOWN_CENTER:

                line(p.lines[l].x, p.lines[l].y + offset,
                     p.lines[l].x, height);

                break;

              case HEXY_SYMBOLS.DOWN_LEFT:

                var x=p.lines[l].x;
                var y=p.lines[l].y;
                var offsetX=cos(PI-PI/6)*offset;
                var offsetY=sin(PI-PI/6)*offset;

                line(x+offsetX,
                     y+offsetY,
                     x+offsetX+600*tan(PI-PI/3),
                     y+offsetY+600);


                break;

              case HEXY_SYMBOLS.DOWN_RIGHT:

                var x=p.lines[l].x;
                var y=p.lines[l].y;
                var offsetX=cos(PI/6)*offset;
                var offsetY=sin(PI/6)*offset;

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
          app.covered=0;
          
          var total=0;
          var covered=0;          
          var ctrls=p.controls;

          for(var r in ctrls){
            for(var c in ctrls[r]){

              if(ctrls[r][c].layout==='x'){
                total++;
              }

              if(ctrls[r][c].layout==='o'){
                covered++;
              }
              
            }
          }

          app.remaining=total;
          app.covered=covered;

        };
        function drawHalos(){

          stroke(CLRS.RED);
          strokeWeight(1);
          noStroke();

          fill(getColor(CLRS.WHITE,40+p.clrOffset));

          p.clrOffset+=p.clrIncr;

          if(p.clrOffset===15 ||
             p.clrOffset===0){ p.clrIncr*=-1; }

          var w=HEX_SIZE;

          var x=0;
          var y=0;

          var yOffset=0;
          var xOffset=0.25*w;
          var sinP3=w*sin(PI/3);
          var cosP3=w/2*cos(PI/3);

          for(var h in p.halos){

            x=p.halos[h].x;
            y=p.halos[h].y;

            beginShape();

              vertex(x-cosP3,  y-sinP3*2.5);
              vertex(x-w/2,    y-sinP3*2  );
              vertex(x-w,      y-sinP3*2  );
              vertex(x-w*1.25, y-sinP3*1.5);
              vertex(x-w*1.75, y-sinP3*1.5);
              vertex(x-w*2,    y-sinP3*1  );
              vertex(x-w*1.75, y-sinP3*0.5);

              vertex(x-w*2,    y);

              vertex(x-w*1.75, y+sinP3*0.5);
              vertex(x-w*2,    y+sinP3*1  );
              vertex(x-w*1.75, y+sinP3*1.5);
              vertex(x-w*1.25, y+sinP3*1.5);
              vertex(x-w,      y+sinP3*2  );
              vertex(x-w/2,    y+sinP3*2  );
              vertex(x-cosP3,  y+sinP3*2.5);

              vertex(x+cosP3,  y+sinP3*2.5);
              vertex(x+w/2,    y+sinP3*2  );
              vertex(x+w,      y+sinP3*2  );
              vertex(x+w*1.25, y+sinP3*1.5);
              vertex(x+w*1.75, y+sinP3*1.5);
              vertex(x+w*2,    y+sinP3*1  );
              vertex(x+w*1.75, y+sinP3*0.5);

              vertex(x+w*2,    y);

              vertex(x+w*1.75, y-sinP3*0.5);
              vertex(x+w*2,    y-sinP3*1  );
              vertex(x+w*1.75, y-sinP3*1.5);
              vertex(x+w*1.25, y-sinP3*1.5);
              vertex(x+w,      y-sinP3*2  );
              vertex(x+w/2,    y-sinP3*2  );
              vertex(x+cosP3,  y-sinP3*2.5);

            endShape(CLOSE);

          }

        };
        function drawClicked(){



        };

        this.active=this.hit &&
                    app.focus===this;
        this.lines=[];
        this.halos=[];

        pushMatrix();

          translate(this.x, this.y);

            stroke(31);
            noFill();
            fill(232);
            // noStroke();

            rect(this.x,   this.y,
                 this.w-1, this.h-1);

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

        var ctrls=this.controls;

        for(var r in ctrls){
          for(var c in ctrls[r]){

            ctrls[r][c].out();

          }
        }

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

        this.points       = [];
        this.dpoints      = [];
        this.hpoints      = [];

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

        this.enabled      = true;

        this.halo         = false;
        this.line         = false;

        this.clickRadius  = 0;

        // this.hover        = false;
        // this.tTime        = 0;
        this.timer        = this.tTime;

        var p=this;

        /* Initialize */
        function reset(){

          var d2=p.w/2;  // Half diameter

          var pt=0;
          var ang=0;

          // if(app.orientation===ORIENTATIONS.POINTY){
            // ang=30;
          // }

          for(pt=0; pt<6; pt++){
            p.points.push(new pnt( cos(radians(ang+pt*60))*(d2-8),
                                   sin(radians(ang+pt*60))*(d2-8) ));
          }

          for(pt=0; pt<8; pt++){
            p.dpoints.push(new pnt( cos(radians(ang+pt*60))*(d2-1),
                                    sin(radians(ang+pt*60))*(d2-1) ));
          }

          for(pt=0; pt<6; pt++){
            p.hpoints.push(new pnt( cos(radians(ang+pt*60))*(d2-3),
                                    sin(radians(ang+pt*60))*(d2-3) ));
          }

        };

        reset();

      };
      hexCell.prototype=Object.create(control.prototype);
      hexCell.prototype.draw=function(){

        this.active=this.hit &&
                    app.focus===this &&
                    this.style!==HEXY_SYMBOLS.BLANK;

        var offset=0;
        var p=this;

        if(this.active && this.hit){
          if(app.left){ this.offset=1; }
          cursor(this.cursor);
        }

// var HEXY_SYMBOLS={

  // Double up the \ character because it is an escape character and the first one won't be recognised

  // BLANK:            '.',
  // BLACK:            'o',
  // BLACK_REVEALED:   'O',
  // BLUE:             'x',
  // BLUE_REVEALED:    'X',
  // DOWN_RIGHT:       '\\',
  // DOWN_CENTER:      '|',
  // DOWN_LEFT:        '/',

  // BLANK:            '.',
  // NUMBER:           '+',
  // CONSECUTIVE:      'c',
  // NOT_CONSECUTIVE:  'n'

        function highlight(){

          if(p.layout===HEXY_SYMBOLS.BLACK ||
             p.layout===HEXY_SYMBOLS.BLACK_REVEALED ||
             p.layout===HEXY_SYMBOLS.BLUE ||
             p.layout===HEXY_SYMBOLS.BLUE_REVEALED){

            noStroke();
            fill(CLRS.WHITE);

            beginShape();

              for(var pt in p.dpoints){
                vertex(p.dpoints[pt].x-0.5,
                       p.dpoints[pt].y-0.5);
              }

            endShape(CLOSE);

          }

        };
        function outerHexagon(){

          noStroke();

          switch(p.layout){

            case HEXY_SYMBOLS.BLACK:          fill(CLRS.H_ORANGE);  break;
            case HEXY_SYMBOLS.BLUE:           fill(CLRS.H_ORANGE);  break;
            case HEXY_SYMBOLS.BLACK_REVEALED: fill(CLRS.H_BLACK);   break;
            case HEXY_SYMBOLS.BLUE_REVEALED:  fill(CLRS.H_BLUE);    break;

            default:                          noFill();
                                              stroke(CLRS.BLACK);
                                              strokeWeight(0.125);  break;

          }

          var offset=0;

          if(p.timer>0 &&
             p.dirty===false){
            offset=random(0,1.5);
            p.timer--;
            if(p.timer<=0){ p.dirty=true; }

          }

          beginShape();

            for(var pt in p.hpoints){
              vertex(p.hpoints[pt].x+offset,
                     p.hpoints[pt].y+offset);
            }

          endShape(CLOSE);

        };
        function innerHexagon(){

            noStroke();

            switch(p.layout){

              case HEXY_SYMBOLS.BLACK:          fill(CLRS.H_ORANGE_L);  break;
              case HEXY_SYMBOLS.BLUE:           fill(CLRS.H_ORANGE_L);  break;
              case HEXY_SYMBOLS.BLACK_REVEALED: fill(CLRS.H_BLACK_L);   break;
              case HEXY_SYMBOLS.BLUE_REVEALED:  fill(CLRS.H_BLUE_L);    break;

              default:                          noFill();               break;

            }

            beginShape();

              for(var pt in p.points){
                vertex(p.points[pt].x,
                       p.points[pt].y);
              }

            endShape(CLOSE);

        };
        function caption(){

          function wrapText(n){

            var retVal=n;

            if      (p.text===HEXY_SYMBOLS.CONSECUTIVE    ){ retVal="{" + retVal + "}"; }
            else if (p.text===HEXY_SYMBOLS.NOT_CONSECUTIVE){ retVal="-" + retVal + "-"; }

            return retVal;

          };

          pushMatrix();

            scale(1,-1);

              textFont(p.font,16);
              textSize(14);
              textAlign(CENTER,CENTER);

              switch(p.layout){

                case HEXY_SYMBOLS.BLANK:            /*  Blank never has text            */
                                                    break;

                case HEXY_SYMBOLS.BLACK:            /*  Black never has text            */
                                                    break;

                case HEXY_SYMBOLS.BLUE:             /*  Blue never has text             */
                                                    break;

                case HEXY_SYMBOLS.BLACK_REVEALED:   /*  Black revealed always has text  */
                                                    fill(CLRS.WHITE);

                                                    if(!p.enabled){ fill(getColor(CLRS.WHITE,25)); }
                                                    
                                                    if(p.text===HEXY_SYMBOLS.BLANK){ text('?',0,0);               }
                                                    else                           { text(wrapText(p.count),0,0); }

                                                    break;

                case HEXY_SYMBOLS.BLUE_REVEALED:    /* Blue revealed has text with number symbol */
                                                    if(p.text===HEXY_SYMBOLS.NUMBER){
                                                      
                                                      fill(CLRS.WHITE);
                                                      if(!p.enabled){ fill(getColor(CLRS.WHITE,25)); }
                                                      
                                                      text(wrapText(p.count),0,0);
                                                      
                                                    }

                                                    break;

                case HEXY_SYMBOLS.DOWN_CENTER:      /* Always has text */
                                                    if(p.text!==HEXY_SYMBOLS.BLANK){
                                                      
                                                      textAlign(CENTER,TOP);                                                      
                                                      rotate(0);
                                                      
                                                      fill(CLRS.BLACK);
                                                      if(!p.enabled){ fill(getColor(CLRS.BLACK,25)); }
                                                      
                                                      text(wrapText(p.count),0,0);
                                                      
                                                    }

                                                    break;

                case HEXY_SYMBOLS.DOWN_LEFT:        /* Always has text */
                                                    if(p.text!==HEXY_SYMBOLS.BLANK){
                                                      
                                                      textAlign(CENTER,TOP);
                                                      rotate(PI/3);
                                                      
                                                      fill(CLRS.BLACK);
                                                      if(!p.enabled){ fill(getColor(CLRS.BLACK,25)); }
                                                      
                                                      text(wrapText(p.count),0,0);
                                                    }

                                                    break;

                case HEXY_SYMBOLS.DOWN_RIGHT:       /* Always has text */
                                                    if(p.text!==HEXY_SYMBOLS.BLANK){
                                                      
                                                      textAlign(CENTER,TOP);
                                                      rotate(-PI/3);
                                                      
                                                      fill(CLRS.BLACK);
                                                      if(!p.enabled){ fill(getColor(CLRS.BLACK,25)); }
                                                      
                                                      text(wrapText(p.count),0,0);

                                                    }

                                                    break;

                default:                            break;

              }

          popMatrix();

        };
        function activeCell(){

          if(p.hit &&
             (p.layout===HEXY_SYMBOLS.BLUE ||
              p.layout===HEXY_SYMBOLS.BLACK)){

            noStroke();
            fill(getColor(CLRS.BLACK,15));

            /** Hexagon */
            beginShape();

              for(var pt in p.hpoints){
                vertex(p.hpoints[pt].x,
                       p.hpoints[pt].y);
              }

            endShape(CLOSE);

          }

        };

        function drawLinks(){

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
            
        noStroke();

        pushMatrix();

          translate(this.x, this.y);

          scale(1,-1);

            highlight();
            outerHexagon();
            innerHexagon();
            caption();
            activeCell();

            if(this.clickRadius>0){

              noStroke();

              fill(CLRS.H_ORANGE_L);

              var w=this.clickRadius/2;

              rotate(radians(this.clickRadius)*3);

              beginShape();

                for(var pt=0; pt<6; pt++){
                  vertex(cos(radians(pt*60))*w,
                         sin(radians(pt*60))*w );
                }

              endShape();

              this.clickRadius-=5;

              // var offset=HEX_SIZE-this.clickRadius;

              // triangle(0,                -offset,
                       // this.points[0].x, this.points[0].y-offset,
                       // this.points[1].x, this.points[1].y-offset);

              // triangle(0,                +offset,
                       // this.points[1].x, this.points[1].y+offset,
                       // this.points[2].x, this.points[2].y+offset);

              // triangle(0,                -offset,
                       // this.points[2].x, this.points[2].y-offset,
                       // this.points[3].x, this.points[3].y-offset);

              // triangle(0,                +offset,
                       // this.points[3].x, this.points[3].y+offset,
                       // this.points[4].x, this.points[4].y+offset);

              // triangle(0,                -offset,
                       // this.points[4].x, this.points[4].y-offset,
                       // this.points[5].x, this.points[5].y-offset);

              // triangle(0,                +offset,
                       // this.points[5].x, this.points[5].y+offset,
                       // this.points[0].x, this.points[0].y+offset);

              // this.clickRadius-=1;

            }

        popMatrix();

        // drawLinks();

      };
      hexCell.prototype.hitTest=function(x,y){

        var rectHit=rectangleHit(new pnt(this.x+this.dpoints[1].x+x, this.y+this.dpoints[1].y+y),
                                 new pnt(this.x+this.dpoints[2].x+x, this.y+this.dpoints[2].y+y),
                                 new pnt(this.x+this.dpoints[4].x+x, this.y+this.dpoints[4].y+y),
                                 mouseX, mouseY);

        var triHit0=triangleHit( new pnt(this.x+this.dpoints[0].x+x, this.y+this.dpoints[0].y+y),
                                 new pnt(this.x+this.dpoints[1].x+x, this.y+this.dpoints[1].y+y),
                                 new pnt(this.x+this.dpoints[5].x+x, this.y+this.dpoints[5].y+y),
                                 mouseX, mouseY);

        var triHit1=triangleHit( new pnt(this.x+this.dpoints[2].x+x, this.y+this.dpoints[2].y+y),
                                 new pnt(this.x+this.dpoints[3].x+x, this.y+this.dpoints[3].y+y),
                                 new pnt(this.x+this.dpoints[4].x+x, this.y+this.dpoints[4].y+y),
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

        // if(this.parent.hit){

          if(this.outerHitTest(x,y)){

            this.outerHit=true;

            if(this.hitTest(x,y)){ this.hit=true;
                                   app.focus=this;
                                   this.parent.activeCell=this;
                                   if(this.layout===1 &&
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

          this.hover=false;

        // }

      };
      hexCell.prototype.clicked=function(){

        if(this.active){

          { // Toggle Halo display
            
            if(this.layout===HEXY_SYMBOLS.BLUE_REVEALED &&
               this.text  ===HEXY_SYMBOLS.NUMBER){
              this.halo=!this.halo;
            }
               
          }

          { //  Toggle Line Display

            if(this.layout===HEXY_SYMBOLS.DOWN_CENTER ||
               this.layout===HEXY_SYMBOLS.DOWN_LEFT ||
               this.layout===HEXY_SYMBOLS.DOWN_RIGHT){
              this.line=!this.line;
            }

          }

          if(this.layout===HEXY_SYMBOLS.BLUE){

            this.layout=HEXY_SYMBOLS.BLUE_REVEALED;

            this.clickRadius=HEX_SIZE-10;

          }
          else if(this.layout===HEXY_SYMBOLS.BLACK){
            app.errors++;
          }

          // this.execute(this.id);

        }

      };
      hexCell.prototype.rclicked=function(){

        if(this.active){

          if(this.layout!==HEXY_SYMBOLS.BLUE &&
             this.layout!==HEXY_SYMBOLS.BLACK){
            this.enabled=!this.enabled;
          }

          if(this.layout===HEXY_SYMBOLS.BLACK){

            this.layout=HEXY_SYMBOLS.BLACK_REVEALED;

            this.clickRadius=HEX_SIZE-10;

          }
          else if(this.layout===HEXY_SYMBOLS.BLUE){
            app.errors++;
          }
          
          // Should the line automatically be dismissed when the cell is disabled?
          // this.line=false;

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
      rt.controls.push(new hexBoard(200, rt, 0, 0, 600, 600,
        {font:      'sans-serif',
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
      var telem=new telemetry(500, rt, width-195, 5, 190, height-10,
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

    // background(16);

    forEach(app.controls,'draw');

    if(app.gameOver){

      // fill(getColor(CLRS.GREEN, frameCount%255));
      fill(getColor(CLRS.GREEN, 50));
      textAlign(CENTER,CENTER);
      textFont(sansFont,100);
      text('Game Over', 300, 300);

    }

    textSize(20);
    textAlign(CENTER,CENTER);
    fill(CLRS.BLACK);

      text('Remaining',   520,460);
      text('Mistakes',    520,530);

    textSize(36);

      text(app.remaining, 520,490);
      text(app.errors,    520,560);

    textFont(sansFont,64);
    // textSize(64);
    fill(getColor(CLRS.BLACK,15));

      pushMatrix();

        translate(34,300);
        rotate(PI/2);

          text('Level 3-1', 0, 0);

      popMatrix();

    textSize(24);
    textAlign(CENTER,CENTER);
    fill(CLRS.RED);

      text(app.puzzle, 30, 30);

    if(app.remaining===0 &&
       app.covered  ===0){

      fill(CLRS.GREEN);

      textSize(64);
      textAlign(CENTER,CENTER);

        text('Game Over', 300,100);

    }

  };

  var execute;

  initialize();

  execute=play;

  app.focus=app.hexBoard;

  // globalFRate=this.__frameRate;

  strokeJoin(MITER);
  strokeCap(SQUARE);

  /*
    var HEXY_SYMBOLS={

      // Double up the \ character because it is an escape character and the first one won't be recognised

      BLANK:            '.',
      BLACK:            'o',
      BLACK_REVEALED:   'O',
      BLUE:             'x',
      BLUE_REVEALED:    'X',
      DOWN_RIGHT:       '\\',
      DOWN_CENTER:      '|',
      DOWN_LEFT:        '/',

      BLANK:            '.',
      NUMBER:           '+',
      CONSECUTIVE:      'c',
      NOT_CONSECUTIVE:  'n'

    };

  */

  /** Testing *.hexcell file format ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

      var f="................................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.";

      // var f="............................|+..............|+......|+..................................|+..........|+../+..............|+......................o...o...o...x...x...x...x...o+..o+..o+..x.......................x...x...o+..x+..x...o+..x...on..oc..oc..o+..x...................o+..o+..on..o...x...o+..x...o...x...x...x...x...o...............|+..o...o+..x...x+..x...o...o+..oc..x...x...x...x+..|+..............o+..o...x...x+..o...o+..o+..o+..x...x...o+..x...x...............x...x...x...oc..x...on..o+..x...x...x+..o+..on..o+..o+..........o...o+..o...o...o.......x+..o+..o+......x...x...x...o+..o.......\\+..x...on..on..o+..........o+..o+..........x...o...o...o+..........o...x...oc..x...o.......x...o+..x...|n..o+..x...x...x...x...........x+..x...o+..x...x...x+..x...o+..x+..o...x...o+..o+..o...........x...o+..x...oc..o...o+..x...x...x...x...o...o...o+..on..o+..........o+..x...o...o+..on..o+..o...o+..o...x+..o...o+..x...o+..........o...o...o...o+..oc..x...o+..On..o+..x...o+..x+..on..o...x...........o+..x...x...x...o+..x...o...x...o...o...o...x...o+..o+..........x+..x...x.......x...oc..x.......x...o...o.......o...x...x...........on..o+..........o...oc../+..|+..x+..x...........o...o+..........o...x...on......x...o...o+..|n..x...x...x.......x...o...o+..........o...x...o+..x...o...oc..x...x...x...o+..o...o...o...x...........x...x+..o+..x...o+..x...o+..On..oc..o+..x...o...o+..oc..o...........x...o+..o...x+..o+..x...x...o+..o+..o...o+..oc..o...x...........o...x+..x...oc..o+..x...x...o+..o+..o...x...oc..x...o+..x...........o...o...o+..o...o+..o...o...o...x...x...o+..x...o+..o+..........x...x...o+..o+..o+......o+..on..x.......o+..x...o...o...x...........o+..on..o+..x...|+......x...x.......|n..on..x...x...oc..........o...on..oc..x+..x...|n..o+..o+..x.......o+..o+..x+..o+..x...........o+..x...o...oc..on..x...o+..x...x...x...x...x...o...x...............o+..x...x+..o...x...o...x...x...o+..o+..x...o+..o+..................o...x...oc..x+..oc..x...o+..o+..o+..on..on..x+..................o+..x...x...o...oc..o...oc..o...o...o+..o+..x+..o+..................o+..x...o+..x+..o...x...o...o+..x...x...o+..x.......................o...o...x...x...x...x...o...o...o...x...o+............";

      var first='';
      var secnd='';

      for(var n=0; n<f.length; n+=2){

        first+=f.substring(  n, n+1);
        secnd+=f.substring(n+1, n+2);

      }

// print(f.length);

// print(first);
// print(first.length);

// print(secnd);
// print(secnd.length);

      var arrFirst=[];
      var arrSecond=[];

      for(var n=0; n<first.length; n+=13){

        arrFirst.push( split(first.substring(n, n+13),''));
        arrSecond.push(split(secnd.substring(n, n+13),''));

      }

  for(var row=0; row<arrFirst.length; row++){
    // print(arrFirst[row]);
  }

// print(arrFirst.length);

// print(arrSecond);
// print(arrSecond.length);
// print(arrSecond.length);

  /** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */



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

          case app.keys[KEYCODES.LEFT] ||
               app.keys[KEYCODES.A]:          decrementPuzzle();        break;    /* LEFT or A        */
          case app.keys[KEYCODES.RIGHT] ||
               app.keys[KEYCODES.D]:          incrementPuzzle();        break;    /* RIGHT or D       */

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
    keyTyped=function()   { /* print('typed ' + (key) + ' ' + keyCode); */  };
    keyReleased=function(){ app.keys[keyCode]=false;                          };

  }

  /* Mouse Events ============================================================== */
  {

    mouseClicked=function(){

      // if(app.orientation===ORIENTATIONS.FLAT){
        // app.orientation=ORIENTATIONS.POINTY;
        // app.hexBoard.reset();
        // print('pointy');
      // }
      // else{
        // app.orientation=ORIENTATIONS.FLAT;
        // app.hexBoard.reset();
        // print('flat');
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

      // app.dragging=false;

      // forEach(app.controls,'out');

      // app.focus=-1;

    };
    mouseOver=function(){

      // forEach(app.controls,'over');
      // app.focus=-2;

    };

  }
































































/*

..........................
......................|+..
............o...o...o...x.
..........x...x...o+..x+..
........o+..o+..on..o...x.
......|+..o...o+..x...x+..
........o+..o...x...x+..o.
......x...x...x...oc..x...
....o...o+..o...o...o.....
..\\+..x...on..on..o+.....
....o...x...oc..x...o.....
......x+..x...o+..x...x...
....x...o+..x...oc..o...o+

......o+..x...o...o+..on..
....o...o...o...o+..oc..x.
......o+..x...x...x...o+..
....x+..x...x.......x...oc
......on..o+..........o...
....o...x...on......x...o.
......o...x...o+..x...o...
....x...x+..o+..x...o+..x.
......x...o+..o...x+..o+..
....o...x+..x...oc..o+..x.
......o...o...o+..o...o+..
....x...x...o+..o+..o+....
......o+..on..o+..x...|+..

Hexcells level v1
A Giant Scoop of Vanilla #3
mathgrant

............................|+..............|+......|+............
......................|+..........|+../+..............|+..........
............o...o...o...x...x...x...x...o+..o+..o+..x.............
..........x...x...o+..x+..x...o+..x...on..oc..oc..o+..x...........
........o+..o+..on..o...x...o+..x...o...x...x...x...x...o.........
......|+..o...o+..x...x+..x...o...o+..oc..x...x...x...x+..|+......
........o+..o...x...x+..o...o+..o+..o+..x...x...o+..x...x.........
......x...x...x...oc..x...on..o+..x...x...x+..o+..on..o+..o+......
....o...o+..o...o...o.......x+..o+..o+......x...x...x...o+..o.....
..\\+..x...on..on..o+..........o+..o+..........x...o...o...o+......
....o...x...oc..x...o.......x...o+..x...|n..o+..x...x...x...x.....
......x+..x...o+..x...x...x+..x...o+..x+..o...x...o+..o+..o.......
....x...o+..x...oc..o...o+..x...x...x...x...o...o...o+..on..o+....
......o+..x...o...o+..on..o+..o...o+..o...x+..o...o+..x...o+......
....o...o...o...o+..oc..x...o+..On..o+..x...o+..x+..on..o...x.....
......o+..x...x...x...o+..x...o...x...o...o...o...x...o+..o+......
....x+..x...x.......x...oc..x.......x...o...o.......o...x...x.....
......on..o+..........o...oc../+..|+..x+..x...........o...o+......
....o...x...on......x...o...o+..|n..x...x...x.......x...o...o+....
......o...x...o+..x...o...oc..x...x...x...o+..o...o...o...x.......
....x...x+..o+..x...o+..x...o+..On..oc..o+..x...o...o+..oc..o.....
......x...o+..o...x+..o+..x...x...o+..o+..o...o+..oc..o...x.......
....o...x+..x...oc..o+..x...x...o+..o+..o...x...oc..x...o+..x.....
......o...o...o+..o...o+..o...o...o...x...x...o+..x...o+..o+......
....x...x...o+..o+..o+......o+..on..x.......o+..x...o...o...x.....
......o+..on..o+..x...|+......x...x.......|n..on..x...x...oc......
....o...on..oc..x+..x...|n..o+..o+..x.......o+..o+..x+..o+..x.....
......o+..x...o...oc..on..x...o+..x...x...x...x...x...o...x.......
........o+..x...x+..o...x...o...x...x...o+..o+..x...o+..o+........
..........o...x...oc..x+..oc..x...o+..o+..o+..on..on..x+..........
........o+..x...x...o...oc..o...oc..o...o...o+..o+..x+..o+........
..........o+..x...o+..x+..o...x...o...o+..x...x...o+..x...........
............o...o...x...x...x...x...o...o...o...x...o+............

*/


/**

1729 = 10^3+9^3 = 12^3+1^3
hexy.js

*/

}};
