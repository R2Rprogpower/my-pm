/**
 * @file
 * Javascript, needed for ajax form submit response.
 */

/**
 * Send message to the parent window.
 */
function popup_forms_send_message(message) {
  // Try to send data over postmessage library.
  if (typeof(jQuery.postMessage) != 'undefined' && Drupal.settings.popup_forms_use_postmessage == 1) {
    jQuery.postMessage(
      {type: 'finish_dialog', form_state: JSON.stringify(Drupal.settings.popup_forms.form_values)},
      Drupal.settings.popup_forms.ref,
      parent
    );
  }
  else { // Send data directly.
      parent.Drupal.popup_forms.receiveMessage(message);
  }
}

// Send "form submitted" message.
popup_forms_send_message({type: 'finish_dialog', form_state: JSON.stringify(Drupal.settings.popup_forms.form_values)});
