/**
 * @file
 *
 * Javascript for popup iframe.
 */

(function ($) {
  Drupal.popup_forms_child = Drupal.popup_forms_child || {};

  /**
   * Child dialog behavior.
   */
  Drupal.popup_forms_child.attach = function (context) {
    var self = Drupal.popup_forms_child;
    var settings = Drupal.settings.popup_forms_child;

    Drupal.settings.popup_options = JSON.parse(decodeURIComponent(window.location.href.substr(window.location.href.indexOf('&options=') + 9)));
    Drupal.settings.popup_options.backurl = unescape(Drupal.settings.popup_options.backurl);

    Drupal.settings.popup_options.position = $.extend({
      my: 'center',
      at: 'center ',
      of: window,
      collision: 'fit',
      using: function(pos) {
        var topOffset = $(this).css(pos).offset().top;
        var minTopOffset = $(window.top).height() / 4;
        if (topOffset < minTopOffset) {
          $(this).css('top', minTopOffset);
        }
      }
    }, Drupal.settings.popup_options.position);
    // Set up dialog parameters.
    Drupal.settings.popup_options.close = Drupal.popup_forms_child.closeDialog;
    Drupal.settings.popup_options.title = $('title').html();
    // Attach handlers to "close elements".
    if (Drupal.settings.popup_forms_child['cancel elements'].length) {
      $(Drupal.settings.popup_forms_child['cancel elements'].join(', '), context).click(function(){
          Drupal.popup_forms_child.closeDialog();
      });
    }
    // Open dialog.
    $('.popup-forms-container').dialog(Drupal.settings.popup_options).dialog('open');
    // Notify parent window.
    popup_forms_send_message({type: 'finish_loading', index: settings.index});
    // Show dialog.
    $('.popup-forms-dialog-wrapper').addClass('visible');
  };

  Drupal.popup_forms_child.closeDialog = function(event, ui) {
    // Remove iframe from parent document
    popup_forms_send_message({type: 'close_dialog', index: Drupal.settings.popup_forms_child.index});
  }

  /**
   * Check if the given variable is an object.
   */
  Drupal.popup_forms_child.isObject = function (something) {
    return (something != null && typeof something === 'object');
  };

  Drupal.behaviors.popup_forms_child = {
    attach: Drupal.popup_forms_child.attach
  }

  /**
   * Send message to the parent window.
   */
  function popup_forms_send_message(message) {
    // Try to send data over postmessage library.
    if (typeof(jQuery.postMessage) != 'undefined' && Drupal.settings.popup_forms_use_postmessage == 1) {
      $.postMessage(
        {type: 'finish_dialog', form_state: JSON.stringify(Drupal.settings.popup_forms.form_values)},
        Drupal.settings.popup_forms.ref,
        parent
      );
    }
    else { // Send data directly.
        parent.Drupal.popup_forms.receiveMessage(message);
    }
  }

})(jQuery);
