# macOS App Compatibility

> 현재 문서는 Phase 1-5e 기준이며 실제 구현이 아니라 macOS app compatibility 실험 트랙을 정리하는 설계/범위/거버넌스 문서입니다. 이 문서는 Darling, VM, container, remote app streaming, macOS runtime을 설치하거나 실행하지 않습니다.

## 목적

AstraOS는 장기적으로 Windows 앱 호환성뿐 아니라 macOS 앱 호환성 가능성도 조사합니다. 다만 macOS GUI 앱 완전 호환은 초기 목표로 약속하지 않습니다.

이 문서는 macOS compatibility를 Experimental track으로 분리하고, 현실적인 조사 순서와 리스크를 명확히 하기 위한 문서입니다.

## 현재 판단

- macOS 앱 호환성은 Experimental입니다.
- Darling 기반 가능성은 조사 대상입니다.
- macOS GUI 앱 호환성은 아직 제한적일 수 있으므로 초기 목표로 약속하지 않습니다.
- CLI/Unix 계열 macOS 도구 호환 가능성부터 검토합니다.
- VM, remote, container, compatibility layer 중 어떤 방식이 현실적인지는 후속 ADR로 분리합니다.

## 조사 대상

| 영역 | 조사 내용 |
| --- | --- |
| Darling | Mach-O, dyld, framework, CLI 호환 가능성 |
| `.app` bundle | bundle layout, Info.plist, resource path |
| plist | 설정, launch metadata, permission metadata |
| Framework | Cocoa/AppKit, Foundation, system framework 차이 |
| Dynamic library | Mach-O, dylib, rpath, code signing |
| Filesystem layout | `/Applications`, `~/Library`, sandbox container 차이 |
| Permission model | macOS TCC와 Linux portal/permission broker 차이 |
| GUI stack | AppKit/Quartz와 Wayland/X11 차이 |
| Alternative path | VM, remote app, container, compatibility layer 현실성 |

## 단계적 접근

1. macOS CLI/Unix 계열 도구 호환성 조사
2. `.app` bundle metadata parsing UX 조사
3. plist/framework/dylib 차이 문서화
4. Darling 기반 가능성 검토
5. GUI 앱 compatibility의 제한 사항 문서화
6. VM/remote/container/compat layer 후보 ADR 작성

## Shell and App Center Integration

macOS compatibility는 사용자에게 명확히 Experimental로 표시해야 합니다.

UI 방향:

- App Center에서 `Experimental` 상태 표시
- 실행 가능성, 제한 사항, 권한 요구사항을 사전에 표시
- 실패 시 repair/reset보다 diagnostics와 documentation-first 안내
- macOS 앱 완전 호환처럼 보이는 표현 금지
- Apple 브랜드, macOS icon style, Finder/App Store UI 복제 금지

## 권한과 sandbox 방향

macOS compatibility track도 AstraOS permission broker와 sandbox 정책을 따라야 합니다.

- host filesystem 전체 접근 금지
- 사용자 승인 없는 home directory 접근 금지
- clipboard, network, camera, microphone, screen capture는 portal/permission broker 경유
- app bundle import는 preview-first
- destructive clean/reset은 confirmation과 preview 필요

## 제외 범위

현재 단계에서 하지 않습니다.

- Darling 설치
- macOS 앱 실행
- macOS GUI 앱 호환 약속
- Apple framework 재구현
- Apple signing/DRM 우회
- license 우회
- macOS 시스템 파일 사용 유도
- Apple UI/brand asset 복제

## 리스크

- macOS GUI 앱 호환성은 기술적으로 매우 제한적일 수 있습니다.
- Apple framework, signing, sandbox, GUI stack 차이가 큽니다.
- 법적/라이선스/브랜드 리스크 검토가 필요합니다.
- 사용자가 “macOS 앱 완전 호환”으로 오해하지 않도록 문구를 엄격히 관리해야 합니다.

## 다음 단계

- `docs/decisions/0006-compatibility-strategy.md`에 Experimental track으로 연결
- Phase 1-6 이후 Linux base별 VM/container/compatibility feasibility 조사
- macOS compatibility 전용 ADR 작성 후보: `0008-macos-compatibility-approach.md`
