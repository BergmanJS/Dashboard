import styled, { css } from 'styled-components';

export default styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    display: inline-block;
    font-size: 0.75rem;
    font-weight: bold;
    color: #ffffff;
    background-color: #ff6e6a;
    padding: 0.625rem .8rem;
    border-radius: 1.5rem;
    height: 2.4rem;
    transition: 0.2s;
    overflow: hidden;
    white-space: nowrap;
    margin:  ${props => props.margin || '0'};

    @media (min-width: 768px) {
        font-size: 0.875rem;
        padding: 0.625rem 1rem;
    }

    &:hover {
        background-color: #ff524d;
        transform: translateY(-2px);
        box-shadow: 0 0.375rem 2rem -0.8rem #4d4d4d;
    }

    ${(props) =>
        props.cancel &&
        css`
            background-color: #ffffff;
            color: #4d4d4d;
            text-decoration: underline;
            

            &:hover {
                background-color: #ffffff;
                box-shadow: 0 0.375rem 2rem -0.8rem #4d4d4d;
            }
        `}
    ${(props) =>
        props.secondary &&
        css`
            background-color: #ffffff;
            color: #4d4d4d;
            border: 1px solid #4d4d4d;

            &:hover {
                background-color: #ffffff;
                box-shadow: 0 0.375rem 2rem -0.8rem #4d4d4d;
            }
        `}
`;
