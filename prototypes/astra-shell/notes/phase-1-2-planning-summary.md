# Phase 1-2 Planning Summary: Astra Shell Static Mock Planning Pack

> 현재 문서는 Phase 1-2 기준 요약입니다. 실제 앱 코드, package.json, HTML, CSS, TypeScript, JavaScript, WebView 실행 코드, native bridge, OS command API를 만들지 않습니다.

## 1. 목적

Phase 1-2의 목적은 실제 UI 앱 코드를 만들기 전에 정적 WebView mock scaffold를 안전하게 설계할 수 있도록 route map, interaction state table, string key inventory, static asset policy, mock data loading policy를 문서화하는 것입니다.

## 2. Phase 1-2 범위

- static route map 문서화
- interaction state table 문서화
- KO/EN string key inventory 문서화
- static asset policy 문서화
- mock data loading policy 문서화
- `.gitattributes` 추가 여부 검토와 최소 정책 제안

## 3. 아직 구현하지 않을 항목

- 실제 앱 코드
- package.json
- HTML, CSS, TypeScript, JavaScript
- WebView 실행 코드
- native bridge
- OS command API
- 실제 로그인
- 권한 상승
- 시스템 설정 변경
- 보안 정책 변경
- 드라이버 제어
- 백신 연동
- Secure Delete 실행
- Vault 암호화 엔진
- AI WebUI 실행

## 4. 보안 경계

- 모든 데이터는 fake/mock data입니다.
- 실제 사용자 데이터, 실제 시스템 상태, 실제 파일 목록을 읽지 않습니다.
- 실제 보안 상태를 검사하지 않습니다.
- 실제 명령 실행 기능을 만들지 않습니다.
- remote content를 불러오지 않습니다.
- WebView mock은 localhost/static/mock data 전용으로만 설계합니다.
- Security Center mock은 실제 백신/EDR 결과가 아니라 문서화용 상태만 표현합니다.
- Settings mock은 실제 설정 변경이 아니라 화면 구조만 표현합니다.

## 5. 생성된 Planning Pack

- `static-route-map.md`
- `interaction-state-table.md`
- `string-key-inventory.md`
- `static-asset-policy.md`
- `mock-data-loading-policy.md`
- `phase-1-2-planning-summary.md`

## 6. `.gitattributes` 검토 결과

Windows 작업 환경에서 CRLF 경고가 반복될 수 있으므로 줄바꿈 정책은 필요합니다. 다만 사용자 요청에 따라 이번 단계에서는 `.gitattributes` 파일을 실제로 추가하지 않습니다.

제안하는 최소 정책:

```gitattributes
* text=auto
*.md text=auto
*.yml text=auto
*.yaml text=auto
*.json text=auto
```

이 정책은 Markdown/YAML/JSON 파일을 텍스트로 취급해 Windows와 Git 간 줄바꿈 차이를 줄이는 최소 제안입니다. 실제 추가는 별도 승인 후 진행합니다.

## 7. 다음 구현 단계 TODO

- `.gitattributes` 최소 정책 추가 여부 승인받기
- 실제 static mock scaffold 생성 전 파일 유형 허용 목록 확정
- route map과 interaction table을 기반으로 static screen navigation spec 작성
- string key inventory를 실제 KO/EN resource 후보로 분리할지 결정
- mock data fixture 파일 생성 여부를 별도 승인받기

