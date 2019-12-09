<?php

/**
 * @file
 * Bootstrap sub-theme.
 *
 * Place your custom PHP code in this file.
 */    


function subtheme_preprocess_page(&$variables) {
  drupal_add_css(path_to_theme() . '/subtheme-internals/css/abc.css');  
  drupal_add_js(path_to_theme() . '/subtheme-internals/js/abc.js');
  drupal_add_js(drupal_get_path('module', 'ajax_detach') . '/ajax_detach.js');
  drupal_add_js(drupal_get_path('module', 'control_user') . '/control_user.js');
  drupal_add_js(drupal_get_path('module', 'timesheets') . '/timesheets.js');
 
   
}

/**
 * Implements hook_css_alter().
 */
function subtheme_css_alter(&$css) {
  // Сортируем файлы функцией drupal_sort_css_js().
  uasort($css, 'drupal_sort_css_js');
  $i = 0;
  foreach ($css as $name => $style) {
    $css[$name]['weight'] = $i++;
    // Все файлы помещаем в группу CSS_DEFAULT
    $css[$name]['group'] = CSS_DEFAULT;
    $css[$name]['every_page'] = FALSE;
  }
  
}

/**
 * Implements hook_js_alter().
 */
function subtheme_js_alter(&$javascript) {
  // Сортируем файлы функцией drupal_sort_css_js().
  uasort($javascript, 'drupal_sort_css_js');
  $i = 0;
  foreach ($javascript as $name => $script) {
    $javascript[$name]['weight'] = $i++;
    // Все файлы помещаем в группу JS_DEFAULT
    $javascript[$name]['group'] = JS_DEFAULT;
    $javascript[$name]['every_page'] = FALSE;
  }
 
}