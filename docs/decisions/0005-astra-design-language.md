# Decision 0005: Astra Design Language

> 현재 문서는 Phase 1-5d 기준이며 실제 구현이 아니라 AstraOS Shell UI/UX 디자인 방향을 고정하는 설계/범위/거버넌스 문서입니다. 이 문서는 실제 Wayland compositor, Shell runtime, theme engine, native app bridge, OS 제어 기능을 구현하지 않습니다.

## 결정

AstraOS UI는 Linux 기본 desktop environment를 복제하지 않고 Astra Design Language를 따릅니다.

Astra Design Language는 macOS급 정돈감과 One UI 9.0급 부드러운 component 감성을 의도적으로 융합하되, Apple, Samsung, Windows, GNOME, KDE의 특정 시각 요소를 직접 복제하지 않습니다.

## 참고 방향

macOS에서 참고할 것:

- 정갈한 여백
- 고급스러운 glass surface
- 미세한 depth
- 얇은 border와 은은한 shadow
- 조용하고 읽기 좋은 typography
- desktop 위 app window 중심 구조
- 과하지 않은 Shell Bar 존재감

One UI 9.0에서 참고할 것:

- 큰 radius
- 부드러운 card/component 계층
- 여유로운 spacing
- 큰 제목과 명확한 section 구조
- 촉감 좋은 toggle/slider/quick panel
- 자연스러운 blur와 depth
- desktop/tablet/mobile로 확장 가능한 component 언어

## 복제 금지

다음은 금지합니다.

- Apple 로고
- macOS traffic light 버튼의 정확한 모양과 색상
- macOS 메뉴바 구조
- macOS Dock 구조
- Samsung One UI 고유 icon style
- Samsung 고유 color palette
- Samsung 고유 component 형태
- Windows taskbar/start menu/widget 구조 직접 복제
- GNOME/KDE/Ubuntu desktop UI 직접 복제
- 사이버 보안 dashboard 스타일 남발
- 과도한 neon, badge, warning color 남발

## 이유

이 결정을 채택하는 이유:

- AstraOS 고유 identity 확보
- premium desktop OS 감성 확보
- desktop, tablet, mobile 확장 가능한 design token 기반 확보
- Linux native app compatibility와 Astra Shell 고유 UX를 동시에 달성
- Apple/Samsung/Microsoft/GNOME/KDE 브랜드 및 법적 리스크 회피
- 보안 OS 특유의 신뢰감을 차분하고 과장 없는 방식으로 표현

## Linux UI 표준

Astra Design Language는 Linux 호환성을 깨지 않습니다.

- Wayland 기반 Shell 방향을 고려합니다.
- XDG desktop entry 기반 app metadata를 고려합니다.
- XDG portal 기반 permission prompt를 고려합니다.
- accessibility와 keyboard navigation을 기본 요구사항으로 둡니다.
- Linux native app이 AstraOS window chrome/theme bridge 안에서 자연스럽게 보이도록 설계합니다.
- UI는 고유 디자인을 가지되 app sandbox, portal, localization, input method와 충돌하지 않아야 합니다.

## Static Mock 적용 기준

현재 static Shell UI prototype은 실제 OS가 아닙니다.

적용 기준:

- macOS-like calm desktop surface와 One UI-like soft component를 결합합니다.
- 상단 route switcher, 개발자용 badge, 보안 dashboard 과밀도를 줄입니다.
- Shell Bar, Launcher, Control Center, Notification Center, Settings, Security Center를 AstraOS 고유 구조로 정리합니다.
- static mock에서 실제 로그인, OS control, native bridge, system status read, security scan을 구현하지 않습니다.

## 다음 단계

- `docs/design/astra-design-language.md`를 design language source of truth로 유지합니다.
- `prototypes/astra-shell/design-tokens/tokens.md`에 token 방향을 반영합니다.
- Phase 1-6 이후 native shell prototype 후보에 같은 디자인 언어를 적용합니다.
- dark/light theme token table과 component spec을 후속 문서로 작성합니다.
