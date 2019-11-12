<?php
/**
 * @file
 * Views 2 support for Role Weights.
 */

/**
 * Implements hook_views_data().
 */
function role_weights_views_data() {

  $data['role_weights']['table']['group'] = t('User');

  $data['role_weights']['table']['join'] = array(
    'users' => array(
      'left_table' => 'users_roles',
      'left_field' => 'rid',
      'field' => 'rid',
    ),
    'node' => array(
      'left_table' => 'users_roles',
      'left_field' => 'rid',
      'field' => 'rid',
    ),
    'node_revisions' => array(
      'left_table' => 'users_roles',
      'left_field' => 'rid',
      'field' => 'rid',
    ),
  );

  $data['role_weights']['weight'] = array(
    'title' => t('Role weight'),
    'help' => t("User's role weight."),
    'field' => array(
      'handler' => 'views_handler_field_numeric',
      'click sortable' => TRUE,
    ),
    'filter' => array(
      'handler' => 'views_handler_filter_numeric',
    ),
    'sort' => array(
      'handler' => 'views_handler_sort',
    ),
  );

  return $data;
}
