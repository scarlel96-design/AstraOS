# Phase 1-2 Interaction State Table

> 현재 문서는 Phase 1-2 기준의 Astra Shell Static Mock Planning Pack 문서입니다. 실제 앱 코드, package.json, HTML, CSS, TypeScript, JavaScript, WebView 실행 코드, native bridge, OS command API를 만들지 않습니다.

## 1. 목적

정적 WebView mock을 만들기 전에 사용자 상호작용과 상태 전이를 문서화합니다. 이 표는 실제 event handler 구현이 아니라 mock-only state transition 계약입니다.

## 2. Phase 1-2 범위

- 필수 상호작용 목록 정의
- 시작 상태, mock 전이, 표시 결과 정의
- 금지되는 실제 동작 명시
- 접근성/저사양 모드 고려사항 연결

## 3. Interaction State Table

| 상호작용 | 시작 route | 입력 상태 | mock 전이 | 표시 결과 | 금지되는 실제 동작 |
| --- | --- | --- | --- | --- | --- |
| mock login button | `/login` | `sessionState.kind=signedOut` | `mockChecking` -> `demoReady` | `/desktop` 표시 | 실제 로그인, 세션 생성, PAM 연동 |
| open launcher | `/desktop` 또는 `/dock` | `launcherOpen=false` | `launcherOpen=true` | `/launcher` overlay 표시 | 실제 앱 인덱싱, 명령 실행 |
| open control center | `/desktop` | `controlCenterOpen=false` | `controlCenterOpen=true` | `/control-center` panel 표시 | 실제 시스템 설정 읽기/변경 |
| open notification center | `/desktop` | `notificationsOpen=false` | `notificationsOpen=true` | `/notifications` panel 표시 | 실제 notification daemon 연동 |
| switch workspace | `/workspaces` | `activeWorkspaceId` | 다른 fake workspace id로 변경 | 선택된 workspace preview 표시 | 실제 compositor/window manager 제어 |
| open settings mock | `/launcher` 또는 `/control-center` | `selectedScreen` | `selectedScreen=settings` | `/settings` 표시 | 실제 설정 저장, 권한 상승 |
| open security center mock | `/dock`, `/settings`, `/notifications` | `selectedScreen` | `selectedScreen=security-center` | `/security-center` 표시 | 실제 백신/EDR 연동 |
| toggle quick setting mock | `/control-center` | `quickSettings.*` | 해당 boolean 또는 mode만 mock 변경 | toggle visual state 변경 | 실제 네트워크/밝기/사운드 변경 |
| dismiss notification mock | `/notifications` | `notifications[].read=false` | 해당 item hidden 또는 read 처리 | list에서 mock 상태 변경 | 실제 로그 삭제, 실제 알림 삭제 |

## 4. 아직 구현하지 않을 항목

- 실제 event handler
- 실제 state store
- 실제 router
- 실제 command 실행
- native bridge
- OS command API
- 시스템 설정 변경
- 보안 정책 변경
- 백신 연동
- Secure Delete 실행

## 5. 보안 경계

- 모든 상태 전이는 fake/mock data 객체 안에서만 설계합니다.
- 실제 사용자 데이터, 실제 시스템 상태, 실제 파일 목록을 읽지 않습니다.
- 실제 보안 상태를 검사하지 않습니다.
- notification dismiss는 실제 감사 로그 삭제가 아닙니다.
- quick setting toggle은 실제 OS 설정 변경이 아닙니다.

## 6. 다음 구현 단계 TODO

- interaction id naming 확정
- overlay open/close keyboard behavior 문서화
- focus return rule 정의
- disabled/preview-only action의 공통 microcopy 정의
- reduce motion 모드에서 전이 시간을 0~80ms로 줄이는 정책 연결

