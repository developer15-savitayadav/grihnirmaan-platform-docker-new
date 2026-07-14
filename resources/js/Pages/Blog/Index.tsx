import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react';
import PageBanner from '@/Components/Breadcrumb';

export default function Index({ posts = [] }) {
return (
<AppLayout>

    <Head title="Blog" />

    <PageBanner title="Our Blog" subtitle="Insights and guides for your home construction journey."
        bannerImage="/uploads/images/bcrumb-banner.jpg" items={[{ label: 'Blog' }]} />

    <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {posts.length > 0 ? (
            <div className="space-y-10">
                {posts.map((post) => (
                <article key={post.id}
                    className="group grid items-center gap-10 rounded-[32px] border border-brand-blue/10 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:p-6 lg:grid-cols-[0.95fr_1fr]">
                    <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-[24px]">
                    <img src={post.image} alt={post.title}
                        className="h-[300px] w-full rounded-[24px] object-cover transition duration-700 group-hover:scale-105 sm:h-[400px]" />
                    </Link>

                    <div className="py-2 lg:pr-6">
                        <div
                            className="flex flex-wrap items-center gap-6 border-b border-brand-blue/10 pb-5 font-body text-sm text-muted-gray">
                            <span
                                className="flex items-center gap-2 font-semibold uppercase tracking-wider text-terracotta">
                                <span className="h-2 w-2 rounded-full bg-terracotta"></span>
                                {post.category}
                            </span>

                            <span className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-brand-blue" />
                                {post.published_at}
                            </span>

                            <span className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-brand-blue" />
                                {post.read_time_minutes} min read
                            </span>
                        </div>

                        <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-charcoal sm:text-4xl">
                            <Link href={`/blog/${post.slug}`} className="transition duration-300 hover:text-brand-blue">
                            {post.title}
                            </Link>
                        </h2>

                        <p className="mt-5 max-w-2xl font-body text-base leading-8 text-muted-gray">
                            {post.excerpt}
                        </p>

                        <Link href={`/blog/${post.slug}`}
                            className="mt-8 inline-flex items-center gap-3 rounded-full bg-terracotta px-8 py-4 font-body text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-blue hover:shadow-lg">
                        Read More
                        <ArrowUpRight className="h-5 w-5" />
                        </Link>
                    </div>
                </article>
                ))}
            </div>
            ) : (
            <div className="rounded-3xl border border-brand-blue/10 bg-white p-10 text-center shadow-sm">
                <p className="font-body text-muted-gray">
                    No blog posts published yet.
                </p>
            </div>
            )}
        </div>
    </section>
</AppLayout>
);
}
