# Linear Symphony UI

A Svelte + Tailwind web console for monitoring and configuring a running
`linear-symphony` instance.

## Product Direction

The UI should make an operator confident that Symphony is healthy and explain what
the automation is doing at a glance.

Core jobs:

- Monitor Linear polling, active issues, retries, and stalled runs.
- Show per-issue workspaces, agent provider, current attempt, and recent events.
- Edit safe workflow settings and trigger config reloads.
- Expose clear failure states for missing credentials, invalid workflow config,
  Linear API failures, workspace hook failures, and agent execution failures.
- Support Jules, Codex, Claude, Gemini, and local providers as first-class agents.

## Development

```sh
npm install
npm run dev
```

Quality gates:

```sh
npm run check
npm run build
```
