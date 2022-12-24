import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserAc, updateUsersAc } from "../redux/reducer";
import emptyHeart from "../UI/img/emptyHeart.png";
import heart from "../UI/img/heart.png";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // user properties
  const formik = useFormik({
    initialValues: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      country: user.country,
      phoneNumber: user.phoneNumber,
      email: user.email,
      website: user.website,
      image:
        "https://images.unsplash.com/photo-1565260524775-7e9b536fba2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      isFavorite: user.isFavorite || "",
    },
    validationSchema: yup.object().shape({
      firstName: yup
        .string()
        .required("Please, enter your name.")
        .max(12, "Your first name is too long")
        .min(2, "Your first name is too short")
        .matches(/[a-zA-Z]/, "Name can only contain Latin letters."),
      lastName: yup
        .string()
        .required("Please, enter your last name.")
        .max(12, "Your last last name is too long")
        .min(2, "Your last name is too short")
        .matches(/[a-zA-Z]/, "Last Name can only contain Latin letters."),
      city: yup
        .string()
        .required("Please, enter country.")
        .max(12, "Your city name is too long")
        .min(2, "Your last city is too short")
        .matches(/[a-zA-Z]/, "City can only contain Latin letters."),
      country: yup
        .string()
        .required("Please, enter your country")
        .max(12, "Your country is too long")
        .min(2, "Your country is too short")
        .matches(/[a-zA-Z]/, "Country can only contain Latin letters."),
      phoneNumber: yup
        .number()
        .required("Please, enter your phone number"),
      website: yup.string().required("Please, enter your website."),
    }),
  });

  const validationErrors = formik.errors;
  const isTouched = formik.touched;

  const saveChanges = (user) => {
      dispatch(setUserAc(user));
      alert("Successfully saved");
      navigate("/");
  };

  return (
    <section className="wrapper">
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          alignItems: "center",
          columnGap: "20px",
        }}
        className="detailsField"
      >
        <img
          src={user.image}
          alt="image"
          style={{ width: "200px", height: "150px" }}
        />
        <img
          src={user.isFavorite ? heart : emptyHeart}
          alt="empty heart"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <div style={{ width: "70%" }}>
        <div className="detailsField">
          <label className="label">
            First Name
            <input
              placeholder="First Name"
              className="input"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {validationErrors.firstName && isTouched.firstName ? (
              <p style={{ color: "red", marginTop: "5px" }}>
                {validationErrors.firstName}
              </p>
            ) : null}
          </label>
          <label className="label">
            Last Name
            <input
              placeholder="Last Name"
              type="text"
              className="input"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {validationErrors.lastName && isTouched.lastName ? (
              <p style={{ color: "red", marginTop: "5px" }}>
                {validationErrors.lastName}
              </p>
            ) : null}
          </label>
        </div>

        <div className="detailsField">
          <label className="label">
            City
            <input
              placeholder="City"
              type="text"
              className="input"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {validationErrors.city && isTouched.city ? (
              <p style={{ color: "red", marginTop: "5px" }}>
                {validationErrors.city}
              </p>
            ) : null}
          </label>
          <label className="label">
            Country
            <input
              placeholder="Country"
              type="text"
              className="input"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {validationErrors.country && isTouched.country ? (
              <p style={{ color: "red", marginTop: "5px" }}>
                {validationErrors.country}
              </p>
            ) : null}
          </label>
        </div>

        <div className="detailsField">
          <label className="label">
            Phone Number
            <input
              placeholder="Phone Number"
              type="text"
              className="input"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {validationErrors.phoneNumber && isTouched.phoneNumber ? (
              <p style={{ color: "red", marginTop: "5px" }}>
                {validationErrors.phoneNumber}
              </p>
            ) : null}
          </label>
          <label className="label">
            Email
            <input
              placeholder="Email"
              type="text"
              className="input"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {validationErrors.email && isTouched.email ? (
              <p style={{ color: "red", marginTop: "5px" }}>
                {validationErrors.email}
              </p>
            ) : null}
          </label>
        </div>

        <div className="detailsField">
          <label className="label">
            Website
            <input
              placeholder="Website"
              type="text"
              className="input"
              name="website"
              value={formik.values.website}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {validationErrors.website && isTouched.website ? (
              <p style={{ color: "red", marginTop: "5px" }}>
                {validationErrors.website}
              </p>
            ) : null}
          </label>
          <Button
            onClick={() => saveChanges(formik.values)}
            disabled={
                  formik.values.email &&
                  formik.values.firstName &&
                  formik.values.lastName &&
                  formik.values.city && 
                  formik.values.country && 
                    !validationErrors.email && 
                    !validationErrors.firstName && 
                    !validationErrors.lastName && 
                    !validationErrors.city && 
                    !validationErrors.country &&
                    !validationErrors.website &&
                    !validationErrors.phoneNumber
                  ? false
                  : true
            }
            variant="contained"
            style={{backgroundColor:"rgb(33, 33, 33)"}}
            
          >
            Save Contact
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
