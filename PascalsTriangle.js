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
      oeis.org/A000217

    TO DO:

      - n k choose formulas option for each cell
      - interesting patterns - triangular #'s, etc.


    Research:


    TO DONE:

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
        textFont(createFont('monospace', 14));
        textFont(createFont('serif', 14));
        textFont(createFont('fantasy', 14));
        textFont(createFont('cursive', 14));

        println( typeof this.color );

*/

  var global=this;
  
  const MY_FAV = 7;
  println(MY_FAV);

  function application(){

    /* Initialize -------------------- */
    {

      frameRate(0);

      cursor(WAIT);
      strokeCap(SQUARE);

      // angleMode='degrees';

      size(700, 700); // set size of canvas

    }

    this.debug=true;          //  mode that displays enhanced debugging tools

    this.frameRate=0;        //  refresh speed

    this.mouseX=0;            //  current mouseX location
    this.mouseY=0;            //  current mouseY location

    this.left=false;          //  Is the left mouse button pressed
    this.right=false;         //  Is the right mouse button pressed
    this.center=false;        //  Is the center mouse button pressed

    this.focus=-1;            //  The ID of the control with focus

    this.controls=[];         //  collection of controls in the app
    this.keys=[];             //  Array holding the value of all keycodes

    this.info=false;          //  Is the info frame displayed
    this.telemetry=true;        //  Is the telemetry visible

    /* App Specific ------------------ */

    this.calculating=false;

    this.cursor=0;            //  position of the cursor in grid
    this.cells=0;             //  # of cells in the grid

    this.levels=5;

    this.levelsMax=16;
    this.levelsMin=5;

    this.row=0;
    this.col=0;

    this.path=[];             //  The final path of the pyramid

    this.pyramid;             //  Reference to the pyramid control
    this.currentCell;         //  Reference to the currently selected cell in the pyramid

    this.pascal=[];
    this.SierpinskiOn=false;

    this.text='';

  };

  var app=new application();

  /* Constants ================================================================= */
  {

    var KEYCODES={
      BACKSPACE:  8,
      TAB:        9,
      ENTER:      10,
      RETURN:     13,
      ESC:        27,
      DELETE:     127,
      CODED:      0xffff,
      SHIFT:      16,
      CONTROL:    17,
      ALT:        18,
      CAPSLK:     20,
      SPACE:      32,
      PGUP:       33,
      PGDN:       34,
      END:        35,
      HOME:       36,
      LEFT:       37,
      UP:         38,
      RIGHT:      39,
      DOWN:       40,
      F1:         112,
      F2:         113,  //  Rename
      F3:         114,
      F4:         115,
      F5:         116,
      F6:         117,
      stg:        118,  // F7: snap to grid
      ORTHO:      119,  // F8:
      F9:         120,
      F10:        121,
      F11:        122,
      F12:        123,
      NUMLK:      144,
      META:       157,
      INSERT:     155,
      Z:          90
    };
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
      TRIANGLE_L:     '◄'

    };
    var NAVIGATION={
      INCREMENT:      0,
      DECREMENT:      1,
      FIRST:          2,
      LAST:           3,
      DECREMENTPAGE:  4,
      INCREMENTPAGE:  5
    };

  }

  /* Data types ================================================================ */
  {

    function pt(row,col){
      this.row=row;
      this.col=col;
    };
    pt.prototype.toString=function(){ return this.row + ", " + this.col; }

    function pnt(x,y){
      this.x = x;
      this.y = y;
    };
    pnt.prototype.toString=function(){ return this.x +  ", " + this.y; }

  }

  /* Utility Functions ========================================================= */
  {

    /**  Thanks Peter */
    function forEach(arr, func, props){

      for(var c=0; c<arr.length; c++){

        arr[c][func](props);

      }

    };

    function isFocus(n){ return app.focus===n; }

    function getColor(clr, alpha){ return color(red(clr), green(clr), blue(clr), alpha/100*255); };

    function setCell()        {

      app.currentCell=app.pyramid.controls[app.row][app.col];
      app.currentCell.on=!app.currentCell.on;

    };

    function reset()          {

      app.calculating=false;
      app.path=[];
      app.cursor=0;
      app.row=0;
      app.col=0;

      app.pyramid.levels=app.levels;
      loadPascal();
      app.pyramid.reset();

// println(app.levels);

    };

    function getCalculate()   { return app.calculating;           };
    function gettelemetry()   { return app.telemetry;             };

    function toggleCalculate(){ app.calculating=!app.calculating; };
    function toggleTelemetry(){ app.telemetry=!app.telemetry;     };

    function getInfo()        { return app.info;                  };
    function toggleInfo()     { app.info=!app.info;               };

    function constrainCurrent(){

      app.row=(constrain)(app.row, 0, app.pyramid.controls.length-1);
      app.col=(constrain)(app.col, 0, app.pyramid.controls[app.row].length-1);

      app.currentCell=app.pyramid.controls[app.row][app.col];

    };

    function incrementRows()  {

      if(app.levels<app.levelsMax){

        app.levels++;

        app.levels=(constrain)(app.levels, app.levelsMin, app.levelsMax);

        reset();

      }

    };
    function decrementRows()  {

      if(app.levels>app.levelsMin){

        app.levels--;

        app.levels=(constrain)(app.levels, app.levelsMin, app.levelsMax);

        reset();

      }

    };
    function incrementRow()   {

      app.row++;

      constrainCurrent();

    };
    function decrementRow()   {

      app.row--;

      constrainCurrent();

    };
    function incrementCursor(){

      app.col++;
      constrainCurrent();

      app.cursor++;

      app.cursor=(constrain)(app.cursor, 0, app.cells-1);


    };
    function decrementCursor(){

      app.col--;
      constrainCurrent();

      app.cursor--;

      app.cursor=(constrain)(app.cursor, 0, app.cells-1);

    };

    function firstRecord()    { app.cursor=0;                     };
    function lastRecord()     { app.cursor=app.cells-1;           };

    function navCursor()      { return app.cursor+1;              };
    function navRecordCount() { return app.cells;                 };
    function navSetCursor(n)  {

      var setValue=round(n/app.cells*app.cells);

      if(setValue>=0 &&
         setValue<app.cells){
        app.cursor=(constrain)(setValue,0,app.cells-1);
      }

    };

    function inPath(row,col)  {

      for(var n=0; n<app.path.length; n++){

        if(app.path[n].row===row &&
           app.path[n].col===col){

          return true;
          break;

        }

      }

      return false;

    };
    function printPath()      {

      for(var n=0; n<app.path.length; n++){
        println(app.path[n].row + ', ' + app.path[n].col);
      }

    };

    
    function triangleArea(p1,p2,p3){

      var a=dist(p1.x, p1.y, p2.x, p2.y);
      var b=dist(p2.x, p2.y, p3.x, p3.y);
      var c=dist(p3.x, p3.y, p1.x, p1.y);

      var semi=(a+b+c)/2;

      var area=sqrt(semi*(semi-a)*(semi-b)*(semi-c));

      return area;

    };
    function triangleHit(p1,p2,p3){

      var retVal=false;

      var p=new pnt(mouseX,mouseY);

      var areaTotal=triangleArea(p1,p2,p3);

      var area1=triangleArea(p1, p2, p);
      var area2=triangleArea(p2, p3, p);
      var area3=triangleArea(p3, p1, p);

      var totals=area1+area2+area3;

      if(abs(areaTotal-totals)<1){ retVal=true; }

      return retVal;

    };
    function rectangleHit(p1,p2,p3){

      return (mouseX>p2.x &&
              mouseX<p1.x &&
              mouseY>p3.y &&
              mouseY<p1.y);
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

        this.font     = '';       /** default font */

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

            if(this.hit   ){ fill(this.acolor);  }
            if(this.active){cursor(this.cursor); }
            if(this.border){ strokeWeight(1);
                             stroke(CLRS.BLUE);  }

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
            textFont(this.font);

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
          {row:       -1,
           col:       -1,
           ordinal:   -1,
           integer:   3,
           font:      'monospace',
           total:     0,
           color:     CLRS.K_TEAL_1,
           cursor:    HAND,
           on:        true}));

        this.controls.push(new hexButton(530, this, this.w/2+35, 170, 75, 75,
          {row:       -1,
           col:       -1,
           ordinal:   -1,
           integer:   3,
           font:      'monospace',
           total:     0,
           color:     CLRS.K_TEAL_1,
           cursor:    HAND,
           on:        true}));

        this.controls.push(new hexButton(540, this, this.w/2, 230, 75, 75,
          {row:       -1,
           col:       -1,
           ordinal:   -1,
           integer:   6,
           font:      'monospace',
           total:     0,
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
              stroke(getColor(this.color, 40));
              fill(  getColor(this.color, 90));

              if(this.hit   ){ fill(getColor(this.color, 100)); }
              if(this.active){ cursor(this.cursor);             }

                rect(0, 0, this.w, this.h, 20);

              textFont(createFont(this.font, 16));
              textAlign(CENTER,BOTTOM);
              fill(getColor(CLRS.YELLOW,75));

                text("Pascal's Triangle", this.w/2, 30);

              var txt0="In mathematics, Pascal's triangle is a triangular array of the binomial coefficients.";
              var txt1="The first and last cell in each row contains 1 (one) and every other cell is sum of the two adjacent cells above.";
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
            fill(this.icolor);

            if(this.hit   ){ fill(this.acolor);   }
            if(this.active){ cursor(this.cursor); }

              rect(0, 0, this.w, this.h);

            stroke(getColor(CLRS.K_TEAL_0,25));
            strokeWeight(0.25);

              line(0, 0, this.w,      0); // Top Border

            // Caption
            fill(getColor(CLRS.BLACK, 50));

            if(this.hit){ fill(getColor(CLRS.K_TEAL_0,100)); }

            textFont(createFont(this.font, 16));
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
            fill(getColor(CLRS.BLACK,5));

            if(this.hit   ){ fill(this.acolor);   }
            if(this.active){ cursor(this.cursor); }

              rect(0, 0, this.w, this.h);

            // Caption
            fill(CLRS.K_TEAL_0);
            textFont(createFont(this.font, 16));
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

          if(p.hit){ fill(getColor(p.color, 75)); }
          else     { fill(getColor(p.color, 70)); }

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
                 'telemetry:     \n' +
                 'Calculating:\n' +
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
                 app.telemetry                 + '\n' +
                 app.calculating            + '\n' +
                 app.cursor                 + '\n' +
                 nf(global,0,2)         + '\n' +
                 app.infoOn,
                 col2, row0+15);

          var txt='Press the left and right arrow keys to increment and decrement integer.';

          textSize(11);
          textAlign(LEFT,BOTTOM);

            text(txt, p.offset+17, row0 + 480, p.w-20, 100);

        };

        this.active=this.hit && app.focus===this.id;
                
        pushMatrix();

          translate(this.x, this.y);

            if(this.active){ cursor(this.cursor); }

            if     ( app.telemetry && this.offset>-200){ this.offset-=10; }
            else if(!app.telemetry && this.offset<0   ){ this.offset+=10; }

            textFont(createFont(this.font, 16));

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

        this.levels = props.levels;
        this.size   = this.h/props.levels;
        this.font   = props.font;
        this.cursor = props.cursor;

        this.row    = 0;
        this.col    = 0;

        this.p0     = new pnt(this.w/2,      0);
        this.p1     = new pnt(  this.w, this.h);
        this.p2     = new pnt(       0, this.h);

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
          var top       = 70;

          /* Pascal buttons        */
          for(var y=0; y<this.levels; y++){

            for(var x=0; x<=y; x++){

              ID=y + ',' + x;

              xPos = x*colOffset*2-y*colOffset+this.w/2;
              yPos = y*rowOffset+w2+top;

              row.push(new hexButton(ID, this, xPos, yPos, this.size, this.size,
                {row:       y,
                 col:       x,
                 ordinal:   total,
                 integer:   app.pascal[y][x],
                 total:     0,
                 color:     CLRS.K_TEAL_1,
                 font:      props.font,
                 cursor:    HAND,
                 execute:   executePascal,
                 retrieve:  retrievePascal}));

              total++;

            }

            this.controls.push(row);
            row=[];

          }

          app.cells=total;

        };

        this.load();

      };
      pyramid.prototype=Object.create(control.prototype);
      pyramid.prototype.draw    = function(){

        this.active=this.hit && app.focus===this.id;

        pushMatrix();

          translate(this.x-0.5,this.y-0.5);

            noFill();
            noStroke();

            fill(getColor(CLRS.K_TEAL_0,15));
            textFont(createFont(this.font, 12));

// fill(getColor(CLRS.K_TEAL_0,10));
// ellipse(0,0,10,10);

            if(this.hit && this.active){

              fill(getColor(CLRS.K_TEAL_0,10));
              cursor(this.cursor);
              
              stroke(CLRS.GREEN);
              strokeWeight(0.25);

            }

              // rect(0, 0, this.w-1, this.h-1);
              triangle(this.p0.x, this.p0.y,
                       this.p1.x, this.p1.y,
                       this.p2.x, this.p2.y);

            for(var c=0; c<this.controls.length; c++){
              for(var r in this.controls[c]){

                this.controls[c][r].draw(this.x,this.y);

              }
            }

        popMatrix();

      };
      pyramid.prototype.reset   = function(){

        this.levels=app.levels;
        this.size=height/app.levels;

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
                         new pnt(this.p2.x+x, this.p2.y+y))){

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
            textFont(createFont(this.font, 16));

            if(this.active){

              fill(getColor(this.color, 5));
              strokeWeight(0.25);
              stroke(getColor(CLRS.K_TEAL_0, 50));
              
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
            fill(getColor(this.color, 50));
            if(this.hit){ fill(getColor(this.color, 100)); }

            noStroke();
            textAlign(CENTER,CENTER);
            textFont(createFont(this.font, 14));

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
            textFont(createFont(this.font, 16));

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

    // Reset ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      function resetButton(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.execute  = props.execute;
        this.retrieve = props.retrieve;
        this.color    = props.color;
        this.cursor   = props.cursor;
        this.font     = props.font;

      };
      resetButton.prototype=Object.create(control.prototype);
      resetButton.prototype.draw=function(){

        this.active=this.hit && app.focus===this.id;
        this.offset=0;
        
        pushMatrix();

          translate(this.x, this.y);
          textFont(createFont(this.font, 16));

            ellipseMode(CENTER);

            if(this.active){ cursor(this.cursor);
                             stroke(getColor(this.color, 75)); }
            else           { stroke(getColor(this.color, 50)); }

            strokeWeight(1.5);
            noFill();

            if(this.active &&
               app.left){ rotate(radians(45)); }

              arc(0, 0, this.w, this.h, radians(60), 2*PI-radians(22.5));

            if(app.left &&
               app.left){ fill(getColor(this.color, 75)); }
            else        { fill(getColor(this.color, 50)); }

              triangle( 5,  2,
                        2, -2,
                        8, -2);

        popMatrix();

      };
      resetButton.prototype.moved=function(x,y){
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
      /** Overridden for execute */
      resetButton.prototype.clicked=function(){ if(this.active){ this.execute(); } };

    }

    // Settings * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      function settings(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.execute  = props.execute;
        this.retrieve = props.retrieve;
        this.color    = props.color;
        this.cursor   = props.cursor;
        this.font     = props.font;

      };
      settings.prototype=Object.create(control.prototype);
      settings.prototype.draw=function(){

        this.active=this.hit && app.focus===this.id;
        this.offset=0;
        
        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            noFill();

            if(this.hit   ){ fill(getColor(this.color,10)); }
            if(this.active){ if(app.left){ this.offset=1; }
                             cursor(this.cursor);           }

            //  Background
              rect(this.offset, this.offset, this.w, this.h, 2);

            // Icon
            textFont(createFont(this.font, 16));
            fill(getColor(this.color,50));

            if(this.active){ fill(getColor(CLRS.BLACK,75)); }

            noStroke();

              ellipse(this.w/2+this.offset, this.h/2-6+this.offset, 3, 3);
              ellipse(this.w/2+this.offset, this.h/2,          3, 3);
              ellipse(this.w/2+this.offset, this.h/2+6+this.offset, 3, 3);

        popMatrix();

      };
      /** Overridden for execute */
      settings.prototype.clicked=function(){ if(this.active){ this.execute(); } };

    }

    // Info ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      function info(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.text     = props.text;
        this.execute  = props.execute;
        this.retrieve = props.retrieve;
        this.color    = props.color;
        this.cursor   = props.cursor;
        this.font     = props.font;

      };
      info.prototype=Object.create(control.prototype);
      info.prototype.draw=function(){

        this.active=this.hit && app.focus===this.id;
        this.offset=0;

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            noFill();

            if(this.hit   ){ fill(getColor(this.color,10)); }
            if(this.active){ if(app.left){ this.offset=1; }
                             cursor(this.cursor);           }

            //  Background
            rect(this.offset, this.offset, this.w, this.h, 2);

            // Icon
            fill(getColor(this.color,50));

            if(this.active){ fill(getColor(CLRS.BLACK,75)); }

            textAlign(CENTER,CENTER);
            textFont(createFont(this.font, 20));

              text(this.text, this.w/2+this.offset, this.h/2+this.offset);

        popMatrix();

      };
      /** Overridden for execute */
      info.prototype.clicked=function(){ if(this.hit){ this.execute(); } };

    }

    // Play ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {
      function play(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.text     = props.text;
        this.execute  = props.execute;
        this.retrieve = props.retrieve;
        this.color    = props.color;
        this.cursor   = props.cursor;
        this.font     = props.font;

      };
      play.prototype=Object.create(control.prototype);
      play.prototype.draw=function(){

        this.active=this.hit && app.focus===this.id;
        this.offset=0;

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            noFill();

            if(this.hit   ){ fill(getColor(this.color,10)); }
            if(this.active){ if(app.left){ this.offset=1; }
                             cursor(this.cursor);           }

            //  Background
            rect(this.offset, this.offset, this.w, this.h, 2);

            // Icon
            fill(getColor(this.color,50));

            if(this.active){ fill(getColor(CLRS.BLACK,75)); }
              
              var offset=this.offset;
              
              triangle( 15+offset, 10+offset,
                         5+offset,  5+offset,
                         5+offset, 15+offset);

        popMatrix();

      };
      play.prototype.clicked=function(){
      /** Overridden to maintain on/off value */

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

              textFont(createFont(this.font, 12));
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

        this.execute  = props.execute;
        this.retrieve = props.retrieve;
        this.color    = props.color;
        this.cursor   = props.cursor;

        this.font     = props.font;

        this.active   = false;
        this.on       = props.on;
        this.choose   = true;

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
      hexButton.prototype=Object.create(control.prototype);
      hexButton.prototype.draw=function(){
                
        var setTextSize=function(p){

          var sz=p.w/2.5;

          textSize(sz);
          textAlign(CENTER,CENTER);

          while(textWidth(p.integer)>(p.w-10)){
            textSize(sz--);
          }

          textSize(sz);

        };
          
          
          this.active=this.hit && app.focus===this.id;
          this.offset=0;
          
          pushMatrix();

            translate(this.x, this.y);
            scale(1,-1);

              // Border
              strokeWeight(0.5);

              stroke(getColor(this.color, 25));
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

              stroke(getColor(this.color,75));

              //  Sierpinski grid
              if(app.SierpinskiOn &&
                 this.integer%2!==0){ fill(getColor(this.color, 25)); }

              if(this.on){ fill(getColor(this.color, 30)); }
                
                var offset=this.offset;
                
                beginShape();

                  vertex(this.p1.x+offset, this.p1.y-offset);
                  vertex(this.p2.x+offset, this.p2.y-offset);
                  vertex(this.p3.x+offset, this.p3.y-offset);
                  vertex(this.p4.x+offset, this.p4.y-offset);
                  vertex(this.p5.x+offset, this.p5.y-offset);
                  vertex(this.p6.x+offset, this.p6.y-offset);

                endShape(CLOSE);

// var d=cos(PI/6)*this.w;
// ellipse(0,0,d,d);

              // Caption
              fill(getColor(this.color,50));

              if(this.on){
                fill(getColor(CLRS.WHITE,100));
              }

              scale(1,-1);

              textFont(createFont(this.font, 12));
              setTextSize(this);

              if(!this.choose){

                text(this.integer, this.offset, this.offset);

              }
              else{

                // textSize(12);

                textAlign(CENTER,BOTTOM);

                  text(this.row, this.offset, this.offset);

                textAlign(CENTER,TOP);

                  text(this.col, this.offset, this.offset);

              }

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
                                       new pnt(this.x+this.p6.x+x, this.y+this.p6.y+y));

              var triHit0=triangleHit(new pnt(this.x+this.p1.x+x, this.y+this.p1.y+y),
                                      new pnt(this.x+this.p2.x+x, this.y+this.p2.y+y),
                                      new pnt(this.x+this.p3.x+x, this.y+this.p3.y+y));

              var triHit1=triangleHit(new pnt(this.x+this.p4.x+x, this.y+this.p4.y+y),
                                      new pnt(this.x+this.p5.x+x, this.y+this.p5.y+y),
                                      new pnt(this.x+this.p6.x+x, this.y+this.p6.y+y));
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
      hexButton.prototype.set=function(){

        this.on=true;

      };

    }

  }

  function executePascal(n){
    println(n);
  };
  function retrievePascal(){
    println('retrieve pascal');
  };
  function updatePascal(){

    app.pyramid.reset();

  };

  /* Initialize ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  function initialize(){

    // Background --------------------------------------------------

      /* root control       */
      var rt=new root(100, null, 0, 0, width-1, height-1,
        {text:      'root',
         acolor:    CLRS.ACTIVE,
         icolor:    CLRS.INACTIVE,
         font:      'monospace',
         cursor:    ARROW,
         border:    true});

      app.controls.push(rt);

      /* pyramid */
      rt.controls.push(new pyramid(1234, rt, 0, 30, width, height-55,
        {font:      'sans-serif',
         levels:    app.levels,
         cursor:    WAIT,
         size:      0,}));
      
      /** Requires a reference to access globally */
      app.pyramid=rt.controls[0];
    
    // toolbar --------------------------------------------------
    {
      /* tlbar             */
      var tlbar=new toolbar(200, rt, 1, 1, width-2, 30,
        {text:      'Pascals Triangle',
         font:      'monospace',
         acolor:    CLRS.K_TEAL_3,
         icolor:    CLRS.ACTIVE,
         cursor:    ARROW});

      rt.controls.push(tlbar);

        /* play            */
        tlbar.controls.push(new play(210, tlbar, 5, 5, 20, 20,
          {execute:   toggleCalculate,
           retrieve:  getCalculate,
           font:      'monospace',
           color:     CLRS.K_TEAL_0,
           cursor:    HAND}));

        /* reset           */
        tlbar.controls.push(new resetButton(220, tlbar, 40, 15, 13, 13,
          {execute:   reset,
           retrieve:  getCalculate,
           font:      'monospace',
           color:     CLRS.K_TEAL_0,
           cursor:    HAND}));

        /* information     */
        tlbar.controls.push(new info(230, tlbar, width-52, 5, 22, 22,
          {text:      'i',
           font:      'monospace',
           execute:   toggleInfo,
           retrieve:  getInfo,
           color:     CLRS.K_TEAL_0,
           cursor:    HAND}));

        /* settings        */
        tlbar.controls.push(new settings(240, tlbar, width-25, 5, 22, 22,
          {execute:   toggleTelemetry,
           retrieve:  gettelemetry,
           font:      'monospace',
           color:     CLRS.K_TEAL_0,
           cursor:    HAND}));

    }

    
    // Navigation --------------------------------------------------
    {
      var h=25;

      /* Navbar            */
      var nvbar=new navbar(300, rt, 1, height-26, width-2, h,
        {text:        'Navigation',
         font:        'sans-serif',
         icolor:      CLRS.INACTIVE,
         acolor:      CLRS.K_TEAL_4,
         cursor:      ARROW,
         position:    navCursor,
         recordCount: navRecordCount,
         execute:     navSetCursor});

      rt.controls.push(nvbar);

        /* Decrement Page        */
        nvbar.controls.push(new navButton(310, nvbar, 0, 0, 50, h,
          {font:      'sans-serif',
           execute:   decrementRows,
           type:      NAVIGATION.DECREMENTPAGE,
           retrieve:  navCursor,
           color:     CLRS.BLACK,
           cursor:    HAND}));

        /* Increment Page       */
        nvbar.controls.push(new navButton(320, nvbar, width-50, 0, 50, h,
          {font:      'sans-serif',
           execute:   incrementRows,
           type:      NAVIGATION.INCREMENTPAGE,
           retrieve:  navCursor,
           color:     CLRS.BLACK,
           cursor:    HAND}));

        /* First Record         */
        nvbar.controls.push(new navButton(330, nvbar, 50, 0, 25, h,
          {font:      'sans-serif',
           execute:   firstRecord,
           type:      NAVIGATION.FIRST,
           retrieve:  navCursor,
           color:     CLRS.BLACK,
           cursor:    HAND}));

        /* Decrement Record     */
        nvbar.controls.push(new navButton(340, nvbar, 75, 0, 25, h,
          {font:      'sans-serif',
           execute:   decrementCursor,
           type:      NAVIGATION.DECREMENT,
           retrieve:  navCursor,
           color:     CLRS.BLACK,
           cursor:    HAND}));

        /* Increment Record     */
        nvbar.controls.push(new navButton(350, nvbar, width-100, 0, 25, h,
          {font:      'sans-serif',
           execute:   incrementCursor,
           type:      NAVIGATION.INCREMENT,
           retrieve:  navCursor,
           color:     CLRS.BLACK,
           cursor:    HAND}));

        /* Last Record          */
        nvbar.controls.push(new navButton(360, nvbar, width-75, 0, 25, h,
          {font:      'sans-serif',
           execute:   lastRecord,
           type:      NAVIGATION.LAST,
           retrieve:  navCursor,
           color:     CLRS.BLACK,
           cursor:    HAND}));

        /* Scroll               */
        nvbar.controls.push(new navScroll(370, nvbar, 100, 0, width-200, h,
          {font:      'sans-serif',
           execute:   navSetCursor,
           color:     CLRS.BLACK,
           cursor:    MOVE}));

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
      var splashScreen=new splash(500, rt, width/2-200, 100, 400, 400,
        {color:     CLRS.BLACK,
         font:      'monospace',
         retrieve:  getInfo,
         cursor:    CROSS});

        /* Close              */
        splashScreen.controls.push(new button(510, splashScreen, 180, 360, 120, 20,
          {text:      'Close',
           font:      'monospace',
           execute:   toggleInfo,
           color:     CLRS.WHITE,
           cursor:    HAND}));    

      rt.controls.push(splashScreen);
           
    }


    // Telemetry --------------------------------------------------

      /* Telemetry          */
      var telem=new telemetry(400, rt, width, 30, 200, height-55,
        {color:     CLRS.BLACK,
         font:      'sans-serif',
         cursor:    ARROW});

      rt.controls.push(telem);

  };

  function currentData(){

    //  Data cursor
    fill(getColor(CLRS.K_TEAL_0,100));
    textAlign(LEFT,TOP);
    textSize(20);

      text((nfc)(app.data[app.cursor].i), 20, 40);

    fill(getColor(CLRS.BLACK,100));
    textAlign(LEFT,TOP);
    textSize(12);
    textLeading(16);

      text('Max:     \n' +
           'Sum:     \n' +
           'Length:',
           20, 70);

      text(CONSTANTS.TRIANGLE_UP +'\n' +
           CONSTANTS.TRIANGLE_DOWN + '',
           170, 70);

    textAlign(RIGHT,TOP);

    fill(getColor(CLRS.K_TEAL_2,100));

      text((nfc)(app.data[app.cursor].max)        + '\n' +
           (nfc)(app.data[app.cursor].sum)        + '\n' +
           (nfc)((app.data[app.cursor].length-1)),
           140, 70);

       text((nfc)(app.data[app.cursor].up)         + '\n' +
            (nfc)(app.data[app.cursor].down),
            210, 70);


  };
  function dataSummary(){

    fill(getColor(CLRS.K_TEAL_0,100));
    textSize(16);
    textAlign(LEFT,TOP);

      text('Range:', 290, 45);

    textSize(12);
    textLeading(16);
    fill(getColor(CLRS.BLACK,75));

      text('Max Peak: \n' +
           'Max Sum:  \n' +
           'Longest Path:',
           300, 70);

    fill(getColor(CLRS.ORANGE,75));
    noStroke();

      rect(291,70,6,12);

    fill(getColor(CLRS.GREEN,75));

      rect(291,86,6,12);

    fill(getColor(CLRS.BLUE,75));

      rect(291,102,6,12);

    fill(getColor(CLRS.K_TEAL_2,100));
    textAlign(LEFT,TOP);
    textSize(16);

      text((nfc)(app.data[0].i) + ' - ' +
           (nfc)(app.data[app.cells-1].i) + '\n\n',
           400, 45);

    fill(getColor(CLRS.K_TEAL_0,50));
    textAlign(LEFT,TOP);
    textSize(12);

      text((nfc)(app.data[app.dHighest].i) +'\n' +
           (nfc)(app.data[app.dSum].i) + '\n' +
           (nfc)(app.data[app.dLongest].i),
           400, 70);

    fill(getColor(CLRS.K_TEAL_2,75));
    textAlign(RIGHT,TOP);

      text((nfc)(app.data[app.dHighest].max) + '\n' +
           (nfc)(app.data[app.dSum].sum) + '\n' +
           (nfc)(app.data[app.dLongest].length-1),
           540, 70);

  };
  function drawPath(){

    var path='';

    for(var n=0; n<app.data[app.cursor].path.length; n++){

      path+=app.data[app.cursor].path[n];

      if(n!==app.data[app.cursor].path.length-1){
        path+= ', ';
      }

    }

    textAlign(LEFT,TOP);
    fill(getColor(CLRS.GRAY,50));

      text(path, 30, 140, width-50, 10000);

  };

  function ArrayToText(arr){

    var txt='';

    for(var n=0; n<arr.length; n++){

      txt=txt+arr[n] + ' | ';

    }

    return(txt);

  };

  function ArrayToText2D(arr){

    var txt='';

    for(var row=0; row<arr.length; row++){

      txt+=arr[row]+'\n';
      // println(arr[row]);
      // for(var col=0; col<arr[row].length; col++){

        // println(arr[row][col]);

      // }

    }
app.text=txt;
    return txt;

  };

  function loadPascal(){

    app.pascal=[];

    var cols=[1];

    for(var row=0; row<app.levels; row++){

      for(var col=0; col<row; col++){

        cols.push(cols[col]*(row-col)/(col+1));

      }

      app.pascal.push(cols);
      cols=[1];

    }

  };

  loadPascal();

  // println(ArrayToText2D(app.pascal));
