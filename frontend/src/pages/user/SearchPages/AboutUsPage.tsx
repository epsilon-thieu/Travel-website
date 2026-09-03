import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Map, PlaneTakeoff, Building2,
    Star, Leaf, UserCheck, ShieldCheck, ArrowRight
} from 'lucide-react';
import './SearchPages.css';

export const AboutUsPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full pb-10">
            {/* 1. HERO SECTION */}
            <div className="text-center mb-16 pt-8 animate-fade-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
                    Beyond Destinations. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 italic font-serif font-normal">
                        We Craft Experiences.
                    </span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                    Welcome to <strong className="text-emerald-400 font-semibold">NaturaTravel</strong>.
                    We don't just book trips; we design unforgettable journeys that connect you with the heartbeat of the world.
                </p>
            </div>

            {/* 2. MISSION & STORY (Side by Side Glass Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 animate-fade-up delay-100">
                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/[0.05] transition-colors shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <CompassIcon /> {/* Custom icon nội bộ */}
                        </span>
                        Our Mission
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        To inspire and empower modern travelers to explore the globe authentically and sustainably.
                        We strive to bridge the gap between you and the world's hidden wonders, ensuring every journey
                        is seamless, immersive, and deeply personal.
                    </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/[0.05] transition-colors shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                            <BookOpenIcon />
                        </span>
                        Our Story
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        It started with a simple map and a boundless curiosity. Our founders realized the travel industry
                        had become too automated. We created NaturaTravel to bring the "soul" back into travel, combining
                        cutting-edge tech with human expertise.
                    </p>
                </div>
            </div>

            {/* 3. WHAT WE DO */}
            <div className="mb-16 animate-fade-up delay-[200ms]">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">What We Do</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 mx-auto bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-4">
                            <Map className="w-7 h-7" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Bespoke Tours</h4>
                        <p className="text-xs text-gray-400">Handpicked, meticulously crafted itineraries that take you off the beaten path.</p>
                    </div>
                    <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 mx-auto bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4">
                            <PlaneTakeoff className="w-7 h-7" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Flight Booking</h4>
                        <p className="text-xs text-gray-400">A hassle-free reservation system to find you the best routes, rates, and comfort.</p>
                    </div>
                    <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 mx-auto bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mb-4">
                            <Building2 className="w-7 h-7" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Luxury Stays</h4>
                        <p className="text-xs text-gray-400">From five-star resorts to hidden eco-lodges, we partner with the finest properties.</p>
                    </div>
                </div>
            </div>

            {/* 4. CORE VALUES (Why Choose Us) */}
            <div className="mb-16 animate-fade-up delay-[300ms]">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">The NaturaTravel Difference</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ValueCard icon={<Star />} title="Curated Excellence" desc="Every tour and hotel is vetted by our experts to meet our high standards." color="text-yellow-400" bg="bg-yellow-400/10" />
                    <ValueCard icon={<Leaf />} title="Sustainable Exploration" desc="We deeply respect the environments and communities we visit." color="text-green-400" bg="bg-green-400/10" />
                    <ValueCard icon={<UserCheck />} title="Tailored Personalization" desc="Flexible options and personalized recommendations tailored to you." color="text-blue-400" bg="bg-blue-400/10" />
                    <ValueCard icon={<ShieldCheck />} title="24/7 Premium Support" desc="Our dedicated support team is with you every step of the way." color="text-rose-400" bg="bg-rose-400/10" />
                </div>
            </div>

            {/* 5. CALL TO ACTION */}
            <div className="relative rounded-3xl overflow-hidden border border-white/20 animate-fade-up delay-[400ms]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20"></div>

                <div className="relative z-10 p-10 md:p-16 text-center flex flex-col items-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to write your next chapter?</h2>
                    <p className="text-gray-300 mb-8 max-w-lg text-sm">The world is vast, and your next great adventure awaits. Let us be your compass.</p>
                    <button
                        onClick={() => navigate('/tours')}
                        className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold rounded-xl shadow-[0_10px_30px_#10b9814d] transition-all flex items-center gap-3"
                    >
                        Start Planning Now <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Component nhỏ hỗ trợ vẽ UI Core Values
const ValueCard = ({ icon, title, desc, color, bg }: any) => (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex gap-4 items-start hover:bg-white/[0.05] transition-colors">
        <div className={`shrink-0 w-12 h-12 rounded-full ${bg} ${color} flex items-center justify-center`}>
            {React.cloneElement(icon, { className: 'w-6 h-6' })}
        </div>
        <div>
            <h4 className="text-white font-bold text-base mb-1">{title}</h4>
            <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
        </div>
    </div>
);

// Icon phụ (SVG thủ công cho nhẹ)
const CompassIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-4 4-4-4m0 8l4-4 4 4" /></svg>;
const BookOpenIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;