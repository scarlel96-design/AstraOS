# Astra AI Studio Overview

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## 정의

Astra AI Studio는 로컬 AI 도구와 WebUI 스타일 애플리케이션을 안전하게 다루기 위한 OS 통합 작업 환경입니다. 기본값은 외부 공개가 아니라 sandbox/localhost입니다.

## Phase 0 범위

Phase 0에서는 실제 AI WebUI 실행을 구현하지 않고 다음 정책만 설계합니다.

- localhost 바인딩 기본값
- sandbox 실행 정책
- 파일 접근 권한 제한
- 네트워크 접근 권한 제한
- clipboard 접근 제한
- API key 접근 제한
- 모델, 확장, 플러그인, custom node 검사 정책
- AI 생성 명령 자동 실행 금지

## 호환 후보

다음은 Phase 0 검토 후보이며 실제 통합이 아닙니다.

- text-generation-webui compatibility profile
- ComfyUI compatibility profile
- Stable Diffusion WebUI compatibility profile
- Ollama
- llama.cpp
- Transformers
- vLLM
- ONNX Runtime
- Whisper
- TTS
- RAG workflows

## 금지 범위

- WebUI 외부 공개 기본값
- 인증 없는 네트워크 바인딩
- 사용자 파일 전체 접근 기본값
- API key 자동 노출
- AI 생성 명령 자동 실행
- Phase 0에서 실제 WebUI 실행 구현

