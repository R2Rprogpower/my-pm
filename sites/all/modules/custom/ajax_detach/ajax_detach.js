/* 
 * 
 * 
 *@file
 *
 */
(function($) {




    Drupal.behaviors.ajax_detach = {
        attach: function(context, settings) {
            $('.custom-class-node-title').find('a').attr('style', 'text-decoration: none; color: black;');
            $('a:contains("New ticket")').css('color', 'white');
            $('a:contains("Add a skill")').css('color', 'white');
            $('a:contains("Dashboard")').css('color', 'white');
            $('a:contains("Add a team member")').css('color', 'white');
            $('form-item-end-date').css('color','red');
            $('h6:contains("Projects")').attr('id', 'custom-h6-project-style');
            $('h2:contains("Team")').attr('id', 'custom-h6-team-style');
            $('caption').attr('class', 'custom_caption');


            $('.add_to_team_custom.ctools-use-modal-processed').attr('id', 'add_to_team_custom');
            $('#user-add-to-project-form').css('background-color', 'black');

            var list_open = $('#list-open').find('.item-list');

            var list_development = $('#list-dev').find('.item-list');

            var list_ready = $('#list-red').find('.item-list');

            var list_test = $('#list-test').find('.item-list');

            var list_closed = $('#list-closed').find('.item-list');

            $('#role-label').css('padding-top','10px');

            var drag_area = $('li.custom-row-class ').mousedown(function() {
                  drag_area.draggable({
                    containment: ".row",
                    cursor: "move",
                    helper: function() {
                        $(this).removeClass('dropped');
                        return $(this).addClass('catched');
                    },
                    revert: "invalid", // when not dropped, the item will revert back to its initial position

                });
            });
      
            list_open.mouseover(function() {
                var drop_area = list_open;
                drop_area.droppable({
                    accept: drag_area,
                    drop: function(ev, ui) {

                        var droppedItem = $(ui.draggable);
                        droppedItem.removeAttr("style");
                        drop_area.append(droppedItem);
                        droppedItem.addClass('dropped');
                        var dropped_item_id = droppedItem.find('div.views-field.views-field-nid')[0].innerText;


                        //var newStatus = drop_area.parent().parent().parent().parent().parent().attr('id');
                        var newStatus = 2;
                        var myUrl = "/change_ticket_status/ajax/" + dropped_item_id + '/' + newStatus;



                        if (jQuery.post(myUrl, 0)) {
                           console.log('Post rq is sent to  '+myUrl);

                        }


                    }
                });


            });

            list_ready.mouseover(function() {
                var drop_area = list_ready;
                drop_area.droppable({
                    accept: drag_area,
                    drop: function(ev, ui) {

                        var droppedItem = $(ui.draggable);
                        droppedItem.removeAttr("style");
                        drop_area.append(droppedItem);
                        droppedItem.addClass('dropped');
                        var dropped_item_id = droppedItem.find('div.views-field.views-field-nid')[0].innerText;

                        //  var newStatus = 'Ready for QA';
                        var newStatus = 4;
                        var myUrl = "/change_ticket_status/ajax/" + dropped_item_id + '/' + newStatus;

                        if (jQuery.post(myUrl, 0)) {
                            //console.log('Post rq is sent to  '+myUrl);

                        }
                    }
                });


            });
            list_development.mouseover(function() {
                var drop_area = list_development;
                drop_area.droppable({
                    accept: drag_area,
                    drop: function(ev, ui) {

                        var droppedItem = $(ui.draggable);
                        droppedItem.removeAttr("style");
                        drop_area.append(droppedItem);
                        droppedItem.addClass('dropped');
                        var dropped_item_id = droppedItem.find('div.views-field.views-field-nid')[0].innerText;
                        // var newStatus = 'Development';
                        var newStatus = 3;
                        var myUrl = "/change_ticket_status/ajax/" + dropped_item_id + '/' + newStatus;

                        if (jQuery.post(myUrl, 0)) {
                            //console.log('Post rq is sent to  '+myUrl);

                        }
                    }
                });

 
            });
            list_test.mouseover(function() {
                var drop_area = list_test;
                drop_area.droppable({
                    accept: drag_area,
                    drop: function(ev, ui) {

                        var droppedItem = $(ui.draggable);
                        droppedItem.removeAttr("style");
                        drop_area.append(droppedItem);
                        droppedItem.addClass('dropped');
                        var dropped_item_id = droppedItem.find('div.views-field.views-field-nid')[0].innerText;

                        //var newStatus = 'Test';
                        var newStatus = 5;
                        var myUrl = "/change_ticket_status/ajax/" + dropped_item_id + '/' + newStatus;

                        if (jQuery.post(myUrl, 0)) {
                            // console.log('Post rq is sent to  '+myUrl);

                        }
                    }
                });


            });
            list_closed.mouseover(function() {
                var drop_area = list_closed;
                drop_area.droppable({
                    accept: drag_area,
                    drop: function(ev, ui) {

                        var droppedItem = $(ui.draggable);
                        droppedItem.removeAttr("style");
                        drop_area.append(droppedItem);
                        droppedItem.addClass('dropped');
                        var dropped_item_id = droppedItem.find('div.views-field.views-field-nid')[0].innerText;

                        // var newStatus = 'Closed';  
                        var newStatus = 6;
                        var myUrl = "/change_ticket_status/ajax/" + dropped_item_id + '/' + newStatus;

                        if (jQuery.post(myUrl, 0)) {
                            // console.log('Post rq is sent to  '+myUrl);

                        }
                    }
                });

                //  list_closed.css('background-color', 'pink');

            });
          //$('.ajax-detach-user').attr('id','ajax-detach-user');
	 

            $('.ajax-detach-user').click(function(e) {
                e.preventDefault();
                
                var myUrl = $(this).attr('href');

                if ( jQuery.post(myUrl, 0) ) {
                   // console.log('Post rq is sent to  '+myUrl);
                    $(this).parent().parent().hide();
                }



            });
    
         
         
         
          Object.size = function(obj) {
                var size = 0,
                    key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            };
         
         }
    };

    
 Drupal.attachBehaviors(document, Drupal.settings);
    
}(jQuery));