import React from 'react';
import classNames from 'classnames';
import LoginInput from "./LoginInput";
import CountdownTimer from "./CountdownTimer";

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
            <div className="tc__login-container--buttons mt-1">
                <button type="submit" className="btn btn-large btn-primary">
                    Log In <span className="material-icons">face</span>
                </button>
                <button type="reset" className="btn btn-large btn-secondary" onClick={onCancel}>
                    Cancel <span className="material-icons">clear</span>
                </button>
            </div>
        </form>
    );
};

export default UserLoginForm;
