/* 
 * 
 * 
 *@file
 * Refreshes view as the final part of the add a team member function
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
                  var selector = '.view-dom-id-' + view.settings.view_dom_id;
	                if (view.settings.view_name == "project_team") { //edit name of view
                    $(selector).triggerHandler('RefreshView');
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
        // sends POST request made of the href of the link cliked and hides the row
  $('.ajax-detach-user').click(function(e) {
    e.preventDefault();
    var myUrl = $(this).attr('href');
    if ( jQuery.post(myUrl, 0) ) {
      $(this).parent().parent().hide();
    }
  });
}(jQuery));