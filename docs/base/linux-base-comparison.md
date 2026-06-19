# Linux Base Comparison - Phase 1-6

> 현재 문서는 Phase 1-6 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 ISO 제작, OS 빌드, Wine/Proton/Darling 설치, Wayland compositor 구현, static mock 수정을 수행하지 않습니다.

## 목적

이 문서는 AstraOS를 실제 부팅 가능한 최신 Linux 기반 immutable/atomic desktop OS로 발전시키기 위한 base OS 후보를 동일한 기준으로 비교합니다.

AstraOS는 GNOME/KDE 테마 커스터마이징이 아니라 Linux base 위에 Astra Shell을 얹는 구조입니다. 따라서 기본 데스크톱 UI의 취향보다 다음 요소를 우선 평가합니다.

- immutable/atomic update 구조
- rollback과 recovery-first 운영
- 최신 stable 또는 LTS kernel 추적 가능성
- driver, graphics, Wayland, XDG portal 적합성
- Windows compatibility runtime 통합 가능성
- macOS compatibility experimental track 수용성
- Astra Shell 독립 UI 계층 통합 용이성
- 장기 유지보수와 일반 사용자용 제품화 가능성

## 후보군

| 후보 | 평가 위치 | 요약 |
| --- | --- | --- |
| Fedora Atomic / Silverblue 계열 | 1차 shortlist 후보 | rpm-ostree, atomic desktop, Flatpak 중심 앱 모델, 빠른 desktop stack 추적에 강점 |
| openSUSE Aeon / MicroOS 계열 | 1차 shortlist 후보 | transactional-update, Btrfs snapshot rollback, immutable 운영에 강점 |
| NixOS 계열 | 실험적 후보 | declarative configuration과 generation rollback이 강하지만 일반 사용자 제품화 난이도가 높음 |
| Arch 계열 | 고난도 후보 | 최신 kernel/graphics/Wine stack 추적은 강하지만 atomic 제품화와 안정 운영 부담이 큼 |
| Debian / Ubuntu LTS 계열 | 안정성 후보 | LTS, vendor support, hardware enablement는 강하지만 immutable/atomic 구조는 별도 설계가 필요 |

## 점수 모델

점수는 1점부터 5점까지 사용합니다. 5점이 AstraOS 목표에 가장 적합하다는 뜻입니다.

가중 점수는 `가중치 x 점수`로 계산하며, 총점 500점을 100점 만점으로 환산합니다. 이 점수는 최종 배포판 확정이 아니라 Phase 1-7 PoC 우선순위를 정하기 위한 1차 비교입니다.

| 기준 | 가중치 | 평가 의도 |
| --- | ---: | --- |
| 최신 커널 추적 용이성 | 5 | 최신 hardware enablement와 graphics stack 수용성 |
| LTS/stable 운영 가능성 | 7 | 일반 사용자용 OS로 안정 운영 가능한지 |
| immutable/atomic update 적합성 | 10 | AstraOS root filesystem/update 목표와 직접 일치하는지 |
| rollback 구조 | 8 | 실패한 업데이트에서 복구 가능한지 |
| 보안 업데이트 속도 | 6 | 취약점 대응과 업데이트 채널 신뢰성 |
| 드라이버 호환성 | 6 | 실제 desktop hardware 대응력 |
| NVIDIA/AMD/Intel GPU 대응 | 6 | GPU vendor별 실사용 가능성 |
| Wayland/XDG portal 적합성 | 6 | 현대 Linux desktop shell 기반 적합성 |
| Flatpak/AppImage/native package 전략 | 5 | 앱 배포와 사용자 앱 설치 모델 |
| Wine/Proton/DXVK/VKD3D-Proton 통합 난이도 | 5 | Windows 앱 compatibility track 준비 난이도 |
| per-app compatibility prefix 관리 용이성 | 4 | 앱별 prefix, repair, reset, sandbox profile 관리 가능성 |
| macOS compatibility experimental track 수용성 | 3 | Darling/VM/container/remote track 조사 여지 |
| 개발 난이도 | 5 | 초기 팀이 안정적으로 다룰 수 있는지 |
| 장기 유지보수 난이도 | 6 | release engineering과 update chain 유지 비용 |
| 일반 사용자용 OS 포장 가능성 | 5 | installer, onboarding, settings, support 모델 |
| 커스텀 Astra Shell 통합 용이성 | 5 | 기본 DE가 아니라 독립 Shell 계층을 얹기 쉬운지 |
| installer/first boot/onboarding 구현 난이도 | 3 | 첫 부팅 경험과 제품화 UX 난이도 |
| secure boot/signing/update chain 설계 난이도 | 5 | 검증 가능한 update chain 설계 가능성 |

