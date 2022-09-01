import { useFormik } from "formik";
import React, { useState, use } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { InputErrorMessage, SigninValidation } from "../utils/SigninValidation";
import axios from "axios";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    status: "",
    data: "",
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SigninValidation,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.post("/signin", values).then(async(res) => {
          setMessage({ status: res?.data?.status, data: res?.data?.message });
          if (res?.data?.token) {
            localStorage.setItem("token", res?.data?.token);
            props.setToken(res?.data?.token)
            setTimeout(()=>{
              navigate("/");
            },1000)
           
          }
          setLoading(false);
        });
      } catch (err) {
        setMessage({ status: 0, data: "Something went wrong" });
        setLoading(false);
      }
    },
  });
  const handleChange = (e) => {
    e.preventDefault();
    formik.handleChange(e);
  };
  return (
    <form onSubmit={formik?.handleSubmit}>
      <h3>Sign In</h3>
      {message.data && (
        <div
          className={`alert ${
            message?.status === 1 ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {message?.data}
        </div>
      )}
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className={`form-control ${
            formik.touched.email && Boolean(formik.errors.email) ? "error" : ""
          }`}
          placeholder="Enter email"
          value={formik?.values?.email}
          onChange={handleChange}
          name="email"
        />
        <InputErrorMessage
          error={formik.touched.email && formik.errors.email}
          marginBottom={-15}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className={`form-control ${
            formik.touched.password && Boolean(formik.errors.password)
              ? "error"
              : ""
          }`}
          placeholder="Enter password"
          value={formik?.values?.password}
          onChange={handleChange}
          name="password"
        />
        <InputErrorMessage
          error={formik.touched.password && formik.errors.password}
          marginBottom={-15}
        />
      </div>

      <div className="d-grid">
        <button disabled={loading} type="submit" className="btn btn-primary">
          {loading ? (
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>
      <p className="forgot-password text-right">
        New user <Link to="/sign-up">Registration?</Link>
      </p>
    </form>
  );
};

export default Login;
