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
// import {Formi}
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
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
  const { pagetype, setPageType } = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const islogin = pagetype === "login";
  const isRegister = pagetype === "register";

  const hadleformsubmit = async (values, onSubmitProps) => {};
  return;
  <Formik
    onSubmit={hadleformsubmit}
    isInitialValid={islogin ? intialvalueLogin : intialvalueRegister}
    validationSchema={islogin ? loginschema : registerSchema}
  >
    {({
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      setFieldvalue,
      resetForm,
    }) => (
      <form onSubmit={handleSubmit}>
        <Box
          display={"grid"}
          gap={"30px"}
          gridTemplateColumns={"repeat(4 , minmax(0 , 1fr))"}
        ></Box>
      </form>
    )}
  </Formik>;
}

export default Form;
