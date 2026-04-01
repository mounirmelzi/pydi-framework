import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowRight,
  Star,
  Github,
  BookOpen,
  Terminal,
  ChevronRight,
} from "lucide-react";

import { CodeWindow } from "@/components/code-window";
import { SectionEyebrow } from "@/components/section-eyebrow";

import { HERO_CODE, SCOPES_CODE } from "@/data/code";
import { FEATURES, LINKS, SCOPES, STEPS, TICKER_ITEMS } from "@/data/static";

export function HomePage() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Features />
      <HowItWorks />
      <CTASection />
    </main>
  );
}

function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{
        backgroundImage:
          "linear-gradient(rgba(245,158,11,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.03) 1px,transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 40% 50%, rgba(245,158,11,0.06), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="animate-[fadeUp_0.6s_ease_forwards]">
            <Badge
              variant="outline"
              className="mb-7 gap-2 rounded-full border-border text-muted-foreground font-mono text-[11px]"
            >
              <Star size={11} className="fill-primary text-primary" />
              v1.0 · Python 3.14+
              <Separator orientation="vertical" className="h-3" />
              <span className="text-primary">stable</span>
            </Badge>

            <h1 className="text-5xl xl:text-7xl font-bold leading-[0.95] tracking-tight mb-6">
              <span className="text-foreground">Dependency</span>
              <br />
              <span className="text-foreground">Injection</span>
              <br />
              <span
                className="text-primary"
                style={{ textShadow: "0 0 40px rgba(245,158,11,0.4)" }}
              >
                done right.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
              A lightweight, type-safe DI framework for Python. Zero boilerplate
              and injection that just{" "}
              <em className="text-foreground not-italic font-medium">works</em>.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Button
                asChild
                size="lg"
                className="gap-2 shadow-[0_0_24px_rgba(245,158,11,0.3)] hover:shadow-[0_0_32px_rgba(245,158,11,0.45)]"
              >
                <a href={LINKS.Docs}>
                  Read the Docs <ArrowRight size={16} />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <a href={LINKS.Examples}>See Examples</a>
              </Button>
            </div>

            <div className="flex gap-8">
              {[
                ["< 5ms", "resolution time"],
                ["100%", "type-safe"],
                ["0", "dependencies"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold text-foreground">{v}</div>
                  <div className="text-xs font-mono text-muted-foreground mt-0.5">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: code window */}
          <div className="animate-[fadeUp_0.6s_0.15s_ease_forwards] opacity-0">
            <div className="relative">
              {/* Floating glow orb */}
              <div
                className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(245,158,11,0.12), transparent 70%)",
                  animation: "float 7s ease-in-out infinite",
                }}
              />

              <CodeWindow
                filename="service.py"
                code={HERO_CODE}
                className="shadow-[0_0_60px_rgba(0,0,0,0.5)] border-border/70"
              />

              {/* Install pill */}
              <div className="mt-4 flex justify-center">
                <div className="inline-flex items-center gap-3 bg-muted border border-border rounded-full px-5 py-2">
                  <span className="text-muted-foreground text-xs font-mono">
                    $
                  </span>
                  <code className="text-sm font-mono text-primary">
                    pip install pydi-framework
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = Array(4).fill(TICKER_ITEMS).flat();
  return (
    <div className="py-4 border-y border-border bg-muted/30 overflow-hidden whitespace-nowrap">
      <div
        className="inline-block"
        style={{ animation: "ticker 28s linear infinite" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-block mx-8 text-sm font-mono text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Features() {
  return (
    <section className="py-28 border-t border-border relative overflow-hidden">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-72 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(245,158,11,0.05), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <SectionEyebrow>Why pydi-framework</SectionEyebrow>

        <div className="grid md:grid-cols-2 gap-4 items-end mb-16">
          <h2 className="text-4xl xl:text-5xl font-bold text-foreground leading-tight">
            Everything you need.
            <br />
            <span className="text-primary">Nothing you don't.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed md:text-right max-w-xs md:ml-auto">
            Built with a sharp focus on developer experience, correctness, and
            zero runtime surprises.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid gap-4 mb-24 grid-cols-[repeat(auto-fit,minmax(400px,auto))]">
          {FEATURES.map(({ icon: Icon, title, desc, accent }) => (
            <Card
              key={title}
              className={`group transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 ${
                accent
                  ? "border-primary/50 bg-primary/5 shadow-[0_0_30px_rgba(245,158,11,0.08)]"
                  : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
                    accent
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted border border-border text-primary"
                  }`}
                >
                  <Icon size={16} />
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {desc}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lifetimes deep-dive */}
        <div className="grid lg:grid-cols-2 gap-12 items-center border-t border-border pt-20">
          <div>
            <SectionEyebrow>Scoped Lifetimes</SectionEyebrow>
            <h3 className="text-3xl xl:text-4xl font-bold text-foreground mb-4 leading-tight">
              Fine-grained control
              <br />
              over object lifetimes
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-7">
              Choose exactly how long your dependencies live. singleton, lazy
              singleton, or factory with full context manager support.
            </p>
            <div className="space-y-3">
              {SCOPES.map(({ name, desc }) => (
                <div key={name} className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="font-mono text-[11px] text-primary border-primary/40 bg-primary/5 shrink-0"
                  >
                    {name}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{desc}</span>
                </div>
              ))}
            </div>
          </div>
          <CodeWindow filename="scopes.py" code={SCOPES_CODE} />
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionEyebrow>How It Works</SectionEyebrow>
          <h2 className="text-4xl xl:text-5xl font-bold text-foreground leading-tight">
            {STEPS.length} steps.
            <br />
            <span className="text-primary">That's it.</span>
          </h2>
        </div>

        <div className="relative grid lg:grid-cols-3 gap-8">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute top-8 left-[calc(33.33%+1.5rem)] right-[calc(33.33%+1.5rem)] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)",
            }}
          />

          {STEPS.map(({ num, title, desc, code }) => (
            <div key={num} className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center shrink-0"
                  style={{ boxShadow: "0 0 20px rgba(245,158,11,0.15)" }}
                >
                  <span className="font-bold text-base text-primary font-mono">
                    {num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {desc}
              </p>

              <Card className="overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-muted/40">
                  <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                  <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                  <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                </div>
                <pre className="p-4 text-xs font-mono leading-6 text-muted-foreground overflow-x-auto">
                  <code dangerouslySetInnerHTML={{ __html: code }} />
                </pre>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            asChild
            variant="outline"
            className="gap-2 border-primary/40 text-primary hover:bg-primary/5"
          >
            <a href={LINKS.Docs}>
              Read the full documentation <ChevronRight size={15} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-28 border-t border-border relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245,158,11,0.07), transparent 60%)",
        }}
      />
      <div
        className="absolute top-0 left-0 w-56 h-56 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 10%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 10%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(circle at top left, black, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-56 h-56 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 10%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 10%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(circle at bottom right, black, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl xl:text-6xl font-bold text-foreground leading-tight mb-5">
          Start injecting
          <br />
          <span
            className="text-primary"
            style={{ textShadow: "0 0 40px rgba(245,158,11,0.4)" }}
          >
            in seconds.
          </span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg mx-auto">
          Drop PyDi Framework into any Python project with a single command and
          wire up your entire object graph automatically.
        </p>

        {/* Install block */}
        <div
          className="inline-flex items-center gap-4 bg-card border border-border rounded-2xl px-8 py-5 mb-10"
          style={{ boxShadow: "0 0 40px rgba(245,158,11,0.12)" }}
        >
          <Terminal size={20} className="text-primary" />
          <code className="font-mono text-xl text-foreground tracking-wide">
            pip install pydi-framework
          </code>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="gap-2 shadow-[0_0_24px_rgba(245,158,11,0.25)]"
          >
            <a href={LINKS.Docs}>
              <BookOpen size={16} /> Documentation
            </a>
          </Button>

          <Button asChild size="lg" variant="outline" className="gap-2">
            <a href={LINKS.GitHub}>
              <Github size={16} /> View on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
