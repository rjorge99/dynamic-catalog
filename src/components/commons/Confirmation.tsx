import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   useMediaQuery,
   useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
   message: string;
   onAccept: () => void | Promise<void>;
   isOpen: boolean;
   onClose: () => void | Promise<void>;
}

const ConfirmationDialog = ({ message, onAccept, onClose, isOpen }: Props) => {
   const [open, setOpen] = useState(isOpen);
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

   useEffect(() => {
      setOpen(isOpen);
   }, [isOpen]);

   return (
      <>
         <Dialog fullScreen={fullScreen} open={open} onClose={onClose} aria-labelledby='responsive-dialog-title'>
            <DialogTitle id='responsive-dialog-title'>Confirm</DialogTitle>
            <DialogContent>
               <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button autoFocus variant='contained' color='error' onClick={onClose}>
                  Cancel
               </Button>
               <Button onClick={onAccept} variant='contained' autoFocus>
                  Accept
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
};

export default ConfirmationDialog;
