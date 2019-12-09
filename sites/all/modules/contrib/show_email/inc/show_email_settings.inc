<?php

/**
 * @file
 * Basically show the user's registered email address.
 */

/**
 * Return form of the settings.
 */
function show_email_settings() {
  $form['show_email_settings'] = array(
    '#type' => 'vertical_tabs',
  );

  $form['show_email_settings_status'] = array(
    '#type' => 'fieldset',
    '#title' => t('Status'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#group' => 'show_email_settings',
  );

  $form['show_email_settings_status']['show_email_enabled'] = array(
    '#title' => t('Enabled'),
    '#type' => 'checkbox',
    '#default_value' => variable_get('show_email_enabled', 1),
    '#required' => FALSE,
    '#description' => t('If enabled the email address will show in the user page profile'),
  );

  $form['show_email_settings_option'] = array(
    '#type' => 'fieldset',
    '#title' => t('Options'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#group' => 'show_email_settings',
  );

  $form['show_email_settings_option']['show_email_weight'] = array(
    '#title' => t('Weight'),
    '#type' => 'textfield',
    '#default_value' => variable_get('show_email_weight', 1),
    '#required' => FALSE,
    '#description' => t('Please use number in order to display the field weight'),
  );

  $label_option = array(
    'inline' => t('Inline'),
    'above' => t('Above'),
    'hidden' => t('Hidden'),
  );

  $form['show_email_settings_option']['show_email_label_display'] = array(
    '#title' => t('Label Display'),
    '#type' => 'select',
    '#options' => $label_option,
    '#default_value' => variable_get('show_email_label_display', 'inline'),
    '#required' => FALSE,
    '#description' => t('Please use number in order to display the field weight'),
  );

  $form['show_email_settings_privacy'] = array(
    '#type' => 'fieldset',
    '#title' => t('Privacy'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#group' => 'show_email_settings',
  );

  $form['show_email_settings_privacy']['show_email_settings_uid_one_fieldset'] = array(
    '#type' => 'fieldset',
    '#title' => t('Hide User One'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );

  $form['show_email_settings_privacy']['show_email_settings_uid_one_fieldset']['show_email_settings_hide_uid_one'] = array(
    '#title' => t('Hide User One'),
    '#type' => 'checkbox',
    '#default_value' => variable_get('show_email_settings_hide_uid_one', 1),
    '#required' => FALSE,
    '#description' => t('If selected user one will be hidden.'),
  );

  $form['show_email_settings_privacy']['show_email_settings_hidden_fieldset'] = array(
    '#type' => 'fieldset',
    '#title' => t('Hide Per Role'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );

  $roles = user_roles(TRUE, NULL);
  foreach ($roles as $key => $role) {
    $form['show_email_settings_privacy']['show_email_settings_hidden_fieldset']['show_email_settings_hide_per_role_' . $key] = array(
      '#title' => $role,
      '#type' => 'checkbox',
      '#default_value' => variable_get('show_email_settings_hide_per_role_' . $key, 0),
      '#required' => FALSE,
      '#description' => t('If selected all users email field of the role (<b>@role</b>) will be hidden.', array('@role' => $role)),
    );
  }

  return system_settings_form($form);

}
