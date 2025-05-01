import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import { Api } from './../../api/Api';

const Login = ({ setIsLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${Api}/auth/login`, { email, password });
            const token = response.data.token;

            // Lưu token vào localStorage
            localStorage.setItem('token', token);

            // Gọi setIsLogin(true) để App biết đã đăng nhập
            if (setIsLogin) {
                setIsLogin(true);
            }

            alert('Đăng nhập thành công!');
            navigate('/'); // chuyển về trang chủ hoặc trang category tùy bạn
        } catch (error) {
            setError('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.');
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>Đăng Nhập</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập Email"
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập Mật Khẩu"
                        required
                        style={styles.input}
                    />
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => e.target.style.background = styles.buttonHover.background}
                        onMouseOut={(e) => e.target.style.background = styles.button.background}
                    >
                        Đăng Nhập
                    </button>
                    {error && <p style={styles.errorText}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
        padding: '20px',
    },
    card: {
        background: '#fff',
        padding: '40px 30px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '25px',
        color: '#333',
        fontWeight: '700',
        fontSize: '28px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '12px 15px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '16px',
        marginBottom: '20px',
        transition: '0.3s',
    },
    button: {
        padding: '12px',
        background: '#66a6ff',
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
    buttonHover: {
        background: '#558de8',
    },
    errorText: {
        marginTop: '10px',
        color: 'red',
        textAlign: 'center',
        fontWeight: '500',
    },
};

export default Login;
