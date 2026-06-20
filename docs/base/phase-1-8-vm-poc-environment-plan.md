# Phase 1-8 VM PoC Environment Plan

> 현재 문서는 Phase 1-8 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 실제 VM 생성, ISO 다운로드, OS 설치, 파티션 작업, 부트로더 작업, 드라이버 설치, Wine/Proton/Darling 설치, Wayland compositor 구현, 시스템 변경을 수행하지 않습니다.

## 목적

AstraOS가 실제 부팅 가능한 최신 Linux 기반 immutable/atomic desktop OS로 발전하기 전에, Fedora Atomic / Silverblue 계열과 openSUSE Aeon / MicroOS 계열을 안전한 VM 전용 환경에서 검증하기 위한 PoC 환경 계획을 정의합니다.

Phase 1-8은 Phase 1-9에서 수행할 VM PoC의 준비 단계입니다. 이번 단계는 실제 실험을 실행하지 않고, host PC 보호, snapshot-first 원칙, 후보별 검증 순서, 결과 기록 기준을 문서화합니다.

## 범위

- VM을 bare metal보다 먼저 사용하는 이유 정의
- Windows 11 host 기준의 VM PoC 환경 요구사항 연결
- Fedora Atomic / Silverblue와 openSUSE Aeon / MicroOS의 검증 순서 정의
- snapshot-first 실험 절차와 rollback 기준 연결
- host PC disk, partition, bootloader, credential, personal file 보호 원칙 정의
- PoC 결과 기록 방식 정의
- Phase 1-9 진입 조건 정의

## 비범위

- 실제 VM 생성
- 실제 ISO 다운로드 또는 실행
- 실제 OS 설치
- host disk, partition, bootloader 변경
- GPU passthrough 구성
- 드라이버 설치
- Wine, Proton, DXVK, VKD3D-Proton, Darling 설치
- Wayland compositor 또는 Astra Shell runtime 구현
- Fedora/openSUSE 후보의 최종 base 확정
- production account 로그인 또는 개인 파일 mount

## VM 선행 이유

VM PoC는 bare metal 실험 전에 다음 위험을 낮춥니다.

- host PC partition, bootloader, firmware 설정 변경을 피합니다.
- atomic update와 rollback 실패를 snapshot으로 되돌릴 수 있습니다.
- Fedora Atomic 계열과 openSUSE Atomic 계열을 같은 host 조건에서 비교할 수 있습니다.
- GPU, Secure Boot, compatibility runtime 같은 고위험 항목을 관찰 대상으로 분리할 수 있습니다.
- AstraOS가 Linux base와 Astra Shell을 분리하는 구조인지 검증하기 전까지 실제 장비를 변경하지 않습니다.

## 후보 검증 순서

1. Fedora Atomic / Silverblue 계열 VM PoC 계획을 검토합니다.
2. openSUSE Aeon / MicroOS 계열 VM PoC 계획을 같은 기준으로 검토합니다.
3. snapshot/rollback 정책이 두 후보에 동일하게 적용되는지 확인합니다.
4. compatibility runtime, GPU, Secure Boot, Astra Recovery 연계 항목은 관찰 계획까지만 정리합니다.
5. Phase 1-9에서 사용자 승인 후 disposable VM에서만 실제 검증을 수행합니다.

## 결과 기록

Phase 1-9에서 실제 VM PoC가 승인되면 각 후보별로 다음 evidence를 기록합니다.

- VM profile name과 snapshot name
- base candidate와 build/channel 정보
- update/rollback 관찰 결과
- immutable root filesystem 관찰 결과
- Flatpak, AppImage, native package 예외 정책 관찰 결과
- Wayland/XDG portal compatibility 관찰 결과
- GPU policy와 Secure Boot/signing risk note
- compatibility runtime과 rollback 충돌 가능성 note
- 실패 시 rollback 전후 상태 요약

## 성공 기준

- VM이 bare metal보다 먼저 필요한 이유가 문서화됩니다.
- Fedora Atomic / Silverblue와 openSUSE Aeon / MicroOS의 Phase 1-9 VM PoC 순서가 정의됩니다.
- snapshot-first, rollback-first, host protection 원칙이 모든 Phase 1-8 문서에 연결됩니다.
- 실제 다운로드, 설치, VM 생성, system modification 없이 문서만 생성됩니다.
- Phase 1-9 진입 조건과 중단 조건이 명확합니다.

## 실패 기준

- 실제 VM 생성 또는 ISO 실행으로 범위가 확장됩니다.
- host PC disk, partition, bootloader, driver, credential, personal file 보호 원칙이 빠집니다.
- Fedora/openSUSE 후보를 VM PoC 전에 최종 확정합니다.
- GPU passthrough 또는 bridge network를 기본값처럼 취급합니다.
- Wine/Proton/Darling 또는 Wayland compositor 구현을 이번 단계에 포함합니다.

## 보안 경계

- 이번 단계는 문서/계획 작업만 수행합니다.
- 실제 시스템 변경, ISO 다운로드, VM 생성, OS 설치, driver 설치는 금지합니다.
- 모든 실험은 후속 Phase 1-9에서 사용자 승인 후 disposable VM에서만 수행합니다.
- host shared folder, clipboard, credential, personal file mount는 기본 금지로 둡니다.
- network는 NAT 우선이며 bridge network는 별도 승인 전 기본 금지입니다.
- security experiment는 defensive validation으로만 제한합니다.

## Phase 1-9 진입 조건

- VM tool 선택 기준이 확정됩니다.
- host 요구사항과 storage budget이 확인됩니다.
- 후보별 VM test plan이 승인됩니다.
- snapshot naming과 rollback policy가 승인됩니다.
- network isolation policy가 승인됩니다.
- ISO source, checksum verification, account policy는 별도 승인 문서로 분리됩니다.

## 다음 단계

1. [VM Host Requirements](vm-host-requirements.md)를 검토합니다.
2. [Fedora Atomic VM Test Plan](fedora-atomic-vm-test-plan.md)을 검토합니다.
3. [openSUSE Aeon VM Test Plan](opensuse-aeon-vm-test-plan.md)을 검토합니다.
4. [VM Snapshot and Rollback Policy](vm-snapshot-and-rollback-policy.md)를 기준 정책으로 사용합니다.
5. [VM Test Safety Boundaries](vm-test-safety-boundaries.md)를 Phase 1-9 승인 조건으로 사용합니다.
6. [ADR 0010](../decisions/0010-vm-poc-environment.md)을 기준으로 Phase 1-9 VM PoC 승인 여부를 결정합니다.
