import React, { Component } from "react";
import { Link } from "react-router-dom";
class Exercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: props.exercise._id,
      username: props.exercise.username,
      duration: props.exercise.duration,
      description: props.exercise.description,
      date: props.exercise.date.substring(0, 10),
    };
  }
  render() {
    return (
      <tr>
        <td scope="row">{this.state.username}</td>
        <td scope="row">{this.state.description}</td>
        <td scope="row">{this.state.duration}</td>
        <td scope="row">{this.state.date}</td>
        <td scope="row">
          <Link to={"/edit/" + this.state.key}>Edit</Link> |{" "}
          <a href="#" onClick={() => this.props.deleteExercise(this.state.key)}>
            {" "}
            Delete
          </a>
        </td>
      </tr>
    );
  }
}

export default Exercise;
