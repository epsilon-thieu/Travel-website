import React, { useState } from 'react';
import { MapPin, Calendar, Users, Building2, ArrowRight } from 'lucide-react';
import DatePicker from '../../../components/common/DatePicker';
import { styles } from './SharePagesStyle';

export const HotelsPage: React.FC = () => {
    const [location, setLocation] = useState('');
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const [guests, setGuests] = useState('1');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {
        console.log("Searching Hotels:", { location, checkIn, checkOut, guests });
        setIsLoading(true);
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-24">

            <div className="px-6 md:px-12 lg:px-24 pt-20 mb-16">
                <div className={styles.heroSection}>
                    <img
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80"
                        alt="Hotel stay"
                        className={styles.heroImage}
                    />
                    <div className={styles.heroOverlay}></div>
                    <div className={styles.heroContent}>
                        <span className={`${styles.labelOverlineLight} mb-6`}>01 / Accommodation</span>
                        <h1 className={`${styles.headingHeroLight} mb-6`}>FIND<br />HOTELS.</h1>
                        <p className={styles.textBodyHeroLight}>
                            Luxurious stays, comfortable rooms, and best rates guaranteed. We don't just book rooms; we secure your comfort anywhere in the world.
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full border-t-2 border-black mb-16"></div>

            <div className="px-6 md:px-12 lg:px-24 mb-24">
                <div className={styles.filterContainer}>
                    <div className={styles.filterBox}>
                        <label className={`${styles.labelOverline} mb-3`}>Location</label>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-black shrink-0" strokeWidth={2} />
                            <input type="text" placeholder="City or hotel name" className={styles.filterInput} value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>
                    </div>

                    <div className={`${styles.filterBox} z-10`}>
                        <label className={`${styles.labelOverline} mb-3`}>Check In</label>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-black shrink-0" strokeWidth={2} />
                            <DatePicker value={checkIn} onChange={(date: Date | null) => setCheckIn(date)} />
                        </div>
                    </div>

                    <div className={`${styles.filterBox} z-10`}>
                        <label className={`${styles.labelOverline} mb-3`}>Check Out</label>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-black shrink-0" strokeWidth={2} />
                            <DatePicker value={checkOut} onChange={(date: Date | null) => setCheckOut(date)} />
                        </div>
                    </div>

                    <div className={styles.filterBox}>
                        <label className={`${styles.labelOverline} mb-3`}>Guests</label>
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-black shrink-0" strokeWidth={2} />
                            <input type="text" placeholder="2 Guests, 1 Room" className={styles.filterInput} value={guests} onChange={(e) => setGuests(e.target.value)} />
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
                    <span className={`${styles.labelOverline} mb-4`}>02 / Results</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Top Rated Properties</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className={styles.resultCard}>
                            <Building2 className="w-12 h-12 text-black mb-6 group-hover:text-white transition-colors" strokeWidth={1.5} />
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Hotel Data {item}</h3>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-gray-300 transition-colors">
                                Hotel API Placeholder
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
