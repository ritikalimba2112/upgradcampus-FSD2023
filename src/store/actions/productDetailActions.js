import axios from "axios"

export const productDetailRequest = () => {
   return {
      type: "PRODUCT_DETAIL_REQUEST"
   }
}
export const productDetailSuccess = (data) => {
   return {
      type: "PRODUCT_DETAIL_SUCCESS",
      payload: data
   }
}
export const productDetailFail = (error) => {
   return {
      type: "PRODUCT_DETAIL_FAIL",
      payload: error
   }
}

export const fetchProductDetail = (id) => {
   return (dispatch) => {
      console.log('call API to get product detail');
      dispatch(productDetailRequest())
      axios.get(`http://localhost:8080/api/products/${id}`)
         .then(res => {
            dispatch(productDetailSuccess(res.data))
         })
         .catch(err => {
            dispatch(productDetailFail(err.message))
         })
   }
}