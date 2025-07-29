import {CLOCK_ACTION_CLOCK_IN, CLOCK_ACTION_CLOCK_OUT} from "@/app/constants";
import ClockIcon from "./ClockIcon";
import ClockOutIcon from "./ClockOutIcon";
import {useSelector} from "react-redux";
import {selectOverrideText, selectRequiresOverride} from "@/ducks/user";
import {Button} from "react-bootstrap";
import {ClockButtons} from "@/components/common/ClockButtons";


export interface ClockActionButtonsProps {
    actionType: string,
    onClockIn: () => void,
    onClockOut: () => void,
    onCancel: () => void,
}

const ClockActionButtons =
    ({
         actionType,
         onClockIn,
         onClockOut,
         onCancel
     }: ClockActionButtonsProps) => {
        const requiresOverride = useSelector(selectRequiresOverride);
        const overrideText = useSelector(selectOverrideText);


        return (
            <ClockButtons className="mt-3">
                {(!requiresOverride || (requiresOverride && actionType === CLOCK_ACTION_CLOCK_IN)) && (
                    <Button type="button" variant="success" onClick={onClockIn}>
                        <span>{overrideText ?? 'Clock In'}</span> <ClockIcon/>
                    </Button>
                )}
                {(!requiresOverride || (requiresOverride && actionType === CLOCK_ACTION_CLOCK_OUT)) && (
                    <Button type="button" variant="danger" onClick={onClockOut}>
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

export default ClockActionButtons;
