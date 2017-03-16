/*  TBD

    TO DO:
        
        - optimize graph display (ellipses vs curves...)

        - tidy up controls to accomodate arbitrary positions

        - differentiate left/right/center mouse clicks

        - page focus on mouseOver possible?????

        - tooltips?
        
      Implemented but ***** NEEDS WORK *****
        
        - graph large cross hair cursor 

        - update on mouseMove

    Research:

        - question list
        - Addition and subtraction trig identities
        - Law of cosines
        - Pythagorean identities        

    TO DONE:

        - add focus cursor to control params
    
        - create checkbox object for graph features, etc.
        
        - create props object that contains arbitrary number of named props

        - defocus all controls after parent has lost focus
        - cursor remains after leaving control boundary
        
        - nest controls

        - fix boundary conditions on all trig ratios above 2 and below -2        
        - create toolbar object
        - onOff control
        - fix cursor/theta correlation        
        - create a container object
        - legend button
        - disable arrows while autoRun is on

        - ***** Find out how to handle Infinity and -Infinity *****
                  Asymtotes
                    - Tangent
                    - Cotangent
                    - Cosecant
                    - Secant

        - convert to new menus
        - control theta from within the unit circle
        - convert menu hit to dist()
        - Unit circle on/off (glide)
        - right/left arrows to increment/decrement theta +-=1
        - index on/off (glide)
        - handle single control clicks
        - Z-Order for controls
        - keyboard controls

    Decided Against:

        - set theta by clicking the scale

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

*/

