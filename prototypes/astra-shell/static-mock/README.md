# Astra Shell Static WebView Mock Scaffold

> 현재 문서는 Phase 1-4 UI Polish + Accessibility Pass 기준이며 실제 구현이 아니라 정적 UI mock scaffold입니다. 실제 OS 제어, native bridge, OS command API, 실제 로그인, 권한 상승, 보안 정책 변경, 백신 실행, Vault 실행, Secure Delete 실행, AI WebUI 실행을 포함하지 않습니다.

## 목적

이 디렉터리는 Astra Shell Phase 1 prototype을 위한 브라우저 실행 가능 정적 mock입니다. WebView 앱 자체가 아니라, 이후 WebView에 넣을 수 있는 화면 구조와 route-like 화면 전환을 검토하기 위한 로컬 정적 HTML/CSS/JavaScript scaffold입니다.

## 실행 방법

외부 패키지 설치 없이 다음 파일을 브라우저에서 직접 엽니다.

```powershell
Start-Process .\prototypes\astra-shell\static-mock\index.html
```

선택적으로 로컬 정적 서버를 사용할 수 있지만, 반드시 `127.0.0.1` 또는 `localhost`에만 바인딩해야 합니다.

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory .\prototypes\astra-shell\static-mock
```

## 파일 구조

```text
prototypes/astra-shell/static-mock/
├── README.md
├── index.html
├── assets/
│   └── README.md
├── scripts/
│   ├── app.js
│   └── mock-data.js
└── styles/
    ├── app.css
    └── tokens.css
```

## Route Mock 구조

정적 mock은 `#` hash 기반 route-like 전환만 사용합니다. 실제 router, WebView bridge, OS session, shell compositor와 연결하지 않습니다.

| Route | 화면 | 역할 |
| --- | --- | --- |
| `#/login` | Login Screen | 실제 인증 없는 demo session 진입 mock |
| `#/desktop` | Desktop | shell surface와 mock window 배치 |
| `#/dock` | Dock | pinned app과 badge 상태 표시 |
| `#/launcher` | Launcher | mock app launch surface |
| `#/control-center` | Control Center | quick setting mock 상태 표시 |
| `#/notifications` | Notification Center | synthetic notification 표시 |
| `#/workspaces` | Workspace View | fake workspace preview 전환 |
| `#/settings` | Settings Mock | 실제 설정 변경 없는 구조 preview |
| `#/security-center` | Security Center Mock | 백신/EDR/복구 구조의 defensive mock 표시 |

## Phase 1-4 UI Polish 범위

- Premium / Future / Calm / Fast / Trustworthy 방향을 강화한 dark glass panel 정리
- active route 표시, keyboard focus 표시, skip link, route keyboard navigation 개선
- Dock, Launcher, Control Center, Notification Center, Security Center mock의 visual hierarchy 개선
- low resource mode mock toggle 추가
- `prefers-reduced-motion` 대응 유지
- mobile/tablet/desktop 반응형 개선
- KO/EN string key 구조 유지

Phase 1-4도 static mock 범위입니다. 실제 OS 기능, 실제 시스템 상태, 실제 보안 상태, 실제 로그인, 실제 설정 변경은 수행하지 않습니다.

## Mock Data 구조

`scripts/mock-data.js`는 `window.ASTRA_SHELL_MOCK` 전역 object만 정의합니다.

- 실제 사용자 파일, 실제 계정, 실제 시스템 상태, 실제 보안 상태를 읽지 않습니다.
- remote fetch, filesystem read, OS command output을 사용하지 않습니다.
- 화면 문구는 KO/EN string key 구조로 분리합니다.
- 화면 데이터는 `currentUser`, `systemStatus`, `securityStatus`, `quickSettings`, `notifications`, `workspaces`, `pinnedApps`, `shieldStatus`, `guardianStatus`, `vaultStatus`, `aiStudioStatus` 같은 mock-only field만 사용합니다.

## 보안 경계

- Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능으로만 표시합니다.
- Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조로만 표시합니다.
- Astra Shield Guardian은 백신 자체 보호와 자동 복구 구조로만 표시합니다.
- AI Studio는 WebUI 외부 공개가 아니라 sandbox/localhost 기본값으로만 표시합니다.
- 모든 위험 작업은 preview-only, disabled-by-design, rollback-first 문구로만 표현합니다.
- 실제 로그인, 권한 상승, OS 제어 기능, 시스템 설정 변경, 보안 정책 변경은 구현하지 않습니다.

## 외부 네트워크 및 Remote Asset 정책

- `index.html`은 로컬 CSS/JS만 참조합니다.
- CDN, analytics, tracker, remote font, remote image를 사용하지 않습니다.
- CSP는 `connect-src 'none'`로 네트워크 연결을 차단합니다.
- `script-src 'self'`와 `style-src 'self'`를 유지합니다.
- `localStorage`, `sessionStorage`, cookie, IndexedDB를 사용하지 않습니다.
- asset은 `assets/` 하위의 로컬 정적 파일만 허용합니다.

## 검증 방법

다음 명령은 외부 패키지 설치 없이 실행할 수 있는 Phase 1-4 검증 기준입니다.

```powershell
node --check .\prototypes\astra-shell\static-mock\scripts\mock-data.js
node --check .\prototypes\astra-shell\static-mock\scripts\app.js
git diff --check
rg -n 'fetch\(|XMLHttpRequest|WebSocket|EventSource|http://|https://|localStorage|sessionStorage|cookie|indexedDB|innerHTML|eval\(|new Function|document\.write' .\prototypes\astra-shell\static-mock
```

Edge headless가 설치된 환경에서는 주요 route 렌더링도 확인할 수 있습니다.

```powershell
$edge='C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$url='file:///C:/Users/scarl/Documents/OS/prototypes/astra-shell/static-mock/index.html#/security-center'
& $edge --headless=new --disable-gpu --no-first-run --disable-background-networking --dump-dom $url
```

## 아직 구현하지 않은 항목

- 실제 WebView 앱
- native bridge
- OS command API
- 실제 로그인 또는 권한 상승
- 실제 사용자 파일 읽기
- 실제 시스템 상태 읽기
- 실제 보안 상태 검사
- 실제 설정 변경
- 백신, Vault, Secure Delete, AI WebUI 실행
- 원격 콘텐츠 로딩
