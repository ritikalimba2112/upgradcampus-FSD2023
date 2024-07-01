const initialState = {
   categories: [],
   isLoading: false,
   error: null,
   filterByCategory: "All"
}

export default (state = initialState, action) => {
   switch (action.type) {
      case "FETCH_CATEGORIES_REQUEST":
         return {
            ...state,
            isLoading: true,
            error: null
         }
      case "FETCH_CATEGORIES_SUCCESS":
         return {
            ...state,
            isLoading: false,
            categories: action.payload,
            error: null
         }
      case "FETCH_CATEGORIES_FAILED":
         return {
            ...state,
            isLoading: false,
            error: action.payload
         }
      case "SET_FILTER_BY_CATEGORY":
         console.log("Reducer- set category filter ")
         return {
            ...state,
            filterByCategory: action.payload
         }
      default:
         {
            return state
         }
   }

}