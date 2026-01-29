#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Install Node.js 20.x for nodi-cloud."""
from __future__ import annotations

import os
import subprocess
import sys

from tool import head, desc, info, warn, fail, done


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Constants
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NODE_MAJOR_VERSION = 20
NODESOURCE_URL = f"https://deb.nodesource.com/setup_{NODE_MAJOR_VERSION}.x"


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Installation
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

head("Install Node.js")


# ────────────────────────────────────────────────────────────
# Check Prerequisites
# ────────────────────────────────────────────────────────────

desc("Check Prerequisites")

if os.geteuid() != 0:
    fail("This script must be run as root.")
    info("Usage: sudo python3 install_node.py")
    sys.exit(1)


# ────────────────────────────────────────────────────────────
# Check Existing
# ────────────────────────────────────────────────────────────

desc("Check Existing")

result = subprocess.run(["node", "--version"], capture_output=True, text=True)
if result.returncode == 0:
    current_version = result.stdout.strip()
    major = int(current_version.lstrip("v").split(".")[0])
    if major >= NODE_MAJOR_VERSION:
        info(f"Node.js {current_version} already installed.")
        done("Skip installation.")
        sys.exit(0)
    else:
        warn(f"Node.js {current_version} found. Upgrading to {NODE_MAJOR_VERSION}.x")
else:
    info("Node.js not found.")


# ────────────────────────────────────────────────────────────
# Add NodeSource Repository
# ────────────────────────────────────────────────────────────

desc("Add NodeSource Repository")

result = subprocess.run(
    ["bash", "-c", f"curl -fsSL {NODESOURCE_URL} | bash -"],
    capture_output=True, text=True
)
if result.returncode != 0:
    fail("Failed to add NodeSource repository.")
    info(result.stderr)
    sys.exit(1)

info(f"NodeSource {NODE_MAJOR_VERSION}.x repository added.")


# ────────────────────────────────────────────────────────────
# Install Node.js
# ────────────────────────────────────────────────────────────

desc("Install Node.js")

result = subprocess.run(["apt-get", "install", "-y", "nodejs"],
                        capture_output=True, text=True)
if result.returncode != 0:
    fail("Failed to install Node.js.")
    info(result.stderr)
    sys.exit(1)


# ────────────────────────────────────────────────────────────
# Verify
# ────────────────────────────────────────────────────────────

desc("Verify")

node_ver = subprocess.run(["node", "--version"], capture_output=True, text=True)
npm_ver = subprocess.run(["npm", "--version"], capture_output=True, text=True)

info(f"node={node_ver.stdout.strip()}")
info(f"npm={npm_ver.stdout.strip()}")


# ────────────────────────────────────────────────────────────
# Done
# ────────────────────────────────────────────────────────────

desc("Done")
done(f"Node.js {NODE_MAJOR_VERSION}.x installed.")
