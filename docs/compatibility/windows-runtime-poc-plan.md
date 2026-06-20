# Windows Runtime PoC Plan

> 현재 문서는 Phase 1-7 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 Wine, Proton, DXVK, VKD3D-Proton, Winetricks, Bottles 유사 runtime 설치 또는 실행을 수행하지 않습니다.

## 목적

AstraOS의 장기 목표인 Windows app compatibility를 Linux base PoC와 연결하기 위한 문서입니다.

이번 단계의 목표는 Fedora Atomic / Silverblue 계열과 openSUSE Aeon / MicroOS 계열에서 Windows compatibility runtime을 어떤 방식으로 제공할지 검증 계획을 세우는 것입니다. 실제 Windows 앱 실행, compatibility runtime 설치, 게임 실행은 수행하지 않습니다.

## 범위

- Wine, Proton, DXVK, VKD3D-Proton 제공 방식 비교 기준 정의
- Flatpak/container/native runtime channel 후보 검토
- per-app Windows compatibility prefix lifecycle 설계
- GPU/Vulkan/audio/input integration 요구사항 정리
- App Center와 Launcher integration UX 정의
- uninstall/repair/reset prefix UX 검토
- OS rollback과 runtime/prefix state 충돌 가능성 분석

## 비범위

- Wine/Proton/DXVK/VKD3D-Proton 설치
- Winetricks/Bottles 실행
- Windows 앱 설치 또는 실행
- DRM/game anti-cheat 우회
- proprietary Windows component 포함
- credential theft, exploit, bypass, evasion 관련 기능
- GPU driver 설치
- external download 실행
- 실제 sandbox/container 구성

## 검증 항목

| 항목 | 검증 내용 | Fedora Atomic 관점 | openSUSE Atomic 관점 |
| --- | --- | --- | --- |
| runtime channel | Flatpak, container, native layering 중 기본 방향 | rpm-ostree layering 회피 우선 | transactional-update mutation 회피 우선 |
| per-app prefix | app별 isolated prefix manifest | deployment rollback과 prefix state 분리 | snapshot rollback과 prefix state 분리 |
| GPU/Vulkan | DXVK/VKD3D-Proton 요구사항 | Mesa/NVIDIA 정책과 충돌 검토 | driver + snapshot update 충돌 검토 |
| audio/input | PipeWire, input portal, controller mapping | Wayland/XDG portal 연계 | Wayland/XDG portal 연계 |
| sandbox profile | file/network/device access 제한 | portal/permission broker 요구 | portal/permission broker 요구 |
| App Center UX | install, repair, reset, uninstall mock | compatibility status 표시 | compatibility status 표시 |
| rollback conflict | OS rollback 후 runtime/prefix mismatch | repair/reset flow 필요 | snapshot rollback reconciliation 필요 |
| updates | runtime update와 base update 분리 | runtime channel independent | runtime channel independent |
| logs/privacy | compatibility logs 최소화 | user consent/audit | user consent/audit |

## 성공 기준

- Windows runtime은 base OS mutation이 아니라 별도 compatibility runtime channel로 설계됩니다.
- per-app prefix는 app manifest, sandbox profile, repair/reset UX를 가집니다.
- OS rollback과 prefix/runtime mismatch가 위험으로 문서화됩니다.
- GPU/Vulkan/audio/input 요구사항이 base OS PoC 항목과 연결됩니다.
- App Center가 "호환성 관리 콘솔"이 아니라 일반 사용자가 이해 가능한 상태 표시 UX로 설계됩니다.

## 실패 기준

- Wine/Proton 설치를 이번 단계에서 실행합니다.
- runtime 제공을 무조건 native package layering에 의존합니다.
- per-app prefix가 shared global state로만 설계됩니다.
- app compatibility를 보장 기능처럼 표현합니다.
- DRM, anti-cheat, bypass, evasion 같은 금지 영역으로 확장됩니다.

## 보안 경계

- Windows compatibility는 사용자 소유 앱 실행 호환성 연구이며 공격 기능이 아닙니다.
- exploit, credential theft, AV bypass, malware behavior, evasion, unauthorized access 지원을 금지합니다.
- 모든 runtime 실험은 후속 승인된 VM 또는 disposable test machine에서만 수행합니다.
- 외부 다운로드 실행 금지.
- Wine/Proton/DXVK/VKD3D-Proton 설치 금지.
- 실제 Windows app 실행 금지.
- file, network, clipboard, device access는 later phase에서 permission broker와 sandbox profile을 통해 설계해야 합니다.

## 다음 단계

1. Flatpak/container/native runtime channel 비교표를 작성합니다.
2. per-app prefix manifest 초안을 작성합니다.
3. rollback conflict matrix에 runtime/prefix mismatch 사례를 추가합니다.
4. App Center compatibility status UI copy를 Astra Fusion Design Language에 맞춰 조정합니다.
5. 후속 Phase에서 VM 기반 runtime 설치 실험은 별도 승인받습니다.

## 참고 자료

- [Compatibility Layer Architecture](compatibility-layer-architecture.md)
- [Windows App Compatibility](windows-app-compatibility.md)
- [Linux Base PoC Test Matrix](../base/poc-test-matrix.md)
