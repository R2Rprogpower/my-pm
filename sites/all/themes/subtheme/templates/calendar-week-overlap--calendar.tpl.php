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
 * $rows['items'][$time_period]['hour'] - the formatted hour for a time period.
 * $rows['items'][$time_period]['ampm'] - the formatted ampm value, if any for a time period.
 * $rows['items'][$time_period]['values'] - An array of formatted items for a time period.
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





foreach ($day_names as $key => $value) {
  $header_ids[$key] = $value['header_id'];
}
 
 
 // drupal_set_message('<pre>'. print_r($ticket_table, true) .'</pre>');  

?>
<div class="calendar-calendar"><div class="week-view">
<table class="full">
  <thead>
    <tr>
      <?php if($by_hour_count > 0 || !empty($start_times)) :?>
      <th class="calendar-agenda-hour" ><?php print t('Time')?></th>
      <?php endif;?>
      <?php foreach ($day_names as $cell): ?>
        <th  class="<?php print $cell['class']; ?>" id="<?php print $cell['header_id']; ?>">
          <?php print $cell['data']; ?>
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

       
//  $view = views_get_view('user_tickets');
//  $view->set_display('block_1');
//  $view->set_arguments(array(28));
//  // change the amount of items to show
//   $view->pre_execute();
//  $view->execute();
     // in fututre the uid shall be transported through the URL if the correct permissions are set
  $ticket_table = views_get_view_result($view_name, $view_display, array(28));
  //get all tickets and projects.
  $tickets = array();
  $projects = array();
  foreach ($ticket_table as $ticket){
     $tickets[$ticket->nid] = $ticket->node_title;
     $ticket_project_nid = $ticket->field_data_field_project_field_project_nid;
     $proj = node_load($ticket_project_nid);
     $projects[$proj->nid] = $proj->title;
    
  }
    ?> 
   <?php foreach ($items as $time): ?>
    <tr class="not-all-day">
      <td class="calendar-agenda-hour">
          
          
        <span class="calendar-hour"><?php print $time['hour']   ; ?></span><span class="calendar-ampm"><?php print $time['ampm']; ?></span>
      </td>
      
      
      
      <?php $curpos = 0; ?>
      <?php foreach ($columns as $index => $column): ?>
        <?php $colpos = (isset($time['values'][$column][0])) ? $time['values'][$column][0]['wday'] : $index; ?>
        <?php for ($i = $curpos; $i < $colpos; $i++): ?>
        <td class="calendar-agenda-items single-day">
          <div class="calendar">
            <div   class="inner">&nbsp</div>
    
          </div>
        </td>
        <?php endfor; ?>   
        <?php $curpos = $colpos + 1;?>
        
        
        
        <td style="background-color: blue;" class="calendar-agenda-items single-day" headers="<?php print $header_ids[$index] . 'adsa' ?>">
          <div  class="calendar">
          <div  class="inner">
           <?php // that's where all the forms and buttons must go ?> 
            <?php if(!empty($time['values'][$column])) :?>
              <?php foreach($time['values'][$column] as $item) :?>
                <?php print $item['entry'] ?>
              <?php endforeach; ?>
            <?php endif; ?>
              
              
          </div>
          </div>
        </td>
      <?php endforeach; ?>   
  
    </tr>
   <?php endforeach; ?>   
  </tbody>
</table>
</div></div>
