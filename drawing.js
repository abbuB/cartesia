/* @pjs globalKeyEvents="true"; */
var proc = function(processingInstance){ with (processingInstance){

  //~ size(screen.width-20, screen.height-215); //~ set size of canvas

  /**

    TO DO:
      - ...


  **/

var process;

var zoomfactor=0;

  var getColor=function(clr,alpha){

    return color(red(clr), green(clr), blue(clr), alpha/100*255);

  };

  var CLRS={

    TRANSPARENT:  color(-1,-1,-1),

    WHITE:    color(255,255,255),     BLACK:    color(0,0,0),
    RED:      color(170,29,29),       GREEN:    color(158,182,58),
    BLUE:     color(29,86,170),       YELLOW:   color(238,214,15),
    ORANGE:   color(238,136,15),      GRAY:     color(128,128,128),

    BROWN:    color(155,145,135),

    control:  color(128,128,128),     controlF: color(242,242,242),

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

    RULER:    color(231,189,33),

    SELECTED: color(0,0,255),
    HIT:      color(255,0,0)

  };

  var MODES={
    SAMPLE:           0,
    MANUAL:           1
  };
  var STYLES={
    BACKGROUND:       0,
    CONTAINER:        1,
    BUTTON:           2,
    TEXT:             3,
    TITLE:            4,
    TEXTCENTER:       5,
    SPACER:           6
  };
  var LINETYPES={
    HAIRLINE:         0,
    SOLID:            1,
    DASHED:           2,
    DOTTED:           3,
    DASHDOT:          4
  };
  var LINEWEIGHTS={
    HALF:             0,
    ONE:              1,
    TWO:              2,
    THREE:            3,
    FOUR:             4,
    FIVE:             5
  };
  var SNAPS={
    ENDPOINT:         0,
    MIDPOINT:         1,
    INTERSECTION:     2,
    INTERSECTIONA:    3,
    EXTENSION:        4,
    CENTER:           5,
    QUADRANT:         6,
    TANGENT:          7,
    PERPENDICULAR:    8,
    PARALLEL:         9,
    NODE:             10,
    INSERT:           11,
    NEAREST:          12
  };
  var SELECT={
    PICK:             0,
    WINDOW:           1,
    WINDOWC:          2,
    FENCE:            3,
    POLYGON:          4,
    TOUCHING:         5,
    LASSO:            6,
    CYCLE:            7
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
    STG:        118,  //~ F7: snap to grid
    ORTHO:      119,  //~ F8:
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

    //~ General ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
    
    //~ Mouse ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

    //~ Grid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    GRID:         [ 100,  'Grid',             'GRID',       KEYCODES.GRID       ],

    GRIDPROPS:    [ 101,  'GridProps',        'GRIDPROPS',  KEYCODES.GRIDPROPS  ],

    ORIGIN:       [ 102,  'Origin',           'ORIGIN',     KEYCODES.ORIGIN     ],
    BORDER:       [ 103,  'Border',           'BORDER',     KEYCODES.BORDER     ],
    AXES:         [ 104,  'Axes',             'AXES',       KEYCODES.AXES       ],
    AXISX:        [ 105,  'x',                'X',          KEYCODES.AXISX      ],
    AXISY:        [ 106,  'y',                'Y',          KEYCODES.AXISY      ],
    LINES:        [ 107,  'Lines',            'LINES',      KEYCODES.LINES      ],
    LINESX:       [ 108,  'x',                'X',          KEYCODES.LINESX     ],
    LINESY:       [ 109,  'y',                'Y',          KEYCODES.LINESY     ],
    ARROWS:       [ 110,  'Arrows',           'ARROWS',     KEYCODES.ARROWS     ],
    ARROWSX:      [ 111,  'x',                'X',          KEYCODES.ARROWSX    ],
    ARROWSY:      [ 112,  'y',                'Y',          KEYCODES.ARROWSY    ],
    TICKS:        [ 113,  'Ticks',            'TICKS',      KEYCODES.TICKS      ],
    TICKSX:       [ 114,  'x',                'X',          KEYCODES.TICKSX     ],
    TICKSY:       [ 115,  'y',                'Y',          KEYCODES.TICKSY     ],
    LABELS:       [ 116,  'Labels',           'LABELS',     KEYCODES.LABELS     ],
    LABELSX:      [ 117,  'x',                'X',          KEYCODES.LABELSX    ],
    LABELSY:      [ 118,  'y',                'Y',          KEYCODES.LABELSY    ],
    QUADRANTS:    [ 119,  'Quadrants',        'QUADRANTS',  KEYCODES.QUADRANTS  ],

    COORDINATES:  [ 120,  'Coordinates',      'COORDINATES'                     ],
    ORTHO:        [ 121,  'Ortho',            'ORTHO',      KEYCODES.ORTHO      ],
    STG:          [ 122,  'STG',              'STG',        KEYCODES.STG        ],
    FS:           [ 123,  'Grid',             'COMMAND'                         ],

    //~ Properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    PROPERTIES:   [ 200,  'Properties',       'PROPERTIES'            ],

    MATCH:        [ 201,  'Match',            'MATCH'                 ],

    NAME:         [ 202,  'Name',             'NAME'                  ],
    CAPTION:      [ 203,  'Caption',          'CAPTION'               ],
    FORMULA:      [ 204,  'Formula',          'FORMULA'               ],

    STROKE:       [ 205,  'Stroke',           'STROKE'                ],
    STROKEA:      [ 206,  'Stroke Alpha',     'STROKEALPHA'           ],  //~ Stroke Alpha
    FILL:         [ 207,  'Fill',             'FILL'                  ],
    FILLA:        [ 208,  'Fill Alpha',       'fillA'                 ],  //~ Fill Alpha

    COLORG:       [ 209,  'ColorG',           'COLORG'                ],

    LAYER:        [ 210,  'Layer',            'LAYER'                 ],

    LINETYPE:     [ 211,  'Line Type',        'LINE TYPE'             ],
    LT_HAIRLINE:  [ 212,  'Hairline',         'HAIRLINE'              ],
    LT_SOLID:     [ 213,  'Solid',            'SOLID'                 ],
    LT_DASHED:    [ 214,  'Dashed',           'DASHED'                ],
    LT_DOTTED:    [ 215,  'Dottted',          'DOTTED'                ],
    LT_DASHDOT:   [ 216,  'DashDot',          'DASHDOT'               ],

    LINEWEIGHT:   [ 217,  'Line Weight',      'LINE WEIGHT'           ],

    RED:          [ 213,  'Red',              'RED'                   ],
    BLUE:         [ 214,  'Blue',             'BLUE'                  ],
    GREEN:        [ 215,  'Green',            'GREEN'                 ],

    //~ File ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    FILE:         [ 301,  'File',             'FILE',     KEYCODES.FILE   ],
    NEW:          [ 302,  'New',              'NEW',      KEYCODES.NEW    ],
    OPEN:         [ 303,  'Open',             'OPEN',     KEYCODES.OPEN   ],
    SAVE:         [ 304,  'Save',             'SAVE',     KEYCODES.SAVE   ],
    SAVEAS:       [ 305,  'Save As',          'SAVEAS',   KEYCODES.SAVEAS ],
    CLOSE:        [ 306,  'Close',            'CLOSE',    KEYCODES.CLOSE  ],

    //~ Edit ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    EDIT:         [ 400,  'Edit',             'EDIT',     KEYCODES.EDIT   ],
    UNDO:         [ 401,  'Undo',             'UNDO',     KEYCODES.UNDO   ],
    REDO:         [ 402,  'Redo',             'REDO',     KEYCODES.REDO   ],
    COPY:         [ 403,  'Copy',             'COPY',     KEYCODES.COPY   ],
    //~ CUT:          [ 404,  'Cut',              'CUT',      KEYCODES.CUT    ],
    //~ PASTE:        [ 405,  'Paste',            'PASTE',    KEYCODES.PASTE  ],
    DELETE:       [ 406,  'Delete',           'DELETE',   KEYCODES.DELETE ],
    ERASE:        [ 407,  'Erase',            'ERASE',    KEYCODES.DELETE ],

    //~ View ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    VIEW:         [ 500,  'View',             'VIEW',     KEYCODES.VIEW   ],
    SELECT:       [ 501,  'Select',           'SELECT'                ],
    SELECTALL:    [ 502,  'Select All',       'SELECTALL'             ],
    SELECT_WINDOW:[ 503,  'Window',           'WINDOW'                ],
    ZOOMIN:       [ 504,  'Zoomin',           'ZOOMIN',   KEYCODES.ZOOMIN ],
    ZOOMOUT:      [ 505,  'Zoomout',          'ZOOMOUT',  KEYCODES.ZOOMOUT],
    PAN:          [ 506,  'Pan',              'PAN',      KEYCODES.PAN    ],

    //~ Modify ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    MODIFY:       [ 600,  'Modify',           'MODIFY',       KEYCODES.MODIFY       ],
    TRANSLATE:    [ 601,  'Translate',        'TRANSLATE',    KEYCODES.TRANSLATE    ],
    TRANS_UP:     [ 601,  'Translate',        'TRANSLATE',    KEYCODES.TRANS_UP     ],
    TRANS_DOWN:   [ 601,  'Translate',        'TRANSLATE',    KEYCODES.TRANS_DOWN   ],
    TRANS_LEFT:   [ 601,  'Translate',        'TRANSLATE',    KEYCODES.TRANS_LEFT   ],
    TRANS_RIGHT:  [ 601,  'Translate',        'TRANSLATE',    KEYCODES.TRANS_RIGHT  ],
    TRANS_VECTOR: [ 602,  'Transvector',      'TRANSVECTOR',  KEYCODES.TRANS_VECTOR ],    //~ TranslateByVector

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
    VOLUME:       [ 704,  'Volume',           'VOLUME'                ],
    RADIUS:       [ 705,  'Radius',           'RADIUS'                ],
    DIAMETER:     [ 706,  'Diamter',          'DIAMETER'              ],
    SLOPE:        [ 707,  'Slope',            'SLOPE'                 ],

    //~ Layers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //LAYER:        [ 800,  'Layer',            'LAYER'                 ],
    FORWARD:      [ 801,  'Forward',          'FORWARD'               ],
    BACK:         [ 802,  'Back',             'BACK'                  ],



    //~  SHAPES ========================================================

    //~ Point (P) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    POINT:        [1000,  'Point',            'POINT'                 ],
    P_DEFAULT:    [1001,  'P_DEFAULT',        'P_DEFAULT'             ],
    P_OBJECT:     [1002,  'P_Object',         'P_OBJECT'              ],
    P_BOUND:      [1003,  'P_Bound',          'P_BOUND'               ],
    P_INTERSECT:  [1004,  'P_Intersect',      'P_INTERSECT'           ],
    P_MIDPOINT:   [1005,  'P_Midpoint',       'P_MIDPOINT'            ],    //~ Midpoint/Center
    P_ATDETACH:   [1006,  'P_AttachDetach',   'P_ATTACHDETACH'        ],    //~ AttachDetachPoint

    //~ Line (L) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    LINE:         [1100,  'Line',             'LINE'                  ],
    L_2P:         [1101,  'Line2P',           'LINE2P'                ],    //~ through 2 vertices
    L_SEGMENT2P:  [1102,  'LineSegment2P',    'LINESEGMENT2P'         ],    //~ between 2 vertices
    L_SEGMENTLEN: [1103,  'LineSegmentLen',   'LINESEGMENTLEN'        ],    //~ from point given length
    L_PERP:       [1104,  'LinePerp',         'LINEPERP'              ],    //~ perpendicular
    L_PERPB:      [1105,  'LinePerpB',        'LINEPERPB'             ],    //~  perpendicular bisector
    L_ANGB:       [1106,  'LineAngB',         'LINEANGB'              ],    //~ angle bisector
    L_PARR:       [1107,  'LineParr',         'LINEPARR'              ],    //~ parallel
    L_TANGENT:    [1108,  'LineTangent',      'LINETANGENT'           ],    //~ Tangent
    L_DIAMETER:   [1109,  'LineDiameter',     'LINEDIAMETER'          ],    //~ Diameter
    L_RADIUS:     [1110,  'LineRadius',       'LINERADIUS'            ],    //~ Radius

    RAY_2P:       [1211,  'Ray2P',            'RAY2P'                 ],    //~ Ray between 2 vertices
    V_2P:         [1212,  'Vector2P',         'VECTOR2P'              ],    //~ Vector between 2 vertices
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

    C_3P:         [1403,  'C_3P',             'C_3P'                  ],    //  3 vertices

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
    A_2P:         [1601,  'Arc2vertices',     'ARC2vertices'          ],    //~ SemiCircleThrough2vertices
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
    S_5VERTICES:  [1803,  'Conic 5 Vertices', 'CONIC5VERTICES'        ],

    //~ Angle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    ANGLE:        [1900,  'Angle',            'ANGLE'                 ],
    ANGLE_SIZE:   [1901,  'Angle Size',       'ANGLESize'             ],

    //~ Annotation ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    TEXT:         [2000,  'Text',             'TEXT'                  ],

    //~ Images ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    IMAGE:        [2101,  'Image',            'IMAGE'                 ],
    SKETCH:       [2102,  'SKETCH',           'SKETCH'                ],

    //~ Footer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ ORTHO:
    //~ STG:
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

    width:          screen.width-20,
    height:         screen.height-115,

    debug:          true,
    frameRate:      0,

    focus:          0,

    mouseX:         1000,
    mouseY:         20,

    gridX:          0,
    gridY:          0,

    worldX:         0,
    worldY:         0,

    //~ mousePressed:   0,

    left:           false,
    center:         false,
    right:          false,

    keys:           [],
    drawings:       [],

    dwg:            undefined,

    //~ Properties
    red:            128,
    green:          127,
    blue:           126,

    caption:        'woo hoo',
    name:           'brad',
    formula:        'x^2+y^2=r^2',

    stroke:         CLRS.GREEN,
    strokeA:        42,

    fill:           CLRS.YELLOW,
    fillA:          76,

    pSize:          5,

    layer:          8,

    linetype:       LINETYPES.DASHDOT,
    lineweight:     0.75,

    border:         true,
    origin:         true,

    gridprops:      true,

    axisX:          true,
    axisY:          true,
    linesX:         true,
    linesY:         true,
    arrowsX:        true,
    arrowsY:        true,
    ticksX:         true,
    ticksY:         true,
    labelsX:        true,
    labelsY:        true,
    quadrants:      true,

    coordinates:    false,
    ortho:          false,
    STG:            false,  //~ snap to grid
    fs:             false,  //~ full screen

    current:        COMMANDS.P_DEFAULT[0],

    stack:          [],

    cursorSize:     0,

    ctrls:          [],

    factor:         0

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

      //~ Shape Properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

      //~ case COMMANDS.LAYER[0]:       return app.layer;

      //~ Grid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

      //~ Footer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      case COMMANDS.COORDINATES[0]: return app.coordinates;
      case COMMANDS.ORTHO[0]:       return app.ortho;
      case COMMANDS.STG[0]:         return app.stg;
      case COMMANDS.FS[0]:          return app.fs;

      case COMMANDS.FACTOR[0]:      return app.factor;

      default:  return 0;

    }

  };

  var reset=function(){
    //~ app.current=0;
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
  };

  var drawing=function(){

    this.guid=getGUID();
    this.shapes=[];

    this.color=CLRS.RED;
    this.layer=11;
    this.linetype=LINETYPES.HAIRLINE;
    this.lineweight=7;

  };

  //~ Shapes ===========================================================
  var Shape=function(i,p){

    this.hitP=[];
    this.hit=false;

    this.i=           i;
    this.parent=      p;
    this.vertices=    [];

    this.w=           app.pSize;
    this.h=           app.pSize;

    this.fill=        app.fill;
    this.fillA=       app.fillA;
    this.fillH=       app.fillH;

    this.stroke=      app.stroke;
    this.strokeA=     app.strokeA;
    this.strokeH=     app.strokeH;

    this.layer=       app.layer;
    this.linetype=    app.linetype;

    this.lineweight=  app.lineweight;
    this.lineweightH= app.lineweightH;

    this.hit=         false;

    this.selected=    false;
    this.deleted=     false;

    //~ for(var p=0; p<=this.length; p++){ this.hit[p]=0; }

  };
  Shape.prototype.add=function(pnt){
    this.vertices.push(pnt);
  };
  Shape.prototype.draw=function(){};
  Shape.prototype.clicked=function(){

    if(app.current===COMMANDS.SELECT[0]){

      if(this.hit){
        this.selected=!this.selected;
        for(var n in this.vertices){ this.vertices[n].selected=this.selected; }
      }

    }

  };
  Shape.prototype.moved=function(x,y){};
  Shape.prototype.dragged=function(){

    for(var n in this.vertices){

      if(this.hitP[n] && app.left){
        this.vertices[n].x=app.mouseX;
        this.vertices[n].y=app.mouseY;
        this.recalc();
      }

    }

  };

var factor=1.25;

  //~ Point ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Point=function(i,p,x,y){

    Shape.call(this, i, p);

    this.xG=x;                //~ world X
    this.yG=y;                //~ world Y
    this.xW=x*app.factor;     //~ grid X
    this.yW=y*app.factor;     //~ grid Y

    this.recalc=function(){
      this.xW=this.xG*app.factor;
      this.yW=this.yG*app.factor;
    };

  };
  Point.prototype=Object.create(Shape.prototype);
  Point.prototype.draw=function(x,y){

    var p=this;
    var d=0;

    var sz=p.hit ? p.w*factor : p.w;

    var meta=function(){

      pushMatrix();

        scale(1,-1);

          fill(CLRS.GRAY);
          textAlign(LEFT,CENTER);
          textFont(createFont('monospace'));

          textSize(9);
          text("g: "        + nf(p.xG,1,2) + ", " + nf(p.yG,1,2), p.xW+10+x, -1*p.yW+5+y);
          text("w: "        + nf(p.xW,1,2) + ", " + nf(p.yW,1,2), p.xW+10+x, -1*p.yW+15+y);
          text("selected: " + p.selected,                         p.xW+10+x, -1*p.yW+25+y);

      popMatrix();

    };

    p.recalc();
    pushStyle();

      fill(getColor(p.stroke,p.strokeA));
      noStroke();
      strokeWeight(0);

      if(p.selected){ fill(CLRS.SELECTED); }
      if(p.hit){
        meta();
        fill(CLRS.HIT);
      }

      ellipse(p.xW+x, p.yW-y, sz, sz);

    popStyle();

  };
  Point.prototype.moved=function(x,y){

    if(dist(app.worldX, app.worldY,
            this.xW, this.yW)<app.pSize){
      this.hit=true;
      this.parent.hit=true;
    }
    else{
      this.hit=false;
    }

  };
  Point.prototype.dragged=function(){
    this.recalc();
    if(this.hit && app.left){
      this.vertices[0].x=app.mouseX;
      this.vertices[0].y=app.mouseY;
    }
  };

  var LM={
    DELTAX:     0,
    DELTAY:     1,
    LENGTH:     2,
    MIDPOINTX:  3,
    MIDPOINTY:  4,
    SLOPE:      5
  };

  //~ Line ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Line=function(i,p){

    Shape.call(this, i, p);

    this.deltaX=0;
    this.deltaY=0;
    this.length=0;
    this.slope=0;


    this.recalc=function(){

      if(this.vertices.length===2){
        this.vertices.push(new Point(getGUID(),this,0,0));
      }

      this.deltaX=abs(this.vertices[1].xG-this.vertices[0].xG);
      this.deltaY=abs(this.vertices[1].yG-this.vertices[0].yG);
      this.length=dist(this.vertices[0].xG, this.vertices[0].yG, this.vertices[1].xG, this.vertices[1].yG);
      this.vertices[2].xG=(this.vertices[0].xG+this.vertices[1].xG)/2;
      this.vertices[2].yG=(this.vertices[0].yG+this.vertices[1].yG)/2;
      if(this.deltaX===0){ this.slope=-0;                 }
      else               { this.slope=(this.vertices[1].yG-this.vertices[0].yG)/(this.vertices[1].xG-this.vertices[0].xG); }

    };



  };
  Line.prototype=Object.create(Shape.prototype);
  Line.prototype.draw=function(x,y){

    var p=this;
    var d=0;

    var sz=p.hit ? p.w*factor : p.w;

    var meta=function(){

      pushMatrix();

        scale(1,-1);

          fill(CLRS.GRAY);
          textAlign(LEFT,CENTER);
          textFont(createFont('monospace'));

          var _x= (p.vertices[0].xW+p.vertices[1].xW)/2;
          var _y=-(p.vertices[0].yW+p.vertices[1].yW)/2;

          textSize(9);
          text("rise:     " + p.deltaX,         _x+x, _y+5+y);
          text("run:      " + p.deltaY,         _x+x, _y+15+y);
          text("slope:    " + nf(p.slope,1,2),  _x+x, _y+25+y);
          text("length:   " + nf(p.length,1,2), _x+x, _y+35+y);
          text("selected: " + p.selected,       _x+x, _y+45+y);

          //~ fill(p.fill);
          //~ noStroke();
          //~ strokeWeight(0);

          //~ ellipse(p.midX, p.midY, sz, sz);

      popMatrix();

    };

    this.recalc();

    pushStyle();

      fill(getColor(p.fill,5));
      stroke(getColor(p.stroke, p.strokeA));
      strokeWeight(p.hit ? p.lineweight*factor : p.lineweight);

      if(p.hit){
        meta();
        strokeWeight(p.lineweight*1.25);
      }

      if(p.selected){

        stroke(getColor(p.stroke, p.strokeA));

        for(var i=0; i<=30; i++) {

          var _x = lerp(p.vertices[0].xG*app.factor+x, p.vertices[1].xG*app.factor+x, i/30);
          var _y = lerp(p.vertices[0].yG*app.factor-y, p.vertices[1].yG*app.factor-y, i/30);

          ellipse(_x, _y, 2, 2);

        }
        for(var n in p.vertices){
          p.vertices[n].draw(x,y);
        }

      }
      else{
        line(p.vertices[0].xG*app.factor+x, p.vertices[0].yG*app.factor-y,
             p.vertices[1].xG*app.factor+x, p.vertices[1].yG*app.factor-y);
      }



    popStyle();

  };
  Line.prototype.moved=function(x,y){

    var dist1=dist(app.worldX, app.worldY,
                   this.vertices[0].xW+x, this.vertices[0].yW+y);
    var dist2=dist(app.worldX, app.worldY, this.vertices[1].xW+x,
                   this.vertices[1].yW+y);

    if(dist1+dist2-this.length*app.factor<app.pSize/8){
      this.hit=true;
    }
    else{
      this.hit=false;
    }

    for(var n in this.vertices){
      this.vertices[n].moved(x,y);
    }

  };
  Line.prototype.dragged=function(){

    for(var n in this.vertices){

      //~ if(dist(app.mouseX, app.mouseY,
              //~ this.vertices[n].x, this.vertices[n].y)<this.w){
//~
        //~ app.mouseX=this.vertices[n].x;
        //~ app.mouseY=this.vertices[n].y;
//~
      //~ }

      if(this.hitP[n] && app.left){
        this.vertices[n].x=app.mouseX;
        this.vertices[n].y=app.mouseY;
      }

    }

    //~ this.recalc();

  };

  //~ Triangle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Triangle=function(p){
    Shape.call(this,p);
  };
  Triangle.prototype=Object.create(Shape.prototype);
  Triangle.prototype.draw=function(){};


  //~ Circle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Circle=function(p){

    Shape.call(this,p);

    //~ this.radius=dist(this.vertices[0].x, this.vertices[0].y, this.vertices[1].x, this.vertices[1].y);
    //~ this.diameter=2*this.radius;
    //~ this.area=PI*pow(this.radius,2);
    //~ this.circumference=PI*this.diameter;
