(function($) {
  Drupal.behaviors.ptest_example = {
    attach: function(context, settings) {
      // Exmaple 1.
      $('a.ptest-simple-form-1', context).click(function(){
        popupFormsFormShow('ptest_simple_form');
      });
      // Exmaple 2.
      $('a.ptest-simple-form-2', context).click(function(){
        popupFormsFormShow('ptest_simple_form2', null, {text : $('#ptest-simple-form-2-text').val()});
      });
    }
  }
})(jQuery);