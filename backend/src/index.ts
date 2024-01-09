import express from 'express';
import cors from 'cors';
import itemRoutes from './routes/items'
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use('/api', itemRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
