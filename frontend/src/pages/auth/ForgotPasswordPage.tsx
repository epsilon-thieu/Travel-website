import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, KeyRound } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="auth-form-side anim-left text-center">
                <button onClick={() => navigate('/login')} className="auth-back-btn">
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="max-w-sm w-full mx-auto">
                    <div className="w-14 h-14 bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <KeyRound className="w-7 h-7" />
                    </div>

                    <h2 className="text-2xl font-extrabold text-white mb-2">Forgot Password?</h2>
                    <p className="text-gray-400 text-xs mb-6">Enter your email to receive password reset instructions.</p>

                    <form className="text-left space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="auth-input-label">Registered Email</label>
                            <input type="email" placeholder="example@gmail.com" className="auth-input-field" required />
                        </div>

                        <button type="submit" className="auth-primary-btn">
                            Send Request
                        </button>
                    </form>

                    <div className="mt-6">
                        <Link to="/login" className="text-xs text-gray-400 hover:text-emerald-400 transition font-medium flex items-center justify-center gap-1">
                            <ChevronLeft className="w-3.5 h-3.5" /> Back to Log in
                        </Link>
                    </div>
                </div>
            </div>

            <div className="auth-img-side anim-right">
                <div className="auth-img-inner">
                    <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop" alt="Mountain" className="auth-img" />
                    <div className="auth-img-overlay"></div>
                </div>
            </div>
        </>
    );
};