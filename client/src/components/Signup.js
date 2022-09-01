import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputErrorMessage, SignupValidation } from "../utils/SigninValidation";

const SignUp = (props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    status: "",
    data: "",
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupValidation,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        axios.post("/addUser", values).then((res) => {
          setMessage({
            status: res?.data?.status,
            data: res?.data?.message,
          });
          if (res?.data?.token) {
            localStorage.setItem("token", res?.data?.token);
            props.setToken(res?.data?.token);
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
          setLoading(false);
        });
      } catch (err) {
        setMessage({ status: 0, data: "Something went wrong" });
      }
    },
  });

  const handleChange = (e) => {
    e.preventDefault();
    formik.handleChange(e);
  };
  return (
    <form onSubmit={formik?.handleSubmit}>
      <h3>SignUp</h3>
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
        <label>Name</label>
        <input
          type="name"
          className={`form-control ${
            formik.touched.name && Boolean(formik.errors.name) ? "error" : ""
          }`}
          placeholder="Enter name"
          value={formik?.values?.name}
          onChange={handleChange}
          name="name"
        />
        <InputErrorMessage
          error={formik.touched.name && formik.errors.name}
          marginBottom={-15}
        />
      </div>

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
      <div className="mb-3">
        <label>Confirm Password</label>
        <input
          type="password"
          className={`form-control ${
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
              ? "error"
              : ""
          }`}
          placeholder="Confirm password"
          value={formik?.values?.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
        />
        <InputErrorMessage
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
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
        Old user <Link to="/sign-in">Signin?</Link>
      </p>
    </form>
  );
};

export default SignUp;
