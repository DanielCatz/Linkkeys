function assignTip(i,strBuilder){
    var inputOpentip = new Opentip($("a:eq("+i+")"), { showOn: null, style: 'glass',target:true,showEffectDuration:0.1,hideEffectDuration:1.0 });
        inputOpentip.setContent(strBuilder);
    }
    
    function classify(i,strBuilder){
    $("a:eq("+i+")").addClass(strBuilder);    
    }
    
       
    
function highlight(typed){
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
        classify(i,strBuilder);
        assignTip(i,strBuilder);        
         strBuilder="";
    }    
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
    

    
 function translate(key){
    switch(key){
    
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
    
    
$(document).ready(function(){
   //stuff
    var input ="";
    var linking = 0;
        
    //Event handlers
    $("body").keydown(function(event){    
        if(event.which==192){          
            linking=1;
            for(var i = 0; i < Opentip.tips.length; i ++) { Opentip.tips[i].show();}
    }      
    });
    
    $("body").keyup(function(event){
        $("#divtip").text(event.which);
        if(event.which==192){         
       for(var i = 0; i < Opentip.tips.length; i ++) {Opentip.tips[i].hide();}       
        linking=0;       
            linkkeyClick(input);
        input="";
               //resetTips(); 
            resetTips();
        }      
    });
  
    $("body").keypress(function(event){
    if(linking==1 && event.which!=192 && event.which!=96){        
        input+=translate(event.which);
        //TODO: highlight keypresses
            highlight(input);
    }      
    });
   
   prepLinks(); 
    
});
