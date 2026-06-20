# Linux Base PoC Test Matrix

> 현재 문서는 Phase 1-7 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 ISO 제작, OS 빌드, 파티션 작업, 부트로더 작업, driver 설치, Wine/Proton/Darling 설치, Wayland compositor 구현을 수행하지 않습니다.

## 목적

Fedora Atomic / Silverblue 계열과 openSUSE Aeon / MicroOS 계열을 같은 기준으로 비교하기 위한 PoC test matrix를 정의합니다.

이 matrix는 실제 명령 실행표가 아닙니다. 후속 Phase에서 별도 승인된 VM 또는 disposable test machine에서만 실험할 evidence plan입니다.

## 범위

- 15개 PoC 항목의 후보별 evidence type 정의
- 성공/실패 판정 기준 표준화
- security boundary와 destructive action 금지 기준 정의
- Windows/macOS compatibility track과 base rollback 충돌 검토 연결

## 비범위

- 실제 설치 또는 runtime 실행
- 실제 update/rollback 수행
- 실제 filesystem snapshot 조작
- 실제 GPU driver 설치
- Secure Boot key 생성
- Wine/Proton/Darling 설치
- external download 실행
- benchmark 또는 performance claim 작성

## 검증 항목

| # | 항목 | Fedora evidence | openSUSE evidence | 성공 기준 | 실패 기준 |
| ---: | --- | --- | --- | --- | --- |
| 1 | atomic update / rollback | rpm-ostree deployment/rollback 문서와 VM 계획 | transactional-update/snapshot rollback 문서와 VM 계획 | update와 rollback UX를 AstraOS 용어로 설명 가능 | rollback이 recovery UX와 연결되지 않음 |
| 2 | root filesystem 구조 | ostree root, deployment, mutable state map | read-only root, Btrfs subvolume/snapshot map | base/user/runtime state 경계가 명확함 | user data와 OS rollback 경계가 모호함 |
| 3 | custom package layering | rpm-ostree layering policy | transactional-update package change policy | 예외적 base modification으로 제한 | 일반 앱 설치 경로로 남용 |
| 4 | Flatpak 앱 전략 | App Center Flatpak-first policy | Flatpak-first + native exception policy | user app과 base update가 분리됨 | app install이 base immutability를 깨뜨림 |
| 5 | AppImage/native 보완 | sandbox/portal/update UX 검토 | snapshot/update 충돌 검토 | 예외 경로가 사용자에게 명확함 | unmanaged binary가 기본 경로가 됨 |
| 6 | Wayland/XDG portal | portal/accessibility/input method 요구사항 | 동일 요구사항 | Astra Shell 요구사항이 Linux 표준과 호환 | Shell이 표준 portal을 우회 |
| 7 | Astra Shell 계층 | Shell runtime/base image 경계 | Shell runtime/snapshot 경계 | base OS와 UI 계층 분리 | GNOME/KDE theme로 축소 |
| 8 | GPU driver policy | NVIDIA/AMD/Intel channel matrix | proprietary driver transactional impact | driver, update, signing 리스크가 분리됨 | driver 설치를 자동화 대상으로 오해 |
| 9 | Secure Boot/signing | image/update signing threat model | snapshot/update chain threat model | key ownership, rollback trust가 설명됨 | key/signing 책임이 불명확 |
| 10 | Wine/Proton runtime | runtime channel와 Flatpak/container/native 후보 | snapshot rollback 영향 검토 | runtime이 base와 분리됨 | runtime 설치가 base mutation에 의존 |
| 11 | per-app prefix | prefix manifest, repair/reset | prefix state와 snapshot 경계 | app별 reset/repair UX 가능 | rollback 후 prefix mismatch 처리 불가 |
| 12 | macOS experimental | Darling/VM/container/remote feasibility | 동일 feasibility | experimental/research로 제한 | 초기 MVP 보장처럼 표현 |
| 13 | installer/onboarding | first boot UX requirements | first boot UX requirements | 일반 사용자용 onboarding 가능 | base의 기본 installer UX에 의존 |
| 14 | rollback/runtime conflict | deployment rollback vs runtime state | snapshot rollback vs user state | conflict와 repair path 문서화 | mismatch risk 미기록 |
| 15 | Astra Recovery 연계 | rpm-ostree rollback handoff | Btrfs snapshot rollback handoff | Recovery UX와 base rollback 연결 | recovery와 base rollback이 분리됨 |

## 성공 기준

- 모든 항목이 두 후보에 같은 기준으로 적용됩니다.
- evidence가 공식 문서, 설계 도식, 후속 VM 계획 중 하나로 분류됩니다.
- "pass", "risk", "fail", "needs VM evidence" 네 상태 중 하나로 판정할 수 있습니다.
- compatibility runtime과 rollback conflict가 별도 위험으로 분리됩니다.
- 실제 시스템 변경 없이 matrix가 작성됩니다.

## 실패 기준

- 한 후보에 유리한 기준을 임의로 적용합니다.
- 실제 설치, update, rollback, driver, compatibility runtime 실행을 이번 단계에 포함합니다.
- macOS compatibility를 보장 기능처럼 평가합니다.
- Secure Boot/signing, GPU driver, rollback conflict를 후속 항목에서 누락합니다.

## 보안 경계

- 모든 command-level 실험은 후속 승인된 VM 또는 disposable test machine에서만 수행합니다.
- 현재 개발 머신에서는 destructive command, installation command, driver command, partition command를 실행하지 않습니다.
- 외부 다운로드 실행 금지.
- proprietary asset 포함 금지.
- Secure Delete, Astra Shield, AI Studio, Vault 실제 기능 구현 금지.

## 다음 단계

1. Phase 1-7 문서 검토 후 후보별 evidence owner와 판정 상태를 추가합니다.
2. 후속 VM dry-run 계획을 별도 문서로 분리합니다.
3. PoC 결과를 base selection ADR 갱신 입력으로 사용합니다.

## 참고 자료

- [Phase 1-7 PoC Plan](phase-1-7-poc-plan.md)
- [Fedora Atomic PoC Checklist](fedora-atomic-poc-checklist.md)
- [openSUSE Atomic PoC Checklist](opensuse-atomic-poc-checklist.md)
- [Windows Runtime PoC Plan](../compatibility/windows-runtime-poc-plan.md)
- [macOS Runtime Research Plan](../compatibility/macos-runtime-research-plan.md)
