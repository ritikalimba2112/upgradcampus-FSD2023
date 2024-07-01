const initialState = {
   searchItemName: ""
}
export const searchBarReducer = (state = initialState, action) => {
   switch (action.type) {
      case "SET_SEARCH_ITEM_NAME":
         return {
            ...state,
            searchItemName: action.payload
         }
      default:
         return state
   }
}