#!/bin/bash
# RWCTC Local AI — startup script

echo "🔥 Starting RWCTC Local AI..."

# Start Ollama in background if not already running
if ! pgrep -x "ollama" > /dev/null; then
  echo "→ Starting Ollama server..."
  ollama serve &
  sleep 2
else
  echo "→ Ollama already running"
fi

# Open the chat UI in default browser
echo "→ Opening chat UI..."
open index.html

echo "✓ Done. Chat UI open. To stop Ollama: pkill ollama"
