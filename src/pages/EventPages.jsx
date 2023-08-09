import React, { Component } from "react";
import EventComponent from "../components/Event/EventComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventDetailComponent from "../components/Event/EventDetailComponent";

export default class EventPages extends Component {
  render() {
    return (
      <>
        <EventComponent></EventComponent>
      </>
    );
  }
}
