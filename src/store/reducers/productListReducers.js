
const initalState = {
   products: [],
   loading: false,
   error: null,
   filterByCategory: null,
   sortByMode: null,
   openDlgCofirmDelete: false,
   itemIdToDelete: null
}


export const productListReducer = (state = initalState, action) => {
   switch (action.type) {
      case 'PRODUCT_LIST_REQUEST':
         return {
            ...state,
            loading: true
         }
      case 'PRODUCT_LIST_SUCCESS':
         return {
            ...state,
            loading: false,
            products: action.payload
         }
      case 'PRODUCT_LIST_FAIL':
         return {
            ...state,
            loading: false,
            error: action.payload
         }
      case "CONFIRMING_ITEM_DELETION":
         console.log(action.payload, 'confirming item deletion');
         return {
            ...state,
            openDlgCofirmDelete: true,
            itemIdToDelete: action.payload
         }
      case "CONFIRMED_ITEM_DELETION":
         return {
            ...state,
            openDlgCofirmDelete: false,
            itemIdToDelete: action.payload
         }
      case "PRODUCT_DELETION_SUCCESS":
         window.location.reload();
         return {
            ...state,
            products: state.products.filter(item => item.id !== action.payload.id),
            itemIdToDelete: null,
         }
      case "PRODUCT_DELETION_FAIL":
         return {
            ...state,
            error: action.payload
         }
      case "CANCEL_ITEM_DELETION":
         return {
            ...state,
            openDlgCofirmDelete: false,
            itemIdToDelete: null
         }
      default:
         return state
   }
}