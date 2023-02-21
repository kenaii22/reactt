import React, { useState, useEffect } from 'react';

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: '',
    title: '',
    price: '',
    description: '',
    category: ''
  });
  const [titleFilter, setTitleFilter] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  const handleAddProduct = event => {
    event.preventDefault();
    setProducts([...products, newProduct]);
    setFilteredProducts([...filteredProducts, newProduct]);
    setNewProduct({
      id: '',
      title: '',
      price: '',
      description: '',
      category: ''
    });
  };

  const handleDeleteProduct = id => {
    setProducts(products.filter(product => product.id !== id));
    setFilteredProducts(filteredProducts.filter(product => product.id !== id));
  };

  const handleTitleFilter = () => {
    setFilteredProducts(
      products.filter(product =>
        product.title.toLowerCase().includes(titleFilter.toLowerCase())
      )
    );
  };

  return (
    <div className="container">
      <form onSubmit={handleAddProduct}>
        <label>
          ID:
          <input
            className="form-control"
            type="text"
            value={newProduct.id}
            onChange={event =>
              setNewProduct({ ...newProduct, id: event.target.value })
            }
          />
        </label>
        <label>
          Title:
          <input
            className="form-control"
            type="text"
            value={newProduct.title}
            onChange={event =>
              setNewProduct({ ...newProduct, title: event.target.value })
            }
          />
        </label>
        <label>
          Price:
          <input
            className="form-control"
            type="text"
            value={newProduct.price}
            onChange={event =>
              setNewProduct({ ...newProduct, price: event.target.value })
            }
          />
        </label>
        <label>
          Description:
          <input
            className="form-control"
            type="text"
            value={newProduct.description}
            onChange={event =>
              setNewProduct({ ...newProduct, description: event.target.value })
            }
          />
        </label>
        <label>
          Category:
          <input
            className="form-control"
            type="text"
            value={newProduct.category}
            onChange={event =>
              setNewProduct({ ...newProduct, category: event.target.value })
            }
          />
        </label>
        <button type="submit" className="btn btn-success">Add Product</button>
      </form>
      <label>
        Filter by Title:
        <input
        className="form-control"
          type="text"
          value={titleFilter}
          onChange={event => setTitleFilter(event.target.value)}
        />
        <button className="btn btn-primary" onClick={handleTitleFilter}>Filter</button>
      </label>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>{product.title}</td>
          <td>{product.price}</td>
          <td>{product.description}</td>
          <td>{product.category}</td>
          <td>
            <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
);
}

export default ProductTable;