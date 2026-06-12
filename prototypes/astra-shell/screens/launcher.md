# Launcher Wireframe / Mock Spec

> 현재 문서는 Phase 1-1 기준의 Astra Shell 화면별 Wireframe / Mock Spec입니다. 실제 앱 구현이 아니라 구조, 레이아웃, 상태, mock data, 사용자 흐름 문서입니다. 실제 로그인 금지, 권한 상승 금지, OS 제어 기능 금지 원칙을 적용합니다.

## 1. 화면 목적

Launcher는 앱과 mock 작업을 검색하고 분류하는 overlay입니다. Phase 1-1에서는 실제 앱 인덱싱, 명령 실행, AI WebUI 실행 없이 정적 mock data 검색 흐름을 정의합니다.

## 2. 사용자에게 보여줄 정보

- 검색 입력 상태
- 앱 카테고리
- pinned/recent 앱 card
- AI Studio sandbox/localhost 기본값 안내
- documentation-only suggested action

## 3. 주요 UI 영역

| 영역 | 레이아웃 | 디자인 방향 |
| --- | --- | --- |
| Search field | 상단 full-width 입력 | calm, fast, keyboard-first |
| Category rail | 좌측 또는 상단 segmented list | 명확한 선택 상태 |
| Result grid | app card 2-4열 | 어두운 반투명 card와 정돈된 shadow |
| Suggested actions | 하단 compact action row | preview-only label 필수 |
| Safety footer | 실제 명령 미실행 안내 | trustworthy한 문구 |

## 4. 상태값

- `launcherQuery`
- `selectedCategory`
- `pinnedApps[]`
- `runningApps[]`
- `aiStudioStatus.mode`
- `systemStatus.lowResourceMode`

## 5. mock data 입력

- `pinnedApps`
- `runningApps`
- `aiStudioStatus`
- `systemStatus`

모든 입력은 fake/mock data입니다. 실제 앱 목록, 설치 패키지, 명령, 사용자 파일 이름을 읽지 않습니다.

## 6. 사용자 액션

| 액션 | mock 반응 |
| --- | --- |
| 검색어 입력 | 정적 mock list 필터링 |
| 카테고리 선택 | result grid mock 변경 |
| app card 선택 | 해당 mock screen route로 이동 |
| AI Studio card 선택 | sandbox/localhost 안내 panel 표시 |
| suggested action 선택 | documentation-only panel 표시 |

## 7. 아직 구현하지 않을 실제 OS 기능

- 실제 앱 실행
- 실제 명령 실행
- 실제 파일 인덱싱
- 실제 패키지 목록 조회
- AI WebUI 실행
- 외부 네트워크 호출
- OS command API 또는 native bridge

## 8. 보안 경계

- 검색은 정적 mock data에만 적용됩니다.
- remote content를 불러오지 않습니다.
- AI Studio는 sandbox/localhost 기본값 안내만 표시합니다.
- suggested action은 preview-only 또는 documentation-only입니다.

## 9. 접근성 고려

- 검색 입력은 overlay open 직후 focus 후보입니다.
- 결과 card는 keyboard arrow navigation을 고려합니다.
- category 선택 상태는 text와 visual state를 함께 제공합니다.
- motion은 150~220ms 범위이며 reduce motion 대응을 고려합니다.

## 10. 다음 구현 단계 TODO

- launcherMock schema 확정
- 검색 결과 ranking 규칙 문서화
- empty state와 no-result 문구 KO/EN key 정의
- AI Studio card의 보안 안내 microcopy 확정

