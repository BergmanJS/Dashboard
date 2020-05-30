import React, { useState, useEffect } from 'react';
import ContentBlock from './../commonComponents/ContentBlock';
import MainTitle from './../commonComponents/MainTitle';
import Button from './../commonComponents/Button';
import Label from './../commonComponents/Label';
import Modal from './../commonComponents/Modal';
import GoalListItem from './GoalListItem';
import styled from 'styled-components';
import firebase from 'firebase/app';
import database from 'firebase/database';

const GoalsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.5rem;
`;

const GoalsList = styled.ul`
    padding: 0;
    margin: 0;
    cursor: pointer;
`;

const GoalsContainer = styled(ContentBlock)`
    @media (min-width: 1300px) {
        padding-top: 0;
    }
`;

const setGoals = (goalId, goal) => {
    firebase
        .database()
        .ref('goals/' + goalId)
        .set(
            {
                goal: goal,
            },
            (error) => {
                if (error) {
                    console.log('firebase error');
                }
            }
        );
};

const Goals = () => {
    const [openModal, setOpenModal] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [goalComponents, setGoalComponents] = useState(null);
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        const id = new Date().getTime();
        setGoals(id, inputValue);
        setInputValue('');
        setOpenModal(false);
        e.preventDefault();
    };

    const handleModalClose = (e) => {
        setOpenModal(false);
        setInputValue('');
        e.preventDefault();
    };

    const getGoals = () => {
        const database = firebase.database();
        var ref = database.ref('goals');
        ref.on('value', gotData);
    };

    const gotData = (data) => {
        const goalsData = data.val();
        generateGoalComponents(goalsData);
    };

    const generateGoalComponents = (goalsData) => {
        const objectKeys = Object.keys(goalsData);
        const goalComponentsArray = [];

        for (var i = 0; i < objectKeys.length; i++) {
            const k = objectKeys[i];
            const goal = goalsData[k].goal;
            goalComponentsArray.push(
                <GoalListItem goal={goal} goalId={k} key={k}></GoalListItem>
            );
        }
        setGoalComponents(goalComponentsArray);
    };

    document.body.style.overflowY = openModal ? 'hidden' : 'initial';
    useEffect(() => {
        getGoals();
    }, []);

    return (
        <GoalsContainer backgroundColor="#252745">
            {openModal ? (
                <Modal top={'25%'}>
                    <form onSubmit={handleSubmit}>
                        <Label>
                            New goal
                            <input
                                type="text"
                                autoFocus={openModal}
                                value={inputValue}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </Label>
                        <Button
                            disabled={inputValue === '' ? true : false}
                            type="submit"
                            value="Set new goal"
                        >
                            Save
                        </Button>
                        <Button secondary onClick={(e) => handleModalClose(e)}>
                            Cancel
                        </Button>
                    </form>
                </Modal>
            ) : null}
            <GoalsHeader>
                <MainTitle color="#ffffff">Goals 2020</MainTitle>
                <Button onClick={() => setOpenModal(true)}>Add new</Button>
            </GoalsHeader>
            <GoalsList>{goalComponents}</GoalsList>
        </GoalsContainer>
    );
};

export default Goals;
