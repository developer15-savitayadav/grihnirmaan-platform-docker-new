import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PageBanner from '@/Components/Breadcrumb';

import {
ChevronRight,
Mail,
MapPin, 
Phone,
Send,
} from 'lucide-react';
import { FormEvent } from 'react';

type ContactForm = {
name: string;
phone: string;
email: string;
subject: string;
service_interest: string;
message: string;
source: string;
};

export default function Contact() {
const {
data,
setData,
post,
processing,
errors,
reset,
recentlySuccessful,
} = useForm<ContactForm>({
    name: '',
    phone: '',
    email: '',
    subject: '',
    service_interest: '',
    message: '',
    source: 'contact-page',
    });

    const submitInquiry = (e: FormEvent) => {
    e.preventDefault();

    post(route('contact.submit'), {
    preserveScroll: true,
    onSuccess: () => reset(),
    });
    };

    return (
    <AppLayout>

        <Head title="Contact Us | GrihNirmaan" />

        <PageBanner title="Contact Us" subtitle="Get in touch with our team for any inquiries or assistance."
            bannerImage="/uploads/images/bcrumb-banner.jpg" items={[{ label: 'Contact' }]} />

        <section className="relative overflow-hidden bg-[#fdfaf5] py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                    {/* Left Content */}
                    <div>
                        <p className="font-body text-sm font-semibold uppercase tracking-widest text-terracotta">
                            Get In Touch
                        </p>

                        <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-[#1C1C1C] md:text-6xl">
                            Start Your Home Construction Journey Today
                        </h1>

                        <p className="mt-5 max-w-xl font-body text-base leading-8 text-muted-gray">
                            Whether you're planning a new home, exploring design ideas, estimating construction costs,
                            or seeking expert guidance, our team is here to help at every step.
                        </p>

                        <div className="mt-10 space-y-5">
                            <a href="tel:+919999911111"
                                className="flex items-center gap-4 rounded-2xl bg-white p-5 contact-info-content  ">
                                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-blue text-white">
                                    <Phone className="h-5 w-5" />
                                </span>

                                <div>
                                    <p className="text-sm font-semibold text-muted-gray">
                                        Call Us
                                    </p>
                                    <p className=" text-xl font-bold text-charcoal">
                                        +91 99999 11111
                                    </p>
                                </div>
                            </a>

                            <a href="mailto:info@grihnirmaan.com"
                                className="flex items-center gap-4 rounded-2xl bg-white p-5 contact-info-content ">
                                <span className="grid h-12 w-12 place-items-center rounded-xl bg-terracotta text-white">
                                    <Mail className="h-5 w-5" />
                                </span>

                                <div>
                                    <p className="text-sm font-semibold text-muted-gray">
                                        Email Us
                                    </p>
                                    <p className=" text-xl font-bold text-charcoal">
                                        info@grihnirmaan.com
                                    </p>
                                </div>
                            </a>

                            <div className="flex items-start gap-4 rounded-2xl bg-white p-5 contact-info-content">
                                <span
                                    className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-sage text-charcoal">
                                    <MapPin className="h-5 w-5" />
                                </span>

                                <div>
                                    <p className="text-sm font-semibold text-muted-gray">
                                        Office Address
                                    </p>
                                    <p className="font-body text-base leading-7 text-charcoal">
                                        Lucknow, Uttar Pradesh, India
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form */}
                    <form onSubmit={submitInquiry} className="rounded-[32px] bg-white p-6 contact-form sm:p-8 lg:p-10">
                        <h2 className=" text-3xl font-bold text-charcoal">
                            Send Inquiry
                        </h2>

                        <p className="mt-2 font-body text-sm text-muted-gray">
                            Fill the form and we’ll get back to you soon.
                        </p>

                        <div className="mt-8 grid gap-5 sm:grid-cols-2">
                            <div>
                                <input type="text" value={data.name} onChange={(e)=>
                                setData('name', e.target.value)
                                }
                                placeholder="Your Name *"
                                className="h-14 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-brand-blue"
                                />
                                {errors.name && (
                                <p className="mt-1 text-xs text-terracotta">
                                    {errors.name}
                                </p>
                                )}
                            </div>

                            <div>
                                <input type="tel" value={data.phone} onChange={(e)=>
                                setData('phone', e.target.value)
                                }
                                placeholder="Phone Number *"
                                className="h-14 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-brand-blue"
                                />
                                {errors.phone && (
                                <p className="mt-1 text-xs text-terracotta">
                                    {errors.phone}
                                </p>
                                )}
                            </div>

                            <div>
                                <input type="email" value={data.email} onChange={(e)=>
                                setData('email', e.target.value)
                                }
                                placeholder="Email Address"
                                className="h-14 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-brand-blue"
                                />
                                {errors.email && (
                                <p className="mt-1 text-xs text-terracotta">
                                    {errors.email}
                                </p>
                                )}
                            </div>

                            <div>
                                <select value={data.service_interest} onChange={(e)=>
                                    setData(
                                    'service_interest',
                                    e.target.value,
                                    )
                                    }
                                    className="h-14 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-brand-blue"
                                    >
                                    <option value="">
                                        Select Service
                                    </option>
                                    <option value="Civil Construction">
                                        Civil Construction
                                    </option>
                                    <option value="Architecture & Design">
                                        Architecture & Design
                                    </option>
                                    <option value="Interior Design">
                                        Interior Design
                                    </option>
                                    <option value="Government Approvals">
                                        Government Approvals
                                    </option>
                                    <option value="Home Loan">
                                        Home Loan
                                    </option>
                                </select>
                            </div>

                            <div className="sm:col-span-2">
                                <input type="text" value={data.subject} onChange={(e)=>
                                setData('subject', e.target.value)
                                }
                                placeholder="Subject"
                                className="h-14 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-brand-blue"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <textarea value={data.message} onChange={(e)=>
                                            setData('message', e.target.value)
                                        }
                                        placeholder="Write your message..."
                                        rows={5}
                                        className="w-full resize-none rounded-xl border border-gray-200 px-4 py-4 text-sm outline-none focus:border-brand-blue"
                                    />

                                    {errors.message && (
                                        <p className="mt-1 text-xs text-terracotta">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 py-4 font-body text-sm font-bold text-white transition hover:bg-terracotta disabled:opacity-60"
                            >
                                {processing ? 'Sending...' : 'Submit Inquiry'}
                                <Send className="h-4 w-4" />
                            </button>

                            {recentlySuccessful && (
                                <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-center text-sm font-semibold text-green-700">
                                    ✓ Your inquiry has been submitted successfully.
                                </p>
                            )}

                            <p className="mt-5 text-center text-xs text-muted-gray">
                                Need instant help?{' '}
                                <Link
                                    href="/quote"
                                    className="font-semibold text-terracotta"
                                >
                                    Get Free Quote
                                    <ChevronRight className="ml-1 inline h-3 w-3" />
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
        </section>
        </AppLayout>
    );
}
