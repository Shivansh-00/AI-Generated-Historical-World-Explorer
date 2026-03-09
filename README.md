# REALITYARCHIVE — AI Generated Historical World Explorer

REALITYARCHIVE is a production-leaning full-stack platform that converts natural-language historical prompts into explorable 3D worlds with AI historian NPCs.

## Architecture (Stage 1)

```text
.
├── frontend/
│   ├── src/components/          # Prompt UI, timeline slider, loading screen, dialogue panel
│   ├── src/scenes/              # Three.js/R3F historical world scene
│   ├── src/engine/              # World/camera/city/NPC/sound/weather simulation engines
│   ├── src/store/               # Zustand scene state manager
│   ├── src/constants/           # Global world configuration
│   ├── src/hooks/               # API mutation hooks
│   ├── src/services/            # HTTP client integration
│   ├── src/utils/               # Asset loading, perf, and event bus helpers
│   └── src/types/               # Shared scene/domain types
├── backend/
│   ├── src/config/              # Environment config loader
│   ├── src/routes/              # Route registration
│   ├── src/controllers/         # Request validation + response handling
│   ├── src/services/            # Domain orchestration
│   ├── src/ai/                  # LLM + templates + retrieval layer
│   ├── src/database/            # Repository abstraction (replace with Firestore/DynamoDB)
│   ├── src/middleware/          # Global error middleware
│   ├── src/utils/               # Logger/utilities
│   └── src/types/               # Backend domain contracts
└── infrastructure/
    ├── docker/                  # Local compose deployment
    ├── aws/                     # AWS rollout notes
    ├── gcp/                     # GCP rollout notes
    └── terraform/               # IaC starter
```

## Backend APIs (Stage 2)

### `POST /api/world/generate`
Generates structured world JSON from prompt.

### `POST /api/world/evolve`
Evolves world to a target timeline year and persists `currentYear`.

### `GET /api/world/:worldId`
Fetches an already generated world state.

### `POST /api/npc/dialogue`
Asks NPC for contextual historical response grounded in `time_period` + `currentYear`.

## Frontend/Backend Connectivity

- Frontend service layer maps directly to backend routes in `frontend/src/services/api.ts`.
- Store-driven app state (`worldStore`) keeps `currentWorld`, `timelineYear`, `selectedNPC`, loading, and error states synchronized.
- Timeline slider updates the backend (`/api/world/evolve`) and rehydrates the world scene with evolved values.
- NPC click -> event bus -> selected NPC -> `/api/npc/dialogue` roundtrip.
- Camera mode toggle is wired from UI state into the Three.js controls layer.

## Three.js World Engine (Stage 3)

- React Three Fiber canvas scene orchestration.
- Procedural terrain, ring roads, and district-driven city layout.
- Instanced meshes and LOD helper hooks for GPU efficiency.
- Clickable NPC agents with crowd micro-motion and interaction bus events.
- First-person and orbit controls with centralized camera settings.
- Weather system (rain/fog/sunset/clear) and ambience sound hook.
- Loading overlay while generation/evolution operations run.

## Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Docker

```bash
docker compose -f infrastructure/docker/docker-compose.yml up --build
```
