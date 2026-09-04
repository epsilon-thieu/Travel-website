import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart } from 'lucide-react';
import './UserLayout.css';

export const UserLayout: React.FC = () => {
    const navigate = useNavigate();

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
                    <button onClick={() => navigate('/login')} className="btn-icon-only ml-2">
                        Sign In
                    </button>
                </div>
            </header>

            <main className="content-main">
                <Outlet />
            </main>
        </div>
    );
};