import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import './AuthForm.css';
=======
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
>>>>>>> 23d9b98c26ee20bdcb39b0beb7ab34d28af9acb8

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
            const response = await fetch('http://localhost:5000/api/auth/google', {
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
<<<<<<< HEAD
            const response = await api.login({ email, password });
            console.log('Login success:', response);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
        */

        console.log("Dữ liệu chuẩn bị gửi đi:", { email, password });
    };

    return (
        <div className="auth-container">
            <div className="auth-form-side">
=======
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Đăng nhập thành công:', data);
            
            localStorage.setItem('token', data.accessToken);
            
            navigate('/dashboard'); 
        } else {
            alert(data.message || 'Đăng nhập thất bại!');
        }
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        alert('Không thể kết nối đến Server. Vui lòng thử lại sau!');
    }
    };

    return (
        <GoogleOAuthProvider clientId="635401137109-tuv02b6hjesasevi1dbgfq89fi7eqpvo.apps.googleusercontent.com">
            <div className="auth-form-side anim-left">
>>>>>>> 23d9b98c26ee20bdcb39b0beb7ab34d28af9acb8
                <button onClick={() => navigate('/')} className="auth-back-btn">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </button>

<<<<<<< HEAD
                <div className="max-w-sm w-full mx-auto">
                    <div className="auth-toggle-nav">
                        <button className="toggle-link toggle-link-active">Sign In</button>
                        <Link to="/register" className="toggle-link">Register</Link>
=======
                <div className="max-w-sm w-full mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-400 text-xs mb-6">Life is for adventure, let's travel!</p>

                    <div className="flex justify-center gap-4 mb-6">
                        {/* 4. Thay thế nút SVG Google tĩnh bằng Component chính thức của Google */}
                        <div className="overflow-hidden rounded-full">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => {
                                    console.log('Đăng nhập Google thất bại (từ phía Client)');
                                }}
                                type="icon"
                                shape="circle"
                            />
                        </div>
                        
                        {/* Nút Facebook tĩnh giữ nguyên (để làm sau) */}
                        <button className="auth-social-btn hover:text-emerald-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.09 2.31-.83 3.63-.73 1.5.15 2.67.75 3.4 1.83-3.13 1.88-2.6 5.96.48 7.21-.73 1.81-1.74 3.46-2.59 3.86zm-3.41-13.8c-.28-2.12 1.6-4.06 3.67-4.48.37 2.28-1.76 4.31-3.67 4.48z" /></svg>
                        </button>
>>>>>>> 23d9b98c26ee20bdcb39b0beb7ab34d28af9acb8
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

                        <Link to="/forgot-password" self-end className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black mb-6 block text-right">
                            Forgot Password?
                        </Link>

                        <button type="submit" className="auth-primary-btn">Sign In</button>
                    </form>

                    <div className="auth-social-row">
                        <button className="auth-social-btn hover:text-black transition-colors font-semibold text-sm">Google</button>
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
<<<<<<< HEAD
        </div>
=======
        </GoogleOAuthProvider>
>>>>>>> 23d9b98c26ee20bdcb39b0beb7ab34d28af9acb8
    );
};