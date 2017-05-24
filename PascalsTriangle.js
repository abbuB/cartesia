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

      en.wikipedia.org/wiki/Triangular_number
      en.wikipedia.org/wiki/Binomial_coefficient

      oeis.org/A000217

      Numberphile - www.youtube.com/watch?v=0iMtlus-afo

    TO DO:

      - complete info

      - interesting patterns

          * Hockey stick
          * Sum of rows
          * Sierpinski's Triangle
          * Exponents of 11
          * Counting #'s
          * Triangular #'s
          * Square #'s
          * Tetrahedral #'s
          * Polygonal #'s
          * Symmetry
          * Magix Hexagon
          * Fibonacci Sequence
          * Prime #'s
          * mod 2 (even and odd numbers)
          * sum of row (decimal and binary)

    Research:


    TO DONE:

      - only size cells fonts on initial load (reduce processing)

      - n k choose formulas option for each cell

      - center the pyramid vertically

      - display ideal path on click of hexButton

      - calculate the pyramid completely on load

      - fix the changing fonts

      - data cursor

      - reset button

      - Navigation

        - increment/decrement
        - last/first
        - scroll
        - add row
        - remove row

      - only draw telemetry if it's visible

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
  // println(MY_FAV);

  function application(){

    /* Initialize -------------------- */
    {

      frameRate(0);

      cursor(WAIT);
      strokeCap(SQUARE);

      angleMode='radians';

      size(900, 700); // set size of canvas

    }

    this.dirty        = false;  //  Has a reset occurred

    this.debug        = true;   //  Mode that displays enhanced debugging tools

    this.frameRate    = 0;      //  Refresh speed

    this.mouseX       = 0;      //  Current mouseX location
    this.mouseY       = 0;      //  Current mouseY location

    this.left         = false;  //  Is the left mouse button pressed
    this.right        = false;  //  Is the right mouse button pressed
    this.center       = false;  //  Is the center mouse button pressed

    this.focus        = -1;     //  The ID of the control with focus

    this.controls     = [];     //  Collection of controls in the app
    this.keys         = [];     //  Array holding the value of all keycodes

    this.info         = false;  //  Is the info frame displayed
    this.telemetry    = false;  //  Is telemetry visible

    /* App Specific ------------------ */

    this.calculating  = false;

    this.cursor       = 0;      //  Position of the cursor in grid
    this.cells        = 0;      //  # of cells in the grid

    this.levels       = 16;

    this.levelsMax    = 32;
    this.levelsMin    = 5;

    this.row          = 0;
    this.col          = 0;

    this.path         = [];     //  The final path of the pyramid

    this.pyramid;               //  Reference to the pyramid control
    this.currentCell;           //  Reference to the currently selected cell in the pyramid

    this.pascal       = [];
    this.rowTotals    = [];     //  Array of sum of the cells in each row

    this.sierpinski   = false;  //  Is the Sierpinski triangle displayed
    this.choose       = false;  //  n Choose p displayed https://en.wikipedia.org/wiki/Binomial_coefficient
    this.sigma        = false;  //  Is the sum of the rows total displayed

    this.text         = '';

  };

  var app=new application();

  /* Constants ================================================================= */
  {

    // var KEYCODES={
      // BACKSPACE:  8,
      // TAB:        9,
      // ENTER:      10,
      // RETURN:     13,
      // ESC:        27,
      // DELETE:     127,
      // CODED:      0xffff,
      // SHIFT:      16,
      // CONTROL:    17,
      // ALT:        18,
      // CAPSLK:     20,
      // SPACE:      32,
      // PGUP:       33,
      // PGDN:       34,
      // END:        35,
      // HOME:       36,
      // LEFT:       37,
      // UP:         38,
      // RIGHT:      39,
      // DOWN:       40,
      // F1:         112,
      // F2:         113,  //  Rename
      // F3:         114,
      // F4:         115,
      // F5:         116,
      // F6:         117,
      // stg:        118,  // F7: snap to grid
      // ORTHO:      119,  // F8:
      // F9:         120,
      // F10:        121,
      // F11:        122,
      // F12:        123,
      // NUMLK:      144,
      // META:       157,
      // INSERT:     155,
      // Z:          90
    // };
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

  // /* Data types ================================================================ */
  // {

    // function pt(row,col){
      // this.row=row;
      // this.col=col;
    // };
    // pt.prototype.toString=function(){ return this.row + ", " + this.col; }

    // function pnt(x,y){
      // this.x = x;
      // this.y = y;
    // };
    // pnt.prototype.toString=function(){ return this.x +  ", " + this.y; }

  // }

  /* Utility Functions ========================================================= */
  {

    /**  Thanks Peter */
    // function forEach(arr, func, props){

      // for(var c=0; c<arr.length; c++){

        // arr[c][func](props);

      // }

    // };

    function isFocus(n){ return app.focus===n; }

    function getColor(clr, alpha){ return color(red(clr), green(clr), blue(clr), alpha/100*255); };

    function setCell()         {

      app.currentCell=app.pyramid.controls[app.row][app.col];
      app.currentCell.on=!app.currentCell.on;

    };

    function reset()           {

      app.dirty = true;

        app.calculating=false;
        app.path=[];
        app.cursor=0;
        app.row=0;
        app.col=0;

        app.pyramid.levels=app.levels;
        app.pascal=loadPascal();
        app.pyramid.reset();

      app.dirty=false;

    };

    function getCalculate()    { return app.calculating;              };
    function getTelemetry()    { return app.telemetry;                };

    function toggleCalculate() { app.calculating=!app.calculating;    };
    function toggleTelemetry() { app.telemetry=!app.telemetry;        };

    function getInfo()         { return app.info;                     };
    function toggleInfo()      { app.info=!app.info;                  };

    function getChoose()       { return app.choose;                   };
    function toggleChoose()    { app.choose=!app.choose;              };

    function getSierpinski()   { return app.sierpinski;               };
    function toggleSierpinski(){ app.sierpinski=!app.sierpinski;      };

    function getSigma()        { return app.sigma;                    };
    function toggleSigma()     { app.sigma=!app.sigma;                };

    function constrainCurrent(){

      app.row=(constrain)(app.row, 0, app.pyramid.controls.length-1);
      app.col=(constrain)(app.col, 0, app.pyramid.controls[app.row].length-1);

      app.currentCell=app.pyramid.controls[app.row][app.col];

    };

    function right()   {

      if(app.levels<app.levelsMax){

        app.levels++;

        app.levels=(constrain)(app.levels, app.levelsMin, app.levelsMax);

        reset();

      }

    };
    function left()   {

      if(app.levels>app.levelsMin){

        app.levels--;

        app.levels=(constrain)(app.levels, app.levelsMin, app.levelsMax);

        reset();

      }

    };
    function right()    {

      app.col++;
      constrainCurrent();

    };
    function left()    {

      app.col--;
      constrainCurrent();

    };
    function upRight(){
      
      app.row--;
      constrainCurrent();
      
    };
    
    function upLeft(){
      
      app.row--;
      app.col--;
      constrainCurrent();
      
    };
    function downRight(){

      app.row++;
      app.col++;
      constrainCurrent();

    };
    function downLeft(){

      app.row++;
      constrainCurrent();

    };

  }

  /* Containers/Controls ======================================================= */
  {

    // Default ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

        this.font     = monoFont;       /** default font */

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
      // control.prototype.rClicked=function(){};
      // control.prototype.cClicked=function(){};
      control.prototype.dragged = function(){ if(this.hit){ forEach(this.controls, 'dragged'); } };
      control.prototype.pressed = function(){ if(this.hit){ forEach(this.controls, 'pressed'); } };
      control.prototype.released= function(){};
      // control.prototype.typed=function(){};
      control.prototype.over    = function(){};
      control.prototype.out     = function(){ this.hit=false; forEach(this.controls, 'out'); };

    }

    /* Containers ================================================ */

    // root ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {
      /* Identical to a container control except is doesn't have a parent */
      function root(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.text   = props.text;

        this.acolor = props.acolor;
        this.icolor = props.icolor;

        this.cursor = props.cursor;
        this.border = props.border;

        this.left   = 0;

      };
      root.prototype=Object.create(control.prototype);
      root.prototype.draw=function(){

        this.active=this.hit && app.focus===this.id;

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            fill(this.icolor);

            if(this.hit   ){ fill(this.acolor);   }
            if(this.active){ cursor(this.cursor); }
            if(this.border){ strokeWeight(1);
                             stroke(CLRS.BLUE);   }

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

          for(var c in this.controls){ this.controls[c].moved((this.x+x), (this.y+y)); }

        }
        else{

          this.hit=false;

          for(var c in this.controls){ this.controls[c].hit=false; }

        }

      };

    }

    // Container ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

    // Splash Screen ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

    // NavBar ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      function navbar(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.text        = props.text;
        this.acolor      = props.acolor;
        this.icolor      = props.icolor;
        this.cursor      = props.cursor;
        this.position    = props.position;
        this.recordCount = props.recordCount;
        this.execute     = props.execute;
        this.font        = props.font;

      };
      navbar.prototype=Object.create(control.prototype);
      navbar.prototype.draw=function(){

        this.active=this.hit && app.focus===this.id;

        pushMatrix();

          translate(this.x+0.5, this.y+0.5);

            noStroke();
            fill(getColor(CLRS.BLACK,10));

            if(this.hit   ){ fill(this.acolor);   }
            if(this.active){ cursor(this.cursor); }

              rect(0, 0, this.w, this.h);

            stroke(getColor(CLRS.K_TEAL_0,25));
            strokeWeight(0.25);

              // line(0, 0, this.w,      0); // Top Border

            // Caption
            fill(getColor(CLRS.K_TEAL_1, 75));

            if(this.hit){ fill(getColor(CLRS.WHITE,75)); }

            textFont(this.font);
            textAlign(CENTER,CENTER);
            var txt=this.position() + ' of ' + this.recordCount();

              text(txt, this.w/2, this.h/2);

            forEach(this.controls, 'draw');

        popMatrix();

      };

    }

    // Toolbar ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
            fill(getColor(CLRS.BLACK,10));

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

    // Telemetry ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
                 'Controls          \n\n\n\n' +
                 'Keys              \n\n\n\n\n' +
                 'App               \n\n\n\n',
                 col1, row0+15);

          /* app.focus is required to be done after control update in main draw sub */

          fill(getColor(CLRS.WHITE,75));

            text('            \n' +
                 'x:          \n' +
                 'y:          \n\n\n' +
                 'Left:       \n' +
                 'Right:      \n' +
                 'Center:     \n\n\n' +
                 'Focus:      \n' +
                 'Focused:    \n\n\n' +
                 'Alt:        \n' +
                 'Control:    \n' +
                 'Shift:      \n\n\n' +
                 'telemetry:  \n' +
                 'Sigma:      \n' +
                 'Sierpinski: \n' +
                 'Info:       \n\n' +
                 'Cursor:     \n' +
                 'Frame Rate: \n' +
                 'Info:',
                 col1, row0+15);

          fill(getColor(CLRS.YELLOW,75));

            text('\n' +
                 mouseX                     + '\n' +
                 mouseY                     + '\n\n\n' +
                 app.left                   + '\n' +
                 app.right                  + '\n' +
                 app.center                 + '\n\n\n' +
                 app.focus                  + '\n' +
                 focused                    + '\n\n\n' +
                 app.keys[KEYCODES.ALT]     + '\n' +
                 app.keys[KEYCODES.CONTROL] + '\n' +
                 app.keys[KEYCODES.SHIFT]   + '\n\n\n' +
                 app.telemetry              + '\n' +
                 app.sigma                  + '\n' +
                 app.sierpinski             + '\n' +
                 app.info                   + '\n\n' +
                 app.cursor                 + '\n' +
                 nf(global,0,2)             + '\n' +
                 app.infoOn,
                 col2, row0+15);

          var txt='Press the left and right arrow keys to increment and decrement integer.';

          textSize(11);
          textAlign(LEFT,BOTTOM);

            text(txt, p.offset+17, p.h-35, p.w-20, 100);

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

    // Pyramid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      function pyramid(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.levels = app.levels;
        this.size   = this.h/app.levels*1.6;
        this.font   = props.font;
        this.cursor = props.cursor;

        this.row    = 0;
        this.col    = 0;

        this.p0     = new pnt(this.w*cos(radians( 30))+this.x, this.w*sin(radians( 30))+this.y);
        this.p1     = new pnt(this.w*cos(radians(150))+this.x, this.w*sin(radians(150))+this.y);
        this.p2     = new pnt(this.w*cos(radians(270))+this.x, this.w*sin(radians(270))+this.y);

        // Initialize
        this.load=function(){

          var xPos  = 0;
          var yPos  = 0;
          var ID    = 0;
          var row   = [];
          var total = 0;

          var w2=this.size/2;

          // PI/6 radians = 30 degrees
          var rowOffset = this.size-(w2*cos(PI/3));
          var colOffset = cos(PI/6)*w2;
          var top       = -this.size*app.levels/2+rowOffset/2;
          var rowTotal  = 0;

          app.rowTotals=[];

          /* Pascal buttons        */
          for(var y=0; y<this.levels; y++){

            for(var x=0; x<=y; x++){

              ID=y + ',' + x;

              xPos = x*colOffset*2-y*colOffset;
              yPos = y*rowOffset+top;

              row.push(new hexButton(ID, this, xPos, yPos, this.size, this.size,
                {col:       x,
                 row:       y,
                 ordinal:   total,
                 integer:   app.pascal[y][x],
                 color:     CLRS.K_TEAL_1,
                 font:      props.font,
                 cursor:    HAND}));

              total++;

              rowTotal+=app.pascal[y][x];

            }

            this.controls.push(row);
            row=[];

            app.rowTotals.push(rowTotal);
            rowTotal=0;

          }

          app.cells=total;

        };

        // this.load();

      };
      pyramid.prototype=Object.create(control.prototype);
      pyramid.prototype.draw    = function(){

        this.active=this.hit && app.focus===this.id;

        pushMatrix();

          translate(this.x-0.5,this.y-0.5);

          /** Commented out to reduce processing time */
            // noFill();
            // noStroke();

            // fill(getColor(CLRS.K_TEAL_0,15));
            // textFont(this.font);

            if(this.hit && this.active){

              // fill(getColor(CLRS.K_TEAL_0,10));
              cursor(this.cursor);

              // stroke(getColor(CLRS.K_TEAL_0,10));
              // strokeWeight(0.25);

            }

            // fill(getColor(CLRS.BLACK, 90));
            // noStroke();

              // triangle(this.p0.x-this.x, this.p0.y-this.y,
                       // this.p1.x-this.x, this.p1.y-this.y,
                       // this.p2.x-this.x, this.p2.y-this.y);

            for(var row=0; row<this.controls.length; row++){
              for(var col in this.controls[row]){

                this.controls[row][col].draw(this.x,this.y);

              }

              if(app.sigma){  //  Display Row Totals

                fill(getColor(CLRS.YELLOW,75));
                textSize(this.controls[row][0].textSize*0.75);
                textAlign(LEFT,CENTER);

                  text(app.rowTotals[row], -width/2+25, this.controls[row][0].y);

              }

            }

        popMatrix();

      };
      pyramid.prototype.selectAll   = function(){


        for(var r=0; r<this.controls.length; r++){
          for(var c in this.controls[r]){

            this.controls[r][c].on=true;

          }
        }

      };
      pyramid.prototype.reset   = function(){

        this.levels=app.levels;
        this.size=this.h/app.levels*1.6;

        this.controls=[];
        this.load();

        for(var r=0; r<this.controls.length; r++){
          for(var c in this.controls[r]){

            this.controls[r][c].on=false;;
            this.controls[r][c].text=round(random(99));

          }
        }

        app.row=0;
        app.col=0;

        this.on=false;

      };
      pyramid.prototype.moved   = function(x,y){
      /* Overridden because of the shape */

        if(this.parent.hit){

          if(triangleHit(new pnt(this.p0.x+x, this.p0.y+y),
                         new pnt(this.p1.x+x, this.p1.y+y),
                         new pnt(this.p2.x+x, this.p2.y+y),
                         mouseX,
                         mouseY)){

            this.hit=true;
            app.focus=this.id;

            for(var r=0; r<this.controls.length; r++){
              for(var c in this.controls[r]){

                this.controls[r][c].moved(this.x,this.y);

              }
            }

          }
          else{

            this.hit=false;

            for(var r=0; r<this.controls.length; r++){
              for(var c in this.controls[r]){

                this.controls[r][c].hit=false;

              }
            }

          }

        }

      };
      pyramid.prototype.clicked = function(){

        if(this.hit){

          for(var r=this.controls.length-1; r>-1; r--){
            for(var c=this.controls[r].length-1; c>-1; c--){

              this.controls[r][c].clicked();

            }
          }

        }

      }
      pyramid.prototype.calc    = function(){

        // if(this.on===false){

          for(var row=this.controls.length-2; row>-1; row--){
            for(var col=this.controls[row].length-1; col>-1; col--){

              this.controls[row][col].calc();

              this.controls[row+1][col  ].set();
              this.controls[row+1][col+1].set();

            }
          }

        // }

        this.on=true;

      }
      pyramid.prototype.step    = function(row,col){

        this.controls[row][col].calc();

        this.controls[row+1][col  ].set();
        this.controls[row+1][col+1].set();

      }
      pyramid.prototype.out     = function(){ this.hit=false; }
      pyramid.prototype.pressed = function(){};
      pyramid.prototype.dragged = function(){};

    }


    /* Controls ================================================ */

    // Index ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      function index(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.radius = props.radius;
        this.color  = props.color;
        this.cursor = props.cursor;
        this.font   = props.font;

      };
      index.prototype=Object.create(control.prototype);
      index.prototype.draw=function(){

        this.active=this.hit && app.focus===this.id;
        this.offset=0;

        pushMatrix();

          translate(this.x, this.y);

            strokeWeight(1);
            stroke(getColor(CLRS.BLACK, 20));
            fill(getColor(this.color, 50));
            textFont(this.font);

            if(this.active){ stroke(getColor(CLRS.BLACK, 40));
                             fill(getColor(this.color, 75));

                             cursor(this.cursor);               }

            rect(this.offset, this.offset, this.w, this.h, this.radius);

        popMatrix();

      };

    }

    // navScroll ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      function navScroll(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.color    = props.color;
        this.cursor   = props.cursor;
        this.execute  = props.execute;
        this.font     = props.font;

      };
      navScroll.prototype=Object.create(control.prototype);
      navScroll.prototype.draw=function(){

        this.active=this.hit && app.focus===this.id;
        this.offset=0;

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            noFill();
            // fill(getColor(this.color, 5));
            textFont(this.font);

            if(this.active){

              fill(getColor(this.color, 5));
              strokeWeight(0.25);
              stroke(getColor(CLRS.K_TEAL_1, 50));

              cursor(this.cursor);

            }

              rect(1, 1, this.w-2, this.h-2);

            var xPos=floor(app.cursor/app.cells*this.w);

            stroke(getColor(CLRS.RED,100));
            strokeWeight(0.5);

              line(xPos,0,xPos,30);

            forEach(this.controls, 'draw');

        popMatrix();

      };
      navScroll.prototype.dragged=function(x,y){

        if(this.active){

          var X=round((mouseX-this.x)/this.w*app.cells);

          if(X>=0 && X<=app.cells){
            this.execute(X);
          }

        }

      };
      navScroll.prototype.clicked=function(){

        if(this.active){

          var X=round((mouseX-this.x)/this.w*app.cells);

          if(X>=0 && X<=app.cells){
            this.execute(X);
          }

        }

      };

    }

    // navButton ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      function navButton(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.execute  = props.execute;
        this.type     = props.type;
        this.retrieve = props.retrieve;
        this.color    = props.color;
        this.cursor   = props.cursor;
        this.font     = props.font;

      };
      navButton.prototype=Object.create(control.prototype);
      navButton.prototype.draw=function(){

        this.active=this.hit && app.focus===this.id;
        this.offset=0;

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            noFill();

            if(this.active){

              if(app.left){ this.offset=1; }

              fill(getColor(this.color,10));
              cursor(this.cursor);

            }

            //  Background
              rect(this.offset, this.offset, this.w, this.h, 2);

            // Icon
            fill(getColor(CLRS.K_TEAL_1, 50));

            if(this.parent.hit){ fill(getColor(this.color,  75)); }
            if(this.hit)       { fill(getColor(this.color, 100)); }

            noStroke();
            textAlign(CENTER,CENTER);
            textFont(this.font);

              switch(this.type){

                case NAVIGATION.FIRST:          text('|'+CONSTANTS.TRIANGLE_L,                  this.w/2+this.offset, this.h/2+this.offset); break;
                case NAVIGATION.DECREMENT:      text(CONSTANTS.TRIANGLE_L,                      this.w/2+this.offset, this.h/2+this.offset); break;
                case NAVIGATION.INCREMENT:      text(CONSTANTS.TRIANGLE_R,                      this.w/2+this.offset, this.h/2+this.offset); break;
                case NAVIGATION.LAST:           text(CONSTANTS.TRIANGLE_R+'|',                  this.w/2+this.offset, this.h/2+this.offset); break;
                case NAVIGATION.INCREMENTPAGE:  text(CONSTANTS.TRIANGLE_R+CONSTANTS.TRIANGLE_R, this.w/2+this.offset, this.h/2+this.offset); break;
                case NAVIGATION.DECREMENTPAGE:  text(CONSTANTS.TRIANGLE_L+CONSTANTS.TRIANGLE_L, this.w/2+this.offset, this.h/2+this.offset); break;

                default:  break;

              }

        popMatrix();

      };
      navButton.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.active){ this.execute(); }

      };

    }

    // OnOff ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      function onOff(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.execute  = props.execute;
        this.retrieve = props.retrieve;
        this.color    = props.color;
        this.cursor   = props.cursor;
        this.font     = props.font;

      };
      onOff.prototype=Object.create(control.prototype);
      onOff.prototype.draw=function(){

        this.active=this.hit && app.focus===this.id;
        this.offset=0;

        pushMatrix();

          translate(this.x, this.y);

            ellipseMode(CENTER);
            textFont(this.font);

            if(this.active){ stroke(getColor(this.color, 75));
                             cursor(this.cursor);              }
            else           { stroke(getColor(this.color, 50)); }

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

        if(this.parent.hit){

          if(dist(mouseX, mouseY,
                  this.x+x, this.y+y)<this.w){

            this.hit=true;
            app.focus=this.id;

          }
          else{

            this.hit=false;

          }

        }

      };
      onOff.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.active){

          this.execute();
          this.on=!this.on;

        }

      };

    }

    // Button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

    // Icon Button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
                  
          if(p.parent.hit){ fill(getColor(CLRS.WHITE, 75)); }
          if(p.active    ){ fill(getColor(CLRS.WHITE,100)); }

            offset=p.offset;

            triangle( p.w/2 + offset, offset,
                      p.w + offset,   p.h+offset,
                      offset,         p.h+offset);

              noStroke();

          fill(getColor(p.parent.color,50));
                  
          if(p.parent.hit){ fill(getColor(CLRS.K_TEAL_0, 75)); }
          if(p.active    ){ fill(getColor(CLRS.K_TEAL_0,100)); }

              triangle( p.w/2 + offset,    p.h+offset,
                        p.w*0.25 + offset, p.h/2+offset,
                        p.w*0.75+offset,   p.h/2+offset);

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

          fill(getColor(CLRS.K_TEAL_1,50));

          if(p.parent.hit       ){ fill(getColor(p.color, 75)); }
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

            default:                            break;

          };

        popMatrix();

      };
      /** Overridden for execute */
      i_Button.prototype.clicked=function(){ if(this.active){ this.execute(); } };

    }

    
    // Hexagon Button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
          app.currentCell=this;

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

    // Icon Hexagon Button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
              beginShape();

                vertex(this.p1.x+OS, this.p1.y-OS);
                vertex(this.p2.x+OS, this.p2.y-OS);
                vertex(this.p3.x+OS, this.p3.y-OS);
                vertex(this.p4.x+OS, this.p4.y-OS);
                vertex(this.p5.x+OS, this.p5.y-OS);
                vertex(this.p6.x+OS, this.p6.y-OS);

              endShape(CLOSE);

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
    
  }

  /* Initialize ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  function initialize(){

    // Background --------------------------------------------------

      /* root control       */
      var rt=new root(100, null, 0, 0, width-1, height-1,
        {text:      'root',
         acolor:    getColor(CLRS.BLACK,80),
         icolor:    getColor(CLRS.BLACK,85),
         font:      monoFont,
         cursor:    ARROW,
         border:    true});

      app.controls.push(rt);
         
      /* pyramid */
      rt.controls.push(new pyramid(1234, rt, width/2, height/2+90, width*0.65, height*0.65,
        {font:      'sans-serif',
         levels:    app.levels,
         cursor:    ARROW,
         size:      0}));

      /** Requires a reference to access globally */
      app.pyramid=rt.controls[0];

      /* Hexagon Navigation Buttons */
      {

        /* Left */
        rt.controls.push(new i_hexButton(120, rt, width-300, 150, 40, 40,
          {execute:   left,
           style:     GLYPHS.TEXT,
           text:      HEXNAV.LEFT,
           color:     CLRS.WHITE,
           font:      monoFont,
           cursor:    HAND}));
           
        /* Right */  
        rt.controls.push(new i_hexButton(110, rt, width-226, 150, 40, 40,
          {execute:   right,
           style:     GLYPHS.TEXT,
           color:     CLRS.WHITE,
           text:      HEXNAV.RIGHT,
           font:      monoFont,
           cursor:    HAND}));

        /* Up Left */
        rt.controls.push(new i_hexButton(130, rt, width-282, 118, 40, 40,
          {execute:   upLeft,
           style:     GLYPHS.TEXT,
           color:     CLRS.GRAY,
           text:      HEXNAV.UP_LEFT,
           font:      monoFont,
           cursor:    HAND}));

        /* Up Right */
        rt.controls.push(new i_hexButton(140, rt, width-245, 118, 40, 40,
          {execute:   upRight,
           style:     GLYPHS.TEXT,
           color:     CLRS.GRAY,
           text:      HEXNAV.UP_RIGHT,
           font:      monoFont,
           cursor:    HAND}));

        /* Down Left */
        rt.controls.push(new i_hexButton(110, rt, width-282, 182, 40, 40,
          {execute:   downLeft,
           style:     GLYPHS.TEXT,
           text:      HEXNAV.DOWN_LEFT,
           color:     color(92),
           font:      monoFont,
           cursor:    HAND}));
           
        /* Down Right */
        rt.controls.push(new i_hexButton(140, rt, width-245, 182, 40, 40,
          {execute:   downRight,
           style:     GLYPHS.TEXT,
           color:     color(92),
           text:      HEXNAV.DOWN_RIGHT,
           font:      monoFont,
           cursor:    HAND}));

        /* Reset */
        rt.controls.push(new i_hexButton(150, rt, width-263, 150, 40, 40,
          {execute:   reset,
           style:     GLYPHS.RESET,
           color:     CLRS.RED,
           text:      'r',
           font:      monoFont,
           cursor:    HAND}));

      }
    
      // toolbar --------------------------------------------------
      {
        /* tlbar             */
        var tlbar=new toolbar(200, rt, 1, 1, width-2, 30,
          {text:      'Pascals Triangle',
           font:      monoFont,
           acolor:    CLRS.K_TEAL_0,
           icolor:    getColor(CLRS.BLACK,20),
           cursor:    ARROW});

        rt.controls.push(tlbar);
    
        /* play            */
        tlbar.controls.push(new i_Button(210, tlbar, 5, 5, 20, 20,
          {execute:   toggleCalculate,
           retrieve:  getCalculate,
           style:     GLYPHS.TRIFORCE,
           font:      monoFont,
           color:     CLRS.K_TEAL_0,
           cursor:    HAND}));

        /* reset           */
        tlbar.controls.push(new i_Button(220, tlbar, 32, 5, 20, 20,
          {execute:   reset,
           retrieve:  getCalculate,
           style:     GLYPHS.RESET,
           font:      monoFont,
           color:     CLRS.K_TEAL_0,
           cursor:    HAND}));

        /* sierpinski     */
        tlbar.controls.push(new i_Button(230, tlbar, width-106, 5, 22, 22,
          {text:      'S',
           font:      monoFont,
           execute:   toggleSierpinski,
           retrieve:  getSierpinski,
           style:     GLYPHS.TEXT,
           color:     CLRS.WHITE,
           cursor:    HAND}));

        /* sigma     */
        tlbar.controls.push(new i_Button(240, tlbar, width-79, 5, 22, 22,
          {text:      CONSTANTS.SIGMA,
           font:      monoFont,
           execute:   toggleSigma,
           retrieve:  getSigma,
           style:     GLYPHS.TEXT,
           color:     CLRS.WHITE,
           cursor:    HAND}));

        /* information     */
        tlbar.controls.push(new i_Button(250, tlbar, width-52, 5, 22, 22,
          {text:      'i',
           font:      monoFont,
           execute:   toggleInfo,
           retrieve:  getInfo,
           style:     GLYPHS.TEXT,
           color:     CLRS.YELLOW,
           cursor:    HAND}));

        /* settings        */
        tlbar.controls.push(new i_Button(260, tlbar, width-25, 5, 22, 22,
          {execute:   toggleTelemetry,
           retrieve:  getTelemetry,
           style:     GLYPHS.SETTINGS,
           font:      monoFont,
           color:     CLRS.K_TEAL_0,
           cursor:    HAND}));

      }

      // Navigation --------------------------------------------------
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

      // Index --------------------------------------------------
      {
        // /* index              */
        // var idx=new index(300, bk, 10, 40, 130, 225,{radius:  5,
            // color:   CLRS.WHITE,
            // cursor:  ARROW});

        // rt.controls.push(idx);

          // /* Sine button        */
          // rt.controls.push(new button(310, bk, 15, 45, 120, 20,
            // {text:     'Sin '+CONSTANTS.THETA,
             // execute:  toggleSine,
             // tag:      getSine,
             // retrieve: getSineOn,
             // color:    CLRS.SIN,
             // cursor:   HAND}));

          // /* Cosine button      */
          // rt.controls.push(new button(320, bk, 15, 65, 120, 20,
            // {text:     'Cos '+CONSTANTS.THETA,
             // execute:  toggleCosine,
             // tag:      getCosine,
             // retrieve: getCosineOn,
             // color:    CLRS.COS,
             // cursor:   HAND}));

          // /* Tangent button     */
          // rt.controls.push(new button(330, bk, 15, 85, 120, 20,
            // {text:     'Tan '+CONSTANTS.THETA,
             // execute:  toggleTangent,
             // tag:      getTangent,
             // retrieve: getTangentOn,
             // color:    CLRS.TAN,
             // cursor:   HAND}));

          // /* Cosecant button    */
          // rt.controls.push(new button(340, bk, 15, 110, 120, 20,
            // {text:     'Csc '+CONSTANTS.THETA,
             // execute:  toggleCosecant,
             // tag:      getCosecant,
             // retrieve: getCosecantOn,
             // color:    CLRS.K_PINK_0,
             // cursor:   HAND}));

          // /* Secant button      */
          // rt.controls.push(new button(350, bk, 15, 130, 120, 20,
            // {text:     'Sec '+CONSTANTS.THETA,
             // execute:  toggleSecant,
             // tag:      getSecant,
             // retrieve: getSecantOn,
             // color:    CLRS.K_PINK_2,
             // cursor:   HAND}));

          // /* Cotangent button   */
          // rt.controls.push(new button(360, bk, 15, 150, 120, 20,
            // {text:     'Cot '+CONSTANTS.THETA,
             // execute:  toggleCotangent,
             // tag:      getCotangent,
             // retrieve: getCotangentOn,
             // color:    CLRS.TAN_LT,
             // cursor:   HAND}));

          // /* Excosecant button   */
          // rt.controls.push(new button(360, bk, 15, 175, 120, 20,
            // {text:     'Excsc '+CONSTANTS.THETA,
             // execute:  toggleExcosecant,
             // tag:      getExcosecant,
             // retrieve: getExcosecantOn,
             // color:    CLRS.K_TEAL_0,
             // cursor:   HAND}));

          // /* Coversine button   */
          // rt.controls.push(new button(360, bk, 15, 195, 120, 20,
            // {text:     'Cvs '+CONSTANTS.THETA,
             // execute:  toggleCoversine,
             // tag:      getCoversine,
             // retrieve: getCoversineOn,
             // color:    CLRS.K_TEAL_2,
             // cursor:   HAND}));

          // /* Versine button   */
          // rt.controls.push(new button(360, bk, 15, 220, 120, 20,
            // {text:     'Ver '+CONSTANTS.THETA,
             // execute:  toggleVersine,
             // tag:      getVersine,
             // retrieve: getVersineOn,
             // color:    CLRS.K_BROWN_1,
             // cursor:   HAND}));

          // /* Exsecant button   */
          // rt.controls.push(new button(360, bk, 15, 240, 120, 20,
            // {text:     'Exsec '+CONSTANTS.THETA,
             // execute:  toggleExsecant,
             // tag:      getExsecant,
             // retrieve: getExsecantOn,
             // color:    CLRS.K_ORANGE_1,
             // cursor:   HAND}));
      }

      // SplashScreen --------------------------------------------------
      {

        /* Splash Screen      */
        var splashScreen=new splash(500, rt, width/2-200, height/2-200, 400, 400,
          {color:     CLRS.BLACK,
           font:      monoFont,
           retrieve:  getInfo,
           cursor:    CROSS});

          /* Close              */
          splashScreen.controls.push(new button(510, splashScreen, 180, 360, 120, 20,
            {text:      'Close',
             font:      monoFont,
             execute:   toggleInfo,
             color:     CLRS.WHITE,
             cursor:    HAND}));

        rt.controls.push(splashScreen);

      }


      // Telemetry --------------------------------------------------

      /* Telemetry          */
      var telem=new telemetry(400, rt, width, 31, 200, height-56,
        {color:     color(72),
         font:      serifFont,
         cursor:    ARROW});

      rt.controls.push(telem);

  };

  function loadPascal(){

    var rows=[];
    var cols=[1];

    for(var row=0; row<app.levels; row++){

      for(var col=0; col<row; col++){

        cols.push(cols[col]*(row-col)/(col+1));

      }

      rows.push(cols);
      cols=[1];

    }

    return rows;

  };

  app.pascal=loadPascal();

  // println(ArrayToText2D(app.pascal));
