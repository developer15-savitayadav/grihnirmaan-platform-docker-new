import { Link } from '@inertiajs/react';
import LazyImage from '@/Components/LazyImage';
import {
    ArrowRight,
    Banknote,
    Compass,
    Construction,
    Droplets,
    FileCheck,
    Hammer,
    HomeIcon,
    PaintBucket,
    Sofa,
    Sparkles,
    Square,
    Zap,
} from 'lucide-react';

interface Service {
    id: number;
    slug: string;
    name: string;
    short_description: string;
    icon_name: string | null;
}

interface Props {
    service: Service;
}

const SERVICE_ICONS: Record<string, typeof FileCheck> = {
    FileCheck,
    Hammer,
    Compass,
    Sofa,
    Zap,
    Droplets,
    Square,
    PaintBucket,
    Sparkles,
    Home: HomeIcon,
    Banknote,
};

function ServiceIcon({ name }: { name: string | null }) {
    const Icon = name && SERVICE_ICONS[name] ? SERVICE_ICONS[name] : Construction;

    return <Icon className="h-6 w-6" />;
}

export default function ServiceCard({ service }: Props) {
    return (
        <Link
            href={`/services/${service.slug}`}
            className="group relative block h-full overflow-hidden rounded-2xl border border-brand-blue/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-blue/40 hover:shadow-xl"
        >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-brand-blue-light/40 transition-all duration-300 group-hover:bg-brand-blue-light" />

            <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue-light text-brand-blue transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white">
                    <ServiceIcon name={service.icon_name} />
                </div>

                <h3 className="mb-3 serpage-title text-xl font-bold text-charcoal transition group-hover:text-brand-blue">
                    {service.name}
                </h3>

                <p className="mb-6 line-clamp-3 font-body text-base leading-7 text-muted-gray">
                    {service.short_description}
                </p>

                <span className="inline-flex items-center gap-2 font-body text-sm font-semibold text-terracotta">
                    Explore Service
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    );
}
