# Astra Shell Phase 1-1 Design Tokens

> 현재 문서는 Phase 1-1 기준의 디자인 토큰 설계 문서입니다. 실제 CSS, TypeScript, theme config, WebView 실행 코드, 앱 구현을 만들지 않습니다.

## 디자인 방향

Astra Shell mock의 시각 방향은 다음 다섯 단어로 고정합니다.

- Premium
- Future
- Calm
- Fast
- Trustworthy

이 방향은 화려함보다 신뢰감과 반복 사용성을 우선합니다. UI는 어두운 반투명 패널, 정돈된 blur/shadow, 과하지 않은 motion, 150~220ms 범위의 빠른 인터랙션을 사용합니다. Balanced Premium Performance 기준에 따라 저사양 모드에서는 blur, shadow, transparency를 줄일 수 있어야 합니다.

Phase 1-5d 기준 Astra Design Language는 macOS의 정갈한 desktop 미학과 One UI 9.0의 부드럽고 직관적인 component 감성을 AstraOS 고유 방식으로 융합합니다. 이 문서는 특정 제품 UI를 복제하기 위한 문서가 아니라, 두 디자인 언어의 핵심 감성을 AstraOS의 Linux desktop shell 맥락에 맞게 재해석하는 token 방향 문서입니다.

## Astra Design Language Token Principles

| 참고 감성 | AstraOS token 해석 |
| --- | --- |
| macOS의 정갈한 여백 | `space.6`, `space.8` 중심의 여유로운 desktop breathing room |
| macOS의 glass/depth | 과하지 않은 `panel.blur`, 얇은 border, 넓고 부드러운 shadow |
| macOS의 조용한 typography | display type 남발 금지, title/body/label 계층 명확화 |
| One UI 9.0의 큰 radius | panel과 overlay는 더 부드럽게, 작은 control은 과도하게 둥글리지 않음 |
| One UI 9.0의 tactile component | toggle, slider, quick panel, card의 손에 잡히는 듯한 spacing |
| One UI 9.0의 명확한 section | 큰 제목과 짧은 body copy, compact하지만 숨 쉬는 section 구조 |

복제 방지 기준:

- Apple 로고, macOS traffic light 버튼 색상/형태, macOS 메뉴바 구조를 token으로 정의하지 않습니다.
- Samsung One UI의 특정 icon style, 컬러 팔레트, 고유 component 형태를 token으로 복제하지 않습니다.
- GNOME, KDE, Windows 기본 UI token을 그대로 따르지 않습니다.
- AstraOS token은 Linux native app 호환성, accessibility, keyboard navigation, XDG/Wayland integration을 해치지 않아야 합니다.

## 색상 토큰 방향

| 토큰 | 용도 | 방향 |
| --- | --- | --- |
| `color.surface.base` | desktop base | 매우 어두운 neutral 계열 |
| `color.surface.panel` | overlay/panel | 어두운 반투명 panel |
| `color.surface.panelStrong` | modal/critical panel | 더 높은 대비의 panel |
| `color.text.primary` | 주요 텍스트 | 고대비, 장시간 읽기 가능 |
| `color.text.secondary` | 설명 텍스트 | 낮은 대비지만 접근성 기준 유지 |
| `color.accent.primary` | 핵심 accent | 차가운 cyan/blue 계열 |
| `color.security.safe` | 안전 상태 | 색상과 label을 함께 사용 |
| `color.security.warn` | 주의 상태 | 과장 없는 warning |
| `color.security.blocked` | 금지/disabled | 명확한 disabled 상태 |

Phase 1-5d 이후 색상 방향은 muted accent를 기본으로 합니다. 보안 OS라는 이유로 neon green, 과한 red warning, cyber dashboard palette를 기본값으로 삼지 않습니다. dark/light theme 모두 calm, premium, soft, trustworthy 인상을 유지해야 합니다.

## 패널 토큰 방향

| 토큰 | 방향 |
| --- | --- |
| `panel.opacity.default` | 기본 반투명 panel |
| `panel.opacity.lowResource` | 저사양 모드에서 더 불투명한 panel |
| `panel.blur.default` | 정돈된 blur |
| `panel.blur.lowResource` | blur 감소 또는 제거 |
| `panel.shadow.default` | 얕고 넓은 shadow |
| `panel.shadow.lowResource` | shadow 감소 |

## 간격 토큰 방향

| 토큰 | 값 후보 | 용도 |
| --- | --- | --- |
| `space.1` | 4px | icon 내부 미세 간격 |
| `space.2` | 8px | compact control |
| `space.3` | 12px | card 내부 간격 |
| `space.4` | 16px | panel 기본 padding |
| `space.6` | 24px | section 간격 |
| `space.8` | 32px | overlay 주요 영역 간격 |

## Radius 토큰 방향

| 토큰 | 값 후보 | 용도 |
| --- | --- | --- |
| `radius.control` | 8px 이하 | button, input |
| `radius.card` | 8px | card |
| `radius.panel` | 12px 후보 | shell overlay panel |
| `radius.full` | full | avatar, status dot |

One UI 9.0 감성을 참고하는 영역에서는 panel, quick panel, notification, launcher tile의 radius를 더 부드럽게 사용할 수 있습니다. 다만 macOS/One UI의 특정 component 형태를 직접 복제하지 않고 AstraOS 고유 형태로 재해석합니다.

## Typography 토큰 방향

| 토큰 | 용도 |
| --- | --- |
| `type.display` | Login Screen brand text에 제한적으로 사용 |
| `type.title` | overlay title, panel header |
| `type.body` | 설명, 알림 본문 |
| `type.label` | badge, tooltip, control label |
| `type.mono` | 사용하지 않음. 실제 command처럼 보일 수 있는 표기는 피함 |

## Motion 토큰 방향

| 토큰 | 값 후보 | 용도 |
| --- | --- | --- |
| `motion.fast` | 150ms | hover/focus |
| `motion.default` | 180ms | overlay open/close |
| `motion.slowMax` | 220ms | workspace transition |
| `motion.easing` | calm ease-out | 과하지 않은 전환 |
| `motion.reduced` | 0-80ms | reduce motion 또는 low resource mode |

## 보안 UI 토큰 기준

- 실제 로그인 금지, 권한 상승 금지, OS 제어 기능 금지 상태를 시각적으로 명확히 표현합니다.
- 위험 CTA는 `preview-only`, `disabled`, `documentation-only` 중 하나의 label을 가져야 합니다.
- Security Center mock의 상태 색상은 실제 백신/EDR 결과처럼 보이지 않도록 `mock` label과 함께 사용합니다.
- Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능으로만 표시합니다.
- AI Studio는 sandbox/localhost 기본값으로만 표시합니다.

## 다음 구현 단계 TODO

- 실제 CSS 변수명으로 변환하기 전 token naming review 수행
- KO/EN label과 token usage guideline 연결
- low resource mode에서 transparency/blur/shadow fallback 상세화
- 접근성 대비 기준을 별도 checklist로 연결
- Linux native app window chrome/theme bridge token 설계
- Wayland/XDG portal permission prompt token 설계
- desktop/tablet/mobile 확장 가능한 density scale 설계
