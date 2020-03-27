import React from "react";
import ContentBlock from "./../commonComponents/ContentBlock";
import MainTitle from "./../commonComponents/MainTitle";
import Ul from "./../commonComponents/Ul";

const Followed = props => {
  return (
    <ContentBlock>
      <MainTitle>Followed</MainTitle>
      <Ul>{props.followedStockListComponents}</Ul>
    </ContentBlock>
  );
};

export default Followed;
