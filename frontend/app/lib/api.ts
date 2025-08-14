export function getApiBaseUrl(): string {
  return "/api";
}

import axios from "axios";

export const http = axios.create({
  baseURL: getApiBaseUrl(),
  headers: { "Content-Type": "application/json" },
  timeout: 60000,
});
