import { useState, useEffect } from "react";
import { getCategories, deleteCategory } from "../services/api.js";

const CategoryList = ({ onEdit }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah anda ingin menghapus data?")) {
      try {
        await deleteCategory(id);
        fetchCategories();
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
            <th>ID</th>
            <th>Name</th>
            <th>Jumlah Product</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, i) => (
            <tr key={category.id}>
              <td>{i + 1}</td>
              <td>{category.title}</td>
              <td>{category.Products?.length || 0}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(category)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(category.id)}
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

export default CategoryList;
