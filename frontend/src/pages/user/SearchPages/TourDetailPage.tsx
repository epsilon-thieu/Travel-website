<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, CheckCircle2, MapPin, Star, Users } from 'lucide-react';
import { formatTourPrice, type Tour } from '../../../components/common/TourCard';

type TourReview = {
    id: string;
    rating: number;
    comment?: string | null;
    createdAt?: string | null;
    user?: { fullName: string; avatarUrl?: string | null } | null;
};
type TourDetail = Tour & {
    reviews: TourReview[];
    departureLocation?: string | null;
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3600';
const formatDate = (value: string) => new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(new Date(value));

export const TourDetailPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState<TourDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [bookingMessage, setBookingMessage] = useState('');

    useEffect(() => {
        const controller = new AbortController();
        const loadTour = async () => {
            setIsLoading(true);
            setError('');
            try {
                const response = await fetch(`${API_URL}/api/tours/${encodeURIComponent(id ?? '')}`, { signal: controller.signal });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Không thể tải thông tin tour.');
                setTour(data.tour);
            } catch (requestError) {
                if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
                setError(requestError instanceof Error ? requestError.message : 'Đã xảy ra lỗi khi tải tour.');
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        };
        void loadTour();
        return () => controller.abort();
    }, [id]);

    const handleBooking = () => {
        if (!localStorage.getItem('token')) {
            navigate(`/login?next=${encodeURIComponent(`/tours/${tour?.id ?? id}`)}`);
            return;
        }
        setBookingMessage('Bạn đã đăng nhập. Bước gửi yêu cầu đặt chỗ sẽ được nối với API booking ở phần tiếp theo.');
    };

    if (isLoading) return <div className="px-6 py-24 text-center text-gray-600">Đang tải thông tin tour…</div>;
    if (error || !tour) return (
        <main className="mx-auto max-w-3xl px-6 py-24 text-center">
            <h1 className="mb-4 text-3xl font-black">Không tìm thấy tour</h1>
            <p role="alert" className="mb-8 text-gray-600">{error || 'Tour này có thể đã bị gỡ khỏi hệ thống.'}</p>
            <Link to="/tours" className="inline-flex items-center gap-2 bg-black px-6 py-3 font-bold text-white"><ArrowLeft className="h-4 w-4" /> Quay lại danh sách</Link>
        </main>
    );

    const hasDiscount = tour.discountPrice != null && Number(tour.discountPrice) < Number(tour.price);
    return (
        <main className="mx-auto max-w-7xl px-6 py-10 md:px-12 lg:py-16">
            <Link to="/tours" className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-600 hover:text-black"><ArrowLeft className="h-4 w-4" /> Tất cả tour</Link>
            <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
                <section>
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        {tour.images?.[0] ? <img src={tour.images[0]} alt={tour.title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-gray-400"><MapPin className="h-12 w-12" /></div>}
                        {tour.isTrending && <span className="absolute left-5 top-5 bg-[#FACC15] px-4 py-2 text-xs font-black uppercase">Thịnh hành</span>}
                    </div>
                    {tour.images?.length > 1 && <div className="mt-4 grid grid-cols-4 gap-3">{tour.images.slice(1, 5).map((image, index) => <img key={`${image}-${index}`} src={image} alt={`${tour.title} ${index + 2}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />)}</div>}
                </section>
                <section>
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-gray-500">{tour.tourType} · {tour.destination || 'Điểm đến đang cập nhật'}</p>
                    <h1 className="mb-5 text-4xl font-black uppercase tracking-tight md:text-5xl">{tour.title}</h1>
                    <p className="mb-6 flex items-center gap-2 text-gray-600"><Star className="h-5 w-5 fill-[#FACC15] text-[#FACC15]" />{tour.reviewCount ? `${Number(tour.averageRating).toFixed(1)} / 5 từ ${tour.reviewCount} đánh giá` : 'Chưa có đánh giá'}</p>
                    <div className="mb-8 grid grid-cols-2 gap-4 border-y border-gray-200 py-6 text-sm">
                        <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /><span><strong>Khởi hành:</strong> {formatDate(tour.startDate)}</span></p>
                        <p className="flex items-center gap-2"><Users className="h-4 w-4" /><span><strong>Còn chỗ:</strong> {tour.availableSeats}</span></p>
                        {tour.duration && <p><strong>Thời lượng:</strong> {tour.duration}</p>}
                        {tour.departureLocation && <p><strong>Điểm tập trung:</strong> {tour.departureLocation}</p>}
                    </div>
                    <div className="mb-6">
                        {hasDiscount && <del className="block text-lg text-gray-500">{formatTourPrice(tour.price)}</del>}
                        <strong className="text-3xl font-black">{formatTourPrice(hasDiscount ? tour.discountPrice! : tour.price)}</strong>
                        <span className="ml-2 text-sm text-gray-500">/ khách</span>
                    </div>
                    <button type="button" onClick={handleBooking} disabled={tour.availableSeats < 1} className="w-full bg-black px-8 py-4 font-black uppercase tracking-widest text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400">
                        {tour.availableSeats < 1 ? 'Đã hết chỗ' : 'Đặt tour'}
                    </button>
                    {bookingMessage && <p role="status" className="mt-4 border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">{bookingMessage}</p>}
                    <p className="mt-3 text-xs text-gray-500">Đăng nhập để tiếp tục. Xác nhận chỗ và thanh toán được thực hiện ở bước đặt tour.</p>
                </section>
            </div>

            <section className="mt-16 max-w-4xl">
                <h2 className="mb-5 text-2xl font-black uppercase">Giới thiệu hành trình</h2>
                <p className="whitespace-pre-line leading-8 text-gray-700">{tour.description || 'Thông tin chi tiết về hành trình sẽ được cập nhật.'}</p>
            </section>

            <section className="mt-16 max-w-4xl">
                <div className="mb-6 flex items-end justify-between">
                    <div><p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">Góc nhìn du khách</p><h2 className="text-2xl font-black uppercase">Đánh giá</h2></div>
                    <span className="flex items-center gap-2 font-bold"><Star className="h-5 w-5 fill-[#FACC15] text-[#FACC15]" />{tour.reviewCount ? Number(tour.averageRating).toFixed(1) : '—'}</span>
                </div>
                {tour.reviews.length ? <div className="divide-y divide-gray-200 border-y border-gray-200">{tour.reviews.map((review) => <article key={review.id} className="py-5">
                    <div className="mb-2 flex items-center justify-between gap-4"><p className="font-bold">{review.user?.fullName || 'Du khách'}</p><span className="flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-[#FACC15] text-[#FACC15]" />{review.rating}/5</span></div>
                    {review.createdAt && <time className="text-xs text-gray-500">{formatDate(review.createdAt)}</time>}
                    {review.comment && <p className="mt-2 text-gray-700">{review.comment}</p>}
                </article>)}</div> : <p className="border-y border-gray-200 py-6 text-gray-600"><CheckCircle2 className="mr-2 inline h-4 w-4" />Tour chưa có đánh giá.</p>}
            </section>
        </main>
    );
};
=======
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
>>>>>>> def90b8cacf95b6d1c942c1f7f9d9696fb088c9f
