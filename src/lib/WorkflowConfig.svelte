<script lang="ts">
  let trackerStates = $state('Triage, In Progress');
  let pollingInterval = $state(60);
  let workspaceRoot = $state('/tmp/workspaces');
  let agentProvider = $state('jules');
  let concurrency = $state(1);

  // Codex options
  let codexModel = $state('gpt-4o');

  // Jules options
  let julesSource = $state('local');
  let julesBranch = $state('main');
  let julesAutomationMode = $state('auto');

  // Secret Env Vars
  let linearApiKeyEnv = $state('LINEAR_API_KEY');
  let providerApiKeyEnv = $state('OPENAI_API_KEY');

  let applyStatus = $state('');

  let isValid = $derived(
    pollingInterval > 0 &&
    workspaceRoot.trim() !== '' &&
    trackerStates.trim() !== '' &&
    concurrency > 0 &&
    linearApiKeyEnv.trim() !== '' &&
    providerApiKeyEnv.trim() !== ''
  );

  function handleApply() {
    if (!isValid) return;
    applyStatus = 'Saving...';
    setTimeout(() => {
      applyStatus = 'Saved!';
      setTimeout(() => applyStatus = '', 3000);
    }, 500);
  }
</script>

<form class="space-y-6" onsubmit={(e) => { e.preventDefault(); handleApply(); }}>
  <fieldset class="space-y-4 rounded-xl border border-stone-200 p-4 bg-white/50">
    <legend class="px-2 font-semibold text-stone-700">General Settings</legend>

    <div>
      <label class="block text-sm font-medium text-stone-700" for="trackerStates">Tracker States</label>
      <input type="text" id="trackerStates" bind:value={trackerStates} class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm px-3 py-2 border bg-white" placeholder="e.g. Triage, In Progress" />
      {#if trackerStates.trim() === ''}
        <p class="mt-1 text-sm text-red-600">Tracker states are required.</p>
      {/if}
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-stone-700" for="pollingInterval">Polling Interval (s)</label>
        <input type="number" id="pollingInterval" bind:value={pollingInterval} class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm px-3 py-2 border bg-white" />
        {#if pollingInterval <= 0}
          <p class="mt-1 text-sm text-red-600">Must be > 0.</p>
        {/if}
      </div>

      <div>
        <label class="block text-sm font-medium text-stone-700" for="concurrency">Concurrency</label>
        <input type="number" id="concurrency" bind:value={concurrency} class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm px-3 py-2 border bg-white" />
        {#if concurrency <= 0}
          <p class="mt-1 text-sm text-red-600">Must be > 0.</p>
        {/if}
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-stone-700" for="workspaceRoot">Workspace Root</label>
      <input type="text" id="workspaceRoot" bind:value={workspaceRoot} class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm px-3 py-2 border bg-white" />
      {#if workspaceRoot.trim() === ''}
        <p class="mt-1 text-sm text-red-600">Workspace root is required.</p>
      {/if}
    </div>
  </fieldset>

  <fieldset class="space-y-4 rounded-xl border border-stone-200 p-4 bg-white/50">
    <legend class="px-2 font-semibold text-stone-700">Agent Configuration</legend>
    <div>
      <label class="block text-sm font-medium text-stone-700" for="agentProvider">Provider</label>
      <select id="agentProvider" bind:value={agentProvider} class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm px-3 py-2 border bg-white">
        <option value="jules">Jules</option>
        <option value="codex">Codex</option>
        <option value="claude">Claude</option>
        <option value="gemini">Gemini</option>
        <option value="local">Local</option>
      </select>
    </div>

    {#if agentProvider === 'codex'}
      <div class="space-y-4 border-t border-stone-200 pt-4 mt-4">
        <div>
          <label class="block text-sm font-medium text-stone-700" for="codexModel">Codex Model</label>
          <input type="text" id="codexModel" bind:value={codexModel} class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm px-3 py-2 border bg-white" />
        </div>
      </div>
    {/if}

    {#if agentProvider === 'jules'}
      <div class="space-y-4 border-t border-stone-200 pt-4 mt-4">
        <div>
          <label class="block text-sm font-medium text-stone-700" for="julesSource">Source</label>
          <input type="text" id="julesSource" bind:value={julesSource} class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm px-3 py-2 border bg-white" />
        </div>
        <div>
          <label class="block text-sm font-medium text-stone-700" for="julesBranch">Branch</label>
          <input type="text" id="julesBranch" bind:value={julesBranch} class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm px-3 py-2 border bg-white" />
        </div>
        <div>
          <label class="block text-sm font-medium text-stone-700" for="julesAutomationMode">Automation Mode</label>
          <select id="julesAutomationMode" bind:value={julesAutomationMode} class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm px-3 py-2 border bg-white">
            <option value="auto">Auto</option>
            <option value="manual">Manual</option>
          </select>
        </div>
      </div>
    {/if}
  </fieldset>

  <fieldset class="space-y-4 rounded-xl border border-stone-200 p-4 bg-white/50">
    <legend class="px-2 font-semibold text-stone-700">Environment Secrets</legend>
    <p class="text-xs text-stone-500">Provide environment variable references (e.g. LINEAR_API_KEY), not raw secret values.</p>

    <div>
      <label class="block text-sm font-medium text-stone-700" for="linearApiKeyEnv">Linear API Key Env Var</label>
      <input type="text" id="linearApiKeyEnv" bind:value={linearApiKeyEnv} placeholder="LINEAR_API_KEY" class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm px-3 py-2 border font-mono bg-stone-50" />
      {#if linearApiKeyEnv.trim() === ''}
        <p class="mt-1 text-sm text-red-600">Linear API Key Env Var is required.</p>
      {/if}
    </div>

    <div>
      <label class="block text-sm font-medium text-stone-700" for="providerApiKeyEnv">Provider API Key Env Var</label>
      <input type="text" id="providerApiKeyEnv" bind:value={providerApiKeyEnv} placeholder="OPENAI_API_KEY" class="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm px-3 py-2 border font-mono bg-stone-50" />
      {#if providerApiKeyEnv.trim() === ''}
        <p class="mt-1 text-sm text-red-600">Provider API Key Env Var is required.</p>
      {/if}
    </div>
  </fieldset>

  <div class="flex items-center gap-4">
    <button
      type="submit"
      disabled={!isValid}
      class="inline-flex justify-center rounded-xl bg-emerald-600 py-2.5 px-6 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors"
    >
      Apply Changes
    </button>
    {#if applyStatus}
      <span class="text-sm font-medium text-emerald-600 animate-pulse">{applyStatus}</span>
    {/if}
  </div>
</form>
