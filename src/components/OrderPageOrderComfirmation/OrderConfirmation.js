import React from 'react'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import { Grid, Stack, Typography } from '@mui/material'

const OrderConfirmation = ({ orderQuantity, product, deliveryAddress }) => {
   console.log("Confirmation", deliveryAddress)
   return (
      <Fragment>
         {console.log(deliveryAddress)}
         <Grid container spacing={2}>
            <Grid item xs={8}>
               <Stack spacing={2} direction='column'>
                  <Typography
                     className="ProductName"
                     variant="h5"
                     textAlign={'left'}>
                     {product.name}
                  </Typography>
                  <Typography
                     variant="body"
                     textAlign={'left'}>
                     Quantity: {orderQuantity}
                  </Typography>
                  <Typography
                     variant="body"
                     textAlign={'left'}>
                     Category: {product.category}
                  </Typography>
                  <Typography
                     variant="body"
                     textAlign={'left'}>
                     {product.description}
                  </Typography>
                  <Typography
                     variant="h6"
                     textAlign={'left'}
                     style={{ "color": "#ee2c3c" }}>
                     Total Price: $ {orderQuantity * product.price}
                  </Typography>
               </Stack>
            </Grid>
            <Grid
               item
               xs={4}
               className="AddressConfirm">
               <Stack
                  spacing={2}
                  direction='column'>
                  <Typography
                     variant="h6"
                     textAlign={'left'}>
                     Address Details
                  </Typography>
                  <Typography
                     variant="body"
                     textAlign={'left'}>
                     Name: {deliveryAddress.name}
                  </Typography>
                  <Typography
                     variant="body"
                     textAlign={'left'}>
                     Contact Number: {deliveryAddress.contactNumber}
                  </Typography>
                  <Typography
                     variant="body"
                     textAlign={'left'}>
                     {deliveryAddress.landmark}
                  </Typography>
                  <Typography
                     variant="body"
                     textAlign={'left'}>
                     {deliveryAddress.street}
                  </Typography>
                  <Typography
                     variant="body"
                     textAlign={'left'}>
                     {deliveryAddress.city}
                  </Typography>
                  <Typography
                     variant="body"
                     textAlign={'left'}>
                     {deliveryAddress.state}
                  </Typography>
                  <Typography
                     variant="body"
                     textAlign={'left'}>
                     Zip: {deliveryAddress.zipcode}
                  </Typography>

               </Stack>
            </Grid>
         </Grid>
      </Fragment>
   )
}

const mapStateToProps = (state) => ({
   orderQuantity: state.orderPage.orderQuantity,
   product: state.orderPage.product,
   deliveryAddress: state.orderPage.deriveryAddress
})
export default connect(mapStateToProps)(OrderConfirmation)
