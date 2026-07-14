import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import {
    ArrowLeft,
    CalendarDays,
    Camera,
    CheckCircle2,
    Clock3,
    Download,
    FileText,
    IndianRupee,
    Mail,
    MapPin,
    Phone,
    UserRound,
} from 'lucide-react';

declare global {
    interface Window {
        Echo: any;
    }
}

type Person = {
    name: string;
    email: string;
    phone: string | null;
};

type Milestone = {
    id: number;
    milestone_name: string;
    expected_date: string | null;
    completed_date: string | null;
    status: string;
    payment_due: string;
    notes: string | null;
};

type DocumentItem = {
    id: number;
    title: string;
    download_url: string;
    uploaded_at: string;
};

type PhotoItem = {
    id: number;
    caption: string | null;
    photo_url: string;
    uploaded_at: string;
};

type MessageItem = {
    id: number;
    sender_name: string | null;
    sender_role: string | null;
    message: string;
    created_at: string;
};

type Project = {
    id: number;
    project_code: string;
    plot_address: string;
    current_phase: string | null;
    overall_progress_percent: number;
    total_value: string;
    amount_paid: string;
    balance_amount: string;
    start_date: string | null;
    expected_completion: string | null;
    customer: Person | null;
    supervisor: Person | null;
    milestones: Milestone[];
    documents: DocumentItem[];
    photos: PhotoItem[];
    messages: MessageItem[];
    updated_at?: string | null;
};

