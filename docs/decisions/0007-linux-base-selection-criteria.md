# Decision 0007: Linux Base Selection Criteria

> 현재 문서는 Phase 1-5e 기준이며 실제 구현이 아니라 AstraOS Linux base 후보 선택 기준을 고정하는 설계/범위/거버넌스 문서입니다. 이 문서는 실제 OS 빌드, ISO 생성, rootfs 생성, bootloader 설정, 파티션 작업, driver 설치를 수행하지 않습니다.

## 결정

AstraOS는 최신 Linux LTS/stable 기반 immutable/atomic desktop OS를 목표로 하며, 실제 base OS 선택 전 후보 비교 문서를 먼저 작성합니다.

base 선택은 단순 선호가 아니라 rootfs, bootloader, package/update, rollback, driver, graphics stack, Wayland, XDG portal, compatibility layer 요구사항을 기준으로 평가합니다.

## 후보군

| 후보군 | 검토 이유 | 주요 리스크 |
| --- | --- | --- |
| Fedora Atomic/Silverblue 계열 | rpm-ostree, atomic update, rollback, Flatpak 중심 desktop 경험 | 빠른 release cadence, LTS 성격 보완 필요 |
| openSUSE Aeon/MicroOS 계열 | transactional update, immutable root, rollback 방향 | tooling/ecosystem 적합성 검증 필요 |
| NixOS 계열 | declarative system config, generation rollback, reproducibility | 학습 곡선, user-facing package UX 설계 필요 |
| Arch 계열 | 최신 kernel/Mesa/desktop stack, hardware freshness | stable/LTS 운영 정책과 QA 부담 큼 |
| Debian/Ubuntu LTS 계열 | 안정성, 넓은 ecosystem, hardware/vendor support | immutable/atomic 구조 추가 설계 필요 |

## 선택 기준

### Kernel and Hardware Enablement

- 최신 stable 또는 LTS kernel 계열 추적 가능성
- HWE 또는 vendor-supported kernel stream
- GPU, Wi-Fi, Bluetooth, input, laptop power management 지원
- out-of-tree driver 정책과 signing 정책
- secure boot와 kernel module 정책 후보

### Rootfs and Boot

- immutable 또는 mostly immutable rootfs 가능성
- A/B deployment 또는 generation rollback 가능성
- bootloader integration
- recovery entry 제공 가능성
- user data와 system image 분리
- failed update 복구 가능성

### Package and Update

- signed update
- atomic update
- rollback
- security update cadence
- package availability
- Flatpak/OCI/system extension/module package 적합성
- runtime pinning과 compatibility layer update 분리 가능성

### Graphics and Desktop Stack

- Wayland 기본 지원
- XWayland compatibility
- Mesa/NVIDIA/Vulkan stack
- PipeWire audio
- color management
- HiDPI/multi-monitor
- input method와 accessibility

### XDG and Shell Integration

- XDG desktop entry
- XDG portal
- app sandbox
- permission prompt
- file chooser integration
- desktop notifications
- settings schemas
- localization

### Compatibility Layer Readiness

- Wine/Proton/DXVK/VKD3D-Proton availability
- per-app prefix management 가능성
- Vulkan/audio/input integration
- sandboxed compatibility profile 가능성
- Darling 또는 macOS experimental track 조사 가능성
- App Center integration 난이도

### Governance and Maintenance

- 장기 유지보수 가능성
- release cadence
- upstream security response
- license/compliance 부담
- documentation quality
- community/ecosystem maturity
- AstraOS 팀 규모에 맞는 운영 복잡도

## 비결정

이번 ADR은 특정 base를 최종 선택하지 않습니다. Phase 1-6에서 후보별 비교표와 weighted scoring을 작성한 뒤 별도 결정합니다.

## 제외

현재 단계에서 제외합니다.

- ISO 제작
- bootloader 설정
- rootfs 생성
- partition layout 적용
- driver 설치
- Wine/Proton/Darling 설치
- Wayland compositor 구현

## 산출물 요구사항

Phase 1-6에서 작성할 후보 비교표는 다음 항목을 포함해야 합니다.

- base identity
- kernel policy
- rootfs/update/rollback model
- package/app distribution model
- graphics stack
- Wayland/XDG readiness
- security update model
- compatibility layer readiness
- operational risk
- recommendation

## 관련 문서

- `docs/decisions/0003-linux-base-architecture.md`
- `docs/decisions/0006-compatibility-strategy.md`
- `docs/compatibility/compatibility-layer-architecture.md`
