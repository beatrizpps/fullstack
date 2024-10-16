const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const animalRoute = require('./routes/animals');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado com sucesso!'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.use('/api/animals', animalRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
