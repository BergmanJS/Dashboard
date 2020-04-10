import styled, { css } from 'styled-components';

export default styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    display: inline-block;
    font-size: 0.875rem;
    font-weight: bold;
    color: #ffffff;
    background-color: #ff6e6a;
    padding: 0.625rem 1rem;
    border-radius: 1.5rem;
    height: 2.4rem;
    transition: .2s;
    overflow: hidden;
    white-space: nowrap;

    &:hover {
        background-color: #ff524d;
        transform: translateY(-2px);
        box-shadow: 0 0.375rem 2rem -.8rem #4d4d4d;
    }

    ${props => props.secondary && css`
        background-color: #ffffff;
        color: #4d4d4d;

            &:hover {
                background-color: #ffffff;
                box-shadow: 0 0.375rem 2rem -.8rem #4d4d4d;
            }
    `
    }

    
`;

