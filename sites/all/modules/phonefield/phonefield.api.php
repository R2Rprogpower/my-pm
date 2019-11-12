<?php

/**
 * @file
 * Hooks for phonefield module.
 */

/**
 * Report if browser supports the tel: protocol.
 *
 * @return bool
 *   TRUE if device supports tel: protocol, otherwise FALSE.
 */
function hook_phonefield_supports_tel() {
  return FALSE;
}
