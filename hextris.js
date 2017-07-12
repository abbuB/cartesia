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
+hex.frvr.com
+mynoise.net
+developer.mozilla.org

*/

var diagrams = function(processingInstance){
  with (processingInstance){
/*


    TO DO:
      
      Names:  heXcell
              geekred
              ...

      GAMES:
              Choose Life - Sliding Triangle Game
            
      - rotating hexagons for row clearance
      
      - Undo Stack
      - High Score
      - Hints
      - Game Intro
      - Game Over
      - Error objects for each specific piece and error context
      - Highlight rows while tallying


    Research:


    TO DONE:

      - Animation for drop outside grid

      Old Mcdonald
      Sick of the farm
      Wants a new life 
      A new place to go
      But if you strip away the consonants from reinvention
      You get E I E I O
      
      Old Mcdonald
      Tried to give up the booze
      Should have done this a long time ago
      Suck out the vowels of best intentions
      You get E I E I O
      
      No more echos on the farm
      No more duck sounds in the air
      There's a quack quack here
      But there's no quack quack there
      
      Drunk on the insurance money
      From torching the farm
      Old Mcdonald gets a tattoo
      It's there amongst the skulls and the livestock
      It's E I E I O






        textFont(createFont('sans-serif', 14));
        textFont(createFont(monoFont, 14));
        textFont(createFont('serif', 14));
        textFont(createFont('fantasy', 14));
        textFont(createFont('cursive', 14));

        println( typeof this.color );

*/

  var serifFont = createFont('sans-serif', 16);
  var sansFont  = createFont('sans',       16);
  var monoFont  = createFont('monospace',  16);

  var global=this;

  const MY_FAV = 7;
  const HEX_SIZE=60;
  // const pi=nf(PI,1,10);

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

    this.dirty        = false;  //  Has a reset occurred

    this.debug        = true;   //  Mode that displays enhanced debugging tools

    this.frameRate    = 0;      //  Refresh speed

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
    this.telemetry    = 1;      //  Is telemetry visible

    /* Hextris Specific ------------------ */

    this.hexBoard     = this.controls[1];

    this.score        = 0;
    this.gameOver     = false;

  };

  var app=new application();

  /* Constants ============================================================= */
  {

    var CLRS_S={

      // SINGLE:         0,

      // LINE:           1,
      // LINE_FORWARD:   2,
      // LINE_BACK:      3,

      // DIAMOND:        4,

      // UUP:            5,
      // UDOWN:          6,

      // UPRIGHT:        7,
      // DOWNRIGHT:      8,
      // UPLEFT:         9,
      // DOWNLEFT:       10,

      // ZRIGHT:         11,
      // ZLEFT:          12,

      // SEVENRIGHT:     13,
      // SEVENLEFT:      14,

      // ANGLERIGHT:     15,
      // ANGLELEFT:      16,

      // NODEUPRIGHT:    17,
      // NODEUPLEFT:     18,
      // NODEDOWNRIGHT:  19,
      // NODEDOWNLEFT:   20,

      // VUPRIGHT:       21,
      // VUPLEFT:        22,
      // VDOWNRIGHT:     23,
      // VDOWNLEFT:      24

    };

    var CLRS={

      SINGLE:       color(170, 29, 29,255),
      LINE:         color(158,182, 58,255),
      DIAMOND:      color( 49,204,167,255),

      U:            color(238,214, 15,255),
      Z:            color( 29, 86,170,255),
      SEVEN:        color(255, 81,  0,255),
      B:            color(255,190,  0,255),
      NODE:         color(255, 20,147,255),
      V:            color(255,190,  0,255),

      RED:          color(170, 29, 29,255), GREEN:        color(158,182, 58,255),
      BLUE:         color( 29, 86,170,255), YELLOW:       color(238,214, 15,255),
      ORANGE:       color(238,136, 15,255), GRAY:         color(128,128,128,255),

      K_STEEL_0:    color( 48, 68, 82,255),
      K_STEEL_1:    color(132,177,208,255),
      K_STEEL_2:    color(106,141,166,255),
      K_STEEL_3:    color(136,164,184,255),

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

      K_RED:        color(170, 29, 29,255), K_GREEN:      color(158,182, 58,255),
      K_BLUE:       color( 29, 86,170,255), K_YELLOW:     color(238,214, 15,255),
      K_ORANGE:     color(238,136, 15,255), GRAY:         color(128,128,128,255),

      BROWN:        color(155,145,135,255),

      RED:          color(255,  0,  0,255), REDORANGE:    color(255, 81,  0,255),
      ORANGE:       color(255,127,  0,255), YELLOWORANGE: color(255,190,  0,255),
      YELLOW:       color(255,255,  0,255),

      YELLOWGREEN:  color(192,255,  0,255),
      GREEN:        color(  0,255,  0,255), BLUEGREEN:    color(  0,127,127,255),
      BLUE:         color(  0,  0,255,255), BLUEVIOLET:   color( 92,  0,255,255),

      VIOLET:       color(127,  0,255,255), REDVIOLET:    color(191,  0,127,255),

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

  }

  /* Utility Functions ===================================================== */
  {

    function getShape(){ return floor(random(0,25)); };

    function getPieceColor(n){

      var retVal=-1;

      switch(n){

        case SHAPES.SINGLE:         retVal=color(170, 29, 29,255);  break;

        case SHAPES.LINE:
        case SHAPES.LINEFORWARD:
        case SHAPES.LINEBACK:       retVal=color(158,182, 58,255);  break;

        case SHAPES.DIAMOND:        retVal=color( 49,204,167,255);  break;

        case SHAPES.UUP:
        case SHAPES.UDOWN:          retVal=color(238,214, 15,255);  break;

        case SHAPES.UPRIGHT:        retVal=color(0,  0,255,255);  break;
        case SHAPES.DOWNRIGHT:
        case SHAPES.UPLEFT:
        case SHAPES.DOWNLEFT:       retVal=color(192,  0,255,255);  break;

        case SHAPES.ZRIGHT:
        case SHAPES.ZLEFT:          retVal=color( 29, 86,170,255);  break;

        case SHAPES.SEVENRIGHT:
        case SHAPES.SEVENLEFT:
        case SHAPES.ANGLERIGHT:
        case SHAPES.ANGLELEFT:      retVal=color(255, 81,  0,255);  break;

        case SHAPES.NODEUPRIGHT:
        case SHAPES.NODEUPLEFT:
        case SHAPES.NODEDOWNRIGHT:
        case SHAPES.NODEDOWNLEFT:   retVal=color(255, 20,147,255);  break;

        case SHAPES.VUPRIGHT:
        case SHAPES.VUPLEFT:
        case SHAPES.VDOWNRIGHT:
        case SHAPES.VDOWNLEFT:      retVal=color(255,190,  0,255);  break;

        default:                                                    break;

      }

      return retVal;

    };

    function getColor(clr, alpha){ return color(red(clr), green(clr), blue(clr), alpha/100*255); };

    function reset()            {

      app.dirty=true;

        app.hexGarden.reset();

      app.dirty=false;

    };

    function getInfo()          { return app.info;                     };
    function toggleInfo()       { app.info=!app.info;                  };

    function getTelemetry()     { return app.telemetry;                };
    function toggleTelemetry()  { app.telemetry=!app.telemetry;        };

    function clickTest(n)       { println('click: ' + n);                    };

  }

  /* Containers/Controls =================================================== */
  {

    /* Default              */
    {

      var control=function(id, parent, x, y, w, h){

        /* explicit properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
        this.id       = id;       /** Unique identification number -- Change to GUID for production) */

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
      control.prototype.draw    = function(){};
      control.prototype.moved   = function(x,y){

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
      control.prototype.clicked = function(){ if(this.hit){ forEach(this.controls, 'clicked'); } };
      control.prototype.dragged = function(){ if(this.hit){ forEach(this.controls, 'dragged'); } };
      control.prototype.pressed = function(){};
      control.prototype.released= function(){};
      control.prototype.over    = function(){};
      control.prototype.out     = function(){ this.hit=false; forEach(this.controls, 'out'); };
      // control.prototype.typed=function(){};
      // control.prototype.rClicked=function(){};
      // control.prototype.cClicked=function(){};

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

            if(this.hit              ){ fill(this.acolor);   }
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

        if(this.hit){ forEach(this.controls, 'dragged'); }

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

              var txt0="In mathematics, Pascal's triangle is a triangular array of the binomial coefficients.";
              var txt1="The first and last cell in each row contains 1 (one) and every other cell is the sum of the two adjacent cells above.";
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
            fill(getColor(CLRS.BLACK,50));

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

          if(app.hexBoard.activePiece!==null){ activePiece=app.hexBoard.activePiece.id; }
          else                               { activePiece='null';                      }

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
                 nf(global,0,2)             + '\n',
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

        this.pieces         = [];
        this.scores         = [];

        this.activeCell     = null;
        this.activePiece    = null;

        this.position0      = new pnt(150, 525);
        this.position1      = new pnt(300, 525);
        this.position2      = new pnt(450, 525);

        this.reset();

        app.hexBoard=this;

      };
      hexBoard.prototype=Object.create(control.prototype);
      hexBoard.prototype.reset        =function(){

        var p=this; //  Reference to the hexBoard control

        p.controls=[];
        p.pieces=[];

        p.activeCell  = null;
        p.activePiece = null;

        p.layout=[[0,0,0,0,0],         //  Array of Rings
                  [0,0,0,0,0,0],
                  [0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0],
                  [0,0,0,0,0,0],
                  [0,0,0,0,0],
                 ];

        var rowArray=[];
        var n=0;

        function load(){

          p.controls=[];

          var w=HEX_SIZE;
          var xOffset=w*cos(PI/6);
          var yOffset=w/2;

          p.w=w*cos(PI/6)*9;
          p.w=1500;

          var x=0;
          var y=0;

          for(var row in p.layout){
            for(var col in p.layout[row]){

              if(row<5){ x=col*xOffset-row*xOffset/2-2*xOffset;     }
              else     { x=col*xOffset+(row-8)*xOffset/2-2*xOffset; }

              y=row*w*0.75-6*yOffset;

              rowArray.push(new hexCell('H'+n, p, x, y, w, w,
                {execute:   clickTest,
                 row:       row,
                 col:       col,
                 style:     GLYPHS.TEXT,
                 text:      n,
                 color:     getColor(color(61),100),
                 font:      monoFont,
                 cursor:    ARROW,
                 on:        false}));

               n++;

            }

            p.controls.push(rowArray);

            rowArray=[];

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
        
        this.loadPieces();
        app.gameOver=false;
        this.score=0;

      };
      hexBoard.prototype.loadPieces   =function(){

        var rand0=getShape();
        var rand1=getShape();
        var rand2=getShape();

        this.pieces.push(new piece(0, this, this.position0.x, this.position0.y, HEX_SIZE, HEX_SIZE,
          {style: rand0,
           color: getPieceColor(rand0)}));

        this.pieces.push(new piece(1, this, this.position1.x, this.position1.y, HEX_SIZE, HEX_SIZE,
          {style: rand1,
           color: getPieceColor(rand1)}));

        this.pieces.push(new piece(2, this, this.position2.x, this.position2.y, HEX_SIZE, HEX_SIZE,
          {style: rand2,
           color: getPieceColor(rand2)}));

      };
      hexBoard.prototype.draw         = function(){

        // var p =this;

        // this.active=this.hit && app.focus===this;

        pushMatrix();

          translate(this.x, this.y);
          rotate(this.angle);


        // fill(getColor(this.color, 50));

            var ctrls=this.controls;

            for(var r in ctrls){
              for(var c in ctrls[r]){

                ctrls[r][c].draw();

              }
            }

            // stroke(CLRS.BLUE);
            // fill(getColor(CLRS.RED,10));
            // ellipse(0,0,this.w,this.w);

        popMatrix();

        forEach(this.pieces, 'draw');
        forEach(this.scores, 'draw');

        this.purgeScores();

      };
      hexBoard.prototype.hitTest      = function(x,y){ return dist(mouseX,mouseY,this.x,this.y)<this.w/2; };
      hexBoard.prototype.moved        = function(x,y){
      /* Overridden because of the nested controls */

        if(this.parent.hit){

          if(this.hitTest(x,y)){ this.hit=true;
                                 app.focus=this; }
          else                 { this.hit=false;    }

          for(var s in this.pieces){
            this.pieces[s].moved(0,0);
          }
            
        }

      };
      hexBoard.prototype.clicked      = function(){

        forEach(this.pieces, 'clicked');

      };
      hexBoard.prototype.dragged      = function(){

        if(this.hitTest(mouseX,mouseY)){
          app.focus=this;
        }
        else{
          this.activeCell=null;
          this.activeID=null;
        }

        forEach(this.pieces, 'dragged');

        if(this.activePiece!==null){

          for(var r in this.controls){
            for(var c in this.controls[r]){

              this.controls[r][c].dragged(this.x,this.y);

            }
          }

          if(app.focus!=this){
            this.validateDrop();
          }

        }

      };
      hexBoard.prototype.released     = function(){

        forEach(this.pieces, 'released');

      };      
      hexBoard.prototype.out          = function(){

        this.hit=false;
        forEach(this.pieces, 'out');
        this.activeCell=null;

      };
      
      hexBoard.prototype.resetShape   = function(){

        var i=this.activePiece.id;
        
        //  Determine the new shape
        var rand=getShape();

        // if(i===0){ rand=SHAPES.SINGLE; }

        // Create 200 pixels below baseY to allow it to glide into position
        this.pieces[i].x=this.pieces[i].baseX;
        this.pieces[i].y=this.pieces[i].baseY+200;

        this.pieces[i].style=rand;
        this.pieces[i].color=getPieceColor(rand);
        this.pieces[i].deltaX=0;
        this.pieces[i].deltaY=-5;

      };
      hexBoard.prototype.resetPieces  = function(){

        for(var n in this.pieces){

          var rand=getShape();

          this.pieces[n].x=this.pieces[n].baseX;
          this.pieces[n].y=this.pieces[n].baseY;

          this.pieces[n].style=rand;
          this.pieces[n].color=getPieceColor(rand);

        }

      };      
      hexBoard.prototype.purgeScores  = function(){

        if(frameCount%1000===0){
        
          var total=0;

          for(var n=0; n<this.scores.length; n++){

            if(this.scores[n].timer!==0){
              total=1;
              break;
            }

          }

          if(total===0){
            this.scores=[];
          }

        }

      };      
      hexBoard.prototype.dropPiece   = function(){

        var cell = this.activeCell;

        function single(){

          cell.on=true;

        };

        function lineFlat(){

          cell.on           =true;
          cell.right.on     =true;
          cell.left.on      =true;
          cell.left.left.on =true;

        };
        function lineForward(){

          cell.on                  =true;
          cell.bottomLeft.on       =true;
          cell.topRight.on         =true;
          cell.topRight.topRight.on=true;

        };
        function lineBack(){

          cell.on                 =true;
          cell.bottomRight.on     =true;
          cell.topLeft.on         =true;
          cell.topLeft.topLeft.on =true;

        };

        function diamond(){

          cell.on            =true;
          cell.left.on       =true;
          cell.bottomLeft.on =true;
          cell.topLeft.on    =true;

        };

        function uUp(){

          cell.left.on        =true;
          cell.right.on       =true;
          cell.bottomRight.on =true;
          cell.bottomLeft.on  =true;

        };
        function uDown(){

          cell.left.on     =true;
          cell.right.on    =true;
          cell.topRight.on =true;
          cell.topLeft.on  =true;

        };

        function upRight(){

          cell.left.on        =true;
          cell.topLeft.on     =true;
          cell.bottomRight.on =true;
          cell.bottomLeft.on  =true;

        };
        function downRight(){

          cell.left.on       =true;
          cell.bottomLeft.on =true;
          cell.topRight.on   =true;
          cell.topLeft.on    =true;

        };
        function upLeft(){

          cell.right.on       =true;
          cell.topRight.on    =true;
          cell.bottomRight.on =true;
          cell.bottomLeft.on  =true;

        };
        function downLeft(){

          cell.right.on       =true;
          cell.bottomRight.on =true;
          cell.topRight.on    =true;
          cell.topLeft.on     =true;

        };

        function zRight(){

          cell.on          =true;
          cell.left.on     =true;
          cell.topRight.on =true;
          cell.topLeft.on  =true;

        };
        function zLeft(){

          cell.on          =true;
          cell.right.on    =true;
          cell.topRight.on =true;
          cell.topLeft.on  =true;

        };

        function sevenRight(){

          cell.on             =true;
          cell.bottomRight.on =true;
          cell.topRight.on    =true;
          cell.topLeft.on     =true;

        };
        function sevenLeft(){

          cell.on            =true;
          cell.bottomLeft.on =true;
          cell.topRight.on   =true;
          cell.topLeft.on    =true;

        };

        function angleRight(){

          cell.on             =true;
          cell.topRight.on    =true;
          cell.bottomRight.on =true;
          cell.bottomLeft.on  =true;

        };
        function angleLeft(){

          cell.on             =true;
          cell.topLeft.on     =true;
          cell.bottomRight.on =true;
          cell.bottomLeft.on  =true;

        };

        function nodeUpRight(){

          cell.on          =true;
          cell.left.on     =true;
          cell.right.on    =true;
          cell.topRight.on =true;

        };
        function nodeUpLeft(){

          cell.on         =true;
          cell.left.on    =true;
          cell.right.on   =true;
          cell.topLeft.on =true;

        };
        function nodeDownRight(){

          cell.on             =true;
          cell.left.on        =true;
          cell.right.on       =true;
          cell.bottomRight.on =true;

        };
        function nodeDownLeft(){

          cell.on            =true;
          cell.left.on       =true;
          cell.right.on      =true;
          cell.bottomLeft.on =true;

        };

        function vUpRight(){

          cell.on            =true;
          cell.left.on       =true;
          cell.topRight.on   =true;
          cell.bottomLeft.on =true;

        };
        function vUpLeft(){

          cell.on             =true;
          cell.right.on       =true;
          cell.topLeft.on     =true;
          cell.bottomRight.on =true;

        };
        function vDownRight(){

          cell.on             =true;
          cell.left.on        =true;
          cell.topLeft.on     =true;
          cell.bottomRight.on =true;

        };
        function vDownLeft(){

          cell.on            =true;
          cell.right.on      =true;
          cell.topRight.on   =true;
          cell.bottomLeft.on =true;

        };

        switch(this.activePiece.style){

          case SHAPES.SINGLE:         single();         break;

          case SHAPES.LINE:           lineFlat();       break;
          case SHAPES.LINEFORWARD:    lineForward();    break;
          case SHAPES.LINEBACK:       lineBack();       break;

          case SHAPES.DIAMOND:        diamond();        break;

          case SHAPES.UUP:            uUp();            break;

          case SHAPES.UDOWN:          uDown();          break;

          case SHAPES.UPRIGHT:        upRight();        break;
          case SHAPES.DOWNRIGHT:      downRight();      break;
          case SHAPES.UPLEFT:         upLeft();         break;
          case SHAPES.DOWNLEFT:       downLeft();       break;

          case SHAPES.ZRIGHT:         zRight();         break;
          case SHAPES.ZLEFT:          zLeft();          break;

          case SHAPES.SEVENRIGHT:     sevenRight();     break;
          case SHAPES.SEVENLEFT:      sevenLeft();      break;

          case SHAPES.ANGLERIGHT:     angleRight();     break;
          case SHAPES.ANGLELEFT:      angleLeft();      break;

          case SHAPES.NODEUPRIGHT:    nodeUpRight();    break;
          case SHAPES.NODEUPLEFT:     nodeUpLeft();     break;
          case SHAPES.NODEDOWNRIGHT:  nodeDownRight();  break;
          case SHAPES.NODEDOWNLEFT:   nodeDownLeft();   break;

          case SHAPES.VUPRIGHT:       vUpRight();       break;
          case SHAPES.VUPLEFT:        vUpLeft();        break;
          case SHAPES.VDOWNRIGHT:     vDownRight();     break;
          case SHAPES.VDOWNLEFT:      vDownLeft();      break;

          default:  break;

        }

      };
      hexBoard.prototype.validateDrop = function(){

        var retVal=false;
        var cell = this.activeCell;

        function single(){

          try{

            if(cell.on===false){

              cell.hover=true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // Cell doesn't exist
            }
            else{ println(e); }

          }

        };

        function lineFlat(){

          try{

            if(cell.on          ===false &&
               cell.right.on    ===false &&
               cell.left.on     ===false &&
               cell.left.left.on===false){
                 
              cell.hover          =true;
              cell.right.hover    =true;
              cell.left.hover     =true;
              cell.left.left.hover=true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // Cell doesn't exist
            }
            else{ println(e); }

          }

        };
        function lineForward(){

          try{

            if(cell.on                  ===false &&
               cell.bottomLeft.on       ===false &&
               cell.topRight.on         ===false &&
               cell.topRight.topRight.on===false){

              cell.hover                  =true;
              cell.bottomLeft.hover       =true;
              cell.topRight.hover         =true;
              cell.topRight.topRight.hover=true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // Cell doesn't exist
            }
            else{ println(e); }

          }

        };
        function lineBack(){

          try{

            if(cell.on                 ===false &&
               cell.bottomRight.on     ===false &&
               cell.topLeft.on         ===false &&
               cell.topLeft.topLeft.on ===false){

              cell.hover                 =true;
              cell.bottomRight.hover     =true;
              cell.topLeft.hover         =true;
              cell.topLeft.topLeft.hover =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // Cell doesn't exist
            }
            else{ println(e); }

          }

        };

        function diamond(){

          try{

            if(cell.on            ===false &&
               cell.left.on       ===false &&
               cell.bottomLeft.on ===false &&
               cell.topLeft.on    ===false){

              cell.hover            =true;
              cell.left.hover       =true;
              cell.bottomLeft.hover =true;
              cell.topLeft.hover    =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };

        function uUp(){

          try{

            if(cell.left.on        ===false &&
               cell.right.on       ===false &&
               cell.bottomRight.on ===false &&
               cell.bottomLeft.on  ===false){

              cell.left.hover        =true;
              cell.right.hover       =true;
              cell.bottomRight.hover =true;
              cell.bottomLeft.hover  =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };
        function uDown(){

          try{

            if(cell.left.on     ===false &&
               cell.right.on    ===false &&
               cell.topRight.on ===false &&
               cell.topLeft.on  ===false){

              cell.left.hover     =true;
              cell.right.hover    =true;
              cell.topRight.hover =true;
              cell.topLeft.hover  =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };

        function upRight(){

           try{

            if(cell.left.on        ===false &&
               cell.topLeft.on     ===false &&
               cell.bottomRight.on ===false &&
               cell.bottomLeft.on  ===false){

              cell.left.hover        =true;
              cell.topLeft.hover     =true;
              cell.bottomRight.hover =true;
              cell.bottomLeft.hover  =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };
        function downRight(){

          try{

            if(cell.left.on       ===false &&
               cell.bottomLeft.on ===false &&
               cell.topRight.on   ===false &&
               cell.topLeft.on    ===false){

              cell.left.hover       =true;
              cell.bottomLeft.hover =true;
              cell.topRight.hover   =true;
              cell.topLeft.hover    =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };
        function upLeft(){

          try{

            if(cell.right.on       ===false &&
               cell.topRight.on    ===false &&
               cell.bottomRight.on ===false &&
               cell.bottomLeft.on  ===false){

              cell.right.hover       =true;
              cell.topRight.hover    =true;
              cell.bottomRight.hover =true;
              cell.bottomLeft.hover  =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };
        function downLeft(){

          try{

            if(cell.right.on       ===false &&
               cell.bottomRight.on ===false &&
               cell.topRight.on    ===false &&
               cell.topLeft.on     ===false){

              cell.right.hover       =true;
              cell.bottomRight.hover =true;
              cell.topRight.hover    =true;
              cell.topLeft.hover     =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };

        function zRight(){

          try{

            if(cell.on          ===false &&
               cell.left.on     ===false &&
               cell.topRight.on ===false &&
               cell.topLeft.on  ===false){

              cell.hover          =true;
              cell.left.hover     =true;
              cell.topRight.hover =true;
              cell.topLeft.hover  =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };
        function zLeft(){

          try{

            if(cell.on          ===false &&
               cell.right.on    ===false &&
               cell.topRight.on ===false &&
               cell.topLeft.on  ===false){

              cell.hover          =true;
              cell.right.hover    =true;
              cell.topRight.hover =true;
              cell.topLeft.hover  =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };

        function sevenRight(){

          try{

            if(cell.on             ===false &&
               cell.bottomRight.on ===false &&
               cell.topRight.on    ===false &&
               cell.topLeft.on     ===false){

              cell.hover             =true;
              cell.bottomRight.hover =true;
              cell.topRight.hover    =true;
              cell.topLeft.hover     =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };
        function sevenLeft(){

          try{

            if(cell.on            ===false &&
               cell.bottomLeft.on ===false &&
               cell.topRight.on   ===false &&
               cell.topLeft.on    ===false){

              cell.hover            =true;
              cell.bottomLeft.hover =true;
              cell.topRight.hover   =true;
              cell.topLeft.hover    =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };

        function angleRight(){

          try{

            if(cell.on             ===false &&
               cell.topRight.on    ===false &&
               cell.bottomRight.on ===false &&
               cell.bottomLeft.on  ===false){

              cell.hover             =true;
              cell.topRight.hover    =true;
              cell.bottomRight.hover =true;
              cell.bottomLeft.hover  =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };
        function angleLeft(){

          try{

            if(cell.on             ===false &&
               cell.topLeft.on     ===false &&
               cell.bottomRight.on ===false &&
               cell.bottomLeft.on  ===false){

              cell.hover             =true;
              cell.topLeft.hover     =true;
              cell.bottomRight.hover =true;
              cell.bottomLeft.hover  =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };

        function nodeUpRight(){

          try{

            if(cell.on          ===false &&
               cell.left.on     ===false &&
               cell.right.on    ===false &&
               cell.topRight.on ===false){

              cell.hover          =true;
              cell.left.hover     =true;
              cell.right.hover    =true;
              cell.topRight.hover =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };
        function nodeUpLeft(){

          try{

            if(cell.on         ===false &&
               cell.left.on    ===false &&
               cell.right.on   ===false &&
               cell.topLeft.on ===false){

              cell.hover         =true;
              cell.left.hover    =true;
              cell.right.hover   =true;
              cell.topLeft.hover =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };
        function nodeDownRight(){

          try{

            if(cell.on          ===false &&
               cell.left.on     ===false &&
               cell.right.on    ===false &&
               cell.bottomRight.on ===false){

              cell.hover             =true;
              cell.left.hover        =true;
              cell.right.hover       =true;
              cell.bottomRight.hover =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };
        function nodeDownLeft(){

          try{

            if(cell.on            ===false &&
               cell.left.on       ===false &&
               cell.right.on      ===false &&
               cell.bottomLeft.on ===false){

              cell.hover            =true;
              cell.left.hover       =true;
              cell.right.hover      =true;
              cell.bottomLeft.hover =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };

        function vUpRight(){

          try{

            if(cell.on            ===false &&
               cell.left.on       ===false &&
               cell.topRight.on   ===false &&
               cell.bottomLeft.on ===false){

              cell.hover            =true;
              cell.left.hover       =true;
              cell.topRight.hover   =true;
              cell.bottomLeft.hover =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };
        function vUpLeft(){

          try{

            if(cell.on             ===false &&
               cell.right.on       ===false &&
               cell.topLeft.on     ===false &&
               cell.bottomRight.on ===false){

              cell.hover             =true;
              cell.right.hover       =true;
              cell.topLeft.hover     =true;
              cell.bottomRight.hover =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };
        function vDownRight(){

          try{

            if(cell.on             ===false &&
               cell.left.on        ===false &&
               cell.topLeft.on     ===false &&
               cell.bottomRight.on ===false){

              cell.hover             =true;
              cell.left.hover        =true;
              cell.topLeft.hover     =true;
              cell.bottomRight.hover =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };
        function vDownLeft(){

          try{

            if(cell.on             ===false &&
               cell.right.on       ===false &&
               cell.topRight.on    ===false &&
               cell.bottomLeft.on  ===false){

              cell.hover             =true;
              cell.right.hover       =true;
              cell.topRight.hover    =true;
              cell.bottomLeft.hover  =true;

              retVal=true;

            }

          }
          catch(e){

            if(e instanceof TypeError){
              // println("Cell doesn't exist");
            }
            else{ println(e); }

          }

        };

        switch(this.activePiece.style){

          case SHAPES.SINGLE:         single();         break;

          case SHAPES.LINE:           lineFlat();       break;
          case SHAPES.LINEFORWARD:    lineForward();    break;
          case SHAPES.LINEBACK:       lineBack();       break;

          case SHAPES.DIAMOND:        diamond();        break;

          case SHAPES.UUP:            uUp();            break;

          case SHAPES.UDOWN:          uDown();          break;

          case SHAPES.UPRIGHT:        upRight();        break;
          case SHAPES.DOWNRIGHT:      downRight();      break;
          case SHAPES.UPLEFT:         upLeft();         break;
          case SHAPES.DOWNLEFT:       downLeft();       break;

          case SHAPES.ZRIGHT:         zRight();         break;
          case SHAPES.ZLEFT:          zLeft();          break;

          case SHAPES.SEVENRIGHT:     sevenRight();     break;
          case SHAPES.SEVENLEFT:      sevenLeft();      break;

          case SHAPES.ANGLERIGHT:     angleRight();     break;
          case SHAPES.ANGLELEFT:      angleLeft();      break;

          case SHAPES.NODEUPRIGHT:    nodeUpRight();    break;
          case SHAPES.NODEUPLEFT:     nodeUpLeft();     break;
          case SHAPES.NODEDOWNRIGHT:  nodeDownRight();  break;
          case SHAPES.NODEDOWNLEFT:   nodeDownLeft();   break;

          case SHAPES.VUPRIGHT:       vUpRight();       break;
          case SHAPES.VUPLEFT:        vUpLeft();        break;
          case SHAPES.VDOWNRIGHT:     vDownRight();     break;
          case SHAPES.VDOWNLEFT:      vDownLeft();      break;

          default:  break;

        }

        return retVal;

      };

      hexBoard.prototype.tally        = function(){

        this.score+=40;

        var cell=null;
        var cells=[];
        var multiplier=1;

        var p=this;

        // Rows --------------------------------------------------------------------------------
        {
          
          function rowTally(cell){

            while(cell!=null){

              if(cell.on===false){
                return false;
              }

              cell=cell.right;

            }

            return true;

          };

          //  Iterate each row
          for(var row in this.controls){
            
            cell=this.controls[row][0];

            if(rowTally(cell)){

              var len=0;

              while(cell!=null){
                
                len++;
                cells.push(cell);

                cell=cell.right;

              }

              var col=floor(this.controls[row].length/2);

              this.score+=20*len*multiplier;

              this.scores.push(new score(this.scores.length, this, this.controls[row][col].x+p.x,
                                                                   this.controls[row][col].y+p.y, 0,0,
                { style:  SCORESTYLES.TEXT,
                  text:   20*len*multiplier,
                  font:   serifFont,
                  delay:  multiplier*30-30,
                  timer:  60}));

              multiplier++;

            }
            
          }
          
          // Down Right--------------------------------------------------------------------------------
          function downRightTally(cell){

            while(cell!=null){

              if(cell.on===false){
                return false;
              }

              cell=cell.bottomRight;

            }

            return true;

          };
          
          function downRight(cell){

            if(downRightTally(cell)){

              var len=0;

              while(cell!=null){
                
                len++;
                cells.push(cell);

                cell=cell.bottomRight;

              }

              var col=floor(p.controls[0].length/2);
              var row=floor(len/2);
              
              p.score+=20*len*multiplier;

              p.scores.push(new score(p.scores.length, p, p.controls[row][col].x+p.x,
                                                          p.controls[row][col].y+p.y, 0,0,
                { style:  SCORESTYLES.TEXT,
                  text:   20*len*multiplier,
                  font:   serifFont,
                  delay:  multiplier*30-30,
                  timer:  60}));

              multiplier++;

            }

          };

          downRight(p.controls[0][0]);
          downRight(p.controls[0][1]);
          downRight(p.controls[0][2]);
          downRight(p.controls[0][3]);
          downRight(p.controls[0][4]);
          downRight(p.controls[1][0]);
          downRight(p.controls[2][0]);
          downRight(p.controls[3][0]);
          downRight(p.controls[4][0]);
          
          // Down Left--------------------------------------------------------------------------------
          function downLeftTally(cell){

            while(cell!=null){

              if(cell.on===false){
                return false;
              }

              cell=cell.bottomLeft;

            }

            return true;

          };

          
          function downLeft(cell){

            if(downLeftTally(cell)){

              var len=0;

              while(cell!=null){
                
                len++;
                cells.push(cell);

                cell=cell.bottomLeft;

              }

              var col=floor(p.controls[0].length/2);

              p.score+=20*len*multiplier;

              p.scores.push(new score(p.scores.length, p, p.controls[0][col].x+p.x,
                                                          p.controls[0][col].y+p.y, 0,0,
                { style:  SCORESTYLES.TEXT,
                  text:   20*len*multiplier,
                  font:   serifFont,
                  delay:  multiplier*30-30,
                  timer:  60}));

              multiplier++;

            }

          };

          downLeft(p.controls[0][0]);
          downLeft(p.controls[0][1]);
          downLeft(p.controls[0][2]);
          downLeft(p.controls[0][3]);
          downLeft(p.controls[0][4]);
          downLeft(p.controls[1][5]);
          downLeft(p.controls[2][6]);
          downLeft(p.controls[3][7]);
          downLeft(p.controls[4][8]);

        }

        // Clear Cells
        for(var n in cells){
          cells[n].on=false;
          cells[n].color=this.color;
          cells[n].timer=60;
        }

        cells=[]; // Reset Cell Array

      };
      hexBoard.prototype.gameOver     = function(){

        var retVal = true;

        function testShape(s,cell){

          function single(){

            try{

              retVal=!cell.on;

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };
          function lineFlat(){

            try{

              retVal=!(cell.on           ===false &&
                       cell.right.on     ===false &&
                       cell.left.on      ===false &&
                       cell.left.left.on ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };
          function lineForward(){

            try{

              retVal=!(cell.on                   ===false &&
                       cell.bottomLeft.on        ===false &&
                       cell.topRight.on          ===false &&
                       cell.topRight.topRight.on ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };
          function lineBack(){

            try{

              retVal=!(cell.on                 ===false &&
                       cell.bottomRight.on     ===false &&
                       cell.topLeft.on         ===false &&
                       cell.topLeft.topLeft.on ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };

          function diamond(){

            try{

              retVal=!(cell.on            ===false &&
                       cell.left.on       ===false &&
                       cell.bottomLeft.on ===false &&
                       cell.topLeft.on    ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };

          function uUp(){

            try{

              retVal=!(cell.left.on         ===false &&
                       cell.right.on        ===false &&
                       cell.bottomLeft.on   ===false &&
                       cell.bottomRight.on  ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
              }
              else{ println(e); }

            }

          };
          function uDown(){

            try{

              retVal=!(cell.left.on     ===false &&
                       cell.right.on    ===false &&
                       cell.topLeft.on  ===false &&
                       cell.topRight.on ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
              }
              else{ println(e); }

            }

          };

          function upRight(){

            try{

              retVal=!(cell.left.on         ===false &&
                       cell.topLeft.on      ===false &&
                       cell.bottomLeft.on   ===false &&
                       cell.bottomRight.on  ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
              }
              else{ println(e); }

            }

          };
          function downRight(){

            try{

              retVal=!(cell.left.on       ===false &&
                       cell.bottomLeft.on ===false &&
                       cell.topLeft.on    ===false &&
                       cell.topRight.on   ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
              }
              else{ println(e); }

            }

          };
          function upLeft(){

            try{

              retVal=!(cell.right.on       ===false &&
                       cell.topRight.on    ===false &&
                       cell.bottomRight.on ===false &&
                       cell.bottomLeft.on  ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                
              }
              else{ println(e); }

            }

          };
          function downLeft(){

            try{

              retVal=!(cell.right.on       ===false &&
                       cell.bottomRight.on ===false &&
                       cell.topRight.on    ===false &&
                       cell.topLeft.on     ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                
              }
              else{ println(e); }

            }

          };

          function zRight(){

            try{

              retVal=!(cell.on          ===false &&
                       cell.left.on     ===false &&
                       cell.topRight.on ===false &&
                       cell.topLeft.on  ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };
          function zLeft(){

            try{

              retVal=!(cell.on          ===false &&
                       cell.right.on    ===false &&
                       cell.topRight.on ===false &&
                       cell.topLeft.on  ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };

          function sevenRight(){

            try{

              retVal=!(cell.on             ===false &&
                       cell.bottomRight.on ===false &&
                       cell.topRight.on    ===false &&
                       cell.topLeft.on     ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };
          function sevenLeft(){

            try{

              retVal=!(cell.on            ===false &&
                       cell.bottomLeft.on ===false &&
                       cell.topRight.on   ===false &&
                       cell.topLeft.on    ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };

          function angleRight(){

            try{

              retVal=!(cell.on             ===false &&
                       cell.topRight.on    ===false &&
                       cell.bottomRight.on ===false &&
                       cell.bottomLeft.on  ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };
          function angleLeft(){

            try{

              retVal=!(cell.on             ===false &&
                       cell.topLeft.on     ===false &&
                       cell.bottomRight.on ===false &&
                       cell.bottomLeft.on  ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };

          function nodeUpRight(){

            try{

              retVal=!(cell.on          ===false &&
                       cell.left.on     ===false &&
                       cell.right.on    ===false &&
                       cell.topRight.on ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };
          function nodeUpLeft(){

            try{

              retVal=!(cell.on         ===false &&
                       cell.left.on    ===false &&
                       cell.right.on   ===false &&
                       cell.topLeft.on ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };
          function nodeDownRight(){

            try{

              retVal=!(cell.on             ===false &&
                       cell.left.on        ===false &&
                       cell.right.on       ===false &&
                       cell.bottomRight.on ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };
          function nodeDownLeft(){

            try{

              retVal=!(cell.on            ===false &&
                       cell.left.on       ===false &&
                       cell.right.on      ===false &&
                       cell.bottomLeft.on ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };

          function vUpRight(){

            try{

              retVal=!(cell.on            ===false &&
                       cell.left.on       ===false &&
                       cell.topRight.on   ===false &&
                       cell.bottomLeft.on ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };
          function vUpLeft(){

            try{

              retVal=!(cell.on             ===false &&
                       cell.right.on       ===false &&
                       cell.topLeft.on     ===false &&
                       cell.bottomRight.on ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };
          function vDownRight(){

            try{

              retVal=!(cell.on             ===false &&
                       cell.left.on        ===false &&
                       cell.topLeft.on     ===false &&
                       cell.bottomRight.on ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };
          function vDownLeft(){

            try{

              retVal=!(cell.on            ===false &&
                       cell.right.on      ===false &&
                       cell.topRight.on   ===false &&
                       cell.bottomleft.on ===false);

            }
            catch(e){

              if(e instanceof TypeError){ // Cell doesn't exist
                retVal=true;
              }
              else{ println(e); }

            }

          };

          switch(s.style){

            case SHAPES.SINGLE:         single();        break;

            case SHAPES.LINE:           lineFlat();      break;
            case SHAPES.LINEFORWARD:    lineForward();   break;
            case SHAPES.LINEBACK:       lineBack();      break;

            case SHAPES.DIAMOND:        diamond();       break;

            case SHAPES.UUP:            uUp();           break;

            case SHAPES.UDOWN:          uDown();         break;

            case SHAPES.UPRIGHT:        upRight();       break;
            case SHAPES.DOWNRIGHT:      downRight();     break;
            case SHAPES.UPLEFT:         upLeft();        break;
            case SHAPES.DOWNLEFT:       downLeft();      break;

            case SHAPES.ZRIGHT:         zRight();        break;
            case SHAPES.ZLEFT:          zLeft();         break;

            case SHAPES.SEVENRIGHT:     sevenRight();    break;
            case SHAPES.SEVENLEFT:      sevenLeft();     break;

            case SHAPES.ANGLERIGHT:     angleRight();    break;
            case SHAPES.ANGLELEFT:      angleLeft();     break;

            case SHAPES.NODEUPRIGHT:    nodeUpRight();   break;
            case SHAPES.NODEUPLEFT:     nodeUpLeft();    break;
            case SHAPES.NODEDOWNRIGHT:  nodeDownRight(); break;
            case SHAPES.NODEDOWNLEFT:   nodeDownLeft();  break;

            case SHAPES.VUPRIGHT:       vUpRight();      break;
            case SHAPES.VUPLEFT:        vUpLeft();       break;
            case SHAPES.VDOWNRIGHT:     vDownRight();    break;
            case SHAPES.VDOWNLEFT:      vDownLeft();     break;

            default:  break;

          }

        };

        // try{

          var n=0;

          for(var s in this.pieces){

            for(var r in this.controls){
              for(var c in this.controls[r]){

                testShape(this.pieces[s], this.controls[r][c]);

                if(retVal===false){ break; }

              }

              if(retVal===false){ break; }

            }

            if(retVal===false){ break; }

          }

          return retVal;

        // }
        // catch(e){

          // if(e instanceof TypeError){ // Cell doesn't exist
            // retVal=false;
            // println(e);
          // }
          // else{ println(e); }

        // }

      };
      hexBoard.prototype.drop         = function(){

        if(this.activePiece!==null &&
           app.focus!==this){

          var ctrls=this.controls;

          var cell;
          
          for(var r in ctrls){
            for(var c in ctrls[r]){
              
              cell=ctrls[r][c];
              
              if(cell.hover){
                cell.color=this.activePiece.color;
              }

            }
          }

          if(this.validateDrop()){

            this.scores.push(new score(this.scores.length, this, this.activePiece.x, this.activePiece.y, 10,10,
              { style:  SCORESTYLES.TEXT,
                font:   monoFont,
                text:   '40',
                delay:  10,
                timer:  30}));

            this.dropPiece();
            this.tally();
            this.resetShape();

            app.gameOver=this.gameOver();

          }

        }

        this.activeCell  = null;
        this.activePiece = null;

      };


    }

    /* Controls ============================================================ */

    /* Button               */
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

    /* Icon Button          */
    {

      function i_Button(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.style    = props.style;
        this.cursor   = props.cursor;

        this.execute  = props.execute;
        this.retrieve = props.retrieve;

        this.color    = props.color;

        if(this.style===GLYPHS.TEXT){
          this.text     = props.text;
          this.font     = props.font;
        }

      };
      i_Button.prototype=Object.create(control.prototype);
      i_Button.prototype.draw=function(){

        var p=this;
        this.offset=0;

        function triforce(){

          fill(getColor(CLRS.K_TEAL_1,75));

          if(p.parent.hit    ){ fill(getColor(CLRS.WHITE, 75)); }
          if(p.active || p.on){ fill(getColor(CLRS.WHITE,100)); }

            offset=p.offset;

            pushMatrix();

              scale(0.75,0.75);
              translate(p.w*0.15,p.h*0.15);

                triangle( p.w/2 + offset, offset,
                          p.w + offset,   p.h+offset,
                          offset,         p.h+offset);

                  noStroke();

              fill(getColor(p.parent.color,50));

              if(p.parent.hit    ){ fill(getColor(CLRS.K_TEAL_0, 75)); }
              if(p.active || p.on){ fill(getColor(CLRS.K_TEAL_0,100)); }

                  triangle( p.w/2 + offset,    p.h+offset,
                            p.w*0.25 + offset, p.h/2+offset,
                            p.w*0.75+offset,   p.h/2+offset);
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

          fill(getColor(CLRS.K_TEAL_2,50));

          if(p.parent.hit){ fill(getColor(CLRS.WHITE, 75)); }
          if(p.active    ){ fill(getColor(CLRS.WHITE,100)); }

          noStroke();

            ellipse(p.w/2+p.offset, p.h/2-6+p.offset, 3, 3);
            ellipse(p.w/2+p.offset, p.h/2,               3, 3);
            ellipse(p.w/2+p.offset, p.h/2+6+p.offset, 3, 3);

        };
        function reset(){

          pushMatrix();

            translate(p.w/2,p.h/2);

              var sz=0.67;

              ellipseMode(CENTER);

              stroke(getColor(CLRS.K_TEAL_1, 50));

              if(p.parent.hit){ stroke(getColor(CLRS.WHITE,  75)); }
              if(p.active)    { stroke(getColor(CLRS.WHITE, 100));
                                   cursor(p.cursor);               }

              strokeWeight(1.5);
              noFill();

              if(p.active &&
                 app.left){ rotate(radians(45)); }

                arc(0, 0, p.w*sz, p.h*sz, radians(60), 2*PI-radians(22.5));

              fill(getColor(CLRS.K_TEAL_0, 100));

              if(p.parent.hit){ fill(getColor(CLRS.WHITE,  75)); }
              if(p.active  ){ fill(getColor(CLRS.WHITE, 100)); }

                pushMatrix();

                  translate(2,0);

                    triangle(0,  0,
                             5,  0,
                             5, -5);

                popMatrix();

          popMatrix();

        };
        function txt(){

          fill(getColor(CLRS.K_TEAL_2,50));

          if(p.parent.hit    ){ fill(getColor(p.color, 75)); }
          if(p.active || p.on){ fill(getColor(p.color,100)); }

          textAlign(CENTER,CENTER);
          textFont(p.font);

          switch(p.text){

            case NAVIGATION.FIRST:          text('|'+CONSTANTS.TRIANGLE_L,                  p.w/2+p.offset, p.h/2+p.offset); break;
            case NAVIGATION.DECREMENT:      text(CONSTANTS.TRIANGLE_L,                      p.w/2+p.offset, p.h/2+p.offset); break;
            case NAVIGATION.INCREMENT:      text(CONSTANTS.TRIANGLE_R,                      p.w/2+p.offset, p.h/2+p.offset); break;
            case NAVIGATION.LAST:           text(CONSTANTS.TRIANGLE_R+'|',                  p.w/2+p.offset, p.h/2+p.offset); break;
            case NAVIGATION.INCREMENTPAGE:  text(CONSTANTS.TRIANGLE_R+CONSTANTS.TRIANGLE_R, p.w/2+p.offset, p.h/2+p.offset); break;
            case NAVIGATION.DECREMENTPAGE:  text(CONSTANTS.TRIANGLE_L+CONSTANTS.TRIANGLE_L, p.w/2+p.offset, p.h/2+p.offset); break;

            default:                        text(p.text, p.w/2+p.offset, p.h/2+p.offset);                                    break;

          }

        };
        function choose(){

          fill(getColor(CLRS.K_TEAL_2,50));

          if(p.parent.hit    ){ fill(getColor(p.color, 75)); }
          if(p.active || p.on){ fill(getColor(p.color,100)); }

          textFont(p.font);
          textSize(10);
          textLeading(10);

          textAlign(CENTER,CENTER);

            text('n\nk', p.w/2+p.offset, p.h/2+p.offset);

          textSize(16);

          textAlign(RIGHT,CENTER);

            text('(', p.w/2+p.offset-3, p.h/2+p.offset);

          textAlign(LEFT,CENTER);

        text(')', p.w/2+p.offset+3, p.h/2+p.offset);

        };
        this.active=this.hit && app.focus===this;
        this.offset=0;
        this.on=this.retrieve();

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            noFill();

            if(this.active){ cursor(this.cursor);
                             if(app.left){ this.offset=1; } }
            if(this.active ||
               this.on    ){ fill(getColor(CLRS.BLACK,10)); }

            //  Background
              rect(this.offset, this.offset, this.w, this.h, 2);


          // Icon
          textFont(this.font);

          switch(this.style){

            case GLYPHS.PLAY:      play();      break;
            case GLYPHS.SETTINGS:  settings();  break;
            case GLYPHS.RESET:     reset();     break;
            case GLYPHS.TRIFORCE:  triforce();  break;
            case GLYPHS.TEXT:      txt();       break;
            case GLYPHS.CHOOSE:    choose();    break;

            default:                            break;

          };

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
      /* Overridden because of shap */
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

    /* Score               */
    {

      function score(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.execute  = props.execute;
        this.retrieve = props.retrieve;

        this.style    = props.style;

        this.text     = props.text;
        this.font     = props.font;

        this.color    = props.color;
        this.cursor   = props.cursor;

        this.timer    = props.timer;
        this.delay    = props.delay || 0;

        this.scale    = 1;

        textFont(this.font);
        textSize(60);
                
        // this.on=false;

      };
      score.prototype=Object.create(control.prototype);
      score.prototype.draw=function(){

        if(this.timer<=0){ return }
        if(this.delay>0){ this.delay--; return }
          
          this.offset=0;
          this.active=this.hit && app.focus===this;

          pushMatrix();

            translate(this.x, this.y);
            scale(this.scale,-this.scale);

              // Border
              strokeWeight(0.75);
              fill(getColor(CLRS.ACTIVE, 5));
              noStroke();

              if(this.style===SCORESTYLES.TEXT){

                scale(1,-1);
                
                // textFont(this.font);
                // textSize(30);
                fill(this.color);
                fill(getColor(CLRS.WHITE,100*this.timer/30));
                textAlign(CENTER,CENTER);

                  text(this.text, this.timer, this.timer);

                if(this.timer<=0){

                  // this.parent.scores[0]=null;
                  // println(this.parent.scores[0].timer);

                }
                else{

                  this.timer--;

                }

              }
              else if(this.style===SCORESTYLE.CLICK){

                rect(this.offset, -this.h-this.offset, this.w, this.h, 3);

              }

          popMatrix();

          this.scale*=0.99;

      };
      score.prototype.moved=function(x,y){

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
      score.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.active){

          this.execute();

        }

      };

    }

    /* Piece               */
    {

      function piece(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.baseX  = x;
        this.baseY  = y;

        this.deltaX = -1;
        this.deltaY = -1;

        this.style  = props.style;
        this.color  = props.color;

      };
      piece.prototype=Object.create(control.prototype);
      piece.prototype.draw=function(){

        var p=this;

        function drawShape(){

          function drawHexagon(x,y,r){ // r=radius

            beginShape();

              for(var pt=0; pt<6; pt++){
                vertex(x+cos(PI/6+pt*PI/3)*(r-3),
                       y+sin(PI/6+pt*PI/3)*(r-3));
              }

            endShape(CLOSE);

          };

          var f=0.8;
          var w=p.w/2*cos(PI/6);


          if(app.dragging && p.hit){ f=1;     }
          else                     { w*=0.85; }

          var w2=w*2;

          noStroke();
          strokeWeight(2);
          stroke(getColor(CLRS.BLACK,25));

          function single(clr){

              fill(clr);

              drawHexagon(0, 0, w);

          };

          function row(clr){

            fill(clr);

            var offset=-w*f;

              drawHexagon(offset+f*3*w, 0, w);
              drawHexagon(offset+f*1*w, 0, w);
              drawHexagon(offset-f*1*w, 0, w);
              drawHexagon(offset-f*3*w, 0, w);

          };
          function forward(clr){

            fill(clr);

            rotate(-PI/3);

            var offset=w*f;

              drawHexagon(offset+f*3*w, 0, w);
              drawHexagon(offset+f*1*w, 0, w);
              drawHexagon(offset-f*1*w, 0, w);
              drawHexagon(offset-f*3*w, 0, w);

          };
          function back(clr){

            rotate(PI/3);

              row(clr);

          };

          function diamond(clr){

            fill(clr);

            var offset=-w*f;

            if(app.dragging && p.hit){
              drawHexagon(offset+0,      w+0.75*w, w);
              drawHexagon(offset+f*1*w,  0,        w);
              drawHexagon(offset-f*1*w,  0,        w);
              drawHexagon(offset+0,     -w-0.75*w, w);
            }
            else{
              drawHexagon(offset+0,      w*1.33, w);
              drawHexagon(offset+f*1*w,  0,      w);
              drawHexagon(offset-f*1*w,  0,      w);
              drawHexagon(offset+0,     -w*1.33, w);
            }

          };
          function zRight(clr){

            rotate(PI/3);

              diamond(clr);

          };
          function zLeft(clr){

            rotate(-PI/3);

            fill(clr);

            var offset=w*f;

            if(app.dragging && p.hit){
              drawHexagon(offset+0,      w+0.75*w, w);
              drawHexagon(offset+f*1*w,  0,        w);
              drawHexagon(offset-f*1*w,  0,        w);
              drawHexagon(offset+0,     -w-0.75*w, w);
            }
            else{
              drawHexagon(offset+0,      w*1.33, w);
              drawHexagon(offset+f*1*w,  0,      w);
              drawHexagon(offset-f*1*w,  0,      w);
              drawHexagon(offset+0,     -w*1.33, w);
            }

          };

          function uUp(clr){

            fill(clr);

              drawHexagon( f*cos(     0)*w2, f*sin(     0)*w2, w);
              drawHexagon( f*cos(  PI/3)*w2, f*sin(  PI/3)*w2, w);
              drawHexagon( f*cos(2*PI/3)*w2, f*sin(2*PI/3)*w2, w);
              drawHexagon(-f*cos(     0)*w2, f*sin(     0)*w2, w);

          };
          function uDown(clr){

            rotate(PI);

              uUp(clr);

          };
          
          function upRight(clr){

            rotate(PI/3);

              uUp(clr);

          };
          function upLeft(clr){

            rotate(-PI/3);

              uUp(clr);

          };
          function downRight(clr){

            rotate(PI-PI/3);

              uUp(clr);

          };
          function downLeft(clr){

            rotate(-2*PI/3);

              uUp(clr);

          };

          function sevenRight(clr){

            fill(clr);

              drawHexagon(                0,                 0, w);
              drawHexagon(f*cos(-2*PI/3)*w2, f*sin(-2*PI/3)*w2, w);
              drawHexagon(f*cos(   PI/3)*w2, f*sin(   PI/3)*w2, w);
              drawHexagon(f*cos(  -PI/3)*w2, f*sin(  -PI/3)*w2, w);

          };
          function sevenLeft(clr){

            fill(clr);

            scale(-1,1);

              sevenRight(clr);

          };
          function angleRight(clr){

            fill(clr);

            scale(1,-1);

              sevenRight(clr);

          };
          function angleLeft(clr){

            fill(clr);

            scale(-1,-1);

              sevenRight(clr);

          };

          function nodeDownLeft(clr){

            fill(clr);

              drawHexagon(               0,                0, w);
              drawHexagon(f*cos(     0)*w2, f*sin(     0)*w2, w);
              drawHexagon(f*cos(    PI)*w2, f*sin(    PI)*w2, w);
              drawHexagon(f*cos(2*PI/3)*w2, f*sin(2*PI/3)*w2, w);

          };
          function nodeDownRight(clr){

            scale(-1,1);

              nodeDownLeft(clr);

          };
          function nodeUpLeft(clr){

            scale(1,-1);

              nodeDownLeft(clr);

          };
          function nodeUpRight(clr){

            scale(-1,-1);

              nodeDownLeft(clr);

          };

          function vDownLeft(clr){

            fill(clr);

              drawHexagon(               0,                0, w);
              drawHexagon(f*cos(     0)*w2, f*sin(     0)*w2, w);
              drawHexagon(f*cos( -PI/3)*w2, f*sin( -PI/3)*w2, w);
              drawHexagon(f*cos(2*PI/3)*w2, f*sin(2*PI/3)*w2, w);

          };
          function vDownRight(clr){

            scale(-1,1);

              vDownLeft(clr);

          };
          function vUpLeft(clr){

            scale(1,-1);

              vDownLeft(clr);

          };
          function vUpRight(clr){

            scale(-1,-1);

              vDownLeft(clr);

          };

          pushMatrix();

            translate(p.x,p.y);

              switch(p.style){

                case SHAPES.SINGLE:         single(getPieceColor(SHAPES.SINGLE));               break;

                case SHAPES.LINE:           row(getPieceColor(SHAPES.LINE));                    break;
                case SHAPES.LINEFORWARD:    forward(getPieceColor(SHAPES.LINEFORWARD));         break;
                case SHAPES.LINEBACK:       back(getPieceColor(SHAPES.LINEBACK));               break;

                case SHAPES.DIAMOND:        diamond(getPieceColor(SHAPES.DIAMOND));             break;
                case SHAPES.ZRIGHT:         zRight(getPieceColor(SHAPES.ZRIGHT));               break;
                case SHAPES.ZLEFT:          zLeft(getPieceColor(SHAPES.ZLEFT));                 break;

                case SHAPES.UUP:            uUp(getPieceColor(SHAPES.UUP));                     break;
                case SHAPES.UDOWN:          uDown(getPieceColor(SHAPES.UDOWN));                 break;

                case SHAPES.UPRIGHT:        upRight(getPieceColor(SHAPES.UPRIGHT));             break;
                case SHAPES.UPLEFT:         upLeft(getPieceColor(SHAPES.UPLEFT));               break;
                case SHAPES.DOWNRIGHT:      downRight(getPieceColor(SHAPES.DOWNRIGHT));         break;
                case SHAPES.DOWNLEFT:       downLeft(getPieceColor(SHAPES.DOWNLEFT));           break;

                case SHAPES.SEVENRIGHT:     sevenRight(getPieceColor(SHAPES.SEVENRIGHT));       break;
                case SHAPES.SEVENLEFT:      sevenLeft(getPieceColor(SHAPES.SEVENLEFT));         break;
                case SHAPES.ANGLERIGHT:     angleRight(getPieceColor(SHAPES.ANGLERIGHT));       break;
                case SHAPES.ANGLELEFT:      angleLeft(getPieceColor(SHAPES.ANGLELEFT));         break;

                case SHAPES.NODEDOWNLEFT:   nodeDownLeft(getPieceColor(SHAPES.NODEDOWNLEFT));   break;
                case SHAPES.NODEDOWNRIGHT:  nodeDownRight(getPieceColor(SHAPES.NODEDOWNRIGHT)); break;
                case SHAPES.NODEUPLEFT:     nodeUpLeft(getPieceColor(SHAPES.NODEUPLEFT));       break;
                case SHAPES.NODEUPRIGHT:    nodeUpRight(getPieceColor(SHAPES.NODEUPRIGHT));     break;

                case SHAPES.VDOWNLEFT:      vDownLeft(getPieceColor(SHAPES.VDOWNLEFT));         break;
                case SHAPES.VDOWNRIGHT:     vDownRight(getPieceColor(SHAPES.VDOWNRIGHT));       break;
                case SHAPES.VUPLEFT:        vUpLeft(getPieceColor(SHAPES.VUPLEFT));             break;
                case SHAPES.VUPRIGHT:       vUpRight(getPieceColor(SHAPES.VUPRIGHT));           break;

                default:                                              break;

              }

          popMatrix();

        };

        drawShape();

        if(this.parent.activePiece!==this){

          if(this.deltaX===0 &&
             this.deltaY===0){
            this.x=this.baseX;
            this.y=this.baseY;
          }
          else{

            this.x+=this.deltaX;
            this.y+=this.deltaY;

            if(abs(this.x-this.baseX)<=abs(this.deltaX) &&
               abs(this.y-this.baseY)<=abs(this.deltaY)){
              this.deltaX=0;
              this.deltaY=0;
            }

          }

        }

        if(this.hit && app.debug){

          /** Circle */
          fill(getColor(CLRS.BLACK,10));
          noStroke();

          var d=cos(PI/6)*this.w*0.8;
          ellipse(this.x,this.y,2*d,2*d);

          fill(CLRS.RED);
          ellipse(this.x,this.y,2,2);

          // if(this.parent.activePiece===this){
            // fill(CLRS.WHITE);
            // textSize(14);
            // text(nf(this.deltaX,1,2) + ', ' +
                 // nf(this.deltaY,1,2),
                 // this.x,this.y);
          // }

        }

      };
      piece.prototype.hitTest=function(x,y){

        return dist(this.x+x,this.y+y, mouseX,mouseY)<cos(PI/6)*this.w*1.25;

      };
      piece.prototype.moved=function(x,y){

        if(this.hitTest(x,y) &&
           this.parent.activePiece===null){ this.hit=true;  }
        else                              { this.hit=false; }

      };
      piece.prototype.dragged=function(x,y){

        if(this.hit){

          this.x=mouseX;
          this.y=mouseY;

          this.deltaX=(this.baseX-this.x)/20;
          this.deltaY=(this.baseY-this.y)/20;

          this.parent.activePiece=this;
          this.parent.dragging=true;

        }
        // else{

          // this.hit=false;

        // }

      };
      piece.prototype.clicked=function(x,y){

        // if(this.parent.activePiece===this){
          // this.parent.drop();
        // }

      };
      piece.prototype.released=function(x,y){

        // if(this.parent.activePiece===this){
          this.parent.drop();
        // }

      };
      piece.prototype.out=function(){

        if(this.parent.activePiece===this){
          this.parent.drop();
          this.hit=false;
        }

      };

    }

    /* Hexagonal Cell       */
    {

      function hexCell(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.outerHit=false;

        this.row          = Number(props.row);
        this.col          = Number(props.col);

        this.right        = null;
        this.topRight     = null;
        this.bottomRight  = null;
        
        this.left         = null;
        this.topLeft      = null;
        this.bottomLeft   = null;
        
        this.color        = props.color;

        this.hover        = false;
        this.timer        = 0;

        this.points       = [];
        this.dpoints      = [];

        var p=this;

        /* Initialize */
        function reset(){

          var w2=p.w/2;

          for(var pt=0; pt<6; pt++){
            p.points.push(new pnt( cos(radians(30+pt*60))*w2,
                                   sin(radians(30+pt*60))*w2));
          }

          for(var pt=0; pt<6; pt++){
            p.dpoints.push(new pnt( cos(radians(30+pt*60))*(w2-3),
                                    sin(radians(30+pt*60))*(w2-3) ));
          }

        };

        reset();

      };
      hexCell.prototype=Object.create(control.prototype);
      hexCell.prototype.draw=function(){

        this.active=this.hit && app.focus===this;
        this.offset=0;

        var p=this;
        var offset=0;

        function border(){

          noStroke();

          if(app.gameOver){
            fill(getColor(p.color, 50));
          }
          else if(p.timer!==0){
            strokeWeight(p.timer/30*5);
            fill(getColor(CLRS.WHITE, 75*p.timer/30));
            p.timer--;
          }
          else if(p.hover && p.parent.activePiece!==null){
            fill(getColor(p.parent.activePiece.color,50));
          }
          else{
            fill(getColor(p.color, 100));
          }

            /** Hexagon */
            beginShape();

              for(var pt=0; pt<6; pt++){
                vertex(p.dpoints[pt].x,
                       p.dpoints[pt].y);
              }

            endShape(CLOSE);

        };

        pushMatrix();

          translate(this.x, this.y);
          scale(1,-1);

            border();

            /** Circle */
            // stroke(CLRS.BLACK);
            // noFill();
            // var d=cos(PI/6)*this.w;
            // ellipse(0,0,d,d);

        popMatrix();



      };
      hexCell.prototype.hitTest=function(x,y){

        var retVal=false;

        var rectHit=rectangleHit(new pnt(this.x+this.points[0].x+x, this.y+this.points[0].y+y),
                                       new pnt(this.x+this.points[2].x+x, this.y+this.points[2].y+y),
                                       new pnt(this.x+this.points[5].x+x, this.y+this.points[5].y+y),
                                       mouseX,mouseY);

              var triHit0=triangleHit(new pnt(this.x+this.points[0].x+x, this.y+this.points[0].y+y),
                                      new pnt(this.x+this.points[1].x+x, this.y+this.points[1].y+y),
                                      new pnt(this.x+this.points[2].x+x, this.y+this.points[2].y+y),
                                      mouseX,mouseY);

              var triHit1=triangleHit(new pnt(this.x+this.points[3].x+x, this.y+this.points[3].y+y),
                                      new pnt(this.x+this.points[4].x+x, this.y+this.points[4].y+y),
                                      new pnt(this.x+this.points[5].x+x, this.y+this.points[5].y+y),
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
      hexCell.prototype.dragged=function(x,y){
      /* Overridden because of the shap */

        // if(this.parent.hit){

          if(this.outerHitTest(x,y)){

            this.outerHit=true;

            if(this.hitTest(x,y)){ this.hit=true;
                                   app.focus=this;
                                   this.parent.activeCell=this; }
            else                 { this.hit=false;              }

          }
          else{

            this.outerHit=false;
            this.hit=false;

          }

          this.hover=false;

        // }

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
      var rt=new root(100, 0, 0, width-1, height-1,
        {text:      'root',
         acolor:    getColor(color(33),85),
         icolor:    getColor(color(33),80),
         font:      monoFont,
         cursor:    ARROW,
         border:    true});

      app.controls.push(rt);

      /* hexBoard           */
      rt.controls.push(new hexBoard(600, rt, 300, height/2-60, 0, 0,
        {font:      'sans-serif',
         levels:    app.rows,
         cursor:    ARROW,
         color:     CLRS.K_TEAL_2,
         size:      0}));

      /** Requires a reference to access globally */
      app.hexGarden=rt.controls[0];

      /* Hexagon Navigation Buttons ----------------------------------- */
      {

        // var left  = 30;
        // var top   = 90;

        // /* Left            */
        // rt.controls.push(new i_hexButton(110, rt, left, top, 40, 40,
          // {execute:   decrementDiameter,
           // style:     GLYPHS.TEXT,
           // text:      HEXNAV.LEFT,
           // color:     CLRS.WHITE,
           // font:      monoFont,
           // cursor:    HAND}));

        // /* Right           */
        // rt.controls.push(new i_hexButton(120, rt, left+76, top, 40, 40,
          // {execute:   incrementDiameter,
           // style:     GLYPHS.TEXT,
           // color:     CLRS.WHITE,
           // text:      HEXNAV.RIGHT,
           // font:      monoFont,
           // cursor:    HAND}));

        // /* Reset           */
        // rt.controls.push(new i_hexButton(170, rt, left+38, top, 40, 40,
          // {execute:   reset,
           // style:     GLYPHS.RESET,
           // color:     CLRS.RED,
           // text:      'r',
           // font:      monoFont,
           // cursor:    HAND}));

        // /* Up Left         */
        // rt.controls.push(new i_hexButton(130, rt, left+19, top-32, 40, 40,
          // {execute:   incrementRows,
           // style:     GLYPHS.TEXT,
           // color:     CLRS.GRAY,
           // text:      HEXNAV.UP_LEFT,
           // font:      monoFont,
           // cursor:    HAND}));

        // /* Up Right        */
        // rt.controls.push(new i_hexButton(140, rt, left+57, top-32, 40, 40,
          // {execute:   decrementRows,
           // style:     GLYPHS.TEXT,
           // color:     CLRS.GRAY,
           // text:      HEXNAV.UP_RIGHT,
           // font:      monoFont,
           // cursor:    HAND}));

        // /* Down Left       */
        // rt.controls.push(new i_hexButton(150, rt, left+19, top+32, 40, 40,
          // {execute:   downLeft,
           // style:     GLYPHS.TEXT,
           // text:      HEXNAV.DOWN_LEFT,
           // color:     color(92),
           // font:      monoFont,
           // cursor:    HAND}));

        // /* Down Right      */
        // rt.controls.push(new i_hexButton(160, rt, left+57, top+32, 40, 40,
          // {execute:   downRight,
           // style:     GLYPHS.TEXT,
           // color:     color(92),
           // text:      HEXNAV.DOWN_RIGHT,
           // font:      monoFont,
           // cursor:    HAND}));



      }

      /* Toolbar ------------------------------------------------------ */
      {
        // /* tlbar           */
        // var tlbar=new toolbar(200, rt, 1, 1, width-2, 30,
          // {text:      'Hex Garden',
           // font:      monoFont,
           // acolor:    CLRS.K_TEAL_0,
           // icolor:    getColor(CLRS.BLACK,100),
           // cursor:    ARROW});

        // rt.controls.push(tlbar);

        // /* choose          */
        // tlbar.controls.push(new i_Button(210, tlbar, 10, 5, 22, 22,
          // {text:      'choose',
           // font:      monoFont,
           // execute:   toggleChoose,
           // retrieve:  getChoose,
           // style:     GLYPHS.CHOOSE,
           // color:     CLRS.WHITE,
           // cursor:    HAND}));

        // /* sigma           */
        // tlbar.controls.push(new i_Button(220, tlbar, 35, 5, 22, 22,
          // {text:      CONSTANTS.SIGMA,
           // font:      monoFont,
           // execute:   toggleSigma,
           // retrieve:  getSigma,
           // style:     GLYPHS.TEXT,
           // color:     CLRS.WHITE,
           // cursor:    HAND}));

        // /* sierpinski      */
        // tlbar.controls.push(new i_Button(230, tlbar, 60, 5, 22, 22,
          // {text:      'S',
           // font:      monoFont,
           // execute:   toggleSierpinski,
           // retrieve:  getSierpinski,
           // style:     GLYPHS.TRIFORCE,
           // color:     CLRS.WHITE,
           // cursor:    HAND}));

        // /* information     */
        // tlbar.controls.push(new i_Button(240, tlbar, 85, 5, 22, 22,
          // {text:      'i',
           // font:      monoFont,
           // execute:   toggleInfo,
           // retrieve:  getInfo,
           // style:     GLYPHS.TEXT,
           // color:     CLRS.YELLOW,
           // cursor:    HAND}));

        // /* settings        */
        // tlbar.controls.push(new i_Button(250, tlbar, width-25, 5, 22, 22,
          // {execute:   toggleTelemetry,
           // retrieve:  getTelemetry,
           // style:     GLYPHS.SETTINGS,
           // font:      monoFont,
           // color:     CLRS.K_TEAL_0,
           // cursor:    HAND}));

      }

      /* Navigation --------------------------------------------------- */
      {
        // var h=25;

        // /* Navbar            */
        // var nvbar=new navbar(300, rt, 1, height-26, width-2, h,
          // {text:        'Navigation',
           // font:        serifFont,
           // icolor:      getColor(CLRS.BLACK,20),
           // acolor:      CLRS.K_TEAL_0,
           // cursor:      ARROW,
           // position:    navCursor,
           // recordCount: navRecordCount,
           // execute:     navSetCursor});

        // rt.controls.push(nvbar);

        // /* Decrement Page        */
        // nvbar.controls.push(new navButton(310, nvbar, 0, 0, 50, h,
          // {font:      serifFont,
           // execute:   decrementRows,
           // type:      NAVIGATION.DECREMENTPAGE,
           // retrieve:  navCursor,
           // color:     CLRS.BLACK,
           // cursor:    HAND}));

        // /* Increment Page       */
        // nvbar.controls.push(new navButton(320, nvbar, width-50, 0, 50, h,
          // {font:      serifFont,
           // execute:   incrementRows,
           // type:      NAVIGATION.INCREMENTPAGE,
           // retrieve:  navCursor,
           // color:     CLRS.BLACK,
           // cursor:    HAND}));

        // /* First Record         */
        // nvbar.controls.push(new navButton(330, nvbar, 50, 0, 25, h,
          // {font:      serifFont,
           // execute:   firstRecord,
           // type:      NAVIGATION.FIRST,
           // retrieve:  navCursor,
           // color:     CLRS.BLACK,
           // cursor:    HAND}));

        // /* Decrement Record     */
        // nvbar.controls.push(new navButton(340, nvbar, 75, 0, 25, h,
          // {font:      serifFont,
           // execute:   decrementCursor,
           // type:      NAVIGATION.DECREMENT,
           // retrieve:  navCursor,
           // color:     CLRS.BLACK,
           // cursor:    HAND}));

        // /* Increment Record     */
        // nvbar.controls.push(new navButton(350, nvbar, width-100, 0, 25, h,
          // {font:      serifFont,
           // execute:   incrementCursor,
           // type:      NAVIGATION.INCREMENT,
           // retrieve:  navCursor,
           // color:     CLRS.BLACK,
           // cursor:    HAND}));

        // /* Last Record          */
        // nvbar.controls.push(new navButton(360, nvbar, width-75, 0, 25, h,
          // {font:      serifFont,
           // execute:   lastRecord,
           // type:      NAVIGATION.LAST,
           // retrieve:  navCursor,
           // color:     CLRS.BLACK,
           // cursor:    HAND}));

        // /* Scroll               */
        // nvbar.controls.push(new navScroll(370, nvbar, 100, 0, width-200, h,
          // {font:      serifFont,
           // execute:   navSetCursor,
           // color:     CLRS.BLACK,
           // cursor:    MOVE}));

      }

      /* SplashScreen ------------------------------------------------- */
      {

        /* Splash Screen   */
        var splashScreen=new splash(500, rt, width/2-200, height/2-200, 400, 400,
          {color:     CLRS.BLACK,
           font:      monoFont,
           retrieve:  getInfo,
           cursor:    CROSS});

          /* Close         */
          splashScreen.controls.push(new button(510, splashScreen, 180, 360, 120, 20,
            {text:      'Close',
             font:      monoFont,
             execute:   toggleInfo,
             color:     CLRS.WHITE,
             cursor:    HAND}));

        rt.controls.push(splashScreen);

      }

      /* Telemetry ---------------------------------------------------- */
      var telem=new telemetry(400, rt, width, 31, 200, height-30,
        {color:     color(72),
         font:      serifFont,
         cursor:    ARROW});

      rt.controls.push(telem);

  };

  function intro(){



  };
  function extro(){



  };
  function instructions(){



  };
  function play(){

    background(128);

    forEach(app.controls,'draw');

    if(app.gameOver){

      // fill(getColor(CLRS.GREEN, frameCount%255));      
      fill(getColor(CLRS.GREEN, 50));
      textAlign(CENTER,CENTER);
      textFont(sansFont,150);
      text('Game Over', width/2, height/2);

    }

  };

  var execute;

  execute=play;

  initialize();

  execute=play;
  
  app.focus=app.hexBoard;

  draw=function(){

    execute();

    global=this.__frameRate;

    fill(CLRS.YELLOW);
    textSize(36);
    textAlign(CENTER,CENTER);

      text(app.hexBoard.score, 50, 60);

      // text(app.gameOver, 500, 60);

      text(app.hexBoard.scores.length, 500, 60);
      text(nf(global,0,1), 50, 160);

    // var nums=[];

    // for(var i=0; i<25; i++){
      // nums[i]=0;
    // }

    // for(var n=0; n<250000; n++){
      // nums[floor(random(0,25))]++;      
    // }

    // println(nums.length + ' | ' + nums);

      try{

        // text(app.hexBoard.scores.length, 500, 60);

        // var row=Number(app.hexBoard.activeCell.row);
        // var col=Number(app.hexBoard.activeCell.col);

        // text(row + ', ' +  col, 50, 100);

        // row+=1;

        // text(row + ', ' +  col, 50, 130);

      }
      catch(e){
        // println(e);
      }

  };

  /* Keyboard Events =========================================================== */
  {

    keyPressed=function(){

      app.keys[keyCode]=true;

        switch(true){

          case app.keys[KEYCODES.F1]:         toggleInfo();             break;    /* F1 - Info        */
          case app.keys[KEYCODES.F2]:         toggleTelemetry();        break;    /* F2 - Telemetry   */
          case app.keys[KEYCODES.F3]:         toggleChoose();           break;    /* F3 - Choose      */
          case app.keys[KEYCODES.F4]:         toggleSierpinski();       break;    /* F4 - Sierpinski  */
          case app.keys[KEYCODES.F5]:         reset();                  break;    /* F5 - Reset       */
          case app.keys[KEYCODES.F6]:         toggleSigma();            break;    /* F6 - Sigma       */

          case app.keys[KEYCODES.PGUP]:       incrementRows();          break;    /* PGUP - Rows++    */
          case app.keys[KEYCODES.PGDN]:       decrementRows();          break;    /* PGDN - Rows--    */

          case app.keys[KEYCODES.a] &&
               app.keys[KEYCODES.CONTROL]:    app.hexGarden.selectAll();    break;  /* CTRL+A Select All */

          case app.keys[KEYCODES.R] ||
               app.keys[KEYCODES.r]:          app.hexGarden.resetPieces();  break;  /* R or r - Reset */

          case app.keys[KEYCODES.LEFT] ||
               app.keys[KEYCODES.A]:          left();                   break;    /* LEFT or A        */
          case app.keys[KEYCODES.RIGHT] ||
               app.keys[KEYCODES.D]:          right();                  break;    /* RIGHT or D       */

          case app.keys[KEYCODES.UP] &&
               app.keys[KEYCODES.CONTROL] ||
               app.keys[KEYCODES.W]:          upLeft();                 break;    /* Up or CTRL + W   */

          case app.keys[KEYCODES.UP] ||
               app.keys[KEYCODES.E]:          up();                     break;    /* UP or E          */

          case app.keys[KEYCODES.DOWN] &&
               app.keys[KEYCODES.CONTROL] ||
               app.keys[KEYCODES.Z]:          downLeft();               break;    /* CTRL + DOWN or Z */

          case app.keys[KEYCODES.DOWN] ||
               app.keys[KEYCODES.X]:          down();                   break;    /* DOWN or X        */

          case app.keys[KEYCODES.SPACE]:                                break;    /* SPACE            */

          default:                                                      break;

        }

    };
    keyTyped=function()   { /* println('typed ' + (key) + ' ' + keyCode); */  };
    keyReleased=function(){ app.keys[keyCode]=false;                          };

  }

  /* Mouse Events ============================================================== */
  {

    mouseClicked=function(){

      forEach(app.controls,'clicked');

      // switch(mouseButton){

        // case LEFT:    forEach(app.controls,'clicked');  break;
        // case RIGHT:   forEach(app.controls,'rclicked'); break;
        // case CENTER:  forEach(app.controls,'cclicked'); break;

        // default:     break;
      // }

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

      if(app.left){ app.dragging=true; }

      switch(mouseButton){

        case LEFT:   forEach(app.controls,'dragged'); break;
        // case RIGHT:  for(var c in app.controls){ app.controls[c].rClicked(); } break;
        // case CENTER: for(var c in app.controls){ app.controls[c].cClicked(); } break;

        default:     break;

      }

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
hextris.js

*/

}};
