import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, Trophy, Target, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <nav className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
                <h1 className="text-2xl font-black text-primary tracking-tighter">Placement Readiness</h1>
                <button
                    onClick={() => navigate('/app')}
                    className="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
                >
                    Sign In
                </button>
            </nav>

            <main className="max-w-7xl mx-auto px-8 pt-20 pb-12">
                <div className="text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-primary border border-indigo-100 rounded-full text-xs font-bold uppercase tracking-widest">
                        <Sparkles size={14} /> AI-Powered Preparation Platform
                    </div>

                    <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9]">
                        Crack Your <br />
                        <span className="text-primary italic">Dream Job.</span>
                    </h2>

                    <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
                        Upload any job description and let our intelligence engine map out
                        your exact roadmap—from online assessments to the final HR round.
                    </p>

                    <div className="pt-8">
                        <button
                            onClick={() => navigate('/app')}
                            className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-xl shadow-2xl hover:bg-black hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
                        >
                            GET STARTED NOW <ArrowRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
                    <div className="p-8 bg-slate-50 rounded-3xl space-y-4">
                        <div className="w-12 h-12 bg-white text-primary rounded-2xl shadow-sm flex items-center justify-center">
                            <Trophy size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900">Custom Roadmaps</h4>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            Generated based on the specific skills extracted from the job description and the hiring pattern of the company.
                        </p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl space-y-4">
                        <div className="w-12 h-12 bg-white text-primary rounded-2xl shadow-sm flex items-center justify-center">
                            <Target size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900">Live Scoring</h4>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            Assess your confidence level for each required skill and see your readiness score evolve in real-time.
                        </p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl space-y-4">
                        <div className="w-12 h-12 bg-white text-primary rounded-2xl shadow-sm flex items-center justify-center">
                            <ShieldCheck size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900">Verified Quality</h4>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            Our built-in quality gates ensure every preparation plan meets industry standards for data integrity and utility.
                        </p>
                    </div>
                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-8 py-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                <p>© 2026 Placement Readiness Platform • Hardened Build v1.2</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-primary transition-colors">Documentation</a>
                    <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                    <a href="#" className="hover:text-primary transition-colors">Support</a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
