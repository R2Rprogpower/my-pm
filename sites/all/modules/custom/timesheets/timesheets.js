/* 
 * 
 * 
 *@file
 *
 *
 *This function is responsble for creating the correct display of timesheets block
 *
 *it withdraws parameters from url and creates a POST request 
 *to aquire the data about timesheets of the user, whose timesheets page is displayed 
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
              // Creates the selectors off the timesheets info data 
              // and fills  elements with the values from the same data.
              $.each(timesheetsInfo, function(index, data){ 
                var ticketRef =  data['ticket_ref'] ;  
                var dateCreated = data['date_created'].replace('-','\\/').replace('-','\\/');
                var projectNid =  data['project'];
                var hoursSpent = data['time_spent']; 
                var inputSelector = '#cell_' + ticketRef + '_' + dateCreated;
                // prevents JS from sending undefined error
                if (total_sums[projectNid+'_'+dateCreated] === undefined) {
                  total_sums[projectNid+'_'+dateCreated] = 0;
                }
                // fills the array of sums of hours spent on tickets of the a project on a date 
                //                 indexed by project and date
                total_sums[projectNid+'_'+dateCreated] =   parseInt(total_sums[projectNid+'_'+dateCreated], 10) +  parseInt(hoursSpent, 10) ;
                var totalSelector = '#cell_total_' + projectNid + '_' + dateCreated;
                if ($(inputSelector).length > 0) {  
                  var inputField =  $(inputSelector).find('input'); 
                  inputField.css('background-color', 'red');
                  inputField.val( hoursSpent );
                  //selecting 'total' field and filling it with the value from  total_sums
                  var currentValue = parseInt($(totalSelector).find('#total_sum').html() );
                  $(totalSelector).find('#total_sum').html ( total_sums[projectNid+'_'+dateCreated]);
                }   
              });
            }
          });
        });
      }
    } 
  }
Drupal.behaviors.timesheets1 = {
  attach: function (context, settings) {
    $('#abra').find('a').click(function(e) {
      e.preventDefault();
        var rowLink = $(this).attr('href').split('/');
        var url2 = '/user/week/timesheets/veiw/ajax/'  + rowLink[8] + '/' + rowLink[9];
        var url2 = $(this).attr('href');
        var date = $('th.mon').attr('id');   
        var data = {"date" : date}
        $.ajax({
          type: 'POST',
          url: url2 ,
          data: data,
          dataType: 'html',
          success: function (timesheetsInfoJson) {
            var timesheetsInfo = JSON.parse(timesheetsInfoJson );
            var timesheetsViewsIdSelector = $('.view-id-timesheets').attr('class').split(' ')[4];
            timesheetsViewsIdSelector =  '.' + timesheetsViewsIdSelector;
            if( $(timesheetsViewsIdSelector).replaceWith(timesheetsInfo.html)) {
            };
          }
        });
      });
    }
  }
  Drupal.attachBehaviors(document, Drupal.settings);
}(jQuery));

