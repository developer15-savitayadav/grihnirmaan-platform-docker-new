import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import PageBanner from "@/Components/Breadcrumb";
import { useState } from "react";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Home,
    IndianRupee,
    MapPin,
    Quote,
    Ruler,
} from "lucide-react";
import type { ReactNode } from "react";

type Project = {
    id: number;
    title: string;
    slug: string;
    location: string | null;
    image: string;
    before_image?: string | null;
    floor_plan?: string | null;
    plot_size_sqft?: number | null;
    built_up_area_sqft?: number | null;
    bhk?: string | null;
    style?: string | null;
    completion_date?: string | null;
    duration_months?: number | null;
    budget_range?: string | null;
    customer_quote?: string | null;
    challenges_solved?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
    gallery?: ProjectGalleryImage[];
};
type ProjectGalleryImage = {
    id: number;
    url: string;
    thumb?: string;
    card?: string;
    large?: string;
    alt?: string | null;
};
export default function ProjectShow({ project }: { project: Project }) {
    const [currentPage, setCurrentPage] = useState(1);

    const imagesPerPage = 3;

    const totalPages = Math.ceil(
        (project.gallery?.length ?? 0) / imagesPerPage,
    );

    const paginatedGallery =
        project.gallery?.slice(
            (currentPage - 1) * imagesPerPage,
            currentPage * imagesPerPage,
        ) ?? [];
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<"photos" | "floorPlans">(
        "photos",
    );
    return (
        <AppLayout>
            <Head>
                <title>{project.meta_title ?? project.title}</title>
                {project.meta_description && (
                    <meta
                        name="description"
                        content={project.meta_description}
                    />
                )}
            </Head>
            <PageBanner
                title={project.title}
                subtitle="Explore our completed home construction project."
                bannerImage={project.image}
                items={[{ label: "Projects" }, { label: project.title }]}
            />

            <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-brand-blue-light/30 pt-8 pb-16 lg:pt-10 lg:pb-20">
                <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-blue-light/50 blur-3xl" />
                <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-terracotta/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 rounded-full bg-[#c4623a0f] px-4 py-2 text-sm font-semibold text-brand-blue shadow-sm transition hover:text-terracotta"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Projects
                    </Link>

                    <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="inline-flex items-center gap-2 rounded-full bg-terracotta/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-terracotta">
                                <MapPin className="h-4 w-4" />
                                {project.location ?? "Lucknow"}
                            </p>

                            <h1 className="mt-3 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
                                {project.title}
                            </h1>

                            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-gray">
                                Complete residential construction project with
                                planning, civil work, finishing, quality checks,
                                and transparent execution.
                            </p>

                            <div className="project-info-grid mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <InfoCard
                                    icon={<Home className="h-6 w-6" />}
                                    label="Style"
                                    value={project.style ?? "Residential"}
                                />

                                <InfoCard
                                    icon={<Ruler className="h-6 w-6" />}
                                    label="Built-up Area"
                                    value={
                                        project.built_up_area_sqft
                                            ? `${project.built_up_area_sqft} sq ft`
                                            : "N/A"
                                    }
                                />

                                <InfoCard
                                    icon={<Calendar className="h-6 w-6" />}
                                    label="Completion"
                                    value={project.completion_date ?? "Ongoing"}
                                />

                                <InfoCard
                                    icon={<Clock className="h-6 w-6" />}
                                    label="Duration"
                                    value={
                                        project.duration_months
                                            ? `${project.duration_months} months`
                                            : "N/A"
                                    }
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <div className="overflow-hidden rounded-[2rem] bg-[#c4623a0f] shadow-2xl">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="block h-[480px] w-full object-cover"
                                />
                            </div>

                            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-5 shadow-xl backdrop-blur">
                                <p className="text-sm font-semibold text-muted-gray">
                                    Project Status
                                </p>

                                <p className="mt-1 text-xl font-bold text-brand-blue">
                                    Successfully Delivered
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="feature-card-grid mx-auto grid max-w-6xl  md:grid-cols-3 ">
                    <FeatureCard
                        icon={<IndianRupee className="h-7 w-7" />}
                        title="Budget Range"
                        value={project.budget_range ?? "Available on request"}
                    />

                    <FeatureCard
                        icon={<Home className="h-7 w-7" />}
                        title="Configuration"
                        value={project.bhk ?? "Residential Home"}
                    />

                    <FeatureCard
                        icon={<Ruler className="h-7 w-7" />}
                        title="Plot Size"
                        value={
                            project.plot_size_sqft
                                ? `${project.plot_size_sqft} sq ft`
                                : "N/A"
                        }
                    />
                </div>
            </section>

            <section className="bg-cream py-16 project-challenge-section">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8 project-challenge-grid">
                    <div className=" challenge-card">
                        <h2 className="text-3xl font-bold text-black sm:text-4xl challenge-title">
                            Challenges Solved
                        </h2>

                        <p className="mt-5 text-base leading-8 text-muted-gray sm:text-lg challenge-content">
                            {project.challenges_solved ??
                                `This project involved detailed planning, construction coordination, vendor management and quality
                finishing.`}
                        </p>
                    </div>

                    <div className="relative overflow-hidden  text-white  quote-card">
                        <Quote className="h-12 w-12 text-gold-sage quote-icon" />

                        <p className="mt-6 text-lg leading-8 text-white/90 quote-text">
                            “
                            {project.customer_quote ??
                                "GrihNirmaan delivered a smooth and transparent construction experience."}
                            ”
                        </p>

                        <p className="mt-6 font-semibold text-gold-sage quote-author">
                            Happy Homeowner
                        </p>
                    </div>
                </div>
            </section>

            {project.before_image && (
                <section className="bg-white py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="font-display text-3xl font-bold text-brand-blue sm:text-4xl">
                            Before & After Transformation
                        </h2>

                        <p className="mt-4 max-w-2xl text-muted-gray">
                            See how the site transformed from initial
                            construction stage to a completed home.
                        </p>

                        <div className="mt-8 grid gap-8 md:grid-cols-2">
                            <div className="overflow-hidden rounded-3xl border border-brand-blue/20 bg-cream shadow-lg">
                                <div className="relative">
                                    <img
                                        src={project.before_image}
                                        alt={`${project.title} before construction`}
                                        className="h-[420px] w-full object-cover"
                                    />

                                    <span className="absolute left-4 top-4 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white">
                                        Before
                                    </span>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-charcoal">
                                        Before Construction
                                    </h3>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-3xl border border-brand-blue/20 bg-cream shadow-lg">
                                <div className="relative">
                                    <img
                                        src={project.image}
                                        alt={`${project.title} after completion`}
                                        className="h-[420px] w-full object-cover"
                                    />

                                    <span className="absolute left-4 top-4 rounded-full bg-terracotta px-4 py-2 text-sm font-semibold text-white">
                                        After
                                    </span>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-charcoal">
                                        After Completion
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <h2 className="font-display text-4xl font-bold text-charcoal sm:text-5xl">
                            Interior Space Design
                        </h2>

                        <div className="flex flex-wrap gap-3">
                            {[
                                { key: "photos", label: "Photos" },

                                { key: "floorPlans", label: "Floor Plans" },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key as any)}
                                    className={
                                        activeTab === tab.key
                                            ? "rounded-full bg-terracotta px-8 py-3 text-sm font-bold text-white shadow-lg transition"
                                            : "rounded-full border border-brand-blue/15 bg-white px-8 py-3 text-sm font-bold text-charcoal transition hover:border-terracotta hover:text-terracotta"
                                    }
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Photos Tab */}
                    {activeTab === "photos" &&
                        project.gallery &&
                        project.gallery.length > 0 && (
                            <>
                                <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                                    {paginatedGallery.map((image, index) => (
                                        <div
                                            key={image.id}
                                            onClick={() =>
                                                setSelectedIndex(
                                                    (currentPage - 1) *
                                                        imagesPerPage +
                                                        index,
                                                )
                                            }
                                            className="group relative h-[305px] cursor-pointer overflow-hidden rounded-[22px] bg-cream shadow-md"
                                        >
                                            <img
                                                src={image.large ?? image.url}
                                                alt={
                                                    image.alt ??
                                                    `${project.title} gallery image`
                                                }
                                                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 transition group-hover:opacity-100" />
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-10 flex items-center justify-center gap-3">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() =>
                                                setCurrentPage(
                                                    (page) => page - 1,
                                                )
                                            }
                                            className="rounded-xl border border-brand-blue/20 px-5 py-2 font-semibold text-brand-blue disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Previous
                                        </button>

                                        {Array.from({ length: totalPages }).map(
                                            (_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() =>
                                                        setCurrentPage(i + 1)
                                                    }
                                                    className={`h-11 w-11 rounded-full font-semibold transition ${
                                                        currentPage === i + 1
                                                            ? "bg-terracotta text-white"
                                                            : "bg-[#c4623a0f] text-brand-blue hover:bg-brand-blue hover:text-white"
                                                    }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ),
                                        )}

                                        <button
                                            disabled={
                                                currentPage === totalPages
                                            }
                                            onClick={() =>
                                                setCurrentPage(
                                                    (page) => page + 1,
                                                )
                                            }
                                            className="rounded-xl border border-brand-blue/20 px-5 py-2 font-semibold text-brand-blue disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    {selectedIndex !== null &&
                        project.gallery &&
                        project.gallery.length > 0 && (
                            <div
                                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 px-4"
                                onClick={() => setSelectedIndex(null)}
                            >
                                {/* Close Button */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedIndex(null);
                                    }}
                                    className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-3xl font-light text-charcoal shadow-lg transition hover:bg-terracotta hover:text-white"
                                >
                                    ×
                                </button>

                                {/* Previous Button */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        setSelectedIndex((prev) =>
                                            prev === 0
                                                ? project.gallery!.length - 1
                                                : (prev ?? 0) - 1,
                                        );
                                    }}
                                    className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-3xl text-brand-blue shadow-lg transition hover:bg-terracotta hover:text-white"
                                >
                                    &#8249;
                                </button>

                                {/* Image */}
                                <div
                                    className="relative max-h-[90vh] max-w-[90vw]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={
                                            project.gallery[selectedIndex]
                                                .large ??
                                            project.gallery[selectedIndex].url
                                        }
                                        alt={
                                            project.gallery[selectedIndex]
                                                .alt ??
                                            `Gallery ${selectedIndex + 1}`
                                        }
                                        className="max-h-[90vh] max-w-[90vw] rounded-3xl object-contain shadow-2xl"
                                    />

                                    {/* Counter */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white shadow-lg">
                                        {selectedIndex + 1} /{" "}
                                        {project.gallery.length}
                                    </div>
                                </div>

                                {/* Next Button */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        setSelectedIndex((prev) =>
                                            prev === project.gallery!.length - 1
                                                ? 0
                                                : (prev ?? 0) + 1,
                                        );
                                    }}
                                    className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-3xl text-brand-blue shadow-lg transition hover:bg-terracotta hover:text-white"
                                >
                                    &#8250;
                                </button>
                            </div>
                        )}

                    {/* Floor Plans Tab */}
                    {activeTab === "floorPlans" && (
                        <div className="mt-10 overflow-hidden rounded-[28px] border border-brand-blue/10 bg-cream p-4 shadow-lg">
                            {project.floor_plan ? (
                                <img
                                    src={project.floor_plan}
                                    alt={`${project.title} floor plan`}
                                    className="block w-full rounded-2xl object-cover"
                                />
                            ) : (
                                <div className="flex h-[360px] items-center justify-center rounded-2xl bg-white text-lg font-semibold text-muted-gray">
                                    Floor plan not available
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
            <section className="bg-brand-blue py-16 text-white">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
                    <h2 className="font-display text-3xl font-bold md:text-4xl">
                        Want to build a similar home?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                        Get a free consultation and accurate cost estimate for
                        your plot.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/quote"
                            className="rounded-xl bg-terracotta px-7 py-4 font-semibold text-white shadow-lg transition hover:bg-terracotta/90"
                        >
                            Get Free Quote
                        </Link>

                        <Link
                            href="/cost-calculator"
                            className="rounded-xl border border-white/30 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
                        >
                            Calculate Cost
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}

function InfoCard({
    icon,
    label,
    value,
}: {
    icon: ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-[#d0c9c7] bg-[#fff] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <p className="  text-sm font-medium text-[#c4623a]">{label}</p>
            <p className="mt-1 text-lg font-bold text-[#000000]">{value}</p>
        </div>
    );
}

function FeatureCard({
    icon,
    title,
    value,
}: {
    icon: ReactNode;
    title: string;
    value: string;
}) {
    return (
        <div className="feature-stats-card group  p-7 transition-all duration-300  ">
            <h3 className="">{value}</h3>

            <p className="mt-2 text-base leading-7 ">{title}</p>
        </div>
    );
}
