import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentBlock from './../commonComponents/ContentBlock';
import MainTitle from './../commonComponents/MainTitle';
import Button from './../commonComponents/Button';
import Label from './../commonComponents/Label';
import Modal from './../commonComponents/Modal';
import WorkoutChart from './WorkoutChart';
import firebase from 'firebase/app';
import database from 'firebase/database';

const WorkoutContainter = styled(ContentBlock)`

  @media (min-width: 1300px) {
    height: 100%;
    box-shadow: none;
    }
`

const WorkoutChoiceContainer = styled.div`
  margin-bottom: 2rem;
`

const WorkoutChoice = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${props => props.selected ? '#ffda99' : '#f5f6fa'};
  margin-bottom: 1rem;
  cursor: pointer;
  transition: .2s all;

  :hover {
    background-color: ${props => props.selected ? '#ffda99' : '#eeeff6'};
  }
`

const WorkoutIcon = styled.span`
  font-size: 1.5rem;
  margin-right: .8rem;
`

const WorkoutName = styled.span`
  font-size: 0.875rem;
  font-weight: bold;
  color: #252745;
`

const WorkoutBlockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const WorkoutStaticContainer = styled.div`
  display: flex; 
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  max-width: 35rem;
`

const WorkoutValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const WorkoutCount = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #252745;
`

const WorkoutLabel = styled.span`
  font-size: 0.875rem;
  color: #7c7c7c;
  font-weight: bold;
`

const setWorkout = (goalId, goal, week, date) => {
  firebase.database().ref('workouts/' + goalId).set({
    goal: goal,
    week: week,
    date: date
  }, (error) => {
      if (error) {
          console.log('firebase error');
      }
  });
}

const Workout = () => {
    const [currentWorkoutData, setCurrentWorkoutData] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (workout) => {
      setInputValue(workout);
  }

  const handleSubmit = (e) => {
      const id = new Date().getTime();
      const week = 'tähän viikko metodi';
      const date = 'tähän pvm järkeväksi';
      setWorkout(id, inputValue, week, date);
      setInputValue('');
      setOpenModal(false);
      e.preventDefault();
  }

  const handleModalClose = (e) => {
      setOpenModal(false);
      setInputValue('');
      e.preventDefault();
  }

  const getWorkouts = () => {
    const database = firebase.database();
    var ref = database.ref('workouts');
    ref.on('value', gotData);
  }

  const gotData = (data) => {
    const workoutData = data.val();
    console.log(workoutData);
    setCurrentWorkoutData(workoutData);
  }

    useEffect(() =>{
      getWorkouts();
      console.log(currentWorkoutData)
    },[])

    return(
        <WorkoutContainter>
          <WorkoutBlockHeader>
            <MainTitle>Workouts</MainTitle>
            <Button onClick={() => setOpenModal(true)}>Add new Goal</Button>
          </WorkoutBlockHeader>
          <WorkoutStaticContainer>
            <WorkoutValueContainer>
              <WorkoutCount>352</WorkoutCount>
              <WorkoutLabel>Total</WorkoutLabel>
            </WorkoutValueContainer>
            <WorkoutValueContainer>
              <WorkoutCount>200</WorkoutCount>
              <WorkoutLabel>Gym</WorkoutLabel>
            </WorkoutValueContainer>
            <WorkoutValueContainer>
              <WorkoutCount>42</WorkoutCount>
              <WorkoutLabel>Yoga</WorkoutLabel>
            </WorkoutValueContainer>
            <WorkoutValueContainer>
              <WorkoutCount>10</WorkoutCount>
              <WorkoutLabel>Jogging</WorkoutLabel>
            </WorkoutValueContainer>
            <WorkoutValueContainer>
              <WorkoutCount>0</WorkoutCount>
              <WorkoutLabel>Hockey</WorkoutLabel>
            </WorkoutValueContainer>
          </WorkoutStaticContainer>
          {currentWorkoutData === null ? null : <WorkoutChart currentWorkoutData={currentWorkoutData} />}
            {openModal ? 
            <Modal height={'auto'}>
              <form onSubmit={handleSubmit}>
                 {/*  <Label>New Workout
                    <input type="text" autoFocus={openModal} value={inputValue} onChange={(e) => handleInputChange(e)} />
                  </Label> */}
                  <WorkoutChoiceContainer>
                    <WorkoutChoice selected={inputValue === 'Gym' ? true : false} onClick={(e) => handleInputChange('Gym')}>
                      <WorkoutIcon className="mdi mdi-weight-lifter"></WorkoutIcon>
                      <WorkoutName>Gym</WorkoutName>
                    </WorkoutChoice>
                    <WorkoutChoice selected={inputValue === 'Jogging' ? true : false} onClick={(e) => handleInputChange('Jogging')}>
                      <WorkoutIcon className="mdi mdi-run"></WorkoutIcon>
                      <WorkoutName>Jogging</WorkoutName>
                    </WorkoutChoice>
                    <WorkoutChoice selected={inputValue === 'Hockey' ? true : false} onClick={(e) => handleInputChange('Hockey')}>
                      <WorkoutIcon className="mdi mdi-hockey-sticks"></WorkoutIcon>
                      <WorkoutName>Hockey</WorkoutName>
                    </WorkoutChoice>
                    <WorkoutChoice selected={inputValue === 'Yoga' ? true : false} onClick={(e) => handleInputChange('Yoga')}>
                      <WorkoutIcon className="mdi mdi-meditation"></WorkoutIcon>
                      <WorkoutName>Yoga</WorkoutName>
                    </WorkoutChoice>
                  </WorkoutChoiceContainer>
                  <Button type="submit" value="Set new goal">Save</Button>
                  <Button secondary onClick={(e) => handleModalClose(e)}>Cancel</Button>
              </form>
            </Modal>
            :
            null
            }
           {/*  <Chart currentDayData={currentDayData} summaryStockData={props.summaryStockData}/> */}
        </WorkoutContainter>
    );
    
}

export default Workout;