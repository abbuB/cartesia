        $(document).ready(function() {
          
          $('#menu-left-toggle').click(function() {
            
            if ($(this).text() === "►"){
              $(this).text("◄");
            }
            else {
              $(this).text("►");
            }
            
            var $lefty = $('#menu-left');
            var $leftCanvas = $('#canvas-container');
            var $leftShapes = $('#menu-shapes');
            
            $lefty.animate({
              left: parseInt($lefty.css('left'),10) == 0 ? -$lefty.outerWidth() : 0
            });
            $leftCanvas.animate({
              left: parseInt($leftCanvas.css('left'),10) == 230 ? 30 :230
            });
            $leftShapes.animate({
              left: parseInt($leftShapes.css('left'),10) == 200 ? 0 :200
            });

          });
        });

        $(document).ready(function() {
          
          $('#menu-right-toggle').click(function() {
            
            if ($(this).text() === "►"){
              $(this).text("◄");
            }
            else {
              $(this).text("►");
            }
            
            var $left = $('#menu-right');
            var $canvas = $('#canvas-container');
            
            $left.animate({
              width: parseInt($left.css('width'),10) == 0 ? 200 : 0
            });
            $canvas.animate({
              right: parseInt($canvas.css('right'),10) == 200 ? 0 :200
            });

          });
          
        });
        
        // Tabs
        $(document).ready(function() {
         
            //Default Action
            $(".tab_content").hide();                           //  Hide all content
            $("ul.tabs li:first").addClass("active").show();    //  Activate first tab
            $(".tab_content:first").show();                     //  Show first tab content
             
            //On Click Event
            $("ul.tabs li").click(function() {
                $("ul.tabs li").removeClass("active");          //  Remove any "active" class
                $(this).addClass("active");                     //  Add "active" class to selected tab
                $(".tab_content").hide();                       //  Hide all tab content
                var activeTab = $(this).find("a").attr("href"); //  Find the rel attribute value to identify the active tab + content
                $(activeTab).fadeIn();                          //  Fade in the active content
                return false;
            });

        });

// $(function() {
//     $('.report_table').on('click', '.btn-icon', function() {
//         $(this).css('background-color', 'yellow');
//         $('.btn-icon').not(this).css('background-color', 'transparent');
//     });
// });
