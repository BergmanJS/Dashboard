import { keyframes } from 'styled-components';

const showAnimation = keyframes`
    0% { 
        transform: translateY(2rem);
        opacity: 0;
    }
    70% { 
        transform: translateY(-0.5rem); 
        opacity: 1
        }
    100% { 
        transform: translateY(0rem); 
        opacity: 1
    }
`


module.exports = {
  showAnimation
}