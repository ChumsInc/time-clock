import React from 'react';
import {Alert, BootstrapColor} from "chums-ducks";

export interface ActionTimeAlertProps {
    color: BootstrapColor,
    message: string,
    time: number,
}
const ActionTimeAlert:React.FC<ActionTimeAlertProps> = ({color, message, time}) => {
    return (
        <Alert color={color}>
            {message} at {new Date(time * 1000).toLocaleString()}
        </Alert>
    );
};

export default ActionTimeAlert;
