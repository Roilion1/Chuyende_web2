import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Api } from "../../../api/Api";

function EditCategory() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [category, setCategory] = useState({
    name: '',
    slug: '',
    parent_id: 0,
    sort_order: 0,
    image: '',
    description: '',
    status: 1,
    success: false,
    error: '',
    isLoading: true
  });

  useEffect(() => {
    // Lấy thông tin danh mục từ API
    axios.get(`${Api}/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const data = response.data;
      setCategory(prev => ({
        ...prev,
        name: data.name,
        slug: data.slug,
        parent_id: data.parent_id || 0,
        sort_order: data.sort_order || 0,
        image: data.image || '',
        description: data.description || '',
        status: data.status ?? 1,
        isLoading: false,
        error: ''
      }));
    })
    .catch(error => {
      setCategory(prev => ({
        ...prev,
        error: 'Không thể tải thông tin danh mục',
        isLoading: false
      }));
    });
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCategory = {
      name: category.name,
      slug: category.slug,
      parent_id: parseInt(category.parent_id),
      sort_order: parseInt(category.sort_order),
      image: category.image,
      description: category.description,
      status: parseInt(category.status),
      created_by: 1,
      updated_by: 1
    };

    axios.put(`${Api}/categories/${id}`, updatedCategory, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      setCategory(prev => ({
        ...prev,
        success: true,
        error: ''
      }));
    })
    .catch(err => {
      setCategory(prev => ({
        ...prev,
        error: err.response?.data?.message || 'Đã xảy ra lỗi khi cập nhật.'
      }));
    });
  };

  return (
    <div className="container-fluid">
      {category.success && (
        <div className="alert alert-success">
          Danh mục đã được cập nhật thành công.
        </div>
      )}
      {category.error && (
        <div className="alert alert-danger">
          {category.error}
        </div>
      )}

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Chỉnh sửa danh mục</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên danh mục</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={category.name}
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
                value={category.slug}
                onChange={handleChange}
                required
              />
            </div>

            {/* <div className="form-group">
              <label>ID danh mục cha</label>
              <input
                type="number"
                className="form-control"
                name="parent_id"
                value={category.parent_id}
                onChange={handleChange}
              />
            </div> */}

            <div className="form-group">
              <label>Thứ tự sắp xếp</label>
              <input
                type="number"
                className="form-control"
                name="sort_order"
                value={category.sort_order}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Ảnh danh mục</label>
              <input
                type="text"
                className="form-control"
                name="image"
                value={category.image}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Mô tả</label>
              <textarea
                className="form-control"
                name="description"
                value={category.description}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Trạng thái</label>
              <select
                className="form-control"
                name="status"
                value={category.status}
                onChange={handleChange}
              >
                <option value={1}>Hiển thị</option>
                <option value={0}>Ẩn</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary float-right">Cập nhật danh mục</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
