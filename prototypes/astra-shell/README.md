# Astra Shell Prototype Scaffold

> 현재 디렉터리는 Phase 1-0 기준의 Astra Shell UI mock scaffold입니다. 실제 앱 코드, 실제 로그인, 권한 상승, 시스템 설정 변경, 보안 정책 변경, 드라이버 제어, 백신 연동, OS 제어 기능을 구현하지 않습니다.

## 목적

이 디렉터리는 Phase 1 prototype에서 Astra Shell UI mock을 배치할 위치를 예약합니다. 현재는 문서 중심 scaffold이며 실행 가능한 앱 코드를 포함하지 않습니다.

Phase 1-1에서는 화면별 Wireframe / Mock Spec, 디자인 토큰 문서, mock data schema/examples, 요약 문서만 포함합니다.

Phase 1-2에서는 실제 UI 앱 코드를 만들기 전에 Static Mock Planning Pack만 포함합니다. 이 단계에서도 package.json, HTML, CSS, TypeScript, JavaScript, WebView 실행 코드, native bridge, OS command API를 만들지 않습니다.

## 추천 구조

```text
prototypes/astra-shell/
├── README.md
├── mock-data/
├── screens/
├── design-tokens/
└── notes/
```

## Phase 1-1 산출물

- `screens/login-screen.md`
- `screens/desktop.md`
- `screens/dock.md`
- `screens/launcher.md`
- `screens/control-center.md`
- `screens/notification-center.md`
- `screens/workspace-view.md`
- `screens/settings-mock.md`
- `screens/security-center-mock.md`
- `design-tokens/tokens.md`
- `mock-data/schema.md`
- `mock-data/examples.md`
- `notes/phase-1-1-summary.md`

## Phase 1-2 산출물

- `notes/static-route-map.md`
- `notes/interaction-state-table.md`
- `notes/string-key-inventory.md`
- `notes/static-asset-policy.md`
- `notes/mock-data-loading-policy.md`
- `notes/phase-1-2-planning-summary.md`

## Phase 1-2 허용 범위

- route map 문서
- interaction state table 문서
- KO/EN string key inventory 문서
- static asset policy 문서
- mock data loading policy 문서
- `.gitattributes` 최소 정책 제안 문서화

## Phase 1-2 금지 범위

- 실제 앱 코드
- package.json
- HTML, CSS, TypeScript, JavaScript
- WebView 실행 코드
- native bridge
- OS command API
- 실제 로그인
- 권한 상승
- 시스템 설정 변경
- 보안 정책 변경
- 드라이버 제어
- 백신 또는 EDR 연동
- Secure Delete 실행
- Vault 암호화 엔진
- AI WebUI 실행

## Phase 1-0 허용 범위

- 정적 mock data
- 화면별 notes
- 디자인 토큰 초안
- UI wireframe 또는 mock asset
- 실제 OS API와 연결되지 않는 prototype 문서

## Phase 1-0 금지 범위

- 실제 로그인 인증
- 권한 상승
- 시스템 설정 변경
- 보안 정책 변경
- 드라이버 제어
- 백신 또는 EDR 연동
- Secure Delete 실행
- Vault 암호화 엔진
- AI WebUI 실행
- 파일 삭제 또는 시스템 명령 실행
