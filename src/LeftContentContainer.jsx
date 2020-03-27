import styled, { css } from "styled-components";

const LeftContentContainer = styled.div`

    @media (min-width: 1300px) {
        
        &::-webkit-scrollbar {
            display: none;
          }

         > div {
            border-radius: 0;
            border-top-right-radius: 2rem;
            margin-bottom: 0;
            box-shadow: none;
            height: 100%;

                &:last-child {
                    border-top-right-radius: 0rem;
                }
        }
    }
`


export default LeftContentContainer