/* 
 * 
 * 
 *@file
 *
 */

(function ($) {


	Drupal.behaviors.timesheets = {


		attach: function (context, settings) {
                   
            
            
            

                       $.fn.style_timesheet = function (data) {
                           var result = Object.keys(data).map(function(key) {
                                return [Number(key), data[key]];
                              });
                                 console.log('data - ' + Object.values(data) + data);
 			};
                                        
                                        
                                        
                                        
                                        
                                        
                             
                              
                    
                          
                           
                            
                            
                        
			var path = window.location.pathname;
			//path = path.substr(1);
			var pathSplit = path.split('/');
			//console.log(pathSplit);
			//    console.log(settings);
                    

			if (pathSplit[3] == 'timesheets') {
                          //  $('th.days.mon').css('color', 'red');
                       $(document).ready(function () {  
                              var dateTh= { obj: $('th.days.mon') };
       
                                
                                    var justDate = dateTh.obj[0].id;   
                                    var dateArr = justDate.split('/');
                               
                                   var date =  dateArr.join('-'); 
                                  
                                
                             // console.log(date);
                             var data = {"date1" : date} ;

                                    // console.log(data);
                          
				// console.log('success');
				var url1 = path + '/ajax';
                                   // console.log(url1);
 					$.ajax({
						type: 'POST',
						url: url1 ,
                                                data: data,
						dataType: 'html',
						success: function (timesheetsInfoJson) {
						             // echo the recieved data                                          
							var timesheetsInfo = JSON.parse(timesheetsInfoJson );
                                                         console.log(timesheetsInfo);
                                                             // affect the display of the views
                                                             
                                                             // fill input fields
//                                                        
                                                                 $.each(timesheetsInfo, function(index, data){ 
                                                                  
                                                                   var ticketRef =  data['ticket_ref'] ;  
                                                                    
                                                                   var dateCreated = data['date_created'].replace('-','\\/').replace('-','\\/');
                                                                   
                                                                   var projectNid =  data['project'];
                                                                 
                                                                 
                                                                     
                                                                    
                                                                   var hoursSpent = data['time_spent']; 
                                                                   var inputSelector = '#cell_' + ticketRef + '_' + dateCreated;
                                                                   var totalSelector = '#cell_total_' + projectNid + '_' + dateCreated;
                                                                         //console.log( totalSelector );

                                                                   

                                                                   if (  $(inputSelector).length > 0  ) {  
                                                                 
                                                                     var inputField =  $(inputSelector).find('input'); 
                                                                     inputField.css('background-color', 'red');
                                                                     inputField.val( hoursSpent );
                                                                     
                                                                     // hours spent must be created of all ticket's info and only then be applied
                                                                            // here is the way to select the field and ,amipulate it's items
                                                                    var currentValue = parseInt($(totalSelector).find('#total_sum').html() );
                                                                     $(totalSelector).find('#total_sum').html (hoursSpent)
                                                                    
                                                                } 
                                                                   
                                                                  
                                                                 });
                                                                 
                                                                 
                                                             // make sum num display correctly 
                                                        
                                                        
                                                        
                                                        
                                                        
                                                        
						}
					});
                                        
                                        
                                        
                                          

            
                                        
 
					

			  });

                      
                     }
               
	} 
    }
 // Drupal.attachBehaviors(document, Drupal.settings);


}(jQuery));

