(function ($) {

Drupal.behaviors.initModalFormsContact = {
  attach: function (context, settings) {
    $("a[href*='/contact'], a[href*='?q=contact']", context).once('init-modal-forms-contact', function () {
      this.href = this.href.replace(/contact/,'modal_forms/nojs/contact');
    }).addClass('ctools-use-modal ctools-modal-modal-popup-medium');
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.initModalFormsComment = {
  attach: function (context, settings) {
    $("a[href*='/comment/reply'], a[href*='?q=comment/reply']", context).once('init-modal-forms-comment', function () {
      this.href = this.href.replace(/comment\/reply/,'modal_forms/nojs/comment/reply');
    }).addClass('ctools-use-modal ctools-modal-modal-popup-medium');
  }
};

})(jQuery);;
/**
* Provide the HTML to create the modal dialog.
*/
Drupal.theme.prototype.ModalFormsPopup = function () {
  var html = '';

  html += '<div id="ctools-modal" class="popups-box">';
  html += '  <div class="ctools-modal-content modal-forms-modal-content">';
  html += '    <div class="popups-container">';
  html += '      <div class="modal-header popups-title">';
  html += '        <span id="modal-title" class="modal-title"></span>';
  html += '        <span class="popups-close close">' + Drupal.CTools.Modal.currentSettings.closeText + '</span>';
  html += '        <div class="clear-block"></div>';
  html += '      </div>';
  html += '      <div class="modal-scroll"><div id="modal-content" class="modal-content popups-body"></div></div>';
  html += '    </div>';
  html += '  </div>';
  html += '</div>';

  return html;
}
;
