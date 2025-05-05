import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Api } from '../../../api/Api';

export default function List() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [productRes, categoryRes, brandRes] = await Promise.all([
        axios.get(`${Api}/products`, config),
        axios.get(`${Api}/categories`, config),
        axios.get(`${Api}/brands`, config),
      ]);

      setProducts(productRes.data);
      setCategories(categoryRes.data);
      setBrands(brandRes.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      Swal.fire('Lỗi', 'Không thể tải dữ liệu. Vui lòng kiểm tra lại token hoặc kết nối mạng.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId) => {
    const found = categories.find(c => c.id === categoryId);
    return found ? found.name : 'Không rõ';
  };

  const getBrandName = (brandId) => {
    const found = brands.find(b => b.id === brandId);
    return found ? found.name : 'Không rõ';
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc muốn xóa?',
      text: 'Thao tác này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${Api}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire('Đã xóa!', 'Sản phẩm đã được xóa.', 'success');
      fetchData();
    } catch (err) {
      console.error(err);
      Swal.fire('Lỗi', 'Xóa sản phẩm thất bại', 'error');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-primary">Danh sách sản phẩm</h3>
        <Link to="product/create" className="btn btn-success">
          + Thêm sản phẩm
        </Link>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Hình ảnh</th>
                <th>Giá</th>
                <th>Danh mục</th>
                <th>Thương hiệu</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td className="fw-semibold">{product.name}</td>
                    <td>
                      {product.image ? (
                        <img
                          src={`${Api}/images/${product.image}`}
                          alt={product.name}
                          width="80"
                          className="rounded"
                        />
                      ) : (
                        <span className="text-muted">Không có ảnh</span>
                      )}
                    </td>
                    <td>{product.price.toLocaleString()} VND</td>
                    <td>{getCategoryName(product.categoryId)}</td>
                    <td>{getBrandName(product.brandId)}</td>
                    <td className="text-truncate" style={{ maxWidth: '200px' }}>{product.description}</td>
                    <td>
                      <span className={`badge ${product.status === 1 ? 'bg-success' : 'bg-secondary'}`}>
                        {product.status === 1 ? 'Hiển thị' : 'Ẩn'}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`product/edit/${product.id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Sửa
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-muted">
                    Không có sản phẩm nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
