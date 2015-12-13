

/*
    ============================================================================
        swap.js
    ===========================================================================
*/
/* @pjs globalKeyEvents="true"; */
var proc = function(processingInstance){
  with (processingInstance){



  /**

    TO DO:
      - ...
// *
// +stackoverflow.com
// +khanacademy.org
// +whatbadgenext.appspot.com/
// +codecogs.com/latex/eqneditor.php
// +youtube.com
// +mail.google.com
// +tube.geogebra.org/student/m762
// +bradsiemens.com
// +processingjs.org
// +processing.org
// +wikipedia.org
// +google.com
// +brm.io/matter-js-demo
// +w3schools.com
// +touchmathematics.org
// +desmos.com
// +github.com
// +emptyblack.com
// +redblobgames.com
// +dailymotion.com
// +pistolslut.com
// +latin-phrases.co.uk/quotes/beginning-end/

  **/




  angleMode="radians";
  
  // Globals ==================================================================
  var process;
  
  var zoomfactor=0;
  
  // Misc Methods =============================================================
  var p=function(s){
    println(s);
  };
  
  var getGUID=function(){

    // return year()   + ''  +
           // month()  + ''  +
           // day()    + ''  +
           // hour()   + ''  +
           // minute() + ''  +
           // second() + ''  +
           // millis() + ''  +
           // round(random(10e15));

    return "K"+floor(random(10e15));

  };
  
  var getColor=function(clr, Key){

    return color(red(clr), green(clr), blue(clr), Key/100*255);

  };
  
  var hexToRGB=function(hexStr){
    
    // note: hexStr should be #rrggbb
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b =  hex & 0x0000ff;
    
    return color(r,g,b);

  };
  var hexToRGBA=function(hexStr,a){

    // note: hexStr should be #rrggbb
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b =  hex & 0x0000ff;
    
    return color(r,g,b,a);

  };
  
  // Print Arrays ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var printArray1D=function(arr){

    println(arr);

  };
  var printArray2D=function(arr){

    for(var n=0; n<arr.length; n++){
      println(arr[n]);
    }

  };

  var randomizeArray=function(arr){

    var temp;
    var swap1;
    var swap2;

    for(var n=0; n<arr.length; n++){

      swap1=round(random(0,arr.length-1));
      swap2=round(random(0,arr.length-1));

      temp=arr[swap1];
      arr[swap1]=arr[swap2];
      arr[swap2]=temp;

    }

  };
  
    
  // Enumerations =============================================================
    
  var CLRS={

    TRANSPARENT:    color(-1,-1,-1),
  
    WHITE:          color(255,255,255),     BLACK:        color(0,0,0),
    RED:            color(170,29,29),       GREEN:        color(158,182,58),
    BLUE:           color(29,86,170),       YELLOW:       color(238,214,15),
    ORANGE:         color(238,136,15),      GRAY:         color(128,128,128),
  
    BROWN:          color(155,145,135),
  
    control:        color(128,128,128),     controlF:     color(242,242,242),
  
    TEXT:           color(255,255,255),
  
    Red:            color(255,0,0),         RedOrange:    color(255,81,0),
    Orange:         color(255,127,0),       YellowOrange: color(255,190,0),
    Yellow:         color(255,255,0),
  
    YellowGreen:    color(192,255,0),
    Green:          color(0,255,0),         BlueGreen:    color(0,127,127),
    Blue:           color(0,0,255),         BlueViolet:   color(92,0,255),
  
    Violet:         color(127,0,255),       RedViolet:    color(191,0,127),
  
    Gray1:          color(255*10/11),       Gray2:        color(255*9/11),
    Gray3:          color(255*8/11),        Gray4:        color(255*7/11),
    Gray5:          color(255*6/11),        Gray6:        color(255*5/11),
    Gray7:          color(255*4/11),        Gray8:        color(255*3/11),
    Gray9:          color(255*2/11),        Gray10:       color(255*1/11),
    White:          color(255,255,255),     Black:        color(0,0,0),
  
    BUTTONH:        color(16,16,16),        BUTTON:       color(24,24,24),
  
    GRID:           color(33,40,48),
  
    VERTEX:         color(255,255,0),
    VERTEXA:        color(255*6/11),
    LINE:           color(255*6/11),
    LINEA:          color(170,29,29),
    FILL:           getColor(color(255*7/11),10),
    FILLA:          getColor(color(255*7/11),25),
  
    RULER:          color(231,189,33),
  
    SELECTED:       color(0,0,255),
    HIT:            color(255,0,0),
  
    BACKGROUND_0:   color( 20, 90, 52),
    BACKGROUND_1:   color( 28,129, 74),
    BACKGROUND_2:   color( 34,161, 91),
    BACKGROUND_3:   color( 36,167, 93),
      
    NODE_BLUE:      color(51,221,250),

    CONNECTION:     color(251,175, 56),
    NODE:           color(255),


    // Code.org
    CODE_TEAL:      color(0,173,188),
    
    CODE_PURPLE:    color(118,101,160),
    CODE_PURPLE_LT: color(166,155,193),

    CODE_GREEN:     color(185,191,21),
    
    CODE_ORANGE:    color(255,164,0),
    
    CODE_BLUE:      color(0,148,202),
    
    CODE_YELLOW:    color(0,148,202)
    
  };

  var MODES={
    NETWORK:    0,
    SPLASH:     1
  };

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

  var COMMANDS={

    // General ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    UNDEF:        [   1,  'Undefined',        'UNDEFINED'             ],

    CARTESIA:     [   2,  'Cartesia',         'CARTESIA'              ],

    Container:    [   3,  'Container',        'Container'             ],
    HEADER:       [   4,  'Header',           'HEADER'                ],
    FOOTER:       [   5,  'Footer',           'FOOTER'                ],
    TELEMETRY:    [   6,  'Telemetry',        'TELEMETRY'             ],
    TOOLTIP:      [   7,  'ToolTip',          'TOOLTIP'               ],

    DEBUG:        [   9,  'Debug',            'DEBUG'                 ],

    WIDTH:        [  10,  'Width',            'WIDTH'                 ],
    HEIGHT:       [  11,  'Height',           'HEIGHT'                ],

    FRAMERATEA:   [  12,  'FrameRateA',       'FRAMERATE(A)'          ],
    FRAMERATE:    [  13,  'FrameRate',        'FRAMERATE'             ],

    VISIBLE:      [  21,  'Visible',          'VISIBLE'               ],

    SPACER:       [  26,  'Spacer',           'SPACER'                ],

    CURRENT:      [  27,  'Current',          'CURRENT'               ],
    FACTOR:       [  28,  'Factor',           'FACTOR'                ],
    UTIL:         [  29,  'Util',             'UTIL'                  ],

    // Mouse ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    MOUSEX:       [  14,  'MouseX',           'MOUSEX'                ],
    MOUSEY:       [  15,  'MouseY',           'MOUSEY'                ],
    WORLDX:       [  16,  'WorldX',           'WORLDX'                ],
    WORLDY:       [  17,  'WorldY',           'WORLDY'                ],
    GRIDX:        [  18,  'GridX',            'GRIDX'                 ],
    GRIDY:        [  19,  'GridY',            'GRIDY'                 ],

    PRESSED:      [  20,  'Pressed',          'PRESSED'               ],

    FOCUS:        [  22,  'Focus',            'FOCUS'                 ],

    LEFT:         [  23,  'Left button',      'LEFT'                  ],
    CENTER:       [  24,  'Center button',    'CENTER'                ],
    RIGHT:        [  25,  'Right button',     'RIGHT'                 ],

  };
  
  var ALGORITHMS={
    RANDOM:                   0,
    SIMULATED_ANNEALLING:     1,
    ANT_COLONY_OPTIMIZATION:  2,
    GENETIC_BRANCH_BOUND:     3
  };
  
  var app={


      // Debugging aids ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      
      debug:          true,
      telemetry:      true,
      
      
      // TSP ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      
      stops:          [],
      distance:       0,
      running:        false,
      size:           10,
      algorithm:      0,
      
      
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      nodes:          [],
      ctrls:          [],
      
      send:           [],
      received:       [],
      cache:          [],
      
      paths:          [],

      vortex:         [],

      activeNode:     -1,

      gridSize:       0,
      
      focus:          0,
      
      xIncr:          0,
      yIncr:          0,
  
      width:          600,
      height:         600,

      sending:        false,

      frameRate:      30,

    focus:          0,

      mouseX:         1000,
      mouseY:         20,

      dragging:       false,

      left:           false,
      center:         false,
      right:          false,
  
      over:           true,
      keys:           [],

    border:         true,

    stack:          []


  };
  
  var getAlgorithm=function(){ return app.algorithm; };

  // Methods ==================================================================

  var getProp=function(p){

    switch(p){

      case COMMANDS.CURRENT[0]:     return app.current;

      case COMMANDS.DEBUG[0]:       return app.debug;

      case COMMANDS.FOCUS[0]:       return app.focus;
      case COMMANDS.LEFT[0]:        return app.left;
      case COMMANDS.CENTER[0]:      return app.center;
      case COMMANDS.RIGHT[0]:       return app.right;

      case COMMANDS.WIDTH[0]:       return app.width;
      case COMMANDS.HEIGHT[0]:      return app.height;
      case COMMANDS.FRAMERATE[0]:   return app.frameRate;
      //case COMMANDS.FRAMERATEA[0]:  return __frameRate;
      case COMMANDS.MOUSEX[0]:      return app.mouseX;
      case COMMANDS.MOUSEY[0]:      return app.mouseY;
      case COMMANDS.WORLDX[0]:      return app.worldX;
      case COMMANDS.WORLDY[0]:      return app.worldY;
      case COMMANDS.GRIDX[0]:       return app.gridX;
      case COMMANDS.GRIDY[0]:       return app.gridY;

      case COMMANDS.PRESSED[0]:     return app.left;

      // Shape Properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      case COMMANDS.NAME[0]:        return app.name;
      case COMMANDS.CAPTION[0]:     return app.caption;
      case COMMANDS.FORMULA[0]:     return app.formula;

      case COMMANDS.STROKE[0]:      return app.stroke;
      case COMMANDS.STROKEA[0]:     return app.strokeA;

      case COMMANDS.FILL[0]:        return app.fill;
      case COMMANDS.FILLA[0]:       return app.fillA;

      case COMMANDS.LINETYPE[0]:    return app.linetype;
      case COMMANDS.LINEWEIGHT[0]:  return nf(app.lineweight,1,2);

      case COMMANDS.RED[0]:         return app.red;
      case COMMANDS.GREEN[0]:       return app.green;
      case COMMANDS.BLUE[0]:        return app.blue;

      // case COMMANDS.LAYER[0]:       return app.layer;

      // Grid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      case COMMANDS.GRIDPROPS[0]:   return app.gridprops;

      case COMMANDS.ORIGIN[0]:      return app.origin;

      case COMMANDS.AXISX[0]:       return app.axisX;
      case COMMANDS.AXISY[0]:       return app.axisY;

      case COMMANDS.LINESX[0]:      return app.linesX;
      case COMMANDS.LINESY[0]:      return app.linesY;

      case COMMANDS.ARROWSX[0]:     return app.arrowsX;
      case COMMANDS.ARROWSY[0]:     return app.arrowsY;

      case COMMANDS.TICKSX[0]:      return app.ticksX;
      case COMMANDS.TICKSY[0]:      return app.ticksY;

      case COMMANDS.LABELSX[0]:     return app.labelsX;
      case COMMANDS.LABELSY[0]:     return app.labelsY;

      case COMMANDS.QUADRANTS[0]:   return app.quadrants;

      // Footer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      case COMMANDS.COORDINATES[0]: return app.coordinates;
      case COMMANDS.ORTHO[0]:       return app.ortho;
      case COMMANDS.STG[0]:         return app.stg;
      case COMMANDS.FS[0]:          return app.fs;

      case COMMANDS.FACTOR[0]:      return app.factor;

      default:  return 0;

    }

  };

  var drawDottedLine=function(x0, y0, x1, y1, n){

    var x,y;

    for(var i=0; i<=n; i++) {

      x = lerp(x0, x1, i/n);
      y = lerp(y0, y1, i/n);

      ellipse(x, y, 1, 1);

    }

  };

  var telemetry=function(){
    
    if(app.over && app.keys[KEYCODES.CONTROL]){

      var rowHeight=20;
      var top=100;
      var left=10;
      
      textAlign(LEFT,BOTTOM);

      // Border
      stroke(CLRS.WHITE);
      strokeWeight(0.25);
      fill(getColor(CLRS.BLACK,40));

      rect(0,top-20,150,500,0,20,20,0);

      fill(getColor(CLRS.WHITE,80));
      textSize(14);
      
      text("Telemetry",         left+30, top+5);
      
      fill(getColor(CLRS.WHITE,60));
      textSize(12);
      
      text("Frame Rate: ",      left, top+2*rowHeight);
      text("controls count: ",  left, top+3*rowHeight);
  
      text("Left: ",            left, top+5*rowHeight);
      text("Center: ",          left, top+6*rowHeight);
      text("Right: ",           left, top+7*rowHeight);
  
      text("Nodes: ",           left, top+9*rowHeight);
      text("controls: ",        left, top+10*rowHeight);
      
      
      text("Cache: ",           left, top+12*rowHeight);
      text("Send: ",            left, top+13*rowHeight);
      text("Received: ",        left, top+14*rowHeight);

      text("Running: ",         left, top+16*rowHeight);

      text("Focus: ",           left, top+18*rowHeight);
      
      text("Algorithm: ",       left, top+20*rowHeight);
      
      fill(CLRS.YELLOW);

      text(app.frameRate,       left+100,  top+2*rowHeight);
      text(app.ctrls.length,    left+100,  top+3*rowHeight);
      
      text(app.left,            left+100,  top+5*rowHeight);
      text(app.center,          left+100,  top+6*rowHeight);
      text(app.right,           left+100,  top+7*rowHeight);
      
      text(app.nodes.length,    left+100,  top+9*rowHeight);
      text(app.ctrls.length,    left+100,  top+10*rowHeight);

      text(app.cache.length,    left+100,  top+12*rowHeight);
      text(app.send.length,     left+100,  top+13*rowHeight);
      text(app.received.length, left+100,  top+14*rowHeight);

      text(app.running,         left+100,  top+16*rowHeight);

      text(app.focus,           left+100,  top+18*rowHeight);

      text(app.algorithm,       left+100,  top+20*rowHeight);

      // Cache
      textSize(16);
      textAlign(LEFT,TOP);
      fill(CLRS.YELLOW);
      
      text(app.cache,5,5);                        //  cache contents
      text(app.cache.length,5,50);                //  cache length
  
      // # Received
      textAlign(LEFT,BOTTOM);
      text(app.received.length,5,app.height-5);   //  # of packets received
      
    }
    
    // Display received packets
    var strReceived="";

    for(var n in app.received){
      strReceived+=app.received[n].stringValue;
    }

    if(textWidth(strReceived)>480){

      textAlign(RIGHT,BOTTOM);
      text(strReceived,540,600);

      rectMode(CORNER);
      fill(CLRS.BACKGROUND_0);
      rect(-10,580,70,55);

    }
    else{

      textAlign(LEFT,BOTTOM);
      text(strReceived, 60,600);

    }
    
  };


  // Objects ==================================================================

  
  // Point ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  var pt=function(x,y,value,clr){
      
      this.x=x;
      this.y=y;
  
      this.color=clr;
  
      this.value=value;
  
    };
    
  // Node ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  var getNodeAddress=function(){

    var NAT=round(random(0,255))+"."+round(random(0,255))+"."+round(random(0,255))+"."+round(random(0,255));

    // println(NAT);

    return NAT;

  };
  
  var Node=function(id,x,y,row,col,routes){

    // if(id===undefined){ this.id=getNodeAddress(); }
    // else              { this.id=id;               }

    this.id=id;
    this.nat=getNodeAddress();

    this.gridID=row+":"+col;

    this.row=row;         //  row location
    this.col=col;         //  column location

    this.x=x;             //  x-coordinate
    this.y=y;             //  y-coordinate

    this.r=random(20,40); //  radius
    this.w=10;            //  width
    this.h=10;            //  height

    this.routes=routes;   //  # of paths to the node

    this.hit=false;       //  mouse is over node
    this.enabled=true;    //  currently functional
    this.selected=false;

    this.connections=[];

    this.xIncr=random(-5,5);
    this.yIncr=random(-5,5);

    this.distance=0;

  };
  Node.prototype.draw=    function(x,y){

    // Node connections
    stroke(getColor(CLRS.CONNECTION,255));
    strokeWeight(0.75);

    for(var n in this.connections){
      line(this.x, this.y, this.connections[n].x, this.connections[n].y);
    }

    // Range ellipse
    fill(getColor(CLRS.WHITE,6));
    stroke(CLRS.WHITE);
    strokeWeight(0.125);

    if(this.enabled){
      ellipse(this.x, this.y, this.r*2, this.r*2);
    }
    
    // Node ellipse
    fill(getColor(CLRS.WHITE,255));

    ellipse(this.x, this.y, this.r/2, this.r/2);
    
    if(this.enabled){
      
      fill(CLRS.GREEN);
      ellipse(this.x,this.y,10,10);

    }
    else{
      
      fill(CLRS.RED);
      ellipse(this.x,this.y,10,10);
      
    }
    
    // Connection count label
    if(this.hit){
      
      textSize(12);
      textAlign(LEFT,TOP);

      fill(getColor(CLRS.BLACK,75));
      rectMode(CORNER);
      rect(this.x-3,this.y,textWidth(this.id)+6,76,3);
      
      fill(CLRS.WHITE);

      text(this.gridID,             this.x, this.y);
      text(this.id,                 this.x, this.y+12);
      text(this.row+":"+this.col,   this.x, this.y+24);
      text(this.nat,                this.x, this.y+36);
      text(this.connections.length, this.x, this.y+48);
      text(this.routes,             this.x, this.y+60);
      
      fill(CLRS.YELLOW);
      
    }
    else{

      // noFill();

    }
    


    // this.x+=random(-3,3);
    // this.y+=random(-3,3);
    
  };
  Node.prototype.clicked= function(x,y){

    if(this.hit){
      this.enabled=!this.enabled;
      
println(this.enabled);
      
    }

  };
  Node.prototype.moved=   function(x,y){

    if(mouseX>this.x-this.r &&
       mouseX<this.x+this.r &&
       mouseY>this.y-this.r &&
       mouseY<this.y+this.r){
         
      this.hit=true;
      app.focus=this.id;
      
    }
    else{

      this.hit=false;

    }

  };
  Node.prototype.dragged= function(x,y){

    if(this.hit &&
       app.left &&
       app.activeNode===this.id &&
       app.keys[KEYCODES.CONTROL]){

      this.x=x;
      this.y=y;

      // this.load();

    }

  };
  Node.prototype.pressed= function(x,y){

    if(this.hit){
      app.activeNode=this.id;
    }

  };
  Node.prototype.released=function(x,y){

    if(this.hit){
      app.activeNode=-1;
    }

  };
  Node.prototype.load=    function(){

    this.connections=[];

    for(var n in app.nodes){

        if(app.nodes[n].id!=this.id){
          if(dist(app.nodes[n].x,
                  app.nodes[n].y,
                  this.x,
                  this.y)<(app.nodes[n].r+this.r*2)){

            this.connections.push(app.nodes[n]);

          }
        }

    }

  };
  Node.prototype.disable= function(node){

    if(node.connections.length===0){ exit(); }

    var min=dist(node.connections[0].x, node.connections[0].y, endNode.x, endNode.y);
    var distance=min;
    var index=0;
    
    for(var n=0; n<node.connections.length; n++){

      node.connections[n].active=false;
      
      distance=dist(node.connections[n].x, node.connections[n].y, endNode.x, endNode.y);
      
      if(distance<min){
        
        min=distance;
        index=n;

      }

    }
    
    disableNode(node.connections[index]);
    
  };
  
  // Packet ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Packet=function(source, destination, text){

    var dX=0;
    var dY=0;
    var sX=0;
    var sY=0;

    // this.source=      app.nodes[round(random(1,app.nodes.length-1))];
    // this.destination= app.nodes[round(random(1,app.nodes.length-1))];

    this.source=      app.nodes[0];
    this.destination= app.nodes[app.nodes.length-1];

    this.path=[];     //  nodes packet will traverse
    this.points=[];   //  path points of packet
    this.p=0;         //  current index of packet on path

    this.stringValue=text;
    this.charCode=text.charCodeAt(0);
    this.binaryValue=binary(this.charCode);
    
    /**
        Determine the shortest path from the source to the
        destintaion using only adjacent connected nodes.
        Terminate when the source and destination nodes
        are the same.
     */

    // Set the source node
    var src=this.source;
    var dest=this.destination;
    var distance=Infinity;
    var index=0;
    var n=0;
    
    this.path.push(src);
    
    while(src.id!=dest.id){

      distance=dist(src.connections[n].x,
                    src.connections[n].y,
                    dest.x,
                    dest.y);
                
      // Find the node in connections that
      // is closest to the destination.
      for(n=0; n<src.connections.length; n++){
        
        if(src.connections[n].enabled){
        
          if(dist(src.connections[n].x,
                  src.connections[n].y,
                  dest.x,
                  dest.y)<distance){
            index=n;
            distance=dist(src.connections[n].x,
                          src.connections[n].y,
                          dest.x,
                          dest.y);
          }
        
        }
        
      }
      
      // println(distance);
      // println(src.id+":"+dest.id);
      // println(n);
      // println("=======================");
      
      // add the closest node to the destination to the path
      this.path.push(src.connections[index]);
      
      // src.selected=true;
      
      // Set the source node to the last node in the path and repeat
      src=src.connections[index];

      n=0;
      index=0;
      distance=Infinity;

    }

    // this.destination.selected=true;

    this.path.push(this.destination);
    
    for(n=0; n<this.path.length-1; n++){
      
      // println(this.path[0].x);
      for(var c=0; c<10; c++){
        this.points.push(new pt(lerp(this.path[n].x, this.path[n+1].x, c/10),
                                lerp(this.path[n].y, this.path[n+1].y, c/10)));
      }
      
    }

