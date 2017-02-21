/*  TBD

    TO DO:
        
        - Asymtotes
            - Tangent
            - Cotangent
            - Cosecant
            - Secant
        
        - Unit circle on/off (glide)
        - index on/off (glide)
        - convert menu hit to dist()
        - convert to new menus
        - question list
        - Addition and subtraction trig identities
        - Law of cosines
        - Pythagorean identities
        - control theta from within the unit circle
        - set theta by clicking the scale
        - right/left arrows to increment/decrement theta +-=1
        - keyboard controls

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

  size(800, 700); // set size of canvas

  // angleMode="radians";

  var application=function(){

      this.DEBUG=true;          //  mode that displays enhanced debugging tools

      this.mouseX=0;            //  current mouseX location
      this.mouseY=0;            //  current mouseY location

      this.lightsOn=true;
      this.autoPilot=true;

      this.frameRate=60;

      this.theta=0;

      this.data=[];

      this.MIN=0;
      this.MAX=360;

      this.scaleX=90;
      this.scaleY=90;

      this.incr=10;

      //  Display Curves
      this.sinOn=true;
      this.cosOn=true;
      this.tanOn=true;

      this.cscOn=true;
      this.secOn=true;
      this.cotOn=true;

      this.initialize=function(){

        this.loadData();

        if (this.DEBUG) { frameRate(30);              }
        else            { frameRate(this.frameRate);  }

      };

      this.loadData=function(){

          var sinN, cosN, tanN;

          for (var n=this.MIN; n<=this.MAX; n++){

              sinN=sin(radians(n));
              cosN=cos(radians(n));
              tanN=tan(radians(n));

              this.data.push({  sin:  sinN,
                                csc:  1/sinN,
                                cos:  cosN,
                                sec:  1/cosN,
                                tan:  tanN,
                                cot:  1/tanN });
          }

      };


  };

  var app=new application();

  app.initialize();

  // Constants =======================================================
  var CLRS={

    TRANSPARENT:  color(-1,-1,-1),

    RED:          color(170,29,29),       GREEN:        color(158,182,58),
    BLUE:         color(29,86,170),       YELLOW:       color(238,214,15),
    ORANGE:       color(238,136,15),      GRAY:         color(128,128,128),

    BROWN:        color(155,145,135),

    control:      color(128,128,128),     controlF:     color(242,242,242),

    TEXT:         color(255,255,255),

    Red:          color(255,0,0),         RedOrange:    color(255,81,0),
    Orange:       color(255,127,0),       YellowOrange: color(255,190,0),
    Yellow:       color(255,255,0),

    YellowGreen:  color(192,255,0),
    Green:        color(0,255,0),         BlueGreen:    color(0,127,127),
    Blue:         color(0,0,255),         BlueViolet:   color(92,0,255),

    Violet:       color(127,0,255),       RedViolet:    color(191,0,127),

    GRAY1:        color(255*10/11),       GRAY2:        color(255*9/11),
    GRAY3:        color(255*8/11),        GRAY4:        color(255*7/11),
    GRAY5:        color(255*6/11),        GRAY6:        color(255*5/11),
    GRAY7:        color(255*4/11),        GRAY8:        color(255*3/11),
    GRAY9:        color(255*2/11),        GRAY10:       color(255*1/11),
    WHITE:        color(255,255,255),     BLACK:        color(0,0,0),

    BUTTONH:      color(16,16,16),        BUTTON:       color(24,24,24),

    GRID:         color(33,40,48),

    VERTEX:       color(255,255,0),
    VERTEXA:      color(255*6/11),
    LINE:         color(255*6/11),
    LINEA:        color(170,29,29),
    FILL:         color(255*7/11),
    FILLA:        color(255*7/11),

    RULER:        color(231,189,33),

    SELECTED:     color(0,0,255),
    HIT:          color(255,0,0),

    ARROWS:       color(32,32,32),
    AXES:         color(64,64,64),
    TICKS_LT:     color(128,128,128),     TICKS_DARK:       color(32,32,32),
    GRID_LINES_LT:color(192,192,192),     GRID_LINES_DARK:  color(128,128,128),
    LABELS:       color(128,128,128),
    ORIGIN:       color(128,128,128),

    BORDER:       color(128,0,0),

    SIN:          color(170,29,29,255),   SIN_LT:       color(170,29,29,128),
    COS:          color(29,86,170,255),   COS_LT:       color(29,86,170,128),
    TAN:          color(238,214,15,255),  TAN_LT:       color(238,214,15,128),

    CSC:          color(238,136,15,255),  CSC_LT:       color(238,136,15,128),
    SEC:          color(158,182,58,255),  SEC_LT:       color(158,182,58,128),
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
  var getColor=function(clr, alpha){

    return color(red(clr), green(clr), blue(clr), alpha/100*255);

  };

  var unitAxis=function(){

      strokeWeight(0.5);
      stroke(CLRS.COT);
      fill(CLRS.COT);
      line(-50,  0, 50,  0);
      line(  0, 50,  0,-50);

  };

  //  Unit Circle Circle
  var unitCircle=function(){

      stroke(CLRS.COT_LT);
      fill(255,255,255,32);
      strokeWeight(1);
      ellipse(0,0,75,75);

  };

  //  Unit Circle Intercepts
  var unitIntercepts=function(){

      fill(CLRS.COT_LT);
      stroke(CLRS.COT);

      var i=37.5;

      var r=2;

      ellipse( i, 0, r, r);
      ellipse( 0, i, r, r);
      ellipse(-i, 0, r, r);
      ellipse( 0,-i, r, r);

  };

  var unitTrig=function(){

      var x=37.5*cos(app.theta);          //  Apex values
      var y=37.5*sin(app.theta);

      noStroke();
      fill(255, 0, 255, 32);

      triangle(x, y, 0, 0, x, 0);     //  Triangle Interior

      strokeWeight(0.75);             //  Triangle sides
      stroke(CLRS.COT);
      line(0,0,x,y);

      stroke(255, 0, 255, 160);
      strokeWeight(0.5);
      line(0,0,x,0);
      line(x,y,x,0);

      fill(255, 0, 255, 190);
      noStroke();

      var r=2;

      ellipse(x,y,r,r);               // Triangle Apexes
      ellipse(x,0,r,r);
      ellipse(0,0,r,r);

  };

  /*----------- Orthogonal View -----------*/

  // Ortho Axis
  var orthoAxis=function(){

      strokeWeight(0.75);
      stroke(132);

      //  Axis
      line(-5,   0, 575,    0);       //  x-axis
      line( 0, 295,   0, -295);       //  y-axis

      // Arrows
      line(   0,  195,  -5,  190);    //  Top
      line(   0,  195,   5,  190);

      line(   0, -195,  -5, -190);    //  Bottom
      line(   0, -195,   5, -190);

      line( 375,    0, 370,    5);    //  Right
      line( 375,    0, 370,   -5);

  };

  // Ortho Grid
  var orthoGrid=function(){

      strokeWeight(0.25);
      stroke(132);

      // Vertical
      for(var h=22.5; h<=360; h+=22.5){
          line(h, 180+5, h, -180-5);
      }

      // Horizontal
      for(var v=-180; v<=180; v+=22.5){
          line(-5, v, 365, v);
      }


      if(app.lightsOn){   fill(0,0,0,232); }
      else            {   fill(255,255,255,128);       }

      textSize(10);
      scale(1,-1);

      textAlign(CENTER, CENTER);

      text( "2", -10, -180);
      text( "1", -10, -90);
      text( "0", -10,   0);
      text("-1", -10,  90);
      text("-2", -10,  180);

      text( "π/2",  90, 192);
      text(   "π", 180, 192);
      text("3π/2", 270, 192);
      text(  "2π", 360, 192);

      scale(1,-1);

  };

  var drawSin=function(){

      strokeWeight(1.25);
      noFill();
      stroke(CLRS.SIN);

      beginShape();
      for(var n=app.MIN; n<=app.MAX; n+=app.incr){
          vertex(n, app.points[n].sin);
      }
      endShape();

      fill(CLRS.SIN);
      noStroke();
      ellipse(app.theta, app.points[app.theta].sin, 5, 5);

  };

  var drawCos=function(){

      strokeWeight(1.25);
      noFill();
      stroke(CLRS.COS);

      beginShape();
      for(var n=app.MIN; n<=app.MAX; n+=app.incr){
          vertex(n, app.points[n].cos);
      }
      endShape();

      fill(CLRS.COS);
      ellipse(app.theta, app.points[app.theta].cos, 5, 5);

  };

  var drawTan=function(){

      strokeWeight(1.25);
      noFill();
      stroke(CLRS.TAN);

      beginShape();
      for(var n=app.MIN; n<90; n+=app.incr){
          vertex(n, app.points[n].tan);
      }
      endShape();

      beginShape();
      for(var m=91; m<270; m+=app.incr){
          curveVertex(m, app.points[m].tan);
      }
      endShape();

      beginShape();
      for(var o=271; o<=app.MAX; o+=1){
          vertex(o, app.points[o].tan);
      }
      endShape();

      fill(CLRS.TAN);
      ellipse(app.theta, app.points[app.theta].tan, 5, 5);

  };

  var drawCsc=function(){

      strokeWeight(1);
      noFill();
      stroke(CLRS.CSC);

      beginShape();
      for(var n=app.MIN; n<180; n+=app.incr){
          curveVertex(n, app.points[n].csc);
      }
      endShape();

      beginShape();
      for(var m=181; m<=app.MAX; m+=app.incr){
          curveVertex(m, app.points[m].csc);
      }
      endShape();

      fill(CLRS.CSC);
      ellipse(app.theta, app.points[app.theta].csc, 5, 5);

  };

  var drawSec=function(){

      strokeWeight(1);
      noFill();
      stroke(CLRS.SEC);

      beginShape();
      for(var n=app.MIN; n<90; n+=app.incr){
          vertex(n, app.points[n].sec);
      }
      endShape();

      beginShape();
      for(var m=91; m<270; m+=app.incr){
          curveVertex(m, app.points[m].sec);
      }
      endShape();

      beginShape();
      for(var o=271; o<=app.MAX; o++){
          vertex(o, app.points[o].sec);
      }
      endShape();

      fill(CLRS.SEC);
      ellipse(app.theta, app.points[app.theta].sec, 5, 5);

  };

  var drawCot=function(){

      strokeWeight(1);
      noFill();
      stroke(CLRS.COT);

      beginShape();
      for(var n=app.MIN; n<180; n+=app.incr){
          curveVertex(n, app.points[n].cot);
      }
      endShape();

      beginShape();
      for(var m=181; m<=app.MAX; m+=app.incr){
          curveVertex(m, app.points[m].cot);
      }
      endShape();

      fill(CLRS.COT);
      ellipse(app.theta, app.points[app.theta].cot, 5, 5);

  };

  var orthoOrigin=function(){

      fill(0, 0, 0,25);
      stroke(0, 0, 0, 25);
      ellipse(0,0,5,5);

  };

  var draw_Index=function(){

      textAlign(LEFT, CENTER);
      resetMatrix();
      textSize(10);

      strokeWeight(0.5);

      if(app.lightsOn) {  fill(255,255,255,192);
                          stroke(0,0,0,64); }
      else             {  fill(32,32,32,192);
                          stroke(255,255,255,128); }

      rect(100, 5, 205, 75, 5);

      var sin=(app.points[app.theta].sin/app.scaleX).toFixed(4);
      var cos=(app.points[app.theta].cos/app.scaleX).toFixed(4);
      var tan=(app.points[app.theta].tan/app.scaleX).toFixed(4);

      var csc=(app.points[app.theta].csc/app.scaleX).toFixed(4);
      var sec=(app.points[app.theta].sec/app.scaleX).toFixed(4);
      var cot=(app.points[app.theta].cot/app.scaleX).toFixed(4);

      fill(CLRS.SIN);
      text("sin(Θ):  " + sin, 110, 20);
      fill(CLRS.COS);
      text("cos(Θ):  "   + cos, 110, 40);

      fill(CLRS.TAN);
      if(app.theta===90 ||
         app.theta===270) { text("tan(Θ):  infinity", 110, 60); }
      else                { text("tan(Θ):  "   + tan, 110, 60); }

      fill(CLRS.CSC);
      if(app.theta===0 || app.theta===180) {
             text("csc(Θ):  infinity", 210, 20); }
      else { text("csc(Θ):  "   + csc, 210, 20); }

      fill(CLRS.SEC);
      if(app.theta===90 || app.theta===270) {
             text("sec(Θ):  infinity", 210, 40); }
      else { text("sec(Θ):  "   + sec, 210, 40); }

      fill(CLRS.COT);
      if(app.theta===0 || app.theta===180) {
             text("cot(Θ):  infinity", 210, 60); }
      else { text("cot(Θ):  "   + cot, 210, 60); }

  };

  var Ortho=function(){

      resetMatrix();
      scale(1,-1);
      translate(19.5,-300.5);

      orthoAxis();
      orthoGrid();
      orthoOrigin();

      if(app.sinOn) { drawSin(); }
      if(app.cosOn) { drawCos(); }
      if(app.tanOn) { drawTan(); }

      if(app.cscOn) { drawCsc(); }
      if(app.secOn) { drawSec(); }
      if(app.cotOn) { drawCot(); }

  };

  var unit=function(){

      resetMatrix();
      scale(1,-1);
      translate(87.5,-290.5);
      unitAxis();
      unitCircle();
      unitIntercepts();
      unitTrig();

  };

  var menu=function(){

      noStroke();
      textAlign(RIGHT, CENTER);
      var menuTop=35;
      var r=10;
      var w=20;
      var l=380;
      var l2=320;
      var t=330;

      var menus={ SIN:    1,
                  COS:    2,
                  TAN:    3,
                  CSC:    4,
                  SEC:    5,
                  COT:    6
      };

      this._hit=function(x,y){

          if(x>380) {
          if    (y>menuTop &&
                       y<menuTop+20)  { return menus.SIN;  }
        else if  (y>menuTop+20 &&
                       y<menuTop+40)  { return menus.COS;}
        else if  (y>menuTop+40 &&
                       y<menuTop+60)  { return menus.TAN;}
        else if  (y>menuTop+70 &&
                       y<menuTop+90)  { return menus.CSC;}
        else if  (y>menuTop+90 &&
                       y<menuTop+110) { return menus.SEC;}
              else if  (y>menuTop+110 &&
                       y<menuTop+130) { return menus.COT;}
        else          { return 0; }
      }

      };

      this.hit=function(x,y){

        if(this._hit(x,y)===menus.SIN) { app.sinOn=!app.sinOn; }
        if(this._hit(x,y)===menus.COS) { app.cosOn=!app.cosOn; }
        if(this._hit(x,y)===menus.TAN) { app.tanOn=!app.tanOn; }
        if(this._hit(x,y)===menus.CSC) { app.cscOn=!app.cscOn; }
        if(this._hit(x,y)===menus.SEC) { app.secOn=!app.secOn; }
        if(this._hit(x,y)===menus.COT) { app.cotOn=!app.cotOn; }
      };

      this._border=function(){        fill(0);
                          //stroke(121);
                                      stroke(0);
                          strokeWeight(0.5);

          if(app.lightsOn) {  fill(255);
                              stroke(0,0,0,0); }
          else             {  fill(32,32,32,192);
                              stroke(0,0,0,128); }
      };
      this._focusBorder=function(){   fill(48);
                      stroke(242);
                                      strokeWeight(0.5);
                                      textSize(12);

          if(app.lightsOn) {  fill(255,255,255,192);
                              stroke(0,0,0,64); }
          else             {  fill(32,32,32,192);
                              stroke(255,255,255,128); }
      };
      this.refresh=function(x,y) {

          textSize(12);
          textAlign(LEFT, CENTER);

          if(this._hit(x,y)===menus.SIN){
                  this._focusBorder();
                  rect(l2,menuTop,90,20,r);
                  if(app.sinOn) { fill(CLRS.SIN);
                                    stroke(CLRS.SIN); }
                  else            { fill(CLRS.SIN_LT);
                                    stroke(CLRS.SIN_LT); }

                  ellipse(l+10,menuTop+10,10,r);

                  if(app.lightsOn) {  fill(0); }
                  else             { fill(CLRS.TEXT); }
                  text("Sine",t,menuTop+11);
          }
          else{   this._border();
                  rect(l,menuTop,70,w,r);
                  if(app.sinOn) { fill(CLRS.SIN);
                                    stroke(CLRS.SIN); }
                  else            { fill(CLRS.SIN_LT);
                                    stroke(CLRS.SIN_LT); }

                  ellipse(l+10,menuTop+10,10,r);
          }

          if(this._hit(x,y)===menus.COS){
                  this._focusBorder();
                  rect(l2,menuTop+20,90,w,r);
                  if(app.cosOn) { fill(CLRS.COS);
                                  stroke(CLRS.COS); }
                  else          { fill(CLRS.COS_LT);
                                  stroke(CLRS.COS_LT); }
                  ellipse(l+10,menuTop+30,10,r);
                  if(app.lightsOn) {  fill(0); }
                  else             { fill(CLRS.TEXT); }
                  text("Cosine", t,menuTop+31); }
          else{   this._border();
                  rect(l,menuTop+20,30,w,r);
                  if(app.cosOn) { fill(CLRS.COS);
                                  stroke(CLRS.COS); }
                  else      { fill(CLRS.COS_LT);
                                  stroke(CLRS.COS_LT); }
                  ellipse(l+10,menuTop+30,r,r); }

          if(this._hit(x,y)===menus.TAN){
                  this._focusBorder();
                  rect(l2,menuTop+40,90,w,r);
                  if(app.tanOn) { fill(CLRS.TAN);
                                   stroke(CLRS.TAN); }
                  else           { fill(CLRS.TAN_LT);
                                   stroke(CLRS.TAN_LT);}
                  ellipse(l+10,menuTop+50,r,r);
                  if(app.lightsOn) {  fill(0); }
                  else             { fill(CLRS.TEXT); }
                  text("Tangent", t,menuTop+51); }
          else{   this._border();
                  rect(l,menuTop+40,30,w,r);
                  if(app.tanOn) { fill(CLRS.TAN);
                                   stroke(CLRS.TAN); }
                  else           { fill(CLRS.TAN_LT);
                                   stroke(CLRS.TAN_LT); }
                  ellipse(l+10,menuTop+50,r,r); }

          if(this._hit(x,y)===menus.CSC){
                  this._focusBorder();
                  textSize(10);
                  rect(l2,menuTop+70,90,w,r);
                  if(app.cscOn) { fill(CLRS.CSC);
                                     stroke(CLRS.CSC); }
                  else             { fill(CLRS.CSC_LT);
                                     stroke(CLRS.CSC_LT);}
                  ellipse(l+10,menuTop+80,r,r);
                  if(app.lightsOn) {  fill(0); }
                  else             { fill(CLRS.TEXT); }
                  text("Cosecant", t,menuTop+81); }
          else{   this._border();
                  rect(l,menuTop+70,30,w,r);
                  if(app.cscOn) { fill(CLRS.CSC);
                                     stroke(CLRS.CSC); }
                  else             { fill(CLRS.CSC_LT);
                                     stroke(CLRS.CSC_LT); }
                  ellipse(l+10,menuTop+80,r,r); }

          if(    this._hit(x,y)===menus.SEC){
                  this._focusBorder();
                  rect(l2,menuTop+90,90,w,r);
                  if(app.secOn) { fill(CLRS.SEC);
                                     stroke(CLRS.SEC); }
                  else             { fill(CLRS.SEC_LT);
                                     stroke(CLRS.SEC_LT);}
                  ellipse(l+10,menuTop+100,r,r);
                  if(app.lightsOn) {  fill(0); }
                  else             { fill(CLRS.TEXT); }
                  text("Secant", t,menuTop+101); }
          else{   this._border();
                  rect(l,menuTop+90,30,w,r);
                  if(app.secOn) { fill(CLRS.SEC);
                                     stroke(CLRS.SEC); }
                  else             { fill(CLRS.SEC_LT);
                                     stroke(CLRS.SEC_LT); }
                  ellipse(l+10,menuTop+100,r,r); }

          if(     this._hit(x,y)===menus.COT){
                  this._focusBorder();
                  textSize(10);
                  rect(l2,menuTop+110,90,w,r);
                  if(app.cotOn) { fill(CLRS.COT);
                                     stroke(CLRS.COT); }
                  else             { fill(CLRS.COT_LT);
                                     stroke(CLRS.COT_LT);}
                  ellipse(l+10,menuTop+120,r,r);
                  if(app.lightsOn) {  fill(0); }
                  else             { fill(CLRS.TEXT); }
                  text("Cotangent", t,menuTop+121); }
          else{   this._border();
                  rect(l,menuTop+110,30,w,r);
                  if(app.cotOn) { fill(CLRS.COT);
                                     stroke(CLRS.COT); }
                  else             { fill(CLRS.COT_LT);
                                     stroke(CLRS.COT_LT); }
                  ellipse(l+10,menuTop+120,r,r); }

      };

  };

  var menu=new menu();

  var draw_Lights=function(){

      var top=5;
      var left=390;

      noFill();

      if(app.lightsOn){   stroke(0);
                          strokeWeight(2);
                          arc(left,top+7,10,10,-45,225);
                          line(left,top+1,left,12);
                          app.autoPilot=true; }
      else            {   stroke(212);
                          strokeWeight(2);
                          arc(left,top+7,10,10,-135,135);
                          line(left,12,left-7,12);
                          app.autoPilot=false; }

  };

  var initialize=function(){

      if(app.lightsOn){   background(255); }
      else            {   background(0);   }

      draw_Lights();

      fill(248);
      rect(20, 20, 360, 360);
      unit();
      Ortho();

      resetMatrix();
      menu.refresh(mouseX, mouseY);

      if(app.lightsOn){  fill(0);   }
      else            {  fill(192); }

      textSize(10);
      textAlign(CENTER, CENTER);
      text(app.theta + "º", 90,350);

      draw_Index();

      if (app.autoPilot)  { app.theta+=1; app.theta%=360;}

  };

  // Controls =========================================================

  // Control ===========================================================
  var control=function(x_coord, y_coord, width, height){
  // var control=function(c,l,a,ctrls){

    // controls properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // this.i=c.i;                 // guid
    // this.parent=c.p;            // parent

    this.x=x_coord;             // left
    this.y=y_coord;             // top
    this.w=width;               // width
    this.h=height;              // height

    // this.k=c.k;                // hit cursor

    // this.v=c.v;                // value
    // this.c=c.c;                // command
    // this.g=c.g;                // tag


    // appearance properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // this.fill=l.fill;          // fill color
    // this.fillH=l.fillH;        // fill color highlight
    // this.stroke=l.stroke;      // stroke color
    // this.strokeH=l.strokeH;    // stroke color highlight

    // this.weight=l.weight;      // strokeWeight
    // this.weightH=l.weightH;    // strokeWeight highlight


    // text properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // this.text=a.text;          // text caption

    // this.tfill=a.fill;         // text color
    // this.tfillH=a.fillH;       // text color highlight
    // this.alignX=a.alignX;      // horizontal alignment
    // this.alignY=a.alignY;      // vertical alignment
    // this.size=a.size;          // text size
    // this.sizeH=a.sizeH;        // text size highlight

    // misc properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.hit=false;             // mouse is over the control

    this.visible=true;          // is the control currently being displayed
    // this.ctrls=ctrls;           // array of child controls

  };
  control.prototype.draw=function(){

    for(var c in this.ctrls){ this.ctrls[c].draw(); }

  };
  control.prototype.clicked=function(){

    if(this.hit && app.left){
      commands(this.c, this.g);
      for(var c in this.ctrls){ this.ctrls[c].clicked(); }
    }

  };
  control.prototype.clickedR=function(){
    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].clickedR(); }
    }
  };
  control.prototype.moved=function(x,y){

    // if(this.alignX===LEFT){

    //   if(app.mouseX>x+this.x && app.mouseX<x+this.x+this.w &&
    //     app.mouseY>y+this.y && app.mouseY<y+this.y+this.h){

    //     this.hit=true;
    //     app.focus=this.i;

    //   }
    //   else{
    //     this.hit=false;
    //   }

    // }
    // else if(this.alignX===CENTER){

    //   if(app.mouseX>=x+this.x-this.w/2 && app.mouseX<=x+this.x+this.w/2 &&
    //     app.mouseY>=y+this.y-this.h/2 && app.mouseY<=y+this.y+this.h/2){

    //     this.hit=true;
    //     app.focus=this.i;

    //   }
    //   else{
    //     this.hit=false;
    //   }

    // }
    // else if(this.alignX===RIGHT){

    //   if(app.mouseX>x+this.x && app.mouseX<x+this.x+this.w &&
    //     app.mouseY>y+this.y && app.mouseY<y+this.y+this.h){

    //     this.hit=true;
    //     app.focus=this.i;

    //   }
    //   else{
    //     this.hit=false;
    //   }

    // }
    // else{}

    for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x, y+this.y); }

  };
  control.prototype.dragged=function(){

    for(var c in this.ctrls){ this.ctrls[c].dragged(); }

  };
  control.prototype.pressed=function(){

    for(var c in this.ctrls){ this.ctrls[c].pressed(); }

  };
  control.prototype.released=function(){
    // this.hit=false;

    for(var c in this.ctrls){ this.ctrls[c].released(); }

  };
  control.prototype.typed=function(){

    for(var c in this.ctrls){ this.ctrls[c].typed(); }

  };
  control.prototype.over=function(){

    for(var c in this.ctrls){ this.ctrls[c].over(); }

  };
  control.prototype.out=function(){

    this.hit=false;
    for(var c in this.ctrls){ this.ctrls[c].out(); }

  };

  // Graph ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var graph=function(x_coord, y_coord, width, height){

      control.call(this, x_coord, y_coord, width, height);

      // control.call(this,c,l,a,ctrls);

      // app.factor=     this.h/22;   // required for initial grid height

      // this.shapes=    [];
      // this.Temp=      0;

      // this.cX=        0;
      // this.cY=        0;

      // this.originX=   0;
      // this.originY=   0;

      // this.offsetX=   0;
      // this.offsetY=   0;

      // this.hitProp=   false;

    };
    graph.prototype=Object.create(control.prototype);
    graph.prototype.draw=function(){

      //  each end of a non-contiguous curve requires 2 terminating points

      var p=this;

      noFill();
      strokeWeight(0.75);

      var min=0;
      var max=360;
      
      // var n=0;        //  number iterator
      var h=540;      //  height
      var h2=h/2;     //  height / 2
      var gw=h/16;    //  grid width
      var f=4*gw;     //  multiplier to account for grid size

      var borderColor=color(CLRS.BORDER);

      var innerHit=false;

      // Shape Options
      // POINTS, LINES, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, QUADS, QUAD_STRIP
      // Example: shape(TRIANGLE_FAN);

      var border=function(){

        if(p.hit){

          noFill();
          stroke(borderColor);
          strokeWeight(0.5);

          rect(-20, -p.h/2, p.w, p.h);

          if(p.innerHit){

            stroke(CLRS.BLUE);
            strokeWeight(2);

            rect(0,-270,540,540);

          }

        }

      };
      var origin=function(){

        strokeWeight(1);
        noStroke();
        fill(96);

        ellipse(0,0,3,3);

      }

      var axes=function(){

        noFill();
        stroke(CLRS.AXES);
        strokeWeight(1);

        line(-5,        0, p.w-30,       0); // x-axis
        line(0, -p.h/2+5,      0, p.h/2-5); // y-axis

      };
      var arrows=function(){

        fill(CLRS.ARROWS);
        noStroke();

        quad(555, 0, 545, -3, 547, 0, 545, 3);    // x-right
        // quad(-20, 0, -10, -3, -12, 0, -10, 3);    // x-left

        quad(0,  285, -3,  275, 0,  277, 3,  275);    // y-top
        quad(0, -285, -3, -275, 0, -277, 3, -275);    // y-bottom

      };
      var grid=function(){

        var n=0;

        noFill();
        strokeWeight(1);
        stroke(CLRS.GRID_LINES);

        // Horizontal lines
        for(n=1; n<p.h/gw/2; n++){

          if(n%4==0){ stroke(CLRS.GRID_LINES_DARK); }
          else      { stroke(CLRS.GRID_LINES_LT);   }

          line(-5, n*gw, 545, n*gw);
          line(-5,-n*gw, 545,-n*gw);

        }

        // Vertical lines
        for(n=1; n<(p.w-20)/gw; n++){

          if(n%4==0){ stroke(CLRS.GRID_LINES_DARK); }
          else      { stroke(CLRS.GRID_LINES_LT);   }

          line( n*gw, 275, n*gw, -275);

        }

      };
      var ticks=function(){

        var n=0;

        // Y-Axis
        for(n=gw; n<p.h/2-10; n+=gw){

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
        for(n=gw; n<p.w-20; n+=gw){

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

            // x-axis
            // for(n=1; n<w/gw-1; n++){

              // if(n%4==0){
                // text(n, n*gw+30, h);
              // }

            // }

            text( "π/2",  gw*4+20, 585);
            text(   "π",  gw*8+20, 585);
            text("3π/2", gw*12+20, 585);
            text(  "2π", gw*16+20, 585);

            textAlign(RIGHT,CENTER);

            text("0",13,310);

            // y-axis
            for(n=1; n<p.h/2/gw; n++){

              if(n%4==0){
                text( n/4, 13, 310-n*gw);  //  Positive y-axis
                text(-n/4, 13, 310+n*gw);  //  Negative y-axis
                // println(n/4);
              }

            }

        popMatrix();

      };
      var quadrants=function(){

        var unit=10;
        var left=10+20*unit;

        fill(CLRS.GRAY);
        textSize(80);
        textAlign(CENTER,BOTTOM);

        text("I",    4*unit, 0);
        text("II",  12*unit, 0);
        text("III", 20*unit, 0);
        text("IV",  28*unit, 0);

      };
      var grid2=function(){

        // noFill();
        // stroke(16);

        // pushMatrix();

        //   translate(this.x, this.h/2);
        //   scale(1,-1);

        //   fill(CLRS.BLACK);

        //   // rect(0, h/2-2, w, -h);

        //   // line(0,0,w,h)

        //   stroke(16);
        //   // stroke(CLRS.RED);
        //   strokeWeight(1);

        //   // y-axis
        //   var s=app.unit*2;

        //   for(var x=0; x<w/s; x++){

        //     if(x%4===0) { strokeWeight(1);  }
        //     else        { strokeWeight(0.5);  }

        //     line(x*s, -h/2, x*s, h/2);

        //   }

        //   // x-axis
        //   for(var y=0; y<h/s; y++){

        //     if(y%4===0) { strokeWeight(1);  }
        //     else        { strokeWeight(0.5);  }

        //     line(0, -y*s, w, -y*s);
        //     line(0,  y*s, w,  y*s);

        //   }

        //   stroke(64);
        //   strokeWeight(1);

        //   line(0, h/2, 0, -h/2);    // x-axis
        //   line(0, 0, w, 0);     // y-axis

        //   // arrows
        //   noStroke();
        //   fill(96);

        //   var w2=w/2;
        //   var sp=app.unit;
        //   var base=w+sp;

        //   // quad(base,     0,
        //   //     base+10,  4,
        //   //     base+7,   0,
        //   //     base+10, -4);

        //   base=w;

        //   quad(base,     0,
        //       base-10,  4,
        //       base-7,   0,
        //       base-10, -4);

        //   noStroke();
        //   fill(96);

        //   base=h/2;

        //   quad( 0, base,
        //         4, base-10,
        //         0, base-7,
        //       -4, base-10);

        //   base=-h/2;

        //   quad( 0, base,
        //         4, base+10,
        //         0, base+7,
        //       -4, base+10);

        // popMatrix();

      }

      var sineCurve=function(){

        stroke(CLRS.SIN);
        noFill();

        // beginShape(m);
        beginShape();

          var x=0;
          var y=app.data[0].sin;

          curveVertex(x,y);

            for(var n=app.MIN; n<=app.MAX; n++){

              x=n/app.MAX*h;
              y=app.data[n].sin*4*gw;

              curveVertex(x, y);

            }

          curveVertex(x,y);

        endShape();
        
        if(p.innerHit){
          
          stroke(CLRS.SIN);
          fill(CLRS.SIN);
          
          ellipse(mouseX-20, app.data[app.theta].sin*4*gw, 5, 5);
          
        }
        
      };
      var cosineCurve=function(){

        stroke(CLRS.COS);
        noFill();

        var x=0;
        var y=app.data[0].cos*4*gw;
        
        beginShape();

          curveVertex(x,y);

            for(var n=app.MIN; n<=app.MAX; n++){

              x=n/app.MAX*h;
              y=app.data[n].cos*4*gw;

              curveVertex(x, y);

            }

          curveVertex(x,y);

        endShape();

        if(p.innerHit){
          
          stroke(CLRS.COS);
          fill(CLRS.COS);
          
          ellipse(mouseX-20, app.data[app.theta].cos*4*gw, 5, 5);
          
        }
        
      };
      var tangentCurve=function(){
        
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

        endShape();

        beginShape();

          for(n=91; n<270; n++){

            x=n/app.MAX*h;
            y=app.data[n].tan*f;

            if(y>=-h2 && y<=h2){ curveVertex(x, y); }

          }

        endShape();

        beginShape();

          for(n=271; n<=app.MAX; n++){

            x=n/app.MAX*h;
            y=app.data[n].tan*f;

            if(y>=-h2 && y<=h2){ curveVertex(x, y); }

          }

          curveVertex(x,y);

        endShape();

        if(p.innerHit){
          
          var val=app.data[app.theta].tan*f;
          
          if(val>=-h2 && val<=h2){
                      
            stroke(CLRS.TAN);
            fill(CLRS.TAN);
            
            ellipse(mouseX-20, val, 5, 5);

          }

        }
        
      };
      var cosecantCurve=function(){
        
        noFill();
        stroke(CLRS.CSC);

        var x=0;
        var y=0;
        var n=0;
        
        beginShape();

          for(n=app.MIN; n<180; n++){

            x=n/app.MAX*h;
            y=app.data[n].csc*4*gw;

            if(y>=-h2 && y<=h2){ curveVertex(x, y); }

          }

        endShape();

        beginShape();

          for(n=181; n<app.MAX; n++){

            x=n/app.MAX*h;
            y=app.data[n].csc*4*gw;

            if(y>=-h2 && y<=h2){ curveVertex(x, y); }

          }

        endShape();

        if(p.innerHit){
          
          var val=app.data[app.theta].csc*4*gw;
          
          if(val>=-h && val<=h){

            stroke(CLRS.CSC);
            fill(CLRS.CSC);

            ellipse(mouseX-20, val, 5, 5);

          };

        }
        
      };
      var secantCurve=function(){
        
        noFill();
        stroke(CLRS.SEC);

        var x=0;
        var y=app.data[0].sec;
        var n=0;
        
        beginShape();

          curveVertex(x, y);

          for(n=app.MIN; n<90; n++){

            x=n/app.MAX*h;
            y=app.data[n].sec*4*gw;

            if(y>=-h2 && y<=h2){ curveVertex(x, y); }

          }

        endShape();

        beginShape();

          for(n=91; n<270; n++){

            x=n/app.MAX*h;
            y=app.data[n].sec*4*gw;

            if(y>=-h2 && y<=h2){ curveVertex(x, y); }

          }

        endShape();

        beginShape();

          for(n=271; n<=app.MAX; n++){

            x=n/app.MAX*h;
            y=app.data[n].sec*4*gw;

            if(y>=-h2 && y<=h2){ curveVertex(x, y); }

          }

          curveVertex(x, y);

        endShape();

        if(p.innerHit){
          
          var val=app.data[app.theta].sec*4*gw;
          
          if(val>=-h2 && val<=h2){

            stroke(CLRS.SEC);
            fill(CLRS.SEC);

            ellipse(mouseX-20, val, 5, 5);

          };

        }
        
      };
      var cotangentCurve=function(){
        
        noFill();
        stroke(CLRS.COT);

        var x=0;
        var y=0;
        var n=0;

        beginShape();

          for(n=app.MIN; n<180; n++){

            x=n/app.MAX*h;
            y=app.data[n].cot*4*gw;

            if(y>=-h2 && y<=h2){ curveVertex(x, y); }

          }

        endShape();

        beginShape();

          for(n=181; n<=app.MAX; n++){

            x=n/app.MAX*h;
            y=app.data[n].cot*4*gw;

            if(y>=-h2 && y<=h2){ curveVertex(x, y); }

          }

        endShape();

        if(p.innerHit){
          
          var val=app.data[app.theta].cot*4*gw;
          
          if(val>=-h2 && val<=h2){

            stroke(CLRS.COT);
            fill(CLRS.COT);

            ellipse(mouseX-20, val, 5, 5);

          };

        }
        
      };

      var values=function(){

        var x, y, sz=10;

        // Current location
        x=mouseX-app.border-20*app.unit;

        var index=round(x/p.w*720);

        if(x>=0 && x<=w){

          noStroke();

          // Cursor ---------------------
          fill(CLRS.GRAY10);

          ellipse(x,0,sz,sz);

          // Sine -----------------------
          fill(CLRS.SIN);

          y=-app.data[index].sin;
          ellipse(x,y,sz,sz);

          // Cosecant -------------------
          fill(CLRS.CSC);

          y=-app.data[index].csc;
          ellipse(x,y,sz,sz);

          // Cosine ---------------------
          fill(CLRS.COS);

          y=-app.data[index].cos;
          ellipse(x,y,sz,sz);

          // Secent ---------------------
          fill(CLRS.SEC);

          y=-app.data[index].sec;
          ellipse(x,y,sz,sz);

          // Tangent --------------------
          fill(CLRS.TAN);

          y=-app.data[index].tan;
          ellipse(x,y,sz,sz);

          // Cotangent ------------------
          fill(CLRS.COT);

          y=-app.data[index].cot;
          ellipse(x,y,sz,sz);

        }

        noFill();

      };

      var unitCircle=function(){
        
        pushMatrix();
        
          translate(84.375,-135);
            
            // Axes
            strokeWeight(1.125);
            stroke(CLRS.BLACK);
            
            line(-75, 0, 75, 0);
            line(0, -75, 0, 75);
            
            //  Circle
            fill(getColor(CLRS.GRAY,20));
            strokeWeight(1.25);
            stroke(getColor(CLRS.RED,75));
            
            ellipse(0, 0, 123, 123);
            
            //  Intersesctions
            noStroke();
            fill(getColor(CLRS.BLACK,40));

            ellipse(0,61.5,5,5);
            
        popMatrix();
        
      };
      pushMatrix();

        // translate(app.border+20*app.unit, height/2);
        translate(this.x+0.5, this.y+0.5);
        scale(1,-1);

          noFill();

          border();
          axes();
          grid();
          arrows();
          origin();
          ticks();
          labels();
          
          unitCircle();

          // if(app.quadrantsOn) { quadrants();     }
                    
          if(app.sinOn){ sineCurve();       }
          if(app.cscOn){ cosecantCurve();   }  

          if(app.cosOn){ cosineCurve();     }
          if(app.secOn){ secantCurve();     }

          if(app.tanOn){ tangentCurve();    }
          if(app.cotOn){ cotangentCurve();  }



          values();

      popMatrix();

    };

    graph.prototype.clicked=function(){
      for(var c in this.ctrls){ this.ctrls[c].clicked(0,0); }
    };
    graph.prototype.moved=function(x,y){

      if(mouseX>x+0 &&
         mouseX<x+580 &&
         mouseY>y+20 &&
         mouseY<y+600){

        this.hit=true;

        if(mouseX>=20 &&
           mouseX<=560 &&
           mouseY>=30 &&
           mouseY<=580){

          this.innerHit=true;
          app.theta=round(map(mouseX-20,0,540,0,360));

        }
        else{

          this.innerHit=false;

        }
        // for(var c in this.ctrls){ this.ctrls[c].moved(x,y); }

      }
      else{

        this.hit=false;

        // println("miss");

      }
  // println(mouseX+","+mouseY);

    };
    graph.prototype.dragged=function(x,y){

      if(this.hit){
        for(var c in this.ctrls){ this.ctrls[c].dragged(); }
      }

    };
    graph.prototype.pressed=function(){

      if(this.hit){
        for(var c in this.ctrls){ this.ctrls[c].pressed(); }
      }

    };
    graph.prototype.released=function(){

      if(this.hit){
        for(var c in this.ctrls){ this.ctrls[c].released(); }
      };

    };
    graph.prototype.typed=function(){

      if(app.keys[KEYCODES.SPACE]){
        this.vertices=[];
        this.temp=0;
      }

      if(app.keys[KEYCODES.CONTROL] &&
         app.keys[KEYCODES.Z]){
        this.shapes.splice(this.shapes.length-1,1);
        process();
      }

    };
    graph.prototype.mouseOut=function(){
      this.hit=false;
    };
    graph.prototype.mouseOver=function(){

    };

  }
  
  var Graph=new graph(21, 309, 580, 580);

  var telemetry=function(){

    // Border
    fill(getColor(CLRS.BLACK,90));
    stroke(1);

    rect(600,0,199,599);

    var h=15;

    var row0=20;
    var row1=row0 +h;
    var row2=row0 +2*h;
    var row3=row0 +3*h;
    var row4=row0 +4*h;
    var row5=row0 +5*h;
    var row6=row0 +6*h;
    var row7=row0 +7*h;
    var row8=row0 +8*h;
    var row9=row0 +9*h;
    var row10=row0+10*h;
    var row11=row0+11*h;
    var row12=row0+12*h;
    var row13=row0+13*h;

    var row14=row0+14*h;
    var row15=row0+15*h;
    var row16=row0+16*h;
    var row17=row0+17*h;
    var row18=row0+18*h;
    var row19=row0+19*h;
    var row20=row0+20*h;
    var row21=row0+21*h;
    var row22=row0+22*h;
    var row23=row0+23*h;
    
    var col0=620;
    var col1=630;
    var col2=720;

    fill(200);

    textAlign(LEFT,CENTER);
    textSize(12);

    // text("Cursor:",     col0, row0);

    text("x: ",           col1, row1);
    text("y: ",           col1, row2);

    text(mouseX,          col2, row1);
    text(mouseY,          col2, row2);

    text("Sine On:",      col1, row4);
    text("Cosine On:",    col1, row5);
    text("Tangent On:",   col1, row6);
    text("Cosecant On:",  col1, row7);
    text("Secant On:",    col1, row8);
    text("Cotangent On:", col1, row9);

    text(app.sinOn,       col2, row4);
    text(app.cosOn,       col2, row5);
    text(app.tanOn,       col2, row6);
    text(app.cscOn,       col2, row7);
    text(app.secOn,       col2, row8);
    text(app.cotOn,       col2, row9);

    text("Sine:",         col1, row11);
    text("Cosine:",       col1, row12);
    text("Tangent:",      col1, row13);
    text("Cosecant:",     col1, row14);
    text("Secant:",       col1, row15);
    text("Cotangent:",    col1, row16);

    text(nf(sin(radians(app.theta)),1,3),   col2, row11);
    text(nf(cos(radians(app.theta)),1,3),   col2, row12);
    // text(nf(tan(radians(app.theta)),1,3),   col2, row13);
    // text(nf(1/sin(radians(app.theta)),1,3), col2, row14);
    // text(nf(1/cos(radians(app.theta)),1,3), col2, row15);
    // text(nf(1/tan(radians(app.theta)),1,3), col2, row16);
    
    text("Theta ("+CONSTANTS.THETA+"):",      col1, row18);
    text(app.theta,     col2, row18);

  };

  var draw= function() {

    background(255);

    // initialize();
    //println(mouseX-20 + "," + mouseY);
    Graph.draw(30,-300);

    if(app.DEBUG){
      telemetry();
    }

  };

  // Mouse Events
  {

    var mouseClicked=function(){

      // menu.hit(mouseX, mouseY);

      // if(dist(mouseX, mouseY, 390,12)<8){
      //   app.lightsOn=!app.lightsOn;
      // }

    };
    var mouseOut=function(){

      Graph.mouseOut();
      // menu.refresh(100,100);

    };
    var mouseMoved=function(){

      app.mouseX=mouseX;
      app.mouseX=mouseY;


      Graph.moved(0,0);

      // if (mouseX>19 && mouseX<380){
      //   if(!app.autoPilot){

      //     app.theta=mouseX-20;

      //   }
      // }

      //debug(mouseX + "," + mouseY);

    };
    var mouseOver=function(){

      Graph.mouseOver();
      // app.autoPilot=false;

    };

  }

}};
