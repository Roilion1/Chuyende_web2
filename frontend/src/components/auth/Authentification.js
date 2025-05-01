// frontend/src/components/auth/Authentification.js

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Login from './Login';
import Register from './Register';
import axios from 'axios';
import { Api } from './../../api/Api'; // Đảm bảo đường dẫn đúng

const Authentification = ({ user, removeUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [authUser, setAuthUser] = useState(user || {});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getAuth(token);
        }
    }, []);

    useEffect(() => {
        if (user && user.name !== authUser.name) {
            setAuthUser(user);
        }
    }, [user]);

    const getAuth = (token) => {
        axios.get(`${Api}/auth`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((result) => {
                setAuthUser(result.data.user);
            })
            .catch((error) => {
                console.error(error);
                logout();
            });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthUser('');
        removeUser();
    };

    return (
        <div>
            <div>
                <FontAwesomeIcon icon={faSignInAlt} onClick={() => setIsLogin(true)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                <FontAwesomeIcon icon={faUserPlus} onClick={() => setIsLogin(false)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                {authUser.name && (
                    <FontAwesomeIcon icon={faSignOutAlt} onClick={logout} style={{ cursor: 'pointer' }} />
                )}
            </div>
            {isLogin ? (
                <Login setIsLogin={setIsLogin} />
            ) : (
                <Register setIsLogin={setIsLogin} />
            )}
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Chuyển sang Đăng Ký' : 'Chuyển sang Đăng Nhập'}
            </button>
            {authUser.name ? (
                <p>Xin chào, {authUser.name}</p>
            ) : (
                <p>Vui lòng đăng nhập để tiếp tục.</p>
            )}
        </div>
    );
};

export default Authentification;