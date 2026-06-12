# Phase 1-2 String Key Inventory

> 현재 문서는 Phase 1-2 기준의 Astra Shell Static Mock Planning Pack 문서입니다. 실제 i18n 구현, locale loader, JSON 리소스 파일, 앱 코드를 만들지 않습니다.

## 1. 목적

KO/EN 다국어 전환을 전제로 화면 문구 key를 정리합니다. 이 문서는 실제 i18n 구현이 아니라, 이후 문자열을 코드에 하드코딩하지 않기 위한 문서형 inventory입니다.

## 2. Phase 1-2 범위

- route/screen title key 정의
- 주요 action, status, safety notice key 정의
- KO/EN 문구 후보 작성
- 실제 resource file 생성 전 naming 기준 정리

## 3. String Key Inventory

| Key | KO 후보 | EN 후보 | 사용 위치 |
| --- | --- | --- | --- |
| `route.login.title` | AstraOS에 로그인 | Sign in to AstraOS | `/login` |
| `route.desktop.title` | 데스크톱 | Desktop | `/desktop` |
| `route.launcher.title` | 런처 | Launcher | `/launcher` |
| `route.controlCenter.title` | 제어 센터 | Control Center | `/control-center` |
| `route.notifications.title` | 알림 센터 | Notification Center | `/notifications` |
| `route.workspaces.title` | 작업 공간 | Workspaces | `/workspaces` |
| `route.settings.title` | 설정 mock | Settings mock | `/settings` |
| `route.securityCenter.title` | 보안 센터 mock | Security Center mock | `/security-center` |
| `action.mockLogin` | 데모 세션 보기 | View demo session | Login Screen |
| `action.openLauncher` | 런처 열기 | Open launcher | Dock/Desktop |
| `action.openControlCenter` | 제어 센터 열기 | Open Control Center | Desktop |
| `action.openNotifications` | 알림 열기 | Open notifications | Desktop |
| `action.switchWorkspace` | 작업 공간 전환 mock | Switch workspace mock | Workspace View |
| `action.openSettings` | 설정 mock 열기 | Open Settings mock | Launcher/Control Center |
| `action.openSecurityCenter` | 보안 센터 mock 열기 | Open Security Center mock | Dock/Settings |
| `action.toggleQuickSetting` | 빠른 설정 mock 전환 | Toggle quick setting mock | Control Center |
| `action.dismissNotification` | 알림 mock 숨기기 | Dismiss notification mock | Notification Center |
| `status.localOnly` | 로컬 전용 | Local only | Network/AI Studio |
| `status.mockOnly` | mock 상태 | Mock state | 공통 |
| `status.previewOnly` | 미리보기 전용 | Preview only | 위험 작업 |
| `status.disabledByDesign` | 설계상 비활성 | Disabled by design | 금지 동작 |
| `security.noRealLogin` | 실제 로그인은 수행하지 않습니다. | No real login is performed. | Login Screen |
| `security.noPrivilege` | 권한 상승은 수행하지 않습니다. | No privilege escalation is performed. | Settings/Security |
| `security.noOsCommand` | OS 명령은 실행하지 않습니다. | No OS command is executed. | 공통 |
| `security.noNativeBridge` | native bridge를 사용하지 않습니다. | No native bridge is used. | 공통 |
| `security.mockDataOnly` | 모든 데이터는 fake/mock data입니다. | All data is fake/mock data. | 공통 |
| `security.securityCenterMockOnly` | 실제 백신/EDR 결과가 아닙니다. | This is not a real antivirus/EDR result. | Security Center |
| `settings.noRealChange` | 실제 설정은 변경되지 않습니다. | No real settings are changed. | Settings Mock |
| `asset.localOnly` | 로컬 정적 asset만 사용합니다. | Only local static assets are used. | Asset policy |
| `data.noUserFiles` | 실제 사용자 파일을 읽지 않습니다. | No real user files are read. | Mock data policy |

## 4. 아직 구현하지 않을 항목

- 실제 i18n library 도입
- locale JSON/YAML 파일 생성
- runtime language switcher
- browser locale detection
- translation fallback 구현
- TypeScript enum 또는 string key type 생성

## 5. 보안 경계

- 보안 문구는 실제 기능 수행을 암시하지 않아야 합니다.
- "mock", "preview-only", "documentation-only" 문구를 위험 화면에 명확히 표시합니다.
- Security Center mock은 실제 백신/EDR 결과가 아니라 문서화용 상태만 표현합니다.
- Settings mock은 실제 설정 변경이 아니라 화면 구조만 표현합니다.

## 6. 다음 구현 단계 TODO

- key naming convention 확정
- KO/EN 문구 길이와 버튼 폭 검토
- 보안 관련 문구의 과장 표현 검사
- 이후 resource file 생성 전 중복 key 검사 기준 작성
- language switch UI mock spec 작성

