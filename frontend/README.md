# Chat Frontend (React Router + Tailwind + React Query)

## Scripts

- Dev: `npm run dev`
- Build: `npm run build`
- Start (SSR built): `npm start`

## Backend Proxy

O Vite está configurado para proxy de `/api` -> `http://localhost:8080`. O endpoint do backend esperado é `POST /chat` com corpo `{ "message": "..." }` e resposta `{ "response": "..." }`.

## Rotas

- `/` página de boas-vindas
- `/chat` página do chat
