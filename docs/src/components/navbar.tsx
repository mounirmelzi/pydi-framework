import { Button } from "@/components/ui/button";

import { LINKS } from "@/data/static";

export function Navbar({ scrolled }: { scrolled: boolean }) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border backdrop-blur-xl bg-background/85"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href={LINKS.Docs} className="flex items-center gap-2 group">
          <div className="relative w-7 h-7 flex items-center justify-center border border-primary rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <span className="font-mono text-xs font-bold text-primary">@</span>
          </div>
          <span className="font-semibold text-lg tracking-tight text-foreground">
            py<span className="text-primary">di</span>
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          {Object.entries(LINKS).map(([key, value]) => (
            <a
              key={key}
              href={value}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {key}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <code className="hidden sm:block text-xs font-mono bg-muted border border-border px-3 py-1.5 rounded-md text-primary select-all">
            pip install pydi-framework
          </code>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </nav>
  );
}
