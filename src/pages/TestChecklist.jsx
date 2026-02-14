import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from '../components/ui/card';
import {
    CheckCircle2,
    AlertCircle,
    RefreshCw,
    ArrowRight,
    TestTube2,
    Lock,
    Boxes
} from 'lucide-react';

const TEST_ITEMS = [
    { id: 'jd-req', label: 'JD required validation works', hint: 'Try to submit the dashboard form without a JD.' },
    { id: 'short-jd', label: 'Short JD warning shows for <200 chars', hint: 'Paste a very short JD and check for the amber warning.' },
    { id: 'skills-group', label: 'Skills extraction groups correctly', hint: 'Verify skills are categorized (Core CS, Languages, etc.).' },
    { id: 'round-map', label: 'Round mapping changes based on company + skills', hint: 'Test "Amazon" (Enterprise) vs an unknown company (Startup).' },
    { id: 'score-calc', label: 'Score calculation is deterministic', hint: 'Verify same input produces same starting baseScore.' },
    { id: 'live-score', label: 'Skill toggles update score live', hint: 'Toggle a skill on Results page and watch the score change.' },
    { id: 'persistence', label: 'Changes persist after refresh', hint: 'Toggle skills, refresh the page, and check if state remains.' },
    { id: 'history-save', label: 'History saves and loads correctly', hint: 'Check if new analyses appear in the History tab.' },
    { id: 'export-copy', label: 'Export buttons copy the correct content', hint: 'Test "Copy Plan" and paste it into a notepad.' },
    { id: 'no-errors', label: 'No console errors on core pages', hint: 'Open DevTools and check for red errors during navigation.' }
];

const TestChecklist = () => {
    const navigate = useNavigate();
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('prp_test_checklist') || '{}');
        setCheckedItems(saved);
    }, []);

    const toggleItem = (id) => {
        const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(newChecked);
        localStorage.setItem('prp_test_checklist', JSON.stringify(newChecked));
    };

    const resetChecklist = () => {
        if (window.confirm("Are you sure you want to reset all test progress?")) {
            setCheckedItems({});
            localStorage.removeItem('prp_test_checklist');
        }
    };

    const passedCount = Object.values(checkedItems).filter(Boolean).length;
    const isComplete = passedCount === TEST_ITEMS.length;

    return (
        <div className="min-h-screen bg-[#F7F6F3] py-12 px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20">
                            <Boxes size={28} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Quality Assurance Gate</h2>
                            <p className="text-slate-500 font-medium">Placement Readiness Platform Build v1.2</p>
                        </div>
                    </div>
                    <button
                        onClick={resetChecklist}
                        className="group flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-red-500 transition-all uppercase tracking-widest bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm"
                    >
                        <RefreshCw size={12} className="group-hover:rotate-180 transition-transform duration-500" /> Reset checklist
                    </button>
                </div>

                <Card className={`border-none shadow-2xl overflow-hidden transition-all duration-700 ${isComplete ? "ring-2 ring-emerald-500" : ""}`}>
                    <div className={`h-2 transition-all duration-700 ${isComplete ? "bg-emerald-500" : "bg-primary"}`} style={{ width: `${(passedCount / 10) * 100}%` }}></div>
                    <CardHeader className="bg-white pb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="space-y-1">
                                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm ${isComplete ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                                    {isComplete ? "Verification Passed" : "Testing Phase"}
                                </span>
                                <h3 className="text-5xl font-black text-slate-900 mt-2">
                                    Tests Passed: <span className={isComplete ? "text-emerald-600" : "text-primary"}>{passedCount}</span> <span className="text-slate-300">/ 10</span>
                                </h3>
                            </div>
                            {isComplete ? (
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-emerald-200">
                                    <CheckCircle2 size={32} />
                                </div>
                            ) : (
                                <div className="w-16 h-16 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center border-4 border-dashed border-slate-100">
                                    <Lock size={28} />
                                </div>
                            )}
                        </div>

                        {!isComplete && (
                            <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl flex items-center gap-4 text-amber-900 text-sm font-bold shadow-sm animate-in fade-in slide-in-from-top-2">
                                <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                                    <AlertCircle size={20} />
                                </div>
                                Fix issues before shipping.
                            </div>
                        )}
                    </CardHeader>

                    <CardContent className="bg-white space-y-3 pt-4 px-8 pb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {TEST_ITEMS.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => toggleItem(item.id)}
                                    className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${checkedItems[item.id]
                                        ? "bg-emerald-50/20 border-emerald-500/20 shadow-inner"
                                        : "bg-slate-50 border-transparent hover:border-slate-200 hover:bg-white hover:shadow-lg"
                                        }`}
                                >
                                    <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${checkedItems[item.id] ? "bg-emerald-500 border-emerald-500 text-white translate-y-[-2px] shadow-lg shadow-emerald-200" : "bg-white border-slate-200"
                                        }`}>
                                        {checkedItems[item.id] && <CheckCircle2 size={16} />}
                                    </div>
                                    <div className="space-y-1">
                                        <p className={`text-sm font-black tracking-tight transition-colors ${checkedItems[item.id] ? "text-emerald-900" : "text-slate-800"}`}>
                                            {item.label}
                                        </p>
                                        <p className={`text-[10px] uppercase font-bold tracking-widest transition-colors ${checkedItems[item.id] ? "text-emerald-600/60" : "text-slate-400"}`}>
                                            {item.hint}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8">
                            <button
                                onClick={() => navigate('/prp/08-ship')}
                                className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-95 ${isComplete
                                    ? "bg-slate-900 text-white hover:bg-black hover:shadow-black/20"
                                    : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-50 shadow-none grayscale"
                                    }`}
                            >
                                PROCEED TO SHIP <ArrowRight size={24} className={isComplete ? "animate-bounce-x" : ""} />
                            </button>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-between items-center px-2">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                        Quality Assurance Gate • Build v1.2.0
                    </p>
                    <div className="flex gap-4">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-pulse"></span>
                        <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestChecklist;
