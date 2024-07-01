import { deleteProduct } from "../../services/deleteProduct"
import { ToastContainer, toast } from 'react-toastify';


export const producListRequest = () => {
   return {
      type: "PRODUCT_LIST_REQUEST"
   }
}
export const producListSuccess = (data) => {
   return {
      type: "PRODUCT_LIST_SUCCESS",
      payload: data
   }
}
export const producListFail = (error) => {
   return {
      type: "PRODUCT_LIST_FAIL",
      payload: error
   }
}
export const confirmItemDeletion = (itemId) => {
   console.log(itemId, 'confirmed delete');
   return {
      type: "CONFIRMED_ITEM_DELETION",
      payload: itemId
   }
}
export const cancelItemDeletion = () => {
   return {
      type: "CANCEL_ITEM_DELETION"
   }
}
export const productDeletionSuccess = (productId) => {
   return {
      type: "PRODUCT_DELETION_SUCCESS",
      payload: productId
   }
}
export const productDeletionFail = (error) => {
   return {
      type: "PRODUCT_DELETION_FAIL",
      payload: error
   }
}

export const requestDeleteProduct = (productId) => {
   return (dispatch) => {
      return deleteProduct(productId).then((response) => {
         dispatch(productDeletionSuccess(productId))
      }).catch((error) => {
         dispatch(productDeletionFail(error))
      })
   }
}

export const fetchProductList = () => {
   return (dispatch) => {
      dispatch(producListRequest())
      fetch("http://localhost:8080/api/products")
         .then(res => res.json())
         .then(data => {
            dispatch(producListSuccess(data))
         })
         .catch(error => {
            dispatch(producListFail(error))
         })
   }
}