import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useMemo, useState } from "react";
import PageBanner from "@/Components/Breadcrumb";
import {
    BadgeCheck,
    ChevronDown,
    ChevronRight,
    ClipboardCheck,
    Compass,
    FileCheck,
    Hammer,
    HardHat,
    Home,
    PaintBucket,
    Phone,
    PlayCircle,
    ShieldCheck,
    Sofa,
    Sparkles,
} from "lucide-react";

type ProcessStep = {
    title: string;
    description: string;
    photos?: string[];
    video_url?: string | null;
};

type Service = {
    id: number;
    slug: string;
    name: string;
    short_description: string;
    icon_name: string | null;
    process_steps: ProcessStep[];
};

type Props = {
    services: Service[];
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" },
    },
};

const iconMap: Record<string, React.ElementType> = {
    Phone,
    ClipboardCheck,
    Compass,
    FileCheck,
    Hammer,
    HardHat,
    ShieldCheck,
    PaintBucket,
    Sofa,
    Sparkles,
    BadgeCheck,
    Home,
};

function getYoutubeEmbedUrl(url?: string | null) {
    if (!url) return "";

    if (url.includes("youtube.com/watch?v=")) {
        return url.replace("watch?v=", "embed/");
    }

    if (url.includes("youtu.be/")) {
        return url.replace("youtu.be/", "youtube.com/embed/");
    }

    return url;
}

