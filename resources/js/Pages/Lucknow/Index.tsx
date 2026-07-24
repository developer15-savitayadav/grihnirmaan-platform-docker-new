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
                        <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-[#1C1C1C] md:text-5xll">
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

            <section className="relative overflow-hidden bg-[#FDFAF5] py-20 lg:py-28">
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* ─── Header ─────────────────────────────── */}
                    <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-[#C4623A]">
                               
                            </span>
                            <span className="inline-flex rounded-full   px-5 py-2 text-sm font-bold uppercase tracking-[0.25em] text-[#C4623A]">
                                Lucknow Registered Service Areas
                            </span>
                            <h2 className=" mt-6 font-display text-4xl font-bold leading-tight text-[#1C1C1C] md:text-5xll">
                                Choose your locality.
                            </h2>

                            <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#6B6560]">
                                Every card below is a live service licence —
                                pricing, crews and approval contacts are already
                                set up on that ground.
                            </p>
                        </div>

                        <div className="flex items-baseline gap-3 self-start md:self-end">
                            <span className="font-serif text-5xl font-bold leading-none text-[#1F4E79]">
                                {String(localities.length).padStart(2, "0")}
                            </span>
                            <span className="max-w-[7rem] text-xs font-semibold uppercase leading-tight tracking-wider text-[#6B6560]">
                                localities on record
                            </span>
                        </div>
                    </div>

                    {/* ─── Licence cards ─────────────────────────────── */}
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {localities.map((locality, index) => {
                            const regNo = `LKO-${String(index + 1).padStart(2, "0")}`;

                            return (
                                <Link
                                    key={locality.id}
                                    href={`/lucknow/${locality.slug}`}
                                    className="group relative block"
                                >
                                    {/* Card body */}
                                    <div className="relative overflow-hidden rounded-[4px] bg-white shadow-[0_1px_2px_rgba(28,28,28,0.06)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_40px_rgba(31,78,121,0.14)]">
                                        {/* Corner seal */}
                                        <div
                                            className="absolute -right-8 -top-8 flex h-20 w-20 rotate-45 items-end justify-center bg-[#1F4E79] pb-2.5 transition-transform duration-300 group-hover:-rotate-[35deg]"
                                            aria-hidden="true"
                                        >
                                            <span className="rotate-[-45deg] font-serif text-sm font-bold text-white group-hover:rotate-[35deg]">
                                                {locality.name.charAt(0)}
                                            </span>
                                        </div>

                                        {/* Top block */}
                                        <div className="px-7 pb-6 pt-8">
                                            <p className="font-mono text-[11px] font-semibold tracking-wider text-[#6B6560]">
                                                REG. NO. {regNo}
                                            </p>

                                            <h3 className="mt-3 pr-6 font-serif text-2xl font-bold leading-tight text-[#1C1C1C] transition-colors group-hover:text-[#1F4E79]">
                                                {locality.name}
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-[#6B6560]">
                                                Construction services active in{" "}
                                                {locality.name}
                                                {locality.city
                                                    ? `, ${locality.city}`
                                                    : ""}
                                                .
                                            </p>
                                        </div>

                                        {/* Perforated tear line */}
                                        <div className="relative">
                                            <div
                                                className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#1C1C1C]/12"
                                                aria-hidden="true"
                                            />
                                            <div
                                                className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#FDFAF5]"
                                                aria-hidden="true"
                                            />
                                            <div
                                                className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#FDFAF5]"
                                                aria-hidden="true"
                                            />
                                        </div>

                                        {/* Bottom block — stats + CTA */}
                                        <div className="flex items-center justify-between px-7 py-5">
                                            <div>
                                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6B6560]">
                                                    Cost factor
                                                </p>
                                                <p className="mt-0.5 font-mono text-lg font-bold text-[#1C1C1C]">
                                                    {locality.base_price_multiplier
                                                        ? `${locality.base_price_multiplier}×`
                                                        : "—"}
                                                </p>
                                            </div>

                                            <span className="flex items-center gap-1.5 text-sm font-semibold text-[#C4623A]">
                                                View licence
                                                <svg
                                                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 12h14m0 0l-6-6m6 6l-6 6"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Ground shadow accent, offset card edge */}
                                    <div
                                        className="absolute inset-x-3 -bottom-2 -z-10 h-full rounded-[4px] bg-[#1F4E79]/[0.06] transition-transform duration-300 group-hover:translate-y-1"
                                        aria-hidden="true"
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    {localities.length === 0 && (
                        <div className="mt-4 rounded-2xl border border-dashed border-[#1C1C1C]/15 bg-white/60 p-12 text-center">
                            <h3 className="font-serif text-xl font-bold text-[#1C1C1C]">
                                No localities on record yet
                            </h3>
                            <p className="mt-2 text-sm text-[#6B6560]">
                                Add active localities from the admin panel to
                                open this register.
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
                            className="rounded-md bg-[#D4A853] px-7 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-black"
                        >
                            Talk to Home Advisor
                        </Link>

                        <Link
                            href="/contact"
                            className="rounded-md border border-white/50 px-7 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-black"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
