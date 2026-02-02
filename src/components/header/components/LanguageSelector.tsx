"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "pt", label: "Portuguese", flag: "🇧🇷" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "ko", label: "Korean", flag: "🇰🇷" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
  { code: "it", label: "Italian", flag: "🇮🇹" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
] as const;

function getCurrentLanguage(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
  return match ? match[1] : "en";
}

function clearGoogTransCookies() {
  const hostname = window.location.hostname;
  const expiry = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
  // Clear all domain/path variants that Google Translate may have set
  document.cookie = `googtrans=; ${expiry}; path=/`;
  document.cookie = `googtrans=; ${expiry}; path=/; domain=${hostname}`;
  document.cookie = `googtrans=; ${expiry}; path=/; domain=.${hostname}`;
  // Also clear on parent domain (e.g., .aca.org when on www.aca.org)
  const parts = hostname.split(".");
  if (parts.length > 2) {
    const parentDomain = parts.slice(1).join(".");
    document.cookie = `googtrans=; ${expiry}; path=/; domain=.${parentDomain}`;
  }
}

function triggerTranslate(langCode: string) {
  clearGoogTransCookies();

  if (langCode === "en") {
    window.location.reload();
    return;
  }

  document.cookie = `googtrans=/en/${langCode}; path=/`;
  document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${window.location.hostname}`;
  window.location.reload();
}

/** Desktop version — expanding icon style matching ExpandingIcon pattern */
export function LanguageSelectorDesktop({
  activeItem,
  setActiveItem,
  onDropdownOpenChange,
}: {
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
  onDropdownOpenChange?: (open: boolean) => void;
}) {
  const [dropdownOpen, _setDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuId = "language";
  const isActive = menuId === activeItem;

  const setDropdownOpen = useCallback(
    (open: boolean | ((prev: boolean) => boolean)) => {
      _setDropdownOpen((prev) => {
        const next = typeof open === "function" ? open(prev) : open;
        onDropdownOpenChange?.(next);
        if (next) setActiveItem(menuId);
        return next;
      });
    },
    [onDropdownOpenChange, setActiveItem]
  );

  useEffect(() => {
    setCurrentLang(getCurrentLanguage());
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={cn(
          "relative z-10 flex h-8 cursor-pointer items-center overflow-hidden rounded-full bg-transparent px-0 transition-all duration-300 ease-in-out",
          isActive && "bg-blue-300 px-2 hover:bg-blue-300"
        )}
        onMouseEnter={() => setActiveItem(menuId)}
        onClick={() => setDropdownOpen((prev) => !prev)}
        aria-label="Select language"
        type="button"
      >
        <Globe
          className={cn(
            "aspect-square h-5 transition-colors duration-300 ease-in-out",
            isActive ? "stroke-white" : "stroke-gray-300"
          )}
        />
        <span
          className={cn(
            "body-lg origin-right overflow-hidden text-sm font-medium whitespace-nowrap text-white transition-all duration-500 ease-in-out",
            isActive
              ? "ml-1 max-w-[150px] scale-100 opacity-100"
              : "ml-0 max-w-0 scale-95 opacity-0"
          )}
        >
          Language
        </span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                triggerTranslate(lang.code);
              }}
              className={cn(
                "body-lg flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-300 hover:text-white",
                currentLang === lang.code && "bg-blue-300 font-medium text-white"
              )}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Mobile version — simple select dropdown */
export function LanguageSelectorMobile() {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    setCurrentLang(getCurrentLanguage());
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      triggerTranslate(e.target.value);
    },
    []
  );

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 stroke-gray-700" />
      <select
        value={currentLang}
        onChange={handleChange}
        className="w-full appearance-none bg-transparent text-base text-gray-700 outline-none"
        aria-label="Select language"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