//~
    //~ this.recalc=function(){
//~
      //~ this.radius=dist(this.vertices[0].x, this.vertices[0].y, this.vertices[1].x, this.vertices[1].y);
      //~ this.diameter=2*this.radius;
      //~ this.area=PI*pow(this.radius,2);
      //~ this.circumference=PI*this.diameter;

    //~ };

  };
  Circle.prototype=Object.create(Shape.prototype);
  Circle.prototype.draw=function(){

    var p=this;
    var d=0;

    var sz=p.hit ? p.w*factor : p.w;

    var meta=function(){

      fill(CLRS.GRAY);
      textAlign(LEFT,CENTER);
      textFont(createFont('monospace'));

      textSize(9);
      text("rise:     " + p.deltaX,         p.vertices[0].x+10, p.vertices[0].y+5);
      text("run:      " + p.deltaY,         p.vertices[0].x+10, p.vertices[0].y+15);
      text("slope:    " + nf(p.slope,1,2),  p.vertices[0].x+10, p.vertices[0].y+25);
      text("length:   " + nf(p.length,1,2), p.vertices[0].x+10, p.vertices[0].y+35);

      fill(p.fill);
      noStroke();
      strokeWeight(0);

    };

    pushStyle();

      fill(getColor(p.fill,5));
      stroke(p.stroke);
      strokeWeight(p.hit ? p.lineweight*factor : p.lineweight);

      if(p.SELECTED){ strokeWeight(p.lineweight*2); }

      var sz=dist(p.vertices[0].xG/app.factor, p.vertices[0].yG/app.factor,
                  p.vertices[1].xG/app.factor, p.vertices[1].yG/app.factor);

      ellipse(p.vertices[0].xG/app.factor, p.vertices[0].yG/app.factor,
              sz*2,sz*2);

      fill(p.fill);
      noStroke();
      strokeWeight(0);

      for(var n in p.vertices){
        p.vertices[n].draw();
      }

      if(p.hit){ meta(); }

    popStyle();

  };
  Circle.prototype.moved=function(x,y){

    for(var n in this.vertices){
      this.vertices[n].moved(x,y);
      this.hit=true;
    }

  };

  //~ Ellipse ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Ellipse=function(p){
    Shape.call(this,p);
  };
  Ellipse.prototype=Object.create(Shape.prototype);
  Ellipse.prototype.draw=function(){};


  //~ Arc ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Arc=function(p){
    Shape.call(this,p);
  };
  Arc.prototype=Object.create(Shape.prototype);
  Arc.prototype.draw=function(){};

  //~ Ellipse ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Rectangle=function(p){
    Shape.call(this,p);
  };
  Rectangle.prototype=Object.create(Shape.prototype);
  Rectangle.prototype.draw=function(){

    var p=this;
    var d=0;

    var sz=p.hit ? p.w*factor : p.w;

    var meta=function(){

      fill(CLRS.GRAY);
      textAlign(LEFT,CENTER);
      textFont(createFont('monospace'));

      textSize(9);
      text("rise:     " + p.deltaX,         p.vertices[0].x+10, p.vertices[0].y+5);
      text("run:      " + p.deltaY,         p.vertices[0].x+10, p.vertices[0].y+15);
      text("slope:    " + nf(p.slope,1,2),  p.vertices[0].x+10, p.vertices[0].y+25);
      text("length:   " + nf(p.length,1,2), p.vertices[0].x+10, p.vertices[0].y+35);

      fill(p.fill);
      noStroke();
      strokeWeight(0);

      //~ ellipse(p.midX, p.midY, sz, sz);

    };

    pushStyle();

      //~ rectMode(CENTER);

      fill(getColor(p.fill,5));
      stroke(p.stroke);
      strokeWeight(p.hit ? p.lineweight*factor : p.lineweight);

      if(p.SELECTED){ strokeWeight(p.lineweight*2); }

      rect(p.vertices[0].xG/app.factor, p.vertices[0].yG/app.factor,
           p.vertices[1].xG/app.factor, p.vertices[1].yG/app.factor);

      fill(p.fill);
      noStroke();
      strokeWeight(0);

      for(var n in p.vertices){
        p.vertices[n].draw();
      }

      if(p.hit){ meta(); }

    popStyle();

  };


  //~ Polygon ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Polygon=function(p){
    Shape.call(this,p);
  };
  Polygon.prototype=Object.create(Shape.prototype);
  Polygon.prototype.draw=function(){};


  //~ Conic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Conic=function(p){
    Shape.call(this,p);
  };
  Conic.prototype=Object.create(Shape.prototype);
  Conic.prototype.draw=function(){};


  //~ Angle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Angle=function(p){
    Shape.call(this,p);
  };
  Angle.prototype=Object.create(Shape.prototype);
  Angle.prototype.draw=function(){};


  //~ Annotation ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Annotation=function(p){
    Shape.call(this,p);
  };
  Annotation.prototype=Object.create(Shape.prototype);
  Annotation.prototype.draw=function(){};

  var GridCommands=function(c,p){

    switch(c){

      case COMMANDS.GRID[0]:        break;

      case COMMANDS.GRIDPROPS[0]:   app.gridprops=!app.gridprops; break;

      case COMMANDS.ORIGIN[0]:      app.origin=!app.origin;       break;
      case COMMANDS.BORDER[0]:      app.border=!app.border;       break;

      case COMMANDS.AXES[0]:        app.axisX=!app.axisX;
                                    app.axisY=app.axisX;          break;
      case COMMANDS.AXISX[0]:       app.axisX=!app.axisX;         break;
      case COMMANDS.AXISY[0]:       app.axisY=!app.axisY;         break;

      case COMMANDS.LINES[0]:       app.linesX=!app.linesX;
                                    app.linesY=app.linesX;        break;
      case COMMANDS.LINESX[0]:      app.linesX=!app.linesX;       break;
      case COMMANDS.LINESY[0]:      app.linesY=!app.linesY;       break;

      case COMMANDS.ARROWS[0]:      app.arrowsX=!app.arrowsX;
                                    app.arrowsY=app.arrowsX;      break;
      case COMMANDS.ARROWSX[0]:     app.arrowsX=!app.arrowsX;     break;
      case COMMANDS.ARROWSY[0]:     app.arrowsY=!app.arrowsY;     break;

      case COMMANDS.TICKS[0]:       app.ticksX=!app.ticksX;
                                    app.ticksY=app.ticksX;        break;
      case COMMANDS.TICKSX[0]:      app.ticksX=!app.ticksX;       break;
      case COMMANDS.TICKSY[0]:      app.ticksY=!app.ticksY;       break;

      case COMMANDS.LABELS[0]:      app.labelsX=!app.labelsX;
                                    app.labelsY=app.labelsX;      break;
      case COMMANDS.LABELSX[0]:     app.labelsX=!app.labelsX;     break;
      case COMMANDS.LABELSY[0]:     app.labelsY=!app.labelsY;     break;

      case COMMANDS.QUADRANTS[0]:   app.quadrants=!app.quadrants; break;

      //~ case COMMANDS.COORDINATES[0]: app.coordinates=!app.coordinates; break;
      case COMMANDS.ORTHO[0]:       app.ortho=!app.ortho;         break;
      case COMMANDS.STG[0]:         app.stg=!app.stg;             break;  //~ Snap-to-grid
      case COMMANDS.FS[0]:          app.fs=!app.fs;               break;  //~ Full Screen

      default:      break;

    }

  };
  var ShapeCommands=function(c,p){

    //~ println(c+","+p);

    //~ app.current=p;

    switch(c){

      case COMMANDS.P_DEFAULT[0]:                                 break;
      case COMMANDS.LINE[0]:                                      break;

      //~ case COMMANDS.POINT[0]:       break;
      //~ case COMMANDS.P_OBJECT[0]:    break;
      case COMMANDS.P_INTERSECT[0]:     break;
      case COMMANDS.P_MIDPOINT[0]:      break;

      default:      break;

    }

    app.current=c;

  };



  //~ Commands =========================================================
  var commands=function(c,p){

    //~ println(c+':'+p);

    switch(true){

      case c===COMMANDS.DEBUG[0]:         app.debug=!app.debug;
                                          break;

      //~ Grid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      case (c>COMMANDS.GRID[0] &&
            c<=COMMANDS.FS[0]):           GridCommands(c,p);      break;

      case (c>=COMMANDS.MODIFY[0] &&
            c<=COMMANDS.SKETCH[0]):       ShapeCommands(c,p);     break;

      case c===COMMANDS.STROKE[0]:        app.stroke=p;
                                          app.red=red(app.color);
                                          app.green=green(app.color);
                                          app.blue=blue(app.color);
                                          break;

      case c===COMMANDS.STROKEA[0]:       app.strokeA=p;          break;
      case c===COMMANDS.FILL[0]:          app.fill=p;             break;
      case c===COMMANDS.FILLA[0]:         app.fillA=p;            break;

      case c>COMMANDS.LINETYPE[0] &&
             COMMANDS.LT_DASHDOT[0]:      app.linetype=c;
                                          break;

      case c===COMMANDS.ZOOMIN[0]:        app.factor*=2.25;       break;
      case c===COMMANDS.ZOOMOUT[0]:       app.factor/=2.25;       break;
      case c===COMMANDS.PAN[0]:           app.current=c;          break;

      case c===COMMANDS.UNDO[0]:                                  break;

      default:  break;

    }

  };

  var drawIcon=function(p, d){

    var cPNT=CLRS.VERTEX;
    var cMEASURE=CLRS.RED;
    var cVERTEX=CLRS.VERTEXA;
    var cLINE=CLRS.LINE;
    var cFILL=CLRS.FILL;
    var sz=p.w/10;

    var drawPoint=function(){

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.P_DEFAULT[0]:

            noFill();

            strokeWeight(0);
            noStroke();
            fill(cPNT);

            ellipse(d+p.cX, d+p.cY, sz, sz);

            break;

          case COMMANDS.P_BOUND[0]:

            fill(CLRS.FILL);
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+p.cX-10, d+p.cY-10);
              vertex(d+p.cX-10, d+p.cY+5);
              vertex(d+p.cX+10, d+p.cY+10);
              vertex(d+p.cX+4,  d+p.cY-6);
            endShape(CLOSE);

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+p.cX, d+p.cY, sz, sz);

            noStroke();
            fill(CLRS.VERTEX);

            ellipse(d+p.cX-10, d+p.cY-10, sz, sz);
            ellipse(d+p.cX-10, d+p.cY+5,  sz, sz);
            ellipse(d+p.cX+10, d+p.cY+10, sz, sz);
            ellipse(d+p.cX+4,  d+p.cY-6,  sz, sz);

            break;

          case COMMANDS.P_INTERSECT[0]:

            noFill();
            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+p.cX-10, d+p.cY+10, d+p.cX+10, d+p.cY-10);
            line(d+p.cX+4,  d+p.cY+10, d+p.cX-4, d+p.cY-10);

            noStroke();
            strokeWeight(0.5);
            fill(cPNT);

            ellipse(d+p.cX, d+p.cY, sz, sz);

            break;

          case COMMANDS.P_OBJECT[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+p.cX-10, d+p.cY+10, d+p.cX+10, d+p.cY-10);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+p.cX, d+p.cY, sz, sz);

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

            line(d+p.cX-10, d+p.cY+10, d+p.cX+10, d+p.cY-10);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+p.cX+5, d+p.cY-5, sz, sz);
            ellipse(d+p.cX-5, d+p.cY+5, sz, sz);

            break;

          case COMMANDS.L_SEGMENT2P[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+p.cX-7, d+p.cY+7, d+p.cX+7, d+p.cY-7);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+p.cX+7, d+p.cY-7, sz, sz);
            ellipse(d+p.cX-7, d+p.cY+7, sz, sz);

            break;

          case COMMANDS.L_SEGMENTLEN[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+p.cX-7, d+p.cY+7, d+p.cX+7, d+p.cY-7);

            noStroke();
            strokeWeight(0);
            fill(cMEASURE);

            ellipse(d+p.cX+7, d+p.cY-7, sz, sz);

            fill(cPNT);
            ellipse(d+p.cX-7, d+p.cY+7, sz, sz);

            break;

          case COMMANDS.L_PERP[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+p.cX-7, d+p.cY+7, d+p.cX+7, d+p.cY-7);

            stroke(cLINE);
            getDottedLine(d+p.cX-7, d+p.cY-7, d+p.cX+10, d+p.cY+10, 10);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+p.cX-7, d+p.cY-7, sz, sz);

            break;

          case COMMANDS.L_PERPB[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cMEASURE);

            line(d+p.cX-7, d+p.cY+7, d+p.cX+7, d+p.cY-7);

            stroke(cVERTEX);
            line(d+p.cX-7, d+p.cY-7, d+p.cX+10, d+p.cY+10);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+p.cX-7, d+p.cY-7, sz, sz);
            ellipse(d+p.cX+7, d+p.cY+7, sz, sz);

            break;

          case COMMANDS.L_ANGB[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cMEASURE);

            line(d+p.cX-10, d+p.cY+10, d+p.cX+10, d+p.cY-10);

            stroke(cVERTEX);

            line(d+p.cX-5, d+p.cY+5, d+p.cX-2, d+p.cY-10);
            line(d+p.cX-5, d+p.cY+5, d+p.cX+10, d+p.cY+2);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+p.cX-5,  d+p.cY+5,  sz, sz);
            ellipse(d+p.cX-2,  d+p.cY-10, sz, sz);
            ellipse(d+p.cX+10, d+p.cY+2,  sz, sz);

            break;

          case COMMANDS.L_PARR[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+p.cX+10, d+p.cY+5, d+p.cX-10, d+p.cY+10);

            stroke(cMEASURE);

            line(d+p.cX-10, d+p.cY-5, d+p.cX+10, d+p.cY-10);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+p.cX,  d+p.cY-7.5,  sz, sz);

            break;

          case COMMANDS.L_TANGENT[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            ellipse(d+p.cX+5, d+p.cY+5,12,12);

            stroke(cMEASURE);

            line(d+p.cX-10, d+p.cY+10, d+p.cX+10, d+p.cY-10);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+p.cX, d+p.cY, sz, sz);

            break;

          case COMMANDS.L_DIAMETER[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            ellipse(d+p.cX, d+p.cY, 20, 20);

            stroke(cMEASURE);

            line(d+p.cX+10*cos(PI/4),   d+p.cY-10*sin(PI/4),
                 d+p.cX+10*cos(PI*3/4), d+p.cY+10*sin(PI*3/4));

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+p.cX, d+p.cY, sz, sz);

            break;

          case COMMANDS.L_RADIUS[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            ellipse(d+p.cX, d+p.cY, 20, 20);

            stroke(cMEASURE);

            line(d+p.cX, d+p.cY,
                 d+p.cX+10*cos(PI/4), d+p.cY-10*sin(PI/4));

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+p.cX, d+p.cY, sz, sz);

            break;

          case COMMANDS.RAY_2P[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+p.cX-10, d+p.cY+10, d+p.cX+10, d+p.cY-10);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+p.cX+3, d+p.cY-3, sz, sz);
            ellipse(d+p.cX-10, d+p.cY+10, sz, sz);

            break;

          case COMMANDS.V_2P[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+p.cX-10, d+p.cY+10, d+p.cX+10, d+p.cY-10);

            noStroke();
            strokeWeight(0);
            fill(cPNT);

            ellipse(d+p.cX+10, d+p.cY-10, sz, sz);
            ellipse(d+p.cX-10, d+p.cY+10, sz, sz);

            noStroke();
            fill(cVERTEX);

            beginShape();
              vertex(d+p.cX+9, d+p.cY-9);
              vertex(d+p.cX+4, d+p.cY-9);
              vertex(d+p.cX+9, d+p.cY-4);
            endShape(CLOSE);

            break;

          case COMMANDS.V_FP[0]:

            noFill();

            strokeWeight(0.5);
            stroke(cVERTEX);

            line(d+p.cX-10, d+p.cY+10, d+p.cX+10, d+p.cY-10);

            noStroke();
            strokeWeight(0);

            fill(cMEASURE);
            ellipse(d+p.cX+10, d+p.cY-10, sz, sz);

            fill(cPNT);
            ellipse(d+p.cX-10, d+p.cY+10, sz, sz);

            noStroke();
            fill(cVERTEX);

            beginShape();
              vertex(d+p.cX+9, d+p.cY-9);
              vertex(d+p.cX+4, d+p.cY-9);
              vertex(d+p.cX+9, d+p.cY-4);
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
              vertex(d+p.cX,              d+p.cY-15*sin(PI/4));
              vertex(d+p.cX+15*cos(PI/4), d+p.cY+15*sin(PI/4));
              vertex(d+p.cX-15*cos(PI/4), d+p.cY+15*sin(PI/4));
            endShape(CLOSE);

            //~ Vertices
            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+p.cX,              d+p.cY-15*sin(PI/4), sz, sz);
            ellipse(d+p.cX+15*cos(PI/4), d+p.cY+15*sin(PI/4), sz, sz);
            ellipse(d+p.cX-15*cos(PI/4), d+p.cY+15*sin(PI/4), sz, sz);

            break;

          case COMMANDS.T_ISOSCELES[0]:

            noFill();

            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+p.cX,   d+p.cY-10);
              vertex(d+p.cX+7, d+p.cY+10);
              vertex(d+p.cX-7, d+p.cY+10);
            endShape(CLOSE);

            //~ Vertices
            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+p.cX,   d+p.cY-10, sz, sz);
            ellipse(d+p.cX+7, d+p.cY+10, sz, sz);
            ellipse(d+p.cX-7, d+p.cY+10, sz, sz);

            break;

          case COMMANDS.T_SCALENE[0]:

            noFill();

            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+p.cX-10, d+p.cY-10);
              vertex(d+p.cX-5,  d+p.cY+10);
              vertex(d+p.cX+10, d+p.cY+10);
            endShape(CLOSE);

            //~ Vertices
            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+p.cX-10, d+p.cY-10, sz, sz);
            ellipse(d+p.cX-5,  d+p.cY+10, sz, sz);
            ellipse(d+p.cX+10, d+p.cY+10, sz, sz);

            break;

          default:  break;

        }

      popStyle();

    };
    var drawCircle=function(){

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.C_CENTERP[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+p.cX, d+p.cY, sz, sz);
            ellipse(d+p.cX+10*cos(PI/4),
                    d+p.cY-10*sin(PI/4),
                    sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            ellipse(d+p.cX, d+p.cY, 20, 20);

            break;

          case COMMANDS.C_CENTERR[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+p.cX, d+p.cY, sz, sz);

            noFill();
            strokeWeight(1);
            stroke(CLRS.LINEA);

            line(d+p.cX, d+p.cY,
                 d+p.cX+10*cos(PI/4),
                 d+p.cY-10*sin(PI/4));

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            ellipse(d+p.cX, d+p.cY, 20, 20);

            break;

          case COMMANDS.C_3P[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            //~ ellipse(d+cX, d+cY, sz, sz);
            ellipse(d+p.cX+10*cos(PI/4),
                    d+p.cY-10*sin(PI/4),
                    sz, sz);
            ellipse(d+p.cX+10*cos(PI),
                    d+p.cY+10*sin(PI),
                    sz, sz);
            ellipse(d+p.cX+10*cos(PI/4),
                    d+p.cY+10*sin(PI/4),
                    sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            ellipse(d+p.cX, d+p.cY, 20, 20);

            break;

          default:  break;

        }

      popStyle();

    };
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

                ellipse(d+p.cX-10, d+p.cY-8, sz, sz);
                ellipse(d+p.cX+10, d+p.cY+8, sz, sz);

                noFill();
                strokeWeight(0.5);
                stroke(CLRS.LINE);

                beginShape();
                  vertex(d+p.cX-10, d+p.cY-8);
                  vertex(d+p.cX+10, d+p.cY-8);
                  vertex(d+p.cX+10, d+p.cY+8);
                  vertex(d+p.cX-10, d+p.cY+8);
                endShape(CLOSE);

            popMatrix();

            break;

          case COMMANDS.Q_SQUARE[0]:

            pushMatrix();

              translate(0.5,0.5);

                noStroke();
                strokeWeight(0);
                fill(CLRS.VERTEX);

                ellipse(d+p.cX-8, d+p.cY-8, sz, sz);
                ellipse(d+p.cX+8, d+p.cY+8, sz, sz);

                noFill();
                strokeWeight(0.5);
                stroke(CLRS.LINE);

                beginShape();
                  vertex(d+p.cX-8, d+p.cY-8);
                  vertex(d+p.cX+8, d+p.cY-8);
                  vertex(d+p.cX+8, d+p.cY+8);
                  vertex(d+p.cX-8, d+p.cY+8);
                endShape(CLOSE);

            popMatrix();

            break;

          case COMMANDS.Q_RHOMBUS[0]:

            pushMatrix();

              translate(0.5,0.5);

                noStroke();
                strokeWeight(0);
                fill(CLRS.VERTEX);

                ellipse(d+p.cX-6, d+p.cY-8, sz, sz);
                ellipse(d+p.cX+6, d+p.cY+8, sz, sz);

                noFill();
                strokeWeight(0.5);
                stroke(CLRS.LINE);

                beginShape();
                  vertex(d+p.cX-6,  d+p.cY-8);
                  vertex(d+p.cX+10, d+p.cY-8);
                  vertex(d+p.cX+6,  d+p.cY+8);
                  vertex(d+p.cX-10, d+p.cY+8);
                endShape(CLOSE);

              popMatrix();

              break;

            case COMMANDS.Q_PGRAM[0]:

              pushMatrix();

                translate(0.5,0.5);

                  noStroke();
                  strokeWeight(0);
                  fill(CLRS.VERTEX);

                  ellipse(d+p.cX-8, d+p.cY-8, sz, sz);
                  ellipse(d+p.cX+8, d+p.cY+8, sz, sz);

                  noFill();
                  strokeWeight(0.5);
                  stroke(CLRS.LINE);

                  beginShape();
                    vertex(d+p.cX-8,  d+p.cY-8);
                    vertex(d+p.cX+12, d+p.cY-8);
                    vertex(d+p.cX+8,  d+p.cY+8);
                    vertex(d+p.cX-12, d+p.cY+8);
                  endShape(CLOSE);

                popMatrix();

                break;

            case COMMANDS.Q_TRAPEZOID[0]:

              pushMatrix();

                translate(0.5,0.5);

                  noStroke();
                  strokeWeight(0);
                  fill(CLRS.VERTEX);

                  ellipse(d+p.cX-8, d+p.cY-8, sz, sz);
                  ellipse(d+p.cX+8, d+p.cY+8, sz, sz);

                  noFill();
                  strokeWeight(0.5);
                  stroke(CLRS.LINE);

                  beginShape();
                    vertex(d+p.cX-8,  d+p.cY-8);
                    vertex(d+p.cX+4,  d+p.cY-8);
                    vertex(d+p.cX+8,  d+p.cY+8);
                    vertex(d+p.cX-12, d+p.cY+8);
                  endShape(CLOSE);

                popMatrix();

                break;

            case COMMANDS.Q_KITE[0]:

              pushMatrix();

                translate(0.5,0.5);

                  noStroke();
                  strokeWeight(0);
                  fill(CLRS.VERTEX);

                  ellipse(d+p.cX,    d+p.cY, sz, sz);
                  ellipse(d+p.cX+12, d+p.cY, sz, sz);

                  noFill();
                  strokeWeight(0.5);
                  stroke(CLRS.LINE);

                  beginShape();
                    vertex(d+p.cX,    d+p.cY-12);
                    vertex(d+p.cX+12, d+p.cY);
                    vertex(d+p.cX,    d+p.cY+12);
                    vertex(d+p.cX-12, d+p.cY);
                  endShape(CLOSE);

                popMatrix();

                break;

          default:  break;

        }

      popStyle();

    };
    var drawArc=function(){

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.A_2P[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+p.cX+10*cos(PI/4),
                    d+p.cY-10*sin(PI/4),
                    sz, sz);
            ellipse(d+p.cX-10*cos(PI/4),
                    d+p.cY+10*sin(PI/4),
                    sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            arc(d+p.cX, d+p.cY, 20, 20, PI*3/4, 2*PI*7/8);

            break;

          case COMMANDS.A_CA[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+p.cX, d+p.cY, sz, sz);
            ellipse(d+p.cX+10*cos(PI/4),
                    d+p.cY-10*sin(PI/4),
                    sz, sz);
            ellipse(d+p.cX+10*cos(PI/4),
                    d+p.cY+10*sin(PI/4),
                    sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            arc(d+p.cX, d+p.cY, 20, 20, -PI/4, PI/4);

            break;

          case COMMANDS.A_CCA[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            //~ ellipse(d+cX, d+cY, sz, sz);
            ellipse(d+p.cX+10*cos(PI/4),
                    d+p.cY-10*sin(PI/4),
                    sz, sz);
            ellipse(d+p.cX+10*cos(PI),
                    d+p.cY+10*sin(PI),
                    sz, sz);
            ellipse(d+p.cX+10*cos(PI/4),
                    d+p.cY+10*sin(PI/4),
                    sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            arc(d+p.cX, d+p.cY, 20, 20, -PI, PI/4);

            break;

          case COMMANDS.A_CS[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+p.cX, d+p.cY, sz, sz);
            ellipse(d+p.cX+10*cos(PI/3),
                    d+p.cY-10*sin(PI/3),
                    sz, sz);
            ellipse(d+p.cX+10*cos(PI/3),
                    d+p.cY+10*sin(PI/3),
                    sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            line(d+p.cX, d+p.cY,
                 d+p.cX+10*cos(PI/3),
                 d+p.cY+10*sin(PI/3));

            line(d+p.cX, d+p.cY,
                 d+p.cX+10*cos(PI/3),
                 d+p.cY-10*sin(PI/3));

            arc(d+p.cX, d+p.cY, 20, 20, -PI/3, PI/3);

            break;

          case COMMANDS.A_CCS[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            //~ ellipse(d+cX, d+cY, sz, sz);
            ellipse(d+p.cX+10*cos(PI/4),
                    d+p.cY-10*sin(PI/4),
                    sz, sz);
            ellipse(d+p.cX+10*cos(PI),
                    d+p.cY+10*sin(PI),
                    sz, sz);
            ellipse(d+p.cX+10*cos(PI/4),
                    d+p.cY+10*sin(PI/4),
                    sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            line(d+p.cX, d+p.cY,
                 d+p.cX+10*cos(PI/3),
                 d+p.cY+10*sin(PI/3));

            line(d+p.cX, d+p.cY,
                 d+p.cX+10*cos(PI),
                 d+p.cY-10*sin(PI));

            arc(d+p.cX, d+p.cY, 20, 20, -PI, PI/4);

            break;

          case COMMANDS.COMPASS[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            //~ ellipse(d+cX, d+cY, sz, sz);
            ellipse(d+p.cX, d+p.cY, sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.Red);

            ellipse(d+p.cX, d+p.cY, 20, 20);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            line(d+p.cX, d+p.cY, d+p.cX+10, d+p.cY);

            break;

          default:  break;

        }

      popStyle();

    };
    var drawPolygon=function(){

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.POLYGONR[0]:

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+p.cX+10*cos(2*PI/5),  d+p.cY+10*sin(2*PI/5));
              vertex(d+p.cX+10*cos(4*PI/5),  d+p.cY+10*sin(4*PI/5));
              vertex(d+p.cX+10*cos(6*PI/5),  d+p.cY+10*sin(6*PI/5));
              vertex(d+p.cX+10*cos(8*PI/5),  d+p.cY+10*sin(8*PI/5));
              vertex(d+p.cX+10*cos(10*PI/5), d+p.cY+10*sin(10*PI/5));
            endShape(CLOSE);

            noFill();
            strokeWeight(1);
            stroke(CLRS.LINEA);

            line(d+p.cX, d+p.cY, d+p.cX+10*cos(8*PI/5), d+p.cY+10*sin(8*PI/5));

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+p.cX+10*cos(2*PI/5),  d+p.cY+10*sin(2*PI/5),  sz, sz);
            ellipse(d+p.cX+10*cos(4*PI/5),  d+p.cY+10*sin(4*PI/5),  sz, sz);
            ellipse(d+p.cX+10*cos(6*PI/5),  d+p.cY+10*sin(6*PI/5),  sz, sz);
            ellipse(d+p.cX+10*cos(8*PI/5),  d+p.cY+10*sin(8*PI/5),  sz, sz);
            ellipse(d+p.cX+10*cos(10*PI/5), d+p.cY+10*sin(10*PI/5), sz, sz);

            break;

          case COMMANDS.POLYGONRIGID[0]:

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+p.cX+10*cos(2*PI/5),  d+p.cY+10*sin(2*PI/5));
              vertex(d+p.cX+10*cos(4*PI/5),  d+p.cY+10*sin(4*PI/5));
              vertex(d+p.cX+10*cos(6*PI/5),  d+p.cY+10*sin(6*PI/5));
              vertex(d+p.cX+10*cos(8*PI/5),  d+p.cY+10*sin(8*PI/5));
              vertex(d+p.cX+10*cos(10*PI/5), d+p.cY+10*sin(10*PI/5));
            endShape(CLOSE);

            noFill();
            strokeWeight(1);
            stroke(CLRS.LINEA);

            line(d+p.cX, d+p.cY, d+p.cX+10*cos(8*PI/5), d+p.cY+10*sin(8*PI/5));

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+p.cX+10*cos(2*PI/5),  d+p.cY+10*sin(2*PI/5),  sz, sz);
            ellipse(d+p.cX+10*cos(4*PI/5),  d+p.cY+10*sin(4*PI/5),  sz, sz);
            ellipse(d+p.cX+10*cos(6*PI/5),  d+p.cY+10*sin(6*PI/5),  sz, sz);
            ellipse(d+p.cX+10*cos(8*PI/5),  d+p.cY+10*sin(8*PI/5),  sz, sz);
            ellipse(d+p.cX+10*cos(10*PI/5), d+p.cY+10*sin(10*PI/5), sz, sz);

            break;

          case COMMANDS.POLYGONV[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            ellipse(d+p.cX+10*cos(PI/4),
                    d+p.cY-10*sin(PI/4),
                    sz, sz);
            ellipse(d+p.cX+10*cos(PI),
                    d+p.cY+10*sin(PI),
                    sz, sz);
            ellipse(d+p.cX+10*cos(PI/4),
                    d+p.cY+10*sin(PI/4),
                    sz, sz);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+p.cX+10*cos(PI/4), d+p.cY-10*sin(PI/4));
              vertex(d+p.cX+10*cos(PI),   d+p.cY+10*sin(PI));
              vertex(d+p.cX+10*cos(PI/4), d+p.cY+10*sin(PI/4));
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

                line(d+p.cX-9, d+p.cY,   d+p.cX+9, d+p.cY);
                line(d+p.cX,   d+p.cY-9, d+p.cX,   d+p.cY+9);

                rect(d+p.cX, d+p.cY, 4, 4);

                noStroke();
                strokeWeight(0.0);
                fill(CLRS.LINE);

                triangle(d+p.cX+10, d+p.cY,    d+p.cX+6, d+p.cY-3, d+p.cX+6, d+p.cY+3);
                triangle(d+p.cX-10, d+p.cY,    d+p.cX-6, d+p.cY-3, d+p.cX-6, d+p.cY+3);
                triangle(d+p.cX,    d+p.cY-10, d+p.cX-3, d+p.cY-6, d+p.cX+3, d+p.cY-6);
                triangle(d+p.cX,    d+p.cY+10, d+p.cX-3, d+p.cY+6, d+p.cX+3, d+p.cY+6);

            popMatrix();

            break;

          case COMMANDS.REFLECT[0]:

            pushMatrix();

              translate(0.5,0.5);

                noFill();
                strokeWeight(0.25);
                stroke(CLRS.VERTEX);

                line(d+p.cX, d+p.cY-12, d+p.cX, d+p.cY+12);

                noFill();
                strokeWeight(0.5);
                stroke(CLRS.LINEA);

                triangle(d+p.cX+3, d+p.cY-8, d+p.cX+3, d+p.cY+8, d+p.cX+10, d+p.cY+8);

                stroke(CLRS.LINE);
                triangle(d+p.cX-3, d+p.cY-8, d+p.cX-3, d+p.cY+8, d+p.cX-10, d+p.cY+8);

            popMatrix();

            break;

          case COMMANDS.ROTATE[0]:

            pushMatrix();

              translate(0.5,0.5);

                noFill();
                strokeWeight(0.5);
                stroke(CLRS.LINE);

                arc(d+p.cX, d+p.cY, 20, 20, -PI/4, 3/2*PI);

                noStroke();
                strokeWeight(0);
                fill(CLRS.VERTEX);

                triangle(d+p.cX+2, d+p.cY-10, d+p.cX-2, d+p.cY-6, d+p.cX-2, d+p.cY-14);

              popMatrix();

              break;

            case COMMANDS.SCALE[0]:

              pushMatrix();

                translate(0.5,0.5);

                  noFill();
                  strokeWeight(0.5);
                  stroke(CLRS.LINEA);

                  rect(d+p.cX, d+p.cY, 20, 20);

                  stroke(CLRS.LINE);

                  rect(d+p.cX-5, d+p.cY+5, 10, 10);

                  noFill();
                  strokeWeight(0.5);
                  stroke(CLRS.VERTEX);

                  line(d+p.cX+1, d+p.cY-1, d+p.cX+7, d+p.cY-7);

                  noStroke();
                  strokeWeight(0);
                  fill(CLRS.VERTEX);

                  triangle(d+p.cX+7, d+p.cY-7, d+p.cX+3, d+p.cY-7, d+p.cX+7, d+p.cY-3);

                popMatrix();

                break;

            case COMMANDS.SHEAR[0]:

              pushMatrix();

                translate(0.5,0.5);

                  noFill();
                  strokeWeight(0.5);
                  stroke(CLRS.LINE);

                  beginShape();
                    vertex(d+p.cX-8, d+p.cY-8);
                    vertex(d+p.cX+4, d+p.cY-8);
                    vertex(d+p.cX+8, d+p.cY+8);
                    vertex(d+p.cX-8, d+p.cY+8);
                  endShape(CLOSE);

                  noFill();
                  strokeWeight(0.75);
                  stroke(CLRS.LINEA);

                  line(d+p.cX+1, d+p.cY-12, d+p.cX+1, d+p.cY+12);

                  noFill();
                  strokeWeight(0.75);
                  stroke(CLRS.VERTEX);

                  line(d+p.cX-5, d+p.cY+2, d+p.cX+4, d+p.cY+2);

                  noStroke();
                  strokeWeight(0);
                  fill(CLRS.VERTEX);

                  triangle(d+p.cX+5, d+p.cY+2, d+p.cX+2, d+p.cY-1, d+p.cX+2, d+p.cY+5);

                popMatrix();

                break;

          default:  break;

        }

      popStyle();

    };
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

            line(d+p.cX-9, d+p.cY,   d+p.cX+9, d+p.cY);
            line(d+p.cX,   d+p.cY-9, d+p.cX,   d+p.cY+9);

            rect(d+p.cX, d+p.cY, 4, 4);

            noStroke();
            strokeWeight(0.0);
            fill(CLRS.LINE);

            triangle(d+p.cX+10, d+p.cY,    d+p.cX+6, d+p.cY-3, d+p.cX+6, d+p.cY+3);
            triangle(d+p.cX-10, d+p.cY,    d+p.cX-6, d+p.cY-3, d+p.cX-6, d+p.cY+3);
            triangle(d+p.cX,    d+p.cY-10, d+p.cX-3, d+p.cY-6, d+p.cX+3, d+p.cY-6);
            triangle(d+p.cX,    d+p.cY+10, d+p.cX-3, d+p.cY+6, d+p.cX+3, d+p.cY+6);

            break;

          case COMMANDS.REFLECT[0]:

            noFill();
            strokeWeight(0.25);
            stroke(CLRS.VERTEX);

            line(d+p.cX, d+p.cY-12, d+p.cX, d+p.cY+12);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINEA);

            triangle(d+p.cX+3, d+p.cY-8, d+p.cX+3, d+p.cY+8, d+p.cX+10, d+p.cY+8);

            stroke(CLRS.LINE);
            triangle(d+p.cX-3, d+p.cY-8, d+p.cX-3, d+p.cY+8, d+p.cX-10, d+p.cY+8);

            break;

          case COMMANDS.ROTATE[0]:

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            arc(d+p.cX, d+p.cY, 20, 20, -PI/4, 3/2*PI);

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            triangle(d+p.cX+2, d+p.cY-10, d+p.cX-2, d+p.cY-6, d+p.cX-2, d+p.cY-14);

            break;

          case COMMANDS.SCALE[0]:

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINEA);

            rect(d+p.cX, d+p.cY, 20, 20);

            stroke(CLRS.LINE);

            rect(d+p.cX-5, d+p.cY+5, 10, 10);

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.VERTEX);

            line(d+p.cX+1, d+p.cY-1, d+p.cX+7, d+p.cY-7);

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            triangle(d+p.cX+7, d+p.cY-7, d+p.cX+3, d+p.cY-7, d+p.cX+7, d+p.cY-3);

            break;

          case COMMANDS.SHEAR[0]:

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+p.cX-8, d+p.cY-8);
              vertex(d+p.cX+4, d+p.cY-8);
              vertex(d+p.cX+8, d+p.cY+8);
              vertex(d+p.cX-8, d+p.cY+8);
            endShape(CLOSE);

            noFill();
            strokeWeight(0.75);
            stroke(CLRS.LINEA);

            line(d+p.cX+1, d+p.cY-12, d+p.cX+1, d+p.cY+12);

            noFill();
            strokeWeight(0.75);
            stroke(CLRS.VERTEX);

            line(d+p.cX-5, d+p.cY+2, d+p.cX+4, d+p.cY+2);

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            triangle(d+p.cX+5, d+p.cY+2, d+p.cX+2, d+p.cY-1, d+p.cX+2, d+p.cY+5);

            break;

          default:  break;

        }

      popStyle();
      popMatrix();

    };
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

            rect(d+p.cX, d+p.cY+8, 20, 6);

            strokeWeight(0.5);
            stroke(CLRS.BLACK);

            for(var n=-10; n<10; n+=2){
              if(n%4===0){ line(d+p.cX+n, d+p.cY+4, d+p.cX+n, d+p.cY+8); }
              else       { line(d+p.cX+n, d+p.cY+4, d+p.cX+n, d+p.cY+6); }
            }

            stroke(CLRS.LINE);

            line(d+p.cX-10, d+p.cY,   d+p.cX-10, d+p.cY-10);
            line(d+p.cX+10, d+p.cY,   d+p.cX+10, d+p.cY-10);
            line(d+p.cX-10, d+p.cY-5, d+p.cX+10, d+p.cY-5);

            fill(CLRS.LINE);
            noStroke();
            strokeWeight(0);

            triangle(d+p.cX-10, d+p.cY-5, d+p.cX-7, d+p.cY-8, d+p.cX-7, d+p.cY-2);
            triangle(d+p.cX+10, d+p.cY-5, d+p.cX+7, d+p.cY-8, d+p.cX+7, d+p.cY-2);

            break;

          case COMMANDS.PERIMETER[0]:

            //~ Ruler
            fill(CLRS.RULER);
            strokeWeight(0.25);
            stroke(CLRS.BLACK);

            rect(d+p.cX, d+p.cY+8, 20, 6);

            strokeWeight(0.5);
            stroke(CLRS.BLACK);

            for(var n=-10; n<10; n+=2){
              if(n%4===0){ line(d+p.cX+n, d+p.cY+4, d+p.cX+n, d+p.cY+8); }
              else       { line(d+p.cX+n, d+p.cY+4, d+p.cX+n, d+p.cY+6); }
            }

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+p.cX-10, d+p.cY-12);
              vertex(d+p.cX+10, d+p.cY-6);
              vertex(d+p.cX+10, d+p.cY+2);
              vertex(d+p.cX-10, d+p.cY+2);
            endShape(CLOSE);

            break;

          case COMMANDS.AREA[0]:

            //~ Ruler
            fill(CLRS.RULER);
            strokeWeight(0.25);
            stroke(CLRS.BLACK);

            rect(d+p.cX, d+p.cY+8, 20, 6);

            strokeWeight(0.5);
            stroke(CLRS.BLACK);

            for(var n=-10; n<10; n+=2){
              if(n%4===0){ line(d+p.cX+n, d+p.cY+4, d+p.cX+n, d+p.cY+8); }
              else       { line(d+p.cX+n, d+p.cY+4, d+p.cX+n, d+p.cY+6); }
            }

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            beginShape();
              vertex(d+p.cX-10, d+p.cY-12);
              vertex(d+p.cX+10, d+p.cY-6);
              vertex(d+p.cX+10, d+p.cY+2);
              vertex(d+p.cX-10, d+p.cY+2);
            endShape(CLOSE);

            break;


          case COMMANDS.VOLUME[0]:

            //~ Ruler
            fill(CLRS.RULER);
            strokeWeight(0.25);
            stroke(CLRS.BLACK);

            rect(d+p.cX, d+p.cY+8, 20, 6);

            strokeWeight(0.5);
            stroke(CLRS.BLACK);

            for(var n=-10; n<10; n+=2){
              if(n%4===0){ line(d+p.cX+n, d+p.cY+4, d+p.cX+n, d+p.cY+8); }
              else       { line(d+p.cX+n, d+p.cY+4, d+p.cX+n, d+p.cY+6); }
            }

            fill(CLRS.BLACK);
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            ellipse(d+p.cX, d+p.cY+2, 12, 4);

            line(d+p.cX-6, d+p.cY-12, d+p.cX-6, d+p.cY+2);
            line(d+p.cX+6, d+p.cY-12, d+p.cX+6, d+p.cY+2);

            ellipse(d+p.cX, d+p.cY-12, 12, 4);
            ellipse(d+p.cX, d+p.cY-12, 12, 4);

            break;

          case COMMANDS.RADIUS[0]:

            //~ Ruler
            fill(CLRS.RULER);
            strokeWeight(0.25);
            stroke(CLRS.BLACK);

            rect(d+p.cX, d+p.cY+8, 20, 6);

            strokeWeight(0.5);
            stroke(CLRS.BLACK);

            for(var n=-10; n<10; n+=2){
              if(n%4===0){ line(d+p.cX+n, d+p.cY+4, d+p.cX+n, d+p.cY+8); }
              else       { line(d+p.cX+n, d+p.cY+4, d+p.cX+n, d+p.cY+6); }
            }

            fill(CLRS.BLACK);
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            ellipse(d+p.cX, d+p.cY-5, 15, 15);

            pushMatrix();

              translate(d+p.cX, d+p.cY-5);

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

            rect(d+p.cX, d+p.cY+8, 20, 6);

            strokeWeight(0.5);
            stroke(CLRS.BLACK);

            for(var n=-10; n<10; n+=2){
              if(n%4===0){ line(d+p.cX+n, d+p.cY+4, d+p.cX+n, d+p.cY+8); }
              else       { line(d+p.cX+n, d+p.cY+4, d+p.cX+n, d+p.cY+6); }
            }

            fill(CLRS.BLACK);
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            ellipse(d+p.cX, d+p.cY-5, 15, 15);

            pushMatrix();

              translate(d+p.cX, d+p.cY-5);

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
              vertex(d+p.cX-8, d+p.cY-8);
              vertex(d+p.cX+4, d+p.cY-8);
              vertex(d+p.cX+8, d+p.cY+8);
              vertex(d+p.cX-8, d+p.cY+8);
            endShape(CLOSE);

            noFill();
            strokeWeight(0.75);
            stroke(CLRS.LINEA);

            line(d+p.cX+1, d+p.cY-12, d+p.cX+1, d+p.cY+12);

            noFill();
            strokeWeight(0.75);
            stroke(CLRS.VERTEX);

            line(d+p.cX-5, d+p.cY+2, d+p.cX+4, d+p.cY+2);

            noStroke();
            strokeWeight(0);
            fill(CLRS.VERTEX);

            triangle(d+p.cX+5, d+p.cY+2, d+p.cX+2, d+p.cY-1, d+p.cX+2, d+p.cY+5);

            break;

          default:  break;

        }

      popStyle();
      popMatrix();

    };

    var drawLineType=function(){

      //~ LT_HAIRLINE:  [ 212,  'Hairline',         'HAIRLINE'              ],
      //~ LT_SOLID:     [ 213,  'Solid',            'SOLID'                 ],
      //~ LT_DASHED:    [ 214,  'Dashed',           'DASHED'                ],
      //~ LT_DOTTED:    [ 215,  'Dottted',          'DOTTED'                ],
      //~ LT_DASHDOT:   [ 216,  'DashDot',          'DASHDOT'               ],

      pushMatrix();

        translate(0.5,0.5);

      pushStyle();

        rectMode(CENTER);

        noFill();
        stroke(CLRS.White);
        strokeWeight(1);

        var start=d+p.cX-p.w/2+10;
        var end=  d+p.cX+p.w/2-10;

        switch(p.c){

          case COMMANDS.LT_HAIRLINE[0]:

            strokeWeight(0.25);

            line(d+p.cX-w/2+10, d+p.cY, d+p.cX+w/2-10, d+p.cY);

            break;

          case COMMANDS.LT_SOLID[0]:

            line(d+p.cX-p.w/2+10, d+p.cY, d+p.cX+p.w/2-10, d+p.cY);

            break;

          case COMMANDS.LT_DASHED[0]:

            for(var n=start; n<end; n+=10) {

              line(n, d+p.cY, n+5, d+p.cY);

            }

            break;

          case COMMANDS.LT_DOTTED[0]:

            noStroke();
            fill(CLRS.White);

            for(var n=start; n<end; n+=5) {
              ellipse(n, d+p.cY, 1, 1);
            }

            break;

          case COMMANDS.LT_DASHDOT[0]:

            for(var n=start; n<end; n+=10){

              noFill();
              stroke(CLRS.White);

              line(n, d+p.cY, n+3, d+p.cY);

              noStroke();
              fill(CLRS.White);

              ellipse(n+6.5, d+p.cY, 1, 1);

            }

            break;

          default:    break;

        }

      popStyle();

      popMatrix();

    };
    var drawColor=function(){

    //~ Colors
    //~
    //~ Red       RedOrange
    //~ Orange    YellowOrange
    //~ Yellow    YellowGreen
    //~ Green     BlueGreen
    //~ Blue      BlueViolet
    //~ Violet    RedViolet

      pushMatrix();

        translate(0.5,0.5);

      pushStyle();

        rectMode(CENTER);

        noFill();
        stroke(CLRS.White);
        strokeWeight(1);

        strokeWeight(0.25);
        fill(p.g);
        rect(d+cX, d+cY, p.h-10, p.h-10);

      popStyle();

      popMatrix();
    };
    var drawGrid=function(){

      pushMatrix();

        translate(0.5,0.5);

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.GRIDPROPS[0]:

            noFill();
            stroke(CLRS.Gray2);
            if(p.hit){ stroke(CLRS.WHITE); }
            strokeWeight(3);

            line(d+p.cX-7, d+p.cY-5, d+p.cX+7, d+p.cY-5);
            line(d+p.cX-7, d+p.cY,   d+p.cX+7, d+p.cY);
            line(d+p.cX-7, d+p.cY+5, d+p.cX+7, d+p.cY+5);

            noFill();
            stroke(CLRS.Gray2);
            if(p.hit){ stroke(CLRS.WHITE); }
            strokeWeight(2);

            line(d+p.cX-6, d+p.cY-5, d+p.cX+6, d+p.cY-5);
            line(d+p.cX-6, d+p.cY,   d+p.cX+6, d+p.cY);
            line(d+p.cX-6, d+p.cY+5, d+p.cX+6, d+p.cY+5);

            break;

          case COMMANDS.STG[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.LINE);

            for(var row=-10; row<15; row+=5){
              for(var col=-10; col<15; col+=5){
                ellipse(d+p.cX+col, d+p.cY+row, 1, 1);
              }
            }

            noFill();
            stroke(CLRS.LINE);
            strokeWeight(1);

            line(d+p.cX-8, d+p.cY,   d+p.cX+9, d+p.cY);
            line(d+p.cX,   d+p.cY-9, d+p.cX,   d+p.cY+9);

            break;

          case COMMANDS.ORTHO[0]:

            noFill();
            stroke(CLRS.LINE);
            strokeWeight(1);

            line(d+p.cX-10, d+p.cY+10, d+p.cX+10, d+p.cY+10);
            line(d+p.cX-10, d+p.cY-10, d+p.cX-10, d+p.cY+10);

            strokeWeight(0.5);

            line(d+p.cX-10, d+p.cY+4, d+p.cX-4, d+p.cY+4);
            line(d+p.cX-4,  d+p.cY+4, d+p.cX-4, d+p.cY+10);

            break;

          default:  break;

        }

      popStyle();
      popMatrix();

    };
    var drawMisc=function(){


      pushMatrix();

        translate(0.5,0.5);

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.SELECT[0]:

            noFill();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            line(d+p.cX-9, d+p.cY,   d+p.cX+9, d+p.cY);
            line(d+p.cX,   d+p.cY-9, d+p.cX,   d+p.cY+9);

            rect(d+p.cX, d+p.cY, 4, 4);

            break;

          case COMMANDS.STG[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.LINE);

            for(var row=-10; row<15; row+=5){
              for(var col=-10; col<15; col+=5){
                ellipse(d+p.cX+col, d+p.cY+row, 1, 1);
              }
            }

            noFill();
            stroke(CLRS.LINE);
            strokeWeight(1);

            line(d+p.cX-8, d+p.cY,   d+p.cX+9, d+p.cY);
            line(d+p.cX,   d+p.cY-9, d+p.cX,   d+p.cY+9);

            break;

          case COMMANDS.ORTHO[0]:

            noFill();
            stroke(CLRS.LINE);
            strokeWeight(1);

            line(d+p.cX-10, d+p.cY+10, d+p.cX+10, d+p.cY+10);
            line(d+p.cX-10, d+p.cY-10, d+p.cX-10, d+p.cY+10);

            strokeWeight(0.5);

            line(d+p.cX-10, d+p.cY+4, d+p.cX-4, d+p.cY+4);
            line(d+p.cX-4,  d+p.cY+4, d+p.cX-4, d+p.cY+10);

            break;

          default:  break;

        }

      popStyle();
      popMatrix();

    };

    switch(true){

      case p.c===COMMANDS.SELECT[0]:      drawMisc();       break;

      case (p.c===COMMANDS.CURRENT[0]):    break;

      case (p.c>=COMMANDS.GRID[0] &&
            p.c<=COMMANDS.FS[0]):         drawGrid();       break;
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
      case (p.c>=COMMANDS.LINETYPE[0] &&
            p.c<=COMMANDS.LT_DASHDOT[0]): drawLineType();   break;
      case (p.c>=COMMANDS.STROKE[0] &&
            p.c<=COMMANDS.FILL[0]):       drawColor();      break;

      default:      break;

    }

  };


  //~ Properties =======================================================
  var propC=function(i,p,x,y,w,h,r,k,v,c,g){

    this.i=i;     //~ guid
    this.p=p;     //~ parent

    this.x=x;     //~ left
    this.y=y;     //~ top
    this.w=w;     //~ width
    this.h=h;     //~ height
    this.r=r;     //~ radius

    this.k=k;     //~ hit cursor
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
  var control=function(c,l,a,ctrls){


    //~ controls properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.i=c.i;                //~ guid
    this.parent=c.p;           //~ parent

    this.x=c.x;                //~ left
    this.y=c.y;                //~ top
    this.w=c.w;                //~ width
    this.h=c.h;                //~ height
    this.r=c.r;                //~ corner radius

    this.cX=c.w/2;
    this.cY=c.h/2;

    this.k=c.k;                //~ hit cursor

    this.v=c.v;                //~ value
    this.c=c.c;                //~ command
    this.g=c.g;                //~ tag


    //~ appearance properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.fill=l.fill;          //~ fill color
    this.fillH=l.fillH;        //~ fill color highlight
    this.stroke=l.stroke;      //~ stroke color
    this.strokeH=l.strokeH;    //~ stroke color highlight

    this.weight=l.weight;      //~ strokeWeight
    this.weightH=l.weightH;    //~ strokeWeight highlight


    //~ text properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.text=a.text;          //~ text caption

    this.tfill=a.fill;         //~ text color
    this.tfillH=a.fillH;       //~ text color highlight
    this.alignX=a.alignX;      //~ horizontal alignment
    this.alignY=a.alignY;      //~ vertical alignment
    this.size=a.size;          //~ text size
    this.sizeH=a.sizeH;        //~ text size highlight

    //~ misc properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    this.hit=false;             //~ mouse is over the control
    
    this.visible=true;          //~ is the control currently being displayed
    this.ctrls=ctrls;           //~ array of child controls

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
    //~ this.hit=false;
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

  //~ Telemetry ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var telemetry=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
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
            cursor(p.k);

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

        for(var c in p.ctrls){ p.ctrls[c].draw(); }

    popMatrix();

  };


  //~ Buttons ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var button=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
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
            cursor(p.k);

          }

          if(p.v){ fill(getProp(p.g)); }

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

    popMatrix();

  };

  //~ Icon
  var buttonI=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
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
            cursor(p.k);

          }

          if(p.v){ fill(getProp(p.g)); }

          if(p.fill===CLRS.TRANSPARENT){
            noFill();
            noStroke();
          }

          if(app.current===p.c){ fill(getColor(CLRS.GRAY,25)); }

          rect(d, d, p.w, p.h, p.r);

          switch(true){

            case (p.c>=COMMANDS.GRID[0] &&
                  p.c<=COMMANDS.FS[0]): drawGrid();               break;


            default:      break;

          }

        popStyle();

    popMatrix();

  };
  buttonI.prototype.clicked=function(){
    if(this.hit){

      reset();

      commands(this.c, this.g);

      this.parent.ctrls[0].c=this.c;
      this.parent.ctrls[0].g=this.g;

    }
  };

  //~ Color
  var buttonC=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
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
            cursor(p.k);

          }

          rect(d, d, p.w, p.h, p.r);

          fill(p.g);

          rect(d+4, d+4, p.w-8, p.h-8, p.r);

        popStyle();

    popMatrix();

  };
  buttonC.prototype.clicked=function(){
    if(this.hit && app.focus===this.i){ commands(this.c, this.g); }
  };
  //~ buttonC.prototype.moved=function(x,y){
