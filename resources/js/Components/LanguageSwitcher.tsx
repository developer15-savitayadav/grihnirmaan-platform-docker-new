import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * Header language toggle button. Switches between English and Hindi.
 * - Updates i18next's active language (re-renders all `t()` strings instantly)
 * - Persists the choice in localStorage so it survives page reloads
 * - Also updates the URL's `?lang=` param, which Laravel reads (via
 *   HandleInertiaRequests / SetLocale middleware) to serve translated
 *   database content (project titles, blog posts, etc.) on the next request
 */
export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const currentLang = i18n.language === "hi" ? "hi" : "en";
    const nextLang = currentLang === "en" ? "hi" : "en";

    const switchLanguage = () => {
        i18n.changeLanguage(nextLang);
        localStorage.setItem("language", nextLang);

        // Update ?lang= in the URL and reload via Inertia so the backend
        // can also serve translated dynamic (database) content.
        const url = new URL(window.location.href);
        url.searchParams.set("lang", nextLang);
        window.location.href = url.toString();
    };

    return (
        <button
            type="button"
            onClick={switchLanguage}
            aria-label={
                currentLang === "en" ? "Switch to Hindi" : "Switch to English"
            }
            className="flex items-center gap-1.5 rounded-full border border-brand-blue/15 bg-white px-3 py-1.5 text-sm font-semibold text-brand-blue transition hover:bg-brand-blue-light"
        >
            <Languages className="h-4 w-4" />
            <span>{currentLang === "en" ? "हिं" : "EN"}</span>
        </button>
    );
}