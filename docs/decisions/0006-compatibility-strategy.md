# Decision 0006: Compatibility Strategy

> 현재 문서는 Phase 1-5e 기준이며 실제 구현이 아니라 AstraOS Windows/macOS app compatibility 전략을 고정하는 설계/범위/거버넌스 문서입니다. 이 문서는 Wine, Proton, DXVK, VKD3D-Proton, Darling, VM, container를 설치하거나 실행하지 않습니다.

## 결정

AstraOS는 장기적으로 Linux native 앱만 실행하는 OS가 아니라 Windows 앱 호환성과 macOS 앱 호환성 실험 트랙을 준비하는 Linux 기반 immutable/atomic desktop OS를 목표로 합니다.

단, 현재 단계에서는 compatibility layer를 구현하지 않고 문서화, 위험 분류, architecture, UX, base 요구사항만 정의합니다.

## Windows Compatibility 결정

Windows compatibility는 장기 지원 목표로 채택합니다.

후보:

- Wine
- Proton
- DXVK
- VKD3D-Proton
- Winetricks/Bottles 유사 관리 구조
- per-app prefix
- sandboxed compatibility profile

원칙:

- app별 prefix를 우선합니다.
- runtime/prefix는 App Center와 Astra Shell에 통합합니다.
- GPU/Vulkan/audio/input integration을 Linux base 선택 이후 검증합니다.
- repair/reset/uninstall UX는 preview, confirmation, rollback 또는 복구 고지를 포함해야 합니다.
- anti-cheat bypass, DRM bypass, license bypass는 금지합니다.

## macOS Compatibility 결정

macOS compatibility는 Experimental track으로 채택합니다.

후보:

- Darling 기반 가능성 조사
- CLI/Unix 계열 macOS 도구 호환성 조사
- `.app` bundle, plist, framework, dynamic library, filesystem layout, permission model 조사
- VM/remote/container/compatibility layer 후보 비교

원칙:

- macOS GUI 앱 완전 호환을 초기 목표로 약속하지 않습니다.
- Apple signing, DRM, license 우회는 금지합니다.
- App Center에는 Experimental로 표시합니다.
- 후속 ADR에서 현실적인 접근 방식을 별도 결정합니다.

## 이유

호환성 전략을 별도 track으로 관리하는 이유:

- AstraOS를 일반 Linux 배포판 이상의 desktop OS로 확장합니다.
- Windows 앱 요구를 사용자 경험 안에서 관리할 수 있습니다.
- macOS compatibility는 과장 없이 실험 트랙으로 관리할 수 있습니다.
- compatibility runtime은 보안, 권한, 파일 접근, graphics stack, update/rollback 리스크가 크므로 Shell/App Center/permission broker와 함께 설계해야 합니다.

## 비결정

이번 ADR은 다음을 결정하지 않습니다.

- Wine/Proton/Darling 설치 방식
- 특정 runtime version
- 실제 Windows 앱 호환성 보장
- 실제 macOS GUI 앱 호환성 보장
- VM/container/remote 방식 채택
- App Center 구현 방식

## 제외

현재 단계에서 제외합니다.

- 실제 runtime 설치
- Windows/macOS 앱 실행
- prefix 생성
- VM/container 생성
- DRM/license/anti-cheat 우회
- 보안 도구 우회
- 사용자 파일 자동 import
- 실제 package manager 또는 OS integration 구현

## 보안 요구사항

- per-app isolation
- host filesystem 기본 차단
- explicit permission grant
- XDG portal/permission broker 연동 후보
- destructive action preview
- runtime update rollback 후보
- sensitive data 없는 diagnostics
- hidden telemetry 금지

## 관련 문서

- `docs/compatibility/compatibility-layer-architecture.md`
- `docs/compatibility/windows-app-compatibility.md`
- `docs/compatibility/macos-app-compatibility.md`
- `docs/decisions/0007-linux-base-selection-criteria.md`

## 다음 단계

Phase 1-6 이후:

- Linux base 후보별 compatibility runtime availability 비교
- graphics stack과 Vulkan policy 비교
- App Center compatibility profile UX spec 작성
- macOS experimental feasibility ADR 작성
