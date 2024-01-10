import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: () => void;
  onSubmit: () => void;
  confirmBtnTxt: string;
}

const SimpleDialog = (props: SimpleDialogProps) => {
  const { confirmBtnTxt,  onClose, onSubmit, selectedValue, open } = props;

  const handleClose = () => {
    onClose();
  };


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{`Delete item ${selectedValue} from inventory?`}</DialogTitle>
      <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>{confirmBtnTxt}</Button>
        </DialogActions>
    </Dialog>
  );
}

export default SimpleDialog
