<script lang="ts">
  type ViewState = 'loading' | 'error' | 'empty' | 'success';
  let viewState: ViewState = $state('success');

  const mockData = {
    activeRuns: '12',
    retryQueue: '3',
    stalledFailures: '1',
    completedToday: '142',
    configuredProvider: 'Codex',
    activeLinearProject: 'LLM-92 Migration'
  };

  const getMetrics = () => [
    { label: 'Active runs', value: mockData.activeRuns, tone: 'bg-emerald-100 text-emerald-900' },
    { label: 'Retry queue', value: mockData.retryQueue, tone: 'bg-amber-100 text-amber-900' },
    { label: 'Stalled/failure count', value: mockData.stalledFailures, tone: 'bg-rose-100 text-rose-900' },
    { label: 'Completed today', value: mockData.completedToday, tone: 'bg-violet-100 text-violet-900' },
    { label: 'Configured provider', value: mockData.configuredProvider, tone: 'bg-sky-100 text-sky-900' },
    { label: 'Active Linear project', value: mockData.activeLinearProject, tone: 'bg-fuchsia-100 text-fuchsia-900' },
  ];

  const phases = ['Poll Linear', 'Prepare workspace', 'Run agent', 'Collect output'];
</script>

<div class="flex flex-col gap-8">
  <header class="rounded-[2rem] border border-stone-300/70 bg-[#fffaf0] p-8 shadow-sm">
    <div class="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-800">
        Linear Symphony UI
      </p>
      <div class="flex flex-wrap gap-2">
        {#each ['loading', 'error', 'empty', 'success'] as state}
          <button
            class="rounded-full px-3 py-1 text-xs font-medium transition-colors {viewState === state ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'}"
            onclick={() => viewState = state as ViewState}
          >
            {state}
          </button>
        {/each}
      </div>
    </div>
    <div class="grid gap-6 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
      <div>
        <h1 class="max-w-3xl text-5xl font-black tracking-[-0.05em] text-stone-950 md:text-6xl">
          Monitor the orchestra before the agents hit the cymbals.
        </h1>
        <p class="mt-5 max-w-2xl text-lg leading-8 text-stone-700">
          A web console for observing Linear polling, workspace lifecycle, agent sessions,
          retries, and runtime configuration for a Linear Symphony instance.
        </p>
      </div>
      <div class="rounded-3xl bg-stone-950 p-5 text-[#fffaf0]">
        <p class="text-sm uppercase tracking-[0.24em] text-emerald-200">Next milestone</p>
        <p class="mt-3 text-2xl font-bold">Wire this shell to live Symphony status endpoints.</p>
      </div>
    </div>
  </header>

  {#if viewState === 'loading'}
    <div class="flex animate-pulse flex-col items-center justify-center rounded-[2rem] border border-stone-300/80 bg-white/70 p-16 shadow-sm">
      <p class="text-xl font-bold text-stone-500">Loading symphony runtime data...</p>
    </div>
  {:else if viewState === 'error'}
    <div class="flex flex-col items-center justify-center rounded-[2rem] border border-rose-300/80 bg-rose-50 p-16 shadow-sm">
      <p class="text-xl font-bold text-rose-700">Failed to load runtime data</p>
      <p class="mt-2 text-rose-600">Please check your connection to the Symphony backend.</p>
      <button class="mt-6 rounded-xl bg-rose-600 px-5 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-rose-700" onclick={() => viewState = 'loading'}>
        Retry Connection
      </button>
    </div>
  {:else if viewState === 'empty'}
    <div class="flex flex-col items-center justify-center rounded-[2rem] border border-stone-300/80 bg-white/70 p-16 shadow-sm">
      <p class="text-xl font-bold text-stone-700">No active data</p>
      <p class="mt-2 text-stone-500">Symphony is running, but no jobs have been processed yet.</p>
    </div>
  {:else}
    <section class="grid gap-4 md:grid-cols-3">
      {#each getMetrics() as metric}
        <article class="flex flex-col rounded-3xl border border-stone-300/80 bg-white/70 p-6 shadow-sm">
          <p class="text-sm font-medium text-stone-500">{metric.label}</p>
          <div class="mt-auto flex pt-4">
            <p class={`inline-flex rounded-full px-4 py-2 ${metric.value.length > 10 ? 'text-xl' : 'text-3xl'} font-black ${metric.tone}`}>
              {metric.value}
            </p>
          </div>
        </article>
      {/each}
    </section>
  {/if}

  <section class="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
    <article class="rounded-[2rem] border border-stone-300/80 bg-white/80 p-6 shadow-sm">
      <h2 class="text-2xl font-black tracking-tight">Configuration Surface</h2>
      <p class="mt-3 text-stone-600">
        Edit safe workflow settings, validate proposed changes, and trigger reloads without exposing
        raw secrets.
      </p>
      <div class="mt-6 space-y-3">
        <div class="rounded-2xl bg-stone-100 p-4">
          <p class="text-xs uppercase tracking-[0.2em] text-stone-500">Workflow</p>
          <p class="mt-1 font-mono text-sm">WORKFLOW.md</p>
        </div>
        <div class="rounded-2xl bg-stone-100 p-4">
          <p class="text-xs uppercase tracking-[0.2em] text-stone-500">Agent Provider</p>
          <p class="mt-1 font-mono text-sm">codex | jules | claude | gemini | local</p>
        </div>
      </div>
    </article>

    <article class="rounded-[2rem] border border-stone-300/80 bg-stone-950 p-6 text-white shadow-sm">
      <h2 class="text-2xl font-black tracking-tight">Runtime Flow</h2>
      <div class="mt-6 grid gap-3 sm:grid-cols-2">
        {#each phases as phase, index}
          <div class="rounded-2xl border border-white/10 bg-white/10 p-4">
            <p class="text-sm text-emerald-200">Phase {index + 1}</p>
            <p class="mt-2 text-xl font-bold">{phase}</p>
          </div>
        {/each}
      </div>
    </article>
  </section>
</div>