// textFont(createFont(monoFont, 16));
  function update(){

    pushMatrix();

      translate(0,0);

        // frameRate(app.frameRate);

        background(242);

        forEach(app.controls,'draw');

    popMatrix();

    fill(CLRS.BLACK);
    textAlign(LEFT,TOP);

      // text(app.text,20,30);

  };

  var execute;

  execute=update;

  initialize();

  /**  Initialize the app.keys array and the values of the special keys */
  app.keys[KEYCODES.CONTROL] = false;
  app.keys[KEYCODES.ALT]     = false;
  app.keys[KEYCODES.SHIFT]   = false;

  // println(sortDigitsAsc(918273645));
  // println(sortDigitsDesc(918273645));
  // println(sumOfDigits(918273645));
  // println(sqr(11));
  // println(sqrt(121));

  var n=2230;

  const r=0.5;
  const L_SECTION=(1-pow(r,2)*PI)/4;

// println(L_SECTION);

  function calc(){

    cursor(ARROW);

    strokeWeight(0.5);
    background(CLRS.WHITE);

    stroke(CLRS.BLACK);
    fill(CLRS.BLUE);

      rect(10,10,200,200);

    fill(CLRS.WHITE);

      rect(10,10,200,100);
      rect(110,10,100,200);

    fill(CLRS.WHITE);

      ellipse(110,110,200,200);


      line(10,210,10+n*200,10);

fill(CLRS.K_TEAL_0);

text("L-Section Area:  " + L_SECTION, 10, 300);
text("N:  " + n, 10, 320);
text("Slope:  " + 1/n, 10, 340);

// println(n + " : " + 1/n);

n++;

  };

  execute=update;

  reset();

  draw=function(){

    execute();

    global=this.__frameRate;

  };

  /* Keyboard Events =========================================================== */
  {

    keyPressed=function(){

      app.keys[keyCode]=true;

        switch(true){

          case app.keys[KEYCODES.F1]:         toggleInfo();             break;    /* F1               */
          case app.keys[KEYCODES.F2]:         toggleTelemetry();        break;    /* F2               */
          case app.keys[KEYCODES.F3]:         toggleChoose();           break;    /* F3               */
          case app.keys[KEYCODES.F4]:         toggleSierpinski();       break;    /* F4               */
          case app.keys[KEYCODES.F5]:         reset();                  break;    /* F5               */
          case app.keys[KEYCODES.F6]:         toggleSigma();            break;    /* F6               */

          case app.keys[KEYCODES.PGUP]:       incrementRows();          break;    /* PGUP             */
          case app.keys[KEYCODES.PGDN]:       decrementRows();          break;    /* PGDN             */

          case app.keys[KEYCODES.a] &&
               app.keys[KEYCODES.CONTROL]:    app.pyramid.selectAll();  break;    /* a+ctrl           */

          case app.keys[KEYCODES.R] ||
               app.keys[KEYCODES.r]:          app.pyramid.reset();      break;    /* R or r           */

          case app.keys[KEYCODES.LEFT] ||
               app.keys[KEYCODES.A]:          left();                   break;    /* LEFT or A        */
          case app.keys[KEYCODES.RIGHT] ||
               app.keys[KEYCODES.D]:          right();                  break;    /* RIGHT or D       */

          case app.keys[KEYCODES.UP] &&
               app.keys[KEYCODES.CONTROL] ||
               app.keys[KEYCODES.W]:          upLeft();                 break;    /* Up or CTRL + W   */

          case app.keys[KEYCODES.UP] ||
               app.keys[KEYCODES.E]:          upRight();                break;    /* UP or E          */

          case app.keys[KEYCODES.DOWN] &&
               app.keys[KEYCODES.CONTROL] ||
               app.keys[KEYCODES.Z]:          downLeft();               break;    /* CTRL + DOWN or Z */
               
          case app.keys[KEYCODES.DOWN] ||
               app.keys[KEYCODES.X]:          downRight();              break;    /* DOWN or X        */

          case app.keys[KEYCODES.SPACE]:      setCell();                break;    /* SPACE            */

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

        case LEFT:    app.left=true;    break;
        case CENTER:  app.center=true;  break;
        case RIGHT:   app.right=true;   break;

        default:                        break;

      }

      forEach(app.controls,'pressed');

    };
    mouseReleased=function(){

      app.left=false;
      app.right=false;
      app.center=false;

    };
    mouseMoved=function(){

      app.mouseX=mouseX;
      app.mouseX=mouseY;

      // if(!app.autoRun){ execute(); }

      for(var c in app.controls){ app.controls[c].moved(0,0); }

    };
    mouseDragged=function(){

      switch(mouseButton){

        case LEFT:   forEach(app.controls,'dragged'); break;
        // case RIGHT:  for(var c in app.controls){ app.controls[c].rClicked(); } break;
        // case CENTER: for(var c in app.controls){ app.controls[c].cClicked(); } break;

        default:     break;
      }

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






































































// 1729 = 10^3+9^3 = 12^3+1^3
}};
