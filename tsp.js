  // Does the algorithm get more efficient as the # of nodes increases?
  // You only need to iterate 3-4% of possible cycles with 10,000,000 possibilities

  /*

    Nodes shape options
      - rectangular
      - circular
      ...

    To Do:

      calculate:

        hull length
        hull area

    To Done:

      load nodes
      
      set sectors
      
      set boundary nodes

      exclude nodes
      process nodes

  */
  {

    var PRE_PROCESSING = {

      NONE:             0,
      QUAD:             1,
      TRIANGLE:         2

    };
    var HULL_METHODS = {

      BUBBA:            0,
      GIFT_WRAP:        1,
      QUCK_HULL:        2,
      DIVIDE_CONQUER:   2,
      MONOTONE_CHAIN:   2,
      INCREMENTAL:      2,
      ULTIMATE_PLANAR:  2,
      CHANS_ALGORITHM:  2

    };

    let nodes           = [];     //  All nodes
    let candidates      = [];     //  Possible hull nodes
    let hull            = [];     //  Only hull nodes
  
    let origin;               //  Point used to determine convexity

    let domain          = -1;
    let range           = -1;

    let nod0;
    let nod1;
    let nod2;
  
    
    let sorted          = false;
    let excludeOnLoad   = false;                 //  Nodes are eliminated while they are loaded

    let preprocessing   = PRE_PROCESSING.TRIANGLE;
    let hullMethod      = HULL_METHODS.BUBBA;

    let buffer          = 20;
    let candidateCount  = -1;
    let extent          = -Infinity;
    let hullLength      = -Infinity;
    let hullArea        = -Infinity;

    let radius          = Infinity;
    let diameter        = 10;
  
    let M=0;
    let N=0;
    
    let q1              = false;
    let q2              = false;
    let q3              = false;
    let q4              = false;

    let q1Count         = 0;
    let q2Count         = 0;
    let q3Count         = 0;
    let q4Count         = 0;

    let sectors         = [];
    let sectorCount     = 8;  //  Change based on Pre-processing heuristic

    let thetaQuadrant   = -1;

    let quadrants       = [];

    // let counter=0;

    let limit           = 300; //  3163 squared is approx 10,000,000

    let processCount    = 0;    //  # of comparisons conducted

    let running         = false;
    let loaded          = false;
    let excluded        = false;
    let processed       = false;

    class node {
      
      constructor(n=0, x=-1, y=-1){
  
        this.id       = n;          //  node index
        this.cid      = null;       //  candidate index
  
        this.x        = x;          //  x coordinate
        this.y        = y;          //  y coordinate

        this.theta    = -Infinity;  //  Angle to the origin

        this.quadrant = -Infinity;  // cartesian quadrant
        this.sector   = -Infinity;  // exclusion sector
        this.distance = -Infinity;  // distance to the origin

        this.polar    = -Infinity + "," + -Infinity;

        this.next     = null;       // linked list next
        this.previous = null;       // linked list previous
  
        this.hull     = true;       // nodes are opt-out for the hull

        this.selected = false;  

      }
  
      // clone(cid){
  
      //   var nClone=new node(this.id, this.x, this.y);
  
      //   nClone.cid      = cid;
  
      //   nClone.next     = this.next;
      //   nClone.previous = this.previous;
  
      //   nClone.hull     = this.hull;
  
      //   nClone.selected = this.selected;
  
      //   return nClone;
  
      // }
      
    }
  
    function setup(){

      frameRate(100);

      noCursor();
  
      "use strict"; 
  
      createCanvas(windowWidth-50, windowHeight-50, P2D);
  
      strokeJoin(BEVEL);
  
      if(width>height){ extent=height; }
      else            { extent=width;  }
  
      // diameter=extent-2*buffer;
      radius=diameter/2;
  
      origin=new node("C", 0, 0);

      for(let n=0; n<sectorCount; n++){
        sectors[n]=origin;
      }

    }; 

    { // Misc
      
      function purgeCandidates(){

        let arr=[];

        for(let n=0; n<candidates.length; n++){

          if(candidates[n].hull){
            arr.push(candidates[n]);
          }

        }

        candidates=[];

        arrayCopy(arr,candidates);

print(arr);
print(candidates);

      }
      function calculateHullLength(){

        let cds=candidates;

        hullLength=0;

        if(cds.length!=0){

          for(let n=0; n<cds.length-1; n++){

            hullLength+=dist(cds[n].x,
                             cds[n].y,
                             cds[n+1].x,
                             cds[n+1].y);
          }

          hullLength+=dist(cds[0].x,
                           cds[0].y,
                           cds[cds.length-1].x,
                           cds[cds.length-1].y);
        }

      }
      function calculateHullArea(){

        hullArea=0;

        if(candidates.length!=0){

          for(let n=0; n<candidates.length-1; n++){

            hullArea+=triangleArea(origin,nodes[n],nodes[n+1]);

          }

          hullArea+=triangleArea(origin,nodes[candidates.length-1],nodes[0]);
        
        }

        // print(width        + " : " + height        + " : " + width*height);
        // print(displayWidth + " : " + displayHeight + " : " + displayWidth*displayHeight);
        // print(windowWidth  + " : " + windowHeight  + " : " + windowWidth*windowHeight);

      }

      function swap(m,n){
    
        let temp=n;   
        n=m;
        m=temp;
        
      }
      function sortByTheta(arr){
    
        for(let n=0; n<arr.length; n++){
          for(let m=0; m<arr.length; m++){
            
            if(arr[n].theta>arr[m].theta){
              
              let temp = arr[n];   
              arr[n]   = arr[m];
              arr[m]   = temp;
    
            }
    
          }
        }
  
      }
  
      function triangleArea(p0,p1,p2){
    
        //  Heron's Formula
        let a=dist(p0.x, p0.y, p1.x, p1.y);
        let b=dist(p1.x, p1.y, p2.x, p2.y);
        let c=dist(p2.x, p2.y, p0.x, p0.y);

        let semi=(a+b+c)/2;
        
        return pow((semi*(semi-a)*(semi-b)*(semi-c)), 0.5);
            
      }

      function hullHit(origin,p0,p1,p2){

        // If the large triangle is smaller the sum of the other 2, the nodes are convex
        let largeTriangle  = triangleArea(origin,p0,p2);
        let smallTriangles = triangleArea(origin, p0, p1) + triangleArea(origin, p1, p2);

        return (largeTriangle>smallTriangles);

      }
      
    }
    function setSector(nod){

      for(let s=0; s<sectors.length-1; s++){

        if(nod.theta>=sectors[s].theta &&
           nod.theta<=sectors[s+1].theta){
            nod.sector=s;
          break;
        }

      }

      if(nod.sector==-Infinity){
        nod.sector=sectors.length-1;
      }


    }

    function setSectors(){

      for(let n=0; n<nodes.length; n++){
        setSector(nodes[n]);
      }

    }

    function setQuadrantOctagonal(nod){

      let tq  = thetaQuadrant;
      let th  = nod.theta;
      let q   = -1;

      try{

        switch(true){

          case th >=  0     && th <= tq:      q=0; q1Count++; break;
          case th >= tq     && th <= 90:      q=1; q1Count++; break;
          case th >=  90    && th <= 180-tq:  q=2; q2Count++; break;
          case th >= 180-tq && th <= 180:     q=3; q2Count++; break;
          case th >= 180    && th <= 180+tq:  q=4; q3Count++; break;
          case th >= 180+tq && th <= 270:     q=5; q3Count++; break;
          case th >= 270    && th <= 360-tq:  q=6; q4Count++; break;
          case th >= 360-tq && th <= 360:     q=7; q4Count++; break;

          default:                  throw('Bad Quadrant');

        }

        nod.quadrant=q;

        if(nod.distance>sectors[q].distance ){ sectors[q]=nod; }

      }
      catch(err){
        print(err + " : " + th + " : " + nod.id + " : " + q);
      }

    }
    function setQuadrantCartesian(nod){

      try{

        let th  = nod.theta;
        let q   = -1;

        switch(true){

          case th >=   0 && th <=  90: q=0; q1Count++; break;
          case th >=  90 && th <= 180: q=1; q2Count++; break;
          case th >= 180 && th <= 270: q=2; q3Count++; break;
          case th >= 270 && th <= 360: q=3; q4Count++; break;

          default:         throw('Bad Quadrant');

        }

        nod.quadrant=q;

        if(nod.distance>sectors[q].distance ){ sectors[q]=nod; }

      }
      catch(err){
        print(err + " : " + th + " : " + nod.id + " : " + q);
      }

    } 

    function excludeNodeQuadRectangle(nod){

      if(nod.x<sectors[0].x &&  //  x coordinates
         nod.x>sectors[1].x &&
         nod.x>sectors[2].x &&
         nod.x<sectors[3].x &&
         nod.y<sectors[0].y &&  //  y coordinates
         nod.y<sectors[1].y &&
         nod.y>sectors[2].y &&
         nod.y>sectors[3].y){

        nod.hull=false;

      }

    }
    function excludeNodeOctoRectangle(nod){

      if(nod.x<sectors[0].x &&  //  x coordinates
         nod.x<sectors[1].x &&
         nod.x<sectors[6].x &&
         nod.x<sectors[7].x &&
         nod.x>sectors[2].x &&
         nod.x>sectors[3].x &&
         nod.x>sectors[4].x &&
         nod.x>sectors[5].x &&
         nod.y>sectors[4].y &&  // y coordinates
         nod.y>sectors[5].y &&
         nod.y>sectors[6].y &&
         nod.y>sectors[7].y &&
         nod.y<sectors[0].y &&
         nod.y<sectors[1].y &&
         nod.y<sectors[2].y &&
         nod.y<sectors[3].y){

        nod.hull=false;

      }
      
    }
    function excludeNodeTriangle(nod){

      let q=nod.sector;
      let p=q+1;

      if(q==sectorCount-1){ p=0; }

      if(hullHit(origin,sectors[q],nod,sectors[p])){
        nod.hull=false;
      }

    }
    function excludeNodeQuadrants(nod){

      let q1=false;
      let q2=false;
      let q3=false;
      let q4=false;

      for(let n=0; n<nodes.length; n++){

        if(nodes[n].x>nod.x && nodes[n].y<nod.y){ q1=true; } // Quadrant #1
        if(nodes[n].x<nod.x && nodes[n].y<nod.y){ q2=true; } // Quadrant #2
        if(nodes[n].x>nod.x && nodes[n].y>nod.y){ q3=true; } // Quadrant #3
        if(nodes[n].x<nod.x && nodes[n].y>nod.y){ q4=true; } // Quadrant #4

        if(q1 && q2 && q3 && q4){

          nod.hull=false;
          
          q1=false;
          q2=false;
          q3=false;
          q4=false;

          break;
        }

      }

    }

    let setQuadrant;
    let excludeNode;
    let processNode;

    if(sectorCount==4){
      setQuadrant=setQuadrantCartesian;
      // excludeNode=excludeNodeQuadRectangle;
      excludeNode=excludeNodeTriangle;
      // setNodeQuadrant=setNodeQuadRectangle;
    }
    else if(sectorCount==8){
      setQuadrant=setQuadrantOctagonal;
      // excludeNode=excludeNodeOctoRectangle;
      // excludeNode=excludeNodeTriangle;
      excludeNode=excludeNodeQuadrants;
      // setNodeQuadrant=setNodeQuadOcto;
    }
    else{
      print("Error in quadrant count");
    }

    let _minX  = Infinity;
    let _maxX  = 0;
    let _minY  = Infinity;
    let _maxY  = 0;

    function loadNodes(){
      
      let _x     = -1;
      let _y     = -1;

      push();
  
        translate(width/2,height/2);
          
          // Determine theta of the sloped corners
          thetaQuadrant=180/PI*atan2(height/2,width/2);

          let _n=N;

          // for(let _n=0; _n<limit; _n++){

            _x = round(random(3*buffer-width/2, width/2-buffer   ));
            _y = round(random(buffer-height/2,  height/2-3*buffer));

            if(_x < _minX){ _minX = _x; }
            if(_x > _maxX){ _maxX = _x; }
            if(_y < _minY){ _minY = _y; }
            if(_y > _maxY){ _maxY = _y; }

            let nod = new node(_n,_x,_y);

            nodes.push(nod);

            nod.distance = dist(0,0,_x,_y);
            nod.theta    = 180/PI*atan2(_y,_x);
            nod.polar    = nod.distance + "," + nod.theta;

            if(nod.theta<0){ nod.theta+=360; }

            setQuadrant(nod);

            // Include a flag for exclude on load
            if(excludeOnLoad){ excludeNode(nod); }

          // }

          //  Set the domain and range of the nodes
          domain = abs(_maxX-_minX);
          range  = abs(_minY-_maxY);

      pop();

      N++;

      if(nodes.length==limit){
            
        N=0;
        loaded=true;
        running=false;

        // Sectors are dynamic so they are set after loading is complete
        for(let n=0; n<nodes.length; n++){

          setSector(nodes[n]);

        }

      }

    }
  
    function loadLinkedList(){
  
      let nod=candidates[0];
  
      for(let n=0; n<candidates.length; n++){
  
        nod.cid=n;
        nod.selected=true;

        nod.next=candidates[n+1];
  
        if(nod.next!=null){
          nod.next.previous=nod;
        }
        else{
          nod.next=candidates[0];
          candidates[0].previous=nod;
        }
  
        nod=nod.next
  
      }
  
    }
    function loadCandidates(){

      for(let n=0; n<N; n++){

        if(nodes[n].hull){
          nodes[n].cid=candidates.length;
          candidates.push(nodes[n]);
        }

      }

      sortByTheta(candidates);

    }

    function setCandidates(){

      // for(let n=0; n<nodes.length; n++){

        excludeNode(nodes[N]);

        if(nodes[N].hull){
          candidates.push(nodes[N]);
          candidates[candidates.length-1].cid=candidates.length;
          sortByTheta(candidates);
        }
        // loadCandidates();

      // }

      N++;

      if(N==limit){

        // sortByTheta(candidates);

        loadLinkedList();
  
        nod0=candidates[0];
        nod1=nod0.next;
        nod2=nod1.next;

        N=2 * candidates.length;
        
        excluded=true;
        running=false;

      }

    }
  
    function calculateHull(){
  
      nod1=nod0.next;
      nod2=nod1.next;

      if(running){
        
        if(hullHit(origin,
                   nod0,
                   nod1,
                   nod2)){

          nod1.hull=false;
          nod1.next=null;
          nod1.previous=null;
          
          nod0.next=nod2;
          nod2.previous=nod0;
  
          nod0=nod0.previous;

          // loadCandidates();
          return;
  
        }
        else{
      
          nod0=nod0.next;
      
        }
  
      }
    
    }

    function drawSectorsQuad(){

      let r=10;

      fill(128,10);
      stroke(128);
      strokeWeight(2);

      beginShape();

        for(let n=0; n<sectors.length; n++){

          ellipse(sectors[n].x, sectors[n].y, 10, 10);
          
          vertex(sectors[n].x, sectors[n].y);

        }

      endShape(CLOSE);

      // Draw quadrant lines
      stroke(0,255,0,128);
      strokeWeight(0.5);

      for(let n=0; n<sectors.length; n++){
        line(0,0,sectors[n].x,sectors[n].y);
      }
                
    }
    function drawSectorsOcto(){

      // Slices
      stroke(128,0,0,128);
      strokeWeight(1);

        line(origin.x, origin.y, width/2, height/2);
        line(origin.x, origin.y,-width/2, height/2);
        
        line(origin.x, origin.y, width/2,-height/2);
        line(origin.x, origin.y,-width/2,-height/2);

      // Draw quadrant lines
      
          textSize(24);
          
        for(let n=0; n<sectors.length; n++){
      
          stroke(0,255,0,128);

            line(0,0,sectors[n].x,sectors[n].y);

          noStroke();
          fill(0,128,255);

            if(n<sectors.length-1){
              text(n,(sectors[n].x+sectors[n+1].x)/2,(sectors[n].y+sectors[n+1].y)/2);
            }
            else{
              text(n,(sectors[n].x+sectors[0].x)/2,(sectors[n].y+sectors[0].y)/2);
            }

        }

        fill(0,20);
        stroke(128);
        strokeWeight(2);
  
        beginShape();
  
          for(let n=0; n<sectors.length; n++){
  
            ellipse(sectors[n].x, sectors[n].y, 10, 10);
            
            vertex(sectors[n].x, sectors[n].y);
  
          }
  
        endShape(CLOSE);

    }        
    
    function drawCandidateHull(){

      //  Draw line connecting cadidates
      stroke(128,128);
      strokeWeight(2);
      fill(16,50);

      beginShape();

        for(let n=0; n<candidates.length; n++){

          if(candidates[n].hull){
            vertex(candidates[n].x,candidates[n].y);
          }

        }

      endShape(CLOSE);

      // textSize(16);
      // fill(128);
      // noStroke();

      // for(let n=0; n<sectors.length; n++){
      //   text(n,sectors[n].x,sectors[n].y);
      // }

    }
    // function drawCandidateNodes(){

    //   let r=3;

    //   fill(255,255,0);
    //   noStroke();

    //     for(let n=0; n<candidates.length; n++){

    //       ellipse(candidates[n].x, candidates[n].y, r, r);

    //     }

    // }      
    function drawNodes(){

      let r=-Infinity;

      noStroke();

        for(let n=0; n<nodes.length; n++){

          if(nodes[n].hull){ fill(255,255,0);
                             r=5;             }
          else             { fill(255);
                             r=1;             }

          if(n==N){ r=10; 
                    fill( 0,255,0);} // && running

          ellipse(nodes[n].x, nodes[n].y, r, r);

        }

    }

    { // GUI

      function drawCursor(){
    
        noFill();
        stroke(192);
    
        if(running){ strokeWeight(1.0); }
        else       { strokeWeight(0.5); }
    
          line(-width/2,         mouseY-height/2, mouseX-width/2-5, mouseY-height/2);
          line(mouseX-width/2+5, mouseY-height/2,          width/2, mouseY-height/2);
    
          line(mouseX-width/2,         -height/2, mouseX-width/2, mouseY-height/2-5);
          line(mouseX-width/2, mouseY-height/2+5, mouseX-width/2, height/2);
    
          ellipse(mouseX-width/2,mouseY-height/2,10,10);
    
          return;

          push();
    
            // translate(-width/2,-height/2);
            // scale(1,-1);
    
            textSize(12);
            textAlign(LEFT,BOTTOM);
            fill(128);
            noStroke();
    
              text(round(atan2(mouseY,mouseX)*180/PI),mouseX+10,mouseY-10);
    
          pop();

        if(running){
        
          textSize(24);
          fill(212);
          noStroke();
    
          textAlign(LEFT,BOTTOM);
    
            text("1", mouseX-width/2+20, mouseY-height/2-20);
    
          textAlign(RIGHT,BOTTOM);
          
            text("2", mouseX-width/2-20, mouseY-height/2-20);
    
          textAlign(RIGHT,TOP);
          
            text("3", mouseX-width/2-20, mouseY-height/2+20);
          
          textAlign(LEFT,TOP);
          
            text("4", mouseX-width/2+20, mouseY-height/2+20);
        }
    
      }  

      function telemetry(){

        calculateHullLength();
        calculateHullArea();

        fill(128);
        noStroke();
        textSize(16);
        textAlign(LEFT,BOTTOM);

        let cl = candidates.length;
        let nl = nodes.length;

        let row1=processCount + " : " + pow(limit,2) + " : " + nf(processCount/pow(limit,2)*100,1,2) + "%";
        let row2=cl + " : " + nl + " : " + nf(cl/nl*100,1,2) + "%";

          text(row1,-width/2+20, height/2-30);
          text(row2,-width/2+20, height/2-10);

          text(N,-width/2+20, height/2-200);

        textSize(12);

          text("Hull Area:    " + round(hullArea),-width/2+200, height/2-25);
          text("Hull Length: " + round(hullLength),-width/2+200, height/2-10);
          
        // Domain and Range
        let dr="Domain: " + domain + " - Range:  " + range;

          text(dr,-width/2+400, height/2-10);

        fill(128);
        noStroke();
        textAlign(RIGHT,BOTTOM);

          text(q1Count  + " | " +
                q2Count + " | " +
                q3Count + " | " +
                q4Count, width/2-20, height/2-20);

        textAlign(LEFT,BOTTOM);

          text("Loaded:      " + loaded, width/2-300, height/2-40);
          text("Excluded:  "   + excluded, width/2-300, height/2-25);
          text("Processed: "   + processed, width/2-300, height/2-10);

          text("Running:     " + running, width/2-450, height/2-10);

      }        
      function drawGUI(){

      
        function drawBorder(){

          //  Border
          fill(16);
          noStroke();
          stroke(128);
          strokeWeight(1);

            rect(-width/2,-height/2, width-1, height-1);

        }
        function drawAxis(){

          // Slices
          stroke(255,0,0,128);
          strokeWeight(0.5);
  
            line(origin.x, origin.y, 0,-height/2);
            line(origin.x, origin.y, 0, height/2);
  
            line(origin.x, origin.y,-width/2, 0);
            line(origin.x, origin.y, width/2, 0);

          if(sectorCount==8){

            strokeWeight(0.5);

              line(origin.x, origin.y, width/2, height/2);
              line(origin.x, origin.y, width/2,-height/2);
              line(origin.x, origin.y,-width/2, height/2);
              line(origin.x, origin.y,-width/2,-height/2);

          }

        }        
        function drawOrigin(){
    
          fill(128,0,0,128);
          noStroke();
        
            ellipse(origin.x, origin.y, diameter, diameter);
      
        }

        background(0);

        fill(128);
        textSize(36);
        textAlign(CENTER,CENTER);
        
          // if(!running){ text("Click to begin", origin.x, origin.y-100); }
          // else        { text("Click to pause", origin.x, origin.y-100); }
        
        drawBorder();          
        
        if(!processed){
          drawAxis();
          drawSectors();
        }

        // drawOrigin();

        telemetry();

      }

      function drawTriangles(){

        noStroke();
  
        fill(128,  0,  0, 96);
  
          triangle(origin.x, origin.y,
                   nod0.x,   nod0.y,
                   nod1.x,   nod1.y);
  
        fill(  0,128,  0, 96);
    
          triangle(origin.x, origin.y,
                   nod1.x,   nod1.y,
                   nod2.x,   nod2.y);
  
        noFill();
    
        strokeWeight(0.5);
        stroke(255,255,255,255);
  
          triangle(origin.x, origin.y,
                   nod0.x,   nod0.y,
                   nod2.x,   nod2.y);

      }

      let drawSectors;

      if(sectorCount==4){
        drawSectors=drawSectorsQuad;
      }
      else if(sectorCount==8){
        drawSectors=drawSectorsOcto;
      }

    }

    function processCandidates(){

      frameRate(10);

      if(N>0){
      
        calculateHull();
        drawTriangles();

        N--;

      }
      else{
        
        if(running){
          purgeCandidates();
          calculateHullLength();
          calculateHullArea();
        }

        running=false;
        processed=true;
        N=0;

      }

    }

    function process(){

      if(excluded && !processed){ processCandidates(); }
      if(loaded && !excluded   ){ setCandidates();     }
      if(!loaded               ){ loadNodes();         }

    }

    function draw(){

      push();

        translate(width/2+0.5, height/2+0.5);

          drawGUI();
          drawNodes();
          // drawCandidateNodes();
          drawCandidateHull();
          drawCursor();

          if(running){ process(); }

      pop();

    }  
    function keyPressed(){
      
      print(keyCode);

      if(keyCode){

        process();

      }

    }
    function mouseClicked(){

      running=!running;

      if(running){

        if(loaded  ){ }
        if(excluded){ }

      }

      if(keyIsDown(CONTROL)){
        print(candidates);
      }
      
    }
  
    function doubleClicked(){

      print("doubleClicked");

      print(nodes);

    }

  }

/*  

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
