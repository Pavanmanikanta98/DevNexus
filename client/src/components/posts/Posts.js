import React, { Fragment,useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner'; 
import PostItem from './PostItem';
import PostForm from './PostForm';
//import { SchemaTypeOptions } from 'mongoose';


const Posts = ({ getPosts, post: { loading, posts } }) => {
    //console.log(post);
    useEffect(() => {
        getPosts();
    }, [getPosts]);
    return (
        <div className="container">
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user" />
                Welcome to the community
            </p>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    
                    <div className="posts">
                        {posts.map((post) => (
                            <PostItem key={post._id} post={post} />
                        ))}
                    </div>
                    <PostForm />    
                </Fragment>
            )}
        </div>
    )
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps,{getPosts}) (Posts)