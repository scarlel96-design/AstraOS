# AstraOS

> 현재 문서는 Phase 1-5c/1-5e 기준이며 실제 OS 구현이 아니라 Linux base architecture와 compatibility strategy를 고정하는 설계/범위/거버넌스 문서입니다. 이 문서는 ISO 빌드, 파티션 작업, 부팅로더 작업, Wayland compositor 구현, 드라이버 구현, 실제 보안 엔진 구현을 수행하지 않습니다.

## Project Identity

AstraOS는 Windows 앱, Web app, 단순 Electron/WebView 앱이 아니라 Linux LTS 기반 immutable/atomic desktop OS를 목표로 하는 실제 운영체제 프로젝트입니다.

현재 `prototypes/astra-shell/static-mock/`는 실제 OS가 아니라 Astra Shell UI/UX를 검증하기 위한 static Shell prototype입니다. 이 prototype은 실제 로그인, 권한 상승, OS command API, native bridge, 실제 시스템 상태 읽기, 실제 보안 상태 검사를 수행하지 않습니다.

## Linux Base Architecture Lock

Phase 1-5c 기준 AstraOS의 실제 구현 방향은 다음과 같이 고정합니다.

- 실제 OS 베이스는 Linux입니다.
- 커널을 직접 새로 만들지 않습니다.
- Linux LTS 기반 배포판 또는 베이스를 사용합니다.
- 최신성은 무조건 최신 커널 직결이 아니라 안정적인 LTS 기반, hardware enablement, 보안 업데이트, signed update, rollback 구조로 확보합니다.
- 장기적으로 immutable/atomic root filesystem을 목표로 합니다.
- Astra Shell은 Linux 위에서 동작하는 독립 Shell 계층으로 설계합니다.
- Astra Shell은 Wayland 기반 shell/compositor 통합 방향을 검토하되, 현재 단계에서는 구현하지 않습니다.

초기 검토 후보는 Ubuntu 26.04 LTS 기반, Fedora Atomic/Silverblue 계열 구조 참고, Debian stable 기반, openSUSE Aeon/MicroOS 계열 구조 참고입니다. 특정 배포판은 아직 최종 고정하지 않고 Phase 1-6에서 비교표와 선택 기준을 통해 결정합니다.

Phase 1-5e 기준 후보군을 Fedora Atomic/Silverblue 계열, openSUSE Aeon/MicroOS 계열, NixOS 계열, Arch 계열, Debian/Ubuntu LTS 계열로 확장합니다. 선택 전에는 rootfs, bootloader, package/update, rollback, driver, graphics stack, Wayland, XDG portal, compatibility layer 요구사항을 문서로 비교합니다.

## Compatibility Strategy Lock

AstraOS는 장기적으로 Linux native 앱만 실행하는 OS가 아니라 Windows 앱 호환성과 macOS 앱 호환성 실험 트랙을 준비하는 Linux 기반 OS를 목표로 합니다.

Windows compatibility는 장기 지원 목표로 관리합니다.

- Wine
- Proton
- DXVK
- VKD3D-Proton
- Winetricks/Bottles 유사 관리 구조
- per-app prefix
- sandboxed compatibility profile
- GPU/Vulkan/audio/input integration
- app launcher/App Center integration
- uninstall/repair/reset prefix UX

macOS compatibility는 Experimental track입니다.

- Darling 기반 가능성 검토
- CLI/Unix 계열 macOS 도구 호환부터 검토
- `.app` bundle, plist, framework, dynamic library, filesystem layout, permissions, sandbox 차이 조사
- GUI 앱 완전 호환을 초반 목표로 약속하지 않음
- VM/remote/container/compat layer 중 현실적인 방식은 후속 ADR로 분리

현재 단계에서는 Wine, Proton, DXVK, VKD3D-Proton, Darling을 설치하거나 실행하지 않습니다.

## Current Scope

현재 작업 범위는 문서와 prototype 방향 고정입니다.

- 허용: Linux base architecture 문서화, Shell/UI 계층 분리, compatibility strategy 문서화, ADR 추가, roadmap/MVP/security model 갱신
- 금지: 실제 OS 빌드, ISO 생성, 파티션 작업, 부팅로더 작업, Wayland compositor 구현, Wine/Proton/Darling 설치, 실제 보안 엔진 구현, commit/push 자동 수행

## Key Documents

- `ARCHITECTURE.md`: Linux base, immutable/atomic 방향, Astra Shell 계층
- `SECURITY_MODEL.md`: 권한 모델, sandbox, update trust, 위험 작업 경계
- `MVP_SCOPE.md`: MVP 포함/제외 범위
- `ROADMAP.md`: Phase 1-5c/1-5e 이후 전환 로드맵
- `docs/shell/`: Astra Shell prototype과 향후 Linux shell 전환 방향
- `docs/compatibility/compatibility-layer-architecture.md`: compatibility layer 상위 구조
- `docs/compatibility/windows-app-compatibility.md`: Windows 앱 호환성 준비 트랙
- `docs/compatibility/macos-app-compatibility.md`: macOS 앱 호환성 Experimental 트랙
- `docs/decisions/0003-linux-base-architecture.md`: Linux base architecture ADR
- `docs/decisions/0006-compatibility-strategy.md`: Windows/macOS compatibility 전략 ADR
- `docs/decisions/0007-linux-base-selection-criteria.md`: Linux base 선택 기준 ADR
