import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetInventoryItemsQuery } from '../../services/inventoryItems';
import { Button } from '@mui/material';

import { InventoryItem } from '../../services/inventoryItems';

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);

  // Define options for date and time formatting
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };

  // Format the date to a readable string
  const legibleDate = date.toLocaleDateString('en-US', options)  
  return legibleDate;
};

type BasicTableProps = {
  onEditItem: (item: InventoryItem) => void,
  onDeleteItem: (item: InventoryItem) => void
}


export default function BasicTable({ onEditItem, onDeleteItem}: BasicTableProps) {
  const { data, isFetching, isLoading} = useGetInventoryItemsQuery()

  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  

  if (!data) return <div>No inventory items found</div>
  if (isFetching) return <div>Fetching items...</div>
  if (isLoading) return <div>Loading items...</div>

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Serial</TableCell>
            <TableCell align="right">Item Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Date Created</TableCell>
            <TableCell align="right">Action</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items.map((data) => (
            <TableRow
              key={data.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="data">
                {data.serial}
              </TableCell>
              <TableCell align="right">{data.name}</TableCell>
              <TableCell align="right">{data.description}</TableCell>
              <TableCell align="right">{data.quantity}</TableCell>
              <TableCell align="right">{data.created_at}</TableCell>
              <TableCell align="right">{
                <>
                <Button onClick={() => onEditItem(data)}>Edit</Button>
                <Button color='error'  onClick={() => onDeleteItem(data)}>Delete</Button>
                </>
            
                }</TableCell>
              <TableCell align="right">{}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}