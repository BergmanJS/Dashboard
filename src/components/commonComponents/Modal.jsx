import styled, { css } from "styled-components";

const Modal = styled.div`
    position: fixed;
    top: 25%;
    left: 50%;
    margin-left: -13rem;
    padding: 1.3rem;
    background-color: #ffffff;
    border-radius: 1rem;
    height: ${props => props.height || '10rem' };
    width: 26rem;
    z-index: 2;
    box-shadow: 0 0.375rem 2rem -1rem #4d4d4d;
    transition: .2s;

    input {
        outline: none;
        border: none;
        box-shadow: none;
        border-bottom: 1px solid #252745;
        font-size: 1rem;
        height: 2rem;
        width: 100%;
        margin: 1rem 0;
    }

    button {
        font-size: 0.875rem;
        max-height: 2.5rem;
        padding: 0.7rem 1.3rem;
        margin-right: 0.3125rem;
    }
`;


export default Modal;