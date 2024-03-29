/**
 * @file
 * Javascript for parent window.
 */

(function ($) {
  // Behavior for "popup forms" links.
  Drupal.behaviors.popup_form_link = {
    attach: function(context) {
      $('a.popup-forms-hotlink').click(function(){
        var data = $.parseJSON($(this).attr('data-popup-forms'));
        form_id = data.form_id;
        delete data.form_id;
        popupFormsFormShow(form_id, null, data, {});
        return false;
      });
    }
  }

  Drupal.popup_forms = Drupal.popup_forms || {dialogs: Array()};
  Drupal.popup_forms.loadCallbacks = {};

  /**
   * Open a jquery ui dialog
   * @param options
   *   Properties of the modal frame to open:
   *   - url : the URL of the page to open. If not provided, you have to handle the loading yourself
   *   - method(get) : What method should use to load the url (get/post)
   *   - data : Post DATA you can pass, if you use method=post
   *   - for all the other options please refer the jquery ui dialog documentation http://jqueryui.com/demos/dialog/#options
   */
  Drupal.popup_forms.open = function (c_options) {
    var self = this;

    // initialize new dialog
    var newDialog = {
      options: {},
      childDocumentSize: {},
      container: undefined
    };

    newDialog.options = {
      // custom
      url: '',
      method: 'get',
      data: {},
      // jquery dialog
      modal: true,
      autoOpen: true,
      closeOnEscape: true,
      resizable: false,
      draggable: false,
      autoresize: true,
      dialogClass: 'popup_forms-dialog',
      title: Drupal.t('Loading...'),
      drag: self.drag
    };
    jQuery.extend(newDialog.options, c_options);
    newDialog.options.autoOpen = newDialog.options.autoresize = true;
    // push dialog data into array
    newIndex = Drupal.popup_forms.dialogs.push(newDialog) - 1;

    // Create the dialog and related DOM elements.
    // Setting dialog
    self.create(newIndex);
    if (self.dialogs[newIndex].options.url != '') {
      self.dialogs[newIndex].options.url = self.dialogs[newIndex].options.url + '&popup_forms_num=' + newIndex + '&ref=' + encodeURIComponent(window.location.href);
      self.loadIframe(self.dialogs[newIndex].iframe.get(0), self.dialogs[newIndex].options);
    }

    return newIndex;
  };

  /**
   * Inititalize the dialog.
   */
  Drupal.popup_forms.create = function (index) {
    var self = this;
    // Note: We use scrolling="yes" for IE as a workaround to yet another IE bug
    // where the horizontal scrollbar is always rendered, no matter how wide the
    // iframe element is defined.
    // we need to set z-index to negative value for prepend some "blink" effect in Chrome
    var iframe = jQuery('<iframe style="z-index:-10" frameborder="0" allowtransparency class="popup-forms-iframe" id="popup-forms-iframe-' + index + '" name="popup-forms-iframe' + index + '"' + (jQuery.browser.msie ? ' scrolling="yes"' : '') + '/>');
    jQuery('body').append(iframe);
    iframeHeight = jQuery(document).height();
    jQuery('#popup-forms-iframe-' + index).css('height', iframeHeight + 'px');
    self.dialogs[index].iframe = jQuery('#popup-forms-iframe-' + index);
  };

  /**
   * Load the given URL into the dialog iframe.
   */
  Drupal.popup_forms.loadIframe = function (iframe, options) {
    var self = this;
    // Build a light-weight copy of options.
    trimmed_options = options;
    tmpCallback = trimmed_options.popupFormsCallback;
    delete trimmed_options.popupFormsCallback;
    params = Drupal.popup_forms.getWindowParameters();
    trimmed_options.wndHeight = params.wndHeight;
    trimmed_options.wndWidth = params.wndWidth;
    trimmed_options.wndScroll = params.scrollTop;
    trimmed_options.backurl = window.location.href;
    options.url += '&options=' + encodeURIComponent(JSON.stringify(trimmed_options));
    trimmed_options.popupFormsCallback = tmpCallback;
    // Get the document object of the iframe window.
    // @see http://xkr.us/articles/dom/iframe-document/
    var doc = (iframe.contentWindow || iframe.contentDocument);
    if ('document' in doc) {
      doc = doc.document;
    }

    if (options.method == 'post') {
      jQuery(doc).post(
      options.url, options.data, function (data) {
        jQuery(doc).html(data);
      });
      return;
    }
    doc.location.replace(options.url);
  };

  /**
   * JQuery UI dialog "close" callback.
   */
  Drupal.popup_forms.closeDialog = function(index) {
    // Remove iframe.
    jQuery('#popup-forms-iframe-' + index).remove();
  }

  /**
   * Returns parameters of window (called from child iframe).
   */
  Drupal.popup_forms.getWindowParameters = function() {
    return {
      scrollTop: jQuery(document).scrollTop(),
      wndHeight: jQuery(window).height(),
      wndWidth: jQuery(window).width()
    };
  }

  /**
   * Called from child js, when dialod is loaded
   */
  Drupal.popup_forms.finishLoading = function(formId) {
    if (typeof(Drupal.popup_forms.loadCallbacks[formId]) != 'undefined') {
      Drupal.popup_forms.loadCallbacks[formId](formId);
    }
    // bring popup's iframe to front
    Drupal.popup_forms.dialogs[formId].iframe.css('z-index', '10');
  }

  /**
   * Receive message rfom child windows (popups).
   */
  Drupal.popup_forms.receiveMessage = function(message) {
    switch (message.type) {
      case 'finish_loading':
        Drupal.popup_forms.finishLoading(message.index);
        break;
      case 'close_dialog':
        Drupal.popup_forms.closeDialog(message.index);
        break;
      case 'finish_dialog':
        popupFormsFinishDialog(message.form_state);
        break;
    }
  }
})(jQuery);


