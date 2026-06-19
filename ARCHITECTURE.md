# AstraOS Architecture

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## 아키텍처 목표

AstraOS는 Linux LTS 기반 immutable/atomic 데스크톱 OS로 설계합니다. 초기 단계에서는 커널을 직접 제작하지 않고, 검증된 Linux LTS 기반 위에서 업데이트 안정성, 복구 가능성, 모듈 격리, 사용자 데이터 보호를 우선합니다.

아키텍처의 핵심 개념은 Modular Evolution Architecture와 Balanced Premium Performance입니다.

## Phase 1-5c: Linux Base Architecture Lock

Phase 1-5c 기준으로 AstraOS의 실제 OS 구현 방향은 Linux LTS 기반 immutable/atomic desktop OS로 고정합니다.

AstraOS는 다음이 아닙니다.

- Windows 앱
- Web app
- 단순 Electron/WebView 앱
- Electron-only shell
- Windows 기반 OS
- 커널을 새로 만드는 from-scratch OS

현재 `prototypes/astra-shell/static-mock/`는 실제 OS가 아니라 Astra Shell UI prototype입니다. 이 prototype은 Shell의 화면 구성, 사용자 흐름, design token, mock data 구조를 검증하기 위한 정적 산출물이며 실제 Linux session, compositor, display manager, system settings, 보안 정책, 패키지 관리자, 부팅 체계와 연결하지 않습니다.

### Linux Base 후보

특정 배포판은 아직 최종 고정하지 않습니다. Phase 1-6에서 후보 비교표와 검증 기준을 통해 선택합니다.

| 후보 | 검토 이유 | 주의점 |
| --- | --- | --- |
| Fedora Atomic/Silverblue 계열 | rpm-ostree, atomic update, rollback, Flatpak 중심 desktop 경험 | 빠른 release cadence, LTS 성격 보완 필요 |
| openSUSE Aeon/MicroOS 계열 | transactional update, immutable root, rollback 방향 | tooling/ecosystem 적합성 검증 필요 |
| NixOS 계열 | declarative system config, generation rollback, reproducibility | 학습 곡선, user-facing package UX 설계 필요 |
| Arch 계열 | 최신 kernel/Mesa/desktop stack, hardware freshness | stable/LTS 운영 정책과 QA 부담 큼 |
| Debian/Ubuntu LTS 계열 | 안정성, 넓은 ecosystem, hardware/vendor support | immutable/atomic 구조 추가 설계 필요 |

### Linux Base 선택 기준

- LTS 또는 stable 기반 장기 유지보수 가능성
- hardware enablement와 GPU/노트북/입력장치 호환성
- 보안 업데이트 제공 속도와 신뢰 모델
- signed update, rollback, recovery-first 구조 적합성
- immutable/atomic root filesystem 구현 가능성
- Wayland, XDG portal, accessibility, input method, localization 지원
- 패키지 생태계와 개발자 tooling
- Astra Shell, Astra Shield, Vault, AI Studio 같은 모듈을 안전하게 격리할 수 있는지
- Windows/macOS compatibility layer readiness
- Balanced Premium Performance 목표를 달성할 수 있는지

### Kernel Policy

AstraOS는 초기 단계에서 커널을 직접 제작하지 않습니다. 기본 정책은 검증된 Linux LTS kernel 또는 해당 base distribution의 LTS/HWE kernel stream을 사용하는 것입니다.

최신성은 무조건 최신 mainline kernel을 직접 추적하는 방식이 아니라 다음 조합으로 확보합니다.

- LTS kernel stability
- hardware enablement kernel 또는 vendor-supported kernel stream
- 빠른 보안 업데이트
- signed kernel/package update
- rollback 가능한 deployment
- 드라이버 호환성 검증

커널 패치, out-of-tree driver, kernel module 정책은 이후 Phase에서 별도 위험 평가, 서명 정책, rollback 계획이 있을 때만 검토합니다.

### Package and Update Policy

AstraOS의 package/update 방향은 다음 원칙을 따릅니다.

