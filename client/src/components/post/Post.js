import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';

import { getPost } from '../../actions/post';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading } }) => {
    const { id } = useParams();
    //console.log(id);
    useEffect(() => {
        getPost(id);
    }, [getPost, id]);
   // console.log(post._id);

    return (
        
        loading || post === null ? (
            <Spinner />
        ) : (
                
            <Fragment>
                <Link to={'/posts'} className='btn'>
                    Back To Posts
                </Link>
        
                    <PostItem post={post} showAction={false}></PostItem>
                    <CommentForm postId={post._id} />
                    <div className='comments'>
                    
                        {/* console.log(post.Comments); */}
                        {post.Comments.map((comment)=> 
                            (
                            <CommentItem key={comment._id} comment={comment} postId={post._id} />
                        )  )}
                    </div>
            </Fragment>)
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post:state.post
});

export default connect(mapStateToProps, { getPost })(Post);