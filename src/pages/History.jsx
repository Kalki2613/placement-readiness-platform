import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription
} from '../components/ui/card';
import { History as HistoryIcon, ArrowRight, AlertCircle } from 'lucide-react';

const History = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [errorCount, setErrorCount] = useState(0);

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('placement_history') || '[]');
            // Validate schema minimally to detect "corrupted" or old-format items
            const validItems = saved.filter(item => {
                const isValid = item && item.id && item.jdText && typeof item.baseScore === 'number';
                return isValid;
            });

            setHistory(validItems);
            setErrorCount(saved.length - validItems.length);
        } catch (e) {
            console.error("Failed to load history:", e);
            setHistory([]);
            setErrorCount(1);
        }
    }, []);

    const handleOpen = (item) => {
        sessionStorage.setItem('current_analysis', JSON.stringify(item));
        navigate('/app/results');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Analysis History</h2>
                    <p className="text-slate-500">View and resume your past job preparation plans.</p>
                </div>
                <HistoryIcon className="text-slate-300" size={32} />
            </div>

            {errorCount > 0 && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-3 text-amber-800 text-sm font-medium">
                    <AlertCircle size={18} className="text-amber-500" />
                    {errorCount === 1
                        ? "One saved entry couldn't be loaded. Create a new analysis."
                        : `${errorCount} saved entries couldn't be loaded. Create new analyses.`}
                </div>
            )}

            {history.length === 0 ? (
                <Card className="flex flex-col items-center justify-center p-12 text-center bg-slate-50/50 border-dashed border-2">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                        <HistoryIcon className="text-slate-300" size={32} />
                    </div>
                    <CardTitle>No analyses yet</CardTitle>
                    <CardDescription className="max-w-[300px] mt-2">
                        Once you analyze a job description on the dashboard, it will appear here for future reference.
                    </CardDescription>
                    <button
                        onClick={() => navigate('/app')}
                        className="mt-6 bg-primary text-white px-6 py-2 rounded-lg font-medium hover:opacity-90"
                    >
                        Go to Dashboard
                    </button>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {history.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleOpen(item)}
                            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-primary/40 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-indigo-50 text-primary rounded-xl flex items-center justify-center font-bold text-xl">
                                    {item.finalScore || item.baseScore}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{item.company || "General Analysis"}</h3>
                                    <p className="text-sm font-medium text-slate-500">{item.role || "Fresher Role"}</p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                        {item.updatedAt && item.updatedAt !== item.createdAt && ` (Updated ${new Date(item.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex flex-wrap gap-2 max-w-[300px] justify-end">
                                    {Object.values(item.extractedSkills).flat().slice(0, 3).map((skill, sIdx) => (
                                        <span key={sIdx} className="px-2 py-1 bg-slate-100 text-[10px] rounded font-semibold text-slate-600 border border-slate-200 group-hover:bg-indigo-50 group-hover:border-indigo-100 group-hover:text-primary transition-colors uppercase tracking-wider">{skill}</span>
                                    ))}
                                </div>
                                <ArrowRight className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" size={20} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
