import {type FormEvent, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import CurrentDateTime from "../common/CurrentDateTime";
import LoginInput from "../common/LoginInput";
import {CLOCK_ACTION_CLOCK_IN, CLOCK_ACTION_CLOCK_OUT} from "@/app/constants";
import ClockActionButtons from "./ClockActionButtons";
import CountdownTimer from "../common/CountdownTimer";
import EmployeeName from "../common/EmployeeName";
import {clearUser, selectEntryAlert, selectRequiresOverride, selectUserCode, selectUserEntry} from "@/ducks/user";
import BlockButton from "../BlockButton";
import {clockAction} from "@/ducks/user/actions";
import {useAppDispatch} from "@/app/configureStore";


const ClockActionPage = () => {
    const dispatch = useAppDispatch();
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
        dispatch(clockAction({code, action: CLOCK_ACTION_CLOCK_IN, override: requiresOverride}));
    }
    const onClockOut = () => {
        if (!code) {
            inputRef.current?.focus();
            return;
        }
        setCurrentAction(CLOCK_ACTION_CLOCK_OUT);
        dispatch(clockAction({code, action: CLOCK_ACTION_CLOCK_OUT, override: requiresOverride}));
    }
    const onCancel = () => {
        setCurrentAction('');
        dispatch(clearUser());
    }

    const submitHandler = (ev:FormEvent) => {
        ev.preventDefault();
    }

    return (
        <form autoComplete="off" onSubmit={submitHandler}>
            <CurrentDateTime/>
            <hr/>
            {!entry && (
                <LoginInput ref={inputRef}/>
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
                <>
                    <CountdownTimer startOffset={2000} rate={300} onComplete={onCancel}/>
                    <BlockButton color="primary" type="button" onClick={onCancel}>
                        Done
                    </BlockButton>
                </>
            )}
            {requiresOverride && (
                <>
                    <CountdownTimer startOffset={5000} rate={300} onComplete={onCancel}/>
                </>
            )}
        </form>
        // b%e@Q!x*vT#RJK@RTt$6ho9B
    );
}

export default ClockActionPage;
