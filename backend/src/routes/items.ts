interface InventoryItem {
  id: number;
  serial: string;
  name: string;
  description: string;
  quantity: number;
}

interface ErrorResponse {
  message: string;
}

interface InventoryItemsResponse {
  items: InventoryItem[]; // or Array<InventoryItem>, if you prefer
}


import { Router, Request, Response } from 'express';
import {pool, client} from '../db';
// import { errorHandler } from '../../helpers';

const router = Router();

router.get('/inventory-items', async (req: Request, res: Response<InventoryItemsResponse | ErrorResponse>) => {
  try {
    const result = await pool.query('SELECT * FROM inventory_items');
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No inventory items not found' });
    }
    res.status(200).json({
      items: result.rows // assuming 'rows' has the array of InventoryItem objects
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/add-item', async (req: Request<InventoryItem>, res: Response<InventoryItemsResponse | ErrorResponse>) => {
  const { serial, name, description, quantity } = req.body;
  // SQL query to insert data into the postgresql database
  const queryText = `
    INSERT INTO inventory_items (serial, name, description, quantity)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  try {
    const result = await pool.query(queryText, [serial, name, description, quantity]);
    
    // Send back the result of the insert operation to the client
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/inventory-item/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    // Parameterized query to prevent SQL injection
    const queryText = 'SELECT * FROM inventory_items WHERE id = $1';
    const values = [productId];

    // Execute the query
    const result = await pool.query(queryText, values);

    // If no rows are returned, send a 404 response
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Send back the first row (product) as we expect only one match for an ID
    res.json(result.rows[0]);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Error fetching the item:', err)
    }
    res.status(500).send('Server error');
  }
});

router.put('/inventory-items/:id', async (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const { name, description, quantity } = req.body;

  // Construct the UPDATE query with multiple potential parameters
  const queryParts = [
    name !== undefined && `"name" = $1`,
    description !== undefined && `"description" = $2`,
    quantity !== undefined && `"quantity" = $3`
  ].filter(Boolean); // remove undefined parts

  // If no fields are provided for update, send a bad request response
  if (queryParts.length === 0) {
    return res.status(400).json({ message: 'No valid fields provided for update' });
  }

  // Construct the SQL query string
  const queryString = `
    UPDATE inventory_items
    SET ${queryParts.join(', ')}
    WHERE id = $${queryParts.length + 1}
    RETURNING *;
  `;
  
  // Construct the parameters array for pg query 
  const queryParams = [name, description, quantity].filter(param => param !== undefined);
  queryParams.push(itemId); // Add itemId as the last parameter

  try {
    const result = await pool.query(queryString, queryParams);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/inventory-items/:id', async (req, res) => {
  const itemId = parseInt(req.params.id, 10);

  try {
    // Use the RETURNING clause to get the row being deleted
    const result = await pool.query('DELETE FROM inventory_items WHERE id = $1 RETURNING *;', [itemId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.status(200).json({ message: 'Inventory item deleted', deletedItem: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// router.use(errorHandler)

export default router;
