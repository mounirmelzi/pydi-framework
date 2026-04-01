import { Zap, Shield, RefreshCw, Code2, Box } from "lucide-react";

export const LINKS = {
  Docs: "https://mounirmelzi.github.io/pydi-framework/",
  PyPI: "https://pypi.org/project/pydi-framework/",
  GitHub: "https://github.com/mounirmelzi/pydi-framework",
  Examples: "https://github.com/mounirmelzi/pydi-framework/tree/main/examples",
} as const;

export const TICKER_ITEMS = [
  "⚡ Zero boilerplate",
  "🔒 Type-safe",
  "🧩 Framework agnostic",
  "♻️ Scoped lifetimes",
  "🐍 Pure Python",
] as const;

export const FEATURES = [
  {
    icon: Zap,
    title: "Zero Boilerplate",
    desc: "Define once, inject anywhere. No XML configs, pure Python with type hints.",
    accent: true,
  },
  {
    icon: Shield,
    title: "Type-Safe Resolution",
    desc: "Full mypy and pyright support. Catch missing dependencies at analysis time, not runtime.",
    accent: false,
  },
  {
    icon: RefreshCw,
    title: "Scoped Lifetimes",
    desc: "Choose exactly how long your dependencies live with full context manager support.",
    accent: false,
  },
  {
    icon: Code2,
    title: "Decorator-Based API",
    desc: "Natural Pythonic syntax using @inject. No special base classes or metaclasses required.",
    accent: false,
  },
  {
    icon: Box,
    title: "Framework Agnostic",
    desc: "Drop into Django, FastAPI, Flask, or bare Python scripts. No lock-in required.",
    accent: false,
  },
] as const;

export const SCOPES = [
  { name: "SINGLETON", desc: "Shared across the entire container" },
  { name: "LAZY SINGLETON", desc: "Created on first use" },
  { name: "FACTORY", desc: "New instance on every resolve" },
] as const;

export const STEPS = [
  {
    num: "01",
    title: "Register",
    desc: "Define dependencies and choose a registration mode (singleton, lazy singleton, factory). The container only knows what you explicitly register.",
    code: `<span class="text-amber-400">from</span> di <span class="text-amber-400">import</span> locator<span class="text-slate-400">,</span> RegistrationMode\n\n<span class="text-amber-400">class</span> <span class="text-cyan-300">Service</span><span class="text-slate-400">:</span>\n    <span class="text-slate-400">pass</span>\n\nlocator<span class="text-slate-400">.</span><span class="text-violet-400">register</span>(\n    Service,\n    <span class="text-amber-400">lambda</span>: Service(),\n    RegistrationMode<span class="text-slate-400">.</span>SINGLETON\n)`,
  },
  {
    num: "02",
    title: "Inject",
    desc: "Access dependencies either explicitly via the service locator or implicitly via @inject. Both paths use the same resolution engine.",
    code: `<span class="text-amber-400">from</span> di <span class="text-amber-400">import</span> inject<span class="text-slate-400">,</span> locator\n\n<span class="text-orange-400">@inject</span>(locator)\n<span class="text-amber-400">def</span> <span class="text-violet-400">process</span>(service<span class="text-slate-400">:</span> <span class="text-cyan-300">Service</span><span class="text-slate-400">):</span>\n    <span class="text-amber-400">return</span> service`,
  },
  {
    num: "03",
    title: "Resolve",
    desc: "Run your application code. Dependencies are constructed, wired, and cached according to their registration.",
    code: `<span class="text-violet-400">injected_service_instance</span> <span class="text-slate-400">=</span> <span class="text-violet-400">process</span>()`,
  },
] as const;
