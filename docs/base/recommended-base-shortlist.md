# Recommended Base Shortlist - Phase 1-6

> 현재 문서는 Phase 1-6 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 ISO 제작, OS 빌드, Wine/Proton/Darling 설치, Wayland compositor 구현, static mock 수정을 수행하지 않습니다.

## 결정 수준

이 문서는 AstraOS Linux base의 최종 확정 문서가 아닙니다. Phase 1-6의 목적은 weighted selection matrix를 기반으로 Phase 1-7 검증 대상을 좁히는 것입니다.

따라서 현재 결정은 다음으로 제한합니다.

- 1차 shortlist 후보를 1~2개로 좁힙니다.
- 안정성 fallback 후보와 실험 후보를 보존합니다.
- 탈락 또는 보류 후보의 이유를 기록합니다.
- Phase 1-7 PoC 항목을 정의합니다.

## 1차 추천 Shortlist

| 순위 | 후보 | 권장 상태 | 이유 |
| ---: | --- | --- | --- |
| 1 | Fedora Atomic / Silverblue 계열 | Primary evaluation candidate | atomic desktop, rpm-ostree rollback, Flatpak 중심 앱 모델, Wayland/XDG desktop stack, Astra Shell 독립 계층과 균형이 좋음 |
| 2 | openSUSE Aeon / MicroOS 계열 | Co-primary evaluation candidate | transactional-update, immutable root, Btrfs snapshot rollback, recovery-first 구조가 AstraOS 목표와 잘 맞음 |

### Fedora Atomic / Silverblue 계열을 먼저 검증할 이유

- AstraOS가 목표로 하는 immutable/atomic desktop OS 방향과 직접 맞습니다.
- Flatpak 중심 앱 설치와 base image update 분리가 명확합니다.
- Windows compatibility runtime을 별도 sandbox/container/profile로 분리하기 좋습니다.
- Astra Shell을 GNOME/KDE 테마가 아니라 독립 Shell 계층으로 설계하는 데 유리합니다.

검증 리스크:

- Fedora release cadence를 AstraOS support window와 어떻게 맞출지 결정해야 합니다.
- NVIDIA proprietary driver, codec, third-party repository, Secure Boot signing을 실제 제품 정책으로 검증해야 합니다.
- rpm-ostree layering을 사용자 UX에서 어디까지 허용할지 정해야 합니다.

### openSUSE Aeon / MicroOS 계열을 함께 검증할 이유

- transactional-update와 snapshot rollback이 복구 중심 OS 방향에 강합니다.
- immutable root와 automatic update 운영 철학이 AstraOS와 맞습니다.
- 실패한 업데이트에서 이전 snapshot으로 돌아가는 UX를 Astra Recovery 방향과 연결하기 좋습니다.

검증 리스크:

- desktop app ecosystem과 사용자 자료가 Fedora Atomic보다 좁을 수 있습니다.
- transactional-update, Flatpak, distrobox, native package 예외 처리를 AstraOS UX로 재설계해야 합니다.
- gaming, compatibility runtime, proprietary driver, first boot UX는 별도 검증이 필요합니다.

## 유지할 보조 후보

| 후보 | 유지 상태 | 이유 |
| --- | --- | --- |
| Debian / Ubuntu LTS 계열 | Stability fallback | LTS support, vendor ecosystem, HWE kernel path, 사용자 친숙성이 강함. 다만 atomic rootfs/update chain은 별도 설계 필요 |
| NixOS 계열 | Experimental architecture track | declarative configuration, reproducibility, generation rollback이 강함. 다만 일반 사용자 제품화와 운영 난이도가 큼 |

## 보류 후보

| 후보 | 보류 이유 |
| --- | --- |
| Arch 계열 | 최신 kernel, graphics, Wine/Proton stack 추적에는 강하지만 초기 AstraOS MVP가 요구하는 안정적 immutable/atomic product baseline, signed update chain, rollback, support policy를 직접 구성해야 하는 부담이 큼 |

Arch 계열은 compatibility runtime과 최신 graphics stack 조사에는 참고할 수 있습니다. 그러나 Phase 1-6 기준 초기 MVP base shortlist에는 포함하지 않습니다.

## AstraOS 목표와의 적합성

### 최신 Linux LTS/stable 기반

Fedora Atomic과 openSUSE Aeon/MicroOS는 전통적인 LTS 배포판은 아니지만 modern desktop stack과 atomic update 구조가 강합니다. Debian/Ubuntu LTS는 안정성과 support window가 강하지만 immutable/atomic 구조는 AstraOS가 별도로 설계해야 합니다.

Phase 1-7에서는 "최신성"을 무조건 최신 kernel 직결로 정의하지 않습니다. 다음 조합으로 검증합니다.

- 안정적인 base channel
- hardware enablement 정책
- 빠른 보안 업데이트
- driver stack 검증
- rollback 가능한 update chain

