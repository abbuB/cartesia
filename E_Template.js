/*  TBD

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
+projecteuler.net
+www.numberempire.com
+oeis.org
+math.stackexchange.com

*/

var diagrams = function(processingInstance){
  with (processingInstance){
/*

    TO DO:
      
      - separate formatting for #1
      - explanations for each type of #
      - tooltips?

      - circular divisors display
      
      - buttons to toggle bar graph display

          - # of factors

      - only draw telemetry if it's visible

    Research:


    TO DONE:


        textFont(createFont("sans-serif", 14));
        textFont(createFont("monospace", 14));
        textFont(createFont("serif", 14));
        textFont(createFont("fantasy", 14));
        textFont(createFont("cursive", 14));

        println( typeof this.color );

*/

  var application=function(){

    /* Initialize -------------------- */
    // {

      frameRate(0);

      cursor(WAIT);
      strokeCap(SQUARE);

      angleMode="radians";

      size(1800, 900);           /* set size of canvas */

    // }

    this.debug=true;          //  mode that displays enhanced debugging tools

    this.frameRate=30;        //  refresh speed

    this.mouseX=0;            //  current mouseX location
    this.mouseY=0;            //  current mouseY location

    this.left=false;          //  Is the left mouse button pressed
    this.right=false;         //  Is the right mouse button pressed
    this.center=false;        //  Is the center mouse button pressed

    this.focus=0;             //  The ID of the control with focus

    this.controls=[];         //  collection of controls in the app
    this.keys=[];             //  Array holding the value of all keycodes

    /* App Specific ------------------ */
    this.data=[];             //  Array of collatz objects
    this.fibs=[];

    this.autoRun=false;       //  Alpha changes automatically
    this.infoOn=false;        //  Is the info frame displayed

    this.dCursor=0;          //  position of the cursor in data
    this.dOffset=0;

    this.sw=5;

    this.min=1;
    this.max=floor(width-40)/this.sw-1;

  };

  var app=new application();

  /* Constants ======================================================= */
  {

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
    var CLRS={

      K_STEEL_0:     color( 48, 68, 82,255),
      K_STEEL_1:     color(132,177,208,255),
      K_STEEL_2:     color(106,141,166,255),
      K_STEEL_3:     color(136,164,184,255),

      K_TEAL_0:     color( 24, 99,117,255),
      K_TEAL_1:     color( 28,117,138,255),
      K_TEAL_2:     color( 41,171,202,255),
      K_TEAL_3:     color( 88,196,221,255),
      K_TEAL_4:     color(156,220,235,255),
      K_TEAL_5:     color( 17,172,205,255),

      K_GREEN_0:    color( 31,171, 84,255),
      K_GREEN_1:    color( 56,182, 92,255),
      K_GREEN_2:    color( 116,207,112,255),

      K_PINK_0:     color(202, 51,124,255),
      K_PINK_1:     color(218, 79,146,255),
      K_PINK_2:     color(255,146,198,255),

      K_ORANGE_0:   color(232, 77, 57,255),
      K_ORANGE_1:   color(255,132,130,255),
      K_ORANGE_2:   color(234,145, 22,255),

      K_BROWN_0:    color(224,125, 16,255),
      K_BROWN_1:    color(255,188, 37,255),
      K_BROWN_2:    color(255,132,130,255),

      K_PURPLE_0:   color(120, 83,171,255),
      K_PURPLE_1:   color(155,119,229,255),

      K_BLUE_0:     color( 19, 78,163,255),
      K_BLUE_1:     color( 60,145,229,255),

      K_GRAY_0:     color(221,221,221,255),

      RED0:         color(153,  0,  0,255),
      RED1:         color(204,  0,  0,255),
      RED2:         color(255, 51, 51,255),

      TOOLBARA:     color( 41,171,202,255),
      TOOLBARI:     color( 69,174,200,255),

      INACTIVE:     color(230,230,230,255),
      ACTIVE:       color(235,235,235,255),

      CYAN:         color( 49,204,167,255),

      TEAL_0:       color( 28,117,138,255), TEAL_0_LT:    color( 28,117,138,128),
      TEAL_1:       color( 41,171,202,255), TEAL_1_LT:    color( 41,171,202,128),
      TEAL_2:       color( 88,196,221,255), TEAL_2_LT:    color( 88,196,221,128),
      TEAL_3:       color(156,220,235,255), TEAL_3_LT:    color(156,220,235,128),

      TRANSPARENT:  color(-1,-1,-1),

      WHITE:        color(255,255,255,255),
      BLACK:        color(  0,  0,  0,255),

      RED:          color(170, 29, 29,255), GREEN:        color(158,182, 58,255),
      BLUE:         color( 29, 86,170,255), YELLOW:       color(238,214, 15,255),
      ORANGE:       color(238,136, 15,255), GRAY:         color(128,128,128,255),

      BROWN:        color(155,145,135,255),

      Red:          color(255,  0,  0,255),     RedOrange:    color(255, 81,  0,255),
      Orange:       color(255,127,  0,255),     YellowOrange: color(255,190,  0,255),
      Yellow:       color(255,255,  0,255),

      YellowGreen:  color(192,255,  0,255),
      Green:        color(  0,255,  0,255), BlueGreen:    color(  0,127,127,255),
      Blue:         color(  0,  0,255,255), BlueViolet:   color( 92,  0,255,255),

      Violet:       color(127,  0,255,255), RedViolet:    color(191,  0,127,255),

      SIN:          color(170, 29, 29,255), SIN_LT:       color(170, 29, 29,128),
      COS:          color( 29, 86,170,255), COS_LT:       color( 29, 86,170,128),
      TAN:          color(158,182, 58,255), TAN_LT:       color(158,182,58,192),

      CSC:          color(170, 29, 29,255), CSC_LT:       color(238,136, 15,128),
      SEC:          color( 29, 86,170,255), SEC_LT:       color(158,182, 58,128),
      COT:          color(158,182, 58,255), COT_LT:       color(128,128,128,128),

      VERSINE:      color(255,127,  0,255), COVERSINE:    color(255,127,  0,255),
      EXSEC:        color(255, 20,147,255), EXCSC:        color(255, 20,147,255),

      PINK:         color(255, 20,147,255)


    };
    var QUADRANTS={
      NONE:   0,
      ONE:    1,
      TWO:    2,
      THREE:  3,
      FOUR:   4
    };
    var CONSTANTS={

      DEGREES:    "°",
      PI:         "π",
      UP_ARROW:   "▲",
      INFINITY:   "∞",
      THETA:      "θ",
      RADIANS:    "ᶜ",
      IDENTICAL:  "	≡"

    };
    var NAVIGATION={
      DECREMENT:      0,
      FIRST:          1,
      INCREMENT:      2,
      LAST:           3,
      DECREMENTPAGE:  4,
      INCREMENTPAGE:  5
    };

  }


  /* Utility Functions ========================================================= */
  {
    var getColor=function(clr, alpha){ return color(red(clr), green(clr), blue(clr), alpha/100*255); };

    var setBucketsMax=function(){

      var max=0;

      for(var n=0; n<app.buckets.length; n++){

        if(app.buckets[n].total>max){
          app.bucketsMax=app.buckets[n].total;
          max=app.bucketsMax;
        }

      }

    };
    var setMaxMax=function(){

      var max=0;

      for(var n=0; n<app.max.length; n++){

        if(app.max[n]>max){
          app.maxMax=app.max[n];
          max=app.maxMax;
        }

      }

    };
    var setSumMax=function(){

      var max=0;

      for(var n=0; n<app.sum.length; n++){

        if(app.sum[n]>max){
          app.sumMax=app.sum[n];
          max=app.sumMax;
        }

      }

    };
    var printArray=function(arr){

      var txt="";

      for(var n=0; n<arr.length; n++){

        txt=txt+arr[n] + " | ";

      }

      return(txt);

    };
    var arrayToString=function(arr){

      var s="";
// println(arr);
      for(var n=0; n<arr.length; n++){

        if(n===arr.length-1){ s=s+arr[n];        }
        else                { s=s+arr[n] + ", "; }

      }

      return s;

    };

    var exists=function(n){

      var retVal=-1;

      for(var i=0; i<app.buckets.length; i++){
        if(app.buckets[i].n===n){
          retVal=i;
          break;
        }
      }
// println(retVal);
      return retVal;

    };

    var highlyComposite=0;

    var loadData=function(){

      app.fibs=fibonacciUpTo(app.max+app.dOffset);        //  populate the fibonacci array
      app.factorials=factorialsUpTo(app.max+app.dOffset); //  populate the fibonacci array
      app.data=[];                                        //  Erase app.data
      
      var i;
      
      for(var n=app.min; n<=app.max; n++){

        app.data.push(new Integer(n+app.dOffset));
        i=app.data[app.data.length-1];
        
        if(i.divisorCount>highlyComposite){

          i.isHighlyComposite=true;
          highlyComposite=i.divisorCount;

        }

      }

    };

    var incrementSW=function(){

      if(app.sw<10){

        app.sw++;
        app.max=floor((width-40)/app.sw);
        app.dCursor=0;
        loadData();

      }

      println(app.sw);

    };
    var decrementSW=function(){

      if(app.sw>1){

        app.sw--;
        app.max=floor((width-40)/app.sw);
        app.dCursor=0;
        loadData();

      }

      println(app.sw);

    };

    var addToFront=function(){

      var temp=[];

      temp.push(new Integer(app.data[0].n-1));

      app.data=splice(app.data, temp);

    };
    var addToEnd=function(){

      app.data.push(new Integer(app.data[app.data.length-1].n+1));

        if(app.data[app.data.length-1].divisorCount>highlyComposite){

          app.data[app.data.length-1].isHighlyComposite=true;
          highlyComposite=app.data[app.data.length-1].divisorCount;

        }

    };
    var removeFront=function(n){

      app.data=subset(app.data,1);

    };
    var removeEnd=function(){

      app.data=shorten(app.data);

    };

    var incrementRecord=function(){

      if(app.dCursor===app.max-1){

        removeFront();
        addToEnd();

      }
      else{

        app.dCursor++;

        if(app.dCursor>app.data.length-1){ app.dCursor=0; }

      }

    };
    var decrementRecord=function(){

      if(app.dCursor===0 &&
         app.data[app.dCursor].n>1){

        removeEnd();
        addToFront();

      }
      else{
        
        if(app.dCursor>0){ app.dCursor--; }

        // if(app.dCursor<0){
          // app.dCursor===1;
          // app.dCursor=app.data.length-1;
          
        // }

      }

    };

    var getAuto=function()        { return app.autoRun;               };
    var getLegend=function()      { return app.legend;                };

    var checkboxAuto=function()   {

      app.autoRun=!app.autoRun;

      if(app.autoRun){ app.frameRate=10; }
      else           { app.frameRate=30; }

    };
    var checkboxLegend=function() { app.legend=!app.legend;           };

    var getInfo=function()        { return app.infoOn;                };
    var toggleInfo=function()     { app.infoOn =! app.infoOn;         };

    var setDataCursor=function(n) {

      if(n>=0 &&
         n<app.data.length*app.sw){

        app.dCursor=floor(n/app.sw);

      }

    };

    // var decrementRecord=function(){ decrementRecord();                };
    var firstRecord=function()    { app.dCursor=0;                    };
    // var incrementRecord=function(){ incrementRecord();                };
    var lastRecord=function()     { app.dCursor=app.data.length-1;    };
    var incrementPage=function()  {

      var accel=1;

      if(app.keys[KEYCODES.CONTROL]){ accel= 10; }
      if(app.keys[KEYCODES.ALT])    { accel=100; }

      app.dOffset=constrain(app.dOffset+=250*accel, 0);

      loadData();

    };
    var decrementPage=function()  {

      var accel=1;

      if(app.keys[KEYCODES.CONTROL]){ accel= 10; }
      if(app.keys[KEYCODES.ALT])    { accel=100; }

      app.dOffset=constrain(app.dOffset-=250*accel, 0);

      loadData();

    };

    var navCursor=function()      { return app.dCursor+1;             };
    var navRecordCount=function() { return app.data.length;           };
    var navSetCursor=function(n)  {

      var setValue=round(n/app.data.length*app.data.length);

      if(setValue>=0 &&
         setValue<app.data.length){
        app.dCursor=setValue;
      }

    };


    /* Maths utility methods ===================================== */
    {

      /* sumDivisibleBy ---------- */
      var sumDivisibleBy=function(n, limit){

        var p = floor(limit / n);

        return (n*(p*(p+1))) / 2;

      };

      /* sumOfProperDivisors
         returns the sum of proper divisors (not including n) ---------- */
      var sumOfProperDivisors=function(n){

        var sum=0;

        if(n!==1){ sum=1; }

        for (var f=2; f<n; f++) {

          if (n%f == 0) {

            sum+=f;
    //        sum+=n/f;

         }

       }

       return sum;

      }

      /* sumOfDivisors
         returns the sum of proper divisors (including n) ---------- */
      var sumOfDivisors=function(n){

        return n+sumOfProperDivisors(n);

      };

      /*  isPrime
          returns true if n is ---------- */
      var isPrime=function(n){

        if      ( n===1      ) { return false; }   //  1 (one) is not prime
        else if ( n<4        ) { return true;  }   //  2 and 3 are prime
        else if ( n%2 === 0  ) { return false; }   //  even numbers
        else if ( n<9        ) { return true;  }   //  we have already excluded 4, 6 and 8
        else if ( n%3 === 0  ) { return false; }
        else {

          var r = sqrt(n);           //  n rounded to the greatest long r so that r*r<=n
          var l = 5;

          while (l<=r) {

            if (n % l === 0      ) {return false; }
            if (n % (l+2) === 0  ) {return false; }

            l+=6;                                 //  All primes greater than 3 can be written in the form 6k +/- 1

          }

          return true;  // n is prime


        }

      };

      /*  nextPrime
          returns the next prime after n ---------- */
      var nextPrime=function(n) {

        while (isPrime(n+=1)===false){}

        return n;

      }

      /*  previousPrime
          returns the previous prime before n ---------- */
      var previousPrime=function(n) {

        while (isPrime(n-=1)===false) {}

        return n;

      }

      var contains=function(n, arr){

        var retVal=false;

        for(var i=0; i<arr.length; i++){

          if(arr[i]===n){

            retVal=true;
            break;

          }

        }

        return retVal;

      };

      /* Divisors
         returns an array of proper divisors (including n) ----------*/
      var properDivisorsArray=function(n){

        var factors=[1];
  
        // factors.push(1);
        
        if(n!==1){
          
          var divisor=0;

          for (var f=2; f<=sqrt(n); f++) {

            if (n%f === 0) {

              divisor=n/f;

              if(!contains(f,factors))        { factors.push(f);        }
              if(!contains(divisor,factors))  { factors.push(divisor);  }

            }

          }

          factors=sort(factors);
        
        }

        return factors;

      };

      /* Divisors
         returns a list of proper divisors (including n) ----------*/
      var divisorsArray=function(n){

        var factors = properDivisorsArray(n);

        factors.push(n);

        return factors;

      };

      /* primeFactors
         returns a list of prime factors of n ---------- */
      var primeFactors=function(n){
        
        if(n===1){ return ["-"]; }

        var factors=[];

        while (n%2===0){
          factors.push(2);
          n=n>>1;
        }

        for (var f=3; f<=n; f+=2){

          while (n%f===0){
            factors.push(f);
            n/=f;
          }

        }

        return factors;

      }

      /* fibinacciUpTo
         returns a list of fibonacci numbers up to n ---------- */
      var fibonacciUpTo=function(n){

        var fibs=[];

        fibs.push(1);
        fibs.push(1);

        while(fibs[fibs.length-1] + fibs[fibs.length-2]<n){

          fibs.push(fibs[fibs.length-1] + fibs[fibs.length-2]);

        }

        return(fibs);

      };

      /* factorialsUpTo
         returns a list of factorial numbers up to n ---------- */
      var factorialsUpTo=function(n){

        var facts=[];

        facts.push(1);

        for(var i=2; i<=n; i++){

          if(facts[facts.length-1]>n){ break; }

          facts.push(facts[facts.length-1]*i);

        }

        return(facts);

      };

    }

  }

  /* Data types ================================================ */
  {

    var Integer=function(n){

      this.n=n;                                             //  The Integer #

      this.primeFactors=primeFactors(n);                    //  Prime Factorization

      // this.divisors=divisorsArray(n);                    //  Array of all divisors

      this.properDivisors=properDivisorsArray(n);           //  Array of all divisors
      this.properDivisorCount=this.properDivisors.length;   //  # of Divisors

      this.divisorCount=this.properDivisorCount;            //  # of Divisors

      this.sumOfDivisors=sumOfDivisors(n);                  //  Sum of all the divisors
      this.sumOfProperDivisors=this.sumOfDivisors-this.n;   //  Sum of all the divisors less n

      this.isPrime=str(isPrime(n));

      this.previousPrime=previousPrime(n);
      this.nextPrime=nextPrime(n);

      this.isFibonacci=contains(this.n, app.fibs);          //  n is in the fibonacci sequence
      this.isFactorial=contains(this.n, app.factorials);    //  n is in the factorial sequence

      this.isPerfect=(this.sumOfProperDivisors===this.n);   //  sum of divisors = n
      this.isHighlyComposite=false;                         // Has a greater # of factors than any lower number
      this.isAbundant=this.sumOfProperDivisors>=this.n;     //  Sum of factors is greater than n
      
      this.isBell=false;                                    // # of ways to partition a set of size n
      this.isRegular=true;                                  //  Evenly divide powers of 60

      this.binary=binary(n);

      this.square=sq(n);
      this.squareRoot=sqrt(n);

      this.naturalLog=log(n);
      this.decimalLog=(log(n)/log(10));

      // this.sin=sin(radians(n));
      // this.cos=cos(radians(n));
      // this.tan=tan(radians(n));

    };

  }


  /* Controls ==================================================== */
  {

    // Control ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var control=function(id, parent, x, y, w, h){

        // explicit properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        this.id=id;                 /* Unique identification number -- Change to GUID for production) */

        this.parent=parent;         /* parent control (acts as a container) */

        this.x=x;                   /* left */
        this.y=y;                   /* top */
        this.w=w;                   /* width */
        this.h=h;                   /* height */

        // inherent properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        this.controls=[];           /* array of child controls */

        this.on=false;              /* Is the control on or off */
        this.hit=false;             /* mouse is over the control */


      };
      control.prototype.draw=function(){};
      control.prototype.clicked=function(){

        if(this.hit){

          for(var c in this.controls){ this.controls[c].clicked(); }

        }

      };
      control.prototype.rClicked=function(){};
      control.prototype.cClicked=function(){};
      control.prototype.moved=function(x,y){

        if(mouseX>(this.x+x) &&
           mouseX<(this.x+x) + this.w &&
           mouseY>(this.y+y) &&
           mouseY<(this.y+y) + this.h){

          this.hit=true;

          for(var c in this.controls){ this.controls[c].moved((this.x+x), (this.y+y)); }

        }
        else{

          this.hit=false;

        }

      };
      control.prototype.dragged=function(){

        if(this.hit){

          for(var c in this.controls){ this.controls[c].dragged(); }

        }

      };
      control.prototype.pressed=function(){

        if(this.hit){

          for(var c in this.controls){ this.controls[c].pressed(); }

        }

      };
      control.prototype.released=function(){};
      control.prototype.typed=function(){};
      control.prototype.over=function(){};
      control.prototype.out=function(){

        this.hit=false;
        app.focus=-1;
        for(var c in this.controls){ this.controls[c].out(); }

      };

    }

    // root ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {
      /* Identical to a container control except is doesn't have a parent */
      var root=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.text   = params.text;

        this.acolor = params.acolor;
        this.icolor = params.icolor;

        this.cursor = params.cursor;
        this.border = params.border;

        this.left   = 0;

      };
      root.prototype=Object.create(control.prototype);
      root.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();

            fill(this.icolor);

            if(this.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(this.acolor);

            }

            if(this.border){
              strokeWeight(1);
              stroke(this.acolor);
            }

              rect(0, 0, this.w, this.h);

            // Draw child controls
            for(var c in this.controls){ this.controls[c].draw(); }

        popMatrix();

      };

    }

    // Container ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var container=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.text=params.text;
        this.color=params.color;
        this.cursor=params.cursor;
        this.border=params.border;

      };
      container.prototype=Object.create(control.prototype);
      container.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            fill(getColor(this.color, 5));

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(getColor(this.color, 10));

            }

            if(this.border){

              strokeWeight(1);
              stroke(getColor(this.color, 50));

            }

            rect(0, 0, this.w, this.h, this.execute);

            // Draw child controls
            for(var c in this.controls){ this.controls[c].draw(); }

        popMatrix();

      };

    }

    // Splash Screen ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var splash=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.color=params.color;
        this.cursor=params.cursor;
        this.retrieve=params.retrieve;

      };
      splash.prototype=Object.create(control.prototype);
      splash.prototype.draw=function(){

        if(this.retrieve()){

          pushMatrix();

            translate(this.x, this.y);

              strokeWeight(1);
              stroke(getColor(this.color, 40));
              fill(getColor(this.color, 90));

              if(this.hit &&
                 this.parent.hit){

                app.focus=this.id;
                cursor(this.cursor);

                fill(getColor(this.color, 100));

              }

                rect(0, 0, this.w, this.h, 20);

              textSize(16);
              textAlign(CENTER,BOTTOM);
              fill(getColor(CLRS.YELLOW,75));

                text("The Collatz Conjecture", this.w/2, 30);

              var txt0="A conjecture in mathematics named after Lothar Collatz also known as the 3n + 1 conjecture or the hailstone sequence.";
              var txt1="Take any positive integer n.  If n is even, divide it by 2 to get n / 2.  If n is odd, multiply it by 3 and add 1 to obtain 3n + 1.  Repeat the process indefinitely.  The conjecture is that no matter what number you start with, you will always eventually reach 1.";
              var txt2="For instance, starting with n = 12, one gets the sequence 12, 6, 3, 10, 5, 16, 8, 4, 2, 1.";
              var txt3="If the conjecture is false, it can only be because there is some starting number which gives rise to a sequence that does not contain 1. Such a sequence might enter a repeating cycle that excludes 1, or increase without bound. No such sequence has been found.";
              var txt4="https://en.wikipedia.org/wiki/Collatz_conjecture";

              var txt5="f(n)";
              var txt6="n/2";
              var txt7="if n" + CONSTANTS.IDENTICAL + "0 (mod 2)";
              var txt8="3n+1";
              var txt9="if n" + CONSTANTS.IDENTICAL + "1 (mod 2)";
              var txt10="{";

              textSize(11);
              textAlign(LEFT,TOP);
              fill(getColor(CLRS.WHITE,75));

                text(txt0 + "\n\n" +
                     txt1 + "\n\n" +
                     txt2 + "\n\n" +
                     txt3,
                     20, 40,
                     this.w-30, this.h-40);

              textAlign(LEFT,CENTER);
              fill(getColor(CLRS.K_TEAL_2,100));

                text(txt4, this.w/2-textWidth(txt4)/2, 330);

              var txtX=65;
              var txtY=-30;

              // Formulas
              textAlign(LEFT,TOP);
              textSize(16);
              fill(getColor(CLRS.YELLOW,90));

                text(txt5,  30+txtX, 300+txtY);

                text(txt6,  85+txtX, 290+txtY);
                text(txt7, 135+txtX, 290+txtY);

                text(txt8,  85+txtX, 310+txtY);
                text(txt9, 135+txtX, 310+txtY);

              textSize(48);
              textAlign(CENTER,CENTER);

                text(txt10, 70+txtX, 305+txtY);

              // Draw child controls
              for(var c in this.controls){ this.controls[c].draw(); }

          popMatrix();

        }

      };

    }

    // Index ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var index=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.radius=params.radius;
        this.color=params.color;
        this.cursor=params.cursor;

      };
      index.prototype=Object.create(control.prototype);
      index.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            strokeWeight(1);
            stroke(getColor(CLRS.BLACK, 20));
            fill(getColor(this.color, 50));

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              stroke(getColor(CLRS.BLACK, 40));
              fill(getColor(this.color, 75));

            }

            rect(0, 0, this.w, this.h, this.radius);

            // Draw child controls
            for(var c in this.controls){ this.controls[c].draw(); }

        popMatrix();

      };

    }

    // navScroll ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var navScroll=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.color    = params.color;
        this.cursor   = params.cursor;
        this.execute  = params.execute;

      };
      navScroll.prototype=Object.create(control.prototype);
      navScroll.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            noFill();
            // fill(getColor(this.color, 5));

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(getColor(this.color, 5));
              strokeWeight(0.5);
              stroke(getColor(this.color, 50));

            }

              rect(1, 1, this.w-2, this.h-2);

            var xPos=floor(app.dCursor/app.data.length*this.w);

            stroke(getColor(CLRS.RED,100));
            strokeWeight(0.5);

