import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from './../commonComponents/Button';
import firebase from 'firebase/app';
import database from 'firebase/database';

const WorkoutChoice = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 1rem;
    background-color: ${(props) => (props.selected ? '#ffda99' : '#f5f6fa')};
    margin-bottom: 1rem;
    transition: 0.2s all;
`;

const WorkoutIcon = styled.span`
    font-size: 1.5rem;
    margin-right: 0.8rem;
`;

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const WorkoutName = styled.span`
    font-size: 0.875rem;
    font-weight: bold;
    color: #252745;
    margin-bottom: 0.3125rem;
`;

const WorkoutDate = styled.span`
    font-size: 0.875rem;
    font-weight: bold;
    color: #717498;
`;

const DeleteWorkoutButton = styled(Button)`
    background-color: transparent;
    margin-left: auto;
    border: none;
`;

const pickIcon = (workoutName) => {
    let icon;
    switch (workoutName) {
        case 'Gym':
            icon = 'mdi mdi-weight-lifter';
            break;
        case 'Jogging':
            icon = 'mdi mdi-run';
            break;
        case 'Yoga':
            icon = 'mdi mdi-meditation';
            break;
        default:
            icon = 'mdi mdi-hockey-sticks';
    }
    return icon;
};

const deleteGoal = (workoutId) => {
    firebase
        .database()
        .ref('workouts/' + workoutId)
        .remove();
};

const WorkoutListItem = ({ workoutId, listItemData }) => {
    const workoutName = listItemData.workout;
    const date = listItemData.date;
    const workoutIcon = pickIcon(workoutName);

    return (
        <WorkoutChoice>
            <WorkoutIcon className={workoutIcon}></WorkoutIcon>
            <Wrap>
                <WorkoutName>{workoutName}</WorkoutName>
                <WorkoutDate>{date}</WorkoutDate>
            </Wrap>
            <DeleteWorkoutButton
                secondary
                onClick={() => deleteGoal(workoutId)}
            >
                Poista
            </DeleteWorkoutButton>
        </WorkoutChoice>
    );
};

export default WorkoutListItem;
