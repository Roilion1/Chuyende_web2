import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Api } from './../../api/Api';
import { useNavigate } from 'react-router-dom';

const CategoryProducts = ({ categoryId, categoryName }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${Api}/categories/${categoryId}/products`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Không thể tải sản phẩm. Vui lòng thử lại.');
            }
        };
        fetchProducts();
    }, [categoryId]);

    const handleAddToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find(item => item.id === product.id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Đã thêm vào giỏ hàng!');
    };

    const handleViewDetail = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3 style={{
                textAlign: 'center',
                fontSize: '28px',
                fontWeight: 'bold',
                marginBottom: '30px',
                color: '#333'
            }}>
                Sản Phẩm Của {categoryName}
            </h3>

            {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</div>}

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '30px',
                justifyContent: 'center'
            }}>
                {products.length > 0 ? (
                    products.map(product => (
                        <div
                            key={product.id}
                            style={{
                                width: '250px',
                                backgroundColor: '#fff',
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                padding: '15px',
                                textAlign: 'center',
                                transition: 'transform 0.3s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <img
                                src={`${Api}/images/${product.image}`}
                                alt={product.name}
                                style={{
                                    width: '100%',
                                    height: '160px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    marginBottom: '10px'
                                }}
                            />
                            <h4 style={{ fontSize: '18px', margin: '10px 0' }}>{product.name}</h4>
                            <p style={{ fontWeight: 'bold', color: '#e91e63' }}>{product.price} VND</p>
                            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#4caf50',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        padding: '8px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Thêm vào giỏ
                                </button>
                                <button
                                    onClick={() => handleViewDetail(product.id)}
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#2196f3',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        padding: '8px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', fontStyle: 'italic' }}>Không có sản phẩm trong danh mục này.</div>
                )}
            </div>
        </div>
    );
};

export default CategoryProducts;
