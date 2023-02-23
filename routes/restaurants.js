const router = require('express').Router();
const { Restaurant } = require('../models/index');
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const data = await Restaurant.findAll();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Restaurant.findByPk(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty().trim(),
    check('name', 'Name length is invalid').isLength({ min: 10, max: 30 }),
    check('location', 'Location is required').not().isEmpty().trim(),
    check('cuisine', 'Cuisine is required').not().isEmpty().trim(),
  ],
  async (req, res) => {
    try {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({ error: errors.array() });
      } else {
        const data = await Restaurant.create(req.body);
        res.status(200).send(data);
      }
    } catch (error) {
      res.status(500).send({ err: error.message });
    }
  }
);

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Restaurant.update(req.body, {
      where: { id },
    });
    const data = await Restaurant.findByPk(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

router.delete('/restaurants/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Restaurant.destroy({ where: { id } });
    res.status(200).send('Restaurant Deleted!');
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

module.exports = router;
