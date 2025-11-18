const express = require("express");
const { sequelize } = require("./models");
const app = express();
const PORT = 3000;
const cors = require('cors');

const categoryRoutes = require('./routes/category.route');
const productRoutes = require('./routes/product.route'); 

app.use(cors());
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes); 

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
