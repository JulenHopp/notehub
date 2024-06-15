const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar el paquete cors
const sequelize = require('./models').sequelize;
const noteRoutes = require('./routes/noteRoutes');
const app = express();

app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => console.log(err));
