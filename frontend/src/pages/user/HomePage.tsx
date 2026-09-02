import React, { useState, useEffect } from 'react';
import { Play, Calendar, MapPin, Users, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const [promoBanners, setPromoBanners] = useState([]);
    const [trendingTours, setTrendingTours] = useState([]);
    const [suggestedTours, setSuggestedTours] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHomePageData = async () => {
            try {
                // Giả lập call API
                setIsLoading(false);
            } catch (error) {
                console.error("Lỗi khi fetch dữ liệu HomePage:", error);
                setIsLoading(false);
            }
        };

        fetchHomePageData();
    }, []);

    return (
        <div className="flex flex-col w-full h-full">
            {/* 1. HERO SECTION */}
            <div className="hero-grid">
                <div className="hero-text-col">
                    <div className="badge-tag animate-fade-in-up">
                        <ShieldCheck className="w-4 h-4" /> TOP DESTINATIONS 2026
                    </div>

                    <h1 className="hero-headline animate-fade-in-up delay-100">
                        Explore Nature's <br />
                        <span className="hero-headline-highlight">Hidden Wonders</span>
                    </h1>

                    <p className="hero-subtext animate-fade-in-up delay-200">
                        Indulge in pristine nature expeditions, from cloud-kissed peaks to magnificent waterfalls. Reserve your voyage today.
                    </p>

                    <div className="hero-actions animate-fade-in-up delay-300">
                        {/* Đã thay đổi hover:scale-105 thành hover:-translate-y-1 và thêm cursor-pointer */}
                        <button onClick={() => navigate('/search')} className="btn-explore cursor-pointer hover:-translate-y-1">
                            Discover Now <ArrowRight className="w-5 h-5" />
                        </button>

                        <button className="btn-watch-demo cursor-pointer hover:-translate-y-1">
                            <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-400">
                                <Play className="w-4 h-4 fill-emerald-400" />
                            </div>
                            Watch Video
                        </button>
                    </div>
                </div>

                <div className="widget-card animate-fade-in-right delay-200 hover:shadow-[0_20px_60px_-10px_#10b98133] transition-shadow duration-500">
                    <div className="widget-header">
                        <div>
                            <span className="text-xs text-emerald-400 font-semibold tracking-widest uppercase">Featured Tour</span>
                            <h3 className="widget-title">Ha Giang Loop Pass</h3>
                        </div>
                        <div className="rating-box">
                            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                            <span>4.9 (128)</span>
                        </div>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="input-box-dark transition-transform hover:-translate-y-1 cursor-pointer">
                            <MapPin className="w-5 h-5 text-emerald-400" />
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase">Destination</p>
                                <p className="font-medium text-white">Ha Giang, Vietnam</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="input-box-dark transition-transform hover:-translate-y-1 cursor-pointer">
                                <Calendar className="w-5 h-5 text-emerald-400" />
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase">Departure</p>
                                    <p className="font-medium text-white">October 15th</p>
                                </div>
                            </div>
                            <div className="input-box-dark transition-transform hover:-translate-y-1 cursor-pointer">
                                <Users className="w-5 h-5 text-emerald-400" />
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase">Guests</p>
                                    <p className="font-medium text-white">2 People</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-end justify-between pt-4 border-t border-white/10">
                        <div>
                            <p className="text-xs text-gray-400">All-inclusive from</p>
                            <p className="price-highlight">$299 <span className="text-xs font-normal text-gray-400">/ person</span></p>
                        </div>
                        {/* Đã thay đổi hover:scale-105 thành hover:-translate-y-1 và thêm cursor-pointer */}
                        <button onClick={() => navigate('/register')} className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-bold rounded-xl transition-all shadow-lg cursor-pointer hover:-translate-y-1">
                            Reserve Now
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. DYNAMIC CONTENT SECTIONS */}
            <div className="api-section-container">

                <section className="animate-fade-in-up delay-400">
                    <h2 className="text-2xl font-bold text-white mb-4">Banner Khuyến mãi</h2>
                    <div className="api-section hover:border-emerald-400/50 transition-colors cursor-pointer">
                        <p>Khu vực map danh sách Banner quảng cáo/Khuyến mãi</p>
                    </div>
                </section>

                <section className="animate-fade-in-up delay-500">
                    <h2 className="text-2xl font-bold text-white mb-4">Trending / Ưu đãi</h2>
                    <div className="api-section hover:border-emerald-400/50 transition-colors cursor-pointer">
                        <p>Khu vực map danh sách Tour thịnh hành, giảm giá</p>
                    </div>
                </section>

                <section className="animate-fade-in-up delay-600">
                    <h2 className="text-2xl font-bold text-white mb-4">Gợi ý theo sở thích</h2>
                    <div className="api-section hover:border-emerald-400/50 transition-colors cursor-pointer">
                        <p>Khu vực map danh sách Gợi ý cá nhân</p>
                    </div>
                </section>

            </div>
        </div>
    );
};