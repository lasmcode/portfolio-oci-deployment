#!/bin/bash

# Get the absolute path of the directory where this script is located
# This ensures the script works regardless of where it's called from
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"

# Define paths based on the project structure
COMPOSE_FILE="$BASE_DIR/docker/docker-compose-prod.yml"
ENV_FILE="$BASE_DIR/config/.env.local"

# Check if the environment file exists to prevent Docker from failing silently
if [ ! -f "$ENV_FILE" ]; then
    echo "⚠️  Error: $ENV_FILE not found."
    exit 1
fi

# Base command using an Array to safely handle paths and arguments
COMPOSE_BASE=(docker compose --project-directory "$BASE_DIR" -f "$COMPOSE_FILE" --env-file "$ENV_FILE")

case "$1" in
  up)
    echo "🚀 Starting services..."
    # --wait ensures containers are healthy before finishing the command
    # "${@:2}" allows passing extra flags like --build
    "${COMPOSE_BASE[@]}" up -d --wait "${@:2}"
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
  *)
    echo "Usage: $0 {up|down|clean|restart|logs}"
    echo "Example: $0 up --build"
    exit 1
    ;;
esac