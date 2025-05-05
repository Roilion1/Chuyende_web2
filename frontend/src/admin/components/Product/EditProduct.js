import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Api } from "../../../api/Api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState({
    name: '',
    slug: '',
    categoryId: '',
    brandId: '',
    description: '',
    content: '',
    image: '',
    price: '',
    success: false,
    error: '',
    categories: [],
    brands: [],
    isLoading: true
  });

  useEffect(() => {
    // Lấy thông tin sản phẩm từ API
     console.log("Fetching product data...");
    axios.get(`${Api}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setProduct(prevState => ({
        ...prevState,
        name: response.data.name,
        slug: response.data.slug,
        categoryId: response.data.categoryId,
        brandId: response.data.brandId,
        description: response.data.description,
        content: response.data.content,
        image: response.data.image,
        price: response.data.price,
        success: false,
        error: '',
        isLoading: false
      }));
    })
    .catch(error => {
      setProduct(prevState => ({
        ...prevState,
        error: 'Không thể tải thông tin sản phẩm',
        isLoading: false
      }));
    });

    // Lấy danh mục và thương hiệu
    const fetchCategoriesAndBrands = async () => {
      try {
        const [categoriesResponse, brandsResponse] = await Promise.all([
          axios.get(`${Api}/categories`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${Api}/brands`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setProduct(prevState => ({
          ...prevState,
          categories: categoriesResponse.data,
          brands: brandsResponse.data
        }));
      } catch (error) {
        setProduct(prevState => ({
          ...prevState,
          error: 'Không thể tải danh mục và thương hiệu',
          isLoading: false
        }));
      }
    };

    fetchCategoriesAndBrands();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      name: product.name,
      slug: product.slug,
      categoryId: parseInt(product.categoryId),
      brandId: parseInt(product.brandId),
      description: product.description,
      content: product.content,
      image: product.image,
      price: parseFloat(product.price),
      status: 1 // Có thể thay đổi trạng thái tùy theo yêu cầu
    };

    axios.put(`${Api}/products/${id}`, updatedProduct, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
        setProduct(prevState => ({
            ...prevState,
            success: true,
            error: ''
        }));
    })
    .catch((err) => {
      setProduct(prevState => ({
        ...prevState,
        error: err.response?.data?.message || 'Đã xảy ra lỗi khi cập nhật.'
      }));
    });
  };

  return (
    <div className="container-fluid">
      {product.success && (
        <div className="alert alert-success">
          Sản phẩm đã được cập nhật thành công.
        </div>
      )}
      {product.error && (
        <div className="alert alert-danger">
          {product.error}
        </div>
      )}

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Chỉnh sửa sản phẩm</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên sản phẩm</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Slug</label>
              <input
                type="text"
                className="form-control"
                name="slug"
                value={product.slug}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Danh mục</label>
              <select
                name="categoryId"
                className="form-control"
                value={product.categoryId}
                onChange={handleChange}
                required
              >
                {product.categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Thương hiệu</label>
              <select
                name="brandId"
                className="form-control"
                value={product.brandId}
                onChange={handleChange}
                required
              >
                {product.brands.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Giá</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Ảnh sản phẩm</label>
              <input
                type="text"
                className="form-control"
                name="image"
                value={product.image}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Mô tả</label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Chi tiết sản phẩm</label>
              <textarea
                className="form-control"
                name="content"
                rows="4"
                value={product.content}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary float-right">Cập nhật sản phẩm</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
