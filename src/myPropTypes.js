import PropTypes from "prop-types";

export const propTypes_Time = {
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    showSeconds: PropTypes.bool,
    showIncrement: PropTypes.bool,
};

export const defaultProps_Time = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    showSeconds: false,
    showIncrement: false,
};

export const propTypes_ColorTypes = ['primary', 'success', 'info', 'secondary', 'danger', 'error', 'warning', 'light', 'dark'];

export const propTypes_Alert = {
    id: PropTypes.number,
    type: PropTypes.oneOf([...propTypes_ColorTypes]),
    title: PropTypes.string,
    message: PropTypes.string,
    count: PropTypes.number,
    onDismiss: PropTypes.func,
};

export const defaultProps_Alert = {
    id: 0,
    type: 'info',
    title: '',
    message: '',
    count: 1,
};
