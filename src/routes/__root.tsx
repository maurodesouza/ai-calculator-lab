import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";

import { CalculatorHandler } from "@/components/handlers/calculator";
import { KeyboardHandler } from "@/components/handlers/keyboard";
import { ThemeHandler } from "@/components/handlers/theme";

import appCss from "../styles/global.css?url";

const THEME_INIT_SCRIPT = `
(function() {
  try {
    var STORAGE_KEY = 'ai-calculator-lab-theme';
    var stored = window.localStorage.getItem(STORAGE_KEY);
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.add('theme-' + theme);
  } catch (e) {}
})();
`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "AI Calculator Lab",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        children: THEME_INIT_SCRIPT,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <CalculatorHandler />
        <KeyboardHandler />
        <ThemeHandler />
        {props.children}
        <Scripts />
      </body>
    </html>
  );
}
