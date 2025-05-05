import React, { useEffect, useState } from 'react';
import { Api } from './../../api/Api';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const ShoppingCart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();  // Khởi tạo hook navigate

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const groupedCart = [];
        savedCart.forEach(product => {
            const existing = groupedCart.find(p => p.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                groupedCart.push({ ...product, quantity: 1 });
            }
        });
        setCart(groupedCart);
    }, []);

    const updateLocalStorage = (updatedCart) => {
        const flatCart = updatedCart.flatMap(product =>
            Array(product.quantity).fill({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
            })
        );
        localStorage.setItem('cart', JSON.stringify(flatCart));
    };

    const increaseQuantity = (productId) => {
        const updatedCart = cart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const decreaseQuantity = (productId) => {
        const updatedCart = cart
            .map(item =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter(item => item.quantity > 0); 
        setCart(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const removeProduct = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const totalAmount = cart.reduce((total, product) => total + product.price * product.quantity, 0);

    // Hàm xử lý chuyển hướng đến trang thanh toán
    const handleCheckout = () => {
        navigate('/checkout');  // Chuyển đến đường dẫn /checkout
    };

    return (
        <div style={{ padding: '30px' }}>
            <h2 style={{ textAlign: 'center' }}>Giỏ Hàng Của Bạn</h2>
            {cart.length === 0 ? (
                <p style={{ textAlign: 'center' }}>Giỏ hàng đang trống.</p>
            ) : (
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {cart.map(product => (
                        <div key={product.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '20px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            boxShadow: '0 0 10px rgba(0,0,0,0.05)'
                        }}>
                            <img
                                src={`${Api}/images/${product.image}`}
                                alt={product.name}
                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                            <div style={{ flex: '1', marginLeft: '20px' }}>
                                <h4>{product.name}</h4>
                                <p>Giá: {product.price.toLocaleString()} VND</p>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <button onClick={() => decreaseQuantity(product.id)}>-</button>
                                    <span style={{ margin: '0 10px' }}>{product.quantity}</span>
                                    <button onClick={() => increaseQuantity(product.id)}>+</button>
                                </div>
                            </div>
                            <div>
                                <p><strong>Tổng:</strong> {(product.price * product.quantity).toLocaleString()} VND</p>
                                <button
                                    onClick={() => removeProduct(product.id)}
                                    style={{ marginTop: '10px', backgroundColor: 'red', color: 'white', padding: '6px 10px', border: 'none', borderRadius: '6px' }}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                    <h3 style={{ textAlign: 'right' }}>Tổng cộng: {totalAmount.toLocaleString()} VND</h3>

                    <div style={{ textAlign: 'right', marginTop: '20px' }}>
                        <button
                            onClick={handleCheckout}  // Gọi hàm chuyển hướng
                            style={{
                                backgroundColor: '#28a745',
                                color: 'white',
                                padding: '10px 20px',
                                fontSize: '16px',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                        >
                            Thanh Toán
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
