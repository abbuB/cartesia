var proc = function(processingInstance){ with (processingInstance){

  //~ size(screen.width, screen.height-200);  //~ set size of canvas

  /**

    TO DO:
      - ...


  **/

  var getColor=function(clr,alpha){

    return color(red(clr), green(clr), blue(clr), alpha/100*255);

  };

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

    GRID:     color(33,40,48),

    VERTEX:   color(255,255,0),
    VERTEXA:  color(255*6/11),
    LINE:     color(255*6/11),
    LINEA:    color(170,29,29),
    FILL:     getColor(color(255*7/11),10),
    FILLA:    getColor(color(255*7/11),25),

    RULER:    color(231,189,33)


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
  var LINEWEIGHTS={
    HALF:   0,
    ONE:    1,
    TWO:    2,
    THREE:  3,
    FOUR:   4,
    FIVE:   5
  };

  var COMMANDS={


    //~ General ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    COMMAND:      [   0,  'Command',          'COMMAND'               ],
    UNDEF:        [   1,  'Undefined',        'UNDEFINED'             ],


    CARTESIA:     [   2,  'Cartesia',         'CARTESIA'              ],

    CONTAINER:    [   3,  'Container',        'CONTAINER'             ],
    HEADER:       [   4,  'Header',           'HEADER'                ],
    FOOTER:       [   5,  'Footer',           'FOOTER'                ],
    TELEMETRY:    [   6,  'Telemetry',        'TELEMETRY'             ],
    TOOLTIP:      [   7,  'ToolTip',          'TOOLTIP'               ],
    FORMULA:      [   8,  'Formula',          'FORMULA'               ],

    DEBUG:        [   9,  'Debug',            'DEBUG'                 ],
    WIDTH:        [  10,  'Width',            'WIDTH'                 ],
    HEIGHT:       [  11,  'Height',           'HEIGHT'                ],
    FRAMERATEA:   [  12,  'FrameRateA',       'FRAMERATE(A)'          ],
    FRAMERATE:    [  13,  'FrameRate',        'FRAMERATE'             ],
    MOUSEX:       [  14,  'MouseX',           'MOUSEX'                ],
    MOUSEY:       [  15,  'MouseY',           'MOUSEY'                ],
    PRESSED:      [  16,  'Pressed',          'PRESSED'               ],
    VISIBLE:      [  17,  'Visible',          'VISIBLE'               ],

    FOCUS:        [  18,  'Focus',            'FOCUS'                 ],

    LEFT:         [  19,  'Left button',      'LEFT'                  ],
    CENTER:       [  20,  'Center button',    'CENTER'                ],
    RIGHT:        [  21,  'Right button',     'RIGHT'                 ],

    SPACER:       [  22,  'Spacer',           'SPACER'                ],


    //~ Grid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    GRID:         [ 100,  'Grid',             'COMMAND'               ],

    ORIGIN:       [ 101,  'Origin',           'ORIGIN'                ],
    BORDER:       [ 102,  'Border',           'BORDER'                ],
    AXES:         [ 103,  'Axes',             'AXES'                  ],
    AXISX:        [ 104,  'x',                'X'                     ],
    AXISY:        [ 105,  'y',                'Y'                     ],
    LINES:        [ 106,  'Lines',            'LINES'                 ],
    LINESX:       [ 107,  'LinesX',           'LINESX'                ],
    LINESY:       [ 108,  'LinesY',           'LINESY'                ],
    ARROWS:       [ 109,  'Arrows',           'ARROWS'                ],
    ARROWSX:      [ 110,  'ArrowsX',          'ARROWSX'               ],
    ARROWSY:      [ 111,  'ArrowsY',          'ARROWSY'               ],
    TICKS:        [ 112,  'Ticks',            'TICKS'                 ],
    TICKSX:       [ 113,  'TicksX',           'TICKSX'                ],
    TICKSY:       [ 114,  'TicksY',           'TICKSY'                ],
    LABELS:       [ 115,  'Labels',           'LABELS'                ],
    LABELSX:      [ 116,  'LabelsX',          'LABELSX'               ],
    LABELSY:      [ 117,  'LabelsY',          'LABLESY'               ],

    COORDINATES:  [ 118,  'Coordinates',      'COORDINATES'           ],
    ORTHO:        [ 119,  'LabelsX',          'LABELSX'               ],
    SNAPTOGRID:   [ 120,  'LabelsY',          'LABLESY'               ],
    FULLSCREEN:   [ 121,  'Grid',             'COMMAND'               ],


    //~ Properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    PROPERTIES:   [ 200,  'Properties',       'PROPERTIES'            ],

    MATCH:        [ 201,  'Match',            'MATCH'                 ],

    NAME:         [ 202,  'Name',             'NAME'                  ],
    CAPTION:      [ 203,  'Caption',          'CAPTION'               ],

    COLOR:        [ 204,  'Color',            'COLOR'                 ],
    COLORG:       [ 205,  'ColorG',           'COLORG'                ],
    LAYER:        [ 206,  'Layer',            'LAYER'                 ],
    LINETYPE:     [ 207,  'Line Type',        'LINE TYPE'             ],
    LINEWEIGHT:   [ 208,  'Line Weight',      'LINE WEIGHT'           ],

    RED:          [ 209,   'Red',             'RED'                   ],
    BLUE:         [ 210,  'Blue',             'BLUE'                  ],
    GREEN:        [ 211,  'Green',            'GREEN'                 ],


    //~ File ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    FILE:         [ 301,  'File',             'FILE'                  ],
    NEW:          [ 302,  'New',              'NEW'                   ],
    OPEN:         [ 303,  'Open',             'OPEN'                  ],
    SAVE:         [ 304,  'Save',             'SAVE'                  ],
    SAVEAS:       [ 305,  'Save As',          'SAVEAS'                ],
    CLOSE:        [ 306,  'Close',            'CLOSE'                 ],


    //~ Edit ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    EDIT:         [ 400,  'Edit',             'EDIT'                  ],
    UNDO:         [ 401,  'Undo',             'UNDO'                  ],
    REDO:         [ 402,  'Redo',             'REDO'                  ],
    COPY:         [ 403,  'Copy',             'COPY'                  ],
    CUT:          [ 404,  'Cut',              'CUT'                   ],
    PASTE:        [ 405,  'Paste',            'PASTE'                 ],
    EDIT:         [ 406,  'Edit',             'EDIT'                  ],
    DELETE:       [ 407,  'Delete',           'DELETE'                ],


    //~ View ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    VIEW:         [ 500,  'View',             'VIEW'                  ],
    ZOOMIN:       [ 501,  'Zoomin',           'ZOOMIN'                ],
    ZOOMOUT:      [ 502,  'Zoomout',          'ZOOMOUT'               ],
    PAN:          [ 503,  'Pan',              'PAN'                   ],


    //~ Modify ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    MODIFY:       [ 600,  'Modify',           'MODIFY'                ],
    TRANSLATE:    [ 601,  'Translate',        'TRANSLATE'             ],
    TRANSVECTOR:  [ 602,  'Transvector',      'TRANSVECTOR'           ],    //~ TranslateByVector

    REFLECT:      [ 603,  'Reflect',          'REFLECT'               ],
    REFLECTTLINE: [ 604,  'ReflectLine',      'REFLECTLINE'           ],    //~ ReflectAboutLIne
    REFLECTPOINT: [ 605,  'ReflectPoint',     'REFLECTPOINT'          ],    //~ ReflectAboutPoint
    REFLECTCIRCLE:[ 606,  'ReflectCircle',    'REFLECTCIRCLE'         ],    //~ ReflectAboutCircle


    ROTATE:       [ 607,  'Rotate',           'ROTATE'                ],
    ROTATEPOINT:  [ 608,  'RotatePoint',      'ROTATEPOINT'           ],    //~ RotateAroundPoint

    SCALE:        [ 609,  'Scale',            'SCALE'                 ],
    SHEAR:        [ 610,  'Shear',            'SHEAR'                 ],

    //~ DILATEFROMPOINT:            [ 1,  'Dilatefrompoint',    'DILATEFROMPOINT' ]


    //~ Measure ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    MEASURE:      [ 700,  'Measure',          'MEASURE'               ],
    DISTANCE:     [ 701,  'Distance',         'DISTANCE'              ],
    PERIMETER:    [ 702,  'Perimeter',        'PERIMETER'             ],
    AREA:         [ 703,  'Area',             'AREA'                  ],
    VOLUME:      [ 704,  'Volume',           'VOLUME'                ],
    RADIUS:       [ 705,  'Radius',           'RADIUS'                ],
    DIAMETER:     [ 706,  'Diamter',          'DIAMETER'              ],
    SLOPE:        [ 707,  'Slope',            'SLOPE'                 ],


    //~ Layers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    LAYER:        [ 800,  'Layer',            'LAYER'                 ],
    FORWARD:      [ 801,  'Forward',          'FORWARD'               ],
    BACK:         [ 802,  'Back',             'BACK'                  ],



    //~  SHAPES ========================================================


    //~ Point (P) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    POINT:        [1000,  'Point',            'POINT'                 ],
    P_DEFAULT:    [1001,  'P_DEFAULT',        'P_DEFAULT'             ],
    P_OBJECT:     [1002,  'P_Object',         'P_OBJECT'              ],
    P_INTERSECT:  [1003,  'P_Intersect',      'P_INTERSECT'           ],
    P_MIDPOINT:   [1004,  'P_Midpoint',       'P_MIDPOINT'            ],    //~ Midpoint/Center
    P_ATDETACH:   [1005,  'P_AttachDetach',   'P_ATTACHDETACH'        ],    //~ AttachDetachPoint


    //~ Line (L) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    LINE:         [1100,  'Line',             'LINE'                  ],
    L_2P:         [1101,  'Line2P',           'LINE2P'                ],    //~ through 2 points
    L_SEGMENT2P:  [1102,  'LineSegment2P',    'LINESEGMENT2P'         ],    //~ between 2 points
    L_SEGMENTLEN: [1103,  'LineSegmentLen',   'LINESEGMENTLEN'        ],    //~ from point given length
    L_PERP:       [1104,  'LinePerp',         'LINEPERP'              ],    //~ perpendicular
    L_PERPB:      [1105,  'LinePerpB',        'LINEPERPB'             ],    //~  perpendicular bisector
    L_ANGB:       [1106,  'LineAngB',         'LINEANGB'              ],    //~ angle bisector
    L_PARR:       [1107,  'LineParr',         'LINEPARR'              ],    //~ parallel
    L_TANGENT:    [1108,  'LineTangent',      'LINETANGENT'           ],    //~ Tangent
    L_DIAMETER:   [1109,  'LineDiameter',     'LINEDIAMETER'          ],    //~ Diameter
    L_RADIUS:     [1110,  'LineRadius',       'LINERADIUS'            ],    //~ Radius

    RAY_2P:       [1211,  'Ray2P',            'RAY2P'                 ],    //~ Ray between 2 points
    V_2P:         [1212,  'Vector2P',         'VECTOR2P'              ],    //~ Vector between 2 points
    V_FP:         [1213,  'VectorFP',         'VECTORFP'              ],    //~ Vector from point


    //~ Triangle (T)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    TRIANGLE:     [1300,  'Triangle',         'TRIANGLE'              ],
    T_EQUILATERAL:[1301,  'T_Equilateral',    'T_EQUILATERAL'         ],
    T_ISOSCELES:  [1302,  'T_Isosceles',      'T_ISOSCELES'           ],
    T_SCALENE:    [1303,  'T_Scalene',        'T_SCALENE'             ],


    //~ Circle (C)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CIRCLE:       [1400,  'Circle',           'CIRCLE'                ],
    C_CENTERP:    [1401,  'C_CenterP',        'C_CENTERP'             ],    //~ center point
    C_CENTERR:    [1402,  'C_CenterR',        'C_CENTERR'             ],    //~ center radius

    C_3P:         [1403,  'C_3P',             'C_3P'                  ],    //  3 points

    //~ Quadrilateral (Q)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    QUAD:         [1500,  'Quadrilateral',    'QUADRILATERAL'         ],
    Q_RECTANGLE:  [1501,  'Rectangle',        'RECTANGLE'             ],
    Q_SQUARE:     [1502,  'Square',           'SQUARE'                ],
    Q_RHOMBUS:    [1503,  'Rhombus',          'RHOMBUS'               ],
    Q_PGRAM:      [1504,  'Parallelogram',    'PARALLELOGRAM'         ],    //~ Q_PARALLELOGRAM
    Q_TRAPEZOID:  [1505,  'Trapezoid',        'TRAPEZOID'             ],
    Q_KITE:       [1506,  'Kite',             'KITE'                  ],

    //~ Arc (A)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ARC:          [1600,  'Arc',              'ARC'                   ],
    A_2P:         [1601,  'Arc2Points',       'ARC2POINTS'            ],    //~ SemiCircleThrough2Points
    A_CA:         [1602,  'CircularArc',      'CIRCULARARC'           ],    //~ CircularArc
    A_CCA:        [1603,  'CircumCircularArc','CIRCUMCIRCULARARC'     ],    //~ CircumcircularArc
    A_CS:         [1604,  'CircularSector',   'CIRCULARSECTOR'        ],    //~ CircularSector
    A_CCS:        [1605,  'CircumCircularSector','CIRCUMCIRCULARSECTOR'],   //~ CircumCircularSector

    COMPASS:      [1606,  'Compass',          'COMPASS'               ],    //~ ??

    //~ Polygon ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    POLYGON:      [1700,  'Polygon',          'POLYGON'               ],
    POLYGONR:     [1701,  'PolygonR',         'POLYGONR'              ],    //~ regular
    POLYGONRIGID: [1702,  'PolygonRigid',     'POLYGONRIGID'          ],    //~ Rigid
    POLYGONV:     [1703,  'PolygonV',         'POLYGONV'              ],    //~ Vector


    //~ Conics (S) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CONIC:        [1800,  'Conic',            'CONIC'                 ],
    S_ELLIPSE:    [1800,  'Ellipse',          'ELLIPSE'               ],
    S_HYPERBOLA:  [1801,  'Hyperbola',        'HYPERBOLA'             ],
    S_PARABOLA:   [1802,  'Parabola',         'PARABOLA'              ],
    S_5POINTS:    [1803,  'Conic5points',     'CONIC5POINTS'          ],


    //~ Angle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    ANGLE:        [1900,  'Angle',            'ANGLE'                 ],
    ANGLE_SIZE:   [1901,  'AngelSize',        'ANGELSIZE'             ],


    //~ Annotation ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    TEXT:         [2000,  'Text',             'TEXT'                  ],


    //~ Images ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    IMAGE:        [2101,  'Image',            'IMAGE'                 ],
    SKETCH:       [2102,  'SKETCH',           'SKETCH'                ],

    //~ Footer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ ORTHO:
    //~ SNAPTOGRID:
    //~ GRIDLINES:
    //~ COORDINATES:
    //~ DISPLAY:
//~
    //~ CommandLine ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ COMMANDLINE:
    //~ HISTORY:
    //~ DISPLAY:

    //~ PEN:                        [ 1,  'Pen',    'PEN' ]

    //~ RELATION:                   [ 1,  'Relation',   'RELATION'  ]
    //~ PROBABILITYCALCULATOR:      [ 1,  'Probabilitycalculator',    'PROBABILITYCALCULATOR' ]
    //~ SLIDER:                     [ 1,  'Slider',   'SLIDER'  ]
    //~ BUTTON:                     [ 1,  'Button',   'BUTTON'  ]
    //~ INPUTBOX:                   [ 1,  'Inputbox',   'INPUTBOX'  ]

    //~ CREATELIST:                 [ 1,  'Createlist',   'CREATELIST'  ]
    //~ COMPLEXNUMBER:              [ 1,  'Complexnumber',    'COMPLEXNUMBER' ]
    //~ BESTFITLINE:                [ 1,  'Bestfitline',    'BESTFITLINE' ]
    //~ LOCUS:                      [ 1,  'Locus',    'LOCUS' ]
    //~ POLYLINE:                   [ 1,  'Polyline',   'POLYLINE'  ]

  };

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

    command:        1001,

    border:         true,
    origin:         false,

    axisx:          true,
    axisy:          true,
    linesx:         true,
    linesy:         true,
    arrowsx:        true,
    arrowsy:        true,
    ticksx:         true,
    ticksy:         true,
    labelsx:        true,
    labelsy:        true,

    coordinates:    true,
    ortho:          true,
    snaptogrid:     true,
    fullscreen:     true,

    cursorSize:     0,

    ctrls:          [],
    shapes:          [],

  };

  var drawing=function(){

    this.guid=getGUID();
    this.shapes=[];

    this.color=CLRS.RED;
    this.layer=11;
    this.linetype=LINETYPES.HAIRLINE;
    this.lineweight=7;

  };

  //~ Methods ==========================================================
  var getGUID=function(){

    //~ return year()   + ''  +
           //~ month()  + ''  +
           //~ day()    + ''  +
           //~ hour()   + ''  +
           //~ minute() + ''  +
           //~ second() + ''  +
           //~ millis() + ''  +
           //~ round(random(10e15));

    return random(10e15);

  };

  var getProp=function(p){

  //~ println(p);
    switch(p){

      case COMMANDS.COMMAND[0]:     return app.command;

      case COMMANDS.FOCUS[0]:       return app.focus;
      case COMMANDS.LEFT[0]:        return app.left;
      case COMMANDS.CENTER[0]:      return app.center;
      case COMMANDS.RIGHT[0]:       return app.right;
      case COMMANDS.CAPTION[0]:     return app.caption;
      case COMMANDS.NAME[0]:        return app.name;
      case COMMANDS.FORMULA[0]:     return app.formula;

      case COMMANDS.WIDTH[0]:       return app.width;
      case COMMANDS.HEIGHT[0]:      return app.height;
      case COMMANDS.FRAMERATE[0]:   return app.frameRate;
      case COMMANDS.FRAMERATEA[0]:  return __frameRate;
      case COMMANDS.MOUSEX[0]:      return app.mouseX;
      case COMMANDS.MOUSEY[0]:      return app.mouseY;
      case COMMANDS.PRESSED[0]:     return app.left;

      case COMMANDS.COLOR[0]:       return app.color;
      case COMMANDS.COLORG[0]:      return app.color;

      case COMMANDS.LAYER[0]:       return app.layer;
      case COMMANDS.LINETYPE[0]:    return app.linetype;
      case COMMANDS.LINEWEIGHT[0]:  return app.lineweight;

      case COMMANDS.DEBUG[0]:       return app.debug;

      case COMMANDS.RED[0]:         return app.red;
      case COMMANDS.GREEN[0]:       return app.green;
      case COMMANDS.BLUE[0]:        return app.blue;


      //~ Grid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      case COMMANDS.ORIGIN[0]:      return app.origin;

      case COMMANDS.AXISX[0]:       return app.axisx;
      case COMMANDS.AXISY[0]:       return app.axisy;

      case COMMANDS.LINESX[0]:      return app.linesx;
      case COMMANDS.LINESY[0]:      return app.linesy;

      case COMMANDS.ARROWSX[0]:     return app.arrowsx;
      case COMMANDS.ARROWSY[0]:     return app.arrowsy;

      case COMMANDS.TICKSX[0]:      return app.ticksx;
      case COMMANDS.TICKSY[0]:      return app.ticksy;

      case COMMANDS.LABELSX[0]:     return app.labelsx;
      case COMMANDS.LABELSY[0]:     return app.labelsy;

      case COMMANDS.COORDINATES[0]: return app.coordinates;
      case COMMANDS.ORTHO[0]:       return app.ortho;
      case COMMANDS.SNAPTOGRID[0]:  return app.snaptogird;
      case COMMANDS.FULLSCREEN[0]:  return app.fullscreen;

    };

  };

  var getDottedLine=function(x0, y0, x1, y1, n){

    var x,y;

    for(var i=0; i<=n; i++) {

      x = lerp(x0, x1, i/n);
      y = lerp(y0, y1, i/n);

      ellipse(x, y, 1, 1);

    }

  }

  var rec=function(x,y,w,h,r){

    beginShape();
      vertex(x,y);
      vertex(x+w,y);
      vertex(x+w,y+h);
      vertex(x,y+h);
    endShape(CLOSE);

  };

  var pt=function(x,y){
    this.x=x;
    this.y=y;
    println(this.x+","+this.y);
  };

  //~ Shapes ===========================================================
  var Shape=function(p){

    this.pnts=p.pnts;

    this.w=p.w;
    this.h=p.h;

    this.fill=lp.fill;          //~ fill color
    this.fillH=lp.fillH;        //~ fill color highlight
    this.stroke=lp.stroke;      //~ stroke color
    this.strokeH=lp.strokeH;    //~ stroke color highlight

    this.layer=p.layer;
    this.linetype=p.linetype;

    this.lineweight=lp.lineweight;      //~ strokeWeight
    this.lineweightH=lp.lineweightH;    //~ strokeWeight highlight

  };
  Shape.prototype.draw=function(){};

  var Point=function(p){
    Shape.call(this,p);
  };
  Point.prototype=Object.create(Shape.prototype);
  Point.prototype.draw=function(){

    fill(this.fill);
    stroke(this.stroke);
    strokeWeight(this.strokeWeight);

    ellipse(this.pnts[0].x,this.pnts[0].y,this.w,tihs.h);

    //~ this.pnts=p.pnts;
//~ 
    //~ this.w=p.w;
    //~ this.h=p.h;
//~ 
    //~ this.fill=lp.fill;          //~ fill color
    //~ this.fillH=lp.fillH;        //~ fill color highlight
    //~ this.stroke=lp.stroke;      //~ stroke color
    //~ this.strokeH=lp.strokeH;    //~ stroke color highlight
//~ 
    //~ this.layer=p.layer;
    //~ this.linetype=p.linetype;
//~ 
    //~ this.lineweight=lp.lineweight;      //~ strokeWeight
    //~ this.lineweightH=lp.lineweightH;    //~ strokeWeight highlight

  };

  var Line=function(p){
    Shape.call(this,p);
  };
  Line.prototype=Object.create(Shape.prototype);
  Line.prototype.draw=function(){};

  var Triangle=function(p){
    Shape.call(this,p);
  };
  Triangle.prototype=Object.create(Shape.prototype);
  Triangle.prototype.draw=function(){};

  var Circle=function(p){
    Shape.call(this,p);
  };
  Circle.prototype=Object.create(Shape.prototype);
  Circle.prototype.draw=function(){};

  var Ellipse=function(p){
    Shape.call(this,p);
  };
  Ellipse.prototype=Object.create(Shape.prototype);
  Ellipse.prototype.draw=function(){};

  var Arc=function(p){
    Shape.call(this,p);
  };
  Arc.prototype=Object.create(Shape.prototype);
  Arc.prototype.draw=function(){};

  var Polygon=function(p){
    Shape.call(this,p);
  };
  Polygon.prototype=Object.create(Shape.prototype);
  Polygon.prototype.draw=function(){};

  var Conic=function(p){
    Shape.call(this,p);
  };
  Conic.prototype=Object.create(Shape.prototype);
  Conic.prototype.draw=function(){};

  var Angle=function(p){
    Shape.call(this,p);
  };
  Angle.prototype=Object.create(Shape.prototype);
  Angle.prototype.draw=function(){};

  var Annotation=function(p){
    Shape.call(this,p);
  };
  Annotation.prototype=Object.create(Shape.prototype);
  Annotation.prototype.draw=function(){};

  var GridCommands=function(c,p){

    switch(c){

      case COMMANDS.GRID[0]:        break;

      case COMMANDS.ORIGIN[0]:      app.origin=!app.origin;           break;
      case COMMANDS.BORDER[0]:      app.border=!app.border;           break;
      case COMMANDS.AXES[0]:                                          break;
      case COMMANDS.AXISX[0]:       app.axisx=!app.axisx;             break;
      case COMMANDS.AXISY[0]:       app.axisy=!app.axisy;             break;
      case COMMANDS.LINES[0]:                                         break;
      case COMMANDS.LINESX[0]:      app.linesx=!app.linesx;           break;
      case COMMANDS.LINESY[0]:      app.linesy=!app.linesy;           break;
      case COMMANDS.ARROWS[0]:                                        break;
      case COMMANDS.ARROWSX[0]:     app.arrowsx=!app.arrowsx;         break;
      case COMMANDS.ARROWSY[0]:     app.arrowsy=!app.arrowsy;         break;
      case COMMANDS.TICKS[0]:                                         break;
      case COMMANDS.TICKSX[0]:      app.ticksx=!app.ticksx;           break;
      case COMMANDS.TICKSY[0]:      app.ticksy=!app.ticksy;           break;
      case COMMANDS.LABELS[0]:                                        break;
      case COMMANDS.LABELSX[0]:     app.labelsx=!app.labelsx;         break;
      case COMMANDS.LABELSY[0]:     app.labelsy=!app.labelsy;         break;

      case COMMANDS.COORDINATES[0]: app.coordinates=!app.coordinates; break;
      case COMMANDS.ORTHO[0]:       app.ortho=!app.ortho;             break;
      case COMMANDS.SNAPTOGRID[0]:  app.snaptogrid=!app.snaptogrid;   break;
      case COMMANDS.FULLSCREEN[0]:  app.fullscreen=!app.fullscreen;   break;

      default:      break;

    }

  };
  var ShapeCommands=function(c,p){

    println(c+","+p);

    app.command=p;

    switch(c){

      case COMMANDS.P_DEFAULT[0]:   app.command=p;                break;
      //~ case COMMANDS.POINT[0]:       println('Point:');          break;
      //~ case COMMANDS.P_OBJECT[0]:    println('Point: bound');    break;
      //~ case COMMANDS.P_INTERSECT[0]: println('Point: interset'); break;
      //~ case COMMANDS.P_MIDPOINT[0]:  println('Point: midpoint'); break;

      //~ case COMMANDS.ORIGIN[0]:      app.origin=!app.origin;       break;
      //~ case COMMANDS.BORDER[0]:      app.border=!app.border;       break;

      default:      break;

    }

  };

  //~ Commands =========================================================
  var commands=function(c,p){

    //~ println(c+':'+p);

    //~ println(COMMANDS.FULLSCREEN[0]);

    switch(true){

      //~ Grid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      case (c>COMMANDS.GRID[0] &&
            c<=COMMANDS.FULLSCREEN[0]):   GridCommands(c,p);      break;

      case (c>=COMMANDS.POINT[0] &&
            c<=COMMANDS.SKETCH[0]):       ShapeCommands(c,p);     break;

      //~ Shapes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      //~ case COMMANDS.FRAMERATE[0]:   frameRate(p);
                                    //~ app.frameRate=p;
                                    //~ break;

      //~ case COMMANDS.DEBUG[0]:       app.debug=!app.debug;
                                    //~ if(app.debug){ frameRate(60);  }
                                    //~ else         { frameRate(31); }
                                    //~ break;

      //~ case COMMANDS.COLORG[0]:      return app.color;

      case c===COMMANDS.COLOR[0]:       app.color=p;
                                        app.red=red(app.color);
                                        app.green=green(app.color);
                                        app.blue=blue(app.color);
                                        break;

      //~ case COMMANDS.RECTANGLE[0]: println('Rectangle');         break;

      //~ case COMMANDS.RED[0]:         app.red=red(app.color);     break;
      //~ case COMMANDS.GREEN[0]:       app.green=green(app.color); break;
      //~ case COMMANDS.BLUE[0]:        app.blue=blue(app.color);   break;

      default:  break;

    }

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

  var propS=function(i,pnts){

    this.pnts=pnts;

    this.w=5;
    this.h=5;

    this.fill=app.color;
    this.fillH=app.color;
    this.stroke=app.color;
    this.strokeH=app.color;

    this.layer=app.layer;
    this.linetype=app.linetype;

    this.lineweight=app.lineweight;
    this.lineweightH=app.lineweightH;

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
    this.hitExpand=false;       //~ mouse is over the expand/collapse area

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
      }
      else{
        this.hit=false;
      }

      for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x, y+this.y) }

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
    var cPNT=CLRS.VERTEX;
    var cMEASURE=CLRS.RED;
    var cVERTEX=CLRS.VERTEXA;
    var cLINE=CLRS.LINE;
    var cFILL=CLRS.FILL;
    var sz=3;

    var drawPoint=function(){

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.P_DEFAULT[0]:

            noFill();

            strokeWeight(0);
            noStroke();
            fill(cPNT);

            ellipse(d+cX, d+cY, sz, sz);

            break;

          case COMMANDS.P_OBJECT[0]:

            fill(CLRS.FILL);
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+cX-10, d+cY-10);
              vertex(d+cX-10, d+cY+5)
              vertex(d+cX+10, d+cY+10);
              vertex(d+cX+4,  d+cY-6);
            endShape(CLOSE);

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+cX, d+cY, sz, sz);

            noStroke();
            fill(CLRS.VERTEX);

            ellipse(d+cX-10, d+cY-10, sz, sz);
            ellipse(d+cX-10, d+cY+5,  sz, sz)
            ellipse(d+cX+10, d+cY+10, sz, sz);
            ellipse(d+cX+4,  d+cY-6,  sz, sz);

            break;

          case COMMANDS.P_INTERSECT[0]:

            noFill();
            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+cX-10, d+cY+10, d+cX+10, d+cY-10);
            line(d+cX+4,  d+cY+10, d+cX-4, d+cY-10);

            noStroke();
            strokeWeight(0.5);
            fill(cPNT);

            ellipse(d+cX, d+cY, sz, sz);

            break;

          case COMMANDS.P_MIDPOINT[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

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
    var drawLine=function(){

      pushStyle();

      rectMode(CENTER);

        switch(p.c){

          case COMMANDS.L_2P[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+cX-10, d+cY+10, d+cX+10, d+cY-10);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+cX+5, d+cY-5, sz, sz);
            ellipse(d+cX-5, d+cY+5, sz, sz);

            break;

          case COMMANDS.L_SEGMENT2P[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+cX-7, d+cY+7, d+cX+7, d+cY-7);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+cX+7, d+cY-7, sz, sz);
            ellipse(d+cX-7, d+cY+7, sz, sz);

            break;

          case COMMANDS.L_SEGMENTLEN[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+cX-7, d+cY+7, d+cX+7, d+cY-7);

            noStroke();
            strokeWeight(0);
            fill(cMEASURE);

            ellipse(d+cX+7, d+cY-7, sz, sz);

            fill(cPNT);
            ellipse(d+cX-7, d+cY+7, sz, sz);

            break;

          case COMMANDS.L_PERP[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+cX-7, d+cY+7, d+cX+7, d+cY-7);

            stroke(cLINE);
            getDottedLine(d+cX-7, d+cY-7, d+cX+10, d+cY+10, 10);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+cX-7, d+cY-7, sz, sz);

            break;

          case COMMANDS.L_PERPB[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cMEASURE);

            line(d+cX-7, d+cY+7, d+cX+7, d+cY-7);

            stroke(cVERTEX);
            line(d+cX-7, d+cY-7, d+cX+10, d+cY+10);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+cX-7, d+cY-7, sz, sz);
            ellipse(d+cX+7, d+cY+7, sz, sz);

            break;

          case COMMANDS.L_ANGB[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cMEASURE);

            line(d+cX-10, d+cY+10, d+cX+10, d+cY-10);

            stroke(cVERTEX);

            line(d+cX-5, d+cY+5, d+cX-2, d+cY-10);
            line(d+cX-5, d+cY+5, d+cX+10, d+cY+2);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+cX-5,  d+cY+5,  sz, sz);
            ellipse(d+cX-2,  d+cY-10, sz, sz);
            ellipse(d+cX+10, d+cY+2,  sz, sz);

            break;

          case COMMANDS.L_PARR[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+cX+10, d+cY+5, d+cX-10, d+cY+10);

            stroke(cMEASURE);

            line(d+cX-10, d+cY-5, d+cX+10, d+cY-10);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+cX,  d+cY-7.5,  sz, sz);

            break;

          case COMMANDS.L_TANGENT[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            ellipse(d+cX+5, d+cY+5,12,12);

            stroke(cMEASURE);

            line(d+cX-10, d+cY+10, d+cX+10, d+cY-10);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+cX, d+cY, sz, sz);

            break;

          case COMMANDS.L_DIAMETER[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            ellipse(d+cX, d+cY, 20, 20);

            stroke(cMEASURE);

            line(d+cX+10*cos(PI/4),   d+cY-10*sin(PI/4),
                 d+cX+10*cos(PI*3/4), d+cY+10*sin(PI*3/4));

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+cX, d+cY, sz, sz);

            break;

          case COMMANDS.L_RADIUS[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            ellipse(d+cX, d+cY, 20, 20);

            stroke(cMEASURE);

            line(d+cX, d+cY,
                 d+cX+10*cos(PI/4), d+cY-10*sin(PI/4));

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+cX, d+cY, sz, sz);

            break;

          case COMMANDS.RAY_2P[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+cX-10, d+cY+10, d+cX+10, d+cY-10);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+cX+3, d+cY-3, sz, sz);
            ellipse(d+cX-10, d+cY+10, sz, sz);

            break;

          case COMMANDS.V_2P[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+cX-10, d+cY+10, d+cX+10, d+cY-10);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+cX+10, d+cY-10, sz, sz);
            ellipse(d+cX-10, d+cY+10, sz, sz);

            noStroke();
            fill(cVERTEX);

            beginShape();
              vertex(d+cX+9, d+cY-9);
              vertex(d+cX+4, d+cY-9);
              vertex(d+cX+9, d+cY-4);
            endShape(CLOSE);

            break;

          case COMMANDS.V_FP[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+cX-10, d+cY+10, d+cX+10, d+cY-10);

            noStroke();
            strokeWeight(0);

            fill(cMEASURE);
            ellipse(d+cX+10, d+cY-10, sz, sz);

            fill(cPNT);
            ellipse(d+cX-10, d+cY+10, sz, sz);

            noStroke();
            fill(cVERTEX);

            beginShape();
              vertex(d+cX+9, d+cY-9);
              vertex(d+cX+4, d+cY-9);
              vertex(d+cX+9, d+cY-4);
            endShape(CLOSE);

            break;

        }

      popStyle();

    };
    var drawTriangle=function(){

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.T_EQUILATERAL[0]:

            noFill();

            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+cX,              d+cY-15*sin(PI/4));
              vertex(d+cX+15*cos(PI/4), d+cY+15*sin(PI/4));
              vertex(d+cX-15*cos(PI/4), d+cY+15*sin(PI/4));
            endShape(CLOSE);

            //~ Vertices
            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+cX,              d+cY-15*sin(PI/4), sz, sz);
            ellipse(d+cX+15*cos(PI/4), d+cY+15*sin(PI/4), sz, sz);
            ellipse(d+cX-15*cos(PI/4), d+cY+15*sin(PI/4), sz, sz);

            break;

          case COMMANDS.T_ISOSCELES[0]:

            noFill();

            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+cX,   d+cY-10);
              vertex(d+cX+7, d+cY+10);
              vertex(d+cX-7, d+cY+10);
            endShape(CLOSE);

            //~ Vertices
            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+cX,   d+cY-10, sz, sz);
            ellipse(d+cX+7, d+cY+10, sz, sz);
            ellipse(d+cX-7, d+cY+10, sz, sz);

            break;

          case COMMANDS.T_SCALENE[0]:

            noFill();

            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+cX-10, d+cY-10);
              vertex(d+cX-5,  d+cY+10);
              vertex(d+cX+10, d+cY+10);
            endShape(CLOSE);

            //~ Vertices
            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+cX-10, d+cY-10, sz, sz);
            ellipse(d+cX-5,  d+cY+10, sz, sz);
            ellipse(d+cX+10, d+cY+10, sz, sz);

            break;

          default:  break;

        }

      popStyle();

    }
    var drawCircle=function(){

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.C_CENTERP[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+cX, d+cY, sz, sz);
            ellipse(d+cX+10*cos(PI/4),
                    d+cY-10*sin(PI/4),
                    sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            ellipse(d+cX, d+cY, 20, 20);

            break;

          case COMMANDS.C_CENTERR[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+cX, d+cY, sz, sz);

            noFill();
            strokeWeight(1);
            stroke(CLRS.LINEA);

            line(d+cX, d+cY,
                 d+cX+10*cos(PI/4),
                 d+cY-10*sin(PI/4));

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            ellipse(d+cX, d+cY, 20, 20);

            break;

          case COMMANDS.C_3P[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            //~ ellipse(d+cX, d+cY, sz, sz);
            ellipse(d+cX+10*cos(PI/4),
                    d+cY-10*sin(PI/4),
                    sz, sz);
            ellipse(d+cX+10*cos(PI),
                    d+cY+10*sin(PI),
                    sz, sz);
            ellipse(d+cX+10*cos(PI/4),
                    d+cY+10*sin(PI/4),
                    sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            ellipse(d+cX, d+cY, 20, 20);

            break;

          default:  break;

        }

      popStyle();

    }
    var drawQuad=function(){

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.Q_RECTANGLE[0]:

            pushMatrix();

              translate(0.5,0.5);

                noStroke();
                strokeWeight(0);
                fill(CLRS.VERTEX);

                ellipse(d+cX-10, d+cY-8, sz, sz);
                ellipse(d+cX+10, d+cY+8, sz, sz);

                noFill();
                strokeWeight(0.5);
                stroke(CLRS.LINE);

                beginShape();
                  vertex(d+cX-10, d+cY-8);
                  vertex(d+cX+10, d+cY-8);
                  vertex(d+cX+10, d+cY+8);
                  vertex(d+cX-10, d+cY+8);
                endShape(CLOSE);

            popMatrix();

            break;

          case COMMANDS.Q_SQUARE[0]:

            pushMatrix();

              translate(0.5,0.5);

                noStroke();
                strokeWeight(0);
                fill(CLRS.VERTEX);

                ellipse(d+cX-8, d+cY-8, sz, sz);
                ellipse(d+cX+8, d+cY+8, sz, sz);

                noFill();
                strokeWeight(0.5);
                stroke(CLRS.LINE);

                beginShape();
                  vertex(d+cX-8, d+cY-8);
                  vertex(d+cX+8, d+cY-8);
                  vertex(d+cX+8, d+cY+8);
                  vertex(d+cX-8, d+cY+8);
                endShape(CLOSE);

            popMatrix();

            break;

          case COMMANDS.Q_RHOMBUS[0]:

            pushMatrix();

              translate(0.5,0.5);

                noStroke();
                strokeWeight(0);
                fill(CLRS.VERTEX);

                ellipse(d+cX-6, d+cY-8, sz, sz);
                ellipse(d+cX+6, d+cY+8, sz, sz);

                noFill();
                strokeWeight(0.5);
                stroke(CLRS.LINE);

                beginShape();
                  vertex(d+cX-6,  d+cY-8);
                  vertex(d+cX+10, d+cY-8);
                  vertex(d+cX+6,  d+cY+8);
                  vertex(d+cX-10, d+cY+8);
                endShape(CLOSE);

              popMatrix();

              break;

            case COMMANDS.Q_PGRAM[0]:

              pushMatrix();

                translate(0.5,0.5);

                  noStroke();
                  strokeWeight(0);
                  fill(CLRS.VERTEX);

                  ellipse(d+cX-8, d+cY-8, sz, sz);
                  ellipse(d+cX+8, d+cY+8, sz, sz);

                  noFill();
                  strokeWeight(0.5);
                  stroke(CLRS.LINE);

                  beginShape();
                    vertex(d+cX-8,  d+cY-8);
                    vertex(d+cX+12, d+cY-8);
                    vertex(d+cX+8,  d+cY+8);
                    vertex(d+cX-12, d+cY+8);
                  endShape(CLOSE);

                popMatrix();

                break;

            case COMMANDS.Q_TRAPEZOID[0]:

              pushMatrix();

                translate(0.5,0.5);

                  noStroke();
                  strokeWeight(0);
                  fill(CLRS.VERTEX);

                  ellipse(d+cX-8, d+cY-8, sz, sz);
                  ellipse(d+cX+8, d+cY+8, sz, sz);

                  noFill();
                  strokeWeight(0.5);
                  stroke(CLRS.LINE);

                  beginShape();
                    vertex(d+cX-8,  d+cY-8);
                    vertex(d+cX+4, d+cY-8);
                    vertex(d+cX+8,  d+cY+8);
                    vertex(d+cX-12, d+cY+8);
                  endShape(CLOSE);

                popMatrix();

                break;

            case COMMANDS.Q_KITE[0]:

              pushMatrix();

                translate(0.5,0.5);

                  noStroke();
                  strokeWeight(0);
                  fill(CLRS.VERTEX);

                  ellipse(d+cX,   d+cY, sz, sz);
                  ellipse(d+cX+12, d+cY, sz, sz);

                  noFill();
                  strokeWeight(0.5);
                  stroke(CLRS.LINE);

                  beginShape();
                    vertex(d+cX,    d+cY-12);
                    vertex(d+cX+12, d+cY);
                    vertex(d+cX,    d+cY+12);
                    vertex(d+cX-12, d+cY);
                  endShape(CLOSE);

                popMatrix();

                break;

          default:  break;

        }

      popStyle();

    }
    var drawArc=function(){

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.A_2P[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+cX+10*cos(PI/4),
                    d+cY-10*sin(PI/4),
                    sz, sz);
            ellipse(d+cX-10*cos(PI/4),
                    d+cY+10*sin(PI/4),
                    sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            arc(d+cX, d+cY, 20, 20, PI*3/4, 2*PI*7/8);

            break;

          case COMMANDS.A_CA[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+cX, d+cY, sz, sz);
            ellipse(d+cX+10*cos(PI/4),
                    d+cY-10*sin(PI/4),
                    sz, sz);
            ellipse(d+cX+10*cos(PI/4),
                    d+cY+10*sin(PI/4),
                    sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            arc(d+cX, d+cY, 20, 20, -PI/4, PI/4);

            break;

          case COMMANDS.A_CCA[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            //~ ellipse(d+cX, d+cY, sz, sz);
            ellipse(d+cX+10*cos(PI/4),
                    d+cY-10*sin(PI/4),
                    sz, sz);
            ellipse(d+cX+10*cos(PI),
                    d+cY+10*sin(PI),
                    sz, sz);
            ellipse(d+cX+10*cos(PI/4),
                    d+cY+10*sin(PI/4),
                    sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            arc(d+cX, d+cY, 20, 20, -PI, PI/4);

            break;

          case COMMANDS.A_CS[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+cX, d+cY, sz, sz);
            ellipse(d+cX+10*cos(PI/3),
                    d+cY-10*sin(PI/3),
                    sz, sz);
            ellipse(d+cX+10*cos(PI/3),
                    d+cY+10*sin(PI/3),
                    sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            line(d+cX, d+cY,
                 d+cX+10*cos(PI/3),
                 d+cY+10*sin(PI/3));

            line(d+cX, d+cY,
                 d+cX+10*cos(PI/3),
                 d+cY-10*sin(PI/3));

            arc(d+cX, d+cY, 20, 20, -PI/3, PI/3);

            break;

          case COMMANDS.A_CCS[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            //~ ellipse(d+cX, d+cY, sz, sz);
            ellipse(d+cX+10*cos(PI/4),
                    d+cY-10*sin(PI/4),
                    sz, sz);
            ellipse(d+cX+10*cos(PI),
                    d+cY+10*sin(PI),
                    sz, sz);
            ellipse(d+cX+10*cos(PI/4),
                    d+cY+10*sin(PI/4),
                    sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            line(d+cX, d+cY,
                 d+cX+10*cos(PI/3),
                 d+cY+10*sin(PI/3));

            line(d+cX, d+cY,
                 d+cX+10*cos(PI),
                 d+cY-10*sin(PI));

            arc(d+cX, d+cY, 20, 20, -PI, PI/4);

            break;

          case COMMANDS.COMPASS[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            //~ ellipse(d+cX, d+cY, sz, sz);
            ellipse(d+cX, d+cY, sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.Red);

            ellipse(d+cX, d+cY, 20, 20);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            line(d+cX, d+cY, d+cX+10, d+cY);

            break;

          default:  break;

        }

      popStyle();

    }
    var drawPolygon=function(){

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.POLYGONR[0]:

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+cX+10*cos(2*PI/5),  d+cY+10*sin(2*PI/5));
              vertex(d+cX+10*cos(4*PI/5),  d+cY+10*sin(4*PI/5));
              vertex(d+cX+10*cos(6*PI/5),  d+cY+10*sin(6*PI/5));
              vertex(d+cX+10*cos(8*PI/5),  d+cY+10*sin(8*PI/5));
              vertex(d+cX+10*cos(10*PI/5), d+cY+10*sin(10*PI/5));
            endShape(CLOSE);

            noFill();
            strokeWeight(1);
            stroke(CLRS.LINEA);

            line(d+cX, d+cY, d+cX+10*cos(8*PI/5), d+cY+10*sin(8*PI/5));

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+cX+10*cos(2*PI/5),  d+cY+10*sin(2*PI/5),  sz, sz);
            ellipse(d+cX+10*cos(4*PI/5),  d+cY+10*sin(4*PI/5),  sz, sz);
            ellipse(d+cX+10*cos(6*PI/5),  d+cY+10*sin(6*PI/5),  sz, sz);
            ellipse(d+cX+10*cos(8*PI/5),  d+cY+10*sin(8*PI/5),  sz, sz);
            ellipse(d+cX+10*cos(10*PI/5), d+cY+10*sin(10*PI/5), sz, sz);

            break;

          case COMMANDS.POLYGONRIGID[0]:

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+cX+10*cos(2*PI/5),  d+cY+10*sin(2*PI/5));
              vertex(d+cX+10*cos(4*PI/5),  d+cY+10*sin(4*PI/5));
              vertex(d+cX+10*cos(6*PI/5),  d+cY+10*sin(6*PI/5));
              vertex(d+cX+10*cos(8*PI/5),  d+cY+10*sin(8*PI/5));
              vertex(d+cX+10*cos(10*PI/5), d+cY+10*sin(10*PI/5));
            endShape(CLOSE);

            noFill();
            strokeWeight(1);
            stroke(CLRS.LINEA);

            line(d+cX, d+cY, d+cX+10*cos(8*PI/5), d+cY+10*sin(8*PI/5));

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+cX+10*cos(2*PI/5),  d+cY+10*sin(2*PI/5),  sz, sz);
            ellipse(d+cX+10*cos(4*PI/5),  d+cY+10*sin(4*PI/5),  sz, sz);
            ellipse(d+cX+10*cos(6*PI/5),  d+cY+10*sin(6*PI/5),  sz, sz);
            ellipse(d+cX+10*cos(8*PI/5),  d+cY+10*sin(8*PI/5),  sz, sz);
            ellipse(d+cX+10*cos(10*PI/5), d+cY+10*sin(10*PI/5), sz, sz);

            break;

          case COMMANDS.POLYGONV[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+cX+10*cos(PI/4),
                    d+cY-10*sin(PI/4),
                    sz, sz);
            ellipse(d+cX+10*cos(PI),
                    d+cY+10*sin(PI),
                    sz, sz);
            ellipse(d+cX+10*cos(PI/4),
                    d+cY+10*sin(PI/4),
                    sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+cX+10*cos(PI/4), d+cY-10*sin(PI/4));
              vertex(d+cX+10*cos(PI),   d+cY+10*sin(PI));
              vertex(d+cX+10*cos(PI/4), d+cY+10*sin(PI/4));
            endShape(CLOSE);

            break;

          default:  break;

        }

      popStyle();

    };

    var drawTransform=function(){

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.TRANSLATE[0]:

            pushMatrix();

              translate(0.5,0.5);

                noFill();
                strokeWeight(0.5);
                stroke(CLRS.LINE);

                line(d+cX-9, d+cY,   d+cX+9, d+cY);
                line(d+cX,   d+cY-9, d+cX,   d+cY+9);

                rect(d+cX, d+cY, 4, 4);

                noStroke();
                strokeWeight(0.0);
                fill(CLRS.LINE);

                triangle(d+cX+10, d+cY,    d+cX+6, d+cY-3, d+cX+6, d+cY+3);
                triangle(d+cX-10, d+cY,    d+cX-6, d+cY-3, d+cX-6, d+cY+3);
                triangle(d+cX,    d+cY-10, d+cX-3, d+cY-6, d+cX+3, d+cY-6);
                triangle(d+cX,    d+cY+10, d+cX-3, d+cY+6, d+cX+3, d+cY+6);

            popMatrix();

            break;

          case COMMANDS.REFLECT[0]:

            pushMatrix();

              translate(0.5,0.5);

                noFill();
                strokeWeight(0.25);
                stroke(CLRS.VERTEX);

                line(d+cX, d+cY-12, d+cX, d+cY+12);

                noFill();
                strokeWeight(0.5);
                stroke(CLRS.LINEA);

                triangle(d+cX+3, d+cY-8, d+cX+3, d+cY+8, d+cX+10, d+cY+8);

                stroke(CLRS.LINE);
                triangle(d+cX-3, d+cY-8, d+cX-3, d+cY+8, d+cX-10, d+cY+8);

            popMatrix();

            break;

          case COMMANDS.ROTATE[0]:

            pushMatrix();

              translate(0.5,0.5);

                noFill();
                strokeWeight(0.5);
                stroke(CLRS.LINE);

                arc(d+cX, d+cY, 20, 20, -PI/4, 3/2*PI);

                noStroke();
                strokeWeight(0);
                fill(CLRS.VERTEX);

                triangle(d+cX+2, d+cY-10, d+cX-2, d+cY-6, d+cX-2, d+cY-14);

              popMatrix();

              break;

            case COMMANDS.SCALE[0]:

              pushMatrix();

                translate(0.5,0.5);

                  noFill();
                  strokeWeight(0.5);
                  stroke(CLRS.LINEA);

                  rect(d+cX, d+cY, 20, 20);

                  stroke(CLRS.LINE);

                  rect(d+cX-5, d+cY+5, 10, 10);

                  noFill();
                  strokeWeight(0.5);
                  stroke(CLRS.VERTEX);

                  line(d+cX+1, d+cY-1, d+cX+7, d+cY-7);

                  noStroke();
                  strokeWeight(0);
                  fill(CLRS.VERTEX);

                  triangle(d+cX+7, d+cY-7, d+cX+3, d+cY-7, d+cX+7, d+cY-3);

                popMatrix();

                break;

            case COMMANDS.SHEAR[0]:

              pushMatrix();

                translate(0.5,0.5);

                  noFill();
                  strokeWeight(0.5);
                  stroke(CLRS.LINE);

                  beginShape();
                    vertex(d+cX-8, d+cY-8);
                    vertex(d+cX+4, d+cY-8);
                    vertex(d+cX+8, d+cY+8);
                    vertex(d+cX-8, d+cY+8);
                  endShape(CLOSE);

                  noFill();
                  strokeWeight(0.75);
                  stroke(CLRS.LINEA);

                  line(d+cX+1, d+cY-12, d+cX+1, d+cY+12);

                  noFill();
                  strokeWeight(0.75);
                  stroke(CLRS.VERTEX);

                  line(d+cX-5, d+cY+2, d+cX+4, d+cY+2);

                  noStroke();
                  strokeWeight(0);
                  fill(CLRS.VERTEX);

                  triangle(d+cX+5, d+cY+2, d+cX+2, d+cY-1, d+cX+2, d+cY+5);

                popMatrix();

                break;

          default:  break;

        }

      popStyle();

    }
    var drawGeneral=function(){

      pushMatrix();

        translate(0.5,0.5);

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.TRANSLATE[0]:

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            line(d+cX-9, d+cY,   d+cX+9, d+cY);
            line(d+cX,   d+cY-9, d+cX,   d+cY+9);

            rect(d+cX, d+cY, 4, 4);

            noStroke();
            strokeWeight(0.0);
            fill(CLRS.LINE);

            triangle(d+cX+10, d+cY,    d+cX+6, d+cY-3, d+cX+6, d+cY+3);
            triangle(d+cX-10, d+cY,    d+cX-6, d+cY-3, d+cX-6, d+cY+3);
            triangle(d+cX,    d+cY-10, d+cX-3, d+cY-6, d+cX+3, d+cY-6);
            triangle(d+cX,    d+cY+10, d+cX-3, d+cY+6, d+cX+3, d+cY+6);

            break;

          case COMMANDS.REFLECT[0]:

            noFill();
            strokeWeight(0.25);
            stroke(CLRS.VERTEX);

            line(d+cX, d+cY-12, d+cX, d+cY+12);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINEA);

            triangle(d+cX+3, d+cY-8, d+cX+3, d+cY+8, d+cX+10, d+cY+8);

            stroke(CLRS.LINE);
            triangle(d+cX-3, d+cY-8, d+cX-3, d+cY+8, d+cX-10, d+cY+8);

            break;

          case COMMANDS.ROTATE[0]:

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            arc(d+cX, d+cY, 20, 20, -PI/4, 3/2*PI);

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            triangle(d+cX+2, d+cY-10, d+cX-2, d+cY-6, d+cX-2, d+cY-14);

            break;

          case COMMANDS.SCALE[0]:

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINEA);

            rect(d+cX, d+cY, 20, 20);

            stroke(CLRS.LINE);

            rect(d+cX-5, d+cY+5, 10, 10);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.VERTEX);

            line(d+cX+1, d+cY-1, d+cX+7, d+cY-7);

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            triangle(d+cX+7, d+cY-7, d+cX+3, d+cY-7, d+cX+7, d+cY-3);

            break;

          case COMMANDS.SHEAR[0]:

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+cX-8, d+cY-8);
              vertex(d+cX+4, d+cY-8);
              vertex(d+cX+8, d+cY+8);
              vertex(d+cX-8, d+cY+8);
            endShape(CLOSE);

            noFill();
            strokeWeight(0.75);
            stroke(CLRS.LINEA);

            line(d+cX+1, d+cY-12, d+cX+1, d+cY+12);

            noFill();
            strokeWeight(0.75);
            stroke(CLRS.VERTEX);

            line(d+cX-5, d+cY+2, d+cX+4, d+cY+2);

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            triangle(d+cX+5, d+cY+2, d+cX+2, d+cY-1, d+cX+2, d+cY+5);

            break;

          default:  break;

        }

      popStyle();
      popMatrix();

    }
    var drawMeasure=function(){

      pushMatrix();

        translate(0.5,0.5);

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.DISTANCE[0]:

            //~ Ruler
            fill(CLRS.RULER);
            strokeWeight(0.25);
            stroke(CLRS.BLACK);

            rect(d+cX, d+cY+8, 20, 6);

            strokeWeight(0.5);
            stroke(CLRS.BLACK);

            for(var n=-10; n<10; n+=2){
              if(n%4===0){ line(d+cX+n, d+cY+4, d+cX+n, d+cY+8); }
              else       { line(d+cX+n, d+cY+4, d+cX+n, d+cY+6); }
            }

            stroke(CLRS.LINE);

            line(d+cX-10, d+cY, d+cX-10, d+cY-10);
            line(d+cX+10, d+cY, d+cX+10, d+cY-10);
            line(d+cX-10, d+cY-5, d+cX+10, d+cY-5);

            fill(CLRS.LINE);
            noStroke();
            strokeWeight(0);

            triangle(d+cX-10, d+cY-5, d+cX-7, d+cY-8, d+cX-7, d+cY-2);
            triangle(d+cX+10, d+cY-5, d+cX+7, d+cY-8, d+cX+7, d+cY-2);

            break;

          case COMMANDS.PERIMETER[0]:

            //~ Ruler
            fill(CLRS.RULER);
            strokeWeight(0.25);
            stroke(CLRS.BLACK);

            rect(d+cX, d+cY+8, 20, 6);

            strokeWeight(0.5);
            stroke(CLRS.BLACK);

            for(var n=-10; n<10; n+=2){
              if(n%4===0){ line(d+cX+n, d+cY+4, d+cX+n, d+cY+8); }
              else       { line(d+cX+n, d+cY+4, d+cX+n, d+cY+6); }
            }

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+cX-10, d+cY-12);
              vertex(d+cX+10, d+cY-6);
              vertex(d+cX+10, d+cY+2);
              vertex(d+cX-10, d+cY+2);
            endShape(CLOSE);

            break;

          case COMMANDS.AREA[0]:

            //~ Ruler
            fill(CLRS.RULER);
            strokeWeight(0.25);
            stroke(CLRS.BLACK);

            rect(d+cX, d+cY+8, 20, 6);

            strokeWeight(0.5);
            stroke(CLRS.BLACK);

            for(var n=-10; n<10; n+=2){
              if(n%4===0){ line(d+cX+n, d+cY+4, d+cX+n, d+cY+8); }
              else       { line(d+cX+n, d+cY+4, d+cX+n, d+cY+6); }
            }

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+cX-10, d+cY-12);
              vertex(d+cX+10, d+cY-6);
              vertex(d+cX+10, d+cY+2);
              vertex(d+cX-10, d+cY+2);
            endShape(CLOSE);

            break;


          case COMMANDS.VOLUME[0]:

            //~ Ruler
            fill(CLRS.RULER);
            strokeWeight(0.25);
            stroke(CLRS.BLACK);

            rect(d+cX, d+cY+8, 20, 6);

            strokeWeight(0.5);
            stroke(CLRS.BLACK);

            for(var n=-10; n<10; n+=2){
              if(n%4===0){ line(d+cX+n, d+cY+4, d+cX+n, d+cY+8); }
              else       { line(d+cX+n, d+cY+4, d+cX+n, d+cY+6); }
            }

            fill(CLRS.BLACK);
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            ellipse(d+cX, d+cY+2, 12, 4);

            line(d+cX-6, d+cY-12, d+cX-6, d+cY+2);
            line(d+cX+6, d+cY-12, d+cX+6, d+cY+2);

            ellipse(d+cX, d+cY-12, 12, 4);
            ellipse(d+cX, d+cY-12, 12, 4);

            break;

          case COMMANDS.RADIUS[0]:

            //~ Ruler
            fill(CLRS.RULER);
            strokeWeight(0.25);
            stroke(CLRS.BLACK);

            rect(d+cX, d+cY+8, 20, 6);

            strokeWeight(0.5);
            stroke(CLRS.BLACK);

            for(var n=-10; n<10; n+=2){
              if(n%4===0){ line(d+cX+n, d+cY+4, d+cX+n, d+cY+8); }
              else       { line(d+cX+n, d+cY+4, d+cX+n, d+cY+6); }
            }

            fill(CLRS.BLACK);
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            ellipse(d+cX, d+cY-5, 15, 15);

            pushMatrix();

              translate(d+cX, d+cY-5);

              rotate(-PI/4);

              line(0, 0, 0, -7.5);

              fill(CLRS.LINE);
              noStroke();
              strokeWeight(0);

              triangle(0, -7.5, 3, -5, -3, -4);

            popMatrix();

            break;

          case COMMANDS.DIAMETER[0]:

            //~ Ruler
            fill(CLRS.RULER);
            strokeWeight(0.25);
            stroke(CLRS.BLACK);

            rect(d+cX, d+cY+8, 20, 6);

            strokeWeight(0.5);
            stroke(CLRS.BLACK);

            for(var n=-10; n<10; n+=2){
              if(n%4===0){ line(d+cX+n, d+cY+4, d+cX+n, d+cY+8); }
              else       { line(d+cX+n, d+cY+4, d+cX+n, d+cY+6); }
            }

            fill(CLRS.BLACK);
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            ellipse(d+cX, d+cY-5, 15, 15);

            pushMatrix();

              translate(d+cX, d+cY-5);

              rotate(-PI/4);

              line(0, 7.5, 0, -7.5);

              fill(CLRS.LINE);
              noStroke();
              strokeWeight(0);

              triangle(0, -7.5, 3, -5, -3, -4);
              triangle(0,  7.5, 3,  5, -3,  4);

            popMatrix();

            break;

          case COMMANDS.SLOPE[0]:

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+cX-8, d+cY-8);
              vertex(d+cX+4, d+cY-8);
              vertex(d+cX+8, d+cY+8);
              vertex(d+cX-8, d+cY+8);
            endShape(CLOSE);

            noFill();
            strokeWeight(0.75);
            stroke(CLRS.LINEA);

            line(d+cX+1, d+cY-12, d+cX+1, d+cY+12);

            noFill();
            strokeWeight(0.75);
            stroke(CLRS.VERTEX);

            line(d+cX-5, d+cY+2, d+cX+4, d+cY+2);

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            triangle(d+cX+5, d+cY+2, d+cX+2, d+cY-1, d+cX+2, d+cY+5);

            break;

          default:  break;

        }

      popStyle();
      popMatrix();

    };

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          //~ rectMode(CENTER);

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit && p.parent.hit){

            if(app.left){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);

            cursor(HAND);

          }

          if(p.v){ fill(getProp(p.g)); }

          rect(d, d, p.w, p.h, p.r);

          switch(true){

            case (p.c>=COMMANDS.POINT[0] &&
                  p.c<=COMMANDS.P_MIDPOINT[0]): drawPoint();      break;
            case (p.c>=COMMANDS.LINE[0] &&
                  p.c<=COMMANDS.V_FP[0]):       drawLine();       break;
            case (p.c>=COMMANDS.TRIANGLE[0] &&
                  p.c<=COMMANDS.T_SCALENE[0]):  drawTriangle();   break;
            case (p.c>=COMMANDS.CIRCLE[0] &&
                  p.c<=COMMANDS.C_3P[0]):       drawCircle();     break;
            case (p.c>=COMMANDS.QUAD[0] &&
                  p.c<=COMMANDS.Q_KITE[0]):     drawQuad();       break;
            case (p.c>=COMMANDS.ARC[0] &&
                  p.c<=COMMANDS.COMPASS[0]):    drawArc();        break;
            case (p.c>=COMMANDS.POLYGON[0] &&
                  p.c<=COMMANDS.POLYGONV[0]):   drawPolygon();    break;
            case (p.c>=COMMANDS.TRANSLATE[0] &&
                  p.c<=COMMANDS.SHEAR[0]):      drawTransform();  break;
            case (p.c>=COMMANDS.TRANSLATE[0] &&
                  p.c<=COMMANDS.SHEAR[0]):      drawTransform();  break;
            case (p.c>=COMMANDS.MEASURE[0] &&
                  p.c<=COMMANDS.SLOPE[0]):      drawMeasure();    break;

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

      //~ this.parent.v=!this.parent.v;

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
            fill(app.color);
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
          if     (p.alignX===LEFT)  { rect(d, d, p.w, p.h, p.r); }
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

  //~ Strip ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
            cursor(ARROW);
          }

          noStroke();

          rect(d, d, p.w, p.h, p.r);

          fill(color(32,32,32));

          if(p.hit && p.hitExpand){
            fill(color(48,48,48));
          }

          rect(d+p.w-9, d+1, 8, p.h-2, 0);

          fill(CLRS.Gray_9);

          if(p.hit && p.hitExpand){
            fill(CLRS.Gray_6);
          }

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

        if(mouseX>x+this.x+this.w-10){
          this.hitExpand=true;
        }
        else{
          this.hitExpand=false;
        }

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

      if(app.origin){

        noStroke();

        if(this.hit){ fill(CLRS.RED); }
        else        { fill(CLRS.RED, 25); }

        ellipse(0,0,6,6);

      };

    };
    var axis=function(){

      noFill();
      stroke(getColor(CLRS.WHITE,20));
      strokeWeight(0.5);

      if(app.axisx){ line(-p.w/2, 0, p.w/2, 0); }
      if(app.axisy){ line(0,-p.h/2, 0, p.h/2);  }

    };
    var lines=function(){

      noFill();
      stroke(getColor(CLRS.WHITE,10));
      strokeWeight(0.25);

      if(app.linesx){
        for(var n=1; n<p.w/2/incr; n++){

          if(n%5===0){ strokeWeight(0.75);  }
          else       { strokeWeight(0.25); }

          line( n*incr, -p.h/2,  n*incr, p.h/2);
          line(-n*incr, -p.h/2, -n*incr, p.h/2);

        }
      }
      if(app.linesy){

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

      if(app.arrowsx){

        triangle(-p.w/2, 0, -p.w/2+7, 3, -p.w/2+7, -3);   //~ left
        triangle( p.w/2, 0,  p.w/2-7, 3,  p.w/2-7, -3);   //~ right

      }
      if(app.arrowsy){

        triangle( 0,  p.h/2, 3,  p.h/2-7, -3,  p.h/2-7);  //~ top
        triangle( 0, -p.h/2, 3, -p.h/2+7, -3, -p.h/2+7);  //~ bottom

      }

    };
    var ticks=function(){

      noFill();
      stroke(getColor(CLRS.Gray8,100));
      strokeWeight(0.25);

      if(app.ticksx){
        for(var n=0; n<p.w/2/incr; n++){
          line( n*incr, 3,  n*incr, -3);
          line(-n*incr, 3, -n*incr, -3);
        }
      }
      if(app.ticksy){
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
          fill(getColor(CLRS.WHITE,20));
          strokeWeight(0.25);

          textSize(9);

          //~ x-axis
          textAlign(CENTER,TOP);

          if(app.labelsx){
            for(var n=1; n<p.w/2/incr; n++){
              text( n, n*incr, 3);
              text( n,-n*incr, 3);
            }
          }

          //~ y-axis
          textAlign(RIGHT,CENTER);

          if(app.labelsy){
            for(var n=1; n<p.h/2/incr; n++){
              text( n, -5,  n*incr);
              text( n, -5, -n*incr);
            }
          }

      popMatrix();

    };
    var crosshair=function(){

      var sz=app.cursorSize;

      pushStyle();

        noCursor();

        pushMatrix();

          resetMatrix();
          translate(0.5,0.5);

            rectMode(CENTER);

            stroke(app.color);

            if(sz===0){

              //~ horizontal
              line(0, mouseY, mouseX-5,  mouseY);
              line(mouseX+5,  mouseY, p.x+p.w, mouseY);

              //~ vertical
              line(mouseX, 0, mouseX, mouseY-5);
              line(mouseX, mouseY+5, mouseX, p.y+p.h);

            }
            else{

              //~ horizontal
              line(mouseX-sz, mouseY, mouseX-5,  mouseY);
              line(mouseX+5,  mouseY, mouseX+sz, mouseY);

              //~ vertical
              line(mouseX, mouseY-5, mouseX, mouseY-sz);
              line(mouseX, mouseY+5, mouseX, mouseY+sz);

            }

            noFill();

            rect(mouseX,mouseY,8,8);

        popMatrix();

      popStyle();

    };
    pushMatrix();

      translate(p.x+p.w/2+0.5, p.y+p.h/2+0.5);
      scale(1,-1);

        pushStyle();

          border();
          axis();
          lines();
          arrows();
          ticks();
          labels();
          origin();
          if(app.focus===p.i)      { crosshair(); }
          //~ cursor(CROSS);

          stroke(app.color);
          strokeWeight(3);
          noFill();
          //~ ellipse(0,0,300,200);

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();

  };
  grid.prototype.clicked=function(){

    println(app.shapes.length);

    var p=new pt(mouseX,mouseY);

    println(p.x +","+p.y);

    switch(app.command){

      case COMMANDS.P_DEFAULT:

        var pnts=[p];

        app.shapes.push(new POINT(new propS(getGUID(), pnts)));

        println(app.shapes.length);

        break;

      default:                  break;

    };

  };

  var n=100;

  var process;

  var main=function(){

    //~ background(getColor(CLRS.BLACK,n));

    //~ if(n<100){ n++; }

    //~ app.frameRate=frameCount;
    //~
    //~ frameRate(app.frameRate);

    for(var c in app.ctrls){ app.ctrls[c].draw() }

  };

  //~ translate(0.5,0.5);

  //~ var draw=function(){ process(); };


  //~ Events ===========================================================

  var mouseClicked=function(){

    switch(mouseButton){

      case LEFT:

        for(var c in app.ctrls){ app.ctrls[c].clicked() }
        break;

      case RIGHT:

        //~ println(mouseButton);

        //~ for(var c in app.ctrls){ app.ctrls[c].clickedR() }
        break;

      case CENTER:

        //~ for(var c in app.ctrls){ app.ctrls[c].clicked() }
        break;

      default:    break;

    }
    process();
  };
  var mouseMoved=function(){
    app.mouseX=mouseX;
    app.mouseY=mouseY;
    for(var c in app.ctrls){ app.ctrls[c].moved(0,0) }
    process();
  };
  var mouseDragged=function(){
    //~ app.left=true;
    for(var c in app.ctrls){ app.ctrls[c].dragged() }
    process();
  };
  var mousePressed=function(){

    switch(mouseButton){

      case LEFT:    app.left=true;    break;
      case CENTER:  app.center=true;  break;
      case RIGHT:   app.right=true;   break;

      default:                        break;

    }

    for(var c in app.ctrls){ app.ctrls[c].pressed() }
    process();
  };
  var mouseReleased=function(){

    //~ println(mouseButton);

    app.left=false;
    app.center=false;
    app.right=false;

    for(var c in app.ctrls){ app.ctrls[c].released() }
    process();
  };
  var mouseOut=function(){
    for(var c in app.ctrls){ app.ctrls[c].out() }
    process();
  };
  var mouseOver=function(){
    for(var c in app.ctrls){ app.ctrls[c].over() }
    process();
  };

  var keyPressed=function(){
    app.keys[keyCode]=true;
    //~ println(app.keys);
    for(var c in app.ctrls){ app.ctrls[c].pressed() }
  };
  var keyReleased=function(){
    app.keys[keyCode]=false;
    println(app.keys);
    for(var c in app.ctrls){ app.ctrls[c].released() }
  };
  var keyTyped=function(){
    println(keyCode);
    for(var c in app.ctrls){ app.ctrls[c].typed() }
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
            new propC(getGUID(), parent, 500,50, w+10, w, 1, true, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ Points ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ POINT:            [ -100, 'Point',            'POINT'         ],
    //~ P_OBJECT:         [ -101, 'P_Object',         'P_OBJECT'      ],
    //~ P_INTERSECT:      [ -102, 'P_Intersect',      'P_INTERSECT'   ],
    //~ P_MIDPOINT:       [ -103, 'P_Midpoint',       'P_MIDPOINT'    ],

    //~ for(var n in COMMANDS){

      //~ ctrls.push(new buttonI(
                  //~ new propC(getGUID(), cn, n*w, 0, w, w, 0, false, COMMANDS[n], COMMANDS[n]),
                  //~ getStyle(STYLES.BUTTON),
                  //~ getStyle(STYLES.TEXT)));
                  //~ println(n);
                  //~ println(COMMANDS[n]);

    //~ }

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, false, COMMANDS.P_DEFAULT[0], COMMANDS.P_DEFAULT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, false, COMMANDS.P_DEFAULT[0], COMMANDS.P_DEFAULT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, false, COMMANDS.P_OBJECT[0], COMMANDS.P_OBJECT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, false, COMMANDS.P_INTERSECT[0], COMMANDS.P_INTERSECT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 4*w, 0, w, w, 0, false, COMMANDS.P_MIDPOINT[0], COMMANDS.P_MIDPOINT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getLines=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;
    var l=parent.w-202;
    var ch=app.height-14;
    var w=36;

    var cn=new strip(
            new propC(getGUID(), parent, 500, 95, w+10, w, 1, true, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ L_2P:         [-200, 'Line2P',           'LINE2P'                 ],    //~ through 2 points
    //~ L_SEGMENT2P:  [-201,  'Line',             'LINE'                  ],    //~ between 2 points
    //~ L_SEGMENTLEN: [-202,  'Line',             'LINE'                  ],    //~ from point given length
    //~ L_PERP:       [-203,  'LinePerp',         'LINEPERP'              ],    //~ perpendicular
    //~ L_PERPB:      [-204,  'LinePerpB',        'LINEPERPB'             ],    //~  perpendicular bisector
    //~ L_ANGB:       [-205,  'LineAngB',         'LINEANGB'              ],    //~ angle bisector
    //~ L_PARR:       [-206,  'LineParr',         'LINEPARR'              ],    //~ parallel
    //~ L_TANGENT:    [-207,  'LineTangent',      'LINETANGENT'           ],    //~ Tangent
    //~ L_DIAMETER:   [-208,  'LineDiameter',     'LINEDIAMETER'          ],    //~ Diameter
    //~ L_RADIUS:     [-209,  'LineRadius',       'LINERADIUS'            ],    //~ Radius

    //~ RAY_2P:       [-210,  'Ray2P',            'RAY2P'                 ],    //~ Ray between 2 points
    //~ V_2P:         [-211,  'Vector2P',         'VECTOR2P'              ],    //~ Vector between 2 points
    //~ V_FP:         [-212,  'VectorFP',         'VECTORFP'              ],    //~ Vector from point

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, false, COMMANDS.L_2P[0], COMMANDS.L_2P[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, false, COMMANDS.L_2P[0], COMMANDS.L_2P[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, false, COMMANDS.L_SEGMENT2P[0], COMMANDS.L_SEGMENT2P[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, false, COMMANDS.L_SEGMENTLEN[0], COMMANDS.L_SEGMENTLEN[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 4*w, 0, w, w, 0, false, COMMANDS.L_PERP[0], COMMANDS.L_PERP[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 5*w, 0, w, w, 0, false, COMMANDS.L_PERPB[0], COMMANDS.L_PERPB[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 6*w, 0, w, w, 0, false, COMMANDS.L_ANGB[0], COMMANDS.L_ANGB[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 7*w, 0, w, w, 0, false, COMMANDS.L_PARR[0], COMMANDS.L_PARR[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 8*w, 0, w, w, 0, false, COMMANDS.L_TANGENT[0], COMMANDS.L_TANGENT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 9*w, 0, w, w, 0, false, COMMANDS.L_DIAMETER[0], COMMANDS.L_DIAMETER[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 10*w, 0, w, w, 0, false, COMMANDS.L_RADIUS[0], COMMANDS.L_RADIUS[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 11*w, 0, w, w, 0, false, COMMANDS.RAY_2P[0], COMMANDS.RAY_2P[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 12*w, 0, w, w, 0, false, COMMANDS.V_2P[0], COMMANDS.V_2P[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 13*w, 0, w, w, 0, false, COMMANDS.V_FP[0], COMMANDS.V_2P[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getTriangles=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;
    var l=parent.w-202;
    var ch=app.height-14;
    var w=36;

    var cn=new strip(
            new propC(getGUID(), parent, 500,140, w+10, w, 1, true, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ Triangle (T)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ TRIANGLE:     [-300,  'Triangle',         'TRIANGLE'              ],
    //~ T_EQUILATERAL:[-301,  'T_Equilateral',    'T_EQUILATERAL'         ],
    //~ T_ISOSCELES:  [-302,  'T_Isosceles',      'T_ISOSCELES'           ],
    //~ T_SCALENE:    [-303,  'T_Scalene',        'T_SCALENE'             ],

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, false, COMMANDS.T_EQUILATERAL[0], COMMANDS.T_EQUILATERAL[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, false, COMMANDS.T_EQUILATERAL[0], COMMANDS.T_EQUILATERAL[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, false, COMMANDS.T_ISOSCELES[0], COMMANDS.T_ISOSCELES[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, false, COMMANDS.T_SCALENE[0], COMMANDS.T_SCALENE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getCircles=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;
    var l=parent.w-202;
    var ch=app.height-14;
    var w=36;

    var cn=new strip(
            new propC(getGUID(), parent, 500, 185, w+10, w, 1, true, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ Circle (C)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ CIRCLE:       [-400,  'Circle',           'CIRCLE'                ],
    //~ C_CENTERP:    [-401,  'CircleCenterP',    'CIRCLECENTERP'         ],    //~ center point
    //~ C_CENTERR:    [-402,  'CircleCenterR',    'CIRCLECENTERR'         ],    //~ center radius
    //~ C_3P:         [-403,  'Circle3P',         'CIRCL3P'               ],    //  3 points
    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, false, COMMANDS.C_CENTERP[0], COMMANDS.C_CENTERP[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, false, COMMANDS.C_CENTERP[0], COMMANDS.C_CENTERP[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, false, COMMANDS.C_CENTERR[0], COMMANDS.C_CENTERR[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, false, COMMANDS.C_3P[0], COMMANDS.C_3P[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getQuads=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;
    var l=parent.w-202;
    var ch=app.height-14;
    var w=36;

    var cn=new strip(
            new propC(getGUID(), parent, 500, 230, w+10, w+10, 1, true, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ Quadrilateral (C)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ QUADRILATERAL:[1500,  'Quadrilateral',    'QUADRILATERAL'         ],
    //~ Q_RECTANGLE:  [1501,  'Rectangle',        'RECTANGLE'             ],
    //~ Q_SQUARE:     [1502,  'Square',           'SQUARE'                ],
    //~ Q_RHOMBUS:    [1503,  'Rhombus',          'RHOMBUS'               ],
    //~ Q_PGRAM:      [1504,  'Parallelogram',    'PARALLELOGRAM'         ],    //~ Q_PARALLELOGRAM
    //~ Q_TRAPEZOID:  [1505,  'Trapezoid',        'TRAPEZOID'             ],
    //~ Q_KITE:       [1506,  'Kite',             'KITE'                  ],

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, false, COMMANDS.Q_RECTANGLE[0], COMMANDS.Q_RECTANGLE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, false, COMMANDS.Q_RECTANGLE[0], COMMANDS.Q_RECTANGLE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, false, COMMANDS.Q_SQUARE[0], COMMANDS.Q_SQUARE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, false, COMMANDS.Q_RHOMBUS[0], COMMANDS.Q_RHOMBUS[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 4*w, 0, w, w, 0, false, COMMANDS.Q_PGRAM[0], COMMANDS.Q_PGRAM[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 5*w, 0, w, w, 0, false, COMMANDS.Q_TRAPEZOID[0], COMMANDS.Q_TRAPEZOID[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 6*w, 0, w, w, 0, false, COMMANDS.Q_KITE[0], COMMANDS.Q_KITE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getArcs=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;
    var l=parent.w-202;
    var ch=app.height-14;
    var w=36;

    var cn=new strip(
            new propC(getGUID(), parent, 500, 275, w+10, w, 1, true, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ Arc (A)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ ARC:          [-500,  'Arc',              'ARC'                   ],
    //~ A_2P:         [-501,  'Arc2P',            'ARC2P'                 ],    //~SEMICIRCLETHROUGH2POINTS
    //~ A_1:          [-502,  'Arc1',             'ARC1'                  ],    //~Circulararc
    //~ A_2:          [-503,  'Arc2',             'ARC2'                  ],    //~CIRCUMCIRCULARARC
    //~ A_3:          [-504,  'Arc3',             'ARC4'                  ],    //~ CIRCULARSECTOR
    //~ A_4:          [-505,  'Arc4',             'ARC4'                  ],    //~ CIRCUMCIRCULARSECTOR
    //~ COMPASS:      [-506,  'Compass',          'COMPASS'               ],    //~ ??
    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, false, COMMANDS.A_2P[0], COMMANDS.A_2P[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, false, COMMANDS.A_2P[0], COMMANDS.A_2P[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, false, COMMANDS.A_CA[0], COMMANDS.A_CA[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, false, COMMANDS.A_CCA[0], COMMANDS.A_CCA[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 4*w, 0, w, w, 0, false, COMMANDS.A_CS[0], COMMANDS.A_CS[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 5*w, 0, w, w, 0, false, COMMANDS.A_CCS[0], COMMANDS.A_CCS[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 6*w, 0, w, w, 0, false, COMMANDS.COMPASS[0], COMMANDS.COMPASS[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getPolygons=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;
    var l=parent.w-202;
    var ch=app.height-14;
    var w=36;

    var cn=new strip(
            new propC(getGUID(), parent, 900, 320, w+10, w, 1, true, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

      //~ Polygon ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ POLYGON:      [-600,  'Polygon',          'POLYGON'               ],
    //~ POLYGONR:     [-601,  'PolygonR',         'POLYGONR'              ],    //~ regular
    //~ POLYGONRIGID: [-602,  'PolygonRigid',     'POLYGONRIGID'          ],    //~ Rigid
    //~ POLYGONV:     [-603,  'PolygonV',         'POLYGONV'              ],    //~ Vector
    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, false, COMMANDS.POLYGONR[0], COMMANDS.POLYGONR[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, false, COMMANDS.POLYGONR[0], COMMANDS.POLYGONR[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, false, COMMANDS.POLYGONRIGID[0], COMMANDS.POLYGONRIGID[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, false, COMMANDS.POLYGONV[0], COMMANDS.POLYGONV[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getConics=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;
    var l=parent.w-202;
    var ch=app.height-14;
    var w=36;

    var cn=new strip(
            new propC(getGUID(), parent, 500, 320, w+10, w, 1, true, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ Conics (S) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ CONIC:        [-700,  'Conic',            'CONIC'                 ],
    //~ S_ELLIPSE:    [-700,  'Ellipse',          'ELLIPSE'               ],
    //~ S_HYPERBOLA:  [-701,  'Hyperbola',        'HYPERBOLA'             ],
    //~ S_PARABOLA:   [-702,  'Parabola',         'PARABOLA'              ],
    //~ S_5POINTS:    [-703,  'Conic5points',     'CONIC5POINTS'          ],
    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, false, COMMANDS.CONIC[0], COMMANDS.CONIC[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, false, COMMANDS.S_ELLIPSE[0], COMMANDS.S_ELLIPSE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, false, COMMANDS.S_HYPERBOLA[0], COMMANDS.S_HYPERBOLA[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, false, COMMANDS.S_PARABOLA[0], COMMANDS.S_PARABOLA[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 4*w, 0, w, w, 0, false, COMMANDS.S_5POINTS[0], COMMANDS.S_5POINTS[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getAngles=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;
    var l=parent.w-202;
    var ch=app.height-14;
    var w=36;

    var cn=new strip(
            new propC(getGUID(), parent, 500, 365, w+10, w, 1, true, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ Angle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ ANGLE:        [-800,  'Angle',            'ANGLE'                 ],
    //~ ANGLE_SIZE:   [-801,  'AngelSize',        'ANGELSIZE'             ],
    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, false, COMMANDS.ANGLE[0], COMMANDS.ANGLE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, false, COMMANDS.ANGLE_SIZE[0], COMMANDS.ANGLE_SIZE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getAnnotations=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;
    var l=parent.w-202;
    var ch=app.height-14;
    var w=36;

    var cn=new strip(
            new propC(getGUID(), parent, 500, 410, w+10, w, 1, true, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ Annotation ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ TEXT:         [-900,  'Text',             'TEXT'                  ],
    //~ TEXT:         [-901,  'Text',             'TEXT'                  ],
    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, false, COMMANDS.TEXT[0], COMMANDS.TEXT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, false, COMMANDS.TEXT[0], COMMANDS.TEXT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getTransform=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;
    var l=parent.w-202;
    var ch=app.height-14;
    var w=36;

    var cn=new strip(
            new propC(getGUID(), parent, 600, 460, w+10, w, 1, true, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ MODIFY:       [ 600,  'Modify',           'MODIFY'                ],
    //~ TRANSLATE:    [ 601,  'Translate',        'TRANSLATE'             ],
    //~ TRANSVECTOR:  [ 602,  'Transvector',      'TRANSVECTOR'           ],    //~ TranslateByVector

    //~ REFLECT:      [ 603,  'Reflect',          'REFLECT'               ],
    //~ REFLECTTLINE: [ 604,  'ReflectLine',      'REFLECTLINE'           ],    //~ ReflectAboutLIne
    //~ REFLECTPOINT: [ 605,  'ReflectPoint',     'REFLECTPOINT'          ],    //~ ReflectAboutPoint
    //~ REFLECTCIRCLE:[ 606,  'ReflectCircle',    'REFLECTCIRCLE'         ],    //~ ReflectAboutCircle

    //~ ROTATE:       [ 607,  'Rotate',           'ROTATE'                ],
    //~ ROTATEPOINT:  [ 608,  'RotatePoint',      'ROTATEPOINT'           ],    //~ RotateAroundPoint

    //~ SCALE:        [ 609,  'Scale',            'SCALE'                 ],
    //~ SHEAR:        [ 610,  'Shear',            'SHEAR'                 ],

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, false, COMMANDS.TRANSLATE[0], COMMANDS.TRANSLATE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, false, COMMANDS.TRANSLATE[0], COMMANDS.TRANSLATE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, false, COMMANDS.REFLECT[0], COMMANDS.REFLECT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, false, COMMANDS.ROTATE[0], COMMANDS.ROTATE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 4*w, 0, w, w, 0, false, COMMANDS.SCALE[0], COMMANDS.SCALE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 5*w, 0, w, w, 0, false, COMMANDS.SHEAR[0], COMMANDS.SHEAR[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getMeasure=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;
    var l=parent.w-202;
    var ch=app.height-14;
    var w=36;

    var cn=new strip(
            new propC(getGUID(), parent, 200,460, w+10, w, 1, true, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ MEASURE:      [ 700,  'Measure',          'MEASURE'               ],
    //~ DISTANCE:     [ 701,  'Distance',         'DISTANCE'              ],
    //~ PERIMETER:    [ 702,  'Perimeter',        'PERIMETER'             ],
    //~ AREA:         [ 703,  'Area',             'AREA'                  ],
    //~ VOLUME:       [ 704,  'Volume',           'VOLUME'                ],
    //~ RADIUS:       [ 705,  'Radius',           'RADIUS'                ],
    //~ DIAMETER:     [ 706,  'Diamter',          'DIAMETER'              ],
    //~ SLOPE:        [ 707,  'Slope',            'SLOPE'                 ],

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, false, COMMANDS.DISTANCE[0], COMMANDS.DISTANCE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, false, COMMANDS.DISTANCE[0], COMMANDS.DISTANCE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, false, COMMANDS.PERIMETER[0], COMMANDS.PERIMETER[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, false, COMMANDS.AREA[0], COMMANDS.AREA[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 4*w, 0, w, w, 0, false, COMMANDS.VOLUME[0], COMMANDS.VOLUME[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 5*w, 0, w, w, 0, false, COMMANDS.RADIUS[0], COMMANDS.RADIUS[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 6*w, 0, w, w, 0, false, COMMANDS.DIAMETER[0], COMMANDS.DIAMETER[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonI(
                new propC(getGUID(), cn, 7*w, 0, w, w, 0, false, COMMANDS.SLOPE[0], COMMANDS.SLOPE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    cn.ctrls=ctrls;

    return cn;

  };

  var getGrid=function(parent){

    var ctrls=[];

    var cn=new grid(
            new propC(getGUID(), parent, 5, 5, parent.w-10, parent.h-10, 5, false, COMMANDS.UNDEF[0], 0),
            new propL(CLRS.GRID, getColor(CLRS.GRID,65), CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

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
            new propC(getGUID(),parent, l, 2, 200, ch, 3, false, COMMANDS.CONTAINER[0],COMMANDS.CONTAINER[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ Labels ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ctrls.push(new label(
                new propC(getGUID(), cn, cn.w/2, 10, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.TELEMETRY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+0*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.DEBUG[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+1*h+5, 150, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.SPACER[0]),
                getStyle(STYLES.SPACER),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+2*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.WIDTH[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+3*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.HEIGHT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+4*h+5, 150, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.SPACER[0]),
                getStyle(STYLES.SPACER),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+5*h, 10, 10, 0, false, COMMANDS.FRAMERATE[0], COMMANDS.FRAMERATE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+6*h, 10, 10, 0, false, COMMANDS.FRAMERATEA[0], COMMANDS.FRAMERATEA[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+7*h+5, 150, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.SPACER[0]),
                getStyle(STYLES.SPACER),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+8*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.MOUSEX[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));


    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+9*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.MOUSEY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+10*h+5, 150, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.SPACER[0]),
                getStyle(STYLES.SPACER),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+11*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.LEFT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+12*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.CENTER[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+13*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.RIGHT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+15*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.FOCUS[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+17*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.COMMAND[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    //~ Values ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+0*h+5, 10, 10, 0, false, COMMANDS.DEBUG[0], COMMANDS.DEBUG[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+2*h, 10, 10, 0, false, COMMANDS.WIDTH[0], COMMANDS.WIDTH[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+3*h, 10, 10, 0, false, COMMANDS.HEIGHT[0], COMMANDS.HEIGHT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+5*h, 10, 10, 0, 30, COMMANDS.FRAMERATE[0], COMMANDS.FRAMERATE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+6*h, 10, 10, 0, false, COMMANDS.FRAMERATEA[0], COMMANDS.FRAMERATEA[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+8*h, 10, 10, 0, false, COMMANDS.MOUSEX[0], COMMANDS.MOUSEX[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));


    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+9*h, 10, 10, 0, false, COMMANDS.MOUSEY[0], COMMANDS.MOUSEY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));


    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+11*h, 10, 10, 0, false, COMMANDS.LEFT[0], COMMANDS.LEFT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+12*h, 10, 10, 0, false, COMMANDS.CENTER[0], COMMANDS.CENTER[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+13*h, 10, 10, 0, false, COMMANDS.RIGHT[0], COMMANDS.RIGHT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 50, top+15*h, 10, 10, 0, false, COMMANDS.FOCUS[0], COMMANDS.FOCUS[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+17*h, 10, 10, 0, false, COMMANDS.COMMAND[0], COMMANDS.COMMAND[1]),
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
            new propC(getGUID(),parent, l, 2, 200, ch, 3, false, COMMANDS.CONTAINER[0],COMMANDS.CONTAINER[1]),
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
                new propC(getGUID(), cn, cn.w/2, 10, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.PROPERTIES[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l+5, top+0*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.NAME[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l+5, top+1*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.CAPTION[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l+5, top+2*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.FORMULA[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, l+5, top+3*h+5, 150, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.SPACER[0]),
                getStyle(STYLES.SPACER),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l+5, top+4*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.COLOR[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l+5, top+5*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.LAYER[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l+5, top+6*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.LINETYPE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l+5, top+7*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.LINEWEIGHT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+100, top+0*h, 10, 10, 0, false, COMMANDS.NAME[0], COMMANDS.NAME[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+100, top+1*h, 10, 10, 0, false, COMMANDS.CAPTION[0], COMMANDS.CAPTION[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+100, top+2*h, 10, 10, 0, false, COMMANDS.FORMULA[0], COMMANDS.FORMULA[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+100, top+4*h, 10, 10, 0, false, COMMANDS.COLOR[0], COMMANDS.COLOR[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+100, top+5*h, 10, 10, 0, false, COMMANDS.LAYER[0], COMMANDS.LAYER[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+100, top+6*h, 10, 10, 0, false, COMMANDS.LINETYPE[0], COMMANDS.LINETYPE[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+100, top+7*h, 10, 10, 0, false, COMMANDS.LINEWEIGHT[0], COMMANDS.LINEWEIGHT[1]),
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
            new propC(getGUID(),parent, 275, 100, 200, 270, 3, false, COMMANDS.UNDEF[0],0),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ Colors
    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+0*h, top, h, h, 0, false, COMMANDS.COLOR[0] ,CLRS.Red),
                new propL(CLRS.Red, CLRS.Red, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+1*h+5, top, h, h, 0, false, COMMANDS.COLOR[0], CLRS.RedOrange),
                new propL(CLRS.RedOrange, CLRS.RedOrange, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+2*h+10, top, h, h, 0, false, COMMANDS.COLOR[0], CLRS.Orange),
                new propL(CLRS.Orange, CLRS.Orange, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+3*h+15, top, h, h, 0, false, COMMANDS.COLOR[0], CLRS.YellowOrange),
                new propL(CLRS.YellowOrange, CLRS.YellowOrange, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+4*h+20, top, h, h, 0, false, COMMANDS.COLOR[0], CLRS.Yellow),
                new propL(CLRS.Yellow, CLRS.Yellow, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+5*h+25, top, h, h, 0, false, COMMANDS.COLOR[0], CLRS.YellowGreen),
                new propL(CLRS.YellowGreen, CLRS.YellowGreen, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+0*h, top+1*h+5, h, h, 0, false, COMMANDS.COLOR[0], CLRS.Green),
                new propL(CLRS.Green, CLRS.Green, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+1*h+5, top+1*h+5, h, h, 0, false, COMMANDS.COLOR[0], CLRS.BlueGreen),
                new propL(CLRS.BlueGreen, CLRS.BlueGreen, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+2*h+10, top+1*h+5, h, h, 0, false, COMMANDS.COLOR[0], CLRS.Blue),
                new propL(CLRS.Blue, CLRS.Blue, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+3*h+15, top+1*h+5, h, h, 0, false, COMMANDS.COLOR[0], CLRS.BlueViolet),
                new propL(CLRS.BlueViolet, CLRS.BlueViolet, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+4*h+20, top+1*h+5, h, h, 0, false, COMMANDS.COLOR[0], CLRS.Violet),
                new propL(CLRS.Violet, CLRS.Violet, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+5*h+25, top+1*h+5, h, h, 0, false, COMMANDS.COLOR[0], CLRS.RedViolet),
                new propL(getColor(CLRS.RedViolet,90), CLRS.RedViolet, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    //~ Gray Scale
    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+0*h, top+2*h+10, h, h, 0, false, COMMANDS.COLOR[0] ,CLRS.White),
                new propL(CLRS.White, CLRS.White, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+1*h+5, top+2*h+10, h, h, 0, false, COMMANDS.COLOR[0], CLRS.Gray1),
                new propL(CLRS.Gray1, CLRS.Gray1, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+2*h+10, top+2*h+10, h, h, 0, false, COMMANDS.COLOR[0], CLRS.Gray2),
                new propL(CLRS.Gray2, CLRS.Gray2, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+3*h+15, top+2*h+10, h, h, 0, false, COMMANDS.COLOR[0], CLRS.Gray3),
                new propL(CLRS.Gray3, CLRS.Gray3, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+4*h+20, top+2*h+10, h, h, 0, false, COMMANDS.COLOR[0], CLRS.Gray4),
                new propL(CLRS.Gray4, CLRS.Gray4, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+5*h+25, top+2*h+10, h, h, 0, false, COMMANDS.COLOR[0], CLRS.Gray5),
                new propL(CLRS.Gray5, CLRS.Gray5, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+0*h, top+3*h+15, h, h, 0, false, COMMANDS.COLOR[0], CLRS.Gray6),
                new propL(CLRS.Gray6, CLRS.Gray6, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+1*h+5, top+3*h+15, h, h, 0, false, COMMANDS.COLOR[0], CLRS.Gray7),
                new propL(CLRS.Gray7, CLRS.Gray7, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+2*h+10, top+3*h+15, h, h, 0, false, COMMANDS.COLOR[0], CLRS.Gray8),
                new propL(CLRS.Gray8, CLRS.Gray8, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+3*h+15, top+3*h+15, h, h, 0, false, COMMANDS.COLOR[0], CLRS.Gray9),
                new propL(CLRS.Gray9, CLRS.Gray9, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+4*h+20, top+3*h+15, h, h, 0, false, COMMANDS.COLOR[0], CLRS.Gray10),
                new propL(CLRS.Gray10, CLRS.Gray10, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+5*h+25, top+3*h+15, h, h, 0, false, COMMANDS.COLOR[0], CLRS.Black),
                new propL(getColor(CLRS.Black,90), CLRS.Black, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    //~ Current Color
    ctrls.push(new buttonP(
                new propC(getGUID(),cn, l+5*h+25, top+5*h+15, 40, 40, 0, false, COMMANDS.COLORG[0], COMMANDS.COLORG[0]),
                new propL(getColor(CLRS.Black,90), CLRS.Black, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l, top+5*h+20, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.RED[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.RED, CLRS.YELLOW, LEFT, CENTER, 14, 14)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l, top+5*h+40, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.GREEN[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.GREEN, CLRS.YELLOW, LEFT, CENTER, 14, 14)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l, top+5*h+60, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.BLUE[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.BLUE, CLRS.YELLOW, LEFT, CENTER, 14, 14)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+60, top+5*h+20, 10, 10, 0, false, COMMANDS.RED[0], COMMANDS.RED[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.RED, CLRS.YELLOW, LEFT, CENTER, 14, 14)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+60, top+5*h+40, 10, 10, 0, false, COMMANDS.GREEN[0], COMMANDS.GREEN[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.GREEN, CLRS.YELLOW, LEFT, CENTER, 14, 14)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+60, top+5*h+60, 10, 10, 0, false, COMMANDS.BLUE[0], COMMANDS.BLUE[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.BLUE, CLRS.YELLOW, LEFT, CENTER, 16, 16)));

    ctrls.push(new sliderH(
                new propC(getGUID(), cn, l, top+5*h+90, 128, 10, 5, 10, COMMANDS.RED[0], false),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new sliderH(
                new propC(getGUID(), cn, l, top+5*h+110, 128, 10, 5, 10, COMMANDS.GREEN[0], false),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new sliderH(
                new propC(getGUID(), cn, l, top+5*h+130, 128, 10, 5, 10, COMMANDS.BLUE[0], false),
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
            new propC(getGUID(), parent, parent.w/2-400, -5, 800, 45, 5, false, COMMANDS.UNDEF[0], COMMANDS.HEADER[1]),
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
            new propC(getGUID(), parent, parent.w/2-300, app.height-45, 600, 50, 2, false, COMMANDS.UNDEF[0],COMMANDS.FOOTER[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TITLE));

    cn.ctrls=ctrls;

    return cn;

  };

  var getGridProps=function(parent){

    var ctrls=[];
    var top=10;
    var h=15;
    var l=800;
    var ch=255;

    var cn=new container(
            new propC(getGUID(),parent, l, 2, 120, ch, 3, false, COMMANDS.CONTAINER[0],COMMANDS.CONTAINER[1]),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));

    //~ Labels ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+0*h, 10, 10, 0, false, COMMANDS.ORIGIN[0], COMMANDS.ORIGIN[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+1*h+5, 110, 10, 0, false, COMMANDS.SPACER[0], COMMANDS.SPACER[0]),
                getStyle(STYLES.SPACER),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 15, top+2*h, 10, 10, 0, false, COMMANDS.AXISX[0], COMMANDS.AXISX[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 15, top+3*h, 10, 10, 0, false, COMMANDS.AXISY[0], COMMANDS.AXISY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+4*h+5, 110, 10, 0, false, COMMANDS.SPACER[0], COMMANDS.SPACER[0]),
                getStyle(STYLES.SPACER),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+5*h, 10, 10, 0, false, COMMANDS.LINESX[0], COMMANDS.LINESX[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+6*h, 10, 10, 0, false, COMMANDS.LINESY[0], COMMANDS.LINESY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+7*h+5, 110, 10, 0, false, COMMANDS.SPACER[0], COMMANDS.SPACER[0]),
                getStyle(STYLES.SPACER),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+8*h, 10, 10, 0, false, COMMANDS.ARROWSX[0], COMMANDS.ARROWSX[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+9*h, 10, 10, 0, false, COMMANDS.ARROWSY[0], COMMANDS.ARROWSY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+10*h+5, 110, 10, 0, false, COMMANDS.SPACER[0], COMMANDS.SPACER[0]),
                getStyle(STYLES.SPACER),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+11*h, 10, 10, 0, false, COMMANDS.TICKSX[0], COMMANDS.TICKSX[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+12*h, 10, 10, 0, false, COMMANDS.TICKSY[0], COMMANDS.TICKSY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+13*h+5, 110, 10, 0, false, COMMANDS.SPACER[0], COMMANDS.SPACER[0]),
                getStyle(STYLES.SPACER),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+14*h, 10, 10, 0, false, COMMANDS.LABELSX[0], COMMANDS.LABELSX[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 5, top+15*h, 10, 10, 0, false, COMMANDS.LABELSY[0], COMMANDS.LABELSY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    //~ Values ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+0*h+5, 10, 10, 0, false, COMMANDS.ORIGIN[0], COMMANDS.ORIGIN[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+2*h+5, 10, 10, 0, false, COMMANDS.AXISX[0], COMMANDS.AXISX[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+3*h+5, 10, 10, 0, false, COMMANDS.AXISY[0], COMMANDS.AXISY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+5*h+5, 10, 10, 0, false, COMMANDS.LINESX[0], COMMANDS.LINESX[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+6*h+5, 10, 10, 0, false, COMMANDS.LINESY[0], COMMANDS.LINESY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+8*h+5, 10, 10, 0, false, COMMANDS.ARROWSX[0], COMMANDS.ARROWSX[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+9*h+5, 10, 10, 0, false, COMMANDS.ARROWSY[0], COMMANDS.ARROWSY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+11*h+5, 10, 10, 0, false, COMMANDS.TICKSX[0], COMMANDS.TICKSX[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+12*h+5, 10, 10, 0, false, COMMANDS.TICKSY[0], COMMANDS.TICKSY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+14*h+5, 10, 10, 0, false, COMMANDS.LABELSX[0], COMMANDS.LABELSX[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+15*h+5, 10, 10, 0, false, COMMANDS.LABELSY[0], COMMANDS.LABELSY[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXTCENTER)));

    cn.ctrls=ctrls;

    return cn;

  };

  var addControls=function(){

    var ctrls=[];

    var cn=new container(
            new propC(getGUID(), 0, 0, 0, app.width, app.height,2, false, COMMANDS.UNDEF[0], 0),
            getStyle(STYLES.BACKGROUND),
            getStyle(STYLES.TEXT));

    //~ ctrls.push(new sliderH(
            //~ new propC(getGUID(), cn, 226, 300, 200, 10, 0, 10, COMMANDS.FRAMERATE[0], false),
            //~ getStyle(STYLES.BUTTON),
            //~ getStyle(STYLES.TEXT)));

    ctrls.push(getGrid(cn));

    //~ ctrls.push(new labelR(
            //~ new propC(getGUID(), cn, cn.w/2, cn.h/2, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.CARTESIA[1]),
            //~ getStyle(STYLES.BUTTON),
            //~ getStyle(STYLES.TEXTCENTER)));

    ctrls.push(getPoints(cn));
    ctrls.push(getLines(cn));
    //~ ctrls.push(getTriangles(cn));
    //~ ctrls.push(getCircles(cn));
    //~ ctrls.push(getQuads(cn));
    //~ ctrls.push(getArcs(cn));
    //~ ctrls.push(getPolygons(cn));
    //~ ctrls.push(getConics(cn));
    //~ ctrls.push(getAngles(cn));
    //~ ctrls.push(getAnnotations(cn));
    //~ ctrls.push(getTransform(cn));
    //~ ctrls.push(getMeasure(cn));

    ctrls.push(getHeader(cn));
    ctrls.push(getFooter(cn));
    ctrls.push(getProperties(cn));
    ctrls.push(getTelemetry(cn));
    ctrls.push(getColors(cn));

    //~ ctrls.push(getGridProps(cn));

    cn.ctrls=ctrls;

    app.ctrls.push(cn);

  };

  var loadCommands=function(){

    saveStrings('Rectangle', COMMANDS.DEBUG);

    //~ println(loadStrings('Rectangle'));

  };

  //~ Initialize =======================================================
  var initialize=function(){

    loadCommands();

    size(app.width, app.height);

    if(app.debug) { app.frameRate=62; }
    else          { app.frameRate=32;  }

    frameRate(0);

    frameRate(app.frameRate);

    app.dwg=new drawing();

    addControls();

    process=main;

  };

  initialize();

  process();

}};
