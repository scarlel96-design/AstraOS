# AstraOS Module Framework Overview

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## 정의

Module Framework는 Modular Evolution Architecture를 실현하기 위한 AstraOS 모듈 계약입니다. Phase 0에서는 실제 프레임워크를 구현하지 않고, 모듈이 가져야 할 metadata, 권한, sandbox, 업데이트, rollback 기준만 정의합니다.

## 모듈 manifest 후보 필드

| 필드 | 목적 |
| --- | --- |
| `name` | 모듈 이름 |
| `version` | 모듈 버전 |
| `publisher` | 서명 주체 |
| `permissions` | 필요한 권한 목록 |
| `sandboxProfile` | sandbox 정책 |
| `dependencies` | 의존 모듈 |
| `updateChannel` | 업데이트 채널 |
| `rollbackPolicy` | rollback 정책 |
| `healthCheck` | 상태 점검 기준 |
| `recoveryPolicy` | 복구 정책 |
| `securityScore` | 보안 위험 등급 |

## 모듈 공통 요구사항

- OS Core와 직접 결합하지 않는다.
- stable API, IPC, event bus, permission broker를 통해 통신한다.
- 권한은 manifest에 선언하고 사용자 또는 정책 승인을 거친다.
- 실패 시 OS Core 안정성을 해치지 않는다.
- 취약하거나 손상된 모듈은 격리, 비활성화, rollback 가능해야 한다.

## 보안 경계

- Secure Delete 모듈은 anti-forensics가 아니라 사용자 소유 데이터 보호 기능으로만 동작해야 한다.
- Astra Shield 모듈은 공격 기능이 아니라 백신/EDR/복구 구조로만 동작해야 한다.
- AI Studio 모듈은 외부 공개 WebUI가 아니라 sandbox/localhost 기본값을 사용해야 한다.
- 위험 작업은 사용자 확인, dry-run, preview, rollback을 우선해야 한다.

## Phase 0 제외 범위

- 실제 module loader
- 실제 permission broker
- 실제 sandbox runtime
- 실제 update service
- 실제 rollback engine
- 실제 서명 검증 구현

