#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Install nodi-cloud app: npm install, build, and configure systemd service."""
from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

from tool import head, desc, info, warn, fail, done


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Constants
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

APP_NAME = "nodi-cloud"
APP_DIR = Path("/root/nodi-cloud")
SERVICE_FILE = Path(f"/etc/systemd/system/{APP_NAME}.service")
APP_PORT = 20300

SERVICE_CONTENT = f"""[Unit]
Description=nodi-cloud Next.js Application
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory={APP_DIR}
ExecStart=/usr/bin/npm run start
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT={APP_PORT}

[Install]
WantedBy=multi-user.target
"""


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Installation
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

head("Install nodi-cloud App")


# ────────────────────────────────────────────────────────────
# Check Prerequisites
# ────────────────────────────────────────────────────────────

desc("Check Prerequisites")

if os.geteuid() != 0:
    fail("This script must be run as root.")
    info("Usage: sudo python3 install_app.py")
    sys.exit(1)

if not APP_DIR.exists():
    fail(f"App directory not found: {APP_DIR}")
    sys.exit(1)

result = subprocess.run(["node", "--version"], capture_output=True, text=True)
if result.returncode != 0:
    fail("Node.js not installed. Run install_node.py first.")
    sys.exit(1)

info(f"node={result.stdout.strip()}")


# ────────────────────────────────────────────────────────────
# Install Dependencies
# ────────────────────────────────────────────────────────────

desc("Install Dependencies")

result = subprocess.run(["npm", "ci", "--production=false"],
                        cwd=APP_DIR, capture_output=True, text=True)
if result.returncode != 0:
    fail("npm ci failed.")
    info(result.stderr[-500:] if len(result.stderr) > 500 else result.stderr)
    sys.exit(1)

info("npm dependencies installed.")


# ────────────────────────────────────────────────────────────
# Build
# ────────────────────────────────────────────────────────────

desc("Build")

result = subprocess.run(["npm", "run", "build"],
                        cwd=APP_DIR, capture_output=True, text=True)
if result.returncode != 0:
    fail("Build failed.")
    info(result.stderr[-500:] if len(result.stderr) > 500 else result.stderr)
    sys.exit(1)

info("Production build complete.")


# ────────────────────────────────────────────────────────────
# Configure Systemd Service
# ────────────────────────────────────────────────────────────

desc("Configure Systemd Service")

if SERVICE_FILE.exists():
    warn(f"Service file already exists: {SERVICE_FILE}")

SERVICE_FILE.write_text(SERVICE_CONTENT)
info(f"{SERVICE_FILE}")

subprocess.run(["systemctl", "daemon-reload"], check=True)
info("systemd daemon reloaded.")


# ────────────────────────────────────────────────────────────
# Enable and Start Service
# ────────────────────────────────────────────────────────────

desc("Enable and Start Service")

subprocess.run(["systemctl", "enable", APP_NAME], check=True)
subprocess.run(["systemctl", "restart", APP_NAME], check=True)

result = subprocess.run(["systemctl", "is-active", APP_NAME],
                        capture_output=True, text=True)
if result.stdout.strip() == "active":
    done(f"{APP_NAME} is running on port {APP_PORT}.")
else:
    warn(f"Service status: {result.stdout.strip()}")


# ────────────────────────────────────────────────────────────
# Done
# ────────────────────────────────────────────────────────────

desc("Done")
done(f"http://localhost:{APP_PORT}")
