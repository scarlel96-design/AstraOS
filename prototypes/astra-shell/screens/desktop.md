# Desktop Wireframe / Mock Spec

> 현재 문서는 Phase 1-1 기준의 Astra Shell 화면별 Wireframe / Mock Spec입니다. 실제 앱 구현이 아니라 구조, 레이아웃, 상태, mock data, 사용자 흐름 문서입니다. 실제 로그인 금지, 권한 상승 금지, OS 제어 기능 금지 원칙을 적용합니다.

## 1. 화면 목적

Desktop은 Astra Shell의 기본 작업 공간입니다. Phase 1-1에서는 실제 window manager가 아니라 Dock, Launcher, Control Center, Notification Center, Workspace View가 붙는 기본 surface를 문서화합니다.

## 2. 사용자에게 보여줄 정보

- 현재 workspace 이름
- runningApps 기반 mock window card
- pinnedApps 기반 Dock anchor
- systemStatus, securityStatus, batteryStatus 요약
- 최근 활동 또는 recentFiles의 fake preview

## 3. 주요 UI 영역

| 영역 | 레이아웃 | 디자인 방향 |
| --- | --- | --- |
| Wallpaper layer | full-screen background | premium/future 느낌, 과도한 gradient 의존 금지 |
| Top status bar | 시간, local-only, Shield mock, battery | calm하고 빠른 상태 확인 |
| Desktop canvas | mock window card와 empty area | 어두운 반투명 card, 정돈된 shadow |
| Dock zone | 하단 중심 또는 좌측 compact | 빠른 앱 전환, 150~220ms hover |
| Overlay anchors | Launcher, Control Center, Notification Center | blur는 저사양 모드에서 감소 가능 |

## 4. 상태값

- `systemStatus.timeLabel`
- `systemStatus.lowResourceMode`
- `securityStatus.summary`
- `runningApps[].windowState`
- `pinnedApps[]`
- `workspaces.activeWorkspaceId`
- `recentFiles[]`

## 5. mock data 입력

- `systemStatus`
- `securityStatus`
- `batteryStatus`
- `runningApps`
- `pinnedApps`
- `workspaces`
- `recentFiles`

모든 입력은 fake/mock data입니다. 실제 파일 목록, 실제 실행 중인 앱, 실제 창 정보, 실제 시스템 상태를 읽지 않습니다.

## 6. 사용자 액션

| 액션 | mock 반응 |
| --- | --- |
| Dock icon 클릭 | mock active app 변경 |
| window card 클릭 | focus styling만 변경 |
| wallpaper 우클릭 | documentation-only context menu 표시 |
| status bar 클릭 | Control Center mock 표시 |
| notification badge 클릭 | Notification Center mock 표시 |

## 7. 아직 구현하지 않을 실제 OS 기능

- 실제 window manager 또는 compositor 제어
- 실제 앱 실행
- 실제 파일 열기
- 실제 recent file 조회
- 실제 workspace 생성/삭제
- 시스템 설정 변경
- OS command API 또는 native bridge

## 8. 보안 경계

- Desktop은 실제 OS surface가 아니라 UI mock입니다.
- recentFiles는 반드시 fake path 또는 label만 사용합니다.
- Security status는 실제 검사가 아닌 문서화용 상태입니다.
- remote content를 불러오지 않고 local/static/mock data만 사용합니다.

## 9. 접근성 고려

- Dock, overlay, window card는 keyboard navigation 순서를 가져야 합니다.
- window card에는 앱 이름, 상태, mock 여부를 text로 제공합니다.
- blur/transparency가 낮아져도 정보 대비가 유지되어야 합니다.
- animation은 150~220ms 범위로 제한하고 reduce motion을 지원합니다.

## 10. 다음 구현 단계 TODO

- Desktop grid와 overlay z-index 규칙 정의
- runningApps mock state transition 표 작성
- low resource mode visual fallback 정의
- Dock/Launcher/Workspace 간 keyboard shortcut 후보 문서화

