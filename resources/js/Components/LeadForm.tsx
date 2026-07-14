import { useState } from 'react';
import { useLeadSubmit } from '@/Hooks/useLeadSubmit';

export default function LeadForm({ source = 'website', serviceInterest = null }) {
    const { submitLead, loading, error, success } = useLeadSubmit();

    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        source,
        service_interest: serviceInterest,
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitLead(form);

        setForm({
            name: '',
            phone: '',
            email: '',
            message: '',
            source,
            service_interest: serviceInterest,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                Get Free Quote
            </h3>

            {success && (
                <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    Your request has been submitted successfully.
                </div>
            )}

            {error && (
                <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                    required
                />

                <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                    required
                />

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />

                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirement"
                    rows="4"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-[#1F4E79] px-5 py-3 font-semibold text-white hover:bg-[#163a5b] disabled:opacity-60"
                >
                    {loading ? 'Submitting...' : 'Submit Request'}
                </button>
            </div>
        </form>
    );
}
