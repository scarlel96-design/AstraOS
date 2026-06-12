# AstraOS Threat Model

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## Overview

AstraOS는 Linux LTS 기반 immutable/atomic 데스크톱 OS를 목표로 합니다. 저장소의 현재 보안 관점은 실제 런타임 취약점 분석이 아니라 Phase 0 문서, 아키텍처, 보안 경계, MVP 범위가 위험한 방향으로 확장되지 않도록 통제하는 것입니다.

이 위협 모델은 저장소 범위의 재사용 가능한 기준 문서입니다. 현재 저장소에는 구현 코드가 없으므로, 위협은 주로 설계 오용, 위험 기능의 조기 구현, 부정확한 보안 주장, 무분별한 외부 공개, destructive 작업 설계 누락에 집중합니다.

## Threat Model, Trust Boundaries, and Assumptions

### 보호 자산

- 사용자 소유 데이터
- Vault에 들어갈 민감 파일과 메타데이터
- OS 시스템 이미지와 업데이트 경로
- Astra Shield 보안 상태와 탐지/격리/복구 정책
- Astra Shield Guardian 복구 자산
- AI Studio의 모델, 플러그인, API key, 작업 파일
- 보안 로그와 감사 기록
- 프로젝트 범위와 안전 경계 자체

### 신뢰 경계

| 경계 | 신뢰 안쪽 | 신뢰 바깥쪽 | 주요 위험 |
| --- | --- | --- | --- |
| 사용자 데이터 경계 | 사용자 승인 파일, Vault 정책 | 임의 앱, AI 도구, 외부 플러그인 | 과도한 파일 접근 |
| 시스템 이미지 경계 | 서명된 immutable/atomic deployment | 미검증 업데이트, 손상된 모듈 | 부팅 실패, 공급망 위험 |
| 보안 모듈 경계 | Astra Shield/Guardian 정책 | 의심 파일, 악성 프로세스, 손상된 설정 | 탐지 우회 요구, 복구 실패 |
| AI Studio 경계 | sandbox/localhost 실행 환경 | 외부 네트워크, 모델 플러그인, custom node | 원격 노출, 데이터 유출 |
| 위험 작업 경계 | 사용자 확인된 dry-run/preview | 무검증 삭제, 권한 변경, 네트워크 공개 | 복구 불가 손상 |

### 입력 분류

- 공격자 제어 입력: 의심 파일, 외부 URL, 모델 플러그인, custom node, 다운로드 파일, 네트워크 요청, 악성 스크립트.
- 사용자 제어 입력: 삭제 대상, Vault 파일, AI Studio 작업 폴더, 보안 설정 변경, 네트워크 공개 승인.
- 개발자 제어 입력: 문서, 정책, 모듈 manifest, 빌드 설정, CI 규칙, 로드맵.

### 핵심 불변조건

- Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능이어야 한다.
- Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조여야 한다.
- AI Studio는 WebUI 외부 공개가 아니라 sandbox/localhost 기본값이어야 한다.
- Phase 0에서는 실제 구현을 만들지 않고 설계/범위/거버넌스만 작성해야 한다.
- 위험 작업은 사용자 확인, dry-run, preview, rollback을 우선해야 한다.

## Attack Surface, Mitigations, and Attacker Stories

### Phase 0 공격 표면

현재 저장소의 주요 공격 표면은 코드 실행 경로가 아니라 잘못된 설계 결정입니다.

- 문서가 offensive security 또는 exploit 구현을 허용하는 방향으로 쓰이는 경우
- Secure Delete가 anti-forensics나 불법 증거 훼손으로 오해되는 경우
- Astra Shield가 백신 우회, 공격 도구, 악성코드 분석 자동 실행으로 확장되는 경우
- AI Studio가 인증 없이 외부 네트워크에 공개되는 방향으로 설계되는 경우
- destructive 작업에서 dry-run, preview, rollback 기준이 누락되는 경우

### 현실적인 공격자 이야기

- 악성 파일이 향후 Astra Shield 분석 경로에 들어와 탐지/격리/복구 정책을 우회하려고 시도할 수 있다.
- 악성 AI 플러그인 또는 custom node가 AI Studio sandbox 밖의 파일, 네트워크, API key에 접근하려고 시도할 수 있다.
- 사용자가 Secure Delete를 실행할 때 대상 경로를 잘못 선택해 복구 불가능한 데이터 손실이 발생할 수 있다.
- 손상된 업데이트 또는 모듈이 OS Core 안정성에 영향을 줄 수 있다.
- 보안 모듈 설정이 손상되어 Astra Shield가 비활성화될 수 있으며, Guardian은 이를 visible하고 reversible한 복구 흐름으로 처리해야 한다.

### 범위 밖 공격자 이야기

- Phase 0에서는 실제 커널, 드라이버, 백신 엔진, ISO 빌드, AI WebUI가 없으므로 해당 구현의 구체적 취약점은 분석하지 않는다.
- 공격 코드, exploit code, credential theft, 백신 우회, 악성코드 구현은 설계 대상도 구현 대상도 아니다.
- anti-forensics 목적의 삭제 기능은 AstraOS 범위 밖이다.

### 기본 완화책

- Phase gate로 구현 전 문서화 요구
- 사용자 확인, dry-run, preview, rollback 원칙
- sandbox와 least privilege 기본값
- localhost 기본 네트워크 바인딩
- signed update와 rollback 설계
- 모듈 manifest, 권한 프로필, health check, 복구 정책
- 보안 로그와 사용자 가시성

## Severity Calibration

### Critical

- 사용자 확인 없이 destructive 삭제 또는 시스템 변경이 실행되는 설계.
- AI Studio WebUI가 기본값으로 외부 공개되는 설계.
- 보안 모듈이 공격 코드, credential theft, exploit code, 백신 우회 기능을 포함하는 설계.

### High

- Secure Delete가 anti-forensics로 설명되거나 복구 불가능성을 명확히 고지하지 않는 설계.
- Astra Shield가 사용자 파일을 동의 없이 외부로 업로드하는 설계.
- Guardian이 visible하고 reversible한 복구가 아니라 은닉 persistence로 오해될 수 있는 설계.

### Medium

- 모듈 권한 프로필, sandbox 정책, rollback 정책이 문서화되지 않은 설계.
- AI Studio의 파일, 네트워크, clipboard, API key 접근 경계가 불명확한 설계.
- 업데이트 실패 시 복구 경로가 불명확한 설계.

### Low

- 용어 표기가 문서마다 다르지만 보안 경계는 유지되는 경우.
- Phase 0 TODO가 빠졌지만 위험 기능 구현으로 이어지지 않는 문서 누락.
- 향후 구현 후보 기술이 정리되지 않은 상태.

