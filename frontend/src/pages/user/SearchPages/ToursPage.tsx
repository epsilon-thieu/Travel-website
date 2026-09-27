import React, { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, DollarSign, MapPin } from 'lucide-react';
import DatePicker from '../../../components/common/DatePicker';
import { TourCard, type Tour } from '../../../components/common/TourCard';
import { styles } from './SharePagesStyle';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3600';
const PAGE_SIZE = 9;
type Pagination = { currentPage: number; totalPages: number; totalItems: number; limit: number };

export const ToursPage: React.FC = () => {
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [budget, setBudget] = useState('');
    const [type, setType] = useState('');
    const [sort, setSort] = useState('newest');
    const [tours, setTours] = useState<Tour[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const loadTours = useCallback(async (page = 1, sortOrder = sort, filtersActive = hasSearched) => {
        setIsLoading(true);
        setError('');
        const params = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE), sort: sortOrder });
        if (filtersActive) {
            if (destination.trim()) params.set('destination', destination.trim());
            if (date) {
                const localDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                params.set('date', localDate);
            }
            if (budget) params.set('budget', budget);
            if (type) params.set('type', type);
        }

        try {
            const response = await fetch(`${API_URL}/api/tours?${params.toString()}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Không thể tải danh sách tour.');
            setTours(data.tours ?? []);
            setPagination(data.pagination ?? null);
        } catch (requestError) {
            setTours([]);
            setPagination(null);
            setError(requestError instanceof Error ? requestError.message : 'Đã xảy ra lỗi khi tải tour.');
        } finally {
            setIsLoading(false);
        }
    }, [budget, date, destination, hasSearched, sort, type]);

    useEffect(() => { void loadTours(1, 'newest', false); }, []);

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        setHasSearched(true);
        void loadTours(1, sort, true);
    };

    const handleSort = (value: string) => {
        setSort(value);
        void loadTours(1, value, hasSearched);
    };

    return (
        <div className="min-h-screen bg-white pb-24 text-black selection:bg-black selection:text-white">
            <div className="px-6 pt-12 md:px-12 lg:px-24 lg:pt-20">
                <div className={styles.heroSection}>
                    <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80" alt="Phong cảnh chuyến du lịch" className={styles.heroImage} />
                    <div className={styles.heroOverlay}></div>
                    <div className={styles.heroContent}>
                        <span className={`${styles.labelOverlineLight} mb-6`}>03 / Khám phá</span>
                        <h1 className={`${styles.headingHeroLight} mb-6`}>KHÁM PHÁ<br />TOUR.</h1>
                        <p className={styles.textBodyHeroLight}>Tìm hành trình phù hợp và khám phá những điểm đến đáng nhớ tại Việt Nam cùng Natura Travel.</p>
                    </div>
                </div>
            </div>

            <div className="mx-6 my-12 border-t-2 border-black md:mx-12 lg:mx-24 lg:my-16"></div>

            <div className="px-6 md:px-12 lg:px-24">
                <form onSubmit={handleSearch} className={`${styles.filterContainer} flex-wrap`}>
                    <div className={`${styles.filterBox} min-w-[220px] lg:flex-[1.5]`}>
                        <label htmlFor="tour-destination" className={`${styles.labelOverline} mb-3`}>Điểm đến</label>
                        <div className="flex items-center gap-3"><MapPin className="h-5 w-5 shrink-0" />
                            <input id="tour-destination" type="search" placeholder="Bạn muốn đi đâu?" className={styles.filterInput} value={destination} onChange={(e) => setDestination(e.target.value)} />
                        </div>
                    </div>
                    <div className={`${styles.filterBox} z-10 min-w-[190px]`}>
                        <label className={`${styles.labelOverline} mb-3`}>Ngày khởi hành</label>
                        <div className="flex items-center gap-3"><Calendar className="h-5 w-5 shrink-0" />
                            <DatePicker value={date} onChange={setDate} />
                        </div>
                    </div>
                    <div className="min-w-[210px] flex-1 p-6">
                        <label htmlFor="tour-budget" className={`${styles.labelOverline} mb-3`}>Ngân sách tối đa (VND)</label>
                        <div className="flex items-center gap-3"><DollarSign className="h-5 w-5 shrink-0" />
                            <input id="tour-budget" type="number" min="1" placeholder="Ví dụ: 5000000" className={styles.filterInput} value={budget} onChange={(e) => setBudget(e.target.value)} />
                        </div>
                    </div>
                    <div className="min-w-[180px] flex-1 p-6">
                        <label htmlFor="tour-type" className={`${styles.labelOverline} mb-3`}>Loại tour</label>
                        <select id="tour-type" className={styles.filterInput} value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="">Tất cả tour</option><option value="domestic">Trong nước</option><option value="international">Nước ngoài</option>
                        </select>
                    </div>
                    <button type="submit" disabled={isLoading} className={styles.btnPrimary}>
                        <span className="font-black text-lg uppercase tracking-widest">{isLoading ? 'Đang tải' : 'Tìm tour'}</span>
                        <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" strokeWidth={2.5} />
                    </button>
                </form>
            </div>

            <section className="px-6 pt-20 md:px-12 lg:px-24" aria-live="polite">
                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <span className={`${styles.labelOverline} mb-4 block`}>04 / Kết quả</span>
                        <h2 className="text-4xl font-black uppercase tracking-tight md:text-5xl">{hasSearched ? 'Tour phù hợp' : 'Khám phá tour'}</h2>
                        {pagination && <p className="mt-3 text-sm text-gray-500">{pagination.totalItems} tour</p>}
                    </div>
                    <label className="flex items-center gap-3 text-sm font-bold">Sắp xếp
                        <select className="border border-gray-300 px-3 py-2" value={sort} onChange={(e) => handleSort(e.target.value)}>
                            <option value="newest">Mới nhất</option><option value="oldest">Cũ nhất</option><option value="popular">Thịnh hành</option><option value="price_asc">Giá ưu đãi thấp đến cao</option><option value="price_desc">Giá ưu đãi cao đến thấp</option>
                        </select>
                    </label>
                </div>
                {error && <p role="alert" className="mb-8 border border-red-200 bg-red-50 p-4 text-red-800">{error} Hãy kiểm tra API tại {API_URL}.</p>}
                {isLoading ? <p className="py-12 text-center text-gray-600">Đang tải tour…</p> : tours.length ? (
                    <>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
                        </div>
                        {pagination && pagination.totalPages > 1 && <nav aria-label="Phân trang tour" className="mt-12 flex items-center justify-center gap-5">
                            <button type="button" disabled={pagination.currentPage <= 1} onClick={() => void loadTours(pagination.currentPage - 1)} className="flex items-center gap-2 border border-gray-300 px-4 py-3 font-bold disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft className="h-4 w-4" /> Trước</button>
                            <span className="text-sm font-bold">Trang {pagination.currentPage} / {pagination.totalPages}</span>
                            <button type="button" disabled={pagination.currentPage >= pagination.totalPages} onClick={() => void loadTours(pagination.currentPage + 1)} className="flex items-center gap-2 border border-gray-300 px-4 py-3 font-bold disabled:cursor-not-allowed disabled:opacity-40">Tiếp <ArrowRight className="h-4 w-4" /></button>
                        </nav>}
                    </>
                ) : <p className="py-12 text-center text-gray-600">{hasSearched ? 'Chưa tìm thấy tour phù hợp. Thử thay đổi bộ lọc nhé.' : 'Hiện chưa có tour được đăng. Vui lòng quay lại sau.'}</p>}
            </section>
        </div>
    );
};
