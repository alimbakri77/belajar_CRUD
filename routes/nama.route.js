const express = require('express');
const route = express.Router();
const { Category, Product } = require('../models');

route.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
          as: 'Products'
        }
      ]
    });

    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Gagal memuat categories" });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          as: "Products"
        }
      ]
    });

    if (!category) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(category);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

route.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

route.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // update mengembalikan array [jumlahDataTerubah]
    const [updated] = await Category.update(req.body, {
      where: { id },
    });

    if (updated === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    // Ambil data terbaru setelah update
    const updatedCategory = await Category.findByPk(id, {
      include: [
        {
          model: Product,
          as: "Products",
        },
      ],
    });

    res.json({
      message: "Category updated successfully",
      data: updatedCategory,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


route.delete("/:id", async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id },
    });

    if (deleted === 1) {
      return res.status(204).send();
    }

    return res.status(404).json({ error: "Data not found" });

  } catch (err) {
    return res.status(500).json({ error: "Gagal menghapus category" });
  }
});

module.exports = route;
