const express = require('express');
const app = express();
const { Restaurant } = require('./models/index');
const { sequelize } = require('./db');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/restaurants', async (req, res) => {
  const data = await Restaurant.findAll();
  res.send(data);
});

app.get('/restaurants/:id', async (req, res) => {
  const data = await Restaurant.findByPk(req.params.id);
  res.send(data);
});

app.listen(port, () => {
  sequelize.sync();
  console.log('Your server is listening on port ' + port);
});
