const initialState = {
   // ShortByMode = 0: Default no sorting
   // ShortByMode = 1: Sort by price high to low
   // ShortByMode = 2: Sort by price low to high
   // ShortByMode = 3: Sort by name A to Z

   shortByMode: 0
}

export const shortByReducer = (state = initialState, action) => {
   switch (action.type) {
      case "SET_SHORT_BY_MODE":
         return {
            ...state,
            shortByMode: action.payload
         }
      default:
         return state
   }
}