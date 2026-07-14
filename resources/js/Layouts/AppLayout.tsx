import { Link, useForm, usePage } from "@inertiajs/react";
import { PropsWithChildren, useState } from "react";

import {
    Menu,
    X,
    Phone,
    Calculator,
    MapPin,
    Mail,
    ChevronDown,
} from "lucide-react";
import type { ComponentType, FormEvent, SVGProps } from "react";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------------------
 * Constants — single source of truth for nav, contact info, social
 * ------------------------------------------------------------------------- */
const BRAND = {
    name: "GrihNirmaan",
    tagline: "Home Construction, Done Right.",
    phone: "+91 99999 11111",
    phoneHref: "tel:+919999911111",
    whatsapp: "919999911111",
    whatsappMessage: "Hi, I want a quote for home construction.",
    email: "hello@grihnirmaan.in",
    emailHref: "mailto:hello@grihnirmaan.in",
    address: "Ahmedabad, Gujarat, India",
};

const PRIMARY_NAV = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
];
const SERVICE_MEGA_MENU = [
    {
        label: "Government Approvals",
        href: "/services/government-approvals",
    },
    {
        label: "Civil Construction",
        href: "/services/civil-construction",
    },
    {
        label: "Architecture & Design",
        href: "/services/architecture-design",
    },
    {
        label: "Interior Design",
        href: "/services/interior-design",
    },
    {
        label: "Electrical Works (Havells)",
        href: "/services/electrical-havells",
    },
    {
        label: "Bath Fittings & Plumbing",
        href: "/services/bath-fittings",
    },
    {
        label: "Glass & Glazing",
        href: "/services/glass-glazing",
    },
    {
        label: "Painting & Finishing",
        href: "/services/painting",
    },
    {
        label: "Bhumi Poojan",
        href: "/services/bhumi-poojan",
    },
    {
        label: "Grih Pravesh",
        href: "/services/grih-pravesh",
    },
    {
        label: "Home Loan Facilitation",
        href: "/services/home-loans",
    },
    {
        label: "Vastu Consultationr",
        href: "/services/vastu-consultation",
    },
];
const PROJECT_MENU = [
    { title: "All Projects", href: "/projects" },
    // { title: 'Featured Projects', href: '/projects?featured=1' },
    // { title: 'Luxury Homes', href: '/projects?style=Luxury' },
    // { title: 'Modern Homes', href: '/projects?style=Modern' },
    {
        title: "Sharma Residence",
        href: "/projects/sharma-residence-gomti-nagar",
    },
    { title: "Verma Villa", href: "/projects/verma-villa-sushant-golf-city" },
    { title: "Singh Bungalow", href: "/projects/singh-bungalow-aliganj" },
];

const getFooterNav = (auth: any) => [
    {
        heading: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Our Team", href: "/about/team" },
            { label: "Our Partners", href: "/about/partners" },
            { label: "Contact Us", href: "/contact" },
            { label: "Locations", href: "/lucknow" },
        ],
    },
    {
        heading: "Services",
        links: [
            {
                label: "Government Approvals",
                href: "/services/government-approvals",
            },
            {
                label: "Civil Construction",
                href: "/services/civil-construction",
            },
            {
                label: "Architecture & Design",
                href: "/services/architecture-design",
            },
            { label: "Interior Design", href: "/services/interior-design" },
        ],
    },
    {
        heading: "Resources",
        links: [
            { label: "Cost Calculator", href: "/cost-calculator" },
            { label: "How It Works", href: "/how-it-works" },
            { label: "Projects", href: "/projects" },
            { label: "Blog", href: "/blog" },
        ],
    },
    {
        heading: "Customer Portal",
        links: auth?.user
            ? [
                  { label: "Dashboard", href: "/portal/dashboard" },
                  { label: "NRI Services", href: "/nri" },
                  { label: "Get Free Quote", href: "/quote" },
              ]
            : [
                  { label: "Customer Login", href: "/portal/login" },
                  { label: "NRI Services", href: "/nri" },
                  { label: "Get Free Quote", href: "/quote" },
              ],
    },
];

