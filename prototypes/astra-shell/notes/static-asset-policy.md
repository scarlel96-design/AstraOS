# Phase 1-2 Static Asset Policy

> 현재 문서는 Phase 1-2 기준의 Astra Shell Static Mock Planning Pack 문서입니다. 실제 asset 파일, bundler 설정, HTML, CSS, TypeScript, JavaScript, WebView 실행 코드를 만들지 않습니다.

## 1. 목적

정적 WebView mock scaffold를 안전하게 만들기 전에 asset 사용 정책을 정의합니다. 목표는 remote content와 외부 CDN 의존을 차단하고, local/static/mock-only asset만 허용하는 것입니다.

## 2. Phase 1-2 범위

- asset 허용/금지 기준 문서화
- remote asset 금지
- 외부 CDN 금지
- 로컬 정적 asset만 허용
- 추후 asset hash 검증 후보 정의

## 3. 허용 정책

| 항목 | Phase 1-2 정책 |
| --- | --- |
| 아이콘 | 로컬 정적 asset 후보만 허용 |
| 배경 이미지 | 로컬 mock asset 후보만 허용 |
| 폰트 | 로컬 배포 가능 라이선스 검토 후 후보로만 문서화 |
| 디자인 토큰 | Markdown 문서로만 정의 |
| screenshot/mock visual | 민감정보 없는 생성 또는 직접 제작 asset 후보 |

## 4. 금지 정책

- remote asset 금지
- 외부 CDN 금지
- 외부 URL 이미지 금지
- analytics, tracker, remote font 금지
- 사용자 파일에서 asset 자동 로드 금지
- 실제 시스템 icon theme 자동 스캔 금지
- HTML/CSS/JS 구현 파일 생성 금지

## 5. 추후 asset hash 검증 후보

Phase 1-2에서는 구현하지 않지만, 이후 static asset을 추가할 때 다음을 검토합니다.

- asset manifest 문서
- SHA-256 hash 기록
- 라이선스 출처 기록
- 파일 크기 제한
- 이미지 metadata 제거
- remote URL 포함 여부 검사
- CI에서 asset hash drift 감지

## 6. 아직 구현하지 않을 항목

- 실제 asset 파일 추가
- asset manifest 생성
- hash 계산 스크립트
- bundler 설정
- WebView CSP 구현
- HTML/CSS/TypeScript/JavaScript

## 7. 보안 경계

- local/static/mock data 전용으로 설계합니다.
- remote content를 불러오지 않습니다.
- 외부 CDN을 사용하지 않습니다.
- asset은 실제 사용자 파일이나 실제 시스템 상태에서 가져오지 않습니다.
- Security Center mock asset은 실제 백신/EDR 브랜드나 결과처럼 보이지 않아야 합니다.

## 8. 다음 구현 단계 TODO

- asset directory 후보 경로 문서화
- asset manifest 형식 초안 작성
- hash 검증 정책의 CI 연결 가능성 검토
- 라이선스 확인 checklist 작성
- low resource mode용 reduced visual asset 기준 정의

