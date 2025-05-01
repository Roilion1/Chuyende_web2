import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Api } from '../../../api/Api';

const CategoryForm = ({ categoryToEdit, onSubmit }) => {
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (categoryToEdit) {
            setCategoryName(categoryToEdit.name);
        } else {
            setCategoryName('');
        }
    }, [categoryToEdit]);

    const handleAddCategory = async () => {
        try {
            const response = await axios.post(`${Api}/product/categories`, { name: categoryName });
            onSubmit();
            setCategoryName('');
            Swal.fire({
                icon: 'success',
                text: 'Category added successfully'
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Failed to add category'
            });
        }
    };

    const handleEditCategory = async () => {
        try {
            await axios.post(`${Api}/product/categories/${categoryToEdit.id}`, { name: categoryName });
            onSubmit();
            setCategoryName('');
            Swal.fire({
                icon: 'success',
                text: 'Category updated successfully'
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Failed to update category'
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (categoryToEdit) {
            handleEditCategory();
        } else {
            handleAddCategory();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-group">
            <label className="small mb-1">Nhập danh mục</label>
            <input
                type="text"
                className="form-control"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
            />
            <button type="submit" className="btn btn-primary mt-2">
                {categoryToEdit ? 'Cập nhật danh mục' : 'Thên danh mục'}
            </button>
        </form>
    );
};

export default CategoryForm;
