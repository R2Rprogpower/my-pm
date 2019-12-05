<?php


/**
 * @file
 */



    
function ajax_modal_my_popup_forms_add_to_project_page_callback($js = NULL) {
  if ($js) {
    ctools_include('ajax');
    ctools_include('modal');

    $form_state = array(
      'ajax' => TRUE,
      'title' => 'Add a user to the project',
    );
    $commands = ctools_modal_form_wrapper('user_add_to_project_form', $form_state);
    print ajax_render($commands);
  }
  else {
    return drupal_get_form('user_add_to_project_form');
  }
}
function ajax_modal_my_popup_forms_add_skill_page_callback($js = NULL) {
  if ($js) {
    ctools_include('ajax');
    ctools_include('modal');

    $form_state = array(
      'ajax' => TRUE,
      'title' => 'Add skill',
    );
    $commands = ctools_modal_form_wrapper('user_add_skill_form', $form_state);
    print ajax_render($commands);
  }
  else {
    return drupal_get_form('user_add_skill_form');
  }
}
function ajax_modal_my_popup_forms_dashboard_add_new_task_page_callback($js = NULL) {
  if ($js) {
    ctools_include('ajax');
    ctools_include('modal');

    $form_state = array(
      'ajax' => TRUE,
      'title' => 'New ticket',
    );
    $commands = ctools_modal_form_wrapper('dashboard_add_new_task_form', $form_state);
    print ajax_render($commands);
  }
  else {
    return drupal_get_form('dashboard_add_new_task_form');
  }
}
function ajax_modal_my_popup_forms_add_new_ticket_page_callback($js = NULL) {
  if ($js) {
    ctools_include('ajax');
    ctools_include('modal');

    $form_state = array(
      'ajax' => TRUE,
      'title' => 'New ticket',
    );
    $commands = ctools_modal_form_wrapper('add_new_task_form', $form_state);
    print ajax_render($commands);
  }
  else {
    return drupal_get_form('add_new_task_form');
  }
}
function ajax_modal_my_popup_forms_edit_ticket_page_callback($js = NULL) {
  if ($js) {
    ctools_include('ajax');
    ctools_include('modal');

    $form_state = array(
      'ajax' => TRUE,
      'title' => 'Edit the ticket',
    );
    $commands = ctools_modal_form_wrapper('edit_task_form', $form_state);
    print ajax_render($commands);
  }
  else {
    return drupal_get_form('edit_task_form');
  }
}
function ajax_modal_my_popup_forms_delete_ticket_page_callback($js = NULL) {
  if ($js) {
    ctools_include('ajax');
    ctools_include('modal');

    $form_state = array(
      'ajax' => TRUE,
      'title' => 'Delete the ticket',
    );
    $commands = ctools_modal_form_wrapper('delete_task_form', $form_state);
    print ajax_render($commands);
  }
  else {
    return drupal_get_form('edit_task_form');
  }
}
