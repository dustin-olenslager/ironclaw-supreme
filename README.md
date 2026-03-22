# 🦾 IronClaw Supreme — Production-Hardened OpenClaw Fork

[![Based on OpenClaw](https://img.shields.io/badge/Based%20on-OpenClaw%20v2026.3.14-blue?style=for-the-badge)](https://github.com/openclaw/openclaw)
[![Production Ready](https://img.shields.io/badge/Production-Hardened-green?style=for-the-badge)](https://github.com/dustin-olenslager/ironclaw-supreme)
[![Security](https://img.shields.io/badge/Security-Community%20Validation-orange?style=for-the-badge)](https://github.com/dustin-olenslager/ironclaw-supreme)

A production-hardened fork of [OpenClaw](https://github.com/openclaw/openclaw) with host-level monitoring, browser process management, community skills security validation, and automated version tracking.

> **Philosophy:** IronClaw adds host-level production tooling that OpenClaw — as an application running inside Docker — cannot provide. All custom code lives in isolated directories (`scripts/`, `skills/`, `config/`) with zero modifications to OpenClaw core files.

---

## 🆚 IronClaw Supreme vs OpenClaw

| Area | OpenClaw | IronClaw Supreme |
|------|----------|------------------|
| **Browser Process Management** | Application-level sandbox/relay | Host-level process monitoring, cleanup, and limits |
| **Community Skills Security** | Plugin integrity checks + `--pin` | Whitelist validation against awesome-openclaw-skills + safety scoring |
| **Version Monitoring** | Manual version checks | Automated daily checks with Telegram alerts |
| **Host Health Monitoring** | None (runs inside container) | Daily optimization, health checks, Chrome monitoring |
| **Production Documentation** | General setup docs | Migration guide, production deployment guide |
| **Fork Management** | N/A | Automated upstream sync workflow |

> **Note:** OpenClaw v2026.3.14 significantly improved its built-in security (plugin pinning, SSRF guarding, browser relay auth, sandbox registry). IronClaw's value is in the **host-level layer** that complements these application-level protections.

---

## 🎯 Core Components

### 🖥️ Browser Hardening (`scripts/`)
Host-level Chrome/Chromium process management for containerized OpenClaw deployments:

- **`chrome-process-limiter.sh`** — Real-time monitoring with configurable process/memory limits and daemon mode
- **`enhanced-browser-cleanup-v2.sh`** — Smart process termination and resource recovery
- **`browser-health-monitor.sh`** — Periodic health checks with alerting
- **`daily-optimization.sh`** — Automated maintenance (Docker prune, log rotation, resource cleanup)
- **`health-check.js`** — Gateway endpoint health verification

```bash
# Monitor Chrome processes
./scripts/chrome-process-limiter.sh daemon

# Run cleanup
./scripts/enhanced-browser-cleanup-v2.sh

# Daily maintenance
./scripts/daily-optimization.sh

# System health check
node scripts/health-check.js
```

### 🔒 Community Skills Security (`skills/community-skills/`)
Automated validation system for community OpenClaw skills:

- Validates against [awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills) approved repository
- GitHub metrics-based safety scoring (stars, forks, activity, license)
- Complete audit logging of installation attempts
- User confirmation required even for approved skills

```bash
cd skills/community-skills
node validate-skill.js <skill-name>
```

### 📊 Version Monitoring (`skills/ironclaw-version-monitor/`)
Automated upstream tracking with Telegram notifications:

- Daily version comparison against upstream OpenClaw releases
- Telegram alerts when updates are available
- Commit delta and changelog summary

```bash
cd skills/ironclaw-version-monitor
node version-checker.js --now

# Test Telegram notifications
node telegram-notifier.js --test
```

### 🔄 Fork Management (`scripts/update-from-upstream.sh`)
Automated upstream sync workflow:

```bash
./scripts/update-from-upstream.sh
```

---

## 📁 Custom File Layout

All IronClaw additions are isolated from OpenClaw core:

```
ironclaw-supreme/
├── scripts/                          ← Host-level tools
│   ├── chrome-process-limiter.sh     ← Process monitoring daemon
│   ├── enhanced-browser-cleanup-v2.sh← Smart cleanup
│   ├── browser-health-monitor.sh     ← Health monitoring
│   ├── daily-optimization.sh         ← Daily maintenance
│   ├── health-check.js               ← Gateway health check
│   ├── update-from-upstream.sh       ← Fork sync helper
│   └── test-chrome-fix.sh            ← Chrome fix verification
├── skills/
│   ├── community-skills/             ← Skills security validator
│   │   ├── validate-skill.js         ← Main validator
│   │   ├── test-validator.js         ← Test suite
│   │   ├── SKILL.md                  ← Skill documentation
│   │   └── package.json
│   └── ironclaw-version-monitor/     ← Version tracking
│       ├── version-checker.js        ← Version comparison
│       ├── telegram-notifier.js      ← Telegram alerts
│       ├── setup.js                  ← Initial setup
│       ├── cron-job-config.json      ← Cron schedule
│       ├── SKILL.md                  ← Skill documentation
│       └── package.json
├── config/
│   ├── browser-monitoring-config.json← Browser monitor config
│   └── chrome-process-limits.json    ← Process limit thresholds
├── PRODUCTION_GUIDE.md               ← Production deployment guide
├── MIGRATION_GUIDE.md                ← Migration from vanilla OpenClaw
├── UPSTREAM_WORKFLOW.md              ← Fork management workflow
├── FORK_STRATEGY_ANALYSIS.md         ← Fork strategy documentation
└── [OpenClaw core files...]          ← Unmodified upstream
```

---

## 🚀 Getting Started

### Quick Setup

```bash
# Clone this fork
git clone https://github.com/dustin-olenslager/ironclaw-supreme.git
cd ironclaw-supreme

# Follow standard OpenClaw setup
# See: https://github.com/openclaw/openclaw#getting-started

# Enable browser monitoring (optional, for production)
chmod +x scripts/*.sh
./scripts/chrome-process-limiter.sh daemon

# Set up version monitoring (optional)
cd skills/ironclaw-version-monitor
npm install
node setup.js
```

### Migrating from Vanilla OpenClaw

See [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) for step-by-step instructions.

### Production Deployment

See [PRODUCTION_GUIDE.md](PRODUCTION_GUIDE.md) for production hardening recommendations.

---

## 🔄 Staying Updated

IronClaw Supreme tracks upstream OpenClaw releases. To update:

```bash
./scripts/update-from-upstream.sh
```

See [UPSTREAM_WORKFLOW.md](UPSTREAM_WORKFLOW.md) for the full merge workflow.

---

## 🛡️ Security

- **Community skills** are validated against approved repositories before installation
- **All custom code** is isolated in `scripts/`, `skills/`, `config/` — zero changes to OpenClaw core
- **Browser processes** are monitored and limited to prevent resource exhaustion
- Report security issues via [GitHub Issues](https://github.com/dustin-olenslager/ironclaw-supreme/issues)

---

## 🔗 Links

- **Upstream**: [openclaw/openclaw](https://github.com/openclaw/openclaw)
- **Community Skills DB**: [awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills)
- **Issues**: [GitHub Issues](https://github.com/dustin-olenslager/ironclaw-supreme/issues)

---

*IronClaw Supreme — Host-level production hardening for OpenClaw.*
