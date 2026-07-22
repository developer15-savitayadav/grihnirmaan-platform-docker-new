import AppLayout from "@/Layouts/AppLayout";
import PageBanner from "@/Components/Breadcrumb";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowRight,
    Building2,
    Calculator,
    CheckCircle2,
    Clock,
    Home,
    IndianRupee,
    MapPin,
} from "lucide-react";
interface NearbyLocality {
    id: number;
    slug: string;
    name: string;
    city?: string;
    base_price_multiplier?: number | string;
}

interface ShowProps {
    locality: any;
    projects: any[];
    nearbyLocalities: NearbyLocality[];
}
export default function Show({
    locality,
    projects = [],
    nearbyLocalities = [],
}: ShowProps) {
    return (
        <AppLayout>
            <Head>
                <title>{locality.meta_title || locality.title}</title>
                {locality.meta_description && (
                    <meta
                        name="description"
                        content={locality.meta_description}
                    />
                )}
            </Head>
            <PageBanner
                title={locality.title}
                bannerImage="/uploads/images/bcrumb-banner.jpg"
                items={[{ label: "Lucknow" }, { label: locality.name }]}
            />

            <section className="locality-hero">
                <div className="locality-container locality-hero-grid">
                    <div>
                        <span className=" flex rounded-full items-center gap-2   text-sm font-bold uppercase tracking-[0.25em] text-[#C4623A] ">
                            <MapPin size={18} />
                            {locality.name}
                            {locality.city && `, ${locality.city}`}
                        </span>

                        {locality.title && (
                            <h1 className="locality-hero-title mt-6 font-display text-4xl font-bold leading-tight text-[#1C1C1C] md:text-5xll">
                                {locality.title}
                            </h1>
                        )}

                        {locality.description && (
                            <p className="locality-hero-text">
                                {locality.description}
                            </p>
                        )}

                        <div className="locality-actions">
                            <Link
                                href="/quote"
                                className="locality-primary-btn"
                            >
                                Get Free Quote <ArrowRight size={18} />
                            </Link>

                            <Link
                                href="/cost-calculator"
                                className="locality-outline-btn"
                            >
                                <Calculator size={18} /> Calculate Cost
                            </Link>
                        </div>
                    </div>

                    {(locality.price_range ||
                        locality.timeline ||
                        locality.best_for) && (
                        <div className="locality-hero-panel">
                            {locality.price_range && (
                                <InfoCard
                                    icon={<IndianRupee />}
                                    label="Estimated Cost"
                                    value={locality.price_range}
                                    dark
                                />
                            )}

                            {locality.timeline && (
                                <InfoCard
                                    icon={<Clock />}
                                    label="Timeline"
                                    value={locality.timeline}
                                    dark
                                />
                            )}

                            {locality.best_for && (
                                <InfoCard
                                    icon={<Home />}
                                    label="Best For"
                                    value={locality.best_for}
                                    dark
                                />
                            )}
                        </div>
                    )}
                </div>
            </section>

            <section className="locality-stats-section">
                <div className="locality-container">
                    <div className="locality-stats-grid">
                        <InfoCard
                            icon={<Building2 />}
                            label="Locality"
                            value={locality.name}
                        />

                        <InfoCard
                            icon={<MapPin />}
                            label="City"
                            value={locality.city}
                        />

                        <InfoCard
                            icon={<IndianRupee />}
                            label="Price Multiplier"
                            value={
                                locality.base_price_multiplier
                                    ? `${locality.base_price_multiplier}x`
                                    : "Standard"
                            }
                        />
                    </div>
                </div>
            </section>

            {locality.features?.length > 0 && (
                <section className="locality-section">
                    <div className="locality-container">
                        <SectionHeading
                            eyebrow="Locality Benefits"
                            title={`Why Build in ${locality.name}`}
                        />

                        <div className="locality-feature-grid">
                            {locality.features.map(
                                (feature: string, index: number) => (
                                    <div
                                        key={index}
                                        className="locality-feature-card"
                                    >
                                        <div className="locality-card-icon">
                                            <CheckCircle2 size={22} />
                                        </div>
                                        <p>{feature}</p>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </section>
            )}

            {locality.services?.length > 0 && (
                <section className="locality-section locality-section-cream">
                    <div className="locality-container">
                        <div className="locality-section-between">
                            <SectionHeading
                                eyebrow="Complete Support"
                                title={`Services in ${locality.name}`}
                            />

                            <Link
                                href="/services"
                                className="locality-text-link"
                            >
                                View all services <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="locality-service-grid">
                            {locality.services.map(
                                (service: any, index: number) => (
                                    <div
                                        key={index}
                                        className="locality-service-card"
                                    >
                                        <div className="locality-card-icon">
                                            <CheckCircle2 size={22} />
                                        </div>

                                        <h3>{service.title || service.name}</h3>

                                        {service.description && (
                                            <p>{service.description}</p>
                                        )}
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </section>
            )}

            {projects.length > 0 && (
                <section className="locality-section">
                    <div className="locality-container">
                        <div className="locality-section-between">
                            <SectionHeading
                                eyebrow="Portfolio"
                                title={`Projects in ${locality.name}`}
                            />

                            <Link
                                href="/projects"
                                className="locality-text-link"
                            >
                                View portfolio <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="locality-project-grid">
                            {projects.map((project: any) => (
                                <Link
                                    key={project.id}
                                    href={`/projects/${project.slug}`}
                                    className="locality-project-card"
                                >
                                    <div className="locality-project-image">
                                        <img
                                            src={`/storage/${project.hero_image_path}`}
                                            alt={project.title}
                                        />
                                    </div>

                                    <div className="locality-project-content">
                                        <div className="locality-project-meta">
                                            {project.style && (
                                                <span className="locality-project-category">
                                                    {project.style}
                                                </span>
                                            )}

                                            {project.bhk && (
                                                <span className="locality-project-tag">
                                                    {project.bhk}
                                                </span>
                                            )}

                                            {project.budget_range && (
                                                <span className="locality-project-tag">
                                                    {project.budget_range}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-display text-2xl font-bold leading-tight text-[#1C1C1C]">
                                            {project.title}
                                        </h3>

                                        <p>
                                            Located in{" "}
                                            <strong>{project.locality}</strong>
                                            {project.built_up_area_sqft &&
                                                ` • ${project.built_up_area_sqft} Sq.ft`}
                                        </p>

                                        <span className="locality-project-btn">
                                            View Project
                                            <ArrowRight size={18} />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {(locality.cta_title || locality.cta_description) && (
                <section className="locality-cta">
                    <div className="locality-container locality-cta-inner">
                        {locality.cta_title && <h2>{locality.cta_title}</h2>}
                        {locality.cta_description && (
                            <p>{locality.cta_description}</p>
                        )}

                        <div className="locality-actions locality-actions-center">
                            <Link
                                href="/quote"
                                className="locality-primary-btn"
                            >
                                Get Free Quote <ArrowRight size={18} />
                            </Link>

                            <Link
                                href="/cost-calculator"
                                className="locality-outline-btn"
                            >
                                Calculate Cost
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {nearbyLocalities.length > 0 && (
                <section className="relative overflow-hidden bg-[#FDFAF5] py-20 lg:py-28">
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div>
                                <span className="inline-flex rounded-full  text-sm font-bold uppercase tracking-[0.25em] text-[#C4623A]">
                                    Explore More · Nearby Areas
                                </span>

                                <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[#1C1C1C] md:text-5xll">
                                    Nearby Localities
                                </h2>

                                <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#6B6560]">
                                    Explore nearby locations where our
                                    construction and home building services are
                                    available.
                                </p>
                            </div>

                            <div className="flex items-baseline gap-3 self-start md:self-end">
                                <span className="font-serif text-5xl font-bold leading-none text-[#1F4E79]">
                                    {String(nearbyLocalities.length).padStart(
                                        2,
                                        "0",
                                    )}
                                </span>

                                <span className="max-w-[7rem] text-xs font-semibold uppercase leading-tight tracking-wider text-[#6B6560]">
                                    nearby locations
                                </span>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {nearbyLocalities.map(
                                (item: any, index: number) => {
                                    const regNo = `NB-${String(index + 1).padStart(2, "0")}`;

                                    return (
                                        <Link
                                            key={item.id}
                                            href={`/lucknow/${item.slug}`}
                                            className="group relative block"
                                        >
                                            <div className="relative overflow-hidden rounded-[4px] bg-white shadow-[0_1px_2px_rgba(28,28,28,0.06)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_40px_rgba(31,78,121,0.14)]">
                                                {/* Corner Badge */}
                                                <div className="absolute -right-8 -top-8 flex h-20 w-20 rotate-45 items-end justify-center bg-[#1F4E79] pb-2.5 transition-transform duration-300 group-hover:-rotate-[35deg]">
                                                    <span className="rotate-[-45deg] font-serif text-sm font-bold text-white group-hover:rotate-[35deg]">
                                                        {item.name.charAt(0)}
                                                    </span>
                                                </div>

                                                {/* Top */}
                                                <div className="px-7 pb-6 pt-8">
                                                    <p className="font-mono text-[11px] font-semibold tracking-wider text-[#6B6560]">
                                                        AREA ID. {regNo}
                                                    </p>

                                                    <h3 className="mt-3 pr-6 font-serif text-2xl font-bold leading-tight text-[#1C1C1C] transition-colors group-hover:text-[#1F4E79]">
                                                        {item.name}
                                                    </h3>

                                                    <p className="mt-2 text-sm leading-6 text-[#6B6560]">
                                                        {item.city
                                                            ? `${item.city}, Lucknow`
                                                            : "Lucknow"}{" "}
                                                        service coverage
                                                        available.
                                                    </p>
                                                </div>

                                                {/* Divider */}
                                                <div className="relative">
                                                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#1C1C1C]/12" />
                                                    <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#FDFAF5]" />
                                                    <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#FDFAF5]" />
                                                </div>

                                                {/* Bottom */}
                                                <div className="flex items-center justify-between px-7 py-5">
                                                    <div>
                                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6B6560]">
                                                            Status
                                                        </p>

                                                        <p className="mt-0.5 font-mono text-lg font-bold text-[#1C1C1C]">
                                                            Active
                                                        </p>
                                                    </div>

                                                    <span className="flex items-center gap-2 text-sm font-semibold text-[#C4623A]">
                                                        View Area
                                                        <ArrowRight
                                                            size={16}
                                                            className="transition-transform group-hover:translate-x-1"
                                                        />
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Shadow */}
                                            <div className="absolute inset-x-3 -bottom-2 -z-10 h-full rounded-[4px] bg-[#1F4E79]/[0.06] transition-transform duration-300 group-hover:translate-y-1" />
                                        </Link>
                                    );
                                },
                            )}
                        </div>

                        {nearbyLocalities.length === 0 && (
                            <div className="mt-8 rounded-2xl border border-dashed border-[#1C1C1C]/15 bg-white/60 p-12 text-center">
                                <h3 className="font-serif text-xl font-bold text-[#1C1C1C]">
                                    No Nearby Localities
                                </h3>

                                <p className="mt-2 text-sm text-[#6B6560]">
                                    Nearby locations will appear here once they
                                    are added.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </AppLayout>
    );
}

function SectionHeading({ eyebrow, title }: any) {
    return (
        <div className="locality-heading">
            <p className="inline-flex rounded-full text-sm font-bold uppercase tracking-[0.25em] text-[#C4623A]">
                {eyebrow}
            </p>
            <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-[#1C1C1C] md:text-5xll">
                {title}
            </h2>
        </div>
    );
}

function InfoCard({ icon, label, value, dark = false }: any) {
    if (!value) return null;

    return (
        <div
            className={dark ? "locality-info-card dark" : "locality-info-card"}
        >
            <div className="locality-info-icon">{icon}</div>
            <h3>{value}</h3>
            <p>{label}</p>
        </div>
    );
}
