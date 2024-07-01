import React, { Fragment } from 'react'
import { useResolvedPath } from "react-router-dom"
import { Container, Stack } from '@mui/material'
import { Routes, Route } from "react-router-dom"
import ProductCategories from '../components/ProductCategories/ProductCategories'
import SortBy from '../components/SortBy/SortBy'
import ProductGrid from '../components/ProductGrid/ProductGrid'
import { Grid } from '@mui/material'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'


const ProductHome = ({ isLogin }) => {
   const path = useResolvedPath("").pathname
   return (
      <Fragment>
         {console.log(isLogin)}
         {isLogin ? null : <Navigate to="/login" />}
         <Stack spacing={1} style={{ marginTop: "10px" }}>
            <ProductCategories />
            <Grid container spacing={2}>
               <Grid item lg={2}>
                  <SortBy />
               </Grid>
               <Grid item lg={9.5} style={{ "marginRight": "px" }}>
                  <ProductGrid />
               </Grid>
            </Grid>
         </Stack>
      </Fragment>
   )
}

const mapStateToProps = (state) => {
   return {
      isLogin: state.auth.isLogin,
   }
}
export default connect(mapStateToProps)(ProductHome)