const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Hola =)'
  })
});
module.exports = app;