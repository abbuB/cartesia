  /* Constants ================================================================= */
  {

    var KEYCODES={
      BACKSPACE:    8,
      TAB:          9,
      ENTER:       10,
      RETURN:      13,
      ESC:         27,
      DELETE:     127,
      CODED:       0xffff,
      SHIFT:       16,
      CONTROL:     17,
      ALT:         18,
      CAPSLK:      20,
      SPACE:       32,
      PGUP:        33,
      PGDN:        34,
      END:         35,
      HOME:        36,
      LEFT:        37,
      UP:          38,
      RIGHT:       39,
      DOWN:        40,
      A:           65,
      D:           68,
      E:           69,
      R:           82,
      W:           87,
      X:           88,
      Z:           90,
      a:           97,
      d:          100,
      e:          101,
      r:          114,
      w:          119,
      x:          120,
      y:          121,
      z:          122,
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
      INSERT:     155
      
    };
    var CLRS={

      K_STEEL_0:     "rgba( 48, 68, 82,255)",
      // K_STEEL_1:     color(132,177,208,255),
      // K_STEEL_2:     color(106,141,166,255),
      // K_STEEL_3:     color(136,164,184,255),

      K_TEAL_0:     "rgb( 24, 99,117,255)",
      // K_TEAL_1:     color( 28,117,138,255),
      // K_TEAL_2:     color( 41,171,202,255),
      // K_TEAL_3:     color( 88,196,221,255),
      // K_TEAL_4:     color(156,220,235,255),
      // K_TEAL_5:     color( 17,172,205,255),

      // K_GREEN_0:    color( 31,171, 84,255),
      // K_GREEN_1:    color( 56,182, 92,255),
      // K_GREEN_2:    color( 116,207,112,255),

      // K_PINK_0:     color(202, 51,124,255),
      // K_PINK_1:     color(218, 79,146,255),
      // K_PINK_2:     color(255,146,198,255),

      // K_ORANGE_0:   color(232, 77, 57,255),
      // K_ORANGE_1:   color(255,132,130,255),
      // K_ORANGE_2:   color(234,145, 22,255),

      // K_BROWN_0:    color(224,125, 16,255),
      // K_BROWN_1:    color(255,188, 37,255),
      // K_BROWN_2:    color(255,132,130,255),

      // K_PURPLE_0:   color(120, 83,171,255),
      // K_PURPLE_1:   color(155,119,229,255),

      // K_BLUE_0:     color( 19, 78,163,255),
      // K_BLUE_1:     color( 60,145,229,255),

      // K_GRAY_0:     color(221,221,221,255),

      // RED0:         color(153,  0,  0,255),
      // RED1:         color(204,  0,  0,255),
      // RED2:         color(255, 51, 51,255),

      // TOOLBARA:     color( 41,171,202,255),
      // TOOLBARI:     color( 69,174,200,255),

      // INACTIVE:     color(230,230,230,255),
      // ACTIVE:       color(235,235,235,255),

      // CYAN:         color( 49,204,167,255),

      // TEAL_0:       color( 28,117,138,255), TEAL_0_LT:    color( 28,117,138,128),
      // TEAL_1:       color( 41,171,202,255), TEAL_1_LT:    color( 41,171,202,128),
      // TEAL_2:       color( 88,196,221,255), TEAL_2_LT:    color( 88,196,221,128),
      // TEAL_3:       color(156,220,235,255), TEAL_3_LT:    color(156,220,235,128),

      // TRANSPARENT:  color(-1,-1,-1),

      // WHITE:        color(255,255,255,255),
      // BLACK:        color(  0,  0,  0,255),

      // RED:          color(170, 29, 29,255), GREEN:        color(158,182, 58,255),
      // BLUE:         color( 29, 86,170,255), YELLOW:       color(238,214, 15,255),
      // ORANGE:       color(238,136, 15,255), GRAY:         color(128,128,128,255),

      // BROWN:        color(155,145,135,255),

      // Red:          color(255,  0,  0,255), RedOrange:    color(255, 81,  0,255),
      // Orange:       color(255,127,  0,255), YellowOrange: color(255,190,  0,255),
      // Yellow:       color(255,255,  0,255),

      // YellowGreen:  color(192,255,  0,255),
      // Green:        color(  0,255,  0,255), BlueGreen:    color(  0,127,127,255),
      // Blue:         color(  0,  0,255,255), BlueViolet:   color( 92,  0,255,255),

      // Violet:       color(127,  0,255,255), RedViolet:    color(191,  0,127,255),

      // SIN:          color(170, 29, 29,255), SIN_LT:       color(170, 29, 29,128),
      // COS:          color( 29, 86,170,255), COS_LT:       color( 29, 86,170,128),
      // TAN:          color(158,182, 58,255), TAN_LT:       color(158,182,58,192),

      // CSC:          color(170, 29, 29,255), CSC_LT:       color(238,136, 15,128),
      // SEC:          color( 29, 86,170,255), SEC_LT:       color(158,182, 58,128),
      // COT:          color(158,182, 58,255), COT_LT:       color(128,128,128,128),

      // VERSINE:      color(255,127,  0,255), COVERSINE:    color(255,127,  0,255),
      // EXSEC:        color(255, 20,147,255), EXCSC:        color(255, 20,147,255),

      // PINK:         color(255, 20,147,255)

    };
    var SHAPES={

      SINGLE:          0,  //  Single Cell

      ROW:             1,  //  4 contiguous horizontal cells
      ROW_FORWARD:     2,  //  4 cells forward slash (Top is right most)
      ROW_BACK:        3,  //  4 cells backward slash (Bottom is right most)

      DIAMOND:         4,   //  Diamond shape

      UUP:             5,
      UDOWN:           6,

      UPRIGHT:         7,
      DOWNRIGHT:       8,
      UPLEFT:          9,
      DOWNLEFT:       10,

      ZRIGHT:         11,
      ZLEFT:          12,

      SEVENRIGHT:     13,
      SEVENLEFT:      14,
      
      ANGLERIGHT:     15,
      ANGLELEFT:      16,
      
      NODEUPRIGHT:    17,
      NODEUPLEFT:     18,
      NODEDOWNRIGHT:  19,
      NODEDOWNLEFT:   20,
      
      VUPRIGHT:       21,
      VUPLEFT:        22,
      VDOWNRIGHT:     23,
      VDOWNLEFT:      24

    };
    var CONSTANTS={

      DEGREES:        '°',
      PI:             'π',
      TRIANGLE_UP:    '▲',
      TRIANGLE_DOWN:  '▼',
      INFINITY:       '∞',
      THETA:          'θ',
      RADIANS:        'ᶜ',
      IDENTICAL:      '≡',
      TRIANGLE_R:     '►',
      TRIANGLE_L:     '◄',
      SIGMA:          'Σ'

    };

    var NAVIGATION={
      INCREMENT:      0,
      DECREMENT:      1,
      FIRST:          2,
      LAST:           3,
      DECREMENTPAGE:  4,
      INCREMENTPAGE:  5
    };

    var GLYPHS={
      
      TEXT:       0,
      PLAY:       1,
      SETTINGS:   2,
      RESET:      3,
      TRIFORCE:   4,
      CHOOSE:     5

    };
    
    var HEXNAV={

      RIGHT:      0,
      LEFT:       1,
      UP_RIGHT:   2,
      UP_LEFT:    3,
      DOWN_RIGHT: 4,
      DOWN_LEFT:  5
      
    };
    
  }
  
    /* Data types ================================================================ */
  {
   
    function pt(row,col){
      this.row=row;
      this.col=col;
    };
    pt.prototype.toString=function(){ return this.row + ", " + this.col; }

    function pnt(x,y){
      this.x = x;
      this.y = y;
    };
    pnt.prototype.toString=function(){ return this.x +  ", " + this.y; }

  }
  
    /* Utility Functions ========================================================= */
  {

    /**  Thanks Peter */
    function forEach(arr, func, props){

      for(var c=0; c<arr.length; c++){

        arr[c][func](props);

      }

    };

    function ArrayToText(arr){

      var txt='';

      for(var n=0; n<arr.length; n++){

        txt=txt+arr[n] + ' | ';

      }

      return txt;

    };

    function ArrayToText2D(arr){

      var txt='';

      for(var row=0; row<arr.length; row++){

        txt+=arr[row]+'\n';

      }

      return txt;

    };

    function dist(p1,p2){

      return Math.pow( Math.pow(p1.x - p2.x, 2) +
                       Math.pow(p1.y - p2.y, 2), 0.5 );
      
    };
    
    function triangleArea(p0,p1,p2){

      var a=dist(p0, p1);
      var b=dist(p1, p2);
      var c=dist(p2, p0);

      var semi=(a+b+c)/2;

      var area=Math.pow((semi*(semi-a)*(semi-b)*(semi-c)), 0.5);

      return area;

    };
    function triangleHit(p0,p1,p2,mX,mY){

      var retVal=false;

      var p=new pnt(mX,mY);

      var areaTotal=triangleArea(p0,p1,p2);

      var area0=triangleArea(p0, p1, p);
      var area1=triangleArea(p1, p2, p);
      var area2=triangleArea(p2, p0, p);

      var totals=area0+area1+area2;

      if(Math.abs(areaTotal-totals)<1){ retVal=true; }

      return retVal;

    };
    function rectangleHit(p0,p1,p2,mX,mY){

      return (mX>p1.x &&
              mX<p0.x &&
              mY>p2.y &&
              mY<p0.y);
    };
    
  function isPrime(n){

    if      ( n===1     ) { return false; }   //  1 (one) is not prime
    else if ( n<4       ) { return true;  }   //  2 and 3 are prime
    else if ( n%2 === 0 ) { return false; }   //  even numbers
    else if ( n<9       ) { return true;  }   //  we have already excluded 4, 6 and 8
    else if ( n%3 === 0 ) { return false; }
    else {
      
      var r = Math.pow(n,0.5);           //  n rounded to the greatest long r so that r*r<=n
      var l = 5;
      
      while (l<=r) {
      
        if (n % l === 0      ) {return false; }
        if (n % (l+2) === 0  ) {return false; }
        
        l+=6;                                 //  All primes greater than 3 can be written in the form 6k +/- 1
      
      }
      
      return true;  // n is prime

      
    }

  };
  
  }
  
