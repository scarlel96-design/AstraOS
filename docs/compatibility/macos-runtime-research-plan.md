# macOS Runtime Research Plan

> 현재 문서는 Phase 1-7 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 Darling 설치, macOS app 실행, macOS framework 포함, Apple proprietary asset 포함, VM 구성, remote runtime 구성, container runtime 구성을 수행하지 않습니다.

## 목적

AstraOS의 macOS compatibility는 experimental/research track입니다. 이 문서는 macOS compatibility를 초기 MVP 보장 기능으로 약속하지 않고, 현실적인 연구 질문과 안전 경계를 정의합니다.

## 범위

- Darling 기반 가능성 조사 항목 정의
- macOS CLI/Unix 계열 도구 compatibility 가능성 조사
- `.app` bundle, plist, framework, dynamic library, filesystem layout, permission, sandbox 차이 조사
- VM, remote, container, compatibility layer 접근 방식 비교 기준 정의
- App Center에서 experimental compatibility 상태를 어떻게 표현할지 검토
- Fedora Atomic과 openSUSE Atomic base에서 experimental track을 base OS와 분리하는 방식 검토

## 비범위

- Darling 설치 또는 실행
- macOS GUI app 실행
- Apple proprietary framework, SDK, binary, asset 포함
- macOS app bundle 포함 또는 배포
- license 우회, DRM 우회, signature 우회
- VM 생성 또는 remote runtime 구성
- container runtime 구성
- compatibility 보장 표현
- user data 접근 또는 파일 변환 자동화

## 검증 항목

| 항목 | 검증 내용 | 성공 질문 | 실패 질문 |
| --- | --- | --- | --- |
| Darling feasibility | CLI 중심 가능성과 GUI 한계 조사 | experimental scope가 명확한가 | GUI 완전 호환을 암시하는가 |
| `.app` bundle | bundle, plist, resource layout 차이 | metadata parser 설계 질문이 분리되는가 | Apple asset 포함으로 이어지는가 |
| framework/dylib | framework, dylib, loader 차이 | proprietary dependency 금지를 유지하는가 | framework 포함을 전제로 하는가 |
| filesystem layout | path, permissions, sandbox 차이 | Linux sandbox와 충돌을 설명하는가 | host filesystem 접근을 과도하게 허용하는가 |
| VM approach | VM/remote 후보의 장단점 | 법적/라이선스/성능 리스크가 분리되는가 | 사용자에게 완전 호환을 약속하는가 |
| container approach | Linux container 기반 한계 | research track으로 유지되는가 | 구현 가능성 과장 |
| App Center UX | experimental status copy | 일반 사용자가 한계를 이해하는가 | 설치 가능처럼 오해되는가 |
| base OS 영향 | Fedora/openSUSE base와 runtime 분리 | base mutation 없이 연구 가능한가 | base OS에 proprietary component 포함 |

## 성공 기준

- macOS compatibility가 experimental/research track으로 명확히 표시됩니다.
- 초기 목표는 CLI/Unix 계열 도구 호환 조사부터 시작하며 GUI app 완전 호환을 약속하지 않습니다.
- Darling, VM, remote, container, compatibility layer 접근의 리스크가 분리됩니다.
- Apple proprietary framework, asset, binary 포함 금지가 명확합니다.
- App Center는 experimental 상태를 과장 없이 보여줍니다.

## 실패 기준

- macOS GUI app 완전 호환을 초기 목표로 약속합니다.
- Apple proprietary framework, app, asset 포함을 전제로 설계합니다.
- signature, DRM, license, sandbox 우회 방향으로 확장됩니다.
- 실제 Darling 설치 또는 VM 구성을 이번 단계에 포함합니다.
- Fedora/openSUSE base OS에 macOS compatibility component를 직접 포함하려고 합니다.

## 보안 경계

- Apple proprietary asset, framework, binary, app bundle 포함 금지.
- license, signature, DRM, sandbox 우회 금지.
- 실제 macOS app 실행 금지.
- 실제 Darling 설치 금지.
- VM/remote/container 실험은 후속 승인된 disposable environment에서만 수행합니다.
- 사용자 파일 접근은 later phase permission broker 설계 전까지 금지합니다.
- macOS compatibility는 공격 기능, bypass 기능, anti-forensics 기능이 아닙니다.

## 다음 단계

1. Darling, VM, remote, container, compatibility layer 접근별 ADR 초안을 분리합니다.
2. CLI/Unix tool compatibility와 GUI app compatibility를 별도 track으로 분리합니다.
3. App Center experimental wording을 작성합니다.
4. legal/licensing/security risk checklist를 작성합니다.
5. 후속 Phase에서 research-only disposable environment 계획을 별도 승인받습니다.

## 참고 자료

- [macOS App Compatibility](macos-app-compatibility.md)
- [Compatibility Layer Architecture](compatibility-layer-architecture.md)
- [Linux Base PoC Test Matrix](../base/poc-test-matrix.md)
