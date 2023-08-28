import React, { Component } from "react";
import DashboardComponent from "../components/Dashboard/DashboardComponent";

export default class DashboardPages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transition: false,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ transition: true });
    }, 350);
  }
  render() {
    return (
      <>
        <DashboardComponent />
      </>
    );
  }
}
