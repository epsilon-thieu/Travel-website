import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, LogOut, Info, ChevronDown } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setProfile, clearProfile } from '../redux/userSlice'; // Import actions từ Redux
import './UserLayout.css';

export const UserLayout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // State quản lý thông tin user cục bộ và trạng thái dropdown
    const [localUser, setLocalUser] = useState<any>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Kiểm tra token và gọi API lấy profile khi component mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('http://localhost:3600/api/users/profile', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` // Truyền token vào header
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();

                        // Trích xuất đúng object user từ response trả về
                        const userProfile = data.user;

                        // 1. Lưu thông tin user vào state cục bộ
                        setLocalUser(userProfile);

                        // 2. Lưu prop vào Redux cho các component khác sử dụng
                        dispatch(setProfile(userProfile));
                    } else {
                        // Xử lý khi token hết hạn hoặc lỗi (API trả về 401/403)
                        handleLogout();
                    }
                } catch (error) {
                    console.error('Lỗi khi fetch profile:', error);
                }
            }
        };
        fetchUserProfile();
    }, [dispatch]);

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
        setLocalUser(null);
        dispatch(clearProfile()); // Xóa thông tin trên Redux
        setIsDropdownOpen(false);
        navigate('/login');
    };

    // Lấy tên hiển thị từ dữ liệu API trả về (tùy thuộc vào cấu trúc JSON của bạn, ví dụ: userData.fullName)
    const displayName = localUser?.fullName || localUser?.name || 'User';

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

                    {/* Dùng localUser để kiểm tra trạng thái đăng nhập thay vì userName string */}
                    {localUser ? (
                        <div className="relative ml-2" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide hover:text-gray-500 transition-colors"
                            >
                                <User className="w-5 h-5" />
                                <span className="hidden sm:inline">{displayName}</span>
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
