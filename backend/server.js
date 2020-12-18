const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Working");
})
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

// Database
mongoose.connect(process.env.DB_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, (err) => {
  if (err) throw err;
  console.log('MongoDB connection established.');
})

app.use('/users', require('./routes/userRouter'))