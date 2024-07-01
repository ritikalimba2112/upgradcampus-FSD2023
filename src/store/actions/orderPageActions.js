import axios from 'axios'
import { toast } from 'react-toastify'
export const orderingRequest = () => {
   return {
      type: "ORDERING_REQUEST"
   }
}
export const orderingSuccess = (data) => {
   return {
      type: "ORDERING_SUCCESS",
      payload: data
   }
}
export const orderingFail = (error) => {
   return {
      type: "ORDERING_FAIL",
      payload: error
   }
}
export const postRequestOrdering = (data) => {
   return (dispatch) => {
      dispatch(orderingRequest())
      data = { ...data, user: localStorage.getItem('userId') }
      let request = axios.post(`http://localhost:8080/api/orders`, data, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
         .then(res => {
            dispatch(orderingSuccess(res.data))
         })
      toast.promise(request, {
         success: 'Order placed successfully!',
         error: 'Order fail!'
      })

   }
}