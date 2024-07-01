const initialState = {
   savedAddresses: [],
   loading: false,
   error: null
}
export const addressFormReducer = (state = initialState, action) => {
   switch (action.type) {
      case "SAVE_ADDRESS_REQUEST":
         return {
            ...state,
            loading: true
         }
      case "SAVE_ADDRESS_SUCCESS":
         return {
            ...state,
            loading: false,
            savedAddresses: action.payload
         }
      case "SAVE_ADDRESS_FAIL":
         return {
            ...state,
            loading: false,
            error: action.payload
         }
      case "ADD_NEW_ADDRESS_REQUEST":
         return {
            ...state,
            loading: true,
            error: null
         }
      case "ADD_NEW_ADDRESS_SUCCESS":
         return {
            ...state,
            loading: false,
            error: null
         }
      case "ADD_NEW_ADDRESS_FAIL":
         return {
            ...state,
            loading: false,
            error: action.payload
         }
      default:
         return state
   }
}