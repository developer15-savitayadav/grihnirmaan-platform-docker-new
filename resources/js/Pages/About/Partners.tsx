import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { motion, type Variants } from "framer-motion";
import { PropsWithChildren } from "react";
import PageBanner from "@/Components/Breadcrumb";

import {
    BadgeCheck,
    Building2,
    ExternalLink,
    ShieldCheck,
    Star,
    PackageCheck,
    Handshake,
    Sparkles,
} from "lucide-react";

type Partner = {
    id: number;
    slug: string;
    name: string;
    category: string | null;
    description: string | null;
    logo: string | null;
    website_url: string | null;
    uses: string[];
};

type Props = {
    partners: Partner[];
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
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

export default function Partners({ partners }: Props) {
    return (
        <AppLayout>
            <Head title="Our Partners" />

            <PageBanner
                title="Our Partners"
                subtitle="Trusted brands we collaborate with for quality construction."
                bannerImage="/uploads/images/bcrumb-banner.jpg"
                items={[{ label: "Partners" }]}
            />

            <section className="relative overflow-hidden bg-[#FDFAF5] py-20 lg:py-24">
                <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#1F4E79]/10 blur-3xl" />
                <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-[#C4623A]/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6">
                    <Reveal className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex rounded-full   px-5 py-2 text-sm font-bold uppercase tracking-[0.25em] text-[#C4623A]">
                            Trusted Partners
                        </span>

                        <h1 className="mt-5 text-4xl font-bold leading-tight text-[#1C1C1C] sm:text-5xl">
                            Brands that help us build stronger, safer & better
                            homes
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-[#6B6560]">
                            We work with reliable construction, electrical,
                            plumbing, paint and finishing brands to deliver
                            durable homes with premium quality and long-term
                            value.
                        </p>
                    </Reveal>

                    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {partners.map((partner) => (
                            <Reveal
                                key={partner.id}
                                className="partner-card group"
                            >
                                <div className="partner-card-glow" />

                                <div className="partner-card-top">
                                    <div className="partner-logo-box">
                                        {partner.logo ? (
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className="partner-logo"
                                            />
                                        ) : (
                                            <span className="partner-logo-letter">
                                                {partner.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="partner-card-body">
                                    <span className="partner-category">
                                        <Building2 className="h-3.5 w-3.5" />
                                        {partner.category || "Partner"}
                                    </span>

                                    <h2>{partner.name}</h2>

                                    <p>{partner.description}</p>

                                    {partner.uses?.length > 0 && (
                                        <div className="partner-tags">
                                            {partner.uses
                                                .slice(0, 3)
                                                .map((item) => (
                                                    <span key={item}>
                                                        {item}
                                                    </span>
                                                ))}
                                        </div>
                                    )}
                                </div>

                                <div className="partner-card-footer">
                                    <div className="partner-verified">
                                        <BadgeCheck className="h-5 w-5" />
                                        Verified
                                    </div>

                                    {partner.website_url && (
                                        <a
                                            href={partner.website_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Visit{" "}
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="partner-value-section">
                <Reveal className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full px-5 py-2 text-sm font-bold uppercase tracking-[0.25em] text-[#C4623A]">
                        Why Our Partners Matter
                    </span>

                    <h2 className="mt-5 text-4xl font-bold leading-tight text-[#1C1C1C] sm:text-5xl">
                        Strong Partnerships Build Exceptional Homes
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-[#6B6560]">
                        Our partnerships with industry-leading brands ensure
                        every home is built using trusted materials, advanced
                        technologies, and proven construction solutions.
                        Together, we deliver superior quality, enhanced safety,
                        lasting durability, and complete peace of mind for every
                        homeowner.
                    </p>
                </Reveal>

                <div className="partner-value-container">
                    {[
                        {
                            icon: ShieldCheck,
                            title: "Trusted Materials",
                            text: "We use quality-certified materials and branded products for durability and safety.",
                        },
                        {
                            icon: Sparkles,
                            title: "Premium Finish",
                            text: "Carefully selected products help us deliver premium finishing and modern home aesthetics.",
                        },
                        {
                            icon: Handshake,
                            title: "Long-Term Reliability",
                            text: "Strong brand partnerships ensure reliable support, warranty and long-term value.",
                        },
                    ].map((item) => {
                        const Icon = item.icon;

                        return (
                            <Reveal
                                key={item.title}
                                className="partner-value-card"
                            >
                                <div className="partner-value-icon">
                                    <Icon className="h-7 w-7" />
                                </div>

                                <h3>{item.title}</h3>

                                <p>{item.text}</p>
                            </Reveal>
                        );
                    })}
                </div>
            </section>
        </AppLayout>
    );
}
