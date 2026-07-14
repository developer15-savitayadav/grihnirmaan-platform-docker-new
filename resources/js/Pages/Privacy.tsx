import PageBanner from '@/Components/Breadcrumb';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { Lock, Mail, ShieldCheck, UserCheck } from 'lucide-react';

const sections = [
    {
        icon: UserCheck,
        title: 'Information We Collect',
        text: 'We may collect your name, phone number, email, locality, project requirements and details submitted through our website forms.',
    },
    {
        icon: ShieldCheck,
        title: 'How We Use Information',
        text: 'We use your information to provide estimates, respond to inquiries, send quotations, share project updates and improve our services.',
    },
    {
        icon: Lock,
        title: 'Data Protection',
        text: 'We use reasonable security measures to protect your personal information from unauthorized access, misuse or disclosure.',
    },
    {
        icon: Mail,
        title: 'Contact Us',
        text: 'For questions about this Privacy Policy, you can contact our support team through the contact page.',
    },
];

export default function Privacy() {
    return (
        <AppLayout>
            <Head title="Privacy Policy — GrihNirmaan" />

            <PageBanner
                title="Privacy Policy"
                subtitle="Your privacy is important to us."
                bannerImage="/uploads/images/bcrumb-banner.jpg"
                items={[{ label: 'Privacy Policy' }]}
            />

            <section className="bg-[#FDFAF5] py-16 sm:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 max-w-3xl">
                        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C4623A]">
                            Privacy & Data
                        </span>

                        <h1 className="mt-3 text-4xl font-bold text-[#1F4E79] sm:text-5xl">
                            We protect your information with care.
                        </h1>

                        <p className="mt-5 text-base leading-8 text-[#6B6560]">
                            GrihNirmaan values your privacy and is committed to
                            protecting the personal information you share with
                            us while using our website and services.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {sections.map((section) => {
                            const Icon = section.icon;

                            return (
                                <div
                                    key={section.title}
                                    className="rounded-3xl border border-[#D9E2F3] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D9E2F3] text-[#1F4E79]">
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

                    <div className="mt-10 rounded-3xl bg-[#1F4E79] p-8 text-white sm:p-10">
                        <h2 className="text-2xl font-bold">
                            Need help with your data or privacy request?
                        </h2>

                        <p className="mt-3 max-w-3xl text-white/75">
                            Reach out to our team and we will help you with any
                            privacy-related questions.
                        </p>

                        <Link
                            href="/contact"
                            className="mt-6 inline-flex rounded-full bg-[#D4A853] px-6 py-3 text-sm font-semibold text-[#1C1C1C] transition hover:bg-white"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
