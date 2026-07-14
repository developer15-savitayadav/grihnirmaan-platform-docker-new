import PageBanner from '@/Components/Breadcrumb';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { AlertCircle, ClipboardCheck, FileText, RefreshCw } from 'lucide-react';

const sections = [
{
icon: ClipboardCheck,
title: 'Services',
text: 'All estimates, consultations and pricing shown on this website are indicative and subject to final project
evaluation.',
},
{
icon: FileText,
title: 'User Responsibilities',
text: 'Users must provide accurate information, avoid misuse of website services and respect intellectual property
rights.',
},
{
icon: AlertCircle,
title: 'Limitation of Liability',
text: 'GrihNirmaan shall not be liable for indirect or consequential losses arising from website usage or estimate
interpretation.',
},
{
icon: RefreshCw,
title: 'Changes to Terms',
text: 'We reserve the right to modify these terms at any time. Continued use of the website indicates acceptance of
updated terms.',
},
];

export default function Terms() {
return (
<AppLayout>

    <Head title="Terms of Service — GrihNirmaan" />

    <PageBanner title="Terms of Service" subtitle="Please read our terms and conditions carefully."
        bannerImage="/uploads/images/bcrumb-banner.jpg" items={[{ label: 'Terms of Service' }]} />

    <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C4623A]">
                    Legal Terms
                </span>

                <h1 className="mt-3 text-4xl font-bold text-[#1F4E79] sm:text-5xl">
                    Terms for using GrihNirmaan services.
                </h1>

                <p className="mt-5 text-base leading-8 text-[#6B6560]">
                    By using the GrihNirmaan website, submitting forms,
                    requesting quotations or using our calculators, you
                    agree to these terms and conditions.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {sections.map((section) => {
                const Icon = section.icon;

                return (
                <div key={section.title}
                    className="rounded-3xl border border-gray-200 bg-[#FDFAF5] p-7 transition hover:-translate-y-1 hover:border-[#1F4E79] hover:shadow-xl">
                    <div
                        className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D9E2F3] text-[#1F4E79]">
                        <Icon className="h-6 w-6" />
                    </div>

                    <h2 className="text-xl font-bold text-[#1C1C1C]">
                        {section.title}
                    </h2>

                    <p className="mt-3 leading-7 text-[#6B6560]">
                        {section.text}
                    </p>
                </div>
                );
                })}
            </div>

            <div className="mt-10 rounded-3xl border border-[#D9E2F3] bg-[#FDFAF5] p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-[#1C1C1C]">
                    Questions about these terms?
                </h2>

                <p className="mt-3 max-w-3xl text-[#6B6560]">
                    Contact our team before using the service if you
                    need clarification about estimates, quotations or
                    project terms.
                </p>

                <Link href="/contact"
                    className="mt-6 inline-flex rounded-full bg-[#1F4E79] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163a5b]">
                Contact Us
                </Link>
            </div>
        </div>
    </section>
</AppLayout>
);
}
