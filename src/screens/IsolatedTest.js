import React from 'react'
import ProductMod from './ProductMod'

const IsolatedTest = () => {
   let callActionDelete = (id) => {
      console.log("callActionDelete at id " + id)
   }

   return (
      <ProductMod />
   )
}

export default IsolatedTest