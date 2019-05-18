{
  /**  Whitelist
   * 
*
+stackoverflow.com
+khanacademy.org
+codecogs.com/latex/eqneditor.php
+youtube.com
+mail.google.com
+bradsiemens.com
+processingjs.org
+processing.org
forum.processing.org
+wikipedia.org
+google.com
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
+developer.mozilla.org
+docs.oracle.com
+www.mathopenref.com
+alpha.editor.p5js.org
+en.wikibooks.org
+upload.wikimedia.org
+viterbipk12.usc.edu

*/
}

{/*

  TO DO:

    - update control locations on resize();

    - inplement redraw() as necessary

    - complete mouse drag columns

    - compete against the genetic algorithm
    - compete against the AI

    - shuffle button
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

    - rotation of each node
    - rotation of each ring

    - color coded outer hexagon to indicate patterns

    - AI puzzle solving

    - puzzle completion animations

    - move object

    - Undo/Redo stack

        - ctrl+z
        - ctrl+y

  TO DONE:

    - run button

    - reset button
    
    - initial color and current color

    - active cell rollover edge of grid (top/bottom - right/left, etc)

    - reference to the center node

    - start drag x/y

    - determine how to pass a color as a parameter



  Research:

    print(getURLParams()); - test when this goes live

  Cursors:

    ARROW, CROSS, HAND, MOVE, TEXT, or WAIT

**/}

{

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

    var CONSTANTS={
      DEGREES:        '°',
      PI:             'π',
      TRIANGLE_UP:    '▲',
      TRIANGLE_DOWN:  '▼',
      INFINITY:       '∞',
      THETA:          'θ',
      RADIANS:        'ᶜ',
      IDENTICAL:      '≡',
      TRIANGLE_R:     '►',
      TRIANGLE_L:     '◄',
      SIGMA:          'Σ',
      NOTE:           '♫'
    }

  }

  function preload(){

    // myFont = loadFont('http://fonts.googleapis.com/css?family=Walter+Turncoat&.css');

  }

    var data=[
              [204,568],[545,333],[229,425],[289,379],[275,275],
              [442,503],[169,401],[456, 82],[528,433],[607,460],
              [182,212],[319,502],[552,164],[362,393],[625,215],
              [195,472],[551,538],[255,392],[248,345],[605,416],
              [484,128],[470,382],[491, 58],[466,522],[666,489],
              [159,387],[599,233],[153,207],[354,327],[432, 77],
              [422,467],[554,325],[377,550],[210,110],[699,463],
              [536,241],[408, 98],[656,102],[469 ,38],[516,213],
              [653,128],[642, 45],[428,240],[672,235],[162,420],
              [448,490],[267, 46],[692,293],[504,132],[303,534],
              [458,327],[664,550],[341,481],[462, 33],[193,574],
              [404,504],[382,208],[433,354],[673,146],[635,317],
              [338, 42],[704,447],[503,560],[294,503],[228,325],
              [309,159],[480,546],[564, 85],[175,380],[264,509],
              [183,553],[204,392],[479,512],[536,440],[409,119],
              [603,260],[422,129],[344,408],[653,335],[463,308],
              [495,427],[578,121],[397,336],[432,324],[635,259],
              [351,465],[481,541],[268,447],[612,390],[698,162],
              [163,270],[655,328],[513,249],[316,198],[568,436],
              [673,198],[454,154],[185, 53],[441,240],[262,462]
            ];

