import React, { useState } from 'react';
import { PlaneTakeoff, PlaneLanding, Calendar, Users, ArrowRight } from 'lucide-react';
import DatePicker from '../../../components/common/DatePicker';
import { styles } from './SharePagesStyle';

export const FlightsPage: React.FC = () => {
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [passengers, setPassengers] = useState('1');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {
        console.log("Searching Flights:", { departure, arrival, date, passengers });
        setIsLoading(true);
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-24">

            <div className="px-6 md:px-12 lg:px-24 pt-20 mb-16">
                <div className={styles.heroSection}>
                    <img
                        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80"
                        alt="Flight journey"
                        className={styles.heroImage}
                    />
                    <div className={styles.heroOverlay}></div>
                    <div className={styles.heroContent}>
                        <span className={`${styles.labelOverlineLight} mb-6`}>02 / Transport</span>
                        <h1 className={`${styles.headingHeroLight} mb-6`}>BOOK<br />FLIGHTS.</h1>
                        <p className={styles.textBodyHeroLight}>
                            Compare prices and find the best routes for your journey. We don't just book tickets; we connect you with the heartbeat of the sky.
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full border-t-2 border-black mb-16"></div>

            <div className="px-6 md:px-12 lg:px-24 mb-24">
                <div className={styles.filterContainer}>
                    <div className={styles.filterBox}>
                        <label className={`${styles.labelOverline} mb-3`}>Origin</label>
                        <div className="flex items-center gap-3">
                            <PlaneTakeoff className="w-5 h-5 text-black shrink-0" strokeWidth={2} />
                            <input type="text" placeholder="Departure city" className={styles.filterInput} value={departure} onChange={(e) => setDeparture(e.target.value)} />
                        </div>
                    </div>

                    <div className={styles.filterBox}>
                        <label className={`${styles.labelOverline} mb-3`}>Destination</label>
                        <div className="flex items-center gap-3">
                            <PlaneLanding className="w-5 h-5 text-black shrink-0" strokeWidth={2} />
                            <input type="text" placeholder="Arrival city" className={styles.filterInput} value={arrival} onChange={(e) => setArrival(e.target.value)} />
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
                        <label className={`${styles.labelOverline} mb-3`}>Passengers</label>
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-black shrink-0" strokeWidth={2} />
                            <input type="number" min="1" placeholder="1 Adult" className={styles.filterInput} value={passengers} onChange={(e) => setPassengers(e.target.value)} />
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
                    <span className={`${styles.labelOverline} mb-4`}>03 / Results</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Available Routes</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className={styles.resultCard}>
                            <PlaneTakeoff className="w-12 h-12 text-black mb-6 group-hover:text-white transition-colors" strokeWidth={1.5} />
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Ticket Data {item}</h3>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-gray-300 transition-colors">
                                Flight API Placeholder
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
