# Settings Mock Wireframe / Mock Spec

> 현재 문서는 Phase 1-1 기준의 Astra Shell 화면별 Wireframe / Mock Spec입니다. 실제 앱 구현이 아니라 구조, 레이아웃, 상태, mock data, 사용자 흐름 문서입니다. 실제 로그인 금지, 권한 상승 금지, OS 제어 기능 금지 원칙을 적용합니다.

## 1. 화면 목적

Settings Mock은 AstraOS 설정 경험의 정보 구조를 검증합니다. Phase 1-1에서는 실제 설정 변경, 저장, 권한 상승, 보안 정책 변경 없이 화면 구조와 상태 문구만 정의합니다.

## 2. 사용자에게 보여줄 정보

- 설정 카테고리 목록
- 선택된 설정 detail
- quickSettings와 systemStatus 기반 mock 상태
- 보안 또는 권한 필요 항목의 disabled/preview-only 표시
- 변경사항이 저장되지 않는다는 안내

## 3. 주요 UI 영역

| 영역 | 레이아웃 | 디자인 방향 |
| --- | --- | --- |
| Sidebar | Account, Display, Network, Personalization, Accessibility, Security, Updates | 정돈된 navigation |
| Detail header | 선택 category title, status badge | calm, trustworthy |
| Setting rows | label, description, mock control | dark translucent row |
| Risk notice | dry-run/preview/rollback 안내 | 명확한 보안 문구 |
| Footer | "No real settings saved" 상태 | 실제 저장 없음 강조 |

## 4. 상태값

- `settingsSelectedCategory`
- `systemStatus.lowResourceMode`
- `networkStatus.mode`
- `quickSettings.performanceMode`
- `securityStatus.summary`
- `aiStudioStatus.mode`

## 5. mock data 입력

- `currentUser`
- `systemStatus`
- `networkStatus`
- `quickSettings`
- `securityStatus`
- `aiStudioStatus`

모든 입력은 fake/mock data입니다. 실제 계정, 실제 설정, 실제 네트워크, 실제 보안 정책을 읽지 않습니다.

## 6. 사용자 액션

| 액션 | mock 반응 |
| --- | --- |
| sidebar category 선택 | detail panel mock 변경 |
| toggle 클릭 | preview-only state 표시 |
| Save 클릭 후보 | disabled 또는 documentation-only |
| 권한 필요 row 클릭 | 권한 상승 금지 안내 modal mock |
| Security Center link 클릭 | Security Center Mock으로 이동 |

## 7. 아직 구현하지 않을 실제 OS 기능

- 실제 설정 변경
- 실제 설정 저장
- 권한 상승
- 보안 정책 변경
- 네트워크/디스플레이/계정 변경
- 업데이트 실행
- OS command API 또는 native bridge

## 8. 보안 경계

- Settings Mock은 실제 설정 앱이 아닙니다.
- 모든 control은 mock state만 변경합니다.
- 권한 필요 항목은 실제 privilege prompt를 열지 않습니다.
- remote content를 불러오지 않습니다.
- 위험 작업은 dry-run, preview, rollback 안내만 표시합니다.

## 9. 접근성 고려

- Sidebar와 detail 영역의 heading hierarchy를 명확히 합니다.
- disabled control은 이유 text를 제공합니다.
- toggle state는 색상과 text label을 함께 사용합니다.
- keyboard focus가 sidebar에서 detail로 자연스럽게 이동해야 합니다.

## 10. 다음 구현 단계 TODO

- settingsMock category schema 정의
- disabled/preview-only row pattern 문서화
- KO/EN 설정 문구 key 후보 작성
- 권한 필요 안내 modal의 copy와 focus trap 기준 정의

