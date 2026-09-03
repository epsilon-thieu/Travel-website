import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Building2 } from 'lucide-react';
import DatePicker from '../../../components/common/DatePicker';
import './SearchPages.css';

export const HotelsPage: React.FC = () => {
    const [location, setLocation] = useState('');

    // TÁCH THÀNH 2 STATE RIÊNG BIỆT CHO KHÁCH SẠN
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);

    const [guests, setGuests] = useState('');
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { }, []);

    const handleSearch = () => {
        console.log("Searching Hotels:", { location, checkIn, checkOut, guests });
        setIsLoading(true);
    };

    return (
        <div className="w-full animate-fade-up">
            <div className="search-page-header">
                <h1 className="search-page-title">Find Hotels</h1>
                <p className="search-page-subtitle">Luxurious stays, comfortable rooms, and best rates guaranteed.</p>
            </div>

            <div className="filter-glass-bar">
                <div className="filter-input-group">
                    <label className="filter-label">Location</label>
                    <div className="filter-input-wrapper">
                        <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                        <input type="text" placeholder="City or Hotel Name" className="filter-input" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                </div>

                {/* KHUNG TÍCH HỢP 2 Ô DATE PICKER (IN - OUT) */}
                <div className="filter-input-group lg:flex-[1.5]">
                    <label className="filter-label">Check In - Out</label>
                    <div className="filter-input-wrapper">
                        <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div className="flex items-center gap-2 w-full">
                            <DatePicker
                                value={checkIn}
                                onChange={(checkIn: Date | null) => setCheckIn(checkIn)}
                            />
                            <span className="text-gray-500 font-bold">-</span>
                            <DatePicker
                                value={checkOut}
                                onChange={(checkOut: Date | null) => setCheckOut(checkOut)}
                            />
                        </div>
                    </div>
                </div>

                <div className="filter-input-group">
                    <label className="filter-label">Guests & Rooms</label>
                    <div className="filter-input-wrapper">
                        <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                        <input type="text" placeholder="2 Guests, 1 Room" className="filter-input" value={guests} onChange={(e) => setGuests(e.target.value)} />
                    </div>
                </div>
                <button onClick={handleSearch} className="btn-search">
                    <Search className="w-4 h-4 shrink-0" /> Search
                </button>
            </div>

            <div className="api-results-header animate-fade-up delay-100">
                <h2 className="text-xl font-bold text-white">Top Rated Properties</h2>
            </div>

            <div className="api-results-grid animate-fade-up delay-200">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="api-placeholder-card">
                        <Building2 className="w-8 h-8 mb-3 opacity-50" />
                        <p className="text-sm font-medium">Hotel API Data Card {item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};