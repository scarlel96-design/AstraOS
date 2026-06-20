# VM Snapshot and Rollback Policy

> 현재 문서는 Phase 1-8 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 실제 VM snapshot 생성, rollback 수행, ISO 다운로드, OS 설치, 파티션 작업, 부트로더 작업, 시스템 변경을 수행하지 않습니다.

## 목적

Phase 1-9 VM PoC에서 Fedora Atomic / Silverblue와 openSUSE Aeon / MicroOS 후보를 검증할 때 사용할 snapshot-first와 rollback-first 원칙을 정의합니다.

이 정책은 실험 실패를 숨기기 위한 것이 아니라, host PC 보호와 반복 가능한 evidence 기록을 위한 안전 장치입니다.

## 범위

- 모든 실험 전 snapshot 생성 원칙
- snapshot naming convention
- 검증 checkpoint 분리
- rollback criteria
- failed experiment recording
- VM external host file access restriction
- shared folder와 clipboard restriction

## 비범위

- 실제 snapshot 생성
- 실제 rollback 수행
- VM tool별 구체 설정 변경
- host disk backup 도구 구성
- guest OS command 실행
- production data backup 보장
- destructive recovery 절차

## Snapshot 원칙

- 모든 후보 VM 실험은 snapshot이 없는 상태에서 시작하지 않습니다.
- candidate base install 직후, update 전, rollback 전, compatibility runtime 관찰 전 snapshot을 분리합니다.
- snapshot은 성공 상태뿐 아니라 실패 직전 상태도 evidence로 남길 수 있어야 합니다.
- rollback은 실패를 삭제하는 작업이 아니라 실패 원인을 기록한 뒤 환경을 되돌리는 작업입니다.

## Naming Convention

Phase 1-9에서 snapshot 이름은 다음 정보를 포함하도록 계획합니다.

| 요소 | 예시 형식 | 목적 |
| --- | --- | --- |
| Phase | phase-1-9 | 실험 단계 식별 |
| Candidate | fedora-atomic 또는 opensuse-aeon | 후보 식별 |
| Checkpoint | clean-base, pre-update, post-update, pre-rollback | 상태 식별 |
| Date | YYYY-MM-DD | 기록 정렬 |
| Note | no-personal-data, nat-only | 안전 상태 확인 |

예시 문구는 naming policy 설명용이며, 이번 단계에서 snapshot을 생성하지 않습니다.

## Checkpoints

| Checkpoint | 목적 | Rollback 기준 |
| --- | --- | --- |
| clean-base | 초기 disposable VM 상태 | 초기 설치 또는 base state가 불명확할 때 |
| pre-update | atomic update 전 상태 | update flow 관찰 실패 또는 VM instability |
| post-update | update 후 상태 | rollback 전후 비교 필요 |
| pre-layering-review | package layering 관찰 전 상태 | layering risk가 과도하거나 state drift 발생 |
| pre-runtime-review | compatibility runtime 관찰 전 상태 | runtime state가 rollback과 충돌할 때 |
| pre-network-change | network mode 변경 전 상태 | network exposure가 예상보다 커질 때 |

## Failed Experiment Recording

실패한 실험은 rollback 전에 다음 정보를 기록합니다.

- candidate와 checkpoint 이름
- 실패가 발생한 검증 항목
- 사용자 데이터 또는 host 파일 노출 여부
- network exposure 여부
- rollback 전후 상태 요약
- 후속 PoC에서 반복할지 중단할지 판단

## 성공 기준

- Phase 1-9에서 snapshot 없이 실험하지 않는 원칙이 명확합니다.
- 후보별 snapshot naming과 checkpoint가 표준화됩니다.
- rollback이 failure evidence 기록 후 수행되는 절차로 정의됩니다.
- host shared folder와 clipboard 제한이 snapshot policy와 연결됩니다.

## 실패 기준

- snapshot 없이 update, rollback, package exception, runtime 관찰을 수행하도록 계획합니다.
- 실패 기록 없이 rollback만 수행하는 흐름을 허용합니다.
- host file access, shared folder, clipboard를 기본 허용합니다.
- snapshot을 production backup 또는 security guarantee처럼 과장합니다.

## 보안 경계

- snapshot은 VM 실험 safety mechanism이며 host backup을 대체하지 않습니다.
- VM shared folder는 기본 금지입니다.
- host personal file, secret, token, API key는 VM에 mount하거나 입력하지 않습니다.
- clipboard sharing은 기본 금지 또는 제한 모드로 둡니다.
- rollback은 destructive host operation을 정당화하지 않습니다.
- 모든 실제 snapshot/rollback은 Phase 1-9 사용자 승인 후 disposable VM에서만 수행합니다.

## 다음 단계

1. [VM Host Requirements](vm-host-requirements.md)의 VM tool 후보가 snapshot policy를 충족하는지 확인합니다.
2. [Fedora Atomic VM Test Plan](fedora-atomic-vm-test-plan.md)과 [openSUSE Aeon VM Test Plan](opensuse-aeon-vm-test-plan.md)의 checkpoint 이름을 맞춥니다.
3. [VM Test Safety Boundaries](vm-test-safety-boundaries.md)를 snapshot 생성 전 checklist로 사용합니다.
4. Phase 1-9 승인 후 disposable VM에서만 실제 snapshot policy를 적용합니다.
