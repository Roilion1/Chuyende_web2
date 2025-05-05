import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Api } from './../../api/Api';

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Lấy dữ liệu banner từ API
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get(`${Api}/banners`);
                console.log(response.data);
                setBanners(response.data);
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };

        fetchBanners();
    }, []);

    // Chuyển sang ảnh tiếp theo mỗi 5 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, [banners.length]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden' }}>
        {banners.length > 0 && (
            <img
            src={`${Api}/images/${banners[currentIndex].image}`} 
            alt={banners[currentIndex].name}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'opacity 1s ease-in-out',
            }}
            />
        )}
        </div>
    );
};

export default Banner;
