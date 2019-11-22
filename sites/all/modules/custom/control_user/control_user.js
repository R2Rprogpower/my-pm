/* 
 * 
 * 
 *@file
 *
 */


(function ($) {


	Drupal.behaviors.control_user = {


		attach: function (context, settings) {
                      
			$.fn.reload_view = function () {
				var success = false;
				$("#add_to_team_custom").ready(function () {

					$(this).ajaxComplete(function (event, request, settings) {
						$.each(Drupal.views.instances, function (i, view) {

							$.each(settings, function (key, value) {

								if (key == 'url' && value == '/system/ajax') {

									//need to change from add/edit/delete
									var selector = '.view-dom-id-' + view.settings.view_dom_id;
									if (view.settings.view_name == "project_team") { //edit name of view

                                                                                 $(selector).triggerHandler('RefreshView');
										//console.log('all in');
									}
							
    
									$(selector).unbind();
								}
                                                               
							});
                                                     
						});

					 
					});

				});


			};

		}


	}
 

}(jQuery));