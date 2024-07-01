import React, { Fragment } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { Grid } from '@mui/material'
import { connect } from 'react-redux'
import { fetchProductList, confirmItemDeletion, cancelItemDeletion } from "../../store/actions/productListActions"
import { useEffect } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'
import { requestDeleteProduct } from "../../store/actions/productListActions"
import { ToastContainer, toast } from 'react-toastify';

const ProductGrid = ({ products, isAdmin, filterByCategory, sortByMode, searchItemName, openDlgCofirmDelete, onConfirmItemDeletion, itemIdToDelete, onRequestDeleteProduct, error, onCancelItemDeletion, onfetchProductList }) => {
   const [dlgOpen, setDlgOpen] = React.useState(false);
   const [deletePromise, setDeletePromise] = React.useState(null);
   useEffect(() => {
      onfetchProductList()
   }, [filterByCategory, sortByMode, searchItemName])
   let filteredProducts = (filterByCategory === "All") ? products : products.filter((product) => product.category === filterByCategory)
   switch (sortByMode) {
      case 1:
         filteredProducts = filteredProducts.sort((a, b) => b.price - a.price)
         break;
      case 2:
         filteredProducts = filteredProducts.sort((a, b) => a.price - b.price)
         break;
      case 3:
         filteredProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
         break;
      default:
         break;
   }
   filteredProducts = filteredProducts.filter((product) => product.name.toLowerCase().includes(searchItemName.toLowerCase()))
   const handleClose = () => {
   };
   useEffect(() => {
      if (openDlgCofirmDelete) {
         setDlgOpen(true)
      }
   }, [openDlgCofirmDelete])

   let handleCloseDlg = (userChoice) => {
      setDlgOpen(false)
      if (userChoice) {
         console.log('confirmed deletion');
         onConfirmItemDeletion(itemIdToDelete)
         setDeletePromise(onRequestDeleteProduct(itemIdToDelete))
      }
      else {
         console.log('declined deletion');
         onCancelItemDeletion()
      }
   }
   useEffect(() => {
      if (deletePromise) {
         toast.promise(deletePromise, {
            success: "Product deleted successfully",
            error: error
         })
      }
   }, [deletePromise])



   return (
      <Fragment>
         <ToastContainer />
         <Dialog
            open={dlgOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title">
               {"Do you really want to delete this item?"}
            </DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  Please confirm deletion?
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => handleCloseDlg(false)}>Cancel</Button>
               <Button onClick={() => handleCloseDlg(true)} autoFocus> Confirm </Button>
            </DialogActions>
         </Dialog>

         <Grid container spacing={3} gridAutoRows={1}>

            {filteredProducts.map((product) => {
               return (
                  <Grid item xs={4}>
                     <ProductCard key={product.id} product={product} isAdmin={isAdmin} />
                  </Grid>
               )
            })}
         </Grid>
      </Fragment>
   )
}

let mapStateToProps = (state) => {
   return {
      products: state.productList.products,
      isAdmin: state.auth.isAdmin,
      filterByCategory: state.categories.filterByCategory,
      sortByMode: state.shortBy.shortByMode,
      searchItemName: state.searchBar.searchItemName,
      openDlgCofirmDelete: state.productList.openDlgCofirmDelete,
      itemIdToDelete: state.productList.itemIdToDelete,
      error: state.productList.error
   }
}
let mapDispatchToProps = (dispatch) => {
   return {
      onfetchProductList: () => dispatch(fetchProductList()),
      onConfirmItemDeletion: (id) => dispatch(confirmItemDeletion(id)),
      onCancelItemDeletion: () => dispatch(cancelItemDeletion()),
      onRequestDeleteProduct: (productId) => dispatch(requestDeleteProduct(productId))
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid)