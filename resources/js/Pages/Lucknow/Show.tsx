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

export default function Show({
    locality,
    projects = [],
    nearbyLocalities = [],
}: any) {
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
                        <span className="locality-badge">
                            <MapPin size={18} />
                            {locality.name}
                            {locality.city && `, ${locality.city}`}
                        </span>

                        {locality.title && (
                            <h1 className="locality-hero-title">
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

                                        <h3>{project.title}</h3>

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
                <section className="locality-section">
                    <div className="locality-container">
                        <SectionHeading
                            eyebrow="Explore More"
                            title="Nearby Localities"
                        />

                        <div className="locality-nearby-grid">
                            {nearbyLocalities.map((item: any) => (
                                <Link
                                    key={item.id}
                                    href={`/lucknow/${item.slug}`}
                                    className="locality-nearby-card"
                                >
                                    <div className="locality-nearby-content">
                                        <div className="locality-nearby-icon">
                                            <MapPin />
                                        </div>
                                        <div className="locality-nearby-info">
                                            <h3>{item.name}</h3>
                                        </div>
                                    </div>

                                    {item.city && <p>{item.city}</p>}
                                    <span>
                                        View area <ArrowRight size={16} />
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

function SectionHeading({ eyebrow, title }: any) {
    return (
        <div className="locality-heading">
            <p>{eyebrow}</p>
            <h2>{title}</h2>
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
