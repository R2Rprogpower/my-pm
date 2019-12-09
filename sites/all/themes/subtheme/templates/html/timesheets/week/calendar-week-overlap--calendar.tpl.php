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
//print 'my fucking var from template.php - '  . $foo . '<br>';
//print 'my fucking var from template.php - '  . $foo_list;

$index = 0;
$header_ids = array();
$start_date = date_format($view->date_info->min_date, 'U'); 
foreach ($day_names as $key => $value) {
  $header_ids[$key] = $value['header_id'];
}
?>
<div style="margin-bottom: 50px;"  class="calendar-calendar">
  <div class="week-view">
    <table class="full">
      <thead>
        <tr  style ="background-color: #eee;"  >
          <?php if($by_hour_count > 0 || !empty($start_times)) :?>
          <th style ="float:left;" class="calendar-agenda-hour">
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
        <?php foreach ($projects_and_tickets as $index => $title): $prenid = explode('_', $index);?>
          <tr  class="not-all-day" style="<?php  ($prenid[0] =='proj') ? print 'background-color: #f7f7f7': 'float:left; margin-left:10px;' ?>">
            <td  style="" id="<?php print $index[0]; ?>" class="calendar-agenda-hour">
              <span   class="calendar-hour">
                <a style="<?php ($prenid[0] =='proj') ? print 'float:left;' : print 'float:left; margin-left:10px;' ?>" href = "/node/<?php  $nid = $prenid[1];   print $nid ;?>" ><?php print $title   ; ?></a>
              </span>
            </td>
            <?php $curpos = 0; ?>
            <?php foreach ($columns as $index => $column): ?>
              <?php $colpos = (isset($title['values'][$column][0])) ? $title['values'][$column][0]['wday'] : $index; ?>
              <?php $curpos = $colpos + 1;?>
              <td id ="<?php print 'cell_' . $cell_id =   ( $prenid[0] == 'total') ?  $prenid[0] . '_' . $prenid[1] . '_' . $dates[$index] :  $prenid[1] . '_' . $dates[$index] ;?>" class="calendar-agenda-items single-day" headers="<?php print $header_ids[$index] . 'adsa' ?>">
                  <div style="min-height: 23px; text-align: center;" class="inner">
                    <?php if( $prenid[0] == 'tick') :?>
                      <input id="input_field"  style="font-size:15px;text-align: center;height:23px;width:23px;    margin: 5% 0 5% 0;"  maxlength="2" type="text"></input> 
                      <?php
                       $text = $plus_button;
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
                       $alt = t('show a popup immediately');
                       $link = ctools_modal_text_button($text, $dest, $alt);
                       $button = array(
                         '#markup' =>$link, 
                       );
                       print render($button);   
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
    Drupal.attachBehaviors(document, Drupal.settings);
  }(jQuery));
</script>