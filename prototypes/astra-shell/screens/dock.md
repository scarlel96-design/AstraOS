# Dock Wireframe / Mock Spec

> 현재 문서는 Phase 1-1 기준의 Astra Shell 화면별 Wireframe / Mock Spec입니다. 실제 앱 구현이 아니라 구조, 레이아웃, 상태, mock data, 사용자 흐름 문서입니다. 실제 로그인 금지, 권한 상승 금지, OS 제어 기능 금지 원칙을 적용합니다.

## 1. 화면 목적

Dock은 주요 앱 진입점과 실행 상태를 한눈에 보여주는 Astra Shell의 빠른 조작 영역입니다. Phase 1-1에서는 실제 앱 실행 없이 pinnedApps와 runningApps의 mock 상태만 표현합니다.

## 2. 사용자에게 보여줄 정보

- pinnedApps 목록
- runningApps 상태 표시
- active app indicator
- Security Center mock badge
- Launcher 진입 버튼

## 3. 주요 UI 영역

| 영역 | 레이아웃 | 디자인 방향 |
| --- | --- | --- |
| Launcher button | Dock 시작 또는 중앙 첫 항목 | 명확한 icon, tooltip 필수 |
| App group | pinned app icons | dark translucent rail, 정돈된 shadow |
| Active indicators | icon 아래 작은 bar 또는 dot | 과하지 않은 150~220ms motion |
| Badge layer | notification/security count mock | text label 보조 |
| Utility group | Settings/Security quick entry | trustworthy한 상태 표현 |

## 4. 상태값

- `pinnedApps[].id`
- `pinnedApps[].label`
- `runningApps[].appId`
- `runningApps[].state`
- `notifications.unreadCount`
- `securityStatus.badgeLevel`
- `systemStatus.lowResourceMode`

## 5. mock data 입력

- `pinnedApps`
- `runningApps`
- `notifications`
- `securityStatus`
- `systemStatus`

모든 입력은 fake/mock data입니다. 실제 설치 앱, 실제 프로세스, 실제 알림, 실제 보안 상태를 읽지 않습니다.

## 6. 사용자 액션

| 액션 | mock 반응 |
| --- | --- |
| app icon hover | tooltip 표시 |
| app icon 클릭 | mock active state 변경 |
| Launcher 버튼 클릭 | Launcher mock overlay 표시 |
| Security badge 클릭 | Security Center Mock으로 이동 |
| Dock 빈 영역 클릭 | 아무 실제 동작 없음 |

## 7. 아직 구현하지 않을 실제 OS 기능

- 실제 앱 실행
- 실제 프로세스 관리
- 앱 설치/삭제
- 실제 파일 또는 URL 열기
- 백신 연동
- 권한 상승
- OS command API 또는 native bridge

## 8. 보안 경계

- Dock은 mock navigation만 수행합니다.
- Terminal 아이콘이 있더라도 shell을 실행하지 않습니다.
- badge count는 실제 보안 이벤트가 아닙니다.
- remote content를 불러오지 않고 local/static/mock data만 사용합니다.

## 9. 접근성 고려

- icon-only button은 tooltip과 aria label 후보를 가져야 합니다.
- badge는 색상뿐 아니라 숫자/label로 의미를 전달합니다.
- pointer hover 없이 keyboard focus로 동일 정보를 확인할 수 있어야 합니다.
- low resource mode에서는 blur/shadow가 줄어도 focus ring은 유지합니다.

## 10. 다음 구현 단계 TODO

- pinnedApps mock schema와 icon naming 규칙 확정
- Dock 위치별 responsive 규칙 작성
- keyboard navigation 순서 정의
- disabled/preview-only app action visual state 정의

