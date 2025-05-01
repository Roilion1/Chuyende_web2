import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Api } from './../../api/Api';

const Register = ({ setIsLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        fullname: '',
        gender: '',
        thumbnail: '',
        email: '',
        phone: '',
        address: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...formData,
                roles: 'USER',
                status: 1,
            };
            await axios.post(`${Api}/auth/register`, dataToSend);
            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err);
            if (err.response && err.response.data.includes('Email is already in use')) {
                setError('Email đã tồn tại, vui lòng dùng email khác.');
            } else {
                setError('Đăng ký thất bại! Vui lòng kiểm tra lại thông tin.');
            }
        }
    };

    const wrapperStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
        padding: '20px',
    };

    const cardStyle = {
        background: '#fff',
        padding: '40px 30px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '700px',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
    };

    const titleStyle = {
        textAlign: 'center',
        marginBottom: '25px',
        color: '#333',
        fontWeight: '700',
        fontSize: '28px',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
    };

    const groupStyle = {
        display: 'flex',
        flexDirection: 'column',
    };

    const labelStyle = {
        marginBottom: '6px',
        fontWeight: '500',
        color: '#555',
    };

    const inputStyle = {
        padding: '10px 12px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '16px',
        transition: '0.3s',
    };

    const errorTextStyle = {
        marginTop: '10px',
        color: 'red',
        textAlign: 'center',
        fontWeight: '500',
    };

    const buttonStyle = {
        marginTop: '25px',
        padding: '12px',
        background: '#66a6ff',
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    };

    const buttonHoverStyle = {
        background: '#558de8',
    };

    return (
        <div style={wrapperStyle}>
            <div style={cardStyle}>
                <h2 style={titleStyle}>Tạo tài khoản mới</h2>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <div style={gridStyle}>
                        <div style={groupStyle}>
                            <label style={labelStyle}>Tên đăng nhập *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nhập tên đăng nhập"
                                required
                                style={inputStyle}
                            />
                        </div>

                        <div style={groupStyle}>
                            <label style={labelStyle}>Họ và tên *</label>
                            <input
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                placeholder="Nhập họ và tên"
                                required
                                style={inputStyle}
                            />
                        </div>

                        <div style={groupStyle}>
                            <label style={labelStyle}>Giới tính *</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            >
                                <option value="">-- Chọn giới tính --</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>

                        <div style={groupStyle}>
                            <label style={labelStyle}>Link ảnh đại diện</label>
                            <input
                                type="text"
                                name="thumbnail"
                                value={formData.thumbnail}
                                onChange={handleChange}
                                placeholder="URL ảnh đại diện (không bắt buộc)"
                                style={inputStyle}
                            />
                        </div>

                        <div style={groupStyle}>
                            <label style={labelStyle}>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Nhập địa chỉ email"
                                required
                                style={inputStyle}
                            />
                        </div>

                        <div style={groupStyle}>
                            <label style={labelStyle}>Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Nhập số điện thoại"
                                style={inputStyle}
                            />
                        </div>

                        <div style={groupStyle}>
                            <label style={labelStyle}>Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Nhập địa chỉ cư trú"
                                style={inputStyle}
                            />
                        </div>

                        <div style={groupStyle}>
                            <label style={labelStyle}>Mật khẩu *</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Nhập mật khẩu"
                                required
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    {error && <p style={errorTextStyle}>{error}</p>}

                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={(e) => e.target.style.background = buttonHoverStyle.background}
                        onMouseOut={(e) => e.target.style.background = buttonStyle.background}
                    >
                        Đăng Ký
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
