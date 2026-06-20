# Astra Shell Static Mock - Phase 1-5d Astra Fusion Direction

> 현재 문서는 Phase 1-5d 기준이며 실제 구현이 아니라 정적 UI mock scaffold입니다. 실제 OS 제어, native bridge, OS command API, 실제 로그인, 권한 상승, 보안 정책 변경, 백신 실행, Vault 실행, Secure Delete 실행, AI WebUI 실행을 포함하지 않습니다.

## 목적

이 디렉터리는 Astra Shell의 새 시각 방향을 브라우저에서 확인하기 위한 HTML/CSS/JavaScript 정적 mock입니다. Phase 1-5d는 macOS의 glass/spacing, One UI의 radius/card/tactile component, Windows 11의 Mica/Snap/Fluent depth를 AstraOS 방식으로 재해석합니다.

## 실행 방법

외부 패키지 설치 없이 다음 파일을 브라우저에서 직접 엽니다.

```powershell
Start-Process .\prototypes\astra-shell\static-mock\index.html
```

선택적으로 로컬 정적 서버를 사용할 수 있지만, 반드시 `127.0.0.1` 또는 `localhost`에만 바인딩해야 합니다.

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory .\prototypes\astra-shell\static-mock
```

## Route Mock 구조

정적 mock은 `#` hash 기반 route-like 전환만 사용합니다. 실제 router, WebView bridge, OS session, shell compositor와 연결하지 않습니다.

| Route | 화면 | 역할 |
| --- | --- | --- |
| `#/desktop` | Desktop | 비어 있고 차분한 wallpaper surface와 하단 Shell Bar |
| `#/launcher` | Launcher | 하단 Shell Bar에서 열리는 시작 메뉴형 overlay |
| `#/control-center` | Quick Panel | 오른쪽 하단 quick settings panel |
| `#/notifications` | Notification Center | 오른쪽 panel의 정돈된 알림 목록 |
| `#/settings` | Settings Window | 독립 앱 창처럼 보이는 설정 mock |
| `#/security-center` | Security Center Window | 보안 관제센터가 아닌 조용한 방어 상태 앱 창 |
| `#/app-center` | App Center Window | Linux/Windows/macOS 앱 호환 상태를 자연스럽게 표시 |
| `#/workspaces` | Workspace / Snap View | 전체 화면 작업 보기와 Snap preview mock |
| `#/login` | Session Preview | 실제 인증 없는 세션 진입 mock |

## Phase 1-5d Astra Fusion 범위

- 기존 route rail, 상단 route switcher, dashboard 카드 구조는 유지하지 않습니다.
- Desktop은 macOS/One UI reference에서 온 부드러운 wallpaper surface와 하단 Shell Bar 중심입니다.
- Shell Bar는 텍스트 라벨을 상시 노출하지 않고 icon 중심으로 구성합니다.
- Launcher는 Windows 11의 search-first 시작 흐름, One UI식 app grid, macOS식 glass depth를 결합합니다.
- Settings, Security Center, App Center는 데스크톱 위에 떠 있는 Mica/glass app window로 표현합니다.
- Quick Panel은 One UI quick panel 감성과 Windows Settings card 구조를 데스크톱용으로 재해석합니다.
- Notification Center는 오른쪽 panel이며 알림 수와 표현을 절제합니다.
- Security Center는 보안 관제 dashboard가 아니라 조용한 설정 앱에 가까운 구조입니다.
- App Center는 compatibility 관리 콘솔이 아니라 일반 사용자가 이해하기 쉬운 앱 목록 구조입니다.
- Workspace View는 Windows 11 Snap visual feedback, macOS식 부드러운 overview, One UI식 card hierarchy를 static mock으로만 보여줍니다.

## Reference Lock

- 디자인 지시서와 reference image 기준은 `docs/design/astra-fusion-reference-lock.md`에 고정합니다.
- ADR source of truth는 `docs/decisions/0005-astra-design-language.md`입니다.
- Figma 파일 키가 제공되면 reference board에 같은 구성을 고정해야 합니다.

## 보안 경계

- Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능으로만 표시합니다.
- Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조로만 표시합니다.
- AI Studio는 WebUI 외부 공개가 아니라 sandbox/localhost 기본값으로만 표시합니다.
- 실제 로그인, 권한 상승, OS 제어 기능, 시스템 설정 변경, 보안 정책 변경은 구현하지 않습니다.
- native bridge, OS command API, 실제 시스템 상태 읽기, 실제 보안 상태 검사를 구현하지 않습니다.
- Workspace/Snap View는 실제 창 드래그, compositor, window manager, snap 동작을 구현하지 않습니다.

## 외부 네트워크 및 Remote Asset 정책

- `index.html`은 로컬 CSS/JS만 참조합니다.
- CDN, analytics, tracker, remote font, remote image를 사용하지 않습니다.
- CSP는 `connect-src 'none'`로 네트워크 연결을 차단합니다.
- `script-src 'self'`와 `style-src 'self'`를 유지합니다.
- `localStorage`, `sessionStorage`, cookie, IndexedDB를 사용하지 않습니다.

## 검증 방법

- `scripts/mock-data.js`와 `scripts/app.js`는 Node syntax check로 확인합니다.
- `git diff --check`로 whitespace 오류를 확인합니다.
- code file 기준으로 네트워크, remote asset, browser storage, dynamic script execution, unsafe HTML injection API 사용 여부를 검색합니다.
