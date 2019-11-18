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

    <div class="calendar-calendar">
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
                                    <th class="<?php print $cell['class']; ?>" id="<?php print $cell['header_id']; ?>">
                                        <?php print $cell['data']; ?>,
                                            <?php print date('d/m', strtotime("+$i day", $start_date)); $i++ ?>
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
            
                            // in fututre the uid shall be transported through the URL if the correct permissions are set
            $ticket_table = views_get_view_result($view_name, $view_display, array(28));
            //get all tickets and projects.
            
             $ticket_table_1 .= views_embed_view($view_name, $view_display, 28);
            
          drupal_set_message(print_r($ticket_table_1, TRUE));  
           
             
          
         
            $projects_and_tickets = array();

            foreach ($ticket_table as $ticket) {

                $ticket_project_nid = $ticket->field_data_field_project_field_project_nid;
                $proj = node_load($ticket_project_nid);
                $proj_indx =   'proj_' . $proj->nid;

                $tick_indx = 'tick_' . $ticket->nid;

                $projects_and_tickets[$proj_indx] = $proj->title;
                $projects_and_tickets[$tick_indx] = $ticket->node_title;
 
             }  

            $projects_and_tickets_to_str_index =  implode(' ',array_keys($projects_and_tickets) );
            $project_nids = explode('proj_', $projects_and_tickets_to_str_index);
            $project_nids_trimmed = array();
            foreach ($project_nids as $elem){
               if( !empty($elem) ) {
                  $project_nids_trimmed[] = $elem[0];
                }
           }

            $project_nids = $project_nids_trimmed;

           // drupal_set_message('<pre>'. print_r($project_nids, TRUE) .'</pre>');  
            $i = 0;
            $proj_poses = array();
            foreach ($projects_and_tickets as $key => $value) {

                if( $key == 'proj_' . $project_nids[$i] ){
            
                    $project_row_key =  array_search($key, array_keys($projects_and_tickets) ) ;

                    $proj_poses[] = $project_row_key;
                        
                    $i++;

                 }
                 
             }           
          //  drupal_set_message('<pre>'. print_r($proj_poses, TRUE) .'</pre>');
            $projects_and_tickets_arr = array();
            $i = 0;
            foreach ($project_nids as $key => $value) {
                $offest = $proj_poses[$i];
                $length =   isset($proj_poses[$i+1]) ? $proj_poses[$i+1] -  $proj_poses[$i] : $proj_poses[$i];
                $projects_and_tickets_arr[$key] = array_slice($projects_and_tickets, $offest, $length, TRUE);

                $projects_and_tickets_arr[$key]['total_' . $value] =   'Total' ;

                $i++;
            }
            $new_projects_and_tickets = array();
            
            foreach ( $projects_and_tickets_arr as $arr ) {
                $new_projects_and_tickets  =  array_merge($new_projects_and_tickets, $arr);
            }
       //     drupal_set_message('<pre>'. print_r($new_projects_and_tickets, TRUE) .'</pre>');  

 
              
              

    ?>
                                    <?php foreach ($new_projects_and_tickets as $index => $title): ?>
                                        <tr class="not-all-day">
                                            <td id="<?php print $index; ?>" class="calendar-agenda-hour">

                                                <span class="calendar-hour"><a href = "/node/<?php $prenid = explode('_', $index); $nid = $prenid[1];   print $nid ;?>" ><?php print $title   ; ?></a></span>

                                            </td>

                                            <?php $curpos = 0; ?>
                                                <?php foreach ($columns as $index => $column): ?>
                                                    <?php $colpos = (isset($title['values'][$column][0])) ? $title['values'][$column][0]['wday'] : $index; ?>

                                                        <?php $curpos = $colpos + 1;?>

                                                            <td class="calendar-agenda-items single-day" headers="<?php print $header_ids[$index] . 'adsa' ?>">
                                                                <div class="calendar">
                                                                    <div style="text-align: center;" class="inner">
                                                                        <?php // that's where all the forms and buttons must go ?>
                                                                        
                                                                        
                                                                            <?php if( $prenid[0] == 'tick') :?>

                                                                                <input style="width:30px;" type="text"></input>

                                                                            <?php endif; ?>
                                                                                
                                                                                
                                                                                

                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <?php endforeach; ?>

                                        </tr>
                                        <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>