import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // Get Products
  const getProducts = async () => {

    const response = await fetch(`${API_URL}/api/products`);

    const data = await response.json();

    setProducts(data);
  };

  // Run when page loads
  useEffect(() => {
    getProducts();
  }, []);


  // Add Product
  const addProduct = async (e) => {

    e.preventDefault();

    const product = {
      name: name,
      price: price,
      category: category
    };

    await fetch(`${API_URL}/api/products`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(product)
    });

    // Clear form
    setName("");
    setPrice("");
    setCategory("");

    // Get updated products
    getProducts();
  };


  // Delete Product
  const deleteProduct = async (id) => {

    await fetch(
      `${API_URL}/api/products/${id}`,
      {
        method: "DELETE"
      }
    );

    getProducts();
  };


  return (
    <div className="page-shell">
      <div className="dashboard-card">
        <header className="topbar">
          <div>
            <p className="eyebrow">Inventory dashboard</p>
            <h1>Product Management System</h1>
          </div>
          <div className="badge">{products.length} items</div>
        </header>

        <form className="product-form" onSubmit={addProduct}>
          <div className="input-group">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Category</label>
            <input
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button type="submit" className="primary-btn">
            Add Product
          </button>
        </form>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>#{product.id}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td><span className="tag">{product.category}</span></td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;