# Notification Center Wireframe / Mock Spec

> 현재 문서는 Phase 1-1 기준의 Astra Shell 화면별 Wireframe / Mock Spec입니다. 실제 앱 구현이 아니라 구조, 레이아웃, 상태, mock data, 사용자 흐름 문서입니다. 실제 로그인 금지, 권한 상승 금지, OS 제어 기능 금지 원칙을 적용합니다.

## 1. 화면 목적

Notification Center는 시스템, 앱, 보안, AI Studio 관련 알림을 grouped timeline으로 보여주는 panel입니다. Phase 1-1에서는 실제 notification daemon이나 실제 보안 이벤트를 읽지 않습니다.

## 2. 사용자에게 보여줄 정보

- notifications 목록
- severity와 source label
- unread count
- privacyEvents 요약
- notification settings mock 진입점

## 3. 주요 UI 영역

| 영역 | 레이아웃 | 디자인 방향 |
| --- | --- | --- |
| Header | unread count, quiet mode mock | calm하고 빠른 상태 파악 |
| Group tabs | Security, System, Apps, AI Studio | 명확한 grouping |
| Notification list | card list, timestamp, severity | dark translucent panel, 정돈된 shadow |
| Detail preview | 선택된 알림 상세 | 실제 로그가 아닌 synthetic text |
| Footer | Settings Mock link | preview-only |

## 4. 상태값

- `notifications[].id`
- `notifications[].source`
- `notifications[].severity`
- `notifications[].read`
- `notifications[].timestampLabel`
- `privacyEvents[]`
- `quickSettings.quietMode`

## 5. mock data 입력

- `notifications`
- `privacyEvents`
- `quickSettings`
- `securityStatus`
- `aiStudioStatus`

모든 입력은 fake/mock data입니다. 실제 알림, 실제 보안 로그, 실제 개인정보 이벤트, 실제 파일명을 읽지 않습니다.

## 6. 사용자 액션

| 액션 | mock 반응 |
| --- | --- |
| 알림 card 클릭 | detail preview 표시 |
| Dismiss 클릭 | mock list에서만 숨김 |
| Mark as read 클릭 | read 상태만 변경 |
| group tab 클릭 | 표시 group 변경 |
| Settings 클릭 | Settings Mock으로 이동 |

## 7. 아직 구현하지 않을 실제 OS 기능

- 실제 notification daemon 연동
- 실제 보안 이벤트 조회
- 실제 로그 삭제
- 실제 업데이트 실행
- 실제 앱 실행
- 보안 정책 변경
- OS command API 또는 native bridge

## 8. 보안 경계

- 알림은 synthetic mock data만 사용합니다.
- Security notification은 실제 Astra Shield/EDR 결과가 아닙니다.
- privacyEvents는 fake event로만 구성합니다.
- remote content를 불러오지 않습니다.
- 알림 dismiss는 실제 감사 로그 삭제가 아닙니다.

## 9. 접근성 고려

- 알림 card는 heading, severity, timestamp를 text로 제공합니다.
- 읽음/안읽음은 색상과 text label을 함께 사용합니다.
- keyboard로 group tab과 card 이동이 가능해야 합니다.
- motion은 150~220ms이며 reduce motion을 고려합니다.

## 10. 다음 구현 단계 TODO

- notification severity label KO/EN key 정의
- privacyEvents 표시 한계와 redaction 규칙 작성
- notification grouping priority 규칙 확정
- dismiss가 실제 로그 삭제로 보이지 않도록 microcopy 보강

