

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

**/

  angleMode="radians";
  
  // Globals ==================================================================
  var process;
  
  // Constants
  var UNDEF;
  
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
    
    CODE_YELLOW:    color(0,148,202),
    
    CODE_RED:       color(170,29,29)
    
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

    // General ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    UNDEF:                  [   0,  'Undefined',              'UNDEFINED'                           ],

    DEBUG:                  [   1,  'Debug',                  'DEBUG'                               ],

    
    // Mouse ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    TSP:                    [   1,  'Travelling Salesman Problem',  'Travelling Salesman Problem'   ],
    NETWORK:                [   1,  'Network',                      'Network'                       ],
    PLACEHOLDER1:           [   1,  'PH1',                          'PH1'                           ],
    PLACEHOLDER2:           [   1,  'PH2',                          'PH2'                           ],


    // Travaelling Salesman Problem ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    HILL_CLIMB:             [   200,  'HIll Climb',           'Hill Climb'            ],    //  Greedy
    SIMULATED_ANNEALING:    [   200,  'Simulated Annealing',  'Simulated Annealing'   ],
    ANT_COLOBY:             [   200,  'Ant Colony',           'Ant Colony'            ],
    GENETIC:                [   200,  'Genetic',              'Genetic'               ],
    USER_SELECTED:          [   200,  'User Selected',        'User Selected'         ],
    USER_DIRECTED:          [   200,  'User Directed',        'User Directed'         ],
    SHRINK_WRAP:            [   200,  'Shrink Wrap',          'Shrink Wrap'           ],

    TEMPERATURE:            [   200,  'Shrink Wrap',          'Shrink Wrap'           ],

    TEMPERATURE_INITIAL:    [   200,  'Shrink Wrap',          'Shrink Wrap'           ],
    TEMPERATURE_INCREMENT:  [   200,  'Shrink Wrap',          'Shrink Wrap'           ],

    MAXIMIZE_TOUR:          [   200,  'Maximize Tour',        'Maximize Tour'         ],
    MINIMIZE_TOUR:          [   200,  'Minimize Tour',        'Minimize Tour'         ],

    TWO_OPT:                [   200,  'Two Opt',              'Two Opt'               ],
    THREE_OPT:              [   200,  'Three Opt',            'Three Opt'             ],

    NEW:                    [   200,  'New',                  'New'                   ],
    PLAY_PAUSE:             [   200,  'Play - Pause',         'Play - Pause'          ],
    RELOAD:                 [   200,  'Reload',               'Reload'                ],

    NODES:                  [   200,  'Nodes',                'Nodes'                 ],


    // Mouse ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    WIDTH:                [  10,  'Width',            'WIDTH'                 ],
    HEIGHT:               [  11,  'Height',           'HEIGHT'                ],

    FRAMERATE:            [  12,  'FrameRateA',       'FRAMERATE(A)'          ],

    VISIBLE:              [  21,  'Visible',          'VISIBLE'               ],

    CURRENT:              [  27,  'Current',          'CURRENT'               ],
    FACTOR:               [  28,  'Factor',           'FACTOR'                ],
    UTIL:                 [  29,  'Util',             'UTIL'                  ],


    // Mouse ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    MOUSEX:               [  14,  'MouseX',           'MOUSEX'                ],
    MOUSEY:               [  15,  'MouseY',           'MOUSEY'                ],
    WORLDX:               [  16,  'WorldX',           'WORLDX'                ],
    WORLDY:               [  17,  'WorldY',           'WORLDY'                ],
    GRIDX:                [  18,  'GridX',            'GRIDX'                 ],
    GRIDY:                [  19,  'GridY',            'GRIDY'                 ],
        
    pressed:              [  20,  'pressed',          'pressed'               ],
        
    FOCUS:                [  22,  'Focus',            'FOCUS'                 ],
        
    LEFT:                 [  23,  'Left button',      'LEFT'                  ],
    CENTER:               [  24,  'Center button',    'CENTER'                ],
    RIGHT:                [  25,  'Right button',     'RIGHT'                 ],

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

      debug:          true,
      telemetry:      true,

      // protagonists ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      prot:           0,

      maxSpeedX:      10,
      maxSpeedY:      0,

      codf:           0.85,     //  Coefficient of dynamic friction
      G:              12,


      // Obstacles ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      obstacles:      [],
      hazards:        [],
      
      // TSP ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      grid:           0,

      width:          750,
      height:         600,
      
      running:        false,
      
      displayGrid:     true,

      // HC:             [],   //  Hill Climb
      // displayHC:      true,
      // distanceHC:     0,
      // swapsHC:        0,
      
      // SA:             [],   //  Simulated Annealling
      // displaySA:      false,
      // distanceSA:     0,
      // swapsSA:        0,
      
      // ANT:            [],   //  Ant Colony
      // displayANT:     false,
      // distanceANT:    0,
      // swapsANT:       0,
      
      // GEN:            [],   //  Genetic
      // displayGEN:     false,
      // distanceGEN:    0,
      // swapsGEN:       0,
      
      USER:           [],     //  User selected
      USER_CLICK:     [],     //  User currently clicked
      displayUSER:    false,
      distanceUSER:   0,
      swapsUSER:      0,

      // SW:             [],     //  Shrink Wrap
      // displaySW:      false,
      // distanceSW:     0,
      // swapsSW:        0,

      algorithm:      ALGORITHMS.SA,
      
      tspSize:        20,

      swaps:          0,

      temp:           0,
      maxTemp:        0,
      tempIncrement:  0.0125,
      
      leftMost:       0,
      rightMost:      0,
      topMost:        0,
      bottomMost:     0,

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
      
      case ALGORITHMS.HC:     app.population[0]=app.HC;     break;
      case ALGORITHMS.SA:     app.population[0]=app.SA;     break;
      case ALGORITHMS.ANT:    app.population[0]=app.ANT;    break;
      case ALGORITHMS.GEN:    app.population[0]=app.GEN;    break;
      case ALGORITHMS.USER:   app.population[0]=app.USER;   break;
      case ALGORITHMS.SHRINK: app.population[0]=app.SHRINK; break;

      default:                                              break;

    }

    // println(app.algorithm);

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
    
    println("telemetry");
    
    // if(app.over && app.keys[KEYCODES.CONTROL]){
      
      pushMatrix();
        
        resetMatrix();

      var rowHeight=20;
      var top=25;
      var Left=605;
      
      textAlign(LEFT,BOTTOM);

      // Border
      stroke(CLRS.WHITE);
      strokeWeight(0.25);
      fill(getColor(CLRS.BLACK,40));
  
      rect(Left-10,top-20,150,5900,0,20,20,0);

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




      fill(getColor(CLRS.WHITE,60));
      
      text("Right: ",                 Left, top+24*rowHeight);
      text("Left: ",                  Left, top+25*rowHeight);
      text("Horizontal Speed: ",      Left, top+26*rowHeight);
      
      fill(CLRS.YELLOW);
      
      text(app.prot.right,            Left+100,  top+24*rowHeight);
      text(app.prot.left,             Left+100,  top+25*rowHeight);
      text(nf(app.prot.speed.x,1,3),  Left+100,  top+26*rowHeight);



      // Cache
      textSize(16);
      textAlign(LEFT,TOP);
      fill(CLRS.YELLOW);
      
      text(app.cache,5,5);                        //  cache contents
      text(app.cache.length,5,50);                //  cache length
  
      // # Received
      textAlign(LEFT,BOTTOM);
      text(app.received.length,5,app.height-5);   //  # of packets received

      popMatrix();

    // }
    
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

  var edge=function(id1,x1,y1, id2,x2,y2, value){

      this.id1=id1;
      this.x1=x1;
      this.y1=y1;

      this.id2=id2;
      this.x2=x2;
      this.y2=y2;

      this.value=value;

  };

  // Node ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {
    var Node=function(id,parent,ctrls,x,y,w,h,color,caption,execute,params){
  
      // if(id===undefined){ this.id=gevNodeAddress(); }
      // else              { this.id=id;               }
  
      this.id=id;
      this.nat=gevNodeAddress();
  
      // this.gridID=row+":"+col;
  
      // this.row=row;         //  row position
      // this.col=col;         //  column position
      
      this.position=new PVector(x,y);
      this.velocity=new PVector(random(-15,15),random(-15,15));

      this.parent=parent;
      this.r=10;
      // this.r=random(20,40); //  radius

      this.w=10;            //  width
      this.h=10;            //  height

      // this.routes=routes;   //  # of paths to the node
  
      this.hit=false;       //  mouse is over node
      this.enabled=true;    //  currently functional
      this.selected=false;
  
      this.connections=[];
  
      // this.incrX=round(random(-15, 15));
      // this.incrY=round(random(-15, 15));
  
      this.distance=0;

    };
    Node.prototype.draw=      function(x,y){
  
      // Node connections
      stroke(getColor(CLRS.CONNECTION,255));
      strokeWeight(0.75);
  
      // for(var n in this.connections){
      //   line(this.x, this.y, this.connections[n].x, this.connections[n].y);
      // }

      noStroke();

      for(var n in this.parent.ctrls){

        if(dist(this.parent.ctrls[n].position.x,
                this.parent.ctrls[n].position.y,
                this.position.x,
                this.position.y)<this.r){

          this.position.add(this.parent.ctrls[n].velocity);
          // this.parent.ctrls[n].velocity.add(this.velocity);

          fill(CLRS.ORANGE);

        }
        else{

          fill(CLRS.GRAY);

        }

      }

      if(this.velocity.x>0 && this.velocity.y>0){
        fill(CLRS.RED);
      }
      else if(this.velocity.x>0 && this.velocity.y<0){
        fill(CLRS.GREEN);
      }
      else if(this.velocity.x<0 && this.velocity.y>0){
        fill(CLRS.BLUE);
      }
      else{ // < <
        fill(CLRS.ORANGE);
      }
        
      ellipse(this.position.x,this.position.y,20,20);

      // Range ellipse
      fill(getColor(CLRS.WHITE,6));
      stroke(CLRS.WHITE);
      strokeWeight(0.125);
  
      if(this.enabled){
        ellipse(this.position.x, this.position.y, this.r*2, this.r*2);
      }
      
      // Node ellipse
      fill(getColor(CLRS.WHITE,255));
  
      ellipse(this.position.x, this.position.y, this.r/2, this.r/2);
      
      if(this.enabled){
        
        fill(CLRS.GREEN);
        // ellipse(this.position.x, this.position.y, 10, 10);
  
      }
      else{
        
        fill(CLRS.RED);
        // ellipse(this.position.x, this.position.y, 10, 10);
        
      }
      
      // Connection count label
      if(this.hit){
        
        textSize(12);
        textAlign(LEFT,TOP);
  
        fill(getColor(CLRS.BLACK,75));
        rectMode(CORNER);
        rect(this.position.x-3, this.position.y,textWidth(this.id)+6, 76, 3);
        
        fill(CLRS.WHITE);
  
        text(this.gridID,             this.position.x, this.position.y);
        text(this.id,                 this.position.x, this.position.y+12);
        text(this.row+":"+this.col,   this.position.x, this.position.y+24);
        text(this.nat,                this.position.x, this.position.y+36);
        text(this.connections.length, this.position.x, this.position.y+48);
        text(this.routes,             this.position.x, this.position.y+60);
        
        fill(CLRS.YELLOW);
        
      }
      else{
  
        // noFill();
  
      }
      
      if(this.position.x<this.r){
        
        this.position.x=this.r;
        this.velocity.x*=-0.95;
        
      }
      if(this.position.x>440-this.r){
        
        this.position.x=440-this.r;
        this.velocity.x*=-0.95;

      }
      if(this.position.y<this.r){
        
        this.position.y=this.r;
        this.velocity.y*=-0.95;

      }
      if(this.position.y>580-this.r){
        
        this.position.y=580-this.r;
        this.velocity.y*=-0.95;
        
      }
      
      this.position.add(this.velocity);

    };
    Node.prototype.clicked=   function(x,y){
  
      if(this.hit){
        this.enabled=!this.enabled;
        
  println(this.enabled);
        
      }
  
    };
    Node.prototype.moved=     function(x,y){
  
      if(mouseX>x+this.x-this.r &&
         mouseX<x+this.x+this.r &&
         mouseY>y+this.y-this.r &&
         mouseY<y+this.y+this.r){
           
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
  
        this.x=mouseX-x;
        this.y=mouseY-y;
  
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
        
        // protagonist value
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
          
          rect(x+this.x, y+this.y, this.w, this.h);

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

  // Collision detection
  var horizontalCollision=function(prot){
    
    // println(prot.position.x);
    
    var retval=-1;

    for(var n=0; n<app.obstacles.length; n++){

      if(prot.position.x < app.obstacles[n].position.x+app.obstacles[n].size.x &&
         prot.position.x+prot.size.x>app.obstacles[n].position.x){
           
        retval=n;

      }

    }

    return retval;

  };
  
  // protagonists =================================================================

  // Obstacles ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {

    var Obstacle=function(id,x,y,w,h){

      this.id         = id;         //  Unique control id

      this.position   = new PVector(x,y);
      this.speed      = new PVector(0,0);
      this.size       = new PVector(w,h);
      
      this.w          = w;
      this.h          = h;
      this.deflection = 0.75;
      
      this.hit        = false;      //  mouse is over node

      this.visible    = true;       //  Is the control visible?

      this.timer      = 0;          //  Countdown timer

      this.tag        = 0;          //  Misc property

    };
    Obstacle.prototype.draw=       function(x,y){

      // if(this.visible){

        fill(CLRS.RED);
        
        var distance=dist(this.position.x, this.position.y,
                          app.prot.position.x, app.prot.position.y);
                
        // if(dist(this.position.x, this.position.y,
        //         app.prot.position.x, app.prot.position.y)<25){

        //   fill(CLRS.ORANGE);

        // }
        
        

        // fill(128-distance,0,0,255-distance);
        // stroke(128-distance,0,0,255-distance);
        // strokeWeight(0);
        
        fill(128-distance,0,0);
        stroke(128-distance,0,0);
        strokeWeight(0);
  
        rect(this.position.x, this.position.y,
             this.size.x,     this.size.y);

        // if(distance<=255){

          strokeWeight(0.75);
          stroke(128-distance,128-distance,128-distance,255-distance);

          rect(this.position.x+3, this.position.y+3,
               this.size.x-6,    this.size.y-6);

        // }
// println(this.id + " : " + this.position.x + " : " + this.position.y);

      // }
      
    };
    // Obstacle.prototype.clicked=    function(x,y){
  
    //   if(this.hit){ this.execute(); }
  
    // };
    // Obstacle.prototype.moved=      function(x,y){
  
    //   if(x>this.x &&
    //     x<this.x+this.w &&
    //     y>this.y &&
    //     y<this.y+this.h){
           
    //     this.hit=true;
    //     app.focus=this.id;
  
    //     for(var c in this.ctrls){ this.ctrls[c].moved(mouseX,mouseY); }
  
    //   }
    //   else{
  
    //     this.hit=false;
  
    //   }
  
    // };
    // Obstacle.prototype.dragged=    function(x,y){
  
    //   if(this.hit){
    //     for(var c in this.ctrls){ this.ctrls[c].dragged(mouseX,mouseY); }
    //   }
  
    // };
    // Obstacle.prototype.mPressed=   function(x,y){
  
    //   if(this.hit){
    //     for(var c in this.ctrls){ this.ctrls[c].left(mouseX,mouseY); }
    //   }
  
    //   };
    // Obstacle.prototype.mReleased=  function(x,y){
  
    //   if(this.hit){
    //     for(var c in this.ctrls){ this.ctrls[c].released(mouseX,mouseY); }
    //   }
  
    // };
    // Obstacle.prototype.over=       function(x,y){
  
    //   if(this.hit){
    //     for(var c in this.ctrls){ this.ctrls[c].over(mouseX,mouseY); }
    //   }
  
    // };
    // Obstacle.prototype.out=        function(x,y){
  
    //   if(this.hit){
    //     for(var c in this.ctrls){ this.ctrls[c].out(mouseX,mouseY); }
    //   }
  
    // };
    // Obstacle.prototype.kPressed=   function(keyCode){};

  }

  // Hazard ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {

    var Hazard=function(id,x,y,w,h){

      this.id         = id;         //  Unique control id

      this.position   = new PVector(x,y);
      this.speed      = new PVector(0,0);
      this.size       = new PVector(w,h);

      this.deflection = 0.75;

      this.hit        = false;      //  mouse is over node

      this.visible    = true;       //  Is the control visible?

      this.timer      = 0;          //  Countdown timer

      this.tag        = 0;          //  Misc property

    };
    Hazard.prototype.draw=       function(x,y){

      // if(this.visible){

        fill(CLRS.RED);
        
        var distance=dist(this.position.x,
                          this.position.y,
                          app.prot.position.x,
                          app.prot.position.y);

        // fill(getColor(CLRS.ORANGE,128-distance));
        // stroke(getColor(CLRS.ORANGE,128-distance));
        // strokeWeight(0);

        fill(CLRS.ORANGE);
        stroke(CLRS.ORANGE);
        strokeWeight(0);
        
        rect(this.position.x, this.position.y,
             this.size.x,     this.size.y);

    };
    // Hazard.prototype.clicked=    function(x,y){
  
    //   if(this.hit){ this.execute(); }
  
    // };
    // Hazard.prototype.moved=      function(x,y){
  
    //   if(x>this.x &&
    //     x<this.x+this.w &&
    //     y>this.y &&
    //     y<this.y+this.h){
           
    //     this.hit=true;
    //     app.focus=this.id;
  
    //     for(var c in this.ctrls){ this.ctrls[c].moved(mouseX,mouseY); }
  
    //   }
    //   else{
  
    //     this.hit=false;
  
    //   }
  
    // };
    // Hazard.prototype.dragged=    function(x,y){
  
    //   if(this.hit){
    //     for(var c in this.ctrls){ this.ctrls[c].dragged(mouseX,mouseY); }
    //   }
  
    // };
    // Hazard.prototype.mPressed=   function(x,y){
  
    //   if(this.hit){
    //     for(var c in this.ctrls){ this.ctrls[c].left(mouseX,mouseY); }
    //   }
  
    //   };
    // Hazard.prototype.mReleased=  function(x,y){
  
    //   if(this.hit){
    //     for(var c in this.ctrls){ this.ctrls[c].released(mouseX,mouseY); }
    //   }
  
    // };
    // Hazard.prototype.over=       function(x,y){
  
    //   if(this.hit){
    //     for(var c in this.ctrls){ this.ctrls[c].over(mouseX,mouseY); }
    //   }
  
    // };
    // Hazard.prototype.out=        function(x,y){
  
    //   if(this.hit){
    //     for(var c in this.ctrls){ this.ctrls[c].out(mouseX,mouseY); }
    //   }
  
    // };
    // Hazard.prototype.kPressed=   function(keyCode){};

  }
  
  // Protagonist ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {

    var Protagonist=function(id,x,y,w,h){

      this.id         = id;         //  Unique control id

      this.w          = w;          //  width
      this.h          = h;          //  height

      this.position   = new PVector(x,y);
      this.speed      = new PVector(0,0);
      this.size       = new PVector(20,20);

      this.deflection = 0.75;

      this.hit        = false;      //  mouse is over node

      this.visible    = true;       //  Is the control visible?
      this.jumping    = false;      //  Is the protagonist currently jumping

      this.timer      = 0;          //  Countdown timer

      this.tag        = 0;          //  Misc property
      
      this.left       = -1;      //  Is there an obstacle on the left?
      this.right      = -1;      //  Is there an obstacle on the right?
      this.up         = -1;      //  Is there an obstacle above?
      this.down       = -1;      //  Is there an obstacle below?
      
    };
    Protagonist.prototype.draw=       function(x,y){

      if (typeof this.parent != "undefined") {
        // alert("GOT THERE");
        // println("No parent");
      }

      /** Movement ---------- */
      
      var deltaX=this.speed.x;
      var deltaY=this.speed.y;
      var maxX=app.maxSpeedX;
      var maxY=app.maxSpeedY;
      var proximityX=Infinity;
      var proximityY=Infinity;
      
      // Clear all the obstable switches
      this.left =-1;
      this.right=-1;
      this.above=-1;
      this.below=-1;
      
      // Horizontal
      {

// println(index);

        // Determine on which side there is an obstable or hazard
        {

          for(var n=0; n<app.obstacles.length; n++){
            
            // Proximity Test
            proximityX=dist(this.position.x,             this.position.y,
                            app.obstacles[n].position.x, app.obstacles[n].position.y);
  
            if(proximityX <= app.obstacles[n].size.x-0.5*deltaX){

              // Collision Test

              // Left
              if(this.position.x-1             <= app.obstacles[n].position.x + app.obstacles[n].size.x &&
                 this.position.x + this.size.x >= app.obstacles[n].position.x){

                this.left=n;
                // break;

              }

              // Right
              if(this.position.x + this.size.x+1 >= app.obstacles[n].position.x &&
                 this.position.x                 <= app.obstacles[n].position.x &&
                 this.position.y - app.obstacles[n].position.y < 2){
  
                this.right=n;
                // break;
  
              }

            }

          }

        } 

        // Left --------------------------------------------------
        if(app.keys[KEYCODES.LEFT]){

          if(this.left==-1){ this.speed.x=constrain(this.speed.x-=0.5,-maxX, maxX); } // Clear of obstacle(s)
          else             { this.speed.x=0;                                        } // Obstacle(s) encountered

        }

        // Right --------------------------------------------------
        if(app.keys[KEYCODES.RIGHT]){

          if(this.right==-1){ this.speed.x=constrain(this.speed.x+=0.5,-maxX, maxX); } // Clear of obstacle(s)
          else              { this.speed.x=0;                                        } // Obstacle(s) encountered

        }
        
        // !Right && !Left --------------------------------------------------
        if(!app.keys[KEYCODES.LEFT] && !app.keys[KEYCODES.RIGHT]){

          if(this.right==-1){ this.speed.x=constrain(this.speed.x*=app.codf,-maxX, maxX); } // Clear of obstacle(s)
          else              { this.speed.x=0;                                             } // Obstacle(s) encountered

        }

        if(app.keys[KEYCODES.LEFT] &&
           app.keys[KEYCODES.RIGHT]){ this.speed.x=0; }
        
        if(this.speed.x>-0.1 && this.speed.x<0.1){ this.speed.x=0; }
        
        this.position.x+=this.speed.x;

        // if(verticalCollision)  { this.speed.y=0; }

      }

      // Vertical
      {

        if(app.keys[KEYCODES.UP] && !this.jumping){
          this.jumping=true;
          this.speed.y+=1.2*app.G;
        }
        else{
          this.jumping=false;
        }

        this.position.y+=this.speed.y;

        if(this.speed.y>app.G/app.frameRate){ this.speed.y-=app.G/app.frameRate;  }
        if(this.position.y>this.speed.y)    { this.speed.y--;                     }
        else                                { this.position.y=0;
                                              this.speed.y=0;                     }

        if(this.speed.y!=0){ this.jumping=true;  }
        else               { this.jumping=false; }
        


// println(this.speed.y + " : " + this.position.y + " : " + this.jumping);

      }
      
      // Hides the obstacle based on proximity
      // for(var h in app.hazards){
       
      //   if(dist(this.position.x,           this.position.y,
      //           app.hazards[h].position.x, app.hazards[h].position.y)<5){
      //             // app.prot=[];
      //             this.visible=false;
      //   }
      //   else{ this.visible=true; }
                      
      // }
      
      // Display
      {

        if(this.visible){
  
          if(this.hit){ fill(getColor(CLRS.WHITE,5));                 }
          else        { fill(getColor(this.color,this.timer/30*50));  }
  
          rectMode(CORNER);
          noStroke();
  
          // Border/Background
          fill(CLRS.WHITE);
          stroke(CLRS.BLACK);
          strokeWeight(0);
          
          // Skew of prot top based on speed
          var offset=0;
  
          if     (this.speed.x>0) { offset=this.speed.x/5;  }
          else if(this.speed.x<0) { offset=this.speed.x/5;  }
          else if(this.speed.x==0){ offset=0;               }
          
          // Exterior cube
          quad(this.position.x,                    this.position.y,
               this.position.x+this.size.x,        this.position.y,
               this.position.x+this.size.x-offset, this.position.y+this.size.x,
               this.position.x-offset,             this.position.y+this.size.x);
  
          fill(CLRS.WHITE);
          noFill();
          strokeWeight(0.25);
  
          if(this.visible){ fill(CLRS.BLACK); }
          else            { fill(CLRS.RED);   }
          
          // Interior cube
          // quad(this.position.x+3,                   this.position.y+3,
          //     this.position.x+this.size.x-3,        this.position.y+3,
          //     this.position.x+this.size.x-3-offset, this.position.y+this.size.y-3,
          //     this.position.x+3-offset,             this.position.y+this.size.y-3);
          
          // Eyes
          
          switch(true){

            case app.keys[KEYCODES.RIGHT] &&
                 app.keys[KEYCODES.LEFT]:

              rect(this.position.x+this.size.x/2-5, this.position.y+this.size.y-6, 3, 3);
              rect(this.position.x+this.size.x/2+2, this.position.y+this.size.y-6, 3, 3);
              break;

            case !app.keys[KEYCODES.RIGHT] &&
                 !app.keys[KEYCODES.LEFT]:

              rect(this.position.x+this.size.x/2-5, this.position.y+this.size.y-6, 3, 3);
              rect(this.position.x+this.size.x/2+2, this.position.y+this.size.y-6, 3, 3);

              break;

            case app.keys[KEYCODES.LEFT]:

              rect(this.position.x+3-offset, this.position.y+this.size.y-6, 3, 3);
              rect(this.position.x+9-offset, this.position.y+this.size.y-6, 3, 3);
              break;

            case app.keys[KEYCODES.RIGHT]:

              rect(this.position.x+this.size.x-6-offset, this.position.y+this.size.y-6, 3, 3);
              rect(this.position.x+this.size.x-12-offset, this.position.y+this.size.y-6, 3, 3);
              break;

            default:
            
              break;
      
          }
  
        }
        
      }        

    };
    Protagonist.prototype.clicked=    function(x,y){
  
      if(this.hit){ this.execute(); }
  
    };
    Protagonist.prototype.moved=      function(x,y){
  
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
    Protagonist.prototype.dragged=    function(x,y){
  
      if(this.hit){
        for(var c in this.ctrls){ this.ctrls[c].dragged(mouseX,mouseY); }
      }
  
    };
    Protagonist.prototype.mPressed=   function(x,y){
  
      if(this.hit){
        for(var c in this.ctrls){ this.ctrls[c].left(mouseX,mouseY); }
      }
  
      };
    Protagonist.prototype.mReleased=  function(x,y){
  
      if(this.hit){
        for(var c in this.ctrls){ this.ctrls[c].released(mouseX,mouseY); }
      }
  
    };
    Protagonist.prototype.over=       function(x,y){
  
      if(this.hit){
        for(var c in this.ctrls){ this.ctrls[c].over(mouseX,mouseY); }
      }
  
    };
    Protagonist.prototype.out=        function(x,y){
  
      if(this.hit){
        for(var c in this.ctrls){ this.ctrls[c].out(mouseX,mouseY); }
      }
  
    };
    Protagonist.prototype.kPressed=   function(keyCode){
      
      // app.keys[keyCode];
      
      // if(keyCode==KEYCODES.UP &&
      //   this.jumping==false){
        
      //   if(this.position.y<=0 &&
      //     this.speed.y<=0){
          
      //     this.jumping=true;
      //     this.speed.y+=app.G;
          
      //   }

      // }
      
    };

  }
  
  // Draw loop ================================================================

  var setBackground=function(){

    background(CLRS.BLACK);

      // Background
    // for(var n=0; n<50; n++){
    //   fill(random(255));
    //   stroke(random(255));
    //   rect(random(0,width), -30,
    //       random(0,width), random(0,height));
    // }
    
  };
  
  var draw=function(){

    pushMatrix();

      scale(1,-1);
      translate(0.5,-570.5);

      frameRate(app.frameRate);

      // process();

      setBackground();

      fill(64);
      stroke(64,0,0);
      strokeWeight(1);

      rect(0,0,590,590);

      for(var o in app.obstacles){ app.obstacles[o].draw(); }
      for(var h in app.hazards)  { app.hazards[h].draw();   }

      app.prot.draw();

      strokeWeight(1);
      stroke(CLRS.RED);
      
      // line(0,0,600,0);
      ellipse(0,0,20,20);

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
  
      // for(var n in app.nodes){ app.nodes[n].mReleased(mouseX,mouseY); }
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
  
      // for(var c in app.ctrls){ app.ctrls[c].kPressed(); }
  
      // app.prot.kPressed(keyCode);
  
    };
    var keyReleased=  function(){
  
      app.keys[keyCode]=false;

    };
    var keyTyped=     function(){

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

    app.gridSize=11;

    app.xIncr=app.width/(app.gridSize+1);
    app.yIncr=app.height/(app.gridSize+1);

    // Background
    // for(var n=0; n<50; n++){
    //   fill(random(255));
    //   stroke(random(255));
    //   rect(random(0,width), random(0,width),
    //       random(0,width), random(0,width));
    // }

    // Protagonist
    app.prot=new Protagonist(111,55,60,20,-20);

    // Floor
    // for(var n=0; n<width/20-1; n++){
    //   app.obstacles.push(new Obstacle(n, 10+n*20, -20, 20, 20));
    // }

    // Left border
    for(var n=0; n<height/20; n++){
      app.obstacles.push(new Obstacle(n, 10, -60+n*20, 20, 20));
    }
  
    // Right border
    for(var n=0; n<height/20; n++){
      // app.obstacles.push(new Obstacle(n, 230, n*20, 20, 20));
    }
    
    app.obstacles.push(new Obstacle(n, 230, 0, 20, 20));
    
    // Large Block
    // app.obstacles.push(new Obstacle(n, 60, 20, 200, 20));
  
    // Hazards
    // app.hazards.push(new Hazard(n, 200, 20, 20, 20));
  
    // setGrid();
    // setTSP();
    // setSplash();

  };

  initialize();

}};
