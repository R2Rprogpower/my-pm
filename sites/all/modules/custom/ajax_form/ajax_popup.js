/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function($) { 
  Drupal.behaviors.login_popup_example = {
    attach: function(context, settings) {
      $(document).click(function(e) {
        var $target = $(e.target);
        if ($target.is('a') && ($target.attr('href').match('^/user$') || $target.attr('href').match('^/user/login.*$'))) {
          popupFormsFormShow( 'ajax_popup_user_login', function(form_state) {
            alert(Drupal.t('Hello, @username!', {
              '@username': form_state.values.name
            }));
            window.location.reload();
          });
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      });
    }
  }
})(jQuery);