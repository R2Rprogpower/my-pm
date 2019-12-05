/* 
 * 
 * 
 *@file
 *
 */
(function($) {
  Drupal.behaviors.manage_dashboard = {
    attach: function(context, settings) {
      // initializes elements for future droppable areas
      var list_open = $('#list-open').find('.item-list');
      var list_development = $('#list-dev').find('.item-list');
      var list_ready = $('#list-red').find('.item-list');
      var list_test = $('#list-test').find('.item-list');
      var list_closed = $('#list-closed').find('.item-list');
       // decalres draggable area of the 1 tickets <li> block
      // When the lmb is held over the block   
      var drag_area = $('li.custom-row-class ').mousedown(function() {
        drag_area.draggable({
          containment: ".row",
          cursor: "move",
          helper: function() {
            $(this).removeClass('dropped');
            return $(this).addClass('catched');
          },
          revert: "invalid", // when not dropped, will revert to its initial position
        });
      });
      // declares droppable ares when mouse is over the block
      // and executes appending as sends POST request to change the tickets status
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
             var newStatus = 4;
             var myUrl = "/change_ticket_status/ajax/" + dropped_item_id + '/' + newStatus;
             if (jQuery.post(myUrl, 0)) {
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
            var newStatus = 3;
            var myUrl = "/change_ticket_status/ajax/" + dropped_item_id + '/' + newStatus;
            if (jQuery.post(myUrl, 0)) {
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
            var newStatus = 5;
            var myUrl = "/change_ticket_status/ajax/" + dropped_item_id + '/' + newStatus;
            if (jQuery.post(myUrl, 0)) {
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
            var newStatus = 6;
            var myUrl = "/change_ticket_status/ajax/" + dropped_item_id + '/' + newStatus;
            if (jQuery.post(myUrl, 0)) {
            }
          }
        });  
      });
    }
  };
}(jQuery));