import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../services/api.js";

const ProductList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah anda ingin menghapus data?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        alert("Gagal menghapus data");
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>NO</th>
            <th>NAME</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr key={product.id}>
              <td>{i + 1}</td>
            <td>{product.name}</td>
            <td>{product.price?.toLocaleString('id-ID')}</td>
            <td>{product.stock}</td>
            <td>{product.category?.title || 'N/A'}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
