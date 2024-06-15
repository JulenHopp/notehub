const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar el paquete cors
const sequelize = require('./models').sequelize;
const noteRoutes = require('./routes/noteRoutes');
const app = express();

app.use(bodyParser.json());

// Configuración de CORS para permitir múltiples orígenes
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5176'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Permitir solicitudes sin origen (como herramientas Postman)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
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
