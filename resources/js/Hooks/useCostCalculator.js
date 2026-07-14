import { useMemo, useState } from 'react';

const finishRates = {
    budget: 1600,
    standard: 2000,
    premium: 2600,
};

const localityMultipliers = {
    gomti_nagar: 1.15,
    indira_nagar: 1.08,
    hazratganj: 1.2,
    aliganj: 1.1,
    jankipuram: 1.05,
    default: 1,
};

const addonPrices = {
    home_theater: 250000,
    smart_home: 180000,
    solar: 300000,
    modular_kitchen: 220000,
    false_ceiling: 120000,
};

export function useCostCalculator(initialData = {}) {
    const [form, setForm] = useState({
        plot_area: '',
        area_unit: 'sqft',
        floors: 1,
        finish_level: 'standard',
        locality: 'default',
        addons: [],
        ...initialData,
    });

    const updateField = (name, value) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const toggleAddon = (addon) => {
        setForm((prev) => {
            const exists = prev.addons.includes(addon);

            return {
                ...prev,
                addons: exists
                    ? prev.addons.filter((item) => item !== addon)
                    : [...prev.addons, addon],
            };
        });
    };

    const estimate = useMemo(() => {
        const area =
            form.area_unit === 'sqyard'
                ? Number(form.plot_area || 0) * 9
                : Number(form.plot_area || 0);

        const floors = Number(form.floors || 1);
        const builtUpArea = area * floors;

        const rate = finishRates[form.finish_level] || finishRates.standard;
        const localityMultiplier =
            localityMultipliers[form.locality] || localityMultipliers.default;

        const baseCost = builtUpArea * rate;
        const localityCost = baseCost * localityMultiplier;

        const addonsCost = form.addons.reduce((total, addon) => {
            return total + (addonPrices[addon] || 0);
        }, 0);

        const subtotal = localityCost + addonsCost;
        const gst = subtotal * 0.18;
        const total = subtotal + gst;

        return {
            area,
            builtUpArea,
            rate,
            baseCost: Math.round(baseCost),
            addonsCost: Math.round(addonsCost),
            gst: Math.round(gst),
            total: Math.round(total),
            lowRange: Math.round(total * 0.95),
            highRange: Math.round(total * 1.1),
            timelineMonths: Math.max(6, Math.ceil(builtUpArea / 1000) + 4),
        };
    }, [form]);

    return {
        form,
        estimate,
        updateField,
        toggleAddon,
        setForm,
    };
}
