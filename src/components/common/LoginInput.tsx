import React, {ChangeEvent, RefObject, useEffect, useId, useState} from 'react';
import {useSelector} from 'react-redux';
import CancelIcon from "./CancelIcon";
import {selectUserCode, selectUserLoading, setCode,} from "@/ducks/user";
import {useAppDispatch} from "@/app/configureStore";
import FormControl, {FormControlProps} from "react-bootstrap/FormControl";
import InputGroup, {InputGroupProps} from 'react-bootstrap/InputGroup'
import Button from "react-bootstrap/Button";


interface LoginInputProps extends InputGroupProps {
    ref: RefObject<HTMLInputElement | null>;
    inputProps?: Omit<FormControlProps, 'value' | 'onChange'>;
}

const LoginInput = ({ref, inputProps}: LoginInputProps) => {
    const dispatch = useAppDispatch();
    const code = useSelector(selectUserCode);
    const loading = useSelector(selectUserLoading);
    const [showCode, setShowCode] = useState(false);
    const id = inputProps?.id ?? useId();

    useEffect(() => {
        ref?.current?.focus();
    }, []);

    const onCancel = () => dispatch(setCode(''));
    const onChange = (ev: ChangeEvent<HTMLInputElement>) => dispatch(setCode(ev.target.value));

    return (
        <InputGroup size="lg">
            <InputGroup.Text as="label" htmlFor={id}>Login</InputGroup.Text>
            <FormControl type={showCode ? 'text' : 'password'}
                         id={id}
                         ref={ref}
                         value={code} onChange={onChange}
                         minLength={4}
                         required={true}
                         disabled={loading}
                         {...inputProps}
            />
            <Button type="button" variant={showCode ? 'secondary' : 'outline-secondary'}
                    onMouseDown={() => setShowCode(true)} onTouchStart={() => setShowCode(true)}
                    onMouseUp={() => setShowCode(false)} onTouchCancel={() => setShowCode(false)}
                    onTouchEnd={() => setShowCode(false)}>
                <span className="bi-eye-fill" aria-label="View Password"/>
            </Button>
            <Button type="reset" variant="outline-secondary" onClick={onCancel} disabled={loading}>
                <CancelIcon/>
            </Button>
        </InputGroup>
    );
}

export default LoginInput;
