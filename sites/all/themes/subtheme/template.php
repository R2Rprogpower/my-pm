<?php

/**
 * @file
 * Bootstrap sub-theme.
 *
 * Place your custom PHP code in this file.
 */
function subtheme_preprocess_page(&$variables) {
  drupal_add_css(path_to_theme() . '/subtheme-internals/css/abc.css');
  drupal_add_js(drupal_get_path('module', 'ajax_detach') . '/ajax_detach.js');
  drupal_add_js(drupal_get_path('module', 'control_user') . '/control_user.js');
  drupal_add_js(drupal_get_path('module', 'timesheets') . '/timesheets.js');
}