- OS base image와 사용자 앱/데이터를 분리합니다.
- 시스템 업데이트는 signed, atomic, rollback 가능한 단위로 배포합니다.
- 사용자 앱은 sandbox와 permission broker를 거쳐 실행합니다.
- Flatpak, OCI image, distro package, module package 같은 후보는 Phase 1-6 이후 비교합니다.
- 업데이트 실패, 전원 중단, 손상된 module은 recovery flow로 복구 가능해야 합니다.
- 보안 업데이트는 신뢰된 채널과 signature verification을 요구합니다.

### Immutable/Atomic Filesystem Direction

장기 목표는 immutable 또는 mostly immutable root filesystem입니다. 시스템 root는 읽기 전용 또는 변경 통제 영역으로 유지하고, 사용자 데이터, 앱 데이터, system extension, module state는 분리합니다.

검토 후보:

- OSTree/rpm-ostree 계열
- A/B deployment
- transactional update
- read-only root + writable overlays
- signed system image

Phase 1-5c는 방향 고정 단계이므로 실제 파티션, filesystem layout, ISO build, bootloader configuration은 만들지 않습니다.

### Real Linux Base 문서화 대상

Phase 1-5e 기준으로 실제 구현 전 다음 항목을 문서화합니다.

| 영역 | 문서화할 내용 |
| --- | --- |
| rootfs | immutable root, writable state, user data 분리, recovery partition 후보 |
| bootloader | secure boot, rollback entry, recovery entry, kernel args 정책 후보 |
| package/update | signed update, atomic deployment, app/runtime update 분리 |
| rollback | OS deployment rollback, Shell rollback, compatibility runtime rollback |
| driver | kernel module, GPU, Wi-Fi, Bluetooth, input, laptop power policy |
| graphics stack | Mesa/NVIDIA, Vulkan, DXVK/VKD3D readiness, HiDPI, multi-monitor |
| Wayland | Wayland session, XWayland compatibility, compositor integration 후보 |
| XDG portal | file, clipboard, camera, microphone, screen capture permission broker 연결 |

## Modular Evolution Architecture

Modular Evolution Architecture는 AstraOS를 독립적으로 발전 가능한 모듈들의 집합으로 설계하는 원칙입니다. OS Core는 안정적인 기반을 제공하고, 기능 모듈은 명확한 계약을 통해 연결합니다.

모듈은 다음 기준을 가져야 합니다.

- 명확한 책임과 소유 범위
- 모듈 manifest
- 권한 프로필
- sandbox 정책
- 서명 및 무결성 검증
- 업데이트 채널
- health check
- rollback 정책
- 보안 점수 또는 위험 등급
- 복구 정책

모듈 실패는 OS Core 실패로 전파되지 않아야 합니다. 취약하거나 손상된 모듈은 격리, 비활성화, 롤백될 수 있어야 합니다.

## Balanced Premium Performance

Balanced Premium Performance는 무조건 초경량을 목표로 하지 않습니다. 보안, 복구, 모듈성, 프리미엄 UI, AI 도구 지원, 사용자 데이터 보호에 의미 있는 가치가 있다면 적절한 성능 비용을 허용합니다.

성능 비용은 다음 방법으로 제어합니다.

- lazy loading
- background task scheduling
- risk-based scanning
- module sleep
- GPU acceleration
- low resource mode
- battery mode
- gaming 또는 low latency mode
- per-module resource limit

## 시스템 계층

| 계층 | 역할 | Phase 0 산출물 |
| --- | --- | --- |
| Core OS | Linux LTS 기반 immutable/atomic 시스템, 업데이트, 롤백 | 구조와 경계 문서 |
| Linux Base | LTS/stable distribution base, kernel stream, hardware enablement, package/update foundation | Phase 1-5c lock과 Phase 1-6 후보 비교 |
| Astra Shell | Linux 위에서 동작하는 독립 Shell 계층, Wayland/XDG 통합 방향 | Phase 1 static mock과 Shell 설계 문서 |
| Permission Broker | 모듈 권한 중재, 파일/네트워크/클립보드 접근 통제 | 정책 모델 |
| Security Center | 보안 이벤트, 상태, 사용자 알림, 복구 진입점 | 방어 구조 |
| Module Runtime | 앱과 보안 모듈 실행 격리 | sandbox 정책 |
| Compatibility Layer | Windows app compatibility와 macOS experimental compatibility 관리 | 문서/ADR/위험 분류 |
| App Center | Linux native, Windows compatibility, macOS experimental 앱 source와 profile UX | 이후 Phase 설계 |
| Recovery | 업데이트 실패와 보안 손상 복구 | 복구 흐름 |
| AI Runtime Layer | AI Studio 및 AI 도구 격리 실행 | sandbox/localhost 정책 |

