import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Book() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <AppLayout>
            <Head title="Book Free Consultation" />

            <section className="bg-[#FDFAF5] py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <p className="font-body text-sm font-bold uppercase tracking-widest text-[#C4623A]">
                            Free Consultation
                        </p>

                        <h1 className="mt-3 font-display text-4xl font-bold text-[#1C1C1C] sm:text-5xl">
                            Book Your Construction Consultation
                        </h1>

                        <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-7 text-[#6B6560]">
                            Choose your preferred date and time to talk with GrihNirmaan experts about plot, budget, design and construction planning.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-[34px] border border-[#1F4E79]/10 bg-white p-3 shadow-2xl sm:p-5">
                        <div
                            className="calendly-inline-widget"
                            data-url="https://calendly.com/developer15-nextupgrad/30min?hide_gdpr_banner=1&primary_color=1F4E79&text_color=1C1C1C"
                            style={{
                                minWidth: '320px',
                                height: '850px',
                            }}
                        />
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
