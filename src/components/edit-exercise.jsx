import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

const EditExercise = (props) => {
  // this.onChangeUsername = this.onChangeUsername.bind(this);
  // this.onChangeDescription = this.onChangeDescription.bind(this);
  // this.onChangeDuration = this.onChangeDuration.bind(this);
  // this.onChangeDate = this.onChangeDate.bind(this);
  // this.onSubmit = this.onSubmit.bind(this);
  const { id } = useParams();
  const [key, setKey] = useState("");
  const [username, setUsername] = useState("");
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(() => {
    new Date();
  });
  const [users, setUsers] = useState([]);
  // this.state = {
  //   key: "",
  //   username: "",
  //   duration: 0,
  //   description: "",
  //   date: new Date(),
  //   users: [],
  // };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };
  const onChangeDate = (date) => {
    setDate(date);
  };

  useEffect(() => {
    //console.log(id);
    axios
      .get("/api/exercises/" + id)
      .then((res) => {
        // this.setState({
        //   key: res.data._id,
        //   username: res.data.username,
        //   duration: res.data.duration,
        //   description: res.data.description,
        //   date: res.data.date.substring(0, 10),
        //   })
        setKey(res.data._id);
        setUsername(res.data.username);
        setDuration(res.data.duration);
        setDescription(res.data.description);
        setDate(new Date(res.data.date.substring(0, 10)));
      })
      .catch((err) => console.log(err));

    axios
      .get("/api/users")
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((user) => user.username));
        }
      })
      .catch((err) => console.log(err));
  }, []);
  // componentDidMount() {

  // }

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      id: key,
      username: username,
      description: description,
      duration: duration,
      date: date,
    };
    console.log(`/api/exercises/update/${key}`);
    axios
      .post(`/api/exercises/update/${key}`, exercise)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    window.location = "/";
  };

  return (
    <div style={{ margin: 100 }}>
      <h1>Edit Exercise</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group col-lg-4 m-2">
          <label>Username:</label>
          <select
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group col-lg-4 m-2">
          <label>Desctription : </label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group col-lg-4 m-2">
          <label>Duration(in mins) : </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group col-lg-4 m-2">
          <label>Date : </label>
          <DatePicker
            className="form-control"
            selected={date}
            onChange={onChangeDate}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="edit ex log"
            className="btn btn-primary m-2"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
