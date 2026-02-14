import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { UserCircle } from 'lucide-react';

const Profile = () => (
    <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-primary shadow-inner">
                <UserCircle size={64} />
            </div>
            <div>
                <h2 className="text-3xl font-black text-slate-900">Kalki</h2>
                <p className="text-slate-500 font-medium tracking-tight">MCA Student • Specializing in Software Engineering</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm uppercase tracking-widest text-slate-400">Total Analyses</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-black text-slate-900">24</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm uppercase tracking-widest text-slate-400">Avg. Readiness</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-black text-primary">76%</p>
                </CardContent>
            </Card>
        </div>
    </div>
);

export default Profile;
