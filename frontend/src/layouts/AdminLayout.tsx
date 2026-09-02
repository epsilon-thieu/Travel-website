import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const AdminLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar Admin */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
                <div className="p-4 border-b border-slate-800 font-bold text-lg text-orange-400">
                    ADMIN PORTAL
                </div>
                <nav className="p-4 flex-1 space-y-2 text-sm">
                    <Link to="/admin" className="block p-3 rounded hover:bg-slate-800 transition">
                        📊 Thống kê Dashboard
                    </Link>
                    <Link to="/admin/products" className="block p-3 rounded hover:bg-slate-800 transition">
                        📦 Quản lý Kho sản phẩm
                    </Link>
                    <Link to="/admin/orders" className="block p-3 rounded hover:bg-slate-800 transition">
                        📑 Quản lý Đơn hàng
                    </Link>
                    <Link to="/admin/users" className="block p-3 rounded hover:bg-slate-800 transition">
                        👥 Quản lý Khách hàng
                    </Link>
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <Link to="/" className="text-xs text-gray-400 hover:text-white">
                        ← Quay về trang Khách hàng
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-white border-b h-16 px-6 flex items-center justify-between">
                    <h1 className="font-semibold text-gray-800">Hệ thống Quản trị</h1>
                    <span className="text-sm text-gray-500">Xin chào, Admin</span>
                </header>

                <main className="p-6 flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};