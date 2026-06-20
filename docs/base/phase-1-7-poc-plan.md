# Phase 1-7 Linux Base PoC Plan

> 현재 문서는 Phase 1-7 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 ISO 제작, OS 빌드, 파티션 작업, 부트로더 작업, Wine/Proton/Darling 설치, Wayland compositor 구현, 드라이버 설치, 시스템 변경을 수행하지 않습니다.

## 목적

AstraOS를 실제 부팅 가능한 최신 Linux 기반 immutable/atomic desktop OS로 발전시키기 전에, Phase 1-6 shortlist인 Fedora Atomic / Silverblue 계열과 openSUSE Aeon / MicroOS 계열을 동일한 기준으로 검증할 PoC 계획을 정의합니다.

이 문서는 최종 base OS를 확정하지 않습니다. Phase 1-7의 목표는 안전한 검증 항목, 성공/실패 기준, 보안 경계, 후속 ADR 입력 자료를 준비하는 것입니다.

## 범위

- Fedora Atomic / Silverblue 계열 PoC 항목 정의
- openSUSE Aeon / MicroOS 계열 PoC 항목 정의
- atomic update, rollback, root filesystem, app delivery, Wayland/XDG, Astra Shell integration 검증 기준 정의
- GPU driver policy, Secure Boot/signing chain, installer/first boot/onboarding 검증 기준 정의
- Windows compatibility runtime과 per-app prefix 설계 검증 계획 연결
- macOS compatibility experimental track 연구 계획 연결
- 모든 실험을 나중에 VM 또는 disposable test machine에서만 수행하도록 제한

## 비범위

- 실제 ISO 제작
- 실제 OS 이미지 빌드
- 파티션, disk layout, bootloader 변경
- 실제 driver 설치
- Wine, Proton, DXVK, VKD3D-Proton, Darling 설치 또는 실행
- Wayland compositor 구현
- Astra Shell runtime 구현
- Secure Boot key 생성, signing pipeline 구축
- 외부 다운로드 실행
- destructive command 실행
- 현재 개발 머신의 시스템 상태 변경

## 검증 항목

| 항목 | Fedora Atomic / Silverblue 관점 | openSUSE Aeon / MicroOS 관점 | 산출물 |
| --- | --- | --- | --- |
| atomic update / rollback | rpm-ostree deployment와 rollback 구조 조사 | transactional-update와 Btrfs snapshot rollback 조사 | update/rollback 비교표 |
| root filesystem 구조 | ostree 기반 bootable root와 layered package 영향 분석 | read-only root, Btrfs subvolume/snapshot 영향 분석 | rootfs risk map |
| custom package layering | rpm-ostree layering 정책, 제한, UX 정의 | transactional-update 기반 패키지 변경 정책 정의 | layering policy draft |
| Flatpak 중심 앱 배포 | default app/app source 정책 설계 | Flatpak + distrobox/native exception 정책 설계 | app delivery policy |
| AppImage/native 보완 | user-space 실행, sandbox, update UX 검토 | native package 예외와 transactional update 충돌 검토 | exception policy |
| Wayland/XDG portal | Astra Shell portal 요구사항 정의 | portal, accessibility, input method 요구사항 정의 | shell integration checklist |
| Astra Shell 계층 | base OS와 Shell runtime 분리 방식 | base snapshot과 Shell update 경계 | shell boundary map |
| GPU driver policy | NVIDIA/AMD/Intel, Secure Boot, third-party repo 검토 | proprietary driver와 transactional update 영향 검토 | GPU policy matrix |
| Secure Boot/signing | rpm-ostree image/update signing 후보 조사 | snapshot/update chain signing 후보 조사 | signing threat model |
| Windows runtime | runtime channel, Flatpak/container/native 후보 비교 | runtime rollback과 prefix persistence 검토 | Windows runtime PoC plan |
| per-app prefix | prefix manifest, repair/reset UX | snapshot rollback과 prefix state 분리 | prefix lifecycle model |
| macOS experimental | Darling/VM/container/remote track 조사 | same research track | macOS research plan |
| installer/first boot | installer, onboarding, update consent UX | Aeon/MicroOS first boot UX 차이 | onboarding requirements |
| rollback/runtime conflict | OS rollback과 compatibility runtime 상태 충돌 검토 | snapshot rollback과 user prefix mismatch 검토 | rollback conflict matrix |
| Astra Recovery 연계 | rpm-ostree rollback과 Recovery UX 연결 | Btrfs snapshot rollback과 Recovery UX 연결 | recovery integration plan |

