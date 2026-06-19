# Astra Shell Technology Decision

> 현재 문서는 Phase 1-0 기준이며 실제 구현이 아니라 Astra Shell 프로토타입 착수 설계/범위/거버넌스 문서입니다. 이 문서는 실제 로그인, 권한 상승, 시스템 설정 변경, 보안 정책 변경, 드라이버 제어, 백신 연동, OS 제어 기능을 구현하지 않습니다.

## 결정 요약

Phase 1-0의 추천 기술은 WebView 기반 mock입니다. 단, 실제 OS shell 후보로 확정하는 것이 아니라 UI 흐름, 화면 책임, 정보 구조, premium visual direction을 빠르게 검증하기 위한 prototype 기술로 한정합니다.

장기 native shell 후보는 Qt/QML과 Slint를 계속 비교합니다. Rust UI는 보안-critical userland와 도구 UI에는 적합할 수 있지만, Phase 1-0의 polished shell mock에는 WebView가 더 빠릅니다.

Phase 1-5c/1-5e 기준으로 이 결정의 경계를 다음과 같이 보강합니다.

- WebView 기반 static mock은 실제 AstraOS가 아닙니다.
- WebView 기반 static mock은 최종 Astra Shell 기술 확정이 아닙니다.
- AstraOS는 Linux LTS 기반 immutable/atomic desktop OS를 목표로 합니다.
- Astra Shell의 장기 구현은 Linux/Wayland/XDG 표준 위에서 native shell prototype으로 재평가합니다.
- 단순 Electron-only shell, Web app OS, Windows 앱 방향은 제외합니다.

## 평가 기준

- UI mock 제작 속도
- premium visual direction 표현력
- 애니메이션과 responsive layout
- Linux desktop prototype 적합성
- Rust 및 native integration 가능성
- 보안 경계 설정 용이성
- 실제 OS 제어 기능과 분리하기 쉬운지
- 이후 native shell로 마이그레이션할 수 있는지

## 후보 비교

| 후보 | 장점 | 단점 | Phase 1-0 판단 |
| --- | --- | --- | --- |
| Qt/QML | Linux desktop shell UI 경험이 많고, 애니메이션과 native UI 표현력이 좋음 | C++/QML 복잡도, 라이선스 검토, 초기 scaffold 무거움 | 장기 후보로 유지 |
| Slint | Rust 친화적이고 가벼우며 native UI 방향과 맞음 | shell급 복잡한 desktop UX 사례와 ecosystem이 Qt보다 적음 | 중기 후보로 유지 |
| Rust UI | Rust 중심 구조와 안전성에 유리함 | 고급 shell UI, 애니메이션, 디자이너 협업에서 제약 가능 | 도구/설정 UI 후보 |
| WebView 기반 mock | 빠른 화면 제작, 높은 시각 표현력, mock data 분리 용이 | 실제 OS shell 대표성 낮음, WebView 보안 경계 관리 필요 | Phase 1 prototype 추천 |

## 추천 기술스택

Phase 1 prototype은 다음 구성을 추천합니다.

- UI prototype: WebView 기반 mock
- 언어: TypeScript
- UI: React 또는 Svelte 중 하나를 이후 선택
- Styling: CSS modules 또는 design token 기반 CSS
- 데이터: 정적 JSON mock data
- 실행 범위: localhost 또는 file-local mock
- Native/system API: 사용하지 않음
- 보안 기본값: 외부 네트워크 요청 없음, OS API 없음, privileged operation 없음

## 추천 이유

Phase 1-0의 목표는 실제 OS shell이 아니라 화면 책임과 사용자 흐름을 빠르게 검증하는 것입니다. WebView 기반 mock은 로그인 화면, Desktop, Dock, Launcher, Control Center, Notification Center, Workspace View, Settings mock, Security Center mock을 가장 빠르게 시각화할 수 있습니다.

보안 측면에서도 mock data만 사용하고 OS API를 연결하지 않으면 Phase 1-0 경계를 명확히 지킬 수 있습니다.

## 기술 결정 경계

이 결정은 다음을 의미하지 않습니다.

- WebView를 최종 Astra Shell로 확정하지 않습니다.
- 실제 로그인이나 시스템 설정 제어를 구현하지 않습니다.
- AI Studio WebUI를 실행하지 않습니다.
- Astra Shield 또는 Secure Delete와 연동하지 않습니다.

## 이후 재평가 기준

Phase 1 prototype 이후 다음 조건을 기준으로 Qt/QML 또는 Slint 전환을 검토합니다.

- 실제 compositor/window manager integration 필요성
- native Linux desktop 성능 요구사항
- 접근성 요구사항
- sandbox와 permission broker 연동 방식
- packaging 및 license 조건
- Balanced Premium Performance 목표 충족 여부

Phase 1-6 이후 추가 재평가 기준:

- 선택한 Linux base의 Wayland/session integration 방식
- XDG desktop entry, XDG portal, accessibility stack 지원 수준
- Linux native app window chrome/theme bridge 구현 가능성
- atomic update와 Shell rollback 정책 연동 가능성
- Shell crash 시 desktop session 복구 전략
- App Center에서 Linux native, Windows compatibility, macOS experimental 앱 source/profile을 구분하는 UX 구현 가능성
- compatibility runtime profile과 permission broker를 Shell UX에 안전하게 노출할 수 있는지

