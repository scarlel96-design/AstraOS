# Compatibility Layer Architecture

> 현재 문서는 Phase 1-5e 기준이며 실제 구현이 아니라 AstraOS compatibility layer의 장기 아키텍처를 정의하는 설계/범위/거버넌스 문서입니다. 이 문서는 Wine, Proton, Darling, VM, container, compatibility runtime을 설치하거나 실행하지 않습니다.

## 목적

AstraOS는 Linux native 앱만 지원하는 OS가 아니라, 장기적으로 Windows 앱 호환성과 macOS 앱 호환성 실험 트랙을 준비하는 Linux 기반 immutable/atomic desktop OS를 목표로 합니다.

Compatibility Layer Architecture는 Linux base, Astra Shell, App Center, permission broker, sandbox, update/rollback, diagnostics를 연결하는 상위 구조입니다.

## 계층 구조

| 계층 | 책임 |
| --- | --- |
| Linux Base | kernel, driver, graphics stack, audio stack, Wayland, XDG portal |
| Compatibility Runtime Manager | Wine/Proton/Darling/VM/container 후보 runtime metadata 관리 |
| Compatibility Profile | app별 runtime, prefix/container, permissions, graphics/audio/input 설정 |
| Permission Broker | file, network, clipboard, camera, microphone, screen capture 권한 중재 |
| App Center | install/import, compatibility status, repair/reset/uninstall UX |
| Astra Shell | launcher entry, window grouping, notifications, user-facing status |
| Diagnostics | logs, crash reports, failed launch reason, safe repair hints |
| Recovery | profile rollback, prefix backup/reset, runtime version rollback 후보 |

## Real Linux Base Requirements

Compatibility layer는 실제 Linux base 위에서만 의미가 있습니다. 현재 static mock은 이 구조를 실행하지 않습니다.

base architecture 문서화 대상:

- rootfs layout
- bootloader strategy
- package/update model
- rollback model
- driver policy
- graphics stack
- Vulkan/Mesa/NVIDIA policy
- Wayland/XWayland policy
- XDG portal
- PipeWire/audio stack
- input method와 controller stack

## Windows Compatibility Track

Windows compatibility track은 다음 후보를 포함합니다.

- Wine
- Proton
- DXVK
- VKD3D-Proton
- Winetricks/Bottles 유사 management UX
- per-app prefix
- sandboxed compatibility profile

기본 정책:

- 앱별 prefix를 격리합니다.
- prefix reset/repair/uninstall은 위험 작업으로 처리합니다.
- anti-cheat bypass, DRM bypass, license bypass는 금지합니다.
- GPU/Vulkan/audio/input integration은 base 후보 선택 이후 검증합니다.

## macOS Compatibility Track

macOS compatibility track은 Experimental입니다.

후보:

- Darling 기반 가능성 조사
- CLI/Unix 계열 macOS 도구 호환 조사
- `.app` bundle metadata parsing
- plist/framework/dylib/filesystem/permission 차이 조사
- VM/remote/container/compatibility layer 후보 비교

기본 정책:

- macOS GUI 앱 완전 호환을 초기 목표로 약속하지 않습니다.
- Apple signing/DRM/license 우회는 금지합니다.
- Apple UI/brand asset을 복제하지 않습니다.
- App Center에는 Experimental로 표시합니다.

## App Center Integration

Compatibility layer는 사용자에게 App Center와 Launcher를 통해 노출됩니다.

App Center에서 제공할 후보 정보:

- app source: Linux native, Windows compatibility, macOS experimental
- runtime profile
- compatibility status
- permissions
- storage scope
- graphics/audio/input profile
- repair/reset/uninstall
- known limitation

## Security Model

Compatibility layer는 attack surface를 크게 늘릴 수 있으므로 기본적으로 제한적이어야 합니다.

보안 원칙:

- least privilege
- per-app isolation
- no host filesystem by default
- explicit user consent
- preview before destructive changes
- rollback or reset plan
- runtime signature/checksum verification 후보
- logs without sensitive content

금지:

- credential theft
- malware execution support
- exploit code
- anti-cheat bypass
- DRM/license bypass
- AV/security tool bypass
- hidden persistence
- undisclosed telemetry

## Update and Rollback

Compatibility runtime update는 OS base update와 분리해야 합니다.

후보 정책:

- runtime version pinning
- per-profile runtime channel
- rollback to previous runtime
- prefix migration preview
- failed migration recovery
- user data backup boundary

## 현재 단계 제외 범위

- runtime 설치
- app 실행
- prefix 생성
- VM/container 생성
- Wayland compositor 구현
- ISO build
- bootloader 작업
- driver 설치
- package manager 구현

## 다음 단계

- `docs/decisions/0006-compatibility-strategy.md` 기준 승인
- `docs/decisions/0007-linux-base-selection-criteria.md` 기준 base 후보 비교
- Windows compatibility UX spec 작성
- macOS experimental feasibility ADR 작성
- App Center compatibility source model 작성
