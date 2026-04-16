import styled from 'styled-components'

export const HomeContainer = styled.main`
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }

    button[type="submit"] {
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
    }
`

