import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DeleteUser = (props) => {
  const [users, setUsers] = useState([{}]);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((user) => user));
          setUserInfo(users[0]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setUserInfo(users[0]);
  }, [users]);

  const onSubmit = (e) => {
    e.preventDefault();
    const id = userInfo._id;

    axios
      .delete("/api/users/" + id)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
    setUsers(users.filter((user) => user._id !== id));
  };

  const onChangeUserInfo = (e) => {
    setUserInfo(users.filter((user) => user.username == e.target.value)[0]);
    console.log(userInfo);
  };

  return (
    <div style={{ margin: 100 }}>
      <h1>Delete User</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group col-lg-4 m-2">
          <label>Username:</label>
          <select
            required
            className="form-control"
            value={userInfo.username}
            onChange={onChangeUserInfo}
          >
            {users.map((user) => {
              return (
                <option key={user._id} value={user.username}>
                  {user.username}
                </option>
              );
            })}
          </select>

          <div className="form-group ">
            <input
              type="submit"
              value="delete user"
              className="btn btn-danger m-2"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeleteUser;
