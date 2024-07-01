import React from 'react'
import { Fragment } from 'react'
import { Container, Stack, Typography, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { connect } from 'react-redux'
import "./ItemSummary.css"

const ItemSummary = ({ orderQuantity, product }) => {
   console.log(orderQuantity, product)
   const [quantity, setQuantity] = useState(orderQuantity)
   const { name, description, price, category, availableItems, imageUrl } = product

   return (
      <Fragment>
         <Container maxWidth="lg">
            {/* <h1>ProductDetailPage</h1> */}
            <Stack spacing={2} direction='row'>
               <img
                  className="ProductImageOrder"
                  src={imageUrl}
                  alt={name} />
               <Stack spacing={2} direction='column'>
                  <Typography
                     variant="h5"
                     textAlign={'left'}
                     style={{ "fontWeight": "bold" }}>
                     {name}
                  </Typography>
                  <Typography
                     variant="body"
                     textAlign={'left'}>
                     Quantity: {quantity}
                  </Typography>
                  <Typography
                     variant="body"
                     textAlign={'left'}>
                     Category: {category}
                  </Typography>
                  <Typography
                     variant="body"
                     textAlign={'left'}>
                     {description}
                  </Typography>
                  <Typography
                     variant="h6"
                     textAlign={'left'}
                     style={{ "color": "#ee2c3c" }}>
                     Total Price: $ {quantity * price}
                  </Typography>

               </Stack>

            </Stack>
         </Container>
      </Fragment>
   )
}

const mapStateToProps = (state) => ({
   orderQuantity: state.orderPage.orderQuantity,
   product: state.orderPage.product
})
export default connect(mapStateToProps)(ItemSummary)