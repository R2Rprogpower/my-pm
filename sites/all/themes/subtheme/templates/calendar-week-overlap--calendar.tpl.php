<?php
/**
 * @file
 * Template to display a view as a calendar week.
 * 
 * @see template_preprocess_calendar_week.
 *
 * $day_names: An array of the day of week names for the table header.
 * $rows: The rendered data for this week.
 * 
 * For each day of the week, you have:
 * $rows['date'] - the date for this day, formatted as YYYY-MM-DD.
 * $rows['datebox'] - the formatted datebox for this day.
 * $rows['empty'] - empty text for this day, if no items were found.
 * $rows['all_day'] - an array of formatted all day items.
 * $rows['items'] - an array of timed items for the day.
 * $rows['items'][$title_period]['hour'] - the formatted hour for a time period.
 * $rows['items'][$title_period]['ampm'] - the formatted ampm value, if any for a time period.
 * $rows['items'][$title_period]['values'] - An array of formatted items for a time period.
 * 
 * $view: The view.
 * $min_date_formatted: The minimum date for this calendar in the format YYYY-MM-DD HH:MM:SS.
 * $max_date_formatted: The maximum date for this calendar in the format YYYY-MM-DD HH:MM:SS.
 * 
 */
//dsm('Display: '. $display_type .': '. $min_date_formatted .' to '. $max_date_formatted);
//dsm($rows);
//dsm($items);
$index = 0;
$header_ids = array();
$start_date = date_format($view->date_info->min_date, 'U'); 
    

                        
foreach ($day_names as $key => $value) {
  $header_ids[$key] = $value['header_id'];
}

 // drupal_set_message('<pre>'. print_r($ticket_table, TRUE) .'</pre>');  

