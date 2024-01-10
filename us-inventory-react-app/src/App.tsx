import React, {useState} from 'react';
import Button from '@mui/material/Button';

import logo from './logo.svg';
import { InventoryItem, useAddNewItemMutation, useDeleteInventoryItemMutation, useUpdateItemMutation } from './services/inventoryItems';
import './App.css';
import BasicTable from './components/Table/BasicTable';
import FormDialog from './components/Dialog/FormDialog';
import SimpleDialog from './components/Dialog/SimpleDialog';

import { FormState } from './components/Dialog/FormDialog';

export const initialFormState: FormState = {
  serial: '',
  name: '',
  description: '',
  quantity: undefined
}



function App() {
  const [addNewItem] = useAddNewItemMutation();
  const [deleteInventoryItem] = useDeleteInventoryItemMutation();
  const [updateItem] = useUpdateItemMutation();
  
  const [form, setForm] = useState<FormState>(initialFormState);
  const [open, setOpen] = useState(false)
  const [formToDelete, setFormToDelete] = useState<FormState & {id?: number}>(initialFormState)
  const [formToEdit, setFormToEdit] = useState<FormState & {id?: number}>(initialFormState)
  const [dialogType, setDialogType] = useState('')
  const [openFormDialog, setOpenFormDialog] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleEditInputFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormToEdit({
      ...formToEdit,
      [name]: value,
    });
  };

  const handleDeleteItemSelection = (item: InventoryItem) => {
    setFormToDelete(item)
    setOpen(!open)
  }

  const handleDeleteItem = async () => {
    if (!formToDelete.id) return
    try {
      // Trigger the mutation by passing the item ID
      await deleteInventoryItem(formToDelete.id).unwrap();
    } catch (error) {
      console.error('Failed to delete the item:', error);
      alert('Error deleting the item');
    }
    setOpen(!open)
  }
  const handleEditItem = (item: InventoryItem) => {
    setDialogType('Edit')
    setOpenFormDialog(!open)
      setFormToEdit(item)
  }


  const handleOpenAddItemDialog = () => {
    setDialogType('Add')
    setOpenFormDialog(!open)
  }

  const handleCloseFormDialog = () => {

    setForm(initialFormState)
    setFormToEdit(initialFormState)
    setDialogType('')
    setOpenFormDialog(!open)
  }

  const handleUpdateItem = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateItem({...formToEdit}).unwrap();
    } catch (error) {
      console.error('Failed to update item:', error);
    }
    setFormToEdit(initialFormState)
    handleCloseFormDialog()
  }

    const handleAddItem = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          const response = await addNewItem(form).unwrap();
          console.log('Successfully added item', response);
        } catch (error) {
          console.error('Failed to add item', error);
        }
      // Reset the form
      setForm(initialFormState);
      handleCloseFormDialog()
    };

  

    
    


  return (
    <div className="App">
      <BasicTable onDeleteItem={handleDeleteItemSelection} onEditItem={handleEditItem}/>
      <Button sx={{ marginTop: '10px'}} variant="outlined" onClick={handleOpenAddItemDialog}>
        Add Item
      </Button>
      {dialogType === 'Add' && 
      <FormDialog open={openFormDialog} dialogType={dialogType} onSubmit={handleAddItem} form={form} setForm={handleInputChange} handleClose={handleCloseFormDialog} />
      }
      {dialogType === 'Edit' && 
      <FormDialog open={openFormDialog} dialogType={dialogType} onSubmit={handleUpdateItem} form={formToEdit} setForm={handleEditInputFields} handleClose={handleCloseFormDialog}/>
      }
      <SimpleDialog confirmBtnTxt='Delete' open={open} onClose={() => {
          setOpen(!open)
          setFormToDelete(initialFormState)
      }} selectedValue={formToDelete.name} onSubmit={handleDeleteItem} />
    </div>
  );
}

export default App;
