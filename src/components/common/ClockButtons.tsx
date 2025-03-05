import styled from "@emotion/styled";

export const ClockButtons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;

    button {
        width: 100%;
        display: flex;
        gap: 1rem;
        flex-direction: column;
        @media (min-width: 380px) {
            flex-direction: row;
            justify-content: center;
        }
    }
`
