import React from "react";
import ContentBlock from "./../commonComponents/ContentBlock";
import MainTitle from "./../commonComponents/MainTitle";
import Ul from "./../commonComponents/Ul";

const Popular = props => {
  return (
    <ContentBlock>
      <MainTitle>Popular</MainTitle>
      <Ul>{props.popularStockListComponents}</Ul>
    </ContentBlock>
  );
};

export default Popular;
