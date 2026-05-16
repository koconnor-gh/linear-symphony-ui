<script lang="ts">
  // Mock data for structured logs
  const allLogs = [
    { id: '1', timestamp: '10:00:01', level: 'info', issue: 'LLM-95', provider: 'codex', event: 'poll', message: 'Polling Linear for new issues...' },
    { id: '2', timestamp: '10:00:05', level: 'info', issue: 'LLM-95', provider: 'codex', event: 'workspace_init', message: 'Workspace prepared' },
    { id: '3', timestamp: '10:00:10', level: 'warn', issue: 'LLM-95', provider: 'jules', event: 'agent_run', message: 'Agent execution delayed' },
    { id: '4', timestamp: '10:00:15', level: 'error', issue: 'LLM-90', provider: 'claude', event: 'agent_run', message: 'API rate limit exceeded' },
    { id: '5', timestamp: '10:00:20', level: 'info', issue: 'LLM-95', provider: 'codex', event: 'collect_output', message: 'Output collected successfully' },
  ];

  let levelFilter = '';
  let issueFilter = '';
  let providerFilter = '';
  let eventFilter = '';

  $: filteredLogs = allLogs.filter(log => {
    return (
      (levelFilter === '' || log.level === levelFilter) &&
      (issueFilter === '' || log.issue === issueFilter) &&
      (providerFilter === '' || log.provider === providerFilter) &&
      (eventFilter === '' || log.event === eventFilter)
    );
  });
</script>

<article class="rounded-[2rem] border border-stone-300/80 bg-white/80 p-6 shadow-sm">
  <h2 class="text-2xl font-black tracking-tight">Logs</h2>
  <p class="mt-2 text-stone-600 mb-6">Structured logs of Symphony events</p>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <label class="flex flex-col text-sm text-stone-600">
      <span class="mb-1 font-semibold">Level</span>
      <select bind:value={levelFilter} class="rounded-lg border border-stone-300 p-2 bg-white text-stone-900">
        <option value="">All</option>
        <option value="info">Info</option>
        <option value="warn">Warn</option>
        <option value="error">Error</option>
      </select>
    </label>

    <label class="flex flex-col text-sm text-stone-600">
      <span class="mb-1 font-semibold">Issue</span>
      <select bind:value={issueFilter} class="rounded-lg border border-stone-300 p-2 bg-white text-stone-900">
        <option value="">All</option>
        <option value="LLM-90">LLM-90</option>
        <option value="LLM-95">LLM-95</option>
      </select>
    </label>

    <label class="flex flex-col text-sm text-stone-600">
      <span class="mb-1 font-semibold">Provider</span>
      <select bind:value={providerFilter} class="rounded-lg border border-stone-300 p-2 bg-white text-stone-900">
        <option value="">All</option>
        <option value="codex">Codex</option>
        <option value="jules">Jules</option>
        <option value="claude">Claude</option>
        <option value="gemini">Gemini</option>
        <option value="local">Local</option>
      </select>
    </label>

    <label class="flex flex-col text-sm text-stone-600">
      <span class="mb-1 font-semibold">Event Type</span>
      <select bind:value={eventFilter} class="rounded-lg border border-stone-300 p-2 bg-white text-stone-900">
        <option value="">All</option>
        <option value="poll">Poll</option>
        <option value="workspace_init">Workspace Init</option>
        <option value="agent_run">Agent Run</option>
        <option value="collect_output">Collect Output</option>
      </select>
    </label>
  </div>

  <div class="overflow-x-auto rounded-xl border border-stone-200">
    <table class="w-full text-left text-sm text-stone-600">
      <thead class="bg-stone-100 text-xs uppercase text-stone-500">
        <tr>
          <th class="px-4 py-3">Time</th>
          <th class="px-4 py-3">Level</th>
          <th class="px-4 py-3">Issue</th>
          <th class="px-4 py-3">Provider</th>
          <th class="px-4 py-3">Event</th>
          <th class="px-4 py-3">Message</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredLogs as log (log.id)}
          <tr class="border-t border-stone-200 hover:bg-stone-50 transition-colors">
            <td class="px-4 py-3 font-mono text-xs">{log.timestamp}</td>
            <td class="px-4 py-3">
              <span class="px-2 py-1 rounded-md text-xs font-bold
                {log.level === 'info' ? 'bg-sky-100 text-sky-800' : ''}
                {log.level === 'warn' ? 'bg-amber-100 text-amber-800' : ''}
                {log.level === 'error' ? 'bg-red-100 text-red-800' : ''}
              ">
                {log.level.toUpperCase()}
              </span>
            </td>
            <td class="px-4 py-3 font-mono">{log.issue}</td>
            <td class="px-4 py-3 capitalize">{log.provider}</td>
            <td class="px-4 py-3 font-mono text-xs">{log.event}</td>
            <td class="px-4 py-3 text-stone-900">{log.message}</td>
          </tr>
        {:else}
          <tr>
            <td colspan="6" class="px-4 py-8 text-center text-stone-500">
              No logs match the selected filters.
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</article>
