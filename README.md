# Chat (Spring Boot + Spring AI + Ollama + React)

Aplicação full-stack de chat com IA:

- Backend em Spring Boot (Java 21) integrando Spring AI e Ollama
- Frontend em React (React Router + Tailwind + React Query + GSAP)
- Orquestração com Docker Compose

## Arquitetura

- `backend/` API REST com endpoints:
  - `POST /chat` → `{ "message": "..." }` → `{ "response": "..." }`
  - `GET /health` → health check
  - Swagger: `/swagger-ui.html`
  - Métricas: `/actuator/prometheus`
- `frontend/` UI com:
  - Página de boas-vindas (`/`)
  - Página de chat (`/chat`) com bolhas, loading e tratamento de erros
  - Rota SSR `POST /api/chat` que faz proxy para o backend (evita CORS)
- `ollama` container com modelo (ex.: `llama3.2:1b`)

## Subir com Docker Compose

Pré-requisitos: Docker e Docker Compose instalados.

1. Subir os serviços (o backend é buildado dentro da imagem):
   ```bash
   docker compose up -d --build
   ```
2. Baixar o modelo no Ollama (primeira vez):
   ```bash
   docker exec -it ollama ollama pull 'llama3.2:1b'
   ```

## Acessos

- Frontend: `http://localhost:3000`
- Backend (API): `http://localhost:8080`
- Swagger: `http://localhost:8080/swagger-ui.html`
- Métricas: `http://localhost:8080/actuator/prometheus`

## Como funciona

- O frontend envia a mensagem para `POST /api/chat` (rota do próprio frontend), que faz proxy para `POST /chat` no backend.
- O backend utiliza Spring AI com provider Ollama para gerar a resposta.
- O frontend exibe as mensagens em bolhas, com animações (GSAP) e loading.

## Desenvolvimento local

- Frontend (dev):
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
- Backend:
  ```bash
  cd backend
  ./mvnw spring-boot:run
  ```

Em produção (Compose), a rota SSR usa `BACKEND_URL` para alcançar o backend no cluster.

## Notas

- Modelo padrão no backend: `llama3.2:1b` (alterável via `SPRING_AI_OLLAMA_CHAT_OPTIONS_MODEL`).
- Frontend chama sempre a própria rota `/api/chat` (sem CORS). O SSR encaminha para o backend usando `BACKEND_URL` (definido no docker-compose).
- Timeout de requisições no frontend: 60s (ajustável em `frontend/app/lib/api.ts`).
- Para trocar o modelo no Ollama: `docker exec -it ollama ollama pull '<modelo>'` e atualize a env do backend.
