import express from 'express';
import walletRoutes from './routes/walletRoutes';
import './config/dotenv';
import cors from "cors";

const app = express();
app.use(cors());


app.use(express.json());

app.use('/api', walletRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
