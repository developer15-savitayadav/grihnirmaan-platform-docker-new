import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
    AlertCircle,
    Building2,
    CalendarDays,
    Camera,
    CheckCircle2,
    ChevronRight,
    Clock3,
    FileText,
    LogOut,
    MapPin,
    MessageCircle,
    TrendingUp,
    UserRound,
} from 'lucide-react';

declare global {
    interface Window {
        Echo: any;
    }
}

type NextMilestone = {
    name: string;
    expected_date: string | null;
    status: string;
    payment_due: string | number | null;
};

type Supervisor = {
    name: string;
    email?: string;
    phone?: string;
};

type Project = {
    id: number;
    project_code: string;
    plot_address: string;
    current_phase: string | null;
    overall_progress_percent: number;
    total_value: string | number;
    amount_paid: string | number;
    balance_amount: string | number;
    start_date: string | null;
    expected_completion: string | null;
    documents_count: number;
    photos_count: number;
    messages_count: number;
    milestones_count: number;
    completed_milestones_count: number;
    next_milestone: NextMilestone | null;
    supervisor?: Supervisor | null;
    updated_at?: string | null;
};

export default function Dashboard({ projects = [] }: { projects?: Project[] }) {
    const [liveProjects, setLiveProjects] = useState<Project[]>(projects);

    useEffect(() => {
        setLiveProjects(projects);
    }, [projects]);

    const totalProjects = liveProjects.length;

    const averageProgress = totalProjects
        ? Math.round(
              liveProjects.reduce(
                  (sum, project) =>
                      sum + Number(project.overall_progress_percent || 0),
                  0,
              ) / totalProjects,
          )
        : 0;

    const totalDocuments = sum(liveProjects, 'documents_count');
    const totalPhotos = sum(liveProjects, 'photos_count');
    const totalMessages = sum(liveProjects, 'messages_count');

    return (
        <AppLayout>
            <Head title="Customer Portal Dashboard" />

            <main className="min-h-screen bg-[#FDFAF5]">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* ── Hero: blueprint-grid panel ───────────────────────────── */}
                    <section className="relative overflow-hidden rounded-[2rem] bg-[#1F4E79] shadow-xl">
                        {/* Blueprint grid signature element */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-[0.14]"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                                backgroundSize: '28px 28px',
                            }}
                        />
                        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 animate-float-slow rounded-full bg-[#D4A853]/20 blur-3xl" />

                        <div className="relative bg-[radial-gradient(circle_at_top_right,rgba(212,168,83,0.35),transparent_36%)] p-6 text-white md:p-8">
                            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                                <div className="animate-fade-in-up">
                                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4A853]">
                                        Customer Portal
                                    </p>

                                    <h1 className="mt-2 text-2xl font-black tracking-tight md:text-4xl">
                                        Project Dashboard
                                    </h1>

                                    {/* Blueprint measurement line — signature detail */}
                                    <div className="mt-3 flex items-center gap-2 text-[#D4A853]/70">
                                        <span className="h-px w-8 bg-current" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">
                                            Live tracking
                                        </span>
                                        <span className="h-px flex-1 max-w-[120px] bg-current" />
                                    </div>

                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
                                        Track construction progress, payments,
                                        milestones, documents, site photos and
                                        communication from one place.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => router.post('/logout')}
                                    className="group inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#1F4E79] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-lg"
                                >
                                    <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                    Logout
                                </button>
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <HeroStat icon={<Building2 />} label="Total Projects" value={totalProjects} delay={0} />
                                <HeroStat icon={<TrendingUp />} label="Average Progress" value={averageProgress} suffix="%" delay={80} />
                                <HeroStat icon={<FileText />} label="Documents" value={totalDocuments} delay={160} />
                                <HeroStat icon={<Camera />} label="Site Photos" value={totalPhotos} delay={240} />
                            </div>
                        </div>
                    </section>

                    <section className="mt-5 grid gap-4 lg:grid-cols-3">
                        <SummaryCard icon={<MessageCircle />} title="Messages" value={totalMessages} text="Total project conversations" delay={0} />
                        <SummaryCard icon={<CheckCircle2 />} title="Active Projects" value={totalProjects} text="Assigned to your account" delay={90} />
                        <SummaryCard icon={<Clock3 />} title="Avg. Completion" value={`${averageProgress}%`} text="Across all active projects" delay={180} />
                    </section>

                    <div className="mt-7 animate-fade-in-up">
                        <h2 className="text-xl font-black text-[#1C1C1C]">
                            Project Overview
                        </h2>
                        <p className="text-sm text-[#6B6560]">
                            Compact project cards with important details.
                        </p>
                    </div>

                    {liveProjects.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {liveProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    onProjectUpdate={(updatedProject) => {
                                        setLiveProjects((oldProjects) =>
                                            oldProjects.map((item) =>
                                                item.id === updatedProject.id
                                                    ? updatedProject
                                                    : item,
                                            ),
                                        );
                                    }}
                                />
                            ))}
                        </section>
                    )}
                </div>
            </main>
        </AppLayout>
    );
}

