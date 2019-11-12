<?php

 $plugin = array(
   'single' => TRUE,
   'title' => t('block plugin'),
   'description' => t('enables you to add any amount of nodes to a block'),
   'category' => t('custom blocks'),
   //'edit form' => 'block_plugin_get_nodes_edit_form',
   'render callback' => 'block_plugin_get_nodes_render',
   'admin info' => 'block_plugin_get_nodes_admin_info',
  'defaults' => array(
    'node_type' => 'article',
     'node_amount' => 3,
 )
 );
 
 function block_plugin_get_nodes_admin_info($subtype, $conf, $contexts) {
   if (!empty($conf)) {
     $block = new stdClass;
     $block->title = $conf['override_title'] ? $conf['override_title_text'] : '';
     $block->content = t('showing many different nodes of a type.');
     return $block;
   }
 }
 
 // allow to pick nodes of a type
 function block_plugin_get_nodes_edit_form($form, &$form_state) {
    $conf = $form_state['conf'];
   
    $node_type = "article"; // can find this on the node type's "edit" screen in the Drupal admin section.

    $result = db_query("SELECT nid, title FROM node WHERE type = :type", [':type' => $node_type])->fetchAll();

    $nids = [''];
    while ($result) {
        $nids[$result->nid] = $result->title;
    }
  //  как получить node_type зная node id
   
//   $form['node_type'] = array(
//        '#type' => 'select',
//        '#title' => t('Selected'),
//        '#required' => TRUE,
//        '#options' => array(
//         0 => t('Node_type_id 1 '),
//         1 => t('Yes'),
//       
//       )
//    );
   
      $form['nids'] = array(
       '#type' => 'select',
       '#title' => t('Selected'),
       '#required' => TRUE,
       '#options' => $nids,
       '#default_value' => $conf['nids'] ?? 0,
          
   );
   return $form;
    
 } 
 /**
  * The submit form stores the data in $conf.
  */
 function block_plugin_get_nodes_edit_form_submit($form, &$form_state) {
   foreach (array_keys($form_state['plugin']['defaults']) as $key) {
     if (isset($form_state['values'][$key])) {
       $form_state['conf'][$key] = $form_state['values'][$key];
     }
   }
 }
 //block_plugin_get_nodes_render
  function block_plugin_get_nodes_edit_form_render($subtype, $conf, $panel_args, $context) {
   var_dump($conf);
  }