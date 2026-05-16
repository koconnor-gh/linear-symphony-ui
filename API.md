# Linear Symphony API Contract

This document outlines the mock API endpoints for Linear Symphony UI, which will be wired up to the frontend in future milestones.

## `GET /api/status`

Retrieves the top-level status of the Symphony instance, including agent metrics and queue states.

**Response:**
```json
{
  "activeRuns": 2,
  "retryQueue": 0,
  "configuredAgent": "Codex"
}
```

## `GET /api/runs`

Retrieves a list of active and recent agent runs, tracking workspace preparation, execution, and outputs.

**Response:**
```json
[
  {
    "id": "run-123",
    "issueId": "LLM-95",
    "status": "Run agent",
    "startedAt": "2023-10-24T12:00:00Z"
  }
]
```

## `GET /api/config`

Retrieves the current workflow and agent configuration.

**Response:**
```json
{
  "workflow": "WORKFLOW.md",
  "provider": "codex",
  "safeMode": true
}
```

## `GET /api/logs`

Retrieves structured execution logs. Can be filtered by `level`, `issue`, `provider`, and `event`.

**Query Parameters:**
- `level` (optional): `info`, `warn`, `error`
- `issue` (optional): e.g. `LLM-95`
- `provider` (optional): `codex`, `jules`, `claude`, `gemini`, `local`
- `event` (optional): `workspace_init`, `poll`, `agent_run`, etc.

**Response:**
```json
[
  {
    "id": "log-999",
    "timestamp": "2023-10-24T12:01:00Z",
    "level": "info",
    "issue": "LLM-95",
    "provider": "codex",
    "event": "workspace_init",
    "message": "Workspace successfully initialized for LLM-95"
  }
]
```

## `POST /api/reload`

Triggers a configuration reload for the Symphony instance.

**Request:**
```json
{}
```

**Response:**
```json
{
  "success": true,
  "message": "Configuration reloaded successfully."
}
```