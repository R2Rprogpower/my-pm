<?php

/**
 * @file
 * Bootstrap sub-theme.
 *
 * Place your custom PHP code in this file.
 */
 
  function subtheme_preprocess_page(&$variables) {
      
       $variables['popup_block'] = "<div id =\"popup1\" style=\"opacity:-10;\" class=\"b-container\"> Sample Text </div>
                <div class=\"b-popup\">
                    <div class=\"b-popup-content\"> Text in Popup </div>
                </div>";
      $variables['view_list'] = '<div id="dasd" style="min-height:600px;"  class="view-content">
 
                            <div class="wrapper-item-list">
                                <ol class="item-list">	
								
                                </ol>
                            </div>
 
                        </div>';
      
      
     drupal_add_css(path_to_theme() . '/subtheme-internals/css/abc.css');
     drupal_add_js(drupal_get_path('module', 'ajax_detach') . '/ajax_detach.js');
     drupal_add_js(drupal_get_path('module', 'control_user') . '/control_user.js');
     drupal_add_js(drupal_get_path('module', 'timesheets') . '/timesheets.js');
   

 
     if (isset($vars['node']->type)) {
         drupal_set_message('<pre>'. print_r ($vars['node']->type, true) .'</pre>');  

        $vars['theme_hook_suggestions'][] = 'page__' . $vars['node']->type;
        }
     
  }
  