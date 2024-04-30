const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DBNAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB:', err.message);
});

app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});