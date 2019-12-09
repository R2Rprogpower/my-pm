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
      $( document ).ready(function() {
        var oldVal;
        var path = window.location.pathname;
        var pathSplit = path.split('/');
        if (pathSplit[3] == 'timesheets' || pathSplit[2] == 'timesheets') {
          var dateTh= { obj: $('th.days.mon') };
          var monDate = dateTh.obj[0].id;   
          var dateArr = monDate.split('/');
          var date =  dateArr.join('-'); 
          var data = {"date" : date} ;
          var total_sums = {};
          var url1 = path + '/ajax';
          console.log(url1);
          $.ajax({
            type: 'POST',
            url: url1 ,
            data: data,
            dataType: 'html',
            success: function (timesheetsInfoJson) {
              var timesheetsInfo = JSON.parse(timesheetsInfoJson);
              console.log(timesheetsInfo);
              // Creates the selectors of the timesheets info data 
              // and fills  elements with the values from the same data.
              $.each(timesheetsInfo, function(index, data){ 
                var ticketRef =  data['ticket_ref'] ;  
                var dateCreated = data['date_created'].replace('-','\\/').replace('-','\\/');
                var projectNid =  data['project'];
                var hoursSpent = data['time_spent']; 
                var comment = data['comment'];
                var inputSelector = '#cell_' + ticketRef + '_' + dateCreated;
                // prevents JS from sending undefined error
                if (total_sums[projectNid+'_'+dateCreated] === undefined) {
                  total_sums[projectNid+'_'+dateCreated] = 0;
                }
                // Fills the array of sums of hours spent on tickets of the a project on a date
                //                 indexed by project and date.
                total_sums[projectNid+'_'+dateCreated] =   parseInt(total_sums[projectNid+'_'+dateCreated], 10) +  parseInt(hoursSpent, 10) ;
                var totalSelector = '#cell_total_' + projectNid + '_' + dateCreated;
                if ($(inputSelector).length > 0) {  
                  var inputField =  $(inputSelector).find('input'); 
                  if (comment !== 'empty' && comment !== '') {
                    inputField.css('background-color', '#d3d3d3');
                  }
                 if (comment == 'empty' || comment == '') {
                    inputField.css('background-color', '#ffffff');

                  }
                  inputField.val( hoursSpent );
                  // Selects 'total' field and fills it with the value from  $total_sums.
                  $(totalSelector).find('#total_sum').html(total_sums[projectNid + '_' + dateCreated]);
                 }   
              });
              var totalSum = $('p#total_sum');
              $.each(totalSum, function(index, data){ 
                var totalSumVal = data.innerHTML;
                if (totalSumVal > 10 && totalSumVal < 20) {
                  $(this).css('color', '#c1441a');
                }
                else if (totalSumVal > 19) {
                  $(this).css('color', 'red');
                }
                else if (totalSumVal < 8 && totalSumVal > 0){
                 $(this).css('color', 'blue');
                }
              });
            }
          }); 
          $('input#input_field').on('mouseover', function()  {
             oldVal = this.value;
             if (oldVal == '') {
               oldVal = 0;
             }
          });
          $.each($('input#input_field'), function(){ 
            $(this).once().on("change", function() {
              var val = this.value
              if(val < 1 ) {
                if(val == ''){
                  $(this).val("");
                }
                else{
                 $(this).val(oldVal);
                }
                alert("You Must Work");
              }
              else if( val >= 16) {
                 if(val == ''){
                  $(this).val("");
                }
                else{
                 $(this).val(oldVal);
                }

               alert("You Must Sleep");
              } 
              else {
                var url_info = $(this).parent().parent().attr('id').split('_');
                var uid = pathSplit[2];
                //console.log(uid);
                var ticket_nid = url_info[1];
                var date = url_info[2];
                var dateArr = date.split('/');
                var date =  dateArr.join('-'); 
                var hours = val;
                var url0 = '/ajax/timesheets/' + uid + '/' + ticket_nid + '/' + hours + '/' + date + '/insta_add_timesheet';
                $.ajax({
                  type: 'POST',
                  url: url0 ,
                  dataType: 'json',
                  success: function (projectNid) {
                    var dateCreated = date.replace('-','\\/').replace('-','\\/');
                    var totalSelector = '#cell_total_' + projectNid.data + '_' + dateCreated;
                    
                    if (oldVal == 0) {
                      var change = - parseInt(val);
                    }
                    else {
                      var change = parseInt(oldVal) - parseInt(val);
                    }
                    var currentValue = parseInt($(totalSelector).find('#total_sum').html() );
                    currentValue = currentValue - change;  
                    $(totalSelector).find('#total_sum').html(currentValue);
                    
                    
                    var totalSum = $('p#total_sum');  
                    $.each(totalSum, function(index, data){ 
                      var totalSumVal =data.innerHTML;
                       if (totalSumVal > 10 && totalSumVal < 20) {
                        $(this).css('color', '#c1441a');
                      }
                      else if (totalSumVal > 20) {
                        $(this).css('color', 'red');
                      }
                      else if (totalSumVal < 8 && totalSumVal > 0) {
                        $(this).css('color', 'blue');
                      }
                    });
                  }   
                });
              } 
            });
          });  
        }
      });
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
 //Drupal.attachBehaviors(document, Drupal.settings);
}(jQuery));

