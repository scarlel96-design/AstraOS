# Secure Development

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## 목적

이 문서는 AstraOS의 보안 개발 기준을 정의합니다. Phase 0에서는 실제 보안 기능을 구현하지 않고, 이후 구현이 따라야 할 방어적 원칙과 위험 작업 절차를 문서화합니다.

## 방어적 보안 원칙

- 모든 보안 기능은 사용자 보호, 탐지, 격리, 복구, 감사에 집중한다.
- 공격 코드, exploit code, credential theft, 백신 우회, 악성코드, anti-forensics 기능을 작성하지 않는다.
- 기본 권한은 최소 권한으로 시작하고, 권한 상승은 사용자 확인과 감사 로그를 요구한다.
- 외부 입력은 신뢰하지 않고, 실패 시 안전 상태로 중단한다.
- destructive 작업은 dry-run과 preview를 먼저 제공한다.

## 위험 작업 기준

다음은 위험 작업으로 분류합니다.

- 파일 삭제 또는 덮어쓰기
- 권한 변경
- 네트워크 외부 공개
- 부팅 구성 변경
- 시스템 서비스 변경
- 암호화 또는 복호화
- 보안 정책 변경
- 업데이트와 rollback 조작

위험 작업은 다음 절차를 따라야 합니다.

1. 목적과 대상 범위 표시
2. dry-run 또는 preview 제공
3. 사용자 확인
4. 영향 범위와 실패 가능성 고지
5. rollback 또는 복구 절차 제공
6. 감사 로그 설계

## 모듈별 보안 경계

- Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능입니다.
- Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조입니다.
- Astra Shield Guardian은 Shield 자체 보호와 자동 복구 구조입니다.
- AI Studio는 WebUI 외부 공개가 아니라 sandbox/localhost 기본값입니다.

