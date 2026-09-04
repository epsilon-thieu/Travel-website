import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './AuthForm.css';

export const ForgotPasswordPage: React.FC = () => {
    // State email
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    // Xử lý gửi yêu cầu reset
    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: Gọi API reset mật khẩu
        console.log("Email khôi phục mật khẩu gửi đi:", { email });
    };

    return (
        <div className="auth-container justify-center items-center">
            <div className="auth-form-side w-full md:max-w-2xl items-center border border-gray-100 rounded-xl shadow-sm">
                <button onClick={() => navigate('/login')} className="auth-back-btn">
                    <ArrowLeft className="w-4 h-4" /> Back to Login
                </button>

                <div className="max-w-sm w-full mt-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4 block">Security</span>
                    <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Reset Password</h2>
                    <p className="text-gray-500 text-sm mb-10">Enter your email and we'll send you instructions to reset your password.</p>

                    <form className="space-y-8" onSubmit={handleForgotPassword}>
                        <div className="auth-input-group">
                            <label className="auth-input-label">Your Email</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="auth-input-field"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="auth-primary-btn">Send Reset Link</button>
                    </form>
                </div>
            </div>
        </div>
    );
};