## Compatibility Layer 방향

AstraOS는 장기적으로 Linux native 앱만 실행하는 OS가 아니라 Windows 앱 호환성과 macOS 앱 호환성 실험 트랙을 준비합니다.

### Windows Compatibility

Windows compatibility는 장기 지원 목표입니다.

후보:

- Wine
- Proton
- DXVK
- VKD3D-Proton
- Winetricks/Bottles 유사 관리 구조
- per-app prefix
- sandboxed compatibility profile

구조 원칙:

- per-app prefix를 기본으로 합니다.
- prefix repair/reset/uninstall은 위험 작업으로 분류하고 preview, confirmation, rollback 또는 복구 고지를 요구합니다.
- GPU/Vulkan/audio/input integration은 Linux base 선택 이후 검증합니다.
- App Center와 Launcher에 compatibility status를 조용하게 표시합니다.
- anti-cheat bypass, DRM bypass, license bypass는 금지합니다.

### macOS Compatibility

macOS compatibility는 Experimental track입니다.

후보:

- Darling 기반 가능성 조사
- CLI/Unix 계열 macOS 도구 호환성 조사
- `.app` bundle, plist, framework, dynamic library, filesystem layout, permission 차이 조사
- VM/remote/container/compat layer 후보 비교

구조 원칙:

- macOS GUI 앱 완전 호환을 초기 목표로 약속하지 않습니다.
- App Center에는 Experimental로 표시합니다.
- Apple signing, DRM, license 우회는 금지합니다.
- Apple UI/brand asset을 복제하지 않습니다.

현재 단계에서는 Wine, Proton, DXVK, VKD3D-Proton, Darling, VM, container를 설치하거나 실행하지 않습니다.

## Immutable/Atomic 방향

AstraOS의 기본 시스템 이미지는 원자적으로 업데이트되고 실패 시 이전 상태로 되돌릴 수 있어야 합니다. Phase 0에서는 OSTree, rpm-ostree, A/B deployment 같은 구현 후보를 비교 대상으로 둘 수 있지만 특정 구현을 확정하거나 ISO 빌드를 만들지 않습니다.

업데이트 설계의 기준은 다음과 같습니다.

- 업데이트 전 상태 보존
- 서명된 업데이트만 허용
- 실패 시 이전 deployment로 rollback
- 보안 업데이트 우선순위 반영
- 사용자 데이터와 시스템 이미지 분리

## 주요 모듈 경계

### Secure Delete

Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능입니다. Phase 0에서는 정책, UX 고지, dry-run, preview, rollback 불가능성 경고, 저장장치별 한계만 설계합니다.

### Astra Shield

Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조입니다. Phase 0에서는 탐지, 격리, 복구, 로그, 사용자 알림, 업데이트 정책의 아키텍처만 정의합니다.

### Astra Shield Guardian

Astra Shield Guardian은 Astra Shield 자체 보호와 자동 복구 구조입니다. stealth persistence, 백신 우회, 공격 기능으로 설계하지 않습니다.

### AI Studio

AI Studio는 WebUI 외부 공개가 아니라 sandbox/localhost 기본값의 AI 작업 환경입니다. Phase 0에서는 AI 도구 격리, 파일 접근 제한, 네트워크 제한, API key 보호, 실행 승인 정책만 설계합니다.

## Phase 0 비구현 원칙

이 문서는 실제 커널, 드라이버, 백신 엔진, Secure Delete 기능, AI WebUI, ISO 빌드 파이프라인을 만들지 않습니다. 구현이 필요한 항목은 이후 Phase의 작업 지시서로만 남깁니다.

