# Workspace View Wireframe / Mock Spec

> 현재 문서는 Phase 1-1 기준의 Astra Shell 화면별 Wireframe / Mock Spec입니다. 실제 앱 구현이 아니라 구조, 레이아웃, 상태, mock data, 사용자 흐름 문서입니다. 실제 로그인 금지, 권한 상승 금지, OS 제어 기능 금지 원칙을 적용합니다.

## 1. 화면 목적

Workspace View는 workspace switching과 mock window overview를 보여주는 multitasking 화면입니다. Phase 1-1에서는 실제 compositor, Wayland, X11, window manager 기능을 만들지 않습니다.

## 2. 사용자에게 보여줄 정보

- workspaces 목록
- active workspace
- runningApps 기반 mock window preview
- low resource mode에서 motion/blur 축소 가능 안내
- Desktop으로 돌아가는 navigation

## 3. 주요 UI 영역

| 영역 | 레이아웃 | 디자인 방향 |
| --- | --- | --- |
| Workspace strip | 상단 또는 하단 thumbnail row | 빠른 전환, 150~220ms |
| Preview canvas | 선택 workspace의 mock window cards | dark translucent card |
| Window metadata | app label, state, mock badge | 실제 내용 노출 없음 |
| Action rail | Add workspace mock, Back to Desktop | disabled/preview-only 명확화 |
| Safety note | 실제 window management 없음 안내 | trustworthy tone |

## 4. 상태값

- `workspaces[].id`
- `workspaces[].label`
- `workspaces[].active`
- `runningApps[].windowTitle`
- `runningApps[].workspaceId`
- `systemStatus.lowResourceMode`

## 5. mock data 입력

- `workspaces`
- `runningApps`
- `systemStatus`

모든 입력은 fake/mock data입니다. 실제 workspace, 실제 window title, 실제 프로세스, 실제 화면 preview를 읽지 않습니다.

## 6. 사용자 액션

| 액션 | mock 반응 |
| --- | --- |
| workspace thumbnail 클릭 | active workspace mock 변경 |
| Add workspace 클릭 | 임시 mock workspace card 추가 |
| window card 클릭 | focus style만 변경 |
| Back to Desktop 클릭 | Desktop mock으로 이동 |
| keyboard shortcut 후보 | 문서화만 수행 |

## 7. 아직 구현하지 않을 실제 OS 기능

- 실제 compositor 제어
- 실제 Wayland/X11 연동
- 실제 window 이동, focus, close
- 실제 workspace 생성/삭제
- 실제 screenshot/preview capture
- OS command API 또는 native bridge

## 8. 보안 경계

- window preview는 fake card이며 실제 화면 내용을 캡처하지 않습니다.
- 실제 앱 이름이나 문서 제목 대신 mock label만 사용합니다.
- remote content를 불러오지 않습니다.
- WebView mock은 localhost/static/mock data 전용으로만 설계합니다.

## 9. 접근성 고려

- workspace thumbnail에는 text label과 active state를 제공합니다.
- window card 순서는 keyboard navigation이 가능해야 합니다.
- motion이 줄어도 화면 전환 상태를 text로 이해할 수 있어야 합니다.
- preview card는 실제 민감 정보를 표시하지 않아야 합니다.

## 10. 다음 구현 단계 TODO

- workspaceMock schema 세부화
- window card size와 responsive grid 규칙 정의
- keyboard shortcut 후보와 충돌 검토
- low resource mode에서 preview effect fallback 작성

