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
      $.fn.reload_paragraph = function () {
        var skillSetViewClass = $('.view-user-skill-set-view').attr('class');
        var skillSetViewDomId = '.' + skillSetViewClass.split(' ')[4];
        $(skillSetViewDomId).trigger('RefreshView').once();
        // $(skillSetViewDomId).unbind();
      }
           
      $.fn.reload_project_tickets = function (data) {
        var success = false;
	      $("#dashboard_add_new_task_custom").ready(function () { 
	        $(this).ajaxComplete(function (event, request, settings) {
 	          $.each(Drupal.views.instances, function (i, view) {
	            $.each(settings, function (key, value) {
                // select (#dom) 
             
	              if (key == 'url' && value == '/system/ajax') {
	                if (view.settings.view_name == "project_tickets" && view.settings.view_display_id == data ) { //edit name of view
                    var selector = '.view-dom-id-' + view.settings.view_dom_id;
                    $(selector).triggerHandler('RefreshView');
                  }   
                  $(selector).unbind();
                }
              });
            }); 
          });
        });
      };

      $('.ajax-detach-user').click(function(e) {
        e.preventDefault();
        var myUrl = $(this).attr('href');
        if ( jQuery.once().post(myUrl, 0) ) {
          $(this).parent().parent().hide();
        }
      });
    }
  }
}(jQuery));