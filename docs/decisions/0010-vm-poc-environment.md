# ADR 0010: VM PoC Environment

> 현재 문서는 Phase 1-8 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 실제 VM 생성, ISO 다운로드, OS 설치, 파티션 작업, 부트로더 작업, 드라이버 설치, Wine/Proton/Darling 설치, Wayland compositor 구현, 시스템 변경을 수행하지 않습니다.

## Title

VM PoC Environment for Linux Base Validation

## Status

Status: Proposed

## Context

Phase 1-7에서 Fedora Atomic / Silverblue 계열과 openSUSE Aeon / MicroOS 계열이 AstraOS Linux base PoC 후보로 정리되었습니다.

AstraOS의 장기 방향은 유지됩니다.

- 최신 Linux LTS/stable 기반 immutable/atomic desktop OS
- 커널 직접 제작 초기 제외
- Astra Shell은 Linux base와 분리된 독립 UI 계층
- UI/UX는 Astra Fusion Design Language 기준
- Windows compatibility는 Wine/Proton 계열 장기 목표
- macOS compatibility는 experimental/research track
- 보안 기능은 방어 목적만 허용

실제 base OS 검증은 update/rollback, filesystem, package policy, driver policy, Secure Boot/signing, Wayland/XDG, compatibility runtime state를 관찰해야 합니다. 이 검증을 bare metal에서 시작하면 host PC disk, partition, bootloader, credential, personal file risk가 커집니다.

## Decision

Fedora Atomic / Silverblue와 openSUSE Aeon / MicroOS 후보는 disposable VM 환경에서 먼저 검증합니다.

Phase 1-8은 VM PoC 환경 계획만 작성합니다. 실제 ISO 설치, rollback, update, driver, compatibility runtime, Wayland compositor 실험은 Phase 1-9에서 사용자 승인 후 진행합니다.

Phase 1-9 VM PoC는 다음 원칙을 따릅니다.

- snapshot-first
- host PC protection first
- NAT-first network
- shared folder and clipboard restricted by default
- no production account
- no personal file mount
- no credential, token, API key
- no bare metal change
- defensive-only security validation

## Consequences

긍정적 결과:

- bare metal 실험 전에 host risk를 낮춥니다.
- Fedora Atomic과 openSUSE Atomic 후보를 같은 조건에서 비교할 수 있습니다.
- update/rollback 실패를 snapshot으로 복구할 수 있습니다.
- AstraOS base selection이 Linux base와 Astra Shell UI 계층을 분리한 상태로 진행됩니다.
- Phase 1-9 승인 기준이 명확해집니다.

주의할 결과:

- VM 결과는 bare metal driver, GPU, Secure Boot, firmware behavior를 완전히 대표하지 않습니다.
- VM graphics stack은 실제 Astra Shell 성능을 보장하지 않습니다.
- compatibility runtime 결과는 host GPU/driver와 달라질 수 있습니다.
- VM PoC 이후에도 별도 disposable hardware 또는 controlled bare metal test가 필요할 수 있습니다.

## Accepted constraints

- Phase 1-8은 문서/계획 작업만 수행합니다.
- 실제 VM 생성, ISO 다운로드, OS 설치를 하지 않습니다.
- host disk, partition, bootloader, driver를 변경하지 않습니다.
- external download 실행은 금지합니다.
- Wine/Proton/DXVK/VKD3D-Proton/Darling 설치를 하지 않습니다.
- Wayland compositor 또는 Astra Shell runtime을 구현하지 않습니다.
- Apple/Samsung/Microsoft proprietary asset은 포함하지 않습니다.
- 보안 실험은 defensive validation으로만 제한합니다.

## Rejected options

- Bare metal에서 PoC를 먼저 시작하는 방식: host disk, partition, bootloader risk가 큽니다.
- Fedora 또는 openSUSE를 PoC 전 최종 확정하는 방식: weighted shortlist 이후 evidence가 부족합니다.
- VM snapshot 없이 update/rollback을 관찰하는 방식: 실패 반복성과 recovery evidence가 약합니다.
- bridge network를 기본값으로 사용하는 방식: host network 노출이 커집니다.
- production account와 personal file을 사용하는 방식: credential과 private data risk가 큽니다.
- compatibility runtime 설치를 base 검증과 함께 수행하는 방식: rollback conflict와 scope creep risk가 큽니다.

## 목적

Phase 1-9에서 안전하게 VM PoC를 시작할 수 있도록 환경, snapshot, safety boundary, 후보별 test plan을 고정합니다.

## 범위

- Fedora Atomic / Silverblue VM PoC 후보 유지
- openSUSE Aeon / MicroOS VM PoC 후보 유지
- Windows 11 host 보호 기준
- VM tool 선택 기준
- snapshot-first와 rollback-first 원칙
- NAT-first network 원칙
- Phase 1-9 승인 조건

## 비범위

- 최종 base OS 결정
- 실제 VM 생성
- 실제 ISO 다운로드 또는 설치
- actual update/rollback 실험
- driver, GPU passthrough, Secure Boot signing 실험
- Wine/Proton/Darling 설치
- Wayland compositor 구현
- Astra Shell runtime 구현

## 성공 기준

- Phase 1-9 VM PoC 후보가 Fedora Atomic / Silverblue와 openSUSE Aeon / MicroOS로 명확합니다.
- disposable VM, host protection, snapshot-first 원칙이 ADR로 고정됩니다.
- actual install/update/rollback 실험은 Phase 1-9 사용자 승인 뒤로 분리됩니다.
- security boundary가 Phase 1-8 문서 전체와 일관됩니다.

## 실패 기준

- Phase 1-8에서 실제 VM, ISO, OS install, driver, runtime 실험이 수행됩니다.
- host PC partition/bootloader 변경 가능성을 열어둡니다.
- VM 결과를 bare metal 최종 결정으로 과장합니다.
- compatibility runtime 또는 macOS compatibility를 초기 MVP 보장 기능처럼 표현합니다.

## 보안 경계

- 모든 실제 실험은 후속 승인된 disposable VM에서만 수행합니다.
- current host PC는 실험 대상이 아닙니다.
- production credential, API key, token, personal file은 VM에 입력하지 않습니다.
- security validation은 defensive-only입니다.
- Secure Delete, Astra Shield, Astra Shield Guardian, Vault, AI Studio 실제 기능은 구현하지 않습니다.
- remote content, external download execution, proprietary asset inclusion은 이번 단계에서 금지합니다.

## Next steps

1. [Phase 1-8 VM PoC Environment Plan](../base/phase-1-8-vm-poc-environment-plan.md)을 검토합니다.
2. [VM Host Requirements](../base/vm-host-requirements.md)을 기준으로 VM tool 후보를 좁힙니다.
3. [Fedora Atomic VM Test Plan](../base/fedora-atomic-vm-test-plan.md)과 [openSUSE Aeon VM Test Plan](../base/opensuse-aeon-vm-test-plan.md)을 승인 후보로 사용합니다.
4. [VM Snapshot and Rollback Policy](../base/vm-snapshot-and-rollback-policy.md)와 [VM Test Safety Boundaries](../base/vm-test-safety-boundaries.md)를 Phase 1-9 gate로 사용합니다.
5. 사용자 승인 후 Phase 1-9에서 disposable VM 기반 실제 PoC를 시작합니다.
