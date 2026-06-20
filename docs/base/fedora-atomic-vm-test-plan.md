# Fedora Atomic VM Test Plan

> 현재 문서는 Phase 1-8 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 Fedora Atomic 또는 Silverblue 설치, ISO 다운로드, rpm-ostree 실행, driver 설치, package layering 실행, OS 빌드, 시스템 변경을 수행하지 않습니다.

## 목적

Fedora Atomic / Silverblue 계열을 Phase 1-9 disposable VM에서 검증하기 위한 테스트 계획을 정의합니다.

이번 문서는 실제 Fedora VM을 만들지 않습니다. 테스트 목적, 관찰 항목, 성공/실패 기준, 기록할 evidence를 Phase 1-9 승인 전에 고정합니다.

## 범위

- Fedora Atomic / Silverblue VM PoC 목적 정의
- rpm-ostree, ostree deployment, rollback 구조 관찰 계획
- immutable root filesystem과 mutable state 분리 관찰 계획
- Flatpak 중심 앱 배포 전략 관찰 계획
- Wayland/XDG portal 적합성 관찰 계획
- package layering을 예외적 base modification으로 다루는 기준
- update flow와 rollback flow 관찰 기준
- 기록할 logs/screenshots/evidence 항목 정의

## 비범위

- Fedora ISO 다운로드
- Fedora VM 생성 또는 설치
- rpm-ostree 명령 실행
- package layering 실행
- driver 설치
- Secure Boot key 생성 또는 signing 실험
- Wine/Proton/DXVK/VKD3D-Proton 설치
- Astra Shell 또는 Wayland compositor 구현
- production account 로그인
- host personal file mount

## 검증 항목

| 영역 | Phase 1-9 관찰 질문 | 기록할 evidence |
| --- | --- | --- |
| Atomic update | update가 deployment 단위로 설명 가능한가 | update state screenshot 또는 note |
| Rollback | 이전 deployment로 되돌리는 UX가 설명 가능한가 | rollback 전후 state note |
| Root filesystem | immutable root와 mutable 영역이 분리되는가 | rootfs observation note |
| Package layering | layering이 일반 앱 설치가 아니라 base exception으로 설명되는가 | policy risk note |
| Flatpak | GUI app delivery 기본값으로 적합한가 | App Center integration note |
| AppImage/native | 예외 앱 정책을 분리할 수 있는가 | exception policy note |
| Wayland/XDG | portal, accessibility, input method 요구사항과 충돌하지 않는가 | compatibility note |
| GPU policy | NVIDIA/AMD/Intel 정책을 base decision과 분리 가능한가 | GPU risk note |
| Secure Boot/signing | update chain, key ownership, rollback trust가 설명되는가 | signing risk note |
| Recovery | Astra Recovery가 deployment rollback과 연결될 수 있는가 | recovery flow note |

## 성공 기준

- Fedora Atomic 계열의 update, rollback, rootfs 구조를 AstraOS 용어로 설명할 수 있습니다.
- Flatpak 중심 앱 배포와 package layering 예외 정책이 분리됩니다.
- Astra Shell이 Fedora 기본 desktop theme가 아니라 독립 UI 계층임을 유지합니다.
- rollback과 compatibility runtime state conflict가 별도 리스크로 기록됩니다.
- Phase 1-9에서 기록할 evidence 항목이 명확합니다.

## 실패 기준

- Fedora Atomic 계열을 VM PoC 전에 최종 base로 확정합니다.
- package layering을 일반 앱 설치 경로로 취급합니다.
- Fedora 기본 desktop UI를 Astra Shell 방향으로 오해합니다.
- driver, Secure Boot, codec, third-party repo 리스크를 기록하지 않습니다.
- 실제 설치, 다운로드, 명령 실행이 Phase 1-8에서 수행됩니다.

## 보안 경계

- 모든 Fedora 검증은 후속 승인된 disposable VM에서만 수행합니다.
- host disk, partition, bootloader, driver는 변경하지 않습니다.
- shared folder와 clipboard는 기본 비활성으로 둡니다.
- production account, credential, API key, personal file은 VM에 입력하지 않습니다.
- bridge network는 별도 승인 전 금지하고 NAT를 우선합니다.
- compatibility runtime 설치와 security experiment는 이번 단계에서 금지합니다.

## 다음 단계

1. [VM Host Requirements](vm-host-requirements.md)를 기준으로 후보 VM tool을 정합니다.
2. [VM Snapshot and Rollback Policy](vm-snapshot-and-rollback-policy.md)에 따라 snapshot checkpoint를 정의합니다.
3. [Linux Base PoC Test Matrix](poc-test-matrix.md)의 Fedora 항목과 evidence 이름을 맞춥니다.
4. Phase 1-9에서 사용자 승인 후 disposable Fedora VM PoC를 수행합니다.
