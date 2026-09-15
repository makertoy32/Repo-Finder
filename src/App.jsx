import { useState } from "react";
import "./App.css";
import { motion } from "motion/react";

function App() {
  const [repoInfo, setrepoInfo] = useState({});
  const [language, setlanguage] = useState("JavaScript");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  const [languageSearch, setLanguageSearch] = useState("");
  const [showLanguages, setShowLanguages] = useState(false);

  const languages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C",
    "C++",
    "C#",
    "Go",
    "Rust",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "Dart",
    "R",
    "Scala",
    "Perl",
    "Lua",
    "Haskell",
    "Elixir",
    "Erlang",
    "Clojure",
    "Objective-C",
    "Shell",
    "PowerShell",
    "MATLAB",
    "Julia",
    "Groovy",
    "Fortran",
    "COBOL",
    "Assembly",
    "Solidity",
  ];

  const filteredLanguages = languages.filter((lang) =>
    lang.toLowerCase().includes(languageSearch.toLowerCase())
  );

  async function fetchData() {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=language:${language}`
    );

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          "GitHub API rate limit reached. Please try again later."
        );
      }

      throw new Error(
        `GitHub could not complete the request (${response.status}).`
      );
    }

    const data = await response.json();
    return data;
  }

  async function click() {
    setloading(true);
    setError("");

    try {
      const it = await fetchData();

      if (!it.items?.length) {
        throw new Error(`No ${language} repositories were found.`);
      }

      const randomNum = Math.floor(Math.random() * it.items.length);

      setrepoInfo(it.items[randomNum]);
    } catch (error) {
      console.log(error);
      setError(
        error.message ||
          "Something went wrong while fetching the repository."
      );
    } finally {
      setloading(false);
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 px-4 py-10 text-white sm:px-6">
      <div className="mx-auto flex min-h-[90vh] w-full max-w-4xl flex-col items-center">

        {/* Header */}
        <div className="mb-10 text-center">
          <motion.h1
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
>
  GitHub Random Repository
</motion.h1>

          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Discover a random repository based on your favorite programming
            language.
          </p>
        </div>

        {/* Controls */}
        <div className="flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-slate-700 bg-slate-900/80 p-4 shadow-xl sm:flex-row">

          {/* Searchable Language Dropdown */}
          <div className="relative w-full sm:flex-1">
            <input
              type="text"
              placeholder="Search programming language..."
              value={languageSearch}
              onFocus={() => setShowLanguages(true)}
              onChange={(e) => {
                setLanguageSearch(e.target.value);
                setShowLanguages(true);
              }}
              className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />

            {showLanguages && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-xl border border-slate-700 bg-slate-800 shadow-2xl">

                {filteredLanguages.length > 0 ? (
                  filteredLanguages.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setlanguage(lang);
                        setLanguageSearch("");
                        setShowLanguages(false);
                      }}
                      className="block w-full px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-blue-600"
                    >
                      {lang}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-3 text-sm text-slate-400">
                    No language found
                  </p>
                )}

              </div>
            )}

            <p className="mt-2 text-xs text-slate-500">
              Selected:{" "}
              <span className="text-blue-400">
                {language}
              </span>
            </p>
          </div>

          {/* Get / Refresh Button */}
          <button
            onClick={click}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {repoInfo.full_name ? "Refresh Repo" : "Get Repo"}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-blue-500"></div>

            <p className="text-slate-300">
              Loading, please wait...
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div
            role="alert"
            className="mt-10 w-full max-w-xl rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-center"
          >
            <p className="font-semibold text-red-400">
              {error}
            </p>

            <button
              onClick={click}
              className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold transition hover:bg-red-500 active:scale-95"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Repository Card */}
        {repoInfo.full_name && !loading && !error && (
          <div className="mt-10 w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/90 p-5 shadow-2xl sm:p-7">

            <div className="border-b border-slate-700 pb-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                Repository
              </p>

              <h2 className="wrap-break-word text-2xl font-bold sm:text-3xl">
                {repoInfo.full_name}
              </h2>

              <p className="mt-3 wrap-break-word text-sm leading-6 text-slate-400 sm:text-base">
                {repoInfo.description || "No description available."}
              </p>
            </div>

            {/* Repository Stats */}
            <div className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-3">

              <div className="rounded-xl bg-slate-800 p-4">
                <p className="text-xs uppercase text-slate-500">
                  Language
                </p>

                <p className="mt-1 font-semibold">
                  {repoInfo.language || "Not specified"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-800 p-4">
                <p className="text-xs uppercase text-slate-500">
                  Stars
                </p>

                <p className="mt-1 font-semibold">
                  ⭐ {repoInfo.stargazers_count}
                </p>
              </div>

              <div className="rounded-xl bg-slate-800 p-4">
                <p className="text-xs uppercase text-slate-500">
                  Forks
                </p>

                <p className="mt-1 font-semibold">
                  🍴 {repoInfo.forks_count}
                </p>
              </div>
            </div>

            {/* Open Issues */}
            <div className="mb-5 rounded-xl bg-slate-800 p-4">
              <p className="text-xs uppercase text-slate-500">
                Open Issues
              </p>

              <p className="mt-1 font-semibold">
                {repoInfo.open_issues_count}
              </p>
            </div>

            {/* GitHub Link */}
            <a
              href={repoInfo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full truncate rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold transition hover:bg-blue-500 active:scale-[0.98]"
            >
              View Repository on GitHub →
            </a>
          </div>
        )}

      </div>
    </main>
  );
}

export default App;