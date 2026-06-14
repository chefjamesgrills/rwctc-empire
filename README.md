# RWCTC Local AI

Local AI backup running Llama 3.2 via Ollama. No API keys. No credits. No internet required.

## Stack
- **Ollama** — runs the model locally on your Mac
- **index.html** — browser-based chat UI, works on Mac + iPad (same WiFi)
- **start.sh** — one command to boot everything

## Quick Start

```bash
# 1. Install Ollama (first time only)
brew install ollama

# 2. Pull the model (first time only)
ollama pull llama3.2

# 3. Start everything
./start.sh
```

Then open `index.html` in your browser — or from iPad, go to `http://YOUR-MAC-IP:11434` after opening the HTML file on a local server.

## Models installed
- `llama3.2` — main model (2GB)

## Add more models anytime
```bash
ollama pull mistral
ollama pull llama3.2:1b   # lighter, faster
```

## Storage
Models live at `~/.ollama/models` — move this folder to an external drive to back them up.

---
Built by @chefjamesgrills / Redwoodchristmastreeclub LLC