export default function HowItWorks({ services }: Props) {
    const [openId, setOpenId] = useState<number | null>(
        services?.[0]?.id ?? null,
    );

    const activeService = useMemo(
        () => services.find((service) => service.id === openId) ?? services[0],
        [services, openId],
    );

    return (
        <AppLayout>
            <Head title="How It Works" />
            <PageBanner
                title="How It Works"
                subtitle="The 12-step journey from Bhumi Poojan to Grih Pravesh"
                bannerImage="/uploads/images/bcrumb-banner.jpg"
                items={[{ label: "How It Works" }]}
            />
            <section className="relative overflow-hidden bg-brand-blue-light/40 py-16 sm:py-20 lg:py-24">
                <div className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-terracotta/10 blur-3xl" />
                <div className="absolute -left-24 bottom-20 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 construction-wrapper">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <p className="font-body text-sm font-semibold uppercase tracking-[0.25em] text-terracotta">
                            Construction Journey
                        </p>

                        <h2 className="mt-3 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
                            Your Dream Home, Built Step by Step
                        </h2>

                        <p className="mt-5 font-body text-base leading-8 text-muted-gray">
                            From planning and approvals to construction,
                            interiors, and final handover, we manage every stage
                            with complete transparency and expert execution.
                        </p>
                    </motion.div>

                    {/* Desktop Timeline */}
                    <div className="mt-14 hidden lg:block services-timeline-desktop">
                        <div className="relative grid grid-cols-12 items-start gap-5 px-4 pt-2 services-timeline-wrapper">
                            <div className="absolute left-10 right-10 top-10 h-px bg-brand-blue/20 services-timeline-line" />

                            {services.map((service, index) => {
                                const Icon =
                                    iconMap[service.icon_name ?? "Home"] ??
                                    Home;
                                const active = activeService?.id === service.id;

                                return (
                                    <button
                                        key={service.id}
                                        type="button"
                                        onClick={() => setOpenId(service.id)}
                                        className="relative z-10 flex flex-col items-center text-center timeline-step-btn"
                                    >
                                        <div
                                            className={[
                                                "relative z-10 flex min-h-[3.5rem] items-center justify-center overflow-hidden border transition-all duration-300 timeline-step-icon",
                                                active
                                                    ? "w-[8.5rem] rounded-full bg-brand-blue px-[10px] text-cream shadow-xl timeline-step-active"
                                                    : "h-[3.5rem] w-[3.5rem] rounded-full border-brand-blue/10 bg-cream text-brand-blue  timeline-step-default",
                                            ].join(" ")}
                                        >
                                            <Icon className="h-5 w-5 shrink-0 timeline-icon" />

                                            {active && (
                                                <span className="ml-2 w-[78px] text-left font-body text-[10px] font-semibold leading-tight timeline-service-name">
                                                    {service.name}
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-3 timeline-step-label">
                                            <p
                                                className={[
                                                    "font-body text-[10px] font-bold uppercase tracking-wider timeline-step-text",
                                                    active
                                                        ? "text-terracotta timeline-step-text-active"
                                                        : "text-black    timeline-step-text-default",
                                                ].join(" ")}
                                            >
                                                Step{" "}
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0",
                                                )}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <AnimatePresence mode="wait">
                            {activeService && (
                                <motion.div
                                    key={activeService.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -24 }}
                                    transition={{ duration: 0.35 }}
                                    className="mt-10 timeline-content-wrapper"
                                >
                                    <StepContent service={activeService} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Timeline */}
                    <div className="mt-12 space-y-5 lg:hidden services-timeline-mobile">
                        {services.map((service, index) => {
                            const Icon =
                                iconMap[service.icon_name ?? "Home"] ?? Home;
                            const active = openId === service.id;

                            return (
                                <motion.div
                                    key={service.id}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    className="relative pl-8 mobile-timeline-item"
                                >
                                    {index !== services.length - 1 && (
                                        <div className="absolute bottom-0 left-5 top-14 w-px bg-brand-blue/20 mobile-timeline-line" />
                                    )}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenId(
                                                active ? null : service.id,
                                            )
                                        }
                                        className="w-full text-left mobile-timeline-btn"
                                    >
                                        <div className="flex items-center gap-4 rounded-full bg-cream p-4 shadow-sm mobile-timeline-card">
                                            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-blue text-cream mobile-timeline-icon-wrap">
                                                <Icon className="h-5 w-5 mobile-timeline-icon" />
                                            </div>

                                            <div className="flex-1 mobile-timeline-content">
                                                <p className="font-body text-xs font-bold uppercase tracking-wider text-terracotta mobile-step-number">
                                                    Step{" "}
                                                    {String(index + 1).padStart(
                                                        2,
                                                        "0",
                                                    )}
                                                </p>

                                                <h3 className="text-lg font-semibold text-charcoal mobile-step-title">
                                                    {service.name}
                                                </h3>
                                            </div>

                                            <ChevronDown
                                                className={[
                                                    "h-5 w-5 text-brand-blue transition-transform mobile-chevron",
                                                    active
                                                        ? "rotate-full mobile-chevron-active"
                                                        : "",
                                                ].join(" ")}
                                            />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {active && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden mobile-content-wrapper"
                                            >
                                                <div className="mt-4 mobile-step-content">
                                                    <StepContent
                                                        service={service}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="mt-12 text-center"
                    >
                        <Link
                            href="/quote"
                            className="inline-flex items-center gap-2 rounded-md brown-btn px-7 py-3 font-body text-sm font-semibold text-cream shadow-lg transition-all hover:-translate-y-0.5 "
                        >
                            Talk to a Home Advisor
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </AppLayout>
    );
}

function StepContent({ service }: { service: Service }) {
    const firstMediaStep = service.process_steps.find(
        (step) => (step.photos && step.photos.length > 0) || step.video_url,
    );

    const firstPhoto = firstMediaStep?.photos?.[0];

    return (
        <div className="overflow-hidden rounded-[2rem] bg-cream shadow-xl ring-1 ring-brand-blue/10">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="p-6 sm:p-8 lg:p-10">
                    <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-terracotta">
                        Construction Journey
                    </p>

                    <h3 className="mt-3  text-3xl font-bold text-black sm:text-4xl">
                        {service.name}
                    </h3>

                    <p className="mt-5 font-body text-base leading-8 text-muted-gray">
                        {service.short_description}
                    </p>

                    <div className="mt-8 space-y-4">
                        {service.process_steps.length > 0 ? (
                            service.process_steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="group rounded-2xl border border-brand-blue/10 bg-white/70 p-5 transition-all hover:-translate-y-0.5 hover:border-terracotta/30 hover:shadow-md"
                                >
                                    <div className="flex gap-4">
                                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black text-sm font-bold text-cream">
                                            {index + 1}
                                        </div>

                                        <div>
                                            <h4 className=" text-lg font-semibold text-charcoal">
                                                {step.title}
                                            </h4>

                                            <p className="mt-2 font-body text-sm leading-7 text-muted-gray">
                                                {step.description}
                                            </p>

                                            {step.video_url && (
                                                <a
                                                    href={step.video_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-terracotta"
                                                >
                                                    <PlayCircle className="h-4 w-4" />
                                                    Watch Video
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="font-body text-sm text-muted-gray">
                                Process steps will be added from admin panel.
                            </p>
                        )}
                    </div>
                </div>

                <div className="relative min-h-[360px] bg-brand-blue">
                    {firstPhoto ? (
                        <img
                            src={firstPhoto}
                            alt={service.name}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    ) : firstMediaStep?.video_url ? (
                        <iframe
                            src={getYoutubeEmbedUrl(firstMediaStep.video_url)}
                            title={service.name}
                            className="absolute inset-0 h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <div className="flex h-full min-h-[360px] items-center justify-center bg-brand-blue-light/70 p-8 text-center font-body text-sm text-muted-gray">
                            Photos and videos will be added from admin panel.
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/70 via-brand-blue/10 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-cream/95 p-5 shadow-lg backdrop-blur">
                        <p className="font-body text-xs font-bold uppercase tracking-widest text-terracotta">
                            Visual Progress
                        </p>
                        <p className="mt-1  text-xl font-semibold text-brand-blue right-image-content">
                            Photos & videos for this stage
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
