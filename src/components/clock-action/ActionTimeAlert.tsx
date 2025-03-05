import React from 'react';
import {Alert, AlertProps} from "react-bootstrap";

export interface ActionTimeAlertProps extends AlertProps {
    message: string,
    time: number,
}
const ActionTimeAlert = ({variant, message, time, ...alertProps}:ActionTimeAlertProps) => {
    return (
        <Alert variant={variant ?? 'warning'} {...alertProps}>
            {message} at {new Date(time * 1000).toLocaleString()}
        </Alert>
    );
};

export default ActionTimeAlert;
