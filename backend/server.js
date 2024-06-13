const express = require('express');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/noteRoutes');
const app = express();

app.use(bodyParser.json());
app.use('/api/notes', noteRoutes);

const sequelize = require('./config/database');
const Note = require('./models/note');

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
