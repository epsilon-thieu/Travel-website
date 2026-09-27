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
