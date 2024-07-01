import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { FormControl, TextField, Button } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import { connect } from 'react-redux'
import { fetchCategories } from '../store/actions/productModActions';
import { Alert } from '@mui/material';
import { requestPostAddProduct, formReset } from '../store/actions/addProductAction';
import { useParams } from 'react-router-dom';
import { fetchProductDetail } from '../store/actions/productDetailActions';
import { RequestPutmodifyProduct } from '../store/actions/modifyProductAction';
import "./ProductMod.css"
import { Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

let demoEmptyProduct = {
   name: "",
   category: "",
   price: "",
   manufacturer: "",
   availableItem: "",
   imageUrl: "",
   description: ""
}

const ProductModForm = ({ categories, error, productAdded, onFetchCategories, onFetchProductDetail, productToEdit, product = demoEmptyProduct, onRequestPostAddProduct, onFormReset, onRequestPutmodifyProduct }) => {
   //META DATA FORM FOR PRODUCT
   // LEAVE THE ID EMPTY FOR ADD PRODUCT
   // FILL THE ID FOR EDIT PRODUCT
   // create a controlled form with material ui to add product with name, category,price,manufacturer,availableItem,price,imageUrl,description
   const productId = useParams().id
   let [productIdToEdit, setProductIdToEdit] = useState(productId)
   let [mode, setMode] = useState(productId ? 'edit' : 'add')
   let [name, setName] = useState("")
   let [availableCategories, setAvailableCategories] = useState("")
   let [category, setCategory] = useState("")
   let [price, setPrice] = useState("")
   let [manufacturer, setManufacturer] = useState("")
   let [availableItem, setAvailableItem] = useState("")
   let [imageUrl, setImageUrl] = useState("")
   let [description, setDescription] = useState("")
   console.log(productId);
   useEffect(() => {
      if (productId !== undefined) {
         onFetchProductDetail(productId)
      }
   }, [])
   useEffect(() => {
      console.log('get product info from db');
      console.log(productToEdit);
      setName(productToEdit.name)
      setCategory(productToEdit.category)
      setPrice(productToEdit.price)
      setManufacturer(productToEdit.manufacturer)
      setAvailableItem(productToEdit.availableItems)
      setImageUrl(productToEdit.imageUrl)
      setDescription(productToEdit.description)

   }, [productToEdit])


   // let [error, setError] = useState('')
   let [nameError, setNameError] = useState('')
   let [categoryError, setCategoryError] = useState('')
   let [priceError, setPriceError] = useState('')
   let [availableItemError, setAvailableItemError] = useState('')
   let [manufacturerError, setManufacturerError] = useState('')
   let [imageUrlError, setImageUrlError] = useState('')
   let [descriptionError, setDescriptionError] = useState('')

   let handleSubmit = (e) => {
      e.preventDefault()
      let errorFlag = false
      //name cannot be empty
      if (!name) {
         setNameError('Name cannot be empty')
         errorFlag = true
      }
      else {
         setNameError('')
      }
      if (!categories) {
         setCategoryError('Category cannot be empty')
         errorFlag = true
      }
      //price must be number
      if (isNaN(price) | !price) {
         setPriceError('Price must be a number')
         errorFlag = true
      }
      else {
         setPriceError('')
      }
      //availableItem must be number
      if (isNaN(availableItem) | !availableItem) {
         setAvailableItemError('Available Item must be a number')
         errorFlag = true
      }
      else {
         setAvailableItemError('')
      }
      //category cannot be empty
      if (!category) {
         setCategoryError('Category cannot be empty')
         errorFlag = true
      }
      else {
         setCategoryError('')
      }
      //manufacturer cannot be empty
      if (!manufacturer) {
         setManufacturerError('Manufacturer cannot be empty')
         errorFlag = true
      }
      //imageUrl must be a valid url
      if (!imageUrl) {
         setImageUrlError('Image URL cannot be empty')
         errorFlag = true
      }
      else {
         setImageUrlError('')
      }
      //description cannot be empty
      if (!description) {
         setDescriptionError('Description cannot be empty')
         errorFlag = true
      }
      else {
         setDescriptionError('')
      }
      //if error, return
      if (errorFlag) {
         return
      }
      let product = {
         "name": name,
         "category": category,
         "price": price,
         "manufacturer": manufacturer,
         "availableItems": availableItem,
         "imageUrl": imageUrl,
         "description": description
      }
      if (mode === "add") {
         onRequestPostAddProduct(product)
         return
      }
      if (mode === "edit") {
         console.log('edit product');
         onRequestPutmodifyProduct(productIdToEdit, product)

      }

   }
   const handleCategorySelectionChange = (value, actionMeta) => {

      if (value === null) {
         setCategory('')
         return
      }
      console.log(value.value);
      setCategory(value.value)
   }


   useEffect(() => {
      onFetchCategories()
   }, [])

   useEffect(() => {
      //convert categories to array of objects for react-select

      setAvailableCategories(
         categories.map((category) => {
            return { value: category, label: category }
         }
         ))
   }, [categories])
   const showError = () => {
      console.log(error.message)
      toast.error('Cannot added product!', {
         position: toast.POSITION.TOP_RIGHT
      });
   };

   useEffect(() => {
      if (error) {
         showError();
      }
   }, [error]);

   useEffect(() => {
      if (productAdded) {
         let promptMode = mode === "add" ? "added" : "modified"
         toast.success(`Product ${name} ` + promptMode + " successfully!")
         if (mode === "add") {
            clearForm()
         }
         onFormReset()
      }
   }, [productAdded])
   let clearForm = () => {
      setName('')
      setCategory('')
      setPrice('')
      setManufacturer('')
      setAvailableItem('')
      setImageUrl('')
      setDescription('')
   }

   return (
      <Fragment>


         <ToastContainer />
         <Box display="flex" style={{ "justifyContent": "center" }}>
            <FormControl className="ProductModFullForm">
               <Stack direction="row" spacing={2} display="flex" style={{ "justifyContent": "center" }}>
                  <AppRegistrationIcon
                     className='ProductIcon' fontSize="small" />
                  <Typography variant="h6" gutterBottom> {mode === "add" ? "Add Product" : "Edit Product"}</Typography>
               </Stack>

               {/* Create input field for each state */}
               <TextField
                  className="Input"
                  error={nameError != ""}
                  helperText={nameError}
                  id="name"
                  label="Name *"
                  value={name}
                  onChange={(e) =>
                     setName(e.target.value)} />
               {mode === "add" ?
                  <CreatableSelect
                     className="CreatableSelect"
                     isClearable options={availableCategories}
                     onChange={handleCategorySelectionChange} /> :
                  <TextField
                     className="Input"
                     id="category"
                     label="Category"
                     value={category}
                     onChange={(e) => setCategory(e.target.value)} />}
               {
                  categoryError != "" ?
                     <Alert severity="error">{categoryError}</Alert> :
                     null
               }
               <TextField
                  className="Input"
                  error={priceError != ""}
                  helperText={priceError}
                  id="price"
                  label="Price *"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)} />
               <TextField
                  className="Input"
                  error={manufacturerError != ""}
                  helperText={manufacturerError}
                  id="manufacturer"
                  label="Manufacturer *"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)} />
               <TextField
                  className="Input"
                  error={availableItemError != ""}
                  helperText={availableItemError}
                  id="availableItem"
                  label="Available Item *"
                  value={availableItem}
                  onChange={(e) => setAvailableItem(e.target.value)} />
               <TextField
                  className="Input"
                  error={imageUrlError != ""}
                  helperText={imageUrlError}
                  id="imageUrl"
                  label="Image Url *"
                  value={imageUrl}
                  onChange={(e) =>
                     setImageUrl(e.target.value)} />
               <img
                  src={imageUrl}
                  style={{ "maxWidth": 200 }} />
               <TextField
                  className="Input"
                  error={descriptionError != ""}
                  helperText={descriptionError}
                  id="description"
                  label="Description *"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} />


               <Button
                  className='SubmitBtn'
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}>
                  {mode === "add" ? "SAVE PRODUCT" : "MODIFY PRODUCT"}
               </Button>
            </FormControl>
         </Box>
      </Fragment>
   )
}

let mapStateToProps = (globalState) => {
   return {
      categories: globalState.productMod.categories,
      error: globalState.productMod.error,
      productAdded: globalState.productMod.productAdded,
      productToEdit: globalState.productDetail.product
   }
}
let mapDispatchToProps = (dispatch) => {
   return {
      onFetchCategories: () => dispatch(fetchCategories()),
      onRequestPostAddProduct: (product) => dispatch(requestPostAddProduct(product)),
      onFormReset: () => dispatch(formReset()),
      onFetchProductDetail: (id) => dispatch(fetchProductDetail(id)),
      onRequestPutmodifyProduct: (productId, productDetail) => dispatch(RequestPutmodifyProduct(productId, productDetail))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductModForm)