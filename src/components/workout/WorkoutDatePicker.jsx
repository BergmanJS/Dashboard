import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

export default WorkoutDatePicker;
