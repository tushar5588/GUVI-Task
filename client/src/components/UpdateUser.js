import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  InputErrorMessage,
  updateValiationSchema,
} from "../utils/SigninValidation";

const UpdateUser = (props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    status: "",
    data: "",
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      dob: "",
      phone: "",
      token: localStorage.getItem("token"),
    },
    validationSchema: updateValiationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        axios.post("/updateUser", values).then((res) => {
          if (res.status === 200) {
            setMessage({
              status: res?.data?.status,
              data: res?.data?.message,
            });
            setTimeout(() => {
              props.setUpdate(false);
            }, 1000);
            setLoading(false);
          }
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
  useEffect(() => {
    formik.values.name = props.user.name;
    formik.values.phone = props.user.phone;
    formik.values.dob = props.user.dob;
  }, []);

  return (
    <form onSubmit={formik?.handleSubmit}>
      <h3>Update details</h3>
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
        <label>Phone</label>
        <input
          type="text"
          className={`form-control ${
            formik.touched.phone && Boolean(formik.errors.phone) ? "error" : ""
          }`}
          placeholder="Enter phone"
          value={formik?.values?.phone}
          onChange={handleChange}
          name="phone"
          maxlength="10"
        />
        <InputErrorMessage
          error={formik.touched.phone && formik.errors.phone}
          marginBottom={-15}
        />
      </div>
      <div className="mb-3">
        <label>Dob</label>
        <input
          type="date"
          className={`form-control ${
            formik.touched.dob && Boolean(formik.errors.dob) ? "error" : ""
          }`}
          placeholder="Enter DOB"
          value={formik?.values?.dob}
          onChange={handleChange}
          name="dob"
        />
        <InputErrorMessage
          error={formik.touched.dob && formik.errors.dob}
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
        <span
          role="button"
          className="text-primary cursor-pointer"
          onClick={() => props.setUpdate(false)}
        >
          Homepage
        </span>
      </p>
    </form>
  );
};

export default UpdateUser;
