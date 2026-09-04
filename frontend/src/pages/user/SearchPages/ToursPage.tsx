import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import DatePicker from '../../../components/common/DatePicker';
import { styles } from './SharePagesStyle'; // Import biến styles từ file mới

export const ToursPage: React.FC = () => {
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [budget, setBudget] = useState('');
    const [tours, setTours] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { }, []);

    const handleSearch = () => {
        console.log("Searching Tours with params:", { destination, date, budget });
        setIsLoading(true);
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-24">

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

            <div className="px-6 md:px-12 lg:px-24">
                <div className="text-center mb-16">
                    <span className={`${styles.labelOverline} mb-4`}>04 / Results</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Recommended Tours</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className={styles.resultCard}>
                            <MapPin className="w-12 h-12 text-black mb-6 group-hover:text-white transition-colors" strokeWidth={1.5} />
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Tour {item}</h3>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-gray-300 transition-colors">
                                Tour API Placeholder
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
