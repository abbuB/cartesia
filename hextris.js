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


    TO DO:

      Highlight rows while tallying


    Research:


    TO DONE:

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

  // println(MY_FAV);

  function application(){

    /* Initialize -------------------- */
    {

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

    this.focus        = -1;     //  The ID of the control with focus

    this.controls     = [];     //  Collection of controls in the app
    this.keys         = [];     //  Array holding the value of all keycodes

    this.info         = 0;      //  Is the info frame displayed
    this.telemetry    = 1;      //  Is telemetry visible

    /* Hextris Specific ------------------ */

    this.hexBoard     = this.controls[1];

    this.score        = 0;

  };

  var app=new application();

  /* Constants ============================================================= */
  {

    var CLRS_S={

      SINGLE:         0,

      LINE:           1,
      LINE_FORWARD:   2,
      LINE_BACK:      3,

      DIAMOND:        4,

      UUP:            5,
      UDOWN:          6,

      UPRIGHT:        7,
      DOWNRIGHT:      8,
      UPLEFT:         9,
      DOWNLEFT:       10,

      ZRIGHT:         11,
      ZLEFT:          12,

      SEVENRIGHT:     13,
      SEVENLEFT:      14,

      ANGLERIGHT:     15,
      ANGLELEFT:      16,

      NODEUPRIGHT:    17,
      NODEUPLEFT:     18,
      NODEDOWNRIGHT:  19,
      NODEDOWNLEFT:   20,

      VUPRIGHT:       21,
      VUPLEFT:        22,
      VDOWNRIGHT:     23,
      VDOWNLEFT:      24

    }

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

      RED:          color(170, 29, 29,255), GREEN:        color(158,182, 58,255),
      BLUE:         color( 29, 86,170,255), YELLOW:       color(238,214, 15,255),
      ORANGE:       color(238,136, 15,255), GRAY:         color(128,128,128,255),

      BROWN:        color(155,145,135,255),

      Red:          color(255,  0,  0,255), RedOrange:    color(255, 81,  0,255),
      Orange:       color(255,127,  0,255), YellowOrange: color(255,190,  0,255),
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

  }

  /* Utility Functions ===================================================== */
  {

    function getShapeColor(n){

      var retVal=-1;

      switch(n){

        case CLRS_S.SINGLE:         retVal=color(170, 29, 29,255);  break;

        case CLRS_S.LINE:
        case CLRS_S.LINE_FORWARD:
        case CLRS_S.LINE_BACK:      retVal=color(158,182, 58,255);  break;

        case CLRS_S.DIAMOND:        retVal=color( 49,204,167,255);  break;

        case CLRS_S.UUP:
        case CLRS_S.UDOWN:

        case CLRS_S.UPRIGHT:
        case CLRS_S.DOWNRIGHT:
        case CLRS_S.UPLEFT:
        case CLRS_S.DOWNLEFT:       retVal=color(238,214, 15,255);  break;

        case CLRS_S.ZRIGHT:
        case CLRS_S.ZLEFT:          retVal=color( 29, 86,170,255);  break;

        case CLRS_S.SEVENRIGHT:
        case CLRS_S.SEVENLEFT:
        case CLRS_S.ANGLERIGHT:
        case CLRS_S.ANGLELEFT:      retVal=color(255, 81,  0,255);  break;

        case CLRS_S.NODEUPRIGHT:
        case CLRS_S.NODEUPLEFT:
        case CLRS_S.NODEDOWNRIGHT:
        case CLRS_S.NODEDOWNLEFT:   retVal=color(255, 20,147,255);  break;

        case CLRS_S.VUPRIGHT:
        case CLRS_S.VUPLEFT:
        case CLRS_S.VDOWNRIGHT:
        case CLRS_S.VDOWNLEFT:      retVal=color(255,190,  0,255);  break;

        default:                                                    break;

      }

      return retVal;

    };

    function isFocus(n){ return app.focus===n; }

    function getColor(clr, alpha){ return color(red(clr), green(clr), blue(clr), alpha/100*255); };

    function setCell()         {

      // app.activeCell=app.pyramid.controls[app.row][app.col];
      // app.activeCell.on=!app.activeCell.on;

    };

    function resetAngles()     {

      app.angles=[];

      for(var row=0; row<=app.rows; row++){
        app.angles[row]=[];
      }

println('Angles Reset');

    };

    function reset()           {

      app.dirty = true;

        app.hexGarden.reset();
        // resetAngles();

      app.dirty=false;

    };

    function getDiameter()     { return app.diameter;                 };

    function getInfo()         { return app.info;                     };
    function toggleInfo()      { app.info=!app.info;                  };

    function getTelemetry()    { return app.telemetry;                };
    function toggleTelemetry() { app.telemetry=!app.telemetry;        };

    function constrainCurrent(){

      app.row=(constrain)(app.row, 0, app.rows);
      // app.col=(constrain)(app.col, 0, app.pyramid.controls[app.row].length-1);

      // app.activeCell=app.pyramid.controls[app.row][app.col];

    };

    function exists(n)  {

      for(var row in app.angles){
        for(var col in app.angles[row]){

          if(app.angles[row][col]===n){
            return true;
          }

        }
      }

      return false;

    };

    function clickTest(n){ println('click: ' + n);                    };

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
            app.focus=this.id;

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

        this.active=this.hit && app.focus===this.id;

        pushMatrix();

          translate(this.x, this.y);

            // noStroke();
            fill(this.icolor);

            if(this.hit              ){ fill(this.acolor);   }
            if(app.dragging &&
               app.hexBoard.activeShape!==null){ cursor(HAND);        }
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
          app.focus=this.id;

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

        this.active=this.hit && app.focus===this.id;

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

          this.active=this.hit && app.focus===this.id;

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
              app.focus=this.id;

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

        this.active=this.hit && app.focus===this.id;

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

          if(p.hit){ fill(getColor(p.color, 85)); }
          else     { fill(getColor(p.color, 80)); }

          rect(p.offset, 0, p.w, p.h);

        };

        //  Properties
        var properties=function(p){

          var row0=30;

          var col0=p.offset+20;
          var col1=p.offset+30;
          var col2=p.offset+130;

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

          var activeShape;
          var activeCell;

          if(app.hexBoard.activeShape!==null){ activeShape=app.hexBoard.activeShape.id; }
          else                               { activeShape='null';                      }

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

            text('\n' +
                 mouseX                     + '\n' +
                 mouseY                     + '\n\n\n' +
                 app.left                   + '\n' +
                 app.right                  + '\n' +
                 app.center                 + '\n\n\n' +
                 app.keys[KEYCODES.ALT]     + '\n' +
                 app.keys[KEYCODES.CONTROL] + '\n' +
                 app.keys[KEYCODES.SHIFT]   + '\n\n\n' +
                 app.focus                  + '\n' +
                 focused                    + '\n' +
                 app.telemetry              + '\n\n\n' +
                 activeShape                + '\n' +
                 activeCell                 + '\n' +
                 app.dragging               + '\n\n' +
                 app.info                   + '\n\n' +
                 nf(global,0,2)             + '\n',
                 col2, row0+15);

          var txt='Press the left and right arrow keys to increment and decrement integer.';

          textSize(11);
          textAlign(LEFT,BOTTOM);

            text(txt, p.offset+17, p.h-45, p.w-20, 100);

        };

        this.active=this.hit && app.focus===this.id;

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
              app.focus=this.id;

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
        // this.count      = 0;
        // this.angle      = 0;

        this.shapes         = [];
        this.layout         = [];

        this.activeCell     = null;
        this.activeShape    = null;
        this.activeIndex    = null;

        this.position0=new pnt(150, 525);
        this.position1=new pnt(300, 525);
        this.position2=new pnt(450, 525);

        // this.locked     = false;

        this.reset();

        app.hexBoard=this;

      };
      hexBoard.prototype=Object.create(control.prototype);
      hexBoard.prototype.reset=function(){

        var p=this; //  Reference to the hexGarden control

        p.controls=[];
        p.shapes=[];

        p.activeCell  = null;
        p.activeShape = null;
        p.activeIndex = null;

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
          // p.w=500;

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
                 cursor:    ARROW}));

               n++;

            }

            p.controls.push(rowArray);

            rowArray=[];

          }

        };

        load();
        this.loadShapes();

      };
      hexBoard.prototype.loadShapes=function(){

        var random0=floor(random(0,24));
        var random1=floor(random(0,24));
        var random2=floor(random(0,24));

        this.shapes.push(new shap(0, this, this.position0.x, this.position0.y, HEX_SIZE, HEX_SIZE,
          {baseX: this.position0.x,
           baseY: this.position0.y,
           style: random0,
           color: getShapeColor(random0)}));

        this.shapes.push(new shap(1, this, this.position1.x, this.position1.y, HEX_SIZE, HEX_SIZE,
          {baseX: this.position1.x,
           baseY: this.position1.y,
           style: random1,
           color: getShapeColor(random1)}));

        this.shapes.push(new shap(2, this, this.position2.x, this.position2.y, HEX_SIZE, HEX_SIZE,
          {baseX: this.position2.x,
           baseY: this.position2.y,
           style: random2,
           color: getShapeColor(random2)}));

        {
          // this.shapes.push(new shap('S'+0, this, 150, 520, HEX_SIZE, HEX_SIZE,
            // {style: random0,
             // color: getShapeColor(random0)}));

          // this.shapes.push(new shap('S'+1, this, 300, 520, HEX_SIZE, HEX_SIZE,
            // {style: random1,
             // color: getShapeColor(random1)}));

          // this.shapes.push(new shap('S'+2, this, 450, 520, HEX_SIZE, HEX_SIZE,
            // {style: random2,
             // color: getShapeColor(random2)}));

          // this.shapes.push(new shap('S'+3, this, 350, 530, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.ROW_BACK,
             // color: CLRS.LINE}));

          // this.shapes.push(new shap(400, this, 450, 530, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.DIAMOND,
             // color: CLRS.DIAMOND}));

          // this.shapes.push(new shap(400, this, 500, 100, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.UUP,
             // color: CLRS.U}));

          // this.shapes.push(new shap(400, this, 500, 200, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.UDOWN,
             // color: CLRS.U}));

          // this.shapes.push(new shap(400, this, 500, 300, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.UPRIGHT,
             // color: CLRS.U}));

          // this.shapes.push(new shap(400, this, 500, 400, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.UPLEFT,
             // color: CLRS.U}));

          // this.shapes.push(new shap(400, this, 600, 300, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.DOWNRIGHT,
             // color: CLRS.U}));

          // this.shapes.push(new shap(400, this, 600, 400, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.DOWNLEFT,
             // color: CLRS.U}));

          // this.shapes.push(new shap(400, this, 600, 100, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.ZRIGHT,
             // color: CLRS.Z}));

          // this.shapes.push(new shap(400, this, 600, 200, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.ZLEFT,
             // color: CLRS.Z}));

          // this.shapes.push(new shap(400, this, 700, 100, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.SEVENRIGHT,
             // color: CLRS.SEVEN}));

          // this.shapes.push(new shap(400, this, 700, 200, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.SEVENLEFT,
             // color: CLRS.SEVEN}));

          // this.shapes.push(new shap(400, this, 700, 300, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.ANGLERIGHT,
             // color: CLRS.SEVEN}));

          // this.shapes.push(new shap(400, this, 700, 400, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.ANGLELEFT,
             // color: CLRS.SEVEN}));

          // this.shapes.push(new shap(400, this, 300, 100, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.NODEDOWNLEFT,
             // color: CLRS.NODE}));

          // this.shapes.push(new shap(400, this, 300, 200, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.NODEDOWNRIGHT,
             // color: CLRS.NODE}));

          // this.shapes.push(new shap(400, this, 300, 300, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.NODEUPLEFT,
             // color: CLRS.NODE}));

          // this.shapes.push(new shap(400, this, 300, 400, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.NODEUPRIGHT,
             // color: CLRS.NODE}));

          // this.shapes.push(new shap(400, this, 800, 100, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.VDOWNLEFT,
             // color: CLRS.V}));

          // this.shapes.push(new shap(400, this, 800, 200, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.VDOWNRIGHT,
             // color: CLRS.V}));

          // this.shapes.push(new shap(400, this, 800, 300, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.VUPLEFT,
             // color: CLRS.V}));

          // this.shapes.push(new shap(400, this, 800, 400, HEX_SIZE, HEX_SIZE,
            // {style: SHAPES.VUPRIGHT,
             // color: CLRS.V}));

        }

      };
      hexBoard.prototype.draw=function(){

        var p =this;

        function matchShape(){

          if(p.activeCell.col>0){
            // p.controls[p.activeCell.row][p.activeCell.col-2].on=true;
            // p.controls[p.activeCell.row][p.activeCell.col-1].on=true;
            // p.controls[p.activeCell.row][p.activeCell.col].on=true;
            // p.controls[p.activeCell.row][p.activeCell.col+1].on=true;
          }
          // else{
            // p.controls[p.activeCell.row-1][p.activeCell.col-1].on=false;
          // }

        };

        this.active=this.hit && app.focus===this.id;

        pushMatrix();

          translate(this.x, this.y);
          rotate(this.angle);


        // fill(getColor(this.color, 50));

            for(var r in this.controls){
              for(var c in this.controls[r]){

                this.controls[r][c].draw();

              }
            }

            // matchShape();

            // noStroke();
            // fill(getColor(CLRS.RED,10));
            // ellipse(0,0,600,600);

        popMatrix();

        forEach(this.shapes, 'draw');

      };
      hexBoard.prototype.moved    = function(x,y){
      /* Overridden because of the nested controls */

        // if(this.parent.hit){

          // if(dist(mouseX,mouseY,this.x,this.y)<this.w/2){

            // this.hit=true;
            // app.focus=this.id;

          // }
          // else{

            // this.hit=false;

          // }

        // }


        for(var s in this.shapes){
          this.shapes[s].moved(0,0);
        }

      };
      hexBoard.prototype.dragged  = function(){

        forEach(this.shapes, 'dragged');

        if(this.activeShape!==null){

          for(var r in this.controls){
            for(var c in this.controls[r]){

              this.controls[r][c].moved(this.x,this.y);

            }
          }

        }

      };
      hexBoard.prototype.released = function(){

        forEach(this.shapes, 'released');

      };
      hexBoard.prototype.validateShape=function(){

        var retVal=false;

          for(var r in this.controls){
            for(var c in this.controls[r]){

              if(this.controls[r][c].hit){
                retVal=true;
                break;
              }

            }
          }

        return retval;

      };
      hexBoard.prototype.resetShape=function(){

        //  Determine the knew shape
        var random0=floor(random(0,24));
        var i=this.activeIndex;

        // Create 200 pixels below baseY to allow to glide into place
        this.shapes[i].x=this.shapes[i].baseX;
        this.shapes[i].y=this.shapes[i].baseY+200;

        this.shapes[i].style=random0;
        this.shapes[i].color=getShapeColor(random0);

      };
      hexBoard.prototype.resetShapes=function(){

        for(var n in this.shapes){

          var random0=floor(random(0,24));

          this.shapes[n].x=this.shapes[n].baseX;
          this.shapes[n].y=this.shapes[n].baseY;
          this.shapes[n].style=random0;
          this.shapes[n].color=getShapeColor(random0);

        }

      };
      hexBoard.prototype.tally=function(){

        // println(this.layout[0][0]);
        
        var cells=[];
        
        var l=this.layout;
        
        function val    (row,col){ return l[row][col]===1;      };
        function addCell(row,col){ cells.push(new pt(row,col)); };

        /* Rows */
        { 
        
          // Row 0
          if(val(0,0) && val(0,1) && val(0,2) && val(0,3) && val(0,4) ){

            addCell(0,0); addCell(0,1); addCell(0,2); addCell(0,3); addCell(0,4);

            this.score+=5;
            
            // println('Row 0');

          }
          // Row 1
          if(val(1,0) && val(1,1) && val(1,2) && val(1,3) && val(1,4) &&
             val(1,5) ){

            addCell(1,0); addCell(1,1); addCell(1,2); addCell(1,3); addCell(1,4);
            addCell(1,5);
             
            this.score+=6;
             
            // println('Row 1');

          }
          // Row 2
          if(val(2,0) && val(2,1) && val(2,2) && val(2,3) && val(2,4) &&
             val(2,5) && val(2,6) ){

            addCell(2,0); addCell(2,1); addCell(2,2); addCell(2,3); addCell(2,4);
            addCell(2,5); addCell(2,6);

            this.score+=7;
             
            // println('Row 2');

          }
          // Row 3
          if(val(3,0) && val(3,1) && val(3,2) && val(3,3) && val(3,4) &&
             val(3,5) && val(3,6) && val(3,7) ){

            addCell(3,0); addCell(3,1); addCell(3,2); addCell(3,3); addCell(3,4);
            addCell(3,5); addCell(3,6); addCell(3,7);
             
            this.score+=8;
            // println('Row 3');

          }
          // Row 4
          if(val(4,0) && val(4,1) && val(4,2) && val(4,3) && val(4,4) &&
             val(4,5) && val(4,6) && val(4,7) && val(4,8) ){

            addCell(4,0); addCell(4,1); addCell(4,2); addCell(4,3); addCell(4,4);
            addCell(4,5); addCell(4,6); addCell(4,7); addCell(4,8);
            
            this.score+=9;
            
             // println('Row 4');

          }
          // Row 5
          if(val(5,0) && val(5,1) && val(5,2) && val(5,3) && val(5,4) &&
             val(5,5) && val(5,6) && val(5,7) ){

            this.score+=8;
             
            addCell(5,0); addCell(5,1); addCell(5,2); addCell(5,3); addCell(5,4);
            addCell(5,5); addCell(5,6); addCell(5,7);

            // println('Row 5');

          }
          // Row 6
          if(val(6,0) && val(6,1) && val(6,2) && val(6,3) && val(6,4) &&
             val(6,5) && val(6,6) ){

            this.score+=7;
             
            addCell(6,0); addCell(6,1); addCell(6,2); addCell(6,3); addCell(6,4);
            addCell(6,5); addCell(6,6);
            
             // println('Row 6');

          }
          // Row 7
          if(val(7,0) && val(7,1) && val(7,2) && val(7,3) && val(7,4) &&
             val(7,5) ){

            this.score+=6;
             
            addCell(7,0); addCell(7,1); addCell(7,2); addCell(7,3); addCell(7,4);
            addCell(7,5);
            
             // println('Row 7');

          }
          // Row 8
          if(val(8,0) && val(8,1) && val(8,2) && val(8,3) && val(8,4) ){

            this.score+=5;

            addCell(8,0); addCell(8,1); addCell(8,2); addCell(8,3); addCell(8,4);

            // println('Row 8');

          }

        }
        
        /* Forward Columns */
        {
          
          // Column 0
          if(val(0,0) && val(1,0) && val(2,0) && val(3,0) && val(4,0) ){

            this.score+=5;
          
            addCell(0,0); addCell(1,0); addCell(2,0); addCell(3,0); addCell(4,0);
          
            // println('F Col 0');

          }
          // Column 1
          if(val(0,1) && val(1,1) && val(2,1) && val(3,1) && val(4,1) &&
             val(5,0) ){

            this.score+=6;
          
            addCell(0,1); addCell(1,1); addCell(2,1); addCell(3,1); addCell(4,1);
            addCell(5,0);
            
            // println('F Col 1');

          }
          // Column 2
          if(val(0,2) && val(1,2) && val(2,2) && val(3,2) && val(4,2) &&
             val(5,1) && val(6,0) ){

            this.score+=7;
          
            addCell(0,2); addCell(1,2); addCell(2,2); addCell(3,2); addCell(4,2);
            addCell(5,1); addCell(6,0);
            
            // println('F Col 2');

          }
          // Column 3
          if(val(0,3) && val(1,3) && val(2,3) && val(3,3) && val(4,3) &&
             val(5,2) && val(6,1) && val(7,0) ){

            this.score+=8;
          
            addCell(0,3); addCell(1,3); addCell(2,3); addCell(3,3); addCell(4,3);
            addCell(5,2); addCell(6,1); addCell(7,0);
            
            // println('F Col 3');

          }
          // Column 4
          if(val(0,4) && val(1,4) && val(2,4) && val(3,4) && val(4,4) &&
             val(5,3) && val(6,2) && val(7,1) && val(8,0) ){

            this.score+=9;

            addCell(0,4); addCell(1,4); addCell(2,4); addCell(3,4); addCell(4,4);
            addCell(5,3); addCell(6,2); addCell(7,1); addCell(8,0);

            // println('F Col 4');

          }
          // Column 5
          if(val(1,5) && val(2,5) && val(3,5) && val(4,5) && val(5,4) &&
             val(6,3) && val(7,2) && val(8,1) ){

            this.score+=8;

            addCell(1,5); addCell(2,5); addCell(3,5); addCell(4,5); addCell(5,4);
            addCell(6,3); addCell(7,2); addCell(8,1);
            
            // println('F Col 5');

          }          
          // Column 6
          if(val(2,6) && val(3,6) && val(4,6) && val(5,5) && val(6,4) &&
             val(7,3) && val(8,2) ){

            this.score+=7;

            addCell(2,6); addCell(3,6); addCell(4,6); addCell(5,5); addCell(6,4);
            addCell(7,3); addCell(8,2);
            
            // println('F Col 6');

          }
          // Column 7
          if(val(3,7) && val(4,7) && val(5,6) && val(6,5) && val(7,4) &&
             val(8,3) ){

            this.score+=6;

            addCell(3,7); addCell(4,7); addCell(5,6); addCell(6,5); addCell(7,4);
            addCell(8,3);

            // println('F Col 7');

          }
          // Column 8
          if(val(4,8) && val(5,7) && val(6,6) && val(7,5) && val(8,4) ){

            this.score+=5;

            addCell(4,8); addCell(5,7); addCell(6,6); addCell(7,5); addCell(8,4);
            
            // println('F Col 8');

          }

        }

        /* Backward Columns */
        {
          
          // Column 0
          if(val(4,0) && val(5,0) && val(6,0) && val(7,0) && val(8,0) ){

            this.score+=5;

            addCell(4,0); addCell(5,0); addCell(6,0); addCell(7,0); addCell(8,0);
            
            // println('B Col 0');

          }
          // Column 1
          if(val(3,0) && val(4,1) && val(5,1) && val(6,1) && val(7,1) &&
             val(8,1) ){

            this.score+=6;
            
            addCell(3,0); addCell(4,1); addCell(5,1); addCell(6,1); addCell(7,1);
            addCell(8,1);
            
            // println('B Col 1');

          }
          // Column 2
          if(val(2,0) && val(3,1) && val(4,2) && val(5,2) && val(6,2) &&
             val(7,2) && val(8,2) ){

            this.score+=7;
            
            addCell(2,0); addCell(3,1); addCell(4,2); addCell(5,2); addCell(6,1);
            addCell(7,2); addCell(8,2);
            
             println('B Col 2');

          }
          // Column 3
          if(val(1,0) && val(2,1) && val(3,2) && val(4,3) && val(5,3) &&
             val(6,3) && val(7,3) && val(8,3) ){

            this.score+=8;
            
            addCell(1,0); addCell(2,1); addCell(3,2); addCell(4,3); addCell(5,3);
            addCell(6,3); addCell(7,3); addCell(8,3);
            
            // println('B Col 3');

          }
          // Column 4
          if(val(0,0) && val(1,1) && val(2,2) && val(3,3) && val(4,4) &&
             val(5,4) && val(6,4) && val(7,4) && val(8,4) ){

            this.score+=9;
            
            addCell(0,0); addCell(1,1); addCell(2,2); addCell(3,3); addCell(4,4);
            addCell(5,4); addCell(6,4); addCell(7,4); addCell(8,4);
 
            // println('B Col 4');

          }
          // Column 5
          if(val(0,1) && val(1,2) && val(2,3) && val(3,4) && val(4,5) &&
             val(5,5) && val(6,5) && val(7,5) ){

            this.score+=8;
            
            addCell(0,1); addCell(1,2); addCell(2,3); addCell(3,4); addCell(4,5);
            addCell(5,5); addCell(6,5); addCell(7,5);
            
            // println('B Col 5');

          }          
          // Column 6
          if(val(0,2) && val(1,3) && val(2,4) && val(3,5) && val(4,6) &&
             val(5,6) && val(6,6) ){

            this.score+=7;
            
            addCell(0,2); addCell(1,3); addCell(2,4); addCell(3,5); addCell(4,6);
            addCell(5,6); addCell(6,6);
            
            // println('B Col 6');

          }
          // Column 7
          if(val(0,3) && val(1,4) && val(2,5) && val(3,6) && val(4,7) &&
             val(5,7) ){

            this.score+=6;
            
            addCell(0,3); addCell(1,4); addCell(2,5); addCell(3,6); addCell(4,7);
            addCell(5,7);
            
            // println('B Col 7');

          }
          // Column 8
          if(val(0,4) && val(1,5) && val(2,6) && val(3,7) && val(4,8) ){

            this.score+=5;
            
            addCell(0,4); addCell(1,5); addCell(2,6); addCell(3,7); addCell(4,8);

            // println('B Col 8');

          }

        }

        // Clear Cells
        for(var n=0; n<cells.length; n++){
          this.layout[cells[n].row][cells[n].col]=0;
          this.controls[cells[n].row][cells[n].col].color=this.color;
          // println(n);
        }

        cells=[]; // Reset Cell Array

      };
      hexBoard.prototype.drop = function(){

        if(this.activeCell!==null &&
           this.activeCell.hit){

          this.layout[this.activeCell.row][this.activeCell.col]=1;

          this.activeCell.color=this.activeShape.color;
          
          this.tally();

          this.resetShape();

        }
        else{

          this.activeShape.x=this.activeShape.baseX;
          this.activeShape.y=this.activeShape.baseY;

        }
// println(this.activeShape.id);
        this.activeCell  = null;
        this.activeShape = null;
        this.activeIndex = null;

      };
      hexBoard.prototype.clicked  = function(){};
      hexBoard.prototype.out      = function(){

        this.hit=false;
        forEach(this.shapes, 'out');

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
          this.active=this.hit && app.focus===this.id;

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
              app.focus=this.id;

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
        this.active=this.hit && app.focus===this.id;
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

        this.active=this.hit && app.focus===this.id;
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
                app.focus=this.id;

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

        this.active=this.hit && app.focus===this.id;
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
                app.focus=this.id;

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

    /* shape                */
    {

      function shap(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.baseX  = x;
        this.baseY  = y;

        this.style  = props.style;
        this.color  = props.color;

      };
      shap.prototype=Object.create(control.prototype);
      shap.prototype.draw=function(){

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

          function single(clr){

              fill(clr);

              drawHexagon(0, 0, w);

          };

          function row(clr){

            fill(clr);

              drawHexagon( f*3*w, 0, w);
              drawHexagon( f*1*w, 0, w);
              drawHexagon(-f*1*w, 0, w);
              drawHexagon(-f*3*w, 0, w);

          };
          function forward(clr){

            rotate(-PI/3);

              row(clr);

          };
          function back(clr){

            rotate(PI/3);

              row(clr);

          };

          function diamond(clr){

            fill(clr);

            if(app.dragging && p.hit){
              drawHexagon( 0,      w+0.75*w, w);
              drawHexagon( f*1*w,  0,        w);
              drawHexagon(-f*1*w,  0,        w);
              drawHexagon( 0,     -w-0.75*w, w);
            }
            else{
              drawHexagon( 0,      w*1.33, w);
              drawHexagon( f*1*w,  0,      w);
              drawHexagon(-f*1*w,  0,      w);
              drawHexagon( 0,     -w*1.33, w);
            }

          };
          function zRight(clr){

            rotate(PI/3);

              diamond(clr);

          };
          function zLeft(clr){

            rotate(-PI/3);

              diamond(clr);

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

                case SHAPES.SINGLE:         single(CLRS.SINGLE);      break;

                case SHAPES.ROW:            row(CLRS.LINE);           break;
                case SHAPES.ROW_FORWARD:    forward(CLRS.LINE);       break;
                case SHAPES.ROW_BACK:       back(CLRS.LINE);          break;

                case SHAPES.DIAMOND:        diamond(CLRS.DIAMOND);    break;
                case SHAPES.ZRIGHT:         zRight(CLRS.Z);           break;
                case SHAPES.ZLEFT:          zLeft(CLRS.Z);            break;

                case SHAPES.UUP:            uUp(CLRS.U);              break;
                case SHAPES.UDOWN:          uDown(CLRS.U);            break;

                case SHAPES.UPRIGHT:        upRight(CLRS.U);          break;
                case SHAPES.UPLEFT:         upLeft(CLRS.U);           break;
                case SHAPES.DOWNRIGHT:      downRight(CLRS.U);        break;
                case SHAPES.DOWNLEFT:       downLeft(CLRS.U);         break;

                case SHAPES.SEVENRIGHT:     sevenRight(CLRS.SEVEN);   break;
                case SHAPES.SEVENLEFT:      sevenLeft(CLRS.SEVEN);    break;
                case SHAPES.ANGLERIGHT:     angleRight(CLRS.SEVEN);   break;
                case SHAPES.ANGLELEFT:      angleLeft(CLRS.SEVEN);    break;

                case SHAPES.NODEDOWNLEFT:   nodeDownLeft(CLRS.NODE);  break;
                case SHAPES.NODEDOWNRIGHT:  nodeDownRight(CLRS.NODE); break;
                case SHAPES.NODEUPLEFT:     nodeUpLeft(CLRS.NODE);    break;
                case SHAPES.NODEUPRIGHT:    nodeUpRight(CLRS.NODE);   break;

                case SHAPES.VDOWNLEFT:      vDownLeft(CLRS.V);        break;
                case SHAPES.VDOWNRIGHT:     vDownRight(CLRS.V);       break;
                case SHAPES.VUPLEFT:        vUpLeft(CLRS.V);          break;
                case SHAPES.VUPRIGHT:       vUpRight(CLRS.V);         break;

                default:                                              break;

              }

          popMatrix();

        };

        drawShape();

        if(this.parent.activeShape!==this &&
           this.y!==this.baseY){
          this.y-=5;
        }
        else{

          if(this.dragging===false){

            this.x+=(this.baseX-this.x)/10;
            this.y+=(this.baseY-this.y)/10;

          }

        }

        if(this.hit){

          /** Circle */
          fill(getColor(CLRS.BLACK,10));

          var d=cos(PI/6)*this.w*0.8;
          ellipse(this.x,this.y,2*d,2*d);

        }

      };
      shap.prototype.hitTest=function(x,y){

        return dist(this.x+x,this.y+y, mouseX,mouseY)<cos(PI/6)*this.w/2*0.8;

      };
      shap.prototype.moved=function(x,y){

        if(this.hitTest(x,y)){ this.hit=true;  }
        else                 { this.hit=false; }

      };
      shap.prototype.dragged=function(x,y){

        if(this.hit){

          this.x=mouseX;
          this.y=mouseY;

          this.parent.activeShape=this;
          this.parent.activeIndex=this.id;
          this.parent.dragging=true;

        }
        else{

          this.hit=false;

        }

      };
      shap.prototype.released=function(x,y){

        if(this.parent.activeShape===this){ this.parent.drop(); }

      };
      shap.prototype.out=function(){

        if(this.parent.activeShape===this){
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

        this.row      = props.row;
        this.col      = props.col;

        this.color    = props.color;

        this.points   = [];
        this.dpoints  = [];

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

        this.active=this.hit && app.focus===this.id;
        this.offset=0;

        var p=this;
        var offset=0;

        function border(){

          noStroke();
          fill(getColor(p.color, 100));

          if(p.hit){

            if(p.parent.activeShape!==null){
              fill(getColor(p.parent.activeShape.color,50));
            }

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
      hexCell.prototype.moved=function(x,y){
      /* Overridden because of the shap */

        // if(this.parent.hit){

          if(dist(mouseX, mouseY,
                  this.x+x,
                  this.y+y)<this.w/2){

            this.outerHit=true;

            if(this.hitTest(x,y)){ this.hit=true;
                                   app.focus=this.id;
                                   app.hexBoard.activeCell=this; }
            else                 { this.hit=false;              }

          }
          else{

            this.outerHit=false;
            this.hit=false;

          }

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
        {retrieve:  getDiameter,
         font:      'sans-serif',
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

  function update(){

    // frameRate(app.frameRate);

    background(128);

    forEach(app.controls,'draw');

  };

  var execute;

  execute=update;

  initialize();

  execute=update;

  draw=function(){

    execute();

    global=this.__frameRate;

    fill(CLRS.YELLOW);
    textSize(36);
    textAlign(CENTER,CENTER);

      text(app.hexBoard.score, 50, 60);

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
               app.keys[KEYCODES.CONTROL]:    app.hexGarden.selectAll();  break;    /* CTRL+A Select All */

          case app.keys[KEYCODES.R] ||
               app.keys[KEYCODES.r]:          app.hexGarden.resetShapes();      break;    /* R or r - Reset */

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

          case app.keys[KEYCODES.SPACE]:      setCell();                break;    /* SPACE - Set Cell */

          default:                                                      break;

        }

    };
    keyTyped=function()   { /* println('typed ' + (key) + ' ' + keyCode); */  };
    keyReleased=function(){ app.keys[keyCode]=false;                          };

  }

  /* Mouse Events ============================================================== */
  {

    mouseClicked=function(){

      switch(mouseButton){

        case LEFT:    forEach(app.controls,'clicked');  break;
        // case RIGHT:   forEach(app.controls,'rclicked'); break;
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






































































// 1729 = 10^3+9^3 = 12^3+1^3
}};
