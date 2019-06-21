import React, {Component} from 'react';
import { Post } from './Post';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

const Handle = SortableHandle(() => {
    return (
        <div className={'drag-handle'}>Drag</div>
    )
})

const SortableItem = SortableElement(({post, icon, action, index}) => {
    return (
        <div className={'drag-container'}>
            <Handle index={`handle-${index}`} />
            <Post key={post.id} {...post} index={`post-${index}`} clickHandler={action} icon={icon} embedded={post._embedded} />
        </div>
    );
});

const SortableList = SortableContainer(({posts, icon, action}) => {
    return (
      <div>
        {posts.map((post, index) => (
          <SortableItem useDragHandle={true} key={`post-${index}`} index={index} post={post} icon={icon} action={action} />
        ))}
      </div>
    );
});

/**
 * PostList Component
 * @param object props - Component props.
 * @returns {*}
 * @constructor
 */

class PostListSort extends Component {
    state = {
        posts: []
    }

    shiftArray(originalArray, to, from) {
        const movedItem = originalArray.find((item, index) => index === from);
        const remainingItems = originalArray.filter((item, index) => index !== from);
    
        const reorderedItems = [
            ...remainingItems.slice(0, to),
            movedItem,
            ...remainingItems.slice(to)
        ];
    
        return reorderedItems;
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.posts !== this.state.posts){
           this.setState({posts: nextProps.posts}) 
        }
    }

    handleSort = ({oldIndex, newIndex}) => {
        let action = this.props.sortAction;

        this.setState({posts: this.shiftArray(this.state.posts, oldIndex, newIndex)}, () => {
            action(this.state.posts);
        });
    }

    render() {
        if (this.props.loading) {
            return (
                <div className="post-list">
                    <div className={'post-item post-item--message'}>Loading posts...</div>
                </div>
            );
        }
    
        if (this.props.filtered && this.props.posts.length < 1) {
            return (
                <div className="post-list">
                    <div className={'post-item post-item--error'}>Your query yielded no results, please try again.</div>
                </div>
            );
        }
    
        if ( ! this.props.posts || this.props.posts.length < 1 ) {
            return (
                <div className="post-list">
                    <div className={'post-item post-item--none'}>No items selected. Add one from below.</div>
                </div>
            )
        }
    
        return (
            <div class="post-list">
                <SortableList pressDelay={200} posts={this.state.posts} icon={this.props.icon} action={this.props.action} onSortEnd={this.handleSort.bind(this)} />
            </div>
        );
    }
}

export default PostListSort;