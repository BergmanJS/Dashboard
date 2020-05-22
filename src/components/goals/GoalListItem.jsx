import React, { useState } from 'react';
import ListItem from './../commonComponents/ListItem';
import styled, { keyframes } from 'styled-components';
import { showAnimation } from '../commonComponents/Animations';
import firebase from 'firebase/app';
import database from 'firebase/database';

const GoalListItem = styled(ListItem)`
    justify-content: space-between;
    height: 2.375rem;
    margin-bottom: 0.5rem;

    &:hover {
        div {
            &:first-child {
                &:before {
                    transition: 0.2s all ease-in-out;
                    background-color: orange;
                    transform: scale(1.3);
                }
            }
        }
    }
`;

const GoalText = styled.div`
    display: inline-flex;
    align-items: center;
    text-align: left;
    cursor: pointer;
    color: #ffffff;

    &:before {
        content: '';
        display: block;
        border-radius: 50%;
        background-color: #ff6e6a;
        height: 0.6rem;
        width: 0.6rem;
        margin-right: 0.8rem;
    }
`;

const GoalTools = styled.div`
    display: ${(props) => (props.showTools ? 'inline-flex' : 'none')};
    transform: ${(props) =>
        props.showTools ? 'translateY(0rem)' : 'translateY(2rem)'};
    opacity: ${(props) => (props.showTools ? 1 : 0)};
    animation: ${showAnimation} 0.3s forwards;
`;

const ToolBtn = styled.i`
    color: #ffffff;
    font-size: 1.3rem;
    padding: 0.2rem;
    border-radius: 0.5rem;
    transition: 0.2s all;

    &:first-child {
        margin-right: 1.5rem;
    }

    &:hover {
        background-color: #ff6e6a;
        transform: translateY(-0.2rem);
    }
`;

const deleteGoal = (goalId) => {
    firebase
        .database()
        .ref('goals/' + goalId)
        .remove();
};

const Goals = (props) => {
    const goalId = props.goalId;
    const [showTools, setShowTools] = useState(false);

    const handleDeleteGoal = (goalId) => {
        deleteGoal(goalId);
    };

    const handleShowTools = () => {
        if (showTools) {
            return;
        }
        setShowTools(true);
    };

    const handleCloseTools = () => {
        setShowTools(false);
    };

    return (
        <GoalListItem onClick={() => handleShowTools()}>
            <GoalText>{props.goal}</GoalText>
            <GoalTools showTools={showTools}>
                <ToolBtn
                    onClick={() => handleDeleteGoal(goalId)}
                    className="mdi mdi-delete-outline"
                ></ToolBtn>
                <ToolBtn
                    onClick={() => handleCloseTools()}
                    className="mdi mdi-close"
                ></ToolBtn>
            </GoalTools>
        </GoalListItem>
    );
};

export default Goals;
