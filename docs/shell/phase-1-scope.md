# Astra Shell Phase 1-0 Scope

> 현재 문서는 Phase 1-0 기준이며 실제 구현이 아니라 Astra Shell 프로토타입 착수 설계/범위/거버넌스 문서입니다. 이 문서는 실제 로그인, 권한 상승, 시스템 설정 변경, 보안 정책 변경, 드라이버 제어, 백신 연동, OS 제어 기능을 구현하지 않습니다.

## Phase 1-0 정의

Phase 1-0은 Phase 1 전체 구현이 아니라 Astra Shell 프로토타입 착수 설계입니다. 목표는 실제 OS shell을 만드는 것이 아니라, AstraOS의 데스크톱 경험을 구성하는 화면과 책임을 분리하고 초기 UI mock을 만들 수 있는 구조를 정리하는 것입니다.

## 포함 범위

| 항목 | Phase 1-0 포함 |
| --- | --- |
| Shell 역할 정의 | 포함 |
| 초기 화면 목록 | 포함 |
| 화면별 책임 분리 | 포함 |
| UI 기술 후보 비교 | 포함 |
| Phase 1 prototype 기술 추천 | 포함 |
| `prototypes/astra-shell/` 구조 설계 | 포함 |
| 최소 scaffold | 문서와 mock 폴더만 포함 |

## 제외 범위

| 항목 | Phase 1-0 제외 사유 |
| --- | --- |
| 실제 로그인 | 인증/세션/권한 경계가 필요하므로 이후 별도 설계 |
| 권한 상승 | 보안 정책과 사용자 확인 흐름이 필요하므로 구현 금지 |
| 시스템 설정 변경 | 실제 OS 제어 기능이므로 mock만 허용 |
| 보안 정책 변경 | 실제 보안 상태 변경 금지 |
| 드라이버 제어 | Phase 1-0 범위 밖 |
| 백신 연동 | Astra Shield 실제 연동 금지 |
| Secure Delete 실행 | 사용자 소유 데이터 보호 정책만 표시 |
| AI WebUI 실행 | sandbox/localhost 기본값 안내만 표시 |
| 커널/ISO/Wayland compositor 구현 | Phase 1-0 범위 밖 |

## 산출물

- `docs/shell/overview.md`
- `docs/shell/phase-1-scope.md`
- `docs/shell/ui-screens.md`
- `docs/shell/technology-decision.md`
- `docs/shell/security-boundaries.md`
- `docs/decisions/0002-astra-shell-prototype-scope.md`
- `prototypes/astra-shell/README.md`

## Phase 1-1: 화면별 Wireframe / Mock Spec

Phase 1-1은 실제 앱 구현이 아니라 화면별 구조, 레이아웃, 상태, mock data, 사용자 흐름을 Markdown으로 문서화하는 단계입니다.

산출물:

- `prototypes/astra-shell/screens/login-screen.md`
- `prototypes/astra-shell/screens/desktop.md`
- `prototypes/astra-shell/screens/dock.md`
- `prototypes/astra-shell/screens/launcher.md`
- `prototypes/astra-shell/screens/control-center.md`
- `prototypes/astra-shell/screens/notification-center.md`
- `prototypes/astra-shell/screens/workspace-view.md`
- `prototypes/astra-shell/screens/settings-mock.md`
- `prototypes/astra-shell/screens/security-center-mock.md`
- `prototypes/astra-shell/design-tokens/tokens.md`
- `prototypes/astra-shell/mock-data/schema.md`
- `prototypes/astra-shell/mock-data/examples.md`
- `prototypes/astra-shell/notes/phase-1-1-summary.md`

## Phase 1-2: Static Mock Planning Pack

Phase 1-2는 아직 실제 UI 앱 코드를 만들기 전, 정적 WebView mock scaffold를 안전하게 만들 수 있도록 route map, interaction state table, string key inventory, static asset policy, mock data loading policy를 Markdown으로 문서화하는 단계입니다.

산출물:

- `prototypes/astra-shell/notes/static-route-map.md`
- `prototypes/astra-shell/notes/interaction-state-table.md`
- `prototypes/astra-shell/notes/string-key-inventory.md`
- `prototypes/astra-shell/notes/static-asset-policy.md`
- `prototypes/astra-shell/notes/mock-data-loading-policy.md`
- `prototypes/astra-shell/notes/phase-1-2-planning-summary.md`

Phase 1-2에서는 package.json, HTML, CSS, TypeScript, JavaScript, WebView 실행 코드, native bridge, OS command API, 실제 로그인, 권한 상승, 시스템 설정 변경, 보안 정책 변경, 드라이버 제어, 백신 연동, Secure Delete 실행, Vault 암호화 엔진, AI WebUI 실행을 구현하지 않습니다.

## 완료 기준

- Astra Shell의 역할과 범위가 명확히 정의되어야 합니다.
- 초기 prototype 화면이 나열되고 책임이 분리되어야 합니다.
- UI 기술 후보가 비교되어야 합니다.
- Phase 1 prototype 기술 추천이 문서화되어야 합니다.
- 실제 OS 제어 기능이 구현되지 않아야 합니다.
- 보안 경계가 Phase 0 문서팩과 충돌하지 않아야 합니다.

