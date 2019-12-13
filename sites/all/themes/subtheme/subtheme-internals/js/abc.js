/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function($, Drupal) {
  Drupal.behaviors.style = {
    attach: function (context, settings) {
      // some theming code
      //console.log('scrr scrr');
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
      $('#role-label').css('padding-top','10px');
      
      $('li.prev').css('margin-top', '20.5px');
      $('li.prev').css('position', 'absolute');
      $('li.prev').find('span').css('margin-top', '3px');
      $('li.prev').find('span').css('position', 'absolute');
      $('li.prev').find('a').css('border', '0');
      $('li.prev').css('margin-left', '-1000px');
      $('li.prev').find('a').css('max-height', '0.00000000001px');
      $('li.prev').find('a').css('max-width', '0.00000000001px');
      //$('li.prev').css('font-size', '6px');
      $('.prev').find('a').css('background-color', '#eee');


      $('li.next').css('margin-top', '20.5px');
      $('li.next').find('span').css('margin-top', '3px');
       $('li.next').find('span').css('position', 'absolute');
      $('li.next').css('position', 'absolute');
      $('li.next').find('a').css('border', '0');
      $('li.next').find('a').css('max-height', '0.00000000001px');
      $('li.next').find('a').css('max-width', '0.00000000001px');
      $('li.next').find('a').css('z-index', '10');
      $('li.next').css('margin-left', '-35px');  
     // $('li.next').css('font-size', '6px'); 
      $('.next').find('a').css('background-color', '#eee');
      // $(".ctools-modal-dialog modal-dialog").ready(function () { 
       
        var addTicketStartDateModal = $('.dashboard_add_new_task_form_submit_custom.ctools-use-modal-processed').find('.form-item-start-date');
        addTicketStartDateModal;
        var ticketStartDateLabel = addTicketStartDateModal.find('label');
        var ticketStartDatedescription = addTicketStartDateModal.find('.help-block');
        addTicketStartDateModal.parent().prepend(ticketStartDateLabel);
        addTicketStartDateModal.css('display','block');
        addTicketStartDateModal.parent().append(ticketStartDatedescription);
        ticketStartDatedescription.css('margin-top', '60px');
               
        var addTicketEndDateModal = $('.dashboard_add_new_task_form_submit_custom.ctools-use-modal-processed').find('.form-item-end-date');
        var dashTickModal = $('.dashboard_add_new_task_form_submit_custom.ctools-use-modal-processed').parent().parent();
        dashTickModal.css('max-width', '600px');
        dashTickModal.css('margin-left', '30%');
        var ticketEndDateLabel = addTicketEndDateModal.find('label');
        ticketEndDateLabel.css('margin-bottom', '25px');
        var ticketEndDatedescription = addTicketEndDateModal.find('.help-block');
        addTicketEndDateModal.parent().prepend(ticketEndDateLabel);
        addTicketEndDateModal.css('display','block');
        addTicketEndDateModal.parent().append(ticketEndDatedescription);
        ticketEndDatedescription.css('margin-top', '41px');
        
    
        
         var addTimesheetModal = $('.add_timesheet_custom.ctools-use-modal-processed').parent().parent();
        addTimesheetModal.css('max-width', '400px');
        //addTimesheetModal.css('margin-right', '25%');
        addTimesheetModal.css('margin-left', '35%');
        
        var addSkillModal = $('.add_skill_custom').parent().parent();
        addSkillModal.css('max-width', '400px');
        addSkillModal.css('margin-left', '35%');
        
        
        var addTeamMemberModal = $('form.add_skill_custom.ctools-use-modal-processed').parent().parent();
        addTeamMemberModal.css('max-width', '400px');
        addTeamMemberModal.css('margin-left', '35%');
        
        var DeleteTicketModal = $('.delete_task_custom').parent().parent();
        DeleteTicketModal.css('max-width', '600px');
        DeleteTicketModal.css('margin-left', '35%');
        
        var addTicketStartDateModal = $('.add_new_task_form_submit_custom.ctools-use-modal-processed').find('.form-item-start-date');
        addTicketStartDateModal;
        var ticketStartDateLabel = addTicketStartDateModal.find('label');
        var ticketStartDatedescription = addTicketStartDateModal.find('.help-block');
        addTicketStartDateModal.parent().prepend(ticketStartDateLabel);
        addTicketStartDateModal.css('display','block');
        addTicketStartDateModal.parent().append(ticketStartDatedescription);
        ticketStartDatedescription.css('margin-top', '60px');
        
        
        var addTicketEndDateModal = $('.add_new_task_form_submit_custom.ctools-use-modal-processed').find('.form-item-end-date');
        var dashTickModal = $('.add_new_task_form_submit_custom.ctools-use-modal-processed').parent().parent();
        dashTickModal.css('max-width', '600px');
        dashTickModal.css('margin-left', '30%');
        var ticketEndDateLabel = addTicketEndDateModal.find('label');
        ticketEndDateLabel.css('margin-bottom', '25px');
        var ticketEndDatedescription = addTicketEndDateModal.find('.help-block');
        addTicketEndDateModal.parent().prepend(ticketEndDateLabel);
        addTicketEndDateModal.css('display','block');
        addTicketEndDateModal.parent().append(ticketEndDatedescription);
        ticketEndDatedescription.css('margin-top', '41px');
        
      //});
     
    }
  };
}(jQuery, Drupal));