import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
//import { addLike, removeLike, deletePost } from '../../actions/post';
import Moment from 'react-moment';

const PostItem = ({

    auth,
    post: { _id, Text, name, avatar, user, likes, Comments, date }
}) => (
    <div className="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${user}`}>
                <img className="round-img" src={avatar} alt="" />
                <h4>{name}</h4>
            </Link>
        </div>
        <div>
            <p className="my-1">{Text}</p>
            <p className="post-date">Posted on <Moment format='YYYY/MM/DD'>{date}</Moment></p>

            <button
                // onClick={() => addLike(_id)}
                type="button"
                className="btn btn-light">
                <i className="fas fa-thumbs-up" />{' '}
                <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
                // onClick={() => removeLike(_id)}
                type="button"
                className="btn btn-light">
                <i className="fas fa-thumbs-down" />
            </button>
        
            <Link to={`/posts/${_id}`} className="btn btn-primary">
                Discussion{' '}
                {Comments.length > 0 && (
                    <span className="comment-count">{Comments.length}</span>
                )}
            </Link>
        
        </div>
    </div>
);

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(
    PostItem
);