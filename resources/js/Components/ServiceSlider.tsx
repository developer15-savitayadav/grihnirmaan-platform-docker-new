import { Link } from '@inertiajs/react';
import {
    Banknote,
    ChevronRight,
    Compass,
    Construction,
    Droplets,
    FileCheck,
    Hammer,
    Home as HomeIcon,
    PaintBucket,
    Sofa,
    Sparkles,
    Square,
    Zap,
} from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

interface ServiceItem {
    id: number;
    slug: string;
    name: string;
    short_description: string;
    icon_name: string | null;
    display_order: number;
    image?: string | null;
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

export default function ServiceSlider({ services = [] }: { services: ServiceItem[] }) {
    if (!services.length) {
        return null;
    }

    return (
        <div className="service-slider-wrap mt-12">
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                navigation={services.length > 1}
                loop={services.length >= 5}
                autoplay={
                    services.length > 1
                        ? {
                              delay: 3500,
                              disableOnInteraction: false,
                              pauseOnMouseEnter: true,
                          }
                        : false
                }
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerView: 4,
                    },
                }}
                className="!pb-12"
            >
                {services.map((service, index) => (
                    <SwiperSlide key={service.id} className="!h-auto">
                        <article className="service-slide-card flex h-full flex-col">
                            <div className="flex items-start justify-between">
                                <div className="service-slide-icon">
                                    <ServiceIcon name={service.icon_name} />
                                </div>

                                <span className="service-slide-number">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>

                            <h3 className="service-slide-title">
                                {service.name}
                            </h3>

                            <p className="service-slide-desc">
                                {service.short_description}
                            </p>

                            <div className="service-slide-image mt-auto">
                                <img
                                    src={
                                        service.image ||
                                        `/uploads/services/${service.slug}.jpg`
                                    }
                                    alt={service.name}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src =
                                            '/uploads/images/hero-img.jfif';
                                    }}
                                />

                                <Link
                                    href={`/services/${service.slug}`}
                                    className="service-slide-arrow"
                                    aria-label={`View ${service.name}`}
                                >
                                    <ChevronRight size={18} />
                                </Link>
                            </div>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
