/*
    ============================================================================
        cartesia.js
    ===========================================================================
*/
/* @pjs globalKeyEvents="true"; */
var proc = function(processingInstance){
  with (processingInstance){

size=size(600, 600); // set size of canvas

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


var process;

var zoomfactor=0;
  
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

  };
  
  var hexToRGBA=function(hexStr,a){

    // note: hexStr should be #rrggbb
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b =  hex & 0x0000ff;
    
    return color(r,g,b,a);

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
    FILL:         getColor(color(255*7/11),10),
    FILLA:        getColor(color(255*7/11),25),

    RULER:        color(231,189,33),

    SELECTED:     color(0,0,255),
    HIT:          color(255,0,0)

  };

  var MODES={
    SAMPLE:           0,
    MANUAL:           1
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

    CONTAINER:    [   3,  'Container',        'CONTAINER'             ],
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

  var app={

      nodes:          [],
      packets:        [],
      
      paths:          [],

      dragging:       false,
      activeNode:     -1,

      gridSize:       9,

    width:          600,
    height:         600,
    
    vortex:         1,
    
    debug:          true,
    frameRate:      30,

    focus:          0,

    mouseX:         1000,
    mouseY:         20,
    
    // mousePressed:   0,

    left:           false,
    center:         false,
    right:          false,

    keys:           [],

    border:         true,

    stack:          [],

    ctrls:          [],

  };

  // Methods ==========================================================

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

  var reset=function(){
    // app.current=0;
    app.vertices=[];
  };
  var getDottedLine=function(x0, y0, x1, y1, n){

    var x,y;

    for(var i=0; i<=n; i++) {

      x = lerp(x0, x1, i/n);
      y = lerp(y0, y1, i/n);

      ellipse(x, y, 1, 1);

    }

  };

  var rec=function(x,y,w,h,r){

  // Find out what this Does

    beginShape();
      vertex(x,y);
      vertex(x+w,y);
      vertex(x+w,y+h);
      vertex(x,y+h);
    endShape(CLOSE);

  };

  var pt=function(x,y,value){
    
    this.x=x;
    this.y=y;
    
    this.value=value;

  };

  var factor=1.25;
  var endNode;
  var telemetry=function(){
  
    // document.getElementById('height-value').innerText=app.height;
    // document.getElementById('width-value').innerText=app.width;
    
    // document.getElementById('mouseX-value').innerText=app.mouseX;
    // document.getElementById('mouseY-value').innerText=app.mouseY;
    
    // document.getElementById('gridX-value').innerText=nf(app.gridX,1,2);
    // document.getElementById('gridY-value').innerText=nf(app.gridY,1,2);

    // document.getElementById('worldX-value').innerText=app.worldX;
    // document.getElementById('worldY-value').innerText=app.worldY;

    // document.getElementById('leftButton-value').innerText=app.left;
    // document.getElementById('centerButton-value').innerText=app.center;
    // document.getElementById('rightButton-value').innerText=app.right;

    // // document.getElementById('focus-value').innerText=app.focus;
    
    // document.getElementById('currentCommand-value').innerText=app.current;
    
    // document.getElementById('factor-value').innerText=nf(app.factor,1,2);
    

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

  // Node ===========================================================
  var Node=function(id,x,y,routes){

    if(id===undefined){ this.id=getGUID();  }
    else              { this.id=id;         }

    this.x=x;             //  x-coordinate
    this.y=y;             //  y-coordinate

    this.r=random(10,50); //  radius
    this.w=10;            //  width
    this.h=10;            //  height

    this.routes=routes;   //  # of paths to the node

    this.hit=false;       //  mouse is over node
    this.active=true;     //  currently functional
    this.selected=false;

    this.connections=[];

    this.xIncr=random(-5,5);
    this.yIncr=random(-5,5);

    this.distance=0;

  };
  Node.prototype.draw=function(){

    // Node connections
    stroke(getColor(CLRS.ORANGE,64));
    strokeWeight(0.75);

    for(var n in this.connections){
      line(this.x, this.y, this.connections[n].x, this.connections[n].y);
    }
    
    // Range ellipse
    fill(getColor(CLRS.WHITE,12));
    strokeWeight(1.25);
    noStroke();

    ellipse(this.x, this.y, this.r*2, this.r*2);

    // Node ellipse
    fill(getColor(CLRS.WHITE,255));
    
    ellipse(this.x, this.y, this.r/2, this.r/2);

    // Connection count label
    if(this.hit){ fill(CLRS.RED);   }
    else        { fill(CLRS.WHITE); }

    textAlign(CENTER,BOTTOM);
    text(this.connections.length, this.x-3, this.y+3);

    // this.x+=random(-3,3);
    // this.y+=random(-3,3);
    
  };
  Node.prototype.clicked=function() {

    if(this.hit &&
       app.keys[KEYCODES.CONTROL]){
      this.active=!this.active;
    }

  };
  Node.prototype.moved=function(x,y){

    if(x>this.x-this.r &&
       x<this.x+this.r &&
       y>this.y-this.r &&
       y<this.y+this.r){ this.hit=true;  }
    else               { this.hit=false; }

  };
  Node.prototype.dragged=function() {

    if(this.hit &&
       app.left &&
       app.activeNode===this.id){
      this.x=app.mouseX;
      this.y=app.mouseY;
      // this.load();
    }

  };
  Node.prototype.pressed=function() {

    if(this.hit){
      app.activeNode=this.id;
    }

  };
  Node.prototype.released=function(){

    if(this.hit){
      app.activeNode=-1;
    }

  };
  Node.prototype.load=function()    {

    this.connections=[];

    for(var row in app.nodes){
      for(var col in app.nodes[row]){

        if(dist(app.nodes[row][col].x,
                app.nodes[row][col].y,
                this.x,
                this.y)<(app.nodes[row][col].r+this.r*2) &&
                         app.nodes[row][col].id!==this.id){
          this.connections.push(app.nodes[row][col]);
        }
        
      }
    }

  };
  
 // Packet ===========================================================
  var Packet=function(source, destination){

    this.source=source;
    this.destination=destination;

    this.path=[];
    this.nodes=[];    //  nodes packet will travers
    this.points=[];   //  path points of packet
    this.p=0;         //  current index of packet on path
    
    // Path must have and equal number of zeros and ones.
    for(var n=0; n<app.gridSize-1; n++){
      this.path[n]=1;
      this.path[n+app.gridSize-1]=0;
    }

    //  Randomly swap each element in the path with another
    randomizeArray(this.path);

    // Reference path nodes locally
    var x=0;
    var y=0;
    var n=0;
    var incr=10;
    
    this.nodes.push(app.nodes[x][y]);

    for(n=1; n<=this.path.length; n++){

      if(this.path[n-1]===0) { x++; }
      else                   { y++; }

      this.nodes.push(app.nodes[x][y]);

    }
    
// println(this.nodes.length);

    for(n=0; n<this.nodes.length-1; n++){
      for(var p=0; p<incr; p++){
        
        // println(lerp(this.nodes[n].x, this.nodes[n+1].x, (p+1)/10)+","+
        //         lerp(this.nodes[n].y, this.nodes[n+1].y, (p+1)/10));
        
        this.points.push(new pt( lerp(this.nodes[n].x, this.nodes[n+1].x, (p+1)/incr),
                                 lerp(this.nodes[n].y, this.nodes[n+1].y, (p+1)/incr),0));

      }
    }

  };
  Packet.prototype.draw=function(){

    if(this.p<this.points.length-1){

      var x=0;
      var y=0;
      
      strokeWeight(2);
      stroke(128,174,97);
      noFill();
  
      // beginShape();
  
      //   for(var n in this.nodes){
  
      //     // if(this.path[n]===0){ x+=incr;  }
      //     // else                { y+=incr;  }
  
      //     vertex(this.nodes[n].x, this.nodes[n].y);
  
      //   }
  
      // endShape();
  
      textSize(20);
      textAlign(LEFT,CENTER);
      fill(CLRS.YELLOW);
  
      text(this.path, 30,30);

      fill(CLRS.RED);
      noStroke();

      ellipse(this.points[this.p].x, this.points[this.p].y, 15, 15);

      this.p++;

    }
    else{
      app.packets.splice(0,1);
    }

  };
  Packet.prototype.clicked=function(){

    if(app.current===COMMANDS.SELECT[0]){

      if(this.hit){
        this.selected=!this.selected;
        for(var n in this.vertices){ this.vertices[n].selected=this.selected; }
      }

    }

  };
  Packet.prototype.moved=function(x,y){};
  Packet.prototype.dragged=function(){

    for(var n in this.vertices){

      if(this.hitP[n] && app.left){
        this.vertices[n].x=app.mouseX;
        this.vertices[n].y=app.mouseY;
        this.recalc();
      }

    }

  };


  var sendPacket=function(){
    
    app.packets.push(new packet(0,0));

  };

  // Print Arrays ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var printArray1D=function(arr){

    println(arr);

  };
  var printArray2D=function(arr){

    for(var n=0; n<arr.length; n++){
      println(arr[n]);
    }

  };

  var incr=app.width/(app.gridSize+1);

  var currentP=new pt(0,0);
  var currentX=0;
  var currentY=0;

  var complete=false;

  var traverse=function(NODE){

    strokeWeight(10);
    stroke(CLRS.BLACK);

    line(NODE.x,NODE.y,endNode.x,endNode.y);
    
    for(var n=0; n<NODE.connections.length; n++){

      if(dist(NODE.connections[n].x,    NODE.connections[n].y,
              endNode.connections[n].x, endNode.connections[n].y)<
         dist(NODE.x, NODE.y,
              endNode.connections[n].x, endNode.connections[n].y)){

        NODE.connections[n].active=false;

        if(NODE.connections[n]===endNode){ exit();                         }
        else                             { traverse(NODE.connections[n]);  }

      }

    }

  };

  var reset=function(){

    arrGrid=[];
    arrPath=[];

    // sz=9;
    incr=app.width/(app.gridSize+1);

    for(var n=0; n<sz; n++){
      arrPath.push(0);
    }

    // loadGrid();

    calculatePath();

  };

  var loadGrid=function(arr){

    var arrRow=[];
    var routes;
    var row=0;
    var col=0;
    
    for(row=0; row<app.gridSize; row++){
      for(col=0; col<app.gridSize; col++){

        if(col>0 && row>0){ routes=arrRow[col-1].routes + app.nodes[row-1][col].routes; }
        else              { routes=1;                                     }

        arrRow.push(new Node(row+":"+col, row*incr+incr, col*incr+incr, routes));

      }

      app.nodes.push(arrRow);
      arrRow=[];

    }
    
    for(row=0; row<app.nodes.length; row++){
      for(col=0; col<app.nodes.length; col++){
        app.nodes[row][col].load();
      }
    }

// println(app.nodes.length);

  };
  
  var drawGrid=function(){

    pushMatrix();
    
      translate(app.width/2,app.height/2);
      
      noStroke();
      fill(20,20,20,210);
      rectMode(CENTER);
      rect(0,0,app.width,app.height);
    
    popMatrix();

    for(var row in app.nodes){
      for(var col in app.nodes[row]){
       app.nodes[row][col].draw(mouseX,mouseY);
      }
    }

    for(var n in app.packets){ app.packets[n].draw(mouseX,mouseY); }

  };
  
  var drawGUI=function(){
    
    fill(245,179,69);
    stroke(255,255,255,90);
    strokeWeight(5);
    
    rect(incr/2, incr/2, app.width-incr, app.width-incr);

  };

  angleMode="radians";
  frameRate(0);

  var data=[];
  var r=2.5;
  var d=48;
  
  var position=data.length;
  
  var loadData=function(){
  
    data=[];

    for(var theta=0; theta<PI*d; theta+=PI/18){

      data.push(new pt( r*(cos(theta)+theta*sin(theta)),
                        r*(sin(theta)-theta*cos(theta)),
                        round(random(0,1)))
               );
    }

  };
  var addBit=function(arr){
      
    for(var n=0; n<arr.length-1; n++){
      arr[n].value=arr[n+1].value;
    }

    arr[arr.length-1].value=round(random(0,1));
    
  };

  var involute=function(){

    if(frameCount%6===0){

      pushMatrix();

        rectMode(CENTER);

        background(CLRS.BLACK);

        translate(app.width/2,app.height/2);

        var tSize=3;
        var clr=128;
        var transp=200;

        textSize(tSize);
        textAlign(CENTER,CENTER);
        
          for(var n=0; n<data.length; n++){
            
            clr=n/data.length*192/255*255;
            
            if(data[n].value===1){
                
              noStroke();
              fill(0,clr,0,transp);
              
              if(n===position){ fill(196, 186, 0,transp); }

              rect(data[n].x, data[n].y,tSize*0.15,tSize*0.9);

            }
            else{

              noFill();
              strokeWeight(2);
              stroke(0,clr,0,transp);
              if(n===position){ stroke(196, 186, 0,transp); }
              ellipse(data[n].x, data[n].y,tSize*0.75,tSize*0.9);

            }
  
            tSize*=1.003;
            
          }
          
      popMatrix();

      if(app.vortex==1){
        
        frameRate(60);
        
        addBit(data);
        
        if(position===0){ position=data.length-1;   }
        else            { position--;               }
        
      }
      else{

        frameRate(0);

        drawGrid();
        
      }

    }

  };

  loadGrid();

  var main=function(){

    // app.command=c;

    // background(CLRS.ORANGE);

    // if(n<100){ n++; }

    // app.frameRate=frameCount;

    // for(var c in app.ctrls){ app.ctrls[c].draw(); }

    // text(modelX(app.mouseX,app.mouseY,0), 100, 400);

    // if(app.currentCommand!==currentCommand){
    //   setCurrentCommand();
    // }

    // telemetry();

    // p(currentCommand);

    drawGUI();
    // calculatePath();
    
    drawGrid();

    // for(var n in app.nodes){ app.nodes[n].draw(mouseX,mouseY); }

    for(var n in app.packets){ app.packets[n].draw(mouseX,mouseY); }

  };

  // translate(0.5,0.5);



  var draw=function(){ process(); };

  // Events ===========================================================

  var disableNode=function(NODE){

    if(NODE.connections.length===0){ exit(); }

    var min=dist(NODE.connections[0].x, NODE.connections[0].y, endNode.x,endNode.y);
    var distance=min;
    var index=0;
    
    for(var n=0; n<NODE.connections.length; n++){

      NODE.connections[n].active=false;
      
      distance=dist(NODE.connections[n].x,NODE.connections[n].y,endNode.x,endNode.y);
      
      if(distance<min){
        
        min=distance;
        index=n;

      }

    }
    
    disableNode(NODE.connections[index]);
    
  };

  var addPackets=function(){

    for(var n=0; n<75; n++){

      if(frameCount%n==0){
        app.packets.push(new Packet(n,n));
      }
      
    }

    println(app.packets.length);

  };

  // Mouse ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var mouseClicked=function(){

    // app.vortex*=-1;
    app.vortex=-1;
// println(app.vortex);
    // reset();

    // switch(mouseButton){

    //   case LEFT:    for(var n in app.nodes){ app.nodes[n].clicked(); }  break;
    //   case RIGHT:   for(var n in app.nodes){ app.nodes[n].clickedR(); }  break;
    // //   case CENTER:  // for(var c in app.ctrls){ app.ctrls[c].clicked() }  break;

    //   default:      break;

    // }

    // if(app.keys[KEYCODES.CONTROL]==true){



    // }

    // process();

    // endNode.active=false;
    
    // traverse(app.nodes[0]);

    // disableNode(app.nodes[0]);

  };
  var mouseMoved=function(){

    app.mouseX=mouseX;
    app.mouseY=mouseY;
    
    for(var row in app.nodes){
      for(var col in app.nodes[row]){
       app.nodes[row][col].moved(mouseX,mouseY);
      }
    }

    // process();

  };
  var mouseDragged=function(){

    // app.left=true;
    app.mouseX=mouseX;
    app.mouseY=mouseY;
    
    for(var row in app.nodes){
      for(var col in app.nodes[row]){
       app.nodes[row][col].dragged(mouseX,mouseY);
      }
    }

    // process();

  };
  var mousePressed=function(){

    // mStartX=mouseX;
    // mStartY=mouseY;
    
    switch(mouseButton){

      case LEFT:    app.left=true;    break;
      case CENTER:  app.center=true;  break;
      case RIGHT:   app.right=true;   break;

      default:                        break;

    }

    for(var row in app.nodes){
      for(var col in app.nodes[row]){
       app.nodes[row][col].pressed(mouseX,mouseY);
      }
    }
    // process();

  };
  var mouseReleased=function(){

    // mStartX=0;
    // mStartY=0;

    app.left=false;
    app.center=false;
    app.right=false;

    for(var row in app.nodes){
      for(var col in app.nodes[row]){
       app.nodes[row][col].released(mouseX,mouseY);
      }
    }
    
    addPackets();
          
    // process();

  };
  var mouseOut=function(){

    for(var c in app.ctrls){ app.ctrls[c].out(); }
    
    // process();

  };
  var mouseOver=function(){

    for(var c in app.ctrls){ app.ctrls[c].over(); }
    
    // process();

  };
  var mouseWheel=function(){

    p("scroll");

  };

  // Keys ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

    for(var c in app.ctrls){ app.ctrls[c].typed(); }

  };

  // Initialize =======================================================
  var addControls=function(){

    // var ctrls=[];

    // var cn=new grid(
    //         new propC("grid", 0, 0, 0, app.width, app.height, 0, ARROW, false, COMMANDS.UNDEF[0], 0),
    //         new propL(CLRS.GRID, getColor(CLRS.GRID,65), CLRS.WHITE, CLRS.YELLOW, 0, 0),
    //         new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    // cn.ctrls=ctrls;
    
    // app.ctrls.push(cn);

  };

  var printCommands=function(){

    // saveStrings('Rectangle', COMMANDS.DEBUG);

    // <?xml version='1.0'?>
    // <CATALOG>

      // <COMMAND>
        // <NAME>Empire Burlesque</NAME>
        // <KEYCODE>Bob Dylan</KEYCODE>
        // <INDEX>USA</INDEX>
        // <ENGLISH>Columbia</ENGLISH>
        // <SPANISH>10.90</SPANISH>
      // </COMMAND>

    // </CATALOG>

    p("<?xml version='1.0'?>");
    p("<COMMANDS>");
    
    for(var n=150; n<arrCOMMANDS.length; n++){
      p("  <COMMAND>"                                       );
      p("    <INDEX>"   + arrCOMMANDS[n][0] + "</INDEX>"    );
      p("    <KEYCODE>" + arrCOMMANDS[n][1] + "</KEYCODE>"  );
      p("    <ICON>"    + arrCOMMANDS[n][3] + "</ICON>"     );
      p("    <ENGLISH>" + arrCOMMANDS[n][2] + "</ENGLISH>"  );
      p("    <SPANISH>" + arrCOMMANDS[n][3] + "</SPANISH>"  );
      p("  </COMMAND>"                                      );
    }

    p("</COMMANDS>");

  };

  var initialize=function(){

    // strokeJoin(ROUND);

    // loadCommands();

    // size(app.width, app.height,1);

    // if(app.debug) { app.frameRate=62; }
    // else          { app.frameRate=32;  }

    // frameRate(app.frameRate);

    // app.dwg=new drawing();

    // addControls();

    // process=main;

    loadData();
    process=involute;

    // htmlInit();

  //var fontList = PFont.list();
  // p(fontList);
  // printCommands();
  
    // loadGrid();
    // reset();
    
    // endNode=app.nodes[app.nodes.length-1];
        
  };

  initialize();

  // process();

  var clickMe=function(p){
    
    if(p===1){
      // p(1);
      // document.getElementById('menu').style.border="1px solid red";
      // document.getElementById("origin").checked=true;
      app.origin=false;
    }
    else{
      // p(2);
      // document.getElementById('menu').style.border="1px solid transparent";
      // document.getElementById("origin").checked=false;
      app.origin=true;
    }

  };


}};
