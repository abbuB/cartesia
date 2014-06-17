<!DOCTYPE html>

  <html lang="en">

    <head>

      <meta charset="UTF-8">
      <link rel="stylesheet" href="assets/stylesheets/cartesia.css">
      <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Lato:100,300,400">
      <title>Cartesia:  Pythagorian Triples</title>

    </head>

    <body>
        
        <form>
        
        <!-- Page Header -->
        <section class="fixed header">

          <h1 class="logo">
            <a href="javascript:alert('Cartesia')">cartesia</a>
          </h1>

          <nav class="nav primary-nav">

            <ul>
              <li><a href="javascript:alert('Home')">home</a></li>
              <li><a href="javascript:alert('Speakers')">speakers</a></li>
              <li><a href="javascript:alert('Schedule')">schedule</a></li>
              <li><a href="javascript:alert('Venues')">venue</a></li>
              <li><a href="javascript:alert('Register')">register</a></li>
            </ul>

          </nav>

        </section>

        <!-- Properties -->
        <section class="fixed properties">

          <label class="title">Properties</label>

            <!-- Name -->
            <label class="col-1" for="name">Name:</label>
            <input class="text col-2" id="name" title=" name ">
            <!-- Caption -->
            <label class="col-1" for="caption" title="Hello World">Caption:</label>
            <input class="text col-2" id="caption" title=" caption ">
            <!-- Formula -->
            <label class="col-1" for="formula" title="Hello World">Formula:</label><br>
            <input class="text col-2" id="formula" title=" formula ">
            
            <hr class="line">
            
            <!-- Line Weight -->
            <label               class="col-1" for="lineweight">LineWeight:</label>
            <input type="number" class="col-2" id="lineweight" min="0" max="13" value="6">

            <hr class="line">
            
            <!-- Line Color -->
            <label              class="col-1" for="linecolor">Line Color:</label>
            <input type="color" class="col-2" id="linecolor"  value="#ffffff" list="colors"/>

              <datalist id="colors">

                <option>#ff0000</option>    <!-- red -->
                <option>#FF5100</option>    <!-- red orange -->
                <option>#FF7F00</option>    <!-- orange -->
                <option>#FFBE00</option>    <!-- yellow orange -->
                <option>#FFFF00</option>    <!-- yellow -->

                <option>#C0FF00</option>    <!-- yellow green -->
                <option>#00FF00</option>    <!-- green -->
                <option>#007F7F</option>    <!-- Blue Green -->
                <option>#0000FF</option>    <!-- Blue -->
                <option>#5C00FF</option>    <!-- Blue Violet -->

                <option>#7F00FF</option>    <!-- Violet -->
                <option>#BF007F</option>    <!-- Red Violet -->
                <option>#FFFFFF</option>    <!-- White -->
                <option>#DADADA</option>    <!-- Gray1 -->
                <option>#B6B6B6</option>    <!-- Gray2 -->

                <option>#929292</option>    <!-- Gray3 -->
                <option>#6D6D6D</option>    <!-- Gray4 -->
                <option>#494949</option>    <!-- Gray5 -->
                <option>#242424</option>    <!-- Gray6 -->
                <option>#000000</option>    <!-- Black -->

              </datalist>

            <!-- Line Alpha -->
            <label              class="col-1" for="linealpha">Transparency:</label>
            <input type="range" class="col-2" id="linealpha" min="0" max="100" value="76">

            <hr class="line">
            
            <!-- Fill Color -->
            <label              class="col-1" for="fillcolor">Fill Color:</label>
            <input type="color" class="col-2" id="fillcolor" value="#ffffff" list="colors"/>

              <datalist id="colors">

                <option>#ff0000</option>    <!-- red -->
                <option>#FF5100</option>    <!-- red orange -->
                <option>#FF7F00</option>    <!-- orange -->
                <option>#FFBE00</option>    <!-- yellow orange -->
                <option>#FFFF00</option>    <!-- yellow -->

                <option>#C0FF00</option>    <!-- yellow green -->
                <option>#00FF00</option>    <!-- green -->
                <option>#007F7F</option>    <!-- Blue Green -->
                <option>#0000FF</option>    <!-- Blue -->
                <option>#5C00FF</option>    <!-- Blue Violet -->

                <option>#7F00FF</option>    <!-- Violet -->
                <option>#BF007F</option>    <!-- Red Violet -->
                <option>#FFFFFF</option>    <!-- White -->
                <option>#DADADA</option>    <!-- Gray1 -->
                <option>#B6B6B6</option>    <!-- Gray2 -->

                <option>#929292</option>    <!-- Gray3 -->
                <option>#6D6D6D</option>    <!-- Gray4 -->
                <option>#494949</option>    <!-- Gray5 -->
                <option>#242424</option>    <!-- Gray6 -->
                <option>#000000</option>    <!-- Black -->

              </datalist>

            <!-- Fill Alpha -->
            <label class="col-1" for="fillalpha">Transparency:</label>
            <input class="col-2" id="fillalpha" type="range" min="0" max="100" value="16">

        </section>

        <!-- Drawing -->
        <section class="fixed drawing border">
          
           Canvas
          <div class="canvas">
            <canvas id="dwg" class="border"></canvas>
          </div>

          <!-- Header -->
          <div class="fixed drawing-header border">

            <nav class="tlb">
              
              <ul>
              
                <li><img class="shape" src="assets/images/move.png" alt="points">
                  
                  <ul>
                  
                    <li><a href="#">P1</a>
  
                      <ul>
                        <li><a href="#">P4</a></li>
                        <li><a href="#">P5</a></li>
                      </ul>
                      
                    </li>
                    
                    <li><a href="#">P2</a></li>
                    <li><a href="#">P3</a></li>
                    
                  </ul>
                  
                </li>
                
                <li><img class="shape" src="assets/images/move.png" alt="lines">
                  
                  <ul>
                  
                    <li><a href="#">L1</a></li>
                    <li><a href="#">L2</a></li>
                    <li><a href="#">L3</a>
                  
                      <ul>
                        <li><a href="#">L4</a></li>
                        <li><a href="#">L5</a></li>
                      </ul>
                  
                    </li>
                  
                    
                  </ul>
                  
                </li>
              
                <li><img class="shape" src="assets/images/move.png" alt="triangles">
                
                  <ul>
                
                    <li><a href="#">T1</a></li>
                    <li><a href="#">T2</a></li>
                    <li><a href="#">T3</a>
                      
                      <ul>
                        <li><a href="#">T4</a></li>
                        <li><a href="#">T5</a></li>
                      </ul>
                      
                    </li>
                    
                  </ul>
                  
                </li>
              
                <li><img class="shape" src="assets/images/move.png" alt="circles">
                  
                  <ul>
                  
                    <li><a href="#">C1</a></li>
                    <li><a href="#">C2</a></li>
                    <li><a href="#">C3</a>
                      <ul>
                        <li><a href="#">C4</a></li>
                        <li><a href="#">C5</a></li>
                      </ul>
                      
                    </li>
                    
                  </ul>
                  
                </li>
  
              </ul>
              
            </nav>
                    
          </div>

          <!-- Grid Menu -->
          <div class="fixed drawing-menu border">

            <!-- Origin -->
            <label for="origin" class="col3">Origin</label>
            <label              class="col4"></label>
            <input id="origin" type="checkbox" class="col5">
            
            <hr class="line">

            <!-- Axes -->
            <label for="axes" class="col3">Axis</label>
            <label for="axisx" class="col4">x:</label>
            <input id="axisx" type="checkbox" class="col5">
            
            <label                 class="col3"></label>
            <label for="axisy"     class="col4">y:</label>
            <input id="axisy" type="checkbox" class="col5">
            
            <!-- Lines -->
            <hr class="line">
            
            <label for="lines" class="col3">Lines</label>
            <label for="linesx" class="col4">x:</label>
            <input id="linesx" type="checkbox" class="col5">
            
            <label              class="col3"></label>
            <label for="linesy" class="col4">y:</label>
            <input id="linesy" type="checkbox" class="col5">
            
            <!-- Arrows -->
            <hr class="line">
            
            <label for="arrows" class="col3">Arrows</label>
            <label for="arrowsx" class="col4">x:</label>
            <input id="arrowsx" type="checkbox" class="col5">
            
            <label              class="col3"></label>
            <label for="arrowsy" class="col4">y:</label>
            <input id="arrowsy" type="checkbox" class="col5">
            
            <!-- Ticks -->
            <hr class="line">
            
            <label for="ticks" class="col3">Ticks</label>
            <label for="ticksx" class="col4">x:</label>
            <input id="ticksx" type="checkbox" class="col5">
            
            <label              class="col3"></label>
            <label for="ticksy" class="col4">y:</label>
            <input id="ticksy" type="checkbox" class="col5">
            
            <!-- Labels -->
            <hr class="line">
            
            <label for="labels" class="col3">Labels</label>
            <label for="labelsx" class="col4">x:</label>
            <input id="labelsx" type="checkbox" class="col5">
            
            <label              class="col3"></label>
            <label for="labelsy" class="col4">y:</label>
            <input id="labelsy" type="checkbox" class="col5">
            
            <!-- Quadrants -->
            <hr class="line">
            
            <label for="quadrants" class="col3">Quadrants</label>
            <label                class="col4"></label>
            <input id="quadrants" type="checkbox" class="col5">

            <div class="row0"></div>

          </div>

          <!-- Grid Menu Display -->
          <div class="button fixed">Click</div>
          
          <!-- Footer -->
          <div class="fixed drawing-footer border"></div>

        </section>

        <!-- Page Footer -->
        <section class="fixed footer border">

            © 2014 Brad Siemens  Except where noted, all rights reserved.
            <a href="javascript:alert('Credits')"> Credits </a> —
            <a href="javascript:alert('TOS')"> Terms of Service </a> —
            <a href="javascript:alert('Blog Index')"> Blog Index </a>

        </section>

      </form>
      
    </body>

    <script src="processing.js"></script>
    <script src="drawing.js"></script>
    <script type="application/javascript">
       var canvas = document.getElementById("dwg");
       var processingInstance = new Processing(canvas, proc);
    </script>


  </html>
