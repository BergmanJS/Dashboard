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
import moment from 'moment';

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
  margin-bottom: 1rem;
  padding: 0 2rem;
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

const setWorkout = (workoutId, workout, week, date) => {
  firebase.database().ref('workouts/' + workoutId).set({
    workout: workout,
    week: week,
    date: date
  }, (error) => {
      if (error) {
          console.log('firebase error');
      }
  });
}

const Workout = () => {
    const [chartWorkoutData, setChartWorkoutData] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [allCounts, setAllCounts] = useState(null);

    const handleInputChange = (workout) => {
      setInputValue(workout);
  }

  const getWeek = () => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      const week1 = new Date(date.getFullYear(), 0, 4);
      
      return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    }

  const handleSubmit = (e) => {
      const id = new Date().getTime();
      const week = getWeek();
      const date = moment().format('l');
    
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
    setWorkoutCountValues(workoutData);
    setChartWorkoutData(workoutData);
  }

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
      all: gymCountValue + joggingCountValue + hockeyCountValue + yogaCountValue,
      gymCount: gymCountValue,
      joggingCount: joggingCountValue,
      hockeyCount: hockeyCountValue,
      yogaCount: yogaCountValue
    }
    setAllCounts(allCounts);
  }

    useEffect(() => {
      getWorkouts();
    },[])

    return(
        <WorkoutContainter>
          <WorkoutBlockHeader>
            <MainTitle>Workouts in last year</MainTitle>
            <Button onClick={() => setOpenModal(true)}>Add new workout</Button>
          </WorkoutBlockHeader>
          {allCounts === null ? null :
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
          }
          {chartWorkoutData === null ? null : <WorkoutChart chartWorkoutData={chartWorkoutData} />}
            {openModal ? 
            <Modal height={'auto'}>
              <form onSubmit={handleSubmit}>
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
        </WorkoutContainter>
    );
    
}

export default Workout;