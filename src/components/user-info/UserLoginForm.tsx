import {type FormEvent, useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import LoginInput from "../common/LoginInput";
import CountdownTimer from "../common/CountdownTimer";
import LogInIcon from "./LogInIcon";
import CancelIcon from "../common/CancelIcon";
import {Button} from "react-bootstrap";
import {ClockButtons} from "@/components/common/ClockButtons";


export interface UserLoginFormProps {
    className?: string,
    timerOffset?: number,
    onLogin: (code:string) => void,
    onCancel: () => void,
}

export default function UserLoginForm({
                                          className = '',
                                          timerOffset = 0,
                                          onLogin,
                                          onCancel
                                      }: UserLoginFormProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [code, setCode] = useState<string>('');

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const onSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        onLogin(code);
    }

    return (
        <form className={classNames(className)} onSubmit={onSubmit}>
            <LoginInput ref={inputRef} value={code} onChange={setCode}
                        inputProps={{required: true}}/>
            {timerOffset > 0 && <CountdownTimer startDelay={timerOffset} onComplete={onCancel}/>}
            <ClockButtons className="mt-3">
                <Button type="submit" variant="primary">
                    <span>Log In</span>
                    <LogInIcon/>
                </Button>
                <Button type="reset" variant="secondary" onClick={onCancel}>
                    <span>Cancel</span>
                    <CancelIcon/>
                </Button>
            </ClockButtons>
        </form>
    );
}
