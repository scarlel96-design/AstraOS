# Astra Shell Phase 1-1 Mock Data Examples

> 현재 문서는 Phase 1-1 기준의 mock data 예시 문서입니다. 실제 데이터 파일, API, loader, 앱 코드가 아닙니다. 모든 값은 fake/mock data입니다.

## Root Example

```json
{
  "currentUser": {
    "id": "mock-user-owner",
    "displayName": "Astra User",
    "roleLabel": "Owner",
    "avatarToken": "avatar.owner"
  },
  "sessionState": {
    "kind": "signedOut",
    "locked": false,
    "messageKey": "login.mockNotice"
  },
  "systemStatus": {
    "timeLabel": "09:41",
    "dateLabel": "Phase 1-1 Mock Day",
    "lowResourceMode": false,
    "shellMode": "desktopMock"
  },
  "securityStatus": {
    "level": "safeMock",
    "summary": "Protected mock",
    "lastCheckedLabel": "Mock only"
  },
  "vaultStatus": {
    "state": "lockedMock",
    "contentAccess": "notRead",
    "messageKey": "vault.mockLocked"
  },
  "shieldStatus": {
    "mode": "protectedMock",
    "scanState": "notRunning",
    "resultSource": "mockOnly"
  },
  "guardianStatus": {
    "health": "healthyMock",
    "recoveryReadiness": "documentedOnly",
    "lastRepair": "neverExecuted"
  },
  "networkStatus": {
    "mode": "localOnly",
    "externalExposure": "disabled",
    "label": "Local only mock"
  },
  "batteryStatus": {
    "level": 82,
    "charging": false,
    "mode": "balancedPremium"
  },
  "notifications": [
    {
      "id": "mock-note-security-1",
      "source": "security",
      "severity": "info",
      "titleKey": "notification.securityMockTitle",
      "bodyKey": "notification.securityMockBody",
      "read": false
    }
  ],
  "quickSettings": {
    "localOnly": true,
    "focusMode": false,
    "lowResourceMode": false,
    "performanceMode": "balancedPremium",
    "brightness": 72,
    "volume": 36
  },
  "runningApps": [
    {
      "appId": "settings-mock",
      "label": "Settings Mock",
      "state": "activeMock",
      "workspaceId": "workspace-1",
      "windowTitle": "Settings Mock"
    }
  ],
  "pinnedApps": [
    {
      "appId": "launcher",
      "label": "Launcher",
      "iconToken": "icon.launcher",
      "opensScreen": "launcher"
    },
    {
      "appId": "security-center-mock",
      "label": "Security Center Mock",
      "iconToken": "icon.security",
      "opensScreen": "security-center-mock"
    }
  ],
  "workspaces": [
    {
      "id": "workspace-1",
      "label": "Workspace 1",
      "active": true,
      "windowCount": 2
    }
  ],
  "recentFiles": [
    {
      "id": "recent-mock-1",
      "label": "Mock project brief",
      "kind": "documentMock",
      "pathDisplay": "Mock location only"
    }
  ],
  "privacyEvents": [
    {
      "id": "privacy-mock-1",
      "source": "aiStudio",
      "eventType": "sandboxNotice",
      "messageKey": "privacy.aiStudioSandbox"
    }
  ],
  "aiStudioStatus": {
    "mode": "sandboxLocalhostMock",
    "webUiExposure": "externalDisabled",
    "apiKeyAccess": "blockedByDefault",
    "networkAccess": "localOnly"
  }
}
```

## Screen Mapping

| 화면 | 주 입력 |
| --- | --- |
| Login Screen | `currentUser`, `sessionState`, `systemStatus`, `networkStatus`, `batteryStatus` |
| Desktop | `systemStatus`, `securityStatus`, `runningApps`, `pinnedApps`, `workspaces`, `recentFiles` |
| Dock | `pinnedApps`, `runningApps`, `notifications`, `securityStatus` |
| Launcher | `pinnedApps`, `runningApps`, `aiStudioStatus`, `systemStatus` |
| Control Center | `quickSettings`, `networkStatus`, `batteryStatus`, `securityStatus` |
| Notification Center | `notifications`, `privacyEvents`, `securityStatus`, `aiStudioStatus` |
| Workspace View | `workspaces`, `runningApps`, `systemStatus` |
| Settings Mock | `currentUser`, `systemStatus`, `networkStatus`, `quickSettings`, `securityStatus`, `aiStudioStatus` |
| Security Center Mock | `securityStatus`, `shieldStatus`, `guardianStatus`, `vaultStatus`, `privacyEvents`, `aiStudioStatus` |

## Negative Example Rules

다음 예시는 사용하면 안 됩니다.

- 실제 Windows 또는 Linux 사용자 이름
- 실제 홈 디렉터리 경로
- 실제 IP 주소 또는 네트워크 인터페이스 이름
- 실제 보안 제품 로그
- 실제 파일명, 실제 최근 문서, 실제 브라우저 기록
- 실제 API key, token, 암호, secret

## 보안 경계 문구

- Security Center mock은 실제 백신/EDR 결과가 아니라 문서화용 상태만 표현합니다.
- Settings mock은 실제 설정 변경이 아니라 화면 구조만 표현합니다.
- AI Studio는 sandbox/localhost 기본값만 표현하며 WebUI를 실행하지 않습니다.
- Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능으로만 표현합니다.

