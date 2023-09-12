import React from 'react';
import { Link } from 'react-router-dom';


const DashboardAction = () => {
    return (
        <div class="dash-buttons">
            <Link to="/editProfile" class="btn btn-light">
                <i class="fas fa-user-circle text-primary"></i> Edit Profile</Link>
            <Link to="/addExperience" class="btn btn-light">
                <i class="fab fa-black-tie text-primary"></i> Add Experience</Link>
            <Link to="/addEducation" class="btn btn-light">
                <i class="fas fa-graduation-cap text-primary"></i> Add Education</Link>
    </div>
    )
}

export default DashboardAction
