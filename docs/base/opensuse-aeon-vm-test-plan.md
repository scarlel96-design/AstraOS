# openSUSE Aeon VM Test Plan

> 현재 문서는 Phase 1-8 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 openSUSE Aeon 또는 MicroOS 설치, ISO 다운로드, transactional-update 실행, Btrfs snapshot 조작, driver 설치, OS 빌드, 시스템 변경을 수행하지 않습니다.

## 목적

openSUSE Aeon / MicroOS 계열을 Phase 1-9 disposable VM에서 검증하기 위한 테스트 계획을 정의합니다.

이번 문서는 실제 openSUSE VM을 만들지 않습니다. transactional update, Btrfs snapshot, rollback, immutable root 구조를 Fedora Atomic 계열과 같은 기준으로 비교하기 위한 관찰 계획만 작성합니다.

## 범위

- openSUSE Aeon / MicroOS VM PoC 목적 정의
- transactional-update 구조 관찰 계획
- Btrfs snapshot 기반 rollback 관찰 계획
- immutable root filesystem과 writable state 분리 관찰 계획
- update flow와 reboot activation 관찰 기준
- Flatpak, AppImage, native package 예외 정책 관찰 계획
- Fedora Atomic 계열과의 비교 기준 정의
- 기록할 logs/screenshots/evidence 항목 정의

## 비범위

- openSUSE ISO 다운로드
- openSUSE VM 생성 또는 설치
- transactional-update 실행
- Btrfs snapshot 조작
- driver 설치
- Secure Boot key 생성 또는 signing 실험
- Wine/Proton/DXVK/VKD3D-Proton 설치
- Darling 설치
- Astra Shell 또는 Wayland compositor 구현
- production account 로그인
- host personal file mount

## 검증 항목

| 영역 | Phase 1-9 관찰 질문 | 기록할 evidence |
| --- | --- | --- |
| Transactional update | update가 새 snapshot 또는 transactional state로 설명 가능한가 | update state note |
| Btrfs rollback | snapshot rollback UX가 일반 사용자에게 설명 가능한가 | rollback note |
| Immutable root | root와 user state 경계가 명확한가 | filesystem observation note |
| Package exception | native package 변경이 transactional model과 충돌하지 않는가 | package risk note |
| Flatpak | desktop app delivery 기본값으로 적합한가 | app delivery note |
| Wayland/XDG | Astra Shell 독립 계층 요구사항과 충돌하지 않는가 | portal compatibility note |
| GPU policy | proprietary driver와 transactional update risk가 설명되는가 | GPU risk note |
| Secure Boot/signing | snapshot rollback과 trust chain이 연결 가능한가 | signing note |
| Recovery | Astra Recovery가 Btrfs snapshot rollback과 연결될 수 있는가 | recovery note |
| Fedora comparison | Fedora Atomic 대비 유지보수성과 UX 차이가 드러나는가 | comparison note |

## 성공 기준

- openSUSE Aeon / MicroOS의 transactional update와 Btrfs rollback 구조를 AstraOS 용어로 설명할 수 있습니다.
- immutable root와 mutable state 경계가 문서화됩니다.
- Fedora Atomic 계열과 같은 matrix 기준으로 비교할 수 있습니다.
- App Center, Astra Shell, Astra Recovery와 연결할 리스크가 분리됩니다.
- Phase 1-9에서 기록할 evidence 항목이 명확합니다.

## 실패 기준

- openSUSE Aeon / MicroOS 계열을 VM PoC 전에 최종 base로 확정합니다.
- Btrfs snapshot rollback을 사용자 데이터 보호나 backup 보장으로 과장합니다.
- transactional package exception UX의 난이도를 숨깁니다.
- driver, Secure Boot, compatibility runtime 충돌 리스크를 기록하지 않습니다.
- 실제 설치, 다운로드, 명령 실행이 Phase 1-8에서 수행됩니다.

## 보안 경계

- 모든 openSUSE 검증은 후속 승인된 disposable VM에서만 수행합니다.
- host disk, partition, bootloader, driver는 변경하지 않습니다.
- shared folder와 clipboard는 기본 비활성으로 둡니다.
- production account, credential, API key, personal file은 VM에 입력하지 않습니다.
- bridge network는 별도 승인 전 금지하고 NAT를 우선합니다.
- compatibility runtime 설치와 security experiment는 이번 단계에서 금지합니다.

## 다음 단계

1. [VM Host Requirements](vm-host-requirements.md)를 기준으로 후보 VM tool을 정합니다.
2. [VM Snapshot and Rollback Policy](vm-snapshot-and-rollback-policy.md)에 따라 snapshot checkpoint를 정의합니다.
3. [Linux Base PoC Test Matrix](poc-test-matrix.md)의 openSUSE 항목과 evidence 이름을 맞춥니다.
4. [Fedora Atomic VM Test Plan](fedora-atomic-vm-test-plan.md)과 같은 기준으로 결과를 비교합니다.
5. Phase 1-9에서 사용자 승인 후 disposable openSUSE VM PoC를 수행합니다.
