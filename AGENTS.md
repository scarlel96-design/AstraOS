# AGENTS.md - AstraOS Repository Instructions

## Project Identity

This repository is for AstraOS, a premium, modular, security-focused Linux LTS-based immutable/atomic desktop operating system project.

AstraOS is not a from-scratch kernel project in the initial stages. Do not attempt to build a new kernel in early phases. The initial direction is a Linux LTS-based immutable/atomic OS with modular architecture, strong security boundaries, defensive endpoint protection design, encrypted vault design, private workspace design, AI tooling support design, and premium core application planning.

## Mandatory Workflow

Always proceed phase-by-phase.

The current default phase is Phase 0 unless the user explicitly states otherwise.

Phase 0 scope is limited to:

- Architecture documents
- Threat model
- Security model
- Repository structure
- MVP scope
- Roadmap
- Risk register
- Secure development rules
- CI/CD skeleton
- Documentation scaffolding

Do not jump ahead to implementation-heavy phases without explicit user approval.

## Absolute Safety Boundaries

Do not implement, operationalize, or provide actionable instructions for:

- Offensive hacking tools
- Exploit code
- Malware
- Credential theft logic
- Stealth persistence
- Antivirus bypass
- Security tool evasion
- Anti-forensics
- Illegal evidence destruction
- Hidden backdoors
- Undisclosed telemetry
- Hardcoded secrets
- Unreviewed destructive file operations
- Automatic privileged system changes without user confirmation

These terms may appear in AstraOS documents only as prohibited categories, risk labels, or explicit non-goals.

All security features must be defensive, user-consented, auditable, and focused on protecting user-owned systems and user-owned data.

## AstraOS Technical Direction

Use the following architectural assumptions unless the user explicitly changes them:

- Base OS: Linux LTS
- System model: immutable/atomic desktop OS
- Update model: signed updates, rollback, recovery-first design
- Architecture: Modular Evolution Architecture
- Security model: defense-in-depth, least privilege, sandboxing, permission broker, rollback, auditability
- UI direction: premium, futuristic, polished, responsive
- Performance direction: Balanced Premium Performance, not ultra-light at the cost of security or capability
- Core language preference: Rust for security-critical userland components
- Low-level code: C/C++ only where justified
- UI candidates: Qt/QML, Slint, or other performant native UI stacks
- AI tools: sandboxed, local-first, localhost by default
- WebUI exposure: never externally exposed by default

## Modular Architecture Rules

AstraOS must be designed as a modular, replaceable, independently updateable system.

Separate the OS Core from feature modules.

Use stable APIs, IPC, event bus, and permission broker instead of direct internal coupling.

All modules should have:

- Module manifest
- Signature verification
- Permission profile
- Sandbox policy
- Dependency declaration
- Update channel
- Rollback policy
- Health check
- Security score
- Recovery policy

If a module fails, the OS Core must remain stable.

If a module is vulnerable, Astra Security Center must be able to quarantine, disable, or roll it back.

## Secure Delete Rules

Astra Secure Delete must be defined as user-owned data protection, not anti-forensics.

Never claim 100% physical unrecoverability.

Use honest language such as:

> Completed the strongest available secure deletion procedure for the current storage device, filesystem, and encryption state.

Prefer encryption-based deletion, key destruction, TRIM/discard, and storage-aware sanitization for SSD/NVMe only as later-phase design candidates.

Always require user confirmation before irreversible operations.

Provide dry-run or preview where possible.

Phase 0 must not implement actual deletion behavior.

## Astra Vault Rules

Astra Vault is an OS-integrated encrypted vault for user-owned sensitive files.

Phase 0 must define architecture and boundaries only. It must not implement a real vault encryption engine.

Never store the master password.

Use strong, documented cryptographic design in later phases.

Prefer Argon2id for KEK derivation, CSPRNG-generated data encryption keys, and authenticated encryption such as AES-256-GCM or XChaCha20-Poly1305 as design candidates.

Encrypt filenames, metadata, and folder structure where feasible in later phases.

Vault access must be mediated by permission broker.

Astra Shield must not upload Vault contents without explicit user consent.

## Astra Shield Rules

Astra Shield is a defensive OS-integrated antivirus, EDR, ransomware defense, quarantine, and recovery system.

It must not include offensive capabilities.

It must not implement antivirus bypass, evasion logic, malware logic, credential theft, or exploit code.

Phase 0 may describe later-phase defensive component candidates such as:

- Shield Core Service
- Real-Time Protection Engine
- Static Malware Engine
- Heuristic Engine
- Behavior Monitoring Engine
- Runtime Sensor design
- Ransomware Defense Engine
- Cloud Reputation Engine
- Local ML Engine
- Sandboxed File Analysis design
- Network Protection Engine
- Browser and Download Protection
- Quarantine and Remediation Engine
- Tamper Protection Engine
- Threat Intelligence and Rule Update System

These are architecture candidates only. Phase 0 must not implement real antivirus, EDR, driver, kernel hook, runtime sensor, sandbox analysis, or blocking behavior.

Use event-based and risk-based scanning rather than scanning everything repeatedly.

Prioritize privacy-preserving local analysis.

Do not upload full files without explicit user consent.

