<?php
/**
 * @file
 *
 * Form callbacks and handlers.
 */

/**
 * Example 1 form callback.
 */
function ptest_simple_form($form, $form_state) {
  return array(
    'text' => array(
      '#type' => 'textfield',
      '#title' => t('Some text'),
    ),
    'submit' => array(
      '#type' => 'submit',
      '#value' => t('Submit'),
    ),
  );
}

/**
 * Submit handler for the example 1 form.
 */
function ptest_simple_form_submit($form, $form_state) {
  // Do nothing for this form.
}

/**
 * Example 2 form callback.
 */
function ptest_simple_form2($form, $form_state, $text_argument) {
  return array(
    'text' => array(
      '#type' => 'textfield',
      '#title' => t('Some text'),
      '#default_value' => $text_argument,
    ),
    'submit' => array(
      '#type' => 'submit',
      '#value' => t('Submit'),
    ),
    'cancel' => array(
      '#type' => 'button',
      '#value' => t('Cancel'),
      '#attributes' => array('class' => array('close')),
    ),
  );
}

/**
 * Submit handler for the example 2 form.
 */
function ptest_simple_form2_submit($form, $form_state) {
  // Do nothing.
}
