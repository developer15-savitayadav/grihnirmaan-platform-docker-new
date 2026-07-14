import { useInView } from 'react-intersection-observer';

type LazyImageProps = {
    src: string;
    alt: string;
    className?: string;
};

export default function LazyImage({ src, alt, className }: LazyImageProps) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '200px',
    });

    return (
        <div ref={ref} className="h-full w-full bg-brand-blue-light/30">
            {inView && (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className={className}
                />
            )}
        </div>
    );
}