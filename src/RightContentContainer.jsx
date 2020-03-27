import styled, { css } from "styled-components";

const RightContentContainer = styled.div`
    @media (min-width: 750px) {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: auto;
        overflow-y: auto;
        padding: 1rem;
        
        &::-webkit-scrollbar {
            display: none;
          }
    }
`

export default RightContentContainer;