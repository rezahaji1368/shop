import { createContext,useContext, useEffect, useReducer, useState } from "react";
// import { loginUserReducer } from "./loginUserReducer";
const userContext=createContext();
const userContextDispatcher=createContext()
// const initialState={}
const UserProviders = ({children}) => {
  const [state,setState]=useState(false)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('login'))||false;
    setState(user)
  },[])
  // useEffect(()=>{
  //   const data=JSON.stringify(state)
  //   localStorage.setItem("login",data)
  // },[state])
    return ( <userContext.Provider value={state}>
        <userContextDispatcher.Provider value={setState}>
          {children}
        </userContextDispatcher.Provider>
    </userContext.Provider> );
}
 
export default UserProviders;
export const useUsers=()=>useContext(userContext)
export const useUsersActions=()=>useContext(userContextDispatcher)