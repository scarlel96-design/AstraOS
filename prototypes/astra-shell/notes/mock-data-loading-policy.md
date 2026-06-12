# Phase 1-2 Mock Data Loading Policy

> 현재 문서는 Phase 1-2 기준의 Astra Shell Static Mock Planning Pack 문서입니다. 실제 loader, API, JSON 파일, database, WebView 실행 코드, native bridge, OS command API를 만들지 않습니다.

## 1. 목적

정적 WebView mock scaffold에서 사용할 데이터 로딩 원칙을 문서화합니다. 실제 시스템이나 사용자 환경을 읽지 않고 fake JSON/mock object만 사용하도록 경계를 고정합니다.

## 2. Phase 1-2 범위

- mock data loading 정책 문서화
- 실제 시스템 상태 읽기 금지
- 실제 사용자 파일 읽기 금지
- fake JSON/mock object만 허용
- 민감정보 금지 기준 정의
- Security Center/Settings mock의 표시 경계 정의

## 3. 허용 데이터 소스

| 소스 | 허용 여부 | 조건 |
| --- | --- | --- |
| inline mock object 후보 | 허용 후보 | 실제 코드 작성 전 문서로만 정의 |
| local fake JSON 후보 | 허용 후보 | 이후 단계에서만 생성 검토 |
| Markdown examples | 허용 | 현재 단계 기준 |
| generated synthetic data | 허용 후보 | 실제 사용자/시스템 기반 생성 금지 |

## 4. 금지 데이터 소스

- 실제 사용자 파일
- 실제 최근 파일 목록
- 실제 홈 디렉터리
- 실제 시스템 상태
- 실제 네트워크 상태
- 실제 배터리 상태
- 실제 프로세스/창 목록
- 실제 보안 상태
- 실제 백신/EDR 결과
- 실제 Vault 내용
- 실제 API key, token, secret
- remote API
- OS command output

## 5. Loading Boundary

Phase 1-2에서는 실제 loading 구현을 만들지 않습니다. 이후 mock scaffold를 만들 때도 초기 정책은 다음과 같습니다.

1. load source는 local/static/mock-only로 제한합니다.
2. mock object는 `schema.md`의 root fields만 사용합니다.
3. unknown field는 표시하지 않습니다.
4. 민감정보처럼 보이는 key 이름은 금지합니다.
5. error state도 fake error만 사용합니다.
6. remote fetch, filesystem read, OS command는 금지합니다.

## 6. 아직 구현하지 않을 항목

- 실제 JSON 파일
- 실제 loader 함수
- fetch API
- filesystem read
- OS command API
- native bridge
- WebView preload script
- 실제 설정 저장
- 실제 보안 상태 검사

## 7. 보안 경계

- 모든 데이터는 fake/mock data입니다.
- 실제 사용자 데이터, 실제 시스템 상태, 실제 파일 목록을 읽지 않습니다.
- 실제 보안 상태를 검사하지 않습니다.
- 실제 명령 실행 기능을 만들지 않습니다.
- Security Center mock은 실제 백신/EDR 결과가 아니라 문서화용 상태만 표현합니다.
- Settings mock은 실제 설정 변경이 아니라 화면 구조만 표현합니다.

## 8. 다음 구현 단계 TODO

- mock data fixture 파일 생성 여부를 별도 승인받기
- schema field allowlist 문서화
- secret-like key name denylist 작성
- mock data validation checklist 작성
- locale string key와 mock message key 연결

