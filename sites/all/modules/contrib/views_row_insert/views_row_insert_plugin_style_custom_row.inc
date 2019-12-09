<?php

/**
 * @file
 * Contains Views Row Insert style plugin.
 */

/**
 * Defines a style plugin that adds custom row after every nth view rows.
 *
 * @ingroup views_style_plugins
 */
class views_row_insert_plugin_style_custom_row extends views_plugin_style {

  /**
   * Overrides views_plugin_style::options_definition().
   */
  function option_definition() {
    $options = parent::option_definition();
    $options['use_plugin'] = array('default' => 1);
    $options['data_mode'] = array('default' => 'block');
    $options['rows_number'] = array('default' => 2);
    $options['class_name'] = array('default' => '');
    $options['block_name'] = array('default' => '');
    $options['exclude_classes'] = array('default' => 0);
    $options['custom_row_data'] = array(
      'default' => '<strong>Your HTML is here</strong>',
    );
    $options['show_method'] = array('default' => 0);
    $options['default_rows'] = array('default' => 1);
    $options['strip_rows'] = array('default' => 1);
    $options['row_header'] = array('default' => 0);
    $options['row_footer'] = array('default' => 0);
    $options['row_limit_flag'] = array('default' => 0);
    $options['row_limit'] = array('default' => 0);
    $options['row_class'] = array('default' => '');
    return $options;
  }

  /**
   * Overrides views_plugin_style::options_form().
   *
   * @inheritdoc
   */
  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    // Make sure we are compatible with the previous version.
    if (!empty($this->options['show_method'])) {
      $row_limit = 1;
      $row_limit_flag = 1;
      $this->options['show_method'] = 0;
    }
    else {
      $row_limit = $this->options['row_limit'];
      $row_limit_flag = $this->options['row_limit_flag'];
    }
    $form['use_plugin'] = array(
      '#type' => 'checkbox',
      '#title' => t('Use this plugin'),
      '#default_value' => $this->options['use_plugin'],
      '#description' => t('Check if you want to use this plugin.'),
    );
    $form['data_mode'] = array(
      '#type' => 'radios',
      '#title' => t('Row type'),
      '#options' => ['block' => 'Block', 'text' => 'Custom content'],
      '#default_value' => $this->options['data_mode'],
    );
    $form['block_name'] = array(
      '#type' => 'select',
      '#title' => t('Select a block'),
      '#options' => _views_row_insert_get_blocks(),
      '#default_value' => $this->options['block_name'],
      '#description' => t('Select a block to insert instead of using custom content.'),
    );
    $form['custom_row_data'] = array(
      '#type' => 'textarea',
      '#title' => t('Custom content'),
      '#default_value' => $this->options['custom_row_data'],
      '#description' => t('Enter text or html code.'),
    );
    $form['rows_number'] = array(
      '#type' => 'textfield',
      '#attributes' => array(
        ' type' => 'number',
        'min' => 1,
      ),
      '#title' => t('Insert after every Nth row'),
      '#default_value' => $this->options['rows_number'],
      '#description' => t('Number of rows to skip.'),
    );
    $form['row_header'] = array(
      '#type' => 'checkbox',
      '#title' => t('Start with inserted row'),
      '#default_value' => $this->options['row_header'],
      '#description' => t('Check if you want to insert the row at the beginning of your output.'),
    );
    $form['row_footer'] = array(
      '#type' => 'checkbox',
      '#title' => t('Insert row at the bottom'),
      '#default_value' => $this->options['row_footer'],
      '#description' => t('If possible, the row will be added at the bottom of your output.'),
    );
    $form['row_limit_flag'] = array(
      '#type' => 'checkbox',
      '#title' => t('Limit the amount of inserted rows'),
      '#default_value' => $row_limit_flag,
      '#description' => t('Check if you want to specify the amount of inserted rows.'),
    );
    $form['row_limit'] = array(
      '#type' => 'textfield',
      '#attributes' => array(
        ' type' => 'number',
        'min' => 0,
      ),
      '#title' => t('How many times to display the row?'),
      '#default_value' => $row_limit,
      '#description' => t('Set display limit number of inserted rows per page, 0 - no limitations.'),
    );
    $form['class_name'] = array(
      '#title' => t('Insert row class name(s)'),
      '#type' => 'textfield',
      '#default_value' => $this->options['class_name'],
      '#description' => t('If specified, the inserted row will be wrapped by div element with above classes.'),
    );
    $form['row_class'] = array(
      '#title' => t('Row class'),
      '#type' => 'textfield',
      '#default_value' => $this->options['row_class'],
      '#description' => t('The class to provide on each original row from the view output.'),
    );
    $form['default_rows'] = array(
      '#type' => 'checkbox',
      '#title' => t('Add views row classes'),
      '#default_value' => $this->options['default_rows'],
      '#description' => t('Add the default row classes like views-row-1 to the output. You can use this to quickly reduce the amount of markup the view provides by default, at the cost of making it more difficult to apply CSS.'),
    );
    $form['strip_rows'] = array(
      '#type' => 'checkbox',
      '#title' => t('Add striping (odd/even), first/last row classes'),
      '#default_value' => $this->options['strip_rows'],
      '#description' => t('Add css classes to the first and last line, as well as odd/even classes for striping.'),
    );
    $form['exclude_classes'] = array(
      '#type' => 'checkbox',
      '#title' => t('Do not apply the default classes to created row'),
      '#default_value' => $this->options['exclude_classes'],
      '#description' => t('Check if you want to exclude the default row classes and striping (odd/even), first/last classes from adding to this row.'),
    );
    $form['#attached']['js'] = array(
      drupal_get_path('module', 'views_row_insert') . '/js/helper.js',
    );
    $form['#attached']['js'][] = array(
      'type' => 'setting',
      'data' => array(
        'views_row_insert' => array(
          'data_mode' => $this->options['data_mode'],
          'row_limit_flag' => $row_limit_flag,
        ),
      ),
    );
  }

}
