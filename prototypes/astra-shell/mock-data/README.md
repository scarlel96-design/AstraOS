# Mock Data

Phase 1-0에서는 정적 mock data만 허용합니다. 실제 사용자 데이터, 시스템 상태, 보안 이벤트, 파일 목록, 프로세스 정보는 사용하지 않습니다.

Phase 1-1에서는 다음 문서를 mock data 계약의 기준으로 사용합니다.

- `schema.md`: 상태 구조와 필드 정의
- `examples.md`: fake/mock data 예시와 화면별 mapping

## 목적

이 디렉터리는 이후 Astra Shell UI mock에서 사용할 정적 데이터 이름과 금지 데이터 기준을 정리하기 위한 자리입니다. 현재 단계에서는 JSON, TypeScript, API, database, fixture loader를 만들지 않습니다.

## 화면별 mock data 이름

| 화면 | mock data 이름 | 설명 |
| --- | --- | --- |
| Login Screen | `loginScreenMock` | 선택된 mock 사용자, 인증 UI 상태, 로컬 전용 상태 |
| Desktop | `desktopMock` | 현재 시간, workspace 이름, open window card |
| Dock | `dockMock` | pinned app, active app, badge count |
| Launcher | `launcherMock` | app category, app card, suggested action |
| Control Center | `controlCenterMock` | quick toggle, slider, performance mode |
| Notification Center | `notificationCenterMock` | notification group, severity, timestamp |
| Workspace View | `workspaceViewMock` | workspace thumbnail, window preview card |
| Settings Mock | `settingsMock` | category, setting row, disabled action state |
| Security Center Mock | `securityCenterMock` | Shield, Guardian, Vault, Secure Delete, Private Workspace 상태 |

## 허용 데이터

- 가짜 사용자 이름: `Astra User`
- 가짜 앱 이름: `Settings Mock`, `Security Center Mock`
- 가짜 보안 상태: `Protected mock`, `Healthy mock`
- 가짜 시스템 상태: `Local only`, `Balanced Premium`
- synthetic notification 또는 synthetic security event

## 금지 데이터

- 실제 사용자 이름, 계정 ID, 홈 디렉터리 경로
- 실제 암호, token, API key, secret
- 실제 파일 목록, 최근 문서, 브라우저 기록
- 실제 프로세스, window, workspace, network, battery 상태
- 실제 Astra Shield 이벤트, 격리 목록, 탐지 결과
- 실제 Vault 내용 또는 암호화 metadata

## 공통 경계 문구

모든 mock data 사용 화면은 다음 원칙을 유지해야 합니다.

- Phase 1-0 mock data만 사용합니다.
- 실제 로그인 금지.
- 권한 상승 금지.
- OS 제어 기능 금지.
- 위험 작업은 dry-run, preview, rollback 안내만 표시합니다.