## 성공 기준

- Fedora Atomic / Silverblue와 openSUSE Aeon / MicroOS의 PoC 체크리스트가 동일한 판정 기준으로 정리됩니다.
- 각 후보가 AstraOS의 Linux 기반, immutable/atomic, Astra Shell 독립 계층 방향에 얼마나 적합한지 설명할 수 있습니다.
- compatibility runtime과 OS rollback의 충돌 가능성이 별도 matrix로 분리됩니다.
- GPU driver, Secure Boot, installer, first boot, recovery risk가 후속 실험 항목으로 분리됩니다.
- 실제 시스템 변경 없이 문서, checklist, test matrix만 생성됩니다.

## 실패 기준

- 최종 base OS를 근거 없이 확정합니다.
- 실제 OS 빌드, ISO 제작, 설치, driver 변경, compatibility runtime 설치로 범위가 확장됩니다.
- Fedora 또는 openSUSE의 기본 desktop UX를 AstraOS Shell UX로 오해합니다.
- Wine/Proton 또는 macOS compatibility를 초기 MVP 보장 기능처럼 표현합니다.
- rollback, driver, Secure Boot, prefix persistence 리스크를 문서에서 분리하지 못합니다.

## 보안 경계

- 모든 실험은 후속 단계에서 별도 VM 또는 disposable test machine에서만 수행합니다.
- 현재 개발 머신에서 destructive command, partition command, bootloader command, driver install, compatibility runtime install을 실행하지 않습니다.
- 외부 다운로드는 이번 단계에서 실행하지 않습니다.
- Secure Boot/signing은 threat model과 key ownership 설계만 다룹니다.
- macOS compatibility research는 proprietary framework, Apple asset, 실제 macOS app 포함을 금지합니다.
- Astra Shield, Secure Delete, AI Studio, Vault 관련 실제 기능은 구현하지 않습니다.

## 다음 단계

1. `fedora-atomic-poc-checklist.md`와 `opensuse-atomic-poc-checklist.md`를 기준으로 후보별 evidence checklist를 확정합니다.
2. `poc-test-matrix.md`로 후보별 판정 기준을 표준화합니다.
3. `windows-runtime-poc-plan.md`와 `macos-runtime-research-plan.md`를 compatibility track 입력으로 사용합니다.
4. 후속 Phase에서 VM/disposable machine 기반 dry-run 계획을 별도 승인받습니다.
5. PoC 결과를 바탕으로 Linux base ADR을 갱신합니다.

## 참고 자료

- Fedora Atomic Desktops updates, upgrades, and rollbacks: <https://docs.fedoraproject.org/en-US/atomic-desktops/updates-upgrades-rollbacks/>
- Fedora Atomic Desktops technical information: <https://docs.fedoraproject.org/en-US/atomic-desktops/technical-information/>
- Fedora Atomic Desktops getting started: <https://docs.fedoraproject.org/en-US/atomic-desktops/getting-started/>
- openSUSE MicroOS: <https://microos.opensuse.org/>
- Aeon desktop: <https://aeondesktop.github.io/>
- SUSE transactional-update documentation: <https://documentation.suse.com/sle-micro/5.5/html/SLE-Micro-all/sec-transactional-udate.html>