function ProjectCard({
    project,
    index,
    onProjectUpdate,
}: {
    project: Project;
    index: number;
    onProjectUpdate: (project: Project) => void;
}) {
    const [liveProject, setLiveProject] = useState<Project>(project);
    const [justUpdated, setJustUpdated] = useState(false);

    useEffect(() => {
        setLiveProject(project);
    }, [project]);

    const progress = clamp(Number(liveProject.overall_progress_percent || 0));
    const health = getProjectHealth(progress);

    useEffect(() => {
        if (!window.Echo) {
            console.warn('Laravel Echo is not loaded.');
            return;
        }

        const channelName = `customer-project.${project.id}`;
        const channel = window.Echo.private(channelName);

        channel.listen('.progress.updated', (e: any) => {
            if (!e.project) return;

            setLiveProject(e.project);
            onProjectUpdate(e.project);

            // Flash a live-update indicator for a moment
            setJustUpdated(true);
            window.setTimeout(() => setJustUpdated(false), 2200);
        });

        return () => {
            window.Echo.leave(channelName);
        };
    }, [project.id, onProjectUpdate]);

    return (
        <article
            className={`group relative animate-fade-in-up overflow-hidden rounded-[1.7rem] border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                justUpdated ? 'border-[#D4A853] animate-pulse-ring' : 'border-slate-200'
            }`}
            style={{ animationDelay: `${index * 90}ms` }}
        >
            {justUpdated && (
                <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-[#D4A853] px-2 py-0.5 text-[10px] font-black text-white shadow">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    LIVE
                </span>
            )}

            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#D9E2F3] text-[#1F4E79] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Building2 className="h-4 w-4" />
                    </span>

                    <div className="min-w-0">
                        <h3 className="truncate text-base font-black text-slate-900">
                            {liveProject.project_code}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500">
                            {liveProject.current_phase ?? 'Phase not updated'}
                        </p>
                    </div>
                </div>

                <StatusBadge label={health.label} tone={health.tone} />
            </div>

            <p className="mt-4 flex gap-2 text-xs leading-5 text-slate-500">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C4623A]" />
                <span className="line-clamp-2">{liveProject.plot_address}</span>
            </p>

            <div className="mt-4">
                <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500">Overall Progress</span>
                    <span className="font-black text-[#1F4E79]">{progress}%</span>
                </div>

                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                        className="relative h-full rounded-full bg-[#1F4E79] transition-all duration-700 ease-out"
                        style={{ width: `${progress}%` }}
                    >
                        <div
                            className="absolute inset-0 animate-shimmer bg-[length:200%_100%]"
                            style={{
                                backgroundImage:
                                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
                <MiniMetric title="Total" value={`₹${liveProject.total_value}`} />
                <MiniMetric title="Paid" value={`₹${liveProject.amount_paid}`} />
                <MiniMetric title="Balance" value={`₹${liveProject.balance_amount}`} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
                <DateBox icon={<CalendarDays />} title="Start Date" value={liveProject.start_date ?? '-'} />
                <DateBox icon={<Clock3 />} title="Completion" value={liveProject.expected_completion ?? '-'} />
            </div>

            <div className="mt-4 rounded-2xl border border-[#D4A853]/25 bg-[#FFF8EA] p-3 transition-colors duration-300 group-hover:border-[#D4A853]/50">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-[11px] font-black uppercase tracking-wide text-[#C4623A]">
                            Next Milestone
                        </p>

                        <p className="mt-1 line-clamp-1 text-sm font-black text-slate-900">
                            {liveProject.next_milestone?.name ?? 'No pending milestone'}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Due: {liveProject.next_milestone?.expected_date ?? '-'}
                        </p>
                    </div>

                    {liveProject.next_milestone?.payment_due && (
                        <div className="shrink-0 text-right">
                            <p className="text-[11px] text-slate-500">Payment</p>
                            <p className="text-xs font-black text-slate-900">
                                ₹{liveProject.next_milestone.payment_due}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2">
                <CountBox icon={<FileText />} label="Docs" value={liveProject.documents_count} />
                <CountBox icon={<Camera />} label="Photos" value={liveProject.photos_count} />
                <CountBox icon={<MessageCircle />} label="Msg" value={liveProject.messages_count} />
                <CountBox icon={<CheckCircle2 />} label="Mile" value={`${liveProject.completed_milestones_count}/${liveProject.milestones_count}`} />
            </div>

            {liveProject.supervisor && (
                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1F4E79]">
                        <UserRound className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-black text-slate-900">
                            {liveProject.supervisor.name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                            {liveProject.supervisor.phone ?? liveProject.supervisor.email ?? 'Supervisor'}
                        </p>
                    </div>
                </div>
            )}

            {liveProject.updated_at && (
                <p className="mt-3 text-center text-[11px] font-semibold text-slate-400">
                    Last live update: {liveProject.updated_at}
                </p>
            )}

            <Link
                href={`/portal/projects/${liveProject.id}`}
                className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[#1F4E79] px-4 py-3 text-sm font-black text-white transition-all duration-300 hover:bg-[#153A5A] hover:shadow-lg"
            >
                View Project Details
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
        </article>
    );
}

/** Animated count-up used in the hero blueprint panel. */
function HeroStat({
    icon,
    label,
    value,
    suffix = '',
    delay = 0,
}: {
    icon: React.ReactNode;
    label: string;
    value: number;
    suffix?: string;
    delay?: number;
}) {
    const [display, setDisplay] = useState(0);
    const frameRef = useRef<number>();

    useEffect(() => {
        const start = performance.now() + delay;
        const duration = 900;

        const tick = (now: number) => {
            const elapsed = now - start;
            if (elapsed < 0) {
                frameRef.current = requestAnimationFrame(tick);
                return;
            }
            const progress = Math.min(1, elapsed / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) frameRef.current = requestAnimationFrame(tick);
        };

        frameRef.current = requestAnimationFrame(tick);
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [value, delay]);

    return (
        <div
            className="animate-fade-in-up rounded-full border border-white/10 bg-white/10 p-4 backdrop-blur transition-all duration-300 hover:bg-white/15"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1F4E79]">
                    {icon}
                </div>
                <div>
                    <p className="text-xs text-white/70">{label}</p>
                    <p className="text-2xl font-black text-white tabular-nums">
                        {display}
                        {suffix}
                    </p>
                </div>
            </div>
        </div>
    );
}

function SummaryCard({
    icon,
    title,
    value,
    text,
    delay = 0,
}: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    text: string;
    delay?: number;
}) {
    return (
        <div
            className="group animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-5 shadow-sm portal-start-card"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D9E2F3] text-[#1F4E79] transition-transform duration-300 group-hover:scale-110">
                    {icon}
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-600">{title}</p>
                    <p className="text-2xl font-black text-slate-900">{value}</p>
                    <p className="text-xs text-slate-500">{text}</p>
                </div>
            </div>
        </div>
    );
}

function MiniMetric({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 transition-colors duration-300 hover:bg-slate-100">
            <p className="text-[11px] font-semibold text-slate-500">{title}</p>
            <p className="mt-1 truncate text-xs font-black text-slate-900">{value}</p>
        </div>
    );
}

function DateBox({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
    return (
        <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-3">
            <div className="text-[#1F4E79]">{icon}</div>
            <div className="min-w-0">
                <p className="text-[11px] text-slate-500">{title}</p>
                <p className="truncate text-xs font-black text-slate-900">{value}</p>
            </div>
        </div>
    );
}

function CountBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
    return (
        <div className="rounded-2xl bg-slate-50 p-2 text-center transition-colors duration-300 hover:bg-slate-100">
            <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1F4E79]">
                {icon}
            </div>
            <p className="mt-1 text-[10px] text-slate-500">{label}</p>
            <p className="text-xs font-black text-slate-900">{value}</p>
        </div>
    );
}

function StatusBadge({ label, tone }: { label: string; tone: 'success' | 'warning' | 'danger' }) {
    const classes = {
        success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        warning: 'bg-amber-50 text-amber-700 border-amber-200',
        danger: 'bg-rose-50 text-rose-700 border-rose-200',
    };

    const dotClasses = {
        success: 'bg-emerald-500',
        warning: 'bg-amber-500',
        danger: 'bg-rose-500',
    };

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-black ${classes[tone]}`}>
            {tone === 'warning' ? (
                <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${dotClasses[tone]}`} />
            ) : tone === 'danger' ? (
                <AlertCircle className="h-3 w-3" />
            ) : (
                <CheckCircle2 className="h-3 w-3" />
            )}
            {label}
        </span>
    );
}

function EmptyState() {
    return (
        <div className="mt-6 animate-fade-in-up rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-[#D9E2F3] text-[#1F4E79] animate-float-slow">
                <Building2 className="h-7 w-7" />
            </div>

            <h2 className="mt-4 text-xl font-black text-slate-900">
                No active project found
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
                Your project details will appear here after admin assigns a customer project.
            </p>
        </div>
    );
}

function getProjectHealth(progress: number): {
    label: string;
    tone: 'success' | 'warning' | 'danger';
} {
    if (progress >= 75) return { label: 'On Track', tone: 'success' };
    if (progress >= 35) return { label: 'In Progress', tone: 'warning' };
    return { label: 'Started', tone: 'danger' };
}

function clamp(value: number): number {
    return Math.min(100, Math.max(0, value));
}

function sum(projects: Project[], key: keyof Project): number {
    return projects.reduce((total, project) => {
        const value = project[key];
        return total + (typeof value === 'number' ? value : 0);
    }, 0);
}
