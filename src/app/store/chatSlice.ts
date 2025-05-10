import { createSlice } from "@reduxjs/toolkit";

const initialState={
  chat:[],
  selectedChat:null
};

const chatSlice=createSlice({
  name:'chat',
  initialState,
  reducers:{
    addChat:(state,action)=>{
      state.chat.push(action.payload);
    },
    setChat:(state,action)=>{
      state.selectedChat=action.payload;
    },
    removeChat:(state)=>{
      state.selectedChat=null;
    }
  }
});

export const {addChat,setChat,removeChat}=chatSlice.actions;
export default chatSlice.reducer;