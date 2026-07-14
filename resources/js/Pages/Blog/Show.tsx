import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Clock,
    Eye,
    MessageCircle,
    Search,
} from 'lucide-react';
import PageBanner from '@/Components/Breadcrumb';

export default function Show({
    post,
    recentPosts = [],
    previousPost = null,
    nextPost = null,
}) {
    return (
        <AppLayout>
            <Head title={post.meta_title || post.title}>
                {post.meta_description && (
                    <meta name="description" content={post.meta_description} />
                )}
            </Head>

            <PageBanner
                title={post.title}
                subtitle="Read our latest construction and home design insights."
                bannerImage={post.image || '/uploads/images/bcrumb-banner.jpg'}
                items={[{ label: 'Blog' }, { label: post.category }]}
            />

            <section className="bg-white pt-20">
                <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
                    <main>
                        <Link
                            href="/blog"
                            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-terracotta transition hover:text-brand-blue"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Blog
                        </Link>

                        <div className="border-b border-brand-blue/10 pb-5">
                            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-gray">
                                <span className="inline-flex items-center gap-2 font-semibold uppercase tracking-wider text-terracotta">
                                    <span className="h-2 w-2 rounded-full bg-terracotta"></span>
                                    {post.category}
                                </span>

                                <span className="inline-flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-brand-blue" />
                                    {post.published_at}
                                </span>

                                <span className="inline-flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-brand-blue" />
                                    {post.read_time_minutes} min read
                                </span>

                                <span className="inline-flex items-center gap-2">
                                    <Eye className="h-4 w-4 text-brand-blue" />
                                    {post.view_count ?? 0} views
                                </span>
                            </div>
                        </div>

                        <h1 className="blog-detail-title mt-8 max-w-4xl text-charcoal">
                            {post.title}
                        </h1>

                        {post.excerpt && (
                            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-gray">
                                {post.excerpt}
                            </p>
                        )}

                        {post.image && (
                            <div className="mt-10 overflow-hidden rounded-[28px] shadow-xl">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="h-[300px] w-full object-cover sm:h-[500px]"
                                />
                            </div>
                        )}

                        <article
                            className="blog-content mt-12"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {post.tags?.length > 0 && (
                            <div className="mt-12 border-t border-brand-blue/10 pt-8">
                                <h3 className="blog-subtitle text-xl text-charcoal">
                                    Tags
                                </h3>

                                <div className="mt-4 flex flex-wrap gap-3">
                                    {post.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full bg-cream px-4 py-2 text-sm font-medium text-muted-gray transition hover:bg-terracotta hover:text-white"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {(previousPost || nextPost) && (
                            <div className="mt-14 border-y border-brand-blue/10 py-8">
                                <div className="grid gap-8 md:grid-cols-2">
                                    {previousPost ? (
                                        <Link
                                            href={`/blog/${previousPost.slug}`}
                                            className="group flex items-center gap-5"
                                        >
                                            <img
                                                src={previousPost.image}
                                                alt={previousPost.title}
                                                className="h-24 w-24 rounded-2xl object-cover"
                                            />

                                            <div>
                                                <div className="mb-2 flex items-center gap-1 text-sm font-semibold uppercase tracking-wider text-muted-gray">
                                                    <ChevronLeft className="h-4 w-4" />
                                                    Previous Post
                                                </div>

                                                <h3 className="blog-detail-subtitle text-xl leading-snug text-charcoal transition group-hover:text-terracotta">
                                                    {previousPost.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="hidden md:block"></div>
                                    )}

                                    {nextPost && (
                                        <Link
                                            href={`/blog/${nextPost.slug}`}
                                            className="group flex items-center justify-end gap-5 text-right"
                                        >
                                            <div>
                                                <div className="mb-2 flex items-center justify-end gap-1 text-sm font-semibold uppercase tracking-wider text-muted-gray">
                                                    Next Post
                                                    <ChevronRight className="h-4 w-4" />
                                                </div>

                                                <h3 className="blog-detail-subtitle text-xl leading-snug text-charcoal transition group-hover:text-terracotta">
                                                    {nextPost.title}
                                                </h3>
                                            </div>

                                            <img
                                                src={nextPost.image}
                                                alt={nextPost.title}
                                                className="h-24 w-24 rounded-2xl object-cover"
                                            />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </main>

                    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
                        <div className="rounded-[28px] border border-brand-blue/10 bg-cream p-7 text-center">
                            <h3 className="blog-subtitle text-xl text-charcoal">
                                Written by
                            </h3>

                            <div className="blog-subtitle mt-2 text-2xl text-charcoal">
                                {post.author_name || 'GrihNirmaan Team'}
                            </div>

                            <p className="mt-3 text-sm leading-6 text-muted-gray">
                                Expert insights on home construction, architecture,
                                interiors and approvals.
                            </p>
                        </div>

                        <div className="rounded-[28px] border border-brand-blue/10 bg-white p-6 shadow-sm">
                            <h3 className="blog-subtitle text-xl text-charcoal">
                                Search
                            </h3>

                            <div className="mt-5 flex overflow-hidden rounded-full border border-brand-blue/10 bg-cream">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    className="blog-search-input h-12 flex-1 bg-transparent px-5 text-sm outline-none"
                                />

                                <button className="flex h-12 w-12 items-center justify-center bg-terracotta text-white">
                                    <Search className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-brand-blue/10 bg-white p-6 shadow-sm">
                            <h3 className="blog-subtitle text-xl text-charcoal">
                                Recent Posts
                            </h3>

                            <div className="mt-6 space-y-5">
                                {(recentPosts.length > 0 ? recentPosts : [post])
                                    .slice(0, 4)
                                    .map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/blog/${item.slug}`}
                                            className="group flex gap-4"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-20 w-24 rounded-xl object-cover"
                                            />

                                            <div>
                                                <p className="text-xs text-muted-gray">
                                                    {item.published_at}
                                                </p>

                                                <h4 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-charcoal transition group-hover:text-terracotta">
                                                    {item.title}
                                                </h4>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>

                        <div className="rounded-[28px] bg-brand-blue p-7 text-white">
                            <h3 className="blog-subtitle text-2xl text-white">
                                Planning Your Dream Home?
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-white/80">
                                Get expert construction guidance and accurate cost estimation.
                            </p>

                            <Link
                                href="/cost-calculator"
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-brand-blue"
                            >
                                Get Estimate
                                <MessageCircle className="h-4 w-4" />
                            </Link>
                        </div>
                    </aside>
                </div>
            </section>
        </AppLayout>
    );
}
