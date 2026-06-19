# Windows App Compatibility

> 현재 문서는 Phase 1-5e 기준이며 실제 구현이 아니라 Windows app compatibility 전략을 정리하는 설계/범위/거버넌스 문서입니다. 이 문서는 Wine, Proton, DXVK, VKD3D-Proton, Winetricks, Bottles 유사 도구를 설치하거나 실행하지 않습니다.

## 목적

AstraOS는 장기적으로 Linux native 앱만 실행하는 OS가 아니라 Windows 앱 호환성 준비를 포함하는 Linux 기반 desktop OS를 목표로 합니다.

이 문서는 Windows 앱 호환성을 AstraOS Shell, App Center, sandbox, permission broker, update/recovery 정책과 어떻게 연결할지 정의합니다. 현재 단계에서는 조사, 구조 설계, 위험 분류, UX 방향만 다룹니다.

## 목표

- Windows 앱 실행 가능성을 장기 roadmap에 포함합니다.
- Wine/Proton 계열 compatibility stack을 후보로 둡니다.
- 앱별 prefix를 독립적으로 관리합니다.
- prefix repair/reset/uninstall UX를 설계합니다.
- GPU, Vulkan, audio, input, windowing integration을 Linux/Wayland 환경과 연결하는 방향을 문서화합니다.
- compatibility profile을 sandbox와 permission broker 아래에 둡니다.

## 후보 기술

| 후보 | 역할 | 현재 판단 |
| --- | --- | --- |
| Wine | Win32/Win64 API compatibility layer | 기본 후보, 직접 설치 금지 |
| Proton | 게임/Steam 중심 Wine 파생 stack | gaming profile 후보, 직접 설치 금지 |
| DXVK | Direct3D 9/10/11 to Vulkan translation | GPU/Vulkan integration 후보 |
| VKD3D-Proton | Direct3D 12 to Vulkan translation | 고성능 그래픽 앱 후보 |
| Winetricks/Bottles 유사 관리 구조 | runtime/prefix/profile 관리 UX 참고 | AstraOS 고유 App Center UX로 재해석 |

## Per-App Prefix Model

AstraOS는 Windows 앱을 하나의 global Wine prefix에 몰아넣지 않는 방향을 우선합니다.

원칙:

- 앱별 독립 prefix
- prefix manifest
- runtime version pinning
- GPU/audio/input capability profile
- file access scope
- network access scope
- repair/reset/uninstall action
- log와 crash report 분리
- prefix backup 또는 rollback 가능성 검토

## Sandboxed Compatibility Profile

Windows compatibility layer는 privileged system service가 아니라 sandboxed app runtime 후보로 다룹니다.

기본 제한:

- host filesystem 전체 접근 금지
- 사용자 승인 없는 home directory 접근 금지
- clipboard, microphone, camera, screen capture는 portal/permission broker를 통과
- network permission은 profile별로 명시
- prefix 내부 registry/file 변경은 해당 app scope에 제한
- uninstall/reset은 dry-run/preview와 사용자 확인 우선

## Shell and Launcher Integration

Astra Shell과 App Center는 Windows 앱을 Linux native 앱과 구분하되 낙인처럼 과도하게 표시하지 않습니다.

UI 방향:

- App Center에서 compatibility status 표시
- Launcher에서 Windows app badge는 작고 조용하게 표시
- app window는 AstraOS window chrome/theme bridge와 최대한 일관되게 표시
- per-app settings에서 runtime, prefix, repair, reset, uninstall 제공
- reset prefix는 destructive action으로 분류하고 confirmation, preview, rollback 가능성 고지 요구

## Graphics, Audio, Input

Windows compatibility는 다음 integration을 별도 검증해야 합니다.

- Vulkan driver와 Mesa/NVIDIA proprietary driver 호환성
- DXVK/VKD3D-Proton runtime version
- Wayland/XWayland windowing behavior
- PipeWire audio routing
- game controller/input method
- HiDPI scaling
- multi-monitor behavior

## 제외 범위

현재 단계에서 하지 않습니다.

- Wine/Proton/DXVK/VKD3D-Proton 설치
- Windows 앱 실행
- Windows binary 분석 또는 우회
- DRM/anti-cheat 우회
- anti-cheat bypass
- license 우회
- registry/system32 조작 자동화
- 사용자 파일 자동 import

## 리스크

- 앱별 호환성 편차가 큽니다.
- anti-cheat, DRM, kernel driver 의존 앱은 제한될 수 있습니다.
- graphics driver와 Vulkan stack에 따라 성능이 크게 달라질 수 있습니다.
- prefix reset/uninstall은 사용자 데이터 손실 위험이 있으므로 preview와 확인이 필요합니다.
- Windows 앱 호환성을 보장한다는 마케팅 표현은 피해야 합니다.

## 다음 단계

- `docs/compatibility/compatibility-layer-architecture.md`와 연결
- `docs/decisions/0006-compatibility-strategy.md` 기준으로 phase gate 설정
- Phase 1-6 이후 Linux base 후보별 Wine/Proton package availability 조사
- App Center compatibility profile UX spec 작성
