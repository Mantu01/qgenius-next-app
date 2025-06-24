'use client'

import {setUser } from "@/app/store/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { usePathname, useRouter } from "next/navigation";

const GetUser=()=>{
  const dispatch=useDispatch();
  const router=useRouter();
  const pathname=usePathname();
  const {isAuthenticated,user}=useSelector((state:RootState)=>state.user);
  useEffect(()=>{
    const fetchData=async()=>{
      const {data}=await axios.get('/api/user/me');
      dispatch(setUser(data.data))
    }
    if(pathname!=='/verification/email' && (!isAuthenticated || !user)){
      console.log(pathname)
      fetchData();
    }
    if(user && !user.isVerified){
      router.push('/unverified')
    }
  },[dispatch,isAuthenticated,user,router,pathname]);
  return null
}

export default GetUser;