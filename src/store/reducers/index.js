import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoriesReducers from './categoriesReducers';
import { productListReducer } from './productListReducers';
import { shortByReducer } from './shortByReducer'
import { searchBarReducer } from './searchBarReducer'
import { productDetailReducer } from './productDetailReducer'
import { orderPageReducer } from './orderPageReducer'
import { addressFormReducer } from './addressFormReducer'
import productCardReducer from './productCardReducer'
import productModReducer from './productModReducer'


export default combineReducers({
   auth: authReducer,
   categories: categoriesReducers,
   productList: productListReducer,
   shortBy: shortByReducer,
   searchBar: searchBarReducer,
   productDetail: productDetailReducer,
   orderPage: orderPageReducer,
   savedAddresses: addressFormReducer,
   productCard: productCardReducer,
   productMod: productModReducer
});