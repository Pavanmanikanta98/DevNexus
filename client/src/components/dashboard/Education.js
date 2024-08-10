import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education,deleteEducation }) => {
    const edu = education.map(ed => (
        <tr key={ed._id} >

        <td>{ed.School}</td>
        <td className='hide-sm'>{ed.degree } </td>
        <td>
                <Moment format='YYYY/MM/DD'>{ed.from}</Moment> - {
                    ed.to===null?('NOW'):(<Moment format='YYYY/MM/DD'>{ed.to}</Moment> )
                }
            </td>
            <td>
                <button onClick={ ()=> deleteEducation(ed._id)} className='btn btn-danger'>
                    DELETE
                </button>
            </td>
            </tr>
    
    ));
    return (
        <div>
            <h2 className='my-2'>Education credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>school</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide=sm'> Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {edu}
                </tbody>
            </table>
        
        
        </div>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired
};

export default connect(null,{deleteEducation})(Education)
