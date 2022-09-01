import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpdateUser from "./UpdateUser";

const Home = (props) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const token = localStorage?.getItem("token");
  const [isUpdate, setIsUpdate] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    props.setToken(null);
    navigate("/sign-in");
  };
  const setUpdate = (value) => {
    setIsUpdate(value);
  };

  useEffect(() => {
    axios
      .get(`/userData?token=${token}`)
      .then((res) => {
        setUser(res?.data?.data);
      });
  }, [isUpdate]);
  return (
    <>
      {!isUpdate ? (
        <form>
          <h3>User details</h3>

          <div className="mb-3">
            <label>
              Name: <span className="text-muted">{user?.name}</span>
            </label>
          </div>

          <div className="mb-3">
            <label>
              Email: <span className="text-muted">{user?.email}</span>
            </label>
          </div>
          <div className="mb-3">
            <label>
              Phone:{" "}
              <span className="text-muted">
                {user?.phone || "Not available"}
              </span>
            </label>
          </div>
          <div className="mb-3">
            <label>
              DOB:{" "}
              <span className="text-muted">{user?.dob || "Not available"}</span>
            </label>
          </div>

          <div className="d-grid">
            <button
              onClick={() => setIsUpdate(true)}
              type="submit"
              className="btn btn-primary"
            >
              Update
            </button>
          </div>
          <p className="forgot-password text-right">
            <span
              role="button"
              className="text-primary cursor-pointer"
              onClick={() => handleLogout()}
            >
              Logout
            </span>
          </p>
        </form>
      ) : (
        <UpdateUser user={user} setUpdate={setUpdate} />
      )}
    </>
  );
};

export default Home;
