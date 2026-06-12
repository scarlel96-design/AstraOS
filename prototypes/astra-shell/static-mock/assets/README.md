# Static Mock Assets

> 현재 문서는 Phase 1-4 UI Polish + Accessibility Pass 기준이며 실제 구현이 아니라 정적 asset 사용 경계 문서입니다. 현재 디렉터리에는 실행 asset을 추가하지 않습니다.

## 허용

- 로컬 정적 이미지, 아이콘, mock screenshot
- 민감정보가 없는 직접 제작 asset
- 라이선스와 출처가 기록된 asset
- 이후 단계에서 hash 또는 manifest로 검증 가능한 asset

## 금지

- remote image
- CDN asset
- analytics 또는 tracker
- remote font
- 실제 사용자 파일에서 가져온 이미지
- 실제 시스템 icon theme 자동 스캔 결과
- 실제 보안 제품 로고나 탐지 결과처럼 보이는 asset

## Phase 1-4 정책

현재 static mock은 CSS와 텍스트 기반 구조만 사용합니다. asset을 추가해야 할 때는 `assets/` 하위에만 두고, 외부 URL을 참조하지 않아야 합니다.
