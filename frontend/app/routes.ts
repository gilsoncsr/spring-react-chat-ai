import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  { path: "/chat", file: "routes/chat.tsx" },
  { path: "/api/chat", file: "routes/api.chat.ts" },
] satisfies RouteConfig;
