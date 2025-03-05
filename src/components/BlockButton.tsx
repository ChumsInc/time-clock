import React from 'react';
import styled from "@emotion/styled";
import {Button, ButtonProps} from "react-bootstrap";


const Block = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    button {
        flex: 0 0 100%;
    }
`

export interface BlockButtonProps extends ButtonProps {
    containerClassName?: string,
}

const BlockButton = ({
                         containerClassName = '',
                         onClick,
                         children,
                         ...rest
                     }: BlockButtonProps) => {
    return (
        <Block className={containerClassName}>
            <Button onClick={onClick} {...rest}>
                {children}
            </Button>
        </Block>
    );
};

export default BlockButton;
