#!/bin/bash

# Get the absolute path of the directory where this script is located
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"

COMPOSE_FILE="$BASE_DIR/docker/docker-compose-prod.yml"
ENV_FILE="$BASE_DIR/config/.env.local"

if [ ! -f "$ENV_FILE" ]; then
    echo "⚠️  Error: $ENV_FILE not found."
    exit 1
fi

COMPOSE_BASE=(docker compose --project-directory "$BASE_DIR" -f "$COMPOSE_FILE" --env-file "$ENV_FILE")

case "$1" in
  up)
    echo "🚀 Starting services..."

    "${COMPOSE_BASE[@]}" up -d "${@:2}"
    echo "✅ Services started. Checking status..."
    "${COMPOSE_BASE[@]}" ps
    ;;
  down)
    echo "🛑 Stopping services..."
    "${COMPOSE_BASE[@]}" down
    ;;
  clean)
    echo "🧹 Cleaning up volumes and services..."
    "${COMPOSE_BASE[@]}" down -v
    ;;
  restart)
    echo "🔄 Restarting services..."
    "${COMPOSE_BASE[@]}" restart
    ;;
  logs)
    echo "📋 Streaming logs..."
    "${COMPOSE_BASE[@]}" logs -f "${@:2}"
    ;;
  status)
    "${COMPOSE_BASE[@]}" ps
    ;;
  *)
    echo "Usage: $0 {up|down|clean|restart|logs|status}"
    echo "Example: $0 up --build"
    exit 1
    ;;
esac