import React, { Fragment,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { Link, useNavigate } from 'react-router-dom';
const AddEducation = ({addEducation}) => {
    const history = useNavigate();
    const [formData, setFormDate] = useState({
        School: '',
        fieldofstudy: '',
        degree: '',
        from: '',
        to: '',
        current: false,
        description: ''
        
    });
    const [toDateDisabled, toggleDisabled] = useState(false);
    const { School, fieldofstudy, from, degree, to, current, description } = formData;
    const onChange = e => setFormDate({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        addEducation(formData, history);
    };
    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Please add any Schools or Bootcamps that you have attended.
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e=> onSubmit(e)} >
                <div className="form-group">
                    <input type="text" placeholder="* school or bootcamp" name="School" value={School} onChange={e=> onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Degree or certificate" name="degree" value={degree} onChange={e=> onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field of study" name="fieldofstudy" value={fieldofstudy} onChange={e=>onChange(e)} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e=>onChange(e)} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                        setFormDate({ ...formData, current: !current });
                        toggleDisabled(!toDateDisabled);
                    }}/> {'  '}  Currently Enrolled</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled?'disabled':''} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description} onChange={e=>onChange(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
};

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(AddEducation);
