# Astra Design Language

> 현재 문서는 Phase 1-5d 기준이며 실제 구현이 아니라 AstraOS Shell UI/UX 디자인 방향을 고정하는 설계/범위/거버넌스 문서입니다. 이 문서는 실제 Wayland compositor, Shell runtime, theme engine, native app bridge, OS 제어 기능을 구현하지 않습니다.

## 결정 요약

AstraOS는 Linux LTS 기반 immutable/atomic desktop OS를 목표로 하지만, 사용자에게 보이는 Shell UI/UX는 일반적인 Linux desktop environment를 그대로 따르지 않습니다.

Astra Design Language는 macOS의 차분하고 고급스러운 desktop 미학, Samsung One UI 9.0의 부드럽고 직관적인 component 미학, Windows 11의 Mica/Acrylic depth와 Snap/Fluent 기반 실용성을 AstraOS 고유 방식으로 융합합니다.

최종 목표는 다음과 같습니다.

> AstraOS Shell은 macOS의 정갈하고 고급스러운 glass + 여백 감성, One UI의 부드럽고 큰 radius + 카드 계층 + 촉감 좋은 컴포넌트, Windows 11의 Mica/Acrylic depth + 현대적인 창 관리(Snap) + Fluent한 세련됨을 하나의 일관된 시스템으로 재해석한, AstraOS만의 차분하면서도 현대적이고 실용적인 프리미엄 하이브리드 디자인 언어를 구현한다.

목표는 macOS, One UI, Windows 11이 동시에 떠오르지만 어느 하나도 복제하지 않는 AstraOS만의 modern OS identity입니다.

## Linux 기반과 UI 계층 분리

Linux 기반은 다음을 의미합니다.

- Linux kernel과 hardware enablement
- driver와 system service
- package/update/security update 구조
- Wayland, XDG desktop entry, XDG portal
- accessibility, input method, localization
- sandbox, permission broker, audit, recovery

사용자 경험은 Astra Shell이 담당합니다.

- desktop surface
- Shell Bar
- Launcher
- Workspace View
- Control Center
- Notification Center
- Settings
- Security Center
- App Center
- window chrome/theme bridge

Astra Shell은 Linux 앱 호환성을 깨지 않으면서 고유 디자인 언어를 적용해야 합니다.

## macOS에서 참고할 것

정갈함과 고급감을 중심으로 참고합니다.

- 정갈한 여백과 시각적 호흡
- 고급스러운 glass surface와 미세한 depth
- 얇고 우아한 border
- 은은한 shadow
- 조용하고 읽기 좋은 typography
- 부드러운 transition과 animation
- desktop 위 app window가 중심이 되는 구조
- 과하지 않은 Dock/Shell Bar의 존재감

복제하지 않습니다.

- Apple 로고
- macOS traffic light 버튼의 정확한 모양과 색상
- macOS 메뉴바 구조
- macOS Dock 구조
- Apple 고유 icon style

## One UI 9.0에서 참고할 것

부드러움과 직관성을 중심으로 참고합니다.

- 큰 radius와 따뜻한 card 계층 구조
- 손에 잡히는 듯한 여유로운 spacing
- 큰 제목과 명확한 section 구조
- 편안하고 촉감 좋은 icon, toggle, slider
- 직관적인 quick panel과 gesture 흐름
- 부드러운 blur와 자연스러운 depth 표현
- desktop, tablet, mobile까지 이어지는 component 언어

복제하지 않습니다.

- Samsung One UI 고유 icon style
- Samsung 고유 color palette
- 특정 quick panel 형태
- 특정 widget/card 모양
- Samsung branding 요소

## Windows 11에서 참고할 것

현대적 depth, Snap, Fluent 기반 실용성을 중심으로 참고합니다.

- Mica/Acrylic 같은 backdrop depth
- 일관된 큰 rounded corner
- Snap layouts의 시각적 피드백
- 현대적인 window title 영역
- Fluent 스타일의 깨끗한 icon과 hover/focus 효과
- Settings app의 card 기반 정보 구조
- centered taskbar/start flow의 사용 편의성

복제하지 않습니다.

- Windows logo
- Windows 11 Start menu의 정확한 모양
- Windows 11 taskbar layout
- Windows title bar button의 정확한 형태
- Windows widget/notification 구조 직접 복제
- Microsoft app icon style

## AstraOS 고유 원칙

