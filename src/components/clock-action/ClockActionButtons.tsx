import {CLOCK_ACTION_CLOCK_IN, CLOCK_ACTION_CLOCK_OUT} from "@/app/constants";
import ClockIcon from "./ClockIcon";
import ClockOutIcon from "./ClockOutIcon";
import {useSelector} from "react-redux";
import {selectOverrideText, selectRequiresOverride} from "@/ducks/user";
import {Button} from "react-bootstrap";
import {ClockButtons} from "@/components/common/ClockButtons";
import {useState} from "react";


export interface ClockActionButtonsProps {
    onClockIn: () => void,
    onClockOut: () => void,
    onCancel: () => void,
}

export default function ClockActionButtons({onClockIn, onClockOut, onCancel}: ClockActionButtonsProps) {
    const [actionType, setActionType] = useState<string>(CLOCK_ACTION_CLOCK_IN);
    const requiresOverride = useSelector(selectRequiresOverride);
    const overrideText = useSelector(selectOverrideText);

    const clockInHandler = () => {
        setActionType(CLOCK_ACTION_CLOCK_IN);
        onClockIn();
    }

    const clockOutHandler = () => {
        setActionType(CLOCK_ACTION_CLOCK_OUT);
        onClockOut();
    }


    return (
        <ClockButtons className="mt-3">
            {(!requiresOverride || (requiresOverride && actionType === CLOCK_ACTION_CLOCK_IN)) && (
                <Button type="button" variant="success" onClick={clockInHandler}>
                    <span>{overrideText ?? 'Clock In'}</span> <ClockIcon/>
                </Button>
            )}
            {(!requiresOverride || (requiresOverride && actionType === CLOCK_ACTION_CLOCK_OUT)) && (
                <Button type="button" variant="danger" onClick={clockOutHandler}>
                    <span>{overrideText ?? 'Clock Out'}</span> <ClockOutIcon/>
                </Button>
            )}
            {requiresOverride && (
                <Button type="reset" variant="outline-secondary" onClick={onCancel}>
                    <span>Cancel</span> <span className="bi-x-circle-fill"/>
                </Button>
            )}
        </ClockButtons>
    );
}
