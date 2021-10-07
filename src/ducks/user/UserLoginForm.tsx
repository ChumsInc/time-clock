import React, {FormEvent, useEffect, useRef} from 'react';
import classNames from 'classnames';
import LoginInput from "./LoginInput";
import CountdownTimer from "./CountdownTimer";
import LogInIcon from "./LogInIcon";
import CancelIcon from "./CancelIcon";

export interface UserLoginFormProps {
    className?: string,
    timerOffset?: number,
    onLogin: () => void,
    onCancel: () => void,
}

const UserLoginForm: React.FC<UserLoginFormProps> = ({
                                                         className = '',
                                                         timerOffset = 0,
                                                         onLogin,
                                                         onCancel
                                                     }) => {
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
            <LoginInput inputRef={inputRef}/>
            {!!timerOffset && <CountdownTimer startOffset={timerOffset} onComplete={onCancel}/>}
            <div className="tc__login-container--buttons mt-3">
                <button type="submit" className="btn btn-large btn-primary">
                    Log In <LogInIcon/>
                </button>
                <button type="reset" className="btn btn-large btn-secondary" onClick={onCancel}>
                    Cancel <CancelIcon/>
                </button>
            </div>
        </form>
    );
};

export default UserLoginForm;
