import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import './AuthForm.css';

export const LoginPage: React.FC = () => {
    // 1. Tạo state cho các trường nhập liệu
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    // 2. Tạo method xử lý submit form
    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            // Lấy cái vé (ID Token) mà Google vừa cấp
            const googleToken = credentialResponse.credential;

            // Gửi cái vé đó xuống Backend của bạn để đối chiếu
            const response = await fetch('http://localhost:5001/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: googleToken }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Đăng nhập Google thành công:', data);
                localStorage.setItem('token', data.accessToken);
                navigate('/dashboard');
            } else {
                alert(data.message || 'Xác thực Google tại Server thất bại!');
            }
        } catch (error) {
            console.error('Lỗi khi gọi API Google:', error);
            alert('Không thể kết nối đến Server.');
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // const response = await api.login({ email, password });
            // console.log('Login success:', response);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }

        console.log("Dữ liệu chuẩn bị gửi đi:", { email, password });
    };

    return (
        <div className="auth-container">
            <div className="auth-form-side">
                <button onClick={() => navigate('/')} className="auth-back-btn">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </button>

                <div className="max-w-sm w-full mx-auto">
                    <div className="auth-toggle-nav">
                        <button className="toggle-link toggle-link-active">Sign In</button>
                        <Link to="/register" className="toggle-link">Register</Link>
                    </div>

                    <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Welcome</h2>
                    <p className="text-gray-500 text-sm mb-10">Sign in to continue your journey.</p>

                    {/* 3. Đưa hàm handleLogin vào onSubmit */}
                    <form onSubmit={handleLogin}>
                        <div className="auth-input-group">
                            <label className="auth-input-label">Email Address</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="auth-input-field"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="auth-input-group">
                            <label className="auth-input-label">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter password"
                                    className="auth-input-field pr-10"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-3 text-gray-400">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <Link to="/forgot-password" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black mb-6 block text-right">
                            Forgot Password?
                        </Link>

                        <button type="submit" className="auth-primary-btn">Sign In</button>
                    </form>

                    <div className="auth-social-row">
                        <div className="google-btn-wrapper">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => {
                                    console.log('Login Failed');
                                    alert('Đăng nhập Google thất bại');
                                }}
                            />
                        </div>
                        <button onClick={handleGoogleSuccess} className="auth-social-btn hover:text-black transition-colors font-semibold text-sm">Google</button>
                        <button className="auth-social-btn hover:text-black transition-colors font-semibold text-sm">Facebook</button>
                    </div>
                </div>
            </div>

            <div className="auth-img-side">
                <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000&auto=format&fit=crop" alt="Nature" className="auth-img" />
                <div className="absolute bottom-12 left-12 right-12 text-white">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 block drop-shadow-md">Inspiration</span>
                    <h3 className="text-5xl font-black uppercase leading-none mb-4 italic font-serif drop-shadow-lg">The world is <br />waiting.</h3>
                </div>
            </div>
        </div>
    );
};