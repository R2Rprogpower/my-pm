/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function($, Drupal) {
  Drupal.behaviors.style = {
    attach: function (context, settings) {
      // some theming code
      $('.custom-class-node-title').find('a').attr('style', 'text-decoration: none; color: black;');
      $('a:contains("New ticket")').css('color', 'white');
      $('a:contains("Add a skill")').css('color', 'white');
      $('a:contains("Dashboard")').css('color', 'white');
      $('a:contains("Add a team member")').css('color', 'white');
      $('form-item-end-date').css('color','red');
      $('h6:contains("Projects")').attr('id', 'custom-h6-project-style');
      $('h2:contains("Team")').attr('id', 'custom-h6-team-style');
      $('caption').attr('class', 'custom_caption');
      $('.add_to_team_custom.ctools-use-modal-processed').attr('id', 'add_to_team_custom');
      $('#user-add-to-project-form').css('background-color', 'black');
      $('#role-label').css('padding-top','10px');
      
      $('li.prev').css('margin-top', '36.5px');
      $('li.prev').css('position', 'absolute');
      $('li.prev').find('span').css('margin-top', '3px');
      $('li.prev').find('span').css('position', 'absolute');
      $('li.prev').find('a').css('border', '0');
      $('li.prev').css('margin-left', '-1000px');
      $('li.prev').find('a').css('max-height', '0.00000000001px');
      $('li.prev').find('a').css('max-width', '0.00000000001px');
      //$('li.prev').css('font-size', '6px');
      $('.prev').find('a').css('background-color', '#eee');


      $('li.next').css('margin-top', '36.5px');
      $('li.next').find('span').css('margin-top', '3px');
       $('li.next').find('span').css('position', 'absolute');
      $('li.next').css('position', 'absolute');
      $('li.next').find('a').css('border', '0');
      $('li.next').find('a').css('max-height', '0.00000000001px');
      $('li.next').find('a').css('max-width', '0.00000000001px');
      $('li.next').find('a').css('z-index', '10');
      $('li.next').css('margin-left', '-40px');  
     // $('li.next').css('font-size', '6px'); 
      $('.next').find('a').css('background-color', '#eee');
      
    }
  };
}(jQuery, Drupal));