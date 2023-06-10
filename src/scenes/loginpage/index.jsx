import React from "react";
import Navbar from "../navbar";
import FlexBetween from "../../components/FlexBetween";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

function Loginpage() {
  const theme = useTheme();

  const primaryLight = theme.palette.primary.light;

  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  console.log(isNonMobileScreen);
  return (
    <Box>
      <Box
        width={"100%"}
        backgroundColor={theme.palette.background.alt}
        textAlign={"center"}
        p={"1rem 6%"}
      >
        <Typography
          marginLeft={"50px"}
          fontWeight={"bold"}
          fontSize={"32px"}
          color={"primary"}
        >
          SocioPedia
        </Typography>
      </Box>



      <Box width={isNonMobileScreen  ? '50%' : '93%'}
      p ='2rem'
      m ="2rem auto"
      backgroundColor = {theme.palette.background.alt}
      borderRadius={'1.5rem'}>

        <Typography fontWeight={'500'} variant="h5" sx={{mb : '1.5rem'}}>
          Welocom to Sociopedia, the Social Media for Sociopaths
        </Typography>

        <Form></Form>
      </Box>
    </Box>
  );
}

export default Loginpage;
