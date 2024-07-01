const initalState = {
   product: {},
   loading: false,
   error: null
}

export const productDetailReducer = (state = initalState, action) => {
   switch (action.type) {
      case 'PRODUCT_DETAIL_REQUEST':
         return {
            ...state,
            loading: true
         }
      case 'PRODUCT_DETAIL_SUCCESS':
         return {
            ...state,
            loading: false,
            product: action.payload
         }
      case 'PRODUCT_DETAIL_FAIL':
         return {
            ...state,
            loading: false,
            error: action.payload
         }
      default:
         return state
   }
}