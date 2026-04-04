#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${1:-dev}"
HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-3000}"
BASE_PATH="${BASE_PATH:-}"

if command -v pnpm >/dev/null 2>&1; then
  PM=(pnpm)
else
  PM=(corepack pnpm)
fi

run_pm() {
  if [ "${PM[0]}" = "corepack" ]; then
    corepack pnpm "$@"
  else
    "${PM[@]}" "$@"
  fi
}

ensure_dependencies() {
  if [ ! -d "${ROOT_DIR}/node_modules" ]; then
    echo "Installing dependencies..."
    (cd "${ROOT_DIR}" && run_pm install --frozen-lockfile)
  fi
}

usage() {
  cat <<'EOF'
Usage: scripts/host-preview.sh [dev|prod|static]

Environment variables:
  HOST       Hostname for local dev/prod serving (default: 127.0.0.1)
  PORT       Port for local dev/prod serving (default: 3000)
  BASE_PATH  Optional subpath for static export hosts like GitHub Pages
EOF
}

case "${MODE}" in
  dev)
    ensure_dependencies
    echo "Starting dev server on http://${HOST}:${PORT}"
    cd "${ROOT_DIR}"
    HOST="${HOST}" PORT="${PORT}" npm run dev -- --hostname "${HOST}" --port "${PORT}"
    ;;
  prod)
    ensure_dependencies
    echo "Building production preview..."
    cd "${ROOT_DIR}"
    run_pm build
    echo "Serving production build on http://${HOST}:${PORT}"
    HOST="${HOST}" PORT="${PORT}" npm run start -- --hostname "${HOST}" --port "${PORT}"
    ;;
  static)
    ensure_dependencies
    echo "Building static export..."
    cd "${ROOT_DIR}"
    STATIC_EXPORT=1 BASE_PATH="${BASE_PATH}" npm run build:static
    echo "Static export ready at ${ROOT_DIR}/out"
    if [ -n "${BASE_PATH}" ]; then
      echo "Built with BASE_PATH=${BASE_PATH}"
    else
      echo "Tip: set BASE_PATH=/repo-name for GitHub Pages project sites."
    fi
    ;;
  *)
    usage
    exit 1
    ;;
esac
