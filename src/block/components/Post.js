/**
 * Post Component.
 *
 * @param {string} postTitle - Current post title.
 * @param {function} clickHandler - this is the handling function for the add/remove function
 * @param {Integer} postId - Current post ID
 * @param icon
 * @returns {*} Post HTML.
 */
export const Post = ({ title: { rendered: postTitle } = {}, clickHandler, id: postId, icon, embedded }) => {
	let terms = false;
	
	if (embedded) {
		if (embedded['wp:term']) {
			if (embedded['wp:term'][0].length > 0) {
				terms = embedded['wp:term'][0].map((term) => {
					return(
						<div className="post-term">{term.name}</div>
					)
				});
			}
		}
	}

	return (
		<article className="post-item" onClick={() => clickHandler(postId)}>
			<div className="post-info">
				<h3 className="post-title" dangerouslySetInnerHTML={{__html: `${postTitle}`}}></h3>
				{terms && (
					<div className="post-terms">{terms}</div>
				)}
			</div>
			<button className="post-toggle">{icon}</button>
		</article>
	);
};
