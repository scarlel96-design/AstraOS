# ADR 0009: Linux Base PoC Plan

> 현재 문서는 Phase 1-7 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 실제 OS 빌드, ISO 제작, 파티션 작업, 부트로더 작업, Wine/Proton/Darling 설치, Wayland compositor 구현, driver 설치, 시스템 변경을 수행하지 않습니다.

## 상태

Accepted as Phase 1-7 PoC planning direction. Final base OS is not decided.

## 맥락

ADR 0008에서 AstraOS Linux base 1차 shortlist는 다음 두 계열로 정리되었습니다.

1. Fedora Atomic / Silverblue 계열
2. openSUSE Aeon / MicroOS 계열

AstraOS의 방향은 유지됩니다.

- Linux 기반 OS
- 커널 직접 제작 초기 제외
- immutable/atomic update와 rollback 우선
- Astra Shell은 Linux base와 분리된 독립 UI 계층
- UI/UX는 Astra Fusion Design Language 기준
- Windows compatibility는 Wine/Proton 계열 장기 목표
- macOS compatibility는 experimental/research track

## 결정

Phase 1-7은 실제 구현이 아니라 PoC 계획 단계로 진행합니다.

생성된 문서:

- `docs/base/phase-1-7-poc-plan.md`
- `docs/base/fedora-atomic-poc-checklist.md`
- `docs/base/opensuse-atomic-poc-checklist.md`
- `docs/base/poc-test-matrix.md`
- `docs/compatibility/windows-runtime-poc-plan.md`
- `docs/compatibility/macos-runtime-research-plan.md`

이 ADR은 위 문서를 기준으로 Fedora Atomic / Silverblue 계열과 openSUSE Aeon / MicroOS 계열을 같은 기준으로 검증하도록 고정합니다.

## 이유

### Fedora Atomic / Silverblue

Fedora Atomic 계열은 ostree/rpm-ostree 기반 atomic desktop, rollback, Flatpak 중심 앱 모델, modern Wayland/XDG stack, Astra Shell 독립 계층 통합 가능성을 검증하기 좋습니다.

주요 리스크는 release cadence, NVIDIA proprietary driver, Secure Boot/signing, third-party package layering 정책입니다.

### openSUSE Aeon / MicroOS

openSUSE Aeon / MicroOS 계열은 transactional-update, Btrfs snapshot rollback, immutable root, recovery-first 구조 검증에 적합합니다.

주요 리스크는 desktop ecosystem, transactional package exception UX, driver policy, compatibility runtime과 snapshot rollback 충돌입니다.

## 결과

긍정적 결과:

- 최종 base OS 확정 전에 동일한 PoC 기준을 확보합니다.
- update/rollback, rootfs, app delivery, driver, Secure Boot, Astra Shell integration, compatibility runtime을 한 matrix에서 비교할 수 있습니다.
- Windows compatibility와 macOS experimental track을 base OS 선택과 분리하면서도 연결합니다.
- 모든 실제 실험을 VM/disposable test machine으로 제한합니다.

주의할 결과:

- 이번 ADR은 Fedora 또는 openSUSE를 최종 base로 확정하지 않습니다.
- PoC 문서가 있어도 실제 설치, 빌드, driver, runtime 실행은 아직 승인되지 않았습니다.
- compatibility runtime은 초기 MVP 보장 기능이 아닙니다.
- macOS compatibility는 research track이며 GUI app 완전 호환을 약속하지 않습니다.

## 비결정

이번 ADR은 다음을 결정하지 않습니다.

- 최종 base distribution
- final kernel channel
- update signing key ownership
- disk layout, encryption, recovery partition
- bootloader
- actual installer
- final Astra Shell runtime/compositor
- driver packaging
- Wine/Proton/DXVK/VKD3D-Proton 제공 방식
- Darling, VM, remote, container 중 macOS compatibility 접근 방식
- Secure Boot signing pipeline

## 제외

다음을 명시적으로 제외합니다.

- 커널 직접 제작
- 실제 OS 빌드
- 실제 ISO 제작
- 파티션 작업
- 부트로더 작업
- driver 설치
- Wine/Proton/DXVK/VKD3D-Proton 설치
- Darling 설치
- macOS framework 또는 proprietary asset 포함
- Wayland compositor 구현
- external download 실행
- destructive command
- 현재 개발 머신 시스템 변경

## 보안 경계

- 모든 실험은 후속 승인된 VM 또는 disposable test machine에서만 수행합니다.
- 현재 repository 작업은 문서/계획 변경으로만 제한합니다.
- Secure Delete, Astra Shield, Astra Shield Guardian, AI Studio, Vault 실제 기능은 구현하지 않습니다.
- compatibility research는 bypass, evasion, exploit, credential theft, malware, anti-forensics로 확장하지 않습니다.
- Apple/Samsung/Microsoft proprietary asset은 포함하지 않습니다.

## 다음 단계

1. Phase 1-7 문서를 검토합니다.
2. 후보별 PoC evidence checklist에 owner/status를 추가합니다.
3. VM/disposable machine 기반 dry-run 계획을 별도 승인받습니다.
4. PoC 결과를 바탕으로 Linux base selection ADR을 갱신합니다.

## 관련 문서

- [ADR 0008: Linux Base Shortlist](0008-linux-base-shortlist.md)
- [Phase 1-7 PoC Plan](../base/phase-1-7-poc-plan.md)
- [Fedora Atomic PoC Checklist](../base/fedora-atomic-poc-checklist.md)
- [openSUSE Atomic PoC Checklist](../base/opensuse-atomic-poc-checklist.md)
- [Linux Base PoC Test Matrix](../base/poc-test-matrix.md)
- [Windows Runtime PoC Plan](../compatibility/windows-runtime-poc-plan.md)
- [macOS Runtime Research Plan](../compatibility/macos-runtime-research-plan.md)
