import styled, { css } from "styled-components";

const Modal = styled.div`
    position: fixed;
    top: 25%;
    left: 50%;
    margin-left: -10rem;
    padding: 1.3rem;
    background-color: #ffffff;
    border-radius: 1rem;
    height: ${props => props.height || '10rem' };
    width: 20rem;
    z-index: 2;
    box-shadow: 0 0.375rem 2rem -1rem #4d4d4d;
    transition: .2s;
    z-index: 10;

    @media (min-width: 425px) {
        width: 24rem;
        margin-left: -12rem;
    }

    @media (min-width: 1300px) {
        width: 26rem;
        margin-left: -13rem;
    }

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
        margin-right: 0.3125rem;
    }
`;


export default Modal;