let initialState = {
   categories: [],
   isLoading: false,
   productAdded: false,
   error: null
}

export default function addProductReducer(state = initialState, action) {
   switch (action.type) {
      case "FETCH_CATEGORIES_SUCCESS":
         return {
            ...state,
            categories: action.payload,
            isLoading: false,
            error: null
         }
      case "FETCH_CATEGORIES_FAILED":
         return {
            ...state,
            categories: [],
            isLoading: false,
            error: action.payload
         }
      case "ADD_NEW_PRODUCT_SUCCESS":
         return {
            ...state,
            error: null,
            productAdded: true
         }
      case "ADD_NEW_PRODUCT_FAIL":
         return {
            ...state,
            error: action.payload
         }
      case "MODIFY_NEW_PRODUCT_SUCCESS":
         return {
            ...state,
            error: null,
            productAdded: true
         }
      case "MODIFY_NEW_PRODUCT_FAIL":
         return {
            ...state,
            error: action.payload
         }
      case "FORM_RESET":
         return {
            ...state,
            productAdded: false,
            error: null
         }
      default:
         return state
   }
}