import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import PageBanner from "@/Components/Breadcrumb";
import { motion, useScroll, useTransform } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import { resolveImagePath } from "@/lib/resolveImagePath";

import {
    ArrowRight,
    CheckCircle,
    ClipboardCheck,
    HelpCircle,
    IndianRupee,
    MessageCircle,
    Phone,
    ShieldCheck,
    Sparkles,
    Minus,
    Plus,
} from "lucide-react";

type BrandPartner = {
    id: number;
    name: string;
    slug: string;
    logo_path: string | null;
    website_url: string | null;
};

type RelatedService = {
    id: number;
    slug: string;
    name: string;
    short_description: string;
    icon_name?: string | null;
};

type Service = {
    id?: number;
    slug?: string;
    name?: string;
    short_description?: string;
    long_description?: string;
    icon_name?: string | null;
    features?: unknown;
    process_steps?: unknown;
    faqs?: unknown;
    meta_title?: string;
    meta_description?: string;
};

type Props = {
    service: Service;
    relatedServices: RelatedService[];
    brandPartners: BrandPartner[];
};

function toArray(value: unknown): any[] {
    if (!value) return [];

    if (Array.isArray(value)) return value;

    if (typeof value === "string") {
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    return [];
}

function getText(item: any): string {
    if (typeof item === "string") return item;

    return (
        item?.title ||
        item?.name ||
        item?.label ||
        item?.question ||
        item?.description ||
        ""
    );
}

export default function Show({
    service = {},
    relatedServices = [],
    brandPartners = [],
}: Props) {
    const serviceName = service.name ?? "Construction Service";

    const serviceDescription =
        service.meta_description ??
        service.short_description ??
        `Learn more about ${serviceName} from GrihNirmaan.`;

    const [activeIndex, setActiveIndex] = useState(0);
    const processRef = useRef<HTMLElement | null>(null);
    const [faqSearch, setFaqSearch] = useState("");

    const features = toArray(service.features);
    const processSteps = toArray(service.process_steps);
    const faqs = toArray(service.faqs);

    // Simple fade/slide-in variants for the process step cards, indexed by
    // position so each card animates in slightly staggered.
    const cardAnimations = processSteps.map((_, index) => ({
        opacity: 1,
        transitionDelay: `${index * 100}ms`,
    }));

    // FAQs filtered by the search box above the list. Matches against both
    // the question and answer text, across the various possible field names
    // the FAQ JSON might use (question/q/title, answer/a/description/content).
    const filteredFaqs = faqs.filter((faq) => {
        if (!faqSearch.trim()) return true;

        const question =
            (faq as any)?.question ||
            (faq as any)?.q ||
            (faq as any)?.title ||
            "";
        const answer =
            (faq as any)?.answer ||
            (faq as any)?.a ||
            (faq as any)?.description ||
            (faq as any)?.content ||
            "";

        const haystack = `${question} ${answer}`.toLowerCase();
        return haystack.includes(faqSearch.trim().toLowerCase());
    });

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
        email: "",
        message: "",
        service_interest: serviceName,
        source: "service-page",
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        post(route("leads.store"), {
            preserveScroll: true,
            onSuccess: () => reset("name", "phone", "email", "message"),
        });
    };

    return (
        <AppLayout>
            <Head title={serviceName}>
                <meta name="description" content={serviceDescription} />
            </Head>

            <PageBanner
                title={serviceName}
                subtitle="Explore our comprehensive home construction services."
                bannerImage="/uploads/images/bcrumb-banner.jpg"
                items={[{ label: "Services" }, { label: serviceName }]}
            />

            <section className="relative overflow-hidden bg-gradient-to-br from-[#FDFAF5] via-[#D9E2F3]/40 to-white py-16 lg:py-24">
                <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#D4A853]/20 blur-3xl" />
                <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#1F4E79]/10 blur-3xl" />

                <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
                    <div>
                        <p className="font-body text-sm font-semibold uppercase tracking-widest text-terracotta">
                            {" "}
                            Premium Home Service{" "}
                        </p>

                        <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-[#1C1C1C] md:text-6xl">
                            {service.name}
                        </h1>

                        <p className="mt-6 max-w-2xl font-body text-lg leading-8 text-[#6B6560]">
                            {service.short_description}
                        </p>

                        {service.long_description && (
                            <p className="mt-4 max-w-2xl font-body text-base leading-7 text-[#6B6560]">
                                {service.long_description}
                            </p>
                        )}

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="#enquiry"
                                className="inline-flex items-center gap-2 rounded-xl bg-[#1F4E79] px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#173b5c]"
                            >
                                Enquire Now
                                <ArrowRight className="h-5 w-5" />
                            </a>

                            <a
                                href="tel:+919876543210"
                                className="inline-flex items-center gap-2 rounded-xl border border-[#1F4E79] bg-white px-7 py-4 font-semibold text-[#1F4E79] transition hover:bg-[#c4623a] hover:text-white hover:border-[#c4623a]"
                            >
                                <Phone className="h-5 w-5" />
                                Call Expert
                            </a>
                        </div>
                    </div>

                    <div className="brand-prt-wrapper">
                        <div className="grid gap-5">
                            <div className="flex gap-4 rounded-2xl bg-[#FDFAF5] ">
                                <ShieldCheck className="h-8 w-8 shrink-0 text-[#2E7D32]" />
                                <div>
                                    <h3 className="font-bold text-[#1C1C1C]">
                                        Trusted Quality
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-[#6B6560]">
                                        Verified process, expert team and
                                        professional execution.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 rounded-2xl bg-[#FDFAF5] ">
                                <ClipboardCheck className="h-8 w-8 shrink-0 text-[#1F4E79]" />
                                <div>
                                    <h3 className="font-bold text-[#1C1C1C]">
                                        Transparent Process
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-[#6B6560]">
                                        Clear scope, regular updates and proper
                                        documentation.
                                    </p>
                                </div>
                            </div>

                            {brandPartners.length > 0 && (
                                <div className="rounded-2xl bg-[#1F4E79] p-5">
                                    <h3 className="font-bold text-white">
                                        Brand Partners
                                    </h3>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        {brandPartners.map((partner) => {
                                          const logoUrl = resolveImagePath(partner.logo_path);

                                            return (
                                                <a
                                                    key={partner.id}
                                                    href={
                                                        partner.website_url ||
                                                        "#"
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex h-14 items-center justify-center rounded-full bg-white p-3 transition hover:-translate-y-1"
                                                >
                                                    {logoUrl ? (
                                                        <img
                                                            src={logoUrl}
                                                            alt={partner.name}
                                                            className="max-h-12 max-w-full object-contain brand-prt-img"
                                                        />
                                                    ) : (
                                                        <span className="text-center text-sm font-semibold text-[#1F4E79]">
                                                            {partner.name}
                                                        </span>
                                                    )}
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Left Pricing Counter Style */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="serpage-card-br bg-white  serpage-card-counter text-center">
                                <h2 className="text-4xl font-bold text-[#001B3F]">
                                    ₹1,550+
                                </h2>
                                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#6B6560]">
                                    Per Sq Ft
                                </p>
                            </div>

                            <div className="serpage-card-br bg-white serpage-card-counter text-center">
                                <h2 className="text-4xl font-bold text-[#001B3F]">
                                    100%
                                </h2>
                                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#6B6560]">
                                    Transparent Pricing
                                </p>
                            </div>

                            <div className="serpage-card-br bg-white serpage-card-counter text-center">
                                <h2 className="text-4xl font-bold text-[#001B3F]">
                                    10+
                                </h2>
                                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#6B6560]">
                                    Floors Supported
                                </p>
                            </div>

                            <div className="serpage-card-br bg-white serpage-card-counter text-center">
                                <h2 className="text-4xl font-bold text-[#001B3F]">
                                    24/7
                                </h2>
                                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#6B6560]">
                                    Expert Support
                                </p>
                            </div>
                        </div>

                        {/* Right Included List */}
                        <div className="serpage-card-br bg-white p-8">
                            <h2 className="text-2xl font-bold text-[#1C1C1C]">
                                Premium Services Included
                            </h2>

                            <p className="mt-3 text-base text-[#6B6560]">
                                Final pricing depends on plot size, locality,
                                finish level, material selection and service
                                scope.
                            </p>

                            <div className="mt-6 space-y-4">
                                {features.slice(0, 5).map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#1F4E79]" />

                                        <p className="text-sm font-medium leading-6 text-[#1C1C1C]">
                                            {getText(feature)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/cost-calculator"
                                className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F4E79] px-6 py-4 font-semibold text-white transition hover:bg-[#173b5c]"
                            >
                                Calculate Exact Cost
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {processSteps.length > 0 && (
                <section
                    ref={processRef}
                    className="bg-[#FDFAF5] py-16 lg:py-20"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <p className="font-semibold uppercase tracking-wider text-[#C4623A]">
                                How it works
                            </p>
                            <h2 className="mt-2 text-3xl font-bold text-[#1C1C1C] md:text-4xl">
                                Our Process
                            </h2>
                        </div>

                        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {processSteps.slice(0, 3).map((step, index) => (
                                <motion.div
                                    key={index}
                                    style={cardAnimations[index]}
                                    className="relative overflow-hidden rounded-3xl bg-white p-7 serpage-process-card"
                                >
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center font-bold  ">
                                        {index + 1}
                                    </div>

                                    <h3 className="relative pr-12 font-bold ">
                                        {getText(step)}
                                    </h3>

                                    {typeof step === "object" &&
                                        step !== null &&
                                        "description" in step && (
                                            <p className="mt-3   leading-6  ">
                                                {(step as any).description}
                                            </p>
                                        )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="bg-white py-16 lg:py-20 fq-page-section">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8 fq-page-wrapper">
                    <div className="fq-page-left">
                        <p className="font-semibold uppercase tracking-wider text-[#C4623A]">
                            Questions
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-[#1C1C1C] md:text-4xl">
                            Frequently Asked Questions
                        </h2>
                        <input
                            type="text"
                            value={faqSearch}
                            onChange={(e) => setFaqSearch(e.target.value)}
                            placeholder="Search FAQs..."
                            className="mt-6 w-full rounded-xl border border-[#D9E2F3] bg-white px-4 py-3 outline-none transition focus:border-[#1F4E79]"
                        />
                        <div className="mt-8 space-y-4 fq-page-list">
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.slice(0, 8).map((faq, index) => {
                                    const question =
                                        (faq as any)?.question ||
                                        (faq as any)?.q ||
                                        (faq as any)?.title ||
                                        "Question";

                                    const answer =
                                        (faq as any)?.answer ||
                                        (faq as any)?.a ||
                                        (faq as any)?.description ||
                                        (faq as any)?.content ||
                                        "";

                                    const isOpen = activeIndex === index;

                                    return (
                                        <div
                                            key={index}
                                            className="overflow-hidden      transition-all duration-300 fq-page-item"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setActiveIndex(index)
                                                }
                                                className="flex w-full items-center justify-between  text-left fq-page-question"
                                            >
                                                <h3 className="font-bold text-charcoal fq-page-tittle">
                                                    {question}
                                                </h3>

                                                <span className="flex h-9 w-9 items-center justify-center rounded-full accordian-icon bg-white">
                                                    {isOpen ? (
                                                        <Minus className="h-5 w-5 text-brand-blue" />
                                                    ) : (
                                                        <Plus className="h-5 w-5 text-brand-blue" />
                                                    )}
                                                </span>
                                            </button>

                                            <div
                                                className={`grid transition-all duration-300 ${
                                                    isOpen
                                                        ? "grid-rows-[1fr]"
                                                        : "grid-rows-[0fr]"
                                                }`}
                                            >
                                                <div className="overflow-hidden">
                                                    <p className="px-6 pb-6 leading-7 text-muted-gray">
                                                        {answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="rounded-2xl bg-cream p-6 text-muted-gray">
                                    FAQs for this service will be updated soon.
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        id="enquiry"
                        className="rounded-[2rem] bg-[#1F4E79] p-5 fq-page-right"
                    >
                        <div className="rounded-[1.5rem] bg-white p-6 lg:p-8">
                            <h2 className="text-3xl font-bold text-[#1C1C1C]">
                                Enquire about {serviceName}
                            </h2>

                            <p className="mt-2 text-sm text-[#6B6560]">
                                Share your requirement and our home advisor will
                                contact you.
                            </p>

                            <form onSubmit={submit} className="mt-8 space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1F4E79]"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1F4E79]"
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1F4E79]"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <textarea
                                        placeholder="Tell us about your requirement"
                                        value={data.message}
                                        onChange={(e) =>
                                            setData("message", e.target.value)
                                        }
                                        rows={4}
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1F4E79]"
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C4623A] px-6 py-4 font-semibold text-white transition hover:bg-[#a94f2f] disabled:opacity-60"
                                >
                                    <MessageCircle className="h-5 w-5" />
                                    {processing
                                        ? "Submitting..."
                                        : "Submit Enquiry"}
                                </button>

                                {recentlySuccessful && (
                                    <p className="text-center text-sm font-semibold text-[#2E7D32]">
                                        Thank you! Our advisor will contact you
                                        shortly.
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {relatedServices.length > 0 && (
                <section className="bg-[#FDFAF5] py-16 lg:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <p className="font-semibold uppercase tracking-wider text-[#C4623A]">
                            Explore More
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-[#1C1C1C]">
                            Related Services
                        </h2>

                        <div className="mt-10 grid gap-6 md:grid-cols-3">
                            {relatedServices.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/services/${item.slug}`}
                                    className="group explore-service-wraper   bg-white  transition   "
                                >
                                    <h3 className="text-xl font-bold text-[#1F4E79]">
                                        {item.name}
                                    </h3>

                                    <p className="mt-3 text-md leading-6 text-[#6B6560]">
                                        {item.short_description}
                                    </p>

                                    <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[#C4623A]">
                                        View Service
                                        <ArrowRight className="h-4 w-4" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </AppLayout>
    );
}
