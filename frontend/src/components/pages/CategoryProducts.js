import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Api } from './../../api/Api';
import { FaCartPlus, FaHeart, FaEye } from 'react-icons/fa';  

const CategoryProducts = ({ categoryId, categoryName }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${Api}/categories/${categoryId}/products`, {
                    headers: { Authorization: `Bearer ${token}` },
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
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Thêm vào giỏ hàng thành công!');
    };

    const handleToggleFavorite = (product) => {
        let updatedFavorites = [...favorites];

        const exists = favorites.find(item => item.id === product.id);

        if (exists) {
            updatedFavorites = favorites.filter(item => item.id !== product.id);
        } else {
            updatedFavorites.push(product); 
        }

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const handleViewDetails = (productId) => {
        window.location.href = `/product/${productId}`;
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', color: '#333' }}>
                Sản Phẩm Của {categoryName}
            </h3>
            {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</div>}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
                {products.length > 0 ? (
                    products.map(product => (
                        <div
                            key={product.id}
                            style={{
                                width: '220px',
                                backgroundColor: '#fff',
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                padding: '15px',
                                textAlign: 'center',
                                transition: 'transform 0.3s',
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <button
                                onClick={() => handleToggleFavorite(product)}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '24px',
                                    color: favorites.some(item => item.id === product.id) ? 'red' : '#aaa',
                                    cursor: 'pointer'
                                }}
                            >
                                <FaHeart />
                            </button>
                            <img
                                src={`${Api}/images/${product.image}`}
                                alt={product.name}
                                style={{
                                    width: '100%',
                                    height: '160px',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                    marginBottom: '10px'
                                }}
                            />
                            <h4 style={{ fontSize: '18px', margin: '10px 0' }}>{product.name}</h4>
                            <p style={{ fontWeight: 'bold', color: '#e91e63' }}>{product.price} VND</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    style={{
                                        padding: '6px 10px',
                                        backgroundColor: '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '20px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <FaCartPlus />
                                </button>
                                <button
                                    onClick={() => handleViewDetails(product.id)}
                                    style={{
                                        padding: '6px 10px',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '20px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <FaEye />
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
