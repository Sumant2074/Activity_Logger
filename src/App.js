import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import ExerciseList from "./components/exercise-list";
import EditExercise from "./components/edit-exercise";
import CreateUser from "./components/create-user";
import CreateExercise from "./components/create-exercise";
import DeleteUser from "./components/delete-user";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<ExerciseList />} />
            <Route path="/edit/:id" element={<EditExercise />} />
            <Route path="/create" element={<CreateExercise />} />
            <Route path="/users" element={<CreateUser />} />
            <Route path="/delete" element={<DeleteUser />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
