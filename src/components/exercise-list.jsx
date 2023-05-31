import React, { Component } from "react";
import axios from "axios";

import Exercise from "./Exercise";

const customScrollBar = {
  position: "relative",
  height: "300px",
  overflow: "auto",
  display: "block",
};

class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.exerciseList = this.exerciseList.bind(this);
    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get("/api/exercises/")
      .then((res) => {
        this.setState({ exercises: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteExercise(id) {
    axios
      .delete("/api/exercises/" + id)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  exerciseList() {
    return this.state.exercises.map((exe) => {
      return (
        <Exercise
          key={exe._id}
          exercise={exe}
          deleteExercise={this.deleteExercise}
        />
      );
    });
  }

  render() {
    return (
      <div style={{ margin: 100 }}>
        <h1> Logged Exercises</h1>
        <div style={customScrollBar}>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Description</th>
                <th scope="col">Duration( mins )</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>{this.exerciseList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ExerciseList;
