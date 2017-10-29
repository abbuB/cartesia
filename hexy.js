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
+docs.oracle.com

*/

var diagrams = function(processingInstance){
  with (processingInstance){
/*

  Names:  Hexy
          Hexstasy
          Hexstatic
          You hexy thing
          geekred
          ...

  GAMES:

          Hex grid least/greatest path moving right or down
          Choose Life - Sliding Triangle Game
          ...

    TO DO:

      - automated background music
      - Menu button (top left corner)
      - Test on Zach's machine
      - include 42 layouts from existing games
      - include 42 layouts from the community

      - implement timer
      - background grid
      - score controls
      - navigate puzzles controls
      - sounds/music controls
      - restart game controls

      - undo/redo
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

      colorMode(HSB, 255);

*/

  function print(s){

    console.log(s);

  };
  function printLayout(){

    var row = "[";
    var str = '';

    // Layout
    println('this.layout=[');

    for(var r=0; r<app.hexBoard.controls.length; r++){
      for(var c=0; c<app.hexBoard.controls[r].length; c++){

        str=app.hexBoard.controls[r][c].layout;

        // if(str==="\\"){ str="\\\\"; }

        if(c===app.hexBoard.controls[r].length-1){
          row=row + "'" + str + "'";;
        }
        else{
          row=row + "'" + str + "', ";
        }

      }

      subset(row, 0, row.length);

      println(row + '],');
      row="[";

    }

    println('];');

    //  Text
    println('this.text=[');

    for(var r=0; r<app.hexBoard.controls.length; r++){
      for(var c=0; c<app.hexBoard.controls[r].length; c++){

        str=app.hexBoard.controls[r][c].text;

        // if(str==="\\"){ str="\\\\"; }

        if(c===app.hexBoard.controls[r].length-1){
          row=row + "'" + str + "'";;
        }
        else{
          row=row + "'" + str + "', ";
        }

      }

      subset(row, 0, row.length);

      println(row + '],');
      row="[";

    }

    println('];');
    
  };

  var serifFont   = createFont('sans-serif', 16);
  var sansFont    = createFont('sans',       16);
  var monoFont    = createFont('monospace',  16);
  var cursiveFont = createFont('cursive',    16);
  var fantasyFont = createFont('fantasy',    16);

  var globalFRate=this;

  const MY_FAV = 7;
  // const HEX_SIZE=60;
  var HEX_SIZE=40;
  // const pi=nf(PI,1,10);

  /* Constants ============================================================= */
  {

    var HEXY_TYPES={

      BLANK:            '.',

      BLACK:            'o',
      BLACK_REVEALED:   'O',
      BLUE:             'x',
      BLUE_REVEALED:    'X',

      DOWN_RIGHT:       '>', // Double up the \ character because it is an escape character and the first one won't be recognised
      DOWN_CENTER:      '|',
      DOWN_LEFT:        '/',

      NUMBER:           '+',
      CONSECUTIVE:      'c',
      NOT_CONSECUTIVE:  'n'

    };
    var puzzles=[];

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

    /* Initialize          -------------------- */
    {

      randomSeed(millis());

      frameRate(0);

      cursor(WAIT);
      strokeCap(SQUARE);

      angleMode='radians';

      size(800, 600); // set size of canvas

    }

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

      this.info         = 0;                  //  Is the info frame displayed
      this.telemetry    = false;              //  Is telemetry visible

    }

    /* Hexy Specific       ------------------ */
    {

      this.mode         = APPMODES.GAME;      //

      this.score        = 0;                  //  The number of total hexes acquired

      this.levelScores  = {
                            0: 0,   7: 35,  14: 70,  21: 105,  28: 140,  35: 175,
                            1: 0,   8: 35,  15: 70,  22: 105,  29: 140,  36: 175,
                            2: 0,   9: 35,  16: 70,  23: 105,  30: 140,  37: 175,
                            3: 0,  10: 35,  17: 70,  24: 105,  31: 140,  38: 175,
                            4: 0,  11: 35,  18: 70,  25: 105,  32: 140,  39: 175,
                            5: 0,  12: 35,  19: 70,  26: 105,  33: 140,  40: 175,
                            6: 0,  13: 35,  20: 70,  27: 105,  34: 140,  41: 175
                          };

      this.hexBoard;                          //  Set in the hexBoard control initialization
      this.transition;                        //  Set in the transition control initialization

      this.puzzle       = 0;                  //  Index of the current puzzle layout

      this.remaining    = 0;                  //  How many blue cells need to be uncovered
      this.covered      = 0;                  //  How many black cells need to be uncovered
      this.errors       = 0;                  //  How many mistaken clicks occurred

      this.orientation  = ORIENTATIONS.FLAT;

      this.music        = true;
      this.level        = 0;                  //  Levels 0 - 42 ( 7 groups of 6 = 42 total)

    }

  };

  var app=new application();


  /* Utility Functions ===================================================== */
  {

    /* Misc            -------------------------------------------------- */
    {

      var controlCount=-1;

      function getGUID()            { controlCount++; return ('C'+controlCount);                       };

      function getPuzzleNumber()    { return ((app.puzzle-(app.puzzle%6))/6+1)+ '-' +(app.puzzle%6+1); };

      function iRandom(n)           { return round(random(n));                                         };

      function getColor(clr, alpha) { return color(red(clr), green(clr), blue(clr), alpha/100*255);    };

      function clickTest(n)         { print('click: ' + n);                                            };
      
      function getInfo()            { return app.info;                                                 };
      function toggleInfo()         { app.info=!app.info;                                              };

      function getMusic()           { return app.music;                                                };
      function setMusic(b)          { return app.music=b;                                              };

      function getScore()           { return app.score;                                                };
      function setScore(b)          { return app.score=b;                                              };

      function getTelemetry()       { return app.telemetry;                                            };
      function toggleTelemetry()    { app.telemetry=!app.telemetry;                                    };

    }

    /* Scoring         -------------------------------------------------- */
    {

      function getRemaining()       { return app.remaining;                                         };
      function getMistakes()        { return app.errors;                                            };
      function getScore()           { return app.score;                                             };

    }

    /* Puzzles         -------------------------------------------------- */
    {

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

        // app.puzzle=constrain(n, 0, puzzles.length-1);

      };
      function loadPuzzle(n)        {

        app.puzzle=constrain(n, 0, puzzles.length-1);

        print('load puzzle: ' + n);

      };

    }

    /* Puzzle Complete -------------------------------------------------- */
    {

      function replay()             { print('replay');                                              };
      function menu()               { print('menu');                                                };
      function next()               { print('next');                                                };

    }
    
    /* Transition      -------------------------------------------------- */
    {
      
      function up(){

        if(app.hexBoard.activeCell.top!==null){
          app.hexBoard.activeCell=app.hexBoard.activeCell.top;
        }

      };
      function down(){

        if(app.hexBoard.activeCell.bottom!==null){
          app.hexBoard.activeCell=app.hexBoard.activeCell.bottom;
        }

      };

      function upRight(){

        if(app.hexBoard.activeCell.topRight!==null){
          app.hexBoard.activeCell=app.hexBoard.activeCell.topRight;
        }

      };
      function downRight(){

        if(app.hexBoard.activeCell.bottomRight!==null){
          app.hexBoard.activeCell=app.hexBoard.activeCell.bottomRight;
        }

      };

      function upLeft(){

        if(app.hexBoard.activeCell.topLeft!==null){
          app.hexBoard.activeCell=app.hexBoard.activeCell.topLeft;
        }

      };
      function downLeft(){

        if(app.hexBoard.activeCell.bottomLeft!==null){
          app.hexBoard.activeCell=app.hexBoard.activeCell.bottomLeft;
        }

      };

    }
    
    /* Edit            -------------------------------------------------- */
    {
        
      function incrementCellLayout(){ app.hexBoard.activeCell.incrementCellLayout();                };
      function decrementCellLayout(){ app.hexBoard.activeCell.decrementCellLayout();                };

      function setBlackRevealed()   { app.hexBoard.activeCell.layout=HEXY_TYPES.BLACK_REVEALED;     };
      function setBlack()           { app.hexBoard.activeCell.layout=HEXY_TYPES.BLACK;              };

      function setBlueRevealed()    { app.hexBoard.activeCell.layout=HEXY_TYPES.BLUE_REVEALED;      };
      function setBlue()            { app.hexBoard.activeCell.layout=HEXY_TYPES.BLUE;               };

      function setDownCenter()      { app.hexBoard.activeCell.layout=HEXY_TYPES.DOWN_CENTER;        };
      function setDownLeft()        { app.hexBoard.activeCell.layout=HEXY_TYPES.DOWN_LEFT;          };
      function setDownRight()       { app.hexBoard.activeCell.layout=HEXY_TYPES.DOWN_RIGHT;         };

      function setBlank()           { app.hexBoard.activeCell.text=HEXY_TYPES.BLANK;                };
      function setNumber()          { app.hexBoard.activeCell.text=HEXY_TYPES.NUMBER;               };
      function setConsecutive()     { app.hexBoard.activeCell.text=HEXY_TYPES.CONSECUTIVE;          };
      function setNonConsecutive()  { app.hexBoard.activeCell.text=HEXY_TYPES.NOT_CONSECUTIVE;      };

      function clearLayout()        { app.hexBoard.clearLayout();                                   };

      function toggleCreate()       {

        if(app.mode===APPMODES.GAME){ app.mode=APPMODES.CREATE; }
        else                        { app.mode=APPMODES.GAME;   }

      };

      function reset()              {

        app.hexBoard.reset();
        app.errors=0;

      };
      
    }

  }

  /* Containers/Controls =================================================== */
  {

    /* Control - default --------------------------------------------------  */
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
        this.cursor   = ARROW,      /** cursor when mouse is over the control */
        this.visible  = true;       /** is the control currently displayed    */

        this.active   = false;      /** active = hit and focus and visible    */
        this.offset   = 0;          /** offset distance when clicked          */

        this.font     = serifFont;  /** default font                          */

      };
      control.prototype.draw     = function(){};
      control.prototype.moved    = function(x,y){

        if(!this.visible){ return; }
        
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
      control.prototype.clicked  = function(){ if(this.hit){ forEach(this.controls, 'clicked');  } };
      control.prototype.rclicked = function(){ if(this.hit){ forEach(this.controls, 'rclicked'); } };
      control.prototype.pressed  = function(){ };
      control.prototype.released = function(){ };
      control.prototype.over     = function(){ };
      control.prototype.out      = function(){ this.hit=false; forEach(this.controls, 'out');      };
      // control.prototype.typed=function(){};
      // control.prototype.cClicked=function(){};
      // control.prototype.dragged = function(){ };

    }

    /** Containers ========================================================== */

    /** root            -------------------------------------------------- */
    {
      /* Identical to a container control except is doesn't have a parent */
      function root(id, x, y, w, h, props){

        control.call(this, id, null, x, y, w, h);

        this.color   = props.color;
        this.border  = props.border;

      };
      root.prototype=Object.create(control.prototype);
      root.prototype.draw=function(){
        
        if(!this.visible){ return; }
        
          this.active=this.hit &&
                      app.focus===this;

          pushMatrix();

            translate(this.x, this.y);

              if(this.active){
                cursor(this.cursor);
              }

              noStroke();
              fill(this.color);

              if(this.border &&
                 this.active){
                
                strokeWeight(1);
                stroke(0);

              }

                rect(0, 0, this.w, this.h);

              forEach(this.controls, 'draw');

          popMatrix();

      };
      root.prototype.moved=function(x,y){
      /* Required because root control doesn't have a parent */
        
        if(!this.visible){ return; }
          
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

    }

    /** Container       -------------------------------------------------- */
    {

      function container(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.color   = props.color;        
        this.border  = props.border;
        
      };
      container.prototype=Object.create(control.prototype);
      container.prototype.draw=function(){

        if(!this.visible){ return; }
        
          this.active=this.hit &&
                      app.focus===this;

          pushMatrix();

            translate(this.x, this.y);

              if(this.active){ cursor(this.cursor); }

              fill(this.color);

              strokeWeight(0);
              noStroke();

              if(this.border){

                stroke(CLRS.H_BLUE);
                strokeWeight(11);

              }

                rect(1, 1, this.w-2, this.h-2);

              forEach(this.controls, 'draw');

          popMatrix();

      };

    }

    /** Puzzle Complete -------------------------------------------------- */
    {

      function puzzleComplete(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.text    = props.text;
        this.color   = props.color;
        this.visible = true;

        /* replay button       */
        this.controls.push(new hexy_Button(getGUID(), this, 100, 420, 126, 100,
          {style:     'replay',
           text:      'replay',
           cursor:    HAND,
           execute:   replay,
           color:     CLRS.BLACK}));

        /* menu button       */
        this.controls.push(new hexy_Button(getGUID(), this, 236, 420, 126, 100,
          {style:     'menu',
           text:      'menu',
           cursor:    HAND,
           execute:   menu,
           color:     CLRS.BLACK}));

        /* next button       */
        this.controls.push(new hexy_Button(getGUID(), this, 372, 420, 126, 100,
          {style:     'next',
           text:      'next',
           cursor:    HAND,
           execute:   next,
           color:     CLRS.BLACK}));

      };
      puzzleComplete.prototype=Object.create(control.prototype);
      puzzleComplete.prototype.draw=function(){

        if(!this.visible){ return; }

          this.active = this.hit &&
                        app.focus===this;

          var p=this;

          pushMatrix();

            translate(this.x, this.y);

              if(this.active){ cursor(this.cursor); }

              function border(){

                noStroke();
                fill(getColor(p.color,5));

                  rect(0, 0, p.w, p.h);

              };
              function title(){
                
                stroke(CLRS.BLACK);
                strokeWeight(0.25);

                fill(getColor(CLRS.WHITE,100));

                  rect(100,100,400,100, 3);

                textSize(36);
                textAlign(CENTER,CENTER);

                fill(getColor(CLRS.BLACK,50));

                  text(p.text, 300,130);

                fill(CLRS.BLACK);

                  text(getPuzzleNumber(), 300,170);

              };              
              function summary(){

                function drawHexagon(x,y,sz){
                  
                  colorMode(HSB, 255);
                  
                  noStroke();
                  
                  var ang=0;

                  fill(CLRS.H_BLUE);
                  
                  beginShape();

                    for(pt=0; pt<6; pt++){

                      vertex( x+cos(radians(ang+pt*60))*(sz)+p.offset,
                              y+sin(radians(ang+pt*60))*(sz)+p.offset );
                              
                    }

                  endShape(CLOSE);

                  fill(CLRS.H_BLUE_L);
                  
                  beginShape();

                    for(pt=0; pt<6; pt++){

                      vertex( x+cos(radians(ang+pt*60))*(sz-sz*0.25)+p.offset,                    
                              y+sin(radians(ang+pt*60))*(sz-sz*0.25)+p.offset );
                              
                    }

                  endShape(CLOSE);
                  
                  colorMode(RGB, 255);
                  
                };
                function hexagons(){

                  pushMatrix();

                    translate(150,225);

                      stroke(CLRS.H_BLUE);
                      strokeWeight(2);
                      fill(CLRS.H_BLUE_L);

                      var sz=21;

                        for(var row=0; row<5; row++){
                          for(var col=0; col<5; col++){

                            drawHexagon(20+1.75*col*sz, 15+1.65*row*sz, sz-5);

                          }
                        }

                  popMatrix();

                };
                
                fill(getColor(CLRS.WHITE,100));

                  rect(100, 210, 400, 200, 3);

                textSize(36);
                fill(getColor(CLRS.BLACK,25));

                pushMatrix();

                  translate(120, 330);
                  rotate(-PI/2);

                    text('Mistakes:', 0, 0);

                  rotate(PI/2);

                    text(app.errors, 5, -95);

                popMatrix();
                
                hexagons();
                
                //  Game Totals
                drawHexagon(425, 300, 50);
                
                textSize(40);
                textAlign(CENTER,CENTER);
                fill(getColor(CLRS.BLACK,75));

                  text('x 125',425,375);
                
              };

              border();
              title();
              summary();

              forEach(this.controls, 'draw');

          popMatrix();

      };

    }

    /** Puzzle Select   -------------------------------------------------- */
    {

      function puzzleSelect(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.color    = props.color;
        this.retrieve = props.retrieve;
        
        //  Load Hexagon Buttons
        var txt;

        var sz    =  55;
        var incr  = 3.5;
        var n     =   0;
        var x1    =   0;
        var y1    =   0;
        var baseX = 300;
        var baseY = 300;

          for(var row=0; row<6; row++){
            for(var col=0; col<7; col++){

              if((n+1)%7===0){

                x1 = baseX + cos(radians(270+row*60))*incr*sz;
                y1 = baseY + sin(radians(270+row*60))*incr*sz;

              }
              else{

                x1 = baseX + cos(radians(270+row*60))*incr*sz + cos(radians(270+col*60))*sz*1.1;
                y1 = baseY + sin(radians(270+row*60))*incr*sz + sin(radians(270+col*60))*sz*1.1;

              }

              txt=(row/1+1) + '-' + col/1;

              // puzzle button
              this.controls.push(new puzzle_Button(getGUID(), this, x1, y1, sz, sz,
                {style:     'replay',
                 text:      txt,
                 index:     n,
                 threshold: app.levelScores[n],
                 retrieve:  getScore,                 
                 execute:   loadPuzzle,
                 cursor:    HAND}));

              n++;

            }
          }

      };
      puzzleSelect.prototype=Object.create(control.prototype);
      puzzleSelect.prototype.draw=function(){
     
        if(!this.visible){ return; }

          this.active = this.hit &&
                        app.focus===this;

          if(this.active){ cursor(this.cursor); }
              
          var p =this;
          
          function border(){

            noStroke();
            fill(getColor(p.color,75));

            rect(0, 0, p.w, p.h, 100);

          };          
          function drawScore(){
            
            function drawHexagon(x,y,sz){

              noStroke();
              
              var ang=0;

              fill(CLRS.H_BLUE);
              
              beginShape();

                for(pt=0; pt<6; pt++){

                  vertex( x+cos(radians(ang+pt*60))*(sz),
                          y+sin(radians(ang+pt*60))*(sz) );
                          
                }

              endShape(CLOSE);

              fill(CLRS.H_BLUE_L);
              
              beginShape();

                for(pt=0; pt<6; pt++){

                  vertex( x+cos(radians(ang+pt*60))*(sz-sz*0.25),                    
                          y+sin(radians(ang+pt*60))*(sz-sz*0.25) );
                          
                }

              endShape(CLOSE);

            };
            
            drawHexagon(300,300,50);
            
            //  Shadow
            var score=p.retrieve();
            
            textSize(36);
            fill(CLRS.GRAY);
            textAlign(CENTER,CENTER);
            
              text(score, p.w/2+2, p.h/2+2);

            // Foreground
            fill(CLRS.WHITE);

              text(score, p.w/2, p.h/2);

          };

          pushMatrix();

            translate(this.x, this.y);

              border();
              drawScore();

              forEach(this.controls, 'draw');

          popMatrix();

      };

    }

    /** Telemetry       -------------------------------------------------- */
    {

      function telemetry(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.color   = props.color;
        this.cursor  = props.cursor;

      };
      telemetry.prototype=Object.create(control.prototype);
      telemetry.prototype.draw=function(){

        if(!this.visible ||
           app.debug===false){ return; }

          function border(){

            noStroke();

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

              var id;

              if(app.focus!==undefined){ id=app.focus.id; }
              else                     { id= -1;          }

              text('\n\n'   + app.controlCount +
                   '\n'     + id               +
                   '\n\n\n' + app.remaining    +
                   '\n'     + app.errors       +
                   '\n\n\n' + app.music        +
                   '\n'     + app.level,
                   col2, top);

          };

          this.active=this.hit &&
                      app.focus===this;

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

              border();
              title();
              environment();
              appSpecific();

          popMatrix();

      };
      telemetry.prototype.moved=function(x,y){
      /* Overridden because of the dynamic x-coordinate offset */
        
        if(!this.visible){ return; }
        
        // if(app.telemetry===false &&
           // this.offset===0){ return; }

          if(this.parent.hit){

            if(mouseX>this.x+x+this.offset &&
               mouseX<this.x+x+this.offset + this.w &&
               mouseY>this.y+y &&
               mouseY<this.y+y + this.h){

              this.hit=true;
              app.focus=this;

              // for(var c in this.controls){ this.controls[c].moved(this.x+x+this.offset, this.y+y); }

            }
            else{

              this.hit=false;

              for(var c in this.controls){ this.controls[c].hit=false; }

            }

          }

      };

    }

    /** Hex board       -------------------------------------------------- */
    {

      function hexBoard(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        /* ------------------------------------------------- */
        this.color          = props.color;
        this.cursor         = props.cursor;

        /* ------------------------------------------------- */
        this.activeCell     = null;

        this.layout         = [];   //  Array of the layout of hexcells
        this.text           = [];   //  Array of nexCell hints

        this.lines          = [];   //  Array of hexCells with highlight lines activated
        this.halos          = [];   //  Array of hexCells with a halo activated

        this.clrOffset      = 0;    //  Used to pulsate the halo
        this.clrIncr        = 0.5;  //  Something, something halo

        app.hexBoard        = this; //  Set a global hexBoard reference

        this.reset();

      };
      hexBoard.prototype=Object.create(control.prototype);
      hexBoard.prototype.reset        =function(){

        var p=this;             //  Set a reference to the hexBoard control

        this.controls   = [];   //  Clear the controls array
        this.activeCell = null; //  Clear the active hexCell

      // BLANK:            '.',

      // BLACK:            'o',
      // BLACK_REVEALED:   'O',
      // BLUE:             'x',
      // BLUE_REVEALED:    'X',

      // DOWN_RIGHT:       '>', // Double up the \ character because it is an escape character and the first one won't be recognised
      // DOWN_CENTER:      '|',
      // DOWN_LEFT:        '/',

      // NUMBER:           '+',
      // CONSECUTIVE:      'c',
      // NOT_CONSECUTIVE:  'n'
      
        // this.layout=[
                     // ['.', '.', '.', '.', '.', '.', '.', '|', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '|', '.', 'x', '.', '|', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '|', '|', 'o', 'o', 'o', 'o', 'o', '|', '|', '.', '.', '.'],
                     // ['.', '|', '|', 'x', 'x', 'x', 'o', 'o', 'x', 'o', 'o', 'o', '|', '|', '.'],
                     // ['.', 'x', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x', 'o', 'o', '.'],
                     // ['.', 'o', 'o', 'o', 'o', 'o', 'o', 'x', 'o', 'x', 'o', 'o', 'o', 'o', '.'],
                     // ['.', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', '.'],
                     // ['>', 'x', 'o', 'o', 'o', 'o', 'o', 'O', 'o', 'o', 'o', 'o', 'x', 'o', '.'],
                     // ['.', 'o', 'x', 'x', 'o', 'o', 'x', 'x', 'o', 'o', 'x', 'o', 'o', 'o', '.'],
                     // ['>', 'o', 'o', 'o', 'o', 'x', 'o', 'o', 'o', 'x', 'o', 'x', 'x', 'o', '/'],
                     // ['>', 'o', 'x', 'o', 'o', 'o', 'o', 'O', 'o', 'o', 'o', 'o', 'o', 'x', '/'],
                     // ['.', '.', 'o', 'o', 'o', 'x', 'o', 'x', 'o', 'o', 'o', 'o', 'o', '.', '.'],
                     // ['.', '.', '.', '.', 'o', 'o', 'x', 'O', 'x', 'o', 'o', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', 'o', 'x', 'x', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                    // ];

        // this.text  =[
                     // ['.', '.', '.', '.', '.', '.', '.', '+', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '+', '.', '.', '.', '+', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '+', '+', '+', '.', '.', '.', '+', '+', '+', '.', '.', '.'],
                     // ['.', '+', '+', 'x', '.', '.', '+', '+', '.', '+', '.', '+', '+', '+', '.'],
                     // ['.', 'x', '+', '+', '+', '+', '+', '+', '+', '+', '.', '.', '+', '+', '.'],
                     // ['.', '.', '.', '+', '.', '+', '.', '.', '+', '.', '+', '+', '+', '.', '.'],
                     // ['.', '+', '.', '.', '.', '.', '+', '+', '+', '.', '.', '.', '.', '+', '.'],
                     // ['+', 'x', '+', '+', '.', '.', '+', '+', '+', '.', '.', '+', '.', '+', '.'],
                     // ['.', '.', '.', 'x', '+', '.', '.', '.', '+', '.', '.', '+', '+', '+', '.'],
                     // ['+', '+', '.', '+', '+', '.', '.', '.', '.', '.', '+', '.', '.', '+', '+'],
                     // ['+', '+', '.', '+', '+', '.', '.', '+', '.', '.', '+', '+', '+', '.', '+'],
                     // ['.', '.', '+', '.', '.', '.', 'c', '.', '+', '+', '.', '.', '+', '.', '.'],
                     // ['.', '.', '.', '.', '+', '+', '.', '+', '.', '+', '+', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '+', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                    // ];

        // this.layout=[
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', 'x', '.', '.', '.', '.', '.', '.', '.', 'o', '.', '.', '.'],
                     // ['.', '.', 'x', 'O', 'x', '.', '.', '.', '.', '.', 'o', 'O', 'o', '.', '.'],
                     // ['.', '.', 'x', 'x', 'x', '.', '.', '.', '.', '.', 'o', 'o', 'o', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'o', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'o', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'x', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                    // ];

        // this.text  =[
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '+', '.', '.', '.'],
                     // ['.', '.', '.', '+', '.', '.', '.', '.', '.', '.', '+', '+', '+', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '+', '+', '+', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '+', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '+', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                     // ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                    // ];

this.layout=[
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', 'x', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', 'O', '.', 'o', '.', 'O', '.', '.', '.', '.', '.', 'x', '.', '.', '.'],
['.', 'x', 'x', 'O', 'x', 'x', '.', '.', '.', 'x', '.', 'o', '.', 'x', '.'],
['.', 'O', 'x', 'x', 'x', 'O', '.', '.', '.', 'O', 'O', 'x', 'O', 'O', '.'],
['.', '.', '.', 'O', '.', '.', '.', '.', '.', 'x', 'O', 'O', 'O', 'x', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'x', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
];
this.text=[
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '+', '.', '+', '.', '+', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '+', '.', '.', '.', '.', '.', '.', '.', '+', '.', '.', '.'],
['.', '+', '.', ',', '.', '+', '.', '.', '.', '+', '+', '.', '+', '+', '.'],
['.', '.', '.', '+', '.', '.', '.', '.', '.', '.', '+', '+', '+', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
];

        this.messages=["Remove orange hexes to reveal the pattern underneath.",
                       "The number in an empty hex tells you how many adjacent hexes are part of the pattern.",
                       "Left click to mark a hex as part of the pattern.",
                       "Right click to destroy hexes that aren't part of the pattern."];

        var rowArray=[];  // Temporary 1-D array to hold each successive row before adding to the corresponding 2-D array
        var n=0;          // Iterator

        function load(){
          
          app.controlCount=0;

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

              rowArray.push(new hexCell(getGUID(), p, x, y, w, w,
                {execute:   clickTest,
                 row:       row,
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

        app.gameOver=false;

      };
      hexBoard.prototype.draw         = function(){

        if(!this.visible){ return; }
              
          var p=this;

          function drawGuideLines(){

            var offset=(HEX_SIZE-2)/2;

            strokeWeight(6);
            stroke(getColor(CLRS.WHITE,25));

            for(var l in p.lines){

              switch(p.lines[l].layout){

                case HEXY_TYPES.DOWN_CENTER:

                  line(p.lines[l].x, p.lines[l].y + offset,
                       p.lines[l].x, height);

                  break;

                case HEXY_TYPES.DOWN_LEFT:

                  var x=p.lines[l].x;
                  var y=p.lines[l].y;
                  var offsetX=cos(PI-PI/6)*offset;
                  var offsetY=sin(PI-PI/6)*offset;

                  line(x+offsetX,
                       y+offsetY,
                       x+offsetX+600*tan(PI-PI/3),
                       y+offsetY+600);


                  break;

                case HEXY_TYPES.DOWN_RIGHT:

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

            app.remaining = 0;
            app.covered   = 0;

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

            app.remaining = total;
            app.covered   = covered;

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

          function drawMessages(){
            
            textAlign(LEFT,CENTER);
            textSize(12);
            fill(getColor(CLRS.BLACK,75));
            
            for(var m in p.messages){

              text(p.messages[m], 80, 500+m*18);

            }

          };

          this.active=this.hit &&
                      app.focus===this;

          if(this.active){ cursor(this.cursor); }

          this.lines=[];
          this.halos=[];

          pushMatrix();

            translate(this.x, this.y);

              noStroke();
              fill(this.color);

                rect(this.x, this.y, this.w, this.h);
              
              // update and draw
              var ctrls=p.controls;

              for(var r in ctrls){
                for(var c in ctrls[r]){

                  if(ctrls[r][c].line){
                    p.lines.push(ctrls[r][c]);
                  }

                  if(ctrls[r][c].halo){
                    p.halos.push(ctrls[r][c]);
                  }

                  ctrls[r][c].draw();

                }
              }

              if(this.lines.length>0){ drawGuideLines(); }
              if(this.halos.length>0){ drawHalos();      }

              calculateRemaining();
              
              drawMessages();
              
          popMatrix();

      };
      hexBoard.prototype.moved        = function(x,y){

        if(!this.visible){ return; }
        
          if(mouseX>(this.x+x) &&
             mouseX<(this.x+x) + this.w &&
             mouseY>(this.y+y) &&
             mouseY<(this.y+y) + this.h){

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

          }
        }

      };
      hexBoard.prototype.update=function(){

        var p=this;           //  Set a reference to the hexBoard control

        // this.controls=[];        //  Clear the controls array
        // this.activeCell = null;  //  Clear the active hexCell

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

                    if(ctrl.layout===HEXY_TYPES.BLUE ||
                       ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                      total++;
                    }

                  }

                  // Bottom
                  if(r<ctrls[r].length-1){

                    ctrls[r][c].bottom = ctrls[r+1][c];

                    ctrl=ctrls[r][c].bottom;

                    if(ctrl.layout===HEXY_TYPES.BLUE ||
                       ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
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

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                        total++;
                      }

                    }
                    else if(c%2===1){

                      ctrls[r][c].topLeft = ctrls[r][c-1];

                      ctrl=ctrls[r][c].topLeft;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                        total++;
                      }

                    }

                  }

                  //  Bottom Left
                  if(c>0){

                    if(c%2===0){

                      ctrls[r][c].bottomLeft = ctrls[r][c-1];

                      ctrl=ctrls[r][c].bottomLeft;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                        total++;
                      }

                    }
                    else if(c%2===1 &&
                            r<ctrls[0].length-1){

                      ctrls[r][c].bottomLeft = ctrls[r+1][c-1];

                      ctrl=ctrls[r][c].bottomLeft;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
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

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                        total++;
                      }

                    }
                    else if(c%2===1){

                      ctrls[r][c].topRight = ctrls[r][c+1];

                      ctrl=ctrls[r][c].topRight;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                        total++;
                      }

                    }

                  }

                  //  Bottom Right
                  if(c<ctrls[0].length-1){

                    if(c%2===0){

                      ctrls[r][c].bottomRight = ctrls[r][c+1];

                      ctrl=ctrls[r][c].bottomRight;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                        total++;
                      }

                    }
                    else if(c%2===1 &&
                            r<ctrls[0].length-1){

                      ctrls[r][c].bottomRight = ctrls[r+1][c+1];

                      ctrl=ctrls[r][c].bottomRight;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
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

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].bottom!==null){
                    if(ctrls[r][c].bottom.bottom!==null){

                      ctrl=ctrls[r][c].bottom.bottom;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                // -------------------------

                  if(ctrls[r][c].topLeft!==null){
                    if(ctrls[r][c].topLeft.topLeft!==null){

                      ctrl=ctrls[r][c].topLeft.topLeft;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].bottomLeft!==null){
                    if(ctrls[r][c].bottomLeft.bottomLeft!==null){

                      ctrl=ctrls[r][c].bottomLeft.bottomLeft;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }


                // -------------------------

                  if(ctrls[r][c].topRight!==null){
                    if(ctrls[r][c].topRight.topRight!==null){

                      ctrl=ctrls[r][c].topRight.topRight;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].bottomRight!==null){
                    if(ctrls[r][c].bottomRight.bottomRight!==null){

                      ctrl=ctrls[r][c].bottomRight.bottomRight;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                // -------------------------

                  if(ctrls[r][c].top!==null){
                    if(ctrls[r][c].top.topLeft!==null){

                      ctrl=ctrls[r][c].top.topLeft;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].top!==null){
                    if(ctrls[r][c].top.topRight!==null){

                      ctrl=ctrls[r][c].top.topRight;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                // -------------------------

                  if(ctrls[r][c].bottom!==null){
                    if(ctrls[r][c].bottom.bottomLeft!==null){

                      ctrl=ctrls[r][c].bottom.bottomLeft;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].bottom!==null){
                    if(ctrls[r][c].bottom.bottomRight!==null){

                      ctrl=ctrls[r][c].bottom.bottomRight;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                // -------------------------

                  if(ctrls[r][c].topRight!==null){
                    if(ctrls[r][c].topRight.bottomRight!==null){

                      ctrl=ctrls[r][c].topRight.bottomRight;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
                         dCount++;
                      }

                    }
                  }

                  if(ctrls[r][c].topLeft!==null){
                    if(ctrls[r][c].topLeft.bottomLeft!==null){

                      ctrl=ctrls[r][c].topLeft.bottomLeft;

                      if(ctrl.layout===HEXY_TYPES.BLUE ||
                         ctrl.layout===HEXY_TYPES.BLUE_REVEALED){
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

    }

    /* Controls ============================================================ */

    /** Music           -------------------------------------------------- */
    {

      function music(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.cursor   = props.cursor;
        
        this.execute  = props.execute;
        this.retrieve = props.retrieve;

      };
      music.prototype=Object.create(control.prototype);
      music.prototype.draw=function(){

        if(!this.visible){ return; }

          this.active=this.hit &&
                      app.focus===this;

          pushMatrix();

            translate(this.x, this.y);
            scale(1,-1);

              noStroke();

              if(this.active){

                cursor(this.cursor);

                fill(getColor(CLRS.BLACK,5));

                  ellipse(0,0,this.w,this.w);

              }

              scale(1,-1);
              
              this.on=this.retrieve();
              
              if(this.on){ fill(128); }
              else       { fill(164); }

              textFont(this.font);
              textSize(36);
              textAlign(CENTER,CENTER);

                text(CONSTANTS.NOTE, 0, 0);

              noFill();
              
              if(!this.on){
                stroke(164);
                strokeWeight(3);

                  ellipse(0, 0, this.w-5, this.w-5);

                  line(-15, 15, 15,-15);

              }

          popMatrix();

      };
      music.prototype.moved=function(x,y){

        if(!this.visible){ return; }
      
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

    /** Score           -------------------------------------------------- */
    {

      function score(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.cursor   = props.cursor;
        this.color    = props.color;

        this.execute  = props.execute;
        this.retrieve = props.retrieve;

      };
      score.prototype=Object.create(control.prototype);
      score.prototype.draw=function(){

        if(!this.visible){ return; }

          this.active=this.hit &&
                      app.focus===this;

          this.offset=0;
                      
          pushMatrix();

            translate(this.x, this.y);
            stroke(CLRS.BLACK);

              textFont(this.font);
              textSize(20);

              var categories='Remaining'    + '\n\n' +
                             'Mistakes';
              var values    =this.execute() + '\n\n' +
                             this.retrieve();

              var w=textWidth(categories)+20;

              stroke(this.color);
              strokeWeight(1);
              fill(getColor(this.color, 65));

                rect(0, 0, w, 105, 3);

              fill(getColor(CLRS.WHITE,75));
              textAlign(RIGHT,TOP);

                text(categories,  w-10, 0);

              fill(getColor(CLRS.YELLOW,75));
              textAlign(RIGHT,TOP);

                text(values,      w-10, 25);

          popMatrix();

      };
      // score.prototype.move=function(x,y){

      // };

    }

    /** Puzzle Button   -------------------------------------------------- */
    {

      function puzzle_Button(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.style     = props.style;
        this.text      = props.text;
        this.index     = props.index;
        this.threshold = props.threshold;
        this.retrieve  = props.retrieve;
        this.execute   = props.execute;
        this.cursor    = props.cursor;

        /* Initialize */
        var w2=this.w/2;

        this.points    = [];
        this.interior  = [];
        this.shadow    = [];

        for(pt=0; pt<6; pt++){

          this.points.push(  new pnt( cos(radians(pt*60))*(w2),
                                      sin(radians(pt*60))*(w2) ));

          this.interior.push(new pnt( cos(radians(pt*60))*(w2-5),
                                      sin(radians(pt*60))*(w2-5) ));

          this.shadow.push(  new pnt( cos(radians(pt*60))*(w2+5),
                                      sin(radians(pt*60))*(w2+5) ));

        }

      };
      puzzle_Button.prototype=Object.create(control.prototype);
      puzzle_Button.prototype.draw=function(){
        
        if(!this.visible){ return; }
        
          var p=this;
          var offset=this.offset=0;

          this.active=this.hit &&
                      app.focus===this;

          pushMatrix();

            translate(this.x, this.y);

              if(this.active){
                cursor(this.cursor);
                if(app.left){ offset=1; }
              }

              function exterior(){

                strokeWeight(2);
                noStroke();
                // stroke(CLRS.H_BLUE);
                fill(getColor(CLRS.H_BLUE,100));

                if(p.active){
                  stroke(getColor(CLRS.BLACK,25));
                  // fill(getColor(CLRS.H_BLUE_L,100));
                }

                beginShape();

                  for(var n in p.points){
                    vertex(p.points[n].x+offset, p.points[n].y+offset);
                  }

                endShape(CLOSE);

              }
              function interior(){

                noStroke();

                fill(getColor(CLRS.H_BLUE_L,100));

                beginShape();

                  for(var n in p.points){
                    vertex(p.interior[n].x+offset, p.interior[n].y+offset);
                  }

                endShape(CLOSE);

              };
              function shadow(){

                noStroke();
                fill(getColor(CLRS.GRAY,20));

                beginShape();

                  for(var n in p.points){
                    vertex(p.shadow[n].x+offset, p.shadow[n].y+offset);
                  }

                endShape(CLOSE);

              };
              function label(){

                noStroke();
                textSize(14);
                textAlign(CENTER,CENTER);

                fill(CLRS.GRAY);

                  text(p.text, offset+1, offset+1);

                fill(CLRS.WHITE);

                  text(p.text, offset, offset);

              };
              function lock(){

                strokeWeight(2);
                noStroke();
                fill(getColor(CLRS.BLACK,100));

                if(p.active){
                  stroke(getColor(CLRS.BLACK,25));
                }

                beginShape();

                  for(var n in p.points){
                    vertex(p.points[n].x+offset, p.points[n].y+offset);

                  }

                endShape(CLOSE);

                strokeWeight(2);
                noStroke();
                fill(64);

                beginShape();

                  for(var n in p.points){
                    vertex(p.interior[n].x+offset, p.interior[n].y+offset);
                  }

                endShape(CLOSE);

                stroke(CLRS.BLACK);
                fill(64);

                  rect(-4, -12, 8, 12, 5);

                stroke(CLRS.BLACK);
                fill(32);

                  rect(-6, -4, 12, 12, 2);

              };

              if(p.retrieve()>=p.threshold){

                exterior();
                interior();
                shadow();
                label();

              }
              else{

                lock();

              }

          popMatrix();

      };
      puzzle_Button.prototype.moved=function(x,y){
      /** Overridden for shape */

        if(!this.visible){ return; }

          if(this.parent.hit){

            if(dist(mouseX, mouseY,
                    this.x+x,
                    this.y+y)<this.w/2){

              this.outerHit=true;

                var rectHit=rectangleHit(new pnt(this.x+this.points[1].x+x, this.y+this.points[1].y+y),
                                         new pnt(this.x+this.points[2].x+x, this.y+this.points[2].y+y),
                                         new pnt(this.x+this.points[4].x+x, this.y+this.points[4].y+y),
                                         mouseX,mouseY);

                var triHit0=triangleHit(new pnt(this.x+this.points[0].x+x, this.y+this.points[0].y+y),
                                        new pnt(this.x+this.points[1].x+x, this.y+this.points[1].y+y),
                                        new pnt(this.x+this.points[5].x+x, this.y+this.points[5].y+y),
                                        mouseX,mouseY);

                var triHit1=triangleHit(new pnt(this.x+this.points[2].x+x, this.y+this.points[2].y+y),
                                        new pnt(this.x+this.points[3].x+x, this.y+this.points[3].y+y),
                                        new pnt(this.x+this.points[4].x+x, this.y+this.points[4].y+y),
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
      puzzle_Button.prototype.clicked=function(){
      /** Overridden for execute */

        if(this.active){

          this.execute(this.index);

          app.score+=5;
          
          // this.parent.visible=false;

        }

      };

    }

    /** Hexy Button     -------------------------------------------------- */
    {

      function hexy_Button(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.style    = props.style;
        this.text     = props.text;

        this.cursor   = props.cursor;

        this.execute  = props.execute;

        this.color    = props.color;
           
      };
      hexy_Button.prototype=Object.create(control.prototype);
      hexy_Button.prototype.draw=function(){

        if(!this.visible){ return; }

          function replay(){

            // Arrows ---------- 
            fill(getColor(CLRS.BLACK, 25));

            if(p.active){ fill(getColor(CLRS.BLACK, 50)); }

            textAlign(CENTER,CENTER);
            textSize(24);

              text(CONSTANTS.TRIANGLE_DOWN, p.w/2+p.offset+16, p.h/2+p.offset-5);

            // Arc ---------- 
            pushMatrix();
              
              translate(p.w/2+p.offset, p.h/2+p.offset);
              rotate(-PI/12);
                
                noFill();
                stroke(getColor(CLRS.BLACK, 25));

                if(p.active){ stroke(getColor(CLRS.BLACK, 50)); }

                  arc(0, 0,
                      40,             40,
                      radians(60),    2*PI-radians(22.5));

            popMatrix();
                      
            // Caption ---------- 
            fill(getColor(CLRS.BLACK, 15));

            if(p.active){ fill(getColor(CLRS.BLACK, 30)); }

            textAlign(LEFT,TOP);
            textSize(16);

              rotate(PI/2);
              text(p.text, 5+p.offset, -22-p.offset);

          };
          function menu(){

            function drawHexagon(x,y,sz){

              var ang=0;

              beginShape();

                for(pt=0; pt<6; pt++){
                  vertex( x+cos(radians(ang+pt*60))*(sz)+p.offset,
                          y+sin(radians(ang+pt*60))*(sz)+p.offset );
                }

              endShape(CLOSE);

            };

            // Hexagons
            noFill();
            stroke(getColor(CLRS.BLACK, 50));
            strokeWeight(1);

            if(p.active){ stroke(CLRS.BLACK); }

              for(var ang=0; ang<6; ang++){
                drawHexagon(p.w/2+cos(radians(ang*60+30))*20,
                            p.h/2+sin(radians(ang*60+30))*20,
                            10);
              }

            // Caption ---------- 
            fill(getColor(CLRS.BLACK, 15));

            if(p.active){ fill(getColor(CLRS.BLACK, 30)); }

            textAlign(LEFT,TOP);
            textSize(16);

              rotate(PI/2);
              text(p.text, 5+p.offset, -22-p.offset);

          };
          function next(){

            // Triangle ----------
            fill(getColor(CLRS.BLACK, 25));

            if(p.active){ fill(getColor(CLRS.BLACK, 50)); }

            textAlign(CENTER,CENTER);
            textSize(48);

              text(CONSTANTS.TRIANGLE_R, p.w/2+p.offset, p.h/2+p.offset);

            // Caption ----------
            fill(getColor(CLRS.BLACK, 15));

            if(p.active){ fill(getColor(CLRS.BLACK, 30)); }

            textAlign(LEFT,TOP);
            textSize(16);

              rotate(PI/2);
              text(p.text, 5+p.offset, -22-p.offset);

          };

          var p=this;
          this.offset=0;
          
          this.active=this.hit &&
                      app.focus===this;

          pushMatrix();

            translate(this.x, this.y);

              if(this.active){ cursor(this.cursor);
                               if(app.left){ this.offset=1; } }

              // Border
              stroke(getColor(CLRS.BLACK,50));
              strokeWeight(0.5);
              fill(CLRS.WHITE);

              if(p.active){ stroke(getColor(CLRS.BLACK,75)); }

                rect(this.offset, this.offset, this.w, this.h, 3);

              if     (this.style==='replay'){ replay(); }
              else if(this.style==='menu'  ){ menu();   }
              else if(this.style==='next'  ){ next();   }

          popMatrix();

      };      
      hexy_Button.prototype.clicked=function(){
      /** Overridden for execute */
      
        if(this.active){ this.execute(this.text); }
        
      };

    }

    /** Reset Button    -------------------------------------------------- */
    {

      function resetButton(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.cursor   = props.cursor;
        this.color    = props.color;

        this.execute  = props.execute;

      };
      resetButton.prototype=Object.create(control.prototype);
      resetButton.prototype.draw=function(){
        
        if(!this.visible){ return; }

          this.active=this.hit &&
                      app.focus===this;

          this.offset=0;

            pushMatrix();

              translate(this.x,this.y);

                var sz=0.67;
                var clr=color(128);

                ellipseMode(CENTER);

                stroke(getColor(clr, 50));

                if(this.active){

                  noStroke();
                  fill(getColor(CLRS.BLACK,5));

                    ellipse(0, 0, this.w, this.w);

                  stroke(getColor(clr, 100));
                  cursor(this.cursor);

                }

                strokeWeight(1.5);
                noFill();

                if(this.active &&
                   app.left){

                  rotate(radians(45));

                }

                  arc(0, 0, this.w*sz, this.h*sz, radians(60), 2*PI-radians(22.5));

                fill(getColor(clr, 50));

                if(this.active){ fill(getColor(clr, 100)); }

                  pushMatrix();

                    translate(4,-5);
                    rotate(PI/6);

                      triangle( 0,   0,
                               10,   0,
                               10, -10);

                  popMatrix();

            popMatrix();


          popMatrix();

      };      
      resetButton.prototype.clicked=function(){
      /** Overridden for execute */
        
        if(this.active){ this.execute(); }
        
      };
      resetButton.prototype.moved=function(x,y){ 
      /** Overridden for shape */

        if(!this.visible){ return; }
      
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

    }

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
        // this.hpoints      = [];             //  Highlight

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

        this.timer        = 0;

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

            p.points.push(new pnt( cos(radians(ang+pt*60))*(d2),
                                   sin(radians(ang+pt*60))*(d2) ));

            p.opoints.push(new pnt( cos(radians(ang+pt*60))*(d2-3),
                                    sin(radians(ang+pt*60))*(d2-3) ));

            p.ipoints.push(new pnt( cos(radians(ang+pt*60))*(d2-8),
                                    sin(radians(ang+pt*60))*(d2-8) ));

            // p.hpoints.push(new pnt( cos(radians(ang+pt*60))*(d2-1),
                                    // sin(radians(ang+pt*60))*(d2-1) ));

          }

        };

        reset();

      };
      hexCell.prototype=Object.create(control.prototype);
      hexCell.prototype.draw=function(){

        function highlight(){

          if(p.layout===HEXY_TYPES.BLACK ||
             p.layout===HEXY_TYPES.BLACK_REVEALED ||
             p.layout===HEXY_TYPES.BLUE ||
             p.layout===HEXY_TYPES.BLUE_REVEALED){

            noStroke();
            fill(CLRS.WHITE);

            beginShape();

              for(var pt in p.hpoints){
                vertex(p.hpoints[pt].x-0.5,
                       p.hpoints[pt].y-0.5);
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
              offset=random(-1.5,1.5);
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

              return retVal;

            };
            
            pushMatrix();

              scale(1,-1);

                // textFont(p.font,16);
                // textSize(14);
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
                                                      if(p.text!==HEXY_TYPES.BLANK){

                                                        textAlign(CENTER,TOP);
                                                        rotate(0);

                                                        fill(CLRS.BLACK);
                                                        if(!p.enabled){ fill(getColor(CLRS.BLACK,25)); }

                                                        text(wrapText(p.count),0,0);

                                                      }

                                                      break;

                  case HEXY_TYPES.DOWN_LEFT:        /* Always has text */
                                                      if(p.text!==HEXY_TYPES.BLANK){

                                                        textAlign(CENTER,TOP);
                                                        rotate(PI/3);

                                                        fill(CLRS.BLACK);
                                                        if(!p.enabled){ fill(getColor(CLRS.BLACK,25)); }

                                                        text(wrapText(p.count),0,0);

                                                      }

                                                      break;

                  case HEXY_TYPES.DOWN_RIGHT:       /* Always has text */
                                                      if(p.text!==HEXY_TYPES.BLANK){

                                                        textAlign(CENTER,TOP);
                                                        rotate(-PI/3);

                                                        fill(CLRS.BLACK);
                                                        if(!p.enabled){ fill(getColor(CLRS.BLACK,25)); }

                                                        text(wrapText(p.count),0,0);

                                                      }

                                                      break;

                  case HEXY_TYPES.BLANK:
                  case HEXY_TYPES.BLUE:
                  default:                            break;/*  Blank and Blue never has text   */

                }

            popMatrix();

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

        if(!this.visible){ return; }

          this.active=this.hit &&
          app.focus===this;

          this.offset=0;
          var p=this;

          if(this.active){

            cursor(this.cursor);

            if(app.left){ this.offset=1; }

          }

          pushMatrix();

            translate(this.x, this.y);

            scale(1,-1);

              // highlight();  // Commented for Speed
              outerHexagon();
              innerHexagon();
              caption();
              activeCell();

              highlightActive();
              revealAnimation();

          popMatrix();

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

        if(!this.visible){ return; }
        
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

        if(!this.visible){ return; }
              
          if(this.active){

            if(app.mode===APPMODES.CREATE){

              this.incrementCellLayout();
              this.recalculate();

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
              }

              if(app.debug){
                // this.execute(this.id);
              }
              
            }

          }

      };
      hexCell.prototype.rclicked=function(){
        
        if(!this.visible){ return; }
        
          if(this.active){

            if(app.mode===APPMODES.CREATE){

              this.decrementCellLayout();
              this.recalculate();

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

              } // Blue Hexagon
              else if(this.layout===HEXY_TYPES.BLUE){
                app.errors++;
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

        // this.parent.update();

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

        // this.parent.update();

      };
      hexCell.prototype.recalculate=function(){

        this.parent.update();

      };

    }

    /** Transition      -------------------------------------------------- */
    {

      function transition(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.color      = props.color;

        this.timer      = 0;

        this.type       = props.type;

        this.incr       = -5;

        this.visible    = props.visible;

        app.transition  = this;

      };
      transition.prototype=Object.create(control.prototype);
      transition.prototype.draw=function(){

        function fade(){

          fill(getColor(p.color,p.timer));
          noStroke();

            rect(0, 0, p.w, p.h);

        };
        function slide(){

          fill(p.color);
          noStroke();

          var w=p.timer/100*p.w;

            rect(0, 0, w, p.h);

        };
        function center(){

          fill(p.color);
          noStroke();

          var w=p.timer/100*p.w;
          var h=p.timer/100*p.h;

            rect((p.w-w)/2, (p.h-h)/2, w, h);

        };
        function edges(){

          fill(p.color);
          noStroke();

          var left    = -p.timer/100*p.w/2;
          var right   =  p.w/2+p.timer/100*p.w/2;
          var top     =  -p.timer/100*p.h/2;
          var bottom  =  p.h/2+p.timer/100*p.h/2;

            rect(right, 0,      p.w/2, p.h);    // right
            rect(left,  0,      p.w/2, p.h);    // left
            rect(0,     bottom, p.w,   p.h);    // bottom
            rect(0,     top,    p.w,   p.h/2);  // top

        };
        function hexagon(){

          fill(p.color);
          noStroke();

          var m=p.timer*5;

          beginShape();

            for(var n=0; n<6; n++){

              vertex(p.w/2+m*cos(n*PI/3),
                     p.h/2+m*sin(n*PI/3));

            }

          endShape(CLOSE);

        };

        if(!this.visible){ return; }

          var p=this;

          this.active=this.hit &&
                      app.focus===this;

          pushMatrix();

            translate(this.x, this.y);
            
            if(this.on){

              switch(this.type){

                case TRANSITION_TYPES.FADE:     fade();     break;
                case TRANSITION_TYPES.SLIDE:    slide();    break;
                case TRANSITION_TYPES.CENTER:   center();   break;
                case TRANSITION_TYPES.EDGES:    edges();    break;
                case TRANSITION_TYPES.HEXAGON:  hexagon();  break;

                default:                                    break;

              }

              if(this.timer>=100 ||
                 this.timer<=0){
                this.incr*=-1;
              }

              this.timer+=this.incr;

            }

          popMatrix();

      };
      transition.prototype.moved= function(x,y){

        if(!this.visible){ return; }

          if(this.parent.hit){
          
          if(mouseX>(this.x+x) &&
             mouseX<(this.x+x) + this.w &&
             mouseY>(this.y+y) &&
             mouseY<(this.y+y) + this.h){

              this.hit=true;

              if(this.on){
print(this.id);                
                app.focus=this;
              }

          }
          else{

            this.hit=false;

          }
          
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
      var rt=new root(getGUID(), 0, 0, width, height,
        {color:     color(192),
         border:    true});

      app.controls.push(rt);

      /* hexBoard           */
      rt.controls.push(new hexBoard(getGUID(), rt, 0, 0, 600, 600,
        {cursor:    ARROW,
         color:     color(222)}));

      /* reset button       */
      rt.controls.push(new resetButton(getGUID(), rt, 565, 565, 40, 40,
        {cursor:    HAND,
         color:     CLRS.BLACK,
         execute:   reset}));

      /* music            */
      rt.controls.push(new music(getGUID(), rt, 35, 565, 50, 50,
        {cursor:    HAND,
         execute:   setMusic,
         retrieve:  getMusic}));

      /* score            */
      rt.controls.push(new score(getGUID(), rt, 475, 10, 50, 50,
        {color:     CLRS.H_BLUE,
         cursor:    HAND,
         execute:   getRemaining,
         retrieve:  getMistakes}));

      /* PuzzleComplete      */
      // var pc=new puzzleComplete(getGUID(), rt, 1, 1, width-2, height-2,
        // {text:      'Puzzle Complete',
         // color:     CLRS.BLACK,
         // visible:    false});

      // app.controls.push(pc);

      /* PuzzleSelect      */
      // var ps=new puzzleSelect(getGUID(), rt, 10, 10, 600, 600,
        // {retrieve:  getScore,
         // color:     CLRS.WHITE});

      // app.controls.push(ps);



      /* SplashScreen ------------------------------------------------- */
      {

        // /* Splash Screen   */
        // var splashScreen=new splash(getGUID(), rt, width/2-200, height/2-200, 400, 400,
          // {color:     CLRS.BLACK,
           // font:      monoFont,
           // retrieve:  getInfo,
           // cursor:    CROSS});

          // /* Close         */
          // splashScreen.controls.push(new button(getGUID(), splashScreen, 180, 360, 120, 20,
            // {text:      'Close',
             // font:      monoFont,
             // execute:   toggleInfo,
             // color:     CLRS.WHITE,
             // cursor:    HAND}));

        // rt.controls.push(splashScreen);

      }

      /* Telemetry ---------------------------------------------------- */
      var telem=new telemetry(getGUID(), rt, width-195, 5, 190, height-10,
        {color:     color(36),
         cursor:    ARROW});

      rt.controls.push(telem);

      /* Transition ---------------------------------------------------- */
      var trans=new transition(getGUID(), rt, 0, 0, width-200, height,
        {color:     CLRS.H_BLUE_L,
         visible:   true,
         type:      TRANSITION_TYPES.FADE});

      rt.controls.push(trans);

// app.transition.on=true;

  };

  function intro(){ };
  function extro(){ };
  function instructions(){ };

  function play(){

    forEach(app.controls,'draw');

    // textFont(sansFont,64);
    // textSize(36);
    // textAlign(LEFT,TOP);
    // fill(getColor(CLRS.BLACK,15));

      // pushMatrix();

        // translate(10,5);
        // rotate(-PI/6);

          // text('Level ' + getPuzzleNumber(), 0, 0);

      // popMatrix();

    // if(app.remaining===0 &&
       // app.covered  ===0 &&
       // app.mode!==APPMODES.CREATE){

      // pComplete();

    // }

  };

  /** Testing *.hexcell file format ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  {
      // var f="................................................|+..............o...o...o...x...........x...x...o+..x+..........o+..o+..on..o...x.......|+..o...o+..x...x+..........o+..o...x...x+..o.......x...x...x...oc..x.......o...o+..o...o...o.......\\+..x...on..on..o+.........o...x...oc..x...o...........x+..x...o+..x...x.......x...o+..x...oc..o...o+.";

      // var f="............................|+..............|+......|+..................................|+..........|+../+..............|+......................o...o...o...x...x...x...x...o+..o+..o+..x.......................x...x...o+..x+..x...o+..x...on..oc..oc..o+..x...................o+..o+..on..o...x...o+..x...o...x...x...x...x...o...............|+..o...o+..x...x+..x...o...o+..oc..x...x...x...x+..|+..............o+..o...x...x+..o...o+..o+..o+..x...x...o+..x...x...............x...x...x...oc..x...on..o+..x...x...x+..o+..on..o+..o+..........o...o+..o...o...o.......x+..o+..o+......x...x...x...o+..o.......\\+..x...on..on..o+..........o+..o+..........x...o...o...o+..........o...x...oc..x...o.......x...o+..x...|n..o+..x...x...x...x...........x+..x...o+..x...x...x+..x...o+..x+..o...x...o+..o+..o...........x...o+..x...oc..o...o+..x...x...x...x...o...o...o+..on..o+..........o+..x...o...o+..on..o+..o...o+..o...x+..o...o+..x...o+..........o...o...o...o+..oc..x...o+..On..o+..x...o+..x+..on..o...x...........o+..x...x...x...o+..x...o...x...o...o...o...x...o+..o+..........x+..x...x.......x...oc..x.......x...o...o.......o...x...x...........on..o+..........o...oc../+..|+..x+..x...........o...o+..........o...x...on......x...o...o+..|n..x...x...x.......x...o...o+..........o...x...o+..x...o...oc..x...x...x...o+..o...o...o...x...........x...x+..o+..x...o+..x...o+..On..oc..o+..x...o...o+..oc..o...........x...o+..o...x+..o+..x...x...o+..o+..o...o+..oc..o...x...........o...x+..x...oc..o+..x...x...o+..o+..o...x...oc..x...o+..x...........o...o...o+..o...o+..o...o...o...x...x...o+..x...o+..o+..........x...x...o+..o+..o+......o+..on..x.......o+..x...o...o...x...........o+..on..o+..x...|+......x...x.......|n..on..x...x...oc..........o...on..oc..x+..x...|n..o+..o+..x.......o+..o+..x+..o+..x...........o+..x...o...oc..on..x...o+..x...x...x...x...x...o...x...............o+..x...x+..o...x...o...x...x...o+..o+..x...o+..o+..................o...x...oc..x+..oc..x...o+..o+..o+..on..on..x+..................o+..x...x...o...oc..o...oc..o...o...o+..o+..x+..o+..................o+..x...o+..x+..o...x...o...o+..x...x...o+..x.......................o...o...x...x...x...x...o...o...o...x...o+............";

      // var first='';
      // var secnd='';

      // for(var n=0; n<f.length; n+=2){

        // first+=f.substring(  n, n+1);
        // secnd+=f.substring(n+1, n+2);

      // }

// print(f.length);

// print(first);
// print(first.length);

// print(secnd);
// print(secnd.length);

      // var arrFirst=[];
      // var arrSecond=[];

      // for(var n=0; n<first.length; n+=13){

        // arrFirst.push( split(first.substring(n, n+13),''));
        // arrSecond.push(split(secnd.substring(n, n+13),''));

      // }

  // for(var row=0; row<arrFirst.length; row++){
    // print(arrFirst[row]);
  // }

// print(arrFirst.length);

// print(arrSecond);
// print(arrSecond.length);
// print(arrSecond.length);

  }
  /** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  var execute;

  initialize();

  execute=play;

  app.focus=app.hexBoard;

  strokeJoin(MITER);
  strokeCap(SQUARE);
  
  draw=function(){

    background(255);

    app.frameRate=this.__frameRate;

    execute();

  };

  print( typeof app.transition );

// app.transition.on=false;
// app.transition.type=TRANSITION_TYPES.EDGES;

  // app.levelScores[31]=1111;

  for (var n in app.levelScores){
    print(app.levelScores[n]);
  }

  /* Keyboard Events =========================================================== */
  {

    keyPressed=function(){

print(keyCode);

      app.keys[keyCode]=true;

        switch(true){

          /*  Function Keys                                                                               */
          case app.keys[KEYCODES.F1]:           toggleInfo();             break;    /* F1 - Info          */
          case app.keys[KEYCODES.F2]:           toggleCreate();           break;    /* F2 - Toggle Create */
          case app.keys[KEYCODES.F3]:           toggleTelemetry();        break;    /* F3 - Telemetry     */
          case app.keys[KEYCODES.F4]:           printLayout();            break;    /* F4 - Print Layout  */

          case app.keys[KEYCODES.CONTROL] &&
               app.keys[KEYCODES.F5]:           clearLayout();            break;    /* CTRL + F5          */
          case app.keys[KEYCODES.F6]:           reset();                  break;    /* F6 - reset layout  */

          case app.keys[KEYCODES.A]:            decrementPuzzle();        break;    /* A                  */
          case app.keys[KEYCODES.D]:            incrementPuzzle();        break;    /* D                  */

          /*  Navigation                                                                                  */
          case app.keys[KEYCODES.UP]:           up();                     break;    /* Up                 */
          case app.keys[KEYCODES.DOWN]:         down();                   break;    /* Down               */

          case app.keys[KEYCODES.RIGHT] &&
               app.keys[KEYCODES.CONTROL]:      downRight();              break;    /* Down Right         */
          case app.keys[KEYCODES.RIGHT]:        upRight();                break;    /* Up Right           */

          case app.keys[KEYCODES.LEFT] &&
               app.keys[KEYCODES.CONTROL]:      downLeft();               break;    /* Down Left          */
          case app.keys[KEYCODES.LEFT]:         upLeft();                 break;    /* Up Left            */

          /*  Cell Options                                                                                */
          case app.keys[KEYCODES.O] &&
               app.keys[KEYCODES.SHIFT]:        setBlackRevealed();       break;    /* Black Revealed     */
          case app.keys[KEYCODES.O]:            setBlack();               break;    /* Black              */
          case app.keys[KEYCODES.X] &&
               app.keys[KEYCODES.SHIFT]:        setBlueRevealed();        break;    /* Blue Revealed      */
          case app.keys[KEYCODES.X]:            setBlue();                break;    /* BLUE               */

          case app.keys[KEYCODES.DOWN_CENTER]:  setDownCenter;            break;    /* Down Center        */
          case app.keys[KEYCODES.DOWN_LEFT]:    setDownLeft;              break;    /* Down Left          */
          case app.keys[KEYCODES.DOWN_RIGHT]:   setDownRight();           break;    /* Down Right         */

          case app.keys[KEYCODES.B]:            setBlank();               break;    /* Blank              */
          case app.keys[KEYCODES.PLUS] ||
               app.keys[KEYCODES.T] ||
               app.keys[KEYCODES.t]:            setNumber();              break;    /* Number             */

          case app.keys[KEYCODES.C]:            setConsecutive();         break;    /* Consecutive        */
          case app.keys[KEYCODES.N]:            setNonConsecutive();      break;    /* Non-Consecutive    */

          case app.keys[KEYCODES.SPACE] &&
               app.keys[KEYCODES.CONTROL]:      decrementCellLayout();    break;    /* Decrement Layout   */
          case app.keys[KEYCODES.SPACE]:        incrementCellLayout();    break;    /* Increment Layout   */

          default:                                                        break;

        }

    };
    keyTyped=function()   { /* print('typed ' + (key) + ' ' + keyCode); */    };
    keyReleased=function(){ app.keys[keyCode]=false;                          };

  }

  /* Mouse Events ============================================================== */
  {

    mouseClicked=function(){

      switch(mouseButton){

        case LEFT:    forEach(app.controls, 'clicked' ); break;
        case RIGHT:   forEach(app.controls, 'rclicked'); break;
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
    mouseMoved=function(){

      app.mouseX=mouseX;
      app.mouseX=mouseY;

      for(var c in app.controls){ app.controls[c].moved(0,0); }

    };
    mouseDragged=function(){

    };
    mouseOut=function(){

      forEach(app.controls,'out');

      app.focus=-1;

    };
    mouseOver=function(){

      forEach(app.controls,'over');

      app.focus=-2;

    };

  }
  
  
/*

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
