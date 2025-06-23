'use client'

import { clearUser, setUser } from "@/app/store/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useRouter } from "next/navigation";

const GetUser=()=>{
  const dispatch=useDispatch();
  const router=useRouter();
  const params=useParams();
  console.log({...params})
  const {isAuthenticated,user}=useSelector((state:RootState)=>state.user);
  useEffect(()=>{
    const fetchData=async()=>{
      const {data}=await axios.get('/api/user/me');
      dispatch(setUser(data.data))
    }
    if(!isAuthenticated || !user){
      fetchData();
    }
    if(user && !user.isVerified){
      router.push('/unverified')
      axios.get('/api/auth/logout').then(()=>dispatch(clearUser()))
    }
  },[dispatch,isAuthenticated,user,router]);
  return null
}

export default GetUser;