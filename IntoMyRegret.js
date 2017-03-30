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

*/

var diagrams = function(processingInstance){
  with (processingInstance){

/*

    TO DO:

      - only draw telemetry if it's visible
      - optional degrees radians
      - versine, coversine, exsecant, excosecant

    Research:


    TO DONE:



        textFont(createFont("sans-serif", 14));
        textFont(createFont("monospace", 14));
        textFont(createFont("serif", 14));
        textFont(createFont("fantasy", 14));
        textFont(createFont("cursive", 14));

        println( typeof this.color );

*/

  var application=function(){

      this.debug=true;          //  mode that displays enhanced debugging tools

      this.frameRate=30;        //  refresh speed

      this.mouseX=0;            //  current mouseX location
      this.mouseY=0;            //  current mouseY location

      this.left=false;          //  Is the left mouse button pressed
      this.right=false;         //  Is the right mouse button pressed
      this.center=false;        //  Is the center mouse button pressed

      this.focus=0;             //  The ID of the control with focus
      
      this.controls=[];         //  collection of controls in the app
      this.keys=[];             //  Array holding the value of all keycodes

      /* App Specific */
      this.data=[];             //  Values of each trig function from 0 (zero) to 360

      this.autoRun=false;        //  Alpha changes automatically

      this.theta=0;             //   Current angle

      this.sineOn       = true;
      this.cosineOn     = true;
      this.tangentOn    = true;
      this.cosecantOn   = true;
      this.secantOn     = true;
      this.cotangentOn  = true;
      
      this.versineOn    = true;
      this.coversineOn  = true;
      this.exsecantOn   = true;
      this.excosecantOn = true;

      this.thetaOn      = true;
      this.quadrantsOn  = true;

      this.MIN=0;
      this.MAX=360;

      var sineN, cosineN, tangentN,
          secantN, cosecantN, cotangentN,
          versineN, coversineN,
          exsecantN, excosecantN;

      /* Load Data */
        
      for (var n=this.MIN; n<=this.MAX; n++){

          sineN       = sin(radians(n)).toFixed(4);
          cosecantN   =       (1/sineN).toFixed(4);
          cosineN     = cos(radians(n)).toFixed(4);
          secantN     =     (1/cosineN).toFixed(4);
          tangentN    = tan(radians(n)).toFixed(4);
          cotangentN  =    (1/tangentN).toFixed(4);
          versineN    =     (1-cosineN).toFixed(4);
          coversineN  =       (1-sineN).toFixed(4);
          exsecantN   =   (cosecantN-1).toFixed(4);
          excosecantN =     (secantN-1).toFixed(4);

          this.data.push({  sine:     sineN,      cosecant:   cosecantN,
                            cosine:   cosineN,    secant:     secantN,
                            tangent:  tangentN,   cotangent:  cotangentN,

                            versine:  versineN,   coversine:  coversineN,
                            exsecant: exsecantN,  excosecant: excosecantN });
      }

      frameRate(0);
    
      cursor(WAIT);

      angleMode="radians";

      size(600, 600); // set size of canvas
      
    };

  var app=new application();
  
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

      Red:          color(255,  0,  0,255),     RedOrange:    color(255, 81,  0,255),
      Orange:       color(255,127,  0,255),     YellowOrange: color(255,190,  0,255),
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
    var QUADRANTS={
      NONE:   0,
      ONE:    1,
      TWO:    2,
      THREE:  3,
      FOUR:   4
    };
    var CONSTANTS={

      DEGREES:  "°",
      PI:       "π",
      UP_ARROW: "▲",
      INFINITY: "∞",
      THETA:    "θ",
      RADIANS:  "ᶜ"

    };

  }

  /* Utility Functions ========================================================= */
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

    var getAuto=function()     { return app.autoRun;  };
    var getLegend=function()   { return app.legend;   };

    var checkboxAuto=function(){

      app.autoRun=!app.autoRun;

      if(app.autoRun){ app.frameRate=10; }
      else           { app.frameRate=30; }

    };
    var checkboxLegend=function(){ app.legend=!app.legend;   };

    var getSine=function()          { return app.data[app.theta].sine;       };
    var getCosine=function()        { return app.data[app.theta].cosine;     };
    var getTangent=function()       { return app.data[app.theta].tangent;    };

    var getCosecant=function()      { return app.data[app.theta].cosecant;   };
    var getSecant=function()        { return app.data[app.theta].secant;     };
    var getCotangent=function()     { return app.data[app.theta].cotangent;  };

    var getVersine=function()       { return app.data[app.theta].versine;    };
    var getCoversine=function()     { return app.data[app.theta].coversine;  };

    var getExsecant=function()      { return app.data[app.theta].exsecant;   };
    var getExcosecant=function()    { return app.data[app.theta].excosecant; };
    
    var getSineOn=function()        { return app.sineOn;                     };
    var getCosineOn=function()      { return app.cosineOn;                   };
    var getTangentOn=function()     { return app.tangentOn;                  };

    var getCosecantOn=function()    { return app.cosecantOn;                 };
    var getSecantOn=function()      { return app.secantOn;                   };
    var getCotangentOn=function()   { return app.cotangentOn;                };

    var getVersineOn=function()     { return app.versineOn;                  };
    var getCoversineOn=function()   { return app.coversineOn;                };
    
    var getExsecantOn=function()    { return app.exsecantOn;                 };
    var getExcosecantOn=function()  { return app.excosecantOn;               };

    var toggleSine=function()       { app.sineOn       =! app.sineOn;        };
    var toggleCosine=function()     { app.cosineOn     =! app.cosineOn;      };
    var toggleTangent=function()    { app.tangentOn    =! app.tangentOn;     };
    var toggleCosecant=function()   { app.cosecantOn   =! app.cosecantOn;    };
    var toggleSecant=function()     { app.secantOn     =! app.secantOn;      };
    var toggleCotangent=function()  { app.cotangentOn  =! app.cotangentOn;   };

    var toggleVersine=function()    { app.versineOn    =! app.versineOn;     };
    var toggleCoversine=function()  { app.coversineOn  =! app.coversineOn;   };
    var toggleExsecant=function()   { app.exsecantOn   =! app.exsecantOn;    };
    var toggleExcosecant=function() { app.excosecantOn =! app.excosecantOn;  };

  }

  /* Controls ================================================ */
  {

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
        this.hit=false;             /* mouse is over the control */


      };
      control.prototype.draw=function(){};
      control.prototype.clicked=function(){

        if(this.hit){

          for(var c in this.controls){ this.controls[c].clicked(); }

        }

      };
      control.prototype.rClicked=function(){};
      control.prototype.cClicked=function(){};
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
      control.prototype.dragged=function(){};
      control.prototype.pressed=function(){};
      control.prototype.released=function(){};
      control.prototype.typed=function(){};
      control.prototype.over=function(){};
      control.prototype.out=function(){

        this.hit=false;
        app.focus=-1;
        for(var c in this.controls){ this.controls[c].out(); }

      };

    }

    // root ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {
      /* Identical to a container control except is doesn't have a parent */
      var root=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.text   = params.text;

        this.acolor = params.acolor;
        this.icolor = params.icolor;

        this.cursor = params.cursor;
        this.border = params.border;

        this.left   = 0;

      };
      root.prototype=Object.create(control.prototype);
      root.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();

            fill(this.icolor);

            if(this.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(this.acolor);

            }

            if(this.border){
              strokeWeight(1);
              stroke(this.acolor);
            }

              rect(0, 0, this.w, this.h);

            // Draw child controls
            for(var c in this.controls){ this.controls[c].draw(); }

        popMatrix();

      };

    }

    // Container ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var container=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.text=params.text;
        this.color=params.color;
        this.cursor=params.cursor;
        this.border=params.border;

      };
      container.prototype=Object.create(control.prototype);
      container.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            fill(getColor(this.color, 5));

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(getColor(this.color, 10));

            }

            if(this.border){

              strokeWeight(1);
              stroke(getColor(this.color, 50));

            }

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

    // toolbar ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var toolbar=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.text   = params.text;
        this.acolor = params.acolor;
        this.icolor = params.icolor;
        this.cursor = params.cursor;

      };
      toolbar.prototype=Object.create(control.prototype);
      toolbar.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            fill(this.icolor);

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(this.acolor);

            }

              rect(0, 0, this.w, this.h);

            // Caption
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

        this.color  = params.color;
        this.cursor = params.cursor;

        /*  Dynamic x-coordinate */
        this.offset = 0;

      };
      legend.prototype=Object.create(control.prototype);
      legend.prototype.draw=function(){

        textFont(createFont("sans-serif", 14));

        var p=this;

        // Border
        var border=function(){

          strokeWeight(1);
          stroke(getColor(p.clr,100));

          if(p.hit){ fill(getColor(p.color, 75)); }
          else     { fill(getColor(p.color, 70)); }

          rect(p.offset, 0, p.w, p.h);

        };

        //  Properties
        var properties=function(){

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
          textAlign(LEFT,TOP);
          textLeading(14);

          fill(getColor(CLRS.TEAL_2,75));

            text("Mouse Coordinates \n\n\n\n" +
                 "Mouse Buttons     \n\n\n\n\n" +
                 "Controls          \n\n\n\n" +
                 "Keys              \n\n\n\n\n" +
                 "App               \n\n\n\n",
                 col1, row0+15);

          /* app.focus is required to be done after control update in main draw sub */

          fill(getColor(CLRS.WHITE,75));

            text("         \n" +
                 "x:       \n" +
                 "y:       \n\n\n" +
                 "Left:    \n" +
                 "Right:   \n" +
                 "Center:  \n\n\n" +
                 "Focus:   \n" +
                 "Focused: \n\n\n" +
                 "Alt:     \n" +
                 "Control: \n" +
                 "Shift:   \n\n\n" +
                 "Legend:  \n" +
                 "Autorun: \n" +
                 "Theta:   \n" +
                 "Frame Rate:",
                 col1, row0+15);

          fill(getColor(CLRS.YELLOW,75));

            text("\n" +
                 mouseX      + "\n" +
                 mouseY      + "\n\n\n" +
                 app.left    + "\n" +
                 app.right   + "\n" +
                 app.center  + "\n\n\n" +
                 app.focus   + "\n" +
                 focused     + "\n\n\n" +
                 app.keys[KEYCODES.ALT]     + "\n" +
                 app.keys[KEYCODES.CONTROL] + "\n" +
                 app.keys[KEYCODES.SHIFT]   + "\n\n\n" +
                 app.legend  + "\n" +
                 app.autoRun + "\n" +
                 app.theta   + "\n" +
                 app.frameRate,
                 col2, row0+15);

          var txt="Press the left and right arrow keys to increment and decrement theta.";

          textSize(11);
          textAlign(LEFT,BOTTOM);

            text(txt, p.offset+17, row0 + 480, p.w-20, 100);

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

            /* The following is outside the properties function because
               it has to be done after the child controls are drawn to
               maintain proper control focus                              */
            fill(getColor(CLRS.YELLOW,75));
            textSize(11);
            textAlign(RIGHT,CENTER);

            // text(app.focus, this.offset+130, 495);

        popMatrix();

      };
      legend.prototype.moved=function(x,y){
      /* Overridden because of the dynamic x-coordinate offset */

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
      /* Overridden because the control is round */
        if(dist(mouseX, mouseY,
                this.x+x, this.y+y)<this.w){

          this.hit=true;

          for(var c in this.controls){ this.controls[c].moved(this.x+x, this.y+y); }

        }
        else{

          this.hit=false;

        }

      };
      onOff.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

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

            //  Background
              rect(offset, offset, this.w, this.h, 2);

            // Icon
            fill(getColor(this.color, 65));
            noStroke();

              ellipse(this.w/2+offset, this.h/2-6+offset, 3, 3);
              ellipse(this.w/2+offset, this.h/2,          3, 3);
              ellipse(this.w/2+offset, this.h/2+6+offset, 3, 3);

        popMatrix();

      };
      settings.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

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
        
        this.on=false;
        
      };
      button.prototype=Object.create(control.prototype);
      button.prototype.draw=function(){

          var offset=0;
          this.on=this.retrieve();

          pushMatrix();

            translate(this.x, this.y);
            scale(1,-1);

              // Border
              strokeWeight(0.75);

              fill(getColor(CLRS.ACTIVE, 5));
              noFill();
              noStroke();
                
              if(this.hit &&
                 this.parent.hit){

                if(app.left){ offset=1; }

                app.focus=this.id;
                cursor(this.cursor);

                // stroke(getColor(this.parent.color,0));
                
                noStroke();
                
                if(this.on){ fill(getColor(this.color,100)); }
                else       { fill(getColor(this.color, 50)); }

              }

              rect(offset, -this.h-offset, this.w, this.h, 3);

              // Caption
              if(this.hit &&
                 this.parent.hit){

                fill(255,255,255);

              }
              else{

                if(this.on){ fill(this.color);              }
                else       { fill(getColor(this.color,50)); }

              }

              scale(1,-1);

              textAlign(LEFT,CENTER);

              textSize(12);
              text(this.text, 10+offset, this.h/2+offset);
              
              if(this.on){

                textAlign(RIGHT,CENTER);
                
                var txt=this.tag();

                if(txt!==""){

                  if      (txt> 100){ text( "Infinity", this.w-10+offset, this.h/2+offset); }
                  else if (txt<-100){ text("-Infinity", this.w-10+offset, this.h/2+offset); }
                  else              { text( txt,        this.w-10+offset, this.h/2+offset); }

                }

              }

          popMatrix();

      };
      button.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.hit){
          
          this.execute();
          this.on=!this.on;
          
          for(var c in this.controls){ this.controls[c].clicked(); }
                  
        }

      };

    }
        
    // Unit Circle * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var unitCircle=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.color  = params.color;
        this.acolor = params.acolor;
        this.icolor = params.icolor;
        this.cursor = params.cursor;
        
        this.value=0;
        
      };
      unitCircle.prototype=Object.create(control.prototype);
      unitCircle.prototype.draw=function(){

          var rTheta=0;       //  angle in radians
          var r=this.w;       //  radius
          var cs=3.5;         //  crossing size

          var p=this;         //  object reference
          
          var sw=1.5;           // strokeWeight;
          
          var sinValue=sin(radians(app.theta))*r;
          var cscValue=1/sin(radians(app.theta))*r;

          var cosValue=cos(radians(app.theta))*r;          
          var secValue=1/cos(radians(app.theta))*r;
          
          var tanValue=sin(radians(app.theta))/cos(radians(app.theta));
          var cotValue=1/tanValue;

          var m=sinValue/cosValue;

// println(m);
          
          textFont(createFont("sans-serif", 14));

          var axes=function(){

            // axes();
            strokeWeight(1);
            stroke(p.color);

            var w=p.w*1.1;

            line(-w, 0, w, 0);
            line( 0,-w, 0, w);

          };
          var circle=function(){

            noFill();

            if(p.hit){

              fill(getColor(p.acolor, p.value));
              stroke(getColor(p.color, 50));
              strokeWeight(1.5);

              if(p.value<20){ p.value+=2; }

            }
            else{

              stroke(getColor(p.color, 75));
              strokeWeight(1);

              p.value=5;

            }

            rTheta=radians(app.theta);

            ellipse(0, 0, 2*r, 2*r);

          };

          var drawRadius=function(){

            noFill();
            stroke(getColor(CLRS.BLACK,50));
            strokeWeight(2);

              line(cosValue, sinValue, 0, 0);

          };

          var drawSine=function(){

            noFill();
            stroke(CLRS.SIN);
            strokeWeight(sw);

              line(0,        sinValue,        0, 0);
              line(cosValue, sinValue, cosValue, 0);

            pushMatrix();

              fill(CLRS.SIN);

                var x=0;
                var y=sinValue/2;
                var txt="sin";

                if(cosValue>0){ x=-2; textAlign(RIGHT,CENTER); }
                else          { x= 2; textAlign(LEFT, CENTER); }

                translate(x,y);
                scale(1,-1);
                
                  text(txt, 0, 0);

            popMatrix();
            
          };
          var drawCosine=function(){

            noFill();
            stroke(CLRS.COS);
            strokeWeight(sw);
              
              line(cosValue,        0,        0,        0);
              line(       0, sinValue, cosValue, sinValue);
            
            pushMatrix();

              fill(CLRS.COS);

                var x=cosValue/2;
                var y=0;
                var txt="cos";

                if(sinValue>0){ y=-2; textAlign(CENTER,TOP);    }
                else          { y= 2; textAlign(CENTER,BOTTOM); }

                translate(x,y);
                scale(1,-1);
                
                  text(txt, 0, 0);

            popMatrix();
            

          };
          var drawTangent=function(){

            noFill();
            stroke(CLRS.K_GREEN_0);
            strokeWeight(sw);

              line(secValue, 0, cosValue, sinValue);

            pushMatrix();

              fill(CLRS.K_GREEN_0);

                var x=(cosValue+(secValue-cosValue)/2)*1.05;
                var y=(sinValue/2)*1.05;
                var txt="tan";

                if(cosValue>0){ textAlign(LEFT, CENTER); }
                else          { textAlign(RIGHT,CENTER); }

                translate(x,y);
                scale(1,-1);

                  text(txt, 0, 0);

            popMatrix();
            
          };
          var drawCosecant=function(){

            noFill();
            stroke(CLRS.K_PINK_0);
            strokeWeight(sw);

              if(cosValue<0){

                line( 45, 0,  45, cscValue);
                
                // Dimension lines
                line( 0, cscValue, 45, cscValue); //  Top
                line( 45,       0,  0,        0); //  Bottom


              }
              else{

                line(-45, 0, -45, cscValue);

                // Dimension lines
                line( 0,   cscValue, -45, cscValue); //  Top
                line( -45,        0,   0,        0); //  Bottom

              }

            pushMatrix();

              scale(1,-1);

              fill(CLRS.K_PINK_0);

                var x=0;
                var y=0;
                var txt="csc";

                if(sinValue>0){ y=-p.h/2; }
                else          { y= p.h/2; }

                if(cosValue>0){ x=-50;
                                textAlign(RIGHT,CENTER); }
                else          { x= 50;
                                textAlign(LEFT, CENTER); }

                  text(txt, x, y);

            popMatrix();
              
            var xOffset=-45;;
            
            if(sinValue>0){
              
              if(cosValue<0){ xOffset=45; }
              
              // Bottom Arrow
              pushMatrix();
                
                translate(xOffset, 0);
                rotate(radians(90));
                
                  quad(0, 0,
                       8, 2,
                       5, 0,
                       8,-2);
              
              popMatrix();
              
              // Top Arrow              
              pushMatrix();

                translate(xOffset, cscValue);
                rotate(radians(90));
                
                  quad( 0, 0,
                       -8, 2,
                       -5, 0,
                       -8,-3);

              popMatrix();
              
            }
            else{

              if(cosValue<0){ xOffset=45; }
              
              // Bottom Arrow
              pushMatrix();
                
                translate(xOffset, cscValue);
                rotate(radians(90));

                  quad(0, 0,
                       8, 2,
                       5, 0,
                       8,-2);
              
              popMatrix();
              
              // Bottom Arrow              
              pushMatrix();
                
                translate(xOffset, 0);
                rotate(radians(90));

                  quad( 0, 0,
                       -8, 2,
                       -5, 0,
                       -8,-3);

              popMatrix();

            }
              
          };
          var drawSecant=function(){

            noFill();
            stroke(CLRS.K_PINK_2);
            strokeWeight(sw);

              if(sinValue<0){

                line(0,  45, secValue,  45);

                // Dimension Lines
                line(       0, 0,        0,  45); // Left
                line(secValue, 0, secValue,  45); // Right

              }
              else{
                
                line(0, -45, secValue, -45);

                // Dimension Lines
                line(       0, 0,        0, -45); // Left
                line(secValue, 0, secValue, -45); // Right

              }

              var yOffset=-45;;

              if(cosValue>0){
                
                if(sinValue<0){ yOffset=45; }
                
                // Left Arrow
                pushMatrix();
                  
                  translate(0, yOffset);
                  
                    quad(0, 0,
                         8, 2,
                         5, 0,
                         8,-2);
                
                popMatrix();
                
                // Right Arrow              
                pushMatrix();
                  
                  translate(secValue, yOffset);
                  
                    quad( 0, 0,
                         -8, 2,
                         -5, 0,
                         -8,-3);

                popMatrix();
                
              }
              else{

                if(sinValue<0){ yOffset=45; }
                
                // Left Arrow
                pushMatrix();
                  
                  translate(secValue, yOffset);
                  
                    quad(0, 0,
                         8, 2,
                         5, 0,
                         8,-2);
                
                popMatrix();
                
                // Right Arrow              
                pushMatrix();
                  
                  translate(0, yOffset);
                  
                    quad( 0, 0,
                         -8, 2,
                         -5, 0,
                         -8,-3);

                popMatrix();

              }

            pushMatrix();

              scale(1,-1);

              fill(CLRS.K_PINK_2);

                var x=0;
                var y=0;
                var txt="sec";

                if(sinValue>0){ y= 50; textAlign(CENTER,TOP); }
                else          { y=-50; textAlign(CENTER,BOTTOM); }

                if(cosValue>0){ x= p.w/2; }
                else          { x=-p.w/2; }

                  text(txt, x, y);

            popMatrix();
            
          };
          var drawCotangent=function(){

            noFill();
            stroke(CLRS.K_GREEN_2);
            strokeWeight(sw);

              line(0, cscValue, cosValue, sinValue);

            pushMatrix();

              fill(CLRS.K_GREEN_2);

                var x=(cosValue/2)*1.05;
                var y=(sinValue+(cscValue-sinValue)/2)*1.05;
                var txt="cot";

                if(cosValue>0){ textAlign(LEFT,CENTER); }
                else          { textAlign(RIGHT,CENTER); }

                translate(x,y);
                scale(1,-1);

                  text(txt, 0, 0);

            popMatrix();
            
          };

          var drawVersine=function(){

            noFill();
            stroke(CLRS.K_BROWN_1);
            strokeWeight(sw);

              if(cosValue>0){ line( r, 0, cosValue, 0); }
              else          { line(-r, 0, cosValue, 0); }

            pushMatrix();

              fill(CLRS.K_BROWN_1);

                var x=0;
                var y=0;
                var txt="ver";

                if(cosValue>0){ x=cosValue+(r-cosValue)/2; }
                else          { x=cosValue-(r+cosValue)/2; }
                
                if(sinValue>0){ textAlign(CENTER,TOP);    y=-3; }
                else          { textAlign(CENTER,BOTTOM); y= 3; }

                translate(x,y);
                scale(1,-1);

                  text(txt, 0, 0);

            popMatrix();
            
          };
          var drawCoversine=function(){

            noFill();
            stroke(CLRS.K_TEAL_2);
            strokeWeight(sw);

              if(sinValue>0){ line(0, r, 0, sinValue); }
              else          { line(0,-r, 0, sinValue); }

            pushMatrix();

              fill(CLRS.K_TEAL_2);

                var x=0;
                var y=0;
                var txt="cvs";

                if(cosValue>0){ x=-3; textAlign(RIGHT,CENTER); }
                else          { x= 3; textAlign(LEFT, CENTER); }

                if(sinValue>0){ y=sinValue+(r-sinValue)/2; }
                else          { y=sinValue-(r+sinValue)/2; }

                translate(x,y);
                scale(1,-1);

                  text(txt, 0, 0);

            popMatrix();

          };
          var drawExsecant=function(){
            /* Exterior Secant */

            noFill();
            stroke(CLRS.K_ORANGE_0);
            strokeWeight(sw);

              if(cosValue>0){ line( r, 0,  secValue, 0); }
              else          { line(-r, 0,  secValue, 0); }
            
            pushMatrix();

              fill(CLRS.K_ORANGE_0);

                var x=0;
                var y=0;
                var txt="exsec";

                if(cosValue>0){ x= r+(secValue-r)/2; }
                else          { x=-r+(secValue+r)/2; }
                
                if(sinValue>0){ textAlign(CENTER,TOP);    y=-3; }
                else          { textAlign(CENTER,BOTTOM); y= 3; }

                translate(x,y);
                scale(1,-1);

                  text(txt, 0, 0);

            popMatrix();
            
          };
          var drawExcosecant=function(){
            /* Exterior Cosecant */  

            noFill();
            stroke(CLRS.K_TEAL_0);
            strokeWeight(sw);

              if(sinValue>0){ line(0,  r, 0,  cscValue); }
              else          { line(0, -r, 0,  cscValue); }

            pushMatrix();

              fill(CLRS.K_TEAL_0);

                var x=0;
                var y=0;
                var txt="excsc";

                if(cosValue>0){ x=-3; textAlign(RIGHT,CENTER); }
                else          { x= 3; textAlign(LEFT, CENTER); }

                if(sinValue>0){ y= r+(r-sinValue)/2; }
                else          { y=-r-abs(cscValue+r)/2; }

                translate(x,y);
                scale(1,-1);

                  text(txt, 0, 0);

            popMatrix();
          };
          
          var drawDegrees=function(){

            fill(p.color);
            stroke(getColor(p.color, 90));
            strokeWeight(0.5);

            pushMatrix();

              for(var n=0; n<360; n++){

                stroke(getColor(p.color, 75));

                if(n%10===0){

                  line(p.w-35, 0, p.w, 0);

                }
                else if(n%5===0){

                  stroke(getColor(p.color, 50));

                  line(p.w-25, 0, p.w, 0);

                }
                else{

                  if(n%10<5){ stroke(getColor(p.color, 50)); }
                  else      { stroke(getColor(p.color, 25)); }

                  line(p.w-15, 0, p.w, 0);

                }

                rotate(radians(1));

              }

            popMatrix();

            // /* Labels */
            textSize(10);

            pushMatrix();

              resetMatrix();
              translate(p.x, p.y);
              textAlign(CENTER,CENTER);
              var offset=p.w-45;

                for(var n=10; n<360; n+=10){

                  text(n,
                       cos(-radians(n))*offset,
                       sin(-radians(n))*offset);
                }

              textAlign(RIGHT,CENTER);

              offset=p.w-44;

                text("0 & 360",
                     cos(radians(0))*offset,
                     sin(radians(0))*offset);

            popMatrix();

          };
          var drawRadians=function(){

            noFill();
            stroke(getColor(p.color, 90));
            strokeWeight(0.5);

            pushMatrix();

              for(var n=0; n<TWO_PI*100; n++){

                if(n%10===0){

                  stroke(getColor(p.color, 90));
                  line(p.w+25, 0, p.w, 0);

                }
                else if ( n%5===0){

                  stroke(getColor(p.color, 90));
                  line(p.w+15, 0, p.w, 0);

                }
                else{

                  if(n%10<5){ stroke(getColor(p.color, 70)); }
                  else      { stroke(getColor(p.color, 40)); }

                  line(p.w+10, 0, p.w, 0);

                }

                rotate(0.01);

              }

            popMatrix();

            // Labels
            textSize(9);

            pushMatrix();

              resetMatrix();
              translate(p.x, p.y);
              textAlign(CENTER,CENTER);

              fill(getColor(p.color, 90));

              var offset=p.w+37;

              for(var n=0.1; n<TWO_PI; n+=0.1){

                text(n.toFixed(1),
                     cos(-radians(180*n/PI))*offset,
                     sin(-radians(180*n/PI))*offset);

              }

              offset=p.w+30;
              textAlign(LEFT,CENTER);

              text("0 & 6.28",
                   cos(radians(0))*offset,
                   sin(radians(0))*offset);

            popMatrix();

          };
          var theta=function(){

            // Dial
            pushMatrix();

              translate(0.25,0.25);
              rotate(rTheta);

                strokeWeight(0.4);
                stroke(CLRS.BLACK);
                fill(getColor(CLRS.BLACK,50));

                // beginShape();

                  // vertex(-50,  0);
                  // vertex(0, 10);
                  // vertex(r,    0);
                  // vertex(0,-10);

                // endShape(CLOSE);

            popMatrix();

            // Theta Text  ----------
            textSize(20);
            textAlign(CENTER,CENTER);

            var tw=textWidth(app.theta+CONSTANTS.DEGREES);

            noStroke();

            fill(p.parent.color);

              // rect(-tw/2, -r*1.35-7.5, tw+2, 15);

            fill(CLRS.BLACK);
            textSize(36);
            scale(1,-1);

              text((app.theta*PI/180).toFixed(2) + CONSTANTS.RADIANS, -260, r*1);
              text(app.theta + CONSTANTS.DEGREES,                     -260, r*1.2);

          };
          var quadrants=function(){

            textAlign(LEFT, CENTER);
            textSize(24);
            noStroke();
            fill(getColor(p.color, 25));

            var w=r*0.5;  // Distance along radius

            textAlign(CENTER, CENTER);
            
              text("I",   w*cos(radians( -45)),  w*sin(radians( -45)));
              text("II",  w*cos(radians(-135)),  w*sin(radians(-135)));
              text("III", w*cos(radians( 135 )), w*sin(radians( 135)));
              text("IV",  w*cos(radians(  45)),  w*sin(radians(  45)));

          };
          var quadrantValues=function(){

            textFont(createFont("monospace", 14));

            noStroke();
            fill(getColor(p.color, 50));

            var x_offset=30;

            // Quadrant I
            textAlign(LEFT, TOP);

            var txt="sin + \n" +
                    "cos + \n" +
                    "tan + \n" +
                    "csc + \n" +
                    "sec + \n" +
                    "cot + \n";

              text(txt, x_offset, -110);

            // Quadrant II
            textAlign(RIGHT, TOP);

            txt="sin + \n" +
                "cos - \n" +
                "tan - \n" +
                "csc - \n" +
                "sec - \n" +
                "cot + \n";

              text(txt, -x_offset+5, -110);

            // Quadrant III
            textAlign(RIGHT, TOP);

            txt="sin - \n" +
                "cos - \n" +
                "tan + \n" +
                "csc + \n" +
                "sec - \n" +
                "cot - \n";

              text(txt, -x_offset+5, 15);

            // Quadrant IV
            textAlign(LEFT, TOP);

            txt="sin - \n" +
                "cos + \n" +
                "tan - \n" +
                "csc - \n" +
                "sec + \n" +
                "cot - \n";

              text(txt, x_offset, 15);

          };
          var labels=function(){

            fill(getColor(p.color, 90));
            textAlign(CENTER,TOP);
            textFont(createFont("sans-serif", 16));

            pushMatrix();

              var y=-r*0.7;

              rotate(radians(-15));
                text("D", 0, y);
              rotate(radians(5));
                text("E", 0, y);
              rotate(radians(5));
                text("G", 0, y);
              rotate(radians(5));
                text("R", 0, y);
              rotate(radians(5));
                text("E", 0, y);
              rotate(radians(5));
                text("E", 0, y);
              rotate(radians(5));
                text("S", 0, y);

            popMatrix();

            pushMatrix();

              y=-r*1.38;

              rotate(radians(67));
                text("R", 0, y);
              rotate(radians(2.75));
                text("A", 0, y);
              rotate(radians(2.75));
                text("D", 0, y);
              rotate(radians(2.25));
                text("I", 0, y);
              rotate(radians(2.25));
                text("A", 0, y);
              rotate(radians(2.75));
                text("N", 0, y);
              rotate(radians(2.75));
                text("S", 0, y);

            popMatrix();

          };
          var specialValues=function(){

            textFont(createFont("cursive", 14));
            textAlign(CENTER,CENTER);
            textSize(11);

            var coef=1.35;
            var lcoef=1.28;
            var scoef=1.22;

            // π/2
            text("π/2", 0, -r*coef);

            stroke(p.color);
            strokeWeight(0.5);

              line(cos(PI/2)*r*scoef, -sin(PI/2)*r*scoef,
                   cos(PI/2)*r*lcoef, -sin(PI/2)*r*lcoef);

            // π
            text("π", -r*coef, 0);

              line(cos(PI)*r*scoef, -sin(PI)*r*scoef,
                   cos(PI)*r*lcoef, -sin(PI)*r*lcoef);

            // 3π/2
            text("3π/2", 0, r*coef);

              line(cos(3*PI/2)*r*scoef, -sin(3*PI/2)*r*scoef,
                   cos(3*PI/2)*r*lcoef, -sin(3*PI/2)*r*lcoef);

            // 2π
            text("2π", r*1.38, 0);

            // line(cos(2*PI)*r*scoef, -sin(2*PI)*r*scoef,
                 // cos(2*PI)*r*lcoef, -sin(2*PI)*r*lcoef);

            /* Quadrant I */
            // π/6
            text("π/6", cos(PI/6)*r*coef,
                       -sin(PI/6)*r*coef);

              line(cos(PI/6)*r*scoef, -sin(PI/6)*r*scoef,
                   cos(PI/6)*r*lcoef, -sin(PI/6)*r*lcoef);

            // π/4
            text("π/4", cos(PI/4)*r*coef,
                       -sin(PI/4)*r*coef);

              line(cos(PI/4)*r*scoef, -sin(PI/4)*r*scoef,
                   cos(PI/4)*r*lcoef, -sin(PI/4)*r*lcoef);

            // π/3
            text("π/3", cos(PI/3)*r*coef,
                       -sin(PI/3)*r*coef);

              line(cos(PI/3)*r*scoef, -sin(PI/3)*r*scoef,
                   cos(PI/3)*r*lcoef, -sin(PI/3)*r*lcoef);

            /* Quadrant II */
            // 2π/3
            text("2π/3", cos(2*PI/3)*r*coef,
                        -sin(2*PI/3)*r*coef);

              line(cos(2*PI/3)*r*scoef, -sin(2*PI/3)*r*scoef,
                   cos(2*PI/3)*r*lcoef, -sin(2*PI/3)*r*lcoef);

            // 3π/4
            text("3π/4", cos(3*PI/4)*r*coef,
                        -sin(3*PI/4)*r*coef);

              line(cos(3*PI/4)*r*scoef, -sin(3*PI/4)*r*scoef,
                   cos(3*PI/4)*r*lcoef, -sin(3*PI/4)*r*lcoef);

            // 5π/6
            text("5π/6", cos(5*PI/6)*r*coef,
                        -sin(5*PI/6)*r*coef);

              line(cos(5*PI/6)*r*scoef, -sin(5*PI/6)*r*scoef,
                   cos(5*PI/6)*r*lcoef, -sin(5*PI/6)*r*lcoef);

            /* Quadrant III */
            // 7π/6
            text("7π/6", cos(7*PI/6)*r*coef,
                        -sin(7*PI/6)*r*coef);

              line(cos(7*PI/6)*r*scoef, -sin(7*PI/6)*r*scoef,
                   cos(7*PI/6)*r*lcoef, -sin(7*PI/6)*r*lcoef);

            // 5π/4
            text("5π/4", cos(5*PI/4)*r*coef,
                        -sin(5*PI/4)*r*coef);

              line(cos(5*PI/4)*r*scoef, -sin(5*PI/4)*r*scoef,
                   cos(5*PI/4)*r*lcoef, -sin(5*PI/4)*r*lcoef);

            // 4π/3
            text("4π/3", cos(4*PI/3)*r*coef,
                        -sin(4*PI/3)*r*coef);

              line(cos(4*PI/3)*r*scoef, -sin(4*PI/3)*r*scoef,
                   cos(4*PI/3)*r*lcoef, -sin(4*PI/3)*r*lcoef);

            /* Quadrant IV */
            // 5π/3
            text("5π/3", cos(5*PI/3)*r*coef,
                        -sin(5*PI/3)*r*coef);

              line(cos(5*PI/3)*r*scoef, -sin(5*PI/3)*r*scoef,
                   cos(5*PI/3)*r*lcoef, -sin(5*PI/3)*r*lcoef);

            // 7π/4
            text("7π/4", cos(7*PI/4)*r*coef,
                        -sin(7*PI/4)*r*coef);

              line(cos(7*PI/4)*r*scoef, -sin(7*PI/4)*r*scoef,
                   cos(7*PI/4)*r*lcoef, -sin(7*PI/4)*r*lcoef);

            // 11π/6
            text("11π/6", cos(11*PI/6)*r*coef,
                         -sin(11*PI/6)*r*coef);

              line(cos(11*PI/6)*r*scoef, -sin(11*PI/6)*r*scoef,
                   cos(11*PI/6)*r*lcoef, -sin(11*PI/6)*r*lcoef);

          };
          var conversion=function(){

            textFont(createFont("sans-serif", 14));
            // textFont(createFont("serif", 14));
            // textFont(createFont("fantasy", 14));
            textFont(createFont("cursive", 12));

            fill(p.icolor);

            if(p.parent.hit){ fill(p.acolor); }

            noStroke();

            pushMatrix();

              translate(230,-240);

                strokeWeight(0.5);

                  rect(-80,-40,160,80);

                // noFill();
                stroke(CLRS.BLUE);
                strokeWeight(0.5);

                  ellipse(0, 0, 100, 50);

                //  Background rectangles
                // fill(p.acolor);
                noStroke();

                var w=textWidth("Degrees")+10;

                  rect(-w/2-50, -7.5, w, 15);

                w=textWidth("Radians")+10;

                  rect(50-w/2, -7.5, w, 15);

                w=textWidth("x "+CONSTANTS.PI+"/180")+10;

                  rect(-w/2, -32.5, w, 15);

                w=textWidth("x "+"180/"+CONSTANTS.PI)+10;

                  rect(-w/2,  18.5, w, 15);

                // Labels
                fill(getColor(CLRS.BLACK, 75));

                textAlign(CENTER,CENTER);

                  text("Degrees", -50, 0);
                  text("Radians",  50, 0);

                  text("x "+CONSTANTS.PI+"/180", 0, -25);
                  text("x "+"180/"+CONSTANTS.PI, 0,  25);

                // Arrows
                pushMatrix();

                  fill(CLRS.BLUE);
                  noStroke();

                  translate(-24,-22);
                  rotate(radians(-10));

                    triangle( -7, -4,
                              -7,  4,
                               0,  0);

                  translate(22,22);         //  Reset to center of the ellipse
                  rotate(radians(10));

                  // ------------------------------

                  translate(-48,14);
                  rotate(radians(-140));

                    triangle( -7, -4,
                              -7,  4,
                               0,  0);

                  rotate(radians(140));     //  Reset to center of the ellipse
                  translate(50,-14);

                  // ------------------------------
                  translate(22,26);
                  rotate(radians(155));

                    triangle( -7, -4,
                              -7,  4,
                               0,  0);

                  rotate(radians(-155));    //  Reset to center of the ellipse
                  translate(-22,-26);

                  // ------------------------------
                  translate(46,-3);
                  rotate(radians(45));

                    triangle( -7, -4,
                              -7,  4,
                               0,  0);

                  // ellipse(0,0,3,3);

                popMatrix();

            popMatrix();

          };

          pushMatrix();

            translate(this.x+0.5, this.y+0.5);
            scale(1, -1);

              if(this.hit &&
                 this.parent.hit &&
                 !app.autoRun){

                app.focus=this.id;
                cursor(this.cursor);

              }

              axes();
              circle();

              drawRadius();

              if(app.sineOn)      { drawSine();       }
              if(app.cosecantOn)  { drawCosecant();   }

              if(app.cosineOn)    { drawCosine();     }
              if(app.secantOn)    { drawSecant();     }

              if(app.versineOn)   { drawVersine();    }
              if(app.coversineOn) { drawCoversine();  }

              if(app.tangentOn)   { drawTangent();    }
              if(app.cotangentOn) { drawCotangent();  }

              if(app.exsecantOn)  { drawExsecant();   }
              if(app.excosecantOn){ drawExcosecant(); }

              // drawDegrees();
              // drawRadians();
              if(app.thetaOn)     { theta();          }
              if(app.quadrantsOn) { quadrants();      }
              // quadrantValues();
              // labels();
              // specialValues();
              // conversion();

          popMatrix();

      };
      unitCircle.prototype.moved=function(x,y){
      /* Overridden because of the shape - round */

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

  }

  /* Initialize ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    var initialize=function(){

      // Background --------------------------------------------------

        /* root control       */
        var bk=new root(100, null, 0, 0, 599, 599,
          {text:      "root",
           acolor:    CLRS.ACTIVE,
           icolor:    CLRS.INACTIVE,
           cursor:    ARROW,
           border:    false});

        app.controls.push(bk);

        /* unit circle        */
        bk.controls.push(new unitCircle(110, bk, 360, 310, 160, 160,
          {color:     CLRS.BLACK,
           acolor:    CLRS.TEAL_2,
           icolor:    CLRS.INACTIVE,
           cursor:    ARROW}));

           
      // toolbar --------------------------------------------------

        /* tlbar            */
        var tlbar=new toolbar(200, bk, 0, 0, 600, 30,
          {text:      "Supplementary Ratios",
           acolor:    CLRS.TOOLBARA,
           icolor:    CLRS.TOOLBARI,
           cursor:    ARROW});

        bk.controls.push(tlbar);

          /* auto-run           */
          tlbar.controls.push(new onOff(210, tlbar, 15, 15, 13, 13,
            {execute:   checkboxAuto,
             retrieve:  getAuto,
             color:     CLRS.BLACK,
             cursor:    HAND}));

          /* display settings   */
          tlbar.controls.push(new settings(220, tlbar, 575, 5, 22, 22,
            {execute:   checkboxLegend,
             retrieve:  getLegend,
             color:     CLRS.BLACK,
             cursor:    HAND}));

             
      // Index --------------------------------------------------

        /* index              */
        var idx=new index(300, bk, 10, 40, 120, 225,{radius:  5,
            color:   CLRS.WHITE,
            cursor:  ARROW});

        bk.controls.push(idx);
          
          /* Sine button        */
          bk.controls.push(new button(310, bk, 15, 45, 110, 20,              
            {text:     "Sin "+CONSTANTS.THETA,
             execute:  toggleSine,
             tag:      getSine,
             retrieve: getSineOn,
             color:    CLRS.SIN,
             cursor:   HAND}));
           
          /* Cosine button      */
          bk.controls.push(new button(320, bk, 15, 65, 110, 20,             
            {text:     "Cos "+CONSTANTS.THETA,
             execute:  toggleCosine,
             tag:      getCosine,
             retrieve: getCosineOn,
             color:    CLRS.COS,
             cursor:   HAND}));
          
          /* Tangent button     */
          bk.controls.push(new button(330, bk, 15, 85, 110, 20,             
            {text:     "Tan "+CONSTANTS.THETA,
             execute:  toggleTangent,
             tag:      getTangent,
             retrieve: getTangentOn,
             color:    CLRS.TAN,
             cursor:   HAND}));

          /* Cosecant button    */
          bk.controls.push(new button(340, bk, 15, 110, 110, 20,            
            {text:     "Csc "+CONSTANTS.THETA,
             execute:  toggleCosecant,
             tag:      getCosecant,
             retrieve: getCosecantOn,
             color:    CLRS.K_PINK_0,
             cursor:   HAND}));
          
          /* Secant button      */
          bk.controls.push(new button(350, bk, 15, 130, 110, 20,           
            {text:     "Sec "+CONSTANTS.THETA,
             execute:  toggleSecant,
             tag:      getSecant,
             retrieve: getSecantOn,
             color:    CLRS.K_PINK_2,
             cursor:   HAND}));
             
          /* Cotangent button   */
          bk.controls.push(new button(360, bk, 15, 150, 110, 20,           
            {text:     "Cot "+CONSTANTS.THETA,
             execute:  toggleCotangent,
             tag:      getCotangent,
             retrieve: getCotangentOn,
             color:    CLRS.TAN_LT,
             cursor:   HAND}));

          /* Excosecant button   */
          bk.controls.push(new button(360, bk, 15, 175, 110, 20,           
            {text:     "Excsc "+CONSTANTS.THETA,
             execute:  toggleExcosecant,
             tag:      getExcosecant,
             retrieve: getExcosecantOn,
             color:    CLRS.K_TEAL_0,
             cursor:   HAND}));
             
          /* Coversine button   */
          bk.controls.push(new button(360, bk, 15, 195, 110, 20,           
            {text:     "Cvs "+CONSTANTS.THETA,
             execute:  toggleCoversine,
             tag:      getCoversine,
             retrieve: getCoversineOn,
             color:    CLRS.K_TEAL_2,
             cursor:   HAND}));

          /* Versine button   */
          bk.controls.push(new button(360, bk, 15, 220, 110, 20,           
            {text:     "Ver "+CONSTANTS.THETA,
             execute:  toggleVersine,
             tag:      getVersine,
             retrieve: getVersineOn,
             color:    CLRS.K_BROWN_1,
             cursor:   HAND}));

          /* Exsecant button   */
          bk.controls.push(new button(360, bk, 15, 240, 110, 20,           
            {text:     "Exsec "+CONSTANTS.THETA,
             execute:  toggleExsecant,
             tag:      getExsecant,
             retrieve: getExsecantOn,
             color:    CLRS.K_ORANGE_1,
             cursor:   HAND}));
             
      // Telemetry --------------------------------------------------
        /* Telemetry          */
        var telem=new legend(300, bk, 600, 30, 200, 570,
          {color:     CLRS.BLACK,
           cursor:    ARROW});

        bk.controls.push(telem);


             
    };

    var incrementTheta=function(){

      app.theta+=1;
      if(app.theta>360){ app.theta=0; }

    };
    var update=function(){
      
      frameRate(app.frameRate);

      background(242);

      if(app.autoRun){ incrementTheta(); }

      for(var c in app.controls){ app.controls[c].draw(); }

    };

    var execute;

    execute=update;

    initialize();

    app.keys[KEYCODES.CONTROL]=false;
    app.keys[KEYCODES.ALT]=false;
    app.keys[KEYCODES.SHIFT]=false;

    var draw=function(){

      execute();

    };

  /* Keyboard Events ================================================== */
  {

      var keyPressed=function(){

        if(app.autoRun===false){

          if     (keyCode===KEYCODES.RIGHT){ increment(); }
          else if(keyCode===KEYCODES.LEFT) { decrement(); }

        }

        app.keys[keyCode]=true;

      };
      var keyTyped=function(){/* println("typed " + (key) + " " + keyCode); */};
      var keyReleased=function(){

        app.keys[keyCode]=false;

      };

  }

  /* Mouse Events ================================================== */
  {

    var mouseClicked=function(){

      switch(mouseButton){

        case LEFT:   for(var c in app.controls){ app.controls[c].clicked();  } break;
        // case RIGHT:  for(var c in app.controls){ app.controls[c].rClicked(); } break;
        // case CENTER: for(var c in app.controls){ app.controls[c].cClicked(); } break;

        default:     break;
      }

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

      for(var c in app.controls){ app.controls[c].out(); }
      app.focus=-1;

    };
    var mouseOver=function(){

      for(var c in app.controls){ app.controls[c].over(); }
      app.focus=-2;

    };

  }






































































// 1729 = 10^3+9^3 = 12^3+1^3
}};
