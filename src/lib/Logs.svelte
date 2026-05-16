<script lang="ts">
  const mockLogs = [
    "[INFO] 14:02:41 Symphony started. Loading workflow from WORKFLOW.md",
    "[INFO] 14:02:42 Agent provider set to 'Codex'",
    "[INFO] 14:03:00 Polling Linear for 'In Progress' issues...",
    "[INFO] 14:03:01 Found 2 active issues: LLM-90, LLM-91",
    "[INFO] 14:03:02 Preparing workspace for LLM-91...",
    "[WARN] 14:03:04 Skipping LLM-90: Run already completed recently",
    "[INFO] 14:03:05 Initializing Codex agent in workspace run-004",
    "> executing agent init hook",
    "[INFO] 14:03:15 Agent ready. Starting execution phase.",
    "[INFO] 14:03:16 >> [Codex] Reading issue description for LLM-91",
    "[INFO] 14:03:20 >> [Codex] Identifying layout changes in App.svelte",
    "[INFO] 14:03:45 >> [Codex] Writing components: Dashboard.svelte, Runs.svelte...",
    "[INFO] 14:04:10 >> [Codex] Running type checks",
    "[INFO] 14:04:12 >> [Codex] Task complete. Collecting outputs.",
    "[INFO] 14:04:15 Run run-004 completed successfully.",
    "[INFO] 14:05:00 Polling Linear for 'In Progress' issues...",
    "[INFO] 14:05:01 No active issues found."
  ];
</script>

<div class="flex flex-col gap-6 h-full min-h-[80vh]">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-3xl font-black tracking-tight text-stone-900">System Logs</h2>
      <p class="mt-2 text-stone-600">Real-time output from Symphony orchestrator and agent workspaces.</p>
    </div>
    <div class="flex gap-2">
      <button class="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
        Clear
      </button>
      <button class="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
        Download
      </button>
    </div>
  </div>

  <div class="flex-1 rounded-2xl bg-stone-950 p-6 shadow-inner overflow-hidden flex flex-col">
    <div class="flex items-center gap-2 pb-4 border-b border-stone-800 mb-4">
      <div class="flex gap-1.5">
        <div class="h-3 w-3 rounded-full bg-red-500"></div>
        <div class="h-3 w-3 rounded-full bg-amber-500"></div>
        <div class="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <p class="ml-2 text-xs font-mono text-stone-400">symphony-orchestrator ~ tail -f /var/log/symphony.log</p>
    </div>

    <div class="flex-1 overflow-y-auto font-mono text-sm leading-relaxed text-stone-300">
      {#each mockLogs as log}
        <div class="mb-1">
          {#if log.startsWith('[INFO]')}
            <span class="text-emerald-400">[INFO]</span>{log.replace('[INFO]', '')}
          {:else if log.startsWith('[WARN]')}
            <span class="text-amber-400">[WARN]</span>{log.replace('[WARN]', '')}
          {:else if log.startsWith('[ERROR]')}
            <span class="text-red-400">[ERROR]</span>{log.replace('[ERROR]', '')}
          {:else if log.startsWith('>')}
            <span class="text-sky-400">{log}</span>
          {:else}
            {log}
          {/if}
        </div>
      {/each}
      <div class="mt-4 animate-pulse flex gap-1">
        <span class="text-emerald-400">_</span>
      </div>
    </div>
  </div>
</div>
