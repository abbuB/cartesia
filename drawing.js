var proc = function(processingInstance){ with (processingInstance){

  //~ size(screen.width, screen.height-200);  //~ set size of canvas

  /**

    TO DO:
      - ...


  **/



  var CLRS={

    WHITE_:   color(255,255,255),     BLACK_:   color(0,0,0),
    RED:      color(170,29,29),       GREEN:    color(158,182,58),
    BLUE:     color(29,86,170),       YELLOW:   color(238,214,15),
    ORANGE:   color(238,136,15),      Gray:     color(128,128,128),

    BROWN:    color(155,145,135),

    control:  color(128,128,128),     controlF: color(242,242,242),

    TEXT:     color(255,255,255)

  };

  var MODES={
    SAMPLE:     0,
    MANUAL:     1
  };
  var STYLES={
    BACKGROUND: 0,
    CONTAINER:  1,
    BUTTON:     2,
    TEXT:       3,
    TITLE:      4,
    TEXTCENTER: 5,
    SPACER:     6
  };
  var LINETYPES={
    HAIRLINE: 0,
    SOLID:    1,
    DASHED:   2,
    DOTTED:   3,
    DASHDOT:  4
  };

  var CMDS={

    //~ General ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CARTESIA:     [1,   'Cartesia',       'CARTESIA'        ],

    UNDEFINED:    [0,   'undefined',      'UNDEFINED'       ],

    CONTAINER:    [1,   'Container',      'CONTAINER'       ],
    HEADER:       [1,   'Header',         'HEADER'          ],
    FOOTER:       [1,   'Footer',         'FOOTER'          ],
    TELEMETRY:    [1,   'Telemetry',      'TELEMETRY'       ],

    //~ Misc ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    SNAPTOGRID:   [1,   'SnapToGrid',     'SNAPTOGRID'      ],
    ORTHO:        [1,   'Ortho',          'ORTHO'           ],
    COORDINATES:  [1,   'Coordinates',    'COORDINATES'     ],

    //~ File ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    NEW:          [1,   'New',            'NEW'             ],
    OPEN:         [1,   'Open',           'OPEN'            ],
    SAVE:         [1,   'Save',           'SAVE'            ],
    SAVEAS:       [1,   'Save As',        'SAVEAS'          ],

    CLOSE:        [1,   'Close',          'CLOSE'           ],

    //~ Edit ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    UNDO:         [1,   'Undo',           'UNDO'            ],
    REDO:         [1,   'Redo',           'REDO'            ],
    COPY:         [1,   'Copy',           'COPY'            ],
    CUT:          [1,   'Cut',            'CUT'             ],

    PASTE:        [1,   'Paste',          'PASTE'           ],
    EDIT:         [1,   'Edit',           'EDIT'            ],
    DELETE:       [1,   'Delete',         'DELETE'          ],

    //~ Transform ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    TRANSLATE:    [1,   'Translate',      'TRANSLATE'       ],
    REFLECT:      [1,   'Reflect',        'REFLECT'         ],
    ROTATE:       [1,   'Rotate',         'ROTATE'          ],
    SCALE:        [1,   'Scale',          'SCALE'           ],
    SHEAR:        [1,   'Shear',          'SHEAR'           ],

    //~ Measure ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    DISTANCE:     [1,   'Distance',       'DISTANCE'        ],
    PERIMETER:    [1,   'Perimeter',      'PERIMETER'       ],
    AREA:         [1,   'Area',           'AREA'            ],
    VOLUMEN:      [1,   'Volume',         'VOLUME'          ],
    RADIUS:       [1,   'Radius',         'RADIUS'          ],
    DIAMETER:     [1,   'Diamter',        'DIAMETER'        ],

    //~ Layers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    LAYER:        [1,   'Layer',          'LAYER'           ],
    FORWARD:      [1,   'Forward',        'FORWARD'         ],
    BACK:         [1,   'Back',           'BACK'            ],

    //~ Properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    PROPERTIES:   [2,   'Properties',     'PROPERTIES'      ],

    MATCH:        [2,   'Match',          'MATCH'           ],

    NAME:         [2,   'Name',           'NAME'            ],
    CAPTION:      [2,   'Caption',        'CAPTION'         ],

    COLOR:        [2,   'Color',          'COLOR'           ],
    LAYER:        [2,   'Layer',          'LAYER'           ],
    LINETYPE:     [2,   'Line Type',      'LINE TYPE'       ],
    LINEWEIGHT:   [2,   'Line Weight',    'LINE WEIGHT'     ],

    TOOLTIP:      [2,   'ToolTip',        'TOOLTIP'         ],
    FORMULA:      [2,   'Formula',        'FORMULA'         ],

    DEBUG:        [2,   'Debug',          'DEBUG'           ],
    WIDTH:        [3,   'Width',          'Width'           ],
    HEIGHT:       [4,   'Height',         'HEIGHT'          ],
    FRAMERATEA:   [5,   'FrameRate(A)',   'FRAMERATE(A)'    ],
    FRAMERATE:    [6,   'FrameRate',      'FRAMERATE'       ],
    MOUSEX:       [7,   'MouseX',         'MOUSEX'          ],
    MOUSEY:       [8,   'MouseY',         'MOUSEY'          ],
    PRESSED:      [9,   'Pressed',        'PRESSED'         ],

    RECTANGLE:    [111, 'Rectangle',      'RECTANGLE'       ],
    CIRCLE:       [11,  'Circle',         'CIRCLE'          ]

  }

  var app={

    width:        screen.width-20,
    height:       screen.height-200,

    debug:        true,
    frameRate:    30,

    mouseX:       1000,
    mouseY:       20,

    pressed:      false,

    keys:         [],
    drawings:     [],

    dwg:          undefined,

    //~ properties
    color:        CLRS.RED,
    layer:        8,
    linetype:     LINETYPES.HAIRLINE,
    lineweight:   7

  };

  //~ Methods ==========================================================
  var getGUID=function(){

      return year()   + ''  +
             month()  + ''  +
             day()    + ''  +
             hour()   + ''  +
             minute() + ''  +
             second() + ''  +
             millis() + ''  +
             round(random(10e15));
  };
  var getWidth=function()       { return app.width;           }
  var getHeight=function()      { return app.height;          }
  var getFrameRate=function()   { return app.frameRate;       }
  var getFrameRateA=function()  { return __frameRate          }   //~ apparent frameRate
  var getMouseX=function()      { return app.mouseX;          }
  var getMouseY=function()      { return app.mouseY;          }
  var getPressed=function()     { return app.pressed;         }
  var getDebug=function()       { return app.debug;           }
  var getColor=function()       { return app.color;           }
  var getLayer=function()       { return app.layer;           }
  var getLineType=function()    { return app.linetype;        }
  var getLineWeight=function()  { return app.lineweight;      }

  var getColor=function(clr,alpha){

    return color(red(clr), green(clr), blue(clr), alpha/100*255);

  };

  var rec=function(x,y,w,h,r){

    beginShape();
      vertex(x,y);
      vertex(x+w,y);
      vertex(x+w,y+h);
      vertex(x,y+h);
    endShape(CLOSE);

  };


  //~ Commands ===========================================================
  var commands=function(c){

    println(c);

    switch(c){

      case CMDS.RECTANGLE:  println("COMMAND: rectangle");  break;

      default:  break;

    }

  };

  var drawing=function(){

    this.guid=getGUID();
    this.ctrls=[];

    this.color=CLRS.RED;
    this.layer=11;
    this.linetype=LINETYPES.HAIRLINE;
    this.lineweight=7;

  };

  //~ Properties =======================================================
  var propC=function(i,p,x,y,w,h,r,v,c,g){

    this.i=i;     //~ guid
    this.p=p;     //~ parent

    this.x=x;     //~ left
    this.y=y;     //~ top
    this.w=w;     //~ width
    this.h=h;     //~ height
    this.r=r;     //~ radius

    this.v=v;     //~ value
    this.c=c;     //~ command
    this.g=g;     //~ tag

  };
  var propL=function(fill,fillH,stroke,strokeH,weight,weightH){

    this.fill=fill;         //~ fill color
    this.fillH=fillH;       //~ fill color highlight

    this.stroke=stroke;     //~ stroke color
    this.strokeH=strokeH;   //~ stroke color highlight

    this.weight=weight;     //~ strokeWeight
    this.weightH=weightH;   //~ strokeWeight highlight

  };
  var propA=function(fill, fillH, alignX, alignY, size, sizeH){

    this.fill=fill;         //~ text color
    this.fillH=fillH;       //~ text color highlight
    this.alignX=alignX;     //~ horizontal alignment
    this.alignY=alignY;     //~ vertical alignment
    this.size=size;         //~ text size
    this.sizeH=sizeH;       //~ text size highlight

  };

  //~ Controls =========================================================
  var control=function(cp,lp,ap,ctrls){


    //~ controls properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.i=cp.i;                //~ guid
    this.parent=cp.p;           //~ parent

    this.x=cp.x;                //~ left
    this.y=cp.y;                //~ top
    this.w=cp.w;                //~ width
    this.h=cp.h;                //~ height
    this.r=cp.r;                //~ corner radius

    this.v=cp.v;                //~ value
    this.c=cp.c;                //~ command
    this.g=cp.g;                //~ tag


    //~ appearance properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.fill=lp.fill;          //~ fill color
    this.fillH=lp.fillH;        //~ fill color highlight
    this.stroke=lp.stroke;      //~ stroke color
    this.strokeH=lp.strokeH;    //~ stroke color highlight

    this.weight=lp.weight;      //~ strokeWeight
    this.weightH=lp.weightH;    //~ strokeWeight highlight


    //~ text properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.text=ap.text;          //~ text caption

    this.tfill=ap.fill;         //~ text color
    this.tfillH=ap.fillH;       //~ text color highlight
    this.alignX=ap.alignX;      //~ horizontal alignment
    this.alignY=ap.alignY;      //~ vertical alignment
    this.size=ap.size;          //~ text size
    this.sizeH=ap.sizeH;        //~ text size highlight

    //~ misc properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.hit=false;             //~ mouse is over the control

    this.ctrls=ctrls;           //~ array of child controls

  };
  control.prototype.draw=function(){
    for(var c in this.ctrls){ this.ctrls[c].draw() }
  };
  control.prototype.clicked=function(){
    if(this.hit){
      commands(this.c);
      for(var c in this.ctrls){ this.ctrls[c].clicked() }
    }
  };
  control.prototype.moved=function(x,y){

    if(this.alignX===LEFT){

      if(mouseX>x+this.x && mouseX<x+this.x+this.w &&
         mouseY>y+this.y && mouseY<y+this.y+this.h){
        this.hit=true;
        for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x,y+this.y) }
      }
      else{
        this.hit=false;
      }

    }
    else if(this.alignX===CENTER){

      if(mouseX>x+this.x-this.w/2 && mouseX<x+this.x+this.w/2 &&
         mouseY>y+this.y && mouseY<y+this.y+this.h){
        this.hit=true;
        for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x,y+this.y) }
      }
      else{
        this.hit=false;
      }

    }
    else if(this.alignX===RIGHT){


    }
    else{

    }

  };
  control.prototype.pressed=function(){
    for(var c in this.ctrls){ this.ctrls[c].pressed() }
  };
  control.prototype.released=function(){
    for(var c in this.ctrls){ this.ctrls[c].released() }
  };
  control.prototype.over=function(){
    for(var c in this.ctrls){ this.ctrls[c].over() }
  };
  control.prototype.out=function(){
    this.hit=false;
    for(var c in this.ctrls){ this.ctrls[c].out() }
  };

  //~ Telemetry ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var telemetry=function(cp,lp,ap,ctrls){
    control.call(this,cp,lp,ap,ctrls);
  };
  telemetry.prototype=Object.create(control.prototype);
  telemetry.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x,p.y);

        pushStyle();

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){

            if(app.pressed){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);

          }

          rect(d,d,p.w,p.h);

          fill(p.tfill);

          if(p.hit){
            fill(p.tfillH);
          }

          textFont(createFont("monospace"));
          textAlign(p.alignX, p.alignY);
          textSize(p.size);
          var w=textWidth(p.g);

          if(p.hit){
            fill(p.tfillH);
            textSize(p.sizeH);
          }

          text(p.g, d+p.w/2, d+10);

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();

  };

  //~ Labels ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var label=function(cp,lp,ap,ctrls){
    control.call(this,cp,lp,ap,ctrls);
  };
  label.prototype=Object.create(control.prototype);
  label.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          textSize(p.size);
          p.w=textWidth(p.g);

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){

            if(app.pressed){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);

          }

          rect(d-p.w/2, d, p.w, p.h, p.r);

          fill(p.tfill);

          textAlign(p.alignX,p.alignY);
          textSize(p.size);

          if(p.hit){
            fill(p.tfillH);
            textSize(p.sizeH);
          }

          text(p.g, d+5, d+p.h/2);

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();

  };

  var labelC=function(cp,lp,ap,ctrls){
    control.call(this,cp,lp,ap,ctrls);
  };
  labelC.prototype=Object.create(control.prototype);
  labelC.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){

            if(app.pressed){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);

          }

          rect(d, d, p.w, p.h, p.r);

          fill(p.tfill);

          textAlign(p.alignX,p.alignY);
          textSize(p.size);

          if(p.hit){
            fill(p.tfillH);
            textSize(p.sizeH);
          }

          text(p.g, d+5, d+p.h/2);
          text(p.v(), d+100, d+p.h/2);

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();


  };

  var labelR=function(cp,lp,ap,ctrls){
    control.call(this,cp,lp,ap,ctrls);
  };
  labelR.prototype=Object.create(control.prototype);
  labelR.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){

            if(app.pressed){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);

          }

          rect(d-p.w/2, d-p.h/2, p.w, p.h, p.r);

          fill(getColor(CLRS.Gray,3));

          textAlign(p.alignX,p.alignY);
          textSize(300);

          if(p.hit){
            fill(p.tfillH);
            //~ textSize(200);
          }

					rotate(-PI/10);

          text(p.g, d+5, d);
          //~ text(p.v(), d+100, d+p.h/2);

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();


  };
  labelR.prototype.moved=function(x,y){

		if(mouseX>x+this.x-this.w/2 && mouseX<x+this.x+this.w/2 &&
			 mouseY>y+this.y-this.h/2 && mouseY<y+this.y+this.h/2){
			this.hit=true;
			for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x,y+this.y) }
		}
		else{
			this.hit=false;
		}

  };

  //~ Spacer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var spacer=function(cp,lp,ap,ctrls){
    control.call(this,cp,lp,ap,ctrls);
  };
  spacer.prototype=Object.create(control.prototype);
  spacer.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){

            if(app.pressed){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);

          }

          rect(d, d, p.w, p.weight, p.r);

          fill(p.tfill);

          textAlign(p.alignX,p.alignY);
          textSize(p.size);

          if(p.hit){
            fill(p.tfillH);
            textSize(p.sizeH);
          }

          //~ text(p.g, d+5, d+p.h/2);
          //~ text(p.v(), d+100, d+p.h/2);

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();


  };


  //~ Container ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var container=function(cp,lp,ap,ctrls){
    control.call(this,cp,lp,ap,ctrls);
  };
  container.prototype=Object.create(control.prototype);
  container.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

				

        pushStyle();

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){
            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
          }

          rect(d, d, p.w, p.h, p.r);

          fill(p.tfill);

          if(p.hit){
						fill(p.tfillH);
          }

          textAlign(p.alignX,p.alignY);

          //~ text(p.g, p.w/2, p.h/2);

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();


  };

  var n=100;

  var process;

  var main=function(){

    background(getColor(CLRS.BLACK,n));

    if(n<100){ n++; }

    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].draw() }

		fill(CLRS.BLACK_);
		stroke(CLRS.WHITE_);
		strokeWeight(0.25);

		beginShape();
			vertex(295, 95);
			vertex(420, 95);
			vertex(420, 260);
			vertex(295, 260);
		endShape(CLOSE);

		//~ rect(295,95,245,45);
		
    //~ Colors

    var sz=15;
		var w=125;
		var h=145;

		var row0=100;
		var row1=120;
		var row2=140;
		var row3=160;
		var row4=180;
		var row5=200;
		var row6=220;
		var row7=240;

		var col0=300;
		var col1=320;
		var col2=340;
		var col3=360;
		var col4=380;
		var col5=400;

    var Red=color(255,0,0);
    var RedOrange=color(255,81,0);
    var Orange=color(255,127,0);
    var YellowOrange=color(255,190,0);
    var Yellow=color(255,255,0);
    var YellowGreen=color(192,255,0);
    var Green=color(0,255,0);
    var BlueGreen=color(0,127,127);
    var Blue=color(0,0,255);
    var BlueViolet=color(92,0,255);
    var Violet=color(127,0,255);
    var RedViolet=color(191,0,127);

		var incr=256/11;

    var White=color(255,255,255);
		var Gray1=color(incr*10);
		var Gray2=color(incr*9);
		var Gray3=color(incr*8);
		var Gray4=color(incr*7);
		var Gray5=color(incr*6);
		var Gray6=color(incr*5);
		var Gray7=color(incr*4);
		var Gray8=color(incr*3);
		var Gray9=color(incr*2);
		var Gray10=color(incr*1);
    var Black=color(0,0,0);

    //~ Red
    fill(Red);
    rect(col0,row0,sz,sz);

    //~ RedOrange
    fill(RedOrange);
    rect(col1,row0,sz,sz);

    //~ Orange
    fill(Orange);
    rect(col2,row0,sz,sz);

    //~ YellowOrange
    fill(YellowOrange);
    rect(col3,row0,sz,sz);

    //~ Yellow
    fill(Yellow);
    rect(col4,row0,sz,sz);

    //~ YellowGreen
    fill(YellowGreen);
    rect(col5,row0,sz,sz);




    //~ Green
    fill(Green);
    rect(col0,row1,sz,sz);

    //~ BlueGreen
    fill(BlueGreen);
    rect(col1,row1,sz,sz);

    //~ Blue
    fill(Blue);
    rect(col2,row1,sz,sz);

    //~ BlueViolet
    fill(BlueViolet);
    rect(col3,row1,sz,sz);

    //~ Violet
    fill(Violet);
    rect(col4,row1,sz,sz);

    //~ RedViolet
    fill(RedViolet);
    rect(col5,row1,sz,sz);




    //~ White
    fill(White);
    rect(col0,row2,sz,sz);

    //~ Gray1
    fill(Gray1);
    rect(col1,row2,sz,sz);

    //~ Gray2
    fill(Gray2);
    rect(col2,row2,sz,sz);

    //~ Gray3
    fill(Gray3);
    rect(col3,row2,sz,sz);

    //~ Gray4
    fill(Gray4);
    rect(col4,row2,sz,sz);

    //~ Gray5
    fill(Gray5);
    rect(col5,row2,sz,sz);




    //~ Gray6
    fill(Gray6);
    rect(col0,row3,sz,sz);

    //~ Gray7
    fill(Gray7);
    rect(col1,row3,sz,sz);

    //~ Gray8
    fill(Gray8);
    rect(col2,row3,sz,sz);

    //~ Gray9
    fill(Gray9);
    rect(col3,row3,sz,sz);

    //~ Gray10
    fill(Gray10);
    rect(col4,row3,sz,sz);

    //~ White
    fill(Black);
    rect(col5,row3,sz,sz);
		
		//~ sliders (red,green,blue,alpha)
		fill(CLRS.RED);
		rect(col0,row4,w-10,sz);

		fill(CLRS.GREEN);
		rect(col0,row5,w-10,sz);
		
		fill(CLRS.BLUE);
		rect(col0,row6,w-10,sz);

		fill(CLRS.GRAY);
		rect(col0,row7,w-10,sz);
		
  };

  //~ translate(0.5,0.5);

  var draw=function(){ process(); };

  //~ Events ===========================================================
  var mouseClicked=function(){
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].clicked() }
  };
  var mouseMoved=function(){
    app.mouseX=mouseX;
    app.mouseY=mouseY;
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].moved(0,0) }
  };
  var mousePressed=function(){
    app.pressed=true;
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].pressed() }
  };
  var mouseReleased=function(){
    app.pressed=false;
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].released() }
  };
  var mouseOut=function(){
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].out() }
  };
  var mouseOver=function(){
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].over() }
  };

  var keyPressed=function(){
    app.keys[keyCode]=true;
    println(app.keys);
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].keyPressed() }
  };
  var keyReleased=function(){
    app.keys[keyCode]=false;
    println(app.keys);
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].keyReleased() }
  };
  var keyTyped=function(){
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].typed() }
  };

  //~ Load Controls ====================================================
  var getStyle=function(s){

      var style;

      switch(s){

        case STYLES.BACKGROUND:

          style=new propL(CLRS.BLACK_, CLRS.BLACK_, CLRS.BLUE, CLRS.Gray, 0.125, 0.25);
          break;

        case STYLES.CONTAINER:

          style=new propL(getColor(CLRS.BLUE,25), getColor(CLRS.BLUE,90), CLRS.BLUE, CLRS.Gray, 0.125, 0.25);
          break;

        case STYLES.BUTTON:

          style=new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.BLUE, CLRS.YELLOW, 0.125, 0.25);
          break;

        case STYLES.SPACER:

          style=new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE_, CLRS.YELLOW, 0.125, 0.25);
          break;

        case STYLES.TEXT:

          style=new propA(CLRS.WHITE_, CLRS.YELLOW, LEFT, CENTER, 10, 11);
          break;

        case STYLES.TEXTCENTER:

          style=new propA(CLRS.WHITE_, CLRS.YELLOW, CENTER, CENTER, 11, 12);
          break;

        case STYLES.TITLE:

          style=new propA(CLRS.WHITE_, CLRS.YELLOW, LEFT, CENTER, 12, 14);
          break;

        default:  break;

      }

    return style;

  };


  var getTelemetry=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;
    var l=parent.w-202;
    var ch=app.height-14;

    var cn=new container(
            new propC(getGUID(),parent, l, 2, 200, ch, 3, false, CMDS.CONTAINER[0],CMDS.CONTAINER[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    ctrls.push(new label(
                new propC(getGUID(),cn,cn.w/2,10,10,10,0,getDebug,CMDS.NAME[0],CMDS.TELEMETRY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new labelC(
                new propC(getGUID(),cn,5,top+0*h,10,10,0,getDebug,CMDS.UNDEFINED[0],CMDS.DEBUG[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelC(
                new propC(getGUID(),cn,5,top+1*h,10,10,0,getWidth,CMDS.UNDEFINED[0],CMDS.WIDTH[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelC(
                new propC(getGUID(),cn,5,top+3*h,10,10,0,getHeight,CMDS.UNDEFINED[0],CMDS.HEIGHT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelC(
                new propC(getGUID(),cn,5,top+4*h,10,10,0,getFrameRate,CMDS.UNDEFINED[0],CMDS.FRAMERATE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelC(
                new propC(getGUID(),cn,5,top+5*h,10,10,0,getFrameRateA,CMDS.UNDEFINED[0],CMDS.FRAMERATEA[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelC(
                new propC(getGUID(),cn,5,top+6*h,10,10,0,getMouseX,CMDS.UNDEFINED[0],CMDS.MOUSEX[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));


    ctrls.push(new labelC(
                new propC(getGUID(),cn,5,top+7*h,10,10,0,getMouseY,CMDS.UNDEFINED[0],CMDS.MOUSEY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));


    ctrls.push(new labelC(
                new propC(getGUID(),cn,5,top+8*h,10,10,0,getPressed,CMDS.UNDEFINED[0],CMDS.PRESSED[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));


    cn.ctrls=ctrls;

    return cn;

  };
  var getProperties=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;
    var l=2;
    var ch=app.height-14;

    var cn=new container(
            new propC(getGUID(),parent, l, 2, 200, ch, 3, false, CMDS.CONTAINER[0],CMDS.CONTAINER[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ NAME
    //~ CAPTION
    //~
    //~ COLOR
    //~ LAYER
    //~ LINETYPE
    //~ LINEWEIGHT

    ctrls.push(new label(
                new propC(getGUID(),cn,cn.w/2,10,10,10,0,getDebug,CMDS.NAME[0],CMDS.PROPERTIES[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new labelC(
                new propC(getGUID(),cn,l+5,top+0*h,10,10,0,getDebug,CMDS.NAME[0],CMDS.NAME[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelC(
                new propC(getGUID(),cn,l+5,top+1*h,10,10,0,getDebug,CMDS.CAPTION[0],CMDS.CAPTION[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelC(
                new propC(getGUID(),cn,l+5,top+2*h,10,10,0,getDebug,CMDS.FORMULA[0],CMDS.FORMULA[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new spacer(
                new propC(getGUID(),cn,l+5,top+3*h+5,150,10,0,getDebug,CMDS.NAME[0],CMDS.NAME[1]),
                getStyle(STYLES.SPACER),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelC(
                new propC(getGUID(),cn,l+5,top+4*h,10,10,0,getColor,CMDS.UNDEFINED[0],CMDS.COLOR[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelC(
                new propC(getGUID(),cn,l+5,top+5*h,10,10,0,getLayer,CMDS.UNDEFINED[0],CMDS.LAYER[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelC(
                new propC(getGUID(),cn,l+5,top+6*h,10,10,0,getLineType,CMDS.UNDEFINED[0],CMDS.LINETYPE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelC(
                new propC(getGUID(),cn,l+5,top+7*h,10,10,0,getLineWeight,CMDS.UNDEFINED[0],CMDS.LINEWEIGHT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getHeader=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;

    var cn=new container(
            new propC(getGUID(), parent, parent.w/2-400, -5, 800, 45, 5, false, CMDS.RECTANGLE[0], CMDS.HEADER[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    cn.ctrls=ctrls;

    return cn;

  };
  var getFooter=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;

    var cn=new container(
            new propC(getGUID(), parent, parent.w/2-300, app.height-40, 600, 35, 5, false, CMDS.RECTANGLE[0],CMDS.FOOTER[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TITLE));

    cn.ctrls=ctrls;

    return cn;

  };

  var addControls=function(){

    var ctrls=[];

    var cn=new container(
            new propC(getGUID(),0,5,5,app.width-10, app.height-10,2,false,CMDS.CONTAINER[0],CMDS.CONTAINER[1]),
            getStyle(STYLES.BACKGROUND),
            getStyle(STYLES.TEXT));

    ctrls.push(new labelR(
            new propC(getGUID(),cn,cn.w/2,cn.h/2,10,10,0,getDebug,CMDS.NAME[0],CMDS.CARTESIA[1]),
            getStyle(STYLES.BUTTON),
            getStyle(STYLES.TEXTCENTER)));

    ctrls.push(getHeader(cn));
    ctrls.push(getFooter(cn));
    ctrls.push(getProperties(cn));
    ctrls.push(getTelemetry(cn));

    cn.ctrls=ctrls;

    app.dwg.ctrls.push(cn);

  };

  var loadCommands=function(){

    saveStrings('Rectangle', CMDS.RECTANGLE);

    println(loadStrings("Rectangle"));

  };

  //~ Initialize =========================================================
  var initialize=function(){

    loadCommands();

    size(app.width,app.height);

    if(app.debug) { app.frameRate=31; }
    else          { app.frameRate=100;  }

    frameRate(app.frameRate);

    app.dwg=new drawing();

    addControls();

    process=main;

  };

  initialize();



    mouseX=100;
    mouseY=100;























}};
