var SliderCarousel = (function($){
        var parent, body, maxCount;
            
        var apply = function($elem) {
            parent = $($elem + " .carousel.slide"); // get the parent
            body = $($elem + " .carousel.slide .carousel-inner"), // get the body
            maxCount = itemLength(); // get the number of default ITEMS
            
            
            parent.bind('slide.bs.carousel', function (e) {
                if ( !(body.find(".item").length > 1) ) { //stop
                    return false; // return false, no need to continue
                }
                
                var active = body.find(".item.active"), numNeed, next, 
                    direction = (e.direction === "right") ? "prev" : "next",
                    firstLast = (direction === "prev") ? "last" : "first",
                    prependAppend = (direction === "prev") ? "prepend" : "append";
                
                    
                // set the next Item
                next =  ( active[direction]().length > 0 ) ? active[direction]() :  body.find(".item")[firstLast]();
                
                numNeed = maxCount - next.children().length; // Number of items the next item needed
                
                if( numNeed > 0 ) // check if we need more items
                {
                    // detach the items
                    var detachedItems;
                    if(direction === "prev")
                    {
                        detachedItems = active.children().slice(0, numNeed).detach();
                    }
                    else
                    {
                        detachedItems = active.children().slice(maxCount-numNeed, maxCount).detach();
                    }
                    
                    // attach the items
                    next[prependAppend](detachedItems);
                }
            });
            
        };
        
        var itemLength = function() { // get the actual number of the list
            
            var max=0, counter = 0 , len = 0;
            
            body.find(".item").each(function(){
                
                len = $(this).children().length; // hold the length
                
                // get the max length
                max = (len > max) ? len : max;
                
                // return false to stop the loop
                // we doesn't need to traverse all the items
                if(counter>1){ return false; } 
                
                // add counter
                ++counter;
            });
            
            // return the max number of the list
            return max;
        };
        
        return {
            apply : apply,
            maxItem : itemLength
        };
})(jQuery);