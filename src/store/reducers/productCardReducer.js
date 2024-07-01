// let initialState = {
//    productid2delete: null,
//    confirmingDeletion: false,
//    confirmedDeletion: false,
//    canceledDeletion: false
// }
// const productCardReducer = (state = initialState, action) => {
//    switch (action.type) {
//       case 'CONFIRMING_ITEM_DELETION':
//          return {
//             ...state,
//             productid2delete: action.payload,
//             confirmingDeletion: true,
//             confirmedDeletion: false,
//             canceledDeletion: false
//          }
//       case 'CONFIRMED_ITEM_DELETION':
//          //perform API call for deletion
//          console.log("Calling API to delete item with id: " + state.productid2delete)
//          return {
//             ...state,
//             confirmingDeletion: false,
//             confirmedDeletion: true,
//             canceledDeletion: false
//          }
//       case 'CANCELED_ITEM_DELETION':
//          return {
//             ...state,
//             productid2delete: null,
//             confirmingDeletion: false,
//             confirmedDeletion: false,
//             canceledDeletion: true
//          }
//       default:
//          return state
//    }
// }
// export default productCardReducer