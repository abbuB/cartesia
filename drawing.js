/* @pjs globalKeyEvents="true"; */
var proc = function(processingInstance){ with (processingInstance){

  // size(900, 500); // set size of canvas

  /**

    TO DO:
      - ...


  **/

var process;

var zoomfactor=0;

  var getColor=function(clr,alpha){

    return color(red(clr), green(clr), blue(clr), alpha/100*255);

  };
  
  var hexToRGB=function(hexStr){
    // note: hexStr should be #rrggbb
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b = hex & 0x0000ff;
    return color(r,g,b);
  }
  
  var hexToRGBA=function(hexStr,a){
    // note: hexStr should be #rrggbb
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b = hex & 0x0000ff;
    return color(r,g,b,a);
  }
  
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
    Yellow:   color(255,255,0),

    YellowGreen:  color(192,255,0),
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
    STG:        118,  // F7: snap to grid
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

  var arrCOMMANDS=[
    [   1,  'Undefined',        'UNDEFINED'             ],
    [   2,  'Cartesia',         'CARTESIA'              ],
    [   3,  'Container',        'CONTAINER'             ],
    [   4,  'Header',           'HEADER'                ],
    [   5,  'Footer',           'FOOTER'                ],
    [   6,  'Telemetry',        'TELEMETRY'             ],
    [   7,  'ToolTip',          'TOOLTIP'               ],

    [   9,  'Debug',            'DEBUG'                 ],

    [  10,  'Width',            'WIDTH'                 ],
    [  11,  'Height',           'HEIGHT'                ],

    [  12,  'FrameRateA',       'FRAMERATE(A)'          ],
    [  13,  'FrameRate',        'FRAMERATE'             ],

    [  21,  'Visible',          'VISIBLE'               ],

    [  26,  'Spacer',           'SPACER'                ],

    [  27,  'Current',          'CURRENT'               ],
    [  28,  'Factor',           'FACTOR'                ],
    [  29,  'Util',             'UTIL'                  ],
    [  14,  'MouseX',           'MOUSEX'                ],
    [  15,  'MouseY',           'MOUSEY'                ],
    [  16,  'WorldX',           'WORLDX'                ],
    [  17,  'WorldY',           'WORLDY'                ],
    [  18,  'GridX',            'GRIDX'                 ],
    [  19,  'GridY',            'GRIDY'                 ],

    [  20,  'Pressed',          'PRESSED'               ],

    [  22,  'Focus',            'FOCUS'                 ],

    [  23,  'Left button',      'LEFT'                  ],
    [  24,  'Center button',    'CENTER'                ],
    [  25,  'Right button',     'RIGHT'                 ],

        // Grid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    [ 100,  'Grid',             'GRID',       KEYCODES.GRID       ],

    [ 101,  'GridProps',        'GRIDPROPS',  KEYCODES.GRIDPROPS  ],

    [ 102,  'Origin',           'ORIGIN',     KEYCODES.ORIGIN     ],
    [ 103,  'Border',           'BORDER',     KEYCODES.BORDER     ],
    [ 104,  'Axes',             'AXES',       KEYCODES.AXES       ],
    [ 105,  'x',                'X',          KEYCODES.AXISX      ],
    [ 106,  'y',                'Y',          KEYCODES.AXISY      ],
    [ 107,  'Lines',            'LINES',      KEYCODES.LINES      ],
    [ 108,  'x',                'X',          KEYCODES.LINESX     ],
    [ 109,  'y',                'Y',          KEYCODES.LINESY     ],
    [ 110,  'Arrows',           'ARROWS',     KEYCODES.ARROWS     ],
    [ 111,  'x',                'X',          KEYCODES.ARROWSX    ],
    [ 112,  'y',                'Y',          KEYCODES.ARROWSY    ],
    [ 113,  'Ticks',            'TICKS',      KEYCODES.TICKS      ],
    [ 114,  'x',                'X',          KEYCODES.TICKSX     ],
    [ 115,  'y',                'Y',          KEYCODES.TICKSY     ],
    [ 116,  'Labels',           'LABELS',     KEYCODES.LABELS     ],
    [ 117,  'x',                'X',          KEYCODES.LABELSX    ],
    [ 118,  'y',                'Y',          KEYCODES.LABELSY    ],
    [ 119,  'Quadrants',        'QUADRANTS',  KEYCODES.QUADRANTS  ],

    [ 120,  'Coordinates',      'COORDINATES'                     ],
    [ 121,  'Ortho',            'ORTHO',      KEYCODES.ORTHO      ],
    [ 122,  'STG',              'STG',        KEYCODES.STG        ],
    [ 123,  'Grid',             'COMMAND'                         ],

        // Properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    [ 200,  'Properties',       'PROPERTIES'            ],

    [ 201,  'Match',            'MATCH'                 ],

    [ 202,  'Name',             'NAME'                  ],
    [ 203,  'Caption',          'CAPTION'               ],
    [ 204,  'Formula',          'FORMULA'               ],

    [ 205,  'Stroke',           'STROKE'                ],
    [ 206,  'Stroke Alpha',     'STROKEALPHA'           ],  // Stroke Alpha
    [ 207,  'Fill',             'FILL'                  ],
    [ 208,  'Fill Alpha',       'fillA'                 ],  // Fill Alpha

    [ 209,  'ColorG',           'COLORG'                ],

    [ 210,  'Layer',            'LAYER'                 ],

    [ 211,  'Line Type',        'LINE TYPE'             ],
    [ 212,  'Hairline',         'HAIRLINE'              ],
    [ 213,  'Solid',            'SOLID'                 ],
    [ 214,  'Dashed',           'DASHED'                ],
    [ 215,  'Dottted',          'DOTTED'                ],
    [ 216,  'DashDot',          'DASHDOT'               ],

    [ 217,  'Line Weight',      'LINE WEIGHT'           ],

    [ 213,  'Red',              'RED'                   ],
    [ 214,  'Blue',             'BLUE'                  ],
    [ 215,  'Green',            'GREEN'                 ],

        // File ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    [ 301,  'File',             'FILE',     KEYCODES.FILE   ],
    [ 302,  'New',              'NEW',      KEYCODES.NEW    ],
    [ 303,  'Open',             'OPEN',     KEYCODES.OPEN   ],
    [ 304,  'Save',             'SAVE',     KEYCODES.SAVE   ],
    [ 305,  'Save As',          'SAVEAS',   KEYCODES.SAVEAS ],
    [ 306,  'Close',            'CLOSE',    KEYCODES.CLOSE  ],

        // Edit ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    [ 400,  'Edit',             'EDIT',     KEYCODES.EDIT   ],
    [ 401,  'Undo',             'UNDO',     KEYCODES.UNDO   ],
    [ 402,  'Redo',             'REDO',     KEYCODES.REDO   ],
    [ 403,  'Copy',             'COPY',     KEYCODES.COPY   ],
        // CUT:          [ 404,  'Cut',              'CUT',      KEYCODES.CUT    ],
        // PASTE:        [ 405,  'Paste',            'PASTE',    KEYCODES.PASTE  ],
    [ 406,  'Delete',           'DELETE',   KEYCODES.DELETE ],
    [ 407,  'Erase',            'ERASE',    KEYCODES.DELETE ],

        // View ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    [ 500,  'View',             'VIEW',     KEYCODES.VIEW   ],
    [ 501,  'Select',           'SELECT'                ],
    [ 502,  'Select All',       'SELECTALL'             ],
    [ 503,  'Window',           'WINDOW'                ],
    [ 504,  'Zoomin',           'ZOOMIN',   KEYCODES.ZOOMIN ],
    [ 505,  'Zoomout',          'ZOOMOUT',  KEYCODES.ZOOMOUT],
    [ 506,  'Pan',              'PAN',      KEYCODES.PAN    ],

        // Modify ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    [ 600,  'Modify',           'MODIFY',       KEYCODES.MODIFY       ],
    [ 601,  'Translate',        'TRANSLATE',    KEYCODES.TRANSLATE    ],
    [ 602,  'Translate',        'TRANSLATE',    KEYCODES.TRANS_UP     ],
    [ 603,  'Translate',        'TRANSLATE',    KEYCODES.TRANS_DOWN   ],
    [ 604,  'Translate',        'TRANSLATE',    KEYCODES.TRANS_LEFT   ],
    [ 605,  'Translate',        'TRANSLATE',    KEYCODES.TRANS_RIGHT  ],
    [ 606,  'Transvector',      'TRANSVECTOR',  KEYCODES.TRANS_VECTOR ],    // TranslateByVector

    [ 607,  'Reflect',          'REFLECT'               ],
    [ 608,  'ReflectLine',      'REFLECTLINE'           ],    // ReflectAboutLIne
    [ 609,  'ReflectPoint',     'REFLECTPOINT'          ],    // ReflectAboutPoint
    [ 610,  'ReflectCircle',    'REFLECTCIRCLE'         ],    // ReflectAboutCircle


    [ 611,  'Rotate',           'ROTATE'                ],
    [ 612,  'RotatePoint',      'ROTATEPOINT'           ],    // RotateAroundPoint

    [ 613,  'Scale',            'SCALE'                 ],
    [ 614,  'Shear',            'SHEAR'                 ],

        // DILATEFROMPOINT:            [ 1,  'Dilatefrompoint',    'DILATEFROMPOINT' ]

        // Measure ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    [ 700,  'Measure',          'MEASURE'               ],
    [ 701,  'Distance',         'DISTANCE'              ],
    [ 702,  'Perimeter',        'PERIMETER'             ],
    [ 703,  'Area',             'AREA'                  ],
    [ 704,  'Volume',           'VOLUME'                ],
    [ 705,  'Radius',           'RADIUS'                ],
    [ 706,  'Diamter',          'DIAMETER'              ],
    [ 707,  'Slope',            'SLOPE'                 ],

        // Layers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //LAYER:        [ 800,  'Layer',            'LAYER'                 ],
    [ 801,  'Forward',          'FORWARD'               ],
    [ 802,  'Back',             'BACK'                  ],



        //  SHAPES ========================================================

        // Point (P) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    [1000,  'Point',            'POINT'                 ],
    [1001,  'P_DEFAULT',        'P_DEFAULT'             ],
    [1002,  'P_Object',         'P_OBJECT'              ],
    [1003,  'P_Bound',          'P_BOUND'               ],
    [1004,  'P_Intersect',      'P_INTERSECT'           ],
    [1005,  'P_Midpoint',       'P_MIDPOINT'            ],    // Midpoint/Center
    [1006,  'P_AttachDetach',   'P_ATTACHDETACH'        ],    // AttachDetachPoint

        // Line (L) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    [1100,  'Line',             'LINE'                  ],
    [1101,  'Line2P',           'LINE2P'                ],    // through 2 vertices
    [1102,  'LineSegment2P',    'LINESEGMENT2P'         ],    // between 2 vertices
    [1103,  'LineSegmentLen',   'LINESEGMENTLEN'        ],    // from point given length
    [1104,  'LinePerp',         'LINEPERP'              ],    // perpendicular
    [1105,  'LinePerpB',        'LINEPERPB'             ],    //  perpendicular bisector
    [1106,  'LineAngB',         'LINEANGB'              ],    // angle bisector
    [1107,  'LineParr',         'LINEPARR'              ],    // parallel
    [1108,  'LineTangent',      'LINETANGENT'           ],    // Tangent
    [1109,  'LineDiameter',     'LINEDIAMETER'          ],    // Diameter
    [1110,  'LineRadius',       'LINERADIUS'            ],    // Radius

    [1211,  'Ray2P',            'RAY2P'                 ],    // Ray between 2 vertices
    [1212,  'Vector2P',         'VECTOR2P'              ],    // Vector between 2 vertices
    [1213,  'VectorFP',         'VECTORFP'              ],    // Vector from point

        // Triangle (T)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    [1300,  'Triangle',         'TRIANGLE'              ],
    [1301,  'T_Equilateral',    'T_EQUILATERAL'         ],
    [1302,  'T_Isosceles',      'T_ISOSCELES'           ],
    [1303,  'T_Scalene',        'T_SCALENE'             ],

        // Circle (C)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    [1400,  'Circle',           'CIRCLE'                ],
    [1401,  'C_CenterP',        'C_CENTERP'             ],    // center point
    [1402,  'C_CenterR',        'C_CENTERR'             ],    // center radius

    [1403,  'C_3P',             'C_3P'                  ],    //  3 vertices

        // Quadrilateral (Q)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    [1500,  'Quadrilateral',    'QUADRILATERAL'         ],
    [1501,  'Rectangle',        'RECTANGLE'             ],
    [1502,  'Square',           'SQUARE'                ],
    [1503,  'Rhombus',          'RHOMBUS'               ],
    [1504,  'Parallelogram',    'PARALLELOGRAM'         ],    // Q_PARALLELOGRAM
    [1505,  'Trapezoid',        'TRAPEZOID'             ],
    [1506,  'Kite',             'KITE'                  ],

        // Arc (A)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    [1600,  'Arc',              'ARC'                   ],
    [1601,  'Arc2vertices',     'ARC2vertices'          ],    // SemiCircleThrough2vertices
    [1602,  'CircularArc',      'CIRCULARARC'           ],    // CircularArc
    [1603,  'CircumCircularArc','CIRCUMCIRCULARARC'     ],    // CircumcircularArc
    [1604,  'CircularSector',   'CIRCULARSECTOR'        ],    // CircularSector
    [1605,  'CircumCircularSector','CIRCUMCIRCULARSECTOR'],   // CircumCircularSector

    [1606,  'Compass',          'COMPASS'               ],    // ??

        // Polygon ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    [1700,  'Polygon',          'POLYGON'               ],
    [1701,  'PolygonR',         'POLYGONR'              ],    // regular
    [1702,  'PolygonRigid',     'POLYGONRIGID'          ],    // Rigid
    [1703,  'PolygonV',         'POLYGONV'              ],    // Vector

        // Conics (S) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    [1800,  'Conic',            'CONIC'                 ],
    [1800,  'Ellipse',          'ELLIPSE'               ],
    [1801,  'Hyperbola',        'HYPERBOLA'             ],
    [1802,  'Parabola',         'PARABOLA'              ],
    [1803,  'Conic 5 Vertices', 'CONIC5VERTICES'        ],

        // Angle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    [1900,  'Angle',            'ANGLE'                 ],
    [1901,  'Angle Size',       'ANGLESize'             ],

        // Annotation ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    [2000,  'Text',             'TEXT'                  ],

        // Images ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    [2101,  'Image',            'IMAGE'                 ],
    [2102,  'SKETCH',           'SKETCH'                ]
  ];
  
  var COMMANDS={

    // General ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

    // Mouse ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

    // Grid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

    // Properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    PROPERTIES:   [ 200,  'Properties',       'PROPERTIES'            ],

    MATCH:        [ 201,  'Match',            'MATCH'                 ],

    NAME:         [ 202,  'Name',             'NAME'                  ],
    CAPTION:      [ 203,  'Caption',          'CAPTION'               ],
    FORMULA:      [ 204,  'Formula',          'FORMULA'               ],

    STROKE:       [ 205,  'Stroke',           'STROKE'                ],
    STROKEA:      [ 206,  'Stroke Alpha',     'STROKEALPHA'           ],  // Stroke Alpha
    FILL:         [ 207,  'Fill',             'FILL'                  ],
    FILLA:        [ 208,  'Fill Alpha',       'fillA'                 ],  // Fill Alpha

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

    // File ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    FILE:         [ 301,  'File',             'FILE',     KEYCODES.FILE   ],
    NEW:          [ 302,  'New',              'NEW',      KEYCODES.NEW    ],
    OPEN:         [ 303,  'Open',             'OPEN',     KEYCODES.OPEN   ],
    SAVE:         [ 304,  'Save',             'SAVE',     KEYCODES.SAVE   ],
    SAVEAS:       [ 305,  'Save As',          'SAVEAS',   KEYCODES.SAVEAS ],
    CLOSE:        [ 306,  'Close',            'CLOSE',    KEYCODES.CLOSE  ],

    // Edit ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    EDIT:         [ 400,  'Edit',             'EDIT',     KEYCODES.EDIT   ],
    UNDO:         [ 401,  'Undo',             'UNDO',     KEYCODES.UNDO   ],
    REDO:         [ 402,  'Redo',             'REDO',     KEYCODES.REDO   ],
    COPY:         [ 403,  'Copy',             'COPY',     KEYCODES.COPY   ],
    // CUT:          [ 404,  'Cut',              'CUT',      KEYCODES.CUT    ],
    // PASTE:        [ 405,  'Paste',            'PASTE',    KEYCODES.PASTE  ],
    DELETE:       [ 406,  'Delete',           'DELETE',   KEYCODES.DELETE ],
    ERASE:        [ 407,  'Erase',            'ERASE',    KEYCODES.DELETE ],

    // View ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    VIEW:         [ 500,  'View',             'VIEW',     KEYCODES.VIEW   ],
    SELECT:       [ 501,  'Select',           'SELECT'                ],
    SELECTALL:    [ 502,  'Select All',       'SELECTALL'             ],
    SELECT_WINDOW:[ 503,  'Window',           'WINDOW'                ],
    ZOOMIN:       [ 504,  'Zoomin',           'ZOOMIN',   KEYCODES.ZOOMIN ],
    ZOOMOUT:      [ 505,  'Zoomout',          'ZOOMOUT',  KEYCODES.ZOOMOUT],
    PAN:          [ 506,  'Pan',              'PAN',      KEYCODES.PAN    ],

    // Modify ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    MODIFY:       [ 600,  'Modify',           'MODIFY',       KEYCODES.MODIFY       ],
    TRANSLATE:    [ 601,  'Translate',        'TRANSLATE',    KEYCODES.TRANSLATE    ],
    TRANS_UP:     [ 601,  'Translate',        'TRANSLATE',    KEYCODES.TRANS_UP     ],
    TRANS_DOWN:   [ 601,  'Translate',        'TRANSLATE',    KEYCODES.TRANS_DOWN   ],
    TRANS_LEFT:   [ 601,  'Translate',        'TRANSLATE',    KEYCODES.TRANS_LEFT   ],
    TRANS_RIGHT:  [ 601,  'Translate',        'TRANSLATE',    KEYCODES.TRANS_RIGHT  ],
    TRANS_VECTOR: [ 602,  'Transvector',      'TRANSVECTOR',  KEYCODES.TRANS_VECTOR ],    // TranslateByVector

    REFLECT:      [ 603,  'Reflect',          'REFLECT'               ],
    REFLECTTLINE: [ 604,  'ReflectLine',      'REFLECTLINE'           ],    // ReflectAboutLIne
    REFLECTPOINT: [ 605,  'ReflectPoint',     'REFLECTPOINT'          ],    // ReflectAboutPoint
    REFLECTCIRCLE:[ 606,  'ReflectCircle',    'REFLECTCIRCLE'         ],    // ReflectAboutCircle


    ROTATE:       [ 607,  'Rotate',           'ROTATE'                ],
    ROTATEPOINT:  [ 608,  'RotatePoint',      'ROTATEPOINT'           ],    // RotateAroundPoint

    SCALE:        [ 609,  'Scale',            'SCALE'                 ],
    SHEAR:        [ 610,  'Shear',            'SHEAR'                 ],

    // DILATEFROMPOINT:            [ 1,  'Dilatefrompoint',    'DILATEFROMPOINT' ]

    // Measure ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    MEASURE:      [ 700,  'Measure',          'MEASURE'               ],
    DISTANCE:     [ 701,  'Distance',         'DISTANCE'              ],
    PERIMETER:    [ 702,  'Perimeter',        'PERIMETER'             ],
    AREA:         [ 703,  'Area',             'AREA'                  ],
    VOLUME:       [ 704,  'Volume',           'VOLUME'                ],
    RADIUS:       [ 705,  'Radius',           'RADIUS'                ],
    DIAMETER:     [ 706,  'Diamter',          'DIAMETER'              ],
    SLOPE:        [ 707,  'Slope',            'SLOPE'                 ],

    // Layers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //LAYER:        [ 800,  'Layer',            'LAYER'                 ],
    FORWARD:      [ 801,  'Forward',          'FORWARD'               ],
    BACK:         [ 802,  'Back',             'BACK'                  ],



    //  SHAPES ========================================================

    // Point (P) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    POINT:            [1000,  'Point',                'POINT'                 ],
    POINT_DEFAULT:    [1001,  'Point_Default',        'POINT_DEFAULT'         ],
    POINT_OBJECT:     [1002,  'Point_Object',         'POINT_OBJECT'          ],
    POINT_BOUND:      [1003,  'Point_Bound',          'POINT_BOUND'           ],
    POINT_INTERSECT:  [1004,  'Point_Intersect',      'POINT_INTERSECT'       ],
    POINT_MIDPOINT:   [1005,  'Point_Midpoint',       'POINT_MIDPOINT'        ],    // Midpoint/Center
    POINT_ATDETACH:   [1006,  'Point_AttachDetach',   'POINT_ATTACHDETACH'    ],    // AttachDetachPoint

    // Line (L) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    LINE:                       [1100,  'Line',                       'LINE'                        ],
    LINE_2POINT:                [1101,  'Line_2Point',                'LINE_2POINT'                 ],    // through 2 vertices
    LINE_SEGMENT2POINT:         [1102,  'Line_Segment2Point',         'LINE_SEGMENT2POINT'          ],    // between 2 vertices
    LINE_SEGMENTLENGTH:         [1103,  'Line_SegmentLength',         'LINE_SEGMENTLENGTH'          ],    // from point given length
    LINE_PERPENDICULAR:         [1104,  'Line_Perpendicular',         'LINE_PERPENDICULAR'          ],    // perpendicular
    LINE_PERPENDICULARBISECTOR: [1105,  'Line_PerpendicularBisector', 'LINE_PERPENDICULARBISECTOR' ],    //  perpendicular bisector
    LINE_ANGLEBISECTOR:         [1106,  'Line_AngleBisector',         'LINE_ANGLEBISECTOR'          ],    // angle bisector
    LINE_PARALLEL:              [1107,  'Line_Parallel',              'LINE_PARALLEL'               ],    // parallel
    LINE_TANGENT:               [1108,  'Line_Tangent',               'LINE_TANGENT'                ],    // Tangent
    LINE_DIAMETER:              [1109,  'Line_Diameter',              'LINE_DIAMETER'               ],    // Diameter
    LINE_RADIUS:                [1110,  'Line_Radius',                'LINE_RADIUS'                 ],    // Radius

    RAY_2POINT:       [1211,  'Ray_2Point',       'RAY_2POINT'                ],    // Ray between 2 vertices
    VECTOR_2POINT:    [1212,  'Vector_2Point',    'VECTOR_2POINT'             ],    // Vector between 2 vertices
    VECTOR_FROMPOINT: [1213,  'Vector_FromPoint', 'VECTOR_FROMPOINT'          ],    // Vector from point

    // Triangle (T)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    TRIANGLE:             [1300,  'Triangle',             'TRIANGLE'          ],
    TRIANGLE_EQUILATERAL: [1301,  'Triangle_Equilateral', 'TRIANGLE_EQUILATERAL'],
    TRIANGLE_ISOSCELES:   [1302,  'Triangle_Isosceles',   'TRIANGLE_ISOSCELES'],
    TRIANGLE_SCALENE:     [1303,  'Triangle_Scalene',     'TRIANGLE_SCALENE'  ],

    // Circle (C)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CIRCLE:               [1400,  'Circle',               'CIRCLE'            ],
    CIRCLE_CENTERPOINT:   [1401,  'Circle_CenterPoint',   'CIRCLE_CENTERPOINT'],    // center point
    CIRCLE_CENTERRADIUS:  [1402,  'Circle_CenterRadius',  'CIRCLE_CENTERRADIUS'],    // center radius
    CIRCLE_3POINT:        [1403,  'Circle_3Point',        'CIRCLE_3POINT'     ],    //  3 vertices

    // Quadrilateral (Q)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    QUAD:               [1500,  'Quadrilateral',    'QUADRILATERAL'           ],
    QUAD_RECTANGLE:     [1501,  'Rectangle',        'RECTANGLE'               ],
    QUAD_SQUARE:        [1502,  'Square',           'SQUARE'                  ],
    QUAD_RHOMBUS:       [1503,  'Rhombus',          'RHOMBUS'                 ],
    QUAD_PARALLELOGRAM: [1504,  'Parallelogram',    'PARALLELOGRAM'           ],    // Q_PARALLELOGRAM
    QUAD_TRAPEZOID:     [1505,  'Trapezoid',        'TRAPEZOID'               ],
    QUAD_KITE:          [1506,  'Kite',             'KITE'                    ],

    // Arc (A)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ARC:                      [1600,  'Arc',                      'ARC'                       ],
    ARC_2VERTICES:            [1601,  'Arc2vertices',             'ARC_2VERTICES'             ],    // SemiCircleThrough2vertices
    ARC_CIRCULAR:             [1602,  'Arc_Circular',             'ARC_CIRCULAR'              ],    // CircularArc
    ARC_CIRCUMCIRCULAR:       [1603,  'Arc_CircumCircular',       'ARC_CIRCUMCIRCULAR'        ],    // CircumcircularArc
    ARC_CIRCULARSECTOR:       [1604,  'Arc_CircularSector',       'ARC_CIRCULARSECTOR'        ],    // CircularSector
    ARC_CIRCUMCIRCULARSECTOR: [1605,  'Arc_CircumCircularSector', 'ARC_CIRCUMCIRCULARSECTOR'  ],   // CircumCircularSector

    COMPASS:  [1606,  'Compass',          'COMPASS'                           ],    // ??

    // Polygon ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    POLYGON:          [1700,  'Polygon',          'POLYGON'                   ],
    POLYGON_REGULAR:  [1701,  'PolygonR',         'POLYGONR'                  ],    // regular
    POLYGON_RIGID:    [1702,  'PolygonRigid',     'POLYGONRIGID'              ],    // Rigid
    POLYGON_VECTOR:   [1703,  'PolygonV',         'POLYGONV'                  ],    // Vector

    // Conics (S) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CONIC:            [1800,  'Conic',            'CONIC'                     ],
    CONIC_ELLIPSE:    [1800,  'Ellipse',          'ELLIPSE'                   ],
    CONIC_HYPERBOLA:  [1801,  'Hyperbola',        'HYPERBOLA'                 ],
    CONIC_PARABOLA:   [1802,  'Parabola',         'PARABOLA'                  ],
    CONIC_5VERTICES:  [1803,  'Conic_5Vertices', 'CONIC5VERTICES'             ],

    // Angle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    ANGLE:        [1900,  'Angle',            'ANGLE'                 ],
    ANGLE_SIZE:   [1901,  'Angle Size',       'ANGLESize'             ],

    // Annotation ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    TEXT:         [2000,  'Text',             'TEXT'                  ],

    // Images ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    IMAGE:        [2101,  'Image',            'IMAGE'                 ],
    SKETCH:       [2102,  'SKETCH',           'SKETCH'                ],

    // Footer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ORTHO:
    // STG:
    // GRIDLINES:
    // COORDINATES:
    // DISPLAY:
//~
    // CommandLine ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // COMMANDLINE:
    // HISTORY:
    // DISPLAY:

    // PEN:                        [ 1,  'Pen',    'PEN' ]

    // RELATION:                   [ 1,  'Relation',   'RELATION'  ]
    // PROBABILITYCALCULATOR:      [ 1,  'Probabilitycalculator',    'PROBABILITYCALCULATOR' ]
    // SLIDER:                     [ 1,  'Slider',   'SLIDER'  ]
    // BUTTON:                     [ 1,  'Button',   'BUTTON'  ]
    // INPUTBOX:                   [ 1,  'Inputbox',   'INPUTBOX'  ]

    // CREATELIST:                 [ 1,  'Createlist',   'CREATELIST'  ]
    // COMPLEXNUMBER:              [ 1,  'Complexnumber',    'COMPLEXNUMBER' ]
    // BESTFITLINE:                [ 1,  'Bestfitline',    'BESTFITLINE' ]
    // LOCUS:                      [ 1,  'Locus',    'LOCUS' ]
    // POLYLINE:                   [ 1,  'Polyline',   'POLYLINE'  ]

  };

  var app={

    width:          document.getElementById("canvas-container").offsetWidth,
    height:         document.getElementById("canvas-container").offsetHeight,

    debug:          true,
    frameRate:      0,

    focus:          0,

    mouseX:         1000,
    mouseY:         20,

    gridX:          0,
    gridY:          0,

    worldX:         0,
    worldY:         0,

    // mousePressed:   0,

    left:           false,
    center:         false,
    right:          false,

    keys:           [],
    drawings:       [],

    dwg:            undefined,

    // Properties
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

    gridprops:      true,

    border:         true,
    
    gridColor:      hexToRGBA(document.getElementById("grid-color").value),
    gridAlpha:      hexToRGBA(document.getElementById("grid-alpha").value),
    
    origin:         true,
    originColor:    hexToRGBA(document.getElementById("origin-color").value),

    axisX:          true,
    axisXColor:     hexToRGBA(document.getElementById("axisx-color").value),
    
    axisY:          true,
    axisYColor:     hexToRGBA(document.getElementById("axisy-color").value),
    
    linesX:         true,
    linesXColor:    hexToRGBA(document.getElementById("linesx-color").value),
    
    linesY:         true,
    linesYColor:    hexToRGBA(document.getElementById("linesy-color").value),
    
    arrowsX:        true,
    arrowsXColor:    hexToRGBA(document.getElementById("arrowsx-color").value),
    
    arrowsY:        true,
    arrowsYColor:    hexToRGBA(document.getElementById("arrowsy-color").value),
    
    ticksX:         true,
    ticksXColor:    hexToRGBA(document.getElementById("ticksx-color").value),
    
    ticksY:         true,
    ticksYColor:    hexToRGBA(document.getElementById("ticksy-color").value),
    
    labelsX:        true,
    labeslXColor:    hexToRGBA(document.getElementById("labelsx-color").value),
    
    labelsY:        true,
    labelsYColor:    hexToRGBA(document.getElementById("origin-color").value),
    
    quadrants:      true,
    quadrantsColor: hexToRGBA(document.getElementById("quadrants-color").value),

    crosshair:      true,
    crosshairColor: hexToRGBA(document.getElementById("crosshair-color").value),
    crosshairSize:  10,

    coordinates:    false,
    ortho:          false,
    STG:            false,  // snap to grid
    fs:             false,  // full screen

    current:        1102,

    stack:          [],

    ctrls:          [],

    factor:         0

  };


  // Methods ==========================================================
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

  // Shapes ===========================================================
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

    // for(var p=0; p<=this.length; p++){ this.hit[p]=0; }

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

  // Point ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Point=function(i,p,x,y){

    Shape.call(this, i, p);

    this.xG=x;                // world X
    this.yG=y;                // world Y
    this.xW=x*app.factor;     // grid X
    this.yW=y*app.factor;     // grid Y
    this.w=app.pSize;
    
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

  // Line ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

          // fill(p.fill);
          // noStroke();
          // strokeWeight(0);

          // ellipse(p.midX, p.midY, sz, sz);

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

      // if(dist(app.mouseX, app.mouseY,
              // this.vertices[n].x, this.vertices[n].y)<this.w){
//~
        // app.mouseX=this.vertices[n].x;
        // app.mouseY=this.vertices[n].y;
//~
      // }

      if(this.hitP[n] && app.left){
        this.vertices[n].x=app.mouseX;
        this.vertices[n].y=app.mouseY;
      }

    }

    // this.recalc();

  };

  // Triangle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Triangle=function(p){
    Shape.call(this,p);
  };
  Triangle.prototype=Object.create(Shape.prototype);
  Triangle.prototype.draw=function(){};


  // Circle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Circle=function(p){

    Shape.call(this,p);

    // this.radius=dist(this.vertices[0].x, this.vertices[0].y, this.vertices[1].x, this.vertices[1].y);
    // this.diameter=2*this.radius;
    // this.area=PI*pow(this.radius,2);
    // this.circumference=PI*this.diameter;
