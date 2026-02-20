---
name: IronClaw Supreme Self-Update
description: How to update this IronClaw Supreme instance when the user requests it
---

# IronClaw Supreme Self-Update

## When to Use This Skill

Use this skill when the user says any of:
- "Update yourself"
- "Pull the latest"
- "Update IronClaw"
- "There's an update available"
- "Update from the fork"
- "Self update"
- "Get the latest version"

## What This Does

This IronClaw Supreme instance tracks `dustin-olenslager/ironclaw-supreme` on GitHub.
Updates include the latest OpenClaw upstream code PLUS IronClaw-specific hardening,
tested and quality-controlled by the maintainer before being pushed.

## Update Procedure

### Step 1: Check What's Available

Run this command first to see what would change:

```bash
bash /home/node/.openclaw/workspace/scripts/self-update.sh --check
```

**Report the output to the user.** Tell them:
- How many commits behind they are
- What the recent changes include
- Whether it includes an OpenClaw upstream merge (look for "Update to OpenClaw" in commit messages)

If the output says `UP_TO_DATE`, tell the user they're already on the latest version. Stop here.

### Step 2: Confirm with the User

Before proceeding, tell the user:
> "There are **N** commits available. This update includes: [summary of changes].
> I'll pull the update and restart. You'll lose this conversation session — start a new one after.
> Proceed?"

**Wait for confirmation.** Do NOT proceed without the user saying yes.

### Step 3: Pull the Update

```bash
bash /home/node/.openclaw/workspace/scripts/self-update.sh --restart
```

**Important:** The `--restart` flag will restart the gateway after pulling.
This means the current session will end. Warn the user about this.

If the user does NOT want a restart, use this instead (pull only):

```bash
bash /home/node/.openclaw/workspace/scripts/self-update.sh
```

Note: Without restart, code changes won't take effect until the next restart.

### Step 4: Confirm Success

After the script runs, check the output:
- `✅ Updated successfully!` — Report the before/after commits and changes
- `✅ Already up to date.` — Tell the user no action was needed
- `❌` or error — Report the error and suggest manual intervention

## Troubleshooting

If the update fails, try these in order:

### Remote URL is wrong
```bash
git -C /home/node/.openclaw/workspace remote set-url origin https://github.com/dustin-olenslager/ironclaw-supreme.git
```

### Merge conflicts
```bash
cd /home/node/.openclaw/workspace
git stash
git pull origin main --ff-only
git stash pop
```

### Nuclear option (reset to latest)
⚠️ Only suggest this if the user confirms — it discards local changes:
```bash
cd /home/node/.openclaw/workspace
git fetch origin main
git reset --hard origin/main
```

## Safety Rules

1. **Always check first** (`--check`) before pulling
2. **Always confirm** with the user before executing the update
3. **Warn about restart** — the session will end
4. **Never run the nuclear option** without explicit user confirmation
5. **Report actual output** — don't guess or assume success

## Environment

- Workspace: `/home/node/.openclaw/workspace`
- Script: `scripts/self-update.sh`
- Logs: `/home/node/.openclaw/logs/self-update.log`
- Source repo: `https://github.com/dustin-olenslager/ironclaw-supreme`