var cnv;

  function setup(){

    //  Set a global reference to the canvas
    cnv=createCanvas(windowWidth-10, windowHeight-10);

    //  Settings
    frameRate(70);

    noCursor();

    textFont('sans-serif',12);

    cursor(WAIT);

    strokeCap(SQUARE);
    strokeJoin(MITER);

    angleMode='radians';
    // rectMode(CORNERS);
    
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

      this.startTime      = millis();

      this.elapsedTime    = 0;

    }

    /* TSP Specific       ------------------ */
    {

      // this.greedyMethod       = GREEDYMETHODS.FURTHEST;
      this.greedyMethod       = GREEDYMETHODS.CLOSEST;
      // this.greedyMethod       = GREEDYMETHODS.RANDOM;

      // this.algorithm          = ALGORITHMS.GROW;
      // this.algorithm          = ALGORITHMS.GREEDY;
      // this.algorithm          = ALGORITHMS.BRUTEFORCE;
      // this.algorithm          = ALGORITHMS.SIMULATEDANNEALING;
      // this.algorithm          = ALGORITHMS.NEAREST;
      // app.algorithm          = ALGORITHMS.ITERATE;        

      // this.algorithm          = ALGORITHMS.ANTCOLONY;
      // this.algorithm          = ALGORITHMS.GENETIC;

      
      this.algorithm      = ALGORITHMS.GREEDY;

      // this.greedyMethod   = GREEDYMETHODS.RANDOM;

      this.nodes          = 300;                //  Total # of nodes to be connected

      this.menu;
      this.clock;
      this.music;
      this.reset;

      this.musicOn        = true;

      this.finished       = false;

      // this.animations     = [];

      this.currentNode    = null;

      this.field          = null;

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

      function getRunning()         { return app.running;                                             };
      function toggleRunning()      { app.running=!app.running;                                       };

      function menu()               {};

    }

    

    function reset()                {

      app.controlCount=app.controls.length+1;
      app.field.reset();
      app.startTime=millis();
      app.elapsedTime=0;
      app.running=false;
      
    };

    function factorial(n){

      var total = 1;
  
      for (var i=2; i<=n; i++) {
        total*=i;      
      }
  
      return total;
  
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

        for(var h in app.field.selected){

          if(app.field.selected[h].dragging){

            ellipse(app.field.selected[h].x,
                    app.field.selected[h].y,
                    30,30);

          }

// print(app.field.selected[h].y);
// print('drawDragColumn' +" | " + app.field.selected.length);

        }

      };

      // Dragging ----------
      function setDragColumn()      {

        var cell=app.field.activeCell;

        while(cell.top!==null &&
              cell.top.layout!==BLANK){

          cell=cell.top;

        }

        while(cell.bottom!==null &&
              cell.bottom.layout!==BLANK){

          app.field.selected.push(cell);
          cell.dragging=true;
          cell=cell.bottom;

        }

        app.field.selected.push(cell);
        cell.dragging=true;

      };
      function setDragBackward()    {

        var cell=app.field.activeCell;

        while(cell.topRight!==null &&
              cell.topRight.layout!==BLANK){

          cell=cell.topRight;

        }

        while(cell.bottomLeft!==null &&
              cell.bottomLeft.layout!==BLANK){

          app.field.selected.push(cell);
          cell.dragging=true;
          cell=cell.bottomLeft;

        }

        app.field.selected.push(cell);
        cell.dragging=true;

      };
      function setDragForward()     {

        var cell=app.field.activeCell;

        while(cell.topLeft!==null &&
              cell.topLeft.layout!==BLANK){

          cell=cell.topLeft;

        }

        while(cell.bottomRight!==null &&
              cell.bottomRight.layout!==BLANK){

          app.field.selected.push(cell);
          cell.dragging=true;
          cell=cell.bottomRight;

        }

        app.field.selected.push(cell);
        cell.dragging=true;

      };

      // Move Columns ----------
      function colUp()              {

        var cell=app.field.activeCell;

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

        app.field.totalMoves++;

      };
      function colDown()            {

        var cell=app.field.activeCell;

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

        app.field.totalMoves++;

      };

      function colUpRight()         {

        var cell=app.field.activeCell;

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

        app.field.totalMoves++;

      };
      function colUpLeft()          {

        var cell=app.field.activeCell;

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

        app.field.totalMoves++;

      };

      function colDownRight()       {

        var cell=app.field.activeCell;

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

        app.field.totalMoves++;

      };
      function colDownLeft()        {

        var cell=app.field.activeCell;

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

        app.field.totalMoves++;

      };


      // Move Active Cell ----------
      function up()                 {

        if(app.field.activeCell.top!==null &&
           app.field.activeCell.top.layout!==0){

          app.field.activeCell = app.field.activeCell.top;

        }
        else{

          while(app.field.activeCell.bottom!==null &&
                app.field.activeCell.bottom.layout!==0){

            app.field.activeCell = app.field.activeCell.bottom;

          }

        }

      };
      function down()               {

        if(app.field.activeCell.bottom!==null &&
           app.field.activeCell.bottom.layout!==0){

          app.field.activeCell = app.field.activeCell.bottom;

        }
        else{

          while(app.field.activeCell.top!==null &&
                app.field.activeCell.top.layout!==0){

            app.field.activeCell = app.field.activeCell.top;

          }

        }

      };

      function upRight()            {

        if(app.field.activeCell.topRight!==null &&
           app.field.activeCell.topRight.layout!==0){

          app.field.activeCell = app.field.activeCell.topRight;

        }
        else{

          while(app.field.activeCell.bottomLeft!==null &&
                app.field.activeCell.bottomLeft.layout!==0){

            app.field.activeCell = app.field.activeCell.bottomLeft;

          }

        }

      };
      function upLeft()             {

        if(app.field.activeCell.topLeft!==null &&
           app.field.activeCell.topLeft.layout!==0){

          app.field.activeCell = app.field.activeCell.topLeft;

        }
        else{

          while(app.field.activeCell.bottomRight!==null &&
                app.field.activeCell.bottomRight.layout!==0){

            app.field.activeCell = app.field.activeCell.bottomRight;

          }

        }

      };

      function downRight()          {

        if(app.field.activeCell.bottomRight!==null &&
           app.field.activeCell.bottomRight.layout!==0){

          app.field.activeCell = app.field.activeCell.bottomRight;

        }
        else{

          while(app.field.activeCell.topLeft!==null &&
                app.field.activeCell.topLeft.layout!==0){

            app.field.activeCell = app.field.activeCell.topLeft;

          }

        }

      };
      function downLeft()           {

        if(app.field.activeCell.bottomLeft!==null &&
           app.field.activeCell.bottomLeft.layout!==0){

          app.field.activeCell = app.field.activeCell.bottomLeft;

        }
        else{

          while(app.field.activeCell.topRight!==null &&
                app.field.activeCell.topRight.layout!==0){

            app.field.activeCell = app.field.activeCell.topRight;

          }

        }

      };

    }

    /** Control - default ------------------------------------------------ */
    {

      var control=function(id, parent, x, y, w, h){

        // app.controlCount++;

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

        if(mouseX>=(this.x+x) &&
           mouseX<=(this.x+x) + this.w &&
           mouseY>=(this.y+y) &&
           mouseY<=(this.y+y) + this.h){
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
      control.prototype.resized  = function(){ forEach(this.controls, 'resized');                  };
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
      root.prototype.draw        = function(){

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
      root.prototype.moved       = function(x,y){
      /* Required because root control doesn't have a parent */

          if(this.hitTest(this.x+x,this.y+y)){

            this.hit=true;
            app.focus=this;

            for(var c in this.controls){ this.controls[c].moved(this.x+x, this.y+y); }

          }
          else{

            this.hit=false;

            for(var c in this.controls){ this.controls[c].hit=false; }

          }

      };
      root.prototype.resized     = function(){

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

              if(app.field.activeCell!==null){ id=app.field.activeCell.id; }

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

    function swap(arr, n, m){

      var tmp=arr[n];

      arr[n]=arr[m];
      arr[m]=tmp;

    };

    function sortNodesByIndex(arr){

        for(var i=0; i<arr.length; i++){
          for(var j=0; j<arr.length; j++){
  
            if(abs(arr[j].id)>abs(arr[i].id)){
              swap(arr,i,j);
            }
  
          }
        }

        // return arr;

      };

    function arraySort(arr){
    // Sorts left to right base on x coordinate

      for(var i=0; i<arr.length; i++){
        for(var j=0; j<arr.length; j++){

          if(arr[j].x>arr[i].x){
            swap(arr,i,j);
          }

        }
      }

      // for(var n=0; n<arr.length; n++){
      //   print(arr[n].x);
      // }

    };

    function calculateConvexHull(arr, ind){
      
      var m=Infinity;
      var maxM=-Infinity;
      var maxIndex=-Infinity;

        for(var n=0; n<arr.length; n++){

          print(arr[n].x + "," + arr[n].y + "     -    " + degrees(atan2(arr[n].y,arr[n].x)));

        }

      print("Max Slope: " + maxM);
      print("Max Index: " + maxIndex);

      return maxIndex;

    };
    function sortByLength(arr){

      var sorted=[];

      arrayCopy(arr,sorted);

      for(var i=0; i<sorted.length-1; i++){

        sorted[i].distance=dist(sorted[i].x, sorted[i].y,
                                sorted[i+1].x, sorted[i+1].y);

      }

      for(var i=0; i<sorted.length; i++){
        for(var j=0; j<sorted.length-1; j++){

          if(sorted[i].distance > sorted[j].distance){
            swap(sorted,i,j);
          }

        }
      }

      return sorted[0].id;

// print(sorted[0].distance + ", " + sorted[sorted.length-1].distance);
      // var limit=ceil(pow(arr.length,1/2));  // Limit to the square root of the # of nodes

      // for(var m=1; m<limit+1; m++){
      //   nod.closest.push(sorted[m]);  
      // }

    };  
    function getLongest(arr){

      var distance=-1;
      var max=-1;
      var id=-1;

      for(var i=0; i<arr.length-1; i++){

        distance=dist(arr[i].x, arr[i].y,
                      arr[i+1].x, arr[i+1].y);

        if(distance>max){
          max=distance;
          id=i;
        }

      }
    
      return  id;

    };  

    function sortByX(arr){

      for(var i=0; i<arr.length; i++){
        for(var j=0; j<arr.length-1; j++){

          if(arr[i].x > arr[j].x){
            swap(arr,i,j);
          }

        }
      }

    };
    function sortByY(arr){

      for(var i=0; i<arr.length; i++){
        for(var j=0; j<arr.length-1; j++){

          if(arr[i].y > arr[j].y){
            swap(arr,i,j);
          }

        }
      }

    };
    function sortByLongest(arr){

      for(var i=0; i<arr.length-1; i++){

        arr[i].distance=dist(arr[i].x,   arr[i].y,
                             arr[i+1].x, arr[i+1].y);

      }

      for(var i=0; i<arr.length; i++){
        for(var j=0; j<arr.length-1; j++){

          if(arr[i].distance > arr[j].distance){
            swap(arr,i,j);
          }

        }
      }

    };  

    function renumberNodes(arr){

      for(var n=0; n<arr.length; n++){
        arr[n].id=n;
      }

    };

    function randomizeArray(arr){

      for(var n=0; n<arr.length; n++){
        swap(arr, n,round(random(arr.length-1)));
      }

    };

    /** Field        -------------------------------------------------- */
    {
var increment=0;
var cNode=0;
var completed=false;

    var HEX_SIZE=0;

      function field(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        /* ------------------------------------------------- */
        this.color              = props.color;

        /* ------------------------------------------------- */

        this.activeCell         = null;

        this.dirty              = false;    //  Has the field been clicked yet?

        app.field               = this;     //  Set a global field reference

        this.startX             = 0;        //  x-coordinate of drag start
        this.startY             = 0;        //  y-coordinate of drag start

        this.deltaX             = 0;        //  x-coordinate drag offset
        this.deltaY             = 0;        //  y-coordinate drag offset

        this.deltaDrag          = 0;        //  Distance dragged from start point along the drag direction

        this.cellSize           = 0;        //  Size of each node
        
        // ----------

        this.originalNodes      = [];       //  Original array of nodes

        this.sortedNodes        = [];       //  Sorted Original array of nodes
        this.bestNodes          = [];       //  Shortest path so far
        this.workingNodes       = [];       //  Path used to experiment
        this.historicNodes      = [];       //  Overall best path
        
        this.sourceNodes        = [];       //  Nodes to select from
        
        this.Intersections      = [];       //  node couples that intersect

        this.originalLength     = Infinity; //  Length of original path
        this.workingLength      = Infinity; //  Length of path being tested
        this.bestLength         = Infinity; //  Current best path length        
        this.historicLength     = Infinity; //  Best recorded overall
        this.greedyLength       = Infinity; //  Length of Greedy Path

        this.factor             = 1.1;

        this.reset();

        this.brSwitch           = false;

        this.loaded             = false;

        this.index              = 0;

        app.field               = this;

      };
      field.prototype=Object.create(control.prototype);
      field.prototype.reset        = function(){

        var p               = this;       //  Set a reference to the field control

        p.controls          = [];         //  Clear the controls array

        p.originalNodes     = [];
        p.sortedNodes       = [];
        p.bestNodes         = [];
        p.workingNodes      = [];
        p.sourceNodes       = [];

        p.Intersections     = [];

        p.originalLength    = Infinity;
        p.workingLength     = Infinity;
        p.bestLength        = Infinity;        
        p.historicLength    = Infinity;
        p.greedyLength      = Infinity;

        p.factor            = 1.1;
        p.loaded            = false;

        completed           = false;

        function load(){

          var nod;
          var x0=0;
          var y0=0;

          // for (var n=0; n<9; n++){
          for (var n=0; n<app.nodes; n++){

            // x0=data[n][0];
            // y0=data[n][1];
            
            x0=floor(random(150, p.w-20));
            y0=floor(random( 20, p.h-20));

            p.originalNodes.push(new node(n,
                                          this,
                                          x0,
                                          y0,
                                          5,
                                          5,
                                          {cursor:    HAND})
                                );
          }

          arrayCopy(p.originalNodes, p.bestNodes);
          // arrayCopy(p.originalNodes, p.workingNodes);
          // arrayCopy(p.originalNodes, p.sortedNodes);

          arrayCopy(p.originalNodes, p.sourceNodes);

        };

        load();

        function contains(i,arr){

          var retVal=false;

          for(var n=0; n<arr.length; n++){

            if(arr[n].id=i){              
               retVal=true;
               break;
            }

          }

          return retVal;

        };
      
        function sortByDistance(nod, arr){

          // var distance=Infinity;
          var sorted=[];

          arrayCopy(arr,sorted);

          for(var i=0; i<sorted.length; i++){

            sorted[i].distance=dist(nod.x, nod.y, sorted[i].x, sorted[i].y);

          }

          for(var i=0; i<sorted.length; i++){
            for(var j=0; j<sorted.length-1; j++){

              if(sorted[i].distance < sorted[j].distance){
                swap(sorted,i,j);
              }

            }
          }

          // var limit=ceil(pow(arr.length,1/2))+2;  // Limit to the square root of the # of nodes
          var limit=app.nodes;

          for(var m=1; m<limit; m++){
            nod.closest.push(sorted[m]);  
          }

        };

        function loadClosestNodes(){

          for(var n=0; n<p.originalNodes.length; n++){
            sortByDistance(p.originalNodes[n], p.originalNodes);
          }

        };

        loadClosestNodes();

        this.dirty=false;

        arraySort(p.sortedNodes);

      };
      field.prototype.draw         = function(){

        app.elapsedTime=(millis()-app.startTime)/1000;
        
          var p=this;

          this.active=this.hit &&
                      app.focus===this;

          if(this.active){ cursor(this.cursor); }

          function border()       {

            fill(p.color);

            if(p.hit){ fill(232); };

            stroke(getColor(H_BLUE,25));
            strokeWeight(1.5);

              rect(0, 0, p.w, p.h, 5);

          };

          {  // Misc

            function tourLength(arr){

              var len=0;
  
                for(var n=0; n<arr.length; n++){
  
                  if(n==arr.length-1){
                    len+=dist(arr[0].x,
                              arr[0].y,
                              arr[arr.length-1].x,
                              arr[arr.length-1].y);               
                  }
                  else{
                    len+=dist(arr[n].x,
                              arr[n].y,
                              arr[n+1].x,
                              arr[n+1].y);
                  }
  
                }
  
              return len;
  
            };

            function resortNodes(arr){
              // print(arr);
              var tempArray=[];
              
              tempArray[p.workingNodes.length];
  
              arrayCopy(p.workingNodes,tempArray);
  
              for(var n=0; n<arr.length; n++){
                tempArray[n]=p.workingNodes[arr[n]];
              }
  
              arrayCopy(tempArray,p.workingNodes);
              // print(p.workingNodes[1]);            
            };
            // function reverseNodes(arr){

            //   var newArray=[];
            //   var id=0;
  
            //   for(var n=0; n<arr.length; n++){
                
            //     newArray.push(arr[arr.length-1-n]);
            //     // newArray[n].id=id;
            //     id++;
  
            //   }
              
            //   arrayCopy(newArray, arr);
  
            //   // return arr;
  
            // };

            function reverseNodes(arr,index1,index2){

              if(index1>index2){
                var temp=index2;
                index2=index1;
                index1=temp;
              }

              while(index1!=index2){
                
                if(index1>index2){ break; }

                // print(index1 + ","+index2);
                swap(arr,index1,index2);
                index1++;
                index2--;
                
              }

            };

            function drawWorkingNodes() {
              
              forEach(p.workingNodes, 'draw');

            };
            function drawOriginalNodes(){
              
              forEach(p.originalNodes, 'draw');

            };
            function drawBestNodes()    {
              
              forEach(p.bestNodes, 'draw');

            };

            function drawOriginalPath() {

              stroke(128);
              strokeWeight(0.5);
              noFill();          

              beginShape();

                for(var n=0; n<p.originalNodes.length; n++){                
                  vertex(p.originalNodes[n].x, p.originalNodes[n].y);
                }

              endShape(CLOSE);

            };
            function drawBestPath()     {

              stroke(0,0,128);
              strokeWeight(0.5);
              noFill();          

              beginShape();
              
                for(var n=0; n<p.bestNodes.length; n++){                
                  vertex(p.bestNodes[n].x, p.bestNodes[n].y);
                }

              endShape(CLOSE);

            };
            function drawWorkingPath()  {

              stroke(128);
              strokeWeight(0.25);
              noFill();          

              beginShape();

                for(var n=0; n<p.workingNodes.length; n++){  

                  vertex(p.workingNodes[n].x, p.workingNodes[n].y);

                }

              endShape(CLOSE);

            };
            function drawSortedPath()   {

              stroke(0,128,0);
              strokeWeight(1);
              noFill();          

              // beginShape();
              
              //   for(var n=0; n<p.sortedNodes.length; n++){                
              //     vertex(p.sortedNodes[n].x, p.sortedNodes[n].y);
              //   }

              // endShape(CLOSE);

              for(var n=0; n<p.sortedNodes.length; n++){                
                line(p.sortedNodes[0].x, p.sortedNodes[0].y,
                     p.sortedNodes[n].x, p.sortedNodes[n].y);
              }

            };

            function swapByIndex(arr,n,m)    {

              swap(arr,n,m);

            }
            function swap2Length(id,arr){

              var rand1=id;
              var rand2=id;

              if(rand2>arr.length-1){
                rand2=0;
              }

              //  First Point
              while(rand2==rand1){
                rand2=round(random(arr.length-1));
              }

              swap(arr,id,arr[rand2].id);

            };
            function swap2Closest(arr)    {

              var tmp;
              var max=arr[0].closest.length-1;

              var rand0=round(random(max));
              
              var nod=arr[rand0];

              var rand1=round(random(max));
              var rand2=round(random(max));

              while(rand2==rand1){
                rand2=round(random(arr[rand0].closest.length-1));
              }
              
              rand1=nod.closest[rand1].id;
              rand2=nod.closest[rand2].id;

              swap(arr, rand2, rand1);

            };

            function swap2Random(arr)    {

              var tmp;
              var rand1=round(random(arr.length-1));
              var rand2=round(random(arr.length-1));

              while(rand2==rand1){
                rand2=round(random(arr.length-1));
              }

              swap(arr,rand1, rand2);

            };
            function swap2Consecutive(arr)    {

              var tmp;
              var rand1=round(random(arr.length-1));
              var rand2=rand1+1;

              if(rand2>=arr.length){
                rand2=0;
              }

              tmp=arr[rand1];

              arr[rand1]=arr[rand2];
              arr[rand2]=tmp;

            };
            function swap3Random(arr)    {

              var tmp;
              var rand1=round(random(arr.length-1));
              var rand2=round(random(arr.length-1));
              var rand3=round(random(arr.length-1));

              while(rand2==rand1){
                rand2=round(random(arr.length-1));
              }

              while(rand3==rand1 ||
                    rand3==rand2){
                rand3=round(random(arr.length-1));
              }

              tmp=arr[rand1];

              arr[rand1]=arr[rand2];
              arr[rand2]=arr[rand3];
              arr[rand3]=tmp;

            };
            function swap3Consecutive(arr)    {

              var tmp;
              var rand1=round(random(arr.length-1));
              var rand2=rand1+1;

              if(rand2>=arr.length){
                rand2=0;
              }

              var rand3=rand2+1;

              if(rand3>=arr.length){
                rand3=0;
              }

              tmp=arr[rand1];

              arr[rand1]=arr[rand2];
              arr[rand2]=arr[rand3];
              arr[rand3]=tmp;

            };
            function swap2Half(arr)    {

              var tmp;
              var rand1=round(random(arr.length-1));
              var rand2=rand1+1;

              if(rand2>=arr.length){
                rand2=0;
              }

              var rand3=round(random(arr.length-1));

              while(rand3==rand1 || rand3==rand2){
                rand3=round(random(arr.length-1));
              }

              tmp=arr[rand1];

              arr[rand1]=arr[rand2];
              arr[rand2]=arr[rand3];
              arr[rand3]=tmp;

            };

            function swap2Segments(arr, n)    {

              var tmp;
              var index1=n;
              var index2=index1+1;
              var index3=index2+1;

              if     (index2==arr.length  ){ index2=0; }
              else if(index2==arr.length+1){ index2=1; }

              var index3=index2+1;

              if     (index3==arr.length  ){ index3=0; }
              else if(index3==arr.length+1){ index3=1; }

              tmp=arr[index1];

              arr[index1]=arr[index2];
              arr[index2]=arr[index3];
              arr[index3]=tmp;

              // print(index1 + ","+index2+","+index3);
            };

          }

          function nodePermutations(n, arr){

            //  c is an encoding of the stack state.
            //  c[k] encodes the for-loop counter for
            //  when generate(k+1, A) is called.
            var c=[];
            var bestLength=Infinity;
            var pLength=tourLength(p.originalNodes);
            var counter=1;

            for(var i=0; i<n; i++){
              c[i]=0;
            }
        
            // i acts similarly to the stack pointer
            var i=0;

            while(i<n){

              pLength=tourLength(p.originalNodes);

              if(pLength<bestLength){

                bestLength=pLength;
                arrayCopy(p.originalNodes, p.bestNodes);

              }

              if(c[i]<i){
        
                counter++;

                if(i%2==0){ swap(arr,    0, i); }
                else      { swap(arr, c[i], i); }

                //  Swap has occurred ending the for-loop.
                //  Simulate the increment of the for-loop counter
                c[i]++;
        
                //  Simulate recursive call reaching the base case by
                //  bringing the pointer to the base case analog in the array
                i=0;
        
              }
              else{
                  
                //  Calling generate(i+1, A) has ended as the for-loop terminated.
                //  Reset the state and simulate popping the stack by incrementing the pointer.
                c[i]=0;
                i++;
        
              }

            }
            
            p.bestLength=bestLength;

          }

          function bruteForce(){

            if(!p.bfSwitch){
              nodePermutations(p.originalNodes.length, p.originalNodes);
              p.bfSwitch=true;
            }

            if(app.elapsedTime<10){
              swap3Consecutive(p.workingNodes);
              drawWorkingNodes();
              drawWorkingPath();
              drawBestPath();
            }
            else{
              drawBestPath();
              drawBestNodes();
            }

            drawWorkingNodes();
            drawWorkingPath();

          };
          function genetic(){

          };
          function critters(){

          };

          function findClosestNode(nod, arr){

            var min=Infinity;
            var distance=Infinity;
            var index=-1;

            for(var n=0; n<arr.length; n++){

              distance=dist(nod.x,nod.y,arr[n].x,arr[n].y);

              if(distance<min &&
                 distance!==0 &&
                 arr[n].dirty==false){

                min=distance;
                index=n;

              }

            }

            return arr[index];

          };

          function findClosest(startNode){

            var closestNodes=[];

            // Start with the first node
            var nod = p.originalNodes[startNode];
// nod.dirty=false;

            while(nod!=null){

              // Find the node closest that isn't already taken
              nod=findClosestNode(nod,p.originalNodes);

              if(nod!=null){
                nod.dirty=true;
                closestNodes.push(nod);
              }

            }

            arrayCopy(closestNodes, p.workingNodes);

            //  Indicate that Find Closest was used initially
            p.loaded=true;

          };

          function nearestNeighbor(){

            for(var n=0; n<1; n++){

                swap3Random(p.workingNodes);

                p.workingLength = tourLength(p.workingNodes);                  
  
                if(p.workingLength<p.bestLength){
                  arrayCopy(p.workingNodes, p.bestNodes);
                  p.bestLength = p.workingLength;
                }              
                else{
                  arrayCopy(p.originalNodes, p.workingNodes);
                }
                
            }

            drawWorkingNodes();
            drawWorkingPath();
            drawBestPath();

          };

          function updateTour(){

            p.workingLength = tourLength(p.workingNodes);                

            if(p.workingLength<p.bestLength*p.factor){

              p.bestLength = p.workingLength;

                if(p.workingLength<p.historicLength){
                  p.historicLength=p.workingLength;
                  arrayCopy(p.workingNodes, p.bestNodes);
                }

            }

          };

          function iterate(){
p.factor=1;
            arrayCopy(p.bestNodes,p.workingNodes);
            // renumberNodes(p.bestNodes);

            var index1=p.index;
            var index2=index1+1;
            var index3=index2+1;
            var index4=index3+1;

            if     (index2>p.workingNodes.length-1){ index2=0; }

            if     (index3>p.workingNodes.length-1){ index3=0; }
            else if(index3>p.workingNodes.length  ){ index3=1; }

            if     (index4>p.workingNodes.length-1){ index4=0; }
            else if(index4>p.workingNodes.length  ){ index4=1; }
            else if(index4>p.workingNodes.length+1){ index4=2; }

            swap(p.workingNodes,index1,index2);
            updateTour();

            swap(p.workingNodes,index1,index3);
            updateTour();

            swap(p.workingNodes,index1,index4);
            updateTour();

            swap(p.workingNodes,index2,index3);
            updateTour();

            swap(p.workingNodes,index2,index4);
            updateTour();

            swap(p.workingNodes,index3,index4);
            updateTour();

            p.index++;

            if(p.index>p.bestNodes.length-1){ p.index=0; }

          };

          function greedy(){

            function getRandomNode(){

              var newNode=null;

              randomizeArray(p.sourceNodes);

              newNode=p.sourceNodes[0];

              p.sourceNodes.splice(0,1);

              return newNode;

            };

            function getClosestNode(nod){

              var retNode=null;

              for(var n=0; n<nod.closest.length; n++){

                if(nod.closest[n].loaded==false){
                  nod.closest[n].loaded=true;
                  retNode=nod.closest[n];
                  return retNode;
                }

              }

            };

            function getFurthestNode(nod){

              var retNode=null;

              for(var n=nod.closest.length-1; n>=0; n--){
                
                if(nod.closest[n].loaded==false){
                  nod.closest[n].loaded=true;
                  retNode=nod.closest[n];
                  return retNode;
                }

              }

            };

            function placeNode(){

              // Locates the position within the array that results in the shortest tour
              var arr=p.workingNodes;
              var bestPosition=arr.length-1;              
              var dist=tourLength(arr);
              var minDist=dist;

              for(var n=0; n<arr.length; n++){

                if(n<arr.length-1){
                  swap(arr,n,n+1);
                }

                dist=tourLength(arr);

                if(dist<minDist){
                  minDist=dist;
                  bestPosition=n+1;
                }

              }

              var nod=arr[arr.length-1];

              arr.splice(bestPosition, 0, nod); //  Insert the node into the correct position
              arr.splice(arr.length-1,1);       //  Remove the node from the last position

              cNode=arr[bestPosition];          //  Set the currently selected node

              return cNode;

            };

            var nod;

            //  Randomly add the 1st node
            if(p.workingNodes.length==0){

              arrayCopy(p.originalNodes, p.sourceNodes);
              
              randomizeArray(p.sourceNodes);

              nod=random(p.sourceNodes); // selects a random node from workingNodes
              // nod=p.workingNodes[0];

              p.workingNodes.push(nod);

              if(app.greedyMethod==GREEDYMETHODS.RANDOM){
                p.sourceNodes.splice(0,1); 
              }

              nod.loaded=true;

              cNode=nod;

            }
            else if(p.workingNodes.length<app.nodes){

              switch(app.greedyMethod){

                case GREEDYMETHODS.CLOSEST:  nod=getClosestNode (cNode); break;
                case GREEDYMETHODS.FURTHEST: nod=getFurthestNode(cNode); break;
                case GREEDYMETHODS.RANDOM:   nod=getRandomNode();        break;

                default:                                                 break;
              
              }

              if(nod!=null){

                p.workingNodes.unshift(nod); // Adds the node to the first array position [0]

                placeNode(nod);             //  Shifts the node to the location 
                                            //  that minimizes the tour length
              }

              arrayCopy(p.workingNodes,p.bestNodes);
              p.workingLength = tourLength(p.workingNodes);
              p.bestLength=p.workingLength;

            }
            else{

              renumberNodes(p.workingNodes);

              // iterate();

            }
            
            drawWorkingPath();
            drawWorkingNodes();
// print(p.workingNodes);
            
            drawBestPath();

          };

          function simulatedAnnealing(){

            fill(64);
            noStroke();
            textSize(20);

            for(var n=0; n<1000; n++){

              p.factor-=0.001;
              p.factor=constrain(p.factor,1,1.2);

                switch(true){
                
                  case p.factor>1.075:  

                    // var id=getLongest(p.workingNodes);

                    // swap2Length(id,p.workingNodes);
                    // swap2Closest(p.workingNodes);
                    // swap3Consecutive(p.workingNodes);
                    // swap3Segments(p.workingNodes);

                    break;

                  case p.factor>1.05:   swap3Random(p.workingNodes);
                                        break;                                      

                  case p.factor>1:      swap2Half(p.workingNodes); 
                                        break;

                  default:

                    arrayCopy(p.bestNodes, p.workingNodes);
                    // renumberNodes(p.bestNodes);

                    // iterate();
// print(p.index);
                    p.index++;

                    if(p.index>p.bestNodes.length-1){
                      p.index=0;
                    }

                    if     (frameCount%2==0) { swap2Closest(p.workingNodes);     }
                    else if(frameCount%3==0) { swap2Length(getLongest(p.workingNodes),p.workingNodes); }
                    else if(frameCount%5==0) { swap2Consecutive(p.workingNodes); }
                    else if(frameCount%7==0) { swap3Consecutive(p.workingNodes); }
                    else if(frameCount%11==0){ swap3Random(p.workingNodes);      }
                    else                     { swap2Random(p.workingNodes);      }

                    break;

                }

                updateTour();

            }

            drawWorkingNodes();
            drawWorkingPath();
            drawBestPath();
            
          };

          { // Intersections

            function IsOnSegment(xi, yi, xj, yj, xk, yk) {
              
              return (xi <= xk || xj <= xk) && (xk <= xi || xk <= xj) &&
                    (yi <= yk || yj <= yk) && (yk <= yi || yk <= yj);

            };

            function ComputeDirection(xi, yi, xj, yj, xk, yk) {
              
              var a = (xk - xi) * (yj - yi);
              var b = (xj - xi) * (yk - yi);

              return a < b ? -1 : a > b ? 1 : 0;

            };

            /** Do line segments (x1, y1)--(x2, y2) and (x3, y3)--(x4, y4) intersect? */
            function DoLineSegmentsIntersect(node1,node2,node3,node4){

              var d1 = ComputeDirection(node3.x, node3.y, node4.x, node4.y, node1.x, node1.y);
              var d2 = ComputeDirection(node3.x, node3.y, node4.x, node4.y, node2.x, node2.y);
              var d3 = ComputeDirection(node1.x, node1.y, node2.x, node2.y, node3.x, node3.y);
              var d4 = ComputeDirection(node1.x, node1.y, node2.x, node2.y, node4.x, node4.y);

              return (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
                      ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) ||
                      (d1 == 0 && IsOnSegment(node3.x, node3.y, node4.x, node4.y, node1.x, node1.y)) ||
                      (d2 == 0 && IsOnSegment(node3.x, node3.y, node4.x, node4.y, node2.x, node2.y)) ||
                      (d3 == 0 && IsOnSegment(node1.x, node1.y, node2.x, node2.y, node3.x, node3.y)) ||
                      (d4 == 0 && IsOnSegment(node1.x, node1.y, node2.x, node2.y, node4.x, node4.y));

            };

            function calculateIntersections(){

              p.Intersections=[];

              var node1;
              var node2;
              var node3;
              var node4;

              for(var a=0; a<p.workingNodes.length; a++){

                node1=p.workingNodes[a];

                if(a==p.workingNodes.length-1){ node2=p.workingNodes[0];   }
                else                          { node2=p.workingNodes[a+1]; }

                for(var b=0; b<p.workingNodes.length; b++){
                  
                  node3=p.workingNodes[b];

                  if(b==p.workingNodes.length-1){ node4=p.workingNodes[0];   }
                  else                          { node4=p.workingNodes[b+1]; }

                  if(node1.id!=node3.id &&
                    node1.id!=node4.id &&
                    node2.id!=node3.id &&
                    node2.id!=node4.id){

                    if(DoLineSegmentsIntersect(node1,node2,node3,node4)){

                      if(node1.id>node2.id){ p.Intersections.push(node2);
                                            p.Intersections.push(node1); }
                      else                 { p.Intersections.push(node1);
                                            p.Intersections.push(node2); }

                      if(node3.id>node4.id){ p.Intersections.push(node4);
                                            p.Intersections.push(node3); }
                      else                { p.Intersections.push(node3);
                                            p.Intersections.push(node4); }

                    }

                  }

                }

              }

              completed=true;

            };

          }

          function grow(){

            // renumberNodes(p.workingNodes);

            function canGrow(nod){

              var retVal=true;

              for(var n=0; n<p.workingNodes.length; n++){

                var distance=dist(nod.x,
                                  nod.y,
                                  p.workingNodes[n].x,
                                  p.workingNodes[n].y);
                
                distance=abs(distance);

                if(nod.id!==p.workingNodes[n].id){
                  
                  if(distance*2<(nod.radius+p.workingNodes[n].radius)){
                    retVal=false;
                    break;
                  }
                  
                }

              }

              return retVal;
              
            };

            var nod=null;

            for(var n=0; n<p.workingNodes.length; n++){

              nod=p.workingNodes[n];

              if(canGrow(nod)){                
                // nod.radius++;
              }

            }

            if(!completed){

              renumberNodes(p.workingNodes);

              calculateIntersections(); 

              print(p.Intersections);

            }

p.factor=1;

renumberNodes(p.workingNodes);

            if(int(app.elapsedTime)%2==0){

              calculateIntersections();

              if(p.Intersections.length>0){
  
                if(frameCount%100==0){
                  print(p.Intersections);
                }

                reverseNodes(p.workingNodes,
                              p.Intersections[0].id,
                              p.Intersections[2].id);

              }

            }
            else{
              iterate();
            }

            updateTour();

            drawWorkingPath();
            drawWorkingNodes();
            // drawBestPath();

          };

          function drawProperties(){

            textSize(11);
            textAlign(LEFT,TOP);
            strokeWeight(0.5);
            stroke(128);
            fill(128);  

              text(         p.workingNodes.length + ' nodes'  +
                   '\n\n' + 'Working Length:'  +
                   '\n' +   'Best Length' +
                   '\n' +   'Factor:'     +
                   '\n' +   'Historic Length:' +
                   '\n\n' + 'Source Length:', 10, 10);

            stroke(64);  
            fill(64);  

              text(         '' +
                   '\n\n' + round(p.workingLength)  +
                   '\n'   + round(p.bestLength) +
                   '\n'   + nf(p.factor,1,5)     +
                   '\n'   + round(p.historicLength) +
                   '\n\n' + round(p.sourceNodes.length),  +110, 10);

            textSize(11);

              text(factorial(p.originalNodes.length), 10, p.h-20);
              // text(factorial(p.originalNodes.length).toLocaleString(), 10, p.h-20);

            //  Center origin
            // translate(this.w/2,this.h/2);

              // ellipse(0,0,5,5);

          };

          function toggleDirty(){

            for(var n=0; n<p.workingNodes.length; n++){
              p.workingNodes[n].dirty=!p.workingNodes[n].dirty;
            }

          }
          function initialCondition(){

            var minLength=Infinity;
            var length=Infinity;
            var minID=random(p.workingNodes);

            for(var n=0; n<p.workingNodes.length; n++){

              findClosest(n);

              length = tourLength(p.workingNodes);   

              if(length<minLength){ 
                minLength=length;
                minID=n;
              }

              // print(n + " : " + length);
              toggleDirty();

            }
            
            // print(minID + " : " + minLength);

            findClosest(minID);
            
            updateTour();

          };

          push();

            translate(this.x, this.y);

              border();

              if(!p.loaded){
                initialCondition();
              }

              switch(app.algorithm){

                case ALGORITHMS.GROW:               grow();               break;
                case ALGORITHMS.GREEDY:             greedy();             break;
                case ALGORITHMS.ITERATE:            iterate();            break;
                case ALGORITHMS.NEAREST:            nearestNeighbor();    break;
                case ALGORITHMS.SIMULATEDANNEALING: simulatedAnnealing(); break;
                case ALGORITHMS.BRUTEFORCE:         bruteForce();         break;
                case ALGORITHMS.GENETIC:            genetic();            break;
                case ALGORITHMS.CRITTERS:           critters();           break;

                default:                            simulatedAnnealing(); break;

              }

              drawProperties();

              if(app.currentNode!=null){
                text(app.currentNode.id,50,500);
              }

          pop();

          fill(128);
          noStroke();
          textSize(20);
            
            text(nf(app.elapsedTime,1,1), 50, 400);

        // choose algorithm
        // choose greedy method
        // Initial conditions

      };
      field.prototype.hitTest      = function(x,y){

        var retVal=false;

        if(mouseX>x+this.x &&
           mouseX<x+this.x+this.w &&
           mouseY>y+this.y &&
           mouseX<y+this.y+this.h){
          retVal=true;
        }

        return retVal;

      };
      field.prototype.moved        = function(x,y){

        if(this.hitTest(x,y)){
        
          this.hit=true;
          app.focus=this;

          for(var n in this.workingNodes){
            this.workingNodes[n].moved(this.x+x, this.y+y);
          }

        }
        else{

          this.hit=false;

          for(var n in this.workingNodes){
            this.workingNodes[n].hit=false;
          }

        }

      };
      field.prototype.clicked      = function(){

        if(this.hit){
          for(var n in this.workingNodes){
            this.workingNodes[n].clicked(this.x+x, this.y+y);
          }
        }

      };
      field.prototype.rclicked     = function(){

        var ctrls=this.controls;

        for(var r in ctrls){
          for(var c in ctrls[r]){

            ctrls[r][c].rclicked();

          }
        }

      };
      field.prototype.out          = function(){

        this.hit=false;
        this.activeCell=null;

        var ctrls=this.controls;

        for(var r in ctrls){
          for(var c in ctrls[r]){

            ctrls[r][c].out();

          }
        }

      };
      field.prototype.clearLayout  = function(){



      };
      field.prototype.update       = function(){

      };
      field.prototype.calcRadius   = function(){

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
      field.prototype.resized      = function(){

        this.x = 5;
        this.y = 5;
        this.w = this.parent.w-205;
        this.h = this.parent.h-10;


      };

    }

  }

  /* Controls   ======================================================== */
  {

    /** Node  -------------------------------------------------- */
    {

      function node(id, parent, x, y, w, h, props){

        // NOTE:  w is used to denote radius for a node.

        control.call(this, id, parent, x, y, w, h);

        this.cursor       = props.cursor;
        // this.execute      = props.execute;
        this.outerHit     = false;

        this.dirty        = false;
        this.distance     = Infinity;     //  Used to determine the distance to the
                                          //  selected node on load
        this.loaded       = false;

        //  Closest Nodes  ---------------
        this.closest      = [];
        this.distance     = Infinity;
        
        this.radius       = -1;

        //  Adjacent nodes ---------------
        this.previous     = null;
        this.next         = null;

        // ------------------------------

        // this.color        = props.layout;
        this.outerColor   = round(random(1,7));

        this.enabled      = true;           //  Text is displayed black or grayed out

        this.dragging     = false;          // Is the node being dragged?

        var p=this;

        this.reset();

      };
      node.prototype=Object.create(control.prototype);
      node.prototype.reset         = function(){

        this.closest=[];

      };
      node.prototype.draw          = function(){

        this.active=this.hit &&
                    app.focus===this;

        this.offset=0;
        var p=this;

        if(this.hit){

          cursor(this.cursor);

          if(app.left){ this.offset=1; }

          stroke(128);
          strokeWeight(0.5);
          noFill();

          // for(var n=0; n<p.closest.length; n++){
          for(var n=0; n<10; n++){
            line(p.x, p.y,
                 p.closest[n].x, p.closest[n].y);
          }

        }

        push();

        var value=p.radius;
// print(value);
        fill(0,value);

        noStroke();

          if(this.hit){

            fill(128,0,0,50);

              ellipse(p.x, p.y, p.w, p.w);
              
          }

          ellipse(p.x, p.y, p.radius, p.radius);

          fill(96);          
          textSize(9);
// if(this.id==0){textSize(20); }
            text(p.id,p.x+5,p.y+5);

        pop();

        // drawLinks(); //  Delete for release

      };
      node.prototype.hitTest       = function(x,y){

        if(dist(mouseX,mouseY,x,y)<this.w){          
          this.hit=true;
        }
        else{
          this.hit=false;
        }

      };
      node.prototype.moved         = function(x,y){
      /* Overridden because of the shape */
      
          this.hitTest(x+this.x, y+this.y);

          if(this.hit){
            app.currentNode=this;
          }

      };
      node.prototype.clicked       = function(){

        if(this.hit){
          this.parent.activeCell=this;
          app.focus=this;
          // print(this.closest);  
        }

        if(this.active){
          
        }

      };
      node.prototype.rclicked      = function(){

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
      node.prototype.recalculate   = function(){

        this.parent.update();

      };
      node.prototype.dragged       = function(){

        if(this.hit &&
           this.layout!==BLANK){
             // print(this.id);
          this.parent.activeCell=this;

        }

      };

    }

    /** Reset Button    -------------------------------------------------- */
    {

      function resetButton(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.cursor   = props.cursor;
        this.color    = props.color;

        this.execute  = props.execute;

        app.reset=this;

      };
      resetButton.prototype=Object.create(control.prototype);
      resetButton.prototype.draw=function(){

        this.active=this.hit &&
                    app.focus===this;

        this.offset=0;

        push();

          translate(this.x,this.y);

            noFill();
            stroke(192);
            strokeWeight(1.5);

            if(this.active &&
               app.left){

              rotate(radians(45));

            }

            // Arc Shadow
            stroke(212);

              arc(3, 3, this.w, this.h, radians(60), 2*PI-radians(22.5));

            // Arc
            stroke(192);

            if(this.active){

              stroke(164);
              cursor(this.cursor);

            }

              arc(0, 0, this.w, this.h, radians(60), 2*PI-radians(22.5));

            push();

              translate(4,-5);
              rotate(PI/6);

              // // Triangle Shadow
              fill(212);
              stroke(212);

                triangle( 3,  3,
                         13,  3,
                         13, -7);

              // Triangle
              fill(192);
              stroke(192);

              if(this.active){ fill(164);
                               stroke(164); }

                  triangle( 0,   0,
                           10,   0,
                           10, -10);

            pop();

// noFill();
// stroke(RED);              
// ellipse(0,0,this.w,this.h);
            
        pop();
        
      };
      resetButton.prototype.clicked=function(){
      /** Overridden for execute */

        if(this.active){          
           this.execute();
        }

      };
      resetButton.prototype.moved=function(x,y){
      /** Overridden for shape */

          // if(this.parent.hit){

            if(dist(mouseX, mouseY,
                    this.x+x,
                    this.y+y)<=this.w/2){

                this.hit=true;
                app.focus=this;

            }
            else{

              this.hit=false;

            }

          // }

      };

    }

    /** Solve Button    -------------------------------------------------- */
    {

      function solveButton(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.cursor   = props.cursor;
        this.color    = props.color;

        this.execute  = props.execute;
        this.retrieve = props.retrieve;

        app.reset=this;

      };
      solveButton.prototype=Object.create(control.prototype);
      solveButton.prototype.draw=function(){

        this.active=this.hit &&
                    app.focus===this;

        this.offset=0;

        push();

          translate(this.x,this.y);

            noFill();
            stroke(192);
            strokeWeight(1.5);

            if(this.active){

              stroke(164);
              cursor(this.cursor);
              
              if(app.left){
                this.offset=1;
              }

            }

            var o=this.offset;

            if(this.retrieve()){

              // Triangle Shadow
              fill(212);
              stroke(212);
              strokeWeight(5);

                line(-3,-7, -3, 13);
                line( 9,-7,  9, 13);

              // Triangle
              fill(192);
              stroke(192);

              if(this.active){ fill(164);
                               stroke(164); }

                line(-6,-10, -6, 10);
                line( 6,-10,  6, 10);

            }
            else{
                            
              // Triangle Shadow
              fill(212);
              stroke(212);

                triangle(13,  3,
                         -7, -7,
                         -7, 13);

              // Triangle
              fill(192);
              stroke(192);

              if(this.active){ fill(164);
                               stroke(164); }

                triangle(o+10, o,
                         o-10, o-10,
                         o-10, o+10);

            }

        pop();

// noFill();
// stroke(RED);              
// ellipse(this.x,this.y,this.w,this.h);
        
      };
      solveButton.prototype.clicked=function(){
      /** Overridden for execute */

        if(this.active){ this.execute(); }

      };
      solveButton.prototype.moved=function(x,y){
      /** Overridden for shape */

          // if(this.parent.hit){

            if(dist(mouseX, mouseY,
                    this.x+x,
                    this.y+y)<=this.w/2){

                this.hit=true;
                app.focus=this;

            }
            else{

              this.hit=false;

            }

          // }

      };

    }

    /** Menu Button     -------------------------------------------------- */
    {

      function menuButton(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.text     = props.text;
        this.cursor   = props.cursor;
        this.execute  = props.execute;
        this.color    = props.color;

        app.menu=this;

      };
      menuButton.prototype=Object.create(control.prototype);
      menuButton.prototype.draw=function(){

        var p=this;
        this.offset=0;

        this.active=this.hit &&
                    app.focus===this;

        if(this.active){ cursor(this.cursor);
                         if(app.left){ this.offset=1; } }

        function drawHexagon(x,y,sz,offset){

          var ang=0;

          beginShape();

            for(pt=0; pt<6; pt++){
              vertex( x+cos(radians(ang+pt*60))*sz+offset,
                      y+sin(radians(ang+pt*60))*sz+offset );
            }

          endShape(CLOSE);

        };

        push();

          translate(this.x, this.y);

            // Shadow
            fill(212);
            noStroke();

              for(var ang=0; ang<6; ang++){
                drawHexagon(cos(radians(ang*60+30))*20+4,
                            sin(radians(ang*60+30))*20+4,
                            10,0);
              }

            // Hexagons
            fill(192);
            noStroke();

            if(p.active){ fill(180); }

              for(var ang=0; ang<6; ang++){
                drawHexagon(cos(radians(ang*60+30))*20,
                            sin(radians(ang*60+30))*20,
                            10,p.offset);
              }
noFill();
stroke(RED);              
ellipse(0,0,this.w,this.h);

ellipse(0,0,3,3);
        pop();

      };
      menuButton.prototype.moved           =function(x,y){

        // if(this.parent.hit){

          if(dist(mouseX, mouseY,
                  this.x+x,
                  this.y+y)<=this.w/2){

              this.hit=true;
              app.focus=this;

          }
          else{

            this.hit=false;

          }

        // }

      };      
      menuButton.prototype.clicked=function(){
      /** Overridden for execute */

        if(this.active){ this.execute(); }

      };

    }

    /** Music Button    -------------------------------------------------- */
    {

      function music(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.cursor   = props.cursor;

        this.execute  = props.execute;
        this.retrieve = props.retrieve;

        app.music=this;

      };
      music.prototype=Object.create(control.prototype);
      music.prototype.draw            =function(){

        var p=this;

        this.active=this.hit &&
                    app.focus===this;

        this.on=this.retrieve();
        this.offset=0;

        function symbol(){
          
          noStroke();
          
          if(p.on){ fill(164); }

          textFont(p.font);
          textSize(36);
          textAlign(CENTER,CENTER);

          //  Shadow
          fill(212);

            text(CONSTANTS.NOTE, 3+p.offset, +p.offset);

          // Text
          fill(192);

          if(p.active){ fill(164); }

            text(CONSTANTS.NOTE, p.offset, p.offset);

        };
        function strikeThrough(){

          noFill();

          if(!p.on){

            stroke(192);
            strokeWeight(3);

            if(p.active){ stroke(164); }

              ellipse(p.offset, p.offset, p.w-5, p.w-5);

              line(-15+p.offset,-15+p.offset, 15, 15);

          }

        };

        if(this.active){ cursor(p.cursor);
                         if(app.left){ this.offset=1; } }

        push();

          translate(this.x, this.y);

            symbol();
            strikeThrough();

        pop();

noFill();
stroke(RED);              
ellipse(this.x,this.y,this.w,this.h);
        
      };
      music.prototype.moved           =function(x,y){

        // if(this.parent.hit){

          if(dist(mouseX, mouseY,
                  this.x+x,
                  this.y+y)<=this.w/2){

              this.hit=true;
              app.focus=this;

          }
          else{

            this.hit=false;

          }

        // }

      };
      music.prototype.clicked         =function(){
      /* Overridden to maintain on/off value */

        if(this.active){

          this.execute(!this.retrieve());

        }

      };

    }

    /** Shuffle Button  -------------------------------------------------- */
    {

      function shuffleButton(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.cursor   = props.cursor;
        this.color    = props.color;

        this.execute  = props.execute;

        app.reset=this;

      };
      shuffleButton.prototype=Object.create(control.prototype);
      shuffleButton.prototype.draw=function(){

        this.active=this.hit &&
                    app.focus===this;

        this.offset=0;

        push();

          translate(this.x,this.y);

            if(this.active){

              cursor(this.cursor);
              
              if(app.left){
                this.offset=1;
              }

            }

            var o=this.offset;

            // Shadows
            noFill();
            stroke(212);
            strokeWeight(2);

              var s=o+3;
              
              bezier(-14+s,-8+s,-5+s,-10+s, 5+s, 10+s, 14+s, 8+s);
              bezier(-14+s, 8+s,-5+s, 10+s, 5+s,-10+s, 14+s,-8+s);
              
            fill(212);

              triangle(13+s, 11+s, 13+s, 5+s, 17+s, 8+s);
              triangle(13+s,-11+s, 13+s,-5+s, 17+s,-8+s);
              
            // Curves
            noFill();
            stroke(192);

            if(this.active){ stroke(164); }

              bezier(-14+o,-8+o,-3+o,-10+o, 3+o, 10+o, 14+o, 8+o);
              bezier(-14+o, 8+o,-3+o, 10+o, 3+o,-10+o, 14+o,-8+o);

            // Triangles
            fill(192);
            
            if(this.active){ fill(164);   }

              triangle(13+o, 11+o, 13+o, 5+o, 17+o, 8+o);
              triangle(13+o,-11+o, 13+o,-5+o, 17+o,-8+o);

        pop();

// noFill();
// stroke(RED);
// ellipse(this.x,this.y,this.w,this.h);

      };
      shuffleButton.prototype.moved           =function(x,y){

        // if(this.parent.hit){

          if(dist(mouseX, mouseY,
                  this.x+x,
                  this.y+y)<=this.w/2){

              this.hit=true;
              app.focus=this;

          }
          else{

            this.hit=false;

          }

        // }

      };
      shuffleButton.prototype.clicked=function(){
      /** Overridden for execute */

        if(this.active){ this.execute(); }

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

      /* Field            */
      rt.controls.push(new field('field', rt, 5, 5, rt.w-205, rt.h-10,
        {color:    220}));

      /* Accessories ---------------------------------------------------- */

      /** Reset Button     */
      rt.controls.push(new resetButton('reset', rt, 50, 200, 28, 28,
        {cursor:    HAND,
         color:     BLACK,
         execute:   reset}));

      /** Shuffle Button   */
      rt.controls.push(new shuffleButton('shuffle', rt, 50, 250, 28, 28,
        {cursor:    HAND,
         color:     BLACK,
         execute:   shuffle}));
         
      /** Solve Button     */
      rt.controls.push(new solveButton('solve', rt, 50, 300, 28, 28,
        {cursor:    HAND,
         color:     BLACK,
         retrieve:  getRunning,
         execute:   toggleRunning}));
         
      /** Music            */
      // rt.controls.push(new music('music', rt, 35, rt.h-35, 50, 50,
      //   {cursor:    HAND,
      //    execute:   setMusic,
      //    retrieve:  getMusic}));

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
      // rt.controls.push(new menuButton('menu', rt, 45, 45, 60, 60,
      //   {text:      'Yippee',
      //    cursor:    HAND,
      //    execute:   menu}));

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
  var cy =  windowHeight/2;

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

      switch(true){
        
        case mouseButton==LEFT:

          if(app.keys[KEYCODES.CONTROL]){
            increment--;
          }
          else{
            increment++;
          }

          break;

        case mouseButton==RIGHT:           break;

        
        default: break;

      }

    };
    function doubleClicked() {

      app.field.reset();

//       app.fullscreen=!app.fullscreen;

//       fullscreen(app.fullscreen);
// print('dclicked');
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

                        // app.field.clearDragging();

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

      // function calcDragAngle(){

      //   var a = atan2(mouseY-pmouseY, mouseX-pmouseX);

      //   a=a*180/PI;

      //   x=cx;
      //   y=cy;

      //   switch(true){

      //     case a >= 67.5 && a <= 122.5:
      //     case a <=-67.5 && a >=-122.5:   x = cx;
      //                                     y = cy + 150;

      //                                     app.dragDirection=DRAG_DIRECTIONS.UPDOWN;

      //                                     setDragColumn();    // Determine which cells are being dragged

      //                                     break;

      //     case a >=   0 && a <=  67.5:
      //     case a >=-180 && a <=-122.5:    x = cx + 100;
      //                                     y = cy +  50;

      //                                     app.dragDirection=DRAG_DIRECTIONS.FORWARD;

      //                                     setDragForward();   // Determine which cells are being dragged

      //                                     break;

      //     case a <= 180 && a >= 122.5:
      //     case a <=   0 && a >= -67.5:    x = cx - 100;
      //                                     y = cy +  50;

      //                                     app.dragDirection=DRAG_DIRECTIONS.BACKWARD;

      //                                     setDragBackward();  // Determine which cells are being dragged

      //                                     break;

      //     default:                        break;

      //   }

      // };

      // switch(mouseButton){

      //   case LEFT:

      //                 forEach(app.controls,'dragged');  //  Necessary to put this first to set the active cell

      //                 if(app.dragging===false){

      //                   app.dragStartX=mouseX;
      //                   app.dragStartY=mouseY;

      //                   app.dragging=true;

      //                 }
      //                 else{

      //                   if(dist(app.dragStartX,
      //                           app.dragStartY,
      //                           mouseX,
      //                           mouseY)>10){

      //                     if(x===cx &&
      //                        y===cy){ calcDragAngle(); }

      //                   }

      //                 }

      //                 break;

      //   // case RIGHT:   forEach(app.controls,'rDragged');

      //                 // break;

      //   // case CENTER:  forEach(app.controls,'cDragged');

      //                 // break;

      //   default:      break;

      // }

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
                                        app.field.addMove(DIRECTIONS.UP);        break;
        case keyIsDown(KeyCodes.DOWN):  colDown();
                                        app.field.addMove(DIRECTIONS.DOWN);      break;

        case keyIsDown(KeyCodes.LEFT) &&
             keyIsDown(CONTROL):        colDownLeft();
                                        app.field.addMove(DIRECTIONS.DOWNLEFT);  break;
        case keyIsDown(KeyCodes.RIGHT) &&
             keyIsDown(CONTROL):        colDownRight();
                                        app.field.addMove(DIRECTIONS.DOWNRIGHT); break;

        case keyIsDown(LEFT_ARROW):     colUpLeft();
                                        app.field.addMove(DIRECTIONS.UPLEFT);    break;
        case keyIsDown(RIGHT_ARROW):    colUpRight();
                                        app.field.addMove(DIRECTIONS.UPRIGHT);   break;

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
             app.keys[KEYCODES.CONTROL]:  app.field.undo();                      break;  // reverse latest move

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


  // function generate(n, arr){

  //   //c is an encoding of the stack state. c[k] encodes the for-loop counter for when generate(k+1, A) is called
  //   c=[];

  //   var i=0;

  //   for(i=0; i<n; i++){
  //     c[i]=0;
  //   }

  //   //i acts similarly to the stack pointer
  //   i=0;

  //   while(i<n){

  //     if(c[i]<i){

  //       if(i%2==0){ swap(arr, 0, i);    }
  //       else      { swap(arr, c[i], i); }

  //       // print(arr);

  //       //  Swap has occurred ending the for-loop.
  //       //  Simulate the increment of the for-loop counter
  //       c[i]++;

  //       //  Simulate recursive call reaching the base case by
  //       //  bringing the pointer to the base case analog in the array
  //       i=0;

  //     }
  //     else{
          
  //       //  Calling generate(i+1, A) has ended as the for-loop terminated.
  //       //  Reset the state and simulate popping the stack by incrementing the pointer.
  //       c[i]=0;
  //       i++;

  //     }

  //   }

  // }

  // var arrTest=[1,2,3,4,5];

  // generate(arrTest.length, arrTest);

}
























  /**

  1729 = 9^3 + 10^3 = 12^3 + 1^3

  tsp.js

  */
