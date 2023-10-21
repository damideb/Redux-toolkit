import React, { useEffect, useRef } from "react";
import {useDispatch, useSelector} from "react-redux"
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/notification";
import { UIActions } from "./store/UI_slice";


function App() {
const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
const cart = useSelector(state=>state.cart)
const notification = useSelector(state=>state.ui.notification)
const dispatch= useDispatch()
let firstRender = useRef(true)

useEffect(()=>{
  if(firstRender.current){
    firstRender.current =false;
    return
  }
  const sendReq = async()=>{
    //send sending request state
    dispatch(UIActions.showNotification({
      open:true,
      message:"Sending Requests",
      type:"warning"
    }))

    const res =  await fetch("https://redux-http-1d9aa-default-rtdb.firebaseio.com/cartitems.json",{
      method:"PUT",
      body:JSON.stringify(cart)
    });
    const data = await res.json()
    dispatch(UIActions.showNotification({
      open:true,
      message:"Request sent successfully",
      type:"success"
    }))
  };
  sendReq().catch(err=>{
    dispatch(UIActions.showNotification({
      open:true,
      message:" Request failed",
      type:"error"
    }))
  })
   
},[cart.itemsList])
  return (
    <div className="App">
{  notification &&  <Notification type={notification.type} message={notification.message}/>}
    { !isLoggedIn && <Auth />}
      {isLoggedIn && <Layout /> }
    </div>
  );
}

export default App;
