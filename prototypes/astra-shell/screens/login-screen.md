# Login Screen Wireframe / Mock Spec

> 현재 문서는 Phase 1-1 기준의 Astra Shell 화면별 Wireframe / Mock Spec입니다. 실제 앱 구현이 아니라 구조, 레이아웃, 상태, mock data, 사용자 흐름 문서입니다. 실제 로그인 금지, 권한 상승 금지, OS 제어 기능 금지 원칙을 적용합니다.

## 1. 화면 목적

Login Screen은 AstraOS에 진입하기 전의 첫 화면입니다. Phase 1-1에서는 실제 인증을 수행하지 않고, premium, future, calm, fast, trustworthy 방향의 첫 인상과 안전한 mock sign-in 흐름을 정의합니다.

## 2. 사용자에게 보여줄 정보

- AstraOS 브랜드와 짧은 보안 메시지
- 선택된 mock 사용자
- sessionState 기반의 mock 인증 상태
- networkStatus, batteryStatus, accessibility 상태 요약
- 실제 인증이 아닌 demo session 안내

## 3. 주요 UI 영역

| 영역 | 레이아웃 | 디자인 방향 |
| --- | --- | --- |
| Brand panel | 좌측 또는 중앙 상단의 큰 brand 영역 | 어두운 반투명 패널, 정돈된 blur/shadow |
| User card | avatar, name, role, session hint | calm한 card, 작은 status badge |
| Credential area | password field mock, demo button, recovery link | 실제 인증처럼 보이되 "mock" 상태 명확히 표시 |
| System strip | network, battery, accessibility, power menu mock | 빠른 상태 확인, 과하지 않은 motion |
| Safety notice | Phase 1-1 mock 안내 | trustworthy한 설명 문구 |

## 4. 상태값

- `sessionState.kind`: `signedOut`, `typing`, `mockChecking`, `mockDenied`, `demoReady`
- `sessionState.locked`: demo lock 여부
- `networkStatus.mode`: `localOnly`, `offlineMock`
- `batteryStatus.level`: 0-100 mock percentage
- `systemStatus.powerMenuOpen`: mock menu open 여부
- `currentUser.displayName`: 표시용 fake user name

## 5. mock data 입력

- `currentUser`
- `sessionState`
- `systemStatus`
- `networkStatus`
- `batteryStatus`

모든 입력은 fake/mock data입니다. 실제 사용자 데이터, 실제 계정 목록, 실제 인증 상태, 실제 시스템 상태를 읽지 않습니다.

## 6. 사용자 액션

| 액션 | mock 반응 |
| --- | --- |
| 사용자 card 선택 | 선택 강조만 변경 |
| password field 입력 | 로컬 UI 상태만 변경, 값 저장 금지 |
| Demo session 클릭 | `sessionState.kind`를 `demoReady`로 변경하고 Desktop mock으로 이동 |
| Recovery 클릭 | documentation-only 안내 panel 표시 |
| Power menu 클릭 | shutdown/reboot 없는 mock menu 표시 |

## 7. 아직 구현하지 않을 실제 OS 기능

- 실제 로그인 기능
- PAM, systemd-logind, display manager 연동
- 권한 상승
- 전원 제어
- 계정 복구
- 세션 생성
- OS command API
- native bridge

## 8. 보안 경계

- 입력값은 저장, 전송, 검증하지 않습니다.
- remote content를 불러오지 않습니다.
- WebView mock을 사용하더라도 localhost/static/mock data 전용으로만 설계합니다.
- 실제 로그인 실패/성공 여부를 표현하지 않습니다.
- 모든 인증 관련 문구는 demo/mock임을 명확히 표시합니다.

## 9. 접근성 고려

- password field와 demo button은 keyboard focus 순서가 명확해야 합니다.
- status badge는 색상만으로 의미를 전달하지 않고 text label을 함께 사용합니다.
- reduce motion 설정에서는 150~220ms 전환을 더 짧거나 instant로 줄일 수 있어야 합니다.
- screen reader label은 "mock sign-in"처럼 실제 인증이 아님을 포함합니다.

## 10. 다음 구현 단계 TODO

- KO/EN 문자열 key 정의
- Login Screen visual hierarchy 시안 작성
- demo-only route contract 정의
- password 입력값 미저장 테스트 기준 작성
- low resource mode에서 blur/shadow/transparency 감소 규칙 연결

