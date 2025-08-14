# Chat API com Spring Boot + Spring AI (Ollama)

## Requisitos

- Java 21
- Maven 3.9+
- Docker e Docker Compose

## Como rodar com Docker Compose

1. Build do jar:
   ```bash
   ./mvnw -q -DskipTests package
   ```
2. Subir os containers:
   ```bash
   docker compose up -d --build
   ```
3. Baixar o modelo no Ollama (primeira vez):
   ```bash
   docker exec -it ollama ollama pull mistral
   ```

## Testar API

- Health:
  ```bash
  curl http://localhost:8080/health
  ```
- Chat:
  ```bash
  curl -s -X POST http://localhost:8080/chat \
    -H 'Content-Type: application/json' \
    -d '{"message":"Olá, tudo bem?"}'
  ```

## Swagger

Acesse `http://localhost:8080/swagger-ui.html`.

## Métricas (Prometheus)

Acesse `http://localhost:8080/actuator/prometheus`.
