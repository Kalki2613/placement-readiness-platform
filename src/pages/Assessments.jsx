import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import {
    Timer,
    Trophy,
    ChevronRight,
    ArrowLeft,
    CheckCircle2,
    XCircle,
    ShieldCheck,
    Terminal,
    Users,
    Activity,
    Brain,
    Sparkles
} from 'lucide-react';

const MOCK_ASSESSMENTS = [
    {
        id: 'fullstack',
        title: "Full-Stack Engineering Mock",
        description: "A comprehensive assessment covering React, Node.js, and System Design.",
        duration: "15 mins",
        icon: Terminal,
        questions: [
            {
                q: "Which hook is used for side effects in React?",
                options: ["useState", "useEffect", "useContext", "useReducer"],
                a: 1
            },
            {
                q: "What is the complexity of searching in a Balanced Binary Search Tree?",
                options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
                a: 2
            },
            {
                q: "What does JWT stand for?",
                options: ["Java Web Tool", "JSON Web Token", "Just Works Technology", "JSON Water Tank"],
                a: 1
            }
        ]
    },
    {
        id: 'behavioral',
        title: "Behavioral & Leadership Mock",
        description: "Focus on STAR method and conflict resolution scenarios.",
        duration: "10 mins",
        icon: Users,
        questions: [
            {
                q: "What does the 'S' in STAR stand for?",
                options: ["Standard", "Situation", "Solution", "Step"],
                a: 1
            },
            {
                q: "How should you handle an ambiguous project requirement?",
                options: ["Make a guess", "Ask for clarification", "Ignore it", "Wait for someone else"],
                a: 1
            }
        ]
    }
];

const Assessments = () => {
    const [activeAssessment, setActiveAssessment] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('prp_assessment_results') || '[]');
        setHistory(saved);
    }, []);

    const startAssessment = (assessment) => {
        setActiveAssessment(assessment);
        setCurrentStep(0);
        setScore(0);
        setIsFinished(false);
    };

    const handleAnswer = (optionIdx) => {
        if (optionIdx === activeAssessment.questions[currentStep].a) {
            setScore(prev => prev + 1);
        }

        if (currentStep + 1 < activeAssessment.questions.length) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsFinished(true);
            const finalScore = Math.round(((score + (optionIdx === activeAssessment.questions[currentStep].a ? 1 : 0)) / activeAssessment.questions.length) * 100);
            const result = {
                id: Date.now(),
                title: activeAssessment.title,
                score: finalScore,
                date: new Date().toLocaleDateString()
            };
            const newHistory = [result, ...history];
            setHistory(newHistory);
            localStorage.setItem('prp_assessment_results', JSON.stringify(newHistory));
        }
    };

    if (activeAssessment) {
        if (isFinished) {
            return (
                <div className="max-w-2xl mx-auto py-20 text-center space-y-8 animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                        <Trophy size={48} />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black text-slate-900">Assessment Complete!</h2>
                        <p className="text-slate-500 font-semibold">Great job on finishing the <span className="text-primary">{activeAssessment.title}</span>.</p>
                        <div className="text-6xl font-black text-primary py-4">{Math.round((score / activeAssessment.questions.length) * 100)}%</div>
                    </div>
                    <button
                        onClick={() => setActiveAssessment(null)}
                        className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black hover:bg-black transition-all"
                    >
                        BACK TO ASSESSMENTS
                    </button>
                </div>
            );
        }

        const currentQuestion = activeAssessment.questions[currentStep];
        return (
            <div className="max-w-3xl mx-auto py-12 space-y-8">
                <div className="flex items-center justify-between">
                    <button onClick={() => setActiveAssessment(null)} className="text-slate-400 hover:text-slate-900 flex items-center gap-1 font-bold text-sm">
                        <ArrowLeft size={16} /> ABANDON
                    </button>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question</span>
                        <span className="text-lg font-black text-slate-900">{currentStep + 1} / {activeAssessment.questions.length}</span>
                    </div>
                </div>

                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${((currentStep + 1) / activeAssessment.questions.length) * 100}%` }}
                    />
                </div>

                <Card className="border-none shadow-2xl p-8 space-y-8">
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">
                        {currentQuestion.q}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        {currentQuestion.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                className="w-full text-left p-6 rounded-2xl border-2 border-slate-100 hover:border-primary hover:bg-slate-50 transition-all group flex items-center justify-between"
                            >
                                <span className="font-bold text-slate-700 group-hover:text-primary">{opt}</span>
                                <ChevronRight size={20} className="text-slate-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </button>
                        ))}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        Skill Assessments <Brain className="text-primary" size={28} />
                    </h2>
                    <p className="text-slate-500 font-medium italic">Validate your expertise with industry-grade mock assessments.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck size={16} /> Verification Active
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {MOCK_ASSESSMENTS.map((item) => (
                    <Card key={item.id} className="border-none shadow-xl p-6 group hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                <item.icon size={32} />
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded">
                                <Timer size={12} /> {item.duration}
                            </div>
                        </div>
                        <div className="mt-8 space-y-2">
                            <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
                            <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.description}</p>
                        </div>
                        <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">P{i}</div>
                                ))}
                            </div>
                            <button
                                onClick={() => startAssessment(item)}
                                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-black active:scale-95 transition-all"
                            >
                                START MOCK <ChevronRight size={16} />
                            </button>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-none bg-slate-50 shadow-sm p-8">
                    <CardTitle className="text-xl font-black mb-6 flex items-center gap-2">
                        <Activity className="text-primary" size={20} /> Assessment History
                    </CardTitle>
                    <div className="space-y-3">
                        {history.length > 0 ? history.map((h) => (
                            <div key={h.id} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-slate-800">{h.title}</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{h.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-lg font-black ${h.score >= 70 ? 'text-emerald-500' : 'text-primary'}`}>{h.score}%</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score</p>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-12 text-slate-400 font-medium italic">No history yet. Start your first mock assessment above.</div>
                        )}
                    </div>
                </Card>

                <Card className="bg-primary text-white border-none shadow-xl p-8 relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 p-4 opacity-10 pointer-events-none">
                        <Trophy size={120} />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <div className="p-3 bg-white/10 rounded-2xl w-fit">
                            <Sparkles size={24} />
                        </div>
                        <h3 className="text-2xl font-black leading-tight">Pro Tip: Analyze First</h3>
                        <p className="text-indigo-100 text-sm font-medium leading-relaxed">
                            Complete an AI Job Analysis on the dashboard first. It will highlight specific weaknesses you should target in these assessments.
                        </p>
                        <ul className="space-y-2">
                            {['Real Interview Questions', 'Time Pressure', 'Live Feedback'].map(li => (
                                <li key={li} className="flex items-center gap-2 text-xs font-bold">
                                    <CheckCircle2 size={14} className="text-emerald-400" /> {li}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Assessments;
