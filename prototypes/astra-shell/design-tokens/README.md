# Design Tokens

이 디렉터리는 Phase 1 prototype에서 색상, 간격, 타이포그래피, motion 기준을 정리하기 위한 자리입니다.

현재 단계에서는 실제 UI 라이브러리 설정 파일을 만들지 않습니다.

Phase 1-1 디자인 방향은 `tokens.md`를 기준으로 합니다. `tokens.md`는 실제 CSS나 theme config가 아니라 문서형 디자인 토큰 계약입니다.

## Phase 1-0 원칙

현재 문서는 token 방향만 정의합니다. 실제 CSS, TypeScript, theme config, build config, WebView 실행 코드는 만들지 않습니다.

## 색상 방향

| 역할 | 방향 |
| --- | --- |
| Surface | 어두운 배경과 높은 대비의 패널을 조합하되 단일 색상 팔레트에 갇히지 않는다 |
| Accent | AstraOS identity를 표현하는 차가운 cyan/blue 계열을 보조 accent로 사용한다 |
| Security | 정상, 주의, 위험 상태를 색상만으로 구분하지 않고 icon/text label을 함께 사용한다 |
| Disabled | 실제 동작이 없는 Phase 1-0 control은 명확한 disabled 또는 preview-only 상태를 가진다 |

## 간격 방향

| 토큰 | 방향 |
| --- | --- |
| `space-1` | 4px 단위의 미세 간격 |
| `space-2` | 8px 기본 내부 간격 |
| `space-3` | 12px compact group 간격 |
| `space-4` | 16px panel 내부 간격 |
| `space-6` | 24px 주요 section 간격 |

## Typography 방향

| 역할 | 방향 |
| --- | --- |
| Display | Login Screen과 empty desktop hero에만 제한적으로 사용 |
| Title | panel title과 overlay header에 사용 |
| Body | 설정 설명, 보안 안내, notification 본문에 사용 |
| Label | Dock tooltip, badge, quick setting label에 사용 |

## Motion 방향

- Overlay는 120-180ms 범위의 빠른 전환을 목표로 합니다.
- 위험 작업 panel은 과도한 animation 없이 안정적으로 표시합니다.
- Motion은 정보 이해를 돕는 범위로 제한합니다.
- 실제 시스템 상태 변경을 암시하는 loading animation은 사용하지 않습니다.

## 보안 UI 토큰 기준

- Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능으로 표시합니다.
- Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조로 표시합니다.
- AI Studio는 sandbox/localhost 기본값으로 표시합니다.
- Phase 1-0 control은 실제 로그인 금지, 권한 상승 금지, OS 제어 기능 금지 경계를 시각적으로 드러내야 합니다.

