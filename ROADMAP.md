# AstraOS Roadmap

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## 로드맵 원칙

AstraOS는 Phase 0부터 순서대로 진행합니다. 각 Phase는 이전 Phase의 산출물, 안전 경계, 위험 분류, 검증 기준을 만족한 뒤에만 진행합니다.

## Phase 0: 설계, 범위, 거버넌스

목표는 구현이 아니라 안전한 프로젝트 기반을 만드는 것입니다.

이번 기본 문서팩에서 생성하는 산출물은 다음과 같습니다.

- `README.md`
- `ARCHITECTURE.md`
- `SECURITY_MODEL.md`
- `THREAT_MODEL.md`
- `MVP_SCOPE.md`
- `ROADMAP.md`
- `RISK_REGISTER.md`
- `CODING_STANDARDS.md`
- `LICENSES.md`
- `docs/README.md`
- `docs/decisions/0001-project-scope.md`
- `docs/security/secure-development.md`
- `docs/shield/overview.md`
- `docs/shield-guardian/overview.md`
- `docs/vault/overview.md`
- `docs/secure-delete/overview.md`
- `docs/private-workspace/overview.md`
- `docs/ai-studio/overview.md`
- `docs/core-apps/overview.md`
- `docs/module-framework/overview.md`
- `.github/workflows/security-checks.yml`

Phase 0에서 다룰 핵심 기준은 다음과 같습니다.

- Linux LTS 기반 immutable/atomic 방향
- Modular Evolution Architecture
- Balanced Premium Performance
- Secure Delete 안전 경계
- Astra Shield 및 Astra Shield Guardian 방어 구조
- AI Studio sandbox/localhost 기본값
- 위험 작업의 사용자 확인, dry-run, preview, rollback 원칙

## 이후 Phase 0 심화 TODO

다음 항목은 파일 초안은 생성되었고, 이후 Phase 0 작업에서 내용을 심화해야 합니다.

| TODO | 현재 상태 | 이후 작업 |
| --- | --- | --- |
| `LICENSES.md` | 초안 생성 | 후보 기술 확정 후 라이선스 의무와 배포 조건 확장 |
| `docs/**` | 구조와 overview 초안 생성 | 각 모듈의 failure mode, test strategy, recovery strategy 심화 |
| `docs/module-framework/overview.md` | 초안 생성 | manifest schema와 permission profile을 실제 구현 전 설계 문서로 구체화 |
| `.github/workflows/security-checks.yml` | 문서 검증용 skeleton 생성 | 실제 코드 구현 전까지 문서 경계 검사 중심으로 유지 |

## Phase 1: 구조 검증 준비

Phase 1은 Phase 0 문서가 승인된 뒤에만 검토합니다.

### Phase 1-0: Astra Shell 프로토타입 착수 설계

Phase 1-0은 Phase 1 전체 구현이 아니라 Astra Shell UI mock과 문서 중심 착수 설계입니다.

산출물:

- `docs/shell/overview.md`
- `docs/shell/phase-1-scope.md`
- `docs/shell/ui-screens.md`
- `docs/shell/technology-decision.md`
- `docs/shell/security-boundaries.md`
- `docs/decisions/0002-astra-shell-prototype-scope.md`
- `prototypes/astra-shell/README.md`

Phase 1-0에서는 실제 로그인, 권한 상승, 시스템 설정 변경, 보안 정책 변경, 드라이버 제어, 백신 연동, OS 제어 기능을 구현하지 않습니다.

### Phase 1-1: Astra Shell 화면별 Wireframe / Mock Spec

Phase 1-1은 실제 UI 앱 구현이 아니라 화면별 구조, 레이아웃, 상태, mock data, 사용자 흐름을 문서화하는 단계입니다.

산출물:

- `prototypes/astra-shell/screens/*.md`
- `prototypes/astra-shell/design-tokens/tokens.md`
- `prototypes/astra-shell/mock-data/schema.md`
- `prototypes/astra-shell/mock-data/examples.md`
- `prototypes/astra-shell/notes/phase-1-1-summary.md`

### Phase 1-2: Astra Shell Static Mock Planning Pack

Phase 1-2는 package.json, HTML, CSS, TypeScript, JavaScript, WebView 실행 코드 없이 정적 mock scaffold를 안전하게 준비하기 위한 문서형 planning pack입니다.

산출물:

- `prototypes/astra-shell/notes/static-route-map.md`
- `prototypes/astra-shell/notes/interaction-state-table.md`
- `prototypes/astra-shell/notes/string-key-inventory.md`
- `prototypes/astra-shell/notes/static-asset-policy.md`
- `prototypes/astra-shell/notes/mock-data-loading-policy.md`
- `prototypes/astra-shell/notes/phase-1-2-planning-summary.md`

Phase 1-2에서는 실제 로그인, 권한 상승, 시스템 설정 변경, 보안 정책 변경, 드라이버 제어, 백신 연동, Secure Delete 실행, Vault 암호화 엔진, AI WebUI 실행, native bridge, OS command API를 구현하지 않습니다.

### Phase 1-3: Astra Shell Static WebView Mock Scaffold

Phase 1-3은 실제 WebView 앱이 아니라 브라우저에서 열 수 있는 static mock scaffold입니다. HTML/CSS/JavaScript는 로컬 mock data, hash route, 디자인 토큰, KO/EN string key 구조만 다루며 실제 OS 제어 기능과 연결하지 않습니다.

### Phase 1-4: Static Mock UI Polish + Accessibility Pass

Phase 1-4는 static mock의 visual hierarchy, 반응형, focus state, reduced motion, 접근성 구조를 다듬는 단계입니다. native bridge, OS command API, storage API, 외부 네트워크, 실제 로그인, 실제 보안 상태 검사는 계속 금지합니다.

