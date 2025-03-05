import React, {FormEvent, useEffect, useRef} from 'react';
import classNames from 'classnames';
import LoginInput from "../common/LoginInput";
import CountdownTimer from "../common/CountdownTimer";
import LogInIcon from "./LogInIcon";
import CancelIcon from "../common/CancelIcon";
import styled from "@emotion/styled";
import {Button} from "react-bootstrap";
import {ClockButtons} from "@/components/common/ClockButtons";


export interface UserLoginFormProps {
    className?: string,
    timerOffset?: number,
    onLogin: () => void,
    onCancel: () => void,
}

const UserLoginForm = ({
                           className = '',
                           timerOffset = 0,
                           onLogin,
                           onCancel
                       }: UserLoginFormProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const onSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        onLogin();
    }

    return (
        <form className={classNames(className)} onSubmit={onSubmit}>
            <LoginInput ref={inputRef}/>
            {!!timerOffset && <CountdownTimer startOffset={timerOffset} onComplete={onCancel}/>}
            <ClockButtons className="mt-3">
                <Button type="submit" variant="primary" size="lg">
                    <span>Log In</span>
                    <LogInIcon/>
                </Button>
                <Button type="reset" variant="secondary" size="lg" onClick={onCancel}>
                    <span>Cancel</span>
                    <CancelIcon/>
                </Button>
            </ClockButtons>
        </form>
    );
};

export default UserLoginForm;