//~
    //~ if(app.mouseX>x+this.x &&
       //~ app.mouseX<x+this.x+this.w &&
       //~ app.mouseY>y+this.y &&
       //~ app.mouseY<y+this.y+this.h){
      //~ this.hit=true;
      //~ app.focus=this.i;
    //~ }
    //~ else{
      //~ this.parent.hit=false;
    //~ }
//~
  //~ };

  //~ Return Property
  var buttonP=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
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
            cursor(p.k);

          }

          rect(d, d, p.w, p.h, p.r);

        popStyle();

    popMatrix();

  };

  var buttonA=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
  };
  buttonA.prototype=Object.create(control.prototype);
  buttonA.prototype.draw=function(){

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
            cursor(p.k);

          }

          p.c=app.current;

          rect(d, d, p.w, p.h, p.r);

          drawIcon(p, d);

        popStyle();

    popMatrix();

  };


  
  //~ Shape
  var buttonS=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
  };
  buttonS.prototype=Object.create(control.prototype);
  buttonS.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit && p.parent.hit){

            if(app.left){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
            cursor(p.k);

          }

          if(p.v){ fill(getProp(p.g)); }

          if(p.fill===CLRS.TRANSPARENT){
            noFill();
            noStroke();
          }

          //~ if(app.current===p.c){ fill(getColor(CLRS.GRAY,25)); }

          rect(d, d, p.w, p.h, p.r);

          drawIcon(p, d);

          fill(p.tfill);

        popStyle();

    popMatrix();

  };
  buttonS.prototype.clicked=function(){
    if(this.hit){

      reset();

      commands(this.c, this.g);

      this.parent.ctrls[0].c=this.c;
      this.parent.ctrls[0].g=this.g;
      this.parent.v=false;
      println(this.parent.v);
    }
  };

  //~ Toggle
  var buttonT=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
  };
  buttonT.prototype=Object.create(control.prototype);
  buttonT.prototype.draw=function(){

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

    var drawGrid=function(){

      pushMatrix();

        translate(0.5,0.5);

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.LINES[0]:

            noStroke();
            strokeWeight(0.5);
            stroke(CLRS.LINE);

            if(p.v){ stroke(CLRS.LINEH); }

            for(var row=-8; row<=8; row+=4){

              line(d+cX-9,   d+cY+row, d+cX+9,   d+cY+row);
              line(d+cX+row, d+cY-9,   d+cX+row, d+cY+9);

            }

            break;

          case COMMANDS.STG[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.LINE);

            for(var row=-8; row<9; row+=4){
              for(var col=-8; col<9; col+=4){
                ellipse(d+cX+col, d+cY+row, 1, 1);
              }
            }

            noFill();
            stroke(CLRS.LINE);
            strokeWeight(1);

            if(p.v){ stroke(CLRS.LINEH); }

            line(d+cX-8, d+cY,   d+cX+9, d+cY);
            line(d+cX,   d+cY-9, d+cX,   d+cY+9);

            break;

          case COMMANDS.ORTHO[0]:

            noFill();
            stroke(CLRS.LINE);
            strokeWeight(1);

            if(p.v){ stroke(CLRS.LINEH); }

            line(d+cX-8, d+cY+8, d+cX+8, d+cY+8);
            line(d+cX-8, d+cY-8, d+cX-8, d+cY+8);

            strokeWeight(0.5);

            line(d+cX-8, d+cY+4, d+cX-4, d+cY+4);
            line(d+cX-4, d+cY+4, d+cX-4, d+cY+8);

            break;

          default:  break;

        }

      popStyle();
      popMatrix();

    };
    var drawView=function(){

      pushMatrix();

        translate(0.5,0.5);

      pushStyle();

        rectMode(CENTER);

        switch(p.c){

          case COMMANDS.SELECT[0]:

            noFill();
            stroke(CLRS.LINE);
            //~ if(p.hit){ stroke(p.fillH); }

            strokeWeight(2);

            line(d+cX, d+cY-6, d+cX, d+cY+6);

            noStroke();
            fill(CLRS.LINE);

            triangle(d+cX-5, d+cY-4,
                     d+cX,   d+cY-8,
                     d+cX+5, d+cY-4);
            break;

          case COMMANDS.SELECTALL[0]:

            noStroke();
            strokeWeight(0);
            fill(CLRS.LINE);


            break;

          case COMMANDS.SELECT_WINDOW[0]:

            noFill();
            stroke(CLRS.LINE);
            strokeWeight(1);

            break;

          case COMMANDS.PAN[0]:

            noFill();
            fill(CLRS.LINE);
            strokeWeight(1);

            textAlign(CENTER,CENTER);
            textSize(16);
            text("P", d+cX, d+cY);

            break;

          case COMMANDS.ZOOMIN[0]:

            noFill();
            stroke(CLRS.LINE);
            strokeWeight(1.5);

            if(p.v){ stroke(CLRS.LINEH); }

            fill(CLRS.FILL);

            ellipse(d+cX-4, d+cY-4, 12, 12);

            strokeWeight(2);

            line(d+cX, d+cY, d+cX+7, d+cY+7);

            fill(CLRS.White);
            strokeWeight(1);

            textAlign(CENTER,CENTER);
            textSize(10);
            text("+", d+cX-4, d+cY-4);

            break;

          case COMMANDS.ZOOMOUT[0]:

            noFill();
            stroke(CLRS.LINE);
            strokeWeight(1.5);

            if(p.v){ stroke(CLRS.LINEH); }

            fill(CLRS.FILL);

            ellipse(d+cX-4, d+cY-4, 12, 12);

            strokeWeight(2);

            line(d+cX, d+cY, d+cX+7, d+cY+7);

            fill(CLRS.White);
            strokeWeight(1);

            textAlign(CENTER,CENTER);
            textSize(10);
            text("-", d+cX-4, d+cY-4);

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
          noFill();
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit && p.parent.hit){

            if(app.left){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
            cursor(p.k);

          }

          if(p.v){ fill(CLRS.Gray10); }
          //~ if(app.current===p.c){ fill(getColor(CLRS.GRAY,25)); }

          //~ stroke(CLRS.WHITE);
          rect(d, d, p.w, p.h, p.r);

          switch(true){

            case (p.c>=COMMANDS.GRID[0] &&
                  p.c<=COMMANDS.FS[0]):             drawGrid();   break;

            case (p.c>=COMMANDS.VIEW[0] &&
                  p.c<=COMMANDS.MODIFY[0]):         drawView();   break;

            //~ case (p.c>=COMMANDS.SELECT[0] &&
                  //~ p.c<=COMMANDS.SELECT_WINDOW[0]):  drawSelect(); break;

            default:      break;

          }

        popStyle();

    popMatrix();

  };
  buttonT.prototype.clicked=function(){
    if(this.hit){

      //~ reset();

      commands(this.c, this.g);
      this.v=!this.v;
      //~ this.parent.ctrls[0].c=this.c;
      //~ this.parent.ctrls[0].g=this.g;

      //~ this.parent.v=!this.parent.v;

      //~ app.current=this.c;

    }
  };

  //~ Labels ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var label=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
  };
  label.prototype=Object.create(control.prototype);
  label.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          textFont(createFont('monospace'));
          textSize(p.size);
          p.w=textWidth(p.g);

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){

            if(app.left && app.debug){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
            cursor(p.k);

          }

          if(app.debug){
            if(p.alignX===LEFT)       {  rect(d, d, p.w, p.h, p.r);      }
            else if(p.alignX===CENTER){ rect(d-p.w/2, d, p.w, p.h, p.r); }
          }

          fill(p.tfill);

          textAlign(p.alignX,p.alignY);
          textSize(p.size);

          if(p.hit){
            fill(p.tfillH);
            //~ textSize(p.sizeH);
          }

          text(p.g, d, d+p.h/2);

        popStyle();

    popMatrix();

  };

  //~ Return property
  var labelP=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
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

          if(p.hit && app.debug){

            if(app.left){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
            cursor(p.k);

          }

          if(p.alignX===LEFT)       { rect(d, d, p.w, p.h, p.r);       }
          else if(p.alignX===CENTER){ rect(d-p.w/2, d, p.w, p.h, p.r); }

          fill(p.tfill);

          textAlign(p.alignX,p.alignY);
          textSize(p.size);

          if(p.parent.hit && app.debug){
            fill(CLRS.YELLOW);
            //~ textSize(p.sizeH);
          }

          text(getProp(p.c), d, d+p.h/2);

        popStyle();

    popMatrix();

  };

  //~ Rotate
  var labelR=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
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
            cursor(p.k);

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

    popMatrix();


  };
  labelR.prototype.moved=function(x,y){

    if(app.mouseX>x+this.x-this.w/2 && app.mouseX<x+this.x+this.w/2 &&
       app.mouseY>y+this.y-this.h/2 && app.mouseY<y+this.y+this.h/2){
      this.hit=true;
    }
    else{
      this.hit=false;
    }

  };

  //~ TextBox ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var textBox=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
  };
  textBox.prototype=Object.create(control.prototype);
  textBox.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          textSize(p.size);
          //~ p.w=textWidth(p.g);

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){

            if(app.left && app.debug){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
            cursor(p.k);

          }

          if(p.alignX===LEFT)       {  rect(d, d, p.w, p.h, p.r);      }
          else if(p.alignX===CENTER){ rect(d-p.w/2, d, p.w, p.h, p.r); }

          fill(p.tfill);

          textAlign(p.alignX,p.alignY);
          textSize(p.size);

          if(p.hit){
            fill(p.tfillH);
            //~ textSize(p.sizeH);
          }

          //~ text(p.g, d+5, d+p.h/2);
          text(getProp(p.c), d+3, d+p.h/2);

        popStyle();

    popMatrix();

  };


  //~ Return property
  var checkbox=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
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

            if(app.left){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
            cursor(p.k);

          }

          noStroke();
          fill(CLRS.WHITE);

          if     (p.alignX===LEFT)  { rect(d, d, p.w, p.h, p.r); }
          else if(p.alignX===CENTER){ rect(d, d, p.w, p.h, p.r); }

          if(getProp(p.c)){

            fill(getColor(CLRS.GRID,90));
            rect(d,d,p.w*0.64,p.h*0.64);

          }

        popStyle();

    popMatrix();

  };


  //~ Spacer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var spacer=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
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

          if(p.hit && app.debug){

            if(app.left){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
            cursor(p.k);

          }

          rect(d, d, p.w, p.weight, p.r);

        popStyle();

    popMatrix();


  };


  //~ Slider ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var sliderH=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
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

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
            cursor(p.k);

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

    popMatrix();

  };
  sliderH.prototype.clicked=function(){
    if(this.hit && app.focus===this.i){
      this.v=constrain(app.mouseX-this.parent.x-this.x, 0, this.w);
      commands(this.c, this.w*this.v/this.w);
    }
  };
  sliderH.prototype.moved=function(x,y){

    if(app.mouseX>x+this.x && app.mouseX<x+this.x+this.w &&
       app.mouseY>y+this.y && app.mouseY<y+this.y+this.h){

      this.hit=true;
      app.focus=this.i;

    }
    else{
      this.hit=false;
    }

  };
  sliderH.prototype.dragged=function(){
    if(this.hit && app.left){
      this.v=constrain(app.mouseX-this.parent.x-this.x, 0, this.w);
      commands(this.c, this.w*this.v/this.w);
    }
  };


  //~ Strips ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //~ Horizontal
  var menuH=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
    this.hitExpand=false;       //~ mouse is over the expand/collapse area    
  };
  menuH.prototype=Object.create(control.prototype);
  menuH.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          //~ set width
          if(p.v){ p.w=p.ctrls[0].w*(p.ctrls.length); }
          else   { p.w=p.ctrls[0].w+1;                }

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){
            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
            cursor(p.k);
          }

          noStroke();

          rect(d, d, p.w, p.h, p.r);

          fill(color(32,32,32));

          if(p.hitExpand){
            fill(color(48,48,48));
          }

          //~ rect(d+p.w-9, d+1, 8, p.h-2, 0);

          if(p.v){ for(var c in p.ctrls){ p.ctrls[c].draw(); } }
          else   { p.ctrls[0].draw();                          }

          fill(CLRS.Gray8);

          if(p.hitExpand){
            fill(CLRS.Gray3);
          }

          var w=p.ctrls[0].w;
          
          if(p.v){
            triangle(d+w-2, d+p.h-3-6,
                     d+w-7, d+p.h-6,
                     d+w-2, d+p.h+3-6);
          }
          else{
            triangle(d+w-7, d+p.h-3-6,
                     d+w-2, d+p.h-6,
                     d+w-7, d+p.h+3-6);
          }

          if(p.hit){
            fill(p.tfillH);
          }

          textAlign(p.alignX,p.alignY);

          //~ text(p.g, p.w/2, p.h/2);

        popStyle();

    popMatrix();

  };
  menuH.prototype.clicked=function(){

    if(this.hit){

      if(this.hitExpand){
        this.v=!this.v;
      }
      else{ 
        //~ for(var c in this.ctrls){ this.ctrls[c].clicked(); }
        this.v=false;
        //~ println(this.v);
      }

      for(var c in this.ctrls){ this.ctrls[c].clicked(); }

    }

  };
  //~ menuH.prototype.clickedR=function(){
    //~ if(this.hit){
      //~ for(var c in this.ctrls){ this.ctrls[c].clickedR(); }
    //~ }
  //~ };
  menuH.prototype.moved=function(x,y){

    if(app.mouseX>x+this.x &&
       app.mouseX<x+this.x+this.w &&
       app.mouseY>y+this.y &&
       app.mouseY<y+this.y+this.h){

      this.hit=true;

      if(app.mouseX>x+this.x+this.ctrls[0].w-10){
        this.hitExpand=true;
        this.v=true;
      }
      else{
        this.hitExpand=false;
        this.v=false;
      }

      app.focus=this.i;

      if(this.v){
        for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x, y+this.y); }
      }
      else{
        this.ctrls[0].moved(x+this.x, y+this.y);
      }

    }
    else{
      this.hit=false;
      this.hitExpand=false;
      this.v=false;
    }

  };

    //~ Menu Item
  var menuItem=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
  };
  menuItem.prototype=Object.create(control.prototype);
  menuItem.prototype.draw=function(){

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
            cursor(p.k);

          }

          if(p.v){ fill(getProp(p.g)); }

          if(p.fill===CLRS.TRANSPARENT){
            noFill();
            noStroke();
          }

          //~ if(app.current===p.c){ fill(getColor(CLRS.GRAY,25)); }

          rect(d, d, p.w, p.h, p.r);

          drawIcon(p, d);

          fill(p.tfill);

        popStyle();

    popMatrix();

  };
  menuItem.prototype.moved=function(x,y){
    
    if(app.mouseX>x+this.x &&
       app.mouseX<x+this.x+this.w &&
       app.mouseY>y+this.y &&
       app.mouseY<y+this.y+this.h){

      this.hit=true;

    }
    else{
      this.hit=false;
    }

  };  
  menuItem.prototype.clicked=function(){
    
    if(this.hit){

      reset();

      commands(this.c, this.g);

      this.parent.ctrls[0].c=this.c;
      this.parent.ctrls[0].g=this.g;
      this.parent.v=false;

    }
    
  };
  
  //~ Horizontal
  var stripH=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
  };
  stripH.prototype=Object.create(control.prototype);
  stripH.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          //~ set width
          if(p.v){ p.w=p.ctrls[0].w*(p.ctrls.length); }
          else   { p.w=p.ctrls[0].w+1;                }

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){
            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
            cursor(p.k);
          }

          noStroke();

          rect(d, d, p.w, p.h, p.r);

          fill(color(32,32,32));

          if(p.hitExpand){
            fill(color(48,48,48));
          }

          //~ rect(d+p.w-9, d+1, 8, p.h-2, 0);

          if(p.v){ for(var c in p.ctrls){ p.ctrls[c].draw(); } }
          else   { p.ctrls[0].draw();                          }

          fill(CLRS.Gray8);

          if(p.hitExpand){
            fill(CLRS.Gray3);
          }

          var w=p.ctrls[0].w;
          
          if(p.v){
            triangle(d+w-2, d+p.h-3-6,
                     d+w-7, d+p.h-6,
                     d+w-2, d+p.h+3-6);
          }
          else{
            triangle(d+w-7, d+p.h-3-6,
                     d+w-2, d+p.h-6,
                     d+w-7, d+p.h+3-6);
          }

          if(p.hit){
            fill(p.tfillH);
          }

          textAlign(p.alignX,p.alignY);

          //~ text(p.g, p.w/2, p.h/2);

        popStyle();

    popMatrix();

  };
  stripH.prototype.clicked=function(){

    if(this.hitExpand){
      //~ this.v=!this.v;
    }
    else if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].clicked(); }
    }
    
  };
  stripH.prototype.clickedR=function(){
    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].clickedR(); }
    }
  };
  stripH.prototype.moved=function(x,y){

    if(this.alignX===LEFT){

      if(app.mouseX>x+this.x && app.mouseX<x+this.x+this.w &&
         app.mouseY>y+this.y && app.mouseY<y+this.y+this.h){

        this.hit=true;

        if(app.mouseX>x+this.x+this.ctrls[0].w-10){
          this.hitExpand=true;
          this.v=true;
        }
        else{
          this.hitExpand=false;
          this.v=false;
        }

        app.focus=this.i;

        if(this.v){
          for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x, y+this.y); }
        }
        else{
          this.ctrls[0].moved(x+this.x, y+this.y);
        }

      }
      else{
        this.hit=false;
        this.hitExpand=false;
        this.v=false;
      }

    }
    else if(this.alignX===CENTER){

      if(app.mouseX>=x+this.x-this.w/2 && app.mouseX<=x+this.x+this.w/2 &&
         app.mouseY>=y+this.y-this.h/2 && app.mouseY<=y+this.y+this.h/2){
        this.hit=true;
        app.focus=this.i;
        for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x,y+this.y); }
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

  //~ Vertical
  var stripV=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
  };
  stripV.prototype=Object.create(control.prototype);
  stripV.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          //~ set height
          if(p.v){ p.h=p.ctrls[0].h + p.ctrls[1].h*(p.ctrls.length-1); }
          else   { p.h=p.ctrls[0].h;                                   }

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){
            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
            cursor(p.k);
          }

          noStroke();

          rect(d, d, p.w, p.h, p.r);

          fill(color(32,32,32));

          if(p.hit && p.hitExpand){
            fill(color(48,48,48));
          }

          //~ rect(d+p.w-16, d+1, 16, p.ctrls[0].h, 0);

          fill(CLRS.Gray_9);

          if(p.hit && p.hitExpand){
            fill(CLRS.Gray_6);
          }

          if(p.v){
            triangle(d+p.w-3,  d+10,
                     d+p.w-8,  d+5,
                     d+p.w-13, d+10);
          }
          else{
            triangle(d+p.w-3,  d+5,
                     d+p.w-8,  d+10,
                     d+p.w-13, d+5);
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
  stripV.prototype.clicked=function(){
    if(this.hit){
      //~ if(app.focus===this.i){
      //~ if(this.hitExpand){
        this.v=!this.v;
      //~ }
      for(var c in this.ctrls){ this.ctrls[c].clicked(); }
    }
    process();
  };
  stripV.prototype.clickedR=function(){
    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].clickedR(); }
    }
  };
  stripV.prototype.moved=function(x,y){

    if(this.alignX===LEFT){

      if(app.mouseX>x+this.x && app.mouseX<x+this.x+this.w &&
         app.mouseY>y+this.y && app.mouseY<y+this.y+this.h){

        this.hit=true;

        if(app.mouseX>x+this.x+this.w-16 &&
           app.mouseY>y+this.y && app.mouseY<y+this.y+16){
          this.hitExpand=true;
        }
        else{
          this.hitExpand=false;
        }

        app.focus=this.i;

        if(this.v){
          for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x, y+this.y); }
        }
        else{
          this.ctrls[0].moved(x+this.x, y+this.y);
        }
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
        for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x,y+this.y); }
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

  //~ Vertical: Color
  var stripVC=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
  };
  stripVC.prototype=Object.create(control.prototype);
  stripVC.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          //~ set height
          if(p.v){ p.h=15 + p.ctrls[0].h*4; }
          else   { p.h=15;                  }

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){
            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
            cursor(p.k);
          }

          noStroke();

          rect(d, d, p.w, p.h, p.r);

          fill(color(32,32,32));

          if(p.hit && p.hitExpand){
            fill(color(48,48,48));
          }

          //~ rect(d+p.w-16, d+1, 16, p.ctrls[0].h, 0);

          fill(CLRS.Gray_9);

          if(p.hit && p.hitExpand){
            fill(CLRS.Gray_6);
          }

          if(p.v){
            triangle(d+p.w-3,  d+10,
                     d+p.w-8,  d+5,
                     d+p.w-13, d+10);
          }
          else{
            triangle(d+p.w-3,  d+5,
                     d+p.w-8,  d+10,
                     d+p.w-13, d+5);
          }

        popStyle();

        fill(getProp(p.c));
        rect(d+2, d+2, p.w-20, 11);

        if(p.v){ for(var c in p.ctrls){ p.ctrls[c].draw(); } }

    popMatrix();

  };
  stripVC.prototype.clicked=function(){
    if(this.hit){
      this.v=!this.v;
      for(var c in this.ctrls){ this.ctrls[c].clicked(); }
    }
  };
  stripVC.prototype.clickedR=function(){
    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].clickedR(); }
    }
  };
  stripVC.prototype.moved=function(x,y){

    if(app.mouseX>x+this.x &&
       app.mouseX<x+this.x+this.w &&
       app.mouseY>y+this.y &&
       app.mouseY<y+this.y+this.h){

      this.hit=true;
      app.focus=this.i;
      for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x, y+this.y); }

    }
    else{
      this.hit=false;
    }

  };


  //~ Preset ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var preset=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
  };
  preset.prototype=Object.create(control.prototype);
  preset.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      //~ translate(p.x, p.y);

        pushStyle();

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){

            if(app.left){ d=1; }

            fill(p.g);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
            cursor(p.k);

          }

          //~ if(p.v){ fill(getProp(p.g)); }

          if(p.x+p.parent.cursor>=20 &&
             p.x+p.parent.cursor<p.parent.w-20){

            rect(p.x+p.parent.cursor+2, d+2, p.w-4, p.h-4, p.r);

            fill(p.tfill);

            textAlign(p.alignX,p.alignY);
            textSize(20);

            if(p.hit){
              //~ fill(p.v);
              //~ textSize(p.sizeH);
            }

            text(p.v, p.x+p.w/2+p.parent.cursor+d+5, d+p.h/2);

          }

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw(); }

    popMatrix();

  };
  preset.prototype.moved=function(x,y){

    if(this.alignX===LEFT){

      if(app.mouseX>x+this.x+this.parent.cursor &&
         app.mouseX<x+this.x+this.w+this.parent.cursor &&
         app.mouseY>y+this.y && app.mouseY<y+this.y+this.h){
        this.hit=true;
        app.focus=this.i;
      }
      else{
        this.hit=false;
      }

      for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x, y+this.y); }

    }
    else if(this.alignX===CENTER){

      if(app.mouseX>=x+this.x-this.w/2 && app.mouseX<=x+this.x+this.w/2 &&
         app.mouseY>=y+this.y-this.h/2 && app.mouseY<=y+this.y+this.h/2){
        this.hit=true;
        app.focus=this.i;
        for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x,y+this.y); }
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

      for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x, y+this.y); }

    }
    else{
      app.focus=this.i;
    }

  };

  //~ Container ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var container=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
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
            cursor(p.k);

          }

          rect(d, d, p.w, p.h, p.r);

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw(); }

    popMatrix();

  };
  container.prototype.moved=function(x,y){

      if(app.mouseX>x+this.x && app.mouseX<x+this.x+this.w &&
         app.mouseY>y+this.y && app.mouseY<y+this.y+this.h){

        this.hit=true;
        app.focus=this.i;

      }
      else{
        this.hit=false;
      }

      for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x, y+this.y); }

  };

  //~ Container Scroll ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var containerS=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);

    this.hitLeft=   false;  //~ left button
    this.hitRight=  false;  //~ right button
    this.cursor=    0;      //~ position of the first item
    this.incr=      this.h*1.618;

  };
  containerS.prototype=Object.create(control.prototype);
  containerS.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      translate(p.x, p.y);

        pushStyle();

          var y=p.h/2;

          fill(p.fill);
          stroke(p.stroke);
          strokeWeight(p.weight);

          if(p.hit){

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);
            cursor(p.k);

            if(this.hitLeft || this.hitRight){
              cursor(p.k);
            }

          }

          //~ border
          rect(0, 0, p.w, p.h, p.r);

          noStroke();

          //~ Scroll left
          fill(CLRS.RED);

          if(this.hitLeft && app.left){

            rect(0, 1, 20, p.h, p.r);

            fill(CLRS.Gray5);

            triangle(4,  y,
                     14, y-5,
                     14, y+5);

          }
          else{

            rect(1, 1, 20, p.h, p.r);

            fill(CLRS.Gray5);

            triangle(5,  y,
                     15, y-5,
                     15, y+5);

          }

          fill(CLRS.RED);

          //~ Scroll right
          if(this.hitRight && app.left){

            rect(p.w-d-19, 0, 20, p.h-1, p.r);

            fill(CLRS.Gray5);

            triangle(p.w-d-4,  y,
                     p.w-d-14, y-5,
                     p.w-d-14, y+5);

          }
          else{

            rect(p.w-d-20, 0, 20, p.h-1, p.r);

            fill(CLRS.Gray5);

            triangle(p.w-d-5,  y,
                     p.w-d-15, y-5,
                     p.w-d-15, y+5);

          }

          fill(CLRS.YELLOW);

          textSize(20);
          textAlign(CENTER,CENTER);
          text(this.cursor, p.w/2, -20);

          noStroke();
          fill(getColor(CLRS.GREEN,20));

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw(); }

    popMatrix();

  };
  containerS.prototype.clicked=function(){

    if(this.hit & app.left){

      if      (this.hitLeft  && this.cursor>=-5*this.incr) { this.cursor-=this.incr; }
      else if (this.hitRight && this.cursor<0)             { this.cursor+=this.incr; }

      for(var c in this.ctrls){ this.ctrls[c].clicked(); }

    }

  };
  containerS.prototype.moved=function(x,y){

      if(app.mouseX>x+this.x && app.mouseX<x+this.x+this.w &&
         app.mouseY>y+this.y && app.mouseY<y+this.y+this.h){

        this.hit=true;

        app.focus=this.i;

        if(app.mouseX<x+this.x+20){ this.hitLeft=true;  }
        else                      { this.hitLeft=false; }

        if(app.mouseX>x+this.x+this.w-20){ this.hitRight=true; }
        else                             { this.hitRight=false; }

      }
      else{
        this.hit=false;
      }

      for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x, y+this.y); }

  };

  //~ Container ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var cnProps=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
  };
  cnProps.prototype=Object.create(control.prototype);
  cnProps.prototype.draw=function(){

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
            cursor(p.k);
          }

          if(getProp(p.c)){
            rect(d, d, p.w, p.h, p.r);
          }

          fill(p.tfill);

          if(p.hit){
            fill(p.tfillH);
          }

          textAlign(p.alignX,p.alignY);

          //~ text(p.g, p.w/2, p.h/2);

        popStyle();

        //~ p.ctrls[0].draw();

        if(getProp(p.c)){
          //~ for(var c=1; c<p.ctrls.length; c++){ p.ctrls[c].draw(); }
          p.visible=true;
          for(var c in this.ctrls){ this.ctrls[c].draw(); }
        }
        else{
          p.visible=false;
        }

    popMatrix();


  };
  cnProps.prototype.clicked=function(){

    if(this.hit){
      for(var c in this.ctrls){ this.ctrls[c].clicked(); }
    }

  };
  cnProps.prototype.moved=function(x,y){

      if(app.mouseX>x+this.x && app.mouseX<x+this.x+this.w &&
         app.mouseY>y+this.y && app.mouseY<y+this.y+this.h &&
         this.visible){

        this.hit=true;

        app.focus=this.i;

        //~ if(app.mouseX<x+this.x+20){ this.hitLeft=true;  }
        //~ else                      { this.hitLeft=false; }
//~
        //~ if(app.mouseX>x+this.x+this.w-20){ this.hitRight=true; }
        //~ else                             { this.hitRight=false; }

        for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x, y+this.y); }

      }
      else{
        this.hit=false;
      }

  };

  //~ Grid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var grid=function(c,l,a,ctrls){

    control.call(this,c,l,a,ctrls);

    app.factor=     this.h/22;   //~ required for initial grid height

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
  grid.prototype=Object.create(control.prototype);
  grid.prototype.draw=function(){

    this.stg=app.stg;

    var p=this;
    var d=0;
    var incr=1/app.factor;

    var border=function(){

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

      popStyle();

    };

    var origin=function(){

      if(app.origin){

        if(p.originX< p.w/2 &&
           p.originX>-p.w/2 &&
           p.originY< p.h/2 &&
           p.originY>-p.h/2){

          noStroke();

          if(this.hit){ fill(CLRS.RED); }
          else        { fill(CLRS.RED); }

          fill(getColor(CLRS.Gray6,40));

          ellipse(p.originX, -p.originY, 4, 4);

        }

      }

    };
    var axis=function(){

      noFill();
      stroke(getColor(CLRS.Gray6,40));
      strokeWeight(0.75);

      if(app.axisX &&
         p.h/2>p.y &&
         p.originY<p.h/2 &&
         p.originY>-p.h/2){ line(-p.w/2,-p.originY,
                                  p.w/2,-p.originY); }

      if(app.axisY &&
         p.w/2>p.x &&
         p.originX< p.w/2 &&
         p.originX>-p.w/2){ line(p.originX, -p.h/2,
                                 p.originX,  p.h/2); }

    };
    var lines=function(){

      noFill();
      stroke(getColor(CLRS.WHITE,20));


      var factor=app.factor;
      var count=1;

      if(app.linesX){

        if(p.originX<p.w/2 &&
           p.originX>-p.w/2){

          strokeWeight(0.5);
          line(p.originX, -p.h/2,  p.originX, p.h/2);

        }

        //~ Left
        for(var n=p.originX-factor; n>-p.w/2; n-=factor){

          if(n< p.w/2 &&
             n>-p.w/2){

            if(count%5===0){ strokeWeight(0.5); }
            else           { strokeWeight(0.25); }

            line(n, -p.h/2,  n, p.h/2);

            count++;

          }


        }

        //~ Right
        count=1;
        for(var n=p.originX+factor; n<p.w/2; n+=factor){

          if(n< p.w/2 &&
             n>-p.w/2){

            if(count%5===0){ strokeWeight(0.5); }
            else           { strokeWeight(0.25); }

            line(n, -p.h/2,  n, p.h/2);

            count++;

          }

        }

      }
      if(app.linesY){

        if(-p.originY< p.h/2 &&
           -p.originY>-p.h/2){

          strokeWeight(0.5);
          line(-p.w/2,  -p.originY, p.w/2, -p.originY);

        }

        //~ Bottom
        count=1;
        for(var n=-p.originY-factor; n>-p.h/2; n-=factor){

          if(n< p.h/2 &&
             n>-p.h/2){

            if(count%5===0){ strokeWeight(0.5); }
            else           { strokeWeight(0.25); }

            line(-p.w/2,  n, p.w/2, n);

            count++;

          }

        }

        //~ Top
        count=1;
        for(var n=-p.originY+factor; n<p.h/2; n+=factor){

          if(n< p.h/2 &&
             n>-p.h/2){

            if(count%5===0){ strokeWeight(0.5); }
            else           { strokeWeight(0.25); }

            line(-p.w/2,  n, p.w/2, n);

            count++;

          }

        }

      }

    };
    var arrows=function(){

      noStroke();
      fill(getColor(CLRS.WHITE,50));

      if(app.arrowsX){

        var y=-p.originY;

        if(p.originX>-p.w/2 &&
           p.originY< p.h/2 &&
           p.originY>-p.h/2){
          triangle(-p.w/2, y, -p.w/2+7, y+3, -p.w/2+7, y-3);   //~ left
        }
        if(p.originX<p.w/2 &&
           p.originY< p.h/2 &&
           p.originY>-p.h/2){
          triangle( p.w/2, y,  p.w/2-7, y+3,  p.w/2-7, y-3);   //~ right
        }

      }
      if(app.arrowsY){

        var x=p.originX;

        if(p.originY>-p.h/2 &&
           p.originX< p.w/2 &&
           p.originX>-p.w/2){
          triangle( x,  p.h/2, x+3,  p.h/2-7, x-3,  p.h/2-7); //~ top
        }
        if(p.originY< p.h/2 &&
           p.originX< p.w/2 &&
           p.originX>-p.w/2){
          triangle( x, -p.h/2, x+3, -p.h/2+7, x-3, -p.h/2+7); //~ bottom
        }

      }

    };
    var ticks=function(){

      noFill();
      stroke(getColor(CLRS.WHITE,20));
      strokeWeight(0.25);

      var factor=app.factor;
      var count=1;

      if(app.ticksX){

        //~ Left
        for(var n=p.originX-factor; n>-p.w/2; n-=factor){

          if(p.originX< p.w/2 &&
             p.originX>-p.w/2 &&
             p.originY< p.h/2 &&
             p.originY>-p.h/2){

            if(count%5===0){ strokeWeight(0.75); }
            else           { strokeWeight(0.25); }

            line(n, -p.originY-3,  n, -p.originY+3);

            count++;

          }

        }

        //~ Right
        count=1;
        for(var n=p.originX+factor; n<p.w/2; n+=factor){

          if(p.originX< p.w/2 &&
             p.originX>-p.w/2 &&
             p.originY< p.h/2 &&
             p.originY>-p.h/2){

            if(count%5===0){ strokeWeight(0.75); }
            else           { strokeWeight(0.25); }

            line(n, -p.originY-3,  n, -p.originY+3);

            count++;

          }

        }

      }
      if(app.ticksY){

        //~ Top
        count=1;
        for(var n=-p.originY-factor; n>-p.h/2; n-=factor){

          if(p.originX< p.w/2 &&
             p.originX>-p.w/2 &&
             p.originY< p.h/2 &&
             p.originY>-p.h/2){

            if(count%5===0){ strokeWeight(0.75); }
            else           { strokeWeight(0.25); }

            line(p.originX-3,  n, p.originX+3, n);

            count++;

          }

        }

        //~ Bottom
        count=1;
        for(var n=-p.originY+factor; n<p.h/2; n+=factor){

          if(p.originX< p.w/2 &&
             p.originX>-p.w/2 &&
             p.originY< p.h/2 &&
             p.originY>-p.h/2){

            if(count%5===0){ strokeWeight(0.75); }
            else           { strokeWeight(0.25); }

            line(p.originX-3,  n, p.originX+3, n);

            count++;

          }

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

          var factor=app.factor;
          var count=1;

          textAlign(RIGHT, CENTER);

          if(app.labelsX){

            //~ Top
            for(var n=p.originY-factor; n>-p.h/2; n-=factor){

              if(n< p.h/2 &&
                 n>-p.h/2){

                if(p.originX>p.w/2){
                  text(count, p.w/2-2,  n);
                }
                else if(p.originX<-p.w/2+12){
                  text(count, -p.w/2+12,  n);
                }
                else{
                  text(count, p.originX-6,  n);
                }

              }

              count++;

            }

            //~ Bottom
            count=1;

            for(var n=p.originY+factor; n<p.h/2; n+=factor){

              if(n< p.h/2 &&
                 n>-p.h/2){

                if(p.originX>p.w/2){
                  text(-count, p.w/2-2,  n);
                }
                else if(p.originX<-p.w/2+12){
                  text(-count, -p.w/2+12,  n);
                }
                else{
                  text(-count, p.originX-6,  n);
                }

              }

              count++;

            }

          }

          textAlign(CENTER,TOP);

          if(app.labelsY){

            //~ Right
            count=1;

            for(var n=-p.originX-factor; n>-p.w/2; n-=factor){

              if(n< p.w/2 &&
                 n>-p.w/2){

                if(p.originY>p.h/2-18){
                  text(count, -n, p.h/2-12);
                }
                else if(p.originY<-p.h/2){
                  text(count, -n, -p.h/2+2);
                }
                else{
                  text(count, -n, p.originY+6);
                }

              }

              count++;

            }

            //~ Left
            count=1;

            for(var n=-p.originX+factor; n<p.w/2; n+=factor){

              if(n< p.w/2 &&
                 n>-p.w/2){

                if(p.originY>p.h/2-18){
                  text(-count, -n, p.h/2-12);
                }
                else if(p.originY<-p.h/2){
                  text(-count, -n, -p.h/2+2);
                }
                else{
                  text(-count, -n, p.originY+6);
                }

              }

              count++;

            }

          }

      popMatrix();

    };
    var quadrants=function(){

      if(app.quadrants){

        pushMatrix();

          scale(1,-1);
          var offset=50;

          textSize(30);
          fill(CLRS.Gray8);
          textFont(createFont('fantasy'));

          //~ Quadrant I
          textAlign(CENTER,CENTER);

          text("I", p.originX+offset, p.originY-offset);

          //~ Quadrant II
          textAlign(CENTER,CENTER);

          text("II", p.originX-offset, p.originY-offset);

          //~ Quadrant III
          textAlign(CENTER,CENTER);

          text("III",p.originX-offset, p.originY+offset);

          //~ Quadrant IV
          textAlign(CENTER,CENTER);

          text("IV", p.originX+offset, p.originY+offset);

        popMatrix();

      }

    };

    var crosshair=function(){

      if(app.focus===p.i){

        var sz=app.cursorSize;

        pushStyle();

          noCursor();

          pushMatrix();

            //~ resetMatrix();
            translate(0.5, 0.5);

              rectMode(CENTER);

              stroke(CLRS.WHITE);
              strokeWeight(0.25);

              sz=50;

              if(sz===0){

                //~ horizontal
                line(p.x,          app.mouseY, app.mouseX-4, app.mouseY);
                line(app.mouseX+4, app.mouseY, p.x+p.w,      app.mouseY);

                //~ vertical
                line(app.mouseX, p.y,          app.mouseX, app.mouseY-4);
                line(app.mouseX, app.mouseY+4, app.mouseX, p.y+p.h);

              }
              else{

                //~ horizontal
                line(app.mouseX-sz, app.mouseY, app.mouseX-4,  app.mouseY);
                line(app.mouseX+4,  app.mouseY, app.mouseX+sz, app.mouseY);

                //~ vertical
                line(app.mouseX, app.mouseY-4, app.mouseX, app.mouseY-sz);
                line(app.mouseX, app.mouseY+4, app.mouseX, app.mouseY+sz);

              }

              noFill();

              ellipse(app.mouseX, app.mouseY, app.pSize, app.pSize);

          popMatrix();

        popStyle();

      }

    };

    var drawTemp=function(){

      switch(app.current){

        case COMMANDS.P_DEFAULT[0]:

          //~ Point is saved on initial click
          break;

        case COMMANDS.L_SEGMENT2P[0]:

          if(p.Temp!==0){

            var x=(p.Temp.vertices[0].xG)*app.factor+p.originX;
            var y=(p.Temp.vertices[0].yG)*app.factor-p.originY;
            var xW=app.worldX+p.originX;
            var yW=app.worldY-p.originY;
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

        case COMMANDS.C_CENTERP[0]:

          //~ if(p.vertices.length===1){
//~
            //~ noFill();
            //~ stroke(app.stroke);
            //~ strokeWeight(app.lineweight);
//~
            //~ line(app.mouseX,  app.mouseY, app.vertices[0].x, app.vertices[0].y);
//~
            //~ fill(app.fill);
            //~ noStroke();
            //~ strokeWeight(0);
//~
            //~ ellipse(p.vertices[0].x, p.vertices[0].y, app.pSize, app.pSize);
            //~ ellipse(app.mouseX,      app.mouseY,      app.pSize, app.pSize);
//~
            //~ noFill();
            //~ stroke(app.stroke);
            //~ strokeWeight(app.lineweight);
//~
            //~ var r=2*dist(p.vertices[0].x, p.vertices[0].y, app.mouseX, app.mouseY);
//~
            //~ ellipse(p.vertices[0].x, p.vertices[0].y, r, r);
//~
          //~ }

          break;

        case COMMANDS.Q_RECTANGLE[0]:

          //~ if(p.vertices.length===1){
//~
            //~ noFill();
            //~ stroke(app.stroke);
            //~ strokeWeight(app.lineweight);
//~
            //~ fill(app.fill);
            //~ noStroke();
            //~ strokeWeight(0);
//~
            //~ ellipse(p.vertices[0].x, p.vertices[0].y, app.pSize, app.pSize);
            //~ ellipse(app.mouseX,    app.mouseY,    app.pSize, app.pSize);
//~
            //~ noFill();
            //~ stroke(app.stroke);
            //~ strokeWeight(app.lineweight);
//~
            //~ var r=dist(p.vertices[0].x, p.vertices[0].y, app.mouseX, app.mouseY);
//~
            //~ rect(p.vertices[0].x, p.vertices[0].y, r, r);
//~
          //~ }

          break;

        default:                  break;

      }

    };

    pushMatrix();

      translate(p.x+p.w/2,
                p.y+p.h/2);

      scale(1,-1);

        pushStyle();

          rectMode(CENTER);

          border();

          axis();
          origin();
          lines();
          arrows();
          ticks();
          labels();
          quadrants();

        popStyle();

      for(var s in this.shapes){ this.shapes[s].draw(p.originX,p.originY); }

      drawTemp();

    popMatrix();

    for(var c in this.ctrls){ p.ctrls[c].draw(0,0); }

    if(p.hit && app.focus===p.i){
      //~ ARROW, CROSS, HAND, MOVE, TEXT, WAIT
      if(app.current==COMMANDS.SELECT[0]){
        cursor(ARROW);
      }
      else if(!app.keys[KEYCODES.CONTROL] && app.current!==COMMANDS.PAN[0]){
        crosshair();
      }
      else if(app.current==COMMANDS.PAN[0]){

        if(app.left && app.focus===p.i){
          cursor(MOVE);
        }
        else{
          cursor(HAND);
        }

      }
      else{
        cursor(ARROW);
      }

    }
    noStroke();
    fill(CLRS.Black);

    //~ rect(0, 0, p.x,       app.height);
    //~ rect(0, 0, app.width, p.y-1);
//~
    //~ rect(p.x+p.w+1, 0,       app.width, app.height);
    //~ rect(p.x,     p.y+p.h, app.width, app.height-p.y-p.h);

  };
  grid.prototype.clicked=function(){

    if(app.focus===this.i){

      if(this.hit){

        pushMatrix();

          switch(app.current){

            case COMMANDS.SELECT[0]:

              for(var s in this.shapes){ this.shapes[s].clicked(0,0); }

              break;

            case COMMANDS.P_DEFAULT[0]: //~ Point:  Default

              this.shapes.push(
                new Point(getGUID(), this, app.gridX, app.gridY));
                app.stack.push(app.current);
                //~ println(app.stack);

              break;

            case COMMANDS.L_SEGMENT2P[0]:  //~ Line:  2 point

              if(this.Temp===0){

                this.Temp=new Line(getGUID(), this, 0);

                this.Temp.add(new Point(getGUID(), this.Temp, app.gridX, app.gridY));
                this.Temp.add(new Point(getGUID(), this.Temp, app.gridX, app.gridY));

              }
              else{

                this.Temp.vertices[1].xG=app.gridX;
                this.Temp.vertices[1].yG=app.gridY;

                this.shapes.push(this.Temp);

                this.Temp=0;

              }

              break;

            case COMMANDS.C_CENTERP[0]:  //~ Circle:  Center-Point

              break;

            case COMMANDS.Q_RECTANGLE[0]:  //~ Quad:  Rectangle


              break;

            default:  break;

          }

        popMatrix();

      }
    }

    for(var c in this.ctrls){ this.ctrls[c].clicked(0,0); }

  };
  grid.prototype.moved=function(x,y){

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

    }
    else{
      this.hit=false;
    }

    //~ for(var c in this.ctrls){ this.ctrls[c].moved(x,y); }

  };
  grid.prototype.dragged=function(x,y){

    if(this.hit && app.focus===this.i){

      if(app.current===COMMANDS.PAN[0]){

        if(app.mouseX<this.x+this.w &&
           app.mouseX>this.x &&
           app.mouseY<this.y+this.h &&
           app.mouseY>this.y){

          //~ cursor(MOVE);
          this.originX=app.mouseX-this.x-this.w/2-this.offsetX;
          this.originY=app.mouseY-this.y-this.h/2+this.offsetY;

        }

      }

      for(var s in this.shapes){ this.shapes[s].dragged(); }

    }

  };
  grid.prototype.pressed=function(){

    if(this.hit){
      this.offsetX=app.worldX;
      this.offsetY=app.worldY;
    };

  };
  grid.prototype.released=function(){

    if(this.hit){
      this.offsetX=0;
      this.offsetY=0;
    };

  };
  grid.prototype.typed=function(){

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

  var n=100;



  var main=function(){

    background(CLRS.GRID);

    //~ if(n<100){ n++; }

    //~ app.frameRate=frameCount;
    //~
    //~ frameRate(app.frameRate);

    for(var c in app.ctrls){ app.ctrls[c].draw(); }

    //~ text(modelX(app.mouseX,app.mouseY,0), 100, 400);

  };

  //~ translate(0.5,0.5);

  //~ var draw=function(){ process(); };


  //~ Events ===========================================================


  //~ Mouse ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var mouseClicked=function(){
    switch(mouseButton){

      case LEFT:

        for(var c in app.ctrls){ app.ctrls[c].clicked(); }
        break;

      case RIGHT:

        for(var c in app.ctrls){ app.ctrls[c].clickedR() }
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
    for(var c in app.ctrls){ app.ctrls[c].moved(0,0); }
    process();
  };
  var mouseDragged=function(){
    //~ app.left=true;
    app.mouseX=mouseX;
    app.mouseY=mouseY;
    for(var c in app.ctrls) { app.ctrls[c].dragged(); }

    process();
  };
  var mousePressed=function(){
    mStartX=mouseX;
    mStartY=mouseY;
    switch(mouseButton){

      case LEFT:    app.left=true;    break;
      case CENTER:  app.center=true;  break;
      case RIGHT:   app.right=true;   break;

      default:                        break;

    }

    for(var c in app.ctrls){ app.ctrls[c].pressed(); }
    process();
  };
  var mouseReleased=function(){
    mStartX=0;
    mStartY=0;

    app.left=false;
    app.center=false;
    app.right=false;

    for(var c in app.ctrls){ app.ctrls[c].released(); }
    process();
  };
  var mouseOut=function(){
    for(var c in app.ctrls){ app.ctrls[c].out(); }
    process();
  };
  var mouseOver=function(){
    for(var c in app.ctrls){ app.ctrls[c].over(); }
    process();
  };

  //~ Keys ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var keyPressed=function(){

    if(keyCode===32){
      app.current=COMMANDS.SELECT[0];
      reset();
      process();
    }

    switch(keyCode){

      case KEYCODES.CONTROL &&
           KEYCODES.Z:

           //~ commands(COMMANDS.UNDO[0]);
           break;

      case KEYCODES.STG: //~ F7

        commands(COMMANDS.STG[0]);
        break;

      case KEYCODES.ORTHO:      //~ F8

        commands(COMMANDS.ORTHO[0]);
        break;

      default:  break;

    }

    app.keys[keyCode]=true;

    //~ for(var c in app.ctrls){ app.ctrls[c].pressed(); }

  };
  var keyReleased=function(){
    app.keys[keyCode]=false;

    for(var c in app.ctrls){ app.ctrls[c].released(); }
  };
  var keyTyped=function(){

    switch(key){

      case app.keys[KEYCODES.CONTROL] &&
           app.keys[KEYCODES.Z]:

           commands(COMMANDS.UNDO[0]);
           break;

      case app.keys[KEYCODES.F7]:

        commands(COMMANDS.STG[0]);
        break;

      case app.keys[KEYCODES.F8]:

        commands(COMMANDS.ORTHO[0]);
        break;

      default:  break;

    }

    for(var c in app.ctrls){ app.ctrls[c].typed(); }

  };


  //~ Initialize =======================================================

  //~ Load Controls ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  var getPoints=function(parent){

    var ctrls=[];
    var w=30;

    var cn=new menuH(
            new propC(getGUID(), parent, parent.x, parent.y+80, 40+10, 40, 1, HAND, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            new propL(CLRS.Black, CLRS.Gray7, CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ vertices ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ POINT:            [ -100, 'Point',            'POINT'         ],
    //~ P_OBJECT:         [ -101, 'P_Object',         'P_OBJECT'      ],
    //~ P_INTERSECT:      [ -102, 'P_Intersect',      'P_INTERSECT'   ],
    //~ P_MIDPOINT:       [ -103, 'P_Midpoint',       'P_MIDPOINT'    ],

    //~ for(var n in COMMANDS){

      //~ ctrls.push(new buttonS(
                  //~ new propC(getGUID(), cn, n*w, 0, w, w, 0, false, COMMANDS[n], COMMANDS[n]),
                  //~ new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                  //~ new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    //~ }

    ctrls.push(new menuItem(
                new propC(getGUID(), cn, 0, 0, 39, 39, 0, HAND, false, COMMANDS.P_DEFAULT[0], COMMANDS.P_DEFAULT[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new menuItem(
                new propC(getGUID(), cn,39, 0, w, w, 0, HAND, false, COMMANDS.P_DEFAULT[0], COMMANDS.P_DEFAULT[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new menuItem(
                new propC(getGUID(), cn, 39+w, 0, w, w, 0, HAND, false, COMMANDS.P_OBJECT[0], COMMANDS.P_OBJECT[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new menuItem(
                new propC(getGUID(), cn, 39+2*w, 0, w, w, 0, HAND, false, COMMANDS.P_BOUND[0], COMMANDS.P_BOUND[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    //~ ctrls.push(new buttonS(
                //~ new propC(getGUID(), cn, 4*w, 0, w, w, 0, HAND, false, COMMANDS.P_INTERSECT[0], COMMANDS.P_INTERSECT[1]),
                //~ new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                //~ new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    //~ ctrls.push(new buttonS(
                //~ new propC(getGUID(), cn, 5*w, 0, w, w, 0, HAND, false, COMMANDS.P_MIDPOINT[0], COMMANDS.P_MIDPOINT[1]),
                //~ new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                //~ new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));



    cn.ctrls=ctrls;

    return cn;

  };
  var getLines=function(parent){

    var ctrls=[];
    var w=30;

    var cn=new stripH(
            new propC(getGUID(), parent, parent.x+50, parent.y+475, w+10, w, 1, HAND, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ L_2P:         [-200, 'Line2P',           'LINE2P'                 ],    //~ through 2 vertices
    //~ L_SEGMENT2P:  [-201,  'Line',             'LINE'                  ],    //~ between 2 vertices
    //~ L_SEGMENTLEN: [-202,  'Line',             'LINE'                  ],    //~ from point given length
    //~ L_PERP:       [-203,  'LinePerp',         'LINEPERP'              ],    //~ perpendicular
    //~ L_PERPB:      [-204,  'LinePerpB',        'LINEPERPB'             ],    //~  perpendicular bisector
    //~ L_ANGB:       [-205,  'LineAngB',         'LINEANGB'              ],    //~ angle bisector
    //~ L_PARR:       [-206,  'LineParr',         'LINEPARR'              ],    //~ parallel
    //~ L_TANGENT:    [-207,  'LineTangent',      'LINETANGENT'           ],    //~ Tangent
    //~ L_DIAMETER:   [-208,  'LineDiameter',     'LINEDIAMETER'          ],    //~ Diameter
    //~ L_RADIUS:     [-209,  'LineRadius',       'LINERADIUS'            ],    //~ Radius

    //~ RAY_2P:       [-210,  'Ray2P',            'RAY2P'                 ],    //~ Ray between 2 vertices
    //~ V_2P:         [-211,  'Vector2P',         'VECTOR2P'              ],    //~ Vector between 2 vertices
    //~ V_FP:         [-212,  'VectorFP',         'VECTORFP'              ],    //~ Vector from point

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, HAND, false, COMMANDS.L_2P[0], COMMANDS.L_2P[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, HAND, false, COMMANDS.L_2P[0], COMMANDS.L_2P[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, HAND, false, COMMANDS.L_SEGMENT2P[0], COMMANDS.L_SEGMENT2P[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, HAND, false, COMMANDS.L_SEGMENTLEN[0], COMMANDS.L_SEGMENTLEN[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 4*w, 0, w, w, 0, HAND, false, COMMANDS.L_PERP[0], COMMANDS.L_PERP[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 5*w, 0, w, w, 0, HAND, false, COMMANDS.L_PERPB[0], COMMANDS.L_PERPB[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 6*w, 0, w, w, 0, HAND, false, COMMANDS.L_ANGB[0], COMMANDS.L_ANGB[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 7*w, 0, w, w, 0, HAND, false, COMMANDS.L_PARR[0], COMMANDS.L_PARR[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 8*w, 0, w, w, 0, HAND, false, COMMANDS.L_TANGENT[0], COMMANDS.L_TANGENT[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 9*w, 0, w, w, 0, HAND, false, COMMANDS.L_DIAMETER[0], COMMANDS.L_DIAMETER[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 10*w, 0, w, w, 0, HAND, false, COMMANDS.L_RADIUS[0], COMMANDS.L_RADIUS[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 11*w, 0, w, w, 0, HAND, false, COMMANDS.RAY_2P[0], COMMANDS.RAY_2P[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 12*w, 0, w, w, 0, HAND, false, COMMANDS.V_2P[0], COMMANDS.V_2P[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 13*w, 0, w, w, 0, HAND, false, COMMANDS.V_FP[0], COMMANDS.V_FP[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getTriangles=function(parent){

    var ctrls=[];
    var w=30;

    var cn=new stripH(
            new propC(getGUID(), parent, parent.x+50, parent.y+105, w+10, w, 1, HAND, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ Triangle (T)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ TRIANGLE:     [-300,  'Triangle',         'TRIANGLE'              ],
    //~ T_EQUILATERAL:[-301,  'T_Equilateral',    'T_EQUILATERAL'         ],
    //~ T_ISOSCELES:  [-302,  'T_Isosceles',      'T_ISOSCELES'           ],
    //~ T_SCALENE:    [-303,  'T_Scalene',        'T_SCALENE'             ],

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, HAND, false, COMMANDS.T_EQUILATERAL[0], COMMANDS.T_EQUILATERAL[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, HAND, false, COMMANDS.T_EQUILATERAL[0], COMMANDS.T_EQUILATERAL[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, HAND, false, COMMANDS.T_ISOSCELES[0], COMMANDS.T_ISOSCELES[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, HAND, false, COMMANDS.T_SCALENE[0], COMMANDS.T_SCALENE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getCircles=function(parent){

    var ctrls=[];
    var w=30;

    var cn=new stripH(
            new propC(getGUID(), parent, parent.x+50, 140, w+10, w, 1, HAND, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ Circle (C)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ CIRCLE:       [-400,  'Circle',           'CIRCLE'                ],
    //~ C_CENTERP:    [-401,  'CircleCenterP',    'CIRCLECENTERP'         ],    //~ center point
    //~ C_CENTERR:    [-402,  'CircleCenterR',    'CIRCLECENTERR'         ],    //~ center radius
    //~ C_3P:         [-403,  'Circle3P',         'CIRCL3P'               ],    //  3 vertices
    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, HAND, false, COMMANDS.C_CENTERP[0], COMMANDS.C_CENTERP[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, HAND, false, COMMANDS.C_CENTERP[0], COMMANDS.C_CENTERP[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, HAND, false, COMMANDS.C_CENTERR[0], COMMANDS.C_CENTERR[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, HAND, false, COMMANDS.C_3P[0], COMMANDS.C_3P[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getQuads=function(parent){

    var ctrls=[];
    var w=30;

    var cn=new stripH(
            new propC(getGUID(), parent, parent.x+50, parent.y+165, w+10, w, 1, HAND, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ Quadrilateral (C)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ QUADRILATERAL:[1500,  'Quadrilateral',    'QUADRILATERAL'         ],
    //~ Q_RECTANGLE:  [1501,  'Rectangle',        'RECTANGLE'             ],
    //~ Q_SQUARE:     [1502,  'Square',           'SQUARE'                ],
    //~ Q_RHOMBUS:    [1503,  'Rhombus',          'RHOMBUS'               ],
    //~ Q_PGRAM:      [1504,  'Parallelogram',    'PARALLELOGRAM'         ],    //~ Q_PARALLELOGRAM
    //~ Q_TRAPEZOID:  [1505,  'Trapezoid',        'TRAPEZOID'             ],
    //~ Q_KITE:       [1506,  'Kite',             'KITE'                  ],

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, HAND, false, COMMANDS.Q_RECTANGLE[0], COMMANDS.Q_RECTANGLE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, HAND, false, COMMANDS.Q_RECTANGLE[0], COMMANDS.Q_RECTANGLE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, HAND, false, COMMANDS.Q_SQUARE[0], COMMANDS.Q_SQUARE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, HAND, false, COMMANDS.Q_RHOMBUS[0], COMMANDS.Q_RHOMBUS[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 4*w, 0, w, w, 0, HAND, false, COMMANDS.Q_PGRAM[0], COMMANDS.Q_PGRAM[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 5*w, 0, w, w, 0, HAND, false, COMMANDS.Q_TRAPEZOID[0], COMMANDS.Q_TRAPEZOID[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 6*w, 0, w, w, 0, HAND, false, COMMANDS.Q_KITE[0], COMMANDS.Q_KITE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getArcs=function(parent){

    var ctrls=[];
    var w=30;

    var cn=new stripH(
            new propC(getGUID(), parent, parent.x+50, parent.y+195, w+10, w, 1, HAND, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ Arc (A)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ ARC:          [-500,  'Arc',              'ARC'                   ],
    //~ A_2P:         [-501,  'Arc2P',            'ARC2P'                 ],    //~SEMICIRCLETHROUGH2vertices
    //~ A_1:          [-502,  'Arc1',             'ARC1'                  ],    //~Circulararc
    //~ A_2:          [-503,  'Arc2',             'ARC2'                  ],    //~CIRCUMCIRCULARARC
    //~ A_3:          [-504,  'Arc3',             'ARC4'                  ],    //~ CIRCULARSECTOR
    //~ A_4:          [-505,  'Arc4',             'ARC4'                  ],    //~ CIRCUMCIRCULARSECTOR
    //~ COMPASS:      [-506,  'Compass',          'COMPASS'               ],    //~ ??
    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, HAND, false, COMMANDS.A_2P[0], COMMANDS.A_2P[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, HAND, false, COMMANDS.A_2P[0], COMMANDS.A_2P[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, HAND, false, COMMANDS.A_CA[0], COMMANDS.A_CA[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, HAND, false, COMMANDS.A_CCA[0], COMMANDS.A_CCA[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 4*w, 0, w, w, 0, HAND, false, COMMANDS.A_CS[0], COMMANDS.A_CS[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 5*w, 0, w, w, 0, HAND, false, COMMANDS.A_CCS[0], COMMANDS.A_CCS[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 6*w, 0, w, w, 0, HAND, false, COMMANDS.COMPASS[0], COMMANDS.COMPASS[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getPolygons=function(parent){

    var ctrls=[];
    var w=30;

    var cn=new stripH(
            new propC(getGUID(), parent, parent.x+50, parent.y+225, w+10, w, 1, HAND, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

      //~ Polygon ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ POLYGON:      [-600,  'Polygon',          'POLYGON'               ],
    //~ POLYGONR:     [-601,  'PolygonR',         'POLYGONR'              ],    //~ regular
    //~ POLYGONRIGID: [-602,  'PolygonRigid',     'POLYGONRIGID'          ],    //~ Rigid
    //~ POLYGONV:     [-603,  'PolygonV',         'POLYGONV'              ],    //~ Vector
    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, HAND, false, COMMANDS.POLYGONR[0], COMMANDS.POLYGONR[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, HAND, false, COMMANDS.POLYGONR[0], COMMANDS.POLYGONR[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, HAND, false, COMMANDS.POLYGONRIGID[0], COMMANDS.POLYGONRIGID[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, HAND, false, COMMANDS.POLYGONV[0], COMMANDS.POLYGONV[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getConics=function(parent){

    var ctrls=[];
    var w=30;

    var cn=new stripH(
            new propC(getGUID(), parent, parent.x+50, parent.y+255, w+10, w, 1, HAND, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ Conics (S) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ CONIC:        [-700,  'Conic',            'CONIC'                 ],
    //~ S_ELLIPSE:    [-700,  'Ellipse',          'ELLIPSE'               ],
    //~ S_HYPERBOLA:  [-701,  'Hyperbola',        'HYPERBOLA'             ],
    //~ S_PARABOLA:   [-702,  'Parabola',         'PARABOLA'              ],
    //~ S_5VERTICES:    [-703,  'Conic5VERTICES',     'CONIC5VERTICES'    ],
    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, HAND, false, COMMANDS.CONIC[0], COMMANDS.CONIC[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, HAND, false, COMMANDS.S_ELLIPSE[0], COMMANDS.S_ELLIPSE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, HAND, false, COMMANDS.S_HYPERBOLA[0], COMMANDS.S_HYPERBOLA[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, HAND, false, COMMANDS.S_PARABOLA[0], COMMANDS.S_PARABOLA[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 4*w, 0, w, w, 0, HAND, false, COMMANDS.S_5VERTICES[0], COMMANDS.S_5VERTICES[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getAngles=function(parent){

    var ctrls=[];
    var w=30;

    var cn=new stripH(
            new propC(getGUID(), parent, parent.x+50, parent.y+285, w+10, w, 1, HAND, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ Angle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ ANGLE:        [-800,  'Angle',            'ANGLE'                 ],
    //~ ANGLE_SIZE:   [-801,  'AngelSize',        'ANGELSIZE'             ],
    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, HAND, false, COMMANDS.ANGLE[0], COMMANDS.ANGLE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, HAND, false, COMMANDS.ANGLE_SIZE[0], COMMANDS.ANGLE_SIZE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getAnnotations=function(parent){

    var ctrls=[];
    var w=30;

    var cn=new stripH(
            new propC(getGUID(), parent, parent.x+50, parent.y+315, w+10, w, 1, HAND, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ Annotation ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ TEXT:         [-900,  'Text',             'TEXT'                  ],
    //~ TEXT:         [-901,  'Text',             'TEXT'                  ],
    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, HAND, false, COMMANDS.TEXT[0], COMMANDS.TEXT[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, HAND, false, COMMANDS.TEXT[0], COMMANDS.TEXT[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getTransform=function(parent){

    var ctrls=[];
    var w=30;

    var cn=new stripH(
            new propC(getGUID(), parent, parent.x+50, parent.y+345, w+10, w, 1, HAND, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

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

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, HAND, false, COMMANDS.TRANSLATE[0], COMMANDS.TRANSLATE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, HAND, false, COMMANDS.TRANSLATE[0], COMMANDS.TRANSLATE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, HAND, false, COMMANDS.REFLECT[0], COMMANDS.REFLECT[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, HAND, false, COMMANDS.ROTATE[0], COMMANDS.ROTATE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 4*w, 0, w, w, 0, HAND, false, COMMANDS.SCALE[0], COMMANDS.SCALE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 5*w, 0, w, w, 0, HAND, false, COMMANDS.SHEAR[0], COMMANDS.SHEAR[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getMeasure=function(parent){

    var ctrls=[];
    var w=30;

    var cn=new stripH(
            new propC(getGUID(), parent, parent.x+50, parent.y+375, w+10, w, 1, HAND, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ MEASURE:      [ 700,  'Measure',          'MEASURE'               ],
    //~ DISTANCE:     [ 701,  'Distance',         'DISTANCE'              ],
    //~ PERIMETER:    [ 702,  'Perimeter',        'PERIMETER'             ],
    //~ AREA:         [ 703,  'Area',             'AREA'                  ],
    //~ VOLUME:       [ 704,  'Volume',           'VOLUME'                ],
    //~ RADIUS:       [ 705,  'Radius',           'RADIUS'                ],
    //~ DIAMETER:     [ 706,  'Diamter',          'DIAMETER'              ],
    //~ SLOPE:        [ 707,  'Slope',            'SLOPE'                 ],

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0*w, 0, w, w, 0, HAND, false, COMMANDS.DISTANCE[0], COMMANDS.DISTANCE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 1*w, 0, w, w, 0, HAND, false, COMMANDS.DISTANCE[0], COMMANDS.DISTANCE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 2*w, 0, w, w, 0, HAND, false, COMMANDS.PERIMETER[0], COMMANDS.PERIMETER[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 3*w, 0, w, w, 0, HAND, false, COMMANDS.AREA[0], COMMANDS.AREA[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 4*w, 0, w, w, 0, HAND, false, COMMANDS.VOLUME[0], COMMANDS.VOLUME[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 5*w, 0, w, w, 0, HAND, false, COMMANDS.RADIUS[0], COMMANDS.RADIUS[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 6*w, 0, w, w, 0, HAND, false, COMMANDS.DIAMETER[0], COMMANDS.DIAMETER[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 7*w, 0, w, w, 0, HAND, false, COMMANDS.SLOPE[0], COMMANDS.SLOPE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    cn.ctrls=ctrls;

    return cn;

  };


  var getTelemetry=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;

    var cn=new container(
            new propC(getGUID(), parent, 905, 40, 200, parent.h-200, 3, ARROW, false, COMMANDS.UNDEF[0],COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ Labels ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ctrls.push(new label(
                new propC(getGUID(), cn, cn.w/2, 10, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.TELEMETRY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+0*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.DEBUG[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 10, top+1*h+5, 150, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[0]),
                new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+2*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.WIDTH[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+3*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.HEIGHT[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 10, top+4*h+5, 150, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.SPACER[0]),
                new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+5*h, 10, 10, 0, ARROW, false, COMMANDS.FRAMERATE[0], COMMANDS.FRAMERATE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+6*h, 10, 10, 0, ARROW, false, COMMANDS.FRAMERATEA[0], COMMANDS.FRAMERATEA[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 10, top+7*h+5, 150, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.SPACER[0]),
                new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+8*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.MOUSEX[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+9*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.MOUSEY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 10, top+10*h+5, 150, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.SPACER[0]),
                new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+11*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.WORLDX[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+12*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.WORLDY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 10, top+13*h+5, 150, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.SPACER[0]),
                new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+14*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.GRIDX[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+15*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.GRIDY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, 10, top+16*h+5, 150, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.SPACER[0]),
                new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+17*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.LEFT[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+18*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.CENTER[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+19*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.RIGHT[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+21*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.FOCUS[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+23*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+25*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.FACTOR[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    //~ Values ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+0*h+5, 10, 10, 0, HAND, false, COMMANDS.DEBUG[0], COMMANDS.DEBUG[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+2*h, 10, 10, 0, HAND, false, COMMANDS.WIDTH[0], COMMANDS.WIDTH[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+3*h, 10, 10, 0, HAND, false, COMMANDS.HEIGHT[0], COMMANDS.HEIGHT[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+5*h, 10, 10, 0, HAND, false, COMMANDS.FRAMERATE[0], COMMANDS.FRAMERATE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+6*h, 10, 10, 0, HAND, false, COMMANDS.FRAMERATEA[0], COMMANDS.FRAMERATEA[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+8*h, 10, 10, 0, HAND, false, COMMANDS.MOUSEX[0], COMMANDS.MOUSEX[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+9*h, 10, 10, 0, HAND, false, COMMANDS.MOUSEY[0], COMMANDS.MOUSEY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+11*h, 10, 10, 0, HAND, false, COMMANDS.WORLDX[0], COMMANDS.WORLDX[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+12*h, 10, 10, 0, HAND, false, COMMANDS.WORLDY[0], COMMANDS.WORLDY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+14*h, 10, 10, 0, HAND, false, COMMANDS.GRIDX[0], COMMANDS.GRIDX[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+15*h, 10, 10, 0, HAND, false, COMMANDS.GRIDY[0], COMMANDS.GRIDY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+17*h, 10, 10, 0, HAND, false, COMMANDS.LEFT[0], COMMANDS.LEFT[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+18*h, 10, 10, 0, HAND, false, COMMANDS.CENTER[0], COMMANDS.CENTER[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+19*h, 10, 10, 0, HAND, false, COMMANDS.RIGHT[0], COMMANDS.RIGHT[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 50, top+21*h, 10, 10, 0, HAND, false, COMMANDS.FOCUS[0], COMMANDS.FOCUS[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+23*h, 10, 10, 0, HAND, false, COMMANDS.CURRENT[0], COMMANDS.CURRENT[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+25*h, 10, 10, 0, HAND, false, COMMANDS.FACTOR[0], COMMANDS.FACTOR[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    cn.ctrls=ctrls;

    return cn;

  };

  var getLineTypes=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;
    var l=parent.w-200;
    var ch=app.height-14;
    var w=100;
    var h=20;

    var st=parent.fill;
    var stH=CLRS.Gray7;
    var f=CLRS.BUTTON;
    var fH=CLRS.BUTTONH;

    var cn=new stripV(
            new propC(getGUID(), parent, 90, 230, w, 15, 1, HAND, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            new propL(parent.fill, f, CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ LineTypes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~ LINETYPE:     [ 211,  'Line Type',        'LINE TYPE'             ],
    //~ LT_HAIRLINE:  [ 212,  'Hairline',         'HAIRLINE'              ],
    //~ LT_SOLID:     [ 213,  'Solid',            'SOLID'                 ],
    //~ LT_DASHED:    [ 214,  'Dashed',           'DASHED'                ],
    //~ LT_DOTTED:    [ 215,  'Dottted',          'DOTTED'                ],
    //~ LT_DASHDOT:   [ 216,  'DashDot',          'DASHDOT'               ],

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0, 0, w-16, 15, 0, HAND, false, COMMANDS.LT_SOLID[0], COMMANDS.LT_SOLID[1]),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0, 15, w, h, 0, HAND, false, COMMANDS.LT_HAIRLINE[0], COMMANDS.LT_HAIRLINE[1]),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0, 15+h, w, h, 0, HAND, false, COMMANDS.LT_SOLID[0], COMMANDS.LT_SOLID[1]),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0, 15+2*h, w, h, 0, HAND, false, COMMANDS.LT_DASHED[0], COMMANDS.LT_DASHED[1]),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0, 15+3*h, w, h, 0, HAND, false, COMMANDS.LT_DOTTED[0], COMMANDS.LT_DOTTED[1]),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, 0, 15+4*h, w, h, 0, HAND, false, COMMANDS.LT_DASHDOT[0], COMMANDS.LT_DASHDOT[1]),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getStroke=function(parent){

    var ctrls=[];
    var top=30;
    var h=25;
    var l=parent.w-200;
    var ch=app.height-14;
    var w=100;
    //~ var h=20;

    var st=CLRS.Gray5;
    var stH=CLRS.Gray2;
    var f=CLRS.BUTTON;
    var fH=CLRS.BUTTONH;

    var cn=new stripVC(
            new propC(getGUID(), parent, 90, 110, w, 15, 1, HAND, false, COMMANDS.STROKE[0], COMMANDS.STROKE[1]),
            new propL(parent.fill, f, st, stH, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ Colors
    //~
    //~ Red       RedOrange
    //~ Orange    YellowOrange
    //~ Yellow    YellowGreen
    //~ Green     BlueGreen
    //~ Blue      BlueViolet
    //~ Violet    RedViolet

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 0,   15, h, h, 0, HAND, false, COMMANDS.STROKE[0], CLRS.Red),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, h,   15, h, h, 0, HAND, false, COMMANDS.STROKE[0], CLRS.RedOrange),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 2*h, 15, h, h, 0, HAND, false, COMMANDS.STROKE[0], CLRS.Orange),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 3*h, 15, h, h, 0, HAND, false, COMMANDS.STROKE[0], CLRS.YellowOrange),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 0,   40, h, h, 0, HAND, false, COMMANDS.STROKE[0], CLRS.Yellow),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, h,   40, h, h, 0, HAND, false, COMMANDS.STROKE[0], CLRS.YellowGreen),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 2*h, 40, h, h, 0, HAND, false, COMMANDS.STROKE[0], CLRS.Green),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 3*h, 40, h, h, 0, HAND, false, COMMANDS.STROKE[0], CLRS.BlueGreen),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 0,   65, h, h, 0, HAND, false, COMMANDS.STROKE[0], CLRS.Blue),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, h,   65, h, h, 0, HAND, false, COMMANDS.STROKE[0], CLRS.BlueViolet),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 2*h, 65, h, h, 0, HAND, false, COMMANDS.STROKE[0], CLRS.Violet),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 3*h, 65, h, h, 0, HAND, false, COMMANDS.STROKE[0], CLRS.RedViolet),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 0,   90, h, h, 0, HAND, false, COMMANDS.STROKE[0], CLRS.White),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, h,   90, h, h, 0, HAND, false, COMMANDS.STROKE[0], CLRS.Gray3),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 2*h, 90, h, h, 0, HAND, false, COMMANDS.STROKE[0], CLRS.Gray6),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 3*h, 90, h, h, 0, HAND, false, COMMANDS.STROKE[0], CLRS.Black),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    cn.ctrls=ctrls;

    return cn;

  };
  var getFill=function(parent){

    var ctrls=[];
    var top=30;
    var h=25;
    var l=parent.w-200;
    var ch=app.height-14;
    //~ var w=100;
    //~ var h=20;

    var st=CLRS.Gray5;
    var stH=CLRS.Gray2;
    var f=CLRS.BUTTON;
    var fH=CLRS.BUTTONH;

    var cn=new stripVC(
            new propC(getGUID(), parent, 90, 170, 100, 15, 1, HAND, false, COMMANDS.FILL[0], COMMANDS.FILL[1]),
            new propL(parent.fill, f, CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ Colors
    //~
    //~ Red       RedOrange
    //~ Orange    YellowOrange
    //~ Yellow    YellowGreen
    //~ Green     BlueGreen
    //~ Blue      BlueViolet
    //~ Violet    RedViolet

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 0,   15, h, h, 2, HAND, false, COMMANDS.FILL[0], CLRS.Red),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, h,   15, h, h, 0, HAND, false, COMMANDS.FILL[0], CLRS.RedOrange),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 2*h, 15, h, h, 0, HAND, false, COMMANDS.FILL[0], CLRS.Orange),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 3*h, 15, h, h, 0, HAND, false, COMMANDS.FILL[0], CLRS.YellowOrange),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 0,   40, h, h, 0, HAND, false, COMMANDS.FILL[0], CLRS.Yellow),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, h,   40, h, h, 0, HAND, false, COMMANDS.FILL[0], CLRS.YellowGreen),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 2*h, 40, h, h, 0, HAND, false, COMMANDS.FILL[0], CLRS.Green),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 3*h, 40, h, h, 0, HAND, false, COMMANDS.FILL[0], CLRS.BlueGreen),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 0,   65, h, h, 0, HAND, false, COMMANDS.FILL[0], CLRS.Blue),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, h,   65, h, h, 0, HAND, false, COMMANDS.FILL[0], CLRS.BlueViolet),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 2*h, 65, h, h, 0, HAND, false, COMMANDS.FILL[0], CLRS.Violet),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 3*h, 65, h, h, 0, HAND, false, COMMANDS.FILL[0], CLRS.RedViolet),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 0,   90, h, h, 0, HAND, false, COMMANDS.FILL[0], CLRS.White),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, h,   90, h, h, 0, HAND, false, COMMANDS.FILL[0], CLRS.Gray3),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 2*h, 90, h, h, 0, HAND, false, COMMANDS.FILL[0], CLRS.Gray6),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(), cn, 3*h, 90, h, h, 0, HAND, false, COMMANDS.FILL[0], CLRS.Black),
                new propL(f, fH, st, stH, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    cn.ctrls=ctrls;

    return cn;

  };

  var getProperties=function(parent){

    var ctrls=[];
    var top=30;
    var h=20;
    var l=10;
    var ch=300;
    var col0=10;
    var col1=90;

    var cn=new container(
            new propC(getGUID(),parent, 300, 170, 200, 275, 3, ARROW, false, COMMANDS.CONTAINER[0],COMMANDS.CONTAINER[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ Name
    //~ Caption
    //~ Formula
    //~
    //~ Stroke
    //~ Stroke Alpha
    //~
    //~ Fill
    //~ Fill Alpha
    //~
    //~ LineType
    //~ LineWeight

    ctrls.push(new label(
                new propC(getGUID(), cn, cn.w/2, 10, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.PROPERTIES[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12)));

    ctrls.push(new label(
                new propC(getGUID(), cn, col0, top+0*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.NAME[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, col0, top+1*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.CAPTION[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, col0, top+2*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.FORMULA[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, col0, top+3*h+5, 180, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.SPACER[0]),
                new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, col0, top+4*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.STROKE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, col0, top+5*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.STROKEA[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, col0, top+6*h+5, 180, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.SPACER[0]),
                new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, col0, top+7*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.FILL[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, col0, top+8*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.FILLA[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new spacer(
                new propC(getGUID(), cn, col0, top+9*h+5, 180, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.SPACER[0]),
                new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, col0, top+10*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.LINETYPE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, col0, top+11*h, 10, 10, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.LINEWEIGHT[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    //~ ctrls.push(new label(
                //~ new propC(getGUID(), cn, l+5, top+9*h, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.LAYER[1]),
                //~ new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                //~ new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new textBox(
                new propC(getGUID(), cn, col1, top+0*h, 100, 14, 0, TEXT, false, COMMANDS.NAME[0], COMMANDS.NAME[1]),
                new propL(CLRS.BLACK, CLRS.Gray3, CLRS.BLACK, CLRS.BLACK, 0.5, 1),
                new propA(CLRS.GRAY, CLRS.BLACK, LEFT, CENTER, 10, 11)));

    ctrls.push(new textBox(
                new propC(getGUID(), cn, col1, top+1*h, 100, 14, 0, TEXT, false, COMMANDS.CAPTION[0], COMMANDS.CAPTION[1]),
                new propL(CLRS.BLACK, CLRS.Gray3, CLRS.BLACK, CLRS.BLACK, 0.5, 1),
                new propA(CLRS.GRAY, CLRS.BLACK, LEFT, CENTER, 10, 11)));

    ctrls.push(new textBox(
                new propC(getGUID(), cn, col1, top+2*h, 100, 14, 0, TEXT, app.formula, COMMANDS.FORMULA[0], COMMANDS.FORMULA[1]),
                new propL(CLRS.BLACK, CLRS.Gray3, CLRS.BLACK, CLRS.BLACK, 0.5, 1),
                new propA(CLRS.GRAY, CLRS.BLACK, LEFT, CENTER, 10, 11)));

    ctrls.push(new sliderH(
                new propC(getGUID(), cn, col1, top+5*h, 100, 8, 5, HAND, app.strokeA, COMMANDS.STROKEA[0], COMMANDS.STROKEA[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new sliderH(
                new propC(getGUID(), cn, col1, top+8*h, 100, 8, 5, HAND, app.fillA, COMMANDS.FILLA[0], COMMANDS.FILLA[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new textBox(
                new propC(getGUID(), cn, col1, top+11*h, 100, 14, 0, HAND, app.lineweight, COMMANDS.LINEWEIGHT[0], COMMANDS.LINEWEIGHT[1]),
                new propL(CLRS.BLACK, CLRS.Gray3, CLRS.BLACK, CLRS.BLACK, 0.5, 1),
                new propA(CLRS.GRAY, CLRS.BLACK, LEFT, CENTER, 10, 11)));

    //~ ctrls.push(new labelP(
                //~ new propC(getGUID(), cn, l+100, top+9*h, 10, 10, 0, false, COMMANDS.LAYER[0], COMMANDS.LAYER[1]),
                //~ new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                //~ new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(getLineTypes(cn));
    ctrls.push(getFill(cn));
    ctrls.push(getStroke(cn));

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
            new propC(getGUID(),parent, 900, 220, 180, 270, 3, ARROW, false, COMMANDS.UNDEF[0],0),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ Colors
    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+0*h, top, h, h, 0, HAND, false, COMMANDS.STROKE[1] ,CLRS.Red),
                new propL(CLRS.Red, CLRS.Red, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+1*h+5, top, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.RedOrange),
                new propL(CLRS.RedOrange, CLRS.RedOrange, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+2*h+10, top, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.Orange),
                new propL(CLRS.Orange, CLRS.Orange, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+3*h+15, top, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.YellowOrange),
                new propL(CLRS.YellowOrange, CLRS.YellowOrange, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+4*h+20, top, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.Yellow),
                new propL(CLRS.Yellow, CLRS.Yellow, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+5*h+25, top, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.YellowGreen),
                new propL(CLRS.YellowGreen, CLRS.YellowGreen, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+0*h, top+1*h+5, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.Green),
                new propL(CLRS.Green, CLRS.Green, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+1*h+5, top+1*h+5, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.BlueGreen),
                new propL(CLRS.BlueGreen, CLRS.BlueGreen, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+2*h+10, top+1*h+5, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.Blue),
                new propL(CLRS.Blue, CLRS.Blue, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+3*h+15, top+1*h+5, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.BlueViolet),
                new propL(CLRS.BlueViolet, CLRS.BlueViolet, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+4*h+20, top+1*h+5, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.Violet),
                new propL(CLRS.Violet, CLRS.Violet, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+5*h+25, top+1*h+5, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.RedViolet),
                new propL(getColor(CLRS.RedViolet,90), CLRS.RedViolet, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    //~ Gray Scale
    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+0*h, top+2*h+10, h, h, 0, HAND, false, COMMANDS.STROKE[1] ,CLRS.White),
                new propL(CLRS.White, CLRS.White, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+1*h+5, top+2*h+10, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.Gray1),
                new propL(CLRS.Gray1, CLRS.Gray1, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+2*h+10, top+2*h+10, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.Gray2),
                new propL(CLRS.Gray2, CLRS.Gray2, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+3*h+15, top+2*h+10, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.Gray3),
                new propL(CLRS.Gray3, CLRS.Gray3, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+4*h+20, top+2*h+10, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.Gray4),
                new propL(CLRS.Gray4, CLRS.Gray4, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+5*h+25, top+2*h+10, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.Gray5),
                new propL(CLRS.Gray5, CLRS.Gray5, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+0*h, top+3*h+15, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.Gray6),
                new propL(CLRS.Gray6, CLRS.Gray6, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+1*h+5, top+3*h+15, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.Gray7),
                new propL(CLRS.Gray7, CLRS.Gray7, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+2*h+10, top+3*h+15, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.Gray8),
                new propL(CLRS.Gray8, CLRS.Gray8, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+3*h+15, top+3*h+15, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.Gray9),
                new propL(CLRS.Gray9, CLRS.Gray9, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+4*h+20, top+3*h+15, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.Gray10),
                new propL(CLRS.Gray10, CLRS.Gray10, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonC(
                new propC(getGUID(),cn, l+5*h+25, top+3*h+15, h, h, 0, HAND, false, COMMANDS.STROKE[1], CLRS.Black),
                new propL(getColor(CLRS.Black,90), CLRS.Black, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    //~ Current Color
    ctrls.push(new buttonP(
                new propC(getGUID(),cn, l+5*h+25, top+5*h+15, 40, 40, 0, HAND, false, COMMANDS.COLORG[0], COMMANDS.COLORG[0]),
                new propL(getColor(CLRS.YELLOW,90), CLRS.YELLOW, CLRS.YELLOW, CLRS.YELLOW, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l, top+5*h+20, 10, 10, 0, HAND, false, COMMANDS.UNDEF[0], COMMANDS.RED[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.RED, CLRS.YELLOW, LEFT, CENTER, 14, 14)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l, top+5*h+40, 10, 10, 0, HAND, false, COMMANDS.UNDEF[0], COMMANDS.GREEN[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GREEN, CLRS.YELLOW, LEFT, CENTER, 14, 14)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l, top+5*h+60, 10, 10, 0, HAND, false, COMMANDS.UNDEF[0], COMMANDS.BLUE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.BLUE, CLRS.YELLOW, LEFT, CENTER, 14, 14)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+60, top+5*h+20, 10, 10, 0, HAND, false, COMMANDS.RED[0], COMMANDS.RED[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.RED, CLRS.YELLOW, LEFT, CENTER, 14, 14)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+60, top+5*h+40, 10, 10, 0, HAND, false, COMMANDS.GREEN[0], COMMANDS.GREEN[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GREEN, CLRS.YELLOW, LEFT, CENTER, 14, 14)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+60, top+5*h+60, 10, 10, 0, HAND, false, COMMANDS.BLUE[0], COMMANDS.BLUE[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.BLUE, CLRS.YELLOW, LEFT, CENTER, 16, 16)));

    ctrls.push(new sliderH(
                new propC(getGUID(), cn, l, top+5*h+90, 128, 10, 5, HAND, 10, COMMANDS.RED[0], false),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new sliderH(
                new propC(getGUID(), cn, l, top+5*h+110, 128, 10, 5, HAND, 10, COMMANDS.GREEN[0], false),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new sliderH(
                new propC(getGUID(), cn, l, top+5*h+130, 128, 10, 5, HAND, 10, COMMANDS.BLUE[0], false),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    cn.ctrls=ctrls;

    return cn;

  };

  var getHeader=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;

    var cn=new container(
            new propC(getGUID(), parent, parent.w/2-400, -5, 800, 45, 5, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.HEADER[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    cn.ctrls=ctrls;

    return cn;

  };
  var getFooter=function(parent){

    var ctrls=[];
    var top=28;
    var h=15;
    var w=24;

    var cn=new container(
            new propC(getGUID(), parent, parent.x+210, app.height-30, parent.w-215, 28, 0, ARROW, false, COMMANDS.UNDEF[0],COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.WHITE, CLRS.YELLOW, LEFT, CENTER, 12, 14));

    ctrls.push(new label(
                new propC(getGUID(), cn, 100, 3, w, w, 0, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]+":"),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 12, 12)));

    ctrls.push(new textBox(
                new propC(getGUID(), cn, 180, 3, 340, 24, 0, HAND, false, COMMANDS.STG[0], getColor(CLRS.GRAY,25)),
                new propL(CLRS.Gray8, CLRS.GRAY, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonT(
                new propC(getGUID(), cn, 3, 3, w, w, 0, HAND, false, COMMANDS.STG[0], getColor(CLRS.GRAY,25)),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonT(
                new propC(getGUID(), cn, 27, 3, w, w, 0, HAND, false,COMMANDS.ORTHO[0], COMMANDS.UNDEF[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonT(
                new propC(getGUID(), cn, 51, 3, w, w, 0, HAND, false, COMMANDS.LINES[0], COMMANDS.UNDEF[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, cn.w-10, 9, 10, 10, 0, ARROW, false, COMMANDS.COORDINATES[0], COMMANDS.COORDINATES[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, RIGHT, CENTER, 12, 12)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getView=function(parent){

    var ctrls=[];
    var top=28;
    var h=15;
    var w=24;

    var cn=new container(
            new propC(getGUID(), parent, parent.w-340, app.height-30, 78, 34, 2, HAND, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.WHITE, CLRS.YELLOW, LEFT, CENTER, 12, 14));

    ctrls.push(new buttonT(
                new propC(getGUID(), cn, 3, 3, w, w, 0, HAND, false, COMMANDS.PAN[0], COMMANDS.PAN[0]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonT(
                new propC(getGUID(), cn, 27, 3, w, w, 0, HAND, false, COMMANDS.ZOOMIN[0], COMMANDS.ZOOMIN[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonT(
                new propC(getGUID(), cn, 51, 3, w, w, 0, HAND, false, COMMANDS.ZOOMOUT[0], COMMANDS.ZOOMOUT[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    cn.ctrls=ctrls;

    return cn;

  };
  var getSelect=function(parent){

    var ctrls=[];
    var top=28;
    var h=15;
    var w=24;

    var cn=new container(
            new propC(getGUID(), parent, 600, 300, 150, 34, 2, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.WHITE, CLRS.YELLOW, LEFT, CENTER, 12, 14));

    ctrls.push(new buttonT(
                new propC(getGUID(), cn, 3, 3, w, w, 0, HAND, false, COMMANDS.SELECT[0], COMMANDS.SELECT[0]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonT(
                new propC(getGUID(), cn, 27, 3, w, w, 0, HAND, false, COMMANDS.SELECTALL[0], COMMANDS.SELECTALL[0]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonT(
                new propC(getGUID(), cn, 51, 3, w, w, 0, HAND, false, COMMANDS.SELECT_WINDOW[0], COMMANDS.SELECT_WINDOW[0]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonT(
                new propC(getGUID(), cn, 75, 3, w, w, 0, HAND, false, COMMANDS.UNDO[0], COMMANDS.UNDO[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new buttonT(
                new propC(getGUID(), cn, 99, 3, w, w, 0, HAND, false, COMMANDS.REDO[0], COMMANDS.REDO[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    cn.ctrls=ctrls;

    return cn;

  };

  var getSamples=function(parent){

    var ctrls=[];
    var incr=161.8;
    var top=28;
    var h=15;
    var w=4*incr+40;

    var cn=new containerS(
            new propC(getGUID(), parent, parent.w/2-w/2, 100, w, 100, 2, false, COMMANDS.UNDEF[0],COMMANDS.VIEW[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.WHITE, CLRS.YELLOW, LEFT, CENTER, 12, 14));

    for(var n=0; n<10; n++){
      ctrls.push(new preset(
                  new propC(getGUID(), cn, 20+n*incr, 5, incr, 90, n, n, n),
                  new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                  new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));
    }

    cn.ctrls=ctrls;

    return cn;

  };

  var getGrid=function(parent){

    var ctrls=[];

    var cn=new grid(
            new propC(getGUID(), parent, parent.x+210, parent.y+5, parent.w-215, parent.h-35, 5, ARROW, false, COMMANDS.UNDEF[0], 0),
            new propL(CLRS.GRID, getColor(CLRS.GRID,65), CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ ctrls.push(new labelR(
            //~ new propC(getGUID(), cn, cn.w/2, cn.h/2, 10, 10, 0, false, COMMANDS.UNDEF[0], COMMANDS.CARTESIA[1]),
            //~ new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
            //~ new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12)));

    ctrls.push(new buttonS(
                new propC(getGUID(), cn, cn.x+cn.w-26, cn.y, 24, 24, 0, HAND, false, COMMANDS.GRIDPROPS[0], COMMANDS.GRIDPROPS[1]),
                new propL(CLRS.TRANSPARENT, CLRS.TRANSPARENT, CLRS.Gray6, CLRS.Gray3, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(getGridProps(cn));

    cn.ctrls=ctrls;

    return cn;

  };

  var getGridProps=function(parent){

    var ctrls=[];
    var top=10;
    var h=15;
    var l=parent.x+parent.w-123;
    var ch=255;
    var lX=80;

    var cn=new cnProps(
            new propC(getGUID(),parent, l, parent.y+25, 120, 290, 3, ARROW, false, COMMANDS.GRIDPROPS[0], COMMANDS.GRIDPROPS[1]),
            new propL(getColor(CLRS.GRID,40), CLRS.GRID, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    //~ ctrls.push(new buttonS(
                //~ new propC(getGUID(), cn, 98, 2, 24, 24, 0, false, COMMANDS.GRIDPROPS[0], COMMANDS.GRIDPROPS[1]),
                //~ new propL(CLRS.TRANSPARENT, CLRS.TRANSPARENT, CLRS.Gray6, CLRS.Gray3, 0.125, 0.25),
                //~ new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    //~ Labels ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //~ Origin
    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+0*h, 10, 10, 0, HAND, false, COMMANDS.ORIGIN[0], COMMANDS.ORIGIN[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));



    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+1*h+5, 110, 10, 0, ARROW, false, COMMANDS.SPACER[0], COMMANDS.SPACER[0]),
                new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    //~ Axes
    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+2*h, 10, 10, 0, HAND, false, COMMANDS.AXES[0], COMMANDS.AXES[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, lX, top+2*h, 10, 10, 0, HAND, false, COMMANDS.AXISX[0], COMMANDS.AXISX[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, lX, top+3*h, 10, 10, 0, HAND, false, COMMANDS.AXISY[0], COMMANDS.AXISY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));



    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+4*h+5, 110, 10, 0, ARROW, false, COMMANDS.SPACER[0], COMMANDS.SPACER[0]),
                new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    //~ Lines
    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+5*h, 10, 10, 0, HAND, false, COMMANDS.LINES[0], COMMANDS.LINES[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, lX, top+5*h, 10, 10, 0, HAND, false, COMMANDS.LINESX[0], COMMANDS.LINESX[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, lX, top+6*h, 10, 10, 0, HAND, false, COMMANDS.LINESY[0], COMMANDS.LINESY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+7*h+5, 110, 10, 0, ARROW, false, COMMANDS.SPACER[0], COMMANDS.SPACER[0]),
                new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    //~ Arrows
    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+8*h, 10, 10, 0, HAND, false, COMMANDS.ARROWS[0], COMMANDS.ARROWS[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, lX, top+8*h, 10, 10, 0, HAND, false, COMMANDS.ARROWSX[0], COMMANDS.ARROWSX[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, lX, top+9*h, 10, 10, 0, HAND, false, COMMANDS.ARROWSY[0], COMMANDS.ARROWSY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+10*h+5, 110, 10, 0, ARROW, false, COMMANDS.SPACER[0], COMMANDS.SPACER[0]),
                new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    //~ Ticks
    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+11*h, 10, 10, 0, HAND, false, COMMANDS.TICKS[0], COMMANDS.TICKS[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, lX, top+11*h, 10, 10, 0, HAND, false, COMMANDS.TICKSX[0], COMMANDS.TICKSX[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, lX, top+12*h, 10, 10, 0, HAND, false, COMMANDS.TICKSY[0], COMMANDS.TICKSY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+13*h+5, 110, 10, 0, ARROW, false, COMMANDS.SPACER[0], COMMANDS.SPACER[0]),
                new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    //~ Labels
    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+14*h, 10, 10, 0, HAND, false, COMMANDS.LABELS[0], COMMANDS.LABELS[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, lX, top+14*h, 10, 10, 0, HAND, false, COMMANDS.LABELSX[0], COMMANDS.LABELSX[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(new label(
                new propC(getGUID(), cn, lX, top+15*h, 10, 10, 0, HAND, false, COMMANDS.LABELSY[0], COMMANDS.LABELSY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    ctrls.push(new spacer(
                new propC(getGUID(), cn, 5, top+16*h+5, 110, 10, 0, ARROW, false, COMMANDS.SPACER[0], COMMANDS.SPACER[0]),
                new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    //~ Quadrants
    ctrls.push(new label(
                new propC(getGUID(), cn, 10, top+17*h, 10, 10, 0, HAND, false, COMMANDS.QUADRANTS[0], COMMANDS.QUADRANTS[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));


    //~ Values ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+0*h+5, 10, 10, 0, HAND, false, COMMANDS.ORIGIN[0], COMMANDS.ORIGIN[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+2*h+5, 10, 10, 0, HAND, false, COMMANDS.AXISX[0], COMMANDS.AXISX[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+3*h+5, 10, 10, 0, HAND, false, COMMANDS.AXISY[0], COMMANDS.AXISY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+5*h+5, 10, 10, 0, HAND, false, COMMANDS.LINESX[0], COMMANDS.LINESX[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+6*h+5, 10, 10, 0, HAND, false, COMMANDS.LINESY[0], COMMANDS.LINESY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+8*h+5, 10, 10, 0, HAND, false, COMMANDS.ARROWSX[0], COMMANDS.ARROWSX[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+9*h+5, 10, 10, 0, HAND, false, COMMANDS.ARROWSY[0], COMMANDS.ARROWSY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+11*h+5, 10, 10, 0, HAND, false, COMMANDS.TICKSX[0], COMMANDS.TICKSX[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+12*h+5, 10, 10, 0, HAND, false, COMMANDS.TICKSY[0], COMMANDS.TICKSY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+14*h+5, 10, 10, 0, HAND, false, COMMANDS.LABELSX[0], COMMANDS.LABELSX[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+15*h+5, 10, 10, 0, HAND, false, COMMANDS.LABELSY[0], COMMANDS.LABELSY[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12)));

    ctrls.push(new checkbox(
                new propC(getGUID(), cn, 105, top+17*h+5, 10, 10, 0, HAND, false, COMMANDS.QUADRANTS[0], COMMANDS.QUADRANTS[1]),
                new propL(CLRS.BUTTON, CLRS.BUTTONH, CLRS.BUTTONH, CLRS.BUTTON, 0.125, 0.25),
                new propA(CLRS.WHITE, CLRS.YELLOW, CENTER, CENTER, 11, 12)));

    cn.ctrls=ctrls;

    return cn;

  };

  var getShapes=function(parent){

    var ctrls=[];

    var cn=new container(
            new propC(getGUID(), parent, parent.x+5, parent.y+5, 200, parent.h-10, 3, ARROW, false, COMMANDS.UNDEF[0],COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    ctrls.push(new buttonA(
                new propC(getGUID(), cn, 10, 10, 36, 36, 0, HAND, false, COMMANDS.CURRENT[0], COMMANDS.CURRENT[1]),
                new propL(CLRS.Gray8, CLRS.Gray7, CLRS.BLUE, CLRS.ORANGE, 0.125, 0.25),
                new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11)));

    ctrls.push(getPoints(cn));        //~ Points
    //~ ctrls.push(getLines(cn));         //~ Lines
    //~ ctrls.push(getTriangles(cn));     //~ Triangles
    //~ ctrls.push(getCircles(cn));       //~ Circles
    //~ ctrls.push(getQuads(cn));         //~ Quads
    //~ ctrls.push(getArcs(cn));          //~ Arcs
    //~ ctrls.push(getPolygons(cn));      //~ Polygons
    //~ ctrls.push(getConics(cn));        //~ Conics
    //~ ctrls.push(getAngles(cn));        //~ Angles
    //~ ctrls.push(getAnnotations(cn));   //~ Annotations
//~ 
    //~ ctrls.push(getTransform(cn));     //~ Transforms
    //~ ctrls.push(getMeasure(cn));       //~ Measure

    cn.ctrls=ctrls;

    return cn;

  };



  var addControls=function(){

    var ctrls=[];

    var cn=new container(
            new propC(getGUID(), 0, 0, 0, app.width-1, app.height-1, 3, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[0]),
            new propL(CLRS.BLACK, CLRS.BLACK, CLRS.Gray9, CLRS.Gray0, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    ctrls.push(getGrid(cn));          //~ Grid

    ctrls.push(getShapes(cn));        //~ Shapes




    if(app.debug){ ctrls.push(getTelemetry(cn)); }

    //~ ctrls.push(getHeader(cn));
    ctrls.push(getFooter(cn));
    ctrls.push(getView(cn));
    ctrls.push(getProperties(cn));

    //~ ctrls.push(getColors(cn));

    //~ ctrls.push(getSamples(cn));
    //~ ctrls.push(getSelect(cn));

    cn.ctrls=ctrls;

    app.ctrls.push(cn);

  };

  var loadCommands=function(){

    saveStrings('Rectangle', COMMANDS.DEBUG);

  };


  var initialize=function(){

    strokeJoin(ROUND);

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

  var fontList = PFont.list();
  //~ println(fontList);

}};
