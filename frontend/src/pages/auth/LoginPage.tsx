import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

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
                <button onClick={() => navigate('/')} className="auth-back-btn">
                    <ChevronLeft className="w-5 h-5" />
                </button>

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
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <span className="text-xs text-gray-500">Or</span>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    {/* 3. Đưa hàm handleLogin vào onSubmit của form */}
                    <form className="text-left space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label className="auth-input-label">Email</label>
                            {/* 4. Thêm value và onChange cho email */}
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
                                {/* 4. Thêm value và onChange cho password */}
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••••"
                                    className="auth-input-field pr-12"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-emerald-400 hover:text-emerald-300">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="auth-primary-btn">
                            Log In
                        </button>
                    </form>

                    <div className="mt-6">
                        <Link to="/forgot-password" className="text-xs text-gray-400 hover:text-emerald-400 transition font-medium">
                            Forgot password?
                        </Link>
                    </div>
                </div>
            </div>

            <div className="auth-img-side anim-right">
                <div className="auth-toggle-pill">
                    <Link to="/register" className="toggle-btn-inactive">Register</Link>
                    <button className="toggle-btn-active">Login</button>
                </div>

                <div className="auth-img-inner">
                    <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000&auto=format&fit=crop" alt="Scenery" />
                    <div className="auth-img-overlay"></div>

                    <div className="absolute bottom-8 left-6 right-6 text-center text-white">
                        <h3 className="text-2xl font-bold mb-2">Every destination has a <span className="italic text-emerald-400 font-serif">Story</span></h3>
                        <p className="text-xs text-gray-300">Start writing your next chapter today.</p>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};