export default function ProjectShow({ project }: { project: Project }) {
    const [liveProject, setLiveProject] = useState<Project>(project);
    const [justUpdated, setJustUpdated] = useState(false);

    useEffect(() => {
        setLiveProject(project);
    }, [project]);

    useEffect(() => {
        if (!window.Echo) {
            console.warn('Echo not loaded');
            return;
        }

        const channelName = `customer-project.${project.id}`;
        const channel = window.Echo.private(channelName);

        channel.listen('.progress.updated', (event: any) => {
            if (event.project) {
                setLiveProject(event.project);
                setJustUpdated(true);
                window.setTimeout(() => setJustUpdated(false), 2400);
            }
        });

        return () => {
            window.Echo.leave(channelName);
        };
    }, [project.id]);

    const progress = clamp(Number(liveProject.overall_progress_percent || 0));

    const completedMilestones = liveProject.milestones.filter((item) =>
        ['completed', 'approved'].includes(item.status),
    ).length;

    return (
        <AppLayout>
            <Head title={liveProject.project_code} />

            <main className="min-h-screen bg-slate-100">
                <div className="mx-auto max-w-7xl px-4 py-6">
                    <Link
                        href="/portal/dashboard"
                        className="group inline-flex items-center gap-2 text-sm font-bold text-[#1F4E79] transition-colors hover:text-[#153A5A]"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                        Back to Dashboard
                    </Link>

                    {/* ── Hero: blueprint-grid header ─────────────────────── */}
                    <section
                        className={`relative mt-5 overflow-hidden rounded-[2rem] bg-[#12385A] shadow-xl transition-shadow duration-500 ${
                            justUpdated ? 'ring-2 ring-[#D4A853]' : ''
                        }`}
                    >
                        <div
                            className="pointer-events-none absolute inset-0 opacity-[0.12]"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                                backgroundSize: '28px 28px',
                            }}
                        />
                        <div className="pointer-events-none absolute -right-14 -top-14 h-64 w-64 animate-float-slow rounded-full bg-[#D4A853]/20 blur-3xl" />

                        {justUpdated && (
                            <span className="absolute right-6 top-6 z-10 flex items-center gap-1.5 rounded-full bg-[#D4A853] px-3 py-1 text-[11px] font-black text-white shadow-lg">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                                LIVE UPDATE
                            </span>
                        )}

                        <div className="relative bg-[radial-gradient(circle_at_top_right,rgba(212,168,83,0.35),transparent_35%)] p-6 text-white md:p-8">
                            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end">
                                <div className="animate-fade-in-up">
                                    <p className="text-xs font-black uppercase tracking-[0.28em] text-[#D4A853]">
                                        Project Details
                                    </p>

                                    <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                                        {liveProject.project_code}
                                    </h1>

                                    <div className="mt-3 flex items-center gap-2 text-[#D4A853]/70">
                                        <span className="h-px w-8 bg-current" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">
                                            Site record
                                        </span>
                                    </div>

                                    <p className="mt-3 flex max-w-3xl gap-2 text-sm leading-6 text-white/75">
                                        <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#D4A853]" />
                                        {liveProject.plot_address}
                                    </p>

                                    <div className="mt-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase text-white ring-1 ring-white/15 transition-colors duration-300 hover:bg-white/15">
                                        {liveProject.current_phase ?? 'Phase not updated'}
                                    </div>

                                    {liveProject.updated_at && (
                                        <p className="mt-3 text-xs text-white/60">
                                            Last live update: {liveProject.updated_at}
                                        </p>
                                    )}
                                </div>

                                <div
                                    className="animate-fade-in-up rounded-3xl bg-white/5 p-4 backdrop-blur"
                                    style={{ animationDelay: '120ms' }}
                                >
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-bold text-white/75">
                                            Overall Progress
                                        </span>
                                        <ProgressNumber value={progress} />
                                    </div>

                                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/20">
                                        <div
                                            className="relative h-full rounded-full bg-white transition-all duration-700 ease-out"
                                            style={{ width: `${progress}%` }}
                                        >
                                            <div
                                                className="absolute inset-0 animate-shimmer bg-[length:200%_100%]"
                                                style={{
                                                    backgroundImage:
                                                        'linear-gradient(90deg, transparent, rgba(31,78,121,0.35), transparent)',
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <p className="mt-3 text-xs text-white/65">
                                        {completedMilestones}/{liveProject.milestones.length} milestones completed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── Metrics ──────────────────────────────────────────── */}
                    <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <MetricCard icon={<IndianRupee />} title="Total Value" value={`₹${liveProject.total_value}`} delay={0} />
                        <MetricCard icon={<CheckCircle2 />} title="Amount Paid" value={`₹${liveProject.amount_paid}`} delay={70} />
                        <MetricCard icon={<Clock3 />} title="Balance" value={`₹${liveProject.balance_amount}`} delay={140} />
                        <MetricCard icon={<CalendarDays />} title="Completion" value={liveProject.expected_completion ?? '-'} delay={210} />
                    </section>

                    {/* ── Contacts + dates ─────────────────────────────────── */}
                    <section className="mt-5 grid gap-5 lg:grid-cols-3">
                        <ContactCard title="Customer Details" person={liveProject.customer} delay={0} />
                        <ContactCard title="Supervisor Details" person={liveProject.supervisor} delay={90} />

                        <div
                            className="animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
                            style={{ animationDelay: '180ms' }}
                        >
                            <h2 className="text-lg font-black text-slate-900">
                                Project Dates
                            </h2>

                            <div className="mt-4 space-y-3">
                                <SmallRow label="Start Date" value={liveProject.start_date ?? '-'} />
                                <SmallRow label="Expected Completion" value={liveProject.expected_completion ?? '-'} />
                                <SmallRow label="Current Phase" value={liveProject.current_phase ?? '-'} />
                            </div>
                        </div>
                    </section>

                    {/* ── Milestones + side panels ─────────────────────────── */}
                    <section className="mt-6 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
                        <Panel title="Milestone Timeline">
                            {liveProject.milestones.length === 0 ? (
                                <EmptyText text="No milestones added yet." />
                            ) : (
                                <div className="relative space-y-4">
                                    {/* Blueprint connector line */}
                                    <div className="pointer-events-none absolute bottom-4 left-[19px] top-4 hidden w-px bg-slate-200 sm:block" />

                                    {liveProject.milestones.map((milestone, index) => (
                                        <div
                                            key={milestone.id}
                                            className="group relative animate-fade-in-up rounded-3xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1F4E79]/30 hover:bg-white hover:shadow-md"
                                            style={{ animationDelay: `${index * 80}ms` }}
                                        >
                                            <div className="flex flex-col justify-between gap-3 md:flex-row">
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1F4E79] text-xs font-black text-white transition-transform duration-300 group-hover:scale-110">
                                                            {['completed', 'approved'].includes(milestone.status) ? (
                                                                <CheckCircle2 className="h-4 w-4" />
                                                            ) : (
                                                                index + 1
                                                            )}
                                                        </span>

                                                        <div>
                                                            <h3 className="font-black text-slate-900">
                                                                {milestone.milestone_name}
                                                            </h3>

                                                            <p className="text-xs text-slate-500">
                                                                Expected: {milestone.expected_date ?? '-'} | Completed: {milestone.completed_date ?? '-'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-left md:text-right">
                                                    <Badge status={milestone.status} />
                                                    <p className="mt-2 text-sm font-black text-slate-900">
                                                        ₹{milestone.payment_due}
                                                    </p>
                                                </div>
                                            </div>

                                            {milestone.notes && (
                                                <p className="mt-3 rounded-2xl bg-white p-3 text-sm text-slate-600">
                                                    {milestone.notes}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Panel>

                        <div className="space-y-5">
                            <Panel title="Documents">
                                {liveProject.documents.length === 0 ? (
                                    <EmptyText text="No documents uploaded." />
                                ) : (
                                    <div className="space-y-3">
                                        {liveProject.documents.map((doc, index) => (
                                            <a
                                                key={doc.id}
                                                href={doc.download_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex animate-fade-in-up items-center justify-between gap-3 rounded-2xl border border-slate-200 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1F4E79]/30 hover:bg-slate-50 hover:shadow-sm"
                                                style={{ animationDelay: `${index * 70}ms` }}
                                            >
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <FileText className="h-5 w-5 shrink-0 text-[#1F4E79] transition-transform duration-300 group-hover:scale-110" />
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-black text-slate-900">
                                                            {doc.title}
                                                        </p>
                                                        <p className="text-xs text-slate-500">
                                                            {doc.uploaded_at}
                                                        </p>
                                                    </div>
                                                </div>

                                                <Download className="h-4 w-4 text-slate-400 transition-transform duration-300 group-hover:translate-y-0.5" />
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </Panel>

                            <Panel title="Recent Messages">
                                {liveProject.messages.length === 0 ? (
                                    <EmptyText text="No messages yet." />
                                ) : (
                                    <div className="space-y-3">
                                        {liveProject.messages.slice(0, 4).map((msg, index) => (
                                            <div
                                                key={msg.id}
                                                className="animate-fade-in-up rounded-2xl bg-slate-50 p-3 transition-colors duration-300 hover:bg-slate-100"
                                                style={{ animationDelay: `${index * 70}ms` }}
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="text-sm font-black text-slate-900">
                                                        {msg.sender_name ?? 'User'}
                                                    </p>
                                                    <p className="text-[11px] text-slate-500">
                                                        {msg.created_at}
                                                    </p>
                                                </div>

                                                <p className="mt-1 text-xs capitalize text-[#1F4E79]">
                                                    {msg.sender_role ?? '-'}
                                                </p>

                                                <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                                                    {msg.message}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Panel>
                        </div>
                    </section>

                    {/* ── Site Photos ──────────────────────────────────────── */}
                    <Panel title="Site Photos" className="mt-6">
                        {liveProject.photos.length === 0 ? (
                            <EmptyText text="No site photos uploaded." />
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {liveProject.photos.map((photo, index) => (
                                    <a
                                        key={photo.id}
                                        href={photo.photo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group animate-fade-in-up overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                        style={{ animationDelay: `${index * 80}ms` }}
                                    >
                                        <div className="relative h-44 overflow-hidden bg-slate-200">
                                            <img
                                                src={photo.photo_url}
                                                alt={photo.caption ?? 'Project photo'}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        </div>

                                        <div className="p-3">
                                            <p className="line-clamp-1 text-sm font-black text-slate-900">
                                                {photo.caption ?? 'Site Photo'}
                                            </p>
                                            <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                                <Camera className="h-3.5 w-3.5" />
                                                {photo.uploaded_at}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </Panel>
                </div>
            </main>
        </AppLayout>
    );
}

/** Animated count-up for the hero progress number. */
function ProgressNumber({ value }: { value: number }) {
    const [display, setDisplay] = useState(0);
    const frameRef = useRef<number>();

    useEffect(() => {
        const start = performance.now();
        const duration = 700;

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(1, elapsed / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) frameRef.current = requestAnimationFrame(tick);
        };

        frameRef.current = requestAnimationFrame(tick);
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [value]);

    return <span className="text-2xl font-black tabular-nums">{display}%</span>;
}

function MetricCard({
    icon,
    title,
    value,
    delay = 0,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
    delay?: number;
}) {
    return (
        <div
            class="group animate-fade-in-up rounded-full border border-slate-200 bg-white p-5 shadow-sm portal-start-card"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D9E2F3] text-[#1F4E79] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {icon}
                </div>

                <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-500">{title}</p>
                    <p className="truncate text-lg font-black text-slate-900">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}

function ContactCard({
    title,
    person,
    delay = 0,
}: {
    title: string;
    person: Person | null;
    delay?: number;
}) {
    return (
        <div
            className="animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
            style={{ animationDelay: `${delay}ms` }}
        >
            <h2 className="text-lg font-black text-slate-900">{title}</h2>

            {person ? (
                <div className="mt-4 space-y-3">
                    <SmallRow icon={<UserRound />} label="Name" value={person.name} />
                    <SmallRow icon={<Mail />} label="Email" value={person.email} />
                    <SmallRow icon={<Phone />} label="Phone" value={person.phone ?? '-'} />
                </div>
            ) : (
                <EmptyText text="Not assigned yet." />
            )}
        </div>
    );
}

function Panel({
    title,
    children,
    className = '',
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section className={`animate-fade-in-up rounded-3xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
            <div className="flex items-center gap-2">
                <span className="h-4 w-1 rounded-full bg-[#D4A853]" />
                <h2 className="text-lg font-black text-[#1F4E79]">{title}</h2>
            </div>
            <div className="mt-4">{children}</div>
        </section>
    );
}

function SmallRow({
    icon,
    label,
    value,
}: {
    icon?: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 transition-colors duration-300 hover:bg-slate-100">
            {icon && <div className="text-[#1F4E79]">{icon}</div>}

            <div className="min-w-0">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="truncate text-sm font-black text-slate-900">
                    {value}
                </p>
            </div>
        </div>
    );
}

function Badge({ status }: { status: string }) {
    const classes: Record<string, string> = {
        pending: 'bg-slate-100 text-slate-700 border-slate-200',
        in_progress: 'bg-amber-50 text-amber-700 border-amber-200',
        completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        approved: 'bg-blue-50 text-blue-700 border-blue-200',
    };

    const dotClasses: Record<string, string> = {
        in_progress: 'bg-amber-500',
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black capitalize ${
                classes[status] ?? classes.pending
            }`}
        >
            {status === 'in_progress' && (
                <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${dotClasses.in_progress}`} />
            )}
            {status.replace('_', ' ')}
        </span>
    );
}

function EmptyText({ text }: { text: string }) {
    return (
        <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
            {text}
        </p>
    );
}

function clamp(value: number): number {
    return Math.min(100, Math.max(0, value));
}
