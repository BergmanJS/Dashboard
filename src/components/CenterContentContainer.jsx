import styled, { css } from 'styled-components';

const CenterContentContainer = styled.div`
    @media (min-width: 1300px) {
        padding: 1rem;
        padding-right: 0;
        padding-top: 0.625rem;

        &::-webkit-scrollbar {
            display: none;
        }
    }
`;

export default CenterContentContainer;
