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

import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ANALYTICS } from "../lib/analytics";
import { LanguageProvider } from "../lib/i18n";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
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
      { title: "Al Rushd International — Heavy Equipment Rental in Saudi Arabia" },
      {
        name: "description",
        content:
          "Al Rushd International provides dependable forklift rental and heavy equipment solutions across Saudi Arabia, backed by quality machines and responsive service.",
      },
      { name: "author", content: "Al Rushd International" },
      { property: "og:title", content: "Al Rushd International — Heavy Equipment Rental in Saudi Arabia" },
      {
        property: "og:description",
        content:
          "Reliable heavy industrial equipment rental for construction, oil & gas and infrastructure projects across the Kingdom.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Al Rushd International" },
      { name: "twitter:card", content: "summary_large_image" },
      // Google Search Console verification placeholder — set token in src/lib/analytics.ts.
      ...(ANALYTICS.gscVerification
        ? [{ name: "google-site-verification", content: ANALYTICS.gscVerification }]
        : []),
      { name: "twitter:title", content: "Al Rushd International — Heavy Equipment Rental in Saudi Arabia" },
      { name: "description", content: "Al Rushd Digital Launch establishes a comprehensive online presence for industrial equipment rental companies." },
      { property: "og:description", content: "Al Rushd Digital Launch establishes a comprehensive online presence for industrial equipment rental companies." },
      { name: "twitter:description", content: "Al Rushd Digital Launch establishes a comprehensive online presence for industrial equipment rental companies." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/965c6a9f-3506-4ab3-a3f5-b9f12653e49c/id-preview-0c565339--658615a4-45dd-4f06-ab5f-fc1f91d58539.lovable.app-1782476997181.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/965c6a9f-3506-4ab3-a3f5-b9f12653e49c/id-preview-0c565339--658615a4-45dd-4f06-ab5f-fc1f91d58539.lovable.app-1782476997181.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
    scripts: [
      // Google Analytics 4 placeholder — set Measurement ID in src/lib/analytics.ts.
      ...(ANALYTICS.gaMeasurementId
        ? [
            {
              src: `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.gaMeasurementId}`,
              async: true,
            },
            {
              children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ANALYTICS.gaMeasurementId}');`,
            },
          ]
        : []),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Al Rushd International",
          description:
            "Heavy industrial equipment rental for construction, oil & gas and infrastructure projects across Saudi Arabia.",
          areaServed: "SA",
          email: "info@alrushd-intl.com",
          telephone: "+966500000000",
          address: {
            "@type": "PostalAddress",
            addressRegion: "Riyadh",
            addressCountry: "SA",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          <Footer />
          <FloatingActions />
        </div>
        <Toaster position="top-center" richColors />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
