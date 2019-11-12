<?php

/**
 * @file
 * Devel generate for the Phonefield module.
 */

/**
 * Implements hook_devel_generate().
 */
function phonefield_devel_generate($object, $field, $instance, $bundle) {
  if (field_behaviors_widget('multiple values', $instance) == FIELD_BEHAVIOR_CUSTOM) {
    return devel_generate_multiple('_phonefield_devel_generate', $object, $field, $instance, $bundle);
  }
  else {
    return _phonefield_devel_generate($object, $field, $instance, $bundle);
  }
}

/**
 * Callback for hook_devel_generate().
 */
function _phonefield_devel_generate($object, $field, $instance, $bundle) {
  $phonefield['linklabel'] = devel_create_greeking(1, TRUE);
  $pn = (string) mt_rand(111111111111, 999999999999);
  $pn[3] = $pn[7] = '-';
  $phonefield['phonenumber'] = $pn;
  return $phonefield;
}
