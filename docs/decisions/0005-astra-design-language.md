# Decision 0005: Astra Design Language

> 현재 문서는 Phase 1-5d 기준이며 실제 구현이 아니라 AstraOS Shell UI/UX 디자인 방향을 고정하는 설계/범위/거버넌스 문서입니다. 이 문서는 실제 Wayland compositor, Shell runtime, theme engine, native app bridge, OS 제어 기능을 구현하지 않습니다.

## 결정

AstraOS UI는 Linux 기본 desktop environment를 복제하지 않고 Astra Design Language를 따릅니다.

Astra Design Language는 macOS의 정갈하고 고급스러운 glass/spacing 감성, One UI의 부드럽고 큰 radius/card/tactile component 감성, Windows 11의 Mica/Acrylic depth와 현대적인 window management/Snap/Fluent 감성을 하나의 일관된 시스템으로 재해석합니다.

최종 목표는 다음 한 문장으로 고정합니다.

> AstraOS Shell은 macOS의 정갈하고 고급스러운 glass + 여백 감성, One UI의 부드럽고 큰 radius + 카드 계층 + 촉감 좋은 컴포넌트, Windows 11의 Mica/Acrylic depth + 현대적인 창 관리(Snap) + Fluent한 세련됨을 하나의 일관된 시스템으로 재해석한, AstraOS만의 차분하면서도 현대적이고 실용적인 프리미엄 하이브리드 디자인 언어를 구현한다.

이 결정은 세 레퍼런스 중 하나를 복제하거나 한쪽으로 치우치는 것을 허용하지 않습니다. 항상 "macOS처럼 고급스럽고, One UI처럼 편안하며, Windows 11처럼 현대적이고 실용적인" AstraOS 고유 정체성을 목표로 합니다.

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

Windows 11에서 참고할 것:

- Mica/Acrylic 같은 backdrop depth
- 일관된 큰 rounded corner
- Snap layouts의 시각적 피드백
- 현대적인 window title 영역
- Fluent 스타일의 깨끗한 icon과 hover 효과
- Settings app의 card 기반 정보 구조

## AstraOS Fusion 원칙

| 원칙 | 결정 |
| --- | --- |
| Backdrop & Depth | macOS glass, One UI blur, Windows 11 Mica/Acrylic을 결합하되 과도한 투명도나 neon을 배제합니다. |
| Radius & Shape | macOS의 얇은 border, One UI의 큰 radius, Windows 11의 rounded corner를 중간~큰 radius 체계로 통합합니다. |
| Window Management | Windows 11식 Snap visual feedback, macOS식 부드러운 창 전환, One UI식 직관적 multitasking을 static mock과 later prototype에서 단계적으로 표현합니다. |
| Spacing & Layout | macOS의 정갈한 여백, One UI의 손에 잡히는 spacing, Windows 11의 균형 잡힌 card grid를 결합합니다. |
| Typography & Color | 조용한 typography, 명확한 계층, clean Fluent readability를 사용하며 accent는 muted tone으로 제한합니다. |
| Interaction | 150~220ms의 부드러운 transition, tactile hover/press, focus-visible, reduced motion 대응을 기본으로 합니다. |

## AstraOS Signature 요소

| 요소 | 방향 |
| --- | --- |
| Dock / Shell Bar | macOS Dock의 미니멀한 존재감, One UI의 부드러움, Windows 11의 현대적 centered taskbar 흐름을 AstraOS 고유 형태로 재해석합니다. |
| App Window Chrome | macOS의 얇은 border, One UI의 큰 radius, Windows 11 Mica backdrop을 결합하되 traffic light와 Windows caption button을 복제하지 않습니다. |
| Quick Settings / Control Panel | One UI Quick Panel의 직관성, Windows 11 Settings card 구조, macOS glass depth를 결합합니다. |
| Snap & Multitasking | Windows 11 Snap visual feedback을 참고하되 AstraOS 고유 preview shape와 부드러운 animation으로 표현합니다. |
| 전체 분위기 | 차분하고 현대적이며 실용적인 premium hybrid shell을 목표로 합니다. |

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
- Windows 11 정확한 title bar button, Start menu 모양, taskbar layout, Windows logo 복제
- GNOME/KDE/Ubuntu desktop UI 직접 복제
- GNOME/KDE/Windows 10 이전 스타일
- 사이버 보안 dashboard 스타일 남발
- 과도한 neon, badge, warning color 남발
- macOS, One UI, Windows 11 중 하나로 완전히 치우치는 디자인

## 이유

이 결정을 채택하는 이유:

- AstraOS 고유 identity 확보
- premium desktop OS 감성 확보
- desktop, tablet, mobile 확장 가능한 design token 기반 확보
- Linux native app compatibility와 Astra Shell 고유 UX를 동시에 달성
- Apple/Samsung/Microsoft/GNOME/KDE 브랜드 및 법적 리스크 회피
- 보안 OS 특유의 신뢰감을 차분하고 과장 없는 방식으로 표현

## Visual Reference Lock

Phase 1-5d 기준 Figma reference board에는 사용자가 제공한 macOS 4장, One UI 4장, Windows 11 6장 레퍼런스를 나란히 고정해야 합니다. Figma 파일 키가 제공되기 전까지 저장소 기준 reference lock은 `docs/design/astra-fusion-reference-lock.md`입니다.

Reference는 복제 대상이 아니라 분석 대상입니다. 각 이미지에서 가져올 것은 감성, 밀도, 계층, radius, depth, spacing, window management 원칙이며, logo, icon shape, exact button, palette, layout은 직접 복제하지 않습니다.

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

- macOS-like calm desktop surface, One UI-like soft component, Windows 11-like Mica/Snap/Fluent depth를 AstraOS 방식으로 결합합니다.
- 상단 route switcher, 개발자용 badge, 보안 dashboard 과밀도를 줄입니다.
- Shell Bar, Launcher, Control Center, Notification Center, Settings, Security Center, App Center, Workspace/Snap View를 AstraOS 고유 구조로 정리합니다.
- static mock에서 실제 로그인, OS control, native bridge, system status read, security scan을 구현하지 않습니다.

## 다음 단계

- `docs/design/astra-design-language.md`를 design language source of truth로 유지합니다.
- `docs/design/astra-fusion-reference-lock.md`를 Figma handoff source로 유지합니다.
- `prototypes/astra-shell/design-tokens/tokens.md`에 token 방향을 반영합니다.
- Phase 1-6 이후 native shell prototype 후보에 같은 디자인 언어를 적용합니다.
- dark/light theme token table과 component spec을 후속 문서로 작성합니다.
