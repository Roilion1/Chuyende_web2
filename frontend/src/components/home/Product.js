import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Api } from './../../api/Api';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);  // Mảng chứa thông tin thương hiệu
    // const [error, setError] = useState('');
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    const [currentPage, setCurrentPage] = useState(1); 
    const productsPerPage = 4; 

    // Lấy dữ liệu sản phẩm và thương hiệu
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
                console.log('Products:', response.data);  // Kiểm tra dữ liệu sản phẩm

                // Fetch các thương hiệu dựa trên brand_id từ sản phẩm
                const brandIds = response.data.map(product => product.brand_id);
                const uniqueBrandIds = [...new Set(brandIds)];  // Lọc các brand_id duy nhất

                const brandResponses = await Promise.all(
                    uniqueBrandIds.map(brandId => axios.get(`${Api}/brands/${brandId}`))
                );

                const brandData = brandResponses.map(res => res.data);
                setBrands(brandData);
                console.log("Brand Data: ", brandData);  // Kiểm tra dữ liệu thương hiệu

            } catch (error) {
                console.error('Error fetching products:', error);
                // setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
            }
        };

        fetchProducts();
    }, []);

    // Hàm để lấy tên thương hiệu từ brand_id
    const getBrandName = (brandId) => {
        console.log('brandId: ', brandId);  // Kiểm tra id của thương hiệu
        const brand = brands.find(b => b.id === brandId);  // Tìm thương hiệu trong mảng brands
        console.log('Brand found: ', brand);  // Kiểm tra nếu thương hiệu được tìm thấy
        return brand ? brand.name : 'Không có thương hiệu';  // Nếu tìm thấy, trả về tên, ngược lại trả về "Không có thương hiệu"
    };

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

    // Tính toán sản phẩm sẽ được hiển thị cho trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Tính toán số trang
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Tất Cả Sản Phẩm</h2>
            {/* {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>} */}
            
            {/* Hiển thị sản phẩm */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'center',
                padding: '20px',
            }}>
                {currentProducts.map(product => (
                    <div key={product.id} style={{
                        width: '250px',
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        textAlign: 'center',
                        backgroundColor: '#fff',
                        transition: 'transform 0.3s',
                        position: 'relative',
                    }}>
                        <button
                            onClick={() => handleToggleFavorite(product)}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'none',
                                border: 'none',
                                fontSize: '20px',
                                color: favorites.some(item => item.id === product.id) ? 'red' : '#aaa',
                                cursor: 'pointer'
                            }}
                        >
                            ♥
                        </button>
                        <img
                            src={`${Api}/images/${product.image}`}
                            alt={product.name}
                            style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'contain',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '8px',
                                marginBottom: '10px'  
                            }}
                        />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>{product.price.toLocaleString()} VND</strong></p>
                        <p><strong>Thương hiệu: </strong>{getBrandName(product.brand_id)}</p> {/* Hiển thị thương hiệu */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <button onClick={() => handleAddToCart(product)} style={{ padding: '6px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px' }}>Thêm giỏ hàng</button>
                            <button onClick={() => handleViewDetails(product.id)} style={{ padding: '6px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px' }}>Chi tiết</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Phân trang */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1} 
                    style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px' }}
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button 
                        key={index + 1} 
                        onClick={() => handlePageChange(index + 1)} 
                        style={{
                            padding: '8px 16px', 
                            backgroundColor: currentPage === index + 1 ? '#007bff' : '#ddd', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '6px',
                            margin: '0 5px',
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages} 
                    style={{ marginLeft: '10px', padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px' }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Product;
