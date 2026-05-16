export interface RunEvent {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'success' | 'warning';
}

export interface Run {
  id: string;
  issueIdentifier: string;
  issueTitle: string;
  issueState: string;
  provider: string;
  attempt: number;
  workspacePath: string;
  lastEvent: string;
  sessionUrl?: string;
  prUrl?: string;
  events: RunEvent[];
}