## Weighted Score Table

| 후보 | 총점 / 500 | 환산 / 100 | 1차 해석 |
| --- | ---: | ---: | --- |
| Fedora Atomic / Silverblue 계열 | 416 | 83.2 | 1차 shortlist. Atomic desktop, Flatpak, Wayland/XDG, shell integration 균형이 가장 좋음 |
| openSUSE Aeon / MicroOS 계열 | 400 | 80.0 | 1차 shortlist. Immutable/rollback 구조가 강하고 recovery-first 방향과 잘 맞음 |
| Debian / Ubuntu LTS 계열 | 377 | 75.4 | 안정성 후보. LTS/vendor support는 강하지만 atomic rootfs는 추가 설계 필요 |
| NixOS 계열 | 338 | 67.6 | 실험적 후보. 재현성과 rollback은 강하지만 제품화/학습 비용이 큼 |
| Arch 계열 | 322 | 64.4 | 고난도 후보. 최신성은 강하지만 안정적 일반 사용자 OS로 포장하는 부담이 큼 |

## 관점별 핵심 점수

| 후보 | Windows compatibility 관점 | macOS compatibility experimental 관점 | UI/Shell 독립성 관점 | AstraOS 목표 적합성 |
| --- | ---: | ---: | ---: | --- |
| Fedora Atomic / Silverblue 계열 | 8 / 10 | 3 / 5 | 4 / 5 | 높음 |
| openSUSE Aeon / MicroOS 계열 | 8 / 10 | 3 / 5 | 4 / 5 | 높음 |
| Debian / Ubuntu LTS 계열 | 8 / 10 | 3 / 5 | 3 / 5 | 중간 이상 |
| NixOS 계열 | 6 / 10 | 4 / 5 | 3 / 5 | 실험적 |
| Arch 계열 | 9 / 10 | 3 / 5 | 3 / 5 | 고난도 |

### Windows compatibility 관점

Windows compatibility는 Wine, Proton, DXVK, VKD3D-Proton, per-app prefix, GPU/Vulkan/audio/input integration, launcher integration, uninstall/repair/reset prefix UX를 장기 목표로 평가합니다.

- Arch는 최신 Wine/Proton stack 추적이 강하지만, AstraOS가 일반 사용자용 immutable/atomic OS로 안정 운영되기에는 release engineering 부담이 큽니다.
- Fedora Atomic과 openSUSE Aeon/MicroOS는 immutable/atomic 구조와 compatibility runtime 격리를 함께 설계하기 좋습니다.
- Debian/Ubuntu LTS는 vendor ecosystem과 사용자 친숙성이 강하지만 최신 compatibility stack은 별도 backport, container, Flatpak, 또는 compatibility runtime 채널 설계가 필요합니다.
- NixOS는 per-app environment 재현성은 강하지만 사용성과 운영 복잡도가 큽니다.

### macOS compatibility experimental 관점

macOS compatibility는 Phase 1-6에서 실험 트랙입니다. macOS GUI 앱 완전 호환을 초기 목표로 약속하지 않습니다.