/* Inline brand icons (lucide-react no longer ships brand logos) */
const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99h-2.54V12h2.54V9.8c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
);
const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
    >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
);
const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.34 18.34H5.67V9.99h2.67v8.35ZM7 8.83a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Zm11.34 9.51h-2.67v-4.07c0-.97-.02-2.22-1.36-2.22-1.36 0-1.57 1.06-1.57 2.15v4.14h-2.67V9.99h2.56v1.14h.04c.36-.67 1.22-1.36 2.52-1.36 2.7 0 3.2 1.78 3.2 4.09v4.48Z" />
    </svg>
);
const YoutubeIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.55 3.5 12 3.5 12 3.5s-7.55 0-9.4.58A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12C4.45 20.5 12 20.5 12 20.5s7.55 0 9.4-.58a3 3 0 0 0 2.1-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.75 15.5v-7l6.5 3.5-6.5 3.5Z" />
    </svg>
);

const SOCIAL: {
    label: string;
    href: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
    {
        label: "Facebook",
        href: "https://facebook.com/grihnirmaan",
        Icon: FacebookIcon,
    },
    {
        label: "Instagram",
        href: "https://instagram.com/grihnirmaan",
        Icon: InstagramIcon,
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/company/grihnirmaan",
        Icon: LinkedinIcon,
    },
    {
        label: "YouTube",
        href: "https://youtube.com/@grihnirmaan",
        Icon: YoutubeIcon,
    },
];

/* ----------------------------------------------------------------------------
                    * Inline brand logo (replace with
                    <ApplicationLogo /> later if desired)
                    * ------------------------------------------------------------------------- */

function BrandLogo({ className }: { className?: string }) {
    return (
        <Link href="/" className={cn("flex items-center gap-2", className)}>
            <span className="grid h-9 w-9 place-items-center rounded-md bg-[#2E75B6]  text-lg font-bold text-cream">
                G
            </span>
            <span className=" text-xl font-semibold tracking-tight text-charcoal">
                {BRAND.name}
            </span>
        </Link>
    );
}

/* ----------------------------------------------------------------------------
 * WhatsApp SVG (lucide doesn't ship one)
 * ------------------------------------------------------------------------- */

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.768.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
    );
}

/* ----------------------------------------------------------------------------
 * Layout
 * ------------------------------------------------------------------------- */

