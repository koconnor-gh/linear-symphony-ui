import type { Run } from './types';

export const mockRuns: Run[] = [
  {
    id: 'run-1',
    issueIdentifier: 'LLM-93',
    issueTitle: 'Runs table and run detail timeline',
    issueState: 'In Progress',
    provider: 'jules',
    attempt: 1,
    workspacePath: '/tmp/symphony/LLM-93-abc',
    lastEvent: 'Opened PR #101',
    prUrl: 'https://github.com/koconnor-gh/linear-symphony-ui/pull/101',
    events: [
      { id: 'e1', timestamp: '2024-05-16T10:00:00Z', message: 'Started run', type: 'info' },
      { id: 'e2', timestamp: '2024-05-16T10:01:00Z', message: 'Cloned repository', type: 'info' },
      { id: 'e3', timestamp: '2024-05-16T10:05:00Z', message: 'Agent generated code', type: 'info' },
      { id: 'e4', timestamp: '2024-05-16T10:10:00Z', message: 'Opened PR #101', type: 'success' },
    ]
  },
  {
    id: 'run-2',
    issueIdentifier: 'LLM-90',
    issueTitle: 'Symphony web UI scaffolding',
    issueState: 'Done',
    provider: 'codex',
    attempt: 2,
    workspacePath: '/tmp/symphony/LLM-90-xyz',
    lastEvent: 'Agent execution failed',
    sessionUrl: 'http://localhost:3000/session/LLM-90',
    events: [
      { id: 'e5', timestamp: '2024-05-15T09:00:00Z', message: 'Started run', type: 'info' },
      { id: 'e6', timestamp: '2024-05-15T09:02:00Z', message: 'Failed to authenticate to Linear', type: 'error' },
      { id: 'e7', timestamp: '2024-05-15T09:10:00Z', message: 'Retrying... Attempt 2', type: 'warning' },
      { id: 'e8', timestamp: '2024-05-15T09:15:00Z', message: 'Agent execution failed', type: 'error' },
    ]
  }
];
