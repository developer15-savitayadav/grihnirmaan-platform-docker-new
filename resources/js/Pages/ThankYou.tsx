import PageBanner from '@/Components/Breadcrumb';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { Calculator, CheckCircle, Home, Phone } from 'lucide-react';

export default function ThankYou() {
    return (
        <AppLayout>
            <Head title="Thank You — GrihNirmaan" />

            <PageBanner
                title="Thank You"
                subtitle="Your request has been successfully submitted."
                bannerImage="/uploads/images/bcrumb-banner.jpg"
                items={[{ label: 'Thank You' }]}
            />

            <section className="relative overflow-hidden bg-[#FDFAF5] py-16 sm:py-20">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D9E2F3] blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#C4623A]/10 blur-3xl" />

                <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-14 w-14 text-green-600" />
                    </div>

                    <h1 className="mt-8 text-4xl font-bold text-[#1F4E79] sm:text-5xl">
                        Thank You!
                    </h1>

                    <p className="mt-5 text-lg leading-8 text-[#6B6560]">
                        Your request has been successfully submitted. Our Home
                        Advisor will contact you within 30 minutes.
                    </p>

                    <div className="mt-10 grid gap-4 sm:grid-cols-3">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1F4E79] px-5 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#163a5b]"
                        >
                            <Home className="h-5 w-5" />
                            Back Home
                        </Link>

                        <Link
                            href="/cost-calculator"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#1F4E79] bg-white px-5 py-4 text-sm font-semibold text-[#1F4E79] transition hover:-translate-y-1 hover:bg-[#D9E2F3]"
                        >
                            <Calculator className="h-5 w-5" />
                            Calculate Cost
                        </Link>

                          <a
                            href="tel:+919999911111"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#C4623A] px-5 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#aa5230]"
                        >
                            <Phone className="h-5 w-5" />
                            Call Now
                        </a>
                    </div>

                    <div className="mt-10 rounded-3xl border border-[#D9E2F3] bg-white p-6 text-left shadow-sm">
                        <h2 className="text-lg font-bold text-[#1C1C1C]">
                            What happens next?
                        </h2>

                        <ol className="mt-4 space-y-3 text-sm text-[#6B6560]">
                            <li>1. Our advisor reviews your requirement.</li>
                            <li>2. You receive a quick consultation call.</li>
                            <li>3. We suggest the right service and estimate.</li>
                        </ol>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
