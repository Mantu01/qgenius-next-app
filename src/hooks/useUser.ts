'use client'

import { setUser } from "@/app/store/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

const GetUser=()=>{
  const dispatch=useDispatch();
  const {isAuthenticated,user}=useSelector((state:any)=>state.user);
  useEffect(()=>{
    const fetchData=async()=>{
      const {data}=await axios.get('/api/user/me');
      dispatch(setUser(data.data))
    }
    if(!isAuthenticated || !user){
      fetchData();
    }
  },[dispatch,isAuthenticated,user]);
  return null
}

export default GetUser;