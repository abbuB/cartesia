{/*

  TO DO:

    - convex hull
      - rotate to vertical
      - eliminate interior points

    - step controls for data
      - next/previous
      - play/pause
      - first/last
      ...

    - add/subtract nodes

    - display nodes
    - display working tour
    - display best tour

    - hex font
    
    - slider to change # of nodes. 0-100?
    - Tidy up elapsed timer

    - add sound based on frequency off index being swapped

    - Metrics regarding extent of points and average distance between connected points
    - other interesting metrics
    - convex hull

    - proximity swap (nodes that should be in a line with adjacent nodes)

    

  TO DONE:

    - create a circular node pattern for 100 nodes

    - add random tour mode

    - domain and range of points

    - Page Title "Travelling Salesman Problem (TSP)"

    - Furthest option button
    - closest option button
    - random option button
    
    - brute force option button
    - genetic option button
    - simulated annelaing option button
    - greedy option button
    - grow option button
    - ACO option button

    - initialize toggle checkbox
    - iterate toggle checkbox
    - crossover toggle checkbox    

    - print current tour button

  Research:

    print(getURLParams()); - test when this goes live

  Cursors:

    ARROW, CROSS, HAND, MOVE, TEXT, or WAIT

**/}

{

  {  // CONSTANTS ================================================================================

    new p5();

    // Colours ------------------------------------------------------------------
    {
      var RT          = [212,212,212,255];// var RT = [212, 212, 212, 255];
      var BG          = [255,204,  0,255];

      var MAROON      = [114, 12, 21,255];
      var MAROON_L    = [140, 15 ,26,255];

      var GRAY242     = [242,242,242,255];
      var GRAY140     = [140,140,140,255];

      var BLACK12     = [ 12, 12, 12,255];

      var WHITE242    = [242,242,242,255];

      var BACKGROUND  = WHITE242;

      var H_SHADOW    = [209,209,209,255];

      var H_BLUE      = [ 20,156,216,255];    var H_BLUE_L    = [  5,164,235,255];
      var H_BLACK     = [ 44, 47, 49,255];    var H_BLACK_L   = [ 62, 62, 62,255];
      var H_ORANGE    = [255,159,  0,255];    var H_ORANGE_L  = [255,175, 41,255];

      var GRAY        = [128,128,128,255];

      var CYAN        = [  0,255,255,255];
      var PINK        = [255, 20,147,255];

      var TEAL_0      = [ 28,117,138,255];    var TEAL_0_LT   = [ 28,117,138,128];
      var TEAL_1      = [ 41,171,202,255];    var TEAL_1_LT   = [ 41,171,202, 128];
      var TEAL_2      = [ 88,196,221,255];
      var TEAL_2_LT   = [ 88,196,221,128];
      var TEAL_3      = [156,220,235,255];    var TEAL_3_LT   = [156,220,235,128];

      var TRANSPARENT = [-1, -1, -1, 255];

      var WHITE       = 'rgb(255,255,255)';
      var BLACK       = [  0,  0,  0,255];

      var K_RED       = [170, 29, 29,255];
      var K_ORANGE    = [238,136, 15,255];
      var K_YELLOW    = [238,214, 15,255];
      var K_GREEN     = [158,182, 58,255];
      var K_BLUE      = [ 29, 86,170,255];
      var K_PURPLE    = [127,  0,255,255];

      var BROWN       = [155,145,135,255];

      var RED         = [170, 29, 29,255];   var ORANGE      = [238,136, 15,255];
      // var YELLOW = [238, 214, 15, 255]; var GREEN = [158, 182, 58, 255];
      var BLUE        = [ 29, 86,170,255];   var PURPLE      = [127,  0,255,255];

      var YELLOW      = [255,255,  0,255];
      var YELLOW_H    = [255,255,  0,128];

      // const RED           = [255,  0,  0,255]; const REDORANGE    = [255, 81,  0,255];
      // const ORANGE        = [255,127,  0,255]; const YELLOWORANGE = [255,190,  0,255];
      // const YELLOW        = [255,255,  0,255]; const YELLOWGREEN  = [192,255,  0,255];
      // const GREEN         = [  0,255,  0,255]; const BLUEGREEN    = [  0,127,127,255];
      // const BLUE          = [  0,  0,255,255]; const BLUEVIOLET   = [ 92,  0,255,255];
      // let VIOLET        = [127,  0,255,255]; let REDVIOLET    = [191,  0,127,255];
    }

    var CONSTANTS={

      DEGREES:        '°',
      PI:             'π',
      TRIANGLE_UP:    '▲',
      TRIANGLE_DOWN:  '▼',
      TRIANGLE_R:     '►',
      TRIANGLE_L:     '◄',
      INFINITY:       '∞',
      THETA:          'θ',
      RADIANS:        'ᶜ',
      IDENTICAL:      '≡',
      SIGMA:          'Σ',      
      NOTE:           '♫',
      PIPE:           '|'

    }


    const dataTest=[
                    [474,154],[504,128],[524,132],[572,164],[442,129],
                    [429,119],[428, 98],[452, 77],[476, 82],[511, 58],
                    [489, 38],[482, 33],[358, 42],[287, 46],[205, 53],
                    [230,110],[329,159],[336,198],[402,208],[448,240],
                    [461,240],[536,213],[556,241],[533,249],[483,308],
                    [478,327],[452,324],[453,354],[417,336],[374,327],
                    [382,393],[364,408],[309,379],[275,392],[268,345],
                    [248,325],[295,275],[202,212],[173,207],[183,270],
                    [195,380],[179,387],[189,401],[182,420],[224,392],
                    [249,425],[215,472],[203,553],[213,574],[224,568],
                    [284,509],[282,462],[288,447],[314,503],[323,534],
                    [339,502],[361,481],[371,465],[397,550],[424,504],
                    [442,467],[468,490],[462,503],[486,522],[499,512],
                    [501,541],[500,546],[523,560],[571,538],[684,550],
                    [686,489],[719,463],[724,447],[632,390],[625,416],
                    [627,460],[588,436],[556,440],[548,433],[515,427],
                    [490,382],[565,333],[574,325],[655,317],[673,335],
                    [675,328],[712,293],[655,259],[623,260],[619,233],
                    [645,215],[692,235],[693,198],[718,162],[693,146],
                    [673,128],[676,102],[662, 45],[584, 85],[598,121]
                  ];

    const dataCircle=[
                      [670,300],[670,316],[668,331],[666,347],[662,362],
                      [658,377],[652,392],[646,406],[639,420],[631,434],
                      [622,447],[613,459],[602,471],[591,482],[579,493],
                      [567,502],[554,511],[540,519],[526,526],[512,532],
                      [497,538],[482,542],[467,546],[451,548],[436,550],
                      [420,550],[404,550],[389,548],[373,546],[358,542],
                      [343,538],[328,532],[314,526],[300,519],[286,511],
                      [273,502],[261,493],[249,482],[238,471],[227,459],
                      [218,447],[209,434],[201,420],[194,406],[188,392],
                      [182,377],[178,362],[174,347],[172,331],[170,316],
                      [170,300],[170,284],[172,269],[174,253],[178,238],
                      [182,223],[188,208],[194,194],[201,180],[209,166],
                      [218,153],[227,141],[238,129],[249,118],[261,107],
                      [273, 98],[286, 89],[300, 81],[314, 74],[328, 68],
                      [343, 62],[358, 58],[373, 54],[389, 52],[404, 50],
                      [420, 50],[436, 50],[451, 52],[467, 54],[482, 58],
                      [497, 62],[512, 68],[526, 74],[540, 81],[554, 89],
                      [567, 98],[579,107],[591,118],[602,129],[613,141],
                      [622,153],[631,166],[639,180],[646,194],[652,208],
                      [658,223],[662,238],[666,253],[668,269],[670,284]
                    ];

  }

  function preload(){

    "use strict"; 

    // myFont = loadFont('http://fonts.googleapis.com/css?family=Walter+Turncoat&.css');

  }

  let cnv;

  function printTour(arr){

    randomizeArray(app.field.workingNodes);

    arrayCopy(app.field.workingNodes,app.field.bestNodes);
    
    return;

    let theta=0;
    let radius=250;
    let p;

    arr=[];

    for(let n=0; n<100; n++){

      p=new pnt(round(radius*cos(theta))+400, 
                round(radius*sin(theta))+300);

      arr.push(p);

      theta+=TWO_PI/100;

    }

    let s=(" let data=[\n           ");

      for(let n=1; n<=arr.length; n++){

        s+=("[" + (arr[n-1].x+20) + ","
                + arr[n-1].y + "]");

        if(n!=arr.length){
          s+=",";
        }

        if(n%5==0 &&
           n!=arr.length){
          s+="\n           ";
        }

      }

    s+="\n          ];";

    print(s);

  };

  function getCircleData(n,x,y,r){

    let theta=0;
    let radius=r;
    let p;

    arr=[];

    for(let i=0; i<n; i++){

      p=new pnt(x+round(radius*cos(theta)), 
                y+round(radius*sin(theta)));

      arr.push(p);

      theta+=TWO_PI/n;

    }

    return arr;

  };

  function setup(){

    //  Set a global reference to the canvas
    cnv=createCanvas(windowWidth-10, windowHeight-10);

    //  Settings
    frameRate(70);

    noCursor();

    textFont('sans-serif', 12);

    cursor(WAIT);

    strokeCap(SQUARE);
    strokeJoin(MITER);

    angleMode = 'radians';
    // rectMode(CORNERS);

    //  Bind events to functions
    // cnv.mouseDragged(mDragged);
    // cnv.mouseMoved(moved);
    // cnv.mousePressed(pressed);
    // cnv.mouseClicked(clicked);
    // cnv.doubleClicked(dClicked);
    // cnv.mouseReleased(released);
    // cnv.mouseOut(out);
    // cnv.mouseOver(over);

  }

  function application(){

    /* Platform Constants  -------------------- */
    {

      this.dirty          = false;    //  Has a reset occurred

      this.debug          = true;     //  Mode that displays enhanced debugging tools

      this.frameRate      = 0;        //  Refresh speed

      this.running        = false;    //  Currently solving the puzzle
      this.progress       = 0;        //  Puzzle is this % solved

      this.mouseX         = 0;        //  Current mouseX location
      this.mouseY         = 0;        //  Current mouseY location

      this.left           = false;    //  Is the left   mouse button pressed
      this.right          = false;    //  Is the right  mouse button pressed
      this.center         = false;    //  Is the center mouse button pressed
      
      this.control        = false;    //  Is the CONTROL key pressed
      this.alt            = false;    //  Is the ALT key pressed
      this.shift          = false;    //  Is the SHIFT key pressed

      this.dragStartX     = 0;
      this.dragStartY     = 0;

      this.dragging       = false;    //  Is the mouse cursor moving and the left button pressed?

      // this.dragDirection  = DRAG_DIRECTIONS.NONE;

      this.focus          = null;     //  The control with focus

      this.controls       = [];       //  Collection of controls in the app
      this.controlCount   = 0;

      this.keys           = [];       //  Array holding the value of all KeyCodes

      this.fullscreen     = false;    //  Is the display set to take up the entire screen ie. No Chrome

      this.info = 0;                //  Is the info frame displayed
      this.telemetry      = false;    //  Is telemetry visible

      this.startTime      = millis();

      this.elapsedTime    = 0;

    }

    /* TSP Specific       ------------------ */
    {

      this.loadMethod   = LOAD_MODES.RANDOM;

      // this.greedy_mode  = GREEDY_MODES.CLOSEST;
      // this.greedy_mode = GREEDY_MODES.FARTHEST;
      this.greedy_mode = GREEDY_MODES.RANDOM;

      // this.algorithm    = ALGORITHMS.GROW;
      // this.algorithm    = ALGORITHMS.GREEDY;
      // this.algorithm    = ALGORITHMS.BRUTEFORCE;
      // this.algorithm    = ALGORITHMS.SIMULATEDANNEALING;
      // this.algorithm    = ALGORITHMS.ACO;
      // this.algorithm    = ALGORITHMS.GENETIC;
      this.algorithm    = ALGORITHMS.CONVEXHULL;

      this.initialize       = false;

      this.crossover        = false;
      this.iterate          = false;
      this.proximity        = false;

      this.drawBestPath     = false;
      this.drawWorkingPath  = true;
      this.drawPathNodes    = true;

      this.dataMode         = DATA_MODES.RANDOM;
      // this.dataMode     = DATA_MODES.TEST;
      // this.dataMode     = DATA_MODES.CIRCLE;

      this.tourLength       = 300;                //  Total # of nodes to be connected

      this.menu;
      this.clock;
      this.music;
      this.reset;

      this.musicOn          = true;

      this.finished         = false;

      // this.animations     = [];

      this.currentNode      = null;

      this.field            = null;

    }

  };

  let app=new application();

  /* Utility Functions ===================================================== */
  {

    /** Misc            ---------------------------------------------------- */
    {

      let controlCount = -1;

      function getGUID(){ controlCount++; return controlCount; };

      function getPuzzleNumber(){ return app.levelText[app.puzzle / 2]; };

      // function iRandom(n)           { return round(random(n));                                         };

      function getColor(clr, alpha) { return color(red(clr), green(clr), blue(clr), alpha / 100 * 255); };

      function getInfo()          { return app.info;                    };
      function toggleInfo()       { app.info = !app.info;               };

      function getTelemetry()     { return app.telemetry;               };
      function toggleTelemetry()  { app.telemetry = !app.telemetry;     };

      function toggleCreate()     {                                     };

      function getMusic()         { return app.musicOn;                 };
      function setMusic(b)        { return app.musicOn = b;             };

      function getScore()         { return app.score;                   };
      function setScore(b)        { return app.score = b;               };

      function clickTest(n)       { print('click: ' + n);               };

      function getRunning()       { return app.running;                 };
      function toggleRunning()    { app.running=!app.running;           };

      function getInitialize()    { return app.initialize;              };
      function toggleInitialize() { app.initialize=!app.initialize;     };

      function getCrossover()     { return app.crossover;               };
      function toggleCrossover()  { app.crossover=!app.crossover;       };

      function getIterate()       { return app.iterate;                 };
      function toggleIterate()    { app.iterate=!app.iterate;           };

      function getProximity()     { return app.proximity;               };
      function toggleProximity()  { app.proximity=!app.proximity;       };

      function getBestPath()      { return app.drawBestPath;            };
      function toggleBestPath()   { app.drawBestPath=!app.drawBestPath; };

      function getWorkingPath()   { return app.drawWorkingPath;         };
      function toggleWorkingPath(){ app.drawWorkingPath=!app.drawWorkingPath; };
      
      function getPathNodes()     { return app.drawPathNodes;                 };
      function togglePathNodes()  { app.drawPathNodes=!app.drawPathNodes;     };

      function getMethod()        { return app.greedy_mode;             };
      function setMethod(m)       {

        if(app.greedy_mode!=m){

          app.greedy_mode=m;

          if(app.algorithm==ALGORITHMS.GREEDY){
            app.field.reset();
          }

        }

      };

      function getDataMode()      { return app.dataMode;                };
      function setDataMode(m)     {

        if(app.dataMode!=m){

          app.dataMode=m;
          app.field.reset();

        }

      };

      function setAlgorithm(a)    {

        if(app.algorithm!=a){
        
          app.algorithm=a;
          app.field.reset();

        }

        print(a);

      };
      function getAlgorithm()     { return app.algorithm;               };

      function setNodes(n)        {
        
        app.tourLength=constrain(round(n),10,200);
        app.field.reset();

      };
      function getNodes()         { return app.tourLength; };

      function incrementNodes()   {
        
        app.tourLength++;
        app.field.reset();

      };
      function decrementNodes()   {
        
        if(app.tourLength>10){
          
          app.tourLength--;
          app.field.reset();

        }
        
      };

      function menu(){ };

      function getRandomInt(n)    { return round(random(n)) };

    }

    function reset(){

      app.controlCount=app.controls.length+1;
      app.field.reset();
      app.startTime=millis();
      app.elapsedTime=0;
      app.running=false;

      console.clear();
      
    };

    function factorial(n){

      let total=1;

      for (let i=2; i<=n; i++) {
        total*=i;
      }

      return total;

    };

  }

  /** Control - default ------------------------------------------------ */
  {

    function control(id, parent, x, y, w, h) {

      // app.controlCount++;

      /* explicit properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
      this.id       = id;           /** Unique identification number --
                                        Change to GUID for production)        */
      this.parent   = parent;       /** parent control (acts as a container)  */

      this.x        = x;            /** left                                  */
      this.y        = y;            /** top                                   */
      this.w        = w;            /** width                                 */
      this.h        = h;            /** height                                */

      /* inherent properties ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
      this.controls = [];           /** array of child controls               */

      this.on       = false;        /** is the control on or off              */
      this.hit      = false;        /** mouse is over the control             */
      this.cursor   = ARROW         /** cursor when mouse is over the control */
      this.visible  = true;         /** is the control currently displayed    */

      this.active   = false;        /** active = hit and focus and visible    */
      this.offset   = 0;            /** offset distance when clicked          */

      this.font     = 'sans-serif'; /** default font                          */
      this.timer    = 0;            /** Used to count things - frames etc.    */
      this.value    = 0;

    };
    control.prototype.draw = function (){ };
    control.prototype.hitTest = function (x, y) {

      let retVal = false;

      if (mouseX >= (this.x + x) &&
        mouseX <= (this.x + x) + this.w &&
        mouseY >= (this.y + y) &&
        mouseY <= (this.y + y) + this.h) {
        retVal = true;
      }

      return retVal;

    };
    control.prototype.moved = function (x, y) {

      if (this.hitTest(x, y)) {

        if (this.parent.hit) {

          this.hit = true;
          app.focus = this;

          for (let c in this.controls) { this.controls[c].moved((this.x + x), (this.y + y)); }

        }

      }
      else {

        this.hit = false;

        for (let c in this.controls) { this.controls[c].hit = false; }

      }

    };
    control.prototype.clicked = function (){ if (this.hit) { forEach(this.controls, 'clicked'); } };
    control.prototype.rclicked = function (){ if (this.hit) { forEach(this.controls, 'rclicked'); } };
    control.prototype.pressed = function (){ };
    control.prototype.dragged = function (){ };
    control.prototype.released = function (){ };
    control.prototype.over = function (){ };
    control.prototype.out = function (){ this.hit = false; forEach(this.controls, 'out'); };
    control.prototype.resized = function (){ forEach(this.controls, 'resized'); };
    // control.prototype.typed=function(){};
    // control.prototype.cClicked=function(){};

  }

  /* Containers ======================================================== */
  {

    /** root            -------------------------------------------------- */
    {
      /* Identical to a container control except is doesn't have a parent */
      function root(id, x, y, w, h, props) {

        control.call(this, id, null, x, y, w, h);

        this.color  = props.color;
        this.border = props.border;
        this.cursor = props.cursor;

      };
      root.prototype = Object.create(control.prototype);
      root.prototype.draw=function(){

        this.active=this.hit &&
                    app.focus== this;

        push();

          translate(this.x, this.y);

          if(this.active){
            cursor(this.cursor);
          }

          noStroke();
          fill(this.color);

          if(this.border &&
             this.active){

            strokeWeight(0.25);
            stroke(0);

          }

          rect(0, 0, this.w, this.h, 1);

          forEach(this.controls, 'draw');

        pop();

      };
      root.prototype.moved=function(x, y){
        /* Required because root control doesn't have a parent */

        if(this.hitTest(this.x+x, this.y+y)){

          this.hit=true;
          app.focus=this;

          for(let c in this.controls) { this.controls[c].moved(this.x + x, this.y + y); }

        }
        else{

          this.hit=false;

          for(let c in this.controls){ this.controls[c].hit = false; }

        }

      };
      root.prototype.resized=function(){

        this.w=windowWidth-20;
        this.h=windowHeight-20;

        forEach(this.controls, 'resized');

      };
      root.prototype.dragged=function(){

        forEach(this.controls, 'dragged');

      };

    }

    /** Telemetry       -------------------------------------------------- */
    {

      function telemetry(id, parent, x, y, w, h, props) {

        control.call(this, id, parent, parent.w - w, y, w, h);

        this.color = props.color;

      };
      telemetry.prototype = Object.create(control.prototype);
      telemetry.prototype.draw = function (){

        if (app.debug === false) { return; }

        let p = this;

        this.active = this.hit &&
          app.focus === this;

        if (this.active) { cursor(this.cursor); }

        function border(){

          fill(24);
          stroke(64);
          strokeWeight(0.5);

          if(p.hit){
            // fill(getColor(p.color, 70));
          }

            rect(p.offset, 0, p.w, p.h, 1);

        };
        function title(){

          textAlign(CENTER, CENTER);
          textSize(14);

          fill(WHITE);

          text('Telemetry', p.w / 2 + p.offset, 20);

        };
        function environment(){

          noStroke();
          fill(getColor(p.color, 50));

          // rect(p.offset + 10, 10, p.w - 20, 385, 3);

          textAlign(LEFT, TOP);
          textSize(10);
          textLeading(12);

          fill(getColor(TEAL_2, 75));

            text(                       '\n'               +
                'Cursor Coordinates' + '\n\n\n\n'         +
                'Mouse Buttons'      + '\n\n\n\n\n\n\n\n' +
                'Keys'               + '\n\n\n\n\n'       +
                'Environment',
                col0, row0);

          fill(getColor(WHITE, 75));

            text(                    '\n\n'   +
                 'x:'              + '\n'     +
                 'y:'              + '\n\n\n' +
                 'Left:'           + '\n'     +
                 'Right:'          + '\n'     +
                 'Center:'         + '\n\n'   +
                 'Dragging:'       + '\n'     +
                 'Drag Direction:' + '\n\n\n' +
                 'Control:'        + '\n'     +
                 'Alt:'            + '\n'     +
                 'Shift:'          + '\n\n\n' +
                 'Canvas Width:'   + '\n'     +
                 'Canvas Height:'  + '\n\n'   +
                 'Window Width:'   + '\n'     +
                 'Window Height:'  + '\n\n'   +
                 'Display Width:'  + '\n'     +
                 'Display Height:' + '\n\n'   +
                 'Focused:'        + '\n\n'   +
                 'Frame Count:'    + '\n'     +
                 'Frame Rate:',
                 col1, row0+5);

          fill(getColor(YELLOW, 75));
          textAlign(RIGHT, TOP);

            text(                    '\n\n'   +
                 mouseX            + '\n'     +
                 mouseY            + '\n\n\n' +
                 app.left          + '\n'     +
                 app.right         + '\n'     +
                 app.center        + '\n\n'   +
                 app.dragging      + '\n'     +
                 app.dragDirection + '\n\n\n' +
                 app.control       + '\n'     +
                 app.alt           + '\n'     +
                 app.shift         + '\n\n\n' +
                 width             + '\n'     +
                 height            + '\n\n'   +
                 windowWidth       + '\n'     +
                 windowHeight      + '\n\n'   +
                 displayWidth      + '\n'     +
                 displayHeight     + '\n\n'   +
                 focused           + '\n\n'   +
                 frameCount        + '\n'     +
                 nf(app.frameRate, 1, 1),
                 col2, row0+5);

        };
        function appSpecific(){

          let top = 405;

          fill(getColor(p.color, 50));

          // rect(p.offset + 10, top, p.w - 20, p.h - 415, 3);

          textAlign(LEFT, TOP);
          textSize(10);
          textLeading(12);

          fill(getColor(TEAL_2, 75));

          let txt=             '\n'       +
                  'Controls' + '\n\n\n\n' +
                  'Score'    + '\n\n\n\n' +
                  'Misc';
          
            text(txt,col0, top);

          fill(getColor(WHITE, 75));

          txt=               '\n\n'   +
              'Count:'     + '\n'     +
              'Active:'    + '\n\n\n' +
              'Remaining:' + '\n'     +
              'Mistakes:'  + '\n\n\n' +
              'Music:'     + '\n'     +
              'Level:';
                  
            text(txt,col1, top+5);

          fill(getColor(YELLOW, 75));
          textAlign(RIGHT, TOP);

          let id = -1;

          // if(app.focus!==null){ id=app.focus.id; }

          if(app.currentNode !== null){
            id=app.currentNode.id;
          }

          txt=                   '\n\n'   +
              app.controlCount + '\n'     +
              id               + '\n\n\n' +
              app.remaining    + '\n'     +
              app.errors       + '\n\n\n' +
              app.musicOn      + '\n'     +
              app.level;

            text(txt, col2, top+5);

        };

        if     ( app.telemetry && this.offset>-200){ this.offset-=10; }
        else if(!app.telemetry && this.offset<0   ){ this.offset+=10; }

        let row0 = 5;
        let row1 = 90;

        let col0 = this.offset + 20;
        let col1 = this.offset + 25;
        let col2 = this.offset + 170;

        push();

        translate(this.x+0.5, this.y+0.5);

        border();
        // title();
        environment();
        appSpecific();

        pop();

      };
      telemetry.prototype.moved = function (x, y) {
        /* Overridden because of the dynamic x-coordinate offset */

        // if(app.telemetry===false &&
        // this.offset===0){ return; }

        if (this.parent.hit) {

          if (this.hitTest(x + this.offset, y)) {

            this.hit = true;
            app.focus = this;

            // for(let c in this.controls){ this.controls[c].moved(this.x+x+this.offset, this.y+y); }

          }
          else {

            this.hit = false;

            // for(let c in this.controls){ this.controls[c].hit=false; }

          }

        }

      };
      telemetry.prototype.resized = function (){

        this.x = this.parent.w - this.w;
        this.h = this.parent.h - 10;

      };

    }

    /** Array Functions -------------------------------------------------- */
    {

      let completePercent = 0;

      function swap(arr, n, m){

        let tmp=arr[n];

        arr[n]=arr[m];
        arr[m]=tmp;

      };

      function sortNodesByIndex(arr){

        for(let i=0; i<arr.length; i++){
          for (let j=0; j<arr.length; j++){

            if(abs(arr[j].id)>abs(arr[i].id)){
              swap(arr, i, j);
            }

          }
        }

        // return arr;

      };

      function arraySort(arr){
        // Sorts left to right base on x coordinate

        for(let i=0; i<arr.length; i++){
          for(let j=0; j<arr.length; j++){

            if(arr[j].x>arr[i].x){
              swap(arr, i, j);
            }

          }
        }

      };

      function calculateConvexHull(arr, ind){

        let m=Infinity;
        let maxM=-Infinity;
        let maxIndex=-Infinity;

        for(let n=0; n<arr.length; n++){

          print(arr[n].x + "," + arr[n].y + "     -    " + degrees(atan2(arr[n].y, arr[n].x)));

        }

        print("Max Slope: " + maxM);
        print("Max Index: " + maxIndex);

        return maxIndex;

      };
      function getLongest(arr){

        let distance=-1;
        let max=-1;
        let id=-1;

        for(let i=0; i<arr.length-1; i++){

          distance=dist(arr[i].x, arr[i].y,
                        arr[i+1].x, arr[i + 1].y);

          if(distance>max){
            max=distance;
            id=i;
          }

        }

        return id;

      };

      function sortByLength(arr){

        let sorted=[];

        arrayCopy(arr, sorted);

        for(let i=0; i<sorted.length-1; i++){

          sorted[i].distance=dist(sorted[i].x,     sorted[i].y,
                                  sorted[i + 1].x, sorted[i + 1].y);

        }

        for(let i=0; i<sorted.length; i++){
          for(let j=0; j<sorted.length-1; j++){

            if(sorted[i].distance>sorted[j].distance){
              swap(sorted, i, j);
            }

          }
        }

        return sorted[0].id;

        // print(sorted[0].distance + ", " + sorted[sorted.length-1].distance);
        // let limit=ceil(pow(arr.length,1/2));  // Limit to the square root of the # of nodes

        // for(let m=1; m<limit+1; m++){
        //   nod.closest.push(sorted[m]);  
        // }

      };
      function sortByX(arr){

        for(let i=0; i<arr.length; i++){
          for(let j=0; j<arr.length-1; j++){

            if(arr[i].x>arr[j].x){
              swap(arr, i, j);
            }

          }
        }

      };
      function sortByY(arr){

        for (let i=0; i<arr.length; i++){
          for (let j=0; j<arr.length-1; j++){

            if(arr[i].y>arr[j].y){
              swap(arr, i, j);
            }

          }
        }

      };
      function sortByLongest(arr){

        for(let i=0; i<arr.length-1; i++){

          arr[i].distance=dist(arr[i].x, arr[i].y,
                              arr[i + 1].x, arr[i + 1].y);

        }

        for(let i=0; i<arr.length; i++){
          for(let j=0; j<arr.length-1; j++){

            if(arr[i].distance>arr[j].distance){
              swap(arr, i, j);
            }

          }
        }

      };

      function renumberNodes(arr){

        for(let n=0; n<arr.length; n++) {
          arr[n].id = n;
        }

      };

      function randomizeArray(arr){

        for(let n=0; n<arr.length; n++) {
          swap(arr, n, round(random(arr.length-1)));
        }

      };

    }

    /** Field        -------------------------------------------------- */
    {

      {  // Misc

        function contains(arr, i){

          let retVal=false;

          for(let n=0; n<arr.length; n++){

            if(arr[n].id=i){
              retVal=true;
              break;
            }

          }

          return retVal;

        };

        function getTourLength(arr){

          let len=0;

          for(let n=0; n<arr.length; n++){

            if(n==arr.length-1){
              len+=dist(arr[0].x,
                        arr[0].y,
                        arr[arr.length - 1].x,
                        arr[arr.length - 1].y);
            }
            else{
              len+=dist(arr[n].x,
                        arr[n].y,
                        arr[n + 1].x,
                        arr[n + 1].y);
            }

          }

          return len;

        };

        function resortNodes(arr){
          // print(arr);
          let tempArray=[];

          tempArray[p.workingNodes.length];

          arrayCopy(p.workingNodes, tempArray);

          for(let n=0; n<arr.length; n++){
            tempArray[n]=p.workingNodes[arr[n]];
          }

          arrayCopy(tempArray, p.workingNodes);

        };
        
        // function reverseNodes(arr){

        //   let newArray=[];
        //   let id=0;

        //   for(let n=0; n<arr.length; n++){

        //     newArray.push(arr[arr.length-1-n]);
        //     // newArray[n].id=id;
        //     id++;

        //   }

        //   arrayCopy(newArray, arr);

        //   // return arr;

        // };

        function reverseNodes(arr, index1, index2){

          if(index1>index2){
            let temp=index2;
            index2=index1;
            index1=temp;
          }

          while(index1!=index2){

            if(index1>index2){ break; }

            // print(index1 + ","+index2);
            swap(arr, index1, index2);
            index1++;
            index2--;

          }

        };

        function swapByIndex(arr, n, m){

          swap(arr, n, m);

        }
        function swap2Length(arr, id){

          let rand1=id;
          let rand2=id;

          if(rand2>arr.length-1){
            rand2=0;
          }

          //  First Point
          while(rand2==rand1){
            rand2=round(random(arr.length-1));
          }

          swap(arr, id, arr[rand2].id);

        };
        function swap2Closest(arr){

          let tmp;
          let max=arr[0].closest.length-1;

          let rand0=round(random(max));

          let nod=arr[rand0];

          let rand1=round(random(max));
          let rand2=round(random(max));

          while(rand2==rand1){
            rand2=round(random(arr[rand0].closest.length-1));
          }

          rand1=nod.closest[rand1].id;
          rand2=nod.closest[rand2].id;

          swap(arr, rand2, rand1);

        };

        function swap2Random(arr){

          let tmp;
          let rand1=round(random(arr.length-1));
          let rand2=round(random(arr.length-1));

          while(rand2==rand1){
            rand2=round(random(arr.length-1));
          }

          swap(arr, rand1, rand2);

        };
        function swap2Consecutive(arr){

          let tmp;
          let rand1=round(random(arr.length-1));
          let rand2=rand1+1;

          if(rand2>=arr.length){
            rand2=0;
          }

          tmp=arr[rand1];

          arr[rand1]=arr[rand2];
          arr[rand2]=tmp;

        };
        function swap3Random(arr){

          let tmp;
          let rand1=round(random(arr.length-1));
          let rand2=round(random(arr.length-1));
          let rand3=round(random(arr.length-1));

          while(rand2==rand1){
            rand2=round(random(arr.length-1));
          }

          while(rand3==rand1 ||
            rand3==rand2){
            rand3=round(random(arr.length-1));
          }

          tmp=arr[rand1];

          arr[rand1]=arr[rand2];
          arr[rand2]=arr[rand3];
          arr[rand3]=tmp;

        };
        function swap3Consecutive(arr){

          let tmp;
          let rand1=round(random(arr.length-1));
          let rand2=rand1+1;

          if(rand2>=arr.length){
            rand2=0;
          }

          let rand3=rand2+1;

          if(rand3>=arr.length) {
            rand3=0;
          }

          tmp=arr[rand1];

          arr[rand1]=arr[rand2];
          arr[rand2]=arr[rand3];
          arr[rand3]=tmp;

        };
        function swap2Half(arr){

          let tmp;
          let rand1=round(random(arr.length-1));
          let rand2=rand1+1;

          if(rand2>=arr.length){
            rand2=0;
          }

          let rand3=round(random(arr.length-1));

          while(rand3==rand1 || rand3==rand2){
            rand3=round(random(arr.length-1));
          }

          tmp=arr[rand1];

          arr[rand1]=arr[rand2];
          arr[rand2]=arr[rand3];
          arr[rand3]=tmp;

        };
        function swap2Segments(arr, n){

          let tmp;
          let index1=n;
          let index2=index1+1;
          let index3=index2+1;

          if     (index2==arr.length  ){ index2=0; }
          else if(index2==arr.length+1){ index2=1; }

          index3=index2+1;

          if      (index3==arr.length  ){ index3=0; }
          else if (index3==arr.length+1){ index3=1; }

          tmp=arr[index1];

          arr[index1]=arr[index2];
          arr[index2]=arr[index3];
          arr[index3]=tmp;

          // print(index1 + ","+index2+","+index3);
        };

      }

      var increment = 0;
      let completed = false;

      // let HEX_SIZE  = 0;

      function field(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        
        app.field           = this;       //  Set a global field reference

        
        /* ------------------------------------------------- */
        this.color          = props.color;

        /* ------------------------------------------------- */

        this.dirty          = false;      //  Has the field been clicked yet?

        this.running        = false;

        // ----------

        this.tours          = [];         //  An array of tours

        this.nodes          = [];         //  Original array of nodes

        this.bestNodes      = [];         //  Shortest path so far
        this.workingNodes   = [];         //  Path used to experiment

        this.hullNodes      = [];         // Candidate Convex Hull nodes

        this.intersections  = [];         //  node couples that intersect

        this.segments       = [];         //  array of segments

        this.minX           = 0;
        this.maxX           = 0;
        this.minY           = 0;
        this.maxY           = 0;

        this.domain         = 0;
        this.range          = 0;

        // ----------

        this.originalLength = Infinity;   //  Length of original path
        
        this.workingLength  = Infinity;   //  Length of path being tested
        this.minimumLength  = Infinity;   //  Current minimum tour length

        this.greedyLength   = Infinity;   //  Length of Greedy Path

        this.factor         = 1.1;        //  Simulated Annealing factor for accepting longer tours

        this.bfSwitch       = false;      //  Brute Force Switch

        this.loaded         = false;      //  Generic switch to use for each Method

        this.index          = 0;          //  Generic index used to iterate
        this.proxIndex = 0;          //  Current index used to iterate proximity swaps

        this.length         = 0;          //  Current length of greedy array as it's displayed incrementally

        this.reset();                     //  Loads the default settings

        // this.startX         = 0;          //  x-coordinate of drag start
        // this.startY         = 0;          //  y-coordinate of drag start

        // this.deltaX         = 0;          //  x-coordinate drag offset
        // this.deltaY         = 0;          //  y-coordinate drag offset

        // this.deltaDrag      = 0;          //  Distance dragged from start point along the drag direction


      };
      field.prototype=Object.create(control.prototype);
      field.prototype.reset=function(){

        let p=this;                 //  Set a reference to the field control

        // p.controls          = [];   //  Clear the controls array

        p.tours             = [];   //  Array of multiple tours as necessary

        p.nodes             = [];   //  Original nodes as loaded
        p.workingNodes      = [];   //  Array used to test various tour orders
        p.bestNodes         = [];   //  Array of current minimum tour length

        p.intersections     = [];

        if(app.algorithm!=ALGORITHMS.ACO){
          p.segments=[];
        }

        p.originalLength    = Infinity;
        p.workingLength     = Infinity;
        p.minimumLength     = Infinity;
        p.greedyLength      = Infinity;

        p.factor            = 1.1;
        p.loaded            = false;

        completed           = false;
        
        p.length            = 0;

        p.minX              = Infinity;
        p.maxX              = 0;

        p.domain            = p.maxX-p.minX;

        p.minY              = Infinity;
        p.maxY              = 0;

        p.range             = p.maxY-p.minY;

        function load(){

          let x=0;
          let y=0;

          let arr=[];

          if(app.dataMode==DATA_MODES.CIRCLE){

            arr=getCircleData(app.tourLength,
                              p.x+(p.w)/2+65,
                              p.y+(p.h)/2,
                              p.w/2-100);
          };

          for(let n=0; n<app.tourLength; n++){

            switch(app.dataMode){

              case DATA_MODES.RANDOM: x=floor(random(150, p.w-20));
                                      y=floor(random( 20, p.h-100));
                                      break;

              case DATA_MODES.TEST:   x=dataTest[n][0];
                                      y=dataTest[n][1];
                                      break;

              case DATA_MODES.CIRCLE: x=arr[n].x;
                                      y=arr[n].y;
                                      break;

              default:                break;

            }

            p.nodes.push(new node(n,
                                  this,
                                  x, y,
                                  5, 5,
                                  { cursor: HAND })
                        );
          }

        };

        load();

        function sortByDistance(arr, nod){

          let sorted=[];

          arrayCopy(arr, sorted);

          for(let i=0; i<sorted.length; i++){

            sorted[i].distance=dist(nod.x, nod.y, sorted[i].x, sorted[i].y);

          }

          for(let i=0; i<sorted.length; i++){
            for(let j=0; j<sorted.length-1; j++){

              if(sorted[i].distance<sorted[j].distance){
                swap(sorted, i, j);
              }

            }
          }

          // let limit=ceil(pow(arr.length,1/2))+2;  // Limit to the square root of the # of nodes
          let limit=app.tourLength;

          for(let m=1; m<limit; m++){
            nod.closest.push(sorted[m]);
          }

        };

        function loadClosestNodes(){

          for(let n=0; n<p.nodes.length; n++){
            sortByDistance(p.nodes, p.nodes[n]);
          }

        };

        loadClosestNodes();

        arrayCopy(p.nodes,p.bestNodes);

        this.dirty=false;

      };
      field.prototype.draw=function()       {

        let p=this;

        p.active=p.hit &&
                 app.focus==this;

        if(p.active){ cursor(p.cursor); }

        function drawNodes(nodes){

          forEach(nodes, 'draw');

        };
        function drawPath(nodes, length){

          stroke(128,128);
          strokeWeight(1.5);
          noFill();
          fill(0,0,0,64);

          beginShape();

            for(let n=0; n<length; n++){
              vertex(nodes[n].x, nodes[n].y);              
            }

          endShape(CLOSE);

        };
        function drawBestPath(){

          // strokeJoin(MITER);
          // strokeJoin(BEVEL);
          strokeJoin(ROUND);

          strokeCap(SQUARE);
          // strokeCap(ROUND);
          // strokeCap(PROJECT);

          stroke(0,255,255,96);
          strokeWeight(5);
          noFill();
          fill(0,0,0,64);
          
          let arr=p.bestNodes;

          beginShape();
          // beginContour();

            for(let n=0; n<arr.length; n++){
              vertex(arr[n].x, arr[n].y);
            }

          // endContour(CLOSE);
          endShape(CLOSE);

        };
        function drawHullPath(){

          stroke(getColor(BLUE,50));
          strokeWeight(5);
          noFill();
          
          let arr=p.hullNodes;

          beginShape();

            for(let n=0; n<arr.length; n++){
              vertex(arr[n].x, arr[n].y);
            }

          endShape(CLOSE);

        };

        function findClosestNode(arr, nod){

          let min=Infinity;
          let distance=Infinity;
          let index=-1;

          for(let n=0; n<arr.length; n++){

            distance=dist(nod.x, nod.y, arr[n].x, arr[n].y);

            if(distance<min &&
               distance!=0 &&
               arr[n].dirty==false){

              min=distance;
              index=n;

            }

          }

          return arr[index];

        };
        function getClosestArray(startNode){

          let closestNodes=[];

          // Start with the first node
          let nod=p.nodes[startNode];

          while(nod!=null){

            // Find the node closest that isn't already taken
            nod=findClosestNode(p.nodes, nod);

            if(nod!=null){
              nod.dirty=true;
              closestNodes.push(nod);
            }

          }

          //  Indicate that Find Closest was used initially
          // p.loaded=true;

          return closestNodes;

        };

        function updateTour(){

          p.workingLength=getTourLength(p.workingNodes);

          if(p.workingLength<p.minimumLength){

            p.minimumLength=p.workingLength;

            arrayCopy(p.workingNodes,p.bestNodes);

          }

        };

        function iterate(){

          arrayCopy(p.bestNodes, p.workingNodes);
          
          let index1=p.index;
          let index2=index1+1;
          let index3=index2+1;
          let index4=index3+1;

          if     (index2>p.workingNodes.length-1){ index2=0; }

          if     (index3>p.workingNodes.length-1){ index3=0; }
          else if(index3>p.workingNodes.length  ){ index3=1; }

          if     (index4>p.workingNodes.length-1){ index4=0; }
          else if(index4>p.workingNodes.length)  { index4=1; }
          else if(index4>p.workingNodes.length+1){ index4=2; }

          swap(p.workingNodes, index1, index2);
          updateTour();

          swap(p.workingNodes, index1, index3);
          updateTour();

          swap(p.workingNodes, index1, index4);
          updateTour();

          swap(p.workingNodes, index2, index3);
          updateTour();

          swap(p.workingNodes, index2, index4);
          updateTour();

          swap(p.workingNodes, index3, index4);
          updateTour();

          p.index++;

          if(p.index>p.bestNodes.length-1) { p.index=0; }

        };

        function proximityShift(i,arr){

          function getDistance(p0,p1,p2){

            return dist(p0.x,p0.y,
                        p1.x,p1.y) +
                   dist(p0.x, p0.y,
                        p2.x,p2.y);
          };

          let p0=arr[i];
          let p1=Infinity;
          let p2=Infinity;

          if     (i==0)           { p1=arr[arr.length-1];
                                    p2=arr[1];            } // First node in the array
          else if(i==arr.length-1){ p1=arr[i-1];
                                    p2=arr[0];            } // Last node in the array
          else                    { p1=arr[i-1];
                                    p2=arr[i+1];          }

          let currentDistance=getDistance(p0,p1,p2);
          let newDistance=Infinity;
          let p3=Infinity;
          let p4=Infinity;

          for(let n=0; n<arr.length; n++){

            if(abs(n-i)>3){

// print(abs(n-i));

              if(p0.id!=p1.id &&
                 p0.id!=p2.id &&
                 p1.id!=p2.id){

                p3=arr[n];

                if(n==arr.length-1){ p4=arr[0];   }
                else               { p4=arr[n+1]; }

                newDistance=getDistance(p0,p3,p4);

                if(p0.id!=p3.id &&
                   p0.id!=p4.id &&
                   p3.id!=p4.id){

                  if(newDistance<currentDistance){

                    let newArray=[];

                    arrayCopy(p.workingNodes, newArray);

                    let moveNode=p.workingNodes[p0.id];

                    newArray.splice(moveNode.id,1);
                    newArray.splice(p4.id,0,moveNode);

                    if(getTourLength(newArray)<p.workingLength){
                      print(p0.id + " - " + p3.id + " - " + p4.id);
                      arrayCopy(newArray, p.workingNodes);

                    }

                  }

                }
                
              }

            }

          }

        }

        { // intersections

          function IsOnSegment(xi, yi, xj, yj, xk, yk) {

            return (xi<=xk || xj<=xk) && (xk<=xi || xk<=xj) &&
                   (yi<=yk || yj<=yk) && (yk<=yi || yk<=yj);

          };

          function ComputeDirection(xi, yi, xj, yj, xk, yk) {

            let a=(xk-xi)*(yj-yi);
            let b=(xj-xi)*(yk-yi);

            return a<b ? -1 : a>b ? 1 : 0;

          };

          /** Do line segments (x1, y1)--(x2, y2) and (x3, y3)--(x4, y4) intersect? */
          function DoLineSegmentsIntersect(node1, node2, node3, node4) {

            let d1=ComputeDirection(node3.x, node3.y, node4.x, node4.y, node1.x, node1.y);
            let d2=ComputeDirection(node3.x, node3.y, node4.x, node4.y, node2.x, node2.y);
            let d3=ComputeDirection(node1.x, node1.y, node2.x, node2.y, node3.x, node3.y);
            let d4=ComputeDirection(node1.x, node1.y, node2.x, node2.y, node4.x, node4.y);

            return (((d1>0 && d2<0) || (d1<0 && d2>0)) &&
                    ((d3>0 && d4<0) || (d3<0 && d4>0))) ||
                     (d1==0 && IsOnSegment(node3.x, node3.y, node4.x, node4.y, node1.x, node1.y)) ||
                     (d2==0 && IsOnSegment(node3.x, node3.y, node4.x, node4.y, node2.x, node2.y)) ||
                     (d3==0 && IsOnSegment(node1.x, node1.y, node2.x, node2.y, node3.x, node3.y)) ||
                     (d4==0 && IsOnSegment(node1.x, node1.y, node2.x, node2.y, node4.x, node4.y));

          };

          function calculateIntersections(){

            p.intersections=[];

            let node1;
            let node2;
            let node3;
            let node4;

            for(let a=0; a<p.workingNodes.length; a++){

              node1=p.workingNodes[a];

              if(a==p.workingNodes.length-1){ node2=p.workingNodes[0];   }
              else                          { node2=p.workingNodes[a+1]; }

              for(let b=0; b<p.workingNodes.length; b++){

                node3=p.workingNodes[b];

                if(b==p.workingNodes.length-1){ node4=p.workingNodes[0];   }
                else                          { node4=p.workingNodes[b+1]; }

                if(node1.id!=node3.id &&
                   node1.id!=node4.id &&
                   node2.id!=node3.id &&
                   node2.id!=node4.id){

                  if(DoLineSegmentsIntersect(node1, node2, node3, node4)){

                    if(node1.id>node2.id){ p.intersections.push(node2);
                                           p.intersections.push(node1); }
                    else                 { p.intersections.push(node1);
                                           p.intersections.push(node2); }

                    if(node3.id>node4.id){ p.intersections.push(node4);
                                           p.intersections.push(node3); }
                    else                 { p.intersections.push(node3);
                                           p.intersections.push(node4); }
                  }

                }

              }

            }

            completed=true;

          };

        }

        { // Genetic
          
          function genetic(){
            
            if(p.loaded==false){

              // let index=round(random(app.tourLength-1));
              
              // let parent1=getClosestArray(getRandomInt(app.tourLength-1));
              // let parent2=getClosestArray(getRandomInt(app.tourLength-1));

              // print(parent1);
              // print(parent2);

              // p.workingNodes=getClosestArray(index);
              // arrayCopy(getClosestArray(index), p.workingNodes);

              // geneticLoaded=true;

            }

            // drawPath(p.workingNodes,  p.workingNodes.length);
            // drawNodes(p.nodes);
print('genetic');
          };

        }

        { // ACO

          function segmentExists(p1, p2){

            let retVal=-1;

            for(let e=1; e<p.segments.length; e++){

              if((p1.x==p.segments[e].point1.x &&
                  p1.y==p.segments[e].point1.y &&
                  p2.x==p.segments[e].point2.x &&
                  p2.y==p.segments[e].point2.y)

                ||

                 (p1.x==p.segments[e].point2.x &&
                  p1.y==p.segments[e].point2.y &&
                  p2.x==p.segments[e].point1.x &&
                  p2.y==p.segments[e].point1.y)){

                retVal=e;
                break;

              }

            }

            return retVal;

          };
          function updateSegments(){

            for (let n=0; n<p.workingNodes.length; n++) {

              let exists=-1;

              if(n==app.tourLength-1){

                exists=segmentExists(p.workingNodes[n],
                                    p.workingNodes[0]);
                if(exists!=-1){
                  p.segments[n].weight=constrain(p.segments[n].weight+1, 0, 100);
                }
                else{
                  p.segments.push(new segment(p.workingNodes[n],
                                              p.workingNodes[0]));
                  p.segments[p.segments.length-1].weight=25;

                }

              }
              else{

                exists=segmentExists(p.workingNodes[n],
                                     p.workingNodes[n+1]);
                if(exists!=-1){
                  p.segments[n].weight=constrain(p.segments[n].weight+1, 0, 100);
                }
                else{
                  p.segments.push(new segment(p.workingNodes[n],
                                              p.workingNodes[n + 1]));
                  p.segments[p.segments.length-1].weight=25;                                            

                }

              }

            }

          };
          function drawSegments(){

            stroke(128);
            strokeWeight(3);
            noFill();

            let seg=null;

            for(let n=0; n<p.segments.length; n++){

              seg=p.segments[n];

              // stroke(0,0,0,20);
              stroke(64,64,64, seg.weight);

              line(seg.point1.x, seg.point1.y,
                   seg.point2.x, seg.point2.y);

            }

          };
          function ACO(){

            p.reset();

            p.workingNodes=getGreedyTour(p.nodes, app.greedy_mode);

            updateSegments();

            drawSegments();
            drawNodes(p.nodes);
            // renumberNodes(p.workingNodes);

            if(frameCount%5==0){

              for(let n=0; n<p.segments.length; n++){

                p.segments[n].weight=constrain(p.segments[n].weight-1, 0, 100);
                
                if(p.segments[n].weight==0){
                  p.segments.splice(n,1);
                }

              }

            }

          };

        }

        { // Brute Force

          function nodePermutations(n, arr){
            //  ***** NOTE: Do NOT exceed 9 nodes *****

            //  c is an encoding of the stack state.
            //  c[k] encodes the for-loop counter for
            //  when generate(k+1, A) is called.
            let c=[];
            let minTourLength=Infinity;
            let tourLength=getTourLength(arr);
            let counter=1;

            for(let i=0; i<n; i++){
              c[i]=0;
            }

            // i acts similarly to the stack pointer
            let i=0;

            while(i<n){

              tourLength=getTourLength(arr);

              if(tourLength<minTourLength){

                minTourLength=tourLength;
                arrayCopy(arr, p.bestNodes);

              }

              if(c[i]<i){

                counter++;

                if(i%2==0){ swap(arr, 0, i);    }
                else      { swap(arr, c[i], i); }

                //  Swap has occurred ending the for-loop.
                //  Simulate the increment of the for-loop counter
                c[i]++;

                //  Simulate recursive call reaching the base case by
                //  bringing the pointer to the base case analog in the array
                i=0;

              }
              else {

                //  Calling generate(i+1, A) has ended as the for-loop terminated.
                //  Reset the state and simulate popping the stack by incrementing the pointer.
                c[i]=0;
                i++;

              }

            }

            p.minimumLength=minTourLength;

          }

          function bruteForce(){

            // print("Disabled for safety");

            // return;

            let limit=7;

            if(!p.loaded){
              nodePermutations(limit, p.nodes);
              // nodePermutations(p.nodes.length, p.nodes);
              p.loaded=true;
              renumberNodes(p.bestNodes);
            }

            // if(app.elapsedTime<10){
            //   swap3Consecutive(p.workingNodes);
            //   drawPath(p.workingNodes);
            // }

            drawNodes(p.bestNodes);
            drawPath(p.bestNodes,limit);

          };

        }

        { // Greedy

          function getGreedyTour(arr, method){

            {

              function getRandomNode(arr){

                let newNode=null;
    
                randomizeArray(arr);
    
                newNode=arr[0];
    
                arr.splice(0, 1);
    
                return newNode;
    
              };
    
              function getClosestNode(nod){

                for(let n=0; n<nod.closest.length; n++){

                  if(nod.closest[n].loaded==false){
                    nod.closest[n].loaded=true;
                    return nod.closest[n];
                  }
    
                }
    
              };
    
              function getFarthestNode(nod){

                for(let n=nod.closest.length-1; n>=0; n--) {
    
                  if(nod.closest[n].loaded==false){
                    nod.closest[n].loaded=true;
                    return nod.closest[n];
                  }
    
                }
    
              };
    
              function placeNode(arr, nod){
    
                arr.unshift(nod); // Adds the node to the first array position [0]
    
                // Locates the position within the array that results in the shortest tour
                let bestPosition=arr.length-1;
                let dist=getTourLength(arr);
                let minDist=dist;
    
                for(let n=0; n<arr.length; n++){
    
                  if(n<arr.length-1){
                    swap(arr, n, n+1);
                  }
    
                  dist=getTourLength(arr);
    
                  if(dist<minDist){
                    minDist=dist;
                    bestPosition=n+1;
                  }
    
                }
    
                //  Remove the node from the last position
                //  Insert the node into the correct position                                                      
                arr.splice(bestPosition, 0, arr.pop());
    
              };

            }

            let arrSource=[];
            let arrDestination=[];

            let nod;

            arrayCopy(arr, arrSource);

            while(arrDestination.length<app.tourLength){

              //  Randomly add the 1st node
              if(arrDestination.length==0){

                randomizeArray(arrSource);

                nod=arrSource[0];

                arrDestination.push(nod);

                //  Remove from the source array if greedy method is random
                if(app.greedy_mode==GREEDY_MODES.RANDOM){
                  arrSource.splice(0, 1);
                }

                nod.loaded=true;

              }
              else if(arrDestination.length<arr.length){

                switch(method){

                  case GREEDY_MODES.CLOSEST:  nod=getClosestNode(nod);       break;
                  case GREEDY_MODES.FARTHEST: nod=getFarthestNode(nod);      break;
                  case GREEDY_MODES.RANDOM:   nod=getRandomNode(arrSource);  break;

                  default:                                                   break;

                }

                if(nod!=null){

                  placeNode(arrDestination, nod); //  Shifts the node to the location 
                                                  //  that minimizes the tour length
                                                  //  by trying all possible locations
                }

              }

              // p.tours.push(arrDestination);

            }

            return arrDestination;

          };

          function greedy(){

            function crossover(){

              calculateIntersections();

              if(p.intersections.length>0){

                let n0=0;
                let n1=2;

                if(frameCount%5==0){
                  n0=1;
                  n1=3;
                }

                reverseNodes(p.workingNodes,
                             p.intersections[n0].id,
                             p.intersections[n1].id);

                updateTour();

              }

            };
            function proximity(){

              proximityShift(p.proxIndex,p.workingNodes);

              updateTour();

              renumberNodes(p.workingNodes);

              p.proxIndex++;
              p.proxIndex%=(app.tourLength);

            };

            if(p.workingNodes.length==0){

              p.workingNodes=getGreedyTour(p.nodes, app.greedy_mode);

              updateTour();

            }
            else{

              if(app.running){

                if(app.crossover){ crossover(); }
                if(app.iterate  ){ iterate();   }
                if(app.proximity){ proximity(); }

              }

            }

            // if(p.length<p.workingNodes.length){
              // p.length++;
              // p.length=p.workingNodes.length;
            // }      

          };

        }

        { // Simulated Annealing
          
          function simulatedAnnealing(){
            
            if(app.running){

              fill(64);
              noStroke();
              textSize(20);

              for(let n=0; n<1; n++){

                p.factor-=0.000001;
                p.factor=constrain(p.factor, 1, 1.2);

                switch(true){

                  case p.factor>1.075:

                    let id=getLongest(p.workingNodes);

                    swap2Length(p.workingNodes, id);
                    swap2Closest(p.workingNodes);
                    swap3Consecutive(p.workingNodes);
                    // swap3Segments(p.workingNodes);

                    break;

                  // case p.factor>1.05:   swap3Random(p.workingNodes);
                  //                       break;                                      

                  // case p.factor>1:      swap2Half(p.workingNodes); 
                  //                       break;

                  default:

                    if(int(app.elapsedTime)%2==0){

                      calculateIntersections();

                      if(p.intersections.length>0){

                        reverseNodes(p.workingNodes,
                                     p.intersections[0].id,
                                     p.intersections[2].id);

                        updateTour();

                      }

                    }
                    else {

                      if(app.iterate){ iterate(); }

                    }

                    

                    renumberNodes(p.workingNodes);

                  // arrayCopy(p.bestNodes, p.workingNodes);
                  // renumberNodes(p.bestNodes);

                  // iterate();
                  // print(p.index);
                  // p.index++;

                  // if(p.index>p.bestNodes.length-1){
                  //   p.index=0;
                  // }

                  // if     (frameCount%2==0) { swap2Closest(p.workingNodes);           }
                  // else if(frameCount%3==0) { swap2Length(p.workingNodes,
                                                            // getLongest(p.workingNodes),
                  //                                                   ); }
                  // else if(frameCount%5==0) { swap2Consecutive(p.workingNodes);       }
                  // else if(frameCount%7==0) { swap3Consecutive(p.workingNodes);       }
                  // else if(frameCount%11==0){ swap3Random(p.workingNodes);            }
                  // else                     { swap2Random(p.workingNodes);            }

                  // break;

                }

                updateTour();

              }

            }

            drawNodes(p.workingNodes);
            drawPath(p.workingNodes,p.workingNodes.length);
            // drawPath(p.bestNodes);

          };

        }

        { // Grow

          function grow(){

            // renumberNodes(p.workingNodes);

            function canGrow(nod){

              let retVal=true;

              for(let n=0; n<p.workingNodes.length; n++){

                let distance=dist(nod.x,
                                  nod.y,
                                  p.workingNodes[n].x,
                                  p.workingNodes[n].y);

                distance=abs(distance);

                if(nod.id!==p.workingNodes[n].id){

                  if(distance*2<(nod.radius+p.workingNodes[n].radius)){
                    retVal=false;
                    break;
                  }

                }

              }

              return retVal;

            };

            if(app.running){

              let nod=null;

              for(let n=0; n<p.workingNodes.length; n++){

                nod=p.workingNodes[n];

                if(canGrow(nod)){
                  nod.radius++;
                }

              }

            }

            drawPath(p.workingNodes, p.workingNodes.length);
            drawNodes(p.workingNodes, p.workingNodes.length);

          };

        }

        { // Chance
        
          function chance(){

            arrayCopy(p.nodes,p.workingNodes);

            randomizeArray(p.workingNodes);

            drawPath(p.workingNodes,p.workingNodes.length);
            drawNodes(p.workingNodes);

          }

        }

        { // GUI

          function drawBorder(){

            fill(p.color);

            // if(p.hit){ fill(BACKGROUND); };

            stroke(64);
            strokeWeight(0.5);

              rect(150, 0, p.w-150, p.h);

          };

          function drawProperties(){

            textSize(11);
            textAlign(LEFT, TOP);
            strokeWeight(0);
            stroke(128);
            noStroke();
            fill(192);

            let txt='Tours:'            + '\n'   +
                    'Nodes:'            + '\n\n' +
                    'Working Length:'   + '\n'   +
                    'Best Length'       + '\n\n' +
                    'Average Distance:' + '\n\n' +
                    'Factor:'           + '\n\n' +
                    'Intersections:'    + '\n'   +
                    'Segments:'         + '\n\n' +
                    'Domain:'           + '\n'   +
                    '  Min X:'          + '\n'   +
                    '  Max X:'          + '\n\n' +
                    'Range:'            + '\n'   +
                    '  Min Y:'          + '\n'   +
                    '  Max Y:'          + '\n\n' +
                    'Elapsed Time:';

              text(txt, 10, 10);

            stroke(0);
            noStroke();
            fill(YELLOW);

            let id=app.currentNode;
            let factor=nf(p.factor, 1, 5);

            if(id==null){ id='';                 }
            else        { id=app.currentNode.id; }

            textAlign(RIGHT, TOP);

            txt=p.tours.length          + '\n'   +
                p.workingNodes.length   + '\n\n' +
                p.workingLength         + '\n'   +
                p.minimumLength         + '\n\n' +
                p.avgDistance           + '\n\n' +
                factor                  + '\n\n' +
                p.intersections.length  + '\n'   +
                p.segments.length       + '\n\n' +                
                p.domain                + '\n'   +
                p.minX                  + '\n'   +
                p.maxX                  + '\n\n' +
                p.range                 + '\n'   +
                p.minY                  + '\n'   +
                p.maxY                  + '\n\n' +                
                nf(app.elapsedTime, 1, 1);

              text(txt, 140, 10);

            textSize(11);
            textAlign(LEFT, CENTER);

              // text(factorial(app.tourLength), 200, p.h-20);
              // text(factorial(app.tourLength).toLocaleString(), 10, p.h-200);

            fill(YELLOW_H);
            textSize(24);
            textAlign(LEFT,BOTTOM);

              text("Travelling Salesman Problem (TSP)", 160,p.h-5);

          };

        }

        { //  Convex Hull

          function convexHull(){

            var counter=0;

            if(!p.loaded){

              let arr=p.bestNodes;

              let q1=false;
              let q2=false;
              let q3=false;
              let q4=false;

              for(var n=0; n<arr.length; n++){
                for(var m=0; m<arr.length; m++){

                  if(arr[m].x>arr[n].x &&
                     arr[m].y<arr[n].y){
                    q1=true;
                  }

                  if(arr[m].x<arr[n].x &&
                     arr[m].y<arr[n].y){
                    q2=true;
                  }

                  if(arr[m].x<arr[n].x &&
                     arr[m].y>arr[n].y){
                    q3=true;
                  }

                  if(arr[m].x>arr[n].x &&
                     arr[m].y>arr[n].y){
                    q4=true;
                  }

                  if(q1 &&
                     q2 &&
                     q3 &&
                     q4){

                      arr[n].hull=false;

                    break;

                  }

                  // print(counter);
                  counter++;

                }
                
                q1=false;
                q2=false;
                q3=false;
                q4=false;

              }
              
              p.loaded=true;

              // print(arr);

arrayCopy(arr,p.workingNodes);

print(counter);

p.hullNodes=[];

let arrHull=[];

for(let n=0; n<p.workingNodes.length; n++){
  
  if(p.workingNodes[n].hull){
    arrHull.push(p.workingNodes[n]);
  }

}

sortByX(arrHull);
arrayCopy(arrHull,p.hullNodes);


print(p.hullNodes.length);

            }



          };

        }
        function initialCondition(){
          
          p.factor=1;

          let index=getRandomInt(p.workingNodes.length-1);

          arrayCopy(p.workingNodes,getClosestArray(index));

          // updateTour();

        };

        function calculateTour(){

          // if(!p.loaded){
// renumberNodes(p.workingNodes);

            // if(app.algorithm!=ALGORITHMS.ACO){

              // if(app.initialize){
                // initialCondition(); 
                // randomizeArray(p.workingNodes);
              // }

            // }

          // }

          switch (app.algorithm){

            case ALGORITHMS.SIMULATEDANNEALING: simulatedAnnealing(); break;
            case ALGORITHMS.GROW:               grow();               break;
            case ALGORITHMS.GREEDY:             greedy();             break;
            case ALGORITHMS.BRUTEFORCE:         bruteForce();         break;
            case ALGORITHMS.GENETIC:            genetic();            break;
            case ALGORITHMS.ACO:                ACO();                break;
            case ALGORITHMS.RANDOM:             chance();             break;
            case ALGORITHMS.CONVEXHULL:         convexHull();         break;

            default:                            greedy();             break;

          }

        };

        function calculateMetrics(){

          p.avgDistance=round(p.workingLength/p.workingNodes.length);
          p.workingLength=round(getTourLength(p.workingNodes));
          p.minimumLength=round(getTourLength(p.bestNodes));
          p.bestLength=round(getTourLength(p.bestNodes));

          for(let n=0; n<p.nodes.length; n++){

            if(p.nodes[n].x<p.minX){ p.minX=p.nodes[n].x; }
            if(p.nodes[n].x>p.maxX){ p.maxX=p.nodes[n].x; }
            if(p.nodes[n].y<p.minY){ p.minY=p.nodes[n].y; }
            if(p.nodes[n].y>p.maxY){ p.maxY=p.nodes[n].y; }

          }

          p.domain=p.maxX-p.minX;
          p.range=p.maxY-p.minY;

        };

          push();

            translate(this.x+0.5,
                      this.y+0.5);

              drawBorder();
              
              calculateTour();

              calculateMetrics();

              drawProperties();
              
              if(app.drawBestPath   ){ drawBestPath(p.bestNodes);                       }
              if(app.drawWorkingPath){ drawPath(p.workingNodes, p.workingNodes.length); }
              if(app.drawPathNodes  ){ drawNodes(p.workingNodes);                       }

              drawHullPath();

          pop();

      };
      field.prototype.next=function()       { print("Next");      };
      field.prototype.previous=function()   { print("Previous");  };
      field.prototype.first=function()      { print("First");     };
      field.prototype.last=function()       { print("Last");      };
      field.prototype.run=function()        { print("Run");       };
      field.prototype.hitTest=function(x, y){

        let retVal=false;

        if(mouseX>x+this.x &&
           mouseX<x+this.x+this.w &&
           mouseY>y+this.y &&
           mouseX<y+this.y+this.h){
          retVal=true;
        }

        return retVal;

      };
      field.prototype.moved=function(x, y)  {

        if(this.hitTest(x, y)){

          this.hit=true;
          app.focus=this;

          for(let n in this.workingNodes){
            this.workingNodes[n].moved(this.x+x, this.y+y);
          }

        }
        else{

          this.hit=false;

          for(let n in this.workingNodes){
            this.workingNodes[n].hit=false;
          }

        }

      };
      field.prototype.clicked=function()    {

        if(this.hit){
          for(let n in this.workingNodes){
            this.workingNodes[n].clicked(this.x+x, this.y+y);
          }
        }

      };
      field.prototype.rclicked=function()   {

        let ctrls=this.controls;

        for(let r in ctrls){
          for(let c in ctrls[r]){

            ctrls[r][c].rclicked();

          }
        }

      };
      field.prototype.out=function()        {

        this.hit=false;
        

        let ctrls=this.controls;

        for(let r in ctrls){
          for(let c in ctrls[r]){

            ctrls[r][c].out();

          }
        }

      };
      field.prototype.resized=function()    {

        this.x=5;
        this.y=5;
        this.w=this.parent.w-205;
        this.h=this.parent.h-10;


      };

    }

  }

  /* Controls   ======================================================== */
  {

    /** Node  -------------------------------------------------- */
    {

      function node(id, parent, x, y, w, h, props) {

        // NOTE:  w is used to denote radius for a node.

        control.call(this, id, parent, x, y, w, h);

        this.cursor     = props.cursor;
        // this.execute      = props.execute;
        this.outerHit   = false;

        this.dirty      = false;
        this.distance   = Infinity;     //  Used to determine the distance to the
        //  selected node on load
        this.loaded     = false;

        //  Closest Nodes  ---------------
        this.closest    = [];
        this.distance   = Infinity;

        this.radius     = -1;

        //  Adjacent nodes ---------------
        this.previous   = null;
        this.next       = null;

        // ------------------------------

        // this.color        = props.layout;
        this.outerColor = round(random(1, 7));

        this.enabled    = true;           //  Text is displayed black or grayed out

        this.dragging   = false;          // Is the node being dragged?

        this.hull       = true;          //  Is the node a possible Convex Hull node?

        let p           = this;

        this.reset();

      };
      node.prototype = Object.create(control.prototype);
      node.prototype.reset = function (){

        this.closest = [];

      };
      node.prototype.draw = function (){

        this.active=this.hit &&
                    app.focus==this;

        this.offset=0;
        let p=this;

        if(this.hit){

          cursor(this.cursor);

          if(app.left){ this.offset = 1; }

          if(app.control){

            stroke(YELLOW);
            strokeWeight(1.25);
            noFill();

            for(let n=0; n<round(sqrt(p.closest.length)); n++){
            // for(let n=0; n<p.closest.length; n++){
              line(p.x,
                   p.y,
                   p.closest[n].x,
                   p.closest[n].y);
            }

          }

        }

        if(app.shift){

          stroke(ORANGE);
          strokeWeight(3);
          noFill();

          line(p.x,
              p.y,
              p.closest[0].x,
              p.closest[0].y);
        }

        push();

          let value=p.radius;
          // print(value);
          fill(192, value);

          noStroke();

          if(this.hit){

            fill(192,128);

            ellipse(p.x, p.y, p.w, p.w);

          }

          if(app.algorithm!=ALGORITHMS.GROW){
            p.radius=10;
          }

          ellipse(p.x,
                  p.y,
                  p.radius,
                  p.radius);

          fill(222);
          textSize(9);

            text(p.id, p.x+5, p.y+5);

            if(p.hull){

              noStroke();
              fill(getColor(ORANGE,32));

                ellipse(p.x,p.y,20,20);

            }

        pop();

        // drawLinks(); //  Delete for release

      };
      node.prototype.hitTest = function (x, y) {

        if (dist(mouseX, mouseY, x, y) < this.w) {
          this.hit = true;
        }
        else {
          this.hit = false;
        }

      };
      node.prototype.moved = function (x, y) {
        /* Overridden because of the shape */

        this.hitTest(x + this.x, y + this.y);

        if(this.hit){
          app.currentNode=this;
        }

      };
      node.prototype.clicked = function (){

        if (this.hit) {
          app.focus = this;
          print(this.closest);  
        }

        if (this.active) {

        }

      };
      node.prototype.rclicked = function (){

        if (this.active) {

          this.parent.dirty = true;

          if (app.mode === APPMODES.CREATE) {

            // this.decrCellLayout();

          }
          else if (app.mode === APPMODES.GAME) {

            if (this.layout !== HEXY_TYPES.BLUE &&
              this.layout !== HEXY_TYPES.BLACK) {
              this.enabled = !this.enabled;
            }

            //  Black Hexagon
            if (this.layout === HEXY_TYPES.BLACK) {

              this.layout = HEXY_TYPES.BLACK_REVEALED;
              this.clickRadius = HEX_SIZE - 10;

              addAnimation(this.x, this.y, this.w / 2, this.h / 2, CLRS.H_ORANGE_L);

            } // Blue Hexagon
            else if (this.layout === HEXY_TYPES.BLUE) {
              app.errors++;
              this.timer = 5;
              this.dirty = false;
            }

          }
          /* Should the line automatically be dismissed when the cell is disabled? */
          // this.line=false;

        }

      };
      node.prototype.recalculate = function (){

        this.parent.update();

      };
      node.prototype.dragged = function (){

        if (this.hit){
          // print(this.id);

        }

      };
      node.prototype.resized=function(){};

    }

    /** Slider    -------------------------------------------------- */
    {

      function slider(id, parent, x, y, w, h, props) {

        control.call(this, id, parent, x, y, w, h);

        this.cursor = props.cursor;
        this.color = props.color;

        this.execute = props.execute;
        this.retrieve = props.retrieve;

        this.value=this.retrieve()*this.w/100;

      };
      slider.prototype = Object.create(control.prototype);
      slider.prototype.draw = function (){

        this.active = this.hit &&
                      app.focus === this;

        this.offset = 0;

        let CLR=164;
        let CLRH=212;
        let CLRB=48;

        push();

          translate(this.x, this.y);

          noFill();
          stroke(CLR);
          strokeWeight(1.5);

          if(this.active){

            stroke(164);
            cursor(this.cursor);

            if(app.left){
              this.offset=1;
            }

          }

          fill(16,128);
          noStroke();

            rect(0,
                 0,
                 this.w,
                 this.h);

          fill(128);
          stroke(32);

            line(0,
                 this.h/2,
                 this.w,
                 this.h/2);

          fill(128,0,0);
          noStroke();

          this.value=constrain(this.value,0,this.w);

            ellipse(this.value,
                    this.h/2,
                    10,
                    10);

          if(app.debug){

            textSize(16);
            noStroke();
            fill(192);

              text(this.value,0,-30);

          }

        pop();

      };

      field.prototype.hitTest=function(x,y){

        let retVal=false;

        if(mouseX>x+this.x &&
           mouseX<x+this.x+this.w &&
           mouseY>y+this.y &&
           mouseX<y+this.y+this.h){
          retVal=true;
        }

        return retVal;

      };      
      slider.prototype.clicked=function(){
        /** Overridden for execute */

        if(this.hit){

          this.value=mouseX-this.x-this.parent.x;

          this.execute(100*(this.value/this.w));

        }

      };      
      slider.prototype.moved=function(x,y){
        /** Overridden for shape */

        if(this.hitTest(x,y)){  this.hit=true;
                                app.focus=this; }
        else                 {  this.hit=false; }

      };
      slider.prototype.dragged=function(){

        if(this.hit){          
          
          if(mouseX>this.x &&
             mouseX<this.x+this.w){

            this.value=mouseX-this.x;
            this.execute(100*(this.value/this.w));

          }

        }

      };
      slider.prototype.resized=function(){

        this.y=this.parent.y+this.parent.h-100;

      };

    }

    /** Solve Button    -------------------------------------------------- */
    {

      function solveButton(id, parent, x, y, w, h, props) {

        control.call(this, id, parent, x, y, w, h);

        this.cursor = props.cursor;
        this.color = props.color;

        this.execute = props.execute;
        this.retrieve = props.retrieve;

        app.reset = this;

      };
      solveButton.prototype = Object.create(control.prototype);
      solveButton.prototype.draw = function (){

        this.active = this.hit &&
                      app.focus === this;

        this.offset = 0;

        let CLR=164;
        let CLRH=212;
        let CLRB=48;

        push();

          translate(this.x, this.y);

          noFill();
          stroke(CLR);
          strokeWeight(1.5);

          if(this.active){

            stroke(164);
            cursor(this.cursor);

            if(app.left){
              this.offset=1;
            }

          }

          let o=this.offset;

          if(this.retrieve()){

            // Triangle Shadow
            fill(CLRB);
            stroke(CLRB);
            strokeWeight(5);

            line(-3,-7,-3, 13);
            line( 9,-7, 9, 13);

            // Triangle
            fill(CLR);
            stroke(CLR);

            if(this.active){
              fill(CLRH);
              stroke(CLRH);
            }

            line(o-6, o-10, o-6, o+10);
            line(o+6, o-10, o+6, o+10);

          }
          else {

            // Triangle Shadow
            fill(CLRB);
            stroke(CLRB);

            triangle(13, 3,
                     -7,-7,
                     -7,13);

            // Triangle
            fill(CLR);
            stroke(CLR);

            if(this.active){
              fill(CLRH);
              stroke(CLRH);
            }

            triangle(o+10, o,
                     o-10, o-10,
                     o-10, o+10);

          }

        pop();

      };
      solveButton.prototype.clicked = function (){
        /** Overridden for execute */

        if (this.active) { this.execute(); }

      };
      solveButton.prototype.moved = function (x, y) {
        /** Overridden for shape */

        // if(this.parent.hit){

        if (dist(mouseX, mouseY,
          this.x + x,
          this.y + y) <= this.w / 2) {

          this.hit = true;
          app.focus = this;

        }
        else {

          this.hit = false;

        }

        // }

      };
      solveButton.prototype.resized=function(){

        this.y=this.parent.y+this.parent.h-this.h;

      };

    }

    /** Shuffle Button  -------------------------------------------------- */
    {

      function shuffleButton(id, parent, x, y, w, h, props) {

        control.call(this, id, parent, x, y, w, h);

        this.cursor = props.cursor;
        this.color = props.color;

        this.execute = props.execute;

        app.reset = this;

      };
      shuffleButton.prototype = Object.create(control.prototype);
      shuffleButton.prototype.draw = function (){

        this.active = this.hit &&
                      app.focus === this;

        this.offset = 0;

        let CLR=164;
        let CLRH=212;
        let CLRB=48;

        push();

          translate(this.x, this.y);

          if(this.active){

            cursor(this.cursor);

            if(app.left){
              this.offset=1;
            }

          }

          let o=this.offset;

          // Shadows
          noFill();
          stroke(CLRB);
          strokeWeight(2);

          let s=3;

            bezier(-14 + s,-8 + s, -5 + s,-10 + s, 5 + s, 10 + s, 14 + s, 8 + s);
            bezier(-14 + s, 8 + s, -5 + s, 10 + s, 5 + s,-10 + s, 14 + s,-8 + s);

          fill(CLR);

            triangle(13 + s, 11 + s, 13 + s, 5 + s, 17 + s, 8 + s);
            triangle(13 + s,-11 + s, 13 + s,-5 + s, 17 + s,-8 + s);

          // Curves
          noFill();
          stroke(CLR);

          if(this.active){ stroke(CLRH); }

            bezier(-14 + o,-8 + o, -3 + o,-10 + o, 3 + o, 10 + o, 14 + o, 8 + o);
            bezier(-14 + o, 8 + o, -3 + o, 10 + o, 3 + o,-10 + o, 14 + o,-8 + o);

          // Triangles
          fill(CLR);

          if(this.active){ fill(CLRH); }

            triangle(13 + o, 11 + o, 13 + o, 5 + o, 17 + o, 8 + o);
            triangle(13 + o,-11 + o, 13 + o,-5 + o, 17 + o,-8 + o);

        pop();

      };
      shuffleButton.prototype.moved = function (x, y) {

        // if(this.parent.hit){

        if (dist(mouseX, mouseY,
          this.x + x,
          this.y + y) <= this.w / 2) {

          this.hit = true;
          app.focus = this;

        }
        else {

          this.hit = false;

        }

        // }

      };
      shuffleButton.prototype.clicked = function (){
        /** Overridden for execute */

        if (this.active) { this.execute(app.field.workingNodes); }

      };
      shuffleButton.prototype.resized=function(){

        this.y=this.parent.y+this.parent.h-this.h;

      };

    }


    /** Reset Button    -------------------------------------------------- */
    {

      function resetButton(id, parent, x, y, w, h, props) {

        control.call(this, id, parent, x, y, w, h);

        this.cursor = props.cursor;
        this.color = props.color;

        this.execute = props.execute;

        app.reset = this;

      };
      resetButton.prototype = Object.create(control.prototype);
      resetButton.prototype.draw = function (){

        this.active = this.hit &&
                      app.focus === this;

        this.offset = 0;

        let CLR=164;
        let CLRH=192;
        let CLRB=48;

        push();

          translate(this.x, this.y);

          noFill();
          strokeWeight(1.5);

          if(this.active &&
             app.left){

            rotate(radians(45));

          }

          // Arc Shadow
          stroke(CLRB);

            arc(3, 3, this.w, this.h, radians(60), 2 * PI - radians(22.5));

          // Arc
          stroke(CLR);

          if(this.active){

            stroke(CLRH);
            cursor(this.cursor);

          }

            arc(0, 0, this.w, this.h, radians(60), 2 * PI - radians(22.5));

          push();

            translate(4, -5);
            rotate(PI / 6);

            // Triangle Shadow
            fill(32);
            stroke(32);

              triangle( 3, 3,
                       13, 3,
                       13,-7);

            // Triangle
            fill(CLR);
            stroke(CLR);

            if(this.active){
              fill(CLRH);
              stroke(CLRH);
            }

              triangle( 0,  0,
                       10,  0,
                       10,-10);

          pop();

        pop();

      };
      resetButton.prototype.clicked = function (){
        /** Overridden for execute */

        if (this.active) {
          this.execute();
        }

      };
      resetButton.prototype.moved = function (x, y) {
        /** Overridden for shape */

        // if(this.parent.hit){

        if (dist(mouseX, mouseY,
          this.x + x,
          this.y + y) <= this.w / 2) {

          this.hit = true;
          app.focus = this;

        }
        else {

          this.hit = false;

        }

        // }

      };
      resetButton.prototype.resized=function(){

        this.y=this.parent.y+this.parent.h-this.h;

      };

    }

    /** Solve Button    -------------------------------------------------- */
    {

      function solveButton(id, parent, x, y, w, h, props) {

        control.call(this, id, parent, x, y, w, h);

        this.cursor = props.cursor;
        this.color = props.color;

        this.execute = props.execute;
        this.retrieve = props.retrieve;

        app.reset = this;

      };
      solveButton.prototype = Object.create(control.prototype);
      solveButton.prototype.draw = function (){

        this.active = this.hit &&
                      app.focus === this;

        this.offset = 0;

        let CLR=164;
        let CLRH=212;
        let CLRB=48;

        push();

          translate(this.x, this.y);

          noFill();
          stroke(CLR);
          strokeWeight(1.5);

          if(this.active){

            stroke(164);
            cursor(this.cursor);

            if(app.left){
              this.offset=1;
            }

          }

          let o=this.offset;

          if(this.retrieve()){

            // Triangle Shadow
            fill(CLRB);
            stroke(CLRB);
            strokeWeight(5);

            line(-3,-7,-3, 13);
            line( 9,-7, 9, 13);

            // Triangle
            fill(CLR);
            stroke(CLR);

            if(this.active){
              fill(CLRH);
              stroke(CLRH);
            }

            line(o-6, o-10, o-6, o+10);
            line(o+6, o-10, o+6, o+10);

          }
          else {

            // Triangle Shadow
            fill(CLRB);
            stroke(CLRB);

            triangle(13, 3,
                     -7,-7,
                     -7,13);

            // Triangle
            fill(CLR);
            stroke(CLR);

            if(this.active){
              fill(CLRH);
              stroke(CLRH);
            }

            triangle(o+10, o,
                     o-10, o-10,
                     o-10, o+10);

          }

        pop();

      };
      solveButton.prototype.clicked = function (){
        /** Overridden for execute */

        if (this.active) { this.execute(); }

      };
      solveButton.prototype.moved = function (x, y) {
        /** Overridden for shape */

        // if(this.parent.hit){

        if (dist(mouseX, mouseY,
          this.x + x,
          this.y + y) <= this.w / 2) {

          this.hit = true;
          app.focus = this;

        }
        else {

          this.hit = false;

        }

        // }

      };
      solveButton.prototype.resized=function(){

        this.y=this.parent.y+this.parent.h-this.h;

      };

    }

    /** Menu Button     -------------------------------------------------- */
    {

      function menuButton(id, parent, x, y, w, h, props) {

        control.call(this, id, parent, x, y, w, h);

        this.text = props.text;
        this.cursor = props.cursor;
        this.execute = props.execute;
        this.color = props.color;

        app.menu = this;

      };
      menuButton.prototype = Object.create(control.prototype);
      menuButton.prototype.draw = function (){

        let p = this;
        this.offset = 0;

        this.active = this.hit &&
          app.focus === this;

        if (this.active) {
          cursor(this.cursor);
          if (app.left) { this.offset = 1; }
        }

        function drawHexagon(x, y, sz, offset) {

          let ang = 0;

          beginShape();

          for (pt = 0; pt < 6; pt++) {
            vertex(x + cos(radians(ang + pt * 60)) * sz + offset,
              y + sin(radians(ang + pt * 60)) * sz + offset);
          }

          endShape(CLOSE);

        };

        push();

        translate(this.x, this.y);

        // Shadow
        fill(212);
        noStroke();

        for (let ang = 0; ang < 6; ang++) {
          drawHexagon(cos(radians(ang * 60 + 30)) * 20 + 4,
            sin(radians(ang * 60 + 30)) * 20 + 4,
            10, 0);
        }

        // Hexagons
        fill(192);
        noStroke();

        if (p.active) { fill(180); }

        for (let ang = 0; ang < 6; ang++) {
          drawHexagon(cos(radians(ang * 60 + 30)) * 20,
            sin(radians(ang * 60 + 30)) * 20,
            10, p.offset);
        }
        noFill();
        stroke(RED);
        ellipse(0, 0, this.w, this.h);

        ellipse(0, 0, 3, 3);
        pop();

      };
      menuButton.prototype.moved = function (x, y) {

        // if(this.parent.hit){

        if (dist(mouseX, mouseY,
          this.x + x,
          this.y + y) <= this.w / 2) {

          this.hit = true;
          app.focus = this;

        }
        else {

          this.hit = false;

        }

        // }

      };
      menuButton.prototype.clicked = function (){
        /** Overridden for execute */

        if (this.active) { this.execute(); }

      };

    }

    /** Music Button    -------------------------------------------------- */
    {

      function music(id, parent, x, y, w, h, props) {

        control.call(this, id, parent, x, y, w, h);

        this.cursor = props.cursor;

        this.execute = props.execute;
        this.retrieve = props.retrieve;

        app.music = this;

      };
      music.prototype = Object.create(control.prototype);
      music.prototype.draw = function (){

        let p = this;

        this.active = this.hit &&
          app.focus === this;

        this.on = this.retrieve();
        this.offset = 0;

        function symbol(){

          noStroke();

          if (p.on) { fill(164); }

          textFont(p.font);
          textSize(36);
          textAlign(CENTER, CENTER);

          //  Shadow
          fill(212);

          text(CONSTANTS.NOTE, 3 + p.offset, +p.offset);

          // Text
          fill(192);

          if (p.active) { fill(164); }

          text(CONSTANTS.NOTE, p.offset, p.offset);

        };
        function strikeThrough(){

          noFill();

          if (!p.on) {

            stroke(192);
            strokeWeight(3);

            if (p.active) { stroke(164); }

            ellipse(p.offset, p.offset, p.w - 5, p.w - 5);

            line(-15 + p.offset, -15 + p.offset, 15, 15);

          }

        };

        if (this.active) {
          cursor(p.cursor);
          if (app.left) { this.offset = 1; }
        }

        push();

        translate(this.x, this.y);

        symbol();
        strikeThrough();

        pop();

        noFill();
        stroke(RED);
        ellipse(this.x, this.y, this.w, this.h);

      };
      music.prototype.moved = function (x, y) {

        // if(this.parent.hit){

        if (dist(mouseX, mouseY,
          this.x + x,
          this.y + y) <= this.w / 2) {

          this.hit = true;
          app.focus = this;

        }
        else {

          this.hit = false;

        }

        // }

      };
      music.prototype.clicked = function (){
        /* Overridden to maintain on/off value */

        if (this.active) {

          this.execute(!this.retrieve());

        }

      };

    }

    /** Checkbox        -------------------------------------------------- */
    {
      function checkbox(id, parent, x, y, w, h, props){
        
        control.call(this, id, parent, x, y, w, h);

        this.caption  = props.caption;
        this.execute  = props.execute;
        this.retrieve = props.retrieve;

        this.color    = props.color;
        this.value    = this.retrieve();

      };
      checkbox.prototype.draw=      function(){

        this.value  = this.retrieve();

        this.active = this.hit &&
                      app.focus === this;

        this.offset = 0;

        push();

          translate(this.w/2+0.5, this.h/2+0.5);
          
            if(this.hit){ fill(0,0,255,20);
                          cursor(HAND);     }
            else        { fill(0,0,128,0);  }

            // Outer Rectangle ~~~~~~~~~~~
            rectMode(CENTER);

            stroke(128);
            strokeWeight(0.5);
      
              rect(this.x, this.y,
                   this.w, this.h,
                   2);

            // Inner Rectangle ~~~~~~~~~~~
            if(this.value){ fill(color(0,255,255,128)); }
            else          { noFill();
                            noStroke();    }

              rect(this.x,   this.y,
                   this.w-5, this.h-5,
                   2);

            // Caption ~~~~~~~~~~
            if(this.hit){ fill(255); }
            else        { fill(160); }

            noStroke();

            textSize(11);
            textAlign(LEFT,CENTER);

              text(this.caption,
                   this.x + this.w/2 + 3,
                   this.y+1);

        pop();

      };
      checkbox.prototype.clicked=   function(x,y){
    
        if(this.hit){ this.execute(); }
    
      };
      checkbox.prototype.released=  function(x,y){};      
      checkbox.prototype.moved=     function(x,y){
    
        if(mouseX>x+this.x &&
           mouseX<x+this.x+this.w+textWidth(this.caption)+3 &&
           mouseY>y+this.y &&
           mouseY<y+this.y+this.h){
          
          app.focus=this.id;
          this.hit=true;
    
        }
        else{
    
          this.hit=false;
    
        }
    
      };
      checkbox.prototype.dragged=   function(x,y){
    
        // if(this.hit){
        //   this.x=x;
        //   this.y=y;
        // }
    
      };
      checkbox.prototype.over=      function(x,y){
    
        this.visible=true;
    
      };
      checkbox.prototype.out=       function(x,y){
    
        this.visible=false;
    
      };
      checkbox.prototype.resized=   function(){};

    }

    /** Option        -------------------------------------------------- */
    {
      function option(id, parent, x, y, w, h, props){
        
        control.call(this, id, parent, x, y, w, h);

        this.caption  = props.caption;
        this.execute  = props.execute;
        this.retrieve = props.retrieve;

        this.color    = props.color;
        
        this.value    = this.retrieve();
        
        this.algorithm = props.algorithm;

      };
      option.prototype.draw=      function(){

        this.value  = this.retrieve();

        this.active = this.hit &&
                      app.focus === this;

        this.offset = 0;

        push();

          translate(this.w/2+0.5, this.h/2+0.5);
          
            if(this.hit){ fill(0,0,255,20);
                          cursor(HAND);     }
            else        { fill(0,0,128,0);  }

            // Outer Circle ~~~~~~~~~~~
            rectMode(CENTER);

            stroke(128);
            strokeWeight(0.5);
      
              ellipse(this.x, this.y,
                      this.w, this.h);

            // Inner Circle ~~~~~~~~~~~            
            if(this.retrieve()==this.algorithm){

              if(this.value){ fill(0,255,255,128);   }
              else          { noFill();
                              noStroke(); }

                ellipse(this.x,   this.y,
                        this.w-5, this.h-5);

            }

            // Caption ~~~~~~~~~~
            if(this.hit){ fill(255); }
            else        { fill(160); }

            noStroke();

            textSize(11);
            textAlign(LEFT,CENTER);

              text(this.caption,
                   this.x + this.w/2 + 3,
                   this.y+1);

        pop();

      };
      option.prototype.clicked=   function(x,y){

        if(this.hit){
          
          this.execute(this.algorithm);
          print(this.retrieve() + " : " + this.algorithm);
        }

      };
      option.prototype.released=  function(x,y){};      
      option.prototype.moved=     function(x,y){
    
        if(mouseX>x+this.x &&
           mouseX<x+this.x+this.w+textWidth(this.caption)+3 &&
           mouseY>y+this.y &&
           mouseY<y+this.y+this.h){
          
          app.focus=this.id;
          this.hit=true;
    
        }
        else{
    
          this.hit=false;
    
        }
    
      };
      option.prototype.dragged=   function(x,y){
    
        // if(this.hit){
        //   this.x=x;
        //   this.y=y;
        // }
    
      };
      option.prototype.over=      function(x,y){
    
        this.visible=true;
    
      };
      option.prototype.out=       function(x,y){
    
        this.visible=false;
    
      };
      option.prototype.resized=   function(){};

    }

    /** Database Controls    -------------------------------------------------- */
    {

      function dbControls(id, parent, x, y, w, h, props){

        control.call(this, id, parent, x, y, w, h);

        this.cursor      = props.cursor;
        this.color       = props.color;

        this.run         = props.run;
        this.retrieve    = props.retrieve;

        this.next        = props.next;
        this.previous    = props.previous;
        this.first       = props.first;
        this.last        = props.last;

        this.firstHit    = false;
        this.previousHit = false;        
        this.runHit      = false;
        this.nextHit     = false;
        this.lastHit     = false;

        app.reset        = this;

      };
      dbControls.prototype=Object.create(control.prototype);
      dbControls.prototype.draw=function(){

        let p=this;

        let CLR  = 164;
        let CLRH = 212; // Highlight
        let CLRS =  48; // Shadow

        let ts   =  38; //  TextSize

        push();

          translate(p.x, p.y);

            function drawRun(){

              if(p.runHit){

                stroke(164);                
                cursor(p.cursor);
    
                p.offset=app.left ? 1 : 0;
    
              }

              let x=p.h/2+2*p.h;
              let y=p.h/2;

              let o=p.offset;

              if(p.runHit){

                fill(CLRH,32);
                noStroke();

                  ellipse(p.h/2+2*p.h, p.h/2, p.h, p.h);

              }

              if(p.retrieve()){ //  Pause

                strokeWeight(5);

                // Lines Shadow
                fill(CLRS);
                stroke(CLRS);

                  line(x-3, y-7, x-3, y+12);
                  line(x+9, y-7, x+9, y+12);
    
                // Lines
                fill(CLR);
                stroke(CLR);
    
                if(p.active){
                  fill(CLRH);
                  stroke(CLRH);
                }
    
                  line(x-6+o, y+o-10, x-6+o, y+o+10);
                  line(x+6+o, y+o-10, x+6+o, y+o+10);
    
              }
              else{ // Run
                
                x=p.h*2.5-ts/2+2;
                y=ts/2+11;

                noStroke();
                textSize(38);

                // Triangle Shadow
                fill(CLRS);
                stroke(CLRS);
    
                  text(CONSTANTS.TRIANGLE_R, x+3, y+3);
    
                // Triangle
                fill(CLR);
                stroke(CLR);
    
                if(p.runHit){
                  fill(CLRH);
                  stroke(CLRH);
                }
    
                  text(CONSTANTS.TRIANGLE_R, x+o, y+o);
    
              }

            };
            function drawNext(){

              let ts=24;

              textSize(ts);
              noStroke();

              let x=3.5*p.h;
              let y=p.h/2;
              let o=0;

              if(p.nextHit){

                cursor(p.cursor);
    
                o=app.left ? 1 : 0;
    
                fill(128,32);

                  ellipse(x, y, p.h, p.h);
                
              }

              x+=-ts+7;
              y=ts/2+15;

              // Triangle Shadow
              fill(CLRS);

                text(CONSTANTS.TRIANGLE_R, x+3,      y+3);
                text(CONSTANTS.TRIANGLE_R, x+ts/2+3, y+3);

              // Triangle
              fill(CLR);

              if(p.nextHit){
                fill(CLRH);
              }

                text(CONSTANTS.TRIANGLE_R, x+o,      y+o);
                text(CONSTANTS.TRIANGLE_R, x+ts/2+o, y+o);

            };
            function drawLast(){

              let ts=24;

              textSize(ts);
              noStroke();

              let x=4.5*p.h;
              let y=p.h/2;

              let o=0;

              if(p.lastHit){

                cursor(p.cursor);
    
                o=app.left ? 1 : 0;
                
                fill(128,32);

                  ellipse(x, y, p.h, p.h);

              }

              x-=ts;
              y=ts/2+15;

              // Triangle Shadow
              fill(CLRS);

                text(CONSTANTS.PIPE,       x+ts+9,   y+3);
                text(CONSTANTS.TRIANGLE_R, x+ts/2+3, y+3);

              // Triangle
              fill(CLR);

              if(p.lastHit){
                fill(CLRH);
              }

                text(CONSTANTS.PIPE,       x+ts+6+o, y+o);
                text(CONSTANTS.TRIANGLE_R, x+ts/2+o, y+o);

            };
            function drawPrevious(){

              let ts=24;

              textSize(ts);
              noStroke();

              let x=1.5*p.h;
              let y=p.h/2;

              let o=0;

              if(p.previousHit){

                cursor(p.cursor);
    
                o=app.left ? 1 : 0;
                
                fill(128,32);

                  ellipse(x, y, p.h, p.h);

              }

              x=p.h*1.5-ts+7;
              y=ts/2+15;

              // Triangle Shadow
              fill(CLRS);

                text(CONSTANTS.TRIANGLE_L, x+3,      y+3);
                text(CONSTANTS.TRIANGLE_L, x+ts/2+3, y+3);

              // Triangle
              fill(CLR);

              if(p.previousHit){
                fill(CLRH);
              }

                text(CONSTANTS.TRIANGLE_L, x+o,      y+o);
                text(CONSTANTS.TRIANGLE_L, x+ts/2+o, y+o);

            };
            function drawFirst(){

              let ts=24;

              textSize(ts);
              noStroke();

              let x=0.5*p.h;
              let y=p.h/2;

              let o=0;

              if(p.firstHit){

                cursor(p.cursor);
    
                o=app.left ? 1 : 0;
                
                fill(128,32);

                  ellipse(x, y, p.h, p.h);

              }

              x=p.h*0.5-ts;
              y=ts/2+15;

              // Triangle Shadow
              fill(CLRS);

              text(CONSTANTS.PIPE,       x+ts/2+3, y+3);
              text(CONSTANTS.TRIANGLE_L, x+ts/2+3, y+3);

              // Triangle
              fill(CLR);

              if(p.firstHit){
                fill(CLRH);
              }

                text(CONSTANTS.PIPE,       x+ts/2+o, y+o);
                text(CONSTANTS.TRIANGLE_L, x+ts/2+o, y+o);

            };

            drawRun();
            drawNext();
            drawLast();
            drawPrevious();
            drawFirst();

        pop();

      };
      dbControls.prototype.clicked=function(){
        /** Overridden for execute */

        // if(this.active){

          if     (this.firstHit   ){ this.first();    }
          else if(this.previousHit){ this.previous(); }          
          else if(this.runHit     ){ this.run();      }
          else if(this.nextHit    ){ this.next();     }
          else if(this.lastHit    ){ this.last();     }
          

        // }

      };
      dbControls.prototype.hitTest=function(x,y){

        let p=this;
        let r=p.h/2;  //  radius
        let d=p.h;    //  diameter

        function rectHit(x,y){
          
          let retVal=false;

          p.hit=mouseX>p.x+x &&
                mouseX<p.x+x+p.w &&
                mouseY>p.y+y &&
                mouseY<p.y+y+d;

          retVal=p.hit;

          return retVal;

        };

        function setFirstHit(x,y){

          p.firstHit=(dist(mouseX,
                           mouseY,
                           p.x+x+0.5*d,
                           p.y+y+r)<r);
        };
        function setPreviousHit(x,y){

          p.previousHit=(dist(mouseX,
                              mouseY,
                              p.x+x+1.5*d,
                              p.y+y+r)<r);
        };

        function setRunHit(x,y){

          p.runHit=(dist(mouseX,
                         mouseY,
                         p.x+x+2.5*d,
                         p.y+y+r)<r);
        };
        function setNextHit(x,y){

          p.nextHit=(dist(mouseX,
                          mouseY,
                          p.x+x+3.5*d,
                          p.y+y+r)<r);
        };
        function setLastHit(x,y){

          p.lastHit=(dist(mouseX,
                          mouseY,
                          p.x+x+4.5*d,
                          p.y+y+r)<r);
        };

        if(rectHit(x,y)){ setFirstHit(x,y);
                          setPreviousHit(x,y);
                          setRunHit(x,y);
                          setNextHit(x,y);
                          setLastHit(x,y);      }
        else            { p.firstHit=false;
                          p.previousHit=false;
                          p.runHit=false;
                          p.nextHit=false;
                          p.lastHit=false;      }
      };
      dbControls.prototype.moved=function(x,y){
        /** Overridden for shape */

        // if(this.parent.hit){

        this.hitTest(x,y)

        if(this.hit){

          app.focus=this;

        }

        // }

      };
      dbControls.prototype.resized=function(){

        this.y=this.parent.y+this.parent.h-this.h;

      };

    }

  }

  /** Initialize --------------------------------------------------------- */
  function initialize(){

    /*  Initialize the app.keys array and the values of the special keys */
    app.keys[KEYCODES.CONTROL] = false;
    app.keys[KEYCODES.ALT]     = false;
    app.keys[KEYCODES.SHIFT]   = false;

    /* LOAD CONTROLS */

    /* root control     */
    let rt=new root('root', 0, 0, windowWidth, windowHeight,
      {
        border: true,
        cursor: CROSS,
        color:  BLACK
      });

    app.controls.push(rt);

    /* Zen Animation    */
    // rt.controls.push(new zen(getGUID(), rt, 100, 100, 400, 400, null));

    /* Field            */
    rt.controls.push(new field('field', rt, 5, 5, rt.w - 205, rt.h - 25,
      { color: color(26,26,26,255) }));

    /* Telemetry ---------------------------------------------------- */
    let telem=new telemetry('telemetry', rt, rt.w - 195, 5, 190, rt.h - 20,
      { color: color(216,26,26,255)});

    app.controls.push(telem);

    /* Accessories ---------------------------------------------------- */

    /** Database Controls     */
    // ***** NOTE: Width must be 5 times the height
    rt.controls.push(new dbControls('dbControls', rt, 280, rt.h-100, 200, 40,
      {
        cursor:     HAND,
        color:      BLACK,
        retrieve:   getRunning,
        run:        toggleRunning,
        next:       app.field.next,
        previous:   app.field.previous,
        first:      app.field.first,
        last:       app.field.last
      }));

    // /** Slider     */
    // rt.controls.push(new slider('slider', rt, 200, rt.h-100, 400, 10,
    //   {
    //     cursor:   HAND,
    //     color:    BLACK,
    //     retrieve: getNodes,
    //     execute:  setNodes
    //   }));

    /** Shuffle Button   */
    rt.controls.push(new shuffleButton('shuffle', rt, 650, rt.h-50, 28, 28,
      {
        cursor:   HAND,
        color:    BLACK,
        execute:  printTour
      }));

    /** Reset Button     */
    rt.controls.push(new resetButton('reset', rt, 700, rt.h-50, 28, 28,
      {
        cursor:   HAND,
        color:    BLACK,
        execute:  reset
      }));

    /* Bruteforce -------------------------------------------------- */
    let bruteforce=new option('BRUTE FORCE', rt, 20, 330, 12, 12,
        { color:      WHITE,
          execute:    setAlgorithm,
          retrieve:   getAlgorithm,
          algorithm:  ALGORITHMS.BRUTEFORCE,
          caption:    "Brute Force" });
    
      app.controls.push(bruteforce);

    /* Genetic -------------------------------------------------- */
    let genetic=new option('GENETIC', rt, 20, 350, 12, 12,
        { color:      WHITE,
          execute:    setAlgorithm,
          retrieve:   getAlgorithm,
          algorithm:  ALGORITHMS.GENETIC,
          caption:    "Genetic" });
    
      app.controls.push(genetic);

    /* Simulated Annealing --------------------------------------------------- */
    let annealing=new option('SIMULATED ANNEALING', rt, 20, 370, 12, 12,
        { color:      WHITE,
          execute:    setAlgorithm,
          retrieve:   getAlgorithm,
          algorithm:  ALGORITHMS.SIMULATEDANNEALING,
          caption:    "S. Annealing" });
    
      app.controls.push(annealing);

    /* Grow --------------------------------------------------- */
    let grow=new option('GROW', rt, 20, 390, 12, 12,
    { color:      WHITE,
      execute:    setAlgorithm,
      retrieve:   getAlgorithm,
      algorithm:  ALGORITHMS.GROW,
      caption:    "Grow" });

    app.controls.push(grow);

    /* ACO --------------------------------------------------- */
    let aco=new option('ACO', rt, 20, 410, 12, 12,
    { color:      WHITE,
      execute:    setAlgorithm,
      retrieve:   getAlgorithm,
      algorithm:  ALGORITHMS.ACO,
      caption:    "ACO" });

    app.controls.push(aco);

    /* Chance --------------------------------------------------- */
    let chance=new option('CHANCE', rt, 20, 430, 12, 12,
        { color:      WHITE,
          execute:    setAlgorithm,
          retrieve:   getAlgorithm,
          algorithm:  ALGORITHMS.RANDOM,
          caption:    "Chance" });
    
      app.controls.push(chance);

    /* Greedy --------------------------------------------------- */
    let greedy=new option('GREEDY', rt, 20, 450, 12, 12,
        { color:      WHITE,
          execute:    setAlgorithm,
          retrieve:   getAlgorithm,
          algorithm:  ALGORITHMS.GREEDY,
          caption:    "Greedy" });
    
      app.controls.push(greedy);

    // ***** Greedy Methods *****

        /* Closest --------------------------------------------------- */
        let closest=new option('Closest', rt, 30, 470, 12, 12,
          { color:      WHITE,
            execute:    setMethod,
            retrieve:   getMethod,
            algorithm:  GREEDY_MODES.CLOSEST,
            caption:    "Closest" });

        app.controls.push(closest);

        /* Farthest --------------------------------------------------- */
        let Farthest=new option('Farthest', rt, 30, 485, 12, 12,
          { color:      WHITE,
            execute:    setMethod,
            retrieve:   getMethod,
            algorithm:  GREEDY_MODES.FARTHEST,
            caption:    "Farthest" });

        app.controls.push(Farthest);

        /* Random --------------------------------------------------- */
        let random=new option('Random', rt, 30, 500, 12, 12,
          { color:      WHITE,
            execute:    setMethod,
            retrieve:   getMethod,
            algorithm:  GREEDY_MODES.RANDOM,
            caption:    "Random" });

        app.controls.push(random);

    /* Convex Hull --------------------------------------------------- */
    let convexHull=new option('convexHull', rt, 20, 520, 12, 12,
        { color:      WHITE,
          execute:    setAlgorithm,
          retrieve:   getAlgorithm,
          algorithm:  ALGORITHMS.CONVEXHULL,
          caption:    "Convex Hull" });

      app.controls.push(convexHull);

    // /* Initialize --------------------------------------------------- */
    // let initialize=new checkbox('initialize', rt, 20, 520, 12, 12,
    //     { color:    WHITE,
    //       execute:  toggleInitialize,
    //       retrieve: getInitialize,
    //       caption:  "Initialize" });
    
    //   app.controls.push(initialize);

    /* Crossover ---------------------------------------------------- */
    let crossover=new checkbox('crossover', rt, 20, 540, 12, 12,
        { color:    WHITE,
          execute:  toggleCrossover,
          retrieve: getCrossover,
          caption:  "Crossover" });

    app.controls.push(crossover);

    /* Iterate ------------------------------------------------------ */
    let iterate=new checkbox('iterate', rt, 20, 560, 12, 12,
        { color:    WHITE,
          execute:  toggleIterate,
          retrieve: getIterate,
          caption:  "Iterate" });
  
      app.controls.push(iterate);

    /* Proximity ---------------------------------------------------- */
    let proximity=new checkbox('proximity', rt, 20, 580, 12, 12,
        { color:    WHITE,
          execute:  toggleProximity,
          retrieve: getProximity,
          caption:  "Proximity" });
  
      app.controls.push(proximity);

    /* Random Data ------------------------------------------------------ */
    let randomData=new option('RandomDate', rt, 20, 620, 12, 12,
    { color:      WHITE,
      execute:    setDataMode,
      retrieve:   getDataMode,
      algorithm:  DATA_MODES.RANDOM,
      caption:    "Random Data" });

    app.controls.push(randomData);

    /* Test Data ------------------------------------------------------ */
    let testData=new option('TestData', rt, 20, 640, 12, 12,
    { color:      WHITE,
      execute:    setDataMode,
      retrieve:   getDataMode,
      algorithm:  DATA_MODES.TEST,
      caption:    "Test Data" });

    app.controls.push(testData);

    /* Circle Data ------------------------------------------------------ */
    let circleData=new option('CircleData', rt, 20, 660, 12, 12,
    { color:      WHITE,
      execute:    setDataMode,
      retrieve:   getDataMode,
      algorithm:  DATA_MODES.CIRCLE,
      caption:    "Circle Data" });

      app.controls.push(circleData);

    /* Best Path ---------------------------------------------------- */
    let bestPath=new checkbox('bestPath', rt, 20, 700, 12, 12,
        { color:    WHITE,
          execute:  toggleBestPath,
          retrieve: getBestPath,
          caption:  "Best Path" });
  
      app.controls.push(bestPath);

    /* Working Path ---------------------------------------------------- */
    let workingPath=new checkbox('workingPath', rt, 20, 715, 12, 12,
        { color:    WHITE,
          execute:  toggleWorkingPath,
          retrieve: getWorkingPath,
          caption:  "Working Path" });
  
      app.controls.push(workingPath);

    /* Path Nodes ---------------------------------------------------- */
    let pathNodes=new checkbox('pathNodes', rt, 20, 730, 12, 12,
        { color:    WHITE,
          execute:  togglePathNodes,
          retrieve: getPathNodes,
          caption:  "Nodes" });

      app.controls.push(pathNodes);      

    /* Transition ---------------------------------------------------- */
    // let trans=new transition(getGUID(), rt, 1000, 0, width-200, height,
    // {color:     WHITE,
    // visible:   true,
    // type:      round(random(0,4))});

    // app.controls.push(trans);

    /* SplashScreen ------------------------------------------------- */
    {

      // /* Splash Screen   */
      // let splashScreen=new splash(getGUID(), rt, width/2-200, height/2-200, 400, 400,
      // {color:     BLACK,
      // font:      monoFont,
      // retrieve:  getInfo,
      // cursor:    CROSS});

      // /* Close         */
      // splashScreen.controls.push(new button(getGUID(), splashScreen, 180, 360, 120, 20,
      // {text:      'Close',
      // font:      monoFont,
      // execute:   toggleInfo,
      // color:     WHITE,
      // cursor:    HAND}));

      // rt.controls.push(splashScreen);

    }

    // rt.controls.push(new music('music', rt, 35, rt.h-35, 50, 50,
    //   {cursor:    HAND,
    //    execute:   setMusic,
    //    retrieve:  getMusic}));

    /** Score Board      */
    // rt.controls.push(new scoreBoard(getGUID(), rt, width-325, 10, 50, 50,
    // {color:     H_BLUE,
    // cursor:    HAND,
    // execute:   getRemaining,
    // retrieve:  getMistakes}));

    /** Clock            */
    // rt.controls.push(new clock(getGUID(), rt, (width-200)/2, 30, 50, 50,
    // {cursor:    HAND}));

    /** Menu Button      */
    // rt.controls.push(new menuButton('menu', rt, 45, 45, 60, 60,
    //   {text:      'Yippee',
    //    cursor:    HAND,
    //    execute:   menu}));

    /* Puzzle Complete   */
    // let pc=new puzzleComplete(getGUID(), rt, 1000, 1, width-201, height-2,
    // {text:      'Puzzle Complete',
    // color:     H_BLUE});

    // app.controls.push(pc);

    /* Puzzle Select     */
    // let ps=new puzzleSelect(getGUID(), rt, 1000, 0, width-200, height,
    // {retrieve:  getScore,
    // color:     getColor(H_BLUE,2)});

    // app.controls.push(ps);

  };

  initialize();

  function update(){

    //  Frame Rate
    if(frameCount%30==0){ app.frameRate=getFrameRate(); }

    app.elapsedTime=(millis()-app.startTime)/1000;

    app.control = app.keys[KEYCODES.CONTROL];
    app.alt     = app.keys[KEYCODES.ALT];
    app.shift   = app.keys[KEYCODES.SHIFT];

  };

  let x  = 0;
  let y  = 0;
  let cx = (windowWidth-200)/2;
  let cy = windowHeight/2;

  function handleKeys(){

    if (frameCount % 5 === 0) {

      switch (true) {

        case keyIsDown(KEYCODES.F2): randomize(); break;

        case keyIsDown(KEYCODES.Q): upLeft(); break;
        case keyIsDown(KEYCODES.E): upRight(); break;

        case keyIsDown(KEYCODES.A): downLeft(); break;
        case keyIsDown(KEYCODES.D): downRight(); break;

        case keyIsDown(KEYCODES.W): up(); break;
        case keyIsDown(KEYCODES.S): down(); break;

        case keyIsDown(UP_ARROW): colUp(); break;
        case keyIsDown(DOWN_ARROW): colDown(); break;

        case keyIsDown(LEFT_ARROW) &&
             keyIsDown(CONTROL): colDownLeft(); break;
        case keyIsDown(RIGHT_ARROW) &&
             keyIsDown(CONTROL): colDownRight(); break;

        case keyIsDown(LEFT_ARROW): colUpLeft(); break;
        case keyIsDown(RIGHT_ARROW): colUpRight(); break;

        default: break;

      }

    }

  };

  function draw(){

    background(32);

    forEach(app.controls, 'draw');

    update();

  }

  /* Mouse Events ============================================================== */
  {

    function mouseClicked(){

      switch (mouseButton) {

        case LEFT:  forEach(app.controls, 'clicked'); break;
        // case RIGHT: forEach(app.controls, 'rclicked'); break;
        // case CENTER:  forEach(app.controls,'cclicked'); break;

        default:                                      break;

      }

      switch (true) {

        case mouseButton==LEFT:

          if (app.keys[KEYCODES.CONTROL]){ increment--; }
          else                           { increment++; };  break;

        case mouseButton==RIGHT:                            break;
        default:                                            break;

      }

    };
    function doubleClicked(){

      //       app.fullscreen=!app.fullscreen;

      //       fullscreen(app.fullscreen);
      // print('dclicked');
    };
    function mouseMoved(){

      app.mouseX = mouseX;
      app.mouseY = mouseY;

      for (let c in app.controls) { app.controls[c].moved(0, 0); }

    };
    function mousePressed(){

      switch (mouseButton) {

        case LEFT: app.left = true; break;
        case CENTER: app.center = true; break;
        case RIGHT: app.right = true; break;

        default: break;

      }

    };

    function mouseReleased(){

      switch (mouseButton) {

        case LEFT: forEach(app.controls, 'released');

          // Tidy up dragging
          {

            // app.field.clearDragging();

            app.dragStartX = 0;
            app.dragStartY = 0;

            app.dragging = false;

            app.dragDirection = DRAG_DIRECTIONS.NONE;

            x = cx;
            y = cy;

          }

          break;

        // case RIGHT:  for(let c in app.controls){ app.controls[c].rClicked(); } break;
        // case CENTER: for(let c in app.controls){ app.controls[c].cClicked(); } break;

        default: break;

      }

      app.left = false;
      app.right = false;
      app.center = false;

    };
    function mouseDragged(){

      // function calcDragAngle(){

      //   let a = atan2(mouseY-pmouseY, mouseX-pmouseX);

      //   a=a*180/PI;

      //   x=cx;
      //   y=cy;

      //   switch(true){

      //     case a >= 67.5 && a <= 122.5:
      //     case a <=-67.5 && a >=-122.5:   x = cx;
      //                                     y = cy + 150;

      //                                     app.dragDirection=DRAG_DIRECTIONS.UPDOWN;

      //                                     setDragColumn();    // Determine which cells are being dragged

      //                                     break;

      //     case a >=   0 && a <=  67.5:
      //     case a >=-180 && a <=-122.5:    x = cx + 100;
      //                                     y = cy +  50;

      //                                     app.dragDirection=DRAG_DIRECTIONS.FORWARD;

      //                                     setDragForward();   // Determine which cells are being dragged

      //                                     break;

      //     case a <= 180 && a >= 122.5:
      //     case a <=   0 && a >= -67.5:    x = cx - 100;
      //                                     y = cy +  50;

      //                                     app.dragDirection=DRAG_DIRECTIONS.BACKWARD;

      //                                     setDragBackward();  // Determine which cells are being dragged

      //                                     break;

      //     default:                        break;

      //   }

      // };

      // switch(mouseButton){

      //   case LEFT:

      //                 forEach(app.controls,'dragged');  //  Necessary to put this first to set the active cell

      //                 if(app.dragging===false){

      //                   app.dragStartX=mouseX;
      //                   app.dragStartY=mouseY;

      //                   app.dragging=true;

      //                 }
      //                 else{

      //                   if(dist(app.dragStartX,
      //                           app.dragStartY,
      //                           mouseX,
      //                           mouseY)>10){

      //                     if(x===cx &&
      //                        y===cy){ calcDragAngle(); }

      //                   }

      //                 }

      //                 break;

      //   // case RIGHT:   forEach(app.controls,'rDragged');

      //                 // break;

      //   // case CENTER:  forEach(app.controls,'cDragged');

      //                 // break;

      //   default:      break;

      // }

      forEach(app.controls,'dragged');

    };
    function mouseOut(){

      // forEach(app.controls,'out');

      // app.focus=-1;

    };
    function mouseOver(){

      forEach(app.controls, 'over');

      app.focus = -2;

    };

  }

  /* Keyboard Events =========================================================== */
  {

    keyPressed = function (){

      app.keys[this.keyCode] = true;

      // print(keyCode + ' | ' + key + ' | ' + key.toString());

      switch (true) {

        /* Navigation                                                       */
        case keyIsDown(KEYCODES.Q):       upLeft(); break;
        case keyIsDown(KEYCODES.E):       upRight(); break;

        case keyIsDown(KEYCODES.A):       downLeft(); break;
        case keyIsDown(KEYCODES.D):       downRight(); break;

        case keyIsDown(KEYCODES.W):       up(); break;
        case keyIsDown(KEYCODES.S):       down(); break;

        case keyIsDown(KEYCODES.P):       toggleRunning(); break;

        /* Translate Rows/Columns                                           */
        case keyIsDown(KEYCODES.UP):      colUp();
                                          app.field.addMove(DIRECTIONS.UP); break;
        case keyIsDown(KEYCODES.DOWN):    colDown();
                                          app.field.addMove(DIRECTIONS.DOWN); break;

        case keyIsDown(KEYCODES.LEFT) &&
             keyIsDown(CONTROL):          colDownLeft();
                                          app.field.addMove(DIRECTIONS.DOWNLEFT); break;
        case keyIsDown(KEYCODES.RIGHT) &&
             keyIsDown(CONTROL):          colDownRight();
                                          app.field.addMove(DIRECTIONS.DOWNRIGHT); break;

        case keyIsDown(LEFT_ARROW):       decrementNodes();                         break;
        case keyIsDown(RIGHT_ARROW):      incrementNodes();                         break;

        /* Puzzles                                                          */
        case keyIsDown(KEYCODES.PGUP):    incrementPuzzle(); break;
        case keyIsDown(KEYCODES.PGDN):    decrementPuzzle(); break;

        /*  Function Keys                                                   */
        case keyIsDown(KEYCODES.F1):      toggleInfo(); break;
        case keyIsDown(KEYCODES.F2):      randomize(); break;
        // case keyIsDown(KEYCODES.F3):    toggleTelemetry();    break;
        case keyIsDown(KEYCODES.F4):      toggleTelemetry(); break;
        // case app.keys[KEYCODES.CONTROL] &&
        // app.keys[KEYCODES.F5]:         clearLayout();         break;
        case keyIsDown(KEYCODES.F8):      reset(); break;

        /* Edit                                                             */
        case app.keys[KEYCODES.Z] &&
             app.keys[KEYCODES.CONTROL]:  app.field.undo(); break;  // reverse latest move

        // case app.keys[KEYCODES.SPACE] &&
        // app.keys[KEYCODES.CONTROL]:    decrCellLayout();      break;  // Decrement Layout
        // case app.keys[KEYCODES.SPACE]:      incrCellLayout();      break;  // Increment Layout

        // /* Figure out how to use this                                                                          */
        // case app.keys[KEYCODES.CODED]:                             break;

        default: break;

      }

    };
    keyReleased = function (){ app.keys[keyCode] = false; };

  }

  function windowResized(){

    resizeCanvas(windowWidth - 10, windowHeight - 10);

    forEach(app.controls, 'resized');

    print('resized');

  }


  // function generate(n, arr){

  //   //c is an encoding of the stack state. c[k] encodes the for-loop counter for when generate(k+1, A) is called
  //   c=[];

  //   let i=0;

  //   for(i=0; i<n; i++){
  //     c[i]=0;
  //   }

  //   //i acts similarly to the stack pointer
  //   i=0;

  //   while(i<n){

  //     if(c[i]<i){

  //       if(i%2==0){ swap(arr, 0, i);    }
  //       else      { swap(arr, c[i], i); }

  //       // print(arr);

  //       //  Swap has occurred ending the for-loop.
  //       //  Simulate the increment of the for-loop counter
  //       c[i]++;

  //       //  Simulate recursive call reaching the base case by
  //       //  bringing the pointer to the base case analog in the array
  //       i=0;

  //     }
  //     else{

  //       //  Calling generate(i+1, A) has ended as the for-loop terminated.
  //       //  Reset the state and simulate popping the stack by incrementing the pointer.
  //       c[i]=0;
  //       i++;

  //     }

  //   }

  // }

  // let arrTest=[1,2,3,4,5];

  // generate(arrTest.length, arrTest);

}























{
  /**  Whitelist
   * 
*
+stackoverflow.com
+khanacademy.org
+codecogs.com/latex/eqneditor.php
+youtube.com
+mail.google.com
+bradsiemens.com
+processingjs.org
+processing.org
forum.processing.org
+wikipedia.org
+google.com
+w3schools.com
+touchmathematics.org
+desmos.com
+github.com
+emptyblack.com
+redblobgames.com
+dailymotion.com
+pistolslut.com
+latin-phrases.co.uk/quotes/beginning-end
+code.org
+natureofcode.com
+alssndro.github.io/trianglify-background-generator
+p5js.org
+google.ca
+projecteuler.net
+www.numberempire.com
+oeis.org
+math.stackexchange.com
+jasondavies.com
+developer.mozilla.org
+docs.oracle.com
+www.mathopenref.com
+alpha.editor.p5js.org
+en.wikibooks.org
+upload.wikimedia.org
+viterbipk12.usc.edu

*/
}

/**

1729 = 9^3 + 10^3 = 12^3 + 1^3

tsp.js

*/
