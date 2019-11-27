/* 
 * 
 * 
 *@file
 *
 */

(function ($) {
  Drupal.behaviors.timesheets = {
    attach: function (context, settings) {
      var path = window.location.pathname;
      var pathSplit = path.split('/');
      if (pathSplit[3] == 'timesheets') {
        $(document).ready(function () {  
          var dateTh= { obj: $('th.days.mon') };
          var monDate = dateTh.obj[0].id;   
          var dateArr = monDate.split('/');
          var date =  dateArr.join('-'); 
          var data = {"date1" : date} ;
          var total_sums = {};
          var url1 = path + '/ajax';
          $.ajax({
            type: 'POST',
            url: url1 ,
            data: data,
            dataType: 'html',
            success: function (timesheetsInfoJson) {
              var timesheetsInfo = JSON.parse(timesheetsInfoJson );
                 // fill input fields
              $.each(timesheetsInfo, function(index, data){ 
                var ticketRef =  data['ticket_ref'] ;  
                var dateCreated = data['date_created'].replace('-','\\/').replace('-','\\/');
                var projectNid =  data['project'];
                var hoursSpent = data['time_spent']; 
                var inputSelector = '#cell_' + ticketRef + '_' + dateCreated;
                if (total_sums[dateCreated] === undefined) {
                  total_sums[dateCreated] = 0;
                }
                total_sums[dateCreated] =   parseInt(total_sums[dateCreated], 10) +  parseInt(hoursSpent, 10) ;
                var totalSelector = '#cell_total_' + projectNid + '_' + dateCreated;
                if ($(inputSelector).length > 0) {  
                  var inputField =  $(inputSelector).find('input'); 
                  inputField.css('background-color', 'red');
                  inputField.val( hoursSpent );
                     // hours spent must be created of all ticket's info and only then be applied
                     // here is the way to select the field and ,amipulate it's items
                  var currentValue = parseInt($(totalSelector).find('#total_sum').html() );
                  $(totalSelector).find('#total_sum').html ( total_sums[dateCreated]);
                }   
              });
            }
          });
        });
      }
    } 
  }
 // Drupal.attachBehaviors(document, Drupal.settings);
}(jQuery));

