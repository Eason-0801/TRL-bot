#!/bin/bash
cd "/c/Users/a0936/trl-website"
REPO="Eason-0801/TRL-bot"

while true; do
  SHA=$(git rev-parse HEAD)
  # wait for this SHA's run to appear and finish
  while true; do
    sleep 10
    RESULT=$(curl -s "https://api.github.com/repos/$REPO/actions/runs?head_sha=$SHA&per_page=5" | \
      "/c/Users/a0936/miniconda3/python.exe" -c "
import sys, json
data = json.load(sys.stdin)
runs = [r for r in data.get('workflow_runs', []) if r['name'] == 'pages build and deployment']
if not runs:
    print('none')
else:
    r = runs[0]
    print(r['status'] + ':' + (r['conclusion'] or 'null'))
")
    echo "[$(date +%H:%M:%S)] SHA=${SHA:0:7} status=$RESULT"
    if [ "$RESULT" = "completed:success" ]; then
      echo "DEPLOY SUCCESS for $SHA"
      exit 0
    fi
    if [ "$RESULT" = "completed:failure" ]; then
      echo "DEPLOY FAILED for $SHA — retrying with empty commit"
      break
    fi
    # still queued/in_progress/none -> keep waiting
  done
  git commit --allow-empty -m "Retrigger GitHub Pages deployment (auto-retry)" >/dev/null
  git push >/dev/null
done
