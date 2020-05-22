import styled, { css } from "styled-components";

export default styled.h1`
  margin: 0;
  margin-bottom: 1rem; 
  font-size: 1.4rem;
  color: ${props => props.color || "#252745"};

  @media (min-width: 1440px) {
    font-size: 1.7rem;
  }
`;
