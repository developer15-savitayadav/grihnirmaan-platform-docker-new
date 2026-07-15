import { Link } from "@inertiajs/react";
import { ArrowUpRight, Bath, BedDouble, MapPin, Ruler, Building2} from "lucide-react";

type Project = {
    id: number;
    title: string;
    slug: string;
    location: string | null;
    image: string;
    before_image?: string | null;
    area?: string;
    type?: string;
    bhk?: string | null;
    year?: string;
    budget_range?: string | null;
};

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="group overflow-hidden rounded-[26px] bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <Link
                href={`/projects/${project.slug}`}
                className="group block overflow-hidden rounded-[26px] bg-white  transition-all duration-300 hover:-translate-y-2 "
            >
                {/* Image */}
                <div className="overflow-hidden rounded-[26px]">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="h-[250px] w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="relative rounded-b-[26px] bg-cream px-5 pb-5 pt-4">
                    <h3 className=" project-tittle text-2xl font-bold text-brand-blue">
                        {project.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-gray">
                        <MapPin className="h-4 w-4 text-terracotta" />
                        <span>{project.location ?? "Location"}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-gray">


                        {project.bhk && (
                            <span className="flex items-center gap-1">
                                <Building2 className="h-4 w-4 text-terracotta" />
                                {project.type}
                            </span>
                        )}

                        {project.area && (
                            <span className="flex items-center gap-1">
                                <Ruler className="h-4 w-4 text-terracotta" />
                                {project.area}
                            </span>
                        )}
                    </div>

                    {(project.year || project.budget_range) && (
                        <div className="mt-4">
                            {project.year && (
                                <p className="text-sm text-muted-gray">
                                    {project.year}
                                </p>
                            )}

                            {project.budget_range && (
                                <p className="mt-1 text-xl font-bold text-success-green">
                                    {project.budget_range}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Arrow Button */}
                    <span className="absolute bottom-4 right-4 flex project-page-arrow-btn items-center justify-center rounded-full bg-terracotta text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-blue">
                        <ArrowUpRight className="h-5 w-5" />
                    </span>
                </div>
            </Link>
        </div>
    );
}
