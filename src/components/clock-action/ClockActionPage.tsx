import {type FormEvent, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import CurrentDateTime from "../common/CurrentDateTime";
import LoginInput from "../common/LoginInput";
import {CLOCK_ACTION_CLOCK_IN, CLOCK_ACTION_CLOCK_OUT} from "@/app/constants";
import ClockActionButtons from "./ClockActionButtons";
import CountdownTimer from "../common/CountdownTimer";
import EmployeeName from "../common/EmployeeName";
import {clearUser, selectEntryAlert, selectRequiresOverride, selectUserEntry} from "@/ducks/user";
import BlockButton from "../BlockButton";
import {clockAction} from "@/ducks/user/actions";
import {useAppDispatch} from "@/app/configureStore";


export default function ClockActionPage() {
    const dispatch = useAppDispatch();
    const [code, setCode] = useState<string>('');
    const entry = useSelector(selectUserEntry);
    const entryAlert = useSelector(selectEntryAlert);
    const requiresOverride = useSelector(selectRequiresOverride);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(clearUser());
        inputRef.current?.focus();
    }, [dispatch, inputRef])


    const onClockIn = () => {
        if (!code) {
            inputRef.current?.focus();
            return;
        }
        dispatch(clockAction({code, action: CLOCK_ACTION_CLOCK_IN, override: requiresOverride}));
    }
    const onClockOut = () => {
        if (!code) {
            inputRef.current?.focus();
            return;
        }
        dispatch(clockAction({code, action: CLOCK_ACTION_CLOCK_OUT, override: requiresOverride}));
    }
    const onCancel = () => {
        setCode('')
        dispatch(clearUser());
    }

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
    }

    return (
        <form autoComplete="off" onSubmit={submitHandler}>
            <CurrentDateTime/>
            <hr/>
            {!entry && (
                <LoginInput ref={inputRef} value={code} onChange={setCode}
                            inputProps={{required: true}}/>
            )}
            <EmployeeName/>
            {!!entryAlert && (
                <div className="my-1" dangerouslySetInnerHTML={{__html: entryAlert}}/>
            )}
            {(!entry?.id || requiresOverride) && (
                <ClockActionButtons key={code}
                                    onClockOut={onClockOut}
                                    onClockIn={onClockIn}
                                    onCancel={onCancel}/>
            )}
            {!requiresOverride && entry && (
                <>
                    <CountdownTimer startDelay={2000} rate={300} onComplete={onCancel}/>
                    <BlockButton color="primary" type="button" onClick={onCancel}>
                        Done
                    </BlockButton>
                </>
            )}
            {requiresOverride && (
                <CountdownTimer startDelay={5000} rate={300} onComplete={onCancel}/>
            )}
        </form>
    );
}
