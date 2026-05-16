<script lang="ts">
  import type { Run } from './types';
  import { mockRuns } from './mockData';

  let runs: Run[] = mockRuns;
  let searchQuery = '';
  let selectedRun: Run | null = null;

  $: filteredRuns = runs.filter(run =>
    run.issueIdentifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    run.issueTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function selectRun(run: Run) {
    selectedRun = run;
  }
</script>

<div class="mt-12 rounded-[2rem] border border-stone-300/80 bg-white/80 p-6 shadow-sm">
  <h2 class="text-2xl font-black tracking-tight mb-6">Runs</h2>

  <div class="mb-4">
    <input
      type="text"
      bind:value={searchQuery}
      placeholder="Filter by issue ID or title..."
      class="w-full max-w-md rounded-xl border border-stone-300 bg-white px-4 py-2 text-stone-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
    />
  </div>

  <div class="grid gap-6 lg:grid-cols-[1.5fr_1fr] items-start">
    <div class="overflow-x-auto rounded-xl border border-stone-200">
      <table class="w-full text-left text-sm">
        <thead class="bg-stone-50 text-stone-500">
          <tr>
            <th class="px-4 py-3 font-medium">Issue</th>
            <th class="px-4 py-3 font-medium">State</th>
            <th class="px-4 py-3 font-medium">Provider</th>
            <th class="px-4 py-3 font-medium">Attempt</th>
            <th class="px-4 py-3 font-medium">Last Event</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-stone-200 bg-white">
          {#each filteredRuns as run}
            <tr
              class="cursor-pointer hover:bg-stone-50 transition-colors {selectedRun?.id === run.id ? 'bg-stone-100' : ''}"
              on:click={() => selectRun(run)}
            >
              <td class="px-4 py-3">
                <div class="font-medium text-stone-900">{run.issueIdentifier}</div>
                <div class="text-stone-500 text-xs truncate max-w-[200px]">{run.issueTitle}</div>
              </td>
              <td class="px-4 py-3">
                <span class="inline-flex rounded-full bg-stone-100 px-2 py-1 text-xs font-medium text-stone-600">
                  {run.issueState}
                </span>
              </td>
              <td class="px-4 py-3 font-mono text-xs">{run.provider}</td>
              <td class="px-4 py-3">{run.attempt}</td>
              <td class="px-4 py-3 text-stone-500 truncate max-w-[200px]">{run.lastEvent}</td>
            </tr>
          {/each}
          {#if filteredRuns.length === 0}
            <tr>
              <td colspan="5" class="px-4 py-8 text-center text-stone-500">
                No runs found matching "{searchQuery}"
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>

    <div class="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sticky top-6">
      {#if selectedRun}
        <div class="mb-4">
          <h3 class="text-lg font-bold text-stone-900">{selectedRun.issueIdentifier}</h3>
          <p class="text-stone-600">{selectedRun.issueTitle}</p>
        </div>

        <div class="space-y-4">
          <div>
            <p class="text-xs uppercase tracking-wider text-stone-500 mb-1">Workspace</p>
            <p class="font-mono text-sm bg-stone-50 p-2 rounded border border-stone-200 break-all">{selectedRun.workspacePath}</p>
          </div>

          {#if selectedRun.sessionUrl}
            <div>
              <p class="text-xs uppercase tracking-wider text-stone-500 mb-1">Session</p>
              <a href={selectedRun.sessionUrl} target="_blank" rel="noreferrer" class="text-emerald-600 hover:underline break-all text-sm">{selectedRun.sessionUrl}</a>
            </div>
          {/if}

          {#if selectedRun.prUrl}
            <div>
              <p class="text-xs uppercase tracking-wider text-stone-500 mb-1">Pull Request</p>
              <a href={selectedRun.prUrl} target="_blank" rel="noreferrer" class="text-emerald-600 hover:underline break-all text-sm">{selectedRun.prUrl}</a>
            </div>
          {/if}

          <div class="pt-4 border-t border-stone-100">
            <h4 class="font-medium text-stone-900 mb-4">Event Timeline</h4>
            <div class="space-y-3 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent hidden"></div>

            <ol class="relative border-l border-stone-200 ml-2 space-y-4">
              {#each selectedRun.events as event}
                <li class="pl-4 relative">
                  <div class="absolute w-2 h-2 bg-stone-300 rounded-full -left-[4.5px] top-1.5 border border-white"></div>
                  <div class="flex flex-col gap-1">
                    <span class="text-xs text-stone-500 font-mono">{new Date(event.timestamp).toLocaleTimeString()}</span>
                    <span class="text-sm font-medium {event.type === 'error' ? 'text-red-600' : event.type === 'success' ? 'text-emerald-600' : event.type === 'warning' ? 'text-amber-600' : 'text-stone-700'}">
                      {event.message}
                    </span>
                  </div>
                </li>
              {/each}
            </ol>
          </div>
        </div>
      {:else}
        <div class="flex h-64 items-center justify-center text-center text-stone-500">
          <p>Select a run from the table to view details</p>
        </div>
      {/if}
    </div>
  </div>
</div>
