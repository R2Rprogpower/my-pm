/* 
 * 
 * 
 *@file
 *
 */
       
            (function ($) {


	Drupal.behaviors.timesheets = {


		attach: function (context, settings) {
                    
//                   var buttons =  $('.timesheets-views').find('button');
//                   buttons .each(function() {
//                   var rowUrlData =  $(this).parent().parent().parent().parent().attr('id') ; 
//                     console.log(rowUrlData);
//                     var path = window.location.pathname;   
//                     path = path.substr(1);
//                     var newHrefData = rowUrlData.split('_');
//                        
//                        var ticketNid = newHrefData[0];
//                         
//                        var dateSplit = newHrefData[1].split('/');
//                                      
//                        var day = dateSplit[0];
//                  
//                        var month = dateSplit[1];
//                        
//                        var year = dateSplit[2];
//                        
//                        var date = day +'_'+ month +'_'+ year;
//                        
//                        var popupPathPart = 'ajax/nojs/' ;
//                                                            // ticket and date
//                        var url = path   +  popupPathPart + ticketNid + "/" + date;
//                        
//                        $(this).parent().attr('href',url);
//                     
//                     
//                     });
//                
//                    
//                    $('.timesheets-views').find('button').click(function(e) {
//                         
//                        
//                         var path = window.location.pathname;
//                         path = path.substring(1);
////                         var parhSplit = path.split('/');
////                         if (parhSplit[4].length -> 0) {
////                             
////                         }
//                        
//                        
//                        
//                        var rowUrlData =  $(this).parent().parent().parent().parent().attr('id') ; 
//                        
//                        var newHrefData = rowUrlData.split('_');
//                        
//                         var ticketNid = newHrefData[0];
//                         
//                        var dateSplit = newHrefData[1].split('/');
//                                      
//                        var day = dateSplit[0];
//                  
//                        var month = dateSplit[1];
//                        
//                        var year = dateSplit[2];
//                        
//                        var date = day +'_'+ month +'_'+ year;
//                        
//                        var popupPathPart = 'ajax/nojs/' 
//                                                            // ticket and date
//                        var url = path   +  popupPathPart + ticketNid + "/" + date;
//                        
//                             // $(this).parent().attr('href',url);
//                      // if (jQuery.post(url, 0)) {
//                         
//                        console.log('Post rq is sent to '+ url);
//
//                    //   }    
//                        
//    
//                        });

                    
                 
		}


	}
	Drupal.attachBehaviors(document, Drupal.settings);


}(jQuery));