// println("break");

  };
  Packet.prototype.draw=    function(){

    if(this.p<this.points.length-1){
      
      // Background
      noStroke();
      fill(getColor(CLRS.NODE_BLUE,64));
      
      rect(this.points[this.p].x,
           this.points[this.p].y-5,
           40, 35, 5);
      
      // Character value
      fill(CLRS.BLACK);
      textAlign(CENTER,BOTTOM);
      textSize(16);
      
      text(this.stringValue,
           this.points[this.p].x,
           this.points[this.p].y);

      // Binary value
      fill(96);
      textAlign(CENTER,TOP);
      textSize(9);
      
      text(this.binaryValue,
           this.points[this.p].x,
           this.points[this.p].y);
      
      // Increment ordinal position along path
      this.p++;

    }
    else{
      app.send.splice(0,1);
      app.received.push(this);
    }

  };
  Packet.prototype.clicked= function(){

    if(app.current===COMMANDS.SELECT[0]){

      if(this.hit){
        this.selected=!this.selected;
        for(var n in this.vertices){ this.vertices[n].selected=this.selected; }
      }

    }

  };
  Packet.prototype.moved=   function(x,y){};
  Packet.prototype.dragged= function(){

    for(var n in this.vertices){

      if(this.hitP[n] && app.left){
        this.vertices[n].x=app.mouseX;
        this.vertices[n].y=app.mouseY;
        this.recalc();
      }

    }

  };


  // ctrls =================================================================

  var Control=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){

    this.id=id;             //  Unique control id

    this.parent=parent;     //  Container control
    
    this.ctrls=ctrls;       //  contained ctrls
    
    this.x=x;               //  x-coordinate
    this.y=y;               //  y-coordinate
  
    this.w=width;           //  width
    this.h=height;          //  height
  
    this.color=color;       //  Color
  
    this.caption=caption;   //  Caption
  
    this.execute=execute;   //  Executes on click
  
    this.hit=false;         //  mouse is over node
    this.active=true;       //  currently functional
    this.selected=false;    //  highlighted
  
    this.visible=true;      //  Is the button visible?
  
    this.timer=0;          //  Countdown timer

    this.tag=0;             //  Misc property
    
    this.params=params;     // optional parameter (arrays, boolean...)
    
  };
  Control.prototype.draw=     function(x,y){

    if (typeof this.parent != "undefined") {
      // alert("GOT THERE");
      // println("No parent");
    }
    
    // if(this.visible){

    //   if(this.hit){ fill(getColor(CLRS.WHITE,5));                 }
    //   else        { fill(getColor(this.color,this.timer/30*50));  }
  
    //   rectMode(CORNER);
    //   noStroke();
      
    //   // Border/Background
    //   rect(this.x, this.y, this.w, this.h, 10);
      
    //   // Caption
    //   textAlign(CENTER,CENTER);
    //   textSize(24);
      
    //   if(this.hit){ fill(getColor(CLRS.WHITE,75)); }
    //   else        { fill(getColor(CLRS.WHITE,50)); }
      
    //   text(this.caption, this.x+this.w/2, this.y+this.h/2);
    
    // }
    
  };
  Control.prototype.clicked=  function(x,y){

    if(this.hit){ this.execute(); }

  };
  Control.prototype.moved=    function(x,y){

    if(x>this.x &&
       x<this.x+this.w &&
       y>this.y &&
       y<this.y+this.h){
         
      this.hit=true;
      app.focus=this.id;

      for(var c in this.ctrls){ this.ctrls[c].moved(mouseX,mouseY); }

    }
    else{

      this.hit=false;

    }

  };
  Control.prototype.dragged=  function(x,y){

    // if(this.hit){
    //   this.x=x;
    //   this.y=y;
    // }

  };
  Control.prototype.pressed=  function(x,y){

    if(this.hit){
      
    }

  };
  Control.prototype.released= function(x,y){

    if(this.hit){
      
    }

  };
  Control.prototype.over=     function(x,y){

    this.visible=true;

  };
  Control.prototype.out=      function(x,y){

    this.visible=false;

  };
  
  
  // Container ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Container=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){

    Control.call(this,id,parent,ctrls,x,y,width,height,color,caption,execute,params);
    
  };
  Container.prototype.draw=     function(x,y){

    if(this.visible){

      // if(this.tag!=false){

        if(this.hit){
  
          fill(getColor(this.color, 15+this.timer));
  
          if(this.timer<10){ this.timer++; }
  
          cursor(ARROW);
  
        }
        else{
  
          fill(getColor(this.color, 15+this.timer));
          
          if(this.timer>5){  this.timer--; }
  
        }
    
        rectMode(CORNER);
        noStroke();
        stroke(CLRS.RED);
        strokeWeight(1);
        
        // Border/Background
        if(this.tag==true){
        
          rect(this.x, this.y, this.w, this.h, 10);
        
        }
        
        // Caption
        textAlign(CENTER,CENTER);
        textSize(24);
        
        if(this.hit){ fill(getColor(CLRS.WHITE,75)); }
        else        { fill(getColor(CLRS.WHITE,50)); }
        
        // text(this.caption, this.x+this.w/2, this.y+this.h/2);
      
      // }
      
      for(var c in this.ctrls){ this.ctrls[c].draw(this.x, this.y); }

    }

  };
  Container.prototype.clicked=  function(x,y){

    if(this.hit){

      for(var c in this.ctrls){ this.ctrls[c].clicked(this.y, this.x); }

      // this.execute();

    }

  };
  Container.prototype.moved=    function(x,y){

    if(mouseX>this.x &&
       mouseX<this.x+this.w &&
       mouseY>this.y &&
       mouseY<this.y+this.h){
         
      this.hit=true;
      app.focus=this.id;

      for(var c in this.ctrls){ this.ctrls[c].moved(this.x, this.y); }
               
    }
    else{
      
      this.hit=false;
      this.timer=0;
      
    }

  };
  Container.prototype.dragged=  function(x,y){

    // if(this.hit){
    //   this.x=x;
    //   this.y=y;
    //   for(var c in this.ctrls){ this.ctrls[c].dragged(mouseX,mouseY); }
    // }
    
      
  };
  Container.prototype.pressed=  function(x,y){

//     if(this.hit){

//       for(var c in this.ctrls){ this.ctrls[c].pressed(mouseX,mouseY); }
      
// println(this.keys.length);

//     }

  };
  Container.prototype.released= function(x,y){

    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].released(mouseX,mouseY); }
    }

  };
  Container.prototype.over=     function(x,y){

    this.visible=true;

  };
  Container.prototype.out=      function(x,y){

    this.visible=false;

  };
  

  // Button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Label=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){
    
    Control.call(this,id,parent,ctrls,x,y,width,height,color,caption,execute,params);

  };
  Label.prototype.draw=     function(x,y){

    if(this.visible){

      if(this.hit){   fill(getColor(this.color,0));
                      cursor(ARROW);                  }
      else{           fill(getColor(this.color,0));   }

      rectMode(CORNER);
      noStroke();
      
      textSize(this.h);
      textAlign(LEFT,CENTER);

      rect(x+this.x, y+this.y,
           textWidth(this.caption)+30, this.h,
           10);

      // Caption ~~~~~~~~~~
      stroke(CLRS.GRAY);
      strokeWeight(0.5);

      if(this.hit){ fill(getColor(CLRS.WHITE,75)); }
      else        { fill(getColor(CLRS.WHITE,50)); }

      text(this.caption,
           x+this.x,
           y+this.y+this.h/2);
      
      // Control origin ~~~~~~~~~~
      if(app.debug){  fill(CLRS.RED);
                      ellipse(x+this.x,y+this.y,3,3);
                   }
    }
    
  };
  Label.prototype.clicked=  function(x,y){

    // if(this.hit){ this.execute(this.params); }

  };
  Label.prototype.moved=    function(x,y){

    if(mouseX>x+this.x &&
       mouseX<x+this.x+this.w &&
       mouseY>y+this.y &&
       mouseY<y+this.y+this.h){
      
      app.focus=this.id;
      this.hit=true;

    }
    else{

      this.hit=false;

    }

  };
  Label.prototype.dragged=  function(x,y){

    // if(this.hit){
    //   this.x=x;
    //   this.y=y;
    // }

  };
  Label.prototype.pressed=  function(x,y){

    if(this.hit){
      
    }

  };
  Label.prototype.released= function(x,y){

    if(this.hit){
      
    }

  };
  Label.prototype.over=     function(x,y){

    this.visible=true;

  };
  Label.prototype.out=      function(x,y){

    this.visible=false;

  };
  
  // Option ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Option=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){
    
    Control.call(this,id,parent,ctrls,x,y,width,height,color,caption,execute,params);

  };
  Option.prototype.draw=    function(x,y){

    if(this.visible){

      if(this.hit){ fill(getColor(this.color,20));
                    cursor(HAND);                   }
      else        { fill(getColor(this.color,0));   }

      rectMode(CORNER);
      noStroke();

      textSize(12);
      textAlign(LEFT,CENTER);

      rect(x+this.x, y+this.y,
           textWidth(this.caption)+30, this.h,
           10);

      // Outer Ellipse ~~~~~~~~~~~
      stroke(CLRS.GRAY);
      strokeWeight(0.5);

      ellipse(x+this.x+10,
              y+this.y+this.h/2,
              10, 10);

      // Inner ellipse ~~~~~~~~~~~
      if(this.ctrls()==this.params){ fill(CLRS.RED); }
      else                         { noFill(); noStroke(); }

      ellipse(x+this.x+10,
              y+this.y+this.h/2,
              7, 7);

      // Caption ~~~~~~~~~~
      if(this.hit){ fill(getColor(CLRS.WHITE,75)); }
      else        { fill(getColor(CLRS.WHITE,50)); }

      text(this.caption,
           x+this.x+20,
           y+this.y+this.h/2);

      // Control origin ~~~~~~~~~~
      if(app.debug){  fill(CLRS.RED);
                      ellipse(x+this.x,y+this.y,3,3);
                   }

    }
    
  };
  Option.prototype.clicked= function(x,y){

    if(this.hit){ this.execute(this.params); }

  };
  Option.prototype.moved=   function(x,y){

    if(mouseX>x+this.x &&
       mouseX<x+this.x+this.w &&
       mouseY>y+this.y &&
       mouseY<y+this.y+this.h){
      
      app.focus=this.id;
      this.hit=true;

    }
    else{

      this.hit=false;

    }

  };
  Option.prototype.dragged= function(x,y){

    // if(this.hit){
    //   this.x=x;
    //   this.y=y;
    // }

  };
  Option.prototype.pressed= function(x,y){

    if(this.hit){
      
    }

  };
  Option.prototype.released=function(x,y){

    if(this.hit){
      
    }

  };
  Option.prototype.over=    function(x,y){

    this.visible=true;

  };
  Option.prototype.out=     function(x,y){

    this.visible=false;

  };
  
  // Button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Button=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){
    
    Control.call(this,id,parent,ctrls,x,y,width,height,color,caption,execute,params);

  };
  Button.prototype.draw=    function(x,y){

    if (typeof this.parent != "undefined") {
      // alert("GOT THERE");
      // println("No parent");
    }

    if(this.visible){

      if(this.hit){
        
        fill(getColor(this.color,20));
        cursor(HAND);
        
      }
      else{

        fill(getColor(this.color,this.timer/30*255));

      }

      rectMode(CORNER);
      noStroke();

      rect(x+this.x, y+this.y,
           this.w,   this.h,
           10);

      // Caption
      textAlign(CENTER,CENTER);
      textSize(24);

      if(this.hit){ fill(getColor(CLRS.WHITE,75)); }
      else        { fill(getColor(CLRS.WHITE,50)); }

      text(this.caption,
           x+this.x+this.w/2,
           y+this.y+this.h/2);

    }
    
  };
  Button.prototype.clicked= function(x,y){

    if(this.hit){ this.execute(); }

  };
  Button.prototype.moved=   function(x,y){

    if(mouseX>x+this.x &&
       mouseX<x+this.x+this.w &&
       mouseY>y+this.y &&
       mouseY<y+this.y+this.h){
      
      app.focus=this.id;
      this.hit=true;

    }
    else{

      this.hit=false;

    }

  };
  Button.prototype.dragged= function(x,y){

    // if(this.hit){
    //   this.x=x;
    //   this.y=y;
    // }

  };
  Button.prototype.pressed= function(x,y){

    if(this.hit){
      
    }

  };
  Button.prototype.released=function(x,y){

    if(this.hit){
      
    }

  };
  Button.prototype.over=    function(x,y){

    this.visible=true;

  };
  Button.prototype.out=     function(x,y){

    this.visible=false;

  };


  // Button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var codeButton=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){
    
    Control.call(this,id,parent,ctrls,x,y,width,height,color,caption,execute,params);

  };
  codeButton.prototype.draw=    function(x,y){

    if (typeof this.parent != "undefined") {
      // alert("GOT THERE");
      // println("No parent");
    }

    if(this.visible){

      if(this.hit){
        
        fill(getColor(this.color,90));
        cursor(HAND);
        
      }
      else{

        fill(getColor(CLRS.BLACK,70));

      }

      rectMode(CORNER);
      noStroke();

      rect(x+this.x, y+this.y,
           this.w,   this.h,
           10);

      // Caption
      textAlign(CENTER,CENTER);
      textSize(this.h*0.72);

      if(this.hit){ fill(getColor(CLRS.WHITE,75)); }
      else        { fill(getColor(CLRS.WHITE,50)); }

      text(this.caption,
           x+this.x+this.w/2,
           y+this.y+this.h/2);

    }
    
  };
  codeButton.prototype.clicked= function(x,y){

    if(this.hit){ this.execute(); }

  };
  codeButton.prototype.moved=   function(x,y){

    if(mouseX>x+this.x &&
       mouseX<x+this.x+this.w &&
       mouseY>y+this.y &&
       mouseY<y+this.y+this.h){
      
      app.focus=this.id;
      this.hit=true;

    }
    else{

      this.hit=false;

    }

  };
  codeButton.prototype.dragged= function(x,y){

    // if(this.hit){
    //   this.x=x;
    //   this.y=y;
    // }

  };
  codeButton.prototype.pressed= function(x,y){

    if(this.hit){
      
    }

  };
  codeButton.prototype.released=function(x,y){

    if(this.hit){
      
    }

  };
  codeButton.prototype.over=    function(x,y){

    this.visible=true;

  };
  codeButton.prototype.out=     function(x,y){

    this.visible=false;

  };
  
  // Key ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var inputKey=function(k){

    app.cache+=k;

  };

  var Key=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){

    Control.call(this,id,parent,ctrls,x,y,width,height,color,caption,execute,params);

  };
  Key.prototype.draw=       function(x,y){

    if(this.visible){
      
      if(app.left &&
         this.hit){ this.offset=1; }
      else        { this.offset=0; }

      if(this.hit){

        if(app.left){ fill(getColor(this.color,85)); }
        else        { fill(getColor(this.color,70)); }

        cursor(HAND);

      }
      else{
        
        if(this.parent.hit){ fill(getColor(this.color,40)); }
        else               { fill(getColor(this.color,30)); }
        
        // cursor(ARROW);
        
      }

      rectMode(CORNER);
      noStroke();
      
      // Border/Background
      rect(x+this.x+this.offset,
           y+this.y+this.offset,
           this.w, this.h,
           10);
      
      // Caption
      textAlign(CENTER,CENTER);
      textSize(24);

      if(this.hit){ fill(getColor(CLRS.WHITE,100)); }
      else        { fill(getColor(CLRS.WHITE,50));  }
      
      text(this.caption,
           x+this.x+this.w/2+this.offset,
           y+this.y+this.h/2+this.offset);

    }

  };
  Key.prototype.clicked=    function(x,y){

    if(this.hit){

      this.execute(this.caption);

    }

  };
  Key.prototype.moved=      function(x,y){
    
    // Control.moved(this,x,y);
    
    if(mouseX>x+this.x && mouseX<x+this.x+this.w &&
       mouseY>y+this.y && mouseY<y+this.y+this.h){

      app.focus=this.id;
      this.hit=true;

    }
    else{

      this.hit=false;

    }

  };
  Key.prototype.dragged=    function(x,y){

    // if(this.hit){
    //   this.x=x;
    //   this.y=y;
    // }

  };
  Key.prototype.pressed=    function(x,y){

    if(this.hit){

// println(this.caption);

      this.pressed=true;

    }

  };
  Key.prototype.released=   function(x,y){

    if(this.hit){
      this.pressed=false;
    }

  };
  Key.prototype.over=       function(x,y){

    this.visible=true;

  };
  Key.prototype.out=        function(x,y){

    this.visible=false;

  };


  // Keypad ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Keypad=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){

    Control.call(this,id,parent,ctrls,x,y,width,height,color,caption,execute,params);
    
  };
  Keypad.prototype.draw=    function(x,y){

    if(this.visible){

      if(this.hit){

        if(this.tag<this.h){ this.tag+=10; }
        
      }
      else{
        
        if(this.tag>0){ this.tag-=10; }
        
      }

      if(this.hit){

        fill(getColor(this.color, 15+this.timer));

        if(this.timer<10){ this.timer++; }

        cursor(ARROW);

      }
      else{

        fill(getColor(this.color, 15+this.timer));

        if(this.timer>5){  this.timer--; }

      }

      rectMode(CORNER);
      noStroke();
      
      stroke(this.color);
      strokeWeight(1);

      // Border/Background
      rect(this.x, this.y-this.tag,
           this.w, this.h,
           10,20);

      // Caption
      textAlign(CENTER,CENTER);
      textSize(24);

      if(this.hit){ fill(getColor(CLRS.WHITE,75)); }
      else        { fill(getColor(CLRS.WHITE,50)); }

      // text(this.caption, this.x+this.w/2, this.y+this.h/2);
      if(this.tag>0){
        for(var c in this.ctrls){ this.ctrls[c].draw(this.x,this.y-this.tag); }
      }

    }

  };
  Keypad.prototype.clicked= function(x,y){

    if(this.hit){

      for(var c in this.ctrls){ this.ctrls[c].clicked(mouseX,mouseY); }

      // this.execute();

    }

  };
  Keypad.prototype.moved=   function(x,y){

    if(mouseX>this.x &&
       mouseX<this.x+this.w &&
       mouseY>this.y-this.tag &&
       mouseY<this.y+this.h-this.tag){

      this.hit=true;
      app.focus=this.id;

      for(var c in this.ctrls){ this.ctrls[c].moved(this.x, this.y-this.tag); }

    }
    else{

      this.hit=false;
      this.timer=0;

    }

  };
  Keypad.prototype.dragged= function(x,y){

    // if(this.hit){
    //   this.x=x;
    //   this.y=y;
    //   for(var c in this.ctrls){ this.ctrls[c].dragged(mouseX,mouseY); }
    // }
    
      
  };
  Keypad.prototype.pressed= function(x,y){

//     if(this.hit){

//       for(var c in this.ctrls){ this.ctrls[c].pressed(mouseX,mouseY); }
      
// println(this.keys.length);

//     }

  };
  Keypad.prototype.released=function(x,y){

    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].released(mouseX,mouseY); }
    }

  };
  Keypad.prototype.over=    function(x,y){

    this.visible=true;

  };
  Keypad.prototype.out=     function(x,y){

    this.visible=false;
    this.hit=false;
    
  };


  // Network ============================================================
  {
  var blank=function(){
  
    
    
  };
  var sendPacket=function(){
    
    app.send.push(new packet(0,0));

  };

  var loadGrid=function(arr){
    
    app.nodes=[];
    
    var arrRow=[];
    var routes;
    var row=0;
    var col=0;
    
    for(row=0; row<app.gridSize; row++){
      for(col=0; col<app.gridSize; col++){

        if(col>0 && row>0){ routes=arrRow[col-1].routes + app.nodes[row-1][col].routes; }
        else              { routes=1;                                                   }

        arrRow.push(new Node(getGUID(), row*app.xIncr+app.xIncr, col*app.yIncr+app.yIncr, row, col, routes));

      }
      
      app.nodes.push(arrRow);
      arrRow=[];

    }

    var nodes=[];
    
    for(var row=0; row<app.nodes.length; row++){
      for(var col=0; col<app.nodes.length; col++){
        nodes.push(app.nodes[row][col]);
      }
    }

    app.nodes=nodes;

    loadConnections();

// println(app.nodes.length);

  };

  var loadConnections=function(){

    for(var n in app.nodes){ app.nodes[n].load(); }

  };

  var drawGrid=function(){

    pushMatrix();
    
      translate(app.width/2, app.height/2);
      
      noStroke();
      fill(CLRS.BACKGROUND_0);
      rectMode(CENTER);
      
      rect(0, 0, app.width, app.height);
    
    popMatrix();

    for(var n in app.nodes){ app.nodes[n].draw(0,0); }
    for(var n in app.send) { app.send[n].draw(0,0);  }

    sendPackets();

  };

  var addMessage=function(){

    app.cache+="This is the message that will be sent";
    app.cache+=" | S |";
    
  };
  
  var send=function(){

    app.sending=true;
    
    printArray1D(app.cache);
    
  };
  var clearCache=function(){
    
    app.cache="";
    // app.send=[];
    // app.received="";
    
  };

  var reset=function(){

  };

  var setGrid=function(){

    app.vortex=[];

    app.frameRate=30;

    loadGrid();

    app.ctrls=[];
    
    
    // Toolbar
    
    var actrls=[];
    
    var toolbar =new Container(getGUID(), undefined, actrls, 200, 10, 450, 40, CLRS.BLACK, "toolbar", blank);
    
    actrls.push(new Button(getGUID(), toolbar, [],  10, 5, 100, 30, CLRS.CODE_TEAL, "add",    addMessage));
    actrls.push(new Button(getGUID(), toolbar, [], 120, 5, 100, 30, CLRS.CODE_TEAL, "send",   send));
    actrls.push(new Button(getGUID(), toolbar, [], 230, 5, 100, 30, CLRS.CODE_TEAL, "back..", setSplash));
    actrls.push(new Button(getGUID(), toolbar, [], 340, 5, 100, 30, CLRS.CODE_TEAL, "clear",  clearCache))
    
    toolbar.ctrls=actrls;
    toolbar.tag=false;
    
    app.ctrls.push(toolbar);


    // Keypad
    
    var ctrls=[];
    var sz=40;
    var keyClr=CLRS.CODE_PURPLE;
    
    var keypad=new Keypad(getGUID(), undefined, [], 250,  590,  510, 210, keyClr,"keypad", blank);
    
    ctrls.push(new Key(getGUID(), keypad, [],  10,   10,   sz,  sz, keyClr,  "q",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  60,   10,   sz,  sz, keyClr,  "w",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  110,  10,   sz,  sz, keyClr,  "e",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  160,  10,   sz,  sz, keyClr,  "r",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  210,  10,   sz,  sz, keyClr,  "t",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  260,  10,   sz,  sz, keyClr,  "y",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  310,  10,   sz,  sz, keyClr,  "u",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  360,  10,   sz,  sz, keyClr,  "i",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  410,  10,   sz,  sz, keyClr,  "o",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  460,  10,   sz,  sz, keyClr,  "p",  inputKey));
    
    ctrls.push(new Key(getGUID(), keypad, [],  40,   60,   sz,  sz, keyClr,  "a",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  90,   60,   sz,  sz, keyClr,  "s",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  140,  60,   sz,  sz, keyClr,  "d",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  190,  60,   sz,  sz, keyClr,  "f",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  240,  60,   sz,  sz, keyClr,  "g",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  290,  60,   sz,  sz, keyClr,  "h",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  340,  60,   sz,  sz, keyClr,  "j",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  390,  60,   sz,  sz, keyClr,  "k",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  440,  60,   sz,  sz, keyClr,  "l",  inputKey));
    
    ctrls.push(new Key(getGUID(), keypad, [],  70,   110,  sz,  sz, keyClr,  "z",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  120,  110,  sz,  sz, keyClr,  "x",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  170,  110,  sz,  sz, keyClr,  "c",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  220,  110,  sz,  sz, keyClr,  "v",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  270,  110,  sz,  sz, keyClr,  "b",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  320,  110,  sz,  sz, keyClr,  "n",  inputKey));
    ctrls.push(new Key(getGUID(), keypad, [],  370,  110,  sz,  sz, keyClr,  "m",  inputKey));
      
    ctrls.push(new Key(getGUID(), keypad, [],  90,   160, 300,  sz, keyClr,  " ",  inputKey));
    
    keypad.ctrls=ctrls;
    
    app.ctrls.push(keypad);

    process=drawGrid;
      
  };
  
  var sendPackets=function(){

    if(app.cache.length>0 && frameCount%10==0 && app.sending){

      app.send.push(new Packet(10, 20, app.cache.substring(0,1)));
      app.cache=app.cache.substring(1,app.cache.length);

      if(app.cache.length==0){ app.sending=false; }

    }

  };
  }

  // Travelling Salesman ======================================================
  {
  var arraySwap=function(arr, index1, index2){

    var temp=arr[index1];

    arr[index1]=arr[index2];
    arr[index2]=temp;

  };
  
  var newTSP=function(){

    app.stops=[];

    for(var n=0; n<app.size; n++){
      app.stops.push(new pt(random(150,app.width-20),random(20,app.height-20)));
    }

  };
  
  var retryTSP=function(){

    for(var n=0; n<app.stops.length; n++){
      arraySwap(app.stops,n, round(random(app.stops.length-1)));
    }
    
  };
  
  var runTSP=function(){

    app.running=!app.running;

  };
  var setKeypad=function(){
    
    
    
  };
  var normalize=function(){
  
    var distance=0;
    
    for(var n=0; n<app.stops.length-1; n++){
  
        distance=dist(app.stops[n].x,
                      app.stops[n].y,
                      app.stops[n+1].x,
                      app.stops[n+1].y);
 
      if(distance>(app.width*0.5)){

        arraySwap(app.stops,n,n+1);
        distance=0;
        
      }
    
    }

  };
  
  var swap=function(){
    
    // normalize();
    
    var distance=0;
    var index1=round(random(app.stops.length-1));
    var index2=round(random(app.stops.length-1));
    
    // if(abs(index1-index2<5)){
      
      // println(index1+", "+index2);
      
      arraySwap(app.stops,index1,index2);
  
      for(var n=0; n<app.stops.length-1; n++){
  
        distance+=dist(app.stops[n].x,
                       app.stops[n].y,
                       app.stops[n+1].x,
                       app.stops[n+1].y);
      }
      
      distance+=dist(app.stops[0].x,
                     app.stops[0].y,
                     app.stops[app.stops.length-1].x,
                     app.stops[app.stops.length-1].y);
      
      var difference=app.distance-distance;
      
      if(app.distance<distance){
  
        arraySwap(app.stops,index1,index2);
  
      }
  
    // }
    
  };

  var setTSP=function(){

    app.vortex=[];
    app.nodes=[];
    app.stops=[];
    
    app.frameRate=0;

    // loadGrid();

    app.ctrls=[];

    var ctrls=[];
    
    var cntrTSP =new Container(getGUID(), undefined, [], 10, 10, app.width-20, app.height-20, undefined, "TSP Background", blank);

    ctrls.push(new Button(getGUID(), cntrTSP, [], 10, app.height-40, 100, 30, CLRS.CODE_YELLOW, "back...", setSplash));
    ctrls.push(new Button(getGUID(), cntrTSP, [], 10, 30, 100, 30, CLRS.BACKGROUND_0, "new",     newTSP));

    ctrls.push(new Button(getGUID(), cntrTSP, [], 10, 60, 100, 30, CLRS.BACKGROUND_0, "run",     runTSP));
    ctrls.push(new Button(getGUID(), cntrTSP, [], 10, 90, 100, 30, CLRS.BACKGROUND_0, "retry",   retryTSP));

    ctrls.push(
      new Label( getGUID(), cntrTSP, getAlgorithm,0, 210, 100, 14, CLRS.CODE_PURPLE, "Select Algorithm",setAlgorithm,0));
    ctrls.push(
      new Option(getGUID(), cntrTSP, getAlgorithm,0, 225, 100, 30, CLRS.CODE_PURPLE, "Random",       setAlgorithm,0));
    ctrls.push(
      new Option(getGUID(), cntrTSP, getAlgorithm,0, 250, 100, 30, CLRS.CODE_PURPLE, "Sim Annealing",setAlgorithm,1));
    ctrls.push(
      new Option(getGUID(), cntrTSP, getAlgorithm,0, 275, 100, 30, CLRS.CODE_PURPLE, "Ant Colony",   setAlgorithm,2));
    ctrls.push(
      new Option(getGUID(), cntrTSP, getAlgorithm,0, 300, 100, 30, CLRS.CODE_PURPLE, "Genetic - B&B",setAlgorithm,3));

    // ALGORITHMS.RANDOM:                   0,
    // ALGORITHMS.SIMULATED_ANNEALLING:     1,
    // ALGORITHMS.ANT_COLONY_OPTIMIZATION:  2,
    // ALGORITHMS.GENETIC_BRANCH_BOUND:     3

    // app.ctrls.push(  new Button(2, 225,  0,  100,  30, CLRS.BACKGROUND_0,  "clear",  clearCache))

    cntrTSP.ctrls=ctrls;
    cntrTSP.tag=false;

    app.ctrls.push(cntrTSP);
    
    process=drawTSP;

    for(var n=0; n<app.size; n++){
      app.stops.push(new pt(random(120,app.width-20),random(20,app.height-20)));
    }

  };

  var calculateDistance=function(){

    app.distance=0;

    for(var n=0; n<app.stops.length-1; n++){

      app.distance+=dist(app.stops[n].x,
                         app.stops[n].y,
                         app.stops[n+1].x,
                         app.stops[n+1].y);
    }
    
    app.distance+=dist(app.stops[0].x,
                       app.stops[0].y,
                       app.stops[app.stops.length-1].x,
                       app.stops[app.stops.length-1].y);

  };

  var drawTSP=function(){
    
    pushMatrix();
    
      translate(0.5, 0.5);
      
        background(CLRS.BLACK);
        
        stroke(CLRS.CODE_BLUE);
        fill(getColor(CLRS.CODE_BLUE,75));

        rect(135,5,app.width-140,app.height-10);
        
        stroke(CLRS.RED);
        strokeWeight(2);
        noFill();
        
        for(var n=0; n<app.stops.length-1; n++){
          
          stroke(CLRS.YELLOW);
          strokeWeight(1);
          noFill();
    
          line(app.stops[n].x,  app.stops[n].y,
              app.stops[n+1].x, app.stops[n+1].y);
          
          noStroke();
          fill(CLRS.RED);
    
          if(n==0){ ellipse(app.stops[n].x, app.stops[n].y, 20, 20);  }
          else    { ellipse(app.stops[n].x, app.stops[n].y, 10, 10);    }
    
        }
    
        stroke(CLRS.YELLOW);
        strokeWeight(1);
        noFill();
          
        line(app.stops[0].x,                  app.stops[0].y,
             app.stops[app.stops.length-1].x, app.stops[app.stops.length-1].y);

        noStroke();
        fill(CLRS.RED);
        
        ellipse(app.stops[app.stops.length-1].x, app.stops[app.stops.length-1].y, 20, 20);
        
        calculateDistance();

        // Display total distance
        fill(CLRS.GRAY);
        textSize(24);
        textAlign(LEFT,BOTTOM);
        
        text(app.distance, 20,30);

    popMatrix();
    
    if(app.running){ swap(); }

  };

  var setAlgorithm=function(opt){
    
    app.algorithm=opt;
    
    println(app.algorithm);
    
  };

  }
  
  // Splash Screen ============================================================
  
  var currentP=new pt(0,0);
  var currentX=0;
  var currentY=0;

  var complete=false;

  var vortexRadius=2.5;
  var vortexDiameter=48;
  
  var position=app.vortex.length;
  
  
  // Logo =====================================================================
  var logo=function(x,y){

    // Go faster stripe
    fill(getColor(CLRS.CODE_TEAL,50));
    
    rect(0,app.height/2-50,app.width,100);
    
    //
    fill(getColor(CLRS.BLACK,75));
    noStroke();
    stroke(CLRS.BLACK);
    strokeWeight(0.25);

    rectMode(CORNER);

    rect(x+5,   y-105, 100, 100);
    rect(x+5,   y+5,   100, 100);
    rect(x-105, y-105, 100, 100);
    rect(x-105, y+5,   100, 100);

    fill(getColor(CLRS.WHITE,80));
    
    rectMode(CENTER);
    textSize(72);
    textAlign(CENTER,CENTER);

    text("C", x-52.5, y-52.5);
    text("O", x+52.5, y-52.5);
    text("E", x+52.5, y+52.5);
    text("D", x-52.5, y+52.5);

  };

  var loadData=function(){
  
    app.vortex=[];

    for(var theta=0; theta<PI*vortexDiameter; theta+=PI/18){

      app.vortex.push(new pt( vortexRadius*(cos(theta)+theta*sin(theta)),
                              vortexRadius*(sin(theta)-theta*cos(theta)),
                              round(random(0,1)),
                              color(random(64))
                            )
                      );
    }

  };
  
  var addBit=function(arr){
      
    for(var n=0; n<arr.length-1; n++){
      arr[n].value=arr[n+1].value;
      arr[n].color=arr[n+1].color;
    }

    arr[arr.length-1].value=round(random(0,1));

    if(app.left){ arr[arr.length-1].color=getColor(CLRS.CODE_GREEN,50); }
    else        { arr[arr.length-1].color=color(random(64));           }

  };

  var involute=function(){

    rectMode(CENTER);

    background(CLRS.BLACK);

    noStroke();

    var tSize=3;

    pushMatrix();

      translate(app.width/2,app.height/2);

      for(var radius=900; radius>50; radius-=25){
        fill(getColor(CLRS.GRAY,1));
        ellipse(0,0,radius,radius);
      }

      beginShape();

      for(var n=0; n<app.vortex.length; n++){

        if(app.vortex[n].value===1){
      
          fill(app.vortex[n].color);
          stroke(app.vortex[n].color);
          
          rect(app.vortex[n].x, app.vortex[n].y, tSize*0.15, tSize*0.9);

        }
        else{

          noFill();
          strokeWeight(2);
          stroke(app.vortex[n].color);

          ellipse(app.vortex[n].x, app.vortex[n].y, tSize*0.75, tSize*0.9);

        }

        tSize*=1.003;

      }

      endShape();

    popMatrix();

  };

  var drawSplash=function(){

    involute();

    addBit(app.vortex);

    // Go faster stripe
    fill(getColor(CLRS.CODE_TEAL,70));

    pushMatrix();
      
      noStroke();
      
      rectMode(CORNER);
      rect(0,app.height/2-50,app.width,100);

    popMatrix();

    // logo(app.width/2,app.height/2);

  };
  
  var setSplash=function(){

    app.frameRate=10;

    loadData();
    
    app.ctrls=[];

    // Toolbar
    var ctrls=[];
    
    var cntrSplash =new Container(getGUID(), undefined, [], 0, 0, app.width, app.height, undefined, "Splash Background", blank);
    
    var x=app.width/2;
    var y=app.height/2;
    
    ctrls.push(new codeButton(getGUID(), cntrSplash, undefined,x-105, y-105, 100, 100, CLRS.CODE_PURPLE, "C", setGrid,1));
    ctrls.push(new codeButton(getGUID(), cntrSplash, undefined,x+5,   y-105, 100, 100, CLRS.CODE_ORANGE, "O", setTSP, 2));
    ctrls.push(new codeButton(getGUID(), cntrSplash, undefined,x-105, y+5,   100, 100, CLRS.CODE_BLUE,   "D", setTSP, 3));
    ctrls.push(new codeButton(getGUID(), cntrSplash, undefined,x+5,   y+5,   100, 100, CLRS.CODE_GREEN,  "E", setTSP, 4));

    cntrSplash.ctrls=ctrls;
    cntrSplash.tag=false;

    app.ctrls.push(cntrSplash);

    process=drawSplash;
    
  };


  // Draw loop ================================================================

  var draw=function(){
    
    pushMatrix();
    
      translate(0.5,0.5);
      
      frameRate(app.frameRate);
  
      process();
  
      for(var c in app.ctrls){ app.ctrls[c].draw(0,0); }

    popMatrix();

    if(app.debug){ telemetry(); }

  };



  // Events ===================================================================

  // Mouse Events ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var mouseClicked=function(){

    for(var n in app.nodes){ app.nodes[n].clicked(mouseX,mouseY); }
    for(var c in app.ctrls){ app.ctrls[c].clicked(mouseX,mouseY); }

  };
  var mouseMoved=function(){

    app.mouseX=mouseX;
    app.mouseY=mouseY;

    if(process!=drawTSP){ for(var n in app.nodes){ app.nodes[n].moved(0,0); } }

    for(var c in app.ctrls){ app.ctrls[c].moved(0,0); }

  };
  var mouseDragged=function(){
    
    process();

    for(var c in app.ctrls){ app.ctrls[c].dragged(mouseX,mouseY); }
    for(var d in app.ctrls){ app.ctrls[d].draw(mouseX,mouseY);    }

    telemetry();

    for(var n in app.nodes){ app.nodes[n].dragged(mouseX,mouseY); }

    loadConnections();

  };
  var mousePressed=function(){

    switch(mouseButton){

      case LEFT:    app.left=true;    break;
      case CENTER:  app.center=true;  break;
      case RIGHT:   app.right=true;   break;

      default:                        break;

    }

    for(var n in app.nodes)   { app.nodes[n].pressed(mouseX,mouseY);    }
    for(var c in app.ctrls){ app.ctrls[c].pressed(mouseX,mouseY); }

  };
  var mouseReleased=function(){

    app.left=false;
    app.center=false;
    app.right=false;

    for(var n in app.nodes){ app.nodes[n].released(mouseX,mouseY); }
    for(var c in app.ctrls){ app.ctrls[c].released(mouseX,mouseY); }

  };
  var mouseOut=function(){
    
    app.over=false;
    
    // for(var c in app.ctrls){ app.ctrls[c].out(mouseX,mouseY); }

  };
  var mouseOver=function(){

    app.over=true;

    // for(var c in app.ctrls){ app.ctrls[c].over(mouseX,mouseY); }

  };
  var mouseWheel=function(){

    p("scroll");

  };

  // Keyboard Events ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var keyPressed=function(){

    // if(keyCode===32){
    //   app.current=COMMANDS.SELECT[0];
    //   reset();
    //   process();
    // }

    app.keys[keyCode]=true;

