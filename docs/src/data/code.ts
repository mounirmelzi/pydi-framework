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

export const SCOPES_CODE = `<span class="text-cyan-300">di</span><span class="text-slate-400">.</span><span class="text-violet-400">locator</span>.<span class="text-violet-400">resolve</span>(<span class="text-cyan-300">Repository</span>).service.name  <span class="text-slate-500 italic"># "Local"</span>

<span class="text-amber-400">with</span> <span class="text-cyan-300">di</span>.<span class="text-violet-400">locator</span>.<span class="text-violet-400">override</span>():
    <span class="text-cyan-300">di</span>.<span class="text-violet-400">locator</span>.<span class="text-violet-400">resolve</span>(<span class="text-cyan-300">Repository</span>).service.name  <span class="text-slate-500 italic"># "Local"</span>

    <span class="text-cyan-300">di</span>.<span class="text-violet-400">locator</span>.<span class="text-violet-400">register</span>(
        <span class="text-cyan-300">Service</span>,
        <span class="text-amber-400">lambda</span>: <span class="text-cyan-300">Service</span>(<span class="text-amber-400">"Remote"</span>),
        <span class="text-cyan-300">di</span>.<span class="text-violet-400">RegistrationMode</span>.<span class="text-cyan-300">FACTORY</span>,
    )

    <span class="text-cyan-300">di</span>.<span class="text-violet-400">locator</span>.<span class="text-violet-400">resolve</span>(<span class="text-cyan-300">Repository</span>).service.name  <span class="text-slate-500 italic"># "Remote"</span>

<span class="text-cyan-300">di</span>.<span class="text-violet-400">locator</span>.<span class="text-violet-400">resolve</span>(<span class="text-cyan-300">Repository</span>).service.name  <span class="text-slate-500 italic"># "Local"</span>`;
