export const HERO_CODE = `<span class="text-amber-400">import</span> <span class="text-cyan-300">di</span>

<span class="text-amber-400">class</span> <span class="text-cyan-300">Service</span><span class="text-slate-400">:</span>
    <span class="text-amber-400">def</span> <span class="text-violet-400">__init__</span><span class="text-slate-400">(</span>self<span class="text-slate-400">,</span> name<span class="text-slate-400">:</span> <span class="text-cyan-300">str</span><span class="text-slate-400">):</span>
        <span class="text-amber-400">self</span><span class="text-slate-400">.</span>name <span class="text-slate-400">=</span> name

<span class="text-cyan-300">di.locator.register</span>(
    <span class="text-cyan-300">Service</span>,
    <span class="text-violet-400">lambda</span>: <span class="text-cyan-300">Service</span>(name=<span class="text-violet-400">"Local"</span>),
    <span class="text-cyan-300">di.RegistrationMode.FACTORY</span>
)
<span class="text-cyan-300">di.locator.register</span>(
    <span class="text-cyan-300">Service</span>,
    <span class="text-violet-400">lambda</span>: <span class="text-cyan-300">Service</span>(name=<span class="text-violet-400">"Remote"</span>),
    <span class="text-cyan-300">di.RegistrationMode.SINGLETON</span>,
    tag=<span class="text-violet-400">"prod"</span>
)

<span class="text-cyan-300">di.locator.resolve</span>(<span class="text-cyan-300">Service</span>)
<span class="text-cyan-300">di.locator.resolve</span>(<span class="text-cyan-300">Service</span>, tag=<span class="text-violet-400">"prod"</span>)`;

export const SCOPES_CODE = `<span class="text-amber-400">from</span> <span class="text-cyan-300">pyject</span> <span class="text-amber-400">import</span> <span class="text-cyan-300">Container</span><span class="text-slate-400">,</span> <span class="text-cyan-300">Scope</span>

c <span class="text-slate-400">=</span> <span class="text-cyan-300">Container</span><span class="text-slate-400">()</span>

<span class="text-slate-500 italic"># Singleton — one instance, forever</span>
c<span class="text-slate-400">.</span><span class="text-violet-400">register</span><span class="text-slate-400">(</span><span class="text-cyan-300">Database</span><span class="text-slate-400">,</span> scope<span class="text-slate-400">=</span><span class="text-cyan-300">Scope</span><span class="text-slate-400">.</span>SINGLETON<span class="text-slate-400">)</span>

<span class="text-slate-500 italic"># Transient — fresh instance each time</span>
c<span class="text-slate-400">.</span><span class="text-violet-400">register</span><span class="text-slate-400">(</span><span class="text-cyan-300">Request</span><span class="text-slate-400">,</span> scope<span class="text-slate-400">=</span><span class="text-cyan-300">Scope</span><span class="text-slate-400">.</span>TRANSIENT<span class="text-slate-400">)</span>

<span class="text-slate-500 italic"># Scoped — one per context block</span>
<span class="text-amber-400">with</span> c<span class="text-slate-400">.</span><span class="text-violet-400">scope</span><span class="text-slate-400">()</span> <span class="text-amber-400">as</span> s<span class="text-slate-400">:</span>
    a <span class="text-slate-400">=</span> s<span class="text-slate-400">.</span><span class="text-violet-400">resolve</span><span class="text-slate-400">(</span><span class="text-cyan-300">UnitOfWork</span><span class="text-slate-400">)</span>
    b <span class="text-slate-400">=</span> s<span class="text-slate-400">.</span><span class="text-violet-400">resolve</span><span class="text-slate-400">(</span><span class="text-cyan-300">UnitOfWork</span><span class="text-slate-400">)</span>
    <span class="text-violet-400">assert</span> a <span class="text-amber-400">is</span> b  <span class="text-slate-500 italic"># ✓ same instance</span>`;
