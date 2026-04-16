import styled from 'styled-components'




export const CountdownContainer = styled.div`
    font-family: 'Roboto', monospace;
    font-size: 10rem;
    line-height: 8rem;
    gap: 1rem;
    display: flex;

    span {
        background: ${(props) => props.theme['gray-700']};
        padding: 2rem 1rem;
        border-radius: 8px;
    }
`

export const Separator = styled.div`
    padding: 2rem 0;
    color: ${(props) => props.theme['green-500']};

    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
`

export const StartCountdownButton = styled.button`
    width: 100%;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border: 0;
    font-weight: bold;
    gap: 0.5rem;
    border-radius: 8px;
    background: ${(props) => props.theme['green-500']};

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        background: ${(props) => props.theme['green-700']};
    }
`

export const StopCountdownButton = styled(StartCountdownButton)`
    background: ${(props) => props.theme['red-500']};

    &:not(:disabled):hover {
        background: ${(props) => props.theme['red-700']};
    }
` 