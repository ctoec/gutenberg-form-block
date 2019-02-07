<?php
/**
 * Plugin Name: Guten Forms List
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: A plugin to add forms to a list
 * Author: matthewcrist
 * Author URI: https://govbloom.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
