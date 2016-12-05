var linkkey_text_color;
var linkkey_border_color;
var linkkey_body_color;
var linkkey_highlight_color;
function prepLinksBased(){//new
//For every anchor, create a class using n-based counting system
var value = 0;     
var strBuilder = "";       
var count=0;    
$.each($('a[href]'), function(){

    count++;
    if(isElementInViewport(this)){
        if (!$(this).text().trim().length) {
            console.debug("failed on:"  );
        } 
        else{
        var rect = this.getBoundingClientRect();
          if (rect.top==0&& rect.right==0&& rect.bottom==0 && rect.left==0){
                console.debug("Link:"+$(this).text().trim()+"\nLinkkey:" +"NONE"+"\nValue: " +value);
                console.log(rect.top, rect.right, rect.bottom, rect.left);
            }
            else{
                var visible  = $(this).is(":visible");
            strBuilder = convertNumberToBaseWithoutZero(5,value).toString();
            console.debug("Link:"+$(this).text().trim()+"\nLinkkey:" +strBuilder+"\nValue: " +value +"\n IsVisible: " +visible);
                console.log(rect.top, rect.right, rect.bottom, rect.left);
             
            //create class using generated number
            addClassToAnchorsE(this,strBuilder);
            addTipToAnchorsE(this,strBuilder);                
            Opentip.tips[value].show();
            value+=1;
            }

        }
    }

});
console.debug('number of links scanned: '+count+"\nNumber of Linkkeys on screen: " + value);
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




function addTipToAnchorsE(el,strBuilder){
    // var inputOpentip = new Opentip($(el), {tipJoint: "top left", borderColor: "red",stemLength: 15, stemBase: 5, background: [[ 0.99, "white" ], [ 1, "grey" ]] ,showOn: null, style: 'glass',target:true,showEffectDuration:0.1,hideEffectDuration:1.0,removeElementsOnHide:true });
    var inputOpentip = new Opentip($(el), {tipJoint: "top left", 
            borderColor: linkkey_border_color ,//stemLength: 15, stemBase: 5, 
            background: [ [ 0, "white" ], [ 1, linkkey_body_color ] ],showOn: null, borderRadius:10,
            style: 'glass',target:true,
            showEffectDuration:0.1,hideEffectDuration:1.0, removeElementsOnHide:true });

        inputOpentip.setContent("<span style='color:"+linkkey_text_color+"'>"+strBuilder+"</span>");         
}
    
function addClassToAnchorsE(el,strBuilder){
   // $(el).addClass(strBuilder);
    $(el).attr('linkkey',strBuilder);


}
    
function highlightCharactersInTipE(typed){
    var el;
    var i = 0;
   $.each($('a[linkkey]'), function(){
    if(isElementInViewport(this)){
        if(typed==$(this).attr("linkkey").substring(0,typed.length)){// partial match
                        var sequence = $(this).attr("linkkey");
                        console.debug(sequence);

                Opentip.tips[i].setContent("<em style='color:"+linkkey_highlight_color+"'>"+sequence.substring(0,typed.length)+"</em>"+"<span style='color:"+linkkey_text_color+"'>"+sequence.substring(typed.length)+"</span>");
                    }else{//eliminated
                    Opentip.tips[i].hide();
                    }
                //matched
                if($(this).attr("linkkey")==typed){
                    //simulate mouse over todo   
                    var linkText ="<span style='color:"+linkkey_text_color+"'>"+ $(this).text().trim() +"</span>";               
                    Opentip.tips[i].setContent(linkText);
                    el = $(this);
                }
        i++;
    }});

   return el;
}
    

function linkkeyClickE(el){
    if($(el)[0]!=null){
        $(el)[0].click();
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
    
function loadUserSettings(){
chrome.storage.sync.get({
    linkkeyTextColor:"rgba(0, 0, 0, 1)",
linkkeyBorderColor:"rgba(0, 0, 0, 0.5)",
linkkeyHighlightColor:"rgba(50,197,49, 0.99)",
linkkeyBodyColor:"rgba(49, 124, 194, 0.58)"
  }, function(items) {
    
    linkkey_text_color = items.linkkeyTextColor;
linkkey_border_color= items.linkkeyBorderColor;
linkkey_body_color= items.linkkeyBodyColor;
linkkey_highlight_color= items.linkkeyHighlightColor;
  });

}


//Main    
$(document).ready(function(){
   //stuff
    var el;
    var input ="";
    var areTipsVisible = false;
    var isActivated = false;
    Opentip.lastZIndex =100000;
    loadUserSettings();
    //Event handlers
    
    //Is activation key PRESSED
    $("body").keydown(function(event){ 

    //set up new numbers for viewport   
        if(event.which==192){// Set to ~ Key 
            if (!areTipsVisible){
                console.debug("Linkkey activated");         
                prepLinksBased();
               // for(var i = 0; i < Opentip.tips.length; i++) {//go tru opentip elements who are associated with an elem
                 //   Opentip.tips[i].show();
                //}
            
            areTipsVisible=true;
            }

        }         
    });
    //Is activation key RELEASED
    $("body").keyup(function(event){
        
        if(event.which==192){
            areTipsVisible=false;         
   console.debug("Linkkey released"); 
            if(input!=""){
                linkkeyClickE(el);            
            }     
            for(var i = 0; i < Opentip.tips.length; i ++) {Opentip.tips[i].hide();}  
            while (Opentip.tips.length > 0) {Opentip.tips.shift().deactivate();}

            input="";
            
        }     
    });
    
    // are valid keys being pressed
    $("body").keypress(function(event){
    if(areTipsVisible==true && event.which!=192 && event.which!=96){        
        input+=translateKeyboardToValue(event.which);        
            el = highlightCharactersInTipE(input);
    }      
    });
    
          





});
