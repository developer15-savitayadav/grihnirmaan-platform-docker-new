import { useEffect, useRef, useState } from "react";
import { Languages } from "lucide-react";

declare global {
    interface Window {
        googleTranslateElementInit: () => void;
        google: any;
    }
}

export default function GoogleTranslate() {
    const [open, setOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState("हिं");
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load Google Translate script only once
        if (!document.getElementById("google-translate-script")) {
            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        includedLanguages: "en,hi",
                        autoDisplay: false,
                    },
                    "google_translate_element",
                );
            };

            const script = document.createElement("script");
            script.id = "google-translate-script";
            script.src =
                "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;

            document.body.appendChild(script);
        }

        // Read current language from cookie
        const match = document.cookie.match(/googtrans=\/en\/(\w+)/);

        if (match) {
            setCurrentLang(match[1] === "hi" ? "हिं" : "EN");
        }

        // Close dropdown on outside click
        const handleClickOutside = (e: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // Belt-and-suspenders: Google injects the banner iframe + shifts
        // <body> down with inline styles *after* translation completes,
        // sometimes after our CSS has already applied. Keep forcing it back.
        const forceHideBanner = () => {
            document.body.style.top = "0px";
            document.body.style.position = "static";

            document
                .querySelectorAll(
                    "iframe.goog-te-banner-frame, iframe[src*='translate']",
                )
                .forEach((el) => {
                    (el as HTMLElement).style.display = "none";
                });
        };

        forceHideBanner();

        const observer = new MutationObserver(forceHideBanner);
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["style"],
            childList: true,
            subtree: false,
        });

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            observer.disconnect();
        };
    }, []);

    const changeLanguage = (lang: "en" | "hi") => {
        // Google Translate cookie
        document.cookie = `googtrans=/en/${lang}; path=/`;
        document.cookie = `googtrans=/en/${lang}; domain=${window.location.hostname}; path=/`;

        setCurrentLang(lang === "hi" ? "हिं" : "EN");
        setOpen(false);

        // Reload page so Google Translate applies
        window.location.reload();
    };

    return (
        <div className="translate-container" ref={wrapperRef}>
            {/* Hidden Google Widget */}
            <div id="google_translate_element" />

            {/* Custom Button */}
            <button
                className="translate-btn"
                onClick={() => setOpen(!open)}
                type="button"
            >
                <Languages size={18} />
                <span>{currentLang}</span>
            </button>

            {open && (
                <div className="translate-dropdown">
                    <button type="button" onClick={() => changeLanguage("en")}>
                        🇺🇸 English
                    </button>

                    <button type="button" onClick={() => changeLanguage("hi")}>
                        🇮🇳 हिन्दी
                    </button>
                </div>
            )}
        </div>
    );
}
