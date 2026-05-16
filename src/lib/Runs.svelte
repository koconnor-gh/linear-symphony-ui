<script lang="ts">
  const mockRuns = [
    { id: 'run-004', issue: 'LLM-91', status: 'Running', agent: 'Codex', time: 'Just now', statusTone: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { id: 'run-003', issue: 'LLM-90', status: 'Completed', agent: 'Codex', time: '2h ago', statusTone: 'bg-stone-100 text-stone-600 border-stone-200' },
    { id: 'run-002', issue: 'LLM-89', status: 'Failed', agent: 'Jules', time: '5h ago', statusTone: 'bg-red-100 text-red-800 border-red-200' },
    { id: 'run-001', issue: 'LLM-88', status: 'Completed', agent: 'Claude', time: '1d ago', statusTone: 'bg-stone-100 text-stone-600 border-stone-200' },
  ];
</script>

<div class="flex flex-col gap-6">
  <div class="flex items-center justify-between">
    <h2 class="text-3xl font-black tracking-tight text-stone-900">Runs</h2>
    <button class="rounded-full bg-stone-950 px-4 py-2 text-sm font-medium text-[#fffaf0] hover:bg-stone-800 transition-colors">
      Trigger Run
    </button>
  </div>

  <div class="overflow-hidden rounded-[2rem] border border-stone-300/70 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead class="border-b border-stone-200 bg-stone-50">
          <tr>
            <th scope="col" class="px-6 py-4 font-semibold text-stone-500 uppercase tracking-wider text-xs">Run ID</th>
            <th scope="col" class="px-6 py-4 font-semibold text-stone-500 uppercase tracking-wider text-xs">Issue</th>
            <th scope="col" class="px-6 py-4 font-semibold text-stone-500 uppercase tracking-wider text-xs">Status</th>
            <th scope="col" class="px-6 py-4 font-semibold text-stone-500 uppercase tracking-wider text-xs">Agent</th>
            <th scope="col" class="px-6 py-4 font-semibold text-stone-500 uppercase tracking-wider text-xs">Time</th>
            <th scope="col" class="px-6 py-4 font-semibold text-stone-500 uppercase tracking-wider text-xs text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-stone-200 bg-white">
          {#each mockRuns as run}
            <tr class="hover:bg-stone-50 transition-colors">
              <td class="whitespace-nowrap px-6 py-4 font-mono font-medium text-stone-900">{run.id}</td>
              <td class="whitespace-nowrap px-6 py-4 font-medium text-blue-600 hover:underline cursor-pointer">{run.issue}</td>
              <td class="whitespace-nowrap px-6 py-4">
                <span class={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${run.statusTone}`}>
                  {run.status}
                </span>
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-stone-600">{run.agent}</td>
              <td class="whitespace-nowrap px-6 py-4 text-stone-500">{run.time}</td>
              <td class="whitespace-nowrap px-6 py-4 text-right">
                <button class="text-stone-400 hover:text-stone-900 font-medium text-sm transition-colors">
                  View details
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    {#if mockRuns.length === 0}
      <div class="p-12 text-center text-stone-500">
        No runs found. They will appear here once you trigger a workflow.
      </div>
    {/if}
  </div>
</div>
