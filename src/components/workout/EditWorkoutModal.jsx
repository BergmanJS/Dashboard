import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from './../commonComponents/Button';
import Label from './../commonComponents/Label';
import Modal from './../commonComponents/Modal';
import WorkoutListItem from './WorkoutListItem';
import firebase from 'firebase/app';
import database from 'firebase/database';
import moment from 'moment';

const WorkoutListContainer = styled.div`
    margin: 1rem 0;
    overflow-y: auto;
    max-height: 20rem;
    &::-webkit-scrollbar {
            display: none;
          }

        
`;

const EditWorkoutModal = ({ setOpenEditWorkoutModal }) => {
    const [workoutsData, setWorkoutsData] = useState(false);

    const generateWorkoutList = () => {
        const workoutsArray = [];

        Object.entries(workoutsData).forEach((e) => {
            const workoutId = e[0];

            workoutsArray.push(
                <WorkoutListItem key={e[0]} workoutId={workoutId} listItemData={e[1]} />
            );
        });

        return [...workoutsArray];
    };

    const handleModalClose = (e) => {
        setOpenEditWorkoutModal(false);
        e.preventDefault();
    };

    const getWorkouts = () => {
        const database = firebase.database();
        var ref = database.ref('workouts');
        ref.on('value', gotData);
    };

    const gotData = (data) => {
        const workoutData = data.val();
        setWorkoutsData(workoutData);
    };

    useEffect(() => {
        getWorkouts();
    }, []);

    return (
        <Modal height={'auto'}>
            <Label>Edit workout</Label>
            <WorkoutListContainer>
                {!workoutsData ? null : generateWorkoutList()}
            </WorkoutListContainer>
            
            <Button secondary onClick={(e) => handleModalClose(e)}>
                Close
            </Button>
        </Modal>
    );
};

export default EditWorkoutModal;
