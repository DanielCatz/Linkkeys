function prepLinksBased(){//new
//For every anchor, create a class using n-based counting system
var value = 0;     
var strBuilder = "";       
    
$.each($('a[href]'), function(){
    if(isElementInViewport(this)){
        if (!$(this).text().trim().length) {
            console.debug("failed on:"  );
        } 
        else{
          
             strBuilder = convertNumberToBaseWithoutZero(5,value).toString();
             
            //create class using generated number
            // addClassToAnchors(value,strBuilder);
            // addTipToAnchors(value,strBuilder);      
            addClassToAnchorsE(this,strBuilder);
            addTipToAnchorsE(this,strBuilder);                
            value+=1;
        }
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
        value = Math.floor(value/newBase);
        convertedNumber += remainder*(digitPosition);
        digitPosition*=10;          
    }   
        
    return convertedNumber;
}

function addTipToAnchors(i,strBuilder){
    var inputOpentip = new Opentip($("a:eq("+i+")"), { showOn: null, style: 'glass',target:true,showEffectDuration:0.1,hideEffectDuration:1.0,removeElementsOnHide:true });
        inputOpentip.setContent(strBuilder);
}
    
function addClassToAnchors(i,strBuilder){
    $("a:eq("+i+")").addClass(strBuilder);

}

function addTipToAnchorsE(el,strBuilder){
    var inputOpentip = new Opentip($(el), { showOn: null, style: 'glass',target:true,showEffectDuration:0.1,hideEffectDuration:1.0,removeElementsOnHide:true });
        inputOpentip.setContent(strBuilder);
}
    
function addClassToAnchorsE(el,strBuilder){
    $(el).addClass(strBuilder);

}
    
       
    
function highlightCharactersInTip(typed){
 //  alert(typed);
    for(var i = 1; i < Opentip.tips.length; i ++) {
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
            case 53:
            return 5;
            default:
            return "";    
    }    
}      



function isElementInViewport (el) {
    //http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
    
    // if (typeof el === "undefined"){
    //     return false;
    // }
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
    //Event handlers
    
    //Is activation key PRESSED
    $("body").keydown(function(event){ 

    //set up new numbers for viewport   
        if(event.which==192){// Set to ~ Key          
            if (!areTipsVisible){
                prepLinksBased();
                for(var i = 0; i < Opentip.tips.length; i ++) {//go tru opentip elements who are associated with an elem
                    Opentip.tips[i].show();
                }

            
            areTipsVisible=true;
            }

        }         
    });
    //Is activation key RELEASED
    $("body").keyup(function(event){
        //$("#divtip").text(event.which);
   console.debug(Opentip.tips.length);
        if(event.which==192){
            areTipsVisible=false;         

            //console.debug(Opentip.tips[0]);
            if(input!=""){
                linkkeyClick(input);            
            }     
            for(var i = 0; i < Opentip.tips.length; i ++) {Opentip.tips[i].hide();}  
            while (Opentip.tips.length > 0) {Opentip.tips.shift().deactivate();}

            input="";
            
            //  prepLinksBased();  
        }    console.debug(Opentip.tips.length);     
    });
    
    // are valid keys being pressed
    $("body").keypress(function(event){
    if(areTipsVisible==true && event.which!=192 && event.which!=96){        
        input+=translateKeyboardToValue(event.which);        
            highlightCharactersInTip(input);
    }      
    });
          // prepLinksBased();





});
