import styled, { css } from 'styled-components';

export default styled.h2`
    font-size: 1.3rem;
    margin: 0;
    margin-bottom: ${(props) => props.marginBottom || '.3rem'};
    color: ${(props) => props.color || '#252745'};
`;
