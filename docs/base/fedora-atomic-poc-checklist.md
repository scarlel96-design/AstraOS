# Fedora Atomic / Silverblue PoC Checklist

> 현재 문서는 Phase 1-7 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 Fedora Atomic 설치, rpm-ostree 실행, package layering, driver 설치, OS 빌드, ISO 제작을 수행하지 않습니다.

## 목적

Fedora Atomic / Silverblue 계열이 AstraOS의 실제 Linux base 후보로 적합한지 검증하기 위한 PoC 체크리스트를 정의합니다.

Fedora Atomic 계열은 ostree/rpm-ostree 기반 atomic desktop, rollback, Flatpak 중심 앱 모델, Wayland/XDG desktop stack을 검증하는 primary candidate입니다.

## 범위

- rpm-ostree/ostree 기반 update와 rollback 구조 조사
- root filesystem과 deployment 모델 조사
- package layering 정책 검증 항목 정의
- Flatpak, AppImage, native package 예외 정책 검토
- Astra Shell을 별도 Shell 계층으로 얹는 방식 검토
- NVIDIA/AMD/Intel GPU driver policy 검토
- Secure Boot/signing/update chain 가능성 조사
- Wine/Proton 계열 runtime 제공 방식과 per-app prefix model 검토
- Astra Recovery와 rpm-ostree rollback 연계 가능성 검토

## 비범위

- Fedora Atomic 설치
- `rpm-ostree` 명령 실행
- package layering 실제 수행
- driver 설치
- Secure Boot key 생성 또는 signing 수행
- ISO, compose, custom image 제작
- Wine/Proton/DXVK/VKD3D-Proton 설치
- Wayland compositor 또는 Astra Shell 구현
- 현재 개발 머신 시스템 변경

## 검증 항목

| 영역 | 체크 항목 | 필요 evidence | 판정 질문 |
| --- | --- | --- | --- |
| atomic update | rpm-ostree deployment 단위와 update activation 방식 | 공식 문서, VM 실험 계획 | AstraOS update UX로 설명 가능한가 |
| rollback | 이전 deployment rollback 구조 | rollback doc, recovery flow sketch | Astra Recovery와 연결 가능한가 |
| rootfs | ostree bootable root와 mutable 영역 분리 | rootfs map | user data와 runtime state를 분리 가능한가 |
| package layering | layered package가 deployment에 미치는 영향 | policy note | 사용자에게 허용할 예외 범위를 정의 가능한가 |
| Flatpak | GUI app delivery 기본값 | app source policy | App Center와 자연스럽게 연결되는가 |
| AppImage/native | Flatpak 부재 앱 보완 | exception policy | 보안과 update UX를 해치지 않는가 |
| Wayland/XDG | portal, accessibility, input method | Shell requirement list | Astra Shell이 표준과 충돌하지 않는가 |
| Astra Shell | GNOME/KDE 테마가 아닌 독립 shell layer | shell boundary diagram | base와 UI 계층이 분리되는가 |
| GPU | NVIDIA/AMD/Intel driver channel | driver policy matrix | Secure Boot와 update가 충돌하지 않는가 |
| Secure Boot | image/update signing 후보 | signing threat model | key ownership과 recovery가 설명되는가 |
| Windows runtime | runtime channel 분리 | runtime plan | rollback과 runtime 업데이트가 분리되는가 |
| per-app prefix | prefix manifest, repair/reset | prefix lifecycle model | app별 복구 UX가 가능한가 |
| macOS experimental | Darling/VM/container/remote research | research note | 초기 목표 과장 없이 실험 track으로 유지되는가 |
| first boot | language, privacy, update consent | onboarding checklist | 일반 사용자용 AstraOS UX로 포장 가능한가 |
| rollback conflict | OS rollback과 prefix/app runtime mismatch | conflict matrix | 안전한 repair/reset 경로가 있는가 |

## 성공 기준

- Fedora Atomic 계열의 update/rollback/rootfs 구조를 AstraOS 용어로 설명할 수 있습니다.
- package layering은 기본 앱 설치 경로가 아니라 예외적 base modification으로 제한됩니다.
- Flatpak 중심 App Center 전략과 native/AppImage 예외 정책이 분리됩니다.
- Astra Shell은 Fedora 기본 desktop theme가 아니라 독립 UI 계층으로 정의됩니다.
- Windows runtime과 per-app prefix는 OS deployment rollback과 분리된 state model로 설계됩니다.
- NVIDIA/AMD/Intel, Secure Boot, signing chain 리스크가 후속 실험 항목으로 분리됩니다.

## 실패 기준

- Fedora Atomic 계열을 검증 없이 최종 base로 확정합니다.
- package layering을 일반 앱 설치 UX로 남용하는 방향을 채택합니다.
- 기본 GNOME/KDE UI를 AstraOS Shell로 간주합니다.
- driver, Secure Boot, codec, third-party repo 리스크를 숨깁니다.
- compatibility runtime 설치를 이번 단계에서 수행합니다.

## 보안 경계

- 모든 Fedora 실험은 후속 승인된 VM 또는 disposable test machine에서만 수행합니다.
- 현재 개발 머신에서는 Fedora 설치, rpm-ostree 실행, driver 설치, package layering을 하지 않습니다.
- 외부 다운로드 실행 금지.
- signing key 생성/배포 금지.
- Wine/Proton/DXVK/VKD3D-Proton 설치 금지.
- 보안 기능은 방어적 recovery/update integrity 관점으로만 다룹니다.

## 다음 단계

1. Fedora Atomic 공식 문서 기반 evidence checklist를 보강합니다.
2. VM 전용 dry-run 계획을 별도 승인받습니다.
3. rpm-ostree rollback, layering, Flatpak, driver, Secure Boot 리스크를 `poc-test-matrix.md`에 반영합니다.
4. PoC 결과를 `0009-linux-base-poc-plan.md` 후속 ADR 입력으로 사용합니다.

## 참고 자료

- Fedora Atomic Desktops updates, upgrades, and rollbacks: <https://docs.fedoraproject.org/en-US/atomic-desktops/updates-upgrades-rollbacks/>
- Fedora Atomic Desktops technical information: <https://docs.fedoraproject.org/en-US/atomic-desktops/technical-information/>
- Fedora Atomic Desktops getting started: <https://docs.fedoraproject.org/en-US/atomic-desktops/getting-started/>
- rpm-ostree documentation: <https://coreos.github.io/rpm-ostree/>