## Astra Shield Guardian Rules

Astra Shield Guardian protects and repairs Astra Shield.

It is a self-protection and self-healing layer, not stealth persistence.

Phase 0 may describe later-phase defensive component candidates such as:

- Guardian Core Service
- Health Monitor
- Tamper Protection Policy Engine
- Protected Security Store
- Signed Recovery Capsule
- Dual Engine Slot
- Offline Recovery Agent
- Emergency Lockdown Mode
- Security Attestation Reporter

If Astra Shield is damaged, Guardian may later attempt:

1. Soft Repair
2. Component Restore
3. Engine Rollback
4. Recovery Capsule Restore
5. Offline Deep Recovery through Astra Recovery

Emergency Lockdown must be defensive, temporary, visible to the user, and reversible after authenticated recovery.

Phase 0 must not implement Guardian services, privileged protection, drivers, or kernel-level controls.

## Astra Private Workspace Rules

Astra Private Workspace is for legitimate isolation of sensitive work and suspicious files.

It is not an anti-forensics feature.

Default behavior:

- No host folder access unless approved
- No clipboard sharing unless approved
- No network unless approved
- Disposable workspaces may destroy temporary workspace data after closing only with clear user-facing policy
- Minimal encrypted security events may be retained
- Document contents must not be logged

## Astra AI Studio Rules

Astra AI Studio integrates local AI tools and WebUI-style applications safely.

Supported direction as later-phase compatibility planning:

- text-generation-webui compatibility profile
- ComfyUI compatibility profile
- Stable Diffusion WebUI compatibility profile
- Ollama
- llama.cpp
- Transformers
- ExLlama
- vLLM
- ONNX Runtime
- Whisper
- TTS
- RAG workflows

Rules:

- Do not tightly couple AstraOS to one AI tool
- Use a modular AI Runtime Layer
- Local-first by default
- Clearly distinguish local AI from cloud API usage
- Bind WebUIs to localhost by default
- Never expose WebUI externally without explicit user confirmation
- Sandbox AI tools
- Restrict file, network, clipboard, and API key access by default
- Scan models, extensions, plugins, custom nodes, workflow files, and scripts with Astra Shield policy before use in later phases
- AI-generated commands or scripts must not auto-execute

Phase 0 must not implement or launch AI WebUI behavior.

## Astra Core Apps Rules

Astra Core Apps are high-performance default apps, not toy apps.

Required default app direction:

- Browser
- File Manager
- Image Viewer
- Video Player
- Music Player
- PDF and Document Viewer
- Text Editor
- Archive Manager
- Terminal
- Screenshot and Recorder
- System Monitor
- Settings

All core apps must be:

- Fast
- Sandboxed
- Replaceable
- Removable
- Independently updateable
- Integrated with Astra Shield policy
- Integrated with Astra Vault policy
- Able to open files in Astra Private Workspace
- Cleanly uninstallable
- Built with performance-conscious technologies

Avoid heavy frameworks for core apps unless justified.

Phase 0 must not implement real core apps.

## Performance Policy

AstraOS is not an ultra-light OS at all costs.

Target: Balanced Premium Performance.

Accept moderate overhead when it meaningfully improves:

- Security
- Recovery
- Modularity
- AI capability
- Antivirus protection
- Premium UI
- Advanced default apps
- User data protection

Offset overhead with:

- Lazy loading
- Module sleep
- Background task scheduling
- Risk-based antivirus scanning
- GPU acceleration
- Battery mode
- Low resource mode
- Gaming or low latency mode
- Per-module resource limits

## Required Before Implementation

Before writing implementation-heavy code, produce or update:

- ARCHITECTURE.md
- SECURITY_MODEL.md
- THREAT_MODEL.md
- MVP_SCOPE.md
- ROADMAP.md
- RISK_REGISTER.md
- CODING_STANDARDS.md

For risky modules, include:

- Purpose
- Scope
- Non-scope
- Threat model
- Abuse prevention
- Failure modes
- Recovery strategy
- Testing strategy

## Phase 0 Deliverables

For Phase 0, create or maintain:

- README.md
- ARCHITECTURE.md
- SECURITY_MODEL.md
- THREAT_MODEL.md
- ROADMAP.md
- MVP_SCOPE.md
- CODING_STANDARDS.md
- RISK_REGISTER.md
- LICENSES.md
- docs/README.md
- docs/decisions/0001-project-scope.md
- docs/security/secure-development.md
- docs/shield/overview.md
- docs/shield-guardian/overview.md
- docs/vault/overview.md
- docs/secure-delete/overview.md
- docs/private-workspace/overview.md
- docs/ai-studio/overview.md
- docs/core-apps/overview.md
- docs/module-framework/overview.md
- .github/workflows/security-checks.yml

## Reporting Format

After each task, report:

1. What changed
2. Files created or modified
3. Security-sensitive decisions
4. What was intentionally not implemented
5. Tests or validation performed
6. Remaining risks
7. Recommended next step

## Done Definition

A task is not complete unless:

- Scope was respected
- Safety boundaries were respected
- Risky behavior was avoided or explicitly guarded
- Files are documented
- Validation or testing method is described
- Follow-up work is clearly listed