/**
 * Show  form in ajax popup
 * @param string form_id drupal form id
 * @param string callback called when dialog finished
 * @param form_data various data, that transfered to drupal form callback
 * @param dialog_options jQuery dialog options (size, parameters, etc)
 * @return int popup form id
 */
function popupFormsFormShow(form_id, callback, form_data, dialog_options) {
  if (typeof(Drupal.settings.IE7) != 'undefined' && Drupal.settings.IE7 == true && typeof(dialog_options.fail_callback) != 'undefined') {
    return dialog_options.fail_callback(dialog_options);
  }
  var loc = window.location;
  var query_url = "" + loc.protocol + "//" + loc.host + Drupal.settings.basePath + '?q=ajax-get-popup-form/' + form_id;
  for (param in form_data) {
    query_url += '&' + param + '=' + encodeURIComponent(form_data[param]);
  }
  options = {
      method: 'get',
      url: query_url,
      data: {},
      popupFormsCallback: callback,
      // jquery dialog
      modal: false,
      autoOpen: true,
      closeOnEscape: false,
      resizable: false,
      draggable: true,
      autoresize: true
    };
    jQuery.extend(options, dialog_options);
    if (options.dialogClass !== undefined) {
      options.dialogClass += ' form-id-' + form_id;
    }
    else {
      options.dialogClass += ' popup_forms-dialog form-id-' + form_id;
    }

    return Drupal.popup_forms.open(options);
}

/**
 * This callback executed from dialog child JS, when it ready to close.
 * @return void
 */
function popupFormsFinishDialog(returnedData) {
  returnedData = JSON.parse(decodeURIComponent(returnedData.replace(/\+/g, '%20')))
  var dialogIndex = returnedData.finish_dialog_index;
  // remove iframe
  jQuery('#popup-forms-iframe-' + dialogIndex).remove();
  // execute callback
  if (Drupal.popup_forms.dialogs[dialogIndex].options.popupFormsCallback) {
    Drupal.popup_forms.dialogs[dialogIndex].options.popupFormsCallback(returnedData);
  }
}

/**
 * Implement $.unserialize
 */
(function($){
  if (typeof $.unserialize != 'function') {
    $.unserialize = function(serializedString){
      var str = decodeURI(serializedString);
      var pairs = str.split('&');
      var obj = {}, p, idx, val;
      for (var i = 0, n = pairs.length; i < n; i++) {
        p = pairs[i].split('=');
        idx = p[0];

        if (idx.indexOf("[]") == (idx.length - 2)) {
          // Eh um vetor
          var ind = idx.substring(0, idx.length - 2)
          if (obj[ind] === undefined) {
            obj[ind] = [];
          }
          obj[ind].push(p[1]);
        }
        else {
          if (p[1] == "true") {
            p[1] = true;
          }
          if (p[1] == "false") {
            p[1] = true;
          }
          obj[idx] = p[1];
        }
      }
      return obj;
    };
  }
})(jQuery);

if (typeof(jQuery.receiveMessage) != 'undefined' && Drupal.settings.popup_forms_use_postmessage == 1) {
    jQuery.receiveMessage(
      function(message){
        data = jQuery.unserialize(message.data);
        Drupal.popup_forms.receiveMessage(data);
      },
      function(origin) {
        return origin.indexOf(window.location.hostname) != -1;
      }
    );
}
