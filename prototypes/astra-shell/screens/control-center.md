# Control Center Wireframe / Mock Spec

> 현재 문서는 Phase 1-1 기준의 Astra Shell 화면별 Wireframe / Mock Spec입니다. 실제 앱 구현이 아니라 구조, 레이아웃, 상태, mock data, 사용자 흐름 문서입니다. 실제 로그인 금지, 권한 상승 금지, OS 제어 기능 금지 원칙을 적용합니다.

## 1. 화면 목적

Control Center는 빠른 설정과 시스템 상태를 요약하는 panel입니다. Phase 1-1에서는 실제 설정 변경 없이 quickSettings mock 상태와 Balanced Premium Performance 방향을 문서화합니다.

## 2. 사용자에게 보여줄 정보

- networkStatus와 batteryStatus 요약
- quickSettings 토글 상태
- 볼륨/밝기 mock slider
- Balanced Premium Performance mode
- securityStatus 요약과 Security Center 진입점

## 3. 주요 UI 영역

| 영역 | 레이아웃 | 디자인 방향 |
| --- | --- | --- |
| Header | "Control Center", status timestamp | calm하고 신뢰감 있는 panel |
| Quick toggle grid | 2열 또는 3열 compact card | dark translucent, blur/shadow 정돈 |
| Slider section | brightness/volume mock | 즉시 반응하되 실제 변경 없음 |
| Performance card | Balanced Premium Performance | fast/trustworthy tone |
| Security card | Shield/Guardian mock summary | 방어적 상태만 표시 |

## 4. 상태값

- `quickSettings.localOnly`
- `quickSettings.focusMode`
- `quickSettings.lowResourceMode`
- `quickSettings.performanceMode`
- `networkStatus.mode`
- `batteryStatus.level`
- `securityStatus.summary`

## 5. mock data 입력

- `quickSettings`
- `networkStatus`
- `batteryStatus`
- `securityStatus`
- `systemStatus`

모든 입력은 fake/mock data입니다. 실제 네트워크, 실제 장치, 실제 배터리, 실제 보안 상태를 읽지 않습니다.

## 6. 사용자 액션

| 액션 | mock 반응 |
| --- | --- |
| quick toggle 클릭 | mock boolean만 변경 |
| slider 이동 | 화면 내 숫자만 변경 |
| Performance card 클릭 | mode 설명 panel 표시 |
| Security card 클릭 | Security Center Mock으로 이동 |
| Settings link 클릭 | Settings Mock으로 이동 |

## 7. 아직 구현하지 않을 실제 OS 기능

- 실제 네트워크 설정 변경
- 실제 사운드/밝기 설정 변경
- 실제 power profile 변경
- 실제 보안 정책 변경
- 권한 상승
- 시스템 설정 저장
- OS command API 또는 native bridge

## 8. 보안 경계

- 모든 toggle과 slider는 mock state만 변경합니다.
- Security card는 실제 검사 결과가 아닙니다.
- remote content를 불러오지 않습니다.
- WebView mock은 localhost/static/mock data 전용으로만 설계합니다.

## 9. 접근성 고려

- toggle은 상태 text를 함께 제공합니다.
- slider는 keyboard 조작과 숫자 label을 고려합니다.
- low resource mode에서는 blur/shadow/transparency를 줄여도 contrast를 유지합니다.
- focus ring과 disabled state가 명확해야 합니다.

## 10. 다음 구현 단계 TODO

- quickSettings mock transition 규칙 작성
- performance mode microcopy 확정
- slider interaction delay 기준 정의
- low resource mode visual fallback token과 연결

