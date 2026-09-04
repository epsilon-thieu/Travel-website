import React, { useState, useEffect } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    // States logic giữ nguyên
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHomePageData = async () => {
            try {
                // Mock API call
                setIsLoading(false);
            } catch (error) {
                console.error("Lỗi khi fetch dữ liệu HomePage:", error);
                setIsLoading(false);
            }
        };
        fetchHomePageData();
    }, []);

    return (
        <div className="w-full">
            {/* 1. HERO SECTION */}
            <section className="hero-section">

                {/* Tiêu đề in to trên nền ảnh */}
                <div className="hero-title-container">
                    <span className="hero-label-top">Featured Tour</span>
                    <h1 className="hero-title-main">Ha Giang<br />Loop</h1>
                </div>

                {/* Box nội dung màu vàng nổi bật */}
                <div className="hero-overlay-card">
                    <p className="hero-description">
                        Packed with breathtaking views, majestic mountain passes, and authentic local culture. Discover the raw beauty of northern Vietnam in our most highly-rated expedition.
                    </p>

                    <button onClick={() => navigate('/register')} className="btn-dark-outline">
                        Get Your Ticket <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="feature-row">
                        <div className="feature-item">
                            <span className="feature-label">Rating</span>
                            <span className="feature-value flex items-center gap-1">
                                4.9 <Star className="w-3.5 h-3.5 fill-gray-900" />
                            </span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-label">Duration</span>
                            <span className="feature-value">3 Days</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-label">Starting at</span>
                            <span className="feature-value">$299</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. DYNAMIC CONTENT SECTIONS */}
            <div className="section-container">

                <section className="animate-fade-in">
                    <h2 className="section-header">Promotions & Offers</h2>
                    <div className="api-placeholder hover:border-gray-400 transition-colors cursor-pointer">
                        <p>Khu vực map danh sách Banner quảng cáo/Khuyến mãi</p>
                    </div>
                </section>

                <section className="animate-fade-in" style={{ animationDelay: '150ms' }}>
                    <h2 className="section-header">Trending Destinations</h2>
                    <div className="api-placeholder hover:border-gray-400 transition-colors cursor-pointer">
                        <p>Khu vực map danh sách Tour thịnh hành, giảm giá</p>
                    </div>
                </section>

                <section className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                    <h2 className="section-header">Tailored For You</h2>
                    <div className="api-placeholder hover:border-gray-400 transition-colors cursor-pointer">
                        <p>Khu vực map danh sách Gợi ý cá nhân</p>
                    </div>
                </section>

            </div>
        </div>
    );
};