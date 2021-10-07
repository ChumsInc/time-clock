import React, {ChangeEvent, RefObject, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames';
import CancelIcon from "./CancelIcon";
import {selectUserCode, selectUserLoading, setLoginCodeAction} from "./index";
import './LoginInput.scss';

export interface LoginInputProps {
    inputRef: RefObject<HTMLInputElement>,
}

const LoginInput: React.FC<LoginInputProps> = ({inputRef}) => {
    const dispatch = useDispatch();
    const code = useSelector(selectUserCode);
    const loading = useSelector(selectUserLoading);
    const [showCode, setShowCode] = useState(false);
    // const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef?.current?.focus();
    }, []);

    const onCancel = () => dispatch(setLoginCodeAction(''));
    const onChange = (ev: ChangeEvent<HTMLInputElement>) => dispatch(setLoginCodeAction(ev.target.value));


    const buttonClassNames = {
        'btn': true,
        'btn-outline-secondary': !showCode,
        'btn-secondary': showCode
    }
    return (
        <div className="input-group input-group-large login-input">
            <span className="input-group-text">Login</span>
            <input type={showCode ? 'text' : 'password'} className="form-control form-control-lg"
                   ref={inputRef}
                   value={code}
                   minLength={4}
                   required={true}
                   disabled={loading}
                   onChange={onChange}/>
            <button type="button" className={classNames(buttonClassNames)}
                    onMouseDown={() => setShowCode(true)} onTouchStart={() => setShowCode(true)}
                    onMouseUp={() => setShowCode(false)} onTouchCancel={() => setShowCode(false)}
                    onTouchEnd={() => setShowCode(false)}>
                <span className="bi-eye-fill" title="View Password"/>
            </button>
            <button type="button" className={classNames(buttonClassNames)} onClick={onCancel} disabled={loading}>
                <CancelIcon/>
            </button>
        </div>
    );
}

export default LoginInput;
