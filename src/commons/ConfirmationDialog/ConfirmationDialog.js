import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';

export default function ConfirmationDialog({ title, mssg, confirmBtnText = "OK", onConfirmAction, declineBtnText = "Cancel", onDeclineAction = () => { }, resetFunction }) {
   const [open, setOpen] = React.useState(true);
   const handleClose = (userDecision) => {
      setOpen(false);
      if (userDecision) {
         onConfirmAction(setOpen)

      }
      else {
         onDeclineAction(setOpen)
      }
      console.log("call reset function")
      resetFunction()
   };


   return (
      <div>
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title">
               {title}
            </DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  {mssg}
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => handleClose(false)} autoFocus>{declineBtnText}</Button>
               <Button onClick={() => handleClose(true)} >
                  {confirmBtnText}
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}