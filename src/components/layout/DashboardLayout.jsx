import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    FileText,
    Library,
    UserCircle,
    History as HistoryIcon,
    ShieldCheck,
    FileCheck,
    Rocket,
    Circle,
    CheckCircle2
} from 'lucide-react';
import { clsx } from 'clsx';

const SidebarLink = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) => clsx(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
            isActive
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-slate-600 hover:bg-slate-100"
        )}
    >
        <Icon size={20} />
        <span className="font-medium text-sm">{label}</span>
    </NavLink>
);

const DashboardLayout = () => {
    const [status, setStatus] = React.useState('In Progress');

    React.useEffect(() => {
        const checkStatus = () => {
            const tests = JSON.parse(localStorage.getItem('prp_test_checklist') || '{}');
            const testCount = Object.values(tests).filter(Boolean).length;

            const links = JSON.parse(localStorage.getItem('prp_final_submission') || '{}');
            const validateUrl = (url) => {
                if (!url) return false;
                try {
                    const pattern = new RegExp('^(https?:\\/\\/)?' +
                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
                        '((\\d{1,3}\\.){3}\\d{1,3}))' +
                        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
                        '(\\?[;&a-z\\d%_.~+=-]*)?' +
                        '(\\#[-a-z\\d_]*)?$', 'i');
                    return !!pattern.test(url);
                } catch (_) {
                    return false;
                }
            };
            const hasLinks = validateUrl(links.lovable) && validateUrl(links.github) && validateUrl(links.deployment);

            if (testCount === 10 && hasLinks) {
                setStatus('Shipped');
            } else {
                setStatus('In Progress');
            }
        };

        checkStatus();
        window.addEventListener('storage', checkStatus);
        return () => window.removeEventListener('storage', checkStatus);
    }, []);

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
                <div className="p-6 border-b border-slate-50">
                    <h2 className="text-xl font-black text-primary tracking-tighter italic">Placement Prep.</h2>
                </div>
                <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">Main Menu</p>
                    <SidebarLink to="/app" icon={LayoutDashboard} label="Dashboard" />
                    <SidebarLink to="/app/practice" icon={BookOpen} label="Practice" />
                    <SidebarLink to="/app/assessments" icon={FileText} label="Assessments" />
                    <SidebarLink to="/app/resources" icon={Library} label="Resources" />
                    <SidebarLink to="/app/history" icon={HistoryIcon} label="History" />
                    <SidebarLink to="/app/results" icon={CheckCircle2} label="Results" />

                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mt-6 mb-2">Quality Gate</p>
                    <SidebarLink to="/prp/07-test" icon={ShieldCheck} label="Test Checklist" />
                    <SidebarLink to="/prp/proof" icon={FileCheck} label="Proof & Submission" />
                    <SidebarLink to="/prp/08-ship" icon={Rocket} label="Ship System" />

                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mt-6 mb-2">Account</p>
                    <SidebarLink to="/app/profile" icon={UserCircle} label="Profile" />
                </nav>
                <div className="p-4 border-t border-slate-200">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                            <UserCircle className="text-slate-400" size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Kalki</p>
                            <p className="text-xs text-slate-500">MCA Student</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-bottom border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-semibold text-slate-800">Workspace</h1>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all duration-500 ${status === 'Shipped'
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                            : "bg-slate-100 text-slate-400 border border-slate-200"
                            }`}>
                            {status === 'Shipped' ? <ShieldCheck size={12} /> : <Circle size={10} className="animate-pulse" />}
                            {status}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Header actions could go here */}
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
