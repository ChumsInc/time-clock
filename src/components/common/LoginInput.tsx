import {type ChangeEvent, type RefObject, useEffect, useId, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import CancelIcon from "./CancelIcon";
import {selectUserLoading,} from "@/ducks/user";
import FormControl, {type FormControlProps} from "react-bootstrap/FormControl";
import InputGroup, {type InputGroupProps} from 'react-bootstrap/InputGroup'
import Button from "react-bootstrap/Button";
import styled from "@emotion/styled";
import ViewPinIcon from "@/components/common/ViewPinIcon.tsx";
import classNames from "classnames";

const StyledInputGroup = styled(InputGroup)`
    input:not(.show-pin) {
        -webkit-text-security: disc;
    }
`

interface LoginInputProps extends Omit<InputGroupProps,'value'|'onChange' > {
    ref: RefObject<HTMLInputElement | null>;
    value: string;
    onChange: (value: string) => void;
    inputProps?: Omit<FormControlProps, 'value'|'onChange'>;
}

export default function LoginInput({ref, value, onChange, inputProps}: LoginInputProps) {
    const loading = useSelector(selectUserLoading);
    const id = useId();
    const [show, setShow] = useState(false);
    const timerRef = useRef<number>(0);

    useEffect(() => {
        timerRef.current = window.setTimeout(() => {
            onChange('');
        }, 30000);
        return function cleanUp() {
            window.clearInterval(timerRef.current);
        }
    }, [onChange]);

    useEffect(() => {
        ref?.current?.focus();
    }, [ref]);

    const onToggleShow = () => {
        setShow(!show);
    }

    const onCancel = () => {
        if (!ref.current) {
            return;
        }
        ref.current.value = '';
        setShow(false);
    }

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        onChange(ev.target.value);
    }

    /**
     * Note:
     *
     * Although it causes other issues, I'm using type="text" here to
     * prevent the browser from indicating to update the password because it
     * was found in a data breach.
     *
     * The StyledInputGroup component applies styling to display the text
     * input as 'disc'
     *
     * SM, 2025-07-29
     */
    return (

        <StyledInputGroup>
            <InputGroup.Text as="label" htmlFor={inputProps?.id ?? id}>
                <span className="me-3">Login</span>
                <span className="bi-key-fill" role="presentation"/>
            </InputGroup.Text>
            <FormControl type="text" autoComplete="off"
                         className={classNames({'show-pin': show})}
                         id={inputProps?.id ?? id}
                         ref={ref}
                         value={value} onChange={changeHandler}
                         minLength={4}
                         required={true}
                         disabled={loading}
                         {...inputProps}
            />
            <Button type="button" variant={show ? "secondary" : 'outline-secondary'} onClick={onToggleShow}>
                <ViewPinIcon visible={show}/>
            </Button>
            <Button type="reset" variant="outline-secondary" onClick={onCancel} disabled={loading}>
                <CancelIcon/>
            </Button>
        </StyledInputGroup>
    );
}