// textFont(createFont('monospace', 16));
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

  draw=function(){

    execute();

    global=this.__frameRate;

  };

  /* Keyboard Events =========================================================== */
  {

    keyPressed=function(){

      app.keys[keyCode]=true;

      // if(app.autoRun===false){

        switch(true){

          case app.keys[KEYCODES.F1]:       toggleInfo();       break;
          case app.keys[KEYCODES.F2]:       toggleTelemetry();  break;
          case app.keys[KEYCODES.F5]:       reset();            break;
          case app.keys[KEYCODES.F6]:       toggleCalculate();  break;

          case app.keys[KEYCODES.PGUP]:     incrementRows();    break;
          case app.keys[KEYCODES.PGDN]:     decrementRows();    break;

          case app.keys[KEYCODES.LEFT] &&
               app.keys[KEYCODES.CONTROL]:  firstRecord();      break;
          case app.keys[KEYCODES.RIGHT] &&
               app.keys[KEYCODES.CONTROL]:  lastRecord();       break;

          case app.keys[KEYCODES.LEFT]:     decrementCursor();  break;
          case app.keys[KEYCODES.RIGHT]:    incrementCursor();  break;

          case app.keys[KEYCODES.UP]:       decrementRow();     break;
          case app.keys[KEYCODES.DOWN]:     incrementRow();     break;

          case app.keys[KEYCODES.SPACE]:    setCell();          break;

          default:                                              break;

        }

      // }

    };
    keyTyped=function(){
      /* println('typed ' + (key) + ' ' + keyCode); */
    };
    keyReleased=function(){

      app.keys[keyCode]=false;

    };

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
