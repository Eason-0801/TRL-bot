#!/bin/bash
# Usage: .deploy_watch.sh "<string that must appear in the deployed file once live>" "<url to check>"
cd "/c/Users/a0936/trl-website"
CHECK_STRING="$1"
URL="${2:-https://eason-0801.github.io/TRL-bot/}"

ELAPSED=0
while true; do
  sleep 8
  ELAPSED=$((ELAPSED + 8))
  if curl -s "$URL" | grep -qF "$CHECK_STRING"; then
    echo "DEPLOY SUCCESS after ${ELAPSED}s"
    exit 0
  fi
  echo "[$(date +%H:%M:%S)] not live yet (${ELAPSED}s elapsed)"
  if [ "$ELAPSED" -ge 90 ]; then
    echo "No change after 90s -- retrying with empty commit"
    git commit --allow-empty -m "Retrigger GitHub Pages deployment (auto-retry)" >/dev/null
    git push >/dev/null
    ELAPSED=0
  fi
done
