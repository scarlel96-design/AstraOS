# Astra Shell Security Boundaries

> 현재 문서는 Phase 1-0 기준이며 실제 구현이 아니라 Astra Shell 프로토타입 착수 설계/범위/거버넌스 문서입니다. 이 문서는 실제 로그인, 권한 상승, 시스템 설정 변경, 보안 정책 변경, 드라이버 제어, 백신 연동, OS 제어 기능을 구현하지 않습니다.

## 보안 목표

Astra Shell prototype은 보안 기능을 실행하지 않고, 사용자가 보안 상태와 위험 작업을 이해할 수 있는 UI 구조만 검증합니다. 모든 위험 작업은 mock, disabled, preview-only, documentation-only 상태로 표시합니다.

## 절대 금지

Phase 1-0에서는 다음을 구현하지 않습니다.

- 실제 로그인 인증
- 권한 상승
- 시스템 설정 변경
- 보안 정책 변경
- 드라이버 제어
- 백신 또는 EDR 연동
- Secure Delete 실행
- Vault 암호화 엔진
- AI WebUI 실행
- 파일 삭제 또는 파일 덮어쓰기
- 네트워크 외부 공개
- 공격 코드, exploit code, credential theft, 백신 우회, 악성코드, anti-forensics 기능

## 화면별 경계

| 화면 | 보안 경계 |
| --- | --- |
| Login Screen | 인증 UI mock만 허용, 실제 인증 금지 |
| Desktop | mock shell surface만 허용, 실제 window manager 제어 금지 |
| Dock | mock navigation만 허용, 실제 process launch 금지 |
| Launcher | mock search만 허용, 명령 실행 금지 |
| Control Center | 상태 표시만 허용, 실제 설정 변경 금지 |
| Notification Center | mock notification만 허용, daemon 연동 금지 |
| Workspace View | preview mock만 허용, compositor 제어 금지 |
| Settings Mock | 정보 구조만 허용, 권한 상승과 설정 저장 금지 |
| Security Center Mock | 방어 구조 표시만 허용, scan/quarantine/delete 실행 금지 |

## Secure Delete 표시 기준

Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능으로 표시합니다. UI mock에서는 다음만 보여줄 수 있습니다.

- 대상 preview 개념
- dry-run 개념
- 사용자 확인 개념
- rollback 불가능성 고지
- 저장장치별 한계 고지

실제 삭제 실행, 완전 삭제 보장, 불법 증거 훼손 목적 문구는 금지합니다.

## Astra Shield 표시 기준

Astra Shield는 공격 기능이 아니라 방어적 백신/EDR/복구 구조로 표시합니다. UI mock에서는 다음만 보여줄 수 있습니다.

- 보호 상태 mock
- 마지막 점검 시간 mock
- 격리 항목 수 mock
- 복구 가능 상태 mock
- Guardian health mock

실제 scan, quarantine, remediation, rule update, driver control은 금지합니다.

## AI Studio 표시 기준

AI Studio는 sandbox/localhost 기본값으로 표시합니다. UI mock에서는 다음만 보여줄 수 있습니다.

- local-first 상태
- sandbox status mock
- localhost binding 안내
- 외부 공개 기본 비활성 상태
- API key 접근 제한 안내

실제 WebUI 실행, 외부 네트워크 바인딩, API key 접근은 금지합니다.

## WebView Mock 보안 기준

WebView 기반 mock을 사용할 경우 다음 경계를 적용합니다.

- remote content를 로드하지 않는다.
- 외부 네트워크 요청을 기본 차단한다.
- native bridge를 만들지 않는다.
- OS command 실행 API를 제공하지 않는다.
- mock data는 정적 JSON으로 제한한다.
- 위험 작업 버튼은 실제 handler 없이 preview-only 상태로 둔다.

