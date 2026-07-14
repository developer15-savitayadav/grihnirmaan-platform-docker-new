import AppLayout from '@/Layouts/AppLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calculator, ShieldCheck, Hammer, Compass } from 'lucide-react';

export default function Welcome({ auth }: PageProps) {
    return (
        <AppLayout>
            <Head title="Build the home you deserve — GrihNirmaan" />

            {/* ─── Hero ──────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-cream">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                >
                    <div className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-brand-blue-light/60 blur-3xl" />
                    <div className="absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-gold-sage/20 blur-3xl" />
                </div>

                <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
                    <div>
                        <p className="font-body text-sm font-semibold uppercase tracking-widest text-terracotta">
                            Home Construction · Done Right
                        </p>
                        <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-brand-blue sm:text-5xl lg:text-6xl">
                            Build the home <br className="hidden sm:block" />
                            <span className="text-terracotta">you deserve.</span>
                        </h1>
                        <p className="mt-5 max-w-xl font-body text-base text-muted-gray sm:text-lg">
                            GrihNirmaan is your trusted end-to-end partner for
                            home construction across India — transparent
                            pricing, on-time delivery, world-class quality.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="/calculator"
                                className="inline-flex items-center gap-2 rounded-md bg-terracotta px-6 py-3 font-body text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-terracotta/90 sm:text-base"
                            >
                                <Calculator className="h-5 w-5" />
                                Get Your Cost Estimate
                            </Link>
                            <Link
                                href="/projects"
                                className="inline-flex items-center justify-center rounded-md border border-brand-blue/20 bg-white px-6 py-3 font-body text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue-light sm:text-base"
                            >
                                See Our Work
                            </Link>
                        </div>

                        {/* Trust signals */}
                        <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-brand-blue/10 pt-6 text-left">
                            {[
                                { v: '500+', l: 'Homes Built' },
                                { v: '15+', l: 'Cities Served' },
                                { v: '4.9★', l: 'Client Rating' },
                            ].map((s) => (
                                <div key={s.l}>
                                    <dt className="font-display text-2xl font-bold text-brand-blue sm:text-3xl">
                                        {s.v}
                                    </dt>
                                    <dd className="mt-1 font-body text-xs text-muted-gray sm:text-sm">
                                        {s.l}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* Visual placeholder */}
                    <div className="relative">
                        <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-brand-blue shadow-2xl ring-1 ring-brand-blue/10">
                            <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-blue via-accent-blue to-brand-blue p-10 text-center">
                                <div>
                                    <span className="grid h-20 w-20 place-items-center rounded-2xl bg-cream/10 font-display text-3xl font-bold text-cream backdrop-blur">
                                        G
                                    </span>
                                    <p className="mt-6 font-display text-2xl font-semibold text-cream">
                                        Hero image goes here
                                    </p>
                                    <p className="mt-2 font-body text-sm text-cream/70">
                                        (1080×1350 recommended)
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Floating gold-sage card */}
                        <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-gold-sage px-5 py-4 font-body text-sm font-semibold text-charcoal shadow-xl sm:block">
                            On-time. On-budget. Always.
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Feature strip ─────────────────────────────────────── */}
            <section className="border-y border-brand-blue/10 bg-white">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
                    {[
                        {
                            Icon: Compass,
                            title: 'Architecture',
                            text: 'Award-winning design tailored to your plot and lifestyle.',
                        },
                        {
                            Icon: Hammer,
                            title: 'Construction',
                            text: 'Vetted crews, ISI-certified materials, weekly progress photos.',
                        },
                        {
                            Icon: ShieldCheck,
                            title: '10-Year Warranty',
                            text: 'Structural guarantee + 1-year free defect cover.',
                        },
                        {
                            Icon: Calculator,
                            title: 'Transparent Pricing',
                            text: 'Itemised quotes, zero hidden costs, milestone-based payments.',
                        },
                    ].map(({ Icon, title, text }) => (
                        <div key={title}>
                            <div className="grid h-10 w-10 place-items-center rounded-md bg-brand-blue-light text-brand-blue">
                                <Icon className="h-5 w-5" />
                            </div>
                            <h3 className="mt-4 font-display text-lg font-semibold text-charcoal">
                                {title}
                            </h3>
                            <p className="mt-1 font-body text-sm text-muted-gray">
                                {text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── CTA strip ─────────────────────────────────────────── */}
            <section className="bg-charcoal">
                <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:px-8">
                    <div>
                        <h2 className="font-display text-2xl font-bold text-cream sm:text-3xl">
                            Ready to start building?
                        </h2>
                        <p className="mt-2 font-body text-sm text-cream/70 sm:text-base">
                            Get a free, no-obligation cost estimate in under 2
                            minutes.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/calculator"
                            className="inline-flex items-center gap-2 rounded-md bg-gold-sage px-6 py-3 font-body text-sm font-semibold text-charcoal hover:bg-gold-sage/90"
                        >
                            <Calculator className="h-5 w-5" />
                            Cost Calculator
                        </Link>
                        <Link
                            href={auth.user ? '/portal/dashboard' : '/login'}
                            className="inline-flex items-center rounded-md border border-cream/20 px-6 py-3 font-body text-sm font-semibold text-cream hover:bg-cream/10"
                        >
                            {auth.user ? 'Go to Dashboard' : 'Sign In'}
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