export default function AppLayout({ children }: PropsWithChildren) {
    const {
        data: newsletterData,
        setData: setNewsletterData,
        post: postNewsletter,
        processing: newsletterProcessing,
        errors: newsletterErrors,
        reset: resetNewsletter,
        recentlySuccessful: newsletterSuccess,
    } = useForm({
        email: "",
        source: "homepage-footer",
    });

    const submitNewsletter = (e: FormEvent) => {
        e.preventDefault();

        postNewsletter(route("newsletter.subscribe"), {
            preserveScroll: true,
            onSuccess: () => resetNewsletter("email"),
        });
    };
    const [mobileOpen, setMobileOpen] = useState(false);
    const { url } = usePage();
    const { auth, flash } = usePage().props as any;
    const FOOTER_NAV = getFooterNav(auth);
    const whatsappUrl = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
        BRAND.whatsappMessage,
    )}`;

    return (
        <div className="flex min-h-screen flex-col bg-cream font-body text-charcoal">
            {/* ─── Sticky header ────────────────────────────────────────── */}
            <header className="sticky top-0 z-40 border-b border-brand-blue/10 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
                    <BrandLogo />

                    {/* Desktop nav */}
                    <nav
                        aria-label="Primary"
                        className="nav-menu hidden lg:flex lg:items-center lg:gap-8"
                    >
                        <Link
                            href="/"
                            aria-current={url === "/" ? "page" : undefined}
                            className={cn(
                                "nav-link text-sm font-medium transition-colors",
                                url === "/"
                                    ? "active"
                                    : "text-charcoal/80 hover:text-brand-blue",
                            )}
                        >
                            Home
                        </Link>

                        {/* Services Mega Menu */}
                        <div className="group relative">
                            <Link
                                href="/services"
                                aria-current={
                                    url.startsWith("/services")
                                        ? "page"
                                        : undefined
                                }
                                className={cn(
                                    "nav-link flex items-center gap-1 text-sm font-medium transition-colors",
                                    url.startsWith("/services")
                                        ? "active"
                                        : "text-charcoal/80 hover:text-[#c4623a]",
                                )}
                            >
                                Services
                                <ChevronDown
                                    className={cn(
                                        "h-4 w-4 transition-transform group-hover:rotate-180",
                                        url.startsWith("/services")
                                            ? "text-brand-blue"
                                            : "",
                                    )}
                                />
                            </Link>

                            <div className="mega-menu-wrapper invisible absolute z-50 mt-5 w-[720px] -translate-x-1/2 bg-white p-6 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
                                <div className="grid grid-cols-2">
                                    {SERVICE_MEGA_MENU.map((service) => {
                                        const serviceActive =
                                            url === service.href ||
                                            url.startsWith(`${service.href}/`);

                                        return (
                                            <Link
                                                key={service.href}
                                                href={service.href}
                                                aria-current={
                                                    serviceActive
                                                        ? "page"
                                                        : undefined
                                                }
                                                className={cn(
                                                    "group/item mega-menu-item transition hover:bg-cream",
                                                    serviceActive
                                                        ? "active"
                                                        : "",
                                                )}
                                            >
                                                <p
                                                    className={cn(
                                                        "transition-colors",
                                                        serviceActive
                                                            ? "font-semibold text-brand-blue"
                                                            : "text-charcoal/80 hover:text-brand-blue",
                                                    )}
                                                >
                                                    {service.label}
                                                </p>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/how-it-works"
                            aria-current={
                                url.startsWith("/how-it-works")
                                    ? "page"
                                    : undefined
                            }
                            className={cn(
                                "nav-link text-sm font-medium transition-colors",
                                url.startsWith("/how-it-works")
                                    ? "active"
                                    : "text-charcoal/80 hover:text-brand-blue",
                            )}
                        >
                            How It Works
                        </Link>

                        {/* Projects Submenu */}
                        <div className="group relative">
                            <Link
                                href="/projects"
                                aria-current={
                                    url.startsWith("/projects")
                                        ? "page"
                                        : undefined
                                }
                                className={cn(
                                    "nav-link flex items-center gap-1 text-sm font-medium transition-colors",
                                    url.startsWith("/projects")
                                        ? "active"
                                        : "text-charcoal/80 hover:text-[#c4623a]",
                                )}
                            >
                                Projects
                                <ChevronDown
                                    className={cn(
                                        "h-4 w-4 transition-transform group-hover:rotate-180",
                                        url.startsWith("/projects")
                                            ? "text-[#c4623a]"
                                            : "",
                                    )}
                                />
                            </Link>

                            <div className="mega-menu-wrapper invisible absolute z-50 mt-5 w-[320px] -translate-x-1/2 bg-white p-6 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
                                <div className="grid grid-cols-1">
                                    {PROJECT_MENU.map((item) => {
                                        const projectActive =
                                            item.href === "/projects"
                                                ? url === "/projects"
                                                : url === item.href ||
                                                  url.startsWith(
                                                      `${item.href}/`,
                                                  );

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                aria-current={
                                                    projectActive
                                                        ? "page"
                                                        : undefined
                                                }
                                                className={cn(
                                                    "group/item mega-menu-item transition hover:bg-cream",
                                                    projectActive
                                                        ? "active"
                                                        : "",
                                                )}
                                            >
                                                <p
                                                    className={cn(
                                                        "transition-colors",
                                                        projectActive
                                                            ? "font-semibold text-brand-blue"
                                                            : "text-charcoal/80 hover:text-brand-blue",
                                                    )}
                                                >
                                                    {item.title}
                                                </p>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/about"
                            aria-current={
                                url.startsWith("/about") ? "page" : undefined
                            }
                            className={cn(
                                "nav-link text-sm font-medium transition-colors",
                                url.startsWith("/about")
                                    ? "active"
                                    : "text-charcoal/80 hover:text-brand-blue",
                            )}
                        >
                            About
                        </Link>
                    </nav>

                    {/* Right-side cluster */}
                    <div className="hidden items-center gap-3 lg:flex">
                        <a
                            href={BRAND.phoneHref}
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-brand-blue-light"
                        >
                            <Phone className="h-4 w-4 text-brand-blue" />
                            <span>{BRAND.phone}</span>
                        </a>

                        <Link
                            href="/cost-calculator"
                            aria-current={
                                url.startsWith("/cost-calculator")
                                    ? "page"
                                    : undefined
                            }
                            className={cn(
                                "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                                url.startsWith("/cost-calculator")
                                    ? "bg-brand-blue text-cream focus-visible:outline-brand-blue"
                                    : "bg-terracotta text-cream hover:bg-terracotta/90 focus-visible:outline-terracotta",
                            )}
                        >
                            <Calculator className="h-4 w-4" />
                            Cost Calculator
                        </Link>
                    </div>

                    {/* Mobile actions */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <a
                            href={BRAND.phoneHref}
                            aria-label="Call us"
                            className="grid h-10 w-10 place-items-center rounded-md text-brand-blue transition-colors hover:bg-brand-blue-light"
                        >
                            <Phone className="h-5 w-5" />
                        </a>

                        <button
                            type="button"
                            onClick={() => setMobileOpen((value) => !value)}
                            aria-label="Toggle menu"
                            aria-expanded={mobileOpen}
                            className="grid h-10 w-10 place-items-center rounded-md text-charcoal transition-colors hover:bg-brand-blue-light"
                        >
                            {mobileOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu panel */}
                {mobileOpen && (
                    <nav
                        aria-label="Mobile"
                        className="border-t border-brand-blue/10 bg-cream lg:hidden"
                    >
                        <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
                            {PRIMARY_NAV.map((item) => {
                                const active =
                                    item.href === "/"
                                        ? url === "/"
                                        : url.startsWith(item.href);

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            aria-current={
                                                active ? "page" : undefined
                                            }
                                            onClick={() => setMobileOpen(false)}
                                            className={cn(
                                                "mobile-nav-link block rounded-md px-3 py-3 text-base font-medium transition-colors",
                                                active
                                                    ? "active bg-brand-blue-light text-brand-blue"
                                                    : "text-charcoal hover:bg-brand-blue-light hover:text-brand-blue",
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}

                            <li className="mt-2">
                                <Link
                                    href="/cost-calculator"
                                    aria-current={
                                        url.startsWith("/cost-calculator")
                                            ? "page"
                                            : undefined
                                    }
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                        "flex items-center justify-center gap-2 rounded-md px-4 py-3 text-base font-semibold text-cream transition-colors",
                                        url.startsWith("/cost-calculator")
                                            ? "bg-brand-blue"
                                            : "bg-terracotta hover:bg-terracotta/90",
                                    )}
                                >
                                    <Calculator className="h-5 w-5" />
                                    Cost Calculator
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </header>

            {/* ─── Main content ─────────────────────────────────────────── */}
            <main className="flex-1">{children}</main>

            {/* ─── Floating WhatsApp button (mobile-priority, also visible desktop) ─ */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-1 ring-black/5 transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-6 sm:right-6"
            >
                <WhatsAppIcon className="h-7 w-7" />
                <span className="sr-only">Open WhatsApp chat</span>
            </a>
            {/* ─── NEWSLETTER SECTION ───────────────────────── */}

            {/* ─── Footer ───────────────────────────────────────────────── */}
            <footer className="footer-modern relative overflow-hidden">
                {/* Background Image */}
                <img
                    src="/uploads/images/ft1-bg.jpg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-[#00000057]" />

                <div className="relative z-10">
                    {/* Full Width Marquee */}
                    <div className="footer-marquee">
                        <div className="footer-marquee-track">
                            <span>
                                Building Trust, Creating Homes
                                <span className="footer-star">✦</span>
                            </span>

                            <span>
                                Building Trust, Creating Homes
                                <span className="footer-star">✦</span>
                            </span>

                            <span>
                                Building Trust, Creating Homes
                                <span className="footer-star">✦</span>
                            </span>
                        </div>
                    </div>

                    <div className="px-4 pb-10 sm:px-6 lg:px-8">
                        <div className="rounded-[28px] border border-white/10 bg-[#000000b0] footer-wraper shadow-2xl backdrop-blur-[30px] ">
                            <div className="grid gap-12 lg:grid-cols-[1.25fr_3fr]">
                                {/* Left Brand Content */}
                                <div>
                                    <div className="flex items-center gap-3">
                                        <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#c4623a] font-bold text-white">
                                            G
                                        </div>

                                        <h3 className="text-3xl font-bold text-white">
                                            {BRAND.name}
                                        </h3>
                                    </div>
                                    <div className="mt-6 flex items-center gap-3">
                                        {SOCIAL.map(({ label, href, Icon }) => (
                                            <a
                                                key={label}
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={label}
                                                className="grid h-9 w-9 place-items-center rounded-md bg-white text-[#c4623a] transition hover:bg-[#c4623a] hover:text-white"
                                            >
                                                <Icon className="h-4 w-4" />
                                            </a>
                                        ))}
                                    </div>
                                    <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
                                        Home Construction, Done Right. Trusted
                                        construction partner delivering quality,
                                        transparency and timely execution across
                                        India.
                                    </p>

                                    <div className="mt-6 space-y-3 text-sm text-white/70">
                                        <div className="flex gap-3">
                                            <MapPin className="mt-1 h-4 w-4 shrink-0 text-white" />
                                            <span>{BRAND.address}</span>
                                        </div>

                                        <a
                                            href={BRAND.phoneHref}
                                            className="flex gap-3 transition hover:text-[#c4623a]"
                                        >
                                            <Phone className="h-4 w-4 shrink-0 text-white" />
                                            {BRAND.phone}
                                        </a>

                                        <a
                                            href={BRAND.emailHref}
                                            className="flex gap-3 transition hover:text-[#c4623a]"
                                        >
                                            <Mail className="h-4 w-4 shrink-0 text-white" />
                                            {BRAND.email}
                                        </a>
                                    </div>
                                </div>

                                {/* Right Content */}
                                <div>
                                    {/* Newsletter Row */}
                                    <div className="mb-14 flex newsletter-wrap">
                                        <div className="w-[360px] max-w-full">
                                            <form
                                                onSubmit={submitNewsletter}
                                                className="flex items-center rounded-full bg-white p-1.5 shadow-sm"
                                            >
                                                <input
                                                    type="email"
                                                    value={newsletterData.email}
                                                    onChange={(e) =>
                                                        setNewsletterData(
                                                            "email",
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                    placeholder="Enter your email..."
                                                    className="min-w-0 flex-1 border-0 bg-transparent px-5 py-2 text-sm text-gray-700 outline-none ring-0 placeholder:text-gray-400 focus:border-0 focus:outline-none focus:ring-0"
                                                />

                                                <button
                                                    type="submit"
                                                    disabled={
                                                        newsletterProcessing
                                                    }
                                                    className="shrink-0 rounded-full bg-[#1f1f1f] px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c4623a] disabled:opacity-60"
                                                >
                                                    {newsletterProcessing
                                                        ? "Subscribing..."
                                                        : "Subscribe"}
                                                </button>
                                            </form>
                                        </div>
                                    </div>

                                    {/* Footer Links Row */}
                                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                        {FOOTER_NAV.map((col) => (
                                            <div key={col.heading}>
                                                <h4 className="mb-5 border-b border-white/10 pb-4 text-xs font-bold uppercase text-white">
                                                    <span className="mr-2 text-[#c4623a]">
                                                        ▪
                                                    </span>
                                                    {col.heading}
                                                </h4>

                                                <ul className="space-y-3">
                                                    {col.links.map((link) => (
                                                        <li key={link.href}>
                                                            {link.label ===
                                                            "Get Free Quote" ? (
                                                                <Link
                                                                    href={
                                                                        link.href
                                                                    }
                                                                    className="inline-flex items-center justify-center rounded-lg bg-[#c4623a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#c4623a]"
                                                                >
                                                                    {link.label}
                                                                </Link>
                                                            ) : (
                                                                <Link
                                                                    href={
                                                                        link.href
                                                                    }
                                                                    className="text-sm font-medium text-white/70 transition hover:text-[#c4623a]"
                                                                >
                                                                    {link.label}
                                                                </Link>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Row */}
                            <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
                                {/* Social + Copyright Inline */}

                                <p className="text-xs text-white/70">
                                    © {new Date().getFullYear()} {BRAND.name}.
                                    All rights reserved.
                                </p>

                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
                                    <div className="flex items-center gap-5 text-sm font-medium text-muted-gray">
                                        <Link
                                            href="/privacy"
                                            className="transition hover:text-[#c4623a] text-white/70"
                                        >
                                            Privacy Policy
                                        </Link>

                                        <span className="text-brand-blue/20">
                                            |
                                        </span>

                                        <Link
                                            href="/terms"
                                            className="transition hover:text-[#c4623a] text-white/70"
                                        >
                                            Terms of Service
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
