import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import {
    FileText,
    Video,
    Link as LinkIcon,
    Download,
    Search,
    BookOpen,
    Terminal,
    Code2,
    Database,
    Zap,
    ExternalLink
} from 'lucide-react';

const RESOURCES = [
    {
        category: "Theory & Notes",
        icon: BookOpen,
        items: [
            { title: "Operating Systems - Core Concepts", type: "PDF", size: "2.4 MB", link: "#" },
            { title: "Database Management Systems (DBMS)", type: "PDF", size: "1.8 MB", link: "#" },
            { title: "Computer Networks Fundamentals", type: "PDF", size: "3.2 MB", link: "#" }
        ]
    },
    {
        category: "Coding & DSA",
        icon: Code2,
        items: [
            { title: "Top 100 LeetCode Questions Plan", type: "Link", size: "External", link: "https://leetcode.com/problemset/all/" },
            { title: "C++ Standard Template Library (STL)", type: "PDF", size: "1.1 MB", link: "#" },
            { title: "Python for Competitive Programming", type: "PDF", size: "0.9 MB", link: "#" }
        ]
    },
    {
        category: "System Design",
        icon: Terminal,
        items: [
            { title: "High-Level Design (HLD) Roadmap", type: "Video", size: "15 mins", link: "#" },
            { title: "Scalability & Load Balancing Guide", type: "PDF", size: "4.5 MB", link: "#" },
            { title: "Microservices Masterclass", type: "Video", size: "45 mins", link: "#" }
        ]
    }
];

const Resources = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredResources = RESOURCES.map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.items.length > 0);

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        Resources Library <Zap className="text-primary" size={28} />
                    </h2>
                    <p className="text-slate-500 font-medium italic">Curated preparation materials, notes, and technical deep-dives.</p>
                </div>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm font-medium"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {filteredResources.map((cat, idx) => (
                    <div key={idx} className="space-y-6">
                        <div className="flex items-center gap-3 px-2">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                <cat.icon size={20} />
                            </div>
                            <h3 className="text-lg font-black text-slate-800">{cat.category}</h3>
                        </div>

                        <div className="space-y-4">
                            {cat.items.map((item, iIdx) => (
                                <Card key={iIdx} className="border-none shadow-md hover:shadow-xl hover:translate-x-1 transition-all group cursor-pointer overflow-hidden">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl ${item.type === 'PDF' ? 'bg-red-50 text-red-500' :
                                                    item.type === 'Video' ? 'bg-blue-50 text-blue-500' :
                                                        'bg-emerald-50 text-emerald-500'
                                                }`}>
                                                {item.type === 'PDF' ? <FileText size={20} /> :
                                                    item.type === 'Video' ? <Video size={20} /> :
                                                        <LinkIcon size={20} />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors leading-tight">
                                                    {item.title}
                                                </p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                                    {item.type} • {item.size}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-2 text-slate-300 group-hover:text-primary transition-colors">
                                            {item.type === 'Link' ? <ExternalLink size={18} /> : <Download size={18} />}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {filteredResources.length === 0 && (
                <div className="text-center py-20 animate-in fade-in duration-500">
                    <p className="text-slate-400 font-bold italic">No resources found matching "{searchQuery}"</p>
                </div>
            )}

            <Card className="bg-slate-900 border-none shadow-2xl p-10 mt-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-12">
                    <Database size={200} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="space-y-4 text-center md:text-left flex-1">
                        <h3 className="text-3xl font-black text-white">Need something specific?</h3>
                        <p className="text-slate-400 max-w-lg font-medium leading-relaxed">
                            Our library is constantly updated with the latest interview patterns and notes. If you're looking for a specific topic, check our Discord community.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase text-slate-300">#hiring2026</span>
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase text-slate-300">#roadmap</span>
                        </div>
                    </div>
                    <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-slate-50 active:scale-95 transition-all">
                        JOIN THE COMMUNITY
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default Resources;
