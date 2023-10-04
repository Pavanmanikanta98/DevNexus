import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { setAlert } from '../../actions/alert';

const PostForm = ({ addPost }) => {
    const [text, setText] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        //if block which is a good practice for user-friendly form validation,anyways setAlert function  won't be invoked
        // because of the browser's built-in validation will prevent the form from being submitted
        if (text.trim() === '') {
            setAlert('Please enter a post before submitting.');
        } else {
            addPost({ text });
            setText('');
        }
    };

    return (
        <div className='post-form'>
            <div id='div-p' className='bg-primary p'>
                <h3>Create a Post...</h3>
            </div>
            <form
                className='form my-1'
                onSubmit={onSubmit}>
                <textarea
                    name='text'
                    cols='32'
                    rows='7'
                    placeholder='Share your thoughts...'
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                />
                <input type='submit' className='btn btn-dark my-1' value='Submit' />
            </form>
        </div>
    );
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);