import styled, { css } from "styled-components";

const ContentBlock = styled.div`
  position: relative;
  padding: ${props => props.padding  || "2rem"};
  border-radius: ${props => props.radius  || "2rem"};
  background: #ffffff;
  box-shadow: ${props => props.boxShadow || "0 0.375rem 2rem -1.2rem #4d4d4d"};
  margin-bottom: 2rem;
  width: 100%;
  max-width: 36.25rem;
  color: ${props => props.color || "#252745"};
  background-color: ${props => props.backgroundColor || "#ffffff"};  
  
  @media (min-width:1300px){
    max-width: initial;
  }

`;

export default ContentBlock;
