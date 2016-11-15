function prepLinksBased(){//new
//For every anchor, create a class using n-based counting system
var value = 0;     
var strBuilder = "";       
    
$.each($('a[href]'), function(){
    if (!$(this).text().trim().length) {
        console.debug("failed on:"  );
    } 
    else{
        value+=1
        console.debug(this.text);
         strBuilder = convertNumberToBase(5,value).toString();
        //create class using generated number
        addClassToAnchors(i,strBuilder);
        addTipToAnchors(i,strBuilder);                
    }

});
}

function convertNumberToBaseWithoutZero(newBase,value){//tested
    var digitPosition = 1;
    var convertedNumber = 0;
    var remainder = 0;
     
    if (value ==0){
        return 1;           
    }   
    while(value!=0){
        remainder  =  value%newBase;//make sure this mods################
        remainder++;                
        value = value/newBase;
        convertedNumber += remainder*(digitPosition);
        digitPosition*=10;          
    }   
        
    return convertedNumber;
}

function addTipToAnchors(i,strBuilder){
    var inputOpentip = new Opentip($("a:eq("+i+")"), { showOn: null, style: 'glass',target:true,showEffectDuration:0.1,hideEffectDuration:1.0 });
        inputOpentip.setContent(strBuilder);
}
    
function addClassToAnchors(i,strBuilder){
    $("a:eq("+i+")").addClass(strBuilder);    
}
    
       
    
function highlightCharactersInTip(typed){
 //  alert(typed);
    for(var i = 0; i < Opentip.tips.length; i ++) { 
        
        if(typed==$("a:eq("+i+")").attr("class").substring(0,typed.length)){// partial match
                var sequence = $("a:eq("+i+")").attr("class");
        Opentip.tips[i].setContent("<em style='color:green'>"+sequence.substring(0,typed.length)+"</em>"+sequence.substring(typed.length));
            }else{//eliminated
            Opentip.tips[i].hide();
            }
//matched
        if($("a:eq("+i+")").attr("class")==typed){
            Opentip.tips[i].setContent("∞");
            
            }
        
  }


}
    
function linkkeyClick(anchor){
    if($("."+anchor)[0]!=null){$("."+anchor)[0].click();}
}    
    

    
function prepLinks(){
//For every anchor, create a class using n-based counting system
    
    var numLinks = $("a").length;
   // variable needed for quaternary
    var d=0.0;
    var di = 0;
    var dr = 0;
    
    var c=0.0;
    var ci = 0;
    var cr = 0;
    
    var b=0.0;
    var bi = 0;
    var br = 0;
    
    var a=0.0;
    var ai = 0;
    var ar = 0;
    


    var strBuilder = "";
    for(i = 0;i< numLinks;i++){
        //calculate quaternary for each link
        d= i/4;
        di =  Math.floor(d);
        dr = (d- di)*4+1;
        if (di==0){
        ci=-1;bi=-1;ai=-1;        
        }else{
            c= di/4;
            ci =  Math.floor(c);
            cr = (c- ci)*4+1;
            if(ci==0){
                bi=-1;ai=-1;        
            }else{
                b= ci/4;
                bi =  Math.floor(b);
                br = (b- bi)*4+1;
                if(bi==0){
                ai=-1;
                }else{
                    a= bi/4;
                    ai =  Math.floor(a);
                    ar = (a- ai)*4+1;
        
                }
        
            }   
    }
    
    if (ai!=-1){
     strBuilder=strBuilder+ar.toString();
    }
    if (bi!=-1){
     strBuilder=strBuilder+br.toString();
    }
    if (ci!=-1){
     strBuilder=strBuilder+cr.toString();
    }
    strBuilder=strBuilder+dr.toString();
         
        //create class using generated number
        addClassToAnchors(i,strBuilder);
        addTipToAnchors(i,strBuilder);        
         strBuilder="";
    }    
}    
  
