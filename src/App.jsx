import { useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
// import {}
import "./App.css";
import HomePage from "./scenes/homepage";
import Loginpage from "./scenes/loginpage";
import ProfilePage from "./scenes/profilepage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../theme";
import Navbar from "./scenes/navbar";

function App() {
  // useselector is used to extract the value from the state
  // here fetching the recent mode of the app from the state
  const mode = useSelector((state) => state.mode);
  // usememo catch the data that performance is done
  // creating the the theme according to the mode



  // here we are sending the mode for setting the mode and changing the colro
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  console.log;

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* the css baseline will reset the css of the app */}
          <CssBaseline />

          <Routes>
            <Route path="/" element={<Loginpage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/profile/:userId" element={<ProfilePage />}></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
