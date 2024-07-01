import React from 'react'
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material'
import { connect } from 'react-redux'
import { setShortByMode } from '../../store/actions/shortByActions'
import "./SortBy.css"



const SortBy = ({ shortByMode, onSetSortByMode }) => {
   const [internalShortByMode, setInternalShortByMode] = React.useState(0);
   const handleChange = (event) => {
      onSetSortByMode(event.target.value);
      setInternalShortByMode(event.target.value);
   };

   return (
      <FormControl 
      className="SortByForm"
      variant="outlined" sx={{ m: 1, minWidth: 120 }}>
         <InputLabel id="sorting-label">Sort By</InputLabel>
         <Select
            labelId="sorting"
            id="sorting-picker"
            value={internalShortByMode}
            label="Default"
            onChange={handleChange}
            placeholder='Select...'
         >
            <MenuItem value={0}>Default</MenuItem>
            <MenuItem value={1}>Price:High to Low</MenuItem>
            <MenuItem value={2}>Price:Low to High</MenuItem>
            <MenuItem value={3}>Newest</MenuItem>
         </Select>
      </FormControl>
   )
}

const mapStateToProps = (state) => ({
   shortByMode: state.shortBy.shortByMode
})
const mapDispatchToProps = {
   onSetSortByMode: (sortmode) => setShortByMode(sortmode)
}
export default connect(mapStateToProps, mapDispatchToProps)(SortBy)