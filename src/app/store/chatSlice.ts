import { createSlice } from "@reduxjs/toolkit";

interface chatMsg{
  chat:Message[];
  selectedChat:string | null
}

const initialState:chatMsg={
  chat:[],
  selectedChat:null
};

const chatSlice=createSlice({
  name:'chat',
  initialState,
  reducers:{
    initChat:(state,action)=>{
      state.chat=action.payload;
    },
    addChat:(state,action)=>{
      const newChat=action.payload;
      const latestChat=state.chat[state.chat.length-1];
      if(newChat.role===latestChat?.role){
        state.chat[state.chat.length-1].content=newChat.Content;
      }else{
        state.chat.push(newChat);
      }
    },
    removeChat:(state)=>{
      state.chat=[];
      state.selectedChat=null;
    },
    setSelctedChat:(state,action)=>{
      console.log(action.payload)
      state.selectedChat=action.payload;
    }
  }
});

export const {addChat,removeChat,setSelctedChat,initChat}=chatSlice.actions;
export default chatSlice.reducer;