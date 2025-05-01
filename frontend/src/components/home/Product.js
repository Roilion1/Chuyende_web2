import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Api } from './../../api/Api';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get(`${Api}/products`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
            }
        };

        fetchProducts();
    }, []);

    const productGridStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        padding: '20px',
    };

    const productItemStyle = {
        width: '250px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        textAlign: 'center',
        backgroundColor: '#fff',
        transition: 'transform 0.3s',
    };

    const productImageStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Tất Cả Sản Phẩm</h2>
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
            <div style={productGridStyle}>
                {products.map(product => (
                    <div 
                        key={product.id} 
                        style={productItemStyle}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <img
                            src={`${Api}/images/${product.image}`}
                            alt={product.name}
                            style={productImageStyle}
                        />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>{product.price.toLocaleString()} VND</strong></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
