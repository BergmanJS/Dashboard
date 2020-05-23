import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import EditWorkoutModal from './EditWorkoutModal';
import ContentBlock from './../commonComponents/ContentBlock';
import MainTitle from './../commonComponents/MainTitle';
import Button from './../commonComponents/Button';
import Label from './../commonComponents/Label';
import Modal from './../commonComponents/Modal';
import WorkoutChart from './WorkoutChart';
import firebase from 'firebase/app';
import database from 'firebase/database';
import moment from 'moment';

const WorkoutContainter = styled(ContentBlock)`
    @media (min-width: 1300px) {
        height: 100%;
        box-shadow: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
`;

const WorkoutListContainer = styled.div`
    margin: 0 0 2rem 0;
`;

const WorkoutChoice = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 1rem;
    background-color: ${(props) => (props.selected ? '#ffda99' : '#f5f6fa')};
    margin-bottom: 1rem;
    cursor: pointer;
    transition: 0.2s all;

    :hover {
        background-color: ${(props) =>
            props.selected ? '#ffda99' : '#eeeff6'};
    }
`;

const WorkoutIcon = styled.span`
    font-size: 1.5rem;
    margin-right: 0.8rem;
`;

const WorkoutName = styled.span`
    font-size: 0.875rem;
    font-weight: bold;
    color: #252745;
`;

const WorkoutBlockHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
        display: inline-block;
        margin-left: auto;
    }
`;

const WorkoutStaticContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 0 2rem;
`;

const WorkoutValueContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 1440px) {
        flex-direction: row;
    }
`;

const WorkoutCount = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
    color: #252745;
`;

const WorkoutLabel = styled.span`
    font-size: 0.875rem;
    color: #7c7c7c;
    font-weight: bold;

    @media (min-width: 1440px) {
        font-size: 1rem;
        margin-left: 0.625rem;
    }
`;

const DatePickerContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    transition: 0.2s;
`;

const WorkoutDatePicker = styled(DatePicker)`
    display: block;
    border: none !important;
    margin: 1rem auto !important;
    text-align: center;
    max-width: 8rem;
    font-size: 1.3rem !important;
    padding: 0.5rem;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;

    :hover {
        background-color: #f5f6fa;
    }
`;

const setWorkout = (workoutId, workout, week, date) => {
    console.log('start date', date);
    firebase
        .database()
        .ref('workouts/' + workoutId)
        .set(
            {
                workout: workout,
                week: week,
                date: date,
            },
            (error) => {
                if (error) {
                    console.log('firebase error');
                }
            }
        );
};

