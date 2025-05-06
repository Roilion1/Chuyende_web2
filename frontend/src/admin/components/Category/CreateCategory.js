import React, { Component } from 'react';
import axios from 'axios';
import { Api } from '../../../api/Api';

class CreateCategory extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            slug: '',
            parent_id: 0,
            sort_order: 0,
            image: '',
            description: '',
            status: 1,
            success: false,
            error: ''
        };

        this.baseState = this.state;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Hàm tạo slug từ name
    generateSlug(name) {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // Gửi dữ liệu lên API để tạo category
    handleSubmit(e) {
        e.preventDefault();
        const { name, parent_id, sort_order, image, description, status } = this.state;
        const slug = this.generateSlug(name);

        const newCategory = {
            name,
            slug,
            parent_id: parseInt(parent_id),
            sort_order: parseInt(sort_order),
            image,
            description,
            status,
            created_by: 1, // gán mặc định hoặc lấy từ user đăng nhập nếu có
            updated_by: 1  // giống trên
        };

        axios.post(`${Api}/categories`, newCategory, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                this.setState({ ...this.baseState, success: true });
            })
            .catch(err => {
                this.setState({
                    error: err.response?.data?.message || 'Đã xảy ra lỗi!',
                    success: false
                });
            });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value, error: '', success: false });
    }

    render() {
        const { name, parent_id, sort_order, image, description, status, error, success } = this.state;

        return (
            <div className="container-fluid">
                {success && (
                    <div className="alert alert-success">Danh mục đã được tạo thành công.</div>
                )}
                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Thêm danh mục mới</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Tên danh mục</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            {/* <div className="form-group">
                                <label>Parent ID (ID danh mục cha)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="parent_id"
                                    value={parent_id}
                                    onChange={this.handleChange}
                                />
                            </div> */}

                            <div className="form-group">
                                <label>Thứ tự sắp xếp</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="sort_order"
                                    value={sort_order}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Hình ảnh (tên file)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="image"
                                    value={image}
                                    onChange={this.handleChange}
                                    required
                                />
                                <small className="text-muted">Ví dụ: category1.jpg (đảm bảo file đã được upload trước)</small>
                            </div>

                            <div className="form-group">
                                <label>Mô tả</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={description}
                                    onChange={this.handleChange}
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Trạng thái</label>
                                <select
                                    className="form-control"
                                    name="status"
                                    value={status}
                                    onChange={this.handleChange}
                                >
                                    <option value={1}>Hiển thị</option>
                                    <option value={0}>Ẩn</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary float-right">Tạo danh mục</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateCategory;
