import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import {
    Code2,
    Cpu,
    MessageSquare,
    CheckCircle2,
    Circle,
    Sparkles,
    Zap,
    BrainCircuit,
    Terminal,
    Users
} from 'lucide-react';

const PRACTICE_TRACKS = [
    {
        id: 'dsa',
        name: "Data Structures & Algorithms",
        icon: Code2,
        color: "text-blue-500",
        bg: "bg-blue-50",
        topics: [
            "Arrays & Hashing",
            "Two Pointers",
            "Sliding Window",
            "Stacks & Queues",
            "Binary Search",
            "Linked Lists",
            "Trees & Graphs",
            "Dynamic Programming"
        ]
    },
    {
        id: 'sys',
        name: "System Design",
        icon: Cpu,
        color: "text-purple-500",
        bg: "bg-purple-50",
        topics: [
            "Load Balancing",
            "Caching Strategies",
            "Database Sharding",
            "Microservices Architecture",
            "Rate Limiting",
            "Message Queues",
            "CAP Theorem",
            "CDN & DNS"
        ]
    },
    {
        id: 'soft',
        name: "Professional Skills",
        icon: Users,
        color: "text-emerald-500",
        bg: "bg-emerald-50",
        topics: [
            "Behavioral Interviewing",
            "Conflict Resolution",
            "Leadership Principles",
            "Project Management",
            "System Monitoring",
            "Code Review Best Practices",
            "Public Speaking",
            "Resume Optimization"
        ]
    }
];

const Practice = () => {
    const [progress, setProgress] = useState({});

    useEffect(() => {
        const savedProgress = JSON.parse(localStorage.getItem('prp_practice_progress') || '{}');
        setProgress(savedProgress);
    }, []);

    const toggleTopic = (trackId, topic) => {
        const key = `${trackId}:${topic}`;
        const newProgress = { ...progress, [key]: !progress[key] };
        setProgress(newProgress);
        localStorage.setItem('prp_practice_progress', JSON.stringify(newProgress));
    };

    const getTrackProgress = (trackId) => {
        const track = PRACTICE_TRACKS.find(t => t.id === trackId);
        if (!track) return 0;
        const completedCount = track.topics.filter(topic => progress[`${trackId}:${topic}`]).length;
        return Math.round((completedCount / track.topics.length) * 100);
    };

    const totalCompleted = Object.values(progress).filter(Boolean).length;
    const totalTopics = PRACTICE_TRACKS.reduce((acc, t) => acc + t.topics.length, 0);
    const overallProgress = Math.round((totalCompleted / totalTopics) * 100);

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            {/* Header section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        Practice Tracks <Sparkles className="text-primary" size={28} />
                    </h2>
                    <p className="text-slate-500 font-medium italic">Master the core competencies required for top-tier placements.</p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Overall Mastery</p>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-black text-slate-900">{overallProgress}%</span>
                            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-1000"
                                    style={{ width: `${overallProgress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tracks Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {PRACTICE_TRACKS.map((track) => (
                    <Card key={track.id} className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                        <div className={`h-2 ${track.id === 'dsa' ? 'bg-blue-500' : track.id === 'sys' ? 'bg-purple-500' : 'bg-emerald-500'}`} />
                        <CardHeader className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${track.bg} ${track.color}`}>
                                    <track.icon size={24} />
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Progress</span>
                                    <span className={`text-lg font-black ${track.color}`}>{getTrackProgress(track.id)}%</span>
                                </div>
                            </div>
                            <CardTitle className="text-xl font-black text-slate-900">{track.name}</CardTitle>
                            <CardDescription className="text-xs font-medium text-slate-500">
                                {track.topics.length} Essential Topics
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-2">
                            {track.topics.map((topic) => {
                                const isCompleted = progress[`${track.id}:${topic}`];
                                return (
                                    <button
                                        key={topic}
                                        onClick={() => toggleTopic(track.id, topic)}
                                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${isCompleted
                                                ? "bg-slate-50 border-slate-100 text-slate-400 grayscale"
                                                : "bg-white border-slate-100 hover:border-primary/30 hover:shadow-sm text-slate-700"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {isCompleted ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-slate-200" />}
                                            <span className="text-sm font-semibold">{topic}</span>
                                        </div>
                                        {!isCompleted && <Zap size={14} className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                    </button>
                                );
                            })}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none rotate-12">
                    <BrainCircuit size={160} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 text-center md:text-left">
                        <h3 className="text-2xl font-black tracking-tight">Daily Streaks & Feedback</h3>
                        <p className="text-slate-400 max-w-md font-medium">
                            Consistency is the key to mastering complex engineering topics. Check off topics as you finish them across your practice sessions.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Topics Completed</span>
                            <span className="text-3xl font-black">{totalCompleted}</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Current Streak</span>
                            <span className="text-3xl font-black">2 Days</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Practice;
