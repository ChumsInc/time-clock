import React from 'react';
import Alert, {AlertProps} from "@mui/material/Alert";

export interface ActionTimeAlertProps extends AlertProps {
    message: string,
    time: number,
}
const ActionTimeAlert = ({severity, message, time, ...rest}:ActionTimeAlertProps) => {
    return (
        <Alert severity={severity} {...rest}>
            {message} at {new Date(time * 1000).toLocaleString()}
        </Alert>
    );
};

export default ActionTimeAlert;
