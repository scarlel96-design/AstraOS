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

