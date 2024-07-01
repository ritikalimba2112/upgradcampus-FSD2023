import * as React from 'react';
import { useState } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { useEffect } from 'react';
import { fetchCategories, setFilterByCategory } from '../../store/actions/categoriesActions'
import { connect } from 'react-redux';
import "./ProductCategories.css"


function ProductCategories({ ProductCategories, onFetchCategories, onSetFilterByCategory }) {
   const [selectedCategory, setSelectedCategory] = useState("All");

   const handleChange = (event, newSelectedCategory) => {
      if (newSelectedCategory !== null) {
         setSelectedCategory(newSelectedCategory);
         onSetFilterByCategory(newSelectedCategory);
      }
   };

   useEffect(() => {
      onFetchCategories()
   }, [])

   return (
      <ToggleButtonGroup
         className="ProductCategoriesBtnGroup"
         color="primary"
         value={selectedCategory}
         onChange={handleChange}
         aria-label="Category"
         exclusive={true}
      >
         {ProductCategories.map((category, index) => (
            <ToggleButton
               className="ProductCategoriesBtn"
               key={index}
               value={category} >
               {category}
            </ToggleButton >))}

      </ToggleButtonGroup>
   );
}
const mapStateToProps = (state) => {
   return {
      ProductCategories: state.categories.categories
   }
}
const mapDispatchToProps = (dispatch) => {
   return {
      onFetchCategories: () => dispatch(fetchCategories()),
      onSetFilterByCategory: (category) => dispatch(setFilterByCategory(category))
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductCategories)