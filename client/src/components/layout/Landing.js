import React from 'react'

const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large"> DevNexus</h1>
                    <p className="lead">
                    Craft your profile, showcase your projects, share insights, and join a supportive developer community.
                    </p>
                    <div className="buttons">
                        <a href="register.html" className="btn btn-primary">Sign Up</a>
                        <a href="login.html" className="btn btn-light">Login</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing
