/* import React, { Component } from "react";
import ListItem from "./../commonComponents/ListItem";

export default class ContentBlockListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  render() {
    const data = this.props.data;
    const firstItem = data.homeTeam;
    const secondItem = data.result;
    const lastItem = data.visitorTeam;

    return (
      <ListItem spaceBetween>
        <span>{firstItem}</span>
        <span>{secondItem}</span>
        <span>{lastItem}</span>
      </ListItem>
    );
  }
}
 */