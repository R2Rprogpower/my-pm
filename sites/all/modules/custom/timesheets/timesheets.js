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
                            
                              
                    
               $('#abra').find('.prev').find('a').click(function(e) {
                //e.preventDefault();
                console.log('prev');
               //var myUrl = $(this).attr('href');

//                if ( jQuery.post(myUrl, 0) ) {
//                   // console.log('Post rq is sent to  '+myUrl);
//                    $(this).parent().parent().hide();
//                }



            });
                            
               $('#abra').find('.next').find('a').click(function(e) {
               // e.preventDefault();
                console.log('next');
               //var myUrl = $(this).attr('href');

//                if ( jQuery.post(myUrl, 0) ) {
//                   // console.log('Post rq is sent to  '+myUrl);
//                    $(this).parent().parent().hide();
//                }



            });
                    
                            
                            
                            
			var path = window.location.pathname;
			//path = path.substr(1);
			var pathSplit = path.split('/');
			//console.log(pathSplit);
			//    console.log(settings);

			if (pathSplit[3] == 'timesheets') {
				// console.log('success');
				var url = path + '/ajax';
                                console.log(url);


				


					$.ajax({
						type: 'POST',
						url: url,
						dataType: 'html',
						success: function (timesheetsInfoJson) {
							// Set up new content.
                                                       
							var timesheetsInfo = JSON.parse(timesheetsInfoJson );
                                                        var value=timesheetsInfo.length;

							console.log(timesheetsInfo);
                                                        
                                                        
                                                        
                                                        
                                                        
                                                        
						}
					});
				

			}

                        });
                    }
               
	}
 

}(jQuery));