Astra Design Language는 세 참고 감성을 다음 원칙으로 통합합니다.

| 원칙 | 설명 |
| --- | --- |
| Calm Premium Surface | macOS의 정갈함, One UI의 부드러움, Windows 11의 Mica depth를 결합한 차분한 surface |
| Soft Mica Glass | glass, blur, Mica-like texture, shadow를 사용하되 과한 neon이나 cyber dashboard 느낌을 배제 |
| Trustworthy Security UI | 보안 상태는 과장하지 않고, 위험 작업은 명확하고 차분하게 표시 |
| Familiar Desktop Flow | Windows식 desktop/taskbar/start/window flow를 AstraOS 방식으로 유지 |
| Modern Snap Multitasking | Snap preview와 workspace overview를 제공하되 실제 OS 제어는 later phase로 분리 |
| Adaptive Component Language | desktop, tablet, mobile까지 확장 가능한 spacing/radius/type token 사용 |
| Linux Compatibility | XDG, Wayland, accessibility, native app rendering을 해치지 않는 theme bridge |

## Theme 방향

Dark theme과 light theme 모두 지원 가능한 token 구조를 목표로 합니다.

- Dark theme: 지나치게 어두운 security dashboard가 아니라 부드러운 neutral dark surface
- Light theme: 차가운 흰색보다 눈부심을 줄인 calm surface
- Accent: muted cyan/green/blue 계열을 기본 후보로 하되 과도한 neon 배제
- Warning: red/yellow는 실제 위험 또는 사용자 확인이 필요한 경우에만 제한적으로 사용
- Security safe: “완전 방어”처럼 과장하지 않고 조용한 정상 상태로 표시

## Component 방향

| Component | 방향 |
| --- | --- |
| Shell Bar | Windows식 익숙한 하단 taskbar 흐름을 유지하되 macOS Dock 복제 금지 |
| Launcher | Windows 11의 search-first 시작 흐름, One UI식 넉넉한 app grid, macOS식 glass depth를 AstraOS 방식으로 결합 |
| Control Center | One UI quick panel의 tactile control, Windows Settings card, macOS glass depth 결합 |
| Notification Center | 오른쪽 slide-out 또는 compact panel, 과장 없는 알림 |
| Settings | 독립 app window, Windows 11식 card 기반 정보 구조, macOS식 얇은 chrome |
| Security Center | 보안 관제 dashboard가 아니라 조용한 방어 상태와 복구 진입점 |
| App Center | Linux, Windows, macOS app 호환 상태를 자연스럽게 구분하는 card/list hybrid |
| Workspace/Snap View | Snap guide와 workspace card를 결합한 modern multitasking overview |
| Permission Prompt | XDG portal/permission broker와 연결 가능한 명확한 사용자 확인 UI |

## Linux UI 표준

Astra Design Language는 고유 UI를 가지되 Linux 표준과 충돌하지 않아야 합니다.

- Wayland 기반 Shell 방향 문서화
- XDG desktop entry 기반 app metadata 사용
- XDG portal 기반 권한 요청 UX 고려
- keyboard navigation과 focus visible 기본 지원
- screen reader와 accessibility tree 고려
- input method와 localization 고려
- Linux native app window chrome/theme bridge 고려
- Flatpak/native package/OCI app source 구분 표시 가능성 고려

## 금지 사항

- Apple, Samsung, Windows, GNOME, KDE의 특정 시각 요소 직접 복제
- 보안 OS라는 이유로 과한 cyberpunk/neon/dashboard 스타일 채택
- 과도한 badge, 경고색, card grid 남발
- 세 reference 중 하나로 완전히 치우친 디자인
- 실제 보안 상태처럼 오해될 수 있는 static mock 표현
- 실제 OS 기능이 없는 prototype에서 실제 설정 변경, 보안 검사, 로그인처럼 보이는 UX
- 외부 network asset, remote font, analytics, tracker 의존

## 다음 단계

Phase 1-6 이후 작업 후보:

- Astra Design Language token naming 확정
- `docs/design/astra-fusion-reference-lock.md`를 Figma reference board source로 사용
- dark/light theme token table 작성
- Shell Bar, Launcher, Control Center, Notification Center, Workspace/Snap component spec 작성
- Linux native app theme bridge concept 작성
- XDG portal permission prompt UX spec 작성
- static mock에 token drift 점검 적용