var diagrams = function(processingInstance){
  with (processingInstance){

  var application=function(){

    this.debug=true;          //  mode that displays enhanced debugging tools

    this.frameRate=10;        //  refresh speed

    this.mouseX=0;            //  current mouseX location
    this.mouseY=0;            //  current mouseY location

    this.left=false;          //  Is the left mouse button pressed
    this.right=false;         //  Is the right mouse button pressed
    this.center=false;        //  Is the center mouse button pressed

    this.controls=[];         //  collection of controls in the app

    this.focus=0;             //  The ID of the control with focus
    
    /* App Specific */
    this.data=[];             //  Values of each trig function from 0 (zero) to 360
          
    this.legend=false;        //  Is the legend displayed
    this.index=true;          //  Is the Index displayed
    this.unitCircle=true;     //  Is the unit circle displayed
    this.quadrants=true;      //  Display the quadrants

    this.autoRun=true;        //  Alpha changes automatically

    this.theta=0;             //   Current angle

    this.MIN=0;
    this.MAX=360;

    this.sinOn=true;          //  Display the sine curve
    this.cosOn=true;          //  Display the cosine curve
    this.tanOn=true;          //  Display the tangent curve

    this.cscOn=true;          //  Display the cosecant curve
    this.secOn=true;          //  Display the secant curve
    this.cotOn=true;          //  Display the cotangent curve

    this.initialize=function(){

      frameRate(30);
    
      cursor(WAIT);

      angleMode="radians";

      this.loadData();

      size(600, 600); // set size of canvas

    };
    this.loadData=function(){

        var sinN, cosN, tanN, secN, cscN, cotN;

        for (var n=this.MIN; n<=this.MAX; n++){

            sinN=sin(radians(n)).toFixed(4);
            cscN=(1/sinN).toFixed(4);
            cosN=cos(radians(n)).toFixed(4);
            secN=(1/cosN).toFixed(4);
            tanN=tan(radians(n)).toFixed(4);
            cotN=(1/tanN).toFixed(4);;

            this.data.push({  sin:  sinN, csc:  cscN,
                              cos:  cosN, sec:  secN,
                              tan:  tanN, cot:  cotN });
        }

    };

  };

  var app=new application();

  app.initialize();

  /* Constants ======================================================= */
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

      ACTIVE:       color( 28,117,138,255),
    
      CYAN:         color( 49,204,167,255),
    
      TEAL_0:       color( 28,117,138,255), TEAL_0_LT:    color( 28,117,138,128),
      TEAL_1:       color( 41,171,202,255), TEAL_1_LT:    color( 41,171,202,128),
      TEAL_2:       color( 88,196,221,255), TEAL_2_LT:    color( 88,196,221,128),
      TEAL_2:       color(156,220,235,255), TEAL_2_LT:    color(156,220,235,128),

      TRANSPARENT:  color(-1,-1,-1),

      RED:          color(170, 29, 29),     GREEN:        color(158,182, 58),
      BLUE:         color( 29, 86,170),     YELLOW:       color(238,214, 15),
      ORANGE:       color(238,136, 15),     GRAY:         color(128,128,128),

      BROWN:        color(155,145,135),

      control:      color(128,128,128),     controlF:     color(242,242,242),

      TEXT:         color(255,255,255),

      Red:          color(255,  0,  0),     RedOrange:    color(255, 81,  0),
      Orange:       color(255,127,  0),     YellowOrange: color(255,190,  0),
      Yellow:       color(255,255,  0),

      YellowGreen:  color(192,255,  0),
      Green:        color(  0,255,  0),     BlueGreen:    color(  0,127,127),
      Blue:         color(  0,  0,255),     BlueViolet:   color( 92,  0,255),

      Violet:       color(127,  0,255),     RedViolet:    color(191,  0,127),

      GRAY1:        color(255*10/11),       GRAY2:        color(255*9/11),
      GRAY3:        color(255*8/11),        GRAY4:        color(255*7/11),
      GRAY5:        color(255*6/11),        GRAY6:        color(255*5/11),
      GRAY7:        color(255*4/11),        GRAY8:        color(255*3/11),
      GRAY9:        color(255*2/11),        GRAY10:       color(255*1/11),
      WHITE:        color(255,255,255),     BLACK:        color(0,0,0),

      BUTTONH:      color( 16, 16, 16),     BUTTON:       color( 24, 24, 24),

      GRID:         color( 33, 40, 48),

      VERTEX:       color(255,255,  0),
      VERTEXA:      color(255*6/11),
      LINE:         color(255*6/11),
      LINEA:        color(170,29,29),
      FILL:         color(255*7/11),
      FILLA:        color(255*7/11),

      RULER:        color(231,189, 33),

      SELECTED:     color(  0,  0,255),
      HIT:          color(255,  0,  0),

      ARROWS:       color( 32, 32, 32),
      AXES:         color( 64, 64, 64),
      TICKS_LT:     color(128,128,128),     TICKS_DARK:       color( 32, 32, 32),
      GRID_LINES_LT:color(192,192,192),     GRID_LINES_DARK:  color(128,128,128),
      LABELS:       color(128,128,128),
      ORIGIN:       color(128,128,128),

      BORDER:       color(128,  0,  0),

      SIN:          color(170, 29, 29,255), SIN_LT:       color(170, 29, 29,128),
      COS:          color( 29, 86,170,255), COS_LT:       color( 29, 86,170,128),
      TAN:          color(158,182, 58,255), TAN_LT:       color(158,182,58,192),

      CSC:          color(238,136, 15,255), CSC_LT:       color(238,136, 15,128),
      SEC:          color(158,182, 58,255), SEC_LT:       color(158,182, 58,128),
      COT:          color(128,128,128,255), COT_LT:       color(128,128,128,128)

    };
    var COMMANDS={

      right:  80,
      left:   72,
      sin:    84,
      cos:    70,
      tan:    83,
      csc:    38,
      sec:    40,
      cot:    39,
      ctrl:   17

    };
    var QUADRANTS={
      NONE:   0,
      ONE:    1,
      TWO:    2,
      THREE:  3,
      FOUR:   4
    }
    var CONSTANTS={

      DEGREES:  "°",
      PI:       "π",
      UP_ARROW: "▲",
      INFINITY: "∞",
      THETA:    "θ"

    }
    var TRIG_INDEX={
      SIN:  0,
      CSC:  1,
      COS:  2,
      SEC:  3,
      TAN:  4,
      COT:  5
    };

  }
  
  // Helper Functions =========================================================
  {
    
    var getColor=function(clr, alpha){ return color(red(clr), green(clr), blue(clr), alpha/100*255); };

    var increment=function(){

      app.theta++;

      if(app.theta>360){ app.theta=0; }

    };
    var decrement=function(){

      app.theta--;

      if(app.theta<0){ app.theta=360; }

    };
    
    var getSine=function()     { return app.data[app.theta].sin; };
    var getCosine=function()   { return app.data[app.theta].cos; };
    var getTangent=function()  { return app.data[app.theta].tan; };
    var getCosecant=function() { return app.data[app.theta].csc; };
    var getSecant=function()   { return app.data[app.theta].sec; };
    var getCotangent=function(){ return app.data[app.theta].cot; };

    var getAuto=function()     { return app.autoRun;  };
    var getLegend=function()   { return app.legend;   };

    var getSineOn=function()     { return app.sinOn; };
    var getCosineOn=function()   { return app.cosOn; };
    var getTangentOn=function()  { return app.tanOn; };
    var getCosecantOn=function() { return app.cscOn; };
    var getSecantOn=function()   { return app.secOn; };
    var getCotangentOn=function(){ return app.cotOn; };
    
    var toggleSin=function(){ app.sinOn=!app.sinOn; };
    var toggleCos=function(){ app.cosOn=!app.cosOn; };
    var toggleTan=function(){ app.tanOn=!app.tanOn; };
    var toggleCsc=function(){ app.cscOn=!app.cscOn; };
    var toggleSec=function(){ app.secOn=!app.secOn; };
    var toggleCot=function(){ app.cotOn=!app.cotOn; };

    var checkboxAuto=function()  { 

      app.autoRun=!app.autoRun;

      // if(app.autoRun){ loop();   }
      // else           { noLoop(); }

    };
    var checkboxLegend=function(){ app.legend=!app.legend;   };

    var drawOrigin=function(){

      fill(CLRS.RED);
      noStroke();

      ellipse(0,0,20,20);

    };

  }
  
  /* Controls ========================================================= */

  // Control ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    
    var control=function(id, parent, x, y, w, h){

      // explicit properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      this.id=id;                 /* Unique identification number -- Change to GUID for production) */
      
      this.parent=parent;         /* parent control (acts as a container) */
      
      this.x=x;                   /* left */
      this.y=y;                   /* top */
      this.w=w;                   /* width */
      this.h=h;                   /* height */

      // inherent properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      this.controls=[];           /* array of child controls */

      this.on=false;              /* Is the control on or off */

      // this.value=0;               /* generic property */
      // this.zOrder=0;              /* z-order - in front or behind value */

      this.hit=false;             /* mouse is over the control */
      // this.visible=true;          /* is the control currently being displayed */
      

    };
    control.prototype.draw=function(){

      // for(var c in this.controls){ this.controls[c].draw(); }

    };
    control.prototype.clicked=function(){

      if(this.hit){

        for(var c in this.controls){ this.controls[c].clicked(); }

      }

    };
    control.prototype.clickedR=function(){
      // if(this.hit){
        // for(var c in this.controls){ this.controls[c].clickedR(); }
      // }
    };
    control.prototype.moved=function(x,y){

      if(mouseX>(this.x+x) &&
         mouseX<(this.x+x) + this.w &&
         mouseY>(this.y+y) &&
         mouseY<(this.y+y) + this.h){

        this.hit=true;

        for(var c in this.controls){ this.controls[c].moved((this.x+x), (this.y+y)); }

      }
      else{

        this.hit=false;

      }

    };
    control.prototype.dragged=function(){

      // for(var c in this.controls){ this.controls[c].dragged(); }

    };
    control.prototype.pressed=function(){

      // for(var c in this.controls){ this.controls[c].pressed(); }

    };
    control.prototype.released=function(){

      // for(var c in this.controls){ this.controls[c].released(); }

    };
    control.prototype.typed=function(){

      // for(var c in this.controls){ this.controls[c].typed(); }

    };
    control.prototype.over=function(){

      // for(var c in this.controls){ this.controls[c].over(); }

    };
    control.prototype.out=function(){

      // this.hit=false;
      // app.focus=-1;
      // for(var c in this.controls){ this.controls[c].out(); }

    };

  }

  // root ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    /* Identical to a container control except is doesn't have a parent */
    var root=function(id, parent, x, y, w, h, params){

      control.call(this, id, parent, x, y, w, h);

      this.text=params.text;
      this.color=params.color;
      this.left=0;
      this.cursor=params.cursor;
      
    };
    root.prototype=Object.create(control.prototype);
    root.prototype.draw=function(){

      pushMatrix();

        translate(this.x, this.y);

          noStroke();
          strokeWeight(1);
          fill(getColor(this.color, 5));

          if(this.hit){

            app.focus=this.id;
            cursor(this.cursor);

            fill(getColor(this.color, 10));

          }

          if(this.txt="Border"){ stroke(getColor(this.color, 50)); }

          rect(0, 0, this.w, this.h, this.execute);

          // Draw child controls
          for(var c in this.controls){ this.controls[c].draw(); }
                  
      popMatrix();

    };
    // root.prototype.moved=function(x,y){
      
      // if(mouseX>(this.x+x) &&
         // mouseX<(this.x+x) + this.w &&
         // mouseY>(this.y+y) &&
         // mouseY<(this.y+y) + this.h){

        // this.hit=true;

        // for(var c in this.controls){ this.controls[c].moved(this.x+x, this.y+y); }

      // }
      // else{
   
        // this.hit=false;

      // }
      
    // };
    // root.prototype.clicked=function(){

      // if(this.hit){

        // for(var c in this.controls){ this.controls[c].clicked(); }

      // }
      
    // };
    
  }


  // Container ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {

    var container=function(id, parent, x, y, w, h, params){

      control.call(this, id, parent, x, y, w, h);

      this.text=params.text;
      this.color=params.color;
      this.cursor=params.cursor;
      
    };
    container.prototype=Object.create(control.prototype);
    container.prototype.draw=function(){

      pushMatrix();

        translate(this.x, this.y);

          noStroke();
          strokeWeight(1);
          fill(getColor(this.color, 5));

          if(this.hit && 
             this.parent.hit){

            app.focus=this.id;
            cursor(this.cursor);

            fill(getColor(this.color, 10));

          }

          if(this.txt="Border"){ stroke(getColor(this.color, 50)); }

          rect(0, 0, this.w, this.h, this.execute);

          // Draw child controls
          for(var c in this.controls){ this.controls[c].draw(); }
                  
      popMatrix();

    };
    
  }

  // Index ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {

    var index=function(id, parent, x, y, w, h, params){

      control.call(this, id, parent, x, y, w, h);

      this.radius=params.radius;
      this.color=params.color;
      this.cursor=params.cursor;

    };
    index.prototype=Object.create(control.prototype);
    index.prototype.draw=function(){

      pushMatrix();

        translate(this.x, this.y);

          strokeWeight(1);
          stroke(getColor(CLRS.BLACK, 20));
          fill(getColor(this.color, 50));

          if(this.hit &&
             this.parent.hit){

            app.focus=this.id;
            cursor(this.cursor);

            stroke(getColor(CLRS.BLACK, 40));
            fill(getColor(this.color, 75));

          }

          rect(0, 0, this.w, this.h, this.radius);

          // Draw child controls          
          for(var c in this.controls){ this.controls[c].draw(); }
    
      popMatrix();

    };
    
  }

  // Toolbar ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {

    var toolbar=function(id, parent, x, y, w, h, params){

      control.call(this, id, parent, x, y, w, h);

      this.text=params.text;
      this.color=params.color;
      this.cursor=params.cursor;

    };
    toolbar.prototype=Object.create(control.prototype);
    toolbar.prototype.draw=function(){

      pushMatrix();

        translate(this.x, this.y);

          noStroke();
          strokeWeight(1);
          fill(getColor(this.color, 100));

          if(this.hit &&
             this.parent.hit){

            app.focus=this.id;
            cursor(this.cursor);

            fill(getColor(this.color, 75));

          }

          rect(0, 0, this.w, this.h, this.execute);
          
          fill(CLRS.WHITE);
          textSize(16);
          textAlign(CENTER,CENTER);

          text(this.text, this.w/2, this.h/2);

          // Draw child controls
          for(var c in this.controls){ this.controls[c].draw(); }
          
      popMatrix();

    };

  }
  
  // Legend ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
  
    var legend=function(id, parent, x, y, w, h, params){

      control.call(this, id, parent, x, y, w, h);

      this.color=params.color;
      this.cursor=params.cursor;

      this.offset=0;      /*  Dynamic x-coordinate */

    };
    legend.prototype=Object.create(control.prototype);
    legend.prototype.draw=function(){

      var p=this;
            
      // Border
      var border=function(){
       
        strokeWeight(1);

        if(p.hit){ fill(getColor(p.clr, 75)); }
        else     { fill(getColor(p.clr, 70)); }

        stroke(getColor(p.clr,100));

        rect(p.offset, 0, p.w, p.h);

      }
      //  Properties
      var properties=function(){

        var h=13;

        var row0=30;
        
        var col0=p.offset+20;
        var col1=p.offset+30;
        var col2=p.offset+130;

        if     ( app.legend && p.offset>-200){ p.offset-=10; }
        else if(!app.legend && p.offset<0   ){ p.offset+=10; }

        if(this.hit){ fill(getColor(CLRS.WHITE,80)); }
        else        { fill(getColor(CLRS.WHITE,60)); }

        /* Title ------------------------- */
        textAlign(CENTER,CENTER);
        textSize(12);
        fill(CLRS.WHITE);
        
          text("Debug Telemetry",     p.w/2+p.offset, 20);

        /* Mouse Coordinates ------------------------- */
        textSize(10);

        fill(getColor(CLRS.TEAL_2,75));
        textAlign(LEFT,CENTER);

          text("Mouse Coordinates", col1, row0+15); 

        fill(getColor(CLRS.WHITE,75));
        
          text("x: ",           col1, row0+30);
          text("y: ",           col1, row0+45);

        fill(getColor(CLRS.YELLOW,75));
        textAlign(RIGHT,CENTER);

          text(mouseX,          col2, row0+30);
          text(mouseY,          col2, row0+45);

        /* Mouse Buttons ------------------------- */
        
        textAlign(LEFT, CENTER);
        fill(getColor(CLRS.TEAL_2,75));
        
          text("Mouse Buttons",           col1, row0+75);

        fill(getColor(CLRS.WHITE,75));
        textAlign(LEFT,CENTER);
        
          text("Left:",         col1, row0+90);
          text("Right:",        col1, row0+105);
          text("Center:",       col1, row0+120);

        fill(getColor(CLRS.YELLOW,75));
        textAlign(RIGHT,CENTER);

          text(app.left,        col2, row0+90);
          text(app.right,       col2, row0+105);
          text(app.center,      col2, row0+120);
        
        /* Focus ------------------------- */

        textAlign(LEFT, CENTER);
        fill(getColor(CLRS.TEAL_2,75));
        
          text("Controls",           col1, row0+150);
        
        fill(getColor(CLRS.WHITE,75));
        
          text("Focus:",        col1, row0+165);
          text("Focused:",      col1, row0+180);                

        fill(getColor(CLRS.YELLOW,75));
        textAlign(RIGHT,CENTER);

        /* app.focus is required to be done after control update in main draw sub */
        text(focused,         col2, row0+180);                

        /* App Specific ------------------------- */
        textAlign(LEFT, CENTER);
        fill(getColor(CLRS.TEAL_2,75));
        
          text("App", col1, row0+210);

        fill(getColor(CLRS.WHITE,75));
        
          text("Legend:",                      col1, row0+225);
          text("autoRun:",                     col1, row0+240);
          text("Theta ("+CONSTANTS.THETA+"):", col1, row0+255);

        fill(getColor(CLRS.YELLOW,75));
        textAlign(RIGHT, CENTER);
        
          text(app.legend,      col2, row0+225);
          text(app.autoRun,     col2, row0+240);
          text(app.theta,       col2, row0+255);

        var txt="Press the left and right arrow keys to increment and decrement theta.";

        textAlign(LEFT,BOTTOM);

        text(txt, col0, row0 + 500, p.w-30, 100);
        
      };
      
      pushMatrix();

        translate(this.x, this.y);

          if(this.hit &&
             this.parent.hit){
            
            app.focus=this.id;
            cursor(this.cursor);

          }

          if     ( app.legend && this.offset>-200){ this.offset-=10; }
          else if(!app.legend && this.offset<0   ){ this.offset+=10; }

          border();
          properties();

          // Draw child controls
          for(var c in this.controls){ this.controls[c].draw(); }

          /* The following is outside the properties function because it has
             to be done after the child controls are drawn to
             determine which control has the focus                  */
          fill(getColor(CLRS.YELLOW,75));
          textSize(11);
          textAlign(RIGHT,CENTER);

          text(app.focus, this.offset+130, 195);
          
      popMatrix();

    };
    legend.prototype.moved=function(x,y){
      
      /* Over ridden because of the dynamic x-coordinate offset */
      if(mouseX>this.x+x+this.offset &&
         mouseX<this.x+x+this.offset + this.w &&
         mouseY>this.y+y &&
         mouseY<this.y+y + this.h){

        this.hit=true;

        for(var c in this.controls){ this.controls[c].moved(this.x+x+this.offset, this.y+y); }

      }
      else{

        this.hit=false;

      }
      
    };

  }

  // OnOff * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {

    var onOff=function(id, parent, x, y, w, h, params){

      control.call(this, id, parent, x, y, w, h);

      this.execute=params.execute;
      this.retrieve=params.retrieve;
      this.color=params.color;
      this.cursor=params.cursor;

    };
    onOff.prototype=Object.create(control.prototype);
    onOff.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

          ellipseMode(CENTER);

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              stroke(getColor(this.color, 75));

            }
            else{

              stroke(getColor(this.color, 50));

            }

            if(this.on){ rotate(-PI/2); }
            else       { this.value=0;  }

            strokeWeight(2);
            noFill();

            arc(0, 0, this.w, this.h, -PI/4, 3*PI/2-PI/4);

            line(0, 1, 0, -9);

        popMatrix();

    };
    onOff.prototype.moved=function(x,y){

      if(dist(mouseX, mouseY,
              this.x+x, this.y+y)<this.w){
        
        this.hit=true;
        
        // for(var c in this.controls){ this.controls[c].moved(this.x+x, this.y+y); }
        
      }
      else{
        
        this.hit=false;
        
      }

    };
    onOff.prototype.clicked=function(){
      
      /* Over ridden to maintain on/off value */
      if(this.hit){
        this.execute();
        this.on=!this.on;
      }

    };

  }

  // Settings * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {

    var settings=function(id, parent, x, y, w, h, params){

      control.call(this, id, parent, x, y, w, h);

      this.execute=params.execute;
      this.retrieve=params.retrieve;
      this.color=params.color;
      this.cursor=params.cursor;

    };
    settings.prototype=Object.create(control.prototype);
    settings.prototype.draw=function(){

      var offset=0;
      
      pushMatrix();

        translate(this.x, this.y);

          noStroke();
          noFill();

          if(this.hit &&
             this.parent.hit){
            
            if(app.left){ offset=1; }

            app.focus=this.id;
            cursor(this.cursor);

            fill(getColor(this.color,10));

          }

          rect(offset, offset, this.w, this.h, 2, 2);

          fill(getColor(this.color, 65));
          noStroke();

          ellipse(this.w/2+offset, this.h/2-6+offset, 3, 3);
          ellipse(this.w/2+offset, this.h/2,          3, 3);
          ellipse(this.w/2+offset, this.h/2+6+offset, 3, 3);

      popMatrix();

    }; 
    settings.prototype.clicked=function(){

      /* Over ridden to maintain on/off value */
      if(this.hit){
        
        this.execute();
        this.on=!this.on;
        
        for(var c in this.controls){ this.controls[c].clicked(); }
        
      }

    };

  }

  // Button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {

    var button=function(id, parent, x, y, w, h, params){

      control.call(this, id, parent, x, y, w, h);

      this.execute=params.execute;
      this.retrieve=params.retrieve;
      this.tag=params.tag;
      this.text=params.text;
      this.color=params.color;
      this.cursor=params.cursor;

    };
    button.prototype=Object.create(control.prototype);
    button.prototype.draw=function(){
        
        var offset=0;
        
        pushMatrix();

          translate(this.x, this.y);
          scale(1,-1);

            // Border
            strokeWeight(0.75);

            if(this.hit &&
               this.parent.hit){

              if(app.left){ offset=1; }

              app.focus=this.id;
              cursor(this.cursor);

              fill(getColor(this.parent.color,25));
              if(this.on){ stroke(this.clr);              }
              else       { stroke(getColor(this.color,50)); }

            }
            else{

              fill(getColor(CLRS.ACTIVE, 5));
              noFill();
              noStroke();

            }

            rect(offset, -this.h-offset, this.w, this.h, 3, 3);

            // Caption
            if(this.retrieve()){ fill(this.color);              }
            else               { fill(getColor(this.color,50)); }

            scale(1,-1);

            textAlign(LEFT,CENTER);

            textSize(12);
            text(this.text, 10+offset, this.h/2+offset);

            textAlign(RIGHT,CENTER);

            var txt=this.tag();

            if(!(txt==null)){

              if      (txt> 100){ text( "Infinity", this.w-10+offset, this.h/2+offset); }
              else if (txt<-100){ text("-Infinity", this.w-10+offset, this.h/2+offset); }
              else              { text( txt,        this.w-10+offset, this.h/2+offset); }

            }

        popMatrix();

    };      
    button.prototype.clicked=function(){

      /* Over ridden to maintain on/off value */
      if(this.hit){
        
        this.execute();
        this.on=!this.on;
        
        for(var c in this.controls){ this.controls[c].clicked(); }
                
      }

    };

  }
  
  // Checkbox ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {

    var checkbox=function(id, parent, x, y, w, h, params){

      control.call(this, id, parent, x, y, w, h);

      this.cursor=params.cursor;

      this.text=params.text;
      this.execute=params.execute;
      this.retrieve=params.retrieve;
      this.color=params.color;
      this.cursor=params.cursor;

    };
    checkbox.prototype=Object.create(control.prototype);
    checkbox.prototype.draw=function(){

      pushMatrix();

        translate(this.x + this.parent.offset, this.y);

          this.on=this.retrieve();

          stroke(CLRS.BLACK);
          strokeWeight(1);
          fill(getColor(CLRS.WHITE, 10));

          if(this.hit &&
             this.parent.hit){

            cursor(this.cursor);
            app.focus=this.id;

            fill(getColor(this.color, 15));

          }

          //  Determine how wide the text is
          textSize(11);
          textAlign(LEFT,CENTER);

          this.w=40+textWidth(this.text);  /*  Add 40 pixels to accommodate the slider */

          //  Control border
          if(app.debug){
             // rect(-3, -3, this.w+6, this.h+6);
          }
          
          //  Outer checkbox circle
          strokeWeight(0.5);
          stroke(getColor(CLRS.BLACK,100));
          
          if(this.on){ fill(getColor(CLRS.WHITE, 45)); }
          else       { fill(getColor(CLRS.WHITE, 20)); }
          
          rect(0, 0, 30, this.h, this.h/2);   

          //  Inner checkbox circle
          fill(this.color);
          stroke(CLRS.GRAY);
          strokeWeight(0.5);

          if(this.on){ ellipse(this.h/2+1,  this.h/2+0.5, this.h-5, this.h-5); }
          else       { ellipse(this.h/2+15, this.h/2+0.5, this.h-5, this.h-5); }

          //  Text
          fill(getColor(CLRS.WHITE, 65)); 

          text(this.text, 35, this.h/2);

      popMatrix();

    };       
    checkbox.prototype.clicked=function(){

      /* Over ridden to maintain on/off value */
      if(this.hit){
        
        this.execute();
        
        for(var c in this.controls){ this.controls[c].clicked(); }
                
      }

    };
  
  }

  // Unit Circle * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {

    var unitCircle=function(id, parent, x, y, w, h, params){

      control.call(this, id, parent, x, y, w, h);

      this.color=params.color;
      this.cursor=params.cursor;

    };
    unitCircle.prototype=Object.create(control.prototype);
    unitCircle.prototype.draw=function(){

        var rTheta=0;       //  angle in radians
        var r=this.w;       //  radius
        var cs=3.5;         //  crossing size

        var p=this;         //  object reference

        var axes=function(){

            strokeWeight(1);
            stroke(CLRS.BLACK);

            line(-75,  0, 75,  0);
            line(  0,-75,  0, 75);

        };
        var circle=function(){

          if(p.hit){

            fill(getColor(CLRS.TEAL_2, p.value));
            stroke(getColor(CLRS.BLACK, 75));
            strokeWeight(1.25);

            if(p.value<25){ p.value+=2; }

          }
          else{

            noFill();
            stroke(getColor(CLRS.BLACK, 50));
            strokeWeight(1);

            p.value=5;

          }

          rTheta=radians(app.theta);

          ellipse(0, 0, 2*r, 2*r);

        };
        var intersections=function(){

          noStroke();
          fill(getColor(CLRS.BLACK, 40));

          ellipse( 0, r, cs, cs);
          ellipse( 0,-r, cs, cs);
          ellipse( r, 0, cs, cs);
          ellipse(-r, 0, cs, cs);

        };
        var quadrants=function(){

          textAlign(CENTER, CENTER);
          textSize(14);
          noStroke();
          fill(getColor(CLRS.BLACK, 25));

          var w=r*0.55;  // Distance along radius

          text("I",   w*cos(radians( -45)),  w*sin(radians( -45)));
          text("II",  w*cos(radians(-135)),  w*sin(radians(-135)));
          text("III", w*cos(radians( 135 )), w*sin(radians( 135)));
          text("IV",  w*cos(radians(  45)),  w*sin(radians(  45)));

        };
        var theta=function(){

          // Hypotenuse
          strokeWeight(1.5);
          stroke(CLRS.GRAY);

          line(0, 0, cos(rTheta)*r, sin(rTheta)*r);

          // Cos: Vertical
          stroke(CLRS.SIN);

          line(cos(rTheta)*r, 0, cos(rTheta)*r, sin(rTheta)*r);

          // Sin: Horizontal
          stroke(CLRS.COS);

          line(0, 0, cos(rTheta)*r, 0);

          // Triangle
          noStroke();
          fill(getColor(CLRS.GRAY, 20));

          triangle(            0,             0,
                   cos(rTheta)*r, sin(rTheta)*r,
                   cos(rTheta)*r, 0);

          noStroke();
          fill(getColor(CLRS.BLACK, 100));

          ellipse(cos(rTheta)*r, sin(rTheta)*r, cs, cs);
          ellipse(cos(rTheta)*r, 0,             cs, cs);
          ellipse(0,             0,             cs, cs);

          // Theta Text  ----------
          textSize(11);
          textAlign(CENTER,CENTER);

          var tw=textWidth(app.theta+CONSTANTS.DEGREES);

          noStroke();

          fill(this.parent.color);

          rect(-tw/2, -r*1.35-7.5, tw+2, 15);

          fill(CLRS.BLACK);

          scale(1,-1);

          text(app.theta+CONSTANTS.DEGREES, 0, r*1.35);

        };

        pushMatrix();

          translate(this.x-0.5, this.y-0.5);
          scale(1, -1);

            if(this.hit &&
               this.parent.hit &&
               !app.autoRun){

              app.focus=this.id;
              cursor(this.cursor);

            }

            axes();
            circle();
            intersections();
            theta();
            quadrants();

        popMatrix();

    };
    unitCircle.prototype.moved=function(x,y){

      if(dist(mouseX, mouseY,
              this.x+x, this.y+y)<this.w){

        this.hit=true;

        if(!app.autoRun){

          var d=round(degrees(atan2(mouseY-this.y+y, mouseX-this.x+x)));

          if(d<0){ d+=360; }

          app.theta=360-d;

        }
        
        for(var c in this.controls){ this.controls[c].moved(this.x+x, this.y+y); }

      }
      else{

        this.hit=false;

      }

    };

  }

  // Graph ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {

    var graph=function(id, parent, x, y, w, h, params){

      control.call(this, id, parent, x, y, w, h);

      this.color=params.color;
      this.cursor=params.cursor;

      this.gridHit=false;

      this.gridOn=true;
      this.axesOn=true;
      this.originOn=true;
      this.arrowsOn=true;
      this.ticksOn=true;
      this.labelsOn=true;
      this.borderOn=false;

    };
    graph.prototype=Object.create(control.prototype);
    graph.prototype.draw=function(){

      //  each end of a non-contiguous curve requires 2 terminating points

      var p=this;

      var min=0;
      var max=360;

      var h=530;      //  height
      var h2=h/2;     //  height / 2
      var gw=h/16;    //  grid width
      var f=4*gw;     //  coefficient to account for grid size

      var borderColor=CLRS.BORDER;

      var gridHit=false;  //  Is the mouse cursor over the grid proper

      var border=function(){
        
        noFill();

        pushMatrix();

          resetMatrix();

            if(p.hit){

              stroke(CLRS.BLUE);
              strokeWeight(1);

              rect(p.x, p.y, p.w-1, p.h-1);

              if(p.gridHit){

                stroke(CLRS.GREEN);
                strokeWeight(1);              
                fill(getColor(CLRS.GREEN),10);
                
                rect(p.x+30, p.y+20, h, h);

              }

            }

        popMatrix();

      };
      var grid=function(){

        //  Background
        fill(getColor(CLRS.WHITE,95));
        noStroke();

        // rect(0,0,540,540);

        var n=0;

        noFill();
        strokeWeight(1);
        stroke(CLRS.GRID_LINES);

        // Horizontal lines
        for(n=1; n<p.h/gw/2; n++){

          if(n%4==0){ stroke(CLRS.GRID_LINES_DARK); }
          else      { stroke(CLRS.GRID_LINES_LT);   }

          line(-5, n*gw, h+5, n*gw);
          line(-5,-n*gw, h+5,-n*gw);

        }

        // Vertical lines
        for(n=1; n<(p.h-gw)/gw; n++){

          if(n%4==0){ stroke(CLRS.GRID_LINES_DARK); }
          else      { stroke(CLRS.GRID_LINES_LT);   }

          line( n*gw, h/2+5, n*gw, -h/2-5);

        }

      };
      var axes=function(){

        stroke(CLRS.AXES);
        strokeWeight(1);

        line(-5,    0, h+5,    0); // x-axis
        line( 0,-h2-5,   0, h2+5); // y-axis

      };  
      var origin=function(){

        strokeWeight(1);
        noStroke();
        fill(96);

        ellipse(0,0,3,3);

      }; 
      var arrows=function(){

        fill(CLRS.ARROWS);
        noStroke();

        quad(h+15, 0, h+5, -3, h+7, 0,  h+5, 3);    // x-right
        // quad( -15, 0,  -5, -3,  -7, 0,   -5, 3);    // x-left

        quad(0,  h/2+15, -3,  h/2+5, 0,  h/2+7, 3,  h/2+5);    // y-top
        quad(0, -h/2-15, -3, -h/2-5, 0, -h/2-7, 3, -h/2-5);    // y-bottom

        noFill();
        
      };     
      var ticks=function(){

        var n=0;

        // Y-Axis
        for(n=gw; n<h/2-10; n+=gw){

          if(n%100==0){
            stroke(CLRS.TICKS_DARK);
            line(-3, n, 3, n);
            line(-3,-n, 3,-n);
          }
          else{
            stroke(CLRS.TICKS_LT);
            line(-2, n, 2, n);
            line(-2,-n, 2,-n);
          }

        }

        // X-Axis
        for(n=gw; n<h; n+=gw){

          if(n%100==0){
            stroke(CLRS.TICKS_DARK);
            line( n, -3, n, 3);
          }
          else{
            stroke(CLRS.TICKS_LT);
            line( n, -2, n, 2);
          }

        }

      };
      var labels=function(){

        var n=0;

        fill(CLRS.LABELS);
        textSize(10);

        pushMatrix();

          resetMatrix();

            textAlign(CENTER,TOP);

            text( "π/2",  gw*4+29, 587);
            text(   "π",  gw*8+29, 587);
            text("3π/2", gw*12+29, 587);
            text(  "2π", gw*16+29, 587);

            textAlign(RIGHT,CENTER);

            text("0", 22, 315);

            // y-axis
            for(n=1; n<p.h/2/gw; n++){

              if(n%4==0){
                text( n/4, 20, 315-n*gw);  //  Positive y-axis
                text(-n/4, 20, 315+n*gw);  //  Negative y-axis
              }

            }

        popMatrix();

      };
      var quadrants=function(){

        pushMatrix();

          scale(1,-1);

            fill(getColor(CLRS.BLACK,25));
            textAlign(CENTER,CENTER);
            textSize(48);

            text("I",    gw*2, 0);
            text("II",   gw*6, 0);
            text("III", gw*10, 0);
            text("IV",  gw*14, 0);

        popMatrix();

      }

      var thetaMap=function(t){
        return map(t, 0, 360, 0, 530);
      };

      var sineCurve=function(){

        strokeWeight(1);
        stroke(CLRS.SIN);
        noFill();

        // beginShape(m);
        beginShape();

          var x=0;
          var y=app.data[0].sin;

          curveVertex(x,y);

            for(var n=app.MIN; n<=app.MAX; n++){

              x=n/app.MAX*h;
              y=app.data[n].sin*f;

              curveVertex(x, y);

            }

          curveVertex(x,y);

        endShape();

        // Current Value

        stroke(CLRS.SIN);
        fill(CLRS.SIN);

        var val=app.data[app.theta].sin*f;

        ellipse(thetaMap(app.theta), val, 5, 5);

      };
      var cosineCurve=function(){

        strokeWeight(1);
        stroke(CLRS.COS);
        noFill();

        var x=0;
        var y=app.data[0].cos*f;

        beginShape();

          curveVertex(x,y);

            for(var n=app.MIN; n<=app.MAX; n++){

              x=n/app.MAX*h;
              y=app.data[n].cos*f;

              curveVertex(x, y);

            }

          curveVertex(x,y);

        endShape();

        // Current Value
        stroke(CLRS.COS);
        fill(CLRS.COS);

        var val=app.data[app.theta].cos*f;

        ellipse(thetaMap(app.theta), val, 5, 5);

      };
      var tangentCurve=function(){

        strokeWeight(1);      
        noFill();
        stroke(CLRS.TAN);

        var x=0;
        var y=0;
        var n=0;

        beginShape();

          curveVertex(x, y);

          for(n=app.MIN; n<90; n++){

            x=n/app.MAX*h;
            y=app.data[n].tan*f;

            if(y>=-h2 && y<=h2){ curveVertex(x, y); }

          }
          
          curveVertex(degrees(atan(2))/app.MAX*h, h2);
          curveVertex(degrees(atan(2))/app.MAX*h, h2);

        endShape();

        beginShape();

          curveVertex(116.56/app.MAX*h, -h2);
          curveVertex(116.56/app.MAX*h, -h2);

          for(n=91; n<270; n++){

            x=n/app.MAX*h;
            y=app.data[n].tan*f;

            if(y>=-h2 && y<=h2){ curveVertex(x, y); }

          }

          curveVertex(243.44/app.MAX*h, h2);
          curveVertex(243.44/app.MAX*h, h2);
          
        endShape();

        beginShape();

          curveVertex(296.56/app.MAX*h, -h2);
          curveVertex(296.56/app.MAX*h, -h2);
          
          for(n=271; n<app.MAX; n++){

            x=n/app.MAX*h;
            y=app.data[n].tan*f;

            if(y>=-h2 && y<=h2){ curveVertex(x, y); }

          }

          curveVertex(x,y);

        endShape();

        // Current Value
        var val=app.data[app.theta].tan*f;

        if(val>=-h2 && val<=h2){

          stroke(CLRS.TAN);
          fill(CLRS.TAN);

          ellipse(thetaMap(app.theta), val, 5, 5);

        }

      };
      var cosecantCurve=function(){

        strokeWeight(1);
        stroke(getColor(CLRS.SIN_LT, 10));
        noFill();

        var x=0;
        var y=0;
        var n=0;
        
        beginShape();

          ellipse(degrees(PI/6)/app.MAX*h, h2, 2, 2);
          curveVertex(degrees(PI/6)/app.MAX*h, h2);
          curveVertex(degrees(PI/6)/app.MAX*h, h2);
          
          for(n=1; n<180; n+=2){

            x=n/app.MAX*h;
            y=app.data[n].csc*f;

            if(y>=-h2 && y<=h2){
              ellipse(x, y, 2, 2);
              curveVertex(x, y);
            }

          }
          
          ellipse(degrees(5*PI/6)/app.MAX*h, h2, 2, 2);
          curveVertex(degrees(5*PI/6)/app.MAX*h, h2);
          curveVertex(degrees(5*PI/6)/app.MAX*h, h2);

        endShape();
        
        beginShape();

          ellipse(degrees(7*PI/6)/app.MAX*h, -h2, 2, 2);
          curveVertex(degrees(7*PI/6)/app.MAX*h, -h2);
          curveVertex(degrees(7*PI/6)/app.MAX*h, -h2);

          for(n=181; n<app.MAX; n+=2){

            x=n/app.MAX*h;
            y=app.data[n].csc*f;

            if(y>=-h2 && y<=h2){
              ellipse(x, y, 2, 2);
              curveVertex(x, y);
            }

          }

          ellipse(degrees(11*PI/6)/app.MAX*h, -h2, 2, 2);
          curveVertex(degrees(11*PI/6)/app.MAX*h, -h2);
          curveVertex(degrees(11*PI/6)/app.MAX*h, -h2);
          
        endShape();

        // Current Value
        var val=app.data[app.theta].csc*f;

        if(val>=-h2 && val<=h2){

          stroke(CLRS.SIN_LT);

          ellipse(thetaMap(app.theta), val, 5, 5);

        };

      };
      var secantCurve=function(){
        
        strokeWeight(1);
        stroke(getColor(CLRS.COS_LT, 10));
        noFill();

        var x=0;
        var y=app.data[0].sec;
        var n=0;
        
        beginShape();

          for(n=1; n<90; n+=2){

            x=n/app.MAX*h;
            y=app.data[n].sec*f;

            if(y>=-h2 && y<=h2){
              
              ellipse(x, y, 2, 2);
              curveVertex(x, y);

            }

          }

          ellipse(degrees(PI/3)/app.MAX*h, h2, 2, 2);
          curveVertex(degrees(PI/3)/app.MAX*h, h2);
          curveVertex(degrees(PI/3)/app.MAX*h, h2);    
          
        endShape();
        
        beginShape();
        
          ellipse(degrees(2*PI/3)/app.MAX*h, -h2, 2, 2);
          curveVertex(degrees(2*PI/3)/app.MAX*h, -h2);
          curveVertex(degrees(2*PI/3)/app.MAX*h, -h2);    
          
          
          for(n=91; n<270; n+=2){

            x=n/app.MAX*h;
            y=app.data[n].sec*f;

            if(y>=-h2 && y<=h2){
              ellipse(x, y, 2, 2);
              curveVertex(x, y);
            }

          }
        
          ellipse(degrees(4*PI/3)/app.MAX*h, -h2, 2, 2);
          curveVertex(degrees(4*PI/3)/app.MAX*h, -h2);
          curveVertex(degrees(4*PI/3)/app.MAX*h, -h2);    

        endShape();

        beginShape();
        
          ellipse(degrees(5*PI/3)/app.MAX*h, h2, 2, 2);
          curveVertex(degrees(5*PI/3)/app.MAX*h, h2);
          curveVertex(degrees(5*PI/3)/app.MAX*h, h2);    
          
          for(n=271; n<=app.MAX; n+=2){

            x=n/app.MAX*h;
            y=app.data[n].sec*f;

            if(y>=-h2 && y<=h2){
              ellipse(x, y, 2, 2);
              curveVertex(x, y);
            }

          }

        endShape();

        // Current Value
        var val=app.data[app.theta].sec*f;

        if(val>=-h2 && val<=h2){

          stroke(CLRS.COS_LT);
          fill(CLRS.COS_LT);

          ellipse(thetaMap(app.theta), val, 5, 5);

        };

      };
      var cotangentCurve=function(){

        strokeWeight(1);
        stroke(getColor(CLRS.TAN, 10));
        noFill();

        var x=0;
        var y=0;
        var n=0;
        var incr=2;

        beginShape();
        
          ellipse(26.5/app.MAX*h, h2, 2, 2);
          curveVertex(26.5/app.MAX*h, h2);
          curveVertex(26.5/app.MAX*h, h2);    
          
          for(n=2; n<180; n+=incr){

            x=n/app.MAX*h;
            y=app.data[n].cot*f;

            if(y>=-h2 && y<=h2){
              ellipse(x, y, 2, 2);
              curveVertex(x, y);
            }

          }

          ellipse(153.5/app.MAX*h, -h2, 2, 2);
          curveVertex(153.5/app.MAX*h, -h2);
          curveVertex(153.5/app.MAX*h, -h2);    
        
        endShape();
        
        beginShape();

          ellipse(206.5/app.MAX*h, h2, 2, 2);
          curveVertex(206.5/app.MAX*h, h2);
          curveVertex(206.5/app.MAX*h, h2);    
          
          for(n=181; n<=app.MAX; n+=incr){

            x=n/app.MAX*h;
            y=app.data[n].cot*f;

            if(y>=-h2 && y<=h2){
              ellipse(x, y, 2, 2);
              curveVertex(x, y);
            }

          }

          ellipse(333.5/app.MAX*h, -h2, 2, 2);
          curveVertex(333.5/app.MAX*h, -h2);
          curveVertex(333.5/app.MAX*h, -h2);    
          
        endShape();
        
        // Current Value
        var val=app.data[app.theta].cot*f;

        if(val>=-h2 && val<=h2){

          strokeWeight(1);
          stroke(getColor(CLRS.TAN_LT, 50));
          fill(getColor(CLRS.TAN_LT, 20));

          ellipse(thetaMap(app.theta), val, 5, 5);

        };

      };

      var drawCursor=function(){

        stroke(CLRS.BLACK);
        strokeWeight(0.25);

        pushMatrix();

          translate(0.5,0.5);

            line(30,     mouseY,    560, mouseY); // horizontal line
            line(mouseX,     50, mouseX,    580); // vertical line

        popMatrix();

      };
      
      // Draw --------------------------------------------------------------------------------
      pushMatrix();

        translate(this.x-0.5, this.y-0.5);
        scale(1,-1);

          noFill();
  
          if(this.hit &&
             this.parent.hit){
               
            app.focus=this.id;
            cursor(this.cursor);

          }

          pushMatrix();

            translate(30, -285);

              if(this.gridOn)    { grid();           }
              if(this.axesOn)    { axes();           }
              if(this.originOn)  { origin();         }
              if(this.arrowsOn)  { arrows();         }
              if(this.ticksOn)   { ticks();          }
              if(this.labelsOn)  { labels();         }

              if(app.quadrantsOn){ quadrants();      }

              if(app.sinOn      ){ sineCurve();      }
              if(app.cscOn      ){ cosecantCurve();  }

              if(app.cosOn      ){ cosineCurve();    }
              if(app.secOn      ){ secantCurve();    }

              if(app.tanOn      ){ tangentCurve();   }
              if(app.cotOn      ){ cotangentCurve(); }

          popMatrix();

          if(this.borderOn){ border(); }
            
      popMatrix();

      // if(this.gridHit &&
         // app.focus==this.id){
        
        // noCursor();
        // drawCursor();

      // }
      
    }
    graph.prototype.moved=function(x,y){
      
      /* Over ridden because of the 2-stage hit requirements */
      if(mouseX>=this.x+x &&
         mouseX<=this.x+x+this.w &&
         mouseY>=this.y+y &&
         mouseY<=this.y+y+this.h){
           
        this.hit=true;
        
        if(mouseX>=this.x+x+30 &&
           mouseX<=this.x+x+560 &&
           mouseY>=this.y+y+20 &&
           mouseY<=this.y+y+530+20){

          this.gridHit=true;
        
          if(!app.autoRun){
            app.theta=round(map(mouseX-30,0,530,0,360));
          }
          
          for(var c in this.controls){ this.controls[c].moved(this.x+x, this.y+y); }

        }
        else{

          this.gridHit=false;

        }

      }
      else{
        this.hit=false;
      }

    };

  }

  // Initialize ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var initialize=function(){

    // var control=function(id, parent, controls, x coordindate, y coordinate, width, height,
    //  params - eg: txt, execute, tag, retrieve, clr){

    // Background --------------------------------------------------
    {
      /* root control       */
      var bk=new root(11, null, 0, 0, 599, 599,                         
        {text:    "root",
         color:   CLRS.TEAL_2,
         cursor:  ARROW});

      app.controls.push(bk);

        /* graph              */
        bk.controls.push(new graph(12, bk, 0, 30, 600, 570,
          {color:   CLRS.BLUE,
           cursor:  ARROW}));

        /* unit circle        */
        bk.controls.push(new unitCircle(2, bk, 129, 447, 61.5, 61.5,      
          {color:   CLRS.ORANGE,
           cursor:  ARROW}));
    }
    
    // Toolbar --------------------------------------------------
    {
      /* toolbar            */
      var toolb=new toolbar(3, bk, 0, 0, 600, 30,                       
        {text:    "Trig Curves",
         color:   CLRS.TEAL_1,
         cursor:  ARROW});

      bk.controls.push(toolb);

        /* auto-run           */
        toolb.controls.push(new onOff(4, toolb, 17, 15, 13, 13,           
          {execute:   checkboxAuto,
           retrieve:  getAuto,
           color:     CLRS.BLACK,
           cursor:    HAND}));
           
        /* display settings   */
        toolb.controls.push(new settings(5, toolb, 575, 5, 22, 22,        
          {execute:   checkboxLegend,
           retrieve:  getLegend,
           color:     CLRS.BLACK,
           cursor:    HAND}));
      
    }
    
    // Index --------------------------------------------------
    {
      /* index              */
      var idx=new index(6, bk, 170, 55, 250, 70,                        
        {radius:  5,
         color:   CLRS.WHITE,
         cursor:  ARROW})

      bk.controls.push(idx);
        
        /* Sine button        */
        idx.controls.push(new button(20, idx, 5, 5, 110, 20,              
          {text:     "Sin "+CONSTANTS.THETA,
           execute:  toggleSin,
           tag:      getSine,
           retrieve: getSineOn,
           color:    CLRS.SIN,
           cursor:   HAND}));
         
        /* Cosine button      */
        idx.controls.push(new button(21, idx, 5, 25, 110, 20,             
          {text:     "Cos "+CONSTANTS.THETA,
           execute:  toggleCos,
           tag:      getCosine,
           retrieve: getCosineOn,
           color:    CLRS.COS,
           cursor:   HAND}));
        
        /* Tangent button     */
        idx.controls.push(new button(22, idx, 5, 45, 110, 20,             
          {text:     "Tan "+CONSTANTS.THETA,
           execute:  toggleTan,
           tag:      getTangent,
           retrieve: getTangentOn,
           color:    CLRS.TAN,
           cursor:   HAND}));

        /* Cosecant button    */
        idx.controls.push(new button(23, idx, 135, 5, 110, 20,            
          {text:     "Csc "+CONSTANTS.THETA,
           execute:  toggleCsc,
           tag:      getCosecant,
           retrieve: getCosecantOn,
           color:    CLRS.SIN,
           cursor:   HAND}));
        
        /* Secant button      */
        idx.controls.push(new button(24, idx, 135, 25, 110, 20,           
          {text:     "Sec "+CONSTANTS.THETA,
           execute:  toggleSec,
           tag:      getSecant,
           retrieve: getSecantOn,
           color:    CLRS.COS,
           cursor:   HAND}));
           
        /* Cotangent button   */
        idx.controls.push(new button(25, idx, 135, 45, 110, 20,           
          {text:     "Cot "+CONSTANTS.THETA,
           execute:  toggleCot,
           tag:      getCotangent,
           retrieve: getCotangentOn,
           color:    CLRS.TAN,
           cursor:   HAND}));

    }
    
    // Telemetry --------------------------------------------------
    if(app.debug){

      /* Telemetry          */
      var telem=new legend(26, bk, 600, 30, 200, 570,                   
        {color:    CLRS.BLUE,
         cursor:   ARROW});

      bk.controls.push(telem);
              
        /* Sine Checkbox      */
        telem.controls.push(new checkbox(27, telem, 25, 400,  50,  15,         
          {text:     "Sine Curve",
           execute:  toggleSin,
           retrieve: getSineOn,
           color:    CLRS.SIN,
           cursor:   HAND}));

        /* Cosine Checkbox    */
        telem.controls.push(new checkbox(28, telem, 25, 420,  50,  15,    
          {text:     "Cosine Curve",
           execute:  toggleCos,
           retrieve: getCosineOn,
           color:    CLRS.COS,
           cursor:   HAND}));

        /* Tangent Checkbox   */
        telem.controls.push(new checkbox(29, telem, 25, 440,  50,  15,    
          {text:     "Tangent Curve",
           execute:  toggleTan,
           retrieve: getTangentOn,
           color:    CLRS.TAN,
           cursor:   HAND}));

        /* Cosecant Checkbox  */
        telem.controls.push(new checkbox(30, telem, 25, 460,  50,  15,    
          {text:     "Cosecent Curve",
           execute:  toggleCsc,
           retrieve: getCosecantOn,
           color:    CLRS.SIN_LT,
           cursor:   HAND}));

        /* Secant Checkbox    */
        telem.controls.push(new checkbox(31, telem, 25, 480,  50,  15,    
          {text:     "Secant Curve",
           execute:  toggleSec,
           retrieve: getSecantOn,
           color:    CLRS.COS_LT,
           cursor:   HAND}));

        /* Cotangent Checkbox */
        telem.controls.push(new checkbox(32, telem, 25, 500,  50,  15,    
          {text:     "Cotangent Curve",
           execute:  toggleCot,
           retrieve: getCotangentOn,
           color:    CLRS.TAN_LT,
           cursor:   HAND}));

    }

  };

  var incrementTheta=function(){

    app.theta+=1;
    if(app.theta>360){ app.theta=0; }

  };
  var update=function(){

    background(242);

    if(app.autoRun){ incrementTheta(); }

    for(var c in app.controls){ app.controls[c].draw(); }

  };
  
  var execute;
  
  execute=update;
  
  initialize();
  
  var draw=function(){
    
    execute();

  };

  // Keyboard Events ==================================================
  {

    var keyPressed=function(){

      if(app.autoRun==false){

        if     (keyCode==KEYCODES.RIGHT){ increment(); }
        else if(keyCode==KEYCODES.LEFT) { decrement(); }

      }

    };
    var keyTyped=function(){/* println("typed " + (key) + " " + keyCode); */};
    var keyReleased=function(){};

  }

  // Mouse Events ==================================================
  {

    var mouseClicked=function(){

      for(var c in app.controls){ app.controls[c].clicked(); }

    };
    var mousePressed=function(){

      switch(mouseButton){

        case LEFT:    app.left=true;    break;
        case CENTER:  app.center=true;  break;
        case RIGHT:   app.right=true;   break;

        default:                        break;

      }

    };
    var mouseReleased=function(){

      app.left=false;
      app.right=false;
      app.center=false;

    };
    var mouseMoved=function(){

      app.mouseX=mouseX;
      app.mouseX=mouseY;
      
      // if(!app.autoRun){ execute(); }

      for(var c in app.controls){ app.controls[c].moved(0,0); }

    };
    var mouseOut=function(){

      // for(var c in app.controls){ app.controls[c].out(); }
      app.focus=-1;

    };
    var mouseOver=function(){
      
      
      // for(var c in app.controls){ app.controls[c].over(); }
      app.focus=-2;

    };

  }

}};





































































// 1729 = 10^3+9^3 = 12^3+1^3
