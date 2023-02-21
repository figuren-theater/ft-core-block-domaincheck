<?php
namespace Figuren_Theater\Network\Blocks;

/**
 * Plugin Name:     f.t | CORE Block "Domaincheck"
 * Description:     Formular zur Abfrage der Verfügbarkeit einer bestimmten Subdomain unterhalb von figuren.theater und puppen.theater
 * Version:         0.1.1
 * Author:          Carsten Bach
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     ft-core-block-domaincheck
 *
 * @package         Figuren_Theater
 */

/**
 * CONCEPT: using <Innerblocks> - magic !!!
 * @see https://jbaker.media/blog/using-wordpress-gutenbergs-innerblocks-component/
 */


/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function figurentheater_ft_core_block_domaincheck_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "figurentheater/ft-core-block-domaincheck" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	\wp_register_script(
		'figurentheater-ft-core-block-domaincheck-block-editor',
		\plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	\wp_set_script_translations( 'figurentheater-ft-core-block-domaincheck-block-editor', 'ft-core-block-domaincheck' );

	#$editor_css = 'build/index.css';
	#\wp_register_style(
	#	'figurentheater-ft-core-block-domaincheck-block-editor',
	#	\plugins_url( $editor_css, __FILE__ ),
	#	array('wp-block-post-comments'),
	#	filemtime( "$dir/$editor_css" )
	#);

	// 
	$style_css = 'build/style-index.css';
	\wp_register_style(
		'figurentheater-ft-core-block-domaincheck-block',
		\plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	\register_block_type(
		'figurentheater/ft-core-block-domaincheck',
		array(
			'editor_script' => 'figurentheater-ft-core-block-domaincheck-block-editor',
			// 'editor_style'  => 'figurentheater-ft-core-block-domaincheck-block-editor',
			'style'         => 'figurentheater-ft-core-block-domaincheck-block',
			'view_script'   => 'figurentheater-ft-core-block-domaincheck-block',
		)
	);


	##	$max_suggested_domain_length = 63;
	##	$ft_chars_count = strlen( 'figuren.theater' );
	##	$chars_left = $max_suggested_domain_length - $ft_chars_count;
	###do_action( 'qm/debug', $ft_chars_count );
	##
	##
	##	$domain_name_regex_incl_tld = "^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}$";
	###	$domain_name_regex          = "^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)$";
	##	$domain_name_regex          = sprintf( "((?!-)[A-Za-z0-9-\\.]{1,%s}(?<!-))", $chars_left );
	/**
	 * Above pattern makes sure domain name matches the following criteria :

		The domain name should be a-z | A-Z | 0-9 and hyphen(-)
		The domain name should between 1 and 63 characters long
		Last Tld must be at least two characters, and a maximum of 6 characters
		The domain name should not start or end with hyphen (-) (e.g. -google.com or google-.com)
		The domain name can be a subdomain (e.g. mkyong.blogspot.com)
	 */


	$domain_name_regex          = '(.*)';
	#do_action( 'qm/debug', $domain_name_regex );

	/**
	 * Creates a new route
	 * /figuren.theater/ajax-api/domain-request/xyz
	 *
	 * and sends all calls to our callback
	 * check_domain_request( xyz )
	 *
	 */
	try {

		new \Figuren_Theater\inc\ajax_api(
			'domain_request',
			$domain_name_regex,
			__NAMESPACE__.'\\check_domain_request'
		);

	} catch (Exception $e) {
		\do_action( 'qm/error', $e );
	}



}
\add_action( 'init', __NAMESPACE__.'\\figurentheater_ft_core_block_domaincheck_block_init', 9 ); // important because the called ajax_api runs on init 10 (default)


/**
 * Enqueue frontend and editor JavaScript and CSS
 */
function figurentheater_ft_core_block_domaincheck_block__frontend_scripts() {

	if (\is_admin())
		return;

#	if (is_singular() && !has_block( 'figurentheater/ft-core-block-domaincheck' ) )
#		return;

#  PROBLEMATIC within template-parts, not properly loading
#	if (!some_posts_have_block( 'figurentheater/ft-core-block-domaincheck' ))
#		return;

	// todo
	// add check for is_archive()
	// @see: https://richtabor.com/has-blocks-gutenberg-scripts/
	// @see: https://github.com/WordPress/gutenberg/issues/14758

	$dir = __DIR__;

	$script_asset_path = "$dir/frontend/frontend.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "figurentheater/ft-core-block-domaincheck" block first.'
		);
	}

	// Enqueue block editor JS
	$frontend_js     = 'frontend/frontend.js#deferload';
	$script_asset = require( $script_asset_path );
	// \wp_enqueue_script(
	\wp_register_script(
		// 'figurentheater-ft-core-block-domaincheck-block-action',
		'figurentheater-ft-core-block-domaincheck-block',
		\plugins_url( $frontend_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version'],  #        filemtime( plugin_dir_path( __FILE__ ) . $frontend_js )
		true
	);

}

