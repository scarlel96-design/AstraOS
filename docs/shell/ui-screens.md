# Astra Shell UI Screens

> 현재 문서는 Phase 1-0 기준이며 실제 구현이 아니라 Astra Shell 프로토타입 착수 설계/범위/거버넌스 문서입니다. 이 문서는 실제 로그인, 권한 상승, 시스템 설정 변경, 보안 정책 변경, 드라이버 제어, 백신 연동, OS 제어 기능을 구현하지 않습니다.

## 화면 구성 원칙

Astra Shell prototype은 실제 OS shell이 아니라 UI mock입니다. 모든 화면은 정적 mock data와 시뮬레이션 상태만 사용합니다. 버튼과 토글은 실제 시스템 상태를 변경하지 않습니다.

## 초기 화면 목록

| 화면 | 책임 | 금지되는 동작 |
| --- | --- | --- |
| Login Screen | 브랜드 첫인상, 사용자 선택, mock sign-in flow, 보안 안내 | 실제 인증, PAM 연동, 세션 생성 |
| Desktop | 배경, workspace 상태, 앱 진입점, 기본 shell surface | 파일 시스템 변경, 실제 window manager 제어 |
| Dock | 고정 앱, 실행 중 앱 표시 mock, 빠른 전환 | 실제 프로세스 실행, 앱 설치/삭제 |
| Launcher | 앱 검색, 카테고리, 최근 항목 mock | 실제 인덱싱, 명령 실행 |
| Control Center | 네트워크, 배터리, 사운드, 밝기, 모드 상태 mock | 실제 시스템 설정 변경 |
| Notification Center | 알림 목록, 보안/업데이트/앱 알림 mock | 실제 알림 daemon 연동 |
| Workspace View | workspace 전환, 창 preview mock, multitasking model | 실제 compositor 또는 window management |
| Settings Mock | 설정 정보 구조, 계정/디스플레이/개인화/보안 진입점 | 실제 설정 저장 또는 권한 상승 |
| Security Center Mock | Shield 상태, Guardian 상태, Vault 상태, Secure Delete policy 상태 | 백신 스캔, 격리, 삭제, 보안 정책 변경 |

## 화면별 세부 책임

### Login Screen

- AstraOS 브랜드와 보안-first 정체성을 보여줍니다.
- 사용자 선택, 암호 입력, 생체 인증 후보 UI를 mock으로 표현합니다.
- 실제 인증이나 권한 상승을 수행하지 않습니다.
- 실패 메시지는 다국어 구조를 고려해 설계합니다.

### Desktop

- AstraOS 기본 작업 공간을 표현합니다.
- Dock, Launcher, Control Center, Notification Center, Workspace View의 anchor 역할을 합니다.
- 실제 파일, 프로세스, 창 관리 시스템과 연결하지 않습니다.

### Dock

- 핵심 앱 진입점과 실행 상태 mock을 표시합니다.
- Browser, File Manager, Terminal, Settings, Security Center 같은 core app 후보를 보여줄 수 있습니다.
- 클릭은 mock navigation만 수행합니다.

### Launcher

- 앱 목록, 검색, 카테고리, 추천 작업을 보여줍니다.
- AI Studio 항목은 sandbox/localhost 기본값 안내를 포함합니다.
- 검색은 local mock dataset에서만 동작합니다.

### Control Center

- 빠른 설정 패널의 정보 구조를 검증합니다.
- 네트워크, 사운드, 밝기, 배터리, performance mode를 mock 상태로 표현합니다.
- 토글은 실제 시스템 설정을 변경하지 않습니다.

### Notification Center

- 시스템, 보안, 업데이트, 앱 알림의 우선순위와 grouping을 검증합니다.
- Astra Shield 경고는 방어적 알림으로만 표현합니다.
- 알림 삭제는 mock state에서만 처리합니다.

### Workspace View

- workspace 전환 UX와 창 preview 레이아웃을 검증합니다.
- 실제 compositor, Wayland, X11, window manager 기능은 구현하지 않습니다.

### Settings Mock

- Settings 앱의 정보 구조를 검증합니다.
- 계정, 디스플레이, 네트워크, 개인화, 접근성, 보안, 업데이트 섹션을 mock으로 구성합니다.
- 실제 설정 저장, 권한 상승, 시스템 변경은 금지합니다.

### Security Center Mock

- Astra Shield, Guardian, Vault, Secure Delete, Private Workspace 상태를 요약합니다.
- Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 정책으로 표시합니다.
- Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조로 표시합니다.
- 모든 위험 작업은 dry-run, preview, rollback 안내만 표시합니다.

