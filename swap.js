

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
  
  var hitTriangle=function(x1,y1,x2,y2,x3,y3){

    // Point triangle ~~~~~~~~~~~~~~~~~~~~~~~~~
    var a=dist(x1,y1,x2,y2);
    var b=dist(x2,y2,x3,y3);
    var c=dist(x3,y3,x1,y1);

    var s=(a+b+c)/2;

    var area=floor(pow(s*(s-a)*(s-b)*(s-c),0.5));

    // Mouse Triangle 1 ~~~~~~~~~~~~~~~~~~~~~~~~~
    a=dist(mouseX,mouseY,x2,y2);
    b=dist(x2,y2,x3,y3);
    c=dist(x3,y3,mouseX,mouseY);

    s=(a+b+c)/2;

    var area1=floor(pow((s*(s-a)*(s-b)*(s-c)),0.5));
    
    // Mouse Triangle 2 ~~~~~~~~~~~~~~~~~~~~~~~~~
    a=dist(x1,y1,mouseX,mouseY);
    b=dist(mouseX,mouseY,x3,y3);
    c=dist(x3,y3,x1,y1);

    s=(a+b+c)/2;

    var area2=floor(pow(s*(s-a)*(s-b)*(s-c),0.5));
    
    // Mouse Triangle 3 ~~~~~~~~~~~~~~~~~~~~~~~~~
    a=dist(x1,y1,x2,y2);
    b=dist(x2,y2,mouseX,mouseY);
    c=dist(mouseX,mouseY,x1,y1);

    s=(a+b+c)/2;

    var area3=floor(pow(s*(s-a)*(s-b)*(s-c),0.5));

    return abs(area-(area1+area2+area3))<=3;
    
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
    SPLASH:     1,
    TSP:        2
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

    pressed:      [  20,  'pressed',          'pressed'               ],

    FOCUS:        [  22,  'Focus',            'FOCUS'                 ],

    LEFT:         [  23,  'Left button',      'LEFT'                  ],
    CENTER:       [  24,  'Center button',    'CENTER'                ],
    RIGHT:        [  25,  'Right button',     'RIGHT'                 ],

  };

  var ALGORITHMS={
    HC:     0,    //  Hill Climb
    SA:     1,    //  Simulated Annealling
    ANT:    2,    //  Ant Colony Optimization
    GEN:    3,    //  Genetic - Branch and Bound
    USER:   4,    //  User selected
    SW:     5     //  Shrink Wrap
  };

  var app={

      // Debugging aids ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      
      debug:          false,
      telemetry:      true,
      
      
      // TSP ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      running:        false,
      
      displaGrid:     true,
      
      currentPATH:    [],
      
      HC:             [],   //  Hill Climb
      displayHC:      true,
      distanceHC:     0,
      swapsHC:        0,
      
      SA:             [],   //  Simulated Annealling
      displaySA:      false,
      distanceSA:     0,
      swapsSA:        0,
      
      ANT:            [],   //  Ant Colony
      displayANT:     false,
      distanceANT:    0,
      swapsANT:       0,
      
      GEN:            [],   //  Genetic
      displayGEN:     false,
      distanceGEN:    0,
      swapsGEN:       0,
      
      USER:           [],     //  User selected
      USER_CLICK:     [],     //  User currently clicked
      displayUSER:    false,
      distanceUSER:   0,
      swapsUSER:      0,

      SW:             [],     //  Shrink Wrap
      displaySW:      false,
      distanceSW:     0,
      swapsSW:        0,

      algorithm:      ALGORITHMS.SA,
      
      tspSize:        20,

      swaps:          0,

      temp:           0,
      maxTemp:        0,
      tempIncrement:  0.0125,

      maximize:       false,
      minimize:       false,

      tspCtrls:       [],
      
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      nodes:          [],
      ctrls:          [],
      
      send:           [],
      received:       [],
      cache:          [],
      
      paths:          [],

      vortex:         [],
      
      mode:           MODES.SPLASH,
      
      activeNode:     -1,

      gridSize:       0,
      
      focus:          0,
      
      xIncr:          0,
      yIncr:          0,
  
      width:          600,
      height:         600,

      sending:        false,

      frameRate:      30,

    // focus:          0,

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

  var getSwaps=       function() { return app.swaps;              };
  var setSwaps=       function(b){ app.swaps=b;                   };

  var getTemp=        function() { return round(app.temp);        };
  var setTemp=        function(b){ app.temp=b;                    };

  var getMaximize=    function() { return app.maximize;           };
  var setMaximize=    function(b){ app.maximize=b;                };

  var getMinimize=    function() { return app.minimize;           };
  var setMinimize=    function(b){ app.minimize=b;                };

  var getDebug=       function() { return app.debug;              };
  var setDebug=       function(b){ app.debug=b;                   };

  var getDistanceSA=  function() {
    
    var retVal=0;
    
    switch(app.algorithm){
      
      case ALGORITHMS.HC:   retVal=app.distanceHC;    break;
      case ALGORITHMS.SA:   retVal=app.distanceSA;    break;
      case ALGORITHMS.ANT:  retVal=app.distanceANT;   break;
      case ALGORITHMS.GEN:  retVal=app.distanceGEN;   break;
      case ALGORITHMS.USER: retVal=app.distanceUSER;  break;
      case ALGORITHMS.SW:   retVal=app.distanceSW;    break;

      default:                                        break;

    }

    return round(retVal);

  };
  var setDistance=    function() { return app.distance;           };

  var getSize=        function() { return app.tspSize;            };
  var setSize=        function(n){

    if     (n===0){ if(app.tspSize<100){ app.tspSize++; } }
    else if(n==1 ){ if(app.tspSize>5  ){ app.tspSize--; } }
    else          { app.tspSize=n;                        }

    newTSP();

                               };

  var getAlgorithm=   function(){ return app.algorithm;           };
  var setAlgorithm=   function(a){

    app.algorithm=a;
    
    switch(app.algorithm){
      
      case ALGORITHMS.HC:       app.currentPATH=app.HC;     break;
      case ALGORITHMS.SA:       app.currentPATH=app.SA;     break;
      case ALGORITHMS.ANT:      app.currentPATH=app.ANT;    break;
      case ALGORITHMS.GEN:      app.currentPATH=app.GEN;    break;
      case ALGORITHMS.USER:     app.currentPATH=app.USER;   break;
      case ALGORITHMS.SHRINK:   app.currentPATH=app.SHRINK; break;

      default:                                              break;

    }

    println(app.algorithm);

                               };

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

      case COMMANDS.pressed[0]:     return app.left;

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

  var getNodeAddress=function(){

    var NAT=round(random(0,255))+"."+round(random(0,255))+"."+round(random(0,255))+"."+round(random(0,255));

    // println(NAT);

    return NAT;

  };
  
  var inputKey=function(k){

    app.cache+=k;

  };


  var telemetry=function(){
    
    if(app.over && app.keys[KEYCODES.CONTROL]){

      var rowHeight=20;
      var top=100;
      var Left=300;
      
      textAlign(LEFT,BOTTOM);

      // Border
      stroke(CLRS.WHITE);
      strokeWeight(0.25);
      fill(getColor(CLRS.BLACK,40));

      rect(Left-10,top-20,150,500,0,20,20,0);

      fill(getColor(CLRS.WHITE,80));
      textSize(14);
      
      text("Telemetry",         Left+30, top+5);
      
      fill(getColor(CLRS.WHITE,60));
      textSize(12);
      
      text("Frame Rate: ",      Left, top+2*rowHeight);
      text("controls count: ",  Left, top+3*rowHeight);
  
      text("Left: ",            Left, top+5*rowHeight);
      text("Center: ",          Left, top+6*rowHeight);
      text("Right: ",           Left, top+7*rowHeight);
  
      text("Nodes: ",           Left, top+9*rowHeight);
      text("controls: ",        Left, top+10*rowHeight);
      
      
      text("Cache: ",           Left, top+12*rowHeight);
      text("Send: ",            Left, top+13*rowHeight);
      text("Received: ",        Left, top+14*rowHeight);

      text("Running: ",         Left, top+16*rowHeight);

      text("Focus: ",           Left, top+18*rowHeight);
      
      text("Algorithm: ",       Left, top+20*rowHeight);
      
      fill(CLRS.YELLOW);

      text(app.frameRate,       Left+100,  top+2*rowHeight);
      text(app.ctrls.length,    Left+100,  top+3*rowHeight);
      
      text(app.left,            Left+100,  top+5*rowHeight);
      text(app.center,          Left+100,  top+6*rowHeight);
      text(app.right,           Left+100,  top+7*rowHeight);
      
      text(app.nodes.length,    Left+100,  top+9*rowHeight);
      text(app.ctrls.length,    Left+100,  top+10*rowHeight);

      text(app.cache.length,    Left+100,  top+12*rowHeight);
      text(app.send.length,     Left+100,  top+13*rowHeight);
      text(app.received.length, Left+100,  top+14*rowHeight);

      text(app.running,         Left+100,  top+16*rowHeight);

      text(app.focus,           Left+100,  top+18*rowHeight);

      text(app.algorithm,       Left+100,  top+20*rowHeight);

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
  {
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
    Node.prototype.draw=      function(x,y){
  
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
    Node.prototype.clicked=   function(x,y){
  
      if(this.hit){
        this.enabled=!this.enabled;
        
  println(this.enabled);
        
      }
  
    };
    Node.prototype.moved=     function(x,y){
  
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
    Node.prototype.dragged=   function(x,y){
  
      if(this.hit &&
         app.left &&
         app.activeNode===this.id &&
         app.keys[KEYCODES.CONTROL]){
  
        this.x=x;
        this.y=y;
  
        // this.load();
  
      }
  
    };
    Node.prototype.mPressed=  function(x,y){
  
      if(this.hit){
        app.activeNode=this.id;
      }
  
    };
    Node.prototype.mReleased= function(x,y){
  
      if(this.hit){
        app.activeNode=-1;
      }
  
    };
    Node.prototype.load=      function(){
  
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
    Node.prototype.disable=   function(node){
  
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
  }

  // tNode ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var tNode=function(id,x,y,row,col,routes){
  
      Node.call(this,id,x,y,row,col,routes);
  
      this.offsetX=0;
      this.offsetY=0;
  
      this.distance=0;
      
      // this.dX=0;
      // this.dy=0;
      
    };
    tNode.prototype.draw=     function(x,y){
      
      // var d=app.temp;
  
      // this.dX=this.x+random(-d,d);
      // this.dY=this.y+random(-d,d);
      
      // Node connections
      stroke(getColor(CLRS.CONNECTION,255));
      strokeWeight(0.75);
  
      // for(var n in this.connections){
      //   line(this.x, this.y, this.connections[n].x, this.connections[n].y);
      // }
  
      // Range ellipse
      fill(getColor(CLRS.WHITE,6));
      stroke(CLRS.WHITE);
      strokeWeight(0.125);
  
      if(this.enabled &&
         app.keys[KEYCODES.CONTROL]){
        ellipse(this.x, this.y,
                this.r*2, this.r*2);
      }
  
      // Node ellipse
      fill(getColor(CLRS.WHITE,255));
  
      ellipse(this.x, this.y, 15, 15);
      
      if(this.selected){ fill(CLRS.CODE_GREEN);
                         ellipse(this.x, this.y, 10, 10); }
      else             { fill(CLRS.RED);
                         ellipse(this.x, this.y, 10, 10); }
  
      if(this.hit){ cursor(HAND);   }
      else        { cursor(ARROW);  }
      
      fill(CLRS.WHITE);
      textSize(16);
      
      textAlign(RIGHT,CENTER);
      text(this.row, this.x-12, this.y);
      // this.x+=random(-3,3);
      // this.y+=random(-3,3);
  
    };
    tNode.prototype.clicked=  function(x,y){
  
      if(this.hit){
        this.selected=!this.selected;
        this.routes(this);
      }
  
    };
    tNode.prototype.moved=    function(x,y){
  
      if(mouseX>this.x-15 &&
         mouseX<this.x+15 &&
         mouseY>this.y-15 &&
         mouseY<this.y+15){
  
        this.hit=true;
        app.focus=this.id;
      }
      else{
        this.hit=false;
      }
  
    };
    tNode.prototype.dragged=  function(x,y){
  
      if(this.hit &&
         app.left &&
         app.keys[KEYCODES.CONTROL]){
  
        this.x=x;
        this.y=y;
  
        // this.load();
  
      }
  
    };
    tNode.prototype.mPressed= function(x,y){
  
      if(this.hit){
     
      }
  
    };
    
  }
  
  // Packet ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
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
    Packet.prototype.draw=      function(){
  
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
    Packet.prototype.clicked=   function(){
  
      if(app.current===COMMANDS.SELECT[0]){
  
        if(this.hit){
          this.selected=!this.selected;
          for(var n in this.vertices){ this.vertices[n].selected=this.selected; }
        }
  
      }
  
    };
    Packet.prototype.moved=     function(x,y){};
    Packet.prototype.dragged=   function(){
  
      for(var n in this.vertices){
  
        if(this.hitP[n] && app.left){
          this.vertices[n].x=app.mouseX;
          this.vertices[n].y=app.mouseY;
          this.recalc();
        }
  
      }
  
    };
    Packet.prototype.mPressed=  function(x,y){
  
      if(this.hit){

      }
  
    };
    
  }


  // CONTROLS =================================================================

  // Control ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
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
    this.left=false;    //  Is the control being dragged
    
    this.value=0;           //  current value
    
    this.visible=true;      //  Is the control visible?
  
    this.timer=0;           //  Countdown timer

    this.tag=0;             //  Misc property

    this.params=params;     // optional parameter (arrays, boolean...)
    
  };
    Control.prototype.draw=       function(x,y){
  
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
    Control.prototype.clicked=    function(x,y){
  
      if(this.hit){ this.execute(); }
  
    };
    Control.prototype.moved=      function(x,y){
  
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
    Control.prototype.dragged=    function(x,y){
  
      if(this.hit){
        for(var c in this.ctrls){ this.ctrls[c].dragged(mouseX,mouseY); }
      }
  
    };
    Control.prototype.mPressed=   function(x,y){
  
      if(this.hit){
        for(var c in this.ctrls){ this.ctrls[c].left(mouseX,mouseY); }
      }
  
      };
    Control.prototype.mReleased=  function(x,y){
  
      if(this.hit){
        for(var c in this.ctrls){ this.ctrls[c].released(mouseX,mouseY); }
      }
  
    };
    Control.prototype.over=       function(x,y){
  
      if(this.hit){
        for(var c in this.ctrls){ this.ctrls[c].over(mouseX,mouseY); }
      }
  
    };
    Control.prototype.out=        function(x,y){
  
      if(this.hit){
        for(var c in this.ctrls){ this.ctrls[c].out(mouseX,mouseY); }
      }
  
    };
  }
  
  // Container ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var Container=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){
  
      Control.call(this,id,parent,ctrls,x,y,width,height,color,caption,execute,params);
      
    };
    Container.prototype.draw=       function(x,y){
  
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
          // if(this.tag==true){
            
            fill(this.color);
            
            rect(this.x, this.y, this.w, this.h);
          
          // }
          
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
    Container.prototype.clicked=    function(x,y){
  
      if(this.hit){
  
        for(var c in this.ctrls){ this.ctrls[c].clicked(this.y, this.x); }
  
        // this.execute();
  
      }
  
    };
    Container.prototype.moved=      function(x,y){
  
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
    Container.prototype.dragged=    function(x,y){
  
      if(this.hit){
        for(var c in this.ctrls){ this.ctrls[c].dragged(mouseX,mouseY); }
      }
      
        
    };
    Container.prototype.mPressed=   function(x,y){
  
      if(this.hit){
  
        for(var c in this.ctrls){ this.ctrls[c].mPressed(mouseX,mouseY); }

      }
  
    };
    Container.prototype.mReleased=  function(x,y){
  
      if(this.hit){
        for(var c in this.ctrls){ this.ctrls[c].mReleased(mouseX,mouseY); }
      }
  
    };
    Container.prototype.over=       function(x,y){
  
      this.visible=true;
      
      for(var c in this.ctrls){ this.ctrls[c].over(mouseX,mouseY); }
  
    };
    Container.prototype.out=        function(x,y){
  
      this.visible=false;
      
      for(var c in this.ctrls){ this.ctrls[c].out(mouseX,mouseY); }
      
    };
  }

  // Label ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var Label=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){
      
      Control.call(this,id,parent,ctrls,x,y,width,height,color,caption,execute,params);
  
    };
    Label.prototype.draw=       function(x,y){
  
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
        stroke(this.color);
        strokeWeight(0.5);
  
        if(this.hit){ fill(getColor(this.color,60)); }
        else        { fill(getColor(this.color,50)); }
  
        if(this.caption=="0000"){
  
          text(this.execute(),
               x+this.x,
               y+this.y+this.h/2);
  
        }
        else{
          
          text(this.caption,
               x+this.x,
               y+this.y+this.h/2);
  
        }
  
        // Control boundaries ~~~~~~~~~~
        if(app.debug){
          
          // Origin
          fill(CLRS.RED);
          ellipse(x+this.x,y+this.y,3,3);
          
          // Hit box
          strokeWeight(0.5);
          stroke(CLRS.GRAY);
          noFill();
          
          rect(this.x,this.y,textWidth(this.caption),this.h);

        }
        
      }
  
    };
    Label.prototype.clicked=    function(x,y){
  
      // if(this.hit){ this.execute(this.params); }
  
    };
    Label.prototype.moved=      function(x,y){
  
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
    Label.prototype.dragged=    function(x,y){
  
      // if(this.hit){
      //   this.x=x;
      //   this.y=y;
      // }
  
    };
    Label.prototype.mPressed=   function(x,y){
  
      if(this.hit){
        
      }
  
    };
    Label.prototype.mReleased=  function(x,y){
  
      if(this.hit){
        
      }
  
    };
    Label.prototype.over=       function(x,y){
  
      this.visible=true;
  
    };
    Label.prototype.out=        function(x,y){
  
      this.visible=false;
  
    };
  }

  // Option ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var Option=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){
      
      Control.call(this,id,parent,ctrls,x,y,width,height,color,caption,execute,params);
  
    };
    Option.prototype.draw=      function(x,y){
  
      if(this.visible){
  
        if(this.hit){ fill(getColor(this.color,20));
                      cursor(HAND);                   }
        else        { fill(getColor(this.color,0));   }
  
        rectMode(CORNER);
        noStroke();
  
        textSize(this.h);
        textAlign(LEFT,CENTER);
        
        if(app.debug){
          rect(x+this.x, y+this.y,
               textWidth(this.caption)+30, this.h,
               10);
        }
        
        // Outer Ellipse ~~~~~~~~~~~
        stroke(CLRS.GRAY);
        strokeWeight(0.5);
  
        ellipse(x+this.x+10,
                y+this.y+this.h/2,
                10, 10);
  
        // Inner ellipse ~~~~~~~~~~~
        if(this.ctrls()==this.params){ fill(CLRS.RED);        }
        else                         { noFill(); noStroke();  }
  
        ellipse(x+this.x+10,
                y+this.y+this.h/2,
                7, 7);
  
        // Caption ~~~~~~~~~~
        if(this.hit){ fill(getColor(CLRS.WHITE,75)); }
        else        { fill(getColor(CLRS.WHITE,50)); }
  
        text(this.caption,
             x+this.x+20,
             y+this.y+this.h/2);
  
        // Control boundaries ~~~~~~~~~~
        if(app.debug){
          
          // Origin
          fill(CLRS.RED);
          ellipse(x+this.x,y+this.y,3,3);
          
          // Hit box
          strokeWeight(0.5);
          stroke(CLRS.GRAY);
          noFill();
          
          rect(this.x,this.y,this.w,this.h);

        }
        
      }
      
    };
    Option.prototype.clicked=   function(x,y){
  
      if(this.hit){ this.execute(this.params); }
  
    };
    Option.prototype.moved=     function(x,y){
  
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
    Option.prototype.dragged=   function(x,y){
  
      // if(this.hit){
      //   this.x=x;
      //   this.y=y;
      // }
  
    };
    Option.prototype.mPressed=  function(x,y){
  
      if(this.hit){
        
      }
  
    };
    Option.prototype.mReleased= function(x,y){
  
      if(this.hit){
        
      }
  
    };
    Option.prototype.over=      function(x,y){
  
      this.visible=true;
  
    };
    Option.prototype.out=       function(x,y){
  
      this.visible=false;
  
    };
  }
  
  // Checkbox ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var Checkbox=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){
      
      Control.call(this,id,parent,ctrls,x,y,width,height,color,caption,execute,params);
  
    };
    Checkbox.prototype.draw=      function(x,y){
  
      if(this.visible){

        if(this.hit){ fill(getColor(this.color,20));
                      cursor(HAND);                   }
        else        { fill(getColor(this.color,0));   }

        rectMode(CORNER);
        noStroke();

        textSize(12);
        textAlign(LEFT,CENTER);

        if(app.debug){

          rect(x+this.x, y+this.y,
               textWidth(this.caption)+30, this.h,
               10);
        }

        // Outer Rectangle ~~~~~~~~~~~
        rectMode(CENTER);

        stroke(CLRS.GRAY);
        strokeWeight(0.5);
  
        rect(x+this.x+10,
             y+this.y+this.h/2,
             10, 10);
  
        // Inner Rectangle ~~~~~~~~~~~
        if(this.value){ fill(CLRS.RED);       }
        else          { noFill(); noStroke(); }

        rect(x+this.x+10,
             y+this.y+this.h/2,
             8, 8);
  
        // Caption ~~~~~~~~~~
        if(this.hit){ fill(getColor(CLRS.WHITE,75)); }
        else        { fill(getColor(CLRS.WHITE,50)); }
  
        text(this.caption,
             x+this.x+20,
             y+this.y+this.h/2);
  
        // Control boundaries ~~~~~~~~~~
        if(app.debug){
          
          rectMode(CORNER);
          
          // Origin
          fill(CLRS.RED);
          ellipse(x+this.x,y+this.y,3,3);
          
          // Hit box
          strokeWeight(0.5);
          stroke(CLRS.GRAY);
          noFill();
          
          rect(this.x,this.y,this.w,this.h);

        }
  
      }
      
    };
    Checkbox.prototype.clicked= function(x,y){
  
      if(this.hit){ this.execute(this.value=!this.value); }
  
    };
    Checkbox.prototype.moved=     function(x,y){
  
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
    Checkbox.prototype.dragged=   function(x,y){
  
      // if(this.hit){
      //   this.x=x;
      //   this.y=y;
      // }
  
    };
    Checkbox.prototype.mPressed=  function(x,y){
  
      if(this.hit){
        
      }
  
    };
    Checkbox.prototype.mReleased= function(x,y){
  
      if(this.hit){
        
      }
  
    };
    Checkbox.prototype.over=      function(x,y){
  
      this.visible=true;
  
    };
    Checkbox.prototype.out=       function(x,y){
  
      this.visible=false;
  
    };
  }
  
  // UpDown ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var UpDown=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){
  
      Control.call(this,id,parent,ctrls,x,y,width,height,color,caption,execute,params);
  
      this.hitUp=false;     //  The mouse is over the Up arrow
      this.hitDown=false;   //  The mouse is over the Down arrow
  
    };
    UpDown.prototype.draw=      function(x,y){
  
      if(this.visible){
  
        // if(this.hitUp || this.hitDown){ cursor(HAND); }
  
        rectMode(CORNER);
        noStroke();
  
        textSize(16);
        textAlign(LEFT,CENTER);
  
        // rect(x+this.x, y+this.y,
        //     textWidth(this.execute())+20, this.h,
        //     10);
  
        // Up Arrow ~~~~~~~~~~~
        stroke(CLRS.GRAY);
        strokeWeight(0.5);
        fill(CLRS.RED);
        
        if(this.hitUp){ fill(CLRS.CODE_BLUE); }
        else          { noFill();             }
  
        triangle(x+this.x+10, y+this.y,
                 x+this.x,    y+this.y+this.h/2-2,
                 x+this.x+20, y+this.y+this.h/2-2);
  
        // Down Arrow ~~~~~~~~~~~
  
        if(this.hitDown){ fill(CLRS.CODE_BLUE); }
        else            { noFill();             }
  
        triangle(x+this.x+10, y+this.y+this.h,
                 x+this.x,    y+this.y+this.h/2+2,
                 x+this.x+20, y+this.y+this.h/2+2);
  
        // Caption ~~~~~~~~~~
        if(this.hit){ fill(getColor(CLRS.WHITE,75)); }
        else        { fill(getColor(CLRS.WHITE,50)); }
  
        text(this.ctrls(),
             x+this.x+25,
             y+this.y+this.h/2);
  
        if(this.hitUp || this.hitDown){ cursor(HAND);   }
        else                          { cursor(ARROW);  }
  
        // Control boundaries ~~~~~~~~~~
        if(app.debug){
          
          // Origin
          fill(CLRS.RED);
          ellipse(x+this.x,y+this.y,3,3);
          
          // Hit box
          strokeWeight(0.5);
          stroke(CLRS.GRAY);
          noFill();
          
          rect(this.x,this.y,this.w,this.h);

        }
  
      }
  
    };
    UpDown.prototype.clicked=   function(x,y){
  
      if     (this.hitUp)  { this.execute(0); }
      else if(this.hitDown){ this.execute(1); }
  
    };
    UpDown.prototype.moved=     function(x,y){
  
      if(mouseX>x+this.x &&
         mouseX<x+this.x+this.w &&
         mouseY>y+this.y &&
         mouseY<y+this.y+this.h){
  
        app.focus=this.id;
        this.hit=true;
  
        if(hitTriangle(x+this.x+10, y+this.y,
                       x+this.x,    y+this.y+this.h/2-2,
                       x+this.x+20, y+this.y+this.h/2-2)){
  
          this.hitUp=true;
  
        }
        else{
          this.hitUp=false;
        }
  
        if(hitTriangle(x+this.x+10, y+this.y+this.h,
                      x+this.x,    y+this.y+this.h/2+2,
                      x+this.x+20, y+this.y+this.h/2+2)){
  
          this.hitDown=true;
  
        }
        else{
          this.hitDown=false;
        }
  
      }
      else{
        
        this.hitUp=false;
        this.hitDown=false;
  
        this.hit=false;
  
      }
  
    };
    UpDown.prototype.dragged=   function(x,y){
  
      // if(this.hit){
      //   this.x=x;
      //   this.y=y;
      // }
  
    };
    UpDown.prototype.mPressed=  function(x,y){

      if     (this.hitUp)  { }
      else if(this.hitDown){ }

    };
    UpDown.prototype.mReleased= function(x,y){
  
      if(this.hit){
        
      }
  
    };
    UpDown.prototype.over=      function(x,y){
  
      this.visible=true;
  
    };
    UpDown.prototype.out=       function(x,y){
  
      this.visible=false;
  
    };

  }
  
  // Slider ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var Slider=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){

      Control.call(this,id,parent,ctrls,x,y,width,height,color,caption,execute,params);

      this.value=ctrls();

    };
    Slider.prototype.draw=      function(x,y){
  
      if(this.visible){
        
        pushMatrix();

          rectMode(CORNER);
          noStroke();
    
          textSize(16);
          textAlign(LEFT,CENTER);
    
          // Up Arrow ~~~~~~~~~~~
          stroke(CLRS.GRAY);
          strokeWeight(0.5);
          noFill();
    
          rect(x+this.x, y+this.y,
               this.w,      this.h);
    
          // Down Arrow ~~~~~~~~~~~
    
          fill(CLRS.CODE_BLUE);
          
          rect(x+this.x, y+this.y, this.value, this.h);
    
          // Caption ~~~~~~~~~~
          if(this.hit){ fill(getColor(CLRS.WHITE,75)); }
          else        { fill(getColor(CLRS.WHITE,50)); }

          textSize(10);
          textAlign(CENTER,CENTER);

          text(this.value,
               x+this.x+this.w/2,
               y+this.y+this.h/2);
    
          if(this.hit){ cursor(HAND);   }
          else        { cursor(ARROW);  }
    
          // Control boundaries ~~~~~~~~~~
          if(app.debug){
            
            // Origin
            fill(CLRS.RED);
            ellipse(x+this.x,y+this.y,3,3);
            
            // Hit box
            strokeWeight(0.5);
            stroke(CLRS.GRAY);
            noFill();
            
            rect(this.x,this.y,this.w,this.h);
  
          }
                     
        popMatrix();
  
      }
  
    };
    Slider.prototype.clicked=   function(x,y){
  
      if(this.hit){
        this.value=constrain(mouseX-this.x,2,this.w);
        this.execute(this.value);
      }
  
    };
    Slider.prototype.moved=     function(x,y){
  
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
    Slider.prototype.dragged=   function(x,y){

      if(this.hit){
        this.value=constrain(mouseX-this.x,2,this.w);
        this.execute(this.value);
      }

    };
    Slider.prototype.mPressed=  function(x,y){};
    Slider.prototype.mReleased= function(x,y){};
    Slider.prototype.over=      function(x,y){
  
      this.visible=true;
  
    };
    Slider.prototype.out=       function(x,y){
  
      this.visible=false;
  
    };

  }
  
  // Button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var Button=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){
      
      Control.call(this,id,parent,ctrls,x,y,width,height,color,caption,execute,params);
      this.offset=0;

    };
    Button.prototype.draw=      function(x,y){
  
      if (typeof this.parent != "undefined") {
        // alert("GOT THERE");
        // println("No parent");
      }
  
      if(this.visible){
        
        pushMatrix();

          if(this.hit){

            if(app.left){ this.offset=1; }
            else        { this.offset=0; }
            
            fill(getColor(this.color,20));
            cursor(HAND);
  
          }
          else{
  
            fill(getColor(this.color,this.timer/30*255));
  
          }

          // if(app.debug){
           
          //   rectMode(CORNER);
          //   noStroke();
            
          //   rect(x+this.x+this.offset,
          //       y+this.y+this.offset,
          //       this.w,   this.h,
          //       10);
          // }
          
          // Caption
          // rectMode(CENTER);
          textAlign(CENTER,CENTER);
          textSize(24);

          if(this.hit){ fill(getColor(this.color,75)); }
          else        { fill(getColor(this.color,50)); }

          if(this.caption=="new"){

            textSize(36);

            text("*",
                 x+this.x+this.w/2+this.offset,
                 y+this.y+this.h/2+this.offset+7);

          }
          else if(this.caption=="run"){

            textSize(24);
            var txt="►";

            if(app.running){

              textSize(14);
              txt="||";

            }

            text(txt,
                 x+this.x+this.w/2+this.offset,
                 y+this.y+this.h/2+this.offset-2);

          }
          else if(this.caption=="reload"){

            // pushMatrix();

              translate(this.x+this.w/2, this.y+this.h/2);
              
              if(this.hit && app.left){ rotate(45); }

              text("↻", 0, 0);

            // popMatrix();

          }
          else{

            text(this.caption,
                 x+this.x+this.w/2+this.offset,
                 y+this.y+this.h/2+this.offset);

          }

        popMatrix();

        // Control boundaries ~~~~~~~~~~
        if(app.debug){
          
          // Origin
          fill(CLRS.RED);
          ellipse(x+this.x,y+this.y,3,3);
          
          // Hit box
          strokeWeight(0.5);
          stroke(CLRS.GRAY);
          noFill();
          
          rect(this.x,this.y,this.w,this.h);

        }
        
      }

    };
    Button.prototype.clicked=   function(x,y){
  
      if(this.hit){ this.execute(); }
  
    };
    Button.prototype.moved=     function(x,y){
  
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
    Button.prototype.dragged=   function(x,y){
  
      // if(this.hit){
      //   this.x=x;
      //   this.y=y;
      // }
  
    };
    Button.prototype.mPressed=  function(x,y){
  
      if(this.hit){
        
      }
  
    };
    Button.prototype.mReleased= function(x,y){
  
      if(this.hit){
        
      }
  
    };
    Button.prototype.over=      function(x,y){
  
      this.visible=true;
  
    };
    Button.prototype.out=       function(x,y){
  
      this.visible=false;
  
    };
  }
  
  // codeButton ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var codeButton=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){
      
      Control.call(this,id,parent,ctrls,x,y,width,height,color,caption,execute,params);
  
    };
    codeButton.prototype.draw=      function(x,y){
  
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
  
          fill(getColor(CLRS.BLACK,80));
  
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

        // Control boundaries ~~~~~~~~~~
        if(app.debug){
          
          // Origin
          fill(CLRS.RED);
          ellipse(x+this.x,y+this.y,3,3);
          
          // Hit box
          strokeWeight(0.5);
          stroke(CLRS.GRAY);
          noFill();
          
          rect(this.x,this.y,this.w,this.h);

        }
        
      }
      
    };
    codeButton.prototype.clicked=   function(x,y){
  
      if(this.hit){ this.execute(); }
  
    };
    codeButton.prototype.moved=     function(x,y){
  
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
    codeButton.prototype.dragged=   function(x,y){
  
      // if(this.hit){
      //   this.x=x;
      //   this.y=y;
      // }
  
    };
    codeButton.prototype.mPressed=  function(x,y){
  
      if(this.hit){
        
      }
  
    };
    codeButton.prototype.mReleased= function(x,y){
  
      if(this.hit){
        
      }
  
    };
    codeButton.prototype.over=      function(x,y){
  
      this.visible=true;
  
    };
    codeButton.prototype.out=       function(x,y){
  
      this.visible=false;
  
    };
  }
  
  

  // Key ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
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
    Key.prototype.mPressed=   function(x,y){
  
      if(this.hit){
  
  // println(this.caption);
  
        this.left=true;
  
      }
  
    };
    Key.prototype.mReleased=  function(x,y){
  
      if(this.hit){
        this.left=false;
      }
  
    };
    Key.prototype.over=       function(x,y){
  
      this.visible=true;
  
    };
    Key.prototype.out=        function(x,y){
  
      this.visible=false;
  
    };
  }

  // Keypad ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var Keypad=function(id,parent,ctrls,x,y,width,height,color,caption,execute,params){

    Control.call(this,id,parent,ctrls,x,y,width,height,color,caption,execute,params);
    
  };
    Keypad.prototype.draw=      function(x,y){
  
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
  
          tNode(ARROW);
  
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
    Keypad.prototype.clicked=   function(x,y){
  
      if(this.hit){
  
        for(var c in this.ctrls){ this.ctrls[c].clicked(mouseX,mouseY); }
  
        // this.execute();
  
      }
  
    };
    Keypad.prototype.moved=     function(x,y){
  
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
    Keypad.prototype.dragged=   function(x,y){
  
      // if(this.hit){
      //   this.x=x;
      //   this.y=y;
      //   for(var c in this.ctrls){ this.ctrls[c].dragged(mouseX,mouseY); }
      // }
      
        
    };
    Keypad.prototype.mPressed=  function(x,y){
  
  //     if(this.hit){
  
  //       for(var c in this.ctrls){ this.ctrls[c].pressed(mouseX,mouseY); }
        
  // println(this.keys.length);
  
  //     }
  
    };
    Keypad.prototype.mReleased= function(x,y){
  
      if(this.hit){
        for(var c in this.ctrls){ this.ctrls[c].released(mouseX,mouseY); }
      }
  
    };
    Keypad.prototype.over=      function(x,y){
  
      this.visible=true;
  
    };
    Keypad.prototype.out=       function(x,y){
  
      this.visible=false;
      this.hit=false;
      
    };
  }

  
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
  
    var initGrid=function(){
  
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

  var findLongest=function(arr){
  
    var longest=0;
    var longestIndex=0;
    var distance=0;
    
    for(var n=0; n<arr.length-1; n++){

      distance=dist(arr[n].x,
                    arr[n].y,
                    arr[n+1].x,
                    arr[n+1].y);
      
      if(distance>longest){
        
        longestIndex=n+1;
        longest=distance;

      }

    }

    return longestIndex;

  };
  
  var swapLongest=function(arr){

    var distance=0;
    var index1=0;
    var index2=round(random(arr.length-1));
    
    index1=findLongest(app.SA);

    while(index1==index2){
      index2=round(random(arr.length-1));
    }

// println(index1+":"+index2);

    arraySwap(arr, index1, index2);

    for(var n=0; n<arr.length-1; n++){

      distance+=dist(arr[n].x,
                     arr[n].y,
                     arr[n+1].x,
                     arr[n+1].y);
    }
    
    distance+=dist(arr[0].x,
                   arr[0].y,
                   arr[arr.length-1].x,
                   arr[arr.length-1].y);
    
    var difference=app.distanceHC-distance;

    if(difference<0){ arraySwap(arr,index1,index2); }
    else            { app.swaps++;                  }

    if(app.temp>0){ app.temp-=app.tempIncrement; }

  };

  var runTSP=function(){

    app.running=!app.running;

  };

  var arraySwap=function(arr, index1, index2){

    var temp=arr[index1];

    arr[index1]=arr[index2];
    arr[index2]=temp;

  };
  
  var loadNodes=function(){
    
    for(var n=0; n<app.tspSize; n++){
      app.currentPATH.push( new tNode( getGUID(),
                                       10+20*round(random(8, (app.width -40)/20)),
                                       10+20*round(random(1, (app.height-40)/20)), 0, 0, addToTour
                                     )
                 );
    }

  };
  
  var resetTemp=function(){

    app.temp=round(app.tspSize*5);
    app.maxTemp=round(app.tspSize*5);
    
  }
  
  var newTSP=function(){

    swX1=150;
    swX2=590;
    swY1=10;
    swY2=590;

    app.swaps=0;
    
    app.currentPATH=[];
    
    app.HC=[];
    app.SA=[];
    app.ANT=[];
    app.GEN=[];
    app.USER=[];
    app.USER_CLICK=[];
    app.SW=[];

    resetTemp();
    loadNodes();

// println(app.currentPATH.length);

    app.HC=subset(app.currentPATH, 0);
    app.SA=subset(app.currentPATH, 0);
    app.ANT=subset(app.currentPATH, 0);
    app.GEN=subset(app.currentPATH, 0);
    app.USER=subset(app.currentPATH, 0);
    app.SW=subset(app.currentPATH, 0);

// println(app.USER.length);

    if(app.maximize){ maximizeTour(app.currentPATH); }
    if(app.minimize){ minimizeTour(app.currentPATH); }

    app.distanceSA=tourDistance(app.SA);

  };

  var shufflePath=function(){
    
    for(var n=0; n<app.currentPATH.length; n++){
      arraySwap(app.currentPATH, n, round(random(app.currentPATH.length-1)));
    }
    
  };
  
  var retryTSP=function(){
    
    swX1=150;
    swX2=590;
    swY1=10;
    swY2=590;

    app.swaps=0;

    resetTemp();

    shufflePath();

    if(app.maximize){ maximizeTour(app.currentPATH); }
    if(app.minimize){ minimizeTour(app.currentPATH); }

    app.HC=subset(app.currentPATH, 0);
    app.SA=subset(app.currentPATH, 0);
    app.ANT=subset(app.currentPATH, 0);
    app.GEN=subset(app.currentPATH, 0);
    app.USER=subset(app.currentPATH, 0);
    app.USER_CLICK=[];
    app.SW=subset(app.currentPATH, 0);

    app.distanceSA=tourDistance(app.SA);
    
  };

  var minimizeTour=function(arr){
    
    var minDistance=Infinity;
    var tempDistance=0;
    var index=0;

    // Sort based on the min distance between each successive point
    for(n=0; n<arr.length-1; n++){

      for(m=n+1; m<arr.length; m++){

        tempDistance=dist(arr[n].x, arr[n].y,
                          arr[m].x, arr[m].y);

        if(tempDistance<minDistance){
          minDistance=tempDistance;
          index=m;
        }
        
      }

      arraySwap(arr,n+1,index);
      minDistance=Infinity;
      tempDistance=Infinity;

    }
    
  };
  
  var maximizeTour=function(arr){
    
    var maxDistance=0;
    var tempDistance=0;
    var index=0;

    // Sort based on the max distance between each successive point
    for(n=0; n<arr.length-1; n++){

      for(m=n+1; m<arr.length; m++){

        tempDistance=dist(arr[n].x, arr[n].y,
                          arr[m].x, arr[m].y);

        if(tempDistance>maxDistance){
          maxDistance=tempDistance;
          index=m;
        }
        
      }

      arraySwap(arr,n+1,index);
      maxDistance=0;
      tempDistance=0;

    }
    
  };
  
  var resetTSP=function(){

    swX1=150;
    swX2=590;
    swY1=10;
    swY2=590;

    loadNodes();

    if(app.maximize){ maximizeTour(app.currentPATH); }
    if(app.minimize){ minimizeTour(app.currentPATH); }

  };

  var tourDistance=function(arr){

    var distance=0;

    for(var n=0; n<arr.length-1; n++){

      distance+=dist(arr[n].x,
                     arr[n].y,
                     arr[n+1].x,
                     arr[n+1].y);
    }
    
    distance+=dist(arr[0].x,
                   arr[0].y,
                   arr[arr.length-1].x,
                   arr[arr.length-1].y);
    
    return distance;
    
  };
  


  

  var drawGrid=function(){
    
    rectMode(CORNER);

    noStroke();
    fill(getColor(CLRS.CODE_BLUE,70));

    rect(150,10,app.width-160,app.height-20);
    
    pushMatrix();

      translate(150,10);
        
      // Grid
      stroke(CLRS.GRAY);
      strokeWeight(0.5);

      ellipse(0,0,20,20);
      
      var incr=20;
      
      for(var n=incr; n<app.width-10; n+=incr){
        
        line(n,0,n,app.height-20);
        line(0,n,app.width-160,n);
        
      }
      
    popMatrix();

    strokeWeight(1.25);
    stroke(CLRS.CODE_ORANGE);
    noFill();

    rect(150,10,app.width-160,app.height-20);
    
  };



  // HC - Hill Climb or Greedy~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  var drawHC=function(){
  
    stroke(CLRS.RED);
    strokeWeight(2);
    noFill();

    for(var n=0; n<app.HC.length-1; n++){
      
      stroke(CLRS.YELLOW);
      strokeWeight(1);
      noFill();
  
      line(app.HC[n].x,   app.HC[n].y,
           app.HC[n+1].x, app.HC[n+1].y);
      
      noStroke();
      fill(CLRS.RED);
  
      if(n==0){ ellipse(app.HC[n].x, app.HC[n].y, 20, 20);  }
      else    { ellipse(app.HC[n].x, app.HC[n].y, 10, 10);  }

    }

    stroke(CLRS.YELLOW);
    strokeWeight(1);
    noFill();

    line(app.HC[0].x,               app.HC[0].y,
         app.HC[app.HC.length-1].x, app.HC[app.HC.length-1].y);

    noStroke();
    fill(CLRS.RED);
    
    ellipse(app.HC[app.HC.length-1].x, app.HC[app.HC.length-1].y, 20, 20);
    
    for(var c in app.HC){ app.HC[c].draw(0,0); }

  };
  
  var HC=function(){
    
    app.temp=0;
    
    if(app.running){
      
      var index1=0;
      var index2=0;
      
      while(index1==index2){
        index1=round(random(app.HC.length-1));
        index2=round(random(app.HC.length-1));
      }

      arraySwap(app.HC, index1, index2);
  
      var distance=tourDistance(app.HC);
  
      if(distance>app.distanceHC){

        arraySwap(app.HC,index1,index2);

      }
      else{

        app.distanceHC=distance;
        app.swaps++;

      }

    }

    app.distanceHC=tourDistance(app.HC);

    drawHC();
    
  };


  // SA - Simulated Annealing ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  var drawSA=function(){

    //  Draw the tour path
    for(var n=0; n<app.SA.length-1; n++){
      
      stroke(CLRS.YELLOW);
      strokeWeight(1);
      noFill();
  
      line(app.SA[n].x,   app.SA[n].y,
           app.SA[n+1].x, app.SA[n+1].y);
      
      app.SA[n].row=n;

    }
    
    // Connect the first and last nodes
    stroke(CLRS.YELLOW);
    strokeWeight(1);
    noFill();

    line(app.SA[0].x,               app.SA[0].y,
         app.SA[app.SA.length-1].x, app.SA[app.SA.length-1].y);
    
    app.SA[app.SA.length-1].row=app.SA.length-1;
      
    if(app.debug){
      
      // Identify the first and last node
      noStroke();
      fill(CLRS.RED);
      
      ellipse(app.SA[0].x, app.SA[0].y, 20, 20);
      ellipse(app.SA[app.SA.length-1].x, app.SA[app.SA.length-1].y, 20, 20);

    }
    
    // Draw the nodes themselves
    for(var c in app.SA){ app.SA[c].draw(0,0); }

  };
  
  var SA=function(){

    if(app.running){

      var index1=0;
      var index2=0;
      var distance=0;
    
      while(index1==index2){
        index1=round(random(app.SA.length-1));
        index2=round(random(app.SA.length-1));
      }
  
      arraySwap(app.SA, index1, index2);
  
      distance=tourDistance(app.SA);

// println(distance+" : " + (app.distanceSA+app.temp/app.maxTemp*100));

      if(distance<app.distanceSA+app.temp/app.maxTemp*100){

        app.swaps++;
        app.distanceSA=distance;

      }
      else{
        arraySwap(app.SA,index1,index2);
        
        

      }

      text(frameCount,200,30);

      if(app.temp>0){ app.temp-=app.tempIncrement; }

    }

    // app.distanceSA=distance;
    // if(app.running){ swapLongest(app.SA); }
    
    drawSA();
    
  };
  
  // ANT - Ant Colony ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var drawANT=function(){


    
  };

  var ANT=function(){
    
    if(app.running){
  
      
  
      
    }

    app.distanceANT=tourDistance(app.ANT);
    // if(app.running){ swapLongest(app.SA); }
    
    drawSA();
    
    
  };


  // GEN - GENETIC ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var drawGEN=function(){
    
  };
  
  var GEN=function(){
    
    
    
  };


  // SW - Shrink wrap ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  var swX1=150;
  var swX2=590;
  var swY1=10;
  var swY2=590;

  var drawSW=function(){

    stroke(CLRS.RED);
    strokeWeight(2);
    noFill();

    for(var n=0; n<app.SW.length-1; n++){
      
      stroke(CLRS.YELLOW);
      strokeWeight(1);
      noFill();
  
      line(app.SW[n].x,   app.SW[n].y,
           app.SW[n+1].x, app.SW[n+1].y);
      
      noStroke();
      fill(CLRS.RED);
  
      if(n==0){ ellipse(app.SW[n].x, app.SW[n].y, 20, 20);  }
      else    { ellipse(app.SW[n].x, app.SW[n].y, 10, 10);  }

    }

    stroke(CLRS.YELLOW);
    strokeWeight(1);
    noFill();

    line(app.SW[0].x,               app.SW[0].y,
         app.SW[app.HC.length-1].x, app.SW[app.HC.length-1].y);

    noStroke();
    fill(CLRS.RED);
    
    ellipse(app.SW[app.HC.length-1].x, app.SW[app.HC.length-1].y, 20, 20);
    
    for(var c in app.SW){ app.SW[c].draw(0,0); }
    
    // Boundary
    stroke(CLRS.RED);
    strokeWeight(1);

    line(swX1, 10, swX1, height-10);
    
    stroke(CLRS.GREEN);
    line(swX2, 10, swX2, height-10);
    
    stroke(CLRS.BLUE);
    line(150, swY1, width-10, swY1);
    
    stroke(CLRS.YELLOW);
    line(150, swY2, width-10, swY2);
    
    if(app.running){
      
      swX1+=0.2;
      swX2-=0.2;
      swY1+=0.2;
      swY2-=0.2;
      
    }
  };
  
  var SW=function(){
    
    app.temp=0;
    
    if(app.running){
      
      var index1=0;
      var index2=0;
      
      while(index1==index2){
        index1=round(random(app.SW.length-1));
        index2=round(random(app.SW.length-1));
      }

      arraySwap(app.SW, index1, index2);
  
      var distance=tourDistance(app.SW);
  
      if(distance>app.distanceSW){

        arraySwap(app.SW,index1,index2);

      }
      else{

        app.distanceSW=distance;
        app.swaps++;

      }

    }

    app.distanceSW=tourDistance(app.SW);

    drawSW();
    
  };
  
  
  // USER - User selected path ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var addToTour=function(nod){

    if(app.USER_CLICK.length<app.USER.length){
      app.USER_CLICK.push(nod);
      app.USER_CLICK[app.USER_CLICK.length-1].row=app.USER_CLICK.length-1;
    }

  };
  
  var drawUSER=function(){

    // Draw the nodes themselves
    if(app.USER_CLICK.length<app.USER.length){
      for(var c in app.USER){ app.USER[c].draw(0,0); }
    }

    if(app.USER_CLICK.length>0){

      //  Draw the tour path
      for(var n=0; n<app.USER_CLICK.length-1; n++){
        
        stroke(getColor(CLRS.YELLOW,75));
        strokeWeight(0.75);
        noFill();

        line(app.USER_CLICK[n].x,  app.USER_CLICK[n].y,
            app.USER_CLICK[n+1].x, app.USER_CLICK[n+1].y);

      }
      
      if(app.USER.length==app.USER_CLICK.length){
        line(app.USER_CLICK[0].x,
             app.USER_CLICK[0].y,
             app.USER_CLICK[app.USER_CLICK.length-1].x,
             app.USER_CLICK[app.USER_CLICK.length-1].y);
      }
  
      if(app.debug){
        
        // Identify the first and last node
        noStroke();
        fill(CLRS.RED);
        
        ellipse(app.USER[0].x, app.USER[0].y, 20, 20);
        ellipse(app.USER[app.USER.length-1].x, app.USER[app.USER.length-1].y, 20, 20);
  
      }

      for(var c in app.USER_CLICK){ app.USER_CLICK[c].draw(0,0); }

    }

  };
  
  var USER=function(){
    
    if(app.running){
      
      
    }
    
    if(app.USER_CLICK.length!==0){
      app.distanceUSER=tourDistance(app.USER_CLICK);
    }
    // if(app.running){ swapLongest(app.SA); }
    
    drawUSER();

  };

  
  // TSP - Travelling Salesman Problem ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  var drawTSP=function(){
    
    pushMatrix();
    
      // translate(0.5, 0.5);
      
        background(CLRS.WHITE);

        for(var c in app.ctrls){ app.ctrls[c].draw(0,0); }

        drawGrid();

        switch(app.algorithm){

          case 0: HC();   break;
          case 1: SA();   break;
          case 2: ANT();  break;
          case 3: GEN();  break;
          case 4: USER(); break;
          case 5: SW();   break;

          default:        break;

        }

    popMatrix();

  };

  var initTSP=function(){

    app.vortex=[];
    app.nodes=[];
    
    app.currentPATH=[];
    
    app.HC=[];
    app.SA=[];
    app.ANT=[];
    app.GEN=[];
    app.USER=[];
    app.SW=[];
    
    app.temp=round(width/5);
    app.frameRate=60;

    app.ctrls=[];

    var ctrls=[];
    
    var containerTSP=new Container(getGUID(), undefined, [], 0, 0, app.width-3, app.height-3, getColor(CLRS.BLACK,100), "TSP Background", blank, 0);

    ctrls.push(new    Label(getGUID(), containerTSP, [],10, 15, 100, 14, CLRS.WHITE, "Travelling Salesman",0,0));
    ctrls.push(new    Label(getGUID(), containerTSP, [],10, 30, 100, 14, CLRS.WHITE, "        Problem      ",0,0));


    ctrls.push(new    Label(getGUID(), containerTSP, [],           35, 60, 100, 13, CLRS.YELLOW, "Algorithm",0,0));
      
    ctrls.push(new   Option(getGUID(), containerTSP, getAlgorithm, 20, 85, 100, 12, CLRS.CODE_PURPLE, "Hill climb",      setAlgorithm, 0));
    ctrls.push(new   Option(getGUID(), containerTSP, getAlgorithm, 20, 105, 100, 12, CLRS.CODE_PURPLE, "Sim Annealing",  setAlgorithm, 1));
    ctrls.push(new   Option(getGUID(), containerTSP, getAlgorithm, 20, 125, 100, 12, CLRS.CODE_PURPLE, "Ant Colony",     setAlgorithm, 2));
    ctrls.push(new   Option(getGUID(), containerTSP, getAlgorithm, 20, 145, 100, 12, CLRS.CODE_PURPLE, "Genetic - B&B",  setAlgorithm, 3));
    ctrls.push(new   Option(getGUID(), containerTSP, getAlgorithm, 20, 165, 100, 12, CLRS.CODE_PURPLE, "User Selected",  setAlgorithm, 4));
    ctrls.push(new   Option(getGUID(), containerTSP, getAlgorithm, 20, 185, 100, 12, CLRS.CODE_PURPLE, "Shrink Wrap",    setAlgorithm, 5));

    ctrls.push(new    Label(getGUID(), containerTSP, [],      55, 225, 100, 12, CLRS.YELLOW, "Nodes", "", 0));
    ctrls.push(new   Slider(getGUID(), containerTSP, getSize, 25, 245, 100, 12, CLRS.CODE_PURPLE, "12345",  setSize, 3));


    ctrls.push(new    Label(getGUID(), containerTSP, [], 35, 280, 100, 12, CLRS.YELLOW, "Initializations", "", 0));
    ctrls.push(new Checkbox(getGUID(), containerTSP, getMaximize, 20, 305, 100, 12, CLRS.CODE_PURPLE, "Maximize Tour",  setMaximize, 3));
    ctrls.push(new Checkbox(getGUID(), containerTSP, getMinimize, 20, 325, 100, 12, CLRS.CODE_PURPLE, "Minimize Tour",  setMinimize, 3));


    ctrls.push(new   Button(getGUID(), containerTSP, [], 10, 360, 40, 30, CLRS.RED,    "new",    newTSP,   0));
    ctrls.push(new   Button(getGUID(), containerTSP, [], 50, 360, 40, 30, CLRS.GREEN,  "run",    runTSP,   1));
    ctrls.push(new   Button(getGUID(), containerTSP, [], 90, 360, 40, 30, CLRS.YELLOW, "reload", retryTSP, 2));


    ctrls.push(new    Label(getGUID(), containerTSP, undefined,     18, 420, 100, 18, CLRS.YELLOW, "Tour Distance", undefined, 16));
    ctrls.push(new    Label(getGUID(), containerTSP, getDistanceSA, 40, 445, 100, 24, CLRS.WHITE, "0000", getDistanceSA, 14));


    ctrls.push(new    Label(getGUID(), containerTSP, undefined, 18, 490, 100, 14, CLRS.CODE_GREEN, "Swaps", undefined, 16));
    ctrls.push(new    Label(getGUID(), containerTSP, getSwaps,  30, 515, 100, 16, CLRS.WHITE, "0000", getSwaps, 14));

    ctrls.push(new    Label(getGUID(), containerTSP, undefined, 80, 490, 100, 14, CLRS.CODE_GREEN, "Temp", undefined, 16));
    ctrls.push(new    Label(getGUID(), containerTSP, getTemp,   85, 515, 100, 16, CLRS.WHITE, "0000", getTemp, 14));


    ctrls.push(new   Button(getGUID(), containerTSP, [], 10, app.height-40, 100, 30, CLRS.CODE_YELLOW, "back...", setSplash, 0));

    ctrls.push(new Checkbox(getGUID() ,containerTSP, getDebug, 30, 540, 100, 20, CLRS.CODE_PURPLE, "Debug",  setDebug, 3));

// ctrls.push(new   UpDown(getGUID(), containerTSP, getSize, 50, 500, 100, 30, CLRS.CODE_PURPLE, "#", setSize, 3));


    containerTSP.ctrls=ctrls;
    containerTSP.tag=false;

    app.ctrls.push(containerTSP);

    process=drawTSP;

    // resetTSP();
    newTSP();
    
    app.mode=MODES.TSP;
    
  };

  /**

    TO DO:
      
      - pre-configured shapes (star, hexagon, etc)

      - grid and nodes on vertices (snap-to-grid)

      - display possible solutions for each # of nodes and configurations

      - swap routine based on longest segment

      - slider control

      - asetta corsa appearance for controls

  **/
  
  // Splash Screen ============================================================
  {
    var currentP=new pt(0,0);
    var currentX=0;
    var currentY=0;
  
    var complete=false;
  
    var vortexRadius=2.5;
    var vortexDiameter=48;
    
    var position=app.vortex.length;
  
    var loadData=function(){
    
      app.vortex=[];
  
      for(var theta=0; theta<PI*vortexDiameter; theta+=PI/18){
  
        app.vortex.push(new pt( vortexRadius*(cos(theta)+theta*sin(theta)),
                                vortexRadius*(sin(theta)-theta*cos(theta)),
                                round(random(0,1)),
                                color(random(128,192))
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
      else        { arr[arr.length-1].color=color(random(128,192));       }
  
    };
  
    var involute=function(){
  
      rectMode(CENTER);

      noStroke();
  
      var tSize=3;
  
      pushMatrix();
  
        translate(app.width/2,app.height/2);
  
        // for(var radius=900; radius>50; radius-=25){
        //   fill(getColor(CLRS.GRAY,1));
        //   ellipse(0,0,radius,radius);
        // }
  
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

      background(getColor(CLRS.CODE_TEAL,80));

      involute();
  
      addBit(app.vortex);
  
      pushMatrix();
        
        noStroke();
        
        rectMode(CORNER);
        
        fill(getColor(CLRS.BLACK,50));
        
        rect(0,0,app.width,app.height);
        
        fill(getColor(CLRS.CODE_TEAL,50));
        
        rect(0,app.height/2-50,app.width,100);
        
        for(var c in app.ctrls){ app.ctrls[c].draw(0,0); }
  
      popMatrix();
  
    };
    
    var setSplash=function(){
  
      app.frameRate=10;
  
      loadData();
      
      app.ctrls=[];
  
      // Toolbar
      var ctrls=[];
      
      var containerSplash =new Container(getGUID(), undefined, [], 5, 10, app.width-3, app.height-3, getColor(CLRS.WHITE,1), "Splash Background", initGrid);
      
      var x=app.width/2;
      var y=app.height/2;
      
      ctrls.push(new codeButton(getGUID(), containerSplash, undefined, x-105, y-105, 100, 100, CLRS.CODE_PURPLE, "C", initGrid, 1));
      ctrls.push(new codeButton(getGUID(), containerSplash, undefined, x+5,   y-105, 100, 100, CLRS.CODE_ORANGE, "O", initTSP,  2));
      ctrls.push(new codeButton(getGUID(), containerSplash, undefined, x-105, y+5,   100, 100, CLRS.CODE_BLUE,   "D", initTSP,  3));
      ctrls.push(new codeButton(getGUID(), containerSplash, undefined, x+5,   y+5,   100, 100, CLRS.CODE_GREEN,  "E", initTSP,  4));
  
      containerSplash.ctrls=ctrls;
      containerSplash.tag=false;
  
      app.ctrls.push(containerSplash);
  
      process=drawSplash;
      
    };
  }

  
  // Draw loop ================================================================

  var draw=function(){

    pushMatrix();
    
      translate(0.5,0.5);
      
      frameRate(app.frameRate);
  
      process();

    popMatrix();

    if(app.debug){ telemetry(); }

  };


  // Events ===================================================================

  // Mouse Events ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var mouseClicked= function(){
  
      for(var c in app.ctrls){ app.ctrls[c].clicked(mouseX,mouseY); }
      // for(var n in app.nodes){ app.nodes[n].clicked(mouseX,mouseY); }
      for(var n in app.SA){ app.SA[n].clicked(mouseX,mouseY); }
      
    };
    var mouseMoved=   function(){
  
      app.mouseX=mouseX;
      app.mouseY=mouseY;
  
      // if(process!=drawTSP){
      //   for(var n in app.nodes){ app.nodes[n].moved(0,0); }
      // }
      // else{
        
      // }
  
      for(var c in app.ctrls){ app.ctrls[c].moved(0,0); }
      
      for(var n in app.SA){ app.SA[n].moved(0,0); }
  
    };
    var mouseDragged= function(){
      
      // process();
  
      for(var c in app.ctrls){ app.ctrls[c].dragged(mouseX,mouseY); }
      // for(var d in app.ctrls){ app.ctrls[d].draw(mouseX,mouseY);    }
  
      // telemetry();
  
      // for(var n in app.nodes){ app.nodes[n].dragged(mouseX,mouseY); }
  
      // loadConnections();
  
      for(var n in app.SA){ app.SA[n].dragged(mouseX,mouseY); }
  
    };
    var mousePressed= function(){

      switch(mouseButton){
  
        case LEFT:
          
          app.left=true;
          
          // println(app.ctrls.length);
          
          for(var n in app.nodes){ app.nodes[n].mPressed(mouseX,mouseY); }
          for(var c in app.ctrls){ app.ctrls[c].mPressed(mouseX,mouseY); }
          
          break;
          
        case CENTER:  app.center=true;  break;
        case RIGHT:   app.right=true;   break;
  
        default:                        break;
  
      }

    };
    var mouseReleased=function(){
  
      app.left=false;
      app.center=false;
      app.right=false;
  
      for(var n in app.nodes){ app.nodes[n].mReleased(mouseX,mouseY); }
      for(var c in app.ctrls){ app.ctrls[c].mReleased(mouseX,mouseY); }
  
    };
    var mouseOut=     function(){
      
      app.over=false;
      
      // for(var c in app.ctrls){ app.ctrls[c].out(mouseX,mouseY); }
  
    };
    var mouseOver=    function(){
  
      app.over=true;
  
      // for(var c in app.ctrls){ app.ctrls[c].over(mouseX,mouseY); }
  
    };
    var mouseWheel=   function(){
  
      p("scroll");
  
    };
  }
  
  // Keyboard Events ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var keyPressed=   function(){
  
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
  
      for(var c in app.ctrls){ app.ctrls[c].kPressed(); }
  
    };
    var keyReleased=  function(){
  
      app.keys[keyCode]=false;
  
      for(var c in app.ctrls){ app.ctrls[c].kReleased(); }
  
    };
    var keyTyped=     function(){
  
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
  }


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
