import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const calculatorSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z
        .string()
        .min(1, 'Phone is required')
        .regex(/^[6-9]\d{9}$/, 'Enter valid 10 digit phone number'),
    email: z.string().email('Enter valid email').optional().or(z.literal('')),
    plot_size_sqft: z.string().min(1, 'Plot size is required'),
    area_unit: z.enum(['sqft', 'sqyard']),
    floors: z.string().min(1, 'Floor is required'),
    finish_level: z.enum(['budget', 'standard', 'premium']),
    locality: z.string().min(1, 'Locality is required'),
    addons: z.array(z.string()).default([]),
});

type FormData = z.infer<typeof calculatorSchema>;

type LocalityItem = {
    id: number;
    name: string;
    slug: string;
    base_price_multiplier: number;
};

type CostCalculatorProps = {
    localities: LocalityItem[];
};

const steps = ['Contact', 'Property', 'Options', 'Result'];

const addonOptions = [
    { value: 'modular_kitchen', label: 'Modular Kitchen', price: 350000 },
    { value: 'false_ceiling', label: 'False Ceiling', price: 180000 },
    { value: 'smart_home', label: 'Smart Home', price: 250000 },
    { value: 'solar', label: 'Solar System', price: 220000 },
    { value: 'home_theater', label: 'Home Theater', price: 400000 },
];

const floorOptions = [
    { value: '1', label: '1 Floor' },
    { value: '2', label: '2 Floors' },
    { value: '3', label: '3 Floors' },
    { value: '4', label: '4 Floors' },
    { value: '5', label: '5 Floors' },
];

