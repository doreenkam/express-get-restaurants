const express = require('express');
const app = express();
const { Restaurant } = require('./models/index');
const { sequelize } = require('./db');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/restaurants', async (req, res) => {
  try {
    const data = await Restaurant.findAll();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ err: err.message });
  }
});

app.get('/restaurants/:id', async (req, res) => {
  try {
    const data = await Restaurant.findByPk(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ err: err.message });
  }
});

app.post('/restaurants', async (req, res) => {
  try {
    const data = await Restaurant.create(req.body);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ err: err.message });
  }
});

app.put('/restaurants/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Restaurant.update(req.body, {
      where: { id },
    });
    const data = await Restaurant.findByPk(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ err: err.message });
  }
});

app.delete('/restaurants/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Restaurant.destroy({ where: { id } });
    res.status(200).send('Restaurant Deleted!');
  } catch (error) {
    res.status(500).send({ err: err.message });
  }
});

app.listen(port, () => {
  sequelize.sync();
  console.log('Your server is listening on port ' + port);
});
