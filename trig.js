/*
    ============================================================================
        double_slit.js
    ===========================================================================
*/
/* @pjs globalKeyEvents="true"; */
var diagrams = function(processingInstance){
  with (processingInstance){

  // size(window.innerWidth-10, window.innerHeight-10); // set size of canvas

  // √ ∛ ∜ ∝ ∞ ∟
  
  //  textFont(createFont("san-serif", 20), 32);
  //  textFont(createFont("serif", 20), 32);
  //  textFont(createFont("fantasy", 20), 32);
  //  textFont(createFont("monospace", 20), 32);
  //  textFont(createFont("cursive", 20), 32);

  angleMode="radians";

  // Constants =======================================================
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
  var CLRS={

    TRANSPARENT:  color(-1,-1,-1),

    WHITE:        color(255,255,255),     BLACK:        color(0,0,0),
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

    Gray1:        color(255*10/11),       Gray2:        color(255*9/11),
    Gray3:        color(255*8/11),        Gray4:        color(255*7/11),
    Gray5:        color(255*6/11),        Gray6:        color(255*5/11),
    Gray7:        color(255*4/11),        Gray8:        color(255*3/11),
    Gray9:        color(255*2/11),        Gray10:       color(255*1/11),
    White:        color(255,255,255),     Black:        color(0,0,0),

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

    SIN:          color(170,29,29,255),   SIN_LT:       color(170,29,29,128),
    COS:          color(29,86,170,255),   COS_LT:       color(29,86,170,128),
    TAN:          color(238,214,15,255),  TAN_LT:       color(238,214,15,128),

    CSC:          color(238,136,15,255),  CSC_LT:       color(238,136,15,128),
    SEC:          color(158,182,58,255),  SEC_LT:       color(158,182,58,128),
    COT:          color(128,128,128,255), COT_LT:       color(128,128,128,128)

  };
  var COMMANDS={
    UP:         2,
    DOWN:       3,
    PLAY:       4,
    INCREMENT:  5,
    DECREMENT:  6,
    RESET:      7,
    MENU:       8,
    RIGHT:      80,
    LEFT:       72,
    SIN:        84,
    COS:        70,
    TAN:        83,
    CSC:        38,
    SEC:        40,
    COT:        39,
    CTRL:       17
  };

  // Utility =======================================================
  var getGUID=function(){

    // return year()   + ''  +
           // month()  + ''  +
           // day()    + ''  +
           // hour()   + ''  +
           // minute() + ''  +
           // second() + ''  +
           // millis() + ''  +
           // round(random(10e15));

    return random(10e15);

  };

  var getColor=function(clr, alpha){

    return color(red(clr), green(clr), blue(clr), alpha/100*255);

  };

  var hexToRGB=function(hexStr){
    
    // note: hexStr should be #rrggbb
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b =  hex & 0x0000ff;
    
    return color(r,g,b);

  }

  var hexToRGBA=function(hexStr,a){

    // note: hexStr should be #rrggbb
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b =  hex & 0x0000ff;
    
    return color(r,g,b,a);

  }

  var app={

    background:   0,

    height:       window.innerHeight-10,
    width:        window.innerWidth-10,

    mouseX:       0,
    mouseY:       0,
    
    border:       0,

    unit:         0,

    paneRightX:   0,
    paneRightY:   0,
    paneRightW:   0,
    paneRightH:   0,

    paneLeftX:    0,
    paneLeftY:    0,
    paneLeftW:    0,
    paneLeftH:    0,

    debug:        true,
    running:      true,
  
    pressed:      false,
    lightsOn:     false,
    speed:        30,
  
    size:         5,
  
    index:        0,
    incr:         1,
  
    thetaD:       0,
    thetaR:       0,

    min:          0,        max:      720,

    scaleX:       90,       scaleY:   2,

    sineOn:       true,     cosecantOn:   true,
    cosineOn:     true,     secantOn:     true,
    tangentOn:    true,     cotangentOn:  true,
    
    ctrls:        [],

    data:         []

  };

  // var loadData=function(){

  //   max=[];

  //   var s=0;
  //   var c=0;
  //   var t=0;

  //   for (var n=app.min; n<=app.MAX; n++){

  //     s=sin(radians(n));
  //     c=cos(radians(n));
  //     t=tan(radians(n));

  //     max.push([s*app.scaleY, 1/s*app.scaleY,
  //               c*app.scaleY, 1/c*app.scaleY,
  //               t*app.scaleY, 1/t*app.scaleY]);
  //   }

  // };

  //  Generic control properties
  var prop=function(i,x,y,w,h,t,f,v,c,s,l){
      this.i=i;     //  index
      this.x=x;     //  left
      this.y=y;     //  top
      this.w=w;     //  width
      this.h=h;     //  height
      this.t=t;     //  control type
      this.f=f;     //  execute function
      this.v=v;     //  value
      this.c=c;     //  caption
      this.s=s;     //  side
      this.l=l;     //  layer
  };

  // Properties =======================================================
  var propC=function(i,p,x,y,w,h,r,k,v,c,g){

    this.i=i;     // guid
    this.p=p;     // parent

    this.x=x;     // left
    this.y=y;     // top
    this.w=w;     // width
    this.h=h;     // height
    this.r=r;     // radius

    this.k=k;     // hit cursor
    this.v=v;     // value
    this.c=c;     // command
    this.g=g;     // tag

  };
  var propL=function(fill, fillH, stroke, strokeH, weight, weightH){

    this.fill=fill;         // fill color
    this.fillH=fillH;       // fill color highlight

    this.stroke=stroke;     // stroke color
    this.strokeH=strokeH;   // stroke color highlight

    this.weight=weight;     // strokeWeight
    this.weightH=weightH;   // strokeWeight highlight

  };
  var propA=function(fill, fillH, alignX, alignY,  size,   sizeH){

    this.fill=    fill;     // text color
    this.fillH=   fillH;    // text color highlight
    this.alignX=  alignX;   // horizontal alignment
    this.alignY=  alignY;   // vertical alignment
    this.size=    size;     // text size
    this.sizeH=   sizeH;    // text size highlight

  };

  // Control ===========================================================
  // Controls =========================================================
  var control=function(c,l,a,ctrls){

    // controls properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.i=c.i;                // guid
    this.parent=c.p;           // parent

    this.x=c.x;                // left
    this.y=c.y;                // top
    this.w=c.w;                // width
    this.h=c.h;                // height
    this.r=c.r;                // corner radius

    this.cX=c.w/2;
    this.cY=c.h/2;

    this.k=c.k;                // hit cursor

    this.v=c.v;                // value
    this.c=c.c;                // command
    this.g=c.g;                // tag


    // appearance properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.fill=l.fill;          // fill color
    this.fillH=l.fillH;        // fill color highlight
    this.stroke=l.stroke;      // stroke color
    this.strokeH=l.strokeH;    // stroke color highlight

    this.weight=l.weight;      // strokeWeight
    this.weightH=l.weightH;    // strokeWeight highlight


    // text properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.text=a.text;          // text caption

    this.tfill=a.fill;         // text color
    this.tfillH=a.fillH;       // text color highlight
    this.alignX=a.alignX;      // horizontal alignment
    this.alignY=a.alignY;      // vertical alignment
    this.size=a.size;          // text size
    this.sizeH=a.sizeH;        // text size highlight

    // misc properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.hit=false;             // mouse is over the control

    this.visible=true;          // is the control currently being displayed
    this.ctrls=ctrls;           // array of child controls

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

    if(this.alignX===LEFT){

      if(app.mouseX>x+this.x && app.mouseX<x+this.x+this.w &&
         app.mouseY>y+this.y && app.mouseY<y+this.y+this.h){

        this.hit=true;
        app.focus=this.i;

      }
      else{
        this.hit=false;
      }

    }
    else if(this.alignX===CENTER){

      if(app.mouseX>=x+this.x-this.w/2 && app.mouseX<=x+this.x+this.w/2 &&
         app.mouseY>=y+this.y-this.h/2 && app.mouseY<=y+this.y+this.h/2){

        this.hit=true;
        app.focus=this.i;

      }
      else{
        this.hit=false;
      }

    }
    else if(this.alignX===RIGHT){

      if(app.mouseX>x+this.x && app.mouseX<x+this.x+this.w &&
         app.mouseY>y+this.y && app.mouseY<y+this.y+this.h){

        this.hit=true;
        app.focus=this.i;

      }
      else{
        this.hit=false;
      }

    }
    else{}

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

  // Pane ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var pane=function(c,l,a,ctrls){

    control.call(this,c,l,a,ctrls);

    app.factor=     this.h/22;   // required for initial grid height

    this.shapes=    [];
    this.Temp=      0;

    this.cX=        0;
    this.cY=        0;

    this.originX=   0;
    this.originY=   0;

    this.offsetX=   0;
    this.offsetY=   0;

    this.hitProp=   false;

  };
  pane.prototype=Object.create(control.prototype);
  pane.prototype.draw=function(){
    
    // size
    this.w=document.getElementById("canvas-container").offsetWidth;
    this.h=document.getElementById("canvas-container").offsetHeight;

    size(this.w, this.h);
    
    // update Telemetry
    app.width=this.w;
    app.height=this.h;
    
    var g=this; // Grid
    var d=0;
    var incr=1/app.factor;

// p(app.stg);

    var border=function(){

      pushStyle();

        fill( hexToRGBA(document.getElementById("grid-color").value,
                        document.getElementById("grid-alpha").value/100*255));

        stroke(g.stroke);
        strokeWeight(g.weight);

        if(g.hit){
          // fill(p.fillH);
          stroke(g.strokeH);
          strokeWeight(g.weightH);
        }

        stroke(g.stroke);
        stroke(128,0,0);
        
        strokeWeight(0);
        noStroke();
        rect(-g.w/2, -g.h/2, g.w, g.h, g.r);

      popStyle();

    };

    var drawGUI=function(){

      border();
          
    };
    
    var drawTemp=function(){

      switch(app.current){

        case COMMANDS.POINT_DEFAULT[0]:

          // Point is saved on initial click
          break;

        case COMMANDS.LINE_SEGMENT2POINT[0]:

          if(g.Temp!==0){

            var x=(g.Temp.vertices[0].xG)*app.factor+g.originX;
            var y=(g.Temp.vertices[0].yG)*app.factor-g.originY;
            var xW=app.worldX+g.originX;
            var yW=app.worldY-g.originY;
            var sz=app.pSize;

            noFill();
            stroke(getColor(app.stroke, app.strokeA));
            strokeWeight(app.lineweight);

            line(xW, yW, x, y);

            fill(getColor(app.fill, app.fillA));
            noStroke();
            strokeWeight(0);

            ellipse(x,  y,  sz, sz);
            ellipse(xW, yW, sz, sz);

          }

          break;

        case COMMANDS.CIRCLE_CENTERPOINT[0]:

          if(g.Temp!==0){

            noFill();
            stroke(app.stroke);
            strokeWeight(app.lineweight);

            line(app.mouseX,  app.mouseY, app.vertices[0].x, app.vertices[0].y);

            fill(app.fill);
            noStroke();
            strokeWeight(0);

            ellipse(g.vertices[0].x, g.vertices[0].y, app.pSize, app.pSize);
            ellipse(app.mouseX,      app.mouseY,      app.pSize, app.pSize);

            noFill();
            stroke(app.stroke);
            strokeWeight(app.lineweight);

            var r=2*dist(g.vertices[0].x, g.vertices[0].y, app.mouseX, app.mouseY);

            ellipse(g.vertices[0].x, g.vertices[0].y, r, r);

          }

          break;

        case COMMANDS.QUAD_RECTANGLE[0]:

          // if(p.vertices.length===1){

            // noFill();
            // stroke(app.stroke);
            // strokeWeight(app.lineweight);

            // fill(app.fill);
            // noStroke();
            // strokeWeight(0);

            // ellipse(p.vertices[0].x, p.vertices[0].y, app.pSize, app.pSize);
            // ellipse(app.mouseX,    app.mouseY,    app.pSize, app.pSize);

            // noFill();
            // stroke(app.stroke);
            // strokeWeight(app.lineweight);

            // var r=dist(p.vertices[0].x, p.vertices[0].y, app.mouseX, app.mouseY);

            // rect(p.vertices[0].x, p.vertices[0].y, r, r);

          // }

          break;

        default:                  break;

      }

    };
    var drawShapes=function(){
      
      for(var s in g.shapes){ g.shapes[s].draw(g.originX, g.originY); }
      
    };
    
    pushMatrix();

      translate(g.x+g.w/2,
                g.y+g.h/2);

      scale(1,-1);

      drawGUI();

    popMatrix();

    if(g.hit && app.focus===g.i){
      
      // ARROW, CROSS, HAND, MOVE, TEXT, WAIT
      if(app.current==COMMANDS.SELECT[0])     { cursor(ARROW); }
      else if(!app.keys[KEYCODES.CONTROL] &&
               app.current!==COMMANDS.PAN[0]) { crosshair();
      }
      else if(app.current==COMMANDS.PAN[0])   {

        if(app.left && app.focus===p.i)         { cursor(MOVE); }
        else                                    { cursor(HAND); }

      }
      else                                    {cursor(ARROW);}

    }

  };

  pane.prototype.clicked=function(){

    var shapeFactory=function(parent){

      switch(app.current){

        case COMMANDS.POINT_DEFAULT[0]:       return new Point(   getGUID(), parent, app.gridX, app.gridY);

        case COMMANDS.LINE_SEGMENT2POINT[0]:  return new Line(    getGUID(), parent, new point( getGUID(), 0, app.gridX, app.gridY));
        
        case COMMANDS.CIRCLE_CENTERPOINT[0]:  return new Circle(  getGUID(), parent, app.gridX, app.gridY);

        // case COMMANDS.QUAD_RECTANGLE[0]:      break;
    
        default:  break;
    
      }

      // app.stack.push(app.current);
      // p(app.stack);
      
    };
    
    // if(app.focus===this.i){

      if(this.hit){

        if(this.shapes.length===0 ||
           this.shapes[this.shapes.length-1].temp===false){
          this.shapes.push(shapeFactory(this));
        }
        else{
          this.shapes[this.shapes.length-1].add(new Point(getGuid(), this, app.gridX, app.gridY));
        }
        
      }
      
      for(var s in this.shapes){ this.shapes[s].clicked(0,0); }
      
    // }

    // for(var c in this.ctrls){ this.ctrls[c].clicked(0,0); }

    if(app.current===COMMANDS.SELECT[0]){
      for(var s in this.shapes){ this.shapes[s].clicked(0,0); }
    }

  };
  pane.prototype.moved=function(x,y){

    if(app.mouseX>x+this.x &&
       app.mouseX<x+this.x+this.w &&
       app.mouseY>y+this.y &&
       app.mouseY<y+this.y+this.h){

      this.hit=true;

      app.focus=this.i;

      if(app.stg && app.focus===this.i){
        var incr=app.factor;
        app.mouseX-=mouseX%incr-(this.x+this.w/2)%incr-this.originX%incr;
        app.mouseY-=mouseY%incr-(this.y+this.h/2)%incr-this.originY%incr;
      }

      app.worldX=   (app.mouseX-this.x-this.w/2-this.originX);
      app.worldY=-1*(app.mouseY-this.y-this.h/2-this.originY);

      app.gridX=   (app.mouseX-this.x-this.w/2-this.originX)/app.factor;
      app.gridY=-1*(app.mouseY-this.y-this.h/2-this.originY)/app.factor;

      app.coordinates=nf(app.gridX,1,1) + ", " + nf(app.gridY,1,1);

      for(var s in this.shapes){ this.shapes[s].moved(x,y); }
      for(var c in this.ctrls){ this.ctrls[c].moved(x,y); }
      
      document.getElementById("coordinates").innerText=app.coordinates;
      
    }
    else{
      this.hit=false;
    }

    // for(var c in this.ctrls){ this.ctrls[c].moved(x,y); }

  };
  pane.prototype.dragged=function(x,y){

    if(this.hit &&
       app.focus===this.i){

      if(app.current===COMMANDS.PAN[0]){

        if(app.mouseX<this.x+this.w &&
           app.mouseX>this.x &&
           app.mouseY<this.y+this.h &&
           app.mouseY>this.y){

          // cursor(MOVE);
          this.originX=app.mouseX-this.x-this.w/2-this.offsetX;
          this.originY=app.mouseY-this.y-this.h/2+this.offsetY;

        }

      }

      for(var s in this.shapes){ this.shapes[s].dragged(); }

    }

  };
  pane.prototype.pressed=function(){

    if(this.hit){
      this.offsetX=app.worldX;
      this.offsetY=app.worldY;
    };

  };
  pane.prototype.released=function(){

    if(this.hit){
      this.offsetX=0;
      this.offsetY=0;
    };

  };
  pane.prototype.typed=function(){

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


  
  var unitCircle=function(prop){  //  Unit Circle Definition
  
    //  private methods --------------------------------------------------
    var _hit=function(x,y){
      if(x>=prop.x && x<=prop.x+prop.w &&
         y>=prop.y && y<=prop.y+prop.h){ return true; }
    };
  
    var _CrossHairs=function(){
  
      noFill();
      stroke(CLRS.WHITE);
      strokeWeight(2);
      ellipse(0,0,prop.w,prop.w);
      
      strokeWeight(0.5);
      
      //  Axis
      line(prop.w*0.35,0,-prop.w*0.35,0);
      line(0,prop.w*0.35,0,-prop.w*0.32);
  
      //  Origin
      fill(64,0,0);
      noStroke();
      ellipse(0,0,prop.w*0.025,prop.w*0.025);
  
    };

    var _Increments_Degrees=function(){
        
      strokeWeight(1);
      
      for(var n=0; n<360; n++){
  
        if(n%10===0)
          { stroke(255,255,255,255);
            line(prop.w/2,0,prop.w/2-25,0);   }
        else if(n%5===0)
          { stroke(255,255,255,128);
            line(prop.w/2,0,prop.w/2-15,0);   }
        else
          { stroke(255,255,255,64);
            line(prop.w/2,0,prop.w/2-10,0);   }
  
        rotate(radians(1));
  
      }
    
    };
    var _Increments_Radians=function(){
  
      strokeWeight(1);
  
      for(var n=0; n<628; n++){
  
        if(n%10===0)
          { stroke(CLRS.BLUE);
            line(prop.w/2,0,prop.w/2+20,0);   }
        else if(n%5===0)
          { stroke(CLRS.BLUE);
            line(prop.w/2,0,prop.w/2+15,0);   }
        else
          { stroke(CLRS.BLUE_LT);
            line(prop.w/2,0,prop.w/2+10,0);   }
  
        rotate(-radians(360/628));
  
      }
  
    };
    
    var _Units_DegreeLabels=function(){
  
      fill(CLRS.WHITE);
  
      textFont(createFont("san-serif", 9), 9);
      textAlign(CENTER,CENTER);
      textSize(10);
  
      for(var n=0; n<360; n+=10){
        
        var txt=(360-n) + "" + CONSTANTS.DEGREES;
        
        text(txt,cos(radians(n))*prop.w*0.40,sin(radians(n))*prop.w*0.40);
  
      }
  
    };
    var _Units_RadianLabels=function(){
  
      fill(CLRS.YELLOW_LT);
  
      textFont(createFont("san-serif", 10), 9);
      textAlign(CENTER,CENTER);
  
      var factor=0.58;
  
      for(var n=0; n<PI*2; n+=0.1){
        text(nf(n,1,1),cos(n)*prop.w*factor,-sin(n)*prop.w*factor);
      }
  
    };
    var _Units_RadianPresets=function(){
  
      var factor=0.58;
      var _min=0.92;
      var _max=0.97;
      var _x=0;
      var _y=0;
  
      textFont(createFont("san-serif", 10), 10);
      textAlign(CENTER,CENTER);
  
      fill(CLRS.YELLOW);
      factor=0.66;
  
      for(var n=0; n<presets.length; n++){
  
        _x =presets[n][1]*prop.w*factor;
        _y =presets[n][2]*prop.w*factor;
  
        text(presets[n][0],_x,_y);
        line(_x*_min,_y*_min,_x*_max,_y*_max);
  
      }
  
    };
    
    var _Quadrants=function(){
  
      fill(CLRS.YELLOW_LT);
      textFont(createFont("cursive", 20), 32);
      textSize(20);
      textAlign(CENTER,CENTER);
  
      text("I",20,-20);
      text("II",-20,-20);
      text("III",-20,20);
      text("IV",20,20);
  
    };
    var _Labels=function(){
  
      textAlign(CENTER,CENTER);
      textFont(createFont("san-serif", 10), 10);
      text("degrees",0,-prop.h/2*0.7);
  
    };
    var _PlusMinus=function(){
  
      fill(CLRS.GRAY_128);
  
      textAlign(LEFT,CENTER);
      textFont(createFont("monospace", 11), 11);
  
      
      var top=110;
      var left=40;
  
      text("sin +",left,-top);
      text("cos +",left,-top+15);
      text("tan +",left,-top+30);
      text("csc +",left,-top+45);
      text("sec +",left,-top+60);
      text("atn +",left,-top+75);
      
      top=30;
  
      text("sin -",left,top);
      text("cos +",left,top+15);
      text("tan -",left,top+30);
      text("csc -",left,top+45);
      text("sec +",left,top+60);
      text("atn -",left,top+75);
      
      left=-75;
  
      text("sin -",left,top);
      text("cos -",left,top+15);
      text("tan +",left,top+30);
      text("csc +",left,top+45);
      text("sec -",left,top+60);
      text("atn -",left,top+75);
  
      top=-110;
  
      text("sin -",left,top);
      text("cos -",left,top+15);
      text("tan +",left,top+30);
      text("csc +",left,top+45);
      text("sec -",left,top+60);
      text("atn -",left,top+75);

    };
    var _draw=function(x,y){

      pushMatrix();

        translate(prop.x+0.5,prop.y+0.5);

        if(CrossHairs)          { _CrossHairs();      }
        if(Labels)              { _Labels();          }

        if(Increments_Degrees)  { _Increments_Degrees(); }
        if(Increments_Radians)  { _Increments_Radians(); }
      
        if(Units_DegreeLabels)  { _Units_DegreeLabels();     }
        if(Units_RadianLabels)  { _Units_RadianLabels();     }
        if(Units_RadianPresets) { _Units_RadianPresets();    }

        if(Quadrants)           { _Quadrants();        }
        if(Plus_Minus)          { _PlusMinus();        }

      popMatrix();

    };

    //  public methods --------------------------------------------------
    this.pressed=   function(x,y){  if(_hit(x,y)){ }                  };
    this.released=  function(x,y){  if(_hit(x,y)){ }                  };
    this.clicked=   function(x,y){  if(_hit(x,y)){ prop.f(prop.s); }  };
    this.refresh=   function(x,y){  _draw(x,y);                       };
    this.moved=     function(x,y){                                    };
    
  };
  
  var conversion=function(prop){  //  Menu Definition
    
    

    //  private methods --------------------------------------------------
    var _hit=function(x,y){
      if(x>=prop.x && x<=prop.x+prop.w &&
         y>=prop.y && y<=prop.y+prop.h){ return true; }
    };
    var _draw=function(x,y){
    
      if(!Conversion){  return; }
    
      strokeWeight(1);
  
      fill(CLRS.GRAY);
      textFont(createFont("san-serif", 11), 11);
      textAlign(RIGHT,CENTER);
      text("degrees", prop.x-25,prop.y);
      
      fill(CLRS.YELLOW);
      textAlign(LEFT,CENTER);
      text("radians", prop.x+25,prop.y);
  
      noFill();
      stroke(CLRS.BLUE);
      arc(prop.x,prop.y-5,75,50,PI+radians(15),PI+radians(60));
      arc(prop.x,prop.y-5,75,50,3*PI/2+radians(30),3*PI/2+radians(75));
  
      arc(prop.x,prop.y+5,75,50,radians(15),radians(60));
      arc(prop.x,prop.y+5,75,50,radians(120),radians(165));
  
      fill(CLRS.GRAY_128);
      textAlign(CENTER,CENTER);
      textSize(9);
      text("x " + P+"/180",prop.x,prop.y-30);
      text("x 180/"+P,     prop.x,prop.y+30);
  
      pushMatrix();
        
        fill(CLRS.BLUE);
  
        translate(prop.x+36,prop.y-10);
        scale(1,-1);
        
        rotate(radians(15));
        text(_ARROW,0,0);
        
        resetMatrix();
        
        translate(prop.x-36,prop.y+10);
        scale(1,-1);
  
        rotate(radians(-165));
        text(_ARROW,0,0);
        
      popMatrix();
  
    };
  
    //  public methods --------------------------------------------------
    this.pressed=   function(x,y){  if(_hit(x,y)){ }                  };
    this.released=  function(x,y){  if(_hit(x,y)){ }                  };
    this.clicked=   function(x,y){  if(_hit(x,y)){ prop.f(prop.s); }  };
    this.refresh=   function(x,y){  _draw(x,y);                       };
    this.moved=     function(x,y){                                    };
  };
  
  var _h=0;
  var _w=0;
  
  /*----------- Orthogonal View -----------*/
  
  
  
  var index=function(){
      
      textAlign(LEFT, CENTER);
      resetMatrix();
      textSize(10);
      
      //strokeWeight(0.5);
      
      if(app.lightsOn) {  fill(255,255,255,192);
                          stroke(0,0,0,64); }
      else             {  fill(32,32,32,192);
                          stroke(255,255,255,128); }
      
      rect(100, 5, 205, 75, 5);
      
      var sin=(max[app.theta][0]/app.scaleY).toFixed(4);
      var cos=(max[app.theta][2]/app.scaleY).toFixed(4);
      var tan=(max[app.theta][4]/app.scaleY).toFixed(4);
      
      var csc=(max[app.theta][1]/app.scaleY).toFixed(4);
      var sec=(max[app.theta][3]/app.scaleY).toFixed(4);
      var cot=(max[app.theta][5]/app.scaleY).toFixed(4);
      
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
  //    translate(19.5,-200.5);
  
      //orthoOrigin();
  
      //if(app.sinOn) { drawSin(); }
      //if(app.cosOn) { drawCos(); }
      //if(app.tanOn) { drawTan(); }
      
      //if(app.cscOn) { drawCsc(); }
      //if(app.secOn) { drawSec(); }
      //if(app.cotOn) { drawCot(); }
                      
  };
  
  var unit2=function(){
  
      resetMatrix();
      scale(1,-1);
      //translate(87.5,-290.5);
      //unitAxis();
      //unitCircle();
      //unitIntercepts();
      //unitTrig();
  
  };
  
  var _menu=function(){};
  
  var fBlank=function(){ println("Click"); };
  
  // ========== Controls ================================================== //
  var controls=function(){
  
    var _controls=[];
  
    this.add=function(prop){      //  Add
  
      switch (prop.t){
  
        case CONTROLS.BUTTON:     _controls.push(new button(prop));     break;
        case CONTROLS.GRAPH:      _controls.push(new graph(prop));      break;
        case CONTROLS.MENU:       _controls.push(new menu(prop));       break;
        case CONTROLS.UNITCIRCLE: _controls.push(new unitCircle(prop)); break;
        case CONTROLS.CONVERSION: _controls.push(new conversion(prop)); break;
        case CONTROLS.PANE:       _controls.push(new pane(prop));       break;
  
        default: break;
  
      }
  
    };
    this.refresh=   function(x,y){  for(var ctl in _controls){ _controls[ctl].refresh(x,y); }     };
    this.update=    function(x,y){  for(var ctl in _controls){ _controls[ctl].update(x,y);  }     };
    this.clicked=   function(x,y){  for(var ctl in _controls){ _controls[ctl].clicked(x,y); }     };
    this.pressed=   function(x,y){  for(var ctl in _controls){ _controls[ctl].pressed(x,y); }     };
    this.released=  function(x,y){  for(var ctl in _controls){ _controls[ctl].released(x,y);}     };
    this.activate=  function(n)  {  for(var ctl in _controls){ _controls[ctl].activate(n);      } };
    this.mouseMoved=function(x,y){  for(var ctl in _controls){ _controls[ctl].mouseMoved(x,y);  } };
    this.item=      function(n)  {  return _controls[n];                                          };
    this.length=    function()   {  return _controls.length;                                      };
  };
  
  var controls=new controls();
  
  //  Add Controls
  //controls.add(new prop(controls.length(),50,20,350,315,CONTROLS.GRAPH,fBlank,false,"",5,255));
  // controls.add(new prop(controls.length(),  300, app.height/2, 400, 400, CONTROLS.UNITCIRCLE, fBlank, false, "", 5, 255));
  // controls.add(new prop(controls.length(),  75,   50, 100, 100, CONTROLS.CONVERSION, fBlank, false, "", 5, 255));
  
  // app.ctrls.push(getGUID(), new prop(5,   5, 100, 100, CONTROLS.PANE, fBlank, false, "", 5, 255));
  
  var addControls=function(){

    var ctrls=[];
    
    var cn=new pane(
      new propC("left pane", 0, 10, 10, app.width, app.height, 0, ARROW, false, COMMANDS.UNDEF[0], 0),
      new propL(CLRS.GRID, getColor(CLRS.RED,65), CLRS.BLUE, CLRS.GREEN, 0, 0),
      new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));
    
    cn.ctrls=ctrls;
    
    app.ctrls.push(cn);
    
  }

  // addControls();

  var drawLights=function(){
      
      var top=5;
      var left=390;
      
      noFill();
      //strokeWeight(2);
                              
      if(app.lightsOn){   stroke(0);
                          arc(left,top+7,10,10,radians(-45),radians(225));
                          line(left,top+1,left,12);
                          app.running=true; }
      else            {   stroke(212);
                          arc(left,top+7,10,10,radians(-135),radians(135));
                          line(left,12,left-7,12);
                          app.running=false; }
  };
  // var initialize=function(){
  
    //if(app.lightsOn){   background(CLRS._WHITE); }
    //else            {   background(CLRS._BLACK);   }
  
    //drawLights();
  
  
    //resetMatrix();
    //menu.refresh(mouseX, mouseY);
  
    //if(app.lightsOn){   fill(0); }
    //else            {   fill(192);   }
    //textSize(10);
    //textAlign(CENTER, CENTER);
    //text(app.theta + "°", 90,350);
    //text(radians(app.theta).toFixed(3), 90,365);
        
    //index();
    //if (app.autoPilot)  { app.theta+=1; app.theta%=360;}
  
  // };
  
  var tables=function(){
  
    fill(CLRS.GRAY_16);
    textAlign(LEFT,TOP);
    textSize(11);
  
    var _s=0;
    var _c=0;
    var _t=0;
    var _csc=0;
    var _sec=0;
    var _atn=0;
    var _spc="\t \t \t \t";
  
    for(var n=1; n<46; n++){
  
      _s=nf(sin(radians(n)),1,4);
      _c=nf(cos(radians(n)),1,4);
      _t=nf(tan(radians(n)),1,4);
      _csc=nf(sin(1/radians(n)),1,4);
      _sec=nf(cos(1/radians(n)),1,4);
      _atn=nf(atan(radians(n)),1,4);
  
      text(n + ":"+_spc+
              _s+_spc+
              _c+_spc+
              _t+_spc+
              _csc+_spc+
              _sec+_spc+
              _atn+"",10,(n-1)*13.4);
  
    }
  
    for(var n=0; n<45; n++){
  
      _s=nf(sin(radians(n+45)),1,4);
      _c=nf(cos(radians(n+45)),1,4);
      _t=nf(tan(radians(n+45)),1,4);
      _csc=nf(sin(1/radians(n+45)),1,4);
      _sec=nf(cos(1/radians(n+45)),1,4);
      _atn=nf(atan(radians(n+45)),1,4);
  
      text(n+46 + ":"+_spc+
              _s+_spc+
              _c+_spc+
              _t+_spc+
              _csc+_spc+
              _sec+_spc+
              _atn+"",380,n*13.4);
  
    }
  
  };
  
  var drawDial=function(){
    
    noFill();
    stroke(CLRS.RED);

    // rect(0,0,600,app.height-1);
    
    var x=app.unit*10;
    var y=app.height/2;
    var r=app.unit*8;

    pushMatrix();
      
      translate(x, y);
      scale(1,-1);
  
      var _x= (mouseX-x);
      var _y=-(mouseY-y);
  
      if(app.running){  app.theta+=PI/360;      }
      else           {  app.theta=atan2(_y,_x); }
  
      app.theta%=6.28;
  
      noStroke();
      fill(CLRS.RED);

      quad(0,0,
           cos(app.theta-radians(5))*50,
           sin(app.theta-radians(5))*50,
           cos(app.theta)*r,
           sin(app.theta)*r,
           cos(app.theta+radians(5))*50,
           sin(app.theta+radians(5))*50);
  
    popMatrix();
  
    textSize(14);
    textAlign(RIGHT,CENTER);
  
    var deg=floor(degrees(app.thetaR));
  
    if(deg<0){ deg+=360; }
  
    fill(CLRS.GRAY_128);
    var txt=deg+CONSTANTS.DEGREES;
    text(txt,200,15);
  
    fill(CLRS.YELLOW_LT);
    text(nf(radians(deg),1,3),200,30);
  
  };

  var leftPane=function(x,y,w,h){
    
    pushMatrix();

      var w2=w/2;
      var h2=h/2;
      var sp=app.unit;
      
      translate(w2, h2);
      // scale(1,-1);

      noFill();
      strokeWeight(1);

      // grid -------------------------

      stroke(16);

// stroke(CLRS.ORANGE);

      for(var x=0; x<w2; x+=app.unit){
        line(-x, -h2, -x, h2);
        line( x, -h2,  x, h2);
      }
      for(var y=0; y<h2; y+=app.unit){
        line(-w2, -y, w2, -y);
        line(-w2,  y, w2,  y);
      }

      // x-axis -------------------------
      stroke(64);

      line(-w2+sp, 0,
            w2-sp, 0);

      // arrows
      noStroke();
      fill(96);
      
      var base=-w2+sp;
      
      quad(base,     0,
           base+10,  4,
           base+7,   0,
           base+10, -4);
      
      base=w2-sp;
      
      quad(base,     0,
           base-10,  4,
           base-7,   0,
           base-10, -4);

      // y-axis -------------------------
      stroke(64);
      
      line(0, -w2+sp,
           0,  w2-sp);
  
      // y-axis arrows
      noStroke();
      
      base=-w2+sp;
      
      quad( 0, base,
            4, base+10,
            0, base+7,
           -4, base+10);
      
      base=w2-sp;
      
      quad( 0, base,
            4, base-10,
            0, base-7,
           -4, base-10);

      // Circle -------------------------
      var r=app.unit*16;

      noFill();
      strokeWeight(1.5);
      stroke(128);

      ellipse(0, 0, r, r);

      // border -------------------------
      noFill();
      fill(getColor(CLRS.RED,0));
      
      strokeWeight(1);
      stroke(CLRS.RED);

      // rect(-w2, -h2,
      //       w,   h);
            
    popMatrix();

  };

  var rightPane=function(x,y,w,h){

    noFill();
    stroke(16);

    pushMatrix();

      translate(x, h/2);
      scale(1,-1);
      
      fill(CLRS.BLACK);
      
      // rect(0, h/2-2, w, -h);

      // line(0,0,w,h)

      stroke(16);
      // stroke(CLRS.RED);
      strokeWeight(1);
      
      // y-axis
      var s=app.unit*2;
      
      for(var x=0; x<w/s; x++){

        if(x%4===0) { strokeWeight(1);  }
        else        { strokeWeight(0.5);  }

        line(x*s, -h/2, x*s, h/2);

      }

      // x-axis
      for(var y=0; y<h/s; y++){
        
        if(y%4===0) { strokeWeight(1);  }
        else        { strokeWeight(0.5);  }

        line(0, -y*s, w, -y*s);
        line(0,  y*s, w,  y*s);

      }

      stroke(64);
      strokeWeight(1);

      line(0, h/2, 0, -h/2);    // x-axis
      line(0, 0, w, 0);     // y-axis

      // arrows
      noStroke();
      fill(96);
      
      var w2=w/2;
      var sp=app.unit;
      var base=w+sp;
      
      // quad(base,     0,
      //     base+10,  4,
      //     base+7,   0,
      //     base+10, -4);
      
      base=w;
      
      quad(base,     0,
          base-10,  4,
          base-7,   0,
          base-10, -4);

      noStroke();
      fill(96);

      base=h/2;
      
      quad( 0, base,
            4, base-10,
            0, base-7,
           -4, base-10);
      
      base=-h/2;
      
      quad( 0, base,
            4, base+10,
            0, base+7,
           -4, base+10);

    popMatrix();
    
  };

  var drawCurves=function(){

    //  each end of a discontiguous curve requires 2 terminating points at each end

    noFill();
    strokeWeight(0.75);

    var w=16*app.unit*4;
    var incr=18;
    
    var min=0;
    var max=360;
    
    // Shape Options
    // POINTS, LINES, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, QUADS, QUAD_STRIP
    // Example: shape(TRIANGLE_FAN);

    var sineCurve=function(){

      var m=55;

      stroke(CLRS.SIN);

      // beginShape(m);
      beginShape();

        var x=0;
        var y=0;

        curveVertex(x,y);
        
        for(var n=min; n<=max; n+=incr){

          x=n/app.max*w;
          y=-app.data[n].sin;

          curveVertex(x, y);

        }

        curveVertex(x,y);

      endShape();



    };
    var cosineCurve=function(){
      
      stroke(CLRS.COS);

      beginShape();
      
        var x=0;
        var y=-app.data[0].cos;
        
        curveVertex(x,y);
        
        for(var n=min; n<=max; n+=incr){

          x=n/app.max*w;
          y=-app.data[n].cos;

          curveVertex(x, y);

        }

        curveVertex(x,y);

      endShape();
      
    };
    var tangentCurve=function(){
      
      stroke(CLRS.TAN);

      var x=0;
      var y=0;
        
      beginShape();

        curveVertex(x, y);

        for(var n=min; n<90; n++){

          x=n/app.max*w;
          y=-app.data[n].tan;

          if(y>-height || y<height){ curveVertex(x, y); }

        }

      endShape();

      beginShape();

        for(var n=91; n<270; n++){

          x=n/app.max*w;
          y=-app.data[n].tan;

          if(y>-height || y<height){ curveVertex(x, y); }

        }

      endShape();
      
      beginShape();

        for(var n=271; n<=max; n++){

          x=n/app.max*w;
          y=-app.data[n].tan;

          if(y>-height || y<height){ curveVertex(x, y); }

        }

        curveVertex(x,y);

      endShape();
      
    };
    var cosecantCurve=function(){
      
      stroke(CLRS.ORANGE);

      var x=0;
      var y=0;
        
      beginShape();

        for(var n=min; n<180; n++){

          x=n/app.max*w;
          y=-app.data[n].csc;

          if(y>-height && y<height){ curveVertex(x, y); }

        }

      endShape();

      beginShape();

        for(var n=181; n<360; n++){

          x=n/app.max*w;
          y=-app.data[n].csc;

          if(y>-height && y<height){ curveVertex(x, y); }

        }

      endShape();

    };
    var secantCurve=function(){
      
      stroke(CLRS.GREEN);

      var x=0;
      var y=-app.data[0].sec;
        
      beginShape();

        curveVertex(x, y);

        for(var n=min; n<90; n++){

          x=n/app.max*w;
          y=-app.data[n].sec;

          if(y>-height && y<height){ curveVertex(x, y); }

        }

      endShape();

      beginShape();

        for(var n=91; n<270; n++){

          x=n/app.max*w;
          y=-app.data[n].sec;

          if(y>-height && y<height){ curveVertex(x, y); }

        }

      endShape();
      
      beginShape();

        for(var n=271; n<=max; n++){

          x=n/app.max*w;
          y=-app.data[n].sec;

          if(y>-height && y<height){ curveVertex(x, y); }

        }

        curveVertex(x, y);

      endShape();

    };
    var cotangentCurve=function(){
      
      stroke(CLRS.GRAY);

      var x=0;
      var y=0;
        
      beginShape();

        for(var n=min; n<180; n++){

          x=n/app.max*w;
          y=-app.data[n].cot;

          if(y>-height && y<height){ curveVertex(x, y); }

        }

      endShape();

      beginShape();

        for(var n=181; n<=max; n++){

          x=n/app.max*w;
          y=-app.data[n].cot;

          if(y>-height && y<height){ curveVertex(x, y); }

        }

      endShape();
      
    };
    
    var current=function(){
      
      var x, y, sz=10;

      // Current location
      x=mouseX-app.border-20*app.unit;

      var index=round(x/w*720);

      if(x>=0 && x<=w){
        
        noStroke();
        
        // Sine
        fill(CLRS.SIN);

        y=-app.data[index].sin;
        ellipse(x,y,sz,sz);
        
        // Cosecant
        y=-app.data[index].csc;
        ellipse(x,y,sz,sz);
        
        // Cosine
        fill(CLRS.COS);
        y=-app.data[index].cos;
        ellipse(x,y,sz,sz);

        // Secent
        fill(CLRS.SEC);
        y=-app.data[index].sec;
        ellipse(x,y,sz,sz);
        
        // Tangent
        fill(CLRS.TAN);
        y=-app.data[index].tan;
        ellipse(x,y,sz,sz);

        // Cotangent
        fill(CLRS.COT);
        y=-app.data[index].cot;
        ellipse(x,y,sz,sz);
        
      }

      noFill();

    };
    
    pushMatrix();

      translate(app.border+20*app.unit, height/2);
      
      
        if(app.sineOn)      { sineCurve();      }
        if(app.cosecantOn)  { cosecantCurve();  }
        
        if(app.cosineOn)    { cosineCurve();    }
        if(app.secantOn)    { secantCurve();    }
        
        if(app.tangentOn)   { tangentCurve();   }
        if(app.cotangentOn) { cotangentCurve(); }

        current();

    popMatrix();

  };
  
  var border=function(){
    
    stroke(CLRS.GREEN);
    strokeWeight(2);

    rect(app.border, app.border, app.width, app.height);

    // line(0, app.height/2, app.width, app.height/2);

  };

  var COSECANT=function(θ,d){
    
    if(sin(θ)===0){ return CONSTANTS.INFINITY; }
    else          { return nf(1/sin(θ),1,d);   }

  };
  var SECANT=function(θ,d){

    if(cos(θ)===0){ return CONSTANTS.INFINITY;  }
    else          { return nf(1/cos(θ),1,d);    }

  };
  var COTANGENT=function(θ,d){

    if(tan(θ)===0){ return CONSTANTS.INFINITY;  }
    else          { return nf(1/tan(θ),1,d);    }

  };

  var SINE=     function(θ,d){  return nf(sin(θ),1,d);  };
  var COSINE=   function(θ,d){  return nf(cos(θ),1,d);  };
  var TANGENT=  function(θ,d){  return nf(tan(θ),1,d);  };

  var telemetry=function(){

    // Right Panel
    if(mouseX>=app.paneRightX &&
       mouseX<=(app.paneRightX+app.paneRightW-2*app.unit)){

      app.thetaD=360*(mouseX-app.paneRightX)/(app.paneRightW-2*app.unit);
      app.thetaR=app.thetaD*PI/180;
      
    }
    // Left Panel
    else{

      app.thetaR=atan2(app.paneLeftH/2-mouseY, mouseX-app.paneLeftW/2);
      app.thetaD=app.thetaR*180/PI;

    }

    fill(CLRS.YELLOW);
    textSize(20);
    
    textAlign(LEFT);
    text(app.thetaD,                            50,  50);
    text(nf(app.thetaD,1,1)+ CONSTANTS.DEGREES, 50,  75);
    text(round(app.thetaD) + CONSTANTS.DEGREES, 50, 100);

    text(app.thetaR,            300, 50);
    text(nf(app.thetaR,1,1),    300, 75);

    text("sin: " + SINE     (app.thetaR, 4), 50, 550);
    text("cos: " + COSINE   (app.thetaR, 4), 50, 575);
    text("tan: " + TANGENT  (app.thetaR, 4), 50, 600);

    text("csc: " + COSECANT (app.thetaR, 4), 300, 550);
    text("sec: " + SECANT   (app.thetaR, 4), 300, 575);
    text("cot: " + COTANGENT(app.thetaR, 4), 300, 600);

  };

  var draw=function(){

    noFill();
    
    if(app.running){ background(16);          }
    else           { background(CLRS.BLACK);  }

background(CLRS.BLACK);

    // tables();

    // for(var c in app.ctrls){ app.ctrls[c].draw(); }
    border();

    leftPane( app.border,             app.border, app.paneLeftW,  app.paneLeftH);
    rightPane(app.border+20*app.unit, app.border, app.paneRightW, app.paneRightH);

    // var
    // setDisplay();

    telemetry();

    drawDial();

    drawCurves();

  };

  var over=       function(){
    // app.running=false;
    
  };
  var out=        function(){
    // app.running=!app.running;
    
  };
  var m_pressed=  function(){ app.pressed=true;           };
  var m_released= function(){ app.pressed=false;          };
  var clicked=    function(){
    controls.clicked(mouseX,mouseY);
    app.running=!app.running;
  };
  var moved=      function(){
    for(var c in app.ctrls){ app.ctrls[c].moved(mouseX,mouseY); };
  };


  // Events ===============================================================

  var k_pressed=      function(){               };
  var k_released=     function(){               };
  
  var mousePressed=   function(){ m_pressed();  };
  var mouseReleased=  function(){ m_released(); };
  var mouseMoved=     function(){ moved();      };
  var mouseClicked=   function(){ clicked();    };
  var mouseOver=      function(){ over();       };
  var mouseOut=       function(){ out();        };
  
  var keyPressed=     function(){ k_pressed();  };
  var keyPressed=     function(){ k_released(); };


  // Initialize ===============================================================

  var loadData=function(){

    var sinN, cosN, tanN, cscN, secN, cotN;

    for (var n=app.min; n<=app.max; n++){

      sinN=  sin(n*PI/180)*app.unit*8;
      cscN=1/sin(n*PI/180)*app.unit*8;
      
      cosN=cos(n*PI/180)*app.unit*8;
      secN=1/cos(n*PI/180)*app.unit*8;
      
      tanN=tan(n*PI/180)*app.unit*8;
      cotN=1/tan(n*PI/180)*app.unit*8;
      
      app.data.push({ sin:  sinN,
                      csc:  cscN,
                      cos:  cosN,
                      sec:  secN,
                      tan:  tanN,
                      cot:  cotN });

    }

  };

  var setDisplay=function(){
    
    // Set grid width
    app.unit=app.width/54;

    // Left pane
    app.paneLeftX=0;
    app.paneLeftY=0;

    app.paneLeftW=app.unit*20;
    app.paneLeftH=app.height;

    // Right pane
    app.paneRightX=app.unit*20;
    app.paneRightY=0;

    app.paneRightW=app.unit*34;
    app.paneRightH=app.height;

  };

  var initialize=function(){

    frameRate(30);

    

    app.width=window.innerWidth-20;
    app.height=window.innerHeight-20;
    
    // println(app.data[350][INDEX.COT]);

    size(app.width, app.height);

    setDisplay();

    loadData();

  };

  initialize();

}};
