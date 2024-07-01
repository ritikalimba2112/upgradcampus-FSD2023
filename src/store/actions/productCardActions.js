export const requestConfirmItemDeletion = (itemId) => {
   return {
      type: 'CONFIRMING_ITEM_DELETION',
      payload: itemId
   }
}
