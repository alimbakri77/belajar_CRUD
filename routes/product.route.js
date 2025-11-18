const express = require("express");
const route = express.Router();
const { Product, Category } = require("../models");

route.get("/", async (req, res) => {
  try {
    const data = await Product.findAll({
      include: [{ model: Category, as: "category" }]   // <-- FIX
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Gagal memuat data produk" });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const data = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: "category" }]  // <-- FIX
    });

    if (!data) return res.status(404).json({ message: "Produk tidak ditemukan" });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

route.post("/", async (req, res) => {
  try {
    const created = await Product.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

route.put("/:id", async (req, res) => {
  try {
    const updated = await Product.update(req.body, {
      where: { id: req.params.id }
    });

    if (updated[0] === 0)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    res.json({ message: "Produk berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });

    if (!deleted)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Gagal menghapus produk" });
  }
});

module.exports = route;
