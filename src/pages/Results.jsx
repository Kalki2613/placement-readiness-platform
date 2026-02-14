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
    CheckCircle2,
    ChevronRight,
    ListTodo,
    CalendarCheck,
    BookOpen,
    Sparkles,
    ArrowLeft,
    Copy,
    Download,
    AlertCircle,
    Check,
    Building2,
    Workflow
} from 'lucide-react';

const CompanyIntelBlock = ({ intel }) => {
    if (!intel) return null;
    return (
        <Card className="border-indigo-100 bg-indigo-50/10">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Building2 size={18} className="text-primary" />
                        Company Intelligence
                    </CardTitle>
                    <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200 uppercase tracking-tighter">
                        Heuristic Data
                    </span>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Industry</span>
                        <p className="text-sm font-semibold text-slate-700">{intel.industry}</p>
                    </div>
                    <div className="space-y-0.5">
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Category</span>
                        <p className="text-sm font-semibold text-slate-700">{intel.category}</p>
                    </div>
                </div>
                <div className="pt-2 border-t border-indigo-100/50">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Typical Hiring Focus</span>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed italic">
                        "{intel.hiringFocus}"
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

const RoundMappingTimeline = ({ rounds }) => {
    if (!rounds) return null;
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Workflow size={18} className="text-primary" />
                    Interview Process Mapping
                </CardTitle>
                <CardDescription>Estimated round flow for this company type.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-0">
                {rounds.map((item, idx) => (
                    <div key={idx} className="flex gap-4 group">
                        <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${idx === 0 ? "bg-primary border-primary text-white" : "bg-white border-slate-200 text-slate-400 group-hover:border-primary/40 group-hover:text-primary"
                                }`}>
                                <span className="text-xs font-bold">{idx + 1}</span>
                            </div>
                            {idx !== rounds.length - 1 && <div className="w-0.5 h-full bg-slate-100 my-1 group-hover:bg-primary/20 transition-colors"></div>}
                        </div>
                        <div className="pb-10">
                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors leading-none mb-1">
                                {item.roundTitle}
                            </h4>
                            <p className="text-xs font-semibold text-slate-500 mb-2">{item.focusAreas.join(", ")}</p>
                            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 mt-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Why this round matters</span>
                                <p className="text-[11px] text-slate-600 leading-normal">{item.whyItMatters}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="mt-2 pt-4 border-t border-slate-100 text-[10px] text-slate-400 flex items-center gap-1">
                    <AlertCircle size={10} /> Demo Mode: Company intel generated heuristically.
                </div>
            </CardContent>
        </Card>
    );
};

const Results = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [skillConfidence, setSkillConfidence] = useState({});
    const [currentScore, setCurrentScore] = useState(0);
    const [copyStatus, setCopyStatus] = useState({});

    useEffect(() => {
        const current = JSON.parse(sessionStorage.getItem('current_analysis'));
        if (!current) {
            navigate('/app');
            return;
        }
        setData(current);
        setSkillConfidence(current.skillConfidenceMap || {});
        setCurrentScore(current.finalScore || current.baseScore || 0);
    }, [navigate]);

    const updateHistory = (newConfidence, newScore) => {
        const history = JSON.parse(localStorage.getItem('placement_history') || '[]');
        const now = new Date().toISOString();
        const updatedHistory = history.map(item => {
            if (item.id === data.id) {
                return {
                    ...item,
                    skillConfidenceMap: newConfidence,
                    finalScore: newScore,
                    updatedAt: now
                };
            }
            return item;
        });
        localStorage.setItem('placement_history', JSON.stringify(updatedHistory));

        // Also update session storage
        const updatedData = { ...data, skillConfidenceMap: newConfidence, finalScore: newScore, updatedAt: now };
        sessionStorage.setItem('current_analysis', JSON.stringify(updatedData));
        setData(updatedData);
    };

    const toggleSkill = (skill) => {
        const currentStatus = skillConfidence[skill] || 'practice';
        const newStatus = currentStatus === 'know' ? 'practice' : 'know';
        const newConfidence = { ...skillConfidence, [skill]: newStatus };

        // Calculate new finalScore based on toggle change
        const adjustment = newStatus === 'know' ? 4 : -4;
        const newScore = Math.max(0, Math.min(100, currentScore + adjustment));

        setSkillConfidence(newConfidence);
        setCurrentScore(newScore);
        updateHistory(newConfidence, newScore);
    };

    const copyToClipboard = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopyStatus({ ...copyStatus, [key]: true });
        setTimeout(() => setCopyStatus({ ...copyStatus, [key]: false }), 2000);
    };

    const downloadTxt = () => {
        const content = `
PLACEMENT READINESS REPORT
==========================
Company: ${data.company || 'Not Specified'}
Role: ${data.role || 'Not Specified'}
Date: ${new Date(data.createdAt).toLocaleDateString()}
Last Updated: ${new Date(data.updatedAt).toLocaleDateString()}
Current Score: ${currentScore}/100 (Base: ${data.baseScore})

COMPANY INTEL
-------------
Industry: ${data.companyIntel?.industry || 'N/A'}
Size: ${data.companyIntel?.category || 'N/A'}
Typical Focus: ${data.companyIntel?.hiringFocus || 'N/A'}

INTERVIEW ROUNDS
----------------
${data.roundMapping?.map((r, i) => `Round ${i + 1}: ${r.roundTitle}\nFocus: ${r.focusAreas.join(", ")}\nWhy: ${r.whyItMatters}`).join('\n\n') || "No mapping available"}

KEY SKILLS & ASSESSMENT
-----------------------
${Object.entries(data.extractedSkills).map(([cat, skills]) =>
            skills.length > 0 ? `${cat.toUpperCase()}: ${skills.map(s => `${s} [${skillConfidence[s] === 'know' ? 'KNOW' : 'PRACTICE'}]`).join(', ')}` : ""
        ).filter(Boolean).join('\n')}

7-DAY ACTION PLAN
-----------------
${data.plan7Days?.map(p => `Day ${p.day}: ${p.focus}\nTasks: ${p.tasks.join(", ")}`).join('\n\n') || "No plan available"}

PREPARATION CHECKLIST
---------------------
${data.checklist?.map(c => `${c.roundTitle}\n${c.items.map(i => `- ${i}`).join('\n')}`).join('\n\n') || "No checklist available"}

LIKELY INTERVIEW QUESTIONS
--------------------------
${data.questions?.map((q, i) => `${i + 1}. ${q}`).join('\n') || "No questions generated"}
    `.trim();

        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `Placement_Plan_${data.company || 'Analysis'}.txt`;
        document.body.appendChild(element);
        element.click();
    };

    if (!data) return null;

    const weakSkills = Object.keys(skillConfidence).filter(s => skillConfidence[s] === 'practice').slice(0, 3);

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="space-y-1">
                    <button
                        onClick={() => navigate('/app/history')}
                        className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition-colors mb-4"
                    >
                        <ArrowLeft size={16} /> Back to History
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">Analysis Results</h2>
                            <p className="text-slate-500 font-medium">For {data.role} at <span className="text-slate-900">{data.company}</span></p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-3">
                    <div className="inline-flex flex-col items-center p-4 bg-white border border-slate-200 rounded-2xl shadow-sm min-w-[120px]">
                        <span className="text-5xl font-black text-primary">{currentScore}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Final Score</span>
                    </div>
                    <button
                        onClick={downloadTxt}
                        className="flex items-center gap-2 text-xs font-bold text-slate-600 border border-slate-200 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 transition-all uppercase tracking-wider"
                    >
                        <Download size={14} /> Download TXT
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <CompanyIntelBlock intel={data.companyIntel} />
                        <RoundMappingTimeline rounds={data.roundMapping} />
                    </div>

                    <Card className="bg-slate-900 border-none shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <ListTodo className="text-primary" size={20} />
                                Extracted Skills & Self-Assessment
                            </CardTitle>
                            <CardDescription className="text-slate-400">Click a skill to toggle confidence. Adjusted from base score ({data.baseScore}).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {Object.entries(data.extractedSkills).map(([category, skills]) => (
                                    skills.length > 0 && (
                                        <div key={category} className="space-y-4">
                                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{category}</h4>
                                            <div className="flex flex-wrap gap-3">
                                                {skills.map((skill, idx) => {
                                                    const isKnown = skillConfidence[skill] === 'know';
                                                    return (
                                                        <button
                                                            key={idx}
                                                            onClick={() => toggleSkill(skill)}
                                                            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-2 ${isKnown
                                                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                                                                    : "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500"
                                                                }`}
                                                        >
                                                            {isKnown ? <Check size={14} /> : <AlertCircle size={14} className="text-slate-500" />}
                                                            {skill}
                                                            <span className={`text-[10px] ml-1 uppercase opacity-50 ${isKnown ? "text-emerald-400" : "text-slate-400"}`}>
                                                                {isKnown ? "Known" : "Prep"}
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <div className="space-y-1">
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <CalendarCheck size={20} />
                                    7-Day Action Plan
                                </CardTitle>
                                <CardDescription>Tailored schedule for {data.company || "the company"}.</CardDescription>
                            </div>
                            <button
                                onClick={() => copyToClipboard(data.plan7Days.map(p => `Day ${p.day}: ${p.focus}\nTasks: ${p.tasks.join(", ")}`).join('\n\n'), 'plan')}
                                className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest"
                            >
                                {copyStatus.plan ? <Check size={12} /> : <Copy size={12} />}
                                {copyStatus.plan ? "Copied" : "Copy Plan"}
                            </button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.plan7Days?.map((day, idx) => (
                                    <div key={idx} className="flex gap-4 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-primary flex items-center justify-center font-bold text-xs group-hover:bg-primary group-hover:text-white transition-all">
                                                D {day.day}
                                            </div>
                                            {idx !== data.plan7Days.length - 1 && <div className="w-px h-full bg-slate-100 my-1"></div>}
                                        </div>
                                        <div className="pb-6">
                                            <h4 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">{day.focus}</h4>
                                            <ul className="text-sm text-slate-600 mt-1 leading-relaxed list-disc list-inside">
                                                {day.tasks.map((task, stidx) => (
                                                    <li key={stidx}>{task}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="border-primary/20 bg-indigo-50/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-slate-900">Preparation Checklist</CardTitle>
                            <button
                                onClick={() => copyToClipboard(data.checklist.map(c => `${c.roundTitle}\n${c.items.map(i => `- ${i}`).join('\n')}`).join('\n\n'), 'checklist')}
                                className="text-primary hover:text-primary/70"
                            >
                                {copyStatus.checklist ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {data.checklist?.map((round, idx) => (
                                <div key={idx} className="space-y-3">
                                    <h4 className="text-xs font-extrabold text-primary/80 uppercase tracking-tighter border-b border-primary/10 pb-1">{round.roundTitle}</h4>
                                    <ul className="space-y-2">
                                        {round.items.map((item, iIdx) => (
                                            <li key={iIdx} className="flex items-start gap-2 text-xs font-semibold text-slate-600">
                                                <CheckCircle2 size={14} className="text-primary/40 shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen size={18} className="text-primary" />
                                Likely Questions
                            </CardTitle>
                            <button
                                onClick={() => copyToClipboard(data.questions.map((q, i) => `${i + 1}. ${q}`).join('\n'), 'questions')}
                                className="text-slate-400 hover:text-primary transition-colors"
                            >
                                {copyStatus.questions ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.questions?.map((q, idx) => (
                                    <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-slate-700 hover:bg-white hover:border-primary/20 hover:shadow-sm transition-all cursor-default leading-relaxed">
                                        "{q}"
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="bg-primary text-white border-none overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Sparkles size={120} />
                </div>
                <CardContent className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 pb-8">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-2xl font-bold">Action Next</h3>
                        <p className="text-indigo-100 max-w-md">
                            Focus on these areas to boost your readiness immediately:
                            <span className="font-bold text-white block mt-2">
                                {weakSkills.length > 0 ? weakSkills.join(", ") : "All skills mastered!"}
                            </span>
                        </p>
                    </div>
                    <button
                        onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
                        className="bg-white text-primary px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-50 transition-all flex items-center gap-2"
                    >
                        Start Day 1 Plan now <ChevronRight size={18} />
                    </button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Results;