- Darling 기반 가능성, CLI/Unix 계열 도구 호환, `.app` bundle, plist, framework, dynamic library, filesystem layout, permissions, sandbox 차이를 조사 대상으로 둡니다.
- NixOS는 실험 환경 재현성이 좋아 research track에는 유리하지만, 일반 사용자용 OS base로 바로 확정하기에는 부담이 큽니다.
- Fedora Atomic, openSUSE Aeon/MicroOS, Debian/Ubuntu LTS는 compatibility experiment를 별도 sandbox/container/VM/remote profile로 분리하는 방향이 적합합니다.

### UI/Shell 독립성 관점

Astra Shell은 Linux 위에서 동작하는 독립 Shell 계층입니다. 기존 desktop environment UI 복제나 단순 테마 커스터마이징은 목표가 아닙니다.

- Fedora Atomic과 openSUSE Aeon/MicroOS는 OS base와 app runtime을 분리하기 쉬워 Shell 계층을 독립적으로 설계하기 좋습니다.
- Debian/Ubuntu LTS는 넓은 호환성이 장점이지만 immutable/atomic Shell product 구조는 별도 설계가 필요합니다.
- NixOS는 선언형 통합에 강하지만, 일반 사용자에게 투명한 Shell 제품 경험을 만드는 난이도가 높습니다.
- Arch는 자유도가 높지만 stable product baseline을 스스로 설계해야 합니다.

## 후보별 장점과 단점

### Fedora Atomic / Silverblue 계열

장점:

- atomic desktop 모델과 rollback이 AstraOS의 immutable/atomic 목표와 잘 맞습니다.
- Flatpak 중심 앱 설치, toolbox류 개발 흐름, rpm-ostree 기반 base update 분리가 명확합니다.
- Wayland, PipeWire, Mesa 등 modern desktop stack 추적이 빠른 편입니다.
- Astra Shell을 base OS 위의 독립 계층으로 얹는 방향과 잘 맞습니다.

단점:

- 전통적인 장기 LTS 배포판은 아니므로 AstraOS만의 support window, update channel, QA 정책이 필요합니다.
- NVIDIA proprietary driver, codec, third-party repository, Secure Boot signing 정책은 별도 검증이 필요합니다.
- rpm-ostree layering 남용을 막는 제품 정책이 필요합니다.

### openSUSE Aeon / MicroOS 계열

장점:

- transactional-update와 Btrfs snapshot rollback 방향이 recovery-first OS와 잘 맞습니다.
- immutable root와 automatic update 흐름을 전제로 설계된 계열입니다.
- 실패한 업데이트를 snapshot 기반으로 되돌리는 구조가 명확합니다.
- MicroOS 계열은 최소 base와 application 분리를 설계하기 좋습니다.

단점:

- Aeon/MicroOS desktop product의 사용자 생태계와 자료가 Fedora Atomic 대비 좁을 수 있습니다.
- Flatpak, distrobox, transactional-update 사이의 UX를 AstraOS 방식으로 다시 정리해야 합니다.
- NVIDIA, gaming, compatibility runtime, first boot UX는 별도 PoC가 필요합니다.

### NixOS 계열

장점:

- declarative configuration, generation rollback, reproducible system 구성이 강합니다.
- compatibility runtime, per-app environment, 실험 track을 재현 가능한 구성으로 관리하기 좋습니다.
- 장기적으로 AstraOS module manifest와 선언형 시스템 모델을 결합할 가능성이 있습니다.

단점:

- 학습 곡선과 운영 복잡도가 큽니다.
- 일반 사용자용 desktop OS로 포장하려면 installer, app UX, support 문서, rollback UX를 많이 감춰야 합니다.
- 기존 Linux 앱과 일부 vendor binary integration에서 추가 설계가 필요할 수 있습니다.

### Arch 계열

장점:

- 최신 kernel, Mesa, Wine, Proton, DXVK, VKD3D-Proton 추적에 유리합니다.
- hardware enablement와 gaming/compatibility runtime 실험 속도가 빠릅니다.
- 커스텀 OS 설계 자유도가 큽니다.

단점:

- rolling release 기반이라 AstraOS가 원하는 안정적 일반 사용자 OS baseline을 직접 구성해야 합니다.
- immutable/atomic update, signed update, rollback, secure boot chain을 별도 설계해야 합니다.
- update regression, package churn, support policy 부담이 큽니다.

