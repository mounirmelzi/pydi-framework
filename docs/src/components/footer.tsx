import { LINKS } from "@/data/static";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border border-primary rounded flex items-center justify-center bg-primary/10">
            <span className="font-mono text-[10px] font-bold text-primary">
              @
            </span>
          </div>
          <span className="font-semibold text-sm text-foreground">
            py<span className="text-primary">di</span>
          </span>
          <span className="text-xs font-mono text-muted-foreground ml-1">
            · MIT License
          </span>
        </div>

        <div className="flex items-center gap-6">
          {Object.entries(LINKS).map(([key, value]) => (
            <a
              key={key}
              href={value}
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              {key}
            </a>
          ))}
        </div>

        <p className="text-xs font-mono text-muted-foreground">
          Built with Python 3.14+ and ❤️ by{" "}
          <a
            href="https://www.linkedin.com/in/mounir-melzi/"
            target="_blank"
            className="text-sm underline italic text-[#ff557a] hover:text-primary transition-colors"
          >
            Mounir Melzi
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
