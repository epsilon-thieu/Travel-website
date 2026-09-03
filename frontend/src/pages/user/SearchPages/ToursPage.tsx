import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, DollarSign, Filter } from 'lucide-react';
import DatePicker from '../../../components/common/DatePicker';

import './SearchPages.css';

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
        <div className="w-full animate-fade-up">
            <div className="search-page-header">
                <h1 className="search-page-title">Explore Tours</h1>
                <p className="search-page-subtitle">Find your next breathtaking adventure around the globe.</p>
            </div>

            <div className="filter-glass-bar">
                <div className="filter-input-group">
                    <label className="filter-label">Destination</label>
                    <div className="filter-input-wrapper">
                        <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Where to?"
                            className="filter-input"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </div>
                </div>
                <div className="filter-input-group">
                    <label className="filter-label">Date</label>
                    <div className="filter-input-wrapper">
                        <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                        {/* CHUYỂN THÀNH TYPE DATE TẠI ĐÂY */}
                        <DatePicker
                            value={date}
                            onChange={(date: Date | null) => setDate(date)}
                        />
                    </div>
                </div>
                <div className="filter-input-group">
                    <label className="filter-label">Budget</label>
                    <div className="filter-input-wrapper">
                        <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Max price"
                            className="filter-input"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                        />
                    </div>
                </div>
                <button onClick={handleSearch} className="btn-search">
                    <Search className="w-4 h-4 shrink-0" /> Search
                </button>
            </div>

            <div className="api-results-header animate-fade-up delay-100">
                <h2 className="text-xl font-bold text-white">Recommended Tours</h2>
                <button className="text-sm text-emerald-400 flex items-center gap-1 hover:text-emerald-300">
                    <Filter className="w-4 h-4" /> More Filters
                </button>
            </div>

            <div className="api-results-grid animate-fade-up delay-200">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="api-placeholder-card">
                        <MapPin className="w-8 h-8 mb-3 opacity-50" />
                        <p className="text-sm font-medium">Tour API Data Card {item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};