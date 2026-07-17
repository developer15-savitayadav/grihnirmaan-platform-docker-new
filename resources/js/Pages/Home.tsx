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
import { useTranslation } from "react-i18next";
import { resolveImagePath } from "@/lib/resolveImagePath";
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
    { Icon: AlertTriangle, key: "fraud" },
    { Icon: Scale, key: "pricing" },
    { Icon: ClipboardCheck, key: "approval" },
    { Icon: SquaresUnite, key: "vendor" },
    { Icon: ShieldCheck, key: "warranty" },
];

const STEPS = [
    { Icon: Phone, key: "vision" },
    { Icon: DraftingCompass, key: "design" },
    { Icon: HardHat, key: "construction" },
    { Icon: KeySquare, key: "movein" },
];

const DIFFERENTIATORS = [
    { Icon: Landmark, key: "govt" },
    { Icon: Lock, key: "escrow" },
    { Icon: Handshake, key: "brands" },
    { Icon: MapPin, key: "local" },
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
    const { t } = useTranslation();
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
                            transition={{
                                duration: 1.8,
                                ease: "easeOut" as const,
                            }}
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
                                {t("hero_badge")}
                            </motion.div>

                            <motion.h1
                                variants={fadeUp}
                                className=" font-bold leading-[1.1] tracking-tight text-white"
                            >
                                {t("hero_title")}
                            </motion.h1>

                            <motion.p
                                variants={fadeUp}
                                className="mt-6 max-w-lg font-body text-base text-white/85 "
                            >
                                {t("hero_subtitle")}
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
                                    {t("cta_get_quote")}
                                </Link>

                                <Link
                                    href="/cost-calculator"
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10  hero-btn font-body text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-brand-blue sm:text-base"
                                >
                                    <Calculator className="h-5 w-5" />
                                    {t("cta_calculate_cost")}
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
                                            .map((testimonial) => (
                                                <img
                                                    key={testimonial.id}
                                                    src={
                                                        testimonial.customer_photo ??
                                                        undefined
                                                    }
                                                    alt={
                                                        testimonial.customer_name
                                                    }
                                                    className="h-12 w-12 rounded-full border-2 border-white object-cover"
                                                />
                                            ))}
                                    </div>

                                    <div>
                                        <h4 className="text-3xl font-bold leading-none text-[#2D2D2D]">
                                            99+
                                        </h4>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {t("happy_customers")}
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
                                        key: "stat_homes_built",
                                    },
                                    {
                                        value: 15,
                                        suffix: "+",
                                        key: "stat_years_experience",
                                    },
                                    {
                                        value: 4.9,
                                        suffix: "★",
                                        key: "stat_client_rating",
                                    },
                                ].map((item) => (
                                    <div key={item.key} className="text-center">
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
                                            {t(item.key)}
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
                                    src={resolveImagePath(bp.logo_path)}
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
                            {t("problems_eyebrow")}
                        </p>

                        <h2 className="mt-3 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
                            {t("problems_title")}
                        </h2>

                        <p className="mt-5 font-body text-base leading-7 text-muted-gray">
                            {t("problems_subtitle")}
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
                            {PROBLEMS.map(({ Icon, key }, i) => (
                                <Reveal key={key}>
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
                                                    {t(`problem_${key}_title`)}
                                                </h3>

                                                <span className="text-4xl font-bold text-brand-blue/10 outline-number">
                                                    0{i + 1}
                                                </span>
                                            </div>

                                            <p className=" font-body text-[15px]  text-muted-gray">
                                                {t(`problem_${key}_text`)}
                                            </p>

                                            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-terracotta">
                                                {t("learn_more")}
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
                            {t("services_eyebrow")}
                        </p>

                        <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                            {t("services_title")}
                        </h2>

                        <p className="mt-4 font-body text-base text-white/70">
                            {t("services_subtitle")}
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
                                                {t("explore_service")}
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
                            {t("how_it_works_eyebrow")}
                        </p>

                        <h2 className="mt-2 font-display text-3xl font-bold text-dark sm:text-4xl">
                            {t("how_it_works_title")}
                        </h2>

                        <p className="mt-4 font-body text-base text-muted-gray">
                            {t("how_it_works_subtitle")}
                        </p>
                    </Reveal>

                    <div className="mt-16 grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {STEPS.map(({ Icon, key }, i) => (
                            <Reveal key={key} className="h-full">
                                <div className="step-card group">
                                    <div className="step-badge-wrap">
                                        <span className="step-badge">
                                            {t("step_label")}{" "}
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
                                            alt={t(`step_${key}_title`)}
                                        />
                                    </div>

                                    <div className="mt-8 flex flex-1 flex-col">
                                        <h3 className="step-title">
                                            {t(`step_${key}_title`)}
                                        </h3>

                                        <p className="step-text">
                                            {t(`step_${key}_text`)}
                                        </p>
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
                            {t("view_full_journey")}
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
                            {t("featured_projects_eyebrow")}
                        </p>

                        <h2 className="mt-2 font-display text-3xl font-bold text-dark sm:text-4xl">
                            {t("featured_projects_title")}
                        </h2>

                        <p className="mt-4 font-body text-base text-muted-gray">
                            {t("featured_projects_subtitle")}
                        </p>
                    </Reveal>

                    {featuredProjects.length === 0 ? (
                        <div className="mt-12 rounded-3xl border border-brand-blue/10 bg-cream p-12 text-center">
                            <h3 className="text-2xl font-bold text-charcoal">
                                {t("no_results_title")}
                            </h3>

                            <p className="mt-3 text-muted-gray">
                                {t("no_results_text")}
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
                                                        {t("label_before")}
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
                                                        {t("label_after")}
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
                                                            t(
                                                                "default_locality",
                                                            )}
                                                    </p>
                                                </div>

                                                <div className="mt-6 space-y-3">
                                                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-gray">
                                                            {t(
                                                                "label_locality",
                                                            )}
                                                        </span>

                                                        <span className="font-body text-sm font-medium text-charcoal">
                                                            {project.location ??
                                                                t(
                                                                    "default_locality",
                                                                )}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-gray">
                                                            {t("label_bhk")}
                                                        </span>

                                                        <span className="font-body text-sm font-medium text-charcoal">
                                                            {project.bhk ??
                                                                t(
                                                                    "default_bhk",
                                                                )}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-gray">
                                                            {t("label_budget")}
                                                        </span>

                                                        <span className="font-body text-sm font-medium text-charcoal">
                                                            {project.budget_range ??
                                                                t(
                                                                    "default_budget",
                                                                )}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-gray">
                                                            {t(
                                                                "label_duration",
                                                            )}
                                                        </span>

                                                        <span className="font-body text-sm font-medium text-charcoal">
                                                            {project.duration_months
                                                                ? `${project.duration_months} Months`
                                                                : t(
                                                                      "default_duration",
                                                                  )}
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
                            {t("view_all_projects")}
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
                                    {t("calc_eyebrow")}
                                </p>

                                <h3 className="mt-2 font-display text-3xl font-bold text-charcoal">
                                    {t("calc_enter_details")}
                                </h3>

                                <div className="mt-10 grid gap-8">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {/* Plot Area */}
                                        <div>
                                            <label className="mb-2 block font-body text-sm font-medium text-charcoal">
                                                {t("calc_plot_area")}
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
                                                    placeholder={t(
                                                        "calc_placeholder_area",
                                                    )}
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
                                                        {t("calc_sqft")}
                                                    </option>
                                                    <option value="sqyard">
                                                        {t("calc_sqyard")}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Locality */}
                                        <div>
                                            <label className="mb-2  block font-body text-sm font-medium text-charcoal">
                                                {t("calc_locality")}
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
                                                    {t("calc_select_locality")}
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
                                            {t("calc_floors")}
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
                                            {t("calc_floors_hint")}
                                        </p>
                                    </div>

                                    {/* Finish Level */}
                                    <div>
                                        <label className="mb-3 block font-body text-sm font-medium text-charcoal">
                                            {t("calc_finish_level")}
                                        </label>

                                        <div className="grid gap-3 sm:grid-cols-3">
                                            {[
                                                {
                                                    value: "budget",
                                                    labelKey:
                                                        "finish_budget_label",
                                                    descKey:
                                                        "finish_budget_desc",
                                                },
                                                {
                                                    value: "standard",
                                                    labelKey:
                                                        "finish_standard_label",
                                                    descKey:
                                                        "finish_standard_desc",
                                                },
                                                {
                                                    value: "premium",
                                                    labelKey:
                                                        "finish_premium_label",
                                                    descKey:
                                                        "finish_premium_desc",
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
                                                        {t(item.labelKey)}
                                                    </span>
                                                    <span className="mt-1 block text-xs text-muted-gray">
                                                        {t(item.descKey)}
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
                                        {t("calc_calculate_estimate")}
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <ArrowRight className="cost-arrow h-5 w-5 absolute" />
                            {/* Right Form */}
                            <div className="">
                                <p className="font-body text-sm font-semibold uppercase tracking-widest text-brand-blue">
                                    {t("calc_free_badge")}
                                </p>

                                <h2 className="mt-2 font-display text-3xl font-bold text-dark sm:text-4xl">
                                    {t("calc_heading")}
                                </h2>

                                <p className="mt-5 max-w-xl font-body text-base leading-8 text-muted-gray">
                                    {t("calc_subtitle")}
                                </p>

                                <div className="cost-estimate-card mt-8 rounded-[14px] p-8">
                                    <span className="font-body mini-cost-instant font-semibold uppercase tracking-widest text-white/80">
                                        {t("calc_instant_estimate")}
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
                                                    {t("calc_per")}{" "}
                                                    {appliedCalc.areaUnit ===
                                                    "sqyard"
                                                        ? t("calc_sqyard_short")
                                                        : t("calc_sqft_short")}
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
                                                    {t("calc_timeline_label")}
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
                                        {t("calc_get_full_estimate")}
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
                            {t("testimonials_eyebrow")}
                        </p>

                        <h2 className="mt-2 font-display text-3xl font-bold text-dark sm:text-4xl">
                            {t("testimonials_title")}
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
                            {testimonials.map((t) => (
                                <SwiperSlide key={t.id} className="!h-auto">
                                    <Link
                                        href={t.project?.url || "#"}
                                        className="block h-full"
                                    >
                                        <article className="testimonial-card relative h-full cursor-pointer p-8 ">
                                            <div className="relative z-10 grid gap-8 sm:grid-cols-[180px_1fr] sm:items-center">
                                                {/* Image */}
                                                <div className="relative">
                                                    <img
                                                        src={
                                                            t.customer_photo ??
                                                            undefined
                                                        }
                                                        alt={t.customer_name}
                                                        className="h-[210px] w-[150px] rounded-[28px] object-cover"
                                                    />

                                                    <div className="absolute tesi-star flex -translate-x-1/2 gap-1 text-yellow-400">
                                                        {Array.from({
                                                            length:
                                                                Number(
                                                                    t.rating,
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
                                                        “{t.content}”
                                                    </blockquote>

                                                    <div className="my-8 h-px bg-black/10 testi-line" />

                                                    <h3 className=" text-3xl font-bold text-charcoal">
                                                        {t.customer_name}
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
                            {t("testimonials_empty")}
                        </p>
                    )}
                </div>
            </section>

            {/* ─── 9. WHY CHOOSE US ────────────────────────────────── */}
            <section className="bg-white why-section pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24">
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal className="mx-auto max-w-2xl text-center">
                        <p className="font-body text-sm font-semibold uppercase tracking-widest text-terracotta">
                            {t("why_choose_eyebrow")}
                        </p>

                        <h2 className="mt-2 font-display text-3xl font-bold text-dark sm:text-4xl">
                            {t("why_choose_title")}
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
                            {DIFFERENTIATORS.map(({ Icon, key }) => (
                                <Reveal key={key}>
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
                                            {t(`diff_${key}_title`)}
                                        </h3>

                                        <p className="font-body text-sm leading-6 text-muted-gray">
                                            {t(`diff_${key}_text`)}
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
                                        {t("final_cta_badge")}
                                    </p>

                                    <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                                        {t("final_cta_title")}
                                    </h2>

                                    <p className="mt-5 max-w-lg font-body text-base leading-8 text-white/80 sm:text-lg">
                                        {t("final_cta_subtitle")}
                                    </p>

                                    <div className="mt-8">
                                        <h3 className=" text-2xl font-bold text-white">
                                            {t("contact_label")}
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
                                                 {t("book_free_consultation")}
                                            </Link>

                                            <p className="mt-3 text-sm text-white/70">
                                                {t("consultation_hint")}
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
                                        {t("contact_form_title")}
                                    </h3>

                                    <p className="mt-3 font-body text-base text-muted-gray">
                                       {t("contact_form_subtitle")}
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
                                          placeholder={t("placeholder_your_name")}
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
                                           placeholder={t("placeholder_phone_number")}
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
                                                ? t("sending")
                                                : t("cta_talk_advisor")}
                                            <ChevronRight className="h-4 w-4" />
                                        </button>

                                        {recentlySuccessful && (
                                            <p className="text-center font-body text-sm text-brand-blue">
                                                {t("lead_form_success")}
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