### immutable/atomic update 구조

Fedora Atomic과 openSUSE Aeon/MicroOS가 가장 직접적으로 맞습니다.

- Fedora Atomic: rpm-ostree 기반 deployment, rollback, image-style OS update 방향
- openSUSE Aeon/MicroOS: transactional-update, Btrfs snapshot, rollback 중심 운영

Debian/Ubuntu LTS는 안정성 후보로 유지하되, immutable/atomic rootfs를 별도 설계해야 하므로 초기 구현 난이도가 올라갑니다.

### Wayland 기반 현대 데스크톱

Fedora Atomic과 openSUSE Aeon/MicroOS는 Wayland/XDG portal, Flatpak, modern Linux desktop 흐름과 잘 맞습니다. Astra Shell은 이 위에서 독립 Shell 계층으로 설계해야 하며, GNOME/KDE 테마 커스터마이징으로 축소하지 않습니다.

### Windows compatibility 준비

초기 목표는 실제 Wine/Proton/DXVK/VKD3D-Proton 설치가 아닙니다. Phase 1-6에서는 compatibility architecture를 문서화하고, Phase 1-7에서 다음을 검증합니다.

- runtime 제공 방식
- per-app prefix model
- sandboxed compatibility profile
- GPU/Vulkan/audio/input integration 요구사항
- launcher integration과 uninstall/repair/reset prefix UX

Fedora Atomic과 openSUSE Aeon/MicroOS는 base와 compatibility runtime을 분리하는 구조에 유리합니다. Debian/Ubuntu LTS는 생태계가 강하고, Arch는 최신성이 강하지만 product stability 부담이 큽니다.

### macOS compatibility experimental track

macOS compatibility는 실험 트랙입니다. GUI 앱 완전 호환을 초기 목표로 약속하지 않습니다.

Phase 1-7에서는 Darling, VM, remote, container, compatibility layer 중 어떤 방식이 현실적인지 별도 ADR로 분리합니다. 특히 `.app` bundle, plist, framework, dynamic library, filesystem layout, permissions, sandbox 차이를 조사합니다.

## 아직 미확정인 결정

- 최종 base OS
- 최종 kernel channel
- 장기 support window
- base image build system
- update signing key ownership
- Secure Boot 정책
- disk layout, encryption, recovery partition 정책
- default package source 정책
- Flatpak/AppImage/native package 우선순위
- compatibility runtime 제공 방식
- macOS compatibility experimental approach
- Astra Shell runtime과 compositor stack
- installer와 first boot onboarding 구현 기술

## Phase 1-7 PoC 제안

Phase 1-7은 여전히 실제 제품 구현 단계가 아닙니다. 각 PoC는 위험 작업 없이 문서, 제한된 로컬 실험 계획, 검증 체크리스트 중심으로 진행해야 합니다.

| PoC | 목적 | 금지 범위 |
| --- | --- | --- |
| Fedora Atomic base flow PoC | update/rollback, Flatpak, rpm-ostree layering 정책 조사 | 실제 AstraOS ISO 제작 금지 |
| openSUSE Aeon/MicroOS base flow PoC | transactional-update, snapshot rollback, app 설치 정책 조사 | 실제 배포 이미지 제작 금지 |
| GPU driver policy PoC | NVIDIA/AMD/Intel driver update와 Secure Boot 고려사항 정리 | 실제 driver 설치 자동화 금지 |
| Wayland/XDG portal PoC | Astra Shell이 필요한 portal, permission, accessibility 요구사항 정리 | compositor 구현 금지 |
| Compatibility runtime PoC | Wine/Proton/DXVK/VKD3D-Proton 제공 경로 비교 | Wine/Proton 설치 또는 실행 금지 |
| Per-app prefix model PoC | prefix manifest, repair, reset, sandbox profile UX 설계 | 실제 앱 실행 금지 |
| macOS experimental PoC | Darling/VM/container/remote 접근의 현실성 비교 | macOS 앱 호환 보장 표현 금지 |
| Secure update chain PoC | signing, rollback, recovery, audit log threat model 작성 | 실제 key 생성/배포 금지 |
| First boot UX PoC | installer 이후 onboarding, language, account, privacy, update 안내 설계 | 실제 계정 생성/권한 상승 구현 금지 |

## 종료 기준

Phase 1-6은 다음 조건을 만족하면 완료로 봅니다.

- weighted score table이 문서화되어 있습니다.
- Fedora Atomic / Silverblue 계열과 openSUSE Aeon / MicroOS 계열이 1차 shortlist로 정리되어 있습니다.
- Debian/Ubuntu LTS, NixOS, Arch의 유지 또는 보류 이유가 명확합니다.
- 최종 확정하지 말아야 할 결정이 분리되어 있습니다.
- Phase 1-7 PoC 목록이 문서화되어 있습니다.
