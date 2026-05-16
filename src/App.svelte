<script lang="ts">
  import { onMount } from 'svelte';
  import Dashboard from './lib/Dashboard.svelte';
  import Runs from './lib/RunsView.svelte';
  import Config from './lib/WorkflowConfig.svelte';
  import Logs from './lib/LogsView.svelte';

  let currentRoute = $state('dashboard');

  onMount(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (['dashboard', 'runs', 'config', 'logs'].includes(hash)) {
        currentRoute = hash;
      } else {
        currentRoute = 'dashboard';
        window.history.replaceState(null, '', '#dashboard');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  });

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'runs', label: 'Runs' },
    { id: 'config', label: 'Config' },
    { id: 'logs', label: 'Logs' }
  ];
</script>

<div class="flex min-h-screen flex-col bg-[#f7f4ec] text-stone-950 md:flex-row">
  <nav class="flex-shrink-0 bg-stone-950 text-stone-400 md:w-64 md:border-r md:border-stone-800">
    <div class="p-6">
      <h1 class="text-xl font-bold tracking-tight text-[#fffaf0]">Linear Symphony</h1>
    </div>
    <ul class="flex space-x-2 overflow-x-auto px-4 pb-4 md:flex-col md:space-x-0 md:space-y-1 md:px-3 md:pb-0">
      {#each navItems as item}
        <li class="whitespace-nowrap">
          <a
            href="#{item.id}"
            class="block rounded-lg px-4 py-2 transition-colors {currentRoute === item.id ? 'bg-stone-800 text-white font-medium' : 'hover:bg-stone-800/50 hover:text-white'}"
          >
            {item.label}
          </a>
        </li>
      {/each}
    </ul>
  </nav>

  <main class="flex-1 overflow-auto">
    <div class="mx-auto max-w-6xl p-6 md:p-8">
      {#if currentRoute === 'dashboard'}
        <Dashboard />
      {:else if currentRoute === 'runs'}
        <Runs />
      {:else if currentRoute === 'config'}
        <Config />
      {:else if currentRoute === 'logs'}
        <Logs />
      {/if}
    </div>
  </main>
</div>
