# AstraOS MVP Scope

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## MVP 정의 원칙

AstraOS MVP는 처음부터 완성형 OS를 구현하는 것이 아니라, Linux LTS 기반 immutable/atomic OS의 핵심 방향과 안전한 모듈 확장 구조를 검증 가능한 범위로 줄여 정의합니다.

MVP 범위는 Modular Evolution Architecture와 Balanced Premium Performance를 기준으로 합니다. 즉, 모든 기능을 한 번에 만들지 않고 모듈별로 안전하게 진화할 수 있는 구조를 먼저 고정하며, 보안과 복구에 필요한 성능 비용은 허용하되 측정과 제어 방법을 함께 설계합니다.

## Phase 1-5c/1-5d/1-5e MVP 방향 고정

Phase 1-5c 기준 AstraOS MVP의 실제 OS 방향은 Linux LTS 기반 immutable/atomic desktop OS입니다. AstraOS는 Windows 앱, Web app, 단순 Electron/WebView 앱, Electron-only shell이 아닙니다.

Phase 1-5d 기준 MVP UI는 GNOME/KDE/Ubuntu UI 커스터마이징이 아니라 Astra Shell mock/prototype입니다. Linux base는 kernel, driver, system service, package/update, Wayland, XDG 표준을 담당하고, 사용자 경험은 Astra Shell과 Astra Design Language가 담당합니다.

현재 static mock은 실제 OS가 아니라 Shell UI prototype입니다. MVP 문서에서 static mock을 실제 Linux OS 구현으로 오해하지 않도록 다음 경계를 둡니다.

- static mock은 화면 구조, design token, route-like flow, KO/EN string key, mock data를 검증합니다.
- static mock은 실제 login/session, system settings, security status, package manager, file system, Wayland compositor와 연결하지 않습니다.
- Phase 1-5c/1-5d/1-5e는 문서와 방향 고정이며 실제 OS 빌드, ISO 생성, 파티션 작업, 부팅로더 작업을 수행하지 않습니다.

Phase 1-5e 기준으로 MVP 방향은 “AstraOS Real Linux Base + Compatibility Strategy”를 포함합니다. 이는 실제 compatibility layer 구현이 아니라 장기 목표와 위험 경계를 문서화하는 작업입니다.

- Windows 앱 호환성은 장기 지원 목표로 준비합니다.
- macOS 앱 호환성은 Experimental track으로 준비합니다.
- 현재 단계에서는 Wine, Proton, DXVK, VKD3D-Proton, Darling을 설치하거나 실행하지 않습니다.
- Linux native 앱, Windows compatibility 앱, macOS experimental 앱은 App Center와 Launcher에서 구분 가능한 source/profile 모델을 가져야 합니다.
- compatibility runtime은 sandbox, permission broker, update/rollback 정책과 연결되어야 합니다.

## Linux Base Selection Criteria

Phase 1-6에서 Linux base를 선택하기 전까지 특정 배포판을 최종 고정하지 않습니다. Phase 1-5e 이후 후보군은 Fedora Atomic/Silverblue 계열, openSUSE Aeon/MicroOS 계열, NixOS 계열, Arch 계열, Debian/Ubuntu LTS 계열입니다.

선택 기준:

- LTS/stable 유지보수와 보안 업데이트
- hardware enablement와 드라이버 호환성
- immutable/atomic root filesystem 구성 가능성
- signed update와 rollback 구조
- Wayland, XDG portal, accessibility, keyboard navigation, localization 지원
- Flatpak, OCI, distro package, module package 같은 앱 배포 후보와의 적합성
- Astra Shell과 permission broker를 안전하게 통합할 수 있는지
- Wine/Proton/DXVK/VKD3D-Proton availability와 graphics stack readiness
- Darling 또는 macOS experimental track 조사 가능성

## Astra Design Language MVP

MVP UI는 Astra Design Language를 따릅니다.

- macOS의 정갈한 여백, glass surface, 미세한 depth, 조용한 typography를 참고합니다.
- One UI 9.0의 큰 radius, 부드러운 component 계층, 명확한 section 구조, 촉감 좋은 quick panel 감성을 참고합니다.
- Apple, Samsung, Windows, GNOME, KDE의 로고, 정확한 component 형태, 특정 icon style, menu/dock/taskbar 구조를 복제하지 않습니다.
- 보안 OS라는 이유로 과도한 cyber dashboard, neon, badge, warning color를 남발하지 않습니다.
- desktop, tablet, mobile까지 확장 가능한 design token 구조를 목표로 합니다.

