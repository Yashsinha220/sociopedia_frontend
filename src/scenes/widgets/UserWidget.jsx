import React from "react";
// import {Ma}
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserWidget({userId , picturePath}) {
    const[user , setUser] = useState(null)
    const {palette} = useTheme();
    const navigate = useNavigate();
    // taking the token from the state
    const token = useSelector((state)=>state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const state = useSelector((state)=>state.user)
    // console.log(state)
    const getUser = async ()=>{
        // const response = 
        // const id = ''
        console.log(state)
        axios.get(`http://localhost:3001/users/${state._id}` , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }


    useEffect(()=>{
        getUser()
    }, [])
  return(<div>Hello world</div>)
}

export default UserWidget;
