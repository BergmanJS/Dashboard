import styled, { css } from 'styled-components';

const ListItem = styled.li`
    display: ${(props) => props.display || 'flex'};
    align-items: ${(props) => props.alignItems || 'center'};
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: ${(props) => props.marginBottom || '1rem'};

    span {
        flex-basis: 100%;
        flex-grow: 1;
        text-align: center;
        color: ${(props) => props.color || '#252745'};

        &:first-child {
            text-align: left;
        }

        &:last-child {
            text-align: right;
        }
    }
`;

export default ListItem;
