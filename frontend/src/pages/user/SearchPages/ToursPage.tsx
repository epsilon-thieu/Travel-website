import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, DollarSign, ArrowRight, Clock, ChevronLeft, ChevronRight, Users, Navigation } from 'lucide-react';
import DatePicker from '../../../components/common/DatePicker';
import { styles } from './SharePagesStyle';
import { useNavigate } from 'react-router-dom';

interface Tour {
    id: string;
    title: string;
    description: string;
    tourType: string;
    price: string;
    discountPrice: string;
    duration: string;
    departureLocation: string;
    destination: string;
    startDate: string;
    availableSeats: number;
    images: string[];
    isTrending: boolean;
    createdAt: string;
}

export const ToursPage: React.FC = () => {
    const navigate = useNavigate();
    // --- States cho Filter ---
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [budget, setBudget] = useState('');

    // --- States cho Data và Phân trang ---
    const [tours, setTours] = useState<Tour[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // Tăng limit lên 10 theo yêu cầu
    const limit = 10;

    // Hàm format tiền tệ VNĐ
    const formatPrice = (price: string) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(price));
    };

    // Hàm format ngày tháng (từ 2026-12-05T00:00:00.000Z -> 05/12/2026)
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    const fetchTourAmount = async () => {
        try {
            const response = await fetch('http://localhost:3600/api/tours/tour-amount');
            if (!response.ok) throw new Error('Failed to fetch amount');
            const data = await response.json();

            if (data && data.tourAmount) {
                const calculatedPages = Math.ceil(data.tourAmount / limit);
                setTotalPages(calculatedPages);
            }
        } catch (error) {
            console.error("Error fetching tour amount:", error);
        }
    };

    const fetchTours = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3600/api/tours?page=${page}&limit=${limit}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            if (data && data.tours) {
                setTours(data.tours);
                // Cuộn mượt mà đến đầu danh sách kết quả (ước lượng tọa độ phần kết quả)
                window.scrollTo({ top: 800, behavior: 'smooth' });
            }
        } catch (error) {
            console.error("Error fetching tours:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTourAmount();
    }, []);

    useEffect(() => {
        fetchTours();
    }, [page]);

    const handleSearch = () => {
        console.log("Searching Tours with params:", { destination, date, budget });
        setIsLoading(true);
    };

    // Thuật toán tạo mảng số trang thông minh
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (page <= 4) {
                pages.push(1, 2, 3, 4, 5, '...', totalPages);
            } else if (page >= totalPages - 3) {
                pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-24">

            {/* --- HERO SECTION ĐƯỢC KHÔI PHỤC LẠI --- */}
            <div className="px-6 md:px-12 lg:px-24 pt-20 mb-16">
                <div className={styles.heroSection}>
                    <img
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
                        alt="Adventure Tours"
                        className={styles.heroImage}
                    />
                    <div className={styles.heroOverlay}></div>
                    <div className={styles.heroContent}>
                        <span className={`${styles.labelOverlineLight} mb-6`}>03 / Expeditions</span>
                        <h1 className={`${styles.headingHeroLight} mb-6`}>EXPLORE<br />TOURS.</h1>
                        <p className={styles.textBodyHeroLight}>
                            Find your next breathtaking adventure around the globe. Authentic and sustainable journeys designed for modern travelers.
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full border-t-2 border-black mb-16"></div>

            {/* --- FILTER SECTION ĐƯỢC KHÔI PHỤC LẠI --- */}
            <div className="px-6 md:px-12 lg:px-24 mb-24">
                <div className={styles.filterContainer}>

                    <div className={`${styles.filterBox} lg:flex-[1.5]`}>
                        <label className={`${styles.labelOverline} mb-3`}>Destination</label>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-black shrink-0" strokeWidth={2} />
                            <input type="text" placeholder="Where to next?" className={styles.filterInput} value={destination} onChange={(e) => setDestination(e.target.value)} />
                        </div>
                    </div>

                    <div className={`${styles.filterBox} z-10`}>
                        <label className={`${styles.labelOverline} mb-3`}>Date</label>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-black shrink-0" strokeWidth={2} />
                            <DatePicker value={date} onChange={(date: Date | null) => setDate(date)} />
                        </div>
                    </div>

                    <div className={styles.filterBox}>
                        <label className={`${styles.labelOverline} mb-3`}>Max Budget</label>
                        <div className="flex items-center gap-3">
                            <DollarSign className="w-5 h-5 text-black shrink-0" strokeWidth={2} />
                            <input type="text" placeholder="Amount" className={styles.filterInput} value={budget} onChange={(e) => setBudget(e.target.value)} />
                        </div>
                    </div>

                    <button onClick={handleSearch} disabled={isLoading} className={styles.btnPrimary}>
                        <span className="font-black text-lg uppercase tracking-widest">
                            {isLoading ? 'Wait' : 'Search'}
                        </span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* --- KẾT QUẢ TÌM KIẾM --- */}
            <div className="px-6 md:px-12 lg:px-24">
                <div className="text-center mb-16">
                    <span className={`${styles.labelOverline} mb-4`}>04 / Results</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Recommended Tours</h2>
                </div>

                {isLoading && tours.length === 0 ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                    </div>
                ) : (
                    <>
                        {/* DANH SÁCH TOUR - THIẾT KẾ DẠNG HÀNG NGANG (LIST VIEW) */}
                        <div className="flex flex-col gap-8 animate-fade-up">
                            {tours.map((tour) => (
                                <div key={tour.id} className="flex flex-col md:flex-row bg-white border border-gray-200 group overflow-hidden hover:shadow-2xl transition-all duration-300">

                                    {/* Ảnh bên trái (Bao gồm ảnh default nếu rỗng) */}
                                    <div
                                        onClick={() => navigate(`/tours/${tour.id}`, { state: { tour } })}
                                        className="w-full md:w-[400px] h-64 md:h-auto relative overflow-hidden bg-gray-100 shrink-0 cursor-pointer"
                                    >
                                        <img
                                            src={tour.images?.length > 0 ? tour.images[0] : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"}
                                            alt={tour.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>

                                    {/* Thông tin bên phải */}
                                    <div className="p-6 md:p-8 flex flex-col flex-1">

                                        {/* Tiêu đề & Loại Tour */}
                                        <div className="mb-6">
                                            <span className="inline-block bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 mb-3">
                                                {tour.tourType || "Chưa cập nhật loại"}
                                            </span>
                                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2 line-clamp-2">
                                                {tour.title}
                                            </h3>
                                        </div>

                                        {/* Lưới hiển thị các thông tin yêu cầu */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs text-gray-500 uppercase tracking-wider font-bold flex items-center gap-1"><Clock size={14} /> Thời gian</span>
                                                <span className="text-sm font-semibold">{tour.duration}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs text-gray-500 uppercase tracking-wider font-bold flex items-center gap-1"><Navigation size={14} /> Hành trình</span>
                                                <span className="text-sm font-semibold">{tour.departureLocation} ➝ {tour.destination}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs text-gray-500 uppercase tracking-wider font-bold flex items-center gap-1"><Calendar size={14} /> Khởi hành</span>
                                                <span className="text-sm font-semibold">{formatDate(tour.startDate)}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs text-gray-500 uppercase tracking-wider font-bold flex items-center gap-1"><Users size={14} /> Chỗ trống</span>
                                                <span className="text-sm font-semibold text-green-600">{tour.availableSeats} chỗ</span>
                                            </div>
                                        </div>

                                        {/* Phần giá nằm ở góc dưới cùng */}
                                        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {tour.discountPrice ? (
                                                    <>
                                                        {/* Có giảm giá: hiện giá gốc gạch ngang + giá giảm */}
                                                        <span className="text-sm text-gray-400 line-through font-bold">
                                                            {formatPrice(tour.price)}
                                                        </span>
                                                        <span className="text-3xl font-black text-black">
                                                            {formatPrice(tour.discountPrice)}
                                                        </span>
                                                    </>
                                                ) : (
                                                    /* Không có giảm giá (null): chỉ hiện giá gốc, không gạch ngang */
                                                    <span className="text-3xl font-black text-black">
                                                        {formatPrice(tour.price)}
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => navigate(`/tours/${tour.id}`, { state: { tour } })}
                                                className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors hidden md:block"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* --- UI PHÂN TRANG --- */}
                        {totalPages > 1 && (
                            <div className="mt-16 flex items-center justify-center gap-2">
                                <button
                                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className={`w-12 h-12 flex items-center justify-center border-2 border-black transition-colors ${page === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black hover:text-white'}`}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                {getPageNumbers().map((pageNum, index) => (
                                    <button
                                        key={index}
                                        onClick={() => typeof pageNum === 'number' && setPage(pageNum)}
                                        disabled={pageNum === '...'}
                                        className={`w-12 h-12 flex items-center justify-center text-sm font-bold transition-colors
                                            ${pageNum === '...' ? 'cursor-default' : 'border-2 border-black cursor-pointer'}
                                            ${pageNum === page ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}
                                        `}
                                    >
                                        {pageNum}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={page === totalPages}
                                    className={`w-12 h-12 flex items-center justify-center border-2 border-black transition-colors ${page === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black hover:text-white'}`}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};