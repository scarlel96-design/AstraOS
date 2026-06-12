# AstraOS Security Model

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## 보안 목표

AstraOS의 보안 모델은 방어적 보안, 사용자 소유 데이터 보호, 복구 가능성, 감사 가능성을 중심으로 설계합니다. 모든 보안 기능은 사용자 동의, 명확한 목적, 제한된 권한, 로그, 복구 절차를 가져야 합니다.

## 절대 금지 범위

다음 기능은 구현하거나 제안하지 않습니다.

- 공격 코드
- exploit code
- 악성코드
- credential theft
- 백신 우회
- 보안 도구 회피
- anti-forensics
- 무검증 완전 삭제
- 무분별한 WebUI 외부 공개
- 사용자 확인 없는 파괴적 시스템 변경

## 핵심 보안 원칙

- Least privilege: 모듈과 앱은 필요한 최소 권한만 가진다.
- Defense-in-depth: 하나의 보호 계층 실패가 전체 시스템 실패로 이어지지 않는다.
- Sandboxing: 앱, AI 도구, 분석 도구, 의심 파일 처리 경로는 격리한다.
- Auditability: 보안 결정과 위험 작업은 추적 가능한 로그를 남긴다.
- Recovery-first: 손상, 업데이트 실패, 설정 오류는 복구 가능한 흐름을 먼저 가진다.
- User consent: 위험 작업은 사용자 확인을 먼저 요구한다.
- Dry-run first: destructive 작업은 가능한 경우 dry-run과 preview를 먼저 제공한다.

## 신뢰 경계

| 경계 | 보호 대상 | Phase 0 설계 기준 |
| --- | --- | --- |
| 사용자 데이터 경계 | 개인 파일, Vault 데이터, 설정 | 명시적 권한과 감사 |
| 시스템 이미지 경계 | immutable/atomic OS 이미지 | 서명, 검증, rollback |
| 모듈 경계 | Shield, Guardian, AI Studio, 앱 | manifest, sandbox, 권한 프로필 |
| 네트워크 경계 | 외부 API, 업데이트 서버, WebUI | localhost 기본값, 인증, 사용자 확인 |
| AI 도구 경계 | 모델, 플러그인, custom node, 스크립트 | sandbox, 파일/네트워크 제한 |

## Secure Delete 보안 정의

Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능입니다. 이 기능은 사용자가 본인 소유 데이터의 노출 위험을 줄이기 위한 정책으로 정의합니다.

Phase 0에서는 다음만 설계합니다.

- 삭제 대상 preview
- dry-run 결과
- 명시적 사용자 확인
- 저장장치와 파일시스템별 한계 고지
- rollback 불가능성 고지
- 감사 로그 정책
- 암호화 기반 삭제와 key destruction 후보 검토

실제 삭제 기능은 Phase 0에서 구현하지 않습니다.

## Astra Shield 보안 정의

Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조입니다. 목표는 악성 행위 탐지, 격리, 복구, 사용자 알림, 보안 상태 보고입니다.

Phase 0에서는 다음만 설계합니다.

- 탐지 이벤트 모델
- 격리 정책
- 복구 정책
- 로그와 감사 기준
- 업데이트 신뢰 모델
- Vault 및 사용자 데이터 접근 제한

실제 탐지 엔진, 드라이버, 커널 훅, 실시간 차단 기능은 구현하지 않습니다.

## Astra Shield Guardian 보안 정의

Astra Shield Guardian은 Astra Shield 자체 보호와 자동 복구 구조입니다. Guardian은 은닉, 지속성 공격, 우회 기능이 아니라 무결성 확인, 서비스 복구, 설정 복원, 안전 모드 복구를 담당합니다.

## AI Studio 보안 정의

AI Studio는 WebUI 외부 공개가 아니라 sandbox/localhost 기본값으로 정의합니다. 기본 상태에서 외부 네트워크 바인딩을 허용하지 않습니다.

Phase 0에서는 다음만 설계합니다.

- localhost 바인딩 기본값
- sandbox 실행 정책
- 파일 접근 권한 제한
- 네트워크 접근 권한 제한
- clipboard 및 API key 접근 제한
- AI 생성 명령 자동 실행 금지

## 위험 작업 처리 원칙

파일 삭제, 권한 변경, 네트워크 공개, 부팅 구성 변경, 시스템 서비스 변경, 암호화/복호화, 보안 정책 변경은 위험 작업입니다.

위험 작업은 다음 순서를 따라야 합니다.

1. 목적과 범위 문서화
2. 사용자 확인
3. dry-run 또는 preview
4. 영향 범위 표시
5. rollback 또는 복구 절차 정의
6. 실제 실행은 이후 Phase에서 별도 승인 후 검토