### Phase 1-5: OS-like Layout Direction

Phase 1-5 계열은 Astra Shell이 웹 대시보드가 아니라 desktop shell처럼 보이도록 layout direction을 조정하는 단계입니다.

- Phase 1-5b: macOS처럼 정갈한 디자인 결과 Windows처럼 익숙한 desktop flow를 static mock에 반영합니다.
- Phase 1-5c: Linux LTS 기반 immutable/atomic desktop OS 방향을 문서에 고정합니다. 산출물은 `docs/decisions/0003-linux-base-architecture.md`입니다.
- Phase 1-5d: Astra Design Language를 macOS-inspired calm desktop + One UI-inspired soft component 감성의 고유 hybrid 시스템으로 고정합니다. 산출물은 `docs/design/astra-design-language.md`와 `docs/decisions/0005-astra-design-language.md`입니다.
- Phase 1-5e: Real Linux Base + Compatibility Strategy를 문서화합니다. 산출물은 `docs/compatibility/compatibility-layer-architecture.md`, `docs/compatibility/windows-app-compatibility.md`, `docs/compatibility/macos-app-compatibility.md`, `docs/decisions/0006-compatibility-strategy.md`, `docs/decisions/0007-linux-base-selection-criteria.md`입니다.

Phase 1-5c/1-5d/1-5e는 문서/아키텍처 방향 고정 단계입니다. 실제 OS 빌드, ISO 생성, 파티션 작업, 부팅로더 작업, Wayland compositor 구현, Wine/Proton/Darling 설치는 수행하지 않습니다.

### Phase 1-6: Linux Base Candidate Decision

Phase 1-6에서는 다음 후보를 비교하고 실제 base 선택을 위한 기술 결정을 준비합니다.

| 후보 | 검토 항목 |
| --- | --- |
| Fedora Atomic/Silverblue 계열 | rpm-ostree, atomic update, rollback, Flatpak 중심 desktop 경험 |
| openSUSE Aeon/MicroOS 계열 | transactional update, immutable root, rollback 방향 |
| NixOS 계열 | declarative system config, generation rollback, reproducibility |
| Arch 계열 | 최신 kernel/Mesa/desktop stack, hardware freshness |
| Debian/Ubuntu LTS 계열 | 안정성, ecosystem, hardware/vendor support, LTS 운영 |

선택 기준:

- LTS/stable 유지보수와 보안 업데이트
- hardware enablement와 드라이버 호환성
- signed update, atomic deployment, rollback 적합성
- Wayland/XDG/accessibility/localization 지원
- 패키지와 앱 배포 모델
- Astra Shell, permission broker, sandbox, recovery integration 가능성
- Wine/Proton/DXVK/VKD3D-Proton readiness
- macOS experimental track feasibility

Phase 1-6에서 실제 ISO를 만들지 않습니다. 먼저 base architecture decision, rootfs/update/rollback model, driver/graphics/Wayland/XDG portal 기준, compatibility layer readiness를 비교합니다.

### Phase 1-7: Compatibility Layer Planning

Phase 1-7은 구현이 아니라 compatibility layer planning입니다.

산출물 후보:

- Windows app compatibility profile spec
- per-app prefix manifest draft
- App Center compatibility source model
- runtime update/rollback policy
- macOS experimental feasibility ADR
- compatibility risk register update

Phase 1-7에서도 Wine, Proton, DXVK, VKD3D-Proton, Darling, VM, container를 설치하거나 실행하지 않습니다.

### 실제 OS 구현 전환 로드맵

1. Phase 1-6에서 Linux base 후보 비교표와 ADR 작성
2. Phase 1-7에서 compatibility layer planning과 package/update/rollback policy 상세화
3. Phase 1-8에서 Astra Shell native prototype 후보(Qt/QML, Slint, Rust UI, compositor integration)를 재평가
4. Phase 2에서 Linux userland 위의 제한적 native shell prototype 검토
5. Phase 2 이후 Wayland session/compositor prototype은 별도 승인, threat model, rollback plan을 갖춘 뒤 진행
6. ISO, installer, partition, bootloader 작업은 Phase 3 이후 별도 승인 전까지 금지

후보 작업:

- 저장소 디렉터리 구조 확정
- 문서 기반 module manifest 초안 작성
- permission broker 인터페이스 초안
- sandbox 정책 초안
- 위험 작업 dry-run UX 초안

Phase 1에서도 커널 제작, 드라이버 제작, 실제 백신 엔진, 실제 Secure Delete 실행, 외부 공개 AI WebUI는 기본 포함하지 않습니다.

## Phase 2: 제한적 프로토타입

Phase 2는 안전 경계와 rollback 설계가 문서화된 뒤 검토합니다.

후보 작업:

- 문서 기반 설정 schema 프로토타입
- 모듈 manifest validator
- 위험 작업 preview UI 또는 CLI mock
- localhost 전용 AI Studio launch policy mock
- Secure Delete dry-run planner mock

이 단계의 프로토타입도 실제 destructive 동작을 기본 실행하지 않습니다.

## Phase 3 이후: 구현 검토

실제 OS 기능, 보안 엔진, Vault, Secure Delete, AI Studio WebUI, ISO 빌드, 드라이버 작업은 Phase 0 문서, 위험 등록부, 승인된 작업 지시서, rollback 기준이 준비된 뒤 별도 검토합니다.

## 지속 원칙

- Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능입니다.
- Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조입니다.
- AI Studio는 WebUI 외부 공개가 아니라 sandbox/localhost 기본값입니다.
- 위험 작업은 사용자 확인, dry-run, preview, rollback을 우선합니다.
