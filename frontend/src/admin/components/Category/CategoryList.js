import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import CategoryForm from './CategoryForm';
import { Api } from '../../../api/Api';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [categoryToEdit, setCategoryToEdit] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${Api}/product/categories`);
            setCategories(response.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Failed to fetch categories'
            });
        }
    };

    const handleDeleteCategory = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => result.isConfirmed);

        if (!isConfirm) {
            return;
        }

        try {
            await axios.delete(`${Api}/product/categories/${id}`);
            setCategories(categories.filter(category => category.id !== id));
            Swal.fire({
                icon: 'success',
                text: 'Category deleted successfully'
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Failed to delete category'
            });
        }
    };

    const handleEditClick = (category) => {
        setCategoryToEdit(category);
    };

    const handleCategoryFormSubmit = () => {
        fetchCategories();
        setCategoryToEdit(null);
    };

    return (
        <div className="container">
            <h3>Quản lý danh mục</h3>
            <CategoryForm
                categoryToEdit={categoryToEdit}
                onSubmit={handleCategoryFormSubmit}
            />
            <table className="table table-bordered mt-4" style={{ textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên danh mục</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <i class="fa fa-edit" onClick={() => handleEditClick(category)} style={{ width: '30px' }}></i>
                                <i class="fa fa-trash" onClick={() => handleDeleteCategory(category.id)}></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
