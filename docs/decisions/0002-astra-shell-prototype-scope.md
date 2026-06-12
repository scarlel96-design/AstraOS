# Decision 0002: Astra Shell Prototype Scope

> 현재 문서는 Phase 1-0 기준이며 실제 구현이 아니라 Astra Shell 프로토타입 착수 설계/범위/거버넌스 문서입니다. 이 문서는 실제 로그인, 권한 상승, 시스템 설정 변경, 보안 정책 변경, 드라이버 제어, 백신 연동, OS 제어 기능을 구현하지 않습니다.

## 결정

Astra Shell의 첫 작업 단위는 Phase 1 전체 구현이 아니라 “Phase 1-0: Astra Shell 프로토타입 착수 설계”로 제한합니다.

Phase 1-0에서는 로그인 화면, Desktop, Dock, Launcher, Control Center, Notification Center, Workspace View, Settings mock, Security Center mock의 책임을 분리하고, WebView 기반 mock을 Phase 1 prototype 추천 기술로 채택합니다.

## 이유

Astra Shell은 사용자가 AstraOS를 처음 체감하는 핵심 계층이지만, 실제 OS shell 구현은 인증, 권한, compositor, system settings, 보안 정책, 프로세스 실행, sandbox, permission broker와 연결되므로 위험 범위가 큽니다.

따라서 Phase 1-0에서는 실제 제어 기능 없이 화면 구조와 UX 흐름을 먼저 검증합니다.

## 채택 범위

- 화면별 책임 분리
- mock data 기반 UI 설계
- WebView 기반 prototype 추천
- `prototypes/astra-shell/` 최소 scaffold
- 보안 경계 문서화

## 비채택 범위

- 실제 로그인
- 권한 상승
- 시스템 설정 변경
- 보안 정책 변경
- 드라이버 제어
- 백신 연동
- Secure Delete 실행
- Vault 암호화 엔진
- AI WebUI 실행
- 커널, display manager, compositor, ISO 빌드 구현

## 기술 결정

Phase 1 prototype의 1차 추천은 WebView 기반 mock입니다.

이 결정은 빠른 시각화와 책임 분리를 위한 것이며 최종 shell 기술 확정이 아닙니다. 이후 native shell 요구사항이 구체화되면 Qt/QML과 Slint를 다시 비교합니다.

## 보안 결정

- mock data만 사용한다.
- remote content를 로드하지 않는다.
- native bridge와 OS command 실행 API를 제공하지 않는다.
- 위험 작업은 preview-only 또는 disabled 상태로 둔다.
- Secure Delete는 사용자 소유 데이터 보호 기능으로만 표시한다.
- Astra Shield는 방어적 백신/EDR/복구 구조로만 표시한다.
- AI Studio는 sandbox/localhost 기본값으로만 표시한다.

