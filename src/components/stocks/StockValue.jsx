import styled, { css } from "styled-components";

const StockValue = styled.span`
    font-size: 1.2rem;
    font-weight: bold;
    color: ${props => props.positive ? '#60d453 !important' : '#ff6e6a !important'};
`
export default StockValue;
