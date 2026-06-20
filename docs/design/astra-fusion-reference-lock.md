# Astra Fusion Visual Reference Lock

> 현재 문서는 Phase 1-5d 기준이며 실제 구현이 아니라 AstraOS Shell UI/UX 디자인 방향을 고정하는 설계/범위/거버넌스 문서입니다. 이 문서는 실제 Wayland compositor, Shell runtime, theme engine, native app bridge, OS 제어 기능을 구현하지 않습니다.

## 목적

이 문서는 사용자가 제공한 macOS, One UI, Windows 11 reference 사진을 AstraOS 디자인 기준으로 고정합니다.

Figma 파일 키가 제공되기 전까지 이 문서는 Figma reference board에 옮길 source of truth입니다. Figma 작업 시 아래 이미지는 복제 대상이 아니라 비교/해석용 reference로만 사용해야 합니다.

## 최종 목표

AstraOS Shell은 macOS의 정갈하고 고급스러운 glass + 여백 감성, One UI의 부드럽고 큰 radius + 카드 계층 + 촉감 좋은 컴포넌트, Windows 11의 Mica/Acrylic depth + 현대적인 창 관리(Snap) + Fluent한 세련됨을 하나의 일관된 시스템으로 재해석한, AstraOS만의 차분하면서도 현대적이고 실용적인 프리미엄 하이브리드 디자인 언어를 구현한다.

## Reference Set

### macOS: 정갈함, glass, 여백

| 파일 | 가져올 것 |
| --- | --- |
| `new-macOS-15-Sequoia-features.jpg` | 얇은 border, layered app windows, glass/blur, 조용한 typography |
| `cleanshot-2024-07-14-at-08-14-01-2x-1720959264363.png` | Dock 존재감, wallpaper 위 floating window, 넓은 desktop breathing room |
| `images (2).jpeg` | compact Dock, simple window stack, vivid but controlled wallpaper |
| `mba-sequoia.jpg` | 여러 창의 depth, desktop 위 companion device/window relationship |

### One UI: 부드러움, radius, 카드, 촉감

| 파일 | 가져올 것 |
| --- | --- |
| `One-UI-7-Vertical-App-drawer.jpg` | app grid density, rounded search, mobile-to-desktop component rhythm |
| `Samsung-Galaxy-Tab-S11-Ultra-in-mans-hand-showing-home-screen.jpg` | tablet spacing, large widgets, rounded card hierarchy |
| `One-UI-6-quick-panel-editing-scaled.jpg` | quick panel control grouping, tactile circular controls, soft dark surface |
| `images (3).jpeg` | desktop/tablet multitasking 감각, windowed productivity context |

### Windows 11: Mica/Acrylic, Snap, Fluent

| 파일 | 가져올 것 |
| --- | --- |
| `images (5).jpeg` | Settings card layout, window depth, clean Fluent component hierarchy |
| `intro-1683409497.jpg` | centered launcher/taskbar relationship, Acrylic-like Start surface |
| `1626461617_windows_11_(5).jpg` | Start layout density, bottom taskbar structure, desktop-first flow |
| `images (4).jpeg` | multi-window productivity layout, modern app windows |
| `redesigned-start-menu-windows-11.jpg` | clean launcher sections, search-first structure, recommendation area |
| `images (3).jpeg` | Snap/multitasking reference and stylus/tablet productivity cue |

## Fusion Rules

| 영역 | AstraOS 해석 |
| --- | --- |
| Backdrop & Depth | macOS glass, One UI blur, Windows 11 Mica/Acrylic을 결합해 미세한 texture depth와 부드러운 translucency를 만든다. |
| Radius & Shape | 창, 카드, 패널은 중간~큰 radius로 통일한다. macOS보다 부드럽고 One UI보다 정돈된 형태를 목표로 한다. |
| Window Management | Snap preview는 Windows 11의 발견성을 참고하되 AstraOS 고유 preview shape, blur, animation으로 재해석한다. |
| Spacing & Layout | desktop은 macOS처럼 여유롭고, quick/app surfaces는 One UI처럼 손에 잡히며, launcher/settings는 Windows 11처럼 실용적이어야 한다. |
| Typography & Color | 조용하고 읽기 쉬운 typography, muted accent, 과장 없는 보안 상태 표현을 사용한다. |
| Interaction | macOS식 부드러움, One UI식 tactile feedback, Windows 11식 hover/focus precision을 결합한다. |

## Signature Components

- Shell Bar: macOS Dock의 미니멀한 존재감, One UI의 부드러운 radius, Windows 11의 centered taskbar 흐름을 AstraOS 방식으로 재해석한다.
- Launcher: Windows 11의 search-first 구조와 app/recent 분리를 참고하되 One UI식 넉넉한 app grid와 macOS식 glass depth를 적용한다.
- App Window Chrome: traffic light나 Windows caption button을 복제하지 않고, 얇은 border, large radius, Mica-like title region으로 구성한다.
- Quick Panel: One UI Quick Panel의 촉감, Windows Settings card 구조, macOS glass depth를 결합한다.
- Workspace/Snap View: Windows 11 Snap guide와 macOS Mission Control의 부드러움, One UI multitasking card 계층을 섞는다.
- Security Center: 보안 관제센터가 아니라 조용한 설정 앱처럼 표현한다.

## Absolute Non-Goals

- Apple traffic light button, macOS menu bar, Finder exact style 복제 금지
- Samsung One UI icon style, palette, exact quick panel shape 복제 금지
- Windows 11 Start menu shape, taskbar layout, title bar button, logo 복제 금지
- GNOME, KDE, Windows 10 이전 스타일 복제 금지
- 과한 neon, cyberpunk, dashboard, badge 남발 금지
- 세 reference 중 하나로 완전히 치우치는 디자인 금지

## Figma Handoff 기준

Figma 파일이 준비되면 다음 board를 생성합니다.

1. `Reference / macOS Calm Glass`
2. `Reference / One UI Soft Components`
3. `Reference / Windows 11 Mica Snap Fluent`
4. `Astra Fusion Tokens`
5. `Astra Static Mock Directions`

각 board에는 원본 screenshot 옆에 “copy 금지”와 “AstraOS로 재해석할 요소”를 함께 표기해야 합니다. Figma 작업에서 Apple, Samsung, Microsoft 고유 로고, 아이콘, exact button, exact layout을 tracing하거나 그대로 가져오면 안 됩니다.

## Completion Check

매 작업 후 다음 질문을 통과해야 합니다.

> 이게 macOS냐? One UI냐? Windows 11이냐? AstraOS냐?

정답은 “세 감성이 보이지만 최종 결과는 AstraOS”여야 합니다.