?>
<script>
          
                                    
                                    
    </script>
    <div style="margin-bottom: 50px;"  class="calendar-calendar">
        <div class="week-view">
            <table class="full">
                <thead>
                    <tr>
                        <?php if($by_hour_count > 0 || !empty($start_times)) :?>
                            <th class="calendar-agenda-hour">
                                <?php print t('Timesheets')?>
                            </th>
                            <?php endif;?>

                                <?php $i = 0; foreach ($day_names as $cell): ?>
                                    <th class="<?php print $cell['class']; ?>" id="<?php  print "" . $date =  date('d/m/Y', strtotime("+$i day", $start_date));  ?>">
                                       <!-- <?php  print $cell['data']; ?>, -->
                                            <?php print $date =  date('d/m', strtotime("+$i day", $start_date));  ?>
                                         <?php  $dates[] = $date = date('d/m/y', strtotime("+$i day", $start_date)); $i++; ?>
                                    </th>
                                    <?php endforeach; ?>

                    </tr>
                </thead>
                <tbody>
                    <?php for ($i = 0; $i < $multiday_rows; $i++): ?>
                        <?php 
      $colpos = 0; 
      $rowclass = "all-day";
      if( $i == 0) {
        $rowclass .= " first";
      }
      if( $i == $multiday_rows - 1) {
        $rowclass .= " last";
      }
    ?>

     <?php endfor; ?>

    <?php  // that's where titles of the tickets of the user filtered by responsible, not open, not closed,  must go   

            $view_name = 'user_tickets';
            $view_display = 'block_1';
            if(!empty(arg(1))){
                $uid = arg(1) ;
                
            }                      // in fututre the uid shall be transported through the URL if the correct permissions are set
            $ticket_table = views_get_view_result($view_name, $view_display,  $uid );
            //get all tickets and projects.
            $proj_and_tick_nids = array();
            foreach ($ticket_table as $ticket) {
                
                $proj_and_tick_nids[] =    $ticket->field_data_field_project_field_project_nid;
                $proj_and_tick_nids[] =    $ticket->nid;
 
             }  
             
            $proj_and_tick_nids_unique = array_unique($proj_and_tick_nids);
            
            $nodes = node_load_multiple($proj_and_tick_nids_unique); 
            $total_field_text = t('Total');
            $projects_and_tickets = array();
            foreach ($nodes as $node){ 
                     
                   if (array_keys($nodes)[0] !== $node->nid && $node->type == 'project') {
                                $total_index = explode( '_', $proj_indx)[1]; 
                                $projects_and_tickets['total_' . $total_index] =   $total_field_text;
                    }
                    
                    switch ($node->type) {
                        case 'project':
                               
                            $proj_indx =   'proj_' . $node->nid;
                            $projects_and_tickets[$proj_indx] = $node->title;
                            
                            break;
                        case 'ticket':
                            
                            $tick_indx = 'tick_' . $node->nid;
                            $projects_and_tickets[$tick_indx] = $node->title;
                            break;
                    }
            }
            
            unset( $projects_and_tickets['total_']);
            $total_index = explode( '_', $proj_indx)[1]; 
            $projects_and_tickets['total_' . $total_index] =   $total_field_text;
                        
                        
    ?>
                                    <?php //     $ticket_table_1 ?>
                                    <?php foreach ($projects_and_tickets as $index => $title): ?>
                                        <tr  class="not-all-day">
                                            <td id="<?php print $index[0]; ?>" class="calendar-agenda-hour">
                                                <span class="calendar-hour"><a href = "/node/<?php $prenid = explode('_', $index); $nid = $prenid[1];   print $nid ;?>" ><?php print $title   ; ?></a></span>
                                            </td>

                                            <?php $curpos = 0; ?>
                                                <?php foreach ($columns as $index => $column): ?>
                                                    <?php $colpos = (isset($title['values'][$column][0])) ? $title['values'][$column][0]['wday'] : $index; ?>
                                                        <?php $curpos = $colpos + 1;?>
                                             
                                                            <td id ="<?php print 'cell_' . $cell_id =   ( $prenid[0] == 'total') ?  $prenid[0] . '_' . $prenid[1] . '_' . $dates[$index] :  $prenid[1] . '_' . $dates[$index] ;?>" class="calendar-agenda-items single-day" headers="<?php print $header_ids[$index] . 'adsa' ?>">
                                                                

                                                                
                                                                
                                                                
                                                                <div  class="calendar">
                                                                    <div style="text-align: center;" class="inner">
                                                                        
                                                                            <?php if( $prenid[0] == 'tick') :?>
                                                                        <input  style="font-size:15px;text-align: center;height:23px;width:23px;    margin: 5% 0 5% 0;"  maxlength="2" type="text"></input> 
                                                                             
                                                                                      <?php

                                                                          $text = "<button  style=\"width:10px;\"  class=\"custom-button-timesheets-plus\">
                                                                          +
                                                                          </button>"   ;
                                                                          
                                                                          $new_href_data = explode ('_', $cell_id); 
                                                                          $ticket_nid = $new_href_data[0];
                                                                          $date_explode = explode('/',$new_href_data[1]);
                                                                                    
                                                                          $day  = $date_explode[0];
                                                                          $month  = $date_explode[1];     
                                                                          $year  = $date_explode[2];
                                                                          $date = "/" .$day . '_' . $month . '_' . $year;
                                                                          $path =  '/user/' . arg(1) . '/timesheets/week';
                                                                          $modal_part = '/ajax/nojs/';
                                                                          $url = $path .  $modal_part . $ticket_nid .  $date; 
                                                                          
                                                                              $dest = $url;
                                                                              
                        
                                                                              $alt = 'show a popup immediately';

                                                                              $link = ctools_modal_text_button($text, $dest, $alt);

                                                                              $build = array(
                                                                                  '#markup' =>$link, 
                                                                                  );

                                                                              print render($build);   

                                                                            
                                                                            ?>
                                                                            
                                                          
                                                                            
                                                                            
                                                                            <?php endif; ?>
                                                                            
                                                                            
                                                                             <?php if( $prenid[0] == 'total') :?>
                                                                        
                                                                         <p id="total_sum">0</p>
                                                                         
                                                                         
                                                                            <?php endif; ?>
                                                                            
                                                                            
                                                                            
                                                                            
                                                                    </div>
                                                            </td>
                                                <?php endforeach; ?>
                                        </tr>
                                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
<div id="single-day-container">
 
  </div>
  
<script> 
    
(function ($) {


	Drupal.behaviors.timesheets1 = {


		attach: function (context, settings) {
                   
    
                                         $('#abra').find('a').click(function(e) {
                                                e.preventDefault();
                                                
                                                var rowLink = $(this).attr('href').split('/');
                                                       //console.log(rowLink);   // http://pm.local:10080/user/week/timesheets/veiw/ajax/2019-W49/28
                                                                      

                                         var url2 = '/user/week/timesheets/veiw/ajax/'  + rowLink[8] + '/' + rowLink[9];
                                         var url2 = $(this).attr('href');
                                         var date = $('th.mon').attr('id');   
                                         var data = {"date" : date}
                                          //console.log(url2);
                                         

                                             $.ajax({
						type: 'POST',
						url: url2 ,
                                                data: data,
						dataType: 'html',
						success: function (timesheetsInfoJson) {
							// Set up new content.
                                                        
							var timesheetsInfo = JSON.parse(timesheetsInfoJson );
 
							//console.log(timesheetsInfo.html);
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
    </script>