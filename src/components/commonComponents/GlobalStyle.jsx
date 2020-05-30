import { createGlobalStyle } from 'styled-components';
import React from 'react';

const GlobalStyle = createGlobalStyle`
  
  body {
    font-family: "Quicksand", sans-serif;
    margin: 0;
    padding: 0;
    background-color: #ffffff;

    * {
        box-sizing: border-box;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
  }
`;

export default GlobalStyle;
