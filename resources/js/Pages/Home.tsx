import ServiceCard from "@/Components/ServiceCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ArrowRight, ArrowUpRight, Clock, ArrowLeft } from "lucide-react";
import CountUp from "react-countup";
import "swiper/css";
import "swiper/css/pagination";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { FormEvent, PropsWithChildren, useMemo, useState } from "react";

import {
    AlertTriangle,
    BadgeCheck,
    Banknote,
    Calculator,
    ChevronRight,
    ClipboardCheck,
    Compass,
    Construction,
    DraftingCompass,
    FileCheck,
    HardHat,
    Home as HomeIcon,
    Hammer,
    Handshake,
    Key,
    KeySquare,
    Landmark,
    Lock,
    MapPin,
    PaintBucket,
    Phone,
    Scale,
    ShieldCheck,
    Sofa,
    Sparkles,
    SquaresUnite,
    Star,
    Wallet,
    Zap,
    Droplets,
    Square,
    Ruler,
    Calendar,
    IndianRupee,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────────────
 * Types
 * ──────────────────────────────────────────────────────────────────────*/
interface LocalityItem {
    id: number;
    name: string;
    slug: string;
    base_price_multiplier: number;
}

interface ServiceItem {
    id: number;
    slug: string;
    name: string;
    short_description: string;
    icon_name: string | null;
    display_order: number;
}

interface ProjectItem {
    id: number;
    title: string;
    slug: string;
    location: string | null;
    image: string;
    area: string;
    type: string;
    bhk?: string | null;
    year: string;
    budget_range?: string | null;
    is_featured?: boolean;
    before_image?: string | null;
    duration_months?: number | null;
}

interface TestimonialItem {
    id: number;
    customer_photo: string | null;
    customer_name: string;
    content: string;
    rating: number;
    project?: {
        id: number;
        title: string;
        slug: string;
        location?: string | null;
        url: string;
        image?: string | null;
    } | null;
}

interface BrandPartnerItem {
    id: number;
    slug: string;
    name: string;
    logo_path: string | null;
    website_url: string | null;
}

interface HomeProps {
    services: ServiceItem[];
    featuredProjects: ProjectItem[];
    testimonials: TestimonialItem[];
    brandPartners: BrandPartnerItem[];
    localities: LocalityItem[];
}

/* ────────────────────────────────────────────────────────────────────────
 * Reveal-on-scroll wrapper (framer-motion)
 * ──────────────────────────────────────────────────────────────────────*/

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};
function Reveal({
    children,
    className,
}: PropsWithChildren<{ className?: string }>) {
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

/* ────────────────────────────────────────────────────────────────────────
 * Lucide icon resolver (matches icon_name from ServiceSeeder)
 * ──────────────────────────────────────────────────────────────────────*/

const SERVICE_ICONS: Record<string, typeof FileCheck> = {
    FileCheck,
    Hammer,
    Compass,
    Sofa,
    Zap,
    Droplets,
    Square,
    PaintBucket,
    Sparkles,
    Home: HomeIcon,
    Banknote,
};

function ServiceIcon({ name }: { name: string | null }) {
    const Icon = (name && SERVICE_ICONS[name]) || Construction;
    return <Icon className="h-6 w-6" />;
}

/* ────────────────────────────────────────────────────────────────────────
 * Section data (static)
 * ──────────────────────────────────────────────────────────────────────*/

const PROBLEMS = [
    {
        Icon: AlertTriangle,
        title: "Contractor Fraud",
        text: "Disappearing builders, half-done sites, lost deposits. Sound familiar?",
    },
    {
        Icon: Scale,
        title: "Opaque Pricing",
        text: "Hidden costs, mid-project surprises, no itemised breakdown.",
    },
    {
        Icon: ClipboardCheck,
        title: "Approval Maze",
        text: "LDA, RERA, Nagar Nigam — endless paperwork & runaround.",
    },
    {
        Icon: SquaresUnite,
        title: "Vendor Chaos",
        text: "Coordinating 12 different agencies — you become the project manager.",
    },
    {
        Icon: ShieldCheck,
        title: "Zero Warranty",
        text: "Cracks, leaks, faulty wiring — and nobody to call once payment is done.",
    },
];

const STEPS = [
    {
        Icon: Phone,
        title: "Tell Us Your Vision",
        text: "Share your plot details, budget, and dream home brief.",
    },
    {
        Icon: DraftingCompass,
        title: "Design & Approvals",
        text: "IIA architects design your home; we handle all approvals.",
    },
    {
        Icon: HardHat,
        title: "Construction",
        text: "Vetted crews build with weekly progress photos.",
    },
    {
        Icon: KeySquare,
        title: "Move In",
        text: "Grih Pravesh, handover, and 10-year structural warranty.",
    },
];

const DIFFERENTIATORS = [
    {
        Icon: Landmark,
        title: "Govt-Approval Experts",
        text: "In-house liaison team with 200+ LDA & Nagar Nigam approvals processed.",
    },
    {
        Icon: Lock,
        title: "Escrow Payment Security",
        text: "Your money is released milestone-by-milestone, not upfront.",
    },
    {
        Icon: Handshake,
        title: "Tier-1 Brand Partners",
        text: "Direct tie-ups with Havells, Jaquar, UltraTech, Asian Paints & more.",
    },
    {
        Icon: MapPin,
        title: "Lucknow Local Depth",
        text: "15+ years in Lucknow, 500+ homes, 18 localities mapped.",
    },
];

/* ────────────────────────────────────────────────────────────────────────
 * Main Page
 * ──────────────────────────────────────────────────────────────────────*/

export default function Home({
    services,
    featuredProjects,
    testimonials,
    brandPartners,
    localities,
}: HomeProps) {
    const { scrollY } = useScroll();

    const heroY = useTransform(scrollY, [0, 600], [0, 120]);
    const heroScale = useTransform(scrollY, [0, 600], [1, 1.12]);
    /* Inline lead form */
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        name: "",
        phone: "",
        source: "home_inline_form",
    });

    const submitLead = (e: FormEvent) => {
        e.preventDefault();

        post(route("leads.store"), {
            preserveScroll: true,
            onSuccess: () => reset("name", "phone"),
        });
    };

    const defaultCalculator = {
        plotArea: "1500",
        areaUnit: "sqft",
        floors: "1",
        finishLevel: "standard",
        locality: localities?.[0]?.slug || "",
    };

    const [miniCalc, setMiniCalc] = useState(defaultCalculator);
    const [appliedCalc, setAppliedCalc] = useState(defaultCalculator);

    const finishRates: Record<string, number> = {
        budget: 1600,
        standard: 2000,
        premium: 2600,
    };

    const estimate = useMemo(() => {
        const rawArea = Number(appliedCalc.plotArea) || 0;
        const areaInSqft =
            appliedCalc.areaUnit === "sqyard" ? rawArea * 9 : rawArea;

        const floors = Number(appliedCalc.floors) || 1;
        const rate = finishRates[appliedCalc.finishLevel] || 2000;

        const selectedLocality = localities.find(
            (locality) => locality.slug === appliedCalc.locality,
        );

        const multiplier = Number(selectedLocality?.base_price_multiplier) || 1;
        const total = areaInSqft * floors * rate * multiplier;

        return {
            low: Math.round(total * 0.95),
            high: Math.round(total * 1.08),
            perSqFt: Math.round(rate * multiplier),
            timeline:
                floors <= 1
                    ? "6-8 months"
                    : floors === 2
                      ? "9-12 months"
                      : "12-15 months",
        };
    }, [appliedCalc, localities]);

    return (
        <AppLayout>
            <Head title="GrihNirmaan — Home Construction in Lucknow, Done Right" />

            {/* ─── 1. HERO ─────────────────────────────────────────── */}
            <section className="hero-section  bg-white  overflow-hidden px-4 pb-10 sm:px-6 lg:px-8">
                <div className=" mx-auto max-w-7xl hero-section-wrapper">
                    <div className="hero-image-wrap relative min-h-[600px] overflow-hidden  ">
                        {/* Full Background Image */}
                        <motion.img
                            src="/uploads/images/hero-img.jpg"
                            alt="Luxury Home Construction"
                            style={{ y: heroY, scale: heroScale }}
                            initial={{ scale: 1.15 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.8, ease: "easeOut" as const }}
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 hero-overlay to-transparent" />

                        {/* Left Heading */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="absolute hero-section-content z-20 max-w-xl"
                        >
                            <motion.div
                                variants={fadeUp}
                                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur"
                            >
                                🏠 Home Construction · Lucknow
                            </motion.div>

                            <motion.h1
                                variants={fadeUp}
                                className=" font-bold leading-[1.1] tracking-tight text-white"
                            >
                                From Bhumi Poojan to Grih Pravesh, your dream
                                home built right.
                            </motion.h1>

                            <motion.p
                                variants={fadeUp}
                                className="mt-6 max-w-lg font-body text-base text-white/85 "
                            >
                                End-to-end home construction with transparent
                                pricing, expert supervision, quality materials,
                                on-time delivery, and a 10-year warranty.
                            </motion.p>

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
                        </motion.div>

                        {/* Bottom Right Info Card */}
                        <div className="hero-budget absolute bottom-8 right-8 z-20">
                            <div className="flex min-w-[300px] items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-3">
                                        {testimonials
                                            .slice(0, 3)
                                            .map((testimonial) =>
                                                testimonial.customer_photo ? (
                                                    <img
                                                        key={testimonial.id}
                                                        src={
                                                            testimonial.customer_photo
                                                        }
                                                        alt={
                                                            testimonial.customer_name
                                                        }
                                                        className="h-12 w-12 rounded-full border-2 border-white object-cover"
                                                    />
                                                ) : (
                                                    <div
                                                        key={testimonial.id}
                                                        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-brand-blue text-sm font-bold text-white"
                                                    >
                                                        {testimonial.customer_name.charAt(
                                                            0,
                                                        )}
                                                    </div>
                                                ),
                                            )}
                                    </div>

                                    <div>
                                        <h4 className="text-3xl font-bold leading-none text-[#2D2D2D]">
                                            99+
                                        </h4>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Happy customers
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    href=""
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7E9D7] transition hover:bg-[#eed7bd]"
                                >
                                    <ArrowUpRight className="h-5 w-5 text-[#2D2D2D]" />
                                </Link>
                            </div>
                        </div>

                        {/* Bottom Left Counter Cutout */}
                        <div className="hero-counter-cutout absolute bottom-0 left-0 z-30">
                            <div className="grid grid-cols-3 gap-6">
                                {[
                                    {
                                        value: 500,
                                        suffix: "+",
                                        label: "Homes Built",
                                    },
                                    {
                                        value: 15,
                                        suffix: "+",
                                        label: "Years Experience",
                                    },
                                    {
                                        value: 4.9,
                                        suffix: "★",
                                        label: "Client Rating",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="text-center"
                                    >
                                        <h3 className="text-3xl font-bold text-brand-blue">
                                            <CountUp
                                                end={item.value}
                                                duration={2.5}
                                                decimals={
                                                    item.value % 1 !== 0 ? 1 : 0
                                                }
                                                enableScrollSpy
                                                scrollSpyOnce
                                            />
                                            {item.suffix}
                                        </h3>

                                        <p className="font-body font-semibold text-muted-gray sm:text-base">
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 2. TRUST STRIP ──────────────────────────────────── */}
            <section className="brand-partner-section  bg-white">
                <div className="mx-auto max-w-7xl px-4 pt-0 sm:px-6 lg:px-8">
                    {/* <p className="font-body text-sm font-semibold uppercase tracking-widest text-terracotta text-center">
                        Trusted brand partners
                    </p> */}

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

            {/* ─── 3. 5 PROBLEMS WE SOLVE ──────────────────────────── */}
            <section className="bg-cream py-16 lg:py-24 problem-section">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Top Heading */}
                    <Reveal className="mx-auto max-w-3xl text-center">
                        <p className="font-body text-sm font-semibold uppercase tracking-widest text-terracotta">
                            The truth about home construction
                        </p>

                        <h2 className="mt-3 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
                            5 problems we solve.
                        </h2>

                        <p className="mt-5 font-body text-base leading-7 text-muted-gray">
                            We built GrihNirmaan after seeing too many families
                            burnt by these exact issues. Here's how we fixed
                            each one.
                        </p>
                    </Reveal>

                    {/* Image + Content */}
                    <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Left Sticky Image */}
                        <div className="relative">
                            <div className="overflow-hidden rounded-[32px] shadow-2xl lg:sticky lg:top-24">
                                <img
                                    src="/uploads/images/why-choose-home.jpg"
                                    alt="GrihNirmaan"
                                    className="h-[350px] w-full object-cover lg:h-[500px]"
                                />
                            </div>
                        </div>

                        {/* Right Cards */}
                        <div className="space-y-6">
                            {PROBLEMS.map(({ Icon, title, text }, i) => (
                                <Reveal key={title}>
                                    <Link
                                        href={`/how-it-works#problem-${i + 1}`}
                                        className="group flex gap-5 rounded-3xl bg-white p-7   transition-all duration-300 hover:-translate-y-2    problem-card"
                                    >
                                        <div className="problem-icon  shrink-0 i ">
                                            <Icon className="h-7 w-7 text-white" />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <h3 className=" text-xl font-bold text-brand-blue">
                                                    {title}
                                                </h3>

                                                <span className="text-4xl font-bold text-brand-blue/10 outline-number">
                                                    0{i + 1}
                                                </span>
                                            </div>

                                            <p className=" font-body text-[15px]  text-muted-gray">
                                                {text}
                                            </p>

                                            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-terracotta">
                                                Learn More
                                                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 4. OUR SERVICES ─────────────────────────────────── */}
            <section className="services-slider-section bg-[#0f0f0f] py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal className="mx-auto max-w-2xl text-center">
                        <p className="font-body text-sm font-semibold uppercase tracking-widest text-terracotta">
                            Everything under one roof
                        </p>

                        <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                            Our services.
                        </h2>

                        <p className="mt-4 font-body text-base text-white/70">
                            12 specialised teams, one accountable partner — from
                            soil testing to housewarming.
                        </p>
                    </Reveal>
                    <div className="relative mt-12">
                        <button className="services-prev absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur hover:bg-white/20">
                            <ChevronRight className="h-5 w-5 rotate-180" />
                        </button>

                        <button className="services-next absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur hover:bg-white/20">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            spaceBetween={24}
                            slidesPerView={1}
                            loop={services.length > 3}
                            pagination={{ clickable: true }}
                            navigation={{
                                prevEl: ".services-prev",
                                nextEl: ".services-next",
                            }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="services-swiper !pb-16"
                        >
                            {services.map((service, index) => (
                                <SwiperSlide
                                    key={service.id}
                                    className="!h-auto"
                                >
                                    <Link
                                        href={`/services/${service.slug}`}
                                        className="service-style-card group"
                                    >
                                        <div className="service-card-glow" />

                                        <div className="relative z-10 flex items-start justify-between">
                                            <div className="service-style-icon">
                                                <ServiceIcon
                                                    name={service.icon_name}
                                                />
                                            </div>

                                            <span className="service-style-number">
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0",
                                                )}
                                            </span>
                                        </div>

                                        <div className="relative z-10 mt-auto">
                                            <h3 className="mt-12  text-2xl font-bold leading-snug text-white">
                                                {service.name}
                                            </h3>

                                            <p className="mt-4 font-body text-sm leading-7 text-white/65">
                                                {service.short_description}
                                            </p>

                                            <div className="mt-8 inline-flex items-center gap-2 font-body text-sm font-semibold text-terracotta">
                                                Explore service
                                                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section> 

            {/* ─── 5. HOW IT WORKS PREVIEW ─────────────────────────── */}
            <section className="how-work-section relative overflow-hidden py-16 sm:py-20 lg:py-24">
                {/* Right Side Shape Only */}
                <div className="how-work-shape bounce-x">
                    <img src="/uploads/images/shape-21.png" alt="" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal className="mx-auto max-w-2xl text-center">
                        <p className="font-body text-sm font-semibold uppercase tracking-widest text-terracotta">
                            Simple, transparent journey
                        </p>

                        <h2 className="mt-2 font-display text-3xl font-bold text-dark sm:text-4xl">
                            How It Works
                        </h2>

                        <p className="mt-4 font-body text-base text-muted-gray">
                            From Bhumi Poojan to Grih Pravesh, our 12-step
                            home-building journey is simplified into 4 clear
                            milestones.
                        </p>
                    </Reveal>

                    <div className="mt-16 grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {STEPS.map(({ title, text }, i) => (
                            <Reveal key={title} className="h-full">
                                <div className="step-card group">
                                    <div className="step-badge-wrap">
                                        <span className="step-badge">
                                            Step{" "}
                                            {String(i + 1).padStart(2, "0")}
                                        </span>

                                        <ArrowRight className="step-arrow h-5 w-5" />
                                    </div>

                                    <div className="how-it-works-image">
                                        <img
                                            src={
                                                [
                                                    "/uploads/images/why-choose-home.jpg",
                                                    "/uploads/images/why-choose-home.jpg",
                                                    "/uploads/images/why-choose-home.jpg",
                                                    "/uploads/images/why-choose-home.jpg",
                                                ][i]
                                            }
                                            alt={title}
                                        />
                                    </div>

                                    <div className="mt-8 flex flex-1 flex-col">
                                        <h3 className="step-title">{title}</h3>

                                        <p className="step-text">{text}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal className="mt-12 text-center">
                        <Link
                            href="/how-it-works"
                            className="inline-flex items-center gap-2 rounded-md border-2 black-btn px-6 py-3 font-body text-sm font-semibold text-cream transition-colors "
                        >
                            See the full 12-step journey
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* ─── 6. FEATURED PROJECTS ────────────────────────────── */}
            <section className="bg-white py-16 sm:py-20 lg:py-24 feature-section">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal className="mx-auto max-w-2xl text-center">
                        <p className="font-body text-sm font-semibold uppercase tracking-widest text-terracotta">
                            Recent builds
                        </p>

                        <h2 className="mt-2 font-display text-3xl font-bold text-dark sm:text-4xl">
                            Featured projects.
                        </h2>

                        <p className="mt-4 font-body text-base text-muted-gray">
                            Explore some of our recent residential construction
                            projects in Lucknow.
                        </p>
                    </Reveal>

                    {featuredProjects.length === 0 ? (
                        <div className="mt-12 rounded-3xl border border-brand-blue/10 bg-cream p-12 text-center">
                            <h3 className="text-2xl font-bold text-charcoal">
                                No featured projects found
                            </h3>

                            <p className="mt-3 text-muted-gray">
                                Please mark projects as featured from admin
                                panel.
                            </p>
                        </div>
                    ) : (
                        <div className="relative mt-20">
                            {featuredProjects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className="sticky mb-16"
                                    style={{
                                        top: "100px",
                                        zIndex: index + 10,
                                    }}
                                >
                                    <div className="group relative project-card-wrap overflow-hidden rounded-[40px] bg-brand-blue shadow-xl">
                                        {project.before_image ? (
                                            <div className="absolute inset-0 grid grid-cols-2">
                                                <div className="relative overflow-hidden">
                                                    <img
                                                        src={
                                                            project.before_image
                                                        }
                                                        alt={`${project.title} before construction`}
                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />

                                                    <span className="absolute left-5 top-5 rounded-full bg-black/70 px-4 py-2 font-body text-xs font-semibold uppercase tracking-widest text-white">
                                                        Before
                                                    </span>
                                                </div>

                                                <div className="relative overflow-hidden">
                                                    <img
                                                        src={
                                                            project.image ??
                                                            project.before_image
                                                        }
                                                        alt={`${project.title} after completion`}
                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />

                                                    <span className="absolute right-5 top-5 rounded-full bg-terracotta px-4 py-2 font-body text-xs font-semibold uppercase tracking-widest text-white">
                                                        After
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <img
                                                src={
                                                    project.image ??
                                                    "/uploads/images/project-placeholder.jpg"
                                                }
                                                alt={project.title}
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        )}

                                        <div className="absolute inset-0 bg-black/10" />

                                        <div className="absolute left-8 top-1/2 z-10 project-mask-wrapper -translate-y-1/2 sm:left-10 lg:left-14">
                                            <div className="project-mask-card relative p-8 sm:p-10">
                                                <div className="pr-20">
                                                    <h3 className=" text-2xl font-bold leading-snug text-charcoal sm:text-2xl">
                                                        {project.title}
                                                    </h3>

                                                    <p className="mt-3 font-body text-sm text-muted-gray">
                                                        {project.location ??
                                                            "Lucknow"}
                                                    </p>
                                                </div>

                                                <div className="mt-6 space-y-3">
                                                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-gray">
                                                            Locality
                                                        </span>

                                                        <span className="font-body text-sm font-medium text-charcoal">
                                                            {project.location ??
                                                                "Lucknow"}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-gray">
                                                            BHK
                                                        </span>

                                                        <span className="font-body text-sm font-medium text-charcoal">
                                                            {project.bhk ??
                                                                "3 BHK"}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-gray">
                                                            Budget
                                                        </span>

                                                        <span className="font-body text-sm font-medium text-charcoal">
                                                            {project.budget_range ??
                                                                "₹45L - ₹60L"}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-gray">
                                                            Duration
                                                        </span>

                                                        <span className="font-body text-sm font-medium text-charcoal">
                                                            {project.duration_months
                                                                ? `${project.duration_months} Months`
                                                                : "12 Months"}
                                                        </span>
                                                    </div>
                                                </div>

                                                <Link
                                                    href={`/projects/${project.slug}`}
                                                    className="project-icon flex items-center justify-center"
                                                    aria-label={`View ${project.title}`}
                                                >
                                                    <ArrowUpRight className="h-9 w-9" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <Reveal className="mt-14 text-center">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 rounded-md border-2 black-btn px-6 py-3 font-body text-sm font-semibold text-cream transition-colors "
                        >
                            View All Projects
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </Reveal>
                </div>
            </section>
            {/* ─── 7. COST CALCULATOR PREVIEW ──────────────────────── */}
            <section className="cost-contact-section relative overflow-hidden py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal>
                        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] relative">
                            {/* Left Content */}
                            <div className="rounded-[10px] bg-white py-[25px] px-[20px] ">
                                <p className="font-body text-sm font-semibold uppercase tracking-widest text-terracotta">
                                    Quick calculator
                                </p>

                                <h3 className="mt-2 font-display text-3xl font-bold text-charcoal">
                                    Enter project details
                                </h3>

                                <div className="mt-10 grid gap-8">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {/* Plot Area */}
                                        <div>
                                            <label className="mb-2 block font-body text-sm font-medium text-charcoal">
                                                Plot Area *
                                            </label>

                                            <div className="flex overflow-hidden rounded-md border border-gray-200 bg-white plot-area-field">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={miniCalc.plotArea}
                                                    onChange={(e) =>
                                                        setMiniCalc({
                                                            ...miniCalc,
                                                            plotArea:
                                                                e.target.value,
                                                        })
                                                    }
                                                    placeholder="Enter area"
                                                    className="h-10 w-full px-4 font-body text-sm outline-none   border-none"
                                                />

                                                <select
                                                    value={miniCalc.areaUnit}
                                                    onChange={(e) =>
                                                        setMiniCalc({
                                                            ...miniCalc,
                                                            areaUnit:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="border-none  focus:border-transparent  px-3 text-sm outline-none"
                                                >
                                                    <option value="sqft">
                                                        Sq ft
                                                    </option>
                                                    <option value="sqyard">
                                                        Sq yard
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Locality */}
                                        <div>
                                            <label className="mb-2  block font-body text-sm font-medium text-charcoal">
                                                Locality *
                                            </label>

                                            <select
                                                value={miniCalc.locality}
                                                onChange={(e) =>
                                                    setMiniCalc({
                                                        ...miniCalc,
                                                        locality:
                                                            e.target.value,
                                                    })
                                                }
                                                className="h-10 w-full border border-gray-200 bg-white px-4 font-body text-sm outline-none transition focus:border-[#1f4e79] focus:outline-none focus:ring-0"
                                            >
                                                <option value="">
                                                    Select Locality
                                                </option>

                                                {localities.map((locality) => (
                                                    <option
                                                        key={locality.id}
                                                        value={locality.slug}
                                                    >
                                                        {locality.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Floors Tabs */}
                                    <div>
                                        <label className="mb-3 block font-body text-sm font-medium text-charcoal">
                                            Floors *
                                        </label>

                                        <div className="grid grid-cols-4 gap-3">
                                            {[1, 2, 3, 4].map((floor) => (
                                                <button
                                                    key={floor}
                                                    type="button"
                                                    onClick={() =>
                                                        setMiniCalc({
                                                            ...miniCalc,
                                                            floors: String(
                                                                floor,
                                                            ),
                                                        })
                                                    }
                                                    className={[
                                                        "mini-cost-floor border font-body text-sm font-semibold transition-all",
                                                        miniCalc.floors ===
                                                        String(floor)
                                                            ? "border-brand-blue bg-brand-blue text-white"
                                                            : "border-gray-200 bg-white text-charcoal hover:border-brand-blue",
                                                    ].join(" ")}
                                                >
                                                    {floor}
                                                </button>
                                            ))}
                                        </div>

                                        <p className="mt-2 text-xs text-muted-gray">
                                            Choose how many floors you want to
                                            build.
                                        </p>
                                    </div>

                                    {/* Finish Level */}
                                    <div>
                                        <label className="mb-3 block font-body text-sm font-medium text-charcoal">
                                            Finish Level *
                                        </label>

                                        <div className="grid gap-3 sm:grid-cols-3">
                                            {[
                                                {
                                                    value: "budget",
                                                    label: "Budget",
                                                    desc: "Basic finish",
                                                },
                                                {
                                                    value: "standard",
                                                    label: "Standard",
                                                    desc: "Recommended",
                                                },
                                                {
                                                    value: "premium",
                                                    label: "Premium",
                                                    desc: "Luxury finish",
                                                },
                                            ].map((item) => (
                                                <button
                                                    key={item.value}
                                                    type="button"
                                                    onClick={() =>
                                                        setMiniCalc({
                                                            ...miniCalc,
                                                            finishLevel:
                                                                item.value,
                                                        })
                                                    }
                                                    className={[
                                                        "rounded-md border p-2 text-center transition-all",
                                                        miniCalc.finishLevel ===
                                                        item.value
                                                            ? "border-terracotta bg-terracotta/10"
                                                            : "border-gray-200 bg-white hover:border-terracotta",
                                                    ].join(" ")}
                                                >
                                                    <span className="block font-body text-sm font-bold text-charcoal">
                                                        {item.label}
                                                    </span>
                                                    <span className="mt-1 block text-xs text-muted-gray">
                                                        {item.desc}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <button
                                        type="button"
                                        onClick={() => setAppliedCalc(miniCalc)}
                                        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-5 py-4 font-body text-sm font-bold text-white transition-all"
                                    >
                                        Calculate Estimate
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <ArrowRight className="cost-arrow h-5 w-5 absolute" />
                            {/* Right Form */}
                            <div className="">
                                <p className="font-body text-sm font-semibold uppercase tracking-widest text-brand-blue">
                                    ✦ Free · 2 minutes
                                </p>

                                <h2 className="mt-2 font-display text-3xl font-bold text-dark sm:text-4xl">
                                    How much will your home cost?
                                </h2>

                                <p className="mt-5 max-w-xl font-body text-base leading-8 text-muted-gray">
                                    Plug in plot size, floors, finish level and
                                    locality. Get an instant estimate.
                                </p>

                                <div className="cost-estimate-card mt-8 rounded-[14px] p-8">
                                    <span className="font-body mini-cost-instant font-semibold uppercase tracking-widest text-white/80">
                                        Instant Estimate
                                    </span>

                                    <p className="mt-3  text-3xl font-bold leading-tight text-white">
                                        ₹{estimate.low.toLocaleString("en-IN")}{" "}
                                        - ₹
                                        {estimate.high.toLocaleString("en-IN")}
                                    </p>

                                    <div className="mt-7 grid grid-cols-2 gap-6">
                                        {/* Per Sq Ft */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex   items-center justify-center rounded-full bg-white/25 backdrop-blur mini-cast-icon-wrap">
                                                <Calculator className="h-7 w-7 text-white" />
                                            </div>

                                            <div>
                                                <p className="font-body text-xs text-white/70">
                                                    Per{" "}
                                                    {appliedCalc.areaUnit ===
                                                    "sqyard"
                                                        ? "sq yard"
                                                        : "sq ft"}
                                                </p>

                                                <p className=" text-xl font-bold text-white">
                                                    ₹
                                                    {(appliedCalc.areaUnit ===
                                                    "sqyard"
                                                        ? estimate.perSqFt * 9
                                                        : estimate.perSqFt
                                                    ).toLocaleString("en-IN")}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Timeline */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex mini-cast-icon-wrap items-center justify-center rounded-full bg-white/25 backdrop-blur">
                                                <Clock className="h-7 w-7 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-body text-xs text-white/70">
                                                    Timeline
                                                </p>

                                                <p className=" text-xl font-bold text-white">
                                                    {estimate.timeline}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/cost-calculator?plot_area=${appliedCalc.plotArea}&area_unit=${appliedCalc.areaUnit}&floors=${appliedCalc.floors}&finish_level=${appliedCalc.finishLevel}&locality=${appliedCalc.locality}`}
                                        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl hover:bg-white bg-[#c4623a] px-5 py-4 font-body text-sm font-bold hover:text-black text-white transition-all hover:-translate-y-0.5"
                                    >
                                        Get full estimate
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ─── 8. TESTIMONIALS ─────────────────────────────────── */}
            <section className="testimonial-section relative overflow-hidden py-16  ">
                {/* Center Globe Shape */}
                <div className="testimonial-globe">
                    <img src="/uploads/images/shape-7.png" alt="" />
                </div>
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal className="mx-auto max-w-2xl text-center">
                        <p className="font-body text-sm font-semibold uppercase tracking-widest text-terracotta">
                            What homeowners say
                        </p>

                        <h2 className="mt-2 font-display text-3xl font-bold text-dark sm:text-4xl">
                            Real stories. Real homes.
                        </h2>
                    </Reveal>

                    {testimonials.length > 0 ? (
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={testimonials.length > 2}
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            breakpoints={{
                                768: {
                                    slidesPerView: 1,
                                },
                                1024: {
                                    slidesPerView: 2,
                                },
                            }}
                            className="testimonial-swiper mt-14 !pb-20"
                        >
                            {testimonials.map((testimonial) => (
                                <SwiperSlide key={testimonial.id} className="!h-auto">
                                    <Link
                                        href={testimonial.project?.url || "#"}
                                        className="block h-full"
                                    >
                                        <article className="testimonial-card relative h-full cursor-pointer p-8 ">
                                            <div className="relative z-10 grid gap-8 sm:grid-cols-[180px_1fr] sm:items-center">
                                                {/* Image */}
                                                <div className="relative">
                                                    {testimonial.customer_photo ? (
                                                        <img
                                                            src={
                                                                testimonial.customer_photo
                                                            }
                                                            alt={
                                                                testimonial.customer_name
                                                            }
                                                            className="h-[210px] w-[150px] rounded-[28px] object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-[210px] w-[150px] items-center justify-center rounded-[28px] bg-brand-blue text-5xl font-bold text-white">
                                                            {testimonial.customer_name.charAt(
                                                                0,
                                                            )}
                                                        </div>
                                                    )}

                                                    <div className="absolute tesi-star flex -translate-x-1/2 gap-1 text-yellow-400">
                                                        {Array.from({
                                                            length:
                                                                Number(
                                                                    testimonial.rating,
                                                                ) || 5,
                                                        }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className="h-5 w-5 fill-current"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div>
                                                    <blockquote className="font-body text-sm leading-7 text-slate-700 lg:text-base">
                                                        “{testimonial.content}”
                                                    </blockquote>

                                                    <div className="my-8 h-px bg-black/10 testi-line" />

                                                    <h3 className=" text-3xl font-bold text-charcoal">
                                                        {testimonial.customer_name}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="testi-quite z-20 flex h-16 w-16 items-center justify-center rounded-full bg-[#1C1C1C]">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="h-8 w-8 text-white"
                                                >
                                                    <path d="M7.17 6A5.001 5.001 0 0 0 3 11v7h7v-7H6.09A3.001 3.001 0 0 1 9 8V6H7.17zm10 0A5.001 5.001 0 0 0 13 11v7h7v-7h-3.91A3.001 3.001 0 0 1 19 8V6h-1.83z" />
                                                </svg>
                                            </div>
                                        </article>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <p className="mt-12 text-center font-body text-muted-gray">
                            Testimonials coming soon.
                        </p>
                    )}
                </div>
            </section>

            {/* ─── 9. WHY CHOOSE US ────────────────────────────────── */}
            <section className="bg-white why-section pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24">
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal className="mx-auto max-w-2xl text-center">
                        <p className="font-body text-sm font-semibold uppercase tracking-widest text-terracotta">
                            Our edge
                        </p>

                        <h2 className="mt-2 font-display text-3xl font-bold text-dark sm:text-4xl">
                            Why choose GrihNirmaan.
                        </h2>
                    </Reveal>

                    <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                        {/* Left Image */}
                        <Reveal>
                            <div className="overflow-hidden rounded-[18px]">
                                <img
                                    src=" uploads/images/why-choose-home.jpg"
                                    alt="Modern luxury home"
                                    className="h-[430px] w-full object-cover"
                                />
                            </div>
                        </Reveal>

                        {/* Right Content */}
                        <div className="divide-y divide-brand-blue/15">
                            {DIFFERENTIATORS.map(({ Icon, title, text }) => (
                                <Reveal key={title}>
                                    <div className="group grid gap-5 py-8 sm:items-center service-content-wrap">
                                        <div className="service-icon-wrap">
                                            <div className="service-icon">
                                                <Icon
                                                    className="h-7 w-7 "
                                                    strokeWidth={1.25}
                                                />
                                            </div>
                                        </div>

                                        <h3 className="font-body text-base font-semibold text-charcoal">
                                            {title}
                                        </h3>

                                        <p className="font-body text-sm leading-6 text-muted-gray">
                                            {text}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* ─── PRESS & RECOGNITION ───────────────────────── */}
            {/* <section className="bg-white pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal className="mx-auto max-w-2xl text-center">
                        <p className="font-body text-sm font-semibold uppercase tracking-widest text-terracotta">
                            Press & Recognition
                        </p>

                        <h2 className="mt-2 font-display text-3xl font-bold text-dark sm:text-4xl">
                            Trusted by homeowners and recognised by the industry.
                        </h2>

                        <p className="mt-4 font-body text-base text-muted-gray">
                            Featured mentions, awards, and recognition that build confidence before you start your home journey.
                        </p>
                    </Reveal>

                    <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                        {[
                            'Lucknow Builder Awards',
                            'Home Design India',
                            'Construction Today',
                            'Real Estate Excellence',
                            'Local Business Recognition',
                        ].map((item) => (
                            <Reveal key={item}>
                                <div className="flex h-28 items-center justify-center rounded-2xl border border-brand-blue/10 bg-white px-5 text-center shadow-sm">
                                    <span className="font-display text-lg font-semibold text-brand-blue/70">
                                        {item}
                                    </span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section> */}
            {/* ─── 10. FINAL CTA + INLINE LEAD FORM ───────────────── */}
            <section id="lead-form" className="bg-white pb-16  lead-section">
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
                                    <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase  backdrop-blur">
                                        <span className="h-2 w-2 rounded-full bg-white" />
                                        Let's build, together
                                    </p>

                                    <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                                        Ready to start your dream home?
                                    </h2>

                                    <p className="mt-5 max-w-lg font-body text-base leading-8 text-white/80 sm:text-lg">
                                        Drop your number — we will call you
                                        within 30 minutes with a no-obligation
                                        cost estimate.
                                    </p>

                                    <div className="mt-8">
                                        <h3 className=" text-2xl font-bold text-white">
                                            Contact
                                        </h3>

                                        <a
                                            href="tel:+919876543210"
                                            className="mt-3 inline-flex items-center gap-3  text-2xl font-semibold text-white hover:text-gold-sage"
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
                                        Get In Touch With Us Today!
                                    </h3>

                                    <p className="mt-3 font-body text-base text-muted-gray">
                                        We are excited to connect with you.
                                    </p>

                                    <div className="mt-8 space-y-5">
                                        <input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
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
                                            id="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
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
                                                ✓ Thanks! We will call you
                                                shortly.
                                            </p>
                                        )}
                                    </div>
                                </form>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}