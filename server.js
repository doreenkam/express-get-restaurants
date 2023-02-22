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

app.post('/restaurants', async (req, res) => {
  const data = await Restaurant.create(req.body);
  res.send(data);
});

app.put('/restaurants/:id', async (req, res) => {
  const id = req.params.id;
  await Restaurant.update(req.body, {
    where: { id },
  });
  const data = await Restaurant.findByPk(id);
  res.send(data);
});

app.delete('/restaurants/:id', (req, res) => {});

app.listen(port, () => {
  sequelize.sync();
  console.log('Your server is listening on port ' + port);
});
