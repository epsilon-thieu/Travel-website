import React, { useState, useEffect } from 'react';
import { Search, PlaneTakeoff, PlaneLanding, Calendar, Users } from 'lucide-react';
import DatePicker from '../../../components/common/DatePicker';
import './SearchPages.css';

export const FlightsPage: React.FC = () => {
    // 1. STATES FORM SEARCH
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [passengers, setPassengers] = useState('1');

    // 2. STATES API
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // fetchFlights();
    }, []);

    // 3. HÀM TÌM KIẾM
    const handleSearch = () => {
        console.log("Searching Flights:", { departure, arrival, date, passengers });
        setIsLoading(true);
        // TODO: Call API Flights
    };

    return (
        <div className="w-full animate-fade-up">
            <div className="search-page-header">
                <h1 className="search-page-title">Book Flights</h1>
                <p className="search-page-subtitle">Compare prices and find the best flights for your journey.</p>
            </div>

            {/* Filter Bar */}
            <div className="filter-glass-bar">
                <div className="filter-input-group">
                    <label className="filter-label">From</label>
                    <div className="filter-input-wrapper">
                        <PlaneTakeoff className="w-4 h-4 text-emerald-400" />
                        <input
                            type="text"
                            placeholder="Departure city"
                            className="filter-input"
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                        />
                    </div>
                </div>
                <div className="filter-input-group">
                    <label className="filter-label">To</label>
                    <div className="filter-input-wrapper">
                        <PlaneLanding className="w-4 h-4 text-emerald-400" />
                        <input
                            type="text"
                            placeholder="Arrival city"
                            className="filter-input"
                            value={arrival}
                            onChange={(e) => setArrival(e.target.value)}
                        />
                    </div>
                </div>
                <div className="filter-input-group">
                    <label className="filter-label">Date</label>
                    <div className="filter-input-wrapper">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        <DatePicker
                            value={date}
                            onChange={(date: Date | null) => setDate(date)}
                        />
                    </div>
                </div>
                <div className="filter-input-group">
                    <label className="filter-label">Passengers</label>
                    <div className="filter-input-wrapper">
                        <Users className="w-4 h-4 text-emerald-400" />
                        <input
                            type="number"
                            min="1"
                            placeholder="1 Adult"
                            className="filter-input"
                            value={passengers}
                            onChange={(e) => setPassengers(e.target.value)}
                        />
                    </div>
                </div>
                <button onClick={handleSearch} className="btn-search">
                    <Search className="w-4 h-4" /> Search
                </button>
            </div>

            {/* Results Section */}
            <div className="api-results-header animate-fade-up delay-100">
                <h2 className="text-xl font-bold text-white">Available Flights</h2>
            </div>

            <div className="api-results-grid !grid-cols-1 md:!grid-cols-2 animate-fade-up delay-200">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="api-placeholder-card !h-[150px]">
                        <PlaneTakeoff className="w-8 h-8 mb-3 opacity-50 text-emerald-400" />
                        <p className="text-sm font-medium">Flight API Ticket {item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};