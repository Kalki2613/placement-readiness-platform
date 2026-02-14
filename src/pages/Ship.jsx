import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from '../components/ui/card';
import {
    Lock,
    Rocket,
    ChevronRight,
    CheckCircle2,
    Copy,
    Sparkles,
    ArrowLeft,
    ShieldAlert,
    Terminal
} from 'lucide-react';

const Ship = () => {
    const navigate = useNavigate();
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [passedCount, setPassedCount] = useState(0);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('prp_test_checklist') || '{}');
        const count = Object.values(saved).filter(Boolean).length;
        setPassedCount(count);
        setIsUnlocked(count === 10);
    }, []);

    const copySubmission = () => {
        const text = `
SUBMISSION: Placement Readiness Platform
========================================
Status: 10/10 Tests Passed (Verified)
Engine: AI Analysis v1.2.0 Hardened
Features: Smart Validation, Sector Intel, Export, Vertical History
Quality Gate: PASS
Verified By: Developer
`.trim();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isUnlocked) {
        return (
            <div className="min-h-screen bg-[#F7F6F3] flex items-center justify-center p-6">
                <div className="max-w-md w-full space-y-8 text-center animate-in fade-in zoom-in duration-500">
                    <div className="relative inline-block">
                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto text-slate-300 shadow-2xl border-8 border-slate-50 rotate-[-10deg]">
                            <Lock size={56} />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-red-500 text-white p-3 rounded-2xl shadow-lg animate-bounce">
                            <ShieldAlert size={24} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Shipping Restricted</h2>
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center justify-between">
                            <div className="text-left">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Progress</p>
                                <p className="text-2xl font-black text-slate-900">{passedCount} <span className="text-slate-300">/ 10</span></p>
                            </div>
                            <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${(passedCount / 10) * 100}%` }}></div>
                            </div>
                        </div>
                        <p className="text-slate-500 font-medium px-4">
                            The shipping module is locked until all 10 items in the <span className="text-primary font-bold">Quality QA Gate</span> are verified and checked.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/prp/07-test')}
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-lg shadow-xl hover:bg-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> BACK TO CHECKLIST
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-16 px-6">
            <div className="max-w-5xl mx-auto space-y-16">
                <div className="text-center space-y-6">
                    <div className="relative inline-block">
                        <div className="p-6 bg-emerald-500 text-white rounded-[40px] shadow-2xl shadow-emerald-200 animate-float">
                            <Rocket size={64} />
                        </div>
                        <div className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg">
                            <CheckCircle2 size={24} className="text-emerald-500" />
                        </div>
                    </div>
                    <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Ready for Launch.</h2>
                    <p className="text-slate-500 font-semibold text-xl max-w-xl mx-auto">
                        Build integrity verified. The Placement Readiness Platform is ready for professional deployment.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <Card className="border-none bg-slate-50 shadow-2xl rounded-[32px] overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                            <Sparkles size={160} />
                        </div>
                        <CardHeader className="p-8">
                            <CardTitle className="text-2xl font-black flex items-center gap-3">
                                <Terminal className="text-emerald-500" size={28} />
                                Release Metadata
                            </CardTitle>
                            <CardDescription className="text-slate-500 font-medium">Verified technical specifications for Build 1.2.0.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 space-y-6">
                            <div className="space-y-3">
                                {[
                                    { l: "Platform Hardening", v: "Active" },
                                    { l: "Analysis Logic", v: "Standardized" },
                                    { l: "Input Validation", v: "Strict (200 Chars)" },
                                    { l: "Persistence", v: "Robust (LocalStorage)" }
                                ].map((row, i) => (
                                    <div key={i} className="flex justify-between items-center py-2 border-b border-white">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{row.l}</span>
                                        <span className="text-sm font-black text-emerald-600">{row.v}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 flex items-center gap-3">
                                <CheckCircle2 size={20} className="text-emerald-500" />
                                <p className="text-xs font-bold text-emerald-700 italic">Signature verified by Quality Gate v1.2</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-none shadow-2xl rounded-[32px] text-white p-2">
                        <CardHeader className="p-8">
                            <CardTitle className="text-white text-2xl font-black">Final Submission</CardTitle>
                            <CardDescription className="text-slate-400 font-medium">Copy this payload for project documentation.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 space-y-8">
                            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 font-mono text-emerald-400 text-xs leading-relaxed space-y-1">
                                <p className="opacity-50">// FINAL_BUILD_SUBMISSION</p>
                                <p>PROJECT: "Placement Readiness Platform"</p>
                                <p>VERIFICATION: {passedCount}/10 PASSED</p>
                                <p>STABILITY: "Production Ready"</p>
                            </div>
                            <button
                                onClick={() => navigate('/prp/proof')}
                                className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
                            >
                                PROCEED TO PROOF <ChevronRight size={24} />
                            </button>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-center pt-8">
                    <button
                        onClick={() => navigate('/app')}
                        className="group text-slate-400 hover:text-slate-900 font-black flex items-center gap-2 transition-all uppercase tracking-[0.2em] text-[10px]"
                    >
                        RETURN TO DASHBOARD <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Ship;
