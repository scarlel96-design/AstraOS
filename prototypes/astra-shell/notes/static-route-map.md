# Phase 1-2 Static Route Map

> 현재 문서는 Phase 1-2 기준의 Astra Shell Static Mock Planning Pack 문서입니다. 실제 앱 코드, package.json, HTML, CSS, TypeScript, JavaScript, WebView 실행 코드, native bridge, OS command API를 만들지 않습니다.

## 1. 목적

정적 WebView mock scaffold를 만들기 전에 화면 간 이동 구조를 문서화합니다. 이 route map은 실제 router 구현이 아니라, 이후 static/mock-only UI 작성자가 화면 간 관계와 진입점을 결정 없이 따라갈 수 있도록 하는 설계 문서입니다.

## 2. Phase 1-2 범위

- 정적 route 이름과 대상 화면 정의
- 화면별 허용 mock data 입력 연결
- 기본 진입 route와 fallback route 후보 정의
- 실제 OS 기능과 연결되지 않는 static/mock-only 이동 흐름 정의

## 3. Route Map

| Route | 화면 | 주요 입력 | 진입 경로 | 비고 |
| --- | --- | --- | --- | --- |
| `/login` | Login Screen | `currentUser`, `sessionState`, `networkStatus`, `batteryStatus` | 기본 시작 route | 실제 로그인 금지 |
| `/desktop` | Desktop | `systemStatus`, `runningApps`, `pinnedApps`, `workspaces` | mock login 이후 | 실제 desktop session 아님 |
| `/dock` | Dock | `pinnedApps`, `runningApps`, `notifications`, `securityStatus` | Desktop 하위 surface | 독립 route는 문서화용 |
| `/launcher` | Launcher | `pinnedApps`, `runningApps`, `aiStudioStatus` | Dock 또는 shortcut | 실제 앱 실행 금지 |
| `/control-center` | Control Center | `quickSettings`, `networkStatus`, `batteryStatus`, `securityStatus` | status area | 실제 설정 변경 금지 |
| `/notifications` | Notification Center | `notifications`, `privacyEvents`, `securityStatus` | notification badge | 실제 daemon 연동 금지 |
| `/workspaces` | Workspace View | `workspaces`, `runningApps`, `systemStatus` | workspace shortcut | 실제 compositor 제어 금지 |
| `/settings` | Settings Mock | `currentUser`, `quickSettings`, `securityStatus`, `aiStudioStatus` | Launcher, Control Center | 실제 설정 저장 금지 |
| `/security-center` | Security Center Mock | `securityStatus`, `shieldStatus`, `guardianStatus`, `vaultStatus`, `aiStudioStatus` | Dock, Settings, notifications | 실제 백신/EDR 결과 아님 |

## 4. 아직 구현하지 않을 항목

- 실제 router 구현
- browser history 처리
- WebView 실행 코드
- package.json, HTML, CSS, TypeScript, JavaScript
- native bridge
- OS command API
- 실제 로그인, 권한 상승, 시스템 설정 변경, 보안 정책 변경
- 드라이버 제어, 백신 연동, Secure Delete 실행, Vault 암호화 엔진, AI WebUI 실행

## 5. 보안 경계

- 모든 route는 static/mock-only 화면 이동입니다.
- route 진입은 실제 시스템 상태를 읽지 않습니다.
- remote content를 불러오지 않습니다.
- WebView mock은 localhost/static/mock data 전용으로만 설계합니다.
- `/security-center`는 실제 백신/EDR 결과가 아니라 문서화용 상태만 표현합니다.
- `/settings`는 실제 설정 변경이 아니라 화면 구조만 표현합니다.

## 6. 다음 구현 단계 TODO

- static route id와 screen id naming 확정
- fallback route를 `/login` 또는 `/desktop` 중 하나로 결정
- overlay route와 full-page route 구분 규칙 작성
- route별 KO/EN title key 연결
- route transition을 150~220ms 범위로 제한하는 문서형 interaction 기준 추가