const Workout = () => {
    const [chartWorkoutData, setChartWorkoutData] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [allCounts, setAllCounts] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [openEditWorkoutModal, setOpenEditWorkoutModal] = useState(false);

    const handleInputChange = (workout) => {
        setInputValue(workout);
    };

    const getWeek = () => {
        startDate.setHours(0, 0, 0, 0);
        startDate.setDate(
            startDate.getDate() + 3 - ((startDate.getDay() + 6) % 7)
        );
        const week1 = new Date(startDate.getFullYear(), 0, 4);

        return (
            1 +
            Math.round(
                ((startDate.getTime() - week1.getTime()) / 86400000 -
                    3 +
                    ((week1.getDay() + 6) % 7)) /
                    7
            )
        );
    };

    const handleSubmit = (e) => {
        const id = new Date().getTime();
        const week = getWeek();
        const date = moment(startDate).format('l');

        setWorkout(id, inputValue, week, date);
        setInputValue('');
        setStartDate(new Date());
        setOpenModal(false);

        e.preventDefault();
    };

    const handleModalClose = (e) => {
        setOpenModal(false);
        setInputValue('');
        setStartDate(new Date());
        e.preventDefault();
    };

    const getWorkouts = () => {
        const database = firebase.database();
        var ref = database.ref('workouts');
        ref.on('value', gotData);
    };

    const gotData = (data) => {
        const workoutData = data.val();
        setWorkoutCountValues(workoutData);
        setChartWorkoutData(workoutData);
    };

    const setWorkoutCountValues = (workoutData) => {
        const workoutDataArray = Object.values(workoutData);
        let gymCountValue = 0;
        let joggingCountValue = 0;
        let hockeyCountValue = 0;
        let yogaCountValue = 0;

        workoutDataArray.forEach((e) => {
            e.workout === 'Gym' ? gymCountValue++ : null;
            e.workout === 'Jogging' ? joggingCountValue++ : null;
            e.workout === 'Hockey' ? hockeyCountValue++ : null;
            e.workout === 'Yoga' ? yogaCountValue++ : null;
        });

        const allCounts = {
            all:
                gymCountValue +
                joggingCountValue +
                hockeyCountValue +
                yogaCountValue,
            gymCount: gymCountValue,
            joggingCount: joggingCountValue,
            hockeyCount: hockeyCountValue,
            yogaCount: yogaCountValue,
        };
        setAllCounts(allCounts);
    };

    const datePicker = () => {
        return (
            <WorkoutDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
            />
        );
    };

    useEffect(() => {
        getWorkouts();
    }, []);

    return (
        <WorkoutContainter>
            <WorkoutBlockHeader>
                <MainTitle>Workouts</MainTitle>
                <div>
                    <Button margin={'0 .4rem 0 0'} onClick={() => setOpenModal(true)}>
                        Add new
                    </Button>
                    <Button secondary onClick={() => setOpenEditWorkoutModal(true)}>
                        Edit
                    </Button>
                </div>
            </WorkoutBlockHeader>
            {allCounts === null ? null : (
                <WorkoutStaticContainer>
                    <WorkoutValueContainer>
                        <WorkoutCount>{allCounts.all}</WorkoutCount>
                        <WorkoutLabel>Total</WorkoutLabel>
                    </WorkoutValueContainer>
                    <WorkoutValueContainer>
                        <WorkoutCount>{allCounts.gymCount}</WorkoutCount>
                        <WorkoutLabel>Gym</WorkoutLabel>
                    </WorkoutValueContainer>
                    <WorkoutValueContainer>
                        <WorkoutCount>{allCounts.yogaCount}</WorkoutCount>
                        <WorkoutLabel>Yoga</WorkoutLabel>
                    </WorkoutValueContainer>
                    <WorkoutValueContainer>
                        <WorkoutCount>{allCounts.joggingCount}</WorkoutCount>
                        <WorkoutLabel>Jogging</WorkoutLabel>
                    </WorkoutValueContainer>
                    <WorkoutValueContainer>
                        <WorkoutCount>{allCounts.hockeyCount}</WorkoutCount>
                        <WorkoutLabel>Hockey</WorkoutLabel>
                    </WorkoutValueContainer>
                </WorkoutStaticContainer>
            )}
            {chartWorkoutData === null ? null : (
                <WorkoutChart chartWorkoutData={chartWorkoutData} />
            )}
            {openModal ? (
                <Modal height={'auto'}>
                    <form onSubmit={handleSubmit}>
                        <Label>Add new workout</Label>
                        <WorkoutListContainer>
                            <DatePickerContainer>
                                {datePicker()}
                            </DatePickerContainer>
                            <WorkoutChoice
                                selected={inputValue === 'Gym' ? true : false}
                                onClick={(e) => handleInputChange('Gym')}
                            >
                                <WorkoutIcon className="mdi mdi-weight-lifter"></WorkoutIcon>
                                <WorkoutName>Gym</WorkoutName>
                            </WorkoutChoice>
                            <WorkoutChoice
                                selected={
                                    inputValue === 'Jogging' ? true : false
                                }
                                onClick={(e) => handleInputChange('Jogging')}
                            >
                                <WorkoutIcon className="mdi mdi-run"></WorkoutIcon>
                                <WorkoutName>Jogging</WorkoutName>
                            </WorkoutChoice>
                            <WorkoutChoice
                                selected={
                                    inputValue === 'Hockey' ? true : false
                                }
                                onClick={(e) => handleInputChange('Hockey')}
                            >
                                <WorkoutIcon className="mdi mdi-hockey-sticks"></WorkoutIcon>
                                <WorkoutName>Hockey</WorkoutName>
                            </WorkoutChoice>
                            <WorkoutChoice
                                selected={inputValue === 'Yoga' ? true : false}
                                onClick={(e) => handleInputChange('Yoga')}
                            >
                                <WorkoutIcon className="mdi mdi-meditation"></WorkoutIcon>
                                <WorkoutName>Yoga</WorkoutName>
                            </WorkoutChoice>
                        </WorkoutListContainer>
                        <Button type="submit" value="Set new goal">
                            Save
                        </Button>
                        <Button cancel onClick={(e) => handleModalClose(e)}>
                            Cancel
                        </Button>
                    </form>
                </Modal>
            ) : null}
            {openEditWorkoutModal ? (
                <EditWorkoutModal
                    setOpenEditWorkoutModal={setOpenEditWorkoutModal}
                />
            ) : null}
        </WorkoutContainter>
    );
};

export default Workout;
