const initalState = {
   orderQuantity: null,
   product: null,
   step2valid: false,
   deriveryAddress: {
      "addressId": "",
      "name": "",
      "contactNumber": "",
      "street": "",
      "city": "",
      "state": "",
      "landmark": "",
      "zipcode": ""
   },
   order_complete: false,
   ordering_error: null
}

export const orderPageReducer = (state = initalState, action) => {
   switch (action.type) {
      case 'SET_ORDER_ITEM':
         return {
            ...state,
            orderQuantity: action.payload.orderQuantity,
            product: action.payload.product
         }
      case 'SET_STEP2_VALID':
         return {
            ...state,
            step2valid: action.payload
         }
      case 'SET_DELIVERY_ADDRESS':
         console.log("set delivery address")
         return {
            ...state,
            deriveryAddress: action.payload
         }
      case "ORDERING_REQUEST":
         return {
            ...state,
            order_complete: false,
            ordering_error: null
         }
      case "ORDERING_SUCCESS":
         return {
            ...state,
            order_complete: true,
            ordering_error: null
         }
      case "ORDERING_FAIL":
         return {
            ...state,
            order_complete: false,
            ordering_error: action.payload
         }
      default:
         return state
   }
}