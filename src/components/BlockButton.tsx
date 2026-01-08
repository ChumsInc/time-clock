import styled from "@emotion/styled";
import Button, {type ButtonProps} from "react-bootstrap/Button";


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

export default function BlockButton({
                                        containerClassName = '',
                                        onClick,
                                        children,
                                        ...rest
                                    }: BlockButtonProps) {
    return (
        <Block className={containerClassName}>
            <Button onClick={onClick} {...rest}>
                {children}
            </Button>
        </Block>
    );
}
