import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription
} from '../components/ui/card';
import {
    CheckCircle2,
    Circle,
    Link2,
    Github,
    Globe,
    ExternalLink,
    Copy,
    Trophy,
    ArrowLeft,
    ShieldCheck,
    AlertCircle,
    Sparkles
} from 'lucide-react';

const STEPS = [
    { id: 1, name: "Analysis Engine Logic", status: "Completed" },
    { id: 2, name: "Dashboard UI & Validation", status: "Completed" },
    { id: 3, name: "Results Page Interaction", status: "Completed" },
    { id: 4, name: "Company Intel Heuristics", status: "Completed" },
    { id: 5, name: "Round Mapping Vertical Timeline", status: "Completed" },
    { id: 6, name: "History Persistence & Robustness", status: "Completed" },
    { id: 7, name: "Quality QA Checklist", status: "Completed" },
    { id: 8, name: "Submission & Proof System", status: "Completed" }
];

const Proof = () => {
    const navigate = useNavigate();
    const [links, setLinks] = useState({
        lovable: '',
        github: '',
        deployment: ''
    });
    const [errors, setErrors] = useState({});
    const [testCount, setTestCount] = useState(0);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Load links
        const savedLinks = JSON.parse(localStorage.getItem('prp_final_submission') || '{}');
        setLinks(savedLinks);

        // Load test count
        const savedTests = JSON.parse(localStorage.getItem('prp_test_checklist') || '{}');
        setTestCount(Object.values(savedTests).filter(Boolean).length);
    }, []);

    const validateUrl = (url) => {
        if (!url) return false;
        try {
            const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
            return !!pattern.test(url);
        } catch (_) {
            return false;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newLinks = { ...links, [name]: value };
        setLinks(newLinks);
        localStorage.setItem('prp_final_submission', JSON.stringify(newLinks));

        if (value && !validateUrl(value)) {
            setErrors(prev => ({ ...prev, [name]: 'Please enter a valid URL' }));
        } else {
            setErrors(prev => {
                const newErrs = { ...prev };
                delete newErrs[name];
                return newErrs;
            });
        }
    };

    const isLinksValid = validateUrl(links.lovable) && validateUrl(links.github) && validateUrl(links.deployment);
    const isAllTestsPassed = testCount === 10;

    // Requirements: 8 steps + 10 tests + 3 links
    const stepsCompletedCount = STEPS.filter(s => s.status === 'Completed').length;
    const isShipped = isLinksValid && isAllTestsPassed && stepsCompletedCount === 8;

    const copySubmission = () => {
        const text = `
------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployment}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------
`.trim();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                    <button
                        onClick={() => navigate('/prp/08-ship')}
                        className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition-colors mb-2"
                    >
                        <ArrowLeft size={16} /> Back to Shipping
                    </button>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Proof of Work</h2>
                    <p className="text-slate-500 font-medium italic">Document your build artifacts and developmental milestones.</p>
                </div>

                <div className={`px-6 py-3 rounded-full flex items-center gap-3 shadow-xl transition-all duration-500 ${isShipped ? "bg-emerald-500 text-white scale-110" : "bg-slate-100 text-slate-400 group"}`}>
                    {isShipped ? <ShieldCheck size={24} /> : <Circle size={24} className="animate-pulse" />}
                    <span className="font-black text-lg uppercase tracking-widest">{isShipped ? "Shipped" : "In Progress"}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Step Completion */}
                <Card className="shadow-xl border-none bg-slate-50/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle2 className="text-primary" size={20} />
                            Step Completion Overview
                        </CardTitle>
                        <CardDescription>Final check of all developmental milestones.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {STEPS.map(step => (
                            <div key={step.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-slate-400">0{step.id}</span>
                                    <span className="text-sm font-semibold text-slate-700">{step.name}</span>
                                </div>
                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${step.status === 'Completed' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'}`}>
                                    {step.status}
                                </span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Artifact Inputs */}
                <Card className="shadow-xl h-fit">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Link2 className="text-primary" size={20} />
                            Artifact Inputs
                        </CardTitle>
                        <CardDescription>Required links for final submission verification.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Sparkles size={14} className="text-indigo-400" /> Lovable Project Link
                            </label>
                            <div className="relative">
                                <input
                                    type="url"
                                    name="lovable"
                                    value={links.lovable}
                                    onChange={handleChange}
                                    placeholder="https://lovable.dev/projects/..."
                                    className={`w-full bg-slate-50 border-2 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all ${errors.lovable ? "border-red-200 focus:border-red-500" : "border-slate-100 focus:border-primary"}`}
                                />
                                {errors.lovable && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.lovable}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Github size={14} className="text-slate-800" /> GitHub Repository
                            </label>
                            <div className="relative">
                                <input
                                    type="url"
                                    name="github"
                                    value={links.github}
                                    onChange={handleChange}
                                    placeholder="https://github.com/your-username/repo"
                                    className={`w-full bg-slate-50 border-2 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all ${errors.github ? "border-red-200 focus:border-red-500" : "border-slate-100 focus:border-primary"}`}
                                />
                                {errors.github && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.github}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Globe size={14} className="text-blue-500" /> Deployed URL
                            </label>
                            <div className="relative">
                                <input
                                    type="url"
                                    name="deployment"
                                    value={links.deployment}
                                    onChange={handleChange}
                                    placeholder="https://your-project.vercel.app"
                                    className={`w-full bg-slate-50 border-2 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all ${errors.deployment ? "border-red-200 focus:border-red-500" : "border-slate-100 focus:border-primary"}`}
                                />
                                {errors.deployment && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.deployment}</p>}
                            </div>
                        </div>

                        {!isShipped && (
                            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                                <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-amber-900">Remaining Prerequisites:</p>
                                    <ul className="text-[10px] text-amber-800 font-medium space-y-1 opacity-80 list-disc list-inside">
                                        {stepsCompletedCount < 8 && <li>Complete all 8 development steps</li>}
                                        {!isAllTestsPassed && <li>Ensure all 10 QA tests are passed ({testCount}/10)</li>}
                                        {!isLinksValid && <li>Provide all 3 verified artifact URLs</li>}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col items-center gap-6">
                <button
                    onClick={copySubmission}
                    disabled={!isShipped}
                    className={`px-12 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all flex items-center gap-3 ${isShipped ? "bg-slate-900 text-white hover:bg-black hover:scale-105" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                >
                    {copied ? <CheckCircle2 size={24} /> : <Copy size={24} />}
                    {copied ? "SUBMISSION COPIED" : "COPY FINAL SUBMISSION"}
                </button>

                {isShipped && (
                    <div className="max-w-2xl text-center space-y-8 animate-in slide-in-from-bottom-4 duration-1000">
                        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-100 overflow-hidden relative border-4 border-white">
                            <Trophy size={48} />
                        </div>
                        <div className="space-y-6">
                            <p className="text-3xl font-black text-slate-900 tracking-tight leading-relaxed whitespace-pre-line">
                                You built a real product.{"\n"}
                                Not a tutorial. Not a clone.{"\n"}
                                A structured tool that solves a real problem.{"\n\n"}
                                <span className="text-primary underline underline-offset-8">This is your proof of work.</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
                Placement Readiness Platform • Hardened Proof System v1.2
            </p>
        </div>
    );
};

export default Proof;
