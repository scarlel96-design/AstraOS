# AstraOS Docs

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## 문서 구조

이 디렉터리는 AstraOS Phase 0의 모듈별 설계 문서를 보관합니다. 각 문서는 실제 구현이 아니라 범위, 책임, 보안 경계, 이후 Phase 작업 기준을 정의합니다.

| 경로 | 목적 |
| --- | --- |
| `decisions/0001-project-scope.md` | 프로젝트 범위와 Phase 0 제한 결정 |
| `security/secure-development.md` | 보안 개발 원칙과 위험 작업 기준 |
| `shield/overview.md` | Astra Shield 방어 구조 |
| `shield-guardian/overview.md` | Astra Shield Guardian 자체 보호/복구 구조 |
| `vault/overview.md` | Astra Vault 범위와 보안 경계 |
| `secure-delete/overview.md` | Secure Delete 사용자 데이터 보호 정책 |
| `private-workspace/overview.md` | Astra Private Workspace 격리 정책 |
| `ai-studio/overview.md` | AI Studio sandbox/localhost 기본 정책 |
| `core-apps/overview.md` | Astra Core Apps 방향 |
| `module-framework/overview.md` | 모듈 manifest, 권한, sandbox, rollback 계약 |
| `base/linux-base-comparison.md` | Phase 1-6 Linux base 후보 weighted selection matrix |
| `base/recommended-base-shortlist.md` | Phase 1-6 Linux base 1차 shortlist와 Phase 1-7 PoC 목록 |
| `design/astra-design-language.md` | Astra Design Language와 UI 복제 방지 원칙 |
| `compatibility/compatibility-layer-architecture.md` | Windows/macOS compatibility layer 상위 구조 |
| `compatibility/windows-app-compatibility.md` | Windows 앱 호환성 준비 트랙 |
| `compatibility/macos-app-compatibility.md` | macOS 앱 호환성 Experimental 트랙 |
| `shell/overview.md` | Astra Shell 역할과 Phase 1-0 착수 설계 |
| `shell/phase-1-scope.md` | Astra Shell Phase 1-0 범위 |
| `shell/ui-screens.md` | Astra Shell 초기 화면과 책임 분리 |
| `shell/technology-decision.md` | Astra Shell prototype UI 기술 후보 비교 |
| `shell/security-boundaries.md` | Astra Shell mock 보안 경계 |
| `decisions/0002-astra-shell-prototype-scope.md` | Astra Shell prototype 범위 결정 |
| `decisions/0003-linux-base-architecture.md` | Linux base architecture 방향 결정 |
| `decisions/0005-astra-design-language.md` | Astra Design Language 결정 |
| `decisions/0006-compatibility-strategy.md` | Windows/macOS compatibility 전략 결정 |
| `decisions/0007-linux-base-selection-criteria.md` | Linux base 후보 선택 기준 |
| `decisions/0008-linux-base-shortlist.md` | Phase 1-6 Linux base 1차 shortlist 결정 |

## 공통 경계

- Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능입니다.
- Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조입니다.
- AI Studio는 WebUI 외부 공개가 아니라 sandbox/localhost 기본값입니다.
- 위험 작업은 사용자 확인, dry-run, preview, rollback을 우선합니다.
- 현재 static mock은 실제 OS가 아니라 Astra Shell UI prototype입니다.
- 장기 목표는 실제 부팅 가능한 Linux 기반 immutable/atomic desktop OS입니다.
- Wine/Proton/Darling 등 compatibility runtime은 현재 설치하거나 실행하지 않습니다.
