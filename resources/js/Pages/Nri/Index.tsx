import React, { useMemo, useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import ServiceCard from "@/Components/ServiceCard";
import { motion, type Variants } from "framer-motion";
import { PropsWithChildren } from "react";
import {Calculator ,
    ChevronRight,
    ArrowRight,
    Globe,
    Video,
    ShieldCheck,
    CheckCircle2,
    MonitorSmartphone,
    Star,
    Quote,
    Clock,
    CreditCard,
    Building2,
    Camera,
    FileCheck2,
    Users,
    ChevronDown,
    Phone,
    Award,
    TrendingUp,
    LockKeyhole,
} from "lucide-react";

type Service = {
    id: number;
    name: string;
    slug: string;
    short_description?: string | null;
    icon_name?: string | null;
};

type FeaturedProject = {
    id: number;
    title: string;
    slug: string;
    locality?: string | null;
    plot_size_sqft?: number | null;
    built_up_area_sqft?: number | null;
    budget_range?: string | null;
    duration_months?: number | null;
    hero_image_path?: string | null;
};

type Testimonial = {
    id: number;
    customer_name: string;
    content: string;
    rating?: number | null;
    customer_photo?: string | null;
};

type Faq = {
    id: number;
    question: string;
    answer: string;
    category?: string | null;
};

type BrandPartner = {
    id: number;
    name: string;
    logo_path?: string | null;
    website_url?: string | null;
};

type Locality = {
    id: number;
    name: string;
    slug: string;
    base_price_multiplier?: number | null;
};

type Props = {
    services?: Service[];
    featuredProjects?: FeaturedProject[];
    testimonials?: Testimonial[];
    faqs?: Faq[];
    brandPartners?: BrandPartner[];
    localities?: Locality[];
};

type LeadForm = {
    name: string;
    phone: string;
};

/* ────────────────────────────────────────────────────────────────────────
 * Reveal-on-scroll wrapper (framer-motion)
 * ──────────────────────────────────────────────────────────────────────*/
 const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

function Reveal({
    children,
    className = "",
}: PropsWithChildren<{ className?: string }>) {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={`nri-reveal ${className}`}
        >
            {children}
        </motion.div>
    );
}
const iconMap: Record<string, React.ReactNode> = {
    video: <Video />,
    camera: <Camera />,
    shield: <ShieldCheck />,
    payment: <CreditCard />,
    construction: <Building2 />,
    approval: <FileCheck2 />,
    portal: <MonitorSmartphone />,
};

const imageUrl = (
    path?: string | null,
    fallback = "/uploads/images/breadcrumb-banner.jpg",
) => {
    if (!path) return fallback;
    if (path.startsWith("http") || path.startsWith("/")) return path;
    return `/storage/${path}`;
};

