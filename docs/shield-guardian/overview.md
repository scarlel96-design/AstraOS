# Astra Shield Guardian Overview

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## 정의

Astra Shield Guardian은 Astra Shield 자체 보호와 자동 복구 구조입니다. Guardian은 은닉 persistence나 공격 기능이 아니라 Shield 무결성 확인, 서비스 복구, 설정 복원, 안전 모드 복구를 담당합니다.

## Phase 0 범위

Phase 0에서는 다음 구조를 문서화합니다.

- Guardian Core Service
- Health Monitor
- Tamper Protection Policy Engine
- Protected Security Store
- Signed Recovery Capsule
- Dual Engine Slot
- Offline Recovery Agent
- Emergency Lockdown Mode
- Security Attestation Reporter

## 복구 흐름

Guardian의 복구 흐름은 방어적이고 사용자에게 보이는 방식이어야 합니다.

1. Soft Repair
2. Component Restore
3. Engine Rollback
4. Recovery Capsule Restore
5. Offline Deep Recovery through Astra Recovery

## 금지 범위

- stealth persistence로 동작하지 않는다.
- 백신 우회나 보안 도구 회피 기능을 포함하지 않는다.
- 사용자 몰래 시스템을 변경하지 않는다.
- Phase 0에서는 실제 서비스, 드라이버, 커널 보호 기능을 구현하지 않는다.

