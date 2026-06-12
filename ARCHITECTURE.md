# AstraOS Architecture

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## 아키텍처 목표

AstraOS는 Linux LTS 기반 immutable/atomic 데스크톱 OS로 설계합니다. 초기 단계에서는 커널을 직접 제작하지 않고, 검증된 Linux LTS 기반 위에서 업데이트 안정성, 복구 가능성, 모듈 격리, 사용자 데이터 보호를 우선합니다.

아키텍처의 핵심 개념은 Modular Evolution Architecture와 Balanced Premium Performance입니다.

## Modular Evolution Architecture

Modular Evolution Architecture는 AstraOS를 독립적으로 발전 가능한 모듈들의 집합으로 설계하는 원칙입니다. OS Core는 안정적인 기반을 제공하고, 기능 모듈은 명확한 계약을 통해 연결합니다.

모듈은 다음 기준을 가져야 합니다.

- 명확한 책임과 소유 범위
- 모듈 manifest
- 권한 프로필
- sandbox 정책
- 서명 및 무결성 검증
- 업데이트 채널
- health check
- rollback 정책
- 보안 점수 또는 위험 등급
- 복구 정책

모듈 실패는 OS Core 실패로 전파되지 않아야 합니다. 취약하거나 손상된 모듈은 격리, 비활성화, 롤백될 수 있어야 합니다.

## Balanced Premium Performance

Balanced Premium Performance는 무조건 초경량을 목표로 하지 않습니다. 보안, 복구, 모듈성, 프리미엄 UI, AI 도구 지원, 사용자 데이터 보호에 의미 있는 가치가 있다면 적절한 성능 비용을 허용합니다.

성능 비용은 다음 방법으로 제어합니다.

- lazy loading
- background task scheduling
- risk-based scanning
- module sleep
- GPU acceleration
- low resource mode
- battery mode
- gaming 또는 low latency mode
- per-module resource limit

## 시스템 계층

| 계층 | 역할 | Phase 0 산출물 |
| --- | --- | --- |
| Core OS | Linux LTS 기반 immutable/atomic 시스템, 업데이트, 롤백 | 구조와 경계 문서 |
| Permission Broker | 모듈 권한 중재, 파일/네트워크/클립보드 접근 통제 | 정책 모델 |
| Security Center | 보안 이벤트, 상태, 사용자 알림, 복구 진입점 | 방어 구조 |
| Module Runtime | 앱과 보안 모듈 실행 격리 | sandbox 정책 |
| Recovery | 업데이트 실패와 보안 손상 복구 | 복구 흐름 |
| AI Runtime Layer | AI Studio 및 AI 도구 격리 실행 | sandbox/localhost 정책 |

## Immutable/Atomic 방향

AstraOS의 기본 시스템 이미지는 원자적으로 업데이트되고 실패 시 이전 상태로 되돌릴 수 있어야 합니다. Phase 0에서는 OSTree, rpm-ostree, A/B deployment 같은 구현 후보를 비교 대상으로 둘 수 있지만 특정 구현을 확정하거나 ISO 빌드를 만들지 않습니다.

업데이트 설계의 기준은 다음과 같습니다.

- 업데이트 전 상태 보존
- 서명된 업데이트만 허용
- 실패 시 이전 deployment로 rollback
- 보안 업데이트 우선순위 반영
- 사용자 데이터와 시스템 이미지 분리

## 주요 모듈 경계

### Secure Delete

Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능입니다. Phase 0에서는 정책, UX 고지, dry-run, preview, rollback 불가능성 경고, 저장장치별 한계만 설계합니다.

### Astra Shield

Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조입니다. Phase 0에서는 탐지, 격리, 복구, 로그, 사용자 알림, 업데이트 정책의 아키텍처만 정의합니다.

### Astra Shield Guardian

Astra Shield Guardian은 Astra Shield 자체 보호와 자동 복구 구조입니다. stealth persistence, 백신 우회, 공격 기능으로 설계하지 않습니다.

### AI Studio

AI Studio는 WebUI 외부 공개가 아니라 sandbox/localhost 기본값의 AI 작업 환경입니다. Phase 0에서는 AI 도구 격리, 파일 접근 제한, 네트워크 제한, API key 보호, 실행 승인 정책만 설계합니다.

## Phase 0 비구현 원칙

이 문서는 실제 커널, 드라이버, 백신 엔진, Secure Delete 기능, AI WebUI, ISO 빌드 파이프라인을 만들지 않습니다. 구현이 필요한 항목은 이후 Phase의 작업 지시서로만 남깁니다.

