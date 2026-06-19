# Decision 0003: Linux Base Architecture

> 현재 문서는 Phase 1-5c 기준이며 실제 구현이 아니라 Linux base architecture 방향을 고정하는 설계/범위/거버넌스 문서입니다. 이 문서는 실제 OS 빌드, ISO 생성, 파티션 작업, 부팅로더 작업, 커널 제작, 드라이버 구현을 수행하지 않습니다.

## 결정

AstraOS는 Linux LTS 기반 immutable/atomic desktop OS를 목표로 합니다.

초기 구현 방향은 검증된 Linux LTS 또는 stable distribution base 위에 AstraOS 고유 Shell, 보안 구조, module runtime, recovery/update 정책을 설계하는 것입니다. 커널을 직접 새로 만들지 않습니다.

## 이유

Linux base를 사용하는 이유:

- 검증된 kernel과 driver ecosystem을 활용할 수 있습니다.
- hardware compatibility와 vendor support 가능성이 높습니다.
- LTS/stable security update channel을 활용할 수 있습니다.
- Wayland, XDG desktop entry, XDG portal, accessibility 같은 desktop 표준을 활용할 수 있습니다.
- immutable/atomic update, rollback, recovery-first 구조를 현실적으로 설계할 수 있습니다.
- from-scratch kernel보다 개발 현실성, 장기 유지보수, 보안 검증 가능성이 높습니다.

## 비결정

이번 ADR은 특정 distribution을 최종 고정하지 않습니다.

검토 후보:

| 후보 | 검토 방향 |
| --- | --- |
| Fedora Atomic/Silverblue 계열 | rpm-ostree, atomic update, rollback, Flatpak 중심 desktop 경험 |
| openSUSE Aeon/MicroOS 계열 | transactional update, immutable root, recovery 방향 |
| NixOS 계열 | declarative system config, generation rollback, reproducibility |
| Arch 계열 | 최신 kernel/Mesa/desktop stack, hardware freshness |
| Debian/Ubuntu LTS 계열 | 안정성, ecosystem, hardware/vendor support, LTS 운영 |

Phase 1-6에서 Linux base 후보 비교표를 작성한 뒤 별도 ADR로 최종 후보를 좁힙니다.

## 제외

다음 방향은 제외합니다.

- 커널 직접 제작
- Windows 기반 OS
- Windows 앱으로서의 AstraOS
- Web app OS
- 단순 Electron/WebView 앱
- Electron-only shell
- 검증 없는 mainline kernel 직접 추적
- 현재 단계의 ISO build, bootloader, partition 작업

## Kernel Policy

- 기본 정책은 Linux LTS 또는 distribution-supported LTS/HWE kernel stream 사용입니다.
- 최신성은 LTS stability, hardware enablement, security update, signed update, rollback으로 확보합니다.
- kernel patch, out-of-tree driver, kernel module 정책은 이후 Phase에서 threat model, signature policy, rollback plan이 있을 때만 검토합니다.

## Package and Update Policy

- OS base image와 user app/data를 분리합니다.
- system update는 signed, atomic, rollback 가능한 단위로 배포하는 방향을 목표로 합니다.
- package 후보는 distribution package, Flatpak, OCI image, module package를 포함해 Phase 1-6 이후 비교합니다.
- security update는 신뢰된 channel과 signature verification을 요구합니다.
- update 실패는 recovery-first flow로 복구 가능해야 합니다.

## Immutable/Atomic Filesystem Direction

장기 목표는 immutable 또는 mostly immutable root filesystem입니다.

검토 후보:

- OSTree/rpm-ostree
- A/B deployment
- transactional update
- read-only root + writable overlays
- signed system image

실제 filesystem layout, partition scheme, bootloader, ISO build는 현재 ADR 범위 밖입니다.

## Astra Shell 관계

Astra Shell은 Linux base 위에서 동작하는 독립 Shell 계층입니다.

- Wayland 기반 session/shell/compositor integration을 장기 검토합니다.
- XDG desktop entry와 XDG portal을 고려합니다.
- Linux native app compatibility를 유지합니다.
- 현재 static mock은 실제 OS가 아니라 Astra Shell UI prototype입니다.

## 다음 단계

Phase 1-6에서 수행할 작업:

- Linux base 후보 비교표 작성
- `docs/decisions/0007-linux-base-selection-criteria.md` 기준으로 평가
- package/update/rollback model 비교
- Wayland/XDG/accessibility 지원 수준 비교
- hardware enablement와 driver policy 비교
- compatibility layer readiness 비교
- 최종 base 후보를 좁히는 후속 ADR 작성
