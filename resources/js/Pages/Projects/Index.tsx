import ProjectCard from "@/Components/ProjectCard";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { motion, type Variants } from "framer-motion";
import { type PropsWithChildren, useEffect, useMemo, useState } from "react";
import PageBanner from "@/Components/Breadcrumb";
import { MapPin, Ruler, Home, CalendarDays, RotateCcw } from "lucide-react";
type Project = {
    id: number;
    title: string;
    slug: string;
    location: string | null;
    image: string;
    before_image?: string | null;
    area: string;
    type: string;
    style?: string | null;
    bhk?: string | null;
    year: string;
    budget_range?: string | null;
    is_featured?: boolean;
};

type Filters = {
    locality: string;
    size: string;
    style: string;
    year: string;
    bhk: string;
    featured: string;
};

type PageFilters = Partial<Filters>;

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

export default function ProjectsIndex({
    projects,
    filters: initialFilters = {},
}: {
    projects: Project[];
    filters?: PageFilters;
}) {
    const [filteredProjects, setFilteredProjects] =
        useState<Project[]>(projects);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState<Filters>({
        locality: initialFilters.locality ?? "",
        size: initialFilters.size ?? "",
        style: initialFilters.style ?? "",
        year: initialFilters.year ?? "",
        bhk: initialFilters.bhk ?? "",
        featured: initialFilters.featured ?? "",
    });

    const localities = useMemo(
        () =>
            Array.from(
                new Set(
                    projects.map((project) => project.location).filter(Boolean),
                ),
            ),
        [projects],
    );

    const styles = useMemo(
        () =>
            Array.from(
                new Set(
                    projects
                        .map((project) => project.style || project.type)
                        .filter(Boolean),
                ),
            ),
        [projects],
    );

    const years = useMemo(
        () =>
            Array.from(
                new Set(
                    projects.map((project) => project.year).filter(Boolean),
                ),
            ),
        [projects],
    );

    useEffect(() => {
        const hasFilters =
            filters.locality ||
            filters.size ||
            filters.style ||
            filters.year ||
            filters.bhk ||
            filters.featured;

        if (!hasFilters) {
            setFilteredProjects(projects);
            return;
        }

        const controller = new AbortController();

        const fetchProjects = async () => {
            setLoading(true);

            const query = new URLSearchParams();

            if (filters.locality) query.append("locality", filters.locality);
            if (filters.size) query.append("size", filters.size);
            if (filters.style) query.append("style", filters.style);
            if (filters.year) query.append("year", filters.year);
            if (filters.bhk) query.append("bhk", filters.bhk);
            if (filters.featured) query.append("featured", filters.featured);

            try {
                const response = await fetch(
                    `/api/projects?${query.toString()}`,
                    {
                        signal: controller.signal,
                        headers: {
                            Accept: "application/json",
                        },
                    },
                );

                const data = await response.json();

                setFilteredProjects(data.projects ?? []);
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error("Project filter error:", error);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchProjects();

        return () => controller.abort();
    }, [filters, projects]);

    const resetFilters = () => {
        setFilters({
            locality: "",
            size: "",
            style: "",
            year: "",
            bhk: "",
            featured: "",
        });
    };

    return (
        <AppLayout>
            <Head title="Projects — GrihNirmaan" />

            <PageBanner
                title="Completed   Projects"
                subtitle="Explore our portfolio of completed homes, villas, duplexes, and premium residential construction work."
                bannerImage="/uploads/images/bcrumb-banner.jpg"
                items={[{ label: "Projects" }]}
            />

            <section className="bg-white py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 rounded-3xl border border-brand-blue/10 bg-cream p-6 project-page-filter-wrap">
                        <div className="rounded-[32px] bg-brand-blue/5 p-4">
                            <div className="grid gap-4 md:grid-cols-5">
                                {/* Locality */}
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white rounded-full bg-terracotta p-1" />

                                    <select
                                        value={filters.locality}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                locality: e.target.value,
                                            })
                                        }
                                       className="h-14 w-full appearance-none rounded-full border border-brand-blue/10 bg-white pl-14 pr-4 text-sm text-charcoal shadow-sm outline-none transition-all duration-200 focus:border-[#1f4e792e] focus:outline-none focus:ring-0 focus:shadow-sm"
                                    >
                                        <option value="">All Localities</option>
                                        {localities.map((locality) => (
                                            <option
                                                key={locality}
                                                value={locality ?? ""}
                                            >
                                                {locality}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Size */}
                                <div className="relative">
                                    <Ruler className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-terracotta p-1 text-white" />

                                    <select
                                        value={filters.size}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                size: e.target.value,
                                            })
                                        }
                                        className="h-14 w-full appearance-none rounded-full border border-brand-blue/10 bg-white pl-14 pr-4 text-sm text-charcoal shadow-sm outline-none transition-all duration-200 focus:border-[#1f4e792e] focus:outline-none focus:ring-0 focus:shadow-sm"
                                    >
                                        <option value="">All Sizes</option>
                                        <option value="small">
                                            Below 1500 sq ft
                                        </option>
                                        <option value="medium">
                                            1500 - 3000 sq ft
                                        </option>
                                        <option value="large">
                                            Above 3000 sq ft
                                        </option>
                                    </select>
                                </div>

                                {/* Style */}
                                <div className="relative">
                                    <Home className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-terracotta p-1 text-white" />

                                    <select
                                        value={filters.style}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                style: e.target.value,
                                            })
                                        }
                                        className="h-14 w-full appearance-none rounded-full border border-brand-blue/10 bg-white pl-14 pr-4 text-sm text-charcoal shadow-sm outline-none transition-all duration-200 focus:border-[#1f4e792e] focus:outline-none focus:ring-0 focus:shadow-sm"
                                    >
                                        <option value="">All Styles</option>

                                        {styles.map((style) => (
                                            <option
                                                key={style}
                                                value={style ?? ""}
                                            >
                                                {style}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Year */}
                                <div className="relative">
                                    <CalendarDays className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-terracotta p-1 text-white" />

                                    <select
                                        value={filters.year}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                year: e.target.value,
                                            })
                                        }
                                       className="h-14 w-full appearance-none rounded-full border border-brand-blue/10 bg-white pl-14 pr-4 text-sm text-charcoal shadow-sm outline-none transition-all duration-200 focus:border-[#1f4e792e] focus:outline-none focus:ring-0 focus:shadow-sm"
                                    >
                                        <option value="">All Years</option>

                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Reset */}
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="flex h-14 items-center justify-center gap-2 rounded-full bg-terracotta px-6 font-semibold text-white transition hover:bg-brand-blue"
                                >
                                    <RotateCcw className="h-5 w-5" />
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="rounded-3xl border border-brand-blue/10 bg-cream p-12 text-center">
                            <h2 className="text-2xl font-bold text-charcoal">
                                Loading projects...
                            </h2>
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="rounded-3xl border border-brand-blue/10 bg-cream p-12 text-center">
                            <h2 className="text-2xl font-bold text-charcoal">
                                No projects found
                            </h2>

                            <p className="mt-3 text-muted-gray">
                                Please try another filter.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {filteredProjects.map((project) => (
                                <Reveal key={project.id}>
                                    <ProjectCard project={project} />
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
