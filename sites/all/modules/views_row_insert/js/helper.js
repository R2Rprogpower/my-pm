/**
 * Helper JS file for the settings form.
 */
(function ($) {
  'use strict';
  Drupal.behaviors.views_row_insert = {
    attach: function (context, settings) {

      /**
       *  Shows/hides form element.
       *  @param type string
       *  a string containing 'block' or 'text' value
       *  @param mode string
       *  a string argument for show()/hide() jQuery functions.
       */
      function showElement(type, mode) {
        if (type === 'block') {
          $('.form-item-style-options-custom-row-data').hide(mode);
          $('.form-item-style-options-block-name').show(mode);
        }
        else {
          $('.form-item-style-options-custom-row-data').show(mode);
          $('.form-item-style-options-block-name').hide(mode);
        }
      }

      $('input:radio[name="style_options[data_mode]"]').change(
        function () {
          if ($(this).is(':checked') && $(this).val() === 'block') {
            showElement('block', 'slow');
          }
          else {
            showElement('text', 'slow');
          }
        });
      if (Drupal.settings.views_row_insert.data_mode === 'block') {
        showElement('block', '');
      }
      else {
        showElement('text', '');
      }

      if (Drupal.settings.views_row_insert.row_limit_flag === 1) {
        $('.form-item-style-options-row-limit').show();
      }
      else {
        $('.form-item-style-options-row-limit').hide();
      }

      $('input[name="style_options[row_limit_flag]"]').change(
        function () {
          if ($(this).is(':checked')) {
            $('.form-item-style-options-row-limit').show('slow');
          }
          else {
            $('.form-item-style-options-row-limit').hide('slow');
          }
        }
      );
    }
  };
}(jQuery));
