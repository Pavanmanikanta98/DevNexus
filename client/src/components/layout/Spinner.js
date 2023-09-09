import React, { Fragment } from "react";
import spinner from './spinner.gif';


const Spinner = () => (
    <Fragment>
        <img
            src={spinner}
            style={{ width: '450px', margin: 'auto', display: 'block' }}
            alt="loading..."
        />
    </Fragment>
);
export default Spinner;