### Debian / Ubuntu LTS 계열

장점:

- LTS/stable 운영, vendor ecosystem, 사용자 친숙성, 드라이버 지원 측면이 강합니다.
- Ubuntu LTS HWE 계열은 LTS 기반에서 더 새로운 kernel/graphics stack을 제공하는 경로가 있습니다.
- installer, first boot, enterprise support, documentation 기반이 넓습니다.

단점:

- 기본 모델은 AstraOS가 원하는 immutable/atomic rootfs가 아니므로 별도 architecture가 필요합니다.
- atomic update, rollback, signed image update chain을 직접 설계하거나 외부 기술과 결합해야 합니다.
- 최신 desktop stack과 compatibility runtime은 안정성 정책과 충돌할 수 있습니다.

## 1차 결론

Phase 1-6 기준 1차 shortlist는 다음 두 계열입니다.

1. Fedora Atomic / Silverblue 계열
2. openSUSE Aeon / MicroOS 계열

Debian / Ubuntu LTS 계열은 안정성 fallback 후보로 유지합니다. NixOS 계열은 실험적 architecture 후보로 유지합니다. Arch 계열은 최신성 실험에는 가치가 있지만 초기 MVP base 후보에서는 보류합니다.

이 문서는 특정 배포판을 최종 확정하지 않습니다. Phase 1-7에서 PoC와 운영 리스크 검증을 수행한 뒤 base architecture ADR을 갱신해야 합니다.

## 아직 결정하지 말아야 할 항목

- 최종 base distribution
- 최종 kernel channel과 support window
- rpm-ostree, transactional-update, Nix generation, custom image update 중 최종 update mechanism
- bootloader, disk layout, encryption, recovery partition 구조
- Secure Boot key ownership, signing pipeline, update verification chain
- NVIDIA proprietary driver 포함 방식
- Wine/Proton/DXVK/VKD3D-Proton 제공 방식
- Darling 또는 macOS compatibility 구현 방식
- Astra Shell의 최종 compositor/framework/runtime
- installer, first boot, onboarding 구현 기술

## Phase 1-7 PoC 목록

Phase 1-7은 실제 OS 빌드가 아니라 검증 설계와 제한된 PoC 계획으로 시작합니다.

- Fedora Atomic 기반 update/rollback 흐름 조사 PoC
- openSUSE Aeon/MicroOS 기반 transactional update/rollback 흐름 조사 PoC
- NVIDIA/AMD/Intel GPU driver policy matrix 작성
- Wayland compositor 후보와 XDG portal integration 요구사항 정리
- Flatpak/AppImage/native package 분리 정책 초안
- Wine/Proton/DXVK/VKD3D-Proton runtime 제공 방식 비교
- per-app compatibility prefix manifest mock 설계
- macOS compatibility experimental track 현실성 검토 ADR 초안
- secure boot/signing/update chain threat model 작성
- installer/first boot/onboarding UX 요구사항 작성

## 참고 자료

- Fedora Atomic Desktops documentation: <https://docs.fedoraproject.org/en-US/atomic-desktops/>
- Fedora Atomic Desktops updates, upgrades, and rollbacks: <https://docs.fedoraproject.org/en-US/atomic-desktops/updates-upgrades-rollbacks/>
- openSUSE MicroOS: <https://microos.opensuse.org/>
- openSUSE Aeon documentation archive: <https://en.opensuse.org/Archive%3AAeon/Documentation>
- SUSE transactional-update documentation: <https://documentation.suse.com/sle-micro/5.3/html/SLE-Micro-all/sec-transactional-udate.html>
- NixOS Manual: <https://nixos.org/manual/nixos/stable/>
- Debian Releases: <https://www.debian.org/releases/>
- Ubuntu kernel lifecycle and enablement stack: <https://ubuntu.com/kernel/lifecycle>
- Arch Linux: <https://archlinux.org/>
