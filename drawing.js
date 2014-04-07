var proc = function(processingInstance){ with (processingInstance){

  //~ size(screen.width, screen.height-200);  //~ set size of canvas

  /**

    TO DO:
      - ...


  **/



  var CLRS={

    WHITE:   	color(255,255,255),     BLACK:   	color(0,0,0),
    RED:      color(170,29,29),       GREEN:    color(158,182,58),
    BLUE:     color(29,86,170),       YELLOW:   color(238,214,15),
    ORANGE:   color(238,136,15),      Gray:     color(128,128,128),

    BROWN:    color(155,145,135),

    control:  color(128,128,128),     controlF: color(242,242,242),

    TEXT:     color(255,255,255),

    Red:					color(255,0,0),
    RedOrange:		color(255,81,0),
    Orange:				color(255,127,0),
    YellowOrange:	color(255,190,0),
    Yellow:				color(255,255,0),
    YellowGreen:	color(192,255,0),
    Green:				color(0,255,0),
    BlueGreen:		color(0,127,127),
    Blue:					color(0,0,255),
    BlueViolet:		color(92,0,255),
    Violet:				color(127,0,255),
    RedViolet:		color(191,0,127),

    White:				color(255,255,255),
		Gray1:				color(255*10/11),
		Gray2:				color(255*9/11),
		Gray3:				color(255*8/11),
		Gray4:				color(255*7/11),
		Gray5:				color(255*6/11),
		Gray6:				color(255*5/11),
		Gray7:				color(255*4/11),
		Gray8:				color(255*3/11),
		Gray9:				color(255*2/11),
		Gray10:				color(255*1/11),
    Black:				color(0,0,0)

  };

	var PCOLORS={
		RED:					0,
		REDORANGE:		1,
		ORANGE:				2,
		YELLOWORANGE:	3,
		YELLOW:				4,
		YELLOWGREEN:	5,
		GREEN:				6,
		BLUEGREEN:		7,
		BLUE:					8,
		BLUEVIOLET:		9,
		VIOLET:				10,
		REDVIOLET:		11,
		WHITE:				12,
		GRAY0:				13,
		GRAY1:				14,
		GRAY2:				15,
		GRAY3:				16,
		GRAY4:				17,
		GRAY5:				18,
		GRAY6:				19,
		GRAY7:				20,
		GRAY8:				21,
		GRAY9:				22,
		BLACK:				23,
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
		
		SPACER:				[-1,  'Spacer',      		'SPACER'       		],

    //~ General ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CARTESIA:     [1,   'Cartesia',       'CARTESIA'        ],

    UNDEF:    		[0,   'undefined',      'UNDEFINED'       ],

    CONTAINER:    [1,   'Container',      'CONTAINER'       ],
    HEADER:       [2,   'Header',         'HEADER'          ],
    FOOTER:       [3,   'Footer',         'FOOTER'          ],
    TELEMETRY:    [4,   'Telemetry',      'TELEMETRY'       ],

    //~ Misc ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    SNAPTOGRID:   [5,   'SnapToGrid',     'SNAPTOGRID'      ],
    ORTHO:        [6,   'Ortho',          'ORTHO'           ],
    COORDINATES:  [7,   'Coordinates',    'COORDINATES'     ],
		COLORS:   		[8,   'Colors',     		'COLORS'      		],

		RED:    			[9,   'Red',      			'RED'       			],
		BLUE:    			[10,  'Blue',      		'BLUE'       				],
		GREEN:				[11,  'Green',      		'GREEN'       		],

    //~ File ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    NEW:          [12,  'New',            'NEW'             ],
    OPEN:         [13,  'Open',           'OPEN'            ],
    SAVE:         [14,	'Save',           'SAVE'            ],
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

    COLOR:        [42, 	'Color',          'COLOR'           ],
    COLORG:       [60, 	'ColorG',         'COLORG'          ],
    LAYER:        [43,  'Layer',          'LAYER'           ],
    LINETYPE:     [44,  'Line Type',      'LINE TYPE'       ],
    LINEWEIGHT:   [45,  'Line Weight',    'LINE WEIGHT'     ],

    TOOLTIP:      [46,	'ToolTip',        'TOOLTIP'         ],
    FORMULA:      [47,  'Formula',        'FORMULA'         ],

    DEBUG:        [48,  'Debug',          'DEBUG'           ],
    WIDTH:        [49,  'Width',          'Width'           ],
    HEIGHT:       [50,  'Height',         'HEIGHT'          ],
    FRAMERATEA:   [51,  'FrameRate(A)',   'FRAMERATE(A)'    ],
    FRAMERATE:    [52,  'FrameRate',      'FRAMERATE'       ],
    MOUSEX:       [53,  'MouseX',         'MOUSEX'          ],
    MOUSEY:       [54,  'MouseY',         'MOUSEY'          ],
    PRESSED:      [55,  'Pressed',        'PRESSED'         ],

    RECTANGLE:    [56,	'Rectangle',      'RECTANGLE'       ],
    CIRCLE:       [57,  'Circle',         'CIRCLE'          ],

  }

  var app={

    width:        screen.width-20,
    height:       screen.height-200,

    debug:        true,
    frameRate:    300,

    mouseX:       1000,
    mouseY:       20,

    pressed:      false,

    keys:         [],
    drawings:     [],

    dwg:          undefined,

    //~ properties
    red:					128,
    green:				127,
    blue:					126,
		
		caption:			'caption',
		name:					'name',
		formula:			'x^2+y^2=r^2',

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

	var getProp=function(p){

	//~ println(p);

		switch(p){

			case CMDS.CAPTION[0]:			return app.caption;
			case CMDS.NAME[0]:				return app.name;
			case CMDS.FORMULA[0]:			return app.formula;

			case CMDS.WIDTH[0]:				return app.width;
			case CMDS.HEIGHT[0]:			return app.height;
			case CMDS.FRAMERATE[0]:		return app.frameRate;
			case CMDS.FRAMERATEA[0]:	return __frameRate;
			case CMDS.MOUSEX[0]:			return app.mouseX;
			case CMDS.MOUSEY[0]:			return app.mouseY;
			case CMDS.PRESSED[0]:			return app.pressed;

			case CMDS.COLOR[0]:				return app.color;
			case CMDS.COLORG[0]:			return app.color;
	
			case CMDS.LAYER[0]:				return app.layer;
			case CMDS.LINETYPE[0]:		return app.linetype;
			case CMDS.LINEWEIGHT[0]:	return app.lineweight;
			
			case CMDS.DEBUG[0]:				return app.debug;
			
			case CMDS.RED[0]:					return app.red;
			case CMDS.GREEN[0]:				return app.green;
			case CMDS.BLUE[0]:				return app.blue;

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
			
			case CMDS.FRAMERATE[0]:	frameRate(p);
															app.frameRate=p;
															break;

			case CMDS.DEBUG[0]:			app.debug=!app.debug;
															if(app.debug){ frameRate(100); }
															else 				 { frameRate(30);	 }
															break;

			case CMDS.COLORG[0]: 		return app.color;

			case CMDS.COLOR[0]:  		app.color=p;
															app.red=red(app.color);
															app.green=green(app.color);
															app.blue=blue(app.color);
															break;
			
      case CMDS.RECTANGLE[0]:	println("Rectangle");  				break;

			case CMDS.RED[0]:				app.red=red(app.color);				break;
			case CMDS.GREEN[0]:			app.green=green(app.color);		break;
			case CMDS.BLUE[0]:			app.blue=blue(app.color);			break;

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
      commands(this.c,this.v);
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
  control.prototype.dragged=function(){
    for(var c in this.ctrls){ this.ctrls[c].dragged() }
  };  
  control.prototype.pressed=function(){
    for(var c in this.ctrls){ this.ctrls[c].pressed() }
  };
  control.prototype.released=function(){
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

            if(app.pressed){ d=1; }

            //~ fill(p.g);
            stroke(p.strokeH);
            strokeWeight(p.weightH);

						cursor(HAND);

          }

					//~ if(p.v){	fill(getProp(p.g));	}

          rect(d, d, p.w, p.h, p.r);

          //~ fill(p.tfill);

          //~ textAlign(p.alignX,p.alignY);
          //~ textSize(p.size);

          //~ if(p.hit){
            //~ fill(p.v);
            //~ textSize(p.sizeH);
          //~ }

          //~ text(p.g, d+5, d+p.h/2);

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
  
  //~ Property
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

            if(app.pressed){ d=1; }

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

					if(p.alignX===LEFT){
						//~ rect(d, d, p.w, p.h, p.r);
					}
					else if(p.alignX===CENTER){
						//~ rect(d-p.w/2, d, p.w, p.h, p.r);
					}

          fill(p.tfill);

          textAlign(p.alignX,p.alignY);
          textSize(p.size);

          if(p.hit){
            fill(p.tfillH);
            textSize(p.sizeH);
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

            if(app.pressed){ d=1; }

            fill(p.fillH);
            stroke(p.strokeH);
            strokeWeight(p.weightH);

          }

					if(p.alignX===LEFT){
						//~ rect(d, d, p.w, p.h, p.r);
					}
					else if(p.alignX===CENTER){
						//~ rect(d-p.w/2, d, p.w, p.h, p.r);
					}

          fill(p.tfill);

          textAlign(p.alignX,p.alignY);
          textSize(p.size);

          if(p.hit){
            fill(p.tfillH);
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

            //~ if(app.pressed){ d=1; }
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
            textSize(p.sizeH);
          }

          text(floor(60*p.v/p.w), d+100, d+p.h/2);

        popStyle();

        for(var c in p.ctrls){ p.ctrls[c].draw() }

    popMatrix();

  };
	sliderH.prototype.clicked=function(){
    if(this.hit){
			this.v=constrain(mouseX-this.x,10,this.w);
      commands(this.c,this.v);
      for(var c in this.ctrls){ this.ctrls[c].clicked() }
    }
  };
  sliderH.prototype.moved=function(x,y){

		if(mouseX>x+this.x && mouseX<x+this.x+this.w &&
			 mouseY>y+this.y && mouseY<y+this.y+this.h){
			this.hit=true;
			for(var c in this.ctrls){ this.ctrls[c].moved(x+this.x,y+this.y) }
		}
		else{
			this.hit=false;
		}

  };
  sliderH.prototype.dragged=function(){
		if(this.hit){
			this.v=constrain(mouseX-this.x,10,this.w);
			commands(this.c, 60*this.v/this.w);
			for(var c in this.ctrls){ this.ctrls[c].dragged() }
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

  var n=100;

  var process;

  var main=function(){

    //~ background(getColor(CLRS.BLACK,n));

    //~ if(n<100){ n++; }
		
		//~ app.frameRate=frameCount;
		//~ 
		//~ frameRate(app.frameRate);
		
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].draw() }

		//~ fill(CLRS.BLACK);
		//~ stroke(CLRS.YELLOW);
		//~ strokeWeight(0.25);
//~ 
    //~ var sz=ceil(128/6)-4;
    //~ var incr=sz+4;
		//~ var w=138;
		//~ var h=11*(sz+4);
		//~ var left=300;
		//~ var top=100;
//~ 
		//~ beginShape();
			//~ vertex(left, 	top);
			//~ vertex(left+w, top);
			//~ vertex(left+w, top+h);
			//~ vertex(left, 	top+h);
		//~ endShape(CLOSE);

		//~ rect(left,top,w,h);
//~ 
		//~ var row0=top+0*incr;
		//~ var row1=top+1*incr;
		//~ var row2=top+2*incr;
		//~ var row3=top+3*incr;
		//~ var row4=top+4*incr;
		//~ var row5=top+5*incr;
		//~ var row6=top+6*incr;
		//~ var row7=top+7*incr;
//~ 
		//~ var col0=left+0*incr;
		//~ var col1=left+1*incr;
		//~ var col2=left+2*incr;
		//~ var col3=left+3*incr;
		//~ var col4=left+4*incr;
		//~ var col5=left+5*incr;

		//~ var incr=256/11;

		//~ sliders (red,green,blue,alpha)
		//~ fill(CLRS.RED);
		//~ rect(col0,row4,128,sz);
//~ 
		//~ fill(CLRS.GREEN);
		//~ rect(col0,row5,128,sz);
//~ 
		//~ fill(CLRS.BLUE);
		//~ rect(col0,row6,128,sz);
//~ 
		//~ fill(CLRS.GRAY);
		//~ rect(col0,row7,128,sz);
//~ 
		//~ fill(CLRS.RED);
		//~ textSize(16);
		//~ textAlign(LEFT,TOP);
//~ 
		//~ fill(CLRS.RED);
		//~ text("Red", col0,row7+26);
		//~ fill(CLRS.GREEN);
		//~ text("Green", col0,row7+42);
		//~ fill(CLRS.BLUE);
		//~ text("Blue", col0,row7+58);
//~ 
		//~ fill(128,96,24);
		//~ rect(col0+70,row7+30,40,40);

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
  var mouseDragged=function(){
    app.pressed=true;
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].dragged() }
  };
  var mousePressed=function(){
    app.pressed=true;
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].pressed(0,0) }
  };
  var mouseReleased=function(){
    app.pressed=false;
    for(var c in app.dwg.ctrls){ app.dwg.ctrls[c].released(0,0) }
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

          style=new propL(color(8,22,44), getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.GRAY, 0.5, 0.25);
          break;

        case STYLES.BUTTON:

          style=new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.BLUE, CLRS.YELLOW, 0.125, 0.25);
          break;

        case STYLES.SPACER:

          style=new propL(getColor(CLRS.BLUE,50), CLRS.BLUE, CLRS.WHITE, CLRS.YELLOW, 0.125, 0.25);
          break;

        case STYLES.TEXT:

          style=new propA(CLRS.WHITE, CLRS.YELLOW, LEFT, CENTER, 10, 11);
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
                new propC(getGUID(), cn, 5, top+11*h, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.PRESSED[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));


		//~ Values ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+0*h, 10, 10, 0, false, CMDS.DEBUG[0], CMDS.DEBUG[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+2*h, 10, 10, 0, false, CMDS.WIDTH[0], CMDS.WIDTH[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+3*h, 10, 10, 0, false, CMDS.HEIGHT[0], CMDS.HEIGHT[1]),
                getStyle(STYLES.BUTTON),
                getStyle(STYLES.TEXT)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, 100, top+5*h, 10, 10, 0, false, CMDS.FRAMERATE[0], CMDS.FRAMERATE[1]),
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
                new propC(getGUID(), cn, 100, top+11*h, 10, 10, 0, false, CMDS.PRESSED[0], CMDS.PRESSED[1]),
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
            new propC(getGUID(),parent, 500, 100, 200, ch, 3, false, CMDS.UNDEF[0],0),
            getStyle(STYLES.CONTAINER),
            getStyle(STYLES.TEXT));	
		
		//~ Colors
    ctrls.push(new button(
                new propC(getGUID(),cn, l+0*h, top, h, h, 0, false, CMDS.COLOR[0] ,CLRS.Red),
                new propL(CLRS.Red, CLRS.Red, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+1*h+5, top, h, h, 0, false, CMDS.COLOR[0], CLRS.RedOrange),
                new propL(CLRS.RedOrange, CLRS.RedOrange, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+2*h+10, top, h, h, 0, false, CMDS.COLOR[0], CLRS.Orange),
                new propL(CLRS.Orange, CLRS.Orange, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+3*h+15, top, h, h, 0, false, CMDS.COLOR[0], CLRS.YellowOrange),
                new propL(CLRS.YellowOrange, CLRS.YellowOrange, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+4*h+20, top, h, h, 0, false, CMDS.COLOR[0], CLRS.Yellow),
                new propL(CLRS.Yellow, CLRS.Yellow, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+5*h+25, top, h, h, 0, false, CMDS.COLOR[0], CLRS.YellowGreen),
                new propL(CLRS.YellowGreen, CLRS.YellowGreen, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+0*h, top+1*h+5, h, h, 0, false, CMDS.COLOR[0], CLRS.Green),
                new propL(CLRS.Green, CLRS.Green, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+1*h+5, top+1*h+5, h, h, 0, false, CMDS.COLOR[0], CLRS.BlueGreen),
                new propL(CLRS.BlueGreen, CLRS.BlueGreen, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+2*h+10, top+1*h+5, h, h, 0, false, CMDS.COLOR[0], CLRS.Blue),
                new propL(CLRS.Blue, CLRS.Blue, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+3*h+15, top+1*h+5, h, h, 0, false, CMDS.COLOR[0], CLRS.BlueViolet),
                new propL(CLRS.BlueViolet, CLRS.BlueViolet, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));
                
    ctrls.push(new button(
                new propC(getGUID(),cn, l+4*h+20, top+1*h+5, h, h, 0, false, CMDS.COLOR[0], CLRS.Violet),
                new propL(CLRS.Violet, CLRS.Violet, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));
                
    ctrls.push(new button(
                new propC(getGUID(),cn, l+5*h+25, top+1*h+5, h, h, 0, false, CMDS.COLOR[0], CLRS.RedViolet),
                new propL(getColor(CLRS.RedViolet,90), CLRS.RedViolet, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));
		
		//~ Gray Scale
    ctrls.push(new button(
                new propC(getGUID(),cn, l+0*h, top+2*h+10, h, h, 0, false, CMDS.COLOR[0] ,CLRS.White),
                new propL(CLRS.White, CLRS.White, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+1*h+5, top+2*h+10, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray1),
                new propL(CLRS.Gray1, CLRS.Gray1, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+2*h+10, top+2*h+10, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray2),
                new propL(CLRS.Gray2, CLRS.Gray2, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+3*h+15, top+2*h+10, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray3),
                new propL(CLRS.Gray3, CLRS.Gray3, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+4*h+20, top+2*h+10, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray4),
                new propL(CLRS.Gray4, CLRS.Gray4, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+5*h+25, top+2*h+10, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray5),
                new propL(CLRS.Gray5, CLRS.Gray5, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+0*h, top+3*h+15, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray6),
                new propL(CLRS.Gray6, CLRS.Gray6, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+1*h+5, top+3*h+15, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray7),
                new propL(CLRS.Gray7, CLRS.Gray7, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+2*h+10, top+3*h+15, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray8),
                new propL(CLRS.Gray8, CLRS.Gray8, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));

    ctrls.push(new button(
                new propC(getGUID(),cn, l+3*h+15, top+3*h+15, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray9),
                new propL(CLRS.Gray9, CLRS.Gray9, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));
                
    ctrls.push(new button(
                new propC(getGUID(),cn, l+4*h+20, top+3*h+15, h, h, 0, false, CMDS.COLOR[0], CLRS.Gray10),
                new propL(CLRS.Gray10, CLRS.Gray10, CLRS.BLACK, CLRS.BLACK, 0.125, 0.25),
                getStyle(STYLES.TEXT)));
                
    ctrls.push(new button(
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
                new propA(CLRS.RED, CLRS.YELLOW, LEFT, CENTER, 16, 16)));

    ctrls.push(new label(
                new propC(getGUID(), cn, l, top+5*h+40, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.GREEN[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.GREEN, CLRS.YELLOW, LEFT, CENTER, 16, 16)));
                
    ctrls.push(new label(
                new propC(getGUID(), cn, l, top+5*h+60, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.BLUE[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.BLUE, CLRS.YELLOW, LEFT, CENTER, 16, 16)));
                
    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+60, top+5*h+20, 10, 10, 0, false, CMDS.RED[0], CMDS.RED[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.RED, CLRS.YELLOW, LEFT, CENTER, 16, 16)));

    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+60, top+5*h+40, 10, 10, 0, false, CMDS.GREEN[0], CMDS.GREEN[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.GREEN, CLRS.YELLOW, LEFT, CENTER, 16, 16)));
                
    ctrls.push(new labelP(
                new propC(getGUID(), cn, l+60, top+5*h+60, 10, 10, 0, false, CMDS.BLUE[0], CMDS.BLUE[1]),
                getStyle(STYLES.BUTTON),
                new propA(CLRS.BLUE, CLRS.YELLOW, LEFT, CENTER, 16, 16)));
                                
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
            new propC(getGUID(), 0, 5, 5, app.width-10, app.height-10,2, false, CMDS.UNDEF[0], 0),
            getStyle(STYLES.BACKGROUND),
            getStyle(STYLES.TEXT));

    ctrls.push(new sliderH(
            new propC(getGUID(), cn, 226, 300, 200, 10, 0, 10, CMDS.FRAMERATE[0], false),
            getStyle(STYLES.BUTTON),
            getStyle(STYLES.TEXT)));

    ctrls.push(new sliderH(
            new propC(getGUID(), cn, 226, 330, 200, 10, 5, 10, CMDS.UNDEF[0], false),
            getStyle(STYLES.BUTTON),
            getStyle(STYLES.TEXT)));
                        
    ctrls.push(new labelR(
            new propC(getGUID(), cn, cn.w/2, cn.h/2, 10, 10, 0, false, CMDS.UNDEF[0], CMDS.CARTESIA[1]),
            getStyle(STYLES.BUTTON),
            getStyle(STYLES.TEXTCENTER)));

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

    //~ println(loadStrings("Rectangle"));

  };

  //~ Initialize =========================================================
  var initialize=function(){

    loadCommands();

    size(app.width,app.height);

    if(app.debug) { app.frameRate=61; }
    else          { app.frameRate=31;  }

    frameRate(app.frameRate);

    app.dwg=new drawing();

    addControls();

    process=main;

  };

  initialize();














}};
