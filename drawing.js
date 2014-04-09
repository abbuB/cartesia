var proc = function(processingInstance){ with (processingInstance){

  //~ size(screen.width, screen.height-200);  //~ set size of canvas

  /**

    TO DO:
      - ...


  **/



  var CLRS={

    WHITE:    color(255,255,255),     BLACK:    color(0,0,0),
    RED:      color(170,29,29),       GREEN:    color(158,182,58),
    BLUE:     color(29,86,170),       YELLOW:   color(238,214,15),
    ORANGE:   color(238,136,15),      GRAY:     color(128,128,128),

    BROWN:    color(155,145,135),

    //~ control:  color(128,128,128),     controlF: color(242,242,242),

    TEXT:     color(255,255,255),

    Red:      color(255,0,0),         RedOrange:    color(255,81,0),
    Orange:   color(255,127,0),       YellowOrange: color(255,190,0),
    Yellow:   color(255,255,0),       YellowGreen:  color(192,255,0),
    Green:    color(0,255,0),         BlueGreen:    color(0,127,127),
    Blue:     color(0,0,255),         BlueViolet:   color(92,0,255),
    Violet:   color(127,0,255),       RedViolet:    color(191,0,127),

    Gray1:    color(255*10/11),       Gray2:        color(255*9/11),
    Gray3:    color(255*8/11),        Gray4:        color(255*7/11),
    Gray5:    color(255*6/11),        Gray6:        color(255*5/11),
    Gray7:    color(255*4/11),        Gray8:        color(255*3/11),
    Gray9:    color(255*2/11),        Gray10:       color(255*1/11),
    White:    color(255,255,255),     Black:        color(0,0,0),

    BUTTONH:   color(16,16,16),       BUTTON:      color(24,24,24),

    GRID:     color(33,40,48)

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

    //~  Shapes ========================================================

    COMMAND:            [-1000,	'Command',		    'COMMAND'           ],
    
    //~ Point (PNT) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    
    PNT:								[	-100,	'Point',		      'POINT'             ],
    PNT_OBJECT:         [	-101,	'Object',		      'Object'	          ],
    PNT_INTERSECT:			[	-102,	'Intersect',		  'Interset'	        ],
    PNT_MIDPOINT:				[	-103,	'Midpoint',       'Midpoint'	        ],
    
    //~ POINTONOBJECT:						[	1,	'Pointonobject',		'POINTONOBJECT'	]
    //~ ATTACHDETACHPOINT:				[	1,	'Attachdetachpoint',		'ATTACHDETACHPOINT'	]
    //~ INTERSECT:								[	1,	'Intersect',		'INTERSECT'		]
    //~ MIDPOINTORCENTER:					[	1,	'Midpointorcenter',		'MIDPOINTORCENTER'	]

    //~ COMPLEXNUMBER:						[	1,	'Complexnumber',		'COMPLEXNUMBER'	]
    //~ LINE:											[	1,	'Line',		'LINE'	]
    //~ SEGMENT:									[	1,	'Segment',		'SEGMENT'	]
    //~ SEGMENTWITHGIVENLENGTH:		[	1,	'Segmentwithgivenline',		'SEGMENTWITHGIVENLINE'	]
    //~ RAY:											[	1,	'Ray',		'RAY'	]
    //~ POLYLINE:									[	1,	'Polyline',		'POLYLINE'	]
    //~ VECTOR:										[	1,	'Vector',		'VECTOR'	]
    //~ VECTORFROMPOINT:					[	1,	'Vectorfrompoint',		'VECTORFROMPOINT'	]
    //~ PERPENDICULARLINE:				[	1,	'Purpendicularline',		'PERPENDICULARLINE'	]
    //~ PARALLELLINE:							[	1,	'Parallelline',		'PARALLELLINE'	]
    //~ PERPENDICULARBISECTOR:		[	1,	'Perpendicularbisector',		'PERPENDICULARBISECTOR'	]
    //~ ANGLEBISECTOR:						[	1,	'Anglebisector',		'ANGLEBISECTOR'	]
    //~ TANGENTS:									[	1,	'Tangents',		'TANGENTS'	]
    //~ POLARORDIAMETERLINE:			[	1,	'Polarordiameterline',		'POLARORDIAMETERLINE'	]
    //~ BESTFITLINE:							[	1,	'Bestfitline',		'BESTFITLINE'	]
    //~ LOCUS:										    [	1,	'Locus',		'LOCUS'	]
    //~ POLYGON:									    [	1,	'Polygon',		'POLYGON'	]
    //~ REGULARPOLYGON:						    [	1,	'Regularpolygon',		'REGULARPOLYGIN'	]
    //~ RIGIDPOLYGON:							    [	1,	'Rigidpolygon',		'RIGIDPOLYGON'	]
    //~ VECTORPOLYGON:						    [	1,	'Vectorpolygon',		'VECTORPOLYGON'	]
    //~ CIRCLEWITHCENTERTHROUGHPOINT: [	1,	'Circlewithcenterthroughpoint',		'CIRCLEWITHCENTERTHROUGHPOINT']
    //~ CIRCLEWITHCENTERANDRADIUS:	[	1,	'Circlewithcenterandradius',		'CIRCLEWITHCENTERANDRADIUS'	]	
    //~ COMPASS:									  [	1,	'Compass',		'COMPASS'	]
    //~ CIRCLETHROUGH3POINTS:				[	1,	'Circlethrough3points',		'CIRCLETHROUGH3POINTS'	]
    //~ SEMICIRCLETHROUGH2POINTS:	  [	1,	'Semicirclethrough2points',		'SEMICIRCLETHROUGH2POINTS'	]
    //~ CIRCULARARC:							  [	1,	'Circulararc',		'CIRCULARARC'	]
    //~ CIRCUMCIRCULARARC:				  [	1,	'Circumcirculararc',		'CIRCUMCIRCULARARC'	]
    //~ CIRCULARSECTOR:							[	1,	'Circularsector',		'CIRCULARSECTOR'	]
    //~ CIRCUMCIRCULARSECTOR:				[	1,	'Circumcircularsector',		'CIRCUMCIRCULARSECTOR'	]
    //~ ELIPSE:										  [	1,	'Elipse',		'ELIPSE'	]
    //~ HYPERBOLA:									[	1,	'Hyperbola',		'HYPERBOLA'	]
    //~ PARABOLA:									  [	1,	'Parabola',		'PARABOLA'	]
    //~ CONICTHROUGH5POINTS:				[	1,	'Conicthrough5points',		'CONICTHROUGH5POINTS'	]
    //~ ANGLE:											[	1,	'Angle',		'ANGLE'	]
    //~ ANGLEWITHGIVENSIZE:				  [	1,	'Anglewithgivensize',		'ANGLEWITHGIVENSIZE'	]
    //~ DISTANCEORLENGTH:						[	1,	'Distanceorlength',		'DISTANCEORLENGTH'	]
    //~ AREA:												[	1,	'Area',		'AREA'	]
    //~ SLOPE:											[	1,	'Slope',		'SLOPE'	]
    //~ CREATELIST:									[	1,	'Createlist',		'CREATELIST'	]
    //~ REFLECTABOUTLINE:						[	1,	'Reflectaboutline',		'REFLECTABOUTLINE'	]
    //~ REFLECTABOUTPOINT:				  [	1,	'Reflectabouttpoint',		'REFLECTABOUTPOINT'	]
    //~ REFLECTABOUTCIRCLE:				  [	1,	'Reflectaboutcircle',		'REFLECTABOUTCIRCLE'	]
    //~ ROTATEAROUNDPOINT:				  [	1,	'Rotatearoundpoint',		'ROTATEAROUNDPOINT'	]
    //~ TRANSLATEBYVECTOR:				  [	1,	'Translatebyvector',		'TRANSLATEBYVECTOR'	]
    //~ DILATEFROMPOINT:						[	1,	'Dilatefrompoint',		'DILATEFROMPOINT'	]
    //~ TEXT:												[	1,	'Text',		'TEXT'	]
    //~ IMAGE:										  [	1,	'Image',		'IMAGE'	]
    //~ PEN:												[	1,	'Pen',		'PEN'	]
    //~ FREEHANDSHAPE:							[	1,	'Freehandshape',		'FREEHANDSHAPE'	]
    //~ RELATION:									  [	1,	'Relation',		'RELATION'	]
    //~ PROBABILITYCALCULATOR:			[	1,	'Probabilitycalculator',		'PROBABILITYCALCULATOR'	]
    //~ SLIDER:										  [	1,	'Slider',		'SLIDER'	]
    //~ BUTTON:										  [	1,	'Button',		'BUTTON'	]
    //~ INPUTBOX:									  [	1,	'Inputbox',		'INPUTBOX'	]
    //~ MOVEGRAPHICSVIEW:				    [	1,	'Movegraphicsview',		'MOVEGRAPHICSVIEW'	]
    //~ ZOOMIN:									    [	1,	'Zoomin',		'ZOOMIN'	]
    //~ ZOOMOUT:									  [	1,	'Zoomout',		'ZOOMOUT'	]
    //~ SHOWHIDEOBJECT:							[	1,	'Showhideobject',		'SHOWHIDEOBJECT'	]
    //~ SHOWHIDELABEL:							[	1,	'Showhidelabel',		'SHOWHIDELABEL'	]
    //~ COPYVISUALSTYLE:						[	1,	'Copyvisualstyle',		'COPYVISUALSTYLE'	]
    //~ DELETE:										  [	1,	'Delete',		'DELETE'	]

    FOCUS:        [-13,  'Focus',         'FOCUS'           ],
  
    LEFT:         [-12,  'Left button',   'LEFT'            ],
    CENTER:       [-11,  'Center button', 'CENTER'          ],
    RIGHT:        [-10,  'Right button',  'RIGHT'           ],

    SPACER:       [-1,  'Spacer',         'SPACER'          ],

    //~ General ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CARTESIA:     [1,   'Cartesia',       'CARTESIA'        ],

    UNDEF:        [0,   'undefined',      'UNDEFINED'       ],

    CONTAINER:    [1,   'Container',      'CONTAINER'       ],
    HEADER:       [2,   'Header',         'HEADER'          ],
    FOOTER:       [3,   'Footer',         'FOOTER'          ],
    TELEMETRY:    [4,   'Telemetry',      'TELEMETRY'       ],

    //~ Misc ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    SNAPTOGRID:   [5,   'SnapToGrid',     'SNAPTOGRID'      ],
    ORTHO:        [6,   'Ortho',          'ORTHO'           ],
    COORDINATES:  [7,   'Coordinates',    'COORDINATES'     ],
    COLORS:       [8,   'Colors',         'COLORS'          ],

    RED:          [9,   'Red',            'RED'             ],
    BLUE:         [10,  'Blue',         'BLUE'              ],
    GREEN:        [11,  'Green',          'GREEN'           ],

    //~ File ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    NEW:          [12,  'New',            'NEW'             ],
    OPEN:         [13,  'Open',           'OPEN'            ],
    SAVE:         [14,  'Save',           'SAVE'            ],
    SAVEAS:       [15,  'Save As',        'SAVEAS'          ],

    CLOSE:        [16,  'Close',          'CLOSE'           ],

    //~ Edit ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    UNDO:         [17,  'Undo',           'UNDO'            ],
    REDO:         [18,  'Redo',           'REDO'            ],
    COPY:         [19,  'Copy',           'COPY'            ],
    CUT:          [20,  'Cut',            'CUT'             ],

    PASTE:        [21,  'Paste',          'PASTE'           ],
    EDIT:         [22,  'Edit',           'EDIT'            ],
    DELETE:       [23,  'Delete',         'DELETE'          ],

    //~ Transform ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    TRANSLATE:    [24,  'Translate',      'TRANSLATE'       ],
    REFLECT:      [25,  'Reflect',        'REFLECT'         ],
    ROTATE:       [26,  'Rotate',         'ROTATE'          ],
    SCALE:        [27,  'Scale',          'SCALE'           ],
    SHEAR:        [28,  'Shear',          'SHEAR'           ],

    //~ Measure ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    DISTANCE:     [29,  'Distance',       'DISTANCE'        ],
    PERIMETER:    [30,  'Perimeter',      'PERIMETER'       ],
    AREA:         [31,  'Area',           'AREA'            ],
    VOLUMEN:      [32,  'Volume',         'VOLUME'          ],
    RADIUS:       [33,  'Radius',         'RADIUS'          ],
    DIAMETER:     [34,  'Diamter',        'DIAMETER'        ],

    //~ Layers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    LAYER:        [35,  'Layer',          'LAYER'           ],
    FORWARD:      [36,  'Forward',        'FORWARD'         ],
    BACK:         [37,  'Back',           'BACK'            ],

    //~ Properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    PROPERTIES:   [38,  'Properties',     'PROPERTIES'      ],

    MATCH:        [39,  'Match',          'MATCH'           ],

    NAME:         [40,  'Name',           'NAME'            ],
    CAPTION:      [41,  'Caption',        'CAPTION'         ],

    COLOR:        [42,  'Color',          'COLOR'           ],
    COLORG:       [60,  'ColorG',         'COLORG'          ],
    LAYER:        [43,  'Layer',          'LAYER'           ],
    LINETYPE:     [44,  'Line Type',      'LINE TYPE'       ],
    LINEWEIGHT:   [45,  'Line Weight',    'LINE WEIGHT'     ],

    TOOLTIP:      [46,  'ToolTip',        'TOOLTIP'         ],
    FORMULA:      [47,  'Formula',        'FORMULA'         ],

    DEBUG:        [48,  'Debug',          'DEBUG'           ],
    WIDTH:        [49,  'Width',          'Width'           ],
    HEIGHT:       [50,  'Height',         'HEIGHT'          ],
    FRAMERATEA:   [51,  'FrameRate(A)',   'FRAMERATE(A)'    ],
    FRAMERATE:    [52,  'FrameRate',      'FRAMERATE'       ],
    MOUSEX:       [53,  'MouseX',         'MOUSEX'          ],
    MOUSEY:       [54,  'MouseY',         'MOUSEY'          ],
    PRESSED:      [55,  'Pressed',        'PRESSED'         ],

    RECTANGLE:    [56,  'Rectangle',      'RECTANGLE'       ],
    CIRCLE:       [57,  'Circle',         'CIRCLE'          ],

    //~ Grid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    BORDER:       [100, 'Border',         'BORDER'          ],
    ORIGIN:       [101, 'Origin',         'ORIGIN'          ],

  }

  var app={

    width:          1350, //~screen.width,
    height:         550,  //~ screen.height,

    debug:          true,
    frameRate:      0,

    focus:          0,

    mouseX:         1000,
    mouseY:         20,

    //~ mousePressed:   0,

    left:           false,
    center:         false,
    right:          false,

    keys:           [],
    drawings:       [],

    dwg:            undefined,

    //~ properties
    red:            128,
    green:          127,
    blue:           126,

    caption:        'caption',
    name:           'name',
    formula:        'x^2+y^2=r^2',

    color:          CLRS.YELLOW,

    layer:          8,

    linetype:       LINETYPES.HAIRLINE,
    lineweight:     7,

    command:        0,

    border:         true,
    origin:         true,


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

  var getProp=function(p){

  //~ println(p);

    switch(p){

      case CMDS.COMMAND[0]:     return app.command;

      case CMDS.FOCUS[0]:       return app.focus;
      case CMDS.LEFT[0]:        return app.left;
      case CMDS.CENTER[0]:      return app.center;
      case CMDS.RIGHT[0]:       return app.right;
      case CMDS.CAPTION[0]:     return app.caption;
      case CMDS.NAME[0]:        return app.name;
      case CMDS.FORMULA[0]:     return app.formula;

      case CMDS.WIDTH[0]:       return app.width;
      case CMDS.HEIGHT[0]:      return app.height;
      case CMDS.FRAMERATE[0]:   return app.frameRate;
      case CMDS.FRAMERATEA[0]:  return __frameRate;
      case CMDS.MOUSEX[0]:      return app.mouseX;
      case CMDS.MOUSEY[0]:      return app.mouseY;
      case CMDS.PRESSED[0]:     return app.left;

      case CMDS.COLOR[0]:       return app.color;
      case CMDS.COLORG[0]:      return app.color;

      case CMDS.LAYER[0]:       return app.layer;
      case CMDS.LINETYPE[0]:    return app.linetype;
      case CMDS.LINEWEIGHT[0]:  return app.lineweight;

      case CMDS.DEBUG[0]:       return app.debug;

      case CMDS.RED[0]:         return app.red;
      case CMDS.GREEN[0]:       return app.green;
      case CMDS.BLUE[0]:        return app.blue;

    };

  };

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


  //~ Commands =========================================================
  var commands=function(c,p){

    //~ println(c+':'+p);

    switch(c){

    //~ Points ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      case CMDS.PNT[0]:							println('Point:');            break;
      case CMDS.PNT_OBJECT[0]:      println('Point: bound');      break;
      case CMDS.PNT_INTERSECT[0]:		println('Point: interset');   break;
      case CMDS.PNT_MIDPOINT[0]:    println('Point: midpoint');   break;

      case CMDS.ORIGIN[0]:          app.origin=p;                 break;
      case CMDS.BORDER[0]:         app.border=p;                 break;

      case CMDS.FRAMERATE[0]: frameRate(p);
                              app.frameRate=p;
                              break;

      case CMDS.DEBUG[0]:     app.debug=!app.debug;
                              if(app.debug){ frameRate(100); }
                              else         { frameRate(30);  }
                              break;

      case CMDS.COLORG[0]:    return app.color;

      case CMDS.COLOR[0]:     app.color=p;
                              app.red=red(app.color);
                              app.green=green(app.color);
                              app.blue=blue(app.color);
                              break;

      case CMDS.RECTANGLE[0]: println('Rectangle');         break;

      case CMDS.RED[0]:       app.red=red(app.color);       break;
      case CMDS.GREEN[0]:     app.green=green(app.color);   break;
      case CMDS.BLUE[0]:      app.blue=blue(app.color);     break;

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
      //~ app.focus=this.i;
      commands(this.c, this.v);
      for(var c in this.ctrls){ this.ctrls[c].clicked() }
    }
  };
  control.prototype.moved=function(x,y){

    if(this.alignX===LEFT){

      if(mouseX>x+this.x && mouseX<x+this.x+this.w &&
         mouseY>y+this.y && mouseY<y+this.y+this.h){
        this.hit=true;
        app.focus=this.i;
        for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x, y+this.y) }
      }
      else{
        this.hit=false;
      }

    }
    else if(this.alignX===CENTER){

      if(mouseX>=x+this.x-this.w/2 && mouseX<=x+this.x+this.w/2 &&
         mouseY>=y+this.y-this.h/2 && mouseY<=y+this.y+this.h/2){
        this.hit=true;
        app.focus=this.i;
        for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x,y+this.y) }
      }
      else{
        this.hit=false;
      }

    }
    else if(this.alignX===RIGHT){
      app.focus=this.i;
    }
    else{
      app.focus=this.i;
    }

  };
  control.prototype.dragged=function(){
    for(var c in this.ctrls){ this.ctrls[c].dragged() }
  };
  control.prototype.pressed=function(){
    for(var c in this.ctrls){ this.ctrls[c].pressed() }
  };
  control.prototype.released=function(){
    //~ this.hit=false;
    for(var c in this.ctrls){ this.ctrls[c].released() }
  };
  control.prototype.typed=function(){
    for(var c in this.ctrls){ this.ctrls[c].typed() }
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

            if(app.left){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);

          }

          rect(d,d,p.w,p.h);

          fill(p.tfill);

          if(p.hit){
            fill(p.tfillH);
          }

          textFont(createFont('monospace'));
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

  //~ Buttons ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var button=function(cp,lp,ap,ctrls){
    control.call(this,cp,lp,ap,ctrls);
  };
  button.prototype=Object.create(control.prototype);
  button.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){

            if(app.left){ d=1; }

            fill(p.g);
            stroke(p.strokeH);
            strokeWeight(p.weightH);

            cursor(HAND);

          }

          if(p.v){  fill(getProp(p.g)); }

          rect(d, d, p.w, p.h, p.r);

          fill(p.tfill);

          textAlign(p.alignX,p.alignY);
          textSize(p.size);

          if(p.hit){
            fill(p.v);
            textSize(p.sizeH);
          }

          text(p.g, d+5, d+p.h/2);

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();

  };
  button.prototype.clicked=function(){
    if(this.hit){
      commands(this.c, this.g);
      for(var c in this.ctrls){ this.ctrls[c].clicked() }
    }
  };

  //~ Color
  var buttonC=function(cp,lp,ap,ctrls){
    control.call(this,cp,lp,ap,ctrls);
  };
  buttonC.prototype=Object.create(control.prototype);
  buttonC.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){

            if(app.left){ d=1; }

            stroke(p.strokeH);
            strokeWeight(p.weightH);

            cursor(HAND);

          }

          rect(d, d, p.w, p.h, p.r);

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();

  };
  buttonC.prototype.clicked=function(){
    if(this.hit & app.left){
      commands(this.c, this.g);
      for(var c in this.ctrls){ this.ctrls[c].clicked() }
    }
  };

  //~ Return Property
  var buttonP=function(cp,lp,ap,ctrls){
    control.call(this,cp,lp,ap,ctrls);
  };
  buttonP.prototype=Object.create(control.prototype);
  buttonP.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          fill(getProp(p.g));
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){

            if(app.left){ d=1; }

            //~ fill(p.g);
            stroke(p.strokeH);
            strokeWeight(p.weightH);

            cursor(HAND);

          }

          rect(d, d, p.w, p.h, p.r);


        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();

  };
  buttonP.prototype.clicked=function(){
    if(this.hit){
      commands(this.c, this.g);
      for(var c in this.ctrls){ this.ctrls[c].clicked() }
    }
  };

  //~ Icon
  var buttonI=function(cp,lp,ap,ctrls){
    control.call(this,cp,lp,ap,ctrls);
  };
  buttonI.prototype=Object.create(control.prototype);
  buttonI.prototype.draw=function(){

    var p=this;
    var d=0;
    var cX=p.w/2;
    var cY=p.h/2;
    var cPNT=CLRS.YELLOW;
    var cVERTEX=CLRS.Gray5;
    var cLINE=CLRS.Blue;
    var cFILL=CLRS.Gray9;
    var sz=3;

    var drawPoint=function(){

      pushStyle();

        rectMode(CENTER);
        
        switch(p.c){

          case CMDS.PNT[0]:

            noFill();

            strokeWeight(0);
            noStroke();
            fill(cPNT);

            ellipse(d+cX, d+cY, sz, sz);  

            break;
            
          case CMDS.PNT_OBJECT[0]:

            fill(cFILL);          
            strokeWeight(0.5);
            stroke(cLINE);

            beginShape();          
              vertex(d+cX-10, d+cY-10);
              vertex(d+cX-10, d+cY+5)
              vertex(d+cX+10, d+cY+10);
              vertex(d+cX+4,  d+cY-6);
            endShape(CLOSE);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+cX, d+cY, sz, sz);

            noStroke();
            fill(cPNT);
            
            ellipse(d+cX-10, d+cY-10, sz, sz);
            ellipse(d+cX-10, d+cY+5,  sz, sz)
            ellipse(d+cX+10, d+cY+10, sz, sz);
            ellipse(d+cX+4,  d+cY-6,  sz, sz);
            
            break;

          case CMDS.PNT_INTERSECT[0]:

            noFill();
            strokeWeight(0.5);
            stroke(cLINE);

            line(d+cX-10, d+cY+10, d+cX+10, d+cY-10);
            line(d+cX+4,  d+cY+10, d+cX-4, d+cY-10);

            noStroke();
            strokeWeight(0.5);            
            fill(cPNT);

            ellipse(d+cX, d+cY, sz, sz);  

            break;

          case CMDS.PNT_MIDPOINT[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cLINE);

            line(d+cX-10, d+cY+10, d+cX+10, d+cY-10);
            
            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+cX, d+cY, sz, sz);  

            break;

          default:    break;

        }

      popStyle();

    };

    pushMatrix();

      translate(p.x, p.y);
  
        pushStyle();

          //~ rectMode(CENTER);          
          
          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){

            if(app.left){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);

            cursor(HAND);

          }

          if(p.v){  fill(getProp(p.g)); }

          rect(d, d, p.w, p.h, p.r);

          switch(p.c){

            case CMDS.PNT[0]:              case CMDS.PNT_OBJECT[0]:
            case CMDS.PNT_INTERSECT[0]:    case CMDS.PNT_MIDPOINT[0]:

            drawPoint();  break;

            default:      break;

          }
          
          fill(p.tfill);

          //~ textAlign(p.alignX,p.alignY);
          textAlign(CENTER,BOTTOM);
          //~ textSize(p.size);
          textSize(8);
          if(p.hit){
            fill(p.v);
            //~ textSize(p.sizeH);
          }

          //~ text(p.g, d+p.w/2, d+p.h);

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();

  };
  buttonI.prototype.clicked=function(){
    if(this.hit){
      //~ println(this.c, this.g);
      commands(this.c, this.g);
                  //~ println(p.parent.ctrls.length);
            
      this.parent.ctrls[0].c=this.c;
      this.parent.ctrls[0].g=this.g;

      app.command=this.c;

      for(var c in this.ctrls){ this.ctrls[c].clicked() }
    }
  };


  //~ Labels ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

            if(app.left){ d=1; }

            fill(CLRS.YELLOW);
            stroke(p.strokeH);
            strokeWeight(p.weightH);

          }

          //~ if(p.alignX===LEFT)       {  rect(d, d, p.w, p.h, p.r);      }
          //~ else if(p.alignX===CENTER){ rect(d-p.w/2, d, p.w, p.h, p.r); }

          fill(p.tfill);

          textAlign(p.alignX,p.alignY);
          textSize(p.size);

          if(p.hit){
            fill(p.tfillH);
            //~ textSize(p.sizeH);
          }

          text(p.g, d, d+p.h/2);

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();

  };

  //~ Return property
  var labelP=function(cp,lp,ap,ctrls){
    control.call(this,cp,lp,ap,ctrls);
  };
  labelP.prototype=Object.create(control.prototype);
  labelP.prototype.draw=function(){

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

            if(app.left){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);

          }

          //~ if(p.alignX===LEFT)       { rect(d, d, p.w, p.h, p.r);       }
          //~ else if(p.alignX===CENTER){ rect(d-p.w/2, d, p.w, p.h, p.r); }

          fill(p.tfill);

          textAlign(p.alignX,p.alignY);
          textSize(p.size);

          if(p.parent.hit){
            fill(CLRS.YELLOW);
            textSize(p.sizeH);
          }

          text(getProp(p.c), d, d+p.h/2);

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();

  };

  //~ Rotate
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

            if(app.left){ d=1; }

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

  //~ Return property
  var checkbox=function(cp,lp,ap,ctrls){
    control.call(this,cp,lp,ap,ctrls);
  };
  checkbox.prototype=Object.create(control.prototype);
  checkbox.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          rectMode(CENTER);
          textSize(p.size);
          //~ p.w=textWidth(p.g);

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){

            cursor(HAND);

            if(app.left){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);

          }

          noStroke();
          fill(CLRS.WHITE);
          if(p.alignX===LEFT)       { rect(d, d, p.w, p.h, p.r); }
          else if(p.alignX===CENTER){ rect(d, d, p.w, p.h, p.r); }

          if(getProp(p.c)){

            fill(CLRS.BLUE);
            rect(d,d,p.w*0.6,p.h*0.6);

          }
          
          fill(p.tfill);

          textAlign(p.alignX,p.alignY);
          textSize(p.size);

          if(p.parent.hit){
            fill(CLRS.YELLOW);
            textSize(p.sizeH);
          }

          //~ text(getProp(p.c), d, d+p.h/2);

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();

  };


  //~ Spacer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

            if(app.left){ d=1; }

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

  //~ Slider ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var sliderH=function(cp,lp,ap,ctrls){
    control.call(this,cp,lp,ap,ctrls);
  };
  sliderH.prototype=Object.create(control.prototype);
  sliderH.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){

            //~ if(app.left){ d=1; }
            cursor(HAND);
            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);

          }

          rect(d, d, p.w, p.h, p.r);

          fill(CLRS.RED);

          rect(d, d, p.v, p.h, p.r);

          fill(p.tfill);

          textAlign(p.alignX,p.alignY);
          textSize(p.size);

          if(p.hit){
            fill(p.tfillH);
            textSize(p.sizeH-1);
          }

          text(floor(this.w*p.v/p.w), d+p.w/2, d+p.h/2+1);

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();

  };
  sliderH.prototype.clicked=function(){
    if(this.hit && app.left){
      this.v=constrain(mouseX-this.parent.x-this.x, 0, this.w);
      commands(this.c, this.w*this.v/this.w);
      for(var c in this.ctrls){ this.ctrls[c].clicked() }
    }
  };
  sliderH.prototype.moved=function(x,y){

    if(mouseX>x+this.x && mouseX<x+this.x+this.w &&
       mouseY>y+this.y && mouseY<y+this.y+this.h){
      this.hit=true;
      app.focus=this.i;
      for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x,y+this.y) }
    }
    else{
      this.hit=false;
    }

  };
  sliderH.prototype.dragged=function(){
    if(this.hit && app.left){
      this.v=constrain(mouseX-this.parent.x-this.x, 0, this.w);
      commands(this.c, this.w*this.v/this.w);
      for(var c in this.ctrls){ this.ctrls[c].dragged() }
    }
  };

  //~ Strip ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var strip=function(cp,lp,ap,ctrls){
    control.call(this,cp,lp,ap,ctrls);
  };
  strip.prototype=Object.create(control.prototype);
  strip.prototype.draw=function(){

    var p=this;
    var d=0;
    
    pushMatrix();

      translate(p.x, p.y);

        pushStyle();
        
          //~ set width
          if(p.v){ p.w=p.ctrls[0].w*p.ctrls.length+10; }
          else   { p.w=p.ctrls[0].w+10;                }

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){
            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
            cursor(CROSS);
          }

          noStroke();
          
          rect(d, d, p.w, p.h, p.r);
          
          fill(p.tfill);

          rect(d+p.w-9, d+1, 8, p.h-2, 0);

          fill(CLRS.BLACK);

          if(p.v){
            triangle(d+p.w-2, d+p.h/2-3,
                     d+p.w-7, d+p.h/2,
                     d+p.w-2, d+p.h/2+3);
          }
          else{
            triangle(d+p.w-7, d+p.h/2-3,
                     d+p.w-2, d+p.h/2,
                     d+p.w-7, d+p.h/2+3);
          }

          if(p.hit){
            fill(p.tfillH);
          }

          textAlign(p.alignX,p.alignY);

          //~ text(p.g, p.w/2, p.h/2);

        popStyle();

        if(p.v){ for(var c in p.ctrls){ p.ctrls[c].draw(); } }
        else   { p.ctrls[0].draw();                          }

    popMatrix();

  };
  strip.prototype.clicked=function(){
    if(this.hit){
      if(app.focus===this.i){
        this.v=!this.v;        
      }
      //~ commands(this.c, this.v);
      for(var c in this.ctrls){ this.ctrls[c].clicked() }
    }
  };
  strip.prototype.moved=function(x,y){

    if(this.alignX===LEFT){

      if(mouseX>x+this.x && mouseX<x+this.x+this.w &&
         mouseY>y+this.y && mouseY<y+this.y+this.h){
        this.hit=true;
        app.focus=this.i;
        if(this.v){
          for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x, y+this.y) }
        }
        else{
          this.ctrls[0].moved(x+this.x, y+this.y)
        }
      }
      else{
        this.hit=false;
      }

    }
    else if(this.alignX===CENTER){

      if(mouseX>=x+this.x-this.w/2 && mouseX<=x+this.x+this.w/2 &&
         mouseY>=y+this.y-this.h/2 && mouseY<=y+this.y+this.h/2){
        this.hit=true;
        app.focus=this.i;
        for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x,y+this.y) }
      }
      else{
        this.hit=false;
      }

    }
    else if(this.alignX===RIGHT){
      app.focus=this.i;
    }
    else{
      app.focus=this.i;
    }

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
            cursor(ARROW);
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

  
  //~ Grid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var grid=function(cp,lp,ap,ctrls){
    control.call(this,cp,lp,ap,ctrls);
  };
  grid.prototype=Object.create(control.prototype);
  grid.prototype.draw=function(){

    var p=this;
    var d=0;
    var incr=this.h/22;

    var border=function(){

      pushStyle();

        rectMode(CENTER);

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){
            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
            cursor(ARROW);
          }

          rect(d, d, p.w, p.h, p.r);

      popStyle();

    };
    var origin=function(){

      noStroke();

      if(this.hit){ fill(CLRS.BLACK); }
      else        { fill(CLRS.BLACK, 25); }

      ellipse(0,0,6,6);

    };
    var axis=function(){

      noFill();
      stroke(getColor(CLRS.WHITE,20));
      strokeWeight(0.5);

      if(true){ line(-p.w/2, 0, p.w/2, 0); }
      if(true){ line(0,-p.h/2, 0, p.h/2);  }

    };
    var lines=function(){

      noFill();
      stroke(getColor(CLRS.WHITE,10));
      strokeWeight(0.25);

      if(true){
        for(var n=1; n<p.w/2/incr; n++){

          if(n%5===0){ strokeWeight(0.75);  }
          else       { strokeWeight(0.25); }

          line( n*incr, -p.h/2,  n*incr, p.h/2);
          line(-n*incr, -p.h/2, -n*incr, p.h/2);

        }
      }
      if(true){

      for(var n=1; n<p.h/2/incr; n++){

          if(n%5===0){ strokeWeight(0.75);  }
          else       { strokeWeight(0.25); }

          line(-p.w/2,  n*incr, p.w/2,  n*incr);
          line(-p.w/2, -n*incr, p.w/2, -n*incr);

        }
      }

    };
    var arrows=function(){

      noStroke();
      fill(getColor(CLRS.WHITE,50));

      if(true){

        triangle(-p.w/2, 0, -p.w/2+7, 3, -p.w/2+7, -3);   //~ left
        triangle( p.w/2, 0,  p.w/2-7, 3,  p.w/2-7, -3);   //~ right

      }
      if(true){

        triangle( 0,  p.h/2, 3,  p.h/2-7, -3,  p.h/2-7);  //~ top
        triangle( 0, -p.h/2, 3, -p.h/2+7, -3, -p.h/2+7);  //~ bottom

      }

    };
    var ticks=function(){

      noFill();
      stroke(getColor(CLRS.Gray8,100));
      strokeWeight(0.25);

      if(true){
        for(var n=0; n<p.w/2/incr; n++){
          line( n*incr, 3,  n*incr, -3);
          line(-n*incr, 3, -n*incr, -3);
        }
      }
      if(true){
        for(var n=0; n<p.h/2/incr; n++){
          line( 3,  n*incr, -3,  n*incr);
          line( 3, -n*incr, -3, -n*incr);
        }
      }

    };
    var labels=function(){

      pushMatrix();

        scale(1,-1);

          noFill();
          fill(getColor(CLRS.WHITE,2));
          strokeWeight(0.25);

          textSize(9);

          //~ x-axis
          textAlign(CENTER,TOP);

          if(true){
            for(var n=1; n<p.w/2/incr; n++){
              text( n, n*incr, 3);
              text( n,-n*incr, 3);
            }
          }

          //~ y-axis
          textAlign(RIGHT,CENTER);

          if(true){
            for(var n=1; n<p.h/2/incr; n++){
              text( n, -5,  n*incr);
              text( n, -5, -n*incr);
            }
          }

      popMatrix();

    };
    var crosshair=function(){

      pushStyle();
      
        noCursor();
        
        pushMatrix();
          
          resetMatrix();
          translate(0.5,0.5);

            rectMode(CENTER);
            
            stroke(app.color);
          
            //~ horizontal
            line(mouseX-20, mouseY, mouseX-5,  mouseY);
            line(mouseX+5,  mouseY, mouseX+20, mouseY);

            //~ vertical
            line(mouseX, mouseY-5, mouseX, mouseY-20);
            line(mouseX, mouseY+5, mouseX, mouseY+20);            

            rect(mouseX,mouseY,8,8);

        popMatrix();

      popStyle();

    };
    pushMatrix();

      translate(p.x+p.w/2+0.5, p.y+p.h/2+0.5);
      scale(1,-1);

        pushStyle();

          if(app.border){ border();    }
          if(true)      { axis();      }
          if(true)      { lines();     }
          if(true)      { arrows();    }
          if(true)      { ticks();     }
          if(true)      { labels();    }
          if(app.origin){ origin();    }
          //~ if(true)      { crosshair(); }

          stroke(app.color);
          strokeWeight(3);
          noFill();
          ellipse(0,0,300,200);
          
        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();

  };

  var n=100;

  var process;

  var main=function(){

    //~ background(getColor(CLRS.BLACK,n));

    //~ if(n<100){ n++; }

    //~ app.frameRate=frameCount;
    //~
    //~ frameRate(app.frameRate);

    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].draw() }

  };

  //~ translate(0.5,0.5);

  var draw=function(){ process(); };


  //~ Events ===========================================================

  var mouseClicked=function(){

    switch(mouseButton){

      case LEFT:

        for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].clicked() }
        break;

      case RIGHT:

        //~ println(mouseButton);
        
        //~ for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].clickedR() }
        break;

      case CENTER:

        //~ for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].clicked() }
        break;

      default:    break;

    }

  };
  var mouseMoved=function(){
    app.mouseX=mouseX;
    app.mouseY=mouseY;
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].moved(0,0) }
  };
  var mouseDragged=function(){
    //~ app.left=true;
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].dragged() }
  };
  var mousePressed=function(){

    switch(mouseButton){

      case LEFT:    app.left=true;    break;
      case CENTER:  app.center=true;  break;
      case RIGHT:   app.right=true;   break;

      default:                        break;

    }

    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].pressed() }

  };
  var mouseReleased=function(){

    //~ println(mouseButton);

    app.left=false;
    app.center=false;
    app.right=false;

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
    //~ println(app.keys);
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].pressed() }
  };
  var keyReleased=function(){
    app.keys[keyCode]=false;
    println(app.keys);
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].released() }
  };
  var keyTyped=function(){
    println(keyCode);
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].typed() }
  };

  //~ Load Controls ====================================================
  var getStyle=function(s){

      var style;

      switch(s){

        case STYLES.BACKGROUND:

          style=new propL(CLRS.BLACK, CLRS.BLACK, CLRS.BLUE, CLRS.GRAY, 0.125, 0.25);
          break;

        case STYLES.CONTAINER:

          style=new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25);
          break;

        case STYLES.BUTTON:

          style=new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25);
          break;

        case STYLES.SPACER:

          style=new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25);
          break;

        case STYLES.TEXT:

          style=new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11);
          break;

        case STYLES.TEXTCENTER:

          style=new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12);
          break;

        case STYLES.TITLE:

          style=new propA(CLRS.WHITE, CLRS.YELLOW, LEFT, CENTER, 12, 14);
          break;

        default:  break;

      }

    return style;

  };

  var getPoints=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;
    var l=parent.w-202;
    var ch=app.height-14;
    var w=36;
    
    var cn=new strip(
            new propC(getGUID(), parent, 500,50, w+10, w, 1, true, CMDS.ORIGIN[0], CMDS.CONTAINER[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ Points ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ PNT:								[	-100,	'Point',		      'POINT'             ],
    //~ PNT_OBJECT:         [	-101,	'Object',		      'Object'	          ],
    //~ PNT_INTERSECT:			[	-102,	'Intersect',		  'Interset'	        ],
    //~ PNT_MIDPOINT:				[	-103,	'Midpoint',       'Midpoint'	        ],
    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, false, CMDS.PNT[0], CMDS.PNT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, false, CMDS.PNT[0], CMDS.PNT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, false, CMDS.PNT_OBJECT[0], CMDS.PNT_OBJECT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, false, CMDS.PNT_INTERSECT[0], CMDS.PNT_INTERSECT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 4*w, 0, w, w, 0, false, CMDS.PNT_MIDPOINT[0], CMDS.PNT_MIDPOINT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    cn.ctrls=ctrls;

    return cn;

  };
  
  var getGrid=function(parent){

    var ctrls=[];

    var cn=new grid(
            new propC(getGUID(), parent, 5, 5, parent.w-10, parent.h-10, 5, false, CMDS.UNDEF[0], 0),
            new propL(CLRS.GRID, getColor(CLRS.GRID,65), CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
            getStyle(STYLES.TEXT));

    cn.ctrls=ctrls;

    return cn;

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

    //~ Labels ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ctrls.push(new label(
                new propC(getGUID(), cn, cn.w/2, 10, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.TELEMETRY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+0*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.DEBUG[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+1*h+5, 150, 10, 0, false, CMDS.UNDEF[0], CMDS.SPACER[0]),
                getStyle(STYLES.SPACER),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+2*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.WIDTH[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+3*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.HEIGHT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+4*h+5, 150, 10, 0, false, CMDS.UNDEF[0], CMDS.SPACER[0]),
                getStyle(STYLES.SPACER),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+5*h, 10, 10, 0, false, CMDS.FRAMERATE[0], CMDS.FRAMERATE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+6*h, 10, 10, 0, false, CMDS.FRAMERATEA[0], CMDS.FRAMERATEA[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+7*h+5, 150, 10, 0, false, CMDS.UNDEF[0], CMDS.SPACER[0]),
                getStyle(STYLES.SPACER),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+8*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.MOUSEX[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));


    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+9*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.MOUSEY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+10*h+5, 150, 10, 0, false, CMDS.UNDEF[0], CMDS.SPACER[0]),
                getStyle(STYLES.SPACER),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+11*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.LEFT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+12*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.CENTER[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+13*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.RIGHT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));                

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+15*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.FOCUS[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+17*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.COMMAND[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));
                
    //~ Values ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+0*h+5, 10, 10, 0, false, CMDS.DEBUG[0], CMDS.DEBUG[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+2*h, 10, 10, 0, false, CMDS.WIDTH[0], CMDS.WIDTH[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+3*h, 10, 10, 0, false, CMDS.HEIGHT[0], CMDS.HEIGHT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+5*h, 10, 10, 0, 30, CMDS.FRAMERATE[0], CMDS.FRAMERATE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+6*h, 10, 10, 0, false, CMDS.FRAMERATEA[0], CMDS.FRAMERATEA[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+8*h, 10, 10, 0, false, CMDS.MOUSEX[0], CMDS.MOUSEX[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));


    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+9*h, 10, 10, 0, false, CMDS.MOUSEY[0], CMDS.MOUSEY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));


    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+11*h, 10, 10, 0, false, CMDS.LEFT[0], CMDS.LEFT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+12*h, 10, 10, 0, false, CMDS.CENTER[0], CMDS.CENTER[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+13*h, 10, 10, 0, false, CMDS.RIGHT[0], CMDS.RIGHT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 50, top+15*h, 10, 10, 0, false, CMDS.FOCUS[0], CMDS.FOCUS[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+17*h, 10, 10, 0, false, CMDS.COMMAND[0], CMDS.COMMAND[1]),
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
                new propC(getGUID(), cn, cn.w/2, 10, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.PROPERTIES[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l+5, top+0*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.NAME[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l+5, top+1*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.CAPTION[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l+5, top+2*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.FORMULA[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, l+5, top+3*h+5, 150, 10, 0, false, CMDS.UNDEF[0], CMDS.SPACER[0]),
                getStyle(STYLES.SPACER),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l+5, top+4*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.COLOR[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l+5, top+5*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.LAYER[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l+5, top+6*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.LINETYPE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l+5, top+7*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.LINEWEIGHT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+100, top+0*h, 10, 10, 0, false, CMDS.NAME[0], CMDS.NAME[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+100, top+1*h, 10, 10, 0, false, CMDS.CAPTION[0], CMDS.CAPTION[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+100, top+2*h, 10, 10, 0, false, CMDS.FORMULA[0], CMDS.FORMULA[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+100, top+4*h, 10, 10, 0, false, CMDS.COLOR[0], CMDS.COLOR[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+100, top+5*h, 10, 10, 0, false, CMDS.LAYER[0], CMDS.LAYER[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+100, top+6*h, 10, 10, 0, false, CMDS.LINETYPE[0], CMDS.LINETYPE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+100, top+7*h, 10, 10, 0, false, CMDS.LINEWEIGHT[0], CMDS.LINEWEIGHT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getColors=function(parent){

    var ctrls=[];
    var top=30;
    var h=(128-25)/6;
    var l=10;
    var ch=200;

    var cn=new container(
            new propC(getGUID(),parent, 300, 100, 200, 270, 3, false, CMDS.UNDEF[0],0),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ Colors
    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+0*h, top, h, h, 0, false, CMDS.COLOR[0] ,CLRS.Red),
                new propL(CLRS.Red, CLRS.Red, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+1*h+5, top, h, h, 0, false, CMDS.COLOR[0], CLRS.RedOrange),
                new propL(CLRS.RedOrange, CLRS.RedOrange, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+2*h+10, top, h, h, 0, false, CMDS.COLOR[0], CLRS.Orange),
                new propL(CLRS.Orange, CLRS.Orange, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+3*h+15, top, h, h, 0, false, CMDS.COLOR[0], CLRS.YellowOrange),
                new propL(CLRS.YellowOrange, CLRS.YellowOrange, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+4*h+20, top, h, h, 0, false, CMDS.COLOR[0], CLRS.Yellow),
                new propL(CLRS.Yellow, CLRS.Yellow, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+5*h+25, top, h, h, 0, false, CMDS.COLOR[0], CLRS.YellowGreen),
                new propL(CLRS.YellowGreen, CLRS.YellowGreen, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+0*h, top+1*h+5, h, h, 0, false, CMDS.COLOR[0], CLRS.Green),
                new propL(CLRS.Green, CLRS.Green, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+1*h+5, top+1*h+5, h, h, 0, false, CMDS.COLOR[0], CLRS.BlueGreen),
                new propL(CLRS.BlueGreen, CLRS.BlueGreen, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+2*h+10, top+1*h+5, h, h, 0, false, CMDS.COLOR[0], CLRS.Blue),
                new propL(CLRS.Blue, CLRS.Blue, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+3*h+15, top+1*h+5, h, h, 0, false, CMDS.COLOR[0], CLRS.BlueViolet),
                new propL(CLRS.BlueViolet, CLRS.BlueViolet, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+4*h+20, top+1*h+5, h, h, 0, false, CMDS.COLOR[0], CLRS.Violet),
                new propL(CLRS.Violet, CLRS.Violet, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+5*h+25, top+1*h+5, h, h, 0, false, CMDS.COLOR[0], CLRS.RedViolet),
                new propL(getColor(CLRS.RedViolet,90), CLRS.RedViolet, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    //~ Gray Scale
    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+0*h, top+2*h+10, h, h, 0, false, CMDS.COLOR[0] ,CLRS.White),
                new propL(CLRS.White, CLRS.White, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+1*h+5, top+2*h+10, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray1),
                new propL(CLRS.Gray1, CLRS.Gray1, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+2*h+10, top+2*h+10, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray2),
                new propL(CLRS.Gray2, CLRS.Gray2, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+3*h+15, top+2*h+10, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray3),
                new propL(CLRS.Gray3, CLRS.Gray3, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+4*h+20, top+2*h+10, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray4),
                new propL(CLRS.Gray4, CLRS.Gray4, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+5*h+25, top+2*h+10, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray5),
                new propL(CLRS.Gray5, CLRS.Gray5, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+0*h, top+3*h+15, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray6),
                new propL(CLRS.Gray6, CLRS.Gray6, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+1*h+5, top+3*h+15, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray7),
                new propL(CLRS.Gray7, CLRS.Gray7, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+2*h+10, top+3*h+15, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray8),
                new propL(CLRS.Gray8, CLRS.Gray8, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+3*h+15, top+3*h+15, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray9),
                new propL(CLRS.Gray9, CLRS.Gray9, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+4*h+20, top+3*h+15, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray10),
                new propL(CLRS.Gray10, CLRS.Gray10, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+5*h+25, top+3*h+15, h, h, 0, false, CMDS.COLOR[0], CLRS.Black),
                new propL(getColor(CLRS.Black,90), CLRS.Black, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    //~ Current Color
    ctrls.push(new buttonP(
                new propC(getGUID(),cn, l+5*h+25, top+5*h+15, 40, 40, 0, false, CMDS.COLORG[0], CMDS.COLORG[0]),
                new propL(getColor(CLRS.Black,90), CLRS.Black, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l, top+5*h+20, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.RED[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.RED, CLRS.YELLOW, LEFT, CENTER, 14, 14)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l, top+5*h+40, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.GREEN[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.GREEN, CLRS.YELLOW, LEFT, CENTER, 14, 14)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l, top+5*h+60, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.BLUE[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.BLUE, CLRS.YELLOW, LEFT, CENTER, 14, 14)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+60, top+5*h+20, 10, 10, 0, false, CMDS.RED[0], CMDS.RED[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.RED, CLRS.YELLOW, LEFT, CENTER, 14, 14)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+60, top+5*h+40, 10, 10, 0, false, CMDS.GREEN[0], CMDS.GREEN[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.GREEN, CLRS.YELLOW, LEFT, CENTER, 14, 14)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+60, top+5*h+60, 10, 10, 0, false, CMDS.BLUE[0], CMDS.BLUE[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.BLUE, CLRS.YELLOW, LEFT, CENTER, 16, 16)));

    ctrls.push(new sliderH(
                new propC(getGUID(), cn, l, top+5*h+90, 128, 10, 5, 10, CMDS.RED[0], false),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new sliderH(
                new propC(getGUID(), cn, l, top+5*h+110, 128, 10, 5, 10, CMDS.GREEN[0], false),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new sliderH(
                new propC(getGUID(), cn, l, top+5*h+130, 128, 10, 5, 10, CMDS.BLUE[0], false),
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
            new propC(getGUID(), parent, parent.w/2-400, -5, 800, 45, 5, false, CMDS.UNDEF[0], CMDS.HEADER[1]),
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
            new propC(getGUID(), parent, parent.w/2-300, app.height-45, 600, 50, 2, false, CMDS.UNDEF[0],CMDS.FOOTER[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TITLE));

    cn.ctrls=ctrls;

    return cn;

  };

  var addControls=function(){

    var ctrls=[];

    var cn=new container(
            new propC(getGUID(), 0, 0, 0, app.width, app.height,2, false, CMDS.UNDEF[0], 0),
            getStyle(STYLES.BACKGROUND),
            getStyle(STYLES.TEXT));

    //~ ctrls.push(new sliderH(
            //~ new propC(getGUID(), cn, 226, 300, 200, 10, 0, 10, CMDS.FRAMERATE[0], false),
            //~ getStyle(STYLES.BUTTON),
            //~ getStyle(STYLES.TEXT)));

    ctrls.push(getGrid(cn));

    ctrls.push(new labelR(
            new propC(getGUID(), cn, cn.w/2, cn.h/2, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.CARTESIA[1]),
            getStyle(STYLES.BUTTON),
            getStyle(STYLES.TEXTCENTER)));

    ctrls.push(getPoints(cn));
    
    ctrls.push(getHeader(cn));
    ctrls.push(getFooter(cn));
    ctrls.push(getProperties(cn));
    ctrls.push(getTelemetry(cn));
    ctrls.push(getColors(cn));

    cn.ctrls=ctrls;

    app.dwg.ctrls.push(cn);

  };

  var loadCommands=function(){

    saveStrings('Rectangle', CMDS.RECTANGLE);

    //~ println(loadStrings('Rectangle'));

  };

  //~ Initialize =======================================================
  var initialize=function(){

    loadCommands();

    size(app.width, app.height);

    if(app.debug) { app.frameRate=62; }
    else          { app.frameRate=32;  }

    frameRate(app.frameRate);

    app.dwg=new drawing();

    addControls();

    process=main;

  };

  initialize();

}};
