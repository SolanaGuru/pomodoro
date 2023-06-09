const express = require('express');
const cors = require('cors')
const path = require("path");
const mime = require('mime');
const https = require('https')



const app = express();

const router = require('./routes')
require('./db/migrations/migrations')
require('dotenv').config("./.env")



app.use(express.static(path.join(__dirname, './client/dist')))
app.use(cors())


app.use(express.json());
app.use("/api", router)


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;

// https.createServer(app).listen(PORT, () => {
//   console.log(`Server Started ${PORT}`);
// })

app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
});