export default function CostCalculator({ localities = [] }: CostCalculatorProps) {
    const [step, setStep] = useState(0);
    const [result, setResult] = useState<any>(null);
    const [leadId, setLeadId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(calculatorSchema),
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            plot_size_sqft: '',
            area_unit: 'sqft',
            floors: '1',
            finish_level: 'standard',
            locality: '',
            addons: [],
        },
    });

    const form = watch();

    const nextStep = async () => {
        let fields: (keyof FormData)[] = [];

        if (step === 0) {
            fields = ['name', 'phone', 'email'];
        }

        if (step === 1) {
            fields = ['plot_size_sqft', 'area_unit', 'locality', 'floors'];
        }

        const isValid = await trigger(fields);

        if (isValid) {
            setStep((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 0));
    };

    const handleAddonChange = (value: string) => {
        const currentAddons = form.addons || [];

        setValue(
            'addons',
            currentAddons.includes(value)
                ? currentAddons.filter((item) => item !== value)
                : [...currentAddons, value],
            { shouldValidate: true },
        );
    };

    const submitForm = async (data: FormData) => {
        if (loading) return;

        setLoading(true);
        setResult(null);
        setLeadId(null);

        try {
            const response = await axios.post('/api/cost-calculator', data);

            setResult(response.data.result);
            setLeadId(response.data.lead_id);
            setStep(3);
        } catch (error: any) {
            if (error.response?.status === 422) {
                const backendErrors = error.response.data.errors || {};

                Object.entries(backendErrors).forEach(([field, messages]) => {
                    setError(field as keyof FormData, {
                        type: 'server',
                        message: (messages as string[])[0],
                    });
                });
            } else {
                alert(error.response?.data?.message || 'Something went wrong.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <Head title="Cost Calculator" />

            <section className="bg-[#FDFAF5] px-4 py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 text-center">
                        <span className="inline-block rounded-full bg-[#D9E2F3] px-4 py-2 text-sm font-semibold text-[#1F4E79]">
                            Free Construction Estimate
                        </span>

                        <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-5xl">
                            Construction Cost Calculator
                        </h1>

                        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                            Calculate estimated home construction cost step by step.
                        </p>
                    </div>

                    <ProgressBar step={step} />

                    <div className="grid gap-8 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                                <form onSubmit={handleSubmit(submitForm)}>
                                    {step === 0 && (
                                        <div className="grid gap-5">
                                            <InputBox
                                                label="Name"
                                                registration={register('name')}
                                                error={errors.name?.message}
                                                placeholder="Enter your name"
                                            />

                                            <InputBox
                                                label="Phone"
                                                registration={register('phone')}
                                                error={errors.phone?.message}
                                                placeholder="9876543210"
                                            />

                                            <InputBox
                                                label="Email"
                                                type="email"
                                                registration={register('email')}
                                                error={errors.email?.message}
                                                placeholder="example@gmail.com"
                                            />
                                        </div>
                                    )}

                                    {step === 1 && (
                                        <div className="grid gap-5">
                                            <div className="grid gap-5 md:grid-cols-2">
                                                <InputBox
                                                    label="Plot Size"
                                                    type="number"
                                                    registration={register('plot_size_sqft')}
                                                    error={errors.plot_size_sqft?.message}
                                                    placeholder="Example: 1200"
                                                />

                                                <SelectBox
                                                    label="Area Unit"
                                                    registration={register('area_unit')}
                                                    error={errors.area_unit?.message}
                                                    options={[
                                                        { value: 'sqft', label: 'Sq Ft' },
                                                        { value: 'sqyard', label: 'Sq Yard' },
                                                    ]}
                                                />

                                                <SelectBox
    label="Locality"
    registration={register('locality')}
    error={errors.locality?.message}
    options={[
        { value: '', label: 'Select Locality' },
        ...localities.map((locality) => ({
            value: locality.slug,
            label: locality.name,
        })),
    ]}
/>
                                            </div>

                                            <div>
                                                <label className="mb-3 block text-sm font-semibold text-gray-700">
                                                    Floors
                                                </label>

                                                <div className="grid gap-3 md:grid-cols-5">
                                                    {floorOptions.map((floor) => (
                                                        <button
                                                            type="button"
                                                            key={floor.value}
                                                            onClick={() =>
                                                                setValue('floors', floor.value, {
                                                                    shouldValidate: true,
                                                                })
                                                            }
                                                            className={`rounded-xl border p-4 text-sm font-bold transition ${
                                                                form.floors === floor.value
                                                                    ? 'border-[#1F4E79] bg-[#D9E2F3] text-[#1F4E79]'
                                                                    : 'border-gray-200 bg-white text-gray-700 hover:border-[#1F4E79]'
                                                            }`}
                                                        >
                                                            {floor.label}
                                                        </button>
                                                    ))}
                                                </div>

                                                {errors.floors?.message && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {errors.floors.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="mb-3 block text-sm font-semibold text-gray-700">
                                                    Finish Level
                                                </label>

                                                <div className="grid gap-4 md:grid-cols-3">
                                                    {[
                                                        ['budget', 'Budget', 'Basic finish'],
                                                        ['standard', 'Standard', 'Best value'],
                                                        ['premium', 'Premium', 'Luxury finish'],
                                                    ].map(([value, title, text]) => (
                                                        <button
                                                            type="button"
                                                            key={value}
                                                            onClick={() =>
                                                                setValue(
                                                                    'finish_level',
                                                                    value as FormData['finish_level'],
                                                                    { shouldValidate: true },
                                                                )
                                                            }
                                                            className={`rounded-2xl border p-5 text-left transition ${
                                                                form.finish_level === value
                                                                    ? 'border-[#1F4E79] bg-[#D9E2F3]'
                                                                    : 'border-gray-200 bg-white hover:border-[#1F4E79]'
                                                            }`}
                                                        >
                                                            <h3 className="font-bold text-gray-900">
                                                                {title}
                                                            </h3>
                                                            <p className="mt-2 text-sm text-gray-600">
                                                                {text}
                                                            </p>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="mb-3 block text-sm font-semibold text-gray-700">
                                                    Optional Add-ons
                                                </label>

                                                <div className="grid gap-3 md:grid-cols-2">
                                                    {addonOptions.map((addon) => (
                                                        <label
                                                            key={addon.value}
                                                            className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-4 transition ${
                                                                form.addons?.includes(addon.value)
                                                                    ? 'border-[#1F4E79] bg-[#D9E2F3]/50'
                                                                    : 'border-gray-200 bg-white hover:border-[#1F4E79]'
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        form.addons?.includes(addon.value) ||
                                                                        false
                                                                    }
                                                                    onChange={() =>
                                                                        handleAddonChange(addon.value)
                                                                    }
                                                                />

                                                                <span className="text-sm font-medium text-gray-700">
                                                                    {addon.label}
                                                                </span>
                                                            </div>

                                                            <strong className="text-sm text-gray-900">
                                                                ₹{addon.price.toLocaleString('en-IN')}
                                                            </strong>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <ResultCard result={result} leadId={leadId} />
                                    )}

                                    <div className="mt-8 flex gap-4">
                                        {step > 0 && step < 3 && (
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className="w-full rounded-xl border border-gray-300 px-6 py-3 font-bold text-gray-700"
                                            >
                                                Back
                                            </button>
                                        )}

                                        {step < 2 && (
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                className="w-full rounded-xl bg-[#1F4E79] px-6 py-3 font-bold text-white"
                                            >
                                                Next
                                            </button>
                                        )}

                                        {step === 2 && (
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full rounded-xl bg-[#C4623A] px-6 py-3 font-bold text-white disabled:opacity-60"
                                            >
                                                {loading ? 'Calculating...' : 'Calculate Cost'}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <LivePreview form={form} localities={localities} />
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}

function ProgressBar({ step }: { step: number }) {
    return (
        <div className="mb-8 rounded-3xl bg-white p-5 shadow-sm">
            <div className="grid grid-cols-4 gap-3">
                {steps.map((item, index) => (
                    <div key={item}>
                        <div
                            className={`h-2 rounded-full ${
                                index <= step ? 'bg-[#1F4E79]' : 'bg-gray-200'
                            }`}
                        />
                        <p
                            className={`mt-2 text-center text-xs font-bold ${
                                index <= step ? 'text-[#1F4E79]' : 'text-gray-400'
                            }`}
                        >
                            {item}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function LivePreview({
    form,
    localities,
}: {
    form: FormData;
    localities: LocalityItem[];
}) {
    const selectedLocality = localities.find(
        (locality) => locality.slug === form.locality,
    );

    const selectedAddons = addonOptions.filter((addon) =>
        form.addons?.includes(addon.value),
    );

    const enteredArea = Number(form.plot_size_sqft || 0);
    const floors = Number(form.floors || 1);
    const unitLabel = form.area_unit === 'sqyard' ? 'sq yard' : 'sq ft';
    const plotAreaSqft =
        form.area_unit === 'sqyard' ? enteredArea * 9 : enteredArea;
    const builtAreaSqft = plotAreaSqft * floors;
    const displayBuiltArea = enteredArea * floors;

    const baseRateSqft =
        form.finish_level === 'budget'
            ? 1550
            : form.finish_level === 'premium'
              ? 2600
              : 1900;

    const localityMultiplier =
        Number(selectedLocality?.base_price_multiplier) || 1;

    const finalRateSqft = Math.round(baseRateSqft * localityMultiplier);
    const constructionCost = builtAreaSqft * finalRateSqft;

    const addonsTotal = selectedAddons.reduce((total, addon) => {
        return total + addon.price;
    }, 0);

    const subTotal = constructionCost + addonsTotal;
    const gst = Math.round(subTotal * 0.18);
    const estimate = subTotal + gst;

    const displayBaseRate =
        form.area_unit === 'sqyard' ? baseRateSqft * 9 : baseRateSqft;

    const displayFinalRate =
        form.area_unit === 'sqyard' ? finalRateSqft * 9 : finalRateSqft;

    return (
        <div className="sticky top-24 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-gray-900">Live Preview</h2>

            <div className="mt-6 space-y-3">
                <InfoRow label="Plot Size" value={`${enteredArea} ${unitLabel}`} />
                <InfoRow
                    label="Built-up Area"
                    value={`${displayBuiltArea} ${unitLabel}`}
                />
                <InfoRow label="Floors" value={`${form.floors} Floor`} />
                <InfoRow
                    label="Base Rate"
                    value={`₹${displayBaseRate.toLocaleString('en-IN')} / ${unitLabel}`}
                />
                <InfoRow
                    label="Locality"
                    value={selectedLocality?.name || 'Not selected'}
                />
                <InfoRow
                    label="Final Rate"
                    value={`₹${displayFinalRate.toLocaleString('en-IN')} / ${unitLabel}`}
                />
                <InfoRow
                    label="Construction Cost"
                    value={`₹${constructionCost.toLocaleString('en-IN')}`}
                />

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-sm text-gray-600">Add-ons</span>
                        <strong className="text-right text-sm text-gray-900">
                            ₹{addonsTotal.toLocaleString('en-IN')}
                        </strong>
                    </div>

                    <div className="mt-3 space-y-2">
                        {selectedAddons.length > 0 ? (
                            selectedAddons.map((addon) => (
                                <div
                                    key={addon.value}
                                    className="flex items-center justify-between rounded-lg bg-white px-3 py-2"
                                >
                                    <span className="text-sm font-medium text-gray-700">
                                        {addon.label}
                                    </span>

                                    <strong className="text-sm text-gray-900">
                                        ₹{addon.price.toLocaleString('en-IN')}
                                    </strong>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400">
                                No add-ons selected
                            </p>
                        )}
                    </div>
                </div>

                <InfoRow label="GST 18%" value={`₹${gst.toLocaleString('en-IN')}`} />

                <div className="rounded-xl bg-[#1F4E79] px-4 py-4 text-white">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-semibold">Approx Cost</span>
                        <strong className="text-right text-lg">
                            ₹{estimate.toLocaleString('en-IN')}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InputBox({ label, error, wrapperClass = '', registration, ...props }: any) {
    return (
        <div className={wrapperClass}>
            <label className="block text-sm font-semibold text-gray-700">
                {label}
            </label>

            <input
                {...registration}
                {...props}
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-[#1F4E79]/20"
            />

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}

function SelectBox({
    label,
    error,
    options,
    wrapperClass = '',
    registration,
    ...props
}: any) {
    return (
        <div className={wrapperClass}>
            <label className="block text-sm font-semibold text-gray-700">
                {label}
            </label>

            <select
                {...registration}
                {...props}
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#1F4E79] focus:ring-2 focus:ring-[#1F4E79]/20"
            >
                {options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}

function ResultCard({
    result,
    leadId,
}: {
    result: any;
    leadId: number | null;
}) {
    if (!result) {
        return (
            <div className="rounded-2xl bg-gray-50 p-6 text-gray-600">
                Submit form to generate final estimate.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Final Estimate</h2>

            <div className="rounded-2xl bg-green-50 p-5">
                <p className="text-sm font-semibold text-green-700">
                    Estimated Project Cost
                </p>

                <h3 className="mt-2 text-2xl font-bold text-green-800">
                    ₹{result.estimated_low.toLocaleString('en-IN')} - ₹
                    {result.estimated_high.toLocaleString('en-IN')}
                </h3>

                <p className="mt-2 text-sm text-green-700">
                    Approx Budget: ₹{result.estimated_budget.toLocaleString('en-IN')}
                </p>
            </div>

            <div className="space-y-3">
                <InfoRow label="Plot Size" value={`${result.plot_size_sqft} sq ft`} />
                <InfoRow label="Built-up Area" value={`${result.built_up_area_sqft} sq ft`} />
                <InfoRow label="Per Sq Ft Rate" value={`₹${result.per_sqft_rate}`} />
                <InfoRow label="Base Construction Cost" value={`₹${result.base_construction_cost.toLocaleString('en-IN')}`} />
                <InfoRow label="Add-ons Total" value={`₹${result.addons_total.toLocaleString('en-IN')}`} />
                <InfoRow label="GST 18%" value={`₹${result.gst.toLocaleString('en-IN')}`} />
                <InfoRow label="Timeline" value={result.timeline} />
            </div>

            {result.addons_breakdown?.length > 0 && (
                <div>
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        Selected Add-ons
                    </h3>

                    <div className="space-y-2">
                        {result.addons_breakdown.map((addon: any) => (
                            <InfoRow
                                key={addon.key}
                                label={addon.name}
                                value={`₹${addon.price.toLocaleString('en-IN')}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {result.breakdown?.length > 0 && (
                <div>
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        Itemized Cost Breakdown
                    </h3>

                    <div className="space-y-3">
                        {result.breakdown.map((item: any) => (
                            <div
                                key={item.key}
                                className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {item.percentage}% of total estimate
                                        </p>
                                    </div>

                                    <strong className="text-right text-sm text-gray-900">
                                        ₹{item.amount.toLocaleString('en-IN')}
                                    </strong>
                                </div>

                                <div className="mt-3 h-2 rounded-full bg-gray-200">
                                    <div
                                        className="h-2 rounded-full bg-[#1F4E79]"
                                        style={{ width: `${item.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="rounded-2xl bg-blue-50 p-5">
                <h3 className="font-bold text-blue-900">Market Comparison</h3>

                <div className="mt-3 space-y-3">
                    <InfoRow
                        label="Industry Avg Rate"
                        value={`₹${result.industry_average_rate} / sq ft`}
                    />

                    <InfoRow
                        label="Industry Avg Cost"
                        value={`₹${result.industry_average.toLocaleString('en-IN')}`}
                    />

                    <InfoRow
                        label="Your Estimated Budget"
                        value={`₹${result.estimated_budget.toLocaleString('en-IN')}`}
                    />

                    <InfoRow
                        label="Savings vs Market"
                        value={`₹${result.savings_vs_market.toLocaleString('en-IN')}`}
                    />

                    <InfoRow
                        label="Comparison"
                        value={`${result.comparison_percent}%`}
                    />
                </div>
            </div>

            {leadId ? (
                <a
                    href={`/quote/download/${leadId}`}
                    className="block w-full rounded-xl bg-[#1F4E79] px-6 py-3 text-center font-bold text-white"
                >
                    Download PDF
                </a>
            ) : (
                <button
                    type="button"
                    disabled
                    className="w-full rounded-xl bg-gray-300 px-6 py-3 font-bold text-gray-600"
                >
                    PDF Preparing...
                </button>
            )}
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
            <span className="text-sm text-gray-600">{label}</span>
            <strong className="text-right text-sm text-gray-900">{value}</strong>
        </div>
    );
}