//~
    // this.recalc=function(){
//~
      // this.radius=dist(this.vertices[0].x, this.vertices[0].y, this.vertices[1].x, this.vertices[1].y);
      // this.diameter=2*this.radius;
      // this.area=PI*pow(this.radius,2);
      // this.circumference=PI*this.diameter;

    // };

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

  // Ellipse ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Ellipse=function(p){
    Shape.call(this,p);
  };
  Ellipse.prototype=Object.create(Shape.prototype);
  Ellipse.prototype.draw=function(){};


  // Arc ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Arc=function(p){
    Shape.call(this,p);
  };
  Arc.prototype=Object.create(Shape.prototype);
  Arc.prototype.draw=function(){};

  // Ellipse ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

      // ellipse(p.midX, p.midY, sz, sz);

    };

    pushStyle();

      // rectMode(CENTER);

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


  // Polygon ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Polygon=function(p){
    Shape.call(this,p);
  };
  Polygon.prototype=Object.create(Shape.prototype);
  Polygon.prototype.draw=function(){};


  // Conic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Conic=function(p){
    Shape.call(this,p);
  };
  Conic.prototype=Object.create(Shape.prototype);
  Conic.prototype.draw=function(){};


  // Angle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var Angle=function(p){
    Shape.call(this,p);
  };
  Angle.prototype=Object.create(Shape.prototype);
  Angle.prototype.draw=function(){};


  // Annotation ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

      // case COMMANDS.COORDINATES[0]: app.coordinates=!app.coordinates; break;
      case COMMANDS.ORTHO[0]:       app.ortho=!app.ortho;         break;
      case COMMANDS.STG[0]:         app.stg=!app.stg;             break;  // Snap-to-grid
      case COMMANDS.FS[0]:          app.fs=!app.fs;               break;  // Full Screen

      default:      break;

    }

  };
  var ShapeCommands=function(c,p){

    // println(c+","+p);

    // app.current=p;

    switch(c){

      case COMMANDS.P_DEFAULT[0]:                                 break;
      case COMMANDS.LINE[0]:                                      break;

      // case COMMANDS.POINT[0]:       break;
      // case COMMANDS.P_OBJECT[0]:    break;
      case COMMANDS.P_INTERSECT[0]:     break;
      case COMMANDS.P_MIDPOINT[0]:      break;

      default:      break;

    }

    app.current=c;

  };


  // Commands =========================================================
  var commands=function(c,p){

    // println(c+':'+p);

    switch(true){

      case c===COMMANDS.DEBUG[0]:         app.debug=!app.debug;
                                          break;

      // Grid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
  var propL=function(fill,fillH,stroke,strokeH,weight,weightH){

    this.fill=fill;         // fill color
    this.fillH=fillH;       // fill color highlight

    this.stroke=stroke;     // stroke color
    this.strokeH=strokeH;   // stroke color highlight

    this.weight=weight;     // strokeWeight
    this.weightH=weightH;   // strokeWeight highlight

  };
  var propA=function(fill, fillH, alignX, alignY, size, sizeH){

    this.fill=fill;         // text color
    this.fillH=fillH;       // text color highlight
    this.alignX=alignX;     // horizontal alignment
    this.alignY=alignY;     // vertical alignment
    this.size=size;         // text size
    this.sizeH=sizeH;       // text size highlight

  };


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

  // Telemetry ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

  // Preset ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var preset=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);
  };
  preset.prototype=Object.create(control.prototype);
  preset.prototype.draw=function(){

    var p=this;
    var d=0;

    pushMatrix();

      // translate(p.x, p.y);

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

          // if(p.v){ fill(getProp(p.g)); }

          if(p.x+p.parent.cursor>=20 &&
             p.x+p.parent.cursor<p.parent.w-20){

            rect(p.x+p.parent.cursor+2, d+2, p.w-4, p.h-4, p.r);

            fill(p.tfill);

            textAlign(p.alignX,p.alignY);
            textSize(20);

            if(p.hit){
              // fill(p.v);
              // textSize(p.sizeH);
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

  // Container ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

  // Container Scroll ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var containerS=function(c,l,a,ctrls){
    control.call(this,c,l,a,ctrls);

    this.hitLeft=   false;  // left button
    this.hitRight=  false;  // right button
    this.cursor=    0;      // position of the first item
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

          // border
          rect(0, 0, p.w, p.h, p.r);

          noStroke();

          // Scroll left
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

          // Scroll right
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

  // Container ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

          // text(p.g, p.w/2, p.h/2);

        popStyle();

        // p.ctrls[0].draw();

        if(getProp(p.c)){
          // for(var c=1; c<p.ctrls.length; c++){ p.ctrls[c].draw(); }
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

        // if(app.mouseX<x+this.x+20){ this.hitLeft=true;  }
        // else                      { this.hitLeft=false; }
//~
        // if(app.mouseX>x+this.x+this.w-20){ this.hitRight=true; }
        // else                             { this.hitRight=false; }

        for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x, y+this.y); }

      }
      else{
        this.hit=false;
        for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x, y+this.y); }
      }

  };

  // Grid ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var grid=function(c,l,a,ctrls){

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
  grid.prototype=Object.create(control.prototype);

  grid.prototype.draw=function(){

    // println(document.getElementById("fillalpha").value);

    size(document.getElementById("canvas-container").clientWidth,
        document.getElementById("canvas-container").clientHeight);
         
    this.stg=app.stg;

    var p=this;
    var d=0;
    var incr=1/app.factor;

    var border=function(){

      pushStyle();

        fill( hexToRGBA(document.getElementById("grid-color").value,
                        document.getElementById("grid-alpha").value/100*255));

        stroke(p.stroke);
        strokeWeight(p.weight);

        if(p.hit){
          // fill(p.fillH);
          stroke(p.strokeH);
          strokeWeight(p.weightH);
        }

        stroke(p.stroke);
        strokeWeight(0);
        noStroke();
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

          // fill(getColor(CLRS.Gray6,40));

          fill(app.originColor);

          ellipse(p.originX, -p.originY, 4, 4);

        }

      }

    };
    var axis=function(){

      noFill();
      noStroke();
      strokeWeight(1.75);

      if(app.axisX &&
         p.h/2>p.y &&
         p.originY<p.h/2 &&
         p.originY>-p.h/2){
           
        stroke(app.axisXColor);
           
        line(-p.w/2+5,-p.originY, p.w/2-5,-p.originY);
      
      }

      if(app.axisY &&
         p.w/2>p.x &&
         p.originX< p.w/2 &&
         p.originX>-p.w/2){

        stroke(app.axisYColor);

        line(p.originX, -p.h/2+5, p.originX,  p.h/2-5);

      }

    };
    var lines=function(){

      noFill();

      var factor=app.factor;
      var count=1;

      if(app.linesX){

        stroke(app.linesXColor);
        
        if(p.originX<p.w/2 &&
           p.originX>-p.w/2){

          strokeWeight(0.5);
          line(p.originX, -p.h/2,  p.originX, p.h/2);

        }

        // Left
        for(var n=p.originX-factor; n>-p.w/2; n-=factor){

          if(n< p.w/2 &&
             n>-p.w/2){

            if(count%5===0){ strokeWeight(0.5); }
            else           { strokeWeight(0.25); }

            line(n, -p.h/2,  n, p.h/2);

            count++;

          }

        }

        // Right
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

        stroke(app.linesYColor);

        if(-p.originY< p.h/2 &&
           -p.originY>-p.h/2){

          strokeWeight(0.5);
          line(-p.w/2,  -p.originY, p.w/2, -p.originY);

        }

        // Bottom
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

        // Top
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
      
      if(app.arrowsX){

        fill(app.arrowsXColor);

        var y=-p.originY;

        if(p.originX>-p.w/2 &&
           p.originY< p.h/2 &&
           p.originY>-p.h/2){
          triangle(-p.w/2, y, -p.w/2+7, y+3, -p.w/2+7, y-3);   // left
        }
        if(p.originX<p.w/2 &&
           p.originY< p.h/2 &&
           p.originY>-p.h/2){
          triangle( p.w/2, y,  p.w/2-7, y+3,  p.w/2-7, y-3);   // right
        }

      }
      if(app.arrowsY){

        fill(app.arrowsYColor);

        var x=p.originX;

        if(p.originY>-p.h/2 &&
           p.originX< p.w/2 &&
           p.originX>-p.w/2){
          triangle( x,  p.h/2, x+3,  p.h/2-7, x-3,  p.h/2-7); // top
        }
        if(p.originY< p.h/2 &&
           p.originX< p.w/2 &&
           p.originX>-p.w/2){
          triangle( x, -p.h/2, x+3, -p.h/2+7, x-3, -p.h/2+7); // bottom
        }

      }

    };
    var ticks=function(){

      noFill();
      strokeWeight(0.25);

      var factor=app.factor;
      var count=1;

      if(app.ticksX){

        stroke(app.ticksXColor);

        // Left
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

        // Right
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

        stroke(app.ticksYColor);

        // Top
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

        // Bottom
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
          
          strokeWeight(0.25);

          textSize(9);

          var factor=app.factor;
          var count=1;

          textAlign(RIGHT, CENTER);

          if(app.labelsY){

            fill(app.labelsYColor);

            // Top
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

            // Bottom
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

          if(app.labelsX){

            fill(app.labelsXColor);

            // Right
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

            // Left
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
          fill(app.quadrantsColor);
          textFont(createFont('fantasy'));

          // Quadrant I
          textAlign(CENTER,CENTER);

          text("I", p.originX+offset, p.originY-offset);

          // Quadrant II
          textAlign(CENTER,CENTER);

          text("II", p.originX-offset, p.originY-offset);

          // Quadrant III
          textAlign(CENTER,CENTER);

          text("III",p.originX-offset, p.originY+offset);

          // Quadrant IV
          textAlign(CENTER,CENTER);

          text("IV", p.originX+offset, p.originY+offset);

        popMatrix();

      }

    };

    var crosshair=function(){

      if(app.focus===p.i){

        var sz=app.crosshairSize/100*p.w;

        pushStyle();

          noCursor();

          pushMatrix();

            // resetMatrix();
            translate(0.5, 0.5);

              rectMode(CENTER);

              stroke(app.crosshairColor);
              strokeWeight(0.5);

              if(sz!==0){

                // horizontal
                line(app.mouseX-sz, app.mouseY, app.mouseX-4,  app.mouseY);
                line(app.mouseX+4,  app.mouseY, app.mouseX+sz, app.mouseY);

                // vertical
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

        case COMMANDS.POINT_DEFAULT[0]:

          // Point is saved on initial click
          break;

        case COMMANDS.LINE_SEGMENT2POINT[0]:

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

        case COMMANDS.CIRCLE_CENTERPOINT[0]:

          // if(p.vertices.length===1){
//~
            // noFill();
            // stroke(app.stroke);
            // strokeWeight(app.lineweight);
//~
            // line(app.mouseX,  app.mouseY, app.vertices[0].x, app.vertices[0].y);
//~
            // fill(app.fill);
            // noStroke();
            // strokeWeight(0);
//~
            // ellipse(p.vertices[0].x, p.vertices[0].y, app.pSize, app.pSize);
            // ellipse(app.mouseX,      app.mouseY,      app.pSize, app.pSize);
//~
            // noFill();
            // stroke(app.stroke);
            // strokeWeight(app.lineweight);
//~
            // var r=2*dist(p.vertices[0].x, p.vertices[0].y, app.mouseX, app.mouseY);
//~
            // ellipse(p.vertices[0].x, p.vertices[0].y, r, r);
//~
          // }

          break;

        case COMMANDS.QUAD_RECTANGLE[0]:

          // if(p.vertices.length===1){
//~
            // noFill();
            // stroke(app.stroke);
            // strokeWeight(app.lineweight);
//~
            // fill(app.fill);
            // noStroke();
            // strokeWeight(0);
//~
            // ellipse(p.vertices[0].x, p.vertices[0].y, app.pSize, app.pSize);
            // ellipse(app.mouseX,    app.mouseY,    app.pSize, app.pSize);
//~
            // noFill();
            // stroke(app.stroke);
            // strokeWeight(app.lineweight);
//~
            // var r=dist(p.vertices[0].x, p.vertices[0].y, app.mouseX, app.mouseY);
//~
            // rect(p.vertices[0].x, p.vertices[0].y, r, r);
//~
          // }

          break;

        default:                  break;

      }

    };

    this.w=document.getElementById("canvas-container").clientWidth;
    this.h=document.getElementById("canvas-container").clientHeight;

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
      // ARROW, CROSS, HAND, MOVE, TEXT, WAIT
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

  };
  grid.prototype.clicked=function(){

    if(app.focus===this.i){

      if(this.hit){

        pushMatrix();

          switch(app.current){

            case COMMANDS.SELECT[0]:

              for(var s in this.shapes){ this.shapes[s].clicked(0,0); }

              break;

            case COMMANDS.POINT_DEFAULT[0]: // Point:  Default

              this.shapes.push(
                new Point(getGUID(), this, app.gridX, app.gridY));
                app.stack.push(app.current);
                // println(app.stack);

              break;

            case COMMANDS.LINE_SEGMENT2POINT[0]:  // Line:  2 point

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

            case COMMANDS.CIRCLE_CENTERPOINT[0]:  // Circle:  Center-Point

              break;

            case COMMANDS.QUAD_RECTANGLE[0]:  // Quad:  Rectangle


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
      
      // document.getElementById("coordinates").innerText=app.coordinates;
      
    }
    else{
      this.hit=false;
    }

    // for(var c in this.ctrls){ this.ctrls[c].moved(x,y); }

  };
  grid.prototype.dragged=function(x,y){

    if(this.hit && app.focus===this.i){

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
    
    app.command=c;
    
    // background(CLRS.ORANGE);

    // if(n<100){ n++; }

    // app.frameRate=frameCount;
    //~
    // frameRate(app.frameRate);

    for(var c in app.ctrls){ app.ctrls[c].draw(); }

    // text(modelX(app.mouseX,app.mouseY,0), 100, 400);

  };

  // translate(0.5,0.5);

  var draw=function(){ process(); };

  // Events ===========================================================


  // Mouse ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var mouseClicked=function(){
    switch(mouseButton){

      case LEFT:

        for(var c in app.ctrls){ app.ctrls[c].clicked(); }
        break;

      case RIGHT:

        for(var c in app.ctrls){ app.ctrls[c].clickedR() }
        break;

      case CENTER:

        // for(var c in app.ctrls){ app.ctrls[c].clicked() }
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
    // app.left=true;
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
  var mouseWheel=function(){
    println("scroll");
  }

  // Keys ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var keyPressed=function(){

    if(keyCode===32){
      app.current=COMMANDS.SELECT[0];
      reset();
      process();
    }

    switch(keyCode){

      case KEYCODES.CONTROL &&
           KEYCODES.Z:

           // commands(COMMANDS.UNDO[0]);
           break;

      case KEYCODES.STG: // F7

        commands(COMMANDS.STG[0]);
        break;

      case KEYCODES.ORTHO:      // F8

        commands(COMMANDS.ORTHO[0]);
        break;

      default:  break;

    }

    app.keys[keyCode]=true;

    // for(var c in app.ctrls){ app.ctrls[c].pressed(); }

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


  // Initialize =======================================================

  // Load Controls ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  var getTelemetry=function(parent){

    var ctrls=[];
    var top=30;
    var h=15;

    var cn=new container(
            new propC(getGUID(), parent, 905, 40, 200, parent.h-200, 3, ARROW, false, COMMANDS.UNDEF[0],COMMANDS.UNDEF[1]),
            new propL(getColor(color(16,16,16),50), color(16,16,16), CLRS.BLACK, CLRS.GRAY, 0.125, 0.25),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    // Labels ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

    // Values ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

  var getGrid=function(parent){

    var ctrls=[];

    var cn=new grid(
            new propC(getGUID(), parent, parent.x, parent.y, parent.w, parent.h, 0, ARROW, false, COMMANDS.UNDEF[0], 0),
            new propL(CLRS.GRID, getColor(CLRS.GRID,65), CLRS.WHITE, CLRS.YELLOW, 0, 0),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    cn.ctrls=ctrls;

    return cn;

  };


  var addControls=function(){

    var ctrls=[];

// document.getElementById("canvas-container").clientHeight

    var cn=new container(
            new propC(getGUID(), 0, 0, 0, app.width, app.height, 3, ARROW, false, COMMANDS.UNDEF[0], COMMANDS.UNDEF[0]),
            new propL(CLRS.TRANSPARENT, CLRS.TRANSPARENT, CLRS.TRANSPARENT, CLRS.TRANSPARENT, 0, 0),
            new propA(CLRS.GRAY, CLRS.WHITE, LEFT, CENTER, 10, 11));

    ctrls.push(getGrid(cn));          // Grid

    cn.ctrls=ctrls;

    app.ctrls.push(cn);

  };

  var printCommands=function(){

    // saveStrings('Rectangle', COMMANDS.DEBUG);

    // <?xml version='1.0'?>
    // <CATALOG>
//~
      // <COMMAND>
        // <NAME>Empire Burlesque</NAME>
        // <KEYCODE>Bob Dylan</KEYCODE>
        // <INDEX>USA</INDEX>
        // <ENGLISH>Columbia</ENGLISH>
        // <SPANISH>10.90</SPANISH>
      // </COMMAND>
//~
    // </CATALOG>

    println("<?xml version='1.0'?>");
    println("<COMMANDS>");
    
    for(var n=150; n<arrCOMMANDS.length; n++){
      println("  <COMMAND>");
      println("    <INDEX>"   + arrCOMMANDS[n][0] + "</INDEX>");
      println("    <KEYCODE>" + arrCOMMANDS[n][1] + "</KEYCODE>");
      println("    <ENGLISH>" + arrCOMMANDS[n][2] + "</ENGLISH>");
      println("    <SPANISH>" + arrCOMMANDS[n][3] + "</SPANISH>");
      println("  </COMMAND>");
    }

    println("</COMMANDS>");

  };

  var htmlInit=function(){

    app.lineweight=document.getElementById("line-weight").value;
    
    app.stroke=document.getElementById("line-color").value;
    app.strokeA=document.getElementById("line-alpha").value;
    
    app.fill=document.getElementById("fill-color").value;
    app.fillA=document.getElementById("fill-alpha").value;
  
    document.getElementById("origin").checked     =app.origin;
    
    document.getElementById("axisx").checked      =app.axisX;
    document.getElementById("axisy").checked      =app.axisY;
    
    document.getElementById("linesx").checked     =app.linesX;
    document.getElementById("linesy").checked     =app.linesY;
    
    document.getElementById("arrowsx").checked    =app.arrowsX;
    document.getElementById("arrowsy").checked    =app.arrowsY;
    
    document.getElementById("ticksx").checked     =app.ticksX;
    document.getElementById("ticksy").checked     =app.ticksY;
    
    document.getElementById("labelsx").checked    =app.labelsX;
    document.getElementById("labelsy").checked    =app.labelsY;
    
    document.getElementById("quadrants").checked  =app.quadrants;
    
    app.crosshairColor=document.getElementById("crosshair-color").value;
    app.crosshairSize=document.getElementById("crosshair-size").value;
    
    // document.getElementById("canvas").style.width=
    //   document.getElementById("middle").style.width-
    //   document.getElementById("menu-left").style.width-
    //   document.getElementById("menu-right").style.width-
    //   document.getElementById("menu-shapes").style.width;

    // println(document.getElementById("middle").style.width);
    
  }
  
  var initialize=function(){

    strokeJoin(ROUND);

    // loadCommands();

    size(app.width, app.height);

    if(app.debug) { app.frameRate=62; }
    else          { app.frameRate=32;  }

    frameRate(0);

    frameRate(app.frameRate);

    app.dwg=new drawing();

    addControls();

    process=main;
    
    htmlInit();
    
  };

  initialize();

  process();

  var fontList = PFont.list();
  // println(fontList);

  // printCommands();

  // document.getElementById("gridMenuDisplay").checked=false;
  // document.getElementById("gridPropertiesDisplay").checked=false;

  var clickMe=function(p){
    
    if(p===1){
      // println(1);
      document.getElementById('menu').style.border="1px solid red";
      // document.getElementById("origin").checked=true;
      app.origin=false;
    }
    else{
      // println(2);
      document.getElementById('menu').style.border="1px solid transparent";
      // document.getElementById("origin").checked=false;
      app.origin=true;
    }

    
    // println("click me");
    

  };



  
  
  document.getElementById("origin").onclick     = function() { app.origin=!app.origin;        };
  
  document.getElementById("axisx").onclick      = function() { app.axisX=!app.axisX;          };
  document.getElementById("axisy").onclick      = function() { app.axisY=!app.axisY;          };
  
  document.getElementById("linesx").onclick     = function() { app.linesX=!app.linesX;        };
  document.getElementById("linesy").onclick     = function() { app.linesY=!app.linesY;        };
  
  document.getElementById("arrowsx").onclick    = function() { app.arrowsX=!app.arrowsX;      };
  document.getElementById("arrowsy").onclick    = function() { app.arrowsY=!app.arrowsY;      };
  
  document.getElementById("ticksx").onclick     = function() { app.ticksX=!app.ticksX;        };
  document.getElementById("ticksy").onclick     = function() { app.ticksY=!app.ticksY;        };
  
  document.getElementById("labelsx").onclick    = function() { app.labelsX=!app.labelsX;      };
  document.getElementById("labelsy").onclick    = function() { app.labelsY=!app.labelsY;      };
  
  document.getElementById("quadrants").onclick  = function() { app.quadrants=!app.quadrants;  };


  


  
  document.getElementById("grid-color").onchange   = function() {
    app.gridColor=hexToRGBA(document.getElementById("grid-color").value);
  }
  document.getElementById("grid-alpha").onchange   = function() {
    app.gridAlpha=document.getElementById("grid-alpha").value;
  }
  
  document.getElementById("origin-color").onchange   = function() {
    app.originColor=hexToRGBA(document.getElementById("origin-color").value);
  }
  
  document.getElementById("origin-color").onchange   = function() {
    app.originColor=hexToRGBA(document.getElementById("origin-color").value);
  }
  
  
  document.getElementById("axisx-color").onchange   = function() {
    app.axisXColor=hexToRGBA(document.getElementById("axisx-color").value);
  }
  
  document.getElementById("axisy-color").onchange   = function() {
    app.axisYColor=hexToRGBA(document.getElementById("axisy-color").value);
  }
  
  
  document.getElementById("linesx-color").onchange   = function() {
    app.linesXColor=hexToRGBA(document.getElementById("linesx-color").value);
  }

  document.getElementById("linesy-color").onchange   = function() {
    app.linesYColor=hexToRGBA(document.getElementById("linesy-color").value);
  }
  
  
  document.getElementById("arrowsx-color").onchange   = function() {
    app.arrowsXColor=hexToRGBA(document.getElementById("arrowsx-color").value);
  }
  
  document.getElementById("arrowsy-color").onchange   = function() {
    app.arrowsYColor=hexToRGBA(document.getElementById("arrowsy-color").value);
  }
  
  
  document.getElementById("ticksx-color").onchange   = function() {
    app.ticksXColor=hexToRGBA(document.getElementById("ticksx-color").value);
  }

  document.getElementById("ticksy-color").onchange   = function() {
    app.ticksYColor=hexToRGBA(document.getElementById("ticksy-color").value);
  }
  
  
  document.getElementById("labelsy-color").onchange   = function() {
    app.labelsYColor=hexToRGBA(document.getElementById("labelsy-color").value);
  }
  
  document.getElementById("labelsx-color").onchange   = function() {
    app.labelsXColor=hexToRGBA(document.getElementById("labelsx-color").value);
  }
  
  document.getElementById("quadrants-color").onchange = function() {
    app.quadrantsColor=hexToRGBA(document.getElementById("quadrants-color").value);
  };

  document.getElementById("crosshair-color").onchange = function() {
    app.crosshairColor=hexToRGBA(document.getElementById("crosshair-color").value);
  };
  
  
  document.getElementById("crosshair-size").onchange = function() {
    app.crosshairSize=document.getElementById("crosshair-size").value;
  };
  
  
  document.getElementById('points').onclick = function() { clickMe(1); };
  document.getElementById('lines').onclick = function()   { clickMe(2); };

  document.getElementById("line-weight").onchange   = function() {

    app.lineweight=document.getElementById("line-weight").value;
    app.pSize=app.lineweight;

    // println(app.pSize);

    // println(app.lineweight);
  }
  
  document.getElementById("line-color").onchange   = function() {
    app.stroke=hexToRGBA(document.getElementById("line-color").value);
    // println(app.stroke);
  }
  
  document.getElementById("line-alpha").onchange   = function() {
    app.strokeA=document.getElementById("line-alpha").value;
    // println(app.strokeA);
  }
  
  document.getElementById("fill-color").onchange   = function() {
    app.fill=hexToRGBA(document.getElementById("fill-color").value);
    // println(app.fill);
  }
  
  document.getElementById("fill-alpha").onchange   = function() {
    app.fillA=document.getElementById("fill-alpha").value;
    // println(app.fillA);
  }


    // document.getElementById('img-lines').value="LA LA LA LA";
    // document.getElementById('img-lines').src="assets/images/test.png";
    
    // document.getElementById('btn-line0').title="yabba dabba doo";
    
    // println(document.getElementById('canvas-container').width);
    
    // app.current=COMMANDS.L_2P[0];
    
    // document.getElementById('current-command').innerText=app.current=COMMANDS.L_2P[1];
  
  document.getElementById('POINT_DEFAULT').onclick = function() {
    
    app.current=COMMANDS.POINT_DEFAULT[0];
    document.getElementById('current-command').innerText=COMMANDS.POINT_DEFAULT[1];
    
  }
  document.getElementById('POINT_OBJECT').onclick = function()  {
    
    app.current=COMMANDS.POINT_OBJECT[0];
    document.getElementById('current-command').innerText=COMMANDS.POINT_OBJECT[1];
    
  }
  document.getElementById('POINT_BOUND').onclick = function()   {
    
    app.current=COMMANDS.POINT_BOUND[0];
    document.getElementById('current-command').innerText=COMMANDS.POINT_BOUND[1];
    
  }

  document.getElementById('LINE_2POINT').onclick = function()               {
    
    app.current=COMMANDS.LINE_2POINT[0];
    document.getElementById('current-command').innerText=COMMANDS.LINE_2POINT[1];
    
  }
  document.getElementById('LINE_SEGMENT2POINT').onclick = function()        {
    
    app.current=COMMANDS.LINE_SEGMENT2POINT[0];
    document.getElementById('current-command').innerText=COMMANDS.LINE_SEGMENT2POINT[1];
    
  }
  document.getElementById('LINE_SEGMENTLENGTH').onclick = function()        {
    
    app.current=COMMANDS.LINE_SEGMENTLENGTH[0];
    document.getElementById('current-command').innerText=COMMANDS.LINE_SEGMENTLENGTH[1];
    
  }
  document.getElementById('LINE_PERPENDICULAR').onclick = function()        {
    
    app.current=COMMANDS.LINE_PERPENDICULAR[0];
    document.getElementById('current-command').innerText=COMMANDS.LINE_PERPENDICULAR[1];
    
  }
  document.getElementById('LINE_PERPENDICULARBISECTOR').onclick = function(){
    
    app.current=COMMANDS.LINE_PERPENDICULARBISECTOR[0];
    document.getElementById('current-command').innerText=COMMANDS.LINE_PERPENDICULARBISECTOR[1];
    
  }
  document.getElementById('LINE_ANGLEBISECTOR').onclick = function()        {
    
    app.current=COMMANDS.LINE_ANGLEBISECTOR[0];
    document.getElementById('current-command').innerText=COMMANDS.LINE_ANGLEBISECTOR[1];
    
  }
  document.getElementById('LINE_PARALLEL').onclick = function()             {
    
    app.current=COMMANDS.LINE_PARALLEL[0];
    document.getElementById('current-command').innerText=COMMANDS.LINE_PARALLEL[1];
    
  }
  document.getElementById('LINE_TANGENT').onclick = function()              {
    
    app.current=COMMANDS.LINE_TANGENT[0];
    document.getElementById('current-command').innerText=COMMANDS.LINE_TANGENT[1];
    
  }
  document.getElementById('LINE_DIAMETER').onclick = function()             {
    
    app.current=COMMANDS.LINE_DIAMETER[0];
    document.getElementById('current-command').innerText=COMMANDS.LINE_DIAMETER[1];
    
  }
  document.getElementById('LINE_RADIUS').onclick = function()               {
    
    app.current=COMMANDS.LINE_RADIUS[0];
    document.getElementById('current-command').innerText=COMMANDS.LINE_RADIUS[1];
    
  }
  
  document.getElementById('RAY_2POINT').onclick = function()          {
    
    app.current=COMMANDS.RAY_2POINT[0];
    document.getElementById('current-command').innerText=COMMANDS.RAY_2POINT[1];
    
  }
  document.getElementById('VECTOR_2POINT').onclick = function()       {
    
    app.current=COMMANDS.VECTOR_2POINT[0];
    document.getElementById('current-command').innerText=COMMANDS.VECTOR_2POINT[1];
    
  }
  document.getElementById('VECTOR_FROMPOINT').onclick = function()    {
    
    app.current=COMMANDS.VECTOR_FROMPOINT[0];
    document.getElementById('current-command').innerText=COMMANDS.VECTOR_FROMPOINT[1];
    
  }
  
  document.getElementById('TRIANGLE_EQUILATERAL').onclick = function(){
    
    app.current=COMMANDS.TRIANGLE_EQUILATERAL[0];
    document.getElementById('current-command').innerText=COMMANDS.TRIANGLE_EQUILATERAL[1];
    
  }
  document.getElementById('TRIANGLE_ISOSCELES').onclick = function()  {
    
    app.current=COMMANDS.TRIANGLE_ISOSCELES[0];
    document.getElementById('current-command').innerText=COMMANDS.TRIANGLE_ISOSCELES[1];
    
  }
  document.getElementById('TRIANGLE_SCALENE').onclick = function()    {
    
    app.current=COMMANDS.TRIANGLE_SCALENE[0];
    document.getElementById('current-command').innerText=COMMANDS.TRIANGLE_SCALENE[1];
    
  }
  
  // document.getElementById('CIRCLE_CENTERPOINT').onclick = function()  {
    
  //   app.current=COMMANDS.CIRCLE_CENTERPOINT[0];
  //   document.getElementById('current-command').innerText=COMMANDS.CIRCLE_CENTERPOINT[1];
    
  // }
  // document.getElementById('CIRCLE_CENTERRADIUS').onclick = function() {
    
  //   app.current=COMMANDS.CIRCLE_CENTERRADIUS[0];
  //   document.getElementById('current-command').innerText=COMMANDS.CIRCLE_CENTERRADIUS[1];
    
  // }
  // document.getElementById('CIRCLE_3POINT').onclick = function()       {
    
  //   app.current=COMMANDS.CIRCLE_3POINT[0];
  //   document.getElementById('current-command').innerText=COMMANDS.CIRCLE_3POINT[1];
    
  // }
  
  // document.getElementById('QUAD_RECTANGLE').onclick = function()    {
    
  //   app.current=COMMANDS.QUAD_RECTANGLE[0];
  //   document.getElementById('current-command').innerText=COMMANDS.QUAD_RECTANGLE[1];
    
  // }
  // document.getElementById('QUAD_SQUARE').onclick = function()       {
    
  //   app.current=COMMANDS.QUAD_SQUARE[0];
  //   document.getElementById('current-command').innerText=COMMANDS.QUAD_SQUARE[1];
    
  // }
  // document.getElementById('QUAD_RHOMBUS').onclick = function()      {
    
  //   app.current=COMMANDS.QUAD_RHOMBUS[0];
  //   document.getElementById('current-command').innerText=COMMANDS.QUAD_RHOMBUS[1];
    
  // }
  // document.getElementById('QUAD_PARALLELOGRAM').onclick = function(){
    
  //   app.current=COMMANDS.QUAD_PARALLELOGRAM[0];
  //   document.getElementById('current-command').innerText=COMMANDS.QUAD_PARALLELOGRAM[1];
    
  // }
  // document.getElementById('QUAD_TRAPEZOID').onclick = function()    {
    
  //   app.current=COMMANDS.QUAD_TRAPEZOID[0];
  //   document.getElementById('current-command').innerText=COMMANDS.QUAD_TRAPEZOID[1];
    
  // }
  // document.getElementById('QUAD_KITE').onclick = function()         {
    
  //   app.current=COMMANDS.QUAD_KITE[0];
  //   document.getElementById('current-command').innerText=COMMANDS.QUAD_KITE[1];
    
  // }

  // document.getElementById('ARC_2VERTICES').onclick = function()             {
    
  //   app.current=COMMANDS.ARC_2VERTICES[0];
  //   document.getElementById('current-command').innerText=COMMANDS.ARC_2VERTICES[1];
    
  // }
  // document.getElementById('ARC_CIRCULAR').onclick = function()              {
    
  //   app.current=COMMANDS.ARC_CIRCULAR[0];
  //   document.getElementById('current-command').innerText=COMMANDS.ARC_CIRCULAR[1];
    
  // }
  // document.getElementById('ARC_CIRCUMCIRCULAR').onclick = function()        {
    
  //   app.current=COMMANDS.ARC_CIRCUMCIRCULAR[0];
  //   document.getElementById('current-command').innerText=COMMANDS.ARC_CIRCUMCIRCULAR[1];
    
  // }
  // document.getElementById('ARC_CIRCULARSECTOR').onclick = function()        {
    
  //   app.current=COMMANDS.ARC_CIRCULARSECTOR[0];
  //   document.getElementById('current-command').innerText=COMMANDS.ARC_CIRCULARSECTOR[1];
    
  // }
  // document.getElementById('ARC_CIRCUMCIRCULARSECTOR').onclick = function()  {
    
  //   app.current=COMMANDS.ARC_CIRCUMCIRCULARSECTOR[0];
  //   document.getElementById('current-command').innerText=COMMANDS.ARC_CIRCUMCIRCULARSECTOR[1];
    
  // }
  // document.getElementById('QUAD_KITE').onclick = function()                 {
    
  //   app.current=COMMANDS.QUAD_KITE[0];
  //   document.getElementById('current-command').innerText=COMMANDS.QUAD_KITE[1];
    
  // }

  // document.getElementById('POLYGON_REGULAR').onclick = function()   {
    
  //   app.current=COMMANDS.POLYGON_REGULAR[0];
  //   document.getElementById('current-command').innerText=COMMANDS.POLYGON_REGULAR[1];
    
  // }
  // document.getElementById('POLYGON_RIGID').onclick = function()     {
    
  //   app.current=COMMANDS.POLYGON_RIGID[0];
  //   document.getElementById('current-command').innerText=COMMANDS.POLYGON_RIGID[1];
    
  // }
  // document.getElementById('POLYGON_VECTOR').onclick = function()    {
    
  //   app.current=COMMANDS.POLYGON_VECTOR[0];
  //   document.getElementById('current-command').innerText=COMMANDS.POLYGON_VECTOR[1];
    
  // }
  
  // document.getElementById('CONIC_ELLIPSE').onclick = function()     {
    
  //   app.current=COMMANDS.CONIC_ELLIPSE[0];
  //   document.getElementById('current-command').innerText=COMMANDS.CONIC_ELLIPSE[1];
    
  // }
  // document.getElementById('CONIC_HYPERBOLA').onclick = function()   {
    
  //   app.current=COMMANDS.CONIC_HYPERBOLA[0];
  //   document.getElementById('current-command').innerText=COMMANDS.CONIC_HYPERBOLA[1];
    
  // }
  // document.getElementById('CONIC_PARABOLA').onclick = function()    {
    
  //   app.current=COMMANDS.CONIC_PARABOLA[0];
  //   document.getElementById('current-command').innerText=COMMANDS.CONIC_PARABOLA[1];
    
  // }
  // document.getElementById('CONIC_5VERTICES').onclick = function()   {
    
  //   app.current=COMMANDS.CONIC_5VERTICES[0];
  //   document.getElementById('current-command').innerText=COMMANDS.CONIC_5VERTICES[1];
    
  // }
    
  // this.scommand=function(c,p){
    
  //   println(c+":"+p);
    
  // }

  // var scommand=function(c,p){
    
  //   println(c+":"+p);
    
  // }



}};
