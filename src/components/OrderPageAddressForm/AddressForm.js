import React, { Fragment, useEffect } from 'react'
import { FormControl, InputLabel, Select, MenuItem, FormLabel, TextField, Button, Typography } from '@mui/material';
import { fetchSavedAddress, postNewAddress } from '../../store/actions/addressFormActions';
import { connect } from 'react-redux';
import { setStep2Valid } from '../../store/actions/addressFormActions';
import { setDeviveryAddress } from '../../store/actions/addressFormActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';


const AddressForm = ({ loading, error, savedAddresses, deiveryAddress, onFetchSavedAddress, onSetStep2Valid, onPostNewAddress, onSetDeviveryAddress }) => {
   const [selectSavedAddress, setSelectedSavedAddress] = React.useState('');
   const [addressId, setAddressId] = React.useState('');
   // Create controlled form inputs
   const [name, setName] = React.useState(deiveryAddress.name);
   const [contactNumber, setContactNumber] = React.useState(deiveryAddress.contactNumber);
   const [street, setStreet] = React.useState(deiveryAddress.street);
   const [city, setCity] = React.useState(deiveryAddress.city);
   const [state, setState] = React.useState(deiveryAddress.state);
   const [landmark, setLandmark] = React.useState(deiveryAddress.landmark);
   const [zipCode, setZipCode] = React.useState(deiveryAddress.zipcode);
   const [canSaveAddress, setCanSaveAddress] = React.useState(false);
   useEffect(() => {
      onFetchSavedAddress();
   }, []);
   let clearForm = () => {
      setName('');
      setContactNumber('');
      setStreet('');
      setCity('');
      setState('');
      setLandmark('');
      setZipCode('');
   }

   const handleSelectSavedAddress = (event) => {
      setSelectedSavedAddress(event.target.value);
      // get selected address from saved addresses array
      const selectedAddress = savedAddresses.find((address) => address.id === event.target.value);
      // set form inputs to selected address
      updateInternalAdressState(selectedAddress);

   };
   const updateInternalAdressState = (selectedAddress, callback) => {
      setAddressId(selectedAddress.id);
      setName(selectedAddress.name);
      setContactNumber(selectedAddress.contactNumber);
      setStreet(selectedAddress.street);
      setCity(selectedAddress.city);
      setState(selectedAddress.state);
      setLandmark(selectedAddress.landmark);
      setZipCode(selectedAddress.zipcode);
   }

   useEffect(() => { checkValidToContinue() }, [selectSavedAddress]);

   const checkValidToContinue = () => {
      // To continue, the form must be all filled out
      console.log("form is valid")
      if (name && contactNumber && street && city && state && landmark && zipCode) {
         console.log("form is valid")
         const address = {
            "addressId": addressId,
            "name": name,
            "contactNumber": contactNumber,
            "street": street,
            "city": city,
            "state": state,
            "landmark": landmark,
            "zipcode": zipCode
         }
         onSetDeviveryAddress(address);
         onSetStep2Valid(true);

         return true;
      }
      return false;
   }



   const handleFormInutChange = (event) => {
      const { name, value } = event.target;
      switch (name) {
         case 'name':
            setName(value);
            break;
         case 'contactNumber':
            setContactNumber(value);
            break;
         case 'street':
            setStreet(value);
            break;
         case 'city':
            setCity(value);
            break;
         case 'state':
            setState(value);
            break;
         case 'landmark':
            setLandmark(value);
            break;
         case 'zipCode':
            setZipCode(value);
            break;
         default:
            break;
      }
      //check if form is valid to continue
      if (checkValidToContinue()) {
         onSetStep2Valid(true);
         setCanSaveAddress(true);
      }
      else {
         setCanSaveAddress(false);
      }
   }

   const handleSaveAddress = () => {
      // create address object from all input fields
      const address = {
         "name": name,
         "contactNumber": contactNumber,
         "street": street,
         "city": city,
         "state": state,
         "landmark": landmark,
         "zipcode": zipCode
      }
      // dispatch action to save address
      onPostNewAddress(address);
      //reload address
      onFetchSavedAddress()
   }
   // const showError = () => {
   //    toast.error('Something went wrong, cannot add your address!', {
   //       position: toast.POSITION.TOP_RIGHT
   //    });
   // };
   // useEffect(() => {
   //    if (error) {
   //       showError();
   //    }
   // }, [error]);
   return (
      <Fragment>
         <ToastContainer />
         <Box display={"flex"} style={{ "justifyContent": "center" }}>
            <FormControl
               className="AddressForm"
               fullWidth
            >
               <InputLabel id="select-address-label">Select Address</InputLabel>
               <Select
                  labelId="select-address-label"
                  id="select-address"
                  value={selectSavedAddress}
                  label="Address"
                  onChange={handleSelectSavedAddress}
               >
                  {/* saved address array to selection options */}

                  {savedAddresses && savedAddresses.map((address) => {
                     return <MenuItem key={address.id} value={address.id}>{`${address.name} - ${address.contactNumber} - ${address.landmark}, ${address.street}, ${address.state}`}</MenuItem>
                  })}
               </Select>
               <Typography
                  className="ProductName"
                  variant="h6"
                  textAlign={'left'}
               >
                  Add Address
               </Typography>
               <TextField
                  className='Input'
                  placeholder='Name*'
                  name="name"
                  value={name}
                  onChange={handleFormInutChange}></TextField>
               <TextField
                  className='Input'
                  placeholder='ContactNumber*'
                  name="contactNumber"
                  value={contactNumber}
                  onChange={handleFormInutChange}></TextField>
               <TextField
                  className='Input'
                  placeholder='Street*'
                  name="street"
                  value={street}
                  onChange={handleFormInutChange}></TextField>
               <TextField
                  className='Input'
                  placeholder='City*'
                  name="city"
                  value={city}
                  onChange={handleFormInutChange}></TextField>
               <TextField
                  className='Input'
                  placeholder='State*'
                  name="state"
                  value={state}
                  onChange={handleFormInutChange}></TextField>
               <TextField
                  className='Input'
                  placeholder='Landmark*'
                  name="landmark"
                  value={landmark} onChange={handleFormInutChange}></TextField>
               <TextField
                  className='Input'
                  placeholder='Zip Code*'
                  name="zipCode"
                  value={zipCode}
                  onChange={handleFormInutChange}></TextField>
               <Button
                  className='SubmitBtn'
                  variant='contained'
                  onClick={handleSaveAddress}
                  disabled={canSaveAddress ? null : true}
               >SAVE ADDRESS</Button>

            </FormControl>

         </Box>
      </Fragment >
   )
}

const mapStateToProps = (state) => {
   return {
      savedAddresses: state.savedAddresses.savedAddresses,
      loading: state.savedAddresses.loading,
      error: state.savedAddresses.error,
      deiveryAddress: state.orderPage.deriveryAddress

   }
}
const mapDispatchToProps = (dispatch) => {
   return {
      onFetchSavedAddress: () => dispatch(fetchSavedAddress()),
      onSetStep2Valid: (value) => dispatch(setStep2Valid(value)),
      onPostNewAddress: (addressobj) => dispatch(postNewAddress(addressobj)),
      onSetDeviveryAddress: (addressobj) => dispatch(setDeviveryAddress(addressobj))
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddressForm)