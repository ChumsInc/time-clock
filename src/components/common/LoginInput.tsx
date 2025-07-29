import {type ChangeEvent, type RefObject, useEffect, useId, useState} from 'react';
import {useSelector} from 'react-redux';
import CancelIcon from "./CancelIcon";
import {selectUserCode, selectUserLoading, setCode,} from "@/ducks/user";
import {useAppDispatch} from "@/app/configureStore";
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
interface LoginInputProps extends InputGroupProps {
    ref: RefObject<HTMLInputElement | null>;
    inputProps?: Omit<FormControlProps, 'value' | 'onChange'>;
}

const LoginInput = ({ref, inputProps}: LoginInputProps) => {
    const dispatch = useAppDispatch();
    const code = useSelector(selectUserCode);
    const loading = useSelector(selectUserLoading);
    const id = inputProps?.id ?? useId();
    const [show, setShow] = useState(false);

    useEffect(() => {
        ref?.current?.focus();
    }, []);

    const onToggleShow = () => {
        setShow(!show);
    }

    const onCancel = () => dispatch(setCode(''));
    const onChange = (ev: ChangeEvent<HTMLInputElement>) => dispatch(setCode(ev.target.value));

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
            <InputGroup.Text as="label" htmlFor={id}>
                <span className="me-3">Login</span>
                <span className="bi-key-fill" role="presentation"/>
            </InputGroup.Text>
            <FormControl type="text" autoComplete="off"
                         className={classNames({'show-pin': show})}
                         id={id}
                         ref={ref}
                         value={code} onChange={onChange}
                         minLength={4}
                         required={true}
                         disabled={loading}
                         {...inputProps}
            />
            <Button type="button" variant={show ? "secondary" : 'outline-secondary'} onClick={onToggleShow} >
                <ViewPinIcon visible={show} />
            </Button>
            <Button type="reset" variant="outline-secondary" onClick={onCancel} disabled={loading}>
                <CancelIcon/>
            </Button>
        </StyledInputGroup>
    );
}

export default LoginInput;
