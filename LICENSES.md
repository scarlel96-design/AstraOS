# AstraOS Licenses

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## 목적

이 문서는 AstraOS Phase 0에서 라이선스 검토 기준을 정의합니다. 실제 배포 패키지, ISO, 바이너리, 외부 종속성 번들은 아직 생성하지 않습니다.

## 기본 원칙

- Linux LTS 기반 구성 요소의 라이선스를 존중한다.
- 오픈소스 구성 요소는 원 저작권, 고지 의무, 소스 공개 의무, 상표 제한을 검토한 뒤 사용한다.
- 보안 기능, AI 도구, UI 프레임워크, 패키징 도구는 라이선스와 배포 조건을 문서화한 뒤 채택한다.
- proprietary 또는 상업용 구성 요소는 명시적 승인 없이는 기본 의존성으로 넣지 않는다.
- 코드와 문서에는 hardcoded secret, 비공개 키, 무단 배포 자료를 포함하지 않는다.

## Phase 0 검토 후보

| 영역 | 검토 대상 | Phase 0 상태 |
| --- | --- | --- |
| Base OS | Linux LTS 배포판, OSTree/rpm-ostree 계열 후보 | 후보 검토만 수행 |
| Desktop UI | Qt/QML, Slint, 기타 native UI 후보 | 라이선스 비교 필요 |
| Security | YARA, ClamAV 계열, eBPF 관련 도구 후보 | 실제 통합 없음 |
| Vault | 암호화 라이브러리 후보 | 실제 암호화 엔진 없음 |
| AI Studio | Ollama, llama.cpp, vLLM, ComfyUI, WebUI 호환 후보 | 실제 실행 구현 없음 |
| CI | 문서 검증용 GitHub Actions | 초안 수준 |

## 금지 기준

- 라이선스가 불명확한 코드나 바이너리를 포함하지 않는다.
- 공격 코드, exploit code, credential theft, 백신 우회, 악성코드, anti-forensics 목적 도구를 포함하지 않는다.
- Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능으로만 정의한다.
- Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조로만 정의한다.
- AI Studio는 외부 공개 WebUI가 아니라 sandbox/localhost 기본값으로만 정의한다.

## 다음 작업

- 실제 후보 기술이 확정되면 각 항목의 라이선스, 고지 의무, 배포 조건을 표로 확장한다.
- ISO 또는 패키지 배포 전에는 별도 라이선스 검토 체크리스트를 작성한다.

