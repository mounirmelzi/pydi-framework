export const HERO_CODE = `<span class="text-amber-400">from</span> <span class="text-cyan-300">pyject</span> <span class="text-amber-400">import</span> <span class="text-violet-400">inject</span><span class="text-slate-400">,</span> <span class="text-violet-400">injectable</span><span class="text-slate-400">,</span> <span class="text-cyan-300">Container</span>

<span class="text-orange-400">@injectable</span>
<span class="text-amber-400">class</span> <span class="text-cyan-300">Database</span><span class="text-slate-400">:</span>
    <span class="text-amber-400">def</span> <span class="text-violet-400">__init__</span><span class="text-slate-400">(</span>self<span class="text-slate-400">,</span> url<span class="text-slate-400">:</span> <span class="text-cyan-300">str</span><span class="text-slate-400">):</span>
        <span class="text-amber-400">self</span><span class="text-slate-400">.</span>url <span class="text-slate-400">=</span> url

<span class="text-orange-400">@injectable</span>
<span class="text-amber-400">class</span> <span class="text-cyan-300">UserService</span><span class="text-slate-400">:</span>
    <span class="text-orange-400">@inject</span>
    <span class="text-amber-400">def</span> <span class="text-violet-400">__init__</span><span class="text-slate-400">(</span>self<span class="text-slate-400">,</span> db<span class="text-slate-400">:</span> <span class="text-cyan-300">Database</span><span class="text-slate-400">):</span>
        <span class="text-amber-400">self</span><span class="text-slate-400">.</span>db <span class="text-slate-400">=</span> db  <span class="text-slate-500 italic"># resolved automatically</span>

service <span class="text-slate-400">=</span> <span class="text-cyan-300">Container</span><span class="text-slate-400">().</span><span class="text-violet-400">resolve</span><span class="text-slate-400">(</span><span class="text-cyan-300">UserService</span><span class="text-slate-400">)</span>`;

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