## Phase 0 MVP 포함 범위

Phase 0의 MVP는 문서와 거버넌스 산출물입니다.

- 프로젝트 정체성 정의
- Linux LTS 기반 immutable/atomic 방향 정의
- Modular Evolution Architecture 개념 정의
- Balanced Premium Performance 기준 정의
- 보안 모델 정의
- 위협 모델 정의
- 위험 등록부 작성
- 로드맵 작성
- 코딩 및 문서화 기준 작성
- Secure Delete, Astra Shield, Astra Shield Guardian, AI Studio의 안전 경계 정의

## Phase 0 MVP 제외 범위

이번 Phase 0 기본 문서팩에서는 다음을 구현하지 않습니다.

- 커널 제작
- 드라이버 제작
- ISO 빌드
- 실제 업데이트 시스템
- 실제 rollback 시스템
- 실제 백신 또는 EDR 엔진
- 실제 Secure Delete 실행 기능
- 실제 Vault 암호화 기능
- 실제 AI Studio WebUI
- 실제 sandbox 런타임
- 실제 permission broker
- 실제 배포, 빌드, 릴리스용 CI/CD 파이프라인

## 핵심 모듈별 MVP 경계

| 모듈 | Phase 0 MVP 포함 | Phase 0 제외 |
| --- | --- | --- |
| Core OS | Linux LTS, immutable/atomic, signed update, rollback 설계 | 커널, 드라이버, ISO 빌드 |
| Linux Base Selection | Fedora Atomic, openSUSE Aeon, NixOS, Arch, Debian/Ubuntu LTS 후보 비교 기준 | 실제 base 선택, ISO, bootloader |
| Compatibility Layer | Windows/macOS compatibility 전략, 위험 경계, App Center profile 설계 | Wine/Proton/Darling 설치 또는 앱 실행 |
| Secure Delete | 사용자 소유 데이터 보호 정책, dry-run/preview/확인 UX 설계 | 실제 삭제 실행 |
| Astra Shield | 백신/EDR/복구 구조와 권한 경계 | 탐지 엔진, 차단 엔진 |
| Astra Shield Guardian | Shield 자체 보호와 자동 복구 구조 | 시스템 서비스, 드라이버, 커널 보호 |
| AI Studio | sandbox/localhost 기본값과 접근 제한 정책 | WebUI 구현, 외부 공개 기능 |
| Recovery | 복구 우선 설계와 rollback 정책 | 실제 복구 도구 |

## 보안 경계

Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능입니다. Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조입니다. AI Studio는 WebUI 외부 공개가 아니라 sandbox/localhost 기본값입니다.

MVP 문서에서 이 경계를 벗어나는 요구사항은 구현 항목으로 받아들이지 않고, 위험 분류 또는 이후 Phase 검토 항목으로 이동합니다.

## Phase 0 보조 산출물

이번 Phase 0 범위 안에서 다음 보조 산출물의 초안을 포함합니다.

- `LICENSES.md`: 사용 예정 오픈소스 라이선스, 배포 제약, 상표/브랜드 사용 기준 정리.
- `docs/**`: 모듈별 상세 문서 디렉터리 구성.
- `docs/module-framework/overview.md`: 모듈 manifest, 권한 프로필, sandbox 정책, 업데이트/rollback 계약 정의.
- `.github/workflows/security-checks.yml`: 문서/정적 검사 중심의 보안 체크 skeleton.

이 산출물은 실제 기능 구현이 아니라 Phase 0 설계와 거버넌스 검증을 위한 초안입니다.

## MVP 완료 기준

Phase 0 MVP는 다음 조건을 만족해야 완료로 볼 수 있습니다.

- 모든 기본 문서가 Phase 0 기준임을 명시한다.
- 실제 구현이 아니라 설계/범위/거버넌스 문서임을 명시한다.
- 금지 범위와 방어적 보안 경계를 명확히 유지한다.
- 보조 산출물의 초안과 이후 심화 TODO가 누락되지 않는다.
- 위험 작업에 dry-run, preview, rollback 원칙이 포함된다.
