# openSUSE Aeon / MicroOS PoC Checklist

> 현재 문서는 Phase 1-7 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 openSUSE Aeon/MicroOS 설치, transactional-update 실행, Btrfs snapshot 조작, driver 설치, OS 빌드, ISO 제작을 수행하지 않습니다.

## 목적

openSUSE Aeon / MicroOS 계열이 AstraOS의 실제 Linux base 후보로 적합한지 검증하기 위한 PoC 체크리스트를 정의합니다.

openSUSE 계열은 transactional-update, Btrfs snapshot rollback, immutable root, recovery-first 운영 철학을 검증하는 co-primary candidate입니다.

## 범위

- transactional-update와 snapshot 기반 update/rollback 구조 조사
- root filesystem과 Btrfs snapshot 경계 조사
- native package 변경과 reboot activation 정책 검토
- Flatpak, AppImage, distrobox/native exception 정책 검토
- Astra Shell을 별도 Shell 계층으로 얹는 방식 검토
- NVIDIA/AMD/Intel GPU driver policy 검토
- Secure Boot/signing/update chain 가능성 조사
- compatibility runtime과 snapshot rollback 충돌 가능성 검토
- Astra Recovery와 Btrfs snapshot rollback 연계 가능성 검토

## 비범위

- openSUSE Aeon/MicroOS 설치
- `transactional-update`, `snapper`, `zypper` 명령 실행
- Btrfs snapshot 생성, 삭제, rollback 수행
- driver 설치
- Secure Boot key 생성 또는 signing 수행
- ISO, image, installer 제작
- Wine/Proton/Darling 설치
- Wayland compositor 또는 Astra Shell 구현
- 현재 개발 머신 시스템 변경

## 검증 항목

| 영역 | 체크 항목 | 필요 evidence | 판정 질문 |
| --- | --- | --- | --- |
| atomic update | transactional-update가 새 snapshot에서 변경을 준비하는 방식 | 공식 문서, VM 실험 계획 | AstraOS update UX로 설명 가능한가 |
| rollback | GRUB/Btrfs snapshot rollback 흐름 | rollback flow sketch | Astra Recovery와 연결 가능한가 |
| rootfs | read-only root, mutable 영역, snapshot 제외 영역 | rootfs map | runtime state와 user data를 분리 가능한가 |
| package change | transactional-update 기반 RPM 변경 | package exception policy | base modification을 안전하게 제한 가능한가 |
| Flatpak | GUI app 기본 배포 모델 | app source policy | App Center와 자연스럽게 연결되는가 |
| AppImage/native | Flatpak 부재 앱 보완 | exception policy | snapshot/update와 충돌하지 않는가 |
| Wayland/XDG | portal, accessibility, input method | Shell requirement list | Astra Shell 표준 요구와 맞는가 |
| Astra Shell | base snapshot과 Shell update 경계 | shell boundary diagram | Shell을 독립 계층으로 유지 가능한가 |
| GPU | proprietary driver와 transactional update 영향 | driver policy matrix | Secure Boot와 rollback을 함께 설명 가능한가 |
| Secure Boot | signed update chain 후보 | signing threat model | key ownership과 recovery가 설명되는가 |
| Windows runtime | runtime 제공 위치와 rollback 영향 | runtime plan | runtime과 prefix가 snapshot rollback에 휘말리지 않는가 |
| per-app prefix | prefix state 위치와 repair/reset UX | prefix lifecycle model | app별 복구 경로가 가능한가 |
| macOS experimental | Darling/VM/container/remote research | research note | experimental label을 유지하는가 |
| first boot | installer, onboarding, update consent | onboarding checklist | 일반 사용자용 AstraOS UX로 포장 가능한가 |
| rollback conflict | snapshot rollback과 user runtime state mismatch | conflict matrix | 안전한 reconciliation UX가 있는가 |

## 성공 기준

- transactional-update와 Btrfs snapshot rollback 구조를 AstraOS recovery-first 관점으로 설명할 수 있습니다.
- base OS 변경과 user app/runtime state의 경계를 정의할 수 있습니다.
- Flatpak 중심 앱 모델과 native package 예외 정책이 분리됩니다.
- Astra Recovery가 snapshot rollback과 어떤 관계를 가져야 하는지 설명할 수 있습니다.
- compatibility runtime, per-app prefix, user data가 rollback과 충돌하지 않는 state model을 설계할 수 있습니다.

## 실패 기준

- openSUSE Aeon/MicroOS 계열을 검증 없이 최종 base로 확정합니다.
- snapshot rollback이 user app/runtime state에 미치는 영향을 무시합니다.
- native package 변경을 일반 앱 설치 UX로 남용합니다.
- proprietary driver, Secure Boot, signing chain 리스크를 숨깁니다.
- compatibility runtime 설치를 이번 단계에서 수행합니다.

## 보안 경계

- 모든 openSUSE 실험은 후속 승인된 VM 또는 disposable test machine에서만 수행합니다.
- 현재 개발 머신에서는 openSUSE 설치, transactional-update 실행, Btrfs snapshot 조작, driver 설치를 하지 않습니다.
- 외부 다운로드 실행 금지.
- destructive command 금지.
- signing key 생성/배포 금지.
- Wine/Proton/Darling 설치 금지.
- macOS proprietary framework 또는 asset 포함 금지.

## 다음 단계

1. openSUSE Aeon/MicroOS 공식 문서 기반 evidence checklist를 보강합니다.
2. VM 전용 dry-run 계획을 별도 승인받습니다.
3. transactional update, snapshot rollback, Flatpak, native exception, driver, Secure Boot 리스크를 `poc-test-matrix.md`에 반영합니다.
4. PoC 결과를 `0009-linux-base-poc-plan.md` 후속 ADR 입력으로 사용합니다.

## 참고 자료

- openSUSE MicroOS: <https://microos.opensuse.org/>
- Aeon desktop: <https://aeondesktop.github.io/>
- SUSE transactional-update documentation: <https://documentation.suse.com/sle-micro/5.5/html/SLE-Micro-all/sec-transactional-udate.html>
- Transactional Update Guide: <https://kubic.opensuse.org/documentation/transactional-update-guide/transactional-update.html>
