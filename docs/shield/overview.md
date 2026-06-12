# Astra Shield Overview

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## 정의

Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조입니다. 목표는 사용자 시스템과 사용자 소유 데이터를 보호하기 위한 탐지, 격리, 복구, 사용자 알림, 보안 상태 보고입니다.

## Phase 0 범위

Phase 0에서는 다음을 문서화합니다.

- Shield Core Service 책임
- 이벤트 기반 탐지 모델
- risk-based scanning 원칙
- 격리와 복구 정책
- 사용자 알림 정책
- 로그와 감사 기준
- Vault 및 사용자 파일 접근 제한
- Guardian과의 복구 경계

## 금지 범위

Phase 0에서는 다음을 구현하지 않습니다.

- 실제 백신 엔진
- 실제 EDR 센서
- 드라이버 또는 커널 훅
- 실시간 차단 엔진
- exploit code
- credential theft
- 백신 우회 또는 evasion 로직
- 악성코드 분석 자동 실행

## 안전 기본값

- full file upload는 명시적 사용자 동의 없이는 금지한다.
- 로컬 분석을 우선한다.
- 위험한 파일은 사용자에게 표시되는 방식으로 격리한다.
- 격리와 복구는 감사 가능해야 한다.

