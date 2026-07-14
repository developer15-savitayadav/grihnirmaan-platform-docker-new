import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { Mail, Phone, ArrowRight, Users } from "lucide-react";
import PageBanner from "@/Components/Breadcrumb";

const team = [
      {
        name: "Amit Sharma",
        role: "Construction Head",
        experience: "15+ Years",
        phone: "+91 99999 11111",
        email: "amit@grihnirmaan.in",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700",
    },
    {
        name: "Priya Verma",
        role: "Architecture Lead",
        experience: "12+ Years",
        phone: "+91 98765 43211",
        email: "priya@grihnirmaan.in",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700",
    },
    {
        name: "Rahul Singh",
        role: "Project Manager",
        experience: "10+ Years",
        phone: "+91 98765 43212",
        email: "rahul@grihnirmaan.in",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700",
    },
    {
        name: "Neha Kapoor",
        role: "Interior Designer",
        experience: "8+ Years",
        phone: "+91 98765 43213",
        email: "neha@grihnirmaan.in",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700",
    },
];

export default function Team() {
    return (
        <AppLayout>
            <Head title="Our Team" />

            <PageBanner
                title="Our Team"
                subtitle="Meet the experts behind every strong home."
                bannerImage="/uploads/images/bcrumb-banner.jpg"
                items={[{ label: "Team" }]}
            />

            <section className="relative overflow-hidden bg-cream">
                <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-brand-blue/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-terracotta/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-24">
                    <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                        <div>
                            <p className=" text-sm font-semibold uppercase tracking-widest text-terracotta">
                                Our Team
                            </p>

                            <h1 className="mt-3 font-display text-3xl font-bold text-dark sm:text-4xl lg:text-5xl">
                                Meet the experts behind every strong home.
                            </h1>
                        </div>

                        <p className="max-w-xl text-base leading-8 text-muted-gray lg:ml-auto">
                            From planning and architecture to execution and
                            interiors, our specialists work together to deliver
                            homes with quality, transparency and timely
                            completion.
                        </p>
                    </div>

                    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {team.map((member) => (
                            <article
                                key={member.name}
                                className="group relative overflow-hidden rounded-[28px_28px_28px_0] bg-white"
                            >
                                {/* Image */}
                                <div className="relative overflow-hidden rounded-[28px]">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="h-[360px] w-full object-cover transition duration-500 group-hover:scale-105"
                                    />

                                    {/* Experience Badge */}
                                    <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold text-brand-blue shadow-md">
                                        {member.experience}
                                    </span>

                                    {/* Contact Sidebar */}
                                    <div className="absolute right-0 top-[45%] flex -translate-y-1/2 translate-x-24 flex-col items-center rounded-full bg-[#c4623a] px-3 py-3 transition-all duration-500 group-hover:translate-x-0">
                                        <a
                                            href={`tel:${member.phone.replace(/\s+/g, "")}`}
                                            className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white transition hover:scale-110"
                                        >
                                            <Phone className="h-5 w-5" />
                                        </a>

                                        <a
                                            href={`mailto:${member.email}`}
                                            className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white transition hover:scale-110"
                                        >
                                            <Mail className="h-5 w-5" />
                                        </a>

                                        <a
                                            href="#"
                                            className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white transition hover:scale-110"
                                        >
                                            <Users className="h-5 w-5" />
                                        </a>

                                        <span
                                            className="text-xs font-semibold tracking-wider text-white"
                                            style={{
                                                writingMode: "vertical-rl",
                                                textOrientation: "mixed",
                                            }}
                                        >
                                            CONTACT
                                        </span>
                                    </div>
                                </div>

                                {/* Info Card */}
                                <div className="about-inner-team-info absolute bottom-0 left-0 w-[74%] rounded-tr-[30px] bg-white px-6 py-4 shadow-xl">
                                    <h3 className="about-inner-team-name text-2xl font-bold leading-none text-brand-blue">
                                        {member.name}
                                    </h3>

                                    <p className="about-inner-team-role mt-2 text-base leading-none text-muted-gray">
                                        {member.role}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
