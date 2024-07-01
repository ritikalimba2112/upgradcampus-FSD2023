import axios from 'axios'
import { toast } from 'react-toastify'
//define action to fetch saved address and push new address via API call
export const saveAddressRequest = () => {
   return {
      type: "SAVE_ADDRESS_REQUEST"
   }
}
export const saveAddressSuccess = (data) => {
   return {
      type: "SAVE_ADDRESS_SUCCESS",
      payload: data
   }
}
export const saveAddressFail = (error) => {
   return {
      type: "SAVE_ADDRESS_FAIL",
      payload: error
   }
}
export const addNewAddressRequest = () => {
   return {
      type: "ADD_NEW_ADDRESS_REQUEST",
   }
}
export const addNewAddressSuccess = (data) => {
   return {
      type: "ADD_NEW_ADDRESS_SUCCESS",
      payload: data
   }
}
export const addNewAddressFail = (error) => {
   return {
      type: "ADD_NEW_ADDRESS_FAIL",
      payload: error
   }
}
export const setStep2Valid = (data) => {
   return {
      type: "SET_STEP2_VALID",
      payload: data
   }
}
export const setDeviveryAddress = (data) => {
   return {
      type: "SET_DELIVERY_ADDRESS",
      payload: data
   }
}


export const fetchSavedAddress = () => {
   return (dispatch) => {
      dispatch(saveAddressRequest())
      axios.get(`http://localhost:8080/api/addresses`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
         .then(res => {
            dispatch(saveAddressSuccess(res.data))
         })
         .catch(err => {
            dispatch(saveAddressFail(err.message))
         })
   }
}
export const postNewAddress = (data) => {
   return (dispatch) => {
      dispatch(addNewAddressRequest())
      data = { ...data, user: localStorage.getItem('userId') }
      let request = axios.post(`http://localhost:8080/api/addresses`, data, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
         .then(res => {
            dispatch(addNewAddressSuccess(res.data))
         })
      toast.promise(request, {
         pending: 'Adding new address...',
         success: 'New address added successfully!',
         error: 'Failed to add new address',
      })
   }
}