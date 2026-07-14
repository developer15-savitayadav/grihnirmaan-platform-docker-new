import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PageBanner from '@/Components/Breadcrumb';

import {
    CheckCircle,
    Phone,
    Mail,
    MapPin,
    Home,
    Building2,
    Send,
} from 'lucide-react';

export default function Quote() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        locality: '',
        plot_size_sqft: '',
        service_interest: '',
        finish_level: 'standard',
        message: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/quote', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                alert('Quote request submitted successfully');
            },
        });
    };

    const inputClass =
        'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#1F4E79] focus:ring-4 focus:ring-[#D9E2F3]';

    return (
        <AppLayout>
            <Head title="Get Free Quote" />

            <PageBanner
                title="Get Free Quote"
                subtitle="Receive a customized estimate for your dream home."
                bannerImage="/uploads/images/bcrumb-banner.jpg"
                items={[{ label: 'Get Free Quote' }]}
            />

            <section className="relative min-h-screen overflow-hidden bg-[#FDFAF5] py-14">
                <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#D9E2F3] blur-3xl" />
                <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#D4A853]/30 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4">
                    <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                        <motion.div
                            initial={{ opacity: 0, y: 35 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1F4E79] shadow-sm">
                                Free Home Construction Consultation
                            </span>

                            <h1 className="mt-6 text-4xl font-bold leading-tight text-[#1C1C1C] md:text-6xl">
                                Get Your Dream Home Quote in Lucknow
                            </h1>

                            <p className="mt-5 max-w-xl text-lg leading-8 text-[#6B6560]">
                                From Bhumi Poojan to Grih Pravesh, share your
                                requirement and our home advisor will contact
                                you with a clear estimate.
                            </p>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {[
                                    'Transparent pricing',
                                    'Government approval support',
                                    'Brand partner materials',
                                    'End-to-end construction',
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"
                                    >
                                        <CheckCircle className="h-5 w-5 text-[#2E7D32]" />
                                        <span className="text-sm font-medium text-[#1C1C1C]">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 rounded-3xl bg-[#1F4E79] p-6 text-white shadow-xl">
                                <h3 className="text-xl font-bold">
                                    What you will receive
                                </h3>

                                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-2xl bg-white/10 p-4">
                                        Cost Estimate
                                    </div>
                                    <div className="rounded-2xl bg-white/10 p-4">
                                        Timeline Plan
                                    </div>
                                    <div className="rounded-2xl bg-white/10 p-4">
                                        Material Guidance
                                    </div>
                                    <div className="rounded-2xl bg-white/10 p-4">
                                        Advisor Call
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 35 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="rounded-[2rem] border border-white bg-white/90 p-5 shadow-2xl backdrop-blur md:p-8"
                        >
                            <div className="mb-6 rounded-3xl bg-gradient-to-r from-[#1F4E79] to-[#2E75B6] p-6 text-white">
                                <h2 className="text-2xl font-bold">
                                    Request Free Quote
                                </h2>
                                <p className="mt-2 text-sm text-white/80">
                                    Fill details below. Our team will call you
                                    within 30 minutes.
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-5">
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <Home className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData('name', e.target.value)
                                                }
                                                placeholder="Enter full name"
                                                className={`${inputClass} pl-11`}
                                            />
                                        </div>
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                                            <input
                                                type="text"
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData('phone', e.target.value)
                                                }
                                                placeholder="10 digit mobile"
                                                className={`${inputClass} pl-11`}
                                            />
                                        </div>
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData('email', e.target.value)
                                                }
                                                placeholder="Enter email"
                                                className={`${inputClass} pl-11`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold">
                                            Locality
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                                            <select
                                                value={data.locality}
                                                onChange={(e) =>
                                                    setData('locality', e.target.value)
                                                }
                                                className={`${inputClass} pl-11`}
                                            >
                                                <option value="">Select locality</option>
                                                <option value="Gomti Nagar">
                                                    Gomti Nagar
                                                </option>
                                                <option value="Indira Nagar">
                                                    Indira Nagar
                                                </option>
                                                <option value="Aliganj">
                                                    Aliganj
                                                </option>
                                                <option value="Jankipuram">
                                                    Jankipuram
                                                </option>
                                                <option value="Hazratganj">
                                                    Hazratganj
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold">
                                            Plot Size Sq Ft
                                        </label>
                                        <input
                                            type="number"
                                            value={data.plot_size_sqft}
                                            onChange={(e) =>
                                                setData(
                                                    'plot_size_sqft',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Example: 1200"
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold">
                                            Service Interested In
                                        </label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                                            <select
                                                value={data.service_interest}
                                                onChange={(e) =>
                                                    setData(
                                                        'service_interest',
                                                        e.target.value
                                                    )
                                                }
                                                className={`${inputClass} pl-11`}
                                            >
                                                <option value="">Select service</option>
                                                <option value="civil-construction">
                                                    Civil Construction
                                                </option>
                                                <option value="architecture-design">
                                                    Architecture & Design
                                                </option>
                                                <option value="interior-design">
                                                    Interior Design
                                                </option>
                                                <option value="government-approvals">
                                                    Government Approvals
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-3 block text-sm font-semibold">
                                        Finish Level
                                    </label>

                                    <div className="grid gap-3 sm:grid-cols-3">
                                        {[
                                            ['budget', 'Budget'],
                                            ['standard', 'Standard'],
                                            ['premium', 'Premium'],
                                        ].map(([value, label]) => (
                                            <button
                                                type="button"
                                                key={value}
                                                onClick={() =>
                                                    setData('finish_level', value)
                                                }
                                                className={`rounded-2xl border p-4 text-left transition ${
                                                    data.finish_level === value
                                                        ? 'border-[#1F4E79] bg-[#1F4E79] text-white shadow-lg'
                                                        : 'border-slate-200 bg-white hover:border-[#1F4E79]'
                                                }`}
                                            >
                                                <span className="block font-bold">
                                                    {label}
                                                </span>
                                                <span className="mt-1 block text-xs opacity-80">
                                                    {value === 'budget'
                                                        ? 'Basic finish'
                                                        : value === 'standard'
                                                          ? 'Most popular'
                                                          : 'Luxury finish'}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={data.message}
                                        onChange={(e) =>
                                            setData('message', e.target.value)
                                        }
                                        placeholder="Tell us about your dream home..."
                                        className={inputClass}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#C4623A] px-6 py-4 text-lg font-bold text-white shadow-xl transition hover:bg-[#a84f2f] disabled:opacity-60"
                                >
                                    {processing ? 'Submitting...' : 'Get Free Quote'}
                                    <Send className="h-5 w-5 transition group-hover:translate-x-1" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
