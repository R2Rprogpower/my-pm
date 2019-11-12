/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function($, Drupal)
{
  function showPassBlock()
  {
    $("#block-ajax-popup-custom-ajax-popup").fadeIn(300);
  }
 
  function hidePassBlock()
  {
    $("#block-ajax-popup-custom-ajax-popup").fadeOut(300);
  }
 
  function userPassLinkListener()
  {
    $("a").once("ajax-popup-link-listener", function()
    {
      $(this).click(function(e)
      {
        e.preventDefault();
 
        showPassBlock();
      });
    });
  }
 
  Drupal.behaviors.userPassBlock = {
    attach:function()
    {
      userPassLinkListener();
    }
  };
 
  // We need to create a custom AJAX command to be used by our AJAX submit
  // in order t hide our form after a successful submission. This will be triggered in
  // step 8 of the tutorial.
  Drupal.ajax.prototype.commands.passThemeHidePassPopup = function()
  {
    hidePassBlock();
  };
}(jQuery, Drupal));