import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from '../components/ui/card';
import {
    Briefcase,
    Building2,
    FileText,
    Sparkles,
    AlertCircle,
    ArrowRight
} from 'lucide-react';
import { analyzeJD } from '../utils/analysisEngine';

const Dashboard = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        jdText: ''
    });
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [warning, setWarning] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'jdText' && value.trim().length > 0 && value.trim().length < 200) {
            setWarning('This JD is too short to analyze deeply. Paste full JD for better output.');
        } else {
            setWarning('');
        }
    };

    const handleAnalyze = (e) => {
        e.preventDefault();
        if (formData.jdText.trim().length < 200) {
            setWarning('Please provide a more detailed JD (min 200 characters).');
            return;
        }

        setIsAnalyzing(true);

        // Simulate a bit of processing for "Premium" feel
        setTimeout(() => {
            const results = analyzeJD(formData);

            // Save to history
            const history = JSON.parse(localStorage.getItem('placement_history') || '[]');
            localStorage.setItem('placement_history', JSON.stringify([results, ...history]));

            // Pass to current view
            sessionStorage.setItem('current_analysis', JSON.stringify(results));

            navigate('/app/results');
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Job Analysis</h2>
                <p className="text-slate-500 font-medium">Analyze a Job Description to generate a tailored preparation plan.</p>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="hover:border-primary/20 transition-colors shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-700">
                                <Building2 size={16} className="text-primary" /> Company Name
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g. Amazon, Google, Startup X"
                                className="w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                            />
                        </CardContent>
                    </Card>

                    <Card className="hover:border-primary/20 transition-colors shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-700">
                                <Briefcase size={16} className="text-primary" /> Target Role
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g. SDE-1, Backend Dev, Analyst"
                                className="w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                            />
                        </CardContent>
                    </Card>
                </div>

                <Card className="shadow-lg border-2 border-slate-100">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-slate-800">
                                <FileText size={18} className="text-primary" /> Paste Job Description
                            </span>
                            <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest bg-slate-50 px-2 py-0.5 rounded">
                                Required
                            </span>
                        </CardTitle>
                        <CardDescription>Include requirements, responsibilities, and key technologies.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <textarea
                            name="jdText"
                            value={formData.jdText}
                            onChange={handleInputChange}
                            required
                            rows={10}
                            placeholder="Paste the full job description here..."
                            className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium resize-none leading-relaxed"
                        />

                        {warning && (
                            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-center gap-2 text-amber-800 text-xs font-semibold animate-in fade-in slide-in-from-top-1">
                                <AlertCircle size={14} className="text-amber-500" />
                                {warning}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isAnalyzing || formData.jdText.trim().length < 200}
                            className={`w-full py-4 rounded-xl font-black text-white text-lg flex items-center justify-center gap-2 transition-all shadow-xl ${isAnalyzing || formData.jdText.trim().length < 200
                                    ? "bg-slate-300 cursor-not-allowed"
                                    : "bg-primary hover:opacity-95 hover:scale-[1.01] active:scale-95 shadow-primary/20"
                                }`}
                        >
                            {isAnalyzing ? (
                                <>Analyzing Architecture...</>
                            ) : (
                                <>AI GENERATE PLAN <Sparkles size={20} /></>
                            )}
                        </button>
                    </CardContent>
                </Card>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-primary font-bold">1</div>
                    <p className="text-xs font-bold text-slate-600">Company Intelligence</p>
                </div>
                <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-primary font-bold">2</div>
                    <p className="text-xs font-bold text-slate-600">Round Wise Checklist</p>
                </div>
                <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-primary font-bold">3</div>
                    <p className="text-xs font-bold text-slate-600">7-Day Action Plan</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
