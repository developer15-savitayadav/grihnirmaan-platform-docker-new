import { Head, Link } from "@inertiajs/react";
import PageBanner from "@/Components/Breadcrumb";
import AppLayout from "@/Layouts/AppLayout";
interface Locality {
    id: number;
    name: string;
    slug: string;
    city?: string;
    base_price_multiplier?: number;
}

interface Props {
    localities: Locality[];
}

export default function Index({ localities }: Props) {
    return (
        <AppLayout>
            <Head title="Home Construction Services Across Lucknow" />
            <PageBanner
                title="Home Construction Services Across Lucknow"
                subtitle="Explore turnkey home construction, architecture, approvals, interiors and renovation services in your preferred Lucknow locality."
                bannerImage="/uploads/images/bcrumb-banner.jpg"
                items={[{ label: "Lucknow" }]}
            />
            <section className="relative overflow-hidden bg-[#FDFAF5]">
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D9E2F3]" />
                <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#F4E6D8]" />

                <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="inline-flex rounded-full   px-5 py-2 text-sm font-bold uppercase tracking-[0.25em] text-[#C4623A]">
                            Lucknow Area Pages
                        </span>
                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#1C1C1C] md:text-6xl">
                            Home Construction Services Across Lucknow
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-[#6B6560]">
                            Explore turnkey home construction, architecture,
                            approvals, interiors and renovation services in your
                            preferred Lucknow locality.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/quote"
                                className="rounded-md bg-[#1F4E79] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#163a5b]"
                            >
                                Get Free Quote
                            </Link>

                            <Link
                                href="/cost-calculator"
                                className="rounded-md border border-[#1F4E79] px-6 py-3 text-sm font-semibold text-[#1F4E79] transition hover:bg-[#1F4E79] hover:text-white"
                            >
                                Calculate Cost
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <span className="text-sm font-semibold uppercase tracking-wider text-[#C4623A]">
                                Service Areas
                            </span>

                            <h2 className="mt-2 text-3xl font-bold text-[#1C1C1C]">
                                Choose Your Locality
                            </h2>

                            <p className="mt-3 max-w-2xl text-[#6B6560]">
                                Select an area to see construction services,
                                estimated cost guidance and nearby completed
                                projects.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-[#FDFAF5] px-5 py-4 text-sm text-[#6B6560]">
                            <strong className="text-[#1C1C1C]">
                                {localities.length}
                            </strong>{" "}
                            active service areas
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {localities.map((locality) => (
                            <Link
                                key={locality.id}
                                href={`/lucknow/${locality.slug}`}
                                className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#1F4E79] hover:shadow-xl"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D9E2F3] text-xl font-bold text-[#1F4E79] transition group-hover:bg-[#1F4E79] group-hover:text-white">
                                            {locality.name.charAt(0)}
                                        </div>

                                        <h3 className="text-xl font-bold text-[#1C1C1C]">
                                            {locality.name}
                                        </h3>

                                        <p className="mt-2 text-sm text-[#6B6560]">
                                            Home construction services in{" "}
                                            {locality.name}
                                            {locality.city
                                                ? `, ${locality.city}`
                                                : ""}
                                            .
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-[#FDFAF5] px-3 py-1 text-xs font-semibold text-[#C4623A]">
                                        Lucknow
                                    </span>
                                </div>

                                <div className="mt-6 border-t border-gray-100 pt-5">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[#6B6560]">
                                            Cost factor
                                        </span>

                                        <span className="font-semibold text-[#1C1C1C]">
                                            {locality.base_price_multiplier
                                                ? `${locality.base_price_multiplier}x`
                                                : "Area based"}
                                        </span>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-sm font-semibold text-[#1F4E79]">
                                            View locality page
                                        </span>

                                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FDFAF5] text-[#1F4E79] transition group-hover:bg-[#1F4E79] group-hover:text-white">
                                            →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {localities.length === 0 && (
                        <div className="rounded-3xl border border-dashed border-gray-300 bg-[#FDFAF5] p-10 text-center">
                            <h3 className="text-xl font-bold text-[#1C1C1C]">
                                No localities found
                            </h3>
                            <p className="mt-2 text-[#6B6560]">
                                Please add active localities from the admin
                                panel.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section className="bg-[#1F4E79] py-16 text-white">
                <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold md:text-4xl">
                        Not sure which locality cost applies to your plot?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-blue-100">
                        Share your plot location and our home advisor will help
                        you understand construction cost, approval process and
                        timeline.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/quote"
                            className="rounded-full bg-[#D4A853] px-7 py-3 text-sm font-bold text-[#1C1C1C] transition hover:bg-white"
                        >
                            Talk to Home Advisor
                        </Link>

                        <Link
                            href="/contact"
                            className="rounded-full border border-white/50 px-7 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#1F4E79]"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
