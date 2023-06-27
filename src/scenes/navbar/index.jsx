import React from "react";
import { useState } from "react";
import {
  Box,
  Icon,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state/index";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

function Navbar() {
  const [isMobileMenuToggle, setisMobileMenuToggle] = useState(false);
  const dispatch = useDispatch();
  // console.log(dispatch)

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  // for the screen size
  const isNonMobileScreen = useMediaQuery("(min-width:1000px");
  const theme = useTheme();
  // console.log(theme);
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // const fullName = `${user.firstName} ${user.lastName}`
  return (
    <FlexBetween
      className=" px-[1rem] py-[1%]  "
      style={{
        background: alt,
      }}
    >
      {/* when the display of the main container is set to the flex than the width of the container inside the element will take that much space so that the content 
      inside it get wrap */}
      <FlexBetween style={{ gap: "1.75rem" }}>
        <Typography
          marginLeft={"50px"}
          fontWeight={"bold"}
          fontSize={"clamp(1rem , 2rem , 2.25rem)"}
          color={"primary"}
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          SocioPedia
        </Typography>

        {isNonMobileScreen && (
          <FlexBetween
            style={{
              gap: "3rem",
              padding: "0.1rem 1.5rem",
            }}
            className={`rounded-[9px] bg-slate-400`}
          >
            <InputBase placeholder="Search ...." />
            <IconButton>
              <Search></Search>
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* desktop Nav */}
      {isNonMobileScreen ? (
        <FlexBetween style={{ gap: "2rem", marginRight: "50px" }}>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }}></DarkMode>
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }}></LightMode>
            )}
          </IconButton>

          <Message sx={{ fontSize: "25px" }}></Message>
          <Notifications sx={{ fontSize: "25px" }}></Notifications>
          <Help sx={{ fontSize: "25px" }}></Help>
          <FormControl variant="standard" value="Yash Sinha">
            <Select
              value={"Yash Sinha"}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                padding: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
                // hello world !
              }}
              input={<InputBase />}
            >
              <MenuItem value={"Yash Sinha"}>
                <Typography>Yash Sinha</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (

        // setting the mobilemenu toggle as the true so that right sidebar open
        <IconButton onClick={() => setisMobileMenuToggle(!isMobileMenuToggle)}>
          <Menu />
        </IconButton>
      )}

      {/* mobile nav */}
      {/* jab vo toggle hoga tab yae navigation bar khulega */}

      {/* agar mobile menu tooglle hoga tab vo lagega na */}

      {!isNonMobileScreen && isMobileMenuToggle && (
        <Box
          position={"fixed"}
          right={"0"}
          bottom={0}
          height={"100%"}
          backgroundColor={background}
          maxwwidth={"500px"}
          minWidth={"300px"}
          zIndex={10}
        >
          {/* close Icon */}
          <Box display={"flex"} justifyContent={"flex-end"} p={"1rem"}>
            <IconButton
              onClick={() => setisMobileMenuToggle(!isMobileMenuToggle)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* menu items */}
          <FlexBetween
            style={{ gap: "3rem" }}
            className={"flex-col justify-center items-center"}
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }}></DarkMode>
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }}></LightMode>
              )}
            </IconButton>

            <Message sx={{ fontSize: "25px" }}></Message>
            <Notifications sx={{ fontSize: "25px" }}></Notifications>
            <Help sx={{ fontSize: "25px" }}></Help>
            <FormControl variant="standard" value="Yash Sinha">
              <Select
                value={"Yash Sinha"}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  padding: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={"Yash Sinha"}>
                  <Typography>Yash Sinha</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
}

export default Navbar;
