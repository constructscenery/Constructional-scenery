import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

import { motion } from "motion/react";
import { Nav } from "../components/landing/Nav";

function NotFoundComponent() {
  return (
    <main className="bg-background text-foreground flex flex-col min-h-screen">
      <Nav />
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 bg-[radial-gradient(circle_at_50%_40%,_rgba(0,0,0,0.1)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_40%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center max-w-2xl"
        >
          <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-chrome">404 Error</p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight text-ink text-balance mb-6">
            Lost in the workshop.
          </h1>
          <p className="text-base md:text-lg text-ink-soft mb-10 max-w-md mx-auto">
            The page or case study you're looking for doesn't exist, has been moved, or is still under construction.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-background transition-transform hover:scale-105 active:scale-95 shadow-elevated"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Construct Scenery — We Build Worlds That Audiences Believe" },
      {
        name: "description",
        content:
          "The UK's premium scenic construction partner for film, television, brands and live experiences. From concept to camera-ready.",
      },
      { name: "author", content: "Construct Scenery" },
      { property: "og:title", content: "Construct Scenery — We Build Worlds" },
      {
        property: "og:description",
        content:
          "Premium scenic construction for film, TV, brands and live experiences. 20+ years. 500+ productions. UK wide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Inter+Tight:wght@500;600;700;800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const themeScript = `(function(){try{var s=localStorage.getItem('cs-theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=(s==='light'||s==='dark')?s:(m?'dark':'light');var r=document.documentElement;if(t==='dark')r.classList.add('dark');r.style.colorScheme=t;}catch(e){}})();`;
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";

function GlobalLoader() {
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 bg-[radial-gradient(circle_at_50%_40%,_rgba(0,0,0,0.1)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_40%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="h-10 w-10 rounded-full border-2 border-chrome border-t-ink mb-6 relative z-10"
          />
          <p className="text-[11px] uppercase tracking-[0.3em] text-chrome relative z-10 animate-pulse">Loading World</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalLoader />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
