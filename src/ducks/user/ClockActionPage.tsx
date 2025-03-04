import React, {FormEvent, Fragment, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CurrentDateTime from "./CurrentDateTime";
import LoginInput from "./LoginInput";
import {CLOCK_ACTION_CLOCK_IN, CLOCK_ACTION_CLOCK_OUT} from "../../constants";
import ClockActionButtons from "./ClockActionButtons";
import CountdownTimer from "./CountdownTimer";
import EmployeeName from "./EmployeeName";
import ActionTimeAlert from "./ActionTimeAlert";
import {
    selectEntryAlert,
    selectRequiresOverride, selectUserActionStatus,
    selectUserCode,
    selectUserEntry
} from "./selectors";
import './clock-action-page.scss';
import './info-container.scss';
import BlockButton from "../../components/BlockButton";
import {useAppDispatch} from "../../app/configureStore";
import {clearUser, performClockAction} from "./actions";

const ClockActionPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const actionStatus = useSelector(selectUserActionStatus);
    const code = useSelector(selectUserCode);
    const entry = useSelector(selectUserEntry);
    const entryAlert = useSelector(selectEntryAlert);
    const requiresOverride = useSelector(selectRequiresOverride);
    const [currentAction, setCurrentAction] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(clearUser());
        inputRef.current?.focus();
    }, [])

    useEffect(() => {
        if (entry?.id && !requiresOverride) {
            setCurrentAction('');
        }
    }, [entry?.id, requiresOverride])

    const onClockIn = () => {
        if (!code) {
            inputRef.current?.focus();
            return;
        }
        setCurrentAction(CLOCK_ACTION_CLOCK_IN);

        dispatch(performClockAction({action: 'clock-in', code, userOverride: false}));
    }
    const onClockOut = () => {
        if (!code) {
            inputRef.current?.focus();
            return;
        }
        setCurrentAction(CLOCK_ACTION_CLOCK_OUT);
        dispatch(performClockAction(CLOCK_ACTION_CLOCK_OUT, requiresOverride));
    }
    const onCancel = () => {
        setCurrentAction('');
        dispatch(clearUser());
    }

    const onSubmitDoNothing = (ev: FormEvent) => ev.preventDefault();

    return (
        <form className="tc__clock-action" onSubmit={onSubmitDoNothing}>
            <CurrentDateTime/>
            <hr/>
            {!entry && (
                <LoginInput inputRef={inputRef}/>
            )}
            <EmployeeName/>
            {(!entry?.id || requiresOverride) && (
                <ClockActionButtons onClockOut={onClockOut}
                                    onClockIn={onClockIn}
                                    onCancel={onCancel}
                                    actionType={currentAction}/>
            )}
            {!!entryAlert && (
                <div className="my-1" dangerouslySetInnerHTML={{__html: entryAlert}}/>
            )}
            {!requiresOverride && entry && (
                <Fragment>
                    {entry.isClockedIn && (
                        <ActionTimeAlert time={entry.clockInTime} message="You clocked in" severity="success"/>
                    )}
                    {!entry.isClockedIn && !!entry.clockOutTime && (
                        <ActionTimeAlert time={entry.clockOutTime} message="You clocked out" severity="success"/>
                    )}
                    <CountdownTimer startOffset={2000} rate={300} onComplete={onCancel}/>
                    <BlockButton color="primary" type="button" onClick={onCancel}>
                        Done
                    </BlockButton>
                </Fragment>
            )}
            {requiresOverride && (
                <Fragment>
                    <CountdownTimer startOffset={5000} rate={300} onComplete={onCancel}/>
                </Fragment>
            )}
        </form>
    );
}

export default ClockActionPage;
