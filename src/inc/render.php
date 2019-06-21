<?php

/**
 * Render the post list block, calls a filter to render actual html.
 *
 * @param array $attributes - an array of attributes from the block.
 * @return string
 */
function bb_render_post_list_block( $attributes ) {
	$block_title    = isset( $attributes['blockTitle'] ) ? $attributes['blockTitle'] : false;
	$selected_posts = isset( $attributes['selectedPosts'] ) ? $attributes['selectedPosts'] : false;

	$object_query = new WP_Query([
		'post__in'  => $selected_posts,
		'post_type' => 'forms-documents',
		'orderby'  => 'post__in',
		'posts_per_page' => -1
	]);

	return apply_filters( 'gutenberg_post_list_render_filter', $object_query, $block_title );
}

/**
 * Returns the HTML for the post list from the query provided.
 *
 * @param WP_Query $query - Post query of the selected posts.
 * @param string $title - The block title.
 * @return mixed|null
 */
function render_guten_post_list_filter( $query, $title ) {
	if ( ! $query->have_posts() ) {
		return null;
	}

	ob_start();
		
	?>
	<ul class="block-form-list">
	<?php

	while( $query->have_posts() ):
		$query->the_post();

		$id = get_the_ID();

		$meta = get_post_meta($id);
		
		if (array_key_exists('pdf_file', $meta)) {
			$link = wp_get_attachment_url($meta['pdf_file'][0]);
		} else {
			$link = $meta['pdf_url'][0];
		}
	?>
		<li class="block-form-list-item">
			<article class="block-form">
				<a href="<?php print $link ?>" class="block-form-link">
					<div class="block-form-title"><?php the_title(); ?></div>
					<?php if (array_key_exists('pdf_subtitle', $meta)) { ?>
						<div class="block-form-subtitle"><?php print $meta['pdf_subtitle'][0]; ?></div>
					<?php } ?>
				</a>
			</article>
		</li>
	<?php
	endwhile;
	?>
	</ul>
	<?php
	return ob_get_clean();
}
