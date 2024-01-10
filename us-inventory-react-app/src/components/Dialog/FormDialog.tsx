import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

export type FormState = {
        serial: string | undefined
        name: string
        description: string
        quantity: number | undefined
}

type FormDialogProps = {
    onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
    open: boolean;
    dialogType: string;
    handleClose: () => void;
    setForm?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    form: FormState;
}


export default function FormDialog({form, onSubmit, dialogType, open, handleClose, setForm}: FormDialogProps) {
    
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`${dialogType} Item`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Item Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={setForm}
            value={form.name}
          />
          <TextField
            autoFocus
            margin="dense"
            id="serial"
            label="Serial Number"
            type="text"
            name="serial"
            fullWidth
            variant="standard"
            onChange={setForm}
            value={form.serial}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            name="description"
            type="text"
            fullWidth
            variant="standard"
            onChange={setForm}
            value={form.description}
          />
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            name="quantity"
            label="Quantity"
            type="text"
            fullWidth
            variant="standard"
            onChange={setForm}
            value={form.quantity}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => onSubmit(e)}>{`${dialogType}`}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}