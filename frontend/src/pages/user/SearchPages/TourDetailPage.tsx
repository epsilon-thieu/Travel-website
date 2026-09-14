import React from 'react';
import { ArrowRight, Star, Clock, MapPin, Calendar, Users, Navigation } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';

export const TourDetailPage: React.FC = () => {
    // 2. Lấy dữ liệu tour từ state của Router
    const location = useLocation();
    const tour = location.state?.tour;

    // 3. Xử lý trường hợp người dùng copy link paste trực tiếp (không có state)
    // Nếu không có data tour, có thể chuyển hướng về lại trang danh sách hoặc gọi API getTourById ở đây.
    if (!tour) {
        return <Navigate to="/tours" replace />;
    }
    // Format tiền tệ
    const formatPrice = (price: string) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(price) / 25000).replace('.00', '');
        // Note: Demo đổi sang USD cho giống ảnh thiết kế (hoặc bạn có thể đổi lại hàm VND cũ)
    };

    // Format ngày tháng
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    // Xử lý tách Tên chính (VD: PHÚ QUỐC, VŨNG TÀU) để in to như chữ "HA GIANG LOOP"
    const titleParts = tour.title.split(':');
    const mainTitle = titleParts[0].trim();
    const subTitle = titleParts.length > 1 ? titleParts.slice(1).join(':').trim() : '';

    // Trích xuất 1 đoạn ngắn của description để cho vào box vàng
    const shortDescription = tour.description.split('\n')[2] || "Packed with breathtaking views, majestic mountain passes, and authentic local culture. Discover the raw beauty in our most highly-rated expedition.";

    // Ảnh mặc định nếu tour không có ảnh
    const defaultHeroImage = "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2000&q=80";
    const heroImage = tour.images?.length > 0 ? tour.images[0] : defaultHeroImage;
    const galleryImages = tour.images?.length > 1 ? tour.images.slice(1) : [defaultHeroImage, defaultHeroImage, defaultHeroImage];

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">

            {/* --- 1. HERO SECTION (BÁM SÁT THIẾT KẾ ẢNH) --- */}
            <div className="relative w-full h-[90vh] md:h-screen min-h-[700px] overflow-hidden bg-teal-600 flex items-center">
                {/* Hero Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt={mainTitle}
                        className="w-full h-full object-cover opacity-80 mix-blend-overlay" // mix-blend để ám màu nếu muốn, có thể bỏ đi để lấy ảnh gốc
                    />
                    <div className="absolute inset-0 bg-black/20"></div> {/* Lớp mờ để dễ đọc chữ */}
                </div>

                {/* Main Title (Chữ khổng lồ) */}
                <div className="relative z-10 px-6 md:px-12 lg:px-24 w-full -mt-32">
                    <span className="text-white font-bold tracking-widest uppercase text-sm mb-4 block">
                        FEATURED TOUR • {tour.tourType}
                    </span>
                    <h1 className="text-white font-black uppercase leading-[0.85] tracking-tighter" style={{ fontSize: 'clamp(4rem, 12vw, 12rem)' }}>
                        {mainTitle}
                        <br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>TOUR</span> {/* Hiệu ứng viền chữ giả lập */}
                    </h1>
                </div>

                {/* Yellow Info Box (Góc dưới bên trái) */}
                <div className="absolute bottom-0 left-0 md:left-12 lg:left-24 bg-[#FFD600] w-full md:w-[500px] p-8 md:p-12 z-20 shadow-2xl">
                    <p className="text-black font-medium text-lg leading-relaxed mb-8 line-clamp-4">
                        {shortDescription}
                    </p>

                    <button className="bg-black text-white rounded-full px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3 mb-10 hover:bg-gray-800 transition-colors">
                        GET YOUR TICKET <ArrowRight size={16} />
                    </button>

                    <hr className="border-black/20 mb-6" />

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-black">
                        <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest mb-1">Rating</span>
                            <span className="text-xl font-black flex items-center gap-1">4.9 <Star size={16} className="fill-black" /></span>
                        </div>
                        <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest mb-1">Duration</span>
                            <span className="text-xl font-black">{tour.duration}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest mb-1">Starting At</span>
                            <span className="text-xl font-black">{formatPrice(tour.discountPrice || tour.price)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- 2. CHI TIẾT TOUR (THÔNG TIN & HÌNH ẢNH) --- */}
            <div className="px-6 md:px-12 lg:px-24 py-24 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* Cột trái: Thông tin chính */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
                            {subTitle || mainTitle}
                        </h2>

                        {/* Render Description (xử lý xuống dòng) */}
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                            {tour.description.split('\n').map((paragraph: string, index: number) => (
                                paragraph.trim() !== '' && (
                                    <p key={index} className={paragraph.startsWith('✔') ? 'font-bold text-black mt-8' : ''}>
                                        {paragraph}
                                    </p>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Cột phải: Bảng tóm tắt (Quick Facts) */}
                    <div className="bg-gray-50 p-8 border border-gray-200 self-start sticky top-24">
                        <h3 className="text-xl font-black uppercase tracking-widest mb-8 border-b-2 border-black pb-4">
                            Tour Overview
                        </h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <Navigation className="w-6 h-6 mt-1" />
                                <div>
                                    <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Route</span>
                                    <span className="font-semibold text-lg">{tour.departureLocation} ➝ {tour.destination}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Calendar className="w-6 h-6 mt-1" />
                                <div>
                                    <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Start Date</span>
                                    <span className="font-semibold text-lg">{formatDate(tour.startDate)}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Users className="w-6 h-6 mt-1" />
                                <div>
                                    <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Availability</span>
                                    <span className="font-semibold text-lg text-green-600">{tour.availableSeats} Seats Left</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-gray-200">
                            <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Price</span>
                            {tour.discountPrice ? (
                                <div className="flex flex-col">
                                    <span className="text-lg text-gray-400 line-through font-bold">{formatPrice(tour.price)}</span>
                                    <span className="text-4xl font-black text-black">{formatPrice(tour.discountPrice)}</span>
                                </div>
                            ) : (
                                <span className="text-4xl font-black text-black">{formatPrice(tour.price)}</span>
                            )}

                            <button className="w-full mt-6 bg-[#FFD600] text-black hover:bg-black hover:text-white transition-colors py-4 font-black uppercase tracking-widest text-sm">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- 3. PHOTO GALLERY --- */}
                <div className="mt-24">
                    <h3 className="text-2xl font-black uppercase tracking-widest mb-8 text-center border-b-2 border-black pb-4 max-w-xs mx-auto">
                        Gallery
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {galleryImages.map((imgUrl: string, index: number) => (
                            <div key={index} className="relative h-64 overflow-hidden group">
                                <img
                                    src={imgUrl}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};