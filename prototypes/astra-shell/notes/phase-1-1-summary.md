# Phase 1-1 Summary: Astra Shell Wireframe / Mock Spec

> 현재 문서는 Phase 1-1 기준 요약입니다. 실제 앱 구현, WebView 실행 코드, 로그인, 권한 상승, 시스템 설정 변경, 보안 정책 변경, 드라이버 제어, 백신 연동, Secure Delete 실행, Vault 암호화 엔진, AI WebUI 실행을 포함하지 않습니다.

## 작업 범위

Phase 1-1은 Astra Shell 프로토타입 구현 전에 화면별 구조, 레이아웃, 상태, mock data, 사용자 흐름을 문서화하는 단계입니다.

## 생성/확장된 화면 spec

- `screens/login-screen.md`
- `screens/desktop.md`
- `screens/dock.md`
- `screens/launcher.md`
- `screens/control-center.md`
- `screens/notification-center.md`
- `screens/workspace-view.md`
- `screens/settings-mock.md`
- `screens/security-center-mock.md`

각 화면 문서는 다음 항목을 포함합니다.

1. 화면 목적
2. 사용자에게 보여줄 정보
3. 주요 UI 영역
4. 상태값
5. mock data 입력
6. 사용자 액션
7. 아직 구현하지 않을 실제 OS 기능
8. 보안 경계
9. 접근성 고려
10. 다음 구현 단계 TODO

## 디자인 방향

- Premium
- Future
- Calm
- Fast
- Trustworthy
- 어두운 반투명 패널
- 정돈된 blur/shadow
- 과하지 않은 motion
- 150~220ms 범위의 빠른 인터랙션
- 저사양 모드에서 blur/shadow/transparency 감소 가능
- Balanced Premium Performance 기준 유지

## Mock Data Coverage

`mock-data/schema.md`는 다음 상태를 포함합니다.

- `currentUser`
- `sessionState`
- `systemStatus`
- `securityStatus`
- `vaultStatus`
- `shieldStatus`
- `guardianStatus`
- `networkStatus`
- `batteryStatus`
- `notifications`
- `quickSettings`
- `runningApps`
- `pinnedApps`
- `workspaces`
- `recentFiles`
- `privacyEvents`
- `aiStudioStatus`

## 보안 경계

- 모든 데이터는 fake/mock data입니다.
- 실제 사용자 데이터, 실제 시스템 상태, 실제 파일 목록을 읽지 않습니다.
- 실제 보안 상태를 검사하지 않습니다.
- 실제 명령 실행 기능을 만들지 않습니다.
- native bridge를 만들지 않습니다.
- OS command API를 만들지 않습니다.
- remote content를 불러오지 않습니다.
- WebView mock은 localhost/static/mock data 전용으로만 설계합니다.
- Security Center mock은 실제 백신/EDR 결과가 아니라 문서화용 상태만 표현합니다.
- Settings mock은 실제 설정 변경이 아니라 화면 구조만 표현합니다.

## 다음 작업 제안

다음 단계는 아직 실제 앱 코드를 만들기 전에, 각 화면 spec을 기반으로 static route map, interaction state table, KO/EN string key inventory를 Markdown으로 작성하는 것입니다.

