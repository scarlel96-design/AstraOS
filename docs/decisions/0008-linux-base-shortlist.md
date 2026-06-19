# ADR 0008: Linux Base Shortlist

> 현재 문서는 Phase 1-6 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 ISO 제작, OS 빌드, Wine/Proton/Darling 설치, Wayland compositor 구현, static mock 수정을 수행하지 않습니다.

## 상태

Accepted as Phase 1-6 shortlist. Final base OS is not decided.

## 맥락

AstraOS의 장기 목표는 실제 부팅 가능한 최신 Linux 기반 immutable/atomic desktop OS입니다. AstraOS는 Windows 앱, Web app, 단순 Electron/WebView 앱, GNOME/KDE 테마가 아닙니다.

현재 static mock은 Astra Shell UI prototype이며 실제 OS가 아닙니다. 실제 OS 방향은 Linux base 위에 Astra Shell을 얹는 구조입니다.

Phase 1-6에서는 다음 후보를 비교했습니다.

- Fedora Atomic / Silverblue 계열
- openSUSE Aeon / MicroOS 계열
- NixOS 계열
- Arch 계열
- Debian / Ubuntu LTS 계열

비교 기준은 기본 desktop UI가 아니라 immutable/atomic update, rollback, driver stack, Wayland/XDG, compatibility runtime, 장기 유지보수성, Astra Shell 독립성 중심입니다.

## 결정

Phase 1-6의 1차 shortlist는 다음 두 계열로 둡니다.

1. Fedora Atomic / Silverblue 계열
2. openSUSE Aeon / MicroOS 계열

보조 후보는 다음과 같이 유지합니다.

- Debian / Ubuntu LTS 계열: 안정성 fallback 후보
- NixOS 계열: experimental architecture 후보
- Arch 계열: 최신성 참고 후보이나 초기 MVP base에서는 보류

이 결정은 최종 base OS 확정이 아닙니다. Phase 1-7에서 PoC와 운영 리스크 검증을 수행한 뒤 후속 ADR로 갱신합니다.

## 이유

### Fedora Atomic / Silverblue 계열

Fedora Atomic / Silverblue 계열은 atomic desktop, rollback, Flatpak 중심 앱 모델, modern Linux desktop stack, Wayland/XDG portal 흐름과 잘 맞습니다. Astra Shell을 독립 UI 계층으로 얹고, base OS update와 user app runtime을 분리하는 구조에도 적합합니다.

주요 리스크는 전통적인 LTS 배포판이 아니라는 점입니다. AstraOS가 support window, QA cadence, NVIDIA proprietary driver, codec, third-party repository, Secure Boot signing 정책을 별도로 검증해야 합니다.

### openSUSE Aeon / MicroOS 계열

openSUSE Aeon / MicroOS 계열은 transactional-update, immutable root, Btrfs snapshot rollback 중심의 recovery-first 구조가 강합니다. AstraOS의 atomic update, rollback, recovery 방향과 잘 맞습니다.

주요 리스크는 desktop ecosystem, 자료, gaming/compatibility runtime, first boot UX 검증 범위가 Fedora Atomic보다 더 좁거나 별도 설계가 필요할 수 있다는 점입니다.

### Debian / Ubuntu LTS 계열

Debian / Ubuntu LTS 계열은 LTS/stable 운영, vendor ecosystem, hardware enablement, 사용자 친숙성이 강합니다. 그러나 AstraOS가 목표로 하는 immutable/atomic rootfs와 signed update/rollback chain은 별도 설계가 필요합니다.

따라서 안정성 fallback으로 유지하되, Phase 1-6의 1차 shortlist에는 포함하지 않습니다.

### NixOS 계열

NixOS 계열은 declarative configuration, generation rollback, reproducibility가 강합니다. 다만 일반 사용자용 premium desktop OS로 포장하기 위한 installer, app UX, support, compatibility runtime, learning curve 리스크가 큽니다.

따라서 experimental architecture track으로 유지합니다.

### Arch 계열

Arch 계열은 최신 kernel, graphics, Wine/Proton/DXVK/VKD3D-Proton stack 추적에 강합니다. 그러나 초기 AstraOS가 요구하는 stable product baseline, immutable/atomic update, rollback, signing, support policy를 직접 구성해야 합니다.

따라서 최신성 참고 후보로 유지하되 초기 MVP base shortlist에서는 보류합니다.

## 결과

긍정적 결과:

- Phase 1-7 검증 대상을 Fedora Atomic과 openSUSE Aeon/MicroOS로 좁힙니다.
- AstraOS가 GNOME/KDE 테마가 아니라 Linux base 위의 독립 Astra Shell이라는 방향을 유지합니다.
- Windows compatibility와 macOS compatibility experimental track을 base 선택 기준에 포함합니다.
- Debian/Ubuntu LTS와 NixOS를 완전히 폐기하지 않고 각각 fallback/experimental track으로 보존합니다.

주의할 결과:

- 최종 base OS가 아직 확정되지 않았으므로 ISO, installer, bootloader, partition, driver, secure boot 구현을 시작하지 않습니다.
- 특정 배포판의 기본 desktop UX를 AstraOS UX로 간주하지 않습니다.
- compatibility runtime은 실제 설치하거나 실행하지 않습니다.

## 비결정

이번 ADR은 다음을 결정하지 않습니다.

- 최종 base distribution
- 최종 kernel channel
- final update mechanism
- disk layout
- bootloader
- Secure Boot key ownership
- signing pipeline
- NVIDIA driver packaging
- Wine/Proton/DXVK/VKD3D-Proton 제공 방식
- Darling 또는 macOS compatibility 구현 방식
- Astra Shell compositor/runtime
- installer와 first boot onboarding 구현 기술

## 제외

이번 ADR은 다음을 명시적으로 제외합니다.

- 커널 직접 제작
- Windows 기반 OS
- 단순 WebView/Electron-only OS
- GNOME/KDE 테마 커스터마이징으로 AstraOS를 대체하는 접근
- 실제 ISO 제작
- 실제 OS 빌드
- Wine/Proton/Darling 설치
- Wayland compositor 구현
- static mock UI 수정
- 실제 보안 상태 검사 또는 시스템 제어 구현

## Phase 1-7 후속 작업

Phase 1-7에서는 다음을 검증합니다.

- Fedora Atomic update/rollback 흐름 조사
- openSUSE Aeon/MicroOS transactional update/rollback 흐름 조사
- GPU driver policy matrix
- Wayland/XDG portal 요구사항
- Flatpak/AppImage/native package 정책
- Windows compatibility runtime 제공 방식
- per-app compatibility prefix manifest model
- macOS compatibility experimental feasibility
- secure boot/signing/update chain threat model
- installer/first boot/onboarding 요구사항

## 관련 문서

- [Linux Base Comparison](../base/linux-base-comparison.md)
- [Recommended Base Shortlist](../base/recommended-base-shortlist.md)
- [ADR 0007: Linux Base Selection Criteria](0007-linux-base-selection-criteria.md)
- [Compatibility Layer Architecture](../compatibility/compatibility-layer-architecture.md)
