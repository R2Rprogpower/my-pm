<?php

/**
 * @file
 * Contains views_row_insert plugin settings.
 */

/**
 * Implements hook_views_plugins().
 */
function views_row_insert_views_plugins() {
  $plugin = array(
    'module' => 'views_row_insert',
    'style' => array(
      'custom_row' => array(
        'title' => t('Insert Rows'),
        'handler' => 'views_row_insert_plugin_style_custom_row',
        'path' => drupal_get_path('module', 'views_row_insert'),
        'theme' => 'views_row_insert',
        'js' => array(),
        'type' => 'normal',
        'uses row plugin' => TRUE,
        'uses fields' => TRUE,
        'uses options' => TRUE,
        'uses grouping' => FALSE,
        'even empty' => FALSE,
      ),
    ),
  );
  return $plugin;
}
