import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, LogOut, Info, ChevronDown } from 'lucide-react';
import './UserLayout.css';

export const UserLayout: React.FC = () => {
    const navigate = useNavigate();

    // State quản lý thông tin user và trạng thái mở/đóng dropdown
    const [userName, setUserName] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Kiểm tra token và tên user từ localStorage khi component render
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedName = localStorage.getItem('userName');
        if (token && storedName) {
            setUserName(storedName);
        }
    }, []);

    // Xử lý click ra ngoài để đóng dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setUserName(null);
        setIsDropdownOpen(false);
        navigate('/login');
    };

    return (
        <div className="layout-container">
            <header className="header-nav">
                <Link to="/" className="nav-logo">
                    NATURA TRAVEL
                </Link>

                <nav className="nav-links">
                    <Link to="/flights" className="nav-link-item">Destinations</Link>
                    <Link to="/tours" className="nav-link-item">Tours</Link>
                    <Link to="/hotels" className="nav-link-item">Hotels</Link>
                    <Link to="/about" className="nav-link-item">About Us</Link>
                </nav>

                <div className="auth-actions">
                    <button className="btn-icon-only">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="btn-icon-only">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="hidden sm:inline">Cart</span>
                    </button>

                    {/* Render thay thế nút Sign In nếu đã có userName */}
                    {userName ? (
                        <div className="relative ml-2" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide hover:text-gray-500 transition-colors"
                            >
                                <User className="w-5 h-5" />
                                <span className="hidden sm:inline">{userName}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-6 w-48 bg-white border border-gray-100 shadow-xl rounded-md py-2 z-50 flex flex-col dropdown-anim">
                                    <button
                                        onClick={() => { setIsDropdownOpen(false); navigate('/detail'); }}
                                        className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 hover:text-black transition-colors text-left"
                                    >
                                        <Info className="w-4 h-4" /> Detail
                                    </button>
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors text-left"
                                    >
                                        <LogOut className="w-4 h-4" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={() => navigate('/login')} className="btn-icon-only ml-2 font-bold uppercase text-sm tracking-wide">
                            Sign In
                        </button>
                    )}
                </div>
            </header>

            <main className="content-main">
                <Outlet />
            </main>
        </div>
    );
};