(function initializeAstraShellMockData() {
  "use strict";

  const mockData = {
    routes: [
      { path: "/login", titleKey: "route.login.title", screen: "loginScreen" },
      { path: "/desktop", titleKey: "route.desktop.title", screen: "desktop" },
      { path: "/dock", titleKey: "route.dock.title", screen: "dock" },
      { path: "/launcher", titleKey: "route.launcher.title", screen: "launcher" },
      { path: "/control-center", titleKey: "route.controlCenter.title", screen: "controlCenter" },
      { path: "/notifications", titleKey: "route.notifications.title", screen: "notificationCenter" },
      { path: "/workspaces", titleKey: "route.workspaces.title", screen: "workspaceView" },
      { path: "/settings", titleKey: "route.settings.title", screen: "settingsMock" },
      { path: "/security-center", titleKey: "route.securityCenter.title", screen: "securityCenterMock" }
    ],

    strings: {
      ko: {
        "app.name": "Astra Shell",
        "app.phase": "Phase 1-4",
        "app.staticOnly": "정적 mock 전용",
        "nav.screens": "화면 이동",
        "nav.language": "언어 mock 전환",
        "action.skipToContent": "본문으로 이동",
        "route.login.title": "로그인 화면",
        "route.desktop.title": "데스크톱",
        "route.dock.title": "Dock",
        "route.launcher.title": "런처",
        "route.controlCenter.title": "제어 센터",
        "route.notifications.title": "알림 센터",
        "route.workspaces.title": "작업 공간",
        "route.settings.title": "설정 mock",
        "route.securityCenter.title": "보안 센터 mock",
        "status.localOnly": "로컬 전용",
        "status.mockOnly": "mock 상태",
        "status.noBridge": "native bridge 없음",
        "status.previewOnly": "미리보기 전용",
        "status.disabledByDesign": "설계상 비활성",
        "status.balancedPremium": "Balanced Premium",
        "status.lowResource": "저사양 mock",
        "status.lowResourceOn": "저사양 mock 켜짐",
        "status.lowResourceOff": "저사양 mock 꺼짐",
        "status.reducedMotionAware": "모션 감소 대응",
        "status.noStorage": "브라우저 저장소 미사용",
        "security.boundaryTitle": "Phase 1-4 보안 경계",
        "security.boundaryBody": "정적 UI mock이며 실제 로그인, 권한 상승, OS 제어 기능, 보안 상태 검사를 수행하지 않습니다.",
        "security.noRealLogin": "실제 로그인은 수행하지 않습니다.",
        "security.noPrivilege": "권한 상승은 수행하지 않습니다.",
        "security.noOsCommand": "OS 명령은 실행하지 않습니다.",
        "security.noNativeBridge": "native bridge를 사용하지 않습니다.",
        "security.mockDataOnly": "모든 데이터는 fake/mock data입니다.",
        "security.noUserFiles": "실제 사용자 파일을 읽지 않습니다.",
        "security.noSecurityScan": "실제 보안 상태 검사는 수행하지 않습니다.",
        "login.title": "AstraOS 데모 세션",
        "login.description": "Phase 1-4에서는 실제 인증 없이 화면 전환만 확인합니다. 입력란과 버튼은 mock UI입니다.",
        "login.passwordPlaceholder": "실제 암호 입력 금지",
        "action.mockLogin": "데모 세션 보기",
        "action.openLauncher": "런처 열기",
        "action.openControlCenter": "제어 센터 열기",
        "action.openNotifications": "알림 열기",
        "action.openWorkspaces": "작업 공간 보기",
        "action.openSettings": "설정 mock 열기",
        "action.openSecurityCenter": "보안 센터 mock 열기",
        "action.dismissNotification": "알림 mock 숨기기",
        "action.dismissAllNotifications": "모든 알림 mock 숨기기",
        "action.switchWorkspace": "작업 공간 전환 mock",
        "action.toggleLowResource": "저사양 mock 전환",
        "action.disabled": "실제 동작 없음",
        "desktop.description": "데스크톱은 Astra Shell surface, Dock, Launcher, Control Center, Notification Center의 관계를 보여주는 정적 mock입니다.",
        "dock.description": "Dock은 pinned app과 active mock 상태를 표시하지만 실제 앱을 실행하지 않습니다.",
        "launcher.description": "Launcher는 앱 카드와 추천 동작을 표시하지만 실제 프로세스나 명령을 시작하지 않습니다.",
        "controlCenter.description": "Control Center는 빠른 설정의 시각 상태만 전환하며 실제 네트워크, 밝기, 볼륨, 전원 설정을 변경하지 않습니다.",
        "notifications.description": "Notification Center는 synthetic 알림만 표시합니다. 숨김 동작은 실제 로그 삭제가 아닙니다.",
        "workspaces.description": "Workspace View는 fake workspace card를 전환합니다. 실제 compositor 또는 window manager를 제어하지 않습니다.",
        "settings.description": "Settings Mock은 설정 구조를 미리보기로 표시합니다. 실제 설정 저장, 권한 상승, 보안 정책 변경은 없습니다.",
        "securityCenter.description": "Security Center Mock은 Astra Shield, Guardian, Vault, Secure Delete, AI Studio의 방어적 구조를 표시합니다.",
        "section.mockWindows": "Mock 창",
        "section.quickActions": "빠른 이동",
        "section.pinnedApps": "고정 앱",
        "section.quickSettings": "빠른 설정 mock",
        "section.systemSignals": "시스템 신호 mock",
        "section.notificationQueue": "알림 대기열 mock",
        "section.securityModules": "방어 모듈",
        "section.boundaries": "금지된 실제 동작",
        "metric.routes": "route",
        "metric.notifications": "알림",
        "metric.workspaces": "작업 공간",
        "metric.storage": "저장소",
        "metric.none": "없음",
        "control.focusMode": "집중 모드 mock",
        "control.brightness": "밝기 mock",
        "control.volume": "음량 mock",
        "workspace.one": "작업 공간 1",
        "workspace.two": "작업 공간 2",
        "workspace.three": "작업 공간 3",
        "workspace.windowUnit": "mock 창",
        "error.mockDataUnavailable": "Astra Shell mock data를 사용할 수 없습니다.",
        "error.initialization": "정적 mock 초기화 오류가 발생했습니다.",
        "module.shield": "Astra Shield",
        "module.guardian": "Astra Shield Guardian",
        "module.vault": "Astra Vault",
        "module.secureDelete": "Secure Delete",
        "module.aiStudio": "AI Studio",
        "module.privateWorkspace": "Private Workspace",
        "notice.secureDelete": "Secure Delete는 anti-forensics가 아니라 사용자 소유 데이터 보호 기능입니다.",
        "notice.shield": "Astra Shield는 공격 기능이 아니라 백신/EDR/복구 구조입니다.",
        "notice.guardian": "Guardian은 백신 자체 보호와 자동 복구 구조입니다.",
        "notice.aiStudio": "AI Studio는 sandbox/localhost 기본값으로 표시되며 WebUI를 실행하지 않습니다.",
        "notice.rollback": "위험 작업은 확인, dry-run, preview, rollback 우선 원칙으로만 표시합니다.",
        "toast.mockLogin": "데모 세션 route로 이동했습니다. 실제 로그인은 수행하지 않았습니다.",
        "toast.mockToggle": "mock 상태만 변경했습니다. 실제 OS 설정은 변경하지 않았습니다.",
        "toast.lowResourceOn": "저사양 mock 표시를 켰습니다. 실제 성능 설정은 변경하지 않았습니다.",
        "toast.lowResourceOff": "저사양 mock 표시를 껐습니다. 실제 성능 설정은 변경하지 않았습니다.",
        "toast.mockDismiss": "mock 알림만 숨겼습니다. 실제 로그는 삭제하지 않았습니다.",
        "toast.mockDismissAll": "모든 mock 알림을 숨겼습니다. 실제 로그는 삭제하지 않았습니다.",
        "toast.mockWorkspace": "fake workspace 표시만 전환했습니다.",
        "empty.notifications": "표시할 mock 알림이 없습니다."
      },
      en: {
        "app.name": "Astra Shell",
        "app.phase": "Phase 1-4",
        "app.staticOnly": "Static mock only",
        "nav.screens": "Screen navigation",
        "nav.language": "Language mock switcher",
        "action.skipToContent": "Skip to content",
        "route.login.title": "Login Screen",
        "route.desktop.title": "Desktop",
        "route.dock.title": "Dock",
        "route.launcher.title": "Launcher",
        "route.controlCenter.title": "Control Center",
        "route.notifications.title": "Notification Center",
        "route.workspaces.title": "Workspaces",
        "route.settings.title": "Settings mock",
        "route.securityCenter.title": "Security Center mock",
        "status.localOnly": "Local only",
        "status.mockOnly": "Mock state",
        "status.noBridge": "No native bridge",
        "status.previewOnly": "Preview only",
        "status.disabledByDesign": "Disabled by design",
        "status.balancedPremium": "Balanced Premium",
        "status.lowResource": "Low-resource mock",
        "status.lowResourceOn": "Low-resource mock on",
        "status.lowResourceOff": "Low-resource mock off",
        "status.reducedMotionAware": "Reduced motion aware",
        "status.noStorage": "No browser storage",
        "security.boundaryTitle": "Phase 1-4 Security Boundary",
        "security.boundaryBody": "This is a static UI mock. It does not perform real login, privilege escalation, OS control, or security status checks.",
        "security.noRealLogin": "No real login is performed.",
        "security.noPrivilege": "No privilege escalation is performed.",
        "security.noOsCommand": "No OS command is executed.",
        "security.noNativeBridge": "No native bridge is used.",
        "security.mockDataOnly": "All data is fake/mock data.",
        "security.noUserFiles": "No real user files are read.",
        "security.noSecurityScan": "No real security status check is performed.",
        "login.title": "AstraOS Demo Session",
        "login.description": "Phase 1-4 only verifies screen transitions without real authentication. Fields and buttons are mock UI.",
        "login.passwordPlaceholder": "Do not enter a real password",
        "action.mockLogin": "View demo session",
        "action.openLauncher": "Open launcher",
        "action.openControlCenter": "Open Control Center",
        "action.openNotifications": "Open notifications",
        "action.openWorkspaces": "View workspaces",
        "action.openSettings": "Open Settings mock",
        "action.openSecurityCenter": "Open Security Center mock",
        "action.dismissNotification": "Dismiss notification mock",
        "action.dismissAllNotifications": "Dismiss all notification mocks",
        "action.switchWorkspace": "Switch workspace mock",
        "action.toggleLowResource": "Toggle low-resource mock",
        "action.disabled": "No real action",
        "desktop.description": "The desktop is a static mock showing the relationship among Astra Shell surfaces, Dock, Launcher, Control Center, and Notification Center.",
        "dock.description": "The Dock shows pinned apps and active mock state, but it does not launch real apps.",
        "launcher.description": "The Launcher shows app cards and suggested actions, but it does not start real processes or commands.",
        "controlCenter.description": "The Control Center changes visual quick-setting mock state only. It does not modify network, brightness, volume, or power settings.",
        "notifications.description": "The Notification Center shows synthetic notifications only. Dismiss does not delete real logs.",
        "workspaces.description": "Workspace View switches fake workspace cards. It does not control a real compositor or window manager.",
        "settings.description": "Settings Mock previews settings structure. It does not save settings, escalate privileges, or change security policy.",
        "securityCenter.description": "Security Center Mock displays the defensive structure for Astra Shield, Guardian, Vault, Secure Delete, and AI Studio.",
        "section.mockWindows": "Mock windows",
        "section.quickActions": "Quick navigation",
        "section.pinnedApps": "Pinned apps",
        "section.quickSettings": "Quick settings mock",
        "section.systemSignals": "System signals mock",
        "section.notificationQueue": "Notification queue mock",
        "section.securityModules": "Defensive modules",
        "section.boundaries": "Forbidden real behavior",
        "metric.routes": "routes",
        "metric.notifications": "notifications",
        "metric.workspaces": "workspaces",
        "metric.storage": "storage",
        "metric.none": "none",
        "control.focusMode": "Focus mock",
        "control.brightness": "Brightness mock",
        "control.volume": "Volume mock",
        "workspace.one": "Workspace 1",
        "workspace.two": "Workspace 2",
        "workspace.three": "Workspace 3",
        "workspace.windowUnit": "mock windows",
        "error.mockDataUnavailable": "Astra Shell mock data is not available.",
        "error.initialization": "Static mock initialization failed.",
        "module.shield": "Astra Shield",
        "module.guardian": "Astra Shield Guardian",
        "module.vault": "Astra Vault",
        "module.secureDelete": "Secure Delete",
        "module.aiStudio": "AI Studio",
        "module.privateWorkspace": "Private Workspace",
        "notice.secureDelete": "Secure Delete is user-owned data protection, not anti-forensics.",
        "notice.shield": "Astra Shield is an antivirus/EDR/recovery structure, not an attack feature.",
        "notice.guardian": "Guardian is an antivirus self-protection and automatic recovery structure.",
        "notice.aiStudio": "AI Studio is shown as sandbox/localhost by default and does not launch WebUI.",
        "notice.rollback": "Risky work is shown with confirmation, dry-run, preview, and rollback-first principles only.",
        "toast.mockLogin": "Moved to the demo session route. No real login was performed.",
        "toast.mockToggle": "Changed mock state only. No OS setting was changed.",
        "toast.lowResourceOn": "Enabled low-resource mock display. No real performance setting was changed.",
        "toast.lowResourceOff": "Disabled low-resource mock display. No real performance setting was changed.",
        "toast.mockDismiss": "Dismissed a mock notification only. No real log was deleted.",
        "toast.mockDismissAll": "Dismissed all mock notifications. No real log was deleted.",
        "toast.mockWorkspace": "Changed fake workspace display only.",
        "empty.notifications": "No mock notifications to show."
      }
    },

    currentUser: {
      id: "mock-user-owner",
      displayName: "Astra User",
      roleLabel: "Owner",
      avatarToken: "avatar.owner"
    },

    systemStatus: {
      timeLabel: "09:41",
      dateLabel: "Phase 1-4 Mock Day",
      lowResourceMode: false,
      shellMode: "desktopMock"
    },

    securityStatus: {
      level: "safeMock",
      summaryKey: "status.mockOnly",
      lastCheckedLabel: "Mock only"
    },

    quickSettings: {
      localOnly: true,
      focusMode: false,
      lowResourceMode: false,
      performanceMode: "balancedPremium",
      brightness: 72,
      volume: 36
    },

    notifications: [
      {
        id: "mock-note-security-1",
        sourceKey: "module.shield",
        severity: "info",
        titleKey: "notice.shield",
        bodyKey: "security.mockDataOnly",
        read: false
      },
      {
        id: "mock-note-ai-1",
        sourceKey: "module.aiStudio",
        severity: "warn",
        titleKey: "notice.aiStudio",
        bodyKey: "security.noNativeBridge",
        read: false
      },
      {
        id: "mock-note-delete-1",
        sourceKey: "module.secureDelete",
        severity: "info",
        titleKey: "notice.secureDelete",
        bodyKey: "notice.rollback",
        read: false
      }
    ],

    pinnedApps: [
      { appId: "launcher", labelKey: "route.launcher.title", opensRoute: "/launcher" },
      { appId: "settings-mock", labelKey: "route.settings.title", opensRoute: "/settings" },
      { appId: "security-center-mock", labelKey: "route.securityCenter.title", opensRoute: "/security-center" },
      { appId: "workspaces", labelKey: "route.workspaces.title", opensRoute: "/workspaces" }
    ],

    runningApps: [
      {
        appId: "settings-mock",
        labelKey: "route.settings.title",
        state: "activeMock",
        workspaceId: "workspace-1",
        windowTitleKey: "route.settings.title"
      },
      {
        appId: "security-center-mock",
        labelKey: "route.securityCenter.title",
        state: "previewMock",
        workspaceId: "workspace-1",
        windowTitleKey: "route.securityCenter.title"
      }
    ],

    workspaces: [
      { id: "workspace-1", labelKey: "workspace.one", active: true, windowCount: 2 },
      { id: "workspace-2", labelKey: "workspace.two", active: false, windowCount: 1 },
      { id: "workspace-3", labelKey: "workspace.three", active: false, windowCount: 0 }
    ],

    shieldStatus: {
      mode: "protectedMock",
      scanState: "notRunning",
      resultSource: "mockOnly"
    },

    guardianStatus: {
      health: "healthyMock",
      recoveryReadiness: "documentedOnly",
      lastRepair: "neverExecuted"
    },

    vaultStatus: {
      state: "lockedMock",
      contentAccess: "notRead",
      messageKey: "security.noUserFiles"
    },

    aiStudioStatus: {
      mode: "sandboxLocalhostMock",
      webUiExposure: "externalDisabled",
      apiKeyAccess: "blockedByDefault",
      networkAccess: "localOnly"
    }
  };

  function deepFreeze(value) {
    if (value === null || typeof value !== "object" || Object.isFrozen(value)) {
      return value;
    }

    Object.freeze(value);

    Object.getOwnPropertyNames(value).forEach(function freezeChild(propertyName) {
      const childValue = value[propertyName];
      if (childValue !== null && typeof childValue === "object") {
        deepFreeze(childValue);
      }
    });

    return value;
  }

  try {
    window.ASTRA_SHELL_MOCK = deepFreeze(mockData);
  } catch (error) {
    window.ASTRA_SHELL_MOCK = mockData;
    window.ASTRA_SHELL_MOCK_INIT_ERROR = error instanceof Error ? error.message : "Unknown mock data initialization error";
  }
})();
