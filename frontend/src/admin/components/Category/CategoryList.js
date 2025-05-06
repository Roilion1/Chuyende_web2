import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Api } from '../../../api/Api';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${Api}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(response.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Không thể tải danh sách danh mục'
      });
    }
  };

  const handleDeleteCategory = async (id) => {
    const isConfirmed = await Swal.fire({
      title: 'Bạn có chắc muốn xoá?',
      text: 'Thao tác này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ'
    }).then(result => result.isConfirmed);

    if (!isConfirmed) return;

    try {
      await axios.delete(`${Api}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(categories.filter(category => category.id !== id));
      Swal.fire('Đã xoá!', 'Danh mục đã được xoá.', 'success');
    } catch (error) {
      Swal.fire('Lỗi', 'Không thể xoá danh mục.', 'error');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-primary">Danh sách danh mục</h3>
        <Link to="create" className="btn btn-success">
          + Thêm danh mục
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Slug</th>
              <th>Ảnh</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map(category => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td className="fw-semibold">{category.name}</td>
                  <td>{category.slug}</td>
                  <td>
                    {category.image ? (
                      <img
                        src={`${Api}/images/${category.image}`}
                        alt={category.name}
                        width="60"
                        className="rounded"
                      />
                    ) : (
                      <span className="text-muted">Không có</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${category.status === 1 ? 'bg-success' : 'bg-secondary'}`}>
                      {category.status === 1 ? 'Hiển thị' : 'Ẩn'}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`edit/${category.id}`}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      Sửa
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-muted">Không có danh mục nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
