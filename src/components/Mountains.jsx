import React from 'react';
import styled from "styled-components";

const Moon = styled.span`
    display: ${props => props.nightMode ? 'block' : 'none'};
    position: absolute; 
    top: 2rem;
    left: 2rem;
    z-index:1;
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    background-color: #363963;
    border-right: 1.2rem solid #ffffff;
    box-shadow: .3rem 0 1rem -0.2rem #ffffff; 
`

const StarsContainer = styled.span`
    display: ${props => props.nightMode ? 'block' : 'none'};
    span {
        position: absolute; 
        top: 3rem;
        left: 40%;
        z-index:1;
        border-radius: 50%;
        width: .25rem;
        height: .25rem;
        background-color: #ffffff;
        box-shadow: 0 0 .2rem #ffffff; 

        &:first-child {
            top: 1rem;
            left: 60%;
            width: .2rem;
            height: .2rem;
        }

        &:nth-child(2) {
            top: 3rem;
            left: 70%;
        }

        &:last-child {
            top: 2rem;
            left: 90%;
        }
    }
`

const MountainsContainer = styled.div`
    position: absolute;
    top: -0.0625rem;
    left: 0;
    right: 0;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    height: 11rem;
    background: rgb(255, 255, 255);
    background: ${props => props.nightMode ?  "linear-gradient(90deg, rgba(90,92,132,1) -10%, rgba(55,58,106) 80%)" : "linear-gradient(0deg, rgba(255,255,255,1) -10%, rgba(255,177,41,1) 80%)"};
    overflow: hidden;

    @media (min-width: 1300px) {
        border-top-left-radius: 0rem;
    }

    div {
        position: absolute;
        bottom: -6rem;
        height: 10rem;
        width: 34%;
        background-color: #252745;
        transform: rotate(45deg);
        z-index: 2;

        &:nth-child(3),
        &:nth-child(4),
        &:last-child {
        &::after {
            content: " ";
            display: block;
            height: 0;
            width: 0;
            border: 1rem solid ${props => props.nightMode ? '#8b8fc1': '#ffffff'};
        }
        }
        &:nth-child(3) {
        bottom: -4rem;
        right: 30%;
        transform: rotate(30deg);

        &:after {
            border-right: 2rem solid transparent;
            border-bottom: 2rem solid transparent;
            border-left: 1rem solid ${props => props.nightMode ? '#bdbfdb': '#eeeeee'};
            margin-top: 2px;
            margin-left: 2px;
        }
        }
        &:nth-child(4) {
        &:after {
            margin-top: 2px;
            margin-left: 2px;
            border: 4rem solid ${props => props.nightMode ? '#acafd2': '#eeeeee'};
            border-left: 2rem solid transparent;
            border-right: 0rem solid transparent;
            border-bottom: 2rem solid transparent;
        }
        }
        &:last-child {
        right: 0;
        bottom: -4rem;
        transform: rotate(45deg);

        &::after {
            margin-top: 2px;
            margin-left: 2px;
            border-bottom: 5rem solid transparent;
            border-left: 1rem solid ${props => props.nightMode ? '#acafd2': '#eeeeee'};
            border-right: 6rem solid transparent;
        }
        }
    }
`;

const Mountains = ({nightMode}) => {
    
    return(
        <MountainsContainer nightMode={nightMode}>
            <Moon nightMode={nightMode}/>
            <StarsContainer nightMode={nightMode}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </StarsContainer>
            <div></div>
            <div></div>
            <div></div>
        </MountainsContainer>
    )
}

export default Mountains;