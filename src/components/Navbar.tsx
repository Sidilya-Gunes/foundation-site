import React, { useState, useEffect } from "react";
import { NAV_LINKS } from "../constants";
import { Page } from "../types";
import { searchContent } from "../services/api";

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

interface SearchResult {
  id: string;
  title: string;
  category?: string;
  publishedDate?: string;
  coverImage?: { url: string };
  documentId: string;
  type: "article" | "report";
  slug?: string;
  file?: { url: string };
  description?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 1) {
        setIsSearching(true);
        try {
          const results = await searchContent(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error("Search failed", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
  };

  const handleLinkClick = (pageId: Page) => {
    setPage(pageId);
    setIsOpen(false);
    setActiveDropdown(null);
    closeSearch();
    window.location.hash = pageId;
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === "report" && result.file?.url) {
      window.open(`http://localhost:1337${result.file.url}`, "_blank");
      closeSearch();
    } else if (result.slug) {
      // Navigate to article detail
      // We ONLY change hash here. App.tsx listens to hashchange and updates state (Page & Slug).
      // Calling setPage() here would overwrite the state and nullify the slug.
      window.location.hash = `article/${result.slug}`;
      closeSearch();
    } else {
      console.error("No slug for article:", result);
    }
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    // Clear previous state just in case, though closeSearch handles it on exit
    setSearchQuery("");
    setTimeout(() => document.getElementById("search-input")?.focus(), 100);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-purple-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo on the left */}
            <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => handleLinkClick('home')}>
              <div className="w-8 h-8 bg-brand-purple-100 rounded-full flex items-center justify-center text-brand-purple-600 font-bold text-lg border border-brand-purple-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xl font-bold text-brand-purple-900 leading-none tracking-tight">OpenHeart</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest leading-none">Foundation</span>
              </div>
            </div>

            {/* Desktop Menu & Search */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="flex items-center space-x-1 mr-4">
                {NAV_LINKS.map((link) => (
                  <div
                    key={link.id}
                    className="relative group py-2"
                    onMouseEnter={() =>
                      link.subItems && setActiveDropdown(link.id)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      onClick={() => !link.subItems && handleLinkClick(link.id)}
                      className={`px-4 py-2 text-sm font-medium transition-all rounded-full flex items-center space-x-1 ${
                        currentPage === link.id ||
                        link.subItems?.some((s) => s.id === currentPage)
                          ? "text-brand-purple-600 bg-brand-purple-50"
                          : "text-gray-600 hover:text-brand-purple-500 hover:bg-gray-50"
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.subItems && (
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === link.id ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </button>

                    {/* Desktop Dropdown */}
                    {link.subItems && (
                      <div
                        className={`absolute left-0 mt-1 w-56 bg-white border border-brand-purple-50 rounded-2xl shadow-xl py-2 transition-all duration-200 origin-top-left ${
                          activeDropdown === link.id
                            ? "opacity-100 scale-100 visible"
                            : "opacity-0 scale-95 invisible"
                        }`}
                      >
                        {link.subItems.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => handleLinkClick(sub.id)}
                            className={`w-full text-left px-5 py-2.5 text-sm transition-colors ${
                              currentPage === sub.id
                                ? "text-brand-purple-600 bg-brand-purple-50 font-semibold"
                                : "text-gray-600 hover:text-brand-purple-500 hover:bg-gray-50"
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop Search Button */}
              <button
                onClick={openSearch}
                className="p-3 text-gray-400 hover:text-brand-purple-600 hover:bg-brand-purple-50 rounded-full transition-all"
                title="Ara"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Actions (Search + Menu Toggle) */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={openSearch}
                className="text-gray-600 p-2 focus:outline-none active:scale-95"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 p-2 focus:outline-none transition-transform active:scale-90"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu content */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-brand-purple-50 animate-in slide-in-from-top duration-300">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <div key={link.id} className="space-y-1">
                  <button
                    onClick={() =>
                      link.subItems
                        ? setActiveDropdown(
                            activeDropdown === link.id ? null : link.id,
                          )
                        : handleLinkClick(link.id)
                    }
                    className={`flex justify-between items-center w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                      currentPage === link.id
                        ? "text-brand-purple-600 bg-brand-purple-50"
                        : "text-gray-700 hover:text-brand-purple-50"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.subItems && (
                      <svg
                        className={`w-5 h-5 transition-transform ${activeDropdown === link.id ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>

                  {link.subItems && activeDropdown === link.id && (
                    <div className="pl-6 space-y-1 animate-in slide-in-from-left duration-200">
                      {link.subItems.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleLinkClick(sub.id)}
                          className={`block w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                            currentPage === sub.id
                              ? "text-brand-purple-600"
                              : "text-gray-500 hover:text-brand-purple-500"
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-brand-purple-900/90 backdrop-blur-sm animate-in fade-in duration-300 flex flex-col">
          {/* Close Button */}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex-1 max-w-3xl w-full mx-auto px-6 py-24 flex flex-col">
            {/* Search Input */}
            <div className="relative mb-12">
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-white/20 text-white text-4xl md:text-5xl font-serif font-bold placeholder:text-white/20 focus:border-brand-yellow-400 outline-none pb-4 transition-all"
                placeholder="Ne aramıştınız?"
              />
              {isSearching && (
                <div className="absolute right-0 bottom-4 animate-spin">
                  <svg
                    className="w-8 h-8 text-brand-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
              {searchResults.length > 0 ? (
                <>
                  <p className="text-white/50 uppercase tracking-widest text-xs font-bold mb-4">
                    Sonuçlar
                  </p>
                  {searchResults.map((result) => (
                    <div
                      key={result.id + result.type}
                      onClick={() => handleResultClick(result)}
                      className="group flex items-center p-4 bg-white/5 hover:bg-white/10 rounded-2xl cursor-pointer transition-all border border-transparent hover:border-white/10"
                    >
                      {result.coverImage?.url && (
                        <img
                          src={`http://localhost:1337${result.coverImage.url}`}
                          className="w-16 h-16 object-cover rounded-xl mr-4"
                          alt={result.title}
                        />
                      )}

                      {result.type === "report" && (
                        <div className="w-16 h-16 bg-white/10 rounded-xl mr-4 flex items-center justify-center text-white/50">
                          <svg
                            className="w-8 h-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                      )}

                      <div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest block mb-1 ${result.type === "report" ? "text-brand-green-400" : "text-brand-yellow-400"}`}
                        >
                          {result.type === "report"
                            ? "Rapor & Arşiv"
                            : `${result.category || "İçerik"}`}
                        </span>
                        <h4 className="text-white font-bold text-xl leading-tight group-hover:text-brand-yellow-400 transition-colors">
                          {result.title}
                        </h4>
                      </div>
                      <svg
                        className="w-6 h-6 text-white/20 ml-auto group-hover:translate-x-1 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  ))}
                </>
              ) : (
                searchQuery.length > 2 &&
                !isSearching && (
                  <div className="text-center text-white/30 py-10">
                    <p className="text-xl font-light">Sonuç bulunamadı.</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
