import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { EditOutlined } from "@mui/icons-material";
import axios from "axios";
// import {Formi}
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import { Input } from "postcss";
import { useSelector } from "react-redux";
// import {DropS} from 'react-dropzone'

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginschema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const intialvalueRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const intialvalueLogin = {
  email: "",
  password: "",
};
function Form() {
  const [pagetype, setPageType] = useState("register");

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const islogin = pagetype === "login";
  // const isRegister = ;
  const isRegister = pagetype === "register";

  const state = useSelector((state) => state);

  const register = async (values, onSubmitProps) => {
    // form data will never display what you have sent in the form data object you need to see it by own
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picutrepath", values.picture.name);

    axios
      .post("http://localhost:3001/auth/register", formData)
      .then((res) => {
        onSubmitProps.resetForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const login = async (values, onSubmitProps) => {
    axios
      .post("http://localhost:3001/auth/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // this will send as the action paload data to the action
        dispatch(
          setLogin({
            user: res.data.user,
            token: res.data.token,
          })
        );
        navigate('/home')
        // console.log(state);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hadleformsubmit = async (values, onSubmitProps) => {
    // console.log("form triggered", values);
    if (islogin) await login(values, onSubmitProps);
    if (isRegister) {
      console.log("register triggered");
      await register(values, onSubmitProps);
    }
  };
  return (
    <Formik
      onSubmit={hadleformsubmit}
      initialValues={islogin ? intialvalueLogin : intialvalueRegister}
      validationSchema={islogin ? loginschema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
        onSubmitProps,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display={"grid"}
            gap={"30px"}
            gridTemplateColumns={"repeat(4 , minmax(0 , 1fr))"}
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />

                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />

                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />

                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />

                {/* drop zone */}
                <Box
                  gridColumn={"span 4"}
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius={"5px"}
                  padding={"1rem"}
                >
                  <Dropzone
                    acceptedFiles={".jpeg, .jpg, .png , .pdf"}
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      console.log(acceptedFiles);
                      setFieldValue("picture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        sx={{ "&:hover": { cursor: "pointer" } }}
                        padding={"1rem"}
                      >
                        <input {...getInputProps()}></input>
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlined></EditOutlined>
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Emal"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                gridColumn: "span 4",
              }}
            />

            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                gridColumn: "span 4",
              }}
            />
          </Box>

          {/* Buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": {
                  color: palette.primary.main,
                },
              }}
            >
              {islogin ? "Login" : "Register"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(islogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {islogin
                ? "Don't have an account ? Sign up here ."
                : "Already have an account ? Loign here"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default Form;
