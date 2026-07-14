import PageBanner from '@/Components/Breadcrumb';
import ServiceCard from '@/Components/ServiceCard';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Calculator,
    CheckCircle2,
    Phone,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';

interface ServiceItem {
    id: number;
    slug: string;
    name: string;
    short_description: string;
    icon_name: string | null;
    display_order: number;
}

interface Props {
    services: ServiceItem[];
}

const benefits = [
    'Transparent pricing',
    'Expert project supervision',
    'Branded material partners',
    'End-to-end construction support',
];

export default function ServicesIndex({ services }: Props) {
    return (
        <AppLayout>
            <Head title="Services — GrihNirmaan" />

            <PageBanner
                title="Our Services"
                subtitle="Complete home construction services from Bhumi Poojan to Grih Pravesh."
                bannerImage="/uploads/images/bcrumb-banner.jpg"
                items={[{ label: 'Services' }]}
            />

            <section className="relative overflow-hidden bg-[#FDFAF5] py-16 sm:py-20 lg:py-24">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#D9E2F3]/80 blur-3xl" />
                    <div className="absolute -bottom-32 -left-24 h-[320px] w-[320px] rounded-full bg-[#C4623A]/10 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C4623A]">
                                Everything under one roof
                            </p>

                            <h1 className="mt-3 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
                                Services for your complete home construction journey.
                            </h1>

                            <p className="mt-5 max-w-2xl text-base leading-8 text-[#6B6560] sm:text-lg">
                                From approvals and architecture to construction,
                                interiors, fittings and final handover, our expert
                                team manages every stage with clear communication.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/quote"
                                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1F4E79] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#163a5b]"
                                >
                                    Get Free Quote
                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <Link
                                    href="/cost-calculator"
                                    className="inline-flex items-center justify-center gap-2 rounded-md border border-[#1F4E79] bg-white px-7 py-3 text-sm font-semibold text-[#1F4E79] transition hover:bg-[#D9E2F3]"
                                >
                                    <Calculator className="h-5 w-5" />
                                    Calculate Cost
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D9E2F3] text-[#1F4E79]">
                                    <ShieldCheck className="h-7 w-7" />
                                </div>

                                <div>
                                    <p className="text-sm text-[#6B6560]">
                                        Service Coverage
                                    </p>
                                    <h3 className="text-2xl font-bold text-[#1C1C1C]">
                                        {services.length}+ Services
                                    </h3>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4">
                                {benefits.map((benefit) => (
                                    <div
                                        key={benefit}
                                        className="flex items-center gap-3 rounded-2xl bg-[#FDFAF5] p-4"
                                    >
                                        <CheckCircle2 className="h-5 w-5 text-[#2E7D32]" />
                                        <span className="text-sm font-medium text-[#1C1C1C]">
                                            {benefit}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C4623A]">
                                Our Service Stack
                            </p>

                            <h2 className="mt-3 font-display text-3xl font-bold text-[#1C1C1C] sm:text-4xl">
                                Choose the service you need
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-[#6B6560] sm:text-base">
                                Each service includes a clear process, deliverables,
                                expert guidance and lead support from our home
                                construction team.
                            </p>
                        </div>

                        <Link
                            href="/quote"
                            className="inline-flex w-fit items-center gap-2 rounded-md border border-[#1F4E79] px-5 py-3 text-sm font-semibold text-[#1F4E79] transition hover:bg-[#1F4E79] hover:text-white"
                        >
                            Need custom help?
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {services.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{
                                        duration: 0.4,
                                        delay: Math.min(index * 0.04, 0.3),
                                    }}
                                    className="h-full"
                                >
                                    <ServiceCard service={service} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-gray-300 bg-[#FDFAF5] p-10 text-center">
                            <Sparkles className="mx-auto h-10 w-10 text-[#C4623A]" />

                            <h3 className="mt-4 text-xl font-bold text-[#1C1C1C]">
                                No services found
                            </h3>

                            <p className="mt-2 text-[#6B6560]">
                                Please add active services from the admin panel.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section className=" py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#1F4E79] to-[#1C1C1C] p-8 shadow-2xl sm:p-10 lg:p-12">
                        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" />

                        <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4A853]">
                                    Need help?
                                </p>

                                <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                                    Not sure which service you need?
                                </h2>

                                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                                    Tell us your plot size, budget and location.
                                    Our home advisor will recommend the right
                                    service combination for your project.
                                </p>
                            </div>

                            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                                <Link
                                    href="/quote"
                                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C4623A] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#aa5230]"
                                >
                                    Get Free Quote
                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <Link
                                    href="tel:+919876543210"
                                    className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                                >
                                    <Phone className="h-5 w-5" />
                                    Call Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
