import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Api } from './../../api/Api';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [brand, setBrand] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`${Api}/products/${productId}`);
                console.log('Product data:', response.data); // ✅ kiểm tra phản hồi
                setProduct(response.data);

                if (response.data.brand_id) {
                    const brandResponse = await axios.get(`${Api}/brands/${response.data.brand_id}`);
                    setBrand(brandResponse.data);
                }
            } catch (error) {
                console.error('Error fetching product detail:', error.response ? error.response.data : error.message);
            }
        };

        fetchProductDetail();
    }, [productId]);

    if (!product) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Đang tải chi tiết sản phẩm...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', boxShadow: '0 0 10px #ccc', borderRadius: '10px' }}>
            <img 
                src={`${Api}/products/images/${product.image}`}  // ✅ Sửa đường dẫn ảnh
                alt={product.name} 
                style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'contain',
                    backgroundColor: '#f9f9f9'  // Giúp dễ nhìn khi ảnh nhỏ hơn khung
                }}
            />
            <h2 style={{ marginTop: '20px' }}>{product.name}</h2>
            <p><strong>Giá:</strong> {product.price.toLocaleString()} VND</p>
            <p><strong>Mô tả:</strong> {product.description}</p>
            <p><strong>Thương hiệu:</strong> {brand ? brand.name : 'Không rõ'}</p>
        </div>
    );
};

export default ProductDetail;
