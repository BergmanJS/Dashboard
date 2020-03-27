import styled from 'styled-components';

 const SummaryHeader = styled.span`
    display: flex; 
    align-items: center;
    margin-bottom: 1rem;

    @media (min-width: 1600px) {
        margin-top: -3rem;
        justify-content: flex-end;
    }
`;

export default SummaryHeader;