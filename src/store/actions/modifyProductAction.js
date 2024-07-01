import { modifyProduct } from "../../services/modifyProduct";
export const modifyNewProductSuccess = () => {
   return {
      type: "MODIFY_NEW_PRODUCT_SUCCESS"
   }
}
export const modifyNewProductFail = (error) => {
   return {
      type: "MODIFY_NEW_PRODUCT_FAIL",
      payload: error
   }
}

export const formReset = () => {
   return {
      type: "FORM_RESET"
   }
}


export const RequestPutmodifyProduct = (productId, productDetail) => {
   return (dispatch) => {

      return modifyProduct(productId, productDetail).then((response) => {
         dispatch(modifyNewProductSuccess())
      }).catch((error) => {
         dispatch(modifyNewProductFail(error))
      })
   }
}