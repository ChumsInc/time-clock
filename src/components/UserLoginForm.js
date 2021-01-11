import React from 'react';
import classNames from 'classnames';
import LoginInput from "./LoginInput";
import CountdownTimer from "./CountdownTimer";
import LogInIcon from "./LogInIcon";
import CancelIcon from "./CancelIcon";

const UserLoginForm = ({className = {}, timerOffset = 0, onLogin, onCancel}) => {
    const onSubmit = (ev) => {
        ev.preventDefault();
        if (onLogin) {
            onLogin();
        }
    }
    return (
        <form className={classNames(className)} onSubmit={onSubmit}>
            <LoginInput />
            {!!timerOffset && <CountdownTimer startOffset={timerOffset} onComplete={onCancel}  />}
            <div className="tc__login-container--buttons mt-3">
                <button type="submit" className="btn btn-large btn-primary">
                    Log In <LogInIcon />
                </button>
                <button type="reset" className="btn btn-large btn-secondary" onClick={onCancel}>
                    Cancel <CancelIcon />
                </button>
            </div>
        </form>
    );
};

export default UserLoginForm;
