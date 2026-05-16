<script lang="ts">
  const metrics = [
    { label: 'Active runs', value: '0', tone: 'bg-emerald-100 text-emerald-900' },
    { label: 'Retry queue', value: '0', tone: 'bg-amber-100 text-amber-900' },
    { label: 'Configured agent', value: 'Codex', tone: 'bg-sky-100 text-sky-900' },
  ]

  const phases = ['Poll Linear', 'Prepare workspace', 'Run agent', 'Collect output']
</script>

<main class="min-h-screen bg-[#f7f4ec] px-6 py-8 text-stone-950">
  <section class="mx-auto flex max-w-6xl flex-col gap-8">
    <header class="rounded-[2rem] border border-stone-300/70 bg-[#fffaf0] p-8 shadow-sm">
      <p class="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-800">
        Linear Symphony UI
      </p>
      <div class="grid gap-6 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
        <div>
          <h1 class="max-w-3xl text-5xl font-black tracking-[-0.05em] text-stone-950 md:text-7xl">
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

    <section class="grid gap-4 md:grid-cols-3">
      {#each metrics as metric}
        <article class="rounded-3xl border border-stone-300/80 bg-white/70 p-6 shadow-sm">
          <p class="text-sm font-medium text-stone-500">{metric.label}</p>
          <p class={`mt-4 inline-flex rounded-full px-4 py-2 text-3xl font-black ${metric.tone}`}>
            {metric.value}
          </p>
        </article>
      {/each}
    </section>

    <section class="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <article class="rounded-[2rem] border border-stone-300/80 bg-white/80 p-6 shadow-sm">
        <h2 class="text-2xl font-black tracking-tight">Configuration Surface</h2>
        <p class="mt-3 text-stone-600">
          This starter repo is intentionally thin. Jules stories will add editable config panels,
          validation states, and safe apply/reload flows.
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
  </section>
</main>
