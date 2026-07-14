import { Link } from '@inertiajs/react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface Props {
    title: string;
    subtitle?: string;
    bannerImage?: string;
    items: BreadcrumbItem[];
}

export default function PageBanner({
    title,
    subtitle,
    bannerImage = '/uploads/images/bcrumb.jpg',
    items,
}: Props) {
    return (
        <section
            className="relative isolate overflow-hidden bg-[#1F4E79]"
            style={{
                backgroundImage: `url("${bannerImage}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
             <div className="breadcrumb-left-overlay" />
            <div className="absolute inset-0 bg-[#1F4E79]/20" />

            <div className="relative mx-auto flex min-h-[260px] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[320px] lg:min-h-[360px]">


                <h1 className="max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                        {subtitle}
                    </p>
                )}

                <nav
                    aria-label="Breadcrumb"
                    className="mt-6 rounded-full border border-white/15 bg-white/10 px-5 py-3 backdrop-blur"
                >
                    <ol className="flex flex-wrap items-center justify-center gap-2 text-sm">
                        <li>
                            <Link
                                href="/"
                                className="font-medium text-white/80 transition hover:text-white"
                            >
                                Home
                            </Link>
                        </li>

                        {items.map((item, index) => {
                            const isLast = index === items.length - 1;

                            return (
                                <li
                                    key={`${item.label}-${index}`}
                                    className="flex items-center gap-2"
                                >
                                    <span className="text-white">/</span>


                                    {item.href && !isLast ? (
                                        <Link
                                            href={item.href}
                                            className="font-medium text-white/80 transition hover:text-white"
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span className="font-semibold text-[#D4A853]">
                                            {item.label}
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>
        </section>
    );
}
