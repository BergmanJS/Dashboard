import styled from 'styled-components';

const DefaultText = styled.p`
    font-size: 0.875rem;
    margin: ${props => props.margin || 0};
    color: ${props => props.color || '#252745'};
`

export default DefaultText;