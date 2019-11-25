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
                                        
                                        
                                        
                                        
                                        
                                        
                        $(document).ready(function () {
                            
                              
                    
                          
                           
                            
                            
                        
			var path = window.location.pathname;
			//path = path.substr(1);
			var pathSplit = path.split('/');
			//console.log(pathSplit);
			//    console.log(settings);

			if (pathSplit[3] == 'timesheets') {
				// console.log('success');
				var url1 = path + '/ajax';
                                    console.log(url1);
 					$.ajax({
						type: 'POST',
						url: url1 ,
						dataType: 'html',
						success: function (timesheetsInfoJson) {
							// Set up new content.
                                                       
							var timesheetsInfo = JSON.parse(timesheetsInfoJson );
 
							console.log(timesheetsInfo);
                                                        
                                                        
                                                        
                                                        
                                                        
                                                        
						}
					});
                                        
                                        
                                        
                                          

            
                                        
 
					

			}

                        });
                    }
               
	}
 

}(jQuery));

