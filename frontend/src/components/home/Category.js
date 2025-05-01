// Category.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Api } from './../../api/Api';
import CategoryProducts from './../pages/CategoryProducts';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Vui lòng đăng nhập.');
                    return;
                }
                const response = await axios.get(`${Api}/categories`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Không thể tải danh mục. Vui lòng thử lại.');
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const categoryStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'space-around',
        padding: '20px',
    };

    const categoryItemStyle = {
        width: '200px',
        cursor: 'pointer',
        textAlign: 'center',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#fff',
    };

    const categoryImgStyle = {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
    };

    const errorStyle = {
        textAlign: 'center',
        color: 'red',
        marginTop: '20px',
        fontWeight: 'bold',
    };

    return (
        <div>
            <div className="categories">
                <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Danh Mục</h2>
                {error && <div style={errorStyle}>{error}</div>}
                <div style={categoryStyle}>
                    {categories.map(category => (
                        <div
                            key={category.id}
                            style={categoryItemStyle}
                            onClick={() => handleCategoryClick(category)}
                        >
                            <img
                                src={`${Api}/images/${category.image}`}
                                alt={category.name}
                                style={categoryImgStyle}
                            />
                            <h3>{category.name}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {selectedCategory && (
                <CategoryProducts
                    categoryId={selectedCategory.id}
                    categoryName={selectedCategory.name}
                />
            )}
        </div>
    );
};

export default Category;
