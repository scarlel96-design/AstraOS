# Decision 0001: AstraOS Project Scope

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## 결정

AstraOS는 초기 단계에서 커널을 직접 제작하지 않고 Linux LTS 기반 immutable/atomic 데스크톱 OS로 진행합니다. Phase 0은 설계, 범위, 보안 원칙, MVP 정의, 위험 분류, 문서 구조, CI 초안 작성에 한정합니다.

## 배경

AstraOS는 보안 중심의 프리미엄 데스크톱 OS를 목표로 하지만, 초기부터 커널, 드라이버, 백신 엔진, ISO 빌드, AI WebUI를 구현하면 위험 범위가 통제되지 않습니다. 따라서 Phase 0에서는 실제 기능 구현보다 안전한 경계와 순차 로드맵을 우선합니다.

## 범위

Phase 0에서 허용되는 작업:

- 루트 문서 작성
- `docs` 디렉터리 구성
- 모듈별 overview 작성
- 문서 검증용 CI 초안 작성
- 보안 경계와 위험 작업 원칙 정의

Phase 0에서 금지되는 작업:

- 커널 직접 제작
- 실제 백신 구현
- 실제 보안 삭제 구현
- 실제 금고 암호화 엔진 구현
- AI WebUI 실행 구현
- 드라이버 또는 ISO 빌드 구현
- 공격 코드, exploit code, credential theft, anti-forensics 기능

## 결정 결과

- Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능으로 정의합니다.
- Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조로 정의합니다.
- AI Studio는 WebUI 외부 공개가 아니라 sandbox/localhost 기본값으로 정의합니다.
- 모든 위험 작업은 사용자 확인, dry-run, preview, rollback을 우선합니다.

