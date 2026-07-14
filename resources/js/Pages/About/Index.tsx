import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import PageBanner from "@/Components/Breadcrumb";

import {ArrowRight, Mail, Phone, Globe, Share2, AtSign, Award, CheckCircle2, ChevronRight, HeartHandshake, Home, ShieldCheck, Users, Building2, BadgeIndianRupee, Clock, Clock3, Scale, Smile, CalendarClock, HardHat, ClipboardCheck, House} from "lucide-react";

interface BrandPartnerItem {
    id: number;
    slug: string;
    name: string;
    logo_path: string | null;
    website_url: string | null;
}

interface Props {
    brandPartners: BrandPartnerItem[];
}
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99h-2.54V12h2.54V9.8c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
);
const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
    >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
);
const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.34 18.34H5.67V9.99h2.67v8.35ZM7 8.83a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Zm11.34 9.51h-2.67v-4.07c0-.97-.02-2.22-1.36-2.22-1.36 0-1.57 1.06-1.57 2.15v4.14h-2.67V9.99h2.56v1.14h.04c.36-.67 1.22-1.36 2.52-1.36 2.7 0 3.2 1.78 3.2 4.09v4.48Z" />
    </svg>
);
function Reveal({ children, className = "" }) {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

const values = [
    {
        icon: ShieldCheck,
        title: "Transparency",
        text: "Clear pricing, visible progress updates and honest communication at every step.",
    },
    {
        icon: Award,
        title: "Quality",
        text: "Premium materials, skilled teams and strict site quality checks for every project.",
    },
    {
        icon: HeartHandshake,
        title: "Trust",
        text: "We treat every home like our own and build long-term relationships with families.",
    },
];

const whyChoose = [
    "End-to-end construction from planning to handover",
    "Government approval and documentation support",
    "Trusted brand partners for electrical, plumbing and finishing",
    "Dedicated project supervision and milestone tracking",
    "Transparent estimate and timely updates",
    "Local expertise for Lucknow plots and localities",
];

const teamMembers = [
    {
        name: "Amit Sharma",
        role: "Construction Head",
        experience: "15+ Years",
        phone: "+91 99999 11111",
        email: "amit@grihnirmaan.in",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700",
    },
    {
        name: "Priya Verma",
        role: "Architecture Lead",
        experience: "12+ Years",
        phone: "+91 98765 43211",
        email: "priya@grihnirmaan.in",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700",
    },
    {
        name: "Rahul Singh",
        role: "Project Manager",
        experience: "10+ Years",
        phone: "+91 98765 43212",
        email: "rahul@grihnirmaan.in",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700",
    },
    {
        name: "Neha Kapoor",
        role: "Interior Designer",
        experience: "8+ Years",
        phone: "+91 98765 43213",
        email: "neha@grihnirmaan.in",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700",
    },
];

export default function AboutIndex({ brandPartners }: Props) {
    return (
        <AppLayout>
            <Head title="About Us" />
            <PageBanner
                title="About GrihNirmaan"
                subtitle="Building homes with trust, warmth and excellence."
                bannerImage="/uploads/images/bcrumb-banner.jpg"
                items={[{ label: "About" }]}
            />
            <section className="founder-section relative overflow-hidden bg-[#FDFAF5] ">
                <div className="founder-blur founder-blur-left absolute left-0 top-0 h-72 w-72 rounded-full bg-[#D9E2F3]/80 blur-3xl" />
                <div className="founder-blur founder-blur-right absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#C4623A]/10 blur-3xl" />

                <div className="founder-container relative mx-auto max-w-7xl ">
                    <div className="founder-grid grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
                        <Reveal className="founder-image-wrap relative">
                            <div className="founder-shape founder-shape-square absolute -left-6 -top-6 h-40 w-40 rounded-[2rem] bg-[#D4A853]/25" />
                            <div className="founder-shape founder-shape-circle absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-[#1F4E79]/15" />

                            <div className="founder-photo-card relative overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-2xl">
                                <img
                                    src="/uploads/images/founder.jpg"
                                    alt="Founder of GrihNirmaan"
                                    className="founder-photo h-[560px] w-full rounded-[2rem] object-cover"
                                />

                                <div className="founder-photo-overlay absolute inset-3 rounded-[2rem] bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                                <div className="founder-info-card absolute bottom-8 left-8 right-8 rounded-3xl border border-white/20 bg-white/15 p-6 text-white backdrop-blur-md">
                                    <p className="founder-label text-sm font-semibold uppercase tracking-[0.25em] text-[#D4A853]">
                                        Founder
                                    </p>

                                    <h3 className="founder-name mt-2 font-display text-3xl font-bold">
                                        Amit Sharma
                                    </h3>

                                    <p className="founder-role mt-1 text-sm text-white/85">
                                        Founder & Managing Director
                                    </p>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal className="founder-content">
                            <span className="founder-badge font-body text-sm font-semibold uppercase tracking-widest text-terracotta  ">
                                Founder’s Vision
                            </span>

                            <h2 className="founder-title mt-6 font-display text-4xl font-bold leading-tight text-[#1C1C1C] md:text-5xl">
                                Building homes with trust, clarity and complete
                                accountability.
                            </h2>

                            <p className="founder-desc mt-6 text-lg leading-8 text-[#6B6560]">
                                GrihNirmaan was started to solve the biggest
                                problems families face during home construction
                                — unclear pricing, contractor delays, vendor
                                confusion and lack of quality control.
                            </p>

                            <div className="founder-quote-card  rounded-[2rem] border border-[#1F4E79]/10 bg-white p-4 shadow-sm">
                                <p className="founder-quote text-2xl font-semibold  text-[#1C1C1C]">
                                    “A home is not just a project. It is a
                                    family’s biggest dream, and it deserves
                                    honesty at every step.”
                                </p>

                                <div className="founder-author mt-6 flex items-center gap-4 border-t border-[#E5E7EB] pt-5">
                                    <div className="founder-author-avatar flex h-12 w-12 items-center justify-center rounded-full bg-[#1F4E79] text-lg font-bold text-white">
                                        AS
                                    </div>

                                    <div>
                                        <h4 className="founder-author-name font-bold text-[#1C1C1C]">
                                            Amit Sharma
                                        </h4>
                                        <p className="founder-author-role text-sm text-[#6B6560]">
                                            Founder & Managing Director
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="founder-stats mt-4 grid gap-4 sm:grid-cols-3">
                                {[
                                    {
                                        value: 10,
                                        suffix: "+",
                                        label: "Years Experience",
                                    },
                                    {
                                        value: 120,
                                        suffix: "+",
                                        label: "Homes Delivered",
                                    },
                                    {
                                        value: 100,
                                        suffix: "%",
                                        label: "Transparent Process",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="founder-stat-card "
                                    >
                                        <h4 className="founder-stat-number text-3xl font-bold  ">
                                            <CountUp
                                                end={item.value}
                                                duration={2.5}
                                                enableScrollSpy
                                                scrollSpyOnce
                                            />
                                            {item.suffix}
                                        </h4>

                                        <p className="founder-stat-label  text-sm font-medium text-[#6B6560]">
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="founder-actions mt-4 flex flex-wrap gap-4">
                                <Link
                                    href="/projects"
                                    className="founder-primary-btn inline-flex items-center justify-center gap-2 rounded-md bg-[#1F4E79]   font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#163a5b]"
                                >
                                    Start Your Project
                                    <ArrowRight className="h-5 w-5" />
                                </Link>

                                <Link
                                    href="/how-it-works"
                                    className="founder-secondary-btn inline-flex items-center justify-center rounded-md border border-[#1F4E79] bg-white   font-semibold text-[#1F4E79] transition hover:-translate-y-0.5 hover:border-[#C4623A] hover:bg-[#C4623A] hover:text-white"
                                >
                                    See Our Process
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
            <section className="relative overflow-hidden bg-[#FDFAF5] py-20 lg:py-28">
                <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#D9E2F3]/70 blur-3xl" />
                <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#C4623A]/10 blur-3xl" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <Reveal>
                        <span className="  font-body text-sm font-semibold uppercase tracking-widest text-terracotta">
                            About GrihNirmaan
                        </span>

                        <h1 className="mt-3 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
                            Building homes with trust, warmth and excellence.
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6B6560]">
                            GrihNirmaan helps families build their dream homes
                            with complete planning, approvals, civil
                            construction, interiors and finishing support.
                        </p>

                        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#6B6560]">
                            From Bhumi Poojan to Grih Pravesh, we make the
                            construction journey simple, transparent and
                            stress-free.
                        </p>

                        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                            <Link
                                href="/quote"
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1F4E79] founder-secondary-btn font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#163a5b]"
                            >
                                Get Free Quote
                                <ChevronRight className="h-5 w-5" />
                            </Link>

                            <Link
                                href="/about/team"
                                className="inline-flex items-center justify-center rounded-md border border-[#1F4E79] bg-white founder-secondary-btn font-semibold text-[#1F4E79] transition hover:-translate-y-0.5 hover:border-[#C4623A] hover:bg-[#C4623A] hover:text-white"
                            >
                                Our Team
                            </Link>

                            <Link
                                href="/about/partners"
                                className="inline-flex items-center justify-center rounded-md border border-[#1F4E79] bg-white founder-secondary-btn font-semibold text-[#1F4E79] transition hover:-translate-y-0.5 hover:border-[#C4623A] hover:bg-[#C4623A] hover:text-white"
                            >
                                Our Partners
                            </Link>
                        </div>
                    </Reveal>

                    <Reveal className="relative">
                        <div className="relative mx-auto max-w-xl">
                            <div className="absolute -left-5 -top-5 h-28 w-28 rounded-3xl bg-[#D4A853]/30" />
                            <div className="absolute -right-5 -bottom-5 h-36 w-36 rounded-full bg-[#1F4E79]/15" />

                            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
                                    alt="Modern home construction"
                                    className="h-[480px] w-full rounded-[1.5rem] object-cover"
                                />

                                <div className="absolute inset-3 rounded-[1.5rem] bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                                <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/20 bg-white/15 p-5 text-white backdrop-blur-md">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C4623A]">
                                            <Home className="h-6 w-6" />
                                        </div>

                                        <div>
                                            <p className="text-xl font-bold">
                                                Complete Home Solution
                                            </p>
                                            <p className="mt-1 text-sm leading-6 text-white/80">
                                                Design, approval, construction &
                                                handover managed by one trusted
                                                team.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                           
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="brand-partner-section  bg-white">
                <div className="mx-auto max-w-7xl px-4 pt-0 sm:px-6 lg:px-8">
                    <div className="mt-0 flex flex-wrap items-center justify-center gap-8 lg:flex-nowrap brand-logos">
                        {brandPartners.slice(0, 6).map((bp) => (
                            <a
                                key={bp.id}
                                href={bp.website_url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex  w-40 items-center justify-center"
                            >
                                <img
                                    src={
                                        bp.logo_path?.startsWith("http")
                                            ? bp.logo_path
                                            : `/storage/${bp.logo_path}`
                                    }
                                    alt={bp.name}
                                    className="max-h-14 w-auto max-w-full object-contain opacity-70 transition duration-300 hover:opacity-100"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </section>
            <section className="bg-white py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="overflow-hidden about-page-counter bg-gradient-to-r from-[#FDFAF5] to-white ">
                        <div className="grid grid-cols-1 gap-8 px-8 py-10 md:grid-cols-2 lg:grid-cols-4 md:px-12">
                            {[
                                {
                                    value: 120,
                                    suffix: "+",
                                    label: "Homes Delivered",
                                },
                                {
                                    value: 10,
                                    suffix: "+",
                                    label: "Years Experience",
                                },
                                {
                                    value: 25,
                                    suffix: "+",
                                    label: "Trusted Partners",
                                },
                                {
                                    value: 98,
                                    suffix: "%",
                                    label: "Customer Satisfaction",
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="relative text-center"
                                >
                                    <h3 className="font-display text-4xl font-bold text-brand-blue lg:text-5xl">
                                        <CountUp
                                            end={item.value}
                                            duration={2.5}
                                            enableScrollSpy
                                            scrollSpyOnce
                                        />
                                        {item.suffix}
                                    </h3>

                                    <p className="mt-2 font-body text-sm font-semibold uppercase tracking-wide text-muted-gray">
                                        {item.label}
                                    </p>

                                    <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-terracotta" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-cream py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <Reveal className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">
                            Our Story
                        </p>

                        <h2 className="mt-4 font-display text-4xl font-bold text-black">
                            Why we started GrihNirmaan
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-muted-gray">
                            Many homeowners struggle with contractor fraud,
                            unclear pricing, approval confusion, vendor chaos
                            and lack of accountability. GrihNirmaan was created
                            to solve these problems with a professional and
                            transparent construction process.
                        </p>
                    </Reveal>

                    <div className="mt-14 grid gap-8 md:grid-cols-3">
                        {values.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Reveal
                                    key={item.title}
                                    className=" story-card "
                                >
                                    <div className=" story-card-wrapper">
                                        <Icon className=" story-card-icon" />
                                    </div>

                                    <h3 className="">{item.title}</h3>

                                    <p className="">{item.text}</p>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section className="about-inner-team-section relative overflow-hidden bg-[#FDFAF5]py-16 lg:py-20">
                <div className=" about-inner-team-container mx-auto max-w-7xl px-6">
                    <div className=" about-inner-team-header mb-12 flex flex-col gap-6 md:flex-row md:items-center lg:items-end md:justify-between">
                        <div className="max-w-2xl about-inner-team-heading">
                            <p className="about-inner-team-subtitle text-sm font-semibold uppercase tracking-[0.25em] text-[#C4623A]">
                                Our Team
                            </p>

                            <h2 className="about-inner-team-title mt-4 font-display text-4xl font-bold text-black md:text-5xl">
                                People behind every successful home
                            </h2>

                            <p className=" about-inner-team-description mt-5 text-lg leading-8 text-[#6B6560]">
                                Our architects, engineers and site supervisors
                                work together to make your home construction
                                journey transparent and smooth.
                            </p>
                        </div>

                        <Link
                            href="/about/team"
                            className="about-inner-team-btn inline-flex shrink-0 items-center gap-2 rounded-md border border-[#1F4E79] bg-white founder-secondary-btn font-semibold text-[#1F4E79]"
                        >
                            <span className="whitespace-nowrap">
                                View Full Team
                            </span>
                            <ArrowRight className="h-5 w-5 shrink-0" />
                        </Link>
                    </div>

                    <div className="about-inner-team-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {teamMembers.map((member) => (
                            <div
                                key={member.name}
                                className="about-inner-team-card group relative overflow-hidden rounded-[28px_28px_28px_0] bg-white"
                            >
                                {/* Image */}
                                <div className=" about-inner-team-image relative overflow-hidden rounded-[28px]">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="about-inner-team-photo h-[360px] w-full object-cover transition duration-500 group-hover:scale-105"
                                    />

                                    {/* Social Sidebar */}
                                    <div className="about-inner-team-social absolute right-0 top-[45%] flex -translate-y-1/2 translate-x-24 flex-col items-center rounded-full bg-[#c4623a] px-3 py-3 transition-all duration-500 group-hover:translate-x-0">
                                        <a
                                            href="#"
                                            className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1f4e79] text-white transition hover:scale-110"
                                        >
                                            <FacebookIcon className="h-5 w-5" />
                                        </a>

                                        <a
                                            href="#"
                                            className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1f4e79] text-white transition hover:scale-110"
                                        >
                                            <InstagramIcon className="h-5 w-5" />
                                        </a>

                                        <a
                                            href="#"
                                            className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#1f4e79] text-white transition hover:scale-110"
                                        >
                                            <LinkedinIcon className="h-5 w-5" />
                                        </a>

                                        <span
                                            className="about-inner-team-follow-text font-semibold text-white"
                                            style={{
                                                writingMode: "vertical-rl",
                                                textOrientation: "mixed",
                                            }}
                                        >
                                            Follow On
                                        </span>
                                    </div>
                                </div>

                                {/* Info Card */}
                                <div className="about-inner-team-info absolute bottom-0 left-0 w-[74%] rounded-tr-[30px] bg-white px-6 py-4 shadow-lg">
                                    <h3 className="about-inner-team-name text-[24px] font-bold leading-none text-[#17375E]">
                                        {member.name}
                                    </h3>

                                    <p className="about-inner-team-role mt-2 text-lg  leading-none">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="why-choose-section">
                <div className="why-choose-container">
                    <Reveal className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">
                            Why Choose GrihNirmaan
                        </p>

                        <h2 className="mt-4 font-display text-4xl font-bold text-black">
                            Building Trust, Quality & Excellence in Every Home
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-muted-gray">
                            GrihNirmaan combines expert planning, quality
                            craftsmanship, transparent pricing, trusted brand
                            partnerships, and dedicated project management to
                            deliver dream homes on time, within budget, and with
                            complete peace of mind for every homeowner.
                        </p>
                    </Reveal>

                    <div className="why-choose-wrapper">
                        <div className="why-choose-person">
                            <img
                                src="/uploads/images/Rectangle-2.webp"
                                alt="GrihNirmaan Expert"
                                className="why-choose-person-image"
                            />
                        </div>

                        {[
                            {
                                title: "Transparent Costing",
                                text: "Clear estimates, no hidden charges and complete budget visibility.",
                                icon: BadgeIndianRupee,
                                className: "feature-top-left",
                            },
                            {
                                title: "Timely Completion",
                                text: "Planned milestones and regular site progress tracking.",
                                icon: CalendarClock,
                                className: "feature-top-right",
                            },
                            {
                                title: "Professional Team",
                                text: "Architects, engineers and supervisors working together.",
                                icon: HardHat,
                                className: "feature-middle-left",
                            },
                            {
                                title: "Regular Updates",
                                text: "Photos, reports and communication throughout construction.",
                                icon: ClipboardCheck,
                                className: "feature-middle-right",
                            },
                            {
                                title: "Quality & Safety",
                                text: "Trusted materials, quality checks and safe construction practices.",
                                icon: ShieldCheck,
                                className: "feature-bottom-left",
                            },
                            {
                                title: "Customer Satisfaction",
                                text: "Customer-first approach with complete transparency.",
                                icon: House,
                                className: "feature-bottom-right",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className={`why-feature ${item.className}`}
                                >
                                    <div className="why-feature-icon">
                                        <Icon size={28} />
                                    </div>

                                    <div className="why-feature-content">
                                        <h3>{item.title}</h3>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-[#1f4e791c] py-20 text-black">
                <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-3">
                    <Reveal className="lg:col-span-2">
                        <p className="text-sm font-semibold uppercase tracking-widest text-gold-sage">
                            Let’s Build Together
                        </p>

                        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
                            Ready to start your home construction journey?
                        </h2>

                        <p className="mt-5 max-w-2xl text-black">
                            Share your plot details and our home advisor will
                            help you with planning, estimate and next steps.
                        </p>
                    </Reveal>

                    <Reveal className="flex flex-col gap-4">
                        <Link
                            href="/quote"
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-terracotta px-6 py-3 font-semibold border border-terracotta text-white hover:border-black hover:bg-white hover:text-black"
                        >
                            Get Free Quote
                            <ChevronRight className="h-5 w-5" />
                        </Link>

                        <Link
                            href="/cost-calculator"
                          className="inline-flex items-center justify-center gap-2 rounded-md border border-black px-6 py-3 font-semibold text-black transition-all duration-300 hover:border-[#C4623A] hover:bg-[#C4623A] hover:text-white"
                        >
                            Calculate Cost
                        </Link>
                    </Reveal>
                </div>
            </section>
        </AppLayout>
    );
}
