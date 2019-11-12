<?php


/**
 * @file
 */



    
function ajax_modal_my_popup_forms_page_callback($js = NULL) {
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
 