# Astra Shell Overview

> 현재 문서는 Phase 1-0 기준이며 실제 구현이 아니라 Astra Shell 프로토타입 착수 설계/범위/거버넌스 문서입니다. 이 문서는 실제 로그인, 권한 상승, 시스템 설정 변경, 보안 정책 변경, 드라이버 제어, 백신 연동, OS 제어 기능을 구현하지 않습니다.

## 목적

Astra Shell은 AstraOS 사용자 경험의 첫 화면과 기본 조작 모델을 정의하는 데스크톱 shell 계층입니다. Phase 1-0에서 Astra Shell은 실제 OS shell이 아니라 화면 구성, 정보 구조, 모듈 경계, 보안 경계를 검증하기 위한 UI mock 대상입니다.

## 역할

Astra Shell의 장기 역할은 다음과 같습니다.

- 로그인 전후 사용자 진입 흐름 제공
- 데스크톱, Dock, Launcher, Workspace View의 기본 탐색 모델 제공
- Control Center와 Notification Center를 통한 상태 확인 흐름 제공
- Settings mock과 Security Center mock을 통한 설정/보안 UX 방향 검증
- AstraOS의 Modular Evolution Architecture를 사용자 경험 계층에서 표현
- Balanced Premium Performance 기준에 맞는 빠르고 응답성 있는 shell UX 목표 정의

## Phase 1-0 범위

Phase 1-0에서는 다음만 수행합니다.

- Astra Shell 화면 책임 정의
- 초기 prototype 화면 목록 작성
- UI 기술 후보 비교
- 보안 경계 문서화
- `prototypes/astra-shell/` 최소 scaffold 설계
- 실제 OS 기능과 연결되지 않는 정적 UI mock 준비

## Phase 1-0 제외 범위

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
- 커널, compositor, Wayland 세션, display manager 구현

## 설계 원칙

- 모든 데이터는 mock data로 제한합니다.
- 위험 작업 버튼은 실제 실행 없이 disabled, preview-only, 또는 documentation-only 상태로 둡니다.
- 보안 관련 UI는 사용자 확인, dry-run, preview, rollback 원칙을 표현하되 실제 기능을 호출하지 않습니다.
- AI Studio 진입점은 sandbox/localhost 기본값을 표시하되 WebUI를 실행하지 않습니다.
- Astra Shield는 방어적 백신/EDR/복구 구조로만 표현하고 공격 기능을 암시하지 않습니다.