// p(keyCode);

    // switch(keyCode){
    
    //   case KEYCODES.SPACE:                  commands(COMMANDS.SELECT[0]); break;

    //   case KEYCODES.CONTROL && KEYCODES.Z:  commands(COMMANDS.UNDO[0]);   break;
      
    //   case KEYCODES.F7:                     commands(COMMANDS.STG[0]);    break;
    //   case KEYCODES.F8:                     commands(COMMANDS.ORTHO[0]);  break;

    //   default:  break;

    // }

    for(var c in app.ctrls){ app.ctrls[c].pressed(); }

  };
  var keyReleased=function(){

    app.keys[keyCode]=false;

    for(var c in app.ctrls){ app.ctrls[c].released(); }

  };
  var keyTyped=function(){

    // switch(key){

    //   case app.keys[KEYCODES.SPACE]:      commands(COMMANDS.SELECT[0]); break;

    //   case app.keys[KEYCODES.CONTROL] &&
    //       app.keys[KEYCODES.Z]:          commands(COMMANDS.UNDO[0]);   break;
    //   case app.keys[KEYCODES.F7]:         commands(COMMANDS.STG[0]);    break;
    //   case app.keys[KEYCODES.F8]:         commands(COMMANDS.ORTHO[0]);  break;

    //   default:  break;

    // }
    app.cache+=key.toString();
    // for(var c in app.ctrls){ app.ctrls[c].typed(); }

  };



  // Initialize ===============================================================
  
  var addControls=function(){

    // var ctrls=[];

    // var cn=new grid(
    //         new propC("grid", 0, 0, 0, app.width, app.height, 0, ARROW, false, COMMANDS.UNDEF[0], 0),
    //         new propL(CLRS.GRID, getColor(CLRS.GRID,65), CLRS.WHITE, CLRS.YELLOW, 0, 0),
    //         new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    // cn.ctrls=ctrls;
    
    // app.ctrls.push(cn);

  };

  var initialize=function(){

    size(app.width, app.height); // set size of canvas

    app.gridSize=11,

    app.xIncr=app.width/(app.gridSize+1),
    app.yIncr=app.height/(app.gridSize+1),

    // setGrid();
    // setTSP();
    setSplash();

  };

  initialize();

}};
