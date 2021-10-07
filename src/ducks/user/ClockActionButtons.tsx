import React from 'react';
import {CLOCK_ACTION_CLOCK_IN, CLOCK_ACTION_CLOCK_OUT} from "../../constants";
import ClockIcon from "./ClockIcon";
import ClockOutIcon from "./ClockOutIcon";
import {useSelector} from "react-redux";
import {selectOverrideText, selectRequiresOverride} from "./index";

export interface ClockActionButtonsProps {
    actionType: string,
    onClockIn: () => void,
    onClockOut: () => void,
    onCancel: () => void,
}

const ClockActionButtons: React.FC<ClockActionButtonsProps> =
    ({
         actionType,
         onClockIn,
         onClockOut,
         onCancel
     }) => {
        const requiresOverride = useSelector(selectRequiresOverride);
        const overrideText = useSelector(selectOverrideText);


        return (
            <div className="tc__clock-action--buttons mt-3">
                {(!requiresOverride || (requiresOverride && actionType === CLOCK_ACTION_CLOCK_IN)) && (
                    <button type="button" className="btn btn-success btn-large"
                            onClick={onClockIn}>
                        {overrideText || 'Clock In'} <ClockIcon/>
                    </button>
                )}
                {(!requiresOverride || (requiresOverride && actionType === CLOCK_ACTION_CLOCK_OUT)) && (
                    <button type="button" className="btn btn-danger btn-large"
                            onClick={onClockOut}>
                        {overrideText || 'Clock Out'} <ClockOutIcon/>
                    </button>
                )}
                {requiresOverride && (
                    <button type="reset" className="btn btn-outline-secondary" onClick={onCancel}>
                        Cancel <span className="bi-x-circle-fill" />
                    </button>
                )}
            </div>
        );
    }

export default ClockActionButtons;
