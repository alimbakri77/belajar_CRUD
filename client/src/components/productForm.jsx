import { useState, useEffect } from "react";
import { getCategories, createProduct, updateProduct } from "../services/api.js";

const ProductForm = ({ product, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    CategoryId: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        stock: product.stock,
        CategoryId: product.CategoryId,
      });
    } else {
      setFormData({
        name: "",
        price: "",
        stock: "",
        CategoryId: "",
      });
    }
  }, [product]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      price: parseInt(formData.price),
      stock: parseInt(formData.stock),
      CategoryId: parseInt(formData.CategoryId),
    };

    try {
      if (product) {
        await updateProduct(product.id, data);
      } else {
        await createProduct(data);
      }

      setFormData({
        name: "",
        price: "",
        stock: "",
        CategoryId: "",
      });

      onSuccess();
    } catch (error) {
      alert("Gagal menyimpan data");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{product ? "Edit" : "Tambah"} Produk</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Harga</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Kategori</label>
            <select
              name="CategoryId"
              className="form-select"
              value={formData.CategoryId}
              onChange={handleChange}
              required
            >
              <option value="">Pilih kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Simpan</button>

          {product && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setFormData({
                  name: "",
                  price: "",
                  stock: "",
                  CategoryId: "",
                });
                onSuccess();
              }}
            >
              Batal
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