// Hook the enqueue functions into the frontend and editor
\add_action( 'enqueue_block_assets', __NAMESPACE__.'\\figurentheater_ft_core_block_domaincheck_block__frontend_scripts' );



/**
 * Helper to check against block name
 *
 * @see https://github.com/Automattic/block-experiments/blob/master/blocks/motion-background/index.php#L13
 */
// https://github.com/WordPress/gutenberg/issues/14758#issuecomment-478912504
function some_posts_have_block( $block_type ) {
	global $wp_the_query;
	foreach ( $wp_the_query->posts as $post ) {
		if ( \has_block( $block_type, $post ) ) {
			return TRUE;
		}
	}
	return FALSE;
}






/**
 * Answers if the given name is available as a subdomain
 * of figuren.theater or puppen.theater
 *
 * @todo Add caching
 * @todo  reduce answered JSON to needed, for security
 *
 * @param  string $domain_request requested domain-name
 * @return JSON                 [description]
 */
function check_domain_request( $domain_request ) {

	$data = validate_domain_request( $domain_request );

	\wp_send_json_success( $data, 200 );

	// use FT_query->use_cache
}

function validate_domain_request( $domain_request ) {
	// remove '.figuren.theater'
	// and '.puppen.theater'
	// in case somebody enter this also



	// umlauts
	// remove_accents()

	$data = new \stdClass;
	$data->domain_request = \sanitize_text_field( $domain_request );
	$data->validated = [];
	/**
	 * Because \wpmu_validate_blog_signup() acts on the global $domain,
	 * we need to make sure we start our journey on root.
	 */
	global $domain;
	$original_domain = $domain;
	$tld = ('local' === WP_ENVIRONMENT_TYPE) ? 'test' : 'theater';
	// so we set this temporary, as a light version of switch_to_blog()
	$domain = 'figuren.'.$tld;
		/**
		 * @see wp-includes\ms-functions.php
		 * @see https://developer.wordpress.org/reference/hooks/wpmu_validate_blog_signup/
		 * @var [type]
		 */

		// $data->validated[] = \wpmu_validate_blog_signup( $domain_request, 'some-pseudo-title-nobody-would-ever-use' );
		$data->validated[] = \wpmu_validate_blog_signup( $domain_request, $domain_request );

		// if we already have errors
		if (
			isset($data->validated[0]['errors'])
			&&
			property_exists($data->validated[0]['errors'], 'errors')
			&&
			!empty($data->validated[0]['errors']->errors)
#			&&
#			!empty($data->validated[0]['errors']->errors['blogname'])
		) {
			// unset trick and ...
			$domain = $original_domain;
			// ... return earlier
			// \wp_send_json_success( $data, 200 );
			return $data;
		}

	// so we set this temporary, as a light version of switch_to_blog()
	$domain = 'puppen.'.$tld;
		/**
		 * @see wp-includes\ms-functions.php
		 * @see https://developer.wordpress.org/reference/hooks/wpmu_validate_blog_signup/
		 * @var [type]
		 */

		$data->validated[] = \wpmu_validate_blog_signup( $domain_request, $domain_request );

	// unset trick
	$domain = $original_domain;

	return $data;

}

