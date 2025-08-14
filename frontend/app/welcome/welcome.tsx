import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Welcome() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-animate=logo]", {
        y: -20,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.from("[data-animate=card]", {
        y: 16,
        autoAlpha: 0,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div
        ref={containerRef}
        className="flex-1 flex flex-col items-center gap-16 min-h-0"
      >
        <header
          className="flex flex-col items-center gap-9"
          data-animate="logo"
        >
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src={logoDark}
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <div
          className="max-w-[560px] w-full space-y-6 px-4"
          data-animate="card"
        >
          <div className="rounded-3xl border border-gray-200 dark:border-gray-800 p-8 bg-white/70 dark:bg-gray-950/70 shadow-sm">
            <h2 className="text-xl font-semibold tracking-tight mb-2 text-center">
              Chat com IA
            </h2>
            <p className="leading-6 text-gray-700 dark:text-gray-300 text-center mb-6">
              Converse com um modelo leve local (Ollama). Rápido, minimalista e
              elegante.
            </p>
            <div className="flex justify-center">
              <a
                href="/chat"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-5 py-2 shadow hover:bg-blue-700 transition"
              >
                Começar agora
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l6 6a.75.75 0 1 1-1.06 1.06L14.75 6.81V20a.75.75 0 0 1-1.5 0V6.81l-4.22 4.22a.75.75 0 1 1-1.06-1.06l6-6Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
