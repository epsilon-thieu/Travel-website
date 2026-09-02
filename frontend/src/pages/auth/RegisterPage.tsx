import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ChevronLeft, CheckCircle2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
    // Tạo state cho các trường nhập liệu
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    // Method xử lý submit form đăng ký
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: Thực hiện gọi API register ở đây
        /* 
        try {
            const response = await api.register({ firstName, lastName, email, password });
            console.log('Register success:', response);
            // Xử lý sau khi đăng ký thành công (chuyển hướng sang trang login hoặc tự động login)
            navigate('/login');
        } catch (error) {
            console.error('Register failed:', error);
            // Hiển thị lỗi cho người dùng
        }
        */

        // Log tạm thời để debug
        console.log("Dữ liệu đăng ký chuẩn bị gửi đi:", { firstName, lastName, email, password });
    };

    return (
        <>
            <div className="auth-img-side anim-left">
                <div className="auth-img-inner">
                    <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop" alt="Scenery" className="auth-img" />
                    <div className="auth-img-overlay"></div>

                    <div className="absolute bottom-8 left-6 right-6 text-white">
                        <h3 className="text-3xl font-bold mb-2">Your Adventure <br />Starts <span className="italic text-emerald-400 font-serif">Here</span></h3>
                        <p className="text-xs text-gray-300">Discover thousands of breathtaking destinations around the world.</p>
                    </div>
                </div>
            </div>

            <div className="auth-form-side anim-right">
                <button onClick={() => navigate('/')} className="auth-back-btn">
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="auth-toggle-pill">
                    <button className="toggle-btn-active">Register</button>
                    <Link to="/login" className="toggle-btn-inactive">Login</Link>
                </div>

                <div className="max-w-sm w-full mx-auto">
                    <h2 className="text-3xl font-extrabold text-white mb-1">Create Account</h2>
                    <p className="text-gray-400 text-xs mb-6">Start Your Journey for Travelling Here!</p>

                    {/* Đưa hàm handleRegister vào onSubmit */}
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="auth-input-label">First Name</label>
                                <input
                                    type="text"
                                    placeholder="John"
                                    className="auth-input-field"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="auth-input-label">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    className="auth-input-field"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="auth-input-label">Email</label>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                className="auth-input-field"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="auth-input-label">Password</label>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••••"
                                    className="auth-input-field pr-20"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="absolute right-3 flex items-center gap-1">
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-emerald-400 hover:text-emerald-300">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="auth-primary-btn mt-2">
                            Start Your Journey
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};