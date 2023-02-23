const express = require('express');
const app = express();
const { sequelize } = require('./db');
const port = 3000;
const restaurantsRoutes = require('./routes/restaurants');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/restaurants', restaurantsRoutes);

app.listen(port, () => {
  sequelize.sync();
  console.log('Your server is listening on port ' + port);
});