function protoPrepLinks(){
//For every anchor, create a class using n-based counting system
    
    
    var i = 0;
   // variable needed for quaternary
    var d=0.0;
    var di = 0;
    var dr = 0;
    
    var c=0.0;
    var ci = 0;
    var cr = 0;
    
    var b=0.0;
    var bi = 0;
    var br = 0;
    
    var a=0.0;
    var ai = 0;
    var ar = 0;
    
$.each($('a[href]'), function(){
    var strBuilder = ""; 
       
        if (!$(this).text().trim().length) {
        console.debug("failed on:" );
    } else{
    
    console.debug(this.text);

        //calculate quaternary for each link
        d= i/4;
        di =  Math.floor(d);
        dr = (d- di)*4+1;
        if (di==0){
        ci=-1;bi=-1;ai=-1;        
        }else{
            c= di/4;
            ci =  Math.floor(c);
            cr = (c- ci)*4+1;
            if(ci==0){
                bi=-1;ai=-1;        
            }else{
                b= ci/4;
                bi =  Math.floor(b);
                br = (b- bi)*4+1;
                if(bi==0){
                ai=-1;
                }else{
                    a= bi/4;
                    ai =  Math.floor(a);
                    ar = (a- ai)*4+1;
        
                }
        
            }   
    }
    
    if (ai!=-1){
     strBuilder=strBuilder+ar.toString();
    }
    if (bi!=-1){
     strBuilder=strBuilder+br.toString();
    }
    if (ci!=-1){
     strBuilder=strBuilder+cr.toString();
    }
    strBuilder=strBuilder+dr.toString();
         
        //create class using generated number
        addClassToAnchors(i,strBuilder);
        addTipToAnchors(i,strBuilder);        
         strBuilder="";
         i=i+1;
}});
    
    
        
}        
    
function resetTips(){
    
    var numLinks = $("a").length;
   // variable needed for quaternary
    var d=0.0;
    var di = 0;
    var dr = 0;
    
    var c=0.0;
    var ci = 0;
    var cr = 0;
    
    var b=0.0;
    var bi = 0;
    var br = 0;
    
    var a=0.0;
    var ai = 0;
    var ar = 0;
    
    var strBuilder = "";
    //modify to take into account max possible numbers available 3base=40 4base...
    for(i = 0;i< numLinks;i++){
        //calculate quaternary for each link
        d= i/4;
        di =  Math.floor(d);
        dr = (d- di)*4+1;
        if (di==0){
        ci=-1;bi=-1;ai=-1;        
        }else{
            c= di/4;
            ci =  Math.floor(c);
            cr = (c- ci)*4+1;
            if(ci==0){
                bi=-1;ai=-1;        
            }else{
                b= ci/4;
                bi =  Math.floor(b);
                br = (b- bi)*4+1;
                if(bi==0){
                ai=-1;
                }else{
                    a= bi/4;
                    ai =  Math.floor(a);
                    ar = (a- ai)*4+1;
        
                }
        
            }   
    }
    
	    if (ai!=-1){
	     strBuilder=strBuilder+ar.toString();
	    }
	    if (bi!=-1){
	     strBuilder=strBuilder+br.toString();
	    }
	    if (ci!=-1){
	     strBuilder=strBuilder+cr.toString();
	    }
	    strBuilder=strBuilder+dr.toString();
	         
	    //create class using generated number
	    Opentip.tips[i].setContent(strBuilder);	               
	    strBuilder="";
    }    
}        
    

    
 function translateKeyboardToValue(key){
    switch(key){//modify to accept configuration input
    
            case 49:
            return 1;
            
            case 50:
            return 2;
            
            case 51:
            return 3;
            
            case 52:
            return 4;
            default:
            return "";    
    }    
}      



function isElementInViewport (el) {
    //http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}
    
//Main    
$(document).ready(function(){
   //stuff
    var input ="";
    var areTipsVisible = false;
    var isActivated = false;
    var aValue=9;    
    //Event handlers
    
    //Is activation key pressed
    $("body").keydown(function(event){ 

    //set up new numbers for viewport   
        if(event.which==192){// Set to ~ Key          
            
            if (!areTipsVisible){
                for(var i = 0; i < Opentip.tips.length; i ++) {
                    if(isElementInViewport($("a:eq("+i+")"))){
                    Opentip.tips[i].show();}
                }
            }

            areTipsVisible=true;
        }         
    });
    //Is activation key depressed
    $("body").keyup(function(event){
        $("#divtip").text(event.which);

        if(event.which==192){         
       for(var i = 0; i < Opentip.tips.length; i ++) {Opentip.tips[i].hide();}       
        areTipsVisible=false;       
            linkkeyClick(input);
        input="";
            //resetTips();
        }      
    });
    
    // are valid keys being pressed
    $("body").keypress(function(event){
    if(areTipsVisible==true && event.which!=192 && event.which!=96){        
        input+=translateKeyboardToValue(event.which);
        //TODO: highlight keypresses
            highlightCharactersInTip(input);
    }      
    });
   
   
                protoPrepLinks(); 

});
