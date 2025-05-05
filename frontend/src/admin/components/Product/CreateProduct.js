import React, { Component } from 'react';
import axios from 'axios';
import { Api } from '../../../api/Api';

class CreateProduct extends Component {
    constructor() {
        super();

        this.state = {
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
        };

        this.baseState = this.state;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getCategories();
        this.getBrands();
    }

    // Fetch danh mục từ API
    getCategories() {
        axios.get(`${Api}/categories`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Gửi token trong header
            }
        })
            .then(response => {
                const firstId = response.data[0]?.id || '';
                this.setState({
                    categoryId: firstId,
                    categories: response.data,
                    isLoading: false // Dừng trạng thái loading khi nhận được dữ liệu
                });
            })
            .catch(() => {
                this.setState({ error: 'Không thể tải danh mục', isLoading: false });
            });
    }

    // Fetch thương hiệu từ API
    getBrands() {
        axios.get(`${Api}/brands`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Gửi token trong header
            }
        })
            .then(response => {
                const firstId = response.data[0]?.id || '';
                this.setState({
                    brandId: firstId,
                    brands: response.data,
                    isLoading: false // Dừng trạng thái loading khi nhận được dữ liệu
                });
            })
            .catch(() => {
                this.setState({ error: 'Không thể tải thương hiệu', isLoading: false });
            });
    }

    // Tạo slug từ tên sản phẩm
    generateSlug(name) {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // Gửi dữ liệu lên API để tạo sản phẩm
    handleSubmit(e) {
        e.preventDefault();

        const { name, categoryId, brandId, description, content, image, price } = this.state;
        const slug = this.generateSlug(name);

        const newProduct = {
            name,
            slug,
            categoryId: parseInt(categoryId),
            brandId: parseInt(brandId),
            description,
            content,
            image, // Tên file ảnh đã có sẵn như 'l3.jpg'
            price: parseFloat(price),
            status: 1
        };

        axios.post(`${Api}/products`, newProduct, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Gửi token trong header
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                this.setState({
                    ...this.baseState,
                    success: true
                });
                this.getCategories();
                this.getBrands();
            })
            .catch(err => {
                this.setState({
                    error: err.response?.data?.message || 'Đã xảy ra lỗi!',
                    isLoading: false
                });
            });
    }

    // Cập nhật giá trị trong form
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value, success: false, error: '' });
    }

    render() {
        const { categories, brands, isLoading, error, success } = this.state;

        return (
            <div className="container-fluid">
                {success && (
                    <div className="alert alert-success">
                        Sản phẩm đã được tạo thành công.
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Thêm sản phẩm mới</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Tên sản phẩm</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Danh mục</label>
                                <select
                                    name="categoryId"
                                    className="form-control"
                                    value={this.state.categoryId}
                                    onChange={this.handleChange}
                                    required
                                >
                                    {isLoading ? (
                                        <option>Đang tải...</option>
                                    ) : (
                                        categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))
                                    )}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Thương hiệu</label>
                                <select
                                    name="brandId"
                                    className="form-control"
                                    value={this.state.brandId}
                                    onChange={this.handleChange}
                                    required
                                >
                                    {isLoading ? (
                                        <option>Đang tải...</option>
                                    ) : (
                                        brands.map(b => (
                                            <option key={b.id} value={b.id}>{b.name}</option>
                                        ))
                                    )}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Giá</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    value={this.state.price}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Tên file hình ảnh (đã upload)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="image"
                                    value={this.state.image}
                                    onChange={this.handleChange}
                                    required
                                />
                                <small className="text-muted">VD: l3.jpg — đảm bảo file đã được tải lên thư mục server</small>
                            </div>

                            <div className="form-group">
                                <label>Mô tả</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    rows="3"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Chi tiết sản phẩm</label>
                                <textarea
                                    className="form-control"
                                    name="content"
                                    rows="4"
                                    value={this.state.content}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary float-right">Tạo sản phẩm</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateProduct;
