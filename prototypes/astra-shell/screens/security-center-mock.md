# Security Center Mock Wireframe / Mock Spec

> 현재 문서는 Phase 1-1 기준의 Astra Shell 화면별 Wireframe / Mock Spec입니다. 실제 앱 구현이 아니라 구조, 레이아웃, 상태, mock data, 사용자 흐름 문서입니다. 실제 로그인 금지, 권한 상승 금지, OS 제어 기능 금지 원칙을 적용합니다.

## 1. 화면 목적

Security Center Mock은 Astra Shield, Guardian, Vault, Secure Delete, Private Workspace, AI Studio 보안 상태를 문서화용 mock으로 요약합니다. Phase 1-1에서는 실제 백신/EDR 결과, 실제 삭제, 실제 암호화, 실제 보안 정책 변경을 수행하지 않습니다.

## 2. 사용자에게 보여줄 정보

- securityStatus 요약
- shieldStatus와 guardianStatus mock
- vaultStatus mock
- Secure Delete가 사용자 소유 데이터 보호 기능이라는 설명
- privacyEvents와 notifications 중 보안 관련 synthetic 항목
- aiStudioStatus sandbox/localhost 상태

## 3. 주요 UI 영역

| 영역 | 레이아웃 | 디자인 방향 |
| --- | --- | --- |
| Protection summary | 상단 wide card | calm, trustworthy, 과장 표현 금지 |
| Shield card | 방어적 백신/EDR/복구 구조 mock | 공격 기능 암시 금지 |
| Guardian card | 자체 보호/복구 readiness mock | visible/reversible 복구 tone |
| Vault card | locked/protected mock | 실제 내용 접근 없음 |
| Secure Delete card | preview-only policy | anti-forensics 아님 명시 |
| Event list | synthetic privacy/security events | 실제 로그 아님 표시 |

## 4. 상태값

- `securityStatus.level`
- `securityStatus.summary`
- `shieldStatus.mode`
- `guardianStatus.health`
- `vaultStatus.locked`
- `privacyEvents[]`
- `notifications[]`
- `aiStudioStatus.mode`

## 5. mock data 입력

- `securityStatus`
- `shieldStatus`
- `guardianStatus`
- `vaultStatus`
- `privacyEvents`
- `notifications`
- `aiStudioStatus`

모든 입력은 fake/mock data입니다. 실제 보안 상태, 실제 백신 결과, 실제 파일 목록, 실제 Vault 내용, 실제 AI Studio runtime을 읽지 않습니다.

## 6. 사용자 액션

| 액션 | mock 반응 |
| --- | --- |
| Shield card 클릭 | 방어 구조 설명 panel 표시 |
| Guardian card 클릭 | 복구 정책 설명 panel 표시 |
| Secure Delete preview 클릭 | 대상 없는 preview-only policy 표시 |
| Vault card 클릭 | 실제 접근 금지 안내 표시 |
| Event item 클릭 | synthetic detail 표시 |

## 7. 아직 구현하지 않을 실제 OS 기능

- 실제 백신 스캔
- 실제 EDR 연동
- 실제 격리/복구
- 실제 Secure Delete 실행
- 실제 Vault 암호화 엔진
- 실제 보안 정책 변경
- 실제 AI WebUI 실행
- OS command API 또는 native bridge

## 8. 보안 경계

- Security Center mock은 실제 백신/EDR 결과가 아니라 문서화용 상태만 표현합니다.
- Astra Shield는 공격 기능이 아니라 방어적 백신/EDR/복구 구조로만 표현합니다.
- Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능으로만 표현합니다.
- Vault 내용과 실제 파일 목록은 읽거나 표시하지 않습니다.
- remote content를 불러오지 않고 localhost/static/mock data 전용으로만 설계합니다.

## 9. 접근성 고려

- 보안 상태는 색상만이 아니라 label과 설명을 함께 제공합니다.
- Critical/Warning류 표현은 과장하지 않고 mock임을 명시합니다.
- card는 keyboard navigation과 screen reader heading을 고려합니다.
- motion은 150~220ms 범위로 제한하고 reduce motion을 지원합니다.

## 10. 다음 구현 단계 TODO

- securityStatus, shieldStatus, guardianStatus schema와 card mapping 확정
- Secure Delete preview-only copy KO/EN key 작성
- synthetic event redaction 규칙 작성
- 실제 보안 기능과 연결하지 않는 mock adapter boundary 문서화

