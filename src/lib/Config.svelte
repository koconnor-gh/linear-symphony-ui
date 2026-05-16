<script lang="ts">
  let selectedAgent = $state('codex');
  let apiKey = $state('');

  const agents = [
    { id: 'codex', name: 'Codex' },
    { id: 'jules', name: 'Jules' },
    { id: 'claude', name: 'Claude' },
    { id: 'gemini', name: 'Gemini' },
    { id: 'local', name: 'Local' }
  ];

  function handleSave(event: Event) {
    event.preventDefault();
    alert(`Configuration saved for ${selectedAgent}!`);
  }
</script>

<div class="flex flex-col gap-6">
  <div>
    <h2 class="text-3xl font-black tracking-tight text-stone-900">Configuration</h2>
    <p class="mt-2 text-stone-600">Manage agent providers, credentials, and symphony workflow settings.</p>
  </div>

  <div class="grid gap-6 lg:grid-cols-2">
    <article class="rounded-[2rem] border border-stone-300/70 bg-white p-8 shadow-sm">
      <h3 class="text-xl font-bold tracking-tight text-stone-900 mb-6">Agent Settings</h3>

      <form onsubmit={handleSave} class="flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label for="agent-provider" class="text-sm font-semibold text-stone-700">Agent Provider</label>
          <select
            id="agent-provider"
            bind:value={selectedAgent}
            class="rounded-xl border border-stone-300 bg-stone-50 p-3 text-stone-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {#each agents as agent}
              <option value={agent.id}>{agent.name}</option>
            {/each}
          </select>
          <p class="text-xs text-stone-500">The primary LLM agent that will execute workflow tasks.</p>
        </div>

        <div class="flex flex-col gap-2">
          <label for="api-key" class="text-sm font-semibold text-stone-700">API Key</label>
          <input
            type="password"
            id="api-key"
            bind:value={apiKey}
            placeholder="sk-..."
            class="rounded-xl border border-stone-300 bg-stone-50 p-3 text-stone-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <p class="text-xs text-stone-500">Securely stored and injected into the workspace at runtime.</p>
        </div>

        <div class="mt-4 flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
          <button type="button" class="rounded-full px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
            Cancel
          </button>
          <button type="submit" class="rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors shadow-sm">
            Save Config
          </button>
        </div>
      </form>
    </article>

    <article class="rounded-[2rem] border border-stone-300/70 bg-stone-50 p-8 shadow-sm flex flex-col gap-4 text-stone-600">
      <h3 class="text-xl font-bold tracking-tight text-stone-900">Symphony Workflow</h3>
      <p class="text-sm">
        The Symphony workflow dictates how the agent interacts with issues, prepares workspaces, and reports back.
      </p>

      <div class="mt-2 rounded-2xl bg-stone-200 p-5 font-mono text-xs text-stone-800 border border-stone-300/50">
        <p>1. Fetch 'In Progress' issues from Linear</p>
        <p>2. Provision clean workspace per issue</p>
        <p>3. Initialize {selectedAgent} agent</p>
        <p>4. Execute tasks based on issue description</p>
        <p>5. Collect diffs and update issue status</p>
      </div>

      <div class="mt-auto pt-4">
        <button class="text-emerald-600 font-medium text-sm hover:text-emerald-700 transition-colors">
          Edit workflow.yml &rarr;
        </button>
      </div>
    </article>
  </div>
</div>