// println(xPos);
              line(xPos,0,xPos,30);

            // Draw child controls
            for(var c in this.controls){ this.controls[c].draw(); }

        popMatrix();

      };
      navScroll.prototype.dragged=function(x,y){

        if(this.hit &&
           app.focus===this.id){

          var X=round((mouseX-this.x)/this.w*app.data.length);

          if(X>=0 && X<=app.data.length){
            this.execute(X);
          }

          for(var c in this.controls){ this.controls[c].dragged(); }

        }

      };
      navScroll.prototype.clicked=function(x,y){

        if(this.hit &&
           app.focus===this.id){

          var X=round((mouseX-this.x)/this.w*app.data.length);

          if(X>=0 && X<=app.data.length){
            this.execute(X);
          }

          for(var c in this.controls){ this.controls[c].dragged(); }

        }

      };
    }

    // NavBar ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var navbar=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.text        = params.text;
        this.acolor      = params.acolor;
        this.icolor      = params.icolor;
        this.cursor      = params.cursor;
        this.position    = params.position;
        this.recordCount = params.recordCount;
        this.execute     = params.execute;

      };
      navbar.prototype=Object.create(control.prototype);
      navbar.prototype.draw=function(){

        pushMatrix();

          translate(this.x+0.5, this.y+0.5);

            noStroke();
            fill(this.icolor);

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(this.acolor);

            }

              rect(0, 0, this.w, this.h);

            stroke(getColor(CLRS.BLACK,25));
            strokeWeight(0.25);

              line(0, 0, this.w,      0); // Top Border

            // Caption
            fill(getColor(CLRS.BLACK, 50));

            if(this.hit){ fill(getColor(CLRS.K_TEAL_0,100)); }

            textSize(16);
            textAlign(CENTER,CENTER);
            var txt=this.position() + " of " + this.recordCount();

              text(txt, this.w/2, this.h/2);

            // Draw child controls
            for(var c in this.controls){ this.controls[c].draw(); }

        popMatrix();

      };


    }

    // Navigation Buttons * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var navButton=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.execute=params.execute;
        this.type=params.type;
        this.retrieve=params.retrieve;
        this.color=params.color;
        this.cursor=params.cursor;

      };
      navButton.prototype=Object.create(control.prototype);
      navButton.prototype.draw=function(){

        var offset=0;

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            noFill();

            if(this.hit &&
               this.parent.hit){

              if(app.left){ offset=1; }

              app.focus=this.id;
              cursor(this.cursor);

              fill(getColor(this.color,10));

            }

            //  Background
              rect(offset, offset, this.w, this.h, 2);


            // Icon
            fill(getColor(this.color, 65));

            if(this.hit){ fill(getColor(this.color, 100)); }

            noStroke();
            textAlign(CENTER,CENTER);
            textSize(16);

              switch(this.type){

                case NAVIGATION.FIRST:          text("|<", this.w/2+offset, this.h/2+offset); break;
                case NAVIGATION.DECREMENT:      text("<",  this.w/2+offset, this.h/2+offset); break;
                case NAVIGATION.INCREMENT:      text(">",  this.w/2+offset, this.h/2+offset); break;
                case NAVIGATION.LAST:           text(">|", this.w/2+offset, this.h/2+offset); break;
                case NAVIGATION.INCREMENTPAGE:  text(">>", this.w/2+offset, this.h/2+offset); break;
                case NAVIGATION.DECREMENTPAGE:  text("<<", this.w/2+offset, this.h/2+offset); break;

                default:  break;

              }

        popMatrix();

      };
      navButton.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.hit &&
           app.focus===this.id){

          this.execute();
          // this.on=!this.on;

          for(var c in this.controls){ this.controls[c].clicked(); }

        }

      };

    }

    // toolbar ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var toolbar=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.text        = params.text;
        this.acolor      = params.acolor;
        this.icolor      = params.icolor;
        this.cursor      = params.cursor;
        this.position    = params.position;
        this.recordCount = params.recordCount;

      };
      toolbar.prototype=Object.create(control.prototype);
      toolbar.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            fill(this.icolor);

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              fill(this.acolor);

            }

              rect(0, 0, this.w, this.h);

            // Caption
            fill(CLRS.WHITE);
            textSize(16);
            textAlign(CENTER,CENTER);

              text(this.text, this.w/2, this.h/2);

            // Draw child controls
            for(var c in this.controls){ this.controls[c].draw(); }

        popMatrix();

      };

    }

    // Telemetry ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var telemetry=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.color  = params.color;
        this.cursor = params.cursor;

        /*  Dynamic x-coordinate */
        this.offset = 0;

      };
      telemetry.prototype=Object.create(control.prototype);
      telemetry.prototype.draw=function(){

        textFont(createFont("sans-serif", 14));

        var p=this;

        // Border
        var border=function(){

          strokeWeight(1);
          stroke(getColor(p.clr,100));

          if(p.hit){ fill(getColor(p.color, 75)); }
          else     { fill(getColor(p.color, 70)); }

          rect(p.offset, 0, p.w, p.h);

        };

        //  Properties
        var properties=function(){

          var row0=30;

          var col0=p.offset+20;
          var col1=p.offset+30;
          var col2=p.offset+130;

          if     ( app.legend && p.offset>-200){ p.offset-=10; }
          else if(!app.legend && p.offset<0   ){ p.offset+=10; }

          if(this.hit){ fill(getColor(CLRS.WHITE,80)); }
          else        { fill(getColor(CLRS.WHITE,60)); }

          /* Title ------------------------- */
          textAlign(CENTER,CENTER);
          textSize(12);
          fill(CLRS.WHITE);

            text("Debug Telemetry",     p.w/2+p.offset, 20);

          /* Mouse Coordinates ------------------------- */
          textSize(10);
          textAlign(LEFT,TOP);
          textLeading(14);

          fill(getColor(CLRS.TEAL_2,75));

            text("Mouse Coordinates \n\n\n\n" +
                 "Mouse Buttons     \n\n\n\n\n" +
                 "Controls          \n\n\n\n" +
                 "Keys              \n\n\n\n\n" +
                 "App               \n\n\n\n",
                 col1, row0+15);

          /* app.focus is required to be done after control update in main draw sub */

          fill(getColor(CLRS.WHITE,75));

            text("            \n" +
                 "x:          \n" +
                 "y:          \n\n\n" +
                 "Left:       \n" +
                 "Right:      \n" +
                 "Center:     \n\n\n" +
                 "Focus:      \n" +
                 "Focused:    \n\n\n" +
                 "Alt:        \n" +
                 "Control:    \n" +
                 "Shift:      \n\n\n" +
                 "Legend:     \n" +
                 "Autorun:    \n" +
                 "Cursor:     \n" +
                 "Frame Rate: \n" +
                 "Info:",
                 col1, row0+15);

          fill(getColor(CLRS.YELLOW,75));

            text("\n" +
                 mouseX                     + "\n" +
                 mouseY                     + "\n\n\n" +
                 app.left                   + "\n" +
                 app.right                  + "\n" +
                 app.center                 + "\n\n\n" +
                 app.focus                  + "\n" +
                 focused                    + "\n\n\n" +
                 app.keys[KEYCODES.ALT]     + "\n" +
                 app.keys[KEYCODES.CONTROL] + "\n" +
                 app.keys[KEYCODES.SHIFT]   + "\n\n\n" +
                 app.legend                 + "\n" +
                 app.autoRun                + "\n" +
                 app.dCursor                + "\n" +
                 app.frameRate              + "\n" +
                 app.infoOn,
                 col2, row0+15);

          var txt="Press the left and right arrow keys to increment and decrement integer.";

          textSize(11);
          textAlign(LEFT,BOTTOM);

            text(txt, p.offset+17, row0 + 480, p.w-20, 100);

        };

        pushMatrix();

          translate(this.x, this.y);

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

            }

            if     ( app.legend && this.offset>-200){ this.offset-=10; }
            else if(!app.legend && this.offset<0   ){ this.offset+=10; }

            border();
            properties();

            // Draw child controls
            for(var c in this.controls){ this.controls[c].draw(); }

            /* The following is outside the properties function because
               it has to be done after the child controls are drawn to
               maintain proper control focus                              */
            fill(getColor(CLRS.YELLOW,75));
            textSize(11);
            textAlign(RIGHT,CENTER);

            // text(app.focus, this.offset+130, 495);

        popMatrix();

      };
      telemetry.prototype.moved=function(x,y){
      /* Overridden because of the dynamic x-coordinate offset */

        if(mouseX>this.x+x+this.offset &&
           mouseX<this.x+x+this.offset + this.w &&
           mouseY>this.y+y &&
           mouseY<this.y+y + this.h){

          this.hit=true;

          for(var c in this.controls){ this.controls[c].moved(this.x+x+this.offset, this.y+y); }

        }
        else{

          this.hit=false;

        }

      };

    }

    // OnOff ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var onOff=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.execute=params.execute;
        this.retrieve=params.retrieve;
        this.color=params.color;
        this.cursor=params.cursor;

      };
      onOff.prototype=Object.create(control.prototype);
      onOff.prototype.draw=function(){

        pushMatrix();

          translate(this.x, this.y);

            ellipseMode(CENTER);

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

              stroke(getColor(this.color, 75));

            }
            else{

              stroke(getColor(this.color, 50));

            }

            if(this.on){ rotate(-PI/2); }
            else       { this.value=0;  }

            strokeWeight(2);
            noFill();

              arc(0, 0, this.w, this.h, -PI/4, 3*PI/2-PI/4);

              line(0, 1, 0, -9);

        popMatrix();

      };
      onOff.prototype.moved=function(x,y){
      /* Overridden because the control is round */
        if(dist(mouseX, mouseY,
                this.x+x, this.y+y)<this.w){

          this.hit=true;

          for(var c in this.controls){ this.controls[c].moved(this.x+x, this.y+y); }

        }
        else{

          this.hit=false;

        }

      };
      onOff.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.hit){
          this.execute();
          this.on=!this.on;
        }

      };

    }

    // Settings * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var settings=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.execute=params.execute;
        this.retrieve=params.retrieve;
        this.color=params.color;
        this.cursor=params.cursor;

      };
      settings.prototype=Object.create(control.prototype);
      settings.prototype.draw=function(){

        var offset=0;

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            noFill();

            if(this.hit &&
               this.parent.hit){

              if(app.left){ offset=1; }

              app.focus=this.id;
              cursor(this.cursor);

              fill(getColor(this.color,10));

            }

            //  Background
              rect(offset, offset, this.w, this.h, 2);

            // Icon
            fill(getColor(this.color, 65));
            noStroke();

              ellipse(this.w/2+offset, this.h/2-6+offset, 3, 3);
              ellipse(this.w/2+offset, this.h/2,          3, 3);
              ellipse(this.w/2+offset, this.h/2+6+offset, 3, 3);

        popMatrix();

      };
      settings.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.hit){

          this.execute();
          this.on=!this.on;

          for(var c in this.controls){ this.controls[c].clicked(); }

        }

      };

    }

    // Info ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var info=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.text=params.text;
        this.execute=params.execute;
        this.retrieve=params.retrieve;
        this.color=params.color;
        this.cursor=params.cursor;

      };
      info.prototype=Object.create(control.prototype);
      info.prototype.draw=function(){

        var offset=0;

        pushMatrix();

          translate(this.x, this.y);

            noStroke();
            noFill();

            if(this.hit &&
               this.parent.hit){

              if(app.left){ offset=1; }

              app.focus=this.id;
              cursor(this.cursor);

              fill(getColor(this.color,10));

            }

            //  Background
            rect(offset, offset, this.w, this.h, 2);

            // Icon
            textSize(24);
            textAlign(CENTER,CENTER);

            fill(getColor(CLRS.BLACK,50));

            if(this.hit &&
               this.parent.hit){ fill(getColor(CLRS.BLACK,75)); }

            textFont(createFont("monospace", 20));
            // textFont(createFont("fantasy", 24));
            // textFont(createFont("cursive", 24));

              text(this.text, this.w/2, this.h/2);

        popMatrix();

      };
      info.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.hit){

          this.execute();
          this.on=!this.on;

          for(var c in this.controls){ this.controls[c].clicked(); }

        }

      };

    }

    // Button ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var button=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.execute=params.execute;
        this.retrieve=params.retrieve;
        this.text=params.text;
        this.color=params.color;
        this.cursor=params.cursor;

        this.on=false;

      };
      button.prototype=Object.create(control.prototype);
      button.prototype.draw=function(){

          var offset=0;

          pushMatrix();

            translate(this.x, this.y);
            scale(1,-1);

              // Border
              strokeWeight(0.75);

              fill(getColor(CLRS.ACTIVE, 5));
              noStroke();

              if(this.hit &&
                 this.parent.hit){

                if(app.left){ offset=1; }

                app.focus=this.id;
                cursor(this.cursor);

                fill(getColor(CLRS.ACTIVE, 50));

              }

              rect(offset, -this.h-offset, this.w, this.h, 3);

              // Caption
              if(this.hit &&
                 this.parent.hit){  fill(255,255,255); }
              else               {  fill(128,128,128); }

              scale(1,-1);

              textAlign(CENTER,CENTER);
              textSize(12);
              this.w=textWidth(this.text)+10;

                text(this.text, this.w/2+offset, this.h/2+offset);

          popMatrix();

      };
      button.prototype.clicked=function(){
      /* Overridden to maintain on/off value */

        if(this.hit &&
           app.focus===this.id){

          this.execute();

          for(var c in this.controls){ this.controls[c].clicked(); }

        }

      };

    }

    // Graph ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {

      var graph=function(id, parent, x, y, w, h, params){

        control.call(this, id, parent, x, y, w, h);

        this.color=params.color;
        this.cursor=params.cursor;

        this.displayBorder=false;
        this.displaySummary=true;
        this.displayPath=true;
        this.displayLines=true;
        this.displayCollatz=true;
        this.displayBuckets=false;
        this.displayCurrent=true;

        this.sw=app.sw;

      };
      graph.prototype=Object.create(control.prototype);
      graph.prototype.draw=function(){

        var p=this;

        var convertHeight=function(n){

          return (n-1)/app.data[app.dLongest].path.length*p.h*0.5;

        };
        var convertPath=function(n,max){

            var retval=(n-1)/max*p.h*0.75;

            return retval;

        };
        var convertX=function(x, length){
// println(x/length*(p.w-20));
        return x/length*(p.w-20);
          // return (x+1)/length*(app.data.length);

        };

        var border=function(){

          pushMatrix();

            translate(0.5,0.5);

              strokeWeight(1);
              stroke(getColor(CLRS.WHITE,50));

              if(p.hit){ fill(getColor(this.color,5)); }
              else     { fill(getColor(this.color,7)); }

                rect(0, 0, p.w, p.h, 3);

          popMatrix();

        };
        var axes=function(){

          pushMatrix();

            translate(p.x, p.h-10);
            scale(1,-1);

              fill(getColor(CLRS.K_TEAL_0,100));
              stroke(getColor(CLRS.K_TEAL_0,100));

                //  Origin
                // ellipse(0,0,5,5);

              // fill(CLRS.WHITE);
              // stroke(CLRS.WHITE);

                //  Axes
                line(0, 0,      0, p.h-20);   //  Y-axis
                line(0, 0, p.w-20,      0);   //  X-axis

          popMatrix();

        };
        var drawData=function(){

          pushMatrix();

            translate(10, p.h-10);
            scale(1,-1);

              p.sw=app.sw;

              strokeWeight(p.sw);
              fill  (getColor(CLRS.K_TEAL_2, 25));
              stroke(getColor(CLRS.BLACK,    50));
              
              var integer=0;
              
              for(var n=0; n<app.data.length; n++){
                
                integer=app.data[n];
                
                var x=n*p.sw+p.sw/2;
                // var y=app.data[n].naturalLog*30;
                var y=integer.properDivisorCount*5+10;

                  stroke(getColor(CLRS.BLACK, 100));
                  strokeWeight(p.sw);

                  // if(n%13===0){ stroke(getColor(CLRS.ORANGE, 75)); }
                  // if(n%15===0){ stroke(getColor(CLRS.BLUE,   75)); }
                  // if(n%25===0){ stroke(getColor(CLRS.GREEN,  75)); }

                  if(integer.properDivisorCount===1 &&
                     integer.n!==1){ stroke(getColor(CLRS.RED,     75)); }
                  else{

                    if(integer.n%2===0){ stroke(getColor(CLRS.BLACK, 50)); }
                    else               { stroke(getColor(CLRS.BLACK, 25)); }

                  }

                  if(integer.isAbundant){ stroke(getColor(CLRS.K_TEAL_3, 75)); }
                  if(integer.isPerfect ){ stroke(getColor(CLRS.ORANGE,   75)); }
                  if(app.dCursor===n   ){ stroke(getColor(CLRS.BLACK,   100)); }

                    line(x, 2, x, y);

              }
              
              strokeWeight(1);
              line(app.dCursor*p.sw+p.sw/2, 2,
                   app.dCursor*p.sw+p.sw/2, 500);
              
          popMatrix();

        };
        var drawPath=function(){

          var path="";

          for(var n=0; n<app.data[app.dCursor].path.length; n++){

            path+=app.data[app.dCursor].path[n];

            if(n!==app.data[app.dCursor].path.length-1){
              path+= ", ";
            }

          }

          textAlign(LEFT,TOP);
          fill(getColor(CLRS.GRAY,50));

            text(path, 20, 100, p.w-30, 10000);

        };
        var drawLines=function(){

          p.sw=(p.w-20)/app.data.length;

          var dLength=app.data.length;
          var pLength=app.data[app.dCursor].path.length;

          pushMatrix();

            translate(10, p.h-10);
            scale(1,-1);
            strokeWeight(p.sw);

            for(var n=0; n<dLength; n++){

              pLength=app.data[n].path.length;

              if(n%2===0){ stroke(getColor(CLRS.BLACK, 25)); }
              else       { stroke(getColor(CLRS.BLACK, 50)); }

              strokeWeight(p.sw);

              if(n===app.dHighest){ stroke(getColor(CLRS.ORANGE,75));
                                    strokeWeight(p.sw*1.5);           }
              if(n===app.dSum)    { stroke(getColor(CLRS.GREEN,75));
                                    strokeWeight(p.sw*1.5);           }
              if(n===app.dLongest){ stroke(getColor(CLRS.BLUE,75));
                                    strokeWeight(p.sw*1.5);           }
              if(n===app.dCursor) { stroke(getColor(CLRS.RED,75));
                                    strokeWeight(p.sw*1.5);           }

              line(convertX(n, dLength), 1,
                   convertX(n, dLength), convertHeight(pLength));

            }
                   
          popMatrix();

        };
        var drawMax=function(){

          p.sw=(p.w-20)/app.max.length;
          var dLength=app.max.length;

          pushMatrix();

            translate(10, p.h-10);
            scale(1,-1);
            strokeWeight(p.sw);

            for(var n=0; n<app.max.length; n++){

              if(n%2===0){ stroke(getColor(CLRS.ORANGE, 25)); }
              else       { stroke(getColor(CLRS.ORANGE, 50)); }

              if(n===app.dCursor){ stroke(getColor(CLRS.RED, 75)); }

              line(convertX(n, dLength), 1,
                   convertX(n, dLength), app.max[n]/app.maxMax*p.h*0.75);

            }

          popMatrix();

        };
        var drawSum=function(){

          p.sw=(p.w-20)/app.sum.length;
          var dLength=app.sum.length;

          pushMatrix();

            translate(10, p.h-10);
            scale(1,-1);
            strokeWeight(p.sw);

            for(var n=0; n<app.sum.length; n++){

              if(n%2===0){ stroke(getColor(CLRS.BLACK, 25)); }
              else       { stroke(getColor(CLRS.BLACK, 50)); }

              if(n===app.dCursor){ stroke(getColor(CLRS.RED, 75)); }

              line(convertX(n, dLength), 1,
                   convertX(n, dLength), app.sum[n]/app.sumMax*p.h*0.75);

            }

          popMatrix();

        };
        var drawBuckets=function(){

          pushMatrix();

            translate(10.5, p.h-10.5);
            scale(1,-1);

              var sw=(p.w-20)/app.buckets.length;

              fill(getColor(CLRS.BLUE,25));
              stroke(getColor(CLRS.BLUE,50));
              strokeWeight(1);

              for(var n=0; n<app.buckets.length; n++){

                rect(n*sw, 0, sw, app.buckets[n].total/app.bucketsMax*0.5*p.h);

              }

          popMatrix();

        };
        var currentData=function(){
          
          var integer=app.data[app.dCursor];
          
          //  Data cursor
          fill(getColor(CLRS.K_TEAL_0,100));
          textAlign(LEFT,TOP);
          textSize(20);

            text((nfc)(app.data[app.dCursor].n), 20, 10);

          fill(getColor(CLRS.BLACK,100));
          textSize(12);
          textLeading(2);

            text("Proper Divisors (" + (nfc)(integer.properDivisorCount) + "):",
                 20, 35);

          fill(getColor(CLRS.K_TEAL_2,100));
          textSize(11);

            text(arrayToString(integer.properDivisors),
                 30, 55, 200, 200);

          fill(getColor(CLRS.BLACK,100));
          textSize(11);
          textLeading(13);
          
            text("Prime Factors:          \n\n" +
                 "Sum of Proper Divisors: \n\n" +
                 "Is Prime:               \n" +
                 "Previous Prime:         \n" +
                 "Next Prime:             \n\n" +
                 "Fibonacci               \n" +
                 "Factorial               \n\n" +
                 "Highly Composite:       \n\n" +
                 "Perfect?",
                 250, 35);

          fill(getColor(CLRS.K_TEAL_2,100));
          textSize(11);
          textLeading(13);

            text(      arrayToString(integer.primeFactors) + "\n\n" +
                 (nfc)(integer.sumOfProperDivisors)        + "\n\n" +
                       integer.isPrime                     + "\n" +
                 (nfc)(integer.previousPrime)              + "\n" +
                 (nfc)(integer.nextPrime)                  + "\n\n" +
                       integer.isFibonacci                 + "\n" +
                       integer.isFactorial                 + "\n\n" +
                       integer.isHighlyComposite           + "\n\n" +
                       integer.isPerfect,
                 380, 35, 200, 200);

            // (nfc)(app.data[app.dCursor].sumOfProperDivisors) + "):",

          // fill(getColor(CLRS.BLACK,100));
          // textSize(11);
          // textLeading(13);
          
            // text("Binary      \n\n" +
                 // "Square      \n" +
                 // "Square Root \n\n" +
                 // "Natural Log \n" +
                 // "Decimal Log \n\n",
                 // 250,220);


            // fill(getColor(CLRS.K_TEAL_2,100));
            // textSize(11);

            // text(      integer.binary           + "\n\n" +
                 // (nfc)(integer.square)          + "\n" +
                 // (nfc)(integer.squareRoot,4)    + "\n\n" +
                 // (nf) (integer.naturalLog,1,4)  + "\n" +
                 // (nf) (integer.decimalLog,1,4),
                 // 380, 220);

        };
        var dataSummary=function(){

          fill(getColor(CLRS.K_TEAL_0,100));
          textSize(16);
          textAlign(LEFT,TOP);

            text("Range:", 300, 10);

          textSize(12);
          textLeading(16);
          fill(getColor(CLRS.BLACK,75));

            text("Max Peak: \n" +
                 "Max Sum:  \n" +
                 "Longest Path:",
                 300, 35);

          fill(getColor(CLRS.ORANGE,75));
          noStroke();

            ellipse(293,43,6,6);

          fill(getColor(CLRS.GREEN,75));

            ellipse(293,58,6,6);

          fill(getColor(CLRS.BLUE,75));

            ellipse(293,73,6,6);

          fill(getColor(CLRS.K_TEAL_2,100));
          textAlign(LEFT,BOTTOM);

            text((nfc)(app.data[0].i) + " - " +
                 (nfc)(app.data[app.data.length-1].i) + "\n\n",
                 400, 60);

          fill(getColor(CLRS.K_TEAL_0,50));
          textAlign(LEFT,TOP);

            text((nfc)(app.data[app.dHighest].i) +"\n" +
                 (nfc)(app.data[app.dSum].i) + "\n" +
                 (nfc)(app.data[app.dLongest].i),
                 400, 35);

          fill(getColor(CLRS.K_TEAL_2,75));
          textAlign(RIGHT,TOP);

            text((nfc)(app.data[app.dHighest].max) + "\n" +
                 (nfc)(app.data[app.dSum].sum) + "\n" +
                 (nfc)(app.data[app.dLongest].length-1),
                 540, 35);

        };
        
        var drawArcs=function(){

          stroke(getColor(CLRS.BLACK,100));
          strokeWeight(0.5);
          noFill();
          
          var incr=0;
          var bool=1;
          
          pushMatrix();
          
            translate(10, p.h/2);
            scale(1,-1);
line(0,0,500,0);
              for(var n=1; n<(width*10)/n; n++){
                
                incr=n*p.sw;
                
                beginShape();

                  curveVertex(0,0);
                  curveVertex(0,0);
                  
                  if(contains(n, app.data[app.dCursor].properDivisors)){
                  
                    stroke(getColor(CLRS.RED, 50));
                    strokeWeight(1);

                  }
                  else{

                    stroke(getColor(CLRS.BLACK, 25));
                    strokeWeight(0.5);

                  }

                  for(var x=incr; x<incr*100; x+=incr*2){
      
                    curveVertex(x/2,  bool*incr/2);
                    
                    bool*=-1;

                  }
                  
                  curveVertex(incr*20, 0);

                endShape();

              }

          popMatrix();

        };

        pushMatrix();

          translate(this.x+0.5, this.y+0.5);

            if(this.hit &&
               this.parent.hit){

              app.focus=this.id;
              cursor(this.cursor);

            }

            // border();
            axes();
            if(this.displayBorder) { border();      }
            if(this.displayCollatz){ drawData();    }
            if(this.displayCurrent){ currentData(); }
            drawArcs();

            // if(this.displaySummary){ dataSummary(); }
            // if(this.displayPath)   { drawPath();    }
            // if(this.displayLines)  { drawLines();   }
            // drawMax();
            // drawSum();
            // if(this.displayBuckets){ drawBuckets(); }


        popMatrix();

      };
      graph.prototype.clicked=function(x,y){

        if(this.hit){

          setDataCursor((mouseX-this.x-10));

          for(var c in this.controls){ this.controls[c].clicked((this.x+x), (this.y+y)); }

        }

      };
      graph.prototype.dragged=function(x,y){

        if(this.hit){

          if(mouseX>=this.x+10 &&
             mouseX<=this.x+this.w+10){

            setDataCursor((mouseX-this.x-10));

          }

          for(var c in this.controls){ this.controls[c].dragged((this.x+x), (this.y+y)); }

        }

      };

    }

  }


  /* Initialize ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    var initialize=function(){

      // Background --------------------------------------------------

        /* root control       */
        var bk=new root(100, null, 0, 0, width, height,
          {text:      "root",
           acolor:    CLRS.ACTIVE,
           icolor:    CLRS.INACTIVE,
           cursor:    ARROW,
           border:    false});

        app.controls.push(bk);

        /* graph        */
        bk.controls.push(new graph(110, bk, 10, 30, width-25, height-60,
          {color:     CLRS.GRAY,
           acolor:    CLRS.BLUE,
           icolor:    CLRS.RED,
           cursor:    ARROW}));

      // toolbar --------------------------------------------------
      {
        /* tlbar            */
        var tlbar=new toolbar(200, bk, 0, 0, width, 30,
          {text:      "E_Template",
           acolor:    CLRS.TOOLBARA,
           icolor:    CLRS.TOOLBARI,
           cursor:    ARROW});

        bk.controls.push(tlbar);

          /* auto-run           */
          tlbar.controls.push(new onOff(210, tlbar, 15, 15, 13, 13,
            {execute:   checkboxAuto,
             retrieve:  getAuto,
             color:     CLRS.BLACK,
             cursor:    HAND}));

          /* settings   */
          tlbar.controls.push(new settings(220, tlbar, width-25, 5, 22, 22,
            {execute:   checkboxLegend,
             retrieve:  getLegend,
             color:     CLRS.BLACK,
             cursor:    HAND}));

          /* information   */
          tlbar.controls.push(new info(230, tlbar, width-52, 5, 22, 22,
            {text:     "i",
             execute:  toggleInfo,
             retrieve: getInfo,
             color:    CLRS.SIN,
             cursor:   HAND}));
      }

      // Navigation --------------------------------------------------
      {
        var h=25;

        /* Navbar            */
        var nvbar=new navbar(300, bk, 0, height-25, width, h,
          {text:        "Navigation",
           icolor:      CLRS.INACTIVE,
           acolor:      CLRS.K_TEAL_4,
           cursor:      ARROW,
           position:    navCursor,
           recordCount: navRecordCount,
           execute:     navSetCursor});

        bk.controls.push(nvbar);

          /* Decrement Page        */
          nvbar.controls.push(new navButton(310, nvbar, 0, 0, 50, h,
            {execute:   decrementPage,
             type:      NAVIGATION.DECREMENTPAGE,
             retrieve:  navCursor,
             color:     CLRS.BLACK,
             cursor:    HAND}));

          /* Increment Page       */
          nvbar.controls.push(new navButton(320, nvbar, width-50, 0, 50, h,
            {execute:  incrementPage,
             type:     NAVIGATION.INCREMENTPAGE,
             retrieve: navCursor,
             color:    CLRS.BLACK,
             cursor:   HAND}));

          /* First Record         */
          nvbar.controls.push(new navButton(330, nvbar, 50, 0, 25, h,
            {execute:   firstRecord,
             type:      NAVIGATION.FIRST,
             retrieve:  navCursor,
             color:     CLRS.BLACK,
             cursor:    HAND}));

          /* Decrement Record     */
          nvbar.controls.push(new navButton(340, nvbar, 75, 0, 25, h,
            {execute:   decrementRecord,
             type:      NAVIGATION.DECREMENT,
             retrieve:  navCursor,
             color:     CLRS.BLACK,
             cursor:    HAND}));

          /* Increment Record     */
          nvbar.controls.push(new navButton(350, nvbar, width-100, 0, 25, h,
            {execute:  incrementRecord,
             type:     NAVIGATION.INCREMENT,
             retrieve: navCursor,
             color:    CLRS.BLACK,
             cursor:   HAND}));

          /* Last Record          */
          nvbar.controls.push(new navButton(360, nvbar, width-75, 0, 25, h,
            {execute:  lastRecord,
             type:     NAVIGATION.LAST,
             retrieve: navCursor,
             color:    CLRS.BLACK,
             cursor:   HAND}));

          /* Scroll               */
          nvbar.controls.push(new navScroll(370, nvbar, 100, 0, width-200, h,
            {execute:   navSetCursor,
             color:     CLRS.BLACK,
             cursor:    MOVE}));

      }

      // Index --------------------------------------------------
      {
        // /* index              */
        // var idx=new index(300, bk, 10, 40, 130, 225,{radius:  5,
            // color:   CLRS.WHITE,
            // cursor:  ARROW});

        // bk.controls.push(idx);

          // /* Sine button        */
          // bk.controls.push(new button(310, bk, 15, 45, 120, 20,
            // {text:     "Sin "+CONSTANTS.THETA,
             // execute:  toggleSine,
             // tag:      getSine,
             // retrieve: getSineOn,
             // color:    CLRS.SIN,
             // cursor:   HAND}));

          // /* Cosine button      */
          // bk.controls.push(new button(320, bk, 15, 65, 120, 20,
            // {text:     "Cos "+CONSTANTS.THETA,
             // execute:  toggleCosine,
             // tag:      getCosine,
             // retrieve: getCosineOn,
             // color:    CLRS.COS,
             // cursor:   HAND}));

          // /* Tangent button     */
          // bk.controls.push(new button(330, bk, 15, 85, 120, 20,
            // {text:     "Tan "+CONSTANTS.THETA,
             // execute:  toggleTangent,
             // tag:      getTangent,
             // retrieve: getTangentOn,
             // color:    CLRS.TAN,
             // cursor:   HAND}));

          // /* Cosecant button    */
          // bk.controls.push(new button(340, bk, 15, 110, 120, 20,
            // {text:     "Csc "+CONSTANTS.THETA,
             // execute:  toggleCosecant,
             // tag:      getCosecant,
             // retrieve: getCosecantOn,
             // color:    CLRS.K_PINK_0,
             // cursor:   HAND}));

          // /* Secant button      */
          // bk.controls.push(new button(350, bk, 15, 130, 120, 20,
            // {text:     "Sec "+CONSTANTS.THETA,
             // execute:  toggleSecant,
             // tag:      getSecant,
             // retrieve: getSecantOn,
             // color:    CLRS.K_PINK_2,
             // cursor:   HAND}));

          // /* Cotangent button   */
          // bk.controls.push(new button(360, bk, 15, 150, 120, 20,
            // {text:     "Cot "+CONSTANTS.THETA,
             // execute:  toggleCotangent,
             // tag:      getCotangent,
             // retrieve: getCotangentOn,
             // color:    CLRS.TAN_LT,
             // cursor:   HAND}));

          // /* Excosecant button   */
          // bk.controls.push(new button(360, bk, 15, 175, 120, 20,
            // {text:     "Excsc "+CONSTANTS.THETA,
             // execute:  toggleExcosecant,
             // tag:      getExcosecant,
             // retrieve: getExcosecantOn,
             // color:    CLRS.K_TEAL_0,
             // cursor:   HAND}));

          // /* Coversine button   */
          // bk.controls.push(new button(360, bk, 15, 195, 120, 20,
            // {text:     "Cvs "+CONSTANTS.THETA,
             // execute:  toggleCoversine,
             // tag:      getCoversine,
             // retrieve: getCoversineOn,
             // color:    CLRS.K_TEAL_2,
             // cursor:   HAND}));

          // /* Versine button   */
          // bk.controls.push(new button(360, bk, 15, 220, 120, 20,
            // {text:     "Ver "+CONSTANTS.THETA,
             // execute:  toggleVersine,
             // tag:      getVersine,
             // retrieve: getVersineOn,
             // color:    CLRS.K_BROWN_1,
             // cursor:   HAND}));

          // /* Exsecant button   */
          // bk.controls.push(new button(360, bk, 15, 240, 120, 20,
            // {text:     "Exsec "+CONSTANTS.THETA,
             // execute:  toggleExsecant,
             // tag:      getExsecant,
             // retrieve: getExsecantOn,
             // color:    CLRS.K_ORANGE_1,
             // cursor:   HAND}));
    }

      // Telemetry --------------------------------------------------
        /* Telemetry          */
        var telem=new telemetry(400, bk, width, 30, 200, 570,
          {color:     CLRS.BLACK,
           cursor:    ARROW});

        bk.controls.push(telem);

      // Loading --------------------------------------------------

        /* Splash Screen      */
        var splashScreen=new splash(500, bk, 100, 100, 400, 400,
          {color:     CLRS.BLACK,
           retrieve:  getInfo,
           cursor:    CROSS});

        bk.controls.push(splashScreen);

          /* Close              */
          splashScreen.controls.push(new button(510, splashScreen, 180, 360, 120, 20,
            {text:      "Close",
             execute:   toggleInfo,
             color:     CLRS.WHITE,
             cursor:    HAND}));

    };

    var update=function(){

      frameRate(app.frameRate);

      background(242);

      if(app.autoRun &&
         (frameCount%app.frameRate===0)){
           incrementCursor();
           app.dCursor%=app.data.length-1;
      }

      for(var c in app.controls){ app.controls[c].draw(); }

    };

    loadData();

    var execute;

    execute=update;

    initialize();

    app.keys[KEYCODES.CONTROL]=false;
    app.keys[KEYCODES.ALT]=false;
    app.keys[KEYCODES.SHIFT]=false;

    var draw=function(){

      execute();
// line(0,300,width,300);
    };

    println(sumDivisibleBy( 3, 999) +
            sumDivisibleBy( 5, 999) -
            sumDivisibleBy(15, 999));

  /* Keyboard Events ================================================== */
  {

      var keyPressed=function(){

        app.keys[keyCode]=true;

        if(app.autoRun===false){

          switch(true){

            case app.keys[KEYCODES.LEFT] &&
                 app.keys[KEYCODES.SHIFT]:    decrementPage();    break;
            case app.keys[KEYCODES.RIGHT] &&
                 app.keys[KEYCODES.SHIFT]:    incrementPage();    break;

            case app.keys[KEYCODES.LEFT] &&
                 app.keys[KEYCODES.CONTROL]:  firstRecord();      break;
            case app.keys[KEYCODES.RIGHT] &&
                 app.keys[KEYCODES.CONTROL]:  lastRecord();       break;

            case app.keys[KEYCODES.LEFT]:     decrementRecord();  break;
            case app.keys[KEYCODES.RIGHT]:    incrementRecord();  break;

            case app.keys[KEYCODES.UP]:       incrementSW();      break;
            case app.keys[KEYCODES.DOWN]:     decrementSW();      break;

            default:                                              break;

          }

        }

      };
      var keyTyped=function(){
        /* println("typed " + (key) + " " + keyCode); */
      };
      var keyReleased=function(){

        app.keys[keyCode]=false;

      };

  }

  /* Mouse Events ================================================== */
  {

    var mouseClicked=function(){

      switch(mouseButton){

        case LEFT:   for(var c in app.controls){ app.controls[c].clicked();  } break;
        // case RIGHT:  for(var c in app.controls){ app.controls[c].rClicked(); } break;
        // case CENTER: for(var c in app.controls){ app.controls[c].cClicked(); } break;

        default:     break;
      }

    };
    var mousePressed=function(){

      switch(mouseButton){

        case LEFT:    app.left=true;    break;
        case CENTER:  app.center=true;  break;
        case RIGHT:   app.right=true;   break;

        default:                        break;

      }

      for(var c in app.controls){ app.controls[c].pressed();  }

    };
    var mouseReleased=function(){

      app.left=false;
      app.right=false;
      app.center=false;

    };
    var mouseMoved=function(){

      app.mouseX=mouseX;
      app.mouseX=mouseY;

      // if(!app.autoRun){ execute(); }

      for(var c in app.controls){ app.controls[c].moved(0,0); }

    };
    var mouseDragged=function(){

      // for(var c in app.controls){ app.controls[c].dragged();  }

      switch(mouseButton){

        case LEFT:   for(var c in app.controls){ app.controls[c].dragged();  } break;
        // case RIGHT:  for(var c in app.controls){ app.controls[c].rClicked(); } break;
        // case CENTER: for(var c in app.controls){ app.controls[c].cClicked(); } break;

        default:     break;
      }

    };
    var mouseOut=function(){

      for(var c in app.controls){ app.controls[c].out(); }
      app.focus=-1;

    };
    var mouseOver=function(){

      for(var c in app.controls){ app.controls[c].over(); }
      app.focus=-2;

    };

  }






































































// 1729 = 10^3+9^3 = 12^3+1^3
}};