export default function Index({
    services = [],
    featuredProjects = [],
    testimonials = [],
    faqs = [],
    brandPartners = [],
    localities = [],
}: Props) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        recentlySuccessful,
        reset,
    } = useForm<LeadForm>({
        name: "",
        phone: "",
    });
    const submitLead = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("nri.leads.store"), {
            preserveScroll: true,
            onSuccess: () => reset("name", "phone"),
        });
    };

    const [activeFaq, setActiveFaq] = useState<number | null>(0);

    const features = [
        "Dedicated NRI Relationship Manager",
        "Timezone-Aware Consultation Booking",
        "Remote Project Monitoring",
        "Weekly Progress Reports",
        "Live Site Photos & Videos",
        "Customer Portal Access",
        "Online Payment Tracking",
        "Government Approval Assistance",
    ];

    const process = [
        {
            title: "Book Video Consultation",
            text: "Connect with our NRI team and share your plot, location, goals and preferred timeline.",
            icon: <Video />,
        },
        {
            title: "Discuss Plot & Budget",
            text: "Get expert guidance on design, approvals, material options, costing and construction scope.",
            icon: <Building2 />,
        },
        {
            title: "Receive Estimate & Timeline",
            text: "Get a clear project roadmap with pricing, milestones, approvals and execution schedule.",
            icon: <FileCheck2 />,
        },
        {
            title: "Track Construction Remotely",
            text: "Monitor progress through portal updates, photos, videos, reports and payment tracking.",
            icon: <MonitorSmartphone />,
        },
    ];
    const dynamicTestimonials = testimonials.map((item) => ({
        id: item.id,
        name: item.customer_name,
        image: imageUrl(item.customer_photo, "/uploads/images/founder.jpg"),
        text: item.content,
        rating: item.rating ?? 5,
    }));

    const dynamicFaqs = faqs;

    const faqSchema = useMemo(
        () => ({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: dynamicFaqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                },
            })),
        }),
        [dynamicFaqs],
    );

    return (
        <AppLayout>
            <Head>
                <title>NRI Home Construction in Lucknow</title>
                <meta
                    name="description"
                    content="Build and manage your home in Lucknow from abroad with GrihNirmaan's timezone-aware NRI construction consultation."
                />
                <meta
                    property="og:title"
                    content="NRI Home Construction in Lucknow"
                />
                <meta
                    property="og:description"
                    content="Timezone-aware NRI home construction consultation for Lucknow properties."
                />
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </Head>

            <div className="nri-page">
                <section id="hero" className="relative overflow-hidden py-20">
                    <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-300/40 blur-3xl" />
                    <div className="absolute -right-40 top-32 h-96 w-96 rounded-full bg-violet-300/40 blur-3xl" />

                    <div className="relative mx-auto grid max-w-7xl items-center gap-12 nri-hero-wrapper lg:grid-cols-[1.05fr_.95fr]">
                        <div className="nri-reveal">
                            <div className="font-semibold uppercase tracking-widest text-blue-600">
                                Premium NRI Home Construction
                            </div>

                            <h1 className="max-w-4xl nri-hero-title font-black leading-tight tracking-tight text-slate-950">
                                Build Your Dream Home In India
                                <span className="nri-gradient-text block">
                                    From Anywhere
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                                Dedicated support for NRIs with video
                                consultations, project tracking, site updates,
                                approvals and complete construction management.
                            </p>

                            <motion.div
                                variants={fadeUp}
                                className="mt-8 flex flex-nowrap gap-4"
                            >
                                <Link
                                    href="#lead-form"
                                    className="inline-flex items-center gap-2 rounded-xl bg-white hero-btn font-body text-sm font-semibold hover:text-brand-blue shadow-lg transition hover:-translate-y-0.5 hover:bg-white text-charcoal sm:text-base"
                                >
                                    <Phone className="h-5 w-5" />
                                    Get Free Quote
                                </Link>

                                <Link
                                    href="/cost-calculator"
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10  hero-btn font-body text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-brand-blue sm:text-base"
                                >
                                    <Calculator className="h-5 w-5" />
                                    Calculate Cost
                                </Link>
                            </motion.div>
                        </div>

                        <div className="relative">
                            <div className="nri-glass nri-float rounded-[2rem] p-5">
                                <div className="overflow-hidden rounded-[1.6rem]">
                                    <img
                                        src="/uploads/images/hero-img.jpg"
                                        alt="NRI home construction"
                                        loading="lazy"
                                        className="h-[480px] w-full object-cover transition duration-700 hover:scale-105"
                                    />
                                </div>

                                <div className="mt-5 grid grid-cols-2 gap-4">
                                    <div className="rounded-2xl bg-blue-50 p-4">
                                        <Clock className="text-blue-600" />
                                        <p className="mt-2 text-sm font-bold text-slate-800">
                                            Weekly Reports
                                        </p>
                                    </div>
                                    <div className="rounded-2xl bg-violet-50 p-4">
                                        <LockKeyhole className="text-violet-600" />
                                        <p className="mt-2 text-sm font-bold text-slate-800">
                                            Secure Portal
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="nri-glass nri-float absolute -bottom-8 -right-6 hidden rounded-3xl p-5 md:block">
                                <CheckCircle2 className="text-green-500" />
                                <p className="mt-2 font-black text-slate-900">
                                    Approval Support
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {brandPartners.length > 0 && (
                    <section className="brand-partner-section bg-white">
                        <div className="mx-auto max-w-7xl px-4 pt-0 sm:px-6 lg:px-8">
                            <div className="brand-logos mt-0 flex flex-wrap items-center justify-center gap-8 lg:flex-nowrap">
                                {brandPartners.slice(0, 6).map((bp) => (
                                    <a
                                        key={bp.id}
                                        href={bp.website_url || "#"}
                                        target={
                                            bp.website_url
                                                ? "_blank"
                                                : undefined
                                        }
                                        rel={
                                            bp.website_url
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="flex w-40 items-center justify-center"
                                    >
                                        {bp.logo_path ? (
                                            <img
                                                src={imageUrl(bp.logo_path)}
                                                alt={bp.name}
                                                className="max-h-14 w-auto max-w-full object-contain opacity-70 transition duration-300 hover:opacity-100"
                                            />
                                        ) : (
                                            <span className="text-sm font-bold text-slate-600">
                                                {bp.name}
                                            </span>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section id="about" className="py-20">
                    <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2">
                        <div className=" p-8 md:p-10">
                            <p className="font-semibold uppercase tracking-widest text-blue-600">
                                About NRI Services
                            </p>
                            <h2 className="mt-3 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
                                Construction management designed for global
                                Indians.
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-slate-600">
                                From consultation to handover, our team helps
                                NRIs manage every stage of home construction
                                with clarity, accountability and trust.
                            </p>

                            <div className="mt-4">
                                {features.slice(0, 4).map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 font-semibold text-slate-700"
                                    >
                                        <CheckCircle2 className="text-green-500" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            {[
                                [
                                    Users,
                                    "Dedicated Manager",
                                    "Single-point coordination for your project.",
                                ],
                                [
                                    Camera,
                                    "Photo & Video Proof",
                                    "Regular visual progress updates.",
                                ],
                                [
                                    CreditCard,
                                    "Payment Visibility",
                                    "Milestone-based cost tracking.",
                                ],
                                [
                                    FileCheck2,
                                    "Approval Help",
                                    "Guidance for required documentation.",
                                ],
                            ].map(([Icon, title, text]: any) => (
                                <div key={title} className="nri-card p-7">
                                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#1f4e79] text-white">
                                        <Icon />
                                    </div>
                                    <h3 className="mt-6 text-xl font-black text-slate-950">
                                        {title}
                                    </h3>
                                    <p className="mt-2 leading-7 text-slate-600">
                                        {text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="services" className="py-20">
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="font-semibold uppercase tracking-widest text-blue-600">
                                Services
                            </p>

                            <h2 className="mt-3 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
                                Everything You Need To Build From Anywhere
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600">
                                Our complete home construction services for NRI
                                homeowners.
                            </p>
                        </div>

                        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {services.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                />
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 rounded-xl bg-[#1f4e79] px-6 py-3 font-semibold text-white transition hover:bg-[#173b5d]"
                            >
                                View All Services
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                <section
                    id="benefits"
                    className="bg-slate-950 py-20 text-white"
                >
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="grid gap-6 lg:grid-cols-3">
                            <div className="rounded-[2rem] bg-[#2e75b6] p-8 lg:row-span-2">
                                <Award className="h-12 w-12" />
                                <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                                    Why NRIs Choose Us
                                </h2>
                                <p className="mt-4 text-white/80">
                                    A modern, transparent and professionally
                                    managed construction experience.
                                </p>
                            </div>

                            {features.map((feature, index) => (
                                <div
                                    key={feature}
                                    className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:bg-white/10"
                                >
                                    <CheckCircle2 className="text-green-400" />
                                    <p className="mt-4 font-bold">{feature}</p>
                                    <div className="nri-progress mt-5 rounded-full bg-white/10">
                                        <span
                                            style={
                                                {
                                                    "--w": `${70 + index * 3}%`,
                                                } as React.CSSProperties
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="process" className="py-20">
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="text-center">
                            <p className="font-semibold uppercase tracking-widest text-blue-600">
                                Process
                            </p>
                            <h2 className="mt-3 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
                                How It Works
                            </h2>
                        </div>

                        <div className="mt-14 grid gap-6 lg:grid-cols-4">
                            {process.map((step, index) => (
                                <div
                                    key={step.title}
                                    className="relative nri-card p-7"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#1f4e79] text-white">
                                            {step.icon}
                                        </div>
                                        <span className="text-5xl font-black text-slate-100">
                                            0{index + 1}
                                        </span>
                                    </div>
                                    <h3 className="mt-6 text-xl font-black text-slate-950">
                                        {step.title}
                                    </h3>
                                    <p className="mt-3 leading-7 text-slate-600">
                                        {step.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white py-20">
                    <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2">
                        <div className="rounded-[2rem] border border-red-100 bg-red-50 p-8">
                            <h3 className="text-3xl font-black text-red-900">
                                Traditional Process
                            </h3>
                            {[
                                "Poor communication",
                                "No progress proof",
                                "Unclear payments",
                                "Approval confusion",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="mt-5 rounded-2xl bg-white p-4 font-semibold text-red-700"
                                >
                                    ✕ {item}
                                </div>
                            ))}
                        </div>

                        <div className="rounded-[2rem] border border-green-100 bg-green-50 p-8">
                            <h3 className="text-3xl font-black text-green-900">
                                Our Solution
                            </h3>
                            {[
                                "Dedicated relationship manager",
                                "Weekly photo/video updates",
                                "Transparent payment tracking",
                                "Approval assistance",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="mt-5 rounded-2xl bg-white p-4 font-semibold text-green-700"
                                >
                                    ✓ {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {featuredProjects.length > 0 && (
                    <section className="py-20">
                        <div className="mx-auto max-w-7xl px-4">
                            <div className="text-center">
                                <p className="font-semibold uppercase tracking-widest text-blue-600">
                                    Featured Projects
                                </p>
                                <h2 className="mt-3 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
                                    Premium Homes Managed With Transparency
                                </h2>
                            </div>

                            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {featuredProjects.map((project) => (
                                    <Link
                                        key={project.id}
                                        href={`/projects/${project.slug}`}
                                        className="nri-card overflow-hidden"
                                    >
                                        <img
                                            src={imageUrl(
                                                project.hero_image_path,
                                            )}
                                            alt={project.title}
                                            loading="lazy"
                                            className="h-64 w-full object-cover transition duration-700 hover:scale-105"
                                        />

                                        <div className="p-6">
                                            <h3 className="text-xl font-black text-slate-950">
                                                {project.title}
                                            </h3>
                                            <p className="mt-2 text-sm font-semibold text-[#c4623a]">
                                                {project.locality || "Lucknow"}
                                            </p>

                                            <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-600">
                                                <span>
                                                    {project.built_up_area_sqft ||
                                                        project.plot_size_sqft ||
                                                        "-"}{" "}
                                                    sq.ft
                                                </span>
                                                <span>
                                                    {project.budget_range ||
                                                        "On Request"}
                                                </span>
                                                <span>
                                                    {project.duration_months ||
                                                        "-"}{" "}
                                                    Months
                                                </span>
                                                <span>View Details</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="overflow-hidden py-20">
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="text-center">
                            <p className="font-semibold uppercase tracking-widest text-blue-600">
                                Testimonials
                            </p>
                            <h2 className="mt-3 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
                                Trusted by NRI homeowners
                            </h2>
                        </div>

                        <div className="mt-12 overflow-hidden">
                            <div className="nri-marquee gap-6">
                                {[
                                    ...dynamicTestimonials,
                                    ...dynamicTestimonials,
                                ].map((item, index) => (
                                    <div
                                        key={`${item.name}-${index}`}
                                        className="nri-card w-[340px] shrink-0 p-7"
                                    >
                                        <Quote className="text-[#c4623a]" />
                                        <div className="mt-4 flex gap-1 text-yellow-400">
                                            {Array.from({
                                                length: item.rating,
                                            }).map((_, star) => (
                                                <Star
                                                    key={star}
                                                    size={18}
                                                    fill="currentColor"
                                                />
                                            ))}
                                        </div>
                                        <p className="mt-5 leading-7 text-slate-600">
                                            “{item.text}”
                                        </p>
                                        <div className="mt-6 flex items-center gap-4">
                                            <img
                                                src={imageUrl(
                                                    item.image,
                                                    "/uploads/images/founder.jpg",
                                                )}
                                                alt={item.name}
                                                className="h-12 w-12 rounded-full object-cover"
                                                loading="lazy"
                                            />
                                            <div>
                                                <h4 className="font-black text-slate-950">
                                                    {item.name}
                                                </h4>
                                                <p className="text-sm text-slate-500">
                                                    {item.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className=" nri-counter-section py-20 text-white">
                    <div className="mx-auto grid max-w-7xl gap-6 px-4   nri-counter-wrapper">
                        {[
                            [
                                `${featuredProjects.length || 100}+`,
                                "Projects Managed",
                            ],
                            [`${localities.length || 15}+`, "Areas Served"],
                            ["500+", "Consultations"],
                            ["98%", "Client Trust"],
                        ].map(([value, label]) => (
                            <div
                                key={label}
                                className="rounded-[2rem] nri-counter-card p-8 text-center backdrop-blur-xl"
                            >
                                <TrendingUp className="mx-auto" />
                                <h3 className="mt-4 text-4xl font-black">
                                    {value}
                                </h3>
                                <p className="mt-2 text-white/80">{label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="faq" className="py-20">
                    <div className="mx-auto max-w-4xl px-4">
                        <div className="text-center">
                            <p className="font-semibold uppercase tracking-widest text-blue-600">
                                FAQ
                            </p>
                            <h2 className="mt-3 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
                                Frequently Asked Questions
                            </h2>
                        </div>

                        <div className="mt-10 space-y-4">
                            {dynamicFaqs.length > 0 ? (
                                dynamicFaqs.map((faq, index) => (
                                    <div
                                        key={faq.id}
                                        className="nri-card overflow-hidden"
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveFaq(
                                                    activeFaq === index
                                                        ? null
                                                        : index,
                                                )
                                            }
                                            className="flex w-full items-center justify-between gap-4 p-6 text-left font-black text-slate-950"
                                        >
                                            {faq.question}

                                            <ChevronDown
                                                className={`transition ${
                                                    activeFaq === index
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            />
                                        </button>

                                        <div
                                            className={`nri-faq-body ${
                                                activeFaq === index
                                                    ? "open"
                                                    : ""
                                            }`}
                                        >
                                            <p className="px-6 pb-6 leading-8 text-slate-600">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                                    FAQs will be available soon.
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section id="lead-form" className="bg-white pb-16 lead-section">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="contact-style-wrap relative overflow-hidden rounded-[34px]">
                            <img
                                src="/uploads/images/hero-img.jpg"
                                alt="Home construction"
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/55" />

                            <div className="relative z-10 grid min-h-[560px] items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:p-14">
                                <Reveal>
                                    <div className="max-w-xl text-white">
                                        <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase backdrop-blur">
                                            <span className="h-2 w-2 rounded-full bg-white" />
                                            Let’s build, together
                                        </p>

                                        <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                                            Ready to start your dream home?
                                        </h2>

                                        <p className="mt-5 max-w-lg font-body text-base leading-8 text-white/80 sm:text-lg">
                                            Share your country, timezone and
                                            preferred callback time. Our NRI
                                            consultation team will contact you
                                            accordingly.
                                        </p>

                                        <div className="mt-8">
                                            <h3 className="text-2xl font-bold text-white">
                                                Contact
                                            </h3>

                                            <a
                                                href="tel:+919999911111"
                                                className="mt-3 inline-flex items-center gap-3 text-2xl font-semibold text-white hover:text-gold-sage"
                                            >
                                                <Phone className="h-6 w-6 text-gold-sage" />
                                                +91 99999 11111
                                            </a>
                                             <div className="mt-8">
                                            <Link
                                                href="/book-consultation"
                                                className="inline-flex items-center rounded-2xl bg-[#C4623A] px-6 py-3 font-bold text-white hover:bg-[#b75531]"
                                            >
                                                Book Free Consultation
                                            </Link>

                                            <p className="mt-3 text-sm text-white/70">
                                                Schedule a free 30-minute
                                                consultation with our
                                                construction experts.
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                                </Reveal>

                                <Reveal>
                                    <form
                                        onSubmit={submitLead}
                                        className="contact-form-card rounded-[34px] bg-white p-6 shadow-2xl sm:p-10 lg:min-w-[560px]"
                                    >
                                        <h3 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
                                            Book NRI Consultation
                                        </h3>

                                        <p className="mt-3 font-body text-base text-muted-gray">
                                            Timezone-aware consultation for your
                                            Lucknow home construction.
                                        </p>

                                        <div className="mt-8 space-y-5">
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                placeholder="Your name"
                                                className="h-16 w-full rounded-2xl border-0 bg-[#eeeeee] px-6 font-body text-sm text-charcoal placeholder:text-muted-gray focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                            />

                                            {errors.name && (
                                                <p className="font-body text-xs text-terracotta">
                                                    {errors.name}
                                                </p>
                                            )}

                                            <input
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData(
                                                        "phone",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                placeholder="Phone number"
                                                className="h-16 w-full rounded-2xl border-0 bg-[#eeeeee] px-6 font-body text-sm text-charcoal placeholder:text-muted-gray focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                            />

                                            {errors.phone && (
                                                <p className="font-body text-xs text-terracotta">
                                                    {errors.phone}
                                                </p>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 font-body text-sm font-bold text-white transition hover:bg-terracotta disabled:opacity-60"
                                            >
                                                {processing
                                                    ? "Sending…"
                                                    : "Talk to a Home Advisor"}
                                                <ChevronRight className="h-4 w-4" />
                                            </button>

                                            {recentlySuccessful && (
                                                <p className="text-center font-body text-sm text-brand-blue">
                                                    ✓ Thanks! We will contact
                                                    you shortly.
                                                </p>
                                            )}
                                        </div>
                                    </form>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </section>

               
            </div>
        </AppLayout>
    );
}


