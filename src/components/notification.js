import React from 'react';
import{Alert} from '@mui/material'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { UIActions } from '../store/UI_slice';

function Notification({type, message}) {
  
    const notification = useSelector(state=>state.ui.Notification)
    const dispatch = useDispatch()

    const handleClose = ()=>{
        dispatch(UIActions.showNotification())
    }
  return (
    <div>
{  notification.open &&  <Alert onClose={handleClose} severity={type}>{message}</Alert>}
    </div>
  );
}

export default Notification;
