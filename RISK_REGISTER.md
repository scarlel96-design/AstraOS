# AstraOS Risk Register

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## 위험 등록 원칙

이 문서는 Phase 0에서 식별한 주요 위험과 기본 대응 방향을 정리합니다. 실제 완화 기능을 구현하지 않으며, 이후 Phase에서 작업 지시서와 검증 기준을 작성하기 위한 기준으로 사용합니다.

## 위험 등급

- Critical: 사용자 데이터 손실, 원격 노출, 공격 기능 포함, 복구 불가능한 시스템 손상으로 이어질 수 있는 위험.
- High: 보안 경계 약화, 권한 과다, 잘못된 보안 주장, 사용자 동의 누락으로 이어질 수 있는 위험.
- Medium: 모듈 경계 불명확, 운영 복잡도 증가, 성능 비용 과다, 로그 부족 위험.
- Low: 문서 불일치, 용어 혼선, TODO 누락 위험.

## 등록된 위험

| ID | 위험 | 등급 | Phase 0 대응 |
| --- | --- | --- | --- |
| R-001 | Phase 0에서 실제 OS 기능 구현으로 범위가 확장됨 | High | 모든 문서에 설계/범위/거버넌스 문서임을 명시 |
| R-002 | 커널 직접 제작이 초기 목표로 오해됨 | High | Linux LTS 기반, 커널 직접 제작 제외를 반복 명시 |
| R-003 | Secure Delete가 anti-forensics로 오해됨 | Critical | 사용자 소유 데이터 보호 기능으로 정의 |
| R-004 | Secure Delete가 검증 없이 완전 삭제를 수행함 | Critical | dry-run, preview, 사용자 확인, 한계 고지, rollback 불가능성 고지 필요 |
| R-005 | Astra Shield가 공격 기능 또는 백신 우회 기능으로 확장됨 | Critical | 백신/EDR/복구 구조로 제한 |
| R-006 | Astra Shield Guardian이 은닉 persistence로 오해됨 | High | visible, reversible, self-protection, self-healing 구조로 정의 |
| R-007 | AI Studio WebUI가 외부에 기본 공개됨 | Critical | sandbox/localhost 기본값 명시 |
| R-008 | AI 도구가 API key, 파일, 네트워크에 과도하게 접근함 | High | 권한 제한, sandbox, 사용자 승인 설계 |
| R-009 | immutable/atomic 업데이트 rollback 설계가 누락됨 | High | signed update, deployment rollback, 복구 우선 설계 문서화 |
| R-010 | 모듈 간 직접 결합으로 OS Core 안정성이 약화됨 | Medium | Modular Evolution Architecture와 모듈 계약 정의 |
| R-011 | 보안 기능으로 성능 저하가 누적됨 | Medium | Balanced Premium Performance와 성능 제어 전략 문서화 |
| R-012 | 위험 작업이 사용자 확인 없이 실행됨 | Critical | 사용자 확인, dry-run, preview, rollback 원칙 강제 |
| R-013 | Vault 또는 Shield가 사용자 파일을 동의 없이 업로드함 | Critical | 명시적 동의와 local-first 원칙 필요 |
| R-014 | 문서와 이후 구현이 다국어 구조 없이 하드코딩됨 | Medium | KO/EN 리소스 구조를 코딩 기준에 포함 |
| R-015 | 예외 처리와 널 방어가 누락됨 | Medium | 코딩 기준에 오류 처리와 널 방어 기본값 포함 |

## 모듈별 핵심 위험

### Secure Delete

Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능입니다. 주요 위험은 오삭제, 복구 불가능성 고지 누락, 저장장치 특성 오해, 과장된 완전 삭제 주장입니다.

Phase 0 대응:

- 삭제 대상 preview 설계
- dry-run 결과 설계
- 명시적 확인 문구 설계
- 저장장치별 한계 고지
- 감사 로그 기준 정의

### Astra Shield 및 Guardian

Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조입니다. Guardian은 자체 보호와 자동 복구 구조입니다.

주요 위험:

- 공격 기능으로의 범위 확장
- 백신 우회 또는 회피 로직 포함
- 사용자 데이터 과다 수집
- 손상된 보안 모듈 복구 실패

Phase 0 대응:

- 탐지, 격리, 복구, 로그, 사용자 알림 중심으로 제한
- 업로드와 외부 연동은 명시적 동의 필요
- Guardian은 visible하고 reversible한 복구로 제한

### AI Studio

AI Studio는 WebUI 외부 공개가 아니라 sandbox/localhost 기본값입니다.

주요 위험:

- 인증 없는 외부 공개
- AI 플러그인 또는 custom node의 파일 접근
- API key 유출
- AI 생성 명령 자동 실행

Phase 0 대응:

- localhost 바인딩 기본값
- sandbox 실행
- 파일, 네트워크, clipboard, API key 접근 제한
- AI 생성 명령 자동 실행 금지

## 위험 작업 공통 통제

위험 작업은 다음 통제를 먼저 가져야 합니다.

- 사용자 확인
- dry-run
- preview
- 영향 범위 표시
- rollback 또는 복구 절차
- 감사 로그
- 실패 시 안전 상태

