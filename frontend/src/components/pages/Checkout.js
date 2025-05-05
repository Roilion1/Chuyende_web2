import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

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
        const totalAmount = groupedCart.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );
        setTotal(totalAmount);
    }, []);

    const handlePayment = async () => {
        try {
            const response = await axios.get("https://e479-2405-4802-9031-5080-4d25-e22a-4d75-d9a6.ngrok-free.app/api/payment/create");

            console.log("Phản hồi từ backend:", response.data);

            const paymentUrl = response.data?.URL;

            if (paymentUrl && typeof paymentUrl === "string" && paymentUrl.startsWith("http")) {
                window.location.href = paymentUrl;
            } else {
                console.error("Không tìm thấy URL thanh toán hợp lệ:", paymentUrl);
            }

        } catch (error) {
            console.error("Thanh toán thất bại:", error);
        }
    };

    return (
        <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Thanh Toán</h2>
            {cart.length === 0 ? (
                <p>Không có sản phẩm nào để thanh toán.</p>
            ) : (
                <>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id} style={{ marginBottom: '10px' }}>
                                {item.name} - SL: {item.quantity} - Tổng: {(item.price * item.quantity).toLocaleString()} VND
                            </li>
                        ))}
                    </ul>
                    <h3>Tổng cộng: {total.toLocaleString()} VND</h3>
                    <button
                        onClick={handlePayment}
                        style={{
                            backgroundColor: '#007bff',
                            color: '#fff',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '6px',
                            marginTop: '20px',
                            cursor: 'pointer'
                        }}
                    >
                        Xác nhận thanh toán
                    </button>
                </>
            )}
        </div>
    );
};

export default Checkout;
