# Astra Core Apps Overview

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## 정의

Astra Core Apps는 AstraOS 기본 사용자 경험을 구성하는 고성능 기본 앱 집합입니다. Phase 0에서는 실제 앱을 구현하지 않고, 앱의 품질 기준, sandbox 경계, 모듈성 요구사항만 정의합니다.

## 후보 앱

- Browser
- File Manager
- Image Viewer
- Video Player
- Music Player
- PDF 및 Document Viewer
- Text Editor
- Archive Manager
- Terminal
- Screenshot 및 Recorder
- System Monitor
- Settings

## 공통 기준

- 빠르게 실행되어야 한다.
- sandbox를 기본으로 고려한다.
- 교체 가능해야 한다.
- 제거 가능해야 한다.
- 독립 업데이트가 가능해야 한다.
- Astra Shield, Astra Vault, Astra Private Workspace와의 경계를 명확히 한다.
- Balanced Premium Performance 기준에 맞게 성능 비용을 관리한다.

## 금지 범위

- Phase 0에서 실제 앱 구현
- 무거운 프레임워크 기본 채택
- 사용자 파일에 대한 과도한 기본 접근
- 네트워크 권한 기본 허용

