import React, { useEffect, useRef } from "react";
import {useDispatch, useSelector} from "react-redux"
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/notification";
import { sendCartdata } from "./store/UI_slice";
import { getData } from "./store/cartSlice";


function App() {
const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
const cart = useSelector(state=>state.cart)
const notification = useSelector(state=>state.ui.Notification)
const dispatch= useDispatch()
let firstRender = useRef(true)


useEffect(()=>{
  dispatch(getData())
},[dispatch])

useEffect(()=>{
  if(firstRender.current){
    firstRender.current =false;
    return
  }
dispatch(sendCartdata(cart))

},[cart,dispatch])
  return (
    <div className="App">
{  notification &&  <Notification type={notification.type} message={notification.message}/>}
    { !isLoggedIn && <Auth />}
      {isLoggedIn && <Layout /> }
    </div>
  );
}

export default App;
