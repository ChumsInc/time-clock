import React from 'react';
import PropTypes from 'prop-types';
import Alert from "./Alert";
import {propTypes_ColorTypes} from "../myPropTypes";

const ActionTimeAlert = ({type, message, time}) => {
    return (
        <Alert type={type}>
            {message} at {new Date(time * 1000).toLocaleString()}
        </Alert>
    );
};

ActionTimeAlert.propTypes = {
    type: PropTypes.oneOf([...propTypes_ColorTypes]),
    message: PropTypes.string,
    time: PropTypes.number.isRequired,
};

export default ActionTimeAlert;
